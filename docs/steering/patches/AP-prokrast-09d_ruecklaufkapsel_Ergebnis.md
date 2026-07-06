# AP-prokrast-09d — Rücklaufkapsel an Masterfaden Ergebnis

## Status

GELB

## Kurzbefund

AP-09 ist rücklauffähig, aber nicht vollständig GRÜN. Von den zwei AP-08-Folgepflichten wurde eine (chartSettled Creation-Pfad) geschlossen und durch einen separaten, unabhängigen Abschluss-QA-AP (AP-09c) bestätigt; die andere (No-op-Bootstrap/AnchorMeasurement) wurde bewusst nicht code-seitig angefasst, weil AP-09a einen dokumentierten Spec-Konflikt (`CHART_PLUGIN_ARCHITEKTUR.md` §4) belegt hat, der eine reine Codelösung ausschließt. AP-09c hat den Rücklauf an den Masterfaden freigegeben, ohne Blocker. Kein künstlicher Test-Hack wurde gebaut — der neue chartSettled-Creation-Zweig bleibt im aktuellen Produktcode unangesteuert und damit nur code-analytisch, nicht browserseitig verifiziert; das ist gemäß expliziter Nutzerentscheidung so vorgesehen und wird erst beim ersten echten App-Fall nachgeholt. Kein Commit, kein Abschlussritual in diesem AP.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short`: ` M .claude/learning/session-log.md`, ` M Theme/assets/js/fw-chart-engine/core/ChartEngine.js`, `?? docs/steering/patches/AP-prokrast-09a_engine-contract-analyse_Ergebnis.md`, `?? docs/steering/patches/AP-prokrast-09b_chartsettled-creation-pfad-haertung_Ergebnis.md`, `?? docs/steering/patches/AP-prokrast-09c_abschluss-qa_architektur_claims-vs-files_Ergebnis.md`
- `git diff --name-status`: `M .claude/learning/session-log.md`, `M Theme/assets/js/fw-chart-engine/core/ChartEngine.js`
- `git log --oneline -12`: `18c87fb` (`feat(AP-prokrast-08a-08c): ...`) weiterhin oberster Commit — AP-08 committed, lückenlos bis `fe7747d`

Deckt sich exakt mit der im Auftrag erwarteten Beispiel-Liste. Keine unerwarteten Änderungen. Gate-Voraussetzung erfüllt.

## Grundlage

- **AP-09a:** Status GELB. Zwei AP-08-Folgepflichten getrennt bewertet: chartSettled Creation-Pfad als kleiner, spec-konformer ChartEngine.js-only-Fix eingestuft; No-op-Bootstrap/AnchorMeasurement als technisch möglicher, aber spec-widersprüchlicher Fix eingestuft (Konflikt mit dokumentiertem Muster in `CHART_PLUGIN_ARCHITEKTUR.md` §4), daher als Masterfaden-Entscheidung zurückgegeben statt gebaut.
- **AP-09b:** Status GELB. Hat ausschließlich den chartSettled-Creation-Pfad-Fix umgesetzt — 15/16 Zeilen Diff in `ChartEngine.js`, nur im Creation-Zweig von `_draw()`. No-op-Bootstrap/AnchorMeasurement bewusst nicht angefasst. GELB, weil der neue Zweig im aktuellen Produktcode nicht browserseitig ansteuerbar ist.
- **AP-09c:** Status GELB. Read-only Abschluss-QA — alle Claims aus AP-09a/09b gegen die realen Dateien geprüft, alle bestätigt. Scope-QA, Architektur-QA und Regressions-QA bestanden. Keine Blocker. Rücklauf an den Masterfaden ausdrücklich freigegeben.

## Konsistenzcheck

| Punkt | Ergebnis | Beleg |
|---|---|---|
| AP-09a gelesen | ja | Vollständig, Status GELB, Entscheidungsbefund-Tabelle bestätigt |
| AP-09b gelesen | ja | Vollständig, Status GELB, Diff-Angaben bestätigt |
| AP-09c gelesen | ja | Vollständig, Status GELB, Claims-vs-Files-Tabelle bestätigt |
| QA-Freigabe AP-09c | ja | AP-09c „Freigabe": „Rücklauf an Masterfaden freigegeben: ja" |
| Blocker | keine | AP-09c „Blocker": „Keine." |
| ChartEngine-Diff | unverändert seit AP-09c | `git diff --stat` zeigt weiterhin genau 1 Datei, 16 Einfügungen/1 Löschung — deckt sich mit dem in AP-09b/09c dokumentierten Diff |
| Verbotene Dateien unverändert | ja | `git diff --name-only` für `app.js`, `plugins/**`, `strategies/**`, `docs/spec/**`, `APP_SPEC.md`, Drehbuch, `QA_TEST_CASES.md`, `stations.de.json` — alle leer |

## Rücklauf an den Masterfaden

### Haupt-AP

AP-prokrast-09 — Engine-Contract-Härtung nach AP-08

### Status

GELB

### Abgenommen?

teilweise

### QA-Freigabe

- separater Abschluss-QA-AP durchgeführt: ja
- QA-Protokoll: `docs/steering/patches/AP-prokrast-09c_abschluss-qa_architektur_claims-vs-files_Ergebnis.md`
- QA-Urteil: Claims aus AP-09a/09b vollständig gegen reale Dateien bestätigt, Scope sauber, keine Regression, Rücklauf freigegeben, Status GELB
- Rücklauf freigegeben: ja

### Ursprüngliches Ziel

Die zwei AP-08-Folgepflichten No-op-Bootstrap / AnchorMeasurement und chartSettled Creation-Pfad schließen oder bewusst entscheiden.

### Tatsächlicher Endstand

AP-09 hat Folgepflicht 2 geschlossen: `chartSettled` feuert jetzt auch im Creation-Pfad synchron bei Reduced Motion oder `renderMotion.mode='instant'` — analog zum bereits bestehenden, produktiv genutzten Update-Pfad-Mechanismus, ohne neue API, ohne neues Optionsfeld.

AP-09 hat Folgepflicht 1 nicht gebaut: No-op-Bootstrap / AnchorMeasurement bleibt unverändert, weil AP-09a belegt hat, dass ein technischer Fix (unconditional Plugin-Push) ohne begleitende Spec-Entscheidung zu Spec-Drift gegenüber dem dokumentierten Muster in `CHART_PLUGIN_ARCHITEKTUR.md` §4 führen würde.

AP-09c hat bestätigt: Alle Claims halten gegen reale Dateien stand, keine verbotenen Dateien geändert, Rücklauf an Masterfaden freigegeben.

### Interne Unter-APs

- **AP-prokrast-09a:** Engine-Contract-Analyse nach AP-08 — GELB
- **AP-prokrast-09b:** chartSettled Creation-Pfad-Härtung — GELB
- **AP-prokrast-09c:** Abschluss-QA Architektur / Claims-vs-Files — GELB, Rücklauf freigegeben
- **AP-prokrast-09d:** Rücklaufkapsel an Masterfaden — dieses Protokoll

### Geänderte Dateien

- Datei: `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`
  - Änderung: Im Creation-Zweig von `_draw()` synchroner `_emitChartSettled(container, state)`-Nachreichpfad bei `instantCreate && runtimeConfig.chartSettled?.enabled`, analog zum bestehenden Update-Zweig-Muster (AP-09b)
  - Risiko: gering — Zweig wird von aktuellem `prokrastinations-preis`-Code nicht angesteuert, keine Verhaltensänderung für bestehende Funktionalität
  - nach Write wiedergelesen: ja (AP-09b und erneut unabhängig in AP-09c)

Keine weitere Code-, Plugin-, Strategy-, Spec-, App- oder Datendatei wurde in AP-09a–09d geändert.

### Ergebnisprotokolle

- `docs/steering/patches/AP-prokrast-09a_engine-contract-analyse_Ergebnis.md`
- `docs/steering/patches/AP-prokrast-09b_chartsettled-creation-pfad-haertung_Ergebnis.md`
- `docs/steering/patches/AP-prokrast-09c_abschluss-qa_architektur_claims-vs-files_Ergebnis.md`
- `docs/steering/patches/AP-prokrast-09d_ruecklaufkapsel_Ergebnis.md`

### Nicht geändert

- APP_SPEC.md: nicht geändert
- Drehbuch: nicht geändert
- QA_TEST_CASES.md: nicht geändert
- stations.de.json: nicht geändert
- LineChartStrategy.js: nicht geändert
- fwContext/Rucksack: nicht erweitert, keine neuen Motion-/Pixel-/Lifecycle-Signale
- Screen 2 Motion: unverändert (kein `app.js`-Diff in der gesamten AP-09-Kette)
- Screen 4: nicht geändert
- RubikonSymbolMarkers: nicht geändert
- Theme-Bridge / Fonts: nicht geändert, nicht Teil dieses APs
- docs/spec: nicht geändert

### Neue Datei-Wahrheit

- **AnchorMeasurement:** unverändert; aktueller App-seitiger No-op-Bootstrap bleibt bestehen; offene Masterentscheidung.
- **chartSettled:** Creation-Pfad gehärtet; Update-Pfad intakt; kein neues API-Feld; payloadloses Lifecycle-Signal, wiederverwendet die bestehende `_emitChartSettled()`-Methode.
- **renderMotion:** default unverändert; `mode:'instant'` bleibt pro-Aufruf wirksam; kein `fwContext`-Eintrag.
- **ChartEngine:** nur Creation-Zweig von `_draw()` geändert; synchroner `_emitChartSettled()`-Aufruf bei `instantCreate && chartSettled.enabled`.
- **app.js:** unverändert; kein Chart.js-Internals-Zugriff; aktueller Produktcode steuert den neuen Creation-Zweig nicht an (kein Aufrufer setzt `chartSettled` beim allerersten `renderFromData()`-Aufruf für einen Container).
- **offene Punkte:** No-op-Bootstrap-Masterentscheidung, chartSettled-Plattform-Doku, chartSettled-Creation-Browser-Test beim ersten echten Anwendungsfall.

### Pflichtumfang-Erfüllung

| Pflicht | Erfüllt? | Beleg |
|---|---:|---|
| No-op-Bootstrap entschieden/gehärtet | nein | Nicht gebaut; als Masterentscheidung zurückgegeben (AP-09a Entscheidungsbefund, AP-09b „Grundlage aus AP-09a") |
| AnchorMeasurement bleibt app-neutral | ja | Unverändert seit AP-08b, Diff über gesamte AP-09-Kette leer (AP-09c Scope-QA) |
| AnchorMeasurement bleibt opt-in | ja | `chart.options.plugins.fwAnchorMeasurement.enabled`-Gate unverändert |
| chartSettled Creation-Pfad entschieden/gehärtet | ja | AP-09b-Diff, AP-09c Claims-vs-Files bestätigt |
| chartSettled Update-Pfad intakt | ja | Zeilen 468–492 in `ChartEngine.js` nicht im Diff (AP-09c) |
| renderMotion default unverändert | ja | AP-09c Architektur-QA-Tabelle |
| renderMotion instant pro-Aufruf | ja | `instantCreate` wird bei jedem `_draw()`-Aufruf frisch aus `runtimeConfig` berechnet (AP-09c) |
| kein fwContext-Missbrauch | ja | Keine neue `fwContext`-Fundstelle im Diff (AP-09c) |
| LineChartStrategy unverändert | ja | Diff für `strategies/**` leer (AP-09c, erneut bestätigt in AP-09d) |
| keine Chart.js-Internals in app.js | ja | `app.js`-Diff leer über gesamte Kette |
| kein chart._fwGeometry | ja | einzige Fundstelle bleibt Verbots-Kommentar in `FwAnchorMeasurementPlugin.js`, unverändert seit AP-08b |
| Screen 2 nicht regressiert | ja | Kein `app.js`-Diff, Card-to-Point-Sequenz aus AP-08 unangetastet |
| Screen 4/AP-07 nicht regressiert | ja | Kein Diff in `FwChartTextPlugin.js`/Screen-4-Code |

### Abweichung vom ursprünglichen Plan

gering

- **Welche Annahme des Masterfadens war falsch oder unvollständig?** Die ursprüngliche Annahme (implizit aus AP-08b4a übernommen), dass beide Folgepflichten gleichartig als kleine Engine-Härtungen behandelbar wären, war unvollständig — AP-09a hat gezeigt, dass nur eine der beiden Folgepflichten (chartSettled) diese Eigenschaft tatsächlich hat. Die andere (No-op-Bootstrap) ist strukturell eine Spec-Entscheidung, keine reine Code-Härtung.
- **Was ist jetzt anders als erwartet?** AP-09 liefert nur eine der zwei erwarteten Härtungen vollständig ab. Das war in AP-08b4a bereits als Risiko benannt („Masterfaden-Entscheidung nötig"), wird hier aber mit konkretem Spec-Zitat neu belegt und bestätigt.
- **Welcher geplante Folge-AP passt nicht mehr unverändert?** Eine mögliche ursprüngliche Erwartung „AP-09 schließt beide Folgepflichten und AP-10 macht Plattform-Doku" passt nicht mehr unverändert — die Plattform-Doku (`CHART_PLUGIN_ARCHITEKTUR.md` §21) kann jetzt nicht vollständig geschrieben werden, solange die No-op-Bootstrap-Frage offen ist.

### Regressionsrisiko

Niedrig

Begründung: Der einzige Code-Diff der gesamten AP-09-Kette liegt in einem Codepfad, der vom aktuellen `prokrastinations-preis`-Produktcode nicht erreicht wird (kein Aufrufer setzt `chartSettled` beim Ersteintritt). Der bestehende, produktiv genutzte Update-Pfad ist unverändert (kein Diff). Alle App-, Plugin-, Strategy-, Spec- und Datendateien sind über die gesamte Kette hinweg diff-frei. Das einzige verbleibende Risiko ist rein hypothetisch: eine künftige App/Screen, die `chartSettled` beim Ersteintritt mit `instant`/Reduced Motion nutzt, sollte diesen konkreten Fall beim ersten echten Einsatz browserseitig verifizieren.

### Offene Punkte

- **No-op-Bootstrap / AnchorMeasurement:** Masterentscheidung zwischen A) eigener Engine+Spec-AP zur Plattform-Härtung (ändert `ChartEngine.js` und `CHART_PLUGIN_ARCHITEKTUR.md` §4/§20 gemeinsam, volle Regressionsprüfung über alle vier Plugins + drei Chart-Typen) oder B) No-op-Bootstrap bewusst als offizieller AnchorMeasurement-Contract-Bestandteil in `CHART_PLUGIN_ARCHITEKTUR.md` §21 dokumentieren (kein Code ändert sich).
- **chartSettled Plattform-Doku:** `chartSettled` ist weiterhin nicht in `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md` dokumentiert; eine spätere Plattform-Doku sollte jetzt Update- UND Creation-Pfad korrekt und symmetrisch beschreiben.
- **chartSettled Creation Browser-Test:** Kein aktueller Produktpfad steuert den neuen Creation-Zweig an; sollte beim ersten echten App-Fall, der `chartSettled` beim Initial-Render mit `instant`/Reduced Motion nutzt, gezielt im Browser geprüft werden.
- **Screen-3 Timing-Reveal:** unverändert offen, falls im Masterplan vorgesehen (aus PROJECT-STATUS.md „Naechster Schritt" bekannt).
- **CTA-Copy:** kein Bezug in AP-09, unverändert offen, falls im Masterplan vorgesehen.
- **Screenreader-Praxistest:** unverändert offen aus AP-07/AP-08-Kette, kein Bezug in AP-09.
- **DS-012/DS-013 Theme-Bridge / Font-Neumessung:** unverändert offen (BACKLOG DS-FOLLOWUP-07/08), kein Bezug in AP-09.
- **Code:** kein offener Code-Punkt aus AP-09 selbst.
- **UX:** kein UX-Punkt aus AP-09 (rein Engine-intern, kein sichtbares Verhalten geändert).
- **CSS:** kein CSS-Bezug in AP-09.
- **Daten:** kein Daten-Bezug in AP-09.
- **Test:** chartSettled-Creation-Pfad bleibt strukturell nicht browserseitig testbar, bis ein realer Aufrufer existiert.
- **Mobile:** kein Mobile-spezifischer Bezug in AP-09.
- **Reduced Motion:** durch den neuen Creation-Pfad-Zweig jetzt auch für einen bisher unexercierten Fall abgedeckt (code-analytisch), kein aktuelles Testrisiko für den bestehenden Funktionsumfang.
- **Backlog:** `AP-prokrast-08-FOLLOWUP-B` (chartSettled Creation-Lücke) kann als erledigt markiert werden. `AP-prokrast-08-FOLLOWUP-A` (No-op-Bootstrap) bleibt unverändert offen, jetzt mit der in AP-09a präzisierten Spec-Konflikt-Begründung.

### Empfehlung des Nebenfadens

- **Nächster sinnvoller Haupt-AP:** Masterfaden soll entscheiden, ob zuerst der offene No-op-Bootstrap/AnchorMeasurement-Plattformpunkt behandelt wird (Option A oder B aus AP-09a) oder ob zu den bereits bekannten Produktfolgepunkten (Screen-3-Timing-Reveal, DS-012/DS-013 Theme-Bridge-Fonts) zurückgekehrt wird.
- **Warum:** Beide offenen Stränge sind unabhängig voneinander entscheidbar und blockieren sich nicht gegenseitig — die Reihenfolge ist eine reine Priorisierungsfrage des Masterfadens, keine technische Zwangsfolge.
- **Ausdrücklich nicht nächster AP:** Kein automatischer No-op-Bootstrap-Bau aus AP-09 heraus. Wenn No-op priorisiert wird, dann als eigener Engine+Spec-AP mit Full-Gate (mehrere Dateien inkl. `docs/spec/`, volle Regressionsprüfung). Wenn nicht priorisiert, dann Bootstrap bewusst als offener Plattform-Doku-/Contract-Punkt weiterführen. Kein direkter Screen-3- oder Screen-4-Bau ohne Masterauswertung dieser Rücklaufkapsel. Kein Commit vor Masterentscheidung. Kein Abschlussritual aus dem Nebenfaden.

### Anschlussbedingung

Der nächste Haupt-AP darf erst erstellt werden, wenn dieser Rücklauf im Masterfaden ausgewertet wurde.
