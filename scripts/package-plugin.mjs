import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateScopedCss } from "./generate-scoped-css.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist", "han-design-plugin");

generateScopedCss();

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const relativePath of [".codex-plugin", "skills", "LICENSE"]) {
  const source = path.join(root, relativePath);
  if (!fs.existsSync(source)) continue;
  fs.cpSync(source, path.join(output, relativePath), { recursive: true });
}

for (const excluded of ["examples", "output", "evals"]) {
  if (fs.existsSync(path.join(output, excluded))) {
    throw new Error("Plugin package unexpectedly contains " + excluded);
  }
}

console.log(path.relative(root, output));
