Stand: 2026-05-03 08:02 | Session: Masterplan-Härtung-A4 | Geändert von: Claude

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

| ID | Bereich | Testfall | Test-HTML | Erwartung | Pflichtprüfung bei Änderungen an |
|----|---------|----------|-----------|-----------|----------------------------------|
| REG-X-001 | X-Achse | Monatsdaten über lange Zeiträume | index_linen_2.html — bd_asset_monatlich_25y.csv (300 Punkte, 25 Jahre) | Labels überlappen nicht, Start/Ende plausibel | FwSmartScales, FwDateUtils |
| REG-X-002 | X-Achse | Jahresdaten | index_linien.html — Szenario 1: scenario_1_long_25y.csv | Sinnvolle Jahreslabels, keine Redundanz | FwSmartScales, FwDateUtils |
| REG-X-003 | X-Achse | Einzelpunkt | index_balken.html — Szenario 4: bd_single_year.csv; index_tool_tip.html — Szenario 4: tool_tip_minimal_data.csv (2 Punkte) | Kein Crash, sinnvolle Achse | FwSmartScales |
| REG-X-004 | X-Achse | Zeitlücken | index_irregular_xaxis.html — A3: tool_tip_monthly_gaps.csv (2 fehlende Monate), A5: bd_kurz_19d_holiday_gap.csv | Keine falsche Rhythmusannahme | FwDateUtils, FwSmartScales |
| REG-Y-001 | Y-Achse | Positive Werte | index_minmax.html — L5: minmax_linie_nullnah.csv (magnetische Null); L8: minmax_linie_plateau.csv (fern von Null) | Sinnvolle Nice Numbers, keine abgeschnittenen Werte | FwSmartScales |
| REG-Y-002 | Y-Achse | Negative und positive Werte | index_minmax.html — L1: minmax_linie_asym.csv (Nulldurchgang); L4: minmax_linie_nullpendel.csv (Pendeln um Null) | Null-Linie plausibel | FwSmartScales |
| REG-Y-003 | Y-Achse | Bar Chart | index_balken.html — Szenario 1: bd_negative_crash.csv; index_minmax.html — B0: test_data.csv | Balken starten bei 0 | BarChartStrategy, FwSmartScales |
| REG-TT-001 | Tooltip | Jahresdaten | index_linien.html — Szenario 1: scenario_1_long_25y.csv (25 Jahre, Jahreslabels im Tooltip) | Header zeigt korrektes Jahr | FwSmartTooltips |
| REG-TT-002 | Tooltip | Monatsdaten | index_tool_tip.html — Szenario 3: tool_tip_monthly_gaps.csv (monatlich mit Lücken) | Header zeigt sinnvollen Monat | FwSmartTooltips |
| REG-TT-003 | Tooltip | Pie Chart | index_torte_CI.html — test_data_torte_NEU.csv (5 Items, manuell + Default + Gatekeeper) | Keine unnötige Datumslogik | PieChartStrategy, FwSmartTooltips |
| REG-CSV-001 | CSV | Deutsches Komma als Dezimaltrennzeichen | index_linien.html — Szenario 6: scenario_6_decimals.csv (explizit: "deutsches Komma und Präzision") | Werte korrekt geparst | CSVParser |
| REG-CSV-002 | CSV | Semikolon-Trennung | index_linien.html — Szenario 1: scenario_1_long_25y.csv (alle CSVs nutzen Semikolon, implizit) | Spalten korrekt erkannt | CSVParser |
| REG-CSV-003 | CSV | ISO-Datum | index_irregular_xaxis.html — A2: snap_period_yearly_irregular.csv (ISO-Daten mit irregulären Stichtagen) | Datum korrekt erkannt | CSVParser, FwDateUtils |
| REG-LAY-001 | Layout | Mobile Breite | index_balken.html — DevTools auf 375px; @media (max-width:480px) aktiv in allen Test-HTMLs | Keine abgeschnittenen Labels | FwLayoutRules, CSS |
| REG-LAY-002 | Layout | Desktop Breite | index_linien.html — max-width:1200px (Zone L); alle 7 Szenarien | Keine übergroßen Abstände | FwLayoutRules |
| REG-CTX-001 | fwContext | Line Chart | index_linie_CI.html — systematischer Line-Permutationstest (Valid/Default/Toxic) | Pflichtfelder vorhanden | Strategies, FwChartPlugins |
| REG-CTX-002 | fwContext | Bar Chart | index_balken_CI.html — systematischer Bar-Permutationstest (Valid/Default/Toxic) | Pflichtfelder vorhanden | Strategies, FwChartPlugins |

---

## Hinweise zur Testdurchführung

- **Mobile (REG-LAY-001):** Browser-DevTools → Responsive Mode → 375px Breite. Alle Test-HTMLs haben `@media (max-width:480px)`.
- **REG-CSV-002:** Alle 18 Test-HTMLs nutzen Semikolon-getrennte CSVs implizit — kein dedizierter Einzeltest nötig.
- **REG-TT-001/002:** Tooltip prüfen durch Hover auf Datenpunkte, nicht nur visuell. Headerlabel im Tooltip inspizieren.
- **Neue Testfälle:** Wenn ein Bug gefunden wird, zuerst prüfen ob ein passender REG-Eintrag existiert. Falls nicht, Zeile ergänzen.
