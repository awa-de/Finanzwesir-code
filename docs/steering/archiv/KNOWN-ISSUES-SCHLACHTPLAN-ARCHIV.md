---
archiv_status: POSTMORTEM
archiv_hinweis: "Historischer Schlachtplan. Nicht handlungsleitend."
aktive_steuerquellen:
  - PROJECT-STATUS.md
  - BACKLOG.md
  - NAVIGATION.md
erstellt_vor_archivvertrag: true
geprüft_am: 2026-06-08
geprüft_in: AP-KORR-5
---

# Archivhinweis

Diese Datei ist ein historisches Prozessartefakt.

Sie ist kein operativer Standardkontext für Claude.
Sie ersetzt keine aktiven Steuerdateien und darf nicht als aktueller Arbeitsplan verwendet werden.

Aktuelle Projektsteuerung steht in:

- `PROJECT-STATUS.md`
- `BACKLOG.md`
- `NAVIGATION.md`

Der folgende Inhalt bleibt als Postmortem- und Verlaufsmaterial erhalten.

---

# Schlachtplan: KNOWN-ISSUES abarbeiten

## Übersicht

Ziel: **Uploadfähiges Ghost-Theme.** Drei Phasen: Engine (abgeschlossen),
CSS & Design (in Arbeit), Pre-Launch (Theme bauen, testen, ausliefern).
Jeder Faden endet mit dem Abschluss-Ritual.

## Abhängigkeits-Graph

```text
── Engine ────────────────────────────────────────────
AP-1..AP-11              abgeschlossen (2026-02-17..23)
AP-14/AP-15              ✅ SNAPSHOT X-Achse (Line) — Calendar Snap (2026-02-26)
AP-13                    ✅ PERIOD-Track (Bar) — Kalender-Ticks (2026-02-27)
AP-17                    ✅ WEEKLY/DAILY Bar-Balken + Density-Tabellen (2026-02-27)
AP-18                    ✅ Quarter-End Tick-Monate (Finanzindustrie-Standard) (2026-02-27)
AP-19                    ⬜ PERIOD_TABLES DRY-Refactoring (nach AP-18)
AP-20/21                 🟡 SNAPSHOT X-Achse + CV-Heuristik (T0 erledigt, T1/T2/T4 gestrichen → AP-21-IMPLEMENTATIONSPLAN.md §7)

── DEV-TIME CSS ──────────────────────────────────────
CSS-2 ✅ → CSS-3 ✅ (Bridge) → CSS-5 (Verifikation)

── PRE-LAUNCH (Theme bauen) ──────────────────────────
TMPL-1 (Templates + SEO/OG/Twitter/Schema.org/RSS)
  → CSS-7 (Asset-Einbindung prüfen)
    → QA-1 (Integration & QA + SEO/Schema-Validierung)
      → CSS-6 (Tailwind Production-Build)
        → AUDIT-P + AUDIT-S (parallel möglich)
          → DEPLOY

── GHOST-SETUP (Ghost-Instanz konfigurieren) ─────────
GHOST-1  Clicky Analytics          ─┐
GHOST-2  VG-Wort Snippet           ─┤ alle nach DEPLOY,
GHOST-3  VG-Wort Bulk-Workflow     ─┤ untereinander unabhängig
GHOST-4  OG-Default-Bilder         ─┤ (außer GHOST-3 braucht GHOST-2)
GHOST-5  FAQPage Schema-Snippet    ─┤
GHOST-6  robots.txt + Sitemap      ─┤
GHOST-7  Webmention.io             ─┘

── REDAKTIONELL (→ separates Redakteurs-Handbuch-LLM) ─
P6: GEO (URL-Strategie, FAQ-Standard, Content-Struktur)
P7: E-E-A-T (Autoren-Bio, About-Seite, Impressum, Datenschutz)
P5-AP4: dateModified pflegen
```

---

## AP-1: Script-Tag-Konsolidierung (Security + Performance) — ✅ ERLEDIGT

**Abgeschlossen:** 2026-02-17 | **Ergebnis:** Scope-Korrektur + 1 Code-Fix

> **Grundlegende Scope-Korrektur:** AP-1 wurde ursprünglich geplant, als
> Chart.js noch vom CDN (jsdelivr.net) geladen wurde. Inzwischen liegt
> Chart.js **lokal** im Theme (`assets/js/vendor/chart.umd.min.js`).
> Damit entfallen 3 von 4 Tasks — SRI, Versionspinning und Preconnect
> sind CDN-spezifische Maßnahmen, die bei lokaler Datei unnötig sind.
> Die Einbindung mit `defer` erfolgt einmalig in `default.hbs` beim
> Theme-Bau (Phase 2 der Theme-Assembly-Checkliste).

| Task | Quelle | Ergebnis |
|------|--------|----------|
| ~~Security 1~~ | ~~SECURITY-AUDIT §7~~ | **Entfällt** — Chart.js lokal, SRI schützt gegen CDN-Manipulation |
| ~~Performance 1~~ | ~~PERFORMANCE-ANALYSE~~ | **Entfällt** — `defer` wird in `default.hbs` gesetzt (Theme-Bau) |
| ~~Performance 2~~ | ~~PERFORMANCE-ANALYSE~~ | **Entfällt** — kein CDN, kein Preconnect nötig |
| Security 4 | SECURITY-AUDIT §7 | **Erledigt** — `parseInt(…, 10)` in `ChartEngine.js:254` |

---

## AP-2: Security Code-Änderungen (URL-Validierung + Renderer) — ✅ ERLEDIGT

**Abgeschlossen:** 2026-02-17 | **Ergebnis:** Domain-Whitelist + Renderer Safe DOM

| Task | Quelle | Was |
|------|--------|-----|
| Security 2 | SECURITY-AUDIT §7 | Protokoll-Whitelist fetch-URL |
| Security 3 | SECURITY-AUDIT §7 | showError/showLoading → createElement+textContent |
| Pre-Launch | KNOWN-ISSUES | Domain-Whitelist `www.finanzwesir.com` |

**Abhängigkeit:** Security 2 und die Domain-Whitelist (Pre-Launch) überschneiden
sich — die Domain-Whitelist ist die strengere Variante und ersetzt die reine
Protokoll-Prüfung. **Beide zusammen abarbeiten.**

**Achtung:** CSVParser.js ist Layer 1 (Tabu-Bereich). Die SECURITY-AUDIT erlaubt
explizit "eine Zeile einfügen" — trotzdem Rückfrage beim User vor Code-Änderung.

**Was zu lesen ist:** SECURITY-AUDIT.md §7 (IST/SOLL-Code + "WAS NICHT TUN"),
KNOWN-ISSUES Pre-Launch "Domain-Whitelist".

---

## AP-3: Pre-Launch-Klärungen abschließen — ✅ ERLEDIGT

**Abgeschlossen:** 2026-02-17 | **Ergebnis:** Alle 3 Pre-Launch-Punkte geschlossen

| Punkt | Ergebnis |
|-------|----------|
| Titel-Fallback | **Entscheidung: Kein Fallback.** Fehlendes `data-title` → kein Titel. Code war bereits korrekt. Specs aligned (REDAKTEURS-HANDBUCH, alte v3-Spec). |
| Domain-Whitelist | **Erledigt in AP-2.** Spec-Update in v3-Spec nachgezogen ("noch zu implementieren" → "implementiert 2026-02-17"). |
| Performance 3 (HTTP/2) | **Geschlossen als "wartet auf Deploy".** Server-Check erst nach Go-Live möglich. Kein Code-Change nötig. |

---

## AP-4: Spec-Defekt Zone M (Density Matrix) — ✅ ERLEDIGT

**Abgeschlossen:** 2026-02-17 | **Ergebnis:** Kein Defekt — Falschalarm

> **Befund:** Die beanstandete Zeile `≤ 10 → year, Step 1, yyyy` existiert
> sowohl in der Spec (v12, §3.2, Zone M, Zeile 4) als auch im Code
> (`PERIOD_TABLE_M`, `maxYears: 10.0`). Spec und Code sind 1:1 identisch.
> Der KNOWN-ISSUES-Eintrag basierte vermutlich auf einer älteren Spec-Version
> oder einem Lesefehler. Kein Code-Change, kein Spec-Change nötig.

---

## AP-5: BI-Review — Kleine Tasks — ✅ ERLEDIGT

**Abgeschlossen:** 2026-02-18 | **Ergebnis:** Beide Empfehlungen implementiert

| Empfehlung | Was | Ergebnis |
|------------|-----|----------|
| Empf. 2: Pos/Neg-Farben | Bar Chart Single-Asset: positive/negative Balken farblich trennen | **Erledigt** — Semantische Tokens `positiveBar`/`negativeBar` in FwTheme, conditionelle Färbung in `_transformHistoryView()` (nur Single-Asset) |
| Empf. 4: Label-Texte | View-Toggle-Labels leserfreundlicher | **Erledigt** — Line: „Rendite %" → „Verlauf %". Bar: „Jahre" → „Verlauf", „Assets" → „Vergleich". „Wert €" bleibt (User-Entscheidung). |

---

## AP-6: BI-Review — Komplexe Tasks

**Komplexität:** Hoch | **Dauer:** Je 1 Faden pro Task

### AP-6a: Performance-Headline (BAN) — ✅ ERLEDIGT

**Abgeschlossen:** 2026-02-18 | **Ergebnis:** BAN-Headline implementiert

| Aspekt | Ergebnis |
|--------|----------|
| Berechnung | `_computeHeadline()` in LineChartStrategy V14.0.0 |
| Rendering | `_renderBAN()` / `_updateBAN()` in FwRenderer V5.0.0 |
| Verdrahtung | 2 Einzeiler in ChartEngine (meta-Rucksack) |
| Farbe | Neutral (#272727), kein Pos/Neg-Farbcoding |
| Komplementärwert | Nur bei Währungsdaten, nicht bei Prozent/Stück |
| Multi-Asset | 1–3 gestapelt, 4+ Hint-Text |

### AP-6a.1 + AP-6a.2: BAN Container-Styling + Dynamik — ✅ ERLEDIGT

**Abgeschlossen:** 2026-02-18 | **Ergebnis:** UX-Review ergab, dass drei Punkte zusammengehören

AP-6a.1 (Container-Styling) und AP-6a.2 (Hint-Text + Legend-Toggle) wurden nach
UX-Review als ein zusammenhängendes Paket implementiert: Container, Hint-Text und
Legend-Toggle-Dynamik teilen denselben Container, dieselbe Styling-Logik und dieselbe
Animations-Infrastruktur.

| Aspekt | Ergebnis |
|--------|----------|
| Container-Styling | Background `#E7ECEF@60%`, `border-radius: 0.5rem`, Padding `12px 16px` / `16px 16px` (Container Query ≥450px). Intrinsische Breite (`inline-block`, `min-width: 200px`). |
| Hint-Text (Bug) | „Renditen im Chart-Tooltip" → „Renditen sichtbar ab 3 Serien · N aktiv" (dynamischer Zähler, kein Kursiv) |
| Typografie | Nebenzeile 15/16px, Hint 15/16px (Perfect Fourth 1,5:1 zur Hauptzeile 20/24px) |
| Legend-Toggle → BAN | `_bindLegendEvents()` nutzt `state`, ruft `computeHeadlineForVisibleSeries()` → `_updateBAN()` |
| Empty-Mode | 0 sichtbare Serien → leerer Container (CLS-Schutz, kein Layout-Sprung) |
| Toolbar-Fix | Toggle (`margin-left: auto`) immer rechtsbündig, auch ohne Range-Buttons |
| Betroffene Dateien | FwRenderer V5.1.0, LineChartStrategy V14.1.0, ChartEngine V3.14.0 |

### AP-6b: A11y-Tabellen befüllen — ✅ ERLEDIGT

**Abgeschlossen:** 2026-02-19 | **Ergebnis:** Alle drei `getA11yData()` Methoden befüllt

| Aspekt | Ergebnis |
|--------|----------|
| Line | Datum + Asset-Spalten, letzte 20 Zeilen + Summary bei >20 Datenpunkten |
| Bar (History) | Identisch zu Line mit 20-Zeilen-Limit |
| Bar (Ranking) | Alle Perioden × Assets (kein Limit) |
| Pie | Alle Segmente einzeln aufgelöst (kein „Weitere…"-Aggregat) |
| Formatierung | `FwFormatUtils.formatSmart()` (de-DE) + `FwDateUtils.formatTooltipDate()` (Zone L) |
| Entscheidung | Pie ohne Aggregation, weil blinde Nutzer Drilldown-Popup nicht bedienen können |

### AP-6c: Touch-Tooltip-Ergonomie — 🟡 DevTools-OK (2026-02-19)

**DevTools-Test bestanden:** 12 Prüfungen (Line dicht/minimal, Bar Crowd/Ranking,
Pie, Legend-Toggle) auf iPhone SE + Galaxy S21 Emulation. Alle ✅.

**Offene Aktion:** Vor Launch auf echtem Smartphone nochmal testen.
DevTools kann die "dicke Finger"-Problematik (44px Finger vs. 1px Mauszeiger) nicht
zuverlässig aufdecken. Bei Problemen: `interaction.axis: 'x'` + `pointHitRadius` erhöhen.

**Nebeneffekt:** Beim Test wurde Regression 4 entdeckt (→ AP-9).

---

## AP-9: Regression 4 — X-Achse WEEKLY < 1 Jahr — ✅ ERLEDIGT

**Abgeschlossen:** 2026-02-23 | **Ergebnis:** Code war bereits gefixt (V8.0.0), Doku nachgezogen

> **Befund:** Der Code-Fix war bereits in V8.0.0 (Table-Driven Strategy Selection,
> Commit b68dd92) enthalten — als Teil der SNAPSHOT Snap-Architektur. Die eigene
> `SNAPSHOT_TABLES.WEEKLY`-Tabelle mit `{ maxYears: 0.5, unit: 'month', stepSize: 1 }`
> erzeugt monatliche Ticks statt chaotischer Tages-Labels. Das Abschluss-Ritual für
> AP-9 wurde beim damaligen Commit nicht durchgeführt.

| Aspekt | Ergebnis |
|--------|----------|
| Code-Fix | SNAPSHOT Floor Principle in FwSmartXAxis V8.0.0 (bereits committed) |
| Spec | §3.5 "SNAPSHOT Floor Principle" in Charts Ticks und Label v12 ergänzt |
| Testseite | `index_tool_tip.html` erstellt (5 CSVs × Line+Bar) |
| Verifiziert | `tool_tip_weekly_stress.csv` zeigt monatliche Labels (Jan, Feb, Mär) |

---

## AP-10: Data-Anchored Ticks für QUARTERLY/MONTHLY reguläre Daten — ✅ ERLEDIGT

**Abgeschlossen:** 2026-02-23 | **Ergebnis:** Data-Anchored Ticks für QUARTERLY/MONTHLY implementiert

| Aspekt | Ergebnis |
|--------|----------|
| `isRegularDayPattern()` | FwDateUtils V4.7.0 — Ultimo-Normalisierung (28–31 → ein Bucket), gibt `{ regular, dayOfMonth }` zurück |
| Rhythm-Guard | FwSmartXAxis V8.5.0 — QUARTERLY/MONTHLY mit regulärem Day-Pattern → Data-Anchored |
| `_generateDataAnchoredTicks` | Neue Modes QUARTER und MONTH via `_anchorByUnit()` (generischer Helper) |
| Refactoring | `_collectTimestamps()` (DRY), `_anchorByYear()` (SRP-Extraktion) |
| Graceful Degradation | Irreguläre Day-Patterns → Fall-through auf Kalender-Ticks (bewährter Pfad) |
| Spec | §7.4 aktualisiert (Entscheidungsmatrix, Status: Implementiert) |
| Testseite | `index_data_anchored.html` (5 Charts: QUARTERLY Line/Bar, MONTHLY kurz/lang Line, MONTHLY Bar) |

---

## AP-11: Range-Button bei <2 Datenpunkten ausblenden — ✅ ERLEDIGT

**Abgeschlossen:** 2026-02-23 | **Ergebnis:** Generischer Catch-All implementiert

| Aspekt | Ergebnis |
|--------|----------|
| Code-Fix | `FwRenderer._renderControls()` Zeile 266–269: `filterRows(rows, range).length >= 2` als dritte Bedingung |
| Scope | Generisch — fängt alle Rhythmen und Sparsity-Muster ab (~25 YEARLY-CSVs betroffen) |
| Spec-Update | REDAKTEURS-HANDBUCH §3.2 ergänzt (dynamische Button-Filterung dokumentiert) |
| Test-CSV | `snap_period_yearly_irregular.csv` — "1J" ausgeblendet, "3J"/"5J"/"Max" sichtbar |

---

## AP-7: Architektur-Prüfpunkte — ✅ ERLEDIGT

**Abgeschlossen:** 2026-02-23 | **Ergebnis:** Alle 3 Prüfpunkte geschlossen, kein Code

| Prüfpunkt | Entscheidung | Ergebnis |
|------------|--------------|----------|
| CSS-Variables Bridge (KDR 14) | Vollständig nach CSS-3 verschoben | ✅ Geschlossen — dort spezifiziert |
| dispose() | Kein Handlungsbedarf (Ghost ≠ SPA) | ✅ Geschlossen — GC räumt auf |
| Debug-Modus | Verworfen (Engine stabil, DevTools reichen) | ✅ Verworfen |

---

## AP-8: Feature-Ideen — Triage — ✅ ERLEDIGT

**Abgeschlossen:** 2026-02-23 | **Ergebnis:** 7 Features triagiert, 0 Code-Änderungen

| Feature | Entscheidung | Begründung |
|---------|-------------|------------|
| Time Travel Pie | **Verworfen** | Pie Charts für Zeitvergleiche ungeeignet (Cleveland) |
| Moving Average | **Verworfen** | Widerspricht Buy-and-Hold-Philosophie (Tufte) |
| Zero-Line lineWidth | **Teilweise impl.** → Rest in CSS-3 | Farbe da (`#999999`), lineWidth fehlt (~3 Zeilen) |
| Einheiten-Anker Y-Achse | **Post-Launch** | Spart Platz auf Mobile, nicht dringend |
| Bedingte Animationen | **Bereits implementiert** | Natives Chart.js-Verhalten (Balken von Baseline) |
| CLS Prevention | **Erledigt** (CSS-2) | `min-height` + `container-type` in screen.css §5 |
| Zone Zero (Kurzzeit) | **Post-Launch** | Kein akuter Bedarf, Nano-Fallback funktioniert |

**Details:** → KNOWN-ISSUES.md, Abschnitt "Feature-Ideen — Triage"

---

## AP-12: SNAPSHOT-Track — Kalender-Ticks für QUARTERLY/MONTHLY — 🟡 TEILWEISE ERLEDIGT

**Abgeschlossen (SNAPSHOT):** 2026-02-26 | **Offen (PERIOD):** → AP-13

**Ursprung:** 2026-02-25 | **Priorität:** Hoch (sichtbare Regression) | **Aufwand:** Klein (2 Dateien, ~20 Zeilen)

**Trigger-CSV:** `data/scenario_4_crash.csv` — 22 Datenpunkte, 2007–2012, Crash-Szenario.
Alle Punkte am 1. des Monats, aber Intervalle variieren von 28 Tagen (monatlich) bis 365 Tagen (jährlich).

### Problem

Die X-Achse im Line Chart zeigt chaotische, irregulär verteilte Ticks mit Label-Überlappungen.
Max-View: 16 Ticks an echten Datenpositionen statt regelmäßiger Quartalsticks.
3J-View: 9 Ticks, Mär 2009 → Apr 2009 überlappt (1 Monat), dann Sprung auf 6–12 Monate.
1J-View: OK (nur 2 Punkte).

### Root Cause (vollständig analysiert)

**Code-Pfad (Max-View, 5 Jahre, Zone L):**

1. `detectRhythm()` → Bucket-Statistik: QUARTERLY gewinnt (9/20 Intervalle, aber 7× MONTHLY, 2× HALF_YEARLY, 1× YEARLY, 1× unbucketed)
2. `_getDensityMatrix()` → SNAPSHOT_BASE → `{ unit: 'quarter', stepSize: 1, mode: 'QUARTER' }`
3. **Guard in `_generateLinearTicks()` Zeile 295–301:**
   ```
   if (rhythm === 'QUARTERLY' || rhythm === 'MONTHLY') {
       const allTs = this._collectTimestamps(axis);
       const { regular } = FwDateUtils.isRegularDayPattern(allTs);
       if (regular) {  // ← BUG: nur Tag-im-Monat, nicht Intervall-Regelmäßigkeit
           return this._generateDataAnchoredTicks(axis, matrix);
       }
   }
   ```
   `isRegularDayPattern()`: Alle 22 Punkte am 1. → `{ regular: true }` → Data-Anchored aktiviert.
4. `_anchorByUnit()` mit QUARTER-Mode: Gruppiert nach Quartal, letzter Punkt pro Quartal gewinnt.
   → 16 Ticks an echten (irregulären) Datenpositionen.
5. **Erwartetes Verhalten:** Fall-Through auf Kalender-Ticks (Zeile 304ff.) → regelmäßige Quartalsticks Jan/Apr/Jul/Oct.

**Code-Pfad (3J-View):** Identisches Problem. Rhythm = MONTHLY (Tie 3:3 mit QUARTERLY, MONTHLY gewinnt durch Iterationsreihenfolge). `isRegularDayPattern` = true → Data-Anchored → 9 irreguläre Ticks.

**Die fehlende Prüfung:** AP-10 definierte "reguläre Daten" als ZWEI Eigenschaften:
1. Konsistenter Tag-im-Monat → geprüft ✅
2. Konsistente Intervalle passend zum Rhythmus → **nicht geprüft** ❌

### Fix-Spezifikation

**Schritt 1: Neue Methode `FwDateUtils.isRegularInterval(timestamps, rhythm)`**

```javascript
/**
 * Prüft ob die Intervalle zwischen Datenpunkten konsistent zum erkannten Rhythmus sind.
 * Nutzt dieselben Band-Definitionen wie detectRhythm() (SSOT).
 * Schwelle: ≥80% der Intervalle müssen im Band des Rhythmus liegen.
 * @param {number[]} timestamps - Sortierte Zeitstempel in ms
 * @param {string} rhythm - 'MONTHLY' oder 'QUARTERLY'
 * @returns {boolean}
 */
static isRegularInterval(timestamps, rhythm) {
    if (!timestamps || timestamps.length < 3) return true;
    const sorted = [...timestamps].sort((a, b) => a - b);
    const diffs = sorted.slice(1).map((v, i) => (v - sorted[i]) / 86400000);

    // Bänder 1:1 aus detectRhythm (Waterfall Matrix, Spec §4)
    const BANDS = {
        MONTHLY:   { min: 25, max: 35 },
        QUARTERLY: { min: 80, max: 140 }
    };
    const band = BANDS[rhythm];
    if (!band) return false;

    const inBand = diffs.filter(d => d >= band.min && d <= band.max).length;
    return (inBand / diffs.length) >= 0.8;
}
```

**Warum 80%?** Erlaubt vereinzelte Ausreißer (z.B. ein fehlender Monatswert in sonst monatlichen Daten), blockiert aber Mixed-Rhythm-Daten zuverlässig. Crash-CSV: QUARTERLY-Band enthält 9/20 = 45% → deutlich unter 80%.

**Schritt 2: Guard in `FwSmartXAxis._generateLinearTicks()` erweitern**

Zeile 295–301 ändern:

```javascript
// VORHER (V8.5.0):
if (rhythm === 'QUARTERLY' || rhythm === 'MONTHLY') {
    const allTs = this._collectTimestamps(axis);
    const { regular } = FwDateUtils.isRegularDayPattern(allTs);
    if (regular) {
        return this._generateDataAnchoredTicks(axis, matrix);
    }
}

// NACHHER (V8.6.0):
if (rhythm === 'QUARTERLY' || rhythm === 'MONTHLY') {
    const allTs = this._collectTimestamps(axis);
    const { regular } = FwDateUtils.isRegularDayPattern(allTs);
    if (regular && FwDateUtils.isRegularInterval(allTs, rhythm)) {
        return this._generateDataAnchoredTicks(axis, matrix);
    }
    // Mixed-rhythm or irregular day pattern → fall through to calendar-based ticks
}
```

**Schritt 3: Versions-Update**
- `FwDateUtils.js` → V4.8.0 (neue Methode `isRegularInterval`)
- `FwSmartXAxis.js` → V8.6.0 (Guard erweitert)

### Betroffene Dateien (exakt 2)

| Datei | Änderung |
|-------|----------|
| `assets/js/fw-chart-engine/core/FwDateUtils.js` | Neue statische Methode `isRegularInterval()` (~15 Zeilen) |
| `assets/js/fw-chart-engine/core/FwSmartXAxis.js` | Guard Zeile 298: `&& FwDateUtils.isRegularInterval(allTs, rhythm)` hinzufügen, Kommentar aktualisieren |

### Regressions-Matrix (Pflicht-Tests)

| CSV | Rhythm | Erwartung nach Fix | Warum |
|-----|--------|-------------------|-------|
| `scenario_4_crash.csv` Max | QUARTERLY | Kalender-Ticks (Jan/Apr/Jul/Oct) | Intervalle 45% in Band → < 80% |
| `scenario_4_crash.csv` 3J | MONTHLY | Kalender-Ticks (monatlich/quartalsweise) | Intervalle gemischt → < 80% |
| `scenario_4_crash.csv` 1J | YEARLY | 2 Ticks (unverändert, anderer Guard) | Nur 2 Punkte, YEARLY-Pfad |
| `snap_period_quarterly_3y.csv` | QUARTERLY | Data-Anchored (wie bisher) | Alle Intervalle ~90d → 100% in Band |
| `snap_period_monthly_4m.csv` | MONTHLY | Data-Anchored (wie bisher) | Alle Intervalle ~30d → 100% in Band |
| `snap_period_monthly_30m.csv` | MONTHLY | Data-Anchored (wie bisher) | Alle Intervalle ~30d → 100% in Band |
| `bd_asset_halbjaehrlich_25y.csv` | HALF_YEARLY | Unverändert (anderer Guard) | YEARLY/HALF_YEARLY-Pfad, nicht betroffen |
| `snap_period_yearly_irregular.csv` | YEARLY | Unverändert (anderer Guard) | YEARLY-Pfad, nicht betroffen |

### WAS NICHT TUN

- **NICHT** `detectRhythm()` ändern — die Rhythm-Detection ist stabil und vielfach getestet.
- **NICHT** `isRegularDayPattern()` ändern — die Methode tut exakt was ihr Name sagt; der Bug ist im Guard, nicht in der Methode.
- **NICHT** den YEARLY/HALF_YEARLY-Guard (Zeile 288–293) anfassen — der nutzt `isRegularSeries()` und funktioniert korrekt.
- **NICHT** die Kalender-Tick-Generierung (Zeile 304ff.) ändern — die ist der korrekte Fallback-Pfad.
- **NICHT** die Schwelle unter 70% setzen — dann könnten unregelmäßige Daten mit zufällig vielen In-Band-Intervallen durchrutschen.

### Spec-Update (Teil des AP)

`docs/spec/Charts Ticks und Label_v12.md`, §7.4: Entscheidungsmatrix um Intervall-Prüfung erweitern. Neuer Bullet: "Reguläre Intervalle: ≥80% der Abstände müssen im Rhythmus-Band liegen (MONTHLY: 25–35d, QUARTERLY: 80–140d)."

### Ergebnis AP-12 (SNAPSHOT)

| Aspekt | Ergebnis |
|--------|----------|
| User-Entscheidung | QUARTERLY/MONTHLY → immer Kalender-Ticks (keine Data-Anchored) |
| Guard | QUARTERLY/MONTHLY-Block komplett entfernt aus `_generateLinearTicks` |
| Breathing-Room-Fix | `endLimit = context.dataRange?.max` statt `axis.max` (FAANG-BLOCKER) |
| `isRegularInterval()` | In FwDateUtils V4.8.0 vorhanden, aktuell ohne Aufrufer. Reserve für AP-13. |
| Spec | §7.4 Entscheidungsmatrix V8.6 aktualisiert |
| Testseite | `index_irregular_xaxis.html` (7 irregulär × Line + Bar) |
| Neue CSVs | `irregular_quarterly_one_gap.csv`, `irregular_monthly_scattered.csv` |

---

## AP-13: PERIOD-Track (Bar-Charts) mit irregulären Daten — 🔴 VORDRINGLICH

**Gemeldet:** 2026-02-26 | **Priorität:** Hoch (sichtbare Darstellungsprobleme) | **Aufwand:** Mittel

**Kontext:** AP-12 hat den SNAPSHOT-Track (Line) für irreguläre Daten gefixt.
Der PERIOD-Track (Bar) hat einen komplett anderen Code-Pfad (`afterBuildTicks`,
`afterFit`, Proximity Guard) und wurde noch nicht untersucht.

### Bekannte Symptome (visuell bestätigt in `index_irregular_xaxis.html`, Sektion B)

- `scenario_4_crash.csv` (Bar): Erratische Lücken zwischen Balkenblöcken.
- Weitere Bar-Charts in Sektion B der Testseite ebenfalls prüfen.

### Betroffener Code-Pfad

| Stelle | Zeilen | Funktion |
|--------|--------|----------|
| `afterBuildTicks` (PERIOD) | 209–267 | Key-Dedup, Nano-Fallback, Proximity Guard |
| `afterFit` (PERIOD) | 186–205 | Balkenbreite, Extension, Einzelpunkt-Fallback |
| BOP-Anchoring | BarChartStrategy | Normierung auf Periodenstart |

### Offene Fragen (für das nächste LLM)

1. Braucht der PERIOD-Track `FwDateUtils.isRegularInterval()` als Guard? Wenn nein: Methode entfernen (Dead Code, FAANG-MAJOR).
2. Ist der Proximity Guard (Zeile 250–266) für irregulär getimte Balken korrekt?
3. Wie verhält sich BOP-Anchoring bei Mixed-Rhythm-Daten (monatlich→jährlich)?

### Testdaten

Testseite `index_irregular_xaxis.html`, Sektion B (7 Bar-Charts):
- B1: `scenario_4_crash.csv`
- B2: `snap_period_yearly_irregular.csv`
- B3: `tool_tip_monthly_gaps.csv`
- B4: `tt_gap_test_irregular.csv`
- B5: `bd_kurz_19d_holiday_gap.csv`
- B6: `irregular_quarterly_one_gap.csv`
- B7: `irregular_monthly_scattered.csv`

### WAS NICHT TUN

- **NICHT** den SNAPSHOT-Pfad (`_generateLinearTicks`) ändern — der ist jetzt stabil.
- **NICHT** die YEARLY/HALF_YEARLY Data-Anchored Guards anfassen — die funktionieren.
- **NICHT** `isRegularInterval()` löschen ohne vorher zu prüfen ob PERIOD sie braucht.

---

## AP-14: SNAPSHOT Universal Snap — "Tag ist egal" — 🔴 REGRESSIONEN (→ AP-15)

**Ursprünglich abgeschlossen:** 2026-02-26 | **Status:** 🔴 Regressionen entdeckt, Code in gebrochenem Zustand nach AP-15

**Kontext:** AP-12 hat Kalender-Ticks für QUARTERLY/MONTHLY SNAPSHOT eingeführt.
AP-14 sollte Datenpunkte auf Kalender-Gridlinien snappen. Erzeugte aber
HALF_YEARLY-Regression (6-Monat-Shift durch BOP-Snap: Juni→Januar statt Juni→Juli).
AP-15 versuchte in 3 Iterationen zu fixen — alle gescheitert (siehe AP-15).

**Aktueller Code-Zustand (BROKEN — AP-15 Iteration 3):**

| Datei | Version | Zustand |
|-------|---------|---------|
| FwDateUtils.js | V5.2.0 | `getSnapTarget` gelöscht, `isRegularSeries` gelöscht, `isRegularDayPattern` gelöscht |
| LineChartStrategy.js | V15.2.0 | Kein `snappedTimestamps`, kein `_originalDate`, `x: timestamps[idx]` (echte Positionen) |
| FwSmartXAxis.js | V9.0.0 | Guard entfernt, Data-Anchored gelöscht (~95 Zeilen), HALF_YEARLY-Tabelle `unit:'month', stepSize:6`, endLimit + halfStep |
| FwSmartTooltips.js | V3.4.0 | Unverändert, Fallback `item.parsed.x` |

**Gelöscht in AP-15 (nicht wiederherstellbar ohne git revert):**
- `getSnapTarget()` — Snap-Logik für SNAPSHOT-Datenpunkte
- `isRegularSeries()` — Guard für Data-Anchored vs. Calendar-Ticks
- `isRegularDayPattern()` — Stichtag-Erkennung
- `_generateDataAnchoredTicks()` + `_anchorByYear()` + `_anchorByUnit()` + `_collectTimestamps()` — ~95 Zeilen Data-Anchored-Code

---

## AP-15: SNAPSHOT X-Achse — Konzeptioneller Neuansatz — 🔴 OFFEN

**Status:** 🔴 Neudesign erforderlich | **Scope:** NUR X-Achse, NUR Liniendiagramme

**Problem:** Die SNAPSHOT-X-Achse (Liniendiagramme) hat nach AP-12/AP-14 emergente
Regressionen. Drei Iterationen (Snap entfernen, selektiver Snap, Zero Snap) sind
gescheitert. Das zugrundeliegende Konzept — Snap als nachträgliche Korrektur auf
ein Kalender-Grid — löst das Problem nicht, sondern verschiebt es zwischen Rhythmen.

### Gescheiterte Iterationen

| Iteration | Ansatz | Ergebnis |
|-----------|--------|----------|
| 1 | Snap komplett entfernt, einheitliche Kalender-Ticks | MONTHLY-Regression: Datenpunkt 15. Jan sitzt optisch bei Feb-Tick (Jan-Tick vor axis.min gefiltert) |
| 2 | Selektiver Snap (nur M/Q/Y, kein HY) | QUARTERLY-Regression: End-of-Quarter-Daten (31. Mär) sitzen 2 Monate neben Apr-Tick |
| 3 | Zero Snap (Daten an echten Positionen, Ticks an Kalender) | User: "schlechter als bisher" |

### Kern-Erkenntnis

Das Problem hat zwei Dimensionen, die sich gegenseitig blockieren:
1. **Snap auf Kalender-Grid** → funktioniert für MONTHLY (15. Jan → 1. Jan = gleicher Monat), bricht für QUARTERLY (31. Mär → 1. Jan = falscher Monat im Tooltip) und HALF_YEARLY (30. Jun → 1. Jan = 6-Monat-Shift)
2. **Kein Snap** → Datenpunkte sitzen zwischen Kalender-Ticks, optische Verschiebung

Es braucht kein Patch, sondern ein Neudesign des Zusammenspiels von Daten, Ticks und Tooltips.

### Auftrag ans nächste LLM

Durchdenke die SNAPSHOT-X-Achse (Liniendiagramme) von vorne, konzeptionell.
Nach FAANG-Kriterien. So einfach wie möglich. Dann Implementation.

**Gegebene Bausteine:**
- Start- und Enddatum aus den CSV-Daten
- Ein bestimmter Rhythmus (täglich, wöchentlich, monatlich, quartalsweise, halbjährlich, jährlich), der erkannt wird (`FwDateUtils.detectRhythm`)
- Ticks laufen stur im Rhythmus durch (Industriestandard: Jan/Apr/Jul/Okt für Quartale, Jan/Jul für Halbjahre)
- Alle Datenpunkte werden mit einer Linie verbunden, egal wie weit sie auseinander sind. Start immer ganz links an der Y-Achse
- Eine Granularität (das ist das Snapping): wenn der Rhythmus über täglich hinausgeht, müssen die Daten in ein Raster gebracht werden. Beispiel monatlich: egal ob 14.3, 1.3 oder 31.3 — das ist immer "März"

**Spec:** `docs/spec/Charts Ticks und Label_v12.md` (bindend, §3 Density Matrix, §4 Waterfall Matrix, §7 SNAPSHOT-Ergänzungen)

**Isolations-Garantie:** Die Weiche `if (isSnapshot) { return; }` in `FwSmartXAxis.compute()` ist eine harte architektonische Grenze. PERIOD-Track (Balken) darf NICHT berührt werden.

**Testdaten:**
- `data/snap_period_half_yearly_4y.csv` (8 Punkte, Jun 30 / Dez 31, 2020–2023)
- `data/snap_period_half_yearly_12y.csv` (24 Punkte, Jun 30 / Dez 31, 2012–2023)
- `data/snap_period_quarterly_3y.csv` (12 Punkte, Quartalsende, 2021–2023)
- `data/snap_period_monthly_4m.csv` (4 Punkte, 15. des Monats, Jan–Apr 2024)
- `data/tt_gap_test_irregular.csv` (irreguläre Abstände)
- Alle CSVs in `data/` als Regressions-Check

### WAS NICHT TUN

- **NICHT** den PERIOD-Track (Bar) ändern
- **NICHT** ohne konzeptionellen Entwurf Code schreiben
- **NICHT** die Density Matrix (SNAPSHOT_TABLES) ändern ohne die Spec zu lesen
- **NICHT** die Y-Achse, Tooltips oder BAN-Headline anfassen (funktionieren)

---

## AP-16: Range-Button-Semantik bei PERIOD-Daten — ✅ ERLEDIGT (2026-02-27)

**Gemeldet:** 2026-02-27 | **Priorität:** Niedrig (UX) | **Aufwand:** Klein | **Erledigt:** 2026-02-27

**Problem:** Bei YEARLY Bar-Charts zeigte "1J" zwei Balken (2024+2025), "3J" vier Balken.
`filterRows()` nutzte inklusiven Cutoff (`>=`), dadurch fielen Start- und Endjahr ins Fenster → N+1.
Label "NJ" versprach N Jahre, Darstellung zeigte N+1 Perioden (Tufte: falsche Präzision,
Krug: Don't Make Me Think).

**Lösung:** PERIOD/SNAPSHOT-Weiche in `filterRows()` (V5.5.0):
- SNAPSHOT (Line): inklusiv (`>=`) — Start+Ende für Liniensegment nötig
- PERIOD (Bar): exklusiv (`>`) — "NJ" zeigt exakt N Periodenbalken

**UX-Analyse (Tufte/Krug/Nielsen/Cleveland):**
- Reguläre Daten: "NJ" = exakt N Balken. Perfekte Label-Semantik.
- Irreguläre Daten: Zeitfenster kann breiter als Label sein. Strukturbeweis zeigt:
  Trailing Gaps sind unmöglich (lastDate = rechter Anker), Leading Gaps unsichtbar
  (Achse trackt Datenpunkte), AP-11 Guard fängt ≤1 Punkt. Breiteres Fenster = bessere
  Lücken-Sichtbarkeit (flankierte Gaps).

**Betroffene Dateien:**
- `FwDateUtils.js` V5.5.0 → `filterRows(rows, rangeCode, dateSemantics='SNAPSHOT')`
- `BarChartStrategy.js` → 2× `'PERIOD'` als 3. Param
- `FwRenderer.js` → `_renderControls()` Weiche via `type === 'bar'`

**Kein Eingriff in Line-Pfade.** Default-Param = Rückwärtskompatibilität.

---

## AP-17: Regression — Bar-Chart Balken an Rändern abgeschnitten (WEEKLY) — ✅ ERLEDIGT (2026-02-27)

**Gemeldet:** 2026-02-27 | **Priorität:** Mittel (visueller Defekt) | **Aufwand:** Klein–Mittel

**Beobachtung:** Bei `snap_period_weekly_3m.csv` (WEEKLY, 14 Punkte, 2024-01-08 bis 2024-04-01)
sind der erste und letzte Balken am Canvas-Rand abgeschnitten. Die X-Achsen-Extension
(afterFit) komprimiert den Chart nicht ausreichend, sodass die äußeren Balken über den
sichtbaren Bereich hinausragen.

**Vermutete Ursache:** Die Extension-Berechnung in `FwSmartXAxis.afterFit` (Extension-Cap
für wenige Datenpunkte, AP-13) oder die `halfStep`-Berechnung passt nicht für kurze
WEEKLY-PERIOD-Serien. Möglicherweise greift der Cap `Math.min(rawExtension, halfStep)`
zu aggressiv.

**Betroffene Dateien:**
- `FwSmartXAxis.js` → `afterFit` Extension-Berechnung
- Möglicherweise: `BarChartStrategy.js` → `barThickness` / `maxBarThickness`

**Test-CSV:** `snap_period_weekly_3m.csv` (14 Punkte, WEEKLY, ~3 Monate)

**Wichtig:** Kein Zusammenhang mit AP-16 (filterRows-Änderung). Die Regression betrifft
die X-Achsen-Geometrie, nicht den Datenfilter.

---

## AP-18: Quarter-End Tick-Monate (Finanzindustrie-Standard) — OFFEN

**Gemeldet:** 2026-02-27 | **Priorität:** Mittel (Finanz-UX-Konvention) | **Aufwand:** Klein

### Problem

X-Achsen-Ticks für Quartale zeigen Jan/Apr/Jul/Okt (Periodenanfang), Finanzindustrie-Standard
sind Mär/Jun/Sep/Dez (Periodenende). Halbjahres-Ticks zeigen Jan/Jul statt Jun/Dez. Die CSVs und die
No-Q-Policy positionieren Balken bereits korrekt auf Endmonaten — nur die Ticks sind falsch (2 Monate Offset).

**Hinweis:** JavaScript `getUTCMonth()` ist 0-basiert (Jan=0, Dez=11). Alle Code-Formeln
verwenden 0-basierte Werte. Realwelt-Monate (1-basiert) daneben angegeben.

### Code-Änderungen (8 Stellen in 3 Dateien)

#### Datei 1: `assets/js/fw-chart-engine/core/FwSmartXAxis.js` (4× Logik, 2× Tabelle)

**1a) PERIOD Tick-Filter (Zeile 261):**
```javascript
// ALT:
case 'quarter': keep = (m % 3 === 0); break;
// NEU:
case 'quarter': keep = ((m + 1) % (3 * matrix.stepSize) === 0); break;
```
Begründung: `m+1` konvertiert auf 1-basiert, `%3===0` prüft auf Realwelt {3,6,9,12} = Mär/Jun/Sep/Dez.
Der Faktor `matrix.stepSize` ermöglicht Halbjahres-Filterung: stepSize=2 → `(m+1)%6=0` → Realwelt {6,12} = Jun/Dez.

**1b) SNAPSHOT Tick-Filter (Zeile 325):**
```javascript
// ALT:
case 'quarter': keep = (m % 3 === 0); break;
// NEU:
case 'quarter': keep = ((m + 1) % (3 * matrix.stepSize) === 0); break;
```
Identische Änderung wie 1a.

**1c) PERIOD Cursor-Alignment (Zeile 240):**
```javascript
// ALT:
cursor.setUTCMonth(Math.floor(cursor.getUTCMonth() / 3) * 3);
// NEU (Quarter-End AT OR BEFORE current month):
cursor.setUTCMonth(Math.floor((cursor.getUTCMonth() - 2) / 3) * 3 + 2);
```
Verhalten: m=0(Jan)→-1(Dez Vorjahr), m=2(Mär)→2(Mär), m=3(Apr)→2(Mär), m=5(Jun)→5(Jun),
m=11(Dez)→11(Dez). JavaScript `setUTCMonth(-1)` rollt korrekt ins Vorjahr.

**1d) SNAPSHOT Cursor-Alignment (Zeile 307):**
```javascript
// ALT:
if (matrix.unit === 'quarter') cursor.setUTCMonth(Math.floor(cursor.getUTCMonth() / 3) * 3);
// NEU:
if (matrix.unit === 'quarter') cursor.setUTCMonth(Math.floor((cursor.getUTCMonth() - 2) / 3) * 3 + 2);
```

**1e) HALF_YEARLY Density-Tabellen:**

PERIOD (Zeile 130): `stepSize: 1` → `stepSize: 2`
```javascript
// ALT:
{ maxYears: 5.0, unit: 'quarter', stepSize: 1, mode: 'HALF_YEAR', format: ... },
// NEU:
{ maxYears: 5.0, unit: 'quarter', stepSize: 2, mode: 'HALF_YEAR', format: ... },
```

SNAPSHOT (Zeile 110): `unit: 'month', stepSize: 6` → `unit: 'quarter', stepSize: 2`
```javascript
// ALT:
{ maxYears: 5.0, unit: 'month', stepSize: 6, mode: 'HALF_YEAR' },
// NEU:
{ maxYears: 5.0, unit: 'quarter', stepSize: 2, mode: 'HALF_YEAR' },
```
Begründung: Wechsel auf `unit: 'quarter'` bringt HALF_YEARLY in die Quarter-Alignment/Filter-Pipeline.
`stepSize: 2` → Filter `(m+1)%(3*2)=0` → nur Jun/Dez.

#### Datei 2: `assets/js/fw-chart-engine/core/FwDateAdapter.js` (1× Konsistenz)

**2a) startOf('quarter') (Zeile 111-112):**
```javascript
// ALT:
const q = Math.floor(date.getMonth() / 3);
date.setMonth(q * 3);
// NEU:
const q = Math.floor(date.getMonth() / 3);
date.setMonth(q * 3 + 2);
```
Chart.js ruft `startOf` intern auf. Durch unsere `afterBuildTicks`-Overrides ist die Auswirkung gering,
aber Konsistenz ist wichtig.

#### Datei 3: `assets/js/fw-chart-engine/core/FwDateUtils.js` (1× Dead-Code-Konsistenz)

**3a) getBopAnchor('QUARTERLY') (Zeile 60):**
```javascript
// ALT:
if (rhythm === 'QUARTERLY') return Date.UTC(y, Math.floor(m / 3) * 3, 1, 12, 0, 0);
// NEU:
if (rhythm === 'QUARTERLY') return Date.UTC(y, Math.floor(m / 3) * 3 + 2, 1, 12, 0, 0);
```
**Dead Code** — die No-Q-Policy in BarChartStrategy remapped QUARTERLY→MONTHLY. Trotzdem
aktualisieren für Konsistenz (falls jemand getBopAnchor direkt aufruft).

### NICHT betroffen (mit Begründung)

| Datei | Warum kein Change |
|---|---|
| `FwDateUtils.getSnapshotSnap()` | Snappt HY/Q/M auf 1. des Monats → korrekt (Dez 31→Dez 1, nah am Dez-Tick) |
| `BarChartStrategy._transformHistoryView()` | No-Q-Policy (`MONTHLY` BOP) positioniert Bars bereits auf Mär/Jun/Sep/Dez. |
| `LineChartStrategy.transform()` | Delegiert an `getSnapshotSnap`. Kein Change. |
| `FwSmartTooltips` | Liest `_originalDate`, unabhängig von Tick-Positionen. |
| `FwSmartYAxis` | Komplett unberührt. |
| `FwRenderer._renderControls()` | Range-Buttons filtern nach Zeitspanne, nicht nach Tick-Monaten. |
| MONTHLY stepSize=3 (Mobile) | Eigener `case 'month'`-Zweig im Filter, nicht `case 'quarter'`. |

### Spec-Update (bereits durchgeführt, vor Code-Änderung)

`docs/spec/Charts Ticks und Label_v12.md`:
- §3.1 Beispiel: Jan → **Mär**. §3.2 Beispiel: Jan '24 → **Mär '24**. §3.3 Beispiel: Jan '24 → **Mär '24**.
- §3.4: HALF_YEARLY stepSize 1→2, Begründung komplett neu.
- §7.3: "nahe Jul-Tick"→"nahe Jun-Tick", "nahe Apr-Tick"→"direkt auf Mär-Tick".
- **Neuer §3.6 "Quarter-End Convention"** mit Tabelle, Begründung, Implementierungsformel.

### Regressions-Analyse

**Warum das sicher ist:**
1. **Bars treffen ihre Ticks:** CSVs haben Q-End-Daten (31.03, 30.06). No-Q-Policy snappt Bars auf
   1. Mär, 1. Jun etc. Neue Ticks bei Mär/Jun/Sep/Dez → Bars und Ticks aligned (vorher 2 Monate Offset!).
2. **Lines treffen ihre Ticks:** `getSnapshotSnap` → 1. des Monats. Neue Ticks bei Quartalsende →
   Snap-Punkt und Tick auf gleichem Monat.
3. **Kein Seiteneffekt auf MONTHLY (Mobile):** `case 'month'` hat eigenen Filter-Zweig.
4. **Kein Seiteneffekt auf YEARLY:** Eigener Filter `(y % stepSize === 0 && m === 0)`.
5. **HALF_YEARLY Long Duration (>5y):** Wechselt auf `unit: 'year'` → Jan-Ticks, kein Change.

**Einziges Risiko:** `FwDateAdapter.startOf('quarter')` — falls Chart.js intern darauf baut.
Mitigation: Unsere `afterBuildTicks` überschreiben Chart.js-Ticks komplett.

### Testplan

**Visuelle Prüfung (6 Testseiten):**

| Testseite | Prüfpunkte |
|---|---|
| `index.html` | Density Matrix: Quarter-Zeilen zeigen Mär/Jun/Sep/Dez. HY-Zeilen zeigen Jun/Dez. |
| `index_linen_2.html` | 25J Quartals-/HY-Balken: Ticks an Endmonaten, keine Label-Verschiebung. |
| `index_balken_alle.html` | Alle Bar-CSVs: Quartals-Balken aligned mit Mär/Jun/Sep/Dez-Ticks. |
| `index_data_anchored.html` | 3J Quarterly: 12 Ticks bei Mär/Jun/Sep/Dez. |
| `index_irregular_xaxis.html` | HY 4y + 12y: Ticks bei Jun/Dez. Quarterly mit Gap: stabile Kalender-Ticks. |
| `index_irregular_bar_ap13.html` | PERIOD-Track Bar: Quarterly Kalender-Ticks an Endmonaten. |

**Kritische Regressionscheck:**

| Was | Erwartung |
|---|---|
| YEARLY Bar/Line (beliebige CSV) | Unverändert: Ticks bei Jan (unit=year, eigener Filter) |
| MONTHLY Line Desktop | Unverändert: Ticks jeden Monat (unit=month, stepSize=1) |
| MONTHLY Line Mobile (Zone S) | Unverändert: Ticks alle 3 Monate Jan/Apr/Jul/Okt (unit=month, case 'month', stepSize=3) |
| WEEKLY/DAILY | Unverändert: Eigene Tabellen, eigene Filter |
| Tooltips (alle Rhythmen) | Korrekte Datumsanzeige (_originalDate unberührt) |
| Range-Buttons | Funktionieren wie bisher (filterRows unberührt) |
| Y-Achse | Unberührt |

**Test-CSVs:**
- `bd_asset_quartalsweise_25y.csv` (100 Punkte, Q-End-Daten)
- `snap_period_quarterly_3y.csv` (12 Punkte, Q-End-Daten)
- `irregular_quarterly_one_gap.csv` (11 Punkte mit Lücke, Q-Start-Daten → Sonderfall!)
- `bd_asset_halbjaehrlich_25y.csv` (50 Punkte, Jun/Dez)
- `snap_period_half_yearly_4y.csv` (8 Punkte, Jun/Dez)
- `snap_period_half_yearly_12y.csv` (24 Punkte, Jun/Dez)

**Sonderfall `irregular_quarterly_one_gap.csv`:** Enthält Q-**Start**-Daten (Jan 1, Apr 1, Jul 1, Oct 1).
Nach dem Fix landen Ticks auf Mär/Jun/Sep/Dez, Bars via MONTHLY-BOP auf Jan/Apr/Jul/Okt.
2-Monats-Offset — bewusst akzeptiert als Edge-Case-Dokumentation. CSV bleibt unverändert.

---

## AP-19: PERIOD_TABLES DRY-Refactoring — PERIOD_BASE extrahieren — OFFEN

**Gemeldet:** 2026-02-27 | **Priorität:** Mittel (Wartbarkeit) | **Aufwand:** Klein | **Abhängigkeit:** Nach AP-18

### Problem

Die `PERIOD_TABLES` in `FwSmartXAxis.js` haben ein **DRY-Problem**. Die Rhythm-Overrides
(DAILY, WEEKLY, HALF_YEARLY, YEARLY) kopieren jeweils die gemeinsamen Zeilen
(month → quarter → year) anstatt sie aus einer Basis-Tabelle zu erben.

**Kontrast:** Die SNAPSHOT-Seite hat das sauber gelöst — `SNAPSHOT_BASE` als gemeinsame
Basis, Overrides per Spread (`[...spezifischeZeilen, ...SNAPSHOT_BASE]`).

Die PERIOD-Seite konnte das ursprünglich nicht, weil `PERIOD_TABLES.DEFAULT` eine
**Zone-Map** ist (`{ S: PERIOD_TABLE_S, M: PERIOD_TABLE_M, L: PERIOD_TABLE_L }`),
keine flache Tabelle. Die Overrides (YEARLY, HALF_YEARLY) waren anfangs wenige Zeilen.
Mit AP-17 (DAILY, WEEKLY) und AP-18 (HALF_YEARLY stepSize-Änderung) sind es jetzt
**5 Overrides mit insgesamt ~25 duplizierten Zeilen**. Das ist nicht wartbar.

### IST-Zustand (nach AP-17 + AP-18)

```javascript
// SNAPSHOT-Seite (sauber — DAS ist das Vorbild):
const SNAPSHOT_BASE = [
  { maxYears: 1.5,      unit: 'month',   stepSize: { S: 3, M: 1, L: 1 }, mode: 'MONTH' },
  { maxYears: 5.0,      unit: 'quarter', stepSize: 1,                      mode: 'QUARTER' },
  { maxYears: 10.0,     unit: 'year',    stepSize: 1,                      mode: 'YEAR' },
  { maxYears: Infinity, unit: 'year',    stepSize: 5,                      mode: 'YEAR' }
];
const SNAPSHOT_TABLES = {
  DEFAULT: SNAPSHOT_BASE,
  DAILY:  [ ...dailyZeilen, ...SNAPSHOT_BASE ],  // Nur 2 eigene Zeilen
  WEEKLY: [ ...weeklyZeile,  ...SNAPSHOT_BASE ],  // Nur 1 eigene Zeile
  // etc.
};

// PERIOD-Seite (DRY-Problem — jeder Override kopiert die Tail-Zeilen):
const PERIOD_TABLES = {
  DEFAULT: { S: PERIOD_TABLE_S, M: PERIOD_TABLE_M, L: PERIOD_TABLE_L },
  DAILY: [
    { unit: 'day', ... },          // ← eigene Zeile
    { unit: 'day', ... },          // ← eigene Zeile
    { unit: 'week', ... },         // ← KOPIE aus DEFAULT
    { unit: 'month', ... },        // ← KOPIE aus DEFAULT
    { unit: 'quarter', ... },      // ← KOPIE aus DEFAULT
    { unit: 'year', stepSize:1 },  // ← KOPIE aus DEFAULT
    { unit: 'year', stepSize:5 },  // ← KOPIE aus DEFAULT
  ],
  WEEKLY: [
    { unit: 'week', ... },         // ← eigene Zeile
    { unit: 'month', ... },        // ← KOPIE
    { unit: 'quarter', ... },      // ← KOPIE
    { unit: 'year', stepSize:1 },  // ← KOPIE
    { unit: 'year', stepSize:5 },  // ← KOPIE
  ],
  // HALF_YEARLY, YEARLY analog
};
```

### SOLL-Zustand

```javascript
// PERIOD_BASE: Gemeinsame Tail-Zeilen (month → quarter → year), Zone-aware via format-Maps.
const PERIOD_BASE = [
  { maxYears: 1.0,     unit: 'month',   stepSize: 1, mode: 'MONTH',    format: { S: 'MMM', M: 'MMM', L: "MMM 'yy" } },
  { maxYears: 5.0,     unit: 'quarter', stepSize: 1, mode: 'QUARTER',  format: { S: 'MMM', M: "MMM 'yy", L: "MMM 'yy" } },
  { maxYears: 10.0,    unit: 'year',    stepSize: 1, mode: 'YEAR',     format: 'yyyy' },
  { maxYears: Infinity, unit: 'year',   stepSize: 5, mode: 'YEAR',     format: 'yyyy' }
];

const PERIOD_TABLES = {
  DEFAULT: { S: PERIOD_TABLE_S, M: PERIOD_TABLE_M, L: PERIOD_TABLE_L },
  DAILY: [
    { maxYears: 0.04, unit: 'day', stepSize: { S:3, M:1, L:1 }, mode: 'DAILY', format: { S:'d.M.', M:'d. MMM', L:'d. MMM' } },
    { maxYears: 0.25, unit: 'day', stepSize: { S:14, M:7, L:7 }, mode: 'DAILY', format: { S:'d.M.', M:'d. MMM', L:'d. MMM' } },
    { maxYears: 0.25, unit: 'week', stepSize: 1, mode: 'WEEKLY', format: { S:'d.M.', M:'d. MMM', L:'d. MMM' } },
    ...PERIOD_BASE
  ],
  WEEKLY: [
    { maxYears: 0.25, unit: 'week', stepSize: 1, mode: 'WEEKLY', format: { S:'d.M.', M:'d. MMM', L:'d. MMM' } },
    ...PERIOD_BASE
  ],
  HALF_YEARLY: [
    { maxYears: 5.0, unit: 'quarter', stepSize: 2, mode: 'HALF_YEAR', format: { S:'MMM', M:"MMM 'yy", L:"MMM 'yy" } },
    ...PERIOD_BASE.filter(r => r.unit === 'year')  // Nur year-Zeilen, quarter wird ersetzt
  ],
  YEARLY: [
    ...PERIOD_BASE.filter(r => r.unit === 'year')
  ]
};
```

### Design-Entscheidungen

1. **PERIOD_BASE ist eine flache Tabelle**, nicht eine Zone-Map. Zone-Awareness über polymorphe
   `format`- und `stepSize`-Felder (wie SNAPSHOT_BASE). `_getDensityMatrix` löst Zone-Maps
   bereits auf (Zeile 382–386).

2. **DEFAULT bleibt als Zone-Map.** Die drei PERIOD_TABLE_{S,M,L} bleiben unverändert — sie sind
   die Spec-konforme Darstellung (§3.1–§3.3) und werden von der Spec-Dokumentation referenziert.
   DEFAULT ist der Fallback für unbekannte Rhythmen.

3. **`PERIOD_BASE.filter(r => r.unit === 'year')`** für HALF_YEARLY und YEARLY — diese Overrides
   ersetzen die quarter/month-Zeilen durch eigene Logik. Nur die year-Tail-Zeilen werden geteilt.

4. **Keine Verhaltensänderung.** Das Refactoring ändert ausschließlich die interne Struktur.
   Alle Density-Matrix-Lookups liefern identische Ergebnisse. Testbar durch Vorher/Nachher-Vergleich
   aller Rhythmus×Zone×Duration-Kombinationen.

### Betroffene Dateien

| Datei | Was |
|---|---|
| `FwSmartXAxis.js` | PERIOD_TABLES umbauen, PERIOD_BASE extrahieren |

### NICHT betroffen

- SNAPSHOT_TABLES (bereits sauber)
- `_getDensityMatrix()` (polymorphe Auflösung bleibt identisch)
- `afterFit`, `afterBuildTicks` (nutzen `matrix`-Objekt, unabhängig von Tabellenstruktur)
- Alle anderen Dateien

### Testplan

**Automatisierbar:** Für jeden Rhythmus (6) × jede Zone (3) × jede Duration-Stufe (alle maxYears-Grenzen):
`_getDensityMatrix(duration, zone, rhythm, 'PERIOD')` muss vor und nach Refactoring identisch sein.

**Visuell (Stichproben):**
- `snap_period_daily_7d.csv` (DAILY Bar)
- `snap_period_weekly_3m.csv` (WEEKLY Bar)
- `bd_asset_quartalsweise_25y.csv` (QUARTERLY Bar, nach AP-18)
- `bd_asset_halbjaehrlich_25y.csv` (HALF_YEARLY Bar)
- `bd_asset_jaehrlich_25y.csv` (YEARLY Bar)
- Beliebige MONTHLY-CSV (DEFAULT-Pfad)

### Reihenfolge-Begründung

**Nach AP-18, vor CSS-5.** AP-18 ändert HALF_YEARLY-Einträge in denselben Tabellen.
Refactoring gegen eine sich ändernde Struktur ist riskant. Nach AP-18 sind alle 6 Rhythmen
in beiden Tracks final — dann ist der richtige Zeitpunkt für strukturelles Aufräumen.

---

## Empfohlene Reihenfolge

```
Phase 1 – Pflicht (vor Theme-Bau):                      KOMPLETT ✅
  AP-1  Script-Tag (Security+Performance)                ✅
  AP-2  Security Code (URL+Renderer)                     ✅
  AP-4  Spec-Defekt Zone M                               ✅
  AP-3  Pre-Launch-Klärungen abschließen                 ✅

Phase 2 – Wertvoll (parallel zum Theme-Bau möglich):     KOMPLETT ✅
  AP-5      BI kleine Tasks (Farben, Labels)              ✅
  AP-6a     BAN-Headline (Grundgerüst)                    ✅
  AP-6a.1+2 BAN Container-Styling + Dynamik               ✅
  AP-6b     A11y-Tabellen                                 ✅

Phase 3 – Aufräumen (vor Launch):                           (AP-6c 🟡)
  AP-9  Regression 4: X-Achse WEEKLY < 1 Jahr                ✅
  AP-10 Data-Anchored Ticks QUARTERLY/MONTHLY                ✅
  AP-11 Range-Button bei <2 Datenpunkten ausblenden          ✅
  AP-12 SNAPSHOT Kalender-Ticks Q/M (Line)                   ✅
  AP-13 PERIOD-Track irreguläre Bar-Charts                   ✅
  AP-6c Touch-Test                                           🟡 DevTools-OK
  AP-7  Architektur-Prüfpunkte                               ✅
  AP-8  Feature-Triage                                       ✅

Phase 3b – Vordringlich (vor CSS-5):
  AP-14 SNAPSHOT Universal Snap ("Tag ist egal")              ✅ (durch AP-15 gelöst)
  AP-15 SNAPSHOT X-Achse Neudesign                            ✅

Phase 3c – UX-Korrekturen:
  AP-16 Range-Button-Semantik PERIOD                          ✅
  AP-17 Bar-Balken an Rändern abgeschnitten (WEEKLY)          ✅
  AP-18 Quarter-End Tick-Monate (Finanzindustrie-Standard)    ✅
  AP-19 PERIOD_TABLES DRY-Refactoring (PERIOD_BASE)           ⬜ (nach AP-18)
  AP-20 SNAPSHOT autoSkip Screen S                             ⬜

Phase 4 – CSS & Design (DEV-TIME):
  CSS-2  screen.css neu strukturieren                            ✅
  CSS-3  KDR-14 CSS-Variables Bridge                             ✅
  CSS-5  Verifikation und Abschluss

Phase 5 – PRE-LAUNCH (Theme bauen & ausliefern):
  TMPL-1  Ghost-Templates schreiben (inkl. SEO/OG/Twitter/Schema.org/RSS)
  CSS-7   Asset-Einbindung in Templates prüfen
  QA-1    Integration & QA (GScan, Responsive, SEO, Schema.org, OG, Twitter)
  CSS-6   Tailwind einrichten + Production-Build
  AUDIT-P Performance-Audit
  AUDIT-S Security-Audit
  DEPLOY  ZIP-Paket, Upload, Smoke-Test

Phase 6 – GHOST-SETUP (Ghost-Instanz konfigurieren, nach Deploy):
  GHOST-1   Clicky Analytics (Code Injection)
  GHOST-2   VG-Wort Snippet-Vorlage
  GHOST-3   VG-Wort Bulk-Workflow (200 Artikel)
  GHOST-4   OG-Default-Bilder hochladen
  GHOST-5   FAQPage Schema-Snippet
  GHOST-6   robots.txt + Sitemap prüfen & einreichen
  GHOST-7   Webmention.io einrichten (optional)

Redaktionell – Separates LLM erstellt Redakteurs-Handbuch:
  → URL-Strategie, FAQ-Standard, Content-Struktur (GEO)
  → Autoren-Bio, About-Seite, Impressum, Datenschutz (E-E-A-T)
  → dateModified pflegen, VG-Wort Nachmeldung
```

---

## Phase 4 — CSS-System & Theme-Integration (2026-02-19)

**Quelle:** Architektur-Briefing "Ghost-Theme CSS-System" (Senior Architekt, 2026-02-19).
**Kern-Problem:** Brand-Farbe "Petrol" (#218380) existiert an drei Stellen
(screen.css, FwTheme.js, Tailwind-Config). Ziel: Nur noch screen.css `:root`
kennt Hex-Werte. Alle anderen lesen dort nach.

**Sieben Architektur-Entscheidungen (E1–E7) — finale Entscheidungen, nicht verhandelbar:**
- E1: Tailwind CLI statt CDN (~15 KB statt 3,5 MB)
- E2: CSS Custom Properties als einzige Farb-Wahrheit (= KDR 14)
- E3: Container-Typ + CLS-Schutz (kein `contain: layout`!)
- E4: Eine screen.css, sieben Abschnitte
- E5: Fonts lokal (bereits umgesetzt)
- E6: Eine Tailwind-Config
- E7: Chart-Engine nur in `post.hbs`

**Abhängigkeits-Graph:**
```text
DEV-TIME:   CSS-2 ✅ → CSS-3 ✅ (Bridge) → CSS-5 (Verifikation)
PRE-LAUNCH: TMPL-1 → CSS-7 → QA-1 → CSS-6 (Tailwind) → AUDIT-P + AUDIT-S → DEPLOY
```
Strikt sequenziell innerhalb jeder Phase. PRE-LAUNCH beginnt nach CSS-5.

### CSS-1: Gestrichen (2026-02-23)

Tailwind-Config ist kein Dev-Fundament — gehört zum Production-Build.
Scope vollständig in CSS-6 aufgegangen. DS-007-Hinweis (Gradient-Farben) dort übernommen.

### CSS-2: screen.css neu strukturieren

**Dauer:** 1 Faden | **Abhängigkeiten:** Keine

| Abschnitt | Inhalt |
|-----------|--------|
| 1. TOKENS | `:root` mit allen Hex-Werten (einzige Stelle!) |
| 2. FONTS | `@font-face` lokal, Pfade `assets/fonts/` |
| 3. BASE | Body, HTML, Resets |
| 4. GHOST CONTENT | Alles unter `.gh-content` |
| 5. CHART HOST | `.financial-chart-module`: `container-type: inline-size`, `container-name: fw-chart`, `min-height: 400px`. **KEIN** `contain: layout` |
| 6. COMPONENTS | `ci-link`, `hover-lift`, Boxen, Listen |
| 7. JANITOR FALLBACK | Nur aktiv wenn Tailwind nicht geladen |

**Löst:** DS-005 (CSS doppelt definiert).

### CSS-3: KDR-14 — CSS-Variables Bridge ✅ (2026-02-25)

**Erledigt.** FwTheme V5.0.0 mit `init()` Bridge. 10 Engine-Dateien tokenisiert. 6 neue CSS Custom Properties. Zero-Line Mixed-Sign Guard. FAANG-Review bestanden (0 Blocker).

### CSS-4: Gestrichen (2026-02-19)

Scope aufgeteilt: Template-Schreiben → TMPL-1, Asset-Einbindung → CSS-7.

### CSS-5: Verifikation und Abschluss

**Dauer:** 1 Faden | **Abhängigkeiten:** CSS-3 ✅

| Task | Was |
|------|-----|
| Farb-Audit | Grep `#[0-9A-Fa-f]{3,6}` über alle JS/CSS. Brand → Token, neutral → dokumentieren |
| FAANG-Befund 1 | Hex-Fallbacks in FwSmartTooltips (4×), FwSmartYAxis (2×), FwChartPlugins (2×) — als Defensive Coding akzeptiert, aber dokumentieren warum sie bleiben dürfen |
| FAANG-Befund 4 | FwChartPlugins.js Zeile 56–57: Font-String `"Source Sans Pro"` hardcoded als Fallback. PieChartStrategy übergibt korrekt via `t.fonts.body`, aber Fallback dupliziert den Font-Namen außerhalb SSOT. Entscheidung: Tokenisieren oder als defensiven Fallback dokumentieren |
| DS-Issues schließen | DS-005, DS-006, DS-007 in DESIGN-SYSTEM-ISSUES.md |
| KNOWN-ISSUES | Alle 5 CSS-Pakete als erledigt markieren |
| working-features.md | Regressions-Check: jeden Feature-Punkt gegen aktuellen Stand halten. Ergebnis dokumentieren (auch "alles unverändert"). Abweichung → neuer Bug |
| Definition of Done | 8 Checkpoints (siehe KNOWN-ISSUES.md CSS-5) |

---

## Phase PRE-LAUNCH — Theme bauen & produktionsreif machen (2026-02-23)

**Zeitpunkt:** Nach allen Dev-Time-Paketen (CSS-5 ✅), vor erstem Go-Live.
**Reihenfolge:** Templates → Asset-Prüfung → QA → Production-Build → Audits → Deploy.

### TMPL-1: Ghost-Templates schreiben

**Dauer:** 2–3 Fäden | **Abhängigkeiten:** CSS-5 ✅ (screen.css fertig, Tokens verifiziert)

**Quelle:** Ghost-Theme-Schlachtplan (P-1, P-2, P-4, P-5, P-7 technisch).
TMPL-1 umfasst nicht nur die Template-Dateien, sondern auch deren **vollständigen
`<head>`-Inhalt** (SEO-Meta, Open Graph, Twitter Cards, Schema.org JSON-LD,
RSS-Link, Webmentions). Alles, was im Template-Code steht, gehört hierher.

#### Datei-Inventar

| Task | Was |
|------|-----|
| package.json | Ghost-Theme Pflichtfelder (`name`, `version`, `engines.ghost-api`) |
| default.hbs | HTML-Rahmen, Head (inkl. SEO/OG/Twitter/Schema.org), Body, `{{ghost_head}}` / `{{ghost_foot}}` |
| partials/header.hbs | Navigation + Logo |
| partials/footer.hbs | Footer + Copyright + Impressum/Datenschutz-Links |
| partials/post-card.hbs | Vorschau-Karte für Postlisten |
| partials/pagination.hbs | Blätterfunktion (älter/neuer) |
| index.hbs | Startseite / Postliste |
| post.hbs | Einzelner Artikel (**Kernstück: Chart-Integration + BlogPosting JSON-LD**) |
| page.hbs | Statische Seiten (Impressum, Datenschutz etc.) — ohne Chart-Engine, ohne `datePublished` |
| tag.hbs | Tag-Archivseite mit Tag-Description |
| author.hbs | Autorenseite mit Schema.org Person-Microdata (**E-E-A-T-Fundament**) |
| error.hbs | Fehlerseite (404, 500) |

#### default.hbs `<head>` — Pflichtinhalte

Reihenfolge im `<head>` ist bindend:

```
1. <meta charset="utf-8">
2. <meta name="viewport" ...>
3. SEO-Meta (title, description, canonical) — VOR {{ghost_head}}
4. Open Graph Tags
5. Twitter/X Card Tags
6. BreadcrumbList JSON-LD
7. RSS <link rel="alternate">
8. Webmention <link rel="webmention"> (optional, empfohlen)
9. {{ghost_head}} — Ghost-Automatik (darf NICHT fehlen)
10. <link rel="stylesheet" href="{{asset 'css/screen.css'}}">
```

**SEO-Meta (P4-AP1):**

```handlebars
<title>{{meta_title}} — {{@site.title}}</title>
<meta name="description" content="{{meta_description}}">
<link rel="canonical" href="{{canonical_url}}">
```

Fallback-Logik: Ghost füllt `meta_title`/`meta_description` aus Post-Settings.
Leer → Ghost zieht Post-Titel bzw. Excerpt.

**Hinweis:** `{{ghost_head}}` gibt ebenfalls einen `<title>` aus. Der explizite
`<title>` vor `{{ghost_head}}` hat Vorrang im Browser (erster `<title>` gewinnt).
Dadurch wird das Site-Title-Suffix (`— {{@site.title}}`) erzwungen, das Ghost
standardmäßig nicht anhängt.

**Open Graph (P4-AP2):**

```handlebars
<meta property="og:type" content="{{#is 'post'}}article{{else}}website{{/is}}">
<meta property="og:title" content="{{og_title}}">
<meta property="og:description" content="{{og_description}}">
<meta property="og:url" content="{{url absolute='true'}}">
<meta property="og:site_name" content="{{@site.title}}">
<meta property="og:image" content="{{#if og_image}}{{og_image}}{{else if feature_image}}{{feature_image}}{{else}}{{@site.cover_image}}{{/if}}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
{{#is 'post'}}
  <meta property="article:published_time" content="{{date format='YYYY-MM-DDTHH:mm:ssZ'}}">
  <meta property="article:modified_time" content="{{updated_at format='YYYY-MM-DDTHH:mm:ssZ'}}">
  {{#primary_tag}}<meta property="article:tag" content="{{name}}">{{/primary_tag}}
{{/is}}
```

**Twitter/X Card (P4-AP3):**

```handlebars
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{twitter_title}}">
<meta name="twitter:description" content="{{twitter_description}}">
<meta name="twitter:image" content="{{#if twitter_image}}{{twitter_image}}{{else if feature_image}}{{feature_image}}{{else}}{{@site.cover_image}}{{/if}}">
```

**BreadcrumbList JSON-LD (P5-AP2):**

```handlebars
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "{{@site.title}}",
    "item": "{{@site.url}}"
  }{{#is 'post'}},{
    "@type": "ListItem",
    "position": 2,
    "name": "{{title}}",
    "item": "{{url absolute='true'}}"
  }{{/is}}]
}
</script>
```

**RSS-Feed sichtbar machen (P7-AP4):**

```handlebars
<link rel="alternate" type="application/rss+xml" title="{{@site.title}}" href="{{@site.url}}/rss/">
```

**Webmentions (P7-AP5, optional aber empfohlen):**

```handlebars
<link rel="webmention" href="https://webmention.io/DOMAIN/webmention">
<link rel="pingback" href="https://webmention.io/DOMAIN/xmlrpc">
```

**⚠️ User-Aktion erforderlich:** Webmention.io-Account anlegen (kostenlos),
Domain verifizieren. LLM soll User nach Domain fragen und `DOMAIN` ersetzen.

#### post.hbs — Pflichtinhalte

**Microdata auf `<article>` (P2-AP1):**

```handlebars
{{!< default}}
{{#post}}
<article class="gh-article" itemscope itemtype="https://schema.org/BlogPosting">
  <header>
    <h1 itemprop="headline">{{title}}</h1>
    <time datetime="{{date format='YYYY-MM-DD'}}" itemprop="datePublished">
      {{date format="DD. MMMM YYYY"}}
    </time>
    {{#primary_author}}
      <span itemprop="author" itemscope itemtype="https://schema.org/Person">
        <a href="{{url}}" itemprop="url">
          <span itemprop="name">{{name}}</span>
        </a>
      </span>
    {{/primary_author}}
  </header>
  <section class="gh-content" itemprop="articleBody">
    {{content}}
  </section>
</article>
{{/post}}
```

**BlogPosting JSON-LD (P5-AP1) — direkt nach `{{#post}}`:**

```handlebars
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {"@type": "WebPage", "@id": "{{url absolute='true'}}"},
  "headline": "{{title}}",
  "description": "{{meta_description}}",
  "image": "{{#if feature_image}}{{feature_image}}{{/if}}",
  "author": {
    "@type": "Person",
    "name": "{{primary_author.name}}",
    "url": "{{primary_author.url absolute='true'}}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "{{@site.title}}",
    "logo": {"@type": "ImageObject", "url": "{{@site.icon}}"}
  },
  "datePublished": "{{date format='YYYY-MM-DDTHH:mm:ssZ'}}",
  "dateModified": "{{updated_at format='YYYY-MM-DDTHH:mm:ssZ'}}",
  "wordCount": "{{reading_time}}",
  "inLanguage": "de-DE"
}
</script>
```

**Chart-Engine (E7: nur in post.hbs, nicht in page.hbs):**

```handlebars
<script defer src="{{asset 'js/vendor/chart.umd.min.js'}}"></script>
<script type="module" src="{{asset 'js/fw-chart-engine/core/ChartEngine.js'}}"></script>
```

Reihenfolge bindend: Chart.js VOR Engine.

#### page.hbs — Pflichtinhalte

Wie post.hbs, aber:
- **Keine** Chart-Engine-Einbindung (statische Seiten enthalten keine Finanz-Charts)
- **Keine** `datePublished`-Anzeige (nach Bedarf)
- `fw-janitor.js` einbinden (Boxen, Check/Warn-Listen)

#### author.hbs — E-E-A-T-Fundament (P2-AP3)

```handlebars
{{!< default}}
{{#author}}
<div class="author-profile">
  {{#if profile_image}}
    <img src="{{profile_image}}" alt="{{name}}" width="120" height="120">
  {{/if}}
  <h1>{{name}}</h1>
  <p>{{bio}}</p>
  {{#if website}}<a href="{{website}}" rel="me">Website</a>{{/if}}
  {{#if location}}<span>{{location}}</span>{{/if}}
</div>
<section class="author-posts">
  {{#foreach posts}}
    {{> "post-card"}}
  {{/foreach}}
</section>
{{/author}}
```

**⚠️ User-Aktion erforderlich:** LLM soll User auffordern, in Ghost Admin → Staff
sein Profil vollständig auszufüllen:
- Profilbild (quadratisch, min. 400×400 px)
- Bio (2–4 Sätze, Expertise klar benennen)
- Website-URL (LinkedIn oder persönliche Website)
- Location

#### tag.hbs (P2-AP4)

Standard-Listing-Template mit Tag-Description. Wichtig für interne Verlinkung
und SEO (Tag-Seiten als Kategorie-Hubs).

#### partials/footer.hbs

Muss Links zu Impressum und Datenschutz enthalten.
Schema.org `WebSite`-Block mit `legalName` referenzieren (P7-AP3).

**Tailwind CDN zum Testen erlaubt** — wird in CSS-6 durch lokalen Build ersetzt.
**Details:** → THEME-ASSEMBLY-CHECKLIST.md, Phase 2.

### CSS-7: Asset-Einbindung in Templates prüfen

**Dauer:** ½ Faden | **Abhängigkeiten:** TMPL-1 ✅

Kein Template-Schreiben — nur Verifikation, dass alle Assets korrekt eingebunden sind.

| Prüfpunkt | Erwartung |
|-----------|-----------|
| screen.css | Via Ghost `{{asset 'css/screen.css'}}` in default.hbs |
| Fonts | Keine Google Fonts, keine externen Quellen |
| Chart.js | `defer` in post.hbs: `{{asset 'js/vendor/chart.umd.min.js'}}` |
| Chart-Engine | `type="module"` in post.hbs, **nach** Chart.js (Reihenfolge bindend) |
| fw-janitor.js | Eingebunden auf allen Content-Seiten (post.hbs, page.hbs) |
| Asset-Struktur | Alle Pfade korrekt: `assets/css/`, `assets/js/vendor/`, `assets/js/fw-chart-engine/`, `assets/js/fw-janitor.js`, `assets/fonts/` |

### QA-1: Integration & QA

**Dauer:** 1–2 Fäden | **Abhängigkeiten:** CSS-7 ✅

**Quelle:** Bestehende Checkliste + Ghost-Theme-Schlachtplan PRE-LAUNCH.

| Task | Was |
|------|-----|
| GScan-Validierung | https://gscan.ghost.org — keine fatalen Fehler, Warnungen geprüft |
| Chart-Test | Line, Bar, Pie rendern korrekt in Ghost-Content (`div.financial-chart-module`) |
| Responsive Desktop | ≥1024px — Layout + Charts korrekt |
| Responsive Tablet | 768px — Layout + Charts korrekt |
| Responsive Mobile | ≤480px — Layout + Charts korrekt |
| SEO-Check | `{{meta_title}}`, `{{ghost_head}}`, semantisches HTML, `alt`-Attribute, Viewport-Meta |
| Schema.org-Validierung | https://validator.schema.org — BlogPosting + BreadcrumbList valide |
| OG-Tags-Validierung | https://opengraph.xyz — OG-Bild, Titel, Description korrekt |
| Twitter-Card-Validierung | https://cards-dev.twitter.com/validator — Summary Large Image korrekt |
| RSS-Feed prüfen | `/rss/` erreichbar, `<link rel="alternate">` im Quelltext |
| robots.txt prüfen | AI-Crawler erlaubt (GPTBot, PerplexityBot, ClaudeBot, GoogleOther), Sitemap-URL korrekt |
| Sitemap prüfen | `/sitemap.xml` enthält alle geplanten Seiten, in Search Console eingereicht |

**Details:** → THEME-ASSEMBLY-CHECKLIST.md, Phase 3.

### CSS-6: Tailwind Production-Build

**Dauer:** 1 Faden | **Abhängigkeiten:** QA-1 ✅ (erst nach erfolgreichem Test mit CDN)

| Task | Was |
|------|-----|
| package.json | `tailwindcss` als devDependency, `build:css` Script |
| tailwind.config.js | CSS-Variablen-Ansatz, content-Array auf `.hbs` + `fw-janitor.js` |
| src/input.css | Drei Tailwind-Direktiven (`@tailwind base/components/utilities`) |
| CDN entfernen | Kein `cdn.tailwindcss.com` in keiner Datei |
| Inline-Configs entfernen | Kein `tailwind.config`-Block in HTML-Dateien |
| homepage-demo.html | CDN-Tag + Inline-Config entfernen, Link auf lokale screen.css |
| Build-Test | `npm run build:css` fehlerfrei, Output < 30 KB |
| User-Aktion | `npm install` einmalig im Terminal (User, nicht Claude) |

**Hinweis:** CSS-6 enthält den vollständigen Tailwind-Scope (Config + Build). Das alte CSS-1
(Tailwind-Config als Dev-Fundament) wurde gestrichen — Config und Build gehören zusammen,
und beides passiert erst wenn Templates stabil sind und QA bestanden ist.
**DS-007:** `purpur.gradient-light` und `purpur.gradient-medium` nicht in Tailwind-Config aufnehmen.

### AUDIT-P: Performance-Audit

**Dauer:** 1 Faden | **Abhängigkeiten:** CSS-6 ✅ (parallel zu AUDIT-S möglich)

15 Checkpoints in 4 Gruppen: Asset-Optimierung, Ladezeit & Rendering,
Caching & Delivery, Messungen (Lighthouse ≥90 Desktop, ≥75 Mobile, LCP < 2,5s, CLS < 0,1).

**Details:** → THEME-ASSEMBLY-CHECKLIST.md, Phase 4A.

### AUDIT-S: Security-Audit

**Dauer:** 1 Faden | **Abhängigkeiten:** CSS-6 ✅ (parallel zu AUDIT-P möglich)

21 Checkpoints in 5 Gruppen: Eingabe-Validierung, CSP-Header,
CSV-Fetch-Sicherheit, Redakteurs-Sicherheit, Theme-Härtung, Dependency-Check.

**Details:** → THEME-ASSEMBLY-CHECKLIST.md, Phase 4B.

### DEPLOY: Deployment

**Dauer:** ½ Faden | **Abhängigkeiten:** AUDIT-P ✅, AUDIT-S ✅

| Task | Was |
|------|-----|
| ZIP-Paket | Ohne: `data/`, `docs/`, `index*.html`, `.git/`, `.claude/`, `src/` |
| Upload | Ghost Admin → Settings → Design → Change theme |
| Aktivieren | Theme aktivieren |
| Smoke-Test | Startseite, ein Artikel mit Chart, eine statische Seite |
| Screenshots | Desktop + Mobile für `package.json` |

---

## Phase GHOST-SETUP — Ghost-Instanz konfigurieren (nach Deploy)

**Zeitpunkt:** Nach DEPLOY (Theme aktiv in Ghost), vor redaktionellem Go-Live.
**Quelle:** Ghost-Theme-Schlachtplan P-3 (Tracker), P-1 (robots.txt/Sitemap),
P-4 (OG-Default-Bilder), P-5 (FAQ-Snippet).
**Hinweis:** Diese Tasks sind Ghost-Admin-Aktionen, kein Template-Code.
Sie brauchen eine laufende Ghost-Instanz mit aktivem Theme.

### GHOST-1: Clicky Analytics einrichten

**Dauer:** 10 Minuten | **Abhängigkeiten:** DEPLOY ✅
**Art:** Ghost Admin Code Injection (kein Template-Code)

Clicky wird über Ghost Admin → Settings → Advanced → **Site Footer Code Injection** eingebaut:

```html
<!-- Clicky Analytics -->
<script async data-id="DEINE-CLICKY-ID" src="//static.getclicky.com/js"></script>
```

**⚠️ User-Aktion erforderlich:** LLM fragt nach Clicky-Site-ID
(Clicky-Account → Websites → Site-Einstellungen).

**Datenschutz:** Clicky ohne Cookies betreiben (Clicky-Settings: „Cookies deaktivieren").
In Datenschutzerklärung dokumentieren. → Redaktionelle Schnittstelle.

**Verifikation:** Clicky Dashboard → Echtzeit → eigene Seitenaufrufe sichtbar.

### GHOST-2: VG-Wort Snippet-Vorlage anlegen

**Dauer:** 10 Minuten | **Abhängigkeiten:** DEPLOY ✅
**Art:** Ghost Admin Snippet

In Ghost Admin → Settings → **Snippets** eine Vorlage erstellen:

```
Name: VG-Wort Zählmarke
Inhalt:
<img src="https://vg08.met.vgwort.de/na/ZAEHLMARKEN-ID-HIER-ERSETZEN"
     width="1" height="1" alt="" style="display:none;" />
```

Einsatz pro Post: Post Settings → Code Injection → Post Footer → Snippet einfügen.
Beschleunigt das Einsetzen auf ~5 Sekunden pro Artikel.

### GHOST-3: VG-Wort Bulk-Workflow (200 Artikel)

**Dauer:** 1 Faden | **Abhängigkeiten:** GHOST-2 ✅
**Art:** Workflow + optionales Script

**Schritt 1 — Zählmarken bestellen:**
T.O.M. (tom.vgwort.de) → „Zählmarken" → 250+ Marken bestellen (Puffer).
CSV-Export: Zählmarken-ID, öffentlicher Zähler-URL, privater Meldetoken.

**Schritt 2 — Mapping-Tabelle:**

| Artikel-Slug | Zählmarken-ID | Pixel-URL | Status |
|---|---|---|---|
| mein-erster-artikel | abc123 | https://vg08.met.vgwort.de/na/abc123 | ⬜ |

**Schritt 3 — Einsatz:**
- Option A (manuell): Snippet pro Post via Code Injection (bis ~50 Artikel)
- Option B (API): `codeinjection_foot` per Ghost Admin API setzen (ab 50+ Artikel)

```javascript
// Ghost Admin API Bulk-Update
// POST /ghost/api/admin/posts/{id}/
// Body: { "posts": [{ "codeinjection_foot": "<img src='...' ...>" }] }
```

**Schritt 4 — Nachmeldung:**
Jeden Artikel in T.O.M. melden: Titel, Autorenname, URL, Zeichenzahl (> 1.800).

**⚠️ User-Aktion erforderlich:** LLM fragt:
- T.O.M.-Account vorhanden? Zählmarken bestellt?
- Falls ja: CSV-Datei teilen. Falls nein: Registrierung + 250 Marken bestellen.

**Verifikation:** Browser DevTools → Network → img → VG-Wort-Pixel feuert.

### GHOST-4: OG-Default-Bilder hochladen

**Dauer:** 10 Minuten | **Abhängigkeiten:** DEPLOY ✅
**Art:** Ghost Admin Upload

**⚠️ User-Aktion erforderlich:** LLM fragt nach:
1. OG-Default-Bild: **1200×630 px** (Facebook/LinkedIn) — PNG oder JPG
2. Twitter-Default-Bild: **1200×675 px** — kann dasselbe sein, leicht gecroppt

Upload: Ghost Admin → Settings → General → Cover Image.
Diese Bilder werden gezogen, wenn ein Post kein eigenes OG/Twitter-Bild hat
(Fallback-Kette im Template: `og_image` → `feature_image` → `@site.cover_image`).

### GHOST-5: FAQPage Schema-Snippet anlegen

**Dauer:** 10 Minuten | **Abhängigkeiten:** DEPLOY ✅
**Art:** Ghost Admin Snippet

Ghost Admin → Settings → Snippets → „FAQ-Schema":

```html
<!-- FAQ-Schema Snippet: Felder vor Einsatz befüllen -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "FRAGE 1 HIER",
      "acceptedAnswer": {"@type": "Answer", "text": "ANTWORT 1 HIER"}
    }
  ]
}
</script>
```

Einsatz: Post Code Injection → Post Header (pro Post mit FAQ-Sektion).
→ Redaktionelle Schnittstelle: FAQ-Block als Standard in jedem Artikel.

### GHOST-6: robots.txt + Sitemap prüfen

**Dauer:** 15 Minuten | **Abhängigkeiten:** DEPLOY ✅
**Art:** Server-Konfiguration + Verifikation

**robots.txt:** Ghost-Instanz oder Reverse-Proxy muss diese Bots erlauben:

```
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: GoogleOther
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: *
Allow: /
Sitemap: https://DOMAIN/sitemap.xml
```

**⚠️ User-Aktion erforderlich:** LLM fragt:
- „Hast du in deiner Ghost-Instanz oder Reverse-Proxy eine robots.txt, die Bots blockiert?"
- „Bitte rufe `/sitemap.xml` auf und prüfe, ob alle Seiten enthalten sind."

**Sitemap einreichen:** Google Search Console + Bing Webmaster Tools.
Statische Seiten müssen indexierbar sein (Ghost: Settings → Pages → SEO).

### GHOST-7: Webmention.io einrichten (optional)

**Dauer:** 15 Minuten | **Abhängigkeiten:** DEPLOY ✅
**Art:** Externer Dienst + Template (bereits in TMPL-1 vorbereitet)

1. Account auf webmention.io anlegen (kostenlos)
2. Domain verifizieren
3. `DOMAIN` in den Webmention-Links in default.hbs ersetzen

---

## Redaktionelle Schnittstelle — ✅ Erledigt (2026-02-25)

**Status:** Handbuch erstellt → `docs/spec/REDAKTEURS-HANDBUCH Redaktionsleitfaden.md`

Alle 8 Punkte übernommen. URL-Entscheidung: Flach (`domain.de/slug`).
Bestehendes Chart-Integrations-Handbuch wird referenziert, nicht ersetzt.

<details>
<summary>Ursprünglicher Übergabe-Brief (archiviert)</summary>

**Zweck:** Diese Sektion dokumentiert alle Punkte aus dem Ghost-Theme-Schlachtplan
(P-6: GEO, P-7: E-E-A-T teilweise), die **redaktionell** sind — kein Template-Code,
keine Ghost-Admin-Einstellung, sondern Regeln für den Redakteur/Autor.

Ein separates LLM erstellt das Redakteurs-Handbuch. Diese Sektion ist die
**Schnittstelle** zwischen diesem Schlachtplan und dem Redakteurs-Handbuch.

### Was das Redakteurs-Handbuch übernehmen muss

**Aus P-6 (GEO — Generative Engine Optimization):**

1. **Semantische URL-Strategie (P6-AP1):**
   - Slug = Keyword-Phrase, 3–6 Wörter, Deutsch, Bindestriche
   - Kein Datum im Slug (verhindert Evergreen-Aktualisierung)
   - Beispiel: `/etf-sparplan-kosten-vergleich` statt `/post-42`
   - User-Entscheidung offen: Flach (`domain.de/slug`) oder tief (`domain.de/kategorie/slug`)?

2. **FAQ-Block als redaktioneller Standard (P6-AP2):**
   - Jeden Artikel mit FAQ-Sektion am Ende abschließen (4–6 Fragen)
   - FAQ-Schema-Snippet (GHOST-5) konsequent einsetzen
   - Begründung: 25,37 % aller KI-Zitate entfallen auf Listicle/FAQ-Formate

3. **Content-Struktur-Checkliste (P6-AP3):**
   - H1: Keyword-stärkstes Heading
   - H2: Abschnitte mit eigenständigen Fragen/Antworten
   - Mindestens 1 Tabelle oder geordnete Liste pro Artikel
   - FAQ-Sektion am Ende (min. 4 Fragen)
   - Quellenlinks auf Primärquellen (Studien, offizielle Seiten)
   - `reading_time` > 5 Minuten als Qualitätssignal

**Aus P-7 (E-E-A-T) — User-Content:**

4. **Autoren-Bio schreiben (P7-AP1):**
   - 3–5 Sätze, konkrete Expertise (Was, seit wann, womit)
   - 1 externer Verweis (LinkedIn, XING, GitHub)
   - Eingabe in Ghost Admin → Staff → Profil

5. **About-Seite texten (P7-AP2):**
   - Statische Ghost-Seite `/about/`
   - Struktur: Wer bist du? / Worum geht's? / Für wen? / Warum vertrauen?
   - Template liefert Schema.org `AboutPage`-Markup

6. **Impressum & Datenschutz (P7-AP3):**
   - Zwei statische Ghost-Seiten, vollständig indexierbar
   - Im Footer verlinkt (partials/footer.hbs)
   - Mindestangaben Impressum: Name, Adresse, E-Mail, USt-IdNr.
   - DSGVO-konforme Datenschutzerklärung (inkl. Clicky-Dokumentation)

7. **dateModified pflegen (P5-AP4):**
   - Bei Evergreen-Artikeln: Jahreszahl im Titel/H1 (z.B. „[2026]")
   - Bei inhaltlichem Update: Artikel minimal anfassen (Statistik, Link),
     damit Ghost `updated_at` aktualisiert
   - `updated_at` wird automatisch in JSON-LD ausgegeben (BlogPosting)

8. **VG-Wort Nachmeldung (P3-AP3 Schritt 4):**
   - Jeden veröffentlichten Artikel in T.O.M. melden
   - Pflichtfelder: Titel, Autorenname, URL, Zeichenzahl (> 1.800)

### Was das Redakteurs-Handbuch NICHT übernehmen muss

- Template-Code (→ TMPL-1)
- Ghost-Admin-Einstellungen (→ GHOST-SETUP)
- CSS, Engine, Tailwind (→ CSS-*, AUDIT-*)
- Chart-Integration (→ bestehendes REDAKTEURS-HANDBUCH Chart-Integration)

### Bestehende Redakteurs-Dokumentation

- `docs/spec/REDAKTEURS-HANDBUCH Chart-Integration.md` — CSV-Format, HTML-Snippet,
  Attribute, Options-Referenz, CI-Farbpalette. **Bleibt unverändert**, wird vom
  neuen Redakteurs-Handbuch referenziert (nicht ersetzt).

</details>

---

## Phase POST-LAUNCH — Feature-Backlog (2026-02-23)

Aus AP-8 Feature-Triage. Keine Priorität vor Launch.
Jedes Feature hat genug Kontext in KNOWN-ISSUES.md, damit ein zukünftiges LLM
ohne Rückfragen arbeiten kann.

| AP | Feature | Aufwand | Abhängigkeiten |
|----|---------|---------|---------------|
| PL-1 | Einheiten-Anker Y-Achse | Klein–Mittel | Keine |
| PL-2 | Zone Zero (Kurzzeit < 300d) | Mittel | Test-CSVs vorhanden |

**Details:** → KNOWN-ISSUES.md, Abschnitt "Feature-Ideen — Triage", Unterabschnitt "Post-Launch"

---

## Tracking

Nach jedem abgeschlossenen AP wird KNOWN-ISSUES.md aktualisiert:
- Erledigte Punkte → Abschnitt "Geschlossene Housekeeping-Punkte"
- Status-Zeile am Anfang der Datei aktualisieren
- Diese Schlachtplan-Datei: AP als ✅ markieren

| AP | Status |
|----|--------|
| AP-1 | ✅ Erledigt (2026-02-17) — Scope-Korrektur: CDN→lokal, parseInt-Fix |
| AP-2 | ✅ Erledigt (2026-02-17) — Domain-Whitelist (CSVParser), Safe DOM (FwRenderer) |
| AP-3 | ✅ Erledigt (2026-02-17) — Titel-Fallback: Kein Fallback, Performance 3: wartet auf Deploy, Domain-Whitelist: Spec-Update |
| AP-4 | ✅ Erledigt (2026-02-17) — Kein Defekt, Spec und Code korrekt (Falschalarm) |
| AP-5 | ✅ Erledigt (2026-02-18) — Pos/Neg-Farben (Single-Asset Bar), Label-Texte (View-Toggles) |
| AP-6a | ✅ Erledigt (2026-02-18) — BAN-Headline (LineChartStrategy V14.0.0, FwRenderer V5.0.0) |
| AP-6a.1+6a.2 | ✅ Erledigt (2026-02-18) — BAN Container-Styling + Dynamik (UX-Review → 3er-Paket: Container, Hint-Text, Legend-Toggle) |
| AP-6b | ✅ Erledigt (2026-02-19) — A11y-Tabellen in Line/Bar/Pie befüllt (KDR 13 erfüllt) |
| AP-6c | 🟡 DevTools-OK (2026-02-19) — Touch funktioniert in Emulation, echter Geräte-Test vor Launch |
| AP-7 | ✅ Erledigt (2026-02-23) — Alle 3 Prüfpunkte geschlossen: KDR-14 → CSS-3, dispose() → kein Bedarf, Debug-Modus → verworfen |
| AP-8 | ✅ Erledigt (2026-02-23) — Feature-Triage: 2× verworfen, 2× Post-Launch, 2× bereits erledigt, 1× Rest-Fix in CSS-3 |
| AP-9 | ✅ Erledigt (2026-02-23) — Regression 4: Code war bereits in V8.0.0 gefixt, Spec §3.5 + Doku nachgezogen |
| AP-10 | ✅ Erledigt (2026-02-23) — Data-Anchored Ticks QUARTERLY/MONTHLY (FwSmartXAxis V8.5.0, FwDateUtils V4.7.0) |
| AP-11 | ✅ Erledigt (2026-02-23) — Range-Button bei <2 Datenpunkten ausblenden (Catch-All für alle Rhythmen) |
| AP-12 | ✅ Erledigt (2026-02-26/27) — SNAPSHOT: Kalender-Ticks V8.6. PERIOD: → AP-13 |
| AP-13 | ✅ Erledigt (2026-02-27) — PERIOD-Track Kalender-Ticks (FwSmartXAxis V10.0.0). Cursor-basiert, Key-Dedup/Nano/Proximity entfernt. `isRegularInterval()` Dead Code entfernt (FwDateUtils V5.4.0). Extension-Cap in afterFit. Testseite: `index_irregular_bar_ap13.html` (B0–B7, 2 Assets). |
| AP-14 | ✅ Erledigt (2026-02-26) — Durch AP-15 Neudesign obsolet. HALF_YEARLY-Regression (6-Monat-Shift) durch Calendar Snap gelöst. |
| AP-15 | ✅ Erledigt (2026-02-26) — SNAPSHOT Calendar Snap mit _originalDate-Entkopplung. FwDateUtils V5.3.0 (getSnapshotSnap), LineChartStrategy V16.0.0, FwSmartXAxis V9.0.1. Spec §7 aktualisiert. |
| AP-16 | ✅ Erledigt (2026-02-27) — PERIOD/SNAPSHOT-Weiche in filterRows V5.5.0. PERIOD exklusiv (>), SNAPSHOT inklusiv (>=). "NJ" = N Balken bei YEARLY. Strukturbeweis: Trailing Gaps unmöglich. 3 Dateien, 4 Edits. |
| AP-17 | ✅ Erledigt (2026-02-27) — Drei Lücken: detectRhythm PERIOD fehlte WEEKLY, getStepDuration fehlte WEEKLY+DAILY, PERIOD_TABLES fehlte DAILY/WEEKLY-Overrides. FwDateUtils V5.6.0, FwSmartXAxis V10.1.0. AP-19 (DRY-Refactoring) als Folge-AP angelegt. |
| AP-18 | ✅ Erledigt (2026-02-27) — Quarter-End Tick-Monate: Mär/Jun/Sep/Dez für QUARTERLY/HALF_YEARLY. Rhythm-Weiche: MONTHLY/DAILY/WEEKLY behalten Quarter-Start (Jan/Apr/Jul/Okt) bei unit:'quarter' Platzoptimierung. Lesson Learned: FwDateAdapter.startOf('quarter') = Chart.js-API-Vertrag, darf nicht geändert werden. FwSmartXAxis V10.2.0, FwDateUtils (getBopAnchor Konsistenz). 3 Dateien. |
| AP-19 | ⬜ Offen — PERIOD_TABLES DRY-Refactoring: PERIOD_BASE extrahieren (analog SNAPSHOT_BASE). Reines Refactoring, nach AP-18. |
| AP-20 | ⬜ Offen — SNAPSHOT autoSkip Screen S: `autoSkip: true` im SNAPSHOT-Pfad erzeugt erratische Tick-Abstände auf Screen S (< 450px). Vorbestehend, kein AP-18-Defekt. Betrifft alle Rhythmen im Line-Chart-Track. |
| CSS-1 | ⛔ Gestrichen (2026-02-23) → Scope in CSS-6 aufgegangen (Tailwind-Config = Production-Build, kein Dev-Fundament) |
| CSS-2 | ✅ Erledigt (2026-02-19) — screen.css 7 Abschnitte, 4 @font-face (WOFF2-only), CHART HOST, Google Fonts entfernt, alte Font-CSS deprecated |
| CSS-3 | ✅ Erledigt (2026-02-25) — KDR-14 CSS-Variables Bridge (FwTheme V5.0.0, 10 Dateien tokenisiert, 6 CSS Custom Properties, Zero-Line Mixed-Sign Guard, FAANG-Review 0 Blocker) |
| CSS-4 | ⛔ Gestrichen → aufgeteilt in TMPL-1 (Template-Bau) + CSS-7 (Asset-Prüfung) |
| CSS-5 | ⬜ Offen — Verifikation und Abschluss (Farb-Audit, DS-Issues schließen, Regressions-Check, 8 DoD-Checkpoints) |
| TMPL-1 | ⬜ Offen — Ghost-Templates schreiben (default.hbs mit SEO/OG/Twitter/Schema.org/RSS, post.hbs mit JSON-LD + Chart-Engine, 4 Partials, 6 Seiten-Templates) |
| CSS-7 | ⬜ Offen — Asset-Einbindung in Templates prüfen (screen.css, Chart.js, Engine, Janitor, Fonts) |
| QA-1 | ⬜ Offen — Integration & QA (GScan, Responsive S/M/L, SEO, Schema.org-Validierung, OG/Twitter-Validierung, robots.txt, Sitemap) |
| CSS-6 | ⬜ Offen — Tailwind Production-Build (Tree-Shaking, CDN entfernen, Output < 30 KB) |
| AUDIT-P | ⬜ Offen — Performance-Audit (15 Checkpoints, Lighthouse ≥90, LCP < 2,5s) |
| AUDIT-S | ⬜ Offen — Security-Audit (21 Checkpoints, CSP, Härtung, Dependencies) |
| DEPLOY | ⬜ Offen — ZIP-Paket, Upload, Smoke-Test |
| GHOST-1 | ⬜ Offen — Clicky Analytics einrichten (Code Injection, User-Aktion: Clicky-ID) |
| GHOST-2 | ⬜ Offen — VG-Wort Snippet-Vorlage anlegen (Ghost Admin Snippet) |
| GHOST-3 | ⬜ Offen — VG-Wort Bulk-Workflow 200 Artikel (Mapping-Tabelle + API oder manuell) |
| GHOST-4 | ⬜ Offen — OG-Default-Bilder hochladen (1200×630 + 1200×675, User-Aktion) |
| GHOST-5 | ⬜ Offen — FAQPage Schema-Snippet anlegen (Ghost Admin Snippet) |
| GHOST-6 | ⬜ Offen — robots.txt (AI-Crawler) + Sitemap prüfen + einreichen |
| GHOST-7 | ⬜ Offen — Webmention.io einrichten (optional) |
| PL-1 | ⬜ Post-Launch — Einheiten-Anker Y-Achse |
| PL-2 | ⬜ Post-Launch — Zone Zero (Kurzzeit < 300d) |
