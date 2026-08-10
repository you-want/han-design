#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);

function takeOption(name) {
  const index = args.indexOf(name);
  if (index === -1) return null;
  const value = args[index + 1];
  if (!value || value.startsWith("--")) {
    console.error(`Missing value for ${name}`);
    process.exit(2);
  }
  args.splice(index, 2);
  return value;
}

const mode = takeOption("--mode") ?? "fast";
const contractArgument = takeOption("--contract");
const reportArgument = takeOption("--report");

if (!new Set(["fast", "strict"]).has(mode)) {
  console.error(`Unsupported mode: ${mode}. Use fast or strict.`);
  process.exit(2);
}

if (args.length !== 1) {
  console.error(
    "Usage: node scripts/check-page.mjs [--mode fast|strict] [--contract file.json] " +
      "[--report report.json] <page.html>",
  );
  process.exit(2);
}

const target = path.resolve(args[0]);
if (!fs.existsSync(target) || !fs.statSync(target).isFile() || path.extname(target) !== ".html") {
  console.error(`Missing HTML page: ${args[0]}`);
  process.exit(2);
}

const relativeTarget = path.relative(root, target);
const automaticContract = target.replace(/\.html$/i, ".intent.json");
const contract = contractArgument
  ? path.resolve(contractArgument)
  : fs.existsSync(automaticContract)
    ? automaticContract
    : null;
const pageName = path.basename(target, ".html");
const report = path.resolve(reportArgument ?? path.join(root, "test-results", `${pageName}-${mode}-report.json`));
const browserReport = mode === "strict"
  ? path.join(root, "node_modules", ".cache", "han-design", `${process.pid}-${pageName}.json`)
  : report;
const staticChecker = path.join(root, "skills", "han-design", "scripts", "check-output.mjs");
const browserChecker = path.join(root, "skills", "han-design", "scripts", "check-browser-output.mjs");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

function run(label, command, commandArgs) {
  console.log(`\n[${mode}] ${label}`);
  const result = spawnSync(command, commandArgs, {
    cwd: root,
    encoding: "utf8",
    stdio: "inherit",
  });
  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run("Static page check", process.execPath, [staticChecker, "--strict", relativeTarget]);

const browserArgs = [browserChecker];
if (mode === "fast") browserArgs.push("--fast");
if (mode === "strict") browserArgs.push("--strict");
if (contract) browserArgs.push("--contract", path.relative(root, contract));
browserArgs.push("--report", browserReport, relativeTarget);
run(mode === "fast" ? "Mobile browser check" : "Desktop and mobile browser check", process.execPath, browserArgs);

if (mode === "strict") {
  run("Repository validation", npmCommand, ["run", "validate"]);
  if (!relativeTarget.startsWith("..") && relativeTarget.split(path.sep)[0] === "examples") {
    run("Example registry validation", npmCommand, ["run", "validate:examples"]);
  }
  run("Full browser regression", npmCommand, ["run", "test:browser"]);
  fs.mkdirSync(path.dirname(report), { recursive: true });
  fs.copyFileSync(browserReport, report);
  fs.rmSync(browserReport, { force: true });
}

console.log(`\n${mode === "fast" ? "Fast" : "Strict"} page checks passed: ${relativeTarget}`);
console.log(`Report: ${path.relative(root, report)}`);
if (mode === "strict") {
  console.log("Strict workflow still requires desktop/mobile visual review and a brief-alignment note.");
}
