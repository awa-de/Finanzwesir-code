## Kurzurteil

Die App hat eine **starke Grundidee**: Sie übersetzt ein abstraktes Finanz-/Steuerthema in ein konkretes Alltagsmodell — den „Kassenbon“. Das ist für Finanzlaien psychologisch sehr gut, weil es sofort zeigt: Von einem Euro Wachstum bleibt nicht alles beim Anleger. Der Einstieg mit „Was passiert mit einem Euro?“ und der anschließende Übergang zur Sparplan-Simulation sind didaktisch klar angelegt. fileciteturn2file0

Die größte Schwäche ist aber: **Die App will zugleich erklären, überzeugen, simulieren und politisch framen.** Dadurch entsteht kognitive Überladung und ein Vertrauensrisiko. Für intelligente Laien ist nicht die Mathematik das Hauptproblem, sondern: *Was soll ich jetzt glauben, was soll ich tun, und wo ist das Modell bewusst vereinfacht?*

---

# 1. Nach Krug: „Don’t make me think“

## Was gut ist

Der Einstieg ist sofort verständlich. „Was passiert mit einem Euro?“ ist eine sehr gute Frage, weil sie konkret, klein und neugierig machend ist. Auch der Kassenbon ist ein starkes mentales Modell: Menschen verstehen Abzüge, Restbetrag, Anbieter, Staat, Kosten intuitiv. Die Szenario-Karten sind ebenfalls gut, weil sie Auswahlmöglichkeiten sichtbar machen, statt sie in Menüs zu verstecken. fileciteturn2file0

## Hauptproblem: zu viele Denkaufgaben auf einmal

Der Nutzer muss nacheinander verstehen:

1. Bruttowachstum vs. Nettowachstum  
2. TER  
3. Brokerkosten  
4. Abgeltungsteuer, Soli, Teilfreistellung, Pauschbetrag  
5. Vor-2009-Regime  
6. Sparphase vs. Entsparphase  
7. Modus A vs. Modus B  
8. Einkommensteuer-Szenario  
9. Chart mit vier Linien  
10. Modellannahmen im Disclaimer

Für Finanzlaien ist das zu viel auf einmal. Krug würde sagen: Die Seite zwingt den Nutzer zu oft, Bedeutung selbst zu rekonstruieren.

## Verbesserung

Die App braucht eine **geführte Dramaturgie in drei Schritten**:

**Schritt 1: Aha-Moment**  
„Aus 1 € werden nach 30 Jahren nicht 7,61 €, sondern ca. 6,05 € — weil Kosten und Steuern mitwachsen.“

**Schritt 2: persönliche Übersetzung**  
„Was heißt das für meinen Sparplan?“

**Schritt 3: politischer Hebel**  
„Je nach Steuerregime verändert sich deine monatliche Entnahme um X €.“

Aktuell springt die App vom Kassenbon direkt in eine relativ komplexe Simulation. Besser wäre ein Zwischen-Satz mit Nutzwert:

> „Jetzt übersetzen wir den 1-Euro-Effekt in dein echtes Depot.“

---

# 2. Nach Tufte: Daten, Wahrheit, Klarheit

## Was gut ist

Die App zeigt die relevanten Annahmen offen: 7 % Bruttorendite, 0,20 % TER, 26,375 % Kapitalertragsteuer plus Soli, 30 % Teilfreistellung, Pauschbetrag, keine Inflation, kein Sequence-of-Returns-Risiko. Das ist stark, weil die Modellgrenzen sichtbar sind. fileciteturn2file0

## Hauptproblem: Der Chart zeigt zu viel und erklärt zu wenig

Vier Linien, vier Steuerregime, zwei Phasen, mehrere Parameter — das ist für Experten interessant, für Laien aber schwer zu lesen. Tufte würde wahrscheinlich kritisieren: Die Grafik enthält relevante Daten, aber der **visuelle Zweck** ist nicht eindeutig genug.

Die zentrale Aussage ist vermutlich nicht „Hier sind vier Depotverläufe“, sondern:

> „Politik verändert deine spätere monatliche Entnahme.“

Dann sollte genau diese Differenz visuell dominant sein.

## Verbesserung

Ergänze oberhalb oder neben dem Chart eine **klare Differenzanzeige**:

> „Gegenüber Deutschland heute:  
> Vor 2009: +87 €/Monat  
> Vergünstigungen weg: −64 €/Monat  
> Einkommensteuer 42 %: −143 €/Monat“

Das wäre für Laien viel stärker als vier Linien allein.

Der Chart sollte außerdem eine deutliche vertikale Markierung bekommen:

> „Ansparen endet hier“  
> „Entnahme beginnt hier“

Im Code ist eine Annotation vorbereitet, aber faktisch nicht sichtbar eingebunden. Gerade dieser Übergang ist psychologisch wichtig, weil viele Nutzer sonst nur „Kurven gehen hoch und runter“ sehen. fileciteturn2file0

---

# 3. FAANG-Design-Kriterien: Klarheit, Vertrauen, Responsivität, Fehlertoleranz

## Klarheit

Die visuelle Hierarchie ist grundsätzlich gut: Intro, Kassenbon, CTA, Szenarien, Headline, Chart, Controls, Disclaimer. Aber die Simulation braucht ein stärkeres **Primary Outcome**.

Aktuell steht die Ergebnislogik in den Szenario-Karten und der Headline. Besser wäre ein dominanter Ergebnisblock:

> **Dein Ergebnis nach aktuellem Recht**  
> 200 €/Monat sparen → 25 Jahre  
> ergibt ca. X € Depot  
> daraus entnehmbar: **Y €/Monat für 30 Jahre**

Danach erst die Szenario-Differenzen.

## Vertrauen

Hier liegt der wichtigste Punkt. Der Text „Die Rendite wird letztlich an der Wahlurne entschieden“ ist stark, aber auch riskant. Er wirkt aktivistisch. Das kann für die Zielgruppe funktionieren, aber nur, wenn die App gleichzeitig extrem fair wirkt.

Der Satz sollte nicht verschwinden, aber präziser werden:

> „Bei langer, diversifizierter Anlage sind Marktphasen nicht der einzige Hebel. Steuerregeln können über Jahrzehnte ähnlich stark wirken wie Produktkosten — und sie werden politisch entschieden.“

Das ist weniger polemisch, glaubwürdiger und fachlich robuster.

Auch „Der Staat holt sich 2,8× mehr als alle Produktkosten zusammen“ ist ein starker Satz. Er ist merkfähig, aber er braucht direkt daneben einen Mini-Kontext:

> „In diesem vereinfachten 30-Jahre-Modell.“

Sonst entsteht der Eindruck einer universellen Wahrheit.

## Fehlertoleranz

Die Slider sind gut, aber es fehlt eine „Zurücksetzen“-Funktion. Laien probieren herum, verlieren dann den Referenzpunkt und wissen nicht mehr, ob das Ergebnis „normal“ ist.

Empfehlung:

> Button: „Standardannahmen wiederherstellen“

Außerdem sollte es Presets geben:

> „Berufseinsteiger: 100 €/Monat, 40 Jahre“  
> „Familie: 250 €/Monat, 30 Jahre“  
> „Spätstarter: 500 €/Monat, 15 Jahre“

Das reduziert kognitive Last massiv.

---

# 4. Nutzerpsychologische Bewertung

## Die App hat einen starken Hook

Der Kassenbon ist die beste Idee der App. Er macht Unsichtbares sichtbar. Vor allem „Gehört dir 2056“ ist emotional stark, weil es Zukunft und Eigentum verbindet.

## Aber: Die App erzeugt zuerst Empörung, dann Komplexität

Das kann gefährlich sein. Nutzer fühlen zuerst: „Aha, der Staat nimmt viel.“ Danach müssen sie mit komplizierten Steuerregimen, Entnahmephasen und Chartlinien umgehen. Das kann zwei Reaktionen erzeugen:

1. „Interessant, aber ich verstehe es nicht ganz.“  
2. „Das ist politisch geframt, vielleicht manipulativ.“

Um das zu vermeiden, sollte die App stärker zwischen **Erklärung** und **Meinung** unterscheiden.

Empfohlenes Muster:

> **Fakt:** Steuern beeinflussen die Nachsteuerrendite.  
> **Modell:** Wir vergleichen vier vereinfachte Regime.  
> **Interpretation:** Steuerpolitik ist ein langfristiger Renditehebel.

Diese Dreiteilung schafft Vertrauen.

---

# 5. Konkrete Verbesserungen nach Priorität

## Priorität 1: Ergebnisfokus verschärfen

Die App sollte nach jedem Parameterwechsel eine klare Hauptantwort geben:

> „Mit deinen Einstellungen bekommst du nach aktuellem Recht ca. X €/Monat.  
> Im besten Steuerregime wären es Y €/Monat.  
> Im schlechtesten Szenario Z €/Monat.  
> Politischer Spread: **Δ €/Monat**.“

Das ist der eigentliche Aha-Wert.

## Priorität 2: Chart entlasten

Statt alle vier Linien gleich stark zu zeigen:

- Aktives Szenario kräftig
- Deutschland heute als Referenzlinie
- andere Szenarien blasser
- Differenz als Label direkt am Linienende
- vertikale Linie bei Ende der Ansparphase
- optionaler Toggle: „Alle Szenarien anzeigen“

Für Handy wäre ein Chart mit vier Linien oft zu viel. Dort lieber zuerst eine **Vergleichskarte** zeigen:

| Szenario | Monatliche Entnahme | Differenz |
|---|---:|---:|
| Deutschland heute |  X € | Referenz |
| Vor 2009 | Y € | +… € |
| Vergünstigungen weg | Z € | −… € |
| Einkommensteuer | A € | −… € |

Der Chart kann darunter bleiben.

## Priorität 3: Sprache weniger technisch machen

Beispiele:

„Teilfreistellung“ → „30 % der Aktienfonds-Erträge bleiben steuerfrei“  
„Sparerpauschbetrag“ → „1.000 € Kapitalerträge pro Jahr steuerfrei“  
„TER“ → „laufende Fondskosten“  
„Sequence-of-Returns-Risiko“ → „Reihenfolge guter und schlechter Börsenjahre“

Fachbegriffe dürfen bleiben, aber erst nach der Alltagserklärung.

## Priorität 4: Modus A/B vereinfachen

„Modus A“ und „Modus B“ klingen technisch. Besser:

- „Ich will wissen, wie lange mein Depot reicht“
- „Ich will wissen, wie viel ich monatlich entnehmen kann“

Das ist selbsterklärend und Krug-konform.

## Priorität 5: Vertrauensanker direkt sichtbar machen

Der Disclaimer ist gut, aber zu versteckt. Direkt unter dem Ergebnis sollte eine kurze Vertrauenszeile stehen:

> „Vereinfachtes Modell: nominale 7 % Rendite, 0,20 % Fondskosten, keine Inflation, keine Steuerberatung.“

Dann kann das Details-Element weiterhin die volle Methodik enthalten.

---

# 6. Responsive Bewertung: Handy, Tablet, 4K

## Handy

Stärken: einspaltige Szenario-Karten, kompakte Höhe, große Slider.

Risiko: Chart + Legende + Controls werden schnell lang. Auf Mobile sollte das Ergebnis vor dem Chart stehen. Der Nutzer sollte nicht scrollen müssen, um den zentralen Nutzen zu verstehen.

Empfohlene Mobile-Reihenfolge:

1. Ergebnis-Karte  
2. Szenario-Vergleich  
3. wichtigste Slider  
4. Chart  
5. Details

## Tablet

Tablet dürfte gut funktionieren. Zwei-Spalten-Szenariokarten sind passend. Hier könnte man Ergebnis und Chart nebeneinander oder gestapelt zeigen.

## 4K-Monitor

Aktuell ist `max-width: 780px` gesetzt. Das ist für Lesbarkeit gut, aber auf großen Screens wirkt die App wahrscheinlich wie eine schmale Kolumne. fileciteturn2file0

Für 4K sollte es ab etwa 1100–1280 px einen Desktop-Modus geben:

- links: Controls und Szenarien
- rechts: Ergebnis + Chart
- oben: Kassenbon als Hero oder Sidecard

Das nutzt Raum, ohne Zeilen zu lang zu machen.

---

# 7. Wichtigste inhaltliche Gefahr

Die Aussage „Wer lange genug und diversifiziert genug spart, dem sind Marktschwankungen egal“ ist psychologisch attraktiv, aber zu absolut. Sie kann Vertrauen kosten, weil Sequence-of-Returns-Risiko, Inflation und Entnahmezeitpunkt gerade in der Ruhestandsphase relevant sind — und die App selbst sagt, dass Sequence-of-Returns-Risiko nicht modelliert wird. fileciteturn2file0

Besser:

> „Wer lange genug und breit diversifiziert spart, reduziert die Bedeutung kurzfristiger Marktschwankungen erheblich. In der Entnahmephase bleiben Timing, Inflation und Steuerregeln trotzdem wichtig.“

Das ist immer noch pointiert, aber glaubwürdiger.

---

# 8. Beste nächste Iteration

Ich würde die nächste Version nicht primär am Styling anfassen, sondern an der **Informationsarchitektur**:

1. Einen dominanten Ergebnisblock einbauen.  
2. Politischen Spread in €/Monat zeigen.  
3. Chart visuell vereinfachen.  
4. Modus A/B umbenennen.  
5. Fachbegriffe mit Alltagssprache paaren.  
6. Disclaimer teilweise nach oben holen.  
7. Auf Desktop ein echtes Zwei-Spalten-Layout nutzen.  
8. Den politischen Claim etwas weniger absolut formulieren.

## Verdichtete neue Kernbotschaft

> **Nicht jede Rendite entsteht am Markt.**  
> Bei langen ETF-Sparplänen entscheidet auch die Steuerregel darüber, wie viel monatliche Freiheit am Ende bleibt. Dieses Modell zeigt den Unterschied — vereinfacht, transparent und mit deinen eigenen Annahmen.

Das trifft eure Absicht, wirkt aber weniger wie Agitation und mehr wie ein nützliches, vertrauenswürdiges Werkzeug.
