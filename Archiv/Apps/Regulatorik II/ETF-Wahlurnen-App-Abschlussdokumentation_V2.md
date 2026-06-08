---
Angelegt am: 30.04.2026 18:35:30
zuletzt verändert am: 2026-04-30T19:09:13+02:00
---
----------
up:: [[Apps MOC]]

> [!info]
> Das hier umsetzen

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

## 2. Narrativer Rahmen – Geschichte 1: „Was wir verloren haben"

### Entscheidung
Die App erzählt eine **rein deutsche Geschichte**. Kein internationaler Vergleich als Hauptnarration.
Zielgruppe: Deutsche Kleinsparer und ETF-Anleger, die keine Erklärung für UK ISA oder Roth IRA benötigen.

### Die Erzählung

```
FRÜHER (bis 2008):   Wer Aktien ein Jahr hielt, zahlte null Steuern auf Kursgewinne.
                      Das war deutsches Recht. Das war S0.

HEUTE (seit 2009):   Die Abgeltungsteuer macht alle Gewinne steuerpflichtig – für immer.
                      Das ist S1. Trotz Teilfreistellung: Steuern > alle Kosten.

MORGEN (denkbar):    Abschaffung der Teilfreistellung → S2.
                      Rückkehr zur Einkommensteuer → S3 (persönlicher Grenzsteuersatz).
```

### Dramaturgische Achse

```
     0 %                                    S0  „DE vor 2009"
                                                 ↓ Abgeltungsteuer-Einführung 2009
    18,46 %                                 S1  „Deutsche Realität heute"
                                                 ↓ politisch denkbar: TF + Pauschbetrag weg
    26,375 %                                S2  „Vergünstigungen weg"
                                                 ↓ SPD-Modell / Einkommensteuer
    persönl. Satz (Default 42 %+ Soli)     S3  „Einkommensteuer – du entscheidest"
```

Die Kurve geht nur in eine Richtung: **nach unten, für den Anleger**.
S0 ist keine exotische britische Konstruktion – es ist das, was **Deutschland bis 2008 selbst hatte**.

### S0 im Kontext: Reine Deutschland-Perspektive

| Szenario | Frühere Bezeichnung | Neue Bezeichnung |
|---|---|---|
| S0 | „UK ISA / Roth IRA / DE vor 2009" | **„DE vor 2009 – Haltedauer > 1 Jahr"** |
| S1 | Deutsche Realität | unverändert |
| S2 | Vergünstigungen weg | unverändert |
| S3 | Dänemark-Modell, 42 % fest | **Dänemark-Modell – persönlicher Steuersatz (einstellbar)** |

> **Hinweis für Entwicklung:** S0 kann in einem kleinen Tooltip weiterhin auf ISA/Roth IRA hinweisen
> als sekundäre Information – aber die Hauptbeschriftung ist rein deutsch.

### Historische Meilensteine (Narrations-Grundlage)

| Jahr | Meilenstein | Effekt für Langzeitanleger |
|---|---|---|
| 1949–1974 | Gründungsphase BRD: Kursgewinne nach 1 Jahr **steuerfrei** | Faktisch S0 – bestes Regime |
| 1975 | Einführung **Sparerfreibetrag** (300 DM / 600 DM verheiratet) | Erste Entlastung für laufende Erträge |
| 1993 | **Zinsabschlagsteuer** (30 %) + Sparerfreibetrag auf 6.000 DM erhöht | Quellensteuer auf Zinsen, Kursgewinne bleiben steuerfrei |
| 2000–2008 | Schrittweise **Halbierung des Freibetrags** (3.119 € → 1.585 € → 801 €) | Stiller Abbau der Entlastung |
| **2009** | **Abgeltungsteuer 25 % + Soli = 26,375 %** auf alle Kapitalerträge | **Historische Zäsur: Kursgewinne dauerhaft steuerpflichtig** |
| 2018 | **Investmentsteuerreform**: Teilfreistellung 30 % + Vorabpauschale | Effektiver Satz sinkt auf 18,46 % – aber Steuerstundungsvorteil teils weg |
| 2023 | Sparerpauschbetrag auf **1.000 € / 2.000 €** angehoben | Erste moderate Verbesserung seit Jahren |
| 2025 ff. | SPD fordert KapESt-Erhöhung auf ≥ 30 %, Abschaffung Abgeltungsteuer | S2/S3 als politisch reale Szenarien |

**Der narrative Kern:** 2009 ist der dramatische Wendepunkt.
Vor 2009: Langzeitanleger wurden belohnt. Nach 2009: Haltedauer irrelevant.

---

## 3. Das Rechenmodell

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

### Vier Steuerszenarien (aktualisierte Beschriftung)

| # | Bezeichnung | Referenz | Effektiver Steuersatz | Modell |
|---|---|---|---|---|
| S0 | **Steuerfrei – DE vor 2009** | Deutsches Recht bis 31.12.2008 (Haltedauer > 1 Jahr) | 0 % | Keine KapESt auf Kursgewinne nach Haltefrist |
| S1 | Deutsche Realität | Aktuelles deutsches Recht (seit 2018) | 18,46 % auf 70 % der Gewinne, mit Pauschbetrag | Korrekte Vollmodellierung |
| S2 | Vergünstigungen weg | Politisch denkbar: TF + Pauschbetrag abgeschafft | 26,375 % ohne Freibeträge | Jährliche Vollbesteuerung |
| S3 | **Einkommensteuer – persönlicher Satz** | Dänemark-Modell / SPD-Forderung / persönlicher Grenzsteuersatz | **Frei einstellbar** (Default: 42 % + Soli = 44,31 %) | Jährlich, persönlicher Steuersatz, ohne Vergünstigungen |

**Wichtig:** S1 ist die günstigste faire Berechnung. Selbst S1 zeigt: Steuern > alle anderen Kosten.

**Zu S3:** Der Nutzer gibt seinen persönlichen Grenzsteuersatz ein. Der Solidaritätszuschlag
(5,5 % auf die Einkommensteuer) wird automatisch addiert. Kirchensteuer: nicht modelliert (explizit benannt).

#### S3-Steuersatz-Referenz für Default und Beschriftung

| Eingabe (persönl. ESt-Satz) | Mit Soli | Darstellung im Tool |
|---|---|---|
| 14 % (Eingangssteuersatz) | 14,77 % | „Niedriges Einkommen" |
| 42 % (Spitzensteuersatz, Default) | 44,31 % | „Spitzensteuersatz (Default)" |
| 45 % (Reichensteuersatz) | 47,48 % | „Reichensteuersatz (> 277.826 €/J.)" |

---

## 4. Die Schlüsselzahlen (verifiziert, 200 €/Monat, 25 Jahre)

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
→ Das gilt bei aktuellem deutschem Recht (Szenario S1).
→ Vor 2009 (S0) wären es gewesen: 6,17 € netto – voller Kursgewinn steuerfrei.
```

### Block B: Sparplan-Simulation

| Szenario | Depot nach 25 J. | Steuerlast | Max. Entnahme/Mo (30 J. bis Null) |
|---|---|---|---|
| S0: DE vor 2009 | 156.979 € | 0 € | **872 €/Monat** |
| S1: Deutsche Realität | 143.690 € | 13.289 € | **798 €/Monat** |
| S2: Vergünstigungen weg | 119.218 € | 37.762 € | **662 €/Monat** |
| S3: Einkommensteuer 42 % (Default) | 101.918 € | 55.062 € | **566 €/Monat** |

**Politische Bandbreite:** 306 €/Monat Differenz (S0 vs. S3 bei Default-Satz)
**Über 30 Entsparjahre:** ~110.000 € Lebensstandard – durch politische Entscheidungen.

> **S3 variiert mit dem Nutzer-Input:** Bei 14 % ESt (Eingangssatz) liegt die Entnahme deutlich
> höher als bei 42 %. Der Rechner zeigt live, welchen Unterschied 1 Prozentpunkt macht.

---

## 5. App-Architektur

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

  „Vor 2009 wären es 6,17 € gewesen – Kursgewinne waren steuerfrei."
  „Was wäre, wenn sich das wieder ändert – in die falsche Richtung?"
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
| **S3: Persönlicher ESt-Satz** | Slider + Zahl | 42 % | 14 % – 45 % |

#### S3-Parameter: Persönlicher Einkommensteuersatz

```
Schieberegler mit Zahleneingabe (editierbar):

  Dein persönlicher Steuersatz: [42] %
  + Solidaritätszuschlag (5,5 %):   → Effektiv: 44,31 %

  ──── 14 %  ────────────────  42 %  ────── 45 %
             Eingang        Spitze     Reichen-
                                       steuer

  Kleiner Tooltip bei 42 %: „Spitzensteuersatz – gilt ab ~68.430 €/Jahr (2026)"
  Kleiner Tooltip bei 45 %: „Reichensteuersatz – gilt ab ~277.826 €/Jahr (2026)"
```

**Technische Umsetzung S3:**
- Soli wird automatisch berechnet: `effektiverSatz = estSatz * 1.055`
- Kirchensteuer: nicht modelliert, Hinweis: „+8–9 % ggf. zusätzlich (nicht modelliert)"
- Keine Teilfreistellung, kein Sparerpauschbetrag im S3-Modell (entspricht dem
  politischen Szenario der vollständigen Einkommensteuer auf Kapitalerträge)
- Der Schieberegler ist **nur sichtbar wenn S3 aktiv ist** (nicht beim Laden)

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
             Im Einkommensteuer-Szenario (42 %): 566 €/Monat."
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
- S3-Slider: Chart und Headline aktualisieren sich live ohne Klick (debounce 150 ms)
- Kein Depot-Ende bei S0/S1: Linie läuft ruhig weiter

#### Die Szenario-Leiste (Radio-Buttons)

```
  ○ 🕰️  DE vor 2009           →  872 €/Mo   „So war es – Kursgewinne steuerfrei"
  ● 🇩🇪 Deutschland heute     →  798 €/Mo   „Aktuelles Recht, korrekt berechnet"
  ○ ⚠️  Vergünst. weg         →  662 €/Mo   „Wenn TF + Pauschbetrag entfallen"
  ○ 📊  Einkommensteuer [42%] →  566 €/Mo   „Dein Grenzsteuersatz – einstellbar"
```

Hinweise zur Beschriftung:
- S0: Uhr-Emoji statt Flagge → betont Vergangenheit, nicht Ausland
- S3: Prozentsatz wird live aus dem Slider aktualisiert, z. B. „[38%]" → „[42%]"
- Unter S3 erscheint der Steuersatz-Schieberegler (nur wenn S3 aktiv)

#### Die Headline (emotionaler Kern)

Unter den Radio-Buttons: eine einzige Satz, groß, kein Chart:

```
●  Deutschland heute:
   „798 € monatlich. Das Depot hält 30 Jahre – genau wie geplant."

○  DE vor 2009:
   „872 € monatlich. Das waren einmal 74 € mehr – jeden Monat."

○  Einkommensteuer-Szenario (42 %):
   „566 € monatlich. Das sind 232 € weniger – jeden Monat, 30 Jahre lang."
```

---

## 6. Steuermodell in der Entsparphase

**Methode:** Anteilsmethode (proportionale Gewinnbesteuerung pro Entnahme)

```
Für jede jährliche Entnahme:
  Gewinnanteil = (Depotwert − Kostenbasis) / Depotwert
  Steuerpflichtiger Betrag = Entnahme × Gewinnanteil × 70 % (Teilfreistellung, nur S1)
  Steuer = max(0, Steuerpflichtig − Sparerpauschbetrag) × 26,375 %
  Netto-Entnahme = Brutto − Steuer

Für S3 (Einkommensteuer, persönlicher Satz):
  Steuerpflichtiger Betrag = Entnahme × Gewinnanteil   (keine Teilfreistellung)
  Steuer = Steuerpflichtiger Betrag × (estSatz × 1.055)
  Netto-Entnahme = Brutto − Steuer
```

**Simulation:** Jährlich (nicht monatlich). Anzeige als monatliche Beträge (÷12).
**Sparerpauschbetrag:** Wird jährlich neu angewendet (Reset). Gilt nur für S1.
**S3:** Kein Sparerpauschbetrag, keine Teilfreistellung – volle politische Schlechterfallbetrachtung.

---

## 7. Disclaimer-Strategie

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

Das Modell „DE vor 2009" verwendet:
  ✓ 0 % Steuer auf Kursgewinne nach > 1 Jahr Haltedauer
  ✓ Entspricht dem deutschen Recht bis 31.12.2008
  ~ Dividendenbesteuerung vereinfacht (war damals anders – marginaler Effekt)

Das Modell „Einkommensteuer" (S3) verwendet:
  ✓ Persönlicher Grenzsteuersatz (einstellbar, Default 42 %)
  ✓ + Solidaritätszuschlag 5,5 %
  ✗ Keine Teilfreistellung
  ✗ Kein Sparerpauschbetrag
  ~ Kirchensteuer nicht modelliert

Das ist die ungünstigste plausible Berechnung, die politisch diskutiert wird.
```

**Wichtiger Texthinweis im Artikel** (außerhalb des Tools):
> „Alle Modelle sind falsch – manche sind nützlich. Dieses zeigt den politischen Hebel bei
> stabilen Marktbedingungen. Für die volle Wahrheit braucht es Monte-Carlo-Simulation,
> Inflationsmodellierung und individuelle Steuerberatung. Das ist hier nicht der Punkt."

---

## 8. Technische Spezifikation (Ghost.io-kompatibel)

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

### S3-Schieberegler: technische Details

```javascript
// S3-Slider: nur sichtbar wenn S3 aktiv
function updateS3Visibility(activeScenario) {
  document.getElementById('s3-slider-container').style.display =
    activeScenario === 'S3' ? 'block' : 'none';
}

// Effektiver S3-Steuersatz inkl. Soli
function getS3EffectiveRate(estRate) {
  return estRate * 1.055;  // z. B. 0.42 * 1.055 = 0.4431
}

// Live-Update der Szenario-Beschriftung
function updateS3Label(estRate) {
  const pct = Math.round(estRate * 100);
  document.getElementById('s3-label').textContent =
    `📊 Einkommensteuer [${pct}%]`;
}
```

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

## 9. UX-Prinzipien (Zusammenfassung)

**Krug (Don't Make Me Think):**
- Maximal 4 Slider, nie gleichzeitig alle sichtbar
- S3-Steuersatz-Slider erscheint **nur bei aktivem S3** (progressive disclosure)
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
- S3-Slider: Headline und Chart reagieren live (debounce 150 ms)
- Das Kurven-Ende in der Entsparphase als roter Endpunkt, nicht als Tabellenzahl

**Mobile-First:**
- Slider mit großen Touch-Targets (min. 44 × 44 px)
- S3-Schieberegler auf voller Breite unterhalb der Radio-Buttons
- Chart-Legende oberhalb des Charts (nicht rechts) für schmale Screens

---

## 10. Offene Entscheidungen (vor Umsetzung zu klären)

| Frage | Optionen | Empfehlung |
|---|---|---|
| Modus A oder B als Default? | A (Laufzeit) / B (Entnahme) | **B** – konkreter Monatsbetrag ist zugänglicher |
| S3-Eingabe: Slider oder Zahlenfeld? | Nur Slider / Slider + editierbares Zahlenfeld | **Slider + editierbar** – gibt Power-Usern Kontrolle |
| S3-Slider: Schrittgröße? | 1 % / 0,5 % | **1 %** – ausreichend präzise, weniger Overengineering |
| S0-Bezeichnung: Emoji? | 🕰️ (Vergangenheit) / 🇩🇪 (Deutschland) / Kein Emoji | **🕰️** – betont Zeitlichkeit, kein Auslands-Kontext |
| Kassenbon-Block: aufklappbar oder immer sichtbar? | Immer / Collapsible | **Immer** – er ist das Fundament des Arguments |
| Entnahme-Slider: Schrittgröße? | 50 € / 100 € | **50 €** – feiner ohne overwhelming |
| S3-Kirchensteuer: erwähnen oder weglassen? | Erwähnen als Tooltip / Ignorieren | **Tooltip** – „+8–9 % ggf., hier nicht modelliert" |
| Block 1 statisch oder auch animiert? | Statisch / Reagiert auf Slider | **Statisch** – sonst zu viel Reizüberflutung |

---

## 11. Vollständige Zahlen-Referenz (alle verifizierten Werte)

### Euro-Rundkurs (1 € Lump Sum, 30 Jahre, Szenario S1)
| Posten | Betrag | Anteil am Zuwachs |
|---|---|---|
| Eingesetzt | 1,0000 € | — |
| Brutto-Endwert | 7,6123 € | — |
| − TER (0,2 % p. a.) | −0,4155 € | 6,3 % |
| − Transaktionskosten | −0,0010 € | 0,0 % |
| − Steuern (18,46 % eff.) | −1,1427 € | 17,3 % |
| **Netto** | **6,0468 €** | **76,4 % verbleiben** |

### Sparplan-Referenzrechnung (200 €/Mo, 25 Jahre Anspar, 30 Jahre Entspar)
|                              | S0 DE vor 2009   | S1 DE Realität | S2 Vergünstig. weg | S3 EST 42 % (Default)      |
| ---------------------------- | ---------------- | -------------- | ------------------ | -------------------------- |
| Depot nach Anspar            | 156.979 €        | 143.690 €      | 119.218 €          | 101.918 €                  |
| Steuerlast Anspar            | 0 €              | 13.289 €       | 37.762 €           | 55.062 €                   |
| Entnahme/Mo (bis Null 30 J.) | 872 €            | 798 €          | 662 €              | 566 €                      |
| Polit. Bandbreite            | +306 €/Mo vs. S3 | —              | —                  | Basiswert bei Default-Satz |

> **S3 variiert:** Bei persönlichem ESt-Satz 14 % (+ Soli = 14,77 %): Entnahme deutlich höher als
> 566 €. Bei 45 % (+ Soli = 47,48 %): Entnahme unter 566 €. Exakte Werte werden live berechnet.

### Steuerfreie Jahre (Sparerpauschbetrag deckt Vorabpauschale)
- Bei Basisertrag 1,77 % (2025): **~17 Jahre**
- Bei Basisertrag 2,24 % (2026): **~15–16 Jahre**

### S3-Steuersätze (Referenztabelle für Beschriftungen)

| ESt-Satz | + Soli (5,5 %) | Kontext |
|---|---|---|
| 14 % | 14,77 % | Eingangssteuersatz (ab ~11.785 €/J.) |
| 25 % | 26,38 % | Mittlerer Satz (entspricht alter KapESt) |
| 42 % | 44,31 % | **Spitzensteuersatz – Default** |
| 45 % | 47,48 % | Reichensteuersatz (ab ~277.826 €/J.) |
