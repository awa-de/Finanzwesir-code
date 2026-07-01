# MINI_SPEC_FROM_HAUPTDOKUMENT — Thesaurierer vs. Ausschütter

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC

---

## F2 – Thesaurierer vs. Ausschütter

**Slug:** `thesaurierer-rennen`
**KI-Konsens:** ★ (Perplexity)
**Folienbezug:** Slide 23
**Funnel-Position:** ETF-Auswahl (Entscheidungshilfe für Nebenfrage)
**Priorität:** #16

## Steuerungsblock: Zweck, Barriere, Prüfregeln

<!-- Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md / Seed thesaurierer-rennen -->
<!-- Mechanisch eingefügt. Nicht frei formulieren. -->

**Rolle:** F2 — Ausschütter/Thesaurierer-Perfektionismus entschärfen  

**Diese App existiert, um:**  
den Unterschied zwischen thesaurierend und ausschüttend sichtbar zu machen, ohne daraus eine Startbremse zu bauen.

**Zu entfernende psychologische Barriere:**  
Der Nutzer glaubt, die Ausschüttungsart sei eine über Erfolg oder Misserfolg entscheidende Produktfrage.

**Falscher Glaubenssatz vorher:**  
„Wenn ich bei thesaurierend vs. ausschüttend falsch liege, ruiniere ich mein Ergebnis.“

**Zielzustand nach der App:**  
„Ich verstehe den Unterschied und kann pragmatisch entscheiden, ohne die Produktwahl zu überhöhen.“

**Muss-Kriterien für jede Umsetzung:**  
- Wettrennen / Vergleich überraschend klein oder einordnend darstellen.
- Steuer- und Wiederanlageannahmen transparent machen.
- Keine Empfehlung als allgemeingültige Wahrheit.
- Entscheidung entkrampfen.

**Nicht-Ziele / harte Verbote:**  
- Keine Steuerberatung.
- Keine Produktempfehlung.
- Keine Detailtiefe, die neuen Perfektionismus erzeugt.
- Keine pauschale Überlegenheit einer Variante.

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

> „Diese Entscheidung ist eine Nachkomma-Entscheidung. Wichtiger ist: Überhaupt anfangen."

### Interaktion

Animiertes Wettrennen über 10/20/30 Jahre. Ausschütter: kleiner animierter Geldregen, leicht langsameres Wachstum. Ergebnis: Unterschied überraschend klein. Twist: App endet mit Relativierung dieser Entscheidung.

---

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: F – Risiko klären
- App-ID: F2
- App-Titel: Thesaurierer vs. Ausschütter
- Slug laut Hauptdokument: `thesaurierer-rennen`
- Zugeordneter App-Ordner: `/Apps/thesaurierer-rennen/`
- Modulrolle: Haupt-App
- Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC
