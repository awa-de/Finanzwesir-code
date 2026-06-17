// CHANGED — Slice 5 (war: Slice 3/4)
// app.js — ES-Modul (OA-01: <script type="module">)
// Slice 5: 4-Screen-Flow (Screen-Controller, Button-Navigation, Fokus-Management)

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

// CHANGED — Slice 5: 4-Screen-Flow (war: flache Darstellung Slice 3/4)
function renderContent(container, appData, options, stationsConfig) { // CHANGED — AP-11
  const initialRate = options.defaultRate;
  const startBetrag = options.startBetrag;

  function makeBtn(text, extraClass) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = text;
    btn.className = 'fw-app__btn ' + extraClass;
    return btn;
  }

  // --- Screen 1 — Frage + Slider ---
  const screen1 = document.createElement('section');
  screen1.className = 'fw-app__screen';
  screen1.dataset.fwScreen = '1';

  const h2S1 = document.createElement('h2');
  h2S1.className = 'fw-app__screen-headline';
  h2S1.tabIndex = -1; // fokussierbar via JS, nicht im Tab-Ring
  h2S1.textContent = 'Vor 10 Jahren wäre besser gewesen. Was ist mit heute?';
  screen1.appendChild(h2S1);

  const subline = document.createElement('p');
  subline.className = 'fw-app__screen-subline';
  subline.textContent = 'Wir rechnen nicht mit Wunschwerten. Wir nehmen echte MSCI-World-Monatsdaten.';
  screen1.appendChild(subline);

  // Slider-Sektion (Slice 3 — Q-06: kein for/id wegen Mehrfach-Container)
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
  screen1.appendChild(sliderSection);

  const btnS1Next = makeBtn('Weiter →', 'fw-app__btn--next');
  screen1.appendChild(btnS1Next);

  // --- Screen 2 — Vergangenheit (KpiCards + Chart) ---
  const screen2 = document.createElement('section');
  screen2.className = 'fw-app__screen';
  screen2.dataset.fwScreen = '2';
  screen2.setAttribute('hidden', '');

  const h2S2 = document.createElement('h2');
  h2S2.className = 'fw-app__screen-headline';
  h2S2.tabIndex = -1;
  h2S2.textContent = 'Das wäre kein gerader Weg gewesen. Aber es wäre Marktzeit gewesen.';
  screen2.appendChild(h2S2);

  const kpiArea = document.createElement('div');
  kpiArea.dataset.fwRole = 'kpi-area';
  screen2.appendChild(kpiArea);

  const sublineS2 = document.createElement('p'); // NEW — Slice 6
  sublineS2.className = 'fw-app__screen-subline';
  sublineS2.textContent = 'MSCI World, 10 Jahre, monatliche Kursdaten — historische Entwicklung deines Depots.';
  screen2.appendChild(sublineS2);

  const chartSection2 = document.createElement('div');
  chartSection2.setAttribute('data-fw-appchart', 'sparplan-s2');
  chartSection2.className = 'fw-app__chart-section';
  screen2.appendChild(chartSection2);

  const assumptionsS2 = document.createElement('aside'); // NEW — Slice 6: AssumptionsBox (APP_SPEC §19.8)
  assumptionsS2.className = 'fw-app__assumptions';
  assumptionsS2.textContent = 'Basis: MSCI World Index, monatliche Indexwerte, 10 Jahre rückwärts bis zum letzten vollständig verfügbaren Monat. Die Werte zeigen das Marktprinzip, keine konkrete ETF-Produktempfehlung. Vergangene Wertentwicklungen sind keine Garantie für die Zukunft. Keine Finanzberatung.';
  screen2.appendChild(assumptionsS2);

  const navS2 = document.createElement('div');
  navS2.className = 'fw-app__screen-nav';
  const btnS2Prev = makeBtn('← Zurück', 'fw-app__btn--prev');
  const btnS2Next = makeBtn('Weiter →', 'fw-app__btn--next');
  navS2.appendChild(btnS2Prev);
  navS2.appendChild(btnS2Next);
  screen2.appendChild(navS2);

  // --- Screen 3 — Heute (Chart ohne VertikaleLinie — TODO Slice 6) ---
  const screen3 = document.createElement('section');
  screen3.className = 'fw-app__screen';
  screen3.dataset.fwScreen = '3';
  screen3.setAttribute('hidden', '');

  const h2S3 = document.createElement('h2');
  h2S3.className = 'fw-app__screen-headline';
  h2S3.tabIndex = -1;
  h2S3.textContent = 'Vor 10 Jahren ist weg. Heute nicht.';
  screen3.appendChild(h2S3);

  const sublineS3 = document.createElement('p'); // NEW — Slice 6
  sublineS3.className = 'fw-app__screen-subline';
  sublineS3.textContent = 'Derselbe Verlauf — der Strich markiert den letzten verfügbaren Monat, also heute.';
  screen3.appendChild(sublineS3);

  const chartSection3 = document.createElement('div');
  chartSection3.setAttribute('data-fw-appchart', 'sparplan-s3'); // CHANGED — Slice 6: VertikaleLinie via features
  chartSection3.className = 'fw-app__chart-section';
  screen3.appendChild(chartSection3);

  const assumptionsS3 = document.createElement('aside'); // NEW — Slice 6: AssumptionsBox (APP_SPEC §19.8)
  assumptionsS3.className = 'fw-app__assumptions';
  assumptionsS3.textContent = 'Basis: MSCI World Index, monatliche Indexwerte, 10 Jahre rückwärts bis zum letzten vollständig verfügbaren Monat. Die Werte zeigen das Marktprinzip, keine konkrete ETF-Produktempfehlung. Vergangene Wertentwicklungen sind keine Garantie für die Zukunft. Keine Finanzberatung.';
  screen3.appendChild(assumptionsS3);

  const navS3 = document.createElement('div');
  navS3.className = 'fw-app__screen-nav';
  const btnS3Prev = makeBtn('← Zurück', 'fw-app__btn--prev');
  const btnS3Next = makeBtn('Weiter →', 'fw-app__btn--next');
  navS3.appendChild(btnS3Prev);
  navS3.appendChild(btnS3Next);
  screen3.appendChild(navS3);

  // --- Screen 4 — Entscheidung ---
  const screen4 = document.createElement('section');
  screen4.className = 'fw-app__screen';
  screen4.dataset.fwScreen = '4';
  screen4.setAttribute('hidden', '');

  const h2S4 = document.createElement('h2');
  h2S4.className = 'fw-app__screen-headline';
  h2S4.tabIndex = -1;
  h2S4.textContent = 'Wenn du jetzt wieder wartest, wird heute in zehn Jahren wieder der verpasste Zeitpunkt sein.';
  screen4.appendChild(h2S4);

  const cta = document.createElement('a'); // CHANGED — Slice 6: finales CTA-Styling; href leer (NB-1)
  cta.className = 'fw-app__cta';
  cta.href = '';
  cta.textContent = 'Heute Marktzeit sammeln →';
  screen4.appendChild(cta);

  const navS4 = document.createElement('div');
  navS4.className = 'fw-app__screen-nav';
  const btnS4Prev = makeBtn('← Zurück', 'fw-app__btn--prev');
  navS4.appendChild(btnS4Prev);
  screen4.appendChild(navS4);

  [screen1, screen2, screen3, screen4].forEach(s => container.appendChild(s));

  // ARIA Live Region (APP_SPEC §12.1)
  const a11yRegion = document.createElement('div');
  a11yRegion.setAttribute('aria-live', 'polite');
  a11yRegion.setAttribute('aria-atomic', 'true');
  a11yRegion.dataset.fwRole = 'a11y-result';
  a11yRegion.className = 'fw-app__visually-hidden';
  container.appendChild(a11yRegion);

  // NEW — Chart-Engines lazy je Screen: hidden canvas hat 0px → erst bei Sichtbarkeit rendern
  const chartEngine2 = new ChartEngine();
  const chartEngine3 = new ChartEngine();
  let lastRenderedRateS2 = null;
  let lastRenderedRateS3 = null;

  function renderS2(rate) {
    const ctx = buildAppContext(appData, rate, startBetrag);
    kpiArea.textContent = '';
    renderKpiCards(kpiArea, ctx);
    chartEngine2.renderFromData(chartSection2, ctx.chartSeries, {
      type: 'line', features: { rangeControls: false, headline: false }
    });
    lastRenderedRateS2 = rate;
    lastRenderedRateS3 = null; // Rate geändert → S3 muss neu rendern
    return ctx;
  }

  function renderS3(rate) {
    const { chartSeries } = buildAppContext(appData, rate, startBetrag);
    chartEngine3.renderFromData(chartSection3, chartSeries, {
      type: 'line', features: { rangeControls: false, headline: false, verticalLine: 'last' } // CHANGED — Slice 6
    });
    lastRenderedRateS3 = rate;
  }

  // NEW — Screen-Controller (prefers-reduced-motion: hidden-Toggle ist direkt, kein CSS-Übergang)
  const allScreens = [screen1, screen2, screen3, screen4];

  function showScreen(n, focus) {
    allScreens.forEach((s, i) => {
      if (i + 1 === n) s.removeAttribute('hidden');
      else s.setAttribute('hidden', '');
    });
    if (focus) {
      const h2 = allScreens[n - 1].querySelector('h2');
      if (h2) h2.focus();
    }
    const rate = clamp(parseInt(slider.value, 10), 50, 2000);
    if (n === 2 && rate !== lastRenderedRateS2) {
      const ctx = renderS2(rate);
      a11yRegion.textContent = ctx.a11ySummary;
    }
    if (n === 3 && rate !== lastRenderedRateS3) renderS3(rate);
  }

  // NEW — Button-Wiring
  btnS1Next.addEventListener('click', () => showScreen(2, true));
  btnS2Prev.addEventListener('click', () => showScreen(1, true));
  btnS2Next.addEventListener('click', () => showScreen(3, true));
  btnS3Prev.addEventListener('click', () => showScreen(2, true));
  btnS3Next.addEventListener('click', () => showScreen(4, true));
  btnS4Prev.addEventListener('click', () => showScreen(3, true));

  // Slider-Events: kein live Chart-Update (Chart auf Screen 2, Slider auf Screen 1)
  slider.addEventListener('input', () => {
    const rate = clamp(parseInt(slider.value, 10), 50, 2000);
    slider.setAttribute('aria-valuenow', String(rate));
    slider.setAttribute('aria-valuetext', rate + ' Euro pro Monat');
    valueDisplay.textContent = rate + ' €/Monat';
    lastRenderedRateS2 = null; // Invalidiert für nächsten Screen-2-Besuch
    lastRenderedRateS3 = null;
  });

  slider.addEventListener('change', () => {
    const rate = clamp(parseInt(slider.value, 10), 50, 2000);
    const ctx = buildAppContext(appData, rate, startBetrag);
    a11yRegion.textContent = ctx.a11ySummary; // Update nach Release (kein Screenreader-Spam)
  });

  // Initiale Anzeige: Screen 1, kein Focus-Steal beim Laden
  showScreen(1, false);
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

// NEW — AP-11: Stations-JSON app-spezifisch laden
async function loadStations() {
  try {
    const response = await fetch('config/stations.de.json');
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const stationsConfig = JSON.parse(await response.text());
    return { stationsConfig };
  } catch (e) {
    console.error('[fw-app] loadStations error:', e);
    return { error: 'd', message: 'Die Zeitreise kann gerade nicht geladen werden.' };
  }
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
    const [csvResult, stationsResult] = await Promise.all([  // CHANGED — AP-11
      loadData(dataUrl),
      loadStations()
    ]);

    clearContainer(container);

    if (csvResult.error === 'empty') {
      setState(container, 'empty');
      renderError(container, csvResult.message);
    } else if (csvResult.error) {
      setState(container, 'error');
      renderError(container, csvResult.message);
    } else if (stationsResult.error) {                       // NEW — AP-11
      setState(container, 'error');
      renderError(container, stationsResult.message);
    } else {
      setState(container, 'content');
      const rawOptions = (container.dataset.fwOptions || '').trim();
      const options    = parseOptions(rawOptions);
      renderContent(container, csvResult.appData, options, stationsResult.stationsConfig); // CHANGED — AP-11
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
