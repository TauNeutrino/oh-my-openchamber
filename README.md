# oh-my-openchamber

> So that an orchestra sounds good, every musician must play in sync.
> We keep the beat and bring the best out of the instruments.

**oh-my-openchamber** is an agent pack for [OpenChamber](https://docs.openchamber.dev): a conducted orchestra of coding agents — cast, rules, and working modes as pure configuration and prompt work on OpenChamber's native machinery (leads, briefings, workflows, memory, knowledge). No plugin code, no second engine.

Where [OmO](https://omo.dev) built its own orchestration machine, oh-my-openchamber writes the *score* for the machine OpenChamber already ships:

- **The cast** — 13 agents (`agents/*.md`), each a named persona: prompt, reasoning depth, permissions — no model ids; the model comes from the routing chain (`chains.json`) at dispatch time. `quick`, `general-low`, `general-high` are the risk rungs of normal coding; `deep` works, `ultrabrain` decides, `visual-engineering` owns everything a user sees.
- **The conductor** — a lead agent with a thin score: intent gate, routing rubric, risk cap, evidence-carrying `ESCALATE`, a rationale line on every delegation, and a learning loop (log automatically, change the rubric only with the human's approval).
- **The working modes** — `omoc-plan` (interview → gap loop → plan document → reviewer gate) and `omoc-execute` (checkbox by checkbox, five gates per checkbox, only the conductor merges).

## Install

No installer software, no bash requirement — two ways, both work on Windows, Linux and macOS.

**Let an agent install it** — paste this into any LLM agent session:

```
Install oh-my-openchamber by following the instructions in
https://github.com/TauNeutrino/oh-my-openchamber/blob/main/README.md:
clone the repository, then copy agents/*.md into <project>/.opencode/agents/,
each skills/<name>/ folder into <project>/.opencode/skills/, and chains.json
into <project>/.opencode/. Then start a session with the "conductor" agent
and make it a Lead.
```

**Or one command** (needs Node.js, which you already have if you run OpenCode):

```bash
git clone https://github.com/TauNeutrino/oh-my-openchamber
node oh-my-openchamber/install.mjs /path/to/your/project
```

Model chains live in `chains.json` — edit the rungs to the providers you actually have.

## Status

M0 pilot: the conductor and the full cast are in daily use for two weeks; the design, the routing rubric, and the verification path are documented in [docs/PLAN.md](docs/PLAN.md) (working doc, German — English README lands at M1).

License: MIT.
