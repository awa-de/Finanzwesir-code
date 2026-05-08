# NAVIGATION.md – Finanzwesir 2.0
Stand: 2026-05-08 | Session: Selbstlernendes System | Geändert von: Claude

Für Claude: **Routing-Dokument.** Wird beim Session-Start (Schritt 2) gelesen.
Gibt Pfade und Lese-Reihenfolgen vor — KEINE Verhaltensregeln (die stehen in CLAUDE.md).
Für Albert: Index aller Projektdokumente — was wo liegt und wann gelesen werden muss.

---

## Autoritäten

| Datei / Bereich | Rolle |
|---|---|
| `CLAUDE.md` | Verfassung: Verhalten, Gates, Entscheidungsbaum — KEIN Routing |
| `NAVIGATION.md` | Router: Pfade, Lese-Reihenfolgen — KEINE Verhaltensregeln |
| `docs/spec/` | Bindende technische und fachliche Spezifikationen |
| `docs/steering/` | Backlog, Status, Entscheidungen, QA, Regression |
| `.claude/skills/` | Detailprozeduren (aktive Skills — siehe § Skills) |
| `PROJECT-STATUS.md` | Tageslage: Fokus, Blocker, nächster Schritt |
| `MEMORY.md` | Stabile Projektfakten, Arbeitskontext |

---

## Skills (aktive Slash-Kommandos)

Claude ruft diese proaktiv auf, wenn der Kontext es erfordert.
Albert kann sie auch explizit aufrufen.

| Slash-Kommando | Wann | Trigger |
|---|---|---|
| `/abschluss-ritual [AP-N]` | Nach Abschluss einer Aufgabe | Claude bietet proaktiv an; oder Albert sagt „fertig" |
| `/decompose` | Wenn eine Ideensammlung in Tasks zerlegt werden soll | Albert sagt „jetzt zerlegen" |
| `/manual-test-plan [AP-N]` | Bei komplexen visuellen Testfällen | Claude schlägt vor; oder Albert ruft explizit auf |
| `/spec-rewrite-guard [Datei]` | Vor Änderungen an `docs/spec/`-Dateien | Claude startet automatisch bei Spec-Edits |
| `/start` | Pflichtstart jedes Fadens — liest 4 Dateien, lädt Kommunikationsstil | Albert tippt es als erstes in jeden neuen Faden |
| `/kassensturz` | Wöchentlicher Trend-Check (Backlog-Entwicklung, Blocker, Tendenz) | Montags automatisch in `/start`; oder manuell |
| `/patch-quittung` | Quittung nach jedem Patch (Zählung, Tabu-Check, Testfall) | Automatisch nach jedem Patch; oder manuell |
| `/distill` | Destilliert session-log zu Mustern in patterns.md | Von /start empfohlen (Schwellen-basiert); oder manuell |
| `/uebergabe` | Strukturierter Übergabeprompt + session-log Breadcrumb | Albert sagt „Übergabe/neuer Thread"; oder MODUS M |

---

## Routing nach Aufgabe

### Wiedereinstieg / neue Session

Session-Start läuft automatisch (→ CLAUDE.md § 2):
```
1. PROJECT-STATUS.md
2. NAVIGATION.md
3. .claude/ATTEMPT-LOG.json          ← BLOCKED prüfen
3c. .claude/learning/session-log.md + patterns.md  ← Learning-Pipeline (Lücken-Alarm, Distill-Empfehlung)
4. docs/steering/BACKLOG.md
```

---

### Chart-Engine: Feature oder Bugfix

```
0. .claude/ATTEMPT-LOG.json          ← BLOCKED oder attempts >= 2 prüfen
1. docs/steering/BACKLOG.md          ← alle offenen APs nach Prio
2. docs/steering/BACKLOG-PROMPT.md   ← startet den Faden, gibt Kontext
3. docs/steering/engine/detail/[AP-N]-DETAIL.md   ← Detail-Spec des AP
4. docs/spec/[relevante Spec]        ← bindend, nicht verhandelbar
5. docs/steering/engine/WORKING-FEATURES.md       ← Regressionswächter VOR der Arbeit
6. docs/steering/engine/REGRESSION-MATRIX.md      ← vor Abschluss relevante Tests
```

Pre-Code-Gate läuft automatisch (→ CLAUDE.md § 3).
Nach Abschluss: Claude bietet `/abschluss-ritual AP-N` an.

---

### Theme zusammenbauen (Templates, Assets, Deploy)

```
1. docs/steering/BACKLOG.md
2. docs/steering/theme-build/THEME-ASSEMBLY-CHECKLIST.md
3. docs/spec/[relevante Spec]
4. docs/steering/audits/SECURITY-BASELINE.md      ← bei Script-Tags, externen URLs
```

Nach Abschluss: THEME-ASSEMBLY-CHECKLIST.md abhaken → `/abschluss-ritual`.

---

### CSS schreiben / Design umsetzen

```
1. docs/steering/design/CSS-KONVENTIONEN.md       ← bindend für alle CSS-Arbeit
2. docs/steering/BACKLOG.md                       ← offene DS-N / CSS-N Issues
3. docs/design-system/spec/                       ← Tokens, Komponenten-Specs
4. Theme/assets/css/screen.css
```

Regeln (nie brechen):
- Eine CSS-Wahrheit: `Theme/assets/css/screen.css`
- Keine `fw-*` Klassen in `screen.css` definieren oder überschreiben
- Hex-Werte nur im Token-Abschnitt
- Keine externen Font-Quellen

Nach Abschluss: `/abschluss-ritual`.

---

### App bauen / ändern (Apps/)

```
1. docs/spec/APP-INTERFACE.md                     ← Vertrag Ghost-HTML ↔ App-JS (Pflicht)
2. docs/steering/audits/SECURITY-BASELINE.md      ← Pflicht vor App-Arbeit
3. docs/steering/design/CSS-KONVENTIONEN.md       ← Klassen-Naming
4. docs/design-system/                            ← Tokens, bestehende Komponenten
5. Apps/[App-Name]/                               ← App-spezifischer Brief + Backlog
6. bei Chart-Nutzung: relevante Chart-Engine-Spec + WORKING-FEATURES.md
```

Claude gibt Bestätigung aus bevor es weitergeht: „APP-INTERFACE.md ✓, SECURITY-BASELINE.md ✓."
Apps sind security-relevant sobald sie HTML, Nutzerparameter, externe URLs, CSV oder Script-Tags berühren.
Relative Pfade in `Apps/` können gebrochen sein — beim ersten Start prüfen.

Nach Abschluss: `/abschluss-ritual`.

---

### Content schreiben / Artikel produzieren

```
1. docs/editorial/AUTHOR_GUIDE-v3.md
2. docs/editorial/GEO statt SEO.md
3. docs/editorial/SEO-WORKFLOW.md
```

Theme-Docs nicht lesen — nicht relevant für Content-Arbeit.
Nach Abschluss: `/abschluss-ritual`.

---

### Security-relevante Änderungen

Bei jeder Änderung an CSV, externen URLs, Script-Tags, Ghost-Templates, Formularen,
Nutzerparametern, Apps oder HTML-Ausgabe:

```
1. docs/steering/audits/SECURITY-BASELINE.md      ← immer zuerst
2. docs/spec/APP-INTERFACE.md                     ← bei App-Arbeit
3. betroffene Code-Datei
4. docs/steering/DEFINITION-OF-DONE.md
```

Security ist kein Abschluss-Audit — sie beginnt vor dem Code.

---

### Spec- oder Doku-Rewrite

Claude startet `/spec-rewrite-guard [Datei]` automatisch bei Spec-Edits.
Manuelle Aktivierung: `/spec-rewrite-guard docs/spec/[Dateiname]`

---

## Schnellreferenz: aktive Codepfade

| Was | Pfad |
|---|---|
| Chart-Engine | `Theme/assets/js/fw-chart-engine/` |
| CSS (einzige Wahrheit) | `Theme/assets/css/screen.css` |
| Janitor | `Theme/assets/js/fw-janitor.js` |
| Chart.js lokal | `Theme/assets/js/vendor/` |
| Test-HTMLs (Dev) | `Theme/chart-tests/` |
| Regression-Matrix | `docs/steering/engine/REGRESSION-MATRIX.md` |
| Fonts | `Theme/assets/fonts/` |
| SVGs + Favicons | `Theme/assets/images/` |
| Learning-Pipeline (session-log, patterns) | `.claude/learning/` |

## Testdaten und Content

| Was | Pfad |
|---|---|
| CSV-Testdaten | `Theme/data/` — Dev only, nicht deployen |
| Statische Seiten | `content/pages/` |
| Rechtliches | `content/legal/` |
| App-Ordner | `Apps/` |

## Archiv

| Was | Pfad |
|---|---|
| Alte Chart-Engine-Versionen | `Archiv/Chart-Engine-Historie/` |
| Historische Excel-Kalkulationen | `Archiv/Historische Excel-Kalkulationen/` |
| Alte Design-Dateien | `Archiv/Design/` |

## Niemals in Git

| Was | Warum |
|---|---|
| `Active Campaign Liste/` | Sensible E-Mail-Daten |
| `Theme/data/` | Dev-Testdaten |
| lokale Secrets / Tokens | Datenschutz / Security |

---

## Abhängigkeits-Reihenfolge

```
CSS-2 ✅ → CSS-3 ✅ → CSS-5 ⬛
                          ↓
                       TMPL-1 ⬛ → CSS-7 ⬛ → TH-03 ⬛ → TH-04A+B ⬛ → TH-05 ⬛ → TH-06 ⬛
                                                                              ↑
                                                                       CSS-6 ⬛

Parallel zu CSS-5 möglich: AP-19 ⬛ (DRY-Refactoring) + AP-20/21 🟡 (Mixed-Rhythm)
```

Vollständige Aufgabenliste: `docs/steering/BACKLOG.md`

---

## Offene Querschnittsfragen

| Frage | Status |
|---|---|
| `Rechtliche Seiten/` (CLICKY + KOCHREZEPT): Heimat? | offen |
| `Basis/Prompts/` → `.claude/` mergen | offen — einzeln prüfen |
| Font-CSS-Dopplung: `fonts/styles.css` vs. `fonts/stylesheet.css` | offen |
| SVG-Duplikate: `assets/images/` vs. `docs/design-system/templates/assets/` | offen |
