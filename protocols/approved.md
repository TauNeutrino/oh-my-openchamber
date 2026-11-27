# Protocol: approved

Owner: conductor. Target: the approved work order. This protocol is the boundary between paper and reality.

## 1. Read-only preflight

Before any execution:

- Every referenced file still exists and supports the plan's claims.
- Open assumptions still hold; scope has not drifted.
- Baseline checks run green (diagnostics, relevant tests, build/typecheck).
- Integration branch and worktree plan are ready.

On failure: record the cited finding in the work order, return to `draft`, re-plan. Never execute against a stale approval.

## 2. Execute in this session

There is no goal mode and no continuation session (ADR-0002). After the preflight passes, the conductor executes directly in its own session: it owns dispatch, worktrees, evidence intake, merging and state transitions. Record the routes and waves, transition the work order to `running`, and start the first wave.

## 3. Routes and waves

Write each suborder's route into the work order: persona, tier/overlay, resolved model, risk, rationale, optional skills. Set waves and the critical path. Knowledge todos are a projection of these suborders, never a second state.

## 4. Continuation discipline

While the order has unchecked suborders, every new input returns to the open order first. The turn may end when work pauses; the work order carries the state, so a later input resumes exactly there. No server-side wake loop exists — the discipline is prompt-level, the state is the file.
