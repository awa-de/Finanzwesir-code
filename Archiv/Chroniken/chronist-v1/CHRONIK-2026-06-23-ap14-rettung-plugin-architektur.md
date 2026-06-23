---
chronik_id: CHRONIK-2026-06-23-ap14-rettung-plugin-architektur
datum: 2026-06-23
projekt: finanzwesir-app-fabrik
thema: ap14-rettung-plugin-architektur
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: teilweise
quellenlage: mit-anhaengen
schlagworte: [scope-drift, richtungswechsel, sackgasse, durchbruch, tooling-problem, annahme-verworfen]
---

# Chronik: AP-14-Rettung, Prozesslernen und Plugin-Architektur

**Hauptgegenstand:** Der Faden behandelte zunächst die Verdichtung langer LLM-Arbeitsfäden zu Chroniken und wurde danach als Arbeitsfaden für die App `prokrastinations-preis` weiterverwendet. Im Verlauf wurde B1-AP-14 aus einem nicht stabilen Zustand heraus in kleine Folgearbeitspakete zerlegt, geprüft, korrigiert und dokumentiert. Am Ende standen zusätzliche Übergabeprompts, eine Chart-Plugin-Spec, ein geplanter Plugin-Refactoring-Faden und eine nachträgliche Regression-Regel für allgemeine Engine-Änderungen.

## Ausgangslage

Der Faden begann mit dem Wunsch, einen Extraktionsprompt für lange Chat-Fäden zu formulieren. Der Nutzer wollte Fäden, in denen Arbeit erledigt und Erkenntnisse gesammelt wurden, nicht vollständig archivieren, sondern als Chroniken verdichten. Die Chronik sollte Rauschen entfernen, aber den Arbeitsweg, einschließlich Irrwegen, festhalten. Der spätere Zweck war eine Analyse über mehrere Chroniken hinweg, um Muster zu erkennen.

Später wurde derselbe Faden für die Arbeit an der Finanzwesir-App-Fabrik weitergenutzt. Frühere Arbeitspakete bis AP-10 waren abgeschlossen. Die App `prokrastinations-preis` war als psychologische Erfahrungs-App angelegt, die den Satz „Die beste Zeit anzulegen war vor 10 Jahren. Die zweitbeste ist heute.“ erfahrbar machen sollte. Screen 2 sollte eine Zeitreise ohne Endwissen bleiben; Screen 3 sollte den ersten vollständigen Reveal liefern.

## Chronologischer Verlauf

### Vom Chronik-Prompt zum App-Fabrik-Arbeitsfaden

Zunächst wurde die Chronik-Arbeitsweise als eigene Methode formuliert. Der Nutzer verlangte eine nüchterne, bewertungsfreie Haltung, die Verlauf, Wendungen und Umwege dokumentierte. Diese Arbeitsweise wurde später im selben Faden wieder relevant, als nach dem Abschluss von AP-14 ein zusätzlicher Report zur AP-14-Rettung erzeugt wurde.

Parallel existierten bereits Übergaben und Prompts aus früheren Abschnitten der App-Fabrik: AP-09 bis AP-10 als Config-Block, AP-11 bis AP-18 als Coding-Block und AP-19 bis AP-21 als QA-/Abschlussblock. Diese Blockstruktur wurde später wieder aufgenommen, aber nicht mehr unverändert übernommen.

### AP-14 als Rettungsfall

Der Nutzer berichtete, Claude habe bei AP-14 keine tragfähige Lösung gefunden. Die Ringe seien nicht animiert, Claude drehe sich im Kreis. Daraufhin wurde nicht ein neuer Großprompt geschrieben, sondern zunächst ein Rettungsbefund als Arbeitsweise etabliert. Die Arbeit wurde in kleinere APs aufgeteilt.

Der zunächst vorhandene Post-Render-Hack wurde als Ausgangspunkt behandelt. In AP-14b0 wurde der Hack zurückgebaut. Danach folgten einzelne Architekturverträge: `xDisplayRange` und `displayRange` für die feste X-Achse, `yRangePolicy: 'cumulative-expand-zero'` und `yRangeResetKey` für die Y-Achse, App-Anschluss und Log-Cleanup. Damit wurde der frühere Zustand ersetzt, in dem die Achse nachträglich manipuliert wurde.

### Marker, Ringe und Screen-3-Reveal

In B1-AP-14c1 wurden Journey-Stations in Annotationen überführt. Es wurde keine neue `events.json` eingeführt. Die Annotationen wurden aus bestehenden Journey-Stations abgeleitet. In B1-AP-14c2 wurden daraus offene Ringe. Anschließend zeigte sich, dass die Marker-X-Positionen nicht exakt auf der Hauptserie lagen. B1-AP-14c2b korrigierte dies, indem Marker-X aus dem Snapshot-Snap der Hauptserie abgeleitet wurde.

Danach wurde Screen 3 angeschlossen. Die historischen Ringe sollten im vollständigen Reveal sichtbar sein, `final_reveal` und `dynamic_latest_month` aber nicht als Marker erscheinen. B1-AP-14c3b führte dafür einen robusteren Guard ein, der `role`, `date`, `status`, `flags.finalReveal` und ID-Substrings prüfte.

### Pulse-Implementierung und Canvas-Lifecycle

B1-AP-14c4 behandelte den Pulse für neu sedimentierte Marker. Die Implementierung führte `FwAnnotationPulsePlugin.js` unter `Theme/assets/js/fw-chart-engine/plugins/` ein. Das Plugin wurde nur über `annotationPulse: { enabled: true, mode: 'newly-added' }` aktiviert. Screen 2 aktivierte es; Screen 3 nicht.

Es gab mehrere Zwischenstände. Ein früher Ansatz mit `afterDatasetsDraw` und `chart.update('none')` wurde verworfen. Ein weiterer Ansatz zeichnete direkt auf `chart.ctx`, wurde aber wegen Chart.js-Canvas-Ownership durch ein Muster ersetzt, bei dem der rAF-Loop `chart.draw()` auslöst und das Plugin in `afterDraw` zeichnet. Der Nutzer berichtete, dass Peer Reviews durch Perplexity und ChatGPT diesen Befund stützten. Die endgültigen Produktwerte wurden mit 1200 ms, 1,8× Scale und zwei Pulsen festgehalten. Reduced Motion wurde über `prefers-reduced-motion: reduce` berücksichtigt.

### QA, Doku-Drift und AP-14-Abschluss

Nach AP-14c4 wurde ein QA-only-AP B1-AP-14d2 formuliert. Claude prüfte Progressive Domain, Marker, Pulse, Reduced Motion, Screen 3 und Regression. Es wurden keine Blocker gemeldet. Anschließend wurde eine Doku-Lücke identifiziert: Die Pulse-Produktentscheidung war in der APP_SPEC noch nicht konkret genug dokumentiert. B1-AP-14d3 zog APP_SPEC, QA_TEST_CASES und NAVIGATION nach.

Danach zeigte sich, dass die UI-Primitive-Tabelle in APP_SPEC §16.3 noch alte „zu bauen“-Einträge enthielt. B1-AP-14d4 synchronisierte diese Tabelle. Am Ende waren 14 von 16 Primitiven als umgesetzt markiert, ein Eintrag teilweise umgesetzt und Draw-Animation bewusst offen. Der Nutzer fragte, ob ein Meilenstein erreicht sei. ChatGPT stellte fest, dass B1-AP-14 als abgeschlossen behandelt werden könne und AP-15 danach beginnen solle.

### Reports und Übergaben

Der Nutzer verlangte eine Rekapitulation des neuen Abschnitts seit der früheren Chronik. ChatGPT erzeugte den Report `Report_AP14_Rettung_Prozesslernen_Prokrastinationspreis.md`. Darin wurde der Abschnitt als Rettungs- und Stabilisierungsfall dokumentiert. Der Report hielt das Arbeitsmuster fest: ChatGPT als Orchestrator, Claude als Coder, manuelle Abnahme durch den Nutzer, Peer Review bei kritischen Punkten und Ergebnisprotokolle als Steuerungsgrundlage.

Danach fragte der Nutzer nach bereits definierten AP-Gruppen. Aus der Historie wurden der Config-Block AP-09 bis AP-10, der Coding-Block AP-11 bis AP-18 und der QA-/Abschluss-Block AP-19 bis AP-21 wiederaufgenommen. ChatGPT stellte fest, dass die alte Blocklogik nutzbar blieb, aber die Detailplanung durch AP-14 überformt worden war. Daraufhin wurden zwei Übergabeprompts erzeugt: ein AP-14-Repo-Audit nach Abschlussritual und eine Strategie-Übergabe für Rest-APs ab AP-15.

### Plugin-Spec und Architekturfrage

Aus der Pulse-Implementierung entstand die Frage, ob die Plugin-Architektur in `docs/spec` dokumentiert werden müsse. ChatGPT bejahte dies und erzeugte `CHART_PLUGIN_ARCHITEKTUR.md` sowie einen Claude-Prompt zur Einbindung in Steuerungsdateien. Die Spec beschrieb Plugins als Presentation-/Runtime-Schicht, verlangte Opt-in über Optionsfelder, ephemeren State, Reduced-Motion-Beachtung und das Verbot von Post-Render-Hacks.

Danach stellte der Nutzer fest, dass es neben dem neuen `plugins/`-Ordner auch `core/FwChartPlugins.js` gab. Dort lagen `CenterTextPlugin` und `CrosshairPlugin`. Zunächst wurde dies als Übergang mit Bestandsschutz beschrieben. Der Nutzer widersprach der Einordnung als Altbestand und stellte klar, dass CenterTextPlugin und CrosshairPlugin notwendig seien und kein Unterschied zu dem neuen Plugin bestehe. Daraufhin wurden drei speckonforme Lösungen formuliert: Einzeldateien in `plugins/` mit `index.js`, Verschiebung der Sammeldatei nach `plugins/`, oder eine Plugin-Registry mit Manifest. Als bevorzugtes Zielbild wurde „ein Plugin = eine Datei“ unter `Theme/assets/js/fw-chart-engine/plugins/` festgelegt. Danach wurde ein großer Übergabeprompt für einen frischen Plugin-Refactoring-Faden erzeugt.

### Regression in LineChartStrategy

Nach der AP-14-Arbeit trat eine Regression in normalen LineCharts auf. Der Nutzer lieferte einen Fehlerbericht: `TypeError: (r.Date || r.Datum).slice is not a function` in `LineChartStrategy.js:268`. Die Ursache lag in der AP-14c2b-Änderung. Der Code hatte angenommen, `r.Date || r.Datum` sei ein String. Im `renderFromData`-Pfad traf dies zu; im Standard-CSV-Pfad über `CSVParser.parse(..., { expectDate: true })` konnte das Datum ein `Date`-Objekt sein.

ChatGPT ordnete den Fehler B1-AP-14c2b zu und formulierte den Fix-Prompt B1-AP-14c2c. Der Prompt erlaubte nur eine Änderung in `LineChartStrategy.js`, verbot Änderungen an `CSVParser.js`, `FwDateUtils.js`, `ChartEngine.js`, App-Code und Plugins und verlangte einen defensiven Month-Key-Helfer. Claude führte den Fix aus: String-Daten behielten `slice(0, 7)`, Nicht-String-Daten liefen über `FwDateUtils.parse()`, und die `_monthToSnappedX`-Map wurde nur noch bei vorhandenen Annotationen aufgebaut. Nach manueller Abnahme meldete der Nutzer, alles sei in Ordnung. Daraus wurde eine Pflicht-Regressionsregel für künftige Engine-APs formuliert: Änderungen an allgemeiner Chart-Engine-Logik müssen sowohl `renderFromData()` als auch `_processContainer()` mit CSVParser-Daten prüfen.

## Wendepunkte

Ein Wendepunkt trat ein, als AP-14 nicht weiter als einzelner Coding-Block behandelt wurde, sondern in Rettungsbefund, Rückbau, Verträge, Marker, Pulse, QA und Doku-Nachzug zerlegt wurde.

Ein weiterer Wendepunkt entstand bei der Pulse-Implementierung. Der direkte Canvas-Draw wurde durch `requestAnimationFrame → chart.draw() → afterDraw` ersetzt. Dadurch wurde Chart.js-Canvas-Ownership als Architekturbedingung sichtbar.

Ein dritter Wendepunkt entstand, als die Plugin-Spec zunächst als Dokumentation für das neue Pulse-Plugin gedacht war, danach aber wegen `FwChartPlugins.js` zu einer allgemeineren Frage wurde: Es sollte nicht zwei Plugin-Orte geben.

Ein vierter Wendepunkt trat mit der LineChartStrategy-Regression ein. Sie zeigte, dass AP-14 allgemeine Engine-Dateien verändert hatte und dass eine Prüfung gegen beide Datenpfade erforderlich war.

## Entscheidungen und Festlegungen

Es wurde festgelegt, dass Screen 2 eine feste X-Achse, einen wachsenden Pfad, eine nicht schrumpfende Y-Achse und nur vergangene Marker haben sollte. Diese Festlegung blieb am Ende gültig.

Es wurde festgelegt, dass `final_reveal`, `dynamic_latest_month` und die aktuelle Station nicht als Marker erscheinen dürfen. Diese Festlegung blieb gültig.

Es wurde festgelegt, dass Pulse nur in Screen 2 aktiv sein sollte, Screen 3 aber stille Ringe zeigen sollte. Diese Festlegung blieb gültig.

Es wurde festgelegt, dass Pulse ein ephemerer Runtime-State sein sollte und nicht in JSON, Domain-State oder dauerhaft in `fwContext` geschrieben werden sollte. Diese Festlegung blieb gültig.

Es wurde festgelegt, dass die konkrete Pulse-Produktentscheidung 1200 ms, 1,8× und zwei Pulse umfasst. Diese Festlegung wurde in APP_SPEC und QA_TEST_CASES nachgezogen.

Es wurde festgelegt, dass Plugin-Architektur vor AP-15 geklärt werden sollte. Am Ende war dafür ein neuer Refactoring-Faden vorbereitet, aber noch nicht ausgeführt.

Es wurde festgelegt, dass allgemeine Engine-Änderungen beide Datenpfade prüfen müssen: `ChartEngine.renderFromData()` und `ChartEngine._processContainer()` mit CSVParser. Diese Festlegung entstand nach der LineChartStrategy-Regression und blieb am Ende als neue Pflichtregel stehen.

## Irrwege, Schleifen und verworfene Ansätze

Der Post-Render-Hack an Chart.js wurde als Weg erkennbar, der nicht weiterverfolgt wurde. Er wurde durch Engine-Verträge ersetzt.

Beim Pulse wurde `afterDatasetsDraw` mit `chart.update('none')` versucht und danach ersetzt. Der Grund lag in Hook-Reihenfolge, Sichtbarkeit und der Gefahr von Layout-/Update-Nebenwirkungen.

Ein direkter Canvas-Loop außerhalb des Chart.js-Zyklus wurde ebenfalls ersetzt. Die spätere Lösung nutzte `chart.draw()` als Animationstreiber und `afterDraw` als Zeichenort.

Die erste Fassung der Plugin-Spec unterschied zwischen neuem `plugins/`-Ordner und vorhandener `core/FwChartPlugins.js`. Diese Trennung wurde vom Nutzer nicht akzeptiert, weil die bestehenden Plugins ebenfalls notwendig waren. Daraus entstand das Ziel, alle Plugin-Implementierungen an einem Ort zu führen.

Die AP-14c2b-Korrektur der Marker-X-Ausrichtung enthielt eine Annahme über String-Datumsfelder. Diese Annahme wurde später durch die Regression verworfen und durch einen defensiven Month-Key-Helfer ersetzt.

## Erzeugte Artefakte

- `B1-AP-14d2_Mini-QA_Progressive-Domain_Marker_Pulse_Claude-Prompt.md` – QA-Prompt für AP-14d2 – final verwendet.
- `B1-AP-14d4_UI-Primitive-Status-Sync_Claude-Prompt.md` – Doku-Nachputz für APP_SPEC §16.3 – final verwendet.
- `Report_AP14_Rettung_Prozesslernen_Prokrastinationspreis.md` – Prozessreport zur AP-14-Rettung – final erzeugt.
- `Uebergabeprompt_AP14_Repo-Audit_nach_Abschlussritual.md` – Übergabe für Repo-Audit – Entwurf/für Folgefaden.
- `Uebergabeprompt_AP15_Reststrategie_nach_AP14_Rettung.md` – Strategie-Übergabe für Rest-APs – Entwurf/für Folgefaden.
- `CHART_PLUGIN_ARCHITEKTUR.md` – Spec-Entwurf für Chart-Plugin-Architektur – Entwurf zur Ablage in `docs/spec`.
- `B1-AP-14e1_Chart-Plugin-Spec_Einbindung_Claude-Prompt.md` – Prompt zur Einbindung der Spec in Steuerdateien – Entwurf.
- `Uebergabeprompt_Plugin-Refactoring_vor_AP15.md` – großer Übergabeprompt für den Plugin-Refactoring-Faden – Entwurf/für neuen Faden.
- Fix-Prompt B1-AP-14c2c zur LineChartStrategy-Date-Objekt-Regression – im Chat ausgegeben, von Claude ausgeführt.
- Pflicht-Regressionsregel für Engine-APs – im Chat formuliert, zur Übernahme in Folgefäden.

## Sachliche Erkenntnisse

Gesicherter Stand: AP-14 veränderte allgemeine Engine-Dateien. Deshalb musste Regression nicht nur in der App `prokrastinations-preis`, sondern auch gegen Standard-LineCharts geprüft werden.

Gesicherter Stand: `CSVParser.parse(..., { expectDate: true })` konnte Datumsfelder als native `Date`-Objekte liefern. Engine-Code durfte daher nicht blind String-Methoden auf Datumsfeldern voraussetzen.

Gesicherter Stand: `FwDateUtils.parse()` wurde als Normalisierungspfad für Datumswerte verwendet, ohne `CSVParser.js` oder `FwDateUtils.js` für den lokalen Sonderfall zu ändern.

Gesicherter Stand: Plugins sollten nicht heimlich Domain-State erzeugen. Der Pulse wurde als Runtime-/Presentation-Verhalten behandelt.

Arbeitsannahme: Ein einheitlicher Plugin-Ort unter `Theme/assets/js/fw-chart-engine/plugins/` sollte künftige Drift bei 20+ Apps verringern. Die Umsetzung war am Fadenende noch nicht erfolgt.

Offene Frage: Wie der Plugin-Refactor konkret mit `CenterTextPlugin`, `CrosshairPlugin` und `FwAnnotationPulsePlugin` umgesetzt wird, sollte im neuen Faden erst nach Inventar und Prüfung gegen Master-Architektur und Rucksack entschieden werden.

Spätere Korrektur: Die frühere Annahme, die Marker-X-Month-Map könne direkt `(r.Date || r.Datum).slice(0, 7)` verwenden, wurde nach der Regression ersetzt.

## Offene Punkte am Ende

Der Plugin-Refactoring-Faden war vorbereitet, aber noch nicht gestartet. Offen war, ob `core/FwChartPlugins.js` gelöscht, entkernt oder übergangsweise als Re-Export belassen würde.

Die `CHART_PLUGIN_ARCHITEKTUR.md` war als Datei erzeugt, aber ihre Ablage und Einbindung in Steuerdateien sollte noch durch Claude bzw. im Repo-Faden erfolgen.

AP-15 war noch nicht gestartet. Draw-Animation, Transitions und systematische Reduced-Motion-Regeln blieben AP-15-relevant.

Die neue Pflicht-Regressionsregel war formuliert, musste aber im nächsten Faden als verbindliche Handlungsanweisung übernommen werden.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Ein verunglückter AP wurde nicht mit einem größeren Prompt fortgeführt, sondern durch Forensik, Rückbau und kleine Einzelverträge stabilisiert.

Für spätere Musteranalyse vormerken: QA-only-APs, Doku-Nachzug und Status-Sync wurden als eigene Arbeitspakete geführt.

Für spätere Musteranalyse vormerken: Eine lokale App-Anforderung führte zu allgemeiner Engine-Architektur und später zu einer Plugin-Architekturfrage.

Für spätere Musteranalyse vormerken: Ein AP-Fix war für den direkten App-Pfad korrekt, brach aber einen anderen Datenpfad. Daraus entstand eine neue Pflicht-Regressionsregel.

Für spätere Musteranalyse vormerken: Der Nutzer akzeptierte eine Übergangs-/Bestandsschutzdeutung der Plugin-Orte nicht, weil er für 20+ Apps eine verbindliche Architektur verlangte.

## Bewusst ausgelassen

Ausgelassen wurden Tool-Statusmeldungen, Download-Wiederholungen, Zwischenhinweise ohne Folgewirkung, reine Bestätigungen und mehrfach wiederholte Links auf erzeugte Dateien. Ebenfalls ausgelassen wurden vollständige Prompt-Texte, sofern ihr Inhalt im Verlauf als Zweck, Entscheidung und Artefakt erfasst wurde.
