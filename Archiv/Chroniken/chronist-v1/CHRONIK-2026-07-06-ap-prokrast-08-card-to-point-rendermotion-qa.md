---
chronik_id: CHRONIK-2026-07-06-ap-prokrast-08-card-to-point-rendermotion-qa
datum: 2026-07-06
projekt: ap-prokrast
thema: card-to-point-rendermotion-qa
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: teilweise
quellenlage: mit-anhaengen
schlagworte: [scope-drift, richtungswechsel, durchbruch, externe-abhaengigkeit, konzept-vs-umsetzung, tooling-problem, annahme-verworfen]
---

# Chronik: AP-prokrast-08 Card-to-Point, RenderMotion und Abschluss-QA

**Hauptgegenstand:** Der Faden behandelte die Fortsetzung von AP-prokrast-08 nach der Koordinaten-Schnittstellenanalyse. Aus einer zunächst technischen Frage zur Card-to-Point-Animation entstand eine Sequenz aus Architektur-Gates, UX-Klärungen, Engine-Contracts und abschließender QA gegen die verbindlichen Spezifikationen.

## Ausgangslage

Der Faden begann mit dem Stand aus AP-prokrast-08a. Als Ergebnis war Variante B gewählt worden: keine bestehende Schnittstelle meldete Chart-Pixelkoordinaten an `app.js`, `FwChartTextPlugin.js` schloss eine „Card-to-Point-API“ für V1 aus, und `app.js` las keine Chart.js-Internals. Der saubere Weg wurde als kleiner opt-in Callback-Pfad über App/Engine-Grenzen beschrieben, der nur ein fertiges `{x,y}`-Zahlenpaar liefert. Außerdem war bestätigt, dass alle sieben Stationen aus `stations.de.json` passende Datenpunkte im CSV-Fenster hatten.

Der Nutzer fragte, wie das responsiv auf Screen S, M und L umgesetzt werden solle. Im weiteren Verlauf wurden mehrere Claude-Ergebnisse, Gate-Protokolle und Rückmeldungen eingefügt; sie dienten als Material, nicht als direkte Teilnehmer des Fadens.

## Chronologischer Verlauf

### Von AP-08a zum ersten Architektur-Gate

Zunächst wurde die weitere Umsetzung als kleine Engine-/Plugin-Schnittstelle gedacht. Später brachte der Nutzer eine Claude-Auswertung ein, nach der drei bisherige Fixes als Grundlage gelten sollten: Sequenzkorrektur, Plugin-Registrierung und `chartSettled` für den ersten Render-Zyklus. ChatGPT formulierte zunächst, diese bisherigen Fixes würden als erledigte Grundlage akzeptiert.

Der Nutzer widersprach dieser Formulierung. Er stellte die Frage, warum die Fixes akzeptiert würden: wegen Qualität, Spec-Konformität oder nur wegen Sunk-Cost-Druck. Er verwies darauf, dass die Lösung Blaupause für 22 weitere Apps werden solle. Dadurch änderte sich die Arbeitsrichtung. Aus einem Folgepatch wurde ein Architektur- und Schulden-Gate. ChatGPT formulierte daraufhin, kein Fix dürfe automatisch übernommen werden; jeder Fix müsse als `BEHALTEN`, `HÄRTEN`, `ERSETZEN` oder `ZURÜCKBAUEN` klassifiziert werden.

Aus dieser Klärung entstand der Prompt `claude_prompt_AP-prokrast-08b4a_architektur-gate_anchormeasurement_chartsettled.md`. Er schnitt AP-prokrast-08b4a als Architektur-Gate vor weiterem Patch. Der Prompt verlangte Prüfung von `AnchorMeasurement`, No-op-Bootstrap, `chartSettled`, State Machine und zweitem Render-Zyklus. Er enthielt Schreib-Scope, verbotene Dateien, Gate-Fragen, deterministische Greps und ein Ergebnisprotokoll.

### AP-08b4a: Gate, State-Machine-Härtung und No-op-Folgepflicht

Claude meldete AP-prokrast-08b4a mit Status GELB zurück. `AnchorMeasurement` wurde als `BEHALTEN`, `chartSettled` als `BEHALTEN`, der No-op-Bootstrap als `HÄRTEN` mit Folgepflicht und die State Machine als `HÄRTEN` eingestuft. Der Patch wurde umgesetzt: `renderJourneyStep()` wurde in `renderJourneyChartOnly()` und `renderJourneyCardOnly()` aufgeteilt; `enterNextCard()` wurde als eigener gegateter Zyklus umgesetzt und wiederverwendete den vorhandenen `chartSettled`-Contract. `ChartEngine.js` blieb unverändert.

Ein Detail aus AP-08b4a war, dass die im Prompt referenzierte AP-08b4-Analysedatei in Claudes Arbeitsumgebung nicht existierte. Der Befund zum ungegateten zweiten Render-Zyklus wurde daher direkt am realen `app.js` bestätigt. Die No-op-Bootstrap-Frage blieb offen: Der Bootstrap löste das aktuelle Plugin-Registrierungsproblem, durfte aber nicht still als Plattform-Muster für weitere Apps gelten.

ChatGPT ordnete den nächsten Schritt zunächst als Browser-Bestätigung ein. Der Nutzer testete und meldete, dass die Funktion grundsätzlich klappte, aber noch nicht der gewünschten Wahrnehmung entsprach.

### UX-Wendepunkt: Chart.js-Defaultanimation als kognitives Problem

Der Nutzer beschrieb danach eine neue Beobachtung: Der Graph wachse nicht linear, sondern baue sich mit einer Animation immer wieder auf. Optisch wirke es, als sei der Graph vollständig und das rechte Ende schwinge nach oben, bis es seine finale Position erreicht habe. Der Nutzer hatte die CSS-Variable `--fw-card-to-point-flight-duration` von `450ms` auf `1350ms` gesetzt; `app.js` las den Wert bereits dynamisch über `getFlightDurationMs()`. Diese Änderung machte sichtbar, was im Ablauf geschah.

Daraufhin wurde die Frage nicht mehr nur technisch, sondern kognitionspsychologisch betrachtet. Der Nutzer schlug eine ruhigere Sequenz vor: Nach Klick sollte der Graph auf X+1 wachsen, stillstehen, danach bei altem Event X ein pulsierender Kreis erscheinen, die Karte X dorthin fliegen, der Puls in einen stillen Kringel übergehen und erst danach Karte X+1 erscheinen.

ChatGPT beurteilte diese Richtung als ruhiger, warnte aber vor der semantischen Überlagerung, wenn der Chart bereits X+1 zeigt, während die sichtbare Karte noch X erklärt. Die Lösung wurde als Prinzip formuliert: Chart-Bewegung und Card-Flight sollten nicht gleichzeitig konkurrieren; es sollte genau einen Fokuspunkt geben. Unter Bezug auf Tufte wurde die schwingende Chart-Animation als visuelle Energie ohne Datenbedeutung beschrieben. Als Arbeitsentscheidung entstand: Die Chart.js-Defaultanimation sei für diesen Story-Screen ungeeignet; sie solle für Screen-2-Journey-Updates ausgeschaltet oder durch eine echte semantische Timeline-Reveal ersetzt werden.

### Klärung der Schichtung: nicht Rucksack, nicht LineChartStrategy

Der Nutzer fragte, ob die Lösung über den Rucksack, also `docs/spec/Der Rucksack (Context Object Pattern).md`, laufen solle. ChatGPT las die Spezifikation und stellte fest, dass der Rucksack für semantischen Chart-Kontext bestimmt sei: `chartType`, `axisType`, `rhythm`, `dataRange`, `viewMode`, `valueMode`, `currency`. Motion-Steuerung sei dagegen ein flüchtiger Renderauftrag, also kein Bestandteil des statischen `fwContext`.

Anschließend fragte der Nutzer, ob ein enger opt-in Render-Motion-Vertrag in der ChartEngine nach `ARCHITECTURE STRATEGY PAPER VX.md` zulässig sei oder eine Sonderlocke darstelle. ChatGPT las das Strategy Paper und grenzte ab: Eine Sonderlocke wäre App-, Screen- oder Journey-Wissen in der Engine. Zulässig sei dagegen ein neutraler Layer-2-Manager-Vertrag wie `renderMotion.mode = 'default' | 'instant'`, der nur den konkreten Renderlauf betrifft. Die Regel wurde formuliert: `LineChartStrategy` bleibt unverändert, der Rucksack bleibt unverändert, `app.js` setzt keinen Chart.js-Options-Passthrough, und `ChartEngine` übersetzt den neutralen Renderauftrag intern in Chart.js-Verhalten.

Aus dieser Entscheidung entstand der Prompt `claude_prompt_AP-prokrast-08b5_rendermotion_instant_screen2_journey.md`.

### AP-08b5: RenderMotion-Contract

Claude meldete AP-prokrast-08b5 mit Status GELB zurück. Ein neuer additiver Contract `renderMotion.mode = 'default' | 'instant'` wurde in `ChartEngine.js` ergänzt. `mode: 'instant'` unterdrückte Chart.js-Tweening nur für den konkreten `renderFromData()`-Aufruf und verwendete denselben `update('none')`-Mechanismus, der bereits für Reduced Motion existierte. `app.js` setzte `renderMotion: { mode: 'instant' }` in `renderJourneyChartOnly()` und `revealCurrentStationPoint()`. Screen 1, Screen 3 und Screen 4 blieben laut Ergebnis bei Chart.js-Default-Animation. `LineChartStrategy.js`, `fwContext` und Plugin-Dateien blieben unverändert.

Der Status blieb GELB, weil Claude keinen Browserzugriff hatte. Der Nutzer testete danach selbst und bestätigte, dass alles funktionierte, auch responsiv auf Screen S, M und L.

### AP-08c: harte QA gegen Datei-Wahrheit und Spezifikationen

Nach der Bestätigung verlangte der Nutzer einen harten QA-Prüfprompt. Er wollte vermeiden, dass Behauptungen über umgeschriebene Dateien ungeprüft blieben. Außerdem sollte das Master-LLM über den neuen Status „keine Animation“ informiert werden. Nach einer kurzen Korrektur, dass nur ein Prompt gewünscht war, erzeugte ChatGPT `claude_prompt_AP-prokrast-08c_abschluss-qa_architektur_claims_masterkapsel.md`.

Der Prompt war read-only. Er verlangte Claims-vs-Files, Prüfung gegen `ARCHITECTURE STRATEGY PAPER VX.md`, Rucksack-Spec, `CHART_PLUGIN_ARCHITEKTUR.md` und `APP-INTERFACE.md`, deterministische Greps, Syntaxprüfungen, Screen-/Regression-QA und eine Master-Rückgabekapsel. Er verbot Reparatur, Commit und Abschlussritual.

Claude meldete AP-prokrast-08c mit Status GELB zurück. Zehn von elf Claims wurden vollständig bestätigt. Ein Claim, `chartSettled unter instant`, wurde teilweise bestätigt: Im tatsächlich genutzten Update-Pfad funktionierte es; im unbenutzten Creation-Pfad wurde eine reale Contract-Lücke gefunden. Wenn `chartSettled` jemals zusammen mit `renderMotion.mode='instant'` oder Reduced Motion bereits beim allerersten chart-erzeugenden `renderFromData()` genutzt würde, gäbe es keinen synchronen Settled-Emit. In der aktuellen App wurde dieser Pfad nicht ausgelöst. AP-08c bestätigte außerdem: `ARCHITECTURE STRATEGY PAPER VX.md`, Rucksack-Spec, `CHART_PLUGIN_ARCHITEKTUR.md` und `APP-INTERFACE.md` bestanden; keine Regression an Screen 4, AP-07 oder RubikonSymbolMarkers; Daten und `stations.de.json` unverändert.

### Übergabe, Reduced Motion und Abschlussritual

Der Nutzer fragte, was bei Status GELB noch zu tun sei und ob die Übergabekapsel brauchbar sei. ChatGPT antwortete, dass nicht weiter an Screen 2 gebastelt werden müsse. Offen seien der optionale Reduced-Motion-Browsertest sowie Masterentscheidungen zu No-op-Bootstrap und `chartSettled`-Creation-Pfad. Die Rückgabekapsel wurde als brauchbar eingeschätzt, solange sie nicht als „alles ohne Folgepflicht fertig“ verstanden werde.

Danach meldete der Nutzer, Claude habe Reduced Motion nachgetragen und es funktioniere. Da bei Claude die Token knapp wurden, wollte der Nutzer das Abschlussritual ausführen und den Kommentar plus die überarbeitete Abschlusskapsel an das Master-LLM zurückgeben. ChatGPT aktualisierte die Übergabekapsel: Reduced Motion wurde nicht mehr als offen, sondern als bestätigt geführt. Die Kapsel hielt fest, dass Screen 2 funktional abgeschlossen und Browser-QA auf S/M/L sowie Reduced Motion bestätigt war, während die zwei Plattform-Folgepflichten bestehen blieben: No-op-Bootstrap und `chartSettled`-Creation-Pfad.

## Wendepunkte

Der erste Wendepunkt war der Sunk-Cost-Einwand des Nutzers. Aus „bisherige Fixes als Grundlage akzeptieren“ wurde ein Architektur-Gate, das jeden Fix einzeln klassifizieren musste.

Der zweite Wendepunkt war der Browserbefund zur Graphanimation. Die Aufgabe verschob sich von Timing und Sequenz zu kognitiver Lesbarkeit. Die verlängerte Flugzeit wurde nicht als Lösung, sondern als Mittel zur Beobachtung behandelt.

Der dritte Wendepunkt war die Rucksack-Frage. Sie trennte semantischen Chart-Kontext von flüchtiger Rendersteuerung und führte zur Entscheidung für einen engen Engine-Render-Motion-Vertrag.

Der vierte Wendepunkt war AP-08c. Dort wurde nicht nur bestätigt, sondern eine unbenutzte `chartSettled`-Creation-Pfad-Lücke gefunden. Diese änderte den Endstatus von funktional abgeschlossen zu funktional abgeschlossen mit Plattform-Folgepflicht.

## Entscheidungen und Festlegungen

- Die bisherigen AP-08b-Fixes wurden nicht automatisch akzeptiert. Sie wurden über AP-08b4a als `BEHALTEN`, `HÄRTEN`, `ERSETZEN` oder `ZURÜCKBAUEN` klassifiziert. Status am Ende: gültig.
- `AnchorMeasurement` wurde als app-neutraler opt-in Plugin-Contract beibehalten. Status am Ende: gültig.
- Der No-op-Bootstrap blieb in der App, wurde aber als HÄRTEN/Folgepflicht markiert. Status am Ende: offen für Masterentscheidung.
- `chartSettled` wurde als Engine-Lifecycle-Contract beibehalten. Status am Ende: gültig für genutzte Update-Pfade, Creation-Pfad-Lücke offen.
- `renderJourneyStep()` wurde in Chart- und Card-Teil getrennt. Status am Ende: umgesetzt.
- Die Chart.js-Defaultanimation wurde für Screen-2-Journey-Updates über `renderMotion.mode='instant'` entfernt. Status am Ende: umgesetzt und browserbestätigt.
- `renderMotion` wurde nicht im Rucksack und nicht in `LineChartStrategy` verankert, sondern als enger opt-in Renderauftrag in `ChartEngine`. Status am Ende: gültig.
- Der Masterfaden sollte vor Plattform-Dokumentation zu No-op-Bootstrap und `chartSettled`-Creation-Pfad entscheiden. Status am Ende: offen.

## Irrwege, Schleifen und verworfene Ansätze

Ein erster verworfener Ansatz war die Formulierung, frühere Fixes einfach als erledigte Grundlage zu übernehmen. Der Nutzer wies das als Sunk-Cost-Risiko zurück; daraus entstand das AP-08b4a-Gate.

Ein weiterer Zwischenweg war das Verlängern der Flugzeit auf `1350ms`. Diese Änderung machte den Ablauf sichtbar, wurde aber nicht als eigentliche Lösung behandelt.

Ein weiterer verworfener Weg war, Motion über den Rucksack zu steuern. Nach Lektüre der Spezifikation wurde dies verworfen, weil `fwContext` semantische Chart-Informationen trägt und kein flüchtiger Renderauftrag ist.

Ebenfalls verworfen wurde eine Änderung an `LineChartStrategy.js`, weil sie die normalen LineChart-Fälle und weitere Apps betroffen hätte. Die Änderung wurde in die `ChartEngine` verschoben.

## Erzeugte Artefakte

- `claude_prompt_AP-prokrast-08b4a_architektur-gate_anchormeasurement_chartsettled.md` – Prompt für Architektur-Gate vor weiterem Patch – final.
- `docs/steering/patches/AP-prokrast-08b4a_architektur-gate_anchormeasurement_chartsettled_Ergebnis.md` – von Claude erzeugtes Gate-Ergebnis – finaler Arbeitsstand, Status GELB.
- `claude_prompt_AP-prokrast-08b5_rendermotion_instant_screen2_journey.md` – Prompt für RenderMotion-Contract – final.
- `docs/steering/patches/AP-prokrast-08b5_rendermotion_instant_screen2_journey_Ergebnis.md` – von Claude erzeugtes Ergebnis – finaler Arbeitsstand, zunächst GELB wegen fehlender Browser-QA.
- `claude_prompt_AP-prokrast-08c_abschluss-qa_architektur_claims_masterkapsel.md` – Prompt für harte Abschluss-QA und Masterkapsel – final.
- `docs/steering/patches/AP-prokrast-08c_abschluss-qa_architektur_claims_masterkapsel_Ergebnis.md` – von Claude erzeugtes QA-Ergebnis – finaler Arbeitsstand, Status GELB.
- Aktualisierte Rückgabekapsel an den Masterfaden nach Reduced-Motion-Bestätigung – finaler Übergabetext.
- `CHRONIK-2026-07-06-ap-prokrast-card-to-point-rendermotion-qa.md` – diese Chronik – final.

## Sachliche Erkenntnisse

Gesicherter Stand: `app.js` sollte keine Chart.js-Internals lesen. Koordinatenmessung lief über `FwAnchorMeasurementPlugin` und Engine-Callback. `renderMotion.mode='instant'` wurde als enger opt-in Engine-Contract eingeführt und nur in Screen-2-Journey-Renderläufen genutzt. `LineChartStrategy.js` und `fwContext` blieben unverändert.

Gesicherter Stand: Screen 2 funktionierte nach Browser-Test auf S, M und L. Reduced Motion wurde nachgetragen und funktionierte laut Nutzer ebenfalls.

Gesicherter Stand: AP-08c fand keine Regression an Screen 4, AP-07 oder RubikonSymbolMarkers und keine Änderung an `stations.de.json` oder Finanzdaten.

Offene Frage: Der No-op-Bootstrap muss vor Plattform-Dokumentation entweder als bewusster Contract dokumentiert oder durch einen Engine-Design-AP ersetzt werden.

Offene Frage: Der `chartSettled`-Creation-Pfad hat eine Contract-Lücke für künftige Apps, wenn `chartSettled` bereits beim chart-erzeugenden Erstaufruf mit `instant` oder Reduced Motion genutzt wird.

## Offene Punkte am Ende

- Masterfaden-Entscheidung zum No-op-Bootstrap: Engine-Fix zur Plugin-Nachregistrierung oder dokumentierter Contract.
- Masterfaden-Entscheidung zur `chartSettled`-Creation-Pfad-Lücke: kleiner Engine-Folge-AP oder dokumentierte Einschränkung.
- Kein Commit wurde in diesem Faden durchgeführt.
- Kein Spec-Sync wurde in diesem Faden durchgeführt.
- Das Abschlussritual sollte vom Nutzer im Claude-Kontext ausgeführt werden.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Ein funktionierender Fix wurde nicht automatisch als tragfähige Plattformlösung übernommen, sondern durch einen Sunk-Cost-Einwand in ein Architektur-Gate überführt.

Für spätere Musteranalyse vormerken: Eine visuelle Irritation wurde zunächst über Timing sichtbar gemacht, danach aber als Bedeutungs- und Aufmerksamkeitskonflikt behandelt.

Für spätere Musteranalyse vormerken: Mehrere neue Engine-Contracts entstanden additiv und opt-in, während die App-spezifische Nutzung eng begrenzt blieb.

Für spätere Musteranalyse vormerken: Ergebnisprotokolle wurden nicht als Wahrheit behandelt; AP-08c prüfte Claims-vs-Files und fand dabei eine reale, zuvor nicht dokumentierte Contract-Lücke.

## Bewusst ausgelassen

Ausgelassen wurden reine Zwischenbestätigungen, Tippfehlerkorrekturen, Bedienrauschen, wiederholte Dateilinks, Tool-Ausgaben ohne neue Zustandsänderung und lange Wiederholungen der bereits erzeugten Prompttexte. Beibehalten wurden nur solche Artefakte, Entscheidungen, Irrwege und Befunde, die den weiteren Verlauf änderten oder den Endstand erklärten.
