# 📄 SPEZIFIKATION: Charts, Ticks & Labels (The Magnetic Grid)

**Projekt:** Finanzwesir Chart Engine
**Modul:** Core / Layout & Scales
**Datei:** `docs/spec/Charts_Ticks_und_Label_v12.md`
**Version:** **12 (The Magnetic Grid & Noon Anchor)**
**Datum:** 22.01.2026
**Status:** **BINDING / ARCHITECTURAL GOLD STANDARD**

---

## 1. Executive Summary

Diese Spezifikation regelt das Zusammenspiel zwischen technischer Daten-Integrität und kognitiver Ergonomie. Sie sorgt dafür, dass Balken und Beschriftungen eine untrennbare semantische Einheit bilden.

**Die Leitprinzipien:**
1. **Integrity (Noon-Anchor):** Alle Daten werden auf 12:00 Uhr lokal geankert.
2. **Rhythm (Waterfall Matrix):** Lückenlose Erkennung der Datenfrequenz.
3. **Magnetic Grid:** Der erste Datenpunkt bestimmt den Takt der Achse.
4. **Optical Alignment:** Balken "snappen" visuell auf die Ticks (kein Versatz).

---

## 2. Daten-Integrität & UX-Konzept

### 2.1 Das Noon-Protokoll (Timezone Safety)
Um "Fencepost Errors" (Verrutschen in den Vortag) zu verhindern, gilt:
* Alle Zeitstempel werden konstruktiv auf **12:00:00 Uhr lokale Zeit** gesetzt.
* Dies schafft einen Puffer gegen weltweite UTC-Offsets. Ein Datum bleibt stabil auf seinem Kalendertag.

### 2.2 Die Scan-Regel ("Structure First")
Wir optimieren die Achse auf Platzersparnis. Die Achse dient der groben Orientierung ("Wo bin ich ungefähr?"), die Details liefert der Tooltip.

---

## 3. The Unified Density Matrix (Visual Ticks)

Die Matrix entscheidet anhand von **Dauer (Jahre)** und **Zone (Bildschirmbreite)**, wie viele Ticks angezeigt werden.

### 3.1 Zone S (Mobile < 450px)
| Dauer (Jahre) | Unit | Step | Format | Beispiel |
| :--- | :--- | :--- | :--- | :--- |
| `< 0.25` | `week` | 1 | `d.M.` | **22.1.** |
| `<= 1` | `quarter` | 1 | `MMM` | **Mär** |
| `<= 5` | `year` | 1 | `yyyy` | **2023** |
| `> 5` | `year` | 5 | `yyyy` | **2020** |

### 3.2 Zone M (Tablet 450px - 900px)
| Dauer (Jahre) | Unit | Step | Format | Beispiel |
| :--- | :--- | :--- | :--- | :--- |
| `< 0.25` | `week` | 1 | `d. MMM` | **22. Jan** |
| `<= 1` | `month` | 1 | `MMM` | **Jan** |
| `<= 3` | `quarter` | 1 | `MMM 'yy` | **Mär '24** |
| `<= 10` | `year` | 1 | `yyyy` | **2023** |
| `> 10` | `year` | 5 | `yyyy` | **2020** |

### 3.3 Zone L (Desktop >= 900px)
| Dauer (Jahre) | Unit | Step | Format | Beispiel |
| :--- | :--- | :--- | :--- | :--- |
| `< 0.25` | `week` | 1 | `d. MMM` | **22. Jan** |
| `<= 1` | `month` | 1 | `MMM 'yy` | **Jan '24** |
| `<= 5` | `quarter` | 1 | `MMM 'yy` | **Mär '24** |
| `<= 10` | `year` | 1 | `yyyy` | **2023** |
| `> 10` | `year` | 5 | `yyyy` | **2020** |

### 3.4 SNAPSHOT Basis-Matrix (SNAPSHOT_BASE)

Die PERIOD-Tabellen §3.1–§3.3 sind zone-abhängig (drei Tabellen: S/M/L). Der SNAPSHOT-Track (Liniendiagramme) nutzt eine **gemeinsame Basis-Matrix**, die nur bei stepSize zone-abhängig ist:

| Dauer (Jahre) | Unit | Step | Format | Beispiel |
| :--- | :--- | :--- | :--- | :--- |
| `<= 0.5` | `month` | 1 | `MMM 'yy` | **Jan '24** |
| `<= 1.5` | `month` | Zone S: 3, sonst 1 | `MMM 'yy` | **Jan '24** |
| `<= 5` | `quarter` | 1 | `MMM 'yy` | **Mär '24** |
| `<= 10` | `year` | 1 | `yyyy` | **2023** |
| `> 10` | `year` | 5 | `yyyy` | **2020** |

**Zeile 1 (≤ 0.5y, V10.4.0):** Kurze Serien (≤ 6 Monate) zeigen jeden Monat — auf allen Zonen. 4 Labels "MMM 'yy" à ~49px passen auf 262px (Zone S). Ohne diese Zeile greift stepSize S:3 und reduziert 4-Monats-Daten auf 2 Ticks.

**Zeile 2 (≤ 1.5y):** Längere Serien verdichten auf Zone S (stepSize 3 → Jan/Apr/Jul/Okt). Bei QUARTERLY/HALF_YEARLY-Rhythmus greift die Quarter-End-Weiche (§3.6): stepSize 3 mit Filter `(m+1) % 3 === 0` → Mär/Jun/Sep/Dez.

SNAPSHOT_BASE wird von DAILY, WEEKLY, MONTHLY geerbt (via `...SNAPSHOT_BASE`). **QUARTERLY, HALF_YEARLY und YEARLY** haben eigene Tabellen (§3.4a), weil deren Tick-Monate fix sind (§3.6) und nie auf `unit:'month'` fallen dürfen.

### 3.4a Rhythm Overrides (YEARLY, HALF_YEARLY)

Die Density Matrix (§3.1–§3.4) arbeitet rein auf **(Dauer × Zone)**. Bestimmte Rhythmen erzwingen jedoch eine abweichende Darstellung unabhängig von der Dauer. Diese Overrides greifen **vor** der Tabellensuche:

| Rhythmus | Dauer | Unit | Step | Mode | Format |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **YEARLY** | `<= 10` | `year` | 1 | YEAR | `yyyy` |
| **YEARLY** | `> 10` | `year` | 5 | YEAR | `yyyy` |
| **HALF_YEARLY** | `<= 5` | `quarter` | 2 | HALF_YEAR | Zone S: `MMM`, sonst `MMM 'yy` |
| **HALF_YEARLY** | `<= 10` | `year` | 1 | YEAR | `yyyy` |
| **HALF_YEARLY** | `> 10` | `year` | 5 | YEAR | `yyyy` |

**Begründung HALF_YEARLY:** `unit: quarter, stepSize: 2` mit Filter `(m+1) % (3 × stepSize) = 0` erzeugt exakt 2 Ticks pro Jahr an den Halbjahres-Endmonaten **Jun** und **Dez** (Realwelt-Monate {6, 12}). Finanzindustrie-Standard: Berichte erscheinen zum Halbjahresende (30.06, 31.12). Bei langen Zeiträumen (> 5 Jahre) wird auf Jahres-Ticks gewechselt. Siehe §3.6 für die Begründung der Quarter-End-Konvention.

### 3.5 SNAPSHOT Floor Principle (V8.0)

Für den SNAPSHOT-Track (Liniendiagramme) gilt ein zusätzliches Prinzip: **Tick-Granularität darf nie feiner sein als der Daten-Rhythmus.** Wöchentliche Daten bekommen keine täglichen Ticks, monatliche Daten keine wöchentlichen.

Bestimmte Rhythmen benötigen eigene SNAPSHOT-Tabellen, weil die Basis-Matrix (§3.1–§3.3) bei kurzen Zeiträumen zu feine Ticks erzeugt:

| Rhythmus | Dauer | Unit | Step | Mode | Begründung |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **WEEKLY** (SNAPSHOT) | `<= 0.5` | `month` | 1 | MONTH | Floor: Wochen-Daten → Monats-Ticks (nicht Tages-Ticks) |
| **WEEKLY** (SNAPSHOT) | `<= 1.5` | `month` | Zone S: 3, sonst 1 | MONTH | Basis-Tabelle übernimmt |
| **WEEKLY** (SNAPSHOT) | `> 1.5` | — | — | — | Standard-Basis-Tabelle (quarter/year) |
| **DAILY** (SNAPSHOT) | `<= 0.04` (~14d) | `day` | Zone S: 3, sonst 1 | DAILY | Jeder Tag (Desktop), alle 3 Tage (Mobile) |
| **DAILY** (SNAPSHOT) | `<= 0.25` (~91d) | `day` | Zone S: 14, sonst 7 | DAILY | Wöchentliche Ticks auf Tagesbasis |
| **DAILY** (SNAPSHOT) | `> 0.25` | — | — | — | Standard-Basis-Tabelle (month/quarter/year) |

**Begründung WEEKLY:** Ohne Floor erzeugt die Basis-Matrix bei ~91 Tagen WEEKLY-Daten tägliche Ticks (Regression 4, 2026-02-19). Monatliche Ticks sind die korrekte Abstraktionsebene — sie reduzieren 14 Wochen-Punkte auf 3–4 Monats-Labels.

**PERIOD-Track (Balkendiagramme):** Analog zum SNAPSHOT-Track benötigen DAILY und WEEKLY eigene PERIOD-Overrides. Die Basis-Matrix §3.1–§3.3 beginnt bei `unit: week` — für tägliche Daten zu grob. Override-Tabellen:

| Rhythmus | Dauer | Unit | Step | Mode | Format |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **DAILY** (PERIOD) | `<= 0.04` (~14d) | `day` | Zone S: 3, sonst 1 | DAILY | d.M. / d. MMM |
| **DAILY** (PERIOD) | `<= 0.25` (~91d) | `day` | Zone S: 14, sonst 7 | DAILY | d.M. / d. MMM |
| **DAILY** (PERIOD) | `<= 0.25` | `week` | 1 | WEEKLY | d.M. / d. MMM |
| **DAILY** (PERIOD) | `> 0.25` | — | — | — | Basis-Tabelle (month/quarter/year) |
| **WEEKLY** (PERIOD) | `<= 0.25` | `week` | 1 | WEEKLY | d.M. / d. MMM |
| **WEEKLY** (PERIOD) | `> 0.25` | — | — | — | Basis-Tabelle (month/quarter/year) |

Voraussetzung: `detectRhythm()` PERIOD-Pfad erkennt WEEKLY (avg > 5 Tage) und DAILY (avg ≤ 5 Tage). Ohne diese Erkennung fielen beide auf DEFAULT (unit: week ab 0.25 Jahre).

### 3.6 Quarter-End Convention (AP-18)

**Regel:** Quartals- und Halbjahres-Ticks verwenden **Perioden-Endmonate**, nicht Anfangsmonate.

| Rhythmus | Tick-Monate | Realwelt | JS 0-basiert |
| :--- | :--- | :--- | :--- |
| **QUARTERLY** | Mär, Jun, Sep, Dez | {3, 6, 9, 12} | {2, 5, 8, 11} |
| **HALF_YEARLY** | Jun, Dez | {6, 12} | {5, 11} |

**Begründung:** Finanzberichte erscheinen zum Quartals- bzw. Halbjahresende (31.03, 30.06, 30.09, 31.12). Die X-Achse spiegelt den Berichtsrhythmus wider, nicht den Periodenstart. Die CSV-Daten und die No-Q-Policy (BOP via MONTHLY) positionieren Datenpunkte bereits auf Endmonaten — die Ticks müssen dort stehen, wo die Daten sind.

**Implementierung:** Filter `(m + 1) % (3 × stepSize) === 0` wobei `m = getUTCMonth()` (0-basiert). `stepSize = 1` → Quartals-Ticks, `stepSize = 2` → Halbjahres-Ticks. Cursor-Alignment auf Quarter-End: `Math.floor((m - 2) / 3) * 3 + 2`.

---

## 4. The Waterfall Matrix (Rhythm & Snapping)

Lückenlose Analyse der Datenfrequenz zur Steuerung des visuellen Snappings.

| Delta (Tage) | Rhythmus | Snapping-Verhalten (Rendering) |
| :--- | :--- | :--- |
| 0 - < 5 | **DAILY** | **Raw:** Balken stehen auf exakter physikalischer Position. |
| 5 - < 20 | **WEEKLY** | **Magnetic:** Snappt auf den Anker-Wochentag (n=1). |
| 20 - < 70 | **MONTHLY** | **Magnetic:** Snappt auf den Anker-Tag im Monat. |
| 70 - < 140 | **QUARTERLY** | **Magnetic:** Snappt auf den Quartals-Anker. |
| 140 - < 300 | **HALF_YEARLY** | **Magnetic:** Snappt auf den Monats-Anker (No-Q-Policy: Monat statt Halbjahr). |
| >= 300 | **YEARLY** | **Magnetic:** Snappt auf den Jahres-Anker. |

---

## 5. Layout & Anchor Rules

### 5.1 Anchor Logic (Randsicherung)
1. **Start-Label:** Muss immer sichtbar sein. `min` der Achse wird hart auf den ersten (gesnappten) Datenpunkt gesetzt.
2. **End-Label:** Der letzte Datenpunkt schließt bündig ab (`max: lastDate`).

### 5.2 Layout Rules (Spacing)
* **Font Size:** Mobile 10px / Desktop 11px.
* **Padding:** `autoSkipPadding: 10` (Verhindert Überlappung).
* **Rotation:** `0` (Strict No-Rotation Policy für maximale Lesbarkeit).

---

## 6. Architecture Context: The Plugin Protocol

### 6.1 The Brain (FwDateUtils)
Die gesamte Analyse-Logik (`detectRhythm` und Snapping-Berechnung) liegt in **`core/FwDateUtils.js`**. Sie ist die Single Source of Truth.

### 6.2 The Rucksack (fwContext)
Alle Informationen (Rhythmus, Anker, Zone) werden im Plugin-Context (`fwContext`) transportiert, damit alle Layer (X-Achse, Y-Achse, Tooltip) synchron entscheiden.

---

## 7. SNAPSHOT Snap-Architektur (V16.0, AP-15 Neudesign)

### 7.1 Problem: Intra-Perioden-Offset

SNAPSHOT-Daten (Liniendiagramme) liegen auf proportionalen Zeitachsen. Wenn Datenpunkte nicht auf Tick-Grenzen fallen (z.B. "15. März" bei Monats-Ticks am 1.), entsteht ein visueller Offset. Die Schwere hängt vom Rhythmus ab:

| Rhythmus | Max. Offset (ohne Snap) | Visuelle Schwere |
| :--- | :--- | :--- |
| YEARLY | 11 Monate (92% Tick-Abstand) | Kritisch |
| HALF_YEARLY | 5 Monate (83%) | Hoch |
| QUARTERLY | 2 Monate (67%) | Mittel |
| MONTHLY | 29 Tage (97% relativ, aber <60px absolut) | Gering–Mittel |
| WEEKLY/DAILY | <7 Tage | Vernachlässigbar |

### 7.2 Lösung: Calendar Snap mit _originalDate-Entkopplung (V16.0, AP-15)

**Kern-Prinzip:** Zwei entkoppelte Kanäle — `x` für visuelle Position, `_originalDate` für Tooltip-Datum.

| Komponente | Liest | Zweck |
| :--- | :--- | :--- |
| Chart.js (Canvas) | `x` (gesnapped) | Datenpunkt-Position auf der Achse |
| FwSmartTooltips | `_originalDate` (Fallback: `parsed.x`) | Echtes Datum im Tooltip-Header |

**Warum das funktioniert:** Die drei gescheiterten AP-14/AP-15-Iterationen versuchten, mit EINEM Wert (`x`) gleichzeitig visuelle Ausrichtung UND semantische Korrektheit zu erreichen. Das ist unmöglich bei grob-granularen Rhythmen (QUARTERLY, HALF_YEARLY). Die Entkopplung löst den Konflikt: `x` darf beliebig gerundet werden, weil der Tooltip unabhängig das echte Datum zeigt.

**Daten-Objekt pro Datenpunkt:**
```javascript
{ x: snappedTimestamp, y: value, _originalDate: originalTimestamp }
```

### 7.3 Snap-Tabelle (`getSnapshotSnap`, FwDateUtils V5.3.0)

`getSnapshotSnap(ts, rhythm)` wird in `LineChartStrategy.transform()` auf alle Timestamps angewandt. Die Funktion ist idempotent für feine Rhythmen (DAILY/WEEKLY geben den Timestamp unverändert zurück).

| Rhythmus | Snap-Ziel | Max. Restoffset zum Tick | Beispiel |
| :--- | :--- | :--- | :--- |
| YEARLY | 1. Januar des Jahres | 0 (direkt auf Tick) | 31. Dez 2023 → 1. Jan 2023 |
| HALF_YEARLY | 1. des Monats | ~30 Tage (~2% in 4J) | 30. Jun → 1. Jun (nahe Jun-Tick, §3.6) |
| QUARTERLY | 1. des Monats | ~30 Tage (~2.3% in 3J) | 31. Mär → 1. Mär (direkt auf Mär-Tick, §3.6) |
| MONTHLY | 1. des Monats | 0 (direkt auf Tick) | 15. Jan → 1. Jan |
| WEEKLY | unverändert (Identität) | Sub-pixel | — |
| DAILY | unverändert (Identität) | 0 | — |

**Design-Entscheidung (AP-15):** HALF_YEARLY snappt auf den 1. des Monats, NICHT auf den Halbjahres-Start (Jan 1 / Jul 1). Begründung: Halbjahres-Start-Snap erzeugt bis zu 6 Monate Rückwärts-Shift bei End-of-Period-Daten (Jun 30 → Jan 1). Monats-Start-Snap begrenzt den Shift auf max 30 Tage. Der resultierende ~2%-Restoffset ist visuell akzeptabel.

### 7.4 Tick-Erzeugung: Einheitliche Kalender-Ticks (V9.0, AP-15)

**Alle SNAPSHOT-Rhythmen** nutzen einheitliche Kalender-Ticks (`_generateLinearTicks`). Keine Data-Anchored Ticks, keine Regularity-Guards, keine Fallunterscheidung regulär/irregulär.

**Begründung (Tufte):** Gleichmäßige Tick-Struktur bildet ein stabiles kognitives Referenzraster. Calendar Snap in der Strategy bringt Datenpunkte nahe an die Ticks — die verbleibenden Restoffsets (max ~30 Tage bei HY/Q) sind bei typischen Chart-Breiten sub-pixel bis minimal.

**Breathing-Room-Regel:** `axis.max += range × 5%` (afterDataLimits). Kalender-Ticks werden bis `dataRange.max + halfStep` erzeugt (endLimit). Der Breathing-Room ist visueller Freiraum, keine Tick-Zone.

**Hilfsutility:** `FwDateUtils.isRegularInterval(timestamps, rhythm)` existiert als Reserve für den PERIOD-Track (Bar-Charts). Für SNAPSHOT nicht verwendet.

**Status:** Implementiert (V16.0.0 AP-15, 2026-02-26). Testseite: `index_irregular_xaxis.html`.
**⚠️ Offener Punkt:** PERIOD-Track (Bar-Charts) mit irregulären Daten — separates AP (AP-13).
