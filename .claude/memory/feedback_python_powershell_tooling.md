---
name: feedback-python-powershell-tooling
description: "Python für Datei-Inhalte, PowerShell für Dateisystem/Git — locale-Determinismus"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 1096ca96-7ab3-44d8-a6e6-a402e1cd02aa
---

Python-Tool: für Dateiinhalt-Verarbeitung (CSV-Parsing, XLS/XLSX, Datentransformation, Textanalyse). PowerShell-Tool: für Dateisystem-Operationen (Verzeichnisse, Dateibewegungen) und Git-Kommandos.

**Why:** PowerShell COM ist locale-abhängig und nicht deterministisch. Python-Libraries (xlrd, openpyxl, csv) liefern auf jedem Rechner gleichen Output. Zweimal falsch gewählt (Distill 6, 2026-06-05, 2 Belege PREF).

**How to apply:** Entscheidungsbaum: Ich verarbeite Datei-Inhalt (lesen, parsen, validieren) → Python. Ich verwalte Dateisystem oder Git → PowerShell. Bei XLS/XLSX/CSV-Verarbeitung immer Python vorschlagen. Grenzfall (Datei lesen und Ergebnis weiterverwenden) → Python.

Windows-spezifisch: Bash-Kommando `python3` existiert nicht im Repo-Kontext (ergibt Windows-Store-Umleitung). Immer `python` verwenden, nicht `python3`. Betrifft alle Bash-Tool-Aufrufe.
