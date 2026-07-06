# AP-prokrast-09b — chartSettled Creation-Pfad-Härtung Ergebnis

## Status

GELB

## Kurzbefund

Die in AP-09a als „Option A, klein und sauber baubar" eingestufte Härtung wurde umgesetzt: `ChartEngine.js`s Creation-Zweig (`_draw()`, `else`-Zweig, `requestAnimationFrame`-Callback) reicht `_emitChartSettled(container, state)` jetzt synchron nach, wenn `instantCreate` (Reduced Motion oder `renderMotion.mode === 'instant'`) aktiv ist und `chartSettled.enabled` gesetzt wurde — exakt analog zum bereits bestehenden `instantUpdate`-Nachreichpfad im Update-Zweig. Der Diff beschränkt sich auf ~15 geänderte/neue Zeilen in einer einzigen Datei. Keine der verbotenen Dateien (App, Plugins, Strategies, Spec, Daten) wurde angefasst — per Diff und Grep bestätigt. Kein Doppel-Emit-Risiko: Bei `instantCreate` wird `chartConfig.options.animation` vollständig durch `false` ersetzt, wodurch ein zuvor gesetztes `animation.onComplete` verloren geht — der neue synchrone Emit ist damit der einzige Auslöser in diesem Fall. Bei normaler Animation bleibt `instantCreate` false, der neue Code-Zweig greift nicht, `animation.onComplete` bleibt unverändert zuständig. Status GELB statt GRÜN ausschließlich wegen der Statuslogik-Vorgabe: Der neue Creation-Pfad-Zweig ist im echten `prokrastinations-preis`-Code aktuell nicht ansteuerbar (kein Aufrufer setzt `chartSettled` beim allerersten `renderFromData()`-Aufruf für einen Container) — Verifikation ist daher ausschließlich code-analytisch (Diff, Grep, Syntax-Check, Architektur-QA gegen Spiegelbild des Update-Zweigs), keine Browser-/Runtime-Bestätigung möglich oder nötig für den aktuellen Funktionsumfang.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short` (vor dem Patch): ` M .claude/learning/session-log.md`, `?? docs/steering/patches/AP-prokrast-09a_engine-contract-analyse_Ergebnis.md` — beide bekannt, außerhalb Code-/Plugin-/Spec-Scope
- `git diff --name-status` (vor dem Patch): `M .claude/learning/session-log.md` — keine Code-/Spec-/QA-Änderung
- `git log --oneline -12`: `18c87fb` (`feat(AP-prokrast-08a-08c): ...`) weiterhin oberster Commit — AP-08 committed, lückenlos bis `fe7747d`

Keine unerwarteten Änderungen. Gate-Voraussetzung erfüllt.

## Grundlage aus AP-09a

- **No-op-Bootstrap / AnchorMeasurement:** GELB-Befund — ein Engine-Fix wäre technisch möglich, widerspricht aber dem dokumentierten Muster in `CHART_PLUGIN_ARCHITEKTUR.md` §4 und würde eine Spec-Textänderung (Full-Gate) erfordern. Deshalb bewusst außerhalb von AP-09b.
- **chartSettled Creation-Pfad:** GRÜN-fähige Option A — kleine, additive, rein Engine-interne Härtung ohne Spec-Konflikt (kein `docs/spec`-Text zu `chartSettled` vorhanden).
- **Warum AP-09b nur Folgepflicht 2 baut:** AP-09a hat beide Punkte getrennt bewertet. Nur der chartSettled-Punkt erfüllte alle Kriterien für einen kleinen, in sich abgeschlossenen Engine-Fix ohne Nebenwirkung auf Spec/Plugins/App. Der No-op-Bootstrap-Punkt bleibt explizit eine offene Masterfaden-Entscheidung (AP-prokrast-08-FOLLOWUP-A), nicht Teil dieses APs.

## Gelesene Pflichtquellen

- **AP-09a:** `docs/steering/patches/AP-prokrast-09a_engine-contract-analyse_Ergebnis.md` — vollständig (aus derselben Session, unmittelbar vorheriger AP)
- **ChartEngine.js:** vollständig gelesen vor dem Patch (aus AP-09a übernommen, durch `git diff` bestätigt seit AP-08-Commit unverändert gewesen), gezielt erneut gelesen (Zeilen 460–539, Update- und Creation-Zweig) unmittelbar vor dem Edit
- **ARCHITECTURE STRATEGY PAPER:** in AP-09a bereits gezielt geprüft (Layer-Zuordnung, unidirektionaler Datenfluss) — für diesen AP keine neue Architekturfrage, da der Fix exakt dieselbe Layer-2-Natur hat wie der bereits geprüfte Update-Zweig
- **Rucksack / fwContext:** in AP-09a bereits gezielt geprüft (fwContext-Aufbau, Layer 2 „Der Speicher") — Diff bestätigt: kein `fwContext`-Treffer im neuen Code
- **CHART_PLUGIN_ARCHITEKTUR:** in AP-09a vollständig gegen §4/§20 geprüft — dieser Fix betrifft keinen Chart.js-Plugin-Mechanismus (chartSettled nutzt `animation.onComplete`, kein Plugin), daher keine erneute Volltextlesung nötig
- **APP-INTERFACE:** in AP-09a gezielt geprüft (Pfad 2 `renderFromData`) — Fix ändert keine Signatur, kein neues Optionsfeld, keine neue Verpflichtung
- **app.js:** nicht erneut vollständig gelesen — `git diff --name-only -- Apps/prokrastinations-preis/app.js` bestätigt Unverändertheit; aus AP-09a bereits belegt, dass `chartSettled` ausschließlich in `revealCurrentStationPoint()` und über den `renderOptions`-Parameter von `renderJourneyChartOnly()` (in `enterNextCard()`) gesetzt wird — beides Aufrufe, die immer auf einen bereits existierenden `chartEngine2`-State treffen (Update-Zweig), nie auf den Ersteintritt

## Architektur- und Spec-QA

| Prüffrage | Bestanden? | Beleg |
|---|---:|---|
| Fix bleibt im ChartEngine-/Manager-Layer | ja | Änderung ausschließlich in `ChartEngine.js`, Methode `_draw()`, Creation-Zweig |
| kein Eingriff in Vault/Strategy/Curator/Face | ja | `git diff --name-only` für `strategies/`, `plugins/`, `Theme/assets/data/` und Curator-Dateien (`FwSmartScales.js`, `FwDateUtils.js`) leer |
| fwContext unverändert | ja | `git diff -- ChartEngine.js \| grep fwContext` → keine Treffer |
| kein Motion-/Pixel-/Lifecycle-Signal im Rucksack | ja | Fix schreibt ausschließlich in `chartConfig.options.animation` (Chart.js-Konfiguration) und ruft die bestehende `_emitChartSettled()`-Methode — kein neuer Rucksack-/`fwContext`-Zugriff |
| keine Plugin-Registrierungsänderung | ja | `chartConfig.plugins` wird vom neuen Code nicht berührt; `git diff` zeigt keinen Treffer für `plugins.push`, `Chart.register` oder Ähnliches |
| AnchorMeasurement unangetastet | ja | `git diff -- ChartEngine.js \| grep -i anchorMeasurement` → keine Treffer; `FwAnchorMeasurementPlugin.js` und `plugins/index.js` beide ohne Diff |
| renderFromData bleibt kompatibel | ja | Keine Änderung an der Methode `renderFromData()` selbst, keine neue Optionsvalidierung, keine neue Rückgabe |
| renderMotion default unverändert | ja | `runtimeConfig.renderMotion?.mode === 'instant'`-Bedingung unverändert übernommen, nur in eine Variable (`instantCreate`) gehoben — keine Verhaltensänderung ohne `renderMotion` |
| renderMotion instant bleibt pro-Aufruf | ja | `instantCreate` wird bei jedem `_draw()`-Aufruf frisch aus dem aktuellen `runtimeConfig` berechnet, kein gecachter/globaler Zustand |
| kein App-/Screen-Wissen in ChartEngine | ja | Neuer Code enthält ausschließlich generische Lifecycle-Begriffe (`instantCreate`, `chartSettled`, `_emitChartSettled`) — `grep -nE "prokrast|screen|journey|card|station|rubikon" ChartEngine.js` liefert nur die bereits vor diesem AP vorhandenen AP-Provenienz-Kommentare, keinen neuen funktionalen Treffer |

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`
  - **Änderung:** Im Creation-Zweig von `_draw()` die bisherige Inline-Bedingung `this._prefersReducedMotion() || runtimeConfig.renderMotion?.mode === 'instant'` in die Variable `instantCreate` gehoben; nach `new Chart(canvas, chartConfig)` und den bestehenden Bind-Aufrufen einen neuen Block ergänzt, der bei `instantCreate && runtimeConfig.chartSettled?.enabled` synchron `this._emitChartSettled(container, state)` aufruft.
  - **Warum im Scope:** Genau die in AP-09a als Option A empfohlene, einzige noch offene Härtung — spiegelt 1:1 den bereits bestehenden, bewährten Nachreichpfad im Update-Zweig (Zeilen 476–492).
  - **Risiko:** Sehr gering — der neue Zweig wird nur erreicht, wenn `chartSettled.enabled` UND `instantCreate` beide wahr sind; aktuell existiert kein App-Aufrufer, der diese Kombination beim Ersteintritt herstellt, also keine Verhaltensänderung für den bestehenden `prokrastinations-preis`-Code.
  - **nach Write wiedergelesen:** ja (Zeilen 490–539 vollständig erneut gelesen, Diff geprüft)

## Nicht geändert

- app.js: nicht geändert (Diff leer, nur read-only referenziert für die Update-Pfad-Bestätigung)
- app.css: nicht geändert (nicht gelesen, kein Bezug)
- FwAnchorMeasurementPlugin.js: nicht geändert (Diff leer)
- plugins/index.js: nicht geändert (Diff leer)
- andere Plugins (FwAnnotationPulsePlugin.js, FwChartTextPlugin.js, FwVerticalLinePlugin.js): nicht geändert (Diff für gesamten `plugins/`-Ordner leer)
- LineChartStrategy.js: nicht geändert (Diff für gesamten `strategies/`-Ordner leer)
- andere Strategies (BarChartStrategy.js, PieChartStrategy.js): nicht geändert (siehe oben)
- docs/spec: nicht geändert (Diff für gesamten `docs/spec/`-Ordner leer)
- APP_SPEC: nicht geändert (nicht gelesen, nicht nötig)
- Drehbuch: nicht geändert (nicht gelesen, nicht nötig)
- QA_TEST_CASES: nicht geändert (nicht gelesen, nicht nötig)
- stations.de.json: nicht geändert (nicht gelesen, nicht nötig)
- Theme/assets/data: nicht geändert (nicht berührt)
- package-/lockfiles: nicht geändert (nicht berührt)

## Härtung gegen Pflichtumfang

| Pflicht | Erfüllt? | Beleg |
|---|---:|---|
| chartSettled Creation-Pfad geschlossen | ja | neuer `if (instantCreate && runtimeConfig.chartSettled?.enabled) { this._emitChartSettled(container, state); }`-Block nach `new Chart(...)` |
| chartSettled Update-Pfad intakt | ja | Zeilen 468–492 (Update-Zweig) im Diff unverändert |
| kein Doppel-Emit bei normaler Animation | ja | Bei `instantCreate === false` bleibt der neue Block unerreicht; `animation.onComplete` (falls gesetzt) bleibt einziger Auslöser |
| Reduced Motion synchroner Settled-Emit | ja | `instantCreate` wird u. a. aus `this._prefersReducedMotion()` gebildet |
| renderMotion.mode='instant' synchroner Settled-Emit | ja | `instantCreate` wird u. a. aus `runtimeConfig.renderMotion?.mode === 'instant'` gebildet |
| _emitChartSettled wiederverwendet | ja | Kein neuer Methodenname, Aufruf identisch zu Zeile 491 (Update-Zweig) |
| keine neue API | ja | Keine neue Methode, kein neues Optionsfeld, keine neue Exportfläche |
| kein Spec-Konflikt | ja | `chartSettled` ist in keinem `docs/spec/`-Dokument beschrieben; der Fix betrifft keinen Plugin-Mechanismus (§4/§20 aus CHART_PLUGIN_ARCHITEKTUR.md bleiben unberührt) |

## Deterministische Checks

- `node --check Theme/assets/js/fw-chart-engine/core/ChartEngine.js`: bestanden (Exit 0, keine Ausgabe außer Erfolg)
- `git diff --name-status`: `M .claude/learning/session-log.md`, `M Theme/assets/js/fw-chart-engine/core/ChartEngine.js` — genau die erwartete Datei plus die bekannte Session-Meta-Datei
- Diff `ChartEngine.js`: 15 geänderte/neue Zeilen, ausschließlich im Creation-Zweig von `_draw()` (Zeilen 511–537)
- Grep `chartSettled`: kommt weiterhin in Optionsvalidierung (Z. 219–231), State-Aufbau (Z. 270/271/287/295), Update-Zweig (Z. 431/490) und jetzt zusätzlich im Creation-Zweig (Z. 516/529/531/534) vor
- Grep `_emitChartSettled`: vier Fundstellen — Definition (Z. 570), Update-Zweig-Aufruf (Z. 491), Creation-Zweig-Aufruf (Z. 535, neu), ein Kommentartreffer (Z. 533)
- Grep `fwContext` im Diff: keine Treffer
- Grep `_fwGeometry`: einzige Fundstelle bleibt der Verbots-Kommentar in `FwAnchorMeasurementPlugin.js` (unverändert seit AP-08b) — keine neue produktive Verwendung
- Scope-Grep verbotene Dateien: `git diff --name-only` für `Apps/prokrastinations-preis/app.js`, `Theme/assets/js/fw-chart-engine/plugins/`, `Theme/assets/js/fw-chart-engine/strategies/`, `docs/spec/` — alle vier leer

## Browser-/Runtime-Einordnung

- **Aktuelle Prokrastinationspreis-App steuert den neuen Creation-Pfad an:** nein
- **Falls nein: warum nicht:** `app.js` setzt `chartSettled.enabled` ausschließlich in `revealCurrentStationPoint()` und im `renderOptions`-Parameter von `renderJourneyChartOnly()` (genutzt durch `enterNextCard()`) — beide Aufrufe erfolgen immer für einen bereits über `renderJourneyStep()`/`renderJourneyChartOnly()` (ohne `chartSettled`) initial erzeugten `chartEngine2`-State, treffen also strukturell immer auf den Update-Zweig, nie auf den allerersten (Creation-)Aufruf für diesen Container.
- **Verifikation deshalb:** code-analytisch / Syntax (`node --check`) / Diff / Architektur-QA (Spiegelbild-Vergleich mit dem bereits produktiv genutzten und in AP-08b3/08b4a/08c empirisch bestätigten Update-Zweig-Muster)
- Kein Browser-GRÜN behauptet — dieser AP macht keine Aussage über ein tatsächliches Browserverhalten, da der neue Zweig im aktuellen Produktcode nicht erreichbar ist.

## Risiken

| Risiko | Kategorie | Blockierend? | Empfehlung |
|---|---|---:|---|
| Neuer Creation-Pfad-Zweig ist im echten App-Code nicht ansteuerbar, daher nie empirisch/browserseitig getestet | QA-Lücke, strukturell unvermeidbar | nein | Falls eine künftige App/Screen `chartSettled` beim Ersteintritt mit `instant`/Reduced Motion nutzen will, sollte deren erster Verifikationsdurchlauf gezielt genau diesen Fall im Browser prüfen |
| `instantCreate`-Variable dupliziert Namensmuster von `instantUpdate` im Update-Zweig, aber beide bleiben lokale Variablen in getrennten Code-Zweigen — kein gemeinsamer State, keine Verwechslungsgefahr im Code selbst | Stil, kein Funktionsrisiko | nein | keine |

## Offene Punkte

- **Code:** keine — die in AP-09a als baubar eingestufte Härtung ist vollständig umgesetzt.
- **Architektur:** No-op-Bootstrap/AnchorMeasurement bleibt offene Masterfaden-Entscheidung (unverändert aus AP-09a, hier nicht bearbeitet).
- **Plattform-Doku:** `chartSettled` ist weiterhin nicht in `CHART_PLUGIN_ARCHITEKTUR.md` dokumentiert (bereits aus AP-08b/08b4a/09a bekannte Folgepflicht). Eine künftige Doku-Erweiterung (§21) sollte jetzt beide Pfade (Update UND Creation) korrekt und symmetrisch beschreiben.
- **Test:** neuer Creation-Pfad-Zweig ist strukturell nicht browserseitig verifizierbar, solange kein Aufrufer ihn ansteuert — kein aktueller Blocker, aber als Kontext für künftige Nutzung festgehalten.
- **Backlog:** `AP-prokrast-08-FOLLOWUP-B` (chartSettled Creation-Lücke) kann nach diesem AP als erledigt markiert werden. `AP-prokrast-08-FOLLOWUP-A` (No-op-Bootstrap) bleibt unverändert offen.

## Empfehlung

- **nächster interner AP:** AP-prokrast-09c — separater read-only Abschluss-QA-AP / Claims-vs-Files (GELB-Grund [Creation-Pfad nicht browserseitig testbar] dabei explizit protokollieren, wie in diesem Protokoll bereits vorweggenommen)
- **ausdrücklich nicht:** Commit, Abschlussritual, No-op-Bootstrap-Bau, AnchorMeasurement-Änderung, Spec-Migration, Screen-2/3/4-Arbeit
