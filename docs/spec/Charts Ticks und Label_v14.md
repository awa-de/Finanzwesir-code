# SPEZIFIKATION: Charts, Ticks & Labels (The Magnetic Grid)

**Projekt:** Finanzwesir Chart Engine
**Modul:** Core / Layout & Scales
**Datei:** `docs/spec/Charts_Ticks_und_Label_v14.md`
**Version:** **14 (Pixel-Budget-Formel)**
**Datum:** 01.03.2026
**Status:** **BINDING / ARCHITECTURAL GOLD STANDARD**

---

## 1. Executive Summary

Diese Spezifikation regelt das Zusammenspiel zwischen technischer Daten-Integritat und kognitiver Ergonomie auf der X-Achse. Sie gilt fur beide Tracks:

- **PERIOD-Track (Balkendiagramme):** Ticks reprasentieren Periodenstart. Steuerung uber die Unified Density Matrix (Abschnitt 5.1-5.3) und die Waterfall Matrix (Abschnitt 6).
- **SNAPSHOT-Track (Liniendiagramme):** Ticks reprasentieren Kalenderzeitpunkte auf einer proportionalen Zeitachse. Steuerung uber die **Pixel-Budget-Formel** (Abschnitt 5.4).

**Die Leitprinzipien:**

1. **Integrity (Noon-Anchor):** Alle Daten werden auf 12:00 Uhr lokal geankert.
2. **Pixel-Budget:** Tick-Platzierung ist eine reine Funktion von **Zeitspanne x Zone**. Der Daten-Rhythmus ist irrelevant fur die Tick-Wahl (Abschnitt 5.4).
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
| 7 | 2 Jahre | 1. Januar (gerade Jahre) |
| 8 | 5 Jahre | 1. Januar (Vielfaches von 5) |
| 9 | 10 Jahre | 1. Januar (Vielfaches von 10) |

Die Hierarchie ist aufwarts geschlossen: jede grobere Einheit ist ein exaktes Vielfaches der feineren.

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

## 4. Rhythmus-Erkennung (Scope & Rolle)

### 4.1 Rolle der Rhythmus-Erkennung in v14

**Wichtige Abgrenzung:** Die Rhythmus-Erkennung bestimmt **nicht** die Tick-Platzierung. Ticks werden ausschliesslich durch die Pixel-Budget-Formel (Abschnitt 5.4) gesteuert, die nur Zeitspanne und Zone als Eingabe hat.

Die Rhythmus-Erkennung wird fur zwei andere Zwecke benotigt:

1. **Calendar Snap (Abschnitt 9):** Der erkannte Rhythmus bestimmt, wie Datenpunkte auf Kalender-Grenzen gesnappt werden (YEARLY -> Jan 1, MONTHLY -> 1. des Monats, etc.).
2. **Tooltip-Formatierung:** Der Rhythmus bestimmt die Darstellung im Tooltip-Header (Monatsname, Quartal, Jahr).

### 4.2 Heuristik: Median und CV-Klassifikation

**Schritt 1:** Berechne alle N-1 Intervalle zwischen aufeinanderfolgenden Datenpunkten in Tagen.

**Schritt 2:** Berechne Median-Intervall (M) aus dem **Gesamtdatensatz** und Variationskoeffizient (CV = Standardabweichung / Mittelwert) pro **sichtbarem Zeitfenster**.

**Schritt 3 -- Klassifikation:**

| Klasse | CV | Vorgehen |
| :--- | :--- | :--- |
| Regulaer | <= 0,30 | Rhythmus = Kalendereinheit, die M am nachsten liegt (Abschnitt 4.3) |
| Luckenhaft | 0,30 < CV <= 0,60 | Wie Regulaer |
| Erratisch | > 0,60 oder N <= 2 | Rhythmus aus T_window (Abschnitt 4.4) |

### 4.3 Mapping M -> Kalendereinheit (Regulaer / Luckenhaft)

| M (Tage) | Kalendereinheit |
| :--- | :--- |
| <= 2 | Tag |
| <= 10 | Woche |
| <= 45 | Monat |
| <= 100 | Quartal |
| <= 200 | Halbjahr |
| > 200 | Jahr |

### 4.4 Erratisch-Fallback (T_window -> Rhythmus)

| T_window | Rhythmus |
| :--- | :--- |
| <= 1 Jahr | Quartal |
| <= 3 Jahre | Halbjahr |
| <= 10 Jahre | Jahr |
| > 10 Jahre | Jahr |

### 4.5 Zoom-Buttons

Verfugbare Zoom-Buttons: **1J, 3J, 5J, 10J, max.**

Das System blendet Buttons aus, die den Datensatz uberschreiten. Beispiel: Datensatz 4 Jahre -> sichtbar: 1J, 3J, max.

### 4.6 Referenz-Datensatze

Diese Datensatze validieren die Rhythmus-Erkennung fur Snap und Tooltip-Formatierung.

**0. `snap_period_monthly_30m.csv` (Regelmassige Monats-Reihe)**

- N=30, Zeitraum ~2,5 Jahre, M~30-31 Tage, CV~0
- Klasse: Regulaer -> Rhythmus: Monat
- Snap: 1. des Monats. Tooltip: Monatsformat.
- Ticks bei max: Pixel-Budget-Formel mit 2,5 Jahren (Abschnitt 5.4)

**1. `tool_tip_monthly_gaps.csv`**

- N=9, Zeitraum 0,9 Jahre, M=31d, CV=0,53
- Klasse: Luckenhaft -> Rhythmus: Monat
- Snap: 1. des Monats. Tooltip: Monatsformat.

**2. `tt_gap_test_irregular.csv`**

- N=6, Zeitraum 1,0 Jahre, M=73d, CV=0,31
- Klasse: Luckenhaft -> Rhythmus: Quartal
- Snap: 1. des Monats. Tooltip: Quartalsformat.

**3. `snap_period_yearly_irregular.csv`**

- N=8, Zeitraum 8,8 Jahre, M=488d, CV=0,18
- Klasse: Regulaer -> Rhythmus: Jahr
- Snap: 1. Januar. Tooltip: Jahresformat.

**4. `scenario_4_crash.csv`**

- N=21, CV=0,86
- Klasse: Erratisch -> Rhythmus: T_window-gesteuert
- Snap und Tooltip folgen dem erkannten Rhythmus.

**5. `scenario_1_long_25y.csv` und `scenario_2_long_25y.csv`**

- Beide: 25 Jahre Zeitspanne, identischer Start/Ende
- scenario_1: Mixed-Rhythm (Q + Y), scenario_2: durchgangig Quartale
- **Kern-Validierung:** Beide Dateien erhalten identische Ticks auf der X-Achse, weil die Tick-Platzierung nur von Zeitspanne x Zone abhangt, nicht vom Daten-Rhythmus.
- Ticks bei max L: year/2 (2000, 2002, ... 2024). M/S: year/5 (2000, 2005, ... 2025).
- Ticks bei 1J L/M: month/1 (Jan '24 ... Jan '25). S: quarter/1 (Jan '24, Apr '24, Jul '24, Okt '24, Jan '25).

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

### 5.4 SNAPSHOT-Track: Pixel-Budget-Formel (v14, ersetzt SNAPSHOT_BASE)

#### 5.4.1 Das Grundprinzip

**Tick-Platzierung ist eine reine Funktion von Zeitspanne x Zone.** Der Daten-Rhythmus hat keinen Einfluss auf die Tick-Wahl.

Beweis durch drei Gedankenexperimente (01.03.2026):

1. `scenario_1_long_25y.csv` (Mixed-Rhythm: Quartale + Jahre) und `scenario_2_long_25y.csv` (durchgangig Quartale) haben dieselbe Zeitspanne (25 Jahre). Beide erhalten identische Ticks: L year/2, M/S year/5.
2. `snap_period_quarterly_3y.csv` (reine Quartalsdaten, 2,75 Jahre): Tick-Platzierung ergibt sich aus 2,75 Jahre x Zone, nicht aus dem Quartals-Rhythmus der Daten.
3. Bei 1J-Zoom erhalten alle drei Dateien dieselbe Tick-Struktur: L/M month/1, S quarter/1 -- unabhangig davon ob die Datei monatliche, quartalsweise oder jahrliche Punkte enthalt.

Die bisherigen handgebauten SNAPSHOT-Tabellen (v13: SNAPSHOT_BASE, Rhythm Overrides fur YEARLY/HALF_YEARLY) werden durch eine berechnete Formel ersetzt.

#### 5.4.2 Die Formel

```text
Eingabe:  durationYears, zone (S/M/L)
Ausgabe:  { unit, stepSize, format }

1. Verfugbare Breite bestimmen (Abschnitt 5.9)
2. Kandidaten-Liste durchlaufen (feinster zuerst)
3. Fur jeden Kandidat:
   tick_count  = durationYears x ticks_pro_jahr
   slot_width  = label_width(format, font_size[zone]) + autoSkipPadding
   capacity    = floor(verfugbare_breite / slot_width)
4. Erster Kandidat mit tick_count <= capacity gewinnt.
```

**Ziel:** So viele Ticks wie moglich zeigen, solange sie lesbar bleiben.

#### 5.4.3 Kandidaten-Listen

Zwei Listen, abhangig davon ob die Zeitspanne <= 1 Jahr oder > 1 Jahr betragt:

**Kandidaten <= 1 Jahr** (Kurzformat ohne Jahresangabe):

| # | Unit | Step | Ticks/Jahr | Format | Slot S (11px) | Slot M/L (12px) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | day | 1 | 365 | `d.M.` | 46px | 49px |
| 2 | day | 3 | 122 | `d.M.` | 46px | 49px |
| 3 | day | 7 | 52 | `d.M.` | 46px | 49px |
| 4 | day | 14 | 26 | `d.M.` | 46px | 49px |
| 5 | month | 1 | 12 | `MMM` | 42px | 45px |
| 6 | quarter | 1 | 4 | `MMM` | 42px | 45px |

**Kandidaten > 1 Jahr** (Langformat mit Jahresangabe):

| # | Unit | Step | Ticks/Jahr | Format | Slot S (11px) | Slot M/L (12px) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | month | 1 | 12 | `MMM 'yy` | 62px | 66px |
| 2 | quarter | 1 | 4 | `MMM 'yy` | 62px | 66px |
| 3 | quarter | 2 | 2 | `MMM 'yy` | 62px | 66px |
| 4 | year | 1 | 1 | `yyyy` | 46px | 49px |
| 5 | year | 2 | 0,5 | `yyyy` | 46px | 49px |
| 6 | year | 5 | 0,2 | `yyyy` | 46px | 49px |
| 7 | year | 10 | 0,1 | `yyyy` | 46px | 49px |

**Hinweise:**

- **Kurzformat bei <= 1 Jahr:** `MMM` statt `MMM 'yy` spart ~20px pro Label. Das Jahr ergibt sich aus dem Kontext (BAN-Headline, Tooltip). Entscheidung vom 01.03.2026.
- **Quarter-End-Konvention:** Alle Kandidaten mit unit=quarter zeigen Marz/Juni/September/Dezember (Abschnitt 5.8). Kandidat #6 (quarter/1 bei <= 1 Jahr) zeigt ebenfalls Quarter-End-Monate.
- **Halbjahres-Ticks:** Kandidat #3 (quarter/2 bei > 1 Jahr) erzeugt exakt 2 Ticks pro Jahr: Juni und Dezember (Abschnitt 5.8).

#### 5.4.4 Kapazitaten-Tabelle

| Zone | Nutzbare Breite | Cap `yyyy` / `d.M.` | Cap `MMM` | Cap `MMM 'yy` / `d. MMM` |
| :--- | :--- | :--- | :--- | :--- |
| S | 270px | 5 | 6 | 4 |
| M | 620px | 12 | 13 | 9 |
| L | 940px | 19 | 20 | 14 |

Herleitung der nutzbaren Breite: Abschnitt 5.9.

#### 5.4.5 Validierungstabelle (Ergebnis der Formel)

Diese Tabelle zeigt das Ergebnis der Pixel-Budget-Formel fur alle praxisrelevanten Zeitspannen. Jede Zeile ist rechnerisch nachvollziehbar uber die Kandidaten-Listen (Abschnitt 5.4.3) und Kapazitaten (Abschnitt 5.4.4).

| Dauer | L | M | S |
| :--- | :--- | :--- | :--- |
| 0,5y | month/1, `MMM` (6) | month/1, `MMM` (6) | month/1, `MMM` (6) |
| 1y | month/1, `MMM` (12) | month/1, `MMM` (12) | quarter/1, `MMM` (4) |
| 2,75y | quarter/1, `MMM 'yy` (11) | quarter/2, `MMM 'yy` (6) | year/1, `yyyy` (3) |
| 3y | quarter/1, `MMM 'yy` (12) | quarter/2, `MMM 'yy` (6) | year/1, `yyyy` (3) |
| 5y | quarter/2, `MMM 'yy` (10) | year/1, `yyyy` (5) | year/1, `yyyy` (5) |
| 10y | year/1, `yyyy` (10) | year/1, `yyyy` (10) | year/2, `yyyy` (5) |
| 25y | year/2, `yyyy` (13) | year/5, `yyyy` (5) | year/5, `yyyy` (5) |

**Lesebeispiel:** 2,75 Jahre auf Zone M -> Kandidat month/1 erzeugt 33 Ticks, braucht Format `MMM 'yy` (Slot 66px), Kapazitat M = 9 -> 33 > 9, passt nicht. Nachster: quarter/1 erzeugt 11 Ticks -> 11 > 9, passt nicht. Nachster: quarter/2 erzeugt 6 Ticks -> 6 <= 9, passt. Ergebnis: quarter/2, `MMM 'yy`, 6 Halbjahres-Ticks (Jun/Dez).

#### 5.4.6 Konkrete Ticks (Referenzbeispiele)

**25 Jahre (max), beide Szenarien identisch:**

| Zone | Step | Ticks |
| :--- | :--- | :--- |
| L | 2y | 2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024 |
| M | 5y | 2000, 2005, 2010, 2015, 2020, 2025 |
| S | 5y | 2000, 2005, 2010, 2015, 2020, 2025 |

**1 Jahr (1J-Button, letztes Jahr):**

| Zone | Step | Ticks |
| :--- | :--- | :--- |
| L | 1 Mon | Jan, Feb, Mar, Apr, Mai, Jun, Jul, Aug, Sep, Okt, Nov, Dez, Jan |
| M | 1 Mon | Jan, Feb, Mar, Apr, Mai, Jun, Jul, Aug, Sep, Okt, Nov, Dez, Jan |
| S | 1 Q | Jan, Apr, Jul, Okt, Jan |

**2,75 Jahre (snap_period_quarterly_3y.csv bei max):**

| Zone | Step | Ticks |
| :--- | :--- | :--- |
| L | 1 Q | Mar '21, Jun '21, Sep '21, Dez '21, Mar '22, Jun '22, Sep '22, Dez '22, Mar '23, Jun '23, Sep '23, Dez '23 |
| M | HJ | Jun '21, Dez '21, Jun '22, Dez '22, Jun '23, Dez '23 |
| S | 1y | 2021, 2022, 2023 |

### 5.5 Rhythm Overrides -- nur PERIOD-Track

**Hinweis v14:** Die Rhythm Overrides in v13 galten fur beide Tracks. In v14 gelten sie **nur noch fur den PERIOD-Track**. Der SNAPSHOT-Track wird vollstandig durch die Pixel-Budget-Formel (Abschnitt 5.4) gesteuert -- Rhythm Overrides sind dort obsolet.

Die folgenden Overrides greifen **vor** der PERIOD-Tabellensuche (Abschnitt 5.1-5.3):

| Rhythmus | Dauer | Unit | Step | Mode | Format |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **YEARLY** | `<= 10` | `year` | 1 | YEAR | `yyyy` |
| **YEARLY** | `> 10` | `year` | 5 | YEAR | `yyyy` |
| **HALF_YEARLY** | `<= 5` | `quarter` | 2 | HALF_YEAR | Zone S: `MMM`, sonst `MMM 'yy` |
| **HALF_YEARLY** | `<= 10` | `year` | 1 | YEAR | `yyyy` |
| **HALF_YEARLY** | `> 10` | `year` | 5 | YEAR | `yyyy` |

### 5.6 Floor Principle (nachgelagerter Guard)

**Rolle in v14:** Das Floor Principle ist ein **nachgelagerter Guard**, kein Input fur die Tick-Berechnung. Die Pixel-Budget-Formel (Abschnitt 5.4) bestimmt die Ticks. Der Floor Guard pruft anschliessend, ob das Ergebnis zum Daten-Rhythmus passt, und korrigiert nur in Ausnahmefallen.

**Regel:** Tick-Granularitat darf nie feiner sein als der Daten-Rhythmus. Wochentliche Daten bekommen keine taglichen Ticks.

**Wann greift der Guard?** Nur bei sehr kurzen Zeitspannen, wo die Formel Tages-Ticks vorschlagt, die Daten aber grober sind:

| Daten-Rhythmus | Minimum-Tick-Unit | Wann relevant |
| :--- | :--- | :--- |
| WEEKLY | month | Zeitspanne < 0.5y, Formel schlage day vor |
| MONTHLY | month | Nicht relevant (Formel schlage nie day fur >= 1 Monat vor) |
| QUARTERLY+ | quarter | Nicht relevant (Formel wahlt ohnehin quarter oder grober) |

**Praktische Auswirkung:** Der Guard greift nur fur WEEKLY-Daten bei kurzen Zeitspannen. Fur alle anderen Falle liefert die Pixel-Budget-Formel bereits das korrekte Ergebnis.

**SNAPSHOT-spezifische Floor-Tabellen (WEEKLY, DAILY):**

| Rhythmus | Dauer | Unit | Step | Begrundung |
| :--- | :--- | :--- | :--- | :--- |
| **WEEKLY** (SNAPSHOT) | `<= 0.5` | `month` | 1 | Floor: Wochen-Daten -> Monats-Ticks (nicht Tages-Ticks) |
| **DAILY** (SNAPSHOT) | `<= 0.04` (~14d) | `day` | Zone S: 3, sonst 1 | Jeder Tag (Desktop), alle 3 Tage (Mobile) |
| **DAILY** (SNAPSHOT) | `<= 0.25` (~91d) | `day` | Zone S: 14, sonst 7 | Wochentliche Ticks auf Tagesbasis |

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

### 5.9 Pixel-Budget (Grundlage der Formel)

Das Pixel-Budget bestimmt, wie viele Tick-Labels eine Zone darstellen kann, ohne dass sich Labels uberlappen. Es ist die **Grundlage** der Pixel-Budget-Formel (Abschnitt 5.4).

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

---

## 6. The Waterfall Matrix -- PERIOD-Track (Rhythm & Snapping)

Luckenlose Analyse der Datenfrequenz zur Steuerung des visuellen Snappings. Diese Matrix gilt fur den **PERIOD-Track (Balkendiagramme)**. Fur den SNAPSHOT-Track siehe Abschnitt 4 (Rhythmus-Erkennung fur Snap) und Abschnitt 5.4 (Pixel-Budget-Formel fur Ticks).

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

Die Rhythmus-Erkennung (`detectRhythm`) liegt in **`core/FwDateUtils.js`**. Sie ist die Single Source of Truth fur Snap-Verhalten und Tooltip-Formatierung (KDR 11). Sie bestimmt **nicht** die Tick-Platzierung -- das macht die Pixel-Budget-Formel (Abschnitt 5.4).

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

### 9.4 Tick-Erzeugung: Kalender-Ticks mit Pixel-Budget-Formel

**Alle SNAPSHOT-Rhythmen** nutzen Kalender-Ticks (`_generateLinearTicks`). Die Tick-Erzeugung ist cursor-basiert: ein Cursor lauft ab `axis.min` in Kalendereinheits-Schritten und erzeugt Ticks an den Kalender-Grenzen der gewahlten Einheit.

**Einheitenwahl:** Die Wahl der Tick-Einheit (Tag, Monat, Quartal, Jahr, ...) erfolgt durch die **Pixel-Budget-Formel** (Abschnitt 5.4). Die Formel benotigt nur Zeitspanne und Zone als Eingabe. Der Daten-Rhythmus fliesst nicht ein.

Die Tick-Erzeugung selbst (Cursor-Algorithmus, Kalender-Alignment, Quarter-End-Weiche) ist fur alle Daten identisch.

**Begrundung (Tufte):** Gleichmassige Tick-Struktur bildet ein stabiles kognitives Referenzraster. Calendar Snap in der Strategy bringt Datenpunkte nahe an die Ticks -- die verbleibenden Restoffsets (max ~30 Tage bei HY/Q) sind bei typischen Chart-Breiten sub-pixel bis minimal.

**Breathing-Room-Regel:** `axis.max += range x 5%` (afterDataLimits). Kalender-Ticks werden bis `dataRange.max + halfStep` erzeugt (endLimit). Der Breathing-Room ist visueller Freiraum, keine Tick-Zone.

---

## Anhang: Anderungshistorie v13 -> v14

| Abschnitt | Anderung | Begrundung |
| :--- | :--- | :--- |
| §1 Leitprinzip 2 | "Rhythm" -> "Pixel-Budget" | Tick-Platzierung ist rhythmus-unabhangig |
| §4 Titel | "SNAPSHOT Rhythmus-Erkennung" -> "Rhythmus-Erkennung (Scope & Rolle)" | Klarstellung: nur fur Snap/Tooltip, nicht fur Ticks |
| §4.1 | Neu: "Rolle der Rhythmus-Erkennung in v14" | Abgrenzung Rhythmus vs. Tick-Platzierung |
| §4.6 | Referenz 5 ergranzt (scenario_1/2) | Beweis fur Kern-Erkenntnis |
| §5.4 | Komplett ersetzt: SNAPSHOT_BASE -> Pixel-Budget-Formel | Kern-Anderung v14 |
| §5.5 | Scope eingeschrankt: nur PERIOD | SNAPSHOT braucht keine Rhythm Overrides |
| §5.6 | Umformuliert: "nachgelagerter Guard" | War falschlich als Matrix-Input interpretiert |
| §5.9 | Rolle geandert: "Validierung" -> "Grundlage" | Pixel-Budget ist jetzt das Fundament |
| §8.1 | Klarstellung: FwDateUtils != Tick-Platzierung | Konsistenz mit §4.1 |
| §9.4 | "CV-gesteuerte Einheitenwahl" -> "Pixel-Budget-Formel" | Konsistenz mit §5.4 |
