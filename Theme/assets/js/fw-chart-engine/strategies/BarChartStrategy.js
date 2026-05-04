/**
 * @fileoverview Finanzwesir Chart Engine - Bar Chart Strategy
 * @version 42.0.0 (SEMANTIC CONTRACT ALIGNMENT)
 * * STATUS: 
 * - Achsen-Physik: Master V32 (Stabil) - UNTOUCHED
 * - UI-Features: Pills & Asset-Bundling (Aktiv)
 * - Design: CI-konforme Schriften (Integriert)
 * * LOG-BUCH:
 * 2025-12-10: V40.0.0 - Clean Production Release.
 * 2026-01-22: V41.0.0 - Implementierung v1.3.1 (Deterministic Matrix Support).
 * - Fix: _originalDate Metadaten-Injection im Ranking-View zur Behebung des "Januar 1970" Bugs.
 * 2026-01-22: V41.1.0 - Weg 2: Semantisches X-Mapping.
 * - Fix: Explizite X-Anker für Datenobjekte im Ranking-View zur Wiederherstellung der Balken-Sichtbarkeit.
 * 2026-01-22: V41.2.0 - Design Token Integration (Layer 5 Isolation).
 * - Centralisierung von barBorderRadius via FwTheme.
 * - Entfernung manueller Radien in den Transformationen für konsistente Ästhetik.
 * 2026-01-26: V42.0.0 - Semantic Contract Alignment (V12 Compliance).
 * - Fix: Explizite Übergabe von 'PERIOD' an FwDateUtils.detectRhythm.
 * - Architektur: Schließt den Kreis zum Dual-Track-System der FwSmartXAxis.
 * - Safety: Garantiert die Beibehaltung der arithmetischen Gitter-Glättung für Balken.
 */

import { BaseChartStrategy } from './BaseChartStrategy.js';
import { FwTheme } from '../core/FwTheme.js';
import { FwDateUtils } from '../core/FwDateUtils.js';
import { FwSmartScales } from '../core/FwSmartScales.js';
import { FwSmartTooltips } from '../core/FwSmartTooltips.js';
import { FwFormatUtils } from '../core/FwFormatUtils.js';

export class BarChartStrategy extends BaseChartStrategy {
    constructor() {
        super();
        this.theme = new FwTheme();
        this.UNIT_MAP = {
            'UNIT_PERCENT': { mode: 'percent', currency: 'PERCENT' },
            'CURRENCY_EUR': { mode: 'value', currency: 'EUR' },
            'CURRENCY_USD': { mode: 'value', currency: 'USD' },
            'UNIT_PIECES':  { mode: 'value', currency: '' }
        };
    }

    /**
     * OBLIGATORISCH: Accessibility-Daten für Screen Reader (KDR 13).
     * Zwei Modi: History-View (Zeitreihe) und Ranking-View (Asset-Vergleich).
     * Bei > 20 Datenpunkten im History-View: letzte 20 Zeilen + Summary-Zeile.
     */
    getA11yData(data, config) {
        const MAX_A11Y_ROWS = 20;
        const allCols = data.columns || [];
        const assetCols = allCols.filter(c => c && !c.toLowerCase().includes('dat'));
        const isSingleAsset = assetCols.length <= 1;
        const activeView = isSingleAsset ? 'history' : (config.view || 'history');

        const unitKey = data.metadata?.unitKey || 'CURRENCY_EUR';
        const parserSettings = this.UNIT_MAP[unitKey] || { mode: 'value', currency: 'EUR' };
        const activeMode = config.mode || parserSettings.mode;
        const currency = (activeMode === 'percent') ? 'PERCENT' : parserSettings.currency;
        const symbol = FwFormatUtils.getSymbol(currency);

        const rows = FwDateUtils.filterRows(data.rows, config.range || 'max', 'PERIOD');
        if (!rows || rows.length === 0) {
            return { summary: 'Balkendiagramm – keine Daten', headers: [], rows: [] };
        }

        const timestamps = data.rows.map(r => FwDateUtils.parse(r.Date || r.Datum).getTime());
        const rhythm = FwDateUtils.detectRhythm(timestamps, 'PERIOD');

        const formatValue = (val) => {
            if (val === null || val === undefined) return '\u2013';
            const formatted = FwFormatUtils.formatSmart(val, activeMode);
            return symbol ? `${formatted} ${symbol}` : formatted;
        };

        if (activeView === 'ranking') {
            // Ranking-View: Spalten = Assets, Zeilen = Perioden
            const headers = ['Zeitraum', ...assetCols];
            const a11yRows = rows.map(row => {
                const ts = FwDateUtils.parse(row.Date || row.Datum).getTime();
                const dateStr = FwDateUtils.formatTooltipDate(ts, rhythm, 'L');
                return [dateStr, ...assetCols.map(col => formatValue(row[col]))];
            });
            return {
                summary: `Balkendiagramm Vergleich: ${assetCols.join(', ')}, ${rows.length} Perioden`,
                headers,
                rows: a11yRows
            };
        }

        // History-View: Zeitreihe mit Truncation
        const filteredTimestamps = rows.map(r => FwDateUtils.parse(r.Date || r.Datum).getTime());
        const headers = [allCols[0], ...assetCols];
        const displayRows = rows.length > MAX_A11Y_ROWS ? rows.slice(-MAX_A11Y_ROWS) : rows;
        const a11yRows = displayRows.map(row => {
            const ts = FwDateUtils.parse(row.Date || row.Datum).getTime();
            const dateStr = FwDateUtils.formatTooltipDate(ts, rhythm, 'L');
            return [dateStr, ...assetCols.map(col => formatValue(row[col]))];
        });

        if (rows.length > MAX_A11Y_ROWS) {
            const firstRow = rows[0];
            const lastRow = rows[rows.length - 1];
            const summaryParts = assetCols.map(col =>
                `${formatValue(firstRow[col])} \u2192 ${formatValue(lastRow[col])}`
            );
            a11yRows.push([`Zusammenfassung (${rows.length} Datenpunkte)`, ...summaryParts]);
        }

        const firstDate = FwDateUtils.formatTooltipDate(filteredTimestamps[0], rhythm, 'L');
        const lastDate = FwDateUtils.formatTooltipDate(filteredTimestamps[filteredTimestamps.length - 1], rhythm, 'L');
        const summary = `Balkendiagramm Verlauf: ${assetCols.join(', ')}, ${firstDate} bis ${lastDate}, ${rows.length} Perioden`;

        return { summary, headers, rows: a11yRows };
    }

    getViewOptions(data) {
        if (!data || data.columns.length <= 2) return []; 
        return [{ key: 'history', label: 'Verlauf' }, { key: 'ranking', label: 'Vergleich' }];
    }

    transform(data, config) {
        const allCols = data.columns || [];
        const assetCols = allCols.filter(c => c && !c.toLowerCase().includes('dat'));
        const isSingleAsset = assetCols.length <= 1;

        const timestamps = data.rows.map(r => FwDateUtils.parse(r.Date || r.Datum).getTime());
        // V42.0.0: Explizites 'PERIOD' Branding für den Rhythmus-Detektiv
        const rhythm = FwDateUtils.detectRhythm(timestamps, 'PERIOD');
        const rows = FwDateUtils.filterRows(data.rows, config.range || 'max', 'PERIOD');

        const activeView = isSingleAsset ? 'history' : (config.view || 'history');
        const unitKey = data.metadata?.unitKey || 'CURRENCY_EUR';
        const parserSettings = this.UNIT_MAP[unitKey] || { mode: 'value', currency: 'EUR' };
        const activeMode = config.mode || parserSettings.mode;

        if (activeView === 'ranking') {
            return this._transformAssetView(assetCols, rows, rhythm, parserSettings.currency);
        } else {
            return this._transformHistoryView(data.columns, rows, rhythm, isSingleAsset, activeMode, parserSettings.currency, config.range);
        }
    }

    /**
     * Zeitreihen-Ansicht: Strikte Einhaltung der X-Achsen-Physik (V32).
     */
    _transformHistoryView(columns, rows, rhythm, isSingleAsset, activeMode, currency, rangeCode) {
        const datasets = [];
        let minY = Infinity, maxY = -Infinity;
        const sourceTicks = [];

        for (let i = 1; i < columns.length; i++) {
            const colName = columns[i];
            const dataPoints = rows.map(r => {
                const val = r[colName];
                if (val < minY) minY = val; if (val > maxY) maxY = val;
                const ts = FwDateUtils.parse(r.Date || r.Datum).getTime();
                // CHANGED: QUARTERLY/HALF_YEARLY BOP verschob Dez→Okt und Jun→Apr (falscher Tick-Monat).
                // MONTHLY BOP erhält den echten Datenmonat (No-Q-Policy, Spec Tooltips_v2 §4.2).
                const bopRhythm = (rhythm === 'QUARTERLY' || rhythm === 'HALF_YEARLY') ? 'MONTHLY' : rhythm;
                const anchor = FwDateUtils.getBopAnchor(ts, bopRhythm);
                if (i === 1) sourceTicks.push(anchor);
                return { x: anchor, y: val, _originalDate: ts };
            });
            // Pos/Neg-Färbung: Nur bei Single-Asset (Few: "traffic light encoding")
            // Bei Multi-Asset bleiben Asset-Farben erhalten (Zuordnung > Bewertung)
            const bgColor = isSingleAsset
                ? dataPoints.map(p => p.y >= 0 ? this.theme.semantic.positiveBar : this.theme.semantic.negativeBar)
                : this.theme.getColor(i - 1);

            datasets.push({
                label: colName, data: dataPoints,
                backgroundColor: bgColor,
                clip: true
            });
        }

        const minTime = sourceTicks[0];
        const maxTime = sourceTicks[sourceTicks.length - 1];

        const fwContext = this._createFwContext({
            chartType: 'bar', axisType: 'time', rhythm: rhythm,
            viewMode: 'history', valueMode: activeMode, currency: currency,
            dataRange: { min: minTime, max: maxTime, minY, maxY },
            durationYears: FwDateUtils.rangeToYears(rangeCode, minTime, maxTime), // NEW
            infoSystem: 'TOOLTIP', dateSemantics: 'PERIOD'
        });

        return { 
            type: 'bar', datasets, plugins: { fwContext },
            meta: { interactiveFilters: !isSingleAsset, minTime, maxTime, sourceTicks }
        };
    }

    /**
     * Asset-Ansicht: Metadaten-Fix & Semantisches Mapping (v41.1.0).
     */
    _transformAssetView(assetCols, rows, rhythm, currency) {
        const datasets = [];
        let minY = Infinity, maxY = -Infinity;

        rows.forEach((row, rowIndex) => {
            const ts = FwDateUtils.parse(row.Date || row.Datum).getTime();
            const yearLabel = FwDateUtils.formatTooltipDate(ts, rhythm);
            const opacity = rows.length > 1 ? 0.35 + (0.65 * (rowIndex / (rows.length - 1))) : 1;
            
            const yearValues = assetCols.map(col => {
                const val = row[col];
                if (val < minY) minY = val; if (val > maxY) maxY = val;
                return { x: col, y: val, _originalDate: ts };
            });

            datasets.push({
                label: yearLabel,
                data: yearValues,
                backgroundColor: assetCols.map((_, i) => this.theme.getGhostColor(this.theme.getColor(i), opacity)),
                borderColor: this.theme.colors.bgWhite, borderWidth: 1, clip: true
            });
        });

        const fwContext = this._createFwContext({
            chartType: 'bar', axisType: 'category', rhythm: rhythm,
            viewMode: 'ranking', valueMode: 'value', currency: currency,
            dataRange: { min: 0, max: assetCols.length - 1, minY, maxY },
            infoSystem: 'TOOLTIP', dateSemantics: 'PERIOD'
        });

        return { type: 'bar', labels: assetCols, datasets, plugins: { fwContext }, meta: { interactiveFilters: false } };
    }

    /**
     * Endmontage: Verheiratet Daten mit dem Design-System (v41.2.0).
     */
    getChartConfig(transformedData) {
        const fwContext = transformedData.plugins.fwContext;
        const meta = transformedData.meta;
        const t = this.theme;
        const ciFont = t.fonts.body;

        const FwBarLayoutPlugin = {
            id: 'fwBarLayout',
            beforeUpdate: (chart) => {
                const xScale = chart.scales.x;
                if (!xScale || !chart.data.datasets[0]?.data.length) return;
                const dataCount = chart.data.datasets[0].data.length;
                const pixelPerSlot = xScale.width / dataCount;
                chart._fwGeometry = { halfBarPixel: (pixelPerSlot * 0.8 * 0.9) / 2 };
            }
        };

        const xAxisConfig = fwContext.axisType === 'time'
            ? FwSmartScales.getTimeAxis(meta.minTime, meta.maxTime, { color: t.colors.textMuted }, {
                plugins: { fwContext },
                sourceTicks: meta.sourceTicks,
                useNativeTime: true
            })
            : {
                type: 'category',
                ticks: { color: t.colors.textMuted, font: { family: ciFont, size: 12 } }
            };

        return {
            type: 'bar',
            data: { 
                labels: (fwContext.axisType === 'category') ? transformedData.labels : [], 
                datasets: transformedData.datasets 
            },
            plugins: [FwBarLayoutPlugin],
            options: {
                responsive: true, maintainAspectRatio: false,
                elements: {
                    bar: {
                        borderRadius: t.ui.barBorderRadius
                    }
                },
                datasets: {
                    bar: {
                        minBarLength: 3
                    }
                },
                layout: { padding: { left: 70, right: 30, top: 20, bottom: 10 } },
                scales: { 
                    x: xAxisConfig,
                    y: FwSmartScales.getSmartYAxis(fwContext, {
                        color: t.colors.textMuted,
                        font: { family: ciFont },
                        gridColor: t.colors.grid,
                        zeroLineColor: t.colors.zeroLine
                    })
                },
                plugins: { 
                    fwContext, legend: { display: false }, 
                    tooltip: FwSmartTooltips.configure(fwContext, {
                        titleFont: { family: ciFont },
                        bodyFont: { family: ciFont },
                        tooltipBg: t.tooltip.bg,
                        titleColor: t.tooltip.title,
                        bodyColor: t.tooltip.body,
                        borderColor: t.tooltip.border
                    })
                }
            }
        };
    }
}