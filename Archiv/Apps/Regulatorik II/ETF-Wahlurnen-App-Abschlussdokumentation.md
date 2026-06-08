---
Angelegt am: 30.04.2026 18:35:30
zuletzt verändert am: 2026-04-30T19:06:16+02:00
---
----------
up:: [[Apps MOC]]
## 1. These und Argumentationsstruktur

### Kernthese
Wer lange genug spart und hinreichend diversifiziert ist, wird immun gegen Marktschwankungen.
Die historische Marktrendite ist gesichert. Es bleiben drei Renditeschädlinge:

| Kostenfaktor | Wer entscheidet? | Kontrollierbar? |
|---|---|---|
| TER (Produktkosten) | Anleger (Fondsauswahl) | Ja – beim Kauf |
| Transaktionskosten | Anleger (Brokerwahl) | Ja – beim Kauf |
| **Steuern** | **Gesetzgeber (Wahl)** | **Nur indirekt – an der Wahlurne** |

### Argumentationslogik
1. Marktschwankungen gleichen sich über Zeit aus → kein Handlungsbedarf
2. TER und Transaktionskosten sind klein und vom Anleger wählbar
3. Steuern sind der größte Einzelfaktor – und werden politisch gesetzt
4. Welches Steuerregime gilt, entscheidet sich bei der nächsten Bundestagswahl

---

## 2. Das Rechenmodell

### Feste Annahmen (nicht interaktiv)

| Parameter | Wert | Begründung |
|---|---|---|
| Bruttorendite | 7,0 % p. a. | Historischer MSCI-World-Schnitt (nominell) |
| TER | 0,20 % p. a. | Günstige ETF-Klasse (z. B. iShares, Vanguard) |
| Transaktionskosten | 0,10 % (einmalig) | Neobroker-Sparplan |
| Nettorendite | 6,80 % p. a. | 7,0 % − 0,2 % |
| Inflation | nicht modelliert | Gedankenexperiment, explizit benannt |

### Steuermodell – korrekte deutsche Umsetzung

**Grundstruktur:**
- Kapitalertragsteuer: 25 % + 5,5 % Solidaritätszuschlag = **26,375 %**
- Teilfreistellung Aktien-ETF (§ 20 InvStG): 30 % steuerfrei → effektiver Satz: **18,46 %**
- Sparerpauschbetrag: **1.000 €/Jahr** (Einzelperson) → bei 200 €/Monat ~17 Jahre vollständig steuerfrei
- Vorabpauschale: ab Jahr ~17–18 marginal fällig; Basiszins 2025: 2,53 % (BMF-Basiszins ≠ BGB §247 Basiszinssatz!)
- Hauptsteuer: einmalig bei Verkauf / anteilig bei Teilentnahmen (Anteilsmethode)

### Vier Steuerszenarien

| #   | Bezeichnung         | Referenz                                         | Effektiver Steuersatz                          | Modell                         |
| --- | ------------------- | ------------------------------------------------ | ---------------------------------------------- | ------------------------------ |
| S0  | Steuerfrei          | UK ISA / Roth IRA / DE vor 2009                  | 0 %                                            | Keine KapESt auf Gewinne       |
| S1  | Deutsche Realität   | Aktuelles deutsches Recht                        | 18,46 % auf 70 % der Gewinne, mit Pauschbetrag | Korrekte Vollmodellierung      |
| S2  | Vergünstigungen weg | Politisch denkbar: TF + Pauschbetrag abgeschafft | 26,375 % ohne Freibeträge                      | Jährliche Vollbesteuerung      |
| S3  | Einkommensteuer     | Dänemark-Modell                                  | 42 % + Soli = 44,3 %                           | Jährlich, ohne Vergünstigungen |

**Wichtig:** S1 ist die günstigste faire Berechnung. Selbst S1 zeigt: Steuern > alle anderen Kosten.

---

## 3. Die Schlüsselzahlen (verifizieret, 200 €/Monat, 25 Jahre)

### Block A: Die Reise eines einzelnen Euros (Lump Sum, 30 Jahre)

```
Eingesetzt 2026:                     1,0000 €
Bruttowachstum (7 % × 30 Jahre):    +6,6123 €
─────────────────────────────────────────────
Davon geht ab:
  Fondsanbieter (TER 0,2 %):        −0,4155 €   →  6,3 % des Zuwachses
  Broker (Transaktionen):            −0,0010 €   →  0,0 % (de facto Null)
  Finanzamt (18,46 % auf 70 %):     −1,1427 €   → 17,3 % des Zuwachses
─────────────────────────────────────────────
Netto in deiner Hand 2056:           6,0468 €
Netto-Gewinn:                       +5,0468 €

→ Von jedem Euro Zuwachs bleiben 76 Cent beim Anleger.
→ Der Staat nimmt 2,8× mehr als alle Produktkosten zusammen.
→ Das gilt bei aktuellem deutschem Recht (Szenario 1).
```

### Block B: Sparplan-Simulation

| Szenario | Depot nach 25 J. | Steuerlast | Max. Entnahme/Mo (30 J. bis Null) |
|---|---|---|---|
| S0: Steuerfrei | 156.979 € | 0 € | **872 €/Monat** |
| S1: Deutsche Realität | 143.690 € | 13.289 € | **798 €/Monat** |
| S2: Vergünstigungen weg | 119.218 € | 37.762 € | **662 €/Monat** |
| S3: Einkommensteuer 42 % | 101.918 € | 55.062 € | **566 €/Monat** |

**Politische Bandbreite:** 306 €/Monat Differenz (S0 vs. S3)  
**Über 30 Entsparjahre:** 110.000 € Lebensstandard – durch politische Entscheidungen.

---

## 4. App-Architektur

Das Tool besteht aus zwei sequenziellen Blöcken in einem einzigen HTML-Snippet.

### Block 1 – Der Euro-Rundkurs (statisch)

**Zweck:** Kontext schaffen bevor die interaktive Simulation beginnt.  
**Format:** Kassenbon-Optik. Keine Interaktion. Tufte: maximale Datendichte, null Dekoration.

```
Visuelle Struktur:

  1,00 €   →  Eingezahlt 2026 (aus versteuertem Einkommen)

  ×  7,61   Bruttowachstum in 30 Jahren (7 % historisch)
  − 0,42 €  Fondsanbieter (TER 0,2 %)
  − 0,00 €  Broker (Transaktionskosten – vernachlässigbar)
  − 1,14 €  Finanzamt (bei aktuellem deutschen Recht)
  ─────────────────────
  = 6,05 €  gehören dir

  „Der Staat nimmt fast 3× mehr als der Fondsanbieter."
  „Das gilt beim günstigsten deutschen Steuerrecht.
   Was wäre wenn sich das ändert?"
              ↓
         [zur Simulation]
```

**Design:** Monospace-Zahlen, minimale Farbe (Rot nur bei Abzügen), ein einziger Farbakzent bei der Netto-Zahl.

---

### Block 2 – Die interaktive Simulation

#### Parameter (Nutzer-Inputs)

| Input | Typ | Default | Bereich |
|---|---|---|---|
| Monatliche Sparrate | Slider | 200 €/Mo | 50 – 1.000 €/Mo |
| Ansparzeit | Slider | 25 Jahre | 5 – 40 Jahre |
| **Modus-Toggle** | Radio | Modus B | A oder B |
| ↳ Modus A: Monatl. Entnahme | Slider | 800 €/Mo | 100 – 2.000 €/Mo |
| ↳ Modus B: Jahre bis Null | Slider | 30 Jahre | 10 – 40 Jahre |

#### Modus A vs. Modus B

```
Modus A – „Wie lange reicht mein Depot?"
  Gegeben: Entnahmebetrag
  Ausgabe: Depot-Lebensdauer in Jahren (unter 4 Szenarien)
  Headline: „Im Szenario S3 ist dein Depot leer, wenn du 80 bist."

Modus B – „Wie viel kann ich monatlich entnehmen?"  ← Default
  Gegeben: Gewünschte Laufzeit (Depot auf Null)
  Ausgabe: Maximale Monatsrate (unter 4 Szenarien)
  Headline: „Im aktuellen deutschen Recht: 798 €/Monat.
             Im Einkommensteuer-Szenario: 566 €/Monat."
```

Modus B ist der Default, weil eine konkrete Monatsrate emotional greifbarer ist als ein abstrakter Endwert.

#### Der Lifecycle-Chart

Ein einziges Koordinatensystem, zwei Phasen:

```
€
       ANSPARPHASE               │  ENTSPARPHASE
       (Jahre 0–25)              │  (Jahre 26–55)
                                  │
150k                    ●─────────┼────────────────────── S0 (∞)
                       ╱          │  ──────────────────── S1
                      ╱           │        ────────────── S2
100k                 ╱            │              ──────── S3 endet ~Jahr 18
                    ╱             │
 50k               ╱             │
                  ╱               │
    0─────────────────────────────┼────────────────────────────
    0      10      20      25     │  30      40      50
    ◄──── du arbeitest ──────────►│◄────── du entsparst ──────►

         gestrichelte Linie = Übergang Anspar/Entspar
         Farbige Flächen zwischen S1 und anderen Szenarien = politische Bandbreite
```

**Animationsverhalten:**
- Szenario-Wechsel: Linien morphen in Echtzeit (400 ms, ease-out)
- Entspar-Ende-Markierung: Rotes X auf der Zeitachse wenn Depot erschöpft
- Kein Depot-Ende bei S0/S1: Linie läuft ruhig weiter

#### Die Szenario-Leiste (Radio-Buttons)

```
  ○ 🇬🇧 Steuerfrei         →  872 €/Mo   „Wie in UK / DE vor 2009"
  ● 🇩🇪 Deutschland heute  →  798 €/Mo   „Aktuelles Recht, korrekt berechnet"
  ○ ⚠️  Vergünst. weg      →  662 €/Mo   „Wenn TF + Pauschbetrag entfallen"
  ○ 🇩🇰 Einkommensteuer    →  566 €/Mo   „Wie in Dänemark – politisch denkbar"
```

Unter dem Chart, nicht darüber. Der Nutzer sieht zuerst die Kurven, dann wählt er.

#### Die Headline (emotionaler Kern)

Unter den Radio-Buttons: eine einzige Satz, groß, kein Chart:

```
●  Deutschland heute:
   „798 € monatlich. Das Depot hält 30 Jahre – genau wie geplant."

○  Einkommensteuer-Szenario:
   „566 € monatlich. Das sind 232 € weniger – jeden Monat, 30 Jahre lang."
```

---

## 5. Steuermodell in der Entsparphase

**Methode:** Anteilsmethode (proportionale Gewinnbesteuerung pro Entnahme)

```
Für jede jährliche Entnahme:
  Gewinnanteil = (Depotwert − Kostenbasis) / Depotwert
  Steuerpflichtiger Betrag = Entnahme × Gewinnanteil × 70 % (Teilfreistellung)
  Steuer = max(0, Steuerpflichtig − Sparerpauschbetrag) × 26,375 %
  Netto-Entnahme = Brutto − Steuer
```

**Simulation:** Jährlich (nicht monatlich). Anzeige als monatliche Beträge (÷12).  
**Sparerpauschbetrag:** Wird jährlich neu angewendet (Reset). Das ist der reguläre Steuervorteil, der im Alter weiter läuft.

---

## 6. Disclaimer-Strategie

Kein defensiver Disclaimer am Ende. Stattdessen proaktive Transparenz als Argument:

```
ℹ️ Wie haben wir gerechnet? (aufklappbar)

Das Modell „Deutschland heute" verwendet:
  ✓ Teilfreistellung 30 % (§ 20 InvStG, seit 2018)
  ✓ Sparerpauschbetrag 1.000 €/Jahr
  ✓ Thesaurierender ETF, Hauptsteuer erst beim Verkauf
  ✓ Bruttorendite 7 % (MSCI World, historischer Nominaldurchschnitt)
  ✓ TER 0,20 % (typisch für günstige Aktien-ETFs)
  ~ Inflation: nicht modelliert (Nominalrendite)
  ~ Vorabpauschale: anteilig berücksichtigt (ab Jahr ~17)
  ~ Sequence-of-Returns-Risiko: nicht modelliert
    (echte Märkte schwanken – das ist eine andere Geschichte)

Das ist die günstigste faire Berechnung, die möglich ist.
Selbst hier: Steuern > alle anderen Kosten zusammen.
```

**Wichtiger Texthinweis im Artikel** (außerhalb des Tools):
> „Alle Modelle sind falsch – manche sind nützlich. Dieses zeigt den politischen Hebel bei
> stabilen Marktbedingungen. Für die volle Wahrheit braucht es Monte-Carlo-Simulation,
> Inflationsmodellierung und individuelle Steuerberatung. Das ist hier nicht der Punkt."

---

## 7. Technische Spezifikation (Ghost.io-kompatibel)

### Constraints

| Anforderung | Lösung |
|---|---|
| Kein Server | Alle Berechnungen in JavaScript (clientseitig) |
| Kein localStorage | State in JS-Variablen (in-memory) |
| Kein Build-Tool | Einzelne HTML-Datei, alles inline |
| Responsive | CSS Flexbox/Grid, clamp() für Fluid-Größen |
| Dark/Light Mode | data-theme-Toggle + prefers-color-scheme |
| Ghost-Einbettung | HTML-Snippet im Ghost-Editor, Styles per `<style>`-Tag inline |

### Libraries (via CDN)

```html
<!-- Chart.js für den Lifecycle-Chart -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
```

Keine weitere externe Abhängigkeit. Keine Fonts (System-Fallback akzeptiert, oder Fontshare CDN).

### Design-System

- **Farben:** Nexus-Palette (Warm Beige + Teal-Akzent)
- **Rot:** nur für Abzüge/Verluste (sparsam eingesetzt)
- **Grün/Teal:** Netto-Werte, Gewinne
- **Schrift:** Satoshi (Fontshare) oder System-Fallback
- **Spacing:** 4px-Raster (--space-1 bis --space-16)
- **Radius:** --radius-md für Inputs, --radius-lg für Karten

### Datei-Output

Einzige Datei: `etf-wahlurnen-rechner.html`  
Einbettung in Ghost: Als HTML-Card im Artikel-Editor eingefügt.

---

## 8. UX-Prinzipien (Zusammenfassung)

**Krug (Don't Make Me Think):**
- Maximal 4 Slider, nie gleichzeitig alle sichtbar
- Default-Werte liefern sofort ein Ergebnis – kein leerer Startzustand
- Ein Toggle statt zwei parallele Interfaces
- Radio-Buttons statt freier Eingabe für Steuerszenarien

**Tufte (Data-Ink Ratio):**
- Block 1: Kassenbon – nur Zahlen, keine Grafik
- Block 2: Ein Chart – zwei Zeitbereiche, vier Linien, keine Dekoration
- Keine Legenden-Box – Labels direkt an den Linien

**FAANG-Designprinzipien:**
- Eine Headline unter dem Chart – der emotional stärkste Satz
- Animierter Szenario-Wechsel (Linien morphen, nicht springen)
- Das Kurven-Ende in der Entsparphase als roter Endpunkt, nicht als Tabellenzahl

---

## 9. Offene Entscheidungen (vor Umsetzung zu klären)

| Frage | Optionen | Empfehlung |
|---|---|---|
| Modus A oder B als Default? | A (Laufzeit) / B (Entnahme) | **B** – konkreter Monatsbetrag ist zugänglicher |
| Szenario-Buttons: Flaggen-Emojis? | Mit / Ohne | **Mit** – politische Referenz wird sofort klar |
| Block 1 statisch oder auch animiert? | Statisch / Reagiert auf Slider | **Statisch** – sonst zu viel Reizüberflutung |
| Kassenbon-Block: aufklappbar oder immer sichtbar? | Immer / Collapsible | **Immer** – er ist das Fundament des Arguments |
| Entnahme-Slider: Schrittgröße? | 50 € / 100 € | **50 €** – feiner ohne overwhelming |

---

## 10. Vollständige Zahlen-Referenz (alle verifizierten Werte)

### Euro-Rundkurs (1 € Lump Sum, 30 Jahre, Szenario 1)
| Posten | Betrag | Anteil am Zuwachs |
|---|---|---|
| Eingesetzt | 1,0000 € | — |
| Brutto-Endwert | 7,6123 € | — |
| − TER (0,2 % p. a.) | −0,4155 € | 6,3 % |
| − Transaktionskosten | −0,0010 € | 0,0 % |
| − Steuern (18,46 % eff.) | −1,1427 € | 17,3 % |
| **Netto** | **6,0468 €** | **76,4 % verbleiben** |

### Sparplan-Referenzrechnung (200 €/Mo, 25 Jahre Anspar, 30 Jahre Entspar)
| | S0 Steuerfrei | S1 DE Realität | S2 Vergünstig. weg | S3 EST 42 % |
|---|---|---|---|---|
| Depot nach Anspar | 156.979 € | 143.690 € | 119.218 € | 101.918 € |
| Steuerlast Anspar | 0 € | 13.289 € | 37.762 € | 55.062 € |
| Entnahme/Mo (bis Null 30 J.) | 872 € | 798 € | 662 € | 566 € |
| Polit. Bandbreite | +306 €/Mo vs. S3 | — | — | Basiswert |

### Steuerfreie Jahre (Sparerpauschbetrag deckt Vorabpauschale)
- Bei Basisertrag 1,77 % (2025): **~17 Jahre**
- Bei Basisertrag 2,24 % (2026): **~15–16 Jahre**
