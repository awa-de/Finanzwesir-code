// NEW AP-14e5: CrosshairPlugin aus core/FwChartPlugins.js ausgelagert
export const CrosshairPlugin = {
    id: 'crosshair',

    afterDatasetsDraw: function(chart) {
        const options = chart.options.plugins.crosshair;

        if (!options || !options.enabled) return;

        if (chart.tooltip?._active?.length > 0) {
            const activePoint = chart.tooltip._active[0];
            const ctx = chart.ctx;
            const x = activePoint.element.x;
            const topY = chart.scales.y.top;
            const bottomY = chart.scales.y.bottom;

            ctx.save();
            ctx.beginPath();

            ctx.setLineDash(options.dash || [5, 5]);
            ctx.lineWidth = options.lineWidth || 1;
            ctx.strokeStyle = options.color || 'rgba(0, 0, 0, 0.2)';

            ctx.moveTo(x, topY);
            ctx.lineTo(x, bottomY);
            ctx.stroke();
            ctx.restore();
        }
    }
};
