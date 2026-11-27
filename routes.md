# Routing catalog

Selection metadata for the conductor. This file is about **who should play**; persona files are about **how they play**. Keep the two separate.

## seeker/codebase

- **here_when:** the answer lives in this repository — where is X, what calls it, which pattern exists, what changed.
- **not_here_when:** the answer depends on external docs, releases or other repositories.
- **prefer_over:** guessing from memory; reading files one by one without a broad first pass.
- **escalate_to:** `seeker/docs` for external facts; `architect` when the finding turns into a system trade-off.

## seeker/docs

- **here_when:** library APIs, official docs, release notes, open-source examples, version-specific behavior.
- **not_here_when:** the answer is local code behavior that a repository search can settle.
- **prefer_over:** stale memory, unversioned blog posts, community workarounds presented as documented behavior.
- **escalate_to:** `seeker/codebase` for local usage; `academic` when sources conflict and a decision must be argued.

## worker/quick

- **here_when:** mechanical, single-file, boilerplate, config/copy; every clearly splittable piece.
- **not_here_when:** scope is ambiguous, more than one file needs coherent design, or a specialist domain applies.
- **prefer_over:** the conductor doing trivial mechanical work itself.
- **escalate_to:** `worker/low` or `worker/high` when the brief reveals real complexity.

## worker/low

- **here_when:** no specialist fits, moderate effort, scope contained within a few files.
- **not_here_when:** a specialist domain fits, or the work spans systems with broad impact.
- **prefer_over:** `worker/quick` when the task is truly mechanical.
- **escalate_to:** `worker/high` when breadth or impact grows; the matching specialist when the domain clarifies.

## worker/high

- **here_when:** substantial standard feature work across systems/modules with known patterns and broad impact.
- **not_here_when:** contained moderate work (`low`) or a hard reasoning deliverable (`academic`).
- **prefer_over:** `worker/low` for contained work; `worker/deep` when depth, not breadth, is unknown.
- **escalate_to:** `worker/deep` when the mechanism is not understood; `academic` when reasoning becomes the deliverable.

## worker/deep

- **here_when:** implementation with unknown depth — hairy debugging, research-heavy or subtle cross-module work.
- **not_here_when:** the deliverable is reasoning/proof (`academic`) or system decomposition (`architect`).
- **prefer_over:** `worker/high` when the surface is wide but decisions are easy.
- **escalate_to:** next `deep` rung, then `academic` when the deliverable changes; `architect` for boundary/trade-off design.

## artist

- **here_when:** ANY visual design relation — frontend, UI/UX, styling, animation.
- **not_here_when:** prose (`writer`) or backend-only logic with no user-visible surface (`worker`).
- **prefer_over:** every other persona for visual work. No exceptions.
- **escalate_to:** `architect` when the problem is design-system architecture rather than a visual change.

## writer

- **here_when:** documentation, prose, READMEs, guides, release notes, user-facing copy.
- **not_here_when:** research (`seeker/docs`) or visual work (`artist`).
- **prefer_over:** the conductor drafting prose as a side effect of orchestration.
- **escalate_to:** `seeker/docs` when facts are missing; `architect` when structure, not wording, is the problem.

## academic

- **here_when:** one genuinely hard, logic-heavy problem where reasoning or proof is the deliverable.
- **not_here_when:** implementation merely has unknown depth (`worker/deep`) or the task is system decomposition (`architect`).
- **prefer_over:** `worker/deep` for implementation; `architect` for module boundaries and trade-offs.
- **escalate_to:** `architect` when the hard problem is architectural; `worker/deep` when the decision is settled and implementation remains.

## architect

- **here_when:** module boundaries, decomposition, trade-offs, broad debugging across code/logs/history/docs; implements when needed.
- **not_here_when:** a single hard logic proof (`academic`) or mechanical implementation (`worker`).
- **prefer_over:** `academic` for reasoning-as-deliverable; `worker` for execution.
- **escalate_to:** `academic` when a decision must be argued from invariants; `worker/deep` for implementation with unknown depth.

## inspector/plan-review

- **here_when:** the `draft` protocol has produced a finished work-order file and needs a verdict.
- **not_here_when:** a raw draft, an implementation task, or more than one target file.
- **prefer_over:** self-review without an independent gate.
- **escalate_to:** none — return `REJECT` with cited blockers to the conductor.

## inspector/execution-review

- **here_when:** a suborder claims completion and its evidence is ready for independent verification.
- **not_here_when:** implementation, planning, or a claim without artifacts.
- **prefer_over:** trusting the worker's own success claim.
- **escalate_to:** none — `REJECT` sends the defect back to the same session through the conductor.
