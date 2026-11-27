---
status: accepted
---

# WorkOrder als kanonisches Artefakt

Wir haben uns entschieden, den **Auftrag (WorkOrder) als einziges kanonisches Artefakt** zu führen und OpenChambers native Mechanismen (Leads, Goals, Knowledge, Memory, Workflows, Worktrees) als Adapter zu behandeln. Der Grund: Die ursprüngliche Planung hatte Plan-Datei, Knowledge-Todos, Memory-Routing-Log und Goal-Metadaten als parallele Wahrheiten mit Konventionen zur Synchronisation — jede neue Plattform-Funktion wurde zum neuen Flick.

Betrachtet wurden: (a) native OpenChamber-Zustände als Wahrheit, (b) mehrere spezialisierte Artefakte (Draft, Plan, Laufzeit-State) nach OmOs Vorbild, (c) ein WorkOrder-Artefakt mit Zustands-Protokollen. Wir wählen (c): eine Datei, die in ihren Zuständen weitergeschrieben wird; native Mechanismen führen aus oder stellen dar, bestimmen aber nicht das Modell.

Konsequenzen: Der Dirigent ist der einzige Schreiber des Artefakts; Subagenten liefern unveränderliche Evidenz-Dateien. Knowledge-Todos sind eine Projektion, Memory hält nur den Routing-Verlauf, das Goal bewacht den Ausführungs-Lauf. Ein Fortschritt ohne Evidenz ist unmöglich — nicht weil wir es verbieten, sondern weil der Übergang im Artefakt den Nachweis braucht.
