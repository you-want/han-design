import fs from "node:fs";
import path from "node:path";

/* Runner-plumbing fixture only. It is not a model-quality evaluation. */
let input = "";
for await (const chunk of process.stdin) input += chunk;
const payload = JSON.parse(input);
const suite = JSON.parse(fs.readFileSync(path.join(payload.repositoryRoot, "evals", "cases.json"), "utf8"));
const item = suite.cases.find((candidate) => candidate.id === payload.case.id);
const intentContract = item.requiresIntentContract
  ? {
      version: 1,
      sourcePrompt: item.prompt,
      brief: "Synthetic quiet design brief for runner plumbing.",
      intent: {
        keywords: item.expectedIntentKeyword ? [item.expectedIntentKeyword] : [],
        confidence: "high",
        rationale: "Synthetic fixture generated from eval expectations.",
      },
      interpretation: {
        intensity: item.expectedIntensityMax ?? Number(item.expectedIntensity ?? 1),
        mode: "contemporary-chinese-inspired",
      },
      constraints: {
        hard: (item.requiredIntentConstraints ?? []).map((id) => {
          const definitions = {
            "intensity-cap": ["visualIntensity", "lte", item.expectedIntensityMax ?? 1],
            "accent-family-cap": ["accentColorFamilies", "lte", 1],
            "entry-motion-default-off": ["entryAnimations", "eq", 0],
          };
          const [metric, operator, value] = definitions[id] ?? [id, "eq", true];
          return { id, metric, operator, value, reason: "Synthetic runner fixture." };
        }),
        soft: ["Synthetic runner fixture."],
      },
    }
  : null;
process.stdout.write(JSON.stringify({
  triggered: item.shouldTrigger,
  references: item.expectedReferences ?? [],
  assetEntry: item.expectedAssetEntry ?? null,
  starter: item.expectedStarter ?? null,
  intensity: item.expectedIntensity ?? item.expectedIntensityMax ?? null,
  designBrief: item.requiresDesignBrief ? "Synthetic design brief for runner plumbing." : null,
  intentContract,
  intentChecksPassed: item.requiresIntentChecksPassed ? true : null,
  intentViolations: [],
  briefAlignmentNote: item.requiresBriefAlignmentNote ? "Synthetic brief and output are aligned." : null,
  revisionPerformed: item.requiresRevision ? true : false,
  checksPassed: item.requiresChecksPassed ? true : false,
  reviewedViewports: item.requiredViewports ?? [],
  notes: "Synthetic response used only to verify eval runner scoring and reporting.",
}));
