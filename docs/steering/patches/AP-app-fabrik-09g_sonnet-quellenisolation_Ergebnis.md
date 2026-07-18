Stand: 2026-07-18 15:00 | Session: AP-app-fabrik-09g | Geändert von: Claude

# AP-app-fabrik-09g — Sonnet-Quellenisolation dauerhaft absichern — Ergebnis

Status: **GRÜN**.

Ziel: Verhindern, dass Sonnet bei künftigen Mockup-Duellen fremde Mockups/Psychosprints/App-Werkstätten als Scaffold oder Referenz liest — sowohl per Vorlagentext als auch deterministisch im Werkzeug.

## Exakter Diff-Vergleich

**1. `AP-app-fabrik-09_mockup-duell-sonnet_VORLAGE.md` (geändert, +1 Abschnitt)**
- Direkt nach „## Pflichtquellen — nur diese" (Liste 1–7) neu eingefügt: `## Quellensperre — Harter Stop` mit dem verbindlichen Wortlaut (Quellenliste abschließend; Verbot jedes Lesens/Suchens/Kopierens von `tests/scratch/<anderer-slug>/` inkl. fertiger Mockups/Psychosprints/READMEs/Scaffolds; fremde Mockups nie Scaffold/Referenz; erlaubt nur die gelisteten Einzeldateien der aktuellen App + `tests/scratch/README.md`; fehlt eine allgemeine Quelle → stoppen und auf Albert warten, nie eine Fremd-App als Ersatz; Quellenscope vor dem ersten Lesen bestätigen). Position bestätigt: Zeile 25, zwischen „Pflichtquellen" (15) und „Schreibscope" (35). Keine weitere Vorlagenregel geändert.

**2. `tools/app-fabrik-psychosprint.py` (geändert, chirurgisch, `# NEW`-markiert)**
- Neue Konstante `SONNET_QUELLENSPERRE_MARKER = "## Quellensperre — Harter Stop"`.
- `cmd_sonnet`: nach dem Einlesen der Sonnet-Vorlage und **vor jeder Ausgabe** — Marker vorhanden → normal fortfahren; Marker fehlt → `FAIL` und Abbruch (`return 1`), es wird weder `SONNET_EINGABEPAKET.md` noch `SONNET_AUFTRAG.md` geschrieben.
- `--self-test`: Sonnet-Stub trägt den Marker; nach `cmd_sonnet(..., write=True)` wird geprüft, dass der erzeugte `SONNET_AUFTRAG.md` den Marker enthält; zusätzlicher Negativ-Minimaltest mit marker-loser Vorlage bricht mit `FAIL` ab und erzeugt keine Sonnet-Ausgabe.
- Keine neue Bibliothek, kein Refactoring; Psychosprint- und Grok-Logik unverändert (Validierung, Anonymisierung A=Sol/B=Fable, SHA-256, Nicht-Überschreiben, Root-Schutz, UTF-8, Exit-Codes unangetastet).

**3. Diese Ergebnisdatei (neu angelegt).**

## Positiv- und Negativnachweis

- **Positiv:** `--self-test` → `SELF-TEST OK` (Exit 0). Der erzeugte `SONNET_AUFTRAG.md` enthält den Quellensperre-Marker (Self-Test-Assertion). Dry-Run `sonnet-paket --slug depot-kipppunkt` → Validierung grün, nennt ausschließlich `tests/scratch/depot-kipppunkt/mockup-duell/SONNET_EINGABEPAKET.md` und `…/SONNET_AUFTRAG.md`, kein Schreiben (Exit 0). Dass der Dry-Run grün ist, beweist zugleich, dass die reale Vorlage den Marker trägt (sonst würde `cmd_sonnet` abbrechen).
- **Negativ (aus dem Self-Test):** Mit einer Vorlage ohne Marker bricht `cmd_sonnet` mit `FAIL` ab; es entsteht weder `SONNET_AUFTRAG.md` noch `SONNET_EINGABEPAKET.md`.

## Scope-QA

- Genau 3 Dateien berührt (2 geändert, 1 neu). Tool whitespace-frei; durch den Python-Lauf entstandenes `tools/__pycache__/` entfernt.
- `tests/scratch/depot-kipppunkt/` unverändert (kein Write; Struktur `README.md`, `SONNET_AUFTRAG.md`, `SONNET_EINGABEPAKET.md`, `a-sol/`, `b-fable/` intakt).
- Nicht geändert: Apps/Theme/Engine/Daten/Build/Produktionscode, `MOCKUP-VERTRAG.md`, `APP_FACTORY_STARTLINIE.md`, Psychosprint-/Grok-/sonstige Vorlagen, bestehende Ergebnisdateien.

## Verbindliche Aussage

Künftige Sonnet-Aufträge dürfen keine andere App-Werkstatt als Scaffold oder Referenz lesen. Fehlt eine allgemeine Quelle, stoppen sie vor dem Bau.

## Patch-Quittung

- Geänderte/angelegte Dateien: genau 3
- Scope-QA: grün
- Alle Dateien nach Write real wiedergelesen: ja
- Keine App-, Theme-, Engine-, Daten-, Test- oder Produktionsdatei geändert: ja
