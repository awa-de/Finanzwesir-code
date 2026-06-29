# MINI_SPEC_FROM_HAUPTDOKUMENT — Diversifikations-Detektor

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC

---

## C1 – Diversifikations-Detektor

**Slug:** `diversifikations-detektor`
**KI-Konsens:** ★★★ (Perplexity, Gemini, ChatGPT) + Weltkarte ergänzend
**Folienbezug:** Slides 11–18, 25–31
**Funnel-Position:** Komplexität entlarven
**Priorität:** #4

## Steuerungsblock: Zweck, Barriere, Prüfregeln

<!-- Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md / Seed diversifikations-detektor -->
<!-- Mechanisch eingefügt. Nicht frei formulieren. -->

**Rolle:** C1 — Diversifikationsillusion entlarven  

**Diese App existiert, um:**  
sichtbar zu machen, dass mehrere ETFs nicht automatisch mehr echte Diversifikation bedeuten.

**Zu entfernende psychologische Barriere:**  
Produktanzahl fühlt sich wie Sicherheit an, auch wenn dieselben Aktien mehrfach enthalten sind.

**Falscher Glaubenssatz vorher:**  
„Wenn ich fünf ETFs habe, bin ich fünfmal besser diversifiziert.“

**Zielzustand nach der App:**  
„Ich prüfe Überschneidungen und Konzentrationen, nicht nur die Anzahl meiner Produkte.“

**Muss-Kriterien für jede Umsetzung:**  
- Überschneidungen zwischen ETFs sichtbar machen.
- Top-Positionen / Länder / Sektoren verständlich zeigen.
- Mehr-Produkte-Illusion ohne Fachjargon entlarven.
- Einfache Entscheidung unterstützen: bewusst vereinfachen oder bewusst ergänzen.

**Nicht-Ziele / harte Verbote:**  
- Keine Produktempfehlung.
- Kein ETF-Ranking.
- Keine Überredung zu maximaler Einfachheit.
- Keine Portfolio-Optimierung für Fortgeschrittene.

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

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: C – Komplexität entlarven
- App-ID: C1
- App-Titel: Diversifikations-Detektor
- Slug laut Hauptdokument: `diversifikations-detektor`
- Zugeordneter App-Ordner: `/Apps/diversifikations-detektor/`
- Modulrolle: Haupt-App
- Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC
