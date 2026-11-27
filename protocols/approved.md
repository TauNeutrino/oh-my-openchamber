# Protocol: approved

Owner: conductor. Target: the approved work order. This protocol is the boundary between paper and reality.

## 1. Read-only preflight

Before any execution:

- Every referenced file still exists and supports the plan's claims.
- Open assumptions still hold; scope has not drifted.
- Baseline checks run green (diagnostics, relevant tests, build/typecheck).
- Integration branch and worktree plan are ready.

On failure: record the cited finding in the work order, return to `draft`, re-plan. Never execute against a stale approval.

## 2. Create the execute run

The agent cannot arm a goal on its own running session, but it can create a session with a goal. Create **one execute-run child session** with:

- `goal` = the work order's content (the plan itself, not "implement plan X")
- `goalTokenBudget` = the plan's estimate
- model = current conductor chain rung
- auto-turn cap raised to the expected iteration count

Workers stay goal-free. The server-side audit keeps the execute run awake and is the only authority that can settle its goal.

## 3. Routes and waves

Write each suborder's route into the work order: persona, tier/overlay, resolved model, risk, rationale. Set waves and the critical path. Knowledge todos are a projection of these suborders, never a second state.

## 4. Hand over the pen

The conductor remains the work order's only writer. The execute run owns dispatch, worktrees, and merging; it writes evidence files and reports their paths back. Transition the work order to `running`.
