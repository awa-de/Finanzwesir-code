// CHANGED — Slice 5 (war: Slice 3/4)
// app.js — ES-Modul (OA-01: <script type="module">)
// Slice 5: 4-Screen-Flow (Screen-Controller, Button-Navigation, Fokus-Management)

import { CSVParser } from '../../Theme/assets/js/fw-chart-engine/data/CSVParser.js';
import { ChartEngine } from '../../Theme/assets/js/fw-chart-engine/core/ChartEngine.js'; // NEW — Slice 4
import { resolveCsvAppDataFile, resolveJsonAppDataFile } from '../../Theme/assets/js/fw-chart-engine/data/AppDataResolver.js'; // NEW — Datenmigration (Shared-Daten-AP)
import { JSONParser } from '../../Theme/assets/js/fw-chart-engine/data/JSONParser.js'; // NEW — Datenmigration (Shared-Daten-AP)

// SLUG_WHITELIST: Kompilzeit-Konstante — bewusst keine dynamische Quelle
const SLUG_WHITELIST = ['prokrastinations-preis'];

// NEW — Fetch-Dedup-Cache: verhindert parallele Mehrfach-Requests für dieselbe URL (P-11)
const _dataCache = new Map();

// CHANGED — B1-STATIONS-v3.0: v2.1-Konstanten entfernt (kein priority/role/sourceStatus in v3.0)

// NEW — AP-tailwind-02_slice-1: Shell-/State-Klassenkonstanten (TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md
// §6.1/§6.10, Literalregel §2.2: vollständige String-Literale, keine Interpolation/Komposition).
const FW_SHELL_CLASS = 'fw-app relative box-border w-full min-h-48 bg-bg font-body text-text p-4 md:p-6';
const FW_LOADING_WRAPPER_CLASS = 'flex items-center justify-center gap-3 p-6 text-text-muted';
const FW_LOADING_SPINNER_CLASS = 'h-8 w-8 animate-spin motion-reduce:animate-none rounded-full border-4 border-border border-t-primary';
const FW_EMPTY_CLASS = 'p-4 text-text-muted';
const FW_ERROR_CLASS = 'rounded-lg border border-error-border bg-error-bg p-4 text-error-text';
// NEW — AP-tailwind-02_slice-4-manifest-fix: bislang bares classList-Literal, jetzt als
// FW_*_CLASS-Rezeptkonstante gefuehrt (neue Manifest-Invariante: nur deklarierte
// FW_*_CLASS-Konstanten zaehlen zur erwarteten Manifestmenge, s. tools/check-test-pages.py).
const FW_LOADING_STATE_OPACITY_CLASS = 'opacity-60';
// NEW — AP-tailwind-02_slice-2: KPI-Klassenkonstanten (TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md §6.3)
const FW_KPI_GROUP_CLASS = 'flex flex-wrap gap-4 mt-4';
const FW_KPI_CARD_CLASS = 'flex-1 basis-36 rounded-lg bg-surface px-4 py-2';
const FW_KPI_LABEL_CLASS = 'mb-1 text-sm text-text-muted';
const FW_KPI_VALUE_CLASS = 'm-0 text-2xl font-bold text-text';
// NEW — AP-tailwind-02_slice-3: Slider-Field-Klassenkonstanten (TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md §6.6)
const FW_SLIDER_FIELD_CLASS = 'my-4';
const FW_SLIDER_LABEL_CLASS = 'flex flex-wrap items-center gap-x-4 gap-y-2 cursor-pointer';
const FW_SLIDER_LABEL_TEXT_CLASS = 'shrink-0 text-sm text-text-muted';
const FW_SLIDER_INPUT_CLASS = 'min-w-0 flex-1 basis-40 cursor-pointer accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
const FW_SLIDER_VALUE_CLASS = 'min-w-[7ch] shrink-0 text-right font-bold text-text';
// NEW — AP-tailwind-02_slice-4: Button-/CTA-Klassenkonstanten (TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md §6.4/§7)
const FW_BUTTON_NEXT_CLASS = 'inline-flex items-center justify-center rounded-md px-4 py-2 font-bold transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-white hover:bg-petrol-700 active:bg-petrol-800 ml-auto';
const FW_BUTTON_PREV_CLASS = 'inline-flex items-center justify-center rounded-md px-4 py-2 font-bold transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border border-border bg-bg text-text hover:bg-bg-faint active:bg-surface';
const FW_BUTTON_JOURNEY_CLASS = 'inline-flex items-center justify-center rounded-md px-4 py-2 font-bold transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-white hover:bg-petrol-700 active:bg-petrol-800 w-full sm:w-auto mt-4';
const FW_CTA_CLASS = 'inline-flex items-center justify-center rounded-md px-4 py-2 font-bold transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500 focus-visible:ring-offset-2 bg-primary text-white hover:bg-petrol-700 active:bg-petrol-800 mt-4 no-underline';
// NEW — AP-tailwind-02_slice-4-manifest-fix: Rezeptschlüssel statt CSS-String als makeBtn()-Parameter
// (kein CSS-String darf als Funktionsparameter in makeBtn() gelangen).
const FW_BUTTON_RECIPES = Object.freeze({
  next: FW_BUTTON_NEXT_CLASS,
  prev: FW_BUTTON_PREV_CLASS,
  journey: FW_BUTTON_JOURNEY_CLASS,
});
// NEW — AP-tailwind-02_slice-5: Stationen-Panel-Klassenkonstanten (TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md
// §6.2 Panel, §7 Stationen-/Story-Bereich). Die fw-app__station-area-/fw-app__screen3-bridge-Marker
// bleiben lokale Mechanikmarker (Flug-Clone, Bridge-Reveal) und werden vom Manifestchecker nicht als
// Tailwind-Utility gezählt.
const FW_STATION_PANEL_CLASS = 'fw-app__station-area my-5 flex flex-col gap-3';
const FW_STATION_SOURCE_LABEL_CLASS = 'm-0 text-xs uppercase tracking-wide text-text-muted';
const FW_STATION_HEADLINE_CLASS = 'm-0 text-lg font-bold text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500 focus-visible:ring-offset-2';
const FW_STATION_ANCHOR_CLASS = 'm-0 text-sm text-text-sec';
const FW_JOURNEY_PROGRESS_CLASS = 'mt-2 text-center text-sm text-text-muted';
const FW_SCREEN3_BRIDGE_CLASS = 'fw-app__screen3-bridge mt-2 text-center text-sm text-text-muted';
// NEW — AP-tailwind-02_slice-6: Disclosure-/Callout-/sr-only-Klassenkonstanten (TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md
// §6.7 Callout, §6.8 Disclosure, §6.9 ARIA-Live-Region). Der fw-app__assumptions-Marker bleibt Teil der
// Callout-Konstante, weil er ausschließlich die bestehende Screen-3-Reveal-Mechanik trägt — kein Tailwind-
// Token, wird vom Manifestchecker ausgefiltert.
const FW_DISCLOSURE_TRIGGER_CLASS = 'flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm font-semibold text-text-sec transition-colors motion-reduce:transition-none hover:bg-bg-faint hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500 sm:inline-flex sm:w-auto sm:justify-start'; // CHANGED — AP-tailwind-02f (Q-08): responsiver Disclosure-Kontrakt
const FW_DISCLOSURE_INDICATOR_CLOSED_CLASS = 'transition-transform motion-reduce:transition-none';
const FW_DISCLOSURE_INDICATOR_OPEN_CLASS = 'transition-transform motion-reduce:transition-none rotate-180';
const FW_DISCLOSURE_CONTENT_CLASS = 'mt-2 pl-3';
const FW_INTERMEDIATE_VALUES_CLASS = 'm-0 grid w-full grid-cols-2 gap-x-4 gap-y-1 sm:w-fit'; // CHANGED — AP-tailwind-02f (Q-08): responsiver Disclosure-Kontrakt
const FW_INTERMEDIATE_LABEL_CLASS = 'text-xs text-text-muted';
const FW_INTERMEDIATE_VALUE_CLASS = 'm-0 text-base font-semibold text-text';
const FW_ASSUMPTIONS_CLASS = 'fw-app__assumptions mt-4 border-l-2 border-border pl-4 text-sm text-text-muted';
const FW_A11Y_LIVE_REGION_CLASS = 'sr-only';
// NEW — AP-tailwind-02_slice-7: App-seitiger Chart-Slot (TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md
// D-04 Ein-Container-Vertrag, §9). Nur Positionierungskontext + Abstand — nie Fläche/Border/
// Schatten/Radius/Padding; der einzige sichtbare Container bleibt der engine-eigene fw-chart-wrapper.
const FW_CHART_SLOT_CLASS = 'relative mt-6';
// NEW — AP-tailwind-02_slice-8: Screen-Flow-Nachputz (TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md §7/§9).
// FW_SCREEN_CLASS: nur Positionierungsrahmen (Card-to-Point-Flug-Clone), kein flex/gap. Der
// fw-app__screen-headline-Marker bleibt ausschließlich für die bestehende Fokus-Kompatibilitätsregel
// (.fw-app__screen-headline:focus) erhalten — kein neues allgemeines focus:-Muster. mb-2 bildet den
// bisherigen 0.5rem-Abstand zur noch nicht migrierten, geschützten Subline wertgleich ab.
const FW_SCREEN_CLASS = 'relative';
const FW_SCREEN_HEADLINE_CLASS = 'fw-app__screen-headline m-0 mb-2 text-xl font-bold text-text';
const FW_SCREEN_NAV_CLASS = 'flex flex-wrap gap-3 mt-6';

function validateSlug(slug) {
  return typeof slug === 'string' && SLUG_WHITELIST.includes(slug.trim());
}

function clearContainer(container) {
  container.textContent = ''; // entfernt alle Kindelemente (SafeDOM — kein innerHTML)
}

function setState(container, state) {
  container.dataset.fwState = state;
  container.classList.toggle(FW_LOADING_STATE_OPACITY_CLASS, state === 'loading'); // CHANGED — AP-tailwind-02_slice-4-manifest-fix (war: bares Literal 'opacity-60')
  // Erlaubte Werte: 'loading' | 'content' | 'error' | 'empty'
}

// CHANGED — AP-tailwind-02_slice-1: Zentrier-Wrapper + Spinner + sichtbarer Text (§6.10, Q-07/AP-tailwind-02c)
function renderLoading(container) {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('role', 'status');
  wrapper.className = FW_LOADING_WRAPPER_CLASS;

  const spinner = document.createElement('span');
  spinner.setAttribute('aria-hidden', 'true');
  spinner.className = FW_LOADING_SPINNER_CLASS;

  const text = document.createElement('span');
  text.textContent = 'Daten werden geladen …';

  wrapper.appendChild(spinner);
  wrapper.appendChild(text);
  container.appendChild(wrapper);
}

// NEW — AP-tailwind-02_slice-1: von renderError() getrennt, weil Empty role="status" braucht (§6.10), nicht role="alert".
// CHANGED — AP-tailwind-02d: aktuell ohne Aufrufer (alle bisherigen "empty"-Fälle sind Taxonomie-Error, APP-INTERFACE.md §8).
// Bewusst nicht entfernt — Empty bleibt gültiger Zustand (z. B. künftige Empty-Journey-Faelle), kein toter Code im engeren Sinn.
function renderEmpty(container, message) {
  const p = document.createElement('p');
  p.setAttribute('role', 'status');
  p.className = FW_EMPTY_CLASS;
  p.textContent = message; // SafeDOM: textContent, niemals innerHTML (Q-01)
  container.appendChild(p);
}

function renderError(container, message) {
  const p = document.createElement('p');
  p.setAttribute('role', 'alert'); // NEW — AP-18b §14.13
  p.className = FW_ERROR_CLASS; // NEW — AP-tailwind-02_slice-1
  p.textContent = message; // SafeDOM: textContent, niemals innerHTML (Q-01)
  container.appendChild(p);
}

// NEW — Clamp-Helfer für Two-Step-Parsing (APP_SPEC §5.3)
function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

// NEW — AP-prokrast-08b: Reduced-Motion-Check für Card-to-Point (Muster aus
// CHART_PLUGIN_ARCHITEKTUR.md §9 übernommen, hier für app-seitige DOM-Motion)
function prefersReducedMotion() {
  try {
    return typeof window !== 'undefined' &&
           window.matchMedia != null &&
           window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {
    return false;
  }
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

// NEW — Datenmigration: lokale Deep-Freeze-Hilfe, ausschließlich für den Rückgabewert von
// buildAppContext() (Der Rucksack §2.2/§2.3: der statische Kern ist immutable). Keine neue
// globale Utility-Datei — bewusst lokal in app.js, analog FinanzwesirJsonData.js im Datenlayer.
function deepFreezeContext(value) {
  if (value === null || (typeof value !== 'object' && typeof value !== 'function')) return value;
  if (Object.isFrozen(value)) return value;
  Object.freeze(value);
  for (const key of Object.getOwnPropertyNames(value)) {
    deepFreezeContext(value[key]);
  }
  return value;
}

// NEW — AppContext aus appData + Nutzerwerten (APP_SPEC §11)
// CHANGED — Datenmigration: Rückgabewert wird rekursiv eingefroren (deepFreezeContext), nicht
// nur an der Wurzel. Flüchtiger Screen-/Fokus-/Timer-/Animationszustand bleibt im Controller
// (renderContent()-Closures) und wandert nie in dieses Objekt.
function buildAppContext(appData, monatlicheRate, startBetrag, stations) { // CHANGED — AP-13
  const { chartSeries, eingezahlt, depotwertHeute, differenz } =
    marketTimeStrategy(appData.msciData, monatlicheRate, startBetrag);
  return deepFreezeContext({
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
  });
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
  dl.className = FW_KPI_GROUP_CLASS; // CHANGED — AP-tailwind-02_slice-2

  [
    { label: 'Eingezahlt',       value: fmt.format(appContext.eingezahlt),     key: 'eingezahlt' },
    { label: 'Depotwert heute',  value: fmt.format(appContext.depotwertHeute), key: 'depotwertHeute' },
    { label: 'Gewinn / Verlust', value: differenzFormatted,                    key: 'differenz' }
  ].forEach(({ label, value, key }) => {
    const div = document.createElement('div');
    div.className = FW_KPI_CARD_CLASS; // CHANGED — AP-tailwind-02_slice-2
    div.dataset.kpi = key;

    const dt = document.createElement('dt');
    dt.className = FW_KPI_LABEL_CLASS; // NEW — AP-tailwind-02_slice-2
    dt.textContent = label;

    const dd = document.createElement('dd');
    dd.className = FW_KPI_VALUE_CLASS; // NEW — AP-tailwind-02_slice-2
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
  sourceLabel.className = FW_STATION_SOURCE_LABEL_CLASS; // CHANGED — AP-tailwind-02_slice-5
  sourceLabel.textContent = formatSourceLine(station); // CHANGED — B1-STATIONS-v3.0
  container.appendChild(sourceLabel);

  const headline = document.createElement('h3');
  headline.className = FW_STATION_HEADLINE_CLASS; // CHANGED — AP-tailwind-02_slice-5
  headline.tabIndex = -1; // fokussierbar via JS (APP_SPEC §14.5 Fokusführung)
  headline.textContent = station.headline;
  container.appendChild(headline);

  const anchor = document.createElement('p');
  anchor.className = FW_STATION_ANCHOR_CLASS; // CHANGED — AP-tailwind-02_slice-5
  anchor.textContent = station.anchorText;
  container.appendChild(anchor);

  // Collapsible Zwischenstand (APP_SPEC §14.5, visualRules.stationValueMobile = collapsible)
  // CHANGED — AP-tailwind-02_slice-6: Wrapper ohne eigene Klasse (Stationen-Panel-gap-3 liefert
  // bereits den Abstand, TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md §6.8/§7).
  const collapsibleId  = 'fw-collapsible-' + station.id;
  const collapsibleWrap = document.createElement('div');

  const trigger = document.createElement('button');
  trigger.type  = 'button';
  trigger.className = FW_DISCLOSURE_TRIGGER_CLASS; // CHANGED — AP-tailwind-02_slice-6
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', collapsibleId);

  // NEW — AP-tailwind-02_slice-6: sichtbarer Labeltext in eigenem Span (nur dessen textContent
  // wechselt beim Toggle) + separater aria-hidden-Indikator (§6.8 Rezept).
  const triggerLabel = document.createElement('span');
  triggerLabel.textContent = 'Zwischenstand anzeigen'; // CHANGED — B1-STATIONS-v3.0
  const indicator = document.createElement('span');
  indicator.setAttribute('aria-hidden', 'true');
  indicator.className = FW_DISCLOSURE_INDICATOR_CLOSED_CLASS;
  indicator.textContent = '▾';
  trigger.appendChild(triggerLabel);
  trigger.appendChild(indicator);

  const content = document.createElement('div');
  content.id        = collapsibleId;
  content.className = FW_DISCLOSURE_CONTENT_CLASS; // CHANGED — AP-tailwind-02_slice-6
  content.setAttribute('hidden', '');

  const dl = document.createElement('dl');
  dl.className = FW_INTERMEDIATE_VALUES_CLASS; // CHANGED — AP-tailwind-02_slice-6

  [
    { label: 'Eingezahlt',       value: fmt.format(stationIntermediate.paidIn) },
    { label: 'Depotwert damals', value: fmt.format(stationIntermediate.portfolioValueAtStation) }
  ].forEach(({ label, value }) => {
    const div = document.createElement('div');
    const dt  = document.createElement('dt');
    dt.className = FW_INTERMEDIATE_LABEL_CLASS; // NEW — AP-tailwind-02_slice-6
    dt.textContent = label;
    const dd  = document.createElement('dd');
    dd.className = FW_INTERMEDIATE_VALUE_CLASS; // NEW — AP-tailwind-02_slice-6
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
    triggerLabel.textContent = !isOpen ? 'Zwischenstand ausblenden' : 'Zwischenstand anzeigen'; // CHANGED — AP-tailwind-02_slice-6 (war: trigger.textContent)
    indicator.className = !isOpen ? FW_DISCLOSURE_INDICATOR_OPEN_CLASS : FW_DISCLOSURE_INDICATOR_CLOSED_CLASS; // NEW — AP-tailwind-02_slice-6
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
  // CHANGED — AP-prokrast-08b2: explizite State Machine statt Boolean+Measurement-Cache
  // (war: currentStationAnchorMeasurement + stationTransitionInProgress aus AP-08b).
  // Zustände: 'idle' | 'chart-revealing' | 'point-pulsing-ready' | 'card-flying' | 'next-card-entering'
  let journeyState = 'idle';

  function makeBtn(text, recipe) { // CHANGED — AP-tailwind-02_slice-4-manifest-fix: recipe ist ein fester Rezeptschlüssel, kein CSS-String
    const buttonClass = FW_BUTTON_RECIPES[recipe];
    if (!buttonClass) {
      throw new Error('Unbekanntes Button-Rezept.');
    }
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = text;
    btn.className = buttonClass;
    return btn;
  }

  // --- Screen 1 — Frage + Slider ---
  const screen1 = document.createElement('section');
  screen1.className = FW_SCREEN_CLASS; // CHANGED — AP-tailwind-02_slice-8
  screen1.dataset.fwScreen = '1';

  const h2S1 = document.createElement('h2');
  h2S1.className = FW_SCREEN_HEADLINE_CLASS; // CHANGED — AP-tailwind-02_slice-8
  h2S1.tabIndex = -1; // fokussierbar via JS, nicht im Tab-Ring
  h2S1.textContent = 'Vor 10 Jahren wäre besser gewesen. Was ist mit heute?';
  screen1.appendChild(h2S1);

  const subline = document.createElement('p');
  subline.className = 'fw-app__screen-subline';
  subline.textContent = 'Wir rechnen nicht mit Wunschwerten. Wir nehmen echte MSCI-World-Monatsdaten.';
  screen1.appendChild(subline);

  // Slider-Sektion (Slice 3 — Q-06: kein for/id wegen Mehrfach-Container)
  const sliderSection = document.createElement('div');
  sliderSection.className = FW_SLIDER_FIELD_CLASS; // CHANGED — AP-tailwind-02_slice-3
  const label = document.createElement('label');
  label.className = FW_SLIDER_LABEL_CLASS; // CHANGED — AP-tailwind-02_slice-3
  const labelText = document.createElement('span');
  labelText.className = FW_SLIDER_LABEL_TEXT_CLASS; // CHANGED — AP-tailwind-02_slice-3
  labelText.textContent = 'Ich spare monatlich';
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.className = FW_SLIDER_INPUT_CLASS; // CHANGED — AP-tailwind-02_slice-3
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
  valueDisplay.className = FW_SLIDER_VALUE_CLASS; // CHANGED — AP-tailwind-02_slice-3
  valueDisplay.setAttribute('aria-hidden', 'true');
  valueDisplay.textContent = initialRate + ' €/Monat';
  label.appendChild(labelText);
  label.appendChild(slider);
  label.appendChild(valueDisplay);
  sliderSection.appendChild(label);
  screen1.appendChild(sliderSection);

  const btnS1Next = makeBtn('10 Jahre zurückspringen', 'next'); // CHANGED — AP-14 (war: 'Weiter →')
  screen1.appendChild(btnS1Next);

  // --- Screen 2 — Stationen-Zeitreise (CHANGED — AP-14: war KpiCards + Chart) ---
  const screen2 = document.createElement('section');
  screen2.className = FW_SCREEN_CLASS; // CHANGED — AP-tailwind-02_slice-8
  screen2.dataset.fwScreen = '2';
  screen2.setAttribute('hidden', '');

  const h2S2 = document.createElement('h2');
  h2S2.className = FW_SCREEN_HEADLINE_CLASS; // CHANGED — AP-tailwind-02_slice-8
  h2S2.tabIndex = -1;
  h2S2.textContent = 'Im Rückblick sieht es klar aus. In Echtzeit war es eine Entscheidung.'; // CHANGED — AP-14
  screen2.appendChild(h2S2);

  const stationArea = document.createElement('section'); // CHANGED — AP-tailwind-02_slice-5 (war: div, §6.2 Panel)
  stationArea.className = FW_STATION_PANEL_CLASS;
  screen2.appendChild(stationArea);

  const chartSection2 = document.createElement('div'); // CHANGED — AP-14: nur visibleChartSeries
  chartSection2.setAttribute('data-fw-appchart', 'sparplan-s2');
  chartSection2.className = FW_CHART_SLOT_CLASS; // CHANGED — AP-tailwind-02_slice-7
  screen2.appendChild(chartSection2);

  // NEW — AP-14b: Orientierungs-Chip (APP_SPEC §16.1)
  const progressEl = document.createElement('p');
  progressEl.className = FW_JOURNEY_PROGRESS_CLASS; // CHANGED — AP-tailwind-02_slice-5
  screen2.appendChild(progressEl);

  const journeyBtn = makeBtn('', 'journey'); // NEW — AP-14: Text wird in renderJourneyStep gesetzt
  screen2.appendChild(journeyBtn);

  // --- Screen 3 — Heute (Chart ohne VertikaleLinie — TODO Slice 6) ---
  const screen3 = document.createElement('section');
  screen3.className = FW_SCREEN_CLASS; // CHANGED — AP-tailwind-02_slice-8
  screen3.dataset.fwScreen = '3';
  screen3.setAttribute('hidden', '');

  const h2S3 = document.createElement('h2');
  h2S3.className = FW_SCREEN_HEADLINE_CLASS; // CHANGED — AP-tailwind-02_slice-8
  h2S3.tabIndex = -1;
  h2S3.textContent = 'Jetzt erst sieht es einfach aus.'; // CHANGED — AP-14 (APP_SPEC §16.2; war: 'Vor 10 Jahren ist weg. Heute nicht.')
  screen3.appendChild(h2S3);

  const sublineS3 = document.createElement('p'); // NEW — Slice 6
  sublineS3.className = 'fw-app__screen-subline';
  sublineS3.textContent = 'Die Strecke wirkt im Rückblick ruhiger, weil du das Ende jetzt kennst. Vor 10 Jahren kannte sie niemand.'; // CHANGED — B1-AP-16b (APP_SPEC §16.2)
  screen3.appendChild(sublineS3);

  const chartSection3 = document.createElement('div');
  chartSection3.setAttribute('data-fw-appchart', 'sparplan-s3'); // CHANGED — Slice 6: VertikaleLinie via features
  chartSection3.className = FW_CHART_SLOT_CLASS; // CHANGED — AP-tailwind-02_slice-7
  // CHANGED — AP-prokrast-10b (Kontinuitäts-Reveal): kein hidden mehr — Chart erscheint
  // beim Screen-3-Eintritt sofort vollständig und still (kein Zwischenframe, keine
  // Kurslinien-Neuaufbauanimation). Nur Bridge/KPI/Disclaimer sind gestuft (s.u.).
  screen3.appendChild(chartSection3);

  // NEW — AP-prokrast-10b: Kontinuitäts-Bridge — zeigt beim Screen-3-Eintritt zunächst
  // denselben Zeilentext wie die letzte Screen-2-Stationszeile (formatStationProgress()),
  // damit der Übergang wie eine Fortsetzung wirkt statt wie ein Neustart. Kein Verschieben
  // von progressEl — eigenes, Screen-3-lokales Element an derselben unteren Stelle, wo
  // danach KPI-Karten + Disclaimer erscheinen.
  const bridgeS3 = document.createElement('p');
  bridgeS3.className = FW_SCREEN3_BRIDGE_CLASS; // CHANGED — AP-tailwind-02_slice-5
  bridgeS3.setAttribute('hidden', ''); // NEW — AP-prokrast-10b: startet hidden (kein Text vor erstem Reveal), analog KPI/Disclaimer
  screen3.appendChild(bridgeS3);

  const kpiContainerS3 = document.createElement('div'); // NEW — B1-AP-16b: KPI-Mount-Point (APP_SPEC §6, §23.6)
  kpiContainerS3.className = 'fw-app__kpi-slot';
  kpiContainerS3.setAttribute('hidden', ''); // NEW — AP-prokrast-10b: startet hidden, erscheint erst nach der Bridge-Phase
  screen3.appendChild(kpiContainerS3);

  const assumptionsS3 = document.createElement('aside'); // NEW — Slice 6: AssumptionsBox (APP_SPEC §19.8)
  assumptionsS3.className = FW_ASSUMPTIONS_CLASS; // CHANGED — AP-tailwind-02_slice-6
  assumptionsS3.textContent = 'Basis: MSCI World Index, monatliche Indexwerte, 10 Jahre rückwärts bis zum letzten vollständig verfügbaren Monat. Die Werte zeigen das Marktprinzip, keine konkrete ETF-Produktempfehlung. Vergangene Wertentwicklungen sind keine Garantie für die Zukunft. Keine Finanzberatung.';
  assumptionsS3.setAttribute('hidden', ''); // NEW — AP-prokrast-10b: startet hidden, erscheint zusammen mit KPI nach der Bridge-Phase
  screen3.appendChild(assumptionsS3);

  const navS3 = document.createElement('div');
  navS3.className = FW_SCREEN_NAV_CLASS; // CHANGED — AP-tailwind-02_slice-8
  const btnS3Prev = makeBtn('← Zurück', 'prev');
  const btnS3Next = makeBtn('Meine nächsten 10 Jahre starten', 'next'); // CHANGED — B1-AP-16b (E-04)
  navS3.appendChild(btnS3Prev);
  navS3.appendChild(btnS3Next);
  screen3.appendChild(navS3);

  // --- Screen 4 — Rubikon (stehender Zustand, CHANGED — AP-prokrast-03h: kein Morph mehr) ---
  const screen4 = document.createElement('section');
  screen4.className = FW_SCREEN_CLASS; // CHANGED — AP-tailwind-02_slice-8
  screen4.dataset.fwScreen = '4';
  screen4.setAttribute('hidden', '');

  const h2S4 = document.createElement('h2');
  h2S4.className = FW_SCREEN_HEADLINE_CLASS; // CHANGED — AP-tailwind-02_slice-8
  h2S4.tabIndex = -1;
  h2S4.textContent = 'Heute beginnt wieder ein Chart, dessen Ende niemand kennt.'; // CHANGED — B1-AP-16c (APP_SPEC §16.2)
  screen4.appendChild(h2S4);

  const chartSection4 = document.createElement('div'); // NEW — AP-prokrast-03f: Rubikon-Chart
  chartSection4.setAttribute('data-fw-appchart', 'sparplan-s4');
  chartSection4.className = FW_CHART_SLOT_CLASS; // CHANGED — AP-tailwind-02_slice-7

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
  cta.className = FW_CTA_CLASS; // CHANGED — AP-tailwind-02_slice-4
  cta.href = '';
  cta.textContent = 'Heute Marktzeit sammeln →';
  cta.setAttribute('hidden', ''); // CHANGED — AP-prokrast-03h: CTA erst nach Text + weiterer 800ms-Stille sichtbar
  screen4.appendChild(cta);

  const navS4 = document.createElement('div');
  navS4.className = FW_SCREEN_NAV_CLASS; // CHANGED — AP-tailwind-02_slice-8
  const btnS4Prev = makeBtn('← Zurück', 'prev');
  navS4.appendChild(btnS4Prev);
  screen4.appendChild(navS4);

  [screen1, screen2, screen3, screen4].forEach(s => container.appendChild(s));

  // ARIA Live Region (APP_SPEC §12.1)
  const a11yRegion = document.createElement('div');
  a11yRegion.setAttribute('aria-live', 'polite');
  a11yRegion.setAttribute('aria-atomic', 'true');
  a11yRegion.dataset.fwRole = 'a11y-result';
  a11yRegion.className = FW_A11Y_LIVE_REGION_CLASS; // CHANGED — AP-tailwind-02_slice-6
  container.appendChild(a11yRegion);

  // CHANGED — AP-14: Chart-Engines; lastRenderedRateS2 entfernt (orphaned by AP-14)
  const chartEngine2 = new ChartEngine();
  const chartEngine3 = new ChartEngine();
  const chartEngine4 = new ChartEngine(); // NEW — AP-prokrast-03f
  let screen3RevealedRate = null; // CHANGED — AP-prokrast-10b (war: lastRenderedRateS3): Rate, für die Screen 3 zuletzt vollständig enthüllt wurde (Bridge→KPI/Disclaimer)
  let screen3BridgeTimer = null; // CHANGED — AP-prokrast-10b Kontinuitäts-Reveal (war: screen3ChartTimer + screen3KpiTimer): einziger Timer für die Bridge-Haltephase vor KPI/Disclaimer
  let lastRevealA11yText = ''; // NEW — AP-17b
  let screen4TextTimer = null; // CHANGED — AP-prokrast-03h (war: screen4Timer, ein Morph-Timer): Timer für Text-Reveal nach 800ms
  let screen4CtaTimer = null; // NEW — AP-prokrast-03h: Timer für CTA-Reveal nach weiterer 800ms-Stille
  let screen4RevealedRate = null; // Rate, für die S4 zuletzt final gerendert wurde (analog screen3RevealedRate)
  const RUBIKON_A11Y_TEXT = 'Die letzten zehn Jahre sind gelaufen. Die nächsten zehn Jahre sind bewusst leer, weil niemand weiß, was passiert. Der Handlungsrahmen ist: dranbleiben, wenn es nervt.'; // CHANGED — AP-prokrast-03h

  // NEW — AP-prokrast-08b4a: Chart-Teil von renderJourneyStep() aufgetrennt — kein
  // Karten-DOM-Update, kein Progress-Chip, kein Button-Text, keine Live-Region. Grund:
  // Gate-5-Befund aus AP-08b4/08b4a — enterNextCard() rief bisher das gekoppelte
  // renderJourneyStep() auf, wodurch der Chart-Wachstum auf Station X+1 UNGEGATED lief,
  // während die neue Karte X+1 schon sichtbar war (Chart baute sich sichtbar hinter der
  // bereits neuen Karte auf). Mit dieser Trennung kann der Chart-Teil für X+1 zuerst per
  // chartSettled abgewartet werden, bevor die Karte X+1 erscheint (s. enterNextCard()).
  // options.chartSettled ist optional — ohne sie verhält sich dieser Aufruf identisch zum
  // bisherigen "idle"-Rendering (kein Gate nötig, da dabei keine Karte in Konkurrenz steht).
  // anchorMeasurement bleibt IMMER aktiv (No-op-Bootstrap, Gate 2 aus AP-08b4a: HÄRTEN,
  // nicht ersetzt — s. Ergebnisprotokoll AP-prokrast-08b4a für Begründung und Folgepflicht).
  function renderJourneyChartOnly(stationIdx, renderOptions) {
    const station      = journeyStations[stationIdx];
    const stationMonth  = station.date.slice(0, 7); // 'YYYY-MM'
    const ctx           = buildAppContext(appData, currentRate, startBetrag, journeyStations);
    const visibleSeries = buildVisibleChartSeries(ctx.chartSeries, stationMonth);
    const journeyRangeKey = [currentRate, ctx.startMonth, ctx.latestMonth].join('|'); // NEW — AP-14b3
    const journeyAnnotations = buildJourneyStationAnnotations(journeyStations.slice(0, stationIdx), visibleSeries); // NEW — B1-AP-14c1
    const lastPoint = visibleSeries[visibleSeries.length - 1]; // NEW — AP-prokrast-08b2 (Bugfix): Anker-Bootstrap, s. Kommentar oben
    chartEngine2.renderFromData(chartSection2, visibleSeries, { // CHANGED — AP-14b3
      type: 'line',
      features: { rangeControls: false, headline: false },
      xDisplayRange: { min: ctx.startMonth, max: ctx.latestMonth },
      yRangePolicy: 'cumulative-expand-zero',
      yRangeResetKey: journeyRangeKey,
      annotations: { events: journeyAnnotations }, // NEW — B1-AP-14c1
      annotationPulse: { enabled: true, mode: 'newly-added' }, // NEW — B1-AP-14c4
      anchorMeasurement: {
        enabled: true,
        anchors: [{ id: station.id, x: new Date(stationMonth + '-01').getTime(), y: lastPoint.depotwert }],
        onAnchorMeasurement: () => {}
      },
      // NEW — AP-prokrast-08b4a: optionales Chart-Settled-Gate für diesen Aufruf — wird von
      // enterNextCard() gesetzt (Zyklus 2), bleibt bei der einfachen "idle"-Nutzung (Screen-2-
      // Ersteintritt) unbenutzt, da dort keine Karte auf dieses Signal wartet.
      ...(renderOptions?.chartSettled ? { chartSettled: renderOptions.chartSettled } : {}),
      // NEW — AP-prokrast-08b5: Screen-2-Journey-Chart rendert instant/final, kein Chart.js-
      // Default-Tweening — der Chart ist hier nur der ruhige Kontext, die semantische
      // Bewegung übernehmen Pulse + Card-to-Point (nicht das Wachsen/Einschwingen der Linie).
      // Gilt für jeden Aufruf dieser Funktion (Ersteintritt UND Zyklus-2-Übergang), da
      // renderJourneyChartOnly() ausschließlich Teil der Screen-2-Journey-Choreografie ist.
      renderMotion: { mode: 'instant' }
    });
  }

  // NEW — AP-prokrast-10b: „Station X von Y · Bekannt bis Z" — extrahiert aus
  // renderJourneyCardOnly() (war dort inline), damit Screen 2 (progressEl) und der neue
  // Screen-3-Bridge-Text (bridgeS3) dieselbe Formel nutzen, ohne sie zu duplizieren.
  function formatStationProgress(stationIdx) {
    const station = journeyStations[stationIdx];
    const n = stationIdx + 1;
    const total = journeyStations.length;
    const [yr, mo] = station.date.split('-');
    const bekannt = new Intl.DateTimeFormat(appData.locale, { month: 'long', year: 'numeric' })
      .format(new Date(parseInt(yr, 10), parseInt(mo, 10) - 1, 1));
    return `Station ${n} von ${total} · Bekannt bis ${bekannt}`;
  }

  // NEW — AP-prokrast-08b4a: Karten-/Chip-/Button-/Live-Region-Teil von renderJourneyStep()
  // aufgetrennt — keine Chart-Berührung. Wird von renderJourneyStep() (idle-Fall) und von
  // enterNextCard() (erst NACH chartSettled für die neue Station) genutzt.
  function renderJourneyCardOnly(stationIdx) {
    const station     = journeyStations[stationIdx];
    const stationMonth = station.date.slice(0, 7);
    const ctx         = buildAppContext(appData, currentRate, startBetrag, journeyStations);
    const fmtStation  = new Intl.NumberFormat(appData.locale, {
      style: 'currency', currency: 'EUR', maximumFractionDigits: 0
    });
    const intermediate = calcStationIntermediate(ctx.chartSeries, stationMonth, currentRate, startBetrag);
    renderStationCard(stationArea, station, intermediate, fmtStation);
    progressEl.textContent = formatStationProgress(stationIdx); // CHANGED — AP-prokrast-10b (war: inline berechnet)
    journeyBtn.textContent = station.isFinalReveal ? 'Ergebnis ansehen' : 'Weiter investiert bleiben'; // CHANGED — B1-STATIONS-v3.0
    a11yRegion.textContent = station.headline; // stationLiveMessage — kein Endwissen (APP_SPEC §14.1)
  }

  // NEW — AP-14: Zeitreise-Schritt rendern (ersetzt renderS2)
  // Kein Endwissen: nur Stations-Daten bis stationMonth sichtbar (APP_SPEC §14.1)
  // CHANGED — AP-prokrast-08b4a: reine Kombination aus Chart- und Karten-Teil, ohne Gate —
  // für den "idle"-Fall (Screen-2-Ersteintritt), bei dem keine Karte auf ein Chart-Settled-
  // Signal wartet. Der gegatete Übergang X→X+1 läuft über enterNextCard() (Klick-Handler).
  function renderJourneyStep(stationIdx) {
    renderJourneyChartOnly(stationIdx);
    renderJourneyCardOnly(stationIdx);
  }

  // CHANGED — AP-prokrast-10b (Kontinuitäts-Reveal): reine Chart-Berechnung/-Rendering,
  // inklusive Ergebnis-/Endlinie (features.verticalLine:'last', bestehende Option). Läuft
  // synchron und sofort beim Screen-3-Eintritt (s. revealScreen3()) — kein separates Timing
  // für den Chart selbst, da FwVerticalLinePlugin die Linie statisch bei jedem afterDraw an
  // der aktuellen X-Position zeichnet und keine eigene Animationsfähigkeit besitzt (geprüft
  // am realen Plugin-Code). Ein zweiter renderFromData()-Aufruf könnte die Linie ohnehin nicht
  // nachträglich aktivieren — ChartEngine._draw() liest .plugins nur beim allerersten
  // new Chart()-Aufruf, nie im Update-Pfad (state.chartInstance.update() ändert nur
  // .data/.options). Deshalb: Linie von Anfang an registrieren, Chart komplett und still.
  function renderS3(rate) {
    const ctx = buildAppContext(appData, rate, startBetrag, journeyStations); // CHANGED — AP-13
    const revealAnnotations = buildJourneyStationAnnotations(journeyStations, ctx.chartSeries); // NEW — B1-AP-14c3
    chartEngine3.renderFromData(chartSection3, ctx.chartSeries, {
      type: 'line', features: { rangeControls: false, headline: false, verticalLine: 'last' },
      annotations: { events: revealAnnotations }, // NEW — B1-AP-14c3
      // NEW — AP-prokrast-10b: instant/final — kein Chart.js-Default-Tweening. Die Linie war
      // am Ende von Screen 2 (letzte, synthetische Station = letzter Datenmonat) bereits
      // vollständig sichtbar; ein erneutes Einschwingen hier wäre eine "Kurslinien-Neuauf-
      // bauanimation", die der Kontinuitäts-Reveal ausdrücklich vermeiden soll.
      renderMotion: { mode: 'instant' }
    });
    return ctx; // CHANGED — AP-14: ctx für revealA11ySummary in revealScreen3()
  }

  // CHANGED — AP-prokrast-10b (Nachsteuerung, Variante B++ — Kontinuitäts-Reveal statt
  // Text→Chart→KPI-Timing-Reveal): Chart + Ergebnis-/Endlinie erscheinen beim Screen-3-
  // Eintritt sofort, vollständig und still (kein hidden/Fade auf dem Chart mehr — s.
  // renderS3()). Nur der untere Bereich ist gestuft: ein Screen-3-lokales Bridge-Element
  // („Station X von Y · Bekannt bis Z", dieselbe Formel wie Screen 2s progressEl, s.
  // formatStationProgress()) zeigt zunächst dieselbe Zeile wie der letzte Screen-2-Zustand,
  // bevor es nach einer kurzen Haltephase durch KPI-Karten + Disclaimer ersetzt wird. Kein
  // Verschieben von progressEl, keine Screen-2-Änderung. Kein Replay, solange currentRate
  // unverändert (analog screen4RevealedRate). Reduced Motion: kein Timer, Bridge bleibt
  // unsichtbar, KPI/Disclaimer sofort im Endzustand.
  function revealScreen3(rate) {
    if (screen3BridgeTimer) { clearTimeout(screen3BridgeTimer); screen3BridgeTimer = null; }

    if (screen3RevealedRate === rate) {
      if (lastRevealA11yText) a11yRegion.textContent = lastRevealA11yText; // erneute Ansage bei Rückkehr, analog Screen 4
      return;
    }

    const ctx = renderS3(rate); // Chart + Ergebnislinie sofort, vollständig, still

    // Neue Rate oder Ersteintritt: KPI/Disclaimer wieder in den Ausgangszustand versetzen
    kpiContainerS3.setAttribute('hidden', '');
    kpiContainerS3.classList.remove('fw-app__screen3-reveal--visible');
    kpiContainerS3.textContent = ''; // alte KPI-Karten aus vorherigem Reveal entfernen
    assumptionsS3.setAttribute('hidden', '');
    assumptionsS3.classList.remove('fw-app__screen3-reveal--visible');

    const reduced = prefersReducedMotion();

    function revealResult() {
      screen3BridgeTimer = null;
      bridgeS3.setAttribute('hidden', ''); // Bridge ausblenden (kein eigener Fade-out nötig)
      renderKpiCards(kpiContainerS3, ctx); // NEW — B1-AP-16b: KPI-Cards (APP_SPEC §6, §23.6)
      kpiContainerS3.removeAttribute('hidden');
      assumptionsS3.removeAttribute('hidden');
      if (reduced) {
        kpiContainerS3.classList.add('fw-app__screen3-reveal--visible');
        assumptionsS3.classList.add('fw-app__screen3-reveal--visible');
      } else {
        requestAnimationFrame(() => {
          kpiContainerS3.classList.add('fw-app__screen3-reveal--visible');
          assumptionsS3.classList.add('fw-app__screen3-reveal--visible');
        });
      }

      // ERST HIER: erstes Endwissen für Screenreader (APP_SPEC §14.1 revealA11ySummary) —
      // Ansage fällt zeitlich mit dem sichtbaren KPI-/Disclaimer-Reveal zusammen
      const fmtReveal = new Intl.NumberFormat(appData.locale, {
        style: 'currency', currency: 'EUR', maximumFractionDigits: 0
      });
      lastRevealA11yText = `Wer vor 10 Jahren ${rate} € monatlich investiert hätte, hätte heute ${fmtReveal.format(ctx.depotwertHeute)} — bei ${fmtReveal.format(ctx.eingezahlt)} eingezahlt.`; // CHANGED — AP-17b
      a11yRegion.textContent = lastRevealA11yText;

      screen3RevealedRate = rate;
    }

    if (reduced) {
      bridgeS3.setAttribute('hidden', ''); // kein Zwischenzustand sichtbar bei Reduced Motion
      revealResult();
    } else {
      bridgeS3.textContent = formatStationProgress(activeStationIndex); // Kontinuität zur letzten Screen-2-Zeile
      bridgeS3.removeAttribute('hidden');
      screen3BridgeTimer = setTimeout(revealResult, 800);
    }
  }

  // CHANGED — AP-prokrast-03h: kein Morph mehr. Screen 4 rendert den finalen 20-Jahres-Rubikon-Zustand
  // in einem einzigen renderFromData()-Aufruf — links echte Vergangenheit, Mitte Rubikon/Heute
  // (FwVerticalLinePlugin), rechts leerer Zukunftsraum (kein Zukunftspunkt, kein Dummy, kein zweites
  // Dataset). Der semantische Haupttext steht ausschließlich im DOM (`rubikonText`); die Canvas-Marker
  // (FwChartTextPlugin, RubikonSymbolMarkers) sind rein dekorativ und tragen keine eigene Erklärungslast.
  function renderScreen4Chart() {
    const ctx = buildAppContext(appData, currentRate, startBetrag, journeyStations);
    chartEngine4.renderFromData(chartSection4, ctx.chartSeries, {
      type: 'line',
      features: { rangeControls: false, headline: false, verticalLine: 'last' },
      xDisplayRange: { min: ctx.startMonth, max: addMonths(ctx.latestMonth, 119) },
      // NEW — AP-prokrast-07a: RubikonSymbolMarkers — ✅ links / ❓ rechts der blauen Rubikon-Linie.
      // anchor:'lastPoint' bindet beide an denselben Datenpunkt wie FwVerticalLinePlugin (dataset 0,
      // verticalLine:'last') — keine zweite, divergierende Zeitberechnung.
      chartText: {
        enabled: true,
        annotations: [
          { text: '✅', anchor: 'lastPoint', offsetX: -14, y: 0.08, align: 'right' },
          { text: '❓', anchor: 'lastPoint', offsetX: 14,  y: 0.08, align: 'left'  }
        ]
      }
    });
  }

  // CHANGED — AP-prokrast-03h: Beat-Sequenz für den stehenden Rubikon-Screen —
  // Chart sofort final, 800ms Stille, DOM-Text erscheint (genau eine aria-live-Aktualisierung),
  // 800ms Stille, CTA erscheint. Kein Replay, solange currentRate unverändert (analog screen3RevealedRate).
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
    if (n !== 3) { // CHANGED — AP-prokrast-10b (war: zwei Timer): kein Bridge-Reveal-Timer darf in einem versteckten Screen 3 feuern
      if (screen3BridgeTimer) { clearTimeout(screen3BridgeTimer); screen3BridgeTimer = null; }
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
    if (n === 3) revealScreen3(currentRate); // CHANGED — AP-prokrast-10b Kontinuitäts-Reveal (war: Text→Chart→KPI-Timing-Reveal)
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

  // NEW — AP-prokrast-08b2/08b3: Chart-Reveal VOR dem Card-Flight. Aktualisiert den Chart auf
  // denselben Datenstand wie renderJourneyStep(stationIdx), aber mit der aktuellen Station
  // bereits als (pulsierende) Vergangenheits-Annotation eingeschleust — ihr Zielpunkt muss
  // final sichtbar/pulsierend existieren, BEVOR die Karte dorthin fliegen darf (Klick →
  // Chart-Reveal → Chart-Settled → Pulse/Punkt final → Card-Flight → nächste Karte).
  // Card/Progress/Button bleiben unverändert stehen — nur der Chart wird hier aktualisiert.
  // CHANGED — AP-prokrast-08b3: onPointReady wird NICHT mehr direkt aus dem
  // AnchorMeasurement-Callback aufgerufen (measurement.visible === true beweist nur, dass der
  // Punkt in der ChartArea liegt — afterDraw feuert auch während einer noch laufenden
  // Chart.js-Animation, s. Ergebnisprotokoll „Ausgangsproblem"). Stattdessen wird die zuletzt
  // gemeldete Messung nur zwischengespeichert; erst wenn chartSettled (Chart.js'
  // animation.onComplete, von der ChartEngine vermittelt) meldet, dass die Update-Animation
  // für diesen Zyklus abgeschlossen ist, wird die Messung als verbindlich behandelt und
  // onPointReady aufgerufen (mit Messung oder — falls keine gültige vorliegt — mit null als
  // ruhigem Fallback, nie mit einem Flug ins Nirgendwo).
  function revealCurrentStationPoint(stationIdx, onPointReady) {
    const station = journeyStations[stationIdx];
    const stationMonth = station.date.slice(0, 7);
    const targetAnchorId = station.id; // NEW — AP-prokrast-08b3: explizite Anchor-Zielregel
    const ctx = buildAppContext(appData, currentRate, startBetrag, journeyStations);
    const visibleSeries = buildVisibleChartSeries(ctx.chartSeries, stationMonth);
    const journeyRangeKey = [currentRate, ctx.startMonth, ctx.latestMonth].join('|');
    // CHANGED — AP-prokrast-08b2 (war: slice(0, stationIdx) in renderJourneyStep): die aktuelle
    // Station wird HIER bereits als Vergangenheits-Annotation eingeschleust, damit ihr Punkt
    // als "newly-added" erkannt wird und pulst (FwAnnotationPulsePlugin, unverändert).
    const annotationsIncludingCurrent = buildJourneyStationAnnotations(journeyStations.slice(0, stationIdx + 1), visibleSeries);
    const lastPoint = visibleSeries[visibleSeries.length - 1];

    let latestMeasurement = null; // NEW — AP-prokrast-08b3: nur Zwischenspeicher, erst bei chartSettled verbindlich

    chartEngine2.renderFromData(chartSection2, visibleSeries, {
      type: 'line',
      features: { rangeControls: false, headline: false },
      xDisplayRange: { min: ctx.startMonth, max: ctx.latestMonth },
      yRangePolicy: 'cumulative-expand-zero',
      yRangeResetKey: journeyRangeKey,
      annotations: { events: annotationsIncludingCurrent },
      annotationPulse: { enabled: true, mode: 'newly-added' },
      // NEW — AP-prokrast-08b2/08b3: misst denselben Punkt, der jetzt pulst. Der Callback
      // speichert nur zwischen — er entscheidet NICHT mehr selbst über den Flugstart
      // (das war der AP-08b3-Fehler: afterDraw feuert auch mid-Animation).
      anchorMeasurement: {
        enabled: true,
        anchors: [{ id: targetAnchorId, x: new Date(stationMonth + '-01').getTime(), y: lastPoint.depotwert }],
        onAnchorMeasurement: (measurements) => {
          latestMeasurement = measurements.find(mm => mm.id === targetAnchorId) || null;
        }
      },
      // NEW — AP-prokrast-08b3: Chart-Settled-Gate. onSettled feuert erst, wenn Chart.js seine
      // Update-Animation für diesen Zyklus abgeschlossen hat (oder synchron bei Reduced
      // Motion) — s. ChartEngine.js _emitChartSettled(). Erst dann zählt die zuletzt
      // gemeldete Messung als verbindlich.
      chartSettled: {
        enabled: true,
        onSettled: () => {
          const m = latestMeasurement;
          if (m && m.id === targetAnchorId && m.visible) {
            onPointReady(m);
          } else {
            onPointReady(null); // ruhiger Fallback — kein Flug ohne verbindliches, finales Ziel
          }
        }
      },
      // NEW — AP-prokrast-08b5: instant/final statt Chart.js-Default-Tweening — der pulsierende
      // Punkt X muss sofort an seiner finalen Position stehen, nicht während des Chart.js-
      // Einschwingens gemessen werden. chartSettled feuert dadurch synchron (s. ChartEngine.js),
      // was auch die vorherige Race-Condition-Klasse (mid-Animation-Messung) strukturell entschärft.
      renderMotion: { mode: 'instant' }
    });
  }

  // NEW — AP-prokrast-08b (Nachtrag): liest den zentralen Fluggeschwindigkeits-Schalter
  // (--fw-card-to-point-flight-duration, auf .fw-app) aus. Einzige Stelle, die CSS-Transition
  // und JS-Timing synchron hält — Nachjustieren braucht nur eine Änderung in app.css.
  function getFlightDurationMs() {
    const raw = getComputedStyle(container).getPropertyValue('--fw-card-to-point-flight-duration').trim();
    const n = parseFloat(raw);
    if (!Number.isFinite(n)) return 450; // Fallback, falls CSS-Variable fehlt
    const isSecondsUnit = raw.endsWith('s') && !raw.endsWith('ms'); // "0.45s" vs. "450ms"
    return isSecondsUnit ? n * 1000 : n;
  }

  // NEW — AP-prokrast-08b: Card-to-Point — visueller Flug-Clone (Beat A). Die echte Karte
  // bleibt während des Flugs unverändert im DOM sichtbar (semantische Quelle, kein Fokus-/
  // Live-Region-/Tastatur-Risiko, da sich am realen DOM währenddessen nichts ändert). Erst
  // nach Ablauf der Fluganimation ruft der Aufrufer onComplete() — Zielpunkt/Pulse (Beat B)
  // und die nächste Station (Beat C) rendern gemeinsam erst danach (renderJourneyStep()).
  function flyCardToPoint(measurement, onComplete) {
    const originRectAbs = stationArea.getBoundingClientRect();
    const chartRectAbs  = chartSection2.getBoundingClientRect();
    const screenRectAbs = screen2.getBoundingClientRect();

    const originLeft = originRectAbs.left - screenRectAbs.left;
    const originTop  = originRectAbs.top  - screenRectAbs.top;
    const chartLeft  = chartRectAbs.left  - screenRectAbs.left;
    const chartTop   = chartRectAbs.top   - screenRectAbs.top;

    const targetX = chartLeft + measurement.x;
    const targetY = chartTop  + measurement.y;
    const originCenterX = originLeft + originRectAbs.width / 2;
    const originCenterY = originTop  + originRectAbs.height / 2;

    // Klon: rein visuell, semantisch unsichtbar — echte Karte bleibt unverändert stehen
    const clone = stationArea.cloneNode(true);
    clone.removeAttribute('id');
    clone.setAttribute('aria-hidden', 'true');
    clone.setAttribute('inert', '');
    clone.classList.add('fw-app__station-area--flight-clone');
    clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id')); // keine doppelten IDs während der Überlappung
    clone.querySelectorAll('[aria-controls]').forEach(el => el.removeAttribute('aria-controls'));
    clone.querySelectorAll('button, [tabindex]').forEach(el => {
      el.setAttribute('tabindex', '-1');
      if (el.tagName === 'BUTTON') el.disabled = true;
    });
    clone.style.left = originLeft + 'px';
    clone.style.top = originTop + 'px';
    clone.style.width = originRectAbs.width + 'px';
    clone.style.setProperty('--fw-flight-delta-x', (targetX - originCenterX) + 'px');
    clone.style.setProperty('--fw-flight-delta-y', (targetY - originCenterY) + 'px');
    screen2.appendChild(clone);

    requestAnimationFrame(() => {
      clone.classList.add('fw-app__station-area--flight-active');
    });

    // CHANGED — AP-prokrast-08b (Nachtrag): Timeout folgt dem zentralen Schalter
    // (--fw-card-to-point-flight-duration) statt eines hart verdrahteten Werts —
    // verhindert Drift zwischen CSS-Transition-Dauer und JS-Timing.
    setTimeout(() => {
      clone.remove();
      onComplete();
    }, getFlightDurationMs() + 20); // kleiner Puffer über der CSS-Transition-Dauer
  }

  // NEW — AP-prokrast-08b3/08b4a: Journey-Button-State-Machine, zwei gegatete Render-Zyklen
  // pro Klick — idle → chart-revealing → chart-settled → point-ready-final → (card-flying →)
  // next-chart-revealing → next-card-entering → idle.
  // CHANGED — AP-prokrast-08b3 (war: point-pulsing-ready direkt nach erstem visible
  // measurement, AP-08b2): Der Flug darf erst starten, wenn der Chart TATSÄCHLICH final
  // steht (Chart-Settled-Gate aus revealCurrentStationPoint(), s.d.), nicht schon beim ersten
  // measurement.visible === true — das bewies nur "Punkt liegt in der ChartArea", nicht
  // "Chart-Animation ist fertig". Reduced Motion überspringt nur card-flying, nie die
  // kausale Reihenfolge (Chart/Punkt erscheinen in jedem Fall zuerst, final, vor der Karte).
  // CHANGED — AP-prokrast-08b4a: zweiter Render-Zyklus (Chart-Wachstum auf die neue Station
  // X+1 nach dem Flug) war bis hierhin ungegated (Gate-5-Befund) — enterNextCard() ist jetzt
  // selbst ein kleiner gegateter Zyklus (next-chart-revealing → next-card-entering), der
  // denselben chartSettled-Contract wiederverwendet wie Zyklus 1.
  journeyBtn.addEventListener('click', () => {
    const isLast = activeStationIndex === journeyStations.length - 1;
    if (isLast) {
      showScreen(3, true);
      return;
    }
    if (journeyState !== 'idle') return; // Schutz gegen non-idle-Klicks (kein Button-Disable, kein Fokusverlust-Risiko)

    let pointReadyHandled = false; // Schutz gegen Mehrfachaufrufe von handlePointReady (Settled-Signal + Fallback-Timer)
    let fallbackTimer = null;
    journeyState = 'chart-revealing';

    // CHANGED — AP-prokrast-08b4a: Gate-5-Fix (AP-08b4/08b4a-Befund) — der Chart-Wachstum auf
    // die neue Station X+1 lief bisher UNGEGATED (renderJourneyStep() rief Chart+Karte
    // gekoppelt auf), wodurch der Chart sich sichtbar hinter der bereits neuen Karte X+1
    // aufbaute. Jetzt: Chart-Teil für X+1 zuerst (renderJourneyChartOnly, mit eigenem
    // chartSettled-Gate, derselbe Contract wie Zyklus 1 aus revealCurrentStationPoint()),
    // Karten-Teil (renderJourneyCardOnly) erst danach. Kein neuer Mechanismus — Wieder-
    // verwendung des bestehenden chartSettled-Contracts aus AP-08b3.
    function enterNextCard() {
      journeyState = 'next-chart-revealing';
      const nextIndex = activeStationIndex + 1;

      let nextSettledHandled = false; // Schutz gegen Mehrfachaufrufe, analog Zyklus 1
      let nextFallbackTimer = null;

      function finishNextCard() {
        if (nextSettledHandled) return;
        nextSettledHandled = true;
        if (nextFallbackTimer) { clearTimeout(nextFallbackTimer); nextFallbackTimer = null; }
        journeyState = 'next-card-entering';
        activeStationIndex = nextIndex;
        renderJourneyCardOnly(activeStationIndex);
        journeyState = 'idle';
        const h3 = stationArea.querySelector('h3'); // CHANGED — AP-17b: Fokus auf Stations-h3 (APP_SPEC §14.5 Variante B)
        (h3 ?? screen2.querySelector('h2'))?.focus();
      }

      // Sicherheitsnetz, analog Zyklus 1 (Begründung s. dort) — reiner Hängenbleibschutz,
      // kein primärer Sequenzmechanismus.
      nextFallbackTimer = setTimeout(finishNextCard, 1200);

      renderJourneyChartOnly(nextIndex, {
        chartSettled: { enabled: true, onSettled: finishNextCard }
      });
    }

    // CHANGED — AP-prokrast-08b3: wird erst aufgerufen, NACHDEM revealCurrentStationPoint()
    // intern bereits chartSettled + targetAnchorId + visible geprüft hat (s.d.) — measurement
    // ist hier entweder ein verbindliches, finales Ziel oder null (ruhiger Fallback).
    function handlePointReady(measurement) {
      if (pointReadyHandled) return;
      pointReadyHandled = true;
      if (fallbackTimer) { clearTimeout(fallbackTimer); fallbackTimer = null; }
      journeyState = 'chart-settled'; // Chart.js-Animation für diesen Zyklus ist abgeschlossen (oder Reduced-Motion-Sofortpfad)

      // NEW — AP-prokrast-08b2/08b3: Card-to-Point nur bei gemessenem, finalem, sichtbarem
      // Ziel und ohne Reduced Motion. Ohne gültiges Ziel (measurement === null, Fallback-Timeout) oder bei
      // Reduced Motion: ruhiger Übergang zur nächsten Station ohne Flug (Chart/Punkt sind
      // bereits sichtbar — kein Flug ins Nirgendwo, kein Steckenbleiben).
      if (!prefersReducedMotion() && measurement && measurement.visible) {
        journeyState = 'point-ready-final'; // NEW — AP-prokrast-08b3: Ziel ist final, gate-geprüft — Flug ist jetzt sicher
        journeyState = 'card-flying';
        flyCardToPoint(measurement, enterNextCard);
      } else {
        enterNextCard();
      }
    }

    // CHANGED — AP-prokrast-08b3: Sicherheitsnetz von 1500ms auf 1200ms gesenkt (Prüfauftrag
    // aus diesem AP) — bewusst NICHT auf 600–800ms, da Chart.js' Standard-Animationsdauer
    // (~1000ms, keine Strategie setzt hier eine kürzere) sonst das reale chartSettled-Signal
    // regelmäßig überholen und in jedem normalen Durchlauf fälschlich den Fallback statt des
    // echten Gates auslösen würde. Reines Hängenbleibschutz-Netz, kein primärer
    // Sequenzmechanismus — der Regelfall ist der chartSettled-Callback aus revealCurrentStationPoint().
    fallbackTimer = setTimeout(() => handlePointReady(null), 1200);

    revealCurrentStationPoint(activeStationIndex, handlePointReady);
  });

  // Slider-Events: kein live Chart-Update (Chart auf Screen 2, Slider auf Screen 1)
  slider.addEventListener('input', () => {
    const rate = clamp(parseInt(slider.value, 10), 50, 2000);
    slider.setAttribute('aria-valuenow', String(rate));
    slider.setAttribute('aria-valuetext', rate + ' Euro pro Monat');
    valueDisplay.textContent = rate + ' €/Monat';
    screen3RevealedRate = null; // CHANGED — AP-prokrast-10b (war: lastRenderedRateS3 = null) — Invalidiert für nächsten S3-Besuch
    // currentRate wird erst bei btnS1Next eingefroren — kein Update hier
  });
  // slider.change entfernt — AP-14: war Endwissens-Leak via a11yRegion (APP_SPEC §14.1)

  // Initiale Anzeige: Screen 1, kein Focus-Steal beim Laden
  showScreen(1, false);
}

// gibt { appData } bei Erfolg oder { error: 'b'|'c'|'empty', message } zurück
// CHANGED — Datenmigration: rawFilename ist der ungetrimmte Card-Rohwert (data-fw-data).
// Er geht zuerst durch resolveCsvAppDataFile() (keine .trim()-Kanonisierung); erst der
// aufgelöste, zentrale app-data-Pfad geht an CSVParser.parse(). Ungültiger/fehlender
// Dateiname bleibt Error (b) — CSV-Fehler wandern nie zu Error (d).
async function loadData(rawFilename) { // CHANGED — dünne Cache-Shell; Logik in _loadDataImpl (P-11)
  if (!rawFilename) {
    return { error: 'b', message: 'Daten konnten nicht geladen werden. Bitte Seite neu laden.' };
  }
  let url;
  try {
    url = resolveCsvAppDataFile(rawFilename);
  } catch (e) {
    console.error('[fw-app] loadData resolve error:', e);
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
// CHANGED — Datenmigration: rawFilename ist der ungetrimmte Card-Rohwert (data-fw-config).
// Er geht zuerst durch resolveJsonAppDataFile() (keine .trim()-Kanonisierung); erst der
// aufgelöste, zentrale app-data-Pfad geht an JSONParser.parse(). validateStationsJson bleibt
// die app-spezifische Fachvalidierung — JSONParser kennt keine Stationssemantik. Ungültiger/
// fehlender Dateiname, JSON-HTTP-, JSON-Parse- und JSON-Contract-Fehler sind alle Error (d).
async function loadStations(rawFilename) {
  if (!rawFilename) {
    return { error: 'd', message: 'Die Zeitreise kann gerade nicht geladen werden.' };
  }
  let url;
  try {
    url = resolveJsonAppDataFile(rawFilename);
  } catch (e) {
    console.error('[fw-app] loadStations resolve error:', e);
    return { error: 'd', message: 'Die Zeitreise kann gerade nicht geladen werden.' };
  }
  try {
    const parser = new JSONParser();
    const vault = await parser.parse(url, { validator: validateStationsJson });
    return { stationsConfig: vault.data };
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

    // CHANGED — Datenmigration: rohe Card-Werte ungetrimmt an die Loader — die Resolver
    // (resolveCsvAppDataFile/resolveJsonAppDataFile) validieren gegen die exakte Grammatik,
    // keine .trim()-Kanonisierung des Dateinamens vor der Auflösung.
    const rawCsvFilename = container.dataset.fwData || '';
    const rawConfigFilename = container.dataset.fwConfig || '';
    const [csvResult, stationsResult] = await Promise.all([  // CHANGED — AP-11
      loadData(rawCsvFilename),
      loadStations(rawConfigFilename)
    ]);

    clearContainer(container);

    if (csvResult.error) { // CHANGED — AP-tailwind-02d: 'empty' (< 120 Zeilen / fehlende Pflichtspalten) ist Taxonomie-Error, nicht Empty (APP-INTERFACE.md §8)
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
    container.className = FW_SHELL_CLASS; // NEW — AP-tailwind-02_slice-1: Shell-Klassenkonstante (§6.1)

    const slug = (container.dataset.fwApp || '').trim();
    initApp(container, slug);
  });
}

// ES-Modul: defer by default — DOMContentLoaded ist dennoch sicherer gegen Race Conditions
document.addEventListener('DOMContentLoaded', bootstrap);
