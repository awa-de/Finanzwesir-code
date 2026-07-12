<!-- HOOK-META
Version: 1
Stand: 2026-07-12
Fokus-AP: RITUAL-OPT-1 ✅ — Abschluss-Ritual tokensparend umgebaut: HOOK-META-Riegel, PROJECT-STATUS -82 %, read-freie Log-Appends, Log-Rotation (2026-07-12)
Nächster-Schritt: offen — RITUAL-OPT-2 (NAVIGATION/start/Matrix) oder AP-tailwind-02 (Pilotmigration); Albert wählt (RITUAL-OPT-1 ✅ 2026-07-12)
Blocker: keine
Letzter-Distill: 2026-07-06
Kassensturz-Datum: 2026-07-06
-->
<!-- HOOK-META-SESSION: AP-tailwind-01 → Fable-Runde -->

# PROJECT STATUS — Finanzwesir 2.0

Stand: 2026-07-12 | Session: AP-tailwind-01 → Fable-Runde | Geändert von: Claude

**Zweck:** Schneller Wiedereinstieg nach Pausen.
**Zielgruppe:** Albert und Claude.
**Wann lesen:** Immer zu Session-Beginn, besonders nach längerer Pause.
**Wann aktualisieren:** Nach längeren Sessions, Meilensteinen oder geändertem Projektfokus.
**Gehört hier hinein:** Aktueller Fokus, stabiler Stand, nächster Schritt, Blocker.
**Gehört nicht hier hinein:** Detailbugs, vollständige Specs, lange Diskussionen.

---

## 1. Aktueller Fokus

**Abschluss-Ritual tokensparend umgebaut ✅ (RITUAL-OPT-1, 2026-07-12):** HOOK-META-Phantomfeld `Nebenabschluss` (14k Zeichen, seit 2026-07-01 unbemerkt gewuchert) entfernt und per enforcing-Validator (`tools/check-project-status-hook-meta.py`: Feld-Whitelist, Feldlängen, Datei-Größen-Riegel WARN>30/FAIL>50 KB) unbedingt ins Ritual verriegelt (Exit≠0 stoppt das Ritual). PROJECT-STATUS §1/§3/§8 auf Snapshot getrimmt (108→19,4 KB, -82 %; §8 war ein 330-Zeilen-Log getarnt als Sektion). Read-freies Append-Tool (`append-log-line.py`, Dublettensperre) + BACKLOG-ARCHIV-Invariante append-only/neueste-unten → Archiv-Read pro Abschluss ~36k→~0 Tokens; in Ritual §3.7 + Writer verdrahtet. Log-Rotation (`rotate-log.py`, Jahres-Segmente, Carry-Forward) + distill Schritt 7 löschen→archivieren (Rohlog bleibt für Forensik erhalten). Offen als RITUAL-OPT-2: NAVIGATION gezielter Read, start/Hook, Matrix-Automatik-Review. Uncommitted (dieser Abschluss).

**Tailwind-Design-System-Fundament etabliert ✅ (Meilenstein, 2026-07-12):** `AP-tailwind-01` (Befund/Forschung, GELB — 1 bewusst benannter Research-Gap: Ghost-`.hbs`-Kette repo-intern nicht verifizierbar, kein neuer Fund, bereits im CI-POOL-Kontrakt selbst als P18 dokumentiert) fand: Tailwind war als Ziel-Fundament kanonisch entschieden (`CI-POOL-ROLLENKONTRAKT.md`), aber im App-Pool faktisch noch nicht angekommen — `prokrastinations-preis` (einzige produktive App) enthielt 0 Tailwind-Utility-Klassen, 3 Standalone-Prototypen (`regulatorik-dashboard`, `rollierende-sparplaene`, `weltkarte-etf-indizes`) mit komplett CI-fremdem Design-System, 13 von 15 Chart-Engine-Testseiten mit hartem Legacy-Border statt CI-Token. Ergebnisdatei (`docs/steering/patches/AP-tailwind-01_befund-und-forschung_Ergebnis.md`): 25 UI-Primitiven-Katalog, 9 Findings, 6 extern recherchierte Forschungsthesen (offizielle Tailwind-/Headless-UI-/Refactoring-UI-Quellen), 16 priorisierte Fable-Entscheidungsfragen (D-01–D-16) + eigenständiges Fable-Briefing. **Fable-Entscheidungsrunde** darauf aufbauend: alle 16 Fragen entschieden, `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` (von Albert freigegeben 2026-07-12) + Visual Board + App-Mockups (3 Archetypen im simulierten Ghost-Artikel) als neuer, verbindlicher Design-Vertrag der gesamten App-Fabrik (25+ Apps). Kernentscheidungen: `fw-app` als Scope-Anker + Tailwind-Utilities (Hybrid-Shell), Section/Panel/Card-Taxonomie, Ein-Container-Vertrag am App↔Chart-Übergang, Chart-Chrome nach realer `FwRenderer`-Slot-Reihenfolge, Donut-Ist-Bild (cutout 70 %, Center-Text — Albert-Korrektur ggü. erstem Board-Entwurf „Torte"), 4 Button-Varianten, `sm/md/lg` für generische UI (App-Mechanik-Sonderbreakpoints wie die Rubikon-Positionierung bleiben lokal), Tailwind-Defaults für Spacing/Radius + nur die zwei bestehenden `shadow-soft`/`-hover`-Zusatzstufen, JS-Klassen-Konstanten statt `@apply`, Literalregel für Build-Sicherheit (löst das im Befund identifizierte dynamische-Klassen-Risiko auf), `--fw-space-*` wird ersatzlos abgelöst — Umsetzung ist `AP-tailwind-02` (Pilotmigration). **Parallel:** Design-Ablage konsolidiert — Jahrgang 2026-05 (`docs/design-system`, 35 Dateien, u. a. verbotene Farbnamen `-tint/-20/-80` mit abweichender Bedeutung ggü. `tokens.css`, dokumentierte Petrol-50-Namenskollision) nach `Archiv/design-system-2026-05/` verschoben (mit Schutz-README), `docs/design-system/` nur noch Statuskarte + Spec 05 (Icons, Pfad korrigiert). `NAVIGATION.md` (Design-Routing umgehängt, SVG-Duplikate-Frage geklärt) und `docs/steering/BACKLOG.md` (DS-015 neu, `AP-tailwind-02` neu, DS-012/DS-014 nachgeführt) bereits in derselben Session aktualisiert. Übergabe an Sonnet vorbereitet: `docs/steering/handovers/SONNET-PROMPT_AP-tailwind-02_pilotmigration_V1.md`. Einziger Vorfall: `.git`-Index-Korruption durch `git mv` aus der Cowork-Sandbox über das NAS-Laufwerk, am Host per `git read-tree HEAD` repariert, Working Tree nachweislich unversehrt. Kein Layer-1–5-Engine-Code, kein `app.js`/`app.css`/`screen.css`/`tokens.css`-Diff — reine Konzept-/Doku-/Ablage-Arbeit. Uncommitted — Commit-Message liegt vor, Freigabe liegt bei Albert.

**Testseiten-Handoff-Lücke geschlossen ✅** (`AP-apptest-01` + `AP-apptest-02`, 2026-07-11, Sofort-erledigt, unabhängig geprüft): Der reale App-Bau-Prozess kannte die fertige Testumgebung (`docs/testing/TEST_PAGE_STANDARD.md`, Template, Checker, 16 GRÜNE Testseiten) nicht zuverlässig — `tech-spec-app`, `04_CLAUDE_WORKFLOW_DRAFT.md` und `manual-test-plan` verwiesen nirgends darauf, Letzterer sogar auf tote Pfade (`Theme/chart-tests/`, `Theme/data/`, seit `TESTENV-1eB` migriert). `AP-apptest-01` hat 4 Dateien chirurgisch ergänzt: `TEST_PAGE_STANDARD.md` §14 (explizit `--write-index` nach grünem Check + Verbot der Handpflege von `tests/index.html`), `tech-spec-app` (Handoff-Hinweis: Testfälle sind Grundlage für `app.test.html`, Bau folgt ausschließlich dem Standard, `tech-spec-app` baut selbst keine Testseite), `04_CLAUDE_WORKFLOW_DRAFT.md` (neuer Unterpunkt 5.1b: Template/Zielpfad/Checker/Launcher/Browserprüfung), `manual-test-plan` (tote Pfade auf reale — `Apps/{slug}/app.test.html`, `tests/engine/`, `tests/fixtures/engine/` — ersetzt). `app-spec-create` bewusst unverändert gelassen (Testfälle bereits über den bestehenden 18-Pflichtabschnitte-Check abgedeckt, ein Zusatzpunkt wäre Duplikat). `AP-apptest-02` (unabhängige Claims-vs-Files-QA, frischer Kontext, kein Wissen aus dem Bau-Faden) bestätigte alle vier Änderungen wörtlich gegen den realen Diff und den Strukturchecker — GRÜN im ersten Anlauf, keine Reparatur nötig, Abschlussritual freigegeben. Kein Produktionscode, keine `Apps/**`-Datei, kein Checker-Code berührt. Sofort-erledigt-Pfad (kein BACKLOG-Eintrag, direkt archiviert). Ergebnisprotokolle: `docs/steering/patches/AP-apptest-01_testseiten-handoff-minimal_Ergebnis.md`, `..._02_unabhaengige-claims-vs-files-QA_Ergebnis.md`. Uncommitted — Commit-Freigabe liegt bei Albert.

**TESTENV-1-Initiative vollständig abgeschlossen ✅** (`TESTENV-1g`, 2026-07-11): Löste die beiden letzten offenen CI-Bugs aus dem `TESTENV-1f`/CI-Audit-Tool-Nachtrag. `.fw-app__btn` (Arial statt Source Sans Pro) gefixt mit `font-family: inherit;` (`app.css`, 1 Zeile), Albert-verifiziert. Der `h3.fw-chart-title`-Leak betraf entgegen der ursprünglichen Vermutung nicht 1, sondern 4 identische Legacy-`<style>`-Blöcke (`tooltip.test.html`, `cadence-density.test.html`, `irregular-bar.test.html`, `irregular-line.test.html`) — an der im Auftrag gesetzten harten 3-Dateien-Grenze zunächst gestoppt und gemeldet, von Albert im selben AP auf 4 erweitert. Fix: bestehender Container `.fw-test-case` per Kombinator-Wechsel auf Direkt-Kind (`h3` → `.fw-test-case > h3`) verengt, trennt Demo-Caption-Überschriften von `.fw-test-expected h3` und vom Engine-erzeugten `h3.fw-chart-title`, keine neue Wrapperstruktur, kein `!important`; zusätzlich `tests/shared/test-page.css` `.fw-test-expected h3` um `color` ergänzt. Beide Fixes automatisiert (`check-test-pages.py` GRÜN, Python-Nachweis auf Selektor-Statement-Ebene) und von Albert browserseitig bestätigt — inklusive der ursprünglich aus `TESTENV-1f` §5 offenen Browser-Stichprobe, jetzt nachgeholt. Damit ist die gesamte TESTENV-1-Initiative (Phasen 1–5, Abschlussgate, CI-Audit-Tool-Nachtrag) inhaltlich fertig und als eine konsolidierte Zeile in `BACKLOG-ARCHIV.md` archiviert. `TESTENV-1-FOLLOWUP-BORDER` (`.financial-chart-module` `#ddd`-Rahmen) bleibt eigenständig offen, bewusst bis zur Tailwind-Arbeit zurückgestellt. `TESTENV-1eB`/`TESTENV-1f`/CI-Audit-Tool-Nachtrag sind bereits als Commit `ab95cfd` im Repo; `TESTENV-1g` (`app.css`, 4× `tests/engine/*.test.html`, `tests/shared/test-page.css`) ebenfalls committed (`2f851d1`, git log verifiziert). Ergebnisprotokoll: `docs/steering/patches/TESTENV-1g_ci-regressionsfix_Ergebnis.md`.

**Testumgebungs-Migration abgeschlossen, CI-Audit-Tool ausgebaut ✅** (`TESTENV-1eB`/`TESTENV-1f` + Nachtrag, 2026-07-11, committed `ab95cfd`): `TESTENV-1eB` hat die 13 fest vorgegebenen Engine-Testseiten + 2 neue (Security-Merge, Smart-Update-Auslagerung) nach `tests/engine/` migriert, 76 Fixtures nach `tests/fixtures/engine/` verschoben (SHA-256 geprüft), den Checker um 2 Ausnahmen erweitert (`data-fw-test-allow-missing-app-id`, `[data-fw-appchart]` unter `tests/engine/`) und die App-Testseite von 32 auf 31 Testfälle bereinigt (Szenario AF ausgelagert) — GRÜN. `TESTENV-1f` hat `.gitignore` bereinigt und das automatische Gate bestätigt (16 Testseiten, 0 Strukturfehler) — die Browser-Stichprobe (7 Seiten, `TESTENV-1f` §5) ist mittlerweile durch Albert nachgeholt (s. TESTENV-1g oben). **Nachtrag im selben Faden:** Auf Alberts Wunsch wurde `tools/ci-token-check.js` um ein primitives, universelles Ist/Soll-Set-Audit (`fwCiAudit()`) erweitert — die erlaubte Farb-/Font-Menge wird live aus `tokens.css` diskoviert (kein Hardcode, keine kuratierte Selektor-Liste), geprüft wird jeder tatsächlich benutzte Wert innerhalb der `.kg-card`-Bereiche einer beliebigen Testseite, zusätzlich über die Chart.js-Registry (`Chart.getChart`) auch Canvas-Farben (Serien, Tooltip, Plugins). Über drei echte Testrunden dreimal aus echten Funden präzisiert (Tooltip-`enabled:false`-Guard, `.kg-card`-Selbstausschluss, `accent-color` bei `range`/`checkbox`/`radio`). Kopfkommentar um eine „ERWEITERUNG"-Anleitung für künftige LLMs ergänzt (3 konkrete Erweiterungspunkte, Pflicht-Reihenfolge vor jeder Erweiterung — erst Quellcode belegen, dann erweitern). Dabei fand das Tool **2 echte, vorher unbekannte CI-Bugs** (beide inzwischen durch `TESTENV-1g` behoben, s. oben): `.fw-app__btn` rendert in Arial statt Source Sans Pro, und `h3.fw-chart-title` (vom Chart-Engine zur Laufzeit erzeugt) leakt Hintergrund/Rahmen aus einem bei `TESTENV-1eB` unverändert übernommenen Legacy-`<style>`-Block mit bare `h3`-Selektor. Dazu der bereits bekannte `.financial-chart-module`-`#ddd`-Rahmen (`TESTENV-1-FOLLOWUP-BORDER`, bewusst bis zur Tailwind-Arbeit zurückgestellt, bleibt offen). Alle Protokolle unter `docs/steering/patches/TESTENV-1{eB,f,g}_*_Ergebnis.md` + 4 `PATCH-CI-AUDIT-TOOL-*`-Quittungen. Kein Layer-1–5-Produktionscode geändert.

**Font-Bridge vollständig umgesetzt + Spec gehoben ✅** (AP-prokrast-17-FONT-CODE-A/B + SPEC-HEBUNG, 2026-07-10/11): Die Chart-Engine **und** die HTML-UI ziehen die Schrift jetzt — exakt wie die Farben seit AP-16 — aus `tokens.css`. `FwTheme.init()` liest zusätzlich `--font-body`/`--font-display` (KDR 14 Punkt 5); der Constructor-Hardcode bleibt Fallback für Test-HTMLs ohne Tokens. **Pfad A (Canvas, committed `dbe5007`):** `FwLayoutRules.getResponsiveFont(ctx, family)` nimmt die Schrift aus der injizierten, init()'ten Theme entgegen (X/Y-Achse, Tooltip); drei bis dahin tote Font-Übergabewerte lebendig verdrahtet. 6 Engine-Dateien, unabhängig reviewt (Opus, frische Instanz, GRÜN), Null-Delta belegt, A6 (`FwChartTextPlugin.js:95`) unberührt. **Pfad B (HTML-UI):** `Apps/prokrastinations-preis/app.css` `--fw-font-base` (nirgendwo definiert, Fallback `sans-serif`) → `--font-body`; App-Fließtext/-Headlines (H-A: body-only), A11y-Tabelle-im-Piloten und App-Meldungen ziehen automatisch mit. Engine-injizierte HTML-Flächen (Legende, Range-Buttons, BAN, Popover, Fehlermeldung) waren durch Pfad A bereits token-gespeist — verify-only bestätigt (`FwRenderer`-Konstruktor ruft `this.theme.init()`). **Albert-browserverifiziert** (`app.test.html`, `tools/ci-token-check.js`+neuer `fwFontCheck()`): alle 5 HTML-UI-Flächen computed `"Source Sans Pro"`, `document.fonts.check` ✅ — Schrift real geladen, kein stiller Fallback. **Spec-Status gehoben** (KDR 14 P5, TECH-SPEC §5.4, CI-POOL §9): „implementiert (Mechanismus + Pilot `prokrastinations-preis`)" — ausdrücklich **nicht** App-Pool; Rollout auf die übrigen Apps bleibt offen. Ergebnisprotokolle: `docs/steering/patches/AP-prokrast-17-FONT-CODE-A-CANVAS_Ergebnis.md`, `..._REVIEW_Ergebnis.md`, `..._CODE-B-HTMLUI_Ergebnis.md`, `..._SPEC-HEBUNG_Ergebnis.md`. Nebenprodukte: `tools/ci-token-check.js` (`fwFontCheck()` + Härtungsfix), `TESTENV-1_harness-inventar_moderne-vs-legacy.md` (Vorarbeit Test-Harness-Vereinheitlichung). **Abweichung von der ursprünglichen BACKLOG-Kopplungsauflage** (`AP-prokrast-17-FOLLOWUP-FONT`, jetzt archiviert): Migration und Rubikon-Nachmessung sollten gekoppelt laufen — real lief die Migration zuerst, die Nachmessung (DS-FOLLOWUP-07) bleibt offen, jetzt sachlich fällig; von Albert im CODE-B-Auftrag explizit autorisiert. Pfad B + Spec-Hebung + Nebenprodukte + Doku-Sync committed (`77f3229`, git log verifiziert). Nächster Haupt-AP: App-Pool-Rollout, Rubikon-Nachmessung, oder TESTENV-1 (mittlerweile ebenfalls abgeschlossen, s. oben).

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
