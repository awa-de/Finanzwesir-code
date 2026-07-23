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
};

function fail(errorId, message) {
  console.log(JSON.stringify({ status: 'FAIL', errorId, message }, null, 2));
  process.exitCode = 1;
}

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

const [, , tracePath] = process.argv;
if (!tracePath) {
  console.error('Aufruf: node verify.mjs <behavior-trace.json>');
  process.exit(1);
}

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

let browser;
try {
  const { chromium, executablePath } = await loadChromium();
  console.error(`Browser-Executable: ${executablePath}`);
  browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.emulateMedia({ reducedMotion: trace.mode === 'reduced' ? 'reduce' : 'no-preference' });
  const fixtureUrl = 'file://' + fixtureAbsPath.replace(/\\/g, '/');
  await page.goto(fixtureUrl);

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
  console.log(
    JSON.stringify(
      { status: 'PASS', tracePath, mode: trace.mode, actionsVerified: trace.actions.length },
      null,
      2
    )
  );
} catch (err) {
  if (browser) await browser.close();
  fail('GM-ERR-UNEXPECTED', `Unerwarteter Fehler: ${err.message}`);
  process.exit(1);
}
