---
chronik_id: CHRONIK-2026-07-03-ap-prokrast-03-rubikon-screen
datum: 2026-07-03
projekt: finanzwesir-code
thema: ap-prokrast-03-rubikon-screen
beteiligte: [nutzer, chatgpt, claude]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: mit-anhaengen
schlagworte: [richtungswechsel, sackgasse, durchbruch, konzept-vs-umsetzung, annahme-verworfen, abbruchregel]
---

# Chronik: AP-prokrast-03 und der Rubikon-Screen

**Hauptgegenstand:** In diesem Faden wurde Screen 4 der App `Apps/prokrastinations-preis` weitergeführt, geprüft, verworfen, neu geschnitten und bis zur Abschluss-QA gebracht. Der zunächst verfolgte Weg einer animierten Achsenöffnung wurde über mehrere Prüf- und Peer-Review-Schleifen durch einen stehenden Rubikon-Screen mit leerem Zukunftsfeld und DOM-Overlay-Text ersetzt.

## Ausgangslage

Zu Beginn lag der Arbeitsstand aus AP-prokrast-03f/03g vor. Screen 4 war funktional gebaut worden: ein Chart zeigte echte Vergangenheitsdaten, der Zukunftsraum wurde über `xDisplayRange` geöffnet, `FwChartTextPlugin` war als technischer Baustein vorhanden, und CTA sowie A11y-Kopie waren eingebunden. Der manuelle Test hatte jedoch gezeigt, dass der Reveal zwar fachlich funktionierte, aber zackig und ruckartig wirkte. AP-prokrast-03g hatte als Ursache festgehalten, dass Chart.js 4.5.0 Scale-Bounds nicht nativ animiert. Als technischer Kompromiss stand C2 im Raum: vier diskrete `renderFromData()`-Schritte mit Zwischenwerten des `xDisplayRange`.

## Chronologischer Verlauf

### Prüfung der C2-Empfehlung und Peer-Review-Vorbereitung

Zunächst wurde die konkrete AP-03c/03g-Empfehlung kritisch geprüft. `FwChartTextPlugin.js` V1 war als Plugin für einfache Chart-Texte vorgesehen. Für Screen 4 galt die Frage, ob ein gestufter Reveal über mehrere `renderFromData()`-Aufrufe die holprige Achsenöffnung ausreichend ersetzen könne. Drei Peer Reviews zu C2 wurden zusammengeführt. Sie bestätigten C2 als systemkonformen kleinen technischen Weg, hielten aber fest, dass dadurch keine echte kontinuierliche Scale-Animation entstehe. Besonders wichtig wurde die Unterscheidung zwischen technischem Kompromiss und Produktwirkung.

### Wechsel von Technikfrage zu Dramaturgiefrage

Der Nutzer stellte die technische Richtung infrage und fragte, was geschehe, wenn die Animationsidee ganz verworfen werde. Daraus entstand ein Richtungswechsel: Nicht mehr „Wie wird die Achse doch smooth animiert?“ stand im Mittelpunkt, sondern „Wie fühlt der Nutzer den Wechsel von Rückspiegel zu Horizont?“. Es wurden psychologische und dramaturgische Alternativen gesammelt: leere Zukunftsfläche, Rubikon-Linie, Kapitelwechsel, Murmeltier-Motiv, textgeführter Empty State, Rückspiegel/Horizont-Bild.

Kurz wurde erwogen, eine stilisierte Zukunftskurve oder ein Symbolchart im rechten Feld zu zeigen. Diese Idee wurde verworfen, weil eine Linie im Chartkontext als Prognose gelesen werden konnte. Daraus folgte die Festlegung: keine Zukunftsgrafik, keine stilisierte Future-Kurve, keine Forecast-Andeutung.

### Breiter Dramaturgie-Review

Für eine weitere Peer-Review-Runde wurde ein Prompt erstellt: `peer_review_prompt_AP-prokrast-03h_dramaturgie-reset_rueckspiegel-horizont.md`. Er fasste die bisherige technische Sackgasse, die C2-Kompromisslage und die neue Frage nach einem dramaturgischen Reset zusammen. Die externen Reviews von GPT-5.5 Thinking, Claude Opus 4.8 und Perplexity wurden ausgewertet.

Der Konsens lautete: C2 sollte nicht als Hauptpfad weiterverfolgt werden; die Zukunft sollte leer bleiben; der Screen sollte als Rückspiegel/Horizont-Schwellenbild verstanden werden. GPT-5.5 formulierte die Richtung als „Kein Morph. Schnitt.“ Claude Opus betonte, die Animation sei die falsche Frage gewesen. Perplexity brachte als Einzelmeinung eine CSS-/DOM-Panel-Lösung als mögliche räumliche Öffnung ein. Diese Idee wurde nicht als Pflicht übernommen, aber als Hinweis festgehalten, dass räumliche Trennung außerhalb der Chart.js-Koordinatenwelt stattfinden könne.

### Vier Mindsets und Reduktion

Der Nutzer verlangte anschließend eine Prüfung mit vier Mindsets: Advocatus Diaboli, Ockhams Razor, Via Negativa und Charlie Mungers „Invert, always invert“. Daraus wurde der Arbeitsstand weiter reduziert. Der stehende Rubikon-Zustand blieb übrig: Vergangenheit links, Heute als Schwelle, Zukunft rechts leer, ein kurzer Text, Stille, CTA. Die alte Morph-Idee sollte nicht mehr im Kopf des Codes verbleiben. Diese Zuspitzung wurde vom Nutzer ausdrücklich bestätigt.

### AP-03h als Umsetzungs-Prompt

Daraufhin wurde der Prompt `claude_prompt_AP-prokrast-03h_stehender-rubikon-screen_rueckspiegel-horizont.md` erstellt. Er verlangte, Screen 4 ab Eintritt direkt im finalen 20-Jahres-Zustand zu rendern. C2, Morph, Zukunftsgrafik, Canvas-Haupttext und Achsenanimation wurden ausgeschlossen. Der vorgesehene Text lautete:

„Die letzten zehn Jahre sind gelaufen.

Die nächsten zehn sind leer.  
Noch.

Nicht weil nichts passiert —  
sondern weil niemand weiß, was.

Andere Krisen. Gleiche Zumutung.  
Der Job bleibt:  
dranbleiben, wenn es nervt.“

AP-03h wurde umgesetzt und meldete GELB. Die Morph-Idee und C2 waren entfernt, der finale Rubikon-Screen wurde beim Eintritt gerendert, CTA und A11y-Timing waren umgesetzt. Der Haupttext stand jedoch unter dem Chart. Der Nutzer erklärte, dass dadurch die Wirkung verpuffe und der Text rechts in das leere Feld müsse.

### Konflikt zwischen visueller Wirkung und A11y

Claude verwies auf die A11y-Vorgabe des AP-03h-Prompts: Canvas-Text über `FwChartTextPlugin` sei für Screenreader unsichtbar; der Haupttext müsse deshalb im DOM stehen. Daraus wurde ein Anforderungskonflikt sichtbar: Visuell sollte der Text im leeren Chartfeld erscheinen, semantisch sollte er DOM bleiben. ChatGPT schlug DOM-Overlay als Lösung vor: Der Text blieb ein echtes DOM-Element, wurde aber visuell über dem rechten leeren Zukunftsbereich positioniert. Canvas blieb Datenraum; DOM trug Bedeutung und Accessibility.

### AP-03h2 als Korrektur-Prompt

Es entstand der Folgeprompt `claude_prompt_AP-prokrast-03h2_dom-overlay-rubikon-text_rechtes-zukunftsfeld.md`. Er erlaubte nur `app.js`, `app.css` und ein Ergebnisprotokoll. Er verbot Canvas-Haupttext, `FwChartTextPlugin` als Hauptlösung, Chart.js-Internals, Zukunftsgrafik und C2-Rückkehr. Ziel war ein DOM-Overlay im rechten Zukunftsfeld.

AP-03h2 wurde ausgeführt. Das Ergebnisprotokoll meldete zunächst eine Korrekturschleife: Der Text war zu nah an der blauen Linie, weshalb CSS Custom Properties für die Position eingeführt wurden. Später wurde in der S-Zone korrigiert, weil „Die nächsten…“ noch links der blauen Linie begann. Der Mobile-Wert `--fw-rubikon-text-left` wurde von `56%` auf `68%` erhöht. Danach meldete der Nutzer, dass die Tests auf S/M/L bestanden hätten.

### AP-03i als Abschluss-QA

Nach AP-03h2 wurde AP-03i als reiner Claims-vs-Files-QA-Prompt erstellt: `claude_prompt_AP-prokrast-03i_abschluss-qa_screen-4_claims-vs-files.md`. Der Prompt verbot Reparaturen und prüfte Scope, C2-/Morph-Entfernung, finalen Rubikon-Zustand, Zukunftsdatenfreiheit, DOM-Overlay, A11y, CTA-Timing, Timer, Chart.js-Internals, Reduced Motion und mögliche Protokoll-Inkonsistenzen.

AP-03i wurde ausgeführt und meldete GRÜN. Die Claims-vs-Files-Prüfung bestand. Es wurden keine No-Go-Verletzungen gefunden. Das Ergebnisprotokoll bestätigte, dass nur `Apps/prokrastinations-preis/app.js` und `Apps/prokrastinations-preis/app.css` als Produktdateien verändert waren, dass kein Engine-/Plugin-/Strategy-/Spec-Diff vorlag, dass keine Zukunftsdaten oder Future-Line existierten und dass der Rubikon-Haupttext als DOM-Overlay umgesetzt war. AP-03i empfahl Commit nach ausdrücklicher Nutzerfreigabe.

### Rückgabe an den Master-Faden

Der Nutzer fragte, ob AP-03 abgeschlossen sei und an den Master-Faden zurückgegeben werden könne. ChatGPT bestätigte dies fachlich und erstellte einen Rückgabe-Text. Darin wurde festgehalten, dass AP-03 nicht als Achsenanimation abgeschlossen wurde, sondern als bewusste Produktentscheidung für einen reduzierten Rubikon-Screen: kein Morph, keine C2-Staffelung, keine Zukunftsgrafik, leerer Zukunftsraum, DOM-Overlay-Text und CTA nach Stille. Als nächster Prozesspunkt blieb Commit-Freigabe oder die Rückgabe mit dem Hinweis „commitfähig, Commit noch offen“.

## Wendepunkte

Der erste Wendepunkt trat ein, als der zackige AP-03f-Reveal nicht als bloßes Implementierungsproblem behandelt wurde, sondern AP-03g die Ursache in Chart.js-Scale-Bounds verortete. Dadurch wurde die technische Grundlage der ursprünglichen Animation infrage gestellt.

Der zweite Wendepunkt entstand, als der Nutzer die Frage stellte, was geschehe, wenn die Animationsidee ganz verworfen werde. Dadurch wechselte die Arbeit von technischer Optimierung zu dramaturgischer Neufassung.

Der dritte Wendepunkt lag in der Entscheidung gegen jede Zukunftsgrafik. Eine stilisierte Kurve wurde nicht weiterverfolgt, weil sie im Chartumfeld als Prognose hätte gelesen werden können.

Der vierte Wendepunkt entstand nach AP-03h: Der Text war zwar DOM und A11y-sauber, stand aber unter dem Chart. Dieser Zustand machte sichtbar, dass „DOM“ und „rechts im Feld“ nicht als Gegensätze behandelt werden mussten. Daraus folgte AP-03h2 mit DOM-Overlay.

Der letzte Wendepunkt war AP-03i. Die Abschluss-QA verwandelte die Implementierungskette in einen dateibasiert geprüften, commitfähigen Stand.

## Entscheidungen und Festlegungen

- Die C2-Staffelung wurde als Produktpfad verworfen. Sie blieb als technischer Kompromiss dokumentiert, wurde aber nicht umgesetzt. Status am Ende: verworfen.
- Die alte Morph-Idee wurde entfernt. Screen 4 sollte nicht mehr Initialzustand → Finalzustand als dramaturgischen Standard zeigen. Status am Ende: gültig.
- Die Zukunftsfläche blieb leer. Zukunftsdaten, Dummy-Datasets, Future-Line, Zickzack, Pfeile, Forecast-Korridor und Mini-Chart wurden ausgeschlossen. Status am Ende: gültig.
- Der Rubikon-Haupttext wurde als DOM-Text festgelegt. Canvas-Haupttext und `FwChartTextPlugin` als Hauptlösung wurden ausgeschlossen. Status am Ende: gültig.
- Die visuelle Position des Textes wurde als DOM-Overlay im rechten Zukunftsfeld festgelegt. Status am Ende: gültig.
- AP-03i wurde als read-only Claims-vs-Files-QA ausgeführt. Status am Ende: gültig.
- Commit wurde empfohlen, aber im vorliegenden Faden noch nicht ausgeführt. Status am Ende: offen.

## Irrwege, Schleifen und verworfene Ansätze

Die smooth animierte Achsenöffnung war der ursprüngliche Ansatz. Sie wurde nicht weiterverfolgt, nachdem AP-03f im manuellen Test ruckartig wirkte und AP-03g die fehlende Chart.js-Scale-Animation festhielt.

C2 war eine technische Schleife innerhalb dieser Richtung. Sie wurde geprüft, in Peer Reviews bestätigt und anschließend aus Produktgründen verworfen, weil sie nur eine gestufte Krücke gewesen wäre.

Eine stilisierte Zukunftsgrafik wurde kurz erwogen und verworfen. Die Klärung daraus lautete, dass selbst eine abstrakte Kurve im Chartumfeld als Prognose gelesen werden könne.

Der AP-03h-Zwischenstand mit Text unter dem Chart war technisch konsistent mit der A11y-Anforderung, verfehlte aber die gewünschte visuelle Wirkung. Daraus entstand die DOM-Overlay-Lösung.

Die Idee, `FwChartTextPlugin` für den Screen-4-Haupttext zu verwenden, blieb als technischer Hinweis vorhanden, wurde aber nicht genutzt. Der Grund war die Semantik- und A11y-Relevanz des Textes.

## Erzeugte Artefakte

- `peer_review_prompt_AP-prokrast-03h_dramaturgie-reset_rueckspiegel-horizont.md` – Peer-Review-Prompt zum Dramaturgie-Reset – finaler Zweck erfüllt.
- `claude_prompt_AP-prokrast-03h_dramaturgie-reset_rueckspiegel-horizont.md` – Zwischenfassung eines Umsetzungs-Prompts – durch später verschärfte Fassung ersetzt.
- `claude_prompt_AP-prokrast-03h_stehender-rubikon-screen_rueckspiegel-horizont.md` – Umsetzungs-Prompt für stehenden Rubikon-Screen – verwendet.
- `claude_prompt_AP-prokrast-03h2_dom-overlay-rubikon-text_rechtes-zukunftsfeld.md` – Korrektur-Prompt für DOM-Overlay im rechten Zukunftsfeld – verwendet.
- `claude_prompt_AP-prokrast-03i_abschluss-qa_screen-4_claims-vs-files.md` – Read-only Abschluss-QA-Prompt – verwendet.
- Rückgabe-Text an den Master-Faden – Zusammenfassung des AP-03-Endstands – Entwurf zur Übergabe.
- Ergebnisprotokolle AP-03f, AP-03g, AP-03h, AP-03h2, AP-03i – Nachweise der Teilstände – AP-03i meldete GRÜN.

## Sachliche Erkenntnisse

Gesicherter Stand am Ende war, dass Chart.js 4.5.0 Scale-Bounds nicht nativ animiert und dass ein glatter Scale-Morph für Screen 4 nicht über den vorhandenen ChartEngine-Vertrag erreicht wurde.

Gesicherter Stand war außerdem, dass der finale Screen keine Zukunftsdaten, keine Dummy-Datasets, keine Future-Line und keine Zukunftsgrafik enthielt.

Gesicherter Stand war, dass der Rubikon-Haupttext als DOM-Overlay umgesetzt wurde und nicht über Canvas oder `FwChartTextPlugin`.

Arbeitsannahme während des Fadens war zunächst, dass eine gestufte C2-Sequenz als akzeptabler Kompromiss dienen könnte. Diese Annahme wurde später verworfen.

Offen blieb im engeren Prozess nur der Commit, da im Faden keine ausdrückliche Commit-Freigabe gegeben wurde.

## Offene Punkte am Ende

Der Commit war am Ende noch nicht ausgeführt. AP-03i empfahl Commit nach expliziter Nutzerfreigabe.

Der Rückgabe-Text an den Master-Faden lag vor. Seine Verwendung im Master-Faden war noch nicht im Faden selbst erfolgt.

Nachgelagerte Themen wie Card-to-Point, Screen-3-Timing oder weitere Drehbuchverfeinerungen wurden ausdrücklich nicht mehr als Teil von AP-03 behandelt.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Ein technisches Artefakt (`FwChartTextPlugin`) wurde gebaut und blieb nützlich, wurde aber nicht als finale Produktlösung verwendet.

Für spätere Musteranalyse vormerken: Eine technische Einschränkung führte nicht zu einem Hack, sondern zu einem Wechsel der Produktdramaturgie.

Für spätere Musteranalyse vormerken: Peer Reviews wurden erst zur Technikfrage und später zur Produktfrage eingesetzt; der zweite Einsatz veränderte die Richtung stärker.

Für spätere Musteranalyse vormerken: A11y und visuelle Wirkung standen zunächst im Konflikt, wurden dann durch Layer-Trennung gelöst: Canvas als Datenbild, DOM als Bedeutung.

Für spätere Musteranalyse vormerken: Mehrere GELB-Zwischenstände wurden nicht als Abbruch behandelt, sondern als dokumentierte Klärungsstufen.

## Bewusst ausgelassen

Ausgelassen wurden kurze Bestätigungen, reine Statuswiederholungen ohne neue Zustandsänderung, Bedienrauschen bei Dateierzeugung, Zwischenformulierungen von Prompts, sofern sie durch spätere Prompts ersetzt wurden, und technische Tooldetails ohne Einfluss auf die AP-Entscheidungen.
