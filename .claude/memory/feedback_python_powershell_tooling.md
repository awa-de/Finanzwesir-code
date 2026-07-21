---
name: feedback-python-powershell-tooling
description: "Python für Datei-Inhalte, PowerShell für Dateisystem/Git — locale-Determinismus; cmd.exe-Aufrufe über Bash-Tool brauchen MSYS_NO_PATHCONV=1 + gequotete UNC-Pfade"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 1096ca96-7ab3-44d8-a6e6-a402e1cd02aa
  modified: 2026-07-21T20:51:34.952Z
---

Python-Tool: für Dateiinhalt-Verarbeitung (CSV-Parsing, XLS/XLSX, Datentransformation, Textanalyse). PowerShell-Tool: für Dateisystem-Operationen (Verzeichnisse, Dateibewegungen) und Git-Kommandos.

**Why:** PowerShell COM ist locale-abhängig und nicht deterministisch. Python-Libraries (xlrd, openpyxl, csv) liefern auf jedem Rechner gleichen Output. Zweimal falsch gewählt (Distill 6, 2026-06-05, 2 Belege PREF).

**How to apply:** Entscheidungsbaum: Ich verarbeite Datei-Inhalt (lesen, parsen, validieren) → Python. Ich verwalte Dateisystem oder Git → PowerShell. Bei XLS/XLSX/CSV-Verarbeitung immer Python vorschlagen. Grenzfall (Datei lesen und Ergebnis weiterverwenden) → Python.

Windows-spezifisch: Bash-Kommando `python3` existiert nicht im Repo-Kontext (ergibt Windows-Store-Umleitung). Immer `python` verwenden, nicht `python3`. Betrifft alle Bash-Tool-Aufrufe.

## Deterministisch-vor-LLM (Arbeitsteilung, geschärft 2026-07-14)

Wenn eine Aufgabe deterministisch mit Python lösbar ist → **Python**, nicht LLM. Billiger, besser, verifizierbar. LLM erst dort, wo es ums Nachdenken/Bewerten geht (echte Grenzfälle, Urteil). Albert zweimal explizit betont.

**Why (Beleg):** Bei der Vault-Auflösung fand der Python-Hash-Dedup, dass 52 (nicht 14) Dateien byte-identisch schon im Ziel/Archiv lagen — ein LLM-Plan (Haiku-Zusammenfassung) hätte 35 bereits archivierte Dateien erneut archiviert. Reine Hash-Arithmetik statt Modell-Urteil. Gegenbeleg vorher: der Haiku-Subagent lieferte beim Blogpost-Matching generische Textbausteine + Zählfehler, wo Bewertung nötig war — die Mechanik (Wortgrenzen-Scan, Hash-Vergleich) lief dagegen fehlerfrei.

**How to apply:** Vor jedem LLM-Dispatch fragen: „Ist das deterministisch (Zählen, Hashen, Vergleichen, Filtern, Extrahieren)?" → dann Python-Skript. LLM/Subagent nur für Inhalts-Bewertung, Zuordnungs-Urteile, Textproduktion. Verwandt: [[subagent-model-override-gilt-nicht]].

## cmd.exe über das Bash-Tool: MSYS-Pfadmangling + UNC-Quoting (2026-07-21)

Ein `cmd.exe /c "..."`-Aufruf über das Bash-Tool (Git Bash/MSYS) zeigte nur den cmd-Startbanner statt der erwarteten Ausgabe — kein Fehler, aber auch kein Ergebnis. Ursache: MSYS wandelt `/c`-artige Argumente automatisch in Windows-Pfade um, wodurch `cmd.exe` das `/c`-Flag nicht mehr erkennt und interaktiv startet.

**Why:** Zweimal reproduziert (`cmd /c "echo ..."`, dann `cmd /d /c "pushd \\NAS-... && node ..."`), beide Male löste `MSYS_NO_PATHCONV=1` vorangestellt das Problem. Zusätzlich schlug ein UNC-Pfad mit Leerzeichen (`\\NAS-DATENGRAB\...\Finanzwesir 2.0`) ohne umschließende Anführungszeichen um den GESAMTEN Pfad mit „Pfad nicht gefunden" fehl, obwohl der Share laut `net use` korrekt gemountet war.

**How to apply:** Jeden `cmd.exe`/`cmd /c`/`cmd /d /c`-Aufruf über das Bash-Tool mit vorangestelltem `MSYS_NO_PATHCONV=1` ausführen. Bei UNC-Pfaden mit Leerzeichen den gesamten Pfad in escaped double quotes setzen (`\"\\\\SERVER\Pfad mit Leerzeichen\"`), nicht nur einzelne Segmente. Vor „Pfad nicht gefunden"-Fehlern bei bereits gemounteten Netzlaufwerken erst `net use` prüfen, bevor an der Erreichbarkeit des Shares gezweifelt wird.
