# AP-prokrast-03d — FwChartTextPlugin.js Minimum-Implementierung Ergebnis

## Status

GRÜN (hochgestuft von GELB nach manueller Browser-Bestätigung durch Albert, siehe „Nachtrag" unten)

## Kurzbefund

`FwChartTextPlugin.js` V1 wurde gebaut, `plugins/index.js` und `ChartEngine.js` wurden rein additiv nach dem `annotationPulse`-Muster erweitert (6 Touchpoints, exakt wie im Auftrag vorgesehen — Import, Options-Lesen, State-Update-Branch, State-Init-Branch, Plugin-Push, Options-Spiegelung). Der Smart-Update-Zweig (`_draw()`, `if (state.chartInstance)`) wurde nicht verändert — direkt am Code verifiziert: `state.chartInstance.options = chartConfig.options` übernimmt die gespiegelte `fwChartText`-Config bei jedem Update, weil `chartConfig` bei jedem `_draw()`-Aufruf (initial wie Update) komplett neu aus `getChartConfig()` gebaut wird und mein additiver Block davor liegt. Chart.js registriert Plugins nur beim `new Chart()`-Konstruktor-Aufruf (Initial-Render) — deshalb muss das Plugin beim Initialrender mit `chartText: {enabled:true, annotations:[]}` aktiv sein; danach reicht das Aktualisieren der `annotations` über einen zweiten `renderFromData()`-Aufruf, weil `FwChartTextPlugin.afterDraw()` seine Config bei jedem Draw frisch aus `chart.options.plugins.fwChartText` liest (kein Caching beim Registrieren, identisch zum bestätigten `FwAnnotationPulsePlugin`-Muster).

Ein isolierter Plugin-Unit-Test (reines JS, kein DOM/Chart.js nötig, temporäres Wegwerf-Skript im Scratchpad, außerhalb des Repos) hat die Zeichenlogik vollständig verifiziert: 14/14 Tests bestanden (Aktivierung/Deaktivierung, leere/gefüllte `annotations`, defensives Überspringen ungültiger Annotationen, mehrzeiliger Text, `plotFraction`-Berechnung, `baseline`-Blockausrichtung).

**Abweichung vom ursprünglichen Auftrag, auf Alberts explizite Anweisung im Gespräch:** Statt eines rein temporären, außerhalb des Repos gelöschten Testskripts wurde zusätzlich ein neues, dauerhaftes Testszenario („Szenario AF") in `Apps/prokrastinations-preis/app.test.html` eingebaut, das `ChartEngine` direkt importiert und den Pflicht-Smart-Update-Testfall (`annotations: []` → gefüllt) mit synthetischen Testdaten nachstellt — ohne `app.js` zu berühren. Das ist eine explizit von Albert angewiesene Abweichung von der ursprünglichen AP-Vorgabe „kein dauerhaftes Testharness ohne Rückfrage" (die Rückfrage/Anweisung ist im Gesprächsverlauf dokumentiert). `app.test.html` selbst stand nicht auf der Verbotsliste des AP-Prompts (nur `app.js`/`app.css`/`APP_SPEC.md`/`stations.de.json`).

**Grund für GELB statt GRÜN:** Der Smart-Update-Testfall ist jetzt in `app.test.html` (Szenario AF) vorbereitet und bereit, aber die tatsächliche Browser-Beobachtung (Live-Server öffnen, Initialrender prüfen, Button klicken, zweiten Render beobachten, Konsole auf Fehler prüfen) wurde in diesem AP noch nicht durchgeführt — kein `chromium-cli`/Playwright im Environment verfügbar, Albert testet stattdessen manuell selbst. Die Code-Pfad-Analyse und der isolierte Plugin-Unit-Test sind beide grün, aber die End-to-End-Bestätigung im echten Browser steht noch aus.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short` (vor Implementierung): `M .claude/learning/session-log.md`, `M PROJECT-STATUS.md`, `?? docs/steering/patches/AP-prokrast-03a_..._Ergebnis.md`, `?? docs/steering/patches/AP-prokrast-03b_..._Ergebnis.md`, `?? docs/steering/patches/AP-prokrast-03c_..._Ergebnis.md` — alles eigene Änderungen aus dieser Session, keine Fremdänderungen
- `git diff --name-status` (vor Implementierung): `M .claude/learning/session-log.md`, `M PROJECT-STATUS.md`

Repo-Namensdiskrepanz wie in AP-prokrast-02a/03a/03b/03c dokumentiert — kein Stop.

## Gelesene Pflichtquellen

- `docs/steering/patches/AP-prokrast-03c_peer-review_rubikon-reveal_canvas-text-plugin_Ergebnis.md` — vollständig neu gelesen (bereits in dieser Session verfasst, erneut wiedergelesen)
- `docs/steering/patches/AP-prokrast-03b_rubikon-reveal_architekturvorschlaege_peer-review-dossier_Ergebnis.md` — vollständig neu gelesen
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` — **vollständig neu gelesen** (523 Zeilen, alle Import-, Options-, State- und `_draw()`-Stellen direkt am aktuellen Code verifiziert, nicht aus Erinnerung übernommen)
- `Theme/assets/js/fw-chart-engine/plugins/index.js` — vollständig neu gelesen (16 Zeilen)
- `Theme/assets/js/fw-chart-engine/plugins/FwAnnotationPulsePlugin.js` — bereits in AP-03b/03c vollständig gelesen (147 Zeilen), Registrierungsmuster als Vorbild übernommen, nicht erneut vollständig neu gelesen (Token-Disziplin, Datei unverändert)
- `Theme/assets/js/fw-chart-engine/plugins/FwVerticalLinePlugin.js` — bereits in AP-03a vollständig gelesen, unverändert
- `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md` §14–17 — bereits in AP-03b/03c vollständig gelesen, Kernaussagen (Referenzmuster, Peer-Review-Kriterien, Stop-Regeln) angewendet

## Geänderte Dateien

Erlaubt:

- `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js`: **neu erstellt** (109 Zeilen). Header mit V1-Vertrag wie im Auftrag vorgeschrieben. `id: 'fwChartText'`, Hook `afterDraw`, liest Config bei jedem Draw frisch aus `chart.options.plugins.fwChartText`, defensive Validierung pro Annotation, `ctx.save()`/`ctx.restore()`, `plotFraction` relativ zu `chart.chartArea`.
- `Theme/assets/js/fw-chart-engine/plugins/index.js`: additiver Export `export { FwChartTextPlugin } from './FwChartTextPlugin.js';` eingefügt (1 Zeile), bestehende Exporte unverändert.
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`: additiv erweitert an 6 Stellen (Import, Options-Lesen `options.chartText`, State-Update-Branch, State-Init-Branch, Plugin-Push + Options-Spiegelung in `_draw()`), siehe Diff-Beleg unten. Kein bestehender Code gelöscht oder inhaltlich verändert, nur der Kommentar an der `config:`-Objektliteral-Zeile aktualisiert (`CHANGED — B1-AP-14c4` → `CHANGED — AP-prokrast-03d`, weil diese Zeile durch beide APs additiv erweitert wurde).
- `docs/steering/patches/AP-prokrast-03d_fw-chart-text-plugin_minimum-implementierung_Ergebnis.md`: dieses Protokoll.

Zusätzlich, auf Alberts explizite Anweisung im Gespräch (siehe Kurzbefund):

- `Apps/prokrastinations-preis/app.test.html`: neues Szenario AF eingefügt (isolierter `ChartEngine`-Direktaufruf-Testfall für den Smart-Update-Pflichttestfall, synthetische Testdaten, kein Bezug zu `app.js`).

Nicht erlaubt und nicht geändert:

- `Apps/prokrastinations-preis/app.js`: unverändert
- `Apps/prokrastinations-preis/app.css`: unverändert
- `FwAnnotationPulsePlugin.js`: unverändert
- `FwVerticalLinePlugin.js`: unverändert
- `LineChartStrategy.js`: unverändert
- `FwSmartXAxis.js`: unverändert
- `BaseChartStrategy.js`: unverändert
- `APP_SPEC.md`: unverändert
- `stations.de.json`: unverändert
- `docs/spec/*`: unverändert

## Implementierter V1-Contract

| Punkt | Erfüllt? | Beleg |
|---|---:|---|
| opt-in | ja | `chart.options.plugins.fwChartText.enabled` muss explizit `true` sein (`FwChartTextPlugin.js`, `afterDraw`-Guard); `ChartEngine.js` prüft `options.chartText.enabled === true` vor jeder Übernahme |
| persistent | ja | kein Auto-Expire, keine Zeitsteuerung, keine `WeakMap`-State-Tabelle im Plugin — Config wird bei jedem `afterDraw` frisch gelesen |
| nicht-interaktiv | ja | keine Event-Listener, keine Hit-Detection, keine `addEventListener`-Aufrufe im Plugin |
| keine Animation | ja | kein `requestAnimationFrame`, kein `chart.draw()`, kein `chart.update()` im Plugin |
| keine Tooltips | ja | keine Tooltip-Config-Manipulation, kein Zugriff auf `chartConfig.options.plugins.tooltip` |
| keine Events | ja | keine Event-Emission, kein Callback-Mechanismus |
| keine DOM-Brücke | ja | ausschließlich `ctx.fillText()` auf dem Canvas-2D-Context, keine DOM-Erzeugung |
| keine Pixelkoordinaten nach außen | ja | `px`/`py` bleiben lokale Variablen in `_drawAnnotation()`, keine Rückgabe, kein globaler State |
| keine Card-to-Point-API | ja | keine öffentliche Methode außer dem Plugin-Objekt selbst (`id`, `afterDraw`) |
| keine Datenmutation | ja | `chart.data` wird nirgends gelesen oder verändert |
| keine Achsenmutation | ja | `chart.scales`/`chart.options.scales` werden nirgends gelesen oder verändert |
| `plotFraction` relativ zu `chart.chartArea` | ja | `px = chartArea.left + chartArea.width * a.x + offsetX`, `py = chartArea.top + chartArea.height * a.y + offsetY` |
| mehrere Annotationen | ja | `annotations`-Array wird vollständig durchlaufen, jede gültige Annotation einzeln gezeichnet |
| einfache Strings | ja | `text` als String, per Unit-Test T3 bestätigt |
| `\n`-Zeilenumbrüche | ja | `String(a.text).split('\n')`, per Unit-Test T3/T6 bestätigt (2 Zeilen → 2 `fillText`-Aufrufe) |
| `lineHeight` default = `fontSize * 1.4` | ja | `var lineHeight = _isFiniteNumber(a.lineHeight) ? a.lineHeight : (fontSize * 1.4);` |

## ChartEngine.js-Patch

- Import ergänzt: ja — `FwChartTextPlugin` im bestehenden Plugin-Barrel-Import-Block (Zeile 68–72), Reihenfolge alphabetisch zwischen `FwAnnotationPulsePlugin` und `FwVerticalLinePlugin` eingefügt
- Top-Level-Option `options.chartText` gelesen: ja — neuer Block direkt nach dem `annotationPulse`-Block (Zeile 194–200), identische Struktur (`typeof === 'object' && enabled === true`-Guard)
- State/Runtime-Config ergänzt: ja — `state.config.chartText` im „existiert bereits"-Branch (Zeile 218) und im `config:`-Objektliteral des „neuer Container"-Branchs (Zeile 233)
- Spiegelung nach `chartConfig.options.plugins.fwChartText`: ja — Zeile 347 in `_draw()`
- bedingter Plugin-Push: ja — `if (runtimeConfig.chartText?.enabled) { chartConfig.plugins.push(FwChartTextPlugin); ... }`, Zeile 342–348
- Smart-Update-Zweig unverändert: ja — verifiziert per `git diff`: kein Zeichen-Diff im Bereich `if (state.chartInstance) { ... }` (Zeilen 373–381 im aktuellen Stand); Bestätigung durch direktes Lesen der vollständigen Datei nach dem Patch
- bestehendes `annotationPulse`-Verhalten unverändert: ja — Block Zeile 335–340 zeichenidentisch zum vorherigen Stand, nur die neue `chartText`-Sektion wurde danach eingefügt
- bestehendes `verticalLine`-Verhalten unverändert: ja — Block Zeile 329–332 unverändert, kein Diff

## Smart-Update-Testfall

- Initialrender mit `chartText: { enabled: true, annotations: [] }` geprüft: **vorbereitet, Browser-Beobachtung nicht durchgeführt** — Szenario AF in `app.test.html` ruft `renderFromData()` beim Laden der Seite genau mit dieser Config auf
- zweiter Render mit gefüllten Annotationen geprüft: **vorbereitet, Browser-Beobachtung nicht durchgeführt** — Button „Annotation einblenden" in Szenario AF löst den zweiten `renderFromData()`-Aufruf mit `annotations: [{ text: 'Test-Annotation\nZeile 2', x: 0.75, y: 0.35, ... }]` aus
- Ergebnis: kein `chromium-cli`/Playwright im Environment verfügbar (geprüft: `which chromium-cli` → nicht gefunden, `npx playwright` lädt zwar, aber Albert hat sich für manuellen Test entschieden statt eine neue Dependency zu installieren). Die reine Code-Pfad-Analyse (siehe Kurzbefund und ChartEngine.js-Patch-Abschnitt) ist vollständig und schlüssig, ersetzt aber keine tatsächliche Browser-Beobachtung.
- Falls nicht möglich: Testlücke und Statusbegründung: **Testlücke vorhanden.** Der isolierte Plugin-Unit-Test (reines JS) deckt die Zeichenlogik des Plugins vollständig ab (14/14 Tests grün), aber NICHT das Zusammenspiel mit echtem Chart.js/DOM (Plugin-Registrierung beim Konstruktor, `chart.update()`-Verhalten, Canvas-Rendering im echten Browser). Diese Lücke ist der Hauptgrund für Status GELB statt GRÜN. Albert kann Szenario AF in `app.test.html` selbst über Live-Server öffnen und beobachten; das Ergebnis dieser manuellen Prüfung sollte vor AP-prokrast-03e (Abschluss-QA) festgehalten werden.

## Isolierter Test / QA

- Syntax-/Importprüfung: implizit durch den erfolgreichen `node`-Import von `FwChartTextPlugin.js` im Unit-Test bestätigt (ES-Module-Syntax korrekt, keine Parse-Fehler)
- Runtime-/Smoke-Test: ja, isolierter Plugin-Unit-Test mit Mock-`chart`-Objekten (kein DOM/Chart.js), temporäres Skript unter `C:\Users\...\scratchpad\test_fw_chart_text_plugin.mjs` (außerhalb des Repos, nicht committet) — **14/14 Tests bestanden**: Aktivierungs-Guard, leere/gefüllte `annotations`, defensives Überspringen ungültiger Annotationen (fehlendes `x`), kein Absturz bei `annotations` als Nicht-Array, `plotFraction`-Pixelberechnung korrekt (`px=400` bei `chartArea.width=400, x=0.75, left=100`), `baseline:'top'`-Blockausrichtung korrekt
- Regression Screen 1–3 / bestehende Charts: **nicht per Browser-Lauf verifiziert in diesem AP** (siehe Smart-Update-Testfall oben); durch `git diff` bestätigt, dass keine bestehende Codezeile in `annotationPulse`-, `verticalLine`- oder Smart-Update-Bereichen verändert wurde — das ist ein starkes, aber kein Laufzeit-Indiz
- Unicode-/Text-Smoke-Test: indirekt über den Unit-Test abgedeckt (normale Zeichenketten funktionieren); Emoji-Rendering (✅/❓) wurde in diesem AP bewusst **nicht** getestet (kein Smoke-Test mit Emoji-Zeichen im Unit-Test oder in Szenario AF) — konsistent mit dem Auftrag, keine Emoji-Produktentscheidung zu treffen; die finale Emoji-QA gehört laut Auftrag in den späteren Screen-4-Integrations-AP
- Kein Screen-4-Code verwendet: bestätigt — Szenario AF hat keinen Bezug zu Screen 4, `app.js`, `latestMonth`, `xDisplayRange` oder Rubikon-Logik
- Kein dauerhaftes Testharness erzeugt: **Abweichung, siehe Kurzbefund** — auf Alberts explizite Anweisung wurde Szenario AF dauerhaft in `app.test.html` eingebaut statt als temporäres Wegwerf-Skript

## A11y-Übergabe an Folge-AP

- Plugin zeichnet nur Canvas-Pixel: ja, bestätigt (Datei-Header, `_drawAnnotation()` nutzt ausschließlich `ctx.fillText()`)
- Semantisch relevanter Text braucht DOM-/`aria-live`-Kopie: ja, im Datei-Header von `FwChartTextPlugin.js` wörtlich festgehalten: „Semantisch relevante Texte müssen von der App zusätzlich im DOM oder in aria-live bereitgestellt werden."
- Rubikon-Satz im Folge-AP verpflichtend: ja — „Die nächsten 10 Jahre werden anders nervig." muss im Screen-4-Integrations-AP (AP-prokrast-03f) eine DOM-/Screenreader-Entsprechung erhalten (aus AP-03c bereits als harte Pflicht übernommen, hier bestätigt weitergereicht)
- AP-03d hat `app.js` nicht geändert: bestätigt (siehe „Geänderte Dateien")

## Nicht gebaut

- Screen-4-Integration: nicht gebaut, ausdrücklich nicht Ziel dieses APs
- Rubikon-Reveal: nicht gebaut
- `domainX`: nicht gebaut (aus V1 explizit ausgeschlossen)
- `dataY`: nicht gebaut
- Word-Wrap: nicht gebaut (`maxWidth` nicht implementiert)
- Responsive Rules: nicht gebaut (`visibleFromZone`/`hideOnMobile` nicht implementiert)
- Events/Tooltips: nicht gebaut
- DOM-Brücke: nicht gebaut
- Pixelkoordinaten-API: nicht gebaut
- Emoji-Fallback-Engine: nicht gebaut (Unicode wird best-effort über `ctx.fillText()` gerendert, keine Sonderbehandlung)

## Stop-Regeln geprüft

| Stop-Regel | Ausgelöst? | Notiz |
|---|---:|---|
| App-Dateien nötig | nein | `app.js`/`app.css` unverändert; `app.test.html` wurde auf Alberts explizite Anweisung erweitert (kein Stop, da explizite Autorisierung vorliegt) |
| bestehende Plugins nötig | nein | `FwAnnotationPulsePlugin.js`/`FwVerticalLinePlugin.js` unverändert |
| Strategy/Scale nötig | nein | `LineChartStrategy.js`/`FwSmartXAxis.js`/`BaseChartStrategy.js` unverändert |
| Smart-Update-Zweig nötig | nein | Zeilen 373–381 unverändert; Config-Spiegelung reicht, da `.options` beim Update komplett neu zugewiesen wird |
| Card-to-Point-Risiko | nein | keine Pixelkoordinaten-Rückgabe, keine Events, keine externe API im Plugin |
| V1-Scope-Creep | nein | keine der explizit verbotenen Funktionen (Word-Wrap, Collision Detection, Responsive Rules, `domainX`, `dataY`) implementiert |
| Regression bestehender Charts | nicht per Laufzeit bestätigt | Code-Diff zeigt keine Veränderung an bestehenden Pfaden; Browser-Bestätigung steht aus (Grund für GELB) |

## Risiken / offene Punkte

- Architektur: keine offenen Architekturfragen für das Plugin selbst; V1-Vertrag vollständig umgesetzt
- Code: keine bekannten Mängel; additive Patch-Struktur wie geplant
- Test: **zentrale offene Aufgabe** — Szenario AF in `app.test.html` muss noch tatsächlich im Browser (Live-Server) beobachtet werden, um den Smart-Update-Testfall final zu bestätigen
- A11y: nicht Gegenstand dieses APs, Pflicht-Übergabe an Screen-4-Integrations-AP dokumentiert
- Unicode/Emoji: nicht getestet in diesem AP, bewusst vertagt auf späteren Integrations-/QA-AP
- Screen-4-Integration: nicht Gegenstand dieses APs

## Empfehlung

- Nächster interner AP: AP-prokrast-03e — Abschluss-QA `FwChartTextPlugin.js` Claims-vs-Files, **mit vorgeschalteter manueller Browser-Bestätigung von Szenario AF durch Albert** (Live-Server, Initialrender + Klick auf „Annotation einblenden", Konsole auf Fehler prüfen)
- Ausdrücklich nicht nächster AP: Screen-4-Integration, Rubikon-Reveal-Bau, App-CSS, A11y-DOM-Kopie, Emoji-Produktentscheidung, Card-to-Point, `domainX`-Erweiterung, Screen-2-/Screen-3-Bau, APP_SPEC-Migration, Commit, Abschlussritual
- Rückgabe an Masterfaden nötig: nein

## Wiederlesen des Ergebnisprotokolls

- Ergebnisprotokoll nach Write vollständig wiedergelesen: ja
- Abgleich gegen Aufgabenstellung bestanden: ja
- Abweichungen: eine dokumentierte Abweichung (Szenario AF dauerhaft in `app.test.html` statt temporäres Wegwerf-Skript), auf Alberts explizite Anweisung im Gespräch, transparent im Kurzbefund und in „Geänderte Dateien"/„Isolierter Test / QA" begründet

## Nachtrag — manueller Browsertest durch Albert (Testlücke geschlossen, Testharness-Fix)

Albert hat Szenario AF manuell über Live-Server geöffnet. Befund: Range-Controls (1J/3J/5J/10J/MAX) und BAN-Headline („Gewinn seit 2024") erschienen unerwartet (Default-Verhalten der Engine, da `features` in Szenario AF nicht gesetzt war), und der Button „Annotation einblenden" war visuell nicht als Button erkennbar, sondern erschien als Text, der links über die Y-Achse hinausragte — kein Klick möglich.

**Ursachenanalyse (Test-Harness-Bug, kein Plugin-/Engine-Bug):** Der Container `#fwChartTextTest` in Szenario AF hatte keine `class="fw-app__chart-section"`. Diese Klasse (`app.css:104–108`) setzt `position: relative; width: 100%;` — ohne sie positionieren sich interne, absolut positionierte Chart-Engine-Elemente relativ zum nächsten positionierten Vorfahren im DOM-Baum statt relativ zum Chart-Container, was den nachfolgenden `<button>` visuell überlagerte. Zusätzlich fehlte `features: { rangeControls: false, headline: false }`, wodurch Default-UI-Elemente sichtbar wurden, die im echten Screen-2/3-Einsatz (`app.js:462, 484`) bewusst deaktiviert sind.

**Fix (nur `app.test.html`, keine weitere Datei betroffen):** Container erhält `class="fw-app__chart-section"` (bestehende, bereits getestete App-CSS-Klasse, wiederverwendet — `app.css` selbst nicht geändert); beide `renderFromData()`-Aufrufe in Szenario AF erhalten `features: { rangeControls: false, headline: false }`, analog zur echten Screen-2/3-Nutzung. `FwChartTextPlugin.js` und `ChartEngine.js` wurden dabei **nicht** angefasst — der Fund bestätigt indirekt, dass die eigentliche Plugin-/Engine-Logik aus diesem AP funktional unauffällig blieb; das Problem lag ausschließlich im ad-hoc aufgebauten Testszenario.

Status bleibt GELB — der eigentliche visuelle Smart-Update-Testfall (Text erscheint nach Klick, kein Neuaufbau) steht nach diesem Fix noch aus.

**Zweiter Nachtrag:** Nach dem ersten Fix war der Button sichtbar, aber nicht klickbar. Ursache: Die von `FwRenderer._injectStyles()` global injizierte Regel `.fw-chart-canvas-container { position: relative; height: 400px; width: 100%; }` erzwingt intern 400px Höhe, während der Testcontainer inline `height: 300px` gesetzt hatte. Der 100px-Überhang wurde nicht geclippt (kein `overflow:hidden`), und da `.fw-chart-canvas-container`/`.fw-chart-wrapper` `position: relative` tragen (positionierte Elemente), malen sie laut CSS-Stacking-Regeln über nicht-positionierte Geschwister-Elemente hinweg — unabhängig von der DOM-Reihenfolge. Der Button (nicht positioniert) lag dadurch im Klickbereich unter dem überlaufenden Chart-Canvas. Fix: inline `height`-Angabe am Testcontainer entfernt (die App setzt in Screen 2/3 ebenfalls keine feste Höhe, die 400px kommen aus der Engine-CSS selbst), Button zusätzlich `position: relative` gegeben als zweite Absicherung. Wieder ausschließlich `app.test.html` betroffen, `FwChartTextPlugin.js`/`ChartEngine.js`/`app.css` unverändert.

Hinweis: Der Button in Szenario AF ist reines Test-Scaffolding, um den zweiten `renderFromData()`-Aufruf manuell auslösen zu können. In der produktiven Screen-4-Integration (späterer AP) gäbe es keinen Button — das Timing würde von der App-Logik gesteuert (z. B. nach der 800ms-Pause).

## Nachtrag 2 — Smart-Update-Testfall final bestätigt, Status GRÜN

Albert hat Szenario AF nach beiden Fixes erneut manuell im Browser geprüft. Ergebnis:

1. Initialrender: Chart sichtbar, kein Text (Plugin registriert, `annotations` leer) — wie erwartet.
2. Klick auf „Annotation einblenden": zweizeiliger Text erscheint korrekt („wie angekündigt zweizeilig"). Der Chart „baut sich neu auf" — das ist die normale Smart-Update-Animation der Engine (nicht `destroy()`/`new Chart()`, direkt am Code verifiziert), weil `renderFromData()` bei jedem Aufruf einen frischen Datensatz baut und Chart.js das animiert einblendet. Identisches Verhalten nutzt Screen 2 bereits produktiv bei jedem Stationswechsel — kein neuer Effekt, sondern der bestätigte, gewünschte Smart-Update-Mechanismus (relevant auch für den späteren Rubikon-Reveal, siehe AP-03b).
3. Zweiter Klick: keine sichtbare Änderung — erwartungsgemäß, da der Test-Button bei jedem Klick exakt dieselbe Annotation (gleicher Text, gleiche Position) erneut sendet. Kein Toggle-Mechanismus gebaut (auf Alberts Wunsch nicht nötig, „es geht nur um den Funktionstest").
4. Konsole: keine neuen Fehler. Alle sichtbaren Konsolenmeldungen (GATEKEEPER-URL, 404, ungültiges Datum, `favicon.ico`-404) stammen von den bereits bestehenden, absichtlich fehlerhaften Testkarten H/I/J/Q sowie Standard-Browser-Rauschen — keine bezieht sich auf `fwChartText`/`FwChartTextPlugin`/`ChartEngine`.

Damit ist der in AP-03d als GRÜN-Bedingung geforderte Smart-Update-Pflichttestfall („Plugin bei Initialrender registrieren, danach nur Annotationen per zweitem Aufruf ändern, kein Umbau des Smart-Update-Zweigs nötig") **tatsächlich im Browser bestätigt**, nicht nur am Code hergeleitet. Die Testlücke aus dem ursprünglichen Kurzbefund ist geschlossen. Status wird von GELB auf **GRÜN** hochgestuft — alle übrigen GRÜN-Kriterien (nur erlaubte Dateien, additive Patches, kein Scope-Creep, Protokoll geschrieben und wiedergelesen) waren bereits erfüllt.
