# AP-14e10b — CHART_PLUGIN_ARCHITEKTUR.md nachschärfen — Ergebnis

Stand: 2026-06-22 | Session: B1-AP-14e10b | Geändert von: Claude

---

## Kurzurteil

- §3-Ausnahme für kleine Engine-interne Plugins ersetzt durch „Stand ab AP-14e10b": eindeutige Pflicht, Chart.js-Plugin-Implementierungen ausschließlich unter `plugins/` abzulegen.
- §20.3 Direktimport-Regel geschärft: Barrel ist jetzt verbindlicher Standard; Direktimporte nur als begründeter Sonderfall mit Protokollpflicht.
- §20-Heading aktualisiert: Stand: AP-14e9 → AP-14e10b.
- §20.1–§20.7 inhaltlich konsistent — kein Widerspruch eingeführt.
- Keine Codeänderung. Keine Steuerdateien geändert.

---

## Ausgangslage nach AP-14e10

AP-14e10 hat `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md` §20 NEU angelegt (Plugin-Bestand, Barrel, Importzyklus-Verbot, verbotene Mechanismen, entfernte Elemente, BarChart-Hybrid-Warnung). Zwei ältere Formulierungen blieben zu weich:

1. §3 Ausnahme: „Kleine ChartEngine-interne Plugins [...] dürfen in der bestehenden Engine-Struktur bleiben" — historisch verständlich, aber nach AP-14e1–14e10 ein Schlupfloch.
2. §20.3: „Direktimporte [...] sind erlaubt, wenn nur ein einzelnes Plugin gezielt benötigt wird. Bevorzugt bleibt der Barrel." — schwächt Barrel-Standard.

---

## Vorprüfung

| Suchmuster | Treffer | Bewertung |
|---|---|---|
| `Kleine ChartEngine-interne Plugins` | Zeile 89 — §3 Ausnahme-Absatz | Schlupfloch — ersetzt ✅ |
| `Direktimporte` | Zeile 666 — §20.3 schwache Regel | zu großzügig — geschärft ✅ |
| `plugins/index.js` | 5 Treffer (§20.2, §20.3, §20.4) | konsistent ✅ |
| `FwBarLayoutPlugin` | Zeile 715 — §20.6 als entfernt dokumentiert | korrekt, unverändert ✅ |
| `_fwGeometry` | Zeilen 720, 726, 729, 731, 732, 740 — §20.6 | korrekt, unverändert ✅ |

---

## Geänderte Dateien

1. `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md` — drei chirurgische Edits (§3, §20 Heading, §20.3)

## Nicht geänderte Dateien

- `NAVIGATION.md` — kein Handlungsbedarf (AP-14e10b ist Mini-Nachtrag, kein eigenständiger AP mit Routing-Relevanz)
- `PROJECT-STATUS.md` — kein Handlungsbedarf (wird erst im nächsten vollständigen AP synchronisiert)
- `docs/steering/BACKLOG.md` — kein Handlungsbedarf
- Alle JS-Dateien — unverändert
- Alle Plugin-Dateien — unverändert
- Alle CSS/JSON/CSV-Dateien — unverändert
- X-Achsen-Specs — unverändert

---

## Änderung an §3

**Alt (Ausnahme-Absatz, vor AP-14e10b):**

```
Ausnahme:

Kleine ChartEngine-interne Plugins, die ausschließlich als technische Hilfsfunktion
für genau einen vorhandenen Engine-Call dienen, dürfen in der bestehenden Engine-Struktur
bleiben, wenn sie dort bereits etabliert sind. Neue wiederverwendbare oder app-übergreifend
relevante Plugin-Logik gehört aber in plugins/.
```

**Neu (AP-14e10b-Statushinweis, ersetzt alte Ausnahme):**

```
### Stand ab AP-14e10b

Ab AP-14e10b gilt für Chart.js-Plugins strenger:

Chart.js-Plugin-Implementierungen liegen ausschließlich unter
Theme/assets/js/fw-chart-engine/plugins/.

Ein Plugin = eine Datei.

Inline-Plugins in Strategies, Plugin-Implementierungen in core/
oder technische Re-Export-Shims wie core/FwChartPlugins.js sind
nicht mehr architekturkonform.

Ausnahmen benötigen einen eigenen Design-AP mit dokumentierter Begründung.

Wichtig:

Technische Hilfsfunktionen ohne Chart.js id und ohne Chart.js Lifecycle-Hook
sind keine Plugins. Sie müssen entsprechend anders benannt und dokumentiert werden.
```

**Begründung:** Die alte Ausnahme beschrieb genau den Zustand, der zu `FwChartPlugins.js`-Shim und `FwBarLayoutPlugin`-Inline führte. Nach AP-14e6/14e8 ist dieser Mischzustand beseitigt. Die Ausnahme bleibt als Schlupfloch nicht mehr akzeptabel.

---

## Änderung an §20.3

**Alt:**

```
Engine-Dateien und Strategies importieren aktive Plugins über den Barrel:
[Codebeispiel]
Direktimporte aus einzelnen Plugin-Dateien sind erlaubt, wenn nur ein einzelnes
Plugin gezielt benötigt wird. Bevorzugt bleibt der Barrel.
```

**Neu:**

```
Engine-Dateien und Strategies importieren aktive Plugins grundsätzlich über den Barrel:
[Codebeispiel — unverändert]

Regel:

Der Barrel ist der Standardimportpfad für Engine und Strategies.
Direktimporte aus einzelnen Plugin-Dateien sind nur als begründeter Sonderfall erlaubt.
Ein solcher Sonderfall muss im Ergebnisprotokoll des jeweiligen AP dokumentiert werden.
Plugin-Dateien selbst importieren nie aus plugins/index.js.
```

**Begründung:** Die alte Formulierung „erlaubt, wenn nur ein einzelnes Plugin gezielt benötigt wird" gibt einem LLM die Erlaubnis, den Barrel routinemäßig zu umgehen. Nach AP-14e9 ist der Barrel der vereinheitlichte Standard — Direktimporte sind die Ausnahme, nicht eine gleichwertige Alternative.

---

## §20 Heading-Update

Alt: `## 20. Plugin-Bestand, Barrel und Importregeln (Stand: AP-14e9, 2026-06-22)`
Neu: `## 20. Plugin-Bestand, Barrel und Importregeln (Stand: AP-14e10b, 2026-06-22)`

---

## Konsistenzprüfung §20.1 bis §20.7

| Abschnitt | Inhalt | Status |
|---|---|---|
| §20.1 | Aktiver Plugin-Bestand (4 Plugins) | ✅ unverändert, konsistent |
| §20.2 | Kanonischer Barrel | ✅ unverändert, konsistent |
| §20.3 | Importregel | ✅ geschärft — kein Widerspruch zu §20.2 oder §20.4 |
| §20.4 | Importzyklus-Verbot | ✅ unverändert; §20.3 „Plugin-Dateien importieren nie aus plugins/index.js" ist direktes Pendant |
| §20.5 | Verbotene Mechanismen | ✅ unverändert, konsistent |
| §20.6 | Entfernte Elemente / _fwGeometry | ✅ unverändert, konsistent |
| §20.7 | BarChart-Hybrid-Warnung | ✅ unverändert, konsistent |

---

## Pflichtprüfung nach CHART_ENGINE_REGRESSIONSREGELN.md

- Keine JS-Code-Datei geändert ✅
- Keine allgemeine ChartEngine-Datenlogik geändert ✅
- Keine Datums-/Zeitachsenlogik geändert ✅
- Keine String-Annahmen auf Datumswerten eingeführt ✅
- CSVParser.js unverändert ✅
- FwDateUtils.js unverändert ✅
- FinanzwesirData.js unverändert ✅

---

## Prüfungen

| # | Prüfung | Ergebnis |
|---|---|---|
| 1 | CHART_PLUGIN_ARCHITEKTUR.md enthält keine ungebrochene Erlaubnis mehr für kleine Engine-interne Chart.js-Plugins | ✅ §3 Ausnahme ersetzt |
| 2 | CHART_PLUGIN_ARCHITEKTUR.md sagt klar: Chart.js-Plugin-Implementierungen liegen unter plugins/ | ✅ §3 Stand ab AP-14e10b |
| 3 | CHART_PLUGIN_ARCHITEKTUR.md sagt klar: Ein Plugin = eine Datei | ✅ §3 Stand ab AP-14e10b |
| 4 | CHART_PLUGIN_ARCHITEKTUR.md sagt klar: Inline-/Core-Plugins sind nicht mehr architekturkonform | ✅ §3 Stand ab AP-14e10b |
| 5 | CHART_PLUGIN_ARCHITEKTUR.md erlaubt Ausnahmen nur über eigenen Design-AP | ✅ §3 Stand ab AP-14e10b |
| 6 | CHART_PLUGIN_ARCHITEKTUR.md sagt klar: Barrel ist Standardimportpfad für Engine/Strategies | ✅ §20.3 „grundsätzlich über den Barrel" |
| 7 | Direktimporte sind nur begründete Sonderfälle | ✅ §20.3 Regel-Block |
| 8 | Plugin-Dateien importieren nie aus plugins/index.js | ✅ §20.3 Regel-Block (ergänzt §20.4) |
| 9 | §20.1 bis §20.7 bleiben inhaltlich konsistent | ✅ kein Widerspruch |
| 10 | Keine JS-Code-Dateien geändert | ✅ |
| 11 | Keine Plugin-Dateien geändert | ✅ |
| 12 | Keine Steuerdateien geändert | ✅ |
| 13 | Keine CSS-Dateien geändert | ✅ |
| 14 | Keine JSON-Dateien geändert | ✅ |
| 15 | Keine CSV-Dateien geändert | ✅ |
| 16 | Keine Protected Files geändert | ✅ |

---

## Offene Punkte

Keine.

---

## Blocker

Keine.

---

## Empfohlener nächster AP

**B1-AP-14e11 — Plugin-Architektur-QA mit Importzyklus-Gate**

Inhalt: Statische Prüfung aller Plugin-Imports auf Zyklusfreiheit (grep-basiert); Verifikation dass kein Plugin aus core/strategies/index.js importiert; Abschluss-Audit Plugin-Refactoring-Kette B1-AP-14e1–14e10b.

---

## Bestätigungen

- Nur CHART_PLUGIN_ARCHITEKTUR.md geändert ✅
- Keine Codeänderung vorgenommen ✅
- Keine JS-Dateien geändert ✅
- Keine Plugin-Implementierung geändert ✅
- Keine Steuerdateien geändert ✅
- Keine X-Achsen-Specs geändert ✅
- Kein FwBarLayoutPlugin wieder eingeführt ✅
- Kein plugins/FwBarLayoutPlugin.js angelegt ✅
- Kein core/FwChartPlugins.js wieder eingeführt ✅
- Keine Plugin-Registry gebaut ✅
- Keine Runtime-Registry gebaut ✅
- Kein Chart.register() eingeführt ✅
- Keine Auto-Registration eingeführt ✅
- Keine neue _fwGeometry-Verdrahtung gebaut ✅
- BarChartStrategy.js nicht geändert ✅
- FwSmartXAxis.js nicht geändert ✅
- FwSmartScales.js nicht geändert ✅
- FwDateUtils.js nicht geändert ✅
- Tooltips nicht geändert ✅
- Achsenlogik nicht geändert ✅
- BOP-Anker nicht geändert ✅
- _originalDate nicht geändert ✅
- Semantisches X-Mapping nicht geändert ✅
- CSVParser.js nicht geändert ✅
- FinanzwesirData.js nicht geändert ✅
- Keine CSS-Änderung vorgenommen ✅
- Keine JSON-Änderung vorgenommen ✅
- Keine CSV-Änderung vorgenommen ✅
- Keine Protected Files geändert ✅
- Keine AP-15-Arbeit begonnen ✅
- Keine Commits ausgeführt ✅
