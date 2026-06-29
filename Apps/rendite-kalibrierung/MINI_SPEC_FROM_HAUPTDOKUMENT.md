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

## Steuerungsblock: Zweck, Barriere, Prüfregeln

<!-- Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md / Seed rendite-kalibrierung -->
<!-- Mechanisch eingefügt. Nicht frei formulieren. -->

**Rolle:** G2 — Erwartungsmanagement  

**Diese App existiert, um:**  
Renditeerwartungen so zu kalibrieren, dass der Plan auch bei niedrigeren Ergebnissen mental und rechnerisch tragfähig bleibt.

**Zu entfernende psychologische Barriere:**  
Der Nutzer baut seinen Plan auf Wunschzahlen und wird bei realistischeren Annahmen entweder euphorisch oder gelähmt.

**Falscher Glaubenssatz vorher:**  
„Wenn ETFs nicht sieben Prozent bringen, lohnt sich der Plan nicht.“

**Zielzustand nach der App:**  
„Ich sehe, was 4 %, 5 %, 6 % oder 7 % bedeuten, und kann meinen Plan robust statt optimistisch bauen.“

**Muss-Kriterien für jede Umsetzung:**  
- Verschiedene Renditeannahmen nüchtern vergleichen.
- Keine Prognose, sondern Sensitivitätsprüfung.
- Ergebnis muss Handlung ermöglichen, nicht Hoffnung zerstören.
- Einordnung statt Renditedebatte.

**Nicht-Ziele / harte Verbote:**  
- Keine Renditeprognose.
- Kein Szenario als wahrscheinlich markieren.
- Keine Angstmacherei mit Niedrigrendite.
- Keine Produkt- oder Faktorwette.

---

Dieser Prüfscore ist **kein app-spezifischer Inhalt**, sondern ein verbindliches Standard-Gate für jede spätere Änderung an einer App.

Er wird bei der späteren Verteilung in jeden lokalen Steuerungsblock übernommen und dort **unverändert** verwendet.

**LLM-Prüfscore pro Änderung:**

Bewerte vor der Umsetzung von 0–2:

1. **Barriere-Abbau:** Entfernt die Änderung die definierte psychologische Hürde?
2. **Zielzustand:** Führt die Änderung zum gewünschten Nutzerzustand?
3. **Nicht-Ziele:** Vermeidet die Änderung alle verbotenen Drifts?
4. **Mentorrolle:** Stärkt die Änderung die Rolle dieser App in der Heldenreise?

**Score-Regel:**

- **8/8** = umsetzen
- **6–7/8** = nur umsetzen, wenn `Nicht-Ziele = 2/2`
- **≤5/8** = nicht umsetzen
- **jede Nicht-Ziel-Verletzung** = stoppen

**Wichtig:**

- Punkt 3 ist ein KO-Kriterium.
- Eine Änderung mit `Nicht-Ziele < 2/2` darf nicht umgesetzt werden, auch wenn der Gesamtscore hoch wirkt.
- Der Score ersetzt nicht den Steuerungsblock, sondern zwingt das LLM, jede Änderung gegen Barriere, Zielzustand, Nicht-Ziele und Heldenreise-Rolle zu prüfen.
- Bei Unsicherheit: nicht umsetzen, sondern Klärungsbedarf markieren.

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
