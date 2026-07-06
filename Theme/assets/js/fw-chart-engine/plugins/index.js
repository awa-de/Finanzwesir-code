/**
 * Finanzwesir Chart Engine — Plugin Barrel
 *
 * Kanonischer Exportpunkt fuer aktive Chart.js-Plugins.
 *
 * Wichtig:
 * - Nur echte, aktive Plugins exportieren.
 * - Kein FwBarLayoutPlugin: AP-14e8 hat diesen Dead State entfernt.
 * - Keine Plugin-Registry.
 * - Keine Runtime-Registry.
 */

export { CenterTextPlugin } from './CenterTextPlugin.js';
export { CrosshairPlugin } from './CrosshairPlugin.js';
export { FwAnchorMeasurementPlugin } from './FwAnchorMeasurementPlugin.js';
export { FwAnnotationPulsePlugin } from './FwAnnotationPulsePlugin.js';
export { FwChartTextPlugin } from './FwChartTextPlugin.js';
export { FwVerticalLinePlugin } from './FwVerticalLinePlugin.js';
