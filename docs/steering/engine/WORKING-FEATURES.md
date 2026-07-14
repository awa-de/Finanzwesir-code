# Funktionierende Features (Nicht kaputt machen!)
Stand: 2026-07-14 | Session: AP-chart-engine-01 CE-3b Vollabschluss | Geändert von: Claude

## Hinweis

Ich beschreibe hier nur, was aus Anwendersicht funktioniert.
Ich lege keine einzelnen Codezeilen fest,  die nicht geändert werden dürfen.
Die genaue technische Umsetzung darf Claude selbst analysieren.

## Layer 1: Data Ingestion ✅

- CSV-Parsing funktioniert für alle aktuellen Test-CSV-Dateien, die ich nutze.
- Erkennung von Einheiten (%, €, etc.) funktioniert aus meiner Sicht korrekt.
- Metadaten (z.B. unit, currency) stehen im Chart so zur Verfügung, wie ich es erwarte.

## Layer 2: Manager ✅

- Auswahl des Charts, Laden von CSVs und Wechsel von Ansichten funktioniert.
- Grundlogik „Chart wird gerendert, wenn ich X tue" ist stabil.
- Smart Updates: View-/Range-Wechsel nutzen `chart.update()` (flüssige Animation, kein Flackern). Bei prefers-reduced-motion: reduce: `chart.update('none')` + Initial-Render `animation: false` via `_prefersReducedMotion()` (B1-AP-15b).
- Error Boundary: Fehlerhafte CSVs zeigen einen Platzhalter, die restliche Seite bleibt stabil.
- Legend Toggle: Klick auf Legende blendet Datasets ein/aus.
- `renderFromData()` (Slice 4, 2026-06-11): Zweiter offizieller Engine-Einstieg für app-berechnete Daten ohne CSV-Fetch. Validierung + Mapping + Deep-Freeze + WeakMap-State. `features.rangeControls: false` → keine Range-Buttons. `features.headline: false` → kein BAN. Slider-Smart-Update via `chart.update()` (kein DOM-Rebuild). Bestehende `.financial-chart-module`-Charts unverändert.
- `anchorMeasurement`/`chartSettled`/`renderMotion` (AP-prokrast-08b/08b3/08b5, 2026-07-06): Drei neue opt-in `renderFromData()`-Contracts für DOM↔Canvas-Koordination (Card-to-Point auf Screen 2 `prokrastinations-preis`). `anchorMeasurement` meldet Pixel-Koordinaten von Datenpunkten per Callback (kein direkter Chart.js-Internals-Zugriff aus der App nötig). `chartSettled` meldet zuverlässig, wann eine Chart-Animation fertig ist (nicht nur, wann ein Punkt sichtbar ist) — feuert seit AP-prokrast-09b (2026-07-06) synchron sowohl beim Update als auch beim allerersten Chart-Render (Creation-Pfad), wenn Reduced Motion/`renderMotion:'instant'` aktiv ist; für `prokrastinations-preis` aktuell folgenlos, da dort kein Aufrufer `chartSettled` beim Ersteintritt setzt. `renderMotion: {mode:'instant'}` schaltet Chart.js' Default-Tweening für einzelne Render-Aufrufe ab. Bestehende Charts ohne diese Optionen vollständig unverändert. AnchorMeasurement-Registrierung (No-op-Bootstrap in `app.js`) bleibt offene Masterfaden-Entscheidung (BACKLOG AP-prokrast-08-FOLLOWUP-A). Details: `docs/steering/patches/AP-prokrast-08a…08c_*_Ergebnis.md`, `AP-prokrast-09a…09d_*_Ergebnis.md`.

## Layer 3: Chart Strategies

- LineChartStrategy:
  - Die Liniendiagramme funktionieren gut. Nicht anfassen, beachte das Thema X-Achse. Dieser Bereeich ist besinders regressinsgefährtet, da in der FwSmartXAxis.js zwei grundlegend verschiedene Zeitreihen-Typen prorgammiert sind (Linien- vs. Balkendiagramme)
  - BAN-Headline (V14.1.0): Performance-Headline über dem Line Chart mit visuellem Container (Background, Border-Radius, Padding). Zeigt Gesamtperformance des aktiven Zeitraums. Aktualisiert sich bei Range-/View-Wechsel UND Legend-Toggle. Single-Asset (Zwei-Zeilen), Multi-Asset (gestapelt, max 3), Hint mit Zähler (4+), Empty-Mode (0 sichtbar). Legend-Toggle steuert BAN dynamisch (≤3 sichtbar → volle BAN, 4+ → Hint). Komplementärwert nur bei Währungsdaten.
  - SNAPSHOT Universal Snap (V14.3.0, AP-14 → V16.0.0, AP-15): ALLE SNAPSHOT-Daten werden auf Kalender-Gridlinien gesnappt via `getSnapshotSnap()`. YEARLY→Jan 1, HY/Q/M→1. des Monats, WEEKLY/DAILY→Identität. `snappedTimestamps` pre-computed (Single Point of Truth). `dataRange` auf gesnappte Positionen. `_originalDate` bewahrt echtes Datum für Tooltips. **⚠️ Bekanntes Problem (AP-21 §7):** Bei mixed-rhythm CSVs kollabieren Datenpunkte auf dieselbe x-Koordinate (→ Schlaufen/senkrechte Anstiege). Fix in T5 (CV-Heuristik + ERRATIC-Snap).
  - SNAPSHOT Kalender-Ticks (V8.6.0, AP-12): QUARTERLY/MONTHLY zeigen IMMER gleichmäßige Kalender-Ticks (keine Data-Anchored Ticks mehr). Data-Anchored nur noch für YEARLY/HALF_YEARLY. Breathing-Room-Fix: Ticks decken Datenbereich ab, nicht die 5%-Erweiterung.
- BarChartStrategy:
  Wenn die BarchartSttrategy im Asset-Modus ist, zeigt sie alles korret an.
  Ranking Mode (View-Option "Vergleich") sortiert Balken nach Performance statt chronologisch.
  Pos/Neg-Färbung: Bei Single-Asset History-View sind positive Balken Petrol, negative Purpur.
- PieChartStrategy:
  - hier ist alles ok, zumindest optisch. Diese Datei fassen wir bis auf Weiteres nicht an.
- A11y-Tabellen (alle Strategien):
  - Visuell verborgene HTML-Tabelle neben dem Canvas mit echten Datenwerten für Screen Reader.
  - Line/Bar History: letzte 20 Zeilen + Summary. Bar Ranking: alle Perioden. Pie: alle Segmente aufgelöst.
  - Formatierung: de-DE Zahlen + verbose Datumsformat.

## Layer 4: Curator (Ticks & Skalen) ✅

- Die Skalierung der Y-Achse ist korrekt (proportionale Grace, dynamisches Rescaling).
- Die Y-Achse skaliert automatisch korrekt, wenn die Graphen ein- und ausgeblendet werden.
- FwDateUtils.getSnapshotSnap() (V5.3.0, AP-15): Kalender-Snap für SNAPSHOT-Daten. YEARLY→Jan 1, HY/Q/M→1. des Monats, WEEKLY/DAILY→Identität. Aufgerufen in LineChartStrategy.
- FwSmartXAxis Kalender-Ticks SNAPSHOT (V9.0.0, AP-15): Einheitliche cursor-basierte Kalender-Ticks für ALLE Rhythmen. Kein Guard, keine Fallunterscheidung regulär/irregulär. `endLimit = dataRange.max + halfStep`.
- FwSmartXAxis Kalender-Ticks PERIOD (V10.0.0, AP-13): Cursor-basierte Kalender-Ticks für PERIOD-Track. Konsistent mit SNAPSHOT.
- FwSmartXAxis Quarter-End (V10.2.0, AP-18): Quartals-Ticks Mär/Jun/Sep/Dez, HY-Ticks Jun/Dez. Nur für rhythm=QUARTERLY/HALF_YEARLY.
- FwSmartXAxis Progressive Domain (B1-AP-14b1): `xDisplayRange` als Top-Level-Option in `renderFromData`; `displayRange` in fwContext; `afterDataLimits` fixiert Achse auf displayRange.min/max; `afterBuildTicks` berechnet Ticks innerhalb des sichtbaren Fensters; `durationYears` aus displayRange. Standard-LineCharts ohne xDisplayRange vollständig unverändert.
- yRangePolicy cumulative-expand-zero (B1-AP-14b2): `yRangePolicy: 'cumulative-expand-zero'` in renderFromData; WeakMap-State speichert yMaxSeen pro Container; Y-Achse expandiert kumulativ, schrumpft nie; Reset bei `yRangeResetKey`-Wechsel. Standard-Charts ohne yRangePolicy vollständig unverändert.
- fwContext.annotations Datenvertrag (B1-AP-14c1): optionales `annotations`-Feld in renderFromData-Options; WeakMap-State speichert Annotationen pro Container; BaseChartStrategy._createFwContext leitet `annotations` in fwContext weiter. Kein Rendering — Datenbasis für Marker B1-AP-14c2.

## Layer 5: Renderer / Layout ✅

- Die CI (Farben & Fonts) wird korrekt eingehalten
- Die Achsen und der Aufbau des Diagramms sind ebenfalls einwandfrei
- Die Tooltips funktionieren einwandfrei, die bleiben so
- KDR-14 CSS-Variables Bridge (FwTheme V5.0.0): Engine liest Farb-Tokens aus `screen.css :root`. Alle Dateien tokenisiert. Fallback-Defaults für Test-HTMLs ohne screen.css. Init-Reihenfolge bindend: `new FwTheme()` → `init()` → `_injectStyles()`.
- Engine-DOM-Chrome auf Tailwind-Baukasten migriert (AP-chart-engine-01, CE-2b + CE-3/3a/3b, 2026-07-14): Gemeinsames DOM-Fundament (Wrapper/Canvas-Container/A11y-Tabelle/Loading/Error) trägt jetzt Baukasten-Literalrezepte (§6.9–6.11) + einen schmalen tokenbasierten CSS-Fallback für die dauerhaft Tailwind-freien Engine-Testseiten (`.fw-chart-a11y-fallback`, `.fw-chart-error` u. a.). Für **Linie** zusätzlich: Titel/BAN/Toolbar/Segmented-Controls (Zeitspanne + Ansicht, echte `<button role="group" aria-pressed>`)/Legende (echte `<button aria-pressed>`-Pills) auf Baukasten-Literale (§6.5/§6.11) migriert, jeweils mit eigenem line-spezifischen CSS-Fallback (Marker `.fw-chart-wrapper--line`). Bar/Donut/Pie unverändert (eigene, spätere Slices CE-4/CE-5). Neues Diagnosewerkzeug `tools/engine-dom-check.js` prüft A11y-Verbergung + Struktur-Anker über beide Datenpfade. Ergebnisprotokolle: `docs/steering/patches/AP-chart-engine-01_CE-2b_*` bis `..._CE-3b_*`.
