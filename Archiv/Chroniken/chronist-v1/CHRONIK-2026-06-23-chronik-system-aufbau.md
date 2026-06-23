---
chronik_id: CHRONIK-2026-06-23-chronik-system-aufbau
datum: 2026-06-23
projekt: finanzwesir-code
thema: chronik-system-aufbau
beteiligte: [nutzer, claude]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, konzept-vs-umsetzung, vollstaendigkeit-vs-verdichtung, annahme-verworfen, tooling-problem, praezisierung-durch-gegenfrage]
---

# Chronik: Aufbau des Chronik-Systems

**Hauptgegenstand:** Der Faden begann mit dem Auftrag, aus drei vorliegenden LLM-Prompts einen optimalen Extraktions-Prompt für Faden-Chroniken zu legieren. Er wuchs schrittweise zu einem vollständigen Chronik-Subsystem für das Projekt Finanzwesir 2.0: Spezifikation, Prompt, Ablagestruktur, Migration des Altbestands, deterministische Validierung und ein Skill, eingebunden in die bestehende Projektsteuerung.

## Ausgangslage

Der Nutzer legte drei von verschiedenen LLMs erzeugte Prompts vor und beauftragte, daraus den besten zu legieren — nicht nach Urheber, sondern nach Qualität. Der Prompt wurde als systemkritisch bezeichnet: Die Qualität jeder späteren Analyse hänge an der Qualität der erzeugten Chroniken (Analogie zur Laborprobe). Vorgegeben war, das Thema durch vier Linsen zu betrachten: Advocatus Diaboli, Ockhams Rasiermesser, Via Negativa und Charlie Mungers „Invert, always invert". Ziel der Chroniken: spätere projektübergreifende Musteranalyse; bewertungsfrei, mit Erhalt der Irrwege.

## Chronologischer Verlauf

### Legierung des Prompts
Die drei Vorlagen wurden gelesen und zu einem Prompt zusammengeführt. Sichtbar gemacht und aufgelöst wurde ein Kernkonflikt: maximale Tiefe gegen die Gefahr, dass die Chronik selbst zu Rauschen wird. Entscheidung: strenge, operationalisierte Auswahlkriterien, aber adaptive Ausgabestruktur. Es entstand eine erste Endfassung mit Rollendefinition, König-und-Klo-Auswahlprinzip, Anti-Bias-Regeln und den vier Prüflinsen.

### Archivierung und maschinelle Lesbarkeit
Auf Nachfrage wurde geprüft, welche Vorlage eine Archivierungsbedingung enthielt (eine ganz, eine in stärkerer Form mit YAML, eine gar nicht). Daraus wurde ein Archiv-Leitfaden mit YAML-Frontmatter, kontrollierter Vokabel und einem zweistufigen Analyse-Workflow abgeleitet. Ein deterministisches Python-Skript zum Indexaufbau wurde ergänzt.

### Erste Workflow-Annahme und ihre Korrektur
Zunächst wurde ein eigenständiges System für ein leeres Projekt gebaut: Wurzelordner `chroniken/`, CSV-Index, CLAUDE.md-Regel, ein Einpflege-Befehl. Der Nutzer präzisierte den Wunsch nach einer rein deterministischen Prüfung per Python.

### Wendepunkt: der Projektkontext
Der Nutzer verwies auf das tatsächliche Projektverzeichnis und nacheinander auf `docs/steering`, `.claude/CLAUDE.md` und `.claude`. Sichtbar wurde ein stark geregeltes Projekt mit Verfassung, Archivstrategie, einem `/archivieren`-Skill und bereits existierenden „Projektchroniken". Daraufhin wurde das eigenständige Vorgehen gestoppt. Der Nutzer formulierte die Leitlinie, das System sensibel in den Bestand einzufügen statt es danebenzustellen.

### Konzeptphase
Erarbeitet wurde ein Drei-Schichten-Modell (Aktiv / Material-Beleg / Chronik) und die Definition: eine Chronik ist der Output des Chronik-Prompts. Festgelegt wurde der Standard `chronist-v1` (bewertungsfrei) und `legacy` für den Altbestand (auffindbar, Inhalt unangetastet, nur Frontmatter ergänzt). Die geschlossenen Listen wurden beschlossen; eine offene Schlagwortliste wurde verworfen, weil sie nicht gepflegt würde.

### Umsetzung in gegateten Schritten
Es entstanden nacheinander, jeweils mit Freigabe: `CHRONIK-SPEZIFIKATION.md` (SSoT), `CHRONIK-PROMPT.md` (geschlossene Vokabel inline, Dateinamen-Vorgabe) und ein laufend gepflegtes Einbinde-Dokument. Während der Spec-Arbeit wurde `arbeitsmodus` als Doublette zu `faden_typ` gestrichen.

### Prompt-Tests und Härtung
Beim ersten Praxistest stellte das ausführende LLM Rückfragen, statt eine Chronik zu erzeugen. Als Ursachen wurden nacheinander festgestellt: die ursprüngliche Übergabe ging von einem nach dem Prompt eingefügten Faden aus; danach behandelte das LLM den als Datei hochgeladenen Prompt als Diskussionsgegenstand; schließlich wandelte ChatGPT lange Texteinfügungen automatisch in eine Datei um. Der Prompt wurde entsprechend gehärtet (Gegenstand = vorausgehender Faden, „kein Diskussionsgegenstand", Trigger-Satz als Begleitnachricht). Die erste erzeugte Chronik bestand die Prüfung; dabei zeigte sich ein Fehler im Feld `beteiligte`, woraufhin dessen Semantik in Spec und Prompt nachgeschärft wurde: nur direkte Teilnehmer, das chronikführende LLM trägt sich selbst ein.

### Ablage und Migration
Der Ordner `Archiv/Chroniken/` konnte aus der Sandbox nicht angelegt werden; der Nutzer legte ihn an und wählte die Schreibweise mit großem C, woraus ein Casing-Abgleich folgte. Verschieben und Löschen auf dem Netzlaufwerk war aus der Sandbox nicht möglich; der Nutzer verschob vier Proto-Chroniken, das chronikführende LLM ergänzte das `legacy`-Frontmatter (best-effort klassifiziert), korrigierte ein `beteiligte` und zog die Verweise in `KAPITELRAHMEN.md` nach.

### Validierung und Einbindung
`validate_chronik.py` und der Skill `/chronik-check` wurden gebaut und in der Sandbox getestet. Da `.claude` für die Sandbox schreibgeschützt ist, kopierte der Nutzer beide Dateien. Das finalisierte Einbinde-Dokument wurde an Claude Code übergeben, das die Einbindung ausführte (NAVIGATION, Casing, `/archivieren`-Verzahnung) und eine Commit-Message lieferte.

### Audit und Skill-Erweiterung
Bei der Prüfung der Commit-Message wurde festgestellt, dass die `beteiligte`-Korrektur zweier OA-02-Dateien nicht zur jeweiligen Autorangabe im Dateitext passte; die Werte wurden auf das tatsächlich schreibende Modell gesetzt. Daraus folgte die Erweiterung des Validators um eine Heuristik (Autor-Signale im Text gegen `beteiligte`) und ein zugehöriger Abgleichschritt im Skill. Beides wurde getestet, kopiert und verifiziert.

## Wendepunkte

Der zentrale Wendepunkt war die Entdeckung des bestehenden, geregelten Projekts. Davor war das Ziel ein eigenständiges System; danach die Einbindung in das vorhandene föderierte Archivmodell und den `/archivieren`-Workflow.

Ein zweiter Wendepunkt war die Erkenntnis, dass die wiederholten Rückfragen des ausführenden LLM nicht aus dem Prompt-Inhalt stammten, sondern aus der Liefermethode (Faden-Position, Datei-Upload, automatische Dateiumwandlung).

Ein dritter Wendepunkt war der Befund im Audit, dass eine Feldkorrektur nicht zur Primärquelle im Dateitext passte.

## Entscheidungen und Festlegungen

- Chronik = Output des Chronik-Prompts. Status am Ende: gültig.
- Standard `chronist-v1` (bewertungsfrei); `legacy` für Altbestand. Gültig.
- Frontmatter mit geschlossenen Listen, inklusive `beteiligte` und `schlagworte`. Gültig.
- `faden_typ` als Einzelwert; `arbeitsmodus` gestrichen. Gültig.
- Apparat (Spec, Prompt) in `docs/steering/`; Chroniken in `Archiv/Chroniken/`. Gültig.
- Validierung: deterministisches Skript für Format, Skill-Schritt für Faktizität; kein Index zu Beginn. Gültig.
- `beteiligte` = nur direkte Faden-Teilnehmer; chronikführendes LLM trägt sich selbst ein. Gültig.

## Irrwege, Schleifen und verworfene Ansätze

Das zuerst gebaute eigenständige System (Wurzelordner, CSV-Index, CLAUDE.md-Regel, eigener Einpflege-Befehl) wurde nach Entdeckung des Projektkontexts nicht weiterverfolgt; Prompt und Validator-Idee wurden übernommen, die eigenständige Rahmung verworfen.

Die Übergabe-Logik des Prompts wurde dreimal überarbeitet (Faden-Position, Upload-Rahmung, automatische Dateiumwandlung).

Das Feld `beteiligte` durchlief drei Stände: zunächst alle erwähnten Modelle, dann ein durch eine Nutzerangabe gesetzter unzutreffender Wert, schließlich der zur Primärquelle passende Wert.

Beim Schreiben von `validate_chronik.py` über das Datei-Werkzeug trat zweimal eine Abschneidung am Dateiende auf; daraufhin wurde die Datei über ein Shell-Heredoc geschrieben.

## Erzeugte Artefakte

- `docs/steering/CHRONIK-SPEZIFIKATION.md` — Spezifikation (SSoT) — final.
- `docs/steering/CHRONIK-PROMPT.md` — Werkzeug-Prompt — final.
- `docs/steering/handovers/EINBINDE-PROMPT-CHRONIK-SYSTEM.md` — Übergabe an Claude Code — final.
- `Archiv/Chroniken/` — README, `chronist-v1/`, `legacy/` (4 migrierte Proto-Chroniken) — final.
- `.claude/skills/chronik-check/validate_chronik.py` + `SKILL.md` — Engine und Skill — final.
- Aktualisiert: `KAPITELRAHMEN.md`, `NAVIGATION.md`, `SKILL-ARCHIVIEREN-SPEZIFIKATION.md`, `BACKLOG.md` (Eintrag CHR-1).
- Im Cowork-Ausgabeordner verblieben frühere, später ersetzte Entwürfe (Archiv-Leitfaden, Einpflege-Setup, build_index.py, Taxonomie-Datei).

## Sachliche Erkenntnisse

- Im Faden wurde herausgearbeitet, dass der deterministische Validator das Format prüft, nicht die Faktizität; das Feld `beteiligte` braucht Abgleich gegen die Primärquelle.
- Es wurde sichtbar, dass die Liefermethode eines Prompts dessen Ausführung beeinflusst (Upload und automatische Dateiumwandlung erzeugen eine Dokument-Rahmung).
- Festgehalten wurde, dass die Cowork-Sandbox das Netzlaufwerk nicht über die Shell erreicht und dort keine Ordner anlegen oder Dateien löschen kann, und dass `.claude` schreibgeschützt ist.
- Als Arbeitsannahme entstand, dass geschlossene Listen Pflegeaufwand gegen eingeschränkte Musterbreite tauschen.

## Offene Punkte am Ende

- `CHR-1` (git-pre-commit-Hook + maschinenlesbarer Index) ist im Backlog vermerkt und zurückgestellt.
- Ein Eintrag für `Archiv/Chroniken/` in `legacy-map.md` wurde als optional zurückgestellt.
- Der abschließende Commit über das VSCode-Plugin stand am Fadenende noch aus.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Tooling- und Liefermethoden erzeugten mehrfach scheinbare Prompt-Fehler. Für spätere Musteranalyse vormerken: Plattformgrenzen zwischen Cowork und Claude Code führten zu einer Arbeitsteilung, bei der der Nutzer Verschiebungen und geschützte Schreibvorgänge übernahm. Für spätere Musteranalyse vormerken: eine explizite Vorgabe wurde ausgeführt und ein darin enthaltener Fehler propagierte, bis ein zweiter Blick gegen die Primärquelle ihn fand. Für spätere Musteranalyse vormerken: der Konflikt zwischen Vollständigkeit und Verdichtung trat wiederholt auf (Prompt-Länge, adaptive Struktur). Keine Bewertung im Rahmen dieser Chronik.

## Bewusst ausgelassen

Ausgelassen wurden Tool-Mechanik und Bedienrauschen, einzelne Stand-Zeilen-Aktualisierungen, Bestätigungen einzelner Datei-Edits, wiederholte Pfadangaben und Zwischenformulierungen, die später ersetzt wurden.
