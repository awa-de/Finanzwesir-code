/**
 * @fileoverview Finanzwesir Chart Engine - Line Chart Strategy
 * @module strategies/LineChartStrategy
 * @version 16.0.0 (SNAPSHOT CALENDAR SNAP — AP-15)
 * @date 2026-02-26
 * @status PRODUCTION - ARCHITECTURE COMPLIANT
 *
 * @description
 * Implementation für Liniendiagramme.
 * V13.5.1: PILL-RESTORATION & PROTOCOL COMPLIANCE.
 * V13.5.2: GEOMETRIC HARMONIZATION.
 * V13.6.0: SEMANTIC RESTORATION.
 * V14.0.0: BAN HEADLINE.
 * - Neu: _computeHeadline() berechnet Performance-Headline (Big Accessible Number).
 * - Headline-Daten werden via meta.headline an den Renderer transportiert.
 * - Unterstützt Single-Asset (Zwei-Zeilen), Multi-Asset (gestapelt, max 3), Hint (4+).
 * - Komplementärwert nur bei Währungsdaten (EUR/USD/...), nicht bei Prozent/Stück.
 * V14.1.0: BAN DYNAMIK.
 * - Neu: computeHeadlineForVisibleSeries() — BAN reagiert auf Legend-Toggle.
 * - Hint-Text zeigt dynamischen Zähler sichtbarer Serien.
 * - Empty-Mode bei 0 sichtbaren Serien (Container erhalten, Inhalt leer).
 */

import { BaseChartStrategy } from './BaseChartStrategy.js';
import { FwTheme } from '../core/FwTheme.js';
import { FwSmartScales } from '../core/FwSmartScales.js';
import { FwSmartTooltips } from '../core/FwSmartTooltips.js';
import { FwDateUtils } from '../core/FwDateUtils.js';
import { CrosshairPlugin } from '../core/FwChartPlugins.js';
import { FwFormatUtils } from '../core/FwFormatUtils.js';

export class LineChartStrategy extends BaseChartStrategy {
    constructor() {
        super();
        this.theme = new FwTheme();
        this.UNIT_MAP = {
            'UNIT_PERCENT': { mode: 'percent', currency: 'PERCENT' },
            'CURRENCY_EUR': { mode: 'value', currency: 'EUR' },
            'CURRENCY_USD': { mode: 'value', currency: 'USD' },
            'UNIT_PIECES':  { mode: 'value', currency: '' }
        };
        this.ALLOWED_MODES = new Set(['value', 'percent', 'return']);
        this.ALLOWED_RANGES = new Set(['1y', '3y', '5y', '10y', 'max']);
    }

    /**
     * OBLIGATORISCH: Accessibility-Daten für Screen Reader (KDR 13).
     * Erzeugt eine visuell verborgene Tabelle mit allen Datenwerten.
     * Bei > 20 Datenpunkten: letzte 20 Zeilen + Summary-Zeile.
     */
    getA11yData(data, config) {
        const MAX_A11Y_ROWS = 20;
        const rows = FwDateUtils.filterRows(data.rows, config.range || 'max');
        if (!rows || rows.length === 0) {
            return { summary: 'Liniendiagramm – keine Daten', headers: [], rows: [] };
        }

        // Mode/Currency (identische Logik wie transform — Single Source of Truth)
        const unitKey = data.metadata?.unitKey || 'CURRENCY_EUR';
        const parserSettings = this.UNIT_MAP[unitKey] || { mode: 'value', currency: 'EUR' };
        let userMode = config.mode ? config.mode.toLowerCase() : null;
        if (config.view === 'return') userMode = 'return';
        const activeMode = (userMode && this.ALLOWED_MODES.has(userMode)) ? userMode : parserSettings.mode;
        const formatMode = (activeMode === 'return') ? 'percent' : activeMode;
        const currency = (formatMode === 'percent') ? 'PERCENT' : parserSettings.currency;
        const symbol = FwFormatUtils.getSymbol(currency);

        // Rhythm für Datumsformatierung
        const timestamps = rows.map(r => FwDateUtils.parse(r.Date || r.Datum).getTime());
        const rhythm = FwDateUtils.detectRhythm(timestamps, 'SNAPSHOT');

        const assetColumns = data.columns.slice(1);
        const headers = [data.columns[0], ...assetColumns];

        const formatValue = (val) => {
            if (val === null || val === undefined) return '\u2013';
            const formatted = FwFormatUtils.formatSmart(val, formatMode);
            return symbol ? `${formatted} ${symbol}` : formatted;
        };

        // Letzte MAX_A11Y_ROWS Zeilen (aktuellste Daten zuerst relevant)
        const displayRows = rows.length > MAX_A11Y_ROWS ? rows.slice(-MAX_A11Y_ROWS) : rows;
        const a11yRows = displayRows.map(row => {
            const ts = FwDateUtils.parse(row.Date || row.Datum).getTime();
            const dateStr = FwDateUtils.formatTooltipDate(ts, rhythm, 'L');
            return [dateStr, ...assetColumns.map(col => formatValue(row[col]))];
        });

        // Summary-Zeile bei abgeschnittenen Daten
        if (rows.length > MAX_A11Y_ROWS) {
            const firstRow = rows[0];
            const lastRow = rows[rows.length - 1];
            const summaryParts = assetColumns.map(col =>
                `${formatValue(firstRow[col])} \u2192 ${formatValue(lastRow[col])}`
            );
            a11yRows.push([`Zusammenfassung (${rows.length} Datenpunkte)`, ...summaryParts]);
        }

        // Beschreibungstext für Screen Reader
        const firstDate = FwDateUtils.formatTooltipDate(timestamps[0], rhythm, 'L');
        const lastDate = FwDateUtils.formatTooltipDate(timestamps[timestamps.length - 1], rhythm, 'L');
        const summary = `Liniendiagramm: ${assetColumns.join(', ')}, ${firstDate} bis ${lastDate}, ${rows.length} Datenpunkte`;

        return { summary, headers, rows: a11yRows };
    }

    getViewOptions() {
        return [{ key: 'value', label: 'Wert €' }, { key: 'return', label: 'Verlauf %' }];
    }

    /**
     * Berechnet die BAN (Big Accessible Number) Headline-Daten.
     * Pure Function: Input rein, Output raus, keine Side-Effects.
     *
     * @param {Array} rows - Gefilterte Datenzeilen (nach Range-Filter)
     * @param {Array} columns - Alle Spaltennamen (erste Spalte = Datum)
     * @param {string} formatMode - Aktiver Anzeigemodus: 'percent' oder 'value'
     * @param {string} currency - Währungscode: 'EUR', 'USD', 'PERCENT', '' etc.
     * @returns {Object|null} Headline-Daten oder null wenn BAN nicht angezeigt werden soll
     */
    _computeHeadline(rows, columns, formatMode, currency) {
        // Guard: Mindestens 2 Datenpunkte für eine Differenz
        if (!rows || rows.length < 2) return null;

        const assetColumns = columns.slice(1); // Erste Spalte = Datum
        const seriesCount = assetColumns.length;

        // Guard: 0 sichtbare Serien → leerer Container (Höhe erhalten)
        if (seriesCount === 0) {
            return { mode: 'empty' };
        }

        // Guard: 4+ Serien → Hint-Modus mit Zähler (BAN wäre auf Mobile unlesbar)
        if (seriesCount > 3) {
            return { mode: 'hint', visibleCount: seriesCount };
        }

        // Startjahr aus erstem gefilterten Datenpunkt
        const firstRow = rows[0];
        const lastRow = rows[rows.length - 1];
        const startDate = FwDateUtils.parse(firstRow.Date || firstRow.Datum);
        const startYear = startDate.getUTCFullYear();

        // Komplementärwert nur bei Währungsdaten sinnvoll
        // "Prozent von Prozent" ist kognitiver Unsinn (Anleihen, Tagesgeld)
        const hasComplementaryValue = (currency !== '' && currency !== 'PERCENT');

        // Pro-Serie-Berechnung
        const series = [];
        for (const colName of assetColumns) {
            const startVal = firstRow[colName];
            const endVal = lastRow[colName];

            // Guard: Unvollständige Daten → keine BAN
            if (startVal == null || endVal == null) return null;

            const absoluteChange = endVal - startVal;

            // Prozentuale Veränderung: null bei Division durch Null (Tagesgeld 0,0%)
            const percentChange = (startVal !== 0)
                ? (absoluteChange / Math.abs(startVal)) * 100
                : null;

            series.push({ name: colName, absoluteChange, percentChange });
        }

        return {
            mode: 'data',
            series,
            startYear,
            formatMode,
            currency,
            seriesCount,
            hasComplementaryValue
        };
    }

    /**
     * Berechnet die BAN-Headline nur für aktuell sichtbare Serien.
     * Wird beim Legend-Toggle aufgerufen (Layer 2 → Layer 3).
     *
     * @param {Object} chart - Chart.js-Instanz (für Dataset-Visibility)
     * @param {Object} data - Originaldaten (data.rows, data.columns, data.metadata)
     * @param {Object} config - Runtime-Config (range, view, mode)
     * @returns {Object|null} Headline-Daten für _renderBAN
     */
    computeHeadlineForVisibleSeries(chart, data, config) {
        // formatMode/currency-Logik identisch zu transform() — Single Source of Truth
        const unitKey = data.metadata?.unitKey || 'CURRENCY_EUR';
        const parserSettings = this.UNIT_MAP[unitKey] || { mode: 'value', currency: 'EUR' };
        let userMode = config.mode ? config.mode.toLowerCase() : null;
        if (config.view === 'return') userMode = 'return';
        const activeMode = (userMode && this.ALLOWED_MODES.has(userMode)) ? userMode : parserSettings.mode;
        const formatMode = (activeMode === 'return') ? 'percent' : activeMode;
        const currency = (formatMode === 'percent') ? 'PERCENT' : parserSettings.currency;

        const rows = FwDateUtils.filterRows(data.rows, config.range || 'max');

        // Sichtbare Spalten aus Chart.js-Dataset-Visibility ableiten
        const dateCol = data.columns[0];
        const visibleColumns = [dateCol];
        chart.data.datasets.forEach((ds, i) => {
            if (!chart.getDatasetMeta(i).hidden) {
                visibleColumns.push(ds.label);
            }
        });

        return this._computeHeadline(rows, visibleColumns, formatMode, currency);
    }

    transform(data, config) {
        const colorsValid = this.theme.validateColorMap(config.colors);
        const effectiveColors = colorsValid ? config.colors : {};
        const rows = FwDateUtils.filterRows(data.rows, config.range || 'max');
        const timestamps = rows.map(r => FwDateUtils.parse(r.Date || r.Datum).getTime());

        // Context-Protokoll vorbereiten
        const unitKey = data.metadata?.unitKey || 'CURRENCY_EUR';
        const parserSettings = this.UNIT_MAP[unitKey] || { mode: 'value', currency: 'EUR' };
        let userMode = config.mode ? config.mode.toLowerCase() : null;
        if (config.view === 'return') userMode = 'return';
        const activeMode = (userMode && this.ALLOWED_MODES.has(userMode)) ? userMode : parserSettings.mode;
        const formatMode = (activeMode === 'return') ? 'percent' : activeMode;
        const currency = (formatMode === 'percent') ? 'PERCENT' : parserSettings.currency;

        const isSingleAsset = data.columns.length <= 2;
        const datasets = [];
        let globalMinY = Infinity, globalMaxY = -Infinity;

        const rhythm = FwDateUtils.detectRhythm(timestamps, 'SNAPSHOT');

        // V16.0.0 (AP-15): Calendar Snap — visuelle Ausrichtung an Tick-Grid.
        // _originalDate bewahrt das echte Datum für Tooltips (FwSmartTooltips Z.62-64).
        const snappedTimestamps = timestamps.map(ts => FwDateUtils.getSnapshotSnap(ts, rhythm));

        for (let i = 1; i < data.columns.length; i++) {
            const colName = data.columns[i];
            const color = effectiveColors[colName] || this.theme.getColor(i - 1);

            const dsConfig = {
                label: colName,
                data: rows.map((r, idx) => {
                    const val = r[colName];
                    if (val < globalMinY) globalMinY = val;
                    if (val > globalMaxY) globalMaxY = val;
                    return {
                        x: snappedTimestamps[idx],
                        y: val,
                        _originalDate: timestamps[idx]
                    };
                }),
                borderColor: color,
                borderWidth: 2,
                _isBenchmark: config.benchmark === colName,
                _baseColor: color,
                pointRadius: 0,
                pointBorderWidth: 0,
                tension: 0.1,
                spanGaps: true,
                clip: 15
            };

            datasets.push(dsConfig);
        }

        // NEW — B1-AP-14c2: Marker-Dataset für Journey-Station-Annotationen
        if (config.annotations?.events?.length > 0) {
            datasets.push({
                _fwAnnotationMarker: true,
                label: '',
                type: 'scatter',
                data: config.annotations.events.map(e => ({ x: e.x, y: e.y })),
                pointStyle: 'circle',
                pointRadius: 5,
                pointHoverRadius: 0,
                pointHitRadius: 0,
                pointBackgroundColor: 'transparent',
                pointBorderColor: this.theme.colors.petrol,
                pointBorderWidth: 1.5,
            });
        }

        // BAN-Headline berechnen (V14.0.0)
        const headline = this._computeHeadline(rows, data.columns, formatMode, currency);

        // NEW — B1-AP-14b1: xDisplayRange → displayRange (Progressive Domain LineChart)
        let displayRange = null;
        let fwDurationYears = FwDateUtils.rangeToYears(config.range, snappedTimestamps[0], snappedTimestamps[snappedTimestamps.length - 1]);
        if (config.xDisplayRange) {
            const dispMinTs = FwDateUtils.getSnapshotSnap(FwDateUtils.parse(config.xDisplayRange.min + '-01').getTime(), rhythm);
            const dispMaxTs = FwDateUtils.getSnapshotSnap(FwDateUtils.parse(config.xDisplayRange.max + '-01').getTime(), rhythm);
            const drMin = snappedTimestamps[0];
            const drMax = snappedTimestamps[snappedTimestamps.length - 1];
            if (dispMinTs > drMin)      throw new Error('[LineChartStrategy] xDisplayRange.min liegt nach dataRange.min');
            if (dispMaxTs < drMax)      throw new Error('[LineChartStrategy] xDisplayRange.max liegt vor dataRange.max');
            if (dispMinTs >= dispMaxTs) throw new Error('[LineChartStrategy] xDisplayRange.min muss kleiner als max sein');
            displayRange = { min: dispMinTs, max: dispMaxTs };
            fwDurationYears = FwDateUtils.getDiffYears(dispMinTs, dispMaxTs);
        }

        // Rucksack-Schnürung (Vollständiges Protokoll v1.4.0)
        // Wir setzen hier SNAPSHOT, um die Weiche in der SmartXAxis umzulegen.
        const fwContext = this._createFwContext({
            chartType: 'line',
            axisType: 'time',
            rhythm: rhythm,
            dataRange: {
                min: snappedTimestamps[0],
                max: snappedTimestamps[snappedTimestamps.length - 1],
                minY: globalMinY,
                maxY: globalMaxY
            },
            durationYears: fwDurationYears, // CHANGED — B1-AP-14b1: aus displayRange wenn vorhanden
            displayRange: displayRange, // NEW — B1-AP-14b1
            yRangePolicy: config.yRangePolicy || null, // NEW — B1-AP-14b2
            yRangeMemory: config.yRangeMemory || null, // NEW — B1-AP-14b2
            annotations:  config.annotations  || null, // NEW — B1-AP-14c1
            viewMode: config.view || 'value',
            valueMode: formatMode,
            currency: currency,
            dateSemantics: 'SNAPSHOT',
            tooltipLayout: isSingleAsset ? 'SINGLE' : 'COMPARE',
            infoSystem: 'TOOLTIP'
        });

        return { 
            type: 'line', 
            datasets, 
            plugins: { fwContext }, 
            meta: {
                minTime: snappedTimestamps[0],
                maxTime: snappedTimestamps[snappedTimestamps.length - 1],
                interactiveFilters: true,
                sourceTicks: snappedTimestamps,
                headline
            } 
        };
    }

    getChartConfig(transformedData) {
        const t = this.theme;
        const fwContext = transformedData.plugins.fwContext;
        const ciFont = t.fonts.body;

        transformedData.datasets.forEach(ds => {
            if (ds._fwAnnotationMarker) return; // NEW — B1-AP-14c2
            ds.borderWidth = (ctx) => t.getLineWidth(ds._isBenchmark, ctx.chart.width);
            
            ds.pointRadius = (ctx) => {
                const active = ctx.chart.getActiveElements();
                if (active.length > 0 && active[0].index === ctx.dataIndex) {
                    return t.getPointRadius(ctx.chart.width); 
                }
                return 0;
            };

            const colorCallback = (ctx) => {
                const active = ctx.chart.getActiveElements();
                if (active.length > 0 && active[0].index === ctx.dataIndex) {
                    const isLead = active[0].datasetIndex === ctx.datasetIndex;
                    return isLead ? ds._baseColor : t.getGhostColor(ds._baseColor, 0.35);
                }
                return 'transparent';
            };

            ds.pointBackgroundColor = colorCallback;
            ds.pointBorderColor = colorCallback;
            ds.hoverRadius = (ctx) => t.getPointRadius(ctx.chart.width);
        });

        // NEW — B1-AP-14c2: Tooltip-Filter für Annotation-Datasets
        const tooltipConfig = FwSmartTooltips.configure(fwContext, {
            titleFont: { family: ciFont },
            bodyFont: { family: ciFont },
            tooltipBg: t.tooltip.bg,
            titleColor: t.tooltip.title,
            bodyColor: t.tooltip.body,
            borderColor: t.tooltip.border
        });
        tooltipConfig.filter = (item) => !item.dataset._fwAnnotationMarker;

        return {
            type: 'line',
            data: { datasets: transformedData.datasets },
            plugins: [CrosshairPlugin],
            options: {
                responsive: true, maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: { display: false },
                    fwContext: fwContext,
                    crosshair: {
                        enabled: true,
                        color: t.getGhostColor(t.colors.textSec, 0.5),
                        dash: [5, 5],
                        lineWidth: 1
                    },
                    tooltip: tooltipConfig
                },
                scales: { 
                    x: FwSmartScales.getTimeAxis(transformedData.meta.minTime, transformedData.meta.maxTime, { family: ciFont }, { plugins: { fwContext }, sourceTicks: transformedData.meta.sourceTicks }),
                    y: FwSmartScales.getSmartYAxis(fwContext, {
                        color: t.colors.textMuted,
                        family: ciFont,
                        gridColor: t.colors.grid,
                        zeroLineColor: t.colors.zeroLine
                    })
                }
            }
        };
    }
}