# KNOWN-ISSUES — Archiv geschlossener Einträge

Ausgelagert am 2026-02-27 aus `KNOWN-ISSUES.md` zur Token-Reduktion.
Alle Einträge hier sind **abgeschlossen** (✅ oder ❌ verworfen).
Für offene Punkte → `KNOWN-ISSUES.md`. Für Tracking → `KNOWN-ISSUES-SCHLACHTPLAN.md`.

---

## Geschlossene Regressionen

### ✅ Regression 1 – X-Achse Bar: Balken und Tick sind unterschiedlich

- **CSV:** `bd_asset_halbjaehrlich_25y.csv`
- **Problem:** Balkenmonat (Dez/Jun) und Tick (Okt/Apr) passten nicht zusammen. Balken an Rändern abgeschnitten.
- **Fix:** BOP-Anchoring mit No-Q-Policy (QUARTERLY→MONTHLY Remapping), afterFit-Expansion mit N-1 Divisor, durationYears im Rucksack, Einzelpunkt-Fallback.
- **Gefixt in:** FwSmartXAxis V5.4.0, BarChartStrategy V42.0.0

### ✅ Regression 2 – X-Achse Balken: Tagesrhythmus nicht erkannt

- **CSV:** `bd_kurz_02d_nano.csv`
- **Problem:** 2 Tagesbalken zeigten identische Labels ("Jun '24").
- **Fix:** Nano-Fallback (≤ 7 Datenpunkte → jeden Balken labeln), Zone-aware Density Matrix.
- **Gefixt in:** FwSmartXAxis V7.0.0

### ✅ Regression 3 – X-Achse Mixed: Labels identisch

- **CSV:** `bd_kurz_13d_micro.csv` (+ bd_kurz_173d_mid_mid.csv, bd_kurz_14d_tue_start.csv, bd_kurz_19d_holiday_gap.csv, bd_kurz_30d_no_anchor.csv, bd_kurz_turn_year.csv)
- **Problem:** X-Achse zeigte identische Labels (z.B. 13× "Mai '24"). Density Matrix war nicht zone-aware, Tick-Generator erzeugte einen Tick pro Datenpunkt statt pro Zeiteinheit.
- **Fix:** Zone-aware PERIOD-Tabellen (S/M/L, Spec §3.1–§3.3), Key-basierte Tick-Deduplizierung, YEARLY-Override, Monday-aligned Week-Buckets, Proximity Guard, _formatLabel mit Spec-konformen Formaten.
- **Gefixt in:** FwSmartXAxis V7.0.0

---

## Geschlossene APs (AP-1 bis AP-16)

### ✅ AP-12 — SNAPSHOT-Track + PERIOD-Track Kalender-Ticks (2026-02-26/27)

**SNAPSHOT (Line Charts):**
- QUARTERLY/MONTHLY → immer Kalender-Ticks (V8.6, User-Entscheidung). Data-Anchored Guard komplett entfernt.
- Breathing-Room-Geisterticks behoben: `endLimit = context.dataRange?.max` statt `axis.max`.
- Testseite: `index_irregular_xaxis.html` (7 Line + 7 Bar Charts).

**PERIOD (Bar Charts) — AP-13:**
- `afterBuildTicks` von datengetrieben → cursor-basierte Kalender-Ticks (FwSmartXAxis V10.0.0).
- Entfernt: Key-Dedup, Nano-Fallback (≤7), Proximity Guard — alle drei obsolet.
- `isRegularInterval()` entfernt (Dead Code, 0 Aufrufer, FwDateUtils V5.4.0).
- Extension-Cap in `afterFit`: `Math.min(rawExtension, halfStep)`.
- Testseite: `index_irregular_bar_ap13.html`.

### ✅ AP-10 — Data-Anchored Ticks für QUARTERLY/MONTHLY (2026-02-23)

- Reguläre QUARTERLY-/MONTHLY-Daten zeigen Ticks auf echten Datenpositionen statt Kalender-Grenzen.
- `isRegularDayPattern()` in FwDateUtils V4.7.0, `_generateDataAnchoredTicks` in FwSmartXAxis V8.5.0.

### ✅ AP-11 — Range-Button bei <2 Datenpunkten ausblenden (2026-02-23)

- `filterRows(rows, range).length >= 2` Guard. Generischer Catch-All für alle Rhythmen.

### ✅ AP-14/AP-15 — SNAPSHOT Calendar Snap (2026-02-26)

- Calendar Snap mit `_originalDate`-Entkopplung. FwDateUtils V5.3.0 (`getSnapshotSnap`), LineChartStrategy V16.0.0, FwSmartXAxis V9.0.1.

### ✅ AP-16 — Range-Button-Semantik PERIOD/SNAPSHOT (2026-02-27)

- PERIOD/SNAPSHOT-Weiche in `filterRows` V5.5.0. PERIOD exklusiv (`>`), SNAPSHOT inklusiv (`>=`). "NJ" = N Balken bei YEARLY.

---

## Geschlossene Housekeeping-Punkte

- ✅ **Debug-Probes in FwRenderer.js:** Console-Logs (V4.6.0-DEBUG) entfernt (2026-02-13).
- ✅ **HALF_YEARLY-Mode restauriert:** Detection (Band 140–300d in Waterfall Matrix), Density Matrix Override, BOP-Anchoring (No-Q-Policy erweitert), Tooltip (Option A). 4 Dateien, 8 Eingriffe (2026-02-13).
- ✅ **Y-Achse: Proportional Grace (V1.7.0):** Zone-Erkennung `axis.width` → `axis.chart.width`, Grace additiv → multiplikativ (2026-02-13).
- ✅ **Y-Achse: TIGHT FRAME (V1.9.0):** afterBuildTicks-Guardian, feste FRAME_TICKS=10, Drei-Kandidaten-Selektion (2026-02-13).
- ✅ **Security-Härtung AP-2 (2026-02-17):** Domain-Whitelist in CSVParser, Safe DOM in FwRenderer V4.7.0.
- ✅ **Minibalken-Sichtbarkeit:** `minBarLength: 3` in BarChartStrategy (2026-02-16).
- ✅ **Pre-Launch: Titel-Fallback geklärt (2026-02-17).** Kein Fallback — fehlendes `data-title` = kein Titel.
- ✅ **Pre-Launch: Domain-Whitelist implementiert (2026-02-17).** CSVParser validiert URLs.
- ✅ **Pre-Launch: HTTP/2-Verifizierung geschlossen (2026-02-17).** Wartet auf Deploy.
- ✅ **Security-Härtung komplett (2026-02-17).** Alle 4 Tasks: SRI entfällt, Domain-Whitelist, Safe DOM, parseInt-Radix.
- ✅ **Performance-Härtung komplett (2026-02-17).** Alle 3 Tasks: defer entfällt, Preconnect entfällt, HTTP/2 wartet.
- ✅ **Pos/Neg-Farbkennzeichnung Bar Chart (2026-02-18).** CI-Petrol/CI-Purpur, Single-Asset only.
- ✅ **Label-Texte View-Toggles (2026-02-18).** Line: „Verlauf %". Bar: „Verlauf" / „Vergleich".
- ✅ **BAN-Headline (2026-02-18).** LineChartStrategy V14.0.0, FwRenderer V5.0.0.
- ✅ **BAN Container-Styling + Dynamik (2026-02-18).** LineChartStrategy V14.1.0, FwRenderer V5.1.0, ChartEngine V3.14.0.
- ✅ **Regression 4 geschlossen (2026-02-23).** SNAPSHOT Floor Principle V8.0.0.
- ✅ **AP-11 Range-Button (2026-02-23).** `filterRows().length >= 2` Guard.
- ✅ **AP-10 Data-Anchored Ticks (2026-02-23).** FwSmartXAxis V8.5.0, FwDateUtils V4.7.0.
- ✅ **AP-7 KDR-14 → CSS-3 (2026-02-23).** dispose() → kein Bedarf. Debug-Modus → verworfen.
- ✅ **A11y-Tabellen (2026-02-19).** KDR 13 erfüllt. Line/Bar/Pie `getA11yData()` befüllt.

---

## Geschlossene BI-Empfehlungen

### ✅ Empfehlung 1: BAN-Headline — ERLEDIGT (2026-02-18)

Big Accessible Number über Line Charts. Single-Asset Zwei-Zeilen, Multi-Asset (2–3) gestapelt, 4+ Hint-Text. Komplementärwert nur bei Währungsdaten. Neutral gefärbt (#272727). LineChartStrategy V14.0.0, FwRenderer V5.0.0.

### ✅ Empfehlung 1a+1b: BAN Container-Styling + Dynamik — ERLEDIGT (2026-02-18)

Container mit Background #E7ECEF@60%, border-radius 0.5rem. Intrinsische Breite. Legend-Toggle steuert BAN. Empty-Mode bei 0 sichtbar. Typografie Perfect Fourth 1,5:1. LineChartStrategy V14.1.0, FwRenderer V5.1.0, ChartEngine V3.14.0.

### ✅ Empfehlung 2: Pos/Neg-Farbkennzeichnung Bar — ERLEDIGT (2026-02-18)

Single-Asset History: Petrol (positiv) / Purpur (negativ). Multi-Asset unverändert. Neue Tokens `positiveBar`/`negativeBar` in FwTheme.

### ✅ Empfehlung 3: A11y-Tabellen — ERLEDIGT (2026-02-19)

KDR 13 erfüllt. Alle drei `getA11yData()` befüllt. Line/Bar: letzte 20 + Summary. Pie: alle Segmente.

### ✅ Empfehlung 4: Label-Texte View-Toggles — ERLEDIGT (2026-02-18)

Line: „Wert €" / „Verlauf %". Bar: „Verlauf" / „Vergleich".

---

## Geschlossene Architektur-Prüfpunkte (AP-7)

### ✅ KDR-14 CSS-Variables Bridge — SUPERSEDED → CSS-3 (2026-02-23)

### ✅ dispose() Lifecycle — GESCHLOSSEN (2026-02-23)

Kein Handlungsbedarf. Ghost ist kein SPA, GC räumt bei Navigation auf.

### ✅ Debug-Modus — VERWORFEN (2026-02-23)

Engine stabil, Browser-DevTools reichen.

---

## Feature-Triage (AP-8, 2026-02-23)

### Bereits implementiert

| Feature | Wo im Code |
|---------|------------|
| Ranking Mode (Bar) | `BarChartStrategy.js`: `_transformAssetView()` |
| Smart Updates | `ChartEngine.js`: `chart.update()` statt destroy/recreate |
| Legend Toggle | `ChartEngine.js`: `_bindLegendEvents()` |
| Bedingte Animationen | Natives Chart.js (BarController) |
| CLS Prevention | `screen.css` Abschnitt 5 (CSS-2) |

### ❌ Verworfen

- **Time Travel für Pie Charts:** Cleveland: Pie für Zeitvergleiche ungeeignet. Alternative: Stacked Bar.
- **Moving Average Overlay:** Widerspricht Buy-and-Hold-Philosophie. Tufte: "Show the data."
