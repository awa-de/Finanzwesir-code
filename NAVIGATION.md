# NAVIGATION.md – Finanzwesir 2.0
Stand: 2026-06-26 | Session: AP-07d | Geändert von: Claude

Für Claude: **Routing-Dokument.** Wird beim Session-Start (Schritt 2) gelesen.
Gibt Pfade und Lese-Reihenfolgen vor — KEINE Verhaltensregeln (die stehen in CLAUDE.md).
Für Albert: Index aller Projektdokumente — was wo liegt und wann gelesen werden muss.

---

## Autoritäten

| Datei / Bereich | Rolle |
|---|---|
| `CLAUDE.md` | Verfassung: Verhalten, Gates, Entscheidungsbaum — KEIN Routing |
| `NAVIGATION.md` | Router: Pfade, Lese-Reihenfolgen — KEINE Verhaltensregeln |
| `docs/spec/` | Bindende technische und fachliche Spezifikationen |
| `docs/steering/` | Backlog, Status, Entscheidungen, QA, Regression |
| `.claude/skills/` | Detailprozeduren (aktive Skills — siehe § Skills) |
| `.claude/agents/` | Modellgebundene Haiku-Subagenten für mechanische Zuarbeit (codebase-scout, spec-scout, regression-scout, abschluss-scout) |
| `PROJECT-STATUS.md` | Tageslage: Fokus, Blocker, nächster Schritt |
| `.claude/memory/MEMORY.md` | Memory-Index: Feedback-Muster, Projektfakten — von `/start` Schritt 1b gelesen |
| `data-raw/` | Bronze-Zone: Rohdaten vom Anbieter (gitignored) — Struktur: `index/`, `etf/`, `macro/` |
| `Theme/assets/data/b1/` | Gold-Zone: normalisierte CSV für Apps (versioniert) |

---

## Skills (aktive Slash-Kommandos)

Claude ruft diese proaktiv auf, wenn der Kontext es erfordert.
Albert kann sie auch explizit aufrufen.

| Slash-Kommando | Wann | Trigger |
|---|---|---|
| `/abschluss-ritual [AP-N]` | Nach Abschluss einer Aufgabe | Claude bietet proaktiv an; oder Albert sagt „fertig" |
| `/archivieren [was archivieren?]` | Kontrollierte Überführung von Material in Archive | Albert ruft explizit auf; Claude schlägt vor wenn Rohmaterial/Belegmaterial entstanden ist |
| `/chronik-check [Pfad]` | Frontmatter einer neuen Chronik gegen CHRONIK-SPEZIFIKATION.md prüfen | Albert ruft explizit auf; nach Ablage einer neuen Chronik |
| `/decompose` | Wenn eine Ideensammlung in Tasks zerlegt werden soll | Albert sagt „jetzt zerlegen" |
| `/manual-test-plan [AP-N]` | Bei komplexen visuellen Testfällen | Claude schlägt vor; oder Albert ruft explizit auf |
| `/spec-rewrite-guard [Datei]` | Vor Änderungen an `docs/spec/`-Dateien | Claude startet automatisch bei Spec-Edits |
| `/start` | Pflichtstart jedes Fadens — liest 4 Dateien, lädt Kommunikationsstil | Albert tippt es als erstes in jeden neuen Faden |
| `/kassensturz` | Wöchentlicher Trend-Check (Backlog-Entwicklung, Blocker, Tendenz) | Montags automatisch in `/start`; oder manuell |
| `/patch-quittung` | Quittung nach jedem Patch (Zählung, Tabu-Check, Testfall) | Automatisch nach jedem Patch; oder manuell |
| `/distill` | Destilliert session-log zu Mustern in patterns.md | Von /start empfohlen (Schwellen-basiert); oder manuell |
| `/uebergabe` | Strukturierter Übergabeprompt + session-log Breadcrumb | Albert sagt „Übergabe/neuer Thread"; oder MODUS M |
| `/intake` | Aufnahme-Protokoll für neue Aufgaben (5 Fragen → BACKLOG-Eintrag) | Claude startet bei NEUE AUFGABE; oder Albert ruft explizit auf |
| `/raw-to-csv` | Rohdatei (XLS/XLSX/CSV) → validierte CSVParser-kompatible CSV; Albert nennt Dateiname + Pfad in Konversation; Claude liest Dataset Contract + ruft `tools/raw-to-csv.py` auf | Manuell: Albert nennt Datei + schreibt `/raw-to-csv` |
| `/pre-code-gate [light\|full]` | Gate-Checklisten ausführen (Light: 3 Fragen / Full: 9 Fragen) | Claude startet automatisch vor Code; oder manuell |
| `/subagent-dispatch` | Entscheidungshilfe Subagenten (Tiering, Eskalationsregel) | BUG/FIX Schritt 7; oder manuell |
| `/finde-skills` | Skill aus externen Marktplätzen suchen, sicherheitsgeprüft integrieren | Manuell wenn neuer Skill gesucht wird |
| `/heldenreise` | Beweisdramaturgie für APP_SPEC.md: Heldenreise, Tufte, Krug, FAANG, Ethik-Gate — Pflicht bei App-Fabrik-Apps | Nur manuell (Albert) — Claude startet nie automatisch |
| `/tech-spec-app {slug}` | technische APP_SPEC erstellen oder prüfen (18 Pflichtabschnitte: App-Familie, Inputs/Outputs, State-Modell, AppContext, A11y, Sicherheit, Testfälle) | Manuell (Albert) oder durch /app-spec-create |
| `/app-spec-create {slug}` | vollständige APP_SPEC erstellen: tech-spec-app + heldenreise + Spec-Gate-Checkliste (5 Phasen) | Nur manuell (Albert) — kein Auto-Trigger |
| `/spec-mode-architecture` | Allgemeiner Architektur-Spec-Modus; erzeugt technische Spezifikationen, Edge-Cases, Testszenarien; für App-Specs nur ergänzend, kein Ersatz für `app-spec-create` und lokalen App-Steuerungsblock | Manuell |

---

## Routing nach Aufgabe

### Wiedereinstieg / neue Session

Session-Start läuft über zwei Stufen:

**Stufe 1 — `SessionStart`-Hook** liefert maschinenlesbaren Kontext aus `PROJECT-STATUS.md` (HOOK-META) und den Zustandsdateien:
```
Fokus-AP | Nächster-Schritt | Blocker       ← HOOK-META in PROJECT-STATUS.md
BLOCKED-APs                                  ← .claude/ATTEMPT-LOG.json
Log-Zählung | letzter Distill                ← .claude/learning/session-log.md
Pattern-Kandidaten                           ← .claude/learning/patterns.md
Subagent-Modellstatus | Wochentag
```

**Stufe 2 — `/start` synthetisiert:**
```
0. session-log Eintrag schreiben (Kern-Invariante 5)
1. BLOCKED-Check (aus Hook-Output)
2. spec-scout-Dispatch für Backlog-/Archiv-/AP-ID-Abgleich
3. Hauptinstanz urteilt (Lücken-Alarm, Distill-Empfehlung)
4. Kommunikationsstil laden
5. SESSION-START-Zeile ausgeben
```

Mechanische Zuarbeit läuft über Subagenten (`spec-scout` für NAVIGATION/BACKLOG-Arbeit).
Subagent-Modell: `CLAUDE_CODE_SUBAGENT_MODEL=haiku` (gesetzt in `.claude/settings.local.json`).
Urteile, Gates, Freigaben und Synthese bleiben bei der Hauptinstanz.
Bei `Hook-Status: DEGRADED` → sichtbar melden, nicht still fortfahren (→ `/start` § Hook-Status-Check).

---

### Chart-Engine: Feature oder Bugfix

```
0. .claude/ATTEMPT-LOG.json          ← BLOCKED oder attempts >= 2 prüfen
1. docs/steering/BACKLOG.md          ← alle offenen APs nach Prio
2. docs/steering/BACKLOG-PROMPT.md   ← startet den Faden, gibt Kontext
3. docs/steering/engine/detail/[AP-N]-DETAIL.md   ← Detail-Spec des AP
4. docs/spec/[relevante Spec]        ← bindend, nicht verhandelbar
   → bei Plugin-Arbeit: docs/spec/CHART_PLUGIN_ARCHITEKTUR.md (WeakMap, afterDraw, reduced-motion, Canvas/Chart.js-Grenzen, Barrel: plugins/index.js, Importzyklus-Verbot, §20.3 selektive Barrel-Imports, §20.8 _originalDate-Abgrenzung)
   → Alte X-Achsen-Dokumente (I/II/III in docs/spec/) sind nur historische Designintention — bei _fwGeometry / FwBarLayoutPlugin / Chart.register gilt ausschließlich CHART_PLUGIN_ARCHITEKTUR.md (AP-14e12 hat Statusbanner gesetzt)
   → bei Engine-Datenpfad-Arbeit: docs/spec/CHART_ENGINE_REGRESSIONSREGELN.md (renderFromData vs. _processContainer, Date-Typ-Normalisierung, Pflichtprüfung)
5. docs/steering/engine/WORKING-FEATURES.md       ← Regressionswächter VOR der Arbeit
6. docs/steering/engine/REGRESSION-MATRIX.md      ← vor Abschluss relevante Tests
```

Pre-Code-Gate läuft automatisch (→ /pre-code-gate).
Nach Abschluss: Claude bietet `/abschluss-ritual AP-N` an.

---

### Theme zusammenbauen (Templates, Assets, Deploy)

```
1. docs/steering/BACKLOG.md
2. docs/steering/theme-build/THEME-ASSEMBLY-CHECKLIST.md
3. docs/spec/[relevante Spec]
4. docs/steering/audits/SECURITY-BASELINE.md      ← bei Script-Tags, externen URLs
```

Nach Abschluss: THEME-ASSEMBLY-CHECKLIST.md abhaken → `/abschluss-ritual`.

---

### CSS schreiben / Design umsetzen

```
1. docs/steering/design/CSS-KONVENTIONEN.md       ← bindend für alle CSS-Arbeit
2. docs/steering/BACKLOG.md                       ← offene DS-N / CSS-N Issues
3. docs/design-system/spec/                       ← Tokens, Komponenten-Specs
4. Theme/assets/css/screen.css
```

Regeln (nie brechen):
- Eine CSS-Wahrheit: `Theme/assets/css/screen.css`
- Keine `fw-*` Klassen in `screen.css` definieren oder überschreiben
- Hex-Werte nur im Token-Abschnitt
- Keine externen Font-Quellen

**Design-Ressourcen (bei Styling-Entscheidungen prüfen):**
- https://styles.refero.design/ — Komponenten-Galerie, Stil-Referenzen
- https://refero.design/mcp — MCP-Integration für Design-Referenzen

Nach Abschluss: `/abschluss-ritual`.

---

### App bauen / ändern (Apps/)

```
1. docs/spec/APP-INTERFACE.md                     ← Vertrag Ghost-HTML ↔ App-JS (Pflicht)
2. docs/steering/audits/SECURITY-BASELINE.md      ← Pflicht vor App-Arbeit
3. docs/steering/design/CSS-KONVENTIONEN.md       ← Klassen-Naming
4. docs/design-system/                            ← Tokens, bestehende Komponenten
5. docs/App-Fabrik/APP_INVENTORY.md               ← Alle 25 App-Ordner, Datenbedarf, offene Klärungen
6. docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md ← §1a: Komponentenbasierte App-Komposition (verbindliches Architekturmodell), Dateistruktur-Standard, Ghost-Card-Vertrag, DoD
7. docs/App-Fabrik/04_CLAUDE_WORKFLOW_DRAFT.md    ← Skills-Mapping, Phasen Intake→Spec→Gate→Release
8. docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md ← Architekturprinzipien P-01–P-10 (bei Daten/Kontext/A11y-Fragen)
9. docs/App-Fabrik/APP_FOLDER_STRUCTURE.md        ← Kanonische Dateiliste pro App-Ordner (Phase 0/1/2)
10. Apps/[App-Name]/                              ← App-spezifischer Code + Prototypen
11. Apps/[App-Name]/APP_SPEC.md → lokalen Steuerungsblock lesen; falls keine APP_SPEC existiert: MINI_SPEC_FROM_HAUPTDOKUMENT.md. Verhalten siehe .claude/CLAUDE.md § APP-ARBEIT.
12. Apps/[App-Name]/SLICE_PLAN.md (wenn vorhanden) ← Slice-Struktur + freigegebener Umfang (vor Implementierung lesen)
13. bei externer Datenquelle (CSV / historische Indexdaten / ETF-/Makrodaten) zusätzlich:
    - `docs/data/README.md`
    - `docs/data/DATENQUELLEN-GOVERNANCE.md`
    - `docs/data/SOURCE-TIERS.md`
    - `docs/data/DATASET-CATALOG.md`
    - `docs/data/INDEX-RETURN-VARIANTEN.md`
    - ggf. `docs/data/contracts/[dataset-id].md`
    → Gilt nur für datengetriebene Apps mit externer CSV-Quelle. Calculator-Apps ohne externe Datenquelle überspringen diesen Schritt.

> [!note] Datengetriebene Apps — Data Need Snapshot zuerst
> Bei datengetriebenen Apps ist zuerst der Abschnitt `Datenbedarf / Data Need Snapshot`
> in der jeweiligen `APP_SPEC.md` zu prüfen. Dieser Abschnitt sagt Claude, welche Daten
> die App fachlich braucht, welches Format erwartet wird, welche Ersatzdaten verboten sind
> und welche Datenfragen vor dem produktiven Bau offen sind.
> Nur bei Quellen-, CSV-, Contract- oder Datenänderungsfragen zusätzlich `docs/data/` lesen.

> [!note] B1 / prokrastinations-preis — Zeitreise-Umbau (B1-AP-01 bis B1-AP-14e11 ✅ 2026-06-22)
> `Apps/prokrastinations-preis/APP_SPEC.md` V2.9 (B1-AP-14d4: §16.3 UI-Primitive-Status synchronisiert, 2026-06-18) ist die operative Spec-Quelle.
> `Apps/prokrastinations-preis/ENTSCHEIDUNGSPROTOKOLL.md` (B1-AP-01, 2026-06-16) ist die verbindliche Architektur-Klammer für B1-AP-02 bis B1-AP-08c.
> `Apps/prokrastinations-preis/MINI_SPEC_FROM_HAUPTDOKUMENT.md` — historisch; bei Widerspruch gilt APP_SPEC.md V2.9.
> `SLICE_PLAN.md` aktuell (Slice-6 ✅ 2026-06-16 — Altstand, alte Ergebnisgrafik-Logik, kein Zielzustand). OA-01 entschieden. OA-02 entschieden: Pfad 2 via `renderFromData()`. B1-AP-03 ✅ — `STATIONS_CONFIG_CONTRACT.md`. B1-AP-04 ✅ — §23 UX/Heldenreise. B1-AP-05 ✅ — §14 A11y/Mobile. B1-AP-06 ✅ — `QA_TEST_CASES.md` V1.2. B1-AP-07 ✅ — `REDAKTIONS_GATE.md` V1.1. B1-AP-08 ✅ — Widersprüchliche Stellen bereinigt. B1-AP-08b ✅ 2026-06-16 — Konsistenz-Nachputz: APP_SPEC V2.5, a11y-Schema (revealA11ySummary/stationLiveMessage), A11y-Endwissens-Leak-Verbot (§14.1, TC-H05, G-A06b), Dez-2018-Rolle korrigiert, MINI_SPEC/SLICE_PLAN/STATIONS_CONTRACT/app.test.html/PROJECT-STATUS/NAVIGATION/Memory/BACKLOG/REGRESSION-MATRIX aktualisiert.
> B1-AP-08c ✅ 2026-06-16 — Restdrift: APP_SPEC §8/§12/§19 Fallbacks; STATIONS_CONTRACT §4/§7 rote Visualregeln config-ungültig; QA TC-H05/TC-L02 erweitert; Memory/PROJECT-STATUS auf AP-09 synchronisiert.
> B1-AP-09 ✅ 2026-06-17 — produktive `config/stations.de.json` angelegt (7 Stationen v2.1, 3 source_claimed_unchecked ehrlich gemeldet, Redaktions-Gate G-A02 noch nicht bestanden). Kein Code geändert.
> B1-AP-10 ✅ 2026-06-17 — `STATIONS_IMPLEMENTATION_PLAN.md` angelegt: Slices AP-11–AP-18 für Stationen-Loader und Stationenreise, 6 offene Risiken R-01–R-06. Nächster Schritt: B1-AP-11. Kein Code geändert.
> B1-AP-10a ✅ 2026-06-17 — Konsistenz-Nachputz: `flags.finalWobble = true` + `flags.lateWobble` entfernt in `stations.de.json`; `STATIONS_IMPLEMENTATION_PLAN.md` V1.1 (EditorialDegraded-Semantik, R-02 erledigt, Drift-Notizen bereinigt). Kein Code geändert.
> B1-AP-11 ✅ 2026-06-17 — `loadStations()` implementiert: `config/stations.de.json` per `fetch` parallel zur CSV geladen (`Promise.all`). HTTP- und Parse-Fehler → `Error(d)`, kein stiller Fallback. `stationsConfig` an `renderContent` übergeben (für AP-12 verfügbar). Nur `app.js` geändert. Nächster Schritt: B1-AP-12.
> B1-AP-12 ✅ 2026-06-17 — `validateStationsJson()` in `app.js` implementiert: Contract-Prüfung gegen `STATIONS_CONFIG_CONTRACT.md` (Pflichtfelder, Enums, No-Red-Coding, `dynamic_latest_month` genau einmal für `role=final_reveal`). Ungültige Konfiguration → Error(d) „Die Zeitreise kann gerade nicht geladen werden." Kein Fallback, kein Default.
> B1-AP-13 ✅ 2026-06-17 — `subtractMonths()`, `buildActiveJourneyWindow()`, `filterStationsForWindow()`, `buildJourneyStations()` in `app.js` implementiert. `activeWindow` + `stations` in `appData`/AppContext. `dynamic_latest_month` → `latestMonth` aufgelöst. `source_claimed_unchecked` still gefiltert (3 Stationen; Gate-Diagnose folgt in AP-14).
> B1-AP-14 ✅ 2026-06-17 — Stationen-Zeitreise: Screen 2 komplett umgebaut. 5 neue Hilfsfunktionen (`selectStationsForJourney`, `checkEditorialGate`, `buildVisibleChartSeries`, `calcStationIntermediate`, `renderStationCard`). `buildJourneyStations` um Prioritätsauswahl + Editorial Gate (G-A01, G-A05) erweitert. `renderJourneyStep` ersetzt `renderS2`. Endwissens-Verbot vollständig: `slider.change` entfernt, `a11ySummary` aus `buildAppContext` entfernt, ARIA Live Region erst auf Screen 3. h2S3: „Jetzt erst sieht es einfach aus." Journey-Button statt S2-Navigation. app.css: 8 neue Klassen (Station-Card, Collapsible, Journey-Button). app.test.html: AP-14-Szenarien AB–AE. Nächster Schritt: B1-AP-15 (Transitions + Reduced Motion) oder AP-18 (Error-UI für EditorialDegraded).
> B1-AP-14a ✅ 2026-06-17 — UX-Entscheidung Chart-Orientierung dokumentiert: APP_SPEC.md V2.6 (feste X-Achse Screen 2, finale Stationenmarker Screen 3, §6/§14.2/§16.1), QA_TEST_CASES.md V1.3 (TC-D06/D07/E04/E05/H06), REDAKTIONS_GATE.md V1.2 (G-C04). Kein Code geändert. Nächster Schritt: B1-AP-14b — Screen-2-Chart auf feste X-Achse umstellen.
> B1-AP-14b0 ✅ 2026-06-18 — broken `Chart.getChart()`-Block aus app.js entfernt (commit 402f3e8). `progressEl`, `buildVisibleChartSeries`, A11y-Sperre unberührt. Rettungsbefund: `docs/steering/RETTUNGSBEFUND-B1-AP-14r.md`.
> B1-AP-14a2 ✅ 2026-06-18 — Doku-Neuschnitt Progressive Domain LineChart: APP_SPEC V2.7 (§16.1 AP-14b-Architektur + AP-14c-Marker-Zielbild), QA_TEST_CASES V1.4 (Gruppe M TC-M01–TC-M12), ENTSCHEIDUNGSPROTOKOLL §12+§13, REDAKTIONS_GATE V1.3 (G-C04). Kein Code geändert. Nächster Schritt: B1-AP-14b — Engine-Umbau.
> B1-AP-14b1 ✅ 2026-06-18 — Axis Domain Contract: `xDisplayRange` Top-Level-Option in `renderFromData`; `displayRange` in `fwContext`; X-Scale + Ticks nutzen `displayRange`; `durationYears` aus `displayRange`. 4 Engine-Dateien (ChartEngine.js, BaseChartStrategy.js, LineChartStrategy.js, FwSmartXAxis.js). Standard-LineCharts ohne `xDisplayRange` unverändert. Nächster Schritt: B1-AP-14b2 — Y-Policy + App-Anschluss.
> B1-AP-14b ✅ 2026-06-18 — b1 (Axis Domain Contract) ✅. b2 (Y-Policy cumulative-expand-zero) ✅. b3 (App-Anschluss Screen 2 + Smoke-Test) ✅. b4 (Diagnostics-Log-Cleanup FwSmartXAxis) ✅. Architekturplan: `docs/steering/PEER-REVIEW-B1-AP-14b-XAxis-Architecture.md`. Ergebnisprotokolle in `docs/steering/patches/`.
> B1-AP-14c1 ✅ 2026-06-18 — Journey-Station-Annotationen als Datenvertrag: `buildJourneyStationAnnotations()` in app.js (Snapshot-Snap, final_reveal-Guard, kein-Punkt-skip); `annotations`-Durchreichung ChartEngine → WeakMap-State → fwContext.annotations (Object.freeze). Kein Rendering. Nächster Schritt: B1-AP-14c2 — Marker-Dataset + offene Ringe.
> B1-AP-14c2 ✅ 2026-06-18 — Annotation-Marker-Ringe: Scatter-Dataset aus fwContext.annotations.events (Petrol-Ring, transparent fill, pointRadius 5); forEach-Guard + tooltipConfig.filter in LineChartStrategy; mainDatasets-Legend-Filter in FwRenderer. Kein Tooltip, kein Legendeneintrag, keine Interaktion. 2 Engine-Dateien. Nächster Schritt: B1-AP-14c3 — Screen-3-Final-Reveal-Ringe.
> B1-AP-14c2b ✅ 2026-06-18 — Marker-X Snapshot-Alignment: lokale `Map<month, snappedTimestamp>` aus `rows` + `snappedTimestamps` in `LineChartStrategy.transform()`; Marker-X exakt auf Hauptserienpunkt ausgerichtet (war: midnight UTC, neu: noon UTC via `getSnapshotSnap`). Beschluss: normaler Linien-Tooltip an Ringposition bleibt (gewünscht). Nur `LineChartStrategy.js`. Nächster Schritt: B1-AP-14c3 — Screen-3-Final-Reveal-Ringe.
> B1-AP-14c3 ✅ 2026-06-18 — Screen-3-Final-Reveal-Ringe: `renderS3()` um `revealAnnotations` erweitert (2 Zeilen); `buildJourneyStationAnnotations(journeyStations, ctx.chartSeries)` — bestehender Helper, final_reveal-Guard greift. Keine Engine-Dateien geändert. Nächster Schritt: B1-AP-14c3b — Guard härten.
> B1-AP-14c3b ✅ 2026-06-18 — Final-Reveal-Guard gehärtet: `isFinalRevealStation(s)` in `app.js` (5 Guards: role, date, status, flags.finalReveal, id-Substrings; alle defensiv). Screen-3-Smoke-Test grün. Nur `app.js`. Nächster Schritt: B1-AP-14c4 — Screen-2-Pulse-Animation.
> B1-AP-14c4 ✅ 2026-06-18 — Screen-2-Pulse-Animation: `FwAnnotationPulsePlugin.js` NEU (WeakMap-State, afterDraw-Hook, 2-Pulse-Formel, 1200ms/1.8x); `ChartEngine.js` (annotationPulse-Option + Plugin-Injektion); `app.js` (renderJourneyStep aktiviert Pulse, Screen-3 ohne Pulse). chart.draw()-Pattern (canvas-ownership, Peer-Review-Befund). Nächster Schritt: B1-AP-15 — Transitions + Reduced Motion.
> B1-AP-14d2 ✅ 2026-06-18 — Mini-QA AP-14-Block: Progressive Domain, Marker, Pulse, Reduced Motion, Screen 3, Regression. Gesamtstatus grün, keine Blocker. Ergebnisprotokoll: `docs/steering/patches/B1-AP-14d2_Mini-QA_Progressive-Domain_Marker_Pulse_Ergebnis.md`.
> B1-AP-14d3 ✅ 2026-06-18 — Pulse-Produktentscheidung in Spec dokumentiert: APP_SPEC V2.8 (§14.6 reduced-motion-Bullet, §16.1 Pulse-Absatz mit konkreten Parametern, §16.3 Primitive-Tabelle, §16.4 Reduced-Motion-Tabelle); QA_TEST_CASES V1.5 (TC-I01 erweitert, Gruppe P TC-P01–TC-P05 neu). Kein Code geändert. Nächster Schritt: B1-AP-15 — Transitions + Reduced Motion.
> B1-AP-14d4 ✅ 2026-06-18 — §16.3 UI-Primitive-Tabelle synchronisiert: 13 Primitive von „zu bauen" auf ✅ korrigiert; 1 ⚠️ Stationen-Button (continueLabel offen), 1 ⏳ Draw-Animation (Slice 6 offen). APP_SPEC V2.9. Kein Code geändert. Nächster Schritt: B1-AP-15 — Transitions + Reduced Motion.
> B1-AP-14e1 ✅ 2026-06-19 — Doku-Nachputz: CHART_PLUGIN_ARCHITEKTUR.md in Steuerungsdateien eingebunden (NAVIGATION.md Chart-Engine-Routing Plugin-Hinweis + B1-Block, PROJECT-STATUS.md §8). Kein Code, kein CSS, kein JSON geändert. Nächster Schritt: B1-AP-15 — Transitions + Reduced Motion.
> B1-AP-14f1 ✅ 2026-06-19 — Plugin-Ist-Befund: 5 Chart.js-Plugins inventarisiert (CenterText, Crosshair, FwAnnotationPulse, fwVerticalLine, FwBarLayout). Hauptbefund: fwVerticalLine-Zuweisung in ChartEngine._draw() Z.317 überschreibt Strategie-Plugin-Arrays → CrosshairPlugin auf Screen 3 verloren (bestätigter Bug). Kein Code geändert. Ergebnisprotokoll: docs/steering/patches/AP-14e1_Plugin-Ist-Befund-finalisieren_Ergebnis.md. Nächster Schritt: B1-AP-14e2 — fwVerticalLine Bug-Fix + Auslagerung.
> B1-AP-14e2 ✅ 2026-06-19 — fwVerticalLine-Plugin ausgelagert: `FwVerticalLinePlugin.js` NEU in `plugins/`; `ChartEngine._draw()` push statt Zuweisung → `CrosshairPlugin`-Bug behoben. Ergebnisprotokoll: `docs/steering/patches/AP-14e2_fwVerticalLine-Plugin-Auslagerung_Ergebnis.md`. Nächster Schritt: B1-AP-14c2c.
> B1-AP-14c2c ✅ 2026-06-19 — LineChartStrategy Date-Objekt-Regression: `_toMonthKey`-Helfer (Type-Guard) + `_monthToSnappedX` in `if`-Block (nur bei Annotationen). CSVParser liefert `Date`-Objekt bei `expectDate: true`. Normale CSV-LineCharts wieder fehlerfrei. Nur `LineChartStrategy.js`. Ergebnisprotokoll: `docs/steering/patches/B1-AP-14c2c_LineChartStrategy_DateObjekt_Regression_Ergebnis.md`. Nächster Schritt: B1-AP-14e3.
> B1-AP-14e3 ✅ 2026-06-19 — Engine-Datenpfad-Regressionsregel verankert: `docs/spec/CHART_ENGINE_REGRESSIONSREGELN.md` NEU (renderFromData vs. _processContainer, verbotene Date-Muster, Pflichtprüfungs-Checkliste, Protected-Files-Bestätigung); `NAVIGATION.md` Engine-Routing-Hint ergänzt. Kein Code. Ergebnisprotokoll: `docs/steering/patches/AP-14e3_Engine-Datenpfad-Regressionsregel_Ergebnis.md`. Nächster Schritt: B1-AP-14e4 — CenterTextPlugin auslagern.
> B1-AP-14e4 ✅ 2026-06-19 — CenterTextPlugin ausgelagert: `plugins/CenterTextPlugin.js` NEU; `core/FwChartPlugins.js` Re-Export-Shim (v1.7.0); `PieChartStrategy.js` Import aktualisiert. Alle manuellen Tests bestätigt. Ergebnisprotokoll: `docs/steering/patches/AP-14e4_CenterTextPlugin-Auslagerung_Ergebnis.md`. Nächster Schritt: B1-AP-14e5 — CrosshairPlugin auslagern.
> B1-AP-14e5 ✅ 2026-06-19 — CrosshairPlugin ausgelagert: `plugins/CrosshairPlugin.js` NEU; `core/FwChartPlugins.js` reiner Re-Export-Shim; `LineChartStrategy.js` Import aktualisiert. Alle manuellen Tests bestätigt. Ergebnisprotokoll: `docs/steering/patches/AP-14e5_CrosshairPlugin-Auslagerung_Ergebnis.md`. Nächster Schritt: B1-AP-14e6 — FwChartPlugins-Shim prüfen und entfernen.
> B1-AP-14e6 ✅ 2026-06-22 — FwChartPlugins-Shim gelöscht: `core/FwChartPlugins.js` entfernt — reiner Re-Export-Shim ohne produktive Importe; alle manuellen Tests bestätigt. Ergebnisprotokoll: `docs/steering/patches/AP-14e6_FwChartPlugins-Shim-entfernen_Ergebnis.md`. Nächster Schritt: B1-AP-14e7 — FwBarLayoutPlugin vollständig prüfen.
> B1-AP-14e7 ✅ 2026-06-22 — FwBarLayoutPlugin im BarChart-Hybrid vollständig geprüft: `_fwGeometry` ist dead state — Plugin schreibt, niemand liest. `FwSmartXAxis.afterFit()` berechnet `halfBarPixel` eigenständig. Beide Modi (History/Zeit + Ranking/Kategorie) klassifiziert. Kein Code. Ergebnisprotokoll: `docs/steering/patches/AP-14e7_FwBarLayoutPlugin-Hybrid-Pruefung_Ergebnis.md`. Nächster Schritt: B1-AP-14e8 — FwBarLayoutPlugin-Dead-State nachweisen und entfernen.
> B1-AP-14e8 ✅ 2026-06-22 — FwBarLayoutPlugin-Dead-State nachgewiesen und entfernt: 11 Zeilen inline-Plugin aus `BarChartStrategy.js` gelöscht. Alle 10 Grün-Kriterien + alle 14 Tests bestätigt. Ergebnisprotokoll: `docs/steering/patches/AP-14e8_FwBarLayoutPlugin-Dead-State-entfernen_Ergebnis.md`. Nächster Schritt: B1-AP-14e9 — Plugin-Barrel anlegen.
> B1-AP-14e9 ✅ 2026-06-22 — Plugin-Barrel angelegt: `plugins/index.js` NEU — 4 Re-Exports; Imports in `ChartEngine.js`, `LineChartStrategy.js`, `PieChartStrategy.js` auf Barrel umgestellt. Alle manuellen Tests bestätigt. Ergebnisprotokoll: `docs/steering/patches/AP-14e9_Plugin-Barrel_Ergebnis.md`. Nächster Schritt: B1-AP-14e10 — Plugin-Spec und Steuerdateien synchronisieren.
> B1-AP-14e10 ✅ 2026-06-22 — Plugin-Spec, Spec-Drift und Steuerdateien synchronisiert: `CHART_PLUGIN_ARCHITEKTUR.md` §20 NEU (aktiver Plugin-Bestand, kanonischer Barrel, Importzyklus-Verbot, verbotene Mechanismen, entfernte Elemente inkl. FwBarLayoutPlugin/_fwGeometry-Drift, BarChart-Hybrid-Warnung); `NAVIGATION.md` Plugin-Routing-Hinweis ergänzt (Barrel + Importzyklus-Verbot). Kein Code geändert. Ergebnisprotokoll: `docs/steering/patches/AP-14e10_Plugin-Spec-und-Steuerdateien-Sync_Ergebnis.md`. Nächster Schritt: B1-AP-14e11 — Plugin-Architektur-QA mit Importzyklus-Gate.
> B1-AP-14e11 ✅ 2026-06-22 — Plugin-Architektur-QA Importzyklus-Gate: alle 4 Plugin-Dateien ohne Imports (kein Zyklus), Barrel sauber (4 Re-Exports, kein Chart.register, kein FwBarLayoutPlugin), alle Engine/Strategy-Imports über `../plugins/index.js`, 0 Altpfade (FwChartPlugins/FwBarLayoutPlugin/fwBarLayout/_fwGeometry), 0 verbotene Mechanismen, 14/14 Spec-vs-Repo-Prüfpunkte grün. FREIGABE: Plugin-Refactoring-Kette B1-AP-14e1–14e11 abgeschlossen. Ergebnisprotokoll: `docs/steering/patches/AP-14e11_Plugin-Architektur-QA_Importzyklus-Gate_Ergebnis.md`. Nächster Schritt: B1-AP-14e12 — Spec-Drift und Audit-Lücken schließen.
> B1-AP-14e12 ✅ 2026-06-22 — Spec-Drift und Audit-Lücken endgültig geschlossen: X-Achsen-Docs I/II/III mit Statusbannern als historische Designintention markiert; CHART_PLUGIN_ARCHITEKTUR.md §4 Opt-in-Klärung, §18 §20-Regeln, §20.3 selektive Barrel-Imports, §20.6 alle 3 Docs als Drift-Stellen, §20.8 _originalDate-Abgrenzung zu _fwGeometry ergänzt. Kein Code geändert. Ergebnisprotokoll: `docs/steering/patches/AP-14e12_Spec-Drift-und-Audit-Luecken-endgueltig-schliessen_Ergebnis.md`. Nächster Schritt: B1-AP-15 — Transitions + Reduced Motion.
> B1-AP-15a ✅ 2026-06-23 — Motion-Befund (Audit, kein Code): Screen-Transitions ✅ (hidden-Toggle direkt, kein CSS-Übergang), Pulse ✅ (RM-Guard in `FwAnnotationPulsePlugin.js` Z.84), Draw-Animation ⏳ (bewusst offen per §16.3), RM-Lücke: `chart.update()` ignoriert prefers-reduced-motion → `chart.update('none')` als Fix für AP-15b. CSS-RM-Block (app.css Z.110–115) ist toter Code. `motionRules.reducedMotion` in stations.de.json nicht ausgelesen. Ergebnisprotokoll: `docs/steering/patches/B1-AP-15a_Motion-Befund_Ergebnis.md`. Nächster Schritt: B1-AP-15b — Reduced Motion chart.update().
> B1-AP-15b ✅ 2026-06-23 — ChartEngine Reduced Motion Fix: `_prefersReducedMotion()` NEU in `ChartEngine.js` (defensiv: typeof window + matchMedia + try/catch); Initial-Render `animation = false` bei prefers-reduced-motion: reduce; Update-Pfad `chart.update('none')` statt `chart.update()`. Beide Datenpfade (renderFromData + _processContainer) abgedeckt. Alle Tests bestätigt. Ergebnisprotokoll: `docs/steering/patches/B1-AP-15b_ChartEngine_Reduced-Motion-Fix_Ergebnis.md`. Nächster Schritt: B1-AP-15c — `motionRules` Validation Hardening (nur nach Freigabe).
> B1-AP-15c ✅ 2026-06-23 — motionRules Validation Hardening: `betweenStations`, `forcedWaitBeforeContinue`, `reducedMotion` in `validateStationsJson()` hart validiert — 3 neue Guards in `app.js`, kein Stil-Abweichung. Alle 4 bindenden motionRules-Felder haben jetzt harte Prüfung. Positiv-Test + Negativ-Test bestätigt. Ergebnisprotokoll: `docs/steering/patches/B1-AP-15c_motionRules-Validation-Hardening_Ergebnis.md`. Nächster Schritt: B1-AP-15d — Dead CSS Reduced-Motion Cleanup.
> B1-AP-15d ✅ 2026-06-23 — Dead CSS Reduced-Motion Cleanup: wirkungsloser `@media (prefers-reduced-motion: reduce)`-Block aus `app.css` entfernt (Z.110–115, 7 Zeilen) — `.fw-app__slider` und `.fw-app__slider-value` hatten keine aktive `transition`. Keine neuen CSS-Regeln eingeführt. AP-15b-Gate + AP-15c-Gate grün. Ergebnisprotokoll: `docs/steering/patches/B1-AP-15d_Dead-CSS-Reduced-Motion-Cleanup_Ergebnis.md`. Nächster Schritt: B1-AP-15e — Motion Mini-QA.
> B1-AP-15e ✅ 2026-06-23 — Motion Mini-QA: statische Code-Analyse + Browser-Smoke-Test (prefers-reduced-motion an/aus, Screen 1→2→3, Range-Wechsel) — alle 4 AP-15b/c/d-Gates grün, kein Drift, kein Endwissens-Leak. Status: GRÜN. Ergebnisprotokoll: `docs/steering/patches/B1-AP-15e_Motion-Mini-QA_Ergebnis.md`. Nächster Schritt: B1-AP-16a — Screen-4-Befund / No-Forecast / Transfer auf heute.
> B1-AP-16a ✅ 2026-06-24 — Reveal-/Transfer-Contract-Audit (kein Code): APP_SPEC Screen-3/4 Soll-Vertrag vollständig extrahiert; `renderKpiCards()` in app.js vorhanden aber nie aufgerufen, kein DOM-Container im Screen-3-DOM; Screen-4-Headline + Bodytext spec-fremd; 5 Abweichungen in Soll/Ist-Matrix; Datenflusskarte + Seiteneffektanalyse abgeschlossen; Reparaturkette B1-AP-16b/c/d definiert. Status: GELB (keine Blocker). Ergebnisprotokoll: `docs/steering/patches/B1-AP-16a_Reveal-Transfer-Contract-Audit_Ergebnis.md`. Nächster Schritt: B1-AP-16b — Screen-3-Reveal vervollständigen.
> B1-AP-16b ✅ 2026-06-24 — Screen-3-Reveal vervollständigt: KPI-Container (div.fw-app__kpi-slot) nach chartSection3 in Screen-3-DOM eingefügt; renderKpiCards(kpiContainerS3, ctx) in renderS3() aufgerufen mit textContent=''-Clear (kein Duplikat); Subline auf APP_SPEC §16.2 gesetzt; S3→S4 CTA auf E-04: „Meine nächsten 10 Jahre starten". Alle 5 Testfälle grün. Ergebnisprotokoll: `docs/steering/patches/B1-AP-16b_Screen-3-Reveal-gemaess-APP-SPEC_Ergebnis.md`. Nächster Schritt: B1-AP-16c — Screen-4-Transfer-Text herstellen.
> B1-AP-16c ✅ 2026-06-24 — Screen-4-Transfer-Text gemäß APP_SPEC hergestellt: Headline „Heute beginnt wieder ein Chart, dessen Ende niemand kennt." (APP_SPEC §16.2); Bodytext als `<p class="fw-app__screen-subline">` eingefügt; finaler CTA „Heute Marktzeit sammeln →" unverändert. Ergebnisprotokoll: `docs/steering/patches/B1-AP-16c_Screen-4-Transfer-Text-gemaess-APP-SPEC_Ergebnis.md`.
> B1-AP-16d ✅ 2026-06-24 — Reveal-/Transfer-Mini-QA: 18-Punkte-Checkliste S1→S2→S3→S4→S3 durch Albert bestätigt; alle statischen Prüfpunkte grün; AP-15-Motion intakt; AP-16-Komplex vollständig. Ergebnisprotokoll: `docs/steering/patches/B1-AP-16d_Reveal-Transfer-Mini-QA_Ergebnis.md`. Nächster Schritt: B1-AP-17a — Navigation/Zurück-Weiter/Fokus-Befund.
> B1-AP-17a ✅ 2026-06-24 — Navigation/Zurück-Weiter/Fokus-Befund: statische Code-Analyse + Browser-QA durch Albert bestätigt; Hauptflow/State-Flow/Endwissensgrenze/KPI-Idempotenz GRÜN; 3 GELB-Befunde nicht-blockierend (S4 cta href='', A11y Re-Announce S3-Rückkehr, Fokus h2 statt h3). Ergebnisprotokoll: `docs/steering/patches/B1-AP-17a_Navigation-Zurueck-Weiter-Fokus-Befund_Ergebnis.md`. Nächster Schritt: B1-AP-17b — Navigation/Fokus minimal reparieren.
> B1-AP-17b ✅ 2026-06-24 — A11y-/Fokus-Minifix: G2 (Live-Region Re-Announce bei S3-Rückkehr via lastRevealA11yText + else-if) + G3 (Fokus auf Stations-h3 bei Stationswechsel mit h2-Fallback) minimal repariert; 5 Zeilen app.js; renderS3-Guard erhalten; kein KPI-Duplikat; kein Endwissens-Leak. Ergebnisprotokoll: `docs/steering/patches/B1-AP-17b_A11y-Fokus-Minifix_Ergebnis.md`. Nächster Schritt: B1-AP-17c — A11y-/Fokus-Mini-QA.
> B1-AP-17c ✅ 2026-06-24 — A11y-/Fokus-Mini-QA: G2 + G3 statisch verifiziert + Browser-Tests A–C durch Albert bestätigt; AD-G2 bewertet (Restrisiko dokumentiert, heute nicht auslösbar); G1 href="" bewusst offen (wartet auf Ziel-URL); AP-17 Gesamtstatus GRÜN. Ergebnisprotokoll: `docs/steering/patches/B1-AP-17c_A11y-Fokus-Mini-QA_Ergebnis.md`. Nächster Schritt: B1-AP-18a — Error-/Empty-/QA-Readiness-Befund.
> B1-AP-18a ✅ 2026-06-24 — Error-/Empty-/QA-Readiness-Befund (Triage): Fehlerflächenkarte erstellt; 5 Top-Risiken (GELB); renderError() kein role="alert" → AP-18b-Kandidat; alle Error-/Empty-States stabil, kein Crash; source_claimed_unchecked Stationen editorial-Gap; test-data/-Fixtures vollständig. Ergebnisprotokoll: `docs/steering/patches/B1-AP-18a_Error-Empty-QA-Readiness-Befund_Ergebnis.md`. Nächster Schritt: B1-AP-18b — Error-/Empty-State A11y-Minifix.
> B1-AP-18b ✅ 2026-06-24 — renderError role=alert Minifix: p.setAttribute('role', 'alert') in renderError() eingefügt (+1 Zeile app.js); §14.13-Lücke geschlossen; DOM-A11y-Mini-QA durch Albert bestätigt (12 role="alert"-Elemente, 4 distinkte Texte); kein Screenreader-Volltest (bleibt AP-19). Ergebnisprotokoll: `docs/steering/patches/B1-AP-18b_renderError-role-alert-Minifix_Ergebnis.md`. Nächster Schritt: B1-AP-18c — Mini-QA / AP-18-Abschluss / AP-19-Übergabe.
> B1-AP-18c ✅ 2026-06-24 — Mini-QA / AP-18-Abschluss / AP-19-Übergabe: AP-18b statisch + DOM-Mini-QA bestätigt; AP-18 Gesamtstatus GRÜN mit offenen Nicht-Blockern; 7 offene Punkte klassifiziert (G1 href, source_claimed_unchecked, produktive CSV, Error-State-d-Harness, Empty-Journey, Screenreader-Volltest, showScreen(3,false)-Hardening); Übergabeliste für AP-19-Faden vorbereitet. Ergebnisprotokoll: `docs/steering/patches/B1-AP-18c_Mini-QA_AP-18-Abschluss_AP-19-Uebergabe_Ergebnis.md`. Nächster Schritt: B1-UX-01 — Psychologische Wirkungs-Anamnese.
> B1-UX-01 ✅ 2026-06-25 — Psychologische Wirkungs-Anamnese (kein Code): 5 Hauptbefunde; Status GELB; Kern: dramaturgischer Bogen gebrochen (4/7 Stationen source_claimed_unchecked gefiltert — technisch behoben durch B1-STATIONS-v3.0). Folge-APs vorgeschlagen: UX-02 (Copy), UX-03 (Quellen), UX-04 (Design), UX-05 (CTA). Ergebnisprotokoll: `Apps/prokrastinations-preis/B1-UX-01_wirkungs-anamnese.md`. Nächster Schritt: B1-STATIONS-v3.0 — Stations-JSON-Migration.
> B1-STATIONS-v3.0 ✅ 2026-06-25 — Stations-JSON-Migration v2.1 → v3.0: stations.de.json ersetzt (7 Stationen, 6 Felder); validateStationsJson() komplett neu; filterStationsForWindow() vereinfacht (date.slice(0,7)); buildJourneyStations() chronologisch + synthetischer Final-Reveal aus CSV; selectStationsForJourney() + checkEditorialGate() entfernt; formatSourceLine() NEU; renderStationCard() + renderJourneyStep() auf hardcoded Labels umgestellt; alle 7 Stationen sichtbar (kein sourceStatus-Filter → volle Dramaturgie-Strecke 2016–2026). Alle Tests grün. Ergebnisprotokoll: `Apps/prokrastinations-preis/B1-STATIONS-v3.0_ergebnisprotokoll.md`. Nächster Schritt: B1-AP-19 — App-QA / Abschluss-Faden.
> `Apps/prokrastinations-preis/config/stations.de.json` — produktive Stationen-Konfiguration v3.0 (B1-STATIONS-v3.0 ✅ 2026-06-25)
> `Apps/prokrastinations-preis/STATIONS_CONFIG_CONTRACT.md` — Event-Pin-Datenvertrag v3.0 (6 Felder, YYYY-MM-DD; B1-STATIONS-v3.0 ✅ 2026-06-25)
> `Apps/prokrastinations-preis/STATIONS_IMPLEMENTATION_PLAN.md` — Implementierungsplan für Stationen-Zeitreise Coding-Slices AP-11–AP-18, V1.1 (B1-AP-10 ✅, AP-10a Semantik bereinigt ✅ 2026-06-17)
> B1 ist Pilot-2 (Daten-/Chart-/Story-Pilot). Pilot-1 ist `risiko-uebersetzer` (Calculator-Pilot) — entschieden E-02, 2026-05-28.
14. bei Chart-Nutzung: relevante Chart-Engine-Spec + WORKING-FEATURES.md
```

Claude gibt Bestätigung aus bevor es weitergeht: „APP-INTERFACE.md ✓, SECURITY-BASELINE.md ✓."
Apps sind security-relevant sobald sie HTML, Nutzerparameter, externe URLs, CSV oder Script-Tags berühren.
Relative Pfade in `Apps/` können gebrochen sein — beim ersten Start prüfen.

**Design-Ressourcen (bei App-Styling-Entscheidungen prüfen):**
- https://styles.refero.design/ — Komponenten-Galerie, Stil-Referenzen
- https://refero.design/mcp — MCP-Integration für Design-Referenzen

Nach Abschluss: `/abschluss-ritual`.
Beweisdramaturgie prüfen: `/heldenreise` verfügbar (nur manuell).

---

### Content schreiben / Artikel produzieren

```
1. docs/editorial/AUTHOR_GUIDE-v3.md
2. docs/editorial/GEO statt SEO.md
3. docs/editorial/SEO-WORKFLOW.md
```

Theme-Docs nicht lesen — nicht relevant für Content-Arbeit.
Nach Abschluss: `/abschluss-ritual`.

---

### Security-relevante Änderungen

Bei jeder Änderung an CSV, externen URLs, Script-Tags, Ghost-Templates, Formularen,
Nutzerparametern, Apps oder HTML-Ausgabe:

```
1. docs/steering/audits/SECURITY-BASELINE.md      ← immer zuerst
2. docs/spec/APP-INTERFACE.md                     ← bei App-Arbeit
3. betroffene Code-Datei
4. docs/steering/DEFINITION-OF-DONE.md
```

Security ist kein Abschluss-Audit — sie beginnt vor dem Code.

---

### Spec- oder Doku-Rewrite

Claude startet `/spec-rewrite-guard [Datei]` automatisch bei Spec-Edits.
Manuelle Aktivierung: `/spec-rewrite-guard docs/spec/[Dateiname]`

---

## Schnellreferenz: aktive Codepfade

| Was | Pfad |
|---|---|
| Chart-Engine | `Theme/assets/js/fw-chart-engine/` |
| CSS (einzige Wahrheit) | `Theme/assets/css/screen.css` |
| Janitor | `Theme/assets/js/fw-janitor.js` |
| Chart.js lokal | `Theme/assets/js/vendor/` |
| Test-HTMLs (Dev) | `Theme/chart-tests/` |
| Regression-Matrix | `docs/steering/engine/REGRESSION-MATRIX.md` |
| Fonts | `Theme/assets/fonts/` |
| SVGs + Favicons | `Theme/assets/images/` |
| Learning-Pipeline (session-log, patterns) | `.claude/learning/` |
| Memory-System (Feedback, Projektwissen) | `.claude/memory/` — MEMORY.md + verlinkte Memory-Files (Nextcloud + git) |
| Memory-Integritätscheck | `tools/check-memory-integrity.py` — manuell; bei Änderungen an `.claude/memory/` |

## Testdaten und Content

| Was | Pfad |
|---|---|
| CSV-Testdaten | `Theme/data/` — Dev only, nicht deployen |
| Externe B1-Datendateien | `Theme/assets/data/b1/` — produktive externe CSV-Dateien für Apps |
| Datenlayer Governance | `docs/data/` — Quellenregeln, Return-Varianten, Dataset Catalog, Contracts |
| Statische Seiten | `content/pages/` |
| Rechtliches | `content/legal/` |
| App-Ordner | `Apps/` |
| App-Fabrik Steuerung | `docs/App-Fabrik/` (00_STATUS, APP_INVENTORY, 01–05_*.md, App-Register, Factory-Analyse) |
| App-Intake-Prompts | `docs/App-Fabrik/_prompts/` — Prompt-Vorlagen für Intake-Interview (Claude, ChatGPT, Master) |
| Markenpositionierung | `docs/Marke/` — Elevator Pitch, Manifest, KI-Analyse-Runden (Erste/Zweite Runde) |

## Steuerungsdokumente (Auswahl)

| Dokument | Pfad | Beschreibung |
|---|---|---|
| Subagent-Policy Praxisnotiz | `docs/steering/SUBAGENT-POLICY-PRAXIS.md` | Warum und wie Haiku-Scouts zentral genutzt werden |
| Archivstrategie | `docs/steering/ARCHIV-STRATEGIE.md` | Föderiertes Archivmodell, Archivvertrag, Begriffsklärung, Folge-APs |
| Archiv-Inventar | `docs/steering/ARCHIV-INVENTAR.md` | Bestandsaufnahme aller Archivorte — Quelle für legacy-map.md |
| Föderierter Archivkatalog | `Archiv/legacy-map.md` | Zentrale Steuerkarte: 16 Archivorte, Zielrollen, Drift-Risiken, Pilotkandidaten |
| Archiv-Sonderfälle | `docs/steering/ARCHIV-SONDERFAELLE.md` | Arbeitsliste für Archiv-Sonderfälle — Entscheidungen bei Albert, kein Claude-Handeln ohne AP |
| Skill /archivieren Spezifikation | `docs/steering/SKILL-ARCHIVIEREN-SPEZIFIKATION.md` | Spec für SKILL-ARCHIV-02: Phasen, Klassifikationslogik, Gates, Abgrenzung zu distill/kassensturz/start/abschluss-ritual |
| Chronik-Spezifikation (SSoT) | `docs/steering/CHRONIK-SPEZIFIKATION.md` | SSoT: Definition, Frontmatter-Vertrag, Namensregel, Ablage, Workflow für Chroniken |
| Chronik-Prompt (Werkzeug) | `docs/steering/CHRONIK-PROMPT.md` | Copy-paste-Prompt für Chronik-Erstellung; enthält geschlossene Vokabel inline |
| Patch-Quittungen | `docs/steering/patches/` | Committed Patch-Quittungen nach Full-Gates (Archiv, nicht operativ) |
| Handover-Braindumps | `docs/steering/handovers/` | Vollständige Übergabedokumente für Faden-Übergaben bei komplexen Gates (Spec-Trace-Prompt, Revisionshistorie, Binding Decisions) |
| Steuerungsblock-Anamnese AP-00 | `docs/steering/patches/AP-00_steuerungsblock-einstiegspunkt-anamnese_Ergebnis.md` | Befund: Einstiegspunkte für globalen 80%-Wächter (CLAUDE.md), Routing-Hinweis (NAVIGATION.md), Skills; 8 Folge-APs AP-01–AP-08 (AP-00 ✅ 2026-06-25) |
| Steuerungsblock-Wächter AP-01 / AP-01b | `docs/steering/patches/AP-01b_steuerungsblock-regel-verdichten_Ergebnis.md` | CLAUDE.md § APP-ARBEIT: globaler 80%-Wächter eingebaut, auf 3-Satz-Kurzform verdichtet. Regel: kein Code ohne geprüften Steuerungsblock (80%-Entwurf), Klärung bei Lücke. (AP-01 ✅ 2026-06-25, AP-01b ✅ 2026-06-25) |
| Steuerungsblock-Routing AP-02 | `docs/steering/patches/AP-02_routing-hinweis-app-steuerungsblock_Ergebnis.md` | NAVIGATION.md § „App bauen / ändern": Zeile 11 ergänzt — APP_SPEC.md → Steuerungsblock lesen; Fallback MINI_SPEC_FROM_HAUPTDOKUMENT.md; Verweis auf CLAUDE.md § APP-ARBEIT. Nur Routing, kein Verhaltensgebot. (AP-02 ✅ 2026-06-26) |
| Steuerungsblock-Template AP-03 | `docs/steering/patches/AP-03_app-steuerungsblock-template_Ergebnis.md` | `docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md` NEU — 11 Abschnitte: 80%-Nordstern, Standardblock APP_SPEC.md (7 Felder + LLM-Selbsttest), Vorläuferblock MINI_SPEC, LLM-Prüfscore (4 Kriterien, 8/8-Regel), 9 Stop-Auslöser, Qualitätskriterien, Ergebnisprotokoll-Anforderung für Folge-APs. (AP-03 ✅ 2026-06-26) |
| app-spec-create Skill AP-06 / AP-06b | `docs/steering/patches/AP-06b_app-spec-create-skill-nachputz_Ergebnis.md` | `.claude/skills/app-spec-create/SKILL.md` NEU — 4 Phasen: Steuerungsblock-Wächter (Phase 0, LLM-Prüfscore AP-03-konform, 80%-Entwurf, Stop bei Score ≤ 5/8 oder Kriterium 3 ≠ 2), tech-spec-app (Phase 1), heldenreise (Phase 2), Spec-Gate (Phase 3). Abgrenzung zu spec-mode-architecture/tech-spec-app/heldenreise als Teilwerkzeuge. `NAVIGATION.md` Skill-Tabelle: spec-mode-architecture eingeordnet. AP-06b: 4 Nachputz-Edits (Score-Regel, Stop-Regel, Mini-Spec-Ableitung, Spec-Gate). (AP-06 ✅ 2026-06-26, AP-06b ✅ 2026-06-26) |
| Steuerungsblock-Wächter Skills AP-07 / AP-07b-mini | `docs/steering/patches/AP-07_steuerungsblock-waechter-tech-heldenreise_Ergebnis.md` | `tech-spec-app/SKILL.md` + `heldenreise/SKILL.md`: je ein Steuerungsblock-Wächter-Abschnitt eingefügt (Pflichtlektüre lokaler APP_SPEC/MINI_SPEC, Verweis auf AP-03-Template, Stop-Bedingungen, app-spec-create als Gesamtprozess). `tech-spec-app`: unnummerierter Pflicht-Vorabschnitt zwischen §1 und §2 + Fall C Stop-Logik präzisiert. (AP-07 ✅ 2026-06-26, AP-07b-mini ✅ 2026-06-26) |
| Steuerungsblock-Workflow AP-07c / AP-07d | `docs/steering/patches/AP-07c_workflow-phase2-steuerungsblock-sync_Ergebnis.md` | `04_CLAUDE_WORKFLOW_DRAFT.md`: Phase 2 Schritt 2.0 Pflichtschritt Steuerungsblock (Quellen APP_SPEC.md/MINI_SPEC, Prüfmaßstab `APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md`, Stop-Regel); APP_SPEC-Mindestliste +Steuerungsblock-Eintrag; Skills-Tabelle + Nächster-Schritt auf `app-spec-create` umgestellt; `spec-mode-architecture` nur ergänzend. (AP-07c ✅ 2026-06-26, AP-07d ✅ 2026-06-26) |

## Archivstrategie / Kontext-Hygiene

Föderiertes Archivmodell: Aktive Dateien zeigen was gilt, lokale Archive erklären
lokale Entstehung, Root-Archiv erzählt die projektweite Reise, `local/` schützt
Git und Claude vor Rohmaterial.

**Nicht-Routing-Regel:** Claude liest Archivmaterial nur auf ausdrückliche Anweisung von Albert oder wenn ein AP explizit Archivarbeit verlangt.

Details und Archivvertrag: `docs/steering/ARCHIV-STRATEGIE.md`

## Archiv

| Was | Pfad |
|---|---|
| Kuratierte Archivartefakte (versioniert) | `Archiv/` |
| Kontextschutz / Nicht-Routing-Stoppschild am Root-Archiv | `Archiv/README.md` |
| Föderierter Archivkatalog (Steuerkarte) | `Archiv/legacy-map.md` |
| Lokale Rohmaterialien, Binärdateien, LLM-Dumps (gitignored) | `Archiv/local/` |
| Historische Chart-Engine-Materialien | `Archiv/Chart-Engine-Historie/` |
| Historische Design-Materialien | `Archiv/Design/` |
| Making-of-Rahmen (Kapitelrahmen, Belegverweise) | `Archiv/making-of/` |
| Chroniken (chronist-v1 + legacy) | `Archiv/Chroniken/` |

## Niemals in Git

| Was | Warum |
|---|---|
| `Active Campaign Liste/` | Sensible E-Mail-Daten |
| `Theme/data/` | Dev-Testdaten |
| lokale Secrets / Tokens | Datenschutz / Security |

---

## Abhängigkeits-Reihenfolge

```
CSS-2 ✅ → CSS-3 ✅ → CSS-5 ⬛
                          ↓
                       TMPL-1 ⬛ → CSS-7 ⬛ → TH-03 ⬛ → TH-04A+B ⬛ → TH-05 ⬛ → TH-06 ⬛
                                                                              ↑
                                                                       CSS-6 ⬛

Parallel zu CSS-5 möglich: AP-19 ⬛ (DRY-Refactoring) + AP-20/21 🟡 (Mixed-Rhythm)
```

Vollständige Aufgabenliste: `docs/steering/BACKLOG.md`

---

## Offene Querschnittsfragen

| Frage | Status |
|---|---|
| `Rechtliche Seiten/` (CLICKY + KOCHREZEPT): Heimat? | offen |
| `Basis/Prompts/` → `.claude/` mergen | offen — einzeln prüfen |
| Font-CSS-Dopplung: `fonts/styles.css` vs. `fonts/stylesheet.css` | offen |
| SVG-Duplikate: `assets/images/` vs. `docs/design-system/templates/assets/` | offen |
