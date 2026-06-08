# AP-15: SNAPSHOT X-Achse — Neudesign

> **Anleitung:** Diesen Prompt als Startnachricht in einen neuen Faden kopieren.

---

## Prompt (ab hier kopieren)

Du arbeitest an der Finanzwesir Chart Engine (Client-Side BI, Chart.js).

**Zielprodukt:** Ghost.io-Theme. Alle Dateien liegen lokal unter `assets/`.

### Dein Auftrag

Durchdenke die X-Achse für **Liniendiagramme** von vorne. Ganz neu. Rein konzeptionell.
Nach FAANG-Kriterien. So einfach wie möglich.

Erst der Entwurf. Dann die Implementation. Nicht umgekehrt.

### Was du hast

- **Start- und Enddatum** aus den CSV-Daten
- **Einen Rhythmus**, der erkannt wird: täglich, wöchentlich, monatlich, quartalsweise, halbjährlich, jährlich. Der kann regelmäßig oder unregelmäßig sein
- **Ticks** laufen stur im Rhythmus durch. Industriestandard:
  - Quartale: Jan / Apr / Jul / Okt
  - Halbjahre: Jan / Jul
  - Monate: Jan / Feb / Mär / ...
  - Jahre: 2020 / 2021 / ...
- **Alle Datenpunkte** werden mit einer Linie verbunden, egal wie weit sie auseinander sind. Start immer ganz links an der Y-Achse
- **Eine Granularität** (das ist das Snapping): wenn der Rhythmus über täglich hinausgeht, müssen die Daten in ein Raster gebracht werden. Beispiel monatlich: egal ob 14.3, 1.3 oder 31.3 — das ist immer "März". Beispiel quartalsweise: 31. März = Q1, 15. Februar = Q1, 1. Januar = Q1

### Die bindende Spec

Lies als Erstes: `docs/spec/Charts Ticks und Label_v12.md`

Besonders relevant:
- §3: Unified Density Matrix (welche Ticks bei welcher Dauer und Bildschirmbreite)
- §4: Waterfall Matrix (Rhythmus-Erkennung)
- §7: SNAPSHOT-Ergänzungen (Liniendiagramme)

### Was schiefgelaufen ist (AP-14 + AP-15, 3 gescheiterte Iterationen)

Die SNAPSHOT-X-Achse (Liniendiagramme) wurde in AP-12/AP-14 um drei Systeme erweitert:
Universal Snap, isRegularSeries-Guard, Data-Anchored Ticks. Die Systeme interagierten
emergent und erzeugten Regressionen.

**Iteration 1 — Snap komplett entfernt:**
Einheitliche Kalender-Ticks für alle Rhythmen, kein Snap.
→ MONTHLY-Regression: Datenpunkt 15. Januar sitzt optisch beim Feb-Tick, weil der
Jan-Tick (1. Jan) vor axis.min (15. Jan) liegt und herausgefiltert wird.

**Iteration 2 — Selektiver Snap (nur MONTHLY/QUARTERLY/YEARLY):**
MONTHLY → Snap auf 1. des Monats (funktioniert).
QUARTERLY → Snap auf 1. des Monats (31. März → 1. März). Aber der nächste Quartals-Tick
ist Apr 1. Der Datenpunkt sitzt 2 Monate vor dem Tick. Regression.
Dann QUARTERLY auf Quartals-Start gesnappt (31. März → 1. Januar). Tooltip zeigt
"Januar" statt "März". Auch nicht akzeptabel, weil es nur EIN Quartals-Format geben darf.

**Iteration 3 — Zero Snap:**
Daten an echten Positionen, Ticks an Kalender. Kein Snap nirgends.
→ User: "schlechter als bisher."

**Kern-Erkenntnis:** Das Problem hat zwei Dimensionen, die sich gegenseitig blockieren:
1. Snap auf Kalender-Grid → funktioniert für MONTHLY, bricht für QUARTERLY und HALF_YEARLY
2. Kein Snap → optische Verschiebung bei allen Rhythmen mit Offset > wenige Tage

### Aktueller Code-Zustand (BROKEN — nach Iteration 3)

| Datei | Version | Zustand |
|-------|---------|---------|
| `FwDateUtils.js` | V5.2.0 | `getSnapTarget` gelöscht, `isRegularSeries` gelöscht, `isRegularDayPattern` gelöscht |
| `LineChartStrategy.js` | V15.2.0 | Kein `snappedTimestamps`, kein `_originalDate`, `x: timestamps[idx]` (echte Positionen) |
| `FwSmartXAxis.js` | V9.0.0 | Guard entfernt, Data-Anchored gelöscht (~95 Zeilen), HALF_YEARLY-Tabelle `unit:'month', stepSize:6`, endLimit + halfStep |
| `FwSmartTooltips.js` | V3.4.0 | Unverändert, Fallback `item.parsed.x` |

### Isolations-Garantie

Die Weiche `if (isSnapshot) { return; }` in `FwSmartXAxis.compute()` ist eine harte
architektonische Grenze. Der PERIOD-Track (Balkendiagramme) darf **NICHT** berührt werden.
Alles in diesem AP betrifft ausschließlich Liniendiagramme.

### Testdaten

- `data/snap_period_half_yearly_4y.csv` — 8 Punkte, Jun 30 / Dez 31, 2020–2023
- `data/snap_period_half_yearly_12y.csv` — 24 Punkte, Jun 30 / Dez 31, 2012–2023
- `data/snap_period_quarterly_3y.csv` — 12 Punkte, Quartalsende (31.3/30.6/30.9/31.12), 2021–2023
- `data/snap_period_monthly_4m.csv` — 4 Punkte, 15. des Monats, Jan–Apr 2024
- `data/tt_gap_test_irregular.csv` — irreguläre Abstände
- Alle CSVs in `data/` als Regressions-Check

### Kontext lesen (in dieser Reihenfolge)

1. `docs/spec/Charts Ticks und Label_v12.md` — DIE Spec für X-Achse (bindend)
2. `assets/js/fw-chart-engine/core/FwSmartXAxis.js` — X-Achsen-Spezialist (aktueller Code)
3. `assets/js/fw-chart-engine/core/FwDateUtils.js` — Zeit-Utilities (Rhythmus-Erkennung, Parsing)
4. `assets/js/fw-chart-engine/strategies/LineChartStrategy.js` — Line-Chart-Strategie (transform)
5. `assets/js/fw-chart-engine/core/FwSmartTooltips.js` — Tooltip-Konfiguration
6. `docs/context/KNOWN-ISSUES-SCHLACHTPLAN.md` — AP-14 und AP-15 Abschnitte (Kontext)

### WAS NICHT TUN

- **NICHT** den PERIOD-Track (Bar) ändern — eigener Code-Pfad, funktioniert
- **NICHT** ohne konzeptionellen Entwurf Code schreiben
- **NICHT** die Density Matrix (SNAPSHOT_TABLES) ändern ohne die Spec zu lesen
- **NICHT** die Y-Achse, Tooltips oder BAN-Headline anfassen — funktionieren
- **NICHT** Layer 1 (CSVParser, FinanzwesirData) oder fwContext-Grundstruktur ändern

### Regeln

- Ein Faden = ein AP (maximal).
- Wenn eine User-Entscheidung nötig ist: Frage stellen, nicht raten.
- Wenn das AP größer ist als erwartet: Stopp, neu planen, User informieren.
- Alle Code-Änderungen gegen die Specs in `docs/spec/` prüfen.
- **Kein `git commit`!** Der User committet selbst. Claude liefert die fertige Commit-Message.
- Abschluss-Ritual am Ende (Specs, KNOWN-ISSUES, MEMORY.md, Commit-Message).

---

> **Nach dem Abschluss-Ritual:** User committet, öffnet neuen Faden für das nächste AP.
