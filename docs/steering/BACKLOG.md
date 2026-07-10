# BACKLOG – Finanzwesir 2.0
Stand: 2026-07-10 | Session: AP-prokrast-19 (Abschluss-Ritual) | Geändert von: Claude

**Regeln:**
- ✅-Zeilen werden sofort nach `BACKLOG-ARCHIV.md` verschoben (append), dann hier gelöscht.
- Neue Aufgabe: Albert sagt „neue Aufgabe" → Claude führt Abfrage-Protokoll aus (→ CLAUDE.md §6).
- Archivierungs-Trigger BACKLOG-ARCHIV.md: wenn > 200 Zeilen → Jahresarchiv anlegen.

---

## 🟡 Aktiv

| ID       | Bereich | Titel                                     | Prio | Dep | Detail                              |
|----------|---------|-------------------------------------------|------|-----|-------------------------------------|
| AP-20/21 | Engine  | Mixed-Rhythm CV-Heuristik (T5→T3→T6→T7)  | H    | —   | engine/detail/AP-20-DETAIL.md       |
| AP-6c    | Engine  | Touch-Tooltip Smartphone-Test             | M    | —   | engine/detail/AP-6c-DETAIL.md       |
| AP-22    | Engine  | Zero-Line lineWidth (~3 Zeilen Fix)       | L    | —   | —                                   |

---

## ⬜ Offen – Pre-Launch

| ID       | Bereich | Titel                                          | Prio | Dep          | Detail                                            |
|----------|---------|------------------------------------------------|------|--------------|---------------------------------------------------|
| AP-DATA-09 | Data  | Bestehende APP_SPEC.md nach Data-Need-Blaupause angleichen | M | — | docs/data/OFFENE-ARBEITSPUNKTE.md; Rollout erst nach Alberts explizitem Auftrag |
| DS-003   | Design  | Tastatur-Navigation testen (Safari/Firefox/Chrome) | H | —          | —                                                 |
| DS-004   | Design  | WCAG Kontrast-Tabelle dokumentieren            | H    | —            | —                                                 |
| TMPL-1   | Theme   | Ghost-Template bauen (Phase 2, 14 Items)       | H    | —            | theme-build/THEME-ASSEMBLY-CHECKLIST.md           |
| AP-19    | Engine  | PERIOD_TABLES DRY-Refactoring                  | M    | AP-18 ✅     | engine/detail/AP-19-DETAIL.md                     |
| DS-012   | Design  | Tailwind-Config kanonisch in DESIGN-SYSTEM.md  | H    | —            | —                                                 |
| DS-013   | Design  | Ghost screen.css-Einbindung prüfen + master-template Token-Duplikat klären | M | — | — |
| DS-FOLLOWUP-07 | Design | Nach Anbindung der echten CI-Fonts / Theme-Bridge (DS-012/DS-013): Rubikon-Positionierung `prokrastinations-preis` Screen 4 (`RubikonSymbolMarkers`, DOM-Text `rubikonText`) auf S/M/L mit `tools/rubikon-symbol-markers-diagnose.js` neu messen und ggf. feinjustieren — Font-Wechsel ändert Zeichenbreiten, aktuelle Werte basieren auf Browser-Fallback-`sans-serif` | L | DS-012, DS-013 | docs/steering/patches/AP-prokrast-07d_qa-nachtrag_ruecklaufkapsel_Ergebnis.md |
| AP-prokrast-17-FOLLOWUP-FONT | Design | Font-Migration Pilot `prokrastinations-preis`: `--fw-font-base` (Fallback `sans-serif`) → Kontrakt-Token `--font-body` (`'Source Sans Pro'`) in `app.css`. In AP-17 bewusst vertagt (Fork 5): Kontrakt §9 klammert die Font-Bridge aus, weil der Font-Wechsel die Textmetrik ändert und damit die in AP-07c von Hand gemessenen `--fw-rubikon-text-*`-Positionen verschiebt. **Kein reiner Rename** — MUSS gemeinsam mit / vor der Rubikon-Nachmessung DS-FOLLOWUP-07 laufen (gekoppelt); eigener Mini-AP mit Nachmessung + `app.test.html`-Abnahme | M | DS-012, DS-013, DS-FOLLOWUP-07 | docs/steering/patches/AP-prokrast-17_pilot-migration-prokrastinations-preis_Ergebnis.md (§3 Fork 5, §5, §9) |
| DS-FOLLOWUP-08 | Design | Nach Anbindung der echten CI-Fonts / Theme-Bridge (DS-012/DS-013): Card-to-Point-Fluggeschwindigkeit `prokrastinations-preis` Screen 2 (zentraler CSS-Schalter `--fw-card-to-point-flight-duration`, aktuell 1350ms nach zwei Alberts-Anweisungen von ursprünglich 300ms verlangsamt) im Live-Server nachjustieren — Wert ist ein Zwischenstand, keine finale UX-Abnahme | L | DS-012, DS-013 | docs/steering/patches/AP-prokrast-08b_anchor-measurement_card-to-point_implementierung_Ergebnis.md |
| AP-prokrast-08-FOLLOWUP-A | Engine | No-op-Bootstrap-Workaround entscheiden — `FwAnchorMeasurementPlugin` wird in `renderJourneyChartOnly()` mit leerem Callback aktiviert, nur um Chart.js zur Plugin-Registrierung beim Initial-Render zu zwingen. AP-prokrast-09a hat geprüft: ein unconditional Plugin-Push wäre technisch möglich, widerspricht aber dem in `CHART_PLUGIN_ARCHITEKTUR.md` §4 dokumentierten Muster („ChartEngine ergänzt ... nur bei passender Runtime-Option") — reiner Codefix wäre Spec-Drift. Masterfaden-Entscheidung nötig zwischen A) eigener Engine+Spec-AP mit Full-Gate (ändert `ChartEngine.js` + `CHART_PLUGIN_ARCHITEKTUR.md` §4/§20 gemeinsam, volle Regressionsprüfung über alle 4 Plugins + 3 Chart-Typen) oder B) No-op-Bootstrap bewusst als offizieller AnchorMeasurement-Contract-Bestandteil in §21 dokumentieren (kein Code ändert sich) | M | — | docs/steering/patches/AP-prokrast-09d_ruecklaufkapsel_Ergebnis.md |
| DS-014   | Design  | 07-APP-KOMPONENTEN.md — Design-API Baukasten   | H    | DS-012       | Blocker für alle App-Entwicklung                  |
| AP-prokrast-17b-QA | QA | Offene Farb-Test-Ausführung Pilot `prokrastinations-preis` (Pre-Launch): TC-N04 (Error-State-Farben im echten Fehlerzustand live prüfen — Null-Delta, keine rote Codierung) + TC-N08 (S/M/L-Farb-Viewport-Matrix 375/768/1280 dokumentiert abnehmen) im VSCode-Live-Server. Detail-Spec = `QA_TEST_CASES.md` Gruppe N; TC-N09 (Rubikon/Font) separat via AP-prokrast-17-FOLLOWUP-FONT | M | — | Apps/prokrastinations-preis/QA_TEST_CASES.md (Gruppe N) |
| TESTENV-1 | App-Fabrik/Test | **Initiative: Konsolidierte Testumgebung** (Idee erfasst 2026-07-10; Start NACH Ketten-Abschluss AP-18). Eigenes Testverzeichnis; Pro-App-Harness (`Apps/*/app.test.html` → `<slug>.test.html`) + Launcher-Index-Sammelseite (verlinkt alle Harnesse, lädt sie nicht) + Harness-Template im App-Fabrik-Scaffold für die kommenden ~25 Apps; Chart-Harness-Konsolidierung (`index_xxx.html` inventarisieren/entdublizieren → je 1 Linie/Balken/Torte + 1 kombiniert, EINE Chart.js-Ladestrategie — koppelt AP-23); Test-CSVs mit umziehen (Pfad-Fix, kein reines `mv`); versionierter Kanon vs. gitignorete Scratch-Ecke trennen (macht F-3 dauerhaft reproduzierbar). Start = Inventar-/Anamnese-AP, dann Zerlegung | M | AP-18-Abschluss, AP-23 | Kontext: Steuerungsfaden 2026-07-10; F-3 aus `docs/steering/patches/AP-prokrast-18_claims-vs-files-review-gesamtkette_Ergebnis.md` |
| CSS-5    | CSS     | Farb-Audit + screen.css Verifikation           | M    | CSS-3 ✅     | —                                                 |
| AP-DOC-1 | Engine  | Basis/Prompts/ bereinigen (5 Dateien)          | H    | —            | engine/detail/AP-DOC-1-DETAIL.md                  |
| AP-SEC-1 | Engine  | Domain-Lock Validierungsfunktion implementieren| M    | AP-DOC-1     | —                                                 |
| ST-01    | System  | Scope-Creep-Erkennung stärken — proaktiver Mid-Work-Check nach jedem Patch + Selftest-Szenario Pfad 14 | H | — | — |
| ST-02    | System  | Selftest: Szenario „Protected Path direkt" ergänzen — Pfad 11, PROTECTED_PATHS.json-Protokoll vs. CLAUDE.md-Tabu-Regel | H | — | — |
| CHR-1    | System  | Chronik-Validierung automatisieren: git-pre-commit-Hook (ruft `validate_chronik.py`) + maschinenlesbarer Chronik-Index — erst wenn Chronik-Volumen es rechtfertigt | L | — | Engine vorhanden: `.claude/skills/chronik-check/validate_chronik.py` |
| CL-04    | Cleanup | theme/CLAUDE.md schreiben                      | M    | —            | —                                                 |
| CL-05    | Cleanup | apps/CLAUDE.md schreiben                       | M    | —            | —                                                 |
| CL-06    | Cleanup | Duktus-Analyse Blog-Texte lesen                | M    | —            | —                                                 |
| CL-07    | Cleanup | Skill style-finanzwesir-duktus erstellen       | M    | CL-06        | —                                                 |
| CL-12    | Cleanup | VG Wort Pixel ins Theme einbinden              | M    | TMPL-1       | —                                                 |
| CL-13    | Cleanup | Clicky Analytics einbinden                     | M    | —            | —                                                 |
| CSS-6    | CSS     | Tailwind Production-Build (< 30 KB)            | H    | CSS-5        | —                                                 |
| CSS-7    | CSS     | Asset-Einbindung verifizieren                  | H    | TMPL-1       | —                                                 |
| T1       | CSS     | Aufräum- und Optimierungs-AP bei Tailwind-Produktionsumstellung (CDN → lokaler, komprimierter Build): vollständiger Durchgang durch alle Tailwind-Konsumenten — alle Standalone-Demos auf zentrale `tokens.css` umstellen oder archivieren, verbliebene Hex-Literal-Configs auflösen, Purge/Safelist konfigurieren, Minifizierung, Ghost-Asset-Auslieferung prüfen (offener Punkt P18: `.hbs`-Kette), JANITOR-FALLBACK-Sektion `screen.css` §7 füllen oder entfernen. Löst die bewusst akzeptierte Übergangs-Divergenz der Standalone-Demos (P20) auf | H | CSS-6 | docs/steering/patches/AP-prokrast-15a_ruecklauf_masterentscheidungen_F1-F11.md (Entscheidung 9), docs/steering/design/CI-POOL-ROLLENKONTRAKT.md §10 |
| TH-03    | Theme   | Integration & QA (Phase 3, 16 Items)           | H    | TMPL-1       | theme-build/THEME-ASSEMBLY-CHECKLIST.md           |
| CL-03    | Cleanup | Vermächtnis-Inhalte überführen                 | M    | —            | —                                                 |
| TH-04A   | Theme   | Performance-Audit (Phase 4A, 18 Items)         | H    | TH-03        | theme-build/THEME-ASSEMBLY-CHECKLIST.md           |
| TH-04B   | Theme   | Sicherheits-Audit (Phase 4B, 18 Items)         | H    | TH-03        | theme-build/THEME-ASSEMBLY-CHECKLIST.md           |
| TH-05    | Theme   | Deployment (Phase 5, 5 Items)                  | H    | TH-04A, TH-04B | theme-build/THEME-ASSEMBLY-CHECKLIST.md         |
| TH-06    | Theme   | Ghost-Instanz konfigurieren (Phase 6)          | H    | TH-05        | theme-build/THEME-ASSEMBLY-CHECKLIST.md           |
| AF-19    | App-Fabrik | docs/App-Fabrik/01_DECISION_LOG.md synchronisieren — E-01, B-02, B-03 einpflegen (E-02 erledigt 2026-06-03, letzter Stand A-12) | L | — | docs/App-Fabrik/01_DECISION_LOG.md |
| AF-04    | App     | AUTHOR_GUIDE harmonisieren — `data-app` → `data-fw-app` | M    | Pilot-1      | —                                                 |
| AF-05    | App     | Redakteurs-Cheat-Sheet fw-apps erstellen        | M    | Pilot-1      | —                                                 |
| AF-20    | App-Fabrik | CHART_ENGINE_ROLE_AND_INTEGRATION.md: „Standalone"-Terminologie prüfen und ggf. korrigieren (Folge aus OA-02-Dissens-1) | L | — | docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md |
| AF-21    | App-Fabrik | App-Familien P→B→N-Standards ausarbeiten              | M    | —       | docs/App-Fabrik/PBN-FAMILY-STANDARDS.md anlegen: 6-7 Familien je mit Proven-Muster, Better-Satz, Tailwind-Komponenten-Liste |
| AF-22    | App-Fabrik | P→B→N-Block in APP_SPEC-Template integrieren          | M    | AF-21   | Pflichtabschnitt in APP_SPEC.md-Vorlage + 10v10-Test-Feld |
| AF-23    | App-Fabrik | Pincus-Check als Pre-Code-Quality-Gate dokumentieren  | L    | AF-22   | 4-Punkte-Checkliste in .claude/commands/ oder CLAUDE.md §6 App-Arbeit |
| AP-23    | Engine  | Chart.js-Version zwischen Dev/Test-CDN (`Theme/index.html`, `app.test.html`, ungepinntes `<script src="https://cdn.jsdelivr.net/npm/chart.js">`) und lokal vendorter Produktionsversion 4.5.0 synchronisieren/pinnen — Drift-Risiko bei künftigen Chart.js-Majors | L | — | docs/steering/patches/AP-prokrast-03g_klaerung-forschung_rubikon-reveal_scale-animation_Ergebnis.md |

---

## 📋 Post-Launch

| ID       | Bereich | Titel                                       | Prio | Dep        | Detail                           |
|----------|---------|---------------------------------------------|------|------------|----------------------------------|
| AP-DOC-2 | Engine  | fw-chart-engine/ als Top-Level herauslösen  | M    | TH-05      | engine/detail/AP-DOC-2-DETAIL.md |
| AP-DOC-3 | Engine  | Versionierung Projekt-Gehirn entscheiden    | L    | —          | —                                |
| AP-DOC-4 | Engine  | Multi-CLAUDE.md für Apps                    | M    | Apps-Start | —                                |
| PL-1     | Engine  | Einheiten-Anker Y-Achse                     | L    | —          | —                                |
| PL-2     | Engine  | Zone Zero < 300 Tage                        | L    | —          | —                                |
| DS-005   | Design  | CSS-Styles Dopplung bereinigen              | L    | —          | —                                |
| DS-006   | Design  | Tailwind-Config Divergenz auflösen          | L    | —          | —                                |
| DS-007   | Design  | Homepage Extra-Farben entscheiden           | L    | —          | —                                |
| DS-011   | Design  | Icon/Box-Grafiken finalisieren              | L    | —          | —                                |
| CL-08    | Cleanup | SVG-Duplikate bereinigen                    | L    | —          | —                                |
| CL-09    | Cleanup | Font-CSS-Dopplung auflösen                  | L    | —          | —                                |
| CL-10    | Cleanup | design-system/referenz/ prüfen              | L    | —          | —                                |
| CL-11    | Cleanup | design-system/spec/ Sync prüfen             | L    | —          | —                                |
