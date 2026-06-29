# MINI_SPEC_FROM_HAUPTDOKUMENT — Market-Timing-Fail-Simulator

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC

---

## B3 – Market-Timing-Fail-Simulator

**Slug:** `market-timing-simulator`
**KI-Konsens:** ★★ (ChatGPT, Gemini)
**Folienbezug:** Slides 43–45, 51 (Kaufzeitpunkt)
**Funnel-Position:** Timing zerstören
**Priorität:** #8

## Steuerungsblock: Zweck, Barriere, Prüfregeln

<!-- Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md / Seed market-timing-simulator -->
<!-- Mechanisch eingefügt. Nicht frei formulieren. -->

**Rolle:** B3 — Timing-Illusions-App  

**Diese App existiert, um:**  
den Nutzer die Unmöglichkeit des perfekten Einstiegs selbst erleben zu lassen, statt Timing nur argumentativ zu widerlegen.

**Zu entfernende psychologische Barriere:**  
Die Kontrollillusion, dass der Nutzer durch Warten und Beobachten einen besseren Einstiegspunkt finden kann.

**Falscher Glaubenssatz vorher:**  
„Ich warte noch auf den Rücksetzer und steige dann besser ein.“

**Zielzustand nach der App:**  
„Ich erkenne den perfekten Einstieg erst hinterher. Eine robuste Regel ist besser als mein Timing-Gefühl.“

**Muss-Kriterien für jede Umsetzung:**  
- Nutzer trifft Timing-Entscheidungen unter unvollständiger Information.
- Ergebnis wird gegen eine einfache Regel / Sparplanlogik kalibriert.
- Die App zeigt Scheitern der Timing-Kontrolle ohne Spott.
- Keine Signale, keine Tipps, keine Mustererkennung als Belohnung.

**Nicht-Ziele / harte Verbote:**  
- Kein Trading-Spiel.
- Keine technische Analyse.
- Keine Kauf-/Verkaufssignale.
- Keine Optimierung des besten Einstiegs.
- Keine Prognose.

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

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: B – Timing zerstören
- App-ID: B3
- App-Titel: Market-Timing-Fail-Simulator
- Slug laut Hauptdokument: `market-timing-simulator`
- Zugeordneter App-Ordner: `/Apps/market-timing-simulator/`
- Modulrolle: Haupt-App
- Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC
