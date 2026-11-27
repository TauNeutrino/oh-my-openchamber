---
name: git-master
description: Git discipline for the orchestra — commit message rules, the co-authored-by trailer, branch and PR flow. Loaded by implementation agents and the conductor; applies whenever commits or pull requests are made.
---

# git-master

Git discipline for every agent that touches the repository.

## Commits

- One logical change per commit; the message says what and why, not how.
- Format: short imperative subject line (≤ 72 chars), blank line, body only when the why needs it.
- Every agent-made commit carries the trailer:

  ```
  Co-authored-by: oh-my-openchamber <orchestra@openchamber.local>
  ```

- Never commit: secrets, credentials, build artifacts, files the repo's .gitignore excludes.

## Branches and PRs

- Branches are named after the task in English: `fix-login-timeout`, not `verbesserung`.
- A PR exists only when its checks are green and its description states what changed, how it was verified, and which plan checkboxes it closes.
- PR descriptions link the plan document when one exists (`.openchamber/plans/<slug>.md`).

## Safety

- Never force-push shared branches; never rewrite history the conductor has merged.
- Reverts beat fix-forward when a change broke the integration branch.
- Destructive git operations (reset --hard on shared state, branch deletion, force-push) go through the conductor's risk cap: strongest model and a human in the room.
