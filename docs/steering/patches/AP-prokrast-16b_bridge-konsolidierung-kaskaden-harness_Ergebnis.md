# AP-prokrast-16b — Bridge-Konsolidierung + Kaskaden-Harness — Ergebnis

## Status

GRÜN — mit einem prominent gemeldeten, **vorbestehenden** Architektur-Befund (kein Spec-Verstoß meiner Arbeit, siehe „Offene Punkte 1").

„GRÜN" heißt: bereit für Alberts Live-Server-Test am Harness — nicht „getestet". Alle drei Schritte umgesetzt, alle sechs QA-Ebenen **plus** die geforderte Spec-QA (KDR 9/14) bestanden, Schreib-Scope exakt (ChartEngine sauber revertiert), keine Spec-Datei geändert.

## Kurzurteil

Die AP-16-Zwischenlösung (Plugins lesen selbst per `getComputedStyle`) ist konsolidiert und jetzt **spec-konform nach KDR 14.2** („Strategy übergibt Tokens, Utility hat Fallback"): die Ergebnislinie bezieht ihr Blau als Token aus `LineChartStrategy` (neben dem bestehenden `crosshair`-Muster), der Pulse-Ring bezieht Petrol via `dataset.pointBorderColor` (bereits Strategy-gesetzt) und hat nur noch einen defensiven `#218380`-Fallback. **Kein `getComputedStyle` mehr in Plugins** (einzige Bridge bleibt `FwTheme.init()`). Der Kaskaden-Harness lädt `screen.css`(→`tokens.css`) und lokale Chart.js (kein CDN), mit einem Kaskade-Indikator. Testdaten-Refresh: 6 Dateien, 19 Ersetzungen (Dry-run = Write).

**Kurskorrektur während der Umsetzung (durch bindende Specs ausgelöst):** Ein zwischenzeitlich gebauter Injektions-Weg über **ChartEngine.js** (Layer 2, `this.renderer.theme.colors`) wurde als Verstoß gegen die Layer-Disziplin / KDR 14.2 erkannt (ChartEngine ist Orchestrator, nicht Design-Token-Verteiler) und **vollständig zurückgenommen**. Die spec-konforme Injektion liegt jetzt in `LineChartStrategy` (Layer 3) — genau der vom AP als Option genannte und von KDR 14.2 geforderte Akteur.

## Vorgefundenes Injektionsmuster (Anamnese-Befund, mit Fundstellen)

Das etablierte Muster ist **Options-Injektion durch die Strategie (Layer 3)**, Plugin liest aus `chart.options.plugins.<id>` mit Fallback:

- `CenterTextPlugin.js:27` — `let colorValue = options.colorValue || '#272727';` (Plugin liest Option + Fallback).
- `PieChartStrategy.js:318-319` — `colorLabel: t.colors.textSec, colorValue: t.colors.text` (Strategie injiziert Theme-Token in die Plugin-Optionen).
- `LineChartStrategy.js:407-412` — `crosshair: { ..., color: t.getGhostColor(t.colors.textSec, 0.5), ... }` (Strategie injiziert Theme-Token für ein weiteres Plugin — **direkte Vorlage** für meine `fwVerticalLine`-Injektion).
- `LineChartStrategy.js:293` — `pointBorderColor: this.theme.colors.petrol` (Annotation-Marker-Datensatz trägt bereits Petrol als Strategy-Token → primäre Pulse-Ring-Farbe).

Spec-Anker: `ARCHITECTURE STRATEGY PAPER VX.md` KDR 14.2 („Injection-Pattern: Strategy übergibt Tokens, Utility hat Fallback"; `getComputedStyle` nur in `FwTheme.init()`), KDR 9 (Farben gehören nie in `fwContext`), KDR 14.3 (Init-Reihenfolge unangetastet).

## Geänderte Dateien (mit Zweck)

| Datei | Layer | Zweck | Tracking |
|---|---|---|---|
| `strategies/LineChartStrategy.js` | 3 | **Die eine Zusatzdatei (Klausel 2.3).** Injiziert `options.plugins.fwVerticalLine = { color: t.colors.blau }` neben dem `crosshair`-Muster (KDR 14.2). | tracked (M) |
| `plugins/FwVerticalLinePlugin.js` | 5 | `getComputedStyle`-Direktzugriff entfernt → liest `opts.color`, `#0071BF` nur defensiver Fallback. | tracked (M) |
| `plugins/FwAnnotationPulsePlugin.js` | 5 | `_themePetrol()`/`getComputedStyle` entfernt → defensiver `#218380`-Fallback; primärer Token via `dataset.pointBorderColor`. | tracked (M) |
| `Theme/chart-tests/AP-16-abnahme.html` | — | **Neuer Kaskaden-Harness** (lädt screen.css/tokens.css + lokale Chart.js, Kaskade-Indikator, 6 Testfälle). | gitignored (dev-lokal) |
| `Theme/chart-tests/index3.html`, `index_alles test.html`, `index_alt.html`, `index_balken.html`, `index_linien.html`, `index_torte_CI.html` | — | Testdaten-Refresh (alte CI-Ramp-Hexes → neue). | gitignored (dev-lokal) |
| `docs/steering/patches/AP-prokrast-16b_..._Ergebnis.md` | — | dieses Protokoll. | untracked (neu) |

`Theme/chart-tests/` ist **gitignored** (per `git check-ignore` bestätigt) — deshalb erscheinen Harness + refreshte Testdateien nicht in `git status`. Das ist die bestehende Konvention für die Dev-Test-Harnesse.

**ChartEngine.js:** in AP-16b **nicht** geändert (zwischenzeitliche Injektion vollständig revertiert; `git diff` zeigt keine ChartEngine-Änderung).

## Batch-Protokoll (Testdaten-Refresh, Dry-run = Write)

Mapping ausschließlich aus AP-16-Ergebnis (Alt → Neu): `#90C1BF`→`#64CDC9` (petrol-50→400), `#4D9C99`→`#49B3AF` (petrol-80→500), `#D3E6E6`→`#B4EEEB` (petrol-20→200), `#F9EF9E`→`#FCF09C` (gelb-80→200), `#C57EB2`→`#F172C1` (purpur-80→400). Keine Mapping-Lücke.

| Datei | Ersetzungen | Werte |
|---|---:|---|
| `index3.html` | 1 | #90C1BF |
| `index_alles test.html` | 6 | #4D9C99, #90C1BF, #D3E6E6, #C57EB2 (Z62); #C57EB2 (Z102); #90C1BF (Z175) |
| `index_alt.html` | 5 | #4D9C99, #90C1BF, #D3E6E6, #C57EB2 (Z67); #90C1BF (Z126) |
| `index_balken.html` | 1 | #C57EB2 |
| `index_linien.html` | 2 | #C57EB2 (Z78); #4D9C99 (Z98) |
| `index_torte_CI.html` | 4 | #90C1BF (Z65, Z95, Z112, Z125) |
| **Summe** | **19** | alle in `data-colors`-Attributen, keine Kontext-Ausreißer |

Bewusst NICHT angefasst: `#00FF00`/`#FF0000` in `index_torte_CI.html`/`index_balken_CI.html` — absichtliche Invalid-Color-Testfälle (Gatekeeper-Test bleibt intakt).

## Nicht geändert

- `FwChartTextPlugin.js` — nicht angefasst (Font-Bridge nur mit Rubikon-Nachmessung, eigener Mini-AP).
- `ChartEngine.js` — nicht geändert (revertiert), `FwRenderer.js`, `FwTheme.js`-Logik, andere Strategien — nicht angefasst.
- `screen.css`, `tokens.css`, `app.css`, `app.js` — nicht angefasst (screen.css/tokens.css/FwTheme.js-`M` stammen aus AP-16, nicht AP-16b).
- `validateColorMap`-Logik (All-or-Nothing-Exklusivitäts-Wächter) — unverändert.
- **Keine `docs/spec/`-Datei** geändert (KDR-14-Wortlaut-Nachführung ist separater AP).
- Init-Reihenfolge KDR 14.3 (`new FwTheme()` → `theme.init()` → `_injectStyles()`) — unangetastet.
- Tabu-Zonen (`FinanzwesirData.js`, `CSVParser.js`, `FwDateUtils.js`, `fwContext`-Struktur) — nicht berührt.

## Nachweis-QA (alle sechs Ebenen + Spec-QA)

1. **Bridge-QA:** `getComputedStyle` in `plugins/**`-**Code** = **0** (nur `FwTheme.init()` bleibt die Bridge). → OK
2. **Altlasten-QA:** die 5 Alt-Hexes + `#006273` in `chart-tests/**` + Plugins (aktiver Code, ohne Kommentar/Prosa) = **0**. → OK
3. **Harness-QA:** `AP-16-abnahme.html` referenziert `../assets/css/screen.css`; Kaskade-Indikator vorhanden; lokale `vendor/chart.umd.min.js`; **keine** CDN-/`http`-Marker; Multi-Serie-CSV `bd_ranking_stress.csv` = **10 Serien** (≥7). → OK
4. **Batch-QA:** Dry-run (19) = Write (19); pro Datei dokumentiert; 0 Rest-Alt-Hexes. → OK
5. **Scope-QA:** `git diff` zeigt tracked nur `LineChartStrategy.js` + die 2 Plugins (+ AP-16-Altstände screen.css/FwTheme + BACKLOG/session-log aus Vor-APs). **ChartEngine.js nicht im Diff** (revertiert). Klausel 2.3 genau **einmal** genutzt (LineChartStrategy). → OK
6. **Wiederlesen:** alle geänderten Dateien erneut gelesen; Plugin-Fallbacks byte-identisch `#0071BF` / `#218380`; kein `opts.color`-Deadpath im Pulse. → OK

**Spec-QA (KDR 9 / KDR 14):**
- **KDR 14.2** — Strategy übergibt Token: `LineChartStrategy` injiziert `fwVerticalLine: { color: t.colors.blau }`. → OK
- **KDR 14.2** — `getComputedStyle` nur in `FwTheme.init()` (0 in Plugins). → OK
- **KDR 9** — keine Farbe im `fwContext`: Injektion liegt in `options.plugins.fwVerticalLine` (getrennt von `fwContext`); Plugins berühren `fwContext` nicht; `fwContext`-Struktur unverändert. → OK
- **KDR 14.3** — Init-Reihenfolge unangetastet (`FwRenderer.this.theme.init()` unverändert). → OK
- **Layer-Disziplin** — Zusatzdatei ist `LineChartStrategy` (Layer 3), **nicht** ChartEngine (Layer 2); kein Plugin schreibt in höhere Layer; Plugin-Daten read-only. → OK
- **Keine Spec-Datei geändert.** → OK

## Manueller Testplan für Albert (Live-Server)

Öffne `Theme/chart-tests/AP-16-abnahme.html` im Live-Server, Viewport S/M/L.

0. **Kaskade-Indikator (oben):** MUSS grün „Kaskade AKTIV ✓ — --color-petrol-600 = #218380" zeigen. Zeigt er rot „INAKTIV", ist `screen.css`/`tokens.css` nicht geladen (Pfad prüfen) → dann melden.
1. **Website-Elemente (echte Live-Kaskade):** `.box-petrol` petrolfarbener Tint + Border, `.box-purpur` purpurner Tint + linke Kante, `.ci-link` blau → Hover petrol. Diese Farben kommen direkt aus `var(--color-*)`/`color-mix()` — **hier** ist die CSS-Kaskade real prüfbar.
2. **Multi-Serie-Balken (Auto-Palette):** 10 Serien; erwartete sichtbare Drift (P13): Serie 5 = **purpur-400 `#F172C1`** (deutlich pinker als früher), Serie 6 petrol-400, Serie 7 gelb-200.
3. **Single-Asset-Balken:** Petrol/Purpur-Ampel bzw. Asset-Fächer (Deckkraftverlauf).
4. **Torte:** Center-Text mittig, Segmente Auto-Palette, Tooltip CI-Farben.
5. **Ergebnislinie:** blaue gestrichelte Linie am letzten Punkt (Token aus `LineChartStrategy` → Plugin). Testet die Bridge-Konsolidierung direkt.
6. **Annotation-Pulse:** einmaliger Ring beim Laden am Marker (Petrol). Erscheint kein Marker, rendert die Linie trotzdem — die Fallback-Änderung ist primär per Code + App (AP-17) belegt.

**Erwartete bewusste Abweichungen (P13):** Multi-Serie-Slots 5–7 (s. 2). **Mögliche Regressionen:** `color-mix`-Support (aktueller Browser nötig); prüfen, dass Serien 1–4 unverändert sind.

**Ehrlicher Hinweis (Befund, s.u.):** Chart-Farben (Serien/Achsen/Tooltip) stammen aus den **JS-Fallbacks** der Strategie-Themes (= tokens.css-Werte), **nicht** aus der Live-CSS-Kaskade. Werte sind korrekt, aber eine reine `screen.css`-Änderung würde die Charts (anders als die Website-Boxen) nicht mitziehen.

## Offene Punkte

1. **[BEFUND — vorbestehend, nicht durch AP-16b eingeführt] Strategie-Themes werden nie `init()`'d.** Statische Analyse (belegt per Grep): `theme.init()` läuft ausschließlich in `FwRenderer.js:30`. Die drei Strategien (`LineChartStrategy:35`, `BarChartStrategy:33`, `PieChartStrategy:38`) und `FwLayoutRules:20` erzeugen je eine **eigene** `new FwTheme()`-Instanz **ohne** `init()`, und `ChartEngine` übergibt den Strategien kein Theme. Konsequenz: Chart-Serien-/Achsen-/Tooltip-Farben kommen aus den Konstruktor-**Fallbacks** (die AP-16 byte-identisch auf `tokens.css` gesetzt hat), nicht aus der Live-CSS-Bridge. Das begrenzt, was ein Kaskaden-Harness für Charts beweisen kann, und ist eine latente Inkonsistenz zu KDR 14 („Engine liest Farben zur Laufzeit"). **Nicht in AP-16b-Scope gefixt** (wäre eine Engine-weite Änderung mit Regressionsrisiko über alle 3 Strategien/3 Chart-Typen). Empfehlung: als eigener AP entscheiden (z. B. ChartEngine übergibt das init()'d Renderer-Theme an die Strategien, oder Strategien rufen `init()`). Browser-Gegenprobe empfohlen, um den Static-Analysis-Befund zu bestätigen.
2. **Pulse standalone fragil:** Der Pulse ist ein „newly-added"-Einmaleffekt; seine sichtbare Farbe ist der Marker-`pointBorderColor` (Petrol, Strategy-Token). Die AP-16b-Änderung betraf nur den defensiven Fallback — zuverlässig per Code + App-Kontext (AP-17) belegt.
3. **`git check-ignore`:** `Theme/chart-tests/**` ist gitignored → Harness + refreshte Testdateien sind dev-lokal, nicht versioniert (bestehende Konvention).

## Empfehlung

- **Nächster Schritt:** Alberts Live-Server-Test am Harness (Indikator MUSS „aktiv" zeigen). Bei Befund: Rückmeldung vor jedem weiteren Patch.
- **Danach:** `AP-prokrast-17 — Pilot-Migration prokrastinations-preis` (dort u. a. Pulse-Ring im App-Kontext verifizieren).
- **Zur Entscheidung vorlegen:** Offener Punkt 1 (Strategie-Theme-`init()`) — soll ein eigener AP die Charts an die Live-CSS-Bridge anschließen?
- **Ausdrücklich nicht:** Commit, Font-Bridge (`FwChartTextPlugin`), `validateColorMap`-Änderung, Spec-Datei-Nachführung, Tailwind-Produktionsbuild.
- **Umsetzungsfreigabe für weitere Änderungen:** nein — erst nach Alberts Testrückmeldung.
