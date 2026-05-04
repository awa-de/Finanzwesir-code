# ETF-Wahlurnen-Rechner – UX-Analyse & Verbesserungen
*Bewertung nach Krug, Tufte und FAANG-Design-Kriterien · Iteration 1*

---

## Executive Summary

Die App hat ein starkes konzeptionelles Fundament: Der „Kassenbon"-Einstieg ist originell, die Vier-Szenarien-Logik didaktisch klar, und die Botschaft – Regulierung schlägt Marktrendite – wird glaubwürdig transportiert. Die erste Iteration zeigt jedoch klassische Muster einer entwicklergetriebenen Architektur: Die Informationsdichte ist am oberen Limit, die mentale Reiseroute des Nutzers ist nicht explizit gestaltet, und mehrere FAANG-Standards für reaktives Feedback sind noch nicht erfüllt.

---

## 1 · Krug-Analyse: „Don't Make Me Think"

Steve Krugs Kernfrage: *Kann der Nutzer jede Seite mit einem Blick erfassen, ohne nachdenken zu müssen?*

### Was funktioniert
- Der Headline-Block unterhalb der Szenarien-Karten formuliert die Kernaussage als Satz – das ist Krug-konform. Der Nutzer muss das Ergebnis nicht aus dem Chart herauslesen.
- Der „Kassenbon" ist ein starkes mentales Modell: Jeder kennt einen Bon. Die Analogie ist sofort verständlich.
- Die Szenarien-Karten mit farbigen Rändern als aktiver Zustand funktionieren intuitiv als Radiobuttons.

### Probleme & Befunde

**P1 · Kein sichtbarer Nutzerpfad (kein Progress-Signal)**
Die App besteht aus zwei Blöcken ohne Übergang: Kassenbon → Simulation. Der CTA-Button führt per `scrollIntoView()` zur Simulation, aber die Simulation erklärt sich nicht selbst. Ein Nutzer, der direkt zur Simulation springt, versteht die Grundaussage des Kassenbons nicht – die Reihenfolge ist für das Verständnis zwingend, aber nicht erzwungen.
> **Fix:** Eine kurze Kontextzeile am Simulations-Header: *„Oben haben wir gesehen, was Regulierung mit einem einzelnen Euro macht – hier siehst du, was das über 25 Jahre Sparplan bedeutet."*

**P2 · Zwei Interaktionsmodi (A/B) erfordern kognitiven Wechsel**
Modus A und Modus B zeigen unterschiedliche Metriken auf den Szenario-Karten (Jahre vs. Eurobetrag). Beim Umschalten ändert sich die Bedeutung der Zahlen ohne explizite Erklärung. Finanzlaien fragen sich: *Warum ändern sich die Zahlen oben?*
> **Fix:** Beim Modus-Wechsel eine Micro-Transition: Zahlen kurz aus- und einblenden (`opacity`-Übergang 200 ms) plus einen Tooltip-Text direkt neben dem Toggle: *„Wechselt, was berechnet wird"*.

**P3 · Slider ohne direktes Feedback zur Konsequenz**
Nutzer ziehen Slider, aber die Veränderung im Chart ist subtil. Die Karten-Werte aktualisieren sich, der semantische Zusammenhang „mehr Sparrate → Karte zeigt höhere Entnahme" wird nicht hergestellt.
> **Fix:** Delta-Indikator neben dem Kartenwert (z. B. `+12 €/Mo ↑` nach Slider-Änderung), 2–3 Sekunden sichtbar, dann fade out.

**P4 · Disclaimer ist unter dem Fold und wird ignoriert**
Das `<details>`-Element „Wie haben wir gerechnet?" liegt ganz unten. Für das Vertrauen der Zielgruppe (intelligente Laien, die Entscheidungen treffen wollen) ist Transparenz entscheidend – aber niemand klappt das Accordion auf.
> **Fix:** Drei ikonische Kurzhinweise direkt unter dem Chart: *„Nominalrendite · Steuer vereinfacht · Inflation nicht modelliert"* als kleine Chips. Das lädt zur Tiefe ein statt sie zu verstecken.

---

## 2 · Tufte-Analyse: Datenintegrität & Clarity

Edward Tuftes Kernfrage: *Zeigt die Visualisierung die Daten ehrlich – ohne Rauschen, ohne Verzerrung?*

### Was funktioniert
- Kein Chart-Junk: keine 3D-Effekte, keine unnötigen Gitterlinien. Das Line-Chart ist funktional sauber.
- `tabular-nums` für alle Währungswerte ist korrekt – Zahlenkolumnen fluchten.
- Vier Szenarien in einem Chart statt vier separaten Charts: Data-Ink-Ratio stimmt.

### Probleme & Befunde

**T1 · Y-Achse beginnt nicht bei Null – kein Hinweis**
Das Chart nutzt Chart.js mit Auto-Scaling. Je nach Parametern beginnt die Y-Achse bei einem Wert weit über 0. Das ist für vergleichende Linienverläufe korrekt – aber für Finanzlaien irreführend. Eine kleine Differenz wirkt wie ein dramatischer Einbruch.
> **Fix:** Entweder `min: 0` erzwingen oder einen Hinweis-Text: *„Achse beginnt nicht bei 0"* als Fußnote unter dem Chart.

**T2 · Trennlinie Ansparen/Entnehmen fehlt**
Der Code enthält eine Annotation für die vertikale Linie beim Übergang Anspar→Entspar, aber sie ist im vorliegenden Code nicht aktiv (`splitX` wird definiert, aber `chart.js` Annotation-Plugin wird nicht geladen). Diese Linie wäre entscheidend für das Verständnis: Wo hört der Aufbau auf, wo beginnt der Abbau?
> **Fix:** `chartjs-plugin-annotation` via CDN einbinden und die Trennlinie mit Label *„Renteneintritt"* aktivieren.

**T3 · Kassenbon: Absolute Zahlen ohne Kontext**
„6,05 € gehört dir" aus 1 Euro Einzahlung klingt nach einem Rechenfehler für Laien. Der Bruttomultiplikator (7,61 €) erscheint ohne Erklärung, warum das Finanzamt mehr nimmt als die TER.
> **Fix:** Einen kleinen Balken direkt im Bon (CSS-only, inline `<div style="width:X%">`) der die drei Blöcke (Kosten, Steuer, Gewinn) proportional visualisiert. Drei Farben, eine Zeile, null Erklärungstext nötig.

**T4 · Vier Szenarien-Karten: zu viele simultane Datenpunkte**
Finanzlaien sehen vier Karten mit vier Zahlen gleichzeitig. Das primäre Szenario (S1, Deutschland heute) ist nicht mehr hervorgehoben als die anderen. Der Nutzer muss aktiv vergleichen.
> **Fix:** S1 immer leicht erhöht dargestellt (größere Zahl, `--text-lg`), die anderen als Kontrast kleiner. Das ist nicht Manipulation – es ist Orientierung.

---

## 3 · FAANG-Design-Kriterien

FAANG-Standard bedeutet: jeder Zustand ist designed, Micro-Interactions sind vorhanden, Performance und Barrierefreiheit sind nicht optional.

### Was funktioniert
- Satoshi-Font ist eine gute Wahl: nicht overexposed, klar, finanzaffin.
- `easeInOutQuad` beim Chart-Update ist korrekt – Chart reagiert nicht ruckartig.
- Responsive Breakpoints bei 500 px (Grid-Collapse) sind gesetzt.
- Dark Mode fehlt, aber das CSS nutzt Custom Properties – die Basis für Dark Mode liegt bereits vor.

### Probleme & Befunde

**F1 · Kein Dark Mode**
Das gesamte Design läuft auf `#FAF8F5` als Background. Auf einem 4K-Monitor nachts oder auf einem AMOLED-Handy ist das maximal hell. Die Custom Properties sind bereits strukturiert – Dark Mode wäre ein 30-Zeilen-Zusatz.
> **Fix:** `[data-theme="dark"]` mit invertierten Surface-Werten + Moon/Sun-Toggle oben rechts.

**F2 · Slider: Touch-Targets auf Mobile zu klein**
Die Slider-Thumbs haben `width: 21px; height: 21px`. Apple HIG und Google Material Design fordern 44×44 px Touch-Target. Die Touch-Area kann mit `padding` ohne Größenänderung des sichtbaren Thumbs erweitert werden.
> **Fix:**
```css
input[type=range].er-sl {
  padding-block: 11px; /* Erweitert Touch-Target auf 44px Höhe */
}
```

**F3 · Keine Fokus-Indikatoren für Tastatur-Navigation**
`:focus-visible` ist global nicht definiert. Slider und Buttons haben keinen sichtbaren Fokus-Ring. Das ist ein WCAG 2.1 AA-Verstoß.
> **Fix:**
```css
:focus-visible {
  outline: 2px solid var(--teal);
  outline-offset: 3px;
  border-radius: var(--r-sm);
}
```

**F4 · Kein Loading/Berechnungs-Feedback**
`update()` wird mit 150 ms Debounce aufgerufen. Auf langsamen Mobilgeräten kann es einen Moment dauern. Es gibt keinen visuellen Indikator, dass eine Neuberechnung läuft. Das „Wird berechnet…"-Placeholder-Text aus dem DOM ist nach dem ersten Render weg.
> **Fix:** `requestAnimationFrame` + kurzes `aria-live="polite"` auf der Headline-Region, damit Screen Reader und Nutzer Änderungen registrieren.

**F5 · S3-Panel (Einkommensteuer) erscheint/verschwindet ohne Animation**
`display: none` ↔ `display: flex` ist ein harter Schnitt. Der Nutzer klickt auf „Einkommensteuer 42 %" und plötzlich erscheint ein rotes Panel. Das ist visuell überraschend.
> **Fix:** `max-height`-Animation:
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
/* display:none entfernen */
```

**F6 · Kein Aria-Label auf Slider**
```html
<input type="range" id="sl-sparrate" ...>
```
Kein `aria-label`, kein `aria-describedby`. Screen Reader liest „Slider, 200" ohne Kontext.
> **Fix:**
```html
<input type="range" id="sl-sparrate" aria-label="Monatliche Sparrate" aria-valuetext="200 Euro pro Monat" ...>
```

**F7 · Chart hat kein ARIA-Fallback**
`<canvas id="er-chart">` ist für Screen Reader ein leeres Element.
> **Fix:**
```html
<canvas id="er-chart" role="img" aria-label="Depotverlauf unter vier Steuerszenarien"></canvas>
```

---

## 4 · Responsivität – spezifische Befunde

| Breakpoint | Problem | Fix |
|---|---|---|
| **375 px (iPhone SE)** | Kassenbon `max-width: 460px` läuft über den Viewport | `max-width: 100%` auf `.er-bon` |
| **375 px** | Szenario-Karten: Grid bricht auf 1 Spalte bei 500 px, aber 4 Karten stacked = viel Scroll | Bei < 480 px: 2×2-Grid beibehalten, Icons weglassen |
| **768 px (Tablet)** | `max-width: 780px` auf `.etf-rechner` zentriert alles – funktioniert, aber Chart bleibt `height: 270px` fest | Auf Tablet `height: 340px` würde mehr Daten lesbar machen |
| **4K (2560 px+)** | Gesamte App wirkt wie ein schmaler Streifen in der Mitte; kein Zwei-Spalten-Layout für große Screens | Oberhalb 1200 px: Controls links, Chart rechts als `grid-template-columns: 1fr 2fr` |

---

## 5 · Priorisierte Verbesserungsliste

| # | Maßnahme | Aufwand | Hebel |
|---|---|---|---|
| 1 | Chartjs-Annotation-Plugin aktivieren + Trennlinie Renteneintritt | gering | hoch – löst Verständnislücke T2 |
| 2 | Touch-Target Slider + `:focus-visible` | gering | hoch – WCAG + Mobile-UX |
| 3 | S3-Panel mit `max-height`-Transition | gering | mittel – Polishing |
| 4 | Y-Achsen-Hinweis *„Achse beginnt nicht bei 0"* | minimal | hoch – Datenintegrität |
| 5 | Kontext-Brücke zwischen Kassenbon und Simulation (Textzeile) | minimal | hoch – Krug P1 |
| 6 | ARIA-Labels auf allen Slidern und Canvas | minimal | hoch – Accessibility |
| 7 | Dark Mode (Custom Properties sind ready) | mittel | mittel – 4K/AMOLED |
| 8 | Mini-Balkendiagramm im Kassenbon (CSS-only) | mittel | hoch – Tufte T3 |
| 9 | Delta-Indikator auf Karten-Zahlen nach Slider-Änderung | mittel | mittel – Krug P3 |
| 10 | 4K-Layout: Zwei-Spalten-Grid oberhalb 1200 px | mittel | mittel – 4K-Responsivität |

---

## 6 · Konzeptionelle Stärken (behalten!)

- **„Kassenbon"** als Einstiegs-Metapher: originell, präzise, zielgruppengerecht
- **Vier Szenarien, eine Ansicht**: kein Tab-Switching, kein Modal – der Vergleich ist sofort sichtbar
- **Satoshi-Font**: unüberladen, finanzaffin, wenig overexposed
- **Debounce auf Slider**: verhindert Rechenüberlastung, reagiert aber noch flüssig
- **Disclaimer als Accordion**: respektiert Wunsch nach Tiefe ohne Laien zu überwältigen – Platzierung ist das einzige Problem (→ Prio 4)
- **Monat/Jahre-Toggle (Modus A/B)**: gibt Nutzern zwei Denkmuster, beide valide

---

## 7 · Formulierungshinweis für die Zielgruppe

Die App spricht Finanzlaien an, die „intelligent sind, aber fertig werden wollen". Das ist Steve Krug in Reinform: *Selbsterklärend vor tiefgründig*. Einige Textstellen sind noch im Erklärungs-Modus statt im Handlungs-Modus:

| Jetzt | Besser |
|---|---|
| *„Stell deine Parameter ein"* | *„Dein Sparplan:"* |
| *„Wie haben wir gerechnet?"* | *„Was dieses Modell kann – und was nicht"* |
| *„Zur Simulation – Was bedeutet das für deinen Sparplan?"* | *„Was bedeutet das über 25 Jahre?"* |
| *„Wird berechnet…"* | *(leer lassen – der Wert erscheint sofort)* |

---

*Erstellt: Mai 2026 · Analyse-Grundlage: etf-wahlurnen-rechner.html, Iteration 1*
