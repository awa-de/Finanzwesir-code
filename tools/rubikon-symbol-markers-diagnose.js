/**
 * RubikonSymbolMarkers Positions-Diagnose (AP-prokrast-07c)
 *
 * Kein Build-/Node-Skript — Browser-DevTools-Konsolen-Snippet.
 * Zweck: misst die reale Chart.js-Pixel-Position des "?"-Markers (dieselbe
 * Referenz wie FwVerticalLinePlugin: chart.getDatasetMeta(0), letzter Punkt)
 * gegen die tatsächlich gerenderte Position des DOM-Textblocks
 * (.fw-app__rubikon-text) und schlägt daraus einen korrigierten
 * --fw-rubikon-text-left / --fw-rubikon-text-top Wert vor.
 *
 * Grund für den Umweg über manuelle Messung statt einer festen Formel:
 * app.js darf laut APP-INTERFACE.md §4 keine Chart.js-Pixelinternals lesen
 * (Architekturgrenze App-Layer vs. Chart-Engine-Layer). Die Positionierung
 * bleibt deshalb statisch in CSS (Custom Properties), einmalig über dieses
 * Skript in DevTools ermittelt — kein Laufzeit-Zugriff auf Chart.js-Internals
 * im produktiven Code.
 *
 * Anwendung: Screen 4 im Live-Server öffnen, Browserbreite auf S/M/L setzen,
 * dieses Skript in der DevTools-Konsole ausführen, Ausgabe auswerten.
 *
 * ACHTUNG: OFFSET_X_FRAGEZEICHEN/MARKER_Y_FRACTION müssen zur aktuellen
 * chartText-Konfiguration in Apps/prokrastinations-preis/app.js
 * (renderScreen4Chart) passen — bei Änderung dort auch hier anpassen.
 */
(function () {
  const OFFSET_X_FRAGEZEICHEN = 14, MARKER_Y_FRACTION = 0.08;

  const canvas = document.querySelector('[data-fw-appchart="sparplan-s4"] canvas');
  if (!canvas) { console.error('Canvas für sparplan-s4 nicht gefunden.'); return; }
  const chart = window.Chart && window.Chart.getChart ? window.Chart.getChart(canvas) : null;
  if (!chart) { console.error('Kein Chart.js-Instance gefunden.'); return; }

  const meta = chart.getDatasetMeta(0);
  const lastPoint = meta && meta.data && meta.data[meta.data.length - 1];
  if (!lastPoint) { console.error('Letzter Datenpunkt nicht gefunden.'); return; }

  const chartArea = chart.chartArea;
  const wrap = canvas.closest('.fw-app__rubikon-chart-wrap');
  const textEl = wrap.querySelector('.fw-app__rubikon-text');
  const variants = Array.from(wrap.querySelectorAll('.fw-app__rubikon-variant'));
  const visibleVariant = variants.find(v => getComputedStyle(v).display !== 'none');
  const firstLine = visibleVariant ? visibleVariant.querySelector('.fw-app__rubikon-line') : null;

  const canvasRect = canvas.getBoundingClientRect();
  const wrapRect = wrap.getBoundingClientRect();
  const textRect = (firstLine || textEl).getBoundingClientRect();

  const fragezeichenXPage = canvasRect.left + lastPoint.x + OFFSET_X_FRAGEZEICHEN;
  const markerYPage = canvasRect.top + chartArea.top + chartArea.height * MARKER_Y_FRACTION;
  const markerBottomPage = markerYPage + (14 * 1.4) / 2;

  const currentLeftPercent = parseFloat(getComputedStyle(textEl).getPropertyValue('--fw-rubikon-text-left'));
  const currentTopPercent  = parseFloat(getComputedStyle(textEl).getPropertyValue('--fw-rubikon-text-top'));

  const deltaLeftPx = textRect.left - fragezeichenXPage; // positiv = Text zu weit RECHTS vom "?", negativ = zu weit LINKS
  const korrigiertesLeftPercent = currentLeftPercent - (deltaLeftPx / wrapRect.width) * 100;

  const gapIstPx = textRect.top - markerBottomPage; // aktuelle Lücke; negativ = Kollision
  const gapSollPx = 8;
  const korrigiertesTopPercent = currentTopPercent + ((gapSollPx - gapIstPx) / wrapRect.height) * 100;

  console.log('--- RubikonSymbolMarkers Nachmessung (Breite: ' + window.innerWidth + 'px) ---');
  console.log('Aktuell: left=' + currentLeftPercent + '% top=' + currentTopPercent + '%');
  console.log('Horizontale Abweichung:', deltaLeftPx.toFixed(1), 'px', deltaLeftPx > 0 ? '(Text zu weit RECHTS)' : '(Text zu weit LINKS)');
  console.log('→ korrigiertes --fw-rubikon-text-left:', korrigiertesLeftPercent.toFixed(1) + '%');
  console.log('Aktuelle Lücke Text/Marker:', gapIstPx.toFixed(1), 'px', gapIstPx < 0 ? '(KOLLISION)' : '');
  console.log('→ korrigiertes --fw-rubikon-text-top:', korrigiertesTopPercent.toFixed(1) + '%');
})();
