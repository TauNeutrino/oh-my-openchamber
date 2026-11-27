#!/usr/bin/env node
// oh-my-openchamber installer (v2) — cross-platform (Windows, Linux, macOS).
// Needs only Node.js: `node install.mjs [target-dir]`  (default: current directory)
// Or let an LLM agent install it — see README.
import { cpSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const src = join(fileURLToPath(new URL(".", import.meta.url)));
const target = resolve(process.argv[2] ?? process.cwd());
const packDst = join(target, ".opencode", "oh-my-openchamber");
const agentsDst = join(target, ".opencode", "agents");
mkdirSync(packDst, { recursive: true });
mkdirSync(agentsDst, { recursive: true });

cpSync(join(src, "personas"), join(packDst, "personas"), { recursive: true });
cpSync(join(src, "protocols"), join(packDst, "protocols"), { recursive: true });
cpSync(join(src, "templates"), join(packDst, "templates"), { recursive: true });
cpSync(join(src, "chains.json"), join(packDst, "chains.json"));
cpSync(join(src, "routes.md"), join(packDst, "routes.md"));
cpSync(join(src, "conductor.md"), join(agentsDst, "conductor.md"));

console.log(`\nInstalled into ${join(target, ".opencode")}`);
console.log("Pack resources: .opencode/oh-my-openchamber/");
console.log("Selectable agent: .opencode/agents/conductor.md");
console.log('Start a session with the "conductor" agent, then "make this session a Lead".');
