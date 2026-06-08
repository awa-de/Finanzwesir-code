---
Angelegt am: 30.04.2026 18:34:32
zuletzt verändert am: 2026-04-30T18:34:48+02:00
---
---
up:: [[Apps MOC]]

## 1. Das Modell (Fundament aller drei Varianten)

### Kernbotschaft

Wer lange genug spart und breit diversifiziert, bekommt die historische Marktrendite. Punkt. Was die Rendite ruiniert, sind drei Kostenblöcke – und zwei davon können einen nicht auf die Palme bringen. Nur der dritte ist politisch. Und den wählen wir.

### Rechenmodell (vereinfacht, aber korrekt im Kern)

**Eingaben (vom Nutzer):**

| Parameter | Default | Bereich | Warum |
|---|---|---|---|
| Monatliche Sparrate | 200 € | 50–2.000 € | Alltagsrelevanz, kein Kleingeld |
| Anlagehorizont | 25 Jahre | 5–40 Jahre | Wo die Magie passiert |

**Feste Annahmen (vom System vorgegeben, sichtbar erklärt):**

| Annahme | Wert | Begründung |
|---|---|---|
| Bruttorendite | 7,0 % p. a. | Historischer Durchschnitt MSCI World (nominell, vor Inflation) |
| Inflation | nicht modelliert | Gedankenexperiment – wird im Text erklärt |

**Die drei Kostenblöcke:**

**Block 1 – Produktkosten (TER)**  
Modell: Jährlicher Abzug von der Bruttorendite vor Zinseszins  
Default: 0,20 % (günstiger ETF)  
Bandbreite: 0,07 % (Vanguard/iShares-Flaggschiff) bis 1,50 % (aktiv gemanagter Fonds)  
→ *Nutzer kann zwischen zwei Presets wählen: „Günstiger ETF" vs. „Aktiver Fonds"*

**Block 2 – Transaktionskosten**  
Modell: Einmaliger prozentualer Abzug auf jede Einzahlung  
Default: 0,10 % (Neobroker-Sparplan)  
Bandbreite: 0,10 % bis 0,50 % (klassische Bank)  
→ *Fest voreingestellt, nur in der Tooltip-Erklärung sichtbar – kein Slider*  
→ Begründung: Dieser Block ist klein und ändert das Bild kaum. Kognitive Entlastung.

**Block 3 – Steuern (der politische Hebel)**  
Modell: Vereinfacht – Kapitalertragsteuer als jährlicher Abzug auf den Netto-Ertrag nach Produktkosten  
Formel: `r_netto = (r_brutto − TER) × (1 − Steuersatz)`  
Konservative Annahme: jährliche Versteuerung (Realität: z.T. erst bei Verkauf → Modell überschätzt Steuerlast leicht, liegt auf der sicheren Seite)  
Default: 26,375 % (Deutschland: 25 % KapESt + 5,5 % Soli)  
Bandbreite: 0 % bis 40 %  
→ *Dieser Block hat einen großen, zentralen Slider – das ist die politische Bühne*

**Endvermögen-Formel (Sparplan, monatliche Einzahlung):**

```
r_monatlich = r_netto / 12

Endvermögen = Sparrate × [((1 + r_monatlich)^(Laufzeit × 12) − 1) / r_monatlich]
```

**Beispielrechnung** (200 €/Monat, 25 Jahre, 7 % Brutto):

| Szenario | Endvermögen | Verlust ggü. Brutto |
|---|---|---|
| Brutto (kein Abzug) | ~173.000 € | – |
| Nach TER 0,20 % | ~164.000 € | ~9.000 € |
| + Transaktionskosten | ~162.000 € | ~11.000 € |
| + Steuern 26,375 % | ~119.000 € | ~54.000 € |

**Das ist die Story:** Kosten fressen ~11.000 €. Steuern fressen ~43.000 €. Das Verhältnis liegt bei ungefähr 1:4. Steuern dominieren – und Steuern setzt die Politik.

### Annahmen, die im Text/Tooltip erklärt werden müssen

- Inflation wird nicht berücksichtigt (sonst wird die Botschaft verwässert)
- Sparerpauschbetrag (1.000 €/Jahr) wird vereinfacht nicht abgebildet – führt zu leichter Überschätzung der Steuerlast, liegt also auf der sicheren Seite der Argumentation
- Thesaurierung vs. Ausschüttung: nicht modelliert – zu komplex für die Zielgruppe
- Modell zeigt nominale, nicht reale Rendite

---

## 2. Drei UX-Konzeptvarianten

---

### Variante A: „Der Renditedieb" – Emotionaler Wasserfall

**Paradigma:** Progressive Enthüllung / Dramatischer Abbau  
**Leitprinzip Krug:** „Eine Sache nach der anderen." Jeder Dieb bekommt seinen Auftritt.  
**Leitprinzip Tufte:** Daten sind die Figuren – keine dekorative Grafik.  
**Emotionale Reise:** Neugier → Schock → Einsicht → Handlungsimpuls

#### UI-Struktur

```
┌─────────────────────────────────────────────────┐
│  Ich spare ___€ / Monat  über ___ Jahre          │
│  [Slider: 50–500 €]     [Slider: 10–40 Jahre]   │
└─────────────────────────────────────────────────┘
              ↓ (automatisch berechnet)
┌─────────────────────────────────────────────────┐
│  Ohne jegliche Kosten wäre das:                 │
│                                                  │
│  ████████████████████████  173.000 €            │
│                                                  │
│  Der Markt hat dir das gegeben.                 │
│  Jetzt kommen die Diebe.                        │
│                          [Zeig mir die Diebe →] │
└─────────────────────────────────────────────────┘
```

**Nach Klick – Animierter Abbau (3 Beats):**

```
Beat 1: Produktkosten
████████████████████░░  164.000 €  (−9.000 €)
→ "Dein Fondsanbieter: 0,20 % / Jahr"
→ Klein. Wählbar. Kontrollierbar.

Beat 2: Transaktionskosten
███████████████████░░░  162.000 €  (−2.000 €)
→ "Dein Broker: Minimale Ordergebühren"
→ Kaum der Rede wert bei einem Sparplan.

Beat 3: Steuern  ← DER MOMENT
███████████████░░░░░░░  119.000 €  (−43.000 €)
→ "Der Staat: 26,375 % Kapitalertragsteuer"
→ Viermal so viel wie alle anderen Kosten zusammen.
→ Den hat kein Fondsmanager gesetzt.
→ Den hat eine Regierung gesetzt. Die du gewählt hast.
```

**Abschluss-Panel (statisch):**

```
┌─────────────────────────────────────────────────┐
│  Was wäre wenn der Steuersatz anders wäre?      │
│                                                  │
│  0 %    ●────────────────────  40 %             │
│         ↑ aktuell: 26,375 %                     │
│                                                  │
│  Bei 15 %:  145.000 €   [+26.000 € mehr]        │
│  Bei 35 %:  104.000 €   [−15.000 € weniger]     │
│                                                  │
│  "Das entscheidet sich an der Wahlurne."        │
└─────────────────────────────────────────────────┘
```

#### Design-Spezifikation

- **Visualisierung:** Horizontaler Balken, der sich von rechts nach links animiert abbaut (Leerraum = Verlust)
- **Farben:** Grün (Guthaben) → Rot/Orange wächst bei Steuern, nicht bei Kosten
- **Typografie:** Große Zahl dominant, Differenz als dezenter Untertitel
- **Animation:** Jeder Dieb „zieht" von rechts, 400ms, leichtes Overshoot (federt zurück)
- **Mobile:** Balken vertikal gestapelt, Tap statt Hover

#### Stärken / Schwächen

| + | − |
|---|---|
| Höchste emotionale Wirkung durch sequentiellen Aufbau | Mehr Klicks/Interaktion nötig – könnten Drop-offs erzeugen |
| Klare Dramatik: „Einer ist anders" | Wasserfall-Chart kann als „Schuldzuweisung" wirken |
| Sehr intuitiv, keine Erklärung nötig | |

---

### Variante B: „Die Zeitmaschine" – Zwei Zukünfte

**Paradigma:** Was-wäre-wenn / Bifurkation  
**Leitprinzip Krug:** Sofort sichtbar, was sich ändert. Der Slider ist die Geschichte.  
**Leitprinzip Tufte:** Small multiples ohne Unordnung – zwei Kurven, maximale Klarheit.  
**Emotionale Reise:** Faszination → Selbstwirksamkeit → politische Relevanz

#### UI-Struktur

```
┌────────────────────────────────────────────────────────────┐
│  200 €/Monat · 25 Jahre · 7 % Marktrendite (historisch)   │
│  [diese Werte bearbeiten ▾]                                │
└────────────────────────────────────────────────────────────┘

         Wie hoch besteuert die nächste Regierung?
         
   0 %   ●━━━━━━━━━━━━━━━━━━●━━━━━━━━━━━━━━━━   40 %
                           ↑
                    aktuell: 26,375 %
         
┌────────────────────────────────────────────────────────────┐
│                                                            │
│        Endvermögen          Endvermögen                   │
│        nach Kosten          nach Kosten + Steuern         │
│                                                            │
│        162.000 €            119.000 €                     │
│                                                            │
│   ─────────────────────────────────────────── Zeit →      │
│   ╱╱                          ╱╱╱                         │
│  ╱╱     (gestrichelt)        ╱╱╱  (ausgefüllt)           │
│ ╱╱                          ╱╱╱                           │
│╱╱                          ╱╱╱                            │
│                                                            │
│  ░░░░░░░░░░░░░░░░░░░░░░ = Steuerverlust: 43.000 €        │
│  (schraffierte Fläche zwischen den Kurven)                │
└────────────────────────────────────────────────────────────┘

"Dieser Abstand ist nicht Börse. Dieser Abstand ist Politik."
```

**Produktkosten-Preset (kompakt, keine Ablenkung):**

```
Produktkosten:  ○ Günstiger ETF (0,20 %)   ● Aktiver Fonds (1,50 %)
```

→ Nur zwei Presets, kein offener Slider. Krug: Don't make me think.

#### Animation & Interaktion

- **Slider-Bewegung:** Kurve animiert sich in Echtzeit (ruckelfrei mit requestAnimationFrame)
- **Die Lücke leuchtet:** Schraffierte Fläche zwischen den Kurven pulsiert kurz beim Laden → Aufmerksamkeit auf die Differenz
- **Extrem-Werte:** Bei 0 % erscheint Text: „Wäre politisch möglich – gab es in einzelnen Ländern." Bei 40 %: „Höher als in den meisten OECD-Ländern."
- **Hover/Tap auf die Kurven:** Tooltip zeigt Wert zum jeweiligen Zeitpunkt

#### Design-Spezifikation

- **Chart-Typ:** Flächenliniendiagramm (Area Chart), zwei überlagerte Flächen
- **Farben:** Obere Fläche (nach Kosten) in Primärfarbe (gedämpftes Grün), Differenzfläche in warmer Erdtönung (Orange/Sienna) → nicht alarmistisch, aber klar sichtbar
- **Der Slider ist das zentrale UI-Element** – muss auf Mobile mindestens 44px hoch sein, optisch dominant
- **Zahlen:** Nur zwei große Zahlen unter dem Chart – links/rechts, niemals im Chart

#### Stärken / Schwächen

| + | − |
|---|---|
| Der politische Hebel ist direkt spürbar | Zwei Kurven erfordern eine Legende |
| Höchste Selbstwirksamkeit: Nutzer spielt selbst | Chart kann technisch wirken |
| Zeit ist sichtbar – Zinseszins wird erfahrbar | Erfordert etwas mehr kognitive Verarbeitung |

---

### Variante C: „Die Schatzkarte" – Narrative Reise

**Paradigma:** Guided Tour / Sequenzielles Storytelling  
**Leitprinzip Krug:** Null Entscheidungsbelastung – der Nutzer folgt nur.  
**Leitprinzip Tufte:** Die Grafik dient der Geschichte – nicht umgekehrt.  
**Emotionale Reise:** Vertrauen aufbauen → Überraschung → Empörung → Klarheit

*Dieses Format eignet sich am besten als Ergänzung zum Fließtext – es ist weniger Rechner als visuelles Argument.*

#### UI-Struktur

Kein Eingabefeld am Anfang. Die App beginnt mit einer Aussage.

```
┌───────────────────────────────────────────────────┐
│                                                   │
│   Stell dir vor, du sparst 200 € jeden Monat.    │
│   25 Jahre lang. Immer. Nie aufgehört.            │
│                                                   │
│   Was ergibt das?                                 │
│                                                   │
│            [Das will ich wissen →]                │
│                                                   │
└───────────────────────────────────────────────────┘
```

**Schritt 1 – Der Markt:**

```
┌───────────────────────────────────────────────────┐
│                                                   │
│   173.000 €                                       │
│                                                   │
│   Das hätte dir ein breit gestreuter              │
│   Weltaktien-ETF historisch eingebracht.          │
│   7 % Rendite pro Jahr, im Schnitt.               │
│                                                   │
│   Diese 7 % kann dir kein Fondsmanager            │
│   nehmen. Die kommen vom Markt.                   │
│                                                   │
│            [Und wer nimmt etwas?  →]              │
└───────────────────────────────────────────────────┘
```

**Schritt 2 – Der Fondsanbieter:**

```
┌───────────────────────────────────────────────────┐
│   173.000 €                                       │
│      └──►  164.000 €   (−9.000 €)                │
│                                                   │
│   Dein Fondsanbieter nimmt sich                   │
│   0,20 % pro Jahr. Für Verwaltung,                │
│   Infrastruktur, seinen Gewinn.                   │
│                                                   │
│   Klingt wenig? Ist wenig.                        │
│   Billiger als je zuvor in der Geschichte.        │
│                                                   │
│            [Wer kommt noch?  →]                   │
└───────────────────────────────────────────────────┘
```

**Schritt 3 – Der Broker:**

```
┌───────────────────────────────────────────────────┐
│   164.000 €                                       │
│      └──►  162.000 €   (−2.000 €)                │
│                                                   │
│   Dein Broker nimmt sich ein bisschen             │
│   für jeden Kauf. Kaum spürbar.                   │
│                                                   │
│   Diesen Teil kannst du fast ignorieren.          │
│                                                   │
│            [Und jetzt?  →]                        │
└───────────────────────────────────────────────────┘
```

**Schritt 4 – Der Staat (der große Moment):**

```
┌───────────────────────────────────────────────────┐
│   162.000 €                                       │
│      └──►  119.000 €                             │
│                                                   │
│           −43.000 €                              │
│                                                   │
│   Der Staat nimmt 26,375 %.                       │
│   Auf jeden Euro Gewinn, den du gemacht hast.     │
│                                                   │
│   Das ist mehr als alle anderen Kosten            │
│   zusammen. Viermal mehr.                         │
│                                                   │
│            [Wer hat das entschieden?  →]          │
└───────────────────────────────────────────────────┘
```

**Schritt 5 – Die Pointe:**

```
┌───────────────────────────────────────────────────┐
│                                                   │
│   Den Fondsanbieter hast du gewählt.              │
│   Den Broker auch.                                │
│                                                   │
│   Den Steuersatz –                               │
│                                                   │
│         ╔══════════════════════════╗              │
│         ║    den wählen wir.       ║              │
│         ╚══════════════════════════╝              │
│                                                   │
│   Bei 15 % Steuer:    145.000 € (+26.000 €)      │
│   Bei 35 % Steuer:    104.000 € (−15.000 €)      │
│                                                   │
│   [Steuersatz anpassen  ●──────────────]         │
│                                                   │
└───────────────────────────────────────────────────┘
```

#### Design-Spezifikation

- **Navigation:** Kein Scroll. Fullscreen-Cards (wie ein Mini-Onboarding). Swipe oder großer CTA-Button.
- **Transition:** Cards schieben sich von rechts herein, vorherige verblasst nach links (30 ° tilt, kurz)
- **Zahlen:** Immer groß, zentriert – der Star der Show
- **Die Differenz:** Rot, animiert „zählt hoch" (Counter-Animation) wenn sie erscheint
- **Kein Chart** in den ersten 4 Schritten – nur Zahlen. Tufte: Weniger ist mehr. Der Chart kommt erst im letzten Schritt, wenn der Nutzer das Kontext hat.
- **Fortschrittsanzeige:** Diskreter Dot-Indikator (5 Punkte) unten. Nutzer weiß: ich bin fast da.

#### Stärken / Schwächen

| + | − |
|---|---|
| Geringstes kognitives Load – kein Input-Stress | Kein freies Erkunden: Nutzer kann eigene Sparrate erst spät eingeben |
| Narrative hält Aufmerksamkeit | Länger: 5 Screens statt sofortiger Übersicht |
| Jedes Detail bekommt seinen Moment | Eher Artikel-integriert als eigenständiges Tool |

---

## 3. Vergleich der drei Varianten

| Kriterium | A: Wasserfall | B: Zeitmaschine | C: Schatzkarte |
|---|---|---|---|
| **Kognitive Last** | Mittel | Mittel-hoch | Niedrig |
| **Emotionale Wirkung** | Hoch | Sehr hoch | Sehr hoch |
| **Interaktivität** | Mittel | Hoch | Niedrig |
| **Exploration** | Eingeschränkt | Vollständig | Keiner |
| **Eignung Mobile** | ✓ gut | ✓ gut | ✓✓ ideal |
| **Passt zu Blog-Kontext** | ✓✓ | ✓ | ✓✓ |
| **Zeit bis zur Botschaft** | ~30 Sek. | ~10 Sek. | ~2 Min. |
| **Risiko Überforderung** | gering | mittel | keines |

**Empfehlung:** Variante B als Kern-Interaktion (der Slider *ist* die These), kombiniert mit dem narrativen Einstieg aus Variante C. Die zwei Zukünfte auf einem einzigen Screen – mit einem politischen Slider – hat das höchste Potential für „das teile ich weiter"-Momente.

---

## 4. Gemeinsame UX-Prinzipien (alle Varianten)

### Krug: Don't Make Me Think

- **Maximal zwei Inputs** vom Nutzer (Sparrate + Laufzeit). Alles andere ist Preset.
- Transaktionskosten werden **nicht** interaktiv – der Block ist zu klein und verwirrt nur.
- Kein offener Zahlen-Input – nur Slider. Kein Tipp-Fehler möglich.
- Default-Werte zeigen direkt ein Ergebnis. Niemand starrt auf leere Felder.

### Tufte: Data-Ink Ratio

- Kein Chartjunk: keine 3D-Grafiken, keine Schatten, keine dekorativen Bögen
- Jede angezeigte Zahl muss argumentativ notwendig sein
- Achsen-Labels minimal: nur Anfang und Ende der Zeitachse
- Gridlines, wenn überhaupt: blassgrau, nicht dominant

### FAANG-Design: Emotionaler Höhepunkt statt Feature-Liste

- **Ein Moment** der App muss bleiben: Die Steuerzahl ist größer als alles andere.
- Der Slider für den Steuersatz muss groß, zentral und responsiv sein – er ist die Bühne
- Kein Info-Overload: Tooltips/Erklärungen sind optional, nie obligatorisch
- Texte unter den Grafiken sind kurz und direkt – max. 2 Sätze, nie Fachbegriffe ohne Erklärung

### Cognitive Psychology: Framing & Anchoring

- Die Differenz (was verloren geht) immer absolut in Euro zeigen – keine Prozentkaskaden
- Verlust-Framing wirkt stärker als Gewinn-Framing: „43.000 € weniger" vs. „69 % erhalten"
- Vergleich mit greifbaren Dingen optional: „Das entspricht einem Kleinwagen" – aber nur in einem erklärenden Textblock, nicht in der App selbst
- Reihenfolge der Kostenblöcke: immer klein → klein → groß. Der Schock kommt am Ende.

---

## 5. Hinweis-Box (muss im Artikel erscheinen)

Jede Variante braucht eine sichtbare, aber nicht schreckenserregende Disclaimer-Box:

> **Modellhinweis:** Dieses Tool zeigt ein vereinfachtes Gedankenexperiment. Es berücksichtigt keine Inflation, keinen Sparerpauschbetrag (1.000 €/Jahr steuerfrei) und keine steuerliche Stundung durch Thesaurierung. Die dargestellten Zahlen sind illustrativ. Die historische Marktrendite ist kein Versprechen für die Zukunft.

