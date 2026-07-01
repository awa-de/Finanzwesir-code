# AP-25 — Finaler mechanischer Gesamt-Audit: MINI_SPECs gegen Seed — Ergebnis

## Status

Status: GELB
Blocker: nein

## Kurzbefund

Read-only-Audit aller 25 `Apps/*/MINI_SPEC_FROM_HAUPTDOKUMENT.md` gegen `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md`. Ergebnis: 23 von 24 Standard-Apps sind mechanisch wortgleich gegen ihren Seed-Block und den gemeinsamen LLM-Prüfscore-Abschnitt verifiziert (0 Fremdlinien, 100 % Zeilenübereinstimmung je App). `plan-generator` besteht den eigenen Sonderfall-Check vollständig (Steuerungsblock, Sonderfall-Kennzeichnung, AP-22/AP-23-Kontext/AP-23a-Provenienz, Entscheidungsblock 1–6, LLM-STOP-Regel, keine falsche Seed-Provenienz — alles GRÜN). Eine Standard-App, `regulatorik-dashboard`, besteht den wortgleichen Mechanik-Test nicht (0/54 Seed-Zeilen, 0/18 Score-Zeilen wortgleich im lokalen Block gefunden) — aber aus einem bekannten, bereits unabhängig geprüften Grund: Diese App verwendet seit AP-14h/AP-14i eine bewusst andere, umfangreichere Steuerungsblock-Struktur (H3-Unterüberschriften statt Bold-Felder, 8-Fragen-LLM-Prüfscore mit eigenem Scoring 0–2/16 statt dem geteilten 4-Kriterien-Score) statt des mechanisch eingefügten Standard-Formats. Das ist kein neu entdeckter Fehler, sondern ein bereits dokumentierter, in AP-14i unabhängig review-bestätigter zweiter Sonderfall, den dieses Audit-Skript nicht vorgesehen hatte. Seed-Datei, APP_SPEC- und HTML-Dateien tauchen nicht im Git-Diff auf. Keine Reparatur durchgeführt.

Wichtiger methodischer Hinweis: Das im Auftrag mitgelieferte Python-Gerüst hat bei der ersten Ausführung für **alle** 24 Standard-Apps fälschlich ROT gemeldet (17–50 „Fremdlinien" je App). Das war ein Extraktionsfehler im Gerüst selbst (siehe „Methodik und Korrektur" unten), keine reale Abweichung. Nach Korrektur der Extraktionslogik (unter Wiederverwendung der bereits produktiv genutzten, in AP-12/17/18/21 bewährten Funktionen aus `tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py`) ergab sich das oben beschriebene, deutlich andere Bild: 23/24 GRÜN statt 0/24.

## Git-Baseline

```text
git status --short (vor AP-25):
 M .claude/learning/session-log.md
 M Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md
?? docs/steering/patches/AP-22_plan-generator_seed-sperre_klaerung_Ergebnis.md
?? docs/steering/patches/AP-23_plan-generator_seed-neufassung_steuerungsblock_entscheidungsblock_Ergebnis.md
?? docs/steering/patches/AP-23a_plan-generator_seed-readonly_korrektur_Ergebnis.md
?? docs/steering/patches/AP-24_review_plan-generator_minispec_provenienz_seed-readonly_Ergebnis.md
?? docs/steering/patches/AP-24a_plan-generator_sonderfall-formulierung_minifix_Ergebnis.md

git log --oneline -5:
7104b77 docs(AP-20/20b/21): Steuerungsblock-Rollout Sonderbatch D ohne plan-generator + Seed-Provenienz-Review
fe7747d docs(AP-16/17/18): Steuerungsblock-Rollout Batch C + Memory-Integritätsfixes
ef4d6c8 docs(AP-14h/i): regulatorik-dashboard MINI_SPEC aus Seed neu gefasst
a2ddfeb docs(AP-14f/g): regulatorik-dashboard Identitätsanamnese + Seed-Fundament
83b3e2a docs(AP-14b-e): regulatorik-dashboard Arbeitsordner bereinigt

git diff --name-status (vor AP-25):
M	.claude/learning/session-log.md
M	Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md
```

- Seed-Datei nicht im Status/Diff — bestätigt.
- Keine APP_SPEC-, HTML- oder anderen-MINI_SPEC-Dateien im Diff.
- `plan-generator`-MINI_SPEC dirty aus der bereits abgeschlossenen AP-22–24a-Kette (Vorzustand, nicht Teil von AP-25).
- Die 5 AP-22–24a-Protokolle sind untracked, noch nicht committed — Vorzustand, nicht Teil von AP-25.
- Nebenbefund während der Analyse: Der Import des Tool-Moduls `insert_steuerungsblock_into_minispec_from_seed` zur Wiederverwendung seiner Extraktionsfunktionen hat einen `tools/app_fabrik/__pycache__/`-Ordner erzeugt. Dieser wurde noch innerhalb von AP-25 wieder gelöscht (kein Analyseartefakt im Repo verblieben), da er keine erlaubte Änderung dieses AP ist. `git status --short` nach der Löschung zeigt ihn nicht mehr.
- Kein STOP-Trigger ausgelöst.

## Inventar

- MINI_SPECs gefunden: 25 (`Apps/*/MINI_SPEC_FROM_HAUPTDOKUMENT.md`)
- Seed-Blöcke gefunden: 25 (`## {slug}` unter „# 3. Seed-Blöcke" in der Seed-Datei — für jede der 25 Apps genau einer)
- MINI_SPEC ohne Seed-Block: keine (`extract_seed_block` fand für alle 25 Slugs, inkl. `plan-generator`, einen Block)
- Seed-Block ohne MINI_SPEC: keine (alle 25 Seed-Slugs haben einen entsprechenden `Apps/<slug>/`-Ordner mit MINI_SPEC)

## Methodik und Korrektur

Das im Auftrag mitgelieferte Python-Gerüst hatte zwei Extraktionsfehler, die zu systematischen False Positives führten:

1. **`score_region()`** suchte den ersten Treffer für „LLM-Prüfscore" in der Seed-Datei. Der erste Treffer liegt aber in Zeile 80, innerhalb des illustrativen Platzhalter-Templates unter „## 2. Standardstruktur je Seed" (mit `...`-Platzhaltern, keinem echten Inhalt). Der tatsächliche, gemeinsame Score-Abschnitt „## 2.1 Standardisiertes Änderungsgate: LLM-Prüfscore pro Änderung" beginnt erst bei Zeile 92. Dadurch enthielt `score_lines` nur das leere Platzhalter-Template statt der echten 18 Score-Zeilen, und jede echte Score-Zeile im lokalen Block (z. B. „Dieser Prüfscore ist **kein app-spezifischer Inhalt** …") wurde fälschlich als „Fremdlinie" gezählt — bei **jeder** der 24 Standard-Apps.
2. **`local_block(text)`** suchte nach dem nächsten `\n## ` nach der Steuerungsblock-Überschrift, um das Blockende zu bestimmen. Für Apps, deren ursprünglicher Fachinhalt mit einer `### `-Überschrift beginnt (Pattern A laut Anker-Regel des produktiven Tools, siehe `tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py::find_insert_offset`), lief die Extraktion zu weit und vereinnahmte den gesamten ursprünglichen Fachinhalt (z. B. „### Problem, das gelöst wird", „### Kernbotschaft") als Teil des „lokalen Blocks" — das erzeugte zusätzliche, nicht erklärbare Fremdlinien.

Korrektur (nur für die Audit-Analyse, keine Änderung an Produktivcode oder Dateien): Die bereits produktiv genutzten und in AP-12/17/18/21 bewährten Funktionen `extract_seed_block()` und `extract_score_block()` aus `tools/app_fabrik/insert_steuerungsblock_into_minispec_from_seed.py` wurden read-only importiert und für den Seed-Abgleich verwendet (exakt dieselbe Logik, mit der die MINI_SPECs ursprünglich befüllt wurden). Die Blockende-Erkennung wurde auf „nächste `## ` **oder** `### `-Überschrift" korrigiert, analog zur Anker-Regel `find_insert_offset()` des Tools. Kein Datei-Write, kein Repair der MINI_SPECs oder der Seed-Datei — nur eine korrekte Analyse-Logik für dieses read-only Audit.

## Audit-Tabelle

| App | Seed-Block | lokaler Steuerungsblock | Seed-Zeilen | Score-Zeilen | Fremdlinien | Status | Hinweis |
|---|---:|---:|---:|---:|---:|---|---|
| crash-reaktions-test | ja | genau 1× | 20/20 | 18/18 | 0 | GRÜN | — |
| depot-kipppunkt | ja | genau 1× | 21/21 | 18/18 | 0 | GRÜN | — |
| der-alte-euro | ja | genau 1× | 21/21 | 18/18 | 0 | GRÜN | — |
| diversifikations-detektor | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN | — |
| esg-spiegel | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN | — |
| etf-aera-vorbei | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN | — |
| etf-namensdecoder | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN | — |
| etf-vergleich | ja | genau 1× | 21/21 | 18/18 | 0 | GRÜN | — |
| geburtsjahrlos | ja | genau 1× | 20/20 | 18/18 | 0 | GRÜN | — |
| investment-universum | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN | — |
| komplexitaets-entlarver | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN | — |
| kostenkiller-ter | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN | — |
| market-timing-simulator | ja | genau 1× | 20/20 | 18/18 | 0 | GRÜN | — |
| markt-kam-zurueck | ja | genau 1× | 21/21 | 18/18 | 0 | GRÜN | — |
| prokrastinations-preis | ja | genau 1× | 27/27 | 18/18 | 0 | GRÜN | — |
| regulatorik-dashboard | ja | genau 1× | 0/54 | 0/18 | 0 | **ROT (mechanisch)** | Bewusst anderes Format seit AP-14h/AP-14i: H3-Unterüberschriften statt Bold-Felder, eigener 8-Fragen-LLM-Prüfscore (0–2/16) statt geteiltem 4-Kriterien-Score. Kein Zeichenketten-Match möglich, aber inhaltlich bereits unabhängig in AP-14i review-bestätigt (16/16 Selbsttest). Siehe Sonderfall-Abschnitt unten. |
| rendite-kalibrierung | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN | — |
| renditekiller-volatilitaet | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN | — |
| replizierer-swapper | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN | — |
| risiko-uebersetzer | ja | genau 1× | 20/20 | 18/18 | 0 | GRÜN | — |
| rollierende-sparplaene | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN | — |
| thesaurierer-rennen | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN | — |
| weltdepot-baukasten | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN | — |
| weltkarte-etf-indizes | ja | genau 1× | 19/19 | 18/18 | 0 | GRÜN | — |
| plan-generator | SONDERFALL | genau 1× | — | — | — | GRÜN | Siehe eigener Sonderfall-Abschnitt unten. |

23/24 Standard-Apps mechanisch wortgleich GRÜN. 1/24 (`regulatorik-dashboard`) mechanisch ROT, aber mit dokumentierter, unabhängig bereits geprüfter Sonderrolle (siehe unten).

## Sonderfall plan-generator

| Prüfung | Ergebnis |
|---|---|
| Steuerungsblock vorhanden | GRÜN (genau 1×) |
| Sonderfall-Kennzeichnung vorhanden | GRÜN (Wort „Sonderfall" vorhanden, aus AP-24a) |
| AP-22 genannt | GRÜN |
| AP-23-Kontext genannt | GRÜN |
| AP-23a/AP-24a genannt | GRÜN |
| Entscheidungsblock 1–6 vorhanden | GRÜN (alle 6 Punkte, `### 1.`–`### 6.`) |
| LLM-STOP-Regel vorhanden | GRÜN |
| keine falsche Seed-Provenienz | GRÜN (alle 4 verbotenen Formulierungen geprüft, keine gefunden) |

## Nebenbefund: zweiter faktischer Sonderfall (regulatorik-dashboard)

Dieser AP-Auftrag hatte nur `plan-generator` als Sonderfall vorgesehen. Der Audit zeigt jedoch, dass `regulatorik-dashboard` faktisch ebenfalls ein Sonderfall ist — allerdings ein anderer als `plan-generator`:

- `plan-generator`: Seed-Datei bewusst **nicht** als Provenienz verwendet (Provenienz stattdessen AP-22/AP-23-Kontext/AP-23a).
- `regulatorik-dashboard`: Seed-Datei **ist** die Provenienz (Zeile 242 der MINI_SPEC: „Identitätsquelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md (## regulatorik-dashboard, GESICHERT AP-14g 2026-06-30)"), aber der lokale Block wurde in AP-14h **redaktionell neu gefasst und strukturell erweitert** (eigene Szenarien-Tabelle, Referenzzahlen, Tonalitätsregeln, 8-Fragen-Score) statt mechanisch aus dem Bold-Feld-Format übernommen. Das ist bereits in AP-14h/AP-14i dokumentiert und unabhängig review-bestätigt — kein neuer Fund, aber ein Fund, den die AP-25-Auftragsannahme („alle Apps außer plan-generator folgen dem mechanischen Standard-Muster") nicht korrekt abgebildet hatte.

Dieser Nebenbefund ist der einzige Grund für den GELB-Status dieses AP. Keine Reparatur vorgenommen — Meldung zur Entscheidung, ob `regulatorik-dashboard` als zweiter, dauerhaft dokumentierter Sonderfall (analog zu `plan-generator`) formal anerkannt werden soll, oder ob eine künftige Audit-Logik ihn strukturell anders behandeln soll.

## Scope-QA

- Seed-Datei nicht im Diff — bestätigt
- keine APP_SPEC im Diff — bestätigt
- keine HTML-Datei im Diff — bestätigt
- keine Reparatur durchgeführt — bestätigt (kein MINI_SPEC-, Seed- oder APP_SPEC-Write)
- nur AP-25-Protokoll geschrieben — bestätigt (der versehentlich erzeugte `__pycache__`-Ordner aus dem read-only Modul-Import wurde noch während dieses AP wieder entfernt und ist nicht im finalen Git-Status sichtbar)

## Bewertung

### GRÜN-Kriterien

- alle Standard-MINI_SPECs mechanisch gegen Seed geprüft — erfüllt
- 23/24 Standard-Apps mit Seed-Provenienz mechanisch GRÜN — **nicht vollständig erfüllt** (1 Ausnahme mit dokumentiertem Grund)
- plan-generator-Sonderfall GRÜN — erfüllt
- keine Seed-/APP_SPEC-/HTML-Änderung — erfüllt
- Ergebnisprotokoll geschrieben — erfüllt

### GELB-Gründe

- `regulatorik-dashboard` besteht den mechanischen wortgleichen Seed-Abgleich nicht (0/54, 0/18), weil die App seit AP-14h/AP-14i bewusst ein eigenes, erweitertes Steuerungsblock-Format verwendet statt des mechanisch transferierten Standard-Formats. Dieser Zustand ist bereits dokumentiert und in AP-14i unabhängig review-bestätigt (16/16 LLM-Selbsttest) — kein neu entdeckter Inhaltsfehler, sondern eine dem AP-25-Auftrag unbekannte, bereits bestehende zweite Sonderrolle.
- Keine verbotene Änderung ist passiert. Kein Sicherheitsrisiko. Keine falsche Provenienzbehauptung bei `plan-generator` oder `regulatorik-dashboard` gefunden.

### ROT-Gründe

Keine. Insbesondere: keine Seed-/APP_SPEC-/HTML-Änderung, kein fehlender oder doppelter Steuerungsblock, keine unerklärbaren Fremdlinien bei den 23 mechanisch geprüften Apps, keine falsche Seed-Provenienz bei `plan-generator`.

## Nächster richtiger AP

Bei diesem GELB-Fall (kein Blocker, keine verbotene Änderung, bekannter und bereits unabhängig geprüfter Nebenbefund): Der Nutzer kann direkt zum Commit-/Abschluss-AP für AP-22/AP-23/AP-23a/AP-24/AP-24a und `plan-generator`-MINI_SPEC übergehen. Der `regulatorik-dashboard`-Nebenbefund ist kein Blocker für diesen Commit (betrifft eine andere, bereits separat abgeschlossene AP-Kette, aktuell in AP-14j fortgeführt) — wird hiermit nur zur Kenntnis gebracht und zur Entscheidung vorgelegt, ob eine formale zweite Sonderfall-Kennzeichnung für `regulatorik-dashboard` gewünscht ist.

## Ausdrücklich nicht nächster AP

- APP_SPEC
- App-Bau
- HTML-Analyse
- AP-14j
