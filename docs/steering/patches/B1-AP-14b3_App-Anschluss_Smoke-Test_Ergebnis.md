Stand: 2026-06-18 | Session: B1-AP-14b3 | Geändert von: Claude

# B1-AP-14b3 Ergebnis

## Geänderte Dateien
- `Apps/prokrastinations-preis/app.js` — renderJourneyStep (4 Zeilen neu, 3 Zeilen ersetzt)

## App-Anschluss
- xDisplayRange: `{ min: ctx.startMonth, max: ctx.latestMonth }` — vollständige 10-Jahres-Domain aus appData
- yRangePolicy: `'cumulative-expand-zero'` — Y-Achse wächst, schrumpft nicht, startet bei 0
- yRangeResetKey: `journeyRangeKey` — stabil für gesamten Journey-Run, ändert sich bei neuer Rate
- visibleSeries unverändert: `buildVisibleChartSeries(ctx.chartSeries, stationMonth)` — bleibt wie bisher

## yRangeResetKey
- Zusammensetzung: `[currentRate, ctx.startMonth, ctx.latestMonth].join('|')`
  - Beispiel bei Rate 300, Zeitraum 2001-01 bis 2010-12: `"300|2001-01|2010-12"`
- bleibt stabil beim Weiterklicken: Ja — `currentRate` wird bei `btnS1Next` eingefroren;
  `ctx.startMonth` und `ctx.latestMonth` kommen aus statischem `appData` (einmalig geladen)
- ändert sich bei neuer Zeitreise / Sparrate: Ja — wenn Nutzer Slider ändert und erneut
  `btnS1Next` drückt, wird `currentRate` neu eingefroren → anderer Key → yMaxSeen-Reset

## Smoke-Test
- Station 1: **statisch bestätigt** — `xDisplayRange` setzt volle Domain; `visibleSeries` trimmt auf
  Station 1 (buildVisibleChartSeries); Engine zeigt rechten Bereich leer; Y startet bei 0
  (cumulative-expand-zero: rawMin=0)
- Station 2: **statisch bestätigt** — gleicher `journeyRangeKey`, Engine nutzt gespeichertes
  `yMaxSeen` → Y-Achse bleibt gleich oder expandiert, schrumpft nicht; X-Domain unverändert
- weitere Station: **statisch bestätigt** — WeakMap-State in ChartEngine persistiert `yMaxSeen`
  solange `yRangeResetKey` gleich bleibt
- neue Sparrate / Neustart: **statisch bestätigt** — Slider-Änderung invalidiert `lastRenderedRateS3`;
  bei erneutem `btnS1Next` neues `currentRate` → neuer `journeyRangeKey` → Engine-Reset
- Re-Render-/WeakMap-Verhalten: **manuell zu prüfen** — statischer Befund legt korrektes
  Verhalten nahe; Browser-Test erforderlich um WeakMap-Reset und yMaxSeen-Persistenz zu
  beobachten (DevTools: keine direkten Assertions möglich)

## Manueller Testplan

Da kein Test-Hook in `app.test.html` vorhanden ist, der WeakMap-State direkt prüft:

**Prüfschritt 1 — Station 1:**
1. App laden (Live Server, app.test.html oder live)
2. Sparrate einstellen (z.B. 300 €)
3. „Weiter zur Zeitreise" klicken
4. Erwarten: Chart zeigt volle X-Domain (Start bis Heute); Linie endet kurz nach links; Y startet bei 0

**Prüfschritt 2 — Station 2 und 3:**
5. „Weiter" klicken (Station 2, dann 3)
6. Erwarten: X-Domain bleibt unverändert; Linie wächst; Y-Achse bleibt gleich oder expandiert niemals schrumpft

**Prüfschritt 3 — Y-Gedächtnis:**
7. Mehrere Stationen durchklicken bis zu einer hohen Station
8. Zurückblättern auf Screen 1 (falls Navigation vorhanden) oder neu laden
9. Neuen Journey starten ohne Ratenänderung
10. Erwarten: Y-Achse startet neu (neuer Journey, aber gleicher Key) → ODER WeakMap persistiert
    (abhängig von Chart-Instanz-Lebensdauer — zu beobachten)

**Prüfschritt 4 — Sparraten-Reset:**
11. Slider auf anderen Wert (z.B. 500 €)
12. „Weiter zur Zeitreise"
13. Station 1 neu anzeigen
14. Erwarten: Y-Achse beginnt bei 0; kein yMaxSeen aus vorherigem Run

## Prüfungen
- ausgeführt: statische Prüfung via PowerShell/Select-String
- Ergebnis:
  - Chart.getChart: 0 Treffer ✓
  - xDisplayRange gesetzt: Zeile 456 ✓
  - yRangePolicy gesetzt: Zeile 457 ✓
  - yRangeResetKey gesetzt: Zeile 458 ✓
  - journeyRangeKey stationenstabil (Ableitung geprüft): ✓
  - options.scales.x.max: 0 Treffer ✓
  - chart.update: 0 Treffer ✓
  - marker: 0 Treffer ✓
  - Date.now(): 0 Treffer ✓
  - git diff --name-only: nur app.js und session-log.md ✓

## Nicht bearbeitet
- Marker: nicht implementiert ✓
- Pulse: nicht implementiert ✓
- Diagnostics-Log-Cleanup: nicht berührt; FwSmartXAxis-Logs aus B1-AP-14b1 bleiben
  als Cleanup-Kandidat für Folge-AP
- Engine-Refactoring: nicht berührt ✓
- Screen-3-/4-Logik: nicht berührt ✓

## Bestätigungen
- Keine Engine-Dateien geändert: ✓ (git diff bestätigt)
- Keine JSON geändert: ✓
- Keine Marker implementiert: ✓
- Kein Post-Render-Hack: ✓ (chart.update 0 Treffer)
- Keine Commits ausgeführt: ✓
- Kein Abschlussritual ausgeführt: ✓

## Offene Punkte für Folge-AP
- **Manueller Browser-Smoke-Test** (B1-AP-14b3 Testplan oben) noch ausstehend —
  Albert führt durch, bevor nächstes AP beginnt
- **Diagnostics-Log-Cleanup** (FwSmartXAxis-Logs aus B1-AP-14b1): als eigenes kleines AP
  oder als Teil von B1-AP-14c1
- **app.test.html**: kein dedizierter Test-Hook für WeakMap-State vorhanden;
  bei Bedarf für B1-AP-14c ergänzen
