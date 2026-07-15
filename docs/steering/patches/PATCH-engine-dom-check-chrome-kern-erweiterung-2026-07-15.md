Stand: 2026-07-15 | Session: AP-chart-engine-01 / CE-4c-Tool (Sonnet) | Geändert von: Claude

# PATCH-QUITTUNG | AP engine-dom-check-chrome-kern-erweiterung | 2026-07-15

**Beauftragt:** `tools/engine-dom-check.js` um einen additiven Chrome-Kern-Check (CE-3/CE-3b/CE-4/CE-4c) erweitern, damit Albert die neue Line-/Bar-Chrome-Struktur (Typmarker, gemeinsamer `fw-chart-chrome`-Anker, `<button aria-pressed>`-Controls und -Legend-Pills) per Konsolen-Snippet auf `line-ci.test.html`/`bar-ci.test.html` prüfen kann, zusätzlich zur bereits von Albert bestätigten Sichtprüfung.

**Geändert:** 1 Datei, 6 Stellen

**Dateien:**
- `tools/engine-dom-check.js`

**Stellen:**
1. Header-Doku um Chrome-Kern-Beschreibung ergänzt
2. 4 neue Helferfunktionen (`hasAttr`, `checkControlButtons`, `checkActiveStatePerGroup`, `checkChromeLegend`)
3. `chromeRows`/`allChromePass`-Deklaration
4. Chrome-Kern-Check-Block im bestehenden `forEach` (pro Container, additiv nach dem unveränderten A11y-/Struktur-Block)
5. Chrome-Kern-Konsolenausgabe (eigene Tabelle + Gesamt-Zeile, analog zum bestehenden Status-Flächen-Block)
6. Rückgabeobjekt um `chromeGesamt`/`chrome` erweitert

**CHANGED/NEW:** ✓ — jede neue Stelle trägt `// NEW — CE-4c`-Markierung; der bestehende A11y-/Struktur-Block (Zeilen 1–226 vor dem Patch) ist bytegleich unverändert, nur der letzte `return`-Statement wurde erweitert (einzige Zeile, die nicht rein additiv ist).

**Tabu-Check:** keine ✓ — `tools/engine-dom-check.js` ist kein Layer-1-/`FwDateUtils`-Bestand und nicht in `PROTECTED_PATHS.json` gelistet.

**Gate-Typ:** Light (1 Datei, kein Tabu-Bereich, keine Architekturwirkung, keine Security-Auswirkung, keine `docs/spec/`/`docs/steering/`-Änderung) — Auftrag „Erweitere das Prüfscript für unsere Zwecke" folgte direkt auf den zuvor im Chat skizzierten Scope.

**Beweise (statisch):**
- `node --check tools/engine-dom-check.js`: exit 0.
- `git diff --stat -- tools/engine-dom-check.js`: 101 Einfügungen, 1 Löschung (die eine geänderte Zeile ist die alte `return`-Anweisung).
- `git status --short -- tools/`: ausschließlich `tools/engine-dom-check.js` geändert.

**Testfall:** `tests/engine/line-ci.test.html` und `tests/engine/bar-ci.test.html` je einzeln im Live-Server öffnen, Datei-Inhalt von `tools/engine-dom-check.js` in die DevTools-Konsole einfügen, Enter.

Erwartetes Verhalten:
- Neue Tabelle „Chrome-Kern-Check (CE-3/CE-3b/CE-4/CE-4c)" erscheint zusätzlich zur bestehenden Struktur-Tabelle.
- Line-Container: `typ: line`, `chromeAnker: PASS`, `controlsButtons: PASS (n)`, `controlsAktivZustand: PASS`, `legende: PASS (Chrome-Pill)` (sofern ≥2 sichtbare Serien).
- Reguläre Mehrserien-Bar (z. B. `bd_ranking_stress.csv`, Default-View „Verlauf"): `typ: bar`, gleiche PASS-Reihe wie Line.
- Einzeldataset-Bar / Ranking-Bar (View „Vergleich"): `typ: bar`, `chromeAnker: PASS`, `controlsButtons`/`controlsAktivZustand: PASS` (Controls bleiben typübergreifend bedienbar), aber `legende: keine` — **kein FAIL**, das ist der erwartete, unveränderte Bestandszustand.
- Donut/Pie-Container: erscheinen **nicht** in der Chrome-Kern-Tabelle (kein Marker vorhanden) — unverändert außerhalb des Scopes.
- „Chrome-Kern-Gesamt"-Zeile: `PASS`, sofern keine der obigen Erwartungen abweicht.

**Offene Fragen:** keine.

Zählprüfung: Ich habe 1 Datei mit 6 Stellen geändert.

→ Bitte teste mit `line-ci.test.html` und `bar-ci.test.html` (Konsolen-Snippet einfügen, Ergebnis hierher kopieren). Ich warte vor dem nächsten Patch.
