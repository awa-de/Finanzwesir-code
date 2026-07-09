<!-- HOOK-META
Version: 1
Stand: 2026-07-09
Fokus-AP: AP-prokrast-15a–16c ✅ — CI-/Theme-Bridge Umsetzung: Tailwind-CI-Pool-Inventar (15a, GRÜN), Rollen-/Benennungskontrakt CI-POOL-ROLLENKONTRAKT.md (15b, GELB nur Dateiname-Notiz), Farbleiter-Generierung + Abnahme-Board am Board abgenommen (15c, GELB→Pin 600 bestätigt), Theme-Migration tokens.css-SSoT + screen.css/FwTheme-Bridge (16, GRÜN), Bridge-Konsolidierung spec-konform + Kaskaden-Harness (16b, GRÜN — ChartEngine-Layer-Verstoß erkannt+revertiert, Injektion in LineChartStrategy Layer 3), Theme-Durchleitung an alle 3 Strategien per Composition Root (16c, GRÜN — Null-Delta 19/19 belegt + Albert-verifiziert)
Nächster-Schritt: KDR-14-Wortlaut-Nachführung (Mini-AP: Spec-Text ARCHITECTURE STRATEGY PAPER VX.md KDR 14.2/14.3 auf Composition-Root-Theme-Durchleitung ergänzen — in 16c bewusst nicht gemacht, keine Spec-Änderung erlaubt), danach AP-prokrast-17 (Pilot-Migration prokrastinations-preis: --fw-color-*/--fw-font-*/--fw-space-* raus, Pulse-Ring im App-Kontext verifizieren, QA_TEST_CASES.md erneut). Weiterhin offen: Commit-Freigabe durch Albert (git log bestätigt: letzter Commit d9ca9da; AP-prokrast-12a-12c committed als 8bb9256, AP-prokrast-14a-14c als d9ca9da — NUR AP-prokrast-15a–16c noch uncommitted), danach Commit-Umfang bewusst entscheiden; AP-prokrast-08-FOLLOWUP-A (No-op-Bootstrap-Masterentscheidung); DS-012/DS-013 + DS-FOLLOWUP-07/08 (CI-Font-Anbindung — 16 hat nur Farben gebrückt, Fonts noch NICHT); optional TC-E06/TC-E07-Browser-QA + A11y-Spotcheck, CTA-Copy
Nebenabschluss: AP-prokrast-14a–14c — CI-/Theme-Bridge Anamnese und Zielkontrakt (Inventar-Anamnese, unabhängiges Claims-vs-Files-Review, Zielkontrakt-/Architektur-Analyse mit Variante-C-Empfehlung, Rücklaufkapsel bewusst GELB), committed als d9ca9da (✅ 2026-07-07); AP-prokrast-12a–12c — RubikonSymbolMarkers Drehbuch-Errata-Sync (AP-prokrast-11-FOLLOWUP erledigt), unabhängig geprüft, Rücklauf an Masterfaden freigegeben (✅ 2026-07-07); AP-prokrast-11a–11d — Doku-/Spec-/QA-Sync (APP_SPEC.md, Drehbuch, QA_TEST_CASES.md) auf den abgenommenen Endstand aus AP-08/AP-10, LLM-lesbare Forensik-Rahmung eingeführt, unabhängig geprüft, Rücklauf an Masterfaden freigegeben, committed als 5365701 (✅ 2026-07-07); AP-prokrast-10a–10d — Screen-3-Reveal beim Übergang „Ergebnis ansehen" (Variante B++ Kontinuitäts-Reveal), unabhängig geprüft, Rücklauf an Masterfaden freigegeben, committed als 1033c9e (✅ 2026-07-07); AP-prokrast-09a–09d — Engine-Contract-Härtung nach AP-08 (chartSettled-Creation-Pfad geschlossen, No-op-Bootstrap bewusst offen zurückgegeben), teilweise abgenommen, unabhängig geprüft (✅ 2026-07-06); AP-prokrast-08a–08c — Card-to-Point-Motion Screen 2 gebaut, Architektur-Gate + harte Abschluss-QA GELB, committed als 18c87fb (✅ 2026-07-06); AP-prokrast-07a–07d — RubikonSymbolMarkers gebaut, CSS-feinjustiert, unabhängig geprüft, Rücklaufkapsel GRÜN, committed als ca45c94 (✅ 2026-07-06); AP-16/17/18 — Steuerungsblock-Rollout Statusabgleich + Batch C + unabhängiger Review (✅ 2026-07-01); AP-20/AP-20b/AP-21 — Sonderbatch D ohne plan-generator + unabhängiger Seed-Provenienz-Review (✅ 2026-07-01); AF-24/AP-22–25a — plan-generator-Seed-Sperre vollständig geklärt, Steuerungsblock-Rollout für alle 25 Apps (23 mechanisch + 2 dokumentierte Sonderfälle plan-generator/regulatorik-dashboard) abgeschlossen (✅ 2026-07-01); AP-prokrast-01–02e — neues amtliches Drehbuch prokrastinations-preis gegen Ist-Code/Architektur geprüft, Migrationsschnitt + unabhängige Abschluss-QA GRÜN, kein Code/Spec geändert (✅ 2026-07-02); AP-prokrast-03a–03e — Rubikon-Zukunftsraum architektonisch geklärt (03a/03b/03c) und als isoliertes `FwChartTextPlugin.js` gebaut (03d, additiver ChartEngine.js-Patch, Smart-Update-Testfall im Browser bestätigt), unabhängige Abschluss-QA GRÜN (03e), Commit empfohlen vor Screen-4-Integration (✅ 2026-07-02); AP-prokrast-03f–03i — Screen 4 (Rubikon-Reveal) vollständig gebaut: Integration zackig (03f, GELB), Root Cause auf Chart.js-4.5.0-Quellcode-Ebene geklärt (03g, GRÜN), Morph/C2 verworfen zugunsten stehendem Screen mit DOM-Overlay-Text im rechten Zukunftsfeld (03h/03h2, nach zwei Nachjustierungsrunden GRÜN, Albert bestätigt S/M/L+Konsole), unabhängige Abschluss-QA GRÜN, Screen 4 commitfähig (03i, ✅ 2026-07-02); AP-prokrast-04a–04c — APP_SPEC.md/Drehbuch auf Rubikon-Endstand synchronisiert (04a, GRÜN, §16.1a neu), unabhängige Abschluss-QA (04b, GRÜN, Fundstelle QA_TEST_CASES.md:557), Rücklaufkapsel mit zwei prominent eskalierten offenen Punkten (04c, GRÜN, ✅ 2026-07-03); AP-prokrast-05a–05e — QA_TEST_CASES.md auf Rubikon-Endstand synchronisiert (05a, GRÜN, TC-F01 neu + TC-F03/F04 neu), Abschluss-QA fand reale CTA-Fokus-Testlücke (05b, GELB, Rücklauf freigegeben), Light-Gate-Minifix schloss die Lücke (05c, GRÜN), Re-QA bestätigte die Schließung unabhängig (05d, GRÜN), Rücklaufkapsel mit Empfehlung an Masterfaden (05e, GRÜN, ✅ 2026-07-03); BACKLOG AP-27 damit erledigt; AP-prokrast-06a–06d — ✅/❓-Symbolik (Beat 2, BACKLOG AP-26) geklärt: Produktentscheidung GELB mit Empfehlung „streichen" (06a), danach Albert-Entscheidung außerhalb der Datei-Historie für Option A (reiner Canvas-Chart-Marker, kein DOM/A11y); APP_SPEC/Drehbuch/QA_TEST_CASES minimal synchronisiert (06b, GRÜN), unabhängig bestätigt (06c, GRÜN), Rücklaufkapsel mit Empfehlung AP-prokrast-07 (06d, GRÜN, ✅ 2026-07-04); BACKLOG AP-26 auf „entschieden, Bau offen" nachgezogen; AP-prokrast-07a — RubikonSymbolMarkers gebaut (GRÜN, 2026-07-06): `FwChartTextPlugin.js` additiv um `anchor:'lastPoint'` erweitert (bindet ✅/❓ an denselben Datenpunkt wie `FwVerticalLinePlugin`), `app.js` `renderScreen4Chart()` erweitert; AP-prokrast-07c — CSS-Feinjustierung nach Alberts Live-Test (2026-07-06): zwei Layout-Defekte am DOM-Textblock behoben (Kollision Screen S, fehlende Fluchtlinie zu „?"), neue M-Breakpoint-Stufe in `app.css` ergänzt, Diagnoseskript `tools/rubikon-symbol-markers-diagnose.js` neu; AP-prokrast-07b — Abschluss-QA Claims-vs-Files/TC-F05 (GELB, 2026-07-06): AP-07a vollständig bestätigt, M zum Prüfzeitpunkt offen, formaler DOM-/Accessibility-Tree-Check noch nicht dokumentiert, `CSS-KONVENTIONEN.md` als nicht einschlägig für App-eigene Stylesheets geklärt; AP-prokrast-07d — QA-Nachtrag + Rücklaufkapsel (GRÜN, ✅ 2026-07-06): Albert nahm M unter aktuellem Fallback-Font-Stand bewusst ab und führte den DOM-/Accessibility-Tree-Check durch (kein DOM-/A11y-/Live-Region-Treffer) — beide GELB-Gründe aufgelöst, TC-F05 für aktuellen Font-Stand bestanden, Commit aus AP-07-Sicht freigegeben; Folgeauftrag Rubikon-Neumessung nach CI-Font-Anbindung als BACKLOG DS-FOLLOWUP-07 registriert; BACKLOG AP-26 als erledigt archiviert
Blocker: keine
Letzter-Distill: 2026-07-06
Kassensturz-Datum: 2026-07-06
-->
<!-- HOOK-META-SESSION: AP-prokrast-16c -->

# PROJECT STATUS — Finanzwesir 2.0

Stand: 2026-07-09 | Session: AP-prokrast-16c | Geändert von: Claude

**Zweck:** Schneller Wiedereinstieg nach Pausen.
**Zielgruppe:** Albert und Claude.
**Wann lesen:** Immer zu Session-Beginn, besonders nach längerer Pause.
**Wann aktualisieren:** Nach längeren Sessions, Meilensteinen oder geändertem Projektfokus.
**Gehört hier hinein:** Aktueller Fokus, stabiler Stand, nächster Schritt, Blocker.
**Gehört nicht hier hinein:** Detailbugs, vollständige Specs, lange Diskussionen.

---

## 1. Aktueller Fokus

**CI-/Theme-Bridge umgesetzt ✅** (AP-prokrast-15a–16c, 2026-07-09): `Theme/assets/css/tokens.css` als Single Source of Truth für Farben/Fonts/Schatten (volle Tailwind-kompatible Leitern 50–900 Petrol/Gelb/Purpur, Seeds gepinnt, am 15c-Board abgenommen); `screen.css` per `@import` angebunden, `:root`-Farbblock entfernt; `FwTheme`-Bridge liest tokens.css; Plugin-Farb-Hartcodierungen aufgelöst; **Theme-Durchleitung** an alle 3 Strategien per Composition Root (ChartEngine reicht das eine init()'te Theme durch — zweite Wahrheitsquelle geschlossen). Verbindliche Regeln: `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md`. Null-Delta belegt (19/19 byte-identisch) + Albert am Live-Server-Harness verifiziert. Offen: CI-**Fonts** noch nicht gebrückt (DS-012/013), App-Pilot-Migration (AP-17), KDR-14-Spec-Nachführung.

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

✅ **App-Fabrik Steuerungsblock Muster-Einbau abgeschlossen (AP-08/AP-10b/c/d, 2026-06-26):** `Apps/prokrastinations-preis/APP_SPEC.md` hat jetzt ersten lokalen Steuerungsblock (Seed-basiert, mechanisch eingebaut): Barriere Verpasster-Zug + Wartestrategie + Hindsight Bias, 5 Muss-Kriterien, 5 Nicht-Ziele, LLM-Prüfscore 8/8-Regel. Tool `tools/app_fabrik/insert_steuerungsblock_from_seed.py` produktionsbereit (UTF-8-robust, Seed-Metadaten bereinigt, Nordstern-Begriff korrekt). Nächster Schritt: AP-09 Muster-Review.

✅ **MINI_SPEC Steuerungsblock-Rollout Batch A/B/C + Sonderbatch D + regulatorik-dashboard + prokrastinations-preis abgeschlossen (AP-12–AP-21, 2026-06-29 bis 2026-07-01):** 22 von 25 Apps haben jetzt einen vollständigen lokalen Steuerungsblock in `MINI_SPEC_FROM_HAUPTDOKUMENT.md`: Batch A (AP-12, 7 Apps), Batch B (AP-13, 7 Apps), Sonderfall regulatorik-dashboard (AP-14, MINI_SPEC komplett aus Seed neu gefasst), Sonderfall prokrastinations-preis (AP-15, MINI_SPEC nachgeführt), Batch C (AP-16 Statusabgleich, AP-17 Write, AP-18 unabhängiger Review — etf-aera-vorbei, replizierer-swapper, thesaurierer-rennen, weltdepot-baukasten), Sonderbatch D (AP-20 Dry-run deckte GESPERRT-Status von plan-generator auf, AP-20b Write für die 4 verteilungsreifen Apps — etf-vergleich, investment-universum, rollierende-sparplaene, weltkarte-etf-indizes — inkl. neuem APP_SPEC-Stoppwarnhinweis, AP-21 unabhängiger harter Seed-Provenienz-Review). Restbestand: nur noch `plan-generator` ungeklärt (Seed GESPERRT, Kernfelder reine Klärungsfrage-Platzhalter) → BACKLOG AF-24.

✅ **AF-24/plan-generator-Seed-Sperre vollständig geklärt, Steuerungsblock-Rollout für alle 25 Apps abgeschlossen (AP-22–AP-25a, 2026-07-01):** AP-22 klärte die Rolle von `plan-generator` (H1/Funnel-Finale/Abschlussmodul, 5 unabhängige Quellen) — die Seed-Sperre lag am riskanten Output-Rohentwurf (konkrete ETF-/Betragsempfehlung), nicht an Rollenunsicherheit. AP-23 lieferte Seed-Neufassung + lokalen Steuerungsblock + Entscheidungsblock „Wie konkret darf der finale Plan werden?" (6 offene Punkte mit Optionen/Empfehlung/Begründung, LLM-STOP-Regel) — verletzte dabei versehentlich die Read-only-Regel der zentralen Seed-Datei. AP-23a korrigierte das vollständig: Seed-Datei per `git checkout` zurückgesetzt, MINI_SPEC-Provenienz auf AP-22/AP-23-Kontext/AP-23a umgestellt (keine Seed-Provenienz-Behauptung mehr). AP-24 unabhängiger Review (GELB, nur fehlende explizite „Sonderfall"-Kennzeichnung), AP-24a Mini-Fix. AP-25/AP-25a: mechanischer Finalaudit aller 25 MINI_SPECs gegen Seed — 23/23 Standard-Apps GRÜN, `plan-generator`-Sonderfall (ohne Seed-Provenienz) GRÜN, `regulatorik-dashboard` als zweiter, bereits in AP-14h/AP-14i unabhängig geprüfter Sonderfall (eigenes 8-Fragen-Format statt mechanischem 4-Kriterien-Standard) formal GRÜN. Steuerungsblock-Rollout App-Fabrik damit für alle 25 Apps abgeschlossen. BACKLOG AF-24 entfernt, Archiv-Eintrag angelegt.

✅ **AP-prokrast-01–02e: neues amtliches Drehbuch prokrastinations-preis analysiert, Migrationsschnitt + unabhängige Abschluss-QA GRÜN (2026-07-02):** Ein neues, detaillierteres UX-Drehbuch (`drehbuch_prokrastinationspreis_app.md`, Card-to-Point-Animation Screen 2, Rubikon-Zukunftsraum-Mechanik Screen 4) wurde als amtliches Soll bestätigt und gegen Ist-Code, alte APP_SPEC §16 und die Chart-Engine-Architektur geprüft: Befund (AP-01), Quelleninventur (AP-02a), Konfliktmatrix (AP-02b), Architektur-Kontrakt (AP-02c), Migrationsschnitt (AP-02d), unabhängige Abschluss-QA (AP-02e, GRÜN, Kernbehauptungen direkt am Engine-Code verifiziert). Kernbefund: Screen 1 bereits erfüllt; Screen 4 (Rubikon) größte Lücke, aber architektonisch am besten vorbereitet (`xDisplayRange`/`FwVerticalLinePlugin` tragen bereits ohne Chart-Engine-Codeänderung); Screen 2 (Card-to-Point) bewusst nicht zuerst gebaut (höchste DOM↔Canvas-Kopplungsgefahr, fehlende Koordinaten-API). Reiner Analyse-/Architektur-Faden — kein Code, kein CSS, keine Spec, keine Stationsdaten geändert. Ergebnisprotokolle unter `docs/steering/patches/AP-prokrast-02a…02e_..._Ergebnis.md`. Nächster Schritt: AP-prokrast-03 — Rubikon-Minimum als vertikale Scheibe (wartet auf Nutzer-OK, kein automatischer Anschluss an AP-14j-Kette).

✅ **AP-prokrast-03a–03e: Rubikon-Zukunftsraum architektonisch geklärt und als isoliertes `FwChartTextPlugin.js` gebaut (2026-07-02):** Architektur-Anamnese (AP-03a, GRÜN) verifizierte direkt am Code, dass `config.xDisplayRange` → `fwContext.displayRange` → `axis.min/max` den Rubikon-Zukunftsraum bereits ohne Engine-Änderung trägt. Rubikon-Reveal-Vorschläge + Peer-Review-Dossier (AP-03b, GRÜN) fanden den bereits produktiven Smart-Update-Mechanismus in `ChartEngine.js` (B1-AP-15b, `chart.update()` mit automatischer Reduced-Motion-Erkennung) als tragenden Reveal-Mechanismus; `FwAnnotationPulsePlugin` erwies sich für persistente ✅/❓-Symbole als ungeeignet (transient, Kreisringe statt Glyphen). Peer Review Canvas-Text-Plugin (AP-03c, GRÜN) schnitt einen engen V1-Vertrag für ein neues `FwChartTextPlugin.js` (persistente `plotFraction`-Textannotationen relativ zur ChartArea, kein Card-to-Point). Minimum-Implementierung (AP-03d, GRÜN nach zwei dokumentierten Testharness-Fixes): `FwChartTextPlugin.js` neu gebaut, `ChartEngine.js` und `plugins/index.js` rein additiv erweitert (6 Touchpoints, Smart-Update-Zweig unangetastet), isolierter Smart-Update-Testfall in `Apps/prokrastinations-preis/app.test.html` (Szenario AF, auf Alberts explizite Anweisung dauerhaft eingebaut) manuell im Browser bestätigt. Unabhängige Abschluss-QA (AP-03e, GRÜN): alle Claims aus AP-03d gegen die realen Dateien verifiziert, keine Abweichung, kein Card-to-Point-Fund, Commit vor Screen-4-Integration empfohlen. `app.js`/`app.css` unverändert, keine Screen-4-Integration begonnen. Ergebnisprotokolle unter `docs/steering/patches/AP-prokrast-03a…03e_..._Ergebnis.md`. Nächster Schritt: AP-prokrast-03f — Screen-4 Rubikon-Reveal Integration mit `FwChartTextPlugin` (wartet auf Nutzer-OK).

✅ **AP-prokrast-03f–03i: Screen 4 (Rubikon-Reveal) vollständig gebaut, zweimal grundlegend korrigiert, unabhängig abgeschlossen (2026-07-02):** Integration (AP-03f, GELB) baute Chart-Mount + zwei `renderFromData()`-Aufrufe + `FwChartTextPlugin`, Reveal wirkte im Browser jedoch zackig statt smooth. Forschung (AP-03g, GRÜN) verifizierte den Root Cause auf Chart.js-4.5.0-Quellcode-Ebene: Scale-Bounds durchlaufen strukturell nie den Animator. Produktentscheidung (AP-03h, GELB) verwarf Morph/C2 vollständig zugunsten eines stehenden 20-Jahres-Endzustands; Konflikt zwischen visuellem Wunsch (Text im Chart-Feld) und A11y-Pflicht (DOM statt Canvas) wurde an die Steuerungsebene zurückgegeben statt eigenmächtig gelöst. Lösung (AP-03h2, GRÜN) löste den Konflikt per DOM-Overlay: `rubikonText` per CSS `position:absolute` in die rechte Zukunftshälfte gelegt, `--fw-rubikon-text-top/-left` als nachjustierbare CSS-Custom-Properties. Unabhängige Abschluss-QA (AP-03i, GRÜN): alle Claims gegen Code verifiziert, Scope sauber (nur `app.js`/`app.css`), kein Engine-/Plugin-/Strategy-/Spec-Diff, Screen 4 commitfähig. Ergebnisprotokolle unter `docs/steering/patches/AP-prokrast-03f…03i_..._Ergebnis.md`. Nächster Schritt: Commit-Freigabe durch Albert.

✅ **AP-prokrast-04a–04c: Soll-/Spec-Synchronisierung nach der Rubikon-Entscheidung, unabhängig geprüft und an den Masterfaden zurückgegeben (2026-07-03):** Synchronisierung (AP-04a, GRÜN): `APP_SPEC.md` §16.1a neu (Chart-Aufbau, DOM-Overlay-Haupttext, `FwChartTextPlugin`-Einordnung, Reveal-Timing, nachgelagerte Pflichtteile Card-to-Point/Screen-3-Timing), §16.2/§16.3/T-21/§23.18 präzisiert; Drehbuch-Beat 1/3 als abgelöst markiert (Root-Cause-Beleg), Beat 2 (✅/❓-Symbolik) explizit als offen/nie entschieden gekennzeichnet — kein Code/Engine/Plugin berührt. Unabhängige Abschluss-QA (AP-04b, GRÜN): alle Claims per dispatchtem `abschluss-scout` + eigenen Direkt-Greps gegen die realen Dateien verifiziert, konkrete Driftstelle `QA_TEST_CASES.md:557` lokalisiert. Rücklaufkapsel (AP-04c, GRÜN): zwei von Albert als nicht-übersehbar markierte Eskalationspunkte prominent weitergereicht und zusätzlich als BACKLOG AP-26 (Beat-2-Klärung) und AP-27 (`QA_TEST_CASES.md`-Sync) registriert; drei gleichrangige Kandidaten für den nächsten Haupt-AP zur Wahl gestellt statt einseitiger Festlegung. Ergebnisprotokolle unter `docs/steering/patches/AP-prokrast-04a…04c_..._Ergebnis.md`. Nächster Schritt: Albert wählt zwischen Kandidat A (Beat-2-Klärung), B (`QA_TEST_CASES.md`-Sync) oder C (Card-to-Point-Koordinaten-Schnittstelle).

✅ **AP-prokrast-05a–05e: `QA_TEST_CASES.md` auf Rubikon-Endstand synchronisiert, BACKLOG AP-27 erledigt (2026-07-03):** Synchronisierung (AP-05a, GRÜN): TC-F01 neu gefasst (Rubikon-Chart korrekt statt „Kein Zukunftschart."), TC-F03/TC-F04 neu ergänzt (DOM-Haupttext, 800ms-Timing, Reduced-Motion-Invarianz), manuelle Browser-Verifikation durch Albert bestätigte DOM-Struktur/Timing zusätzlich am Code. Abschluss-QA (AP-05b, GELB, Rücklauf freigegeben): alle Claims bestanden, aber reale Testlücke gefunden (CTA-Fokus während der 800ms-Pausen, bereits in AP-prokrast-02d entschieden, bislang nicht testbar). Light-Gate-Minifix (AP-05c, GRÜN) schloss die Lücke minimal. Re-QA (AP-05d, GRÜN) bestätigte die Schließung unabhängig. Rücklaufkapsel (AP-05e, GRÜN): Gesamtstatus GRÜN, Empfehlung an Masterfaden zur Wahl des nächsten Haupt-APs. Über die gesamte Kette ausschließlich `QA_TEST_CASES.md` geändert. Ergebnisprotokolle unter `docs/steering/patches/AP-prokrast-05a…05e_..._Ergebnis.md`.

✅ **AP-prokrast-06a–06d: ✅/❓-Symbolik (Drehbuch Beat 2, BACKLOG AP-26) geklärt und spec-konform verankert, unabhängig geprüft und an den Masterfaden zurückgegeben (2026-07-04):** Produktentscheidung (AP-06a, GELB): Datei-Historie zeigte die Symbolik durchgängig als offen/nie entschieden; eigenständige Empfehlung war Option B (streichen), da Original-Icon-Form (grünes ✅, textlos) dem Nudging-Verbot und dem A11y-Vorrang von Screen 4 widersprach. Danach stellte Albert außerhalb der Datei-Historie verbindlich klar: Symbole bleiben als rein visueller Canvas-Marker ohne DOM-/A11y-Anspruch. Regression-Sync (AP-06b, GRÜN): `APP_SPEC.md` §16.1a + UI-Primitive-Liste, Drehbuch (Beat 2) und `QA_TEST_CASES.md` (TC-F05 neu) minimal synchronisiert; Historie ehrlich als „Korrektur durch bindende Nutzerentscheidung nach AP-06a-GELB" dokumentiert. Unabhängige Abschluss-QA (AP-06c, GRÜN): alle Claims bestätigt, reine Additivität, `FwChartTextPlugin.js` unverändert. Rücklaufkapsel (AP-06d, GRÜN): Empfehlung AP-prokrast-07 (Bau `RubikonSymbolMarkers` über `FwChartTextPlugin.js`); BACKLOG AP-26 auf „entschieden, Bau offen" nachgezogen. Kein Code/Engine/Plugin berührt. Ergebnisprotokolle unter `docs/steering/patches/AP-prokrast-06a…06d_..._Ergebnis.md`. Committed als 0f355f7 (2026-07-04). Nächster Schritt: Masterfaden wertet Rücklaufkapsel aus, empfohlener Haupt-AP AP-prokrast-07 (AP-prokrast-03a–05e sind bereits einzeln committed: a399b5f/ffacc13/c633f82/a735981).

✅ **AP-prokrast-07a–07d: RubikonSymbolMarkers gebaut, CSS-feinjustiert, unabhängig geprüft, Rücklaufkapsel GRÜN (2026-07-06):** Bau (AP-07a, GRÜN): `FwChartTextPlugin.js` additiv um `anchor:'lastPoint'` erweitert, `app.js` `renderScreen4Chart()` erweitert. CSS-Feinjustierung (AP-07c, eingeschoben): zwei Layout-Defekte am DOM-Textblock `rubikonText` behoben, neue M-Breakpoint-Stufe in `app.css`, Diagnoseskript `tools/rubikon-symbol-markers-diagnose.js` neu. Abschluss-QA (AP-07b, GELB) und QA-Nachtrag + Rücklaufkapsel (AP-07d, GRÜN): TC-F05 für aktuellen Font-Stand bestanden. Folgeauftrag Rubikon-Neumessung nach CI-Font-Anbindung als BACKLOG DS-FOLLOWUP-07 registriert. Ergebnisprotokolle unter `docs/steering/patches/AP-prokrast-07a…07d_..._Ergebnis.md`. Committed als ca45c94 (2026-07-06).

✅ **AP-prokrast-08a–08c: Card-to-Point-Motion Screen 2 gebaut, zweimal grundlegend korrigiert, Architektur-Gate + harte Abschluss-QA (2026-07-06):** Analyse (AP-08a, GRÜN): Koordinaten-Schnittstelle geprüft — kein Chart.js-Internals-Zugriff aus `app.js` nötig, Empfehlung neues eigenständiges `FwAnchorMeasurementPlugin.js`. Implementierung (AP-08b, GELB): AnchorMeasurement v1 + erster Card-to-Point-Flug gebaut, `aria-hidden`-Clone-Pattern (echte Card bleibt semantische Quelle); Fluggeschwindigkeit später von 300ms auf 450ms, dann separat auf 1350ms erhöht (`--fw-card-to-point-flight-duration`), DS-FOLLOWUP-08 registriert. Sequenzkorrektur (AP-08b2): Chart-Reveal-vor-Card-Flight-Gate gebaut; Zwischenregression (Chart.js registriert Plugins nur bei `new Chart()`) über No-op-Bootstrap gelöst (HÄRTEN-Technical-Debt), neutrale LLM-Review-Kontext-Datei geschrieben. Chart-Settled-Gate (AP-08b3, GELB): `measurement.visible` bewies nicht Animationsende — neuer `chartSettled`-Contract auf Chart.js-nativem `animation.onComplete`. Architektur-Gate (AP-08b4a): BEHALTEN/HÄRTEN/ERSETZEN/ZURÜCKBAUEN-Klassifizierung aller Fixes gegen 4 harte Kriterien vor weiterem Patch; zweiter ungegateter Render-Zyklus gefunden und behoben. RenderMotion (AP-08b5, GELB): `renderMotion.mode='instant'` entfernt Chart.js-Default-Tweening aus Screen-2-Journey. Harte Abschluss-QA (AP-08c, GELB): „Dateien sind Wahrheit"-Prinzip — alle Claims gegen reale Diffs verifiziert, neue Lücke gefunden (`chartSettled`-Creation-Pfad ohne synchronen Fallback, aktuell folgenlos), Albert bestätigte Reduced Motion manuell S/M/L. Zwei offene Folgepunkte als neue BACKLOG-Punkte registriert (AP-prokrast-08-FOLLOWUP-A, AP-prokrast-08-FOLLOWUP-B). Geänderte Dateien: `FwAnchorMeasurementPlugin.js` (neu), `plugins/index.js`, `ChartEngine.js` (3 neue additive Contracts), `app.js`, `app.css` — kein `fwContext`-/`LineChartStrategy.js`-Eingriff. Ergebnisprotokolle unter `docs/steering/patches/AP-prokrast-08a…08c_..._Ergebnis.md` (plus `08b2_llm-review-kontext.md`). Committed als 18c87fb (2026-07-06).

🟡 **AP-prokrast-09a–09d: Engine-Contract-Härtung nach AP-08, teilweise abgenommen, unabhängig geprüft, Rücklauf an Masterfaden freigegeben (2026-07-06):** Analyse (AP-09a, GELB): beide AP-08-Folgepflichten getrennt gegen reale Dateien geprüft — `chartSettled`-Creation-Pfad als kleiner, spec-konformer `ChartEngine.js`-only-Fix eingestuft (kein `chartSettled`-Text in `docs/spec/`, kein Konfliktpotenzial); No-op-Bootstrap/AnchorMeasurement dagegen als spec-widersprüchlich erkannt — ein unconditional Plugin-Push widerspricht dem in `CHART_PLUGIN_ARCHITEKTUR.md` §4 dokumentierten Muster („ChartEngine ergänzt ... nur bei passender Runtime-Option") und bräuchte eine begleitende Spec-Textänderung (Full-Gate) statt eines kleinen Codefixes. Härtung (AP-09b, GELB): `ChartEngine.js`-Creation-Zweig reicht `_emitChartSettled()` jetzt synchron nach bei `instantCreate && chartSettled.enabled` (16 Zeilen Diff, gespiegelt vom Update-Zweig-Muster, kein Doppel-Emit-Risiko, keine neue API); No-op-Bootstrap bewusst nicht angefasst. Unabhängige Abschluss-QA (AP-09c, GELB): alle Claims gegen reale Dateien bestätigt, Scope-/Architektur-/Regressions-QA bestanden, keine Blocker, Rücklauf freigegeben; neuer Creation-Zweig im aktuellen App-Code nicht browserseitig ansteuerbar — kein künstlicher Test-Hack, späterer Test erst beim ersten echten App-Fall. Rücklaufkapsel (AP-09d, GELB): AP-09 als „teilweise abgenommen" verdichtet — chartSettled-Folgepflicht geschlossen, No-op-Bootstrap-Folgepflicht als offene Zwei-Optionen-Masterentscheidung zurückgegeben (A: eigener Engine+Spec-AP mit Full-Gate / B: No-op-Bootstrap offiziell als Contract-Bestandteil dokumentieren). Geänderte Dateien: ausschließlich `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` (nur Creation-Zweig von `_draw()`) — kein `app.js`/Plugin-/Strategy-/Spec-/Daten-Diff. BACKLOG AP-prokrast-08-FOLLOWUP-B als erledigt archiviert; AP-prokrast-08-FOLLOWUP-A bleibt offen, jetzt mit präziserer Spec-Konflikt-Begründung. Ergebnisprotokolle unter `docs/steering/patches/AP-prokrast-09a…09d_..._Ergebnis.md`. Nächster Schritt: Commit-Freigabe durch Albert, danach Masterfaden-Entscheidung zwischen Option A/B für No-op-Bootstrap.

✅ **AP-prokrast-10a–10d: Screen-3-Reveal beim Übergang „Ergebnis ansehen" (Screen 2→3), einmal grundlegend umgesteuert, unabhängig geprüft, Rücklauf an Masterfaden freigegeben (2026-07-07):** Ist-/Sollanalyse (AP-10a, GELB): Screen 3 hatte keinerlei Timing-Reveal (Text/Chart/KPI synchron); Drehbuch/`APP_SPEC.md` §16 fordern seit AP-14 einen gestuften Reveal, der nie gebaut wurde; verbindlicher Text bereits exakt im Code. Implementierung (AP-10b) umgesteuert: erster Zuschnitt „Text→Chart→KPI-Timing-Reveal" technisch fertig, aber laut Albert psychologisch falsch (wirkt wie Screen-Neustart) — architekturrelevanter Fork (genannte „Stationszeile" ist real Screen-2-Element `progressEl`) vor Entscheidung über neutrale LLM-Review-Kontext-Datei an Albert zurückgegeben. Finaler Zuschnitt „Variante B++ — Kontinuitäts-Reveal" (GRÜN): Chart+Ergebnislinie (`verticalLine:'last'`, `renderMotion:{mode:'instant'}`) erscheinen sofort/still, neues Screen-3-lokales Bridge-Element (`bridgeS3`, Formel `formatStationProgress()` aus `progressEl`-Berechnung extrahiert, keine Verschiebung) zeigt zunächst dieselbe Zeile wie Screen 2, danach KPI+Disclaimer per 800ms-Fade. Ergebnislinie technisch nicht animierbar (`ChartEngine._draw()` liest `.plugins` nur beim allerersten `new Chart()`-Aufruf, `FwVerticalLinePlugin` zeichnet statisch) — mit Albert besprochen: so lassen. Unabhängige Abschluss-QA (AP-10c, GELB): Kontinuitäts-Reveal code-seitig vollständig bestätigt, keine Engine-/Plugin-/Spec-/QA-/Daten-Diffs, Screen 1/2/4 + AP-07/08/09 statisch nicht regressiert; GELB wegen zwei nicht-blockierenden Punkten (verworfenes AP-10b-Protokoll behauptete weiterhin GRÜN für nicht mehr existierenden Code; Reduced-Motion-/S-M-L-Browser-QA offen). Warnheader + Rücklaufkapsel (AP-10d, GRÜN): altes AP-10b-Protokoll mit `[!WARNING]`-Forensik-Header versehen (nicht gelöscht), Albert bestätigte S/M/L + Reduced Motion nach AP-10c browserseitig als ok — beide GELB-Punkte aufgelöst. Geänderte Dateien: ausschließlich `app.js`/`app.css` — kein Engine-/Plugin-/Strategy-/Spec-/Drehbuch-/QA_TEST_CASES-/Stationsdaten-Diff. Ergebnisprotokolle unter `docs/steering/patches/AP-prokrast-10a…10d_..._Ergebnis.md` (plus `10b_screen3-timing-reveal_..._Ergebnis.md` als forensisches Warnheader-Artefakt und `10b_screen2-screen3-kontinuitaet_llm-review-kontext.md`). Nächster Schritt: Commit-Umfang durch Masterfaden entscheiden, danach Wahl zwischen AP-prokrast-08-FOLLOWUP-A (No-op-Bootstrap) oder DS-012/DS-013 (Theme-Bridge-Fonts).

✅ **AP-prokrast-11a–11d: Doku-/Spec-/QA-Sync auf AP-08/AP-10-Endstand, LLM-lesbare Forensik-Rahmung eingeführt, unabhängig geprüft, Rücklauf an Masterfaden freigegeben (2026-07-07):** Sync-Analyse (AP-11a, GELB): `APP_SPEC.md`, Drehbuch und `QA_TEST_CASES.md` waren alle drei nicht mit dem AP-10-Kontinuitäts-Reveal-Endstand synchron — beschrieben teils noch den verworfenen Text→Chart→KPI-Timing-Reveal, teils gar keine Bridge-Mechanik; zusätzlich fand AP-11a dieselbe Fehldokumentation für Card-to-Point/AP-08 („noch nicht gebaut") im selben APP_SPEC-Textblock und gab die Scope-Frage, ob AP-11b beides mitkorrigiert, bewusst an den Nebenfaden zurück. Write-AP (AP-11b, GRÜN): alle drei Zieldokumente synchronisiert über ein neu eingeführtes Formatmuster — `HISTORISCHER_STAND`/`AKTUELLER_SOLLSTAND`-Blöcke mit sechs Pflichtfeldern, explizit an spätere LLM-Leser adressiert; alte Planstände dadurch nicht gelöscht, sondern hart als inaktiv von den neuen, aktiven Sollständen getrennt. `QA_TEST_CASES.md` erhielt TC-E06 (Bridge/Timing) und TC-E07 (Reduced Motion) neu sowie eine präzisierte TC-E04. Unabhängige Abschluss-QA (AP-11c, GRÜN): alle AP-11b-Claims gegen reale Dateien bestätigt (u.a. `git show` auf die AP-07-/AP-08-Commits zur Verifikation, welche Engine-Datei zu welchem AP gehört), dabei einen zusätzlichen, außerhalb des AP-11-Scopes liegenden Dokumentationsfehler gefunden (Drehbuch Z.240: RubikonSymbolMarkers weiterhin als „Bau noch offen" beschrieben, obwohl AP-07 sie am 2026-07-06 fertiggestellt hat) — nicht repariert, nur gemeldet. Rücklaufkapsel (AP-11d, GRÜN): AP-11 gesamt verdichtet; A11y-/Reduced-Motion-Befund sauber getrennt (kein Hinweis auf Verlust, da kein Code geändert wurde; Reduced Motion nur statisch/implizit geprüft, praktischer Browser-/Screenreader-Test ausdrücklich nicht behauptet) als nicht-blockierende Empfehlung an den Masterfaden weitergegeben. Geänderte Dateien: ausschließlich `Apps/prokrastinations-preis/APP_SPEC.md`, `drehbuch_prokrastinationspreis_app.md`, `QA_TEST_CASES.md` — kein Code-/Engine-/Plugin-/Stationsdaten-/`docs/spec`-Diff über die gesamte Kette. Ergebnisprotokolle unter `docs/steering/patches/AP-prokrast-11a…11d_..._Ergebnis.md`. Committed als 5365701 (2026-07-07).

✅ **AP-prokrast-12a–12c: RubikonSymbolMarkers Drehbuch-Errata-Sync (BACKLOG AP-prokrast-11-FOLLOWUP erledigt), unabhängig geprüft, Rücklauf an Masterfaden freigegeben (2026-07-07):** Patch (AP-12a, GRÜN): der von AP-11c gemeldete aktive Widerspruch in `drehbuch_prokrastinationspreis_app.md:240` („Bau noch offen" für RubikonSymbolMarkers) korrigiert — genau eine Tabellenzeile geändert, Status jetzt „gebaut und abgenommen (AP-prokrast-07a–07d ✅ 2026-07-06)", Notiz jetzt „überholt: ... TC-F05 für aktuellen Fallback-Font-Stand bestanden ... Neumessung nach CI-Font-/Theme-Bridge-Anbindung ist Folgeauftrag von DS-012/DS-013, kein neuer Rubikon-Bau-AP" (Muster analog zur bestehenden Nachbarzeile aus der AP-10-Kette). Unabhängige Abschluss-QA (AP-12b, GRÜN): Diff exakt einzeilig, deckungsgleich mit dem AP-12a-Claim gegen reale Datei, Git-Diff und AP-07d-/AP-11d-Belege verifiziert; Gesamt-Grep über das Drehbuch fand keinen verbliebenen aktiven „Bau offen"/„TC-F05 offen"-Widerspruch; keine verbotene Datei angetastet, keine Code-/CSS-/Engine-/Plugin-/Datenänderung. Rücklaufkapsel (AP-12c, GRÜN): Regressionsrisiko niedrig (reine Doku-Ebene, ein Diff-Hunk), Empfehlung an Masterfaden — nächster Haupt-AP vom Masterfaden neu zu schneiden (Kandidaten AP-prokrast-08-FOLLOWUP-A, chartSettled-Plattform-Doku, TC-E06/TC-E07-Browser-QA, CTA-Copy, DS-012/DS-013), ausdrücklich kein neuer RubikonSymbolMarkers-Bau-/Nachpolitur-AP. Geänderte Dateien: ausschließlich `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` — kein Code-/CSS-/Engine-/Plugin-/Datenänderung, `APP_SPEC.md`/`QA_TEST_CASES.md` nicht berührt. Ergebnisprotokolle unter `docs/steering/patches/AP-prokrast-12a…12c_..._Ergebnis.md`. Nächster Schritt: Commit-Umfang durch Masterfaden entscheiden, danach Wahl zwischen AP-prokrast-08-FOLLOWUP-A (No-op-Bootstrap), DS-012/DS-013 (Theme-Bridge-Fonts), chartSettled-Plattform-Doku, optional TC-E06/TC-E07-Browser-QA + A11y-Spotcheck, CTA-Copy.

✅ **AP-prokrast-14a–14c: CI-/Theme-Bridge Anamnese und Zielkontrakt, Rücklauf an Masterfaden (bewusst GELB, 2026-07-07):** Inventar-Anamnese (AP-14a, GRÜN) kartierte reale CI-/Theme-/Token-/Font-/Tailwind-/Ghost-Spuren im Repo — Kernbefund: A-04 (`01_DECISION_LOG.md`, 🟢 ENTSCHIEDEN) fordert dieselbe CSS-Variablen-Theme-Bridge für Apps wie die Chart-Engine, ist im einzigen real gebauten App-Code (`Apps/prokrastinations-preis/app.css`) aber nicht umgesetzt. Unabhängiges Claims-vs-Files-Review (AP-14aR, GRÜN) bestätigte den Kernbefund per vollständigem, deterministischem Definition-vs-Use-Scan (39 Runtime-Dateien) hart und präzisierte zwei Punkte: 6 von 17 `--fw-*`-Tokens sind funktionierende, bewusst lokale App-Mechanik (keine Bridge-Lücke); 3 statt 0 der „übrigen" 24 App-Ordner (`regulatorik-dashboard`, `rollierende-sparplaene`, `weltkarte-etf-indizes`) enthalten nicht-integrierte Standalone-Prototypen. Zielkontrakt-/Architektur-Analyse (AP-14b, GRÜN) fand einen weiteren, ursprünglich nicht erwarteten Kernbefund — `screen.css` definiert nur Marken-Tokens, `app.css` braucht aber Rollen-Tokens (primary/surface/error-*), die dort noch nicht existieren; eine reine Umbenennung liefe ins Leere. 4 Varianten bewertet, Variante C (Hybrid: CI-semantische Tokens zentral, App-Mechanik lokal) empfohlen; Variante B (Alias-Layer in `screen.css`) verworfen (widerspricht `CSS-KONVENTIONEN.md`-Regel „`fw-*` nicht in `screen.css`"). Rücklaufkapsel (AP-14c, bewusst GELB statt GRÜN) verdichtete ohne Glättung: AP-14 erzeugt Entscheidungsreife, keine Implementierungsfreigabe — AP-prokrast-15 (Umsetzung Stufe 1) darf erst starten, wenn Albert 3 Farbrollen (Primary, Error-Familie, ggf. Surface) entschieden hat. Geänderte Dateien: ausschließlich 4 neue Ergebnisprotokolle unter `docs/steering/patches/AP-prokrast-14a…14c_..._Ergebnis.md` — kein Code-/CSS-/Engine-/Plugin-/App-Spec-/Datenänderung. BACKLOG DS-015 neu angelegt (Farbrollen-Entscheidung, blockiert AP-15). Nächster Schritt: Masterentscheidung zu den 3 Farbrollen, danach AP-prokrast-15 scope-klar startbar.

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

- **B1-AP-14c2** ✅ 2026-06-18 — Annotation-Marker-Ringe: offene Ringe als Scatter-Dataset (Petrol, transparent, kein Tooltip, kein Legendeneintrag)
- **B1-AP-14c2b** ✅ 2026-06-18 — Marker-X Snapshot-Alignment: Marker-X exakt auf Hauptserienpunkt (noon UTC, via getSnapshotSnap); Linien-Tooltip an Ringposition bleibt (Beschluss)
- **B1-AP-14c3** ✅ 2026-06-18 — Screen-3-Final-Reveal-Ringe: stille Ringe auf vollständiger Linie, final_reveal ausgeschlossen, manueller Test grün
- **B1-AP-14c3b** ✅ 2026-06-18 — Final-Reveal-Guard gehärtet: `isFinalRevealStation()` (5 Guards, defensiv), Smoke-Test grün
- **B1-AP-14c4** ✅ 2026-06-18 — Screen-2-Pulse-Animation: `FwAnnotationPulsePlugin.js` NEU (WeakMap, afterDraw, 2-Pulse-Formel, 1200ms/1.8x), chart.draw()-Pattern
- **B1-AP-14e12** ✅ 2026-06-22 — Spec-Drift + Audit-Lücken geschlossen: X-Achsen-Docs I/II/III historisch markiert; CHART_PLUGIN_ARCHITEKTUR.md §4/§18/§20.3/§20.6/§20.8 ergänzt. Kein Code geändert.
- **B1-AP-15a** ✅ 2026-06-23 — Motion-Befund (Audit, kein Code): Screen-Transitions ✅, Pulse ✅ (RM-Guard), RM-Lücke chart.update() identifiziert. Ergebnisprotokoll: `docs/steering/patches/B1-AP-15a_Motion-Befund_Ergebnis.md`
- **B1-AP-15b** ✅ 2026-06-23 — ChartEngine Reduced Motion Fix: `_prefersReducedMotion()` NEU; Initial-Render `animation = false`; Update-Pfad `chart.update('none')`. Alle Tests bestätigt.
- **B1-AP-15c** ✅ 2026-06-23 — motionRules Validation Hardening: 3 Guards in validateStationsJson() (betweenStations, forcedWaitBeforeContinue, reducedMotion). Alle Tests bestätigt.
- **B1-AP-15d** ✅ 2026-06-23 — Dead CSS Reduced-Motion Cleanup: @media-Block entfernt (app.css Z.110–115, toter Code).
- **B1-AP-15e** ✅ 2026-06-23 — Motion Mini-QA: Browser-Smoke-Test bestätigt, AP-15-Komplex vollständig.
- **B1-AP-16a** ✅ 2026-06-24 — Reveal-/Transfer-Contract-Audit: 5 Abweichungen identifiziert, Reparaturkette 16b/c/d definiert.
- **B1-AP-16b** ✅ 2026-06-24 — Screen-3-Reveal: KPI-Container + renderKpiCards + Subline + S3→S4-CTA gem. APP_SPEC. Alle 5 Tests grün.
- **B1-AP-16c** ✅ 2026-06-24 — Screen-4-Transfer-Text: Headline + Bodytext gem. APP_SPEC §16.2. Alle Tests grün.
- **B1-AP-16d** ✅ 2026-06-24 — Reveal-/Transfer-Mini-QA: 18-Punkte-Checkliste durch Albert bestätigt. AP-16-Komplex vollständig.
- **AP-20/21** (Mixed-Rhythm CV-Heuristik) — 🟡 Aktiv, Chart-Engine, parallel möglich

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

2026-06-26 — AP-02 + AP-03 Steuerungsblock-Serie abgeschlossen ✅.
AP-02: NAVIGATION.md Zeile 11 — Routing zu lokalem Steuerungsblock (APP_SPEC.md / MINI_SPEC). AP-03: `docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md` NEU (11 Abschnitte, 80%-Nordstern, LLM-Prüfscore 8/8-Regel). Nächster Schritt: AP-06 — app-spec-create Skill klären/anlegen.

2026-06-24 — B1-AP-18a Triage abgeschlossen ✅.
Error-/Empty-/QA-Readiness-Befund: Fehlerflächenkarte erstellt, 5 Top-Risiken (GELB); renderError() kein role="alert" → AP-18b-Kandidat (1 Zeile, Light-Gate); alle Error-/Empty-States stabil, kein Crash; source_claimed_unchecked Editorial-Gap. Nächster Schritt: B1-AP-18b — Error-/Empty-State A11y-Minifix.

2026-06-24 — B1-AP-17-Komplex abgeschlossen (B1-AP-17a, B1-AP-17b, B1-AP-17c) ✅.
B1-AP-17a: Navigation/Fokus-Befund, 3 GELB-Befunde (G1 href='', G2 Live-Region, G3 Fokus h3) — nicht-blockierend. B1-AP-17b: G2 + G3 minimal repariert (5 Zeilen app.js, renderS3-Guard erhalten, kein KPI-Duplikat). B1-AP-17c: G2 + G3 statisch verifiziert + Browser-Tests A–C durch Albert bestätigt; AD-G2 Restrisiko dokumentiert. AP-17 Gesamtstatus: GRÜN. G1 href="" bewusst offen (wartet auf Ziel-URL). Nächster Schritt: B1-AP-18.

2026-06-24 — AP-16-Komplex abgeschlossen (B1-AP-16c, B1-AP-16d).
B1-AP-16c: Screen-4-Headline + Bodytext auf APP_SPEC §16.2 gesetzt; `<p class="fw-app__screen-subline">` NEU; finaler CTA unverändert. Alle Tests grün. B1-AP-16d: Reveal-/Transfer-Mini-QA — 18-Punkte-Checkliste (S1→S2→S3→S4→S3) durch Albert bestätigt, alle statischen Prüfpunkte grün, AP-15-Motion intakt. AP-16-Komplex (16a–16d) vollständig. Nächster Schritt: B1-AP-17a — Navigation/Zurück-Weiter/Fokus-Befund.

2026-06-22 — B1-AP-14e12 Spec-Drift und Audit-Lücken endgültig geschlossen ✅.
X-Achsen-Docs I/II/III mit Statusbannern als historische Designintention markiert. CHART_PLUGIN_ARCHITEKTUR.md: §4 Opt-in-Klärung (Strategy-Default), §18 §20-Kurzregeln erweitert (8 neue Punkte), §20.3 selektive Barrel-Imports erklärt, §20.6 Spec-Drift-Hinweis auf alle 3 Docs ausgeweitet, §20.8 NEU (_originalDate-Abgrenzung zu _fwGeometry). NAVIGATION.md: Plugin-Routing-Hinweis, AP-14e12-Eintrag im B1-Block. Alle 9 Audit-Befunde geschlossen. Kein Code, kein CSS, kein JSON geändert. Ergebnisprotokoll: docs/steering/patches/AP-14e12_Spec-Drift-und-Audit-Luecken-endgueltig-schliessen_Ergebnis.md. Nächster Schritt: B1-AP-15 — Transitions + Reduced Motion.

2026-06-22 — B1-AP-14e11 Plugin-Architektur-QA Importzyklus-Gate ✅.
Kein Importzyklus: alle 4 Plugin-Dateien ohne Imports. Barrel sauber (4 Re-Exports, kein Chart.register). Alle Engine/Strategy-Imports über Barrel. 0 Altpfade, 0 verbotene Mechanismen. 14/14 Spec-vs-Repo-Prüfpunkte grün. FREIGABE: Plugin-Refactoring-Kette B1-AP-14e1–14e11 abgeschlossen. Ergebnisprotokoll: docs/steering/patches/AP-14e11_Plugin-Architektur-QA_Importzyklus-Gate_Ergebnis.md. Nächster Schritt: B1-AP-15 — Transitions + Reduced Motion.

2026-06-22 — B1-AP-14e10 Plugin-Spec und Steuerdateien synchronisiert.
CHART_PLUGIN_ARCHITEKTUR.md §20 NEU: aktiver Plugin-Bestand (4 Plugins), kanonischer Barrel plugins/index.js, Importzyklus-Verbot, verbotene Mechanismen (Registry/Chart.register/Auto-Registration), entfernte Elemente (FwChartPlugins.js/FwBarLayoutPlugin/_fwGeometry-Drift), BarChart-Hybrid-Warnung. NAVIGATION.md Plugin-Routing-Hinweis ergänzt (Barrel + Importzyklus-Verbot). Kein Code geändert. Ergebnisprotokoll: docs/steering/patches/AP-14e10_Plugin-Spec-und-Steuerdateien-Sync_Ergebnis.md. Nächster Schritt: B1-AP-14e11 — Plugin-Architektur-QA mit Importzyklus-Gate.

2026-06-22 — B1-AP-14e6 FwChartPlugins-Shim gelöscht.
core/FwChartPlugins.js entfernt — reiner Re-Export-Shim ohne produktive Importe; alle manuellen Tests bestätigt. Ergebnisprotokoll: docs/steering/patches/AP-14e6_FwChartPlugins-Shim-entfernen_Ergebnis.md. Nächster Schritt: B1-AP-14e7 — FwBarLayoutPlugin vollständig prüfen.

2026-06-19 — B1-AP-14e1 Doku-Nachputz: Chart-Plugin-Spec eingebunden (B1-AP-14e1).
CHART_PLUGIN_ARCHITEKTUR.md in NAVIGATION.md (Chart-Engine-Routing Plugin-Hinweis + B1-Block) und PROJECT-STATUS.md §8 eingebunden. Kein Code, kein CSS, kein JSON geändert. Nächster Schritt: B1-AP-15 (Transitions + Reduced Motion).

2026-06-18 — B1-AP-14c4 Screen-2-Pulse-Animation (B1-AP-14c4).
FwAnnotationPulsePlugin.js NEU: WeakMap-State per Chart-Instanz, afterDraw-Hook (letzter Hook), 2-Pulse-Formel Math.abs(Math.sin(progress×π×2)), Produktionswerte 1200ms/1.8x, chart.draw()-Pattern (canvas-ownership, Peer-Review-Befund Perplexity+ChatGPT). ChartEngine.js: annotationPulse-Option + Plugin-Injektion. app.js: renderJourneyStep aktiviert Pulse, Screen-3 ohne Pulse. 3 Dateien geändert. Ergebnisprotokoll: docs/steering/patches/B1-AP-14c4_Pulse_Screen2_reduced-motion_Ergebnis.md. Nächster Schritt: B1-AP-15 (Transitions + Reduced Motion).

2026-06-18 — B1-AP-14c3b Final-Reveal-Guard gehärtet + Screen-3-Smoke-Test (B1-AP-14c3b).
app.js: `isFinalRevealStation(s)` eingeführt (5 Guards: role, date, status, flags.finalReveal, id-Substrings; alle defensiv). `buildJourneyStationAnnotations`: einfacher role-Guard ersetzt. Screen-2 unverändert (slice-Grenze strukturell). Smoke-Test 6 Prüfschritte grün. Console-Einträge = erwartete Test-Szenarien. Ergebnisprotokoll: docs/steering/patches/B1-AP-14c3b_Final-Reveal-Guard_Screen3-Smoke_Ergebnis.md. Nächster Schritt: B1-AP-14c4 (Screen-2-Pulse-Animation).

2026-06-18 — B1-AP-14c2b Marker-X Snapshot-Alignment (B1-AP-14c2b).
LineChartStrategy.js: lokale Map<month, snappedTimestamp> aus rows + snappedTimestamps; Marker-X = exakt snapped Hauptserienpunkt (war: midnight UTC, neu: noon UTC). Beschluss: normaler Linien-Tooltip an Ringposition bleibt (Option 1, gewünscht). Ergebnisprotokoll: docs/steering/patches/B1-AP-14c2b_Marker-X-Snapshot-Alignment_Ergebnis.md. Nächster Schritt: B1-AP-14c3 (Screen-3-Final-Reveal-Ringe).

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
