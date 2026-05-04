---
tags:
  - etf-rechner
  - ux
  - iteration-2
  - coding-brief
angelegt: 2026-05-01
Ziel: Konsolidiertes Design-Brief für Coding-LLM (Iteration 2)
Quellen: ChatGPT, Perplexity, Gemini (alle auf Iteration 1)
zuletzt verändert am: 2026-05-01T09:40:45+02:00
Angelegt am: 2026-05-01T09:39:47+02:00
---
---
up: [[Apps MOC]]
# UX-Synthese: ETF-Wahlurnen-Rechner — Brief für Iteration 2

> **Leseanleitung für das Coding-LLM:** Dieses Dokument ist kein Protokoll, sondern ein priorisiertes Arbeitspaket. Die Gewichtung basiert auf Konsens-Stärke und strategischem Hebel. Wo nur ein LLM einen Punkt gefunden hat, ist das kein Zeichen von Irrelevanz — oft sind das die schärfsten Beobachtungen.

---

## Zusammenfassung (Executive Brief)

Die drei LLMs sind sich in einem Punkt vollkommen einig: **Das konzeptionelle Fundament ist stark** — der Kassenbon-Einstieg, die Vier-Szenarien-Logik, die didaktische Grundstruktur. Diese Stärken sind nicht zu verändern, sondern zu schützen.

Beim Rest lassen sich drei Konsens-Cluster identifizieren:

1. **Chart-Kritik (3/3):** Der Chart erklärt zu wenig, obwohl er viel zeigt. Die Renteneintritts-Trennlinie ist vorbereitet, aber nicht aktiv. Die vier Linien sind gleichgewichtig, obwohl eine Linie (S1, Status quo) die Referenz sein sollte.
2. **Responsivität (3/3):** 4K-Layout ist ein schmaler Streifen. Mobile-Reihenfolge ist suboptimal. Das Zwei-Spalten-Layout für breite Screens fehlt vollständig.
3. **Modus A/B-Naming (3/3):** Die Bezeichnungen sind technische Platzhalter, kein nutzergerechtes Vokabular.

Dazu kommen drei **Minderheitsmeinungen mit hohem Hebel**, die nur ein LLM gefunden hat, aber zu wichtig sind um sie zu ignorieren:

- **ChatGPT:** Das Vertrauensrisiko durch politisches Framing — die App wirkt aktivistisch. Das ist die strategisch gefährlichste Schwäche.
- **ChatGPT:** Ergebnis-Presets für typische Nutzerprofile (Berufseinsteiger, Familie, Spätstarter).
- **Gemini:** Dynamischer Kassenbon — wenn die Simulation läuft, sollte der Kassenbon oben mitscrollen.

---

## 1 · Stärken (nicht anfassen)

Alle drei LLMs nennen diese Elemente explizit als schützenswert:

- **„Kassenbon"** als Einstiegs-Metapher: Jeder kennt einen Bon. Sofort verständlich, psychologisch präzise (Loss Aversion aktiv).
- **Vier Szenarien, eine Ansicht:** Kein Tab-Switching, kein Modal — Vergleich ist direkt sichtbar.
- **Headline-Block formuliert die Kernaussage als Satz:** Nutzer muss das Ergebnis nicht aus dem Chart herauslesen.
- **Szenario-Karten mit farbigen Rändern** als aktiver Zustand: Funktionieren intuitiv als Radiobuttons.
- **Satoshi-Font:** Nicht overexposed, klar, finanzaffin (Perplexity explizit; implizit von den anderen bestätigt).
- **Offene Modell-Annahmen** (7 % Bruttorendite, TER, Steuer etc.): Modellgrenzen sind sichtbar — das ist Stärke, nicht Schwäche.
- **Debounce auf Slider:** Verhindert Rechenüberlastung, reagiert flüssig.

---

## 2 · Konsens-Probleme (alle 3 LLMs)

### 2.1 · Chart zeigt zu viel, erklärt zu wenig

**Quelle: ChatGPT (P2), Perplexity (T2, T4), Gemini (B)**

Alle drei LLMs kritisieren, dass der Chart zu wenig Orientierung gibt. Konkrete Befunde:

- Die vertikale Trennlinie Anspar→Entsparphase ist im Code vorbereitet (`splitX`), aber das `chartjs-plugin-annotation` ist nicht aktiv eingebunden.
- Alle vier Linien sind visuell gleichgewichtig — S1 (Deutschland heute) sollte als Referenzlinie klar dominieren.
- Die Y-Achse beginnt nicht bei 0, ohne Hinweis für Laien (Perplexity).
- Die Legende zwingt den Blick zum Hin- und Herspringen zwischen Farbe und Kurve (Gemini: direkte Beschriftung der Linienendpunkte vorschlagen).

**→ Umsetzungsanweisungen für Iteration 2:**

```
1. chartjs-plugin-annotation via CDN einbinden
2. Vertikale Trennlinie bei splitX mit Label „Renteneintritt" aktivieren
3. S1 als Referenzlinie: volle Opazität + größere Strichstärke
   Andere Szenarien: reduzierte Opazität (0.35), beim Hover/Klick auf Karte aufhellen
4. Direktes End-Label an Linienende (Rechts, letzter Datenpunkt) statt nur Legende
5. Fußnote unter Chart: „Achse beginnt nicht bei 0" — oder min: 0 erzwingen
6. Differenz-Block ÜBER dem Chart (ChatGPT-Vorschlag):
   „Gegenüber S1 (Deutschland heute):
    S0 (vor 2009): +X €/Mo | S2: −Y €/Mo | S3: −Z €/Mo"
```

---

### 2.2 · Responsivität: 4K-Layout fehlt, Mobile-Reihenfolge suboptimal

**Quelle: ChatGPT (Kap. 6), Perplexity (Breakpoint-Tabelle), Gemini (C, Code-Snippet)**

Alle drei LLMs identifizieren `max-width: 780px` als Problem bei breiten Screens. Konsens-Lösung: Zwei-Spalten-Layout ab ca. 1100–1200 px:

```
Links (1/3):  Controls + Szenario-Karten (sticky)
Rechts (2/3): Chart + Ergebnis-Block
```

Gemini liefert ein konkretes HTML-Grundgerüst (Tailwind-Logik):

```html
<div class="max-w-screen-2xl mx-auto px-4 py-8">
  <div class="flex flex-col lg:flex-row gap-8">
    <aside class="lg:w-1/3 space-y-6 lg:sticky lg:top-8 self-start">
      <!-- Controls, Slider, Szenario-Karten -->
    </aside>
    <main class="lg:w-2/3 space-y-6">
      <!-- Ergebnis-Block, Chart, Szenario-Differenz-Tabelle -->
    </main>
  </div>
</div>
```

**Mobile-Reihenfolge** (ChatGPT-Prioritäts-Empfehlung, von Perplexity bestätigt):

```
1. Ergebnis-Karte (dominant)
2. Szenario-Vergleich / Differenz-Tabelle
3. Wichtigste Slider (Sparrate, Laufzeit)
4. Chart (nachrangig auf Mobile)
5. Details / Disclaimer
```

**Breakpoint-Detail (Perplexity-Tabelle):**

| Breakpoint | Problem | Fix |
|---|---|---|
| 375 px | `.er-bon` läuft über Viewport | `max-width: 100%` |
| < 480 px | 4 Karten gestacked = viel Scroll | 2×2-Grid, Icons weglassen |
| 768 px | Chart `height: 270px` zu flach | `height: 340px` auf Tablet |
| > 1200 px | App wirkt als schmaler Streifen | Zwei-Spalten-Grid |

---

### 2.3 · Modus A/B — Naming ist technisch, nicht nutzergerecht

**Quelle: ChatGPT (P4), Perplexity (Kap. 7), Gemini (A)**

Alle drei LLMs kritisieren die Bezeichnungen. Drei Vorschläge im Vergleich:

| LLM | Modus A | Modus B |
|---|---|---|
| ChatGPT | „Wie lange reicht mein Depot?" | „Was kann ich monatlich entnehmen?" |
| Gemini | „Kapitalverzehr prüfen" | „Entnahmehöhe festlegen" |
| Perplexity | (Wording-Tabelle im Kontext) | (gleiche Richtung) |

**→ Empfehlung:** ChatGPT-Formulierung ist für Finanzlaien am direktesten. Gemini ist prägnanter. Kombination:

```
Modus A: „Wie lange reicht es?" (Untertitel: Kapitalverzehr prüfen)
Modus B: „Was bekomme ich raus?" (Untertitel: Entnahmehöhe berechnen)
```

Beim Modus-Wechsel: `opacity`-Transition 200 ms auf den Kartenzahlen (Perplexity F2-Fix), damit der Wechsel der Bedeutung visuell kommuniziert wird.

---

## 3 · Technische Quick-Wins (Konsens, geringer Aufwand)

### 3.1 · Accessibility — WCAG 2.1 AA (Perplexity: F3, F6, F7)

Alle drei LLMs erwähnen Accessibility-Defizite, Perplexity ist am konkretesten:

```css
/* Fokus-Indikatoren global */
:focus-visible {
  outline: 2px solid var(--teal);
  outline-offset: 3px;
  border-radius: var(--r-sm);
}

/* Slider Touch-Target auf 44px */
input[type=range].er-sl {
  padding-block: 11px;
}
```

```html
<!-- Slider ARIA -->
<input type="range" id="sl-sparrate"
  aria-label="Monatliche Sparrate"
  aria-valuetext="200 Euro pro Monat" ...>

<!-- Chart ARIA-Fallback -->
<canvas id="er-chart"
  role="img"
  aria-label="Depotverlauf unter vier Steuerszenarien">
</canvas>
```

### 3.2 · S3-Panel Animation (Perplexity: F5)

`display: none` ↔ `display: flex` ist ein harter Schnitt. Fix mit `max-height`-Transition:

```css
.er-s3 {
  overflow: hidden;
  max-height: 0;
  transition: max-height 250ms ease, opacity 200ms ease;
  opacity: 0;
}
.er-s3.is-on {
  max-height: 300px;
  opacity: 1;
}
/* display:none aus dem JS entfernen */
```

### 3.3 · Disclaimer-Chips über dem Chart (Perplexity: P4)

Das `<details>`-Accordion unten wird nicht aufgeklappt. Stattdessen drei Chips direkt unter dem Chart:

```html
<div class="er-disclaimer-chips">
  <span class="chip">Nominalrendite</span>
  <span class="chip">Steuer vereinfacht</span>
  <span class="chip">Ohne Inflation</span>
</div>
```

Das Accordion bleibt für die vollständige Methodik erhalten.

### 3.4 · Dark Mode (Konsens: alle 3)

Die CSS Custom Properties sind bereits strukturiert — die Basis liegt vor. Fix ist ein ~30-Zeilen-Zusatz:

```css
[data-theme="dark"] {
  --bg: #171614;
  --surface: #1c1b19;
  /* ... alle Surface-Tokens invertieren */
}
```

Plus Moon/Sun-Toggle oben rechts mit `data-theme="dark"` auf `<html>`.

---

## 4 · Minderheitsmeinungen mit hohem Hebel

> Diese Punkte hat nur **ein** LLM gefunden. Das macht sie nicht weniger wertvoll — im Gegenteil. Sie zeigen, dass das jeweilige LLM tiefer in eine Dimension eingetaucht ist.

### 4.1 · Vertrauens-Risiko durch politisches Framing ⚠️ [nur ChatGPT]

**Das ist die strategisch wichtigste Einzelbeobachtung des gesamten Feedbacks.**

ChatGPT identifiziert ein Vertrauensrisiko, das die anderen LLMs übersehen haben: Die App erzeugt zuerst Empörung (Kassenbon → Staat nimmt viel), dann Komplexität (Simulation). Für intelligente Laien kann das zwei Reaktionen auslösen:

1. „Interessant, aber ich verstehe es nicht ganz."
2. „Das ist politisch geframt — vielleicht manipulativ."

Konkret kritisiert ChatGPT:
- „Die Rendite wird letztlich an der Wahlurne entschieden" wirkt aktivistisch.
- „Der Staat holt sich 2,8× mehr als alle Produktkosten zusammen" klingt wie eine universelle Wahrheit, ist aber ein Modell-Ergebnis.

**→ Empfehlungen:**

```
Aktuell:
„Die Rendite wird letztlich an der Wahlurne entschieden"

Besser:
„Steuerregeln können über Jahrzehnte ähnlich stark wirken wie
 Produktkosten — und sie werden politisch entschieden."

Aktuell:
„Der Staat holt sich 2,8× mehr als alle Produktkosten zusammen"

Besser (mit Kontext-Clip):
„Der Staat holt sich 2,8× mehr als alle Produktkosten zusammen
 — in diesem vereinfachten 30-Jahre-Modell."
```

Außerdem empfiehlt ChatGPT eine explizite Dreiteilung im UI-Text:

```
Fakt:           Steuern beeinflussen die Nachsteuerrendite.
Modell:         Wir vergleichen vier vereinfachte Regime.
Interpretation: Steuerpolitik ist ein langfristiger Renditehebel.
```

Diese Transparenz schafft Vertrauen, ohne den politischen Punkt abzuschwächen.

---

### 4.2 · Nutzer-Presets für typische Profile [nur ChatGPT]

ChatGPT ist das einzige LLM, das eine **Reset + Presets**-Funktion vorschlägt:

```
Button: „Standardannahmen wiederherstellen"

Presets:
  „Berufseinsteiger" → 100 €/Mo, 40 Jahre
  „Familie"          → 250 €/Mo, 30 Jahre
  „Spätstarter"      → 500 €/Mo, 15 Jahre
```

Das reduziert kognitive Last massiv, weil Laien beim Ausprobieren den Referenzpunkt verlieren. **Bewertung: Sehr guter Vorschlag mit hohem UX-Hebel.**

---

### 4.3 · Dynamischer Kassenbon [nur Gemini]

Gemini schlägt vor, den Kassenbon live mit der Simulation zu verknüpfen:

> „Wenn Nutzer in der Simulation die Sparrate ändern, sollte der Kassenbon oben mitlaufen: ‚Deine voraussichtliche Steuerlast: X.XXX €'"

Das würde die narrative Klammer zwischen Block 1 (Kassenbon) und Block 2 (Simulation) schließen — beide LLMs haben diesen Bruch kritisiert, aber nur Gemini hat die eleganteste Lösung genannt.

**Umsetzungs-Skizze:**

```js
// Im update()-Callback:
const bonDynamic = document.querySelector('.er-bon-dynamic');
if (bonDynamic) {
  bonDynamic.textContent = formatEuro(steuerLastNachLaufzeit);
}
```

Der statische Kassenbon (1 €-Beispiel) bleibt als didaktischer Einstieg erhalten. Darunter erscheint ein zweiter Bon-Block: „Für deinen Plan: …"

---

### 4.4 · Slider + Input-Feld Kombination [nur Gemini]

Gemini ist das einzige LLM, das neben den Slidern auch direkte **Eingabefelder für Zahlen** fordert:

> „Intelligente Laien wollen oft exakte Zahlen tippen."

```html
<div class="slider-row">
  <input type="range" id="sl-sparrate" min="50" max="1000" step="25" value="200">
  <input type="number" id="in-sparrate" min="50" max="1000" step="25" value="200"
    aria-label="Sparrate in Euro">
</div>
```

```js
slSparrate.addEventListener('input', () => {
  inSparrate.value = slSparrate.value;
  update();
});
inSparrate.addEventListener('input', () => {
  slSparrate.value = inSparrate.value;
  update();
});
```

**Bewertung: Stärkt das „Power-User"-Segment ohne das Laien-UX zu verschlechtern.**

---

### 4.5 · Chart: Filled Areas für Vermögensmasse [nur Gemini]

Gemini schlägt `fill: true` mit geringer Opazität unter den Linien vor, um die „Masse" des Vermögens visuell zu kommunizieren.

```js
// In Chart.js dataset config:
{
  label: 'S1 – Deutschland heute',
  data: [...],
  fill: 'origin',
  backgroundColor: 'rgba(var(--teal-rgb), 0.08)',
  borderColor: 'var(--teal)',
  borderWidth: 2.5
}
```

**Bewertung: Tufte würde das als „Chartjunk" ablehnen — aber für Finanzlaien macht die Fläche intuitiv klar, dass es sich um akkumuliertes Vermögen handelt, nicht um einen Preis-Index. Kontextabhängig: Opazität ≤ 0.10 einhalten.**

---

### 4.6 · Farb-Semantik für Warn-Szenarien [nur Gemini]

Gemini ist das einzige LLM, das eine explizite **Farb-Semantik** nach Szenario-Typ vorschlägt:

```
S0 (vor 2009, steuerfrei):     Grün     → positiv, historisch besser
S1 (Deutschland heute):        Blau/Neutral → Referenz
S2 (Vergünstigungen weg):      Bernstein    → Warnung
S3 (Einkommensteuer 42 %):     Rot          → Gefahr
```

**Bewertung: Konsequent und intuitiv. Schafft sofortiges Verständnis ohne Legende. Vorsicht: Rotgrün-Schwäche bei ~8 % der Männer — Bernstein statt Rot/Grün als Warnstufe verwenden, oder Linienmuster (gestrichelt) als zweiten Kanal.**

---

## 5 · Kontext-Brücke Kassenbon → Simulation

Alle drei LLMs kritisieren denselben Bruch, schlagen aber unterschiedliche Lösungen vor:

| LLM | Lösung |
|---|---|
| ChatGPT | Drei-Schritt-Dramaturgie (Aha → Persönlich → Politisch) |
| Perplexity | Eine Kontext-Zeile am Simulations-Header |
| Gemini | Kassenbon erbt visuelles Element aus Block 1 (Visual Cue) |

**Empfehlung — Kombination:** Die Kontext-Zeile (Perplexity) ist der kleinste Eingriff mit dem größten Krug-konformen Effekt:

```
[Simulations-Header]
"Oben haben wir gesehen, was Regulierung mit einem einzelnen Euro macht —
 hier siehst du, was das über [Laufzeit] Jahre Sparplan bedeutet."
```

---

## 6 · Inhaltliche Gefahr (ChatGPT exklusiv)

ChatGPT weist auf einen Satz hin, der sachlich zu absolut ist:

> „Wer lange genug und diversifiziert genug spart, dem sind Marktschwankungen egal"

Das Sequence-of-Returns-Risiko ist in der Entnahmephase relevant — und die App sagt selbst, dass es nicht modelliert wird. Das Vertrauen wird untergraben, wenn die App etwas behauptet, das sie gleichzeitig ausschließt.

**Fix:**
```
Aktuell:
„Wer lange genug und diversifiziert genug spart, dem sind
 Marktschwankungen egal"

Besser:
„Wer lange genug und breit diversifiziert spart, reduziert
 die Bedeutung kurzfristiger Marktschwankungen erheblich.
 In der Entnahmephase bleiben Timing, Inflation und
 Steuerregeln trotzdem wichtig."
```

---

## 7 · Priorisierte Maßnahmenliste für Iteration 2

Legende: 🔴 Muss | 🟡 Sollte | 🟢 Kann

| # | Maßnahme | Konsens | Aufwand | Prio |
|---|---|---|---|---|
| 1 | Annotation-Plugin + Trennlinie „Renteneintritt" aktivieren | 3/3 | gering | 🔴 |
| 2 | Kontext-Brücke Kassenbon → Simulation (Textzeile) | 3/3 | minimal | 🔴 |
| 3 | Modus A/B umbenennen in nutzergerechte Sprache | 3/3 | minimal | 🔴 |
| 4 | Touch-Target Slider auf 44px + `:focus-visible` global | 2/3 | gering | 🔴 |
| 5 | ARIA-Labels auf Slider + Canvas | 1/3 | minimal | 🔴 |
| 6 | Zwei-Spalten-Layout ab 1100 px (Controls links, Chart rechts) | 3/3 | mittel | 🔴 |
| 7 | Mobile-Reihenfolge: Ergebnis-Block vor Chart | 2/3 | mittel | 🔴 |
| 8 | S1 als Referenzlinie hervorheben, andere blasser | 2/3 | gering | 🟡 |
| 9 | Differenz-Block über Chart (± €/Mo pro Szenario) | 1/3 | mittel | 🟡 |
| 10 | Disclaimer-Chips unter Chart (statt nur Accordion) | 1/3 | gering | 🟡 |
| 11 | S3-Panel mit max-height-Transition statt display:none | 1/3 | gering | 🟡 |
| 12 | Farb-Semantik Szenarien (Grün/Blau/Bernstein/Rot) | 1/3 | gering | 🟡 |
| 13 | Vertrauens-Framing: politische Claims präziser formulieren | 1/3 | minimal | 🟡 |
| 14 | Y-Achsen-Hinweis „Achse beginnt nicht bei 0" | 1/3 | minimal | 🟡 |
| 15 | Nutzer-Presets (Berufseinsteiger / Familie / Spätstarter) | 1/3 | mittel | 🟡 |
| 16 | Dark Mode (`[data-theme="dark"]` + Toggle) | 3/3 | mittel | 🟡 |
| 17 | Slider + Zahlen-Inputfeld Kombination | 1/3 | gering | 🟢 |
| 18 | Dynamischer Kassenbon (läuft mit Simulation mit) | 1/3 | hoch | 🟢 |
| 19 | Chart: Filled Areas unter Linien (opacity ≤ 0.10) | 1/3 | gering | 🟢 |
| 20 | Direkte Beschriftung Linienendpunkte statt nur Legende | 1/3 | mittel | 🟢 |
| 21 | Delta-Indikator auf Karten-Zahlen nach Slider-Änderung | 1/3 | mittel | 🟢 |
| 22 | Chart-Höhe: 340px auf Tablet, 500px auf Desktop | 2/3 | minimal | 🟢 |

---

## 8 · Kernbotschaft für die neue Iteration

ChatGPT hat als einziges LLM eine verdichtete Kernbotschaft formuliert, die den Balanceakt zwischen Klarheit und Glaubwürdigkeit löst:

> **„Nicht jede Rendite entsteht am Markt."**
> Bei langen ETF-Sparplänen entscheidet auch die Steuerregel darüber, wie viel monatliche Freiheit am Ende bleibt. Dieses Modell zeigt den Unterschied — vereinfacht, transparent und mit deinen eigenen Annahmen.

---

*Dokument erstellt: 2026-05-01 | Basis: Iteration 1 · Bewertungen von ChatGPT, Perplexity, Gemini*
