<!-- HOOK-META
Version: 1
Stand: 2026-07-23
Fokus-AP: AF-GM-02 + AF-GM-03 ✅ (2026-07-23)
Nächster-Schritt: AF-GM-04 — ersten ausdrücklich abgenommenen Golden Master mit Sonnet durch die Produktionslinie führen (AF-GM-02 + AF-GM-03 ✅ 2026-07-23)
Blocker: Kein Golden-Master-Pilot ohne expliziten Abnahmebeleg (Acceptance-ID + Hash); noch kein Mockup von Albert abgenommen.
Letzter-Distill: 2026-07-20
Kassensturz-Datum: 2026-07-20
-->
<!-- HOOK-META-SESSION: AF-GM-02+03 Golden-Master-Trace-Recorder + Eingabepaket-Werkzeug, Ketten-Minimalabschluss -->

# PROJECT STATUS — Finanzwesir 2.0

Stand: 2026-07-23 | Session: AF-GM-02+03 Golden-Master-Trace-Recorder + Eingabepaket-Werkzeug | Geändert von: Claude

**Zweck:** Schneller Wiedereinstieg nach Pausen.
**Zielgruppe:** Albert und Claude.
**Wann lesen:** Immer zu Session-Beginn, besonders nach längerer Pause.
**Wann aktualisieren:** Nach längeren Sessions, Meilensteinen oder geändertem Projektfokus.
**Gehört hier hinein:** Aktueller Fokus, stabiler Stand, nächster Schritt, Blocker.
**Gehört nicht hier hinein:** Detailbugs, vollständige Specs, lange Diskussionen.

---

## 1. Aktueller Fokus

**Nächster Schritt:** **AF-GM-02** und **AF-GM-03** sind abgeschlossen: gepinnter Playwright-Chromium-Recorder/-Verifizierer (`tools/golden-master/`, lokal unter `C:\Tools\finanzwesir-playwright\af-gm-02\browsers`) und deterministisches Eingabepaket-Werkzeug (Generator/Validator/Protected-Diff-Checker/Repo-Leseschutz) stehen mit vollständigen Positiv-/Negativnachweisen. Als nächstes folgt **AF-GM-04**: der erste ausdrücklich von Albert abgenommene Golden Master durch die Produktionslinie — noch kein Mockup abgenommen, keine Gelb-Variante, keine Shared-Änderung im App-AP.

Letzte Meilensteine (je eine Zeile — Volltext in BACKLOG-ARCHIV.md):
- **AF-GM-02 + AF-GM-03 Golden-Master-Trace-Recorder + Eingabepaket-Werkzeug** (2026-07-23) ✅ `tools/golden-master/` gebaut: gepinnter Playwright-Chromium lokal unter `C:\Tools\finanzwesir-playwright\af-gm-02\browsers` (bewusst nicht im NAS-Sync-Pfad), `record.mjs`/`verify.mjs` inkl. neuer Aktion `set-input-value` (02b), Eingabepaket-Generator/-Validator/Protected-Diff-Checker/Repo-Leseschutz (03, Inhaltsgate-Nachputz: Trace-Acceptance-Bindung, `..`-Traversal-Schutz, `permitted`-Pflicht, vierteiliger Produktionsplan). Alle Nachweise in `tests/golden-master/evidence/`. Nicht committed — Freigabe liegt bei Albert
- **CSS-Altlasten (tokens.css/Janitor-Grenze) + Ghost-Theme-ZIP + Janitor-Page-Fix** (2026-07-23) ✅ `tokens.css` per barem Import in `screen.css` eingebettet (D-CSS-03 präzisiert), leere JANITOR-FALLBACK-Sektion ersatzlos entfernt (7→6 Abschnitte); Schutzprofil-Pfadfehler (`tokens.css`) korrigiert, BACKLOG-Größenangaben wahrheitsgemäß (`screen.css` 31.594 Bytes/6.564 Bytes gzip, Ziel <30 KB bleibt unter CSS-6 offen); zwei Ghost-Theme-ZIPs erzeugt (v1/v2) — v2 behebt zusätzlich einen realen Produktionsfund: `fw-janitor.js` war nur in `post.hbs` eingebunden, das Projekt nutzt aber nur Ghost-Pages/Homepage, keine Posts, jetzt auch in `page.hbs`. Von Albert bestätigt: CSS/Apps abgenommen, Janitor eingebunden mit zwei offenen Detailfehlern (Icons, rote Kreuze) — vermerkt in DS-015. Chronik: `Archiv/Chroniken/chronist-v1/CHRONIK-2026-07-23-css-altlasten-janitor-tokens-und-ghost-theme-zip.md`. Nicht committed — Freigabe liegt bei Albert
- **AF-GM-01 App-Fabrik-Fundament** (2026-07-22) ✅ Kanonischer Produktionsstandard, Golden-Master-/Eingabepaket-Vertrag, formale Entscheidungen AF-PROD-01 bis 04, korrigierter Error-vs.-Empty-Vertrag, Routing und ein strenges Shared-Theme-Profil (`forbidden → protected → forbidden`) formalisiert. Keine Generatoren, keine Playwright-Abhängigkeit und keine Produktions-App verändert. Nächster Strang: AF-GM-02.
- **Rubikon-V4-Übernahme + JSON-Eingabe-Tool-Kern — Handover C1/C1/C3** (2026-07-22) ✅ Drei Handover-Aufträge exakt ausgeführt: V4-Rubikon-Arbeitsstand kritisch geprüft (nichts korrigiert, alle Nachweise grün); Windows-Konsolen-Encoding-Hotfix für `bearbeite-rubikon-text.ps1`/`.bat` (UTF-8-BOM, `chcp 65001`+`pause`); JSON-Eingabe-Tool in allgemeinen Mechanik-Kern (`json-eingabe-tool-core.psm1`) und Rubikon-Profil getrennt, JS-Blockgrenzenfehler behoben. Dabei zwei reale PowerShell-5.1-Fallstricke gefunden und behoben: `File.Replace($null)` schlägt fehl (atomare Schreiblogik hatte vorher nie geschrieben); `Compress-Archive`/`ZipFile.CreateFromDirectory` erzeugen Backslash- statt Vorwärtsslash-Zip-Pfade. Theme-ZIP v5 erzeugt und verifiziert. Albert bestätigt: „Klappt alles ist grün". Chronik: `Archiv/Chroniken/chronist-v1/CHRONIK-2026-07-22-rubikon-json-eingabe-kern.md`. Nicht committed — Freigabe liegt bei Albert
- **Theme-Bootstrapper + CSS-Reparatur-Kette — SEC-05 bis Disclosure-Hotfix** (2026-07-22) ✅ Elf verkettete Handover-Aufträge: Runtime-Verlagerung in statischen Theme-Bootstrapper (SEC-05, P1-Korrektur `Object.hasOwn()` gegen Prototype-Pollution); JSON-Offline-Validator (`json-validator.mjs`, Vertragsmodul `prokrastinations-preis-stations-contract.js`); CSS-Architektur formalisiert (D-CSS-01–04: Übergangsoption C, Ghost-Kaskadengrenze, barer `@import`, Migrations-Gate) und umgesetzt (Option B: neue `Theme/src/css/apps/prokrastinations-preis.css`); dabei vorbestehenden Fehlalarm in `tools/check-test-pages.py` gefunden und behoben (`check_app_pflicht()` jetzt Registry- statt ordnerbasiert, `TEST_PAGE_STANDARD.md` v9→v13); drei Ghost-Theme-ZIPs erzeugt (v1–v3, v3 inkl. Disclosure-Button-Fix). Chronik: `Archiv/Chroniken/chronist-v1/CHRONIK-2026-07-22-prokrastinations-theme-css-kette.md`. Nicht committed — Freigabe liegt bei Albert
- **Ghost-Feed-Dateinamenvertrag — GHOST-05 bis 09** (2026-07-21) ✅ `data-fw-data`/`data-fw-config` als reine Dateinamen + zentraler Resolver formalisiert (SEC-04, Decision Log), Suffix-Widerspruch korrigiert, `AppDataResolver.js`/`JSONParser.js`/`FinanzwesirJsonData.js` neu gebaut (`tests/json-parser.test.mjs` grün), `prokrastinations-preis` migriert (`stations.de.json` → `stations-de.json`), `tools/check-test-pages.py` synchronisiert (repositoryweit grün). Patch-Kette aus 5 Handover-Dokumenten Alberts. Nicht committed — Freigabe liegt bei Albert
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
