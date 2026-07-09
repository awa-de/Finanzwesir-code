// NEW — B1-AP-14e2: fwVerticalLine aus ChartEngine.js ausgelagert
export const FwVerticalLinePlugin = {
    id: 'fwVerticalLine',

    afterDraw(chart) {
        var meta = chart.getDatasetMeta(0);
        if (!meta || !meta.data || !meta.data.length) return;

        var last = meta.data[meta.data.length - 1];
        if (!last || typeof last.x !== 'number') return;

        var ctx = chart.ctx;
        var chartArea = chart.chartArea;
        if (!ctx || !chartArea) return;

        // CHANGED — AP-16b: Farbe aus injizierten Plugin-Optionen (Token via LineChartStrategy, KDR 14.2);
        // kein CSS-Direktzugriff im Plugin mehr; #0071BF nur defensiver Fallback.
        var opts = chart.options && chart.options.plugins && chart.options.plugins.fwVerticalLine;
        var lineColor = (opts && opts.color) ? opts.color : '#0071BF';

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(last.x, chartArea.top);
        ctx.lineTo(last.x, chartArea.bottom);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.restore();
    }
};
