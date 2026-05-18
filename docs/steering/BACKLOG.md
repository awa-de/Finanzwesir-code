# BACKLOG – Finanzwesir 2.0
Stand: 2026-05-19 | Session: AF-15-Abschluss | Geändert von: Claude

**Regeln:**
- ✅-Zeilen werden sofort nach `BACKLOG-ARCHIV.md` verschoben (append), dann hier gelöscht.
- Neue Aufgabe: Albert sagt „neue Aufgabe" → Claude führt Abfrage-Protokoll aus (→ CLAUDE.md §6).
- Archivierungs-Trigger BACKLOG-ARCHIV.md: wenn > 200 Zeilen → Jahresarchiv anlegen.

---

## 🟡 Aktiv

| ID       | Bereich | Titel                                     | Prio | Dep | Detail                              |
|----------|---------|-------------------------------------------|------|-----|-------------------------------------|
| APP-01   | App     | B1 Slice-0-Reboot: neue APP_SPEC für Marktzeit-Mechanik erstellen | H | — | Apps/prokrastinations-preis/MINI_SPEC_FROM_HAUPTDOKUMENT.md |
| AP-20/21 | Engine  | Mixed-Rhythm CV-Heuristik (T5→T3→T6→T7)  | H    | —   | engine/detail/AP-20-DETAIL.md       |
| AP-6c    | Engine  | Touch-Tooltip Smartphone-Test             | M    | —   | engine/detail/AP-6c-DETAIL.md       |
| AP-22    | Engine  | Zero-Line lineWidth (~3 Zeilen Fix)       | L    | —   | —                                   |

---

## ⬜ Offen – Pre-Launch

| ID       | Bereich | Titel                                          | Prio | Dep          | Detail                                            |
|----------|---------|------------------------------------------------|------|--------------|---------------------------------------------------|
| DS-003   | Design  | Tastatur-Navigation testen (Safari/Firefox/Chrome) | H | —          | —                                                 |
| DS-004   | Design  | WCAG Kontrast-Tabelle dokumentieren            | H    | —            | —                                                 |
| TMPL-1   | Theme   | Ghost-Template bauen (Phase 2, 14 Items)       | H    | —            | theme-build/THEME-ASSEMBLY-CHECKLIST.md           |
| AP-19    | Engine  | PERIOD_TABLES DRY-Refactoring                  | M    | AP-18 ✅     | engine/detail/AP-19-DETAIL.md                     |
| DS-012   | Design  | Tailwind-Config kanonisch in DESIGN-SYSTEM.md  | H    | —            | —                                                 |
| DS-013   | Design  | Ghost screen.css-Einbindung prüfen + master-template Token-Duplikat klären | M | — | —                              |
| DS-014   | Design  | 07-APP-KOMPONENTEN.md — Design-API Baukasten   | H    | DS-012       | Blocker für alle App-Entwicklung                  |
| CSS-5    | CSS     | Farb-Audit + screen.css Verifikation           | M    | CSS-3 ✅     | —                                                 |
| AP-DOC-1 | Engine  | Basis/Prompts/ bereinigen (5 Dateien)          | H    | —            | engine/detail/AP-DOC-1-DETAIL.md                  |
| AP-SEC-1 | Engine  | Domain-Lock Validierungsfunktion implementieren| M    | AP-DOC-1     | —                                                 |
| ST-01    | System  | Scope-Creep-Erkennung stärken — proaktiver Mid-Work-Check nach jedem Patch + Selftest-Szenario Pfad 14 | H | — | — |
| ST-02    | System  | Selftest: Szenario „Protected Path direkt" ergänzen — Pfad 11, PROTECTED_PATHS.json-Protokoll vs. CLAUDE.md-Tabu-Regel | H | — | — |
| CL-04    | Cleanup | theme/CLAUDE.md schreiben                      | M    | —            | —                                                 |
| CL-05    | Cleanup | apps/CLAUDE.md schreiben                       | M    | —            | —                                                 |
| CL-06    | Cleanup | Duktus-Analyse Blog-Texte lesen                | M    | —            | —                                                 |
| CL-07    | Cleanup | Skill style-finanzwesir-duktus erstellen       | M    | CL-06        | —                                                 |
| CL-12    | Cleanup | VG Wort Pixel ins Theme einbinden              | M    | TMPL-1       | —                                                 |
| CL-13    | Cleanup | Clicky Analytics einbinden                     | M    | —            | —                                                 |
| CSS-6    | CSS     | Tailwind Production-Build (< 30 KB)            | H    | CSS-5        | —                                                 |
| CSS-7    | CSS     | Asset-Einbindung verifizieren                  | H    | TMPL-1       | —                                                 |
| TH-03    | Theme   | Integration & QA (Phase 3, 16 Items)           | H    | TMPL-1       | theme-build/THEME-ASSEMBLY-CHECKLIST.md           |
| CL-03    | Cleanup | Vermächtnis-Inhalte überführen                 | M    | —            | —                                                 |
| TH-04A   | Theme   | Performance-Audit (Phase 4A, 18 Items)         | H    | TH-03        | theme-build/THEME-ASSEMBLY-CHECKLIST.md           |
| TH-04B   | Theme   | Sicherheits-Audit (Phase 4B, 18 Items)         | H    | TH-03        | theme-build/THEME-ASSEMBLY-CHECKLIST.md           |
| TH-05    | Theme   | Deployment (Phase 5, 5 Items)                  | H    | TH-04A, TH-04B | theme-build/THEME-ASSEMBLY-CHECKLIST.md         |
| TH-06    | Theme   | Ghost-Instanz konfigurieren (Phase 6)          | H    | TH-05        | theme-build/THEME-ASSEMBLY-CHECKLIST.md           |
| AF-04    | App     | AUTHOR_GUIDE harmonisieren — `data-app` → `data-fw-app` | M    | Pilot-1      | —                                                 |
| AF-05    | App     | Redakteurs-Cheat-Sheet fw-apps erstellen        | M    | Pilot-1      | —                                                 |

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
