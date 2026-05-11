<!-- HOOK-META
Version: 1
Stand: 2026-05-11
Fokus-AP: APP-01 — prokrastinations-preis
Nächster-Schritt: Slice 0 implementieren — app.js, app.css, app.test.html
Blocker: keine
-->

# PROJECT STATUS — Finanzwesir 2.0

Stand: 2026-05-11 | Session: pre-code-gate-sliceplan | Geändert von: Claude

**Zweck:** Schneller Wiedereinstieg nach Pausen.
**Zielgruppe:** Albert und Claude.
**Wann lesen:** Immer zu Session-Beginn, besonders nach längerer Pause.
**Wann aktualisieren:** Nach längeren Sessions, Meilensteinen oder geändertem Projektfokus.
**Gehört hier hinein:** Aktueller Fokus, stabiler Stand, nächster Schritt, Blocker.
**Gehört nicht hier hinein:** Detailbugs, vollständige Specs, lange Diskussionen.

---

## 1. Aktueller Fokus

**Pre-Code-Gate Full prokrastinations-preis ✅ bestanden** (APP-01-pre-code-gate): SLICE_PLAN.md mit Slices 0–7b erstellt + 4 Korrekturen eingearbeitet (Container-Selektor, Testszenarien C–E, Loading-State-Formulierung, Kein-Container-Codeverhalten). NB-2 entschieden: internes Config-Objekt (RFC §D5). Security-Sync synchron.
Nächster Schritt: **Slice 0 implementieren** — `app.js`, `app.css`, `app.test.html` (Alberts explizites OK ausstehend).

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

- **Slice 0 implementieren** — `Apps/prokrastinations-preis/app.js`, `app.css`, `app.test.html` (alle NEU) — App-Shell + Ghost-Card-Bootstrap
- **AP-20/21** (Mixed-Rhythm CV-Heuristik) — 🟡 Aktiv, Chart-Engine, parallel möglich

---

## 4. Aktive Baustellen

| Bereich | Status | Nächster Schritt |
|---------|--------|------------------|
| Projekt-Gehirn | Masterplan komplett ✅ | APs wählen |
| Chart-Engine | Stabil, offene APs | Siehe `docs/steering/BACKLOG.md` |
| Theme | In Entwicklung | `THEME-ASSEMBLY-CHECKLIST.md` |
| CSS | Stabil | Siehe `docs/steering/BACKLOG.md` (CSS-N Items) |
| Apps | Pre-Code-Gate Full ✅ + SLICE_PLAN.md | Slice 0 implementieren (app.js, app.css, app.test.html) |
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

**Pre-Code-Gate Full bestanden ✅. Nächster Schritt: Slice 0 implementieren.**

1. `Apps/prokrastinations-preis/SLICE_PLAN.md` lesen (Slice 0 Scope, Akzeptanzkriterien A0-1–A0-6)
2. Alberts explizites OK geben
3. Implementierung Slice 0 — `app.js`, `app.css`, `app.test.html` (alle NEU)
4. `app.test.html` im VSCode Live Server öffnen — alle 5 Szenarien (A–E) prüfen

Pflichtquellen (bereits gelesen, bleiben bindend):
- `docs/spec/APP-INTERFACE.md` — Ghost-Card-Vertrag
- `docs/steering/audits/SECURITY-BASELINE.md` — Sicherheitsregeln
- `Apps/prokrastinations-preis/APP_SPEC.md` V0.3 — bindende Spec
- `Apps/prokrastinations-preis/SLICE_PLAN.md` — Slice-Scope + Akzeptanzkriterien

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
