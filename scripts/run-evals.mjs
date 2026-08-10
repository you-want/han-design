#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateIntentContract } from "../skills/han-design/scripts/intent-contract.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const suitePath = path.join(root, "evals", "cases.json");
const args = process.argv.slice(2);

function option(name) {
  const index = args.indexOf(name);
  return index === -1 ? null : args[index + 1];
}

const adapterArgument = option("--adapter");
const caseFilter = option("--case");
const outputArgument = option("--output");
const validateOnly = args.includes("--validate-only");
const allowSmokeAdapter = args.includes("--allow-smoke-adapter");

if (!fs.existsSync(suitePath)) {
  console.error("Missing eval suite: " + suitePath);
  process.exit(2);
}

const suite = JSON.parse(fs.readFileSync(suitePath, "utf8"));
if (!Array.isArray(suite.cases) || suite.cases.length === 0) {
  console.error("Eval suite has no cases.");
  process.exit(2);
}

let cases = suite.cases;
if (caseFilter) cases = cases.filter((item) => item.id === caseFilter);
if (cases.length === 0) {
  console.error("No eval cases matched.");
  process.exit(2);
}

if (validateOnly) {
  console.log(`Eval suite is runnable: ${cases.length} case(s).`);
  process.exit(0);
}

if (!adapterArgument) {
  console.error(
    "A real agent adapter is required. Use --adapter <executable-or-mjs>. " +
      "The adapter receives one case as JSON on stdin and must return one JSON result on stdout.",
  );
  process.exit(2);
}

const adapterPath = path.resolve(adapterArgument);
if (!fs.existsSync(adapterPath)) {
  console.error("Missing eval adapter: " + adapterPath);
  process.exit(2);
}
if (adapterPath.includes(`${path.sep}evals${path.sep}fixtures${path.sep}`) && !allowSmokeAdapter) {
  console.error("Fixture adapters only test runner plumbing; pass --allow-smoke-adapter explicitly.");
  process.exit(2);
}

function runAdapter(item) {
  const command = adapterPath.endsWith(".mjs") || adapterPath.endsWith(".js")
    ? process.execPath
    : adapterPath;
  const commandArgs = command === process.execPath ? [adapterPath] : [];
  const payload = {
    version: 1,
    case: { id: item.id, prompt: item.prompt },
    skillRoot: path.join(root, "skills", "han-design"),
    repositoryRoot: root,
  };
  const child = spawnSync(command, commandArgs, {
    cwd: root,
    input: JSON.stringify(payload),
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });
  if (child.error) throw child.error;
  if (child.status !== 0) {
    throw new Error(`adapter exited ${child.status}: ${child.stderr.trim()}`);
  }
  try {
    return JSON.parse(child.stdout);
  } catch {
    throw new Error("adapter did not return valid JSON: " + child.stdout.slice(0, 300));
  }
}

function score(item, result) {
  const failures = [];
  if (typeof result.triggered !== "boolean") failures.push("missing boolean triggered");
  if (result.triggered !== item.shouldTrigger) {
    failures.push(`triggered=${result.triggered}; expected ${item.shouldTrigger}`);
  }

  if (item.shouldTrigger) {
    const references = Array.isArray(result.references) ? result.references : [];
    for (const expected of item.expectedReferences) {
      if (!references.includes(expected)) failures.push("missing reference " + expected);
    }
    if (result.assetEntry !== item.expectedAssetEntry) {
      failures.push(`assetEntry=${result.assetEntry ?? "null"}; expected ${item.expectedAssetEntry}`);
    }
    if (item.expectedStarter && result.starter !== item.expectedStarter) {
      failures.push(`starter=${result.starter ?? "null"}; expected ${item.expectedStarter}`);
    }
    if (item.expectedIntensity && String(result.intensity) !== item.expectedIntensity) {
      failures.push(`intensity=${result.intensity ?? "null"}; expected ${item.expectedIntensity}`);
    }
    if (item.expectedValidationMode && result.validationMode !== item.expectedValidationMode) {
      failures.push(
        `validationMode=${result.validationMode ?? "null"}; expected ${item.expectedValidationMode}`,
      );
    }
    if (item.expectedIntensityMax !== undefined) {
      const intensity = Number(result.intensity);
      if (
        result.intensity === null ||
        result.intensity === undefined ||
        result.intensity === "" ||
        !Number.isFinite(intensity) ||
        intensity > item.expectedIntensityMax
      ) {
        failures.push(`intensity=${result.intensity ?? "null"}; expected <= ${item.expectedIntensityMax}`);
      }
    }
    if (item.requiresDesignBrief && !(typeof result.designBrief === "string" && result.designBrief.trim())) {
      failures.push("missing non-empty designBrief");
    }
    if (item.requiresIntentContract) {
      const contractErrors = validateIntentContract(result.intentContract);
      for (const error of contractErrors) failures.push("invalid intentContract: " + error);
      const contractIntensity = result.intentContract?.interpretation?.intensity;
      const observedIntensity = Number(result.intensity);
      if (
        Number.isInteger(contractIntensity) &&
        Number.isFinite(observedIntensity) &&
        contractIntensity !== observedIntensity
      ) {
        failures.push(
          `intentContract intensity=${contractIntensity}; observation intensity=${observedIntensity}`,
        );
      }
    }
    if (item.expectedIntentKeyword) {
      const keywords = result.intentContract?.intent?.keywords;
      if (!Array.isArray(keywords) || !keywords.includes(item.expectedIntentKeyword)) {
        failures.push("intentContract missing keyword " + item.expectedIntentKeyword);
      }
    }
    if (Array.isArray(item.requiredIntentConstraints)) {
      const constraintIds = new Set(
        Array.isArray(result.intentContract?.constraints?.hard)
          ? result.intentContract.constraints.hard.map((constraint) => constraint.id)
          : [],
      );
      for (const id of item.requiredIntentConstraints) {
        if (!constraintIds.has(id)) failures.push("intentContract missing hard constraint " + id);
      }
    }
    if (item.requiresIntentChecksPassed && result.intentChecksPassed !== true) {
      failures.push("intentChecksPassed must be true");
    }
    if (
      item.requiresIntentChecksPassed &&
      Array.isArray(result.intentViolations) &&
      result.intentViolations.length > 0
    ) {
      failures.push(`intentViolations must be empty; got ${result.intentViolations.length}`);
    }
    if (
      item.requiresBriefAlignmentNote &&
      !(typeof result.briefAlignmentNote === "string" && result.briefAlignmentNote.trim())
    ) {
      failures.push("missing non-empty briefAlignmentNote");
    }
    if (item.requiresRevision && result.revisionPerformed !== true) {
      failures.push("revisionPerformed must be true");
    }
    if (item.requiresChecksPassed && result.checksPassed !== true) {
      failures.push("checksPassed must be true");
    }
    if (Array.isArray(item.requiredViewports)) {
      const reviewed = Array.isArray(result.reviewedViewports) ? result.reviewedViewports : [];
      for (const viewport of item.requiredViewports) {
        if (!reviewed.includes(viewport)) failures.push("missing reviewed viewport " + viewport);
      }
    }
  }

  if (result.outputPath) {
    const resolved = path.resolve(root, result.outputPath);
    if (!fs.existsSync(resolved)) failures.push("outputPath does not exist: " + result.outputPath);
  }

  return { passed: failures.length === 0, failures };
}

const startedAt = new Date().toISOString();
const results = [];
for (const item of cases) {
  try {
    const observation = runAdapter(item);
    const verdict = score(item, observation);
    results.push({ id: item.id, expectedTrigger: item.shouldTrigger, observation, ...verdict });
  } catch (error) {
    results.push({
      id: item.id,
      expectedTrigger: item.shouldTrigger,
      passed: false,
      failures: [error.message],
    });
  }
}

const passed = results.filter((item) => item.passed).length;
const intentCases = results.filter((item) => item.observation?.intentContract);
const report = {
  version: 1,
  startedAt,
  completedAt: new Date().toISOString(),
  adapter: path.relative(root, adapterPath),
  summary: {
    total: results.length,
    passed,
    failed: results.length - passed,
    intentContracts: intentCases.length,
    intentChecksPassed: intentCases.filter((item) => item.observation?.intentChecksPassed === true).length,
  },
  results,
};

const outputPath = outputArgument
  ? path.resolve(outputArgument)
  : path.join(root, "evals", "results", "latest.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2) + "\n");

for (const item of results) {
  console.log(`${item.passed ? "PASS" : "FAIL"} ${item.id}`);
  for (const failure of item.failures) console.log("  - " + failure);
}
console.log(`\n${passed}/${results.length} eval case(s) passed. Report: ${path.relative(root, outputPath)}`);
if (passed !== results.length) process.exit(1);
