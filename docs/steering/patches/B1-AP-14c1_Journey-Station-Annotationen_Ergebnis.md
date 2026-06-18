Stand: 2026-06-18 17:00 | Session: B1-AP-14c1 | Geändert von: Claude

# B1-AP-14c1 Ergebnis

## Geänderte Dateien
- `Apps/prokrastinations-preis/app.js` — Helper `buildJourneyStationAnnotations` neu, `renderJourneyStep` ergänzt
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` — `annotations` aus Options parsen und in State speichern
- `Theme/assets/js/fw-chart-engine/strategies/BaseChartStrategy.js` — `annotations` in fwContext-Freeze
- `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js` — `annotations` an `_createFwContext` weitergeben

## Abgeleitete Annotationen
- Quelle: `journeyStations.slice(0, stationIdx)` — nur Stationen vor der aktuellen
- Filter past-only: `slice(0, stationIdx)` — mechanisch, kein Datumsvergleich nötig
- Ausschluss current: durch `slice(0, stationIdx)` — aktuelle Station nie enthalten
- Ausschluss future: durch `slice(0, stationIdx)` — Zukunft nie enthalten
- Ausschluss final_reveal: `if (s.role === 'final_reveal') continue` — expliziter Guard
- markerY / Snapshot-Snap: `visibleSeries.find(p => p.month === sMonth)` — exakter Monatsabgleich, keine Interpolation; kein Punkt → keine Annotation

## Datenmodell
- Optionsfeld: `annotations: { events: journeyAnnotations }` in `renderFromData()` options
- fwContext.annotations: `Object.freeze({ ..., annotations: params.annotations || null, ... })` in `_createFwContext`
- Mindestfelder pro Event: `id, type, month, x, y, source, role, status, headline`
- Beispiel einer Annotation:
  ```js
  {
    id:       'station_2020_03_covid_crash',
    type:     'journey-station',
    month:    '2020-03',
    x:        1583020800000,
    y:        9234.56,
    source:   'journey-stations',
    role:     'crisis',
    status:   'past',
    headline: 'Börsenhandel an der Wall Street ausgesetzt'
  }
  ```

## State / Lebensdauer
- Wo entstehen Annotationen: in `renderJourneyStep()` (app.js), neu berechnet pro Step
- Wie werden sie pro Station neu berechnet: `buildJourneyStationAnnotations(journeyStations.slice(0, stationIdx), visibleSeries)` — bei jedem `renderJourneyStep`-Aufruf
- Warum kein Pulse-State: B1-AP-14c3, nicht dieses AP
- Warum kein globaler Speicher: Annotationen sind deterministisch aus stationIdx ableitbar, kein Cache nötig

## Nicht implementiert
- Marker-Dataset: nein
- offene Ringe: nein
- Pulse: nein
- Tooltips: nein
- Labels: nein
- Legende: nein
- events.json: nein

## Prüfungen
- ausgeführt: `git diff --stat` + vollständiger Diff aller vier Dateien
- Ergebnis: 40 insertions, 2 deletions (nur Komma-Nachziehen in bestehender Zeile). Keine Logik- oder Visualisierungsänderungen.

## Bestätigungen
- Keine CSS geändert: **ja**
- Keine JSON geändert: **ja**
- Keine Marker gerendert: **ja** — fwContext.annotations liegt bereit, kein Rendering-Code hinzugefügt
- Keine Pulse-Logik: **ja**
- Keine xDisplayRange/yRangePolicy-Logik verändert: **ja**
- Keine Commits ausgeführt: **ja**
- Kein Abschlussritual ausgeführt: **ja**

## Offene Punkte für B1-AP-14c2
- Marker-Dataset: Scatter-Dataset aus `fwContext.annotations.events` aufbauen
- offene Ringe: `pointStyle: 'circle'`, `pointBackgroundColor: 'transparent'`, `pointBorderWidth` per Rolle
- Tooltip-/Legend-Ausschluss: Marker-Dataset aus Tooltip und Legende ausblenden
- Screen-3-Final-Reveal-Ringe: gehört zu B1-AP-14c3 (nach Pulse-AP)
