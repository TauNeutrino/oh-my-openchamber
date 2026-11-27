# Protocol: completion

Owner: conductor. Target: transition the work order to `completed` — or keep it honest.

## 1. Final verification wave

Inspect what individual suborders could not see:

- **F1 Plan compliance:** the whole change matches the approved scope and decisions.
- **F2 Code quality across boundaries:** no seam broke; no duplication or new maintenance trap.
- **F3 Real manual QA:** the complete user-facing flow works on the real surface.
- **F4 Ideal-state fidelity:** every IS row is reached by delivering suborders and proving QA scenarios, with evidence paths.

Record each result in the work order's final-verification section.

## 2. No hidden leftovers

An aborted suborder does not vanish. Before `completed`, each aborted item must be either removed by an explicit scope amendment or replaced by another suborder with its own evidence. Otherwise the work order remains `running` or becomes `blocked` — never "done except for".

## 3. Transition

The conductor writes the final summary, evidence references, and state `completed`, then notifies the human once. There is no goal to settle (ADR-0002).

## 4. Learning

Append each route and its outcome to the project's routing memory. Propose rubric sharpenings; never change the conductor's rules without human approval.
