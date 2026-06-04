// NEW — Slice 0
// app.js — ES-Modul (OA-01: <script type="module">)
// Slice 0: kein CSVParser-Import (kein Fetch in diesem Slice)

// SLUG_WHITELIST: Kompilzeit-Konstante — bewusst keine dynamische Quelle in Slice 0
const SLUG_WHITELIST = ['prokrastinations-preis'];

function validateSlug(slug) {
  // Exakter Match — kein Partial-Match, keine Regex-Großzügigkeit
  return typeof slug === 'string' && SLUG_WHITELIST.includes(slug.trim());
}

function setState(container, state) {
  container.dataset.fwState = state;
  // Erlaubte Werte: 'loading' | 'content' | 'error' | 'empty'
}

function renderContent(container) {
  // Slice 0: statischer Platzhalter — eindeutig kein echter Wert
  const p = document.createElement('p');
  p.textContent = '[Marktzeit-Simulation — Daten folgen in Slice 1]';
  container.appendChild(p);
}

function renderError(container, message) {
  const p = document.createElement('p');
  p.textContent = message; // SafeDOM: textContent, niemals innerHTML (Q-01)
  container.appendChild(p);
}

async function initApp(container, slug) {
  try {
    setState(container, 'loading');

    if (!validateSlug(slug)) {
      setState(container, 'error');
      renderError(container, 'Diese App konnte nicht geladen werden.');
      return;
    }

    // data-fw-data: URL-Attribut lesen und für Slice 1 bereitstellen
    // Kein Fetch in Slice 0 — wird in Slice 1 an CSVParser.parse(dataUrl) übergeben
    const dataUrl = (container.dataset.fwData || '').trim(); // eslint-disable-line no-unused-vars

    // data-fw-options: wird in Slice 0 bewusst NICHT verarbeitet (→ Slice 3)
    // Attribut kann vorhanden sein — es wird ignoriert, nichts ausgegeben.

    setState(container, 'content');
    renderContent(container);

  } catch (e) {
    // Stack-Trace nur in Konsole — niemals im UI ausgeben
    console.error('[fw-app] initApp error:', e);
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
