# MINI_SPEC_FROM_HAUPTDOKUMENT — Weltkarte ETF-Indizes

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Erweiterungs-/Companion-Modul. Eigenständiger Abschnitt im Hauptdokument fehlt oder ist nur indirekt vorhanden.

---

## Zugehörigkeit: C1 / C3 – Diversifikations-Familie

Dieser App-Ordner ist **kein eigenständiger Haupt-App-Abschnitt** im Hauptdokument.
Er gehört fachlich zur Master-App-Familie **C1 Diversifikations-Detektor + C3 Weltdepot-Baukasten** (Ordner: `/Apps/diversifikations-detektor/` und `/Apps/weltdepot-baukasten/`).

## Steuerungsblock: Zweck, Barriere, Prüfregeln

<!-- Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md / Seed weltkarte-etf-indizes -->
<!-- Mechanisch eingefügt. Nicht frei formulieren. -->

**Rolle:** Companion-App / visuelles Lernmodul  

**Diese App existiert, um:**  
ETF-Indexnamen in eine sichtbare Weltkarte zu übersetzen.

**Zu entfernende psychologische Barriere:**  
Indexnamen klingen global, neutral und eindeutig; der Nutzer sieht die tatsächliche Länder- und Regionenlogik nicht.

**Falscher Glaubenssatz vorher:**  
„World, ACWI oder Emerging Markets sagt mir schon intuitiv, was wirklich drin ist.“

**Zielzustand nach der App:**  
„Ich sehe, welche Welt ich mit einem Index wirklich kaufe — und welche nicht.“

**Muss-Kriterien für jede Umsetzung:**  
- Indexgewichtungen geografisch sichtbar machen.
- Begriffe wie World, ACWI, EM, Europe etc. alltagstauglich übersetzen.
- Keine moralische Länderwertung.
- Als Lernmodul, nicht als Produktempfehlung.

**Nicht-Ziele / harte Verbote:**  
- Keine politische Bewertung von Ländern.
- Kein ETF-Ranking.
- Keine Prognose über Gewinnerregionen.
- Keine Empfehlung bestimmter Regionenquoten.

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

## Warnhinweis für spätere APP_SPEC-Erstellung

Diese MINI_SPEC enthält einen Steuerungsblock aus der Seed-Datei. Der Block konserviert den aktuellen Rollout-Stand, ersetzt aber keine spätere APP_SPEC-Prüfung.

Vor einer APP_SPEC-Erstellung muss ein LLM ausdrücklich prüfen:

- Ist diese App eine eigenständige Haupt-App, ein Companion-Modul, ein Funnel-Finale oder eine Visualisierung?
- Welche Parent-App oder Nutzerreise ist betroffen?
- Deckt der Steuerungsblock nur den aktuellen Seed-Stand ab oder braucht die spätere APP_SPEC eine strukturelle Neubewertung?
- Darf aus dieser MINI_SPEC überhaupt direkt eine APP_SPEC entstehen?

STOP-Regel:
Wenn diese Rollenprüfung nicht durchgeführt wurde, darf keine APP_SPEC erstellt werden.

### Modulrolle
Companion-App

### Fachliche Beschreibung
Nutzer klickt Index; Länder im Index werden auf Weltkarte hervorgehoben. Visuelles Lernmodul: macht Überschneidungen zwischen Indizes geografisch sichtbar. Ergänzt C1 (Diversifikations-Detektor) als visuelle Komponente.

---

## Originalinhalt der Master-App aus dem Hauptdokument

### C1 – Diversifikations-Detektor

**Slug:** `diversifikations-detektor`
**KI-Konsens:** ★★★ (Perplexity, Gemini, ChatGPT) + Weltkarte ergänzend
**Folienbezug:** Slides 11–18, 25–31
**Funnel-Position:** Komplexität entlarven
**Priorität:** #4

#### Problem, das gelöst wird

Mehr ETFs = mehr Sicherheit. Das ist der größte Denkfehler. Diese App zeigt: Mehr ETFs bedeutet oft nur, dieselben Aktien mehrfach zu kaufen.

#### Kernbotschaft

> „Du kaufst das Gleiche zweimal."

#### Interaktion (UX-Flow)

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

#### Variante: „Baue deinen eigenen Index" (ChatGPT)

User wählt Länder, Gewichtung, Anzahl Aktien → App zeigt: „Dein Index ist eigentlich MSCI World (95 % ähnlich)."

#### Implementierungshinweise

- Überschneidungsdaten für Top-ETFs als statisches JSON
- Verbindung zur bestehenden Weltkarten-App sinnvoll
- D3.js für Overlap-Heatmap oder Kreisdiagramm

---

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: C – Komplexität entlarven
- App-ID: C1 / C3
- App-Titel: Diversifikations-Detektor / Weltdepot-Baukasten
- Slug laut Hauptdokument: `diversifikations-detektor` / `weltdepot-baukasten`
- Zugeordneter App-Ordner: `/Apps/weltkarte-etf-indizes/`
- Master-App-Ordner: `/Apps/diversifikations-detektor/` und `/Apps/weltdepot-baukasten/`
- Modulrolle: Companion-App
- Status: Erweiterungs-/Companion-Modul. Eigenständiger Abschnitt im Hauptdokument fehlt oder ist nur indirekt vorhanden.
