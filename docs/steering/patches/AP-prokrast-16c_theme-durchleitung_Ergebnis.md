# AP-prokrast-16c — Theme-Durchleitung — Ergebnis

## Status

GRÜN — „bereit für Alberts Harness-Test", nicht „getestet". Alle sechs QA-Ebenen bestanden (inkl. Null-Delta 19/19 byte-identisch), keine Stop-Regel in der Archäologie, Durchleitung in allen drei Strategien mit Graceful Default, Harness beweist Chart-Bridge LIVE per Read-only-Identitäts-Check.

## Kurzurteil

Die in AP-16b bestätigte zweite Wahrheitsquelle ist geschlossen: Die drei Strategien erhalten das **eine init()'te FwTheme** per Constructor Injection aus der Composition Root (`ChartEngine`), statt je eine eigene, nie init()'te Instanz zu erzeugen. Graceful Default (`constructor(theme = new FwTheme())`) erhält die Standalone-Testbarkeit (KDR 14.2). KDR 14.3 (FwRenderer-Init-Reihenfolge) unverändert; `FwTheme.js`, `FwRenderer.js`, `FwLayoutRules`, `fwContext`, Specs, CSS und Tabu-Zonen nicht berührt. Sichtbares Delta: **NULL** (init()'te tokens.css-Werte byte-identisch zu den Fallbacks — deterministisch belegt).

## Archäologie-Befund (Schritt 1)

**Chesterton's Fence geprüft — kein dokumentierter Grund gegen die Durchleitung gefunden.**

Fundstellen:
- `git blame` der drei `new FwTheme()`-Zeilen (`LineChartStrategy:35`, `BarChartStrategy:33`, `PieChartStrategy:38`): alle aus Commit `564560f` „Init: Programmier-Git Finanzwesir 2.0" (2026-05-04). Das ist der **initiale Git-Import** — die Zeilen existierten im Code, bevor das Repo git-initialisiert wurde (nach der CSS-3-Migration vom 2026-02-25). Tiefere Blame-Archäologie unmöglich (Boundary-Commit).
- **Kein erklärender Code-Kommentar** an den drei Strategie-`new FwTheme()`-Zeilen.
- `docs/steering/DECISION-LOG.md`: kein Eintrag zu Strategie-Theme-Instanzen/CSS-3-Theme-Bridge (nur Daten-Bridge-Pfad OA-02).
- `docs/steering/archiv/KNOWN-ISSUES-ARCHIV.md:120`: „KDR-14 CSS-Variables Bridge — SUPERSEDED → CSS-3 (2026-02-23)" — ohne Detail zu Strategie-Instanzen.
- `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md:149` (KDR 14.2): „Implementiert (2026-02-25, CSS-3). Alle Engine-Dateien tokenisiert. … Injection-Pattern: Strategy übergibt Tokens, Utility hat Fallback." — **stützt** die Durchleitung (Strategien sollen echte Tokens führen), spricht nicht dagegen.

Hypothesen-Bewertung:
- **(a) Standalone-Testbarkeit als Feature — BESTÄTIGT als realer Nutzen, aber kein Blocker.** Standalone-Test-HTMLs ohne Engine brauchen ein funktionierendes Fallback-Theme. Das bleibt durch den **Graceful Default** (`theme = new FwTheme()`) vollständig erhalten.
- **(b) Init-Timing-Entkopplung — BESTÄTIGT als Strukturgrund, kein Blocker.** `ChartEngine`-Konstruktor erzeugte die Strategien (Z.78-82) **vor** dem `FwRenderer` (Z.86). Zur Konstruktionszeit existierte das init()'te Theme also noch nicht → jede Strategie brauchte ein eigenes. Auflösbar durch simple Reihenfolge-Umkehr (Renderer zuerst).
- **(c) Unvollständige CSS-3-Migration — WAHRSCHEINLICHSTE WURZEL.** Die CSS-3-Bridge (`FwTheme.init()`) kam nur in `FwRenderer.theme` an; die Strategie-Instanzen wurden nicht nachgezogen. Die spec-seitige Intention (KDR 14: „Engine liest Farben zur Laufzeit") war damit nur teilweise realisiert.

→ Keine Stop-Regel. Weiter.

## Composition Root (Schritt 2)

Gewählter Weg: **`ChartEngine`-Konstruktor als Composition Root.** Der Renderer wird jetzt **vor** den Strategien erzeugt; seine bereits init()'te `FwTheme`-Instanz (`this.renderer.theme`) wird per Constructor Injection an alle drei Strategie-Konstruktoren durchgereicht.

Begründung des Wegs:
- Kein zweites `init()`, keine neue Instanz — es wird die **existierende** init()'te Instanz geteilt.
- KDR 14.3 (Sequenz `new FwTheme()` → `theme.init()` → `_injectStyles()` **innerhalb** `FwRenderer`) bleibt exakt gleich; nur die Reihenfolge zweier Zeilen im ChartEngine-Konstruktor (Renderer vor Strategien) ändert sich — keine Abhängigkeit spricht dagegen (weder Strategie noch Renderer referenzieren einander bei Konstruktion).
- `FwRenderer.js` musste **nicht** geändert werden (Durchleitung setzt in ChartEngine an, das `renderer.theme` liest).

## Geänderte Dateien (mit protected-Begründungen)

| Datei | Layer | Änderung | protected? |
|---|---|---|---|
| `core/ChartEngine.js` | 2 | Composition Root: Renderer vor Strategien; `var theme = this.renderer.theme` an alle 3 Strategie-Konstruktoren übergeben. | **protected** — Begründung: Masterentscheidung Theme-Durchleitung (dieser AP); Regressionstest = Harness + Null-Delta. Als Kommentar an der Stelle dokumentiert. |
| `strategies/LineChartStrategy.js` | 3 | `constructor(theme = new FwTheme())` + `this.theme = theme` (Graceful Default). | nein |
| `strategies/BarChartStrategy.js` | 3 | dito | nein |
| `strategies/PieChartStrategy.js` | 3 | dito | nein |
| `Theme/chart-tests/AP-16-abnahme.html` | — | Zweiter Indikator „Chart-Bridge: LIVE/FALLBACK" (Read-only-Identitäts-Check), Hint + Testfall-2-Label auf „kaskaden-live" aktualisiert. | gitignored (dev-lokal) |
| `docs/steering/patches/AP-prokrast-16c_..._Ergebnis.md` | — | dieses Protokoll. | untracked (neu) |

`BaseChartStrategy.js` **nicht** geändert: Die Änderung ist pro Strategie self-contained (je 1 Konstruktorzeile), die Basis bleibt der reine abstrakte Vertrag — nicht sauberer in der Basis (dort müssten die Konkreten den `theme`-Parameter trotzdem entgegennehmen und via `super(theme)` weiterreichen). `FwRenderer.js` **nicht** geändert (protected, nicht nötig).

## FwLayoutRules-Bewertung (Schritt 4 — nur bewertet, NICHT geändert)

Befund: `FwLayoutRules.js:20` hält einen **modul-globalen** `const _theme = new FwTheme();`, genutzt **ausschließlich** für `_theme.fonts.body` (Z.32). Ein bestehender Kommentar (Z.18-19) dokumentiert das bereits als Absicht: „init() wird hier NICHT aufgerufen — FwLayoutRules nutzt nur fonts.body … Falls init() künftig Fonts überschreibt, muss diese Stelle angepasst werden."

- **Delta durch Durchleitung: NULL.** `FwTheme.init()` bridged nur `--color-*`, **nicht** Fonts (`this.fonts` bleibt Konstruktorwert). Ein init()'tes Theme liefert also dasselbe `fonts.body` wie das nicht-init()'te.
- **Empfehlung: nicht anschließen (nein).** Aufwand: Theme müsste durch statische Methoden gefädelt werden (größerer Umbau eines Static-Utility). Risiko: unnötig, für null Nutzen. Der bestehende Kommentar ist die korrekte Guard: **erst** wenn eine künftige `--font-*`-Bridge in `FwTheme.init()` entsteht, wird FwLayoutRules relevant.

## Nachweis-QA (alle sechs Ebenen)

1. **Injection-QA:** In jeder der drei Strategien existiert `new FwTheme()` im **Code** genau **1×** — als Default-Parameter (`constructor(theme = new FwTheme())`); das zweite Vorkommen je Datei ist ein Kommentar („war new FwTheme()"). ChartEngine übergibt `this.renderer.theme` an alle drei; Renderer wird vor den Strategien erzeugt; `FwRenderer.this.theme.init()` (KDR 14.3) unverändert. → OK
2. **Syntax-QA:** `node --check` grün für alle 6 berührten/relevanten JS (`LineChartStrategy`, `BarChartStrategy`, `PieChartStrategy`, `ChartEngine`, `FwRenderer`, `FwTheme`). → OK
3. **Null-Delta-QA:** Für alle **19** von `FwTheme.init()` gelesenen `--color-*`-Properties: aufgelöster tokens.css-Wert **byte-identisch** zum FwTheme-Konstruktor-Fallback (deterministischer Python-Vergleich, var()-Aliase aufgelöst). 0 Abweichungen. → OK
4. **Spec-QA:** `getComputedStyle` ausschließlich in `FwTheme.js`; keine Farben im `fwContext` (Änderungen berühren `fwContext` nicht); Composition-Root-Injektion ist Konstruktions-Verdrahtung (Standardmuster, vom AP mandatiert), kein Aufwärts-Datenfluss zur Laufzeit; protected-Begründung als Kommentar an der ChartEngine-Stelle vorhanden. → OK
5. **Scope-QA:** `git diff` (tracked) zeigt als AP-16c-eigene Änderungen nur `ChartEngine.js` + die 3 Strategien. (`FwTheme.js`/`screen.css`-M = AP-16; Plugins-M = AP-16/16b; `BACKLOG.md`/`session-log.md` = Vor-APs.) Harness ist gitignored. → OK
6. **Wiederlesen:** ChartEngine-Konstruktor-Body geprüft (Renderer→theme→3 Strategien, KDR-14-Kommentar erhalten); Harness-Bridge-Indikator geprüft (Identitäts-Check über alle 3 Strategien). → OK

## Nicht geändert

`FwTheme.js`, `FwLayoutRules.js`, `FwRenderer.js`, `FwChartTextPlugin.js`, `BaseChartStrategy.js`, `fwContext`-Struktur, `docs/spec/**`, `screen.css`/`tokens.css`/`app.css`/`app.js`, `validateColorMap`-Logik, Tabu-Zonen (`FinanzwesirData.js`, `CSVParser.js`, `FwDateUtils.js`).

## Manueller Testplan für Albert (Live-Server)

`Theme/chart-tests/AP-16-abnahme.html` öffnen, Viewport S/M/L:

1. **Beide Indikatoren oben:** „Kaskade AKTIV ✓" **und** „Chart-Bridge: LIVE ✓ — alle 3 Strategien nutzen das init()'te FwRenderer-Theme". Zeigt einer FALLBACK/INAKTIV → melden.
2. **Null-Delta:** Alle Chart-Fälle (Multi-Serie-Balken, Single-Asset-Ampel, Torte + „Weitere…", Ergebnislinie, Pulse) sowie die Website-Boxen/Link müssen **visuell unverändert** gegenüber dem 16b-Stand sein. **Jede sichtbare Farbabweichung ist ein Fehler.**
3. **Fallback-Gegenprobe (Standalone erhalten):** Zwei alte chart-tests öffnen, die die Engine **ohne** Composition-Root-Theme nutzen — z. B. `index_balken_CI.html` und `index_torte_CI.html`. Sie müssen weiter normal rendern (Graceful Default greift; kein Init nötig). Bricht einer → melden.

## Offene Punkte

1. **KDR-14-Wortlaut-Nachführung (separater Mini-AP):** Der Spec-Text (KDR 14.2/14.3) beschreibt die Bridge bisher nur für `FwRenderer`. Nach dieser Durchleitung sollte er ergänzt werden („Composition Root reicht das init()'te Theme an die Strategien durch"). **Bewusst nicht in diesem AP** (keine Spec-Änderung erlaubt).
2. **FwLayoutRules:** dokumentierter Guard bleibt; anschließen erst bei künftiger `--font-*`-Bridge (s. Bewertung).
3. **Browser-Bestätigung des Static-Analysis-Befunds:** Die 16b-Feststellung (Strategien nutzten Fallbacks) war statisch; der Bridge-Indikator im Harness liefert jetzt den Laufzeit-Beweis der Behebung.

## Empfehlung

- **Nächster Schritt:** Alberts Harness-Test (beide Indikatoren müssen LIVE zeigen, Null-Delta an allen Chart-Fällen, 2 alte Tests als Fallback-Gegenprobe).
- **Danach:** KDR-14-Nachführungs-Mini-AP (Spec-Wortlaut), dann `AP-prokrast-17` (Pilot-Migration prokrastinations-preis).
- **Ausdrücklich nicht:** Commit, FwLayoutRules-Umbau, Font-Bridge (`FwChartTextPlugin`), Spec-Änderung.
- **Umsetzungsfreigabe für weitere Änderungen:** nein — erst nach Alberts Testrückmeldung.
