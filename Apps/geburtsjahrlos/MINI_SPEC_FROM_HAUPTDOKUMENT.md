# MINI_SPEC_FROM_HAUPTDOKUMENT — Geburtsjahrlos-Simulator

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC

---

## B2 – Geburtsjahrlos-Simulator

**Slug:** `geburtsjahrlos`
**KI-Konsens:** ★★★★ (Perplexity, Claude, Gemini, ChatGPT)
**Folienbezug:** Slides 4–6, 8–10, 60 (Großwetterlage, historische Renditen)
**Funnel-Position:** Timing zerstören / Hook
**Priorität:** #2

### Problem, das gelöst wird

Dieselbe Strategie – 100 € monatlich, 30 Jahre, MSCI World – lieferte historisch zwischen 102.000 € und 402.000 €. Nicht wegen Fehlern, sondern wegen Zufall. Die einzige rationale Antwort darauf: sofort anfangen.

### Kernbotschaft

> „Du kontrollierst weder die Börse noch dein Geburtsjahr. Aber du kontrollierst, wann du anfängst."

### Interaktion (UX-Flow, 3 Szenarien)

**Eingaben:** Geburtsjahr oder Startjahr (ab 1972), Sparrate, Laufzeit

**Szenario 1 – Historischer Fächer:**
Fächer-Diagramm mit bestem / Median / schlechtestem historischen MSCI-World-Verlauf.
→ Selbst das schlechteste Szenario liegt über dem eingezahlten Kapital.

**Szenario 2 – Kindersparplan:**
Eltern starten bei Geburt mit 50 € monatlich.
→ Was wurde eingezahlt, was erwirtschaftet (bis heute)?

**Szenario 3 – „Hätte ich damals...":**
„Der beste Zeitpunkt war vor 10 Jahren. Was hättest du heute?"
→ Opportunitätskosten des Zögerns in Euro.

**Button: „Was passiert, wenn ich 3 Jahre warte?"**
→ Differenz direkt in Euro sichtbar.

**Auto-generierter Output:**
> „Du kannst das Timing nicht wählen – aber du kannst anfangen."

**CTA:** „Sparplan starten – egal wann"

### Implementierungshinweise

- Historische MSCI-World-Renditedaten als statisches JSON (Quelle: MSCI.com)
- D3.js oder Chart.js für Fächer-Diagramm
- Kein Backend nötig

---

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: B – Timing zerstören
- App-ID: B2
- App-Titel: Geburtsjahrlos-Simulator
- Slug laut Hauptdokument: `geburtsjahrlos`
- Zugeordneter App-Ordner: `/Apps/geburtsjahrlos/`
- Modulrolle: Haupt-App
- Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC
