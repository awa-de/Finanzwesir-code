# OA-02 Chronik und Archäologie des Entscheidungsfadens

Diese Chronik rekonstruiert ausführlich, wie sich der Arbeitsfaden zu OA-02 entwickelt hat, welche Denkbewegungen darin stattgefunden haben, welche Irrwege sich gezeigt haben, welche Korrekturen vorgenommen wurden und zu welchen belastbaren Beschlüssen die Arbeit schließlich geführt hat. Sie ist bewusst nicht nur als technische Zusammenfassung geschrieben, sondern als **arbeitsgeschichtliches Dokument**: Sie soll später nachvollziehbar machen, wie die Argumentation gereift ist, welche Fehlannahmen sich als teuer oder unproduktiv erwiesen und an welchen Stellen besonders gute architektonische Entscheidungen getroffen wurden.[file:126][file:127]

## Zweck dieser Chronik

Das Ziel dieser Datei ist doppelt. Erstens soll sie den vollständigen Weg von der unscharfen Ausgangsfrage bis zum aktuellen, deutlich präziseren Befund dokumentieren. Zweitens soll sie als späteres Lernartefakt dienen: Welche Umwege wären beim nächsten Mal vermeidbar, welche Prüfheuristiken haben sich bewährt und welche Art von Gegenprüfung durch Peer Reviews war besonders wertvoll.[file:126][file:127]

Die Chronik behandelt dabei nicht nur das **Endergebnis**, sondern ausdrücklich auch die Zwischenschritte: frühe Annahmen, falsche Rahmungen, Partiallösungen, nachträgliche Korrekturen und die Herausarbeitung der drei Dissense, die schließlich getrennt bearbeitet und in Claude-taugliche Übergabeprompts übersetzt wurden.[file:126][file:127][file:98]

## Ausgangslage

Der Faden startete aus einer praktischen Integrationsfrage rund um B1 und OA-02: Wie soll eine App-Fabrik-App mit Chart-Bedarf sauber an die bestehende ChartEngine angeschlossen werden, ohne einen Sonderweg zu bauen, ohne später alles wieder einreißen zu müssen und ohne zu früh zu viel festzulegen. Im Kern ging es um ein Spannungsverhältnis aus Skalierbarkeit, Flexibilität und Fundamentstärke.[file:126][file:127]

Das Ausgangsproblem war technisch, wurde aber von Anfang an als Architekturfrage behandelt. Schon früh stand im Raum, dass B1 zwar konkret gelöst werden muss, die Lösung aber zugleich für viele weitere Apps brauchbar sein soll. Damit verschob sich das Thema von „Wie baut man diesen einen Sparplan-Chart?“ zu „Wie schafft man eine Integrationsform, die für viele Apps tragfähig ist, ohne die Architektur zu verbiegen?“[file:126][file:98]

## Erste Denkphase: der lokale Adapter als plausible, aber zu enge Lösung

Eine frühe Position war die Idee eines **app-lokalen SparplanChart-Adapters** mit Lifecycle-API wie `mount`, `update` und `destroy`. Diese Lösung hatte reale Stärken: Sie respektierte, dass `app.js` bereits einen AppContext erzeugt, hielt die Sparplan-Simulation außerhalb der Engine und bot eine verständliche app-lokale Schnittstelle.[file:126]

Gerade deshalb war dieser Vorschlag gefährlich attraktiv. Er wirkte pragmatisch, slice-tauglich und sauber genug für einen ersten Pilot. Die spätere Analyse zeigte jedoch, dass diese Lösung B1 zu sehr zum Sonderfall machte. Sie hätte faktisch eine zweite Chart-Schicht etabliert – `app.js -> SparplanChart.js -> Chart.js` – und damit die Rolle der bestehenden ChartEngine als Single Source of Truth geschwächt.[file:126]

Rückblickend war dies ein klassischer Fall eines **lokal plausiblen, aber systemisch zu engen** Entwurfs. Positiv daran war, dass die richtigen Fragen bereits früh sichtbar wurden: Lifecycle, Update, Cleanup, Kapselung und AppContext. Falsch war primär die Platzierung dieser Fragen am falschen Objekt.[file:126]

## Zweite Denkphase: der Scope-Befund als erste große Korrektur

Die nächste wichtige Korrektur bestand darin, das Problem nicht mehr zuerst als „B1 braucht seinen eigenen Chart-Adapter“ zu sehen, sondern als **Scope-Problem der bestehenden Engine**. Der entscheidende Befund war: `ChartEngine.init()` scannt global per `document.querySelectorAll('.financial-chart-module')`, aber der Rest der Engine arbeitet bereits weitgehend containerbezogen. Das machte deutlich, dass der größte strukturelle Hebel zunächst am Einstieg lag, nicht in einer neuen Adapterklasse.[file:102][file:126]

Diese Erkenntnis war ein echter Fortschritt. Sie rückte die Lösung zurück zur vorhandenen Produktionsinfrastruktur, statt aus B1 heraus eine lokale Mini-Architektur zu erfinden. Außerdem passte sie sehr gut zur kurz zuvor mit ADR-COMP-ARCH-01 explizit gesetzten **Component Composition Architecture**: App als Kompositionsfläche, Komponenten als Bausteine, Engines/Renderer als Spezialwerkzeuge.[file:98][file:126]

Allerdings war dieser Scope-Befund nur eine Teilwahrheit. Er löste den Suchraum des DOM-Problems, aber noch nicht das Datenherkunfts- und Datenübergabeproblem. Genau dort begann die nächste Phase der Verfeinerung.[file:126]

## Dritte Denkphase: B1 ist nicht nur Scope, sondern auch Datenpipeline

Die nächste Reifung bestand darin, OA-02 sauber in Teilprobleme zu zerlegen. Die Diskussion arbeitete heraus, dass B1 eben **nicht nur** ein Chart im vorhandenen CSV-Sinn ist. B1 hat zwar historische MSCI-Daten aus CSV, aber der tatsächlich zu zeichnende Verlauf ist **nicht statisch**, sondern wird aus diesen Rohdaten und dem Sliderwert berechnet.[file:126][file:127]

Hier entstand eine entscheidende Korrektur einer früheren Fehlannahme: Anfangs war behauptet worden, B1 habe „keine CSV“ und deshalb könne die Scope-Lösung es nicht abdecken. Diese Aussage erwies sich als zu grob und wurde ausdrücklich zurückgenommen. Albert hatte zu Recht darauf hingewiesen, dass es sehr wohl eine CSV gibt; der Unterschied liegt darin, dass der finale Depotverlauf eine Funktion über diese CSV plus Sliderwert ist.[file:127]

Diese Korrektur war methodisch wichtig. Sie schärfte die Analyse vom falschen Gegensatz „CSV vs. Nicht-CSV“ hin zum präziseren Gegensatz „Rohdatenquelle vs. berechnete Darstellungsdaten“. Genau dadurch wurde klar, warum Scope allein nicht reicht und warum eine zweite Entscheidung zur Daten-Bridge notwendig ist.[file:126][file:127]

## Vierte Denkphase: Wo gehört die Simulationslogik hin?

Sobald klar war, dass der gezeichnete Verlauf berechnet wird, stellte sich die Frage: Soll diese Simulation in eine ChartEngine-Strategy wandern oder in `app.js` bleiben? Formal schien eine neue `SparplanStrategy` in der Engine zunächst attraktiv. Sie würde zum bestehenden Pipeline-Modell `CSVParser -> ChartEngine -> Strategy -> Renderer` passen, Smart Updates und Theming direkt nutzen und technisch elegant wirken.[file:126]

Gerade diese Eleganz erwies sich jedoch als irreführend. Die spätere Analyse zeigte, dass die Sparplan-Simulation keine reine Visualisierungstransformation ist, sondern **Domänenlogik**. B1 braucht dieselben Ergebnisse nicht nur für die Chart-Linie, sondern auch für KPI-Karten, A11y-Summary und spätere Entscheidungstexte. Würde die Berechnung in der ChartEngine-Strategy leben, müsste die App ihre eigenen Werte aus dem Renderer oder Chart-Metadaten zurückholen. Das wäre eine Umkehrung der Verantwortlichkeiten.[file:126][file:127]

Damit wurde **Option B – Simulation in `app.js`** zum starken Favoriten. Dies war einer der saubersten Punkte der ganzen Entwicklung: Hier zeigte sich, dass gute Architektur nicht heißt, alles maximal zentral zu machen, sondern Verantwortlichkeiten an der richtigen Stelle zu halten. Die App weiß, was ein Sparplan ist; die Engine weiß, wie man Daten visualisiert.[file:126][file:127]

## Fünfte Denkphase: Die fehlende Bridge wird sichtbar

Mit der Entscheidung „Simulation bleibt in `app.js`“ war das Problem allerdings noch nicht gelöst, sondern nur sauberer gestellt. Nun musste beantwortet werden, wie die App ihre berechneten, validierten und versiegelten Daten an die ChartEngine übergibt, ohne Chart.js direkt anzusprechen und ohne einen app-lokalen Sonderadapter zu bauen.[file:126]

Hier entstand die Idee einer **Bridge-API**, später unter dem Namen `renderFromData(container, data, type, options)` diskutiert. Diese Bridge sollte es ermöglichen, den CSV-Ladeschritt zu überspringen, aber weiterhin Strategies, Renderer, Theme, Tooltip, Legende, Smart Update und A11y der bestehenden Engine zu nutzen. Der entscheidende Fortschritt war: Nicht `app.js` zeichnet, sondern weiterhin die ChartEngine – nur über einen zweiten offiziellen Einstieg.[file:126][file:127]

Damit war OA-02 nicht länger eine diffuse „Chart-Integration“, sondern zerfiel in klarere Teilentscheidungen: Suchraum, Datenübergabe, Verantwortungsgrenzen und Lifecycle.[file:126]

## Die Rolle von ADR-COMP-ARCH-01: Das Architekturmodell wird explizit

Parallel oder im Hintergrund dieser Diskussion wurde das Architekturmodell formell geschärft: **Component Composition Architecture**. ADR-COMP-ARCH-01 stellte verbindlich klar, dass Finanzwesir-Apps komponierte Erlebnisflächen sind; die App ist das Lego-Brett, Komponenten sind die Steine, Engines und Renderer die Spezialwerkzeuge.[file:98]

Diese Entscheidung hatte enorme Wirkung auf die spätere Debatte. Sie verschob den mentalen Rahmen weg vom unglücklichen Modell „App mit Chart drumherum“ hin zum Modell „App-Komposition mit Chart-Komponente“. Der Begriff „normaler Chart vs. App-Chart“ wurde damit ausdrücklich als falsches Sondermodell zurückgewiesen.[file:98]

Rückblickend war das einer der stärksten Punkte des gesamten Fadens. Ohne dieses explizite Modell wäre die Diskussion ständig in praktische Detailfragen zurückgefallen und hätte immer wieder implizit die Chart-Sonderwelt reproduziert.[file:98]

## Die drei Dissense kristallisieren sich heraus

Im Laufe der Arbeit zeigte sich, dass scheinbar eine einzige OA-02-Frage in Wahrheit drei verschiedene Dissense enthält. Diese Trennung war ein methodischer Durchbruch, weil sie aus einer unklaren Grundsatzdebatte drei sauber adressierbare Entscheidungsräume machte.[file:126][file:127]

### Dissens 1: Gibt es zwei Welten oder nur App-Komposition?

Hier wurde geklärt, dass es im Zielbild **keine konkurrierende Architekturwelt „Standalone-Chart“ neben den Apps** gibt. Alles wird als App-Komposition gerahmt; Legacy-Verträge können fortbestehen, aber nicht als gleichrangiges Gegenmodell. Diese Klärung war vor allem sprachlich und architektonisch wichtig, weil APP-INTERFACE und ältere Formulierungen noch den Eindruck zweier nebeneinanderstehender Vertragstypen erzeugen konnten.[file:98][file:99]

### Dissens 2: Was wird vereinheitlicht – alles oder nur der Kern?

Hier wurde entschieden, dass nicht alles künstlich identisch gemacht werden muss. Vereinheitlicht werden soll der **interne Rendering-Kern**, während die Einstiegssignale explizit unterschiedlich bleiben dürfen: ein deklarativer Scan-/Init-Pfad für Legacy-/CSV-Container und ein Bridge-/Data-Pfad für berechnete App-Daten. Damit wurde die Mitte gefunden zwischen überharter Gleichmacherei und Sonderweg.[file:126][file:127]

### Dissens 3: Wie verhindert man Kollisionen im Markup?

Hier ging es nicht mehr primär um Architekturphilosophie, sondern um einen konkreten DOM- und Integrationskonflikt. Die Engine scannt heute `.financial-chart-module` und erwartet dort `data-csv`; wenn app-interne Zielcontainer gleich aussehen, drohen Fehlinitialisierung und Doppelzustände. Deshalb wurde als sauberste Lösung ein eigener In-App-Marker wie `fw-appchart` vorgeschlagen, der nicht vom deklarativen Scan eingesammelt wird, obwohl dieselbe Engine-Infrastruktur darunter arbeitet.[file:102][file:127]

## Irrungen und Wirrungen

Diese Chronik soll nicht so tun, als sei der Weg gradlinig gewesen. Mehrere Umwege waren wichtig genug, um sie ausdrücklich festzuhalten.

### Irrweg 1: B1 als Spezialfall mit eigenem App-Chart-Objekt

Die Idee eines eigenen `SparplanChart.js` war nachvollziehbar, weil sie Slice-4-kompatibel und lokal testbar schien. Sie unterschätzte aber, wie schnell aus einer bequemen Pilotlösung ein Architekturpräzedenzfall wird. Der spätere Befund war eindeutig: Das hätte die ChartEngine als Single Source of Truth geschwächt und künftige Sonderwege wahrscheinlicher gemacht.[file:126]

### Irrweg 2: Scope als vollständige Lösung

Die nächste Verengung bestand darin, Scope als fast vollständige Antwort zu lesen. Scope war ein sehr guter Befund, aber nur für den DOM-Einstieg. Er löste nicht die Frage der app-berechneten Daten, der Simulation, der KPI-Synchronität und der Bridge. Der Fortschritt bestand also nicht darin, dass Scope falsch war, sondern darin, Scope als **Teilantwort** zu verstehen.[file:126]

### Irrweg 3: „B1 hat keine CSV“

Diese Annahme wurde ausdrücklich korrigiert. B1 hat sehr wohl eine CSV als Rohdatenbasis; falsch war nur die Vorstellung, dass daraus schon direkt der zu zeichnende Verlauf folgt. Diese Korrektur war analytisch wichtig, weil sie den Unterschied zwischen Rohdaten und Darstellungsdaten sauber sichtbar machte.[file:127]

### Irrweg 4: Simulationslogik in die Strategy schieben

Das formale Pipeline-Denken verleitete dazu, Domänenlogik in Layer 3 unterzubringen. Erst die Multi-Konsumenten-Analyse – Chart, KPI, A11y, später Text – machte klar, warum das fachlich falsch ist. Das war eine der wertvollsten Einsichten des Fadens, weil sie den Unterschied zwischen Visualisierungstransformation und Fachlogik sauber herausarbeitete.[file:126][file:127]

### Irrweg 5: Pflicht-Scope zu schnell als Konsens behandeln

Ein weiterer Streitpunkt betraf die Frage, ob `init(scope)` als Pflichtparameter beschlossen sei. Ein Review behandelte dies bereits als faktischen Konsens. Die spätere Stellungnahme widersprach und argumentierte, dass ein Pflichtparameter aktive Verträge und Auto-Start-Pfade brechen würde, während ein Default-Parameter semantisch fast dasselbe leistet. Damit wurde sichtbar, dass vermeintlicher Konsens oft nur eine zu schnelle Verfestigung eines Teilvorschlags war.[file:127]

## Verdichtete Beschlüsse und Zwischenbeschlüsse

Im Laufe der Arbeit wurden mehrere Entscheidungen entweder gefasst, präzisiert oder in ihrem Status neu bewertet.

### Beschluss: Das Architekturmodell ist Component Composition Architecture

Dies war der grundlegende Rahmen. Er wurde nicht im Verlauf erfunden, sondern durch ADR-COMP-ARCH-01 explizit und kanonisch gemacht. Seine praktische Folge war, dass jede weitere OA-02-Frage innerhalb dieses Modells gelesen werden musste.[file:98]

### Beschluss: App-lokale Parallel-Chart-Infrastruktur wird verworfen

Der frühe `SparplanChart.js`-Gedanke wurde als zu lokal und langfristig schädlich verworfen. Die richtigen Lifecycle-Fragen bleiben relevant, aber sie wandern als Anforderungen an die Bridge und an den Engine-Vertrag weiter.[file:126]

### Beschluss: Die Sparplan-Simulation bleibt in `app.js`

Dies wurde im Faden zunehmend stabil und schließlich als stärkste Lösung begründet. Ausschlaggebend war vor allem das Multi-Konsumenten-Argument: Die Berechnung speist mehrere App-Bausteine, nicht nur den Chart.[file:127]

### Zwischenbeschluss: Es braucht eine offizielle Bridge für berechnete Daten

`renderFromData(...)` wurde als Name und Konzept immer deutlicher. Noch nicht final entschieden waren genaue Signatur, Validitätsvertrag und Lifecycle-Semantik, aber der Bedarf an einem offiziellen Bridge-Einstieg wurde eindeutig sichtbar.[file:126][file:127]

### Zwischenbeschluss: Smart Update und Lifecycle sind nicht Beiwerk

Mehrere Reviews betonten, dass `update`, `destroy`, Container-State-Reuse und Vermeidung doppelter Listener keine kosmetischen Zusatzfragen sind, sondern Teil des eigentlichen Vertrags. Dies war eine wichtige Reifung gegenüber früheren Architekturentwürfen, die sich zu stark auf den bloßen Einstieg konzentriert hatten.[file:126][file:127][file:102]

### Zwischenbeschluss: Verifikations-Gate vor Slice 4

Die spätere Stellungnahme formulierte einen expliziten Testblock V1–V5: `detectRhythm` mit synthetischen Monatsdaten, Transform-Pfad mit berechneten Daten, A11y-Renderpfad, Smart-Update-Zweig und Performance des Slider-Ticks. Auch wenn diese Tests noch nicht durchgeführt sind, wurde ihre Notwendigkeit klar dokumentiert.[file:127]

### Zwischenbeschluss: Markup-Rollen müssen getrennt werden

Für den In-App-Chart-Container wurde das getrennte Markup als plausibelste Lösung festgehalten. Noch nicht formell in den kanonischen Dokumenten umgesetzt, aber im Faden als bevorzugte Richtung konsolidiert, ist ein interner Marker wie `fw-appchart`, um Kollisionen mit `.financial-chart-module` zu vermeiden.[file:127][file:102]

## Eine wichtige Korrektur im Sprachbild: „Es gibt nur die Tür Apps“

Ein zentraler Moment im Faden war die Korrektur einer zu groben Metapher. Die Vorstellung zweier Türen – eine für Standalone-Charts, eine für In-App-Charts – wurde vom Nutzer ausdrücklich zurückgewiesen: „Diese zwei Türen gibt es nicht. Wir haben nur die Tür Apps. Es gibt keine Standalone-Charts.“ Diese Korrektur zwang dazu, die Sprache erneut zu präzisieren.[conversation_history]

Die sauberere Formulierung wurde daraufhin: Es gibt **eine Haustür – `fw-app` – aber unterschiedliche Zimmerrollen im Inneren**. Damit konnte der Dissens aufgelöst werden zwischen architektonischem Zielbild („alles ist App“) und Legacy-Bestandsschutz (`financial-chart-module` existiert als vorhandener Vertrag). Diese Korrektur war nicht bloß rhetorisch, sondern half, Dissens 1 klar von Dissens 3 zu trennen.[file:98][file:99]

## Vereinheitlichung neu verstanden

Später entstand eine weitere wichtige Schärfung: Wenn alles App ist, warum dann nicht alles vereinheitlichen? Die Antwort lautete schließlich: **Doch, aber auf der richtigen Ebene.** Vereinheitlicht werden soll der Renderkern, nicht zwangsläufig jede Form des Markups oder jeder Einstieg.[file:126][file:127]

Dies war eine reife Synthese. Sie verhinderte zwei Fehldeutungen zugleich: erstens die naive Totalvereinheitlichung, die Semantik und Vertragstypen verwischt hätte; zweitens die fortgesetzte Spezialbehandlung app-berechneter Charts. In dieser Phase wurde klar formuliert: nicht alles gleich aussehen lassen, sondern alles gleich rendern lassen.[file:126]

## Von der Debatte zur operationalisierbaren Übergabe

Ein späterer Schwerpunkt der Arbeit war nicht mehr die inhaltliche Architektur selbst, sondern die **Übersetzbarkeit in robuste Übergabeprompts** für Claude. Dieser Schritt war wichtig, weil die Entscheidungen zwar inhaltlich gereift waren, aber noch in unterschiedlicher Schärfe und mit hoher Kontexthistorie vorlagen.[conversation_history]

Dazu wurden zunächst drei einzelne, relativ ausführliche Dissens-Prompts entworfen, die jeweils das Warum, die betroffenen Dokumente und die gewünschten Änderungen erklärten. Danach entstand ein **Meta-Prompt**, der Claude zuerst auf Arbeitsmodus, Reihenfolge und Ergebnisformat einschwört, bevor jeweils ein einzelner Dissens nachgeschoben wird.[conversation_history]

Der Meta-Prompt diente als sessionstabiler Arbeitsrahmen. Später wurden alle vier Dateien – Meta plus Dissens 1 bis 3 – gezielt nachgeschärft, damit sie auch dann funktionieren, wenn der Kontext in Claude zwischen zwei Dissensen voll läuft und eine neue Session begonnen werden muss. Diese Nachschärfung war mehr als reine Promptpflege; sie war selbst eine Form von Architekturarbeit an der **Arbeitsmethode**.[conversation_history]

## Was in dieser Arbeitsweise besonders stark war

Diese Chronik soll ausdrücklich auch festhalten, was an der Arbeitsweise gut war.

### Stärke 1: Die Bereitschaft, das Problem neu zu rahmen

Der Faden blieb nicht an der erstbesten Lösung hängen. Mehrfach wurde das Problem auf eine höhere Ebene gehoben: vom einzelnen Chart zur Integrationsform, vom Scope-Detail zur Datenpipeline, vom technischen Streitpunkt zu drei klar getrennten Dissensen. Diese Fähigkeit zum **Reframing** war eine der stärksten Qualitäten des gesamten Prozesses.[file:126][file:127]

### Stärke 2: Falsche Annahmen wurden nicht kaschiert, sondern ausdrücklich zurückgenommen

Besonders die CSV-Korrektur ist hier hervorzuheben. Statt die frühere Aussage still verschwinden zu lassen, wurde offen dokumentiert, dass sie falsch oder zu eng war. Das stärkte die Qualität der späteren Analyse und ist ein wichtiges Arbeitsmuster für künftige Projekte.[file:127]

### Stärke 3: Die Trennung von Architektur und Implementierungshektik

Es wurde mehrfach bewusst gebremst, um nicht zu früh in Code zu springen. Gerade der Wunsch, zuerst ein Fundament zu legen, bevor Slice 4 umgesetzt wird, entsprach sehr klar dem ursprünglich formulierten Anspruch, „die Axt zu schärfen“. Die spätere Erstellung von Dokumenten- und Prompt-Artefakten ist Ausdruck dieser Stärke.[conversation_history]

### Stärke 4: Mehrere Reviewstimmen wurden nicht nur gezählt, sondern gegeneinander ausgewertet

Es wurde nicht der Fehler gemacht, mehrere Reviews einfach als Mehrheitsmeinung zu behandeln. Stattdessen wurden unterschiedliche Perspektiven – lokaler Adapter, Scope, neue Herleitung, Gegenstellung durch weitere Reviews – sachlich gegeneinander gelesen. Besonders wichtig war dabei der Befund, dass drei zustimmende Stimmen nicht automatisch drei verschiedene Argumente sind.[file:127]

## Welche Umwege sich in Zukunft vermutlich sparen lassen

Mehrere Lehren für künftige Vorhaben lassen sich schon jetzt benennen.

### Lehre 1: Früh zwischen Rohdatenquelle und Darstellungsdaten unterscheiden

Ein erheblicher Teil der Verwirrung entstand, weil zunächst zu grob in Kategorien wie „hat CSV / hat keine CSV“ gedacht wurde. Künftig sollte früher unterschieden werden zwischen **Quelle**, **Transformation** und **Darstellung**.[file:126][file:127]

### Lehre 2: Domänenlogik nicht aus Pipeline-Ästhetik in Infrastruktur schieben

Nur weil eine Berechnung formal gut in eine bestehende Pipeline passen würde, gehört sie noch lange nicht in deren Infrastruktur-Layer. Die Frage „Wer braucht das Ergebnis außer dem Chart?“ erwies sich als sehr gute Prüfheuristik.[file:127]

### Lehre 3: Früh zwischen Architektur-Dissensen und Implementierungsdetails trennen

Dass aus der einen OA-02-Frage später drei Dissense wurden, hätte vermutlich früher passieren können. Künftig lohnt es sich, komplexe Debatten früher in unabhängige Entscheidungsachsen zu zerlegen.[file:126][file:127]

### Lehre 4: Sprachbilder regelmäßig gegen das echte Architekturmodell prüfen

Die Metapher mit den zwei Türen war anschaulich, aber im Zielbild falsch. Das zeigt, dass Metaphern regelmäßig auf ihre Modelltreue geprüft werden müssen. Gute Metaphern helfen nur, wenn sie das tatsächliche Architekturmodell nicht heimlich verfälschen.[conversation_history]

## Wo wir am Ende dieses Fadens stehen

Am Ende dieses Fadens liegt noch kein fertig implementierter Code vor, aber die konzeptionelle Lage ist deutlich klarer als am Anfang. Aus einer unscharfen Chart-Integrationsfrage ist ein sauber gegliederter Entscheidungsraum geworden.[file:126][file:127]

Der aktuelle Stand lässt sich so zusammenfassen:

- Das Architekturmodell ist geklärt: **alles ist App-Komposition**.[file:98]
- Die frühere app-lokale Adapteridee ist verworfen.[file:126]
- Die Sparplan-Simulation bleibt in `app.js`.[file:127]
- Eine Bridge für berechnete Daten in die ChartEngine wird als notwendig angesehen.[file:126][file:127]
- Ein gemeinsamer Rendering-Kern mit expliziten Einstiegen ist das bevorzugte Zielbild.[file:126]
- Markup-Rollen zur Kollisionsvermeidung sollen getrennt werden.[file:127]
- Vor Slice 4 ist ein Verifikations-Gate nötig.[file:127]
- Für Claude existieren nun ein Meta-Prompt und drei dissensscharfe Übergabeprompts, die auch über Session-Grenzen hinweg nutzbar sind.[conversation_history]

## Offene Punkte aus Sicht der Chronik

Diese Chronik hält auch fest, was **noch nicht** abgeschlossen ist.

- Die kanonischen Dokumente müssen die drei Dissense noch tatsächlich produktiv übernehmen.
- Der genaue öffentliche Vertrag der Bridge (`renderFromData`, Signatur, Validitätsregeln, Handle) ist noch zu spezifizieren.
- Die Scope-Frage ist inhaltlich stark geklärt, aber zwischen Pflichtparameter und Defaultparameter noch nicht vollständig im Kanon fixiert.[file:126][file:127]
- Die Vault-Erweiterung im Strategy Paper oder in der ChartEngine-Rollenbeschreibung ist noch zu dokumentieren.[file:127][file:131]
- Die Verifikationsliste V1–V5 ist als Pflicht benannt, aber noch nicht abgearbeitet.[file:127]

## Schlussbeobachtung

Der wichtigste historische Befund dieses Fadens ist vielleicht nicht eine einzelne technische Entscheidung, sondern die Art der Reifung selbst. Der Prozess bewegte sich von einer symptomnahen Frage („Wie kriegen wir den Chart in die App?“) über mehrere plausible, aber zu enge Teilantworten hin zu einem deutlich robusteren Architekturverständnis: App-Komposition als Rahmen, Domänenlogik in der App, Visualisierung in der Engine, Bridge statt Sonderweg, Kollisionsvermeidung durch klare Marker, und dokumentierbare Entscheidungen statt stiller Annahmen.[file:98][file:126][file:127]

Wenn dieses Projekt später abgeschlossen ist, sollte diese Chronik daran erinnern, dass gute Architekturarbeit selten aus dem ersten richtigen Einfall besteht. Sie entsteht eher dadurch, dass falsche Rahmungen erkannt, gute Teilbefunde konserviert, Streitpunkte zerlegt und dann in eine sprachlich und dokumentarisch belastbare Form überführt werden. Genau das ist in diesem Faden mehrfach geschehen.[file:126][file:127]
