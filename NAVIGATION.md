# NAVIGATION.md – Finanzwesir 2.0
Stand: 2026-07-06 | Session: AP-prokrast-09d | Geändert von: Claude

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
2. docs/steering/design/CI-POOL-ROLLENKONTRAKT.md ← verbindliche Farb-/Rollen-/Benennungsregeln (Leitern 50–900, Nutzungsregeln)
3. docs/steering/BACKLOG.md                       ← offene DS-N / CSS-N Issues
4. docs/design-system/spec/                       ← Komponenten-Specs
5. Theme/assets/css/tokens.css                    ← Single Source of Truth: Farb-/Font-/Schatten-Tokens (AP-prokrast-16)
6. Theme/assets/css/screen.css                    ← importiert tokens.css, konsumiert nur per var()/color-mix
```

Regeln (nie brechen):
- Token-Wahrheit: `Theme/assets/css/tokens.css` (Farben/Fonts/Schatten). `screen.css` importiert sie via `@import` und konsumiert nur.
- Keine `fw-*` Klassen in `screen.css` definieren oder überschreiben
- CI-Marken-Hexe ausschließlich in `tokens.css`; in `screen.css` verbleiben dokumentierte Neutral-Beinahe-Dubletten (`#f9fafb`, `#f3f4f6`) bis zur Tokenisierung in **T1**
- Keine externen Font-Quellen
- Chart-Engine liest dieselben Tokens: `FwTheme.init()` bridged `tokens.css`, das eine init()'te Theme wird per Composition Root an alle 3 Strategien durchgereicht (AP-prokrast-16c)

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
> AP-prokrast-01–02e ✅ 2026-07-02 — Neues, amtliches Drehbuch (`drehbuch_prokrastinationspreis_app.md`) gegen Ist-Code und Architektur geprüft: Befund (AP-01), Quelleninventur (AP-02a), Konfliktmatrix (AP-02b), Architektur-Kontrakt (AP-02c), Migrationsschnitt (AP-02d), unabhängige Abschluss-QA (AP-02e, GRÜN). Kernbefund: Screen 1 bereits erfüllt; Screen 4 (Rubikon) größte Lücke, aber architektonisch am besten vorbereitet (`xDisplayRange`/`FwVerticalLinePlugin` tragen ohne Engine-Codeänderung); Screen 2 (Card-to-Point) bewusst nicht zuerst gebaut (höchste DOM↔Canvas-Kopplungsgefahr). Kein Code/Spec geändert. Ergebnisprotokolle: `docs/steering/patches/AP-prokrast-02a_quelleninventur-datei-wahrheit_Ergebnis.md`, `..._02b_soll-ist-architektur-konfliktmatrix_...`, `..._02c_architektur-kontrakt_context-datenwahrheit_...`, `..._02d_migrationsschnitt_ap-schnitt_ruecklaufkapsel_...`, `..._02e_abschluss-qa_ap02a-b-c-d_claims-vs-files_...`. Nächster Schritt: AP-prokrast-03 — Rubikon-Minimum als vertikale Scheibe (wartet auf Nutzer-OK).
> AP-prokrast-03a–03e ✅ 2026-07-02 — Rubikon-Zukunftsraum architektonisch geklärt und als isoliertes Plugin gebaut. Architektur-Anamnese (AP-03a, GRÜN): `xDisplayRange`→`fwContext.displayRange`→`axis.min/max` trägt den Zukunftsraum bereits ohne Engine-Änderung, direkt am Code verifiziert. Rubikon-Reveal-Vorschläge + Peer-Review-Dossier (AP-03b, GRÜN): Smart-Update-Mechanismus in `ChartEngine.js` (B1-AP-15b) trägt den Reveal via `chart.update()`; `FwAnnotationPulsePlugin` für ✅/❓ ohne Änderung ungeeignet (belegt). Peer Review Canvas-Text-Plugin (AP-03c, GRÜN): `FwChartTextPlugin.js` V1-Vertrag geschnitten (plotFraction relativ zu chartArea, persistent, kein Card-to-Point). Minimum-Implementierung (AP-03d, GRÜN): `FwChartTextPlugin.js` neu gebaut, `ChartEngine.js`+`plugins/index.js` additiv erweitert, Smart-Update-Testfall in `app.test.html` (Szenario AF, auf Nutzeranweisung) manuell im Browser bestätigt. Unabhängige Abschluss-QA (AP-03e, GRÜN): alle Claims gegen Dateien verifiziert, Smart-Update-Zweig nachweislich unverändert. Kein Screen-4-Bau, `app.js` unverändert. Ergebnisprotokolle: `docs/steering/patches/AP-prokrast-03a_*_Ergebnis.md` bis `AP-prokrast-03e_*_Ergebnis.md`. Nächster Schritt: AP-prokrast-03f — Screen-4 Rubikon-Reveal Integration mit `FwChartTextPlugin`.
> AP-prokrast-03f–03i ✅ 2026-07-02 — Screen 4 (Rubikon-Reveal) vollständig gebaut, zweimal grundlegend korrigiert, unabhängig abgeschlossen. Integration (AP-03f, GELB): Chart-Mount + zwei `renderFromData()`-Aufrufe + `FwChartTextPlugin`, aber Reveal-Bewegung im Browser zackig statt smooth — Architektur-Lücke gefunden. Forschung (AP-03g, GRÜN): Root Cause auf Chart.js-4.5.0-Quellcode-Ebene verifiziert — Scale-Bounds durchlaufen strukturell nie den Animator (`_updateLayout()` getrennt von `_updateDatasets(mode)`); C2 (gestufter Reveal) als spec-konformer Kompromiss empfohlen. Produktentscheidung (AP-03h, GELB): C2/Morph vollständig verworfen — Screen 4 zeigt ab Eintritt sofort den finalen 20-Jahres-Zustand, Haupttext als DOM-Textblock; Konflikt (Text soll ins rechte Chart-Feld, aber A11y verlangt DOM statt Canvas) an Steuerungsebene zurückgegeben. Lösung (AP-03h2, GRÜN): DOM-Overlay statt Canvas — `rubikonText` per CSS `position:absolute` in die rechte Zukunftshälfte gelegt, `chartSection4` unangetastet; zwei Nachjustierungsrunden nach Alberts Live-Feedback (Abstand zur Linie, S-Zone), dafür `--fw-rubikon-text-top/-left` als CSS-Custom-Properties eingebaut. Unabhängige Abschluss-QA (AP-03i, GRÜN): alle Claims gegen Code verifiziert, Screen 1–3/Szenario AF unberührt (Diff-Hunk-Analyse), Scope sauber (nur `app.js`/`app.css`), commitfähig. Kein Engine-/Plugin-/Strategy-/Spec-Diff über die gesamte Kette. Ergebnisprotokolle: `docs/steering/patches/AP-prokrast-03f_*_Ergebnis.md` bis `AP-prokrast-03i_*_Ergebnis.md`. Nächster Schritt: Commit-Freigabe durch Albert.
> AP-prokrast-04a–04c ✅ 2026-07-03 — Soll-/Spec-Synchronisierung nach der Rubikon-Entscheidung, unabhängig geprüft und an den Masterfaden zurückgegeben. Synchronisierung (AP-04a, GRÜN): `APP_SPEC.md` §16.1a neu (Chart-Aufbau, DOM-Overlay-Haupttext, `FwChartTextPlugin`-Einordnung, Reveal-Timing), §16.2/§16.3/T-21/§23.18 präzisiert; Drehbuch-Beat 1/3 als abgelöst markiert, Beat 2 (✅/❓-Symbolik) explizit als offen/nie entschieden gekennzeichnet — kein Code/Engine/Plugin berührt. Unabhängige Abschluss-QA (AP-04b, GRÜN): alle Claims gegen reale Dateien verifiziert, Fundstelle für `QA_TEST_CASES.md:557`-Drift lokalisiert. Rücklaufkapsel (AP-04c, GRÜN): zwei Eskalationspunkte prominent an Albert weitergereicht, zusätzlich als BACKLOG AP-26 (Beat-2-Klärung) und AP-27 (`QA_TEST_CASES.md`-Sync) registriert. Ergebnisprotokolle: `docs/steering/patches/AP-prokrast-04a_*_Ergebnis.md` bis `AP-prokrast-04c_*_Ergebnis.md`. Nächster Schritt: Kandidat B wurde gewählt und in AP-prokrast-05a–05e umgesetzt (siehe unten); Kandidat A (Beat-2-Klärung, BACKLOG AP-26) und C (Card-to-Point) bleiben offen.
> AP-prokrast-05a–05e ✅ 2026-07-03 — `QA_TEST_CASES.md` auf den finalen Rubikon-Sollstand synchronisiert (BACKLOG AP-27 erledigt), unabhängig zweifach geprüft und an den Masterfaden zurückgegeben. Synchronisierung (AP-05a, GRÜN): TC-F01 neu gefasst (Rubikon-Chart korrekt statt „Kein Zukunftschart."), TC-F03/TC-F04 neu ergänzt (DOM-Haupttext, 800ms-Timing, Reduced-Motion-Invarianz); manuelle Browser-Verifikation durch Albert bestätigte DOM-Struktur und Timing zusätzlich am realen Code. Abschluss-QA (AP-05b, GELB, Rücklauf freigegeben): alle AP-05a-Claims bestanden, aber reale Testlücke gefunden — CTA-Fokus während der 800ms-Pausen (bereits in AP-prokrast-02d entschieden) fehlte testbar. Light-Gate-Minifix (AP-05c, GRÜN): TC-F03 um drei Prüfschritte + Erwartetes-Ergebnis-/Fehlschlag-Zeilen ergänzt, TC-F04 minimal um Reduced-Motion-Erbschaft ergänzt, TC-F01 nicht erneut geöffnet, kein Code. Re-QA (AP-05d, GRÜN): AP-05c unabhängig bestätigt, GELB-Fund vollständig geschlossen. Rücklaufkapsel (AP-05e, GRÜN): Regressionsrisiko niedrig, Empfehlung an Masterfaden — nächster Haupt-AP neu zu schneiden (Kandidaten BACKLOG AP-26, Card-to-Point, Screen-3-Timing-Reveal). Über die gesamte Kette ausschließlich `QA_TEST_CASES.md` geändert. Ergebnisprotokolle: `docs/steering/patches/AP-prokrast-05a_*_Ergebnis.md` bis `AP-prokrast-05e_*_Ergebnis.md`. Nächster Schritt: Kandidat A wurde gewählt und in AP-prokrast-06a–06d umgesetzt (siehe unten); Card-to-Point und Screen-3-Timing-Reveal bleiben offen.
> AP-prokrast-06a–06d ✅ 2026-07-04 — ✅/❓-Symbolik (Drehbuch Beat 2, BACKLOG AP-26) geklärt und spec-konform verankert, unabhängig geprüft und an den Masterfaden zurückgegeben. Produktentscheidung (AP-06a, GELB): Datei-Historie zeigte die Symbolik durchgängig als offen/nie entschieden; eigenständige Empfehlung Option B (streichen), da Original-Icon-Form (grünes ✅, textlos) dem Nudging-Verbot und dem A11y-Vorrang von Screen 4 widersprach — danach stellte Albert außerhalb der Datei-Historie verbindlich klar: Symbole bleiben als rein visueller Canvas-Marker ohne DOM-/A11y-Anspruch. Regression-Sync (AP-06b, GRÜN): `APP_SPEC.md` §16.1a + UI-Primitive-Liste (`RubikonSymbolMarkers`), Drehbuch (Beat 2, Responsive-Zeile, Implementierungs-Notiz) und `QA_TEST_CASES.md` (TC-F05 neu) minimal synchronisiert; Historie ehrlich als „Korrektur durch bindende Nutzerentscheidung nach AP-06a-GELB" dokumentiert, nicht als „schon immer so entschieden". Unabhängige Abschluss-QA (AP-06c, GRÜN): alle AP-06b-Claims bestätigt, Diff-Check zeigt reine Additivität, `FwChartTextPlugin.js` unverändert/read-only, Restsatz „✅ ❓ reichen" im Drehbuch als nicht-blockierend bewertet. Rücklaufkapsel (AP-06d, GRÜN): Regressionsrisiko niedrig (reine Doku-Ebene, kein Code), Empfehlung an Masterfaden — AP-prokrast-07 (Bau `RubikonSymbolMarkers` über `FwChartTextPlugin.js`) als nächster Haupt-AP; BACKLOG AP-26 auf „entschieden, Bau offen" nachgezogen. Über die gesamte Kette `APP_SPEC.md`/Drehbuch/`QA_TEST_CASES.md` geändert, kein `app.js`/`app.css`/Engine/Plugin/Strategy/Stationsdaten berührt, kein Bau. Ergebnisprotokolle: `docs/steering/patches/AP-prokrast-06a_*_Ergebnis.md` bis `AP-prokrast-06d_*_Ergebnis.md`. Nächster Schritt: Masterfaden wertet Rücklaufkapsel aus; empfohlener Haupt-AP AP-prokrast-07 — Commit für AP-prokrast-06a–06d steht mit diesem Abschluss an (AP-prokrast-03a–05e sind bereits einzeln committed: a399b5f/ffacc13/c633f82/a735981).
> AP-prokrast-07a–07d ✅ 2026-07-06 — Bau `RubikonSymbolMarkers` (BACKLOG AP-26), Layout-Feinjustierung, Abschluss-QA und QA-Nachtrag. Bau (AP-07a, GRÜN): `FwChartTextPlugin.js` additiv um `anchor:'lastPoint'` erweitert (bindet ✅/❓ an denselben Datenpunkt wie `FwVerticalLinePlugin`, kein DOM/A11y, keine Datenmutation), `app.js` `renderScreen4Chart()` um `chartText`-Konfiguration ergänzt. CSS-Feinjustierung (AP-07c, eingeschoben): Albert fand beim manuellen Test zwei Layout-Defekte am DOM-Textblock (`rubikonText`) — Kollision mit „?" auf Screen S, fehlende Fluchtlinie zu „?" auf allen Breiten; behoben über iterative DevTools-Messung (`tools/rubikon-symbol-markers-diagnose.js`) und neue M-Breakpoint-Stufe in `app.css` (481–1024px, zusätzlich zu S/L). Abschluss-QA (AP-07b, GELB): M zum Prüfzeitpunkt als offen gewertet, formaler DOM-/Accessibility-Tree-Check noch nicht dokumentiert; CSS-KONVENTIONEN.md als nicht einschlägig identifiziert (gilt nur für `screen.css`, nicht App-eigene Stylesheets). QA-Nachtrag + Rücklaufkapsel (AP-07d, GRÜN): Albert nahm M unter aktuellem Fallback-Font-Stand bewusst ab (Feinjustierung erst nach CI-Font-Anbindung sinnvoll) und führte den DOM-/Accessibility-Tree-Check durch (kein DOM-Treffer, kein Accessibility-Tree-Eintrag, keine Live-Region-Aktualisierung) — beide GELB-Gründe damit aufgelöst, TC-F05 für aktuellen Font-Stand bestanden. Offener Folgeauftrag (kein Blocker): Rubikon-Positionierung S/M/L muss nach Anbindung der offiziellen CI-Fonts (`--fw-font-base` aktuell nirgendwo definiert, Theme-Bridge-Lücke DS-012/DS-013) mit `tools/rubikon-symbol-markers-diagnose.js` neu gemessen werden. Ergebnisprotokolle: `docs/steering/patches/AP-prokrast-07a_*_Ergebnis.md` bis `AP-prokrast-07d_*_Ergebnis.md`. Nächster Schritt: Commit-Freigabe durch Albert; danach Kandidaten für nächsten Haupt-AP: Card-to-Point, Screen-3-Timing-Reveal, DS-012/DS-013 (Theme-Bridge-Fonts).
> AP-prokrast-08a–08c ✅ 2026-07-06 — Card-to-Point-Motion Screen 2 (`prokrastinations-preis`): Koordinaten-Schnittstelle analysiert, AnchorMeasurement v1 + Card-to-Point gebaut, zweimal grundlegend korrigiert (Sequenz-Gate, Chart-Settled-Gate), Architektur-Gate vor Weiterbau erzwungen, Chart.js-Default-Tweening entfernt, unabhängig hart geprüft. Analyse (AP-08a, GRÜN): kein Chart.js-Internals-Zugriff aus `app.js` nötig, Empfehlung neues eigenständiges `FwAnchorMeasurementPlugin.js` (Variante B). Implementierung (AP-08b, GELB): `FwAnchorMeasurementPlugin.js` NEU (afterDraw, ChartEngine als Vermittler, kein `fwContext`/`chart._fwGeometry`), `flyCardToPoint()` mit `aria-hidden`-Clone (echte Card bleibt semantische Quelle); Nachtrag Fluggeschwindigkeit 300ms→450ms→(separat) 1350ms per CSS-Custom-Property, DS-FOLLOWUP-08 registriert. Sequenzkorrektur (AP-08b2): Chart-Reveal-vor-Card-Flight-Gate gebaut; Zwischenregression (Chart.js registriert Plugins nur bei `new Chart()`, nie im Smart-Update-Pfad) über No-op-Bootstrap gelöst (HÄRTEN-Technical-Debt); neutrale LLM-Review-Kontext-Datei statt Standard-Ergebnisprotokoll geschrieben. Chart-Settled-Gate (AP-08b3, GELB): `measurement.visible` bewies nicht Animationsende — neuer `chartSettled`-Contract auf Chart.js-nativem `animation.onComplete`. Architektur-Gate (AP-08b4a): BEHALTEN/HÄRTEN/ERSETZEN/ZURÜCKBAUEN-Klassifizierung aller Fixes gegen 4 harte Kriterien vor weiterem Patch (Sunk-Cost-Vermeidung auf Alberts Anweisung); zweiter ungegateter Render-Zyklus gefunden und behoben (`renderJourneyChartOnly()`/`renderJourneyCardOnly()`-Trennung). RenderMotion (AP-08b5, GELB): `renderMotion.mode='instant'` entfernt Chart.js-Default-Tweening aus Screen-2-Journey, ausschließlich in `ChartEngine._draw()`. Harte Abschluss-QA (AP-08c, GELB): „Dateien sind Wahrheit"-Prinzip — alle Claims gegen reale Diffs verifiziert, neue Lücke gefunden (`chartSettled`-Creation-Pfad ohne synchronen Fallback, aktuell folgenlos), Albert bestätigte Reduced Motion manuell S/M/L. Zwei offene Folgepunkte (No-op-Bootstrap-Entscheidung, chartSettled-Creation-Lücke) als neue BACKLOG-Punkte registriert. Ergebnisprotokolle: `docs/steering/patches/AP-prokrast-08a_*_Ergebnis.md`, `..._08b_*_Ergebnis.md`, `..._08b2_llm-review-kontext.md`, `..._08b3_*_Ergebnis.md`, `..._08b4a_*_Ergebnis.md`, `..._08b5_*_Ergebnis.md`, `..._08c_*_Ergebnis.md`. Nächster Schritt: Commit-Freigabe durch Albert; danach Masterfaden-Entscheidung über die beiden offenen Folgepunkte, dann Wahl zwischen Screen-3-Timing-Reveal oder DS-012/DS-013 (Theme-Bridge-Fonts).
> AP-prokrast-09a–09d 🟡 2026-07-06 — Engine-Contract-Härtung nach AP-08 (zwei AP-08-Folgepflichten: No-op-Bootstrap/AnchorMeasurement, chartSettled-Creation-Pfad), teilweise abgenommen, unabhängig geprüft, Rücklauf an Masterfaden freigegeben. Analyse (AP-09a, GELB): beide Folgepflichten getrennt gegen reale Dateien geprüft — `chartSettled`-Creation-Pfad als kleiner, spec-konformer `ChartEngine.js`-only-Fix eingestuft; No-op-Bootstrap/AnchorMeasurement als spec-widersprüchlich erkannt (ein unconditional Plugin-Push widerspricht dem in `CHART_PLUGIN_ARCHITEKTUR.md` §4 dokumentierten Muster „ChartEngine ergänzt ... nur bei passender Runtime-Option", bräuchte begleitende Spec-Textänderung statt kleinem Codefix). Härtung (AP-09b, GELB): `ChartEngine.js`-Creation-Zweig reicht `_emitChartSettled()` jetzt synchron nach bei `instantCreate && chartSettled.enabled` (16 Zeilen Diff, gespiegelt vom Update-Zweig-Muster, kein Doppel-Emit-Risiko, keine neue API); No-op-Bootstrap bewusst nicht angefasst. Unabhängige Abschluss-QA (AP-09c, GELB): alle Claims gegen reale Dateien bestätigt, Scope-/Architektur-/Regressions-QA bestanden, keine Blocker, Rücklauf freigegeben; neuer Creation-Zweig im aktuellen App-Code nicht browserseitig ansteuerbar — kein künstlicher Test-Hack, späterer Test erst beim ersten echten App-Fall. Rücklaufkapsel (AP-09d, GELB): AP-09 als „teilweise abgenommen" verdichtet — chartSettled-Folgepflicht geschlossen, No-op-Bootstrap-Folgepflicht als offene Zwei-Optionen-Masterentscheidung zurückgegeben (A: eigener Engine+Spec-AP mit Full-Gate / B: No-op-Bootstrap offiziell als Contract-Bestandteil dokumentieren). Über die gesamte Kette ausschließlich `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` geändert (nur Creation-Zweig von `_draw()`), kein `app.js`/Plugin-/Strategy-/Spec-/Daten-Diff. Ergebnisprotokolle: `docs/steering/patches/AP-prokrast-09a_*_Ergebnis.md` bis `AP-prokrast-09d_*_Ergebnis.md`. Nächster Schritt: Commit-Freigabe durch Albert; danach Masterfaden-Entscheidung No-op-Bootstrap (A/B) oder Rückkehr zu Screen-3-Timing-Reveal/DS-012/DS-013.
> AP-prokrast-10a–10d ✅ 2026-07-07 — Screen-3-Reveal beim Übergang von Screen 2 („Ergebnis ansehen"): Ist-/Sollanalyse, einmal grundlegend umgesteuert, gebaut, unabhängig geprüft, Rücklauf an Masterfaden. Ist-/Sollanalyse (AP-10a, GELB): Screen 3 hatte keinerlei Timing-Reveal (Text/Chart/KPI synchron); Drehbuch/APP_SPEC §16 fordern seit AP-14 einen gestuften Reveal, der nie gebaut wurde; verbindlicher Text bereits exakt im Code. Implementierung (AP-10b) wurde während der Session umgesteuert: erster Zuschnitt „Text→Chart→KPI-Timing-Reveal" (alles innerhalb Screen 3 gestuft) technisch fertig, aber laut Albert psychologisch falsch („verschwindet aktuell zu viel", wirkt wie Screen-Neustart) — ein architekturrelevanter Fork (die genannte „Stationszeile" ist real ein Screen-2-Element, `progressEl`) wurde vor der Entscheidung explizit über eine neutrale LLM-Review-Kontext-Datei an Albert zurückgegeben. Finaler Zuschnitt „Variante B++ — Kontinuitäts-Reveal" (GRÜN): `showScreen(3, true)` bleibt der technische Übergang, aber Chart+Ergebnislinie (`verticalLine:'last'`, bestehender Plugin-Pfad, `renderMotion:{mode:'instant'}`) erscheinen sofort/still, ein neues Screen-3-lokales Bridge-Element (`bridgeS3`, Formel `formatStationProgress()` aus `progressEl`-Berechnung extrahiert, keine Verschiebung) zeigt zunächst dieselbe Zeile wie zuletzt auf Screen 2, danach KPI-Karten+Disclaimer per 800ms-Fade. Ergebnislinie technisch nicht animierbar (`ChartEngine._draw()` liest `.plugins` nur beim allerersten `new Chart()`-Aufruf, `FwVerticalLinePlugin` zeichnet rein statisch) — mit Albert besprochen, Entscheidung „so lassen". Unabhängige Abschluss-QA (AP-10c, GELB): Kontinuitäts-Reveal code-seitig vollständig bestätigt, keine Engine-/Plugin-/Spec-/QA-/Daten-Diffs, Screen 1/2/4 + AP-07/08/09 statisch nicht regressiert; GELB wegen zwei nicht-blockierenden Punkten (verworfenes AP-10b-Protokoll behauptete weiterhin GRÜN für nicht mehr existierenden Code; Reduced-Motion-/S-M-L-Browser-QA offen). Warnheader + Rücklaufkapsel (AP-10d, GRÜN): altes AP-10b-Protokoll mit `[!WARNING]`-Forensik-Header versehen (nicht gelöscht), Albert bestätigte S/M/L + Reduced Motion nach AP-10c browserseitig als ok — beide GELB-Punkte aufgelöst. Über die gesamte Kette ausschließlich `app.js`/`app.css` geändert, kein Engine-/Plugin-/Strategy-/Spec-/Drehbuch-/QA_TEST_CASES-/Stationsdaten-Diff. Ergebnisprotokolle: `docs/steering/patches/AP-prokrast-10a_*_Ergebnis.md` bis `AP-prokrast-10d_*_Ergebnis.md` (plus `..._10b_screen3-timing-reveal_..._Ergebnis.md` als forensisches, mit Warnheader versehenes Artefakt und `..._10b_screen2-screen3-kontinuitaet_llm-review-kontext.md` als Architektur-Fork-Kontext). Nächster Schritt: Commit-Umfang durch Masterfaden entscheiden (s. Rücklaufkapsel „Dateien/Commit-Hinweis"); danach nächsten Haupt-AP planen — offene Kandidaten weiterhin AP-prokrast-08-FOLLOWUP-A (No-op-Bootstrap) und DS-012/DS-013 (Theme-Bridge-Fonts).
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
| Steuerungsblock-Inventar AP-04 | `docs/App-Fabrik/APP_STEUERUNGSBLOCK_INVENTORY.md` | Scan-Inventar 25 App-Ordner: 0 GRÜN, 24 GELB (Mini-Spec mit Kernbotschaft/Problem), 1 ROT (plan-generator — kein steuerungsblock-ähnliches Material). Kein einziger expliziter Steuerungsblock in keiner APP_SPEC. Ergebnisprotokoll: `docs/steering/patches/AP-04_app-steuerungsblock-inventar_Ergebnis.md`. (AP-04 ✅ 2026-06-26) |
| Steuerungsblock-Rollout-Plan AP-05 | `docs/App-Fabrik/APP_STEUERUNGSBLOCK_ROLLOUT_PLAN.md` | Priorisierung für Einbau lokaler Steuerungsblöcke: AP-08 Muster-Einbau prokrastinations-preis, AP-09 Muster-Review, AP-10 Batch A (14 Apps: Kernbotschaft+Problem), AP-11 Batch B (8 Apps: nur Kernbotschaft), AP-12 Sonderfall etf-vergleich, AP-13 ROT plan-generator (gesperrt). Ergebnisprotokoll: `docs/steering/patches/AP-05_app-steuerungsblock-rollout-plan_Ergebnis.md`. (AP-05 ✅ 2026-06-26) |
| Steuerungsblock-Muster-Einbau AP-08 / AP-10b/c/d | `docs/steering/patches/AP-10_mechanischer-einbau-prokrastinations-preis-aus-seed_Ergebnis.md` | `Apps/prokrastinations-preis/APP_SPEC.md`: erster lokaler Steuerungsblock mechanisch aus Seed eingebaut — Muster-Entwurf (AP-08), Tool-Nachputz remove_seed_only_metadata + UTF-8 (AP-10b/c), Nordstern-Begriff bereinigt (AP-10d). Tool: `tools/app_fabrik/insert_steuerungsblock_from_seed.py`. (AP-08 ✅ 2026-06-26, AP-10b/c/d ✅ 2026-06-26) |
| Template-Sync AP-11/11a/11b | `docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md` | Nordstern als lokaler Begriff entfernt; echter 4-Kriterien-LLM-Prüfscore im §5-Block und §7 verankert; §12 Seed-Metadaten-Regel neu; `tech-spec-app` SKILL.md Begriff synchronisiert. Ergebnisprotokoll: `docs/steering/patches/AP-11b_score-block-korrektur_Ergebnis.md`. (AP-11b ✅ 2026-06-29) |
| MINI_SPEC Steuerungsblock-Rollout AP-12a/b/c | `docs/steering/patches/AP-12c_minispec-steuerungsblock-rollout_Ergebnis.md` | Ankerinventar (AP-12a), Python-Tool `insert_steuerungsblock_into_minispec_from_seed.py` (AP-12b), Batch-A-Write (AP-12c): 7 `MINI_SPEC_FROM_HAUPTDOKUMENT.md` angereichert — risiko-uebersetzer, crash-reaktions-test, markt-kam-zurueck, market-timing-simulator, geburtsjahrlos, der-alte-euro, depot-kipppunkt. Je ein vollständiger Steuerungsblock inkl. 4-Kriterien-LLM-Prüfscore. (AP-12a/b/c ✅ 2026-06-29) |
| MINI_SPEC Steuerungsblock-QA/Abschluss AP-12d/d-addendum | `docs/steering/patches/AP-12d-addendum_gelb-entscheidung-aufloesen_Ergebnis.md` | QA (AP-12d): Commit a434231 retrospektiv geprüft — 7/7 Slugs GRÜN, 430 Einfügungen, APP_SPEC unberührt, Trailing-Whitespace (Markdown-Soft-Breaks) und TAKTISCHER_STARTPROMPT-Commit-Scope dokumentiert. Addendum (AP-12d-addendum): GELB durch Nutzerentscheidung aufgelöst — akzeptierte Konvention, kein Fix. AP-12 gesamt: GRÜN. (AP-12d/d-addendum ✅ 2026-06-29) |
| MINI_SPEC Steuerungsblock-Nachführung AP-15a/b/c (Pilot-Sonderfall prokrastinations-preis) | `docs/steering/patches/AP-15c_prokrastinations-preis_review-commit-vorbereitung_Ergebnis.md` | Pilot-Inventar+Abgleich-Diagnose (AP-15a): MINI_SPEC historisch ohne Block, APP_SPEC V2.9 mit Block identisch zu Seed, Seed-Status veraltet. MINI_SPEC-Nachführung (AP-15b): Steuerungsblock via Standard-Tool 1/1 GRÜN, V2.5→V2.9 (6 Stellen), Seed-Verteilungsstatus nachgeführt, APP_SPEC unberührt. Review+Commit-Vorbereitung (AP-15c): 21/21 Stichproben GRÜN, deprecated Screen-4-Text bewusst erhalten, Commit-Kandidatenliste bereit. (AP-15a/b/c ✅ 2026-06-30) |
| MINI_SPEC Steuerungsblock-Rollout AP-13a/b/c/d/e (Batch B) | `docs/steering/patches/AP-13e_batch-b-review-commit-vorbereitung_Ergebnis.md` | Inventar 25 Apps (AP-13a), Batch-Schnitt 7 Kandidaten + Sonderpfade AP-14a/AP-15a (AP-13b), Ankerinventar+Dry-run (AP-13c), Batch-B-Write+QA 7/7 GRÜN 420 Einfügungen (AP-13d), Review+Commit-Vorbereitung (AP-13e): diversifikations-detektor, esg-spiegel, etf-namensdecoder, komplexitaets-entlarver, kostenkiller-ter, rendite-kalibrierung, renditekiller-volatilitaet. (AP-13a/b/c/d/e ✅ 2026-06-29) |
| Drift-Schutz-Inventar AP-14a (Sonderfall regulatorik-dashboard/etf-wahlurnen-rechner) | `docs/steering/patches/AP-14a_regulatorik-dashboard_drift-schutz-inventar-materialdiagnose_Ergebnis.md` | Vollständiges Materialinventar: Ordner enthielt zwei Projekte (regulatorik-dashboard Prototyp + etf-wahlurnen-rechner mit 12 Dateien inkl. Abschlussdoku, 3 Bauprompts, 4 UX-Reviews, CLAUDE.md). Drift-Diagnose: CLAUDE.md falsche Projektidentität, Seed REKONSTRUIERT/ZU PRÜFEN ohne LLM-Prüfscore. Alberts Entscheidungen: Ordner → etf-wahlurnen-rechner, regulatorik-dashboard als Unterordner, CLAUDE.md auflösen, Seed REKONSTRUIERT bleibt bis späterem APP_SPEC-AP. (AP-14a ✅ 2026-06-30) |
| regulatorik-dashboard Ordner-Bereinigung AP-14b/c/d/e | `docs/steering/patches/AP-14e_regulatorik-dashboard_ordner-bereinigung-commit-vorbereitung_Ergebnis.md` | Datei-Triage + Neusortierungsplan (AP-14b). Wissenssicherung: CLAUDE.md-Inhalt → APP_FABRIK_ANAMNESE_MATERIAL.md + DEV_QA_NOTIZEN.md (AP-14c). Altmaterial-Verschiebung: 8× git mv + CLAUDE.md-Entschärfung durch Umbenennung (AP-14d). Struktur-Review + Commit-Vorbereitung (AP-14e). (AP-14b/c/d/e ✅ 2026-06-30) |
| regulatorik-dashboard Identitätsanamnese + Seed AP-14f/g/g-review | `docs/steering/patches/AP-14g-review_regulatorik-dashboard_seed-review-commit-vorbereitung_Ergebnis.md` | Identitätsanamnese aus 6 Pflichtquellen (AP-14f): Abgabenpolitik als Identität, ETF-Wahlurne als Mechanik/Metapher abgegrenzt, 8 LLM-Prüffragen formuliert. Seed-Block Zeilen 885–959 überarbeitet (AP-14g): Tonalitätsregeln, Nicht-Ziele, Framing-Regeln final. Seed-Review GRÜN: GESICHERT, Drift-Schutz 8/8, Marker 14/15, Commit-Vorbereitung (AP-14g-review). (AP-14f/g/g-review ✅ 2026-06-30) |
| regulatorik-dashboard MINI_SPEC-Neufassung AP-14h/i | `docs/steering/patches/AP-14i_regulatorik-dashboard_minispec-review-app-fabrik-readiness-commit-vorbereitung_Ergebnis.md` | MINI_SPEC vollständig aus Seed neu gefasst: Abgabenpolitik als Identität, ETF-Wahlurne als Mechanik/Metapher, S0–S3 mit Referenzzahlen und Modellgrenzen, Steuerungsblock + 8 LLM-Prüffragen + Score 16/16 (AP-14h). Unabhängige Review: Altlasten 0/11, Drift 8/8 GRÜN, LLM-Score 16/16, Commit-Vorbereitung bereit (AP-14i). (AP-14h/i ✅ 2026-07-01) |
| MINI_SPEC Steuerungsblock-Rollout Statusabgleich AP-16 | `docs/steering/patches/AP-16_steuerungsblock-rollout_statusabgleich-restliste_Ergebnis.md` | Restbestand deterministisch geprüft: historische Inventur AP-13a/AP-13b gegen alle 25 realen MINI_SPECs verifiziert (100% Übereinstimmung). 16 Apps erledigt (Batch A/B + 2 Sonderfälle), 4 offene Standard-Kandidaten für Batch C, 5 unklare Sonderfälle/Companion-Module. Batch-C-Vorschlag: etf-aera-vorbei, replizierer-swapper, thesaurierer-rennen, weltdepot-baukasten. (AP-16 ✅ 2026-07-01) |
| MINI_SPEC Steuerungsblock-Rollout Batch C AP-17 | `docs/steering/patches/AP-17_steuerungsblock-rollout_batch-c_Ergebnis.md` | Bestehendes Batch-A/B-Tool `insert_steuerungsblock_into_minispec_from_seed.py` direkt genutzt: Dry-run 4/4 GRÜN, Write 4/4 GRÜN — etf-aera-vorbei, replizierer-swapper, thesaurierer-rennen, weltdepot-baukasten. Marker-QA + Scope-QA bestanden, Seed-Datei unverändert, 5 unklare Apps nicht berührt. (AP-17 ✅ 2026-07-01) |
| Unabhängiger Review Steuerungsblock-Rollout Batch C AP-18 | `docs/steering/patches/AP-18_review_steuerungsblock-rollout_batch-c_Ergebnis.md` | Unabhängige Prüfung ohne Übernahme der AP-17-Selbstauskunft: Marker-QA neu berechnet, Seed-Zeilen-Abgleich (19/19 Seed-Zeilen + 18/18 LLM-Prüfscore-Zeilen je App wortgleich gefunden), Scope-QA — alle 4 Apps GRÜN, keine Abweichung von AP-17s Bewertung. (AP-18 ✅ 2026-07-01) |
| Steuerungsblock-Rollout Sonderbatch D AP-20/AP-20b/AP-21 | `docs/steering/patches/AP-21_review_sonderbatch-d-ohne-plan-generator_seed-provenienz_Ergebnis.md` | AP-20: Dry-run der 5 unklaren Sonder-/Companion-Apps deckte auf, dass `plan-generator` im Seed GESPERRT ist (Kernfelder nur `[Klärungsbedarf]`-Platzhalter) — kein Write, keine Teilübertragung (GELB). AP-20b: nach Nutzerentscheidung 4 verteilungsreife Apps separat geschrieben — Steuerungsblock + neuer APP_SPEC-Stoppwarnhinweis (`## Warnhinweis für spätere APP_SPEC-Erstellung`) in etf-vergleich, investment-universum, rollierende-sparplaene, weltkarte-etf-indizes (GRÜN). AP-21: unabhängiger harter Seed-Provenienz-Abgleich, bidirektional (Seed→Ziel und Ziel→Seed), 0 Abweichungen, 0 blockfremde Zeilen — GRÜN. `plan-generator` unverändert, Seed-Datei unverändert. Restklärung: AF-24 (nur noch plan-generator), später AP-22. (AP-20 ✅ AP-20b ✅ AP-21 ✅ 2026-07-01) |
| plan-generator Sonderfall-Kette AP-22–25a (Steuerungsblock-Rollout abgeschlossen) | `docs/steering/patches/AP-25a_finalaudit_minispecs_gegen_seed_mit_sonderfaellen_Ergebnis.md` | AP-22: Rolle von `plan-generator` geklärt (H1 / Funnel-Finale / Abschlussmodul, 5 unabhängige Quellen), Sperre lag am riskanten Output-Rohentwurf, nicht an der Rolle. AP-23: Seed-Neufassung + Steuerungsblock + Entscheidungsblock „Wie konkret darf der finale Plan werden?" (6 Punkte, LLM-STOP-Regel) — dabei fälschlich die zentrale Seed-Datei verändert (Read-only-Verstoß). AP-23a: Korrektur — Seed-Datei per `git checkout` zurückgesetzt, MINI_SPEC-Provenienz auf AP-22/AP-23-Kontext/AP-23a umgestellt, keine Seed-Provenienz-Behauptung mehr. AP-24: unabhängiger Review, GELB nur wegen fehlender expliziter „Sonderfall"-Kennzeichnung. AP-24a: Mini-Fix, Sonderfall-Wort ergänzt. AP-25/AP-25a: mechanischer Finalaudit aller 25 MINI_SPECs gegen Seed — 23/23 Standard-Apps GRÜN, `plan-generator` als Sonderfall ohne Seed-Provenienz GRÜN, `regulatorik-dashboard` als zweiter, in AP-14h/AP-14i bereits unabhängig geprüfter Sonderfall (eigenes 8-Fragen-Format statt mechanischem Standard) GRÜN. Steuerungsblock-Rollout damit für alle 25 Apps abgeschlossen. (AP-22 ✅ AP-23 ✅ AP-23a ✅ AP-24 ✅ AP-24a ✅ AP-25 ✅ AP-25a ✅ 2026-07-01) |

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
