<!-- HOOK-META
Version: 1
Stand: 2026-07-21
Fokus-AP: Ghost-Prototyp ✅ + App-Duell 19 Apps ✅ + APP-DATA-00–05a ✅ + Ghost-Feed-Resolver-Vertrag GHOST-05–09 ✅ (2026-07-21)
Nächster-Schritt: A) Sonnet-Bau 19 App-Duell-Mockups (extern) ODER B) Ghost: post.hbs-Feldvertrag + T1-Gate ODER C) stations-de.json nach content/files/app-data uebertragen (GHOST-05–09 ✅ 2026-07-21)
Blocker: keine
Letzter-Distill: 2026-07-20
Kassensturz-Datum: 2026-07-20
-->
<!-- HOOK-META-SESSION: Ghost-Feed-Dateinamenvertrag GHOST-05–09 (SEC-04 formalisiert, Resolver/JSONParser gebaut, prokrastinations-preis migriert, Testseiten-Checker synchronisiert, Voll-Abschluss) -->

# PROJECT STATUS — Finanzwesir 2.0

Stand: 2026-07-21 | Session: Ghost-Feed-Dateinamenvertrag GHOST-05–09 (Voll-Abschluss) | Geändert von: Claude

**Zweck:** Schneller Wiedereinstieg nach Pausen.
**Zielgruppe:** Albert und Claude.
**Wann lesen:** Immer zu Session-Beginn, besonders nach längerer Pause.
**Wann aktualisieren:** Nach längeren Sessions, Meilensteinen oder geändertem Projektfokus.
**Gehört hier hinein:** Aktueller Fokus, stabiler Stand, nächster Schritt, Blocker.
**Gehört nicht hier hinein:** Detailbugs, vollständige Specs, lange Diskussionen.

---

## 1. Aktueller Fokus

**Nächster Schritt:** Drei gleichrangige Fäden offen — Albert entscheidet situativ, welcher zuerst weiterläuft. **C) CSV-App-Daten-Pipeline (APP-DATA-00–05a, ✅ 2026-07-20):** HTTP-Upload-Dienst zugunsten eines lokalen Offline-Prüfers + neuem Ghost-Card-Attribut `data-app-file` abgeschlossen (siehe Meilenstein unten); optionaler, unentschiedener Folgeschritt: bestehende `data-csv`-Cards auf `data-app-file` umstellen — nur Vorschlag, keine Entscheidung. **A) App-Duell-Runde:** 19 App-Fabrik-Apps sind bis zum Sonnet-Auftrag durchgezogen (Phase 1–3: Psychosprint → Grok-Gegenkritik → Sonnet-Baupaket), Sonnet-Bau selbst steht app-weise noch aus (externe Sonnet-Fäden, Albert steuert) — alternativ ein BACKLOG-Item 🟡 Aktiv (höchste Prio: AP-20/21) oder BACKLOG AF-25 (G2/etf-aera-vorbei-Beziehung final entscheiden). **B) Ghost.io-Prototyp:** Ghost-Grundgerüst (TMPL-1, 10 Templates + 4 Partials) und Homepage-Tailwind-Umbau (M1, 6 sichtbare Templates) stehen; zusätzlich ist der SEO/GEO-Page-Feldvertrag für `page.hbs` vollständig umgesetzt und im lokalen Ghost-Betrieb browserverifiziert (GHOST-02–04, ✅ 2026-07-21). Zusätzlich ist der Ghost-Feed-Dateinamenvertrag für `fw-app`-Cards (SEC-04: `data-fw-data`/`data-fw-config` als reine Dateinamen, zentraler Resolver, statischer Theme-Bootstrapper) formalisiert und in `prokrastinations-preis` umgesetzt (GHOST-05–09, ✅ 2026-07-21, siehe Meilenstein unten). Offen: derselbe SEO/GEO-Feldvertrag ist für `post.hbs` noch nicht geprüft/übertragen (BlogPosting-JSON-LD dort teils schon vorhanden, aber nicht gegen den Feldvertrag abgeglichen); T1s Produktions-Gate (Mengenvergleich je App, CDN-Ablösung, JANITOR-FALLBACK); Albert überträgt `stations-de.json` nach `content/files/app-data/`; App-seitiges Deep-Freeze/Error-(d)-UI/Reduced-Motion (Screen 4) ist noch nicht browserseitig geprüft. Alle vier zuletzt genannten Stände sind inzwischen committed: App-Duell-Runde-Session (`fa86fec`), TMPL-1/T1/M1-Paket (`1ae7f5c`), die vorherige 09h–09k-Kette (`9986f8c`) sowie chart-engine CE-6/CE-6a (`2757580`).

Letzte Meilensteine (je eine Zeile — Volltext in BACKLOG-ARCHIV.md):
- **Ghost-Feed-Dateinamenvertrag — GHOST-05 bis 09** (2026-07-21) ✅ `data-fw-data`/`data-fw-config` als reine Dateinamen + zentraler Resolver formalisiert (SEC-04, Decision Log), Suffix-Widerspruch korrigiert, `AppDataResolver.js`/`JSONParser.js`/`FinanzwesirJsonData.js` neu gebaut (`tests/json-parser.test.mjs` grün), `prokrastinations-preis` migriert (`stations.de.json` → `stations-de.json`), `tools/check-test-pages.py` synchronisiert (repositoryweit grün). Patch-Kette aus 5 Handover-Dokumenten Alberts. Nicht committed — Freigabe liegt bei Albert
- **SEO/GEO-Page-Feldvertrag — GHOST-02 bis 04** (2026-07-21) ✅ Feldvertrag (`docs/editorial/SEO-GEO-PAGE-FELDVERTRAG.md`) gegen `page.hbs` geprüft (GHOST-02, ROT), im Theme umgesetzt (GHOST-03: Head-Slot in `default.hbs`, Tag-gesteuerte Schema-/Robots-Logik in `page.hbs`) und im lokalen Ghost-Betrieb vollständig browserverifiziert — alle 5 Schema-Profile + Robots-Kombinationen einzeln bestätigt (GHOST-04) → GRÜN. Patch-Kette eines externen steuernden Fadens/ChatGPT, Ergebnisdateien in `docs/steering/patches/`. Nicht committed — Freigabe liegt bei Albert
- **CSV-App-Daten-Pipeline — APP-DATA-00 bis 05a** (2026-07-20) ✅ HTTP-Upload-Dienst gebaut, getestet, wieder zurückgebaut; ersetzt durch lokalen Offline-Prüfer (`content/files/app-data/csv-validator.mjs`, automatische Datenform-Erkennung) + neues Ghost-Card-Attribut `data-app-file` (in `ChartEngine.js`, live bestätigt); aktive Dokumentation vollständig nachgezogen (`docs/editorial/CSV-APP-DATEN-WORKFLOW.md` neu). Nicht committed — Freigabe liegt bei Albert
- **Ghost.io-Prototyp-Start — GHOST-LOKALBETRIEB + TMPL-1 + T1 + M1** (2026-07-19) ✅ Lokale Ghost-6-Devinstanz aufgesetzt, Ghost-Grundgerüst (10 Templates + 4 Partials) gebaut, erster lokaler Tailwind-Produktionsbuild erfolgreich (screen.css 25,4 KB), Homepage (6 sichtbare Templates) auf Tailwind umgestellt und lokal live geprüft. Arbeit extern (Albert/Codex) entstanden, per Abschluss-Ritual nachgezogen. Committed (`1ae7f5c`)
- **App-Duell-Runde — 19 Apps + 3 Problemfälle** (2026-07-19) ✅ 19 Apps per `/app-duell` bis Sonnet-Auftrag gezogen (diversifikations-detektor, esg-spiegel, etf-namensdecoder, etf-vergleich, geburtsjahrlos, investment-universum, komplexitaets-entlarver, kostenkiller-ter, market-timing-simulator, markt-kam-zurueck, rendite-kalibrierung, renditekiller-volatilitaet, replizierer-swapper, rollierende-sparplaene, thesaurierer-rennen, weltdepot-baukasten, weltkarte-etf-indizes, plan-generator, regulatorik-dashboard); 3 Sonderfälle gelöst (Details session-log 2026-07-19). Committed (`fa86fec`)

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
- Chart-Engine: stabil, offene APs in BACKLOG.md (AP-20/21 🟡 Aktiv, AP-6c 🟡 Aktiv). Produktive Ghost-Cards nutzen seit 2026-07-20 `data-app-file` (kanonischer Dateiname, aufgelöst zu `/content/files/app-data/<name>.csv`); `data-csv` bleibt exklusiv Test-/Fixture-Adapter.
- App-Daten-Pipeline: `content/files/app-data/csv-validator.mjs` (Offline-Prüfer, automatische Datenform-Erkennung) + FileZilla ist der aktive Redaktionsweg für Chart-CSVs. Der frühere HTTP-Upload-Dienst (`tools/upload-dienst/`) ist zurückgebaut, kanonische Doku: `docs/editorial/CSV-APP-DATEN-WORKFLOW.md`.
- Ghost-Theme: Grundgerüst (TMPL-1) + Homepage-Tailwind (M1) lokal lauffähig und sichtgeprüft (2026-07-19), noch kein Produktions-Deploy. SEO/GEO-Page-Feldvertrag für `page.hbs` seit 2026-07-21 umgesetzt und browserverifiziert (GHOST-02–04); `post.hbs` noch nicht gegen denselben Feldvertrag geprüft.
- fw-app-Datenlayer: `data-fw-data`/`data-fw-config` sind seit 2026-07-21 reine Dateinamen (SEC-04, kein URL-Feld mehr), aufgelöst über `AppDataResolver.js` zu `/content/files/app-data/<dateiname>`. `JSONParser.js`/`FinanzwesirJsonData.js` (Geschwister zu `CSVParser.js`/`FinanzwesirData.js`) sind neue shared Infrastruktur. `prokrastinations-preis` ist migriert (`stations-de.json`); Übertragung nach `content/files/app-data/` durch Albert steht aus.

---

## 3. Nächster sinnvoller Schritt

→ Der aktuelle nächste Schritt steht maschinenlesbar in HOOK-META `Nächster-Schritt` (oben); offene Punkte in `docs/steering/BACKLOG.md`.

---

## 4. Aktive Baustellen

| Bereich | Status | Nächster Schritt |
|---------|--------|------------------|
| Projekt-Gehirn | Masterplan komplett ✅ | APs wählen |
| Chart-Engine | Stabil, offene APs | Siehe `docs/steering/BACKLOG.md` |
| Theme | Grundgerüst + Homepage-Tailwind lokal live (TMPL-1/M1 ✅ 2026-07-19) | Resttemplates + T1-Produktions-Gate, siehe `THEME-ASSEMBLY-CHECKLIST.md` |
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
