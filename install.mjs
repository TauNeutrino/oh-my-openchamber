#!/usr/bin/env node
// oh-my-openchamber installer (v0) — cross-platform (Windows, Linux, macOS).
// Needs only Node.js: `node install.mjs [target-dir]`  (default: current directory)
// Or let an LLM agent install it — see README; every OS works.
import { cpSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const src = join(fileURLToPath(new URL(".", import.meta.url)));
const target = resolve(process.argv[2] ?? process.cwd());

const agentsDst = join(target, ".opencode", "agents");
const skillsDst = join(target, ".opencode", "skills");
mkdirSync(agentsDst, { recursive: true });
mkdirSync(skillsDst, { recursive: true });

cpSync(join(src, "agents"), agentsDst, { recursive: true });
cpSync(join(src, "skills"), skillsDst, { recursive: true });
cpSync(join(src, "chains.json"), join(target, ".opencode", "chains.json"));

console.log(`\nInstalled into ${join(target, ".opencode")}`);
console.log("Pilot logbook: create docs/pilot-log.md in the project you pilot in.");
console.log('Start a session with the "conductor" agent, then "make this session a Lead".');
