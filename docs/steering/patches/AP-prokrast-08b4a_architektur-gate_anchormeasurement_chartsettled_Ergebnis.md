# AP-prokrast-08b4a — Architektur-Gate AnchorMeasurement / chartSettled Ergebnis

## Status

GELB

## Kurzbefund

Alle vier bisherigen AP-08b-Bausteine wurden einzeln gegen die vier Kriterien (produktlogisch richtig, spec-konform, plattformfähig, wartbar) geprüft, nicht automatisch aus Sunk-Cost-Gründen übernommen. Ergebnis: **AnchorMeasurement v1 (BEHALTEN)**, **chartSettled-Contract (BEHALTEN)**, **App-State-Machine (HÄRTEN, in diesem AP umgesetzt)**, **No-op-Bootstrap in `renderJourneyStep()`/`renderJourneyChartOnly()` (HÄRTEN, mit expliziter Folgepflicht — nicht BEHALTEN im Sinne von „unverändert unproblematisch")**. Kein Baustein wurde als ERSETZEN oder ZURÜCKBAUEN eingestuft. Alle sieben Patch-Erlaubnis-Bedingungen waren erfüllt, daher wurde der Gate-5-Patch im selben AP umgesetzt: `renderJourneyStep()` ist in `renderJourneyChartOnly()` (Chart, jetzt optional chartSettled-gatebar) und `renderJourneyCardOnly()` (Karte/Chip/Button/Live-Region) aufgeteilt. `enterNextCard()` im Klick-Handler ist jetzt selbst ein kleiner gegateter Zyklus: Chart wächst zuerst auf Station X+1 (`renderJourneyChartOnly` mit `chartSettled`), erst nach dessen `onSettled`-Signal (oder dem defensiven 1200ms-Fallback) erscheint Karte X+1 (`renderJourneyCardOnly`). Kein neuer Mechanismus, keine Engine-Änderung nötig — reine Wiederverwendung des bereits in AP-08b3 gebauten `chartSettled`-Contracts. Status GELB statt GRÜN aus zwei Gründen: (1) Browser-QA weiterhin nicht möglich in dieser Umgebung, (2) der No-op-Bootstrap bleibt eine offene Folgepflicht vor einer offiziellen Dokumentation von AnchorMeasurement als Plattform-Pattern für weitere Apps.

## Warum dieser Gate-AP nötig war

- **Sunk-Cost-Risiko:** Drei aufeinanderfolgende Bugfix-Runden (AP-08b2, AP-08b3, plus der in AP-08b3 nachträglich behobene Plugin-Registrierungsbug) hätten dazu verleiten können, den nächsten Patch (Gate 5) einfach „on top" zu bauen, weil die bisherige Struktur schon da war — ohne zu prüfen, ob einzelne Bausteine selbst technische Schuld enthalten.
- **Blaupausen-Relevanz für weitere Apps:** AnchorMeasurement/chartSettled sind explizit als wiederverwendbares Engine-Muster für bis zu 22 weitere Apps gedacht (bereits als Folgepflicht in AP-08b/AP-08b3 dokumentiert). Ein stiller App-seitiger Workaround, der unreflektiert übernommen wird, würde sich in jeder Folge-App wiederholen.
- **Entscheidung:** kein automatisches Weiterbauen auf bisherigen Fixes — jeder Baustein wurde einzeln anhand der vier Kriterien klassifiziert (Gates 1–4), bevor der Gate-5-Patch überhaupt in Erwägung gezogen wurde.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short` (vor Bau): ` M .claude/learning/session-log.md`, ` M Apps/prokrastinations-preis/app.css`, ` M Apps/prokrastinations-preis/app.js`, ` M Theme/assets/js/fw-chart-engine/core/ChartEngine.js`, ` M Theme/assets/js/fw-chart-engine/plugins/index.js`, ` M docs/steering/BACKLOG.md` + bekannte `??`-Neuzugänge (Plugin-Datei, AP-08a/08b/08b2/08b3-Protokolle, Chronik) — alles bereits aus AP-08b/08b2/08b3 bekannt
- `git diff --name-status` (vor Bau): identisch zur obigen Liste
- `git log --oneline -10`: `ca45c94` (AP-prokrast-07a-07d, committed) bis `7104b77` — lückenlos, kein Commit aus AP-08-Kette

Keine unerwarteten Änderungen, keine Dateien außerhalb des bekannten AP-08b-Scope. Gate-Voraussetzung erfüllt.

## Gelesene Quellen

- `docs/steering/patches/AP-prokrast-08a_koordinaten-schnittstelle_analyse_Ergebnis.md` — vollständig
- `docs/steering/patches/AP-prokrast-08b_anchor-measurement_card-to-point_implementierung_Ergebnis.md` — vollständig
- `docs/steering/patches/AP-prokrast-08b2_llm-review-kontext.md` — vollständig
- `docs/steering/patches/AP-prokrast-08b3_chart-settled-gate_card-to-point_Ergebnis.md` — vollständig
- `docs/steering/patches/AP-prokrast-08b4_analyse_und_patchvorschlag.md` — **existiert nicht.** Diese Datei wurde in keinem vorherigen Faden dieser Session geschrieben; der im Prompt referenzierte AP-08b4-„Analyse & Patchvorschlag" liegt nicht als eigenständiges Dokument vor. Der darin behauptete Befund (zweiter Render-Zyklus ungegated) wurde stattdessen **direkt am realen `app.js`-Code verifiziert** (s. Gate 5) — die Feststellung ist damit unabhängig bestätigt, nicht blind aus einer nicht existierenden Quelle übernommen.
- `Apps/prokrastinations-preis/app.js` — vollständig (vor und nach Änderung)
- `Apps/prokrastinations-preis/app.css` — geprüft, keine Änderung in diesem AP nötig
- `Apps/prokrastinations-preis/config/stations.de.json` — aus Vorgänger-APs bereits belastbar geklärt, nicht erneut gelesen (keine Änderung, kein neuer Klärungsbedarf)
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` — vollständig gelesen, unverändert gelassen
- `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js` — vollständig gelesen (Diagnosequelle, nicht geändert)
- `Theme/assets/js/fw-chart-engine/plugins/FwAnchorMeasurementPlugin.js` — vollständig gelesen, unverändert
- `Theme/assets/js/fw-chart-engine/plugins/index.js` — vollständig gelesen, unverändert
- `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md`, `APP-INTERFACE.md` §4 — aus Vorgänger-APs bereits belastbar geklärt, für dieses Gate nicht erneut vollständig gelesen (keine neue Architekturfrage, die diese Dokumente nicht schon aus AP-08a/08b beantwortet hätten)

## Gate 1 — AnchorMeasurement v1

### Befund

`FwAnchorMeasurementPlugin.js` (unverändert seit AP-08b) enthält ausschließlich neutrale Begriffe (`anchors`, `id`, `x`, `y`, `visible`) — keine App-/Screen-/Station-/Journey-/Rubikon-/SaaS-Begriffe. Aktivierung ausschließlich über `chart.options.plugins.fwAnchorMeasurement.enabled === true` (opt-in). Der Payload an `onMeasurement` enthält nur Plain Numbers (`{id, x, y, visible}`, `Object.freeze`t) — keine Chart.js-/DOM-/Canvas-Referenzen. Chart.js-Internals (`chart.scales`, `chart.chartArea`, `getPixelForValue`) bleiben vollständig im Plugin; `app.js` enthält laut Grep keinen einzigen solchen Zugriff. Import läuft über `plugins/index.js` (selektiver Named Import in `ChartEngine.js`). Es gibt keinen direkten Plugin→App-Kanal — das Plugin ruft ausschließlich die von `ChartEngine._draw()` gesetzte `onMeasurement`-Funktion auf; der echte App-Callback lebt ausschließlich in `state.anchorMeasurementCallback` und wird nie an Chart.js/das Plugin durchgereicht (`_emitAnchorMeasurements()`). Kein `fwContext`-Zugriff, kein `chart._fwGeometry`. Der Contract (`anchors: [{id,x,y}]` → `[{id,x,y,visible,coordinateSpace}]`) ist ohne Screen-2-Spezialwissen verständlich.

### Klassifikation

BEHALTEN

### Begründung

Erfüllt alle vier Kriterien vollständig: produktlogisch korrekt (die Messung selbst war nie das Problem — nur der Zeitpunkt, zu dem `app.js` ihr vertraute, s. Gate 3/Historie AP-08b3); spec-konform (keine der verbotenen Muster); plattformfähig (vollständig app-neutral, keine App-spezifischen Sonderregeln im Plugin selbst); wartbar (kein Timing-Raten im Plugin, kein globaler State, keine Zweckentfremdung bestehender Plugins). Einzige Abhängigkeit von einer nicht-plugin-eigenen Eigenschaft ist die Registrierungsfrage — das ist Gate 2, nicht Gate 1.

### Folgepflicht

Bereits in AP-08b als offene Doku-Folgepflicht vermerkt (CHART_PLUGIN_ARCHITEKTUR.md §21-Erweiterung als zweites Referenzbeispiel neben FwAnnotationPulsePlugin) — unverändert offen, kein neuer Punkt.

## Gate 2 — No-op-Bootstrap

### Befund

Beantwortung der sieben Prüffragen:

1. **Muss eine App wissen, dass sie ein Plugin bereits im ersten Render mit No-op aktivieren muss?** Ja. `renderJourneyChartOnly()`/vormals `renderJourneyStep()` muss `anchorMeasurement.enabled = true` bereits bei der allerersten Chart-Erstellung (`new Chart()`) setzen, sonst wird `FwAnchorMeasurementPlugin` nie in Chart.js' Plugin-Liste aufgenommen — der Smart-Update-Pfad in `ChartEngine._draw()` reassigned bei bestehendem `chartInstance` nur `.data`/`.options`, nie `.plugins` (Code-Stellen: `ChartEngine.js`, `if (state.chartInstance) {...}`-Zweig). Das ist **empirisch bestätigt**, nicht nur Code-Vermutung: Als der No-op in AP-08b2 versehentlich entfernt wurde, meldete Albert „kein Flug findet statt" — die Behebung (Wiederherstellung des No-op) hat das Problem nachweislich behoben (dokumentiert in `AP-prokrast-08b2_llm-review-kontext.md` Abschnitt 7).
2. **Wäre das als Muster für 22 Apps zumutbar?** Nein, nicht ohne Weiteres. Jede neue App müsste dieses Engine-interne Detail kennen und selbst reproduzieren — ein leises Fehlerbild (kein Crash, kein Log, einfach ein nie feuerndes Feature), das genau die Art „versteckter technischer Schuld" ist, vor der dieser Gate-AP warnt.
3. **Ist der No-op im Code klar dokumentiert?** Ja — ausführlicher Kommentarblock in `renderJourneyChartOnly()` (übernommen aus der ursprünglichen AP-08b2-Fassung), verweist auf die genaue Ursache und die betroffenen ChartEngine-Zeilen. Dokumentation heilt aber nicht das strukturelle Problem, sie macht nur sichtbar, dass ein Workaround vorliegt.
4. **Gibt es eine kleinere, sauberere Engine-seitige Lösung?** Potenziell ja — z. B. könnte `ChartEngine._draw()`'s Update-Pfad `state.chartInstance.config.plugins` (bzw. den internen Chart.js-Plugin-Service) bei jedem Aufruf neu synchronisieren, sodass neu anfordernde Optionen wie `anchorMeasurement` auch nachträglich zur Plugin-Registrierung führen. Das wurde in diesem AP **nicht** umgesetzt, weil es eine echte Änderung an der zentralen Plugin-Registrierungslogik wäre.
5. **Würde eine Engine-seitige Lösung mehr Risiko erzeugen als der No-op?** Ja, kurzfristig — eine Änderung an dieser zentralen Stelle würde alle vier bestehenden Plugin-Nutzer (`FwVerticalLinePlugin`, `FwAnnotationPulsePlugin`, `FwChartTextPlugin`, `FwAnchorMeasurementPlugin`) potenziell betreffen und bräuchte eine eigene Regressionsprüfung über alle Chart-Typen (Line/Bar/Pie) — genau das separate Engine-Gate, das `APP-INTERFACE.md` §4 für Engine-Änderungen fordert und das dieser eng gefasste AP nicht leisten soll (`LineChartStrategy.js` war explizit nur Diagnosequelle, kein Patch-Ziel).
6. **Kann der No-op als temporärer Fix mit Follow-up akzeptiert werden?** Ja, unter der Bedingung expliziter Kennzeichnung als befristetes Risiko — genau das leistet dieses Gate-Protokoll.
7. **Muss er vor AP-08-Abschluss ersetzt werden?** Nicht zwingend vor Abschluss der laufenden Screen-2-Kette, aber zwingend **vor** einer offiziellen Dokumentation von AnchorMeasurement als CHART_PLUGIN_ARCHITEKTUR.md-Referenzmuster für weitere Apps (s. Folgepflicht unten).

### Klassifikation

HÄRTEN

### Begründung

Der No-op erfüllt Kriterium 1 (produktlogisch richtig — er bewirkt das Gewünschte) und Kriterium 2 (spec-konform — keine verbotenen Muster) vollständig, verletzt aber Kriterium 3 (Plattformfähigkeit: „kein App-seitiges Wissen über Engine-Registrierungsdetails", „keine No-op-Magie als Voraussetzung für spätere Engine-Fähigkeit") klar. Er wird deshalb **nicht** als BEHALTEN (unproblematisch) eingestuft, aber auch nicht als ERSETZEN (in diesem eng gefassten AP nicht leistbar, siehe Frage 5) oder ZURÜCKBAUEN (er wird weiterhin gebraucht, sonst bricht die gesamte AnchorMeasurement-Funktionalität).

### Ist das als Blaupause akzeptabel?

Nein — nicht ohne die unten genannte Folgepflicht. Ein stillschweigend als „so macht man das" dokumentiertes No-op-Bootstrap-Muster für 22 Apps wäre genau das Sunk-Cost-Ergebnis, das dieser Gate-AP verhindern soll.

### Folgepflicht

Bevor `FwAnchorMeasurementPlugin`/`chartSettled` offiziell in `CHART_PLUGIN_ARCHITEKTUR.md` als wiederverwendbares Muster für weitere Apps dokumentiert werden (bereits offene Folgepflicht aus AP-08b), muss der Masterfaden explizit entscheiden zwischen: (a) einem eigenen Engine-Design-AP, der die Plugin-Registrierung im Smart-Update-Pfad sauber nachrüstet (mit vollständiger Regressionsprüfung über alle vier Plugins und drei Chart-Typen), oder (b) der bewussten Entscheidung, den No-op-Bootstrap als dokumentierten, offiziellen Teil des AnchorMeasurement-Contracts zu benennen. Diese Entscheidung liegt beim Masterfaden, nicht bei diesem Teil-AP.

## Gate 3 — chartSettled-Contract

### Befund

`chartSettled` (AP-08b3) ist opt-in (`options.chartSettled.enabled === true`), app-neutral benannt (`chartSettled`/`onSettled` sind generische Lifecycle-Begriffe). Chart.js-Wissen (natives `options.animation.onComplete`) bleibt vollständig in `ChartEngine._draw()`; `app.js` erhält über `_emitChartSettled()` ausschließlich einen parameterlosen Funktionsaufruf — kein Chart.js-Objekt, keine Scales, kein DatasetMeta, kein chartArea. Ein eventuell vorhandener bestehender `animation.onComplete` würde komponiert (zuerst aufgerufen), nicht überschrieben — aktuell existiert keiner (per Grep über die gesamte Engine bestätigt, auch in diesem AP erneut geprüft: `LineChartStrategy.js` setzt keine `animation`-Option, `PieChartStrategy.js` setzt nur `{duration, easing}`, keinen `onComplete`). Keine globalen Nebenwirkungen: `chartConfig.options.animation` wird nur verändert, wenn `chartSettled.enabled` für den jeweiligen `renderFromData()`-Aufruf gesetzt ist. Reduced Motion funktioniert ohne Hängenbleiben (synchroner Emit-Pfad direkt nach `update('none')`, da dort kein `animation.onComplete` feuern würde). `chartSettled` ist wiederverwendbar für den zweiten Render-Zyklus — genau das wurde in diesem AP getan (`renderJourneyChartOnly()` akzeptiert jetzt optional dieselbe `chartSettled`-Option). Der Contract ist dokumentierbar ohne Screen-2-Spezialwissen. Es ist ein kleiner Lifecycle-Contract (genau ein Signal), kein Event-Bus (kein Publish/Subscribe, keine Event-Typen).

### Klassifikation

BEHALTEN

### Begründung

Erfüllt alle vier Kriterien vollständig, insbesondere Kriterium 3 (Plattformfähigkeit) — im Unterschied zu Gate 2 hat `chartSettled` **kein** Registrierungsproblem: `.options` wird bei jedem `_draw()`-Aufruf frisch an die bestehende Chart.js-Instanz übergeben, das ist der Mechanismus, an dem der Gate-2-Bug nicht hängt. Kein App-seitiges Wissen über Engine-Internals nötig — eine App setzt `chartSettled.enabled` einfach dann, wenn sie ein Fertig-Signal für einen bestimmten Render-Aufruf braucht, unabhängig davon, ob es der erste oder n-te Aufruf für diesen Container ist.

### Folgepflicht

Bei der CHART_PLUGIN_ARCHITEKTUR.md-Dokumentation (s. Gate 2) sollte explizit festgehalten werden, dass `chartSettled` — anders als `anchorMeasurement` — bei jedem `renderFromData()`-Aufruf unabhängig gesetzt werden kann, ohne Bootstrap-Zwang.

## Gate 4 — App-State-Machine / Produktsequenz

### Befund

Vor diesem AP: Card-State und Chart-State waren in `renderJourneyStep()` gekoppelt (ein Aufruf rendert Karte, Progress-Chip, Button-Text, Live-Region UND Chart in einem Rutsch). `revealCurrentStationPoint()` (Zyklus 1) war bereits sauber getrennt (nur Chart, kein Karten-DOM). Es gab zwei Render-Zyklen pro Klick: (1) `revealCurrentStationPoint()`, chartSettled-gated; (2) `enterNextCard()` → `renderJourneyStep()`, gekoppelt und **ungegated**. Card-Flight startete bereits ausschließlich nach finalem Zielpunkt (Zyklus 1 war korrekt). Die neue Karte X+1 erschien aber NICHT erst nach dem gewünschten Chart-Zustand — sie erschien gleichzeitig mit dem Start des (ungegateten) Chart-Wachstums auf X+1. `renderJourneyStep()` ließ sich sauber in Chart-Teil und Card-Teil trennen (beide Teile griffen bereits auf unabhängige, klar abgegrenzte DOM-/Chart-Bereiche zu). Diese Trennung beschädigt A11y/Live-Region/Fokus nicht — im Gegenteil: Live-Region und Fokus werden ausschließlich im Card-Teil gesetzt, der jetzt strikt NACH dem (jetzt gegateten) Chart-Teil läuft, was die bestehende Reihenfolge eher konsistenter macht als vorher. Timing-Timeouts sind weiterhin nur Sicherheitsnetz (1200ms für beide Zyklen), nicht Primärmechanismus.

### Klassifikation

HÄRTEN (in diesem AP umgesetzt)

### Begründung

Die State-Machine-Grundidee (benannte Zustände, Guards gegen non-idle-Klicks, kein Timeout als Primärmechanismus) war bereits BEHALTEN-würdig. Die zugrunde liegende Kopplung von Karte+Chart in `renderJourneyStep()` verletzte aber Kriterium 1 (produktlogisch richtig — der Nutzer sah den Chart hinter der bereits neuen Karte weiterwachsen) für den zweiten Zyklus. Die Härtung (Aufteilung in `renderJourneyChartOnly()`/`renderJourneyCardOnly()`, gegateter zweiter Zyklus in `enterNextCard()`) ist minimal-invasiv, erfindet keinen neuen Mechanismus und wurde deshalb im selben AP umgesetzt (s. Patch-Entscheidung).

### Folgepflicht

Keine neue — die Härtung ist mit diesem AP abgeschlossen, vorbehaltlich Browser-Bestätigung.

## Gate 5 — Zweiter Render-Zyklus

### Befund

- **Zyklus 1:** `revealCurrentStationPoint(activeStationIndex, handlePointReady)` — rendert Chart für die aktuell sichtbare Station (inkl. sich selbst als pulsierende Vergangenheits-Annotation), `chartSettled` aktiv, `handlePointReady` wird erst nach Chart.js' `animation.onComplete` (oder synchron bei Reduced Motion) aufgerufen. Card/Progress/Button/Live-Region bleiben währenddessen unverändert.
- **Zyklus 2 (vor diesem AP):** `enterNextCard()` erhöhte `activeStationIndex` und rief sofort das gekoppelte `renderJourneyStep(activeStationIndex)` auf — Chart wuchs auf Event X+1 UNGEGATED (kein `chartSettled`), während `renderStationCard()` im selben Aufruf sofort die neue Karte zeigte.
- **Problemstelle:** `enterNextCard()`, konkret der ungegatete `chartEngine2.renderFromData(...)`-Aufruf innerhalb des ursprünglichen `renderJourneyStep()`.
- **Patch möglich ohne Drift:** Ja — `renderJourneyStep()` wurde in `renderJourneyChartOnly(stationIdx, renderOptions)` (Chart, akzeptiert jetzt optional `chartSettled`) und `renderJourneyCardOnly(stationIdx)` (Karte/Chip/Button/Live-Region) aufgeteilt; `renderJourneyStep()` bleibt als ungegateter Kombinator für den „idle"-Screen-2-Ersteintritt erhalten (dort konkurriert keine Karte mit dem Chart-Aufbau, kein Gate nötig). `enterNextCard()` ist jetzt selbst ein kleiner gegateter Zyklus (`next-chart-revealing` → `next-card-entering`), der exakt denselben `chartSettled`-Contract wiederverwendet wie Zyklus 1.

## Patch-Entscheidung

- **Patch im selben AP umgesetzt:** ja
- **Warum Gate bestanden:** alle sieben Bedingungen erfüllt — (1) AnchorMeasurement BEHALTEN, nicht ZURÜCKBAUEN; (2) chartSettled BEHALTEN, nicht ZURÜCKBAUEN; (3) No-op-Bootstrap sauber begründet und als befristetes Risiko mit Folgepflicht markiert (Gate 2); (4) Patch betrifft ausschließlich `app.js`; (5) kein neuer Mechanismus erfunden; (6) verwendet den vorhandenen `chartSettled`-Contract 1:1; (7) keine Engine-Änderung nötig (`ChartEngine.js` in diesem AP unverändert).

## Geänderte Dateien

| Datei | Änderung | Warum im Scope | Nach Write wiedergelesen? |
|---|---|---|---:|
| `Apps/prokrastinations-preis/app.js` | `renderJourneyStep()` aufgeteilt in `renderJourneyChartOnly(stationIdx, renderOptions)` (Chart, optional `chartSettled`) und `renderJourneyCardOnly(stationIdx)` (Karte/Chip/Button/Live-Region); `renderJourneyStep()` bleibt als ungegateter Kombinator für den Screen-2-Ersteintritt; `enterNextCard()` im Klick-Handler zu eigenem gegateten Zyklus (`next-chart-revealing`/`next-card-entering`, eigener 1200ms-Fallback) umgebaut | einzige laut Auftrag primär erwartete Datei für den Gate-5-Patch | ja |
| `docs/steering/patches/AP-prokrast-08b4a_architektur-gate_anchormeasurement_chartsettled_Ergebnis.md` | neu (dieses Protokoll) | Pflicht-Ergebnisdatei | wird nach Write geprüft |

**Nicht geändert (bewusst):** `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` (keine Engine-Änderung nötig — `chartSettled`/`anchorMeasurement` sind bereits generisch genug für den zweiten Render-Zyklus), `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js` (nur Diagnosequelle, wie im Auftrag verlangt), alle vier Plugin-Dateien, `plugins/index.js`, `Apps/prokrastinations-preis/app.css` (keine CSS-Änderung nötig — die Flug-Animation selbst ist unverändert).

## A11y

- **Live-Region:** unverändert im Verhalten — `a11yRegion.textContent` wird ausschließlich in `renderJourneyCardOnly()` gesetzt (vormals im gekoppelten `renderJourneyStep()`), also weiterhin erst beim tatsächlichen Kartenwechsel — jetzt sogar nachweislich NACH dem vollständigen Chart-Settle für X+1, nicht mehr potenziell währenddessen.
- **Fokus:** unverändert — wird erst am Ende von `finishNextCard()` (vormals `enterNextCard()`) gesetzt, also weiterhin nach dem Kartenwechsel.
- **aria-hidden Clone:** unverändert, `flyCardToPoint()` wurde in diesem AP nicht angefasst.
- **Keyboard:** unverändert — `journeyBtn` bleibt während der gesamten (jetzt längeren) Sequenz fokussierbar; `journeyState !== 'idle'`-Guard blockiert weiterhin non-idle-Klicks ohne Button-Disable.
- **Reduced Motion:** bleibt kausal korrekt — auch für Zyklus 2 gilt: `chartSettled` feuert synchron bei `update('none')` (dieselbe ChartEngine-Logik wie Zyklus 1), sodass `renderJourneyCardOnly()` für X+1 auch unter Reduced Motion erst nach dem synchronen Chart-Update aufgerufen wird, nie vorher.
- **Neue Karte erscheint nicht vor dem finalen Zielzustand:** jetzt für beide Zyklen strukturell erzwungen — vorher galt das nur für Zyklus 1.

## Deterministische QA

### app.js Chart.js-Internals-Grep

Befehl: `grep -nE "chart\.scales|getDatasetMeta|getPixelForValue|chartArea|Chart\.getChart" Apps/prokrastinations-preis/app.js`
Ergebnis: keine Treffer
Bewertung: bestanden

### _fwGeometry-Grep

Befehl: `grep -RIn "_fwGeometry" Theme/assets/js/fw-chart-engine Apps/prokrastinations-preis docs/spec docs/steering/patches`
Ergebnis: Treffer nur im Kopfkommentar von `FwAnchorMeasurementPlugin.js` (dokumentiert das Verbot) und in bereits vorhandenen, historisch als Drift markierten Spec-/Protokoll-Dateien
Bewertung: bestanden — keine neue produktive Verwendung

### Kein globales update('none')

`update('none')` wurde in diesem AP nicht neu eingeführt und nicht verändert — unverändert die bestehende Reduced-Motion-Logik aus B1-AP-15b/AP-08b3, ausschließlich für Container mit aktivem `chartSettled` um den synchronen Emit ergänzt (unverändert seit AP-08b3, in diesem AP nicht angefasst).

### Plugin-Scope

- `FwAnchorMeasurementPlugin.js`: unverändert (nicht im Diff)
- `FwAnnotationPulsePlugin.js`: unverändert (nicht im Diff)
- `FwChartTextPlugin.js`: unverändert (nicht im Diff)
- `FwVerticalLinePlugin.js`: unverändert (nicht im Diff)
- `plugins/index.js`: unverändert in diesem AP (aus AP-08b vorhanden, hier nicht erneut geändert)

### Scope-QA

- `git diff --name-status`: `Apps/prokrastinations-preis/app.js` (erlaubt) + bereits aus AP-08b/08b3 bekannte Dateien (`app.css`, `ChartEngine.js`, `plugins/index.js`, `BACKLOG.md`, `session-log.md` — keine davon in diesem AP erneut verändert)
- **verbotene Dateien unverändert:** bestätigt — `APP_SPEC.md`, Drehbuch, `QA_TEST_CASES.md`, `stations.de.json`, `Theme/assets/data/**`, alle vier Plugin-Dateien, `FwDateUtils.js`, `CSVParser.js`, `LineChartStrategy.js` erscheinen in keinem Diff dieses APs

### LineChartStrategy

- **gelesen:** ja, vollständig
- **geändert:** nein
- **animation-Befund:** `getChartConfig()` setzt keinen `animation`-Schlüssel in `options` — bestätigt, dass `chartConfig.options.animation` für Screen-2-Charts standardmäßig `undefined` ist (Chart.js-Default-Animation greift), was die AP-08b3-Analyse (kein bestehender `onComplete` zu komponieren) endgültig bestätigt.

## Datenwahrheit

- Stationsdaten unverändert: bestätigt (`stations.de.json` nicht im Diff)
- Finanzdaten unverändert: bestätigt (`Theme/assets/data/**` nicht im Diff)
- keine Zukunftsdaten: bestätigt
- keine Dummy-Datasets: bestätigt
- keine Future-Line: bestätigt
- keine Prognose: bestätigt

## Regression

- Screen 1: nicht angefasst
- Screen 3: nicht angefasst (`renderS3()` unverändert)
- Screen 4: nicht angefasst (`renderScreen4Chart()`/`revealScreen4()` unverändert)
- RubikonSymbolMarkers: nicht angefasst
- TC-F05 nicht wieder geöffnet: bestätigt, kein Bezug in diesem AP

## Browser-QA

- **durchgeführt:** nein — in dieser Umgebung kein Browser-/Live-Server-Zugriff verfügbar
- **wenn nein: Status maximal GELB?** ja, konsistent mit der Statuslogik dieses APs angewendet
- **offene Browser-Bestätigung:** die vollständige Zielsequenz aus Gate 5 (Klick → Chart wächst auf X → Chart steht still → Punkt X pulst → Karte X/Clone fliegt zu Punkt X und verschwindet → Chart wächst auf X+1 → Chart steht still → erst dann erscheint Karte X+1) ist ausschließlich code-analytisch hergeleitet, nicht empirisch am echten Chart.js-Verhalten im Browser verifiziert — inklusive der neuen Frage, ob der zweite `chartSettled`-Zyklus für X+1 zuverlässig genauso feuert wie der erste.

## Risiken

| Risiko | Kategorie | Blockierend? | Empfehlung |
|---|---|---:|---|
| Browser-Bestätigung der gesamten Zwei-Zyklen-Sequenz steht komplett aus | QA-Lücke | ja für GRÜN, nein für GELB | Albert-Test im lokalen Live-Server ist Pflichtvoraussetzung für ein GRÜN-Protokoll |
| No-op-Bootstrap bleibt ungelöste Plattform-Schwäche (Gate 2: HÄRTEN, nicht BEHALTEN) | technische Schuld, dokumentiert | nein, solange Folgepflicht offen bleibt und sichtbar ist | Masterfaden-Entscheidung vor CHART_PLUGIN_ARCHITEKTUR.md-Dokumentation von AnchorMeasurement als Plattform-Pattern einholen |
| Die vom Nutzer beim ersten Card-to-Point-Flug noch sichtbare (unveränderte) Karte X bleibt während des zweiten Zyklus (Chart wächst auf X+1) weiterhin im DOM sichtbar, bevor sie durch Karte X+1 ersetzt wird — leichte Abweichung von der wörtlichen Formulierung „Karte X … verschwindet" in Gate 5 | Produktnuance, bewusst dokumentiert | nein | im Browser-Test explizit beobachten, ob das gewünscht wirkt oder ob Albert ein zusätzliches Ausblenden der realen Karte X während Zyklus 2 wünscht |
| Zwei unabhängige 1200ms-Fallback-Timer (Zyklus 1 und Zyklus 2) sind weiterhin geschätzte, nicht gemessene Werte | Feinschliff | nein | nach Browser-Test ggf. anpassen |

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

## Entscheidung für Masterfaden

- **Behalten:** AnchorMeasurement v1 (`FwAnchorMeasurementPlugin.js` + Engine-Vermittlung), chartSettled-Contract (Engine-Vermittlung über `animation.onComplete`)
- **Härten (in diesem AP umgesetzt):** App-State-Machine (Chart-/Card-Trennung, zweiter gegateter Zyklus)
- **Härten (Folgepflicht offen, nicht in diesem AP lösbar):** No-op-Bootstrap für die Plugin-Registrierung — Masterfaden-Entscheidung vor Plattform-Dokumentation nötig (eigener Engine-Design-AP oder bewusste Contract-Dokumentation)
- **Ersetzen:** keiner der vier Bausteine
- **Zurückbauen:** keiner der vier Bausteine
- **Nächster empfohlener AP:** Browser-Bestätigung durch Albert (kein neuer AP, sondern Testfeedback zu diesem AP); danach entweder GRÜN-Nachtrag oder AP-prokrast-08c (Abschluss-QA); unabhängig davon: Masterfaden-Entscheidung zur No-op-Bootstrap-Folgepflicht vor jeder CHART_PLUGIN_ARCHITEKTUR.md-Erweiterung
- **ausdrücklich nicht:** Commit, Abschlussritual, AP-07-Nacharbeit, Spec-Sync ohne Masterentscheidung
