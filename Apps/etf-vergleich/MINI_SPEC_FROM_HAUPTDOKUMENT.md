# MINI_SPEC_FROM_HAUPTDOKUMENT — ETF-Vergleich

> Zielpfad im Repo: `Apps/etf-vergleich/MINI_SPEC_FROM_HAUPTDOKUMENT.md`  
> Quelle: Strategische App-Intake-Diskussion 2026-05-19  
> Status: Konzeptionelle Mini-Spec, noch nicht APP_SPEC  
> Letzte Änderung: 2026-05-19  
> Hinweis: Diese Datei beschreibt Ziel, Dramaturgie, Funnel-Einordnung, Datenlogik und Schutzplanken. Keine technische Spezifikation, kein Code.

---

## D4 – ETF-Vergleich / ETF-Feinschliff-Entgifter

**Slug:** `etf-vergleich`  
**Arbeitstitel:** ETF-Vergleich  
**Interner Konzeptname:** ETF-Feinschliff-Entgifter  
**ID:** D4  
**Block:** D — ETF-Auswahl & Technik  
**Funnel-Position:** ETF-Auswahl & Technik / Exit-Gate aus der Produktoptimierung  
**Modulrolle:** Funnel-Master-App / Aktivierungs-App gegen ETF-Perfektionismus  
**App-Familie:** Decision + Explorer/Compare + Calculator-Vergleich  
**Status:** Mini-Spec vorhanden, noch keine APP_SPEC, kein Code  
**Beziehung zu bestehenden Apps:** Abschluss- und Entgiftungsstation nach D1 ETF-Namensdecoder, D2 Replizierer vs. Swapper und D3 TER-Rechner. Führt Richtung H1 ETF-Reifegrad-Test / Start-Konfigurator. E1 ESG-Spiegel bleibt ein Spezialpfad, nicht die Pflichtstation nach D4.

---

## Einordnung im Gesamttrichter

Diese App bekommt die Kennung:

> **D4 – ETF-Vergleich / ETF-Feinschliff-Entgifter**

Begründung:

Block D behandelt laut App-Fabrik-Logik **ETF-Auswahl & Technik**. Dort sitzen bereits:

```text
D1 ETF-Namensdecoder
D2 Replizierer vs. Swapper
D3 TER-Rechner / Kostenkiller
```

D1–D3 erklären einzelne ETF-Details. D4 macht den psychologischen Abschluss:

> „Jetzt verstehe ich die Details. Aber ich darf sie nicht mehr als Startbremse benutzen.“

D4 ist deshalb **keine Erweiterung von D3**, sondern eine eigene Funnel-Master-App. Sie behandelt nicht nur TER, sondern die gesamte Produktdetail-Fixierung:

- TER
- Ausschüttung
- Replikation
- Fondsgröße
- Anbieter-/Produktvertrauen
- Performancevergleich
- Startverzögerung durch Feinsuche

Die App löst eine eigene Blockade:

> „Ich kann noch nicht starten, weil ich erst den optimalen ETF finden muss.“

Damit ist sie ein eigenständiger Funnel-Slot und kein Zusatzmodul.

---

## Choreographie im Funnel

Empfohlene Reihenfolge:

```text
D1 ETF-Namensdecoder
→ Ich verstehe, was auf dem Etikett steht.

D2 Replizierer vs. Swapper
→ Ich verstehe, dass Replikationsmethode kein Panikgrund ist.

D3 TER-Rechner / Kostenkiller
→ Ich verstehe, dass Kosten real sind.

D4 ETF-Vergleich / ETF-Feinschliff-Entgifter
→ Ich erkenne, dass diese Details nicht mein Startgrund sein dürfen.

H1 ETF-Reifegrad-Test / Start-Konfigurator
→ Ich baue meinen konkreten Startplan.
```

E1 ESG-Spiegel bleibt als Spezialpfad erhalten:

```text
D1 → D2 → D3 → D4 → H1
              ↘
               E1 ESG-Spiegel optional / Spezialpfad
```

Wichtig: D4 ist das **Exit-Gate aus Block D**. Nach D4 soll der Nutzer nicht in eine weitere Pflicht-Vergleichsschleife geschickt werden. E1 ist relevant für Nutzer mit ESG-Einwand, aber nicht für alle.

---

## Konsequenz für das Zählmodell

Durch `etf-vergleich` entsteht eine zusätzliche Funnel-Master-App.

Vorheriger Stand laut App-Fabrik:

```text
21 Funnel-Master-Apps
24 reale App-Ordner
3 Zusatz-Module
```

Nach Ergänzung von `etf-vergleich`:

```text
22 Funnel-Master-Apps
25 reale App-Ordner
3 Zusatz-Module
```

`etf-vergleich` ist **kein Zusatz-Modul** wie `rollierende-sparplaene`, `investment-universum` oder `weltkarte-etf-indizes`, sondern eine eigene Master-App mit eigener psychologischer Funktion.

---

## Problem, das gelöst wird

Viele Anfänger bleiben vor dem Start im ETF-Produktvergleich stecken. Sie vergleichen TER, Ausschüttungsart, Replikationsmethode, Fondsgröße und Anbieter, weil diese Kriterien sichtbar und kontrollierbar wirken.

Die eigentliche Blockade lautet:

> „Ich kann noch nicht starten, weil ich erst den optimalen ETF finden muss.“

Die App zeigt: ETF-Details sind nicht bedeutungslos, aber sie sind innerhalb solider MSCI-World-ETFs nicht der Haupthebel. Der Haupthebel ist, dass der Sparplan läuft.

---

## Kernbotschaft

> „ETF-Feinschliff ist real. Aber er ist nicht der Wald.“

Alternative Kurzform:

> „Der perfekte ETF verhindert nicht, dass du arm stirbst. Der laufende Sparplan schon.“

Wichtig: Die App sagt **nicht** „TER ist egal“ und **nicht** „alle ETFs sind gleich“. Sie sagt:

> „Innerhalb solider MSCI-World-ETFs ist die Produktwahl messbar, aber nicht der Grund, den Start zu vertagen.“

---

## Rolle im Block D

D4 ist das Exit-Gate aus Block D.

D1–D3 machen den Nutzer urteilsfähiger. D4 verhindert, dass diese neue Urteilsfähigkeit in Perfektionismus kippt.

Rollenformel:

> **D1–D3 erklären die Bäume. D4 zeigt den Wald.**

D4 beendet die normale ETF-Auswahl-Choreographie und führt in Richtung Handlung.

---

## Interaktion

Die App besteht aus drei Akten.

---

### Akt 1 — Blindverkostung

Der Nutzer sieht vier anonymisierte MSCI-World-ETFs.

Die ETFs werden nicht mit Namen, Anbieter oder ISIN gezeigt, sondern als:

- ETF A
- ETF B
- ETF C
- ETF D

Sichtbare Merkmale je Karte:

1. Fondsgröße
2. TER p.a.
3. Ausschüttung: thesaurierend / ausschüttend
4. Replikation: optimiertes Sampling / vollständige Replikation / Swap-basiert

Der Nutzer erhält die Frage:

> „Welchen ETF würden Sie wählen — bevor Sie die Rendite kennen?“

Primäre Handlung:

> „Diesen ETF würde ich nehmen.“

Keine Performancewerte vor der Wahl.  
Keine echten Namen vor der Auflösung.  
Keine ISIN im Hauptflow.

---

### Akt 2 — Auflösung

Nach der Wahl werden die historischen Performancewerte aufgedeckt.

Die Hauptperiode ist immer der längste gemeinsame Zeitraum:

> **25.09.2009 bis Datenstand**

Die ETFs wurden so gewählt, dass sie denselben Index abbilden, sichtbar unterschiedliche Merkmale haben und über diesen gemeinsamen Zeitraum vergleichbar sind.

Die App zeigt zuerst die annualisierte Rendite, nicht die kumulierte Rendite.

Beispielhafte Ergebnislogik:

```text
Platz 1: ETF C — x,xx % p.a.
Platz 2: ETF A — x,xx % p.a.
Platz 3: ETF D — x,xx % p.a.
Platz 4: ETF B — x,xx % p.a.
```

Direkt darunter:

> „Kumuliert klingt der Abstand groß. Annualisiert ist er deutlich kleiner.“

Wenn die konkreten Werte lauten:

- bester ETF: +618,65 %
- schwächster ETF: +591,67 %

dann wird daraus:

> „Zwischen Platz 1 und Platz 4 lagen kumuliert 26,98 Prozentpunkte. Das klingt groß. Annualisiert waren es nur ungefähr ein Viertel Prozentpunkt pro Jahr.“

Die kumulierten Werte dürfen gezeigt werden, aber nicht als dominante Hauptzahl.

---

### Akt 3 — Wald-vs.-Bäume-Zoom

Nach der Auflösung wird der Vergleich persönlich.

Der Nutzer sieht:

> „Und was heißt das mit Ihrer Sparrate?“

Nutzereingabe:

- Monatsrate als Schieberegler
- Default: 150 €
- Bereich: 25 € bis 1.000 €
- sinnvolle Snap-Punkte: 25 / 50 / 100 / 150 / 250 / 500 / 1.000 €

Die App berechnet drei Vergleichsbalken:

1. Bester statt schwächster ETF
2. 25 € mehr Monatsrate
3. 6 Monate früher starten bei gleicher Monatsrate

Die +25 € bleiben fix. Sie sind kein variabler Parameter.

Beispielhafte Darstellung:

```text
Bei Ihrer Monatsrate von 150 €:

Bester statt schwächster ETF:      ca. x.xxx €
25 € mehr Monatsrate:              ca. x.xxx €
6 Monate früher starten:           ca. x.xxx €
```

Die Botschaft:

> „Der ETF-Unterschied ist real. Aber er ist nicht der Haupthebel.“

---

## Zentrale Visualisierung

Die App braucht keine große Chart-Orgie.

Die Hauptvisualisierung ist ein dreistufiger Reveal:

1. Vier ETF-Karten als Blindverkostung
2. Ranking nach annualisierter Rendite
3. Drei Vergleichsbalken für Wald-vs.-Bäume

Visualisierungskern:

```text
Baum-Ebene:
TER, Ausschüttung, Replikation, Fondsgröße

Wald-Ebene:
Starten, Sparrate, sechs Monate früher loslegen
```

Die 5- und 10-Jahres-Zeiträume erscheinen nur als Kontrollblick, nicht als gleichwertiger Zeitraum-Schalter.

Empfohlene Darstellung:

```text
Kontrollblick:
5 Jahre und 10 Jahre ändern die Grundbotschaft nicht.
```

Optionaler Aufklapper:

```text
Zeiträume ansehen
```

Darin:

- 5 Jahre
- 10 Jahre
- Max seit 25.09.2009

Keine freie Zeitraumwahl.

---

## Datenbasis

Die App nutzt händisch kuratierte Daten.

Datenquelle für Performancewerte:

- justETF oder vergleichbares ETF-Portal
- Werte werden händisch übernommen
- kein automatisiertes Scraping
- kein Backend

Vergleichs-ETFs:

Vier MSCI-World-ETFs mit gemeinsamer Startlinie 25.09.2009, möglichst unterschiedlicher sichtbarer Produktstruktur.

Aktueller Kandidatenkreis:

1. iShares Core MSCI World UCITS ETF USD (Acc)  
   ISIN: IE00B4L5Y983  
   TER: 0,20 %  
   Ausschüttung: thesaurierend  
   Replikation: optimiertes Sampling

2. iShares MSCI World UCITS ETF (Dist)  
   ISIN: IE00B0M62Q58  
   TER: 0,50 %  
   Ausschüttung: ausschüttend  
   Replikation: optimiertes Sampling

3. Xtrackers MSCI World Swap UCITS ETF 1C  
   ISIN: LU0274208692  
   TER: 0,45 %  
   Ausschüttung: thesaurierend  
   Replikation: Swap-basiert, unfunded

4. UBS MSCI World UCITS ETF USD dis  
   ISIN: LU0340285161  
   TER: 0,30 %  
   Ausschüttung: ausschüttend  
   Replikation: vollständige Replikation

Der Amundi MSCI World Swap II UCITS ETF Dist wurde als fünfter Kandidat geprüft, aber für Version 1 gestrichen, um die Dramaturgie bei vier klaren Rollen zu halten.

---

## Benötigte statische Datenfelder

Je ETF:

```text
id
displayLabel: ETF A / ETF B / ETF C / ETF D
fondsname
isin
fondsgröße_mio_eur
ter_pa
ausschuettung
replikation
performance_5j_kumuliert
performance_10j_kumuliert
performance_max_kumuliert
startdatum_max
enddatum
datenstand
quelle
```

Im Hauptflow sichtbar:

- ETF A-D
- Fondsgröße
- TER
- Ausschüttung
- Replikation
- Performance erst nach Auflösung

Nicht im Hauptflow sichtbar:

- ISIN
- Fondsname vor Auflösung
- Anbieter vor Auflösung

---

## Berechnungslogik

Aus kumulierter Rendite und Zeitraum wird die annualisierte Rendite berechnet.

Formel:

```text
CAGR = (1 + Gesamtrendite) ^ (1 / Jahre) - 1
```

Beispiel:

```text
Gesamtrendite +618,65 % → Faktor 7,1865
Gesamtrendite +591,67 % → Faktor 6,9167
```

Der Abstand wird nicht nur kumuliert, sondern annualisiert dargestellt.

Sparplanwerte sind Modellrechnungen auf Basis der annualisierten Renditen.

Wichtig:

> Es handelt sich nicht um einen historischen Sparplan-Backtest mit Monatskursen.

Für den Wald-Zoom reicht diese Modellrechnung, weil es nicht um exakte historische Sparplanpfade geht, sondern um Größenordnungen.

---

## Ergebnisformulierung

Nach der ETF-Wahl:

> „Ihre Wahl war nicht absurd. Alle vier ETFs sind solide Wege in denselben Wald.“

Nach der Performance-Auflösung:

> „Der beste ETF war besser. Aber nicht groß genug, um das Starten zu vertagen.“

Nach dem Wald-Zoom:

> „ETF-Details sind Bäume. Der Wald heißt: anfangen, regelmäßig sparen, durchhalten.“

Schlusssatz:

> „Optimieren dürfen Sie später. Starten müssen Sie vorher.“

---

## Transparenzsatz

Die App braucht einen sichtbaren Methodik-Hinweis:

> „Die ETF-Werte stammen aus öffentlich zugänglichen ETF-Portalen und beziehen sich auf den gemeinsamen Zeitraum ab 25.09.2009. Die Sparplanwerte sind Modellrechnungen auf Basis der aus der Gesamtrendite abgeleiteten annualisierten Renditen. Sie sind kein historischer Sparplan-Backtest. Steuern, Kaufkosten und individuelle Ausschüttungsbehandlung bleiben unberücksichtigt. Ziel ist die Größenordnung, nicht die Produktempfehlung.“

---

## Was die App nicht tut

- keine Produktempfehlung
- kein ETF-Ranking für reale Kaufentscheidungen
- keine Broker- oder Portal-Funktion
- keine freie Zeitraumwahl
- keine monatlichen Kursdaten
- kein historischer Sparplan-Backtest
- keine Steuerberechnung
- keine Ausschüttungswiederanlage-Erklärung im Hauptflow
- keine Crash-Simulation
- keine ISIN im Hauptscreen
- keine ETF-Namen vor der Auflösung
- kein Renditeversprechen
- keine Aussage „TER ist egal“
- keine Aussage „alle ETFs sind gleich“
- keine Empfehlung „ETF X kaufen“
- keine Pflichtweiterleitung zu E1 ESG nach D4

Diese Negativliste ist bindend für Version 1.

---

## Abgrenzung

| App | Abgrenzung |
|---|---|
| D1 ETF-Namensdecoder | D1 erklärt ETF-Namen. D4 entgiftet die Produktdetail-Fixierung nach dem Verstehen. |
| D2 Replizierer vs. Swapper | D2 erklärt Replikationsmechanik. D4 zeigt, dass Replikation allein nicht der Startgrund sein darf. |
| D3 TER-Rechner / Kostenkiller | D3 zeigt Kostenwirkung. D4 kalibriert TER gegen Sparrate und Startzeitpunkt. |
| E1 ESG-Spiegel | E1 behandelt ESG als Spezial-Einwand. E1 ist kein Pflichtschritt nach D4, sonst würde D4 als Exit-Gate geschwächt. |
| F2 Thesaurierer vs. Ausschütter | F2 behandelt Ausschüttungslogik. D4 behandelt Ausschüttung nur als sichtbaren Auswahlreflex. |
| B1 Prokrastinations-Preis | B1 behandelt Warten allgemein. D4 behandelt Warten wegen ETF-Feinsuche. |
| A2 Crash-Reaktions-Test | A2 behandelt Verhalten im Crash. Crash wird in D4 bewusst nicht eingebaut. |

---

## CTA

Primärer CTA:

> „Startplan bauen“

Alternative im Funnel:

> „Welcher ETF reicht für Ihren Start?“

Übergangssatz:

> „Sie müssen nicht den perfekten Baum finden. Sie müssen in den Wald.“

Zielrichtung:

```text
D4 → H1 ETF-Reifegrad-Test / Start-Konfigurator
```

Optionaler Spezialpfad:

```text
D4 → E1 ESG-Spiegel
```

nur wenn ESG als Einwand aktiv ist.

---

## Implementierungshinweise

- Reine Client-side-App möglich
- Kein Backend
- Keine Server-Anfragen
- Statische JSON/CSV reicht
- Datenpflege händisch, idealerweise jährlich
- Datenstand sichtbar ausweisen
- Fokus auf Reveal-Dramaturgie, nicht auf Chart-Komplexität
- Version 1 bleibt radikal schlank
- 5/10/Max nicht als Analysewerkzeug ausbauen
- Crash nicht integrieren
