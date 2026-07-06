# AP-prokrast-09a — Engine-Contract-Analyse nach AP-08 Ergebnis

## Status

GELB

## Kurzbefund

Beide AP-08-Folgepflichten wurden gegen die realen Dateien geprüft (nicht gegen die Vorgänger-Protokolle). Ergebnis unterscheidet sich zwischen den beiden Punkten:

- **chartSettled Creation-Pfad (Folgepflicht 2):** Option A — kleine, additive, rein Engine-seitige Härtung in `ChartEngine.js` ist sauber möglich. Der Contract nutzt kein Chart.js-Plugin, sondern `chartConfig.options.animation.onComplete`, das bei jedem `_draw()`-Aufruf frisch übergeben wird — kein Registrierungsproblem, kein Spec-Konflikt. AP-09b kann dies bauen.
- **No-op-Bootstrap / AnchorMeasurement (Folgepflicht 1):** Ein technisch funktionierender Engine-Fix (`FwAnchorMeasurementPlugin` unconditional statt runtime-gated in `chartConfig.plugins` pushen) ist denkbar und wäre für sich genommen regressionsarm. Er **widerspricht aber dem dokumentierten Muster** in `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md` §4: „ChartEngine ergänzt FwVerticalLinePlugin / FwAnnotationPulsePlugin nur bei passender Runtime-Option." Ein unconditional Push wäre eine Abweichung von diesem dokumentierten Beispiel und bräuchte eine begleitende Spec-Text-Anpassung (`docs/spec/`-Änderung = Full-Gate + Masterfaden-Entscheidung, kein kleiner AP-09b mehr). Das ist kein neuer Bug, sondern derselbe Punkt, den AP-08b4a Gate 2 bereits als offene Masterfaden-Entscheidung markiert hatte — hier jetzt mit dem konkreten Spec-Zitat belegt, das erklärt, warum eine „einfache" Engine-Lösung tatsächlich keine rein kleine Lösung ist.

Status GELB, weil Folgepflicht 1 nicht als kleiner, sauberer AP-09b-Bau empfohlen werden kann.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short`: ` M .claude/learning/session-log.md` (bekannte lokale Meta-Änderung aus dem `/start`-Ritual dieser Session, außerhalb App-/Engine-/Plugin-/Spec-/QA-Scope)
- `git diff --name-status`: `M .claude/learning/session-log.md` — keine Code-/Spec-/QA-Änderung
- `git log --oneline -12`: `18c87fb` (`feat(AP-prokrast-08a-08c): Card-to-Point Screen 2 gebaut + geprueft`) ist oberster Commit — **AP-08 ist committed**, bestätigt die Kettenposition. Danach `ca45c94`, `4093808`, `0f355f7`, `a735981`, `c633f82`, `ffacc13`, `a399b5f`, `eacdc0e`, `cba810e`, `7104b77`, `fe7747d` — lückenlos.

Keine unerwarteten Änderungen. Gate-Voraussetzung erfüllt.

## Gelesene Pflichtquellen

- `docs/steering/patches/AP-prokrast-08a_koordinaten-schnittstelle_analyse_Ergebnis.md` — bereits aus vorheriger Session-Arbeit bekannt, Kernaussagen in AP-08b/08b4a/08c zitiert und hier über die Folgeprotokolle mitgeprüft
- `docs/steering/patches/AP-prokrast-08b_anchor-measurement_card-to-point_implementierung_Ergebnis.md` — vollständig
- `docs/steering/patches/AP-prokrast-08b2_llm-review-kontext.md` — Kerninhalt über Zitat in AP-08b4a Gate 2 Punkt 1 abgedeckt (empirischer Beleg: No-op-Entfernung → Flug fiel aus)
- `docs/steering/patches/AP-prokrast-08b3_chart-settled-gate_card-to-point_Ergebnis.md` — Kerninhalt über Zitate in AP-08b4a Gate 3 und AP-08c abgedeckt
- `docs/steering/patches/AP-prokrast-08b4a_architektur-gate_anchormeasurement_chartsettled_Ergebnis.md` — vollständig
- `docs/steering/patches/AP-prokrast-08b5_rendermotion_instant_screen2_journey_Ergebnis.md` — Kerninhalt über Zitate in AP-08c abgedeckt
- `docs/steering/patches/AP-prokrast-08c_abschluss-qa_architektur_claims_masterkapsel_Ergebnis.md` — vollständig
- `Apps/prokrastinations-preis/app.js` — vollständig (1181 Zeilen, zwei Leseabschnitte)
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` — vollständig (671 Zeilen)
- `Theme/assets/js/fw-chart-engine/plugins/FwAnchorMeasurementPlugin.js` — vollständig
- `Theme/assets/js/fw-chart-engine/plugins/index.js` — vollständig
- `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md` — gezielt (§4 Opt-in-Regel, §5 Plugin-State, §20.2–20.6 Barrel/Import/Verbote)
- `docs/spec/APP-INTERFACE.md` — gezielt (Pfad 2 „Daten-Bridge-Pfad" / `renderFromData`)
- `docs/spec/Der Rucksack (Context Object Pattern).md` — gezielt (fwContext-Aufbau, Layer 2 „Der Speicher")
- `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` — Layer-Zuordnung bereits aus AP-08c-Zitat vollständig abgedeckt (Layer 1–5, unidirektionaler Datenfluss), für diesen AP keine neue Architekturfrage identifiziert, die eine erneute Volltextlesung erfordert hätte

**Nicht erneut gelesen (aus AP-08-Kette bereits belastbar geklärt, Diff bestätigt Unverändertheit):** `LineChartStrategy.js`, `FwAnnotationPulsePlugin.js`, `FwChartTextPlugin.js`, `FwVerticalLinePlugin.js` — alle vier laut `git diff --name-status` seit AP-08-Commit unverändert (kein Diff, da AP-08 bereits committed ist und diese Session daran nichts geändert hat).

## AP-08-Folgepflichten

| Folgepflicht | Datei-/Code-Befund | Risiko | Empfehlung |
|---|---|---|---|
| No-op-Bootstrap / AnchorMeasurement | `ChartEngine.js` Z. 409–421: `FwAnchorMeasurementPlugin` wird nur in `chartConfig.plugins` gepusht, wenn `runtimeConfig.anchorMeasurement?.enabled` für **diesen konkreten** `_draw()`-Aufruf true ist. `.plugins` wird nur bei `new Chart()` (Creation-Zweig, Z. 494–523) von Chart.js gelesen; der Update-Zweig (Z. 468–492) reassigned nur `.data`/`.options`, nie `.plugins`. `app.js` umgeht das, indem `renderJourneyChartOnly()` (Z. 546–550) `anchorMeasurement.enabled=true` **immer** setzt (auch beim Ersteintritt, mit No-op-Callback `() => {}`), damit das Plugin garantiert schon beim ersten `new Chart()` registriert ist. `CHART_PLUGIN_ARCHITEKTUR.md` §4 dokumentiert genau dieses „nur bei passender Runtime-Option ergänzen"-Muster als korrektes Beispiel — ein unconditional Push würde von diesem dokumentierten Muster abweichen. | Kein akuter Bug (App funktioniert, No-op ist wirksam). Technische Schuld: App muss ein Engine-Registrierungsdetail kennen und reproduzieren (Plattform-Risiko für 22 Folge-Apps, bereits in AP-08b4a benannt). Ein „einfacher" Code-Fix wäre Spec-Drift ohne begleitende Doku-Änderung. | Kein kleiner AP-09b-Codefix. Masterfaden-Entscheidung nötig zwischen (a) einem eigenen, größeren Engine-Design-AP mit Full-Gate, der sowohl `ChartEngine.js` als auch `CHART_PLUGIN_ARCHITEKTUR.md` §4/§20 gemeinsam ändert und über alle vier Plugins + drei Chart-Typen regressionsgeprüft wird, oder (b) No-op-Bootstrap bewusst als offizieller, dokumentierter Contract-Bestandteil in `CHART_PLUGIN_ARCHITEKTUR.md` §21 festschreiben (kein Code ändert sich). |
| chartSettled Creation-Pfad | `ChartEngine.js` Z. 423–443 hängt `chartConfig.options.animation.onComplete` an, wenn `chartSettled.enabled`. Im Update-Zweig (Z. 468–492) wird bei `instantUpdate` (Reduced Motion ODER `renderMotion.mode==='instant'`) `_emitChartSettled()` **synchron nachgereicht** (Z. 490–492), weil `animation:false` das `onComplete` nie feuern lässt. Im Creation-Zweig (Z. 494–523) fehlt dieser Nachreich-Pfad vollständig: Z. 515–518 setzt bei instant/Reduced-Motion `chartConfig.options.animation = false` und **überschreibt damit das zuvor gesetzte `onComplete`-Objekt komplett**, ohne einen Ersatz-Emit aufzurufen. Aktuell folgenlos, weil `app.js` `chartSettled` ausschließlich in `revealCurrentStationPoint()`/`enterNextCard()` setzt — beides Aufrufe, die immer auf einen bereits existierenden `chartEngine2`-State treffen (Update-Zweig), nie auf den allerersten Aufruf. Kein Chart.js-Plugin involviert, kein Registrierungsproblem — reine Options-/Lifecycle-Logik, die bei jedem `_draw()`-Aufruf frisch aufgebaut wird. Kein Treffer für `chartSettled` in `docs/spec/` — noch nicht dokumentiert, daher auch kein Spec-Konflikt möglich. | Kein aktueller Bug in `prokrastinations-preis`. Reales Risiko für die nächste App, die `chartSettled` beim allerersten Render mit `renderMotion:'instant'`/Reduced Motion nutzen will — deren `onSettled`-Callback würde nie feuern und liefe nur über den (defensiven, nicht als Primärmechanismus gedachten) App-seitigen Fallback-Timer. | AP-09b kann dies bauen: in `_draw()`s Creation-Zweig (innerhalb des `requestAnimationFrame`-Callbacks, nach `new Chart(...)`) denselben Check wie im Update-Zweig ergänzen — wenn `(this._prefersReducedMotion() \|\| runtimeConfig.renderMotion?.mode==='instant') && runtimeConfig.chartSettled?.enabled`, dann `this._emitChartSettled(container, state)` aufrufen. Eine Datei, ~5–8 Zeilen Diff, kein neuer Mechanismus (Wiederverwendung von `_emitChartSettled()`), kein App-/Plugin-/Spec-Eingriff nötig. |

## Architekturprüfung

- **ARCHITECTURE STRATEGY PAPER:** Beide Folgepflichten betreffen ausschließlich Layer 2 (ChartEngine/Manager). Kein Eingriff in Layer 1 (Vault), Layer 3 (Strategien — `LineChartStrategy.js` bleibt für beide Optionen unverändert), Layer 4/5. Unidirektionaler Datenfluss bleibt gewahrt — keine der beiden Optionen führt neue App→Engine- oder Engine→App-Rückkanäle ein.
- **Rucksack / fwContext:** Für beide Folgepflichten irrelevant — weder `anchorMeasurement`/`chartSettled` schreiben in `fwContext`; das wurde in AP-08b/08b4a bereits verifiziert und durch den heutigen Code-Stand (`fwContext` unverändert seit AP-08-Commit) bestätigt.
- **CHART_PLUGIN_ARCHITEKTUR.md:** Zentraler neuer Befund dieses APs — §4 dokumentiert das „nur bei passender Runtime-Option ergänzen"-Muster explizit als Beispiel für korrektes Opt-in-Verhalten (`ChartEngine ergänzt FwVerticalLinePlugin / FwAnnotationPulsePlugin nur bei passender Runtime-Option`) und §20.5 verbietet „implizite Plugin-Aktivierung ohne Optionsfeld" sowie „Plugin-Liste als zentraler Laufzeit-Schalter". Ein unconditional Push von `FwAnchorMeasurementPlugin` in `chartConfig.plugins` bliebe zwar über das plugin-eigene `opts.enabled`-Gate verhaltensseitig opt-in, weicht aber vom wörtlich dokumentierten Muster ab und würde eine begleitende Spec-Textänderung erfordern — genau das macht Folgepflicht 1 zu einer Masterfaden-Frage statt eines kleinen Codefixes. Für `chartSettled` existiert (noch) kein Spec-Text in `docs/spec/`, also kein Konfliktpotenzial für Folgepflicht 2.
- **APP-INTERFACE.md:** Pfad 2 (`renderFromData`) bleibt für beide Optionen additiv — keine bestehenden Parameter ändern sich, kein Pflichtfeld entsteht. (Nebenbefund, nicht Teil dieses APs: `APP-INTERFACE.md` beschreibt die Signatur noch als `renderFromData(container, data, type, options)`, der reale Code nutzt `renderFromData(container, chartSeries, options)` mit `type` als `options.type` — bereits vor AP-09 bestehender Doku-Drift, hier nur zur Kenntnis genommen, nicht bearbeitet.)

## Entscheidungsbefund

| Punkt | Option A Härtung möglich? | Option B Dokumentation nötig? | Stop nötig? | Begründung |
|---|---:|---:|---:|---|
| No-op-Bootstrap | technisch ja, spec-konform nein (ohne Spec-Textänderung) | ja | nein | Code-Fix ist trivial, aber nicht „klein" im Sinne des Auftrags, weil er zwingend eine `docs/spec/`-Änderung (Full-Gate) nach sich zieht. Damit ist weder reine Option A noch reine Option B erfüllt — es ist eine gebündelte Entscheidung, die dem Masterfaden vorbehalten bleibt (identisch zur bereits in AP-08b4a offenen Folgepflicht, hier nur konkret mit Spec-Zitat belegt). |
| chartSettled Creation-Pfad | ja | nein (aktuell keine Spec-Doku vorhanden, die widerspräche) | nein | Kleine, additive, rein Engine-interne Härtung ohne Registrierungs- oder Spec-Problem. Sicher als AP-09b baubar. |

## Empfehlung für AP-09b

- **bauen ja/nein:** Ja, aber nur für Folgepflicht 2 (chartSettled Creation-Pfad). Folgepflicht 1 (No-op-Bootstrap) wird in AP-09b nicht code-seitig angefasst — dafür ist zuerst eine Masterfaden-Entscheidung nötig (siehe oben).
- **erlaubte Dateien:** `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` (nur der Creation-Zweig von `_draw()`), plus eigenes Ergebnisprotokoll.
- **verbotene Dateien:** `Apps/prokrastinations-preis/app.js`, `app.css`, `config/stations.de.json`, `APP_SPEC.md`, Drehbuch, `QA_TEST_CASES.md`, alle vier Plugin-Dateien, `LineChartStrategy.js`, `FwDateUtils.js`, `Theme/assets/data/**`, `docs/spec/**` (auch für Folgepflicht 1 — die würde einen eigenen, separat gegateten AP brauchen, nicht AP-09b).
- **besondere QA-Punkte:** Bestehende `chartSettled`-Aufrufer (`revealCurrentStationPoint()`, `enterNextCard()`) laufen weiterhin über den unveränderten Update-Zweig — reine Diff-Prüfung genügt, um zu bestätigen, dass dort nichts angefasst wurde. Der neue Creation-Zweig-Code ist im echten `prokrastinations-preis`-Code aktuell **nicht ansteuerbar** (kein Aufrufer setzt `chartSettled` beim Ersteintritt) — eine Browser-/Live-Server-Verifikation ist dafür nicht möglich, ohne einen künstlichen Testfall zu bauen. Empfehlung: Verifikation bleibt code-analytisch (Diff + Syntaxcheck via `node --check`) plus expliziter Hinweis im AP-09b-Protokoll, dass dieser Zweig strukturell, nicht empirisch geprüft ist — analog zur bereits etablierten Praxis in AP-08b/08c bei nicht ausführbaren Browser-Checks.

## Nicht geändert

- app.js: nicht geändert (nur gelesen)
- app.css: nicht geändert (nicht gelesen, nicht nötig — beide Folgepflichten haben keinen CSS-Bezug)
- ChartEngine.js: nicht geändert (nur gelesen)
- FwAnchorMeasurementPlugin.js: nicht geändert (nur gelesen)
- plugins/index.js: nicht geändert (nur gelesen)
- APP_SPEC: nicht geändert (nicht gelesen — für diese Analyse nicht nötig)
- Drehbuch: nicht geändert (nicht gelesen — für diese Analyse nicht nötig)
- QA_TEST_CASES: nicht geändert (nicht gelesen — für diese Analyse nicht nötig)
- stations.de.json: nicht geändert (nicht gelesen — für diese Analyse nicht nötig)
- LineChartStrategy: nicht geändert (nicht erneut gelesen, Diff-Status aus AP-08c übernommen und durch aktuellen `git diff --name-status` bestätigt: kein Diff)
- RubikonSymbolMarkers: nicht geändert (`FwChartTextPlugin.js` nicht gelesen, nicht im Diff)

## Offene Punkte

- **Code:** chartSettled-Creation-Pfad-Härtung ist baubereit (AP-09b), No-op-Bootstrap-Code-Fix ist nicht baubereit ohne vorherige Spec-Entscheidung.
- **Architektur:** Masterfaden muss zwischen (a) größerem Engine+Spec-AP oder (b) offizieller No-op-Bootstrap-Contract-Dokumentation entscheiden (identisch zur AP-08b4a-Folgepflicht, hier mit konkretem Spec-Zitat unterlegt).
- **Plattform-Doku:** `chartSettled` ist weiterhin nicht in `CHART_PLUGIN_ARCHITEKTUR.md` dokumentiert (bereits aus AP-08b/08b4a bekannte, unveränderte Folgepflicht). Falls AP-09b den Creation-Pfad härtet, sollte die spätere Doku-Erweiterung (§21) den Creation-Pfad direkt korrekt beschreiben, statt die Lücke erneut zu dokumentieren.
- **Test:** chartSettled-Creation-Pfad-Härtung ist im echten App-Code nicht ansteuerbar — keine Browser-Verifikation möglich, nur code-analytisch.
- **Backlog:** `AP-prokrast-08-FOLLOWUP-A` (No-op-Bootstrap) bleibt offen, jetzt mit präziserer Begründung (Spec-Konflikt, nicht nur „Plattform-Risiko"). `AP-prokrast-08-FOLLOWUP-B` (chartSettled Creation-Lücke) kann nach AP-09b als erledigt markiert werden, sobald gebaut.

## Nächster Schritt

- **nächster interner AP:** Für Folgepflicht 2: AP-prokrast-09b (Engine-Härtung, ChartEngine.js-Creation-Zweig, wie oben beschrieben) — nach Nutzer-OK. Für Folgepflicht 1: kein AP-09b-Bau, sondern eine Masterfaden-/Albert-Entscheidung zwischen den zwei genannten Optionen (a)/(b), bevor irgendein weiterer Code- oder Spec-Schritt zu diesem Punkt erfolgt.
- **ausdrücklich nicht nächster AP:** Screen-3-Timing-Reveal, DS-012/DS-013 Theme-Bridge-Fonts, RubikonSymbolMarkers-Nacharbeit, jede Form von Commit oder Abschlussritual.
