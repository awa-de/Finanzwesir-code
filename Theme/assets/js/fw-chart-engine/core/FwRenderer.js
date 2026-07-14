/**
 * @fileoverview Finanzwesir Chart Engine - Presentation Layer (Renderer)
 * @module core/FwRenderer
 * @version 5.1.0 (BAN DYNAMIK)
 * @date 2026-02-18
 *
 * @description
 * Presentation Layer: HTML/Canvas-Output, Textformatierung, Layout.
 * V4.7.0: showError/showLoading auf createElement + textContent umgebaut
 * (Security: eliminiert letzte innerHTML-Stellen mit variablem Inhalt).
 * V5.0.0: BAN HEADLINE.
 * - Neu: _renderBAN() rendert Performance-Headline über dem Line Chart.
 * - Neu: _updateBAN() aktualisiert BAN bei Range-/View-Wechsel (Smart Update).
 * - Hilfsmethoden: _signPrefix(), _formatBanValue().
 * - CSS: fw-ban-container, fw-ban-main, fw-ban-sub, fw-ban-hint + Fade-in-Animation.
 * V5.1.0: BAN DYNAMIK.
 * - BAN-Container: Visuelles Styling (Background, Border-Radius, Padding).
 * - Hint-Text: Dynamischer Zähler sichtbarer Serien statt falschem Tooltip-Verweis.
 * - Empty-Mode: Leerer Container bei 0 sichtbaren Serien (CLS-Schutz).
 */

import { FwTheme } from './FwTheme.js';
import { FwDateUtils } from './FwDateUtils.js';
import { FwFormatUtils } from './FwFormatUtils.js';

// CE-3 — Line-Chart-Chrome: statische Literalrezepte (Baukasten §6.5/§6.11).
// Gelten ausschliesslich fuer type === 'line'. Bar/Donut nutzen weiterhin unveraendert
// fw-btn-group/fw-toggle/fw-btn/fw-toggle-opt (Delta A/C.5) — keine Zweitklassenbildung,
// keine Interpolation: jede Konstante ist ein vollstaendiges Literal (§2.2).
const FW_LINE_WRAPPER_CLASS = 'fw-chart-wrapper flex flex-col gap-3 fw-chart-wrapper--line';
const FW_LINE_TITLE_CLASS = 'fw-chart-title m-0 text-lg font-bold text-primary';
const FW_LINE_TOOLBAR_CLASS = 'fw-chart-toolbar flex flex-wrap items-center gap-2';
const FW_LINE_SEGMENTED_GROUP_CLASS = 'fw-chart-segmented-group inline-flex rounded-md bg-bg-faint p-0.5 gap-0.5';
// NEW — CE-3a: eigener Anker fuer die View-Gruppe (Delta B) — nur damit ist die M/L-Rechtsausrichtung
// (ml-auto) gezielt auf die View-Gruppe begrenzbar, ohne die Range-Gruppe mitzubetreffen.
const FW_LINE_VIEW_GROUP_CLASS = 'fw-chart-segmented-group fw-chart-line-view-group inline-flex rounded-md bg-bg-faint p-0.5 gap-0.5 ml-auto';
const FW_LINE_SEGMENTED_OPTION_CLASS = 'fw-chart-segmented-option rounded px-2.5 py-1 text-sm text-text-sec transition-colors motion-reduce:transition-none hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500';
const FW_LINE_SEGMENTED_OPTION_ACTIVE_CLASS = 'fw-chart-segmented-option rounded px-2.5 py-1 text-sm font-semibold bg-bg text-primary shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500';
// CHANGED — CE-3a: self-start ergaenzt (Delta A) — verhindert, dass der flex-col-Wrapper die BAN ueber
// die volle Breite streckt; entspricht dem Mockup "Depotverlauf mit und ohne Warten".
const FW_LINE_BAN_CONTAINER_CLASS = 'fw-ban-container inline-block min-w-48 self-start rounded-lg bg-bg-faint px-4 py-3';
const FW_LINE_BAN_MAIN_CLASS = 'fw-ban-main text-xl font-bold text-text';
const FW_LINE_BAN_SUB_CLASS = 'fw-ban-sub text-sm text-text-sec';
const FW_LINE_BAN_HINT_CLASS = 'fw-ban-hint text-sm text-text-sec';
const FW_LINE_LEGEND_GROUP_CLASS = 'fw-chart-legend flex flex-wrap gap-2';
// CHANGED — CE-3b Delta C: funktionale Kontur/Hover ergaenzt (border border-border text-text
// transition-colors hover:border-primary hover:bg-bg-faint hover:text-primary) — macht die Klickbarkeit
// der echten <button>-Toggle-Pills erkennbar; kein neuer Card-Stil, keine neue Farbwelt.
const FW_LINE_LEGEND_PILL_CLASS = 'fw-legend-item inline-flex cursor-pointer select-none items-center gap-2 rounded-full bg-bg px-3 py-1 text-sm shadow-soft transition-shadow motion-reduce:transition-none hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500 border border-border text-text transition-colors hover:border-primary hover:bg-bg-faint hover:text-primary';
const FW_LINE_LEGEND_PILL_HIDDEN_CLASS = 'fw-legend-item inline-flex cursor-pointer select-none items-center gap-2 rounded-full bg-bg px-3 py-1 text-sm shadow-soft transition-shadow motion-reduce:transition-none hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500 border border-border text-text transition-colors hover:border-primary hover:bg-bg-faint hover:text-primary opacity-40 grayscale';
const FW_LINE_LEGEND_DOT_CLASS = 'fw-legend-dot h-2.5 w-2.5 rounded-full';

export class FwRenderer {
    constructor() {
        this.theme = new FwTheme();
        // KDR-14: CSS-Tokens lesen, bevor _injectStyles() die Werte konsumiert.
        this.theme.init();
        this._injectStyles();
        
        this._handleDrillDown = this._handleDrillDown.bind(this);
        this._closePopover = this._closePopover.bind(this);
    }

    // ... showLoading, showError unverändert ...
    showLoading(container) {
        container.innerHTML = '';
        const wrapper = document.createElement('div');
        // CHANGED — CE-2b: Tailwind-Rezept + fw-loading-container als tokenbasierter Fallback-Anker; role=status
        wrapper.className = 'fw-loading-container flex items-center justify-center gap-3 p-6 text-text-muted';
        wrapper.setAttribute('role', 'status');
        const spinner = document.createElement('div');
        // CHANGED — CE-2b: Tailwind-Spinner-Rezept + fw-loader als Fallback-Anker
        spinner.className = 'fw-loader h-8 w-8 animate-spin motion-reduce:animate-none rounded-full border-4 border-border border-t-primary';
        wrapper.appendChild(spinner);
        const loadingText = document.createElement('span'); // NEW — CE-2b: sichtbarer Ladetext (D-11 / §6.10)
        loadingText.textContent = 'Daten werden geladen …';
        wrapper.appendChild(loadingText);
        container.appendChild(wrapper);
    }
    
    showError(container, message) {
        container.innerHTML = '';
        const div = document.createElement('div');
        // CHANGED \u2014 CE-2b: fw-chart-error-Anker + role=alert + Tailwind-Literalrezept; Inline-Styles entfernt.
        // CI-konformer, tokenbasierter Fallback (.fw-chart-error) in _injectStyles spiegelt Baukasten \u00a76.10.
        div.className = 'fw-chart-error rounded-lg border border-error-border bg-error-bg p-4 text-error-text';
        div.setAttribute('role', 'alert');
        div.textContent = '\u274C Fehler: ' + (message || '');
        container.appendChild(div);
    }

    getTooltipConfig(currencyIso, dateMode) {
        var c = this.theme.colors;
        var f = this.theme.fonts;
        var symbol = FwFormatUtils.getSymbol(currencyIso); 
        dateMode = dateMode || 'full'; 
        
        return {
            enabled: true, 
            backgroundColor: c.bgWhite,
            titleColor: c.text, 
            bodyColor: c.text, 
            borderColor: c.border, 
            borderWidth: 1, 
            padding: 10, 
            cornerRadius: 4, 
            displayColors: false,       
            titleFont: { family: f.body, size: 13, weight: 'bold' },
            bodyFont: { family: f.body, size: 13, weight: 'normal' },
            callbacks: {
                title: function(tooltipItems) {
                    if (!tooltipItems || tooltipItems.length === 0) return '';
                    const item = tooltipItems[0];
                    
                    const chart = item.chart;
                    const context = chart.config.options.plugins.fwContext;
                    
                    // 1. Matrix-Check: Weekly Range?
                    if (context && context.rhythm === 'WEEKLY' && context.dateSemantics === 'RANGE') {
                        const timestamp = item.parsed.x;
                        const isMobile = window.innerWidth < 450;
                        return FwDateUtils.formatTooltipDate(timestamp, 'WEEKLY', isMobile);
                    }
                    
                    // 2. Standard Fallbacks
                    if (dateMode === 'category' || dateMode === 'raw') return item.label; 
                    if (dateMode === 'year') return FwDateUtils.formatYear(item.label);
                    if (dateMode === 'month' || dateMode === 'short') return FwDateUtils.formatShort(item.label);
                    
                    return FwDateUtils.formatFull(item.label);
                },
                label: function(context) {
                    var label = context.dataset.label || '';
                    if (label) label += ': ';
                    if (context.parsed.y !== null) {
                        var mode = (symbol === '%') ? 'return' : 'value';
                        var valStr = FwFormatUtils.formatSmart(context.parsed.y, mode);
                        label += valStr;
                        if (symbol) label += ' ' + symbol;
                    }
                    return label;
                }
            }
        };
    }

    setupStructure(container, config, chartConfig, a11yData, type, fullData, activeView, viewOptions, interactiveFilters) {
        container.innerHTML = '';
        this._renderA11yTable(container, a11yData);

        var isLine = (type === 'line'); // NEW — CE-3
        var wrapper = document.createElement('div');
        // CHANGED — CE-2b/CE-3: Tailwind-Rezept + fw-chart-wrapper bleibt Container-Query-Anker (container-type/-name);
        // Line erhaelt zusaetzlich den stabilen Marker fw-chart-wrapper--line (Delta A.1)
        wrapper.className = isLine ? FW_LINE_WRAPPER_CLASS : 'fw-chart-wrapper flex flex-col gap-3';

        if (config.title) {
            var titleEl = document.createElement('h3');
            // CHANGED — CE-3: Line ergaenzt das statische Titel-Rezept (Delta B.1); Bar/Donut unveraendert
            titleEl.className = isLine ? FW_LINE_TITLE_CLASS : 'fw-chart-title';
            titleEl.innerText = config.title;
            wrapper.appendChild(titleEl);
        }

        // BAN-Headline (V5.0.0): Zwischen Titel und Toolbar
        if (type === 'line' && config.headline) {
            var banEl = this._renderBAN(config.headline, config);
            if (banEl) wrapper.appendChild(banEl);
        }

        var controlsEl = this._renderControls(type, config, fullData, activeView, viewOptions); 
        if (controlsEl) wrapper.appendChild(controlsEl);
        
        var legendEl = this._renderLegend(chartConfig, interactiveFilters); 
        if (legendEl) wrapper.appendChild(legendEl);
        
        var canvasContainer = document.createElement('div');
        // CHANGED — CE-2b: Tailwind-Rezept + fw-chart-canvas-container bleibt Engine-Höhen-Anker (400px)
        canvasContainer.className = 'fw-chart-canvas-container relative w-full';
        
        var canvas = document.createElement('canvas'); 
        canvas.addEventListener('fw-chart-show-details', this._handleDrillDown);
        
        canvasContainer.appendChild(canvas);
        wrapper.appendChild(canvasContainer); 
        container.appendChild(wrapper);
        
        return { canvas: canvas, controls: controlsEl };
    }

    _handleDrillDown(e) {
        if (e && e.detail) {
            this._createPopoverUI(e.detail);
        }
    }

    _createPopoverUI(details) {
        this._closePopover();

        var backdrop = document.createElement('div');
        backdrop.className = 'fw-popover-backdrop';
        backdrop.addEventListener('click', this._closePopover);

        var popover = document.createElement('div');
        popover.className = 'fw-chart-popover';

        var header = document.createElement('div');
        header.className = 'fw-popover-headline';
        
        var titleText = document.createElement('span');
        titleText.innerText = details.title || 'Details';
        
        var closeBtn = document.createElement('span');
        closeBtn.className = 'fw-popover-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', this._closePopover);

        header.appendChild(titleText);
        header.appendChild(closeBtn);
        popover.appendChild(header);

        var body = document.createElement('div');
        body.className = 'fw-popover-body';

        var rows = details.rows || details.data;
        const width = window.innerWidth;
        const isCompact = width < 900; 

        if (rows && Array.isArray(rows)) {
            rows.forEach(row => {
                var rowEl = document.createElement('div');
                rowEl.className = 'fw-popover-row';

                var labelBox = document.createElement('div');
                labelBox.className = 'fw-popover-label-box';
                
                if (row.color) {
                    var dot = document.createElement('span');
                    dot.className = 'fw-popover-dot';
                    dot.style.backgroundColor = row.color;
                    labelBox.appendChild(dot);
                }

                var labelTxt = document.createElement('span');
                labelTxt.innerText = row.label;
                labelBox.appendChild(labelTxt);

                var valEl = document.createElement('div');
                valEl.className = 'fw-popover-value';
                
                // SSOT Check
                valEl.innerText = row.valueStr || ''; 

                rowEl.appendChild(labelBox);
                rowEl.appendChild(valEl);
                body.appendChild(rowEl);
            });
        }
        
        popover.appendChild(body);

        var footer = document.createElement('div');
        footer.className = 'fw-popover-footer';

        var closeButton = document.createElement('button');
        closeButton.className = 'fw-popover-btn-close';
        closeButton.innerText = 'Schließen';
        closeButton.addEventListener('click', this._closePopover);

        footer.appendChild(closeButton);
        popover.appendChild(footer);

        document.body.appendChild(backdrop);
        document.body.appendChild(popover);
    }

    _closePopover() {
        var existingBackdrop = document.querySelector('.fw-popover-backdrop');
        var existingPopover = document.querySelector('.fw-chart-popover');
        if (existingBackdrop) existingBackdrop.remove();
        if (existingPopover) existingPopover.remove();
    }
    
    _renderControls(type, config, fullData, activeView, viewOptions) {
        if (type === 'pie') return null;
        // CHANGED — Feature-Auswahl: rangeControls === false → keine Range-Buttons
        const features = config.features || {};
        if (features.rangeControls === false) return null;
        var isLine = (type === 'line'); // NEW — CE-3
        var toolbar = document.createElement('div');
        // CHANGED — CE-3: Line ergaenzt das statische Toolbar-Rezept (Delta C.1); Bar/Donut unveraendert
        toolbar.className = isLine ? FW_LINE_TOOLBAR_CLASS : 'fw-chart-toolbar';

        var totalYears = 0;
        if (fullData && fullData.rows && fullData.rows.length > 1) {
            var first = fullData.rows[0].Date || fullData.rows[0].Datum;
            var last = fullData.rows[fullData.rows.length - 1].Date || fullData.rows[fullData.rows.length - 1].Datum;
            totalYears = FwDateUtils.getDiffYears(first, last);
        }

        var masterRanges = [
            { value: '1y', label: '1J', min: 1.5 },
            { value: '3y', label: '3J', min: 3.5 },
            { value: '5y', label: '5J', min: 5.5 },
            { value: '10y', label: '10J', min: 10.5 },
            { value: 'max', label: 'Max', min: 0 }
        ];
        
        var semantics = type === 'bar' ? 'PERIOD' : 'SNAPSHOT';
        var validButtons = masterRanges.filter(item => {
            if (item.value === 'max') return true;
            if (totalYears < item.min) return false;
            return FwDateUtils.filterRows(fullData.rows, item.value, semantics).length >= 2;
        });

        if (validButtons.length > 1) {
            var btnGroup = document.createElement('div');
            // CHANGED — CE-3: Line wird echte role="group" mit praezisem aria-label (Delta C.2); Bar unveraendert
            if (isLine) {
                btnGroup.className = FW_LINE_SEGMENTED_GROUP_CLASS;
                btnGroup.setAttribute('role', 'group');
                btnGroup.setAttribute('aria-label', 'Zeitspanne');
            } else {
                btnGroup.className = 'fw-btn-group';
            }
            var activeRange = config.range || 'max';
            validButtons.forEach(item => {
                var btn = document.createElement('button');
                var isActive = (activeRange === item.value);
                // CHANGED — CE-3: Line setzt vollstaendiges Literalrezept + aria-pressed (Delta C.3/C.4); Bar unveraendert
                if (isLine) {
                    btn.type = 'button';
                    btn.className = isActive ? FW_LINE_SEGMENTED_OPTION_ACTIVE_CLASS : FW_LINE_SEGMENTED_OPTION_CLASS;
                    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
                } else {
                    btn.className = 'fw-btn ' + (isActive ? 'active' : '');
                }
                btn.innerText = item.label;
                btn.dataset.action = 'setRange';
                btn.dataset.value = item.value;
                btnGroup.appendChild(btn);
            });
            toolbar.appendChild(btnGroup);
        }

        if (viewOptions && viewOptions.length > 0) {
            var toggle = document.createElement('div');
            // CHANGED — CE-3: Line wird echte role="group" mit praezisem aria-label (Delta C.2); Bar unveraendert
            // CHANGED — CE-3a: View-Gruppe nutzt eigenen Anker FW_LINE_VIEW_GROUP_CLASS (Delta B) fuer M/L-Rechtsausrichtung;
            // Struktur, role, aria-label unveraendert
            if (isLine) {
                toggle.className = FW_LINE_VIEW_GROUP_CLASS;
                toggle.setAttribute('role', 'group');
                toggle.setAttribute('aria-label', 'Ansicht');
            } else {
                toggle.className = 'fw-toggle';
            }
            viewOptions.forEach(opt => {
                var isActive = (activeView === opt.key);
                // CHANGED — CE-3: Line-Optionen sind echte <button type="button"> (Delta C.3); Bar bleibt <span> unveraendert
                var optEl = isLine ? document.createElement('button') : document.createElement('span');
                if (isLine) {
                    optEl.type = 'button';
                    optEl.className = isActive ? FW_LINE_SEGMENTED_OPTION_ACTIVE_CLASS : FW_LINE_SEGMENTED_OPTION_CLASS;
                    optEl.setAttribute('aria-pressed', isActive ? 'true' : 'false');
                } else {
                    optEl.className = 'fw-toggle-opt ' + (isActive ? 'active' : '');
                }
                optEl.innerText = opt.label;
                optEl.dataset.action = 'setView';
                optEl.dataset.value = opt.key;
                toggle.appendChild(optEl);
            });
            toolbar.appendChild(toggle);
        }

        if (toolbar.childElementCount === 0) return null;
        return toolbar;
    }

    _renderLegend(chartConfig, interactiveFilters) {
        if (interactiveFilters !== true) return null;
        if (!chartConfig.data || !chartConfig.data.datasets || chartConfig.data.datasets.length === 0) return null;

        var isPie = chartConfig.type === 'pie' || chartConfig.type === 'doughnut';
        var isRanking = (chartConfig.data.datasets.length === 1 && Array.isArray(chartConfig.data.datasets[0].backgroundColor));
        var isLine = (chartConfig.type === 'line'); // NEW — CE-3 (Delta D: nur chartConfig.type === 'line')

        var legend = document.createElement('div');
        // CHANGED — CE-3: Line ergaenzt das statische Legende-Rezept (Delta D.1); Bar/Pie/Ranking unveraendert
        legend.className = isLine ? FW_LINE_LEGEND_GROUP_CLASS : 'fw-chart-legend';
        var items = [];
        var i = 0;

        if (isPie || isRanking) {
            var labels = chartConfig.data.labels; 
            var bgColors = chartConfig.data.datasets[0].backgroundColor;
            if (!labels || !bgColors) return null;
            
            for (i = 0; i < labels.length; i++) { 
                items.push({ text: labels[i], color: bgColors[i], index: i }); 
            }
        } else {
            var datasets = chartConfig.data.datasets;
            var mainDatasets = datasets.filter(ds => !ds._fwAnnotationMarker); // NEW — B1-AP-14c2
            if (mainDatasets.length < 2) return null;
            if (datasets.length > 12) return null;

            for (i = 0; i < datasets.length; i++) {
                if (datasets[i]._fwAnnotationMarker) continue; // NEW — B1-AP-14c2
                items.push({
                    text: datasets[i].label,
                    color: datasets[i].borderColor || datasets[i].backgroundColor,
                    index: i
                });
            }
        }

        for (i = 0; i < items.length; i++) {
            // CHANGED — CE-3: Line-Legendeneintraege sind echte <button type="button"> mit vollstaendigem
            // Aktiv-Rezept + aria-pressed (Delta D.2/D.4); Bar/Pie/Ranking bleiben <div> unveraendert (Delta D.5).
            var item = isLine ? document.createElement('button') : document.createElement('div');
            if (isLine) {
                item.type = 'button';
                item.className = FW_LINE_LEGEND_PILL_CLASS; // initial stets sichtbar — kein Dataset startet hidden
                item.setAttribute('aria-pressed', 'true');
            } else {
                item.className = 'fw-legend-item';
            }
            item.dataset.index = items[i].index;

            var dot = document.createElement('span');
            // CHANGED — CE-3: Line-Dot-Rezept (Delta D.3); datengetriebene Inline-Farbe bleibt unveraendert
            dot.className = isLine ? FW_LINE_LEGEND_DOT_CLASS : 'fw-legend-dot';
            dot.style.backgroundColor = items[i].color;

            var text = document.createElement('span');
            text.className = 'fw-legend-text';
            text.innerText = items[i].text;

            item.appendChild(dot);
            item.appendChild(text);
            legend.appendChild(item);
        }
        return legend;
    }

    // NEW — CE-3: setzt den Aktiv-/Inaktiv-Zustand eines Line-Segmented-Buttons als vollstaendigen
    // Klassentausch + aria-pressed (Delta C.4). Einzige Quelle der Literalstrings (kein Import in
    // ChartEngine.js noetig); wird sowohl beim Initial-Render als auch im Smart-Update aufgerufen.
    _setLineSegmentedOptionState(btn, isActive) {
        btn.className = isActive ? FW_LINE_SEGMENTED_OPTION_ACTIVE_CLASS : FW_LINE_SEGMENTED_OPTION_CLASS;
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    }

    // NEW — CE-3: setzt den Sichtbar-/Ausgeblendet-Zustand eines Line-Legend-Pills als vollstaendigen
    // Klassentausch + aria-pressed (Delta D.4). isVisible kommt vom Aufrufer aus dem realen
    // Chart.js-Zustand (chart.isDatasetVisible()), keine eigene Sichtbarkeitsquelle.
    _setLineLegendPillState(item, isVisible) {
        item.className = isVisible ? FW_LINE_LEGEND_PILL_CLASS : FW_LINE_LEGEND_PILL_HIDDEN_CLASS;
        item.setAttribute('aria-pressed', isVisible ? 'true' : 'false');
    }

    _renderA11yTable(container, data) {
        if (!data || !data.rows || data.rows.length === 0) return;
        var table = document.createElement('table');
        // CHANGED — CE-2b: sr-only (Tailwind-Ziel) + fw-chart-a11y-fallback (robuste, tokenfreie Verbergung für Tailwind-freie Engine-Testseiten); Inline-Verbergung entfernt
        table.className = 'sr-only fw-chart-a11y-fallback';
        table.setAttribute('summary', data.summary || 'Datentabelle');
        if (data.headers) {
            var thead = document.createElement('thead');
            var tr = document.createElement('tr');
            for (var h = 0; h < data.headers.length; h++) {
                var th = document.createElement('th');
                th.innerText = this._sanitize(data.headers[h]);
                tr.appendChild(th);
            }
            thead.appendChild(tr);
            table.appendChild(thead);
        }
        var tbody = document.createElement('tbody');
        for (var r = 0; r < data.rows.length; r++) {
            var rowTr = document.createElement('tr');
            var rowData = data.rows[r];
            for (var c = 0; c < rowData.length; c++) {
                var td = document.createElement('td');
                var val = rowData[c];
                if (val === null || val === undefined) val = '-';
                td.innerText = this._sanitize(String(val));
                rowTr.appendChild(td);
            }
            tbody.appendChild(rowTr);
        }
        table.appendChild(tbody);
        container.appendChild(table);
    }
    
    _injectStyles() {
        if (document.getElementById('fw-chart-styles')) return;
        var theme = this.theme;
        // KDR-14: Alle Farben aus Theme-Tokens, keine Hardcoded-Hex-Werte
        var c = theme.colors;
        var f = theme.fonts;

        var css = `
            .fw-chart-wrapper { font-family: ${f.body}; position: relative; color: ${c.text}; container-type: inline-size; container-name: fw-chart; }
            .fw-chart-title { font-family: ${f.body}; font-weight: 700; color: ${c.petrol}; margin: 0 0 16px 0; font-size: 20px; }
            .fw-chart-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 12px; }
            .fw-btn-group, .fw-toggle { display: flex; background: ${c.grid}; border-radius: 8px; padding: 4px; }
            .fw-toggle { margin-left: auto; }
            .fw-btn, .fw-toggle-opt { background: transparent; border: none; padding: 6px 14px; font-family: ${f.body}; font-size: 13px; font-weight: 600; color: ${c.textMuted}; cursor: pointer; border-radius: 6px; transition: all 0.2s ease; display: inline-block; }
            .fw-btn:hover, .fw-toggle-opt:hover { color: ${c.petrol}; background: rgba(255,255,255,0.6); }
            .fw-btn.active, .fw-toggle-opt.active { background: ${c.bgWhite}; color: ${c.petrol}; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
            .fw-chart-legend { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid ${c.grid}; }
            .fw-legend-item { display: flex; align-items: center; cursor: pointer; background-color: ${c.bgWhite}; border: 1px solid ${c.grid}; border-radius: 9999px; padding: 5px 12px; font-size: 13px; font-weight: 600; color: ${c.text}; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: all 0.2s ease; user-select: none; }
            .fw-legend-item:hover { border-color: ${c.petrol}; background-color: ${theme.getGhostColor(c.petrol, 0.08)}; box-shadow: 0 2px 4px rgba(0,0,0,0.08); transform: translateY(-1px); }
            .fw-legend-item.hidden-dataset { background-color: ${c.grid}; border-color: transparent; box-shadow: none; opacity: 0.6; transform: none; }
            .fw-legend-item.hidden-dataset .fw-legend-text { text-decoration: line-through; color: ${c.textDisabled}; }
            .fw-legend-item.hidden-dataset .fw-legend-dot { filter: grayscale(100%); opacity: 0.5; }
            .fw-legend-dot { width: 10px; height: 10px; border-radius: 2px; margin-right: 8px; flex-shrink: 0; }
            .fw-legend-text { white-space: nowrap; }
            .fw-loading-container { display: flex; justify-content: center; align-items: center; height: 300px; width: 100%; }
            .fw-loader { border: 3px solid ${c.loaderBg}; border-top: 3px solid ${c.petrol}; border-radius: 50%; width: 32px; height: 32px; animation: fw-spin 1s linear infinite; }
            @keyframes fw-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            /* NEW — CE-2b: tokenbasierter Fallback für Tailwind-freie Engine-Testseiten (keine neue Designwahrheit).
               .fw-chart-error spiegelt das CI-Error-Rezept aus Baukasten §6.10
               (rounded-lg border border-error-border bg-error-bg p-4 text-error-text) über die
               --color-error-*-Tokens (Hex nur als Fallback für Test-HTMLs ohne tokens.css). Dadurch ist die
               Engine-Fehlerfläche CI-konform und auf Tailwind-freien wie Tailwind-Seiten identisch.
               (Albert-Korrektur 2026-07-14: frühere Purpur-Fläche war nicht CI-konform.) */
            .fw-chart-a11y-fallback { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
            .fw-chart-error { color: var(--color-error-text, #b71c1c); background-color: var(--color-error-bg, #fff8f8); border: 1px solid var(--color-error-border, #c62828); border-radius: 0.5rem; padding: 16px; font-family: ${f.body}; }
            .fw-chart-canvas-container { position: relative; height: 400px; width: 100%; }
            .fw-popover-backdrop { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); z-index: 9998; backdrop-filter: blur(2px); }
            .fw-chart-popover { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; max-width: 340px; background: ${c.grid}; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); z-index: 9999; overflow: hidden; font-family: ${f.body}; display: flex; flex-direction: column; }
            .fw-popover-headline { background: ${c.bgWhite}; padding: 16px; border-bottom: 1px solid ${c.grid}; font-weight: 700; color: ${c.petrol}; font-size: 16px; display: flex; justify-content: space-between; align-items: center; }
            .fw-popover-close { cursor: pointer; font-size: 24px; color: ${c.textSec}; line-height: 0.8; padding: 10px; margin: -10px; }
            .fw-popover-close:hover { color: ${c.petrol}; }
            .fw-popover-body { padding: 0; max-height: 60vh; overflow-y: auto; background: ${c.bgWhite}; }
            .fw-popover-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid rgba(0,0,0,0.05); }
            .fw-popover-row:last-child { border-bottom: none; }
            .fw-popover-label-box { display: flex; align-items: center; flex: 1; margin-right: 12px; }
            .fw-popover-dot { width: 10px; height: 10px; border-radius: 3px; margin-right: 10px; flex-shrink: 0; }
            .fw-popover-row span { font-size: 14px; color: ${c.text}; }
            .fw-popover-value { font-weight: 700; color: ${c.text}; font-size: 14px; white-space: nowrap; }
            .fw-popover-footer { padding: 16px; border-top: 1px solid rgba(0,0,0,0.05); background: ${c.bgFaint}; text-align: center; margin-top: auto; }
            .fw-popover-btn-close { background: ${c.bgWhite}; border: 1px solid ${c.petrol}; color: ${c.petrol}; font-family: ${f.body}; font-weight: 600; font-size: 14px; padding: 10px 20px; border-radius: 6px; cursor: pointer; width: 100%; transition: all 0.2s; }
            .fw-popover-btn-close:hover { background: ${theme.getGhostColor(c.petrol, 0.08)}; border-color: ${c.petrol}; }
            .fw-ban-container { display: inline-block; min-width: 200px; margin: 8px 0; padding: 12px 16px; background-color: ${theme.getGhostColor(c.grid, 0.6)}; border-radius: 0.5rem; animation: fw-ban-fadein 150ms ease-out; }
            .fw-ban-series { margin-bottom: 2px; }
            .fw-ban-series:last-of-type { margin-bottom: 0; }
            .fw-ban-main { font-family: ${f.body}; font-size: 20px; font-weight: 700; color: ${c.text}; line-height: 1.25; }
            .fw-ban-sub { font-family: ${f.body}; font-size: 15px; font-weight: 400; color: ${c.textSec}; line-height: 1.4; margin-top: 2px; }
            .fw-ban-hint { font-family: ${f.body}; font-size: 15px; font-weight: 400; color: ${c.textSec}; margin: 0; }
            @keyframes fw-ban-fadein { from { opacity: 0; } to { opacity: 1; } }
            @container fw-chart (min-width: 450px) {
                .fw-ban-container { padding: 16px 16px; }
                .fw-ban-main { font-size: 24px; }
                .fw-ban-sub { font-size: 16px; }
                .fw-ban-hint { font-size: 16px; }
            }
            @container fw-chart (max-width: 450px) {
                .fw-chart-toolbar { flex-direction: column !important; height: auto !important; gap: 12px !important; padding: 10px 0 !important; }
                .fw-btn-group { display: grid !important; grid-template-columns: repeat(auto-fit, minmax(45px, 1fr)); width: 100% !important; margin: 0 !important; gap: 6px !important; }
                .fw-btn { width: auto !important; justify-content: center !important; padding: 8px 0 !important; font-size: 13px !important; }
                .fw-toggle { width: 100% !important; display: flex !important; margin-top: 5px !important; }
                .fw-toggle-opt { flex: 1 !important; text-align: center !important; justify-content: center !important; padding: 10px 0 !important; font-size: 13px !important; }
            }
            /* NEW — CE-3: Line-Chart-Chrome — tokenbasierter Fallback fuer Tailwind-freie Engine-Testseiten
               (Delta A: line-spezifische Fallbacks), ausschliesslich unter dem Line-Marker selektiert
               (Delta A.2). Bestehende generische Bar-/Donut-Regeln (.fw-chart-title, .fw-chart-toolbar,
               .fw-ban-*, .fw-chart-legend, .fw-legend-item, .fw-legend-dot sowie
               .fw-btn-group/.fw-toggle/.fw-btn/.fw-toggle-opt inkl. der Zone-S-@container-Regeln oben)
               bleiben unveraendert und bedienen weiterhin Bar/Donut unveraendert. Zone-S-Sonderregeln
               sind fuer Line bewusst nicht dupliziert: flex-wrap leistet das Umbruchverhalten bereits
               (Baukasten §6.11 Responsive-Absatz: "Zone S ... beides leistet flex-wrap bereits"). */
            /* NEW — CE-3b Delta A: Wrapper-Fallback-Rhythmus. FW_LINE_WRAPPER_CLASS traegt "flex flex-col
               gap-3", aber auf Tailwind-freien Engine-Testseiten ist das inerter Text -- ohne diese Regel
               kleben Titel/BAN/Toolbar/Legende/Canvas zusammen. gap:12px = Tailwind gap-3 (0.75rem),
               einzige Quelle des vertikalen Rhythmus (keine individuellen Margins re-eingefuehrt). */
            .fw-chart-wrapper--line { display: flex; flex-direction: column; gap: 12px; }
            .fw-chart-wrapper--line .fw-chart-title { margin: 0; font-size: 18px; }
            .fw-chart-wrapper--line .fw-chart-toolbar { justify-content: flex-start; margin-bottom: 0; gap: 8px; }
            .fw-chart-wrapper--line .fw-chart-segmented-group { display: inline-flex; border-radius: 6px; background: ${c.bgFaint}; padding: 2px; gap: 2px; }
            .fw-chart-wrapper--line .fw-chart-line-view-group { margin-left: auto; }
            .fw-chart-wrapper--line .fw-chart-segmented-option { display: inline-block; border: none; border-radius: 4px; padding: 4px 10px; font-family: ${f.body}; font-size: 14px; color: ${c.textSec}; background: transparent; cursor: pointer; transition: color 0.2s ease; }
            .fw-chart-wrapper--line .fw-chart-segmented-option:hover { color: ${c.text}; }
            .fw-chart-wrapper--line .fw-chart-segmented-option[aria-pressed="true"] { background: ${c.bgWhite}; color: ${c.petrol}; font-weight: 600; box-shadow: var(--shadow-soft, 0 4px 20px -2px rgba(39,39,39,0.05)); }
            .fw-chart-wrapper--line .fw-ban-container { min-width: 192px; margin: 0; background-color: ${c.bgFaint}; align-self: flex-start; }
            .fw-chart-wrapper--line .fw-ban-sub { font-size: 14px; margin-top: 0; }
            .fw-chart-wrapper--line .fw-ban-hint { font-size: 14px; }
            .fw-chart-wrapper--line .fw-chart-legend { margin-bottom: 0; padding-bottom: 0; border-bottom: none; gap: 8px; }
            .fw-chart-wrapper--line .fw-legend-item { display: inline-flex; gap: 8px; border: 1px solid ${c.grid}; border-radius: 9999px; padding: 4px 12px; font-size: 14px; font-weight: 400; color: ${c.text}; background-color: ${c.bgWhite}; box-shadow: var(--shadow-soft, 0 4px 20px -2px rgba(39,39,39,0.05)); transition: box-shadow 0.2s ease; }
            .fw-chart-wrapper--line .fw-legend-item:hover { border-color: ${c.petrol}; color: ${c.petrol}; background-color: ${c.bgFaint}; box-shadow: var(--shadow-hover, 0 10px 25px -5px rgba(39,39,39,0.1)); transform: none; }
            .fw-chart-wrapper--line .fw-legend-item[aria-pressed="false"] { opacity: 0.4; filter: grayscale(1); }
            .fw-chart-wrapper--line .fw-legend-dot { border-radius: 9999px; margin-right: 0; }
            @media (prefers-reduced-motion: reduce) {
                .fw-chart-wrapper--line .fw-chart-segmented-option,
                .fw-chart-wrapper--line .fw-legend-item { transition: none; }
            }
            /* NEW — CE-3b Delta B: einziger line-spezifischer Zone-S-Block, bewusst NACH der Basisregel
               ".fw-chart-wrapper--line .fw-chart-line-view-group { margin-left: auto; }" oben platziert.
               Gleiche Selektorspezifitaet (zwei Klassen) -> die spaetere Quellposition entscheidet den
               Kaskaden-Tiebreak: hier gewinnt "margin-left: 0" auf S, oben "margin-left: auto" auf M/L.
               Kein !important fuer margin-left (CE-3a-Fehleinschaetzung zur Spezifitaet korrigiert). Der
               fruehere, zu frueh platzierte CE-3a-Block innerhalb des ersten @container-Blocks oben wurde
               entfernt -- es existiert jetzt nur noch dieser eine line-spezifische Zone-S-Block. */
            @container fw-chart (max-width: 450px) {
                .fw-chart-wrapper--line .fw-chart-toolbar { flex-direction: row !important; align-items: center; padding: 0 !important; gap: 8px !important; }
                .fw-chart-wrapper--line .fw-chart-line-view-group { margin-left: 0; }
            }
        `;
        
        var style = document.createElement('style'); 
        style.id = 'fw-chart-styles'; 
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css)); 
        document.head.appendChild(style);
    }
    
    _sanitize(str) {
        if (!str) return '';
        if (typeof str !== 'string') return String(str);
        return str.replace(/[<>]/g, '');
    }

    // ─── BAN (Big Accessible Number) V5.0.0 ───────────────────────

    /**
     * Rendert die BAN-Headline für Line Charts.
     * @param {Object} headlineData - Aus meta.headline (berechnet in LineChartStrategy)
     * @param {Object} config - Runtime-Config (für Titel-Fallback im aria-label)
     * @returns {HTMLElement|null}
     */
    _renderBAN(headlineData, config) {
        if (!headlineData) return null;

        // CE-3: BAN ist ausschliesslich line-exklusiv (nur LineChartStrategy liefert meta.headline —
        // verifiziert per Grep: 0 Treffer in BarChartStrategy.js/PieChartStrategy.js). Das Baukasten-
        // Rezept (Delta B.2) gilt daher unbedingt, ohne zusaetzlichen Typ-Parameter in dieser Methode.
        const container = document.createElement('div');
        container.className = FW_LINE_BAN_CONTAINER_CLASS;
        container.setAttribute('aria-live', 'polite');

        // Empty-Modus: 0 sichtbare Serien → Container erhalten, kein Inhalt (CLS-Schutz)
        if (headlineData.mode === 'empty') {
            return container;
        }

        // Hint-Modus: 4+ sichtbare Serien → Hinweis mit dynamischem Zähler
        if (headlineData.mode === 'hint') {
            const hint = document.createElement('p');
            hint.className = FW_LINE_BAN_HINT_CLASS;
            hint.textContent = 'Renditen sichtbar ab 3 Serien \u00B7 ' + headlineData.visibleCount + ' aktiv';
            container.appendChild(hint);
            return container;
        }

        // Data-Modus: 1–3 Serien
        if (headlineData.mode !== 'data' || !headlineData.series || headlineData.series.length === 0) {
            return null;
        }

        const isMulti = headlineData.seriesCount > 1;
        const symbol = FwFormatUtils.getSymbol(headlineData.currency);

        for (const s of headlineData.series) {
            const block = document.createElement('div');
            block.className = 'fw-ban-series';

            // Hauptzeile: Modus-kongruent (Main = Y-Achsen-Einheit)
            const mainLine = document.createElement('div');
            mainLine.className = FW_LINE_BAN_MAIN_CLASS;

            let mainText = '';
            if (isMulti) {
                mainText += s.name + ': ';
            }
            mainText += this._formatBanLine(s, headlineData.formatMode, symbol);
            mainLine.textContent = mainText;

            block.appendChild(mainLine);
            container.appendChild(block);
        }

        // Sub-Zeile: Zeitraum (+ komplementärer Wert bei Single-Asset + Währung)
        const subLine = document.createElement('div');
        subLine.className = FW_LINE_BAN_SUB_CLASS;

        let subText = 'seit ' + headlineData.startYear;

        // Komplementärwert nur bei Single-Asset + Währungsdaten
        if (!isMulti && headlineData.hasComplementaryValue) {
            const s = headlineData.series[0];
            const compMode = (headlineData.formatMode === 'percent') ? 'currency' : 'percent';
            const compValue = (headlineData.formatMode === 'percent') ? s.absoluteChange : s.percentChange;
            const compSymbol = (headlineData.formatMode === 'percent') ? symbol : '%';

            if (compValue != null) {
                const formatted = FwFormatUtils.formatSmart(Math.abs(compValue), compMode);
                subText += ' \u00B7 ' + this._signPrefix(compValue) + formatted + '\u00A0' + compSymbol;
            }
        }

        subLine.textContent = subText;
        container.appendChild(subLine);

        // A11y: Wenn kein Titel, aria-label mit Asset-Namen
        if (!config.title) {
            const names = headlineData.series.map(s => s.name).join(', ');
            container.setAttribute('aria-label', names + ': ' + container.textContent);
        }

        return container;
    }

    /**
     * Formatiert eine BAN-Hauptzeile (Vorzeichen + Wert + Einheit).
     * @param {Object} series - { absoluteChange, percentChange }
     * @param {string} formatMode - 'percent' oder 'value'
     * @param {string} symbol - Einheitensymbol (€, $, %, etc.)
     * @returns {string}
     */
    _formatBanLine(series, formatMode, symbol) {
        const value = (formatMode === 'percent') ? series.percentChange : series.absoluteChange;

        // Fallback: Wenn percentChange null (Division durch Null), zeige absolute Differenz
        if (value == null) {
            const fallback = FwFormatUtils.formatSmart(Math.abs(series.absoluteChange), 'currency');
            return this._signPrefix(series.absoluteChange) + fallback + '\u00A0' + symbol;
        }

        const mode = (formatMode === 'percent') ? 'percent' : 'currency';
        const formatted = FwFormatUtils.formatSmart(Math.abs(value), mode);
        return this._signPrefix(value) + formatted + '\u00A0' + (formatMode === 'percent' ? '%' : symbol);
    }

    /**
     * Aktualisiert die BAN bei Range-/View-Wechsel (Smart Update).
     * Pattern identisch zu _updateLegend.
     */
    _updateBAN(container, headlineData, config) {
        const oldBan = container.querySelector('.fw-ban-container');
        const newBan = this._renderBAN(headlineData, config);

        if (oldBan && newBan) {
            oldBan.replaceWith(newBan);
        } else if (oldBan && !newBan) {
            oldBan.remove();
        } else if (!oldBan && newBan) {
            // Einfügen nach Titel, vor Toolbar
            const toolbar = container.querySelector('.fw-chart-toolbar');
            const title = container.querySelector('.fw-chart-title');
            if (title) {
                title.after(newBan);
            } else if (toolbar) {
                toolbar.before(newBan);
            }
        }
    }

    /**
     * Vorzeichen-Prefix nach UX-Spec: + für positiv, − (U+2212) für negativ, leer für null.
     */
    _signPrefix(value) {
        if (value > 0) return '+';
        if (value < 0) return '\u2212';
        return '';
    }
}