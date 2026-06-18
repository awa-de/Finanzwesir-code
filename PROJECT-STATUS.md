<!-- HOOK-META
Version: 1
Stand: 2026-06-18
Fokus-AP: APP-01 — prokrastinations-preis
Nächster-Schritt: B1-AP-14c1 — Marker + Pulse Screen 2 (B1-AP-14b3 ✅ 2026-06-18)
Blocker: keine
Letzter-Distill: 2026-06-15
Kassensturz-Datum: 2026-06-15
-->
<!-- HOOK-META-SESSION: B1-AP-14b3 -->

# PROJECT STATUS — Finanzwesir 2.0

Stand: 2026-06-18 | Session: B1-AP-14b3 | Geändert von: Claude

**Zweck:** Schneller Wiedereinstieg nach Pausen.
**Zielgruppe:** Albert und Claude.
**Wann lesen:** Immer zu Session-Beginn, besonders nach längerer Pause.
**Wann aktualisieren:** Nach längeren Sessions, Meilensteinen oder geändertem Projektfokus.
**Gehört hier hinein:** Aktueller Fokus, stabiler Stand, nächster Schritt, Blocker.
**Gehört nicht hier hinein:** Detailbugs, vollständige Specs, lange Diskussionen.

---

## 1. Aktueller Fokus

**App-Landschaft bereinigt + Block B umgebaut ✅** (AF-13 + 2026-05-18): B1 von Verlustzähler zu Marktzeit-App umgerahmt, B2 auf Epochen-Fokus reduziert, Block B zu „Marktzeit statt Timing" umbenannt, Der alte Euro (B4) + Depot-Kipppunkt (B5) in Block B integriert (vorher F3/F4), 1-Million-App verworfen. 21 Master-Apps / 24 Ordner.

**B1 operative Dateien VERALTET ✅** (2026-05-18): APP_SPEC.md (alte Verlustzähler-Mechanik), SLICE_0_KICKOFF.md und SLICE_PLAN.md mit hartem VERALTET-Header versehen. *(Galt für die alte Mechanik vor dem Slice-0-Reboot 2026-05-28.)* Operative Quelle heute: `Apps/prokrastinations-preis/APP_SPEC.md` V1.5 *(war operativ 2026-06-03; heute V2.5 — AP-08b/AP-08c)*. `MINI_SPEC_FROM_HAUPTDOKUMENT.md` bleibt fachliche Hintergrundquelle.

✅ **B1 Slice-0-Reboot abgeschlossen (2026-05-28):** APP_SPEC V1.2 (Marktzeit-Mechanik, 19 Abschnitte inkl. heldenreise) fertig. Datenbasis MSCI World Index, Format CSV entschieden. NAVIGATION.md Ausnahme-Warnung auf Reboot-Notiz aktualisiert.

✅ **E-01 entschieden (2026-05-28):** prokrastinations-preis ist Szenario-/Vergleichs-App mit Storytelling-Elementen. Kein Calculator.
✅ **E-02 entschieden (2026-05-28):** Neue Pilot-Reihenfolge — risiko-uebersetzer = Pilot-1 (Calculator-Pilot), prokrastinations-preis = Pilot-2 (Daten-/Chart-/Story-Pilot). 05_PILOT_STRATEGY.md aktualisiert.
✅ **B-02 entschieden (2026-05-28):** Berechnungsformel = Anteilslogik (monatlicher Anteilskauf). Keine Annuität, keine Durchschnittsrendite.
✅ **B-03 entschieden (2026-05-28):** Screen-Flow = Button-getrieben V1. Kein Autoplay, kein Scroll-Trigger.

✅ **APP_SPEC V1.3 CSV-Konsistenz (2026-06-03):** JSON→CSV in §3/§13/§15 synchronisiert; E-01-Invariante präzisiert; Tippfehler MarketTimeStrategy korrigiert. DECISION-LOG + 05_PILOT_STRATEGY + 02_OPEN_QUESTIONS synchronisiert.
✅ **B1-CSV-Guardrail (2026-06-03):** D-APP-01-B01 im DECISION-LOG angelegt. Guardrail in APP_SPEC §7.1 verankert: CSV gilt ausschließlich für externe MSCI-Datendatei (data-fw-data). JSON bleibt für data-fw-options, AppContext, Registry und alle anderen App-Fabrik-Zwecke zulässig.

✅ **Data Need Snapshot (2026-06-03):** APP_SPEC V1.5 — §7 zu Datenbedarf/Data Need Snapshot umgebaut (10 Unterabschnitte: Wofür, Ideale Reihe, Mindeststandard, Nicht verwenden, CSV-Format, Produktive Anbindung, Klärungspflichten, CSV-Prüfprotokoll, Pflegehinweis, Berechnung). DATENQUELLEN-GOVERNANCE.md: Subsection ergänzt. NAVIGATION.md: Data-Need-Snapshot-Note. APP_INVENTORY.md: JSON→CSV. AP-DATA-07 vollständig abgeschlossen.
✅ **AP-DATA-08 Blaupause (2026-06-03):** Data Need Snapshot Blaupause in `03_APP_FACTORY_STANDARD_DRAFT.md §7a` dokumentiert — Minimalblock (Pflicht für alle APP_SPEC.md), Detailblock (nur bei Datenbedarf), 6 Statuswerte, 4 Beispiele (Index / Calculator / offen / JSON-Config), Rollout-Logik. AP-DATA-08 abgeschlossen (Blaupause ✅); Rollout → AP-DATA-09 (offen).

✅ **Datenlayer-Konsistenzpatch (2026-06-03):** APP_SPEC V1.4 — §7 auf zentralen Datenlayer umgestellt, CSV-Format date/index_value/YYYY-MM-DD normiert, App-spezifische Verbote als §7.4 ergänzt. NAVIGATION.md: Datenlayer-Pflichtlektüre für datengetriebene Apps (Punkt 12). BACKLOG: AP-DATA-01/04/05 aktiv. AP-DATA-07 abgeschlossen. DECISION_LOG: P-01 veraltet markiert, D-APP-01-E02 angelegt. 02_OPEN_QUESTIONS Data-01: B-01-D geklärt, B-01-A teilgeklärt.

✅ **Datenlayer Governance (2026-06-03):** docs/data/ angelegt mit 7 Dateien (DATENQUELLEN-GOVERNANCE, SOURCE-TIERS, DATASET-CATALOG, DATASET-CONTRACT-TEMPLATE, INDEX-RETURN-VARIANTEN, OFFENE-ARBEITSPUNKTE). Theme/assets/data/b1/ als produktives Datenverzeichnis eingerichtet. CSVParser-Verbot + Net-Return-Präferenz dokumentiert. 7 APs (AP-DATA-01–07) für Quellenrecherche und Dataset-Contract erfasst.

✅ **AP-DATA-01/04/05 abgeschlossen (2026-06-04):** B-01-C MSCI direkt (msci.com) Tier 0 entschieden; Startdatum 2000-12-29 (korrigiert); Dataset Contract `docs/data/contracts/msci-world-net-return-monthly.md` angelegt; Dateiname `msci-world-net-return-eur-monthly.csv` festgelegt.

✅ **APP-01-B01 + data-raw-Infrastruktur abgeschlossen (2026-06-04):** Bronze-Architektur etabliert (`data-raw/index/msci-world/|etf/|macro/`); historyIndex.xls → `data-raw/index/msci-world/`; CSV generiert (306 Zeilen, 2000-12-29 bis 2026-05-29, alle 5 Validierungschecks grün) → `Theme/assets/data/b1/msci-world-net-return-eur-monthly.csv`; `tools/raw-to-csv.py` + Skill `/raw-to-csv` für zukünftige Datenquellen.

✅ **AP-DATA-11 MSCI ACWI abgeschlossen (2026-06-04):** historyIndex.xls → `data-raw/index/msci-acwi/`; Contract `docs/data/contracts/msci-acwi-net-return-monthly.md`; CSV 306 Zeilen 2000-12-29 bis 2026-05-29 → `Theme/assets/data/b1/msci-acwi-net-return-eur-monthly.csv`; alle 5 Checks grün. DATASET-CATALOG aktualisiert.

✅ **B1 SLICE_PLAN + SLICE_0_KICKOFF (neue Mechanik) fertig (2026-06-04):** Beide Slice-Planungsdateien für die Marktzeit-Mechanik erstellt. OA-01 entschieden: app.js als ES-Modul (`<script type="module">`), folgt Chart-Engine-Muster. CSVParser.js in `Theme/assets/js/fw-chart-engine/data/`.

✅ **B1 Slice-0 abgeschlossen (2026-06-04):** app.js (ES-Modul), app.css (.fw-app-Namespace), app.test.html (7 Szenarien A–G). Full-Gate bestanden, Szenarien A–G getestet — keine Fehler.

✅ **B1 Slice-1 abgeschlossen (2026-06-05):** CSVParser-Import (ES-Modul), loadData() mit Two-Step-Validierung (unitKey CURRENCY_EUR, ≥120 Zeilen, index_value-Spalte), AppData (Object.freeze, Date→ISO-String). Alle 5 Daten-States implementiert, 14 Testszenarien A–N bestätigt.

✅ **B1 Slice-2 abgeschlossen (2026-06-05):** marketTimeStrategy() (Anteilslogik, 120 Monate), buildAppContext() (AppContext-Rucksack), renderKpiCards() (dl/dt/dd SafeDOM), renderA11yRegion() (aria-live polite). 16 Testszenarien A–P bestätigt (36.000 € / 72.176 € / +36.176 €). P-11 Fetch-Dedup-Cache formalisiert (Factory-Standard-Draft §9).

✅ **B1 Slice-3 abgeschlossen (2026-06-05):** clamp() + parseOptions() (Whitelist defaultRate/startBetrag), renderContent() neu mit Slider + wrapping label (Q-06), ARIA-Slider, ARIA Live Region (input/change getrennt), app.css Slider-Stile. Q-06 in Decision Log + Factory Standard formalisiert. 20 Szenarien A–T bestätigt, Viewport 375px ✅.

✅ **Archiv-Infrastruktur abgeschlossen (2026-06-08):** `.gitignore` umgestellt (`Archiv/` versionierbar, `Archiv/local/` gitignored). 292 Dateien (Binärdateien, LLM-Dumps, Rohmaterial) nach `Archiv/local/` verschoben. Hash-Analyse: 0 Cross-Dubletten. NAVIGATION.md Archivstrategie verankert. (ST-20 / ST-21)

✅ **Föderiertes Archivmodell beschlossen (2026-06-08):** `docs/steering/ARCHIV-STRATEGIE.md` angelegt — SSoT für Archivvertrag (10 Regeln), Begriffsklärung, Making-of-Zielbild. Lokale Archive bleiben, werden über Archivvertrag kontrolliert. Keine Massenkonsolidierung. Folge-APs ST-23–27 in BACKLOG. (ST-22)

✅ **Archivvertrag konkretisiert (2026-06-08):** `ARCHIV-STRATEGIE.md` um Regel 11 + §Statuswerte (HIST/ERSETZT/POSTMORTEM/RAW, nicht: ARCHIV) + §Nachfolgerregel für ERSETZT + §README-Schablone für lokale Archive ergänzt. ST-28 (AP-7 README-Anwenden) neu in BACKLOG. Folge-APs auf AP 5–9 aktualisiert. NAVIGATION.md Nicht-Routing-Regel: fehlend → Folgepunkt. (ST-23)

✅ **Archiv-Inventar abgeschlossen (2026-06-08):** `docs/steering/ARCHIV-INVENTAR.md` angelegt — 15 Archivorte inventarisiert (9 Verzeichnisse + 6 Dateien/Sonderfälle). Archiv/local/ gitignored bestätigt. Größtes Drift-Risiko: docs/steering/archiv/ (15 Dateien, 222 KB). Pilotkandidaten: docs/spec/archiv/ + Apps/prokrastinations-preis/Archiv/. Befund für ST-25 (föderierter Katalog). (ST-24)

✅ **COMP-ARCH-Verankerung (2026-06-05):** Component Composition Architecture als verbindliches Architekturmodell verankert — §1a in 03_APP_FACTORY_STANDARD_DRAFT.md (Lego-Brett-Modell, Komponentenklassen, Chart entzaubert), §2-Begriffe erweitert, CHART_ENGINE_ROLE_AND_INTEGRATION.md §1 Einordnung, APP-INTERFACE.md §4 Querverweis, ADR-COMP-ARCH-01 angelegt. OA-02 als Chart-Komponenten-Entscheidung gerahmt — kein App-Fabrik-Sonderweg.

✅ **Föderierter Archivkatalog abgeschlossen (2026-06-08):** `Archiv/legacy-map.md` erstellt — 15 Archivorte kartiert, 6 Zielrollen, 2 Pilotkandidaten (docs/spec/archiv/ + Apps/prokrastinations-preis/Archiv/). AP-9-Startbasis enthalten. Archiv-Block ST-20–ST-25 vollständig. (ST-25)

✅ **Archiv-README-Schablone angewandt (AP-7 / ST-28, 2026-06-08):** 4 lokale Archive mit Kontextschutz-README versehen (`Apps/prokrastinations-preis/Archiv/`, `docs/design-system/archiv/`, `docs/spec/archiv/`, `docs/steering/archiv/`). Schutzsatz + Archivvertrag + Erstellt-Datum. `legacy-map.md` aktualisiert. AP 8 (Root-Making-of-Rahmen) startbar.

✅ **Root-Making-of-Rahmen vorbereitet (AP-8 / ST-26, 2026-06-08):** `Archiv/making-of/` angelegt mit `README.md` (Schutzregel, Quellenlogik) und `KAPITELRAHMEN.md` (7 Kapitelkandidaten, 6 mit Belegen aus legacy-map.md, 1 RAHMEN_OHNE_BELEG für Kapitel 01 Ursprung). `legacy-map.md` minimal aktualisiert (+1 Haupttabelleneintrag, Zähler 15→16).

✅ **Archiv-Grundarchitektur abgeschlossen (AP-9 / ST-27, 2026-06-08):** `docs/spec/archiv/` als erste Pilotinsel behandelt — `PILOT-BEWERTUNG.md` angelegt (Einordnung, Befund, Kontextschutz, Making-of-Bezug, Lernpunkt). `legacy-map.md` Pilotstatus aktualisiert. `KAPITELRAHMEN.md` Kapitel-02-Belegverweis ergänzt. Pilot-Lernpunkt: Auswahlregel hat funktioniert, AP-7-README trug. Archivstrategie-Grundarchitektur AP 3–9 abgeschlossen.

✅ **APP-01 Slice-4-Gate verankert (2026-06-10):** OA-02 Advocatus-Diaboli-Prüfung als Pflicht-Gate (`###`) im SLICE_PLAN.md Slice-4-Abschnitt verankert. 3 Risiken + 5 Pflichtfragen vor Slice-4-Code dokumentiert. BACKLOG-Erinnerungsanker gesetzt. Kein Code geändert.

✅ **OA-02-Doku-Nachputz abgeschlossen (2026-06-10):** `// NEW`-Marker aus Markdown entfernt, D-OA-02-1 im DECISION-LOG ergänzt, OA-02-Status in ADR und App-Fabrik-Standard synchronisiert. Kein JavaScript geändert.

✅ **OA-02 Advocatus-Diaboli Gate-Revisionen 1–4 + Handover (2026-06-10):** Gate-Revisionen 1–4 für `renderFromData()` (Pfad 2) ausgeführt. Kernerkenntnisse: `_draw()` als gemeinsamer Render-Kern; inline `appDataLineStrategy` in ChartEngine.js = Layer-2-Verschmutzung. Revision 4 nicht freigegeben. Vollständiger Braindump in `docs/steering/handovers/HANDOVER-APP-01-SLICE-4-CHARTENGINE-PFAD-2-2026-06-10.md` — Spec-Trace-Prompt für neuen Faden (Revision 5 via LineChartStrategy). Kein JS geändert.

✅ **APP-01 Slice-4 / Gates 1–3 + Implementierungs-Handover (2026-06-10):** Gate 1 (Spec-Trace-Matrix), Gate 2 (exakter LineChartStrategy-Contract + WeakMap + UI-Analyse), Gate 3 (Implementierungsplan mit Auflagen) — alle freigegeben. Architekturentscheidung: `config.features` als neutrale Fähigkeitswahl (kein `isAppChart`, kein `noRangeButtons`). Implementierungs-Handover vollständig: `docs/steering/handovers/HANDOVER-APP-01-SLICE-4-IMPLEMENTIERUNG-2026-06-10.md`. Kein JS geändert.

✅ **B1 Slice-4 abgeschlossen (2026-06-11):** `renderFromData()` in ChartEngine.js implementiert (WeakMap-State, Deep-Freeze, Feature-Normalisierung). `rangeControls`-Guard in FwRenderer._renderControls(), Headline-Guard in ChartEngine._draw(). app.js: ChartEngine-Import, chartSection-Container, initialer Chart-Render, Slider-Smart-Update. app.css: `.fw-app__chart-section`. FRICTION: `app.test.html` fehlte Chart.js-Script-Tag (fix: CDN-Tag vor Modul-Script ergänzt). 20 Szenarien A–T + Szenario U (SparplanChart) bestätigt. REG-APP-001 in REGRESSION-MATRIX.md.

✅ **Memory-Portabilität abgeschlossen (ST-18, 2026-06-15):** 37 Memory-Dateien aus zwei Verzeichnissen zusammengefuehrt (18 Wege-Merge). Symlink Heim-PC eingerichtet (mklink /D, Developer Mode). Setup-Script `tools/setup-memory-junction.ps1` angelegt. Brain-Silo aufgeloest.

✅ **P→B→N als App-Building-Layer zerlegt (PLAN-01, 2026-06-15):** AF-21 (App-Familien P→B→N-Standards), AF-22 (P→B→N-Block in APP_SPEC-Template), AF-23 (Pincus-Check als Pre-Code-Gate) in BACKLOG eingetragen. Proven=Tailwind, Better=10v10-Test pro Familie, New=isoliert.

✅ **B1 Slice-5 abgeschlossen (2026-06-15):** Screen-Flow 1→4, lazy Chart-Render, Button-Wiring getestet. SF-02 (NumericInput Hybrid) auf Slice 7 vorgezogen (Mobile ≥ 50 %).

✅ **B1 Slice-6 abgeschlossen (2026-06-16):** VertikaleLinie (afterDraw-Plugin ChartEngine.js), AssumptionsBox (Screen 2+3, APP_SPEC §19.8), PrimaryCta (finales Styling), Microcopy-Sublines (Screen 2+3). REG-APP-002 neu.

✅ **AP-UX-01 entschieden (2026-06-16):** Screen-Flow Dramaturgie: Stationen-Zeitreise (3 Akte, 4 Screens). Screen 2 = Zeitreise ohne Endwissen, Screen 3 = erster vollständiger Reveal + KPI-Cards. Kein Merge der Chart-Screens.

✅ **B1-AP-01 ENTSCHEIDUNGSPROTOKOLL.md angelegt (2026-06-16):** Verbindliche Architektur-Klammer für B1-AP-02 bis B1-AP-08. Sechs Stationen v2.1, Rolling Window aus latestMonth, Stations-JSON als zweite Datenschicht, keine rote Crash-Codierung, Mobile-Collapsible.

✅ **B1-AP-02 APP_SPEC.md V1.7→V2.0 (2026-06-16):** Stationen-Zeitreise-Umbau nach /spec-rewrite-guard. §8 Zwei-Datenschichten, §9 Rolling Window, §16 Screen-Tabelle + Stationen-Mechanik neu, §17 Verbotene Visuals, §20 Redaktions-Gate. Alte Screen-2-Behauptungen bereinigt. Kein Code geändert.

✅ **B1-AP-03 abgeschlossen (2026-06-16):** STATIONS_CONFIG_CONTRACT.md angelegt (Stations-JSON-Datenvertrag, 14 Abschnitte: Top-Level-Struktur, Station-Objekt, Pflichtfelder, Enums, Redaktions-Gate, Rolling-Window-Fensterfilter, Fehlerkonzept). APP_SPEC.md §8/§21/§22 aktualisiert. Kein Code geändert.

✅ **B1-AP-04 UX/Heldenreise-Abschnitt (2026-06-16):** APP_SPEC.md §23 auf V2.1 erweitert (§23.1–§23.19). Hindsight Bias als Hauptgegner (§23.11), Aha-Moment-Hierarchie (Primär/Sekundär/Transfer, §23.4), Dramaturgische Stationsrollen (§23.12), Falsche Auflösung + Finaler Wackler (§23.13–14), Informationsethik/Kein-Dark-Pattern (§23.15), Microcopy-Regeln (§23.16–18), P→B→N (§23.19). §22 Gate mit 9 AP-04-Prüfpunkten erweitert. Kein Code geändert.

✅ **B1-AP-05 A11y- und Mobile-Regeln (2026-06-16):** APP_SPEC.md §14 von 7 auf 15 Subsektionen erweitert (§14.0–§14.14). Mobile als Standardfall (§14.0), Collapsible-Zwischenstand komplett spezifiziert (Spec + A11y + Desktop, §14.5), Fokusführung Variante A/B, Screenreader-Stationswechsel (§14.1), Chart-A11y Screen 2 vs. 3 (§14.2), Reduced Motion + Timing-Grenzen (§14.6), Mobile-Layout Screen 2 (§14.8), Button-Regeln (§14.9), Touch-Ziele/Content-Dichte/Fehlermeldungen (§14.11–§14.13). §22 Gate mit 19 AP-05-Prüfpunkten. Version V2.2. Kein Code geändert.

✅ **B1-AP-07 Redaktions-Gate Stationen-Zeitreise (2026-06-16):** REDAKTIONS_GATE.md angelegt — 10 Gate-A-Regeln (G-A01–G-A10: Mindestkrise, Quellenstatus, Quellenstatus-Ehrlichkeit, CSV-Fenster, CSV-Reveal, Screen-2-kein-Endwissen, KPI-erst-Screen-3, kein-Rot, keine-Prognose, keine-Scham), 7 Gate-B-Regeln (G-B01–G-B07), 3 Gate-C-Hinweise (G-C01–G-C03), Release-Checkliste. Verweise in APP_SPEC.md §20 (V2.4), STATIONS_CONFIG_CONTRACT.md §11, QA_TEST_CASES.md (V1.1). Kein Code geändert.

✅ **B1-AP-06 Testfälle Stationen-Zeitreise (2026-06-16):** QA_TEST_CASES.md angelegt (12 Gruppen A–L, 23 Testfälle TC-Format, 18 Muss). APP_SPEC.md §19 Referenzblock + Muss-Kurzliste, Version V2.3, Nächster Schritt AP-07. Kein Code geändert.

✅ **B1-AP-08 Widersprüchliche Stellen bereinigt (2026-06-16):** 6 Dateien bereinigt: APP_SPEC Versionstabelle (V2.3→V2.4, Nächster Schritt auf AP-08 aktualisiert), SLICE_PLAN (V1.6→V2.4 + Redesign-Abschnitt Stationen-Zeitreise + Microcopy-Ref entfernt), MINI_SPEC (Header als Historisch, Screen 2→Stationen-Zeitreise, Screen 3→erster Reveal), SLICE_0_KICKOFF (Header als historisches Protokoll), SPEC_GATE_REPORT + Perplexity-Review (Archiv-Warnung). Kein Code geändert.

✅ **B1-AP-09/AP-10 abgeschlossen (2026-06-17):** produktive `config/stations.de.json` angelegt (7 Stationen v2.1, Rolling-Window-Policy, 3 source_claimed_unchecked, Redaktions-Gate G-A02 noch nicht bestanden) + `STATIONS_IMPLEMENTATION_PLAN.md` angelegt (Slices AP-11–AP-18, 6 Risiken R-01–R-06). Kein Code geändert.

✅ **B1-AP-10a Konsistenz-Nachputz (2026-06-17):** `stations.de.json` Flag-Drift bereinigt (`finalWobble = true`, `lateWobble` entfernt bei April-2025-Station). `STATIONS_IMPLEMENTATION_PLAN.md` V1.1: EditorialDegraded-Semantik korrigiert, R-02 als erledigt, Drift-Notizen entfernt. Kein Code geändert.

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

- **B1-AP-14c1** 🟡 Offen — Marker + Pulse Screen 2 (Progressive Domain LineChart, AP-14c-Zielbild aus APP_SPEC V2.7 §16.1)
- **AP-20/21** (Mixed-Rhythm CV-Heuristik) — 🟡 Aktiv, Chart-Engine, parallel möglich

---

## 4. Aktive Baustellen

| Bereich | Status | Nächster Schritt |
|---------|--------|------------------|
| Projekt-Gehirn | Masterplan komplett ✅ | APs wählen |
| Chart-Engine | Stabil, offene APs | Siehe `docs/steering/BACKLOG.md` |
| Theme | In Entwicklung | `THEME-ASSEMBLY-CHECKLIST.md` |
| CSS | Stabil | Siehe `docs/steering/BACKLOG.md` (CSS-N Items) |
| Apps | Slice 6 ✅, AP-UX-01 ✅, B1-AP-01 bis B1-AP-14b3 ✅ 2026-06-18 | B1-AP-14c1 (Marker + Pulse Screen 2) |
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

2026-06-18 — B1-AP-14b3 App-Anschluss + Smoke-Test Progressive Domain LineChart (B1-AP-14b3).
app.js: renderJourneyStep um xDisplayRange/yRangePolicy/yRangeResetKey erweitert (4 Zeilen). journeyRangeKey stabil für Journey-Run, reset bei neuer Rate. Manueller Smoke-Test Prüfschritte 1–4 ✅. Console: nur erwartete Test-Szenarien-Fehler. Ergebnisprotokoll: docs/steering/patches/B1-AP-14b3_App-Anschluss_Smoke-Test_Ergebnis.md. Nächster Schritt: B1-AP-14c1 (Marker + Pulse Screen 2).

2026-06-18 — B1-AP-14b2 Y-Policy cumulative-expand-zero implementiert (B1-AP-14b2).
4 Engine-Dateien geaendert: FwSmartYAxis (_performDynamicRescaling: rawMin=0, rawMax expandiert), BaseChartStrategy (yRangePolicy/yRangeMemory in fwContext), LineChartStrategy (Policy durch config weitergegeben), ChartEngine (axisMemory.yMaxSeen in WeakMap-State, Reset bei Key-Wechsel). Standardcharts unveraendert (opt-in Guard). Ergebnisprotokoll: docs/steering/patches/B1-AP-14b2_...md. Naechster Schritt: B1-AP-14b3 (App-Anschluss).

2026-06-18 — B1-AP-14a2 Doku-Neuschnitt Progressive Domain LineChart (B1-AP-14a2).
APP_SPEC V2.7 (§16.1 AP-14b-Architektur + AP-14c-Marker-Zielbild), ENTSCHEIDUNGSPROTOKOLL §12+§13, QA_TEST_CASES V1.4 Gruppe M (12 Testfälle TC-M01–M12), REDAKTIONS_GATE V1.3 (G-C04 Marker-Datenquelle). Kein Code, kein JSON geändert. Nächster Schritt: B1-AP-14b.

2026-06-18 — B1-AP-14r Rettungsbefund + B1-AP-14b0 Rückbau (B1-AP-14b0).
Rettungsbefund identifizierte: Commit d97231a hatte Chart.getChart()-Block entgegen Commit-Message committed (git blame bestätigt). B1-AP-14b0: 10 Zeilen Post-Render-Hack chirurgisch entfernt (app.js:455-464, commit 402f3e8). progressEl, buildVisibleChartSeries, A11y-Sperre unberührt. ATTEMPT-LOG bereinigt (kein offener BLOCKED mehr). Nächster Schritt: B1-AP-14a2 (Doku-Neuschnitt Progressive Domain LineChart).

2026-06-17 — B1-AP-14b UNTERBROCHEN — ChartEngine displayRange BLOCKED (B1-AP-14b-Analyse).
Post-Render `Chart.getChart()`-Override scheitert an 3 Ursachen: (1) RAF-Timing beim Erstrender, (2) `fwContext` Object.freeze, (3) `_generateLinearTicks()` nutzt `dataRange.max` als endLimit. Architekturkonformer Fix: `features.xDisplayMax` → `fwContext.displayRange` (L3) → `FwSmartXAxis` endLimit (L4). Alle drei Dateien protected → BLOCKED, Alberts Freigabe nötig. ✅ Erledigt und committable: progressEl-Orientierungslogik + `fw-app__journey-progress` CSS + `PEER-REVIEW-B1-AP-14b-XAxis-Architecture.md`. ⚠️ Nicht committable: `Chart.getChart()`-Block in `app.js` ist broken, muss revertiert werden. ATTEMPT-LOG gesetzt.

2026-06-17 — B1-AP-13 abgeschlossen.
`subtractMonths()` + `buildActiveJourneyWindow()` + `filterStationsForWindow()` + `buildJourneyStations()` in `app.js`. `activeWindow` in `appData` eingefroren. `dynamic_latest_month` → CSV-`latestMonth` aufgelöst. 3 `source_claimed_unchecked`-Stationen still gefiltert (4 sichtbare Stationen < `minVisibleStations:5` — Gate-Diagnose folgt in AP-14). Nächster Schritt: B1-AP-14.

2026-06-17 — B1-AP-11 + B1-AP-12 abgeschlossen.
`loadStations()` per `fetch` + `Promise.all` (AP-11); `validateStationsJson()` gegen `STATIONS_CONFIG_CONTRACT.md` (AP-12). Ungültige configs → Error(d) „Die Zeitreise kann gerade nicht geladen werden." Kein Fallback. Nur `app.js` geändert. Nächster Schritt: B1-AP-13.

2026-06-17 — B1-AP-09/AP-10/AP-10a abgeschlossen.
produktive `config/stations.de.json` angelegt + Flag-Drift bereinigt (finalWobble = true, lateWobble entfernt). `STATIONS_IMPLEMENTATION_PLAN.md` V1.1 (§1–§11, Slices AP-11–AP-18, 6 Risiken; EditorialDegraded-Semantik + R-02 bereinigt). Kein Code geändert. Nächster Schritt: B1-AP-11.

2026-06-16 — B1-AP-08c Restdrift bereinigt (B1-AP-08c).
APP_SPEC §8/§12/§19 Fallback-Formulierungen korrigiert; STATIONS_CONFIG_CONTRACT rote Visualregeln endgültig config-ungültig; QA TC-H05 erweitert; PROJECT-STATUS/Memory auf V2.5/AP-09 synchronisiert. Kein Code geändert. Nächster Schritt: B1-AP-09.

2026-06-16 — B1-AP-08 Widersprüchliche Stellen bereinigt (B1-AP-08).
6 Dateien bereinigt: APP_SPEC Versionstabelle (V2.3→V2.4), SLICE_PLAN (V1.6→V2.4 + Redesign-Abschnitt + Microcopy-Ref), MINI_SPEC (Header als Historisch, Screen 2→Stationen-Zeitreise, Screen 3→erster Reveal), SLICE_0_KICKOFF (Header historisch), SPEC_GATE_REPORT + Perplexity-Review (Archiv-Warnung). Kein Code geändert. B1-AP-01 bis B1-AP-08 alle ✅.

2026-06-16 — B1-AP-07 Redaktions-Gate Stationen-Zeitreise abgeschlossen (B1-AP-07).
REDAKTIONS_GATE.md angelegt: 10 Gate-A-Regeln (G-A01–G-A10 release-blockierend), 7 Gate-B-Regeln (G-B01–G-B07 qualitätskritisch), 3 Gate-C-Hinweise (G-C01–G-C03). Release-Checkliste, Manuell/Technisch-Trennung, Prod-/Dev-Modus-Abschnitt. Verweise in APP_SPEC.md §20 (V2.4), STATIONS_CONFIG_CONTRACT.md §11, QA_TEST_CASES.md (V1.1). Kein Code geändert. Nächster Schritt: B1-AP-08.

2026-06-16 — B1-AP-06 Testfälle Stationen-Zeitreise abgeschlossen (B1-AP-06).
QA_TEST_CASES.md angelegt: 12 Gruppen A–L, 23 Testfälle TC-Format (18 Muss). APP_SPEC.md §19 Referenzblock + Muss-Kurzliste, Stand-Datum V2.3, Nächster Schritt AP-07. NAVIGATION.md B1-Note aktualisiert (AP-05/06 ✅). BACKLOG.md B1-AP-06-Zeile entfernt. Kein Code geändert.

2026-06-16 — B1-AP-05 A11y- und Mobile-Regeln abgeschlossen (B1-AP-05).
APP_SPEC.md §14 von „A11y-Vertrag" (7 Subsektionen) auf „A11y- und Mobile-Regeln" (15 Subsektionen, §14.0–§14.14) erweitert. Mobile als Standardfall (§14.0), Collapsible-Zwischenstand (§14.5), Fokusführung Variante A/B, Screenreader-Stationswechsel (§14.1), Chart-A11y Screen 2/3 (§14.2), Reduced Motion + Timing-Grenzen (§14.6), Mobile-Layout (§14.8), Button-Regeln (§14.9), Touch-Ziele/Content-Dichte/Fehlermeldungen (§14.11–§14.13). §22 Gate mit 19 AP-05-Prüfpunkten. Version V2.2. Kein Code geändert.

2026-06-16 — B1-AP-04 UX/Heldenreise-Abschnitt abgeschlossen (B1-AP-04).
APP_SPEC.md §23 auf V2.1 erweitert (§23.1–§23.19). Hindsight Bias als Hauptgegner (§23.11), Aha-Moment-Hierarchie (Primär/Sekundär/Transfer, §23.4), Dramaturgische Stationsrollen (§23.12), Falsche Auflösung + Finaler Wackler (§23.13–14), Informationsethik/Kein-Dark-Pattern (§23.15), Microcopy-Regeln (§23.16–18), P→B→N (§23.19). §22 Gate mit 9 AP-04-Prüfpunkten. Kein Code geändert.

2026-06-16 — B1-AP-03 Stations-JSON-Datenvertrag abgeschlossen (B1-AP-03).
STATIONS_CONFIG_CONTRACT.md (14 Abschnitte) angelegt. APP_SPEC.md §8/§21/§22 aktualisiert. Kein Code geändert.

2026-06-16 — B1-AP-01/AP-02 Zeitreise-Umbau abgeschlossen (AP-01-AP-02-Zeitreise-Umbau).
ENTSCHEIDUNGSPROTOKOLL.md (B1-AP-01) als Architektur-Klammer für AP-02 bis AP-08 angelegt: Stationen-Zeitreise (3 Akte, 6 Stationen v2.1), Rolling Window aus latestMonth, Stations-JSON als zweite Datenschicht, keine rote Crash-Codierung, Mobile-Collapsible. APP_SPEC.md V1.7→V2.0 (B1-AP-02) nach /spec-rewrite-guard: §8 Zwei-Datenschichten, §9 Rolling Window, §16 Screen-Tabelle neu, §17 Verbotene Visuals, §20 Redaktions-Gate. AP-UX-01 damit erledigt. Kein Code geändert.

2026-06-16 — APP-01 Slice-6 abgeschlossen (APP-01-Slice6).
VertikaleLinie (afterDraw-Plugin ChartEngine.js, gestrichelt blau #0071bf am letzten Datenpunkt), AssumptionsBox (Screen 2+3, APP_SPEC §19.8), PrimaryCta (Screen 4, finales Button-Styling), Microcopy-Sublines. ChartEngine.js mit Alberts Freigabe geändert. REG-APP-002 in Regression-Matrix.

2026-06-15 — APP-01 Slice-5 abgeschlossen (APP-01-Slice5-Diskussion).
Screen-Flow 1→4 implementiert und getestet (Szenarien S–X). UX-Diskussion: Slider-Kopplung ok, Screens-2+3-Doppelgänger ist erwarteter Slice-5-Zustand (VertikaleLinie kommt in Slice 6). SF-02 (NumericInput Hybrid) auf Slice 7 vorgezogen (Mobile ≥ 50 % Traffic). Microcopy-Schicht für Slice 6 geplant. SLICE_PLAN, NAVIGATION, BACKLOG-ARCHIV aktualisiert.

2026-06-15 — P→B→N-Analyse + Decompose (AF-21-23-PBN-decompose).
P→B→N Framework (Mark Pincus) als operativer App-Building-Layer analysiert. Proven→Tailwind-Standardkomponenten, Better→ein klar formulierter Nutzenmoment pro App-Familie (10v10-Test), New→isoliert. AF-21 (Family-Standards), AF-22 (APP_SPEC-Template-Block), AF-23 (Pincus-Check als Pre-Code-Gate) in BACKLOG eingetragen.

2026-06-15 — Memory-Portabilität (ST-18-memory-merge).
37 Memory-Dateien aus zwei Verzeichnissen zusammengefuehrt (18 Wege-Merge + 4 Laptop-only + 15 Heim-PC-only). Symlink C:\Users\Albert HP PC\.claude\...\memory auf NAS-UNC-Pfad (mklink /D, Developer Mode noetig). Setup-Script tools/setup-memory-junction.ps1 angelegt. Brain-Silo aufgeloest. Laptop-Setup: einmalig setup-memory-junction.ps1 ausfuehren.

2026-06-11 — APP-01 Slice-4 implementiert (APP-01-Slice-4-Implementierung).
`renderFromData()` in ChartEngine.js: WeakMap-State, Deep-Freeze, Feature-Normalisierung, Container-Guards. `rangeControls`-Guard in FwRenderer._renderControls(). Headline-Guard in ChartEngine._draw(). app.js: ChartEngine-Import, chartSection-Container, initialer Render, Slider-Smart-Update. app.css: `.fw-app__chart-section`. FRICTION: `app.test.html` fehlte Chart.js-Script-Tag. 20+1 Szenarien bestätigt. REG-APP-001 neu.

2026-06-10 — APP-01 Slice-4 / Gates 1–3 + Implementierungs-Handover (APP-01-Slice-4-Implementierung).
Gate 1 (Spec-Trace-Matrix), Gate 2 (LineChartStrategy-Contract + WeakMap + UI-Analyse), Gate 3 (Implementierungsplan) freigegeben. Architekturentscheidung: `config.features` als neutrale Fähigkeitswahl — keine AppChart-Sonderlogik, kein `isAppChart`, kein `noRangeButtons`. 4 Dateien im Scope: ChartEngine.js, FwRenderer.js, app.js, app.css. Implementierungs-Handover vollständig: `docs/steering/handovers/HANDOVER-APP-01-SLICE-4-IMPLEMENTIERUNG-2026-06-10.md`. Kein JS geändert.

2026-06-10 — APP-01 Slice-4-Gate / OA-02 Advocatus-Diaboli Revisionen 1–4 + Handover (APP-01-Slice-4-Gate).
Gate-Revisionen 1–4 für `renderFromData()` ausgeführt. Kernproblem identifiziert: inline `appDataLineStrategy` in ChartEngine.js = Layer-2-Verschmutzung. Revision 4 nicht freigegeben. Vollständiger Braindump mit Spec-Trace-Prompt in `docs/steering/handovers/HANDOVER-APP-01-SLICE-4-CHARTENGINE-PFAD-2-2026-06-10.md`. Neues Verzeichnis `docs/steering/handovers/` angelegt. NAVIGATION.md aktualisiert. Kein JavaScript geändert.

2026-06-10 — APP-01 Slice-4-Gate (APP-01-slice4-gate).
OA-02 Advocatus-Diaboli-Prüfung als Pflicht-Gate (`###`) in SLICE_PLAN.md Slice-4-Abschnitt verankert. 3 Risiken (Legacy-Vertrag, Adapter-Sonderlayer, fw-appchart-Verfestigung) + 5 Pflichtfragen vor Slice-4-Code dokumentiert. BACKLOG APP-01-Zeile um Erinnerungsanker ergänzt. Formaler Nachputz: Gate-Heading auf `###` abgesenkt, Patch-Quittung präzisiert. Kein Code, kein neuer AP.

2026-06-10 — OA-02-Nachputz: Doku-Konsistenz OA-02 geschlossen.
`// NEW`-Marker aus APP-INTERFACE.md und CHART_ENGINE_ROLE_AND_INTEGRATION.md entfernt. D-OA-02-1 im DECISION-LOG angelegt. OA-02-Status in ADR-COMP-ARCH-01 und 03_APP_FACTORY_STANDARD_DRAFT §6 auf beschlossen aktualisiert. P-01–P-11 → P-01–P-10 in ADR korrigiert. Kein JavaScript geändert. Commit-Message-Artefakt `7d3a803` verbleibt historisch.

2026-06-10 — OA-02-Dissens-3: Markup-Vertrag für In-App-Charts.
Separater `fw-appchart`-Marker als kollisionsfreier Zielcontainer für app-berechnete Charts dokumentiert. `financial-chart-module` bleibt exklusiv Legacy-/CSV-Vertrag. Container-Guard-Pflicht verankert. 3 Dokumente gepatcht: APP-INTERFACE.md §4, CHART_ENGINE_ROLE_AND_INTEGRATION.md §1, DECISION-LOG.md D-OA-02-3. OA-02 vollständig abgeschlossen (alle 3 Dissense ✅).

2026-06-10 — OA-02-Dissens-2: Vereinheitlichung auf richtiger Ebene.
Zwei offizielle ChartEngine-Einstiege dokumentiert (deklarativer Init-Pfad + Daten-Bridge-Pfad), gemeinsamer Kern. Verantwortungsgrenzen App ↔ Engine explizit festgehalten. 4 Dokumente gepatcht: APP-INTERFACE.md §4 + §10, CHART_ENGINE_ROLE_AND_INTEGRATION.md §1, ARCHITECTURE STRATEGY PAPER VX.md, DECISION-LOG.md D-OA-02-2. Lifecycle und API-Signaturen: separates Gate bei ChartEngine.js-Implementierung.

2026-06-09 — OA-02-Dissens-1: Terminologische Schärfung Component Composition Architecture.
ADR-COMP-ARCH-01, APP-INTERFACE.md (§1, §3, §3.2), 03_APP_FACTORY_STANDARD_DRAFT.md (§6): „Standalone"-Begriff entfernt, Legacy-Vertrag-Framing verankert. docs/steering/patches/ angelegt. AF-20 für CHART_ENGINE_ROLE_AND_INTEGRATION.md-Check in BACKLOG eingetragen.

2026-06-09 — Skill /archivieren spezifiziert (SKILL-ARCHIV-01).
`docs/steering/SKILL-ARCHIVIEREN-SPEZIFIKATION.md` angelegt: 6 Arbeitsphasen (Phase 0 Scope bis Phase 6 Abschlussbericht), 9 Klassifikationskategorien, 4 Freigabe-Gates (Klassifikation / Kuratierter Inhalt / Git-Status / Staging), Abgrenzung zu distill/kassensturz/start/abschluss-ritual, Umsetzungshinweise für SKILL-ARCHIV-02. NAVIGATION.md + BACKLOG-ARCHIV.md + Memory aktualisiert.

2026-06-08 — Reststaub-Cleanup Archivstrategie (AP-KORR-9).
7 Dateien, 20 Stellen: sichtbare Marker (// NEW ×4, // CHANGED ×2) entfernt; veraltete AP9-Forward-Referenzen (6 Stellen) neutralisiert; Faktenwidersprüche in legacy-map.md bereinigt (docs/App-Fabrik/_archive/ 0 KB → 349 Bytes; Inhalte alte Site 0 KB → 119 Bytes); Nicht-Routing-Satz in 4 lokale READMEs ergänzt. Alle Kontrollfragen grün.

2026-06-08 — Archivstrategie-Nachputzserie AP-KORR-1 bis AP-KORR-8 vollständig abgeschlossen.
AP-KORR-7: `docs/steering/ARCHIV-SONDERFAELLE.md` angelegt — 3 Sonderfälle (archivliste.md, docs/App-Fabrik/_archive/, Inhalte alte Site/blog/archiv/) inventarisiert, Entscheidungen bei Albert. Archiv/legacy-map.md minimal ergaenzt. AP-KORR-8: Abschluss-Audit — 10/10 Pruefpunkte bestanden, P2-Resthinweis (KAPITELRAHMEN.md stale Forward-Referenz, nicht operativ). KORR-Serie abgeschlossen, keine Blocker.

2026-06-08 — LLM-Dumps in local-Quarantäne verschoben (AP-KORR-6).
CLAUDE-pre-synthese + NAVIGATION-pre-synthese (2026-05-03) aus Archiv/optimierung-projektsteuerung/.../Archiv/ nach Archiv/local/optimierung-projektsteuerung/ verschoben. Quellordner danach leer. legacy-map.md: 6 Stellen auf ERLEDIGT_AP_KORR_6 gesetzt. Korrekturserie AP-KORR-1 bis AP-KORR-6 abgeschlossen.

2026-06-08 — AP-KORR-5: KNOWN-ISSUES-SCHLACHTPLAN-ARCHIV.md als POSTMORTEM markiert.
Schutzheader eingefügt (YAML-Frontmatter + Archivhinweis, aktive Steuerquellen benannt). `legacy-map.md`: Status UNKLAR_PRUEFEN → POSTMORTEM / ERLEDIGT_AP_KORR_5 in Haupttabelle, Archivdateien-Tabelle, Offene Risiken und Folge-APs. Historischer Inhalt unverändert.

2026-06-08 — Archivstrategie-Korrekturserie AP-KORR-1 bis AP-KORR-4 abgeschlossen.
Nicht-Routing-Regel in NAVIGATION.md verankert (AP-KORR-1). `Archiv/README.md` als Root-Kontextschutz angelegt (AP-KORR-2). `legacy-map.md` nach Setup-Serie synchronisiert — alle `README_ANWENDEN`-Driftpunkte bereinigt (AP-KORR-3). `ARCHIV-STRATEGIE.md` § Erwartete Folge-APs → § Setup-Serie AP 3–9 Abschlussstand, Nicht-Routing-Regel in Archivvertrag und README-Schablone ergänzt (AP-KORR-4). Keine AP10-Pflichtkette.

2026-06-08 — Root-Making-of-Rahmen vorbereitet (AP-8 / ST-26).
`Archiv/making-of/` angelegt: `README.md` (Schutzregel, Quellenlogik, Zweck) und `KAPITELRAHMEN.md` (7 Kapitelkandidaten, 6 mit Belegen aus `legacy-map.md`, Kapitel 01 RAHMEN_OHNE_BELEG). `legacy-map.md` minimal aktualisiert (making-of/ eingetragen, Zähler 15→16). AP 9 (Pilotarchiv: `docs/spec/archiv/`) startbar.

2026-06-08 — Archiv-README-Schablone angewandt (AP-7 / ST-28).
4 lokale Archive mit Kontextschutz-README versehen: `Apps/prokrastinations-preis/Archiv/`, `docs/design-system/archiv/`, `docs/spec/archiv/`, `docs/steering/archiv/`. Schutzsatz + Archivvertrag + Erstellt-Datum 2026-06-08. `legacy-map.md` aktualisiert (4 Einträge `README vorhanden: ja`). Offene Folgepunkte: LOCAL_PRUEFEN (`Archiv/optimierung-projektsteuerung/...`), SONDERFALL_PRUEFEN (`docs/App-Fabrik/_archive/`). AP 8 (Root-Making-of-Rahmen) startbar.

2026-06-08 — Föderierter Archivkatalog erstellt (ST-25 / AP-6).
`Archiv/legacy-map.md` angelegt: 15 Archivorte kartiert (1 Root-Archiv, 6 lokale Archive, 1 local/-Quarantäne, 4 Archivdateien, 3 Sonderfälle). Pilotkandidaten: docs/spec/archiv/ (Kandidat 1) + Apps/prokrastinations-preis/Archiv/ (Kandidat 2). AP-9-Startbasis für docs/spec/archiv/ vollständig. Archiv-Block ST-20–ST-25 abgeschlossen.

2026-06-08 — Archiv-Block abgeschlossen (ST-20–ST-24).
Archiv-Infrastruktur (ST-20/21): .gitignore umgestellt, Archiv/local/ als Quarantäne (203 Dateien, 31 MB). Föderiertes Archivmodell (ST-22): ARCHIV-STRATEGIE.md neu. Archivvertrag (ST-23): Statuswerte, README-Schablone, Nachfolgerregel. Archiv-Inventar (ST-24): ARCHIV-INVENTAR.md mit 15 Archivorton — Befund für ST-25.

2026-06-06 — Memory-System Rekonstruktion (ST-19).
.claude/memory/ angelegt: 18 Feedback-Files aus patterns.md + session-log rekonstruiert (~80–90 % Präzision), MEMORY.md-Index, /start Schritt 1b, distill-Pfad, abschluss-ritual Memory-Pfad korrigiert. ST-18 (Heim-PC-Merge) in BACKLOG aktiv.

2026-06-05 — Distill 6 (DIST-06).
39 Log-Einträge destilliert. 5 Patterns promoted: feedback_python_powershell_tooling, feedback_gate_scope_dialog, feedback_csvparser_vertrauenswuerdig, feedback_edit_vorab_lesen, feedback_abschluss_ritual_timing.

2026-06-05 — COMP-ARCH-Verankerung (COMP-ARCH-01).
Component Composition Architecture als verbindliches Architekturmodell verankert. §1a in 03_APP_FACTORY_STANDARD_DRAFT.md (Lego-Brett-Modell, Komponentenklassen, Chart entzaubert), CHART_ENGINE_ROLE_AND_INTEGRATION.md §1 Einordnung, APP-INTERFACE.md §4 Querverweis, ADR-COMP-ARCH-01 angelegt. OA-02-Peer-Review erstmals committed.

2026-06-05 — APP-01 Slice 3 abgeschlossen (APP-01-slice3).
clamp() + parseOptions() (data-fw-options Whitelist: defaultRate/startBetrag), renderContent() komplett neu: Slider + wrapping label (Q-06), ARIA-Slider, ARIA Live Region (input/change getrennt), app.css Slider-Stile (flex/wrap, accent-color, prefers-reduced-motion). Q-06 in Decision Log + Factory Standard formalisiert. NB-5 (synchrone DOM-Neuaufbau) dokumentiert. 20 Szenarien A–T bestätigt, Viewport 375px ✅.

2026-06-05 — APP-01 Slice 2 abgeschlossen + Nachputz Slice-2-Sync (APP-01-slice2).
marketTimeStrategy() (Anteilslogik, 120 Monate), buildAppContext(), renderKpiCards() (dl/dt/dd SafeDOM), renderA11yRegion() (aria-live polite). P-11 Fetch-Dedup-Cache formalisiert (Factory-Standard §9). 16 Testszenarien A–P bestätigt (36.000 € / 72.176 € / +36.176 €). Nachputz: APP_SPEC §1 + PROJECT-STATUS §3/§4/§8/§9 auf Slice-3 aktualisiert; _loadDataImpl um Date-Objekt-Wächter (`row.date instanceof Date`) + Numerik-Wächter (null/NaN/0/nicht-endlich) erweitert; Szenarien Q/R + 2 Test-CSVs ergänzt.

2026-06-05 — APP-01 Slice 1 implementiert (APP-01-slice1).
CSVParser-Import (ES-Modul), loadData() mit Two-Step-Validierung (unitKey CURRENCY_EUR, ≥120 Zeilen, index_value-Spalte), Object.freeze AppData (Date→ISO-String-Mapping). Alle 5 Daten-States (Loading/Content/Error-b/c/Empty). app.test.html auf 14 Szenarien A–N erweitert, 5 Test-CSVs in test-data/ angelegt. Full-Gate bestanden, Szenarien A–N getestet — alle korrekt.

2026-06-04 — APP-01 Slice 0 implementiert (APP-01-slice0-impl).
app.js (ES-Modul, Slug-Whitelist, Guard, SafeDOM), app.css (.fw-app-Namespace, 4 State-Blöcke), app.test.html (7 Szenarien A–G inkl. XSS). Full-Gate bestanden, Szenarien A–G getestet — keine Fehler. Slice-0-Status in SLICE_PLAN und SLICE_0_KICKOFF aktualisiert.

2026-06-04 — Konsistenzpatch Datenlayer nach raw-to-csv und MSCI-Datasets (AP-DATA-12).

Statusdrift nach Dataset-Contracts und raw-to-csv bereinigt: PROJECT-STATUS §3/§4 auf Slice-0 als nächsten Schritt aktualisiert; OFFENE-ARBEITSPUNKTE AP-DATA-04 und AP-DATA-06 auf abgeschlossen gesetzt; DATENQUELLEN-GOVERNANCE data-raw/README-Verweis entfernt; DATASET-CATALOG und ACWI-Contract markieren ACWI als Reserve-/Vergleichsdataset; APP_SPEC AppContext-Beispiele entkonkretisiert; raw-to-csv.py und /raw-to-csv Skill auf V1-Scope MSCI-EUR-Indexreihen begrenzt. Keine App-Code-, Engine-Code-, Parser- oder CSV-Wertänderungen.

2026-06-03 — Datenlayer-Konsistenzpatch (APP-01-datenlayer-konsistenz).
APP_SPEC V1.4: §7 auf zentralen Datenlayer umgestellt (Pfade → Theme/assets/data/b1/, CSV-Format date/index_value/YYYY-MM-DD, Monatsultimo, Governance-Links → docs/data/), §7.3 Dataset Contract Hinweis, §7.4 App-spezifische Verbote neu, §13 Pseudocode synchronisiert. NAVIGATION.md: Punkt 12 für datengetriebene Apps ergänzt (docs/data/ Pflichtlektüre). BACKLOG: AP-DATA-01 in Aktiv, AP-DATA-04/05 in Offen. BACKLOG-ARCHIV: AP-DATA-07 abgeschlossen. DECISION_LOG: P-01 als veraltet markiert, D-APP-01-E02 angelegt. 02_OPEN_QUESTIONS Data-01: B-01-D geklärt (Projektinhaber erstellt CSV redaktionell), B-01-A teilgeklärt (Net Return stark bevorzugt). CSVParser, FinanzwesirData, Engine-Dateien unberührt.

2026-06-03 — Datenlayer Governance eingeführt (APP-01-datenlayer-governance).
docs/data/ + Theme/assets/data/b1/ angelegt. 7 Governance-Dateien (README, DATENQUELLEN-GOVERNANCE, SOURCE-TIERS, DATASET-CATALOG, DATASET-CONTRACT-TEMPLATE, INDEX-RETURN-VARIANTEN, OFFENE-ARBEITSPUNKTE). CSVParser und FinanzwesirData.js nicht berührt. 7 APs (AP-DATA-01–07) für nächste Schritte (Quellenrecherche, Dataset Contract, Dateiname CSV, App-Spec-Umstellung).

2026-06-03 — APP_SPEC V1.3 CSV-Konsistenz (APP-01-csv-sync).
JSON→CSV in APP_SPEC §3/§13/§15 (Datenpipeline-Referenzen) synchronisiert. E-01-Invariante präzisiert: Calculator-UI-Primitive erlaubt solange Szenario-/Story-App dient. Tippfehler MarketTimeStrategy in §11 + §13 korrigiert. Version Draft V1.0→V1.3 in Status-Tabelle. DECISION-LOG E-02, 05_PILOT_STRATEGY Pilot-2-Beschreibung, 02_OPEN_QUESTIONS Data-01 V1.2→V1.3 synchronisiert.

2026-05-28 — B-02 + B-03 entschieden (APP-01-B02-B03-Entscheidung).
B-02: Berechnungsformel = Anteilslogik (monatlicher Anteilskauf) — keine Annuität, keine Durchschnittsrendite. B-03: Screen-Flow = Button-getrieben V1 — kein Autoplay, kein Scroll-Trigger, prefers-reduced-motion wird respektiert. APP_SPEC V1.3, DECISION-LOG (D-APP-01-B02 + D-APP-01-B03), PROJECT-STATUS aktualisiert.

2026-05-28 — B-01 Spec-Konsolidierung (APP-01-B01-Spec-V1.2).
Datenbasis = MSCI World Index, monatliche Indexwerte (kein ETF-Proxy). Format = CSV (Semikolon, Komma-Dezimal). APP_SPEC §7.1–§7.5, §8, §10, §13, §16, §17, §18, §19.8 umgestellt. Neue §7.3 README-Pflichtfelder. B-01-A/B/C/D offen bis CSV-Beschaffung. BACKLOG, NAVIGATION, 02_OPEN_QUESTIONS.md Data-01 synchronisiert.

2026-05-28 — E-01 + E-02 entschieden (APP-01-E02-Entscheidung).
E-01: prokrastinations-preis = Szenario-/Vergleichs-App mit Storytelling-Elementen (kein Calculator). E-02: neue Pilot-Reihenfolge — risiko-uebersetzer Pilot-1 (Calculator-Pilot), prokrastinations-preis Pilot-2 (Daten-/Chart-/Story-Pilot). 05_PILOT_STRATEGY.md, APP_SPEC §1/§3/§17/§19.10, NAVIGATION.md, DECISION-LOG (D-APP-01-E01 + E02) aktualisiert.

2026-05-28 — B1 Slice-0-Reboot abgeschlossen (APP-01-Slice-0-Reboot).
APP_SPEC V1.0 (Marktzeit-Mechanik) neu erstellt — 19 Abschnitte (tech-spec-app + heldenreise). App-Familie: Szenario-/Vergleichs-App mit 4-Screen-Flow, externe MSCI-JSON-Daten. Pilot-Strategie-Konflikt entdeckt und als E-02 für Albert markiert. NAVIGATION.md Ausnahme-B1-Warnung → Reboot-Notiz. BACKLOG: APP-01 aktualisiert + APP-01-E01/E02/B01 neu.

2026-05-18 — Block-B-Restinkonsistenzen bereinigt (Block-B-Restinkonsistenzen).
App-Register B4/B5 aus Zusatz-Modul-Tabelle → Master-App-Ordner-Tabelle (21 Einträge). APP_INVENTORY + App-Register D.1 auf Epochen-/30-Jahres-Logik. BACKLOG APP-01 → B1 Slice-0-Reboot. NAVIGATION [!warning]-Block B1-Ausnahme. 00_STATUS Zählung 19→21 / 22→24 + Nächste Schritte + Robuste Arbeitsannahmen. AF-16 archiviert, AF-15 auf MINI_SPEC_MAPPING-Rest reduziert.

2026-05-18 — Kassensturz KW 21 + Distill 3 (distill-3).
7 FRICTION-Einträge destilliert. 4 neue Observing-Einträge (Whitespace vor Edit, falsches Shell-Tool, Kontext-Komprimierung, Slice-Plan-Lücken). Reoccurrence feedback_glob_vs_read vermerkt. NAVIGATION.md: docs/Marke/ + docs/App-Fabrik/_prompts/ eingetragen. BACKLOG-ARCHIV DIST-03 ergänzt. Commit-Messages für _prompts/, Marke/, App-Fabrik-Querverweise erzeugt.

2026-05-11 — SLICE_0_KICKOFF.md erstellt + Alberts Freigabe (APP-01-slice0-kickoff, slice0-kickoff).
Anti-Agreeableness-Gate bestanden: 18 Annahmen, 11 Failure Cases, 8-Regret-Risiken. 3 Kickoff-Ergänzungen zu SLICE_PLAN: A0-7 (double-init Guard), A0-8 (XSS-Schutz), A0-9 (CSS-Leak-Check).

2026-05-11 — Pre-Code-Gate Full bestanden, SLICE_PLAN.md erstellt (APP-01-pre-code-gate, pre-code-gate-sliceplan).
Slices 0–7b dokumentiert; 4 Korrekturen (Container-Selektor, Szenarien C–E, Kein-Container-Codeverhalten, Loading-State-Formulierung); NB-2 entschieden: internes Config-Objekt (RFC §D5). NAVIGATION.md: SLICE_PLAN.md als Pflichtlektüre Item 11 ergänzt. Security-Sync synchron.

2026-05-11 — Subagent-Policy als SSoT konsolidiert (ST-16, subagent-policy-konsolidierung).
`subagent-dispatch/SKILL.md` zentralisiert; Dispatch-Quittung + Rückfall-Regel als Pflicht verankert; Anti-Drift in 8 Commands/Skills; NAVIGATION.md + PRAXIS-ANLEITUNG.md mit `SUBAGENT-POLICY-PRAXIS.md`-Referenz. CLAUDE.md unverändert.

2026-05-11 — SessionStart-Hook finalisiert, Projektsteuerung synchronisiert (ST-15, session-start-finalisierung).
HOOK-META-Block in PROJECT-STATUS.md eingeführt; session-start.ps1 auf HOOK-META umgestellt (DEGRADED-Erkennung, UTF-8, ATTEMPT-LOG-Parser korrigiert); start.md um Hook-Status-Check und spec-scout-Benennung erweitert; NAVIGATION.md Wiedereinstieg auf Zwei-Stufen-Modell; abschluss-ritual HOOK-META-Sync-Pflicht; abschluss-scout auf Read/Grep/Glob/LS beschränkt.

2026-05-10 — SECURITY-BASELINE.md App-Fabrik-gatefähig gemacht (ST-13, security-baseline-sync).
75 → 286 Zeilen. Quellenhierarchie (§2), App-Fabrik-Regeln §6.1–§6.12, Security-Sync-Regel (§8), Gate-Prüffrage (§10) neu.
04_CLAUDE_WORKFLOW_DRAFT.md, tech-spec-app/SKILL.md, app-spec-create.md und 01_DECISION_LOG.md (SEC-01–SEC-03) synchronisiert.

2026-05-10 — 4 Konsistenz-Korrekturen (ST-14, konsistenz-korrektur).
Phase-7-Testfall Empty→Error, A-06-Titel präzisiert (Bootstrapper nicht verboten), §6.11 A-08-Verweis getrennt, SPEC_GATE_REPORT Nachtrag.

2026-05-10 — Spec-Gate prokrastinations-preis bestanden (APP-01-spec-gate).
APP_SPEC.md V0.3 gegen alle 9 Prüfbereiche geprüft (Ghost-Card-Vertrag, AppContext, State-Modell, A11y, SECURITY-BASELINE.md 9 Regeln, UX/Heldenreise, RFC-Kompatibilität). Keine echten Blocker. 4 Nicht-Blocker (CTA-URL, Config-Form, Theme-Tokens, Bootstrapper) mit definierten Klärungszeitpunkten. SPEC_GATE_REPORT.md neu angelegt. DECISION_LOG SG-01 eingetragen. Alberts 4 RFC-§11-Bestätigungen formalisiert (Bootstrapper, lokale test.html, Core-Extraktion nach Pilot 2, Fallback-Tokens). Memory-Regel Glob-vs-Read ergänzt.

2026-05-10 — Implementation-RFC in App-Fabrik-Workflow eingehängt (ST-12).
APP_FACTORY_IMPLEMENTATION_RFC.md ist jetzt Pflichtquelle für Pre-Code-Gate: Slice-Plan Pflicht, Vertical Slicing Pflicht, keine stillen Framework-/Build-Entscheidungen. 04_CLAUDE_WORKFLOW_DRAFT.md Phase 3/4/5, tech-spec-app/SKILL.md und app-spec-create.md aktualisiert.

2026-05-10 — App-Fabrik RFC-Dateien eingeräumt (AF-11).
APP_FOLDER_STRUCTURE.md neu angelegt (kanonische Dateiliste Phase 0/1/2), NAVIGATION.md Item 9 ergänzt, _working/implementation-rfc/ konsolidiert.

2026-05-10 — APP_SPEC prokrastinations-preis V0.3 final — Peer-Review-Nachschärfung (APP-01-nachschaerfung).
AssumptionsBox verbindlich (Pflichtzeile + expandierbare Hinweise), vergleichsAnker optional, KpiCard-Reihenfolge positiv-zuerst, 3 neue Spec-Gate-Prüfpunkte. Spec-Gate-reif.

2026-05-10 — APP_SPEC prokrastinations-preis V0.3 — heldenreise-Ergänzung (APP-01-heldenreise).
§18 Beweisdramaturgie (10 Unterabschnitte), §13.1 Label-Konventionen (Krug), §17 UX-Gate (5 Punkte). Alle technischen Entscheidungen unverändert. Spec vollständig: technische + UX-Schicht.

2026-05-10 — Subagenten-Setup v2.1.1 installiert (ST-10).
CLAUDE.md auf v2.1.1: `.claude/agents/` in Autoritäten-Tabelle, Subagent-Check geschärft (beobachtbare Kriterien, Urteilsschritte bleiben in Hauptinstanz). subagent-dispatch.md: Token-Schätzung entfernt, codebase-scout/spec-scout/regression-scout als bevorzugte Agenten. 3 Haiku-Agenten-Dateien angelegt.

2026-05-10 — Skill tech-spec-app + Command app-spec-create angelegt (ST-08 + ST-09).
Skill .claude/skills/tech-spec-app/SKILL.md: 18 Pflichtabschnitte, 3 Ausgangsfälle (A/B/C), Quellenhierarchie, Nie-tun-Liste.
Command .claude/commands/app-spec-create.md: 5 Phasen (Intake / Mini-Spec / tech-spec-app / heldenreise / Spec-Gate), Technik-Gate + UX-Gate.
NAVIGATION.md um beide Einträge erweitert.

2026-05-10 — heldenreise Skill in NAVIGATION.md registriert (ST-07): Skills-Tabelle + App-Abschnitt, manuell-only dokumentiert.
DIST-02: 20 session-log-Einträge destilliert — 3 neue Memory-Dateien (Zahlen/Referenzen verifizieren, Pilot-Status-Sprache, Verbote explizit formulieren).

2026-05-10 — APP_SPEC prokrastinations-preis gegen MINI_SPEC abgeglichen (APP-01-abgleich).
Drittes ResultTemplate „mathematik" aus Hauptdokument-Kernbotschaft ergänzt (§6 Config-JSON). Range-Entscheidung prokrastinationsJahre 1–20 dokumentiert (§4). Keine Blocker. Spec-Gate-reif bestätigt.

2026-05-10 — Mini-Specs für alle 21 App-Ordner angelegt (AF-10).
MINI_SPEC_FROM_HAUPTDOKUMENT.md in jedem App-Unterordner: 18 Haupt-Apps 1:1 aus ETF-Apps-Hauptdokument.md, 3 Multi-Modul-Module (rollierende-sparplaene/B2, investment-universum/C1, weltkarte-etf-indizes/C1+C3).
MINI_SPEC_MAPPING.md als Gesamt-Index unter /Apps/. APP_SPEC.md prokrastinations-preis unberührt.

2026-05-10 — CLAUDE.md Punkt 7: Bulk-Write-Trigger + Haiku-Default ergänzt (ST-06).
Erkenntnisschleife: Haiku nicht proaktiv eingesetzt → als Trigger in CLAUDE.md §Eingangs-Routing verankert.

2026-05-10 — APP_SPEC prokrastinations-preis V0.2 Spec-Gate-reif (APP-01-spec).
17 Pflichtabschnitte nach App-Fabrik-Workflow V0.2: Ghost-Card-Vertrag, AppContext-Schema Calculator-Familie (Arch-06), A11y-Vertrag (Arch-07), Input-Reise (P-10), 5 Pilot-1-Entscheidungen (kein Chart, Festwert-Rendite, neutral-Ton, intern gebündelte Config, Slug→Error-State). Bereinigung: falsche O-Verweise, JSON-Komma, Clamp/Empty-State-Trennung, Testliste. APP-01 bleibt aktiv bis Implementierung.

2026-05-10 — App-Fabrik-Workflow V0.2 erstellt (AF-09).
04_CLAUDE_WORKFLOW_DRAFT.md: 8 Phasen (Intake → Briefing → Spec → Spec-Gate → Impl-Planung → Umsetzung → Review → Pilot-Auswertung), 5 Gates (Intake/Spec/Pre-Code/Review/Release), APP-INTERFACE.md als Pflichtreferenz, AppContext/A11y/Reise-eines-Inputs als Spec-Pflicht, Pilot-1-Sonderregeln. §12 Nächster Schritt: BACKLOG-AP prüfen vor anlegen.

2026-05-10 — APP-INTERFACE.md auf App-Fabrik-Stand aktualisiert (AF-08).
Zwei-Vertrags-Modell (fw-app / financial-chart-module) kanonisch in docs/spec/ verankert.
§7 Sicherheitsregeln auf 10 erweitert. §10 Übergang (AF-04, AF-05, ChartAdapter). §11 Verhältnis zu Nachbardateien.
Status als Arbeitsfassung; data-fw-theme explizit mit Nutzungsverbot markiert.

2026-05-10 — Chart-Engine-Architekturprinzipien dokumentiert (AF-07).
CHART_ENGINE_ROLE_AND_INTEGRATION.md (neu): Rolle der Chart-Engine, was chart-spezifisch bleibt, Prinzipien-Tabelle P-01–P-10.
03_APP_FACTORY_STANDARD_DRAFT.md §10 (neu): alle 10 Prinzipien vollständig beschrieben (🟢 direkt übernommen / 🟡 adaptiert).
01_DECISION_LOG.md: A-09–A-18 hinzugefügt. 02_OPEN_QUESTIONS.md: Arch-06 (AppContext-Schema), Arch-07 (A11y-Vertrag pro Familie).
NAVIGATION.md App-Routing um CHART_ENGINE_ROLE_AND_INTEGRATION.md erweitert.

2026-05-09 — App-Fabrik-Standard V0.1 ausgearbeitet (AF-03).
03_APP_FACTORY_STANDARD_DRAFT.md: 13 Abschnitte, 7 App-Familien (je Zweck/Muster/Bausteine),
Ghost-HTML-Card-Vertrag vollständig (fw-app-Namespace + Chart-Engine-Sonderfall, Zwei-Vertrags-Tabelle),
CSV/JSON/data-options-Matrix, Code-Prinzipien, Sicherheitsregeln, DoD (8 Kategorien), 11 offene Fragen.
Scope-Funde: AUTHOR_GUIDE nutzt `data-app` (nicht `data-fw-app`) — Konflikt als F-01 dokumentiert;
kein fw-app-Cheat-Sheet für Redakteure — als F-02 dokumentiert. Beide als BACKLOG-Kandidaten gemeldet.

2026-05-09 — App-Fabrik Entscheidungsdokumentation (AF-02).
P-01 (Pilot-Reihenfolge), A-08 (D3/TopoJSON lokal), Fam-01 (G3 eigenständig), Z-03 (B2 Rollen), Z-04 (C1 Rollen) dokumentiert.
Kollisionsprüfung: kein Duplikat BACKLOG/App-Fabrik-Docs. BACKLOG-AP bei Pilot-Start erforderlich.

2026-05-09 — App-Fabrik Konsolidierung + Distill.
Distill: 8 session-log-Einträge destilliert, 5 Patterns promoted, 2 retired, 5 neue Memory-Dateien.
App-Fabrik: docs/App-Fabrik Vollstruktur angelegt — 00_STATUS, 01_DECISION_LOG (15 Einträge),
02_OPEN_QUESTIONS (20 Fragen), 03_APP_FACTORY_STANDARD_DRAFT, 04_CLAUDE_WORKFLOW_DRAFT,
05_PILOT_STRATEGY, APP_INVENTORY (21 App-Ordner), V0.3 Produktlandkarte, _input/, _archive/.
Zählmodell beschlossen: 18 Master-Apps + 3 Zusatz-Module = 21 reale App-Ordner.
NAVIGATION.md um App-Fabrik-Routing erweitert.

2026-05-09 — Skill-Infrastruktur: Refero.design Ressourcen verankert (NAVIGATION.md CSS/Design + App + Memory).
/finde-skills Skill erstellt: tiered Suche (4 Stufen), Security-Review als kommentierte Datei, Audit-Trail
in docs/steering/audits/skills-review/, Haiku/Sonnet-Aufgabenteilung. PRAXIS-ANLEITUNG.md + BACKLOG-ARCHIV.md aktualisiert.

2026-05-08 — ChatGPT-Selbsttest full: Gesamtstatus GELB, keine Chaos-Pfade.
PROTECTED_PATHS.json Layer-1 auf forbidden, start.md Schritt 0, selftest-chatgpt.md Inventur bereinigt.
ST-01 (Szenario Scope wächst) + ST-02 (Szenario Protected Path) als neue APs H eingetragen.

2026-05-08 — Selftest-Perplexity Iteration 2 + CLAUDE.md v2.0.1 Fixes.
3 Lücken geschlossen (L-NEU-1+2, OP-1, OP-2). 5 chirurgische Edits in CLAUDE.md + subagent-dispatch.
SESSION-START ✓, Gate-Verweise ✓ verifiziert.

2026-05-08 — CLAUDE.md v2.0 Neubau (6 Phasen abgeschlossen).
Grundmodell, Invarianten, Freigabeprinzip (neu). §11 entfernt → abschluss-ritual.
commands/pre-code-gate.md + intake.md (neu). skills/subagent-dispatch (neu).
Semantische Namen systemweit. CL-14 erledigt. Verifikation ausstehend.

2026-05-08 — Selbstlernendes System implementiert (Faden 3, alle 8 Schritte).
session-log + patterns (neu), abschluss-ritual Schritt 0 + Challenge-Response (erweitert),
/start Schritt 3c Learning-Pipeline (erweitert), kassensturz Lern-Loop (erweitert),
/distill + /uebergabe (neu), Lastabwurf-System (neu). Pilot-Test: nächster Faden.

2026-05-04 — Kontroll-Rückkopplungs-System implementiert.
4 neue Skills (kassensturz, patch-quittung, chain-of-custody, spec-quote) + 3 Upgrades.

2026-05-03 (nachmittags) — Design-System holistisch analysiert.
Spec 01- Font-Loading korrigiert (Google → lokal). DESIGN-SYSTEM.md v1.1.
Architektur-Entscheidungen: zwei Rendering-Welten, FwTheme als CSS-Bridge, Dark Mode = Ghost Theme.
Design-API-Konzept definiert: zentraler Baukasten, alle Apps nutzen dieselbe CSS-Selektoren, Zustände vollständig definieren.
Neue APs: DS-012, DS-013, DS-014.

2026-05-03 (vormittags) — Masterplan vollständig abgeschlossen (A + B + C–J + 5 Lücken).

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
