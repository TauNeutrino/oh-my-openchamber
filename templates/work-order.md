# WorkOrder: <slug>

```yaml
id: <slug>
state: draft | approved | running | blocked | completed | aborted
intent: <research | implementation | investigation | evaluation | fix | open-ended>
risk: low | standard | high
writer: conductor
created: <YYYY-MM-DD>
updated: <YYYY-MM-DD>
execute_session: <session-id or null>
goal_budget: <tokens or null>
```

## Ideal state

Betroffener Nutzer: <wer>
Ideal-State (IS-<n>): <nachweisbarer Endzustand>
Gap (GAP-<n>): <was heute fehlt>

## Scope

**IN:** <was dazugehört>
**OUT / must not:** <was ausdrücklich nicht dazugehört>

## Decisions and open assumptions

- <Entscheidung> — <Begründung>
- Offene Annahme: <was angenommen wird, bis wer es widerlegt>

## Scenario contract

- Happy path: <Ablauf + erwartetes Ergebnis>
- Edge cases: <Randfälle + erwartetes Ergebnis>
- Adjacent surfaces: <was mitbetroffen ist und nicht brechen darf>

## Execution strategy

- Waves: <welche Suborders laufen parallel>
- Critical path: <welche Abhängigkeit den Abschluss bestimmt>
- Isolation: <Worktrees / Integrations-Zweig>

## Verification strategy

- Automated checks: <exakte Kommandos>
- Real surface: <Browser/curl + Schritte>
- Adversarial QA: <was versucht wird zu brechen>

## Suborders

- [ ] <n>. <Titel>
  - **What to do:** <Arbeit>
  - **Must NOT do:** <Grenze>
  - **Closes:** GAP-<n>
  - **Wave / blocked by / blocks:** <Abhängigkeiten>
  - **References:** <path:lines, erschöpfend für den Arbeiter>
  - **Acceptance criteria:** <agent-ausführbar>
  - **QA scenarios:** <tool + Schritte + erwartetes Ergebnis>
  - **Route:** <persona → tier/model | risk | because>
  - **Gates:** <quick 2+5 | standard 1+2+3+5 | risky 1+2+3+4+5>
  - **State:** <draft | ready | running | blocked | completed | aborted>
  - **Evidence:** <Zusammenfassung + Pfad unter evidence/>

## Evidence

- <Suborder> — <Zusammenfassung> — `<evidence-path>` — <geprüft von conductor am DATUM>

## Final verification wave

- [ ] F1 Plan compliance: <Ergebnis + Evidenz>
- [ ] F2 Code quality across boundaries: <Ergebnis + Evidenz>
- [ ] F3 Real manual QA: <Ergebnis + Evidenz>
- [ ] F4 Ideal-state fidelity: <IS-<n> → Suborders → QA → Evidenz>

## Success criteria

| Ideal-state row | Delivering suborder(s) | Proving QA scenario | Evidence |
|---|---|---|---|
| IS-<n> | <n> | <Szenario> | <Pfad> |

## Approval gate

- Status: open → awaiting → settled
- Open questions: <was den Nutzer noch braucht>
- Human approval: <Datum / ausdrückliche Freigabe>

## Runtime pointers

- Execute session: <id>
- Goal: <Objective-Zusammenfassung; vollständiger Inhalt = dieses Artefakt>
- Worktrees: <Pfade>
- Blocked reason: <Grund + nächster Lösungsversuch, nur wenn blockiert>
- Aborted leftovers: <bewusst aus dem Scope genommene Reste, nur wenn aborted>
