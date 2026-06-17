// CHANGED — Slice 5 (war: Slice 3/4)
// app.js — ES-Modul (OA-01: <script type="module">)
// Slice 5: 4-Screen-Flow (Screen-Controller, Button-Navigation, Fokus-Management)

import { CSVParser } from '../../Theme/assets/js/fw-chart-engine/data/CSVParser.js';
import { ChartEngine } from '../../Theme/assets/js/fw-chart-engine/core/ChartEngine.js'; // NEW — Slice 4

// SLUG_WHITELIST: Kompilzeit-Konstante — bewusst keine dynamische Quelle
const SLUG_WHITELIST = ['prokrastinations-preis'];

// NEW — Fetch-Dedup-Cache: verhindert parallele Mehrfach-Requests für dieselbe URL (P-11)
const _dataCache = new Map();

// NEW — AP-12: Contract-Konstanten für Stations-JSON-Validator
const _VALID_STATUS        = ['core', 'supporting', 'optional', 'archival', 'final'];
const _VALID_ROLE          = ['shock', 'doubt', 'crisis', 'relief', 'geopolitical_shock', 'late_wobble', 'final_reveal'];
const _VALID_SOURCE_STATUS = ['primary_verified', 'secondary_verified', 'source_claimed_unchecked', 'derived_from_app_data'];
const _VALID_MOBILE_FIELDS = ['paidIn', 'portfolioValueAtStation'];
const _CALC_VALUE_KEYS     = ['paidIn', 'portfolioValue', 'return', 'performance', 'gain', 'drawdown', 'finalValue'];

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
function buildAppContext(appData, monatlicheRate, startBetrag, stations) { // CHANGED — AP-13
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
    activeWindow: appData.activeWindow,  // NEW — AP-13
    stations:     stations || [],        // NEW — AP-13
    monatlicheRate,
    startBetrag,
    chartSeries,
    eingezahlt,
    depotwertHeute,
    differenz,
    resultTone:  'neutral'
    // a11ySummary entfernt — AP-14: endwissen erst in showScreen(3) ausgeben
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

// NEW — AP-14: Prioritätsauswahl — Dramaturgie-Pflichtspots (crisis, falseResolution, late_wobble)
// reservieren, Rest nach Priority auffüllen, Ergebnis date_asc sortieren
function selectStationsForJourney(filteredStations, maxVisible) {
  if (filteredStations.length <= maxVisible)
    return filteredStations.slice().sort((a, b) => a.date < b.date ? -1 : 1);

  const crisisStation  = filteredStations.reduce((best, s) =>
    s.role === 'crisis' && (!best || s.priority > best.priority) ? s : best, null);
  const falseResStation = filteredStations.find(s => s.flags && s.flags.falseResolution) || null;
  const lateWobble     = filteredStations
    .filter(s => s.role === 'late_wobble')
    .sort((a, b) => a.date > b.date ? -1 : 1)[0] || null;

  const reservedIds = new Set(
    [crisisStation, falseResStation, lateWobble].filter(Boolean).map(s => s.id)
  );
  const reserved  = filteredStations.filter(s =>  reservedIds.has(s.id));
  const remaining = filteredStations
    .filter(s => !reservedIds.has(s.id))
    .sort((a, b) => b.priority - a.priority);

  const freeSlots = Math.max(0, maxVisible - reserved.length);
  return [...reserved, ...remaining.slice(0, freeSlots)]
    .sort((a, b) => a.date < b.date ? -1 : 1);
}

// NEW — AP-14: Gate A prüfen (G-A01, G-A05) — gibt GateOK oder EditorialDegraded
function checkEditorialGate(selectedStations, finalReveal, selectionPolicy) {
  const diagnose  = [];
  const gateConf  = selectionPolicy.editorialGate || {};
  const minCrisis = gateConf.minCrisisPriority || 95;
  if (!selectedStations.some(s => s.role === 'crisis' && s.priority >= minCrisis))
    diagnose.push('G-A01: Keine crisis-Station mit priority >= ' + minCrisis + ' im aktiven Fenster');
  if (!finalReveal)
    diagnose.push('G-A05: Kein Final-Reveal-Template (dynamic_latest_month) gefunden');
  const minVisible = selectionPolicy.minVisibleStations || 5;
  if (selectedStations.length < minVisible)
    diagnose.push('Zu wenige sichtbare Stationen: ' + selectedStations.length + ' < ' + minVisible);
  return diagnose.length === 0
    ? { status: 'GateOK',          diagnose: [] }
    : { status: 'EditorialDegraded', diagnose };
}

// NEW — AP-14: Chart bis zur Stations-Monat trimmen (visibleChartSeries — kein Endwissen)
function buildVisibleChartSeries(chartSeries, stationMonth) {
  return chartSeries.filter(p => p.month <= stationMonth);
}

// NEW — AP-14: Zwischenstand aus Sparplanberechnung (keine Zahlenwerte aus JSON)
function calcStationIntermediate(chartSeries, stationMonth, monatlicheRate, startBetrag) {
  const idx = chartSeries.findIndex(p => p.month === stationMonth);
  if (idx < 0) return { paidIn: 0, portfolioValueAtStation: 0 };
  return {
    paidIn:                  monatlicheRate * (idx + 1) + startBetrag,
    portfolioValueAtStation: chartSeries[idx].depotwert
  };
}

// NEW — AP-14: Station-Card rendern (SafeDOM: textContent — Q-01, kein innerHTML)
function renderStationCard(container, station, stationIntermediate, fmt) {
  container.textContent = ''; // vorherige Station sauber ersetzen

  const sourceLabel = document.createElement('p');
  sourceLabel.className = 'fw-app__station-source-label';
  sourceLabel.textContent = station.sourceLabel;
  container.appendChild(sourceLabel);

  const headline = document.createElement('h3');
  headline.className = 'fw-app__station-headline';
  headline.tabIndex = -1; // fokussierbar via JS (APP_SPEC §14.5 Fokusführung)
  headline.textContent = station.headline;
  container.appendChild(headline);

  const anchor = document.createElement('p');
  anchor.className = 'fw-app__station-anchor';
  anchor.textContent = station.anchorText;
  container.appendChild(anchor);

  // Collapsible Zwischenstand (APP_SPEC §14.5, visualRules.stationValueMobile = collapsible)
  const collapsibleId  = 'fw-collapsible-' + station.id;
  const collapsibleWrap = document.createElement('div');
  collapsibleWrap.className = 'fw-app__collapsible';

  const trigger = document.createElement('button');
  trigger.type  = 'button';
  trigger.className = 'fw-app__collapsible-trigger';
  trigger.textContent = station.mobileIntermediate.label;
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', collapsibleId);

  const content = document.createElement('div');
  content.id        = collapsibleId;
  content.className = 'fw-app__collapsible-content';
  content.setAttribute('hidden', '');

  const dl = document.createElement('dl');
  dl.className = 'fw-app__intermediate-values';

  [
    { label: 'Eingezahlt',       value: fmt.format(stationIntermediate.paidIn) },
    { label: 'Depotwert damals', value: fmt.format(stationIntermediate.portfolioValueAtStation) }
  ].forEach(({ label, value }) => {
    const div = document.createElement('div');
    const dt  = document.createElement('dt');
    dt.textContent = label;
    const dd  = document.createElement('dd');
    dd.textContent = value;
    div.appendChild(dt);
    div.appendChild(dd);
    dl.appendChild(div);
  });

  content.appendChild(dl);
  collapsibleWrap.appendChild(trigger);
  collapsibleWrap.appendChild(content);
  container.appendChild(collapsibleWrap);

  trigger.addEventListener('click', () => {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!isOpen));
    trigger.textContent = !isOpen ? 'Zwischenstand ausblenden' : station.mobileIntermediate.label;
    if (!isOpen) content.removeAttribute('hidden');
    else         content.setAttribute('hidden', '');
  });
}

// CHANGED — Slice 5: 4-Screen-Flow (war: flache Darstellung Slice 3/4)
function renderContent(container, appData, options, stationsConfig) { // CHANGED — AP-11
  const journeyStations = buildJourneyStations(stationsConfig, appData.activeWindow); // NEW — AP-13
  const initialRate = options.defaultRate;
  const startBetrag = options.startBetrag;
  let activeStationIndex = 0; // NEW — AP-14: Zeitreise-Zustand
  let currentRate = initialRate; // NEW — AP-14: Rate wird bei S1→S2 eingefroren

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

  const btnS1Next = makeBtn('10 Jahre zurückspringen', 'fw-app__btn--next'); // CHANGED — AP-14 (war: 'Weiter →')
  screen1.appendChild(btnS1Next);

  // --- Screen 2 — Stationen-Zeitreise (CHANGED — AP-14: war KpiCards + Chart) ---
  const screen2 = document.createElement('section');
  screen2.className = 'fw-app__screen';
  screen2.dataset.fwScreen = '2';
  screen2.setAttribute('hidden', '');

  const h2S2 = document.createElement('h2');
  h2S2.className = 'fw-app__screen-headline';
  h2S2.tabIndex = -1;
  h2S2.textContent = 'Im Rückblick sieht es klar aus. In Echtzeit war es eine Entscheidung.'; // CHANGED — AP-14
  screen2.appendChild(h2S2);

  const stationArea = document.createElement('div'); // NEW — AP-14: Station-Card Container
  stationArea.className = 'fw-app__station-area';
  screen2.appendChild(stationArea);

  const chartSection2 = document.createElement('div'); // CHANGED — AP-14: nur visibleChartSeries
  chartSection2.setAttribute('data-fw-appchart', 'sparplan-s2');
  chartSection2.className = 'fw-app__chart-section';
  screen2.appendChild(chartSection2);

  const journeyBtn = makeBtn('', 'fw-app__btn--journey'); // NEW — AP-14: Text wird in renderJourneyStep gesetzt
  screen2.appendChild(journeyBtn);

  // --- Screen 3 — Heute (Chart ohne VertikaleLinie — TODO Slice 6) ---
  const screen3 = document.createElement('section');
  screen3.className = 'fw-app__screen';
  screen3.dataset.fwScreen = '3';
  screen3.setAttribute('hidden', '');

  const h2S3 = document.createElement('h2');
  h2S3.className = 'fw-app__screen-headline';
  h2S3.tabIndex = -1;
  h2S3.textContent = 'Jetzt erst sieht es einfach aus.'; // CHANGED — AP-14 (APP_SPEC §16.2; war: 'Vor 10 Jahren ist weg. Heute nicht.')
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

  // CHANGED — AP-14: Chart-Engines; lastRenderedRateS2 entfernt (orphaned by AP-14)
  const chartEngine2 = new ChartEngine();
  const chartEngine3 = new ChartEngine();
  let lastRenderedRateS3 = null;

  // NEW — AP-14: Zeitreise-Schritt rendern (ersetzt renderS2)
  // Kein Endwissen: nur Stations-Daten bis stationMonth sichtbar (APP_SPEC §14.1)
  function renderJourneyStep(stationIdx) {
    const station     = journeyStations[stationIdx];
    const stationMonth = station.date.slice(0, 7); // 'YYYY-MM'
    const ctx         = buildAppContext(appData, currentRate, startBetrag, journeyStations);
    const fmtStation  = new Intl.NumberFormat(appData.locale, {
      style: 'currency', currency: 'EUR', maximumFractionDigits: 0
    });
    const intermediate = calcStationIntermediate(ctx.chartSeries, stationMonth, currentRate, startBetrag);
    renderStationCard(stationArea, station, intermediate, fmtStation);
    const visibleSeries = buildVisibleChartSeries(ctx.chartSeries, stationMonth);
    chartEngine2.renderFromData(chartSection2, visibleSeries, {
      type: 'line', features: { rangeControls: false, headline: false }
    });
    journeyBtn.textContent = station.continueLabel || 'Weiter';
    a11yRegion.textContent = station.headline; // stationLiveMessage — kein Endwissen (APP_SPEC §14.1)
  }

  function renderS3(rate) {
    const ctx = buildAppContext(appData, rate, startBetrag, journeyStations); // CHANGED — AP-13
    chartEngine3.renderFromData(chartSection3, ctx.chartSeries, {
      type: 'line', features: { rangeControls: false, headline: false, verticalLine: 'last' }
    });
    lastRenderedRateS3 = rate;
    return ctx; // CHANGED — AP-14: ctx für revealA11ySummary in showScreen(3)
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
    if (n === 2) renderJourneyStep(activeStationIndex); // CHANGED — AP-14 (war: rate-basiertes renderS2)
    if (n === 3 && currentRate !== lastRenderedRateS3) {
      const ctx = renderS3(currentRate);
      // ERST HIER: erstes Endwissen für Screenreader (APP_SPEC §14.1 revealA11ySummary)
      const fmtReveal = new Intl.NumberFormat(appData.locale, {
        style: 'currency', currency: 'EUR', maximumFractionDigits: 0
      });
      a11yRegion.textContent = `Wer vor 10 Jahren ${currentRate} € monatlich investiert hätte, hätte heute ${fmtReveal.format(ctx.depotwertHeute)} — bei ${fmtReveal.format(ctx.eingezahlt)} eingezahlt.`;
    }
  }

  // CHANGED — AP-14: Button-Wiring (btnS2Prev / btnS2Next entfernt — Screen 2 hat kein NavPanel)
  btnS1Next.addEventListener('click', () => {
    activeStationIndex = 0; // Zeitreise immer von vorne starten
    currentRate = clamp(parseInt(slider.value, 10), 50, 2000); // Rate einfrieren
    showScreen(2, true);
  });
  btnS3Prev.addEventListener('click', () => showScreen(2, true));
  btnS3Next.addEventListener('click', () => showScreen(4, true));
  btnS4Prev.addEventListener('click', () => showScreen(3, true));

  // NEW — AP-14: Journey-Button (nächste Station oder Finale-Reveal → S3)
  journeyBtn.addEventListener('click', () => {
    const isLast = activeStationIndex === journeyStations.length - 1;
    if (isLast) {
      showScreen(3, true);
    } else {
      activeStationIndex++;
      renderJourneyStep(activeStationIndex);
      const h2 = screen2.querySelector('h2');
      if (h2) h2.focus();
    }
  });

  // Slider-Events: kein live Chart-Update (Chart auf Screen 2, Slider auf Screen 1)
  slider.addEventListener('input', () => {
    const rate = clamp(parseInt(slider.value, 10), 50, 2000);
    slider.setAttribute('aria-valuenow', String(rate));
    slider.setAttribute('aria-valuetext', rate + ' Euro pro Monat');
    valueDisplay.textContent = rate + ' €/Monat';
    lastRenderedRateS3 = null; // Invalidiert für nächsten S3-Besuch
    // currentRate wird erst bei btnS1Next eingefroren — kein Update hier
  });
  // slider.change entfernt — AP-14: war Endwissens-Leak via a11yRegion (APP_SPEC §14.1)

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

  const activeWindow = buildActiveJourneyWindow(msciData); // NEW — AP-13
  const { latestMonth, startMonth } = activeWindow;

  const appData = Object.freeze({
    currency:     'EUR',
    locale:       'de-DE',
    periodMonths: 120,
    msciData:     Object.freeze(msciData),
    latestMonth,
    startMonth,
    activeWindow: Object.freeze(activeWindow) // NEW — AP-13
  });

  return { appData };
}

// NEW — AP-12: Stations-JSON gegen STATIONS_CONFIG_CONTRACT.md validieren
// Gibt { ok: true } oder { ok: false, code, detail } zurück — kein Wurf.
function validateStationsJson(json) {
  if (typeof json !== 'object' || json === null || Array.isArray(json))
    return { ok: false, code: 'invalid_structure', detail: 'root is not an object' };

  if (json.version !== '2.1')
    return { ok: false, code: 'invalid_value', detail: 'version: expected "2.1", got: ' + json.version };
  if (json.locale !== 'de-DE')
    return { ok: false, code: 'invalid_value', detail: 'locale: expected "de-DE", got: ' + json.locale };
  if (json.app !== 'prokrastinations-preis')
    return { ok: false, code: 'invalid_value', detail: 'app: expected "prokrastinations-preis", got: ' + json.app };

  if (typeof json.selectionPolicy !== 'object' || json.selectionPolicy === null || Array.isArray(json.selectionPolicy))
    return { ok: false, code: 'missing_field', detail: 'selectionPolicy' };

  if (typeof json.visualRules !== 'object' || json.visualRules === null || Array.isArray(json.visualRules))
    return { ok: false, code: 'missing_field', detail: 'visualRules' };
  const vr = json.visualRules;
  if (vr.redCrashColor !== false)
    return { ok: false, code: 'no_red_violation', detail: 'visualRules.redCrashColor must be false' };
  if (vr.lossColoring !== false)
    return { ok: false, code: 'no_red_violation', detail: 'visualRules.lossColoring must be false' };
  if (vr.crashSegmentColoring !== false)
    return { ok: false, code: 'no_red_violation', detail: 'visualRules.crashSegmentColoring must be false' };
  if (vr.futurePreview !== false)
    return { ok: false, code: 'invalid_value', detail: 'visualRules.futurePreview must be false' };
  if (vr.stationValueMobile !== 'collapsible')
    return { ok: false, code: 'invalid_value', detail: 'visualRules.stationValueMobile must be "collapsible"' };

  if (typeof json.motionRules !== 'object' || json.motionRules === null || Array.isArray(json.motionRules))
    return { ok: false, code: 'missing_field', detail: 'motionRules' };
  if (json.motionRules.mode !== 'user_stepped')
    return { ok: false, code: 'invalid_value', detail: 'motionRules.mode must be "user_stepped"' };

  if (!Array.isArray(json.stations) || json.stations.length < 1)
    return { ok: false, code: 'missing_field', detail: 'stations (array, min length 1)' };

  let dynamicLatestCount = 0;
  const _STR_FIELDS = ['id', 'headline', 'sourceLabel', 'sourceUrl', 'anchorText', 'continueLabel'];

  for (let i = 0; i < json.stations.length; i++) {
    const s = json.stations[i];
    const p = 'station[' + i + ']';

    for (const f of _STR_FIELDS) {
      if (typeof s[f] !== 'string')
        return { ok: false, code: 'missing_field', detail: p + '.' + f };
    }

    if (typeof s.date !== 'string')
      return { ok: false, code: 'missing_field', detail: p + '.date' };
    if (s.date === 'dynamic_latest_month') {
      dynamicLatestCount++;
      if (s.role !== 'final_reveal')
        return { ok: false, code: 'invalid_value', detail: p + '.date: dynamic_latest_month only allowed for role=final_reveal' };
    } else if (!/^\d{4}-\d{2}$/.test(s.date)) {
      return { ok: false, code: 'invalid_value', detail: p + '.date: expected YYYY-MM or dynamic_latest_month, got: ' + s.date };
    }

    if (typeof s.priority !== 'number')
      return { ok: false, code: 'missing_field', detail: p + '.priority' };

    if (!_VALID_STATUS.includes(s.status))
      return { ok: false, code: 'invalid_enum', detail: p + '.status: ' + s.status };
    if (!_VALID_ROLE.includes(s.role))
      return { ok: false, code: 'invalid_enum', detail: p + '.role: ' + s.role };
    if (!_VALID_SOURCE_STATUS.includes(s.sourceStatus))
      return { ok: false, code: 'invalid_enum', detail: p + '.sourceStatus: ' + s.sourceStatus };

    if (typeof s.mobileIntermediate !== 'object' || s.mobileIntermediate === null || Array.isArray(s.mobileIntermediate))
      return { ok: false, code: 'missing_field', detail: p + '.mobileIntermediate' };
    if (typeof s.mobileIntermediate.label !== 'string')
      return { ok: false, code: 'missing_field', detail: p + '.mobileIntermediate.label' };
    if (!Array.isArray(s.mobileIntermediate.fields))
      return { ok: false, code: 'missing_field', detail: p + '.mobileIntermediate.fields' };
    for (const fn of s.mobileIntermediate.fields) {
      if (!_VALID_MOBILE_FIELDS.includes(fn))
        return { ok: false, code: 'invalid_value', detail: p + '.mobileIntermediate.fields: unknown field "' + fn + '"' };
    }

    if (typeof s.flags !== 'object' || s.flags === null || Array.isArray(s.flags))
      return { ok: false, code: 'missing_field', detail: p + '.flags' };
    if (s.flags.noRedColor !== true)
      return { ok: false, code: 'no_red_violation', detail: p + '.flags.noRedColor must be true' };

    for (const k of _CALC_VALUE_KEYS) {
      if (typeof s[k] === 'number')
        return { ok: false, code: 'calc_value_forbidden', detail: p + '.' + k + ' must not be a number in station objects' };
    }
  }

  if (dynamicLatestCount === 0)
    return { ok: false, code: 'missing_field', detail: 'dynamic_latest_month: no station found with date="dynamic_latest_month"' };
  if (dynamicLatestCount > 1)
    return { ok: false, code: 'invalid_value', detail: 'dynamic_latest_month: must appear exactly once, found ' + dynamicLatestCount };

  return { ok: true };
}

// NEW — AP-13: YYYY-MM Monatssubtraktion (FwDateUtils hat keine YYYY-MM-String-Funktion)
function subtractMonths(yyyyMm, n) {
  const year  = parseInt(yyyyMm.slice(0, 4), 10);
  const month = parseInt(yyyyMm.slice(5, 7), 10) - 1; // 0-basiert
  const total = year * 12 + month - n;
  return Math.floor(total / 12) + '-' + String((total % 12) + 1).padStart(2, '0');
}

// NEW — AP-13: aktives 120-Monats-Fenster aus CSV ableiten (kein new Date(), kein fixer Zeitraum)
function buildActiveJourneyWindow(msciData) {
  const latestMonth = msciData[msciData.length - 1].date.slice(0, 7);
  const startMonth  = subtractMonths(latestMonth, 119);
  return { startMonth, latestMonth, periodMonths: 120 };
}

// NEW — AP-13: Stationen auf aktives Fenster filtern
// - Stationen außerhalb [startMonth, latestMonth] werden ausgeschlossen
// - source_claimed_unchecked wird still gefiltert (kein Config-Error — Gate prüft das in AP-14)
// - dynamic_latest_month wird separat über buildJourneyStations verarbeitet
function filterStationsForWindow(stations, window) {
  return stations.filter(s => {
    if (s.date === 'dynamic_latest_month') return false;
    if (s.sourceStatus === 'source_claimed_unchecked') return false;
    return s.date >= window.startMonth && s.date <= window.latestMonth;
  });
}

// CHANGED — AP-14: Journey-Stationen aufbauen (Prioritätsauswahl + Editorial Gate)
function buildJourneyStations(stationsConfig, window) {
  const allFiltered        = filterStationsForWindow(stationsConfig.stations, window);
  const maxVisible         = stationsConfig.selectionPolicy.maxVisibleStations || 7;
  const selectedHistoric   = selectStationsForJourney(allFiltered, maxVisible); // NEW — AP-14
  const finalTemplate      = stationsConfig.stations.find(s => s.date === 'dynamic_latest_month');
  const finalRevealStation = finalTemplate
    ? Object.assign({}, finalTemplate, { date: window.latestMonth })
    : null;
  const gateResult = checkEditorialGate(selectedHistoric, finalRevealStation, stationsConfig.selectionPolicy); // NEW — AP-14
  if (gateResult.status !== 'GateOK')
    console.warn('[fw-app] Editorial Gate:', gateResult.status, gateResult.diagnose.join(' | '));
  return finalRevealStation
    ? [...selectedHistoric, finalRevealStation]
    : selectedHistoric;
}

// NEW — AP-11: Stations-JSON app-spezifisch laden
async function loadStations() {
  try {
    const response = await fetch('config/stations.de.json');
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const stationsConfig = JSON.parse(await response.text());
    // NEW — AP-12: Contract-Validierung
    const validation = validateStationsJson(stationsConfig);
    if (!validation.ok) {
      console.error('[fw-app] validateStationsJson:', validation.code, validation.detail);
      return { error: 'd', message: 'Die Zeitreise kann gerade nicht geladen werden.' };
    }
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
