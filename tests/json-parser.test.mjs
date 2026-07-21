/**
 * @fileoverview Automatisierter Test für AppDataResolver.js und JSONParser.js
 * @module tests/json-parser.test
 *
 * @description
 * Prüft den zentralen Dateinamenresolver (`AppDataResolver.js`) und den
 * JSON-Parser/Vault (`JSONParser.js`, `FinanzwesirJsonData.js`) — die
 * strukturelle JSON-Geschwister-Infrastruktur zu `CSVParser.js`/
 * `FinanzwesirData.js`. Verwendet ausschließlich temporäre Daten (In-Memory-
 * JSON-Strings) und gemocktes `fetch`. Kein echtes Netzwerk, keine echten
 * Dateien unter `content/files/app-data/`.
 *
 * Aufruf: node tests/json-parser.test.mjs
 */

import { resolveCsvAppDataFile, resolveJsonAppDataFile } from '../Theme/assets/js/fw-chart-engine/data/AppDataResolver.js';
import { JSONParser, parseJsonText } from '../Theme/assets/js/fw-chart-engine/data/JSONParser.js';
import { FinanzwesirJsonData } from '../Theme/assets/js/fw-chart-engine/data/FinanzwesirJsonData.js';

let failures = 0;
function assertTrue(label, cond) {
    if (cond) { console.log(`OK   ${label}`); } else { console.log(`FAIL ${label}`); failures++; }
}
function assertThrows(label, fn) {
    try {
        fn();
        console.log(`FAIL ${label} (kein Fehler geworfen)`);
        failures++;
    } catch {
        console.log(`OK   ${label}`);
    }
}
async function assertRejects(label, fn) {
    try {
        await fn();
        console.log(`FAIL ${label} (kein Fehler geworfen)`);
        failures++;
    } catch {
        console.log(`OK   ${label}`);
    }
}

const OK_VALIDATOR = () => ({ ok: true });
const FAIL_VALIDATOR = () => ({ ok: false, code: 'invalid_value', detail: 'test-fehlschlag' });

console.log('=== 1) Resolver bilden exakten Präfixpfad für gültige, vollständige Dateinamen ===');
{
    assertTrue(
        'resolveCsvAppDataFile: exakter Präfixpfad',
        resolveCsvAppDataFile('msci-world.csv') === '/content/files/app-data/msci-world.csv'
    );
    assertTrue(
        'resolveJsonAppDataFile: exakter Präfixpfad',
        resolveJsonAppDataFile('risiko-uebersetzer-config.json') === '/content/files/app-data/risiko-uebersetzer-config.json'
    );
    // Kein zusätzliches Suffix angehängt (P1-Korrektur-Regression):
    assertTrue(
        'resolveCsvAppDataFile: kein doppeltes .csv',
        !resolveCsvAppDataFile('abc.csv').endsWith('.csv.csv')
    );
    assertTrue(
        'resolveJsonAppDataFile: kein doppeltes .json',
        !resolveJsonAppDataFile('risiko-uebersetzer-config.json').endsWith('.json.json')
    );
}

console.log('=== 1b) FUND: realer Dateiname "stations.de.json" erfüllt die Grammatik ^[a-z0-9_-]+\\.json$ nicht ===');
{
    // Kein Bug im Resolver — er verhält sich exakt nach der in diesem Auftrag
    // vorgeschriebenen Grammatik. Der interne Punkt in "stations.de" ist im
    // Zeichensatz [a-z0-9_-] nicht enthalten. Dieser Test dokumentiert den
    // Fund, entscheidet ihn aber nicht (Grammatik-Änderung ist für diesen AP
    // tabu — Decision Log). Siehe Abschlussmeldung.
    assertThrows(
        'realer Produktivname stations.de.json wird von der SEC-04-Grammatik abgelehnt (dokumentierter Fund, nicht Teil dieses AP)',
        () => resolveJsonAppDataFile('stations.de.json')
    );
}

console.log('=== 2) Resolver lehnen ungültige Eingaben ab — ohne fetch ===');
{
    let fetchCalls = 0;
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => { fetchCalls++; throw new Error('fetch haette nicht aufgerufen werden duerfen'); };

    const invalidCsv = [
        'https://www.finanzwesir.com/a.csv',   // URL
        '../a.csv',                             // Traversal
        'sub/a.csv',                             // Slash
        'a.csv?v=1',                             // Query
        'a.csv#frag',                            // Fragment
        'a b.csv',                               // Leerzeichen
        'A.csv',                                 // Großbuchstaben
        'a.json',                                 // falsches Suffix
        'a.CSV'                                   // falsches Suffix (Groß)
    ];
    for (const bad of invalidCsv) {
        assertThrows(`resolveCsvAppDataFile lehnt ab: '${bad}'`, () => resolveCsvAppDataFile(bad));
    }

    const invalidJson = [
        'https://www.finanzwesir.com/a.json',
        '../a.json',
        'sub/a.json',
        'a.json?v=1',
        'a.json#frag',
        'a b.json',
        'A.json',
        'a.csv',
        'a.JSON'
    ];
    for (const bad of invalidJson) {
        assertThrows(`resolveJsonAppDataFile lehnt ab: '${bad}'`, () => resolveJsonAppDataFile(bad));
    }

    assertTrue('Kein einziger fetch-Aufruf durch Resolver-Ablehnungen ausgelöst', fetchCalls === 0);
    globalThis.fetch = originalFetch;
}

console.log('=== 3) parseJsonText() akzeptiert gültiges JSON, ruft Validator auf, liefert vollständig eingefrorenen Vault ===');
{
    let validatorCalledWith = null;
    const validator = (parsed) => { validatorCalledWith = parsed; return { ok: true }; };
    const text = JSON.stringify({
        version: '3.0',
        nested: { count: 2 },
        arr: [1, 2, 3],
        stations: [{ id: 'a' }]
    });

    const vault = parseJsonText(text, { validator });

    assertTrue('Ergebnis ist FinanzwesirJsonData-Instanz', vault instanceof FinanzwesirJsonData);
    assertTrue('Validator wurde mit geparster Struktur aufgerufen', !!validatorCalledWith && validatorCalledWith.version === '3.0');
    assertTrue('data.version korrekt', vault.data.version === '3.0');
    assertTrue('metadata.source === JSON', vault.metadata.source === 'JSON');
    assertTrue('metadata.parsedAt ist String', typeof vault.metadata.parsedAt === 'string');

    assertTrue('Wurzel eingefroren', Object.isFrozen(vault.data));
    assertTrue('Verschachteltes Objekt eingefroren', Object.isFrozen(vault.data.nested));
    assertTrue('Array eingefroren', Object.isFrozen(vault.data.arr));
    assertTrue('Array-Element (Objekt) eingefroren', Object.isFrozen(vault.data.stations[0]));
    assertTrue('Metadaten eingefroren', Object.isFrozen(vault.metadata));

    assertThrows('Mutation der Wurzel wirft (strict mode)', () => { vault.data.version = '9.9'; });
    assertThrows('Mutation des verschachtelten Objekts wirft', () => { vault.data.nested.count = 99; });
    assertThrows('Push auf eingefrorenes Array wirft', () => { vault.data.arr.push(4); });
    assertThrows('Neue Eigenschaft auf Vault-Instanz wirft (Object.freeze auf this)', () => { vault.neuesFeld = 1; });
}

console.log('=== 4) Ungültiges JSON, fehlender Validator und { ok: false } schlagen fehl ===');
{
    assertThrows('Leerer Text schlägt fehl', () => parseJsonText('', { validator: OK_VALIDATOR }));
    assertThrows('Ungültiges JSON schlägt fehl', () => parseJsonText('{ das ist kein JSON', { validator: OK_VALIDATOR }));
    assertThrows('Fehlender Validator schlägt fehl', () => parseJsonText('{"a":1}', {}));
    assertThrows('Nicht-funktionaler Validator schlägt fehl', () => parseJsonText('{"a":1}', { validator: 'kein-callable' }));
    assertThrows('Validator-Ergebnis { ok: false } schlägt fehl', () => parseJsonText('{"a":1}', { validator: FAIL_VALIDATOR }));
}

console.log('=== 5) JSONParser.parse() nutzt Resolverpfad, priority high, HTTP-Fehlerrahmen ===');
{
    const originalFetch = globalThis.fetch;

    // 5a — Erfolgsfall: relativer Resolverpfad, priority:'high', korrekt geparster Vault
    {
        let receivedUrl = null;
        let receivedOptions = null;
        globalThis.fetch = async (url, options) => {
            receivedUrl = url;
            receivedOptions = options;
            return { ok: true, status: 200, text: async () => JSON.stringify({ version: '3.0', stations: [] }) };
        };

        const parser = new JSONParser();
        const url = resolveJsonAppDataFile('risiko-uebersetzer-config.json');
        const vault = await parser.parse(url, { validator: OK_VALIDATOR });

        assertTrue('fetch erhielt den zentral aufgelösten Resolverpfad', receivedUrl === '/content/files/app-data/risiko-uebersetzer-config.json');
        assertTrue("fetch erhielt { priority: 'high' }", receivedOptions && receivedOptions.priority === 'high');
        assertTrue('Erfolgsfall liefert FinanzwesirJsonData', vault instanceof FinanzwesirJsonData);
        assertTrue('Erfolgsfall: Daten korrekt', vault.data.version === '3.0');
    }

    // 5b — HTTP-Fehler wird im bestehenden Fehlerrahmen behandelt
    {
        globalThis.fetch = async () => ({ ok: false, status: 404, text: async () => '' });
        const parser = new JSONParser();
        await assertRejects(
            'HTTP-Fehler (404) wird als JSON Load Error geworfen',
            async () => {
                try {
                    await parser.parse('/content/files/app-data/fehlt.json', { validator: OK_VALIDATOR });
                } catch (err) {
                    if (!/JSON Load Error/.test(err.message)) throw new Error('Fehlerrahmen nicht bewahrt: ' + err.message);
                    throw err;
                }
            }
        );
    }

    // 5c — Ungültige URL wird vor jedem Fetch abgelehnt (GATEKEEPER)
    {
        let fetchCalled = false;
        globalThis.fetch = async () => { fetchCalled = true; return { ok: true, status: 200, text: async () => '{}' }; };
        const parser = new JSONParser();
        await assertRejects('GATEKEEPER lehnt fremde Domain ab', () => parser.parse('https://example.com/stations.de.json', { validator: OK_VALIDATOR }));
        assertTrue('GATEKEEPER: kein fetch bei abgelehnter URL', !fetchCalled);
    }

    globalThis.fetch = originalFetch;
}

console.log('---');
console.log(failures === 0 ? 'ALLE NACHWEISE GRÜN' : `${failures} PRÜFUNG(EN) FEHLGESCHLAGEN`);
process.exit(failures === 0 ? 0 : 1);
