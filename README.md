# oh-my-openchamber

> So that an orchestra sounds good, every musician must play in sync.
> We keep the beat and bring the best out of the instruments.

**oh-my-openchamber** is an agent pack for [OpenChamber](https://docs.openchamber.dev): a conductor, seven personas, and one canonical **work order** — pure configuration and prompt work on OpenChamber's native machinery (leads, goals, knowledge, memory, workflows, worktrees). No plugin code, no second engine.

Where [OmO](https://omo.dev) built its own orchestration machine, oh-my-openchamber writes the score for the machine OpenChamber already ships:

- **One truth:** `.openchamber/orders/<slug>.md` — versioned, reviewable, compaction-safe. The conductor is its only writer.
- **One law:** no state transition without evidence. Workers write immutable evidence files; the conductor writes summary + path.
- **Seven personas:** `seeker` (codebase/docs overlays), `worker` (quick/low/high/deep tier overlays), `artist`, `writer`, `academic`, `architect`, `inspector` (plan-review/execution-review overlays). No model ids live in persona files; `chains.json` resolves them per route.
- **Four state protocols:** `draft`, `approved`, `running`, `completion`. Planning and execution are phases of one work order, not separate skills.
- **Autonomy:** the conductor creates the execute run as a goal-armed child session; the native audit keeps it awake; humans are involved only for risk, unresolved blockers, or budget.

## Install

No installer software, no bash requirement — two ways, both work on Windows, Linux and macOS.

**Let an agent install it** — paste this into any LLM agent session:

```
Install oh-my-openchamber by following the instructions in
https://github.com/TauNeutrino/oh-my-openchamber/blob/main/README.md:
clone the repository, copy conductor.md into <project>/.opencode/agents/,
and personas/, protocols/, templates/ plus chains.json into
<project>/.opencode/oh-my-openchamber/. Then start a session with the
"conductor" agent and make it a Lead.
```

**Or one command** (needs Node.js):

```bash
git clone https://github.com/TauNeutrino/oh-my-openchamber
node oh-my-openchamber/install.mjs /path/to/your/project
```

Model chains live in `chains.json` — edit the rungs to the providers you actually have.

## Status

M0 architecture pilot: the domain-model-first v2 is in real use for two weeks; the design is documented in [docs/PLAN.md](docs/PLAN.md), the vocabulary in [GLOSSARY.md](GLOSSARY.md), the root decision in [ADR-0001](docs/adr/0001-work-order-as-canonical-artifact.md).

License: MIT.
