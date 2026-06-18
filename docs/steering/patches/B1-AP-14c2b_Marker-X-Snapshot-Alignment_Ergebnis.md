# B1-AP-14c2b Ergebnis

Stand: 2026-06-18 | Session: B1-AP-14c2b | Geändert von: Claude

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js` — Marker-Dataset-Erzeugung (Zeilen 266–292)

## Befund X-Alignment

- **Vorherige Marker-X-Quelle:** `e.x = new Date(sMonth + '-01').getTime()` (gesetzt in `app.js:208`)  
  → ergibt midnight UTC: z.B. `2021-03-01T00:00:00.000Z`
- **Hauptserien-X-Quelle:** `FwDateUtils.parse(r.Date).getTime()` → `getSnapshotSnap(ts, rhythm)`  
  → ergibt noon UTC: `Date.UTC(y, m, 1, 12, 0, 0)` = z.B. `2021-03-01T12:00:00.000Z`
- **Unterschied vorhanden: ja** — 12 Stunden / 43 200 000 ms  
  Visuell marginal auf 10-Jahres-Monatsskala (< 0,02 % der Chart-Breite), aber technisch inkonsistent.
- **Maßnahme:** Lokale `Map<"YYYY-MM", snappedTimestamp>` aus `rows` + `snappedTimestamps` in `LineChartStrategy.transform()` aufgebaut. Marker-X = exakt der Wert aus der Map, nicht `e.x`.

## Umsetzung

- **Mapping-Strategie:** `new Map(rows.map((r, idx) => [(r.Date || r.Datum).slice(0, 7), snappedTimestamps[idx]]))`  
  Key = month-String "YYYY-MM", Value = snappedTimestamp (noon UTC).  
  Beide Variablen (`rows`, `snappedTimestamps`) bereits im Scope von `transform()` verfügbar.
- **Marker-X:** `_monthToSnappedX.get(e.month)` — exakt identisch zur Hauptserienpunkt-x.
- **Marker-Y:** `e.y` unverändert. Bestätigung: `e.y = point.depotwert` (aus `app.js:209`), identisch mit `r.Depotwert` im Engine-Layer. Kein Unterschied zwischen `e.y` und Hauptserienpunkt-y.
- **Verhalten ohne passenden Hauptserienpunkt:** `if (snappedX === undefined) return null` + `.filter(pt => pt !== null)` — kein Marker gerendert. Bereits in `app.js:203` abgefangen (`if (!point) continue`), daher Doppel-Guard.

## Visual unverändert

- Farbe: petrol (unverändert)
- Offener Ring: `pointBackgroundColor: 'transparent'`, `pointBorderWidth: 1.5` (unverändert)
- Tooltip ausgeschlossen: Scatter-Dataset selbst löst keinen Tooltip aus (`pointHitRadius: 0` + `tooltipConfig.filter`). Normaler Linien-Tooltip an Ringposition bleibt erhalten — gewünscht (Beschluss 2026-06-18).
- Legende ausgeschlossen: `label: ''` + `_fwAnnotationMarker`-Guard in `FwRenderer._renderLegend` (unverändert)
- Interaktion ausgeschlossen: `pointHoverRadius: 0`, `pointHitRadius: 0` (unverändert)

## Prüfungen

**Statisch:**
- Marker-Dataset nutzt nicht mehr `e.x` — stattdessen `_monthToSnappedX.get(e.month)` ✓
- `app.css` nicht geändert ✓
- JSON-Dateien nicht geändert ✓
- `events.json` nicht vorhanden / nicht geändert ✓
- Keine Pulse-Logik ✓
- Keine Screen-3-Logik ✓
- `xDisplayRange`/`yRangePolicy`-Logik unverändert (Map wird vor dem Marker-Block eingefügt, kein Scope-Einfluss auf spätere Blöcke) ✓
- Tooltip-/Legend-Ausschluss-Guards erhalten: `pointHitRadius: 0`, `_fwAnnotationMarker`-Filter ✓

**Manueller Testplan:**

Szenario: Station 2 (ein Ring sichtbar), Station 3 (zwei Ringe sichtbar).

1. Browser-DevTools öffnen, Console leeren.
2. Screen 2 laden (z.B. Station 2 der Journey).
3. Chart Canvas inspizieren: Ring-X-Position muss exakt auf der Datenlinie liegen, kein Versatz nach links.
4. Hover über Ring: normaler Depotwert-Linien-Tooltip erscheint — kein Scatter-eigener Tooltip. Gewünscht (Beschluss 2026-06-18).
5. Legende zeigt den Ring nicht.
6. Screen 2 weiterschalten auf Station 3: beide Ringe auf den korrekten Linienpunkten.
7. X-Achsen-Ticks unverändert (monatliche Ticks stabil).
8. Y-Achse nicht geschrumpft.

**Ergebnis:** Statisch grün. Manueller Test durch Albert ausstehend.

## Offene Punkte klassifiziert

- **Pulse:** bewusst offen — kein Blocker für B1-AP-14c3
- **Screen-3-Final-Reveal-Ringe (B1-AP-14c3):** bewusst offen — nächster geplanter Schritt
- **CI-Farbe Purpur:** bewusst offen — wird über CSS/Theme-Konfiguration geregelt, kein Blocker
- **yRangeResetKey gleicher Run:** bewusst offen — kein Blocker für aktuelle Sequenz
- **app.test.html-Hook:** bewusst offen — Regression-Matrix-Check durch Albert ausstehend

## Bestätigungen

- Keine CSS geändert: ✓
- Keine JSON geändert: ✓
- Keine events.json: ✓
- Keine Pulse-Logik: ✓
- Keine Screen-3-Logik: ✓
- Keine xDisplayRange/yRangePolicy-Logik verändert: ✓
- Keine Commits ausgeführt: ✓
- Kein Abschlussritual ausgeführt: ✓

## Nächster sinnvoller Schritt

**B1-AP-14c3 — Screen-3-Final-Reveal-Ringe** (war bereits als nächster Schritt geplant).  
Voraussetzung: Albert bestätigt manuellen Testplan oben (Station 2 / Station 3 Ring-Positionen).
