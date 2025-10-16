#!/usr/bin/env node
import chalk from "chalk";
import fs from "fs";
import path from "path";

// -----------------------------
// CONFIG
// -----------------------------
const OUTPUT_FILE = path.join("temp", "project-structure.md");
const EXCLUDE = ["node_modules", ".git", "bin", "obj", "dist", "temp"];
const ROOT = process.cwd();

// -----------------------------
// Helpers
// -----------------------------
const excludePattern = new RegExp(EXCLUDE.map(e => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"));

function walk(dir, parentDepth = 0) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  let result = [];

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relPath = "." + fullPath.replace(ROOT, "").replace(/\\/g, "/");

    if (excludePattern.test(fullPath)) continue;

    // Record this item
    result.push({ path: relPath, isDir: item.isDirectory(), depth: parentDepth });

    // Recurse if directory
    if (item.isDirectory()) {
      result = result.concat(walk(fullPath, parentDepth + 1));
    }
  }

  return result;
}

function writeMarkdown(items) {
  const lines = [];
  lines.push("# Project Structure");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push("");

  lines.push("## Flat List");
  items.forEach(i => lines.push(i.path));
  lines.push("");

  lines.push("## Tree View");
  items.forEach(i => {
    const indent = "  ".repeat(i.depth);
    const name = i.path.split("/").pop();
    lines.push(`${indent}- ${name}`);
  });

  // Ensure output folder exists
  const outDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(OUTPUT_FILE, lines.join("\n"), "utf-8");
  console.log(`${chalk.green("✅ Project structure exported to")} ${chalk.gray(OUTPUT_FILE)}`);
}

// -----------------------------
// Run
// -----------------------------
const allItems = walk(ROOT);
writeMarkdown(allItems);
