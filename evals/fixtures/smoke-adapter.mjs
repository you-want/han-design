import fs from "node:fs";
import path from "node:path";

/* Runner-plumbing fixture only. It is not a model-quality evaluation. */
let input = "";
for await (const chunk of process.stdin) input += chunk;
const payload = JSON.parse(input);
const suite = JSON.parse(fs.readFileSync(path.join(payload.repositoryRoot, "evals", "cases.json"), "utf8"));
const item = suite.cases.find((candidate) => candidate.id === payload.case.id);
process.stdout.write(JSON.stringify({
  triggered: item.shouldTrigger,
  references: item.expectedReferences ?? [],
  assetEntry: item.expectedAssetEntry ?? null,
  starter: item.expectedStarter ?? null,
  intensity: item.expectedIntensity ?? null,
  designBrief: item.requiresDesignBrief ? "Synthetic design brief for runner plumbing." : null,
  revisionPerformed: item.requiresRevision ? true : false,
  checksPassed: item.requiresChecksPassed ? true : false,
  reviewedViewports: item.requiredViewports ?? [],
  notes: "Synthetic response used only to verify eval runner scoring and reporting.",
}));
