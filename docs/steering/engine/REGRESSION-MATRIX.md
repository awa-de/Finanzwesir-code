Stand: 2026-07-15 | Session: AP-chart-engine-01 CE-4c Vollabschluss | Geändert von: Claude

# Regression Matrix — Chart Engine

**Zweck:** Manuelle Regressionstests für die Chart-Engine.
**Zielgruppe:** Claude und Albert.
**Wann lesen:** Vor und nach Änderungen an Chart-Engine, Achsen, Tooltips, Layout, CSV, Datenfluss.
**Wann aktualisieren:** Wenn ein neuer Fehler gefunden, ein Testfall ergänzt oder ein Verhalten stabilisiert wird.
**Gehört hier hinein:** Wiederholbare Testfälle.
**Gehört nicht hier hinein:** Bugdiskussionen, lange Analysen, Specs.

---

## Grundregel

Nicht nur den aktuellen Bug testen.
Immer mindestens einen passenden Regressionstest aus dieser Matrix prüfen.

---

## Testmatrix

| ID | Bereich | Testfall | Test-HTML | Erwartung | Pflichtprüfung bei Änderungen an | Automatik-Gate? |
|----|---------|----------|-----------|-----------|----------------------------------|------------------|
| REG-X-001 | X-Achse | Monatsdaten über lange Zeiträume | index_linen_2.html — bd_asset_monatlich_25y.csv (300 Punkte, 25 Jahre) | Labels überlappen nicht, Start/Ende plausibel | FwSmartScales, FwDateUtils | Nein — nur manuell |
| REG-X-002 | X-Achse | Jahresdaten | index_linien.html — Szenario 1: scenario_1_long_25y.csv | Sinnvolle Jahreslabels, keine Redundanz | FwSmartScales, FwDateUtils | Nein — nur manuell |
| REG-X-003 | X-Achse | Einzelpunkt | index_balken.html — Szenario 4: bd_single_year.csv; index_tool_tip.html — Szenario 4: tool_tip_minimal_data.csv (2 Punkte) | Kein Crash, sinnvolle Achse | FwSmartScales | Nein — nur manuell |
| REG-X-004 | X-Achse | Zeitlücken | index_irregular_xaxis.html — A3: tool_tip_monthly_gaps.csv (2 fehlende Monate), A5: bd_kurz_19d_holiday_gap.csv | Keine falsche Rhythmusannahme | FwDateUtils, FwSmartScales | Nein — nur manuell |
| REG-Y-001 | Y-Achse | Positive Werte | index_minmax.html — L5: minmax_linie_nullnah.csv (magnetische Null); L8: minmax_linie_plateau.csv (fern von Null) | Sinnvolle Nice Numbers, keine abgeschnittenen Werte | FwSmartScales | Nein — nur manuell |
| REG-Y-002 | Y-Achse | Negative und positive Werte | index_minmax.html — L1: minmax_linie_asym.csv (Nulldurchgang); L4: minmax_linie_nullpendel.csv (Pendeln um Null) | Null-Linie plausibel | FwSmartScales | Nein — nur manuell |
| REG-Y-003 | Y-Achse | Bar Chart | index_balken.html — Szenario 1: bd_negative_crash.csv; index_minmax.html — B0: test_data.csv | Balken starten bei 0 | BarChartStrategy, FwSmartScales | Nein — nur manuell |
| REG-TT-001 | Tooltip | Jahresdaten | index_linien.html — Szenario 1: scenario_1_long_25y.csv (25 Jahre, Jahreslabels im Tooltip) | Header zeigt korrektes Jahr | FwSmartTooltips | Nein — nur manuell |
| REG-TT-002 | Tooltip | Monatsdaten | index_tool_tip.html — Szenario 3: tool_tip_monthly_gaps.csv (monatlich mit Lücken) | Header zeigt sinnvollen Monat | FwSmartTooltips | Nein — nur manuell |
| REG-TT-003 | Tooltip | Pie Chart | index_torte_CI.html — test_data_torte_NEU.csv (5 Items, manuell + Default + Gatekeeper) | Keine unnötige Datumslogik | PieChartStrategy, FwSmartTooltips | Nein — nur manuell |
| REG-CSV-001 | CSV | Deutsches Komma als Dezimaltrennzeichen | index_linien.html — Szenario 6: scenario_6_decimals.csv (explizit: "deutsches Komma und Präzision") | Werte korrekt geparst | CSVParser | Nein — nur manuell |
| REG-CSV-002 | CSV | Semikolon-Trennung | index_linien.html — Szenario 1: scenario_1_long_25y.csv (alle CSVs nutzen Semikolon, implizit) | Spalten korrekt erkannt | CSVParser | Nein — nur manuell |
| REG-CSV-003 | CSV | ISO-Datum | index_irregular_xaxis.html — A2: snap_period_yearly_irregular.csv (ISO-Daten mit irregulären Stichtagen) | Datum korrekt erkannt | CSVParser, FwDateUtils | Nein — nur manuell |
| REG-LAY-001 | Layout | Mobile Breite | index_balken.html — DevTools auf 375px; @media (max-width:480px) aktiv in allen Test-HTMLs | Keine abgeschnittenen Labels | FwLayoutRules, CSS | Nein — nur manuell |
| REG-LAY-002 | Layout | Desktop Breite | index_linien.html — max-width:1200px (Zone L); alle 7 Szenarien | Keine übergroßen Abstände | FwLayoutRules | Nein — nur manuell |
| REG-CTX-001 | fwContext | Line Chart | index_linie_CI.html — systematischer Line-Permutationstest (Valid/Default/Toxic) | Pflichtfelder vorhanden | Strategies, FwChartPlugins | Nein — nur manuell |
| REG-CTX-002 | fwContext | Bar Chart | index_balken_CI.html — systematischer Bar-Permutationstest (Valid/Default/Toxic) | Pflichtfelder vorhanden | Strategies, FwChartPlugins | Nein — nur manuell |
| REG-APP-001 | AppChart | renderFromData() — SparplanChart Slider-Update | Apps/prokrastinations-preis/app.test.html — Szenario U: Slider bewegen, Chart aktualisiert sich ohne DOM-Rebuild | Kein Range-Button, kein BAN, kein View-Toggle, Tooltip aktiv, A11y-Tabelle vorhanden; bestehende .financial-chart-module-Charts unberührt | ChartEngine.renderFromData(), FwRenderer._renderControls(), ChartEngine._draw() | Nein — nur manuell |
| REG-APP-002 | AppChart | VertikaleLinie afterDraw-Plugin — Persistenz bei Smart-Update | Apps/prokrastinations-preis/app.test.html — Szenario W: Rate ändern → Chart aktualisiert sich → gestrichelte blaue Linie bleibt auf Screen 3 am letzten Datenpunkt | Linie bleibt nach chartInstance.update(); kein doppeltes Zeichnen; bestehende .financial-chart-module-Charts unberührt | ChartEngine._draw() (afterDraw-Plugin) | Nein — nur manuell |
| | | **Hinweis REG-APP-001/002:** Diese Tests beschreiben den Slice-4/6-Altstand (alte Ergebnisgrafik-Logik, Screen 2 mit KPI-Cards). Sie sind nicht Zielzustand. Neue Regressionstests für Stationen-Zeitreise folgen nach B1-AP-10. | | | | |
| REG-APP-003 | AppChart | Progressive Domain — xDisplayRange fixiert X-Achse | Apps/prokrastinations-preis/app.test.html — Szenario AB (erste Station, kurze Zeitreihe) | X-Achse zeigt nur displayRange.min bis displayRange.max; Ticks gleichmäßig im sichtbaren Fenster; Standard-LineCharts (index_linien.html) unberührt | ChartEngine.renderFromData() xDisplayRange, LineChartStrategy, FwSmartXAxis.afterDataLimits | Nein — nur manuell |
| REG-APP-004 | AppChart | yRangePolicy cumulative-expand-zero — Y-Achse schrumpft nicht | Apps/prokrastinations-preis/app.test.html — Szenarien AB→AC→AD (drei Stationen nacheinander mit steigendem Portfolio) | Y-Achse schrumpft bei Stationswechsel nie; expandiert bei neuem Maximum; Reset nur bei journeyRangeKey-Wechsel (andere Rate oder Zeitraum); Standard-LineCharts unberührt | ChartEngine WeakMap-State yMaxSeen, FwSmartYAxis cumulative-expand-zero | Nein — nur manuell |
| REG-APP-005 | AppChart | Annotationen-Datenvertrag — fwContext.annotations korrekt befüllt | Apps/prokrastinations-preis/app.test.html — Szenario AC (zweite Station: 1 vergangene Station soll annotiert sein) | fwContext.annotations.events enthält genau 1 Eintrag mit korrektem x (Timestamp), y (Depotwert Snapshot-Snap), role, status='past'; final_reveal und aktuelle Station nicht enthalten; kein Marker sichtbar | app.js buildJourneyStationAnnotations(), ChartEngine, BaseChartStrategy._createFwContext | Nein — nur manuell |
| REG-APP-006 | AppChart | AnchorMeasurement-Contract — Pixel-Koordinaten pro Datenpunkt korrekt an App gemeldet | Apps/prokrastinations-preis/index.html Screen 2 — Journey-Klick löst revealCurrentStationPoint() aus | onAnchorMeasurement liefert eingefrorene Messung mit korrektem x/y (container-relativ) und visible=true erst wenn der Zielpunkt innerhalb chartArea liegt; kein direkter chart.scales-/getPixelForValue-Zugriff aus app.js | ChartEngine._draw() Plugin-Registrierung, FwAnchorMeasurementPlugin.js (afterDraw) | Nein — nur manuell |
| REG-APP-007 | AppChart | ChartSettled-Gate — Card-to-Point-Flug startet erst nach Animationsende | Apps/prokrastinations-preis/index.html Screen 2 — Journey-Klick (normale Motion, kein Reduced Motion) | Flug beginnt nicht vor onSettled-Callback (animation.onComplete); measurement.visible allein darf den Flug nicht auslösen; bei Reduced Motion/renderMotion:'instant' feuert onSettled synchron über den Update-Pfad-Fallback (dieser Testfall betrifft ausschließlich den Update-Pfad — `chartSettled` wird in `prokrastinations-preis` nie beim allerersten Render eines Containers gesetzt, siehe REG-APP-009) | ChartEngine._draw() chartSettled-Komposition, _emitChartSettled() | Nein — nur manuell |
| REG-APP-008 | AppChart | RenderMotion instant — kein Chart.js-Default-Tweening auf Screen-2-Journey-Renders | Apps/prokrastinations-preis/index.html Screen 2 — jeder Journey-Chart-Render (renderJourneyChartOnly) | Chart baut sich nicht sichtbar von unten auf/schwingt nicht ein (kein Scale-/Datensatz-Tweening); Screen 4 (Rubikon) und Standard-LineCharts (index_linien.html) weiterhin mit regulärer Animation, sofern renderMotion nicht gesetzt | ChartEngine._draw() renderMotion-Zweig (Smart-Update + Creation-Pfad) | Nein — nur manuell |
| REG-APP-009 | AppChart | ChartSettled-Gate Creation-Pfad — synchroner Fallback auch beim allerersten `new Chart()`-Render (AP-prokrast-09b) | Kein realer Aufrufer in `prokrastinations-preis` aktuell — nur code-analytisch/Diff-verifiziert, siehe `docs/steering/patches/AP-prokrast-09b_chartsettled-creation-pfad-haertung_Ergebnis.md`; beim ersten echten App-Fall, der `chartSettled.enabled` beim Ersteintritt eines Containers mit Reduced Motion/`renderMotion:'instant'` setzt, hier den realen Browser-Test nachtragen | `onSettled` feuert synchron unmittelbar nach `new Chart(...)`, wenn `instantCreate && chartSettled.enabled`; kein Doppel-Emit (animation:false verwirft ein zuvor gesetztes onComplete vollständig); normale Animation (kein instantCreate) unberührt, onComplete bleibt zuständig | ChartEngine._draw() Creation-Zweig (`requestAnimationFrame`-Callback), `_emitChartSettled()` | Nein — nur manuell |
| REG-DOM-001 | DOM-Chrome | Line-/Bar-Chart-Chrome — gemeinsamer Chrome-Kern (`FW_CHROME_*`): Segmented-Controls (Zeitspanne/Ansicht) und Legend-Pills auf beiden Datenpfaden, Line und regulärer Mehrserien-Bar (AP-chart-engine-01 CE-2b/CE-3/3a/3b/CE-4/CE-4c) | tests/engine/line-ci.test.html + tests/engine/bar-ci.test.html + tests/engine/pie-ci.test.html (alle Tailwind-frei) + Apps/prokrastinations-preis/app.test.html (Tailwind) | A11y-Tabelle verborgen (beide Mechanismen); Titel/BAN(nur Line)/Toolbar/Legende mit ruhigem Wrapper-Rhythmus; Zeitspanne links, Ansicht rechts auf M/L, linksbündiger Umbruch auf S (≤450px); Range-/View-Buttons und Legend-Pills mit korrektem `aria-pressed`-Wechsel bei Klick; Ranking-Bar zeigt weiterhin keine Legende; Donut/Pie ohne Typmarker/Chrome-Anker, unverändert | FwRenderer.js (setupStructure/_renderControls/_renderLegend/_renderBAN/_injectStyles, `FW_CHROME_*`-Konstanten), ChartEngine.js (_updateUIState/_bindLegendEvents, `_setChromeSegmentedOptionState`/`_setChromeLegendPillState`) | Teilweise — `tools/engine-dom-check.js` prüft seit CE-4c zusätzlich den Chrome-Kern-Block (Typmarker+Anker, `<button aria-pressed>` bei Controls/Pills, genau ein aktiver Button pro Gruppe); Hover-/Fokus-Optik bleibt manuell |

---

## Hinweise zur Testdurchführung

- **Mobile (REG-LAY-001):** Browser-DevTools → Responsive Mode → 375px Breite. Alle Test-HTMLs haben `@media (max-width:480px)`.
- **REG-CSV-002:** Alle 18 Test-HTMLs nutzen Semikolon-getrennte CSVs implizit — kein dedizierter Einzeltest nötig.
- **REG-TT-001/002:** Tooltip prüfen durch Hover auf Datenpunkte, nicht nur visuell. Headerlabel im Tooltip inspizieren.
- **Neue Testfälle:** Wenn ein Bug gefunden wird, zuerst prüfen ob ein passender REG-Eintrag existiert. Falls nicht, Zeile ergänzen.

---

## Automatik-Gate-Review (RITUAL-OPT-2 Punkt 8)

Befund: **kein einziger Eintrag** hat aktuell ein automatisches Gate. Geprüftes Tool-Inventar (`tools/`):

- `check-test-pages.py` prüft laut eigenem Docstring ausschließlich Testseiten-**Struktur** (Ablage, Marker, Ghost-Card-Vertrag) — bewertet nie, ob eine App oder ein Chart fachlich/visuell korrekt funktioniert, und referenziert keine REG-IDs.
- `ci-token-check.js` (`fwCiAudit()`/`fwTokenCheck()`/`fwFontCheck()`) sind manuelle Browser-DevTools-Konsolen-Snippets (Copy-Paste + menschliche Auswertung), keine automatisch laufende Prüfung, und prüfen CI-Token-Konformität (Farben/Fonts), nicht Chart-Verhalten (Achsen, Tooltips, Layout, CSV-Parsing).
- `rubikon-symbol-markers-diagnose.js` ist ebenfalls ein manuelles Konsolen-Snippet zur Positionsmessung, kein Gate.
- Es existiert keine automatische Test-/CI-Pipeline (Testrealität-Prinzip, CLAUDE.md).

Damit ist die Matrix ehrlich vollständig manuell — kein „vermeintlich schon abgedeckt" Blindspot. Die Spalte `Automatik-Gate?` ist bewusst kein Vorschlag, etwas davon abzuschaffen (Versicherung bleibt), sondern hält den Ist-Stand fest, damit künftige Sessions nicht fälschlich annehmen, ein Tool decke einen REG-Fall bereits ab.
