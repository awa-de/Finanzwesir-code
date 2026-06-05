// CHANGED — Slice 1 (war: Slice 0)
// app.js — ES-Modul (OA-01: <script type="module">)
// Slice 1: CSVParser-Import, loadData(), Daten-States

import { CSVParser } from '../../Theme/assets/js/fw-chart-engine/data/CSVParser.js'; // NEW

// SLUG_WHITELIST: Kompilzeit-Konstante — bewusst keine dynamische Quelle
const SLUG_WHITELIST = ['prokrastinations-preis'];

function validateSlug(slug) {
  return typeof slug === 'string' && SLUG_WHITELIST.includes(slug.trim());
}

// NEW
function clearContainer(container) {
  container.textContent = ''; // entfernt alle Kindelemente (SafeDOM — kein innerHTML)
}

function setState(container, state) {
  container.dataset.fwState = state;
  // Erlaubte Werte: 'loading' | 'content' | 'error' | 'empty'
}

// NEW
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

// NEW — ersetzt renderContent() aus Slice 0
function renderContentSkeleton(container, appData) {
  // Slice 1: Content-Gerüst — echte Berechnung folgt in Slice 2 (MarketTimeStrategy)
  const p = document.createElement('p');
  p.textContent = 'Marktzeit-Simulation — ' + appData.periodMonths + ' Monate bis ' + appData.latestMonth + ' geladen.';
  container.appendChild(p);
}

// NEW — gibt { appData } bei Erfolg oder { error: 'b'|'c'|'empty', message } zurück
async function loadData(url) {
  if (!url) {
    return { error: 'b', message: 'Daten konnten nicht geladen werden. Bitte Seite neu laden.' };
  }

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
  if (rows.length < 120 || !Object.prototype.hasOwnProperty.call(rows[0], 'index_value')) {
    return { error: 'empty', message: 'Nicht genug Daten für die Berechnung. Bitte Datenquelle prüfen.' };
  }

  // Letzte 120 Monate verwenden; Date-Objekt → ISO-String (p.date.slice(0,7) in Slice 2)
  const last120 = rows.slice(-120);
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

// CHANGED — async, enthält jetzt CSV-Lade-Pfad
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
      renderContentSkeleton(container, result.appData);
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
