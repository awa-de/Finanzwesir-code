# NAVIGATION.md – Finanzwesir 2.0
Stand: 2026-06-03 | Session: Datenlayer-Setup | Geändert von: Claude

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
| `.claude/agents/` | Modellgebundene Haiku-Subagenten für mechanische Zuarbeit (codebase-scout, spec-scout, regression-scout, abschluss-scout) |
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
| `/intake` | Aufnahme-Protokoll für neue Aufgaben (5 Fragen → BACKLOG-Eintrag) | Claude startet bei NEUE AUFGABE; oder Albert ruft explizit auf |
| `/pre-code-gate [light\|full]` | Gate-Checklisten ausführen (Light: 3 Fragen / Full: 9 Fragen) | Claude startet automatisch vor Code; oder manuell |
| `/subagent-dispatch` | Entscheidungshilfe Subagenten (Tiering, Eskalationsregel) | BUG/FIX Schritt 7; oder manuell |
| `/finde-skills` | Skill aus externen Marktplätzen suchen, sicherheitsgeprüft integrieren | Manuell wenn neuer Skill gesucht wird |
| `/heldenreise` | Beweisdramaturgie für APP_SPEC.md: Heldenreise, Tufte, Krug, FAANG, Ethik-Gate — Pflicht bei App-Fabrik-Apps | Nur manuell (Albert) — Claude startet nie automatisch |
| `/tech-spec-app {slug}` | technische APP_SPEC erstellen oder prüfen (18 Pflichtabschnitte: App-Familie, Inputs/Outputs, State-Modell, AppContext, A11y, Sicherheit, Testfälle) | Manuell (Albert) oder durch /app-spec-create |
| `/app-spec-create {slug}` | vollständige APP_SPEC erstellen: tech-spec-app + heldenreise + Spec-Gate-Checkliste (5 Phasen) | Nur manuell (Albert) — kein Auto-Trigger |

---

## Routing nach Aufgabe

### Wiedereinstieg / neue Session

Session-Start läuft über zwei Stufen:

**Stufe 1 — `SessionStart`-Hook** liefert maschinenlesbaren Kontext aus `PROJECT-STATUS.md` (HOOK-META) und den Zustandsdateien:
```
Fokus-AP | Nächster-Schritt | Blocker       ← HOOK-META in PROJECT-STATUS.md
BLOCKED-APs                                  ← .claude/ATTEMPT-LOG.json
Log-Zählung | letzter Distill                ← .claude/learning/session-log.md
Pattern-Kandidaten                           ← .claude/learning/patterns.md
Subagent-Modellstatus | Wochentag
```

**Stufe 2 — `/start` synthetisiert:**
```
0. session-log Eintrag schreiben (Kern-Invariante 5)
1. BLOCKED-Check (aus Hook-Output)
2. spec-scout-Dispatch für Backlog-/Archiv-/AP-ID-Abgleich
3. Hauptinstanz urteilt (Lücken-Alarm, Distill-Empfehlung)
4. Kommunikationsstil laden
5. SESSION-START-Zeile ausgeben
```

Mechanische Zuarbeit läuft über Subagenten (`spec-scout` für NAVIGATION/BACKLOG-Arbeit).
Subagent-Modell: `CLAUDE_CODE_SUBAGENT_MODEL=haiku` (gesetzt in `.claude/settings.local.json`).
Urteile, Gates, Freigaben und Synthese bleiben bei der Hauptinstanz.
Bei `Hook-Status: DEGRADED` → sichtbar melden, nicht still fortfahren (→ `/start` § Hook-Status-Check).

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

Pre-Code-Gate läuft automatisch (→ /pre-code-gate).
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

**Design-Ressourcen (bei Styling-Entscheidungen prüfen):**
- https://styles.refero.design/ — Komponenten-Galerie, Stil-Referenzen
- https://refero.design/mcp — MCP-Integration für Design-Referenzen

Nach Abschluss: `/abschluss-ritual`.

---

### App bauen / ändern (Apps/)

```
1. docs/spec/APP-INTERFACE.md                     ← Vertrag Ghost-HTML ↔ App-JS (Pflicht)
2. docs/steering/audits/SECURITY-BASELINE.md      ← Pflicht vor App-Arbeit
3. docs/steering/design/CSS-KONVENTIONEN.md       ← Klassen-Naming
4. docs/design-system/                            ← Tokens, bestehende Komponenten
5. docs/App-Fabrik/APP_INVENTORY.md               ← Alle 25 App-Ordner, Datenbedarf, offene Klärungen
6. docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md ← Dateistruktur-Standard, Ghost-Card-Vertrag, DoD
7. docs/App-Fabrik/04_CLAUDE_WORKFLOW_DRAFT.md    ← Skills-Mapping, Phasen Intake→Spec→Gate→Release
8. docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md ← Architekturprinzipien P-01–P-10 (bei Daten/Kontext/A11y-Fragen)
9. docs/App-Fabrik/APP_FOLDER_STRUCTURE.md        ← Kanonische Dateiliste pro App-Ordner (Phase 0/1/2)
10. Apps/[App-Name]/                              ← App-spezifischer Code + Prototypen
11. Apps/[App-Name]/SLICE_PLAN.md (wenn vorhanden) ← Slice-Struktur + freigegebener Umfang (vor Implementierung lesen)
12. bei externer Datenquelle (CSV / historische Indexdaten / ETF-/Makrodaten) zusätzlich:
    - `docs/data/README.md`
    - `docs/data/DATENQUELLEN-GOVERNANCE.md`
    - `docs/data/SOURCE-TIERS.md`
    - `docs/data/DATASET-CATALOG.md`
    - `docs/data/INDEX-RETURN-VARIANTEN.md`
    - ggf. `docs/data/contracts/[dataset-id].md`
    → Gilt nur für datengetriebene Apps mit externer CSV-Quelle. Calculator-Apps ohne externe Datenquelle überspringen diesen Schritt.

> [!note] Datengetriebene Apps — Data Need Snapshot zuerst
> Bei datengetriebenen Apps ist zuerst der Abschnitt `Datenbedarf / Data Need Snapshot`
> in der jeweiligen `APP_SPEC.md` zu prüfen. Dieser Abschnitt sagt Claude, welche Daten
> die App fachlich braucht, welches Format erwartet wird, welche Ersatzdaten verboten sind
> und welche Datenfragen vor dem produktiven Bau offen sind.
> Nur bei Quellen-, CSV-, Contract- oder Datenänderungsfragen zusätzlich `docs/data/` lesen.

> [!note] B1 / prokrastinations-preis — Slice-0-Reboot abgeschlossen (2026-05-28)
> `Apps/prokrastinations-preis/APP_SPEC.md` V1.4 (Datenlayer-Konsistenz / Marktzeit-Mechanik) ist jetzt die operative Spec-Quelle.
> `Apps/prokrastinations-preis/MINI_SPEC_FROM_HAUPTDOKUMENT.md` bleibt als fachliche Hintergrundquelle.
> `SLICE_0_KICKOFF.md` und `SLICE_PLAN.md` sind VERALTET (alte Mechanik) — neue Slice-Dateien ausstehend.
> B1 ist Pilot-2 (Daten-/Chart-/Story-Pilot). Pilot-1 ist `risiko-uebersetzer` (Calculator-Pilot) — entschieden E-02, 2026-05-28.
13. bei Chart-Nutzung: relevante Chart-Engine-Spec + WORKING-FEATURES.md
```

Claude gibt Bestätigung aus bevor es weitergeht: „APP-INTERFACE.md ✓, SECURITY-BASELINE.md ✓."
Apps sind security-relevant sobald sie HTML, Nutzerparameter, externe URLs, CSV oder Script-Tags berühren.
Relative Pfade in `Apps/` können gebrochen sein — beim ersten Start prüfen.

**Design-Ressourcen (bei App-Styling-Entscheidungen prüfen):**
- https://styles.refero.design/ — Komponenten-Galerie, Stil-Referenzen
- https://refero.design/mcp — MCP-Integration für Design-Referenzen

Nach Abschluss: `/abschluss-ritual`.
Beweisdramaturgie prüfen: `/heldenreise` verfügbar (nur manuell).

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
| Externe B1-Datendateien | `Theme/assets/data/b1/` — produktive externe CSV-Dateien für Apps |
| Datenlayer Governance | `docs/data/` — Quellenregeln, Return-Varianten, Dataset Catalog, Contracts |
| Statische Seiten | `content/pages/` |
| Rechtliches | `content/legal/` |
| App-Ordner | `Apps/` |
| App-Fabrik Steuerung | `docs/App-Fabrik/` (00_STATUS, APP_INVENTORY, 01–05_*.md, App-Register, Factory-Analyse) |
| App-Intake-Prompts | `docs/App-Fabrik/_prompts/` — Prompt-Vorlagen für Intake-Interview (Claude, ChatGPT, Master) |
| Markenpositionierung | `docs/Marke/` — Elevator Pitch, Manifest, KI-Analyse-Runden (Erste/Zweite Runde) |

## Steuerungsdokumente (Auswahl)

| Dokument | Pfad | Beschreibung |
|---|---|---|
| Subagent-Policy Praxisnotiz | `docs/steering/SUBAGENT-POLICY-PRAXIS.md` | Warum und wie Haiku-Scouts zentral genutzt werden |

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
