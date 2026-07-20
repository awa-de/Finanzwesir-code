/**
 * @fileoverview Automatisierter Test für den Offline-CSV-Prüfer (APP-DATA-03a)
 * @module tests/csv-validator.test
 *
 * @description
 * Ruft den echten content/files/app-data/csv-validator.mjs gegen isolierte
 * temporäre Datenordner auf (Node-Argument DATA_DIR-Override). Es werden zu
 * keinem Zeitpunkt Dateien unter content/files/app-data/ selbst angelegt oder
 * verändert — vor und nach dem Testlauf wird das explizit geprüft.
 *
 * V2: Der Prüfer erkennt die Datenform automatisch (Alberts Anweisung,
 * 2026-07-20) statt sie aus csv-contract.json zu lesen. Die Tests zu
 * dataForm-Änderung und fehlendem Vertrags-Eintrag aus V1 sind entfallen
 * (kein manueller Vertrag mehr); dafür kommen Tests zur gegenseitigen
 * Ausschließlichkeit (Zeitreihe vs. Snapshot) und zur inhaltsgetriebenen
 * Neuerkennung hinzu.
 *
 * Aufruf: node tests/csv-validator.test.mjs
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, '..');
const VALIDATOR_PATH = path.join(REPO_ROOT, 'content', 'files', 'app-data', 'csv-validator.mjs');
const REAL_APP_DATA_DIR = path.join(REPO_ROOT, 'content', 'files', 'app-data');
const NODE_EXE = 'C:\\Tools\\ghost-local\\runtime\\node22\\node.exe';

const FIXTURE_DIR = path.join(REPO_ROOT, 'tests', 'fixtures', 'engine');

let failures = 0;
function assertTrue(label, cond) {
    if (cond) { console.log(`OK   ${label}`); } else { console.log(`FAIL ${label}`); failures++; }
}

function runValidator(dataDir) {
    const res = spawnSync(NODE_EXE, [VALIDATOR_PATH, dataDir], { encoding: 'utf8' });
    return { status: res.status, stdout: res.stdout || '', stderr: res.stderr || '' };
}

function makeTempDir() {
    return fs.mkdtempSync(path.join(os.tmpdir(), 'fw-csv-validator-test-'));
}

function readState(dir) {
    const p = path.join(dir, 'validation-state.json');
    if (!fs.existsSync(p)) return { files: {} };
    return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function readContract(dir) {
    const p = path.join(dir, 'csv-contract.json');
    if (!fs.existsSync(p)) return { files: {} };
    return JSON.parse(fs.readFileSync(p, 'utf8'));
}

const VALID_TIMESERIES_CSV = 'Datum;Wert\n2020-01-01;10,5 %\n2020-02-01;11,3 %\n';
const VALID_SNAPSHOT_ONLY_CSV = 'Kategorie;Anteil\nGold;15,0 %\nAktien;85,0 %\n';
const HEADER_ONLY_CSV = 'Datum;Wert\n'; // ungueltig in beiden Interpretationen (keine Datenzeile)

console.log('=== Vorbedingung: content/files/app-data/ unberührt vor dem Test ===');
const beforeListing = fs.readdirSync(REAL_APP_DATA_DIR).sort();

console.log('=== 1) MSCI-Überblick.csv wird konfliktfrei in msci-ueberblick.csv umbenannt ===');
{
    const dir = makeTempDir();
    fs.writeFileSync(path.join(dir, 'MSCI-Überblick.csv'), VALID_TIMESERIES_CSV, 'utf8');
    const res = runValidator(dir);
    assertTrue('Exit-Code 0', res.status === 0);
    assertTrue('Datei umbenannt', !fs.existsSync(path.join(dir, 'MSCI-Überblick.csv')) && fs.existsSync(path.join(dir, 'msci-ueberblick.csv')));
    assertTrue('Zustand enthält kanonischen Namen', !!readState(dir).files['msci-ueberblick.csv']);
    fs.rmSync(dir, { recursive: true, force: true });
}

console.log('=== 2) Kanonisierungs-Konflikt -> keine einzige Umbenennung ===');
{
    const dir = makeTempDir();
    fs.writeFileSync(path.join(dir, 'MSCI-Überblick.csv'), VALID_TIMESERIES_CSV, 'utf8');
    fs.writeFileSync(path.join(dir, 'msci-ueberblick.csv'), VALID_TIMESERIES_CSV, 'utf8');
    fs.writeFileSync(path.join(dir, 'Portfolio.csv'), VALID_TIMESERIES_CSV, 'utf8'); // unbeteiligt, braucht auch Umbenennung
    const res = runValidator(dir);
    assertTrue('Exit-Code ungleich 0', res.status !== 0);
    assertTrue('Konfliktdatei 1 weiterhin vorhanden (nicht umbenannt)', fs.existsSync(path.join(dir, 'MSCI-Überblick.csv')));
    assertTrue('Konfliktdatei 2 weiterhin vorhanden (nicht umbenannt)', fs.existsSync(path.join(dir, 'msci-ueberblick.csv')));
    // fs.existsSync() ist unter Windows/NTFS case-insensitiv -- fuer einen
    // wirklich case-erhaltenden Nachweis muss die reale Verzeichnislistung
    // geprueft werden, nicht existsSync() mit einer bestimmten Schreibweise.
    const listingAfterConflict = fs.readdirSync(dir);
    assertTrue('Unbeteiligte Datei ebenfalls nicht umbenannt (ganzer Lauf blockiert)', listingAfterConflict.includes('Portfolio.csv') && !listingAfterConflict.includes('portfolio.csv'));
    assertTrue('Fehlermeldung nennt Namenskonflikt', res.stderr.includes('Namenskonflikt'));
    fs.rmSync(dir, { recursive: true, force: true });
}

console.log('=== 3) Gültige Zeitreihe wird automatisch als "timeseries" erkannt ===');
{
    const dir = makeTempDir();
    fs.writeFileSync(path.join(dir, 'zeitreihe.csv'), VALID_TIMESERIES_CSV, 'utf8');
    const res = runValidator(dir);
    assertTrue('Exit-Code 0', res.status === 0);
    assertTrue('Ausgabe meldet OK (timeseries)', res.stdout.includes('OK') && res.stdout.includes('(timeseries)'));
    assertTrue('Auflistung: "ok als Zeitreihe"', res.stdout.includes('zeitreihe.csv  ok als Zeitreihe'));
    assertTrue('Zustand: dataForm=timeseries', readState(dir).files['zeitreihe.csv'].dataForm === 'timeseries');
    assertTrue('csv-contract.json automatisch geschrieben', readContract(dir).files['zeitreihe.csv'].dataForm === 'timeseries');
    fs.rmSync(dir, { recursive: true, force: true });
}

console.log('=== 4) Gültiger Snapshot wird automatisch als "snapshot" erkannt ===');
{
    const dir = makeTempDir();
    fs.writeFileSync(path.join(dir, 'snapshot.csv'), VALID_SNAPSHOT_ONLY_CSV, 'utf8');
    const res = runValidator(dir);
    assertTrue('Exit-Code 0', res.status === 0);
    assertTrue('Ausgabe meldet OK (snapshot)', res.stdout.includes('OK') && res.stdout.includes('(snapshot)'));
    assertTrue('Auflistung: "ok für Tortendiagramme"', res.stdout.includes('snapshot.csv  ok für Tortendiagramme'));
    assertTrue('csv-contract.json automatisch geschrieben', readContract(dir).files['snapshot.csv'].dataForm === 'snapshot');
    fs.rmSync(dir, { recursive: true, force: true });
}

console.log('=== 5) Gegenseitige Ausschließlichkeit: echte Zeitreihe wird NICHT auch als Snapshot akzeptiert ===');
{
    const dir = makeTempDir();
    // test_data_singlebalken.csv (Datum;Portfoliowert, echte ISO-Daten) --
    // exakt der Fall, der in APP-DATA-02 im Upload-Dienst als Bug auffiel:
    // ohne Ausschlussregel würde das hier als "gültiger Snapshot" durchgehen.
    const csv = fs.readFileSync(path.join(FIXTURE_DIR, 'test_data_singlebalken.csv'), 'utf8');
    fs.writeFileSync(path.join(dir, 'reine-zeitreihe.csv'), csv, 'utf8');
    const res = runValidator(dir);
    assertTrue('Exit-Code 0', res.status === 0);
    assertTrue('Erkannt ausschließlich als Zeitreihe', res.stdout.includes('(timeseries)') && !res.stdout.includes('(snapshot)'));
    assertTrue('Zustand: dataForm=timeseries (nicht snapshot)', readState(dir).files['reine-zeitreihe.csv'].dataForm === 'timeseries');
    fs.rmSync(dir, { recursive: true, force: true });
}

console.log('=== 6) Unveränderte, vorher gültige Datei wird übersprungen ===');
{
    const dir = makeTempDir();
    fs.writeFileSync(path.join(dir, 'stabil.csv'), VALID_TIMESERIES_CSV, 'utf8');
    const first = runValidator(dir);
    assertTrue('Erster Lauf: Erfolg', first.status === 0 && first.stdout.includes('OK'));
    const second = runValidator(dir);
    assertTrue('Zweiter Lauf: Exit-Code 0', second.status === 0);
    assertTrue('Zweiter Lauf: uebersprungen', second.stdout.includes('ÜBERSPRUNGEN') && second.stdout.includes('stabil.csv'));
    fs.rmSync(dir, { recursive: true, force: true });
}

console.log('=== 7) Inhaltliche Änderung löst erneute Prüfung aus ===');
{
    const dir = makeTempDir();
    fs.writeFileSync(path.join(dir, 'aendert-sich.csv'), VALID_TIMESERIES_CSV, 'utf8');
    runValidator(dir);
    fs.writeFileSync(path.join(dir, 'aendert-sich.csv'), VALID_TIMESERIES_CSV + '2020-03-01;12,0 %\n', 'utf8');
    const res = runValidator(dir);
    assertTrue('Exit-Code 0', res.status === 0);
    assertTrue('Erneut geprüft, nicht übersprungen', res.stdout.includes('OK') && !res.stdout.includes('ÜBERSPRUNGEN'));
    fs.rmSync(dir, { recursive: true, force: true });
}

console.log('=== 8) Inhaltlicher Formwechsel (Zeitreihe -> Snapshot) wird korrekt neu erkannt ===');
{
    const dir = makeTempDir();
    fs.writeFileSync(path.join(dir, 'form-wechsel.csv'), VALID_TIMESERIES_CSV, 'utf8');
    const first = runValidator(dir);
    assertTrue('Vorlauf: erkannt als timeseries', first.status === 0 && readState(dir).files['form-wechsel.csv'].dataForm === 'timeseries');

    fs.writeFileSync(path.join(dir, 'form-wechsel.csv'), VALID_SNAPSHOT_ONLY_CSV, 'utf8'); // komplett anderer Inhalt
    const second = runValidator(dir);
    assertTrue('Exit-Code 0', second.status === 0);
    assertTrue('Erneut geprüft (nicht übersprungen)', !second.stdout.includes('ÜBERSPRUNGEN'));
    assertTrue('dataForm im Zustand jetzt snapshot', readState(dir).files['form-wechsel.csv'].dataForm === 'snapshot');
    fs.rmSync(dir, { recursive: true, force: true });
}

console.log('=== 9) Änderung des Prüfer-Fingerabdrucks löst erneute Prüfung aus ===');
{
    const dir = makeTempDir();
    fs.writeFileSync(path.join(dir, 'fingerprint-test.csv'), VALID_TIMESERIES_CSV, 'utf8');
    const first = runValidator(dir);
    assertTrue('Vorlauf: Erfolg', first.status === 0);
    const realState = readState(dir);
    const realFingerprint = realState.files['fingerprint-test.csv'].fingerprint;

    // Zustand mit einem bewusst falschen (veralteten) Fingerabdruck ueberschreiben,
    // um einen Praeufer-/Parser-Versionswechsel zu simulieren.
    realState.files['fingerprint-test.csv'].fingerprint = 'veraltet-' + crypto.randomUUID();
    fs.writeFileSync(path.join(dir, 'validation-state.json'), JSON.stringify(realState, null, 2), 'utf8');

    const second = runValidator(dir);
    assertTrue('Exit-Code 0', second.status === 0);
    assertTrue('Erneut geprüft (nicht übersprungen)', !second.stdout.includes('ÜBERSPRUNGEN'));
    assertTrue('Fingerabdruck im Zustand wieder korrekt', readState(dir).files['fingerprint-test.csv'].fingerprint === realFingerprint);
    fs.rmSync(dir, { recursive: true, force: true });
}

console.log('=== 10) Datei, die in keiner der beiden Formen gültig ist, schlägt verständlich fehl ===');
{
    const dir = makeTempDir();
    fs.writeFileSync(path.join(dir, 'nur-header.csv'), HEADER_ONLY_CSV, 'utf8');
    const res = runValidator(dir);
    assertTrue('Exit-Code ungleich 0', res.status !== 0);
    assertTrue('Fehlermeldung nennt weder Zeitreihe noch Snapshot', res.stderr.includes('weder als Zeitreihe noch als Snapshot gültig'));
    assertTrue('Kein Zustandseintrag angelegt', !readState(dir).files['nur-header.csv']);
    assertTrue('Kein Contract-Eintrag angelegt', !readContract(dir).files['nur-header.csv']);
    fs.rmSync(dir, { recursive: true, force: true });
}

console.log('=== 11) Bestehende Bar-, Line- und Pie-Fixtures bleiben ohne Regression lesbar ===');
{
    const { parseCsvText } = await import('file:///' + path.join(REPO_ROOT, 'Theme/assets/js/fw-chart-engine/data/CSVParser.js').replace(/\\/g, '/').replace(/ /g, '%20'));
    const barFixtures = ['bd_single_year.csv', 'bd_zero_and_gaps.csv', 'test_data_singlebalken.csv'];
    const lineFixtures = ['test_data-Liniendiagramm.csv', 'bd_ranking_stress.csv'];
    const pieFixtures = ['test_data_torte_NEU.csv', 'test_data_torte.csv'];
    let regressionOk = true;
    for (const name of [...barFixtures, ...lineFixtures]) {
        const text = fs.readFileSync(path.join(FIXTURE_DIR, name), 'utf8');
        try {
            const r = parseCsvText(text, { expectDate: true, delimiter: ';' });
            if (!(r.rows.length > 0)) regressionOk = false;
        } catch { regressionOk = false; }
    }
    for (const name of pieFixtures) {
        const text = fs.readFileSync(path.join(FIXTURE_DIR, name), 'utf8');
        try {
            const r = parseCsvText(text, { expectDate: false, delimiter: ';' });
            if (!(r.rows.length > 0)) regressionOk = false;
        } catch { regressionOk = false; }
    }
    assertTrue('Alle geprüften Fixtures weiterhin fehlerfrei lesbar', regressionOk);
}

console.log('=== Nachbedingung: content/files/app-data/ weiterhin unberührt ===');
{
    const afterListing = fs.readdirSync(REAL_APP_DATA_DIR).sort();
    assertTrue('Verzeichnislisting unverändert (keine Testartefakte zurückgelassen)', JSON.stringify(beforeListing) === JSON.stringify(afterListing));
}

console.log('---');
console.log(failures === 0 ? 'ALLE NACHWEISE GRÜN' : `${failures} PRÜFUNG(EN) FEHLGESCHLAGEN`);
process.exit(failures === 0 ? 0 : 1);
