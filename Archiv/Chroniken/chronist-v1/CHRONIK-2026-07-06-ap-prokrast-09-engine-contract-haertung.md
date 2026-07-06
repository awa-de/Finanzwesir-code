---
chronik_id: CHRONIK-2026-07-06-ap-prokrast-09-engine-contract-haertung
datum: 2026-07-06
projekt: finanzwesir-2
thema: ap-prokrast-09-engine-contract-haertung
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, konzept-vs-umsetzung, abbruchregel, annahme-verworfen]
---

# Chronik: AP-prokrast-09 — Engine-Contract-Härtung nach AP-08

**Hauptgegenstand:** In diesem Faden wurde AP-prokrast-09 operativ geführt. Gegenstand waren zwei AP-08-Folgepflichten: `chartSettled` im Creation-Pfad und No-op-Bootstrap / `AnchorMeasurement`. Der Faden endete mit einem GELB-Rücklauf an den Masterfaden, einer geschlossenen `chartSettled`-Härtung und einer offenen Masterentscheidung zu No-op-Bootstrap / `AnchorMeasurement`.

## Ausgangslage

Der Nutzer stellte den fachlichen AP-09-Prompt und den taktischen Startprompt bereit und fragte, was zu tun sei und wie beide Prompts zusammenwirkten. ChatGPT las beide Prompts als Paar: Der taktische Startprompt regelte Arbeitsweise, Anamnese, kleine APs, Datei-Wahrheit, Werkzeugwahl und Stop-Regeln; der Fachprompt definierte AP-prokrast-09 als Engine-/Plattform-Härtung nach AP-08. Als Ziel wurden zwei Folgepflichten herausgearbeitet: No-op-Bootstrap / `AnchorMeasurement` und `chartSettled` im Creation-Pfad.

## Chronologischer Verlauf

### Einordnung der Prompts und erster Unter-AP

Zunächst wurde geklärt, dass AP-09 kein Produktfeature-AP war. Screen 2, Screen 3, Screen 4, RubikonSymbolMarkers, Daten und Spezifikationen sollten nicht frei bearbeitet werden. Der nächste Schritt wurde als `AP-prokrast-09a — Engine-Contract-Analyse nach AP-08` bestimmt.

Der Nutzer verlangte dafür einen Claude-Prompt als downloadbare Markdown-Datei und als kopierbaren Prompt. ChatGPT erzeugte `claude_prompt_AP-prokrast-09a_engine-contract-analyse.md`. Die erste kopierbare Ausgabe enthielt verschachtelte Codeboxen, die auf der Website nicht als eine einzige kopierbare Box funktionierten. Der Nutzer korrigierte dies. ChatGPT gab daraufhin denselben Prompt in einer einzigen äußeren Markdown-Codebox aus.

### AP-09a und die Trennung der beiden Folgepflichten

Nach Ausführung von AP-09a brachte der Nutzer den Rücklauf ein. AP-09a stand auf GELB. Der Befund trennte die zwei Folgepflichten: `chartSettled Creation-Pfad` wurde als kleiner, additiver `ChartEngine.js`-Fix eingestuft. No-op-Bootstrap / `AnchorMeasurement` wurde nicht als kleiner Codefix eingestuft, weil ein technisch möglicher unconditional Plugin-Push mit `CHART_PLUGIN_ARCHITEKTUR.md` §4 kollidiert hätte.

ChatGPT wertete den GELB-Status als anschlussfähig aus. Es wurden vier Optionen unterschieden: nur `chartSettled` bauen, AP-09 stoppen und an den Masterfaden zurückgeben, AP-09b zu einem Engine+Spec-AP erweitern oder No-op-Bootstrap offiziell dokumentieren. Als weiterer Weg wurde festgelegt, AP-09b nur für `chartSettled` zu schneiden und No-op-Bootstrap als Masterentscheidung stehen zu lassen.

### Erklärung und Bau-Prompt für `chartSettled`

Der Nutzer fragte, worum es bei `chartSettled` gehe. ChatGPT erklärte `chartSettled` als Engine-Lifecycle-Signal: Die App solle wissen, wann der Chart im finalen Zustand sei. Der konkrete Mangel lag im Creation-Pfad bei `renderMotion.mode='instant'` oder Reduced Motion: Bei `animation=false` feuerte kein `animation.onComplete`, sodass ein `onSettled()`-Callback beim ersten Render ausfallen konnte.

Der Nutzer entschied, `chartSettled` zu bauen, verlangte aber Spec-Konformität mit `ARCHITECTURE STRATEGY PAPER VX.md`, `Der Rucksack (Context Object Pattern).md` und den weiteren maßgeblichen Dateien. ChatGPT erzeugte den Prompt `claude_prompt_AP-prokrast-09b_chartsettled-creation-pfad-haertung.md`. Dieser Prompt grenzte No-op-Bootstrap, `AnchorMeasurement`, Plugins, `app.js`, `docs/spec/**`, Strategies und Daten ausdrücklich aus und erlaubte nur `ChartEngine.js` plus Ergebnisprotokoll.

### Prüfung der aktualisierten `ChartEngine.js`

Der Nutzer stellte die aktualisierte `ChartEngine.js` bereit und fragte, was die `chartSettled`-Funktion nun bewirke. ChatGPT erläuterte anhand des Codes, dass die Engine nun im Creation-Zweig `instantCreate` berechne und nach `new Chart(canvas, chartConfig)` bei `instantCreate && runtimeConfig.chartSettled?.enabled` `_emitChartSettled(container, state)` aufrufe. Als praktisches Beispiel wurde eine künftige App beschrieben, die beim ersten Render mit `renderMotion: { mode: 'instant' }` einen Callout, Card-Flight oder Button erst nach `onSettled()` auslösen wolle. Vorher hätte dieser Callback in diesem Fall nicht ausgelöst; danach wurde er synchron nachgereicht.

### AP-09b-Rücklauf und Entscheidung gegen Test-Hack

Der Nutzer brachte den AP-09b-Rücklauf ein. AP-09b stand auf GELB. Der Codefix war gebaut, `node --check` bestanden, der Diff beschränkte sich auf `ChartEngine.js`, und No-op-Bootstrap / `AnchorMeasurement` blieb unangetastet. Der GELB-Grund war, dass der neue Creation-Pfad im aktuellen `prokrastinations-preis`-Produktcode nicht browserseitig ansteuerbar war.

Daraufhin fragte der Nutzer, ob testweise etwas gebaut werden solle oder ob die Prüfung besser auf den ersten echten App-Fall verschoben werde. ChatGPT trennte Produkt-QA und Plattform-QA. Es wurde festgehalten, dass die Prokrastinations-App kein geeigneter Kandidat war, weil sie `chartSettled` erst nutzt, wenn der Chart bereits existiert, also im Update-Pfad. Ein künstlicher Trigger in `app.js`, ein Testcontainer oder eine Debug-Route hätten Produktcode verändert, ohne einen echten Produktfall abzubilden. Der Nutzer entschied sich für Option A: notieren und später im echten App-Fall testen.

### AP-09c und Schärfung des No-op-Bootstrap-Punkts

ChatGPT erzeugte den AP-09c-Prompt als read-only Abschluss-QA. Dieser Prompt sollte AP-09a- und AP-09b-Claims gegen reale Dateien prüfen, keine Reparatur erlauben und die Nutzerentscheidung gegen Test-Hacks aufnehmen. Nachdem der Nutzer nach No-op-Bootstrap fragte, erklärte ChatGPT den offenen Punkt erneut: `FwAnchorMeasurementPlugin` müsse beim ersten `new Chart()` registriert sein; die Prokrastinations-App sorge dafür über einen No-op-Bootstrap. Ein unconditional Plugin-Push wäre technisch möglich, würde aber eine Spec-Entscheidung erfordern. Der Punkt blieb daher eine Masterfaden-Entscheidung.

Der Nutzer fragte, ob sich dadurch der AP-09c-Prompt ändere. ChatGPT verneinte eine substanzielle Änderung, schlug aber eine Zusatzklarstellung vor: AP-09c solle No-op-Bootstrap nicht lösen, nicht dokumentieren, nicht in `docs/spec` patchen und nicht als Codefix nachziehen. Anschließend verlangte der Nutzer die neueste Version von AP-09c. ChatGPT erzeugte `claude_prompt_AP-prokrast-09c_abschluss-qa_architektur_claims-vs-files_v2.md`, in dem diese Zusatzklarstellung fest eingebaut war.

### AP-09c-Rücklauf und AP-09d

Der Nutzer brachte AP-09c ein. AP-09c stand auf GELB, gab aber den Rücklauf an den Masterfaden frei. Alle Claims aus AP-09a und AP-09b hielten gegen die realen Dateien stand. Der Diff war wie behauptet, keine verbotene Datei war geändert, der Update-Pfad war intakt, und der Browser-/Runtime-Test blieb aus dem benannten Grund aus.

ChatGPT bestätigte, dass GELB unter diesen Bedingungen akzeptiert werden konnte: `chartSettled` war geschlossen, No-op-Bootstrap blieb offen als Masterentscheidung, und der spätere Browser-Test war notiert. Danach bat der Nutzer um den AP-09d-Prompt für die Rücklaufkapsel. ChatGPT erzeugte `claude_prompt_AP-prokrast-09d_ruecklaufkapsel.md`. Dieser Prompt definierte AP-09d als reinen Übergabe-AP ohne Reparatur, Commit oder Abschlussritual.

### Rücklaufkapsel und Abschluss des Nebenfadens

Nach Ausführung von AP-09d brachte der Nutzer die Rücklaufkapsel ein. Der Status blieb GELB, der Rücklauf an den Masterfaden war freigegeben. Die Kapsel hielt fest: AP-09 war teilweise abgenommen; `chartSettled Creation-Pfad` war geschlossen und durch AP-09c bestätigt; No-op-Bootstrap / `AnchorMeasurement` blieb offen als Masterentscheidung; der Browser-Test für den neuen `chartSettled`-Creation-Zweig sollte beim ersten echten App-Fall erfolgen.

Der Nutzer fragte, ob noch relevante Anmerkungen für das Master-LLM nötig seien. ChatGPT ergänzte vier strategische Punkte: `AP-prokrast-08-FOLLOWUP-B` könne als erledigt betrachtet werden; `AP-prokrast-08-FOLLOWUP-A` bleibe offen; Plattform-Doku zu `chartSettled` solle nicht blind als vollständiger Doku-AP gestartet werden, solange No-op-Bootstrap offen sei; der offene No-op-Punkt blockiere Produktfolge-APs technisch nicht. Danach erklärte der Nutzer AP-09 als abgeschlossen und teilte mit, dass Claude das Abschlussritual ausführe. ChatGPT fasste den Endstand für das Abschlussritual knapp zusammen.

## Wendepunkte

Der erste Wendepunkt trat nach AP-09a ein: Die anfängliche Möglichkeit, beide AP-08-Folgepflichten als kleine Engine-Härtungen zu behandeln, wurde durch den Spec-Konflikt bei No-op-Bootstrap / `AnchorMeasurement` ersetzt. Dadurch wurde AP-09b auf `chartSettled` begrenzt.

Der zweite Wendepunkt trat nach AP-09b ein: Der neue Creation-Pfad war gebaut, aber nicht im aktuellen Produkt browserseitig ansteuerbar. Der Nutzer fragte nach einem Test-Hack. Es wurde entschieden, keinen künstlichen Produktpfad zu bauen und den Browser-Test auf den ersten echten App-Fall zu verschieben.

Der dritte Wendepunkt trat bei AP-09c ein: No-op-Bootstrap wurde nicht nur als offener Punkt, sondern ausdrücklich als Nicht-Reparaturauftrag für AP-09c formuliert. Damit wurde verhindert, dass die QA den offenen Masterpunkt als Fixbedarf behandelt.

## Entscheidungen und Festlegungen

- AP-09 wurde in Unter-APs geführt: AP-09a Analyse, AP-09b Härtung, AP-09c read-only QA, AP-09d Rücklaufkapsel. Status am Ende: gültig.
- AP-09b durfte nur `chartSettled Creation-Pfad` in `ChartEngine.js` bauen. Status am Ende: gültig.
- No-op-Bootstrap / `AnchorMeasurement` wurde nicht gebaut. Es blieb eine Masterentscheidung zwischen Engine+Spec-AP und offizieller Contract-Dokumentation. Status am Ende: offen.
- Es wurde kein künstlicher Test-Hack in der Prokrastinations-App gebaut. Der Browser-Test wurde auf einen späteren echten App-Fall verschoben. Status am Ende: gültig.
- AP-09 wurde insgesamt als GELB und teilweise abgenommen zurückgegeben. Status am Ende: gültig.

## Irrwege, Schleifen und verworfene Ansätze

Ein verworfener Ansatz war, No-op-Bootstrap als kleinen Codefix in AP-09b mitzunehmen. AP-09a zeigte, dass dies einen Spec-Konflikt erzeugt hätte. Daraus entstand die Trennung zwischen `chartSettled`-Fix und Masterentscheidung.

Ein zweiter verworfener Ansatz war, die Prokrastinations-App künstlich so zu verändern, dass der neue Creation-Pfad browserseitig ausgelöst wird. Dieser Weg wurde nicht weiterverfolgt, weil er Produktcode für einen Plattformtest verändert hätte.

Eine kleine Schleife entstand bei der Prompt-Ausgabe zu AP-09a: Die kopierbare Fassung war zunächst durch innere Codeboxen nicht als eine einzige Box nutzbar. Danach wurde die Formatregel für spätere Prompt-Ausgaben beachtet.

## Erzeugte Artefakte

- Markdown-Prompt `claude_prompt_AP-prokrast-09a_engine-contract-analyse.md` – Zweck: Analyse-AP für die zwei AP-08-Folgepflichten – Status am Ende: final.
- Markdown-Prompt `claude_prompt_AP-prokrast-09b_chartsettled-creation-pfad-haertung.md` – Zweck: enger Bau-Prompt für `chartSettled` Creation-Pfad – Status am Ende: final.
- Markdown-Prompt `claude_prompt_AP-prokrast-09c_abschluss-qa_architektur_claims-vs-files_v2.md` – Zweck: read-only Abschluss-QA mit No-op-Klarstellung – Status am Ende: final.
- Markdown-Prompt `claude_prompt_AP-prokrast-09d_ruecklaufkapsel.md` – Zweck: Rücklaufkapsel an den Masterfaden – Status am Ende: final.
- Ergebnisprotokolle AP-09a, AP-09b, AP-09c und AP-09d in `docs/steering/patches/` – Zweck: Datei-Wahrheit und Rücklaufstand dokumentieren – Status am Ende: final.
- Codeänderung in `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` – Zweck: `_emitChartSettled()` im Creation-Pfad bei `instantCreate && chartSettled.enabled` synchron nachreichen – Status am Ende: QA-bestätigt.

## Sachliche Erkenntnisse

Gesicherter Stand: `chartSettled` ist ein payloadloses Engine-Lifecycle-Signal. Es wurde im Creation-Pfad für Reduced Motion und `renderMotion.mode='instant'` gehärtet. Der Update-Pfad blieb unverändert.

Gesicherter Stand: No-op-Bootstrap / `AnchorMeasurement` betrifft die Chart.js-Plugin-Registrierung beim ersten `new Chart()`. Ein technischer Fix ohne Spec-Entscheidung hätte mit dem dokumentierten Muster in `CHART_PLUGIN_ARCHITEKTUR.md` §4 kollidiert.

Gesicherter Stand: Die Prokrastinations-App steuert den neuen `chartSettled`-Creation-Pfad aktuell nicht an. Die bestehende Nutzung läuft über den Update-Pfad.

Offene Frage: Der Masterfaden muss entscheiden, ob No-op-Bootstrap / `AnchorMeasurement` durch einen Engine+Spec-AP gehärtet oder als offizieller Contract dokumentiert wird.

## Offene Punkte am Ende

- No-op-Bootstrap / `AnchorMeasurement`: Masterentscheidung zwischen Engine+Spec-AP und offizieller Contract-Dokumentation.
- `chartSettled` Plattform-Doku: später Update- und Creation-Pfad korrekt dokumentieren.
- Browser-Test für den neuen `chartSettled`-Creation-Pfad: später beim ersten echten App-Fall mit Initial-Render plus instant/Reduced Motion.
- Screen-3 Timing-Reveal, CTA-Copy, Screenreader-Praxistest und DS-012/DS-013 Theme-Bridge / Font-Neumessung blieben außerhalb von AP-09.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Der Faden zeigte eine wiederholte Trennung zwischen Plattformhärtung und Produktverhalten. Ein technisch kleiner Eingriff wurde nicht automatisch als prozessual kleiner Eingriff behandelt, sobald er eine Spec-Entscheidung berührte. Ebenfalls vormerken: Der Nutzer stoppte einen möglichen Test-Hack zugunsten einer späteren Prüfung im echten Anwendungsfall. Eine Formatkorrektur bei der Prompt-Ausgabe führte zur erneuten Bestätigung der Regel, kopierbare Prompts in einer einzigen äußeren Codebox auszugeben.

## Bewusst ausgelassen

Ausgelassen wurden Höflichkeitsformeln, wiederholte Bestätigungen ohne neuen Stand, vollständige Prompt-Texte, lange Protokolltabellen, Tool-Ausgaben ohne eigene Zustandsänderung sowie operative Einzelheiten der Dateierzeugung, soweit sie den weiteren Verlauf nicht veränderten.
