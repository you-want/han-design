import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const examplesDir = path.join(root, "examples");
const manifestPath = path.join(examplesDir, "validation.json");
const checkerPath = path.join(root, "skills", "han-design", "scripts", "check-output.mjs");
const readmePath = path.join(root, "README.md");
const thirdPartyNoticePath = path.join(root, "THIRD_PARTY_NOTICES.md");

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function fail(message) {
  console.error("Demo website validation failed: " + message);
  process.exit(1);
}

function checkLocalMarkdownLinks(file) {
  const source = fs.readFileSync(file, "utf8");
  for (const match of source.matchAll(/\]\(([^)]+)\)/g)) {
    const link = match[1].trim().replace(/^<|>$/g, "").split("#")[0];
    if (!link || /^(?:https?:|mailto:|tel:)/.test(link)) continue;
    if (!fs.existsSync(path.resolve(path.dirname(file), link))) {
      fail(path.relative(root, file) + " references missing path: " + match[1]);
    }
  }
}

function checkHtmlReferences(file) {
  const source = fs.readFileSync(file, "utf8");
  for (const match of source.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    const link = match[1];
    if (
      !link ||
      link.includes("{") ||
      /^(?:https?:|#|data:|mailto:|tel:|javascript:|\/)/.test(link) ||
      link === "image.jpg" ||
      link === "..."
    ) {
      continue;
    }
    if (!fs.existsSync(path.resolve(path.dirname(file), link.split(/[?#]/)[0]))) {
      fail(path.relative(root, file) + " references missing asset: " + link);
    }
  }
}

if (!fs.existsSync(readmePath)) fail("README.md is required for the repository website");
checkLocalMarkdownLinks(readmePath);

const appleDemoDir = path.join(examplesDir, "assets", "apple-mac");
if (fs.existsSync(appleDemoDir) && !fs.existsSync(thirdPartyNoticePath)) {
  fail("THIRD_PARTY_NOTICES.md is required while Apple demo imagery exists");
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const production = manifest.productionStructure ?? [];
const visualReferences = manifest.visualReferences ?? [];
const classified = [...production, ...visualReferences];

if (production.length === 0) fail("at least one production-structure example is required");
if (new Set(classified).size !== classified.length) fail("example classifications contain duplicates");

const htmlFiles = walk(examplesDir)
  .filter((file) => file.endsWith(".html"))
  .map((file) => path.relative(examplesDir, file))
  .sort();
const expected = [...classified].sort();

if (JSON.stringify(htmlFiles) !== JSON.stringify(expected)) {
  const unclassified = htmlFiles.filter((file) => !classified.includes(file));
  const missing = classified.filter((file) => !htmlFiles.includes(file));
  fail(
    "classification mismatch" +
      (unclassified.length ? "; unclassified: " + unclassified.join(", ") : "") +
      (missing.length ? "; missing: " + missing.join(", ") : ""),
  );
}

for (const relativePath of htmlFiles) {
  checkHtmlReferences(path.join(examplesDir, relativePath));
}

for (const relativePath of visualReferences) {
  const source = fs.readFileSync(path.join(examplesDir, relativePath), "utf8");
  if (!/<html\b[^>]*\bdata-han-static-reference=["']true["']/i.test(source)) {
    fail(relativePath + " must declare data-han-static-reference=\"true\"");
  }
}

function runChecker(args, label) {
  const result = spawnSync(process.execPath, [checkerPath, ...args], {
    cwd: root,
    encoding: "utf8",
    stdio: "inherit",
  });
  if (result.status !== 0) fail(label + " failed");
}

runChecker(["--strict", ...production.map((file) => path.join("examples", file))], "production examples");
runChecker(
  ["--strict", ...visualReferences.map((file) => path.join("examples", file))],
  "visual reference examples",
);

console.log(
  `Demo website validation passed: ${production.length} production-structure, ${visualReferences.length} visual reference.`,
);
