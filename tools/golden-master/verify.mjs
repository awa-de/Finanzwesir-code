#!/usr/bin/env node
// Golden-Master-Trace-Verifizierer (AF-GM-02). Spielt einen aufgezeichneten
// behavior-trace.json real gegen die referenzierte Fixture ab und prüft
// Hash, Selector-Auflösung und beobachteten Zustand. Fail-closed mit
// stabiler Fehler-ID bei jeder Abweichung — kein "best effort"-Fortsetzen.

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadChromium } from './browser-path.mjs';

const ERR = {
  HASH_MISMATCH: 'GM-ERR-HASH-MISMATCH',
  SELECTOR_NOT_FOUND: 'GM-ERR-SELECTOR-NOT-FOUND',
  STATE_MISMATCH: 'GM-ERR-STATE-MISMATCH',
  INPUT_TARGET_INVALID: 'GM-ERR-INPUT-TARGET-INVALID',
  TARGET_URL_NOT_LOCAL: 'GM-ERR-TARGET-URL-NOT-LOCAL', // NEW (AF-GM-02c)
  CLI_ARGS_INVALID: 'GM-ERR-CLI-ARGS-INVALID', // NEW (AF-GM-02c-Fix)
};

function fail(errorId, message) {
  console.log(JSON.stringify({ status: 'FAIL', errorId, message }, null, 2));
  process.exitCode = 1;
}

// NEW (AF-GM-02c): einzige zulaessige Loopback-Hosts fuer --target-url.
// url.hostname serialisiert IPv6 mit Klammern, daher '[::1]' statt '::1'.
const LOCAL_TARGET_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']); // NEW

// NEW (AF-GM-02c): strikte Whitelist-Pruefung ueber die WHATWG-URL-Klasse
// statt eigenem Regex auf dem rohen String. Gibt die geparste URL zurueck
// oder null bei jeder Abweichung (Syntax, Schema, Host, Zugangsdaten) --
// kein Best-Effort-Parsing, keine Ausnahmeliste.
function parseLocalTargetUrl(rawUrl) { // NEW
  let url; // NEW
  try { // NEW
    url = new URL(rawUrl); // NEW
  } catch { // NEW
    return null; // NEW
  } // NEW
  if (url.protocol !== 'http:') return null; // NEW
  if (url.username !== '' || url.password !== '') return null; // NEW
  if (!LOCAL_TARGET_HOSTS.has(url.hostname)) return null; // NEW
  return url; // NEW
} // NEW

async function readClassFlag(locator, className) {
  const classAttr = (await locator.getAttribute('class')) || '';
  return String(classAttr.split(/\s+/).filter(Boolean).includes(className));
}

async function observe(locator, action) {
  if (action.type === 'observe-text') return locator.innerText();
  if (action.type === 'observe-attribute') return locator.getAttribute(action.attribute);
  if (action.type === 'observe-class') return readClassFlag(locator, action.className);
  throw new Error(`Unbekannter Aktionstyp: ${action.type}`);
}

const rawArgs = process.argv.slice(2); // CHANGED (AF-GM-02c): manuelles Parsen statt Fix-Destrukturierung, da eine optionale --target-url-Flag dazukommt.
const tracePath = rawArgs[0]; // CHANGED
if (!tracePath) {
  console.error('Aufruf: node verify.mjs <behavior-trace.json> [--target-url <url>]'); // CHANGED
  process.exit(1);
}

// CHANGED (AF-GM-02c-Fix): P1-Befund -- der bisherige Loop-Parser liess
// '--target-url' ohne Wert (rawArgs[i+1] === undefined) still auf null
// fallen, wodurch der Zielmodus unbemerkt uebersprungen und gegen die
// Referenz-Fixture statt gegen die Ziel-URL geprueft wurde (Exit 0 trotz
// angefordertem Target-Replay). Ersetzt durch eine strikte Positivliste:
// nach <trace> ist ausschliesslich [] oder ['--target-url', <nichtleerer
// String>] zulaessig. Jede andere Form (fehlender Wert, unbekanntes
// Argument, doppeltes --target-url) wird vor Hash-, Browser- und
// Zielnavigation abgelehnt.
const restArgs = rawArgs.slice(1); // CHANGED
let targetUrlArg; // CHANGED
if (restArgs.length === 0) { // CHANGED
  targetUrlArg = undefined; // CHANGED
} else if (restArgs.length === 2 && restArgs[0] === '--target-url' && restArgs[1]) { // CHANGED
  targetUrlArg = restArgs[1]; // CHANGED
} else { // CHANGED
  fail( // CHANGED
    ERR.CLI_ARGS_INVALID, // CHANGED
    `Ungueltige Argumente: erlaubt ist nur '<trace>' oder '<trace> --target-url <url>' (erhalten: ${JSON.stringify(restArgs)})` // CHANGED
  ); // CHANGED
  process.exit(1); // CHANGED
} // CHANGED

const toolDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(toolDir, '..', '..');
const trace = JSON.parse(readFileSync(tracePath, 'utf-8'));

const fixtureAbsPath = resolve(repoRoot, trace.referencePath);
const fixtureBuffer = readFileSync(fixtureAbsPath);
const actualSha256 = createHash('sha256').update(fixtureBuffer).digest('hex');

if (actualSha256 !== trace.referenceSha256) {
  fail(
    ERR.HASH_MISMATCH,
    `Fixture-Hash weicht ab: Trace erwartet ${trace.referenceSha256}, real ${actualSha256} (${trace.referencePath})`
  );
  process.exit(1);
}

// NEW (AF-GM-02c): Ziel-URL-Lokalitaet wird nach dem Hash-Check und vor jeder
// Browser-Navigation geprueft. Ohne --target-url bleibt das Verhalten
// bytegleich zum bestehenden file://-Fixture-Replay.
let targetUrl = null; // NEW
if (targetUrlArg) { // NEW
  const parsed = parseLocalTargetUrl(targetUrlArg); // NEW
  if (!parsed) { // NEW
    fail( // NEW
      ERR.TARGET_URL_NOT_LOCAL, // NEW
      `Ziel-URL '${targetUrlArg}' ist keine gueltige lokale Loopback-URL (nur http:, Host localhost/127.0.0.1/[::1], kein Userinfo)` // NEW
    ); // NEW
    process.exit(1); // NEW
  } // NEW
  targetUrl = parsed.href; // NEW
} // NEW

let browser;
try {
  const { chromium, executablePath } = await loadChromium();
  console.error(`Browser-Executable: ${executablePath}`);
  browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.emulateMedia({ reducedMotion: trace.mode === 'reduced' ? 'reduce' : 'no-preference' });
  const fixtureUrl = 'file://' + fixtureAbsPath.replace(/\\/g, '/');
  await page.goto(targetUrl ?? fixtureUrl); // CHANGED (AF-GM-02c): Zielmodus navigiert gegen die geprueft-lokale URL statt der Datei.

  for (const action of trace.actions) {
    const locator = page.locator(action.selector);
    const count = await locator.count();
    if (count === 0) {
      fail(ERR.SELECTOR_NOT_FOUND, `Selector '${action.selector}' (Aktion #${action.index}, ${action.type}) löst nicht auf`);
      await browser.close();
      process.exit(1);
    }

    if (action.type === 'click') {
      await locator.click();
      continue;
    }

    if (action.type === 'set-input-value') {
      if (count !== 1) {
        fail(ERR.INPUT_TARGET_INVALID, `Selector '${action.selector}' (Aktion #${action.index}) trifft nicht genau ein Element (${count} Treffer)`);
        await browser.close();
        process.exit(1);
      }
      const tagName = await locator.evaluate((el) => el.tagName);
      if (tagName !== 'INPUT') {
        fail(ERR.INPUT_TARGET_INVALID, `Selector '${action.selector}' (Aktion #${action.index}) zeigt auf <${tagName.toLowerCase()}>, nicht auf ein natives <input>`);
        await browser.close();
        process.exit(1);
      }
      await locator.evaluate((el, val) => {
        el.value = val;
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }, action.value);
      const observedValue = await locator.inputValue();
      if (observedValue !== action.expected) {
        fail(ERR.STATE_MISMATCH, `Aktion #${action.index} (set-input-value auf '${action.selector}'): erwartet '${action.expected}', beobachtet '${observedValue}'`);
        await browser.close();
        process.exit(1);
      }
      continue;
    }

    const observed = await observe(locator, action);
    if (observed !== action.expected) {
      fail(
        ERR.STATE_MISMATCH,
        `Aktion #${action.index} (${action.type} auf '${action.selector}'): erwartet '${action.expected}', beobachtet '${observed}'`
      );
      await browser.close();
      process.exit(1);
    }
  }

  const es = trace.expectedEndState;
  const endLocator = page.locator(es.selector);
  const endCount = await endLocator.count();
  if (endCount === 0) {
    fail(ERR.SELECTOR_NOT_FOUND, `Endzustand-Selector '${es.selector}' löst nicht auf`);
    await browser.close();
    process.exit(1);
  }

  const endObserved = await observe(endLocator, { type: `observe-${es.kind}`, attribute: es.attribute, className: es.className });
  if (endObserved !== es.expected) {
    fail(ERR.STATE_MISMATCH, `Endzustand weicht ab: erwartet '${es.expected}', beobachtet '${endObserved}'`);
    await browser.close();
    process.exit(1);
  }

  await browser.close();
  const passOutput = { status: 'PASS', tracePath, mode: trace.mode, actionsVerified: trace.actions.length }; // CHANGED (AF-GM-02c-Fix): targetUrl nur noch bedingt ergaenzt, damit der Fixture-Modus wieder bytegleich zum urspruenglichen Output ist.
  if (targetUrl) passOutput.targetUrl = targetUrl; // CHANGED
  console.log(JSON.stringify(passOutput, null, 2)); // CHANGED
} catch (err) {
  if (browser) await browser.close();
  fail('GM-ERR-UNEXPECTED', `Unerwarteter Fehler: ${err.message}`);
  process.exit(1);
}
