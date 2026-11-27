---
name: omoc-execute
description: Execute an approved plan document as code. Implements the plan; does not create it. Runs as its own goal-armed session (created by the conductor), registers todos, works checkbox by checkbox with parallel swarms, verifies with five gates per checkbox, and only the execute-run merges. Use after omoc-plan produced an approved plan.
---

# omoc-execute — the plan becomes code

omoc-execute implements the plan as code; it does not create the plan. It consumes the approved document at `.openchamber/plans/<slug>.md` and works its checkboxes:

## 1. Register everything up front

One todo per plan checkbox, native in project knowledge; **every todo carries the plan file's path** — that is the linkage. The plan document itself tracks session references and progress, so a fresh session can resume the same plan: read the checkboxes, continue where the evidence ledger stands.

**Run as a goal — born armed, no human click.** An agent cannot arm a goal on its own running session — but it CAN create a session with a goal: `session.create` accepts `goal` + `goalTokenBudget` (the user adopting this pack is the standing authority; arming execute-runs is what "minimal human intervention" means here). So the execute-run is **its own child session**, created by the conductor: the **plan content is the objective** (not "implement plan X" — the audit sees nothing in a pointer), `goalTokenBudget` = the plan's estimate, model from the conductor chain, auto-turn cap set to the expected iteration count. The server-side audit keeps that run awake until the plan's end-state is verifiably reached: it reads only the objective and the latest reply, so the objective stays self-contained and every turn ends with evidence lines — *Done / Verified / Remaining / Needs from user*. The run cannot settle its own goal; the audit is the only termination authority besides the hard stops. Workers stay goal-free — one goal per execute-run, no double steering. On `budgetLimited` the run reports to the conductor, which asks the human for a raise; the checkboxes carry the progress.

## Continuation discipline

While the approved plan still has unchecked checkboxes, steer every new input back to it first — *"we are mid-execute; how does this touch the plan?"* New work happens only when the user explicitly parks, amends, or finishes the plan. Never silently drop a running plan for a side quest.

## 2. Checkbox by checkbox

Classify each checkbox (light/heavy), decompose into worker-sized pieces, and dispatch: **independent pieces go as a swarm in one parallel burst** (many `quick` / `general-low`); cohesive hard work stays whole and goes as **one** delegation to `deep` or `ultrabrain`. Route by the checkbox's `Recommended agent` line, else by the routing rubric — always with the rationale line. ESCALATE is a re-cast: same agent on the next chain rung (`deep`), or the named better agent.

## 3. Five gates per checkbox

*The subagent claims the task is done. It is probably lying.* In fixed order:

1. **Plan re-read** — every change checked against what the checkbox promised.
2. **Automated checks** — diagnostics at zero errors, targeted tests then the suite, build/typecheck exit 0; real outputs, not claims.
3. **The visible surface touched** — user-facing changes get a manual-QA artifact (browser, curl): what was done, what was seen.
4. **Adversarial QA** — someone tried to break the result; name what they tried.
5. **Cleanup receipts** — no stubs, no scope creep, nothing unrelated changed.

## 4. The checkbox flips only on independent verification

The worker's done-claim is verified by an independent reviewer before the todo is checked off. Done is a state with evidence, never an assertion. Defects go back to the same session for repair.

## 5. Waves and merging

Each plan wave works in its own git worktree (created by the conductor) and lands on the integration branch once its checkboxes are verified. **Only the execute-run merges.** Git discipline follows the git-master skill; the ship flow (PR open until merged, CI fixes run automatically) arrives as a native workflow after v1.
