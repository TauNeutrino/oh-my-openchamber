# Oh-my-openchamber

Ich möchte mit diesem Projekt etwas Ähnliches erreichen wie OmO (oh my openagent) — aber mit den nativen Funktionen von OpenChamber, z. B. Leads (https://docs.openchamber.dev/de/leads/). Wir arbeiten an einem Plan, wie wir etwas in diese Richtung schaffen können. Projektname: oh-my-openchamber.

---

OmO baut seine eigene Orchestrierung: eigene Sub-Agenten, Hooks, Modell-Routing, Magic Keywords. OpenChamber hat diese Maschine schon nativ — Leads, Workflows, Briefings, Übersichten. Oh-my-openchamber wäre also keine zweite Engine, sondern etwas, das die native Engine richtig fordert: statt Orchestrator zu sein, Orchestrierung zu konfigurieren.

---

Plan-Korrekturen nach erster Durchsicht: Die Agenten sind **die Musiker des Orchesters**. ESCALATE gilt **nur für die vier Coding-Spuren** — die Fachspuren und Read-only-Agenten eskalieren nicht, sie berichten. Die Detail-Prompts von omoc-plan/omoc-execute und der Agenten werden aus OmOs Originalen übertragen und auf OpenChamber portiert — genau dort steckt der Löwenanteil der Prompt-Arbeit; der Plan hält nur das Gerüst. Und IntentGate ist von der Streichliste genommen: Der Verdacht ist, dass OmOs Intents mehr sind als Keywords — wirkliches anderes Verhalten des Hauptagenten. Recherche läuft, danach entscheiden wir, ob der Dirigent Intents kriegt.

---

Die Form: ein Skill-/Agenten-Pack für OpenChamber — kein Plugin-Code, keine eigene Engine. Von Anfang an öffentlich. Magic Keywords sind nebensächlich.

Das Herzstück, an allem gemessen: Multi-Modell-Routing nach Risiko und Komplexität — die Bewertung muss automatisch passieren, niemand soll Modellwahl manuell denken. Daneben das batteries-included Team als fertige Rollen. Skills zählen, aber Prompt Engineering für die Agenten ist der wichtigste Hebel — Skills tragen zum Gesamtgefühl bei, Prompts tragen das Ergebnis.

---

Grundsatz-Entscheidung: oh-my-openchamber funktioniert unabhängig, mit eigenen Lead-Agenten und Subagents. Es ist kein Add-on zu oh-my-opencode(-slim); native OpenChamber-Funktionen (Memory, Schedule, Notify, Knowledge, Secrets, Sessions) werden überall genutzt, wo sie nutzen bringen — nicht als Feature-Checkliste, sondern weil ein gutes Rezept sie braucht.

---

Fakten geprüft (Doku): Der Agent-Control-Tool nimmt pro Unter-Sitzung ein Modell an — ein Lead kann also jeden Delegations-Schritt auf eigenes Modell stellen. Workflows schlagen pro Phase ein Modell vor (billig zum Lesen, stark zum Schreiben), aber der Mensch genehmigt. Automatisches Risiko-Routing gibt es in OpenChamber nicht: Genau hier ist der Raum, den oh-my-openchamber füllt — die Bewertung ist neu, die Ausführung (Modell pro Session) nativ da. Eigene Agenten sind benannte Konfigurationen: Modell, Persönlichkeit, Temperatur, Tool-Regeln.

---

OmO-Manifesto, gelesen. Ihr Kern: Modelle haben verschiedene Temperamente — eins denkt tief, einer denkt architektonisch, einer ist schnell. Ein-Werkzeug-ein-Modell zwingt dich zu einer einzigen Persönlichkeit für alle Aufgaben; der Abstand zwischen Multi-Modell-Orchestrierung und Ein-Modell-Limit wächst jeden Monat. Daraus zitierbar für unser eigenes Manifesto.

OmOs Weg dorthin ist eine Plugin-Maschine: IntentGate (Regex auf Keywords), 54 Hooks, Kategorien, die das Modell verbergen, Kibitzer als Gedächtnis-Beiwager. Genau diese Maschine brauchen wir nicht zu bauen — OpenChamber bringt Leads, Briefings, Workflows und Memory nativ mit. Unser Beitrag ist stattdessen die *Besetzung und die Regeln*: wer im Team sitzt, welche Stimme welche Aufgabe bekommt, und nach welchem Risiko-Satz der Lead das Modell pro Unter-Sitzung wählt.

OmO routet nach Aufgabentyp (architect, quick, deep-high …). Wir wollen nach Risiko und Komplexität routen — das ist ein echter Unterschied, kein Klon: OmO fragt „was für eine Art Arbeit ist das?", wir fragen zuerst „was kostet ein Fehler?". Ein billiges Modell darf forschen; ein irreversibler Schritt will das stärkste Modell und einen Menschen im Raum.

Kibitzer (read-only Gedächtnis-Beiwager, der nur,stößt') hat OpenChamber ebenfalls nativ: Memory-Einträge + Knowledge, die neue Sessions automatisch sehen. Kein Sidecar zu bauen — nur Regeln, was eine Erinnerung wert ist.

---

Wir geben den Takt: *„Damit ein Orchester gut klingt müssen alle Musiker im Einklang spielen. Wir geben den Takt und hohlen das beste aus den Instrumenten heraus."* — Kandidat für den eigenen Manifesto-Satz.

---

Entscheidung fürs Routing: Das Kategorien-Modell von OmO gefällt besser als reine Risiko-Stufen — eine Kategorie ist Aufgabentyp **und** trägt ihr Prompt Engineering gleich mit. OmOs Tabelle als Ausgang: quick (mechanisch, Standard für jedes teilbare Stück), unspecified-low, unspecified-high (Standard-Feature über wenige Dateien), visual-engineering (Frontend/UI), writing (Doku/Prosa), deep (haariges Debugging, rechecherlastig, subtil übergreifend), ultrabrain (ein echt hartes, logisches Problem — Ziel geben, nicht Schritte), architect (Grenzen, Zerlegung, Trade-offs; greift nur ein, wenn die Aufgabe es braucht). Die Kategorie ist in OpenChamber kein Plugin-Feature, sondern schlicht ein benannter Agent: Modell + Prompt + Tool-Regeln — der Lead wählt beim Erstellen der Unter-Sitzung Agent **und** Modell.

Besetzung steht: Lead + Explorer (schnelle Codebase-Recherche), Librarian (Docs/OSS), Fixer (Bau), Oracle (Architektur/Eskalation), Reviewer (Prüfung), Observer (Bilder/PDF, optional). Leitbegriff: **Regiebuch**. Gestrichen: IntentGate/Keywords, Team Mode, Hooks, LSP-Tools, Comment-Checker — alles nativ da oder Prompt-Sache.

---

Feinschliff der Ideenwelt: Partitur statt Regiebuch, der Lead heißt **Dirigent** — die Orchester-Familie gewinnt gegen die Theater-Familie, weil die eigene Manifesto-Zeile schon von Musikern und Takt spricht.

Wichtige Verfeinerung des Katalog-Modells: quick, general-low und general-high **sind** die Risiko-Abstufungen des normalen Codings — alle übrigen Kategorien sind Aufgabentypen, keine Risikostufen. Das Risiko steckt also schon in der Katalog-Wahl, nicht in einer zweiten Maschine darüber. Und: Kategorie-Routing ist der Kern des Projekts — hier gehört die meiste Aufmerksamkeit hin, und es muss richtig gemacht werden. OmO macht diesen Teil gut; seine Quellen zu recherchieren zahlt sich aus.

Zur Rollenfrage: jede Kategorie kann als eigener Agent ausgeprägt sein (in OpenChamber ohnehin Modell + Prompt + Tool-Regeln) — aber die Rolle als separates Ding, wie OmO sie über verschiedene Agenten streut, ist übertrieben.

---

Aus OmOs Quellen (Recherche). Die Routing-Rubrik ist ein Pflicht-Protokoll im Prompt des Hauptagenten: Kategorie wählen, dessen Domäne beschreiben, Match sagen — mit scharfen Kanten wie „ANY visual design relation = ALWAYS visual-engineering. NO EXCEPTIONS" und der Voreingenommenheit „Default Bias: DELEGATE. Work yourself only when it is super simple." Dazu Selektions-Gates statt langer Beschreibungen: DEEP_HIGH heißt „route here only when you can name the decision evidence cannot settle: a trade-off".

Der Beste Fund: **ESCALATE als Routing-Rückgabewert.** OmO routet zweifelhafte Fälle billig („When unsure, choose deep-low") und die Untätigkeit antwortet `ESCALATE: deep-high`, wenn die Aufgabe zu hart ist. Fehlrouting ist also kein Fehler, sondern ein Weg — man muss nicht richtig raten, man muss nur falsch-raten billig machen. Das passt zu uns: erst die billige Spur, der Deckel eskaliert, wenn die Belege es verlangen.

Und eine Lücke, die wir füllen können: OmO sammelt Learnings in einer Notepad-Datei, aber sie fließen **nicht** ins Routing zurück. OpenChamber hat Memory nativ — bei uns kann jede Delegation ihre Kategorie-Wahl + Begründung erinnern, und der Dirigent füttert seine eigene Rubrik damit. Der Lern-Loop ist unser Unterscheidungsmerkmal.

Technik-Nebenbefund: OpenCode-Agenten nehmen Modell mit `#variant` (Reasoning-Stufe) und Permission-Regeln pro Aktion — genug für Kategorien als Agenten, ohne eigenen Code.

---

Die letzte Strukturentscheidung, anders herum als erst vermutet: **Alles ist Agent, keine Kategorie.** Es gibt kein Kategorie-System als eigenes Konzept — quick, general-low, general-high, visual-engineering, writing, deep, ultrabrain, architect sind einfach Agenten unter vielen, jeder mit Modell, Reasoning-Variante, Prompt und Permission-Regeln. Der Dirigent routet über die Besetzungsliste, nicht über ein Kategorien-Verzeichnis. ESCALATE ist dann schlicht eine Neubesetzung: die Unter-Sitzung gibt zurück, an welchen anderen Agenten der Auftrag gehen soll.

---

Nachschub auf der Besetzungsliste: **plan-consultant** und **plan-reviewer** gehören dazu — als Gates (Lückenanalyse vor fertiger Planung; Prüfung des Plans gegen Kriterien). Dazu vielleicht ein **git**-Agent; OmOs Checking-Pipeline wird dafür genau angeschaut. Offen bis zur Recherche.

---

OmOs Checking-Pipeline, aufgeleuchtet. Ihre Grundeinstellung: *„Der Subagent behauptet, fertig zu sein. Er lügt wahrscheinlich."* Vier Phasen nach jeder Rückkehr: (1) Erst Code lesen — Diff, jede geänderte Datei, Stubs und Scope-Creep, Behauptungen gegenchecken; (2) Automaten laufen lassen — Diagnostics null Fehler, Tests, Build exit 0; (3) Hands-on fürs Sichtbare; (4) Tor-Entscheidung: jede Zeile erklärbar?in Funktion gesehen? nichts kaputt? — sonst zurück an dieselbe Session. Fertig gilt erst mit abgehaktem Plan-Kästchen, nie mit der Behauptung des Agenten.

plan-reviewer als Tor mit Verdict OKAY/REJECT und harten Kriterien: Referenzen existieren, Plan ausführbar, keine Blocker, QA-Szenario mit Werkzeug+Schritten+erwartetem Ergebnis, „Affected User" benannt und bis zum Todo verfolgt. „Approve when checks pass; reject on blocker, never on taste." Maximal 3 Blocker.

Git: OmO hat **keinen** Git-Agenten — die Disziplin lebt im git-master Skill (Commits mit Co-Author-Trailer), --make-pr und --ship sind Flags des Execute-Modus. Lehre für uns: Git-Disziplin ist Skill-Sache plus Dirigent-Regeln, keine Besetzung.

Zu spiegeln in unserem nativen Rahmen: Die vier Phasen werden Prompt-Protokoll des Dirigenten — und OpenChambers Lead-Verhalten („Bericht ohne Belege geht zurück") ist die native halbe Miete. „Assume it's broken until proven" wird Doktrin.

---

Korrektur an mir selbst: größere Planungen gehören **nicht** ins Memory. OmO macht das richtig — ulw-plan und ulw-execute sind Skills, das Plandokument ist eine Datei. Für uns also **omoc-plan** und **omoc-execute**. Tools wie openspec können integriert werden, wenn verfügbar.

Der Ablauf von omoc-plan ist eine **Schleife**: Dirigent befragt dich → Entwurf → plan-consultant sucht Lücken → überarbeiten → wieder Lücken — der Kreislauf dreht, bis der Entwurf passt. Erst dann wird der Plan geschrieben — mit Todos, Abhängigkeits-Matrix und QA-Szenarien — und dann kommt plan-reviewer als Tor (OKAY/REJECT). Der Reviewer prüft nicht den rohen Entwurf, sondern das fertige, geschriebene Plan-Dokument.

OmO-Feinunterschied, aus den Quellen: **deep arbeitet, ultrabrain entscheidet.** deep (zwei Stufen, low eskaliert zu high) ist die autonome Umsetzungs-Spur für Tiefen unbekannt: ein Ziel, ein Ergebnis, Mechanismus verstehen (zwei Ebenen über dem Symptom), dann den Fix liefern — alles, was Code, Tests und History entscheiden können. ultrabrain ist für *das eine* wirklich harte, logik-schwere Problem im Plan: bekommt nur das Ziel, wählt den Weg selbst, lässt Korrektheit Geschwindigkeit und Kosten schlagen, und liefert eine entscheidungs-komplette Empfehlung mit Belegen, abgelehnten Alternativen und dem stärksten Gegenfall. deep ändert Code, ultrabrain klärt, was richtig ist — und ultrabrain ist modell-gekoppelt (existiert nur mit dem Flaggschiff, sonst wird die Spur gemeldet statt still umgeleitet).

---

Intents, zu Ende recherchiert. OmOs IntentGate ist mehr als Keywords: **ultrawork** injiziert ein ganzes Verhalten — Pflicht-Planung für jede Aufgabe ab zwei Schritten, Delegier-Mandat, **Szenario-Vertrag** (Happy/Edge/Adjacent-Szenarien als Prüfrahmen), zwei Artefakte (Tests + echte Oberfläche), Notizen als dauerhaftes Gedächtnis, häufige Commits, Hands-on-QA-Pflicht, Reviewer-Tore. Dazu Modell-Override. hyperplan zwingt eine adversarische Fünfer-Runde aus Kritik-Agenten vor der Planung. team mode schaltet auf team_*-Werkzeuge um.

Das Keyword-Protokoll selbst können wir nicht kopieren — es braucht einen Message-Hook, den OpenChamber nicht hat. Aber wir brauchen es nicht: **OpenChamber hat den Intent-Schalter nativ — die Session-Werdung.** Eine normale Session bleibt leicht; *„Diese Sitzung zum Lead machen"* macht sie zum Dirigenten, mit vollem Orchester-Verhalten und erhaltenem Verlauf. Das ist exakt ultraworks An/Aus, nur ohne Regex. Das ultrawork-Prompt selbst (Disziplin, Szenario-Vertrag, QA-Pflicht) ist das wertvolle Artefakt — es wird in den Dirigenten-Prompt portiert. hyperplan ist im Wesentlichen unser omoc-plan mit seinen Gates; team mode bleibt gestrichen.

Korrektur des Nutzers, wichtiger als meine Doku-Lektüre: Intents sind für ihn nicht die Mode-Keywords, sondern **das, was der Agent aus dem Prompt selbst liest** — Forschung, einen Bug finden, etc.: OmO sagt ihm, welche Absicht es erkennt, und reagiert entsprechend; er kann korrigieren. Das semantische Intent-Erkennen ist der eigentlich interessante Teil — Recherche dazu läuft (Repo, Changelog, omo5), Doku sagt zwar „keine semantische Klassifikation", aber der Quelltext/die neueren Versionen können mehr.

Gefunden, der Nutzer hatte recht: Der **Intent Gate ist Schritt 0 im Prompt des Haupt-Orchestrators (Sisyphus)** — reines Prompt Engineering, kein Hook. Vor jeder Aktion verbalisiert der Agent die erkannte Absicht und seine Route: *„Ich erkenne [recherche/umsetzung/untersuchung/bewertung/fix/offen] — Grund. Mein Vorgehen: …"* Dazu eine feste Äußerung→Absicht→Routing-Map: Erklären → forschende Agenten, dann Antwort. Implementieren (ausdrücklich) → Plan, dann Delegation. Untersuchen → Bericht, keine Änderung. Bewertungsfrage → Vorschlag, dann **auf Bestätigung warten**. Fehlermeldung → diagnostizieren, minimal fixen. Offenes Ändern (refactor/clean up) → erst Codebase einschätzen, Ansatz vorschlagen. Die Ankündigung verpflichtet zu nichts; nur die ausdrückliche Anweisung des Nutzers startet Umsetzung. Die Gemini-Variante ergänzt eine harte Selbstkontrolle („übersprungen? Dein nächster Werkzeugaufruf ist UNGÜLTIG"). Voll in den Dirigenten übertragbar — **Bewertung endet auf Bestätigung** ist die billigste Über-Implementierungs-Bremse.

---

Modell-spezifische Prompts bei uns: OpenCode-Agenten-Prompts sind statisch (kein Umschalten pro Modell) — aber zwei Hebel machen es trotzdem machbar. **Erstens: familien-reine Ketten.** OmO koppelt verhaltenskritische Kategorien ans Modell (ultrabrain existiert nur mit dem GPT-Flaggschiff, architect läuft nur auf Claude-Kette); machen wir genauso — die Fallback-Kette bleibt innerhalb einer Modellfamilie, dann passt ein Prompt immer zur Familie. Wo eine Familie fehlt: die Spur wird gemeldet statt still umgeleitet, oder der Agent wird gesplittet — Agenten sind bei uns billig, es gibt kein Kategorien-Konzept, das splitten teuer machen würde. **Zweitens: der Dirigent als Stimmer.** Er weiß bei jeder Delegation, welchen Agenten er mit welchem Modell ruft, und gibt im Briefing einen familien-spezifischen Zusatz: GPT-artige Modelle bekommen das Ziel statt Schritte, prinzipien-getrieben („give it a goal, not a recipe" — Over-Orchestrierung bei kleinen Aufgaben ist das bekannte Risiko); Claude-artige vertragen lange, mechanisch-strukturierte Anweisungen. OmOs Familien-Doktrin wird dafür als kurze Nachschlagtabelle in den Dirigenten-Prompt portiert. Wie genau der Dirigent familarbeitet, zeigt der Pilot.

Warnung, ernst zu nehmen: Der Dirigenten-Prompt darf nicht aufblasen. OmOs Sisyphus-Prompt und das ultrawork-Injektion sind riesig, weil OmO dem Agenten alles Mechanische beibringen muss — Delegation, Berichte, Briefing. **OpenChamber hat diese Mechanik nativ** (Lead-Verhalten, Übersicht, Briefing außerhalb, Berichte ohne Belege gehen zurück). Deshalb portieren wir nur, was nicht nativ da ist, und halten den Dirigenten-Prompt als dünne Partitur: Intent Gate (ein Satz + Mini-Map), Routing-Protokoll, Risiko-Deckel, ESCALATE, Vier-Phasen-Prüfung als kompaktes Protokoll, Familien-Takt als Mini-Tabelle. Die schweren Protokolle (omoc-plan, omoc-execute, git-master, Detail-QA) liegen als **Skills** und werden bei Bedarf geladen — genau wie OmO ulw-plan/ulw-execute als Skills führt. Der Pilot misst, ob die dünne Fassung ausreicht; wo nicht, wird geschärft statt aufgeblasen.

Noch schlanker, Idee des Nutzers: Die Familien-Tabelle im Dirigenten-Prompt ist selbst nur ein Verweis — die modell-spezifischen Prompt-Appends liegen **bei den Agenten-Konfigurationen**, wo sie hingehören. Der Agent trägt sein eigenes Temperament in seinem Prompt (familien-reine Ketten garantieren, dass es zur Familie passt); der Dirigent muss das nicht duplizieren. Er routet und briefed das Ziel — die Disziplin, wie ein GPT- vs. ein Claude-artiges Modell das Ziel verarbeitet, steht im Prompt des gerufenen Agenten. Damit bleibt im Dirigenten-Prompt maximal eine Zeile Grundsatz („briefe Ziele, keine Schritte"), keine Familientabelle.

---

Orchestration-Loop, vollständig gelesen (guide/orchestration.md). Das Bild, wie alles zusammenspielt: **Ein Orchestrator, zwei Modi.** Die Haupt-Session wird beim Planen nie ein anderer Agent — sie trägt die Planungs- und die Ausführungs-Fähigkeit als Skills. ulw-plan: erst forschen (parallele read-only Wellen, architect/ultrabrain als beratende Spuren), dann Absicht klassifizieren — **CLEAR** (nur noch die Owner-Entscheidungen fragen: irreversibel, destruktiv, Ausgaben — die fragt selbst ein vorhandener Default weiter) oder **UNCLEAR** (statt zu befragen Best-Practice-Defaults annehmen, ankündigen, High-Accuracy-Review automatisch an). Kurz-Brief, Okay, dann erst plan-consultant, dann wird der Plan geschrieben, dann plan-reviewer-Runden (approval-biased, reject nur bei belegten Blockern; Runden laufen weiter, bis eine Runde freigibt). Plan-Artefakt: Spalten-null-Kästchen mit Referenzen, Akzeptanzkriterien, QA-Szenarien und einer Zeile *„Recommended task executor category"*.

ulw-execute: Plan wählen, ein Goal registrieren, **alle Todos auf einmal anlegen**, dann Kästchen für Kästchen: leicht/schwer klassifizieren, in Arbeiter-Stücke zerlegen, Unabhängiges in einem Parallele-Schlag losschicken (geroutet nach der Recommended-Category-Zeile), **fünf Tore pro Kästchen** (Plan nachgelesen, Automaten, Manual-QA-Artefakt, adversarische QA, Aufräum-Belege), Belege in ein Ledger, und das Kästchen kippt erst, wenn ein **unabhängiger Reviewer** den Fertig-Claim geprüft hat. Eine Welle pro Worktree, nur der Orchestrator mergt. Continuation: der Zustand liegt in einer Datei, eine neue Session läuft denselben Plan weiter.

Zwei Regeln, die wir übernehmen müssen: **Ohne omoc-plan gibt es keine Gates** — ein bloßer Dirigent-Lauf prüft sich selbst im Notepad, statt plan-consultant/reviewer zu rufen (die sind plan-gekoppelt, wie OmOs Plan-Gate). Und: **Teilbares zerlegt sich als Schwarm** (viele quick/general-low in einem Schlag), zusammenhängend Schweres bleibt ganz und geht als **eine** Delegation an deep/ultrabrain.

Konsequenz für den Artikel: Die Prüf-Doktrin ist kein eigener Abschnitt, sondern gehört **in omoc-execute** — sie ist der Kern seiner Schleife. Der Plan gliedert sich jetzt: Eröffnung → Grundsätze → Besetzung → Routing → **Arbeitsmodi** (omoc-plan, dann omoc-execute mit den Toren) → Schlankheit → Streichliste → Meilensteine.


Und klar getrennt: **omoc-execute implementiert den Plan als Code — er erzeugt ihn nicht.** Es konsumiert das freigegebene Plan-Dokument, zerlegt es in Delegationen über die Besetzungsliste, prüft jede Rückkehr in vier Phasen, eskaliert still per ESCALATE, und hakt ab, was belegt ist.











