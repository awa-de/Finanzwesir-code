/**
 * @fileoverview Automatisierter Test für den Offline-JSON-Prüfer (JSON-Offline-Validator V1)
 * @module tests/json-validator.test
 *
 * @description
 * Ruft den echten content/files/app-data/json-validator.mjs gegen isolierte
 * temporäre Datenordner auf (Node-Argument DATA_DIR-Override). Es werden zu
 * keinem Zeitpunkt Dateien unter content/files/app-data/ selbst angelegt oder
 * verändert — vor und nach dem Testlauf wird das explizit geprüft.
 *
 * Aufruf: node tests/json-validator.test.mjs
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, '..');
const VALIDATOR_PATH = path.join(REPO_ROOT, 'content', 'files', 'app-data', 'json-validator.mjs');
const REAL_APP_DATA_DIR = path.join(REPO_ROOT, 'content', 'files', 'app-data');
const REAL_STATIONS_FIXTURE = path.join(REPO_ROOT, 'Apps', 'prokrastinations-preis', 'config', 'stations-de.json');
const NODE_EXE = 'C:\\Tools\\ghost-local\\runtime\\node22\\node.exe';

let failures = 0;
function assertTrue(label, cond) {
    if (cond) { console.log(`OK   ${label}`); } else { console.log(`FAIL ${label}`); failures++; }
}

function runValidator(dataDir) {
    const res = spawnSync(NODE_EXE, [VALIDATOR_PATH, dataDir], { encoding: 'utf8' });
    return { status: res.status, stdout: res.stdout || '', stderr: res.stderr || '' };
}

function makeTempDir() {
    return fs.mkdtempSync(path.join(os.tmpdir(), 'fw-json-validator-test-'));
}

function readState(dir) {
    const p = path.join(dir, 'json-validation-state.json');
    if (!fs.existsSync(p)) return { files: {} };
    return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function readContract(dir) {
    const p = path.join(dir, 'json-contract.json');
    if (!fs.existsSync(p)) return { files: {} };
    return JSON.parse(fs.readFileSync(p, 'utf8'));
}

const VALID_STATIONS_JSON = JSON.stringify({
    version: '3.0',
    locale: 'de-DE',
    app: 'prokrastinations-preis',
    stations: [
        {
            id: 'station_2022_02_24_ukraine_invasion',
            date: '2022-02-24',
            source: 'Tagesschau',
            headline: 'Russland greift die Ukraine an',
            anchorText: 'Krieg ist zurück in Europa.',
            sourceUrl: 'https://www.tagesschau.de/beispiel',
        },
    ],
});

const INVALID_JSON_SYNTAX = '{ this is not valid json ';

const FACHLICH_UNGUELTIGE_STATIONSDATEN = JSON.stringify({
    version: '2.0', // falsch -- erwartet '3.0'
    locale: 'de-DE',
    app: 'prokrastinations-preis',
    stations: [],
});

console.log('=== Vorbedingung: content/files/app-data/ unberührt vor dem Test ===');
const beforeListing = fs.readdirSync(REAL_APP_DATA_DIR).sort();
const beforePackageJson = fs.readFileSync(path.join(REAL_APP_DATA_DIR, 'package.json'), 'utf8');

console.log('=== 1) Gültige stations-de.json aus Apps/prokrastinations-preis/config/ wird akzeptiert ===');
{
    const dir = makeTempDir();
    const realFixture = fs.readFileSync(REAL_STATIONS_FIXTURE, 'utf8');
    fs.writeFileSync(path.join(dir, 'stations-de.json'), realFixture, 'utf8');
    const res = runValidator(dir);
    assertTrue('Exit-Code 0', res.status === 0);
    assertTrue('Ausgabe meldet OK', res.stdout.includes('stations-de.json  ok'));
    assertTrue('Zustand enthält Erfolgseintrag', !!readState(dir).files['stations-de.json']);
    assertTrue('json-contract.json automatisch geschrieben', readContract(dir).files['stations-de.json'].status === 'ok');
    fs.rmSync(dir, { recursive: true, force: true });
}

console.log('=== 2) Ungültiges JSON wird abgelehnt ===');
{
    const dir = makeTempDir();
    fs.writeFileSync(path.join(dir, 'stations-de.json'), INVALID_JSON_SYNTAX, 'utf8');
    const res = runValidator(dir);
    assertTrue('Exit-Code ungleich 0', res.status !== 0);
    assertTrue('Fehlermeldung nennt ungültiges JSON', res.stderr.includes('ungültig'));
    assertTrue('Kein Zustandseintrag angelegt', !readState(dir).files['stations-de.json']);
    fs.rmSync(dir, { recursive: true, force: true });
}

console.log('=== 3) Fachlich ungültige Stationsdaten werden abgelehnt ===');
{
    const dir = makeTempDir();
    fs.writeFileSync(path.join(dir, 'stations-de.json'), FACHLICH_UNGUELTIGE_STATIONSDATEN, 'utf8');
    const res = runValidator(dir);
    assertTrue('Exit-Code ungleich 0', res.status !== 0);
    assertTrue('Fehlermeldung nennt Validierungsfehler', res.stderr.includes('JSON-Validierung fehlgeschlagen'));
    assertTrue('Fehlermeldung nennt Fehlercode', res.stderr.includes('invalid_value'));
    assertTrue('Kein Zustandseintrag angelegt', !readState(dir).files['stations-de.json']);
    fs.rmSync(dir, { recursive: true, force: true });
}

console.log('=== 4) stations.de.json wird nicht als produktionsgültiger Name akzeptiert und nicht umbenannt ===');
{
    const dir = makeTempDir();
    fs.writeFileSync(path.join(dir, 'stations.de.json'), VALID_STATIONS_JSON, 'utf8');
    const res = runValidator(dir);
    assertTrue('Exit-Code ungleich 0', res.status !== 0);
    assertTrue('Fehlermeldung nennt unzulässige Zeichen', res.stderr.includes('unzulässige Zeichen'));
    assertTrue('Datei unverändert unter Originalnamen vorhanden (keine Umbenennung)', fs.existsSync(path.join(dir, 'stations.de.json')));
    const listing = fs.readdirSync(dir).filter((n) => n.endsWith('.json') && n !== 'json-validation-state.json' && n !== 'json-contract.json');
    assertTrue('Keine andere .json-Datei durch Umbenennung entstanden', listing.length === 1 && listing[0] === 'stations.de.json');
    fs.rmSync(dir, { recursive: true, force: true });
}

console.log('=== 5) Unbekannter, aber syntaktisch gültiger JSON-Dateiname wird abgelehnt ===');
{
    const dir = makeTempDir();
    fs.writeFileSync(path.join(dir, 'andere-datei.json'), VALID_STATIONS_JSON, 'utf8');
    const res = runValidator(dir);
    assertTrue('Exit-Code ungleich 0', res.status !== 0);
    assertTrue('Fehlermeldung nennt fehlende Registry-Zuordnung', res.stderr.includes('keine Registry-Zuordnung'));
    assertTrue('Kein Zustandseintrag angelegt', !readState(dir).files['andere-datei.json']);
    fs.rmSync(dir, { recursive: true, force: true });
}

console.log('=== 6) Die fünf Betriebsartefakte werden nicht als Nutzdaten fehlklassifiziert ===');
{
    const dir = makeTempDir();
    fs.writeFileSync(path.join(dir, 'stations-de.json'), VALID_STATIONS_JSON, 'utf8');
    fs.writeFileSync(path.join(dir, 'json-validation-state.json'), '{ this is not valid json either', 'utf8');
    fs.writeFileSync(path.join(dir, 'validation-state.json'), '{"files":{}}', 'utf8');
    fs.writeFileSync(path.join(dir, 'csv-contract.json'), '{"files":{}}', 'utf8');
    fs.writeFileSync(path.join(dir, 'package.json'), '{"name":"fw-csv-validator","private":true,"type":"module"}', 'utf8');
    const validationStateBefore = fs.readFileSync(path.join(dir, 'validation-state.json'), 'utf8');
    const csvContractBefore = fs.readFileSync(path.join(dir, 'csv-contract.json'), 'utf8');
    const packageJsonBefore = fs.readFileSync(path.join(dir, 'package.json'), 'utf8');

    const res = runValidator(dir);
    assertTrue('Exit-Code 0 (nur die echte Nutzdatei zählt)', res.status === 0);
    assertTrue('Gefunden: 1 (nur stations-de.json, fünf Artefakte ausgenommen)', res.stdout.includes('Gefunden: 1 |'));
    // Hinweis: res.stderr kann eine Node-Laufzeitwarnung enthalten, die zufällig
    // den String "package.json" nennt (Theme/package.json, MODULE_TYPELESS-Warnung) --
    // deshalb wird hier ausschließlich das eigene Fehlerformat des Prüfers geprüft
    // ("FEHLER  <name>"), nicht ein blosser Substring-Treffer irgendwo in stderr.
    assertTrue('package.json nicht als Fehler gemeldet', !res.stdout.includes('package.json') && !res.stderr.includes('FEHLER  package.json'));
    assertTrue('validation-state.json nicht als Fehler gemeldet', !res.stdout.includes('validation-state.json  ') && !res.stderr.includes('FEHLER  validation-state.json'));
    assertTrue('csv-contract.json nicht als Fehler gemeldet', !res.stdout.includes('csv-contract.json  ') && !res.stderr.includes('FEHLER  csv-contract.json'));
    assertTrue('validation-state.json unverändert (fremdes CSV-Artefakt unangetastet)', fs.readFileSync(path.join(dir, 'validation-state.json'), 'utf8') === validationStateBefore);
    assertTrue('csv-contract.json unverändert (fremdes CSV-Artefakt unangetastet)', fs.readFileSync(path.join(dir, 'csv-contract.json'), 'utf8') === csvContractBefore);
    assertTrue('package.json unverändert (Werkzeug-Infrastruktur unangetastet)', fs.readFileSync(path.join(dir, 'package.json'), 'utf8') === packageJsonBefore);
    fs.rmSync(dir, { recursive: true, force: true });
}

console.log('=== 7) Ein vorheriger Erfolg bleibt erhalten, wenn derselbe Name später fehlerhaften Inhalt erhält ===');
{
    const dir = makeTempDir();
    fs.writeFileSync(path.join(dir, 'stations-de.json'), VALID_STATIONS_JSON, 'utf8');
    const first = runValidator(dir);
    assertTrue('Vorlauf: Erfolg', first.status === 0);
    const successStateBefore = readState(dir).files['stations-de.json'];
    assertTrue('Vorlauf: Zustand gespeichert', !!successStateBefore);

    fs.writeFileSync(path.join(dir, 'stations-de.json'), INVALID_JSON_SYNTAX, 'utf8');
    const second = runValidator(dir);
    assertTrue('Zweiter Lauf: Exit-Code ungleich 0', second.status !== 0);
    const stateAfter = readState(dir).files['stations-de.json'];
    assertTrue('Voriger Erfolgszustand unverändert erhalten', JSON.stringify(stateAfter) === JSON.stringify(successStateBefore));
    fs.rmSync(dir, { recursive: true, force: true });
}

console.log('=== 8) Änderung des Validator-Fingerprints erzwingt erneute Prüfung (keine unzulässige Überspringung) ===');
{
    const dir = makeTempDir();
    fs.writeFileSync(path.join(dir, 'stations-de.json'), VALID_STATIONS_JSON, 'utf8');
    const first = runValidator(dir);
    assertTrue('Vorlauf: Erfolg', first.status === 0);
    const realState = readState(dir);
    const realFingerprint = realState.files['stations-de.json'].fingerprint;

    // Zustand mit einem bewusst falschen (veralteten) Fingerabdruck ueberschreiben,
    // um einen Praeufer-/Parser-/Vertragsmodul-Versionswechsel zu simulieren.
    realState.files['stations-de.json'].fingerprint = 'veraltet-' + crypto.randomUUID();
    fs.writeFileSync(path.join(dir, 'json-validation-state.json'), JSON.stringify(realState, null, 2), 'utf8');

    const second = runValidator(dir);
    assertTrue('Exit-Code 0', second.status === 0);
    assertTrue('Erneut geprüft (nicht übersprungen)', !second.stdout.includes('ÜBERSPRUNGEN'));
    assertTrue('Fingerabdruck im Zustand wieder korrekt', readState(dir).files['stations-de.json'].fingerprint === realFingerprint);
    fs.rmSync(dir, { recursive: true, force: true });
}

console.log('=== Nachbedingung: content/files/app-data/ weiterhin unberührt ===');
{
    const afterListing = fs.readdirSync(REAL_APP_DATA_DIR).sort();
    assertTrue('Verzeichnislisting unverändert (keine Testartefakte zurückgelassen)', JSON.stringify(beforeListing) === JSON.stringify(afterListing));
    assertTrue('package.json unverändert', fs.readFileSync(path.join(REAL_APP_DATA_DIR, 'package.json'), 'utf8') === beforePackageJson);
}

console.log('---');
console.log(failures === 0 ? 'ALLE NACHWEISE GRÜN' : `${failures} PRÜFUNG(EN) FEHLGESCHLAGEN`);
process.exit(failures === 0 ? 0 : 1);
