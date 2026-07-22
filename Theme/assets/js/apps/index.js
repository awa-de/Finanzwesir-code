// Theme-Bootstrapper (SEC-04/SEC-05, docs/App-Fabrik/01_DECISION_LOG.md): einziger fw-app-Einstieg
// im Theme-Bundle. Statische Literal-Registry: Slug -> statisch importierte Init-Funktion.
// Kein `import()`, keine aus data-* gebildete Import-/Script-URL, kein eval, keine
// Script-Injektion, keine globale Window-API, keine externe Registry-Datei.

import { initProkrastinationsPreis } from './prokrastinations-preis.js';

const REGISTRY = Object.freeze({
  'prokrastinations-preis': initProkrastinationsPreis,
});

function renderError(container, message) {
  container.textContent = ''; // Container leeren — SafeDOM, kein innerHTML
  container.dataset.fwState = 'error';
  const text = document.createElement('p');
  text.setAttribute('role', 'alert');
  text.textContent = message; // SafeDOM: textContent, niemals innerHTML
  container.appendChild(text);
}

async function startContainer(container) {
  // Guard: verhindert doppelte Initialisierung (z.B. Ghost Code Injection + Theme-Modul-Duplikate)
  if (container.dataset.fwInitialized === 'true') return;
  container.dataset.fwInitialized = 'true';

  const slug = (container.dataset.fwApp || '').trim();
  // CHANGED — P1-Korrektur: REGISTRY[slug] liefert bei geerbten Object-Prototype-Eigenschaften
  // (z.B. slug === 'toString'/'constructor') eine Funktion, obwohl kein eigener Registry-Eintrag
  // existiert. Object.hasOwn() schliesst den Prototype-Chain-Zugriff aus.
  const init = Object.hasOwn(REGISTRY, slug) ? REGISTRY[slug] : undefined;

  if (!init) {
    renderError(container, 'Diese App konnte nicht geladen werden.');
    return;
  }

  try {
    await init(container);
  } catch (e) {
    console.error('[fw-app] Bootstrapper: Init-Fehler fuer Slug "' + slug + '":', e);
    renderError(container, 'Diese App konnte nicht geladen werden.');
  }
}

function bootstrap() {
  const containers = document.querySelectorAll('.fw-app');
  containers.forEach(startContainer);
}

// DOM-ready robust behandeln: sowohl vor als auch nach DOMContentLoaded korrekt starten.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
