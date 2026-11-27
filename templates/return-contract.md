# Return contract

Every delegated worker closes with this shape. The persona supplies the content; the contract keeps results comparable across the orchestra.

```text
Result: <the deliverable, or the finding>
Verdict: <OKAY | REJECT — inspector dispatches only; workers omit this line>
Evidence: <immutable artifact paths + commands + actual outcomes>
Assumptions: <what was decided from context, or none>
Route status: DONE | ESCALATE: <target persona/tier> | BLOCKED: <reason>

If ESCALATE:
  Attempted: <what was tried>
  Unsettled: <the decision or depth that exceeds this route>
  Options: <viable next routes, with evidence>
```

Rules:

- `DONE` requires evidence for every required gate.
- `ESCALATE` is a complete result, not a question; the token is the first line, followed by attempted/unsettled/options.
- `BLOCKED` names the exact blocker and what would settle it.
- A success claim without artifact paths is not a result.
