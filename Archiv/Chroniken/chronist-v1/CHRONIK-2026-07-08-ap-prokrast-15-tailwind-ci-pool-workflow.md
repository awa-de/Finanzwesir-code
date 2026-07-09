---
chronik_id: CHRONIK-2026-07-08-ap-prokrast-15-tailwind-ci-pool-workflow
datum: 2026-07-08
projekt: prokrastinations-preis
thema: ap-15-tailwind-ci-pool-workflow
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: offen
quellenlage: ausschnitt
schlagworte: [scope-drift, richtungswechsel, sackgasse, blockade, externe-abhaengigkeit, fehlende-quelle, missverstandene-anforderung, konzept-vs-umsetzung, abbruchregel, annahme-verworfen]
---

# Chronik: AP-prokrast-15, Tailwind-CI-Pool und Rollenentscheidungen

**Hinweis zur Quellenlage:** Diese Chronik beschreibt einen unvollständigen Faden. Mitten im Arbeitsverlauf erfolgte ein Umstieg auf Claude-Cowork mit Fable; Fable beantwortete die elf offenen Entscheidungsfragen und schrieb anschließend Prompts für Claude Code mit Opus. Dieser ChatGPT-Faden enthielt deshalb nur den Workflow-Ausschnitt, die Auswertung der eingebrachten Rückläufe und die Steuerung der nächsten AP-Schritte.

**Hauptgegenstand:** Der Faden behandelte den Übergang von AP-prokrast-14 zu AP-prokrast-15 im Projekt „Prokrastinationspreis“. Zunächst sollte ein kleiner CI-/Theme-Bridge-Umsetzungs-AP vorbereitet werden. Im Verlauf wurde dieser Zuschnitt verworfen, weil die dafür nötigen Farbrollen noch nicht durch Albert/Master entschieden waren. Der Faden drehte anschließend auf eine Tailwind-kompatible CI-Pool-Anamnese, Rollenentscheidung und Kontraktvorbereitung.

## Ausgangslage

Am Anfang standen zwei Prompts: der Fachprompt `AP-prokrast-15_ci-theme-bridge-umsetzung-stufe1_STARTPROMPT(1).md` und der technische Startprompt `TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT(21).md`. Der Nutzer bat darum zu klären, was zu tun sei und wie beide Prompts zusammenarbeiteten.

ChatGPT stellte zunächst fest, dass der Fachprompt AP-15 als begrenzten Umsetzungs-AP beschrieb: `screen.css` sollte Rollen-Tokens erhalten, `Apps/prokrastinations-preis/app.css` sollte von `--fw-color-*` und `--fw-font-base` weg migriert werden, App-Mechanik sollte lokal bleiben, Spacing nicht vereinheitlicht werden. Der taktische Startprompt wurde als operative Disziplin gelesen: Anamnese zuerst, kleine APs, Datei-Wahrheit, Python für Prüfbares, keine Umsetzung ohne Gate.

## Chronologischer Verlauf

### Erstzuschnitt: AP-15a als Read-only Umsetzungs-Gate

ChatGPT leitete daraus als nächsten Schritt `AP-prokrast-15a — Read-only Umsetzungs-Gate und Ziel-Diff-Plan` ab. Der Nutzer verlangte den Prompt als downloadbare Markdown-Datei und als einen einzigen kopierbaren Codeblock. ChatGPT erzeugte die Datei `AP-prokrast-15a_ci-theme-bridge_umsetzungs-gate_STARTPROMPT.md`.

Dieser erste Prompt behandelte die im AP-15-Fachprompt formulierten Rollenfarben als bereits verbindlich gesetzt. Primary wurde als Petrol, Surface als vorhandene Faint-/Background-Fläche und Error als Purpur/Surface angesetzt. Damit wurde aus einem angenommenen Masterentscheid ein Umsetzungs-Gate gebaut.

### Claude-Hook meldete offene Farbentscheidungen

Der Nutzer meldete anschließend Claudes Hinweis: „Offen laut Hook: Masterentscheidung zu 3 Farbrollen (Primary, Error-Familie, ggf. Surface) für die CI-/Theme-Bridge (BACKLOG DS-015) — blockiert AP-prokrast-15.“ ChatGPT antwortete zunächst, Claude habe vermutlich einen älteren Hook höher gewichtet als den aktuellen AP-15-Prompt. Es wurde argumentiert, der AP-15-Prompt setze die Entscheidungen bereits verbindlich.

Der Nutzer widersprach: „Gut, dann sind wir zu schnell. Claude hat recht. Das ist noch nicht mit mir abgestimmt.“ Er fragte, wann das Farbschema festgelegt worden sei und woher es komme. Daraufhin korrigierte ChatGPT die vorherige Einschätzung. Der Fehler wurde auf den von ChatGPT erzeugten AP-15-Startprompt zurückgeführt: Dort waren Vorschläge bzw. offene Entscheidungsbedarfe fälschlich zu verbindlichen Masterentscheidungen gehärtet worden.

Die AP-14-Rückläufe wurden im Gespräch als maßgeblich rekonstruiert: AP-14 habe Entscheidungsreife erzeugt, aber keine direkte Implementierungsfreigabe. Offen geblieben seien Primary-Zuordnung, Error-Familie und Surface. Der alte AP-15-Zuschnitt wurde damit als zu früh markiert.

### Erweiterung zur CI-Pool- und Design-System-Anamnese

Der Nutzer formulierte danach den breiteren Bedarf: Es brauche eine Bestandsaufnahme zu Farben, Fonts und Elementen wie H1, H2, Fließtext, Links, Buttons, Pop-ups und Chart-Elementen. Zu klären sei, welche Farben und Fonts bereits mit welchen Elementen assoziiert seien und welche Elemente für die App fehlten. Grundlage sollten die eigenen Font-/Farbentscheidungen plus TailwindCSS als Fundament sein. Tailwind solle Architektur, Abstände, Responsiveness, Linien und Weißflächen liefern; die Finanzwesir-CI werde darübergelegt.

Der Nutzer benannte zusätzlich die Farbfächer-Logik: Aus Vollfarben werde in den Balkendiagrammen im Asset-Modus ein Spektrum von hell nach dunkel erzeugt. Der Begriff wurde im Faden als Color Ramp, Color Scale, Tonal Palette bzw. Tints/Shades eingeordnet. Diese Mechanik sollte verbindlich analysiert werden.

ChatGPT schlug daraufhin vor, AP-15 nicht als Umsetzung, sondern als `AP-prokrast-15a_ci-pool-design-inventar-renderfluss-analyse.md` neu zu schneiden: read-only, mit Suche in `docs`, `Theme`, Chart-Engine-Core-Dateien und App-Pilot. Zu inventarisieren seien Foundations, Fonts, Elemente, bestehende Assoziationen, Renderfluss, Farbfächer-Mechanik, Namensansätze, Lücken und Entscheidungsfragen.

### Tailwind als Namens- und Strukturgrundlage

Der Nutzer präzisierte die Benennungsfrage: Es solle mit Tailwind gearbeitet werden, nicht gegen Tailwind. Wenn Tailwind Konventionen oder Namensstrukturen pflege, sollten diese übernommen werden. Es solle kein zweiter konkurrierender Namensraum entstehen.

ChatGPT fasste daraus eine Leitentscheidung: Die Finanzwesir-CI solle in Tailwinds Token- und Utility-System eingeordnet werden. Allgemeine Designwerte sollten Tailwind-kompatibel über `--color-*`, `--font-*`, später ggf. `--spacing-*`, `--radius-*`, `--shadow-*`, `--breakpoint-*` laufen. `--fw-*` sollte nur noch app-spezifische Mechanik bezeichnen.

Der Nutzer ergänzte, dass aktuell eine Tailwind-Variante via CDN genutzt werde. Zur Produktion solle Tailwind später lokal und komprimiert werden; dieser Punkt solle jetzt nicht stören. Für den aktuellen AP bedeute das, dass Tailwind-CDN als Entwicklungsfundament zu behandeln sei, nicht als Produktionsproblem. Build, Minifizierung, Purge/Safelist und Ghost-Auslieferung wurden als spätere Aufgaben abgetrennt.

### Neuer AP-15a-Prompt: Tailwind-CI-Pool-Inventar

Auf die Aufforderung „Ok, mache das“ erzeugte ChatGPT den neuen Prompt `AP-prokrast-15a_tailwind-ci-pool-inventar-renderfluss-namensanalyse_STARTPROMPT.md`. Dieser ersetzte den zu frühen Umsetzungs-Gate-Prompt. Der neue Prompt war read-only und verlangte Bestandsaufnahme zu Tailwind-Nutzung, Farbinventar, Fontinventar, Element-/Komponenten-Inventar, Farb-/Font-Assoziationen, Farbfächer-/Color-Ramp-Mechanik, Renderfluss und Namensräumen. Er schrieb nur ein Ergebnisprotokoll als erlaubten Write vor.

### Rücklauf AP-15a und neue Befundlage

Der Nutzer brachte danach das Ergebnis `AP-prokrast-15a_tailwind-ci-pool-inventar-renderfluss-namensanalyse_Ergebnis.md` ein. Es meldete Status GRÜN. Der Befund lautete, dass das CI-Farb-/Font-Fundament real, konsistent und dokumentiert sei: Petrol, Blau, Gelb, Purpur, Neutral-/Text-/Border-Palette sowie Archivo Black und Source Sans Pro. Die Farbfächer-Mechanik existierte doppelt: statisch in `screen.css` als Custom-Properties-Ramp und dynamisch in der Chart-Engine über `FwTheme.getGhostColor()` sowie `theme.getColor()` im Asset-Modus.

Das Ergebnis zeigte außerdem, dass `Apps/prokrastinations-preis/app.css` weiterhin vollständig unverbrückt war und einen eigenen `--fw-*`-Namensraum nutzte. Es fand ein bisher nicht genutztes `fw-app-template.html` in `docs/App-Fabrik/_input/perplexity/` und stellte zwei Tailwind-Config-Strategien nebeneinander fest: Ghost-integrierte Dateien referenzierten `var(--color-*)`, Standalone-Demos trugen dieselben Werte als Hex-Literale.

ChatGPT wertete den Rücklauf als ausreichende Anamnese, aber nicht als Umsetzungsfreigabe. Der nächste Schritt wurde als `AP-prokrast-15b — CI-Pool Rollen- und Benennungskontrakt` beschrieben. Dabei sollten No-regret-Entscheidungen, echte Masterentscheidungen und spätere APs getrennt werden.

### Fable-Rücklauf mit elf Masterentscheidungen

Der Nutzer brachte anschließend eine weitere Datei ein: `AP-prokrast-15a_ruecklauf_masterentscheidungen_F1-F11-CLAUDE FABLE.md`. Diese stammte aus dem ausgelagerten Claude-/Fable-Cowork. Das Dokument meldete „VOLLENTSCHIEDEN“: Alle elf Entscheidungsfragen aus dem AP-15a-Ergebnisprotokoll seien entschieden.

Darin wurden u. a. festgelegt:

- Primary/Action = Petrol.
- Blau = Link im UI, weiterhin frei in Data-Viz, keine Blau-Ramp.
- Purpur = Visited-Link, negativer Balken und redaktionelles „Achtung“, aber nicht System-Status.
- Error = eigene Statusfarbe, das Pilot-Rot wird zentralisiert.
- Success/Warning werden nicht vorrätig definiert; neue Statusfarben entstehen nur bei konkretem Bedarf per Masterentscheidung.
- Surface = `bg-faint`.
- Tailwind-Skalen werden vollständig übernommen; die bestehenden CI-Farben werden als Seeds in volle Skalen überführt.
- Alpha-Pseudostufen entfallen als Tokens zugunsten von Tailwind-Alpha-Modifiern.
- Eine zentrale `tokens.css` wurde als Zielbild genannt.
- `fw-app-template.html` wurde als Steinbruch mit Prüfauftrag eingeordnet.
- Demo-only-Purpur-Gradient-Stufen sollten herausfallen.
- `--fw-*` sollte nur noch App-Mechanik bedeuten.

Das Dokument hielt zugleich Risiken und Restpunkte fest, darunter Petrol-Kontrast knapp AA, fehlende visuelle Abnahme der generierten Zwischenstufen, Bridge-Migration in `FwTheme.js`, Entfall von Alpha-Tokens, nicht repo-verifizierbare Ghost-Produktionskette und Übergangs-Divergenz der Standalone-Demos.

ChatGPT leitete daraus ab, dass die Rollenfragen nun entschieden seien, aber Code-Umsetzung weiterhin nicht freigegeben sei. Der alte AP-15-Umsetzungsprompt wurde als überholt markiert. Die weitere Kette wurde auf Kontrakt, Farbleiter-Abnahme, dauerhafte Spec, `tokens.css`/`screen.css`, FwTheme-Bridge und App-Pilot-Migration aufgeteilt.

### Peer-Review-Punkte V1–V7

Zum Schluss brachte der Nutzer Peer-Review-Anmerkungen ein. Sie betrafen die geplante Kette:

- V1 warnte vor stiller Chart-Farb-Divergenz zwischen AP-16 und AP-17, falls `screen.css` Tokens umbenennt, bevor `FwTheme.js` nachgezogen ist. Vorgeschlagen wurde ein temporärer Kompatibilitäts-Alias-Block.
- V2 stellte fest, dass die Rücklaufkapsel F1–F11 noch außerhalb des Repos liege und vor Repo-APs nach `docs/steering/patches/` gebracht werden müsse.
- V3 präzisierte das spätere Farbleiter-Board: keine Blau-Ramp, Blau nur als Seed; zusätzlich Petrol-Rekalibrierung, Neutral-Familie, Error-Set, Praxisbeispiele und Datei-Verifikation alter Hexwerte.
- V4 verlangte eine Browser-Stichprobe vor AP-16, weil die Ghost-Kette ohne `.hbs` im Repo nicht verifizierbar sei.
- V5 markierte eine versteckte Abhängigkeit in AP-18: `--fw-space-*` könne nur durch Tailwind-Spacing ersetzt werden, wenn Tailwind im App-Laufzeitkontext geladen sei; sonst brauche es CSS-/Token-Fallbacks. Außerdem müsse `QA_TEST_CASES.md` erneut geprüft werden.
- V6 machte den BACKLOG-Eintrag T1 zur Pflicht.
- V7 bestätigte die Ausklammerung der `FwChartTextPlugin`-Font-Bridge wegen Rubikon-Nachmessung.

ChatGPT prüfte diese Anmerkungen und übernahm sie im Wesentlichen. V1, V2, V4, V5 und V6 wurden als echte Prozess- bzw. Architektursicherungen eingeordnet. Die AP-Kette wurde entsprechend angepasst: AP-15b sollte als minimaler Write die F1–F11-Rücklaufkapsel ins Repo übernehmen und den Kontrakt vorbereiten; AP-16 sollte einen Kompatibilitäts-Alias-Block enthalten; AP-18 sollte Tailwind-Laufzeit prüfen; T1 sollte verpflichtend in den BACKLOG.

## Wendepunkte

1. Der erste Wendepunkt trat ein, als Claude den Hook zu offenen Farbrollen meldete. Dadurch wurde sichtbar, dass der zuerst erzeugte AP-15a-Prompt Vorschläge zu Masterentscheidungen gehärtet hatte.

2. Der zweite Wendepunkt war die Nutzerkorrektur „Claude hat recht“. Dadurch wurde der Umsetzungs-AP gestoppt und der Faden auf eine vorgelagerte Anamnese umgestellt.

3. Der dritte Wendepunkt entstand durch die Tailwind-Leitentscheidung. Aus einer allgemeinen CI-Bridge-Frage wurde eine Tailwind-kompatible Token- und Namenssystemfrage.

4. Der vierte Wendepunkt war der AP-15a-Rücklauf. Er machte die vorhandene CI-/Chart-Struktur, die doppelte Farbfächer-Mechanik und die unverbrückte App-Pilot-Lage dateibasiert sichtbar.

5. Der fünfte Wendepunkt lag in der Fable-Rücklaufkapsel zu F1–F11. Danach waren die Rollenfragen entschieden, aber die Umsetzung blieb an einen Kontrakt und visuelle Abnahme gebunden.

6. Der sechste Wendepunkt entstand durch die Peer-Review-Anmerkungen V1–V7. Sie machten stille Divergenzrisiken und fehlende Repo-Verfügbarkeit der Entscheidungsquelle sichtbar.

## Entscheidungen und Festlegungen

- AP-15 sollte nicht als direkter CSS-Umsetzungs-AP weitergeführt werden. Dies wurde nach dem Claude-Hook und der Nutzerkorrektur festgelegt. Status am Ende: gültig.

- Tailwind wurde als strukturelles Fundament gesetzt; die Finanzwesir-CI sollte in Tailwinds Denkweise integriert werden, nicht in einem konkurrierenden Namensraum danebenstehen. Status am Ende: gültig.

- Tailwind-CDN wurde als aktuelles Entwicklungsfundament behandelt. Produktionsbuild, lokale Komprimierung, Purge/Safelist und Ghost-Auslieferung wurden vertagt. Status am Ende: gültig.

- `--fw-*` sollte künftig nur App-Mechanik bezeichnen. Farben, Fonts und allgemeine UI-Werte sollten nicht unter `--fw-*` geführt werden. Status am Ende: gültig.

- Der neue AP-15a wurde als read-only Inventar-, Renderfluss- und Namensanalyse-AP geschnitten. Status am Ende: abgeschlossen.

- Die elf Rollenentscheidungen wurden im Fable-Cowork beantwortet und als neuer Status in den Faden eingebracht. Status am Ende: gültig als eingebrachter Rücklauf, aber noch nicht als Repo-Datei verankert.

- Code-Umsetzung blieb trotz Rollenentscheidungen gesperrt, bis ein AP-15b-Kontrakt erstellt und abgenommen ist. Status am Ende: gültig.

- Peer Review V1–V7 wurde als Anschlussbedingung in die weitere AP-Kette aufgenommen. Status am Ende: gültig als Steuerungsstand.

## Irrwege, Schleifen und verworfene Ansätze

Der erste verworfene Ansatz war der zu frühe AP-15-Umsetzungszuschnitt. Er entstand aus der Annahme, der Fachprompt enthalte bereits verbindliche Masterentscheidungen zu Primary, Surface und Error. Diese Annahme wurde nach dem Claude-Hook und der Nutzerkorrektur verworfen.

Ein zweiter verworfener Ansatz war die Idee, AP-15a als reines Umsetzungs-Gate zu führen. Stattdessen wurde AP-15a zur breiteren Tailwind-CI-Pool-Anamnese umgebaut.

Ein dritter verworfener Ansatz war die implizite Behandlung von Tailwind-CDN als mögliches Produktionsproblem. Der Nutzer stellte klar, dass CDN im aktuellen Entwicklungsstand gewollt sei und Produktionshärtung später komme.

Ein weiterer zurückgestellter Weg war die direkte Erstellung von `tokens.css`, `screen.css`-Migration, `FwTheme.js`-Bridge und App-Pilot-Migration. Diese Umsetzung wurde wegen fehlendem Kontrakt, fehlender visueller Farbleiter-Abnahme, fehlender Repo-Verankerung der Rücklaufkapsel und möglicher stiller Chart-Divergenz vertagt.

## Erzeugte Artefakte

- `AP-prokrast-15a_ci-theme-bridge_umsetzungs-gate_STARTPROMPT.md` – erster Read-only-Gate-Prompt für die CI-/Theme-Bridge; Status am Ende: ersetzt durch neuen AP-15a-Zuschnitt.

- `AP-prokrast-15a_tailwind-ci-pool-inventar-renderfluss-namensanalyse_STARTPROMPT.md` – neuer read-only Prompt für Tailwind-CI-Pool-Inventar, Renderfluss und Namensanalyse; Status am Ende: genutzt.

- `AP-prokrast-15a_tailwind-ci-pool-inventar-renderfluss-namensanalyse_Ergebnis.md` – von Claude erzeugter Rücklauf zur Bestandsaufnahme; Status am Ende: Grundlage für weitere Arbeit.

- `AP-prokrast-15a_ruecklauf_masterentscheidungen_F1-F11-CLAUDE FABLE.md` – externer Claude-/Fable-Rücklauf mit elf Rollenentscheidungen; Status am Ende: Arbeitsgrundlage, aber noch außerhalb des Repos bzw. noch als in den Repo-Kontext zu überführende Quelle behandelt.

- Peer-Review-Punkte V1–V7 – eingebrachtes Reviewmaterial zur AP-Kette; Status am Ende: in die geplante Steuerung aufgenommen.

## Sachliche Erkenntnisse

Gesicherter Stand im Faden:

- Das CI-Fundament bestand aus vier Markenfarben, Neutral-/Text-/Border-Werten sowie Archivo Black und Source Sans Pro.
- Die Chart-Engine war bereits weitgehend über `FwTheme.js` an `screen.css` gekoppelt.
- Die Farbfächer-Mechanik existierte statisch in CSS und dynamisch in JS.
- `Apps/prokrastinations-preis/app.css` war gegenüber `screen.css`/`FwTheme.js` unverbrückt.
- In den Design-System-Templates existierten Tailwind-CDN-Muster, aber kein lokaler Tailwind-Build.
- Die reale Ghost-Auslieferungskette war im Repo nicht verifizierbar, weil `.hbs`-Dateien fehlten.
- Das App-Template `fw-app-template.html` existierte als verwertbarer Steinbruch, aber nicht als verbindliche Quelle.
- Die Fable-Rücklaufkapsel entschied die Rollenfragen, blieb aber vor dem nächsten Repo-AP als Datei-Wahrheit ins Repo zu überführen.

Arbeitsannahmen am Ende:

- `tokens.css` sollte später als zentrale Quelle der Wahrheit dienen.
- AP-15b sollte zuerst den Rollen- und Benennungskontrakt erzeugen.
- Die visuellen Farbleitern sollten vor technischer Festschreibung sichtbar abgenommen werden.
- Temporäre Kompatibilitäts-Aliasse sollten stille Chart-Divergenz verhindern.

Offene Fragen am Ende:

- Die konkreten finalen Hexwerte der restaurierten Farbleitern waren noch nicht visuell abgenommen.
- Die Ghost-Live-Kette war noch nicht geprüft.
- Die Tailwind-Verfügbarkeit im App-Laufzeitkontext war noch nicht geprüft.
- Die Rücklaufkapsel F1–F11 war noch nicht als Repo-Datei gesichert.

## Offene Punkte am Ende

- AP-15b-Startprompt musste noch erstellt werden.
- Die F1–F11-Rücklaufkapsel musste in `docs/steering/patches/` als Datei-Wahrheit abgelegt werden.
- Der Rollen- und Benennungskontrakt musste noch formuliert und abgenommen werden.
- Das Farbleiter-Board für Petrol, Gelb, Purpur, Blau-Seed, Neutral-Familie und Error-Set musste noch erzeugt und visuell abgenommen werden.
- `BACKLOG.md` musste den Pflichtpunkt T1 zur Tailwind-Produktionsumstellung aufnehmen.
- Vor AP-16 musste eine Browser-/Live-Stichprobe prüfen, ob eine echte Ghost-Seite `screen.css` und Tailwind gemeinsam lädt.
- AP-16 musste später einen temporären Alias-Block einplanen.
- AP-17 musste später `FwTheme.js` und Farbhardcodings in Plugins behandeln, aber `FwChartTextPlugin`-Font ausklammern.
- AP-18 musste später Tailwind-Laufzeit im App-Kontext prüfen und `QA_TEST_CASES.md` erneut berücksichtigen.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Der Faden enthielt eine frühe Härtung von Vorschlägen zu Entscheidungen. Diese wurde durch einen Hook-Hinweis und Nutzerkorrektur zurückgenommen.

Für spätere Musteranalyse vormerken: Die Arbeit wechselte mehrfach von Umsetzung zu Vertragsebene. Der Wechsel geschah jeweils, wenn Datei-Wahrheit, Rollenentscheidung oder Laufzeitkontext noch nicht gesichert waren.

Für spätere Musteranalyse vormerken: Externe Cowork-Outputs wurden als Material eingebracht, aber ihre Repo-Verfügbarkeit wurde selbst zum Steuerungsthema.

Für spätere Musteranalyse vormerken: Die Trennung zwischen Tailwind als Entwicklungsfundament, Tailwind als Benennungssystem und Tailwind als späterer Produktionsbuild verhinderte eine Vermischung von Architektur- und Tooling-Fragen.

Für spätere Musteranalyse vormerken: Peer Review zeigte stille Failure-Modi, die nicht durch Tests oder Fehlermeldungen sichtbar geworden wären, insbesondere Chart-Fallbacks auf alte JS-Werte.

## Bewusst ausgelassen

Ausgelassen wurden reine Bedien- und Downloaddetails, Wiederholungen der langen Prompttexte, vollständige Tabellen der Fable-Rücklaufkapsel, vollständige AP-15a-Ergebnistabellen und die ausführlichen Peer-Review-Begründungen, soweit sie im Verlauf verdichtet wurden. Ebenfalls ausgelassen wurden Tippfehler, reine Statusfloskeln und Tool-Metadaten ohne Auswirkung auf die AP-Kette.
