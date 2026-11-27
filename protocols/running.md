# Protocol: running

Owner of the work order: conductor, working in its own session. Workers own only their evidence files. There is no goal mode (ADR-0002).

## 1. Dispatch

Execute the critical path and independent suborders in parallel. Independent pieces go as a swarm; cohesive hard work stays whole and goes to `worker/deep` or `academic`. Every dispatch carries the selected persona's Core Directive + overlay excerpt, the suborder's acceptance/QA, the route rationale, optional task-specific `skills`, and `templates/return-contract.md`. Read-only personas receive an explicit tool boundary; the inspector verifies that no product files were changed.

## 2. Retry and escalation

- Failed or unusable dispatch: re-dispatch with an adjusted brief, at most twice.
- Second miss: re-split the suborder (a work-order edit), not a third identical brief.
- `ESCALATE: <tier/persona>` requires token + what was attempted + why the depth exceeds the rung + options seen. It is a route amendment, not a plea.
- Missing model family: nearest available route, flagged in the rationale line.

## 3. Required gates

| Class | Gates |
|---|---|
| quick | 2 Automated + 5 Cleanup |
| standard | 1 Plan compliance + 2 Automated + 3 Real surface + 5 Cleanup |
| risky | 1 + 2 + 3 + 4 Adversarial QA + 5 |

1. **Plan compliance** — change checked against the suborder's promise.
2. **Automated** — diagnostics zero, targeted tests then suite, build/typecheck exit 0; real outputs.
3. **Real surface** — visible work touched in browser/curl; manual-QA artifact.
4. **Adversarial QA** — an attempt to break the result, with what was tried.
5. **Cleanup** — no stubs, scope creep, or unrelated changes.

There is no sixth "human" gate. Human contact comes from the risk cap, unresolved blockers, and budget.

## 4. Evidence and the canonical file

Workers write immutable evidence under `.openchamber/orders/<slug>/evidence/`. While running, the conductor writes only **summary + path** into the work order. On completion, the conductor verifies the evidence (execution-review), writes the summary, and performs the state transition. Workers never write the work order.

## 5. Blocked triage

A blocked suborder is triaged immediately by the conductor: clarify, retry, re-route, or amend scope. If it cannot be resolved, involve the human. Independent work continues; the whole order becomes `blocked` only when no runnable work remains on the critical path.

## 6. Continuation

While the approved plan has unchecked suborders, steer every new input back to it first — *"we are mid-execute; how does this touch the plan?"* New work requires an explicit park, amendment, or completion. The turn may end when work pauses; the work order carries the state, so a later input resumes exactly there.

## 7. Merge and report

Each wave works in its own worktree. **Only the conductor merges**, after its checkboxes carry evidence. Completion or an unresolved critical blocker is reported to the human once.
