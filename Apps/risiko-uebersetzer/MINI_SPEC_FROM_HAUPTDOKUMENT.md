# MINI_SPEC_FROM_HAUPTDOKUMENT — Risiko-Übersetzer (Dacia-Test)

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC

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

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: A – Crash-Angst auflösen
- App-ID: A1
- App-Titel: Risiko-Übersetzer (Dacia-Test)
- Slug laut Hauptdokument: `risiko-uebersetzer`
- Zugeordneter App-Ordner: `/Apps/risiko-uebersetzer/`
- Modulrolle: Haupt-App
- Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC
