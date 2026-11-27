# oh-my-openchamber

> Damit ein Orchester gut klingt, müssen alle Musiker im Einklang spielen.
> Wir geben den Takt und holen das Beste aus den Instrumenten heraus.

Modelle haben Temperamente. Eines denkt tief und gründlich, eines denkt architektonisch, eines ist schnell und billig — und keines ersetzt das andere. Ein Werkzeug, das jeden Auftrag an dasselbe Modell reicht, zwingt dich zu einer einzigen Persönlichkeit für alle Aufgaben. [OmO](https://omo.dev) (oh-my-openagent) hat dagegen gestellt, was Multi-Modell-Orchestrierung verspricht: ein Team aus vielen Stimmen, das einen Einzelagenten schlägt — und es hat dafür eine Maschine gebaut. Ein Plugin mit Dutzenden Lifecycle-Hooks, einem Regex-Gate auf Mode-Keywords, einem Kategorien-Verzeichnis, das die Modellwahl verbirgt, einem Gedächtnis-Beiwager.

OpenChamber bringt dieselbe Maschine fertig mit. Ein **Lead** ist eine Session, die eine Arbeitsrichtung verantwortet: Sie delegiert Teile an eigene Unter-Sessions, prüft, was zurückkommt, und führt dem Nutzer eine Übersicht über dem Chat. Ihr **Briefing** — Ziel, Ergebnisse, Regeln — liegt außerhalb des Repos und übersteht jede Gesprächslänge. Dazu kommen Workflows, Memory und Knowledge als native Funktionen. Keine dieser Teile muss oh-my-openchamber bauen.

Das ist der Anlass für oh-my-openchamber: **keine zweite Engine, sondern das, was der Maschine fehlt — die Partitur.** Wer sitzt im Orchester? Welche Stimme bekommt welche Aufgabe? Und nach welchem Satz wählt der Dirigent — unser Lead — das Modell jeder Unter-Sitzung? Wir liefern die Besetzung: Agenten mit Reasoning-Tiefe, Prompt und Permission-Regeln — das Modell kommt zur Delegationszeit aus der Kette. Wir liefern die Regeln: Routing, Risiko-Deckel, Prüf-Doktrin. Wir liefern die Arbeitsmodi: omoc-plan und omoc-execute. Alles als Konfiguration und Prompt-Arbeit auf OpenChamber-Bordmitteln — kein Plugin-Code, keine eigene Engine. Dieser Plan legt fest, was v1 enthält, wie es funktioniert und was bewusst draußen bleibt.

## Grundsätze

Sieben Regeln, an denen jede Entscheidung in diesem Plan gemessen wird:

1. **Alles ist Agent.** OmO verwaltet „categories" als eigenes System, das Modell und Prompt nachschlägt. Bei uns ist jeder von OmOs Kategorien einfach ein Agent: die Musiker des Orchesters, jeder mit Reasoning-Tiefe, Prompt und Permission-Regeln — das Modell kommt aus der Kette, nicht aus der Datei. Der Dirigent routet über die Besetzungsliste, nicht über ein Verzeichnis.
2. **Die Prompts sind das Produkt.** Skills tragen zum Gesamtgefühl bei, Prompts tragen das Ergebnis. Prompt Engineering pro Agent ist der wichtigste Hebel dieses Projekts — die Detail-Prompts werden aus OmOs geprüften Originalen übertragen und portiert, nicht neu erfunden.
3. **Routing ist der Kern.** Die Wahl des Agenten und Modells ist der Teil, der richtig gemacht werden muss — hier gehört die meiste Aufmerksamkeit hin. OmO macht diesen Teil gut; wir machen ihn zu unserem Zentrum.
4. **Falsch-raten billig machen, nicht richtig raten erzwingen.** Eine zweifelhafte Delegation startet billig und eskaliert, wenn die Belege es verlangen (`ESCALATE`). Fehlrouting ist kein Fehler, sondern ein Weg.
5. **Assume it's broken until proven.** Fertig gilt erst mit Belegen — nie mit der Behauptung des Agenten.
6. **Nativ, wo nativ Nutzen bringt.** Memory, Knowledge, Workflows, Schedule, Notify, Secrets werden genutzt, weil ein gutes Rezept sie braucht — nicht als Feature-Checkliste.
7. **Unabhängig.** oh-my-openchamber braucht kein oh-my-opencode und kein Slim-Setup: eigene Lead- und Sub-Agenten, eigenes Gedächtnis, eigene Modi.

## Die Besetzung

v1 spielt mit dreizehn Agenten und einem Skill. Jeder Agent ist eine benannte Konfiguration — Reasoning-Tiefe, Prompt, Permission-Regeln — und trägt sein Temperament in seinem eigenen Prompt; **keine Modell-IDs**: Das Modell wählt das Routing zur Delegationszeit aus der Kette in `chains.json`, die Datei trägt es nicht.

| Agent | Domäne | Modell-Haltung |
|---|---|---|
| **Dirigent** (Lead) | hält Rubrik und Risiko-Deckel, delegiert, prüft, fragt nur, was zählt | starkes Generalisten-Modell |
| **Explorer** | schnelle Codebase-Recherche (read-only) | schnell und billig |
| **Librarian** | Doku- und Open-Source-Suche (read-only) | schnell und billig |
| **plan-consultant** | Gate: Lückenanalyse, bevor ein Plan fertig wird (read-only, nur in omoc-plan) | zweitstärkstes Reasoning |
| **plan-reviewer** | Gate: Verdict OKAY/REJECT über das fertige Plandokument (read-only, nur in omoc-plan) | stärkstes Reasoning |
| **quick** | Mechanisches: Ein-Datei-Änderungen, Boilerplate, Konfig; Standard für jedes teilbare Stück | schnellste Stufe |
| **general-low** | kleine Aufgaben ohne klare Heimat | untere Mittelklasse |
| **general-high** | Standard-Feature über wenige Dateien mit bekannten Mustern | obere Mittelklasse |
| **visual-engineering** | Frontend, UI/UX, Styling, Animation — alles, was ein Nutzer sieht | visuell stärkste verfügbare Kette |
| **deep** | haariges Debugging, recherchelastige oder subtil übergreifende Arbeit | starkes Reasoning, Kette steigt von mittlerer auf hohe Stufe |
| **ultrabrain** | das eine wirklich harte, logik-schwere Problem — bekommt das Ziel, nicht Schritte | stärkstes Reasoning, hoch bis max |
| **architect** | Modulgrenzen, Zerlegung, Trade-offs; greift nur ein, wenn die Aufgabe es braucht | starkes Reasoning auf Claude-Kette |
| **writing** | Doku und Prosa | prosastarkes Modell |

Zwei Unterscheidungen stecken in dieser Tabelle. Erstens: **`quick`, `general-low` und `general-high` sind die Risiko-Abstufungen des normalen Codings** — alle übrigen sind Aufgabentypen, keine Risikostufen. Das Risiko steckt in der Wahl des Agenten, nicht in einer zweiten Maschine darüber. Ein billiges Modell darf forschen; was irreversibel ist, will das stärkste Modell und einen Menschen im Raum — das erzählt der Risiko-Deckel im Routing. Zweitens: **deep arbeitet, ultrabrain entscheidet.** deep ändert Code mit unbekannter Tiefe — Mechanismus verstehen, dann den Fix liefern. ultrabrain klärt, was richtig ist — und liefert eine entscheidungs-komplette Empfehlung mit Belegen und abgelehnten Alternativen.

Drei Randnotizen. **Observer** (Bilder, PDFs, Diagramme) kommt nach v1, wenn ein Rezept ihn braucht. **Git ist kein Agent**: Die Commit-Disziplin lebt im git-master-Skill (Co-Author-Trailer, PR-Fluss), den Umsetzungs-Agenten und der Dirigent tragen — OmO hat denselben Schluss gezogen. Und wo ein Agent verhaltenskritisch an ein Modell gekoppelt ist — ultrabrain nur mit dem GPT-Flaggschiff, architect nur auf der Claude-Kette —, wird die Spur gemeldet, wenn die Familie fehlt, statt still umgeleitet. Fällt eine Familie im laufenden Betrieb aus, lautet die Regel: **nächster verfügbarer Agent, mit Vermerk in der Begründungszeile** — sonst produziert Tag eins tote Routen. deep bleibt dabei *ein* Agent: Seine Kette steigt von mittlerer auf hohe Reasoning-Stufe; **Ketten reagieren auf Anbieterausfälle, nicht auf Schwierigkeit** — die Stufen-Erhöhung bei ESCALATE ist eine Regel des Dirigenten, keine Konfigurationsmagie.

## Das Routing

Der Dirigent arbeitet jede Eingabe durch dasselbe Protokoll. Es steht in seinem Prompt — dünner, als OmOs Pendant, weil OpenChamber die Delegations-Mechanik nativ mitbringt.

**Schritt 0: den Intent verbalisieren.** Bevor der Dirigent klassifiziert, benennt er, was der Nutzer eigentlich will, und kündigt seine Route an — damit der Nutzer korrigieren kann, bevor Arbeit entsteht:

| Äußerung | Erkannte Absicht | Reaktion |
|---|---|---|
| „erklär X", „wie funktioniert Y" | Recherche/Verstehen | explore/librarian → zusammenfassen → antworten |
| „implementier X", „füg Y hinzu" | Umsetzung (ausdrücklich) | planen → delegieren |
| „schau dir X an", „prüf Y" | Untersuchung | explore → Bericht der Befunde, keine Änderung |
| „was hältst du von X?" | Bewertung | bewerten → Vorschlag → **auf Bestätigung warten** |
| „ich sehe Fehler X", „Y ist kaputt" | Fix nötig | diagnostizieren → minimal fixen |
| „refactore", „verbessere", „räum auf" | offenes Ändern | erst Codebase einschätzen → Ansatz vorschlagen |

Die Ankündigung verpflichtet zu nichts: Nur die ausdrückliche Anweisung des Nutzers startet eine Umsetzung. Die Stopp-Regel der Bewertungszeile — Antwort abliefern, dann warten — ist die billigste Über-Implementierungs-Bremse, die es gibt.

**Schritt 1: den Agenten wählen.** Der Dirigent beschreibt die Domäne des Auftrags und wählt den Musiker, dessen Domäne am besten passt. Die Kanten sind scharf, nicht beschreibend — Selection Gates statt langer Erklärungen: *„Nur dann `ultrabrain`, wenn du die Entscheidung benennen kannst, die Belege nicht klären können: ein Trade-off."* Und die Voreinstellung von OmO bleibt unser Gesetz: **Delegiere. Selbst arbeiten nur, wenn es super einfach ist.** Im Zweifel fast nie `quick` oder `general-*`.

**Schritt 2: den Risiko-Deckel prüfen.** Er ändert Modell und Einsatz, nie die Besetzung — keine zweite Routing-Maschine: destruktive Schritte, Production, externe Wirkung — dann spielt der gewählte Musiker auf der **stärksten Rung seiner eigenen Kette**, und der Mensch wird gefragt, bevor etwas passiert. Riskante UI-Arbeit bleibt bei der UI-Spur; der Deckel übersteuert Modell-Ökonomie und Autonomie — nicht die Frage, wer spielt.

**Schritt 3: delegieren — mit Begründungszeile.** Jede Delegation trägt eine Pflichtzeile: *„Agent `deep` → Modell X, weil die Tiefe unbekannt ist."* Sie steht im Bericht und im Memory; sie ist der Grund, warum der Pilot ein Log zum Schärfen hinterlässt. Der Dirigent ist dabei der **einzige Schreiber** dieser Routing-Einträge — sonst füllt sich das Log mit Kinder-Spam; dafür können Unter-Sessions das Log lesen. Der Speicher ist projektbezogen und überdauert Sitzungen.

**Schritt 4: ESCALATE annehmen.** Nur die vier Coding-Spuren (`quick`, `general-low`, `general-high`, `deep`) dürfen eskalieren: Eine Unter-Session, die merkt, dass sie überfordert ist, antwortet `ESCALATE: <agent>` — und der Dirigent besetzt neu, ohne zu fragen, solange nichts destruktiv ist; bei `deep` heißt das: derselbe Agent auf der nächsten Stufe der Kette, mit neuer Begründungszeile. Die Eskalation selbst ist belegpflichtig — Token plus Versuchtes plus Grund, warum die Tiefe die Stufe übersteigt —, denn ein belegloser Bericht geht nativ zurück, und ein nacktes ESCALATE würde eine Ping-Pong-Schleife bauen. Die Regel steht deshalb **auch im Prompt der vier Coding-Spuren**: Eskalieren bei echter Überforderung, nicht bei erster Reibung. Die Fachspuren und Read-only-Agenten eskalieren nicht; sie berichten.

**Der Lern-Loop.** Hier gehen wir über OmO hinaus. OmO sammelt Learnings in einer Notizdatei — aber sie fließen nie ins Routing zurück. Bei uns landet jede Wahl mit Begründung automatisch im OpenChamber-Memory, und der Dirigent schlägt daraus Rubrik-Schärfungen vor. Die Regel ist unverhandelbar: **loggen automatisch, ändern nur mit Freigabe** — kein Agent schreibt seine eigenen Regeln um.

## Die Arbeitsmodi

Der Dirigent ist ein Orchestrator in zwei Modi: Planung und Ausführung sind Skills, die dieselbe Session trägt — sie wird beim Planen nie ein anderer Agent. Ein **Plandokument** ist eine Datei im Repo (`.openchamber/plans/<name>.md`): versioniert, review-bar, nicht im Memory — größere Planungen gehören nicht ins Gedächtnis, sondern auf Papier. Die Aufgaben-Verfolgung (Todos, Abhaken) läuft nativ im OpenChamber-Knowledge und wird mit dem Plan verknüpft. Openspec wird integriert, sobald es verfügbar ist.

### omoc-plan — der Plan entsteht in einer Schleife

omoc-plan implementiert nichts. Es endet mit einem freigegebenen Plandokument, und das in dieser Reihenfolge:

1. **Erst forschen.** Parallele read-only Wellen über Explorer und Librarian, architect und ultrabrain als beratende Spuren, wenn verfügbar. Erst wenn der Dirigent die Mechanik verstanden hat, entscheidet er, wie er mit dir spricht.
2. **Die Absicht klassifizieren.** **CLEAR** (das Ergebnis steht fest, nur Präferenzen sind offen): der Dirigent fragt nur die verbleibenden Owner-Entscheidungen — jede mit Begründung, nichts, was das Repo selbst beantworten könnte. **UNCLEAR** (das Ergebnis selbst ist matschig): statt zu befragen, nimmt der Dirigent Best-Practice-Defaults an, kündigt sie an und schaltet das High-Accuracy-Review automatisch ein. **Owner-Entscheidungen — irreversibel, destruktiv, Ausgaben — bleiben immer Fragen**, auch wenn ein Default existiert.
3. **Der Kurz-Brief.** Ziel, Ansatz, Scope-Grenzen — ein Absatz, den du freigibst. Erst dein Okay autorisiert, den Plan zu *schreiben*; ausgeführt wird später, separat.
4. **Die Lücken-Schleife.** plan-consultant jagt, was der Dirigent im Kopf hat, auf Papier: versteckte Absichten in der Anfrage, Mehrdeutigkeiten, die einen Arbeiter entgleisen lassen, Over-Engineering, fehlende Akzeptanzkriterien, unbeantwortete Randfälle. Überarbeiten, wieder Lücken — der Kreislauf dreht, bis der Entwurf passt. **Der Entwurf lebt dabei als Datei** — `.openchamber/plans/drafts/<slug>.md` mit Absicht, bisherigen Entscheidungen, offenen Lücken und dem Genehmigungs-Tor —, damit die Schleifen-Arbeit eine Komprimierung des Gesprächs überlebt; der Chat ist kein Zustandsspeicher.
5. **Der Plan wird geschrieben.** Erst jetzt, nach der Schleife: ein Dokument, in dem jede ausführbare Zeile ein Kästchen ist — mit Referenzen, Akzeptanzkriterien, QA-Szenarien (Werkzeug + Schritte + erwartetes Ergebnis, agent-ausführbar, nie „Nutzer testet manuell") und einer Zeile *„empfohlener Ausführungs-Agent"*. **Der Szenario-Vertrag kommt zuerst**: Vor den Kästchen steht die Festlegung von Happy-Pfad, Randfällen und den angrenzenden Flächen, die die Änderung brechen könnte — die QA-Szenarien leiten sich aus diesem Vertrag ab; ein Kästchen ohne Szenario aus dem Vertrag ist nicht fertig geplant.
6. **Das Reviewer-Tor.** plan-reviewer liest das fertige Dokument — nicht den rohen Entwurf — und urteilt freigabe-nah: OKAY, oder REJECT mit belegten Blockern (Referenzen existieren und stützen die Aussagen · jede Aufgabe gibt einen brauchbaren Startpunkt · Aufgaben widersprechen sich nicht · QA-Szenarien nennen Werkzeug, Schritte, Ergebnis · nichts fehlt, was die Ausführung kaltstoppen würde). *„Approve when checks pass; reject on blocker, never on taste."* Auf Reject: alle genannten Mängel fixen, erneut einreichen — die Runden laufen, bis eine freigibt.
7. **Deine Freigabe.** Dann — und nur dann — darf omoc-execute starten.

Die Gates sind plan-gekoppelt: **Ohne omoc-plan gibt es sie nicht.** Ein bloßer Dirigent-Lauf, so groß die Arbeit wirkt, prüft sich selbst und notiert die Befunde — statt plan-consultant und plan-reviewer zu rufen. Wer das Review will, beginnt mit omoc-plan.

Der Planmodus ist **klebrig**: Läuft omoc-plan, heißt auch „mach X schnell" noch *plane X* — und der Dirigent sagt das: *„Das lese ich im Plankontext."* Nur ein ausdrückliches „park den Plan" oder „änder den Plan" verlässt die Schleife.

### omoc-execute — der Plan wird Code

omoc-execute implementiert den Plan als Code; er erzeugt ihn nicht. Es konsumiert das freigegebene Dokument und arbeitet seine Kästchen ab:

1. **Alle Todos auf einmal anlegen** — eines pro Plan-Kästchen, nativ im Knowledge; jedes Todo führt den Pfad des Plandokuments, das ist die Verknüpfung. Der Zustand (aktiver Plan, Fortschritt, Session-Verweise) liegt im Plandokument selbst, sodass eine neue Session denselben Plan weiterlaufen kann.

**Als Ziel ausführen — gelegt vom Menschen, nicht vom Agenten.** Der Agent kann kein Goal setzen; nur die UI (der Plan-Dialog „Als Ziel ausführen" oder der Ziel-Button im Composer) und die CLI (`--goal`) können es. Der Nutzer bewaffnet den Lauf also beim Start: **Der Planinhalt selbst ist das Objective** (nicht „implementiere Plan X" — dem Audit wäre ein Zeiger nichts), das Token-Budget ist die Plan-Schätzung, die Turn-Kappe ist die erwartete Iterationszahl. Läuft der Lauf ohne Goal, während Kästchen offen sind, erinnert der Dirigent ans Bewaffnen und arbeitet unter der Continuation-Regel weiter. Ist das Goal aktiv, hält der serverseitige Audit den Lauf wach, bis der Zielzustand belegt ist: Er liest nur Objective und letzte Antwort — der Agent kann sein eigenes Ziel nicht für erledigt erklären, und er schließt jeden Turn mit seinen Belegzeilen (*Done / Verified / Remaining / Needs from user*). Kinder bleiben goal-frei: ein Goal pro Ausführungs-Lauf, keine Doppelsteuerung. Bei `budgetLimited`: der Dirigent bittet um mehr Budget — die Kästchen tragen den Fortschritt. Damit übernimmt der native Goal-Modus die Wachhalt-Disziplin, die OmO mit seiner Continuation-Komponente per Hook erzwang.
2. **Kästchen für Kästchen.** Jedes Kästchen wird klassifiziert (leicht/schwer), in Arbeiter-Stücke zerlegt und — das ist die Delegations-Haltung — **Unabhängiges als Schwarm in einem Parallele-Schlag** losschickt: viele `quick`/`general-low` auf einmal. Zusammenhängend Schweres bleibt ganz und geht als **eine** Delegation an `deep` oder `ultrabrain`. Geroutet wird nach der empfohlenen Agenten-Zeile des Plans, sonst nach der Routing-Rubrik — mit Begründungszeile, ESCALATE als Neubesetzung. **Scheitern wird vor Rückfrage wiederholt:** Ein gescheiterter oder unbrauchbarer Dispatch wird mit angepasstem Brief neu geschickt (höchstens zweimal); der zweite Miss heißt meist, dass die Grenze falsch gezogen ist — das Stück neu schneiden, nicht denselben Brief drittmal senden. **Continuation:** Solange der freigegebene Plan unchecked Kästchen hat, steuert der Dirigent jede neue Eingabe erst darauf zurück („wir sind mitten in der Ausführung — wie berührt das den Plan?"); neues Werk nur mit ausdrücklichem Parken, Ändern oder Fertigstellen des Plans.
3. **Fünf Tore pro Kästchen.** *Der Subagent behauptet, fertig zu sein. Er lügt wahrscheinlich.* Deshalb, in fester Reihenfolge: der Plan wurde **nachgelesen** (jede Änderung gegen die Kästchen-Zusage geprüft) · die **Automaten** laufen (Diagnostics null Fehler, Tests, Build exit 0) · das **Sichtbare wurde angefasst** (nutzerfacinge Änderungen bekommen ein Manual-QA-Artefakt: Browser, curl — plus adversarische QA, die das Ergebnis zu brechen versucht) · die **Aufräum-Belege** stimmen (kein Stub, kein Scope-Creep, nichts Unerwünschtes geändert).
4. **Das Kästchen kippt erst mit unabhängiger Prüfung.** Der Fertig-Claim eines Arbeiters wird von einem eigenen Reviewer verifiziert, bevor das Todo abgehakt wird — „fertig" ist ein Zustand mit Belegen, nie eine Behauptung. Mängel gehen zurück an dieselbe Session zur Reparatur.
5. **Wellen und Zusammenführung.** Jede Plan-Welle arbeitet in ihrem eigenen Worktree und landet auf dem Integrations-Zweig, sobald ihre Kästchen belegt sind. Nur der Dirigent mergt.

Git-Arbeit läuft nach dem git-master-Skill; der PR-Fluss (--make-pr, --ship-artiges „offen bis gemerged, CI-Fixes laufen automatisch") kommt als nativer Workflow nach v1.

## Die dünne Partitur

OmOs Orchestrator-Prompt ist riesig, weil OmO dem Agenten alles Mechanische beibringen muss: wie man delegiert, wie Berichte aussehen, wie ein Briefing geführt wird, dass beleglose Berichte zurückgehen. OpenChamber macht genau das nativ. Wer das ultrawork-Prompt wörtlich portierte, würde Verhalten doppelt bezahlen. Also gilt: **portieren, was fehlt; liegen lassen, was da ist.** Und wenn ein Verhalten im Pilot fehlt, kommt es in den Prompt nur, wenn es *immer* gebraucht wird — sonst als Skill oder in die Rubrik des betroffenen Agenten. Schärfen statt aufblasen.

Konkret liegt die Verantwortung so:

- **Im Dirigenten-Prompt** — und sonst nichts: der Intent Gate (Ankündigungssatz + die Äußerungs-Map), das Routing-Protokoll (Domäne wählen, Risiko-Deckel, Begründungszeile, ESCALATE), die Prüfpflicht in Kurzform, und ein Satz Grundsatz: *briefe Ziele, keine Schritte.*
- **In Skills, bei Bedarf geladen:** omoc-plan, omoc-execute, git-master, die Detail-QA-Verfahren — die schweren Protokolle, genau wie OmO seine ulw-Modi als Skills führt.
- **In den Agenten-Konfigurationen:** jede Familien-Doktrin und jeder modell-spezifische Prompt-Append — aber keine Modell-IDs: die leben in `chains.json`. Der Agent trägt sein eigenes Temperament; familien-reine Fallback-Ketten garantieren, dass sein Prompt zur Familie passt, die ihn bedient. Der Dirigent muss das nicht kennen und dupliziert es nicht: Jede Agentendatei hat eine kompakte **Kern-Direktive** (drei bis fünf Zeilen), die der Dirigent **zur Delegationszeit aus der Datei liest** und ins Briefing übernimmt — der Briefing-Weg ist der Standardmechanismus, solange der Pilot keinen nativen Agenten-Parameter pro Unter-Session bestätigt.
- **Bei OpenChamber:** die Delegations-Mechanik, das Briefing, die Übersicht, das Memory — alles, was keine Regeln braucht, sondern eine Maschine.

Modell-spezifische Prompts sind damit gelöst, ohne dass der Dirigent davon weiß: exakt durch Ketten-Disziplin, annähernd durch das Ziel-Briefing — und ob das zuverlässig reicht, misst der Pilot.

## Gestrichen

Was OmO mitbringt und wir bewusst nicht bauen:

| OmO-Feature | Warum gestrichen |
|---|---|
| IntentGate als Keyword-Hook | Braucht einen Message-Hook, den OpenChamber nicht hat. Das *Verhalten* der Intents bleibt — es sitzt als Schritt 0 im Dirigenten-Prompt; der An/Aus-Schalter ist OpenChambers nativer Lead-Umschlag („Diese Sitzung zum Lead machen", mit erhaltenem Verlauf). Die Dirigent-Session startet mit seinem eigenen Agenten (`mode: primary`), die Beförderung liefert die Lead-Mechanik |
| Team Mode (team_*-Werkzeuge) | Workflows sind das native Pendant für parallele Läufe |
| 54 Lifecycle-Hooks | OpenCode und OpenChamber decken das nativ ab |
| LSP-/AST-Werkzeuge | Nativ in OpenCode |
| Comment-Checker | Disziplin gehört in den Prompt, nicht in einen Hook |
| Rollen-Architektur (Fixer/Oracle/Reviewer als Agenten) | Alles ist Agent: Umsetzung ist Besetzung, keine Rolle |
| Git-Agent | Der git-master-Skill reicht — OmO zog denselben Schluss |
| Kibitzer-Gedächtnis-Beiwager | Memory und Knowledge sind nativ; wir brauchen nur Regeln, was eine Erinnerung wert ist |
| artistry (kreative Spur) | visual-engineering und writing decken kreative Arbeit ab; eine dritte Gestaltungs-Spur ist v1 zuviel |
| Hash-anchored edits | OpenCodes Edit-Werkzeug genügt; die Prüf-Doktrin fängt kaputte Edits ohnehin |
| Skill-eingebettete MCP-Server | In OpenCode nicht nativ machbar; Skills tragen Wissen, keine Server |
| Todo-Enforcer-Hook | Die Continuation-Regel des Dirigenten ersetzt den Hook |

## Meilensteine

- **M0 — der Pilot.** Dirigent und Besetzung (ohne Observer) in einem neuen, öffentlichen GitHub-Repo `oh-my-openchamber` — und zwei Wochen echter Arbeit damit. Installiert wird **projektlokal** (`.opencode/agents/`), versioniert und per Checkout rückrollbar; der Dirigent braucht dabei `mode: primary` und die Berechtigungen für die OpenChamber-Steuerwerkzeuge. Erfolg ist messbar: (a) die Agenten-Wahl fühlte sich in der großen Mehrheit der Delegationen richtig an (Ziel: mindestens 80 %), (b) **null** destruktive Aktionen ohne Rückfrage, (c) jede Delegation lieferte die Begründungszeile. Das Log schärft die Rubrik; die Lehren fließen ins Pack.
- **M1 — das Pack öffentlich.** Repo mit Agenten-Definitionen (JSON/Markdown), dieser Plan auf Englisch als README, keine eigene Installationssoftware: Installation nach dem Muster „lass einen Agenten es installieren" — ein Copy-Paste-Prompt, der Agent verdrahtet die Konfigurationen.
- **M2 — erweitert.** Observer-Agent, der ship-Workflow (PR offen bis gemerged, CI-Fixes laufen automatisch), openspec-Integration, Schedule-Rezepte für wiederkehrende Leads, und ein **mass-omoc**: Abhängigkeits-Graph über das native Workflow-Werkzeug, eine Phase pro Lauf (OmOs mass-ulw als Vorbild).

## Die Beweisführung

Der Pilot selbst ist das Experiment — zwei Wochen echte Arbeit, keine synthetischen Tests. Seine Artefakte sind die Belege: Session-Transkripte, Memory-Einträge der Delegationen, Übersicht-Rückfragen, git- und Worktree-Historie. Bewiesen werden sechs Aussagen:

- **P1 — Routing richtig:** die Agenten-Wahl fiel in der großen Mehrheit der Delegationen richtig aus *(subjektiv — dein Urteil bei den Durchsichten)*.
- **P2 — Deckel hält:** null destruktive Aktionen ohne Rückfrage *(objektiv; die katastrophalste Fehlermöglichkeit)*.
- **P3 — Zeile immer:** jede Delegation lieferte die Begründungszeile *(mechanisch zählbar)*.
- **D1 — dünne Partitur reicht:** das Verhalten ist vollständig, ohne dass der Dirigenten-Prompt aufbläst.
- **D2 — ESCALATE trifft:** nie gefeuert heißt Rubrik zu stolz, ständig heißt sie kaputt — beides ist ein Befund.
- **D3 — Ketten halten:** nach einem Fallback passt der Prompt weiter zur Familie, die ihn bedient — kein Temperament-Drift.

Zwei Durchsichten, Ende Woche 1 und Ende Woche 2:

1. **Mechanische Zählung** (P3, D2): die Routing-Einträge aus dem Log trennen — Anteil mit Begründungszeile, ESCALATE-Rate. Besitzer: ein Validator-Subagent über die Logs, du als Stichprobe.
2. **Audit** (P1, P2, D3): die Transkripte aller Delegationen lesen, jede Wahl als richtig/falsch graden, gezielt nach destruktiven Operationen ohne Rückfrage suchen, Fallback-Fälle auf Prompt-Fit prüfen. Besitzer: Validator-Subagent, dein Gefühls-Urteil (auch zu D1) als letztes Wort.

Zwei Hilfsmittel, beide mit Lebenszyklus: die **feste Zeilenform** der Begründung (`Agent → Modell | Risiko: … | weil …`) — dauerhaft, weil sie ohnehin Produktbestandteil ist — und das **Pilot-Logbuch** (`docs/pilot-log.md`) für die wöchentlichen Urteile und Befunde — temporär; es wandert als Lehre ins Pack und wird bei M1 archiviert. Kein Test-Harness für Prompts: Die echte Arbeit ist der Test, alles Weitere wäre Beweis-Overhead. Das Budget: zwei Durchsichten à etwa eine halbe Stunde plus Log-Audits durch Subagenten — mehr nicht.

## Offene Punkte

- Konkrete Modell- und Fallback-Ketten pro Agent — je nach den aktiven Abos und Anbietern; der Pilot entscheidet.
- Repo-Erstellung auf GitHub und Lizenz.
- Der Name des Dirigenten für die Öffentlichkeit („Dirigent"? „Conductor"?).
- Deutsch oder Englisch im Briefing des Piloten — der Plan ist zweisprachig gedacht: intern deutsch, öffentlich englisch.
- Bestätigt der Pilot einen nativen **Agenten-Parameter** pro Unter-Session (dokumentiert ist bisher nur das Modell), wandert die Kern-Direktive-Mitnahme aus dem Briefing in die Konfiguration. Gleiches prüft der Pilot für die Lead-Beförderung: ob eine mit dem Dirigent-Agenten gestartete Session ihren Prompt bei der Beförderung behält — beides ist undokumentiert, beides hat mit der Kern-Direktive bzw. dem Start mit dem Dirigent-Agenten einen funktionierenden Weg.
