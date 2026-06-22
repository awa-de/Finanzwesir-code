Stand: 2026-06-22 | Session: B1-AP-14e12 | Geändert von: Claude

# AP-14e12 — Spec-Drift und Audit-Lücken endgültig schließen — Ergebnis

---

## Kurzurteil

- GRÜN — alle 7 Änderungsblöcke ausgeführt, kein Runtime-Code geändert, kein Stop-Fall eingetreten.
- X-Achsen-Docs I/II/III: Statusbanner gesetzt — historische Designintention klar markiert.
- CHART_PLUGIN_ARCHITEKTUR.md: §4, §18, §20.3, §20.6, §20.8 ergänzt; alle Audit-Lücken geschlossen.
- NAVIGATION.md: Plugin-Routing-Hinweis und AP-14e12-Eintrag im B1-Block ergänzt.
- BACKLOG.md: nicht geändert — B1-APs werden nicht im BACKLOG geführt (→ Begründung unten).
- **FREIGABE: Plugin-Refactoring-Kette AP-14e1 bis AP-14e12 doku- und code-seitig abgeschlossen.**

---

## Ausgangslage nach AP-14e11 und beiden Audits

Nach AP-14e11 (Plugin-Architektur-QA / Importzyklus-Gate, Freigabe 2026-06-22) verblieben zwei externe Audit-Befunde offen:

**ChatGPT-Audit:**
- Code und Barrel: sauber.
- Befund: alte X-Achsen-Specs sind noch Drift-Risiko — kein Statusbanner, kein Verweis auf aktuellen Stand.

**Perplexity/Claude-Nachprüfung:**
- Code-Ziele: erreicht.
- Befund MEDIUM-01: X-Achsen-Docs I/III ohne Veraltet-Header.
- Befund LOW-01: `_originalDate` in LineChartStrategy ohne Abgrenzungsdokumentation zu `_fwGeometry`.
- Befund MEDIUM-02: kein Backlog-/Tracking-Punkt für AP-14e12.
- Befund H1 (Vor-Audit): selektiver Barrel-Import unklar dokumentiert.
- Befund H2/M1/M2 (Vor-Audit): `_originalDate` / `dateSemantics` / `axisType` / `viewMode` unscharf abgegrenzt.

---

## Gelesene Dateien

```text
docs/spec/CHART_PLUGIN_ARCHITEKTUR.md
docs/spec/CHART_ENGINE_REGRESSIONSREGELN.md
docs/spec/Dokumentation Die Baendigung der X-Achse I.md
docs/spec/Dokumentation Die Baendigung der X-Achse II.md
docs/spec/Dokumentation Die Baendigung der X-Achse III.md
NAVIGATION.md
PROJECT-STATUS.md
docs/steering/BACKLOG.md
docs/steering/patches/AP-14e10_Plugin-Spec-und-Steuerdateien-Sync_Ergebnis.md
docs/steering/patches/AP-14e10b_CHART_PLUGIN_ARCHITEKTUR-Nachschaerfung_Ergebnis.md
docs/steering/patches/AP-14e11_Plugin-Architektur-QA_Importzyklus-Gate_Ergebnis.md
Theme/assets/js/fw-chart-engine/core/ChartEngine.js          (nur lesend)
Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js (nur lesend)
Theme/assets/js/fw-chart-engine/strategies/PieChartStrategy.js  (nur lesend)
Theme/assets/js/fw-chart-engine/strategies/BarChartStrategy.js  (nur lesend)
Theme/assets/js/fw-chart-engine/core/FwSmartXAxis.js         (nur lesend)
Theme/assets/js/fw-chart-engine/plugins/index.js             (nur lesend)
```

---

## Suchbefunde / Vorprüfung

| Suchmuster | Treffer | Ort | Bewertung |
|---|---|---|---|
| `from '../plugins/index.js'` | 3 | ChartEngine.js, LineChartStrategy.js, PieChartStrategy.js | ✅ alle über Barrel |
| `FwBarLayoutPlugin` | 1 | plugins/index.js (JSDoc-Kommentar) | ✅ nur Entfernungshinweis |
| `fwBarLayout` | 0 | — | ✅ |
| `_fwGeometry` | 0 | — | ✅ kein produktiver Code |
| `halfBarPixel` | 2 | FwSmartXAxis.js Z.286/288 | ✅ eigenständige Achsenberechnung, kein Plugin-Bezug |
| `Chart\.register` | 0 | fw-chart-engine/ | ✅ |
| `_originalDate` | 3 | BarChartStrategy.js (×2), LineChartStrategy.js (×1) | ✅ nur Datenpunkt-Metadatum |

**Selektiver Import bestätigt:**
- ChartEngine.js: `FwAnnotationPulsePlugin + FwVerticalLinePlugin` (Engine-seitig genutzt)
- LineChartStrategy.js: `CrosshairPlugin` (Strategy-lokal)
- PieChartStrategy.js: `CenterTextPlugin` (Strategy-lokal)
- BarChartStrategy.js: kein Plugin-Import ✅

Kein Stop-Fall eingetreten.

---

## Geänderte Dateien

```text
docs/spec/Dokumentation Die Baendigung der X-Achse I.md    — Statusbanner ergänzt
docs/spec/Dokumentation Die Baendigung der X-Achse II.md   — Statusbanner ergänzt (inkl. Chart.register-Zusatz)
docs/spec/Dokumentation Die Baendigung der X-Achse III.md  — Statusbanner ergänzt (inkl. FwBarLayoutPlugin-Zusatz)
docs/spec/CHART_PLUGIN_ARCHITEKTUR.md                      — §4, §18, §20.3, §20.6, §20.8 ergänzt
NAVIGATION.md                                               — Stand-Datum, Plugin-Routing-Hinweis, B1-AP-14e12-Eintrag
docs/steering/patches/AP-14e12_..._Ergebnis.md             — dieses Protokoll (NEU)
```

---

## Nicht geänderte Dateien

```text
docs/steering/BACKLOG.md  — B1-APs werden per Backlog-Regeln nicht im BACKLOG geführt
                            (B1-Kette läuft ausschließlich über NAVIGATION.md / BACKLOG-ARCHIV / session-log).
                            Kein Eintrag nötig.
PROJECT-STATUS.md         — wird separat nach diesem Protokoll aktualisiert
```

---

## X-Achsen-Spec I: Statusmarkierung

**Ziel:** `_fwGeometry`-beforeUpdate-Idee als historisch markieren.

**Einfügepunkt:** Direkt nach dem Titel-Heading, vor dem ersten Absatz.

**Inhalt des Banners:**
- Statuszeile: „Historische Designintention / nicht aktueller Implementierungsvertrag"
- Verweis auf CHART_PLUGIN_ARCHITEKTUR.md + CHART_ENGINE_REGRESSIONSREGELN.md
- Kernregeln: FwBarLayoutPlugin entfernt, _fwGeometry inaktiv, Chart.register nicht architekturkonform, Plugins unter plugins/, Barrel: plugins/index.js
- Zusatz: Plugin-beforeUpdate-zu-_fwGeometry-Idee nicht verdrahtet; FwSmartXAxis.afterFit() berechnet halfBarPixel eigenständig.

**Ergebnis:** ✅ Banner eingefügt. Historischer Inhalt vollständig erhalten.

---

## X-Achsen-Spec II: Chart.register-Statusmarkierung

**Ziel:** `Chart.register(...)`-Blueprints als historisch markieren.

**Einfügepunkt:** Nach den Metadaten-Zeilen (`**Zielgruppe:**...`), vor dem ersten `---`.

**Inhalt des Banners:**
- Statuszeile: „Historische Blueprint-Dokumentation / nicht aktueller Implementierungsvertrag"
- Selbe Kernregeln wie Dokument I
- Zusatz: `Chart.register(...)`-Beispiele sind historische Re-Engineering-Blueprints — kein zulässiges Muster nach AP-14e10b/AP-14e12.

**Ergebnis:** ✅ Banner eingefügt. Historischer Inhalt vollständig erhalten.

---

## X-Achsen-Spec III: FwBarLayoutPlugin/_fwGeometry-Statusmarkierung

**Ziel:** FwBarLayoutPlugin- und _fwGeometry-Architektur als historisch markieren.

**Einfügepunkt:** Nach dem `**Kernziel:**`-Block, vor dem ersten `---` / `## 1.`.

**Inhalt des Banners:**
- Statuszeile: „Historische Designintention / nicht aktueller Implementierungsvertrag"
- Selbe Kernregeln wie Dokument I
- Zusatz: FwBarLayoutPlugin und _fwGeometry beschreiben frühere Designidee; FwBarLayoutPlugin in AP-14e8 nach Dead-State-Nachweis entfernt.

**Ergebnis:** ✅ Banner eingefügt. Historischer Inhalt vollständig erhalten.

---

## CHART_PLUGIN_ARCHITEKTUR.md §4 Opt-in vs. Strategy-Default-Klärung

**Ziel:** Klärung dass lokale Strategy-Plugin-Einbindung kein Opt-in-Verstoß ist.

**Einfügepunkt:** Nach dem „Verboten:"-Block in §4.

**Inhalt:**
- Opt-in = kein globales Plugin-Register, keine automatische Aktivierung über alle Charts.
- Strategy darf Plugin als charttypischen lokalen Bestandteil einbinden, wenn semantisch passend.
- Beispiele: LineChartStrategy/CrosshairPlugin, PieChartStrategy/CenterTextPlugin, ChartEngine/FwVerticalLinePlugin+FwAnnotationPulsePlugin per Runtime-Option.

**Ergebnis:** ✅ Klärung ergänzt.

---

## CHART_PLUGIN_ARCHITEKTUR.md §18 Update

**Ziel:** Kurzform für Claude-Prompts um §20-Kernregeln erweitern.

**Ergänzte Regeln:**
```text
- Plugin-Implementierungen liegen ausschließlich unter plugins/ (ein Plugin = eine Datei)
- Engine/Strategies importieren aktive Plugins grundsätzlich über ../plugins/index.js
- selektiver Named Import aus dem Barrel ist korrekt (nur genutztes Plugin importieren)
- Plugin-Dateien importieren nie aus core/, strategies/ oder plugins/index.js
- keine Inline-Plugins, keine Plugin-Registry, kein globales Chart.register()
- kein FwBarLayoutPlugin, kein chart._fwGeometry als aktiver Kommunikationskanal
- _originalDate ist Tooltip-/Snapshot-Metadatum, kein Plugin-Kommunikationskanal
- BarChartStrategy ist Hybrid-Sonderzone: Änderungen an _originalDate, dateSemantics, axisType,
  viewMode, BOP-Ankern oder semantischem X-Mapping nur über eigenen Design-/Regression-AP
```

**Ergebnis:** ✅ Regelblock erweitert.

---

## CHART_PLUGIN_ARCHITEKTUR.md §20.3 selektive Barrel-Imports

**Ziel:** Selektiven Barrel-Import als korrekt und erlaubt dokumentieren.

**Ergänzter Inhalt:**
- Selektive Named Imports sind korrekt.
- Konsument importiert nur die Plugins, die er tatsächlich verwendet.
- Beispiele nach AP-14e9: ChartEngine (2 Plugins), LineChartStrategy (1 Plugin), PieChartStrategy (1 Plugin).
- Nicht gewünscht: dass ChartEngine alle 4 Plugins importiert, obwohl 2 Strategy-lokal sind.

**Ergebnis:** ✅ Klarstellung ergänzt nach dem Regelblock.

---

## CHART_PLUGIN_ARCHITEKTUR.md §20.6 Drift-Erweiterung inkl. Dokument I/II/III

**Ziel:** Alle drei X-Achsen-Dokumente als Drift-Stellen benennen.

**Vorher:** Nur Dokument I und III erwähnt (AP-14e7-Befund-Stand).

**Nachher:** Alle drei Dokumente mit eigenem Eintrag und spezifischem Befund:
- I: Plugin-beforeUpdate-zu-_fwGeometry, nicht verdrahtet.
- II: Chart.register-Blueprints, kein zulässiges Muster.
- III: FwBarLayoutPlugin/_fwGeometry, in AP-14e8 entfernt.

Statusbanner-Verweis ergänzt.

**Ergebnis:** ✅ §20.6 Spec-Drift-Hinweis vollständig auf alle 3 Docs ausgeweitet.

---

## CHART_PLUGIN_ARCHITEKTUR.md §20.8 Strategy-Metadaten / _originalDate / fwContext

**Ziel:** _originalDate klar von _fwGeometry abgrenzen; erlaubte Metadaten dokumentieren.

**Neuer Abschnitt §20.8:**
- Erlaubte Strategy-/fwContext-/Datenpunkt-Metadaten: `_originalDate`, `dateSemantics`, `axisType`, `viewMode`, `BOP-Anker / getBopAnchor`, `semantisches X-Mapping`.
- Erlaubt weil: Strategy-/Tooltip-/Achsen-Semantik, nicht von Plugins geschrieben, kein Plugin-Kanal, nicht identisch mit `_fwGeometry`.
- Abgrenzung: `_originalDate` = Datenpunkt-Metadatum; `chart._fwGeometry` = alte Plugin-zu-Achse-Geometrieidee — darf nicht gleichgesetzt werden.
- Regel: keine Erweiterung/Umdeutung ohne eigenen Design-/Regression-AP.

**Ergebnis:** ✅ §20.8 neu angelegt nach §20.7.

---

## NAVIGATION.md Sync

**Änderungen:**
1. Stand-Datum: `Session: B1-AP-14e11` → `Session: B1-AP-14e12`
2. Plugin-Routing-Hinweis (Chart-Engine-Abschnitt): `§20.3 selektive Barrel-Imports, §20.8 _originalDate-Abgrenzung` ergänzt; Hinweis auf historische X-Achsen-Docs.
3. B1-Note: AP-14e11-Zeile: „Nächster Schritt: B1-AP-14e12" gesetzt; neue AP-14e12-Zeile mit Abschluss-Status ergänzt.

**Ergebnis:** ✅

---

## PROJECT-STATUS.md Sync

Wird nach diesem Protokoll separat aktualisiert: HOOK-META, Stand-Datum, §3, §4, §8.

---

## BACKLOG.md Entscheidung

**Nicht geändert.**

Begründung: B1-APs werden per BACKLOG-Regeln (BACKLOG.md-Header) nicht im BACKLOG geführt. Die B1-Kette (AP-14e1 bis AP-14e12) läuft ausschließlich über NAVIGATION.md-B1-Note, BACKLOG-ARCHIV.md und session-log. Ein Eintrag „B1-AP-14e12" im BACKLOG wäre ein Systemwiderspruch.

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

## Statische Prüfungen

Alle Vorprüfungsbefunde bestätigt (siehe § Suchbefunde).

Nach den Änderungen gilt:
- `_fwGeometry`-Treffer in Docs I/II/III: erlaubt — alle klar als historisch markiert.
- `FwBarLayoutPlugin`-Treffer in Docs: erlaubt — Statusbanner vorhanden.
- `Chart.register`-Treffer in Doc II: erlaubt — Statusbanner + Zusatz vorhanden.
- Kein produktiver Code enthält `_fwGeometry`, `FwBarLayoutPlugin`, `Chart.register`.

---

## Geschlossene Audit-Befunde

| Befund | Quelle | Status |
|---|---|---|
| X-Achsen-Spec-Drift (I/III) | ChatGPT-Audit | ✅ Statusbanner I/II/III gesetzt |
| X-Achsen-Docs I/III ohne Veraltet-Header | Perplexity/Claude MEDIUM-01 | ✅ |
| X-Achsen-Doc II nicht als historisch markiert | Ergänzungsbefund | ✅ |
| `_originalDate` ohne Abgrenzungsdoku | Perplexity/Claude LOW-01 | ✅ §20.8 klärt Abgrenzung zu _fwGeometry |
| Kein Backlog-/Tracking-Punkt für AP-14e12 | Perplexity/Claude MEDIUM-02 | ✅ NAVIGATION.md B1-Note + session-log |
| Selektiver Barrel-Import unklar | Perplexity/Claude H1 (Vor-Audit) | ✅ §20.3 ergänzt |
| _originalDate / dateSemantics / axisType / viewMode unscharf | Perplexity/Claude H2/M1/M2 | ✅ §20.8 klärt alle Felder |
| Opt-in vs. Strategy-Default unklar | AP-Spec Änderung 6 | ✅ §4 Klarstellung ergänzt |
| §18 ohne §20-Regeln | AP-Spec Änderung 3 | ✅ §18 erweitert |

---

## Offene Punkte

Keine.

---

## Blocker

Keine.

---

## Freigabeentscheidung

**FREIGEGEBEN.**

```text
Plugin-Refactoring-Kette B1-AP-14e1 bis B1-AP-14e12 ist code- und doku-seitig abgeschlossen.
X-Achsen-Docs I/II/III sind statusfest markiert.
CHART_PLUGIN_ARCHITEKTUR.md ist vollständig und widerspruchsfrei.
Kein Runtime-Code geändert.
```

---

## Empfohlener nächster Schritt

B1-AP-15 — Transitions + Reduced Motion.

---

## Bestätigungen

- Keine Runtime-Codeänderung vorgenommen ✅
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
- LineChartStrategy.js nicht geändert ✅
- PieChartStrategy.js nicht geändert ✅
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
