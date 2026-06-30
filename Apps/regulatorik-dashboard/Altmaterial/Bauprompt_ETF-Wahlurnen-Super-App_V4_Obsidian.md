---
Angelegt am: 30.04.2026 20:48:13
zuletzt verändert am: 2026-05-01T00:30:00+02:00
title: "Bauprompt: ETF-Wahlurnen-Super-App V4"
version: 4.0
type: LLM-Prompt
tags:
  - app-konzept
  - etf
  - steuern
  - regulatorik
  - prompt
  - obsidian
---
---
up:: 
# Bauprompt: ETF-Wahlurnen-Super-App V4

## Kontext für das ausführende LLM

Du erhältst drei Inputs:

1. Eine bereits umgesetzte HTML-App: `dashboard-regulatorikXIX.html`
2. Eine Konzept-/Spezifikationsdatei: `ETF-Wahlurnen-App-Abschlussdokumentation_V2.md`
3. Die folgende strategische Einordnung:

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

Baue aus den beiden Dateien eine einzige, produktionsnahe **Super-App** als einzelne HTML-Datei.

Die App soll für Einbettung in Ghost.io geeignet sein:

- eine einzige HTML-Datei
- kein Server
- kein Build-Prozess
- alle Berechnungen clientseitig in JavaScript
- Styles inline oder per CDN-kompatiblem Ansatz
- Chart.js per CDN erlaubt
- keine unnötigen externen Abhängigkeiten
- responsive, mobile-first
- Dark-/Light-Mode-fähig, falls in der bestehenden App bereits angelegt

Der Output soll eine vollständige Datei sein:

```text
etf-wahlurnen-super-app.html
```

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

Vorschlag für Titel:

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
- Falls du die Werte aus der MD-Datei übernimmst, halte die dazugehörigen Annahmen sichtbar.
- Verwende Rot nur für Abzüge, Teal/Grün für Netto oder positive Werte.

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

Nimm kein fünftes Hauptszenario für einen erhöhten Pauschbetrag auf. Politische Kompromissvarianten wie „persönlicher Einkommensteuertarif, aber 1.500 € Pauschbetrag“ sollen als Einwand-Kachel erklärt werden, nicht als zusätzliche Linie im Chart.

---

# Eingaben im Hauptmodus

Halte die Eingaben schlank.

Standardwerte aus der MD-Konzeptdatei bzw. aus dieser V3-Präzisierung:

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

---

# Modus der Entnahmephase

Nutze als Standard **Modus B** aus der MD-Datei:

> Wie viel kann ich monatlich entnehmen, wenn das Depot nach X Jahren auf Null laufen darf?

Warum:

- Monatsbeträge sind für Laien emotional greifbarer als abstrakte Depotlaufzeiten.
- Die stärkste Pointe ist: „Du hast X € weniger pro Monat.“

Optional kann später ein Modus A ergänzt werden:

> Wie lange reicht mein Depot bei einer gewünschten Monatsentnahme?

Für diese Version reicht Modus B.

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

---

## Entnahmephase

Nutze die Anteilsmethode aus der MD-Datei:

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

Wichtig: S3 ist kein 42-%-Pauschalmodell. Die App darf nicht schreiben, dass „dein Grenzsteuersatz“ direkt angewendet wird. Die zusätzliche Steuer ergibt sich ausschließlich aus der Differenz zwischen Einkommensteuer mit und ohne ETF-Gewinn.

Für S0:

```text
steuerpflichtiger Anteil = 0 % auf Kursgewinne
```

### Einwand-Kachel: Was, wenn der Pauschbetrag steigt?

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

Berechne die maximale monatliche Netto-Entnahme so, dass das Depot nach dem gewählten Entnahmezeitraum näherungsweise bei null landet.

Nutze dafür z. B. binäre Suche auf die Brutto- oder Netto-Entnahme.

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

Direktbeschriftung der Linien ist besser als eine große Legende.

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
Bei 60.000 € zu versteuerndem Jahreseinkommen bleiben 566 € monatlich.
Das sind 232 € weniger als im heutigen Recht – jeden Monat, 30 Jahre lang.
```

Die App soll immer eine klare Pointe erzeugen:

```text
Der Unterschied beträgt X € pro Monat oder Y € über die gesamte Rentenphase.
```

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
- jährliche/monatliche Auszahlungseinbuße

Aber:

- nicht als Hauptmodus anzeigen,
- nur aufklappbar oder nach Hauptsimulation,
- klar als „Was-wäre-wenn“-Simulation kennzeichnen.

---

# UX-Prinzipien

Priorisiere diese Prinzipien:

## 1. Erst Story, dann Slider

Die App darf nicht mit fünf Eingaben starten. Sie soll zuerst erklären, was überhaupt verglichen wird.

## 2. Keine parallelen mentalen Modelle

Vermeide, dass Nutzer gleichzeitig Steuer-Szenarien und abstrakte Renditeverluste interpretieren müssen. Der freie Renditeverlust gehört in den Expertenmodus.

## 3. Monatsbetrag schlägt Endvermögen

Finanzlaien verstehen „232 € weniger pro Monat“ besser als „55.062 € Steuerlast“.

## 4. S1 fair rechnen

„Deutschland heute“ darf nicht künstlich schlecht aussehen. Die Wirkung ist stärker, wenn das heutige Recht fair und transparent modelliert wird.

## 5. Transparenz statt Disclaimer-Friedhof

Keine lange defensive Disclaimer-Wand am Ende. Stattdessen ein aufklappbarer Bereich:

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

## 6. Einwände sichtbar machen, aber nicht zur Hauptnavigation machen

Die App soll den naheliegenden Einwand „Was, wenn der Pauschbetrag dafür steigt?“ sichtbar beantworten. Dieser Einwand bekommt eine kleine Kachel, aber kein eigenes Hauptszenario. So bleibt die Story klar, ohne holzschnittartig zu werden.

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
- keine überladene Tabelle
- Charts nicht zu klein auf Mobile

Die App soll editorial wirken, nicht wie ein Bankrechner.

---

# Gewünschte Komponenten

Baue mindestens diese Komponenten:

1. Hero/Kernaussage
2. Kassenbon-Euro
3. Eingabebereich für Hauptparameter
4. Szenario-Karten S0–S3
5. Lifecycle-Chart
6. Dynamische Headline mit Monatsdifferenz
7. Detail-KPIs:
   - Endvermögen nach Ansparphase je Szenario
   - maximale Monatsentnahme je Szenario
   - Differenz zu Deutschland heute
   - Differenz zu DE vor 2009
   - Gesamtdifferenz über die Rentenphase
8. Aufklappbarer Bereich „Wie wir gerechnet haben“
9. Einwand-Kachel „Was, wenn der Pauschbetrag steigt?“ innerhalb oder direkt unter S3
10. Optionaler Expertenmodus „freier Regulatorik-Drag“
11. Reset-Button

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

# Qualitätskriterien

Die Super-App ist gelungen, wenn ein Nutzer nach 60 Sekunden sagen kann:

1. Früher, heute und mögliche Zukunft unterscheiden sich massiv.
2. Steuern sind größer als TER und Brokerkosten.
3. Die Wahl des Steuerregimes verändert meine Monatsrente.
4. Deutschland heute ist nicht steuerfrei, aber auch nicht das schlechteste Szenario.
5. Eine Besteuerung von ETF-Gewinnen über die Einkommensteuer-Differenz wäre für viele Anleger deutlich spürbar, ohne als pauschales 42-%-Modell dargestellt zu werden.

---

# Technische Qualitätskriterien

Bitte achte auf:

- keine globalen Namenskonflikte, wenn in Ghost eingebettet
- robuste Zahleneingaben im deutschen Format
- `Intl.NumberFormat('de-DE')` für Euro und Prozent
- saubere Rundung
- responsive Chart-Größe
- kein localStorage
- keine Tracking-Skripte
- keine unnötigen externen Fonts, außer bereits im Bestand bewusst genutzt
- gute Performance auf Mobilgeräten
- zugängliche Labels für Inputs
- keine Bedienung nur über Hover

---

# Output-Format

Gib ausschließlich den vollständigen Code der Datei aus:

```html
<!-- etf-wahlurnen-super-app.html -->
...
```

Keine zusätzliche Erklärung außerhalb des Codes.

Der Code muss direkt als HTML-Datei speicherbar und im Browser ausführbar sein.

---

# Änderungsprotokoll V4

Diese Version ändert nur die Stellen, die durch die neue Bewertung von S2/S3, Pauschbetrag und Teilfreistellung nötig sind. Die Grundstruktur bleibt unverändert: vier Hauptszenarien, keine zusätzliche Szenario-Linie, Lifecycle-Chart, Transparenzbereich, Expertenmodus und Output-Format bleiben erhalten.

## Was geändert wurde

1. **S2 präziser benannt**  
   S2 heißt jetzt „Pauschale Vollbesteuerung“ statt „Vergünstigungen weg“. Dadurch wird klarer, dass es ein hartes Belastungsszenario ist und keine Prognose.

2. **Keine fünfte Hauptvariante aufgenommen**  
   Ein politischer Kompromiss wie „persönlicher Einkommensteuertarif, aber 1.500 € Pauschbetrag“ wird nicht als eigenes Szenario modelliert. Das verhindert eine Verzettelung der Hauptstory.

3. **Einwand-Kachel zum höheren Pauschbetrag ergänzt**  
   Die App soll den Einwand sichtbar beantworten: Ein höherer Pauschbetrag hilft kleinen Kapitalerträgen, ersetzt aber die prozentuale Teilfreistellung bei größeren ETF-Gewinnen meist nicht.

4. **Faustregel zum 1.500-€-Pauschbetrag ergänzt**  
   Bei realisierten ETF-Gewinnen über rund 1.667 € pro Jahr ist „keine Teilfreistellung, aber 1.500 € Pauschbetrag“ bereits eine höhere steuerpflichtige Basis als das heutige System mit 30 % Teilfreistellung und 1.000 € Pauschbetrag.

5. **Teilfreistellung fachlich eingeordnet**  
   Die Teilfreistellung wird als heutiger gesetzlicher Schutzmechanismus und pauschaler Ausgleich für Vorbelastungen auf Fondsebene beschrieben. Eine Änderung bleibt politisch möglich, aber eine ersatzlose Streichung wird als Bruch im heutigen Investmentsteuersystem eingeordnet.

---

# Diff V3 → V4

```diff
--- V3
+++ V4
@@ -1,8 +1,8 @@
 ---
 Angelegt am: 30.04.2026 20:48:13
-zuletzt verändert am: 2026-05-01T00:00:00+02:00
-title: "Bauprompt: ETF-Wahlurnen-Super-App V3"
-version: 3.0
+zuletzt verändert am: 2026-05-01T00:30:00+02:00
+title: "Bauprompt: ETF-Wahlurnen-Super-App V4"
+version: 4.0
 type: LLM-Prompt
 tags:
   - app-konzept
@@ -14,7 +14,7 @@
 ---
 ---
 up:: 
-# Bauprompt: ETF-Wahlurnen-Super-App V3
+# Bauprompt: ETF-Wahlurnen-Super-App V4
 
 ## Kontext für das ausführende LLM
 
@@ -193,7 +193,7 @@
 |---|---|---|
 | S0 | DE vor 2009 | Kursgewinne nach Haltedauer steuerfrei |
 | S1 | Deutschland heute | aktuelles deutsches Steuerregime mit Teilfreistellung und Sparerpauschbetrag |
-| S2 | Vergünstigungen weg | keine Teilfreistellung, kein Sparerpauschbetrag, volle Abgeltungsteuer |
+| S2 | Pauschale Vollbesteuerung | ETF-Gewinne werden vollständig mit Abgeltungsteuer belastet; keine Teilfreistellung, kein Pauschbetrag. Härteres Belastungsszenario, das den Wert der heutigen Schutzmechanismen zeigt. |
 | S3 | Einkommensteuer-Modell | ETF-Gewinne werden zum zu versteuernden Einkommen addiert; zusätzliche Steuer = ESt(zvE + ETF-Gewinn) − ESt(zvE), keine Teilfreistellung, kein Pauschbetrag |
 
 Die App soll standardmäßig alle vier Szenarien sichtbar vergleichen.
@@ -210,7 +210,9 @@
 
 S0 ist der historische Anker.  
 S1 ist die heutige Realität.  
-S2 und S3 sind politische Verschlechterungsszenarien.
+S2 und S3 sind politische Verschlechterungsszenarien. S2 ist ein Belastungstest für den Wegfall heutiger Schutzmechanismen, keine Prognose. S3 ist der zusätzliche Bruch: ETF-Gewinne werden wie normales Einkommen behandelt.
+
+Nimm kein fünftes Hauptszenario für einen erhöhten Pauschbetrag auf. Politische Kompromissvarianten wie „persönlicher Einkommensteuertarif, aber 1.500 € Pauschbetrag“ sollen als Einwand-Kachel erklärt werden, nicht als zusätzliche Linie im Chart.
 
 ---
 
@@ -312,7 +314,7 @@
 
 1. S0: keine Steuer auf Kursgewinne nach Haltedauer.
 2. S1: 26,375 % Kapitalertragsteuer inkl. Soli, aber nur auf 70 % der Gewinne wegen 30 % Teilfreistellung; Sparerpauschbetrag 1.000 €/Jahr berücksichtigen, soweit sinnvoll modellierbar.
-3. S2: 26,375 % auf volle Kapitalerträge, kein Pauschbetrag, keine Teilfreistellung.
+3. S2: 26,375 % auf volle Kapitalerträge, kein Pauschbetrag, keine Teilfreistellung. Dieses Szenario ist als harte pauschale Vollbesteuerung zu kennzeichnen, nicht als Prognose.
 4. S3: volle realisierte ETF-Gewinne werden zum zu versteuernden Jahreseinkommen addiert. Steuer auf ETF-Gewinne = ESt(zvE + ETF-Gewinn) − ESt(zvE), kein Pauschbetrag, keine Teilfreistellung.
 
 Wichtig:
@@ -320,6 +322,7 @@
 - S1 soll fair und nicht übertrieben schlecht gerechnet werden.
 - S2/S3 dürfen als politische Verschlechterungsszenarien erkennbar sein.
 - Verwende Tooltips oder Infoboxen, um die Modellunterschiede zu erklären.
+- Die Teilfreistellung ist als heutiger Schutzmechanismus darzustellen, der gesetzlich geregelt und systematisch durch die Besteuerung auf Fondsebene begründet ist. Eine Änderung ist politisch möglich, aber eine ersatzlose Streichung wäre ein echter Bruch im heutigen Investmentsteuersystem.
 
 ---
 
@@ -383,6 +386,36 @@
 steuerpflichtiger Anteil = 0 % auf Kursgewinne
 ```
 
+### Einwand-Kachel: Was, wenn der Pauschbetrag steigt?
+
+Nimm keinen zusätzlichen Hauptmodus und keine fünfte Szenario-Linie auf. Ergänze stattdessen innerhalb oder direkt unter S3 eine kleine Einwand-Kachel:
+
+```text
+Was, wenn der Pauschbetrag steigt?
+Ein höherer Pauschbetrag hilft kleinen Kapitalerträgen. Aber er ersetzt keine Teilfreistellung: Der Pauschbetrag ist fix, die Teilfreistellung schützt prozentual jeden Euro ETF-Gewinn.
+```
+
+Rechne optional dynamisch für das erste Rentenjahr oder für ein repräsentatives Rentenjahr:
+
+```text
+ETF-Gewinn = Entnahme × Gewinnanteil
+steuerpflichtige Basis heute = max(0, ETF-Gewinn × 70 % − 1.000 €)
+steuerpflichtige Basis ohne Teilfreistellung, aber mit 1.500 € Pauschbetrag = max(0, ETF-Gewinn − 1.500 €)
+Differenz = neue Basis − heutige Basis
+```
+
+Faustregel als Textbaustein:
+
+```text
+Bei realisierten ETF-Gewinnen über rund 1.667 € pro Jahr ist „keine Teilfreistellung, aber 1.500 € Pauschbetrag“ bereits eine höhere steuerpflichtige Basis als das heutige System mit 30 % Teilfreistellung und 1.000 € Pauschbetrag.
+```
+
+Wenn die App diese Kachel dynamisch befüllt, formuliere laienverständlich:
+
+```text
+Bei deinem Setup entstehen im ersten Rentenjahr ca. X € realisierte ETF-Gewinne. Ein Pauschbetrag von 1.500 € würde S3 um Y € pro Monat verbessern, ändert aber nicht die Grundlogik: Der Wegfall der Teilfreistellung wirkt bei größeren ETF-Gewinnen stärker als der höhere Freibetrag.
+```
+
 Berechne die maximale monatliche Netto-Entnahme so, dass das Depot nach dem gewählten Entnahmezeitraum näherungsweise bei null landet.
 
 Nutze dafür z. B. binäre Suche auf die Brutto- oder Netto-Entnahme.
@@ -508,7 +541,7 @@
 
 Dort klar aufführen:
 
-- Teilfreistellung
+- Teilfreistellung als heutiger gesetzlicher Schutzmechanismus und pauschaler Ausgleich für Vorbelastungen auf Fondsebene
 - Sparerpauschbetrag
 - Kapitalertragsteuer + Soli
 - S3 als Einkommensteuer-Differenzmodell: ESt(zvE + ETF-Gewinn) − ESt(zvE)
@@ -518,6 +551,10 @@
 - keine Inflation
 - keine Monte-Carlo-Simulation
 - keine Steuerberatung
+
+## 6. Einwände sichtbar machen, aber nicht zur Hauptnavigation machen
+
+Die App soll den naheliegenden Einwand „Was, wenn der Pauschbetrag dafür steigt?“ sichtbar beantworten. Dieser Einwand bekommt eine kleine Kachel, aber kein eigenes Hauptszenario. So bleibt die Story klar, ohne holzschnittartig zu werden.
 
 ---
 
@@ -556,8 +593,9 @@
    - Differenz zu DE vor 2009
    - Gesamtdifferenz über die Rentenphase
 8. Aufklappbarer Bereich „Wie wir gerechnet haben“
-9. Optionaler Expertenmodus „freier Regulatorik-Drag“
-10. Reset-Button
+9. Einwand-Kachel „Was, wenn der Pauschbetrag steigt?“ innerhalb oder direkt unter S3
+10. Optionaler Expertenmodus „freier Regulatorik-Drag“
+11. Reset-Button
 
 ---
 
@@ -575,16 +613,16 @@
 Aktuelles deutsches Recht: Kapitalertragsteuer plus Solidaritätszuschlag, bei Aktien-ETFs mit 30 % Teilfreistellung und Sparerpauschbetrag.
 ```
 
-## S2 – Vergünstigungen weg
-
-```text
-Was wäre, wenn Teilfreistellung und Pauschbetrag entfallen? Dann wird aus heutiger Besteuerung ein deutlich härterer Renditefresser.
+## S2 – Pauschale Vollbesteuerung
+
+```text
+Was wäre, wenn ETF-Gewinne auf Anlegerebene vollständig der Abgeltungsteuer unterliegen: keine Teilfreistellung, kein Pauschbetrag. Das ist ein hartes Belastungsszenario und zeigt, wie viel die heutigen Schutzmechanismen wert sind.
 ```
 
 ## S3 – Einkommensteuer-Modell
 
 ```text
-Kapitalerträge werden wie normales Einkommen behandelt: Realisierte ETF-Gewinne werden zu deinem übrigen zu versteuernden Einkommen addiert. Die App rechnet nicht mit einem pauschalen Steuersatz, sondern mit der Differenz aus Einkommensteuer mit und ohne ETF-Gewinn.
+Kapitalerträge werden wie normales Einkommen behandelt: Realisierte ETF-Gewinne werden zu deinem übrigen zu versteuernden Einkommen addiert. Die App rechnet nicht mit einem pauschalen Steuersatz, sondern mit der Differenz aus Einkommensteuer mit und ohne ETF-Gewinn. Keine Teilfreistellung, kein Pauschbetrag. Ein höherer Pauschbetrag wird nicht als eigenes Hauptszenario aufgenommen, sondern als Einwand transparent eingeordnet.
 ```
 
 ---
```
