# MINI_SPEC_FROM_HAUPTDOKUMENT — Rollierende Sparpläne

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Companion-/Detailmodul zu B2 Geburtsjahrlos. Roh-Mini-Spec, noch nicht APP_SPEC.
> Letzte Änderung: 2026-05-18 — Neuausrichtung: Kindersparplan, „Hätte ich damals" und Warte-Button entfernt. Fokus auf rollierende 30-Jahres-Sparplanzeiträume mit inflationsbereinigten Realwerten.

---

## Zugehörigkeit: B2 – Geburtsjahrlos

Dieser App-Ordner ist **kein eigenständiger Haupt-App-Abschnitt**.
Er gehört fachlich zur Master-App **B2 Geburtsjahrlos** (Ordner: `/Apps/geburtsjahrlos/`).

### Modulrolle

Companion-/Detailmodul zu B2. Vertieft die historische Epochen-Ansicht mit rollierenden 30-Jahres-Sparplanzeiträumen.

---

## Rollierende Sparpläne – Companion zu B2 Geburtsjahrlos

**Slug:** `rollierende-sparplaene`
**Beziehung:** Companion-/Detailmodul zu B2 `geburtsjahrlos`
**Funnel-Position:** Marktzeit statt Timing / historische Robustheit

### Rolle

Dieses Modul vertieft B2. Es zeigt rollierende 30-Jahres-Sparplanzeiträume auf Basis historischer MSCI-World-Monatsdaten.

Es ist keine Kindersparplan-App, keine Startalter-App und keine „Hätte ich damals..."-App.

### Kernbotschaft

> „Gleiche Strategie, gleiche Laufzeit, andere Börsenepoche: Das Ergebnis ist ein Spektrum, kein Standardwert."

### Interaktion

Das Modul simuliert alle rollierenden 30-Jahres-Sparpläne auf den MSCI World mit Monatsdaten.

**Eingaben:**
- monatliche Sparrate
- Laufzeit: 30 Jahre als Standard
- optional: Startmonat / Startjahr markieren

**Visualisierung:**
- alle rollierenden 30-Jahres-Zeiträume
- schlechtester Zeitraum
- Median-Zeitraum
- bester Zeitraum
- alle Hauptwerte inflationsbereinigt in heutiger Kaufkraft

**Ergebniswerte:**
- real eingezahlt
- realer Endwert schlechtester Zeitraum
- realer Endwert Median-Zeitraum
- realer Endwert bester Zeitraum

### Methodische Schutzplanke

Bei 30-Jahres-Zeiträumen müssen die Hauptwerte inflationsbereinigt sein. Nominale Werte dürfen höchstens als Nebenwert oder Tooltip erscheinen.

### Was das Modul nicht tut

- kein Kindersparplan
- kein Sparstart mit Geburt
- kein Sparstart mit 30
- kein Startalter-Vergleich
- kein „Der beste Zeitpunkt war vor 10 Jahren"
- keine Opportunitätskosten des Zögerns
- kein Button „Was passiert, wenn ich 3 Jahre warte?"
- keine glatte Zukunftsprojektion
- keine Renditedebatte
- keine B1-Marktzeit-Inszenierung

### Implementierungshinweise

- Historische MSCI-World-Monatsdaten lokal/statisch
- Inflationsdaten erforderlich, Hauptwerte real / in heutiger Kaufkraft
- Kein Backend
- Keine Tagesdaten
- Keine Zukunftsprojektion

---

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: B – Marktzeit statt Timing
- App-ID: B2 (Companion-Modul)
- App-Titel: Rollierende Sparpläne — Companion zu Geburtsjahrlos
- Slug: `rollierende-sparplaene`
- Zugeordneter App-Ordner: `/Apps/rollierende-sparplaene/`
- Master-App-Ordner: `/Apps/geburtsjahrlos/`
- Modulrolle: Companion-/Detailmodul
- Status: Roh-Mini-Spec, noch nicht APP_SPEC
