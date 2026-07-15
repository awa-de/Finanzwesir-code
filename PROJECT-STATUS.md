<!-- HOOK-META
Version: 1
Stand: 2026-07-15
Fokus-AP: AP-chart-engine-01 CE-5d ✅ Legend-Pill-Basisoptik — CE-5 bis CE-5d + DOC-02 bis DOC-04a browserabgenommen, noch nicht committed (2026-07-15)
Nächster-Schritt: CE-6 — Cross-Type-Abschluss (AP-chart-engine-01 CE-5d ✅ 2026-07-15)
Blocker: keine
Letzter-Distill: 2026-07-13
Kassensturz-Datum: 2026-07-13
-->
<!-- HOOK-META-SESSION: AP-chart-engine-01 CE-5d Vollabschluss -->

# PROJECT STATUS — Finanzwesir 2.0

Stand: 2026-07-15 | Session: AP-chart-engine-01 CE-5d Vollabschluss | Geändert von: Claude

**Zweck:** Schneller Wiedereinstieg nach Pausen.
**Zielgruppe:** Albert und Claude.
**Wann lesen:** Immer zu Session-Beginn, besonders nach längerer Pause.
**Wann aktualisieren:** Nach längeren Sessions, Meilensteinen oder geändertem Projektfokus.
**Gehört hier hinein:** Aktueller Fokus, stabiler Stand, nächster Schritt, Blocker.
**Gehört nicht hier hinein:** Detailbugs, vollständige Specs, lange Diskussionen.

---

## 1. Aktueller Fokus

**Nächster Schritt:** CE-6 — Cross-Type-Abschluss (Engine-DOM-Chrome-Programm AP-chart-engine-01, Prompt liegt vor in `Archiv/local/muss noch eingeordnet werden/`, noch nicht begonnen, kein automatischer Start, nur nach Alberts explizitem Auftrag). CE-1 bis CE-4c + DOC-01/DOC-02/DOC-02a sind abgeschlossen, von Albert browserabgenommen und **bereits committed** (`20bb90c`, `9dd899d`, `76d7080`, `6470c71`). CE-5-Preflight bis CE-5d + DOC-03/DOC-04/DOC-04a (Donut/Pie-Segment-Dämpfung als vierte Legend-Bedeutung, gemeinsame Legend-Pill-Basisoptik für Line/Bar/Pie, gemeinsamer `focus-visible`-Fallback) sind abgeschlossen und vollständig browserabgenommen, **noch nicht committed** (2026-07-15). Offene Restarbeit ohne Regressionsrisiko: Pie-Wrapper/-Titel noch nicht auf `FW_CHROME_WRAPPER/TITLE_CLASS` migriert — Entscheidung ob Teil von CE-6. Details: docs/steering/BACKLOG.md (Eintrag „AP-chart-engine-01").

Letzte Meilensteine (je eine Zeile — Volltext in BACKLOG-ARCHIV.md):
- **AP-chart-engine-01 CE-5-Preflight bis CE-5d + DOC-02 bis DOC-04a** (2026-07-15) ✅ Donut/Pie-Chart-Chrome mit Segment-Dämpfung: vierte Legend-Bedeutung „Segment-Dämpfung umschalten" (DOC-03) als echtes A11y-Primitiv umgesetzt, Fokusring-Iteration auf gemeinsamen Petrol-500-`focus-visible`-Fallback konsolidiert (CE-5a–c), Produktentscheidung „gemeinsame Legend-Pill-Basisoptik" (DOC-04) umgesetzt (CE-5d); alle Schritte real browserverifiziert (Sicht + `engine-dom-check.js` 9/9 + neues `pie-segment-damping-interaction-check.js` 51/51 PASS); noch nicht committed
- **AP-chart-engine-01 CE-4/CE-4c** (2026-07-15) ✅ Bar-Chart-Chrome (CE-4) + Reparatur gemeinsamer Chrome-Kern `FW_CHROME_*` statt dupliziertem `FW_BAR_*` (CE-4c, behebt CE-4a-Verstoß); Line/Bar/Donut vollständig browserabgenommen; committed (76d7080)
- **AP-chart-engine-01 DOC-02/DOC-02a** (2026-07-15) ✅ Semantischer Chrome-Auftrag (KDR 15, Strategie=Was/Renderer=Wie) + Widerspruchskorrektur in Baukasten §10; reine Dokumentation, committed (6470c71)
- **AP-chart-engine-01 DOC-01** (2026-07-14) ✅ Line-Chart-Chrome-Vertragsnachzug: Baukasten-Konzept (Legend-Pill-Kontur, App-Fabrik-Verbindlichkeit), Mockup und Test-Page-Standard auf abgenommenen CE-3b-Ist-Stand nachgezogen; reine Dokumentation, committed (9dd899d)
- **AP-chart-engine-01 (CE-1–CE-3b) + AP-chart-engine-tool-01** (2026-07-14) ✅ Engine-DOM-Chrome-Programm gestartet: Read-only-Inventur (F-05/F-06), Token-Fallback-Architektur (F-07) statt reinem Tailwind-Tausch, Line-Chart-Chrome auf Baukasten migriert; neues Diagnosewerkzeug engine-dom-check.js; committed (20bb90c)

---

## 2. Letzter stabiler Stand

- CLAUDE.md v2.0.1 stabil (2026-05-08): Selftest-Iteration 2 schloss 3 Lücken — PROTECTED_PATHS
  in Lastabwurf-Gruppe 1, MODUS-A-Fallback bei fehlender Schutzdatei, Subagenten-Rekursionsverbot.
- CLAUDE.md v2.0 Neubau abgeschlossen (2026-05-08): 6 Phasen. Grundmodell, Invarianten,
  Freigabeprinzip neu. §11 entfernt, semantische Namen, /pre-code-gate + /intake + /subagent-dispatch neu.
- Selbstlernendes System implementiert (2026-05-08): 8 Schritte, alle von Albert bestätigt.
  session-log, patterns, /distill, /uebergabe, Lastabwurf-System. Pilot-Test: nächster Faden.
- Kontroll-Rückkopplungs-System implementiert (2026-05-04): 4 neue Skills + 3 Upgrades aktiv.
  QA-Review (check-mode-gatekeeper) abgeschlossen.
- Git-Migration abgeschlossen (2026-05-04): Programmier-Git an Root, GitHub verbunden.
  - Branch: `master`, Remote: `git@github.com:awa-de/Finanzwesir-code.git`
  - Sauber: keine PDFs, keine Dev-Daten (Theme/data, chart-tests) in History
  - git config: `core.sshCommand = C:/Windows/System32/OpenSSH/ssh.exe`
- CL-01 + CL-02 abgeschlossen. CL-03 (Vermächtnis überführen) jetzt ungeblockt.
- Design-System-Analyse abgeschlossen (2026-05-03): Architektur klar, Lücken identifiziert.
- Chart-Engine: stabil, offene APs in BACKLOG.md (AP-20/21 🟡 Aktiv, AP-6c 🟡 Aktiv).
- Ghost-Theme: in Entwicklung, noch kein Deploy.

---

## 3. Nächster sinnvoller Schritt

→ Der aktuelle nächste Schritt steht maschinenlesbar in HOOK-META `Nächster-Schritt` (oben); offene Punkte in `docs/steering/BACKLOG.md`.

---

## 4. Aktive Baustellen

| Bereich | Status | Nächster Schritt |
|---------|--------|------------------|
| Projekt-Gehirn | Masterplan komplett ✅ | APs wählen |
| Chart-Engine | Stabil, offene APs | Siehe `docs/steering/BACKLOG.md` |
| Theme | In Entwicklung | `THEME-ASSEMBLY-CHECKLIST.md` |
| CSS | Stabil | Siehe `docs/steering/BACKLOG.md` (CSS-N Items) |
| Apps | Slice 6 ✅, AP-UX-01 ✅, B1-AP-01 bis B1-AP-17c ✅ 2026-06-24 | B1-AP-18 — nächster Implementierungs-AP |
| Content | Laufend | Redaktionsleitfaden aktiv |
| Security | SECURITY-BASELINE.md App-Fabrik-gatefähig ✅ | Security-Sync-Regel + Gate-Prüffrage verankert (ST-13/ST-14) |

---

## 5. Blocker

**Kein akuter Blocker.** B1-AP-14b3 ✅ abgeschlossen 2026-06-18.

---

## 6. Nicht anfassen

- `Active Campaign Liste/` — Datenschutz, niemals in Git
- `Theme/.git/` — Deployment-Git, nicht umkonfigurieren
- Layer 1: `FinanzwesirData.js`, `CSVParser.js` — TABU, niemals ändern (forbidden in PROTECTED_PATHS.json)
- `FwDateUtils.js` — zentrale Zeit-Erkennung, nur mit expliziter Begründung

Vollständige Liste: `.claude/PROTECTED_PATHS.json`

---

## 7. Offene Architekturentscheidungen

Vollständig im DECISION-LOG dokumentiert (`docs/steering/DECISION-LOG.md`):

- D-OPEN-1: Versionierung des Projekt-Gehirns (separates Git für `docs/` + `.claude/`?)
- D-OPEN-2: Backend — kein Backend ohne explizite Architekturentscheidung
- D-OPEN-3: Multi-CLAUDE.md für Apps → erst wenn App-Entwicklung ernsthaft beginnt
- D-OPEN-4: Blueprint-Extraktion → Begriff noch nicht definiert

---

## 8. Letzte Session

2026-06-26 — AP-07c + AP-07d Steuerungsblock-Workflow-Kette abgeschlossen ✅.
AP-07c: `04_CLAUDE_WORKFLOW_DRAFT.md` Phase 2 — Schritt 2.0 Pflichtschritt Steuerungsblock eingefügt; `app-spec-create` als koordinierendes Werkzeug; `spec-mode-architecture` nur ergänzend. AP-07d: 4 Konsistenz-Korrekturen (Betriebssystem-Abschnitt, APP_SPEC-Mindestliste, Skills-Tabelle, Nächster-Schritt-Abschnitt). Nächster Schritt: AP-04 — Inventar Steuerungsblöcke über alle Apps.

---

## 9. Einstieg für nächste Session

**Nächster Schritt: B1-AP-14b — Engine-Umbau Progressive Domain LineChart**

**Status: Engine-Freigabe benötigt.** Alberts explizite Freigabe für `ChartEngine.js`, `LineChartStrategy.js`, `FwSmartXAxis.js` nötig, bevor Code geändert wird.

**Was für B1-AP-14b zu tun ist:**
- `xDisplayRange: { min, max }` in ChartEngine.js als neues Top-Level-Option entgegennehmen + an Strategie weiterleiten
- `fwContext.displayRange` in LineChartStrategy.js befüllen
- `FwSmartXAxis.js`: `displayRange?.max ?? dataRange.max` als endLimit nutzen
- `yRangePolicy: 'cumulative-expand-zero'` implementieren (yMin=0, yMax nur nach oben expandierend)

**Verbindliche Architektur (B1-AP-14a2 ✅ 2026-06-18):**
- `ENTSCHEIDUNGSPROTOKOLL.md §12+§13` — Achsenvertrag, API-Zielbild, Verbotsliste (12 Items), AP-14c-Marker-Zielbild
- `APP_SPEC.md V2.7 §16.1` — AP-14b und AP-14c inline dokumentiert
- `QA_TEST_CASES.md V1.4 Gruppe M` — TC-M01–TC-M12 (xDisplayRange-Regression, Y-Achse, Fake-Daten, Post-Render-Hacks, Marker-Y Snapshot-Snap, keine Interaktion)

**Was ✅ erledigt ist:**
- `app.js`: progressEl-Orientierungslogik + `buildVisibleChartSeries` + A11y-Sperre
- `app.css`: `.fw-app__journey-progress` Styling
- `docs/steering/PEER-REVIEW-B1-AP-14b-XAxis-Architecture.md` — Architekturplan
- `docs/steering/RETTUNGSBEFUND-B1-AP-14r.md` — vollständiger Rettungsbefund
- B1-AP-14a2 ✅ — Doku-Neuschnitt komplett (4 führende Dokumente aktualisiert)

Operative Quellen:
- `Apps/prokrastinations-preis/APP_SPEC.md` — V2.7 ✅ (B1-AP-14a2: Progressive Domain LineChart + AP-14c-Marker-Zielbild, 2026-06-18)
- `Apps/prokrastinations-preis/ENTSCHEIDUNGSPROTOKOLL.md` — §12+§13 AP-14b/AP-14c ✅ (2026-06-18)
- `Apps/prokrastinations-preis/QA_TEST_CASES.md` — V1.4 ✅ (Gruppe M TC-M01–M12, 2026-06-18)
- `Apps/prokrastinations-preis/REDAKTIONS_GATE.md` — V1.3 ✅ (G-C04 erweitert, 2026-06-18)
- `Apps/prokrastinations-preis/config/stations.de.json` — produktive Stationen-Konfiguration v2.1 (B1-AP-09 ✅ 2026-06-17)
- `Apps/prokrastinations-preis/STATIONS_IMPLEMENTATION_PLAN.md` — Implementierungsplan Coding-Slices AP-11–AP-18 (B1-AP-10 ✅ 2026-06-17)
- `Apps/prokrastinations-preis/STATIONS_CONFIG_CONTRACT.md` — Stations-JSON-Vertrag B1-AP-03 ✅

Entschieden (nicht mehr offen):
- E-01/E-02/B-01/B-02/B-03 ✅: Zeitreise-App, Anteilslogik, CSV, Button-getrieben
- OA-02 ✅: `renderFromData()` = offizieller zweiter Engine-Einstieg (Pfad 2, 2026-06-10)
- AP-UX-01 ✅: Stationen-Zeitreise (3 Akte, Screen 2 = ohne Endwissen, Screen 3 = erster Reveal)
- `config.features` = neutrale Fähigkeitswahl (kein `isAppChart`, kein `noRangeButtons`)
- AP-14b Architektur ✅: dataRange/displayRange-Trennung, `xDisplayRange` als Top-Level-Option, `yRangePolicy: cumulative-expand-zero`
- AP-14c Zielbild ✅: Journey-Stations als Marker-Quelle, Snapshot-Snap, kein events.json, offene Ringe, keine Interaktion

**Parallel weiter offen:**
- AP-20/21 (Mixed-Rhythm CV-Heuristik) — Chart-Engine
