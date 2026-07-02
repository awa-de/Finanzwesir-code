/**
 * @fileoverview Finanzwesir Chart Engine — Chart Text Plugin
 * @module plugins/FwChartTextPlugin
 * @version 1.0.0
 * @date 2026-07-02
 *
 * Persistente, rein visuelle, nicht-interaktive Canvas-Textannotation im Chartbereich.
 *
 * V1:
 * - opt-in
 * - persistent
 * - keine Animation
 * - keine Tooltips
 * - keine Events
 * - keine DOM-Brücke
 * - keine Pixelkoordinaten nach außen
 * - keine Card-to-Point-API
 * - keine Datenmutation
 * - keine Achsenmutation
 * - Positionierung ausschließlich per plotFraction relativ zu chart.chartArea
 *
 * Das Plugin zeichnet nur Canvas-Pixel.
 * Semantisch relevante Texte müssen von der App zusätzlich im DOM oder in aria-live bereitgestellt werden.
 *
 * Aktivierung: chart.options.plugins.fwChartText = { enabled: true, annotations: [...] }
 * Deaktivierung: Feld weglassen oder enabled: false setzen.
 *
 * Annotation-Felder: id (optional), text, x, y (Pflicht: text/x/y),
 * align, baseline, fontSize, fontWeight, color, lineHeight, offsetX, offsetY (optional).
 * plotFraction: x=0/y=0 = chartArea.left/top, x=1/y=1 = chartArea.right/bottom.
 */

// NEW — AP-prokrast-03d
const DEFAULT_ALIGN       = 'center';
const DEFAULT_BASELINE    = 'middle';
const DEFAULT_FONT_SIZE   = 14;
const DEFAULT_FONT_WEIGHT = 400;
const DEFAULT_COLOR       = '#272727';

function _isFiniteNumber(v) {
    return typeof v === 'number' && Number.isFinite(v);
}

// Defensive Validierung — ungültige Annotationen werden übersprungen, nicht geworfen
function _isValidAnnotation(a) {
    return a != null &&
           typeof a === 'object' &&
           typeof a.text === 'string' && a.text.length > 0 &&
           _isFiniteNumber(a.x) &&
           _isFiniteNumber(a.y);
}

// Zeichnet eine Annotation — mehrzeilig via '\n', Blockausrichtung über baseline
function _drawAnnotation(ctx, chartArea, a) {
    var align      = (a.align === 'left' || a.align === 'right') ? a.align : DEFAULT_ALIGN;
    var baseline   = (a.baseline === 'top' || a.baseline === 'bottom') ? a.baseline : DEFAULT_BASELINE;
    var fontSize   = _isFiniteNumber(a.fontSize) ? a.fontSize : DEFAULT_FONT_SIZE;
    var fontWeight = _isFiniteNumber(a.fontWeight) ? a.fontWeight : DEFAULT_FONT_WEIGHT;
    var color      = (typeof a.color === 'string' && a.color) ? a.color : DEFAULT_COLOR;
    var lineHeight = _isFiniteNumber(a.lineHeight) ? a.lineHeight : (fontSize * 1.4);
    var offsetX    = _isFiniteNumber(a.offsetX) ? a.offsetX : 0;
    var offsetY    = _isFiniteNumber(a.offsetY) ? a.offsetY : 0;

    var px = chartArea.left + chartArea.width  * a.x + offsetX;
    var py = chartArea.top  + chartArea.height * a.y + offsetY;

    var lines = String(a.text).split('\n');
    var n = lines.length;

    // Block-Top relativ zum Zielpunkt py, abhängig vom baseline-Modus
    var blockTop;
    if (baseline === 'top') {
        blockTop = py;
    } else if (baseline === 'bottom') {
        blockTop = py - n * lineHeight;
    } else {
        blockTop = py - (n * lineHeight) / 2;
    }

    ctx.font = fontWeight + ' ' + fontSize + 'px sans-serif';
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = 'middle'; // pro Zeile, Blockausrichtung erfolgt über blockTop

    for (var i = 0; i < n; i++) {
        var lineY = blockTop + (i + 0.5) * lineHeight;
        ctx.fillText(lines[i], px, lineY);
    }
}

export const FwChartTextPlugin = {
    id: 'fwChartText',

    // afterDraw: liest Config bei jedem Draw frisch — kein gecachter State beim Registrieren.
    // Dadurch funktioniert "leer registriert → später befüllt" ohne Smart-Update-Zweig anzufassen.
    afterDraw(chart) {
        var opts = chart.options?.plugins?.fwChartText;
        if (!opts?.enabled) return;

        var annotations = opts.annotations;
        if (!Array.isArray(annotations) || annotations.length === 0) return;

        var ctx = chart.ctx;
        var chartArea = chart.chartArea;
        if (!ctx || !chartArea) return;

        ctx.save();
        for (var i = 0; i < annotations.length; i++) {
            var a = annotations[i];
            if (!_isValidAnnotation(a)) continue;
            _drawAnnotation(ctx, chartArea, a);
        }
        ctx.restore();
    }
};
