# MINI_SPEC_FROM_HAUPTDOKUMENT — Replizierer vs. Swapper

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC

---

## D2 – Replizierer vs. Swapper

**Slug:** `replizierer-swapper`
**KI-Konsens:** ★★ (Perplexity, ChatGPT)
**Folienbezug:** Slide 22
**Funnel-Position:** ETF-Auswahl / Angstreduktion
**Priorität:** #15

## Steuerungsblock: Zweck, Barriere, Prüfregeln

<!-- Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md / Seed replizierer-swapper -->
<!-- Mechanisch eingefügt. Nicht frei formulieren. -->

**Rolle:** D2 — Replikationsmethode entgiften  

**Diese App existiert, um:**  
physische Replikation, Sampling und Swap so zu erklären, dass Technikangst nicht zur Startbremse wird.

**Zu entfernende psychologische Barriere:**  
Unverstandene ETF-Technik wird als verstecktes Risiko empfunden.

**Falscher Glaubenssatz vorher:**  
„Swap klingt gefährlich; physisch klingt automatisch sicher.“

**Zielzustand nach der App:**  
„Ich verstehe die Grundmechanik und kann Replikationsmethode als Kriterium einordnen, ohne in Panik oder Perfektionismus zu fallen.“

**Muss-Kriterien für jede Umsetzung:**  
- Zwei Replikationsmethoden anschaulich gegenüberstellen.
- Risiken und Schutzmechanismen nüchtern erklären.
- Keine Methode dämonisieren.
- Entscheidung auf Einordnung reduzieren, nicht auf absolute Wahrheit.

**Nicht-Ziele / harte Verbote:**  
- Keine Derivate-Vorlesung.
- Keine Produktberatung.
- Keine Angstmacherei.
- Keine Aussage: physisch immer gut / synthetisch immer schlecht.

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

### Kernbotschaft

> „Ergebnis ist fast gleich → Angst sinkt."

### Interaktion

Zwei parallele Animationen: Replizierer (kauft echte Aktien, verleiht sie) vs. Swapper (tauscht Performance mit Gegenpartei). Performance-Chart läuft parallel → Linien fast deckungsgleich. Risikometer: beide reguliert, beide sicher.

---

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: D/E – ETF-Auswahl & Technik
- App-ID: D2
- App-Titel: Replizierer vs. Swapper
- Slug laut Hauptdokument: `replizierer-swapper`
- Zugeordneter App-Ordner: `/Apps/replizierer-swapper/`
- Modulrolle: Haupt-App
- Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC
