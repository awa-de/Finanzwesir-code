---
name: feedback-arbeitsweise
description: "Alberts Arbeitsstil — sachlich-direkt, primitiver Dev-Workflow, Freigabe vor Aktionen"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 0fd05277-e14f-422d-8957-b5b840771a53
  modified: 2026-07-20T08:46:07.362Z
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

## Exakte Verhaltensbeschreibung statt generischer Labels

Albert bevorzugt bei Testdaten/Verhalten die exakte Beschreibung des tatsächlichen, gewollten Zustands gegenüber generischen Erwartungslabels (AP-prokrast-16c, 2026-07-09: „Pie hat keinen Tooltip, sondern Center-Text bei Segment-Hover" statt einer generischen Tooltip-Erwartung) — und stellt dazu bei Bedarf gezielt konkrete Bestandsdateien bereit, statt abstrakt zu beschreiben was gebraucht wird.

**How to apply:** Bei Doku-/Testfall-Formulierungen die tatsächliche, spezifische Semantik beschreiben, nicht das naheliegende generische Label übernehmen. Wenn Albert eine konkrete Datei nennt: die als Faktenbasis nehmen, nicht durch eine Annahme ersetzen.

## Begründete Einschätzung bei CLAUDE.md-Regelfragen

Bei Fragen zu CLAUDE.md-Regeln (neue Regel sinnvoll? bestehende Regel anpassen?) eine begründete eigene Einschätzung liefern, inklusive Einordnung gegen die offizielle Anthropic-CLAUDE.md-Guidance — nicht nur eine neutrale Pro/Contra-Liste ohne Empfehlung (2026-07-13).

**How to apply:** Bei Meta-Fragen zur Steuerungsdatei-Architektur selbst Stellung beziehen und die eigene Empfehlung gegen bekannte externe Best-Practice-Guidance einordnen, statt nur Optionen aufzuzählen.
