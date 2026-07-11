Stand: 2026-07-11 | Session: TESTENV-1f-Nachtrag | Geändert von: Claude (Sonnet)

# PATCH-QUITTUNG | CI-AUDIT-TOOL-PRECISION | 2026-07-11

**Beauftragt:** Drei Präzisions-Fixes an `fwCiAudit()`, alle aus echten Testläufen abgeleitet
(`tests/engine/tooltip-context.test.html`, `Apps/prokrastinations-preis/app.test.html`):

1. Tooltip-Farben nur werten, wenn `enabled !== false` (Pie-Charts mit `infoSystem: 'CENTER_TEXT'`
   haben ein abgeschaltetes, nie gemaltes Tooltip-Plugin — dessen verbliebene Chart.js-Default-
   Farben Schwarz/Weiß waren ein Fehlalarm).
2. `.kg-card` selbst wird nicht mehr mitgewertet, nur noch dessen Inhalt (`.kg-card *` statt
   `.kg-card, .kg-card *`) — die Karte ist laut `TEST_PAGE_STANDARD.md` §6 nur die
   Ghost-Card-Simulation der Testseite (`app.test.html:15` setzt dort bewusst reines
   Testseiten-Chrome `#f9f9f9`, keine App-Farbe).
3. `color`/`font-family` bei `<input type="range/checkbox/radio">` nicht mehr werten (Browser-
   Default, kein sichtbarer Text). Stattdessen neu: `accent-color` bei genau diesen drei
   Input-Typen prüfen — das ist die tatsächlich sichtbare, CI-relevante Reglerfarbe.

**Geändert:** 1 Datei, 3 präzise Anpassungen im bestehenden `fwCiAudit()`/`auditCanvasCharts()`-Code
(kein neuer Funktionsblock).

**Dateien:**
- `tools/ci-token-check.js`
  - `auditCanvasCharts()`: Guard `tt.enabled !== false` vor der Tooltip-Farbprüfung.
  - `fwCiAudit()`: Scan-Selektor `.kg-card *` (statt `.kg-card, .kg-card *`); neue
    `NO_TEXT_INPUT_TYPES`-Menge (`range`/`checkbox`/`radio`); `color`/`font-family` für diese
    Inputs übersprungen, `accent-color` (neue Eigenschaft „Akzent") stattdessen geprüft.

**CHANGED/NEW:** N/A — Browser-Konsolen-Tool, kein Produktionscode.

**Tabu-Check:** keine ✓.

**Gate-Typ:** Light (1 Datei, kein Tabu, keine Architekturwirkung). Albert hat mit „Setze alle drei
zusammen um" freigegeben.

**Testfall:** Beide bereits getesteten Seiten erneut öffnen und Skript einfügen:
- `tests/engine/tooltip-context.test.html` → Canvas-Tabelle sollte keine `#000000`-Tooltipzeilen
  mehr zeigen (die 3 Pie-Charts sind jetzt korrekt ausgenommen); nur noch der bereits bekannte
  `#dddddd`-Rahmen-Fund bleibt (separates, vermerktes Backlog-Thema).
- `Apps/prokrastinations-preis/app.test.html` → `div.kg-card`-Zeile mit `#f9f9f9` verschwindet;
  `input.fw-app__slider` erscheint nicht mehr mit `Text #101010`/`Schrift Arial`, stattdessen (falls
  vorhanden) eine `Akzent`-Zeile mit der Reglerfarbe.
- `node --check tools/ci-token-check.js` lokal fehlerfrei.

**Offene Fragen:** keine.

Zählprüfung: Ich habe 1 Datei mit 3 einzelnen, präzisen Korrekturen geändert (keine neuen
Funktionen). Stimmt das?
→ Bitte beide Seiten erneut testen, Ergebnis reinkopieren. Ich warte vor dem nächsten Patch.
