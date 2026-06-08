<!-- HOOK-META
Version: 1
Stand: 2026-06-08
Fokus-AP: APP-01 — prokrastinations-preis
Nächster-Schritt: OA-02 entscheiden (COMP-ARCH-01 + historischer Peer-Review liegen vor) → dann Slice 4 SparplanChart
Blocker: keine
-->

# PROJECT STATUS — Finanzwesir 2.0

Stand: 2026-06-08 | Session: AP-KORR-6 | Geändert von: Claude

**Zweck:** Schneller Wiedereinstieg nach Pausen.
**Zielgruppe:** Albert und Claude.
**Wann lesen:** Immer zu Session-Beginn, besonders nach längerer Pause.
**Wann aktualisieren:** Nach längeren Sessions, Meilensteinen oder geändertem Projektfokus.
**Gehört hier hinein:** Aktueller Fokus, stabiler Stand, nächster Schritt, Blocker.
**Gehört nicht hier hinein:** Detailbugs, vollständige Specs, lange Diskussionen.

---

## 1. Aktueller Fokus

**App-Landschaft bereinigt + Block B umgebaut ✅** (AF-13 + 2026-05-18): B1 von Verlustzähler zu Marktzeit-App umgerahmt, B2 auf Epochen-Fokus reduziert, Block B zu „Marktzeit statt Timing" umbenannt, Der alte Euro (B4) + Depot-Kipppunkt (B5) in Block B integriert (vorher F3/F4), 1-Million-App verworfen. 21 Master-Apps / 24 Ordner.

**B1 operative Dateien VERALTET ✅** (2026-05-18): APP_SPEC.md (alte Verlustzähler-Mechanik), SLICE_0_KICKOFF.md und SLICE_PLAN.md mit hartem VERALTET-Header versehen. *(Galt für die alte Mechanik vor dem Slice-0-Reboot 2026-05-28.)* Operative Quelle heute: `Apps/prokrastinations-preis/APP_SPEC.md` V1.5 (Data Need Snapshot / Datenlayer-Konsistenz / Marktzeit-Mechanik). `MINI_SPEC_FROM_HAUPTDOKUMENT.md` bleibt fachliche Hintergrundquelle.

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

⚙️ **Nächster Schritt B1:** OA-02 entscheiden (Peer-Review + COMP-ARCH-Kontext liegen vor) → dann Slice 4 SparplanChart.

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

- **B1 Slice-4** — SparplanChart. Voraussetzung: OA-02 (Bibliothek + Integrationsform) muss zuerst entschieden werden. Slice-0/1/2/3 ✅ (alle 2026-06-05).
- **AP-20/21** (Mixed-Rhythm CV-Heuristik) — 🟡 Aktiv, Chart-Engine, parallel möglich

---

## 4. Aktive Baustellen

| Bereich | Status | Nächster Schritt |
|---------|--------|------------------|
| Projekt-Gehirn | Masterplan komplett ✅ | APs wählen |
| Chart-Engine | Stabil, offene APs | Siehe `docs/steering/BACKLOG.md` |
| Theme | In Entwicklung | `THEME-ASSEMBLY-CHECKLIST.md` |
| CSS | Stabil | Siehe `docs/steering/BACKLOG.md` (CSS-N Items) |
| Apps | Slice-3 ✅ 2026-06-05 | B1 Slice-4: SparplanChart (OA-02 offen) |
| Content | Laufend | Redaktionsleitfaden aktiv |
| Security | SECURITY-BASELINE.md App-Fabrik-gatefähig ✅ | Security-Sync-Regel + Gate-Prüffrage verankert (ST-13/ST-14) |

---

## 5. Blocker

Keine akuten Blocker.

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

**Nächster Schritt: OA-02 entscheiden → Slice-4 SparplanChart implementieren.**

OA-02-Kontext vorbereitet: COMP-ARCH-Entscheidung (§1a + ADR-COMP-ARCH-01) liegt vor.
Die alte OA-02-Peer-Review-Datei ist historische Vorarbeit und muss vor Umsetzung gegen COMP-ARCH-01 aktualisiert werden.

Neue Leitlinie:
OA-02 entscheidet den Chart-Komponenten-Vertrag innerhalb der Component Composition Architecture.

Nicht vorentschieden:
- Name der Komponente / Adapter-Grenze
- konkrete Engine-API
- Lifecycle-Vertrag
- Update-Strategie

Verboten:
- Sonderweg für „App-Charts"
- direkter Chart.js-Pfad aus App-Code
- Umbau von `Theme/assets/js/fw-chart-engine/index.js` zur Export-Fassade

Entschieden (nicht mehr offen):
- E-01 ✅: prokrastinations-preis ist Szenario-/Vergleichs-App mit Storytelling-Elementen
- E-02 ✅: Pilot-1 = risiko-uebersetzer (Calculator-Pilot), Pilot-2 = prokrastinations-preis (Daten-/Chart-/Story-Pilot)
- B-01 ✅: Datenbasis = MSCI World Index, monatliche Indexwerte; Format = CSV (Semikolon, Komma-Dezimal); kein ETF-Proxy
- B-02 ✅: Berechnungsformel = Anteilslogik (monatlicher Anteilskauf); keine Annuität, keine Durchschnittsrendite
- B-03 ✅: Screen-Flow = Button-getrieben V1; kein Autoplay, kein Scroll-Trigger

B-01-Teilentscheidungen — alle abgeschlossen ✅:
- B-01-A: ✅ Net Return (MSCI World Net Return EUR, MSCI direkt) — APP_SPEC §7
- B-01-B: ✅ EUR — entschieden 2026-06-04 — APP_SPEC §7
- B-01-C: ✅ MSCI direkt (msci.com), Tier 0 — entschieden 2026-06-04 — APP_SPEC §7
- B-01-D: ✅ Projektinhaber erstellt CSV redaktionell; Claude verarbeitet nur freigegebene Datasets — APP_SPEC §7

Operative Quelle:
- `Apps/prokrastinations-preis/APP_SPEC.md` — V1.6 ✅ (operativ)
- `Apps/prokrastinations-preis/MINI_SPEC_FROM_HAUPTDOKUMENT.md` — Hintergrundquelle

Slice-Planungsdateien (neue Mechanik, 2026-06-04):
- `Apps/prokrastinations-preis/SLICE_PLAN.md` — aktuell ✅
  Slice-0/1/2/3 abgeschlossen ✅
  Nächster Schritt: Slice-4 SparplanChart, aber erst nach sauberer OA-02-Entscheidung.
- `Apps/prokrastinations-preis/SLICE_0_KICKOFF.md` — abgeschlossen ✅

**Scope-Funde die noch offen sind:**
- AUTHOR_GUIDE-v3.md: `data-app` → `data-fw-app` Update (nach Pilot-1, wenn Vertrag stabil)
- Redakteurs-Cheat-Sheet für `fw-apps` analog zum Chart-Cheat-Sheet (nach Pilot-1)

**Parallel weiter offen:**
- AP-20/21 (Mixed-Rhythm CV-Heuristik) — Chart-Engine

Claude soll zuerst lesen:
1. `PROJECT-STATUS.md` (diese Datei)
2. `NAVIGATION.md`
3. aufgabenspezifische Steering-Dateien
4. relevante Specs

Nicht direkt mit Code beginnen.
