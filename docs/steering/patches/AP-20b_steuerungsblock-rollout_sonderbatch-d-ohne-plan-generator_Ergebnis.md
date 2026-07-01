# AP-20b — Sonderbatch D ohne plan-generator: Steuerungsblock + APP_SPEC-Stoppwarnung — Ergebnis

## Status

Status: GRÜN
Blocker: nein

## Kurzbefund

Die 4 verteilungsreifen Sonderbatch-D-Apps (`etf-vergleich`, `investment-universum`, `rollierende-sparplaene`, `weltkarte-etf-indizes`) wurden je mit einem Steuerungsblock aus der Seed-Datei und einem APP_SPEC-Stoppwarnhinweis angereichert. Dry-run war für alle 4 Apps vollständig GRÜN, Write erfolgte, Wiederlesen bestätigt genau je einen Steuerungsblock-Marker und genau einen Warnhinweis-Marker inklusive STOP-Regel. `plan-generator` wurde nicht gelesen, nicht geöffnet und nicht verändert. Die Seed-Datei blieb unverändert.

## Ausgangspunkt

Befundanker: AP-16, AP-17, AP-18, AP-20
AP-20-Status: GELB

Grund für AP-20b:

- `plan-generator` ist laut Seed GESPERRT und bleibt ausgeschlossen.
- Die anderen 4 Apps waren in AP-20 mechanisch und inhaltlich GRÜN.
- Der Nutzer hat entschieden, `plan-generator` herauszulösen und die 4 grünen Apps separat zu schreiben. (Hinweis: Im AP-20-Ergebnisprotokoll wurde an einer Stelle „Alberts Entscheidung" formuliert — das ist ein Nutzer-Referenzfehler dieser Session, kein fachlicher Befund. Für AP-20b gilt: die Entscheidung trifft der Nutzer, der Name ist nicht relevant. Kein eigener Fix-AP dafür nötig.)

Ziel-Apps:

- etf-vergleich
- investment-universum
- rollierende-sparplaene
- weltkarte-etf-indizes

Ausgeschlossen:

- plan-generator

Arbeitsentscheidung:

- Seed-Blöcke wurden für die 4 Ziel-Apps integriert.
- Rollenunsicherheit wurde nicht final geklärt.
- Jede Ziel-MINI_SPEC erhielt zusätzlich einen APP_SPEC-Stoppwarnhinweis.
- `plan-generator` wird separat in AP-22 oder später geklärt.

## Vorprüfung / Git-Baseline

```text
git status --short (vor AP-20b-Write):
 M .claude/learning/session-log.md
?? docs/steering/patches/AP-20_steuerungsblock-rollout_sonderbatch-d_appspec-stoppwarnung_Ergebnis.md

git log --oneline -5:
fe7747d docs(AP-16/17/18): Steuerungsblock-Rollout Batch C + Memory-Integritätsfixes
ef4d6c8 docs(AP-14h/i): regulatorik-dashboard MINI_SPEC aus Seed neu gefasst
a2ddfeb docs(AP-14f/g): regulatorik-dashboard Identitätsanamnese + Seed-Fundament
83b3e2a docs(AP-14b-e): regulatorik-dashboard Arbeitsordner bereinigt
83d0df6 docs(AP-14a): regulatorik-dashboard Drift-Schutz-Inventar und Materialdiagnose

git diff --name-status (vor AP-20b-Write, nur getrackte Dateien):
M	.claude/learning/session-log.md
```

- Vor AP-20b bereits dirty/untracked: `.claude/learning/session-log.md` (Session-Start, außerhalb AP-20b) sowie das AP-20-Ergebnisprotokoll (aus der vorherigen AP-20-Session, ebenfalls außerhalb AP-20b).
- Durch AP-20b neu verändert: die 4 Ziel-MINI_SPECs (Steuerungsblock + Warnhinweis) und dieses Ergebnisprotokoll.
- Unerwartete Änderungen an nicht erlaubten Dateien: keine. `plan-generator` und die Seed-Datei tauchen in keinem Diff auf.

## Gelesene Quellen

- `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` (bereits in AP-20 vollständig gelesen, in AP-20b nur zur Bestätigung der 4 relevanten Seed-Blöcke erneut über das Tool verwendet)
- `Apps/etf-vergleich/MINI_SPEC_FROM_HAUPTDOKUMENT.md`
- `Apps/investment-universum/MINI_SPEC_FROM_HAUPTDOKUMENT.md`
- `Apps/rollierende-sparplaene/MINI_SPEC_FROM_HAUPTDOKUMENT.md`
- `Apps/weltkarte-etf-indizes/MINI_SPEC_FROM_HAUPTDOKUMENT.md`
- `docs/steering/patches/AP-20_steuerungsblock-rollout_sonderbatch-d_appspec-stoppwarnung_Ergebnis.md`

`plan-generator` wurde nicht gelesen (Nicht-Ziel dieses AP).

## Gefundene bestehende Tools / Protokolle

`tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py` (aus AP-12b, bereits in AP-17 für Batch C und in AP-20 für den Dry-run von Sonderbatch D verwendet) wurde für den Steuerungsblock-Teil direkt wiederverwendet:

```bash
python tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py --slugs etf-vergleich,investment-universum,rollierende-sparplaene,weltkarte-etf-indizes
python tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py --slugs etf-vergleich,investment-universum,rollierende-sparplaene,weltkarte-etf-indizes --write
```

Für den APP_SPEC-Stoppwarnhinweis existiert kein bestehendes Tool. Dafür wurde ein temporäres, nicht dauerhaft im Repo abgelegtes Python-Skript verwendet (Anker-Logik: ab dem Steuerungsblock-Marker vorwärts scannen bis zur nächsten `##`/`###`-Überschrift, dort einfügen). Kein neues Tool-File wurde im Repo angelegt.

## Dry-run-Ergebnis

| App | Seed-Block eindeutig | Ziel ohne Steuerungsblock | Warnhinweis noch nicht vorhanden | Einfügestellen eindeutig | Dry-run Status | Begründung |
|---|---:|---:|---:|---:|---|---|
| etf-vergleich | ja | ja | ja | ja (Steuerungsblock vor Zeile 26, Warnhinweis vor Zeile 88) | GRÜN | Vollständiger, inhaltlich echter Seed-Block, bereits in AP-20 inhaltlich verifiziert |
| investment-universum | ja | ja | ja | ja (Steuerungsblock vor Zeile 13, Warnhinweis vor Zeile 73) | GRÜN | wie oben |
| rollierende-sparplaene | ja | ja | ja | ja (Steuerungsblock vor Zeile 14, Warnhinweis vor Zeile 74) | GRÜN | wie oben |
| weltkarte-etf-indizes | ja | ja | ja | ja (Steuerungsblock vor Zeile 13, Warnhinweis vor Zeile 73) | GRÜN | wie oben |

Tool-Ausgabe Steuerungsblock-Dry-run: `4/4 GRUEN | 0 GELB | 0 ROT`.
Warnhinweis-Anker-Dry-run (temporäres Skript): alle 4 eindeutig vor der jeweils ursprünglichen Fachsektion (`## Einordnung im Gesamttrichter` bzw. `### Modulrolle`).

## Geänderte Dateien

```text
Apps/etf-vergleich/MINI_SPEC_FROM_HAUPTDOKUMENT.md
Apps/investment-universum/MINI_SPEC_FROM_HAUPTDOKUMENT.md
Apps/rollierende-sparplaene/MINI_SPEC_FROM_HAUPTDOKUMENT.md
Apps/weltkarte-etf-indizes/MINI_SPEC_FROM_HAUPTDOKUMENT.md
docs/steering/patches/AP-20b_steuerungsblock-rollout_sonderbatch-d-ohne-plan-generator_Ergebnis.md (neu)
```

Jede der 4 MINI_SPECs erhielt zwei Einfügungen an derselben Anker-Stelle (Steuerungsblock direkt gefolgt vom Warnhinweis, dann der ursprüngliche Inhalt unverändert).

## Datei-Wahrheit nach Write

| App | Steuerungsblock-Marker genau 1× | LLM-Prüfung vorhanden | Warnhinweis genau 1× | STOP-Regel vorhanden | Wiederlesen erfolgt | Status |
|---|---:|---:|---:|---:|---:|---|
| etf-vergleich | ja (1×) | ja | ja (1×) | ja | ja | GRÜN |
| investment-universum | ja (1×) | ja | ja (1×) | ja | ja | GRÜN |
| rollierende-sparplaene | ja (1×) | ja | ja (1×) | ja | ja | GRÜN |
| weltkarte-etf-indizes | ja (1×) | ja | ja (1×) | ja | ja | GRÜN |

Zusätzlich per `grep -n "^## \|^### "` je Datei bestätigt: Steuerungsblock- und Warnhinweis-Überschrift stehen genau einmal, unmittelbar hintereinander, vor der jeweils ursprünglichen ersten Fachsektion. Keine sonstige Überschriftenstruktur wurde verändert.

## Scope-QA

Nicht geändert / nicht angefasst:

- `plan-generator` unverändert (nicht im Diff, nicht gelesen)
- Seed-Datei unverändert (nicht im Diff)
- keine APP_SPEC geändert
- keine HTML-Datei geändert
- keine bereits erledigten Apps (Batch A/B/C, Sonderfälle) geändert
- kein Parent-/Companion-Merge
- kein App-Bau-Scope geöffnet
- kein Commit erzeugt

## Bewertung

### GRÜN-Kriterien

- Dry-run für alle 4 Ziel-Apps vollständig GRÜN — erfüllt
- Write nur für die 4 Ziel-MINI_SPECs — erfüllt
- Ergebnisprotokoll geschrieben — erfüllt
- alle 4 Ziel-MINI_SPECs nach Write vollständig wieder gelesen — erfüllt
- Steuerungsblock-Marker-QA bestanden — erfüllt (4/4, je 1×)
- LLM-Prüfungs-QA bestanden — erfüllt (4/4)
- Warnhinweis-QA bestanden — erfüllt (4/4, je 1×)
- STOP-Regel-QA bestanden — erfüllt (4/4)
- Scope-QA bestanden — erfüllt
- `plan-generator` unverändert — erfüllt
- keine verbotenen Dateien geändert — erfüllt

Alle GRÜN-Kriterien erfüllt.

### GELB-Gründe, falls zutreffend

Keine.

### ROT-Gründe, falls zutreffend

Keine.

## Nächster richtiger AP

Bei GRÜN (dieser Fall):

AP-21 — unabhängiger Review Sonderbatch D ohne plan-generator

## Später separat

AP-22 — Klärung plan-generator Seed-Sperre

## Ausdrücklich nicht nächster AP

- APP_SPEC
- App-Bau
- HTML-Analyse
- AP-14j
