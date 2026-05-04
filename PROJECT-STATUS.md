# PROJECT STATUS — Finanzwesir 2.0

Stand: 2026-05-04 | Session: Kontroll-System | Geändert von: Claude

**Zweck:** Schneller Wiedereinstieg nach Pausen.
**Zielgruppe:** Albert und Claude.
**Wann lesen:** Immer zu Session-Beginn, besonders nach längerer Pause.
**Wann aktualisieren:** Nach längeren Sessions, Meilensteinen oder geändertem Projektfokus.
**Gehört hier hinein:** Aktueller Fokus, stabiler Stand, nächster Schritt, Blocker.
**Gehört nicht hier hinein:** Detailbugs, vollständige Specs, lange Diskussionen.

---

## 1. Aktueller Fokus

Git-Migration abgeschlossen (2026-05-04). Programmier-Git läuft, GitHub verbunden.
Nächste Prioritäten: DS-012 → DS-014 (Design-API, Blocker für App-Entwicklung) + AP-20/21 (Chart-Engine).

---

## 2. Letzter stabiler Stand

- Kontroll-Rückkopplungs-System implementiert (2026-05-04): 4 neue Skills + 3 Upgrades aktiv.
  QA-Review (check-mode-gatekeeper) abgeschlossen. Pilot-Session ausstehend.
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

- **Pilot-Session** — Kontroll-Rückkopplungs-System verifizieren (vor allen anderen Tasks)
  7 Checks, der Reihe nach:
  1. `/start` → SESSION-START mit Layer-1-Fingerabdruck ✓ + Zählprüfung (N aktive APs) ✓
  2. Wenn Montag: Kassensturz erscheint automatisch danach
  3. Kleinen Test-Patch machen → Patch-Quittung erscheint automatisch ✓
  4. AP abschließen → abschluss-ritual Schritt 2b (Scope-Check) erscheint ✓
  5. Task mit ≥ 2 Dateien → Aufgaben-Echo erscheint vor Code ✓
  6. Technische Behauptung ohne Spec → spec-quote-Marking erscheint inline ✓
  7. fwContext-nahes AP → chain-of-custody nach Full-Gate ✓
  Erst wenn alle 7 ✓: System gilt als produktiv.
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

2026-05-04 — Kontroll-Rückkopplungs-System implementiert.
4 neue Skills (kassensturz, patch-quittung, chain-of-custody, spec-quote) + 3 Upgrades
(start G1/G2/G3, abschluss-ritual Scope-Check 2b, CLAUDE.md A1/A2).
QA-Review per check-mode-gatekeeper + 5 Korrekturen. Pilot-Session ausstehend.

2026-05-03 (nachmittags) — Design-System holistisch analysiert.
Spec 01- Font-Loading korrigiert (Google → lokal). DESIGN-SYSTEM.md v1.1.
Architektur-Entscheidungen: zwei Rendering-Welten, FwTheme als CSS-Bridge, Dark Mode = Ghost Theme.
Design-API-Konzept definiert: zentraler Baukasten, alle Apps nutzen dieselbe CSS-Selektoren, Zustände vollständig definieren.
Neue APs: DS-012, DS-013, DS-014.

2026-05-03 (vormittags) — Masterplan vollständig abgeschlossen (A + B + C–J + 5 Lücken).

---

## 9. Einstieg für nächste Session

**PILOT-SESSION — vor allen anderen Tasks:**
Das Kontroll-Rückkopplungs-System wurde implementiert aber noch nicht getestet.
Die 7 Checks stehen in Abschnitt 3 (Nächster sinnvoller Schritt → Pilot-Session).
Erst wenn alle 7 ✓: System gilt als produktiv. Dann weiter mit DS-014 / AP-20/21.

Claude soll zuerst lesen:

1. `PROJECT-STATUS.md` (diese Datei)
2. `NAVIGATION.md`
3. aufgabenspezifische Steering-Dateien
4. relevante Specs

Nicht direkt mit Code beginnen.
