import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildScopedCss } from "./generate-scoped-css.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillDir = path.join(root, "skills", "han-design");
const errors = [];

function report(message) {
  errors.push(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function relative(file) {
  return path.relative(root, file);
}

const requiredFiles = [
  ".codex-plugin/plugin.json",
  "evals/cases.json",
  "package.json",
  "package-lock.json",
  "playwright.config.mjs",
  "requirements-dev.txt",
  "scripts/package-plugin.mjs",
  "scripts/generate-scoped-css.mjs",
  "scripts/run-evals.mjs",
  "scripts/eval-adapters/agent-command.mjs",
  "scripts/serve-tests.mjs",
  "scripts/vendor/codex/quick_validate.py",
  "scripts/vendor/codex/validate_plugin.py",
  "tests/browser/core.spec.mjs",
  "tests/fixtures/scoped-host.html",
  "skills/han-design/SKILL.md",
  "skills/han-design/LICENSE",
  "skills/han-design/agents/openai.yaml",
  "skills/han-design/scripts/check-output.mjs",
  "skills/han-design/scripts/check-browser-output.mjs",
  "skills/han-design/scripts/intent-contract.mjs",
  "skills/han-design/assets/han.css",
  "skills/han-design/assets/han-scoped.css",
  "skills/han-design/assets/tokens-scoped.css",
  "skills/han-design/assets/themes-scoped.css",
  "skills/han-design/assets/accessibility-scoped.css",
  "skills/han-design/assets/starters/starter-base.css",
  "skills/han-design/assets/starters/brand-landing.html",
  "skills/han-design/assets/starters/product-launch.html",
  "skills/han-design/assets/starters/dashboard-shell.html",
  "skills/han-design/assets/starters/exhibition-page.html",
  "skills/han-design/assets/starters/festival-campaign.html",
  "skills/han-design/assets/starters/editorial-page.html",
  "skills/han-design/assets/utilities.css",
  "skills/han-design/assets/accessibility.css",
  "skills/han-design/assets/palettes.css",
  "skills/han-design/references/design-guide.md",
  "skills/han-design/references/contemporary-palettes.md",
  "skills/han-design/references/component-catalog.md",
  "skills/han-design/references/cultural-methodology.md",
  "skills/han-design/references/dynasty-contexts.md",
  "skills/han-design/references/motif-semantics.md",
  "skills/han-design/references/calligraphy-and-seals.md",
  "skills/han-design/references/regional-and-ethnic-contexts.md",
  "skills/han-design/references/cultural-sources.md",
  "skills/han-design/references/task-recipes.md",
  "skills/han-design/references/autopilot.md",
  "skills/han-design/references/intent-alignment.md",
  "skills/han-design/references/page-archetypes.md",
  "skills/han-design/references/visual-review.md",
  "skills/han-design/references/output-evaluation.md",
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    report("Missing required file: " + file);
  }
}

function parseJson(relativePath) {
  try {
    return JSON.parse(read(relativePath));
  } catch (error) {
    report(relativePath + " is not valid JSON: " + error.message);
    return null;
  }
}

const pluginManifest = fs.existsSync(path.join(root, ".codex-plugin", "plugin.json"))
  ? parseJson(".codex-plugin/plugin.json")
  : null;
if (pluginManifest) {
  if (pluginManifest.name !== "han-design") report("Plugin name must be han-design.");
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(pluginManifest.version ?? "")) {
    report("Plugin version must use semantic versioning.");
  }
  if (!pluginManifest.description) report("Plugin description is required.");
  if (!pluginManifest.author?.name) report("Plugin author.name is required.");
  if (pluginManifest.skills !== "./skills/") report("Plugin skills path must be ./skills/.");
  for (const field of ["displayName", "shortDescription", "longDescription", "developerName", "category"]) {
    if (!pluginManifest.interface?.[field]) report("Plugin interface." + field + " is required.");
  }
  const defaultPrompts = pluginManifest.interface?.defaultPrompt;
  if (!Array.isArray(defaultPrompts) || defaultPrompts.length === 0 || defaultPrompts.length > 3) {
    report("Plugin interface.defaultPrompt must contain 1–3 prompts.");
  } else if (defaultPrompts.some((prompt) => typeof prompt !== "string" || prompt.length > 128)) {
    report("Plugin default prompts must be strings no longer than 128 characters.");
  }
  for (const unsupported of ["hooks"]) {
    if (unsupported in pluginManifest) report("Plugin manifest contains unsupported field: " + unsupported);
  }
}

if (
  fs.existsSync(path.join(root, "LICENSE")) &&
  fs.existsSync(path.join(skillDir, "LICENSE")) &&
  read("LICENSE") !== read("skills/han-design/LICENSE")
) {
  report("Root and packaged LICENSE files differ.");
}

const skillPath = path.join(skillDir, "SKILL.md");
if (fs.existsSync(skillPath)) {
  const skill = fs.readFileSync(skillPath, "utf8");
  const frontmatter = skill.match(/^---\n([\s\S]*?)\n---\n/);

  if (!frontmatter) {
    report("SKILL.md has no valid YAML frontmatter.");
  } else {
    const keys = [...frontmatter[1].matchAll(/^([a-zA-Z0-9_-]+):/gm)].map((match) => match[1]);
    const unexpected = keys.filter((key) => !["name", "description"].includes(key));
    const name = frontmatter[1].match(/^name:\s*(.+)$/m)?.[1]?.replace(/^["']|["']$/g, "");
    const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1];

    if (name !== "han-design") {
      report("SKILL.md name must be han-design.");
    }
    if (!description) {
      report("SKILL.md description is required.");
    }
    if (description && !description.includes("Do not use")) {
      report("SKILL.md description must include explicit non-trigger boundaries.");
    }
    if (unexpected.length > 0) {
      report("SKILL.md frontmatter has unsupported keys: " + unexpected.join(", "));
    }
    if (path.basename(skillDir) !== name) {
      report("Skill folder name must match the frontmatter name.");
    }
  }

  const lineCount = skill.split("\n").length;
  if (lineCount > 500) {
    report("SKILL.md exceeds 500 lines: " + lineCount);
  }
}

function checkMarkdownLinks(file) {
  const source = fs.readFileSync(file, "utf8");
  for (const match of source.matchAll(/\]\(([^)]+)\)/g)) {
    const link = match[1].trim().replace(/^<|>$/g, "").split("#")[0];
    if (!link || /^(?:https?:|mailto:|tel:)/.test(link)) {
      continue;
    }
    const target = path.resolve(path.dirname(file), link);
    if (!fs.existsSync(target)) {
      report(relative(file) + " references missing path: " + match[1]);
    }
  }
}

const markdownFiles = [
  ...walk(skillDir).filter((file) => file.endsWith(".md")),
];
for (const file of markdownFiles) {
  checkMarkdownLinks(file);
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
    const target = path.resolve(path.dirname(file), link.split(/[?#]/)[0]);
    if (!fs.existsSync(target)) {
      report(relative(file) + " references missing asset: " + link);
    }
  }
}

const snippetDir = path.join(skillDir, "assets", "snippets");
const starterDir = path.join(skillDir, "assets", "starters");
const htmlFiles = [snippetDir, starterDir]
  .flatMap((directory) => walk(directory))
  .filter((file) => file.endsWith(".html"));
for (const file of htmlFiles) {
  checkHtmlReferences(file);
  const source = fs.readFileSync(file, "utf8");
  if (file.includes(path.join("assets", "snippets")) && /^\s*\/\*/m.test(source)) {
    report(relative(file) + " contains CSS comments as HTML text.");
  }
  for (const heading of source.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)) {
    if (/<div\b/i.test(heading[2])) {
      report(relative(file) + " contains a div nested inside a heading.");
    }
  }
  if (file.startsWith(starterDir)) {
    if (!/<main\b/i.test(source)) report(relative(file) + " has no main landmark.");
    if (!/<h1\b/i.test(source)) report(relative(file) + " has no h1.");
    if (!/data-theme=["'][^"']+["']/i.test(source)) report(relative(file) + " has no theme.");
    if (!/data-han-intensity=["'][0-3]["']/i.test(source)) {
      report(relative(file) + " has no valid data-han-intensity.");
    }
    if (/\{[a-z_]+\}/i.test(source)) report(relative(file) + " contains unresolved placeholders.");
  }
}

const cssFiles = walk(path.join(skillDir, "assets")).filter((file) => file.endsWith(".css"));
const cssSource = cssFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
const definitions = new Set(
  [...cssSource.matchAll(/(--han-[\w-]+)\s*:/g)].map((match) => match[1]),
);

for (const file of cssFiles) {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    for (const match of line.matchAll(/var\(\s*(--han-[\w-]+)/g)) {
      const variable = match[1];
      const hasFallback = new RegExp("var\\(\\s*" + variable + "\\s*,").test(line);
      if (!definitions.has(variable) && !hasFallback) {
        report(relative(file) + ":" + (index + 1) + " uses undefined " + variable);
      }
    }
  });
}

const tokens = read("skills/han-design/assets/tokens.css");
const rootStart = tokens.indexOf(":root");
const rootBrace = tokens.indexOf("{", rootStart);
let depth = 0;
let rootEnd = -1;
for (let index = rootBrace; index < tokens.length; index += 1) {
  if (tokens[index] === "{") depth += 1;
  if (tokens[index] === "}") depth -= 1;
  if (depth === 0) {
    rootEnd = index;
    break;
  }
}
if (rootEnd > rootBrace && tokens.slice(rootBrace, rootEnd).includes("@keyframes")) {
  report("tokens.css contains @keyframes inside :root.");
}

const functionalTokens = [
  "--han-color-accent-decorative",
  "--han-color-accent-text",
  "--han-color-accent-control",
  "--han-color-on-accent",
  "--han-focus-ring",
  "--han-focus-ring-offset",
];
for (const token of functionalTokens) {
  if (!definitions.has(token)) {
    report("Missing functional color token: " + token);
  }
}

function parseHexColor(value) {
  const match = value?.trim().match(/^#([0-9a-f]{6})$/i);
  if (!match) return null;
  const hex = match[1];
  return [0, 2, 4].map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255);
}

function relativeLuminance(value) {
  const rgb = parseHexColor(value);
  if (!rgb) return null;
  const linear = rgb.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

function contrastRatio(foreground, background) {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  if (foregroundLuminance === null || backgroundLuminance === null) return null;
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

const themeSource = ["themes.css", "palettes.css"]
  .map((file) => read("skills/han-design/assets/" + file))
  .join("\n")
  .replace(/\/\*[\s\S]*?\*\//g, "");
const themeMatches = [...themeSource.matchAll(/\[data-theme=['"]([^'"]+)['"]\]\s*\{([\s\S]*?)\n\}/g)];
const expectedThemes = [
  "ink",
  "landscape",
  "porcelain",
  "dunhuang",
  "imperial",
  "wuxia",
  "tea",
  "vermilion",
  "celadon",
  "qinhan",
  "weijin",
  "tang",
  "song",
  "yuan",
  "ming",
  "qing",
  "pine-wheat",
  "plum-blush",
  "ocean-orchid",
  "caramel-cream",
  "mint-lavender",
  "berry-butter",
];
const parsedThemes = new Map(themeMatches.map((match) => [match[1], match[2]]));

for (const themeName of expectedThemes) {
  const body = parsedThemes.get(themeName);
  if (!body) {
    report("Missing theme definition: " + themeName);
    continue;
  }

  const values = new Map(
    [...body.matchAll(/(--han-[\w-]+)\s*:\s*(#[0-9a-f]{6})\s*;/gi)].map((match) => [
      match[1],
      match[2],
    ]),
  );
  const requiredThemeTokens = [
    "--han-color-bg",
    "--han-color-bg-surface",
    "--han-color-accent-decorative",
    "--han-color-accent-text",
    "--han-color-accent-control",
    "--han-color-on-accent",
    "--han-focus-ring",
  ];
  for (const token of requiredThemeTokens) {
    if (!values.has(token)) {
      report("Theme " + themeName + " is missing " + token);
    }
  }

  const backgrounds = [values.get("--han-color-bg"), values.get("--han-color-bg-surface")];
  for (const background of backgrounds) {
    const textContrast = contrastRatio(values.get("--han-color-accent-text"), background);
    if (textContrast !== null && textContrast < 4.5) {
      report(
        "Theme " +
          themeName +
          " accent text contrast is " +
          textContrast.toFixed(2) +
          ":1; expected at least 4.5:1.",
      );
    }

    const focusContrast = contrastRatio(values.get("--han-focus-ring"), background);
    if (focusContrast !== null && focusContrast < 3) {
      report(
        "Theme " +
          themeName +
          " focus ring contrast is " +
          focusContrast.toFixed(2) +
          ":1; expected at least 3:1.",
      );
    }
  }

  const onAccentContrast = contrastRatio(
    values.get("--han-color-on-accent"),
    values.get("--han-color-accent-control"),
  );
  if (onAccentContrast !== null && onAccentContrast < 4.5) {
    report(
      "Theme " +
        themeName +
        " on-accent contrast is " +
        onAccentContrast.toFixed(2) +
        ":1; expected at least 4.5:1.",
      );
  }

  for (const [surfaceName, backgroundToken, textToken] of [
    ["seal", "--han-seal-bg", "--han-seal-text"],
    ["stamp", "--han-stamp-bg", "--han-stamp-text"],
  ]) {
    const foreground = values.get(textToken);
    const background = values.get(backgroundToken);
    if (!foreground || !background) continue;
    const ratio = contrastRatio(foreground, background);
    if (ratio !== null && ratio < 4.5) {
      report(
        "Theme " +
          themeName +
          " " +
          surfaceName +
          " contrast is " +
          ratio.toFixed(2) +
          ":1; expected at least 4.5:1.",
      );
    }
  }
}

const entrypoint = read("skills/han-design/assets/han.css");
const expectedImports = [
  "tokens.css",
  "base.css",
  "utilities.css",
  "accessibility.css",
  "themes.css",
  "palettes.css",
  "icons.css",
  "patterns.css",
  "typography.css",
  "components.css",
  "iconic.css",
  "structure.css",
  "enhanced.css",
  "motion.css",
];
for (const imported of expectedImports) {
  if (!entrypoint.includes(imported)) {
    report("han.css does not import " + imported);
  }
}

const scopedEntrypoint = read("skills/han-design/assets/han-scoped.css");
if (/@import\s+url\(["']\.\/base\.css["']\)/.test(scopedEntrypoint)) {
  report("han-scoped.css must not import base.css.");
}
const expectedScopedImports = [
  "tokens-scoped.css",
  "themes-scoped.css",
  "utilities.css",
  "accessibility-scoped.css",
  "icons.css",
  "patterns.css",
  "typography.css",
  "components.css",
  "iconic.css",
  "structure.css",
  "enhanced.css",
  "motion.css",
];
for (const imported of expectedScopedImports) {
  if (!scopedEntrypoint.includes(imported)) {
    report("han-scoped.css does not import " + imported);
  }
}
if (!scopedEntrypoint.includes("data-han-scope")) {
  report("han-scoped.css must document the data-han-scope contract.");
}

for (const [name, expectedSource] of Object.entries(buildScopedCss())) {
  const relativePath = "skills/han-design/assets/" + name;
  if (fs.existsSync(path.join(root, relativePath)) && read(relativePath) !== expectedSource) {
    report(relativePath + " is stale; run node scripts/generate-scoped-css.mjs");
  }
  if (expectedSource.includes(":root")) {
    report(relativePath + " unexpectedly contains a :root token selector.");
  }
}

const darkMatch = themeSource.match(/\[data-color-mode=['"]dark['"]\]\s*\{([\s\S]*?)\n\}/);
if (!darkMatch) {
  report("Missing dark color-mode definition.");
} else {
  const darkValues = new Map(
    [...darkMatch[1].matchAll(/(--han-[\w-]+)\s*:\s*(#[0-9a-f]{6})\s*!important\s*;/gi)].map(
      (match) => [match[1], match[2]],
    ),
  );
  for (const token of [
    "--han-color-bg",
    "--han-color-bg-surface",
    "--han-color-text-primary",
    "--han-color-text-secondary",
    "--han-color-accent-text",
    "--han-color-accent-control",
    "--han-color-on-accent",
    "--han-focus-ring",
  ]) {
    if (!darkValues.has(token)) report("Dark color mode is missing " + token);
  }
  for (const background of [darkValues.get("--han-color-bg"), darkValues.get("--han-color-bg-surface")]) {
    for (const textToken of [
      "--han-color-text-primary",
      "--han-color-text-secondary",
      "--han-color-accent-text",
    ]) {
      const ratio = contrastRatio(darkValues.get(textToken), background);
      if (ratio !== null && ratio < 4.5) {
        report("Dark mode " + textToken + " contrast is " + ratio.toFixed(2) + ":1; expected 4.5:1.");
      }
    }
    const focusRatio = contrastRatio(darkValues.get("--han-focus-ring"), background);
    if (focusRatio !== null && focusRatio < 3) {
      report("Dark mode focus ring contrast is " + focusRatio.toFixed(2) + ":1; expected 3:1.");
    }
  }
  const onAccentRatio = contrastRatio(
    darkValues.get("--han-color-on-accent"),
    darkValues.get("--han-color-accent-control"),
  );
  if (onAccentRatio !== null && onAccentRatio < 4.5) {
    report("Dark mode on-accent contrast is " + onAccentRatio.toFixed(2) + ":1; expected 4.5:1.");
  }
}

const evalSuite = fs.existsSync(path.join(root, "evals", "cases.json"))
  ? parseJson("evals/cases.json")
  : null;
if (evalSuite) {
  const cases = evalSuite.cases;
  if (!Array.isArray(cases) || cases.length < 8) {
    report("evals/cases.json must contain at least 8 cases.");
  } else {
    const ids = cases.map((item) => item.id);
    if (new Set(ids).size !== ids.length) report("Eval case ids must be unique.");
    const positive = cases.filter((item) => item.shouldTrigger === true);
    const negative = cases.filter((item) => item.shouldTrigger === false);
    if (positive.length < 3 || negative.length < 3) {
      report("Eval suite must contain at least 3 positive and 3 negative trigger cases.");
    }
    for (const item of cases) {
      if (!item.id || !item.prompt || typeof item.shouldTrigger !== "boolean") {
        report("Every eval case requires id, prompt, and boolean shouldTrigger.");
        continue;
      }
      if (item.shouldTrigger) {
        if (!Array.isArray(item.expectedReferences) || item.expectedReferences.length === 0) {
          report("Positive eval " + item.id + " requires expectedReferences.");
        } else {
          for (const reference of item.expectedReferences) {
            if (!fs.existsSync(path.join(skillDir, reference))) {
              report("Eval " + item.id + " references missing skill path: " + reference);
            }
          }
        }
        if (!item.expectedAssetEntry || !fs.existsSync(path.join(skillDir, item.expectedAssetEntry))) {
          report("Positive eval " + item.id + " has a missing expectedAssetEntry.");
        }
        if (item.requiresIntentContract) {
          if (!item.expectedIntentKeyword) {
            report("Intent eval " + item.id + " requires expectedIntentKeyword.");
          }
          if (!Array.isArray(item.requiredIntentConstraints) || item.requiredIntentConstraints.length === 0) {
            report("Intent eval " + item.id + " requires requiredIntentConstraints.");
          }
          if (item.expectedIntensityMax === undefined) {
            report("Intent eval " + item.id + " requires expectedIntensityMax.");
          }
          if (!item.requiresIntentChecksPassed || !item.requiresBriefAlignmentNote) {
            report(
              "Intent eval " + item.id +
                " must require intent checks and a brief alignment note.",
            );
          }
        }
      } else if (!item.reason) {
        report("Negative eval " + item.id + " requires a reason.");
      }
    }
  }
}

const repositoryText = [
  ...walk(skillDir)
    .filter((file) => /\.(?:md|html|css|yaml)$/.test(file))
    .map((file) => fs.readFileSync(file, "utf8")),
].join("\n");

const brandFiles = [
  ...walk(skillDir),
].filter((file) => /\.(?:md|html|css|yaml|yml)$/.test(file));

const formerChineseBrand = String.fromCodePoint(0x4e39, 0x9752);
const formerLatinBrand = ["dan", "qing"].join("");
const formerDashedLatinBrand = ["dan", "qing"].join("-");
const formerNamespace = ["d", "q"].join("");

for (const file of brandFiles) {
  const source = fs.readFileSync(file, "utf8");
  const compactSource = source.replace(/<[^>]+>/g, "").replace(/\s+/g, "").toLowerCase();
  if (
    compactSource.includes(formerChineseBrand) ||
    compactSource.includes(formerLatinBrand) ||
    compactSource.includes(formerDashedLatinBrand)
  ) {
    report(relative(file) + " still contains the former brand.");
  }
  if (
    source.includes("--" + formerNamespace + "-") ||
    source.includes("." + formerNamespace + "-") ||
    source.includes(formerNamespace + "Nav")
  ) {
    report(relative(file) + " still contains the former CSS namespace.");
  }
}

if (repositoryText.includes("your-username")) {
  report("Repository still contains the your-username placeholder.");
}
if (repositoryText.includes("/skill/assets") || repositoryText.includes("skill/assets/")) {
  report("Repository still contains the legacy skill/assets path.");
}
if (/cdn\.jsdelivr\.net\/npm\/han@/.test(repositoryText)) {
  report("Repository advertises an unpublished npm CDN package.");
}

const culturalRiskPhrases = [
  "皇家专属符号",
  "枯山水意",
  "元代·粗放",
  "粗犷豪放",
  "等级森严",
  "密集饱满、不留白",
];
for (const phrase of culturalRiskPhrases) {
  if (repositoryText.includes(phrase)) {
    report("Repository contains an outdated cultural generalization: " + phrase);
  }
}

const skillInstructions = read("skills/han-design/SKILL.md");
for (const reference of [
  "cultural-methodology.md",
  "dynasty-contexts.md",
  "motif-semantics.md",
  "calligraphy-and-seals.md",
  "regional-and-ethnic-contexts.md",
  "cultural-sources.md",
  "task-recipes.md",
  "intent-alignment.md",
  "output-evaluation.md",
]) {
  if (!skillInstructions.includes(reference)) {
    report("SKILL.md does not route agents to " + reference);
  }
}
if (!skillInstructions.includes("scripts/check-output.mjs")) {
  report("SKILL.md does not route agents to scripts/check-output.mjs.");
}

const agentMetadata = read("skills/han-design/agents/openai.yaml");
if (!agentMetadata.includes("$han-design")) {
  report("agents/openai.yaml default_prompt must mention $han-design.");
}
const shortDescription = agentMetadata.match(/^\s*short_description:\s*"([^"]+)"\s*$/m)?.[1];
if (!shortDescription || shortDescription.length < 25 || shortDescription.length > 64) {
  report("agents/openai.yaml short_description must contain 25–64 characters.");
}

if (errors.length > 0) {
  console.error("Han validation failed:\n");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("Han validation passed.");
