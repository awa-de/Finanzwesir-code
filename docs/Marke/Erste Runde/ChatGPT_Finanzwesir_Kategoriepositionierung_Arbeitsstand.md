# Finanzwesir – Kategoriepositionierung: Arbeitsstand und Entscheidungslogik

**Zweck dieses Dokuments:**  
Dieses Dokument fasst die bisherige Diskussion zur Kategoriepositionierung der neuen Finanzwesir-Site so zusammen, dass ein anderes LLM damit weiterarbeiten, ein Peer Review durchführen oder daraus konkrete Architektur-/Text-/App-Vorschläge ableiten kann.

Der neue Leser soll nicht raten müssen. Deshalb enthält dieses Dokument nicht nur Ergebnisse, sondern auch Begründungen, implizite Annahmen, Tradeoffs, Sicherheitsgrade und offene Fragen.

---

# 1. Erkenntnisse und aktueller Stand

## 1.1 Amtliches Zwischenergebnis

Die neue Finanzwesir-Site soll nicht als ETF-Seite, Finanzportal, Produktvergleich, Finfluencer-Seite oder Broker-/ETF-Ratgeber positioniert werden.

Die Kategorie lautet:

> **Robuste finanzielle Selbstführung**

Der Claim / Nordstern lautet:

> **Finanzen geregelt – Freiräume geschaffen**

Die Site ist:

> **eine nicht-kommerzielle Erfahrungsarchitektur, die Menschen vom Finanzwissen ins finanzielle Handeln bringt.**

Noch konkreter:

> **Der Finanzwesir verkleinert den Abstand zwischen „ich weiß, was vernünftig wäre“ und „ich habe es endlich getan“.**

Diese Positionierung ist die aktuelle Hauptentscheidung.

**Sicherheitsgrad:** Amtliches Endergebnis für die weitere Arbeit, aber sprachlich noch schärfbar.

---

## 1.2 Was die Site nicht ist

Die Site ist ausdrücklich nicht:

- eine bessere ETF-Erklärseite,
- ein klassisches Finanzportal,
- ein Blog-Archiv,
- ein Produktvergleich,
- ein Broker-Affiliate-Projekt,
- eine Verkaufsseite für ETF + Trendfolger,
- eine Democratic-Alpha-Fortsetzung,
- eine akademische Behavioral-Finance-Seite,
- ein Optimierungs-Tool für Fortgeschrittene,
- ein reiner Content-Funnel.

**Sicherheitsgrad:** Amtliches Endergebnis. Diese Abgrenzung muss geschützt werden.

---

## 1.3 Die Kathedralen-Idee

Die Site ist ein Vermächtnisprojekt:

- 12 Jahre Finanzwesir,
- 5 Jahre Democratic Alpha,
- Ausstieg als Democratic-Alpha-Gesellschafter,
- privates Weiterleben des Konzepts mit Skin in the game,
- Marke Finanzwesir gehört dem Betreiber,
- keinerlei kommerzielle Interessen,
- Einladung an Besucher, eigene Schlüsse zu ziehen.

Das Bild lautet:

> **Kathedrale der Erfahrung**

Die Site soll wie eine Kathedrale funktionieren:

- gebaut aus Erfahrung,
- nicht aus Kampagne,
- nicht verkäuferisch,
- langfristig tragfähig,
- begehbar,
- mit Stationen, Prüfungen, Geländern und stiller Tiefe,
- offen für Besucher, aber ohne Drängen.

**Sicherheitsgrad:** Amtliches Endergebnis als internes Architekturprinzip. Öffentlich sollte der Begriff dosiert verwendet werden, damit es nicht pathetisch wirkt.

---

## 1.4 Zentrale Kategorie-These

Die zentrale These lautet:

> **Gute Geldanlage beginnt nicht beim Produkt, sondern beim Menschen, der das Produkt im falschen Moment verkaufen will.**

Oder:

> **Der Zinseszins arbeitet nur für Menschen, die lange genug investiert bleiben.**

Oder:

> **Langfristiges Investieren heißt zuerst: überleben.**

Das „Überleben“ ist nicht dramatisch gemeint, sondern praktisch:

- Drawdowns aushalten,
- nicht panisch verkaufen,
- nicht permanent neu optimieren,
- nicht an Komplexität scheitern,
- nicht auf morgen verschieben,
- investiert bleiben, damit der Zinseszins wirken kann.

**Sicherheitsgrad:** Amtliches Endergebnis. Das ist der wahrscheinlich stärkste Kategorienkern.

---

## 1.5 Zinseszinsfähigkeit als innerer Mechanismus

Die Kategorie „robuste finanzielle Selbstführung“ bekommt als inneren Mechanismus:

> **Zinseszinsfähigkeit**

Definition:

> Ein Portfolio ist zinseszinsfähig, wenn es kaufbar, verständlich, kostengünstig, breit genug diversifiziert und psychologisch durchhaltbar ist, sodass der Anleger lange genug investiert bleibt.

Wichtig:

- Zinseszinsfähigkeit ist nicht nur Renditemaximierung.
- Zinseszinsfähigkeit ist auch Überlebensfähigkeit.
- Ein Portfolio mit hoher theoretischer Rendite, das der Anleger im Crash verkauft, ist nicht zinseszinsfähig.
- Ein zu defensives Portfolio kann ebenfalls problematisch sein, wenn die reale Rendite zu niedrig ist.
- Ziel ist nicht minimale Volatilität, sondern maximale durchhaltbare Wachstumsrate.

**Sicherheitsgrad:** Amtliches Endergebnis als konzeptioneller Kern. Der Begriff „zinseszinsfähig“ ist intern sehr stark; nach außen muss er eventuell übersetzt werden.

---

## 1.6 Vom Produkt zum Portfolio

Eine zentrale Erkenntnis:

> **Ein Produkt kaufst du. Ein Portfolio musst du durchhalten.**

Die Site soll den Nutzer wegführen von der Frage:

> „Welches Produkt ist gut?“

hin zur Frage:

> „Was macht dieser Baustein mit meinem Gesamtportfolio und mit meinem Verhalten im schlechten Jahr?“

Das Portfolio verhält sich anders als seine Bestandteile. Die genutzten Analogien:

- Natrium + Chlor = Kochsalz,
- Kupfer + Zinn = Bronze.

Das ist die Idee der **Portfolio-Chemie**.

**Sicherheitsgrad:** Amtliches Endergebnis. Das ist ein sehr tragfähiger Non-Obvious-Insight.

---

## 1.7 Kaufbarkeit als Realitätsfilter

Eine der wichtigsten operativen Entscheidungen:

> **Nicht kaufbar, nicht geregelt.**

Erfahrung aus Coaching/Kursen/Gesprächen:

Menschen setzen oft erst um, wenn sie am Ende einen konkreten Waschzettel bekommen:

1. Was soll ich kaufen?  
   → WKN / ISIN

2. Wo soll ich kaufen?  
   → Broker-Tauglichkeit / Broker-Kandidaten

3. Wieviel soll ich kaufen?  
   → Portfolio-Prozente

Alles darunter senkt die Umsetzungswahrscheinlichkeit massiv.

Daher muss der Finanzwesir-Waschzettel konkret sein.

**Sicherheitsgrad:** Amtliches Endergebnis. Umsetzung rechtlich/kommunikativ sauber zu gestalten bleibt offen.

---

## 1.8 Der Waschzettel

Der Waschzettel ist die Brücke zwischen Einsicht und Handlung.

Definition:

> Der Waschzettel ist die kleinste noch verantwortbare Umsetzungshilfe: ISIN/WKN, Broker-Tauglichkeit, Prozentgewichtung und nächste Handlung.

Er ist:

- konkret,
- nicht kommerziell,
- keine persönliche Anlageberatung,
- kein „bester ETF“-Ranking,
- kein Affiliate-Tool,
- keine Produktmagie,
- eine Musterumsetzung der vorher erklärten Prinzipien.

Leitsatz:

> **Ohne Waschzettel bleibt Erkenntnis Theorie. Mit Waschzettel kann aus „morgen“ endlich „heute“ werden.**

**Sicherheitsgrad:** Amtliches Endergebnis, aber die genaue Formulierung, rechtliche Absicherung und UX-Platzierung müssen noch konkretisiert werden.

---

## 1.9 Finanzwesir-10 statt Finfluencer-10

Auf einer Skala von 1 bis 10 bei konkreter Produktempfehlung muss die Konkretheit praktisch bei 10 liegen, weil sonst die Umsetzung scheitert.

Aber es muss eine **Finanzwesir-10** sein, keine **Finfluencer-10**.

### Finfluencer-10

> Kauf diesen ETF bei diesem Broker über meinen Link.

### Finanzwesir-10

> Hier ist ein konkreter Waschzettel mit ISIN/WKN, Prozenten und Broker-Tauglichkeit. Keine Provision. Keine Magie. Keine persönliche Empfehlung. Eine einfache Musterumsetzung, weil Menschen sonst nicht anfangen.

**Sicherheitsgrad:** Amtliches Endergebnis.

---

## 1.10 Trendfolge / Andersläufer

Trendfolge soll nicht als Kategorie, nicht als Hauptversprechen und nicht als Einsteigerlösung positioniert werden.

Die Kategorie ist nicht:

> ETF + Trendfolger

Sondern:

> Robuste finanzielle Selbstführung / zinseszinsfähig investieren

Trendfolge ist ein möglicher **Andersläufer**.

Definition:

> Ein Andersläufer ist ein Baustein, der im Portfolio nicht deshalb interessant ist, weil er allein besonders schön aussieht, sondern weil er sich in bestimmten Marktphasen anders verhalten kann als Aktien.

Trendfolger sind:

- optional,
- fortgeschritten,
- nur nach Portfolio-Chemie-Verständnis,
- nur bei belastbarer Kaufbarkeit,
- nur mit klarer Risiko-/Durststrecken-Kommunikation,
- kein Einsteiger-Waschzettel-Baustein.

**Sicherheitsgrad:** Amtliches Endergebnis in der Grundrichtung. Details zur Produktprüfung und zur Frage, ob überhaupt ein Trendfolger-Waschzettel erscheinen darf, bleiben offen.

---

## 1.11 Show, don’t tell

Eine neue, sehr wichtige Ergänzung:

> **Die Theorie bleibt im Fundament. Der Nutzer sieht nur die Erfahrung.**

Die Site darf intern auf anspruchsvoller Theorie stehen:

- Ergodizität,
- Pfadabhängigkeit,
- Volatility Drag,
- arithmetische vs. geometrische Rendite,
- Fat Tails,
- linksschiefe/rechtsschiefe Verteilungen,
- Black Swan,
- Kahneman/System 1/System 2,
- Verlustaversion,
- Kontrollillusion,
- Campbell/Heldenreise,
- Storytelling-Mechaniken.

Aber der Nutzer darf nicht mit diesen Begriffen empfangen werden.

Regel:

> **Keine Fachbegriffe auf die Bühne, wenn eine App die Einsicht zeigen kann.**

Wie bei einem guten Film: Die Heldenreise wirkt, aber der Zuschauer muss Campbell nicht kennen.

**Sicherheitsgrad:** Amtliches Endergebnis. Das ist ein zentrales Bauprinzip der Site.

---

# 2. Category-Pirates-Einordnung

## 2.1 Existing Market Trap

Die Existing Market Trap wäre:

> Der Finanzwesir baut eine bessere ETF-Seite.

Dann tritt die Site in bestehende Märkte ein:

- ETF-Ratgeber,
- Finanzblog,
- Brokervergleich,
- Finanzportal,
- Finfluencer-Content,
- Finanzbildung.

Dort wird sie gemessen an:

- Aktualität,
- Vollständigkeit,
- Produktbreite,
- Brokerdetails,
- SEO,
- Tabellen,
- Vergleichbarkeit.

Das widerspricht der Kathedralenidee und würde die Kategorie zerstören.

**Entscheidung:** Die Site muss sich als Erfahrungsarchitektur positionieren, nicht als ETF-Ratgeber.

**Sicherheitsgrad:** Amtliches Endergebnis.

---

## 2.2 Better Trap

Die Better Trap wäre:

> Wir erklären ETFs, Diversifikation, Risiken und Trendfolge einfach besser als andere.

Das reicht nicht. Es wäre nur eine bessere Version einer bestehenden Kategorie.

Stattdessen muss die Site das Problem anders rahmen:

> Nicht Finanzwissen fehlt, sondern Aktivierung, Aushaltbarkeit und ein kaufbarer, durchhaltbarer Plan.

**Sicherheitsgrad:** Amtliches Endergebnis.

---

## 2.3 Obvious / Non-Obvious

### Obvious

- ETFs sind ein sinnvoller Startbaustein.
- Kosten niedrig halten.
- Langfristig investieren.
- Nicht hektisch handeln.
- Diversifizieren.
- Drawdowns aushalten.
- Zinseszins braucht Zeit.

### Non-Obvious

- Das Problem ist nicht primär Unwissen, sondern Umsetzung.
- Gerade einfache Lösungen scheitern oft an Aktivierungsenergie.
- Menschen scheitern am Abstand zwischen Einsicht und Handlung.
- Die wichtigste Portfolioeigenschaft ist nicht höchste theoretische Rendite, sondern Zinseszinsfähigkeit.
- Ein Produkt kann isoliert unattraktiv wirken und im Portfolio trotzdem helfen.
- Ein Portfolio ist ein neues Verhalten, nicht eine Produktliste.
- Kaufbarkeit ist kein Nebenthema, sondern der letzte Wahrheitsfilter.
- Komplexe Theorie muss in Erfahrung übersetzt werden, nicht in Begriffe.

**Sicherheitsgrad:** Amtliches Endergebnis. Hier liegt die stärkste Category-Design-Substanz.

---

## 2.4 DAM the Demand

Alte Nachfrage:

> Welchen ETF soll ich kaufen?  
> Welche ISIN?  
> Welcher Broker?  
> Wie viel Prozent?  
> Ist Trendfolge besser?  
> Was ist optimal?

Die Site lenkt um:

> Du glaubst, du suchst ein Produkt.  
> In Wahrheit brauchst du ein Finanzsystem, das du verstehst, kaufen und durchhalten kannst.

Oder:

> Du suchst die beste Rendite.  
> Aber der Zinseszins belohnt nur, was du lange genug durchhältst.

Oder:

> Du willst Kontrolle.  
> Aber erfolgreiche Geldanlage heißt, mit Kontrollverlust leben zu lernen.

**Sicherheitsgrad:** Amtliches Endergebnis als Demand-Umlenkung.

---

## 2.5 Name & Claim the Niche

Name:

> **Robuste finanzielle Selbstführung**

Claim:

> **Finanzen geregelt – Freiräume geschaffen**

Interner Mechanismus:

> **Zinseszinsfähigkeit**

Praktisches Versprechen:

> **Vom Wissen ins Handeln.**

Nische:

> Menschen, die keine Finanzprofis sind, aber ihre Finanzen selbst regeln wollen und an Aufschub, Komplexität, Unsicherheit und fehlender konkreter Umsetzung scheitern.

**Sicherheitsgrad:** Amtliches Endergebnis, aber sprachliche Feinjustierung möglich.

---

## 2.6 POV

Stärkster POV:

> **Gute Geldanlage beginnt nicht beim Produkt, sondern beim Menschen, der das Produkt im falschen Moment verkaufen will.**

Alternative POVs:

> Der Zinseszins arbeitet nur für Menschen, die lange genug investiert bleiben.

> Das beste Portfolio ist nicht das theoretisch renditestärkste, sondern das stärkste Portfolio, das du nicht aufgibst.

> Finanzprodukte ändern sich. Menschliche Fehler beim Investieren nicht.

**Sicherheitsgrad:** Amtliches Endergebnis, aber Auswahl des finalen Haupt-POV noch offen.

---

## 2.7 Languaging

Tragfähige Begriffe:

- robuste finanzielle Selbstführung,
- zinseszinsfähig,
- Finanzen geregelt – Freiräume geschaffen,
- Kathedrale der Erfahrung,
- Erfahrungsarchitektur,
- Aktivierungsarchitektur,
- Waschzettel,
- Portfolio-Chemie,
- Andersläufer,
- Aushaltbarkeit,
- Kaufbarkeit,
- Finanz-Geländer,
- im Spiel bleiben,
- schlechtes Jahr,
- „morgen fange ich an“,
- ein Produkt kaufst du, ein Portfolio musst du durchhalten.

Begriffe, die nicht in den Hauptpfad gehören:

- Ergodizität,
- Pfadabhängigkeit,
- Volatility Drag,
- arithmetische/geometrische Rendite,
- Fat Tails,
- linksschief/rechtsschief,
- Crisis Alpha,
- Managed Futures,
- System 1/System 2,
- Black Swan.

Diese Begriffe dürfen in den Expertenkeller, nicht auf die Hauptbühne.

**Sicherheitsgrad:** Amtliches Endergebnis.

---

## 2.8 Move the World

Der Finanzwesir bewegt nicht die Welt, indem er eine neue Finanztheorie erfindet.

Er bewegt seine Zielgruppe von:

> Finanzwissen konsumieren

zu:

> finanzielle Handlung ermöglichen

und von:

> Produktsuche

zu:

> durchhaltbarem Finanzsystem

und von:

> „morgen fange ich an“

zu:

> konkretem Startplan

und von:

> Kontrollillusion

zu:

> geregelt, was regelbar ist; den Rest muss der Plan aushalten.

Das ist der eigentliche „move the world“.

**Sicherheitsgrad:** Amtliches Endergebnis, sofern die Apps und der Waschzettel diesen Wechsel wirklich einlösen. Sonst nur Marketingbehauptung.

---

# 3. Begründungen und implizite Annahmen

## 3.1 Annahme: Menschen handeln nicht automatisch rational

Die Site geht davon aus:

- Menschen wissen oft genug, was vernünftig wäre.
- Trotzdem handeln sie nicht.
- Wissen allein erzeugt keine Handlung.
- Aktivierungsenergie ist real.
- Finanzentscheidungen sind emotional belastet.
- Verlustangst ist stärker als Renditehoffnung.
- Das Leben verdrängt langfristige Finanzentscheidungen.

Begründung aus Erfahrung:

- Coaching,
- Kurse,
- Gespräche,
- Beobachtung: Ohne konkrete Handlungsanleitung wird verschoben.

**Sicherheitsgrad:** Sehr hoch.

---

## 3.2 Annahme: Der Nutzer ist nicht dumm, sondern überlastet

Wichtige Tonalitätsregel:

> Nutzer brauchen einen Waschzettel nicht, weil sie dumm sind, sondern weil das Leben stärker ist als gute Vorsätze.

Die Zielgruppe kann beruflich erfolgreich, familiär verantwortungsvoll und intelligent sein. Trotzdem kann Finanzumsetzung liegen bleiben.

Daraus folgt:

- kein herablassender Ton,
- keine „für Dummies“-Sprache,
- keine Beschämung,
- aber klare Führung.

**Sicherheitsgrad:** Amtliches Endergebnis.

---

## 3.3 Annahme: Einfache Anlageprinzipien sind nicht automatisch leicht umzusetzen

Sachlich ist vieles banal:

- Welt-ETF,
- Sicherheitsbaustein,
- Sparplan,
- niedrige Kosten,
- nicht dauernd kontrollieren,
- durchhalten.

Psychologisch ist es nicht banal.

Der Finanzwesir muss also nicht beweisen, dass die Anlageidee revolutionär ist. Er muss zeigen, warum einfache Dinge nicht umgesetzt werden und wie man die Umsetzung wahrscheinlicher macht.

**Sicherheitsgrad:** Sehr hoch.

---

## 3.4 Annahme: Komplexe Theorie muss im Maschinenraum bleiben

Die Site beruht auf komplexer Theorie, aber Nutzer sollen diese Theorie erleben, nicht lernen müssen.

Begründung:

- Fachbegriffe erhöhen Aktivierungsenergie.
- Fachbegriffe erzeugen Distanz.
- Fachbegriffe sind oft eine Ausstiegsrampe.
- Gute Erklärung zeigt Wirkung, statt Begriffe abzufeuern.

**Sicherheitsgrad:** Amtliches Endergebnis.

---

## 3.5 Annahme: Keine Umsetzung ohne konkrete Kaufbarkeit

Der Nutzer braucht am Ende einen Waschzettel.

Nicht nur:

- Kriterien,
- Prinzipien,
- Auswahlregeln.

Sondern:

- ISIN/WKN,
- Broker-Kandidaten,
- Prozentgewichte,
- nächste Handlung.

Begründung:

- Erfahrungswert: Alles darunter wird oft nicht umgesetzt.
- Kaufbarkeit schließt die letzte Lücke zwischen Einsicht und Handlung.

**Sicherheitsgrad:** Sehr hoch aus Erfahrung; rechtliche/operative Umsetzung diskussionswürdig.

---

## 3.6 Annahme: Nicht-Kommerzialität ist Teil der Kategorie

Die Site ist glaubwürdig, weil sie nicht verkaufen will.

Daraus folgt:

- keine Affiliate-Links,
- keine bezahlten Platzierungen,
- keine Brokerdeals,
- keine Produktpartnerschaften,
- keine verdeckten Interessen.

Begründung:

Die Marke Finanzwesir steht für Unabhängigkeit, Nichtkäuflichkeit, Erfahrung und Eigenverantwortung. Kommerzielle Verflechtungen würden die Kathedralenposition schwächen oder zerstören.

**Sicherheitsgrad:** Amtliches Endergebnis.

---

## 3.7 Annahme: Trendfolge ist fachlich relevant, aber kommunikativ gefährlich

Trendfolge kann ein wichtiger Andersläufer sein.

Aber:

- Sie ist exotisch.
- Sie ist erklärungsbedürftig.
- Sie kann nach Produktagenda riechen.
- Sie kann Einsteiger überfordern.
- Sie kann die Kategorie in Richtung ETF+Trendfolge verzerren.
- Sie kann als Democratic-Alpha-Nachhall gelesen werden.

Daher nur:

- optional,
- fortgeschritten,
- nach Portfolio-Chemie,
- mit Ampel,
- nur bei echter Kaufbarkeit.

**Sicherheitsgrad:** Sehr hoch in der Grundrichtung. Konkrete Produktbehandlung offen.

---

# 4. Tradeoffs und warum sie eingegangen wurden

## 4.1 Konkretheit vs. Anlageberatungsnähe

### Problem

Je konkreter der Waschzettel, desto eher wird umgesetzt.  
Je konkreter der Waschzettel, desto näher wirkt es an Empfehlung / Beratung.

### Entscheidung

Konkretheit 10, aber als Musterumsetzung:

- mehrere Kandidaten,
- keine Einzelsieger,
- keine Affiliate-Links,
- klare Kriterien,
- Datenstand,
- Disclaimer,
- keine individuelle Eignungsaussage,
- keine Garantie.

### Warum

Weil alles unter 10 erfahrungsgemäß nicht umgesetzt wird.

### Sicherheitsgrad

Amtliches Endergebnis, aber juristische Prüfung empfohlen.

---

## 4.2 Einfachheit vs. fachliche Vollständigkeit

### Problem

Die Site beruht auf komplexen Konzepten. Wenn sie diese sichtbar macht, steigen viele aus.

### Entscheidung

Show, don’t tell:

- Theorie im Fundament,
- Erfahrung im Nutzerpfad,
- Fachbegriffe nur optional im Expertenbereich.

### Warum

Weil die Site Handlung ermöglichen soll, nicht Fachwissen ausstellen.

### Sicherheitsgrad

Amtliches Endergebnis.

---

## 4.3 ETF-Start vs. Portfolio-Chemie

### Problem

Einsteiger brauchen einfache Startlogik.  
Portfolio-Chemie, Andersläufer und Trendfolge sind fachlich relevant, erhöhen aber Komplexität.

### Entscheidung

- Einsteigerpfad: Weltaktien + Sicherheitsbaustein.
- Fortgeschrittenenpfad: Portfolio-Chemie, Andersläufer, Trendfolge.

### Warum

Weil der Hauptpfad Aktivierungsenergie senken muss.

### Sicherheitsgrad

Amtliches Endergebnis.

---

## 4.4 Nicht-Kommerzialität vs. Produkt-/Brokernennung

### Problem

Konkrete Produkt-/Brokernennung kann kommerziell wirken.

### Entscheidung

Produkt-/Brokerkandidaten nennen, aber:

- ohne Affiliate,
- ohne Ranking-Inszenierung,
- mit Kriterien,
- mit Datenstand,
- mit mehreren Kandidaten,
- mit Warnhinweisen.

### Warum

Ohne Konkretheit keine Umsetzung; ohne Unabhängigkeit keine Glaubwürdigkeit.

### Sicherheitsgrad

Amtliches Endergebnis.

---

## 4.5 Trendfolger-Differenzierung vs. Verständlichkeit

### Problem

Trendfolge könnte ein Differenzierungsvorteil sein.  
Aber Trendfolge prominent zu machen, kann die Site überfordern oder produktnah wirken lassen.

### Entscheidung

Trendfolge-Differenzierung ist nicht prioritär. Verständlichkeit und Aktivierung sind wichtiger.

### Warum

Ziel ist nicht, maximal anders zu wirken, sondern komplexe Dinge so zu verpacken, dass Menschen sie verstehen und handeln.

### Sicherheitsgrad

Amtliches Endergebnis.

---

## 4.6 Zeitlosigkeit vs. Aktualität

### Problem

Psycho-Apps und Texte sollen lange halten. Produktdaten und Charts veralten.

### Entscheidung

Trennung:

- zeitlose Texte und Apps,
- aktualisierbare Daten,
- sichtbarer Datenstand,
- Verfallswarnung bei alten Produkt-/Brokerinformationen.

### Warum

Die Kathedrale soll langlebig sein, aber nicht peinlich veraltete Kurven zeigen.

### Sicherheitsgrad

Amtliches Endergebnis.

---

# 5. Entscheidungen nach Sicherheitsgrad

## 5.1 Amtliches Endergebnis

Diese Punkte sollten nur mit sehr guter Begründung geändert werden:

1. Kategorie: robuste finanzielle Selbstführung.
2. Claim/Nordstern: Finanzen geregelt – Freiräume geschaffen.
3. Site als nicht-kommerzielle Erfahrungsarchitektur.
4. Kein ETF-Ratgeber, kein Finanzportal, kein Produktverkauf.
5. Zinseszinsfähigkeit als innerer Mechanismus.
6. Langfristiges Investieren heißt zuerst: überleben.
7. Vom Produkt zum Portfolio.
8. Portfolio-Chemie als zentrale Einsicht.
9. Kaufbarkeit als Realitätsfilter.
10. Waschzettel am Ende mit ISIN/WKN, Broker-Kandidaten, Prozenten.
11. Keine Affiliate-Links, keine bezahlten Platzierungen.
12. Trendfolge nur als optionaler Andersläufer im Fortgeschrittenenbereich.
13. Show, don’t tell als Bauprinzip.
14. Theorie bleibt im Fundament, Nutzer sieht Erfahrung.
15. Apps sind Prüfungen, nicht Dekoration.

---

## 5.2 Diskussionswürdig

Diese Punkte sind grundsätzlich plausibel, aber noch nicht endgültig:

1. Exakter öffentlicher Kategoriename: „Robuste finanzielle Selbstführung“ vs. zugänglichere Formulierung.
2. Ob „zinseszinsfähig“ öffentlich benutzt oder nur intern geführt wird.
3. Finaler Haupt-POV-Satz.
4. Tonalität der Kathedralen-Unterseite.
5. Konkrete Anzahl der ETF-Kandidaten pro Baustein.
6. Ob Broker direkt genannt oder nur als Tauglichkeitsliste geführt werden.
7. Rechtliche Formulierung des Waschzettels.
8. Welche Apps in den Hauptpfad gehören und welche in Vertiefungen.
9. Ob die Unkorrelations-/Portfolio-Chemie-App im Hauptpfad oder Fortgeschrittenenpfad sitzt.
10. Wie stark die Homepage den Nutzer durch die Reise führt, bevor der Waschzettel sichtbar wird.

---

## 5.3 Spekulation / noch zu prüfen

Diese Punkte brauchen weitere Recherche, Tests oder juristische Prüfung:

1. Konkrete Trendfolge-Produkte für deutsche Privatanleger.
2. Ampelkriterien und Schwellenwerte für Trendfolger.
3. Ob mindestens zwei grüne Trendfolge-Kandidaten für einen Waschzettel ausreichen.
4. Steuerliche und rechtliche Behandlung konkreter Produktkandidaten.
5. Broker-Verfügbarkeit / Sparplanfähigkeit für konkrete ISINs.
6. Produktdaten-Aktualisierungsworkflow.
7. Haftungs-/Regulierungsrisiken des Waschzettels.
8. Nutzerreaktion auf Begriffe wie „Kathedrale“, „Selbstführung“, „Waschzettel“, „Andersläufer“.
9. Conversionwirkung der Reihenfolge: erst Reise, dann Waschzettel.
10. Ob Trendfolge als optionaler Andersläufer trotzdem zu stark nach Produktagenda wirkt.

---

# 6. Was unter allen Umständen geschützt werden muss

## 6.1 Die Kategorie darf nicht produktnah kippen

Nicht:

> ETF + Trendfolger

Sondern:

> robuste finanzielle Selbstführung / zinseszinsfähig investieren

Wenn die Kategorie produktnah wird, verliert sie Breite, Glaubwürdigkeit und Kathedralencharakter.

---

## 6.2 Nicht-Kommerzialität

Die Site darf nicht nach Affiliate, Lead-Funnel, Brokerdeal oder Produktplatzierung riechen.

Ohne Nicht-Kommerzialität bricht die Vertrauensposition zusammen.

---

## 6.3 Show, don’t tell

Die Site darf die Theorie nicht vor sich hertragen.

Wenn sie Ergodizität, Volatility Drag, Fat Tails und Kahneman in den Hauptpfad stellt, verliert sie die Zielgruppe.

---

## 6.4 Aktivierung statt Content-Konsum

Jedes Element muss sich fragen lassen:

> Macht es Handlung wahrscheinlicher?

Wenn nicht, gehört es nicht in den Hauptpfad.

---

## 6.5 Der Waschzettel als Brücke, nicht als Köder

Der Waschzettel muss am Ende der Reise stehen. Er darf nicht zum Clickbait werden.

---

## 6.6 Respekt vor dem Nutzer

Die Site darf nie klingen wie:

> Die Leute sind zu dumm.

Sondern:

> Menschen sind beschäftigt, unsicher, verlustavers und leben nicht für ihr Depot.

---

## 6.7 Trendfolge darf die Kategorie nicht kapern

Trendfolge ist ein möglicher Andersläufer. Mehr nicht.

---

## 6.8 Kaufbarkeit bleibt Pflicht

Theorie ohne Umsetzung zählt nicht.

---

# 7. Mögliche Struktur der Site

## 7.1 Hauptpfad

```text
1. Spiegel: Du weißt längst genug. Warum wartest du noch?
2. Timing-Illusion: Der perfekte Einstieg kommt nicht.
3. Crash-Test: Was tust du, wenn dein Depot fällt?
4. Diversifikations-Detektor: Mehr ETFs sind nicht automatisch mehr Sicherheit.
5. Dunkelster Punkt: Wenn Timing, Crash-Vermeidung und Mehr-Produkte nicht helfen — was bleibt?
6. Einfachheit: Weniger kann die robustere Lösung sein.
7. ETF-Ära-Zweifel: Berechtigte Skepsis prüfen, nicht als Ausrede nutzen.
8. Regulatorik: Real, aber kein Grund fürs Nichtstun.
9. Risiko-Übersetzer: Wie viel Schwankung hältst du wirklich aus?
10. Plan-Generator: einfache Architektur wählen.
11. Waschzettel: ISIN/WKN, Broker-Tauglichkeit, Prozentgewichte.
12. Erste Handlung: klein genug, dass es nicht weh tut; ernst genug, dass es zählt.
```

---

## 7.2 Fortgeschrittenenpfad

```text
1. Portfolio-Chemie
2. Unkorrelation / Andersläufer
3. Zinseszinsfähigkeit vs. Volatilität
4. Kaufbarkeits-Check
5. Trendfolge als möglicher Andersläufer
6. Trendfolge-Ampel
7. Fortgeschrittenen-Waschzettel nur bei belastbaren Kandidaten
```

---

# 8. App-Spezifikationsprinzip

Jede App sollte künftig so beschrieben werden:

```markdown
## App-Name

### Nutzer-Ausrede
Welche Ausrede hält den Nutzer vom Handeln ab?

### Sichtbare Erfahrung
Was sieht, fühlt oder entscheidet der Nutzer?

### Aha-Satz
Welche Einsicht soll entstehen?

### Handlung
Was wird dadurch wahrscheinlicher?

### Unsichtbare Theorie
Welche Theorie steckt darunter?

### Verbotene Begriffe im Hauptpfad
Welche Fachbegriffe dürfen nicht in der Nutzerführung auftauchen?

### Optionale Vertiefung
Wo darf die Theorie für Interessierte erklärt werden?
```

Beispiel:

```markdown
## Volatility-Drag-App

### Nutzer-Ausrede
„Solange die Durchschnittsrendite stimmt, ist der Weg egal.“

### Sichtbare Erfahrung
Zwei Portfolios haben dieselbe Durchschnittsrendite. Das eine schwankt stärker und endet niedriger.

### Aha-Satz
„Der Weg frisst Rendite.“

### Handlung
Der Nutzer versteht, warum ein ruhigeres Portfolio mehr wert sein kann als ein theoretisch renditestärkeres.

### Unsichtbare Theorie
Geometrische Rendite, arithmetische Rendite, Volatility Drag, Pfadabhängigkeit.

### Verbotene Begriffe im Hauptpfad
Volatility Drag, geometrische Rendite, arithmetisches Mittel, Ergodizität.

### Optionale Vertiefung
„Für Nerds: Warum der Durchschnitt lügt.“
```

---

# 9. Mögliche Kernformulierungen

## 9.1 Kategorie

> Der Finanzwesir ist eine nicht-kommerzielle Erfahrungsarchitektur für robuste finanzielle Selbstführung.

## 9.2 Kategorie-Mechanik

> Robuste finanzielle Selbstführung heißt: zinseszinsfähig werden.

## 9.3 Zinseszins

> Der Zinseszins arbeitet nur für Menschen, die lange genug investiert bleiben.

## 9.4 Mensch vor Produkt

> Gute Geldanlage beginnt nicht beim Produkt, sondern beim Menschen, der das Produkt im falschen Moment verkaufen will.

## 9.5 Portfolio

> Ein Produkt kaufst du. Ein Portfolio musst du durchhalten.

## 9.6 Kaufbarkeit

> Nicht kaufbar, nicht geregelt.

## 9.7 Waschzettel

> Der Waschzettel ist nicht die Wahrheit. Er ist die Brücke zwischen Einsicht und Handlung.

## 9.8 Vermächtnis

> Diese Seite soll bleiben, weil Menschen nicht an fehlenden Finanzinformationen scheitern, sondern an dem kleinen, zähen Abstand zwischen Einsicht und Handlung.

## 9.9 Show, don’t tell

> Die Theorie bleibt im Fundament. Der Nutzer sieht nur die Erfahrung.

---

# 10. Was noch offen ist

## 10.1 Juristische Prüfung Waschzettel

Offen:

- Wie konkret dürfen ISIN/WKN, Broker-Kandidaten und Prozentgewichte genannt werden?
- Welche Formulierungen vermeiden persönliche Anlageberatung?
- Welche Disclaimer sind nötig?
- Wo liegt die Grenze zwischen Musterumsetzung und Empfehlung?
- Wie müssen Produktdaten dokumentiert werden?

Priorität: Hoch.

---

## 10.2 Produktdatenmodell

Offen:

- Welche Produktkriterien für Welt-ETFs?
- Welche Produktkriterien für Geldmarkt / Sicherheitsbaustein?
- Welche Datenfelder?
- Welche Aktualisierungsfrequenz?
- Wie wird Veraltung sichtbar?
- Ab welchem Alter erscheint Warnhinweis?

Priorität: Hoch.

---

## 10.3 Broker-Tauglichkeitsliste

Offen:

- Broker direkt nennen oder nur Kriterien?
- Wenn nennen: welche Kriterien?
- Wie oft prüfen?
- Was ist mit Sparplanverfügbarkeit?
- Wie werden Kostenänderungen erfasst?
- Keine Affiliate-Links: Wie werden externe Links gehandhabt?

Priorität: Hoch.

---

## 10.4 Trendfolge-Produkte

Offen:

- Gibt es für deutsche Privatanleger genügend kaufbare, transparente, bezahlbare Trendfolge-/Managed-Futures-Produkte?
- Welche erfüllen Ampelkriterien?
- Wie wird Sparplanfähigkeit bewertet?
- Wann gibt es nur Beobachtungsliste statt Waschzettel?
- Wie verhindern wir Produktagenda-Verdacht?

Priorität: Mittel bis hoch, aber nicht für Einsteiger-Hauptpfad.

---

## 10.5 Begriffstest

Offen:

- Verstehen Nutzer „robuste finanzielle Selbstführung“?
- Ist „zinseszinsfähig“ öffentlich hilfreich oder zu sperrig?
- Trägt „Kathedrale der Erfahrung“ oder wirkt es pathetisch?
- Funktioniert „Waschzettel“ positiv oder zu flapsig?
- Ist „Andersläufer“ verständlich?

Priorität: Mittel.

---

## 10.6 Homepage-Dramaturgie

Offen:

- Wie lang darf der Hauptpfad werden?
- Wann kommt der Waschzettel?
- Welche Apps sind Pflicht?
- Welche Apps sind Vertiefung?
- Wie stark darf die Seite führen?
- Wie viel Text braucht jede Station?

Priorität: Hoch.

---

## 10.7 Expertenkeller

Offen:

- Wo werden Fachbegriffe erklärt?
- Wie tief darf der Expertenbereich gehen?
- Wie vermeidet man, dass er den Hauptpfad belastet?
- Welche Theorie bekommt überhaupt eine Vertiefung?

Priorität: Mittel.

---

## 10.8 Democratic-Alpha-Bezug

Offen:

- Wird Democratic Alpha namentlich erwähnt?
- Wenn ja: wo und wie?
- Wie wird klar, dass es kein kommerzielles Interesse gibt?
- Wie wird Skin in the game kommuniziert, ohne Produktwerbung zu erzeugen?

Priorität: Mittel.

---

# 11. Arbeitsauftrag für das nächste LLM

Bitte arbeite mit diesem Stand weiter und prüfe kritisch:

1. Ist „robuste finanzielle Selbstführung“ als Kategorie stark genug?
2. Ist „Zinseszinsfähigkeit“ der richtige innere Mechanismus?
3. Ist die Site eher echtes Category Design oder nur neu verpackter Finanzratgeber?
4. Ist der Waschzettel die richtige Einlösung oder gefährdet er die Nicht-Beratungsposition?
5. Wie kann der Waschzettel maximal konkret und gleichzeitig nicht-kommerziell bleiben?
6. Wie soll Trendfolge eingebunden werden, ohne die Kategorie zu kapern?
7. Welche Begriffe sind stark, welche sind hohl?
8. Wie lässt sich Show-don’t-tell konsequent in App-Spezifikationen übersetzen?
9. Welche Entscheidungen müssen zwingend geschützt werden?
10. Welche Entscheidungen sollten neu diskutiert werden?

Bitte keine Höflichkeitsbewertung. Ziel ist Verbesserung der Kategorie, nicht Bestätigung.

---

# 12. Zusammenfassung in einem Absatz

Der neue Finanzwesir soll keine bessere ETF-Seite werden, sondern eine nicht-kommerzielle Erfahrungsarchitektur für robuste finanzielle Selbstführung. Die zentrale These lautet: Der Zinseszins arbeitet nur für Menschen, die lange genug investiert bleiben. Deshalb geht es nicht primär um Produkte, sondern um ein kaufbares, verständliches und durchhaltbares Finanzsystem. Die Site soll komplexe Kapitalmarkttheorie, Anlegerpsychologie und Portfolioerfahrung unsichtbar in Apps und Dramaturgie einbauen, aber dem Nutzer nur einfache, erfahrbare Einsichten zeigen. Am Ende steht ein konkreter Waschzettel mit ISIN/WKN, Broker-Tauglichkeit und Prozentgewichten — nicht als persönliche Empfehlung oder Produktverkauf, sondern als Brücke von Einsicht zu Handlung. Trendfolge bleibt ein optionaler Fortgeschrittenen-Andersläufer, nicht die Kategorie. Die Kategorie bricht zusammen, wenn sie produktnah, kommerziell, fachjargonlastig oder unkonkret wird.
