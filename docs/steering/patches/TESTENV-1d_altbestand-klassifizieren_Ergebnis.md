Stand: 2026-07-11 | Session: TESTENV-1d | Geändert von: Claude (Sonnet)

# TESTENV-1d – Altbestand für die Migration klassifizieren

## A. Kurzurteil

**Status: GRÜN**

Alle 23 im Inventar (`TESTENV-1a`, korrigiert und `TESTENV-1aFR`-bestätigt) gelisteten Test-HTML-
Dateien sind klassifiziert. Keine Datei blieb `UNKLAR` — jede Entscheidung stützt sich auf
deterministische Belege (SHA-256, CSV-Referenzmengen-Überlappung, Checker-Bericht) und, wo Titel/
Referenzen allein nicht reichten, auf eine gebündelte Haiku-Grobsortierung des realen Body-Inhalts
(reine Fundstellensammlung, keine Bewertung durch Haiku).

- **KEEP: 14**
- **MERGE: 1**
- **DELETE: 6**
- **OUTSIDE: 2**
- **UNKLAR: 0**

Methodik: Python-Faktenmatrix (Größe, SHA-256, `<title>`/`<h1>`/`<h2>`, Script-/Stylesheet-/
Datenreferenzen, Existenzprüfung, Dublettengruppen) über alle 23 Dateien im Scratchpad erzeugt,
zusätzlich deterministische CSV-Referenzmengen-Überlappung zwischen den 5 aus `TESTENV-1a` §6/§14
bekannten Verdachtsgruppen berechnet (exakter Mengenvergleich, kein Raten). Für die zwei
verbleibenden echten Zweifelsfälle (Security-Gehalt der „Master Suite", Snapshot/Line-Abdeckung
in `index_irregular_xaxis.html`) eine gebündelte Haiku-Grobsortierung (Codebase-Scout-Agent)
eingeholt, die H2/H3-Struktur und Body-Inhalt von 6 Dateien faktisch zusammenfasste, ohne
KEEP/MERGE/DELETE zu entscheiden. Keine Quelldatei verändert.

## B. Vollständige HTML-Klassifikation

| Pfad | Entscheidung | Ziel bei MERGE | Kurzer Beleg |
|---|---|---|---|
| `Apps/prokrastinations-preis/app.test.html` | KEEP | — | Einzige echte App-Testseite, 34 benannte Testfälle, aktiv über TESTENV-1c/1cF gepflegt. |
| `Theme/chart-tests/AP-16-abnahme.html` | KEEP | — | Moderner Token-Kaskaden-/Chart-Bridge-Referenzharness, 6 einzigartige Szenarien, kein Overlap zu Legacy. |
| `Theme/chart-tests/index copy.html` | DELETE | — | SHA-256 byte-identisch mit `index_balken_CI.html` — exakte Dublette, überflüssiger Zweitname. |
| `Theme/chart-tests/index_balken_CI.html` | KEEP | — | Überlebender Zwilling der Dublette; Teil der Color-Permutation-Familie (Bar), passt ins `_CI`-Namensschema. |
| `Theme/chart-tests/index_linie_CI.html` | KEEP | — | Nutzt dieselben 3 CSVs wie die Bar-CI-Dateien (100% Overlap), testet aber Line-Rendering — anderer Chart-Typ, keine echte Duplizierung. |
| `Theme/chart-tests/index_torte_CI.html` | KEEP | — | Eigene Pie-spezifische CSVs, 0% Overlap zu allen anderen Dateien. |
| `Theme/chart-tests/index-balken2.html` | DELETE | — | Alle 4 referenzierten CSVs zu 100% in `index_balken_alle.html` enthalten; Haiku-Scout bestätigt keine Test-/Assertion-Logik über reines Rendering hinaus. |
| `Theme/chart-tests/index._linien3.html` | KEEP | — | Referenziert dieselben `bd_kurz_*`-CSVs wie `index_balken_alle.html`, testet aber Line- statt Bar-Rendering (eigener Chart-Typ, wie bei der CI-Familie). |
| `Theme/chart-tests/index3.html` | KEEP | — | 0 CSV-Overlap mit `index_tool_tip.html`; eigener Fokus „Tooltip & Context Stresstest" (Linie+Balken gemeinsam). |
| `Theme/chart-tests/index_alles test.html` | MERGE | neuer Zielort `tests/engine/` (Security-Testseite, Name in TESTENV-1e final festzulegen) | Abschnitt 4 (Graceful Degradation, Invalid-Option-Injection, XSS-Protection, Farb-Gatekeeper) ist repo-weit einzigartig; Abschnitte 1–3 (Linie/Balken/Torte) überlappen 15–57 % mit schmaleren Einzeldateien und sind dort bereits abgedeckt. |
| `Theme/chart-tests/index_alt.html` | DELETE | — | „Phase 5 Ready"-historischer Checkpoint mit generischen Platzhalter-CSVs (`test_data.csv`); Kernszenarien (Historie/Multibalken/Singlebalken) thematisch durch `index_alles test.html` und `index_balken_alle.html` abgedeckt, kein einzigartiges Testverhalten gefunden. |
| `Theme/chart-tests/index_balken.html` | DELETE | — | Alle 7 CSVs zu 100 % in `index_balken_alle.html` enthalten; Haiku-Scout bestätigt reines Rendering ohne eigene Logik. |
| `Theme/chart-tests/index_balken_alle.html` | KEEP | — | „Full List"-Superset (20 CSVs), deckt `index_balken.html` und `index-balken2.html` vollständig und `index_linen_2.html` zu 80 % ab — kanonische Bar-Vollständigkeitsseite. |
| `Theme/chart-tests/index_data_anchored.html` | DELETE | — | Alle 3 CSVs zu 100 % in `Theme/index.html` enthalten; identische Szenario-Beschreibung („Monatliche/Quartals-Labels, Data-Anchored Ticks") dort bereits mit breiterer Kadenzabdeckung vorhanden. |
| `Theme/chart-tests/index_irregular_bar_ap13.html` | KEEP | — | Eigenständige, tiefere PERIOD-Track-Bar-Regression (B0–B7); testet ausschließlich Bar, keine Line-Überschneidung zu `index_irregular_xaxis.html`. |
| `Theme/chart-tests/index_irregular_xaxis.html` | KEEP | — | Abschnitt „A. SNAPSHOT (Line Charts)" ist einzigartig (Mixed-Rhythm-Guard für Liniendiagramme, von keiner anderen Datei getestet); Abschnitt „B. PERIOD (Bar)" überlappt 88–100 % mit `index_irregular_bar_ap13.html` und sollte bei der Migration entfernt werden (kein Dateiverlust, nur Inhaltstrimm — siehe Abschnitt D). |
| `Theme/chart-tests/index_linen_2.html` | DELETE | — | 4 von 5 CSVs zu 100 % in `index_balken_alle.html` enthalten; die 5. Referenz (`bd_daily_90d.csv`) ist die bereits aus `TESTENV-1a` bekannte gebrochene Datei — kein funktionierender Alleinstellungswert. |
| `Theme/chart-tests/index_linie_CI.html` | KEEP | (siehe oben, bereits gelistet) | — |
| `Theme/chart-tests/index_linien.html` | KEEP | — | Eigene `scenario_*`-CSV-Familie, nur 1 CSV inzidentell mit `index_irregular_xaxis.html` geteilt; trägt die bekannte Case-Mismatch-Referenz `scenario_6_decimals.csv` (Folge in Abschnitt D). |
| `Theme/chart-tests/index_minmax.html` | KEEP | — | 17 Szenarien, vollständig eigene `minmax_*`-CSV-Familie, 0 % Overlap mit jeder anderen Datei. |
| `Theme/chart-tests/index_tool_tip.html` | KEEP | — | Eigene `tool_tip_*`-CSV-Familie, 0 CSV-Overlap mit `index3.html`. |
| `Theme/chart-tests/index_torte_CI.html` | KEEP | (siehe oben, bereits gelistet) | — |
| `Theme/index.html` | KEEP | — | Breiteste Kadenz-/Dichte-Testabdeckung (15 CSVs, 6 Gruppen A–F, Snapshot- und PERIOD-Track); subsumiert `index_data_anchored.html` vollständig. Einziger Fresh-Clone-Bruch unter den tracked Dateien (Folge in Abschnitt D). |
| `docs/design-system/referenz/janitor-test.html` | OUTSIDE | — | Markdown-„Janitor"-Tooling-Test, fachfremd zu Chart-Engine/App-Testumgebung; bleibt unangetastet. |
| `docs/design-system/archiv/boxen-stress-test-referenz.html` | OUTSIDE | — | Design-System „Master Design Check", fachfremd; bleibt unangetastet. |

**Zählprobe:** 23 Zeilen (`index_linie_CI.html` und `index_torte_CI.html` je nur einmal effektiv
gezählt, in der Tabelle aus Lesbarkeitsgründen an der alphabetischen Stelle zusätzlich referenziert)
= 1 (App) + 1 (AP-16) + 19 (Theme/chart-tests, inkl. Dublette) + 1 (Theme/index.html) + 2
(Design-System) = 23. Deckt sich exakt mit `TESTENV-1a` §4.

## C. Merge-Inhalte

| Quelle | Ziel | Einzigartige zu übernehmende Szenarien |
|---|---|---|
| `Theme/chart-tests/index_alles test.html` | neuer Ort unter `tests/engine/` (kanonische Security-Testseite, finaler Dateiname/Aufbau erst in `TESTENV-1e`) | 4.1 Graceful Degradation; 4.2 Invalid Option Injection (`mode:javascript:alert(...)`); 4.3 XSS Protection (`<script>`-Injection in `data-title`); 4.4 Farb-Gatekeeper-Validierung. Abschnitte 1–3 (Linie/Balken/Torte) werden **nicht** übernommen — bereits in `index_linie_CI.html`/`index_balken_alle.html`/`index_torte_CI.html` abgedeckt. |

## D. Fixture- und Referenzfolgen

| Datei/Gruppe | Folge | Begründung |
|---|---|---|
| `Theme/chart-tests/index copy.html` | entfällt mit der Datei (DELETE) | CSVs bleiben über den überlebenden Zwilling `index_balken_CI.html` erreichbar. |
| `Theme/data/scenario_6_decimals.csV` | **FIX** — Referenz in `index_linien.html:97` oder Dateiname bei Migration angleichen | `index_linien.html` bleibt KEEP; der Case-Mismatch bricht auf case-sensitiven Systemen (bestätigt in `TESTENV-1a` §11). Datei nicht löschen. |
| `Theme/data/bd_daily_90d.csv`-Referenz (in `index_linen_2.html`) | entfällt mit der Quelldatei (DELETE) | Kein überlebender Ort mehr, der diese gebrochene Referenz nutzt — Reparatur erübrigt sich. |
| `scenario_2_long_25y.csv`, `tool_tip_pie_gatekeeper.csv`, `tt_micro_precision_5d.csv`, `tt_transition_weekly_20d.csv` | **DELETE-KANDIDAT** | In der vollständigen Faktenmatrix (23 Dateien) von keiner KEEP- oder MERGE-Seite referenziert — bestätigte echte Orphans laut `TESTENV-1a` §7, Kategorie A. |
| `Alle-Balkendiagramm-CSV.txt` | **UNBERÜHRT** | Reine Namens-Notiz ohne Fixture-Charakter (laut `TESTENV-1a` §7 Kategorie B), keine Test-Datenrolle. |
| `Theme/index.html`s 15 `snap_period_*`-CSVs | **KEEP/MOVE** — aus dem ignorierten `Theme/data/` nach `tests/fixtures/engine/` überführen | Löst den einzigen Fresh-Clone-Bruch einer tracked Datei; `Theme/index.html` bleibt KEEP. |
| Übrige, von KEEP-Seiten referenzierte `Theme/data/*.csv` (ca. 70 Dateien: `bd_*`, `scenario_*`, `minmax_*`, `tool_tip_*`/`tt_*`, `irregular_*`, `snap_period_*`, `test_data*`) | **KEEP/MOVE** — nach `tests/fixtures/engine/` überführen | Weiterhin von mindestens einer überlebenden (KEEP-)Seite benötigt. |
| `Apps/prokrastinations-preis/test-data/*.csv` (7 Dateien) | **UNBERÜHRT** | App-eigene Fixtures, bereits am durch `TEST_PAGE_STANDARD.md` §3 vorgesehenen Standardort. |
| `Theme/assets/data/b1/*` (produktiv) | **UNBERÜHRT** | Contract-geführte Produktivdaten, kein Testfixture, bereits sauber getrennt (bestätigt `TESTENV-1a` §7). |
| Asset-Referenzen von `janitor-test.html`/`boxen-stress-test-referenz.html` | **UNBERÜHRT** (OUTSIDE) | Fachfremder Bestand, nicht Teil der TESTENV-Migration. |

## E. Vorgeschlagene Migrationsbatches

1. **App-Testseite modernisieren** — `Apps/prokrastinations-preis/app.test.html` auf Template
   (`docs/testing/templates/app.test.template.html`), Shared CSS/JS und lokales Vendor-Chart.js
   umstellen; alle 34 Testfälle inhaltlich erhalten (kein Szenario-Verlust); der bereits per
   `TESTENV-1cF` markierte `data-fw-test-allow-missing-ref`-Testfall I bleibt unverändert korrekt.

2. **Engine-/Chart-Testseiten und Fixtures** — die 13 überlebenden Legacy-KEEP-Seiten
   (`index_balken_CI.html`, `index_linie_CI.html`, `index_torte_CI.html`, `index._linien3.html`,
   `index3.html`, `index_balken_alle.html`, `index_irregular_bar_ap13.html`,
   `index_irregular_xaxis.html`, `index_linien.html`, `index_minmax.html`, `index_tool_tip.html`)
   plus `AP-16-abnahme.html` und `Theme/index.html` nach `tests/engine/` verschieben und auf den
   neuen Standard modernisieren; zugehörige Fixtures nach `tests/fixtures/engine/` überführen;
   Case-Mismatch `scenario_6_decimals.csV` fixen; `index_irregular_xaxis.html`s redundanten
   Bar/PERIOD-Abschnitt trimmen; Security-Merge aus `index_alles test.html` durchführen.

3. **Löschen und Abschlusschecker** — die 6 DELETE-Kandidaten (`index copy.html`,
   `index-balken2.html`, `index_balken.html`, `index_linen_2.html`, `index_data_anchored.html`,
   `index_alt.html`) sowie `index_alles test.html` (nach abgeschlossenem Security-Merge) entfernen;
   die 4 Orphan-CSV-Kandidaten final entscheiden; `python tools/check-test-pages.py`
   repo-weit grün bekommen; `--write-index` für den vollständig gefüllten Launcher ausführen.

Keine Detailimplementierung dieser Batches in diesem AP — das ist Aufgabe von `TESTENV-1e`.

## F. Scope

- Einzige neue Datei dieses APs: `docs/steering/patches/TESTENV-1d_altbestand-klassifizieren_Ergebnis.md`.
- Keine Testdatei, keine Fixture, kein Checker, kein Standard verändert.
- Keine Migration begonnen — keine Datei verschoben, umbenannt oder gelöscht.
- Temporäre Analyseartefakte (Python-Faktenmatrix-Skript + JSON-Zwischenergebnis) liegen
  ausschließlich im Betriebssystem-Temp-Verzeichnis der Sitzung, nicht im Repository.
- `git status --short` vor und nach diesem AP identisch (nur die bereits bekannten
  Fremdänderungen/-artefakte der vorherigen APs dieses Fadens, keine davon verändert).
