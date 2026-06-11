// CHANGED — Slice 3 (war: Slice 2)
// app.js — ES-Modul (OA-01: <script type="module">)
// Slice 3: Slider + Options-Parsing + Live-Neuberechnung

import { CSVParser } from '../../Theme/assets/js/fw-chart-engine/data/CSVParser.js';
import { ChartEngine } from '../../Theme/assets/js/fw-chart-engine/core/ChartEngine.js'; // NEW — Slice 4

// SLUG_WHITELIST: Kompilzeit-Konstante — bewusst keine dynamische Quelle
const SLUG_WHITELIST = ['prokrastinations-preis'];

// NEW — Fetch-Dedup-Cache: verhindert parallele Mehrfach-Requests für dieselbe URL (P-11)
const _dataCache = new Map();

function validateSlug(slug) {
  return typeof slug === 'string' && SLUG_WHITELIST.includes(slug.trim());
}

function clearContainer(container) {
  container.textContent = ''; // entfernt alle Kindelemente (SafeDOM — kein innerHTML)
}

function setState(container, state) {
  container.dataset.fwState = state;
  // Erlaubte Werte: 'loading' | 'content' | 'error' | 'empty'
}

function renderLoading(container) {
  const p = document.createElement('p');
  p.setAttribute('role', 'status');
  p.textContent = 'Daten werden geladen …';
  container.appendChild(p);
}

function renderError(container, message) {
  const p = document.createElement('p');
  p.textContent = message; // SafeDOM: textContent, niemals innerHTML (Q-01)
  container.appendChild(p);
}

// NEW — Clamp-Helfer für Two-Step-Parsing (APP_SPEC §5.3)
function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

// NEW — data-fw-options Parsing: Whitelist defaultRate + startBetrag (APP_SPEC §9, Q-02)
function parseOptions(raw) {
  const opts = { defaultRate: 300, startBetrag: 0 };
  if (!raw || typeof raw !== 'string') return opts;
  raw.split(',').forEach(pair => {
    const idx = pair.indexOf(':');
    if (idx < 0) return;
    const key = pair.slice(0, idx).trim();
    const val = pair.slice(idx + 1).trim();
    if (key === 'defaultRate') {
      const n = parseInt(val, 10);
      opts.defaultRate = Number.isFinite(n) ? clamp(n, 50, 2000) : 300;
    } else if (key === 'startBetrag') {
      const n = parseInt(val, 10);
      opts.startBetrag = Number.isFinite(n) ? clamp(n, 0, 50000) : 0;
    }
    // unbekannte Keys: stillschweigend ignoriert (Q-02)
  });
  return opts;
}

// NEW — Anteilslogik (B-02, APP_SPEC §7.10, §13 Schritt 4). Keine Formatierung — nur Zahlen.
function marketTimeStrategy(msciData, monatlicheRate, startBetrag) {
  let anteile = startBetrag / msciData[0].indexValue;
  const chartSeries = msciData.map(p => {
    anteile += monatlicheRate / p.indexValue;
    return { month: p.date.slice(0, 7), depotwert: anteile * p.indexValue };
  });
  const eingezahlt     = monatlicheRate * 120 + startBetrag;
  const depotwertHeute = chartSeries[119].depotwert;
  const differenz      = depotwertHeute - eingezahlt;
  return { chartSeries, eingezahlt, depotwertHeute, differenz };
}

// NEW — AppContext aus appData + Nutzerwerten (APP_SPEC §11)
function buildAppContext(appData, monatlicheRate, startBetrag) {
  const fmt = new Intl.NumberFormat(appData.locale, {
    style: 'currency', currency: appData.currency, maximumFractionDigits: 0
  });
  const { chartSeries, eingezahlt, depotwertHeute, differenz } =
    marketTimeStrategy(appData.msciData, monatlicheRate, startBetrag);
  return {
    valueMode:    'currency',
    currency:     appData.currency,
    locale:       appData.locale,
    periodMonths: appData.periodMonths,
    msciData:     appData.msciData,
    latestMonth:  appData.latestMonth,
    startMonth:   appData.startMonth,
    monatlicheRate,
    startBetrag,
    chartSeries,
    eingezahlt,
    depotwertHeute,
    differenz,
    resultTone:  'neutral',
    a11ySummary: `Wer vor 10 Jahren ${monatlicheRate} € monatlich investiert hätte, hätte heute ${fmt.format(depotwertHeute)} — bei ${fmt.format(eingezahlt)} eingezahlt.`
  };
}

// NEW — KpiCards (APP_SPEC §6, §12.4) via textContent (Q-01)
function renderKpiCards(container, appContext) {
  const fmt = new Intl.NumberFormat(appContext.locale, {
    style: 'currency', currency: appContext.currency, maximumFractionDigits: 0
  });
  const differenzFormatted = appContext.differenz >= 0
    ? '+' + fmt.format(appContext.differenz)
    : fmt.format(appContext.differenz); // Intl enthält Minuszeichen bei negativem Wert

  const dl = document.createElement('dl');
  dl.className = 'fw-app__kpi-cards';

  [
    { label: 'Eingezahlt',       value: fmt.format(appContext.eingezahlt),     key: 'eingezahlt' },
    { label: 'Depotwert heute',  value: fmt.format(appContext.depotwertHeute), key: 'depotwertHeute' },
    { label: 'Gewinn / Verlust', value: differenzFormatted,                    key: 'differenz' }
  ].forEach(({ label, value, key }) => {
    const div = document.createElement('div');
    div.className = 'fw-app__kpi-card';
    div.dataset.kpi = key;

    const dt = document.createElement('dt');
    dt.textContent = label;

    const dd = document.createElement('dd');
    dd.textContent = value;

    div.appendChild(dt);
    div.appendChild(dd);
    dl.appendChild(div);
  });

  container.appendChild(dl);
}

// CHANGED — Slice 3: Slider + Options-Parsing + Live-Neuberechnung (renderA11yRegion entfernt — inline)
function renderContent(container, appData, options) {
  const initialRate = options.defaultRate;
  const startBetrag = options.startBetrag;

  // Slider-Sektion — wrapping label (Q-06: kein for/id wegen Mehrfach-Container)
  const sliderSection = document.createElement('div');
  sliderSection.className = 'fw-app__slider-section';

  const label = document.createElement('label');
  label.className = 'fw-app__slider-label';

  const labelText = document.createElement('span');
  labelText.className = 'fw-app__slider-label-text';
  labelText.textContent = 'Ich spare monatlich';

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.className = 'fw-app__slider';
  slider.min = '50';
  slider.max = '2000';
  slider.step = '50';
  slider.value = String(initialRate);
  slider.setAttribute('role', 'slider');
  slider.setAttribute('aria-valuemin', '50');
  slider.setAttribute('aria-valuemax', '2000');
  slider.setAttribute('aria-valuenow', String(initialRate));
  slider.setAttribute('aria-valuetext', initialRate + ' Euro pro Monat');

  const valueDisplay = document.createElement('span');
  valueDisplay.className = 'fw-app__slider-value';
  valueDisplay.setAttribute('aria-hidden', 'true');
  valueDisplay.textContent = initialRate + ' €/Monat';

  label.appendChild(labelText);
  label.appendChild(slider);
  label.appendChild(valueDisplay);
  sliderSection.appendChild(label);
  container.appendChild(sliderSection);

  // KPI-Bereich
  const kpiArea = document.createElement('div');
  kpiArea.dataset.fwRole = 'kpi-area';
  container.appendChild(kpiArea);

  // NEW — Slice 4: Chart-Engine-Instanz und dynamischer Chart-Container
  const chartEngine = new ChartEngine();

  const chartSection = document.createElement('div');
  chartSection.setAttribute('data-fw-appchart', 'sparplan');
  chartSection.className = 'fw-app__chart-section';
  container.appendChild(chartSection);

  // ARIA Live Region (APP_SPEC §12.1) — Update nur bei change, nicht bei jedem input-Tick
  const a11yRegion = document.createElement('div');
  a11yRegion.setAttribute('aria-live', 'polite');
  a11yRegion.setAttribute('aria-atomic', 'true');
  a11yRegion.dataset.fwRole = 'a11y-result';
  a11yRegion.className = 'fw-app__visually-hidden';
  container.appendChild(a11yRegion);

  // Initiale Darstellung
  function updateKpiCards(rate) {
    const ctx = buildAppContext(appData, rate, startBetrag);
    kpiArea.textContent = ''; // SafeDOM: Container leeren (kein innerHTML)
    renderKpiCards(kpiArea, ctx);
    return ctx;
  }

  const initCtx = updateKpiCards(initialRate);
  a11yRegion.textContent = initCtx.a11ySummary;
  chartEngine.renderFromData(chartSection, initCtx.chartSeries, {  // NEW — Slice 4: Initial Chart
    type: 'line',
    features: {
      rangeControls: false,
      headline: false
    }
  });

  // Perf-NB (NB-5): synchrone Neuberechnung auf jedem Tick — für Pilot ok; In-place-dd-Update bei Bedarf (Slice 7)
  slider.addEventListener('input', () => {
    const rate = clamp(parseInt(slider.value, 10), 50, 2000);
    slider.setAttribute('aria-valuenow', String(rate));
    slider.setAttribute('aria-valuetext', rate + ' Euro pro Monat');
    valueDisplay.textContent = rate + ' €/Monat';
    const ctx = updateKpiCards(rate);                                   // CHANGED — Slice 4: Rückgabewert nutzen
    chartEngine.renderFromData(chartSection, ctx.chartSeries, {         // NEW — Slice 4: Chart aktualisieren
      type: 'line',
      features: { rangeControls: false, headline: false }
    });
  });

  // change: Live Region nach Slider-Release — kein Screenreader-Spam (APP_SPEC §12.1)
  slider.addEventListener('change', () => {
    const rate = clamp(parseInt(slider.value, 10), 50, 2000);
    const ctx = buildAppContext(appData, rate, startBetrag);
    a11yRegion.textContent = ctx.a11ySummary;
  });
}

// gibt { appData } bei Erfolg oder { error: 'b'|'c'|'empty', message } zurück
async function loadData(url) { // CHANGED — dünne Cache-Shell; Logik in _loadDataImpl (P-11)
  if (!url) {
    return { error: 'b', message: 'Daten konnten nicht geladen werden. Bitte Seite neu laden.' };
  }
  if (!_dataCache.has(url)) _dataCache.set(url, _loadDataImpl(url)); // NEW
  return _dataCache.get(url);                                         // NEW
}

// NEW — bisheriger loadData-Body (Logik unverändert)
async function _loadDataImpl(url) {
  let fwData;
  try {
    const parser = new CSVParser();
    fwData = await parser.parse(url);
  } catch (e) {
    console.error('[fw-app] loadData parse error:', e);
    return { error: 'b', message: 'Daten konnten nicht geladen werden. Bitte Seite neu laden.' };
  }

  // unitKey-Prüfung: CSV muss EUR-Daten enthalten (B-01-B, APP_SPEC §10)
  if (fwData.metadata.unitKey !== 'CURRENCY_EUR') {
    return { error: 'c', message: 'Datenreihe hat keine oder ungültige Währungsangabe. Erwartet: EUR.' };
  }

  // Pflichtfelder und Mindestlänge prüfen (APP_SPEC §10 Empty-State)
  const rows = fwData.rows;
  const hasRequiredColumns = rows.length > 0 && // CHANGED — rows[0]-Zugriff abgesichert
    Object.prototype.hasOwnProperty.call(rows[0], 'index_value');

  if (rows.length < 120 || !hasRequiredColumns) {
    return { error: 'empty', message: 'Nicht genug Daten für die Berechnung. Bitte Datenquelle prüfen.' };
  }

  const last120 = rows.slice(-120);

  const hasInvalidRows = last120.some(row => // NEW — Wächter gegen null/NaN/0/nicht-endlich
    !(row.date instanceof Date) ||
    !Number.isFinite(row.index_value) ||
    row.index_value <= 0
  );
  if (hasInvalidRows) {
    return { error: 'empty', message: 'Nicht genug Daten für die Berechnung. Bitte Datenquelle prüfen.' };
  }
  const msciData = last120.map(row => {
    const d   = row.date; // Date-Objekt aus CSVParser
    const y   = d.getFullYear();
    const mon = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return Object.freeze({
      date:       y + '-' + mon + '-' + day, // 'YYYY-MM-DD'
      indexValue: row.index_value            // snake_case → camelCase (→ §13)
    });
  });

  const latestMonth = msciData[119].date.slice(0, 7);
  const startMonth  = msciData[0].date.slice(0, 7);

  const appData = Object.freeze({
    currency:     'EUR',
    locale:       'de-DE',
    periodMonths: 120,
    msciData:     Object.freeze(msciData),
    latestMonth,
    startMonth
  });

  return { appData };
}

async function initApp(container, slug) {
  try {
    setState(container, 'loading');

    if (!validateSlug(slug)) {
      setState(container, 'error');
      renderError(container, 'Diese App konnte nicht geladen werden.');
      return;
    }

    renderLoading(container);

    const dataUrl = (container.dataset.fwData || '').trim();
    const result  = await loadData(dataUrl);

    clearContainer(container);

    if (result.error === 'empty') {
      setState(container, 'empty');
      renderError(container, result.message);
    } else if (result.error) {
      setState(container, 'error');
      renderError(container, result.message);
    } else {
      setState(container, 'content');
      const rawOptions = (container.dataset.fwOptions || '').trim(); // NEW
      const options    = parseOptions(rawOptions);                    // NEW
      renderContent(container, result.appData, options);              // CHANGED
    }

  } catch (e) {
    // Stack-Trace nur in Konsole — niemals im UI ausgeben
    console.error('[fw-app] initApp error:', e);
    clearContainer(container);
    setState(container, 'error');
    renderError(container, 'Diese App konnte nicht geladen werden.');
  }
}

function bootstrap() {
  const containers = document.querySelectorAll('.fw-app');
  if (containers.length === 0) {
    console.warn('[fw-app] Kein .fw-app-Container gefunden.');
    return;
  }
  containers.forEach(container => {
    // Guard: verhindert doppelte Initialisierung (z.B. Ghost Code Injection + Theme)
    if (container.dataset.fwInitialized === 'true') return;
    container.dataset.fwInitialized = 'true';

    const slug = (container.dataset.fwApp || '').trim();
    initApp(container, slug);
  });
}

// ES-Modul: defer by default — DOMContentLoaded ist dennoch sicherer gegen Race Conditions
document.addEventListener('DOMContentLoaded', bootstrap);
