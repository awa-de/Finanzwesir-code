Stand: 2026-06-18 | Session: B1-AP-14d2 + B1-AP-14d3 | Geändert von: Claude

# B1-AP-14d2 Ergebnis — Mini-QA Progressive Domain + Marker + Pulse

## Git-/Arbeitsbaum

- HEAD: `02aa84e`
- uncommitted Dateien: keine (git status --short: leer)
- Bewertung: Sauberer Arbeitsbaum. B1-AP-14c4 ist committed. Alle AP-14-Änderungen eingecheckt.

---

## QA Screen 2 Progressive Domain

- **X-Achse:** `xDisplayRange: { min: ctx.startMonth, max: ctx.latestMonth }` — volles 10-Jahres-Fenster immer aufgespannt. In `LineChartStrategy.transform()` wird `displayRange = { min: dispMinTs, max: dispMaxTs }` korrekt gesetzt und via `fwContext.displayRange` übergeben. ✓
- **Linie:** `buildVisibleChartSeries(ctx.chartSeries, stationMonth)` filtert auf `p.month <= stationMonth` — Linie wächst nur bis aktuelle Station. ✓
- **rechter Leerbereich:** X-Achse aufgespannt bis `latestMonth`, keine Datenpunkte nach `stationMonth` — rechter Bereich bleibt leer. ✓ Keine Forecast-Linie, keine Fake-Daten, keine Dummy-Datasets.
- **Y-Achse:** `yRangePolicy: 'cumulative-expand-zero'` mit `axisMemory.yMaxSeen` in `ChartEngine`. `journeyRangeKey = [currentRate, ctx.startMonth, ctx.latestMonth].join('|')` ist innerhalb einer Zeitreise-Session konstant — kein ungewollter Reset. `yMaxSeen` wächst monoton. Y-Achse schrumpft nicht. ✓
- **Keine kritischen Muster:** `Chart.getChart`, `chart.update('none')`, `options.scales.x.max` — nicht in app.js vorhanden. ✓

---

## QA Screen 2 Marker

- **past-only:** `buildJourneyStationAnnotations(journeyStations.slice(0, stationIdx), visibleSeries)` — `slice(0, stationIdx)` schließt aktuelle und alle künftigen Stationen strukturell aus. ✓
- **current ausgeschlossen:** Per `slice(0, stationIdx)` — aktuelle Station ist nie in der Annotationsliste. ✓
- **future ausgeschlossen:** `visibleSeries` enthält nur Daten bis `stationMonth`; `slice(0, stationIdx)` enthält keine Zukunftsstationen. ✓
- **final_reveal ausgeschlossen:** `isFinalRevealStation(s)` in `buildJourneyStationAnnotations` — 5 Guards (role, date, status, flags.finalReveal, id-Substrings). Der `finalRevealStation` hat `role: 'final_reveal'` → Guard greift. ✓
- **Tooltip/Legende/Interaktion:** `tooltipConfig.filter = (item) => !item.dataset._fwAnnotationMarker` — Marker aus Tooltip gefiltert. ✓ `FwRenderer._renderLegend` filtert `_fwAnnotationMarker: true` Datasets explizit (`filter + continue` an Zeilen 334/339). Zusätzlich: nur 1 Haupt-Dataset (`Depotwert`) → `mainDatasets.length < 2 → return null` → keine Legende gerendert. ✓
- **Nicht klick-/tappbar:** `pointHitRadius: 0`, `pointHoverRadius: 0`. ✓
- **Alignment:** B1-AP-14c2b: Marker-X aus `_monthToSnappedX = new Map(rows.map((r, idx) => [month, snappedTimestamps[idx]]))` — exakter Calendar-Snap-Wert der Hauptserie. Marker-Y aus `visibleSeries.find(p => p.month === sMonth).depotwert` — exakter Datenpunkt. ✓

---

## QA Screen 2 Pulse

- **neu sedimentierter Ring:** `previousIds`-Set-Mechanik korrekt: Station 1 → `dsIdx === -1` → `previousIds = new Set()`. Station 2 → 1 Marker erscheint, alle IDs neu in `previousIds` → Pulse für station0. Station 3 → station0 bereits in `previousIds`, station1 neu → nur station1 pulst. ✓
- **ältere Ringe still:** Sobald eine ID in `previousIds` eingetragen ist, löst sie keinen neuen Pulse aus. ✓
- **keine Endlosschleife:** `_standaloneLoop` beendet sich bei `state.animations.size === 0` (`rafPending = false; return`). `_drawPulses` löscht alle IDs nach `PULSE_DURATION = 1200ms`. ✓ `rafPending` verhindert Doppel-Loop.
- **Produktentscheidung 1200 ms / 2 Pulse:** `PULSE_DURATION = 1200` (FwAnnotationPulsePlugin.js Zeile 20), `PULSE_SCALE_MAX = 1.8` (Zeile 21), `Math.abs(Math.sin(progress * Math.PI * 2))` → 2 symmetrische Auswüchse (Zeile 48). Von Albert freigegeben 2026-06-18. Kein Blocker.
- **Kein Pulse für final_reveal / aktuelle Station:** Beide durch `isFinalRevealStation` Guard bzw. `slice(0, stationIdx)` ausgeschlossen — kein Annotation-Punkt → kein Pulse. ✓
- **Keine Achsenänderung:** Plugin zeichnet ausschließlich auf Canvas via `afterDraw` nach Chart.js-Render. `chart.draw()` in `_standaloneLoop` löst kein Scale-Recalculate aus. Achsenwerte unverändert. ✓

---

## QA reduced-motion

- **statisch:** `_reducedMotion()` korrekt implementiert — `window.matchMedia('(prefers-reduced-motion: reduce)').matches` (FwAnnotationPulsePlugin.js Zeilen 23–27). `afterDraw` Zeile 84: `if (_reducedMotion()) return;` — sofortiger Abbruch, keine Pulse-Ringe werden gezeichnet. ✓
- **Ringe bleiben sichtbar:** Pulse-Plugin zeichnet nur die Pulse-Ringe; die Annotations-Marker (Scatter-Dataset) werden von Chart.js unabhängig gerendert. Bei `reduced-motion` verschwinden nur die Pulse-Überlagerungen, die statischen Ringe bleiben. ✓
- **Keine Fehlermeldung:** Plugin kehrt sauber zurück ohne Fehlercode. ✓
- **Keine Ersatzanimation:** Kein CSS-Fallback implementiert (keine CSS-Animation). Korrekt. ✓
- **manuell:** Browser-Emulation erforderlich. DevTools → Rendering → `prefers-reduced-motion: reduce`. Prüfliste: Ringe sichtbar, kein Pulse-Ring, keine Konsolen-Fehler.
- **Ergebnis:** statisch grün; manueller Test empfohlen aber kein Blocker.

---

## QA Screen 3

- **vollständige Linie:** `renderS3` übergibt `ctx.chartSeries` (volle 120 Monate) ohne `xDisplayRange` — Standard-Achse, voller Datensatz. ✓
- **historische Ringe:** `buildJourneyStationAnnotations(journeyStations, ctx.chartSeries)` mit `isFinalRevealStation` Guard — alle historischen Stationen erhalten Ringe, sofern Datenpunkt in `ctx.chartSeries` vorhanden. ✓
- **final_reveal ausgeschlossen:** `finalRevealStation` hat `role: 'final_reveal'` → `isFinalRevealStation` gibt `true` zurück → kein Ring. ✓
- **kein Ring für dynamic_latest_month:** `dynamic_latest_month` wird in `buildJourneyStations` zu konkretem YYYY-MM umgewandelt; `role: 'final_reveal'` bleibt → Guard greift. ✓
- **kein Pulse in Screen 3:** `renderS3` übergibt kein `annotationPulse`-Feld — `ChartEngine._draw` fügt `FwAnnotationPulsePlugin` nicht ein. ✓
- **Tooltip/Legende/Interaktion:** `tooltipConfig.filter` greift, `_fwAnnotationMarker` gefiltert. Keine Legende (single-dataset). ✓
- **X/Y-Achsen:** Screen-3-Chart ohne `xDisplayRange` und ohne `yRangePolicy` — Standard-Achsen, kein Eingriff. ✓

---

## Regression

- **Standard-LineCharts ohne xDisplayRange:** `if (config.xDisplayRange) { ... }` in `LineChartStrategy.transform()` → übersprungen, `displayRange = null`. In `ChartEngine.renderFromData()` → `xDisplayRange = null`. Standard-Verhalten unberührt. ✓
- **Standard-LineCharts ohne yRangePolicy:** `if (options.yRangePolicy != null) { ... }` → übersprungen, `axisMemory = null`. Standard Y-Achse. ✓
- **Charts ohne annotations:** `if (config.annotations?.events?.length > 0) { ... }` in `LineChartStrategy.transform()` → Marker-Dataset nicht erstellt. ✓
- **Charts ohne annotationPulse:** `if (runtimeConfig.annotationPulse?.enabled) { ... }` in `ChartEngine._draw()` → `FwAnnotationPulsePlugin` nicht eingefügt. ✓
- **Bar/Pie:** `init()` → `_processContainer()` nutzt CSV-Pipeline ohne `renderFromData`-Optionen. Bar/Pie-Strategien sind unberührt. ✓
- **Protected-Dateien:** `CSVParser.js` und `FinanzwesirData.js` — keine `// CHANGED` oder `// NEW` Marker (Haiku-Befund). ✓

---

## Offene Punkte klassifiziert

- **CI-Farbe Purpur:** Bewusst offen. Kein Purpur-Farbcode in app.js oder ChartEngine gefunden. `visualRules.redCrashColor/lossColoring/crashSegmentColoring: false` in stations.de.json blockiert Rot. Keine Blockerfunktion. **Kein Blocker.**
- **yRangeResetKey gleicher Run:** Kein reales Problem. `journeyRangeKey` ist innerhalb einer Zeitreise-Session konstant (Rate eingefroren, startMonth/latestMonth aus CSV konstant). Reset nur bei Session-Neustart (Rate-Änderung auf Screen 1) — korrekt. **Kein Blocker.**
- **app.test.html-Hook:** Manuelle QA ist der definierte Verifikationsmechanismus (CLAUDE.md §Testrealität). Albert hat B1-AP-14c3b (6 Prüfschritte) und B1-AP-14c4 manuell freigegeben. **Kein Blocker.** Scenarios REG-APP-003/004/005 (AB–AD) aus Commit 1c8fb8c ausstehend — als offener Punkt dokumentiert.
- **Pulse-Werte / Doku-Nachzug:** Code: 1200ms, 1.8x, 2 Pulse. Produktentscheidung von Albert 2026-06-18 freigegeben. APP_SPEC wurde in dieser QA nicht gelesen — ob APP_SPEC noch abweichende Werte enthält, ist offen. Empfehlung: APP_SPEC prüfen und ggf. Doku-Nachzug. **Kein Blocker** (Produktentscheidung existiert), Folgepunkt empfohlen.
- **FwRenderer Legende Single-Dataset:** `mainDatasets.length < 2 → return null` — keine Legende für App-Charts (1 Hauptserie). Marker-Dataset auch wenn er durchfiele: durch `filter + continue` korrekt ausgeschlossen. **Kein Problem.**

---

## Blocker

**Nein** — keine Blocker identifiziert.

---

## Empfohlene Folge-APs

**B1-AP-14d3** (optional, kein Blocker): APP_SPEC auf Pulse-Produktentscheidung aktualisieren.
- Prüfen ob APP_SPEC noch `350ms` / `400ms` o.ä. enthält.
- Falls ja: Doku-Nachzug auf `1200ms / 1.8x / 2 Pulse (Albert freigegeben 2026-06-18)`.

**app.test.html REG-APP-003/004/005 (AB–AD):** Visuelle Prüfung durch Albert ausstehend (aus Commit 1c8fb8c). Kein neuer AP nötig — bestehende offene Aufgabe.

---

## Bestätigungen

- Keine Codeänderung: ✓
- Keine CSS geändert: ✓
- Keine JSON geändert: ✓
- Keine events.json: ✓ (Datei existiert nicht, wie erwartet)
- Keine Commits ausgeführt: ✓
- Kein Abschlussritual ausgeführt: ✓

---

## Nachtrag B1-AP-14d3 — Spec-Drift-Bereinigung (ausgeführt in derselben Session)

### Ausgangsbefund aus B1-AP-14d2

Die QA identifizierte unter „Offene Punkte" einen Spec-Drift: APP_SPEC.md enthielt für den Pulse nur einen abstrakten Platzhalter ohne numerische Parameter. Befund (Zeile 1160 der APP_SPEC V2.7):

```
**Pulse:** Pulse ist ephemerer Runtime-State — gehört nicht in `stations.de.json`
und nicht dauerhaft in `fwContext`. Implementierung folgt außerhalb des Domain-State.
```

Zusätzlich fehlte in §14.6 (prefers-reduced-motion), §16.3 (UI-Primitive-Liste) und §16.4 (Reduced Motion) jegliche Referenz auf Pulse. QA_TEST_CASES.md hatte keine Pulse-Testfälle.

### Entscheidung

Albert bestätigte: „Das muss unbedingt gemacht werden — alles was wir an Rauschen rausbekommen können, müssen wir vernichten." → B1-AP-14d3 sofort ausgeführt.

### Durchgeführte Änderungen

**Datei 1: `Apps/prokrastinations-preis/APP_SPEC.md` — V2.7 → V2.8**

| Stelle | Was | Alt → Neu |
|---|---|---|
| Header | Version + Stand | V2.7 → V2.8; Stand aktualisiert |
| §16.1 Pulse-Absatz | Abstrakter Platzhalter | Vollständige Produktentscheidung mit Parametern (siehe unten) |
| §14.6 prefers-reduced-motion | Bullet-Liste | Neuer Bullet: `kein Pulse auf neu sedimentierten Marker-Ringen (Ringe bleiben statisch sichtbar)` |
| §16.3 UI-Primitive-Liste | Fehlender Eintrag | Neue Zeile: `Marker-Pulse-Ring \| 1200 ms, 1.8×, 2 Pulse \| Screen 2 \| ✅ B1-AP-14c4` |
| §16.4 Reduced Motion | 2 Zeilen | Neue Zeile: `Marker-Pulse: deaktiviert bei prefers-reduced-motion → Ringe erscheinen statisch, kein Pulse` |

**Neuer §16.1 Pulse-Absatz (vollständig):**

```
**Pulse (B1-AP-14c4 ✅ 2026-06-18):**

Pulse ist ephemerer Runtime-State — gehört nicht in `stations.de.json`
und nicht dauerhaft in `fwContext`.

Produktentscheidung (freigegeben Albert 2026-06-18):
- Scope: Screen 2 only; Screen 3 kein Pulse
- Welcher Ring pulst: nur der neu sedimentierte Ring (zuletzt hinzugekommen)
- Ausgeschlossen: aktuelle Station, Zukunftsstationen, `final_reveal`
- Pulse-Dauer: 1200 ms (2 Pulse à 600 ms)
- Pulse-Form: Math.abs(Math.sin(progress × π × 2)) — zwei Auswüchse;
  zweiter durch Alpha-Fade schwächer (Echo-Effekt)
- Scale-Maximum: 1.8× (Ring wächst auf 180 % des Ausgangsradius)
- Alpha-Fade: 1.0 → 0.0 über gesamte Dauer
- Keine Endlosschleife: Pulse stoppt nach PULSE_DURATION

`prefers-reduced-motion: reduce` → kein Pulse. Ringe bleiben statisch sichtbar.

Implementierung: `FwAnnotationPulsePlugin.js`
(WeakMap-State, `afterDraw`-Hook, `chart.draw()`-Pattern).
```

---

**Datei 2: `Apps/prokrastinations-preis/QA_TEST_CASES.md` — V1.4 → V1.5**

| Stelle | Was | Alt → Neu |
|---|---|---|
| TC-I01 Erwartetes Ergebnis | 3 Bullets | +2 Bullets: kein Pulse-Ring; Ringe sichtbar (Inhalt bleibt) |
| Datei-Ende | Footer | Neue Gruppe P (TC-P01–TC-P05) eingefügt; Footer aktualisiert |

**Neue Gruppe P — TC-P01 bis TC-P05:**

| TC | Titel | Prüft |
|---|---|---|
| TC-P01 | Station 1: kein Pulse | Kein Pulse wenn keine vergangenen Stationen |
| TC-P02 | Station 2: genau ein Pulse | Nur Station-1-Ring pulst; Endlosschleife ausgeschlossen |
| TC-P03 | Station 3: nur neuer Ring pulst | Station-1-Ring bleibt still; nur Station-2-Ring pulst |
| TC-P04 | Screen 3: kein Pulse | Historische Ringe statisch; kein Pulse nach Final-Reveal |
| TC-P05 | Reduced Motion: kein Pulse, Ringe sichtbar | DevTools-Test; Ringe bleiben; kein Konsolen-Fehler |

---

**Datei 3: `NAVIGATION.md`**

Einträge für B1-AP-14d2 und B1-AP-14d3 im B1-Abschnitt ergänzt.

---

### Scout-Befund: Warum keine alten Zahlenwerte in APP_SPEC waren

Der Spec-Scout fand `350ms` ausschließlich in den Peer-Review-Debugging-Patches (`B1-AP-14c4_PeerReview_Problemzusammenfassung.md`, `B1-AP-14c4_Pulse_Screen2_reduced-motion_Ergebnis.md`) — korrekt als historisches Belegmaterial. APP_SPEC V2.7 hatte keine falschen Werte, nur den abstrakten Platzhalter ohne Zahlen. Der Drift war eine Doku-Lücke, kein Widerspruch.

### Residualer offener Punkt aus B1-AP-14d3

§16.3 UI-Primitive-Tabelle: alle anderen Einträge (Slider, Chart, StationCard etc.) stehen noch auf „zu bauen", sind aber längst implementiert. Status-Sync der gesamten Tabelle übersteigt diesen AP-Scope. Empfehlung: eigener kleiner AP (B1-AP-14d4 oder Folge-Session).

### Abschluss-Status

- B1-AP-14d2 (QA): ✅ abgeschlossen — kein Blocker
- B1-AP-14d3 (Spec-Drift): ✅ abgeschlossen — Drift bereinigt
- Nächster Schritt: B1-AP-15 — Transitions + Reduced Motion
