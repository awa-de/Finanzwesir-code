# MINI_SPEC_FROM_HAUPTDOKUMENT — Rendite-Kalibrierung

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC

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

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: G – Systemkritische Einwände
- App-ID: G2
- App-Titel: Rendite-Kalibrierung
- Slug laut Hauptdokument: `rendite-kalibrierung`
- Zugeordneter App-Ordner: `/Apps/rendite-kalibrierung/`
- Modulrolle: Haupt-App
- Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC
