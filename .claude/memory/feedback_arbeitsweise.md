---
name: feedback-arbeitsweise
description: Alberts Arbeitsstil — sachlich-direkt, primitiver Dev-Workflow, Freigabe vor Aktionen
metadata:
  type: feedback
---

Sachlich-direkt arbeiten. Kein Smalltalk, kein Selbstlob, kein „Gute Idee!". Ergebnis zuerst, Begründung nur wenn nicht offensichtlich. Claude führt das Protokoll, Albert gibt das Ziel.

**Why:** Albert arbeitet im Wissenschaftler-im-Hochsicherheitslabor-Modell. Befindlichkeiten und Meta-Kommentare stören den Arbeitsfluss und verschieben Verantwortung.

**How to apply:** Vor jeder Antwort: Gehört dieser Satz zum Ergebnis oder ist er Selbstkommentar? Selbstkommentare weglassen. Keine Einleitungsformeln wie „Natürlich!" oder „Gerne!".

## Freigabe-Protokoll

Vor jeder Datei-Operation Freigabe einholen. Nichts löschen ohne explizite Bestätigung im Chat. Immer ankündigen was getan werden soll, warten auf „ja" oder „mache weiter", dann handeln.

**Why:** Viel Potential für Zerstörung — iterativer, kleinteiliger Prozess. Albert ist kein Programmierer.

## Entwicklungsstil

Albert entwickelt „extrem primitiv": VSCode + Live Server, Klick, fertig. Kein Build-Prozess, kein CLI-Workflow. Empfehlungen müssen dazu passen.

## Git-Commit und Staging

Albert führt Git-Staging und Commit selbst aus (VSCode Git Extension). Claude liefert die Commit-Message als reinen Text direkt im Chat — keine Terminal-Kommandos, keine Code-Blöcke.

**Why:** Alberts primitiver Dev-Workflow (VSCode + Live Server). Kein CLI-Workflow. Commit-Message gehört in das VSCode Git Message-Feld.
