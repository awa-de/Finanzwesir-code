Stand: 2026-07-11 | Session: TESTENV-1aF4 | Geändert von: Claude (Sonnet)

Review-Status: KORRIGIERT NACH TESTENV-1aR
Review-Nachweis: `docs/steering/patches/TESTENV-1aR_inventar-review_Ergebnis.md`
Operative Sachquelle: Diese Datei in ihrem korrigierten Stand.
Auditspur: TESTENV-1aR bleibt unverändert erhalten.

# TESTENV-1a – Reale Testumgebung inventarisieren

## Korrekturen nach TESTENV-1aR

Der unabhängige Review `TESTENV-1aR` hat 5 Korrekturklassen identifiziert, die in dieser Datei eingearbeitet wurden:

1. **App-Ordner-Zahl**: 24→25 App-Ordner insgesamt, 23→24 Ordner ohne `app.test.html`.
2. **Case-Sensitivity-Fundstelle**: die Referenz auf `scenario_6_decimals.csv` stammt real aus `Theme/chart-tests/index_linien.html:97`, nicht aus `index_alles test.html`.
3. **Orphan-/Datenkategorien**: die vormals homogenen „6 verwaisten Dateien" sind in 3 Kategorien aufgelöst (4 echte, statisch unreferenzierte CSVs; 1 Manifest-/Notizdatei ohne Fixture-Charakter; 1 case-mismatched, tatsächlich referenzierte Datei).
4. **Gesamtzahl `Theme/chart-tests/`**: durchgängig 19 Dateien insgesamt (18 Legacy + 1 moderner Harness) statt vereinzelt „18 HTML-Testseiten".
5. **`Theme/index.html`-Laufzeitaussage**: als plausible, nicht browsergetestete Ableitung gekennzeichnet statt als geprüfte Tatsache.

Für den vollständigen Auditverlauf siehe die Reviewdatei. Der folgende Text ist der korrigierte, operative Stand.

## 1. Status und Kurzurteil

**Status: GRÜN**

Modell-Gate bestanden (Claude Sonnet 5). Alle real vorhandenen Test-HTMLs im definierten Scope wurden erfasst — inklusive der 19 `.gitignore`-ausgeblendeten Dateien in `Theme/chart-tests/`, die in einem frischen Klon **nicht** vorhanden wären. Datenquellen (91 Fixture-/Produktivdateien) sind vollständig inventarisiert. Alle 12 Risikoachsen aus §Vorgabe wurden geprüft; mehrere reale, bisher nicht dokumentierte Befunde wurden gefunden (exakte HTML-Dublette, gebrochene CSV-Referenz, Groß-/Kleinschreibungs-Falle, verwaiste Fixtures, ein Fresh-Clone-brechendes tracked File). Kein Scope-Verstoß: keine Datei außer dieser Ergebnisdatei wurde angelegt oder geändert.

Kurzfassung der wichtigsten Befunde:
- Von 25 App-Ordnern hat nur **1** (`prokrastinations-preis`) ein `app.test.html` — der App-Fabrik-Standard (`APP_FOLDER_STRUCTURE.md:20`) ist in 24 Ordnern nicht erfüllt (deterministischer Dateibefund; ob jeder Ordner bereits den fachlichen Zeitpunkt für einen Pflicht-Harness erreicht hat, ist offen und nicht Teil dieses Inventars).
- `Theme/chart-tests/` **und** `Theme/data/` sind vollständig `.gitignore`-ausgeblendet (19 HTML-Dateien + 81 Datendateien) — ein frischer Klon hätte davon **nichts**.
- `Theme/index.html` ist selbst tracked (nicht ignoriert), verhält sich aber wie eine Legacy-Kat-C-Testseite und referenziert 15 CSVs aus dem ignorierten `Theme/data/`. Statisch bestätigt ist nur diese Abhängigkeit; ein frischer Klon enthält die HTML-Datei, aber nicht die referenzierten CSVs. Die konkrete Browserwirkung (voraussichtlich unvollständiges/fehlerhaftes Laufzeitverhalten) ist eine **plausible, aber nicht browsergetestete Ableitung**, keine geprüfte Tatsache.
- `Theme/chart-tests/index copy.html` und `index_balken_CI.html` sind **byte-identisch** (SHA-256 gleich) — eine Dublette unter zwei Namen.
- `Theme/chart-tests/index_linen_2.html` referenziert `../data/bd_daily_90d.csv`, das es nicht gibt (real: `bd_kurz_daily_90d.csv`) — eine echte gebrochene Referenz.
- `Theme/data/scenario_6_decimals.csV` (Großbuchstabe `V`) wird real von `Theme/chart-tests/index_linien.html:97` als `../data/scenario_6_decimals.csv` (Kleinbuchstabe) referenziert — auf Windows unsichtbar (case-insensitives Dateisystem), auf einem case-sensitiven System/CI bricht das. Die Datei ist damit **referenziert, nicht verwaist** (siehe folgender Punkt).
- 4 von 81 `Theme/data/`-Dateien sind im definierten HTML-Scope statisch unreferenziert (echte Orphans); zusätzlich 1 Manifest-/Notizdatei ohne Fixture-Charakter (`Alle-Balkendiagramm-CSV.txt`) und die oben genannte case-mismatched, aber tatsächlich referenzierte Datei (`scenario_6_decimals.csV`) — Details §7.
- Genau 1 von 21 relevanten Testseiten lädt Chart.js lokal (`AP-16-abnahme.html`); alle anderen laden vom CDN.

## 2. Geprüfter Repository-Stand

| Merkmal | Wert |
|---|---|
| Repository | `Finanzwesir-code` (`git@github.com:awa-de/Finanzwesir-code.git`) |
| Arbeitsordner | `Z:\Documents\Nextcloud\Finanzwesir 2.0` (Git-Root über Netzlaufwerk-Junction identisch mit `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`) |
| Branch | `master` |
| Letzter Commit | `77f3229` — „feat(AP-prokrast-17-FONT-CODE-B+SPEC-HEBUNG): HTML-UI-Fonts über Tokens, Spec-Status gehoben, Doku-Sync" |
| Git-Status bei AP-Start | ausschließlich `.claude/learning/session-log.md` modifiziert (eigener `/start`-Eintrag dieser Sitzung, kein Bezug zu TESTENV-1a) |
| Modell-Gate | bestanden — Claude Sonnet 5 |

## 3. Frühere Inventuren und ihr Wahrheitsstatus

### 3.1 `docs/steering/patches/TESTENV-1_harness-inventar_moderne-vs-legacy.md` (Stand 2026-07-11 07:28, Nebenprodukt AP-prokrast-17-FONT-CODE-B)

Die Vorinventur erfasste die dort ausdrücklich untersuchte Menge aus `Theme/chart-tests/*.html` und `Apps/prokrastinations-preis/app.test.html` (Erhebungsmethode laut deren Zeile 7), zusätzlich Kategorisierung A/B/C, Merkmalsmatrix, Zielbild-Checkliste. Ihr tatsächlicher historischer Umfang ist aus ihrer eigenen Dateiliste beziehungsweise Merkmalsmatrix (§2 dort) abzuleiten, nicht aus dieser Zusammenfassung.

**Wahrheitsstatus: größtenteils bestätigt, mit 4 Lücken:**
1. Das vertiefte Inventar `TESTENV-1a` bestätigt heute: 19 HTML-Dateien unter `Theme/chart-tests/`, zusätzlich `Apps/prokrastinations-preis/app.test.html` und zusätzlich `Theme/index.html`. `Theme/index.html` war in der von der Vorinventur untersuchten Menge **nicht enthalten** — eine real vorhandene, testtypische, sogar *versionierte* Seite mit identischem Kat-C-Profil (CDN, kein Token-Layer, hartcodierte Hex-Werte), die zusätzlich zum damaligen Scope hinzukommt.
2. Enthält keine Dubletten-, Bruch- oder Verwaisungsprüfung (war nicht ihr Zweck — reine Merkmalsvergleichs-Inventur, keine Datei-Wahrheits-Deep-Scan).
3. Erwähnt nicht, dass `Theme/data/` (Datenquelle aller Kat-B/C-Seiten) ebenfalls vollständig `.gitignore`-ausgeblendet ist.
4. Die dort genannten „offenen Entscheidungen" (Migrieren/Archivieren, Namenskonvention, App-Seite auf lokales Vendor) sind mit diesem Inventar unverändert offen — sie sind TESTENV-1b-Scope, nicht widerlegt.

Diese Datei bleibt als Merkmalsvergleich A/B/C weiterhin gültig und wird hier nicht dupliziert, sondern durch Referenz genutzt.

### 3.2 `docs/steering/patches/AP-prokrast-18_claims-vs-files-review-gesamtkette_Ergebnis.md` (Z. 154–162, Finding F-3/F-4)

- **F-3** (`NAVIGATION.md:136` / `screen.css`-Kopf) — außerhalb des TESTENV-Scopes, nicht erneut geprüft.
- **F-4** — offene Frage, ob `Theme/chart-tests/AP-16-abnahme.html` aus `.gitignore` genommen werden soll, „Reproduzierbarkeit der 16b/16c-Abnahme". **Bestätigt weiterhin offen** — `AP-16-abnahme.html` liegt nach wie vor unter dem `Theme/chart-tests/`-Ignore-Eintrag (§9 dieser Datei).

### 3.3 `docs/steering/BACKLOG.md` Zeile `TESTENV-1` (Z. 37)

Formuliert das Zielbild (Pro-App-Harness, Launcher-Index, Chart-Harness-Konsolidierung, Test-CSV-Umzug, versionierter Kanon vs. gitignorete Scratch-Ecke). Deckt sich mit dem hier gefundenen Ist-Zustand; keine Widersprüche, nur Bestätigung des Ausgangsbefunds.

### 3.4 `docs/App-Fabrik/APP_FOLDER_STRUCTURE.md:20`

Definiert `app.test.html` als Pflichtbestandteil jedes App-Ordners („lokale Entwicklungs- und Testseite"). **Realität weicht stark ab** — siehe §4/§14.

Keine weitere existierende TESTENV-/Harness-/Fixture-Inventur gefunden (Suchbegriffe „TESTENV", „Harness", „chart-tests", „Testumgebung", „Fixture" über `docs/` ergaben sonst nur beiläufige Erwähnungen in AP-Ergebnisprotokollen ohne inventarisierenden Charakter).

## 4. Vollständige Test-HTML-Dateiliste

23 Dateien geprüft, davon **1 App-Test**, **19 Engine-Workbenches** (1 modern + 18 Legacy), **1 versionierte, aber Kat-C-artige Sonderseite**, **2 fachfremde Design-System-Referenzseiten** (Namensmuster-Treffer, kein Chart-Engine/App-Bezug).

| # | Pfad | Kat. | Git-Status | Zweck |
|---|---|---|---|---|
| 1 | `Apps/prokrastinations-preis/app.test.html` | A — App-Test | tracked, clean | Echte-App-Testseite, 34 benannte Testfälle (A–AF) |
| 2 | `Theme/chart-tests/AP-16-abnahme.html` | B — moderner Engine-Harness | **ignoriert** (ganzer Ordner) | Kaskaden-/Chart-Bridge-Abnahme AP-16, lokales Vendor-Chart.js |
| 3 | `Theme/chart-tests/index copy.html` | C — Legacy | ignoriert | Bar Color Permutation Suite — **byte-identisch mit #6** |
| 4 | `Theme/chart-tests/index-balken2.html` | C — Legacy | ignoriert | Edge-Case-Stresstest (Balken) |
| 5 | `Theme/chart-tests/index._linien3.html` | C — Legacy | ignoriert | Daily-Interval-Stresstest (Linie) |
| 6 | `Theme/chart-tests/index_balken_CI.html` | C — Legacy | ignoriert | Bar Color Permutation Suite — **byte-identisch mit #3** |
| 7 | `Theme/chart-tests/index3.html` | C — Legacy | ignoriert | Tooltip & Context Stresstest |
| 8 | `Theme/chart-tests/index_alles test.html` | C — Legacy | ignoriert | „Master Test Suite V10.7.0" — Linie/Balken/Torte/Security |
| 9 | `Theme/chart-tests/index_alt.html` | C — Legacy | ignoriert | Historie/Multibalken/Singlebalken, „Phase 5 Ready" |
| 10 | `Theme/chart-tests/index_balken.html` | C — Legacy | ignoriert | Bar-Chart-Edge-Cases |
| 11 | `Theme/chart-tests/index_balken_alle.html` | C — Legacy | ignoriert | Bar Color Permutation Suite — Full List (20 CSVs) |
| 12 | `Theme/chart-tests/index_data_anchored.html` | C — Legacy | ignoriert | AP-10 Data-Anchored Ticks (Quarterly/Monthly) |
| 13 | `Theme/chart-tests/index_irregular_bar_ap13.html` | C — Legacy | ignoriert | AP-13 PERIOD-Track irreguläre Daten + Ranking |
| 14 | `Theme/chart-tests/index_irregular_xaxis.html` | C — Legacy | ignoriert | AP-12 X-Achsen-Stresstest irreguläre Daten |
| 15 | `Theme/chart-tests/index_linen_2.html` | C — Legacy | ignoriert | 25-Year-Interval-Stresstest — **1 gebrochene CSV-Referenz** |
| 16 | `Theme/chart-tests/index_linie_CI.html` | C — Legacy | ignoriert | Line Color Permutation Suite |
| 17 | `Theme/chart-tests/index_linien.html` | C — Legacy | ignoriert | Edge Case Testing (Linie) |
| 18 | `Theme/chart-tests/index_minmax.html` | C — Legacy | ignoriert | Y-Achse V2.0 MinMax Edge Cases |
| 19 | `Theme/chart-tests/index_tool_tip.html` | C — Legacy | ignoriert | Tooltip-CSV Test Suite (Linie + Balken) |
| 20 | `Theme/chart-tests/index_torte_CI.html` | C — Legacy | ignoriert | Pie Color Permutation Suite |
| 21 | `Theme/index.html` | **C-artig, aber tracked** | tracked, clean | FwSmartXAxis V8.3 Density-Matrix (Calendar Ticks) — CDN, kein Token-Layer, hängt an 15 ignorierten CSVs |
| 22 | `docs/design-system/referenz/janitor-test.html` | unklar/fachfremd | tracked, clean | Test der Markdown-„Janitor"-Transformation — **2 gebrochene Asset-Referenzen** |
| 23 | `docs/design-system/archiv/boxen-stress-test-referenz.html` | unklar/fachfremd | tracked, clean | Design-System „Master Design Check" — **1 gebrochene Asset-Referenz** |

## 5. Technische Merkmalsmatrix der Test-HTMLs

| Datei | Chart.js | CSS-Kaskade | Szenarien (H1+H2) | Hex-Farben | Externe Deps |
|---|---|---|---|---|---|
| `app.test.html` | CDN (`jsdelivr`) | `tokens.css` + `app.css` | 34 | 14 | CDN Chart.js + 1 absichtlicher Fake-Fremd-URL (Testfall H) |
| `AP-16-abnahme.html` | **lokal** `vendor/chart.umd.min.js` | `screen.css` (importiert `tokens.css`) | 6 | 8 (nur Harness-Chrome, `var(--…)`) | keine |
| `index copy.html` | CDN | keine | 4 | 64 | CDN |
| `index-balken2.html` | CDN | keine | 1 | 30 | CDN |
| `index._linien3.html` | CDN | keine | 1 | 27 | CDN |
| `index3.html` | CDN | keine | 3 | 48 | CDN |
| `index_alles test.html` | CDN | keine | 5 | 73 | CDN |
| `index_alt.html` | CDN | keine | 4 | 32 | CDN |
| `index_balken.html` | CDN | keine | 1 | 23 | CDN |
| `index_balken_CI.html` | CDN | keine | 4 | 64 | CDN |
| `index_balken_alle.html` | CDN | keine | 21 | 49 | CDN |
| `index_data_anchored.html` | CDN | keine | 3 | 45 | CDN |
| `index_irregular_bar_ap13.html` | CDN | keine | 3 | 64 | CDN |
| `index_irregular_xaxis.html` | CDN | keine | 3 | 60 | CDN |
| `index_linen_2.html` | CDN | keine | 1 | 19 | CDN |
| `index_linie_CI.html` | CDN | keine | 4 | 61 | CDN |
| `index_linien.html` | CDN | keine | 1 | 24 | CDN |
| `index_minmax.html` | CDN | keine | 17 | 41 | CDN |
| `index_tool_tip.html` | CDN | keine | 6 | 78 | CDN |
| `index_torte_CI.html` | CDN | keine | 4 | 67 | CDN |
| `Theme/index.html` | CDN | keine | 7 | 62 | CDN |
| `janitor-test.html` | – | `screen.css` (Pfad **gebrochen**) | 10 | 29 | `cdn.tailwindcss.com` |
| `boxen-stress-test-referenz.html` | – | `screen.css` (Pfad **gebrochen**) | 1 | 14 | `cdn.tailwindcss.com` |

Wichtigste Achse (deckungsgleich mit §3.1): **20 von 21 chart-relevanten Testseiten laden Chart.js vom CDN**, nur `AP-16-abnahme.html` lokal. Keine der 21 nutzt eine gemischte/andere Chart.js-Version — es gibt keinen Versionskonflikt, nur einen Lade-Quellen-Konflikt (CDN vs. lokal), plus die 2 design-system-Seiten laden Tailwind vom CDN (anderer Zweck, kein Chart.js).

## 6. Szenario-Rohinventar

Granularität: aus `<h1>`/`<h2>`-Struktur deterministisch extrahiert (kein Volltext gelesen, siehe Methodik §Vorgabe Phase C). Für Legacy-Dateien ohne mehrere H2 ist „1 Szenario" die gesamte Seite (durchgängig ein Testzweck laut Titel).

**`app.test.html` (34 Szenarien A–AF)** — vollständig benannt, deckt CSVParser-Fehlerfälle (B,C,J–R), XSS/Security (E,H,I), Slider/Rate-Interaktion (S,W), vollen Screen-Flow 1→4 (V,X), A11y (AD), AssumptionsBox (Y), VertikaleLinie (Z), PrimaryCta (AA), FwChartTextPlugin isoliert (AF). Keine offensichtliche interne Überschneidung — jeder Buchstabe adressiert einen anderen Edge-Case.

**`AP-16-abnahme.html` (6 Szenarien)** — Website-Elemente-Kaskade, Balken-Auto-Palette, Balken-Vorzeichen-Ampel, Torte+Aggregation, Ergebnislinie-Plugin, Annotation-Pulse-Plugin. Keine Überschneidung mit app.test.html (App- vs. Engine-Ebene) oder mit Legacy-Kat-C (einzige Seite mit Token-Kaskade + Live-Indikatoren).

**Legacy Kat C (18 Dateien + `Theme/index.html`)** — Zweck pro Datei aus Titel/H1 eindeutig ableitbar (Tabelle §4/§5). Mögliche Überschneidungen zwischen den Dateien (nicht abschließend geklärt, da Volltext nicht gelesen — Empfehlung für TESTENV-1b):

| Überschneidungsgruppe | Dateien | Befund |
|---|---|---|
| Bar/Line/Pie „Color Permutation Suite" | `index copy.html`, `index_balken_CI.html`, `index_linie_CI.html`, `index_torte_CI.html` | 3 der 4 nutzen exakt dieselben CSVs (`test_data-Liniendiagramm.csv`, `scenario_7_bigdata_ISO.csv`, `bd_ranking_stress.csv`) mit demselben H2-Muster — **offensichtliche thematische Überschneidung**, nur Chart-Typ unterscheidet (2 sind zusätzlich byte-identisch, siehe §9). `index_torte_CI.html` nutzt andere CSVs (Torte-spezifisch) — geringere Überschneidung.
| „Master Test Suite" vs. Einzeltests | `index_alles test.html` | referenziert 13 CSVs, die einzeln auch in `index_balken.html`, `index_linien.html`, `index_irregular_*` vorkommen — **mögliche Überschneidung**, könnte eine „Sammelseite" sein, die Einzeltests dupliziert (nicht abschließend geklärt). |
| MinMax-Familie | `index_minmax.html` | 17 Szenarien, eigenständige CSV-Familie (`minmax_*`), keine Überschneidung mit anderen Dateien erkennbar. |
| Tooltip-Familie | `index_tool_tip.html`, `index3.html` | beide nutzen `tool_tip_*`/`tt_*`-Daten, unterschiedlicher Fokus (Tooltip-Suite vs. Tooltip&Context-Stresstest) — **mögliche Überschneidung**. |
| Balken-Vollständigkeitsliste | `index_balken_alle.html` | 20 CSVs, „Full List" — hoher Überschneidungsverdacht mit `index_balken.html`/`index_linen_2.html` (Teilmengen derselben `bd_*`-Familie). |

**`janitor-test.html` / `boxen-stress-test-referenz.html`** — 10 bzw. 1 Testfälle, thematisch reine Design-System-/Markdown-Tooling-Tests, keine Überschneidung mit Chart-Engine-/App-Testlandschaft.

Keine Endentscheidung (KEEP/MERGE/DELETE) getroffen — dies ist Aufgabe von TESTENV-1b.

## 7. Daten- und Fixture-Inventar

**91 testrelevante Datendateien geprüft**, gegliedert in 3 Lageklassen:

| Lageklasse | Pfad | Anzahl | Git-Status |
|---|---|---|---|
| App-spezifische Test-Fixture | `Apps/prokrastinations-preis/test-data/*.csv` | 7 | tracked, clean |
| Produktiver Datenbereich | `Theme/assets/data/b1/*` (2 CSV + 1 README) | 3 | tracked, clean |
| Legacy-/Engine-Test-Fixtures | `Theme/data/*` | 81 | **ignoriert** (ganzer Ordner) |

**Keine exakten Dubletten** (SHA-256-Vergleich über alle 91 Dateien: 0 Treffer) und **keine Namenskollisionen** (kein Dateiname mit unterschiedlichem Inhalt an zwei Orten).

**6 von 81 `Theme/data/`-Dateien fallen in eine von drei Sonderkategorien** (nicht homogen „verwaist" — korrigiert nach `TESTENV-1aR`):

**A. 4 im definierten HTML-Scope statisch unreferenzierte CSVs** (keine der 21 geprüften Testseiten verweist statisch darauf):
- `scenario_2_long_25y.csv`
- `tool_tip_pie_gatekeeper.csv`
- `tt_micro_precision_5d.csv`
- `tt_transition_weekly_20d.csv`

**B. 1 Manifest-/Notizdatei (keine CSV-Fixture)**:
- `Alle-Balkendiagramm-CSV.txt` — Namens-Manifestliste der `bd_*`-Serie (21 Zeilen, reine Notiz), zählt nicht als Fixture.

**C. 1 case-mismatched, tatsächlich referenzierte Datei (nicht verwaist)**:
- `scenario_6_decimals.csV` — wird real von `Theme/chart-tests/index_linien.html:97` (`data-csv="../data/scenario_6_decimals.csv"`) referenziert, nur mit abweichender Groß-/Kleinschreibung (Datei trägt `V`, Referenz `v`). Auf dem case-insensitiven Windows-Dateisystem funktioniert das; auf einem case-sensitiven System/CI würde die Referenz brechen. Siehe Fresh-Clone-/Case-Befund §11.

Alle übrigen 75 Dateien in `Theme/data/` sind von mindestens einer Legacy-Testseite referenziert.

`Theme/assets/data/b1/` (produktiv, Contract-geführt laut `docs/data/contracts/`) wird ausschließlich von `app.test.html` referenziert (1 Treffer: `msci-world-net-return-eur-monthly.csv`) — sauber getrennt von den Engine-Test-Fixtures, keine Vermischung von Produktiv- und Testdaten in diesem Fall bestätigt.

## 8. Abhängigkeits- und Referenzmatrix

Kanten (Quelle → Ziel), aggregiert:

- **App-Testseite → App-Code:** `app.test.html` → `./app.js` (ES-Modul) → (transitiv) Engine + Datenlayer. `app.test.html` → `./app.css` + `../../Theme/assets/css/tokens.css`.
- **Engine-Harness → Engine-Entry-Point:** `AP-16-abnahme.html` → `../assets/js/fw-chart-engine/index.js` (Modul) + `../assets/js/vendor/chart.umd.min.js` (lokal). Alle 18 Legacy + `Theme/index.html` → `../assets/js/fw-chart-engine/index.js` bzw. `./assets/js/fw-chart-engine/index.js` + CDN-Chart.js.
- **Datenreferenz → Datei:** 21 Testseiten → 81 `Theme/data/*.csv` + `Theme/assets/data/b1/*.csv` + `Apps/prokrastinations-preis/test-data/*.csv` — vollständig in §7 abgebildet; 2 Kanten zeigen ins Leere (§11).
- **`janitor-test.html`/`boxen-stress-test-referenz.html` → `screen.css`/`fw-janitor.js`:** Kanten zeigen auf nicht existierende Pfade (§11) — reale Datei liegt unter `Theme/assets/...`, referenziert wird `<repo-root>/assets/...` (fehlendes `Theme/`-Präfix).

## 9. Exakte Dubletten

**1 Dublettengruppe gefunden** (SHA-256-Vergleich über alle 23 HTML-Dateien):

| SHA-256 | Dateien |
|---|---|
| `2f612ca0162041fa75b137afe36335d776568f762d7cfcfdf2b1340ff1eafb85` | `Theme/chart-tests/index copy.html`, `Theme/chart-tests/index_balken_CI.html` |

Byte-identisch, gleiche Größe (6488 Bytes), gleicher Titel „FW Bar Color Permutation Suite". Wahrscheinlich eine Kopie unter neuem Namen ohne inhaltliche Änderung (Namens-Wildwuchs-Muster, siehe `TESTENV-1_harness-inventar_moderne-vs-legacy.md` §4).

**Keine weiteren Dubletten** unter den 23 HTML-Dateien, **keine Dubletten** unter den 91 Datendateien.

## 10. Ignorierte, unversionierte und Fresh-Clone-kritische Dateien

`.gitignore` (Z. 15–17): „Chart-Engine Dev-Ordner — nicht versionieren" → `Theme/data/` und `Theme/chart-tests/` vollständig ausgeblendet.

**Ein frischer Klon des Repositoriys hätte NICHT:**
- alle 19 Dateien in `Theme/chart-tests/` (inkl. `AP-16-abnahme.html`, der modernen Engine-Referenz),
- alle 81 Dateien in `Theme/data/`.

**Ein frischer Klon HÄTTE weiterhin** (weil tracked):
- `Apps/prokrastinations-preis/app.test.html` + seine 7 `test-data/*.csv` (vollständig lauffähig, keine Abhängigkeit auf ignorierte Pfade außer der einen absichtlichen 404-Testreferenz),
- `Theme/index.html` — **aber dessen 15 CSV-Referenzen liegen alle in `Theme/data/`**, das ignoriert ist. Statisch bestätigt: `Theme/index.html` ist im frischen Klon vorhanden, seine 15 Datenreferenzen sind es nicht. Die konkrete Browserwirkung (voraussichtlich unvollständiges/fehlerhaftes Laufzeitverhalten) ist eine **plausible, nicht browsergetestete Ableitung**, keine geprüfte Tatsache. **Das ist der einzige Fresh-Clone-Bruch bei einer tatsächlich versionierten Datei** — bisher in keiner der geprüften Vorinventuren dokumentiert.
- `docs/design-system/referenz/janitor-test.html` + `docs/design-system/archiv/boxen-stress-test-referenz.html` — beide tracked, aber ihre Asset-Referenzen sind bereits im aktuellen Arbeitsstand gebrochen (§11), unabhängig vom Klon-Zustand.

Damit bestätigt sich: **jede reale Browser-Ansicht der 19 „ignorierten" Testseiten funktioniert nur auf einem Arbeitsplatz, der die lokale, nicht versionierte `Theme/chart-tests/`+`Theme/data/`-Kopie bereits besitzt** (z. B. Alberts aktueller Stand). Ein zweiter Rechner oder ein CI-Checkout hätte dafür keine Grundlage.

## 11. Externe, absolute oder nicht auflösbare Pfade

Keine absoluten Windows-Pfade, keine UNC-Pfade, keine NAS-/Nextcloud-Erwähnungen in den 23 gescannten HTML-Dateien gefunden (0 Treffer über alle Regex-Scans).

**Gebrochene lokale Referenzen (real, nicht durch Test-Design beabsichtigt):**

| Datei | Referenz | Befund |
|---|---|---|
| `Theme/chart-tests/index_linen_2.html` | `../data/bd_daily_90d.csv` | Datei existiert nicht; vermutlich umbenannt zu `bd_kurz_daily_90d.csv` (in `Theme/data/` vorhanden) — Referenz nie nachgezogen. |
| `docs/design-system/referenz/janitor-test.html` | `../../../assets/css/screen.css`, `../../../assets/js/fw-janitor.js` | Beide Pfade lösen (3× `../` von `docs/design-system/referenz/`) auf `<repo-root>/assets/...` auf — es existiert kein `assets/`-Ordner auf Repo-Root-Ebene, real liegen beide Dateien unter `Theme/assets/...`. Fachfremd zum Chart-/App-Test-Scope (Design-System-Referenzseite), aber Namensmuster-Treffer aus dem Pflicht-Scope. |
| `docs/design-system/archiv/boxen-stress-test-referenz.html` | `../../../assets/css/screen.css` | identischer Bruch wie oben. |

**Von den Regex-Scannern nicht automatisch erkannt, aber real und relevant (Fresh-Clone-Groß-/Kleinschreibungs-Falle):**
`Theme/data/scenario_6_decimals.csV` (Datei, Großbuchstabe `V` am Ende) wird von `Theme/chart-tests/index_linien.html:97` als `../data/scenario_6_decimals.csv` (Kleinbuchstabe) referenziert. Auf dem aktuellen Windows-Dateisystem (case-insensitiv) unsichtbar und funktionsfähig; auf einem case-sensitiven Dateisystem (Linux-CI, Docker, macOS default-sensitiv je nach Konfiguration) würde die Referenz brechen. Zusätzlich ohnehin durch `.gitignore` in einem frischen Klon gar nicht vorhanden (§10) — doppelt fragil.

**Absichtlich gebrochene/externe Referenzen (Testdesign, kein Fund):** `app.test.html` enthält bewusst `./test-data/nonexistent.csv` (Testfall I — 404-Verhalten) und `https://evil.example.com/data.csv` (Testfall H — Domain-Lock-Validierung). Beide sind Prüfobjekte, keine Doku-Lücke.

## 12. Bestätigte Widersprüche zu früheren Annahmen

Bezug auf die Startannahmen aus §Fachlicher Kontext dieses Prompts:

| Startannahme | Ergebnis |
|---|---|
| „17 Legacy-Engine-Testseiten unter `Theme/chart-tests/*.html`" | **Teilweise korrigiert** — real sind es 18 Legacy-Dateien + `AP-16-abnahme.html` (modern) = 19 Dateien im Ordner. Die Startannahme „17" stammt unverändert aus der Prosa der Vorinventur (§3.1), deren eigene Tabelle bereits 18 Namen listet — Zähldifferenz jetzt gegen die reale Datei aufgelöst. |
| „Legacy-Seiten laden Chart.js vom CDN, Inline-CSS hartcodiert, keine Token-Kaskade" | **Bestätigt**, ausnahmslos für alle 18. |
| „Moderne App-Testseite lädt `tokens.css` + `app.css`, Chart.js noch CDN" | **Bestätigt.** |
| „`Theme/index.html` ist möglicherweise selbst eine Testseite, kein neutrales Portal" | **Bestätigt und präzisiert**: Es ist eindeutig eine Kat-C-Testseite (FwSmartXAxis-Density-Matrix-Suite), technisch identisch zum Legacy-Profil — mit dem Unterschied, dass sie (anders als ihre 18 Geschwister) **tracked**, also versioniert ist. Das erzeugt den in §10 beschriebenen Fresh-Clone-Bruch. |
| „`Theme/chart-tests/` und `Theme/data/` können durch `.gitignore` ausgeblendet sein" | **Bestätigt**, vollständig (nicht nur teilweise). |
| „App-spezifische Testdaten unter `Apps/prokrastinations-preis/test-data/`" | **Bestätigt**, 7 Dateien, alle tracked. |
| „Produktive externe CSV-Daten unter `Theme/assets/data/b1/`" | **Bestätigt**, 2 CSV + README, tracked, sauber getrennt von Test-Fixtures. |
| „Es kann zusätzliche alte Testdaten außerhalb der versionierten Struktur … NAS, Nextcloud, absolute Windows-Pfade geben" | **Nicht bestätigt** innerhalb des geprüften Scopes — 0 Treffer für absolute Pfade/UNC/NAS/Nextcloud in allen 23 HTML-Dateien. Kein Hinweis auf einen externen Test-Datenbestand außerhalb des Repositorys wurde gefunden (siehe aber §13 zu den Scope-Grenzen dieser Aussage). |

Zusätzlich, **nicht in den Startannahmen enthalten, aber real gefunden** (siehe §1 Kurzurteil): exakte HTML-Dublette (§9), gebrochene CSV-Referenz (§11), Groß-/Kleinschreibungs-Falle (§11), 4 statisch unreferenzierte Fixtures + 1 Manifest-Notiz + 1 case-mismatched referenzierte Datei (§7), 24 von 25 App-Ordnern ohne `app.test.html` (§14), 2 fachfremde Design-System-Seiten mit Namensmuster-Treffer und eigenen gebrochenen Referenzen (§11).

## 13. Offene Lücken und bewusst nicht untersuchte Bereiche

- **Volltext-Lesen der 18 Legacy-Dateien** wurde bewusst nicht durchgeführt (Vorgabe Phase C: keine Volltextkopie, nur Kopf-/Strukturextraktion). Die in §6 genannten „möglichen Überschneidungen" sind daher Hypothesen aus H1/H2-/CSV-Referenz-Mustern, keine bestätigten Duplikat-Feststellungen auf Code-Ebene.
- **Keine Prüfung von Nicht-HTML-Testartefakten** (z. B. ob es weitere, nicht `.html`-basierte Testmechanismen gibt) — außerhalb des in §Scope definierten Auftrags.
- **Keine Prüfung externer Speicherorte** (NAS-Ordner außerhalb des Repository-Pfads, persönliche Verzeichnisse) — laut Vorgabe explizit verboten, sofern kein Repository-Verweis dorthin zeigt; ein solcher Verweis wurde nicht gefunden.
- **`docs/design-system/`-Domäne insgesamt nicht vollständig inventarisiert** — nur die 2 Dateien mit direktem Namensmuster-Treffer (`*test*.html`) wurden erfasst; die übrigen 5 Referenz-/Demo-Seiten in `docs/design-system/referenz/` (`content-page-demo.html` etc.) tragen kein Testmuster im Namen und wurden entsprechend Scope 6.3 nicht geöffnet.
- **`Apps/regulatorik-dashboard`, `Apps/rollierende-sparplaene`, `Apps/weltkarte-etf-indizes`** enthalten laut vorheriger Anamnese (`AP-prokrast-14aR`, Memory `project_ci_theme_bridge`) eigene nicht-integrierte Standalone-HTML-Prototypen — diese tragen keine Test-Namensmuster und wurden hier bewusst nicht erneut geöffnet (fachfremd zu TESTENV-1a, keine Testseiten im engeren Sinn).
- **Zweck einzelner H2-Abschnitte in `index_alles test.html`, `index_balken_alle.html` u. Ä.** wurde nicht bis auf Formel-/Assertion-Ebene verifiziert — nur Überschrift/CSV-Referenz. Für TESTENV-1b reicht dies als Ausgangspunkt, eine abschließende Szenario-Deduplizierung erfordert tieferes Lesen einzelner Blöcke.

Keiner dieser Punkte wurde geraten — wo eine Aussage nicht belegbar war, ist sie hier als offen benannt.

## 14. Eingangsmaterial für TESTENV-1b

Für die KEEP/MERGE/DELETE-Klassifizierung relevant:

1. **Dublette klären**: `index copy.html` vs. `index_balken_CI.html` — einer der beiden Namen ist vermutlich der historisch „richtige", der andere eine vergessene Kopie.
2. **5 mögliche Überschneidungsgruppen** aus §6 einzeln prüfen (Color-Permutation-Familie, Master-Suite vs. Einzeltests, Tooltip-Familie, Balken-Vollständigkeitsliste).
3. **`Theme/index.html`-Sonderstatus entscheiden**: bleibt es tracked (und muss dann seine Daten-Abhängigkeit lösen, z. B. eigene kleine CSV-Teilmenge versionieren) oder wird es analog zu seinen Geschwistern behandelt (ignoriert oder migriert)?
4. **4 echte, statisch unreferenzierte `Theme/data/`-Dateien** (`scenario_2_long_25y.csv`, `tool_tip_pie_gatekeeper.csv`, `tt_micro_precision_5d.csv`, `tt_transition_weekly_20d.csv`): löschen, einer Testseite zuordnen, oder bewusst als Reserve behalten? Die zusätzlich als „auffällig" gemeldete `scenario_6_decimals.csV` gehört **nicht** in diese Löschprüfung — sie wird real von `index_linien.html` genutzt (siehe Punkt 5).
5. **Groß-/Kleinschreibungs-Fehler**: `Theme/chart-tests/index_linien.html:97` referenziert `scenario_6_decimals.csv`, real existiert nur `Theme/data/scenario_6_decimals.csV` — bei Migration die Referenz oder den Dateinamen angleichen, Datei dabei nicht löschen.
6. **Gebrochene Referenz** `bd_daily_90d.csv` in `index_linen_2.html` — bei Migration korrigieren oder Datei als „kaputt, nie bemerkt" archivieren.
7. **F-4 aus AP-18** (soll `AP-16-abnahme.html` versioniert werden?) erneut adressieren — jetzt mit vollständigem Kontext, dass der gesamte restliche `chart-tests/`-Ordner ebenfalls betroffen ist.
8. **App-Fabrik-Rollout-Lücke**: 24 von 25 App-Ordnern ohne `app.test.html` trotz `APP_FOLDER_STRUCTURE.md`-Pflichtvorgabe — Scope-Frage für die im BACKLOG (`TESTENV-1`) erwähnte „Pro-App-Harness"-Initiative.
9. **`janitor-test.html`/`boxen-stress-test-referenz.html`**: fachlich außerhalb des Chart-Engine-/App-Testscopes, aber mit echten gebrochenen Referenzen — separat an das Design-System-Team/-Backlog zurückgeben statt in TESTENV-1b mitzuführen (unterschiedliche Domäne).
10. **Vollständige Rohdaten dieses Scans** (SHA-256, Größen, alle Kanten) liegen als strukturierte Zwischenablage vor und können auf Anfrage für TESTENV-1b erneut erzeugt werden (deterministisches Python-Skript, außerhalb des Repositorys, nicht Teil dieses Commits).

## 15. Scope-QA

- Kein Chart.js ausgetauscht, kein CDN-Verweis ersetzt, keine Token-Kaskade ergänzt, keine Dateinamen bereinigt, keine Testseiten zusammengeführt oder gelöscht, kein neuer Harness angelegt, keine `tests/`-Struktur gebaut, keine produktiven B1-Daten ergänzt, keine externen Testdaten importiert, `.gitignore` nicht geändert, keine Architekturentscheidung getroffen, keine Browser-Abnahme behauptet.
- Kein Commit, kein Push, kein Abschlussritual durchgeführt.
- Einziger Write-Vorgang: diese Ergebnisdatei.
- Temporäre Analyseartefakte (Python-Skript + JSON-Zwischenergebnis) liegen ausschließlich im Betriebssystem-Temp-Verzeichnis der Sitzung, nicht im Repository.

## 16. Wiederlesen / Datei-Wahrheit

Nach dem Schreiben durchgeführt (siehe §Pflicht-QA-Protokoll, wird im Anschluss an diese Datei im Chat dokumentiert):
- `git diff --name-status` geprüft: nur diese Ergebnisdatei neu (plus die vorbestehende, sitzungseigene `session-log.md`-Änderung, die nicht Teil dieses APs ist).
- Ergebnisdatei vollständig neu vom Datenträger gelesen und gegen die realen 23 HTML- und 91 Datendateien stichprobenartig zurückverglichen (Counts, mindestens 3 Datenreferenzen, mindestens 2 Dubletten-/Verwaisungsbefunde, 1 Fresh-Clone-kritische Kante — alle erfüllt, siehe Chat-Protokoll).
- Keine KEEP/MERGE/DELETE-Endentscheidung im Text gefunden (Gegenprobe: Grep auf „KEEP", „MERGE", „DELETE" — nur in §14 als Aufzählung offener *Fragen*, keine Entscheidung).
- Ungeklärte Punkte sind durchgängig als „nicht abschließend geklärt" / „nicht belegbar" markiert (§6, §13).

## 17. Nächster AP

**Nach TESTENV-1aF, TESTENV-1aF2, TESTENV-1aF3 und TESTENV-1aF4: `TESTENV-1aFR` — die vollständige Korrekturkette unabhängig gegen Review und reale Dateien bestätigen.**

Ausdrücklich **nicht** der nächste AP: `TESTENV-1b`, Harness-Migration, Löschen alter Dateien, Verschieben von CSVs, Aufbau von `tests/`, Änderung von `.gitignore`, Ghost-Harness oder Commit.

Weiter nur nach Alberts OK.
