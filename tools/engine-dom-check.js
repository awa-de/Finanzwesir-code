/**
 * tools/engine-dom-check.js
 *
 * Read-only Browser-Konsolen-Diagnose fuer das gemeinsame Chart-Engine-DOM
 * (FwRenderer). Wiederverwendbar fuer alle Engine-Testseiten und Chart-Typen
 * (Linie/Balken/Donut), beide Datenpfade: CSV `.financial-chart-module`
 * und App `[data-fw-appchart]`. AP-neutral, dauerhaft.
 *
 * Zweck: verifiziert die charttyp-uebergreifenden Struktur- und Verbergungs-
 * vertraege des Renderers (eingefuehrt/erhalten in CE-2b):
 *  - A11y-Datentabelle vorhanden UND effektiv verborgen (kein Rohdaten-Leak),
 *  - Verbergungs-Mechanismus (Tailwind `sr-only` vs. Engine-Fallback),
 *  - Wrapper traegt Klassenanker + Container-Query (`container-name: fw-chart`),
 *  - Canvas-Container traegt Klassenanker + Engine-Hoehe 400px,
 *  - `<canvas>` vorhanden.
 * Zusaetzlich, falls auf der Seite gerendert: Loading (`role="status"`) und
 * Error (`role="alert"`) Status-Flaechen.
 *
 * Nutzung: Datei-Inhalt in die DevTools-Konsole der geladenen Testseite
 * einfuegen, Enter. Laeuft sofort, druckt console.table + Zusammenfassung und
 * gibt ein Ergebnisobjekt zurueck. Aendert nichts am DOM.
 *
 * Abgrenzung: KEIN CI-Token-/Farb-/Font-Check -- dafuer ist
 * `tools/ci-token-check.js` zustaendig. Dieses Werkzeug prueft ausschliesslich
 * Engine-DOM-Struktur und -Verbergung, kein fachliches Chart-Verhalten
 * (Achsen/Ticks/Tooltips) -- das bleibt die manuelle REGRESSION-MATRIX.
 */
(function fwEngineDomCheck() {
  'use strict';

  var viewportW = window.innerWidth || document.documentElement.clientWidth;
  var viewportH = window.innerHeight || document.documentElement.clientHeight;

  // --- Umgebung: Ist Tailwinds `sr-only` in diesem Dokument wirksam? ---
  // Probe-Element mit Klasse `sr-only`; wenn Tailwind (CDN/Build) die Utility
  // generiert hat, ist sie 1x1px/absolut/overflow:hidden. Auf Tailwind-freien
  // Engine-Testseiten bleibt die Klasse ungestylt.
  function detectSrOnly() {
    var probe = document.createElement('span');
    probe.className = 'sr-only';
    probe.textContent = 'probe';
    document.body.appendChild(probe);
    var cs = getComputedStyle(probe);
    var active = cs.position === 'absolute' &&
                 parseFloat(cs.width) <= 2 &&
                 parseFloat(cs.height) <= 2 &&
                 cs.overflow === 'hidden';
    probe.remove();
    return active;
  }

  function isEffectivelyHidden(el) {
    if (!el) return false;
    if (getComputedStyle(el).display === 'none') return true;
    var r = el.getBoundingClientRect();
    var offscreen = r.right <= 0 || r.bottom <= 0 ||
                    r.left >= viewportW || r.top >= viewportH;
    var tiny = r.width <= 2 && r.height <= 2;
    return offscreen || tiny;
  }

  function hidingMechanism(table, srOnlyActive) {
    if (!table) return '—';
    var cs = getComputedStyle(table);
    var left = parseFloat(cs.left);
    var fallbackActive = cs.position === 'absolute' && left <= -9000;
    if (fallbackActive && srOnlyActive) return 'sr-only+Fallback';
    if (fallbackActive) return 'Fallback(left:-9999px)';
    if (srOnlyActive) return 'sr-only(Tailwind)';
    return 'unklar';
  }

  function hasClasses(el, tokens) {
    if (!el) return false;
    return tokens.every(function (t) { return el.classList.contains(t); });
  }

  var srOnlyActive = detectSrOnly();

  // --- Charts einsammeln (beide Datenpfade) ---
  var containers = Array.prototype.slice.call(
    document.querySelectorAll('.financial-chart-module, [data-fw-appchart]')
  );

  var rows = [];       // nur gerenderte (aktive) Charts
  var inaktiv = 0;     // Container ohne Engine-Ausgabe (Testszenario nicht getriggert)
  var allPass = true;

  containers.forEach(function (container, i) {
    var row = { idx: i };
    try {
      var isCsv = container.classList.contains('financial-chart-module');
      var isApp = container.hasAttribute('data-fw-appchart');
      row.pfad = isCsv ? 'CSV' : (isApp ? 'App' : '?');

      var table = container.querySelector('table.fw-chart-a11y-fallback');
      var wrapper = container.querySelector('.fw-chart-wrapper');
      var canvasBox = container.querySelector('.fw-chart-canvas-container');
      var canvas = container.querySelector('canvas');

      // Container ohne jede Engine-Ausgabe = nicht gerendert (z. B. ein noch nicht
      // aktiviertes Testszenario auf einer Multi-Szenario-Seite). Kein Regressions-
      // fall => uebersprungen, nicht als FAIL gewertet.
      if (!wrapper && !canvasBox && !canvas && !table) {
        inaktiv++;
        return;
      }

      // A11y-Tabelle: nur vorhanden, wenn die Strategie A11y-Daten geliefert hat.
      // Keine Tabelle => kein Rohdaten-Leak => bezueglich Verbergung unkritisch.
      var a11yHidden = table ? isEffectivelyHidden(table) : true;
      row.a11yTabelle = table ? 'ja' : 'keine';
      row.a11yVerborgen = a11yHidden ? 'PASS' : 'FAIL';
      row.verbergung = table ? hidingMechanism(table, srOnlyActive) : '—';

      // Wrapper: Klassenanker + Tailwind-Rezept + Container-Query-Anker
      var wrapperClasses = hasClasses(wrapper, ['fw-chart-wrapper', 'flex', 'flex-col', 'gap-3']);
      var cqName = wrapper ? getComputedStyle(wrapper).getPropertyValue('container-name').trim() : '';
      var cqOk = cqName === 'fw-chart';
      row.wrapper = (wrapper && wrapperClasses) ? 'PASS' : 'FAIL';
      row.containerQuery = cqOk ? 'PASS' : 'FAIL';

      // Canvas-Container: Klassenanker + Tailwind-Rezept + Engine-Hoehe 400px + <canvas>
      var boxClasses = hasClasses(canvasBox, ['fw-chart-canvas-container', 'relative', 'w-full']);
      var boxH = canvasBox ? getComputedStyle(canvasBox).height : '';
      var boxHOk = boxH === '400px';
      row.canvasBox = (canvasBox && boxClasses) ? 'PASS' : 'FAIL';
      row.canvasHoehe = boxHOk ? 'PASS' : ('FAIL(' + boxH + ')');
      row.canvas = canvas ? 'PASS' : 'FAIL';

      var pass = a11yHidden && !!wrapper && wrapperClasses && cqOk &&
                 !!canvasBox && boxClasses && boxHOk && !!canvas;
      row.ergebnis = pass ? 'PASS' : 'FAIL';
      if (!pass) allPass = false;
    } catch (e) {
      row.ergebnis = 'FEHLER: ' + e.message;
      allPass = false;
    }
    rows.push(row);
  });

  // --- Optionale Status-Flaechen (nur wenn auf der Seite gerendert) ---
  var statusRows = [];
  Array.prototype.forEach.call(document.querySelectorAll('.fw-loading-container'), function (el, i) {
    statusRows.push({
      typ: 'Loading', idx: i,
      rolle: el.getAttribute('role') || '(fehlt)',
      rolleOk: el.getAttribute('role') === 'status' ? 'PASS' : 'FAIL',
      text: (el.textContent || '').trim().slice(0, 48)
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll('.fw-chart-error'), function (el, i) {
    statusRows.push({
      typ: 'Error', idx: i,
      rolle: el.getAttribute('role') || '(fehlt)',
      rolleOk: el.getAttribute('role') === 'alert' ? 'PASS' : 'FAIL',
      text: (el.textContent || '').trim().slice(0, 48)
    });
  });

  // --- Ausgabe ---
  console.log('%c[engine-dom-check] Umgebung', 'font-weight:bold', {
    tailwindSrOnly: srOnlyActive ? 'aktiv' : 'nicht aktiv (Tailwind-frei)',
    containerGesamt: containers.length,
    aktiveCharts: rows.length,
    inaktiveContainer: inaktiv,
    seite: location.pathname
  });
  if (rows.length) {
    console.table(rows);
  } else {
    console.warn('[engine-dom-check] Kein gerenderter Engine-Chart auf dieser Seite (' + inaktiv + ' Container inaktiv/nicht gerendert).');
  }
  if (statusRows.length) {
    console.log('%c[engine-dom-check] Status-Flaechen (Loading/Error)', 'font-weight:bold');
    console.table(statusRows);
  } else {
    console.log('[engine-dom-check] Keine Loading/Error-Flaeche auf dieser Seite (bei gueltigen Charts normal).');
  }
  var gesamt = rows.length ? (allPass ? 'PASS' : 'FAIL') : 'KEINE AKTIVEN CHARTS';
  console.log('%c[engine-dom-check] Gesamt (nur aktive Charts): ' + gesamt +
    '  |  aktiv: ' + rows.length + ', inaktiv/uebersprungen: ' + inaktiv,
    'font-weight:bold;color:' + (gesamt === 'PASS' ? 'green' : 'crimson'));

  return { tailwindSrOnly: srOnlyActive, gesamt: gesamt, aktiv: rows.length, inaktiv: inaktiv, charts: rows, status: statusRows };
})();
