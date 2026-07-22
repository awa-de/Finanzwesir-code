import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { parseRubikonMarkdown, validateRubikonContent } from '../Theme/assets/js/apps/prokrastinations-preis-rubikon-content.js';
import { validateStationsJson } from '../Theme/assets/js/apps/prokrastinations-preis-stations-contract.js';

let failures = 0;
function assertTrue(label, value) {
  if (value) console.log(`OK   ${label}`);
  else { console.log(`FAIL ${label}`); failures += 1; }
}

function assertInvalid(label, markdown) {
  assertTrue(label, !parseRubikonMarkdown(markdown).ok);
}

console.log('=== 1) erlaubte Mini-Grammatik ===');
const valid = parseRubikonMarkdown('## Zwischenueberschrift\n\nEin **fetter** und *kursiver* Absatz.\n\n- Punkt eins\n- Punkt zwei\n\n1. Erstens\n2. Zweitens\n\n### Detail');
assertTrue('gueltiger Inhalt wird akzeptiert', valid.ok);
assertTrue('AST enthaelt heading, paragraph, ul, ol, heading', valid.ok && valid.ast.map(node => node.type).join('|') === 'heading|paragraph|ul|ol|heading');
assertTrue('Inline-Formatierung wird als AST-Knoten erhalten', valid.ok && valid.ast[1].children[0].some(node => node.type === 'strong') && valid.ast[1].children[0].some(node => node.type === 'em'));

console.log('=== 1b) Ueberschrift direkt vor Absatz -- keine Leerzeile noetig (Blockgrenzen-Korrektur) ===');
const headingThenParagraph = parseRubikonMarkdown('## Ueberschrift\nDirekt folgender Absatz ohne Leerzeile.');
assertTrue('## Ueberschrift + Absatz ohne Leerzeile wird akzeptiert', headingThenParagraph.ok);
assertTrue('AST enthaelt heading, dann paragraph', headingThenParagraph.ok && headingThenParagraph.ast.map(node => node.type).join('|') === 'heading|paragraph');

const h3ThenParagraph = parseRubikonMarkdown('### Detailueberschrift\nEin Absatz direkt danach, ebenfalls ohne Leerzeile.');
assertTrue('### Ueberschrift + Absatz ohne Leerzeile wird akzeptiert', h3ThenParagraph.ok);
assertTrue('AST enthaelt heading, dann paragraph (Ebene 3)', h3ThenParagraph.ok && h3ThenParagraph.ast.map(node => node.type).join('|') === 'heading|paragraph');

const headingThenList = parseRubikonMarkdown('## Ueberschrift\n- Punkt eins\n- Punkt zwei');
assertTrue('Ueberschrift direkt vor Liste ohne Leerzeile wird akzeptiert', headingThenList.ok);
assertTrue('AST enthaelt heading, dann ul', headingThenList.ok && headingThenList.ast.map(node => node.type).join('|') === 'heading|ul');

// Bewusste, minimal-invasive Generalisierung derselben Blockgrenzen-Korrektur: zwei
// Ueberschriften direkt hintereinander ohne Leerzeile werden als zwei eigenstaendige
// heading-Knoten erkannt, nicht abgewiesen. Nicht explizit vom Auftrag verlangt, aber
// eine natuerliche Folge derselben Abtrennungslogik -- hier bewusst dokumentiert.
const twoHeadingsInARow = parseRubikonMarkdown('## H1\n### H2');
assertTrue('zwei Ueberschriften direkt hintereinander werden als zwei heading-Knoten erkannt (dokumentierte Generalisierung)', twoHeadingsInARow.ok && twoHeadingsInARow.ast.map(node => node.type).join('|') === 'heading|heading');

console.log('=== 2) verbotene Syntax wird fail-closed abgewiesen ===');
assertInvalid('Roh-HTML', '<script>alert(1)</script>');
assertInvalid('Bildsyntax', '![alt](https://example.test/bild.png)');
assertInvalid('Links', '[Text](https://example.test)');
assertInvalid('HTML-Entity', '&lt;script&gt;');
assertInvalid('Backticks', '`Code`');
assertInvalid('Escape-Syntax', 'Text\\*mit Escape');
assertInvalid('Tabelle', 'Spalte A | Spalte B');
assertInvalid('Ebene 1', '# Haupttitel');
assertInvalid('verschachtelte Liste', '- Ebene eins\n  - Ebene zwei');
assertInvalid('Nummernsprung', '1. Eins\n3. Drei');
assertInvalid('ungepaarte Formatierung', 'Ein *offener Marker');
assertInvalid('verschachtelte Formatierung', '**außen *innen***');

console.log('=== 3) Stationsvertrag V4.0 ===');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const realConfig = JSON.parse(fs.readFileSync(path.join(root, 'content/files/app-data/stations-de.json'), 'utf8'));
assertTrue('echte stations-de.json ist V4.0-gueltig', validateStationsJson(realConfig).ok);
assertTrue('fehlender Rubikon-Inhalt wird abgewiesen', !validateStationsJson({ ...realConfig, rubikon: undefined }).ok);
assertTrue('ungueltiger Rubikon-Inhalt wird abgewiesen', !validateRubikonContent({ long: '<b>nein</b>', short: 'Text' }).ok);

console.log('=== 4) App bindet Daten sicher als DOM ===');
const appSource = fs.readFileSync(path.join(root, 'Theme/assets/js/apps/prokrastinations-preis.js'), 'utf8');
assertTrue('keine alten Rubikon-Textarrays', !appSource.includes("'Die letzten zehn Jahre sind gelaufen.'"));
assertTrue('beide Varianten kommen aus stationsConfig.rubikon', appSource.includes('stationsConfig.rubikon.long') && appSource.includes('stationsConfig.rubikon.short'));
assertTrue('keine unsichere HTML-Zuweisung', !/\b(?:innerHTML|outerHTML|insertAdjacentHTML)\s*=/.test(appSource) && !/\bDOMParser\s*\(/.test(appSource));

if (failures > 0) {
  console.error(`\n${failures} Nachweis(e) fehlgeschlagen.`);
  process.exitCode = 1;
} else {
  console.log('\nALLE NACHWEISE GRUEN');
}
