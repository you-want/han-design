#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const strictIndex = args.indexOf("--strict");
const strict = strictIndex !== -1;
if (strict) args.splice(strictIndex, 1);

if (args.length === 0) {
  console.error("Usage: node scripts/check-output.mjs [--strict] <html-file-or-directory> [...]");
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

function openingTags(source, tagName) {
  return [...source.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))].map((match) => match[0]);
}

function hasAttribute(tag, name, expectedValue) {
  const attribute = new RegExp(`\\s${name}\\s*=\\s*["']([^"']*)["']`, "i").exec(tag);
  if (!attribute) return false;
  return expectedValue === undefined || attribute[1].toLowerCase() === expectedValue.toLowerCase();
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

let errorCount = 0;
let warningCount = 0;
let noteCount = 0;

function checkFile(file) {
  const source = fs.readFileSync(file, "utf8");
  const errors = [];
  const warnings = [];
  const notes = [];
  const fullDocument = /<!doctype\s+html/i.test(source) || /<html\b/i.test(source);
  const staticReference = /<html\b[^>]*\bdata-han-static-reference=["']true["']/i.test(source);

  const error = (message) => errors.push(message);
  const warn = (message) => warnings.push(message);
  const behaviorIssue = (message) =>
    staticReference ? notes.push("static visual reference: " + message) : error(message);

  if (fullDocument) {
    const htmlTag = openingTags(source, "html")[0] || "";
    if (!hasAttribute(htmlTag, "lang")) error("missing html lang attribute");
    if (!/<meta\b[^>]*name=["']viewport["'][^>]*>/i.test(source)) {
      error("missing viewport meta tag");
    }
    if (!/<title>[^<]+<\/title>/i.test(source)) error("missing non-empty title");
    if (!/<main\b/i.test(source)) {
      staticReference ? warn("static visual reference has no main landmark") : error("missing main landmark");
    }
    if (!/<h1\b/i.test(source)) error("missing h1");
    if (!/data-theme=["'][^"']+["']/i.test(source)) warn("no Han data-theme found");
    const hasCompleteEntry = /(?:href|src)=["'][^"']*han(?:-scoped)?\.css(?:[?#][^"']*)?["']/i.test(source);
    const hasCoreImports = /(?:href|src)=["'][^"']*(?:tokens|base)\.css(?:[?#][^"']*)?["']/i.test(source);
    if (!hasCompleteEntry && !hasCoreImports) {
      warn("Han CSS entry point is not referenced");
    }
  }

  for (const match of source.matchAll(/\{[a-zA-Z][a-zA-Z0-9_]*\}/g)) {
    error("unresolved placeholder " + match[0]);
  }

  for (const tag of openingTags(source, "img")) {
    if (!hasAttribute(tag, "alt")) error("img missing alt attribute: " + tag.slice(0, 100));
  }

  for (const tag of openingTags(source, "button")) {
    if (!hasAttribute(tag, "type")) error("button missing explicit type: " + tag.slice(0, 100));
  }

  if (/href=["']#["']/i.test(source)) warn("placeholder href=\"#\" found");
  if (/\sonclick\s*=/i.test(source)) warn("inline onclick handler found; verify keyboard and state behavior");
  if (/<div\b[^>]*(?:onclick\s*=|role=["']button["']|tabindex=["']0["'])/i.test(source)) {
    warn("interactive div found; prefer a native button or verify complete keyboard behavior");
  }

  if (/class=["'][^"']*han-navbar__toggle/i.test(source)) {
    const toggle = openingTags(source, "button").find((tag) => /han-navbar__toggle/i.test(tag));
    if (!toggle || !hasAttribute(toggle, "aria-expanded") || !hasAttribute(toggle, "aria-controls")) {
      error("navbar toggle requires button, aria-expanded, and aria-controls");
    }
  }

  if (/class=["'][^"']*han-modal(?:\s|["'])/i.test(source)) {
    const modalTag = openingTags(source, "div").find((tag) => /class=["'][^"']*han-modal(?:\s|["'])/i.test(tag));
    if (!modalTag || !hasAttribute(modalTag, "role", "dialog") || !hasAttribute(modalTag, "aria-modal", "true")) {
      behaviorIssue("han-modal requires role=dialog and aria-modal=true on the dialog container");
    }
  }

  if (/class=["'][^"']*han-tabs(?:\s|["'])/i.test(source)) {
    if (!/role=["']tablist["']/i.test(source) || !/role=["']tab["']/i.test(source)) {
      behaviorIssue("han-tabs requires tablist and tab roles");
    }
    if (!/role=["']tabpanel["']/i.test(source) || !/aria-selected=/i.test(source)) {
      behaviorIssue("han-tabs requires tabpanel and aria-selected state");
    }
  }

  if (/class=["'][^"']*han-select(?:\s|["'])/i.test(source) && !/<select\b/i.test(source)) {
    if (!/role=["']combobox["']/i.test(source) || !/role=["']listbox["']/i.test(source)) {
      behaviorIssue("custom han-select requires combobox and listbox semantics");
    }
  }

  if (/class=["'][^"']*han-accordion(?:\s|["'])/i.test(source) && !/aria-expanded=/i.test(source)) {
    behaviorIssue("han-accordion triggers require aria-expanded state");
  }

  if (/class=["'][^"']*han-tree(?:\s|["'])/i.test(source) && !/role=["']tree["']/i.test(source)) {
    behaviorIssue("han-tree requires tree semantics");
  }

  if (/class=["'][^"']*han-upload(?:\s|["'])/i.test(source) && !/<input\b[^>]*type=["']file["']/i.test(source)) {
    behaviorIssue("han-upload requires a real file input");
  }

  console.log(`\n${path.relative(process.cwd(), file)}`);
  for (const message of errors) console.log("  ERROR: " + message);
  for (const message of warnings) console.log("  WARN:  " + message);
  for (const message of notes) console.log("  NOTE:  " + message);
  if (errors.length === 0 && warnings.length === 0) console.log("  OK");

  errorCount += errors.length;
  warningCount += warnings.length;
  noteCount += notes.length;
}

for (const file of files) checkFile(file);

console.log(
  `\nChecked ${files.length} HTML file(s): ${errorCount} error(s), ${warningCount} warning(s), ${noteCount} note(s).`,
);
if (errorCount > 0 || (strict && warningCount > 0)) process.exit(1);
