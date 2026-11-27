# oh-my-openchamber — Plan v2 (Domänenmodell zuerst)

> Damit ein Orchester gut klingt, müssen alle Musiker im Einklang spielen.
> Wir geben den Takt und holen das Beste aus den Instrumenten heraus.

## 1. Idee

Modelle haben Temperamente; ein Werkzeug, das alles an dasselbe Modell reicht, zwingt dich zu einer Persönlichkeit für alle Aufgaben. OmO hat gezeigt, wie ein Team aus vielen Stimmen arbeitet — und dafür eine eigene Maschine gebaut. OpenChamber bringt die Maschine nativ mit: Leads, Briefings, Workflows, Memory, Knowledge, Goals.

oh-my-openchamber baut keine zweite Engine. Es definiert das **Domänenmodell**, das auf dieser Maschine läuft: den **Auftrag**, die **Personas**, die **Routen**, die **Evidenz** — und die nativen Adapter, die sie ausführen. Der Unterschied zur v1: nicht „Feature plus Regel plus Ausnahme", sondern **ein Objekt, ein Gesetz, daraus abgeleitete Protokolle**.

## 2. Das Modell

Fünf Begriffe tragen die Architektur (kanonisch im [Glossar](GLOSSARY.md)):

- **WorkOrder (Auftrag):** Ziel, Scope, Ideal-State, Szenario-Vertrag, Risiko, Zustand, Suborders, Routen, Evidenz, Entscheidungen. Die einzige Wahrheit.
- **Persona:** Domänen-Doktrin, Kanten, Standard-Autorität. Kein Modell, keine Stufe, keine Lebensphase.
- **Route:** konkrete Besetzung eines Suborders — Persona + Tier-Overlay + Modell + Risiko + Begründung. Nur der Dirigent schreibt sie.
- **Evidence:** unveränderliche Beleg-Dateien. Die zentrale Datei hält Zusammenfassung + Pfad.
- **Adapter:** native OpenChamber-Mechanik, die einen Teil des Lebenszyklus ausführt oder darstellt.

**Das eine Gesetz:** *Kein Zustandswechsel ohne Evidenz.* Die fünf Tore, die unabhängige Prüfung, die Goal-Audit, das Zurückschicken belegloser Berichte und ESCALATE sind sechs Durchsetzungen desselben Gesetzes an verschiedenen Grenzen — keine sechs unabhängigen Regeln.

**Die eine Wahrheit:** `.openchamber/orders/<slug>.md` — eine Datei, versioniert, review-bar, compaction-sicher. Der **Dirigent ist immer ihr einziger Schreiber**. Subagenten und der Ausführungs-Lauf schreiben Evidenz-Dateien unter `.openchamber/orders/<slug>/evidence/`; während der Lauf bleibt die zentrale Datei bei Zusammenfassung + Pfad, bei Fertigstellung übernimmt der Dirigent die Zusammenfassung und schließt den Übergang.

## 3. Der Lebenszyklus

Sechs Zustände, vier Protokolle: `blocked` wird von `running.md` §5 regiert, `aborted` von den Laufzeit-Zeigern und Scope-Änderungen des Templates — es gibt keine eigenen `blocked.md`/`aborted.md`, und `completed` liest `completion.md`:

| Zustand | Was geschieht | Writer |
|---|---|---|
| `draft` | Interview → Entwerfen → Verfeinern ↔ Prüfen (Schleife) → Genehmigungs-Tor | Dirigent |
| `approved` | read-only Preflight; besteht er, wird der Ausführungs-Lauf angelegt, Routen und Wellen gesetzt | Dirigent |
| `running` | Dispatch → Gates → Evidenz → Übergang; blockierte Suborders sofort triagieren | Dirigent (Evidenz kommt von außen) |
| `blocked` | nur wenn der kritische Pfad keine ausführbare Arbeit mehr hat; Grund + Lösungsweg stehen im Artefakt | Dirigent |
| `completed` | Abschluss-Welle: Plan-Treue, Code-Qualität über Grenzen, echte Oberfläche, Ideal-State | Dirigent |
| `aborted` | aufräumen, offene Reste und Scope-Änderungen benennen | Dirigent |

**Entwurf ist kein zweiter Ordner.** Dieselbe Datei trägt im Zustand `draft` offene Fragen, Annahmen und das Genehmigungs-Tor; nach der Freigabe trägt sie die fertigen Suborders. Planung und Ausführung sind Phasen des Auftrags, keine eigenen Skills.

**Blockiert gehört an den kritischen Pfad.** Ein blockierter Suborder wird sofort vom Dirigenten geklärt — Retry, andere Route, Scope-Klärung; löst er es nicht, kommt der Mensch. Unabhängige Arbeit läuft weiter; global `blocked` erst, wenn alles Verbleibende am selben Hindernis hängt.

## 4. Die Besetzung

Ein Dirigent und sieben Personas. Keine Kostenstufe ist ein Musiker, keine Lebensphase ist ein Agent.

| Persona | Domäne | Overlays |
|---|---|---|
| **seeker** | Recherche | `codebase`, `docs` |
| **worker** | Coding | `quick`, `low`, `high`, `deep` |
| **artist** | Frontend, UI/UX, Styling, Animation | — |
| **writer** | Doku und Prosa | — |
| **academic** | das eine wirklich harte, logik-schwere Problem | — |
| **architect** | Modulgrenzen, Zerlegung, Trade-offs | — |
| **inspector** | read-only Prüfung | `plan-review`, `execution-review` |

Der **plan-consultant** ist kein Musiker mehr: Er ist ein Schritt im `draft`-Protokoll. Der **plan-reviewer** ist der `plan-review`-Overlay des inspectors; die Ausführungs-Prüfung ist der zweite Overlay derselben Persona. Der **Dirigent** ist Orchestrator, kein Instrument.

## 5. Routing

Jede Eingabe beginnt mit dem **Intent Gate**: Der Dirigent sagt, welche Absicht er erkennt und welche Route er plant — korrigierbar, bevor Arbeit entsteht. Danach:

1. Domäne des Suborders benennen, passende Persona wählen.
2. Tier-Overlay wählen: mechanisch (`quick`), klein (`low`), Standard (`high`), tief (`deep`). Modelle kommen aus `chains.json`, nie aus den Persona-Dateien.
3. Risiko-Deckel: Er ändert **nicht** die Persona, sondern die Stufe (stärkste Stufe der eigenen Kette) und verlangt bei destruktiven Schritten, Production oder externer Wirkung den Menschen.
4. Route ausschreiben: `persona → tier/model | risk | because` — einziger Schreiber ist der Dirigent; sie landet im Artefakt und im Memory.
5. Bei Überforderung: `ESCALATE: <tier/persona>` mit Versuch + Grund + Optionen. ESCALATE ist eine Routen-Änderung mit Evidenz; Retry (max. 2) ist eine neu ausgegebene Route; der zweite Miss führt zum Neuschneiden des Suborders.

Familien-reine Ketten garantieren, dass der Persona-Prompt zur Familie passt, die ihn bedient; wo eine Familie fehlt, nächste verfügbare Route mit Vermerk. Familien-Overlays (GPT vs. Claude) kommen erst, wenn der Pilot sie braucht.

## 6. Evidenz und Gates

Suborders werden nach Klasse geprüft:

| Klasse | Tore |
|---|---|
| quick | 2 Automaten + 5 Aufräumen |
| standard | 1 Plan-Treue + 2 Automaten + 3 echte Oberfläche + 5 Aufräumen |
| riskant | 1 + 2 + 3 + 4 adversarische QA + 5 |

Kein sechstes Tor „Mensch": Der Mensch kommt über Risiko-Deckel, uneingelöste Blocker und Budget — nicht über die Torliste. Die Abschluss-Welle prüft nur, was Einzelteile nicht sehen: Plan-Treue als Ganzes, Code-Qualität über Grenzen, Ideal-State und die letzte echte Oberfläche.

## 7. Die Zustands-Protokolle

- **`draft`:** Recherche zuerst (seeker), Absicht CLEAR/UNCLEAR, Owner-Entscheidungen immer Fragen, Kurz-Brief, Lücken-Schleife (plan-consultant als Protokoll-Schritt), Szenario-Vertrag, Artefakt schreiben, inspector/plan-review bis OKAY, Nutzer-Freigabe.
- **`approved`:** read-only Preflight (Referenzen, Annahmen, Basis-Checks, Integrations-Zweig) — besteht er: Ausführungs-Lauf anlegen, sonst zurück zu `draft` mit Befund.
- **`running`:** Wellen, Swarms, Routen, Gates, Evidenz-Pfade, sofortige Blocker-Triage. Der Dirigent schreibt den Auftrag; die Ausführung liefert.
- **`completion`:** F1 Plan-Treue · F2 Code-Qualität · F3 echte Oberfläche · F4 Ideal-State. Kein `completed` mit heimlichen Resten: abgebrochene Suborders müssen aus dem Scope genommen oder ersetzt sein.

## 8. Autonomie ohne Doppelsteuerung

Der Agent kann kein Goal auf seine eigene laufende Session setzen — aber er kann eine Session **mit** Goal anlegen. Deshalb ist der **Ausführungs-Lauf ein eigenes, mit Ziel geborenes Kind**: Der Dirigent legt es mit `goal` + `goalTokenBudget` an, Objective = Inhalt des WorkOrder, Budget = Plan-Schätzung, Turn-Kappe = erwartete Iterationen. Der serverseitige Audit hält den Lauf wach, bis der Zielzustand belegt ist; der Lauf endet jeden Turn mit *Done / Verified / Remaining / Needs from user*. Arbeiter bleiben goal-frei.

Der Lauf besitzt Worktrees und Merge-Autorität, **nicht** die kanonische Datei; er meldet Evidenz an den Dirigenten, der zusammenfasst und Übergänge schließt. Auf `budgetLimited` oder uneingelöstem kritischem Blocker kommt eine Nachricht an den Menschen — keine Pollerei, kein ständiges Eingreifen.

## 9. Native Adapter

| OpenChamber-Mechanik | Rolle im Modell |
|---|---|
| Lead | Delegation, Briefing, Übersicht für den Dirigenten |
| Goal | Wachhalt- und Abschluss-Audit am Ausführungs-Lauf |
| Knowledge | Projektion der Suborders als Todos; nie zweite Wahrheit |
| Memory | Append-only Routing-Verlauf (Route + Ergebnis); Lern-Datensatz |
| Workflows | Schwarm-Dispatch; mass-omoc (Abhängigkeitsgraph) nach M2 |
| Worktrees | Isolation der Ausführungs-Wellen |
| Notify | genau dann, wenn der Mensch gebraucht wird |
| Secrets | private API-Schlüssel, nie im Repo |

## 10. Was gestrichen bleibt

IntentGate als Keyword-Hook · Team Mode · Lifecycle-Hooks · LSP/AST-Werkzeuge (nativ) · Comment-Checker · Kibitzer (Memory nativ) · artistry (artist/writer decken es) · Hash-anchored edits · Skill-eingebettete MCPs · Todo-Enforcer-Hook · Git-Agent (git-master-Protokoll). Kein Feature, das nur da ist, um eine Lücke zu verstecken.

## 11. Meilensteine

- **M0 — Architektur-Pilot:** Diese v2-Struktur zwei Wochen in echter Arbeit erproben; die Beweisführung aus v1 bleibt gültig, ergänzt um die Modell-Invarianten (eine Wahrheit, ein Schreiber, kein Fortschritt ohne Evidenz).
- **M1 — Öffentlichkeit:** Englische README, stabilisierte Personas/Protokolle, Installation per Agent oder `install.mjs`.
- **M2 — mass-omoc:** Abhängigkeitsgraph über native Workflows, openspec-Integration, Observer-Persona für visuelle Analyse, ship-Workflow.

## 12. Offene Punkte

- Konkrete Modell-Ketten pro Persona/Tier anhand der aktiven Anbieter (Pilot).
- Bestätigt der Pilot einen nativen Agenten-Parameter pro Kind-Session? Bis dahin: Persona-Doktrin + Overlay wird vom Dirigenten ins Briefing gelesen.
- Familien-Overlays für GPT/Claude erst bei belegtem Bedarf.
- Öffentlicher Name des Dirigenten („conductor" als Dateiname ist gesetzt).
