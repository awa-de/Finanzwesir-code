# AP-14e10 — Plugin-Spec, Spec-Drift und Steuerdateien synchronisieren — Ergebnis

Stand: 2026-06-22 | Session: B1-AP-14e10 | Geändert von: Claude

---

## Kurzurteil

- CHART_PLUGIN_ARCHITEKTUR.md §20 NEU: Plugin-Bestand, Barrel, Importzyklus-Verbot, verbotene Mechanismen, entfernte Elemente, _fwGeometry-Drift, BarChart-Hybrid-Warnung — alle Pflichtinhalte aus AP-Spec enthalten.
- NAVIGATION.md: Plugin-Routing-Hinweis um Barrel und Importzyklus-Verbot erweitert; B1-AP-14e10-Eintrag angelegt.
- PROJECT-STATUS.md: HOOK-META, HOOK-META-SESSION, Stand, §4 und §8 auf AP-14e10 synchronisiert.
- Kein Code geändert. Alle 16 Prüfpunkte grün.
- Offene Punkte: X-Achsen-Spec-Drift bewusst in §20.6 dokumentiert, alte Docs nicht geändert.

---

## Ausgangslage nach AP-14e9

AP-14e9 hat `plugins/index.js` als kanonischen Barrel angelegt (4 Named Re-Exports: CenterTextPlugin, CrosshairPlugin, FwAnnotationPulsePlugin, FwVerticalLinePlugin). ChartEngine.js, LineChartStrategy.js und PieChartStrategy.js importieren über den Barrel. Alle manuellen Tests bestanden.

Fehlende Dokumentation:
- CHART_PLUGIN_ARCHITEKTUR.md beschrieb keinen aktiven Plugin-Bestand, kein Barrel, kein Importzyklus-Verbot, keine verbotenen Mechanismen, keine entfernten Elemente.
- NAVIGATION.md kannte plugins/index.js als Barrel nicht.
- PROJECT-STATUS.md zeigte noch AP-14e9 als aktuellen Stand.

---

## Gelesene Dateien

- `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md` (vollständig, 613 Zeilen vor Edit)
- `NAVIGATION.md` (vollständig, 364 Zeilen vor Edit)
- `PROJECT-STATUS.md` (vollständig, 551 Zeilen)
- `docs/steering/BACKLOG.md` (vollständig, 79 Zeilen)
- `docs/steering/patches/AP-14e7_FwBarLayoutPlugin-Hybrid-Pruefung_Ergebnis.md`
- `docs/steering/patches/AP-14e8_FwBarLayoutPlugin-Dead-State-entfernen_Ergebnis.md`
- `docs/steering/patches/AP-14e9_Plugin-Barrel_Ergebnis.md`
- X-Achsen-Docs (Zusammenfassung über spec-scout): Bestätigt _fwGeometry als historische Designintention

---

## Suchbefunde

| Suchmuster | Treffer in docs/ / Steuerdateien | Bewertung |
|---|---|---|
| `FwBarLayoutPlugin` | NAVIGATION.md B1-Block (AP-14e7/14e8-Einträge) | historische Referenz — korrekt |
| `fwBarLayout` | NAVIGATION.md B1-Block (AP-14e8-Eintrag) | historische Referenz — korrekt |
| `_fwGeometry` | NAVIGATION.md B1-Block (AP-14e7-Eintrag); X-Achsen-Docs | historisch/Drift — dokumentiert in §20.6 |
| `FwChartPlugins` | NAVIGATION.md B1-Block (AP-14e4/14e5/14e6-Einträge) | historische Referenz — korrekt |
| `plugins/index.js` | NICHT in CHART_PLUGIN_ARCHITEKTUR.md vor Edit | Lücke — geschlossen in §20 |
| `Plugin-Registry` | keine Treffer | kein Handlungsbedarf |
| `Chart.register` | kein Treffer in Produktionscode | kein Handlungsbedarf |

Importzyklus-Check Plugin-Dateien:

| Suchmuster | Treffer |
|---|---|
| `from '../core` | keine Treffer in plugins/ |
| `from '../strategies` | keine Treffer in plugins/ |
| `from './index.js` | keine Treffer in plugins/ |
| `Chart.register` in fw-chart-engine/ | kein Treffer in Produktionscode |

Befund: Kein Importzyklus vorhanden. Kein Chart.register() in Produktionscode.

---

## Geänderte Dateien

1. `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md` — Stand-Datum aktualisiert (2026-06-18 → 2026-06-22); §20 NEU angelegt
2. `NAVIGATION.md` — Stand-Datum aktualisiert; Plugin-Routing-Hinweis erweitert; B1-AP-14e10-Eintrag angelegt
3. `PROJECT-STATUS.md` — HOOK-META Nächster-Schritt auf AP-14e11; HOOK-META-SESSION auf AP-14e10; Stand auf AP-14e10; §4 Apps auf AP-14e10 aktualisiert; §8 AP-14e10-Eintrag angelegt
4. `docs/steering/patches/AP-14e10_Plugin-Spec-und-Steuerdateien-Sync_Ergebnis.md` — dieses Protokoll (NEU)

## Nicht geänderte Dateien

- `docs/steering/BACKLOG.md` — kein Handlungsbedarf (B1-APs werden in NAVIGATION.md B1-Block geführt, nicht im BACKLOG)
- `docs/spec/Dokumentation Die Baendigung der X-Achse I.md` — nicht geändert (Drift in §20.6 dokumentiert)
- `docs/spec/Dokumentation Die Baendigung der X-Achse II.md` — nicht geändert (kein _fwGeometry-Bezug gefunden)
- `docs/spec/Dokumentation Die Baendigung der X-Achse III.md` — nicht geändert (Drift in §20.6 dokumentiert)
- Alle JS-Dateien — unverändert
- Alle Plugin-Dateien — unverändert
- Alle CSS/JSON/CSV-Dateien — unverändert

---

## Plugin-Spec-Sync

### Aktiver Plugin-Bestand

CHART_PLUGIN_ARCHITEKTUR.md §20.1 nennt jetzt genau vier aktive Plugins:
- CenterTextPlugin
- CrosshairPlugin
- FwAnnotationPulsePlugin
- FwVerticalLinePlugin

### Kanonischer Barrel

§20.2: `plugins/index.js` ist kanonischer Exportpunkt. Named Re-Exports only, keine Logik, keine Registry, kein Chart.register().

### Importregel

§20.3: Engine/Strategies importieren über `../plugins/index.js`.

### Anti-Zyklus-Regel

§20.4: Plugin-Dateien dürfen nicht aus `core/`, `strategies/` oder `plugins/index.js` importieren. Verifiziert: kein Zyklus im aktuellen Code.

### Nicht erlaubte Mechanismen

§20.5: Plugin-Registry, Runtime-Registry, Auto-Registration, Chart.register(), implizite Aktivierung, Plugin-Liste als Laufzeit-Schalter — alle explizit verboten.

### Entfernte / nicht aktive Elemente

§20.6:
- `core/FwChartPlugins.js`: entfernt (AP-14e6)
- `FwBarLayoutPlugin`: entfernt nach Dead-State-Nachweis (AP-14e8)
- `chart._fwGeometry`: kein aktiver Kanal; Reaktivierung nur über Design-AP

### BarChart-Hybrid-Warnung

§20.7: BarChartStrategy ist Sonderzone (History/Zeit + Ranking/Kategorie). Alte X-Achsen-Ideen dürfen dort nicht beiläufig reaktiviert werden.

---

## _fwGeometry-Spec-Drift

Befund (AP-14e7):
- X-Achsen-Docs I und III beschreiben `_fwGeometry` als aktiven Plugin-Achse-Kommunikationskanal.
- Tatsächliche Implementierung: FwSmartXAxis.afterFit() berechnet halfBarPixel eigenständig, liest _fwGeometry nicht.
- Divergenz: bekannte Designintention vs. nicht verdrahtete Implementierung.

Entscheidung in AP-14e10:
- X-Achsen-Docs werden nicht geändert (historische Designdokumentation bleibt erhalten).
- Drift ist in CHART_PLUGIN_ARCHITEKTUR.md §20.6 explizit dokumentiert.
- Reaktivierung nur über eigenen Design-AP.

---

## Alte X-Achsen-Specs: Umgang / Entscheidung

Bewusst nicht geändert. Grund: Die Docs beschreiben die historische Designintention. Eine Änderung würde die Entstehungsgeschichte löschen. Der aktuelle Implementierungsstand ist maßgeblich und ist jetzt in §20.6 dokumentiert.

---

## NAVIGATION.md Sync

- Stand-Datum: 2026-06-19 → 2026-06-22
- Plugin-Routing-Hinweis: jetzt mit Barrel (`plugins/index.js`) und Importzyklus-Verbot
- B1-AP-14e10-Eintrag: angelegt mit Kurzbeschreibung und Nächster Schritt AP-14e11

---

## PROJECT-STATUS.md Sync

- HOOK-META Nächster-Schritt: AP-14e11 (AP-14e10 ✅ 2026-06-22)
- HOOK-META-SESSION: B1-AP-14e10
- Stand: AP-14e10
- §4 Apps: B1-AP-01 bis B1-AP-14e10 ✅; Nächster Schritt B1-AP-14e11
- §8 Letzte Session: AP-14e10-Eintrag angelegt

---

## BACKLOG.md Sync

Kein Handlungsbedarf. B1-APs (14e10, 14e11) werden im NAVIGATION.md B1-Block geführt, nicht im BACKLOG.md. BACKLOG.md enthält ausschließlich Engine/Design/Theme/System/Cleanup-APs.

---

## Pflichtprüfung nach CHART_ENGINE_REGRESSIONSREGELN.md

Bestätigt: Dieser AP ist ein reiner Doku-/Spec-Sync-AP. Keine Engine-Datenpfad-Änderung. Keine Datums-/Zeitachsenlogik geändert. Keine String-Annahmen auf Datumswerten eingeführt. Alle Protected Files unverändert.

---

## Prüfungen

| # | Prüfung | Ergebnis |
|---|---|---|
| 1 | CHART_PLUGIN_ARCHITEKTUR.md nennt genau vier aktive Plugins | ✅ §20.1 |
| 2 | CHART_PLUGIN_ARCHITEKTUR.md nennt plugins/index.js als kanonischen Barrel | ✅ §20.2 |
| 3 | CHART_PLUGIN_ARCHITEKTUR.md verbietet Plugin-Registry/Runtime-Registry/Chart.register | ✅ §20.5 |
| 4 | CHART_PLUGIN_ARCHITEKTUR.md dokumentiert Importzyklus-Verbot | ✅ §20.4 |
| 5 | CHART_PLUGIN_ARCHITEKTUR.md dokumentiert FwBarLayoutPlugin als entfernt | ✅ §20.6 |
| 6 | CHART_PLUGIN_ARCHITEKTUR.md dokumentiert _fwGeometry als nicht aktiven Kanal | ✅ §20.6 |
| 7 | BarChart-Hybrid-Warnung enthalten | ✅ §20.7 |
| 8 | NAVIGATION.md verweist auf Plugin-Spec (Barrel + Importzyklus-Verbot) | ✅ |
| 9 | PROJECT-STATUS.md ist konsistent mit AP-14e1 bis AP-14e10 | ✅ |
| 10 | BACKLOG.md: AP-14e11 als nächster AP dokumentiert | ✅ (in NAVIGATION.md B1-Block, nicht BACKLOG.md — korrekt) |
| 11 | Keine JS-Code-Dateien geändert | ✅ |
| 12 | Keine Plugin-Dateien geändert | ✅ |
| 13 | Keine CSS-Dateien geändert | ✅ |
| 14 | Keine JSON-Dateien geändert | ✅ |
| 15 | Keine CSV-Dateien geändert | ✅ |
| 16 | Keine Protected Files geändert | ✅ |

---

## Offene Punkte

- X-Achsen-Spec-Drift (_fwGeometry): dokumentiert in §20.6, bewusst offen gelassen. Reaktivierung nur über Design-AP.
- N-vs-N-1-Diskrepanz in halfBarPixel-Berechnung (Plugin hatte N Slots, FwSmartXAxis.afterFit() nutzt N-1 Intervalle): praktisch keine Regression (Plugin-Wert wurde nie gelesen), aber relevant falls _fwGeometry je reaktiviert wird.

## Blocker

Keine.

---

## Empfohlener nächster AP

**B1-AP-14e11 — Plugin-Architektur-QA mit Importzyklus-Gate**

Inhalt: Statische Prüfung aller Plugin-Imports auf Zyklusfreiheit (grep-basiert); Verifikation dass kein Plugin aus core/strategies/index.js importiert; Abschluss-Audit Plugin-Refactoring-Kette B1-AP-14e1–14e10.

---

## Bestätigungen

- Keine Codeänderung vorgenommen ✅
- Keine JS-Dateien geändert ✅
- Keine Plugin-Implementierung geändert ✅
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
