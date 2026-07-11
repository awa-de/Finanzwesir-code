Stand: 2026-07-11 | Session: TESTENV-1g | Geändert von: Claude

# TESTENV-1g — CI-Regressionsfixes: Button-Font (GRÜN) + H3-Leak (GRÜN)

## Status: GRÜN

Fix 1 und Fix 2 vollständig umgesetzt, automatisiert und von Albert browserseitig verifiziert.
Fix 2 zunächst wegen der harten 3-Dateien-Grenze gestoppt und gemeldet (siehe Befund unten) —
auf Alberts Anweisung im selben AP nachträglich mit auf 4 erweiterter Grenze umgesetzt.

## Fix 1 — Button-Schrift

**Umgesetzt.** `Apps/prokrastinations-preis/app.css`, Regel `.fw-app__btn`:

```diff
   font-size: 0.95em;
+  font-family: inherit;
   cursor: pointer;
```

Ursache (bereits in `TESTENV-1f_browser-abschlussgate_Ergebnis.md` §9 dokumentiert): `.fw-app`
setzt `font-family: var(--font-body, sans-serif)`, `<button>`-Elemente erben das nicht
automatisch. `inherit` holt sich den bereits korrekten Wert von `.fw-app`, keine zweite Quelle.

**Browser-Nachweis (Albert, `app.test.html`, 2026-07-11):** Manuell geprüft und alles ok.

## Fix 2 — orange H3 im Testseiten-Chrome: GRÜN

### Erster Durchlauf: gestoppt und gemeldet

**Vorgehen:** Python-Scan (Regex auf bare `h1`–`h6`-Selektoren) über alle 15
`tests/engine/*.test.html`-Dateien.

**Befund:** Der orange Block (`background:#fff3e0; border-left:6px solid #ef6c00;
color:#e65100; font-family:monospace; ...`) aus dem ursprünglich gemeldeten
`tooltip.test.html`-Fund (TESTENV-1f §9-Anhang) existiert identisch in **4 Dateien**, nicht in
einer:

- `tests/engine/tooltip.test.html`
- `tests/engine/cadence-density.test.html`
- `tests/engine/irregular-bar.test.html`
- `tests/engine/irregular-line.test.html`

Andere Dateien mit bare `h3`-Regeln (`bar-all`, `bar-ci`, `line-ci`, `pie-ci`, `minmax`,
`line-scenarios`, `line-short-series`, `tooltip-context`) haben abweichende, nicht-orangene
Farbgebung — nicht Teil dieses Fehlers.

**Auftragsvorgabe (ursprünglich):** „Maximal drei Engine-Testseiten dürfen als direkte
Verursacher geöffnet oder geändert werden. Falls mehr als drei Dateien denselben Fehler
verursachen … stoppen und den Befund melden." → 4 > 3, harte Grenze ausgelöst, planmäßig
gestoppt und gemeldet, keine Datei geändert.

### Nachtrag: Grenze von Albert auf 4 erweitert, Fix umgesetzt

Albert hat die harte Grenze im selben AP explizit für genau diesen Fund auf 4 verantwortliche
Dateien erweitert. Umgesetzt:

**Ursache identifiziert:** In allen vier Dateien matcht der bare `h3`-Selektor sowohl die
gewollten Demo-/Chart-Captions (z. B. `<h3>1a. Line</h3>`, `<h3>snap_period_daily_7d.csv</h3>`)
als auch die „Erwartetes Verhalten"-Überschrift in `.fw-test-expected h3`. In der DOM-Struktur
aller vier Dateien sind die Demo-Captions **direkte Kinder** von
`<section class="fw-test-case" data-fw-test-case>`, während die „Erwartetes Verhalten"-h3 zwei
Ebenen tiefer in `<div class="fw-test-expected">` steckt — durchgängig verifiziert (kein
Ausnahmefall in den 4 Dateien).

**Scoping:** Bestehender Container `.fw-test-case` wiederverwendet, keine neue Wrapperstruktur.
Nur der Kombinator geändert (Nachkomme → Direkt-Kind):

```diff
- h3 {
+ .fw-test-case > h3 {
     margin-top: 1.5rem;
     background: #fff3e0;
     padding: 10px 15px;
     border-left: 6px solid #ef6c00;
     color: #e65100;
     font-family: monospace;
     font-size: 1.1rem;
 }
```

Identisch in allen vier Dateien angewendet. `.fw-test-case > h3` trifft weiterhin exakt die
Demo-Captions (bleiben orange, wie beabsichtigt), trifft aber nicht mehr die verschachtelte
`.fw-test-expected h3` und nicht den von der Chart-Engine zur Laufzeit erzeugten
`h3.fw-chart-title` (der laut TESTENV-1f-Fund innerhalb des Chart-Containers, nicht als
Sektions-Direktkind, entsteht).

**Zusätzlich in `tests/shared/test-page.css`** (bestehende Regel `.fw-test-expected h3`,
ausschließlich `color` ergänzt, Margin/Font-Size unverändert):

```diff
 .fw-test-expected h3 {
   margin: 0 0 0.5rem;
   font-size: 0.95rem;
+  color: var(--color-text, #272727);
 }
```

Kein `!important`, keine globale `h3`-Neutralisierung, kein Ausweichen außerhalb der 5
freigegebenen Dateien.

**Automatisierter Nachweis** (Python-Regex auf Selektor-Statement-Ebene, nicht nur Substring):

```
tests/engine/tooltip.test.html: bare-Selektor-Statements=0  gescopte Regel vorhanden=True
tests/engine/cadence-density.test.html: bare-Selektor-Statements=0  gescopte Regel vorhanden=True
tests/engine/irregular-bar.test.html: bare-Selektor-Statements=0  gescopte Regel vorhanden=True
tests/engine/irregular-line.test.html: bare-Selektor-Statements=0  gescopte Regel vorhanden=True
```

Bare `h3 {`/`h3,`-Statement existiert in keiner der vier Dateien mehr; `.fw-test-case > h3 {`
genau einmal je Datei vorhanden.

## Geänderte Dateien

- `Apps/prokrastinations-preis/app.css` (1 Zeile, Fix 1)
- `tests/engine/tooltip.test.html` (Selektor-Kombinator, Fix 2)
- `tests/engine/cadence-density.test.html` (Selektor-Kombinator, Fix 2)
- `tests/engine/irregular-bar.test.html` (Selektor-Kombinator, Fix 2)
- `tests/engine/irregular-line.test.html` (Selektor-Kombinator, Fix 2)
- `tests/shared/test-page.css` (1 Zeile `color`, Fix 2)
- `docs/steering/patches/TESTENV-1g_ci-regressionsfix_Ergebnis.md` (diese Datei)

Keine weitere Datei im Write-Scope berührt. `tools/ci-token-check.js`, Testdaten, Checker,
Standard, App-JavaScript, Engine-/Plugin-Code, Tokens/Design-System — unverändert.

## Checker

```
python tools/check-test-pages.py
→ TESTSEITEN-STRUKTUR: GRUEN
  Geprüfte dauerhafte Testseiten: 16
  Strukturfehler: 0
  Exit: 0
```

`git diff --check`: keine Whitespace-Fehler (Exit 0, nur CRLF/LF-Hinweise von Git, keine
inhaltlichen Warnungen) — auch nach dem Fix-2-Nachtrag erneut geprüft.

## Browser-Smoke

- App-Testseite (Fix 1): **bestanden** — Manuell geprüft und alles ok (Albert, `app.test.html`,
  2026-07-11). Buttons zeigen korrekte Schrift, zusätzlich von Albert bestätigt.
- Die 4 betroffenen Engine-Testseiten (Fix 2): **bestanden** — Albert hat die Browser-Stichprobe
  aus `TESTENV-1f` §5 durchgeführt und die orangenen H3 als behoben bestätigt.
- Zusätzlicher `fwCiAudit()`-Lauf (Albert, `minmax.test.html`, 2026-07-11, nicht Teil des
  ursprünglichen Fix-2-Scopes) fand 1 nicht-CI-Token-Fund: `div.financial-chart-module`
  Rahmenfarbe `#dddddd` (14×). **Kein neuer Fund** — bereits in `BACKLOG.md` als
  `TESTENV-1-FOLLOWUP-BORDER` verankert, Fix bewusst bis zur Tailwind-Arbeit zurückgestellt
  (Alberts Entscheidung, 2026-07-11). Keine Aktion in diesem AP. `h3.fw-chart-title` zeigt im
  selben Lauf korrekt `#218380` (Primary) ohne Beanstandung — kein Hinweis auf einen
  verbliebenen orangen Leak auf der Engine-erzeugten Chart-Überschrift.

## Scope-QA

`git diff --name-status` zeigt außerhalb dieser AP-Änderung nur `.claude/learning/session-log.md`
(Warm-Start-AP-Wechsel-Eintrag aus Session-Start, nicht Teil dieses Write-Scopes). Kein
Layer-1–5-Engine-Code, kein Produktions-JS, keine Tokens/Design-System-Datei verändert.
`tools/ci-token-check.js` unverändert (bestätigt).

## Abschlussmeldung

```text
TESTENV-1g abgeschlossen

Status: GRÜN (beide Fixes browser-verifiziert)
Button-Font gefixt: ja
H3-Ursache eindeutig gefunden: ja (4 Dateien, identischer Block)
Verantwortliche Datei(en): tests/engine/tooltip.test.html, cadence-density.test.html,
  irregular-bar.test.html, irregular-line.test.html — geändert (Grenze von Albert auf 4 erweitert)
Bare Heading-Selektor gescoped: ja (.fw-test-case > h3, alle 4 Dateien)
Shared H3-Farbe ergänzt: ja (tests/shared/test-page.css, .fw-test-expected h3)
CI-Audit-Tool verändert: nein
Checker Exit-Code: 0
Browser-Smoke: Fix 1 bestanden / Fix 2 bestanden (beide Albert-verifiziert)
Produktions-JS/Engine verändert: nein
Scope-QA bestanden: ja
Nebenbefund (kein neuer Fund): #dddddd-Rahmen auf .financial-chart-module, bereits als
  TESTENV-1-FOLLOWUP-BORDER gebacklogged, keine Aktion in diesem AP

Ergebnis:
- docs/steering/patches/TESTENV-1g_ci-regressionsfix_Ergebnis.md

Weiter nur nach Alberts OK.
```
