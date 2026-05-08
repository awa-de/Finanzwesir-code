# PROJECT STATUS — Finanzwesir 2.0

Stand: 2026-05-08 | Session: Selbstlernendes System | Geändert von: Claude

**Zweck:** Schneller Wiedereinstieg nach Pausen.
**Zielgruppe:** Albert und Claude.
**Wann lesen:** Immer zu Session-Beginn, besonders nach längerer Pause.
**Wann aktualisieren:** Nach längeren Sessions, Meilensteinen oder geändertem Projektfokus.
**Gehört hier hinein:** Aktueller Fokus, stabiler Stand, nächster Schritt, Blocker.
**Gehört nicht hier hinein:** Detailbugs, vollständige Specs, lange Diskussionen.

---

## 1. Aktueller Fokus

Selbstlernendes System implementiert (2026-05-08). Alle 8 Schritte abgeschlossen.
Nächste Priorität: Pilot-Test (7 Checks) — erst dann gilt das System als produktiv.
Danach: DS-012 → DS-014 (Design-API, Blocker für App-Entwicklung) + AP-20/21 (Chart-Engine).

---

## 2. Letzter stabiler Stand

- Selbstlernendes System implementiert (2026-05-08): 8 Schritte, alle von Albert bestätigt.
  session-log, patterns, /distill, /uebergabe, CLAUDE.md §12 Lastabwurf. Pilot-Test ausstehend.
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

- **Pilot-Test Selbstlernendes System** — vor allen anderen Tasks (System implementiert aber ungetestet)
  5 Pilot-Tests aus PLAN-Synthese.md, Abschnitt „Verifikation":
  1. AP abschließen → Abschluss-Ritual → Erscheint Schritt 0 (session-log)? Eintrag korrekt?
  2. `/start` → prüft er session-log + patterns.md? SESSION-START-Zeile: „Log: X Einträge"?
  3. Kassensturz → erscheint Lern-Loop-Abschnitt?
  4. `/distill` ausführen → Kandidaten korrekt erkannt? j/n/anpassen funktioniert?
  5. Übergabeprompt anfordern → strukturierter Delta-Prompt (~10 Zeilen)? Breadcrumb gesetzt?
  Erst wenn alle 5 ✓: Selbstlernendes System gilt als produktiv.
- **DS-014** (Design-API Baukasten — 07-APP-KOMPONENTEN.md) — Blocker für alle App-Entwicklung
- **DS-012** (Tailwind-Config kanonisch) — Voraussetzung für DS-014
- **AP-20/21** (Mixed-Rhythm CV-Heuristik) — bereits 🟡 Aktiv, Chart-Engine

---

## 4. Aktive Baustellen

| Bereich | Status | Nächster Schritt |
|---------|--------|------------------|
| Projekt-Gehirn | Masterplan komplett ✅ | APs wählen |
| Chart-Engine | Stabil, offene APs | Siehe `docs/steering/BACKLOG.md` |
| Theme | In Entwicklung | `THEME-ASSEMBLY-CHECKLIST.md` |
| CSS | Stabil | Siehe `docs/steering/BACKLOG.md` (CSS-N Items) |
| Apps | Architektur beschlossen | DS-014 (Design-API) zuerst, dann App-Entwicklung |
| Content | Laufend | Redaktionsleitfaden aktiv |
| Security | Baseline dokumentiert | `SECURITY-BASELINE.md` |

---

## 5. Blocker

Keine akuten Blocker.

---

## 6. Nicht anfassen

- `Active Campaign Liste/` — Datenschutz, niemals in Git
- `Theme/.git/` — Deployment-Git, nicht umkonfigurieren
- Layer 1: `FinanzwesirData.js`, `CSVParser.js` — nur mit expliziter Begründung
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

2026-05-08 — Selbstlernendes System implementiert (Faden 3, alle 8 Schritte).
session-log + patterns (neu), abschluss-ritual Schritt 0 + Challenge-Response (erweitert),
/start Schritt 3c Learning-Pipeline (erweitert), kassensturz Lern-Loop (erweitert),
/distill + /uebergabe (neu), CLAUDE.md §12 Lastabwurf-System (neu). Pilot-Test ausstehend.

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

**PILOT-TEST — vor allen anderen Tasks:**
Das Selbstlernende System wurde implementiert aber noch nicht getestet.
Die 5 Pilot-Tests stehen in Abschnitt 3 (Nächster sinnvoller Schritt → Pilot-Test).
Erst wenn alle 5 ✓: System gilt als produktiv. Dann weiter mit DS-014 / AP-20/21.

Claude soll zuerst lesen:
1. `PROJECT-STATUS.md` (diese Datei)
2. `NAVIGATION.md`
3. aufgabenspezifische Steering-Dateien
4. relevante Specs

Nicht direkt mit Code beginnen.

Claude soll zuerst lesen:

1. `PROJECT-STATUS.md` (diese Datei)
2. `NAVIGATION.md`
3. aufgabenspezifische Steering-Dateien
4. relevante Specs

Nicht direkt mit Code beginnen.
