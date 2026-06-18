# B1-AP-14c4 Ergebnis

Stand: 2026-06-18 | Session: B1-AP-14c4 | Geändert von: Claude

---

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/plugins/FwAnnotationPulsePlugin.js` — NEU
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` — annotationPulse-Extraktion + Plugin-Injektion
- `Apps/prokrastinations-preis/app.js` — annotationPulse für Screen-2 aktiviert

LineChartStrategy.js: **nicht geändert** (Identität der Marker-Punkte wird über x-Koordinate = snapped Timestamp ermittelt, kein _id-Feld nötig)

---

## Pulse-Vertrag

- Optionsfeld: `annotationPulse: { enabled: true, mode: 'newly-added' }`
- Screen-2-Aktivierung: `renderJourneyStep` übergibt `annotationPulse: { enabled: true, mode: 'newly-added' }` an `chartEngine2.renderFromData`
- Screen-3-Deaktivierung: `renderS3` übergibt kein `annotationPulse` → Plugin-Guard greift (`opts?.enabled` = falsy → sofort return)
- reduced-motion: `_reducedMotion()` in Plugin prüft `window.matchMedia('(prefers-reduced-motion: reduce)').matches` — wenn true, sofort return, kein Pulse, Ringe bleiben sichtbar

---

## Runtime-State

- Speicherort: `const _pulseState = new WeakMap()` in `FwAnnotationPulsePlugin.js` — Modulebene, scoped auf Chart-Instanz
- Container-/Chart-Bezug: WeakMap-Key ist die Chart.js-Instanz (nicht der DOM-Container) → kein Cross-Chart-Leak
- previousIds: `Set<String>` mit stringified x-Koordinaten (snapped Timestamps) der zuletzt gesehenen Annotation-Punkte
- newIds: Differenz `currentIds - previousIds`, berechnet in `afterDraw` bei jedem Render
- Reset-/Leerfallverhalten: Wenn kein `_fwAnnotationMarker`-Dataset gefunden (`dsIdx === -1`) → `previousIds = new Set()` → beim nächsten Journey-Neustart pulsen alle Stationen korrekt erneut
- kein Domain-State: Kein Schreiben in `stations.de.json`, `events.json`, `fwContext`, Annotation-Objekten oder anderen persistenten Strukturen

---

## Visual (Produktionswerte)

- Pulse-Dauer: **1200 ms** (2 Pulse à 600 ms)
- Pulse-Form: `Math.abs(Math.sin(progress * π * 2))` — zwei symmetrische Auswüchse; zweiter Puls durch Alpha-Fade schwächer (wirkt wie Echo)
- Scale-Maximum: **1.8x** (Ring wächst auf 180 % des Ausgangsradius)
- Alpha-Fade: 1.0 → 0.0 über gesamte Dauer
- keine Alarmfarbe: `borderColor` aus `dataset.pointBorderColor` (petrol = `#006273`), kein Rot, kein Lila
- keine Endlosschleife: Animation terminiert nach 1200 ms; rAF-Loop nur solange `animations.size > 0`
- rAF-Guard: `state.rafPending` verhindert doppelte rAF-Queues

---

## Architektur-Entscheidung: Render-Mechanik (v1.2.0)

`_standaloneLoop` ruft `chart.draw()` auf, statt direkt auf `chart.ctx` zu schreiben.

**Grund:** Chart.js hat Canvas-Ownership. Wenn der Standalone-Loop direkt auf `chart.ctx` malt, kann Chart.js's eigener Render-Zyklus (Resize, interne Animationen) den Canvas löschen und das Gezeichnete sofort überschreiben. `chart.draw()` triggert `afterDraw` → `afterDraw` ist einziger Zeichenort für `_drawPulses`.

Bestätigt durch Peer-Review von Perplexity und ChatGPT (2026-06-18).

---

## Architektur-Entscheidung: ID-Strategie

Statt `_id: e.id` in LineChartStrategy-Scatter-Punkte zu schreiben, nutzt das Plugin die **snapped X-Koordinate** (`String(pt.x)`) als stabilen Identifier. Jede Journey-Station mappt auf einen eindeutigen Snapshot-Monat → eindeutiger snapped Timestamp → kollisionsfreie ID. Vorteil: LineChartStrategy bleibt unberührt.

---

## Architektur-Entscheidung: Plugin-Platzierung

Plugin liegt als eigene Datei in `plugins/` (neuer Ordner) statt in `core/FwChartPlugins.js`, um die Separation of Concerns zu wahren (Pulse-Logik ≠ allgemeine Chart-Plugins). Import und Injektion durch ChartEngine.js.

---

## Entwicklungsverlauf — Irrungen und Korrekturen

### v1.0 — Erster Ansatz: falscher Hook, unsichtbarer Start

**Ansatz:** `afterDatasetsDraw` als Hook + `chart.update('none')` zum Antreiben der Animation.

**Probleme:**
- Scale startete bei 1.0 → erster Frame des Pulse-Rings lag exakt auf dem statischen Ring → optisch unsichtbar
- `afterDatasetsDraw` ist nicht der letzte Hook: spätere Hooks (z.B. Crosshair-Plugin) zeichneten über den Pulse-Ring
- `chart.update('none')` riskiert Achsen-/Layout-Neuberechnung

**Fix:** Wechsel zu `afterDraw` (absolut letzter Hook) + eigenem `requestAnimationFrame`-Loop.

---

### v1.1 — Zweiter Ansatz: falscher Wert, falscher Ort

**Ansatz:** `afterDraw` + Standalone-rAF-Loop mit direktem Canvas-Draw.

**Problem 1: `prefers-reduced-motion` blockiert (Testsystem)**
- Symptom: Keine Animation, keine Fehlermeldung
- Ursache: Windows-Einstellung „Animationseffekte deaktiviert" → Browser meldet `prefers-reduced-motion: reduce`
- Konsolen-Nachweis via Tracer: `[PULSE] Guard: prefers-reduced-motion aktiv — kein Pulse`
- Das Plugin arbeitete korrekt — der Guard ist spec-konform
- Umweg für Test: Guard temporär auskommentiert → Animation sichtbar
- Entscheidung: Guard bleibt aktiv
- Für Test auf Alberts System: DevTools → Rendering → „Emulate prefers-reduced-motion: no-preference"

**Problem 2: `_reducedMotion` fehlt in Produktionsversion**
- Symptom: `Uncaught ReferenceError: _reducedMotion is not defined` in jedem `afterDraw`
- Ursache: Beim Schreiben der Produktionsdatei wurde die `_reducedMotion()`-Funktion versehentlich nicht eingetragen, obwohl der Guard-Aufruf im Code stand
- Folge: Plugin crashte vor jeder Animations-Logik → keine Animation
- Fix: Funktion nachgetragen

**Problem 3: Animation läuft, aber zu subtil**
- Symptom: Keine sichtbare Animation mit Produktionswerten (350 ms, 1.4x)
- Konsole zeigte `animations.size: 0` konsistent → zunächst verdächtig
- Analyse: Chrome DevTools kollabiert identische Log-Einträge. Die 21 Frames mit `animations.size: 3` (bei 350 ms, 60 fps) wurden zur einer Zeile zusammengefasst; Albert sah nur die Post-Expiry-Frames
- Bestätigung: Mit exaggerierten Werten (3000 ms, 4.0x) war die Animation sichtbar
- Peer-Review-Dokument erstellt: `B1-AP-14c4_PeerReview_Problemzusammenfassung.md`

**Canvas-Ownership-Problem (Peer-Review-Befund)**
- Perplexity und ChatGPT identifizierten unabhängig: `_standaloneLoop` zeichnet direkt auf `chart.ctx`, Chart.js kann dies im nächsten Frame überschreiben
- Bewertung mit vier Denkschulen (Occams Rasiermesser, Via Negativa, Advocatus Diaboli, Munger-Inversion): Änderung defensiv richtig, Overhead akzeptabel
- Fix: `_standaloneLoop` ruft `chart.draw()` statt direkt auf Canvas zu malen

---

### v1.2 — Produktionsversion

**Änderungen gegenüber v1.1:**
- `_standaloneLoop`: `_drawPulses()` direkt → `chart.draw()` (Canvas-Ownership an Chart.js)
- PULSE_DURATION: 350 → 1200 ms (2 Pulse statt 1)
- PULSE_SCALE_MAX: 1.4 → 1.8 (gut sichtbar)
- Pulse-Formel: `Math.sin(progress * π)` → `Math.abs(Math.sin(progress * π * 2))` (2 Pulse)

**Werte-Iterationen:**
| Phase | Dauer | Scale | Ergebnis |
|---|---|---|---|
| Spec (Original) | 350 ms | 1.4x | Zu subtil — nicht sichtbar |
| Test A | 2000 ms | 5.0x | Sichtbar, zu übertrieben |
| Test B | 3000 ms | 4.0x | Sichtbar, zu übertrieben |
| Test C | 800 ms | 1.8x, 1 Puls | Sichtbar, aber zu kurz |
| **Produktion** | **1200 ms** | **1.8x, 2 Pulse** | **Korrekt — freigegeben** |

---

## Achsen / Tooltip / Legende

- XAxis unverändert: ✓
- YAxis unverändert: ✓
- Tooltip ausgeschlossen: ✓ (strategy's `tooltipConfig.filter` bleibt erhalten, LineChartStrategy nicht geändert)
- Legende ausgeschlossen: ✓ (`label: ''` im Annotation-Dataset bleibt erhalten)
- Interaktion ausgeschlossen: ✓ (`pointHoverRadius: 0`, `pointHitRadius: 0` bleibt erhalten)

---

## Tests / Prüfungen

### Statisch (vollständig geprüft)

| Prüfpunkt | Ergebnis |
|---|---|
| Keine JSON geändert | ✓ |
| Keine CSS geändert | ✓ |
| Keine events.json | ✓ |
| Screen 2 aktiviert Pulse | ✓ `annotationPulse: { enabled: true, mode: 'newly-added' }` |
| Screen 3 aktiviert Pulse nicht | ✓ kein `annotationPulse` in `renderS3` |
| reduced-motion deaktiviert Pulse | ✓ `_reducedMotion()` Guard in Plugin |
| Tooltip-/Legend-Ausschluss erhalten | ✓ LineChartStrategy unberührt |
| Marker-Dataset bleibt separates Dataset | ✓ LineChartStrategy unberührt |
| Keine XAxis/YAxis-Änderung | ✓ |
| Kein globaler unscoped State | ✓ WeakMap per Chart-Instanz |
| Screen-3-Ringe still | ✓ Guard via opts?.enabled |

### Manuell (durch Albert bestätigt 2026-06-18)

```
Station 1 (stationIdx=0): kein Marker sichtbar, kein Pulse               ✓
Station 2 (stationIdx=1): Station-1-Ring erscheint und pulst 2× (1200 ms) ✓
Station 3 (stationIdx=2): Station-2-Ring pulst 2×, Station-1-Ring still   ✓
Station 4 (stationIdx=3): Station-3-Ring pulst 2×, ältere Ringe still     ✓
Screen 3: alle Ringe sichtbar, kein Pulse                                  ✓ (nicht sep. getestet, Guard gesichert)
reduced-motion aktiv: kein Pulse, Ringe sichtbar                           ✓ (Guard verifiziert via Tracer)
Tooltip/Legende: unverändert                                               ✓
X/Y-Achsen: unverändert                                                    ✓
```

---

## Offene Punkte klassifiziert

- CI-Farbe Purpur: **bewusst offen** — kein Blocker für B1-AP-14c4
- yRangeResetKey gleicher Run: **bewusst offen** — kein Blocker für B1-AP-14c4
- app.test.html-Hook: **bewusst offen** — kein Blocker für B1-AP-14c4
- Abschluss-QA B1-AP-14d2: **bewusst offen** — kein Blocker für B1-AP-14c4

---

## Bestätigungen

- Keine CSS geändert: ✓
- Keine JSON geändert: ✓
- Keine events.json: ✓
- Keine Screen-3-Pulse: ✓
- Keine xDisplayRange/yRangePolicy-Logik verändert: ✓
- Keine Commits ausgeführt: ✓
- Animation freigegeben von Albert: ✓ 2026-06-18
