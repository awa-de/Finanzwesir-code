# SPEZIFIKATION: Charts, Ticks & Labels (The Magnetic Grid)

**Projekt:** Finanzwesir Chart Engine
**Modul:** Core / Layout & Scales
**Datei:** `docs/spec/Charts_Ticks_und_Label_v13.md`
**Version:** **13 (CV-Heuristik & Pixel-Budget)**
**Datum:** 28.02.2026
**Status:** **BINDING / ARCHITECTURAL GOLD STANDARD**

---

## 1. Executive Summary

Diese Spezifikation regelt das Zusammenspiel zwischen technischer Daten-Integritat und kognitiver Ergonomie auf der X-Achse. Sie gilt fur beide Tracks:

- **PERIOD-Track (Balkendiagramme):** Ticks reprasentieren Periodenstart. Steuerung uber die Unified Density Matrix (Abschnitt 5.1-5.3) und die Waterfall Matrix (Abschnitt 6).
- **SNAPSHOT-Track (Liniendiagramme):** Ticks reprasentieren Kalenderzeitpunkte auf einer proportionalen Zeitachse. Steuerung uber die CV-Heuristik (Abschnitt 4) und die SNAPSHOT-Density-Matrix (Abschnitt 5.4-5.6).

**Die Leitprinzipien:**

1. **Integrity (Noon-Anchor):** Alle Daten werden auf 12:00 Uhr lokal geankert.
2. **Rhythm (CV-Heuristik / Waterfall):** Datenfrequenz wird klassifiziert und auf Kalendereinheiten abgebildet.
3. **Magnetic Grid:** Aquidistante Kalender-Ticks bilden ein stabiles kognitives Referenzraster.
4. **Optical Alignment:** Datenpunkte snappen visuell auf Kalender-Grenzen (SNAPSHOT Snap-Architektur, Abschnitt 9).

---

## 2. Daten-Integritat & UX-Konzept

### 2.1 Das Noon-Protokoll (Timezone Safety)

Um "Fencepost Errors" (Verrutschen in den Vortag) zu verhindern, gilt:

- Alle Zeitstempel werden konstruktiv auf **12:00:00 Uhr lokale Zeit** gesetzt.
- Dies schafft einen Puffer gegen weltweite UTC-Offsets. Ein Datum bleibt stabil auf seinem Kalendertag.

### 2.2 Die Scan-Regel ("Structure First")

Wir optimieren die Achse auf Platzersparnis. Die Achse dient der groben Orientierung ("Wo bin ich ungefahr?"), die Details liefert der Tooltip.

---

## 3. Tick-Hierarchie & Grundregeln (SNAPSHOT-Track)

### 3.1 Tick-Hierarchie

Die verfugbaren Tick-Einheiten, geordnet von fein nach grob:

| Stufe | Einheit | Anker |
| :--- | :--- | :--- |
| 1 | Tag | Kalendertag |
| 2 | Woche | Montag |
| 3 | Monat | 1. des Monats |
| 4 | Quartal | Marz, Juni, September, Dezember |
| 5 | Halbjahr | Juni, Dezember |
| 6 | Jahr | 1. Januar |
| 7 | 5 Jahre | 1. Januar (Vielfaches von 5) |
| 8 | 10 Jahre | 1. Januar (Vielfaches von 10) |

Die Hierarchie ist aufwarts geschlossen: jede grobere Einheit ist ein exaktes Vielfaches der feineren. Die Wahl der Tick-Einheit erfolgt durch die CV-Heuristik (Abschnitt 4) und die Density Matrix (Abschnitt 5).

### 3.2 Grundregeln

1. **Aquidistanz:** Ticks sind immer aquidistant. Das Zeitfenster (Start bis Ende) wird in gleichmassige Teilstucke aufgeteilt.
2. **Durchlauf:** Ticks laufen durch, unabhangig davon ob ein Datenpunkt darunter liegt. Lucken in den Daten erzeugen keine Lucken im Tick-Raster.
3. **Quartalsrhythmus:** Nur Marz, Juni, September, Dezember (Finanzindustrie-Standard, siehe Abschnitt 5.8).
4. **Halbjahresrhythmus:** Nur Juni, Dezember.
5. **Wochenrhythmus:** Montag als Startpunkt.
6. **Harmonisierung mit Datensatz-Start:** Tick-Platzierung harmoniert mit dem Anfang des Datensatzes.
   - Beispiel: Daten ab Januar -> Marz-Tick liegt rechts von Januar, Januar/Februar haben links davon Platz.
   - Beispiel: Daten ab Marz -> Marz-Tick liegt direkt an der Y-Achse.

---

## 4. SNAPSHOT Rhythmus-Erkennung (SNAPSHOT-Track)

Dieser Abschnitt spezifiziert, wie die Tick-Einheit fur Liniendiagramme bestimmt wird. Die Erkennung erfolgt in vier Schritten.

### 4.1 Daten -> minimaler Tick-Rhythmus (Floor-Prinzip)

Das CSV bestimmt den engsten moglichen Tick-Rhythmus: Tagesdaten erlauben Tages-Ticks, Monatsdaten erlauben Monats-Ticks als Minimum. Die Tick-Granularitat darf nie feiner sein als der Daten-Rhythmus (Details in Abschnitt 5.6).

### 4.2 Heuristik: Median, CV, Klassifikation

**Schritt 1:** Berechne alle N-1 Intervalle zwischen aufeinanderfolgenden Datenpunkten im **aktuell sichtbaren Zeitfenster** (T_window) in Tagen.

**Schritt 2:** Berechne Median-Intervall (M) und Variationskoeffizient (CV = Standardabweichung / Mittelwert).

**Schritt 3 -- Klassifikation:**

| Klasse | CV | Vorgehen |
| :--- | :--- | :--- |
| Regulaer | <= 0,30 | Tick-Basis = Kalendereinheit, die M am nachsten liegt (Abschnitt 4.3) |
| Luckenhaft | 0,30 < CV <= 0,60 | Wie Regulaer; Lucken werden im Tick-Raster nicht markiert |
| Erratisch | > 0,60 | Ignoriere Einzelintervalle; Tick-Basis aus T_window (Abschnitt 4.4) |
| Erratisch | N <= 2 im Fenster (CV undefiniert) | Wie CV > 0,60: Tick-Basis aus T_window (Abschnitt 4.4) |

**Scope-Regel:** M wird einmalig aus dem **Gesamtdatensatz** berechnet und bleibt bei Zoom-Anderungen stabil. CV wird pro sichtbarem Zeitfenster berechnet -- die Klassifikation kann sich bei Zoom andern (z.B. "Regulaer" bei Vollansicht, "Erratisch" bei 1J-Zoom mit nur 2 sichtbaren Punkten).

### 4.3 Mapping M -> Kalendereinheit (Regulaer / Luckenhaft)

M wird einmalig aus dem Gesamtdatensatz berechnet. Der Zoom beeinflusst nur, wie viele Ticks dieser Basis auf den Screen passen -- das regeln die Screen-Constraints (Abschnitt 5).

| M (Tage) | Kalendereinheit |
| :--- | :--- |
| <= 2 | Tag |
| <= 10 | Woche |
| <= 45 | Monat |
| <= 100 | Quartal |
| <= 200 | Halbjahr |
| > 200 | Jahr |

### 4.4 Erratisch-Fallback (T_window -> Tick-Basis)

Fur erratische Daten (CV > 0,60 oder N <= 2 im Fenster) bestimmt die Breite des sichtbaren Zeitfensters die Tick-Basis. T_window = Ende des Fensters - Start des Fensters. T_window andert sich bei jedem Zoom-Button-Klick.

| T_window | Tick-Basis |
| :--- | :--- |
| <= 1 Jahr | Quartal |
| <= 3 Jahre | Halbjahr |
| <= 10 Jahre | Jahr |
| > 10 Jahre | 2-5 Jahre (Hierarchie aufwarts) |

### 4.5 Zoom-Buttons

Verfugbare Zoom-Buttons: **1J, 3J, 5J, 10J, max.**

Das System blendet Buttons aus, die den Datensatz uberschreiten. Beispiel: Datensatz 4 Jahre -> sichtbar: 1J, 3J, max.

### 4.6 Referenz-Datensatze

Diese Datensatze validieren die Heuristik. Jeder muss die angegebenen Ergebnisse liefern.

**Standard-Referenzfalle (Regelfall)**
Regelmassig befullte Zeitreihen (taglich, wochentlich, monatlich, quartalsweise, jahrlich) werden implizit durch die SNAPSHOT_BASE-Matrix (Abschnitt 5.4), die Floor-Prinzipien (Abschnitt 5.6/5.7) und das M->Einheiten-Mapping (Abschnitt 4.3) abgedeckt.

Die expliziten Referenz-CSV-Dateien in diesem Abschnitt fokussieren auf unregelmaessige, erratische und typische Praxisfalle, weil diese die Heuristik maximal belasten.

**0. `snap_period_monthly_30m.csv` (Regelmassige Monats-SNAPSHOT-Reihe)**
Typischer SNAPSHOT-Fall: monatliche Datenpunkte uber 30 Monate (2,5 Jahre) mit nahezu konstantem Monatsabstand.

- N=30, Zeitraum ~2,5 Jahre, M~30-31 Tage, CV~0
- Klasse: Regulaer (CV <= 0,30)
- M~31d -> Monat (M <= 45) gemaess Mapping in Abschnitt 4.3
- Ergebnis bei Zoom max: Monats-Ticks, formatiert als `MMM 'yy` (z.B. "Jan '22", "Feb '22", ...), gesteuert uber SNAPSHOT_BASE (Abschnitt 5.4, erste und zweite Zeile je nach Dauer)
- Zoom 1J / 3J: Tick-Einheit bleibt Monat, die Sicht entscheidet nur daruber, wie viele dieser Monats-Ticks pro Zone tatsachlich sichtbar sind (Pixel-Budget in Abschnitt 5.9)

**1. `tool_tip_monthly_gaps.csv`**
- N=9, Zeitraum 0,9 Jahre, M=31d, CV=0,53
- Klasse: Luckenhaft (0,30 < 0,53 <= 0,60)
- M=31d -> Monat (M <= 45)
- Ergebnis: Monats-Ticks

**2. `tt_gap_test_irregular.csv`**
- N=6, Zeitraum 1,0 Jahre, M=73d, CV=0,31
- Klasse: Luckenhaft (0,30 < 0,31 <= 0,60)
- M=73d -> Quartal (M <= 100)
- Ergebnis: Quartals-Ticks

**3. `snap_period_yearly_irregular.csv`**
- N=8, Zeitraum 8,8 Jahre, M=488d, CV=0,18
- Klasse bei Zoom max: Regulaer (0,18 <= 0,30)
- M=488d -> Jahr (M > 200)
- Ergebnis bei Zoom max: Jahres-Ticks
- Zoom 1J: N=2 im Fenster -> Sonderfall: Erratisch -> T_window 1J <= 1 Jahr -> Quartal-Ticks

**4. `scenario_4_crash.csv`**
- N=21, CV=0,86
- Klasse: Erratisch (0,86 > 0,60)
- T_window-gesteuert:
  - Zoom 1J -> Quartal-Ticks
  - Zoom 3J -> Halbjahr-Ticks
  - Zoom 5J (max) -> Jahres-Ticks

---

## 5. The Unified Density Matrix (Visual Ticks)

Die Matrix entscheidet anhand von **Dauer (Jahre)** und **Zone (Bildschirmbreite)**, wie viele Ticks angezeigt werden.

### 5.1 Zone S (Mobile < 450px) -- PERIOD-Track

| Dauer (Jahre) | Unit | Step | Format | Beispiel |
| :--- | :--- | :--- | :--- | :--- |
| `< 0.25` | `week` | 1 | `d.M.` | **22.1.** |
| `<= 1` | `quarter` | 1 | `MMM` | **Mar** |
| `<= 5` | `year` | 1 | `yyyy` | **2023** |
| `> 5` | `year` | 5 | `yyyy` | **2020** |

### 5.2 Zone M (Tablet 450px - 900px) -- PERIOD-Track

| Dauer (Jahre) | Unit | Step | Format | Beispiel |
| :--- | :--- | :--- | :--- | :--- |
| `< 0.25` | `week` | 1 | `d. MMM` | **22. Jan** |
| `<= 1` | `month` | 1 | `MMM` | **Jan** |
| `<= 3` | `quarter` | 1 | `MMM 'yy` | **Mar '24** |
| `<= 10` | `year` | 1 | `yyyy` | **2023** |
| `> 10` | `year` | 5 | `yyyy` | **2020** |

### 5.3 Zone L (Desktop >= 900px) -- PERIOD-Track

| Dauer (Jahre) | Unit | Step | Format | Beispiel |
| :--- | :--- | :--- | :--- | :--- |
| `< 0.25` | `week` | 1 | `d. MMM` | **22. Jan** |
| `<= 1` | `month` | 1 | `MMM 'yy` | **Jan '24** |
| `<= 5` | `quarter` | 1 | `MMM 'yy` | **Mar '24** |
| `<= 10` | `year` | 1 | `yyyy` | **2023** |
| `> 10` | `year` | 5 | `yyyy` | **2020** |

### 5.4 SNAPSHOT Basis-Matrix (SNAPSHOT_BASE)

Die PERIOD-Tabellen (Abschnitt 5.1-5.3) sind zone-abhangig (drei Tabellen: S/M/L). Der SNAPSHOT-Track (Liniendiagramme) nutzt eine **gemeinsame Basis-Matrix**, die nur bei stepSize zone-abhangig ist:

| Dauer (Jahre) | Unit | Step | Format | Beispiel |
| :--- | :--- | :--- | :--- | :--- |
| `<= 0.5` | `month` | 1 | `MMM 'yy` | **Jan '24** |
| `<= 1.5` | `month` | Zone S: 3, sonst 1 | `MMM 'yy` | **Jan '24** |
| `<= 5` | `quarter` | 1 | `MMM 'yy` | **Mar '24** |
| `<= 10` | `year` | 1 | `yyyy` | **2023** |
| `> 10` | `year` | 5 | `yyyy` | **2020** |

**Zeile 1 (<= 0.5y, V10.4.0):** Kurze Serien (<= 6 Monate) zeigen jeden Monat -- auf allen Zonen. 4 Labels "MMM 'yy" a ~52px passen auf 270px (Zone S bei 11px Font). Ohne diese Zeile greift stepSize S:3 und reduziert 4-Monats-Daten auf 2 Ticks.

**Zeile 2 (<= 1.5y):** Langere Serien verdichten auf Zone S (stepSize 3 -> Jan/Apr/Jul/Okt). Bei QUARTERLY/HALF_YEARLY-Rhythmus greift die Quarter-End-Weiche (Abschnitt 5.8): stepSize 3 mit Filter `(m+1) % 3 === 0` -> Mar/Jun/Sep/Dez.

SNAPSHOT_BASE wird von DAILY, WEEKLY, MONTHLY geerbt (via `...SNAPSHOT_BASE`). **QUARTERLY, HALF_YEARLY und YEARLY** haben eigene Tabellen (Abschnitt 5.5), weil deren Tick-Monate fix sind (Abschnitt 5.8) und nie auf `unit:'month'` fallen durfen.

### 5.5 Rhythm Overrides (YEARLY, HALF_YEARLY)

Die Density Matrix (Abschnitt 5.1-5.4) arbeitet rein auf **(Dauer x Zone)**. Bestimmte Rhythmen erzwingen jedoch eine abweichende Darstellung unabhangig von der Dauer. Diese Overrides greifen **vor** der Tabellensuche:

| Rhythmus | Dauer | Unit | Step | Mode | Format |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **YEARLY** | `<= 10` | `year` | 1 | YEAR | `yyyy` |
| **YEARLY** | `> 10` | `year` | 5 | YEAR | `yyyy` |
| **HALF_YEARLY** | `<= 5` | `quarter` | 2 | HALF_YEAR | Zone S: `MMM`, sonst `MMM 'yy` |
| **HALF_YEARLY** | `<= 10` | `year` | 1 | YEAR | `yyyy` |
| **HALF_YEARLY** | `> 10` | `year` | 5 | YEAR | `yyyy` |

**Begrundung HALF_YEARLY:** `unit: quarter, stepSize: 2` mit Filter `(m+1) % (3 x stepSize) = 0` erzeugt exakt 2 Ticks pro Jahr an den Halbjahres-Endmonaten **Jun** und **Dez** (Realwelt-Monate {6, 12}). Finanzindustrie-Standard: Berichte erscheinen zum Halbjahresende (30.06, 31.12). Bei langen Zeitraumen (> 5 Jahre) wird auf Jahres-Ticks gewechselt. Siehe Abschnitt 5.8 fur die Begrundung der Quarter-End-Konvention.

### 5.6 SNAPSHOT Floor Principle (V8.0)

Fur den SNAPSHOT-Track gilt: **Tick-Granularitat darf nie feiner sein als der Daten-Rhythmus.** Wochentliche Daten bekommen keine taglichen Ticks, monatliche Daten keine wochentlichen.

Bestimmte Rhythmen benotigen eigene SNAPSHOT-Tabellen, weil die Basis-Matrix (Abschnitt 5.1-5.3) bei kurzen Zeitraumen zu feine Ticks erzeugt:

| Rhythmus | Dauer | Unit | Step | Mode | Begrundung |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **WEEKLY** (SNAPSHOT) | `<= 0.5` | `month` | 1 | MONTH | Floor: Wochen-Daten -> Monats-Ticks (nicht Tages-Ticks) |
| **WEEKLY** (SNAPSHOT) | `<= 1.5` | `month` | Zone S: 3, sonst 1 | MONTH | Basis-Tabelle ubernimmt |
| **WEEKLY** (SNAPSHOT) | `> 1.5` | -- | -- | -- | Standard-Basis-Tabelle (quarter/year) |
| **DAILY** (SNAPSHOT) | `<= 0.04` (~14d) | `day` | Zone S: 3, sonst 1 | DAILY | Jeder Tag (Desktop), alle 3 Tage (Mobile) |
| **DAILY** (SNAPSHOT) | `<= 0.25` (~91d) | `day` | Zone S: 14, sonst 7 | DAILY | Wochentliche Ticks auf Tagesbasis |
| **DAILY** (SNAPSHOT) | `> 0.25` | -- | -- | -- | Standard-Basis-Tabelle (month/quarter/year) |

**Begrundung WEEKLY:** Ohne Floor erzeugt die Basis-Matrix bei ~91 Tagen WEEKLY-Daten tagliche Ticks (Regression 4, 2026-02-19). Monatliche Ticks sind die korrekte Abstraktionsebene -- sie reduzieren 14 Wochen-Punkte auf 3-4 Monats-Labels.

### 5.7 PERIOD Floor Overrides (PERIOD-Track)

Analog zum SNAPSHOT-Track benotigen DAILY und WEEKLY eigene PERIOD-Overrides. Die Basis-Matrix (Abschnitt 5.1-5.3) beginnt bei `unit: week` -- fur tagliche Daten zu grob. Override-Tabellen:

| Rhythmus | Dauer | Unit | Step | Mode | Format |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **DAILY** (PERIOD) | `<= 0.04` (~14d) | `day` | Zone S: 3, sonst 1 | DAILY | d.M. / d. MMM |
| **DAILY** (PERIOD) | `<= 0.25` (~91d) | `day` | Zone S: 14, sonst 7 | DAILY | d.M. / d. MMM |
| **DAILY** (PERIOD) | `<= 0.25` | `week` | 1 | WEEKLY | d.M. / d. MMM |
| **DAILY** (PERIOD) | `> 0.25` | -- | -- | -- | Basis-Tabelle (month/quarter/year) |
| **WEEKLY** (PERIOD) | `<= 0.25` | `week` | 1 | WEEKLY | d.M. / d. MMM |
| **WEEKLY** (PERIOD) | `> 0.25` | -- | -- | -- | Basis-Tabelle (month/quarter/year) |

Voraussetzung: `detectRhythm()` PERIOD-Pfad erkennt WEEKLY (avg > 5 Tage) und DAILY (avg <= 5 Tage). Ohne diese Erkennung fielen beide auf DEFAULT (unit: week ab 0.25 Jahre).

### 5.8 Quarter-End Convention (AP-18)

**Regel:** Quartals- und Halbjahres-Ticks verwenden **Perioden-Endmonate**, nicht Anfangsmonate.

| Rhythmus | Tick-Monate | Realwelt | JS 0-basiert |
| :--- | :--- | :--- | :--- |
| **QUARTERLY** | Mar, Jun, Sep, Dez | {3, 6, 9, 12} | {2, 5, 8, 11} |
| **HALF_YEARLY** | Jun, Dez | {6, 12} | {5, 11} |

**Begrundung:** Finanzberichte erscheinen zum Quartals- bzw. Halbjahresende (31.03, 30.06, 30.09, 31.12). Die X-Achse spiegelt den Berichtsrhythmus wider, nicht den Periodenstart. Die CSV-Daten und die No-Q-Policy (BOP via MONTHLY) positionieren Datenpunkte bereits auf Endmonaten -- die Ticks mussen dort stehen, wo die Daten sind.

**Implementierung:** Filter `(m + 1) % (3 x stepSize) === 0` wobei `m = getUTCMonth()` (0-basiert). `stepSize = 1` -> Quartals-Ticks, `stepSize = 2` -> Halbjahres-Ticks. Cursor-Alignment auf Quarter-End: `Math.floor((m - 2) / 3) * 3 + 2`.

### 5.9 Pixel-Budget

Das Pixel-Budget bestimmt, wie viele Tick-Labels eine Zone darstellen kann, ohne dass sich Labels uberlappen. Es validiert die stepSize-Wahlen in der Density Matrix.

**Herleitung der nutzbaren Achsenbreite:**

```text
Nutzbare X-Achse = Canvas-Breite - Y-Achsen-Breite - Layout-Padding
```

- **Y-Achsen-Breite:** Dynamisch (Chart.js berechnet nach Label-Lange). Typisch 50-70px je nach Zahlenformat (Prozent vs. Euro).
- **Layout-Padding:** 0px. Chart.js v4.5.0 Default ist 0 (alle Seiten). LineChartStrategy, BaseChartStrategy und ChartEngine setzen kein explizites `layout.padding`.

**Reprasentative Werte (konservative Schatzung mit Y-Achse ~60px):**

| Zone | Canvas-Breite | Y-Achse | Nutzbare X-Achse |
| :--- | :--- | :--- | :--- |
| S (< 450px) | ~330px (typ. Mobilgerat) | ~60px | **~270px** |
| M (450-900px) | ~680px (typ. Tablet) | ~60px | **~620px** |
| L (>= 900px) | ~1000px (typ. Desktop) | ~60px | **~940px** |

**Font-Grossen (Quelle: FwLayoutRules.js):**

| Zone | Font-Grosse |
| :--- | :--- |
| S (< 450px) | 11px |
| M/L (>= 450px) | 12px |

**Label-Breiten und Kapazitat:**

Die Spalte "Slot" enthalt die Label-Breite plus autoSkipPadding (10px, Abschnitt 7.2). Die Kapazitat ergibt sich aus: Nutzbare X-Achse / Slot.

| Format | Beispiel | Label-Breite (11px / 12px) | Slot | Kap. Zone S | Kap. Zone M | Kap. Zone L |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `MMM 'yy` | Jan '24 | ~52px / ~56px | 62px / 66px | 4 | 9 | 14 |
| `yyyy` | 2024 | ~36px / ~39px | 46px / 49px | 5 | 12 | 19 |
| `MMM` | Jan | ~32px / ~35px | 42px / 45px | 6 | 13 | 20 |
| `d. MMM` | 22. Jan | ~52px / ~56px | 62px / 66px | 4 | 9 | 14 |
| `d.M.` | 22.1. | ~36px / ~39px | 46px / 49px | 5 | 12 | 19 |

**Validierungsbeispiel:** SNAPSHOT_BASE Zeile 1 (<= 0.5y, `MMM 'yy`) -> max 6 Monats-Labels. Zone S Kapazitat fur `MMM 'yy` = 4. Bei <= 6 Monaten Daten fallen max 6 Labels an. 4 passen ohne Uberlappung; Chart.js `autoSkip` entfernt uberzahlige Labels automatisch.

---

## 6. The Waterfall Matrix -- PERIOD-Track (Rhythm & Snapping)

Luckenlose Analyse der Datenfrequenz zur Steuerung des visuellen Snappings. Diese Matrix gilt fur den **PERIOD-Track (Balkendiagramme)**. Fur den SNAPSHOT-Track siehe Abschnitt 4 (CV-Heuristik).

| Delta (Tage) | Rhythmus | Snapping-Verhalten (Rendering) |
| :--- | :--- | :--- |
| 0 - < 5 | **DAILY** | **Raw:** Balken stehen auf exakter physikalischer Position. |
| 5 - < 20 | **WEEKLY** | **Magnetic:** Snappt auf den Anker-Wochentag (n=1). |
| 20 - < 70 | **MONTHLY** | **Magnetic:** Snappt auf den Anker-Tag im Monat. |
| 70 - < 140 | **QUARTERLY** | **Magnetic:** Snappt auf den Quartals-Anker. |
| 140 - < 300 | **HALF_YEARLY** | **Magnetic:** Snappt auf den Monats-Anker (No-Q-Policy: Monat statt Halbjahr). |
| >= 300 | **YEARLY** | **Magnetic:** Snappt auf den Jahres-Anker. |

---

## 7. Layout & Anchor Rules

### 7.1 Anchor Logic (Randsicherung)

1. **Start-Label:** Muss immer sichtbar sein. `min` der Achse wird hart auf den ersten (gesnappten) Datenpunkt gesetzt.
2. **End-Label:** Der letzte Datenpunkt schliesst bundig ab (`max: lastDate`).

### 7.2 Layout Rules (Spacing)

- **Font Size:** Zone S 11px / Zone M+L 12px (Quelle: `FwLayoutRules.js`).
- **Padding:** `autoSkipPadding: 10` (Verhindert Uberlappung).
- **Rotation:** `0` (Strict No-Rotation Policy fur maximale Lesbarkeit).

---

## 8. Architecture Context: The Plugin Protocol

### 8.1 The Brain (FwDateUtils)

Die gesamte Analyse-Logik (`detectRhythm` und Snapping-Berechnung) liegt in **`core/FwDateUtils.js`**. Sie ist die Single Source of Truth (KDR 11).

### 8.2 The Rucksack (fwContext)

Alle Informationen (Rhythmus, Anker, Zone) werden im Plugin-Context (`fwContext`) transportiert, damit alle Layer (X-Achse, Y-Achse, Tooltip) synchron entscheiden (KDR 9).

---

## 9. SNAPSHOT Snap-Architektur (V16.0, AP-15 Neudesign)

### 9.1 Problem: Intra-Perioden-Offset

SNAPSHOT-Daten (Liniendiagramme) liegen auf proportionalen Zeitachsen. Wenn Datenpunkte nicht auf Tick-Grenzen fallen (z.B. "15. Marz" bei Monats-Ticks am 1.), entsteht ein visueller Offset. Die Schwere hangt vom Rhythmus ab:

| Rhythmus | Max. Offset (ohne Snap) | Visuelle Schwere |
| :--- | :--- | :--- |
| YEARLY | 11 Monate (92% Tick-Abstand) | Kritisch |
| HALF_YEARLY | 5 Monate (83%) | Hoch |
| QUARTERLY | 2 Monate (67%) | Mittel |
| MONTHLY | 29 Tage (97% relativ, aber <60px absolut) | Gering-Mittel |
| WEEKLY/DAILY | <7 Tage | Vernachlassigbar |

### 9.2 Losung: Calendar Snap mit _originalDate-Entkopplung (V16.0, AP-15)

**Kern-Prinzip:** Zwei entkoppelte Kanale -- `x` fur visuelle Position, `_originalDate` fur Tooltip-Datum.

| Komponente | Liest | Zweck |
| :--- | :--- | :--- |
| Chart.js (Canvas) | `x` (gesnapped) | Datenpunkt-Position auf der Achse |
| FwSmartTooltips | `_originalDate` (Fallback: `parsed.x`) | Echtes Datum im Tooltip-Header |

**Warum das funktioniert:** Die drei gescheiterten AP-14/AP-15-Iterationen versuchten, mit EINEM Wert (`x`) gleichzeitig visuelle Ausrichtung UND semantische Korrektheit zu erreichen. Das ist unmoglich bei grob-granularen Rhythmen (QUARTERLY, HALF_YEARLY). Die Entkopplung lost den Konflikt: `x` darf beliebig gerundet werden, weil der Tooltip unabhangig das echte Datum zeigt.

**Daten-Objekt pro Datenpunkt:**

```javascript
{ x: snappedTimestamp, y: value, _originalDate: originalTimestamp }
```

### 9.3 Snap-Tabelle (`getSnapshotSnap`, FwDateUtils V5.3.0)

`getSnapshotSnap(ts, rhythm)` wird in `LineChartStrategy.transform()` auf alle Timestamps angewandt. Die Funktion ist idempotent fur feine Rhythmen (DAILY/WEEKLY geben den Timestamp unverandert zuruck).

| Rhythmus | Snap-Ziel | Max. Restoffset zum Tick | Beispiel |
| :--- | :--- | :--- | :--- |
| YEARLY | 1. Januar des Jahres | 0 (direkt auf Tick) | 31. Dez 2023 -> 1. Jan 2023 |
| HALF_YEARLY | 1. des Monats | ~30 Tage (~2% in 4J) | 30. Jun -> 1. Jun (nahe Jun-Tick, Abschnitt 5.8) |
| QUARTERLY | 1. des Monats | ~30 Tage (~2.3% in 3J) | 31. Mar -> 1. Mar (direkt auf Mar-Tick, Abschnitt 5.8) |
| MONTHLY | 1. des Monats | 0 (direkt auf Tick) | 15. Jan -> 1. Jan |
| WEEKLY | unverandert (Identitat) | Sub-pixel | -- |
| DAILY | unverandert (Identitat) | 0 | -- |

**Design-Entscheidung (AP-15):** HALF_YEARLY snappt auf den 1. des Monats, NICHT auf den Halbjahres-Start (Jan 1 / Jul 1). Begrundung: Halbjahres-Start-Snap erzeugt bis zu 6 Monate Ruckwarts-Shift bei End-of-Period-Daten (Jun 30 -> Jan 1). Monats-Start-Snap begrenzt den Shift auf max 30 Tage. Der resultierende ~2%-Restoffset ist visuell akzeptabel.

### 9.4 Tick-Erzeugung: Kalender-Ticks mit CV-gesteuerter Einheitenwahl

**Alle SNAPSHOT-Rhythmen** nutzen Kalender-Ticks (`_generateLinearTicks`). Die Tick-Erzeugung ist cursor-basiert: ein Cursor lauft ab `axis.min` in Monatsschritten (bzw. Tagesschritten bei `unit:'day'`) und erzeugt Ticks an den Kalender-Grenzen der gewahlten Einheit.

**Einheitenwahl:** Die Wahl der Tick-Einheit (Tag, Monat, Quartal, Jahr, ...) erfolgt durch die CV-Heuristik (Abschnitt 4):

- **Regulaer/Luckenhaft:** Einheit aus dem M-Mapping (Abschnitt 4.3). M wird einmalig aus dem Gesamtdatensatz berechnet und bleibt bei Zoom-Anderungen stabil.
- **Erratisch:** Einheit aus T_window (Abschnitt 4.4). Die Einheit kann sich bei Zoom-Wechsel andern.

Die Tick-Erzeugung selbst (Cursor-Algorithmus, Kalender-Alignment, Quarter-End-Weiche) bleibt fur alle Klassen identisch.

**Begrundung (Tufte):** Gleichmassige Tick-Struktur bildet ein stabiles kognitives Referenzraster. Calendar Snap in der Strategy bringt Datenpunkte nahe an die Ticks -- die verbleibenden Restoffsets (max ~30 Tage bei HY/Q) sind bei typischen Chart-Breiten sub-pixel bis minimal.

**Breathing-Room-Regel:** `axis.max += range x 5%` (afterDataLimits). Kalender-Ticks werden bis `dataRange.max + halfStep` erzeugt (endLimit). Der Breathing-Room ist visueller Freiraum, keine Tick-Zone.

**Hilfsutility:** `FwDateUtils.isRegularInterval(timestamps, rhythm)` existiert als Reserve fur den PERIOD-Track (Bar-Charts). Fur SNAPSHOT nicht verwendet.

**Status:** Implementiert (V16.0.0 AP-15, 2026-02-26). CV-Heuristik (Abschnitt 4) ist Zielzustand -- Code-Anpassung in Folge-AP.
