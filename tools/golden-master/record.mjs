#!/usr/bin/env node
// Golden-Master-Trace-Recorder (AF-GM-02). Führt eine menschlich vorgegebene,
// geordnete Aktionsliste gegen eine lokale Fixture aus und zeichnet die
// sichtbaren Zustände als behavior-trace.json auf. Kein autonomes Erkunden,
// keine Interpretation von Mockup-JavaScript — nur Ausführen + Beobachten.

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadChromium } from './browser-path.mjs';

function usage() {
  console.error(
    'Aufruf: node record.mjs <action-script.json> <mode:normal|reduced> <output-trace.json> <screenshot-dir>'
  );
  process.exit(1);
}

const [, , actionScriptPath, mode, outputTracePath, screenshotDir] = process.argv;
if (!actionScriptPath || !mode || !outputTracePath || !screenshotDir) usage();
if (mode !== 'normal' && mode !== 'reduced') usage();

const toolDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(toolDir, '..', '..');
const playwrightPkg = JSON.parse(
  readFileSync(resolve(repoRoot, 'node_modules', 'playwright', 'package.json'), 'utf-8')
);

const actionScript = JSON.parse(readFileSync(actionScriptPath, 'utf-8'));
const fixtureRelPath = actionScript.fixturePath;
const fixtureAbsPath = resolve(repoRoot, fixtureRelPath);
const fixtureBuffer = readFileSync(fixtureAbsPath);
const referenceSha256 = createHash('sha256').update(fixtureBuffer).digest('hex');

mkdirSync(screenshotDir, { recursive: true });

const { chromium, executablePath } = await loadChromium();
const browser = await chromium.launch();
const chromiumVersion = browser.version();
const context = await browser.newContext();
const page = await context.newPage();
await page.emulateMedia({ reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference' });

const fixtureUrl = 'file://' + fixtureAbsPath.replace(/\\/g, '/');
const startTime = Date.now();
await page.goto(fixtureUrl);

async function readClassFlag(locator, className) {
  const classAttr = (await locator.getAttribute('class')) || '';
  return String(classAttr.split(/\s+/).filter(Boolean).includes(className));
}

const recordedActions = [];
let lastObserved = null;

for (let i = 0; i < actionScript.actions.length; i++) {
  const step = actionScript.actions[i];
  const locator = page.locator(step.selector);
  let expected = null;

  if (step.type === 'click') {
    await locator.click();
  } else if (step.type === 'observe-text') {
    expected = await locator.innerText();
    lastObserved = { selector: step.selector, kind: 'text', attribute: null, className: null, expected };
  } else if (step.type === 'observe-attribute') {
    expected = await locator.getAttribute(step.attribute);
    lastObserved = { selector: step.selector, kind: 'attribute', attribute: step.attribute, className: null, expected };
  } else if (step.type === 'observe-class') {
    expected = await readClassFlag(locator, step.className);
    lastObserved = { selector: step.selector, kind: 'class', attribute: null, className: step.className, expected };
  } else if (step.type === 'set-input-value') {
    if (typeof step.value !== 'string' || step.value.length === 0) {
      throw new Error(`GM-ERR-INPUT-TARGET-INVALID: set-input-value benötigt ein nichtleeres String-Feld 'value' (Selector '${step.selector}')`);
    }
    const count = await locator.count();
    if (count !== 1) {
      throw new Error(`GM-ERR-INPUT-TARGET-INVALID: Selector '${step.selector}' trifft nicht genau ein Element (${count} Treffer)`);
    }
    const tagName = await locator.evaluate((el) => el.tagName);
    if (tagName !== 'INPUT') {
      throw new Error(`GM-ERR-INPUT-TARGET-INVALID: Selector '${step.selector}' zeigt auf <${tagName.toLowerCase()}>, nicht auf ein natives <input>`);
    }
    await locator.evaluate((el, val) => {
      el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }, step.value);
    expected = await locator.inputValue();
  } else {
    throw new Error(`Unbekannter Aktionstyp im Action-Script: ${step.type}`);
  }

  const screenshotAbsPath = join(screenshotDir, `step-${String(i).padStart(2, '0')}-${step.type}.png`);
  await page.screenshot({ path: screenshotAbsPath });

  recordedActions.push({
    index: i,
    type: step.type,
    selector: step.selector,
    attribute: step.attribute ?? null,
    className: step.className ?? null,
    value: step.type === 'set-input-value' ? step.value : null,
    expected: step.type === 'click' ? null : expected,
    relativeTimeMs: Date.now() - startTime,
    screenshotPath: relative(repoRoot, screenshotAbsPath).replace(/\\/g, '/'),
  });
}

await browser.close();

if (!lastObserved) {
  throw new Error('Action-Script enthält keine observe-*-Aktion — expectedEndState nicht ableitbar.');
}

const trace = {
  referencePath: fixtureRelPath,
  referenceSha256,
  playwrightVersion: playwrightPkg.version,
  chromiumVersion,
  mode,
  recordedAt: new Date().toISOString(),
  actions: recordedActions,
  expectedEndState: {
    selector: lastObserved.selector,
    kind: lastObserved.kind,
    attribute: lastObserved.attribute,
    className: lastObserved.className,
    expected: lastObserved.expected,
  },
};

writeFileSync(outputTracePath, JSON.stringify(trace, null, 2) + '\n', 'utf-8');
console.log(`AUFNAHME OK: ${outputTracePath} (Modus ${mode}, ${recordedActions.length} Aktionen, Chromium ${chromiumVersion})`);
console.log(`Browser-Executable: ${executablePath}`);
