# AP-25a — Finalaudit MINI_SPECs gegen Seed mit zwei Sonderfällen — Ergebnis

## Status

Status: GRÜN
Blocker: nein

## Kurzbefund

AP-25 war GELB, nicht wegen eines neuen Fehlers, sondern weil sein Audit-Scope nur einen Sonderfall (`plan-generator`) vorsah und `regulatorik-dashboard` fälschlich als Standard-App gegen das mechanische Bold-Feld-Format geprüft hatte. AP-25a korrigiert den Scope: 23 Standard-Apps werden weiterhin mechanisch wortgleich gegen Seed geprüft, `plan-generator` als Sonderfall ohne Seed-Provenienz, `regulatorik-dashboard` als zweiter Sonderfall mit Seed-Provenienz, aber bewusst erweitertem AP-14h/AP-14i-Format. Ergebnis: 23/23 Standard-Apps mechanisch GRÜN (0 Fremdlinien, 100 % Zeilenübereinstimmung), `plan-generator`-Sonderfall vollständig GRÜN, `regulatorik-dashboard`-Sonderfall vollständig GRÜN (Seed-Provenienz belegt, AP-14g/AP-14h/AP-14i-Kette real vorhanden und beide Protokolle GRÜN, 8-Fragen-Score mit eigenem 0–2/16-Schema bestätigt, keine falsche „mechanisch eingefügt"-Behauptung). Seed-Datei, APP_SPEC- und HTML-Dateien nicht im Git-Diff. Keine Reparatur durchgeführt.

## Git-Baseline

```text
git status --short (vor AP-25a):
 M .claude/learning/session-log.md
 M Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md
?? docs/steering/patches/AP-22_plan-generator_seed-sperre_klaerung_Ergebnis.md
?? docs/steering/patches/AP-23_plan-generator_seed-neufassung_steuerungsblock_entscheidungsblock_Ergebnis.md
?? docs/steering/patches/AP-23a_plan-generator_seed-readonly_korrektur_Ergebnis.md
?? docs/steering/patches/AP-24_review_plan-generator_minispec_provenienz_seed-readonly_Ergebnis.md
?? docs/steering/patches/AP-24a_plan-generator_sonderfall-formulierung_minifix_Ergebnis.md
?? docs/steering/patches/AP-25_finalaudit_minispecs_gegen_seed_Ergebnis.md

git log --oneline -5:
7104b77 docs(AP-20/20b/21): Steuerungsblock-Rollout Sonderbatch D ohne plan-generator + Seed-Provenienz-Review
fe7747d docs(AP-16/17/18): Steuerungsblock-Rollout Batch C + Memory-Integritätsfixes
ef4d6c8 docs(AP-14h/i): regulatorik-dashboard MINI_SPEC aus Seed neu gefasst
a2ddfeb docs(AP-14f/g): regulatorik-dashboard Identitätsanamnese + Seed-Fundament
83b3e2a docs(AP-14b-e): regulatorik-dashboard Arbeitsordner bereinigt

git diff --name-status (vor AP-25a):
M	.claude/learning/session-log.md
M	Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md
```

- Seed-Datei nicht im Status/Diff — bestätigt.
- Keine APP_SPEC-, HTML- oder anderen-MINI_SPEC-Dateien im Diff.
- `plan-generator`-MINI_SPEC dirty aus der bereits abgeschlossenen AP-22–24a-Kette (Vorzustand, nicht Teil von AP-25a).
- 6 Protokolle aus der AP-22–25-Kette sind untracked, noch nicht committed — Vorzustand, nicht Teil von AP-25a.
- Nebenbefund: Der read-only Import von `insert_steuerungsblock_into_minispec_from_seed.py` zur Wiederverwendung seiner Extraktionsfunktionen hat wie schon in AP-25 einen `tools/app_fabrik/__pycache__/`-Ordner erzeugt. Noch innerhalb dieses AP wieder gelöscht, nicht im finalen Git-Status sichtbar.
- Kein STOP-Trigger ausgelöst.

## Audit-Scope

| Gruppe | Apps | Prüflogik |
|---|---:|---|
| Standard-Apps | 23 | mechanischer Seed-Abgleich (wortgleich, via bewährter Tool-Funktionen `extract_seed_block`/`extract_score_block`) |
| plan-generator | 1 | Sonderfall ohne Seed-Provenienz (Provenienz: AP-22 + AP-23-Kontext + AP-23a/AP-24a) |
| regulatorik-dashboard | 1 | Sonderfall mit Seed-Provenienz, aber bewusst erweitertem AP-14h/AP-14i-Format (kein mechanischer Standardblock) |

Gesamt: 25 MINI_SPECs.

## Standard-App-Audit

Blockende-Erkennung: nächste `## `- oder `### `-Überschrift nach der Steuerungsblock-Überschrift (korrigiert gegenüber dem ursprünglichen AP-25-Gerüst). Score-Referenz: `## 2.1 Standardisiertes Änderungsgate: LLM-Prüfscore pro Änderung` (nicht das Platzhalter-Template unter `## 2.`).

| App | Seed-Block | Steuerungsblock | Seed-Zeilen | Score-Zeilen | Fremdlinien | Status |
|---|---|---|---|---|---|---|
| crash-reaktions-test | ja | genau 1× | 20/20 | 18/18 | 0 | GRÜN |
| depot-kipppunkt | ja | genau 1× | 21/21 | 18/18 | 0 | GRÜN |
| der-alte-euro | ja | genau 1× | 21/21 | 18/18 | 0 | GRÜN |
| diversifikations-detektor | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN |
| esg-spiegel | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN |
| etf-aera-vorbei | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN |
| etf-namensdecoder | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN |
| etf-vergleich | ja | genau 1× | 21/21 | 18/18 | 0 | GRÜN |
| geburtsjahrlos | ja | genau 1× | 20/20 | 18/18 | 0 | GRÜN |
| investment-universum | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN |
| komplexitaets-entlarver | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN |
| kostenkiller-ter | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN |
| market-timing-simulator | ja | genau 1× | 20/20 | 18/18 | 0 | GRÜN |
| markt-kam-zurueck | ja | genau 1× | 21/21 | 18/18 | 0 | GRÜN |
| prokrastinations-preis | ja | genau 1× | 27/27 | 18/18 | 0 | GRÜN |
| rendite-kalibrierung | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN |
| renditekiller-volatilitaet | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN |
| replizierer-swapper | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN |
| risiko-uebersetzer | ja | genau 1× | 20/20 | 18/18 | 0 | GRÜN |
| rollierende-sparplaene | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN |
| thesaurierer-rennen | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN |
| weltdepot-baukasten | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN |
| weltkarte-etf-indizes | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN |

**23/23 Standard-Apps GRÜN.** 0 Fremdlinien in jedem Fall, 100 % Seed-Zeilen- und Score-Zeilen-Übereinstimmung.

## Sonderfall plan-generator

| Prüfung | Ergebnis |
|---|---|
| Steuerungsblock genau 1× | GRÜN |
| Sonderfall-Kennzeichnung vorhanden | GRÜN (Wort „Sonderfall", aus AP-24a) |
| AP-22 genannt | GRÜN |
| AP-23-Kontext genannt | GRÜN |
| AP-23a/AP-24a genannt oder Sonderfall-Fix erkennbar | GRÜN (AP-23a wörtlich genannt; AP-24a nicht wörtlich zitiert, aber der von AP-24a eingefügte Sonderfall-Satz ist vorhanden und eindeutig erkennbar — disjunktive Bedingung erfüllt) |
| Entscheidungsblock 1–6 vorhanden | GRÜN (genau 1×, alle 6 Punkte) |
| LLM-STOP-Regel vorhanden | GRÜN |
| keine falsche Seed-Provenienz | GRÜN (alle 4 verbotenen Formulierungen geprüft, keine gefunden) |

**plan-generator Sonderfall: GRÜN.**

## Sonderfall regulatorik-dashboard

| Prüfung | Ergebnis |
|---|---|
| Steuerungsblock genau 1× | GRÜN (`## Steuerungsblock: Zweck, Barriere, Prüfregeln`, Zeile 169) |
| Seed-Provenienz / Identitätsquelle vorhanden | GRÜN (Abschnitt „## Quellen und Geltung", Zeile 242: „Identitätsquelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md (## regulatorik-dashboard, GESICHERT AP-14g 2026-06-30)") |
| AP-14h/AP-14i-Beleg vorhanden | GRÜN (beide Protokolldateien real vorhanden: `AP-14h_regulatorik-dashboard_minispec-neufassung-aus-seed_Ergebnis.md`, `AP-14i_regulatorik-dashboard_minispec-review-app-fabrik-readiness-commit-vorbereitung_Ergebnis.md`; beide mit `Status: GRÜN` bestätigt) |
| erweitertes Format erkennbar | GRÜN (H3-Unterüberschriften `### Zweck`, `### Psychologische Barriere (zu entfernen)`, `### Falscher Glaubenssatz`, `### Zielzustand`, `### Nicht-Ziele`, `### Muss-Kriterien`, `### Tonalität / Framing-Regeln`, `### LLM-Prüfscore pro Änderung` statt Bold-Feldern) |
| 8-Fragen-Score / 8-Fragen-Selbsttest erkennbar | GRÜN (eigener Abschnitt „### LLM-Prüfscore pro Änderung": Skala 0–2, Mindestscore GRÜN 12/16, KO-Kriterium Frage 3/4, 8 nummerierte „App-spezifische Prüffragen" 1.–8. vollständig vorhanden) |
| kein mechanischer Standardblock erforderlich | GRÜN (keine Notwendigkeit einer Rückstufung auf das 4-Kriterien-Standardformat — die Abweichung ist die dokumentierte, gewollte Zielstruktur dieser App) |
| keine falsche Provenienz | GRÜN (keine Behauptung „mechanisch eingefügt" oder „Nicht frei formulieren" — im Gegenteil, die MINI_SPEC dokumentiert selbst, dass es sich um eine redaktionelle Neufassung handelt) |

**regulatorik-dashboard Sonderfall: GRÜN.**

## Scope-QA

- Seed-Datei nicht im Diff — bestätigt
- keine APP_SPEC im Diff — bestätigt
- keine HTML-Datei im Diff — bestätigt
- keine Reparatur durchgeführt — bestätigt (kein MINI_SPEC-, Seed- oder APP_SPEC-Write)
- nur AP-25a-Protokoll geschrieben — bestätigt (der durch den read-only Modul-Import erzeugte `__pycache__`-Ordner wurde noch innerhalb dieses AP wieder entfernt und ist im finalen Git-Status nicht sichtbar)

## Bewertung

### GRÜN-Kriterien

- 23/23 Standard-Apps mechanisch GRÜN — erfüllt
- plan-generator Sonderfall GRÜN — erfüllt
- regulatorik-dashboard Sonderfall GRÜN — erfüllt
- Seed-Datei nicht im Diff — erfüllt
- keine APP_SPEC/HTML-Änderung — erfüllt
- Ergebnisprotokoll geschrieben — erfüllt

Alle GRÜN-Kriterien erfüllt.

### GELB-Gründe

Keine.

### ROT-Gründe

Keine.

## Nächster richtiger AP

Bei GRÜN (dieser Fall): Commit-/Abschluss-AP für die gesamte AP-22–25a-Kette und `plan-generator`-MINI_SPEC. Der Steuerungsblock-Rollout ist damit für alle 25 Apps (23 Standard-Apps + 2 dokumentierte Sonderfälle `plan-generator` und `regulatorik-dashboard`) mechanisch bzw. sonderfallgeprüft abgeschlossen.

## Ausdrücklich nicht nächster AP

- APP_SPEC
- App-Bau
- HTML-Analyse
- AP-14j
