---
name: feedback-python-powershell-tooling
description: Python für Datei-Inhalte, PowerShell für Dateisystem/Git — nie verwechseln
metadata:
  type: feedback
---

Python-Tool: für Dateiinhalt-Verarbeitung (CSV-Parsing, Datentransformation, Textanalyse). PowerShell-Tool: für Dateisystem-Operationen (Verzeichnisse, Dateibewegungen) und Git-Kommandos.

**Why:** Zweimal falsch gewählt (Distill 6, 2026-06-05, 2 Belege PREF). Tooling-Fehler kostet Zeit und erzeugt Verwirrung im Tool-Call-Log.

**How to apply:** Entscheidungsbaum: Ich verarbeite Datei-Inhalt → Python (oder Bash). Ich verwalte Dateisystem oder Git → PowerShell. Grenzfall Datei lesen und Ergebnis weiterverwenden → Python.
