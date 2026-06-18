# B1-AP-14c2 Ergebnis

Stand: 2026-06-18 | Session: B1-AP-14c2 | Geändert von: Claude

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js` (+23 Zeilen in transform + getChartConfig)
- `Theme/assets/js/fw-chart-engine/core/FwRenderer.js` (+4 Zeilen netto in _renderLegend)

Nicht geändert: app.js, app.css, JSON, FwSmartYAxis, FwSmartXAxis, CSVParser, FinanzwesirData.

## Marker-Dataset

- Quelle: `config.annotations.events` (aus `fwContext.annotations` via B1-AP-14c1)
- Dataset-Typ: `type: 'scatter'` (Mixed-Chart im LineChart-Kontext)
- Datenfelder: `x = event.x` (Timestamp first-of-month), `y = event.y` (depotwert aus Snapshot-Snap)
- Sichtbarkeit bei leeren annotations: kein Dataset, Chart rendert normal, kein Fehler
- Flag: `_fwAnnotationMarker: true` (kennzeichnet das Dataset systemweit)

## Visual

- offene Ringe: ja — `pointStyle: 'circle'`, `pointBackgroundColor: 'transparent'`
- Füllung: transparent
- Randfarbe: `this.theme.colors.petrol` (`#218380` als Fallback, CSS-Variable-Override möglich)
- Größe: `pointRadius: 5` (sichtbar, nicht dominant)
- keine Alarmfarbe: kein Rot, keine semantische Rolle differenziert (Rollenstruktur im event.role vorhanden, Styling einheitlich)

## Tooltip / Legende / Interaktion

- Tooltip ausgeschlossen: ja — `tooltipConfig.filter = (item) => !item.dataset._fwAnnotationMarker`
- Legende ausgeschlossen: ja — `mainDatasets.filter(ds => !ds._fwAnnotationMarker)` für Längencheck + `continue` im Loop (Originalindex für Chart.js-Toggles bleibt erhalten)
- Click/Tap ausgeschlossen: ja — kein Event-Handler, kein hitRadius-Bereich (`pointHitRadius: 0`)
- Hover-Verhalten: `pointHoverRadius: 0` — kein visueller Zustandswechsel bei `interaction.mode: 'index'`

## Y-/X-Achsen-Sicherheit

- Marker verändern Hauptserie: nein — separates Dataset, `datasets.push` nach der Hauptschleife
- Marker verändern Y-Policy: nein — kein Zugriff auf FwSmartYAxis, kein axisMemory
- Marker verändern XAxis: nein — FwSmartXAxis unverändert
- Marker aus Zukunftsdaten: nein — Quelle ist `pastStations = slice(0, currentIdx)` (aus B1-AP-14c1); final_reveal-Guard aktiv
- Y-Achse Erweiterung: markerY stammt aus der sichtbaren Hauptserie (`point.depotwert`), liegt daher im bekannten Y-Pfad

## Tests / Prüfungen

### Statisch

- [OK] keine app.js geändert
- [OK] keine CSS geändert
- [OK] keine JSON geändert
- [OK] kein events.json
- [OK] kein Pulse-Code
- [OK] kein Marker-Tooltip
- [OK] kein Marker-Legendeneintrag (mainDatasets-Check schützt auch den `< 2`-Guard)
- [OK] kein main-series pointRadius-Umbau (`if (ds._fwAnnotationMarker) return;` in forEach)
- [OK] keine Y-Policy-Änderung
- [OK] keine XAxis-Änderung

### Manuell (durch Albert)

Prüfschritte:

```
Station 1 aktiv: keine Marker sichtbar (pastStations ist leer)
Station 2 aktiv: genau 1 Ring sichtbar (für Station 1)
Station 3 aktiv: 2 Ringe sichtbar (für Station 1 und 2)
aktuelle Station: kein Ring
Tooltip hover: Annotation-Datasets erscheinen nicht in Tooltip-Box
Legende: Marker erscheinen nicht als Legende-Item
X-Achse: stabil, keine Domain-Verschiebung
Y-Achse: schrumpft nicht, Y-Policy bleibt cumulative-expand-zero
```

Erwartetes Visual: petrol-farbene offene Ringe auf der Linie, kein Label, kein Tooltip, kein Hover-Effekt.

### Ergebnis

Statisch: grün — alle Invarianten eingehalten, alle Nicht-Ziele sauber ausgeschlossen.
Manuell: ausstehend — Browser-Test durch Albert.

## Offene Punkte klassifiziert

- Screen-3-Final-Reveal-Ringe: bewusst offen — explizit aus diesem AP ausgeschlossen (AP-14c3 oder später)
- Pulse: bewusst offen — explizit aus diesem AP ausgeschlossen
- app.test.html-Hook: bewusst offen — kein Auftrag in diesem AP
- yRangeResetKey gleicher Run: bewusst offen — kein Scope-Bezug in diesem AP
- X-Alignment: `event.x = new Date(sMonth + '-01').getTime()` (first-of-month) vs. Snapshot-Snap (main series). Visuell: Marker erscheinen am Monatsanfang, Datenpunkte am Snap-Datum. Abstand maximal 30 Tage, bei Monats-Rhythmus kaum sichtbar. Kein Blocker — kann in separatem AP justiert werden wenn sichtbar störend.

## Bestätigungen

- Keine app.js geändert: ja
- Keine CSS geändert: ja
- Keine JSON geändert: ja
- Keine events.json: ja
- Keine Pulse-Logik: ja
- Keine xDisplayRange/yRangePolicy-Logik verändert: ja
- Keine Commits ausgeführt: ja
- Kein Abschlussritual ausgeführt: ja

## Nächster sinnvoller Schritt

B1-AP-14c3: Screen-3-Final-Reveal-Ringe (bewusst offener Punkt aus diesem AP) — oder manueller Test-Bestätigung durch Albert erst abwarten.
