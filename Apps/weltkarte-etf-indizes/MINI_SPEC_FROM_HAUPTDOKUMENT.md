# MINI_SPEC_FROM_HAUPTDOKUMENT — Weltkarte ETF-Indizes

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Erweiterungs-/Companion-Modul. Eigenständiger Abschnitt im Hauptdokument fehlt oder ist nur indirekt vorhanden.

---

## Zugehörigkeit: C1 / C3 – Diversifikations-Familie

Dieser App-Ordner ist **kein eigenständiger Haupt-App-Abschnitt** im Hauptdokument.
Er gehört fachlich zur Master-App-Familie **C1 Diversifikations-Detektor + C3 Weltdepot-Baukasten** (Ordner: `/Apps/diversifikations-detektor/` und `/Apps/weltdepot-baukasten/`).

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
