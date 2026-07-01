# MINI_SPEC_FROM_HAUPTDOKUMENT — Rollierende Sparpläne

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Companion-/Detailmodul zu B2 Geburtsjahrlos. Roh-Mini-Spec, noch nicht APP_SPEC.
> Letzte Änderung: 2026-05-18 — Neuausrichtung: Kindersparplan, „Hätte ich damals" und Warte-Button entfernt. Fokus auf rollierende 30-Jahres-Sparplanzeiträume mit inflationsbereinigten Realwerten.

---

## Zugehörigkeit: B2 – Geburtsjahrlos

Dieser App-Ordner ist **kein eigenständiger Haupt-App-Abschnitt**.
Er gehört fachlich zur Master-App **B2 Geburtsjahrlos** (Ordner: `/Apps/geburtsjahrlos/`).

## Steuerungsblock: Zweck, Barriere, Prüfregeln

<!-- Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md / Seed rollierende-sparplaene -->
<!-- Mechanisch eingefügt. Nicht frei formulieren. -->

**Rolle:** Companion / Erweiterungsmodul zu historischer Startjahrlogik  

**Diese App existiert, um:**  
mehrere Startzeitpunkte systematisch vergleichbar zu machen, damit ein einzelnes Beispiel nicht als Wahrheit missverstanden wird.

**Zu entfernende psychologische Barriere:**  
Der Nutzer verallgemeinert aus einem ausgewählten Zeitraum und hält diesen für repräsentativ.

**Falscher Glaubenssatz vorher:**  
„Wenn ein Beispielzeitraum überzeugt, ist die Sache bewiesen.“

**Zielzustand nach der App:**  
„Ich sehe die Bandbreite historischer Verläufe und verstehe, warum robuste Regeln wichtiger sind als ein schönes Einzelbeispiel.“

**Muss-Kriterien für jede Umsetzung:**  
- Rollierende Zeiträume statt cherry-picking.
- Klare Verbindung zu Startjahr-/Epochenlogik.
- Ergebnis als Bandbreite, nicht als Prognose.
- Keine Überladung mit Statistikbegriffen.

**Nicht-Ziele / harte Verbote:**  
- Kein weiterer Prokrastinationspreis.
- Kein Kindersparplan-Rest.
- Keine Zukunftsprognose.
- Keine Optimierung auf bestes Startjahr.

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
