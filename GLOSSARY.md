# Glossar

Der Kontext von oh-my-openchamber: Ein Auftrag wird durch einen Dirigenten und sieben Personas geplant und ausgeführt; OpenChamber liefert die native Mechanik, das Domänenmodell gehört dem Projekt.

## Sprache

**WorkOrder (Auftrag)**:
Eine beabsichtigte Veränderung mit einem Ziel, einem Geltungsbereich und einem nachweisbaren Abschlusszustand.
_Avoid_: Task, Plan, Session, Goal — die sind Phasen, Teile oder Mechanismen, nicht das Ding.

**State (Zustand)**:
`draft`, `approved`, `running`, `blocked`, `completed` oder `aborted`; jeder Zustand kann eigene interne Abläufe haben.
_Avoid_: Mode, Skill, Session — die sind Ausführungsformen, keine Phasen des Auftrags.

**Suborder (Teilauftrag)**:
Ein WorkOrder mit eigenem Abschluss und eigener Evidenz innerhalb eines größeren WorkOrder. Suborders haben einen eigenen Lebenszyklus: `draft/ready/running/blocked/completed/aborted`; `ready` bedeutet „vom Dirigenten freigegeben zur Delegation", `approved` gilt nur auf Auftragsebene.
_Avoid_: Checkbox, Todo — das sind Darstellungen, nicht das Ding.

**Persona**:
Die zeitlose Person eines Ausführenden: Domänen-Doktrin, Kanten und Standard-Autorität, unabhängig von Modell und Stufe.
_Avoid_: Agent, Category, Role, Profile — die vermischen Persona, Kostenstufe und Lebensphase.

**Tier overlay (Tiefen-Overlay)**:
Ein Prompt-Anhang, der die Arbeitsweise einer Stufe bestimmt, ohne die Domänen-Persona zu verändern.
_Avoid_: Agent, Category, Tier-Prompt — die Stufe ist eine Eigenschaft der Route, kein eigener Musiker.

**Route**:
Die konkrete Besetzung eines Suborders: Persona, Stufe samt Modell, Risiko-Modifikator, optionale task-spezifische Fähigkeiten und Begründung.
_Avoid_: Delegation, Task, Category — die beschreiben Transport oder einen Katalogeintrag, nicht die Entscheidung.

**Evidence (Evidenz)**:
Ein unveränderlicher Nachweis, der einen Zustandswechsel oder Abschluss begründet; die zentrale Datei hält nur Zusammenfassung und Pfad.
_Avoid_: Claim, Status, Checkmark — die Darstellung ist nicht der Nachweis.

**Gate (Tor)**:
Eine Evidenz-Anforderung an einer Grenze des WorkOrder; ihre Anzahl hängt von der Klasse des Suborders ab.
_Avoid_: State, Phase, Approval — ein Tor verlangt Belege, es ist kein Lebenszyklus-Schritt.

**Preflight (Prüflauf)**:
Eine read-only Prüfung zwischen `approved` und `running`, die den WorkOrder gegen die Wirklichkeit des Projekts abgleicht.
_Avoid_: Review, Test — er prüft die Ausführbarkeit des Auftrags, nicht das Ergebnis der Arbeit.

**Blocked (Blockiert)**:
Zuerst ein State des Suborders; der ganze WorkOrder ist blockiert, sobald auf dem kritischen Pfad keine ausführbare Arbeit mehr übrig ist.
_Avoid_: Paused — pausiert ist eine bewusste Entscheidung, blockiert ist ein ungelöstes Hindernis.

**Conductor (Dirigent)**:
Der Orchestrator, der Absicht und Risiko verwaltet, Routen setzt und den kanonischen WorkOrder schreibt; er ist keine Persona.
_Avoid_: Lead-Agent, Worker — er spielt kein Instrument, er leitet.

**Adapter**:
Eine native OpenChamber-Mechanik, die einen Teil des WorkOrder-Lebenszyklus ausführt oder darstellt, ohne selbst das Domänenmodell zu bilden.
_Avoid_: Plugin, Engine — das Projekt baut keine eigene Ausführungsmaschine.
