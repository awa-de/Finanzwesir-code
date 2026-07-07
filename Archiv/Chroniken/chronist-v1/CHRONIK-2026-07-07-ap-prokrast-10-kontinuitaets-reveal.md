---
chronik_id: CHRONIK-2026-07-07-ap-prokrast-10-kontinuitaets-reveal
datum: 2026-07-07
projekt: ap-prokrast
thema: screen3-kontinuitaets-reveal
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: mit-anhaengen
schlagworte: [richtungswechsel, sackgasse, missverstandene-anforderung, konzept-vs-umsetzung, annahme-verworfen, praezisierung-durch-gegenfrage, tooling-problem]
---

# Chronik: AP-prokrast-10 und der Wechsel vom Timing-Reveal zum Kontinuitäts-Reveal

**Hauptgegenstand:** Der Faden behandelte AP-prokrast-10 für die Prokrastinationspreis-App. Aus einem zunächst geplanten Screen-3-Timing-Reveal wurde nach Nutzerfeedback und Architekturklärung ein Kontinuitäts-Reveal, bei dem Screen 3 erhalten blieb, aber beim Eintritt nicht mehr wie ein Neustart wirkte.

## Ausgangslage

Der Nutzer brachte einen Fachprompt für `AP-prokrast-10_screen3-timing-reveal` und den taktischen Startprompt für operative LLM-Arbeit ein. Der Fachprompt beschrieb ein Timing-Problem auf Screen 3: Text, Chart und KPI-Karten erschienen synchron, obwohl ein gestufter Reveal vorgesehen war. Der taktische Startprompt regelte die Arbeitsweise: Anamnese vor Umsetzung, kleine APs, klare Lese- und Schreibscopes, Datei-Wahrheit vor Protokoll-Wahrheit, Python/Grep für deterministische Vorarbeit, Sonnet für Entscheidungen, keine Reparatur im Review-AP.

## Chronologischer Verlauf

### AP-10a wurde als Analyse-AP vorbereitet

Zunächst wurde geklärt, dass der Fachprompt das „Was“ und der taktische Startprompt das „Wie“ vorgab. Daraus entstand ein Claude-Prompt für `AP-prokrast-10a — Screen-3-Ist-/Sollanalyse Timing-Reveal`. Der Prompt war als Analyse-/Anamnese-AP ohne Implementierung geschnitten und erlaubte nur ein Ergebnisprotokoll unter `docs/steering/patches/AP-prokrast-10a_screen3-timing-analyse_Ergebnis.md`.

Der Nutzer bemängelte danach, dass die kopierbare Box durch innere Codefences als Webseiten-Mischmasch gerendert wurde. Daraufhin wurde das Ausgabeformat korrigiert: Prompts sollten in einem einzigen äußeren, ausreichend langen Markdown-Codeblock stehen. Diese Formatfrage beeinflusste die folgenden Prompt-Ausgaben.

### AP-10a zeigte den fehlenden Timing-Reveal

Der Nutzer brachte das AP-10a-Ergebnis zurück. AP-10a stand auf GELB, aber ohne Blocker. Der Befund lautete: Screen 3 zeigte keinen Timing-Reveal; Text, Chart und KPI-Karten wurden synchron gerendert. Der verbindliche Screen-3-Text war bereits exakt im Code vorhanden. `renderS3(currentRate)` erzeugte Chart und KPI synchron, `showScreen(3)` schaltete die Section sichtbar, Reduced Motion war für diesen Pfad nicht genutzt.

Aus diesem Stand wurde zunächst ein klassischer AP-10b-Zuschnitt abgeleitet: Text sofort, Chart nach 800 ms, KPI nach weiteren 800 ms, Reduced Motion sofort. Daraus entstand ein Claude-Prompt für `AP-prokrast-10b_screen3-timing-reveal-implementierung`.

### Der erste AP-10b-Zuschnitt wurde durch Nutzerfeedback in Frage gestellt

Nach der Umsetzung des ersten AP-10b-Zuschnitts zeigte der Nutzer Screenshots und beschrieb die Wirkung. Technisch funktionierte die Animation: Beim Klick auf „Ergebnis ansehen“ verschwand der alte Zustand, die Überschrift kam, der Chart mit blauer Linie erschien, danach die KPI-Karten. Die Wirkung wurde aber als psychologisch falsch beschrieben, weil der Übergang wie ein Neustart wirkte.

Der Nutzer formulierte eine andere Produktanforderung: Der bestehende Chart-Kontext sollte stabil bleiben, die blaue Ergebnislinie sollte erscheinen, danach sollte die Stationszeile „Station 8 von 8 · Bekannt bis Mai 2026“ verschwinden und an derselben unteren Stelle KPI-Karten und Disclaimer erscheinen. Daraus entstand ein neuer AP-10b-Prompt für `Screen-3 Kontinuitäts-Reveal Implementierung`. Dieser Prompt ersetzte den alten Text→Chart→KPI-Zuschnitt und formulierte den Übergang als Kontinuitätsproblem.

### Token-Sparsamkeit wurde als Arbeitsregel präzisiert

Während der neue AP-10b-Prompt lief, fragte der Nutzer, ob es sich um einen Sonnet-Denk-Task handele oder um einen stärker Python-/Haiku-geführten Task. Es wurde festgehalten, dass der Kern ein Sonnet-Denk-/Bau-Task sei, weil Architektur-, UX- und Implementierungsentscheidungen am realen Code zu treffen waren. Zugleich sollte die Ausführung token-sparsam sein: zuerst Python-/grep-Fundstellenkarte, dann gezieltes Lesen relevanter Zeilenbereiche, Haiku höchstens zur Grobsortierung langer Abschnitte.

Der Nutzer ergänzte danach die Regel: Token-sparsam dürfe nicht geizig heißen; wenn gedacht werden müsse, solle Sonnet genommen und der Preis bezahlt werden. Diese Präferenz wurde für künftige AP-/Claude-Prompts gespeichert.

### Der Architektur-Fork wurde sichtbar

Der Nutzer brachte ein Kontext-Dokument für ein unabhängiges Review ein. Darin wurde beschrieben, dass Screen 2 und Screen 3 getrennte DOM-Sections mit getrennten Chart-Containern und getrennten ChartEngine-Instanzen waren. Die im Auftrag genannte Stationszeile war real `progressEl` auf Screen 2. Screen 3 enthielt eigene Headline, Subline, eigenen Chartcontainer, KPI-Slot und Disclaimer. Das Dokument benannte zwei Lesarten: Reveal vollständig auf Screen 2 oder Screenwechsel zu Screen 3 mit weichem sichtbaren Übergang.

Zunächst wurde daraus abgeleitet, dass Lesart A, ein Ergebnis-Reveal im sichtbaren Screen-2-Kontext, psychologisch am nächsten an der Nutzeranforderung lag. Der Nutzer widersprach dieser Richtung teilweise und schlug vor, weiter zu Screen 3 zu wechseln, aber den sichtbaren Zustand so ähnlich zu halten, dass der Nutzer keinen Bruch wahrnimmt. Dadurch blieb das 4-Screen-Schema erhalten.

### Perplexity-Material führte zur Variante B++

Der Nutzer brachte eine Perplexity-Bewertung ein. Diese argumentierte, dass Lesart B produktlich korrekt sei, weil Screen 3 der semantische Ergebnis-Screen bleibe und der harte Reset durch einen besser vorbereiteten Screen-3-Eintritt gelöst werden könne. Perplexity schlug unter anderem Warm-up-Render, Bridge-Element und Crossfade zu KPI/Disclaimer vor.

Die Antwort wurde mit der bisherigen Einschätzung legiert. Daraus entstand die Variante B++: Screen 2 bleibt Journey, Screen 3 bleibt Ergebnis, `showScreen(3, true)` bleibt erlaubt, Screen 3 muss aber beim Eintritt stabil wirken. Chart und Ergebnislinie sollten sofort/still erscheinen, darunter zunächst ein Screen-3-lokales Bridge-Element mit „Station X von Y · Bekannt bis Z“, danach KPI-Karten und Disclaimer. Warm-up in einer hidden Section und CSS-Overlay für die Linie wurden nicht blind übernommen, sondern als prüfpflichtig oder riskant markiert.

Der Nutzer präzisierte zwei Punkte: Für die blaue Linie gebe es bereits ein Plugin; ein CSS-Overlay solle daher nicht gebaut werden. Die Headline-Frage solle nicht in AP-10b entschieden werden, weil Strings später ohnehin finetuned würden. Daraufhin wurde der AP-10b-Kurs erneut geschärft: bestehender `verticalLine`-/Plugin-Pfad statt CSS-Overlay, keine Headline-/String-Änderung.

### Claude erhielt eine Nachsteuerung, um den bestehenden Pfad zu verlassen

Claude meldete während der Arbeit, dass es den Architektur-Fork erkannt habe: Die Stationszeile sei eindeutig ein Screen-2-Element, während der Prompt deren Ersetzung auf Screen 3 beschreibe. Der Nutzer bat um einen Prompt, der Claude „die Kurve kriegen“ lasse.

Es entstand der Nachsteuerungs-Prompt `claude_nachsteuerung_AP-prokrast-10b_variante-B-plusplus.md`. Er entschied verbindlich Variante B++: kein Screen-2-Ergebnismodus, kein Verschieben von `progressEl`, Screen-3-lokales Bridge-Element, bestehender Plugin-Pfad für die Ergebnislinie, keine CSS-Overlay-Linie, keine Textentscheidung, keine Engine-/Plugin-Dateiänderung. Der Prompt enthielt auch Regeln zum Umgang mit bereits begonnenen Änderungen aus dem verworfenen AP-10b-Pfad.

### AP-10b wurde umgesetzt und AP-10c als Review-AP vorbereitet

Claude meldete AP-10b danach als GRÜN. Der Kontinuitäts-Reveal war gebaut: Chart und Ergebnislinie erschienen sofort, vollständig und still; nur Bridge→KPI/Disclaimer war gestuft. `progressEl` blieb auf Screen 2; `bridgeS3` wurde auf Screen 3 gebaut; `verticalLine:'last'` nutzte den Plugin-Pfad; die Ergebnislinie selbst blieb nicht animiert, weil das Plugin statisch zeichnete. Der Nutzer akzeptierte dies. Reduced Motion war code-seitig korrekt, aber browserseitig noch nicht bestätigt; S/M/L waren offen.

Daraufhin wurde ein read-only Claude-Prompt für `AP-prokrast-10c — Abschluss-QA Claims-vs-Files / Timing / Regression` erstellt. Dieser sollte AP-10b gegen reale Dateien prüfen, Scope-Diffs klassifizieren, alte AP-10b-Artefakte einordnen, Reduced Motion und S/M/L ehrlich als offen oder bestätigt markieren und keine Reparaturen vornehmen.

### AP-10c stellte GELB wegen zweier nicht-codebezogener Punkte fest

Claude meldete AP-10c mit Status GELB. Der eigentliche Kontinuitäts-Reveal wurde code-seitig bestätigt; Scope, Engine-/Spec-/QA-/Datenabgrenzung und Regression waren sauber. Zwei Punkte hielten die Freigabe zurück: Das alte, verworfene AP-10b-Protokoll `AP-prokrast-10b_screen3-timing-reveal_implementierung_Ergebnis.md` behauptete weiterhin GRÜN für eine nicht mehr existierende Implementierung, und Reduced Motion sowie S/M/L waren zum Zeitpunkt von AP-10c browserseitig offen.

Zunächst wurde vorgeschlagen, das alte Protokoll nicht zu committen oder zu löschen. Der Nutzer erklärte, dass er es forensisch behalten wolle. Daraus wurde die Entscheidung abgeleitet, die Datei nicht zu löschen, sondern mit einem eindeutigen Warnheader zu versehen.

### AP-10d schloss mit Warnheader und Rücklaufkapsel ab

Für AP-10d entstand ein Prompt mit zwei erlaubten Schreibzielen: Warnheader in das überholte AP-10b-Protokoll und Rücklaufkapsel `AP-prokrast-10d_ruecklaufkapsel_master_Ergebnis.md`. Der Prompt hielt fest, dass S/M/L und Reduced Motion nach AP-10c von Albert browserseitig als ok bestätigt wurden, dies aber nicht als von Claude selbst durchgeführter Browser-Test formuliert werden durfte.

Claude meldete AP-10d als GRÜN. Der Warnheader wurde einmalig an Position 1 der alten AP-10b-Datei gesetzt, die Rücklaufkapsel wurde erstellt, AP-10 wurde als abgeschlossen markiert und der Master-Rücklauf freigegeben. Die Kapsel empfahl, `app.js`, `app.css`, AP-10a, das maßgebliche AP-10b-Protokoll, AP-10c und AP-10d in den Commit aufzunehmen; das alte AP-10b-Protokoll sei mit Warnheader bewusst committable, das Review-Kontextartefakt optional, `.claude/learning/session-log.md` nicht mitzuziehen.

## Wendepunkte

Der erste Wendepunkt lag nach AP-10a: Aus dem synchronen Screen-3-Zustand wurde zunächst ein klassischer Timing-Reveal abgeleitet.

Der zweite Wendepunkt entstand durch die Nutzer-Screenshots und die Rückmeldung, dass der technisch gebaute Timing-Reveal psychologisch wie ein Neustart wirkte. Dadurch wurde die Frage vom Timing innerhalb von Screen 3 auf die Kontinuität zwischen Screen 2 und Screen 3 verschoben.

Der dritte Wendepunkt lag im Architektur-Fork: Die Stationszeile war real Screen-2-Element, während KPI und Disclaimer auf Screen 3 lagen. Daraus entstanden die Lesarten Screen-2-Ergebnismodus oder weicher Screen-3-Eintritt.

Der vierte Wendepunkt war die Festlegung auf Variante B++: Screen 3 blieb Zielscreen, aber sein Eintritt musste stabil wirken. Damit wurde weder Screen 2 zum Ergebnis-Screen umgebaut noch der alte Timing-Reveal fortgeführt.

Der fünfte Wendepunkt betraf das alte AP-10b-Protokoll. Statt es zu löschen, entschied der Nutzer, es forensisch zu behalten und durch Warnheader als nicht maßgeblich zu markieren.

## Entscheidungen und Festlegungen

- AP-10a wurde als Analyse-AP ohne Implementierung geschnitten · früh im Verlauf · Grundlage war der taktische Startprompt mit kleiner AP-Kette · Status am Ende: gültig.
- Der erste AP-10b-Zuschnitt „Text → Chart → KPI“ wurde erstellt · nach AP-10a · Grundlage war der Befund eines fehlenden Screen-3-Timings · Status am Ende: ersetzt.
- Token-sparsamkeit wurde präzisiert · während AP-10b · zuerst Fundstellenkarte, dann gezieltes Lesen, Haiku nur optional; Sonnet bei Denk-/Bau-Tasks · Status am Ende: gültig.
- „Sparsam, nicht geizig“ wurde als künftige Arbeitsregel festgehalten · während AP-10b · Qualität sollte Vorrang vor Scheinsparen haben · Status am Ende: gültig.
- Variante B++ wurde final entschieden · nach Review-Kontext und Perplexity-Material · Screen 3 blieb Ergebnis-Screen, Screen 2 blieb Journey, der Eintritt wurde zum Kontinuitäts-Reveal · Status am Ende: gültig.
- CSS-Overlay für die Ergebnislinie wurde verworfen · nach Nutzerhinweis auf vorhandenes Plugin · bestehender Plugin-Pfad sollte die Chart-Geometrie tragen · Status am Ende: verworfen.
- Headline-/String-Fragen wurden aus AP-10b herausgenommen · nach Nutzerhinweis auf späteres Finetuning · Status am Ende: offen für spätere Textarbeit.
- Das alte AP-10b-Protokoll wurde nicht gelöscht · nach AP-10c · Forensik sollte erhalten bleiben, Warnheader sollte Verwechslung verhindern · Status am Ende: gültig.
- AP-10 wurde nach AP-10d als abgeschlossen und masterfähig markiert · am Ende · Warnheader und Browserbestätigung lösten die AP-10c-GELB-Punkte · Status am Ende: gültig.

## Irrwege, Schleifen und verworfene Ansätze

Der erste verworfene Ansatz war der ursprüngliche Screen-3-Timing-Reveal. Er wurde gebaut und dokumentiert, passte aber nicht zur vom Nutzer beobachteten Wirkung. Er blieb als forensisches Artefakt erhalten und erhielt später einen Warnheader.

Ein zweiter verworfener Ansatz war der Gedanke, die gesamte Ergebnis-Enthüllung auf Screen 2 zu verlegen. Er entstand aus der Tatsache, dass die Stationszeile real auf Screen 2 lag. Der Nutzer stellte dagegen die Möglichkeit, weiter zu Screen 3 zu wechseln und den sichtbaren Zustand dort stabil zu halten. Daraus entstand Variante B++.

Ein dritter verworfener Ansatz war eine app-lokale CSS-Overlay-Linie. Sie wurde wegen möglicher S/M/L-Positionierungsrisiken nur als Notlösung diskutiert und nach dem Nutzerhinweis auf das vorhandene Plugin gestrichen.

Eine kleinere Schleife betraf die Frage, ob die Headlines identisch gehalten werden müssten. Der Nutzer verschob diese Entscheidung ins spätere Finetuning; AP-10b sollte keine Textentscheidung treffen.

## Erzeugte Artefakte

- `claude_prompt_AP-prokrast-10a_screen3-timing-analyse.md` – Claude-Prompt für Analyse/Ist-Soll-Prüfung – Status am Ende: final für AP-10a.
- `AP-prokrast-10a_screen3-timing-analyse_Ergebnis.md` – Analyseprotokoll mit GELB ohne Blocker – Status am Ende: gültig.
- `claude_prompt_AP-prokrast-10b_screen3-timing-reveal-implementierung.md` – erster Implementierungsprompt Text→Chart→KPI – Status am Ende: ersetzt.
- `AP-prokrast-10b_screen3-timing-reveal_implementierung_Ergebnis.md` – Protokoll des verworfenen ersten AP-10b-Zuschnitts – Status am Ende: forensisch erhalten, mit Warnheader nicht maßgeblich.
- `AP-prokrast-10b_screen2-screen3-kontinuitaet_llm-review-kontext.md` – neutrales Kontextdokument zur Architekturfrage – Status am Ende: optionales Kontextartefakt.
- `claude_prompt_AP-prokrast-10b_screen3-kontinuitaets-reveal-implementierung.md` – zweiter Implementierungsprompt für Kontinuitäts-Reveal – Status am Ende: ersetzt durch Nachsteuerung/konkretisiert.
- `claude_nachsteuerung_AP-prokrast-10b_variante-B-plusplus.md` – Nachsteuerung für Claude, um den Architektur-Fork auf Variante B++ zu entscheiden – Status am Ende: gültig als Steuerungsartefakt.
- `AP-prokrast-10b_screen3-kontinuitaets-reveal_implementierung_Ergebnis.md` – maßgebliches AP-10b-Ergebnisprotokoll – Status am Ende: final.
- `claude_prompt_AP-prokrast-10c_abschluss-qa_claims-vs-files-timing.md` – read-only QA-Prompt – Status am Ende: final für AP-10c.
- `AP-prokrast-10c_abschluss-qa_claims-vs-files_timing_Ergebnis.md` – QA-Protokoll mit GELB wegen Forensik-/Browser-QA-Punkten – Status am Ende: durch AP-10d aufgelöst.
- `claude_prompt_AP-prokrast-10d_warnheader-ruecklaufkapsel.md` – Abschluss-Prompt für Warnheader und Rücklaufkapsel – Status am Ende: final.
- `AP-prokrast-10d_ruecklaufkapsel_master_Ergebnis.md` – Rücklaufkapsel an Masterfaden – Status am Ende: final.

## Sachliche Erkenntnisse

Gesicherter Stand: Screen 2 und Screen 3 waren getrennte Sections mit getrennten Chart-Containern und ChartEngine-Instanzen. Die im Produkttext gemeinte Stationszeile lag real als `progressEl` auf Screen 2. KPI-Slot und Disclaimer lagen auf Screen 3.

Gesicherter Stand: Eine reine zeitliche Staffelung innerhalb von Screen 3 löste nicht das vom Nutzer beschriebene Kontinuitätsproblem. Der Übergang musste so gestaltet werden, dass der Eintritt in Screen 3 wie eine Fortsetzung des letzten Screen-2-Zustands wirkte.

Gesicherter Stand: Die Ergebnislinie sollte über den bestehenden Plugin-/Optionspfad `verticalLine:'last'` laufen. Eine app-lokale Overlay-Linie wurde nicht gebaut.

Gesicherter Stand: Die Ergebnislinie selbst blieb nicht animiert, weil das bestehende Plugin statisch zeichnete. Der Nutzer akzeptierte „so lassen“.

Gesicherter Stand: AP-10 änderte final `app.js`, `app.css` und mehrere Steering-Protokolle. Engine, Plugins, Spec, Drehbuch, QA_TEST_CASES, Stations- und Datendateien blieben unverändert.

Arbeitsannahme: Der alte AP-10b-Zuschnitt sollte für Forensik/Chronik erhalten bleiben. Diese Annahme wurde durch den Nutzer bestätigt und durch Warnheader abgesichert.

Spätere Korrektur: AP-10c vergab zunächst GELB, weil S/M/L und Reduced Motion browserseitig offen waren. Nach Nutzerbestätigung und Warnheader wurde AP-10d GRÜN.

## Offene Punkte am Ende

Für AP-10 selbst blieben keine harten offenen Punkte. Offen blieb nur die bewusste Commit-Auswahl: ob das Review-Kontextartefakt mitcommitted wird und ob das alte AP-10b-Protokoll mit Warnheader ebenfalls in den Commit aufgenommen wird.

Nicht-blockierend blieb ein CSS-`var()`-Fallback, der noch `400ms` zeigte, obwohl die Variable auf `800ms` stand. AP-10c hatte dies als kosmetisch und folgenlos klassifiziert.

QA_TEST_CASES.md konnte später um einen expliziten Kontinuitäts-Reveal-Test ergänzt werden. Diese Änderung lag außerhalb des AP-10-Scopes.

Headline- und String-Finetuning zwischen Screen 2 und Screen 3 blieb bewusst außerhalb von AP-10.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Ein technisch erfüllter Prompt konnte ein Produktproblem verfehlen, wenn der Prompt das sichtbare Erleben zu eng als Timing innerhalb eines Screens fasste.

Für spätere Musteranalyse vormerken: Der Nutzer steuerte wirksam über konkrete Screenshots und eine Beschreibung der psychologischen Wirkung nach, nicht über Codebefunde.

Für spätere Musteranalyse vormerken: Die Trennung von Write-AP und read-only QA-AP machte ein nicht-codebezogenes Risiko sichtbar: ein altes Ergebnisprotokoll mit widersprüchlicher Statuswahrheit.

Für spätere Musteranalyse vormerken: Forensische Artefakte wurden nicht gelöscht, sondern mit Warnheadern gesichert. Dadurch blieb der Arbeitsweg sichtbar, ohne die aktuelle Datei-Wahrheit zu verfälschen.

Für spätere Musteranalyse vormerken: Token-Sparsamkeit wurde als Prozessziel beibehalten, aber ausdrücklich Sonnet-/Qualitätsvorrang für Denk- und Architekturaufgaben festgelegt.

## Bewusst ausgelassen

Ausgelassen wurden einzelne Downloadlinks, wiederholte Statusformulierungen, reine Bedienhinweise, detaillierte Codezeilen ohne Einfluss auf den Verlauf, mehrfach wiederholte Commit-Hinweise und Zwischenformulierungen der Promptdateien. Erhalten wurden die Artefakte, Richtungswechsel, Entscheidungen, verworfenen Ansätze und die Punkte, die den weiteren Verlauf veränderten.
