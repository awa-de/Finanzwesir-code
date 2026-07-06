---
chronik_id: CHRONIK-2026-07-06-ap-prokrast-07-rubikon-symbolmarkers
datum: 2026-07-06
projekt: ap-prokrast
thema: ap-07-rubikon-symbolmarkers
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: mit-anhaengen
schlagworte: [scope-drift, richtungswechsel, missverstandene-anforderung, externe-abhaengigkeit, annahme-verworfen]
---

# Chronik: AP-prokrast-07 — RubikonSymbolMarkers und Abschlussprüfung

**Hauptgegenstand:** Der Faden behandelte AP-prokrast-07, den Bau der bereits entschiedenen ✅/❓-Symbolik an der Rubikon-Linie in Screen 4 der Prokrastinationspreis-App. Der Nutzer ließ zunächst Fachprompt und technischen Startprompt einordnen, danach eine Prompt-Kette für Claude Code erstellen, Rückläufe bewerten und am Ende eine Rücklaufkapsel für den Masterfaden absichern.

## Ausgangslage

Der Nutzer stellte zwei Prompts bereit: den Fachprompt für AP-prokrast-07 und den taktischen Startprompt für operative LLM-Arbeit. AP-07 war als enger Bau-AP definiert: ✅ links und ❓ rechts der blauen Rubikon-Linie, rein visuell, über `FwChartTextPlugin.js`, ohne DOM, A11y-Pflicht, Live-Region, Fokus, Datenpunkte, Future-Line, Prognose, Interaktion oder CTA. Der technische Startprompt lieferte die Arbeitsregeln: Anamnese zuerst, kleine APs, Datei-Wahrheit vor Protokoll, getrennte Write- und QA-APs, Python/Haiku/Sonnet-Arbeitsteilung und kein Commit ohne Freigabe.

## Chronologischer Verlauf

### Einordnung der beiden Prompts

ChatGPT las die beiden Prompts und stellte die Rollenverteilung dar: Der Fachprompt bestimmte Ziel, Scope, erlaubte und verbotene Dateien, TC-F05 und Rücklaufstruktur; der technische Startprompt bestimmte die Arbeitsdisziplin. Daraus wurde eine interne Kette abgeleitet: AP-prokrast-07a Implementierung, AP-prokrast-07b Abschluss-QA, AP-prokrast-07c Rücklaufkapsel.

### Erste Prompt-Kette und Korrektur der Arbeitsweise

Der Nutzer verlangte zunächst alle Prompts als Markdown-Datei und in einer einzigen Codebox. ChatGPT erzeugte eine Datei mit Prompts für 07a, 07b und 07c. Danach korrigierte der Nutzer die Arbeitsweise: Er wollte nicht die gesamte Kette auf einmal, sondern jeweils nur den nächsten Prompt, danach Feedback und gegebenenfalls Anpassung der Folgeschritte. ChatGPT stellte daraufhin AP-07a separat als Markdown-Datei und kopierbaren Code bereit.

### Rücklauf aus AP-07a und Advocatus-Diaboli-Frage

Nach Claude Codes AP-07a-Rücklauf brachte der Nutzer mehrere Punkte ein: Claude hatte auf eine formale CSS-DoD-Lücke hingewiesen, offene manuelle Tests genannt und den Advocatus-Diaboli-Punkt zur Positionierung formuliert. Dieser Punkt betraf die Gefahr, dass eine Monats-Bruchrechnung in `app.js` nicht exakt mit der Chart.js-Pixelposition der blauen Linie übereinstimmte. Aus dem AP-07a-Protokoll ergab sich später, dass Claude dieses Risiko durch `anchor:'lastPoint'` in `FwChartTextPlugin.js` strukturell beseitigt hatte: Marker und `FwVerticalLinePlugin` bezogen sich auf denselben letzten Datenpunkt über `chart.getDatasetMeta(0)`.

### Commit-Wunsch und Stop-Entscheidung

Claude meldete anschließend sinngemäß, alles sei erledigt und ein Commit könne erfolgen. ChatGPT widersprach. Der damalige Stand enthielt noch AP-prokrast-07c als eingeschobene CSS-Feinjustierung, die selbst GELB war, AP-07b war noch nicht durchgeführt, M war als Restpunkt offen und der Font-Folgeauftrag musste nach oben getragen werden. Daraus entstand ein angepasster AP-07b-Prompt, der nicht nur 07a, sondern die reale Kette aus 07a und eingeschobenem 07c prüfen sollte. Er blockierte Commit bis zur Prüfung von TC-F05, M, Font-Folgeauftrag, Scope und den Steering-/Memory-Dateien.

### AP-07b und die Gelb-Bewertung

Claude führte AP-07b aus und meldete GELB. Die QA bestätigte AP-07a als GRÜN, den Advocatus-Diaboli-Punkt als erledigt, die Datenwahrheit und Scope-QA als bestanden. Die zuvor genannte CSS-Konventionslücke wurde entkräftet, weil `CSS-KONVENTIONEN.md` nur für `Theme/assets/css/screen.css` galt, nicht für `Apps/*/app.css`. GELB blieb wegen zweier Punkte: M galt als offen, und der formale DOM-/Accessibility-Tree-Check für TC-F05 war noch nicht dokumentiert.

### Nachträgliche Klärung zu M und TC-F05

Der Nutzer korrigierte die Annahme, dass M weiter offen sei. Er erklärte, dass die weitere M-Feinjustierung bewusst verworfen worden war, weil sie sich unter Fallback-Fonts nicht lohnte. Sobald CI-konforme Fonts bzw. die Theme-Bridge kämen, müssten die Werte ohnehin neu gemessen werden. Damit wurde M nicht mehr als Mangel, sondern als unter aktuellem Font-Stand bewusst abgenommen behandelt. Auf die Frage nach dem DOM-/Accessibility-Schritt erklärte ChatGPT den Mini-Check. Der Nutzer führte ihn durch: Screen 4 wurde geöffnet, DevTools Elements fand weder ✅ noch ❓, das Accessibility-Pane zeigte keinen zugänglichen Namen mit ✅/❓, und die Live-Region wurde durch die Symbole nicht aktualisiert.

### AP-07d als Nachtrag und Rücklaufkapsel

Der Nutzer wollte schließen und fragte, ob AP-07d als Name für den finalen Prompt geeignet sei. ChatGPT hielt AP-07d für passend, weil 07c bereits durch die CSS-Feinjustierung belegt war. Der AP-07d-Prompt wurde als QA-Nachtrag und Rücklaufkapsel zugeschnitten, nicht als weiterer Fix-AP. Claude sollte die neue M-Abnahme und den DOM-/Accessibility-Check in die Bewertung aufnehmen, den Font-Folgeauftrag prominent nach oben tragen, keine Dateien außer dem Ergebnisprotokoll ändern, kein Abschlussritual ausführen und keinen Commit machen.

### Abschlussstand aus AP-07d

Claude meldete AP-07d mit GRÜN. Beide AP-07b-GELB-Gründe waren durch Alberts Entscheidung und Prüfung aufgelöst. TC-F05 galt für den aktuellen Font-Stand als bestanden. M war bewusst abgenommen. Der DOM-/Accessibility-Check war bestanden. Der Font-Folgeauftrag war in BACKLOG, PROJECT-STATUS, NAVIGATION und MEMORY dokumentiert. Commit-Freigabe aus AP-07-Sicht und Rücklauf an den Masterfaden waren erteilt, während Abschlussritual und Commit weiterhin außerhalb dieses APs bleiben sollten.

## Wendepunkte

Der erste Wendepunkt lag in der Korrektur der Ausgabeform: Statt einer vollständigen Prompt-Kette wollte der Nutzer Prompt für Prompt arbeiten. Daraus wurde AP-07a isoliert.

Der zweite Wendepunkt lag im Commit-Stopp. Claude wollte committen; ChatGPT stufte den Stand wegen fehlender AP-07b-QA, M-Restpunkt und Font-Folgeauftrag als nicht commitreif ein.

Der dritte Wendepunkt lag in der Neubewertung von M. Was AP-07b als offenen Mangel führte, wurde durch die Nutzerentscheidung zu einem bewusst abgenommenen Zwischenstand unter Fallback-Fonts.

Der vierte Wendepunkt lag im manuellen DOM-/Accessibility-Check des Nutzers. Damit entfiel der zweite GELB-Grund aus AP-07b.

## Entscheidungen und Festlegungen

Es wurde festgelegt, dass AP-07a nur den Bauprompt für Claude enthalten sollte, nicht die gesamte Kette. Status am Ende: gültig.

Es wurde festgelegt, dass kein Commit erfolgen durfte, solange AP-07b nicht durchgeführt und TC-F05 nicht eingeordnet war. Status am Ende: ersetzt durch Commit-Freigabe nach AP-07d.

Es wurde festgelegt, dass AP-07b die reale Kette aus 07a und eingeschobenem 07c prüfen musste. Status am Ende: gültig.

Es wurde festgelegt, dass M unter aktuellem Fallback-Font-Stand bewusst abgenommen wurde und kein weiterer M-Pixel-Fix vor CI-Font-Anbindung erfolgen sollte. Status am Ende: gültig.

Es wurde festgelegt, dass der Font-Folgeauftrag nach oben getragen werden musste: Nach CI-Font-/Theme-Bridge-Anbindung sollte die Rubikon-Positionierung S/M/L mit `tools/rubikon-symbol-markers-diagnose.js` neu gemessen und gegebenenfalls feinjustiert werden. Status am Ende: gültig.

Es wurde festgelegt, dass AP-07d als QA-Nachtrag und Rücklaufkapsel dienen sollte, nicht als weiterer Fix-AP. Status am Ende: gültig.

## Irrwege, Schleifen und verworfene Ansätze

Die erste Gesamtdatei mit allen Prompts wurde verworfen, weil sie nicht zur vom Nutzer gewünschten iterativen Arbeitsweise passte.

Die Annahme, M sei ein offener Blocker, wurde nach AP-07b verworfen. Sie war zum damaligen Prüfstand erklärbar, wurde aber durch die spätere Nutzerentscheidung ersetzt.

Die Idee eines weiteren M-Fix-APs wurde nicht weiterverfolgt, weil die spätere CI-Font-Anbindung die Messwerte neu verändern würde.

Die anfängliche CSS-Konventionslücke wurde durch AP-07b entkräftet, da die betreffende Konvention nicht für `Apps/prokrastinations-preis/app.css` einschlägig war.

## Erzeugte Artefakte

- Markdown-Datei `AP-prokrast-07a_claude_prompt_rubikon-symbol-markers.md` – Implementierungs-Prompt für Claude – final genutzt.
- Markdown-Datei `AP-prokrast-07b_claude_prompt_abschluss-qa_claims-vs-files_tc-f05_angepasst.md` – angepasster QA-Prompt für reale Kette 07a/07c – final genutzt.
- Markdown-Datei `AP-prokrast-07d_claude_prompt_qa-nachtrag_ruecklaufkapsel.md` – QA-Nachtrag und Rücklaufkapsel-Prompt – final genutzt.
- Ergebnisprotokoll `AP-prokrast-07a_rubikon-symbol-markers_implementierung_Ergebnis.md` – Bauprotokoll – Status am Ende: Grundlage.
- Ergebnisprotokoll `AP-prokrast-07b_abschluss-qa_claims-vs-files_tc-f05_Ergebnis.md` – QA-Protokoll – Status am Ende: durch Nachtrag ergänzt.
- Ergebnisprotokoll `AP-prokrast-07c_rubikon-symbol-markers_css-feinjustierung_Ergebnis.md` – CSS-Feinjustierung – Status am Ende: durch Nutzerentscheidung eingeordnet.
- Ergebnisprotokoll `AP-prokrast-07d_qa-nachtrag_ruecklaufkapsel_Ergebnis.md` – finaler QA-Nachtrag und Rücklauf – Status am Ende: final.

## Sachliche Erkenntnisse

Gesicherter Stand: `anchor:'lastPoint'` beseitigte die ursprünglich beschriebene Divergenzgefahr, weil Marker und blaue Linie dieselbe Chart.js-Pixelreferenz nutzten.

Gesicherter Stand: TC-F05 bestand für den aktuellen Font-Stand, nachdem M bewusst abgenommen und der DOM-/Accessibility-Check durchgeführt worden war.

Gesicherter Stand: Die Symbole erzeugten keinen DOM-Eintrag, keinen Accessibility-Tree-Eintrag und keine Live-Region-Aktualisierung.

Gesicherter Stand: Der Font-Folgeauftrag war nicht AP-07-blockierend, musste aber an den späteren CI-Font-/Theme-Bridge-AP gekoppelt werden.

Spätere Korrektur: Die CSS-Konventionslücke wurde nicht als gültiger DoD-Mangel fortgeführt.

## Offene Punkte am Ende

Die CI-Font-/Theme-Bridge-Anbindung blieb offen. Nach deren Umsetzung musste die Rubikon-Positionierung S/M/L mit `tools/rubikon-symbol-markers-diagnose.js` neu gemessen und gegebenenfalls feinjustiert werden.

Card-to-Point, Screen-3-Timing, CTA-Copy und ein separater Screenreader-Praxistest blieben als unabhängige Themen außerhalb von AP-07 bestehen.

Abschlussritual und Commit liefen bzw. sollten nach AP-07d durch Claude beziehungsweise den Nutzer erfolgen.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Die Prompt-Kette wurde erst zu breit erzeugt und dann auf eine iterative, feedbackgesteuerte Form zurückgeführt.

Für spätere Musteranalyse vormerken: Ein Commit-Wunsch des ausführenden LLM wurde durch Prüfung der Prozessregel gestoppt.

Für spätere Musteranalyse vormerken: Ein QA-GELB wurde nicht durch Codeänderung, sondern durch nachträgliche Abnahmeentscheidung und manuellen Negativcheck aufgelöst.

Für spätere Musteranalyse vormerken: Der Font-Folgeauftrag zeigte eine externe Abhängigkeit, die nicht als AP-07-Restmangel behandelt werden sollte.

## Bewusst ausgelassen

Ausgelassen wurden Rechtschreibfehler, reine Bedienhinweise, Download-Bestätigungen ohne eigenen Verlaufseffekt, wiederholte Promptbestandteile, Zwischenformulierungen ohne neue Entscheidung sowie Toolrauschen zur Dateierzeugung.
