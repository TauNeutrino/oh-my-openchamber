# Persona-Qualität gegen OmO — ausführlicher Vergleich

**Stand:** 2026-11-27  
**Status:** P0 und P1 umgesetzt (Commit folgt); P2 bleibt bewusst zurückgestellt.  
**Gegenstand:** `personas/*.md` in oh-my-openchamber gegen die Original-Prompts aus `code-yeongyu/oh-my-openagent` (Klon `/tmp/opencode/omo`, Stand der Recherche).  
**Methode:** Quelltext-Vergleich, nicht Doku-Vergleich. Verglichen wurden Domänen-Doktrin, Auswahlgrenzen, Autonomie-/Stop-Regeln, Evidenz- und Berichtsvertrag, Eskalation, Tool-Haltung und Modell-Familien-Verhalten. Die Bewertung berücksichtigt, dass unsere Personas bewusst keine Modelle und keine Lebensphasen tragen — diese Trennung ist Architektur, kein Mangel.

## Bewertungsmaßstab

- **Critical:** Kann zu falscher, unfertiger, unbegrenzter oder riskant arbeitender Delegation führen.
- **Important:** Verringert Qualität, Effizienz oder Konsistenz; im Pilot wahrscheinlich sichtbar.
- **Nice-to-have:** Präzisierung, die das Gesamtbild verbessert, aber keinen Kernfehler verhindert.

## 1. Executive Summary

Die Architektur ist stimmig; die Personas sind gute **Gerüste**, aber in der operativen Tiefe deutlich dünner als OmOs Originale. Das ist kein Zufall: OmO hat pro Kategorie lange, modell-spezifische Prompt-Appends und separate Caller-Guidance; wir haben bewusst auf sieben kompakte Personas reduziert. Die Kürze ist richtig, aber sie darf nicht zur Unbestimmtheit werden.

**Drei kritische Cluster:**

1. **`worker/deep` weiß nicht eindeutig, wann es aufhören darf.** Stop-Regel, Frage-als-Abbruch und Blocker-Liste fehlen. Das kann Arbeit unnötig verlängern oder mitten im Turn unfertig stehen lassen.
2. **`artist` hat kein Design-System-Workflow-Mandat.** „Reuse before inventing" ist eine Absicht, kein Ablauf. OmO schreibt vier Phasen und eine Pflicht-Lesequote vor.
3. **`inspector/execution-review` vereint drei verschiedene Prüfungen, ohne sie zu trennen.** Code-Qualität, echte Oberfläche und User-Outcome-Gate brauchen eigene Perspektiven; Severity und „unverified until reproduced" fehlen.

**Die wichtigsten wichtigen Lücken:** Routing-Metadaten/Selection Gates fehlen fast überall; `worker/high` surveyt zu schmal und wägt keine Alternativen ab; `seeker` hat keine verbindlichen Output-/Permalink-Formate; `writer` hat keine Anti-AI-Slop-Regeln; `architect` hat kein Zwei-Design-Minimum und keinen Bug-Modus; `inspector/plan-review` hat keine Anti-Pattern-Liste; der Route-Vertrag kennt keine task-spezifischen Skills; Read-only ist nur behauptet.

**Was unsere Personas besser machen:** Sie sind in ein WorkOrder-/Route-Modell eingebettet, kennen Evidenz-Dateien und Zusammenfassung+Pfad, trennen Persona von Modell/Stufe, haben explizite Family-Gates und einen Risiko-Deckel, der die Besetzung nicht verändert. Das sind keine OmO-Kopien, sondern sinnvolle Anpassungen.

### Scorecard

| Persona / Overlay | Stärke | Größte Lücke | Schwere |
|---|---|---|---|
| worker/quick | minimaler Scope, Drei-Zeilen-Bericht | Caller-Guidance für kleine Modelle | Important |
| worker/low | kalibriertes ESCALATE | Selection Gate „Spezialist zuerst" | Important |
| worker/high | Ursache statt Symptom, konkrete Checks | Surface-Breadth, Alternativen, Konsistenz | Important |
| worker/deep | Mechanismus zuerst, starker ESCALATE-Vertrag | Stop-Regeln, Frage-als-Abbruch, Blocker, Fan-out | **Critical** |
| academic | Evidenz, Gegenfall, Entscheidungs-Komplettität | Abgrenzung zu deep, Bündel-Probleme | Important / Nice |
| seeker/codebase | präzise Fundstellen, read-only | Analysis-Block, Parallelität, Output-Schema | Important |
| seeker/docs | Primary Sources, Workaround-Label | SHA-Permalinks, Evidence-Standard, Version-Disziplin | Important |
| artist | A11y, echte Oberfläche, Risk-Cap | vierphasiger Design-System-Workflow | **Critical** |
| writer | Faktenprüfung, klare Berichte | Anti-AI-Slop, Audience | Important |
| architect | echte Grenzen, Evidenz | zwei Designs, Trade-off-Dimensionen, Bug-Modus | Important |
| inspector/plan-review | harte Kriterien, OKAY/REJECT | Anti-Patterns, PASS/FAIL, Re-read | Important |
| inspector/execution-review | Gate-Matrix, WorkOrder-Evidenz | Severity, drei Perspektiven, User-Outcome | **Critical** |

## 2. Worker und Academic

### 2.1 `worker/quick`

**OmO-Original:** `QUICK_CATEGORY_PROMPT_APPEND` und `callerGuidance` in `packages/senpi-task/src/category/openai-categories.ts`.

OmO sagt dem Arbeiter: „SMALL / QUICK tasks. Efficient execution mindset: Fast, focused, minimal overhead … Minimal viable implementation … Skip unnecessary abstractions … Direct and concise." Dem Aufrufer sagt es zusätzlich: *„before delegating, write an explicit prompt with numbered must-do steps, forbidden deviations, and concrete success criteria."*

**Was unsere Persona abdeckt:** mechanischer Scope, keine Abstraktionen, kein Scope-Creep, Stil der Umgebung, billigster Check, Drei-Zeilen-Bericht (changed what / proof / leftover).

**Lücken:**

- **Important — Caller-Guidance fehlt.** Kleine Modelle brauchen nummerierte Muss-Schritte, verbotene Abweichungen und ein konkretes Erfolgskriterium im Briefing. Unsere Persona sagt dem Arbeiter, was er tun soll, aber nicht dem Dirigenten, wie er ihn briefen muss.
- **Important — „minimal viable" ist weniger operational.** „No refactoring, no improvements" ist scharf, aber OmOs „skip unnecessary abstractions" benennt die häufigste kleine-Modell-Falle direkt.

**Empfohlene Ergänzung (Caller-Note):**

> Dispatch `worker/quick` only with numbered must-do steps, an explicit forbidden-deviation list, and one concrete success criterion. The worker returns changed-what / proof / leftover in three lines. Skip abstractions that this task does not need.

**Bewertung:** Solide Basis, aber die Briefing-Qualität hängt zu stark am Dirigenten-Geschick.

### 2.2 `worker/low`

**OmO-Original:** `UNSPECIFIED_LOW` + `callerGuidance`.

OmO: *„Use only when no specialist category fits, effort is moderate, and scope stays within a few files/modules. Prefer any matching specialist category. Provide explicit must-do steps, forbidden scope, and concrete success criteria."*

**Was unsere Persona abdeckt:** kleine, umkehrbare Arbeit; lokale Muster; minimaler Diff; Evidence; kalibriertes ESCALATE (nicht bei harter Suche, langer Datei oder langsamem Test).

**Lücken:**

- **Important — Selection Gate fehlt.** „Small work without a clear specialist home" beschreibt die Domäne, aber nicht die Regel *bevorzuge einen Spezialisten, sobald einer passt*. Genau diese Regel verhindert, dass `low` zum Mülleimer wird.
- **Important — Forbidden Scope als Caller-Pflicht fehlt.** Der Arbeiter soll nicht nur wissen, was zu tun ist, sondern was ausdrücklich nicht angefasst werden darf.

**Empfohlene Ergänzung:**

> Selection gate: use `worker/low` only when no specialist persona fits and the scope stays within a few files. Prefer `seeker`, `artist`, `writer`, or `architect` whenever their domain matches. The briefing names both must-do and must-not-do.

**Bewertung:** Gute Arbeitssicherheit, schwache Auswahlgrenze.

### 2.3 `worker/high`

**OmO-Original:** `UNSPECIFIED_HIGH`; für GPT-6 Astra der erweiterte Append.

OmO verlangt: *„survey the whole surface the change touches: every caller and consumer … sibling modules … tests, docs, schemas, config, scripts, CI … history (git log and blame) … Weigh at least two ways … say why it won. Then deliver across every surface … no caller/test/doc/schema/config still describes old state."* Dazu: *„A question ends your turn."*

**Was unsere Persona abdeckt:** callers/siblings/tests, beste Muster, minimal/reversibel, Ursache statt Symptom, Diagnostics/Tests/Build, ESCALATE.

**Lücken:**

- **Important — Survey-Breadth fehlt.** Unsere Liste (callers, siblings, tests) lässt docs, schemas, config, CI und git history/blame aus — genau die Flächen, auf denen Standard-Features später brechen.
- **Important — Alternativen-Abwägung fehlt.** OmO verlangt mindestens zwei Wege und die Begründung, warum der gewählte gewinnt. Das ist der Unterschied zwischen „funktioniert" und „bewusst gewählt".
- **Important — Konsistenz über alle Flächen fehlt.** Nach der Änderung darf kein caller/test/doc/schema/config den alten Zustand beschreiben.
- **Important — „A question ends your turn" fehlt.** Ohne diese harte Regel kann ein Worker mittendrin fragen und den Auftrag unfertig zurücklassen.

**Empfohlene Ergänzung:**

> Before committing, survey callers, siblings, tests, docs, schemas, config, CI and the area's git history. Weigh at least two approaches and state why the chosen one wins. Deliver consistently across every touched surface; no caller, test, doc, schema or config may still describe the old state. A question ends your turn unfinished — decide from context and record assumptions.

**Bewertung:** Die zweitgrößte Qualitätslücke nach `deep`.

### 2.4 `worker/deep`

**OmO-Original:** `DEEP_LOW` / `DEEP_HIGH` in `openai-categories.ts`.

Die entscheidenden Original-Sätze:

- *„Read until you can explain the mechanism you are about to change, including its callers, then act; fan out explore and librarian subagents when one read wave cannot answer a question."*
- *„A question ends your turn and returns the task unfinished, so decide from context, record each assumption."*
- *„Stop the moment the success criteria hold; work past them is a defect. Stop early only for a blocker you cannot route around: a missing secret, a decision only the user can make, or three materially different attempts that all failed."*
- *„an edit made before that point is the failure this category exists to prevent."* (deep-high: erst verstehen, dann editieren)
- *„Depth means understanding the mechanism, so the diff stays as small as the fix allows."*

**Was unsere Persona abdeckt:** Mechanismus zuerst, callers/dependencies beide Richtungen, zwei Ebenen über dem Symptom, Ursache beheben, ein Ziel/ein Ergebnis, Evidenz, ESCALATE mit Token + Lektüre + ungeklärte Entscheidung + Optionen.

**Lücken:**

- **Critical — Stop-Regel fehlt.** „Stop the moment success criteria hold; work past them is a defect" fehlt vollständig. Das kann zu unnötiger Arbeit, Scope-Creep und Kosten führen.
- **Critical — Frage-als-Abbruch fehlt.** OmO beendet den Turn bei einer Frage und markiert die Aufgabe als unfertig; unsere Persona erlaubt implizit Fragen. Das kann mitten in der Ausführung zu einem unklaren Stillstand führen.
- **Critical — Blocker-Liste fehlt.** OmO nennt die einzigen frühzeitigen Stoppgründe: fehlendes Secret, Nutzer-Entscheidung, drei materiell verschiedene gescheiterte Versuche. Unsere „genuine overload"-Formulierung ist zu offen.
- **Important — Fan-out-Methode fehlt.** Wenn eine Lesewelle nicht reicht, soll der Worker `seeker/codebase` und `seeker/docs` parallel zu Hilfe rufen. Bei uns steht nur „read until you can explain".
- **Important — deep vs. academic ist nicht scharf genug.** OmO sagt: wide scope with easy decisions → deep-low/unspecified-high; *reasoning as the deliverable → ultrabrain*. Unsere Trennung (deep = Umsetzung mit unbekannter Tiefe; academic = hartes Logikproblem) ist vorhanden, aber nicht als gegenseitiges Selection Gate formuliert.

**Empfohlene Ergänzung:**

> A question ends your turn unfinished: decide from context, record assumptions. Stop the moment the success criteria hold; work past them is a defect. Stop early only for a missing secret, a decision only the user can make, or three materially different failed attempts. Fan out `seeker/codebase` and `seeker/docs` when one read wave cannot answer. If the deliverable is reasoning or proof rather than implementation, return `ESCALATE: academic` with the evidence gathered so far.

**Bewertung:** Die inhaltlich stärkste Persona, aber die gefährlichste Lücke liegt genau in ihrem Ende: Sie weiß, wie sie anfängt und arbeitet, aber nicht eindeutig, wann sie aufhören darf.

### 2.5 `academic`

**OmO-Original:** `ULTRABRAIN_CATEGORY_PROMPT_APPEND_GPT_6_ASTRA` und generischer Ultrabrain-Append.

OmO verlangt: every load-bearing claim cites evidence (file+line, command, test); every executable claim was executed; conclusion survived an attempt to break it; strongest counter-case named; rejected alternatives carry reasons; open assumptions stated; one decision-complete recommendation; open questions with settle-condition; bei gebündelten unabhängigen Problemen: das lösen, von dem die anderen abhängen, den Rest separat delegierbar zurückgeben.

**Was unsere Persona abdeckt:** Ziel statt Schritte, Korrektheit vor Kosten, Evidenz, Gegenfall, abgelehnte Alternativen, offene Fragen mit Settle-Bedingung, ein entscheidungs-komplettes Ergebnis, Family-Gating.

**Lücken:**

- **Nice-to-have — Unabhängige Probleme im Bündel.** OmO sagt ausdrücklich: solve the dependency root, return the rest as separately delegable items. Unsere Persona könnte versuchen, alles in einem Turn zu lösen.
- **Nice-to-have — Search-first vor Code.** Der generische Ultrabrain-Append verlangt, vor jedem Code-Schreiben existierende Muster zu suchen und zu übernehmen. Bei uns folgt das implizit aus dem System, steht aber nicht in der Persona.
- **Important — Selection Gate zur Abgrenzung von `deep`.** „Reasoning as the deliverable" ist die präzise OmO-Grenze. Unsere Formulierung „hard, logic-heavy problem" kann auch eine sehr tiefe Implementation meinen.

**Empfohlene Ergänzung:**

> Use `academic` when reasoning or proof is the deliverable, not when implementation merely has unknown depth. If the goal bundles independent problems, solve the one the others depend on and return the rest as separately delegable items with what you learned. Before writing code, search for the existing pattern and match it.

**Bewertung:** Fast gleichwertig mit OmO; die Hauptlücke ist die Auswahlgrenze, nicht die Arbeitsqualität.

## 3. Querschnitt: Routing, Fähigkeiten und Autorität

### 3.1 Routing-Metadaten fehlen (Important)

OmO trennt drei Dinge:

1. `description` — kurze Domänenbeschreibung für den Aufrufer.
2. `callerGuidance` / `Selection_Gate` — harte Auswahlregeln und Caller-Warnungen.
3. `promptAppend` — die eigentliche Arbeiter-Doktrin.

Beleg: `packages/senpi-task/src/category/builtins.ts:23-33` baut separate Maps `CATEGORY_DESCRIPTIONS`, `CATEGORY_CALLER_GUIDANCE`, `CATEGORY_PROMPT_APPENDS`.

Unsere Personas tragen die Arbeiter-Doktrin; der Dirigent hat nur zwei scharfe Kanten (`artist`, `academic`) und eine Tier-Liste. Für `quick`, `low`, `high`, `deep`, `seeker`, `writer`, `architect`, `inspector` muss er die Auswahlgrenzen aus langen Texten erschließen oder sich auf die empfohlene Route im WorkOrder verlassen.

**Folge:** Das Routing-Qualitätsversprechen (P1 im Pilot) hängt an der Interpretation des Dirigenten, nicht an expliziten Gates.

**Empfehlung:** Jede Persona bekommt einen kompakten, maschinenlesbaren Kopf:

```yaml
route:
  here_when: [...]
  not_here_when: [...]
  prefer_over: [...]
  escalate_to: [...]
```

Oder eine eigene `routes.md`, die der Dirigent liest. Nicht in den Core Directive duplizieren — genau die OmO-Trennung.

### 3.2 Kein `load_skills`-Vertrag (Important)

OmOs Task-Tool kann `load_skills` mitgeben; die Auflösung prepended named `SKILL.md`-Inhalte vor den Child-Prompt (`packages/senpi-task/src/tools/task/description.ts:60`, `execute-spec.ts`). Unsere Route trägt Persona + Tier + Modell + Risiko + Begründung, aber keine task-spezifischen Fähigkeiten.

**Folge:** Ein `artist` mit Playwright, ein `worker/deep` mit einem Database-Debugging-Skill oder ein `inspector` mit einem Security-Review-Skill bekommt nur das, was der Dirigent zufällig ins Briefing schreibt.

**Empfehlung:** Route um optionales `skills: [...]` erweitern; der Dirigent liest die relevanten Skill-Abschnitte und legt sie gezielt ins Briefing. Kein globales Skill-Bundle, keine Kontext-Aufblähung.

### 3.3 Read-only ist behauptet, nicht erzwungen (Important)

OmOs kuratierte Agenten (`explore`, `librarian`, `plan-consultant`, `plan-reviewer`) sind in-process read-only; die ulw-loop Reviewer schreiben immerhin Report-Artefakte. Unsere `seeker`- und `inspector`-Personas sagen „you read; you never write", aber die Child-Session erbt die Berechtigungen der Umgebung.

**Folge:** Ein Modell kann die Prompt-Grenze überschreiten und doch schreiben; die Autorität ist dann nur eine Absicht.

**Empfehlung:** Wenn der Agent-Control-Tool Permission-Sets pro Child kann, diese mechanisch setzen. Solange das nicht dokumentiert ist: Child-Briefing mit explizitem Tool-Verbot und der Inspector-Prüfung „keine unerwarteten Dateiänderungen" als Gate. Die Plattform-Grenze gehört in die Adapter-Schicht, nicht in die Persona-Doktrin.

### 3.4 Einheitlicher Return-Contract fehlt (Important)

OmO gibt pro Kategorie genaue Abschlussformen vor (deep: change + evidence + decision + assumptions; ultrabrain: decision-complete recommendation; quick: minimal). Unsere Personas haben Berichtszeilen, aber kein gemeinsames Schema.

**Empfehlung:** Ein kurzer, gemeinsamer Return-Contract im Briefing:

```text
Result: <deliverable>
Evidence: <paths + commands + outcomes>
Assumptions: <decided from context>
Route status: DONE | ESCALATE: <target> | BLOCKED: <reason>
```

Die Persona liefert den Inhalt, das Schema bleibt stabil.

### 3.5 Modell-Familien-Overlays sind bewusst aufgeschoben (Nice-to-have)

OmO resolved `promptAppend` pro Modell (`CATEGORY_PROMPT_APPEND_RESOLVERS` in `resolver.ts`), z. B. GPT-6-Astra-Varianten für deep/ultrabrain. Unsere Ketten sind familienrein, die Personas aber modell-agnostisch.

**Bewertung:** Das ist kein heutiger Mangel, weil die Familienreinheit schon viel Risiko nimmt. Es bleibt eine Erweiterung für den Pilot: nur wenn eine Familie nachweislich anderes Briefing braucht, ein Family-Overlay ergänzen — nicht vorab bauen.

### 3.6 Evidenz-Doktrin ist an drei Orten formuliert (Nice-to-have)

`worker` Core Directive, `protocols/running.md` §4 und `inspector` overlays sagen ähnliche Dinge über Belege. Das verletzt nicht die eine-Wahrheit-Regel (dort geht es um Zustand), kann aber auseinanderdriften.

**Empfehlung:** Die Personas behalten einen Satz („proof is part of the result"); die Details (immutable files, summary + path, Gate-Matrix) bleiben ausschließlich im Running-Protokoll.

## 4. Spezialisten-Personas

### 4.1 `seeker/codebase` vs. `explore`

**OmO-Original:** `packages/senpi-task/src/agents/builtin/explore.ts`.

OmO verlangt vor der Suche einen `<analysis>`-Block mit *Literal Request / Actual Need / Success Looks Like*. Die erste Aktion startet mindestens drei Tools parallel. Der Abschluss hat ein fixes Schema: `<results><files><answer><next_steps>`, mit absoluten Pfaden. Relative Pfade, nur die wörtliche Frage beantworten oder kein `<results>`-Block gelten als Fehlbedingungen. Die Tool-Strategie wird nach Suchtyp unterschieden (semantisch/strukturell/textuell/datei-basiert).

**Was unsere Persona abdeckt:** broad first, `file:line`, „not found" ehrlich, read-only, Fund statt Meinung.

**Lücken:**

- **Important — Intent-Analyse fehlt.** Ohne Literal/Actual/Success kann eine Suche die falsche Frage beantworten, auch wenn sie korrekt sucht.
- **Important — Parallelitäts-Regel fehlt.** „Broad first" ist keine Verpflichtung; OmO erzwingt die erste Welle mit ≥3 Tools.
- **Important — Output-Schema fehlt.** `file:line` ist gut, aber ein stabiler `<results>`-Block macht die Antwort für den Dirigenten maschinell und menschlich verlässlicher.
- **Nice-to-have — Failure Conditions und Tool-Mapping fehlen.** Unsere Tool-Liste (`rg`, `glob`, `read`) ist kleiner als OmOs semantische/strukturelle/textuelle Strategie.

**Empfohlene Ergänzung:**

> Before searching, write `<analysis>`: literal request, actual need, success looks like. First action: launch at least three read-only tools in parallel. Close with `<results><files><answer><next_steps>`; every file path absolute. A relative path, a literal-only answer, or a missing results block is a failed search.

**Bewertung:** Der Merge von explore und librarian ist tragbar, aber nur wenn die Overlays ihre jeweiligen Pflichtstrukturen wirklich tragen.

### 4.2 `seeker/docs` vs. `librarian`

**OmO-Original:** `packages/senpi-task/src/agents/builtin/librarian.ts`.

OmO klassifiziert die Anfrage (Conceptual / Implementation / Context / Comprehensive), verlangt für Code-Behauptungen immutable Permalinks mit SHA und Zeilenbereich, benennt Versionen und warnt davor, Versionen zu mischen. Pro Claim: direkte Sprache, Permalink/URL, Symbol/File/Verhalten, kurze Verbindungserklärung; Inference, Versionsunsicherheit und Konflikte werden ausdrücklich labelt. SHAs werden nie fabriziert.

**Was unsere Persona abdeckt:** Primary Sources, URL+Version, documented vs. community workaround, API-Oberfläche statt Tutorial.

**Lücken:**

- **Important — Permalink-/SHA-Disziplin fehlt.** „URL + Version" ist für fließende Docs okay, für GitHub-Code aber nicht reproduzierbar genug.
- **Important — Evidence-Standard pro Claim fehlt.** Unsere Form verlangt Quellen, aber nicht die dreiteilige Aussage (direkt / Stelle / Verbindung).
- **Important — Versionen nicht mischen fehlt.** Das ist eine der häufigsten Bibliotheks-Recherche-Fallen.
- **Nice-to-have — Request-Klassifikation und Date-Awareness fehlen.**

**Empfohlene Ergänzung:**

> Classify the request (conceptual / implementation / context / comprehensive). For every code claim cite an immutable permalink (commit SHA + line range) or official doc URL, plus symbol and version. Never mix versions. Label inference, version uncertainty, and conflicts. Never fabricate a SHA or line range.

### 4.3 `artist` vs. `visual-engineering` + `artistry`

**OmO-Original:** `packages/senpi-task/src/category/google-categories.ts` und `anthropic-categories.ts`.

OmOs visueller Workflow ist vierphasig:

1. **Analyze:** 5–10 bestehende Komponenten lesen, Tokens, Spacing, Typografie erfassen.
2. **System bauen, wenn es fehlt.**
3. **Mit dem System bauen:** Tokens statt Hardcode.
4. **Verify-Checklist.**

Dazu: *„Visual state is not text: after each change, render or screenshot … desktop + mobile widths … A change you have not looked at is not done."* `artistry` ist ein eigener Modus für radikale, unkonventionelle Gestaltung.

**Was unsere Persona abdeckt:** vorhandene Design-Sprache zuerst, echte Oberfläche, Screenshots, A11y, Motion mit Zweck, Risk-Cap.

**Lücken:**

- **Critical — Der Workflow fehlt fast vollständig.** „Reuse before inventing" ist keine Pflicht-Lesequote, kein Token-Verbot, keine Verify-Checkliste. Genau hier entsteht das „AI-generierte UI", das der Nutzer später wegwirft.
- **Important — Observe-each-change ist zu schwach.** Unsere Formulierung erlaubt „described states"; OmO besteht darauf, dass eine ungesehene Änderung nicht fertig ist.
- **Nice-to-have — Artistry-Modus fehlt.** Unsere Persona vereint System-Disziplin und kreativen Bruch ohne Umschalter.

**Empfohlene Ergänzung:**

> Phase 1: read at least five existing components plus the project's tokens before writing CSS/JSX. No hardcoded colors, spacing or type sizes where tokens exist. Phase 4: verify layout at desktop and mobile widths, focus states, keyboard path, contrast and motion. A change you have not looked at is not done.

**Bewertung:** Der größte Spezialisten-Qualitätsverlust. Die Persona ist nicht falsch, sie ist nur zu kurz, um UI-Qualität zuverlässig zu erzeugen.

### 4.4 `writer` vs. `writing`

**OmO-Original:** `packages/senpi-task/src/category/kimi-categories.ts` (plus die Comment-Checker-Doktrin).

OmO verbietet konkrete AI-Slop-Muster: em/en dashes, Phrasen wie *delve, robust, leverage, utilize, in order to*, Filler-Openings, konsekutive gleiche Satzanfänge; verlangt Kontraktionen und variable Satzlänge. „Understand the audience" ist der erste Schritt.

**Was unsere Persona abdeckt:** Stimme der Umgebung, Faktenprüfung, kurze Sätze, Beispiele statt Adjektive, prüfbarer Bericht.

**Lücken:**

- **Important — Anti-AI-Slop fehlt.** „Short sentences, concrete nouns" ist eine Stilrichtung, keine Durchsetzung. Die konkreten Verbote sind der Unterschied zwischen gutem und erkennbar generiertem Text.
- **Nice-to-have — Audience fehlt.** Nicht jede Doku richtet sich an dieselben Leser.

**Empfohlene Ergänzung:**

> Understand the audience before drafting. Anti-slop: no em/en dashes; no delve/robust/leverage/utilize/in order to; use contractions where the surrounding voice does; vary sentence length and openings; no filler opening. Verify every factual claim against the code.

### 4.5 `architect` vs. `architect`

**OmO-Original:** `packages/senpi-task/src/category/anthropic-categories.ts`.

OmOs Methode: (1) ganze Architektur surveyen, (2) mindestens zwei viable Designs mit Trade-offs in konkreten Dimensionen (coupling, testability, migration cost, failure modes), (3) genau eine Empfehlung mit Begründung, Grenzen und Risiken, (4) die einfachste Architektur verlangen und Enterprise-Muster ablehnen, (5) im Bug-Modus ein weites Netz über code, logs, git history, issues, docs, config und Reproduktion spannen, Root Cause mit Proof. Wenn eine Änderung nötig ist, wird sie gemacht und verifiziert, statt beim Vorschlag stehenzubleiben.

**Was unsere Persona abdeckt:** System vor Änderung, Trade-offs, abgelehnte Alternative, echte Grenzen, weniger/tiefere Module, Evidenz, advisory vs. implement.

**Lücken:**

- **Important — Zwei-Design-Minimum fehlt.** „Weigh trade-offs" kann bei einer einzigen naheliegenden Lösung bleiben; OmO erzwingt eine echte Alternative.
- **Important — Trade-off-Dimensionen fehlen.** Coupling, Testbarkeit, Migrationskosten und Fehlermodi sind konkreter als „Vor- und Nachteile".
- **Nice-to-have — Bug-Modus fehlt.** Der weite Netz-Wurf über Logs/History/Issues/Reproduktion ist eine eigene Arbeitsweise.
- **Nice-to-have — Implement-when-needed ist schwächer formuliert.**

**Empfohlene Ergänzung:**

> Survey the whole architecture. Produce at least two viable designs, compared on coupling, testability, migration cost and failure modes; recommend exactly one with boundaries and risks. Prefer the simplest architecture that works. In bug mode, cast a wide net over code, logs, git history, issues, docs, config and a reproduction; prove the root cause. When a change is needed, make and verify it.

### 4.6 `inspector/plan-review` vs. `plan-reviewer`

**OmO-Original:** `packages/senpi-task/src/agents/builtin/plan-reviewer.ts`.

OmO validiert zuerst den Input: genau ein Plan-Pfad, sonst Reject. Bei Wiedervorlage wird der Plan erneut von der Platte gelesen; das vorherige Urteil zählt nicht. Es gibt eine explizite Anti-Pattern-Liste: „Task 3 could be clearer", „consider adding acceptance criteria", „might be suboptimal", „missing edge case", „more than 3 issues" sind **keine Blocker**. Jeder Check unterscheidet *PASS even if …* von *FAIL only if …*. Der Ideal-State-Check prüft vier Dinge: Nutzer benannt, IS-Zeilen konkret, jede IS-Zeile auf Todo+QA abgebildet, der Ansatz erreicht die Zeilen.

**Was unsere Persona abdeckt:** fünf harte Checks, OKAY/REJECT, zitierte Blocker, „never on taste", Fokus-Kappe drei, WorkOrder-Struktur.

**Lücken:**

- **Important — Anti-Pattern-Liste fehlt.** „Never on taste" ist abstrakt; die konkreten Nicht-Blocker verhindern, dass der Reviewer in Verfeinerungs-Schleifen abdriftet.
- **Important — PASS-even-if / FAIL-only-if fehlt.** Ohne diese Differenzierung wird jeder Check binär und dadurch strenger als beabsichtigt.
- **Nice-to-have — Re-read-Regel fehlt.** Jede Wiedervorlage muss den aktuellen Stand von der Platte lesen.
- **Nice-to-have — Ideal-State-Fidelity ist weniger streng.** Unsere Success-Criteria-Tabelle trägt sie, aber der Reviewer prüft sie nicht als eigene Invariante.

**Empfohlene Ergänzung:**

> Re-read the work order from disk on every resubmission; never trust the previous verdict. Never reject for: “could be clearer”, “consider adding…”, “suboptimal”, a missing edge case, or more than three issues. For each check state PASS-even-if and FAIL-only-if. Verify the ideal-state chain: named user, concrete IS rows, every row mapped to suborder+QA, approach reaches every row.

### 4.7 `inspector/execution-review` vs. `code-reviewer` + `qa-executor` + `gate-reviewer`

**OmO-Original:** `packages/senpi-task/src/agents/builtin/code-reviewer.ts`, `qa-executor.ts`, `gate-reviewer.ts`.

OmO trennt drei Perspektiven:

1. **Code-Qualität:** u. a. `remove-ai-slops` und `programming`-Skill-Perspektive; Report muss sagen, ob sie gelaufen sind. Severity CRITICAL/HIGH/MEDIUM/LOW; CRITICAL/HIGH → REQUEST_CHANGES.
2. **Echte QA:** `adversarialCases` mit class / expected / verdict / artifactRefs; `not_applicable` nur mit Begründung.
3. **User-Outcome-Gate:** ursprüngliche Absicht und gewünschtes Ergebnis rekonstruieren, shipped artifact dagegen prüfen; jeder Success-Claim gilt als unverified, bis er aus Artefakten reproduziert ist; irreführende Success-Ausgabe ohne Artifact-Pfade ist ein Blocker.

**Was unsere Persona abdeckt:** Diff zuerst, Claims gegenchecken, Checks, echte Oberfläche, Brechen versuchen, OKAY/REJECT, Defekte zurück an dieselbe Session.

**Lücken:**

- **Critical — Drei Perspektiven sind nicht getrennt.** Ein Reviewer kann nicht gleichzeitig tiefe Code-Qualität, echte QA und User-Outcome-Gate mit derselben Aufmerksamkeit leisten.
- **Critical — Severity-Taxonomie fehlt.** OKAY/REJECT ohne CRITICAL/HIGH/MEDIUM/LOW macht nicht sichtbar, *warum* abgelehnt wird und ob ein Reparaturversuch ausreicht.
- **Critical — User-Outcome-Review fehlt.** Unsere Gates prüfen den Plan, aber nicht ausdrücklich, ob das ausgelieferte Artefakt die ursprüngliche Nutzer-Absicht erfüllt.
- **Important — „Unverified until reproduced" fehlt.** Ein grüner Test des Arbeiters ist ein Claim, bis der Reviewer ihn aus den Artefakten nachvollzieht.
- **Important — Adversarial-Cases-Struktur fehlt.** Klasse, Erwartung, Urteil und Artefakt-Referenz machen Gate 4 prüfbar statt erzählerisch.
- **Nice-to-have — Explizite Report-Pfad-Konvention fehlt im Persona-Text** (im Running-Protokoll steht sie bereits).

**Empfohlene Ergänzung:**

> Run three passes: (1) code quality — including the remove-ai-slops and programming perspectives; (2) real-surface QA; (3) user-outcome gate — infer the original intent and desired outcome, compare the shipped artifact. Classify findings CRITICAL/HIGH/MEDIUM/LOW; CRITICAL or HIGH means REJECT. Every success claim is unverified until reproduced from artifacts. Adversarial cases record class, expected result, verdict and artifact refs; not_applicable requires a reason. Misleading success output without artifact paths is a blocker.

### 4.8 Merge-Bewertung

- **Seeker (explore + librarian):** akzeptabel, aber nur mit den Overlay-Pflichten aus 4.1/4.2. Ohne Analysis-Block und Permalink-Disziplin verliert der Merge Qualität.
- **Inspector (plan-review + execution-review):** grundsätzlich sicher, weil die Overlays klar getrennt sind. **Aber:** Der Execution-Review-Overlay muss intern drei Passes haben oder bei riskanten Routen in drei Dispatches zerfallen. Sonst wird die eine Persona zum Engpass.
- **Artist vs. Writer:** klar getrennt.
- **Architect vs. Academic:** sinnvoll getrennt, sobald der Architect das Zwei-Design-Minimum und der Academic die Grenze „reasoning as deliverable" bekommt.
- **Writer vs. Seeker/docs:** klar getrennt (Recherche vs. Erzeugung).

## 5. Priorisierte Empfehlungen

### P0 — vor dem Pilot (verhindert Kernfehler)

1. **`worker/deep`: Stop-Regeln ergänzen.** Frage beendet den Turn unfertig; Erfolgskriterien erreicht → sofort stoppen; nur drei Früh-Stoppgründe; Fan-out bei unvollständiger Lesewelle. **Grund:** Critical.
2. **`artist`: vierphasigen Design-System-Workflow ergänzen.** Mindestens fünf Komponenten + Tokens lesen, keine Hardcodes, Verify-Checkliste, „nicht gesehen = nicht fertig". **Grund:** Critical.
3. **`inspector/execution-review`: drei Passes + Severity + User-Outcome.** Code-Qualität → echte QA → User-Outcome; CRITICAL/HIGH → REJECT; Success-Claim erst nach Reproduktion glauben. **Grund:** Critical.
4. **Routing-Metadaten einführen.** Pro Persona `here_when / not_here_when / prefer_over / escalate_to` als separater Routing-Kopf oder `routes.md`; nicht in den Core Directive duplizieren. **Grund:** Routing ist der Kern des Produkts; ohne Gates bleibt die Qualität am Dirigenten-Verständnis hängen.

### P1 — im Pilot schärfen (sichtbarer Qualitätsgewinn)

5. **`worker/high`:** Surface-Breadth (callers, siblings, tests, docs, schemas, config, CI, history), zwei Ansätze, Konsistenz über alle Flächen, Frage-als-Abbruch.
6. **`worker/quick` und `worker/low`:** Caller-Guidance (nummerierte Muss-Schritte, forbidden scope, ein Erfolgskriterium) und Selection Gates (Spezialist zuerst).
7. **`seeker/codebase`:** Analysis-Block, erste Welle ≥3 Tools, fixes `<results>`-Schema, absolute Pfade.
8. **`seeker/docs`:** SHA-Permalinks, Versionen nicht mischen, Evidence pro Claim, Inference/Unsicherheit/Konflikt labeln.
9. **`writer`:** Anti-AI-Slop-Regeln und Audience als ersten Schritt.
10. **`architect`:** zwei Designs, konkrete Trade-off-Dimensionen, Bug-Modus mit weitem Netz und Proof.
11. **`inspector/plan-review`:** Re-read, Anti-Pattern-Liste, PASS-even-if/FAIL-only-if, Ideal-State-Fidelity.
12. **Route-Vertrag um `skills: [...]` erweitern.** Task-spezifische Fähigkeiten gezielt laden, nicht global aufblasen.
13. **Gemeinsamer Return-Contract.** Result / Evidence / Assumptions / Route-Status stabil über alle Personas.
14. **Read-only mechanisch absichern, wo die Plattform es kann.** Permission-Sets pro Child; bis dahin explizites Tool-Verbot + Inspector-Check auf unerwartete Dateiänderungen.

### P2 — nur bei belegtem Bedarf

15. **Familien-Overlays (GPT/Claude):** Erst wenn der Pilot zeigt, dass familienreine Ketten nicht ausreichen.
16. **Artistry-Modus:** Nur wenn tatsächlich radikale, unkonventionelle Gestaltung verlangt wird; nicht vorsorglich eine achte Persona bauen.
17. **Weitere Reviewer-Splits:** Nur wenn riskante Routen zeigen, dass ein Inspector-Pass nicht ausreicht.

### Umsetzungsreihenfolge

- **Zuerst P0.1–P0.3** (drei kritische Personas), danach **P0.4** (Routing-Gates), dann gezielt **P1** nach dem ersten echten Pilot-Feedback.
- Keine vollständigen Neuschreibungen: kleine, präzise Ergänzungen an den vorhandenen Overlays. Die Architektur bleibt; die Operative Tiefe wächst.
- Nach jeder Ergänzung den Pack-Check laufen (Struktur, keine Modell-IDs, Ketten, Protokoll-Referenzen) und eine kurze Oracle-Stichprobe auf Widerspruchsfreiheit.

## 6. Was bewusst nicht kopiert werden sollte

- OmOs Hook-/IntentGate-Maschinerie: Sie gehört zu OmOs Plugin-Architektur, nicht zu unserem WorkOrder-Modell.
- OmOs Multi-Work-Boulder-Registry: Sie löst ein Problem (mehrere parallele Hauptarbeiten), das unser Pilot noch nicht hat.
- OmOs Notepad-/Kibitzer-Maschinerie: Memory und Knowledge sind bei uns native Adapter.
- OmOs Skill-eingebettete MCP-Server: Nicht nativ in OpenCode; Fähigkeiten gehören in den Route-Vertrag, nicht in Persona-Dateien.
- Die vollständige OmO-Kategorie-Zoo: Unsere sieben Personas sind bewusst kleiner; die Überlegenheit liegt im Modell, nicht in der Zahl.

## 7. Quellen

- Unsere Dateien: `personas/*.md`, `conductor.md`, `protocols/*.md`, `chains.json`, `templates/work-order.md`.
- OmO: `packages/senpi-task/src/category/openai-categories.ts`, `anthropic-categories.ts`, `google-categories.ts`, `kimi-categories.ts`, `builtins.ts`, `resolver.ts`, `fallback-chains.ts`.
- OmO: `packages/senpi-task/src/tools/task/description.ts`, `execute-spec.ts`, `types.ts`.
- OmO: `docs/guide/orchestration.md`, `docs/guide/agent-model-matching.md`.
- OmO: `packages/omo-opencode/src/agents/sisyphus/default.ts` (Intent Gate), `packages/prompts-core/prompts/ultrawork/*`.
