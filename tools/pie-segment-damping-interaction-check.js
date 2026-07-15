/**
 * tools/pie-segment-damping-interaction-check.js
 *
 * Interaktive Browser-Konsolen-Diagnose fuer die Donut-/Pie-Segment-Daempfung
 * (Baukasten-Bedeutung "Segment-Daempfung umschalten", DOC-03; Umsetzung CE-5).
 * Wiederverwendbar fuer alle Donut/Pie-Testseiten und -Faelle, AP-neutral,
 * dauerhaft (analog engine-dom-check.js).
 *
 * ACHTUNG — anders als tools/engine-dom-check.js ist dieses Werkzeug NICHT
 * read-only: es simuliert echte Klicks (`element.click()`) auf Legenden-
 * eintraege, um die Klick-Rundreise (aktiv -> gedaempft -> aktiv) zu
 * verifizieren. Jedes getestete Segment wird danach durch einen zweiten Klick
 * exakt in seinen Ausgangszustand zurueckversetzt -- am Ende bleibt keine
 * dauerhafte Aenderung. Waehrend der Laufzeit mutiert es aber kurzzeitig
 * echten Chart-/DOM-Zustand (ds._status, aria-pressed, hidden-dataset-Klasse).
 * Nicht auf produktiven Seiten mit parallelen Nutzern ausfuehren.
 *
 * Abgrenzung: Die rein strukturelle Pruefung (echter <button>, aria-pressed
 * vorhanden, Fokussierbarkeit, Initialzustand) liegt im additiven
 * Segment-Daempfungs-Struktur-Check von tools/engine-dom-check.js. Dieses
 * Werkzeug prueft ausschliesslich die Interaktion.
 *
 * Fuer jede gefundene Donut/Pie-Legende (Container ohne Line-/Bar-Chrome-
 * Marker/-Anker, mit .fw-chart-legend) und jeden ihrer Legendeneintraege:
 *  - Klick daempft/entdaempft korrekt: aria-pressed UND die Klasse
 *    hidden-dataset wechseln gemeinsam, konsistent zum realen Zustand;
 *  - alle anderen Segmente derselben Legende bleiben unveraendert;
 *  - kein Drill-down-Popover (.fw-chart-popover) erscheint durch den Klick;
 *  - ein zweiter Klick auf dasselbe Segment stellt exakt den
 *    Ausgangszustand wieder her (aria-pressed UND Klasse).
 *
 * Nutzung: Datei-Inhalt in die DevTools-Konsole der geladenen Testseite
 * einfuegen, Enter. Testet automatisch jedes Segment jeder gefundenen
 * Donut/Pie-Legende auf der Seite. Druckt console.table + Zusammenfassung
 * und gibt ein Ergebnisobjekt zurueck.
 */
(function fwPieSegmentDampingInteractionCheck() {
  'use strict';

  function findPieLegends() {
    var containers = Array.prototype.slice.call(
      document.querySelectorAll('.financial-chart-module, [data-fw-appchart]')
    );
    var found = [];
    containers.forEach(function (container, i) {
      var wrapper = container.querySelector('.fw-chart-wrapper');
      if (!wrapper) return;
      var isLine = wrapper.classList.contains('fw-chart-wrapper--line');
      var isBar = wrapper.classList.contains('fw-chart-wrapper--bar');
      var isChrome = wrapper.classList.contains('fw-chart-chrome');
      if (isLine || isBar || isChrome) return; // nur Donut/Pie (kein Line-/Bar-Chrome-Marker/-Anker)
      var legendEl = container.querySelector('.fw-chart-legend');
      if (!legendEl) return;
      var items = Array.prototype.slice.call(legendEl.querySelectorAll('.fw-legend-item'));
      if (items.length === 0) return;
      found.push({ idx: i, items: items });
    });
    return found;
  }

  function snapshot(items) {
    return items.map(function (el) {
      return { pressed: el.getAttribute('aria-pressed'), hidden: el.classList.contains('hidden-dataset') };
    });
  }

  function statesEqual(a, b) {
    return a.every(function (s, i) { return s.pressed === b[i].pressed && s.hidden === b[i].hidden; });
  }

  // Testet genau ein Segment (targetIndex) einer Legende: Klick, Pruefung, Ruecksetzung per zweitem Klick.
  function testOneSegment(items, targetIndex, containerIdx) {
    var before = snapshot(items);
    var popoverBefore = !!document.querySelector('.fw-chart-popover');

    items[targetIndex].click();

    var afterClick = snapshot(items);
    var popoverAfterClick = !!document.querySelector('.fw-chart-popover');

    var targetToggled = before[targetIndex].pressed !== afterClick[targetIndex].pressed &&
                         before[targetIndex].hidden !== afterClick[targetIndex].hidden;
    var othersUnchanged = items.every(function (_, i) {
      if (i === targetIndex) return true;
      return before[i].pressed === afterClick[i].pressed && before[i].hidden === afterClick[i].hidden;
    });
    var noDrilldown = popoverBefore === popoverAfterClick;

    // Wiederherstellen — zweiter Klick auf dasselbe Segment
    items[targetIndex].click();
    var afterRestore = snapshot(items);
    var restoredOk = statesEqual(before, afterRestore);

    var pass = targetToggled && othersUnchanged && noDrilldown && restoredOk;
    return {
      containerIdx: containerIdx,
      segmentIndex: targetIndex,
      pressedVorher: before[targetIndex].pressed,
      toggleKorrekt: targetToggled ? 'PASS' : 'FAIL',
      andereSegmenteUnveraendert: othersUnchanged ? 'PASS' : 'FAIL',
      keinDrilldown: noDrilldown ? 'PASS' : 'FAIL (Popover erschienen)',
      wiederhergestellt: restoredOk ? 'PASS' : 'FAIL',
      ergebnis: pass ? 'PASS' : 'FAIL'
    };
  }

  var legends = findPieLegends();
  if (legends.length === 0) {
    console.warn('[pie-segment-damping-check] Keine Donut/Pie-Legende auf dieser Seite gefunden (kein Fehler, falls diese Seite keinen Pie-Chart mit sichtbarer Legende rendert).');
    return { gesamt: 'KEINE PIE-LEGENDEN', rows: [] };
  }

  var rows = [];
  var allPass = true;
  legends.forEach(function (legend) {
    legend.items.forEach(function (_, segIdx) {
      var result = testOneSegment(legend.items, segIdx, legend.idx);
      if (result.ergebnis !== 'PASS') allPass = false;
      rows.push(result);
    });
  });

  console.log('%c[pie-segment-damping-check] Klick-Rundreise je Segment (daempfen -> wiederherstellen)', 'font-weight:bold');
  console.table(rows);
  var gesamt = allPass ? 'PASS' : 'FAIL';
  console.log('%c[pie-segment-damping-check] Gesamt: ' + gesamt + '  |  Legenden: ' + legends.length + ', Segmente geprueft: ' + rows.length,
    'font-weight:bold;color:' + (gesamt === 'PASS' ? 'green' : 'crimson'));

  return { gesamt: gesamt, legenden: legends.length, rows: rows };
})();
