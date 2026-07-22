// Stations-Vertragsmodul (JSON-Offline-Validator V1): einzige fachliche Implementierung des
// Stations-Vertrags aus Apps/prokrastinations-preis/STATIONS_CONFIG_CONTRACT.md (v4.0). Browser-
// Laufzeit (prokrastinations-preis.js) und der Offline-Prüfer (content/files/app-data/json-validator.mjs)
// importieren beide statisch exakt diese Funktion. Reines ES-Modul: kein DOM, kein window, kein fetch,
// kein dynamischer Import, keine Seiteneffekte beim Import.

import { validateRubikonContent } from './prokrastinations-preis-rubikon-content.js';

// Gibt { ok: true } oder { ok: false, code, detail } zurück — kein Wurf.
export function validateStationsJson(json) {
  if (typeof json !== 'object' || json === null || Array.isArray(json))
    return { ok: false, code: 'invalid_structure', detail: 'root is not an object' };

  if (json.version !== '4.0')
    return { ok: false, code: 'invalid_value', detail: 'version: expected "4.0", got: ' + json.version };
  if (json.locale !== 'de-DE')
    return { ok: false, code: 'invalid_value', detail: 'locale: expected "de-DE", got: ' + json.locale };
  if (json.app !== 'prokrastinations-preis')
    return { ok: false, code: 'invalid_value', detail: 'app: expected "prokrastinations-preis", got: ' + json.app };

  if (!Array.isArray(json.stations) || json.stations.length < 1)
    return { ok: false, code: 'missing_field', detail: 'stations (array, min length 1)' };

  const rubikon = validateRubikonContent(json.rubikon);
  if (!rubikon.ok)
    return { ok: false, code: rubikon.code, detail: rubikon.detail };

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
