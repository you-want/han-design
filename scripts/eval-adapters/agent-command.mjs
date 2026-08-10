/* Execute a fresh external agent without exposing expected eval answers. */
import { spawnSync } from "node:child_process";

let input = "";
for await (const chunk of process.stdin) input += chunk;
const payload = JSON.parse(input);
const executable = process.env.HAN_EVAL_AGENT;
if (!executable) {
  console.error("Set HAN_EVAL_AGENT to a fresh-session agent executable.");
  process.exit(2);
}

let agentArgs = [];
try {
  agentArgs = JSON.parse(process.env.HAN_EVAL_AGENT_ARGS ?? "[]");
  if (!Array.isArray(agentArgs) || agentArgs.some((item) => typeof item !== "string")) throw new Error();
} catch {
  console.error("HAN_EVAL_AGENT_ARGS must be a JSON array of strings.");
  process.exit(2);
}

const prompt = `${payload.case.prompt}

Available skill directory: ${payload.skillRoot}
Decide from the skill metadata whether it applies; do not force it for an out-of-scope request.
After completing enough work to determine routing and, when requested, the autonomous design loop, return only this observation JSON:
{"triggered":boolean,"references":["relative paths actually read"],"assetEntry":"relative path actually selected or null","starter":"relative starter path or null","intensity":"0-3 or null","designBrief":"brief or null","intentContract":"version 1 object or null","intentChecksPassed":"boolean or null","intentViolations":["remaining machine-checkable violations"],"briefAlignmentNote":"short comparison of the brief and rendered result or null","reviewedViewports":["desktop","mobile"],"revisionPerformed":boolean,"checksPassed":boolean,"outputPath":"optional repository-relative artifact path"}`;

const result = spawnSync(executable, agentArgs, {
  cwd: payload.repositoryRoot,
  env: { ...process.env, HAN_EVAL_SKILL_ROOT: payload.skillRoot },
  input: prompt,
  encoding: "utf8",
  maxBuffer: 20 * 1024 * 1024,
});
if (result.error) throw result.error;
if (result.status !== 0) {
  console.error(result.stderr || `Agent exited with status ${result.status}`);
  process.exit(result.status || 1);
}

const output = result.stdout.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
const firstBrace = output.indexOf("{");
const lastBrace = output.lastIndexOf("}");
if (firstBrace === -1 || lastBrace === -1) {
  console.error("Agent output did not contain an observation JSON object.");
  process.exit(1);
}
process.stdout.write(output.slice(firstBrace, lastBrace + 1));
