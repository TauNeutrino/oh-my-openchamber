# Protocol: approved

Owner: conductor. Target: the approved work order. This protocol is the boundary between paper and reality.

## 1. Read-only preflight

Before any execution:

- Every referenced file still exists and supports the plan's claims.
- Open assumptions still hold; scope has not drifted.
- Baseline checks run green (diagnostics, relevant tests, build/typecheck).
- Integration branch and worktree plan are ready.

On failure: record the cited finding in the work order, return to `draft`, re-plan. Never execute against a stale approval.

## 2. Continue the conductor with a goal

The agent cannot arm a goal on its own running session, but it can create a session with a goal. Continue **yourself** in a new session with:

- the same conductor persona, rules, and canonical-write authority
- `goal` = the work order's content (the plan itself, not "implement plan X")
- `goalTokenBudget` = the plan's estimate
- model = current conductor chain rung
- auto-turn cap raised to the expected iteration count

This is an **execution continuation**, not a child role and not a handover. Workers stay goal-free. The server-side audit keeps the continuation awake and is the only authority that can settle its goal.

## 3. Routes and waves

Write each suborder's route into the work order: persona, tier/overlay, resolved model, risk, rationale, optional skills. Set waves and the critical path. Knowledge todos are a projection of these suborders, never a second state.

## 4. Transition

The conductor — now in its execution continuation — remains the work order's only writer. Transition the work order to `running` and execute the approved plan.
