import fs from "fs";
import path from "path";
import chalk from "chalk";

// Recursively count all files
function countFiles(dir) {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) count += countFiles(fullPath);
    else count++;
  }
  return count;
}

// Recursively sum total file sizes
function getTotalSize(dir) {
  let size = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) size += getTotalSize(fullPath);
    else size += fs.statSync(fullPath).size;
  }
  return size;
}

// Count "actual code" lines (non-empty, non-comment)
function countCodeLines(dir) {
  let total = 0;
  const exts = [".ts", ".js", ".cjs", ".mjs", ".d.ts", ".d.cts"];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      total += countCodeLines(fullPath);
    } else if (exts.includes(path.extname(entry.name))) {
      const content = fs.readFileSync(fullPath, "utf8");
      const lines = content
        .split(/\r?\n/)
        .filter(line => line.trim() !== "")
        .filter(line => !/^\/\//.test(line.trim()))
        .filter(line => !/^\/\*/.test(line.trim()))
        .filter(line => !/^\*/.test(line.trim()))
        .length;
      total += lines;
    }
  }
  return total;
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// Metrics (hardcoded as requested)
const metrics = {
  totalValidators: 23,
  stringValidators: 12,
  fileValidators: 5,
  numberValidators: 3,
  dateValidators: 3,
  dependencies: 0, // Vue 3 peer only
};

// Run analysis
const distPath = path.resolve("dist");
if (!fs.existsSync(distPath)) {
  console.error(chalk.red("❌ dist folder not found. Run your build first."));
  process.exit(1);
}

const fileCount = countFiles(distPath);
const totalSize = getTotalSize(distPath);
const totalLines = countCodeLines(distPath);
const bundleSize = totalSize / 1024; // KB estimate

// Output
console.log();
console.log(chalk.bold.cyan("📦  Build Summary"));
console.log(chalk.gray("──────────────────────────────"));
console.log(`${chalk.green("Files:")}                 ${chalk.white(fileCount.toLocaleString())}`);
console.log(`${chalk.green("Total Size:")}           ${chalk.white(formatSize(totalSize))}`);
console.log(`${chalk.green("Code Lines:")}           ${chalk.white(totalLines.toLocaleString())}`);
console.log(chalk.gray("──────────────────────────────"));
console.log(chalk.bold.cyan("📊  Validators Summary"));
console.log(`${chalk.green("Total Validators:")}    ${chalk.white(metrics.totalValidators)}`);
console.log(`${chalk.green("String Validators:")}   ${chalk.white(metrics.stringValidators)}`);
console.log(`${chalk.green("File Validators:")}     ${chalk.white(metrics.fileValidators)}`);
console.log(`${chalk.green("Number Validators:")}   ${chalk.white(metrics.numberValidators)}`);
console.log(`${chalk.green("Date Validators:")}     ${chalk.white(metrics.dateValidators)}`);
console.log(chalk.gray("──────────────────────────────"));
// console.log(`${chalk.green("Bundle Size (est.):")}  ${chalk.white((bundleSize / 1024).toFixed(2))}MB`);
console.log(`${chalk.green("Dependencies:")}        ${chalk.white(metrics.dependencies)} (Vue 3 peer only)`);
console.log(chalk.gray("──────────────────────────────"));
console.log(chalk.blueBright("✅  Analysis complete!\n"));
