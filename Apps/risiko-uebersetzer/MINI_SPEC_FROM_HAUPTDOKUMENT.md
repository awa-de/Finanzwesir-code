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

## Steuerungsblock: Zweck, Barriere, Prüfregeln

<!-- Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md / Seed risiko-uebersetzer -->
<!-- Mechanisch eingefügt. Nicht frei formulieren. -->

**Rolle:** A1 — Dosis-App / Risiko übersetzen  

**Diese App existiert, um:**  
abstrakte Prozentverluste in persönlich spürbare Euro- und Lebenswelt-Verluste zu übersetzen, damit der Nutzer seine tragbare ETF-Dosis findet.

**Zu entfernende psychologische Barriere:**  
Prozentzahlen wirken harmlos und theoretisch; der Nutzer überschätzt deshalb seine emotionale Verlusttragfähigkeit.

**Falscher Glaubenssatz vorher:**  
„Einen Crash von 30 oder 40 Prozent halte ich schon aus — ich weiß ja, dass ETFs langfristig steigen.“

**Zielzustand nach der App:**  
„Ich kenne nicht nur meine gewünschte Rendite, sondern meine tragbare Dosis. Ich weiß, welcher Verlust in Euro und Alltag wirklich zu mir passt.“

**Muss-Kriterien für jede Umsetzung:**  
- Verlust wird in Euro und konkrete Alltagsanker übersetzt.
- Ergebnis führt zu einer tragbaren ETF-Dosis / Aktienquote, nicht zu Maximalrendite.
- Ton ruhig und klärend, nicht beschämend.
- Nutzer darf sich für eine niedrigere Dosis entscheiden, ohne als feige gerahmt zu werden.

**Nicht-Ziele / harte Verbote:**  
- Keine Renditeoptimierung.
- Keine Produktempfehlung.
- Keine Crash-Prognose.
- Keine Beschämung niedriger Aktienquoten.
- Kein „du musst mehr Risiko nehmen“.

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
