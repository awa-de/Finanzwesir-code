# AP-21 — Review Sonderbatch D ohne plan-generator mit Seed-Provenienz-Abgleich — Ergebnis

## Status

Status: GRÜN
Blocker: nein

## Kurzbefund

Unabhängige Prüfung ohne Übernahme der AP-20b-Selbstauskunft: Alle 4 Ziel-MINI_SPECs (`etf-vergleich`, `investment-universum`, `rollierende-sparplaene`, `weltkarte-etf-indizes`) enthalten genau einen Steuerungsblock, genau einen APP_SPEC-Stoppwarnhinweis und die STOP-Regel. Der harte Seed-Provenienz-Abgleich bestätigt bidirektional: Jede inhaltliche Zeile des eingefügten Steuerungsblocks ist wortgleich in `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` (app-spezifischer Block oder gemeinsamer LLM-Prüfscore-Abschnitt §2.1) nachweisbar, und umgekehrt findet sich im Zielblock keine Zeile, die nicht aus Seed, Score-Abschnitt oder den Tool-eigenen Markern stammt. Keine freie Umformulierung, keine blockfremde Quelle. `plan-generator` und die Seed-Datei tauchen in keinem Diff auf.

## Ausgangspunkt

Vorgänger: AP-20b
AP-20b-Status: GRÜN

Review-Gegenstand:

- etf-vergleich
- investment-universum
- rollierende-sparplaene
- weltkarte-etf-indizes

Ausgeschlossen:

- plan-generator (nicht gelesen, nicht geöffnet — nur Diff-/Status-Prüfung)

## Quellenklärung

MINI_SPEC-Kopfquelle und Steuerungsblock-Quelle wurden getrennt bewertet:

- MINI_SPEC-Kopfquelle (`> Quelle: docs/App-Fabrik/ETF-Apps-Hauptdokument.md`, sofern vorhanden) beschreibt die Herkunft der ursprünglichen MINI_SPEC — nicht Gegenstand dieses Reviews.
- Steuerungsblock-Quelle wurde ausschließlich gegen `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` geprüft.
- Dass die Seed-Datei nicht im Git-Diff auftaucht, wurde nicht als Beweis für korrekte Herkunft gewertet, sondern nur als „Seed-Datei unverändert". Der eigentliche Herkunftsnachweis erfolgte über zeilengetreuen Textabgleich (siehe Seed-Provenienz-Abgleich unten), nicht über das Diff-Argument.

## Vorprüfung / Git-Baseline

```text
git status --short (vor AP-21-Schreibvorgang):
 M .claude/learning/session-log.md
 M Apps/etf-vergleich/MINI_SPEC_FROM_HAUPTDOKUMENT.md
 M Apps/investment-universum/MINI_SPEC_FROM_HAUPTDOKUMENT.md
 M Apps/rollierende-sparplaene/MINI_SPEC_FROM_HAUPTDOKUMENT.md
 M Apps/weltkarte-etf-indizes/MINI_SPEC_FROM_HAUPTDOKUMENT.md
?? docs/steering/patches/AP-20_steuerungsblock-rollout_sonderbatch-d_appspec-stoppwarnung_Ergebnis.md
?? docs/steering/patches/AP-20b_steuerungsblock-rollout_sonderbatch-d-ohne-plan-generator_Ergebnis.md

git log --oneline -5:
fe7747d docs(AP-16/17/18): Steuerungsblock-Rollout Batch C + Memory-Integritätsfixes
ef4d6c8 docs(AP-14h/i): regulatorik-dashboard MINI_SPEC aus Seed neu gefasst
a2ddfeb docs(AP-14f/g): regulatorik-dashboard Identitätsanamnese + Seed-Fundament
83b3e2a docs(AP-14b-e): regulatorik-dashboard Arbeitsordner bereinigt
83d0df6 docs(AP-14a): regulatorik-dashboard Drift-Schutz-Inventar und Materialdiagnose
```

- Laut Git vorhanden: 4 modifizierte MINI_SPECs, 2 neue (untracked) Ergebnisprotokolle (AP-20, AP-20b) sowie `session-log.md`.
- Laut AP-20b stammend aus Sonderbatch D ohne plan-generator: die 4 MINI_SPECs + AP-20b-Protokoll selbst.
- Laut AP-20b bereits vor AP-20b vorhanden: `.claude/learning/session-log.md` (Session-Start, außerhalb des Rollouts) und das AP-20-Protokoll (Vorgänger-AP, GELB, kein Write).
- Unerwartete Änderungen an nicht erlaubten Dateien: keine. `plan-generator` und die Seed-Datei tauchen in keinem Status-/Diff-Eintrag auf.

## Gelesene Quellen

- `docs/steering/patches/AP-20b_steuerungsblock-rollout_sonderbatch-d-ohne-plan-generator_Ergebnis.md`
- `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` (Kopfteil, alle 4 relevanten Seed-Blöcke sowie §2.1 LLM-Prüfscore)
- `Apps/etf-vergleich/MINI_SPEC_FROM_HAUPTDOKUMENT.md` (vollständig)
- `Apps/investment-universum/MINI_SPEC_FROM_HAUPTDOKUMENT.md` (vollständig)
- `Apps/rollierende-sparplaene/MINI_SPEC_FROM_HAUPTDOKUMENT.md` (vollständig)
- `Apps/weltkarte-etf-indizes/MINI_SPEC_FROM_HAUPTDOKUMENT.md` (vollständig)

`plan-generator` wurde nicht gelesen (Nicht-Ziel dieses AP, nur Status-/Diff-Prüfung durchgeführt).

## Marker-, Warnhinweis- und STOP-Regel-QA

| App | Steuerungsblock genau 1× | LLM-Prüfung vorhanden | Warnhinweis genau 1× | STOP-Regel vorhanden | Ergebnis |
|---|---:|---:|---:|---:|---|
| etf-vergleich | 1 | ja | 1 | ja | GRÜN |
| investment-universum | 1 | ja | 1 | ja | GRÜN |
| rollierende-sparplaene | 1 | ja | 1 | ja | GRÜN |
| weltkarte-etf-indizes | 1 | ja | 1 | ja | GRÜN |

## Seed-Provenienz-Abgleich

Vorwärtsrichtung (Seed → Ziel): app-spezifischer Seed-Block nach Entfernung der bewusst nicht übertragenen Seed-Verwaltungsfelder (`Status:`, `Verteilungsstatus:`, `Klärungsbedarf vor Verteilung:` inkl. Unterpunkte — exakt die Felder, die auch `tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py::remove_seed_management_fields` entfernt) gegen den eingefügten Zielblock (Bereich zwischen Steuerungsblock- und Warnhinweis-Marker) abgeglichen.

| App | Seed-Block vorhanden | Seed-Zeilen wortgleich im Ziel | LLM-Prüfscore-Zeilen wortgleich im Ziel | Freie Umformulierung erkennbar | Blockfremde Quelle erkennbar | Ergebnis |
|---|---:|---:|---:|---:|---:|---|
| etf-vergleich | ja | 21/21 | 18/18 | nein | nein | GRÜN |
| investment-universum | ja | 19/19 | 18/18 | nein | nein | GRÜN |
| rollierende-sparplaene | ja | 19/19 | 18/18 | nein | nein | GRÜN |
| weltkarte-etf-indizes | ja | 19/19 | 18/18 | nein | nein | GRÜN |

Rückwärtsrichtung (Ziel → Seed, Fremdinhalts-Check): für jede der 4 Apps wurde geprüft, ob der Zielblock Zeilen enthält, die weder im app-spezifischen Seed-Block noch im LLM-Prüfscore-Abschnitt noch unter den Tool-eigenen Markern (Überschrift, HTML-Kommentare, Trenner `---`) vorkommen. Ergebnis: 0 nicht erklärbare Zeilen bei allen 4 Apps. Damit ist ausgeschlossen, dass Inhalte aus einer anderen Quelle (HTML, Altmaterial, freie Formulierung) in den Steuerungsblock gelangt sind.

Die einzigen bei einer ersten Abgleichsrunde „fehlenden" Seed-Zeilen waren die jeweiligen Bullet-Punkte unter `**Klärungsbedarf vor Verteilung:**` (z. B. bei etf-vergleich: „D4-Mini-Spec ist reich; vor Verteilung gesondert prüfen."). Das ist kein Provenienz-Fehler, sondern korrektes, beabsichtigtes Verhalten: Diese Sektion ist laut Tool-Docstring und den `NEGATIVE_MARKERS` explizit seed-only und darf nicht in den lokalen Block übernommen werden. Nach Ausschluss dieser Sektion (identisch zur Tool-Logik) ergibt sich für alle 4 Apps 100 % Übereinstimmung.

## Scope- und Diff-QA

```text
git status --short (nach AP-21, vor Schreiben dieses Protokolls):
 M .claude/learning/session-log.md
 M Apps/etf-vergleich/MINI_SPEC_FROM_HAUPTDOKUMENT.md
 M Apps/investment-universum/MINI_SPEC_FROM_HAUPTDOKUMENT.md
 M Apps/rollierende-sparplaene/MINI_SPEC_FROM_HAUPTDOKUMENT.md
 M Apps/weltkarte-etf-indizes/MINI_SPEC_FROM_HAUPTDOKUMENT.md
?? docs/steering/patches/AP-20_steuerungsblock-rollout_sonderbatch-d_appspec-stoppwarnung_Ergebnis.md
?? docs/steering/patches/AP-20b_steuerungsblock-rollout_sonderbatch-d-ohne-plan-generator_Ergebnis.md
```

- `Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md`: nicht im Status/Diff — unverändert.
- `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md`: nicht im Status/Diff — unverändert.
- Keine `APP_SPEC.md`, keine `.html`-Datei im Status/Diff.
- Keine bereits erledigten Batch-A-/Batch-B-/Batch-C-/Sonderfall-MINI_SPECs im Status/Diff.
- AP-21 selbst hat bis zu diesem Punkt keine Datei außer diesem Ergebnisprotokoll neu angelegt.

## Datei-Wahrheit

Alle 4 Ziel-MINI_SPECs wurden vollständig aus der realen Datei gelesen (nicht aus dem AP-20b-Protokoll übernommen). Steuerungsblock- und Warnhinweis-Struktur wie in AP-20b berichtet bestätigt: genau ein Steuerungsblock, genau ein Warnhinweis, beide unmittelbar vor der ursprünglichen ersten Fachsektion, kein Doppel, keine Fremdüberschrift dazwischen.

## Bewertung

### GRÜN-Kriterien

- alle 4 Ziel-MINI_SPECs vorhanden und vollständig gelesen — erfüllt
- je Ziel-MINI_SPEC genau 1 Steuerungsblock-Marker — erfüllt
- je Ziel-MINI_SPEC LLM-Prüfung vorhanden — erfüllt
- je Ziel-MINI_SPEC genau 1 APP_SPEC-Stoppwarnhinweis — erfüllt
- je Ziel-MINI_SPEC STOP-Regel vorhanden — erfüllt
- app-spezifischer Seed-Block aus `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` je App nachgewiesen — erfüllt
- relevante Seed-Zeilen je App wortgleich im Ziel gefunden (21/21, 19/19, 19/19, 19/19) — erfüllt
- LLM-Prüfscore-Zeilen je App wortgleich im Ziel gefunden (18/18 je App) — erfüllt
- keine freie Umformulierung erkennbar — erfüllt
- keine blockfremde Quelle erkennbar (0 nicht erklärbare Zeilen je App) — erfüllt
- plan-generator unverändert — erfüllt
- Seed-Datei nicht geändert — erfüllt
- keine APP_SPEC geändert, keine HTML-Datei geändert — erfüllt
- AP-21 hat nur dieses Ergebnisprotokoll geschrieben — erfüllt

Alle GRÜN-Kriterien erfüllt.

### GELB-Gründe, falls zutreffend

Keine.

### ROT-Gründe, falls zutreffend

Keine.

## Nächster richtiger AP

Bei GRÜN (dieser Fall): Commit-/Abschluss-AP für AP-20/AP-20b/AP-21 — anschließend AP-22 als eigener, separater Klärungs-AP für die `plan-generator`-Seed-Sperre.

## Später separat

AP-22 — Klärung plan-generator Seed-Sperre

## Ausdrücklich nicht nächster AP

- APP_SPEC
- App-Bau
- HTML-Analyse
- AP-14j
