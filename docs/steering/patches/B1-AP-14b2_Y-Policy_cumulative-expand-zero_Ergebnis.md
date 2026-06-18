# B1-AP-14b2 Ergebnis

Stand: 2026-06-18 | Session: B1-AP-14b2 | Geändert von: Claude

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` (protected — durch AP-Auftrag gedeckt)
- `Theme/assets/js/fw-chart-engine/strategies/BaseChartStrategy.js`
- `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js`
- `Theme/assets/js/fw-chart-engine/core/FwSmartYAxis.js`

Nicht geändert: FwSmartScales.js, FwSmartXAxis.js, FwDateUtils.js, app.js, stations.de.json

## Implementierter Vertrag

- **yRangePolicy:** `'cumulative-expand-zero'` — optionaler String in `renderFromData(options)`. Nur dieser Wert erlaubt; anderer Wert -> showError + return.
- **yRangeResetKey:** beliebiger Wert (String/Number/Boolean/null). Wechsel des Keys -> `yMaxSeen` wird auf 0 zurueckgesetzt.
- **axisMemory / yMaxSeen:** lebt in `state.axisMemory.yMaxSeen` (WeakMap per Container in ChartEngine). Wird nach jedem `transform()`-Aufruf akkumuliert: `yMaxSeen = Math.max(yMaxSeen, fwContext.dataRange.maxY)`.
- **yMin = 0:** FwSmartYAxis setzt `rawMin = 0` wenn Policy aktiv. Vorhandene `_tightBound`-Logik gibt bei rawValue=0 direkt 0 zurueck -> axis.min = 0 immer.
- **yMax nur aus bekanntem Pfad:** `rawMax = Math.max(axis.max, yRangeMemory.yMaxSeen)`. `axis.max` kommt aus Chart.js (nur uebergebene Daten). App liefert nur `visibleSeries` — kein Zugriff der Engine auf Zukunftsdaten.
- **keine Kontraktion:** Bestehender yMaxSeen floort den neuen rawMax -> Achse waechst oder bleibt, schrumpft nie.

## Architektur

- **State-Ort:** `state.axisMemory.yMaxSeen` in ChartEngine WeakMap (Layer 2). Kein modulweiter statischer Speicher.
- **fwContext-Felder:** `yRangePolicy: string|null`, `yRangeMemory: {yMaxSeen: number}|null` — beide optional, bei fehlender Policy auf `null`. BaseChartStrategy._createFwContext passiert sie durch.
- **FwSmartYAxis-Aenderung:** 7 Zeilen in `_performDynamicRescaling` nach dem Leerdiagramm-Fallback, vor dem Grace-Buffer. Policy-Block ueberschreibt rawMin/rawMax; der Rest des bestehenden Algorithmus (Grace, Baseline, Nice-Step, TightBound) laeuft unveraendert auf den neuen Werten.
- **Standardcharts ohne Policy:** `fwContext.yRangePolicy === null` -> Policy-Block wird nicht betreten -> Verhalten unveraendert.

## Datenfluss (pro Render)

```
renderFromData(options.yRangePolicy, options.yRangeResetKey)
  -> validate + store in state.config
  -> _draw():
      runtimeConfig.yRangeMemory = { yMaxSeen: state.axisMemory.yMaxSeen }  <- VORHER
      -> strategy.transform(data, runtimeConfig)
          -> _createFwContext({ yRangePolicy, yRangeMemory })
          -> fwContext (frozen)
      state.axisMemory.yMaxSeen = max(yMaxSeen, fwContext.dataRange.maxY)  <- NACHHER
      -> getChartConfig(chartData)
          -> FwSmartYAxis._performDynamicRescaling(axis, fwContext)
              if (yRangePolicy === 'cumulative-expand-zero'):
                  rawMin = 0
                  rawMax = max(rawMax, yRangeMemory.yMaxSeen)
              -> vorhandener TIGHT-FRAME-Algorithmus
```

Das yRangeMemory, das FwSmartYAxis erhaelt, ist der Stand VOR diesem Render (vorheriger akkumulierter Max). Erst nach transform() wird yMaxSeen aktualisiert. Erste Render startet mit yMaxSeen=0 (rawMax aus Daten dominiert); zweiter Render hat yMaxSeen aus Render 1.

## Nicht bearbeitet

- **App-Anschluss:** app.js unveraendert. xDisplayRange, yRangePolicy, yRangeResetKey folgen in B1-AP-14b3.
- **Marker:** nicht beruehrt.
- **Diagnostik-Logs:** in FwSmartXAxis aktiv, in diesem AP nicht entfernt.
- **Re-Render-Manuelltest:** folgt in B1-AP-14b3 nach App-Anschluss.

## Pruefungen

- **ausgefuehrt:** Statische Code-Analyse + Grep-Verifikation aller Aenderungen.
- **Ergebnis:**
  - Policy-Felder ausschliesslich in 4 Engine-Dateien gefunden
  - Kein Treffer fuer App-Pfade oder app.js
  - Kein modulweiter statischer Speicher in FwSmartYAxis
  - BarChartStrategy, PieChartStrategy: params.yRangePolicy = undefined -> || null -> FwSmartYAxis-Block nicht aktiv
  - Globaler _processContainer-Pfad (CSV-Charts): state.axisMemory = undefined -> Guard greift -> keine Auswirkung
  - _tightBound(rawValue=0, ...) -> erster Check `if (rawValue === 0) return 0` -> axis.min = 0 korrekt

## Bestaetigungen

- Keine App-Dateien geaendert: ja
- Keine JSON geaendert: ja
- Keine Marker implementiert: ja
- Keine XAxis-Logik veraendert: ja
- Kein Post-Render-Hack: ja
- Keine Commits ausgefuehrt: ja
- Kein Abschlussritual ausgefuehrt: ja

## Offene Punkte fuer B1-AP-14b3

- App-Anschluss xDisplayRange: `{ min: ctx.startMonth, max: ctx.latestMonth }`
- App-Anschluss yRangePolicy: `'cumulative-expand-zero'` im options-Objekt
- App-Anschluss yRangeResetKey: Key aus Journey-Parametern ableiten (z. B. `${sparrate}-${startMonth}`)
- Re-Render-/WeakMap-Test: manuell pruefen dass Y-Gedaechtnis ueber mehrere renderFromData-Aufrufe waechst und bei Key-Wechsel zurueckgesetzt wird
- Neustart-/Sparraten-Reset-Test: neuer Journey-Run nullt Y-Speicher korrekt
- Diagnostik-Log-Cleanup (optional): FwSmartXAxis-Logs aus B1-AP-14b1 bei Gelegenheit entfernen
