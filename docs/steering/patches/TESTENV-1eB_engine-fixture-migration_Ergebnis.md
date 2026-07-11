Stand: 2026-07-11 | Session: TESTENV-1eB | Geändert von: Claude (Sonnet)

# TESTENV-1eB – Gebündelte Engine-/Fixture-Migration

## 1. Status und Kurzurteil

**Status: GRÜN**

Alle 13 fest vorgegebenen Engine-Zielseiten migriert, 2 neue Testseiten (Security-Merge,
Smart-Update-Auslagerung) gebaut, 76 Fixtures nach `tests/fixtures/engine/` verschoben (SHA-256
vor/nach bestätigt, Case-Mismatch `scenario_6_decimals.csV` kanonisch behoben), 2 eng begrenzte
Checker-/Standard-Erweiterungen umgesetzt und mit 4 fokussierten Tests bestanden, 7 freigegebene
DELETE-Quellen + 4 Orphan-CSVs gelöscht. `python tools/check-test-pages.py` meldet **GRÜN, 16
dauerhafte Testseiten, 0 Strukturfehler** (App-Testseite eingeschlossen — ihre vormals 2
dokumentierten Befunde sind durch die neue Missing-App-ID-Ausnahme jetzt strukturell sauber statt
nur „bewusst akzeptiert"). Kein Produktionscode geändert.

## 2. Quell-/Zielmatrix (13 feste Migrationen)

| Quelle | Ziel | Testfälle |
|---|---|---|
| `Theme/chart-tests/AP-16-abnahme.html` | `tests/engine/ci-theme-bridge.test.html` | 5 (Abschnitt 1 bewusst nicht als Testfall markiert, reiner CSS-Demo ohne Chart-Card) |
| `Theme/chart-tests/index_balken_CI.html` | `tests/engine/bar-ci.test.html` | 3 (je 3 Charts) |
| `Theme/chart-tests/index_linie_CI.html` | `tests/engine/line-ci.test.html` | 3 (je 3 Charts) |
| `Theme/chart-tests/index_torte_CI.html` | `tests/engine/pie-ci.test.html` | 3 (je 3 Charts) |
| `Theme/chart-tests/index._linien3.html` | `tests/engine/line-short-series.test.html` | 5 |
| `Theme/chart-tests/index3.html` | `tests/engine/tooltip-context.test.html` | 3 |
| `Theme/chart-tests/index_balken_alle.html` | `tests/engine/bar-all.test.html` | 20 + 1 Sonderfall-Übernahme = 21 |
| `Theme/chart-tests/index_irregular_bar_ap13.html` | `tests/engine/irregular-bar.test.html` | 8 (B0–B7) |
| `Theme/chart-tests/index_irregular_xaxis.html` | `tests/engine/irregular-line.test.html` | 7 (nur Abschnitt A, siehe §7) |
| `Theme/chart-tests/index_linien.html` | `tests/engine/line-scenarios.test.html` | 7 |
| `Theme/chart-tests/index_minmax.html` | `tests/engine/minmax.test.html` | 14 |
| `Theme/chart-tests/index_tool_tip.html` | `tests/engine/tooltip.test.html` | 5 |
| `Theme/index.html` | `tests/engine/cadence-density.test.html` | 22 |

Keine Zielkollision, keine Quelldoppelung (Python-Assertion vor dem Write geprüft). Migration ist
echtes **Verschieben**: die 12 Quelldateien unter `Theme/chart-tests/` und `Theme/index.html`
existieren nach diesem AP nicht mehr (siehe §9 zur Interpretation „migrieren"/„verschieben" aus
`TESTENV-1d` §E Punkt 2 und diesem Auftrag §3).

## 3. Standardisierung

Jede Zielseite trägt jetzt `data-fw-test-template="1"`, lädt `tokens.css` + Shared CSS/JS
(`../../Theme/assets/css/tokens.css`, `../shared/test-page.css`, `../shared/test-page.js`) und das
lokale Vendor-Chart.js (`../../Theme/assets/js/vendor/chart.umd.min.js`) statt CDN. Bestehende
lokale `<style>`-Blöcke (Seiten-Chrome, Farb-Badges) blieben unverändert erhalten — sie
überschreiben keine Shared-CSS-Klassen, nur Legacy-Klassenselektoren. Jede natürliche
Testfall-Einheit (bestehende `<h2>`/`<h3>`/`<h4>`-Gliederung bzw. `.container`-Block, je nach
Quelldatei) wurde zu `<section class="fw-test-case" data-fw-test-case>` mit synthetisiertem
`data-fw-expected-behavior`-Block (aus vorhandenem `<p>`-/`.expect`-Text, nichts umformuliert, keine
Testlogik entfernt) und `.kg-card`-Wrapper um jede `.financial-chart-module`-Card. Kein Testfall,
kein Chart und keine Erwartung ging verloren — Fach-/Kommentartext, Titel, `data-csv`/`data-colors`/
`data-options`-Attribute 1:1 übernommen, nur `../data/`→`../fixtures/engine/` umgeschrieben.

## 4. Zwei neue Testseiten

### 4.1 Security-Gatekeeper (`tests/engine/security-gatekeeper.test.html`)

4 Testfälle 1:1 aus `Theme/chart-tests/index_alles test.html` Abschnitt 4 übernommen: Graceful
Degradation (4.1), Invalid Option Injection (4.2), XSS Protection (4.3), Farb-Gatekeeper (4.4).
Abschnitte 1–3 (Linie/Balken/Torte) der Ursprungsdatei **nicht** übernommen (bereits in den
CI-Suiten/`bar-all.test.html` abgedeckt, `TESTENV-1d` §C). Beide referenzierten CSVs
(`scenario_5_flat.csv`, `bd_single_year.csv`) waren bereits Teil der migrierenden Fixture-Menge —
keine zusätzliche Fixture nötig.

### 4.2 Smart-Update (`tests/engine/chart-text-plugin-smart-update.test.html`)

Szenario AF vollständig aus `Apps/prokrastinations-preis/app.test.html` ausgelagert: Überschrift,
Erwartung, `.kg-card`, `[data-fw-appchart]`-Container, Button, direkter `ChartEngine`-Aufruf,
Kommentare und Testabsicht unverändert übernommen (nur Importpfad `../assets/js/...` →
`../../Theme/assets/js/...` angepasst, da Ordnertiefe identisch zu `Apps/{slug}/` ist). Danach aus
der App-Testseite entfernt.

## 5. App-Testseite: 32 → 31 + Szenario C markiert

`Apps/prokrastinations-preis/app.test.html` hat nach Entfernen von Szenario AF **31**
`data-fw-test-case`-Elemente (geprüft: `grep -c data-fw-test-case` → 31). Kein anderer Testfall
verändert. Zusätzlich erhält Szenario C (Testfall #3, „Fehlender Slug") jetzt das neue Attribut
`data-fw-test-allow-missing-app-id` — der Checker meldet diesen bewussten Negativtest damit nicht
mehr als Strukturfehler.

## 6. Checker-/Standard-Erweiterungen

`docs/testing/TEST_PAGE_STANDARD.md` (Standard-Version 1 → 2):

- **§10.2 (neu):** `data-fw-test-allow-missing-app-id` — testfalllokaler, wertloser Marker; erlaubt
  genau eine `.fw-app` mit bewusst fehlendem/leerem `data-fw-app` je markiertem Testfall. Reine
  Präsenzprüfung (kein Wertevergleich wie bei `data-fw-test-allow-missing-ref`, da kein
  Datei-/Pfadbezug besteht).
- **§12 Punkt 7 (erweitert):** unter `tests/engine/` ist `[data-fw-appchart]` als dritter zulässiger
  Produktionscontainer erlaubt (reiner Engine-/Plugin-Regressionstest ohne Ghost-Card, Bestandsmuster
  seit `AP-16`/`AP-prokrast-03d`). Außerhalb `tests/engine/` bleibt es ein Strukturfehler.

`tools/check-test-pages.py`: neue Konstante `MISSING_APP_ID_ATTR`, neue Funktion
`validate_allow_missing_app_id_markers()` (analog zu `validate_allow_missing_markers()`, aber ohne
Wertevergleich), `validate_test_page()` erhält Parameter `is_engine: bool`
(`validate_repository()` setzt ihn aus `group == "Engine"`), Container-Prüfung akzeptiert
`[data-fw-appchart]` nur wenn `is_engine`, „ohne data-fw-app"-Meldung wird für per Marker
freigegebene `.fw-app`-Knoten ausgenommen.

**4 fokussierte Checker-Tests** (temporär in `tests/scratch/`, nach Prüfung wieder entfernt):

| # | Fall | Ergebnis |
|---|---|---|
| 1 | Marker + wirklich fehlendes `data-fw-app` | ✅ zulässig (0 Findings) |
| 2 | Marker + vorhandenes `data-fw-app` | ✅ Fehler erkannt („Marker entfernen") |
| 3 | `[data-fw-appchart]` unter `tests/engine/` | ✅ zulässig (0 Findings) |
| 4 | `[data-fw-appchart]` außerhalb `tests/engine/` | ✅ Fehler erkannt (fehlender Produktionscontainer) |

Bestehende Checkerlogik nicht vollständig neu getestet — normaler Repo-Lauf (GRÜN, s. §8) plus
diese 4 Fälle wie im Auftrag vorgesehen.

## 7. Trimmung: `irregular-line.test.html`

`index_irregular_xaxis.html` Abschnitt B (PERIOD/Bar, B1–B7) wurde bei der Migration **nicht**
übernommen — 88–100 % Überlappung mit `irregular-bar.test.html` (`TESTENV-1d` §B). Abschnitt A
(SNAPSHOT/Line, A1–A7) vollständig erhalten. Kein Dateiverlust, reiner Inhaltstrimm wie in
`TESTENV-1d` §D vorgesehen.

## 8. Fixtures

76 Fixtures per SHA-256-geprüfter Kopie+Löschung von `Theme/data/` nach `tests/fixtures/engine/`
verschoben (Report mit allen 76 Hashes im Scratchpad dieser Sitzung). Darunter:

- **75** aus den 13 Zielseiten + Security-Merge referenziert.
- **1 zusätzlich**: `test_data_singlebalken.csv` — auf Alberts Anweisung während der Dry-run-Phase
  zusammen mit ihrer Card aus `index_alt.html` in `bar-all.test.html` übernommen (§16.2-Klärung
  in der Session), dadurch kein Orphan mehr.
- `scenario_6_decimals.csV` (Case-Mismatch, `TESTENV-1a` §11) kanonisch als `scenario_6_decimals.csv`
  abgelegt; einzige reale Referenz (`line-scenarios.test.html`) nutzte bereits Kleinschreibung —
  kein Referenztext-Änderung nötig, nur der Dateiname wurde korrigiert.

`Theme/data/` enthält danach nur noch die 4 freigegebenen Orphan-CSVs (vor Löschung) und
`Alle-Balkendiagramm-CSV.txt` (unberührte Notiz, kein Fixture).

## 9. Löschungen

**7 freigegebene DELETE-Quellen** (`TESTENV-1d` §B + Security-Merge-Folge):
`index copy.html`, `index-balken2.html`, `index_alt.html`, `index_balken.html`,
`index_data_anchored.html`, `index_linen_2.html`, `index_alles test.html`.

**12 migrierte Quellen** unter `Theme/chart-tests/` + `Theme/index.html` (siehe §2-Matrix) —
entfernt, da „migrieren"/„verschieben" (Auftrag §3, `TESTENV-1d` §E Punkt 2: „… nach
`tests/engine/` **verschieben**") als echte Verlagerung gelesen wurde, nicht als Kopie. Beide
Ordner (`Theme/chart-tests/`, `Theme/data/`) sind vollständig `.gitignore`-geführt (`.gitignore`
Zeilen 16–17) — diese Löschungen erzeugen daher **keinen** Git-Diff, sind aber reale
Dateisystem-Operationen, für Fixtures per SHA-256 nachgewiesen. Falls diese Lese-Interpretation
nicht Alberts Absicht war: alle 12 Dateien sind ausschließlich über die migrierten Zielseiten in
`tests/engine/` inhaltlich wiederherstellbar, nichts ist inhaltlich verloren.

**4 Orphan-CSVs** (`TESTENV-1d` §D, repo-weit auf Nichtverwendung geprüft — einzige Fundstellen
außerhalb `Theme/data/` waren Fließtext in `PROJECT-STATUS.md`/session-log, kein echter
Verbraucher): `scenario_2_long_25y.csv`, `tool_tip_pie_gatekeeper.csv`, `tt_micro_precision_5d.csv`,
`tt_transition_weekly_20d.csv`.

`index_linen_2.html` vor Löschung geprüft (Auftrag §7.2): enthielt entgegen dem irreführenden
Dateinamen **keinen einzigen** Line-Testfall — alle 5 Testfälle waren `data-type="bar"`. 4/5 CSVs
zu 100 % in `bar-all.test.html` enthalten, der 5. (`bd_daily_90d.csv`) referenzierte eine real nicht
existierende Datei (bestätigt gebrochen, `TESTENV-1a` §11). Kein Löschverlust.

## 10. Checker-/Launcher-Ergebnis

```text
python tools/check-test-pages.py            → TESTSEITEN-STRUKTUR: GRUEN, 16 Testseiten, 0 Fehler
python tools/check-test-pages.py --write-index → GRUEN, 16 Testseiten, 0 Fehler, tests/index.html erzeugt
python tools/check-test-pages.py (erneut)    → GRUEN, 16 Testseiten, 0 Fehler (idempotent)
git diff --check                              → keine Konflikt-/Whitespace-Fehler
```

Launcher (`tests/index.html`): 1 App-Eintrag + 15 Engine-Einträge, keiner mit
„(Strukturfehler)"-Zusatz. Tooling/Ghost weiterhin leer (kein Scope dieses APs).

## 11. Scope-QA

- Geändert: `Apps/prokrastinations-preis/app.test.html`, `docs/testing/TEST_PAGE_STANDARD.md`,
  `tools/check-test-pages.py`, `tests/index.html` (nur via `--write-index`).
- Neu: 15 Dateien unter `tests/engine/`, 76 Fixtures unter `tests/fixtures/engine/`, diese
  Ergebnisdatei.
- Gelöscht: 7 freigegebene DELETE-Quellen, 12 migrierte Quellen (`Theme/chart-tests/` +
  `Theme/index.html`, gitignored), 4 Orphan-CSVs.
- Unberührt: beide OUTSIDE-Seiten (`docs/design-system/referenz/janitor-test.html`,
  `docs/design-system/archiv/boxen-stress-test-referenz.html`) — `git status --short` dafür leer.
  `Apps/prokrastinations-preis/test-data/*`, `Theme/assets/data/b1/*`,
  `Alle-Balkendiagramm-CSV.txt` — unberührt. Kein Produktionscode geändert.
- Stray-Artefakt `tools/__pycache__/` (durch eigenen Checker-Import bei den 4 fokussierten Tests
  entstanden) wieder entfernt.
- `git status --short` zeigt final: 6 modifizierte/gelöschte Dateien (inkl.
  `.claude/learning/session-log.md`, Session-Start-Eintrag) + 2 neue Ordner
  (`tests/engine/`, `tests/fixtures/`). `Archiv/Chroniken/chronist-v1/CHRONIK-2026-07-11-ci-font-migration.md`
  ist ein unberührter, bereits vor diesem AP vorhandener untracked Fund — nicht Teil dieses APs.
- Kein Commit (Freigabe liegt bei Albert).

## 12. Offener Punkt

Die Interpretation „migrieren = verschieben" (§9, 12 gelöschte Alt-Quellen) ist die einzige nicht
wörtlich im Auftrag als Löschliste benannte Aktion dieses APs. Fachlich naheliegend (Auftrag §3
nennt „Quelle → Ziel", `TESTENV-1d` §E Punkt 2 sagt explizit „verschieben") und ohne Inhaltsverlust
(alles liegt migriert in `tests/engine/` vor), aber ausdrücklich zur Kenntnisnahme markiert, falls
Albert eine andere Absicht hatte.

## 13. Nächster Schritt

`TESTENV-1f` — einmaliges Browser-/Abschlussgate über alle 16 dauerhaften Testseiten (kein
Browser-Volltest in diesem AP).
