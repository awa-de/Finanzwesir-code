---
Angelegt am: 01.05.2026 08:32
zuletzt verändert am: 2026-05-01T08:32:00+02:00
title: "Bauprompt: ETF-Wahlurnen-Super-App Master"
version: 5.0
type: LLM-Prompt
tags:
  - app-konzept
  - etf
  - steuern
  - regulatorik
  - prompt
  - obsidian
  - master-prompt
---
---
up:: 
# Bauprompt: ETF-Wahlurnen-Super-App Master

## Zweck dieses Master-Prompts

Dieser Prompt ist die konsolidierte Master-Version für ein ausführendes LLM. Er verbindet die strategische und fachliche Präzision der V4-Datei mit den stärksten Umsetzungsdetails des Perplexity-Prompts. Die Datei ist so formuliert, dass ein LLM daraus direkt eine produktionsnahe HTML-App bauen kann, ohne zwischen konkurrierenden Konzepten wählen zu müssen.

---

## Kontext für das ausführende LLM

Du erhältst drei Inputs:

1. Eine bereits umgesetzte HTML-App: `dashboard-regulatorikXIX.html`
2. Eine Konzept-/Spezifikationsdatei: `ETF-Wahlurnen-App-Abschlussdokumentation_V2.md`
3. Diesen Master-Prompt als verbindliche Zielbeschreibung

Strategische Einordnung:

> Die MD-Konzept-App ist strategisch stärker, weil sie ein klares Narrativ hat: Steuerpolitik ist der größte nicht direkt kontrollierbare Renditefresser für deutsche ETF-Anleger. Die bestehende HTML-App ist dagegen technisch und UX-seitig stärker, weil sie bereits eine funktionierende Oberfläche mit Ansparphase, Entnahmephase, Chart, KPIs, mobiler Darstellung und Live-Interaktion besitzt.
>
> Die richtige Lösung ist keine parallele Nutzung beider Apps, sondern eine kombinierte Super-App:
>
> - Die Wahlurnen-App liefert Narrativ, Steuerlogik, politische Szenarien und emotionalen Kern.
> - Die bestehende Regulatorik-XIX-App liefert UI-Gerüst, Anspar-/Entnahme-Mechanik, Chartstruktur und Interaktionsmuster.
> - Der abstrakte „regulatorische Renditeverlust“-Slider der HTML-App soll nicht Hauptmodus bleiben, sondern optionaler Expertenmodus werden.
>
> Zielgruppe sind Finanzlaien, die intelligent sind und Dinge wirklich verstehen wollen. Die App muss daher nicht maximal simpel sein, aber sie muss didaktisch sauber führen: erst verstehen, dann interaktiv variieren.

---

# Deine Aufgabe

Baue aus den Inputs eine einzige, produktionsnahe **Super-App** als einzelne HTML-Datei.

Die App muss für Einbettung in Ghost.io geeignet sein:

- eine einzige HTML-Datei
- kein Server
- kein Build-Prozess
- alle Berechnungen clientseitig in JavaScript
- Styles inline oder per CDN-kompatiblem Ansatz
- Chart.js per CDN erlaubt
- keine unnötigen externen Abhängigkeiten
- responsive, mobile-first
- Dark-/Light-Mode-fähig

Der Output soll eine vollständige Datei sein:

```text
etf-wahlurnen-super-app.html
```

Wichtig: Diese Master-Datei überschreibt bei Konflikten die Formulierungen älterer Prompt-Versionen.

---

# Strategisches Ziel der App

Die App soll nicht abstrakt zeigen:

> „Regulierung kostet Rendite.“

Sondern konkret:

> „Steuerpolitik entscheidet darüber, wie viel ETF-Rente bei dir ankommt.“

Die App soll deutschen Kleinsparern und ETF-Anlegern zeigen, dass sie viele Kosten selbst kontrollieren können, aber nicht das Steuerregime. Dieses wird politisch gesetzt.

Die zentrale These lautet:

> Wer lange genug spart und breit diversifiziert investiert, kann Marktschwankungen eher aussitzen. Produktkosten und Brokerkosten sind wählbar. Steuern sind dagegen der größte politisch gesetzte Renditefresser – und werden indirekt an der Wahlurne entschieden.

---

# Zielgruppe

Die Zielgruppe sind keine Finanzprofis, sondern intelligente Finanzlaien.

Sie sollen:

- nicht mit Fachbegriffen erschlagen werden,
- aber auch nicht infantil behandelt werden,
- den Zusammenhang zwischen Steuerregime, Endvermögen und Monatsrente verstehen,
- sofort einen emotional greifbaren Betrag sehen,
- optional tiefer in Modellannahmen einsteigen können.

Schreibe Texte daher so:

- konkret statt abstrakt,
- deutschlandspezifisch statt international,
- transparent statt defensiv,
- keine Steuerberatung, aber klare Modelllogik,
- Zahlen immer mit Bedeutung erklären.

---

# Produktentscheidung

Erstelle **eine App**, nicht zwei getrennte Apps.

Die Super-App besteht aus drei Ebenen:

1. **Kassenbon-Euro**  
   Ein statischer Einstieg, der zeigt, wie aus 1 € über 30 Jahre ein größerer Betrag wird und wer wie viel vom Zuwachs bekommt: Anleger, Fondsanbieter, Broker, Finanzamt.

2. **Wahlurnen-Simulation**  
   Der Hauptmodus. Vier konkrete deutsche Steuer-/Politikszenarien werden verglichen.

3. **Expertenmodus: freier Regulatorik-Drag**  
   Optional aufklappbar. Hier darf die bestehende Logik der HTML-App mit frei wählbarem Renditeverlust wiederverwendet werden. Dieser Modus darf aber nicht die Hauptgeschichte dominieren.

---

# Informationsarchitektur

## Abschnitt 1: Hero

Ziel: Sofort klarmachen, worum es geht.

Titel:

```text
Was Steuerpolitik deine ETF-Rente kostet
```

Untertitel:

```text
Produktkosten kannst du wählen. Brokerkosten kannst du senken. Das Steuerregime entscheidet die Politik – und es verändert deine spätere Monatsrente massiv.
```

Primäre Kennzahl direkt sichtbar:

```text
Bis zu X € weniger pro Monat
```

Diese Zahl soll dynamisch aus dem Unterschied zwischen bestem und schlechtestem Szenario berechnet werden, idealerweise S0 vs. S3 beim aktuellen Nutzer-Setup.

Direkt darunter oder am Ende des Einstiegs steht ein klarer CTA-Button:

```text
Zeig mir meinen persönlichen Effekt →
```

---

## Abschnitt 2: Kassenbon-Euro

Übernimm die Idee aus der MD-Konzeptdatei.

Zweck:

- Kontext schaffen,
- zeigen, dass Steuern größer sind als TER und Brokerkosten,
- keine Interaktion,
- maximale Datendichte,
- minimale Dekoration.

Beispielstruktur:

```text
1,00 €   Eingezahlt 2026 aus versteuertem Einkommen
× 7,61   Bruttowachstum über 30 Jahre bei 7 % p. a.
− 0,42 € Fondsanbieter / TER
− 0,00 € Broker / Transaktionskosten
− 1,14 € Finanzamt bei aktuellem deutschem Recht
────────────────────────────────────────────
= 6,05 € gehören dir
```

Darunter ein erklärender Satz:

```text
Vor 2009 konnten Kursgewinne nach ausreichender Haltedauer steuerfrei sein. Heute ist die steuerliche Behandlung ein zentraler politischer Hebel.
```

Wichtig:

- Zahlen müssen aus dem Modell oder den Konzeptannahmen konsistent berechnet werden.
- Falls Werte aus der Doku übernommen werden, müssen die Annahmen sichtbar bleiben.
- Verwende Rot nur für Abzüge, Teal/Grün für Netto oder positive Werte.
- Der Kassenbon soll Tufte-artig wirken: Monospace-Zahlen, keine Icons, keine dekorativen Elemente.

---

## Abschnitt 3: Hauptsimulation – Wahlurnen-Modus

Dies ist der Kern der App.

Vergleiche vier Szenarien:

| Szenario | Label in der App | Bedeutung |
|---|---|---|
| S0 | DE vor 2009 | Kursgewinne nach Haltedauer steuerfrei |
| S1 | Deutschland heute | aktuelles deutsches Steuerregime mit Teilfreistellung und Sparerpauschbetrag |
| S2 | Pauschale Vollbesteuerung | ETF-Gewinne werden vollständig mit Abgeltungsteuer belastet; keine Teilfreistellung, kein Pauschbetrag. Härteres Belastungsszenario, das den Wert der heutigen Schutzmechanismen zeigt. |
| S3 | Einkommensteuer-Modell | ETF-Gewinne werden zum zu versteuernden Einkommen addiert; zusätzliche Steuer = ESt(zvE + ETF-Gewinn) − ESt(zvE), keine Teilfreistellung, kein Pauschbetrag |

Die App soll standardmäßig alle vier Szenarien sichtbar vergleichen.

Empfohlene UI:

- Szenario-Karten oder Radio-Leiste
- jede Karte zeigt:
  - Szenarioname
  - kurze Erklärung
  - erwartetes Endvermögen nach Ansparphase
  - maximale Monatsentnahme in der Rentenphase
  - Differenz gegenüber „Deutschland heute“ und/oder S0

S0 ist der historische Anker.  
S1 ist die heutige Realität.  
S2 und S3 sind politische Verschlechterungsszenarien. S2 ist ein Belastungstest für den Wegfall heutiger Schutzmechanismen, keine Prognose. S3 ist der zusätzliche Bruch: ETF-Gewinne werden wie normales Einkommen behandelt.

Nimm **kein fünftes Hauptszenario** für einen erhöhten Pauschbetrag auf. Politische Kompromissvarianten wie „persönlicher Einkommensteuertarif, aber 1.500 € Pauschbetrag“ sollen als Einwand-Kachel erklärt werden, nicht als zusätzliche Linie im Chart.

---

# Eingaben im Hauptmodus

Halte die Eingaben schlank.

Standardwerte:

| Parameter | Default | Bereich |
|---|---:|---:|
| Monatliche Sparrate | 200 € | 50–1.000 € |
| Ansparzeit | 25 Jahre | 5–40 Jahre |
| Entnahmezeitraum | 30 Jahre | 10–40 Jahre |
| Zu versteuerndes Jahreseinkommen für S3 | 60.000 € | 0–250.000 € |

Empfehlung:

- Im Hauptmodus nur Sparrate, Ansparzeit, Entnahmezeitraum und zu versteuerndes Jahreseinkommen zeigen.
- Bruttorendite und TER bleiben feste Modellannahmen und werden nicht als Advanced-Inputs angeboten.
- Keine zusätzlichen Advanced-Bereiche für Rendite, TER, Kirchensteuer, Sparerpauschbetrag oder Veranlagungsart einbauen.

S3-Eingabe:

```text
Dein zu versteuerndes Jahreseinkommen: [60.000 €]
```

Hinweis direkt unter dem Feld:

```text
Das ist nicht dein Bruttogehalt, sondern der Betrag, auf den am Ende Einkommensteuer berechnet wird. Wenn du ihn nicht kennst, nutze eine grobe Schätzung. Wir rechnen vereinfachend mit der Grundtabelle für eine alleinstehende Person. Zusammenveranlagung, Kirchensteuer und Sonderfälle werden nicht modelliert.
```

Diese Eingabe soll sichtbar sein, aber visuell untergeordnet. Sie soll live Chart, Headline und S3-Karte aktualisieren.

Wichtig: Es gibt **keine abstrakten Renditeverlust-Schieberegler als Haupteingabe**.

---

# Modus der Entnahmephase

Nutze als Standard **Modus B** aus der MD-Datei:

> Wie viel kann ich monatlich entnehmen, wenn das Depot nach X Jahren auf Null laufen darf?

Warum:

- Monatsbeträge sind für Laien emotional greifbarer als abstrakte Depotlaufzeiten.
- Die stärkste Pointe ist: „Du hast X € weniger pro Monat.“

Optional kann später ein Modus A ergänzt werden:

> Wie lange reicht mein Depot bei einer gewünschten Monatsentnahme?

Für diese Version reicht Modus B. Baue also keinen prominenten Moduswechsel als Hauptbestandteil der ersten Version ein.

---

# Rechenmodell

## Allgemeine Annahmen

Nutze diese festen Standardannahmen:

```text
Bruttorendite: 7,0 % p. a.
TER: 0,20 % p. a.
Nettorendite vor Steuern: 6,80 % p. a.
Transaktionskosten: 0,10 % einmalig oder näherungsweise vernachlässigbar
Inflation: nicht modelliert
Kirchensteuer: nicht modelliert
Sequence-of-Returns-Risiko: nicht modelliert
S3-Einkommensteuer: heutiger Einkommensteuertarif 2026 nach Grundtabelle, vereinfachend alleinstehende Person
S3-Solidaritätszuschlag: nicht modelliert, um das Szenario nicht künstlich zu verschärfen
```

Die Simulation darf jährlich rechnen und Monatswerte anzeigen.

Wichtig:

- Keine falsche Scheingenauigkeit.
- Beträge auf ganze Euro runden.
- Prozentwerte auf eine Nachkommastelle runden.
- Benenne klar, wenn etwas vereinfacht ist.

---

## Ansparphase

Simuliere jährliche oder monatliche Einzahlungen.

Empfehlung:

- Monatliche Sparrate als Input.
- Intern monatlich oder jährlich konsistent rechnen.
- TER jährlich als Renditeminderung berücksichtigen.
- Steuerlogik je Szenario anwenden.

Wenn eine vollständige deutsche Steuerdetailmodellierung zu komplex ist, priorisiere didaktische Konsistenz:

1. S0: keine Steuer auf Kursgewinne nach Haltedauer.
2. S1: 26,375 % Kapitalertragsteuer inkl. Soli, aber nur auf 70 % der Gewinne wegen 30 % Teilfreistellung; Sparerpauschbetrag 1.000 €/Jahr berücksichtigen, soweit sinnvoll modellierbar.
3. S2: 26,375 % auf volle Kapitalerträge, kein Pauschbetrag, keine Teilfreistellung. Dieses Szenario ist als harte pauschale Vollbesteuerung zu kennzeichnen, nicht als Prognose.
4. S3: volle realisierte ETF-Gewinne werden zum zu versteuernden Jahreseinkommen addiert. Steuer auf ETF-Gewinne = ESt(zvE + ETF-Gewinn) − ESt(zvE), kein Pauschbetrag, keine Teilfreistellung.

Wichtig:

- S1 soll fair und nicht übertrieben schlecht gerechnet werden.
- S2/S3 dürfen als politische Verschlechterungsszenarien erkennbar sein.
- Verwende Tooltips oder Infoboxen, um die Modellunterschiede zu erklären.
- Die Teilfreistellung ist als heutiger Schutzmechanismus darzustellen, der gesetzlich geregelt und systematisch durch die Besteuerung auf Fondsebene begründet ist. Eine Änderung ist politisch möglich, aber eine ersatzlose Streichung wäre ein echter Bruch im heutigen Investmentsteuersystem.
- Für S1 gilt: nicht künstlich schlecht rechnen; der heutige Zustand muss fair modelliert werden.

---

## Entnahmephase

Nutze die Anteilsmethode aus der MD-Datei.

Für jede jährliche Entnahme:

```text
Gewinnanteil = (Depotwert − Kostenbasis) / Depotwert
steuerpflichtiger Betrag = Entnahme × Gewinnanteil × steuerpflichtiger Anteil
Steuer = je nach Szenario Abgeltungsteuer oder Einkommensteuer-Differenz
Netto-Entnahme = Brutto-Entnahme − Steuer
```

Für S1:

```text
steuerpflichtiger Anteil = 70 %
Steuersatz = 26,375 %
Sparerpauschbetrag = 1.000 € pro Jahr
```

Für S2:

```text
steuerpflichtiger Anteil = 100 %
Steuersatz = 26,375 %
kein Pauschbetrag
```

Für S3:

```text
steuerpflichtiger Anteil = 100 %
kein Pauschbetrag
keine Teilfreistellung
ETF-Gewinn des Jahres = Entnahme × Gewinnanteil
Steuer ohne ETF-Gewinn = ESt(zvE)
Steuer mit ETF-Gewinn = ESt(zvE + ETF-Gewinn)
Steuer auf ETF-Gewinn = Steuer mit ETF-Gewinn − Steuer ohne ETF-Gewinn
```

Nutze dafür den Einkommensteuertarif 2026 nach Grundtabelle. Runde das zu versteuernde Einkommen auf volle Euro ab. Implementiere die Tarifformel clientseitig in JavaScript:

```text
x = abgerundetes zu versteuerndes Einkommen
bis 12.348 €: 0
12.349–17.799 €: (914,51 × y + 1.400) × y, mit y = (x − 12.348) / 10.000
17.800–69.878 €: (173,10 × z + 2.397) × z + 1.034,87, mit z = (x − 17.799) / 10.000
69.879–277.825 €: 0,42 × x − 11.135,63
ab 277.826 €: 0,45 × x − 19.470,38
```

Wichtig: S3 ist **kein** 42-%-Pauschalmodell. Die App darf nicht schreiben, dass „dein Grenzsteuersatz“ direkt angewendet wird. Die zusätzliche Steuer ergibt sich ausschließlich aus der Differenz zwischen Einkommensteuer mit und ohne ETF-Gewinn.

Für S0:

```text
steuerpflichtiger Anteil = 0 % auf Kursgewinne
```

Berechne die maximale monatliche Netto-Entnahme so, dass das Depot nach dem gewählten Entnahmezeitraum näherungsweise bei null landet.

Nutze dafür z. B. binäre Suche auf die Brutto- oder Netto-Entnahme. Die bestehende Logik mit iterativer Bisection über viele Schritte kann übernommen werden.

---

## Verifikation mit Referenzwerten

Wenn die Implementierung mit dem vereinfachten Modell der Referenzrechnung folgt, sollen bei folgenden Default-Werten Größenordnungen in der Nähe dieser Werte liegen:

- 200 €/Monat Sparrate
- 25 Jahre Ansparzeit
- 30 Jahre Entnahmezeitraum
- 7,0 % Bruttorendite

Referenzwerte aus dem bisherigen Prompt-Stand:

- S0: Depot ca. 156.979 €, Entnahme ca. 872 €/Monat
- S1: Depot ca. 143.690 €, Entnahme ca. 798 €/Monat
- S2: Depot ca. 119.218 €, Entnahme ca. 662 €/Monat
- S3: frühere Referenzwerte mit pauschalem 42-%-Modell sind **nicht** mehr als strenge Zielfunktion zu behandeln, weil S3 jetzt als Einkommensteuer-Differenzmodell gerechnet wird

Nutze diese Werte als Plausibilitätscheck für S0 bis S2 und als historische Kalibrierung, nicht als starres Muss für das neue S3-Modell.

---

## Einwand-Kachel: Was, wenn der Pauschbetrag steigt?

Nimm keinen zusätzlichen Hauptmodus und keine fünfte Szenario-Linie auf. Ergänze stattdessen innerhalb oder direkt unter S3 eine kleine Einwand-Kachel:

```text
Was, wenn der Pauschbetrag steigt?
Ein höherer Pauschbetrag hilft kleinen Kapitalerträgen. Aber er ersetzt keine Teilfreistellung: Der Pauschbetrag ist fix, die Teilfreistellung schützt prozentual jeden Euro ETF-Gewinn.
```

Rechne optional dynamisch für das erste Rentenjahr oder für ein repräsentatives Rentenjahr:

```text
ETF-Gewinn = Entnahme × Gewinnanteil
steuerpflichtige Basis heute = max(0, ETF-Gewinn × 70 % − 1.000 €)
steuerpflichtige Basis ohne Teilfreistellung, aber mit 1.500 € Pauschbetrag = max(0, ETF-Gewinn − 1.500 €)
Differenz = neue Basis − heutige Basis
```

Faustregel als Textbaustein:

```text
Bei realisierten ETF-Gewinnen über rund 1.667 € pro Jahr ist „keine Teilfreistellung, aber 1.500 € Pauschbetrag“ bereits eine höhere steuerpflichtige Basis als das heutige System mit 30 % Teilfreistellung und 1.000 € Pauschbetrag.
```

Wenn die App diese Kachel dynamisch befüllt, formuliere laienverständlich:

```text
Bei deinem Setup entstehen im ersten Rentenjahr ca. X € realisierte ETF-Gewinne. Ein Pauschbetrag von 1.500 € würde S3 um Y € pro Monat verbessern, ändert aber nicht die Grundlogik: Der Wegfall der Teilfreistellung wirkt bei größeren ETF-Gewinnen stärker als der höhere Freibetrag.
```

---

# Chart-Anforderungen

Nutze die bestehende Chart-Idee aus der HTML-App als Grundlage.

Ein einziges Koordinatensystem:

- x-Achse: Jahre
- y-Achse: Depotwert
- linke Phase: Ansparphase
- rechte Phase: Entnahmephase
- vertikale Trennlinie zwischen Ansparen und Entsparen
- vier Linien: S0, S1, S2, S3

Zusätzliche Umsetzungsregeln:

- S0 grün, S1 teal, S2 orange, S3 mauve/rot
- das aktive Szenario wird hervorgehoben, die anderen bleiben als dünnere Referenzlinien sichtbar
- gestrichelte vertikale Trennlinie zwischen Anspar- und Entnahmephase
- animierter Szenario-Wechsel, Linien morphen statt zu springen
- rotes X als Marker, wenn ein Szenario-Depot erschöpft wird
- Labels direkt an den Linien, keine klassische Box-Legende

Der Chart soll zeigen:

- wie sich die Szenarien während der Ansparphase auseinanderentwickeln,
- wie stark die Monatsentnahme in der Rentenphase sinkt,
- wann das Depot auf Null läuft, falls relevant,
- welche politische Bandbreite entsteht.

Die Linie für „Deutschland heute“ darf visuell als Referenz hervorgehoben werden.

---

# Headline-Logik

Unter oder über dem Chart soll eine dynamische Hauptaussage stehen.

Beispiele:

```text
Deutschland heute: 798 € monatlich.
DE vor 2009 wären es 872 € gewesen – 74 € mehr jeden Monat.
```

Oder bei S3:

```text
Im Einkommensteuer-Szenario werden ETF-Gewinne zu deinem übrigen zu versteuernden Einkommen addiert.
Bei 60.000 € zu versteuerndem Jahreseinkommen bleiben X € monatlich.
Das sind Y € weniger als im heutigen Recht – jeden Monat, 30 Jahre lang.
```

Die App soll immer eine klare Pointe erzeugen:

```text
Der Unterschied beträgt X € pro Monat oder Y € über die gesamte Rentenphase.
```

Emotionale Regel: Es gibt genau **eine** dominante Aussage, nicht mehrere konkurrierende Botschaften.

---

# KPI-Block

Baue einen KPI-Block mit klaren Zahlenkarten. Desktop: vier nebeneinander, Tablet: zwei, Mobile: eine unter der anderen.

Mindestens diese KPIs:

- Endvermögen nach der Ansparphase
- maximale monatliche Entnahme im aktiven Szenario
- Differenz zu Deutschland heute oder zu S0
- politische Bandbreite bzw. gesamte Differenz über die Rentenphase

Optional zusätzlich:

- Steuerlast gesamt in Euro
- Vergleich mit vs. ohne Steuerwirkung

Keine Tabellen als Hauptausgabe. Zahlen gehören primär in Karten und Chart.

---

# Transparenzbereich

Baue einen aufklappbaren Bereich:

```text
Wie wir gerechnet haben
```

Dort klar aufführen:

- Teilfreistellung als heutiger gesetzlicher Schutzmechanismus und pauschaler Ausgleich für Vorbelastungen auf Fondsebene
- Sparerpauschbetrag
- Kapitalertragsteuer + Soli
- S3 als Einkommensteuer-Differenzmodell: ESt(zvE + ETF-Gewinn) − ESt(zvE)
- keine Kirchensteuer
- keine Zusammenveranlagung
- kein Solidaritätszuschlag im S3-Einkommensteuer-Modell
- keine Inflation
- keine Monte-Carlo-Simulation
- keine Steuerberatung

Kein defensiver Disclaimer-Friedhof am Ende.

---

# Expertenmodus: freier regulatorischer Renditeverlust

Übernimm aus der bestehenden HTML-App den Gedanken des frei wählbaren Renditeverlusts, aber platziere ihn als optionalen Bereich.

Titel:

```text
Expertenmodus: Was wäre, wenn Regulierung deine Rendite dauerhaft senkt?
```

Kurztext:

```text
Nicht jede politische Belastung wirkt exakt wie eine Steuer. Manche Eingriffe senken die erwartete Rendite indirekt: durch Produktverbote, höhere Kosten, schlechtere Fondsbedingungen oder neue Abgaben. Hier kannst du einen pauschalen Renditeverlust simulieren.
```

Inputs:

- Renditeverlust in der Sparphase: 0–3 Prozentpunkte
- Renditeverlust in der Rentenphase: 0–3 Prozentpunkte

Dieser Modus darf die bestehende Logik der HTML-App verwenden:

- Endvermögen ohne Drag
- Endvermögen mit Drag
- nötige höhere Sparrate
- jährliche oder monatliche Auszahlungseinbuße

Aber:

- nicht als Hauptmodus anzeigen,
- nur aufklappbar oder nach Hauptsimulation,
- klar als „Was-wäre-wenn“-Simulation kennzeichnen.

---

# UX-Prinzipien

## 1. Erst Story, dann Slider

Die App darf nicht mit fünf Eingaben starten. Sie soll zuerst erklären, was überhaupt verglichen wird.

## 2. Keine parallelen mentalen Modelle

Vermeide, dass Nutzer gleichzeitig Steuer-Szenarien und abstrakte Renditeverluste interpretieren müssen. Der freie Renditeverlust gehört in den Expertenmodus.

## 3. Monatsbetrag schlägt Endvermögen

Finanzlaien verstehen „232 € weniger pro Monat“ besser als „55.062 € Steuerlast“.

## 4. S1 fair rechnen

„Deutschland heute“ darf nicht künstlich schlecht aussehen. Die Wirkung ist stärker, wenn das heutige Recht fair und transparent modelliert wird.

## 5. Transparenz statt Disclaimer-Friedhof

Keine lange defensive Disclaimer-Wand am Ende.

## 6. Einwände sichtbar machen, aber nicht zur Hauptnavigation machen

Die App soll den naheliegenden Einwand „Was, wenn der Pauschbetrag dafür steigt?“ sichtbar beantworten. Dieser Einwand bekommt eine kleine Kachel, aber kein eigenes Hauptszenario.

## 7. Eine Hauptgeschichte, kein Feature-Brei

Der freie Regulatorik-Drag, alternative Entnahmemodi oder weitere Steuerdetails dürfen die Kernstory nicht verdrängen.

---

# Design-Vorgaben

Nutze die visuelle Richtung der bestehenden HTML-App:

- warmes Beige als Hintergrund
- Teal als primärer Akzent
- Rot/Magenta sparsam für Abzüge und Verluste
- Karten mit weichen Rundungen
- klare KPI-Zahlen
- mobile-first Layout
- große Touch-Ziele
- Charts nicht zu klein auf Mobile
- editorialer Charakter statt Bankrechner-Optik

Farb-Zuordnung Szenarien:

- S0: Grün
- S1: Teal
- S2: Orange
- S3: Mauve/Rot

Dark/Light-Mode vorsehen.

---

# Gewünschte Komponenten

Baue mindestens diese Komponenten:

1. Hero/Kernaussage
2. Kassenbon-Euro
3. CTA zum Sprung in die Simulation
4. Eingabebereich für Hauptparameter
5. Szenario-Karten S0–S3
6. Lifecycle-Chart
7. Dynamische Headline mit Monatsdifferenz
8. KPI-Block
9. Aufklappbarer Bereich „Wie wir gerechnet haben“
10. Einwand-Kachel „Was, wenn der Pauschbetrag steigt?“ innerhalb oder direkt unter S3
11. Optionaler Expertenmodus „freier Regulatorik-Drag“
12. Reset-Button

---

# Beispiel-Texte für Szenarien

## S0 – DE vor 2009

```text
Historischer Anker: Kursgewinne konnten nach ausreichender Haltedauer steuerfrei sein. Das ist kein exotisches Auslandsmodell, sondern war in Deutschland lange Realität.
```

## S1 – Deutschland heute

```text
Aktuelles deutsches Recht: Kapitalertragsteuer plus Solidaritätszuschlag, bei Aktien-ETFs mit 30 % Teilfreistellung und Sparerpauschbetrag.
```

## S2 – Pauschale Vollbesteuerung

```text
Was wäre, wenn ETF-Gewinne auf Anlegerebene vollständig der Abgeltungsteuer unterliegen: keine Teilfreistellung, kein Pauschbetrag. Das ist ein hartes Belastungsszenario und zeigt, wie viel die heutigen Schutzmechanismen wert sind.
```

## S3 – Einkommensteuer-Modell

```text
Kapitalerträge werden wie normales Einkommen behandelt: Realisierte ETF-Gewinne werden zu deinem übrigen zu versteuernden Einkommen addiert. Die App rechnet nicht mit einem pauschalen Steuersatz, sondern mit der Differenz aus Einkommensteuer mit und ohne ETF-Gewinn. Keine Teilfreistellung, kein Pauschbetrag. Ein höherer Pauschbetrag wird nicht als eigenes Hauptszenario aufgenommen, sondern als Einwand transparent eingeordnet.
```

---

# Technische Anforderungen

- Einzelne HTML-Datei
- Inline-CSS und Inline-JS, Ghost.io-kompatibel als HTML-Card
- keine globalen Namenskonflikte
- robuste Zahleneingaben im deutschen Format
- `Intl.NumberFormat('de-DE')` für Euro und Prozent
- saubere Rundung
- responsive Chart-Größe
- kein `localStorage`
- keine Tracking-Skripte
- keine Bedienung nur über Hover
- gute Performance auf Mobilgeräten
- zugängliche Labels für Inputs

Erlaubte Libraries via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@3.0.1/dist/chartjs-plugin-annotation.min.js"></script>
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
```

Keine unnötigen externen Fonts außer bewusst eingesetzter Satoshi plus Fallback `system-ui, sans-serif`.

---

# Was NICHT gebaut werden soll

- keine abstrakten Renditeverlust-Schieberegler als Haupteingabe
- keine internationale Vergleichsnarration als Hauptstory
- keine fünfte Hauptlinie für Pauschbetrag-Kompromisse
- kein defensiver Disclaimer-Block am Ende
- keine Tabellen als primäre Hauptausgabe
- keine separate zweite HTML-Datei
- kein Feature-Overload mit zu vielen offenen Parametern

---

# Qualitätskriterien

Die Super-App ist gelungen, wenn ein Nutzer nach 60 Sekunden sagen kann:

1. Früher, heute und mögliche Zukunft unterscheiden sich massiv.
2. Steuern sind größer als TER und Brokerkosten.
3. Die Wahl des Steuerregimes verändert meine Monatsrente.
4. Deutschland heute ist nicht steuerfrei, aber auch nicht das schlechteste Szenario.
5. Eine Besteuerung von ETF-Gewinnen über die Einkommensteuer-Differenz wäre für viele Anleger deutlich spürbar, ohne als pauschales 42-%-Modell dargestellt zu werden.

---

# Output-Format

Gib ausschließlich den vollständigen Code der Datei aus:

```html
<!-- etf-wahlurnen-super-app.html -->
...
```

Keine zusätzliche Erklärung außerhalb des Codes. Der Code muss direkt als HTML-Datei speicherbar und im Browser ausführbar sein.

---

# Konsolidierungsnotizen

Diese Master-Version übernimmt aus V4 vor allem:

- das präzisere fachliche S2-/S3-Modell,
- die Einwand-Kachel zum höheren Pauschbetrag,
- die klare Begrenzung der Haupteingaben,
- die stärkere steuerlogische Präzision.

Diese Master-Version übernimmt aus dem Perplexity-Prompt vor allem:

- den klaren CTA im Einstieg,
- die präziseren Chart-Verhaltensregeln,
- die Farbzuordnung der Szenarien,
- die Referenzwerte zur Plausibilisierung,
- die explizite Negativliste dessen, was nicht gebaut werden soll.

Wenn ältere Prompt-Stände an einer Stelle davon abweichen, gilt diese Master-Version.
