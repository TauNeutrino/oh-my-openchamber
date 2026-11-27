# Protocol: draft

Owner: conductor. Target: one work-order file at `.openchamber/orders/<slug>.md`, state `draft`. This file is the only state; chat memory is not a store.

## 1. Research first

Parallel read-only waves through `seeker/codebase` and `seeker/docs`; `architect` and `academic` as advisory personas when available. Do not interview before the mechanism is understood.

## 2. Classify intent

- **CLEAR** — outcome settled, only preferences open: ask only the surviving owner-decisions, each with its reason. Never ask what the repo could answer.
- **UNCLEAR** — outcome fuzzy: adopt best-practice defaults, announce them, turn high-accuracy review on automatically.
- **Owner-decisions** — irreversible, destructive, spend — always remain questions, even when a default exists.

## 3. Short brief

Goal, approach, scope boundaries — one paragraph. The user's okay authorizes **writing the work order only**. Execution starts separately.

## 4. Gap loop (plan-consultant is a step, not a persona)

Hunt hidden intentions, ambiguities that would derail a worker, over-engineering, scope creep, missing acceptance criteria, unaddressed edge cases. Revise, again gaps — until the draft passes. Write every decision and open assumption into the work-order file as the loop turns.

## 5. Scenario contract and work order

Define happy path, edge cases, and adjacent surfaces. Write the file from `templates/work-order.md`: ideal state, scope, decisions, scenario contract, execution/verification strategy, suborders with references/acceptance/QA/route/gates, success criteria, approval gate.

## 6. Plan review

Dispatch `inspector/plan-review` over the finished file. On REJECT: fix every cited blocker, resubmit — rounds continue until OKAY.

## 7. Approval

State becomes `approved` only on explicit user approval. Plan mode is sticky: "just do X quickly" still means *plan X* — announce *"I read this in the plan context"*; only "park the plan" or "amend the plan" leaves the loop.
