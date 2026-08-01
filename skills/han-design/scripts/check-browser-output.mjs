#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const args = process.argv.slice(2);
const strictIndex = args.indexOf("--strict");
const strict = strictIndex !== -1;
if (strict) args.splice(strictIndex, 1);
const rootIndex = args.indexOf("--root");
const serveRoot = path.resolve(rootIndex === -1 ? process.cwd() : args[rootIndex + 1]);
if (rootIndex !== -1) args.splice(rootIndex, 2);

if (args.length === 0) {
  console.error("Usage: node scripts/check-browser-output.mjs [--strict] <html-file-or-directory> [...]");
  process.exit(2);
}

let chromium;
let axeSource;
try {
  ({ chromium } = await import("playwright"));
  const axeModule = await import("axe-core");
  axeSource = axeModule.default.source;
} catch {
  console.error(
    "Browser checks require Playwright and axe. In the Han repository run `npm ci`; " +
      "else install `playwright` and `@axe-core/playwright` in the host project.",
  );
  process.exit(2);
}

function walk(target) {
  const stat = fs.statSync(target);
  if (stat.isDirectory()) {
    return fs.readdirSync(target, { withFileTypes: true }).flatMap((entry) =>
      walk(path.join(target, entry.name)),
    );
  }
  return target.endsWith(".html") ? [target] : [];
}

const files = args.flatMap((target) => {
  const resolved = path.resolve(target);
  if (!fs.existsSync(resolved)) {
    console.error("Missing path: " + target);
    process.exitCode = 2;
    return [];
  }
  return walk(resolved);
});
if (files.length === 0) {
  console.error("No HTML files found.");
  process.exit(2);
}

const browser = await chromium.launch({ headless: true });
const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".svg", "image/svg+xml"],
]);
const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const target = path.resolve(serveRoot, "." + pathname);
  if (target !== serveRoot && !target.startsWith(serveRoot + path.sep)) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.setHeader("Content-Type", contentTypes.get(path.extname(target)) ?? "application/octet-stream");
  fs.createReadStream(target).pipe(response);
});
await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(0, "127.0.0.1", resolve);
});
const address = server.address();
const origin = `http://127.0.0.1:${address.port}`;
let errorCount = 0;
let warningCount = 0;

for (const file of files) {
  const errors = [];
  const warnings = [];
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  let stage = "initial load";
  const loadedResourceNames = new Set();
  page.on("pageerror", (error) => errors.push("runtime exception: " + error.message));
  page.on("response", (response) => {
    const resourceName = path.posix.basename(new URL(response.url()).pathname);
    if (process.env.HAN_BROWSER_DEBUG && response.url().endsWith(".css")) {
      console.log(`DEBUG ${response.status()} ${response.url()}`);
    }
    if (response.status() < 400) loadedResourceNames.add(resourceName);
    const axeImportRetry = stage === "axe analysis" && loadedResourceNames.has(resourceName);
    if (response.status() >= 400 && !axeImportRetry) {
      warnings.push(`HTTP ${response.status()} during ${stage}: ${response.url()}`);
    }
  });
  page.on("console", (message) => {
    if (message.type() === "error" && !message.text().startsWith("Failed to load resource:")) {
      const source = message.location().url;
      warnings.push("console error: " + message.text() + (source ? " [" + source + "]" : ""));
    }
  });

  const relativeFile = path.relative(serveRoot, file);
  if (relativeFile.startsWith("..") || path.isAbsolute(relativeFile)) {
    errors.push(`file is outside browser root ${serveRoot}; pass --root <directory>`);
  } else {
    await page.goto(origin + "/" + relativeFile.split(path.sep).map(encodeURIComponent).join("/"), {
      waitUntil: "domcontentloaded",
    });
  }
  stage = "axe analysis";
  await page.addScriptTag({ content: axeSource });
  const axe = await page.evaluate(() =>
    globalThis.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] } }),
  );
  for (const violation of axe.violations) {
    const message = `axe ${violation.id} (${violation.impact ?? "unknown"}): ${violation.help}`;
    if (["serious", "critical"].includes(violation.impact)) errors.push(message);
    else warnings.push(message);
  }

  stage = "viewport checks";
  for (const width of [375, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    const overflow = await page.evaluate(() =>
      Math.max(document.documentElement.scrollWidth, document.body?.scrollWidth ?? 0) -
        document.documentElement.clientWidth,
    );
    if (overflow > 1) errors.push(`horizontal overflow at ${width}px: ${overflow}px`);
  }

  await page.setViewportSize({ width: 1280, height: 800 });
  await page.keyboard.press("Tab");
  const focus = await page.evaluate(() => {
    const element = document.activeElement;
    if (!element || element === document.body) return null;
    const style = getComputedStyle(element);
    return {
      tag: element.tagName.toLowerCase(),
      outline: `${style.outlineStyle} ${style.outlineWidth}`,
      shadow: style.boxShadow,
    };
  });
  if (!focus) warnings.push("no keyboard-focusable element reached with Tab");
  else if (focus.outline === "none 0px" && focus.shadow === "none") {
    errors.push(`first keyboard target (${focus.tag}) has no computed focus indicator`);
  }

  stage = "reduced-motion reload";
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload({ waitUntil: "domcontentloaded" });
  const longAnimations = await page.evaluate(() =>
    document.getAnimations().filter((animation) => {
      const duration = Number(animation.effect?.getTiming().duration ?? 0);
      return Number.isFinite(duration) && duration > 100 && animation.playState === "running";
    }).length,
  );
  if (longAnimations > 0) warnings.push(`${longAnimations} long-running animation(s) remain under reduced motion`);

  await context.close();
  console.log(`\n${path.relative(process.cwd(), file)}`);
  for (const message of errors) console.log("  ERROR: " + message);
  for (const message of warnings) console.log("  WARN:  " + message);
  if (errors.length === 0 && warnings.length === 0) console.log("  OK");
  errorCount += errors.length;
  warningCount += warnings.length;
}

await browser.close();
await new Promise((resolve) => server.close(resolve));
console.log(`\nChecked ${files.length} HTML file(s): ${errorCount} error(s), ${warningCount} warning(s).`);
if (errorCount > 0 || (strict && warningCount > 0)) process.exit(1);
