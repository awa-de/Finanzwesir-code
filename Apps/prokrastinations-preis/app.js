// CHANGED — Slice 5 (war: Slice 3/4)
// app.js — ES-Modul (OA-01: <script type="module">)
// Slice 5: 4-Screen-Flow (Screen-Controller, Button-Navigation, Fokus-Management)

import { CSVParser } from '../../Theme/assets/js/fw-chart-engine/data/CSVParser.js';
import { ChartEngine } from '../../Theme/assets/js/fw-chart-engine/core/ChartEngine.js'; // NEW — Slice 4

// SLUG_WHITELIST: Kompilzeit-Konstante — bewusst keine dynamische Quelle
const SLUG_WHITELIST = ['prokrastinations-preis'];

// NEW — Fetch-Dedup-Cache: verhindert parallele Mehrfach-Requests für dieselbe URL (P-11)
const _dataCache = new Map();

// CHANGED — B1-STATIONS-v3.0: v2.1-Konstanten entfernt (kein priority/role/sourceStatus in v3.0)

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
  p.setAttribute('role', 'alert'); // NEW — AP-18b §14.13
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

// CHANGED — B1-STATIONS-v3.0: selectStationsForJourney + checkEditorialGate entfernt
// v3.0: alle gefilterten Stationen chronologisch, kein priority-/role-basiertes Gate

// NEW — AP-14: Chart bis zur Stations-Monat trimmen (visibleChartSeries — kein Endwissen)
function buildVisibleChartSeries(chartSeries, stationMonth) {
  return chartSeries.filter(p => p.month <= stationMonth);
}

// CHANGED — B1-STATIONS-v3.0: finaler Reveal ist synthetisch (isFinalReveal-Flag)
function isFinalRevealStation(s) {
  return s.isFinalReveal === true;
}

// NEW — B1-AP-14c1: Annotationen aus vergangenen Journey-Stations ableiten (kein Rendering)
// Nur Stationen vor der aktuellen (pastStations = slice(0, currentIdx)).
// markerY per Snapshot-Snap: passender Monatspunkt der sichtbaren Hauptserie.
function buildJourneyStationAnnotations(pastStations, visibleSeries) {
  const events = [];
  for (const s of pastStations) {
    if (isFinalRevealStation(s)) continue; // CHANGED — B1-AP-14c3b: robuster Guard
    const sMonth = s.date.slice(0, 7);
    const point = visibleSeries.find(p => p.month === sMonth); // Snapshot-Snap
    if (!point) continue; // kein Datenpunkt — keine künstliche Annotation
    events.push({
      id:       s.id,
      type:     'journey-station',
      month:    sMonth,
      x:        new Date(sMonth + '-01').getTime(),
      y:        point.depotwert,
      source:   'journey-stations',
      role:     s.role,
      status:   'past',
      headline: s.headline
    });
  }
  return events;
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

// NEW — B1-STATIONS-v3.0: Quellenzeile aus station.source + station.date erzeugen
// Synthetische Final-Reveal-Stationen (isFinalReveal) zeigen nur das Medium ohne Datum.
function formatSourceLine(station) {
  if (station.isFinalReveal) return station.source;
  const [y, m, d] = station.date.split('-');
  const datePart = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
    .format(new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10)));
  return station.source ? station.source + ' · ' + datePart : datePart;
}

// CHANGED — B1-STATIONS-v3.0: sourceLabel → formatSourceLine; mobileIntermediate → hardcoded
function renderStationCard(container, station, stationIntermediate, fmt) {
  container.textContent = ''; // vorherige Station sauber ersetzen

  const sourceLabel = document.createElement('p');
  sourceLabel.className = 'fw-app__station-source-label';
  sourceLabel.textContent = formatSourceLine(station); // CHANGED — B1-STATIONS-v3.0
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
  trigger.textContent = 'Zwischenstand anzeigen'; // CHANGED — B1-STATIONS-v3.0
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
    trigger.textContent = !isOpen ? 'Zwischenstand ausblenden' : 'Zwischenstand anzeigen'; // CHANGED — B1-STATIONS-v3.0
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

  // NEW — AP-14b: Orientierungs-Chip (APP_SPEC §16.1)
  const progressEl = document.createElement('p');
  progressEl.className = 'fw-app__journey-progress';
  screen2.appendChild(progressEl);

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
  sublineS3.textContent = 'Die Strecke wirkt im Rückblick ruhiger, weil du das Ende jetzt kennst. Vor 10 Jahren kannte sie niemand.'; // CHANGED — B1-AP-16b (APP_SPEC §16.2)
  screen3.appendChild(sublineS3);

  const chartSection3 = document.createElement('div');
  chartSection3.setAttribute('data-fw-appchart', 'sparplan-s3'); // CHANGED — Slice 6: VertikaleLinie via features
  chartSection3.className = 'fw-app__chart-section';
  screen3.appendChild(chartSection3);

  const kpiContainerS3 = document.createElement('div'); // NEW — B1-AP-16b: KPI-Mount-Point (APP_SPEC §6, §23.6)
  kpiContainerS3.className = 'fw-app__kpi-slot';
  screen3.appendChild(kpiContainerS3);

  const assumptionsS3 = document.createElement('aside'); // NEW — Slice 6: AssumptionsBox (APP_SPEC §19.8)
  assumptionsS3.className = 'fw-app__assumptions';
  assumptionsS3.textContent = 'Basis: MSCI World Index, monatliche Indexwerte, 10 Jahre rückwärts bis zum letzten vollständig verfügbaren Monat. Die Werte zeigen das Marktprinzip, keine konkrete ETF-Produktempfehlung. Vergangene Wertentwicklungen sind keine Garantie für die Zukunft. Keine Finanzberatung.';
  screen3.appendChild(assumptionsS3);

  const navS3 = document.createElement('div');
  navS3.className = 'fw-app__screen-nav';
  const btnS3Prev = makeBtn('← Zurück', 'fw-app__btn--prev');
  const btnS3Next = makeBtn('Meine nächsten 10 Jahre starten', 'fw-app__btn--next'); // CHANGED — B1-AP-16b (E-04)
  navS3.appendChild(btnS3Prev);
  navS3.appendChild(btnS3Next);
  screen3.appendChild(navS3);

  // --- Screen 4 — Rubikon (stehender Zustand, CHANGED — AP-prokrast-03h: kein Morph mehr) ---
  const screen4 = document.createElement('section');
  screen4.className = 'fw-app__screen';
  screen4.dataset.fwScreen = '4';
  screen4.setAttribute('hidden', '');

  const h2S4 = document.createElement('h2');
  h2S4.className = 'fw-app__screen-headline';
  h2S4.tabIndex = -1;
  h2S4.textContent = 'Heute beginnt wieder ein Chart, dessen Ende niemand kennt.'; // CHANGED — B1-AP-16c (APP_SPEC §16.2)
  screen4.appendChild(h2S4);

  const chartSection4 = document.createElement('div'); // NEW — AP-prokrast-03f: Rubikon-Chart
  chartSection4.setAttribute('data-fw-appchart', 'sparplan-s4');
  chartSection4.className = 'fw-app__chart-section';

  // NEW — AP-prokrast-03h2: Wrapper für Chart + DOM-Text-Overlay, damit rubikonText per CSS
  // in das rechte leere Zukunftsfeld gelegt werden kann, ohne den ChartEngine-eigenen
  // Container (chartSection4) zu berühren — kein Eingriff in Chart.js-/Renderer-DOM.
  const screen4ChartWrap = document.createElement('div');
  screen4ChartWrap.className = 'fw-app__rubikon-chart-wrap';
  screen4ChartWrap.appendChild(chartSection4);

  // CHANGED — AP-prokrast-03h2: semantischer Rubikon-Text bleibt DOM, wird aber visuell als
  // Overlay in die rechte Chart-Hälfte gelegt (statt als Absatz unter dem Chart). Zwei Text-
  // Varianten im DOM (lang/kurz), CSS-Breakpoint entscheidet über Sichtbarkeit — kein JS-Zweig,
  // keine zweite hidden-Steuerung nötig.
  const rubikonText = document.createElement('div');
  rubikonText.className = 'fw-app__rubikon-text';
  rubikonText.setAttribute('hidden', '');

  const rubikonLong = document.createElement('div');
  rubikonLong.className = 'fw-app__rubikon-variant fw-app__rubikon-variant--long';
  [
    'Die letzten zehn Jahre sind gelaufen.',
    'Die nächsten zehn sind leer.\nNoch.',
    'Nicht weil nichts passiert —\nsondern weil niemand weiß, was.',
    'Andere Krisen. Gleiche Zumutung.\nDer Job bleibt:\ndranbleiben, wenn es nervt.'
  ].forEach(line => {
    const p = document.createElement('p');
    p.className = 'fw-app__screen-subline fw-app__rubikon-line';
    p.textContent = line;
    rubikonLong.appendChild(p);
  });
  const rubikonLongFootnote = document.createElement('p'); // NEW — AP-prokrast-03h: Prognose-Abgrenzung
  rubikonLongFootnote.className = 'fw-app__rubikon-footnote';
  rubikonLongFootnote.textContent = 'Keine Vorhersage. Nur Markterfahrung.';
  rubikonLong.appendChild(rubikonLongFootnote);
  rubikonText.appendChild(rubikonLong);

  // NEW — AP-prokrast-03h2: kompakte Mobile-Fassung — engeres rechtes Overlay-Feld auf 375px
  // reicht für die lange Fassung nicht; CSS-Breakpoint blendet long aus, short ein.
  const rubikonShort = document.createElement('div');
  rubikonShort.className = 'fw-app__rubikon-variant fw-app__rubikon-variant--short';
  [
    'Die nächsten 10 Jahre sind leer.\nNoch.',
    'Die Linie fehlt noch.\nDie Aufgabe nicht:\ndranbleiben.'
  ].forEach(line => {
    const p = document.createElement('p');
    p.className = 'fw-app__screen-subline fw-app__rubikon-line';
    p.textContent = line;
    rubikonShort.appendChild(p);
  });
  rubikonText.appendChild(rubikonShort);

  screen4ChartWrap.appendChild(rubikonText);
  screen4.appendChild(screen4ChartWrap);

  const cta = document.createElement('a'); // CHANGED — Slice 6: finales CTA-Styling; href leer (NB-1)
  cta.className = 'fw-app__cta';
  cta.href = '';
  cta.textContent = 'Heute Marktzeit sammeln →';
  cta.setAttribute('hidden', ''); // CHANGED — AP-prokrast-03h: CTA erst nach Text + weiterer 800ms-Stille sichtbar
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
  const chartEngine4 = new ChartEngine(); // NEW — AP-prokrast-03f
  let lastRenderedRateS3 = null;
  let lastRevealA11yText = ''; // NEW — AP-17b
  let screen4TextTimer = null; // CHANGED — AP-prokrast-03h (war: screen4Timer, ein Morph-Timer): Timer für Text-Reveal nach 800ms
  let screen4CtaTimer = null; // NEW — AP-prokrast-03h: Timer für CTA-Reveal nach weiterer 800ms-Stille
  let screen4RevealedRate = null; // Rate, für die S4 zuletzt final gerendert wurde (analog lastRenderedRateS3)
  const RUBIKON_A11Y_TEXT = 'Die letzten zehn Jahre sind gelaufen. Die nächsten zehn Jahre sind bewusst leer, weil niemand weiß, was passiert. Der Handlungsrahmen ist: dranbleiben, wenn es nervt.'; // CHANGED — AP-prokrast-03h

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
    const journeyRangeKey = [currentRate, ctx.startMonth, ctx.latestMonth].join('|'); // NEW — AP-14b3
    const journeyAnnotations = buildJourneyStationAnnotations(journeyStations.slice(0, stationIdx), visibleSeries); // NEW — B1-AP-14c1
    chartEngine2.renderFromData(chartSection2, visibleSeries, { // CHANGED — AP-14b3
      type: 'line',
      features: { rangeControls: false, headline: false },
      xDisplayRange: { min: ctx.startMonth, max: ctx.latestMonth },
      yRangePolicy: 'cumulative-expand-zero',
      yRangeResetKey: journeyRangeKey,
      annotations: { events: journeyAnnotations }, // NEW — B1-AP-14c1
      annotationPulse: { enabled: true, mode: 'newly-added' } // NEW — B1-AP-14c4
    });
    // NEW — AP-14b: Orientierungs-Chip aktualisieren (APP_SPEC §16.1)
    const n = stationIdx + 1;
    const total = journeyStations.length;
    const [yr, mo] = station.date.split('-');
    const bekannt = new Intl.DateTimeFormat(appData.locale, { month: 'long', year: 'numeric' })
      .format(new Date(parseInt(yr, 10), parseInt(mo, 10) - 1, 1));
    progressEl.textContent = `Station ${n} von ${total} · Bekannt bis ${bekannt}`;
    journeyBtn.textContent = station.isFinalReveal ? 'Ergebnis ansehen' : 'Weiter investiert bleiben'; // CHANGED — B1-STATIONS-v3.0
    a11yRegion.textContent = station.headline; // stationLiveMessage — kein Endwissen (APP_SPEC §14.1)
  }

  function renderS3(rate) {
    const ctx = buildAppContext(appData, rate, startBetrag, journeyStations); // CHANGED — AP-13
    const revealAnnotations = buildJourneyStationAnnotations(journeyStations, ctx.chartSeries); // NEW — B1-AP-14c3
    chartEngine3.renderFromData(chartSection3, ctx.chartSeries, {
      type: 'line', features: { rangeControls: false, headline: false, verticalLine: 'last' },
      annotations: { events: revealAnnotations } // NEW — B1-AP-14c3
    });
    lastRenderedRateS3 = rate;
    kpiContainerS3.textContent = ''; // CHANGED — B1-AP-16b: clear vor re-render (kein Duplikat)
    renderKpiCards(kpiContainerS3, ctx); // NEW — B1-AP-16b: KPI-Cards sichtbar (APP_SPEC §6, §23.6)
    return ctx; // CHANGED — AP-14: ctx für revealA11ySummary in showScreen(3)
  }

  // CHANGED — AP-prokrast-03h: kein Morph mehr. Screen 4 rendert den finalen 20-Jahres-Rubikon-Zustand
  // in einem einzigen renderFromData()-Aufruf — links echte Vergangenheit, Mitte Rubikon/Heute
  // (FwVerticalLinePlugin), rechts leerer Zukunftsraum (kein Zukunftspunkt, kein Dummy, kein zweites
  // Dataset). Kein Canvas-Text mehr (FwChartTextPlugin bleibt ungenutzt) — der semantische Haupttext
  // steht ausschließlich im DOM (`rubikonText`).
  function renderScreen4Chart() {
    const ctx = buildAppContext(appData, currentRate, startBetrag, journeyStations);
    chartEngine4.renderFromData(chartSection4, ctx.chartSeries, {
      type: 'line',
      features: { rangeControls: false, headline: false, verticalLine: 'last' },
      xDisplayRange: { min: ctx.startMonth, max: addMonths(ctx.latestMonth, 119) }
    });
  }

  // CHANGED — AP-prokrast-03h: Beat-Sequenz für den stehenden Rubikon-Screen —
  // Chart sofort final, 800ms Stille, DOM-Text erscheint (genau eine aria-live-Aktualisierung),
  // 800ms Stille, CTA erscheint. Kein Replay, solange currentRate unverändert (analog lastRenderedRateS3).
  function revealScreen4() {
    if (screen4TextTimer) { clearTimeout(screen4TextTimer); screen4TextTimer = null; }
    if (screen4CtaTimer)  { clearTimeout(screen4CtaTimer);  screen4CtaTimer  = null; }
    if (screen4RevealedRate === currentRate) {
      a11yRegion.textContent = RUBIKON_A11Y_TEXT; // erneute Ansage bei Rückkehr, analog S3 — kein erneuter Reveal
      return;
    }
    rubikonText.setAttribute('hidden', '');
    cta.setAttribute('hidden', '');
    renderScreen4Chart();
    screen4TextTimer = setTimeout(() => {
      screen4TextTimer = null;
      rubikonText.removeAttribute('hidden');
      a11yRegion.textContent = RUBIKON_A11Y_TEXT; // genau eine Aktualisierung beim Erscheinen des Texts
      screen4CtaTimer = setTimeout(() => {
        screen4CtaTimer = null;
        cta.removeAttribute('hidden');
        screen4RevealedRate = currentRate;
      }, 800);
    }, 800);
  }

  // NEW — Screen-Controller (prefers-reduced-motion: hidden-Toggle ist direkt, kein CSS-Übergang)
  const allScreens = [screen1, screen2, screen3, screen4];

  function showScreen(n, focus) {
    if (n !== 4) { // CHANGED — AP-prokrast-03h: Timer-Cleanup bei Screen-Wechsel weg von S4 (zwei Timer statt einem)
      if (screen4TextTimer) { clearTimeout(screen4TextTimer); screen4TextTimer = null; }
      if (screen4CtaTimer)  { clearTimeout(screen4CtaTimer);  screen4CtaTimer  = null; }
    }
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
      lastRevealA11yText = `Wer vor 10 Jahren ${currentRate} € monatlich investiert hätte, hätte heute ${fmtReveal.format(ctx.depotwertHeute)} — bei ${fmtReveal.format(ctx.eingezahlt)} eingezahlt.`; // CHANGED — AP-17b
      a11yRegion.textContent = lastRevealA11yText;
    } else if (n === 3 && lastRevealA11yText) { // NEW — AP-17b: re-announce bei Rückkehr zu S3
      a11yRegion.textContent = lastRevealA11yText;
    }
    if (n === 4) revealScreen4(); // NEW — AP-prokrast-03f
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
      const h3 = stationArea.querySelector('h3'); // CHANGED — AP-17b: Fokus auf Stations-h3 (APP_SPEC §14.5 Variante B)
      (h3 ?? screen2.querySelector('h2'))?.focus();
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

// CHANGED — B1-STATIONS-v3.0: Validator für STATIONS_CONFIG_CONTRACT.md v3.0
// Gibt { ok: true } oder { ok: false, code, detail } zurück — kein Wurf.
function validateStationsJson(json) {
  if (typeof json !== 'object' || json === null || Array.isArray(json))
    return { ok: false, code: 'invalid_structure', detail: 'root is not an object' };

  if (json.version !== '3.0')
    return { ok: false, code: 'invalid_value', detail: 'version: expected "3.0", got: ' + json.version };
  if (json.locale !== 'de-DE')
    return { ok: false, code: 'invalid_value', detail: 'locale: expected "de-DE", got: ' + json.locale };
  if (json.app !== 'prokrastinations-preis')
    return { ok: false, code: 'invalid_value', detail: 'app: expected "prokrastinations-preis", got: ' + json.app };

  if (!Array.isArray(json.stations) || json.stations.length < 1)
    return { ok: false, code: 'missing_field', detail: 'stations (array, min length 1)' };

  for (let i = 0; i < json.stations.length; i++) {
    const s = json.stations[i];
    const p = 'station[' + i + ']';

    if (typeof s.id !== 'string' || s.id.trim() === '')
      return { ok: false, code: 'missing_field', detail: p + '.id' };
    if (typeof s.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s.date))
      return { ok: false, code: 'invalid_value', detail: p + '.date: expected YYYY-MM-DD, got: ' + s.date };
    if (typeof s.source !== 'string' || s.source.trim() === '')
      return { ok: false, code: 'missing_field', detail: p + '.source' };
    if (typeof s.headline !== 'string' || s.headline.trim() === '')
      return { ok: false, code: 'missing_field', detail: p + '.headline' };
    if (typeof s.anchorText !== 'string' || s.anchorText.trim() === '')
      return { ok: false, code: 'missing_field', detail: p + '.anchorText' };
    if (typeof s.sourceUrl !== 'string' || !/^https?:\/\//.test(s.sourceUrl))
      return { ok: false, code: 'invalid_value', detail: p + '.sourceUrl: must start with http:// or https://' };
  }

  return { ok: true };
}

// NEW — AP-13: YYYY-MM Monatssubtraktion (FwDateUtils hat keine YYYY-MM-String-Funktion)
function subtractMonths(yyyyMm, n) {
  const year  = parseInt(yyyyMm.slice(0, 4), 10);
  const month = parseInt(yyyyMm.slice(5, 7), 10) - 1; // 0-basiert
  const total = year * 12 + month - n;
  return Math.floor(total / 12) + '-' + String((total % 12) + 1).padStart(2, '0');
}

// NEW — AP-prokrast-03f: YYYY-MM Monatsaddition (Gegenstück zu subtractMonths, nur lokal in app.js — nicht FwDateUtils.js, Tabu-Zone)
function addMonths(yyyyMm, n) {
  const year  = parseInt(yyyyMm.slice(0, 4), 10);
  const month = parseInt(yyyyMm.slice(5, 7), 10) - 1; // 0-basiert
  const total = year * 12 + month + n;
  return Math.floor(total / 12) + '-' + String((total % 12) + 1).padStart(2, '0');
}

// NEW — AP-13: aktives 120-Monats-Fenster aus CSV ableiten (kein new Date(), kein fixer Zeitraum)
function buildActiveJourneyWindow(msciData) {
  const latestMonth = msciData[msciData.length - 1].date.slice(0, 7);
  const startMonth  = subtractMonths(latestMonth, 119);
  return { startMonth, latestMonth, periodMonths: 120 };
}

// CHANGED — B1-STATIONS-v3.0: date ist YYYY-MM-DD → slice(0,7) für Fenstervergleich
// Kein sourceStatus-Filter, kein dynamic_latest_month in v3.0
function filterStationsForWindow(stations, window) {
  return stations.filter(s => {
    const month = s.date.slice(0, 7); // YYYY-MM-DD → YYYY-MM
    return month >= window.startMonth && month <= window.latestMonth;
  });
}

// CHANGED — B1-STATIONS-v3.0: chronologische Sortierung, synthetischer Final-Reveal aus CSV
// Kein selectionPolicy/priority/editorialGate — alle gefilterten Stationen erscheinen
function buildJourneyStations(stationsConfig, window) {
  const filtered = filterStationsForWindow(stationsConfig.stations, window);
  const sorted   = filtered.slice().sort((a, b) => a.date < b.date ? -1 : 1);
  const finalReveal = {
    id:            'station_final_reveal',
    date:          window.latestMonth,
    source:        'MSCI-Datenreihe',
    headline:      'Jetzt kennst du das Ende',
    anchorText:    'Die Strecke sieht im Rückblick einfacher aus, weil du sie jetzt vollständig siehst. Vor 10 Jahren kannte sie niemand.',
    sourceUrl:     '',
    isFinalReveal: true
  };
  return [...sorted, finalReveal];
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
