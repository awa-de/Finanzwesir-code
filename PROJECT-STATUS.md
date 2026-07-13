<!-- HOOK-META
Version: 1
Stand: 2026-07-13
Fokus-AP: AP-tailwind-02 Slice 1+2 ✅ — Shell/States + KPI auf Tailwind-Baukasten migriert (02c/02d/02e inkl.), Browser-Abnahme bestätigt, kein Commit (2026-07-13)
Nächster-Schritt: AP-tailwind-02 Slice 3 — weitere Baukasten-Primitiven, Detail-Prompt offen (AP-tailwind-02 Slice 2 ✅ 2026-07-13)
Blocker: keine
Letzter-Distill: 2026-07-13
Kassensturz-Datum: 2026-07-13
-->
<!-- HOOK-META-SESSION: AP-tailwind-02 Slice 1+2 -->

# PROJECT STATUS — Finanzwesir 2.0

Stand: 2026-07-13 | Session: AP-tailwind-02 Slice 1+2 | Geändert von: Claude

**Zweck:** Schneller Wiedereinstieg nach Pausen.
**Zielgruppe:** Albert und Claude.
**Wann lesen:** Immer zu Session-Beginn, besonders nach längerer Pause.
**Wann aktualisieren:** Nach längeren Sessions, Meilensteinen oder geändertem Projektfokus.
**Gehört hier hinein:** Aktueller Fokus, stabiler Stand, nächster Schritt, Blocker.
**Gehört nicht hier hinein:** Detailbugs, vollständige Specs, lange Diskussionen.

---

## 1. Aktueller Fokus

**Nächster Schritt:** AP-tailwind-02 Slice 3 — weitere Baukasten-Primitiven der Pilotmigration `prokrastinations-preis` (Screen-Flow/Buttons/Stationen o. ä., Detail-Prompt offen). Details: HOOK-META oben + docs/steering/BACKLOG.md.

Letzte Meilensteine (je eine Zeile — Volltext in BACKLOG-ARCHIV.md):
- **AP-tailwind-02 Slice 1+2** (2026-07-13) ✅ Shell/States + KPI auf Tailwind-Baukasten migriert (02c Taxonomie, 02d Runtime-Manifest, 02e Theme-Bridge); Browser-Abnahme inkl. Reduced Motion vollständig bestätigt
- **AP-tailwind-02a/02b** (2026-07-13) ✅ Play-CDN-Vertrag (Tailwind v4) repo-weit synchronisiert + gehärtet; Checker bytegenau, Boards/Decision-Log/Backlog konsistent
- **Ritual-Housekeeping** (2026-07-13) ✅ Montag-Check auf einen Vorab-Block konsolidiert (3 Kopien entfernt), Kassensturz KW29, Distill 11 (8 promoted, 1 retired)
- **RITUAL-OPT-2** (2026-07-12) ✅ Ritual + Start vollständig read-frei: NAVIGATION/BACKLOG-Flip/Remove, Hook übernimmt BACKLOG-Extraktion, BACKLOG-ARCHIV datumsbasiert rotiert (219→12 Zeilen), DECISION-LOG-Tool
- **RITUAL-OPT-1** (2026-07-12) ✅ Abschluss-Ritual tokensparend umgebaut: HOOK-META-Riegel, PROJECT-STATUS -82 %, read-freie Log-Appends, Log-Rotation

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
