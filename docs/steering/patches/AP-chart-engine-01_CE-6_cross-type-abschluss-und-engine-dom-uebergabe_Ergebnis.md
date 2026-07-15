Stand: 2026-07-15 | Session: AP-chart-engine-01 / CE-6 + CE-6a (Sonnet) | Geändert von: Claude

# AP-chart-engine-01, CE-6: Cross-Type-Abschluss und Engine-DOM-Übergabe — Ergebnisprotokoll

Status: GRÜN — statische Prüfung und manuelle Albert-Browser-Abnahme vollständig bestanden.

## Ketten- und Scope-Gate

`git status --short` vor dem ersten Write dieses Laufs:

```text
 M .claude/learning/session-log.md
```

Auf Alberts explizite Anweisung ignoriert („Mach weiter, ignoriere session-log.md") — die Zeile stammt ausschließlich aus dem routinemäßigen `/start`-Warm-Start-Schritt (Kern-Invariante 5) der laufenden Session, kein Engine-, Code- oder Testartefakt.

`git log --oneline` bestätigt den jüngsten Commit `93c884f feat(AP-chart-engine-01 CE-5–CE-5d): Donut/Pie-Chart-Chrome mit Segment-Dämpfung — vollständig abgeschlossen und browserabgenommen`. Die CE-1–CE-5d-Kette inkl. DOC-02–DOC-04a ist damit committed; Voraussetzung erfüllt.

Nach diesem CE-6-Lauf ist außer der session-log-Zeile und dieser Ergebnisdatei kein weiterer Diff entstanden.

## Geänderte Dateien

Ausschließlich diese Ergebnisdatei (CE-6 und CE-6a zusammen). Kein Code, kein Test, kein Tool, keine Spec, keine App-Datei.

Fremdstand, weiterhin unverändert von CE-6/CE-6a: `.claude/learning/session-log.md` (routinemäßiger `/start`-Warm-Start-Eintrag der laufenden Session, kein Engine-Artefakt).

## Cross-Type-Rezept- und Zustandsnachweis

Read-only per `Grep`/`Read` gegen den committed Ist-Code (`FwRenderer.js`, `ChartEngine.js`, `BarChartStrategy.js`, `PieChartStrategy.js`) geprüft.

**Gemeinsame Basis (B.1):** Genau elf `FW_CHROME_*`-Konstanten (`FwRenderer.js:32–50`), keine `FW_LINE_*`/`FW_BAR_*`-Vollrezeptkopie mehr im Code (nur die line-exklusive BAN-Familie `FW_LINE_BAN_*`, Zeile 55–58, unverändert davon getrennt). Line (`isLine`) und regulärer Bar (`isBar`) nutzen dieselben Konstanten über `isChromeControls`/`isChromeLegend` (Zeile 176, 310, 339, 353, 373, 385, 416). Seit CE-5d referenziert auch der aktive Pie-Legendeneintrag direkt `FW_CHROME_LEGEND_PILL_CLASS`/`FW_CHROME_LEGEND_DOT_CLASS` (Zeile 469, 481) statt einer eigenen Kopie.

**Fachliche Trennung (B.2):**
- Line/Bar: `ChartEngine._bindLegendEvents()` liest bei `state.type === 'line' || state.type === 'bar'` den realen `chart.isDatasetVisible(index)` und ruft `_setChromeLegendPillState()` (Zeile 670–671 ChartEngine.js) — vollständiger Klassentausch + `aria-pressed`.
- Pie: derselbe Handler liest im `else if (state.type === 'pie')`-Zweig ausschließlich `chart.data.datasets[0]._status[index] === 'active'` und ruft `_setPieSegmentDampingState()` (Zeile 673–678), die `classList.toggle('hidden-dataset', !isActive)` + `aria-pressed` setzt (`FwRenderer.js:523–524`). Keine zweite, unabhängige Zustandsquelle mehr (die frühere parallele blinde Toggle-Logik ist seit CE-5 ersetzt).
- Kein Legenden-Drill-down: Der Pie-„Weitere …"-Drill-down bleibt ausschließlich Canvas-`onClick`-Pfad in `PieChartStrategy.js` — nicht im Diff einer der CE-5x-/CE-6-Stufen, `pie-segment-damping-interaction-check.js` bestätigt real `keinDrilldown: PASS` über 51/51 Segmente (CE-5d-Ergebnisdatei).

**Ranking-Bar (B.3):** `BarChartStrategy._transformAssetView()` liefert hartcodiert `meta.interactiveFilters: false` (`BarChartStrategy.js:226`). `FwRenderer._renderLegend()` gibt bei `interactiveFilters !== true` sofort `null` zurück (`FwRenderer.js:403`) — für Ranking wird demnach strukturell überhaupt keine `.fw-chart-legend` erzeugt, kein Button, kein `aria-pressed`. Keine erfundene Legende, kein Regressionspfad zum History-Mehrserien-Bar (`_transformHistoryView()` liefert `interactiveFilters: !isSingleAsset`, Zeile 189 — nur bei Multi-Asset interaktiv, unverändert von CE-4/CE-4c).

**Fallback-Parität (B.4):** Der gemeinsame Tailwind-freie Fallback-Block `.fw-chart-chrome .fw-legend-item`/`:hover`/`.fw-legend-dot` (Zeile 670–676) trägt seit CE-5d zusätzlich `.fw-pie-segment-damping-item` als zweiten Selektor — identische Ruhe-/Hover-/Fokuswerte für Line/Bar/Pie, kein Wert dupliziert oder abweichend deklariert. Reduced-Motion-Regel (Zeile 678–684) deckt denselben Anker ab. Pie-Ghost bleibt als eigener, höher spezifischer Selektor `.fw-legend-item.hidden-dataset` (Zeile 580–582) unverändert bestehen; der neue Hover-Selektor ist per `:not(.hidden-dataset)` explizit vom Ghost-Zustand ausgeschlossen (Zeile 673) — Ghost kann durch die Basiserweiterung nicht fälschlich aktiv wirken.

**DOM-/Canvas-Grenze (B.5):** `PieChartStrategy.js`, `CenterTextPlugin.js` sind in keinem der geprüften CE-5/CE-5a–CE-5d/CE-6-Diffs enthalten (durchgängig per `git status --short`/`git diff` in den jeweiligen Ergebnisdateien belegt). Canvas-Container-Erzeugung, Center-Text, Tooltip-Konfiguration, Segmentfarben, Achsen bleiben unverändert; kein Tailwind-Bezug wurde in diese Bereiche hineingezogen.

**Zwei Datenpfade (B.6):** `ChartEngine.js` zeigt `renderFromData()` (App-/Runtime-Pfad) und `_processContainer()` (CSV-/Standardpfad) als getrennte Einstiegspunkte, die beide in dieselbe interne Render-Pipeline (`setupStructure()`/`_updateLegend()`/`_bindLegendEvents()`) münden — kein Codepfad dupliziert die Chrome-/Legendenlogik separat für einen der beiden Datenpfade. Kein Diff der CE-5x-/CE-6-Kette berührt Datumslogik, `FwDateUtils`, `CSVParser.js` oder `FinanzwesirData.js` (bestätigt durch alle gelesenen Ergebnisdateien und die aktuellen `git status`-Läufe).

## DOM-/Canvas-/Strategy-/Manager-Besitzgrenzen

`docs/spec/CHART_PLUGIN_ARCHITEKTUR.md` (Opt-in, ephemerer State, `afterDraw`-Hook, Achsenvertrag, Tooltip-/Legend-Vertrag) und `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` KDR 9 (Rucksack)/13 (A11y)/14 (CSS-Variables Bridge) gegen den Ist-Code geprüft: kein CE-5x-/CE-6-Diff berührt Plugins, Achsen-Domain, Tooltip-Konfiguration oder die Theme-Injektionskette. `docs/spec/Der Rucksack (Context Object Pattern).md` §2.6 bestätigt den „Chrome-Auftrag" ausdrücklich als **Zielvertrag, technische Durchleitung noch nicht implementiert** — deckungsgleich mit KDR 15 im Strategy Paper. Die Rezeptzentralisierung (`FW_CHROME_*`, CE-4c) ist umgesetzt; die explizite, semantische Durchleitung von der Strategy zum Renderer ist es nicht. Das ist kein CE-6-Fund, sondern der dokumentierte, bewusst offene Zielzustand — siehe Restpunkte.

## Fallback-, A11y-, SafeDOM- und Reduced-Motion-Nachweis

- **A11y:** `aria-pressed` durchgängig bei Line-/Bar-/Pie-Legend-Buttons und Segmented-Options gesetzt (`FwRenderer.js` Zeile 354, 386, 452, 471, 502, 513, 524) — echte `<button>`-Elemente, keine reinen `<div>`s mehr (seit CE-5/CE-5d für Pie).
- **SafeDOM:** Keine der geprüften Änderungen führt `innerHTML` für Nutzdaten ein; alle Textzuweisungen bleiben außerhalb des CE-5x-/CE-6-Scopes unverändert (kein Diff in den entsprechenden Renderer-Textmethoden).
- **Reduced Motion:** Gemeinsamer `.fw-chart-chrome`-/`.fw-pie-segment-damping-item`-Reduced-Motion-Block (Zeile 678–684) deckt Line/Bar/Pie ab, konsistent mit Baukasten §8 „Jede Transition/Animation trägt `motion-reduce:transition-none`".
- **Container Queries:** `fw-chart-wrapper` bleibt für alle Typen der Container-Query-Anker (Kommentar Zeile 161–163); Zone-S-Block (`@container fw-chart (max-width: 450px)`) existiert nur einmal unter dem gemeinsamen `.fw-chart-chrome`-Anker (Zeile 678–684), nicht mehr dupliziert.

## Beide Datenpfade

Siehe „Cross-Type-Rezept- und Zustandsnachweis" B.6 oben. Kein Datumshandling-Code wurde durch CE-5x/CE-6 verändert; `docs/spec/CHART_ENGINE_REGRESSIONSREGELN.md` (Pflicht: beide Engine-Datenpfade bei jeder Änderung an allgemeiner Engine-Logik prüfen) ist gegenstandslos verletzt, weil in der gesamten CE-5x-Kette keine Datums-/Zeitachsenlogik geändert wurde — ausschließlich Legend-/Chrome-DOM.

## Statische QA

1. **`git diff --check`** für `FwRenderer.js`, `ChartEngine.js`, `LineChartStrategy.js`, `BarChartStrategy.js`, `PieChartStrategy.js`, `tools/engine-dom-check.js`, `tools/pie-segment-damping-interaction-check.js`: exit 0, keine Whitespace-Fehler.
2. **`node --check`** für dieselben sieben Dateien: exit 0 für alle.
3. **Werkzeug-Grenzen (C):** `tools/engine-dom-check.js` ist laut eigenem Kommentar (Zeile 32) „rein strukturell/read-only" — belegt keine Hover-/Fokusfarbe, nur DOM-Struktur (Button, `aria-pressed`, Chrome-Anker). `tools/pie-segment-damping-interaction-check.js` dokumentiert im Dateikopf (Zeile 10–12) ausdrücklich, dass es echte `element.click()`-Klicks simuliert und jeden Zustand per zweitem Klick wiederherstellt — nur für manuelle Testseitenläufe, nicht für Produktivseiten. Beide Werkzeuggrenzen entsprechen dem Prompt-Vertrag; keine Browser-Automation wurde durch CE-6 selbst ausgeführt.
4. Alle drei Pflicht-Testseiten (`tests/engine/line-ci.test.html`, `bar-ci.test.html`, `pie-ci.test.html`) sowie `Apps/prokrastinations-preis/app.test.html` liegen unverändert vor (nicht im CE-5x-/CE-6-Diff).

## Manuelle Albert-Abnahme

Status: **bestanden.** Alberts verbindliche Rückmeldung (CE-6a): „Alles ok." Das bedeutet: die vollständige CE-6-Checkliste ist auf S/M/L bestanden, einschließlich Line, regulärem Bar, Ranking-Bar, Pie, Tastatur/Tab/Enter/Space, Hover, Canvas-Ghosting, Center-Text, Tooltip, „Weitere …"-Drill-down, `engine-dom-check.js`, `pie-segment-damping-interaction-check.js` mit Wiederherstellung sowie dem realen `renderFromData()`-Line-Referenzfall. Diese Rückmeldung wurde als reale manuelle Abnahme protokolliert, nicht erneut technisch geprüft, nicht interpretiert und nicht durch Browser-Automation ersetzt.

Ursprüngliche Checkliste (vollständig abgedeckt durch obige Rückmeldung):

1. `line-ci.test.html`: Controls, aktive/ausgeblendete Datenreihen-Pills, Tastaturfokus, Hover, Canvas.
2. `bar-ci.test.html`: regulärer Mehrserien-Bar **und** Ranking-/Einzeldataset-Bar; keine erfundene Legende im Ranking.
3. `pie-ci.test.html`: aktive/gedämpfte Segment-Pills, Tab/Enter/Space, Canvas-Ghosting, Center-Text, Tooltip, „Weitere …"-Drill-down.
4. Auf jeder Testseite `engine-dom-check.js` in die DevTools-Konsole eingefügt, Ergebnis festgehalten.
5. Nur auf `pie-ci.test.html` zusätzlich `pie-segment-damping-interaction-check.js` eingefügt, PASS und Wiederherstellung kontrolliert.
6. `Apps/prokrastinations-preis/app.test.html`: realer `renderFromData()`-Line-Referenzfall; keine Veränderung von App-Komposition, Rubikon-/Journey-Overlay oder Screen-Reveal.

## Dokumentierte Restpunkte

1. **KDR 15 / §2.6 Chrome-Auftrag technisch nicht durchgeleitet:** Die semantische Chrome-Auftrag-Durchleitung von Strategy zu Renderer ist laut Spec ausdrücklich „Zielvertrag, technische Durchleitung noch nicht implementiert" — kein CE-6-Fund, sondern der dokumentierte, bewusst offene Zielzustand für einen künftigen eigenen Code-AP.
2. **F-06 Pie-Drill-down-Popover (`document.body`-Anhang):** bleibt seit CE-4c/CE-5 unbewertete, vorherige Scope-Schranke — nicht Teil von CE-6.
3. **Pie-Wrapper/-Titel-Migration auf volles `FW_CHROME_*`-Rezept:** bewusst zurückgestellt (CE-5-Ergebnisdatei, Paritätskarte) — Titel würde bei Migration auf `FW_CHROME_TITLE_CLASS` sichtbare Optikänderung (Bodenmarge, Schriftgröße) erzeugen, ohne Produktentscheidung nicht vollzogen.
4. **Donut/Pie „Kategorienliste als abweichende Legendenbedeutung" und Drill-down-Popover:** laut Baukasten §10-Tabelle ausdrücklich „bleiben offen".

Keiner dieser vier Punkte wurde durch CE-6 oder CE-6a „mitrepariert" — sie werden hier nur benannt, unverändert und nicht neu interpretiert.

## Nächster zulässiger Schritt

Ausschließlich ein gezielter Abschluss-Commit dieser CE-6-Ergebnisdatei (nach Alberts OK). Kein Folge-AP, keine technische Arbeit aus diesem Protokoll abgeleitet.
