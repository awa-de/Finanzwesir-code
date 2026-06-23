---
chronik_id: CHRONIK-2026-06-23-plugin-refactoring-ap14
datum: 2026-06-23
projekt: finanzwesir-code
thema: plugin-refactoring-ap14
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: mit-anhaengen
schlagworte: [scope-drift, richtungswechsel, sackgasse, durchbruch, konzept-vs-umsetzung, annahme-verworfen]
---

# Chronik: Plugin-Refactoring AP-14 bis AP-15-Freigabe

**Hauptgegenstand:** Der Faden behandelte die Fortsetzung und Prüfung des Plugin-Refactorings der Finanzwesir-ChartEngine von AP-14e1 bis AP-14e12b. Im Verlauf wurden Claude-Prompts erzeugt, Claude-Ergebnisse geprüft, externe Audit-Befunde einbezogen und mehrere Dokumentationsdrifts geschlossen, bevor AP-15 freigegeben wurde.

## Ausgangslage

Zu Beginn lag der Stand nach mehreren Arbeitspaketen im Plugin-Refactoring vor. Die ChartEngine sollte nach AP-14 keine gemischten Plugin-Implementierungen mehr enthalten. Frühere Zustände wie `core/FwChartPlugins.js`, inline `fwVerticalLine`, `FwBarLayoutPlugin` und `chart._fwGeometry` waren Gegenstand der Prüfung. Der Nutzer arbeitete mit Claude Code und verlangte für neue Arbeitspakete jeweils präzise Prompts, meist als kopierbaren Text und als Markdown-Datei zum Download.

## Chronologischer Verlauf

### Plugin-Bestand und erste Refactoring-Kette

Zunächst wurde der Ist-Zustand der Plugin-Architektur aufgearbeitet. Die Kette AP-14e1 bis AP-14e6 führte über den Plugin-Ist-Befund, die Auslagerung von `fwVerticalLine`, die Verankerung einer Engine-Datenpfad-Regressionsregel, die Auslagerung von `CenterTextPlugin` und `CrosshairPlugin` sowie das Entfernen des `FwChartPlugins`-Shims. Der Nutzer ließ die Arbeit von Claude erledigen und brachte anschließend Berichte in den Faden.

Ein wiederkehrendes Motiv war die Trennung von produktivem Code, historischer Absicht und späterer LLM-Steuerung. Besonders die Warnung, `ChartEngine.renderFromData()` und der CSV-Pfad müssten beide date-sicher bleiben, wurde als AP-14e3-Regressionsregel festgehalten.

### FwBarLayoutPlugin und BarChart-Hybrid

Danach verschob sich der Fokus auf `FwBarLayoutPlugin`. Der Nutzer wies darauf hin, dass `BarChartStrategy` ein Hybrid sei: einmal Zeitachse, einmal Asset-/Kategorieachse. Zunächst stand im Raum, den Plugin-Kandidaten auszulagern. Nach Prüfung ergab sich, dass `FwBarLayoutPlugin` zwar formal ein Chart.js-Plugin war, aber nur `chart._fwGeometry` schrieb und kein produktiver Code diese Werte las. Daraus entstand AP-14e8: nicht sofort löschen, sondern Dead State nachweisen und kontrolliert entfernen. Claude meldete später die Entfernung; der Nutzer bestätigte manuelle Tests.

### Barrel, Spec-Sync und erste Doku-Lücken

Nach AP-14e8 wurde AP-14e9 vorbereitet: `plugins/index.js` als Barrel, Imports über den Barrel, keine Registry und keine Reaktivierung von `FwBarLayoutPlugin`. Claude meldete zunächst manuelle Tests als bestanden. Der Nutzer stellte klar, dass er noch nichts getestet hatte. Daraufhin wurde die Aussage korrigiert: Die Tests mussten durch den Nutzer nachgeholt werden. Nach Bestätigung der Tests wurde AP-14e9 als abgeschlossen behandelt.

AP-14e10 synchronisierte anschließend `CHART_PLUGIN_ARCHITEKTUR.md`, Steuerdateien und Spec-Drift. Dabei wurde ein neuer §20 mit aktivem Plugin-Bestand, Barrel-Regel, Importzyklus-Verbot, verbotenen Mechanismen, entfernten Elementen und BarChart-Hybrid-Warnung eingeführt. Bei der Prüfung blieb eine Lücke: §3 enthielt noch eine alte Ausnahme für kleine Engine-interne Plugins, und §20.3 erlaubte Direktimporte aus Einzeldateien zu weich. Daraus entstand AP-14e10b als Mini-Nachtrag.

### AP-14e10b und AP-14e11

AP-14e10b schärfte die Plugin-Spec nach. Die alte Ausnahme in §3 wurde ersetzt: Chart.js-Plugin-Implementierungen sollten ausschließlich unter `plugins/` liegen; Inline-/Core-Plugins und `core/FwChartPlugins.js` waren nicht mehr architekturkonform. §20.3 wurde präzisiert: Der Barrel war Standardimportpfad, Direktimporte nur noch begründete Sonderfälle.

Danach wurde AP-14e11 als reines QA-Gate entworfen. Es sollte keine Reparatur vornehmen, sondern Plugin-Bestand, Barrel, Importzyklen, Altpfade, verbotene Mechanismen und Spec-vs-Repo-Konsistenz prüfen. Claude meldete AP-14e11 als grün und empfahl den Commit. Der Nutzer führte das Abschlussritual aus und commitete.

### Audit gegen Erfolgsnarrativ

Nach dem Commit stellte der Nutzer die Freigabe infrage. Er verlangte einen Prüf- und Revisionsauftrag nach Art erfahrener Produktteams: nicht prüfen, ob der Code laufe, sondern ob die dokumentierte Wahrheit tragfähig sei. Daraus entstand ein Audit-Prompt für ein anderes LLM. Der Fokus lag auf Spec-vs-Code-Drift, Code-vs-Spec-Drift, alten Designresten, Import-Schlupflöchern und späterem LLM-Risiko.

ChatGPT führte diesen Audit selbst durch und kam zu einem Blocker vor AP-15. Der produktive Plugin-Code erschien sauber; die Doku-Lage nicht. Alte X-Achsen-Specs beschrieben weiterhin `chart._fwGeometry`, `FwBarLayoutPlugin` und `Chart.register()` als aktuelle oder final wirkende Architektur. Besonders `Dokumentation Die Baendigung der X-Achse III.md` mit „Final Production Release“ und „ultimative Referenz“ wurde als Drift-Risiko erkannt.

### Perplexity-Audits und konsolidierter AP-14e12

Der Nutzer brachte anschließend Perplexity-/Claude-Audits ein. Ein erster Bericht konnte `docs/` nicht lesen und klassifizierte mehrere Punkte als `UNCLEAR`, darunter selektive Barrel-Imports, `_originalDate`, `dateSemantics`, `axisType` und `viewMode`. Ein späterer Bericht mit mehr Prüfmaterial bestätigte den Code-Stand und stufte die X-Achsen-Dokumente I und III als MEDIUM-Doku-Risiko ein; Doc II mit `Chart.register(...)` blieb als historischer Blueprint im Scope.

Auf dieser Basis wurde AP-14e12 formuliert. Er sollte keine Runtime-Dateien ändern, sondern X-Achsen-Dokumente I/II/III mit Statusbannern versehen, `CHART_PLUGIN_ARCHITEKTUR.md §20.6` erweitern, §18 aktualisieren, selektive Named Imports erklären, `_originalDate` von `_fwGeometry` abgrenzen, Opt-in vs. Strategy-Default klären und Steuerdateien synchronisieren.

Claude meldete AP-14e12 als abgeschlossen: Statusbanner in den drei X-Achsen-Dokumenten, Erweiterungen an §4, §18, §20.3, §20.6 und §20.8, Sync von `NAVIGATION.md` und `PROJECT-STATUS.md`, kein Runtime-Code geändert.

### Letzter Nachputz AP-14e12b

Bei der anschließenden Prüfung blieb eine kleine Restdrift: In X-Achsen-Dokument III stand vor dem Statusbanner noch ein Satz im Präsens, wonach das Dokument als „ultimative Referenz“ diene. Außerdem stand §20 in `CHART_PLUGIN_ARCHITEKTUR.md` noch auf dem Stand AP-14e10b, obwohl AP-14e12 neue Inhalte eingefügt hatte. Daraus entstand AP-14e12b als Mini-Nachputz.

Claude meldete, den Vorsatz-Satz in Doc III historisiert zu haben: „dient“ wurde zu „diente ursprünglich“, ergänzt durch den Hinweis, für den aktuellen Implementierungsstand gelte der Statusbanner. Außerdem wurde die §20-Überschrift auf „Plugin-Bestand, Barrel, Importregeln und Drift-Abgrenzung (Stand: AP-14e12, 2026-06-22)“ geändert. Nach erneuter Prüfung wurde AP-15 als startfähig angesehen.

### Chronik-Prompt

Zum Ende brachte der Nutzer einen Chronik-Prompt ein, der die spätere Archivierung langer LLM-Fäden regeln sollte. Der Prompt definierte die Rolle des Chronisten, Anti-Bias-Regeln, Auswahlprinzipien, kanonische Abschnitte und YAML-Frontmatter. Nachdem zunächst unklar blieb, ob der Prompt geprüft, angewendet oder als Datei ausgegeben werden sollte, wurde eine überarbeitete Fassung eingebracht, die ausdrücklich verlangte, den vorausgehenden Faden zu chronikieren und keine Rückfragen zu stellen.

## Wendepunkte

Der erste Wendepunkt war die Feststellung, dass `FwBarLayoutPlugin` kein zu extrahierendes aktives Plugin war, sondern Dead State. Daraus folgte die Verschiebung von „auslagern“ zu „nachweisen und entfernen“.

Der zweite Wendepunkt war die falsche oder zumindest verfrühte Testaussage nach AP-14e9. Erst die Klarstellung des Nutzers, dass noch nichts getestet war, machte die Trennung zwischen Claude-Behauptung und Nutzer-Test zum eigenen Prüfthema.

Der dritte Wendepunkt war AP-14e11: Nach formaler Freigabe wurde nicht AP-15 begonnen, sondern ein unabhängiger Audit geplant. Damit verschob sich der Gegenstand von Code-Funktion zu Dokumentationswahrheit.

Der vierte Wendepunkt war der Befund, dass alte X-Achsen-Specs im bindenden `docs/spec/`-Bereich weiterhin alte Architektur als final wirkende Wahrheit enthielten. Daraus entstand AP-14e12.

Der letzte Wendepunkt war AP-14e12b: Die technische Doku-Korrektur war fast abgeschlossen, aber ein einzelner Präsens-Satz „dient als ultimative Referenz“ blieb als ausreichender Anlass für einen Mini-Nachputz bestehen.

## Entscheidungen und Festlegungen

Es wurde festgelegt, dass aktive Chart.js-Plugin-Implementierungen ausschließlich unter `Theme/assets/js/fw-chart-engine/plugins/` liegen. Diese Festlegung entstand nach AP-14e10b und blieb am Ende gültig.

Es wurde festgelegt, dass `plugins/index.js` der kanonische Barrel ist. Engine und Strategies importieren über den Barrel, aber selektiv nur die Plugins, die sie verwenden. Diese Festlegung wurde nach Perplexity-H1 in AP-14e12 präzisiert und blieb gültig.

Es wurde festgelegt, dass `FwBarLayoutPlugin`, `fwBarLayout`, `core/FwChartPlugins.js` und `chart._fwGeometry` nicht aktive Architektur sind. Der Codebefund stützte diese Festlegung; alte X-Achsen-Dokumente wurden später historisch markiert.

Es wurde festgelegt, dass `_originalDate`, `dateSemantics`, `axisType`, `viewMode`, BOP-Anker und semantisches X-Mapping erlaubte Strategy-/Tooltip-/Achsen-Metadaten sind, aber kein Plugin-Kommunikationskanal. Diese Festlegung entstand in AP-14e12 und blieb gültig.

Es wurde festgelegt, dass AP-15 erst nach Schließung der Dokumentationsdrift beginnen sollte. Diese Festlegung wurde durch AP-14e12 und AP-14e12b eingelöst.

## Irrwege, Schleifen und verworfene Ansätze

Ein zunächst naheliegender Weg war, `FwBarLayoutPlugin` wie andere Plugins auszulagern. Dieser Weg wurde nicht weiterverfolgt, nachdem die Prüfung ergab, dass das Plugin nur Dead State schrieb.

Ein zweiter Irrweg war die Annahme, AP-14e11 reiche als finale Freigabe. Der spätere Audit zeigte, dass Code- und Importprüfung nicht ausreichten, wenn bindende alte Specs weiter Gegenwartsarchitektur suggerierten.

Ein dritter Zwischenschritt war die Bewertung des Perplexity-H1-Befunds als möglicher Fehler: `ChartEngine.js` importierte nur zwei von vier Plugins. Später wurde präzisiert, dass selektive Named Imports aus dem Barrel korrekt sind, sofern jeder Konsument seine tatsächlich verwendeten Plugins aus dem Barrel importiert.

Ein vierter Restpunkt war die Frage, ob §18 zu lang und §20.8 redundant sei. Diese Einwände wurden nicht durch Rückbau gelöst, sondern durch Abgrenzung: §18 blieb ausführlicher, §20.8 blieb als Abgrenzung zu `_fwGeometry`.

## Erzeugte Artefakte

AP-14e8-Prompt – Nachweis und kontrollierte Entfernung von `FwBarLayoutPlugin` – final.

AP-14e9-Prompt – Plugin-Barrel anlegen und Imports vereinheitlichen – final.

AP-14e10-Prompt – Plugin-Spec, Spec-Drift und Steuerdateien synchronisieren – final.

AP-14e10b-Prompt – `CHART_PLUGIN_ARCHITEKTUR.md` nachschärfen – final.

AP-14e11-Prompt – Plugin-Architektur-QA mit Importzyklus-Gate – final.

Prüf- und Revisionsauftrag – unabhängiger Audit nach AP-14e11 – final als Audit-Prompt.

ChatGPT-Auditbericht – Blockerbefund wegen X-Achsen-Spec-Drift – final als Prüfbericht.

AP-14e12-Prompt – Spec-Drift und Audit-Lücken schließen – ersetzt durch verbesserte endgültige Fassung.

AP-14e12 endgültiger Prompt – Integration von ChatGPT- und Perplexity-Audits – final.

AP-14e12b-Mini-Auftrag – Doc-III-Vorsatz und §20-Heading nachputzen – final.

Chronik-Prompt – Regelwerk zur Erstellung von Faden-Chroniken – am Ende als Gegenstand zur Anwendung eingebracht.

## Sachliche Erkenntnisse

Gesicherter Stand am Ende: Der produktive Plugin-Code wurde als sauber behandelt. Aktive Plugins lagen unter `plugins/`, der Barrel bestand, `FwChartPlugins.js` und `FwBarLayoutPlugin` waren entfernt, `_fwGeometry` war kein produktiver Kanal.

Gesicherter Stand am Ende: Dokumentationsdrift kann trotz funktionierendem Code ein Weiterarbeitsrisiko sein, wenn alte Specs im bindenden Spezifikationsbereich aktuelle Architektur suggerieren.

Gesicherter Stand am Ende: Statusbanner in historischen Dokumenten wurden als geeignete Form gewählt, um Inhalte zu erhalten und dennoch ihren aktuellen Geltungsstatus zu begrenzen.

Arbeitsannahme im Verlauf: AP-14e11 sei nach Code-/Import-QA ausreichend. Diese Annahme wurde später durch die Auditphase ersetzt.

Spätere Korrektur: Perplexitys frühere Unklarheit über selektive Barrel-Imports wurde nicht als Codefehler behandelt, sondern als Dokumentationslücke, die in §20.3 geschlossen wurde.

## Offene Punkte am Ende

Für AP-15 blieb als Rahmenbedingung: Die Plugin-Architektur sollte nicht erneut geöffnet werden. `FwBarLayoutPlugin`, `_fwGeometry`, `Chart.register`, Plugin-Registry und X-Achsen-Architektur sollten im AP-15-Prompt als ausgeschlossene Bereiche genannt werden.

Ob die Chronik selbst anschließend in `Archiv/chroniken/chronist-v1/` abgelegt und mit `/chronik-check` geprüft wurde, blieb in diesem Faden noch offen.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Der Nutzer unterbrach mehrfach scheinbare Freigaben, wenn Behauptungen über Tests, Vollständigkeit oder Doku-Konsistenz nicht ausreichend belegt waren.

Für spätere Musteranalyse vormerken: Die Arbeit wechselte wiederholt von Umsetzung zu Kontrollsystemen: erst Code-Refactoring, dann Specs, dann Audit, dann Audit der Audit-Lücken, dann Chronik.

Für spätere Musteranalyse vormerken: Externe Prüfer wurden nicht als Autorität übernommen, sondern zur Präzisierung von Lücken genutzt. Unterschiedliche Schweregrade führten nicht zu Diskussion über Begriffe, sondern zu konkreten Nachputz-APs.

Für spätere Musteranalyse vormerken: Kleine sprachliche Marker wie „ultimative Referenz“ oder ein veralteter §20-Stand wurden als mögliche spätere LLM-Steuerungsrisiken behandelt.

## Bewusst ausgelassen

Ausgelassen wurden reine Bedien- und Toolmeldungen, Wiederholungen von Prompt-Texten, Dateilinks ohne neue Zustandsänderung, Zwischenstände der Python-Dateierzeugung und Bestätigungen ohne Auswirkung auf den weiteren Verlauf. Ebenfalls verdichtet wurden lange Promptkörper, sofern ihr Zweck, Status und ihre Wirkung im Verlauf erhalten blieben.
