# AP-prokrast-08b3 — Chart-Settled-Gate für Card-to-Point Ergebnis

## Status

GELB

## Kurzbefund

Der Sequenzfehler aus AP-08b2 (Card-Flight startete, bevor der Chart-Reveal final abgeschlossen war) ist durch ein echtes, opt-in Chart-Settled-Gate behoben — nicht durch den `update('none')`-Fallback. Die Engine erhält einen neuen, zu `anchorMeasurement` analogen Optionsvertrag `chartSettled`, der Chart.js' natives `animation.onComplete` nutzt (kein neues Plugin, kein neuer Kommunikationskanal) und dieses Signal über eine neue Vermittlungsmethode `_emitChartSettled()` an `app.js` durchreicht — als reines, argumentloses Lifecycle-Signal, ohne Chart.js-Objekt. `app.js` speichert eingehende `AnchorMeasurement`-Werte nur noch zwischen und wertet sie erst aus, wenn `chartSettled` feuert — genau die von Perplexity/Albert verlangte harte Bedingung `chartSettled === true AND measurement.id === targetAnchorId AND measurement.visible === true → card-flying`. Unter Reduced Motion (`chart.update('none')`) feuert Chart.js kein `animation.onComplete` (keine Animation läuft) — dafür wird das Settled-Signal synchron direkt nach dem Update nachgereicht, da der Update-Zyklus zu diesem Zeitpunkt bereits abgeschlossen ist. Alle deterministischen Checks (Chart.js-Internals-Grep in `app.js`, `_fwGeometry`-Grep, Scope-Diff, `update('none')`-Scope) sind grün. Status GELB statt GRÜN ausschließlich weil in dieser Umgebung keine Browser-QA möglich ist — die vom AP zwingend verlangte Bestätigung der sichtbaren Sequenz steht noch aus.

## Ausgangsproblem

- **Browser-Ist-Sequenz (Albert, nach AP-08b2):** Card-Flight startet, bevor der Chart-Reveal final abgeschlossen ist; danach animiert der Chart sichtbar weiter/schießt zum neuen Event.
- **Warum `measurement.visible` zu früh war:** `FwAnchorMeasurementPlugin` misst in `afterDraw`. Dieser Hook feuert bei jedem Chart.js-Draw-Frame — auch während einer noch laufenden Chart.js-eigenen Update-Animation (Standarddauer ca. 1000ms, da keine Strategie für LineChartStrategy eine kürzere/andere Animation konfiguriert — per Grep bestätigt). `measurement.visible === true` bewies nur „der Punkt liegt in der ChartArea" — nicht, dass die Linie fertig gezeichnet ist, der Chart stillsteht oder der Nutzer den finalen Endzustand sieht. AP-08b2s State Machine akzeptierte das erste `visible: true` als `point-pulsing-ready` und startete daraufhin sofort den Flug — auf ein Ziel, dessen Pixel-Position sich in den folgenden Frames noch veränderte.
- **Soll-Sequenz:** Klick → Chart wächst auf den neuen Event → Chart steht still → Zielpunkt pulst/ist final sichtbar → Clone fliegt zum pulsierenden Punkt und verschwindet dort → neue Karte erscheint.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short` (vor Bau): ` M .claude/learning/session-log.md`, ` M Apps/prokrastinations-preis/app.css`, ` M Apps/prokrastinations-preis/app.js`, ` M Theme/assets/js/fw-chart-engine/core/ChartEngine.js`, ` M Theme/assets/js/fw-chart-engine/plugins/index.js`, ` M docs/steering/BACKLOG.md` + bekannte `??`-Neuzugänge (Plugin-Datei, AP-08a/08b/08b2-Protokolle, Chronik) — alles bereits aus AP-08b/AP-08b2 bekannt, keine unerwarteten Änderungen
- `git diff --name-status` (vor Bau): identisch zur obigen Liste
- `git log --oneline -10`: `ca45c94` (AP-prokrast-07a-07d, committed) bis `7104b77` — lückenlos, AP-07 sichtbar committed, kein Commit aus AP-08-Kette

Keine unerwarteten Änderungen. Gate-Voraussetzung erfüllt.

## Gelesene Quellen

- `docs/steering/patches/AP-prokrast-08a_koordinaten-schnittstelle_analyse_Ergebnis.md` — vollständig
- `docs/steering/patches/AP-prokrast-08b_anchor-measurement_card-to-point_implementierung_Ergebnis.md` — vollständig
- `docs/steering/patches/AP-prokrast-08b2_llm-review-kontext.md` — vollständig (das formale `AP-prokrast-08b2_sequenzkorrektur_card-to-point_Ergebnis.md` existiert noch nicht — stattdessen dieses Kontextdokument gelesen und als Quelle genutzt, wie im Prompt vorgesehen)
- `Apps/prokrastinations-preis/app.js` — vollständig (vor und nach Änderung)
- `Apps/prokrastinations-preis/app.css` — geprüft, keine Änderung in diesem AP nötig
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` — vollständig (vor und nach Änderung)
- `Theme/assets/js/fw-chart-engine/plugins/FwAnchorMeasurementPlugin.js` — vollständig gelesen, unverändert gelassen
- `Theme/assets/js/fw-chart-engine/plugins/index.js` — geprüft, keine Änderung in diesem AP nötig
- `Theme/assets/js/fw-chart-engine/strategies/PieChartStrategy.js`, `LineChartStrategy.js` — gezielt per Grep auf `animation` geprüft (Engine-Befund)
- `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md`, `APP-INTERFACE.md` §4 — aus Vorgänger-APs bereits belastbar geklärt, für diesen AP nicht erneut vollständig gelesen (Änderung betrifft `animation.onComplete`, ein natives Chart.js-Feature, keine neue Plugin-Frage)

## Engine-Befund vor Code

- **Smart-Update-Pfad:** `ChartEngine.js`, `if (state.chartInstance) {...}`-Zweig in `_draw()` (vor dieser Änderung Zeilen 410–419, jetzt 451–469).
- **`chart.update()`-Stelle:** genau eine, `state.chartInstance.update(this._prefersReducedMotion() ? 'none' : undefined)` — einzige Aufrufstelle im gesamten Modul.
- **Vorhandene animation-Konfiguration:** keine für `LineChartStrategy` (die von Screen 2 genutzte Strategie). `PieChartStrategy.js` setzt `{ duration: 400, easing: 'easeOutQuart' }` (irrelevant für diesen AP). `chartConfig.options.animation = false` wird nur unter Reduced Motion bei der **Erstellung** gesetzt (im `else`-Zweig, innerhalb der `requestAnimationFrame`-Callback), nicht im Update-Pfad.
- **Vorhandener onComplete:** keiner. Grep auf `onComplete`/`animation.onComplete` über die gesamte Engine ergab keinen Treffer vor dieser Änderung.
- **Entscheidung:** echtes Chart-Settled-Gate (Primärlösung), kein `update('none')`-Fallback.
- **Begründung:** `chart.options` (im Gegensatz zu `chart.config.plugins`) wird bei **jedem** `_draw()`-Aufruf frisch an die bestehende Chart.js-Instanz übergeben (`state.chartInstance.options = chartConfig.options`) — das ist exakt der Mechanismus, an dem der AP-08b2-Bug (Plugin-Registrierung nur bei `new Chart()`) NICHT hängt. `animation.onComplete` ist damit ohne Bootstrap-Workaround sicher nutzbar. Einzige Ausnahme: Reduced Motion (`update('none')`) — dort läuft keine Chart.js-Animation, `onComplete` feuert nicht, das Update ist aber synchron mit Rückkehr aus `.update()` bereits fertig. Dafür wurde ein synchroner Nachreich-Pfad ergänzt (kein Warten auf ein Ereignis, das nie kommt).

## Gewählte Lösung

### Primärlösung: Chart-Settled-Gate

- **umgesetzt:** ja
- **Hook:** Chart.js' natives `options.animation.onComplete` (kein Plugin-Lifecycle-Hook, sondern Chart.js' eigene Animations-API); zusätzlich ein synchroner Pfad direkt nach `state.chartInstance.update('none')` für Reduced Motion.
- **Callback-Komposition:** `ChartEngine._draw()` liest einen eventuell bereits vorhandenen `chartConfig.options.animation.onComplete` aus (`existingOnComplete`) und ruft ihn zuerst auf, bevor `_emitChartSettled()` läuft — aktuell existiert kein solcher Callback (geprüft), die Komposition ist defensiv für die Zukunft angelegt, nicht weil sie heute gebraucht wird.
- **opt-in-Grenze:** nur aktiv, wenn `options.chartSettled.enabled === true` beim jeweiligen `renderFromData()`-Aufruf gesetzt ist (aktuell ausschließlich in `revealCurrentStationPoint()`, `app.js`). Andere Aufrufe (`renderJourneyStep`, Screen 3/4) setzen `chartSettled` nicht — für sie ändert sich `chartConfig.options.animation` nicht.

### Fallbacklösung: update('none')

- **umgesetzt:** nein — nicht benötigt, da die Primärlösung sauber und klein umsetzbar war (Engine-Befund positiv beantwortet).

## Geänderte Dateien

| Datei | Änderung | Warum im Scope | Nach Write wiedergelesen? |
|---|---|---|---:|
| `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` | neuer `chartSettled`-Optionsvertrag in `renderFromData()` (beide State-Zweige); `animation.onComplete`-Komposition in `_draw()` (opt-in, nur bei `chartSettled.enabled`); synchroner Settled-Emit im Reduced-Motion-Zweig des Update-Pfads; neue private Methode `_emitChartSettled()` | einzige laut Auftrag primär erwartete Engine-Datei; additiv, analog `anchorMeasurement` | ja |
| `Apps/prokrastinations-preis/app.js` | `revealCurrentStationPoint()`: `onAnchorMeasurement`-Callback speichert nur noch zwischen (`latestMeasurement`), Gate-Auswertung (`targetAnchorId`, `visible`) verlagert in neuen `chartSettled.onSettled`-Callback; Journey-Button-State-Machine um `chart-settled`/`point-ready-final` erweitert; Fallback-Timeout von 1500ms auf 1200ms gesenkt (begründet, s. u.) | einzige laut Auftrag primär erwartete App-Datei | ja |
| `docs/steering/patches/AP-prokrast-08b3_chart-settled-gate_card-to-point_Ergebnis.md` | neu (dieses Protokoll) | Pflicht-Ergebnisdatei | wird nach Write geprüft |

**Nicht geändert (bewusst, wie erwartet):** `Apps/prokrastinations-preis/app.css` (keine CSS-Änderung nötig — das Chart-Settled-Gate ist reine JS-/Engine-Logik, die Flug-Animation selbst ist unverändert), `Theme/assets/js/fw-chart-engine/plugins/FwAnchorMeasurementPlugin.js` (unverändert — das Plugin misst weiterhin korrekt, das Problem lag ausschließlich darin, WANN `app.js` seiner Messung vertraut, nicht in der Messung selbst), `Theme/assets/js/fw-chart-engine/plugins/index.js` (kein neues Plugin, kein neuer Export nötig).

## Neue Sequenz

| Schritt | Zustand | Beleg |
|---|---|---|
| Klick | `chart-revealing` | `journeyBtn`-Handler, `journeyState = 'chart-revealing'` vor `revealCurrentStationPoint()`-Aufruf |
| Chart-Reveal startet | `chart-revealing` | `revealCurrentStationPoint()` ruft `chartEngine2.renderFromData(...)` mit `annotationsIncludingCurrent` (aktuelle Station bereits als Vergangenheits-Annotation) |
| Chart settled / final | `chart-settled` | `chartSettled.onSettled`-Callback, ausgelöst durch `ChartEngine._emitChartSettled()`, selbst ausgelöst durch Chart.js' `animation.onComplete` (oder synchron bei Reduced Motion) |
| Zielpunkt/Pulse final sichtbar | `chart-settled` → `point-ready-final` | `onSettled` prüft `m.id === targetAnchorId && m.visible`, erst danach gilt der Punkt als final; Pulse selbst unverändert über `FwAnnotationPulsePlugin`/`annotationPulse: {mode:'newly-added'}` |
| AnchorMeasurement für targetAnchorId vorhanden | geprüft in `onSettled` | `const m = latestMeasurement; if (m && m.id === targetAnchorId && m.visible) onPointReady(m);` |
| Clone fliegt erst danach | `card-flying` | `flyCardToPoint(measurement, enterNextCard)` wird ausschließlich aus `handlePointReady()` aufgerufen, die ihrerseits erst durch `onSettled` (nie durch den rohen `onAnchorMeasurement`-Callback) ausgelöst wird |
| Clone verschwindet im Punkt | `card-flying` → Ende | `flyCardToPoint()` unverändert aus AP-08b: `setTimeout(() => { clone.remove(); onComplete(); }, getFlightDurationMs() + 20)` |
| nächste Karte erscheint erst nach Flight-Ende | `next-card-entering` | `enterNextCard()` ist der `onComplete`-Callback von `flyCardToPoint()` — wird nie vorher aufgerufen |

## State Machine

- **idle:** aktuelle Karte sichtbar, Chart auf Stand der erreichten Erzählposition, Button bedienbar.
- **chart-revealing:** `revealCurrentStationPoint()` läuft, Chart wird auf den Stand der aktuell sichtbaren Karte (inkl. dieser Station als Annotation) aktualisiert; Karte/Button unverändert.
- **chart-settled:** `chartSettled.onSettled` ist gefeuert — Chart.js' Update-Animation für diesen Zyklus ist abgeschlossen (oder Reduced-Motion-Sofortpfad lief synchron durch).
- **point-ready-final:** die zuletzt gemeldete Messung wurde gegen `targetAnchorId` und `visible` geprüft und für gültig befunden (nur erreicht, wenn Flug tatsächlich stattfindet — bei ungültigem/fehlendem Measurement wird direkt zu `next-card-entering` übergegangen, kein separater Fehlzustand).
- **card-flying:** `flyCardToPoint()` läuft, Klon animiert zum Zielpunkt, echte Karte unverändert im DOM.
- **next-card-entering:** `enterNextCard()` läuft — `activeStationIndex` erhöht, `renderJourneyStep()` rendert neue Karte + „Idle"-Chart-Stand.
- **Rückkehr zu idle:** letzte Zeile von `enterNextCard()`, `journeyState = 'idle'`.
- **Schutz gegen Doppelklick / non-idle-Klick:** `if (journeyState !== 'idle') return;` am Anfang des Click-Handlers — unverändert aus AP-08b2, kein Button-Disable (bewusste, bereits in AP-08b2 begründete Entscheidung: vermeidet Fokusverlust-Risiko beim Deaktivieren eines fokussierten Buttons).

## A11y / Reduced Motion

- **echte Card bleibt semantische Quelle:** unverändert aus AP-08b/08b2 — `stationArea` wird während der gesamten Sequenz (`chart-revealing` bis `card-flying`) nicht verändert, erst `enterNextCard()` ruft `renderJourneyStep()`, das den Karteninhalt ersetzt.
- **Clone sichtbar, aber aria-hidden:** unverändert, `flyCardToPoint()` wurde in diesem AP nicht angefasst.
- **Clone nicht fokussierbar:** unverändert (`tabindex="-1"`, `disabled` auf Buttons, `inert`-Attribut).
- **IDs im Clone entfernt:** unverändert (`querySelectorAll('[id]')`/`[aria-controls]` entfernt).
- **Live-Region:** unverändert — `a11yRegion.textContent` wird ausschließlich in `renderJourneyStep()` gesetzt, also frühestens in `next-card-entering`. Während `chart-revealing`/`chart-settled`/`card-flying` keine Live-Region-Aktivität — kein Feuern pro Animationsframe.
- **Fokusverhalten:** unverändert — Fokus wird erst am Ende von `enterNextCard()` gesetzt.
- **Keyboard-Verhalten:** unverändert — `journeyBtn` bleibt während der gesamten Sequenz fokussierbar und im DOM; non-idle-Klicks werden ignoriert, nicht durch Deaktivieren verhindert.
- **Reduced-Motion-Sequenz:** `prefersReducedMotion()` wird weiterhin nur in `handlePointReady()` geprüft, um den Flug zu überspringen — die kausale Reihenfolge (Chart-Reveal → Settled → ggf. Punkt final → Karte) bleibt unverändert erhalten, weil `chartSettled` jetzt auch unter Reduced Motion zuverlässig (synchron) feuert, statt (wie vor diesem AP potenziell) auf ein nie kommendes `animation.onComplete` zu warten. Das ist eine **Verbesserung** gegenüber AP-08b2, in dem die Reduced-Motion-Sequenz zwar funktional korrekt war, aber vom selben `afterDraw`-Timing-Problem wie der Normalfall abhing.

## Deterministische QA

### app.js Chart.js-Internals-Grep

Befehl: `grep -nE "chart\.scales|getDatasetMeta|getPixelForValue|chartArea|Chart\.getChart" Apps/prokrastinations-preis/app.js`
Ergebnis: keine Treffer
Bewertung: bestanden

### _fwGeometry-Grep

Befehl: `grep -RIn "_fwGeometry" Theme/assets/js/fw-chart-engine Apps/prokrastinations-preis docs/spec docs/steering/patches`
Ergebnis: Treffer nur im Kopfkommentar von `FwAnchorMeasurementPlugin.js` (dokumentiert das Verbot) und in bereits vorhandenen, historisch als Drift markierten Spec-/Protokoll-Dateien (`CHART_PLUGIN_ARCHITEKTUR.md` §20.6, „Baendigung der X-Achse"-Dokumente, AP-14e-Protokolle, AP-08b-Ergebnisprotokoll)
Bewertung: bestanden — keine neue produktive Verwendung

### update('none')-Scope, falls verwendet

- **Bedingung:** `update('none')` wurde nicht neu eingeführt — es ist die bereits seit B1-AP-15b bestehende Reduced-Motion-Logik (`this._prefersReducedMotion() ? 'none' : undefined`), unverändert in ihrer Auslösebedingung. Neu ist nur, dass bei diesem Pfad zusätzlich `_emitChartSettled()` synchron nachgereicht wird, und zwar ausschließlich wenn `runtimeConfig.chartSettled?.enabled` zusätzlich wahr ist.
- **nicht global:** bestätigt — `chartConfig.options.animation` wird nur verändert, wenn `runtimeConfig.chartSettled?.enabled` wahr ist; ohne diese Option bleibt `chartConfig.options.animation` exakt wie zuvor (`undefined` für LineChartStrategy, `{duration,easing}` für PieChartStrategy).
- **Standard-Updates unverändert:** bestätigt — Screen 3, Screen 4 und alle anderen Apps, die `ChartEngine` nutzen, setzen `chartSettled` nicht und sind daher von dieser Änderung nicht betroffen.

### Plugin-Zweckentfremdung

- `FwAnnotationPulsePlugin.js`: unverändert (nicht im Diff)
- `FwChartTextPlugin.js`: unverändert (nicht im Diff)
- `FwVerticalLinePlugin.js`: unverändert (nicht im Diff)

### Scope-QA

- `git diff --name-status`: `Apps/prokrastinations-preis/app.js`, `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` (beide erlaubt) + bereits aus Vorgänger-APs bekannte Dateien (`app.css`, `plugins/index.js`, `BACKLOG.md`, `session-log.md` — keine davon in diesem AP erneut verändert, s. u.)
- **verbotene Dateien unverändert:** bestätigt — `APP_SPEC.md`, Drehbuch, `QA_TEST_CASES.md`, `stations.de.json`, `Theme/assets/data/**`, `FwAnnotationPulsePlugin.js`, `FwChartTextPlugin.js`, `FwVerticalLinePlugin.js`, `FwDateUtils.js`, `FinanzwesirData.js`, `CSVParser.js` erscheinen in keinem Diff dieses APs

## Browser-QA

- **durchgeführt:** nein — in dieser Umgebung kein Browser-/Live-Server-Zugriff verfügbar
- **Browser/Viewport:** —
- **Sequenz bestätigt:** offen
- **S:** offen
- **M:** offen
- **L:** offen
- **Reduced Motion:** offen
- **offene Punkte:** die vom AP zwingend verlangte Browserbestätigung der sichtbaren Sequenz (Klick → Chart wächst → Chart steht still → Zielpunkt final sichtbar/pulst → Clone fliegt → Clone verschwindet im Punkt → neue Karte) steht komplett aus. Alle Aussagen zur Korrektheit der Sequenz in diesem Protokoll sind code-analytisch hergeleitet (Lesen von Chart.js' dokumentiertem `animation.onComplete`-Verhalten, Nachvollziehen des Datenflusses im Code), nicht empirisch am echten Chart.js-Verhalten im Browser verifiziert.

## Datenwahrheit

- Stationsdaten unverändert: bestätigt (`stations.de.json` nicht im Diff)
- Finanzdaten unverändert: bestätigt (`Theme/assets/data/**` nicht im Diff)
- keine Zukunftsdaten: bestätigt
- keine Dummy-Datasets: bestätigt
- keine Future-Line: bestätigt
- keine Prognose: bestätigt

## Regression

- Screen 1: nicht angefasst
- Screen 3: nicht angefasst (`renderS3()` unverändert, setzt `chartSettled` nicht)
- Screen 4: nicht angefasst (`renderScreen4Chart()`/`revealScreen4()` unverändert, setzt `chartSettled` nicht)
- RubikonSymbolMarkers: nicht angefasst (`FwChartTextPlugin.js` nicht im Diff)
- TC-F05 nicht wieder geöffnet: bestätigt, kein Bezug in diesem AP

## Risiken

| Risiko | Kategorie | Blockierend? | Empfehlung |
|---|---|---:|---|
| Browser-Bestätigung der gesamten Sequenz (inkl. Chart-Settled-Gate) steht komplett aus | QA-Lücke | ja für GRÜN, nein für GELB | Albert-Test im lokalen Live-Server ist Pflichtvoraussetzung für ein GRÜN-Protokoll (AP-Vorgabe) |
| Chart.js' `animation.onComplete`-Verhalten bei `update()` ohne expliziten Modus ist aus Dokumentation/Quellcode-Lektüre hergeleitet, nicht in diesem Environment lauffähig getestet | technisches Restrisiko | nein, aber substanziell | im Browser-Test explizit beobachten, ob `onSettled` zuverlässig genau einmal pro Klick feuert und nicht zu früh/spät |
| 1200ms-Fallback-Timeout ist weiterhin eine geschätzte, nicht gemessene Zahl | Feinschliff | nein | nach Browser-Test ggf. weiter anpassen, sobald reale Chart.js-Animationsdauer im Zusammenspiel mit `yRangePolicy: cumulative-expand-zero` beobachtet wurde |
| Falls Chart.js' `onComplete` in seltenen Fällen (z. B. unterbrochene/neu gestartete Animation durch schnelle Klicks) mehrfach oder verzögert feuert | Edge Case | nein | durch `journeyState !== 'idle'`-Guard und `pointReadyHandled`-Flag bereits defensiv abgefangen; im Browser-Test gezielt mit schnellen Mehrfachklicks prüfen |

## Nicht geändert

- APP_SPEC.md: nicht geändert
- Drehbuch: nicht geändert
- QA_TEST_CASES.md: nicht geändert
- stations.de.json: nicht geändert
- Finanzdaten: nicht geändert
- FwAnnotationPulsePlugin.js: nicht geändert
- FwChartTextPlugin.js: nicht geändert
- FwVerticalLinePlugin.js: nicht geändert
- Screen 4: nicht geändert
- RubikonSymbolMarkers: nicht geändert

## Empfehlung

- nächster interner AP: Browser-Bestätigung durch Albert (kein neuer AP nötig, sondern Testfeedback zu diesem AP) — danach entweder GRÜN-Nachtrag zu diesem Protokoll oder AP-prokrast-08c (Abschluss-QA Claims-vs-Files / Motion / Regression)
- ausdrücklich nicht: Commit, Abschlussritual, AP-07-Nacharbeit, Spec-Sync ohne Masterentscheidung
