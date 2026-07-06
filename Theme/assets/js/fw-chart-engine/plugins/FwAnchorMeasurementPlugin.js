/**
 * @fileoverview Finanzwesir Chart Engine — Anchor Measurement Plugin
 * @module plugins/FwAnchorMeasurementPlugin
 * @version 1.0.0
 * @date 2026-07-06
 *
 * Misst explizit angeforderte Datenanker (x/y in Datenkoordinaten) im Chart.js-Lifecycle
 * und meldet die resultierenden Canvas-relativen Pixelkoordinaten über einen von der
 * ChartEngine bereitgestellten Callback zurück.
 *
 * V1:
 * - opt-in (chart.options.plugins.fwAnchorMeasurement.enabled)
 * - misst nur explizit angeforderte Anker, keine automatische Punkterkennung
 * - kein Domain-State, keine Datenmutation, keine Achsen-Domain-Änderung
 * - kein fwContext-Schreibzugriff, kein chart._fwGeometry
 * - kein Rückkanal zu app.js — ruft ausschließlich den von der ChartEngine übergebenen
 *   onMeasurement-Callback auf; die ChartEngine übersetzt/friert das Ergebnis ein und
 *   entscheidet, ob/wie es die App erreicht
 *   (Plugin misst → ChartEngine vermittelt → app.js orchestriert DOM-Motion)
 * - keine App-/Screen-/Card-/Station-/Journey-Begriffe — vollständig produktneutral
 *
 * Aktivierung:
 * chart.options.plugins.fwAnchorMeasurement = {
 *   enabled: true,
 *   anchors: [{ id, x, y }],   // x/y in Datenkoordinaten (z.B. Timestamp/Wert)
 *   onMeasurement: fn          // wird von der ChartEngine gesetzt, nie von der App direkt
 * }
 *
 * Payload je Anker an onMeasurement: { id, x, y, visible } — x/y sind Canvas-relative
 * Pixelkoordinaten (nicht Container-/Viewport-relativ; diese Übersetzung übernimmt die
 * ChartEngine). Keine Chart.js-/DOM-/Canvas-Referenzen im Payload.
 */

function _isFiniteNumber(v) {
    return typeof v === 'number' && Number.isFinite(v);
}

function _isValidAnchor(a) {
    return a != null && typeof a === 'object' &&
        typeof a.id === 'string' && a.id.length > 0 &&
        _isFiniteNumber(a.x) && _isFiniteNumber(a.y);
}

export const FwAnchorMeasurementPlugin = {
    id: 'fwAnchorMeasurement',

    // afterDraw: liest Config bei jedem Draw frisch, misst nur bei enabled+anchors,
    // meldet über den von der ChartEngine übergebenen onMeasurement-Callback.
    afterDraw(chart) {
        var opts = chart.options?.plugins?.fwAnchorMeasurement;
        if (!opts?.enabled) return;

        var anchors = opts.anchors;
        if (!Array.isArray(anchors) || anchors.length === 0) return;

        var xScale = chart.scales?.x;
        var yScale = chart.scales?.y;
        var chartArea = chart.chartArea;
        if (!xScale || !yScale || !chartArea) return;

        var measurements = [];
        for (var i = 0; i < anchors.length; i++) {
            var a = anchors[i];
            if (!_isValidAnchor(a)) continue;
            var x = xScale.getPixelForValue(a.x);
            var y = yScale.getPixelForValue(a.y);
            if (!_isFiniteNumber(x) || !_isFiniteNumber(y)) continue;
            var visible = x >= chartArea.left && x <= chartArea.right &&
                          y >= chartArea.top && y <= chartArea.bottom;
            measurements.push(Object.freeze({ id: a.id, x: x, y: y, visible: visible }));
        }

        if (typeof opts.onMeasurement === 'function') {
            opts.onMeasurement(Object.freeze(measurements));
        }
    }
};
