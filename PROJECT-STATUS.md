# PROJECT STATUS — Finanzwesir 2.0

Stand: 2026-05-03 19:15 | Session: Infrastruktur-Session-Start | Geändert von: Claude

**Zweck:** Schneller Wiedereinstieg nach Pausen.
**Zielgruppe:** Albert und Claude.
**Wann lesen:** Immer zu Session-Beginn, besonders nach längerer Pause.
**Wann aktualisieren:** Nach längeren Sessions, Meilensteinen oder geändertem Projektfokus.
**Gehört hier hinein:** Aktueller Fokus, stabiler Stand, nächster Schritt, Blocker.
**Gehört nicht hier hinein:** Detailbugs, vollständige Specs, lange Diskussionen.

---

## 1. Aktueller Fokus

Design-System holistisch analysiert (2026-05-03). Architektur-Entscheidungen getroffen, drei neue APs im Backlog (DS-012, DS-013, DS-014).
DS-014 (Design-API Baukasten) ist Blocker für alle 18+ App-Entwicklungen — höchste Priorität neben AP-20/21.

---

## 2. Letzter stabiler Stand

- Masterplan vollständig abgeschlossen (2026-05-03): Projekt-Gehirn gehärtet.
- Design-System-Analyse abgeschlossen (2026-05-03): Architektur klar, Lücken identifiziert.
- `01-FARBEN-UND-TYPOGRAFIE.md`: Font-Loading korrigiert (lokal statt Google CDN).
- `DESIGN-SYSTEM.md`: Tech-Stack aktualisiert (v1.1).
- Neue APs: DS-012 (Tailwind-Config kanonisch), DS-013 (Ghost-Einbindung klären), DS-014 (Design-API Baukasten).
- Chart-Engine: stabil, offene APs in BACKLOG.md (AP-20/21 🟡 Aktiv, AP-6c 🟡 Aktiv).
- Ghost-Theme: in Entwicklung, noch kein Deploy.

---

## 3. Nächster sinnvoller Schritt

- **DS-014** (Design-API Baukasten — 07-APP-KOMPONENTEN.md) — Blocker für alle App-Entwicklung
- **DS-012** (Tailwind-Config kanonisch) — Voraussetzung für DS-014
- **AP-20/21** (Mixed-Rhythm CV-Heuristik) — bereits 🟡 Aktiv, Chart-Engine
- **CL-01 → CL-02** (Git-Repo einrichten) — Blocker für CL-03

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

2026-05-03 (nachmittags) — Design-System holistisch analysiert.
Spec 01- Font-Loading korrigiert (Google → lokal). DESIGN-SYSTEM.md v1.1.
Architektur-Entscheidungen: zwei Rendering-Welten, FwTheme als CSS-Bridge, Dark Mode = Ghost Theme.
Design-API-Konzept definiert: zentraler Baukasten, alle Apps nutzen dieselbe CSS-Selektoren, Zustände vollständig definieren.
Neue APs: DS-012, DS-013, DS-014.

2026-05-03 (vormittags) — Masterplan vollständig abgeschlossen (A + B + C–J + 5 Lücken).

---

## 9. Einstieg für nächste Session

Claude soll zuerst lesen:

1. `PROJECT-STATUS.md` (diese Datei)
2. `NAVIGATION.md`
3. aufgabenspezifische Steering-Dateien
4. relevante Specs

Nicht direkt mit Code beginnen.
