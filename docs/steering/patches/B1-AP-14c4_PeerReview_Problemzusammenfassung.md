# B1-AP-14c4 — Peer Review: Pulse-Animation funktioniert nicht

Stand: 2026-06-18 | Erstellt für externes LLM-Review

---

## Aufgabe (was sollte gebaut werden)

Eine einmalige, ephemere Pulse-Animation für Annotation-Marker-Ringe in einer Chart.js-App.

**Auslöser:** Wenn in Screen-2 einer Journey-Step-Sequenz ein neuer Marker-Ring erscheint, soll dieser Ring einmalig kurz pulsieren (ca. 350 ms, Radius 1.0→1.4→1.0, Fade-out von Alpha 1.0→0.0).

**Constraints:**
- Kein Domain-State (kein Schreiben in JSON, kein fwContext)
- `prefers-reduced-motion: reduce` muss respektiert werden → kein Pulse
- Screen-3 bekommt keinen Pulse (selbe Chart-Engine, anderer Aufruf)
- Kein `chart.update()` für Animation (würde Achsen-Sprünge erzeugen)
- Animation läuft nur solange neue Ringe da sind — keine Endlosschleife

---

## Beteiligte Dateien

| Datei | Rolle | Status |
|---|---|---|
| `Theme/assets/js/fw-chart-engine/plugins/FwAnnotationPulsePlugin.js` | NEU — Plugin mit rAF-Loop | erstellt |
| `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` | Integration: Plugin-Injektion, Options-Weitergabe | geändert |
| `Apps/prokrastinations-preis/app.js` | Aktivierung in `renderJourneyStep()` | geändert |

---

## Architektur-Ansatz

### Plugin: `FwAnnotationPulsePlugin.js`

```
WeakMap(_pulseState)
  Key: Chart-Instanz
  Value: {
    previousIds: Set<string>   // IDs aus letztem Render
    animations:  Map<id, startTime>  // laufende Animationen
    positions:   Map<id, {x, y}>    // Pixel-Koordinaten aus Chart.js-Elementen
    rafPending:  boolean
    borderColor, borderWidth, baseRadius  // aus Dataset
  }
```

**Hook:** `afterDraw` (absolut letzter Chart.js-Hook — nichts zeichnet danach mehr)

**Ablauf in `afterDraw`:**
1. Options prüfen (`opts.enabled`, `opts.mode`)
2. `_reducedMotion()` prüfen → return wenn aktiv
3. Annotation-Dataset finden (`_fwAnnotationMarker: true`)
4. Positionen aller Marker aus `chart.getDatasetMeta(dsIdx).data[i].{x,y}` cachen
5. Diff: `currentIds - previousIds` = neue Ringe
6. Neue IDs mit `startTime = performance.now()` in `state.animations` eintragen
7. `_drawPulses()` aufrufen (zeichnet auf Canvas)
8. Standalone-rAF-Loop starten wenn Animationen aktiv und noch kein Loop läuft

**Standalone-rAF-Loop (`_standaloneLoop`):**
- Zeichnet direkt auf Canvas (`chart.ctx`), ohne `chart.update()` aufzurufen
- Läuft bis `state.animations.size === 0`
- Guard: `state.rafPending` verhindert Doppel-Loops

**ID-Strategie:** `String(dataset.data[i].x)` = snapped Timestamp als stabiler Identifier. Keine Änderung an `LineChartStrategy.js` nötig.

### ChartEngine-Integration

In `_draw()` (gecalled bei Create UND Update):

```js
if (runtimeConfig.annotationPulse?.enabled) {
    if (!chartConfig.plugins) chartConfig.plugins = [];
    chartConfig.plugins.push(FwAnnotationPulsePlugin);
    if (!chartConfig.options.plugins) chartConfig.options.plugins = {};
    chartConfig.options.plugins.fwAnnotationPulse = runtimeConfig.annotationPulse;
}
```

**Create-Pfad:** `new Chart(canvas, chartConfig)` → Plugin in `chartConfig.plugins` → wird von Chart.js registriert.

**Update-Pfad:** `state.chartInstance.options = chartConfig.options; state.chartInstance.update();` → Plugin war bereits bei Create registriert. Options werden aktualisiert.

### App.js-Aufruf (Screen-2)

```js
// in renderJourneyStep(), immer — alle stationIdx >= 0
annotationPulse: { enabled: true, mode: 'newly-added' }
```

Screen-3 (`renderS3`): kein `annotationPulse` → Plugin-Guard greift (`opts` = undefined → sofort return).

---

## Aktueller Stand des Plugin-Codes

```js
const _pulseState = new WeakMap();
const PULSE_DURATION  = 350;
const PULSE_SCALE_MAX = 1.4;

function _reducedMotion() {
    return typeof window !== 'undefined' &&
           window.matchMedia != null &&
           window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function _drawPulses(ctx, state, now) {
    ctx.save();
    let anyActive = false;
    const expired = [];
    for (const [id, startTime] of state.animations) {
        const elapsed = now - startTime;
        if (elapsed >= PULSE_DURATION) { expired.push(id); continue; }
        anyActive = true;
        const pos = state.positions.get(id);
        if (!pos) continue;
        const progress  = elapsed / PULSE_DURATION;
        const scale     = 1 + (PULSE_SCALE_MAX - 1) * Math.sin(progress * Math.PI);
        ctx.globalAlpha = 1 - progress;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, state.baseRadius * scale, 0, 2 * Math.PI);
        ctx.strokeStyle = state.borderColor;
        ctx.lineWidth   = state.borderWidth;
        ctx.stroke();
    }
    ctx.restore();
    for (const id of expired) state.animations.delete(id);
    return anyActive;
}

function _standaloneLoop(chart, state) {
    if (state.animations.size === 0) { state.rafPending = false; return; }
    if (!chart.ctx)                   { state.rafPending = false; return; }
    const anyActive = _drawPulses(chart.ctx, state, performance.now());
    if (anyActive) { requestAnimationFrame(() => _standaloneLoop(chart, state)); }
    else { state.rafPending = false; }
}

export const FwAnnotationPulsePlugin = {
    id: 'fwAnnotationPulse',
    afterDraw(chart) {
        const opts = chart.options?.plugins?.fwAnnotationPulse;
        if (!opts) return;
        // [TRACER aktiv] console.log('[PULSE] afterDraw | rm:', _reducedMotion(), '...')
        if (!opts?.enabled || opts?.mode !== 'newly-added') return;
        if (_reducedMotion()) return;
        const dsIdx = chart.data.datasets.findIndex(ds => ds._fwAnnotationMarker);
        // [TRACER aktiv] console.log('[PULSE] dsIdx:', dsIdx, '...')
        if (dsIdx === -1) {
            if (_pulseState.has(chart)) _pulseState.get(chart).previousIds = new Set();
            return;
        }
        const dataset = chart.data.datasets[dsIdx];
        const meta    = chart.getDatasetMeta(dsIdx);
        if (!meta?.data?.length) return;
        if (!_pulseState.has(chart)) {
            _pulseState.set(chart, { previousIds: new Set(), animations: new Map(),
                positions: new Map(), rafPending: false,
                borderColor: '#006273', borderWidth: 1.5, baseRadius: 5 });
        }
        const state = _pulseState.get(chart);
        const newPositions = new Map();
        for (let i = 0; i < dataset.data.length; i++) {
            const id = String(dataset.data[i].x);
            const el = meta.data[i];
            if (el) newPositions.set(id, { x: el.x, y: el.y });
        }
        state.positions   = newPositions;
        state.borderColor = (typeof dataset.pointBorderColor === 'string') ? dataset.pointBorderColor : '#006273';
        state.borderWidth = dataset.pointBorderWidth || 1.5;
        state.baseRadius  = dataset.pointRadius || 5;
        const currentIds = new Set(newPositions.keys());
        const now = performance.now();
        for (const id of currentIds) {
            if (!state.previousIds.has(id) && !state.animations.has(id)) {
                state.animations.set(id, now);
            }
        }
        state.previousIds = currentIds;
        _drawPulses(chart.ctx, state, now);
        if (state.animations.size > 0 && !state.rafPending) {
            state.rafPending = true;
            requestAnimationFrame(() => _standaloneLoop(chart, state));
        }
    }
};
```

---

## Was bestätigt funktioniert hat

**Testlauf mit übertriebenen Werten (Guard deaktiviert):**

- PULSE_DURATION = 2000ms, PULSE_SCALE_MAX = 5.0, PULSE_SCALE_MIN = 1.5, lineWidth × 5
- `_reducedMotion()` Guard vollständig auskommentiert
- Ergebnis: Ringe erschienen klar sichtbar animiert. Neue Ringe pulsierten. Alte Ringe blieben still. ✓

Das bestätigt:
- `afterDraw`-Hook wird aufgerufen ✓
- Annotation-Dataset wird gefunden ✓
- Positionen werden korrekt aus `meta.data[i]` gelesen ✓
- `_drawPulses` zeichnet korrekt auf Canvas ✓
- Standalone-rAF-Loop läuft ✓
- „neu vs. alt"-Logik (previousIds-Diff) funktioniert ✓

---

## Verlauf der Fehler und Fixes

### Fehler 1: `prefers-reduced-motion` blockiert (System-Einstellung)

**Symptom:** Konsole zeigte hunderte `[PULSE] Guard: prefers-reduced-motion aktiv` — kein Pulse.  
**Ursache:** Windows-Einstellung „Animationseffekte" war deaktiviert → Browser meldet `prefers-reduced-motion: reduce`.  
**Fix für Test:** Guard auskommentiert → Animation sichtbar.  
**Status:** Guard danach wieder aktiviert. `window.matchMedia(...).matches` gibt jetzt `false` zurück (Windows-Einstellung auf „ein"). Kein Blocker mehr.

### Fehler 2: `_reducedMotion is not defined` (beim Schreiben der Produktionsversion)

**Symptom:** Konsole `Uncaught ReferenceError: _reducedMotion is not defined` bei jedem `afterDraw`.  
**Ursache:** Beim Schreiben der Produktionsdatei wurde die `_reducedMotion()`-Funktion versehentlich nicht eingetragen, obwohl der Guard-Aufruf im Code steht. Das Plugin crashte bei jedem `afterDraw`-Aufruf, bevor Animations-Logik erreicht wurde.  
**Fix:** Funktion nachgetragen.  
**Status:** Fehler behoben. Kein ReferenceError mehr.

---

## Aktueller Befund: Immer noch keine Animation

Nach Behebung beider Fehler: kein Pulse sichtbar.

### Konsolenausgabe (aktueller Stand, nach ReferenceError-Fix)

```
[PULSE] afterDraw | rm: false | enabled: true | mode: newly-added
[PULSE] dsIdx: -1 | datasets total: 1
... (wiederholt, solange kein Marker sichtbar — korrekt)

[PULSE] afterDraw | rm: false | enabled: true | mode: newly-added
[PULSE] dsIdx: 1 | datasets total: 2
... (wiederholt sich nach Klick auf "Weiter" — Chart.js ruft afterDraw kontinuierlich auf)
```

**Was bekannt ist:**
- Plugin wird korrekt aufgerufen: ✓ (`afterDraw` feuert)
- Options korrekt weitergegeben: ✓ (`enabled: true`, `mode: newly-added`)
- `_reducedMotion()` blockiert nicht: ✓ (`rm: false`)
- Annotation-Dataset wird gefunden: ✓ (`dsIdx: 1`)
- `afterDraw` feuert KONTINUIERLICH — auch nach abgeschlossener Render-Phase (Chart.js Resize-/Animations-System)

**Was noch unbekannt ist:**
- Ob `state.animations` je Einträge bekommt (kein Tracer für `animations.size` vorhanden)
- Ob `_drawPulses` überhaupt zeichnet
- Ob die Animation läuft aber zu subtil ist (350ms, 1.4x Scale, kleine Ringe)

**Nächster Debug-Schritt:** Tracer für `state.animations.size` direkt nach dem ID-Diff ergänzen.

---

## Offene Hypothesen (für Reviewer)

### H1: `chart.options.plugins.fwAnnotationPulse` kommt nicht an

Im **Update-Pfad** (ChartEngine, wenn Chart-Instanz schon existiert):
```js
state.chartInstance.options = chartConfig.options;
state.chartInstance.update();
```
In Chart.js 4.x setzt `chart.options = x` intern `chart.config.options = x`.
**Frage:** Ist das zuverlässig? Liest `afterDraw` danach korrekt `chart.options.plugins.fwAnnotationPulse`?
Oder muss es über `chart.config.options.plugins...` adressiert werden?

### H2: `chart.options` nach Update-Pfad zeigt auf altes Options-Objekt

Chart.js verwendet intern einen Options-Resolver. Es könnte sein, dass `chart.options` nach dem Ersetzen intern nicht als `fwAnnotationPulse` bekannt ist, weil der Resolver das Property nicht kennt.

### H3: Sinus-Kurve startet bei scale=1.0 → erste Frames unsichtbar

Bei `progress=0`: `scale = 1 + 0.4 * sin(0) = 1.0` → Ring genau deckungsgleich mit statischem Ring.
Bei `progress→0.5`: scale = 1.4 (Maximum).
Bei 350ms könnte das so schnell ablaufen, dass es visuell nicht wahrgenommen wird.
**Test:** Werte auf 800ms + Scale 1.8 setzen, sehen ob überhaupt etwas sichtbar ist.

### H4: Chart.js-Animation löscht Canvas nach `afterDraw`

Wenn Chart.js für den neu hinzugefügten Annotation-Datenpunkt eine eigene Einblend-Animation fährt, löscht es den Canvas und zeichnet jeden Frame neu. Das triggert zwar `afterDraw` erneut (was den Pulse-Ring wieder zeichnet), aber in Kombination mit dem Standalone-Loop könnten Race Conditions entstehen.

### H5: `annotationPulse` wird bei `stationIdx=0` übergeben, aber kein Marker vorhanden

Bei `stationIdx=0` gibt es keinen Marker. Plugin setzt `previousIds = new Set()` (falls schon State) oder tut nichts.
Bei `stationIdx=1` erscheint der erste Marker. `previousIds` ist leer → Marker ist "neu" → Animation wird gestartet.
**Frage:** Wird der State korrekt geteilt zwischen den Renders? Die Chart-Instanz ist dieselbe (Update-Pfad). WeakMap-Key ist die Chart-Instanz → State bleibt erhalten. Sollte funktionieren.

### H6: Plugin wird bei Create korrekt registriert, Options aber nicht gesetzt

Wenn `chartConfig.options.plugins` beim Create-Aufruf für irgendein Grund `undefined` ist:
```js
if (!chartConfig.options.plugins) chartConfig.options.plugins = {};
chartConfig.options.plugins.fwAnnotationPulse = runtimeConfig.annotationPulse;
```
Das sollte abgedeckt sein. Aber zu verifizieren.

---

## Nächster sinnvoller Debug-Schritt

Konsolenausgabe nach aktuellem Fix anzeigen (zwei Tracers aktiv):
```
[PULSE] afterDraw | rm: false | enabled: true | mode: newly-added
[PULSE] dsIdx: X | datasets total: Y
```

Wenn diese Zeilen **nicht erscheinen**: Plugin wird nicht aufgerufen → Problem in ChartEngine-Integration (Plugin nicht registriert oder `opts` = undefined).

Wenn diese Zeilen **erscheinen aber dsIdx = -1**: Annotation-Dataset wird nicht gefunden → `_fwAnnotationMarker` Flag fehlt oder falsch geschrieben.

Wenn **dsIdx ≥ 0** aber keine Animation: IDs werden nicht erkannt oder `_drawPulses` zeichnet nichts Sichtbares.

---

## Umgebung

- Chart.js: global geladen via `<script>`-Tag (kein ES-Module-Import)
- Testumgebung: VSCode Live Server, Chrome
- `prefers-reduced-motion`: `window.matchMedia('(prefers-reduced-motion: reduce)').matches` → `false` (verifiziert in Browser-Konsole)
- Kein automatisiertes Test-Framework — nur manuelle Sichtprüfung
