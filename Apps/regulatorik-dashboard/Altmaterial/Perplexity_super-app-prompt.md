---
Angelegt am: 30.04.2026 21:14:42
zuletzt verändert am: 2026-04-30T21:14:56+02:00
---
---
up:: [[Apps MOC]]
## Zielgruppe

**Finanzlaien, die aber intelligent sind und Dinge verstehen wollen.**  
Das bedeutet:
- Kein Fachjargon ohne sofortige Erklärung
- Verständlichkeit hat Vorrang vor Vollständigkeit
- Keine Überladung: progressive disclosure (erst einfach, dann tiefer)
- Emotionale Resonanz vor abstrakten Zahlen
- Deutsche Nutzer, die ETF-Sparpläne haben oder aufbauen

---

## App-Architektur: Drei-Schichten-Prinzip

Die App besteht aus **drei aufeinanderfolgenden Schichten**, die der Nutzer von oben nach unten erlebt:

### Schicht 1 – Der emotionale Einstieg (statisch, ohne Eingabe)
Zeige einen „Kassenbon" (Tufte-Style: maximale Datendichte, null Dekoration, Monospace-Zahlen):

```
Dein Euro, 30 Jahre angelegt:

  1,00 €   eingezahlt (aus versteuertem Einkommen)
× 7,61     Bruttowachstum (7 % p.a., historischer MSCI-World-Schnitt)
─────────────────────────────────────
− 0,42 €   Fondsanbieter (TER 0,20 %)
− 0,00 €   Broker (Transaktionskosten – vernachlässigbar)
− 1,14 €   Finanzamt (aktuelles deutsches Recht)
─────────────────────────────────────
= 6,05 €   gehören dir

Vor 2009 wären es 6,17 € gewesen – Kursgewinne waren steuerfrei.
Was wäre, wenn sich das wieder ändert – in die falsche Richtung?
```

Darunter ein großer CTA-Button: **„Zeig mir meinen persönlichen Effekt →"**

### Schicht 2 – Die interaktive Simulation (Kernbereich)

#### 2a) Parameter-Eingabe
Kompakte Eingabemaske mit maximal 4 sichtbaren Reglern gleichzeitig:
- **Monatliche Sparrate** (Slider + Zahlenfeld, Default: 200 €, Range: 50–1.000 €)
- **Ansparzeit in Jahren** (Slider + Zahlenfeld, Default: 25 Jahre, Range: 5–40)
- **Entsparzeitraum** (Slider + Zahlenfeld, Default: 30 Jahre, Range: 10–40)
- **Renditeerwartung p.a.** (Slider + Zahlenfeld, Default: 7,0 %, Range: 3–10 %)

#### 2b) Vier Steuerszenarien als Radio-Buttons (NICHT als abstrakte Verlust-Regler!)
Ersetze die generischen „Renditeverlust"-Schieberegler durch die konkreten politischen Szenarien aus der Doku:

```
○ 🕰  DE vor 2009        →  XXX €/Mo    „Haltedauer > 1 Jahr: 0 % Steuer auf Kursgewinne"
● 🇩🇪 Deutschland heute  →  XXX €/Mo    „Aktuelles Recht – Abgeltungsteuer 18,46 % effektiv"
○ ⚠️  Vergünst. weg      →  XXX €/Mo    „Ohne Teilfreistellung & Pauschbetrag: 26,375 %"
○ 📊  Einkommensteuer    →  XXX €/Mo    „Dein persönlicher Steuersatz – einstellbar"
```

- S3 (Einkommensteuer) zeigt einen zusätzlichen Slider **nur wenn S3 aktiv ist** (progressive disclosure):  
  Persönlicher ESt-Satz: 14 % – 45 %, Default: 42 %, Soli automatisch addiert (×1,055)

#### 2c) Emotional headline (unter den Radio-Buttons, groß, kein Chart)
Eine einzige, dynamisch generierte Aussage, die sich je nach Szenario ändert. Beispiele:
- S1 aktiv: **„798 € monatlich. Das Depot hält 30 Jahre – genau wie geplant."**
- S3 aktiv (42 %): **„566 € monatlich. Das sind 232 € weniger – jeden Monat, 30 Jahre lang."**
- S0 aktiv: **„872 € monatlich. Das waren einmal 74 € mehr – das war deutsches Recht bis 2008."**

#### 2d) Der Lifecycle-Chart (ein Chart, zwei Phasen)
Ein einziges Chart.js-Koordinatensystem zeigt Anspar- und Entsparphase:
- Alle vier Szenarien als Linien (S0 grün, S1 teal, S2 orange, S3 rot/mauve)
- Das aktive Szenario wird hervorgehoben, die anderen bleiben als dünne Referenzlinien sichtbar
- Gestrichelte vertikale Trennlinie beim Übergang Anspar/Entnahme
- Animierter Szenario-Wechsel: Linien morphen in 400 ms (ease-out), springen nicht
- Rotes X als Marker wenn ein Szenario-Depot erschöpft wird
- Labels direkt an den Linien (keine Legende in Box)

#### 2e) KPI-Block (4 Karten nebeneinander, bei Mobile gestapelt)
- Depot am Ende der Sparphase (mit vs. ohne Steuerwirkung)
- Maximale monatliche Entnahme im aktiven Szenario
- Steuerlast gesamt (absolut in €)
- Politische Bandbreite (Differenz aktuelles Szenario vs. S0, in €/Monat)

#### 2f) Modus-Toggle
Radio: **„Wie viel kann ich monatlich entnehmen?"** (Default, Modus B) vs. **„Wie lange reicht mein Depot?"** (Modus A)

### Schicht 3 – Transparenz & Tiefe (aufklappbar)
Ein `<details>`/`<summary>`-Block „Wie wurde gerechnet?":
- Steuermodell S1 mit Teilfreistellung (§ 20 InvStG), Sparerpauschbetrag, Vorabpauschale, Anteilsmethode in der Entnahme
- Steuermodell S0: 0 % nach 1 Jahr Haltedauer (Recht bis 31.12.2008)  
- Steuermodell S3: persönlicher Satz, kein Pauschbetrag, kein TF, Soli
- Hinweis: Inflation nicht modelliert, Sequence-of-Returns nicht modelliert
- Kein defensiver Disclaimer – stattdessen proaktive Ehrlichkeit: „Alle Modelle sind falsch – manche nützlich. Dieses zeigt den politischen Hebel. Für die volle Wahrheit braucht es Monte-Carlo und Steuerberatung."

---

## Rechenlogik (exakt übernehmen aus Doku!)

### Feste Annahmen
- Bruttorendite: konfigurierbar (Default 7,0 % p.a.)
- TER: 0,20 % p.a. → Nettorendite = Bruttorendite − 0,20 %
- Transaktionskosten: vernachlässigbar (0,10 % einmalig)
- Inflation: nicht modelliert

### Steuerszenarien
| Szenario | Effektiver Steuersatz | Formel |
|---|---|---|
| S0 | 0 % | Keine KapESt auf Kursgewinne |
| S1 | 18,46 % auf 70 % der Gewinne | 26,375 % × 70 % = 18,4625 % |
| S2 | 26,375 % auf 100 % | Kein TF, kein Pauschbetrag |
| S3 | estSatz × 1,055 auf 100 % | Persönlicher Satz inkl. Soli |

### Sparphase: Future Value eines Sparplans
```
FV = monthlyRate × ((1 + r)^n − 1) / r
wobei r = (nettoRendite − steuerEffektiv×steuerBasis) / 12
     n = ansparJahre × 12
```
Für S1: Steuer erst beim Verkauf, nicht jährlich – verwende vereinfachtes Modell mit effektivem Abzug auf die Rendite (akzeptabel für visuelle Demonstration).

### Entsparphase: Maximale Entnahme (Anteilsmethode vereinfacht)
```
maxEntnahme = solveForW: Depot(T) = 0 bei gegebener Laufzeit T
Für jedes Jahr:
  Depot_neu = Depot × (1 + renditeNach) − W
renditeNach = renditeVor × (1 − steuerSatz × gewinnAnteil)
gewinnAnteil = (Depot − Kostenbasis) / Depot
```
Iterative Bisection über 40 Schritte (wie im bestehenden Dashboard).

### Sparerpauschbetrag (nur S1)
1.000 €/Jahr Freibetrag → steuerfreie Phase: ca. 15–17 Jahre bei 200 €/Monat Sparrate.

### Verifikation: Alle Zahlen müssen mit Referenzwerten aus der Doku übereinstimmen
Bei Default-Werten (200 €/Mo, 25 Jahre Anspar, 7 % Rendite, 30 Jahre Entspar):
- S0: Depot 156.979 €, Entnahme 872 €/Mo
- S1: Depot 143.690 €, Entnahme 798 €/Mo
- S2: Depot 119.218 €, Entnahme 662 €/Mo
- S3 (42 %): Depot 101.918 €, Entnahme 566 €/Mo

---

## Technische Anforderungen

- **Einzelne HTML-Datei** (kein Build-Tool, kein Server, kein localStorage)
- **Inline-CSS und Inline-JS** – Ghost.io-kompatibel als HTML-Card
- **Libraries via CDN:**
  ```html
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@3.0.1/dist/chartjs-plugin-annotation.min.js"></script>
  <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
  ```
- **Tailwind CSS via CDN** erlaubt für Layout-Utilities
- **Keine externen Fonts außer Satoshi** (Fallback: system-ui, sans-serif)
- **Dark/Light Mode**: `data-theme="light/dark"` auf `<html>`, Toggle-Button, prefers-color-scheme als Default

---

## Design-System (Nexus-Palette)

```css
/* Light Mode */
--color-bg: #f7f6f2;
--color-surface: #f9f8f5;
--color-surface-2: #fbfbf9;
--color-border: #d4d1ca;
--color-text: #28251d;
--color-text-muted: #6f6d67;
--color-primary: #01696f;       /* Teal – aktive Elemente, Akzent */
--color-success: #437a22;       /* Grün – S0, positive Werte */
--color-warning: #964219;       /* Orange – S2 */
--color-error: #a12c7b;         /* Mauve/Rot – S3, Verluste */
--color-text-inverse: #f9f8f4;
```

**Farb-Zuordnung Szenarien:**
- S0 (Vergangenheit): `--color-success` Grün
- S1 (Heute): `--color-primary` Teal
- S2 (Schlechter): `--color-warning` Orange  
- S3 (Schlimmster Fall): `--color-error` Mauve/Rot

**Rot/Mauve nur für:** Abzüge, Steuerlast, Verluste, S3-Werte  
**Grün/Teal nur für:** Netto-Werte, S0/S1, Gewinne  

---

## UX-Prinzipien (strikt einhalten)

1. **Don't Make Me Think (Krug):**
   - Default-Werte liefern sofort Ergebnis (kein leerer Startzustand)
   - S3-Slider nur sichtbar wenn S3 aktiv (progressive disclosure)
   - Modus B (Entnahme €/Mo) als Default – konkreter als abstrakte Laufzeit

2. **Data-Ink Ratio (Tufte):**
   - Kassenbon: nur Zahlen, keine Icons, keine Farbe außer Rot bei Abzügen
   - Chart: ein Koordinatensystem, vier Linien, Labels direkt an Linien, keine Box-Legende
   - Keine Dekoration die nichts aussagt

3. **Emotional Anchoring (FAANG):**
   - Eine große Headline unter dem Chart – emotional stärkster Satz
   - Animierter Szenario-Wechsel (morph, nicht jump)
   - Live-Update bei S3-Slider ohne Klick (debounce 150 ms)

4. **Mobile-First:**
   - Touch-Targets ≥ 44 × 44 px
   - Slider auf voller Breite
   - Chart-Labels oberhalb des Charts (nicht rechts) bei schmalen Screens
   - KPI-Karten: 4-spaltig desktop → 2-spaltig tablet → 1-spaltig mobile

---

## Was NICHT gebaut werden soll

- Keine abstrakten „Renditeverlust-Schieberegler" als Haupteingabe (das war das schwache Element des alten Dashboards)
- Keine internationale Vergleiche als Hauptnarration (kein UK ISA, kein Roth IRA als Hauptlabel)
- Kein defensiver Disclaimer-Block am Ende
- Keine Tabellen als Hauptausgabe – Zahlen gehören in KPI-Karten und den Chart
- Keine separate zweite HTML-Datei

---

## Dateiname & Output

`etf-steuer-superapp.html`

Liefere nur diese eine Datei. Kein Begleittext, keine README.
