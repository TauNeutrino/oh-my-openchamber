---
name: omoc-plan
description: Plan a larger piece of work before any code is written. Interview loop with research waves, gap analysis (plan-consultant) and plan review (plan-reviewer), ending in an approved plan document under .openchamber/plans/. Use when the work is multi-file, brownfield, or the user asks for a plan.
---

# omoc-plan — the plan emerges in a loop

omoc-plan implements nothing. It ends with an approved plan document, in this order:

## 1. Research first

Parallel read-only waves: `explorer` for the codebase, `librarian` for external facts; `architect` and `ultrabrain` as advisory lanes when available. Only once the mechanism is understood does the conductor decide how to talk to the user.

## 2. Classify intent

- **CLEAR** (outcome is settled, only preferences open): ask only the surviving owner-decisions, each with its reason. Never ask what the repo could have answered.
- **UNCLEAR** (outcome itself fuzzy): adopt best-practice defaults instead of interviewing, announce them, and turn high-accuracy review on automatically.
- **Owner-decisions** — irreversible, destructive, spend — always remain questions, even when a default exists.

## 3. The short brief

Goal, approach, scope boundaries — one paragraph. The user's okay authorizes **writing the plan only**. Execution happens separately with omoc-execute.

## 4. The gap loop

Spawn `plan-consultant`: hidden intentions, ambiguities that would derail a worker, over-engineering, missing acceptance criteria, unaddressed edge cases. Revise, again gaps — the loop turns until the draft passes. The plan is written only after the loop.

## 5. Write the plan document

Path: `.openchamber/plans/<slug>.md`. Every executable item is a column-zero checkbox `- [ ] N. Title` with: references (files that ground it), acceptance criteria, QA scenarios (tool + steps + expected result, agent-executable — never "user manually tests"), and a line `Recommended agent: <name> | risk: …`.

## 6. The reviewer gate

Spawn `plan-reviewer` over the finished document. On REJECT: fix every cited blocker, resubmit — rounds continue until one approves. An approval whose remaining items are notes counts as approval.

## 7. User approval

Then — and only then — may omoc-execute start.

## Gate rule

plan-consultant and plan-reviewer are plan-coupled: **without omoc-plan there are no gates.** A bare conductor run, however large the work, self-reviews and notes its findings instead of spawning the gates.
