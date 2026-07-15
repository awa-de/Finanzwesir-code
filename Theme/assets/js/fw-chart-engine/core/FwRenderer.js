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

// CE-4c — Gemeinsamer Chrome-Kern (Baukasten §6.5/§6.11): identische reine Chrome-Rezepte existieren
// genau einmal als FW_CHROME_*-Konstanten und werden von Line UND regulaerem Bar verwendet (repariert
// die CE-4-Architekturabweichung, die diese Rezepte als FW_LINE_*/FW_BAR_* dupliziert hatte — siehe
// CE-4a-Nachtrag). Donut/Pie nutzt weiterhin unveraendert fw-btn-group/fw-toggle/fw-btn/fw-toggle-opt
// bzw. den generischen 'fw-chart-*'-Bestand — keine Zweitklassenbildung, keine Interpolation: jede
// Konstante ist ein vollstaendiges Literal (§2.2).
const FW_CHROME_WRAPPER_CLASS = 'fw-chart-wrapper flex flex-col gap-3';
const FW_CHROME_TITLE_CLASS = 'fw-chart-title m-0 text-lg font-bold text-primary';
const FW_CHROME_TOOLBAR_CLASS = 'fw-chart-toolbar flex flex-wrap items-center gap-2';
const FW_CHROME_SEGMENTED_GROUP_CLASS = 'fw-chart-segmented-group inline-flex rounded-md bg-bg-faint p-0.5 gap-0.5';
// gemeinsamer Anker fuer die View-Gruppe (ersetzt die vormals getrennten fw-chart-line-view-group/
// fw-chart-bar-view-group-Anker aus CE-3a/CE-4) — begrenzt die M/L-Rechtsausrichtung (ml-auto) und die
// Zone-S-Gegenregel gezielt auf die View-Gruppe, typunabhaengig.
const FW_CHROME_VIEW_GROUP_CLASS = 'fw-chart-segmented-group fw-chart-view-group inline-flex rounded-md bg-bg-faint p-0.5 gap-0.5 ml-auto';
const FW_CHROME_SEGMENTED_OPTION_CLASS = 'fw-chart-segmented-option rounded px-2.5 py-1 text-sm text-text-sec transition-colors motion-reduce:transition-none hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500';
const FW_CHROME_SEGMENTED_OPTION_ACTIVE_CLASS = 'fw-chart-segmented-option rounded px-2.5 py-1 text-sm font-semibold bg-bg text-primary shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500';
const FW_CHROME_LEGEND_GROUP_CLASS = 'fw-chart-legend flex flex-wrap gap-2';
// Funktionale Kontur/Hover (border border-border text-text transition-colors hover:border-primary
// hover:bg-bg-faint hover:text-primary, seit CE-3b) — macht die Klickbarkeit der echten
// <button>-Toggle-Pills erkennbar; kein neuer Card-Stil, keine neue Farbwelt. Gilt fuer Line und die
// reguläre Mehrserien-Bar-Legende (!isRanking); Ranking-Bar-Legende bleibt unberuehrt (eigener,
// unveraenderter Legend-Branch, siehe Ranking-Schranke).
const FW_CHROME_LEGEND_PILL_CLASS = 'fw-legend-item inline-flex cursor-pointer select-none items-center gap-2 rounded-full bg-bg px-3 py-1 text-sm shadow-soft transition-shadow motion-reduce:transition-none hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500 border border-border text-text transition-colors hover:border-primary hover:bg-bg-faint hover:text-primary';
const FW_CHROME_LEGEND_PILL_HIDDEN_CLASS = 'fw-legend-item inline-flex cursor-pointer select-none items-center gap-2 rounded-full bg-bg px-3 py-1 text-sm shadow-soft transition-shadow motion-reduce:transition-none hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500 border border-border text-text transition-colors hover:border-primary hover:bg-bg-faint hover:text-primary opacity-40 grayscale';
const FW_CHROME_LEGEND_DOT_CLASS = 'fw-legend-dot h-2.5 w-2.5 rounded-full';

// Line-spezifisch (bleibt line-exklusiv, CE-4c fasst diese Familie nicht an — Delta A.3/B.4):
// CHANGED — CE-3a: self-start ergaenzt — verhindert, dass der flex-col-Wrapper die BAN ueber die volle
// Breite streckt; entspricht dem Mockup "Depotverlauf mit und ohne Warten".
const FW_LINE_BAN_CONTAINER_CLASS = 'fw-ban-container inline-block min-w-48 self-start rounded-lg bg-bg-faint px-4 py-3';
const FW_LINE_BAN_MAIN_CLASS = 'fw-ban-main text-xl font-bold text-text';
const FW_LINE_BAN_SUB_CLASS = 'fw-ban-sub text-sm text-text-sec';
const FW_LINE_BAN_HINT_CLASS = 'fw-ban-hint text-sm text-text-sec';

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
        var isBar = (type === 'bar'); // NEW — CE-4
        var wrapper = document.createElement('div');
        // CHANGED — CE-4c (Delta B.1): gemeinsames FW_CHROME_WRAPPER_CLASS-Grundrezept fuer alle Typen;
        // fw-chart-wrapper bleibt Container-Query-Anker (container-type/-name). Typmarker (fw-chart-wrapper--line/
        // --bar) UND der gemeinsame, nicht-Tailwind Chrome-Anker fw-chart-chrome (scoped die gemeinsamen
        // Tailwind-freien Fallbacks, s. _injectStyles) werden ausschliesslich per classList.add() ergaenzt —
        // keine Stringverkettung. Donut bleibt ohne Marker/Anker beim reinen Grundrezept (unveraendert).
        wrapper.className = FW_CHROME_WRAPPER_CLASS;
        if (isLine) {
            wrapper.classList.add('fw-chart-wrapper--line', 'fw-chart-chrome');
        } else if (isBar) {
            wrapper.classList.add('fw-chart-wrapper--bar', 'fw-chart-chrome');
        }

        if (config.title) {
            var titleEl = document.createElement('h3');
            // CHANGED — CE-4c: Line/Bar teilen sich das gemeinsame Titel-Rezept (Delta A.1); Donut unveraendert
            titleEl.className = (isLine || isBar) ? FW_CHROME_TITLE_CLASS : 'fw-chart-title';
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
        var isBar = (type === 'bar'); // NEW — CE-4
        var isChromeControls = (isLine || isBar); // NEW — CE-4c: gemeinsamer Kontroll-Pfad
        var toolbar = document.createElement('div');
        // CHANGED — CE-4c: Line/Bar teilen sich das gemeinsame Toolbar-Rezept (Delta C.1); Donut unveraendert
        toolbar.className = isChromeControls ? FW_CHROME_TOOLBAR_CLASS : 'fw-chart-toolbar';

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
            // CHANGED — CE-4c: Line/Bar werden echte role="group" mit praezisem aria-label über das
            // gemeinsame Segmented-Group-Rezept (Delta C.2); Donut unveraendert
            if (isChromeControls) {
                btnGroup.className = FW_CHROME_SEGMENTED_GROUP_CLASS;
                btnGroup.setAttribute('role', 'group');
                btnGroup.setAttribute('aria-label', 'Zeitspanne');
            } else {
                btnGroup.className = 'fw-btn-group';
            }
            var activeRange = config.range || 'max';
            validButtons.forEach(item => {
                var btn = document.createElement('button');
                var isActive = (activeRange === item.value);
                // CHANGED — CE-4c: Line/Bar setzen vollstaendiges gemeinsames Literalrezept + aria-pressed
                // (Delta C.3/C.4); Donut unveraendert
                if (isChromeControls) {
                    btn.type = 'button';
                    btn.className = isActive ? FW_CHROME_SEGMENTED_OPTION_ACTIVE_CLASS : FW_CHROME_SEGMENTED_OPTION_CLASS;
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
            // CHANGED — CE-4c: Line/Bar werden echte role="group" mit praezisem aria-label über den
            // gemeinsamen View-Gruppen-Anker FW_CHROME_VIEW_GROUP_CLASS (ersetzt die vormals getrennten
            // FW_LINE_VIEW_GROUP_CLASS/FW_BAR_VIEW_GROUP_CLASS aus CE-3a/CE-4); Struktur, role, aria-label
            // unveraendert; Donut unveraendert
            if (isChromeControls) {
                toggle.className = FW_CHROME_VIEW_GROUP_CLASS;
                toggle.setAttribute('role', 'group');
                toggle.setAttribute('aria-label', 'Ansicht');
            } else {
                toggle.className = 'fw-toggle';
            }
            viewOptions.forEach(opt => {
                var isActive = (activeView === opt.key);
                // CHANGED — CE-4c: Line-/Bar-Optionen sind echte <button type="button"> (Delta C.3); Donut bleibt <span> unveraendert
                var optEl = isChromeControls ? document.createElement('button') : document.createElement('span');
                if (isChromeControls) {
                    optEl.type = 'button';
                    optEl.className = isActive ? FW_CHROME_SEGMENTED_OPTION_ACTIVE_CLASS : FW_CHROME_SEGMENTED_OPTION_CLASS;
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
        // NEW — CE-4 (Delta C.1): reguläre Mehrserien-Bar-Legende, ausdrücklich NICHT Ranking-Bar
        // (Ranking-Schranke) — Ranking behält den bisherigen isPie||isRanking-Branch unveraendert.
        var isBarRegular = (chartConfig.type === 'bar' && !isRanking);
        var isChromeLegend = (isLine || isBarRegular); // NEW — CE-4c: gemeinsamer Legend-Pill-Pfad

        var legend = document.createElement('div');
        // CHANGED — CE-4c: Line/reguläre Bar teilen sich das gemeinsame Legende-Rezept (Delta D.1); Pie/Ranking unveraendert
        legend.className = isChromeLegend ? FW_CHROME_LEGEND_GROUP_CLASS : 'fw-chart-legend';
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
            // CHANGED — CE-4c: Line-/reguläre Bar-Legendeneintraege sind echte <button type="button"> mit
            // vollstaendigem gemeinsamem Aktiv-Rezept + aria-pressed (Delta D.2/D.4); Pie/Ranking bleiben
            // <div> unveraendert (Delta D.5).
            var item = (isChromeLegend || isPie) ? document.createElement('button') : document.createElement('div');
            if (isChromeLegend) {
                item.type = 'button';
                item.className = FW_CHROME_LEGEND_PILL_CLASS; // initial stets sichtbar — kein Dataset startet hidden
                item.setAttribute('aria-pressed', 'true');
            } else if (isPie) {
                // NEW — CE-5: Segment-Daempfungs-Primitive (DOC-03). Echtes <button> fuer A11y/Tastatur-
                // Semantik. CE-5/CE-5a/CE-5c hielten hier bewusst eine eigene, minimale Klasse (kein
                // FW_CHROME_LEGEND_PILL_CLASS), weil die damalige Pie-Altoptik (petrol-getoentem Hover,
                // Hover-Lift, drei Box-Shadow-Zustaende) als erhaltenswert galt und sich nicht verlustfrei
                // auf die Baukasten-Zwei-Schatten-Stufen abbilden liess.
                // CHANGED — CE-5d: Albert hat diese Altoptik-Schutzwirkung per DOC-04 ausdruecklich
                // aufgehoben (Basis-/Hover-/Fokusoptik ist ab jetzt gemeinsam fuer alle Legend-Pills; nur
                // Bedeutung + Toggle-/Ghost-Zustand bleiben charttypspezifisch). Aktiver Pie-Eintrag nutzt
                // deshalb jetzt direkt das vorhandene FW_CHROME_LEGEND_PILL_CLASS (nicht kopiert, nicht
                // nachgebaut) und ergaenzt nur den bestehenden statischen Pie-Scope-Anker
                // fw-pie-segment-damping-item per classList.add(). Der Ghost-Zustand bleibt unveraendert
                // eigenstaendig ueber die bestehende 'hidden-dataset'-Klasse (_setPieSegmentDampingState()
                // bytegleich) -- FW_CHROME_LEGEND_PILL_HIDDEN_CLASS bleibt exklusiv fuer Line/Bar-
                // Dataset-Sichtbarkeit und wird hier nicht verwendet.
                item.type = 'button';
                item.className = FW_CHROME_LEGEND_PILL_CLASS;
                item.classList.add('fw-pie-segment-damping-item');
                item.setAttribute('aria-pressed', 'true'); // Start: alle Segmente aktiv (ds._status init 'active')
            } else {
                item.className = 'fw-legend-item';
            }
            item.dataset.index = items[i].index;

            var dot = document.createElement('span');
            // CHANGED — CE-4c: Line-/Bar-Dot-Rezept (Delta D.3); datengetriebene Inline-Farbe bleibt unveraendert
            // CHANGED — CE-5d: Pie-Dot teilt sich jetzt ebenfalls FW_CHROME_LEGEND_DOT_CLASS (DOC-04-
            // Basisoptik-Vertrag) statt des generischen, fast quadratischen Alt-Dots.
            dot.className = (isChromeLegend || isPie) ? FW_CHROME_LEGEND_DOT_CLASS : 'fw-legend-dot';
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

    // CHANGED — CE-4c: gemeinsamer Zustandshelfer fuer Segmented-Options (ersetzt die vormals getrennten
    // _setLineSegmentedOptionState/_setBarSegmentedOptionState aus CE-3/CE-4 — identische Konstanten,
    // identisches Verhalten fuer Line und regulären Bar). Setzt den Aktiv-/Inaktiv-Zustand als
    // vollstaendigen Klassentausch + aria-pressed (Delta C.4). Wird sowohl beim Initial-Render als auch
    // im Smart-Update aufgerufen.
    _setChromeSegmentedOptionState(btn, isActive) {
        btn.className = isActive ? FW_CHROME_SEGMENTED_OPTION_ACTIVE_CLASS : FW_CHROME_SEGMENTED_OPTION_CLASS;
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    }

    // CHANGED — CE-4c: gemeinsamer Zustandshelfer fuer Legend-Pills (ersetzt die vormals getrennten
    // _setLineLegendPillState/_setBarLegendPillState aus CE-3/CE-4). Setzt den Sichtbar-/Ausgeblendet-
    // Zustand als vollstaendigen Klassentausch + aria-pressed (Delta D.4). isVisible kommt vom Aufrufer
    // ausschliesslich aus dem realen Chart.js-Zustand (chart.isDatasetVisible()), keine eigene
    // Sichtbarkeitsquelle. Gilt fuer Line und die reguläre Mehrserien-Bar-Legende — Ranking-Bar rendert
    // nie eine Legende (siehe _renderLegend), dieser Helfer wird fuer Ranking nie aufgerufen.
    _setChromeLegendPillState(item, isVisible) {
        item.className = isVisible ? FW_CHROME_LEGEND_PILL_CLASS : FW_CHROME_LEGEND_PILL_HIDDEN_CLASS;
        item.setAttribute('aria-pressed', isVisible ? 'true' : 'false');
    }

    // NEW — CE-5: Segment-Daempfungs-Zustandshelfer (Donut/Pie, DOC-03-Vertrag "Segment-Daempfung
    // umschalten"). Spiegelt den realen active/ghost-Zustand aus PieChartStrategy (ds._status, von
    // handleLegendClick() gepflegt) in Klasse + aria-pressed. Kein unabhaengiges classList.toggle()
    // mehr als zweite Zustandsquelle -- isActive kommt vom Aufrufer ausschliesslich aus dem realen
    // ds._status-Wert. Klasse 'hidden-dataset' ist die unveraenderte Bestandsoptik (Grauton,
    // durchgestrichener Text, entsaettigter Dot), keine neue Rezeptur.
    _setPieSegmentDampingState(item, isActive) {
        item.classList.toggle('hidden-dataset', !isActive);
        item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
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
            .fw-legend-item { display: flex; align-items: center; cursor: pointer; background-color: ${c.bgWhite}; border: 1px solid ${c.grid}; border-radius: 9999px; padding: 5px 12px; font-family: ${f.body}; font-size: 13px; font-weight: 600; color: ${c.text}; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: all 0.2s ease; user-select: none; }
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
            /* CHANGED — CE-4c: gemeinsamer Chrome-Kern. Die identischen Tailwind-freien Fallbackregeln fuer
               Wrapper-Rhythmus, Titel, Toolbar, Segmented Controls, Legend-Pill-Interaktion und M/L/S
               existieren jetzt genau einmal unter dem gemeinsamen, nicht-Tailwind Chrome-Anker
               .fw-chart-chrome (ersetzt die vormals fuer Line (CE-3/CE-3b) und Bar (CE-4) identisch
               duplizierten .fw-chart-wrapper--line/--bar-Bloecke). Line und regulärer Bar tragen diesen
               Anker zusaetzlich zu ihrem eigenen Typmarker (fw-chart-wrapper--line/--bar bleibt im DOM,
               wird aber nur noch fuer die Line-BAN-Regeln unten sowie als strukturelle Typidentifikation
               genutzt). Donut/Pie traegt weder Anker noch Typmarker — sein Wrapper bleibt exakt beim
               generischen .fw-chart-wrapper-Fallback oben (unveraendert). Bestehende generische
               Bar-/Donut-Regeln (.fw-btn-group/.fw-toggle/.fw-btn/.fw-toggle-opt inkl. ihrer
               Zone-S-@container-Regeln oben) bleiben unveraendert an ihrer bisherigen Stelle — nach CE-4
               fuer Bar/Line unbenutzt, aber nicht entfernt (kein Scope dieses APs).
               Wrapper-Fallback-Rhythmus (CE-3b-Ursprung): FW_CHROME_WRAPPER_CLASS traegt "flex flex-col
               gap-3", aber auf Tailwind-freien Engine-Testseiten ist das inerter Text -- ohne diese Regel
               kleben Titel/BAN/Toolbar/Legende/Canvas zusammen. gap:12px = Tailwind gap-3 (0.75rem),
               einzige Quelle des vertikalen Rhythmus (keine individuellen Margins re-eingefuehrt).
               Zone-S-Kaskade (CE-3b-Lehre): der Zone-S-Block steht bewusst als eigener, spaeterer Block
               NACH der Basisregel ".fw-chart-chrome .fw-chart-view-group { margin-left: auto; }" — bei
               gleicher Selektorspezifitaet (zwei Klassen) entscheidet die spaetere Quellposition den
               Kaskaden-Tiebreak: "margin-left: 0" gewinnt auf S, "margin-left: auto" auf M/L. Kein
               !important fuer margin-left. */
            .fw-chart-chrome { display: flex; flex-direction: column; gap: 12px; }
            .fw-chart-chrome .fw-chart-title { margin: 0; font-size: 18px; }
            .fw-chart-chrome .fw-chart-toolbar { justify-content: flex-start; margin-bottom: 0; gap: 8px; }
            .fw-chart-chrome .fw-chart-segmented-group { display: inline-flex; border-radius: 6px; background: ${c.bgFaint}; padding: 2px; gap: 2px; }
            .fw-chart-chrome .fw-chart-view-group { margin-left: auto; }
            .fw-chart-chrome .fw-chart-segmented-option { display: inline-block; border: none; border-radius: 4px; padding: 4px 10px; font-family: ${f.body}; font-size: 14px; color: ${c.textSec}; background: transparent; cursor: pointer; transition: color 0.2s ease; }
            .fw-chart-chrome .fw-chart-segmented-option:hover { color: ${c.text}; }
            .fw-chart-chrome .fw-chart-segmented-option[aria-pressed="true"] { background: ${c.bgWhite}; color: ${c.petrol}; font-weight: 600; box-shadow: var(--shadow-soft, 0 4px 20px -2px rgba(39,39,39,0.05)); }
            .fw-chart-chrome .fw-chart-legend { margin-bottom: 0; padding-bottom: 0; border-bottom: none; gap: 8px; }
            /* CHANGED — CE-5d: gemeinsame Legend-Pill-Basisoptik (DOC-04). Die drei folgenden Regeln
               (Basis/Hover/Dot) galten bisher nur fuer Line/regulaeren Bar (.fw-chart-chrome-Anker) --
               jede erhaelt jetzt zusaetzlich den bestehenden .fw-pie-segment-damping-item-Anker als
               zweiten Selektor, ohne einen einzigen Wert zu aendern (reine Wiederverwendung, keine
               Pie-Sonder-Rezeptur). Der Pie-Ghost-Zustand ('.hidden-dataset', 2 Klassen, hoehere
               Spezifitaet als der blosse Pie-Anker) gewinnt weiterhin unveraendert -- deshalb bleibt der
               Hover-Zweig zusaetzlich per ':not(.hidden-dataset)' auf aktive Segmente begrenzt (sonst
               wuerde ein gehoverter Ghost-Eintrag faelschlich aktiv wirken). */
            .fw-chart-chrome .fw-legend-item,
            .fw-pie-segment-damping-item { display: inline-flex; gap: 8px; border: 1px solid ${c.grid}; border-radius: 9999px; padding: 4px 12px; font-size: 14px; font-weight: 400; color: ${c.text}; background-color: ${c.bgWhite}; box-shadow: var(--shadow-soft, 0 4px 20px -2px rgba(39,39,39,0.05)); transition: box-shadow 0.2s ease; }
            .fw-chart-chrome .fw-legend-item:hover,
            .fw-pie-segment-damping-item:not(.hidden-dataset):hover { border-color: ${c.petrol}; color: ${c.petrol}; background-color: ${c.bgFaint}; box-shadow: var(--shadow-hover, 0 10px 25px -5px rgba(39,39,39,0.1)); transform: none; }
            .fw-chart-chrome .fw-legend-item[aria-pressed="false"] { opacity: 0.4; filter: grayscale(1); }
            .fw-chart-chrome .fw-legend-dot,
            .fw-pie-segment-damping-item .fw-legend-dot { border-radius: 9999px; margin-right: 0; }
            @media (prefers-reduced-motion: reduce) {
                .fw-chart-chrome .fw-chart-segmented-option,
                .fw-chart-chrome .fw-legend-item,
                .fw-pie-segment-damping-item { transition: none; }
            }
            @container fw-chart (max-width: 450px) {
                .fw-chart-chrome .fw-chart-toolbar { flex-direction: row !important; align-items: center; padding: 0 !important; gap: 8px !important; }
                .fw-chart-chrome .fw-chart-view-group { margin-left: 0; }
            }
            /* NEW — CE-5c: gemeinsamer Tailwind-freier focus-visible-Fallback fuer alle Chart-Primitiven,
               die denselben spezifischen Chart-Fokus-Vertrag teilen (Baukasten §6.5/§6.11/§8, Visual
               Board "Fokus"): Segmented-Option und Legend-Pill (Line/regulaerer Bar, via .fw-chart-chrome-
               Anker begrenzt) sowie die Pie-Segment-Daempfungs-Pills (via eigenen .fw-pie-segment-damping-
               item-Anker begrenzt). Spiegelt exakt das Tailwind-Literal "focus-visible:outline-none
               focus-visible:ring-2 focus-visible:ring-petrol-500" -- bewusst OHNE Offset-Schatten (anders
               als der allgemeine Button-Vertrag §6.4: der spezifischere Chart-Primitive-Vertrag praezisiert
               ihn hier). c.petrol80 = --color-petrol-500 (CE-5b-Lehre), keine Hexfarbe. Nur waehrend
               :focus-visible aktiv; bei Fokusverlust greifen die bisherigen Ruhe-/Hover-/Ghost-Schatten
               unveraendert (native CSS-Pseudoklasse, kein JS noetig). Ranking-Bar und andere Charttypen
               ohne einen dieser drei Anker bleiben unberuehrt. */
            .fw-chart-chrome .fw-chart-segmented-option:focus-visible,
            .fw-chart-chrome .fw-legend-item:focus-visible,
            .fw-pie-segment-damping-item:focus-visible {
                outline: none;
                box-shadow: 0 0 0 2px ${c.petrol80};
            }
            /* Line-BAN bleibt ausschliesslich unter dem Line-Typmarker (Delta A.3/B.4) — keine Bar-/Pie-Regel
               darf davon erfasst werden. Unveraendert seit CE-3a, nur der Selektor-Anker ist unveraendert
               fw-chart-wrapper--line (kein Chrome-Anker-Bezug noetig, da BAN line-exklusiv bleibt). */
            .fw-chart-wrapper--line .fw-ban-container { min-width: 192px; margin: 0; background-color: ${c.bgFaint}; align-self: flex-start; }
            .fw-chart-wrapper--line .fw-ban-sub { font-size: 14px; margin-top: 0; }
            .fw-chart-wrapper--line .fw-ban-hint { font-size: 14px; }
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