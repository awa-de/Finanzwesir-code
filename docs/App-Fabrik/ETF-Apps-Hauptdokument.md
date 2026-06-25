---
Angelegt am: 28.04.2026 14:13:32
zuletzt verändert am: 2026-05-19
---
---
up:[[Apps MOC]]


> [!info]
> Idee: Viralität einbauen, immer eine Möglichkeit geben, dass der Nutzer sein Ergebnis der App teilen kann. So ein "wusstest Du schon..." So kann der Nutzer Sozialprestige sammeln, indem er Dinge weiß, de andere nicht wissen. Wir müssen ihn intellektuell gut dastehen lassen.
>  Wie können wir das machen? 

## Übergeordnete Architektur: Der Entscheidungs-Trichter

Die Apps sind **keine isolierten Widgets**, sondern Stationen eines psychologischen Funnels. Jede App löst genau eine Blockade oder beantwortet genau einen Einwand, der Menschen vom Investieren abhält.

**Wichtig:** Die Apps müssen **doppelt funktionieren** – als Funnel-Station und als standalone Embed. User landen über Artikel-Links direkt auf einzelnen Tools, nicht immer am Anfang des Funnels.

```
HOOK
  ↓
[B] MARKTZEIT STATT TIMING
    B1 Marktzeit schlägt Timing · B2 Geburtsjahrlos · B3 Market-Timing-Simulator
    B4 Der alte Euro · B5 Depot-Kipppunkt
  ↓
[A] RISIKO ÜBERLEBEN
    A1 Risiko-Übersetzer (Dosis finden)
    A2 Crash-Reaktions-Test (Feuerprobe erleben)
    A3 Der Markt kam zurück. Du nicht. (Ausstiegsfolge sehen)
  ↓
[C] KOMPLEXITÄT ENTLARVEN
    C1 Diversifikations-Detektor · C2 1 ETF vs. 5 ETFs · C3 Weltdepot-Baukasten
  ↓
[D/E] ETF-AUSWAHL & TECHNIK
    D1 Namensdecoder · D2 Replizierer/Swapper · D3 TER-Rechner · D4 ETF-Vergleich · E1 ESG-Spiegel
  ↓
[F] MECHANISMEN VERSTEHEN
    F1 Renditekiller · F2 Thesaurierer/Ausschütter
  ↓
══════════════════════════════════════════════════
[G] SYSTEMKRITISCHE EINWÄNDE  ← NEU IN VERSION 2
══════════════════════════════════════════════════
    G1 Regulatorisches Risiko Dashboard ✅ (bereits gebaut)
    G2 Rendite-Kalibrierung / „Ist die ETF-Ära vorbei?"
    G3 Passiv-Paradox (optional, ergänzend)
  ↓
[H] PLAN GEBEN & CTA
    H1 Plan-Generator
```

> A1, A2 und A3 werden als zusammenhängender Block „Risiko überleben" geführt. A1 bleibt inhaltlich „Risiko klären", rückt aber dramaturgisch vor A2/A3. F1 und F2 bilden den Block F „Mechanismen verstehen". Block B ist als „Marktzeit statt Timing" mit 5 Apps (B1–B5) gefasst; B4 „Der alte Euro" und B5 „Depot-Kipppunkt" sind aus dem früheren Block F in Block B verschoben.

### Warum Block G am Ende steht

Systemkritische Einwände (Regulatorik, ETF-Ära, passive Dominanz) sind **keine Anfänger-Blockaden**, sondern die letzten Zweifel derer, die fast überzeugt sind. Wer noch gar nicht investiert, wird durch diese Themen früh abgeschreckt. Wer den Funnel durchlaufen hat, kann sie integrieren.

Block G muss **anders klingen** als der Rest: nicht motivierend, nicht vereinfachend – sondern respektvoll. Ton: *„Du hast recht, das ist ein echtes Problem. Hier ist die vollständige Antwort."*

---

## Master-Prioritätsliste

| # | App | Block | KI-Konsens | Hebel | Aufwand | Status |
|---|---|---|---|---|---|---|
| 1 | Risiko-Übersetzer (Dacia-Test) | A1 | ★★★★ | 🔥🔥 Sehr hoch | Gering | 🟨 offen |
| 2 | Geburtsjahrlos-Simulator | B2 | ★★★★ | 🔥🔥 Sehr hoch | Mittel | 🟨 offen |
| 3 | Crash-Reaktions-Test | A2 | ★★★ | 🔥🔥 Sehr hoch | Mittel | 🟨 offen |
| 4 | Der Markt kam zurück. Du nicht. | A3 | ★★★ | 🔥🔥 Sehr hoch | Mittel | 🟨 offen |
| 5 | Diversifikations-Detektor | C1 | ★★★ | 🔥 Hoch | Mittel | 🟨 offen |
| 6 | ETF-Namensdecoder | D1 | ★★★ | 🔥 Hoch | Gering | 🟨 offen |
| 7 | Regulatorisches Risiko Dashboard | G1 | ★★ | 🔥 Hoch | — | ✅ gebaut |
| 8 | Rendite-Kalibrierung (ETF-Ära) | G2 | ★★ | 🔥 Hoch | Mittel | 🟨 offen |
| 9 | Market-Timing-Simulator | B3 | ★★ | 🔥 Hoch | Mittel | 🟨 offen |
| 10 | 1 ETF vs. 5 ETFs | C2 | ★★ | Mittel | Gering | 🟨 offen |
| 11 | TER-Rechner (Kostenkiller) | D3 | ★★ | Mittel | Mittel | 🟨 offen |
| 12 | Marktzeit schlägt Timing | B1 | ★★ | 🔥 Hoch | Gering | 🟨 offen |
| 13 | ESG-Spiegel | E1 | ★★ | Mittel | Mittel | 🟨 offen |
| 14 | Renditekiller (Volatilität) | F1 | ★ | Mittel | Gering | 🟨 offen |
| 15 | Passiv-Paradox | G3 | ★ | Mittel | Gering | 🟨 offen |
| 16 | Replizierer vs. Swapper | D2 | ★★ | Mittel | Hoch | 🟨 offen |
| 17 | Thesaurierer vs. Ausschütter | F2 | ★ | Gering | Gering | 🟨 offen |
| 18 | Weltdepot-Baukasten | C3 | ★ | Mittel | Mittel | 🟨 offen |
| 19 | Plan-Generator | H1 | ★ | 🔥 Hoch | Hoch | 🟨 offen |
| 20 | Der alte Euro | B4 | — | Mittel | Gering | 🟨 offen |
| 21 | Depot-Kipppunkt | B5 | — | 🔥 Hoch | Gering | 🟨 offen |
| 22 | ETF-Vergleich / ETF-Feinschliff-Entgifter | D4 | — | Mittel | Mittel | 🟨 offen |

> **Weltkarte der 16 Indizes:** Bereits in Arbeit. Ergänzt App C1 (Diversifikations-Detektor).
> **Status-Codes:** ✅ fertig · 🟨 in Planung · 🟦 in Entwicklung · ❌ verworfen

---
# Block A: Psychologie, Risikodosis und Durchhalten

Block A ist künftig kein loser Block aus „Crash-Angst"-Apps, sondern eine Durchhalte-Kette:

> **A1 Dosis finden → A2 Feuerprobe erleben → A3 Ausstiegsfolge sehen**

Die gemeinsame Botschaft lautet:

> **Du musst nicht den Durchschnitt aushalten. Du musst deinen schlimmsten Abschnitt aushalten.**

A1 verhindert Überdosierung.  
A2 zeigt die Entscheidung unter Stress.  
A3 zeigt den Preis des dauerhaften Ausstiegs.

Damit wird Risiko nicht als Volatilität erklärt, sondern als Verhaltensproblem gezeigt: Langfristige Rendite gehört nur denen, die am schlimmsten Punkt noch dabei sind.

---

## A1 – Risiko-Übersetzer (Dacia-Test)

**Slug:** `risiko-uebersetzer`
**KI-Konsens:** ★★★★ (Perplexity, Gemini, Claude, ChatGPT)
**Folienbezug:** Slides 37–38, 117–122 (Positionsgrößenmanagement)
**Funnel-Position:** Risiko klären
**Priorität:** #1

### Problem, das gelöst wird

„50 % Verlust" ist eine abstrakte Zahl – kein Mensch fühlt sie. Ein Dacia Logan ist real. Diese App übersetzt Finanzmathematik in Alltagsgegenstände und beantwortet damit die häufigste Frage: *„Wie viel soll ich überhaupt investieren?"*

### Kernbotschaft

> „Kannst du ruhig schlafen, wenn deine Küche plötzlich weg ist? Wenn nicht – reduziere deinen ETF-Anteil."

### Rolle im A-Trio

A1 ist die **Dosis-App**.

Sie beantwortet nicht allgemein „Was ist Risiko?", sondern konkret:

> „Wie viel ETF-Anteil kann ich so tragen, dass mich ein echter Crash nicht aus dem Markt wirft?"

A1 bleibt eigenständig. Die Dacia-/Küchen-/Urlaubs-Anker sind kein Gimmick, sondern der psychologische Kern: Prozentwerte bleiben abstrakt, Eurobeträge werden ernster, konkrete Dinge und Erlebnisse werden körperlich.

A1 liefert damit die Vorbereitung für A2 und A3:
- A2 testet, was im Crash mit dieser Dosis passiert.
- A3 zeigt, was der Ausstieg kostet, wenn die Dosis zu hoch war.

### Interaktion (UX-Flow)

**Eingaben:**
- Schieberegler: Gesamtvermögen (z. B. 50.000 €)
- Schieberegler: ETF-Anteil (10 % bis 100 %)
- Crash-Szenario fix: –50 % (härtester historischer Fall)

**Ausgabe (live beim Schieben):**
- Absoluter Verlust in Euro
- Prozentualer Verlust vom Gesamtvermögen
- Entspricht: konkretes Konsumgut aus der Ankerliste
- Langfristige Renditeerwartung: ETF-Anteil × 9 % + Rest × 2 %
- Reale Rendite nach Inflation

**Ankerliste (direkt aus dem Seminar, Slide 118):**

| ETF-Anteil | Verlust (bei 50.000 €, –50 %) | Entspricht |
|---|---|---|
| 10 % | 2.500 € | Familienurlaub |
| 20 % | 5.000 € | Nomos Zürich Anthrazit |
| 40 % | 10.000 € | Dacia Logan |
| 60 % | 15.000 € | Ring, Weißgold 18kt, Diamanten |
| 80 % | 20.000 € | Basismodell BMW 1er |
| 100 % | 25.000 € | ALNO VETRINA Grifflosküche |

**Umschalter:** „Fühlt sich okay an?" → Ja / Nein
- Bei „Ja": CTA „Dann kannst du investieren"
- Bei „Nein": Regler auf niedrigere Stufe, neu berechnen

**Auto-generierter Output-Satz:**
> „Wenn ein Dacia Logan dein Schmerzlimit ist: ETF-Anteil max. 40 %. Dein Depot: 40 % ETF + 60 % Tagesgeld → 4,8 % Rendite langfristig."

### Microcopy

- Headline: „Was bedeutet –20 % für dein Leben?"
- Subline: „Rendite ist nett. Verlust ist real."
- CTA: „Ich halte das aus – Sparplan starten"

### Implementierungshinweise

- HTML + JS, kein Backend, alle Werte statisch
- Touch-Slider für Mobile
- Ankerliste als JSON-Array, leicht erweiterbar

---

## A2 – Crash-Reaktions-Test

**Slug:** `crash-reaktions-test`
**KI-Konsens:** ★★★ (ChatGPT, Claude indirekt, Gemini)
**Folienbezug:** Slides 6, 36–38 (Anlegerverhalten, Psychologie)
**Funnel-Position:** Crash-Angst auflösen
**Priorität:** #3

### Problem, das gelöst wird

Die größte Hürde beim Investieren ist nicht fehlendes Wissen, sondern die unbeantwortete Frage: *„Was mache ich, wenn es kracht?"* Diese App gibt eine erlebbare Antwort – und zeigt, dass Verhalten mehr zählt als der gewählte ETF.

### Kernbotschaft

> „Dein Verhalten ist wichtiger als dein ETF."

### Rolle im A-Trio

A2 ist die **Feuerprobe-App**.

Sie beantwortet:

> „Was tue ich, wenn es wirklich kracht?"

A2 bleibt eigenständig, weil sie den Stressmoment simuliert. A1 kalibriert die Dosis vor dem Crash, A2 zwingt zur Entscheidung im Crash, A3 zeigt danach die langfristigen Kosten des Verkaufs.

### Interaktion (UX-Flow)

**Screen 1 – Einstieg (Animation):**
- Depot-Anzeige: 25.000 €
- Overlay-Text: „März 2020 passiert wieder."
- Animierter Chart: Depot fällt auf 17.500 € (–30 % in 2 Wochen)
- Zähler läuft in Echtzeit herunter

**Screen 2 – Entscheidung:**
- Headline: „Deine Entscheidung?"
- Drei große Buttons: ❌ Alles verkaufen · 😐 Nichts tun · 💪 Nachkaufen

**Screen 3 – Ergebnis:**
- Linienchart: 3 Verläufe (Verkaufen / Halten / Nachkaufen) bis heute
- Verkaufen: „Du hast den Verlust realisiert – und die Erholung verpasst."
- Halten: „Du hast durchgehalten. Das ist schon besser als die meisten."
- Nachkaufen: „Du hast den Crash genutzt. So entsteht Vermögen."
- Punchline (immer): „Dein Verhalten entscheidet mehr als dein ETF."
- CTA: „Ich halte das aus – Sparplan starten"

### Wireframe-Struktur

```
[Chart: Portfolio fällt animiert]
[Text: „Willkommen im echten Leben."]
[Buttons: 3 Optionen]
↓
[Result Screen: Chart mit 3 Linien]
[Erklärungstext je nach Auswahl]
[CTA Button]
```

### Implementierungshinweise

- Historische Daten: MSCI World 2020 Crash + Recovery (öffentlich verfügbar)
- Animierter Zähler für den Depot-Wertverlust (emotionaler als statische Zahl)
- Chart.js für Liniendiagramm

---

## A3 – Der Markt kam zurück. Du nicht.

**Slug:** `markt-kam-zurueck`
**KI-Konsens:** ★★★ (neue Ergänzung; noch kein Alt-Konsens aus der ersten App-Liste)
**Folienbezug:** Psychologie, Crash-Angst, Positionsgrößenmanagement, Durchhalten
**Funnel-Position:** Risiko überleben / Ausstiegsfolgen
**Priorität:** #4

### Problem, das gelöst wird

Viele Anleger glauben: *„Wenn es schlimm wird, verkaufe ich halt. Später kann ich ja wieder einsteigen."* Diese App zeigt, warum dieser Satz gefährlich ist. Wer im Verlust verkauft, kommt psychologisch oft nicht zurück. Der Crash ist dann nicht das eigentliche Problem — das eigentliche Problem ist die verpasste Erholung danach.

### Kernbotschaft

> „Der Markt kam zurück. Du nicht."

Strategischer Rahmen:

> „Langfristige Rendite gehört nur denen, die am schlimmsten Punkt noch dabei sind."

### Rolle im A-Trio

A3 ist die **Ausstiegsfolgen-App**.

Sie beantwortet:

> „Was kostet es, wenn ich einmal mit Verlust aussteige und nie wieder zurückkomme?"

A1 kalibriert die tragbare Dosis. A2 zwingt zur Entscheidung im Crash. A3 zeigt die langfristigen Kosten des Verkaufs — und zerstört damit die Illusion des „einfachen Wiedereinstiegs".

### Interaktion (UX-Flow)

**Eingaben:**
- Startjahr (Schieberegler oder Jahresauswahl)
- Verlusttoleranz in Prozent (z. B. –10 % bis –60 %)
- Optional: Depotwert oder monatliche Sparrate

**Screen 1 – Einstieg:** Headline „Der Markt kam zurück. Du nicht." + Eingaben + CTA „Reise starten"

**Screen 2 – Historische Reise:** MSCI-World-Kurve ab Startjahr. Berechnung des maximalen zwischenzeitlichen Verlusts. Ausstiegsmarker wenn Verlusttoleranz gerissen.

**Screen 3 – Ergebnis:**
- Fall A (ausgestiegen): Ausstiegsdatum, Ausstiegswert, heutiger Marktwert, verpasste Erholung in Euro und Alltagsankern aus A1.
  Punchline: „Der Verlust war schmerzhaft. Der Ausstieg war teurer."
- Fall B (dringeblieben): „Du wärst dringeblieben. Aber nicht jedes Startjahr war so gnädig." → CTA Härtetest

**Screen 4 – Härtetest (optional):** Erst nach dem persönlichen Ergebnis. Zeigt das härteste Startjahr für die eigene Verlusttoleranz. Kein direkter Einstieg mit Crashjahr.

### Microcopy

- Headline: „Der Markt kam zurück. Du nicht."
- Subline: „Teste, ob du deinen eigenen Anlageweg durchgehalten hättest."
- Startjahr-Label: „Wann wärst du gestartet?"
- Verlusttoleranz-Label: „Bei welchem Verlust wärst du raus?"
- CTA: „Reise starten" / „Zeig mir den Härtetest"

### Implementierungshinweise

- Historische MSCI-World-Zeitreihe (lokal/statisch, kein Backend, Monatsdaten reichen)
- Keine Drawdown-Kurve, keine Fachbegriffe im UI (kein Drawdown, Tail Risk, Volatilität)
- Nutzer wählt zuerst sein eigenes Startjahr — keine Manipulation durch direkten Crashjahr-Einstieg
- A1-Ankerliste kann für Ergebnisübersetzung (verpasste Erholung → Dacia, Küche etc.) wiederverwendet werden
- **Offene Klärung:** MSCI World Preisindex oder Net Total Return, Startjahr-Range, nominal/real, Sparplan vs. Einmalanlage

---

---

# Block B: Marktzeit statt Timing

Block B zerstört nicht nur die Illusion des perfekten Einstiegs. Er zeigt, warum Marktzeit der eigentliche Rohstoff des langfristigen Investierens ist.

> B3 zeigt: Den perfekten Einstieg findest du nicht.  
> B1 zeigt: Also verliere heute nicht wieder Marktzeit.  
> B2 zeigt: Deine Börsenepoche ist ein Los, keine Leistung.  
> B4 zeigt: Zeit baut im einzelnen Euro den Motor.  
> B5 zeigt: Viele alte Euros werden irgendwann zum Mitverdiener.

---

## B1 – Marktzeit schlägt Timing / Lieber heute als morgen

**Slug:** `prokrastinations-preis`
**KI-Konsens:** ★★ (Perplexity, ChatGPT)
**Folienbezug:** Slides 4–7 (Großwetterlage, 100 USD monatlich)
**Funnel-Position:** Marktzeit statt Timing
**Priorität:** #12

### Problem, das gelöst wird

Viele Anleger denken: „Vor zehn Jahren hätte es sich gelohnt. Jetzt ist der Zug abgefahren." Oder: „Ich warte noch. Vielleicht wird es günstiger." B1 zeigt: Der verpasste Startpunkt ist weg. Aber heute ist noch da.

### Kernbotschaft

> „Du kannst nicht mehr vor 10 Jahren starten. Aber du kannst verhindern, dass heute in 10 Jahren wieder ‚vor 10 Jahren' heißt."

Kurzform: „Warten nimmt dir Marktzeit." — die verständliche Finanzwesir-Version von: „Time in the market beats timing the market."

### Datenlogik

B1 arbeitet mit echten MSCI-World-Monatsdaten. Letzter verfügbarer Monatswert = „heute", Startpunkt = 120 Monate vorher. Keine glatte 6–8-%-Zukunftsprojektion, keine monotone Modellkurve — die App braucht echte Einbrüche.

### Interaktion (UX-Flow, 4 Screens)

- Screen 1: Headline „Vor 10 Jahren wäre besser gewesen. Was ist mit heute?" · Eingabe: monatliche Sparrate, optional Startbetrag, Zeitraum fix 10 Jahre
- Screen 2: Echte historische Sparplanstrecke (eingezahlt / heutiger Depotwert / Gewinn-Verlust) · Microcopy: „Das wäre kein gerader Weg gewesen. Aber es wäre Marktzeit gewesen."
- Screen 3: Heute als vertikale Linie · Text: „Vor 10 Jahren ist weg. Heute nicht."
- Screen 4: Keine Zukunftsprognose als glatte Kurve · „Wenn du jetzt wieder wartest, wird heute in zehn Jahren wieder der verpasste Zeitpunkt sein."

### Was die App nicht tut

- keine rollierenden 30-Jahres-Zeiträume (→ B2)
- kein Kindersparplan
- kein animierter Verlustzähler als Hauptmechanik
- keine glatte Zukunftsprojektion

### CTA

> „Heute Marktzeit sammeln" / „Ich starte jetzt"

### Implementierungshinweise

- Historische MSCI-World-Monatsdaten lokal/statisch
- Kein Backend, keine Tagesdaten, keine modellierte Zukunftskurve

---

## B2 – Geburtsjahrlos

**Slug:** `geburtsjahrlos`
**KI-Konsens:** ★★★★ (Perplexity, Claude, Gemini, ChatGPT)
**Folienbezug:** Slides 4–6, 8–10, 60 (Großwetterlage, historische Renditen)
**Funnel-Position:** Marktzeit statt Timing / historische Robustheit
**Priorität:** #2

### Problem, das gelöst wird

Viele Anleger glauben unbewusst, langfristiges Investieren liefere ein planbares Standardergebnis. B2 zeigt: Selbst 30 Jahre ETF-Sparen sind keine Einheitsstrecke. Dieselbe Strategie, dieselbe Sparrate und dieselbe Laufzeit führten historisch zu sehr unterschiedlichen realen Endwerten — nicht wegen Fehlern, sondern wegen Börsenepoche.

### Kernbotschaft

> „Du kontrollierst nicht deine Börsenepoche. Du kontrollierst nur, ob deine Strategie robust genug ist."

Kurzform: „Epoche ist Los."

### Neue Rolle

B2 zeigt nicht mehr, wie wichtig frühes Anfangen ist (→ B1 und „Der alte Euro"). B2 zeigt: Wie unterschiedlich dieselbe 30-Jahres-Strategie je nach Börsenepoche ausging.

### Interaktion (UX-Flow)

**Eingaben:** monatliche Sparrate · Laufzeit: standardmäßig 30 Jahre · optional: Startmonat/Startjahr markieren

**Visualisierung:**
- historischer Fächer aller rollierenden 30-Jahres-Zeiträume
- schlechtester Zeitraum · Median-Zeitraum · bester Zeitraum
- alle Hauptwerte inflationsbereinigt in heutiger Kaufkraft

**Ergebniswerte:** real eingezahlt · realer Endwert schlechtester / Median / bester Zeitraum

### Methodische Schutzplanke

Bei 30-Jahres-Zeiträumen müssen die Hauptwerte inflationsbereinigt sein. Nominale Werte dürfen höchstens als Nebenwert oder Tooltip erscheinen.

### Was die App nicht tut

- kein „Der beste Zeitpunkt war vor 10 Jahren" (→ B1)
- keine Opportunitätskosten des Zögerns (→ B1)
- kein Button „Was passiert, wenn ich 3 Jahre warte?" (→ B1)
- kein Kindersparplan
- keine Startalter-App
- keine glatte Zukunftsprojektion

### CTA

> „Robust starten, statt perfekte Epoche suchen."

### Implementierungshinweise

- Historische MSCI-World-Monatsdaten lokal/statisch
- Inflationsdaten erforderlich, Hauptwerte real
- D3.js oder Chart.js für Fächer-Diagramm
- Kein Backend nötig

---

## B3 – Market-Timing-Fail-Simulator

**Slug:** `market-timing-simulator`
**KI-Konsens:** ★★ (ChatGPT, Gemini)
**Folienbezug:** Slides 43–45, 51 (Kaufzeitpunkt)
**Funnel-Position:** Marktzeit statt Timing
**Priorität:** #8

### Problem, das gelöst wird

Fast jeder wartet auf „den richtigen Zeitpunkt". Diese App lässt den User es selbst versuchen – und scheitern.

### Kernbotschaft

> „Du bist nicht schlauer als der Markt."

### Interaktion (UX-Flow)

**Screen 1 – Challenge:**
- Historischer Chart 2000–2024 (stoppt nach 2015, Zukunft unsichtbar)
- Headline: „Klicke den besten Einstiegszeitpunkt"

**Screen 2 – Enthüllung:**
- Chart zeigt den weiteren Verlauf
- Zwei Linien: User-Klick vs. „Einfach sofort investiert"

**Variante (Gemini):** Börsenuhr-Version
- Klick zwischen 9–15 Uhr: hoher Spread
- Klick zwischen 15:30–17:30 Uhr: grünes Licht (US-Liquidität)

**CTA:** „Ich starte jetzt"

---

## B4 – Der alte Euro

**Slug:** `der-alte-euro`
**Funnel-Position:** Marktzeit statt Timing / Mechanik der Marktzeit
**Modulrolle:** Mechanik-Mini-App
**Priorität:** #20

### Problem, das gelöst wird

„Früh anfangen" klingt wie eine moralische Mahnung. Diese App zeigt, warum frühes Geld tatsächlich mächtiger wird: Nicht der eine Euro wird magisch größer, sondern seine Erträge erzeugen wieder Erträge.

### Kernbotschaft

> „Ein alter Euro arbeitet mit Familie."

Ausführlicher: „Ein früher Euro wird nicht größer, weil er besonders ist. Er wird größer, weil seine Erträge wieder Erträge erzeugen."

### Interaktion

Vier gestapelte Balken zeigen, was aus 1 € nach 10, 20, 30 und 40 Jahren wird. Jeder Balken: ursprünglicher Euro · Ertrag auf den ursprünglichen Euro · Ertrag auf frühere Erträge. Eingabe: nur Renditewahl (4 %, 6 % oder 8 %), keine freie Eingabe.

Punchline: „Nach 40 Jahren ist der ursprüngliche Euro nicht der Held. Er ist der Großvater."

### Was die App nicht tut

- kein Heute-vs.-Später-Vergleich · keine Opportunitätskosten · keine historische MSCI-Simulation · keine Sparrate, kein Depot, kein Einkommen, keine Steuer, keine Inflation

### CTA

> „Wann arbeitet dein Depot mit?" → Übergang zu B5 Depot-Kipppunkt

### Implementierungshinweise

- Reine JS-Berechnung, kein Backend, keine historischen Daten, Formelmodell reicht

---

## B5 – Depot-Kipppunkt

**Slug:** `depot-kipppunkt`
**Funnel-Position:** Marktzeit statt Timing / Statuswechsel
**Modulrolle:** Motivations- und Statuswechsel-App
**Priorität:** #21

### Problem, das gelöst wird

Sparen fühlt sich wie Konsumverzicht an. Diese App zeigt: Aus Sparen wird mit der Zeit eine zweite Einkommensquelle. Irgendwann kann das Depot rechnerisch mehr pro Jahr erwirtschaften als der heutige Job.

### Kernbotschaft

> „Irgendwann bringt dein Depot pro Jahr mehr ein als dein Job."

### Interaktion

Vier Eingaben: monatliches Nettoarbeitseinkommen · monatliche Sparrate · heutiger Depotwert · Renditeannahme (4 %, 6 %, 8 %).

Visualisierung: Job-Netto-Linie (konstant) vs. Depot-Ertragslinie (wächst). Schnittpunkt = Depot-Kipppunkt. Fortschrittsmarken bei 25 %, 50 %, 75 %, 100 % des heutigen Job-Netto.

Transparenzsatz (Pflicht): „Wir vergleichen dein heutiges Job-Netto mit dem rechnerischen Depot-Ertrag vor Steuern. Das ist keine Prognose, keine Steuerplanung und keine Rentenplanung, sondern eine Standortbestimmung."

### Was die App nicht tut

- keine Finanzfreiheit, keine Entnahmerate, keine Steuerdetails, keine Gehaltssteigerung, keine Sparratendynamik, keine Inflation, keine historischen MSCI-Pfade, kein „Wann kannst du aufhören zu arbeiten?" — Version 1 bleibt radikal schlank.

### CTA

Im Hauptpfad: „Welche Dosis hältst du aus?" → A1 Risiko-Übersetzer

### Implementierungshinweise

- Reine JS-Berechnung, kein Backend, keine historischen Daten, Formelmodell reicht

---

---

# Block C: Diversifikation & Depotbau

---

## C1 – Diversifikations-Detektor

**Slug:** `diversifikations-detektor`
**KI-Konsens:** ★★★ (Perplexity, Gemini, ChatGPT) + Weltkarte ergänzend
**Folienbezug:** Slides 11–18, 25–31
**Funnel-Position:** Komplexität entlarven
**Priorität:** #4

### Problem, das gelöst wird

Mehr ETFs = mehr Sicherheit. Das ist der größte Denkfehler. Diese App zeigt: Mehr ETFs bedeutet oft nur, dieselben Aktien mehrfach zu kaufen.

### Kernbotschaft

> „Du kaufst das Gleiche zweimal."

### Interaktion (UX-Flow)

**Screen 1:** User klickt ETFs an (MSCI World, S&P 500, EM, MSCI Europe, Robotics, Clean Energy…)

**Screen 2 – Visualisierung (Split-Screen):**
- Links: Kreisdiagramm mit regionaler Aufteilung
- Rechts: Weltkarte (Verbindung zur bestehenden Weltkarten-App)
- Highlight: USA-Bereich leuchtet rot bei Dopplung
- Overlay: „Du hast 68 % USA – doppelt enthalten."

**Detail-Anzeige:**
- USA-Anteil: XX %
- Davon doppelt: XX %

**CTA:** „Ein ETF reicht – Portfolio vereinfachen"

### Variante: „Baue deinen eigenen Index" (ChatGPT)

User wählt Länder, Gewichtung, Anzahl Aktien → App zeigt: „Dein Index ist eigentlich MSCI World (95 % ähnlich)."

### Implementierungshinweise

- Überschneidungsdaten für Top-ETFs als statisches JSON
- Verbindung zur bestehenden Weltkarten-App sinnvoll
- D3.js für Overlap-Heatmap oder Kreisdiagramm

---

## C2 – Komplexitätsentlarver (1 ETF vs. 5)

**Slug:** `komplexitaets-entlarver`
**KI-Konsens:** ★★ (Claude, ChatGPT)
**Folienbezug:** Slides 25–31, 33, 49
**Funnel-Position:** Einfachheit zeigen
**Priorität:** #9

### Problem, das gelöst wird

Überforderung killt den Start. Diese App zeigt: Ein ETF liefert dasselbe Ergebnis mit 10× weniger Aufwand.

### Kernbotschaft

> „Mehr Arbeit. Kein Mehrwert."

### Interaktion (UX-Flow)

**Screen 1 – Das „Experten-Depot":**
Kachel-Grid mit 11 ETFs → Button „Aufräumen →" → Animation: Kacheln kollabieren in 5 Kategorien

**Screen 2 – Performance-Vergleich:**

| Zeitraum | 11-ETF-Depot | ACWI (1 ETF) | Differenz |
|---|---|---|---|
| 1 Monat | +0,33 % | +0,28 % | Ähnlich |
| 6 Monate | –2,51 % | –2,45 % | Ähnlich |
| 5 Jahre | Fast gleich | Fast gleich | Minimal |

Hover → Tooltip: „7 Sektor-ETFs liefern exakt die World-Rendite – mit 10× mehr Aufwand."

**CTA:** „Ich nehme die einfache Lösung"

---

## C3 – Weltdepot-Baukasten

**Slug:** `weltdepot-baukasten`
**KI-Konsens:** ★ (Claude)
**Folienbezug:** Slides 21–22, 46, 104
**Funnel-Position:** Plan geben
**Priorität:** #17

### Kernbotschaft

> „Das Ziel – nicht arm sterben – erreichen wir mit allen Kombinationen." (Slide 104)

### Interaktion

4 Tabs: A (1 ETF ACWI) · B (80/20 World/EM) · C (3 ETFs) · D (4 ETFs regional)

Pro Variante: Tortendiagramm, Checkliste (✅ Lückenlos / ✅ Überschneidungsfrei / ✅ Selbststabilisierend), ETF-Anzahl + Rebalancing-Aufwand, Performancevergleich über alle Varianten.

---

---

# Block D: ETF-Auswahl & Technik

---

## D1 – ETF-Namensdecoder

**Slug:** `etf-namensdecoder`
**KI-Konsens:** ★★★ (Perplexity, Claude, ChatGPT indirekt)
**Folienbezug:** Slide 164 (ETF-Namen erklärt)
**Funnel-Position:** Hook / Einstieg (Sprachbarriere beseitigen)
**Priorität:** #5

### Problem, das gelöst wird

„Xtrackers S&P 500 UCITS ETF 1C EUR Hedged" – wer das zum ersten Mal liest, schließt den Browser. Wer den Namen versteht, hat keine Ausrede mehr.

### Kernbotschaft

> „Der größte Angstfaktor beim ETF-Kauf ist der unverständliche Name."

### Interaktion (UX-Flow)

**Option A: Vorauswahl** – 6–8 reale ETF-Namen:
- `iShares Core MSCI World UCITS ETF acc`
- `Xtrackers S&P 500 UCITS ETF 1C EUR hedged`
- `Amundi MSCI Emerging Markets UCITS ETF dist`
- `Vanguard FTSE All-World UCITS ETF (USD) Distributing`

**Option B: Freies Eingabefeld**

**Ausgabe – farbige Token-Zerlegung:**

```
[Xtrackers]  [S&P 500]  [UCITS ETF]  [1C]  [EUR hedged]
    🔴            🔵          🟢        🟠        🟣
 Anbieter       Index      EU-Hülle  Thes.   Währungsges.
```

**Klick auf Token → Aufklapp-Box:**
- 🔴 **Anbieter:** „Xtrackers = Deutsche Bank/DWS. Auch: iShares (BlackRock), Amundi, Vanguard, SPDR, UBS, HSBC."
- 🔵 **Index:** „Was drin ist. S&P 500 = 500 größte US-Unternehmen."
- 🟢 **UCITS ETF:** „In der EU reguliert und von der BaFin beaufsichtigt."
- 🟠 **acc / 1C / C:** „Thesaurierend – Dividenden werden automatisch reinvestiert."
- 🟣 **EUR hedged:** „Währungsgesichert gegen USD. Kosten ca. 0,2 % p.a. extra."

### Implementierungshinweise

- Reine Frontend-App, Tokenisierung per Regex-Regeln
- Token-Datenbank als JSON (Anbieter-Liste, Index-Liste, Kürzel-Dictionary)

---

## D2 – Replizierer vs. Swapper

**Slug:** `replizierer-swapper`
**KI-Konsens:** ★★ (Perplexity, ChatGPT)
**Folienbezug:** Slide 22
**Funnel-Position:** ETF-Auswahl / Angstreduktion
**Priorität:** #15

### Kernbotschaft

> „Ergebnis ist fast gleich → Angst sinkt."

### Interaktion

Zwei parallele Animationen: Replizierer (kauft echte Aktien, verleiht sie) vs. Swapper (tauscht Performance mit Gegenpartei). Performance-Chart läuft parallel → Linien fast deckungsgleich. Risikometer: beide reguliert, beide sicher.

---

## D3 – Kostenkiller (TER-Rechner)

**Slug:** `kostenkiller-ter`
**KI-Konsens:** ★★ (Claude, ChatGPT)
**Folienbezug:** Slides 154–155 (Kaufkosten vs. laufende Kosten)
**Funnel-Position:** ETF-Auswahl
**Priorität:** #10

### Kernbotschaft

> „Kaufkosten-Optimierung: Hobby. TER-Optimierung: Pflicht."

### Interaktion

- Eingabe: Sparrate, Laufzeit (220 Monate), Kaufkosten %, TER %
- Drei animierte Kurven: ohne Kosten / mit Kaufkosten / mit TER
- Voreinstellung „Typischer Anfängerfehler": Kaufkosten 2,5 %, TER 0,20 %

**Vergleichstabelle (Slide 155):**

| Szenario | Fehlende Anteile (220 Monate) |
|---|---|
| 1,5 % Kaufkosten | 150 |
| 2,5 % Kaufkosten | 250 |
| 1,5 % laufende Kosten | 1.534 |
| 2,5 % laufende Kosten | 2.405 |

---

## D4 – ETF-Vergleich / ETF-Feinschliff-Entgifter

**Slug:** `etf-vergleich`
**Funnel-Position:** ETF-Auswahl / Exit-Gate aus Block D
**Modulrolle:** Master-App / Aktivierungs-App gegen ETF-Perfektionismus
**Priorität:** #22

### Problem, das gelöst wird

Viele Anfänger bleiben vor dem Start im ETF-Produktvergleich stecken. Sie vergleichen TER, Ausschüttungsart, Replikationsmethode, Fondsgröße und Anbieter, weil diese Kriterien sichtbar und kontrollierbar wirken.

Blockade: *„Ich kann noch nicht starten, weil ich erst den optimalen ETF finden muss."*

### Kernbotschaft

> „ETF-Details sind nicht bedeutungslos — aber sie sind innerhalb solider MSCI-World-ETFs nicht der Haupthebel. Der Haupthebel ist, dass der Sparplan läuft."

Merksatz: **D1–D3 erklären die Bäume. D4 zeigt den Wald.**

### Rolle im D-Block

D4 ist das **Exit-Gate aus der ETF-Auswahl**.

D1 → Ich verstehe, was auf dem Etikett steht.  
D2 → Ich verstehe, dass die Replikationsmethode kein Panikgrund ist.  
D3 → Ich verstehe, dass Kosten real sind.  
D4 → Ich erkenne, dass diese Details nicht mein Startgrund sein dürfen.  
H1 → Ich baue meinen konkreten Startplan.

E1 ESG-Spiegel bleibt Spezialpfad (Block E), keine Pflichtstation nach D4.

### Interaktion (Mechanik)

- Blindverkostung von vier anonymisierten MSCI-World-ETFs
- Nutzer wählt nach sichtbaren Produktdetails (TER, Ausschüttung, Replikation, Fondsgröße, Anbieter)
- Auflösung über denselben längsten gemeinsamen Zeitraum: 25.09.2009 bis Datenstand
- Annualisierte Einordnung statt dominant kumulierter Performance
- Persönlicher Wald-vs.-Bäume-Zoom mit eigener Monatsrate (Default 150 €)

**Vergleichsbalken (fix):**
- bester vs. schwächster ETF
- +25 € Monatsrate
- 6 Monate früher starten

### Schutzplanken (V1, bindend)

- 4 ETFs, nicht 5
- Max-Zeitraum dominant: 25.09.2009 bis Datenstand; 5J/10J nur Kontrollblick
- Keine freie Zeitraumwahl
- Keine ETF-Namen und ISINs vor der Auflösung im Hauptflow
- Kein Crash-Szenario
- Keine Produktempfehlung
- Keine Aussage „TER ist egal" oder „alle ETFs sind gleich"
- E1 ESG nicht als Pflichtstation nach D4 setzen

### Offene Klärungen

- Finale Performancewerte 5J/10J/Max, Datenstand, Quelle, Datenformat

---

---

# Block E: ESG & Nachhaltigkeit

---

## E1 – ESG-Spiegel

**Slug:** `esg-spiegel`
**KI-Konsens:** ★★ (Perplexity, Gemini)
**Folienbezug:** Slides 25–28 (25 ESG-Varianten des MSCI World)
**Funnel-Position:** Komplexität entlarven
**Priorität:** #12

### Kernbotschaft

> „Die Top-5-Positionen sind immer dieselben: Apple, Microsoft, Amazon, Alphabet, Meta."

### Interaktion

**Split-Screen:**
- Links: 1 MSCI World → 14 vergleichbare ETFs (eine Zeile im Depot)
- Rechts: 25 ESG-Varianten als Kachel-Grid

User klickt 2 ESG-ETFs → App zeigt identische Top-5. Überschneidungsgrad: 45–94 % der Original-Positionen.

**Variante (Gemini):** Button „Top-Holdings vergleichen" → identische Firmen farbig markiert.

---

---

# Block F: Mechanismen & Mathematik

---

## F1 – Renditekiller (Volatilitäts-Dämpfer)

**Slug:** `renditekiller-volatilitaet`
**KI-Konsens:** ★ (Claude)
**Folienbezug:** Slides 111–112 (Renditekiller Volatilität)
**Funnel-Position:** Risiko klären (mathematischer Unterbau)
**Priorität:** #13

### Kernbotschaft

> „Gleicher Markt, halbe Schwankung, 23 € mehr. Das ist der Grund, warum ein Anleihenanteil keine Feigheit ist – sondern Kalkül."

### Interaktion

Zwei animierte Linien (hohe vs. gedämpfte Volatilität), Jahr für Jahr. Schieberegler „Volatilitätsdämpfer" 0–50 % → beide Linien aktualisieren sich live. Die Lücke wird sichtbar kleiner.

---

## F2 – Thesaurierer vs. Ausschütter

**Slug:** `thesaurierer-rennen`
**KI-Konsens:** ★ (Perplexity)
**Folienbezug:** Slide 23
**Funnel-Position:** ETF-Auswahl (Entscheidungshilfe für Nebenfrage)
**Priorität:** #16

### Kernbotschaft

> „Diese Entscheidung ist eine Nachkomma-Entscheidung. Wichtiger ist: Überhaupt anfangen."

### Interaktion

Animiertes Wettrennen über 10/20/30 Jahre. Ausschütter: kleiner animierter Geldregen, leicht langsameres Wachstum. Ergebnis: Unterschied überraschend klein. Twist: App endet mit Relativierung dieser Entscheidung.

---

---

# Block G: Systemkritische Einwände ← NEU IN VERSION 2

> **Tonalität dieses Blocks:** Nicht motivierend, nicht vereinfachend. Respekt gegenüber dem Leser: *„Du hast recht, das ist ein echtes Problem. Hier ist die vollständige Antwort."* Das ist der Finanzwesir-Ton: klar, ehrlich, unbequem wenn nötig.
>
> **Einleitung dieser Website-Section:**
> „Du denkst jetzt vielleicht: Was, wenn ETFs gar nicht mehr funktionieren? Oder: Was, wenn der Staat mein Erspartes antastet? Berechtigte Fragen. Wir schauen sie uns an."

---

## G1 – Regulatorisches Risiko Dashboard

**Slug:** `regulatorik-dashboard`
**KI-Konsens:** ★★ (Perplexity, ChatGPT)
**Folienbezug:** Thema Planungssicherheit / Sparplan-Robustheit
**Funnel-Position:** Systemkritische Einwände
**Priorität:** #6
**Status: ✅ BEREITS GEBAUT** (dashboard-regulatorikXIX-3.html)

### Was die App zeigt

Wie stark können regulatorische Eingriffe (Steuer, Vorabpauschale, Förderpolitik) die reale Rendite und Rentenphase verändern? Zwei Regler (Ansparphase / Rentenphase) steuern den Renditeverlust in Prozentpunkten.

### Ausgaben (bereits implementiert)
- Endvermögen ohne vs. mit Regulatorikeffekt
- Nötige Mehrersparnis zum Ausgleich
- Jährliche Auszahlung im Rentenalter (mit/ohne Eingriff)

### Kernbotschaft der App

> „Das Risiko ist real. Aber es zerstört nicht deine Strategie – nur die Details. Komplexe Strategien brechen. Einfache überleben."

### Inhaltlicher Rahmen (aus Artikeldokument)

Das eigentliche Risiko für ETF-Sparer in Deutschland ist nicht Systembruch, sondern **regulatorische Drift** – der „Tod durch 1000 Schnitte": steigende Normdichte (+17 % in 10 Jahren), Detailänderungen bei Steuer und Vorabpauschale, politische Eingriffe mit langer Wirkungsdauer.

**Szenario-Matrix (für Tooltips/Erklärungstext der App):**

| Szenario | Wahrscheinlichkeit | Schaden |
|---|---|---|
| Moderate Detailänderung (Vorabpauschale etc.) | 30–60 % über 20 J. | Niedrig bis mittel – lästig, nicht zerstörerisch |
| Steuerliche Verschlechterung | 10–30 % über 20 J. | Mittel bis hoch – wahrscheinlichster echter Schadenskanal |
| Starker politischer Eingriff (Vermögensabgabe) | 1–5 % | Hoch bis sehr hoch – Schwarzer-Schwan-nah |
| Systembruch / Rechtsunsicherheit | < 1 % | Existenzbedrohend – in D derzeit nicht plausibel |

**CTA:** „Ich halte es einfach und flexibel."

### Erweiterungsidee (V2 der App)

Schwarzer-Schwan-Szenario-Matrix interaktiv einbauen: User klickt Szenario an → App zeigt Auswirkung auf Endvermögen. Macht den Unterschied zwischen „lästig" und „zerstörerisch" erlebbar.

---

## G2 – Rendite-Kalibrierung („Ist die ETF-Ära vorbei?")

**Slug:** `rendite-kalibrierung`
**KI-Konsens:** ★★ (Perplexity, ChatGPT)
**Folienbezug:** Übergreifend (fortgeschrittene Systemkritik)
**Funnel-Position:** Systemkritische Einwände
**Priorität:** #7

### Problem, das gelöst wird

Informierte Leser kennen die akademischen Argumente: Passive Fonds verzerren Preise, CAPE-Bewertungen implizieren niedrigere künftige Renditen, Mega-Firm-Konzentration nimmt zu. Diese App nimmt den Einwand ernst – und löst ihn durch Vergleich statt Verteidigung.

**Der Schlüssel:** Nicht das Problem leugnen, sondern das Paradox auflösen: *„Die Marktrendite ist nicht mehr das, was sie war – aber Alternativen haben sich nicht verbessert."*

### Kernbotschaft

> „Auch wenn ETFs künftig nur 4 % statt 7 % liefern – die Alternative liefert weniger."

### Microcopy (ChatGPT)

- Einstieg: „Du denkst jetzt vielleicht: Was, wenn ETFs gar nicht mehr funktionieren?"
- Headline: „Was, wenn ETFs schlechter werden?"
- Subline: „Dann schauen wir uns die Alternativen an."
- Ergebnis: „Selbst wenn ETFs schlechter werden: Die Alternativen werden nicht besser."
- Punchline: „Das Problem ist nicht der ETF. Das Problem ist der Markt."
- CTA: „Dann nehme ich die Marktrendite."

### Interaktion (UX-Flow, 3 Screens)

**Screen 1 – Realitäts-Check:**
Slider „Erwartete Jahresrendite" (3 %–9 %), darunter historischer Kontext:
- „Historisch: ~7 % real"
- „Aktuelle Bewertungsniveaus (CAPE) implizieren: eher 4–5 %"

Keine Schwarzmalerei – nur ehrliche Kalibrierung.

**Screen 2 – Was bleibt übrig (3 Szenarien):**

| Szenario | Annahme | Endvermögen (200 €/30 J.) | Eingezahlt |
|---|---|---|---|
| Optimistisch | 7 % | ~230.000 € | 72.000 € |
| Realistisch | 4,5 % | ~150.000 € | 72.000 € |
| Pessimistisch | 3 % | ~116.000 € | 72.000 € |

**Killer-Element:** Auch im Pessimismus-Szenario: +61 % über dem eingezahlten Kapital.

**Screen 3 – Der Vergleich (Alternativencheck):**

Vier Balken nebeneinander:

| Anlageform | Annahme | Endvermögen |
|---|---|---|
| ETF (realistisch) | 4,5 % | 150.000 € |
| Aktiver Fonds | ~3 % (nach Kosten) | 116.000 € |
| Festgeld | 2,5 % | 96.000 € |
| Sparbuch | 0,5 % | 80.000 € |

Punchline: „Die Marktrendite könnte kleiner werden. Deine Alternativen auch."

**CTA:** „Trotzdem starten – mit realistischen Erwartungen"

### Implementierungshinweise

- Reine JS-Berechnung, kein Backend
- Slider-Interaktion aktualisiert alle 3 Szenarien + Vergleichsbalken live
- Chart.js für Balkendiagramm Screen 3

---

## G3 – Das Passiv-Paradox (Ergänzungs-App)

**Slug:** `etf-aera-vorbei`
**KI-Konsens:** ★ (Perplexity)
**Folienbezug:** Übergreifend (akademische Systemkritik)
**Funnel-Position:** Systemkritische Einwände (unter G2 einbettbar)
**Priorität:** #14

### Problem, das gelöst wird

Der bildungsorientierteste Einwand: Wenn alle passiv investieren, werden Märkte ineffizient. Aktive Anleger könnten das ausnutzen. Warum dann trotzdem passiv?

### Kernbotschaft

> „Das Paradox ist real. Ändert aber nichts an deiner Entscheidung."

### Konzept

Zwei-Lager-Slider (0–70 % passive Anleger im Markt):

- **Bei niedrigem Passiv-Anteil:** EMH gilt weitgehend, aktive Anleger können nicht systematisch outperformen.
- **Bei hohem Passiv-Anteil (~53 %, aktueller US-Stand):** Märkte werden ineffizienter, Volatilität steigt – aber aktive Anleger können immer noch nicht outperformen (zu riskant, karrieregefährdend, Index-Schmusen ist rational).

**Aha-Moment:** Das Paradox führt in eine Sackgasse, aus der es keinen Ausweg gibt – außer den eigenen Weg zu gehen: breit, günstig, langfristig.

### Implementierungshinweise

Eher als **interaktiver Erklärungstext** (Accordion/Aufklappbereich) unter G2 denn als vollständige eigene App. Implementierungsaufwand gering.

---

---

# Block H: Finale & CTA

---

## H1 – Plan-Generator

**Slug:** `plan-generator`
**Früherer Arbeitstitel:** ETF-Reifegrad-Test & Start-Konfigurator
**KI-Konsens:** ★ (ChatGPT Meta-Idee)
**Folienbezug:** Gesamtpräsentation (Finale)
**Funnel-Position:** CTA / Abschluss des Funnels
**Priorität:** #18

### Aufbau: Zwei Stufen

**Stufe 1 – ETF-Reifegrad-Test (5 Fragen):**
1. Weißt du, wie viel Verlust du ertragen kannst? (→ App A1)
2. Glaubst du noch, dass du den richtigen Zeitpunkt erwischen kannst? (→ App B3)
3. Hast du verstanden, warum 1 ETF reichen kann? (→ App C2)
4. Kannst du einen ETF-Namen lesen? (→ App D1)
5. Hast du einen konkreten Betrag im Kopf?

Ergebnis:
- „Du bist bereit." → direkt zu Stufe 2
- „Du blockierst dich selbst." → personalisierte App-Empfehlung + zurück in den Funnel

**Stufe 2 – Start-Konfigurator (3 Fragen):**
1. Monatlicher Betrag
2. Verlusttoleranz (Slider, aus App A1 vorausgefüllt wenn vorhanden)
3. Einfach (1 ETF) vs. Komplex (2–4 ETFs)

**Output – ultraklar:**
> „Investiere 100 € monatlich in einen FTSE All World ETF. Fertig."

**CTA:** „Jetzt umsetzen"

---

---

# Technische Rahmenbedingungen

## Technologie-Stack

- **Technologie:** Vanilla JS + SVG/Canvas für einfache Apps; Chart.js oder D3.js für Diagramme
- **Kein Backend:** Alle Daten statisch (historische Renditen als JSON, Indexzusammensetzungen hardcoded)
- **Einbettung:** Als `<iframe>` oder direkte `<script>`-Einbindung (Ghost HTML Block / Theme)
- **Responsive:** Touch-Slider für Mobile (375 px first)
- **Sprache:** Deutsch, Du-Form

## Datenquellen

| Datentyp | Quelle | Format |
|---|---|---|
| MSCI World historische Renditen | MSCI.com (öffentlich) | JSON |
| ETF-Zusammensetzungen (Top-10) | Statisch aus Seminar-Daten | JSON |
| Ankerliste Konsumgüter | Seminar Slide 118 | Hardcoded |
| Crash-Szenarien (2000, 2008, 2020) | MSCI World historisch | JSON |
| TER-Vergleichsdaten | Seminar Slides 154–155 | Hardcoded |
| CAPE-Bewertungsniveaus | Shiller-CAPE (öffentlich) | Hardcoded |
| Regulatorik-Szenarien | Artikel 7 (eigene Analyse) | Hardcoded |

## Einbettungs-Standard (jede App)

Jede App muss:
1. Als eigenständige HTML-Datei entwickelbar sein
2. Über `<iframe>` oder `<script src="">` einbettbar sein
3. Einen klaren Titel und eine Kernbotschaft als Untertitel haben
4. Mobile-First (375 px) designed sein
5. Einen CTA-Button am Ende haben
6. **Doppelt funktionieren:** Als Funnel-Station UND als standalone Embed

---
# Entwicklungs-Reihenfolge (Empfehlung)

## Phase 1 – Sofort bauen (hoher Konsens, hoher Hebel, geringer Aufwand)

| App | Slug | Warum jetzt |
|---|---|---|
| A1 Risiko-Übersetzer | `risiko-uebersetzer` | Höchster emotionaler Hebel, 4/4 KI-Konsens, geringer Aufwand |
| D1 ETF-Namensdecoder | `etf-namensdecoder` | Niedrigste Einstiegshürde beseitigt, geringer Aufwand |
| B1 Marktzeit schlägt Timing | `prokrastinations-preis` | Geringer Aufwand, starke Botschaft |

## Phase 2 – Kernapps (mittlerer Aufwand, sehr hohe Wirkung)

| App | Slug | Warum danach |
|---|---|---|
| B2 Geburtsjahrlos | `geburtsjahrlos` | 4/4 Konsens, sehr hohe Wirkung, braucht historische Daten |
| A2 Crash-Reaktions-Test | `crash-reaktions-test` | Höchste psychologische Wirkung, braucht Animationslogik |
| G2 Rendite-Kalibrierung | `rendite-kalibrierung` | Block G schließt den Funnel, mittlerer Aufwand |

## Phase 3 – Komplex / Niedrigerer ROI

| App | Slug |
|---|---|
| C1 Diversifikations-Detektor | `diversifikations-detektor` |
| C2 Komplexitätsentlarver | `komplexitaets-entlarver` |
| D3 TER-Rechner | `kostenkiller-ter` |
| E1 ESG-Spiegel | `esg-spiegel` |
| G3 Passiv-Paradox | `etf-aera-vorbei` |

## Phase 3b – Mechanismus-Kette (nach Phase 3, vor Abschluss)

| App | Slug | Warum |
|---|---|---|
| B4 Der alte Euro | `der-alte-euro` | Geringer Aufwand, schließt Marktzeit-Block nach B1–B3 |
| B5 Depot-Kipppunkt | `depot-kipppunkt` | Geringer Aufwand, motivierender Übergang zu A1/H1 |

## Phase 4 – Abschluss & Feinschliff

| App | Slug |
|---|---|
| H1 Plan-Generator | `plan-generator` |
| F1 Renditekiller | `renditekiller-volatilitaet` |
| C3 Weltdepot-Baukasten | `weltdepot-baukasten` |
| D2 Replizierer/Swapper | `replizierer-swapper` |
| F2 Thesaurierer/Ausschütter | `thesaurierer-rennen` |
| B3 Market-Timing-Simulator | `market-timing-simulator` |

---

# Änderungsprotokoll

| Version | Datum | Änderungen |
|---|---|---|
| 1.0 | 28.04.2026 | Initiales Hauptdokument aus 4 KI-Quellen (15 Apps, Blöcke A–H) |
| 2.0 | 28.04.2026 | + Block G (Systemkritische Einwände) mit G1 (✅ bereits gebaut), G2 (Rendite-Kalibrierung), G3 (Passiv-Paradox). Funnel-Architektur aktualisiert. Entwicklungs-Reihenfolge hinzugefügt. Master-Prioritätsliste auf 18 Apps erweitert. |
| 3.0 | 2026-05-18 | + A3 „Der Markt kam zurück. Du nicht." als Ausstiegsfolgen-App. Block A zur Durchhalte-Kette umgerahmt (A1 Dosis finden → A2 Feuerprobe → A3 Ausstiegsfolge). Funnel-Struktur aktualisiert ([A/F] aufgelöst, [F] MECHANISMEN eigenständig). Master-Prioritätsliste auf 19 Apps erweitert. |
| 4.0 | 2026-05-18 | B1 von Verlustzähler zu Marktzeit-App umgerahmt (neu: „Marktzeit schlägt Timing / Lieber heute als morgen", MSCI-World-Monatsdaten, 4-Screen-Flow). B2 bereinigt: Kindersparplan, vor-10-Jahren-Motiv und Warte-Button entfernt, Fokus auf rollierende 30-Jahres-Zeiträume mit inflationsbereinigten Realwerten. + F3 „Der alte Euro" (Mechanik-Mini-App, Slug: der-alte-euro). + F4 „Depot-Kipppunkt" (Statuswechsel-App, Slug: depot-kipppunkt). Rollenformel verankert: B1→B2→Der alte Euro→Depot-Kipppunkt. 1-Million-App verworfen. Master-Prioritätsliste auf 21 Apps erweitert. |
| 5.0 | 2026-05-18 | Block B umbenannt zu „Marktzeit statt Timing". F3 „Der alte Euro" → B4, F4 „Depot-Kipppunkt" → B5; beide aus Block F in Block B verschoben. Block-B-Intro-Text und dramaturgische Rollenformel ergänzt. Funnel-Diagramm, Master-Prioritätsliste, Entwicklungsreihenfolge und alle Funnel-Positionen in B1–B3 aktualisiert. Block F enthält jetzt nur noch F1/F2. B1-APP_SPEC.md, SLICE_0_KICKOFF.md und SLICE_PLAN.md mit VERALTET-Header versehen (alte Mechanik, kein Code ohne neue APP_SPEC). MINI_SPECs aller betroffenen Apps konsistent aktualisiert. |
| 6.0 | 2026-05-19 | + D4 ETF-Vergleich / ETF-Feinschliff-Entgifter (`etf-vergleich`). Exit-Gate aus Block D. Funnel-Diagramm D/E-Zeile ergänzt. D4-Abschnitt nach D3 eingefügt. Master-Prioritätsliste auf 22 Apps erweitert. E1 ESG bleibt Spezialpfad, keine Pflichtstation. |
| 6.1 | 2026-06-25 | Slug-Drift nach Ordner-Umbenennungen bereinigt: H1 `etf-reifegrad-finale` → `plan-generator`; G3 `passiv-paradox` → `etf-aera-vorbei`. Kanonische Titel und Metadaten in H1-Abschnitt, Master-Prioritätsliste, Phase-3- und Phase-4-Tabelle nachgezogen. |

