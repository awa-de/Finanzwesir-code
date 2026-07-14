Stand: 2026-07-14 | Session: AP-chart-engine-01 / CE-2c (Sonnet) | Geändert von: Claude

# AP-chart-engine-01, CE-2c: Unabhängige Abnahme und Scope-Klärung — Ergebnisprotokoll

**Status: GELB — read-only Review, keine Datei geändert. Kein Blocker gefunden; ein informativer Findung (F-08) und eine offene Toolbau-Empfehlung.**

Kettenposition: CE-1 ✅, CE-1a ✅, CE-2b ✅ (Alberts Browser-Abnahme bestätigt), **CE-2c** (dieser Review, ausführendes Modell Sonnet). Kein Commit, keine Datei geändert.

## Auftrag

Unabhängige, read-only Abnahme des vorliegenden CE-2b-Ergebnisses: (A) Scope/Renderer-Delta, (B) Fallback-Architektur beider Datenpfade, (C) defensive Error-Hex-Fallbacks, (D) Toolbau-Kandidat `tools/engine-dom-check.js`. Keine Entscheidung, keine Umsetzung, kein CE-3-Start.

## 1. Scope- und Renderer-Abnahme

Vollständiger `git diff` von `FwRenderer.js` gegen HEAD geprüft: **genau fünf Hunks**, deckungsgleich mit den fünf CE-2b-Deltapunkten (Wrapper, Canvas-Container, A11y-Tabelle, Loading, Error). Kein sechster, unbeschriebener Change.

- Container-Query-Anker (`container-type: inline-size`, `container-name: fw-chart`) und Canvas-Höhe `400px` unverändert erhalten.
- Canvas-Event `fw-chart-show-details`, `FwTheme.init()`-Reihenfolge, Datenpfade, Titel/BAN/Toolbar/Legende/Popover-DOM unangetastet — inkl. der vorbestehenden `'fw-btn ' + (… ? 'active' : '')`/`'fw-toggle-opt ' + …`-Konkatenationen (Bestand, außerhalb Scope, keine CE-2b-Neueinführung).
- Kein neuer variabler `innerHTML`-Pfad (nur `container.innerHTML = ''`-Reset und statisches `'&times;'`, beide Bestand).
- Beide Datenpfade bedient dieselbe, nicht verzweigte `FwRenderer`-Logik. Browser-Nachweis (Albert, `engine-dom-check.js`): CSV-Pfad `line-ci.test.html` 9/9 aktive Charts PASS via `Fallback(left:-9999px)`; App-Pfad `app.test.html` Screen 2/4 alle aktiven Charts PASS via `sr-only+Fallback`.

**Ergebnis: CE-2b-Delta vollständig und ausschließlich umgesetzt.**

## 2. Kompatibilitätsbewertung

**Tailwind-HTML-Ziel (unabhängig verifiziert):** `app.test.html` trägt die `@theme inline`-Bridge (`--color-error-text/-border/-bg` je auf sich selbst gemappt) und ein `@source inline(...)`-Manifest, das jedes von CE-2b benötigte Utility-Token als literalen Substring enthält (`flex`, `flex-col`, `gap-3`, `relative`, `w-full`, `sr-only`, die vollständige Loading-/Spinner-Kette, `rounded-lg border border-error-border bg-error-bg p-4 text-error-text`). Kein Manifest-Edit nötig — Deckung besteht, weil `app.js` dieselben §6.10-Rezepte bereits für die eigene App-Fehlermeldung nutzt.

**Tailwind-freier Engine-Testpfad (unabhängig verifiziert):** Alle 14 `tests/engine/*.test.html` laden ausschließlich `tokens.css` + `tests/shared/test-page.css` (eine zusätzlich `screen.css`) — kein Play-CDN, keine `tailwindcss`-Referenz (Grep: 0 Treffer). `TEST_PAGE_STANDARD.md` §10 bestätigt, dass die Play-CDN-Ausnahme ausschließlich `app.test.html` vorbehalten ist. Der Fallback ist dort die einzig wirksame Verbergungs-/Farbquelle.

**Error-Hex-Fallback: akzeptabel**, mit einer präzisen Randbeobachtung (→ F-08):
1. Rein defensiv — `var(--color-error-text, #b71c1c)` greift nur ohne geladene `tokens.css`.
2. Werte identisch zu `tokens.css` (`#B71C1C`/`#C62828`/`#FFF8F8`, Groß-/Kleinschreibung differiert, Hexwert identisch).
3. Vereinbar mit KDR-14 in der Intention, aber technisch ein neuer Mechanismus: `.fw-chart-error` liest die CSS-Variable direkt per `var()`, während jede andere Regel in `_injectStyles()` über die JS-Bridge `${c.xxx}` (`theme.colors`) geht. Ursache, unabhängig verifiziert: **`FwTheme.colors` spiegelt keine Error-Tokens** (Grep über `FwTheme.js`: 0 Treffer) — eine vorbestehende Bridge-Lücke, die CE-2b laut Nicht-Ziel „keine Änderung an `FwTheme.js`" nicht schließen durfte.
4. Kein zweiter Tokenbestand — derselbe `tokens.css`-Ursprung, nur auf einem zweiten technischen Weg gelesen.

**Loading-Überlagerung: kosmetisch**, reproduzierbar aus der CSS-Kaskade: `.fw-loader` (Fallback, 3px) und Tailwinds `border-4` (4px) haben identische Selektor-Spezifität (0-1-0); auf Tailwind-Seiten entscheidet die CSSOM-Einfügereihenfolge. Da `_injectStyles()` zur `FwRenderer`-Konstruktion (nach `DOMContentLoaded`) läuft und das Tailwind-Play-CDN-`<script>` im `<head>` typischerweise früher wirkt, gewinnt der Engine-Fallback voraussichtlich (3px/`loaderBg` statt 4px/`border`; Spinnerfarbe bleibt petrol≈primary). Fachlich folgenlos, bereits im CE-2b-Protokoll als Restbefund benannt.

## 3. Toolbau-Befund

**Empfehlung: `engine-dom-check.js` separat behalten und als Toolbau-AP prüfen.**

- Read-only bestätigt: kein Dateisystem-Zugriff; einziger DOM-Eingriff (`detectSrOnly()`-Sondierungselement) wird per `probe.remove()` sofort entfernt — kein bleibender Zustand.
- Enger, wiederverwendbarer Zweck bestätigt: deckt eine reale Lücke, die weder `ci-token-check.js` (Farb-/Font-Token-Audit, keine DOM-Struktur) noch `check-test-pages.py` (Testseiten-*Struktur*, keine Runtime-Engine-Ausgabe) noch `REGRESSION-MATRIX.md` (fachliches Chart-Verhalten) abdeckt.
- **Positivfall vollständig belegt** (drei reale Browser-Läufe, beide Datenpfade, PASS). **Negativfall fehlt:** kein dokumentierter Lauf, in dem das Skript einen echten DOM-Defekt korrekt als FAIL erkannt hätte. Die einzigen beobachteten FAIL-Zeilen dieser Session waren ein Werkzeugfehler (inaktive Multi-Szenario-Container fälschlich als FAIL gewertet, im Tool selbst behoben) — kein Nachweis funktionierender Negativ-Erkennung realer Regressionen.
- Fernhaltung von Chart-Verhalten/Token-Prüfung bestätigt: keine Farb-, Font-, Achsen- oder Tooltip-Logik im Code.

## 4. Offene Findings und Entscheidungsvorlage

- **Kein CE-2d-Minifix nötig.** Weder der Error-Hex-Fallback noch die Loading-Überlagerung verletzen ein Nicht-Ziel oder einen unveränderlichen Vertrag; beide sind bereits im CE-2b-Protokoll als Restbefund/Kompatibilitätsentscheidung dokumentiert.
- **F-08 (neu, informativ, kein Blocker):** `.fw-chart-error` liest CSS-Custom-Properties direkt per `var()` statt über die `FwTheme`-JS-Bridge — Ursache ist eine vorbestehende Lücke in `FwTheme.colors` (keine Error-Token-Spiegelung). Empfehlung, keine Entscheidung: Falls ein künftiger Slice `FwTheme.colors` um Error-Tokens ergänzt, `.fw-chart-error` konsistent auf `${c.errorText}` etc. umstellen. Kein aktueller Handlungsbedarf.
- **Toolbau-Empfehlung:** `engine-dom-check.js` als eigenständigen, kleinen Toolbau-AP nachträglich formalisieren (eigenes Ergebnisprotokoll plus ein bewusst herbeigeführter Negativfall — z. B. Lauf gegen eine Testseite mit alter/inline-verborgener A11y-Tabelle oder eine manuell verfälschte Canvas-Container-Klasse), um den fehlenden Negativ-Nachweis zu schließen. Bis dahin bleibt der Code funktional nutzbar (durch drei reale Positivläufe bereits produktiv bewährt).

## Scope-QA

- Git-Status vor und nach der Prüfung identisch: `session-log.md` (Fremdstand), zwei Chroniken (Fremdstand), `FwRenderer.js` (CE-2b, unverändert von CE-2c), `tools/engine-dom-check.js` (unverändert von CE-2c), CE-2b-Ergebnisprotokoll (unverändert). CE-2c hat keinen neuen Eintrag erzeugt.
- Keine Datei geändert, erstellt, verschoben oder gelöscht durch diesen Review (bis auf dieses Protokoll selbst).

## Nächster zulässiger Schritt

Nur nach Alberts Entscheidung: CE-2d-Minifix (Einschätzung dieses Reviews: nicht erforderlich), separater Toolbau-AP für `engine-dom-check.js` (Empfehlung: ja, mit Negativfall-Nachtrag), oder direkte CE-2b-Abnahme wie vorliegend.

Ausdrücklich nicht: CE-3 beginnen oder CE-2b-/Tool-Dateien ändern.

Kein Commit. Stop.
