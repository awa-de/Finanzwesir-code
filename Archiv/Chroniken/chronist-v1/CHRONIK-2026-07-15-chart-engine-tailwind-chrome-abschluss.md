---
chronik_id: CHRONIK-2026-07-15-chart-engine-tailwind-chrome-abschluss
datum: 2026-07-15
projekt: finanzwesir-2-0
thema: chart-engine-tailwind-chrome-abschluss
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, sackgasse, konzept-vs-umsetzung, praezisierung-durch-gegenfrage, tooling-problem, annahme-verworfen]
---

# Chronik: Chart-Engine-Chrome von Inventur bis Cross-Type-Abschluss

**Hauptgegenstand:** Der Faden behandelte die gestaffelte Migration des DOM-Chrome der Chart-Engine auf den Tailwind-Baukasten. Er umfasste Inventur, Umsetzungsaufträge für Line, Bar und Donut/Pie, visuelle Abnahmen, Korrekturschleifen, Dokumentationsnachzüge, den Cross-Type-Nachweis und die Übergabe offener Folgearbeiten.

## Ausgangslage

Zu Beginn sollten die Steuerungs- und Sicherheitsquellen, der Fachprompt zur gestaffelten Chart-Engine-Entwicklung und die Architekturunterlagen zusammengeführt werden. Der Nutzer verlangte zunächst eine knappe Einordnung von Ziel, Aufgabe und Zusammenhang der Dateien und benannte den Faden anschließend. Als erster zulässiger Arbeitsschritt wurde CE-1 festgelegt: eine reine DOM- und Vertragsinventur ohne Codeänderung.

Die Rahmenannahme lautete: `tokens.css` blieb Designquelle für Farben und Fonts; Tailwind lieferte die HTML-Chrome-Struktur; `FwTheme` versorgte Canvas und Plugins. Chart.js-Canvas blieb für Achsen, Linien, Balken, Segmente, Tooltips, Marker und Plugins zuständig. Strategien sollten fachliche Bedarfe benennen, aber keine CSS-Klassen, Farben oder DOM-Rezepte besitzen.

## Chronologischer Verlauf

### Quellenabschluss und erste Grenzen

Für CE-1 wurde ein Claude-Prompt im lokalen Archiv angelegt. Die erste Rückgabe führte zu CE-1a, weil `BACKLOG.md` und `Apps/prokrastinations-preis/APP_SPEC.md` zunächst nur gezielt statt vollständig gelesen worden waren. CE-1a las beide Quellen vollständig nach und hielt fest, dass Rubikon-Overlay, App-A11y-Erwartungen und Canvas-Marker den Engine-DOM-Scope nicht erweiterten. F-05 blieb ein Dokumentationsbefund; F-06, die Popover-Scope-Frage, blieb vorerst getrennt.

CE-2 bereitete das gemeinsame Renderer-DOM-Fundament vor. Ein von Claude gewünschtes Playwright-Setup wurde nicht installiert. Statt Browser-Automation wurde die Grenze festgelegt: Statische Nachweise und von Albert manuell ausgeführte Browserprüfungen genügten; `engine-dom-check.js` wurde als lokales strukturelles Prüfwerkzeug aufgebaut.

### Line-Chrome und visuelle Korrekturschleifen

Nach CE-3 wurde die Testseite `line-ci.test.html` gegen das Baukasten-Mockup betrachtet. Der Nutzer beschrieb fehlenden Weißraum, aneinanderliegende Controls, nicht klar erkennbare Interaktivität und Pills, die eher wie Punkte mit Beschriftung wirkten. Die Beobachtung wurde nicht als unmittelbarer Designwechsel behandelt: Zunächst wurde geprüft, ob der Unterschied aus dem Tailwind-freien Fallback, den Container-Zonen oder aus dem Mockup-/Ist-Abstand stammte.

CE-3a änderte die Line-Anordnung begrenzt. Die Rückmeldung zeigte weiter fehlenden Vertikalrhythmus und abweichende Ausrichtung in Zone S. CE-3b stellte daraufhin im Tailwind-freien Fallback den Rhythmus wieder her, richtete die mobile View-Gruppe linksbündig aus und präzisierte Rand-/Hover-Signale der Pills. Die zugrundeliegenden Ursachen wurden als fehlender Fallback-Rhythmus, Reihenfolge der Kaskade und zu zurückhaltende Pill-Kontur protokolliert. Die manuelle optische Abnahme lautete anschließend „Alles einwandfrei“.

DOC-01 zog Konzept, Mockup und Testseitenstandard auf den abgenommenen Pill- und Responsive-Vertrag nach. Dabei wurde die spätere Anwendung auf weitere Apps als Grund für eine einheitliche Dokumentation ausdrücklich festgehalten.

### Bar-Chrome und Zentralisierung der Rezepte

CE-4 begann mit dem Bar-Chart-Chrome. Der Nutzer stellte die Frage, ob für Line bereits umgesetzte Controls und Pills parallel erneut implementiert würden. Daraufhin wurde der Auftrag umgestellt: Bestehende Line-Rezepte sollten nicht kopiert, sondern zu gemeinsamen Chrome-Primitiven verallgemeinert werden; Marker und fachlich abweichende Teile blieben typbezogen.

CE-4c ersetzte die zuvor entstandene Rezeptduplizierung durch gemeinsame `FW_CHROME_*`-Konstanten. Die Abnahme unterschied reguläre Mehrserien-Bars von Ranking-/Einzeldataset-Bars: Letztere erhielten bewusst keine erfundene Legende. Line, Bar und später aktiver Pie sollten denselben aktiven Legend-Pill-Grundvertrag verwenden.

DOC-02 und DOC-02a verankerten den semantischen Chrome-Auftrag in KDR 15, im Rucksack-Dokument und im Baukasten. Dabei wurde festgehalten, dass die technische Durchleitung eines expliziten Auftrags von Strategie zu Renderer ein Zielvertrag, aber noch kein Ist-Code war. Strategien sollten Wünsche wie Range-Control oder Legende äußern; der Renderer sollte die fertige Oberfläche bauen. Eine globale Registry wurde nicht eingeführt.

### Donut/Pie: Legendenbedeutung, Dämpfung und Fokus

Der CE-5-Preflight wurde GELB, weil die Donut-Legende bereits Segment-Ghosting auslöste, aber keiner der bestehenden Baukastenbegriffe diese Semantik vollständig beschrieb. Der Nutzer entschied, die bestehende Funktion und sichtbare Wirkung nicht zu verändern. DOC-03 führte deshalb die Bedeutung „Segment-Dämpfung umschalten“ als getrennten Bedarf nach: Ein Segment blieb sichtbar und die Daten blieben unverändert; Legende und Canvas sollten denselben Zustand vermitteln; der „Weitere …“-Drill-down blieb ein Canvas-Klickpfad.

Ein erster CE-5-Lauf stoppte ROT, weil Preflight und DOC-03 noch nicht committed waren. Nach der Klärung der Commit-Voraussetzung wurde die Pie-Umsetzung fortgesetzt. Die Legendeneinträge wurden als echte Buttons mit `aria-pressed` behandelt; die Dämpfung wurde aus dem realen Pie-Status gespiegelt.

In der anschließenden Browserprüfung traten unterschiedliche Tastatur-Fokusringe auf: Line und Bar zeigten schwarze native Ringe, Pie einen petrolfarbenen Ring; zwischen S/M/L unterschieden sich weitere Ringe. Das Visual Board enthielt bereits das fokussierte Segmented-Option-Rezept. Die Analyse ergab getrennte Fallback- und Selektorpfade. CE-5a bis CE-5c führten die Fokuswerte für Line, Bar und Pie auf den vorhandenen Tokenvertrag zurück, ohne neue Fokusoptik zu definieren.

Danach zeigte der Pie beim Hover eine grüne Innenfläche, Line und Bar nur eine grüne Umrandung. Die Prüfung ergab, dass Pie eine geschützte Alt-CSS-Basis weiterverwendete. DOC-04 legte fest: Aktive Legend-Pills teilen Ruhe-, Hover- und Fokusoptik; nur die fachliche Segment-Dämpfung bleibt Pie-spezifisch. CE-5d übernahm die gemeinsame `FW_CHROME_LEGEND_PILL_CLASS`-Basis auch für aktive Pie-Pills. Der Ghost-Zustand blieb begrenzt: gedämpftes Segment, verringerte Sichtbarkeit, keine aktive Hover-Wirkung.

DOC-04a ergänzte Visual Board und Konzept um den Pie-Ghost-Zustand. Die Folge von CE-5 bis CE-5d, DOC-04 und DOC-04a wurde anschließend committed.

### Cross-Type-Abschluss und Übergabe

CE-6 führte eine read-only Cross-Type-Abnahme durch. Der statische Nachweis bestätigte die gemeinsame `FW_CHROME_*`-Basis für Line, regulären Bar und aktiven Pie, die bewusste Abwesenheit einer Ranking-Bar-Legende, getrennte reale Zustandsquellen für Dataset-Sichtbarkeit und Segment-Dämpfung sowie die Grenzen zwischen DOM und Canvas. `engine-dom-check.js` blieb strukturell; `pie-segment-damping-interaction-check.js` war nur für Testseiten vorgesehen und stellte Zustände wieder her.

CE-6 blieb zunächst GELB, weil die reale S/M/L- und Werkzeug-Abnahme noch bei Albert lag. Nach dessen Rückmeldung „Alles ok“ aktualisierte CE-6a ausschließlich das Ergebnisprotokoll auf GRÜN. Die Ergebnisdatei und die zuvor abgenommenen Artefakte wurden gezielt committed.

Für den folgenden Faden wurde `claude_prompt_AP-chart-engine-02_folgearbeiten-merkblatt.md` ergänzt. Es erhielt den abgeschlossenen Engine-DOM-Stand, die Startregel für neue Charttypen und die vier getrennt gebliebenen Restpunkte.

## Wendepunkte

- Die gezielte statt vollständige Quellenlektüre führte von CE-1 zu CE-1a und zu einem ausdrücklich dokumentierten Quellenabschluss.
- Die visuelle Abnahme von Line-Chrome führte von einer angenommenen kosmetischen Änderung zu mehreren begrenzten Fallback- und Responsive-Korrekturen.
- Die Frage nach doppelt implementierten Bar-Rezepten führte von CE-4 zu CE-4c und zur Zentralisierung in `FW_CHROME_*`.
- Die unklare Donut-Legendenbedeutung führte vom GELB-Preflight zu DOC-03 und zur Festlegung der Segment-Dämpfung.
- Unterschiede bei Fokus- und Hover-Zuständen führten zu mehreren Analysen und Dokumentationsentscheidungen vor weiteren CSS-Änderungen.

## Entscheidungen und Festlegungen

- Canvas blieb Chart.js-/Plugin-Besitz; Tailwind-Chrome umfasste nur DOM-Oberfläche und Fallback. Status am Ende: gültig.
- `tokens.css` blieb Designquelle; Tailwind und `FwTheme` wurden als zwei Wege zu einem visuellen Vertrag behandelt. Status am Ende: gültig.
- Browser-Automation und Playwright-Installation wurden nicht Teil der Kette. Status am Ende: gültig für diesen Faden.
- Gemeinsame Legend-Pill-Rezepte sollten nicht nach Charttyp kopiert werden. Status am Ende: umgesetzt für Line, regulären Bar und aktiven Pie.
- Ranking-/Einzeldataset-Bar erhielt keine interaktive Legende. Status am Ende: gültig und geprüft.
- Donut/Pie behielt Segment-Dämpfung; Legendenklick löste keinen Drill-down aus. Status am Ende: gültig und geprüft.
- Aktive Line-/Bar-/Pie-Pills erhielten dieselbe Ruhe-, Hover- und Fokusoptik; Pie-Ghost blieb ein semantischer Sonderzustand. Status am Ende: gültig und geprüft.
- Der semantische Chrome-Auftrag blieb konzeptionell; seine technische Durchleitung wurde nicht in diese Kette gezogen. Status am Ende: offen.

## Irrwege, Schleifen und verworfene Ansätze

- Die anfänglich nicht vollständige Lektüre von `BACKLOG.md` und `APP_SPEC.md` wurde durch CE-1a ersetzt; die Vertragskarte änderte sich dadurch nicht.
- Eine Browsersteuerung über Playwright stand kurz im Raum, wurde aber nicht installiert. Die manuelle Prüfung und die lokalen Prüfscripts blieben der gewählte Nachweisweg.
- CE-4 enthielt zunächst eine Rezeptduplizierung zwischen Line und Bar. CE-4c führte die gemeinsame Rezeptbasis ein.
- Ein erster CE-5-Lauf wurde wegen nicht committeter Voraussetzungen nicht begonnen und als ROT protokolliert.
- Die Fokuskorrektur wurde nicht sofort verallgemeinert, weil Pie, Line und Bar unterschiedliche Fallback-Selektoren verwendeten. Die Korrektur erfolgte erst nach Analyse und Abgleich mit dem Visual Board.
- Die frühere Pie-Hoveroptik wurde nicht als typbezogene Variante beibehalten. Nach DOC-04 blieb nur der Ghost-Zustand typbezogen.

## Erzeugte Artefakte

- CE-1-, CE-1a-, CE-2- bis CE-6a-Claude-Prompts im lokalen Archiv: gestaffelte Arbeitsaufträge. Status am Ende: verwendet; CE-6a schloss die Kette ab.
- Ergebnisprotokolle in `docs/steering/patches/`: Nachweise, Scope-Gates und Abnahmezustände der CE-/DOC-Stufen. Status am Ende: CE-6 GRÜN und committed.
- `tools/engine-dom-check.js`: struktureller DOM-/A11y-Check. Status am Ende: als Testseitenwerkzeug vorhanden.
- `tools/pie-segment-damping-interaction-check.js`: Interaktionscheck mit Wiederherstellung des Pie-Zustands. Status am Ende: nur für manuelle Testseiten vorgesehen.
- DOC-01 bis DOC-04a: Nachzüge für Baukasten, Visual Board, KDR 15 und Rucksack. Status am Ende: committed.
- `claude_prompt_AP-chart-engine-02_folgearbeiten-merkblatt.md`: Merkblatt für den Folgefaden. Status am Ende: um CE-6-Übergabe ergänzt.

## Sachliche Erkenntnisse

- Gesicherter Stand: Ein gemeinsamer DOM-Chrome-Vertrag konnte verschiedene Charttypen bedienen, ohne Canvas-Physik oder Datenpfade umzubauen.
- Gesicherter Stand: Gleiches sichtbares Element erforderte auf Tailwind-freien Testseiten eigene Fallback-Regeln; die visuelle Abnahme machte Kaskaden- und Selektorunterschiede sichtbar.
- Gesicherter Stand: Eine Legende besitzt charttypspezifische Fachsemantik. Dataset-Sichtbarkeit, Segment-Dämpfung und keine Legende wurden getrennt behandelt.
- Arbeitsannahme: Künftige Charttypen können vorhandene Chrome-Bedarfe wiederverwenden, wenn ihre Semantik zuvor belegt wird.
- Offene Frage: Die technische Übergabe eines semantischen Chrome-Auftrags von Strategie zu Renderer war dokumentiert, aber nicht implementiert.

## Offene Punkte am Ende

- KDR 15 / §2.6: technischer Chrome-Auftrag von Strategie zu Renderer.
- F-06: Pie-Drill-down-Popover mit `document.body`-Anhang.
- Pie-Wrapper/-Titel: mögliche Vollmigration auf `FW_CHROME_*` erst nach Produktentscheidung.
- Donut-Kategorienliste oder andere Legendenbedeutung: erst Design-/Vertrags-AP, dann Renderer-Primitive.
- Die im Backlog geführten Canvas-, Plugin-, Rubikon-, Produktionsbuild- und weiteren App-Familienarbeiten blieben außerhalb dieses Fadens.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: vollständige Quellenlektüre wurde nach einer ersten Scope-Prüfung nachgezogen; visuelle Referenzen im Mockup und Testseiten-Fallback führten zu mehreren getrennten Korrekturschritten; wiederkehrende Abgrenzungen zwischen fachlicher Semantik, DOM-Chrome und Canvas bestimmten die Reihenfolge der APs; Ergebnisprotokolle und manuelle Browser-Abnahme wurden als Gates verwendet.

## Bewusst ausgelassen

Ausgelassen wurden vollständige Prompttexte, wiederholte Chat-Quittungen, einzelne Terminalausgaben, alle im Faden gezeigten Screenshots im Detail und bereits durch spätere Korrekturen ersetzte CSS-Einzelwerte. Die Inhalte der eingefügten Claude-Ergebnisdateien wurden nur soweit aufgenommen, wie sie den Arbeitsverlauf oder den Endstand veränderten.
