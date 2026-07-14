Stand: 2026-07-14 | Session: AP-chart-engine-tool-01 (Sonnet) | Geändert von: Claude

# AP-chart-engine-tool-01: engine-dom-check.js — Tool-Abnahme

**Status: GRÜN — echter Positiv-/Negativ-/Wiederherstellungszyklus im Browser durch Albert durchgeführt, Ergebnisse zurückgemeldet und hier ausgewertet.**

Vorgeschichte: CE-2c hatte für `tools/engine-dom-check.js` einen Positivnachweis bestätigt, aber den Negativnachweis als offen markiert (keine dokumentierte Erkennung eines echten DOM-Defekts). Dieser AP schließt genau diese Lücke.

## Methodik-Entscheidung (Transparenz)

Der Prompt sieht vor, dass Claude selbst „öffnet", „ausführt" und „herbeiführt". Claude hat keinen Browser-/DevTools-Zugriff; das im `run`-Skill genannte `chromium-cli` existiert nicht als reales Paket (npm 404). Vor Beginn wurde Albert per Rückfrage zwei Optionen vorgelegt: (a) Playwright neu installieren und selbst fahren, oder (b) Albert führt die vorgegebenen Konsolen-Schritte wie bereits in CE-2b aus und meldet die echten Ergebnisse zurück. Albert hat sich explizit gegen eine neue Abhängigkeit entschieden: „Kein Playwright installieren und keine Abhängigkeiten hinzufügen." Der gesamte Test wurde daher nach Option (b) durchgeführt — real im Browser, nicht simuliert.

## Scope

- **Geänderte Dateien:** ausschließlich diese Ergebnisdatei.
- **Tooldatei unverändert: ja.** `git diff -- tools/engine-dom-check.js` vor und nach dem gesamten Testzyklus leer; `git status --short` vor und nach identisch. Kein Repository-Zustand durch den Browser-Test verändert.

## Positivnachweis

- **CSV-Pfad** (`tests/engine/line-ci.test.html`, frisch geladen, Tailwind-frei): `containerGesamt: 9, aktiveCharts: 9, inaktiveContainer: 0`. Alle 9 Charts `ergebnis: PASS`, A11y-Tabelle vorhanden und verborgen über `Fallback(left:-9999px)`, `tailwindSrOnly: false`. Gesamt: `PASS`.
- **App-Pfad** (`Apps/prokrastinations-preis/app.test.html`, frisch geladen, Screen mit aktivem Chart): `containerGesamt: 60, aktiveCharts: 1, inaktiveContainer: 59` (59 nicht besuchte Testszenario-Container korrekt als inaktiv übersprungen, nicht als FAIL gewertet). Der eine aktive Chart `ergebnis: PASS`, A11y-Verbergung über `sr-only+Fallback`, `tailwindSrOnly: true`. Gesamt: `PASS`.

## Negativnachweis

Durchgeführt auf `tests/engine/line-ci.test.html` (CSV-Pfad, im Anschluss an den Positivnachweis, ohne Neuladen), exakt ein Defekt, eine Klasse:

- **Temporär herbeigeführter Defekt:** Original-`className` des ersten real gerenderten `.fw-chart-wrapper` in `window.__ceToolTest` gesichert; anschließend ausschließlich die Klasse `fw-chart-wrapper` per `classList.remove()` entfernt. Verbleibender `className` danach: `flex flex-col gap-3` (Konsolen-Log bestätigt). Keine Chartdaten, kein Canvas, keine Repository-Datei berührt.
- **Toolreaktion:** Unveränderter `tools/engine-dom-check.js` sofort erneut ausgeführt. Ergebnis für den betroffenen Chart (idx 0): `wrapper: FAIL`, `containerQuery: FAIL`, `ergebnis: FAIL`. Alle acht übrigen, nicht mutierten Charts blieben unverändert `PASS` — die Fehlererkennung ist korrekt auf das mutierte Element isoliert, kein Kollateralausschlag. Gesamtstatus kippte korrekt von `PASS` auf `FAIL` (`aktiv: 9, inaktiv: 0`).
- **Wiederherstellung und erneuter PASS:** `t.el.className = t.originalClassName` aus der gesicherten Variable gesetzt (Konsolen-Log bestätigt: `flex flex-col gap-3 fw-chart-wrapper` bzw. Originalwert). Unveränderten `tools/engine-dom-check.js` erneut ausgeführt: idx 0 wieder vollständig `PASS`, Gesamtstatus wieder `PASS`, `aktiv: 9, inaktiv: 0` — identisch zum ursprünglichen Positivlauf. Kein Restdefekt im DOM verblieben (Seite war ohnehin nur bis zum nächsten Neuladen mutiert, kein persistenter Zustand).

**Erfolgskriterien vollständig erfüllt:** Tool erkennt einen echten, absichtlich herbeigeführten DOM-Vertragsbruch zuverlässig als FAIL und bestätigt nach Wiederherstellung wieder PASS — ohne False Positives bei unbeteiligten Charts.

## Grenzen des Tools

- **Prüft:** A11y-Tabelle vorhanden und effektiv verborgen (inkl. Verbergungsmechanismus `sr-only` vs. Fallback), Wrapper-Klassenanker + Container-Query-Name, Canvas-Container-Klassenanker + Engine-Höhe (400px), Vorhandensein von `<canvas>`; bei tatsächlich gerenderten Status-Flächen zusätzlich deren ARIA-Rollen (`status`/`alert`). Nicht gerenderte Container werden korrekt als „inaktiv" übersprungen, nicht als Fehler gewertet.
- **Prüft ausdrücklich nicht:** Chart-Fachverhalten (Achsen, Ticks, Tooltips, Datenkorrektheit) — bleibt `REGRESSION-MATRIX.md`. CI-Token-/Farb-/Font-Konformität — bleibt `ci-token-check.js`. Screenreader-Volltests — bleiben manuelle Prüfung. Visuelle Produktabnahme — bleibt Alberts Sichtprüfung im Live-Server.

## Abschlussgate

- **Tool als separaten, wiederverwendbaren DOM-Checker behalten: ja.** Positiv- und Negativfall jetzt beide real belegt (schließt die in CE-2c offen gelassene Lücke).
- **Offene manuelle Prüfungen:** keine für diesen AP-Scope. Fachliche Chart-Regressionen, Token-/Font-Audits und Screenreader-Tests bleiben wie zuvor eigenständige, nicht durch dieses Tool ersetzte Prüfpfade.
- **Nächster zulässiger Schritt:** nur nach Alberts Abnahme dieses Protokolls — Nutzung von `engine-dom-check.js` als Standard-Struktur-/Verbergungs-Check für CE-3 bis CE-6. Kein automatischer Start von CE-3.

Kein Commit. Stop.
