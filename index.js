#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { cp, rm } from "node:fs/promises";

const t1 = Date.now();

const packageName = process.argv.pop();

if (packageName === undefined || packageName.length === 0) {
  console.error("Unknown Syntax Error: Not enough positional arguments.");
  console.error("");
  console.error("yarn patch-squash <package>");
  process.exit(1);
}

const resultOriginal = spawnSync("yarn", ["patch", packageName, "--json"], { encoding: "utf-8" });
const resultPatched = spawnSync("yarn", ["patch", packageName, "--json", "--update"], { encoding: "utf-8" });

const outputOriginal = resultOriginal.output.filter(x => x).join();
const outputPatched = resultPatched.output.filter(x => x).join();

if (resultOriginal.status !== 0) {
  console.error(`<yarn patch ${packageName} --json> failed wit exit code ${resultOriginal.status}`);
  console.log(outputOriginal);
  process.exit(resultOriginal.status);
}

if (resultPatched.status !== 0) {
  console.error(`<yarn patch ${packageName} --json --update> failed wit exit code ${resultPatched.status}`);
  console.log(outputPatched);
  process.exit(resultPatched.status);
}

const jsonOriginal = JSON.parse(outputOriginal);
const jsonPatched = JSON.parse(outputPatched);

const pathOriginal = jsonOriginal.path;
const pathPatched = jsonPatched.path;

await rm(pathOriginal, { force: true, recursive: true });
await cp(pathPatched, pathOriginal, { force: true, recursive: true });

const t2 = Date.now();
const diff = t2 - t1;

console.log(`➤ YN0000: Package ${jsonOriginal.locator} got extracted with success!`);
console.log(`➤ YN0000: You can now edit the following folder: ${pathOriginal}`);
console.log(`➤ YN0000: Once you are done run yarn patch-commit -s ${pathOriginal} and Yarn will store a patchfile based on your changes.`);
console.log(`➤ YN0000: Done in ${Math.floor(diff / 1000)}s ${diff % 1000}ms`);
