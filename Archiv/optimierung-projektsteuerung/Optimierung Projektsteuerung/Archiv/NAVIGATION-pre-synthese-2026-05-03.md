# NAVIGATION: Finanzwesir 2.0

Stand: 2026-05-03 08:02 | Session: A7-Stand-Datum-Format | Geändert von: Claude

**Für LLMs:** Dieses Dokument lesen bevor Aufgaben gestartet werden.
**Für Albert:** Index aller Projektdokumente — was wo liegt und wann gelesen werden muss.

---

## Das Gehirn des Projekts

| Schicht | Pfad | Inhalt | Gelesen wann? |
|---------|------|--------|---------------|
| Langzeitgedächtnis | `C:\Users\Albert HP PC\.claude\projects\...\memory\` | User-Profil, Feedback, Projektfakten | Automatisch |
| Session-Regeln | `.claude/CLAUDE.md` | Arbeitsweise, Rechte, Verbote | Jede Session |
| **Projektstatus** | `PROJECT-STATUS.md` | Aktueller Fokus, letzter Stand, nächster Schritt | Session-Start / Wiedereinstieg |
| **Workflow-Kochbuch** | `WORKFLOW.md` | Schritt-für-Schritt für alle Arbeitssituationen | Bei Wiedereinstieg oder Unsicherheit |
| **Neue Aufgaben** | `NEUE-AUFGABEN.md` | Kochbuch: Einzelidee erfassen + Whiteboard zerlegen | Wenn neue Aufgaben entstehen |
| **Dieser Router** | `NAVIGATION.md` | Wo was ist, was wann lesen | Aufgabenbeginn |
| **System-Design** | `docs/steering/SYSTEM-DESIGN.md` | Warum diese Architektur, Invarianten, Erweiterungsrahmen | Vor Architekturänderungen |
| Steuerverzeichnis | `docs/steering/` | Tracking, offene Issues, Entscheidungen | Aufgaben-spezifisch |
| Definition of Done | `docs/steering/DEFINITION-OF-DONE.md` | Fertig-Kriterien pro Aufgabentyp | Vor Aufgaben-Abschluss |
| Technische Specs | `docs/spec/` | Bindende Spezifikationen | Bei Implementierungsarbeit |
| App-Interface | `docs/spec/APP-INTERFACE.md` | Vertrag Ghost-HTML ↔ App-JS | Vor App-Arbeit |
| Design-System | `docs/design-system/` | Visuelle Vorgaben, Komponenten | Bei CSS/App-Arbeit |
| Redaktion | `docs/editorial/` | Editorial-Prozesse, SEO, Content-Standards | Bei Content-Arbeit |

---

## Routing nach Aufgabe

### Chart-Engine: Feature oder Bugfix

```
1. docs/steering/BACKLOG-PROMPT.md                ← startet den Faden, gibt Kontext
2. docs/steering/BACKLOG.md                       ← alle offenen APs nach Prio
3. docs/steering/engine/detail/[AP-N]-DETAIL.md   ← Detail-Spec des gewählten AP
4. docs/spec/[relevante Spec]                     ← bindend, nicht verhandelbar
5. docs/steering/engine/WORKING-FEATURES.md       ← Regressionswächter (VOR der Arbeit lesen!)
```

Nach Abschluss:
- `BACKLOG.md` → Zeile ✅ → sofort nach `BACKLOG-ARCHIV.md` (append), dann löschen
- `WORKING-FEATURES.md` → bei Engine-APs aktualisieren

---

### Theme zusammenbauen (Templates, Assets, Deploy)

```
1. docs/steering/BACKLOG.md                              ← TMPL-1, TH-03..TH-06 Statuscheck
2. docs/steering/theme-build/THEME-ASSEMBLY-CHECKLIST.md ← Checkliste + aktueller Stand
3. docs/spec/[relevante Spec]                            ← bindend
```

Nach Abschluss: `THEME-ASSEMBLY-CHECKLIST.md` abhaken + BACKLOG-Zeile archivieren.

---

### CSS schreiben / Design umsetzen

```
1. docs/steering/design/CSS-KONVENTIONEN.md       ← Naming, Klassen (bindend für alle CSS-Arbeit)
2. docs/steering/BACKLOG.md                       ← offene Design/CSS-Issues (DS-N, CSS-N)
3. docs/design-system/spec/                       ← Tokens, Komponenten-Specs
```

Nach Abschluss: BACKLOG-Zeile archivieren.

---

### App bauen (Apps/)

```
1. docs/steering/design/CSS-KONVENTIONEN.md       ← Klassen-Naming (bindend)
2. docs/design-system/                            ← Tokens, bestehende Komponenten
3. Apps/[App-Name]/                               ← App-spezifischer Brief + Backlog
```

⚠️ Relative Pfade in `Apps/` können gebrochen sein — beim ersten Start prüfen.

---

### Content schreiben / Artikel produzieren

```
1. docs/editorial/AUTHOR_GUIDE-v3.md              ← Hauptleitfaden
2. docs/editorial/GEO statt SEO.md                ← Content-Strategie, URL-Regeln
3. docs/editorial/SEO-WORKFLOW.md                 ← Workflow pro Artikel
```

Theme-Docs nicht lesen — nicht relevant für Content-Arbeit.

---

### Wiedereinstieg nach Pause

```
1. PROJECT-STATUS.md                              ← Aktueller Fokus, Blocker, nächster Schritt
2. NAVIGATION.md                                  ← Routing
3. aufgabenspezifische Steering-Dateien           ← je nach Bereich
4. relevante Specs in docs/spec/                  ← bei Implementierungsarbeit
```

Nicht direkt mit Code beginnen.

---

### Security-relevante Änderungen

Bei jeder Änderung an CSV, externen URLs, Script-Tags, Ghost-Templates, Formularen, Nutzerparametern, Apps oder HTML-Ausgabe:

```
1. docs/steering/audits/SECURITY-BASELINE.md      ← Grundregeln + Domain-Lock
2. docs/spec/APP-INTERFACE.md                     ← bei App-Arbeit
3. betroffene Code-Datei
4. docs/steering/DEFINITION-OF-DONE.md            ← Fertig-Kriterium Security-Fix
```

Security ist kein Abschluss-Audit — sie beginnt vor dem Code.

---

### Qualitäts-Audit (Security, Performance)

```
1. docs/steering/audits/SECURITY-BASELINE.md      ← Grundregeln (immer zuerst)
2. docs/steering/audits/                          ← Prüfkataloge (3 Dateien)
3. docs/steering/engine/KNOWN-ISSUES-SCHLACHTPLAN.md ← §AUDIT-P + §AUDIT-S
```

⚠️ Nur nach CSS-5 + TMPL-1 + QA-1 aktivieren — nicht vorher.

---

## Schnellreferenz: Wo liegt was?

### Aktiver Code

| Was | Pfad |
|-----|------|
| Chart-Engine | `Theme/assets/js/fw-chart-engine/` |
| CSS (einzige Wahrheit) | `Theme/assets/css/screen.css` |
| Janitor | `Theme/assets/js/fw-janitor.js` |
| Chart.js (lokal) | `Theme/assets/js/vendor/` |
| Test-HTMLs (Dev) | `Theme/chart-tests/` (18 Dateien) |
| Regression-Matrix | `docs/steering/engine/REGRESSION-MATRIX.md` |
| Fonts | `Theme/assets/fonts/` |
| SVGs + Favicons | `Theme/assets/images/` (kanonisch) |

### Testdaten (Dev only — nicht deployen)

| Was | Pfad |
|-----|------|
| CSV-Testdaten | `Theme/data/` — Ghost lädt im Livebetrieb, kein Merge-Blocker |

### Content (Ghost-ready)

| Was | Pfad |
|-----|------|
| Statische Seiten | `content/pages/` |
| Rechtliches | `content/legal/` |

### Apps-Backlog

| Was | Pfad |
|-----|------|
| 21 App-Ordner | `Apps/` |

### Archiv

| Was | Pfad |
|-----|------|
| Alte Chart-Engine-Versionen | `Archiv/Chart-Engine-Historie/` |
| Historische Excel-Kalkulationen | `Archiv/Historische Excel-Kalkulationen/` |
| Alte Design-Dateien | `Archiv/Design/` |

### Niemals in Git

| Was | Warum |
|-----|-------|
| `Active Campaign Liste/` | Sensible E-Mail-Daten |

---

## Abhängigkeits-Reihenfolge (Gesamtprojekt)

```
CSS-2 ✅ → CSS-3 ✅ → CSS-5 ⬛
                          ↓
                       TMPL-1 ⬛ → CSS-7 ⬛ → TH-03 ⬛ → TH-04A+B ⬛ → TH-05 ⬛ → TH-06 ⬛
                                                                              ↑
                                                                       CSS-6 ⬛

Parallel zu CSS-5 möglich: AP-19 ⬛ (DRY-Refactoring) + AP-20/21 🟡 (Mixed-Rhythm)
```

Vollständige Aufgabenliste mit Deps: `docs/steering/BACKLOG.md`
Historischer Schlachtplan: `docs/steering/archiv/KNOWN-ISSUES-SCHLACHTPLAN-ARCHIV.md`

---

## Offene Querschnittsfragen

| Frage | Status |
|-------|--------|
| `Rechtliche Seiten/` (CLICKY + KOCHREZEPT): Heimat? | ⬛ Offen |
| `Basis/Prompts/` → `.claude/` mergen (5 Dateien) | ⬛ Offen — einzeln prüfen |
| Font-CSS-Dopplung: `fonts/styles.css` vs. `fonts/stylesheet.css` | ⬛ Offen |
| SVG-Duplikate: `assets/images/` vs. `docs/design-system/templates/assets/` | ⬛ Offen |
