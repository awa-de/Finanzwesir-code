/**
 * @fileoverview Finanzwesir Chart Engine — Annotation Pulse Plugin
 * @module plugins/FwAnnotationPulsePlugin
 * @version 1.2.0
 * @date 2026-06-18
 *
 * Ephemerer Runtime-Pulse für neu sedimentierte Annotation-Marker (Screen-2).
 * Kein Domain-State. Kein CSS. Kein Einfluss auf Achsen/Tooltip/Legende.
 *
 * Aktivierung: chart.options.plugins.fwAnnotationPulse = { enabled: true, mode: 'newly-added' }
 * Deaktivierung: Feld weglassen oder enabled: false setzen.
 *
 * v1.2.0 — _standaloneLoop nutzt chart.draw() statt direktem Canvas-Schreiben.
 *           afterDraw ist einziger Zeichenort für _drawPulses.
 */

// NEW — B1-AP-14c4: Runtime-State pro Chart-Instanz (kein globaler unscoped State)
const _pulseState = new WeakMap();

const PULSE_DURATION  = 1200; // 2 Pulse à 600 ms
const PULSE_SCALE_MAX = 1.8;  // Ring wächst auf 180 % des Ausgangsradius

function _reducedMotion() {
    return typeof window !== 'undefined' &&
           window.matchMedia != null &&
           window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Pulse-Ringe auf Canvas zeichnen — wird nur aus afterDraw aufgerufen
function _drawPulses(ctx, state, now) {
    ctx.save();
    let anyActive = false;
    const expired = [];

    for (const [id, startTime] of state.animations) {
        const elapsed = now - startTime;
        if (elapsed >= PULSE_DURATION) {
            expired.push(id);
            continue;
        }
        anyActive = true;

        const pos = state.positions.get(id);
        if (!pos) continue;

        // 2 Pulse: abs(sin(2π)) gibt zwei symmetrische Auswüchse — zweiter Puls durch Alpha-Fade schwächer
        const progress   = elapsed / PULSE_DURATION;
        const scale      = 1 + (PULSE_SCALE_MAX - 1) * Math.abs(Math.sin(progress * Math.PI * 2));
        ctx.globalAlpha  = 1 - progress;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, state.baseRadius * scale, 0, 2 * Math.PI);
        ctx.strokeStyle  = state.borderColor;
        ctx.lineWidth    = state.borderWidth;
        ctx.stroke();
    }

    ctx.restore();
    for (const id of expired) state.animations.delete(id);
    return anyActive;
}

// Standalone-Loop: löst chart.draw() aus → afterDraw zeichnet Pulse
// Direktes Canvas-Schreiben hier vermieden — Canvas-Ownership bleibt bei Chart.js
function _standaloneLoop(chart, state) {
    if (state.animations.size === 0) { state.rafPending = false; return; }
    if (!chart.ctx)                   { state.rafPending = false; return; }

    chart.draw(); // triggers afterDraw → afterDraw draws pulse via _drawPulses

    if (state.animations.size > 0) {
        requestAnimationFrame(() => _standaloneLoop(chart, state));
    } else {
        state.rafPending = false;
    }
}

export const FwAnnotationPulsePlugin = {
    id: 'fwAnnotationPulse',

    // afterDraw: absolut letzter Hook — einziger Zeichenort für _drawPulses
    afterDraw(chart) {
        const opts = chart.options?.plugins?.fwAnnotationPulse;
        if (!opts?.enabled || opts?.mode !== 'newly-added') return;
        if (_reducedMotion()) return;

        const dsIdx = chart.data.datasets.findIndex(ds => ds._fwAnnotationMarker);

        // Kein Annotation-Dataset → previousIds zurücksetzen (Journey-Reset-Erkennung)
        if (dsIdx === -1) {
            if (_pulseState.has(chart)) {
                _pulseState.get(chart).previousIds = new Set();
            }
            return;
        }

        const dataset = chart.data.datasets[dsIdx];
        const meta    = chart.getDatasetMeta(dsIdx);
        if (!meta?.data?.length) return;

        // State initialisieren (lazy, pro Chart-Instanz)
        if (!_pulseState.has(chart)) {
            _pulseState.set(chart, {
                previousIds: new Set(),
                animations:  new Map(),   // id → startTime (performance.now())
                positions:   new Map(),   // id → { x, y } — gecacht aus Chart.js-Elementen
                rafPending:  false,
                borderColor: '#006273',
                borderWidth: 1.5,
                baseRadius:  5
            });
        }
        const state = _pulseState.get(chart);

        // Positionen aus Chart.js-Elementen aktualisieren (nach jedem Draw aktuell)
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

        // Aktuelle IDs aus gecachten Positionen
        const currentIds = new Set(newPositions.keys());
        const now        = performance.now();

        // Neu erschienene IDs → Animation starten
        for (const id of currentIds) {
            if (!state.previousIds.has(id) && !state.animations.has(id)) {
                state.animations.set(id, now);
            }
        }
        state.previousIds = currentIds;

        // Pulse-Ringe zeichnen (einziger Zeichenort)
        _drawPulses(chart.ctx, state, now);

        // Standalone-Loop starten wenn Animationen aktiv und noch kein Loop läuft
        if (state.animations.size > 0 && !state.rafPending) {
            state.rafPending = true;
            requestAnimationFrame(() => _standaloneLoop(chart, state));
        }
    }
};
