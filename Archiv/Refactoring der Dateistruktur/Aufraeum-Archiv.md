# Aufräum-Archiv: Finanzwesir 2.0

> **Zweck dieser Datei:** Vollständige Prozessdokumentation aller abgeschlossenen Phasen.
> Nicht bei jedem Session-Start einlesen — nur bei gezieltem Nachschlagebedarf.
> Aktive Jobs + Context → `Aufraeum-Analyse.md`

Stand: 2026-05-02 00:00 | Letzte Phase: 9

---

## Strategische Vorentscheidung: Merge Theme + Finanzwesir Vermächtnis

> Beide Verzeichnisse sollen zu **einem** versionierbaren Projekt zusammengeführt werden.
> Leitprinzip: **Trenne sauber, was zum Ghost-Theme gehört, was zur Chart Engine gehört, und was zu den Apps gehört.**

### Entwurf Merge-Zielstruktur

```
finanzwesir-2.0/              ← das zusammengeführte Git-Repo
├── .claude/                  ← aus Theme, erweitert mit Vermächtnis-Prompts
│   ├── CLAUDE.md
│   ├── MEMORY.md             ← neu: persistentes KI-Gedächtnis
│   ├── skills/               ← aus Theme/.claude/skills/
│   └── settings.local.json
├── theme/                    ← Ghost-Theme-Code (aus Theme/)
│   ├── assets/
│   ├── partials/
│   └── index.html
├── fw-chart-engine/          ← aus Theme/assets/js/fw-chart-engine/ herausgelöst
│   ├── core/
│   ├── strategies/
│   ├── data/                 ← CSV-Testdaten (aus Theme/data/)
│   └── tests/
├── apps/                     ← aus Vermächtnis/Content und Apps/Apps/
├── content/                  ← aus Vermächtnis: Artikel, Meta, Rechtliche Seiten
├── docs/                     ← zusammengeführte Dokumentation
└── _aufbau/                  ← Konzeptdoku aus Vermächtnis
```

**Was NICHT ins Repo kommt:**
- `Active Campaign Liste/` (sensible E-Mail-Daten)
- `Archiv/` (historisch, kein Mehrwert in Git)

---

## Architektur: Die drei Stränge

| Strang | Was | Ändert sich | Schlüsseldateien |
|--------|-----|-------------|-----------------|
| 1. Theme / Design-System | Ghost-Template, CSS, Fonts, Tokens | Selten — einmal gut, dann stabil | `theme/`, `design-system/tokens.css` |
| 2. Apps | Interaktive Rechner, Chart Engine, Logik | Mittel — neue Features, Bugfixes | `apps/`, `fw-chart-engine/` |
| 3. Content / Texte | Blogartikel, Meta, App-Copy | Oft — redaktionelle Arbeit | `content/`, `copy.md` pro App |

### Die drei Schnittstellen-Verträge (FAANG-Prinzip)

**Vertrag 1: Theme ↔ Apps**
Das Theme definiert einen App-Container — eine feste HTML-Struktur, in die jede App eingebettet wird. Apps verwenden ausschließlich CSS-Klassen aus dem Design-System. Keine eigenen Farben, keine eigenen Schriften. Der Vertrag liegt in `design-system/components/app-container.md`.

**Vertrag 2: Apps ↔ Content** ← der wichtigste
Alle nutzer-sichtbaren Texte einer App leben **nicht im App-Code**, sondern in einer eigenen `copy.md` pro App. Redakteur ändert Copy, ohne JS anzufassen. Entwickler ändert Logik, ohne Redakteur zu brauchen.

**Vertrag 3: Content ↔ Theme**
Der Author Guide definiert, welche Ghost-Formatierungen erlaubt sind. Das Theme garantiert deren gutes Aussehen. Kein Content weicht davon ab.

---

## App-Architektur (beschlossen 2026-05-01)

### Ghost HTML-Card (das ist alles, was der Author schreibt)

```html
<div class="fw-app"
     data-app="etf-wahlurnen-rechner"
     data-csv="https://www.finanzwesir.com/assets/data/msci-world.csv">
</div>
```

### Technische Entscheidungen

| Frage | Entscheidung | Begründung |
|-------|-------------|-----------|
| Backend? | Keines | Reine Client-Side-Verarbeitung |
| Dateneingabe | CSV / JSON / TXT per `data-*`-Attribut + User-Inputs | Wie Chart-Engine |
| CSV-Parser | Wiederverwendung aus Chart-Engine | Bereits vorhanden |
| App-JS | Extern in `Theme/assets/js/apps/[name].js` | Bugfix einmal → alle Seiten bekommen Update |
| CSS-Tokens | Bleiben in `screen.css` Abschnitt 1 | Bereits Standard, keine neue Datei |
| Inline-CSS in App | Nur `var(--fw-*)` Tokens | Keine eigenen Farbwerte, kein externes Font-CDN |

### Konzeptuelle Rolle der Chart Engine (beschlossen 2026-05-01)

Die Chart Engine hat eine **Doppelrolle**:

1. **Solo-Betrieb:** Die Chart Engine steht eigenständig. Ein Artikel hat einen Chart-Div, das Theme lädt die Engine, fertig.
2. **Dienstleister für Apps:** Die 18 ETF-Apps können die Chart Engine als Rendering-Library nutzen.

`fw-chart-engine/` steht **gleichrangig neben** `apps/`, nicht darunter. Eine Library ist keine App.

---

## Git-Strategie (beschlossen)

**Ein Monorepo `finanzwesir-2.0`** für Theme + Apps + Design-System + Chart Engine.

**Begründung:**
* Einpersonen-Projekt — der Overhead mehrerer Repos überwiegt den Nutzen
* Atomare Commits über Stränge hinweg möglich
* Eine `.claude/`-Konfiguration für alles

**Repo-Ort: Option B (außerhalb Nextcloud)**
`C:\Users\Albert HP PC\dev\finanzwesir-2.0\` — Git und Nextcloud vertragen sich nicht gut bei Repos mit vielen kleinen Dateien.

### .gitignore-Kandidaten

```
# Sensibel
*.env
secrets/
Active Campaign Liste/

# Vendor / Build
assets/js/vendor/
node_modules/

# Betriebssystem
.DS_Store
Thumbs.db
```

---

## Claude-Konfiguration: Hierarchie

```
finanzwesir-2.0/
├── CLAUDE.md              ← Ebene 1: Gesamtprojekt-Kontext
├── theme/
│   └── CLAUDE.md          ← Ebene 2: Theme-spezifisch
└── apps/
    └── CLAUDE.md          ← Ebene 2: App-spezifisch
```

### Skills (bereits vorhanden)

| Skill | Zweck |
|-------|-------|
| `00-style-sei-deutsch` | Stilvorlage Finanzwesir-Duktus |
| `01-process-extreme-ownership` | Arbeitsprozess-Prinzipien |
| `code-quality-faang-review` | Code-Review-Standard |
| `spec-mode-architecture` | Architektur-Spezifikation schreiben |
| `impl-mode-workpackages` | Implementierung in Arbeitspakete |
| `check-mode-gatekeeper` | Qualitäts-Gate vor Merge |

---

## Was in Phase 0 erledigt wurde (2026-05-01)

| Aufgabe | Ergebnis |
|---------|---------|
| `_kontaktformular/` gelöscht | ✅ 51.346 Spam-Dateien, 30,6 MB |
| `Archiv/` angelegt und befüllt | ✅ Rechtliches, Berechnungen→Historische Excel-Kalkulationen, Seminar - die Basis |
| `Datenquellen für Apps/` angelegt | ✅ leerer Platzhalter |
| `Design/` abgeglichen | ✅ 3 Dateien → `Archiv/Design/`, Rest gelöscht |

---

## Was in Phase 1 erledigt wurde (2026-05-01/02)

| # | Aufgabe | Ergebnis |
|---|---------|---------|
| 5 | Root-HTML-Dateien sortieren | ✅ `index.html` bleibt, 18 Test-HTMLs → `Theme/chart-tests/` |
| 7 | `docs/spec/archiv/` angelegt | ✅ 4 alte Versionen verschoben (v12, v13, TECH_SPEC_V1, Beschreibung v3) |
| 8 | `docs/context/archiv/` angelegt | ✅ 8 historische Prompts verschoben |
| 10 | `RADME.md` gelöscht | ✅ Tippfehler-Datei in `.claude/skills/` |

**docs/spec/ bereinigt (2026-05-02):**
- `master-template-v6.html`, `ui-kit-demo-v11.html`, `ui-kit-reference-v4.html` → gelöscht (Duplikate von `Archiv/Design/`)
- `REDAKTEURS-HANDBUCH` × 2 → `Content-Workflow/`
- Aktiver Bestand in `docs/spec/` (13 Dateien): Architecture Strategy, Chart.js bändigen, Charts Ticks v14, Rucksack, X-Achse I–III + Datendichte + Extraktion, Mobile vs Desktop, TECH-SPEC, Tooltips v2, Y-Achse v2

---

## Was in Phase 2 erledigt wurde (2026-05-01)

| # | Aufgabe | Ergebnis |
|---|---------|---------|
| 11 | Regulatorik I + II archiviert | ✅ → `Archiv/Apps/`. Regulatorik III → `Apps/regulatorik-dashboard/` |
| 12 | Regulatorik-Verhältnis geklärt | ✅ I+II = Iterationsgeschichte, III = aktive Basis |
| 14 | `Content-Eingabe in Ghost/` | ✅ v3 → `Content-Workflow/`, v1+v2 → `Archiv/` |
| 15 | `1. Design-Matrix/` aufgelöst | ✅ Homepage → `Theme/homepage/`, LLM-Evaluation → `Archiv/Design/` |
| 16 | `2. Ghost.io-Template/` aufgelöst | ✅ Start.md → `Theme/docs/context/archiv/` |
| 17 | `3. Kurs-Charts/` archiviert | ✅ → `Archiv/Chart-Engine-Historie/` |
| 18 | `Basis/Homepage/` aufgelöst | ✅ LLM-Evaluierungen → `Archiv/Design/Homepage/` |
| 19 | `Basis/Meta/` aufgelöst | ✅ 4 Seiten → `content/pages/` |
| 20 | `Basis/Rechtliche Seiten/` | ✅ Impressum/Datenschutz → `content/legal/`; CLICKY + KOCHREZEPT → Top-Level |
| 21 | `Basis/` Root-Dateien | ✅ MOC gelöscht, Cheat-Sheet → `Content-Workflow/`, GEO → `docs/editorial/` |

**Bestätigte Duplikate (bereinigt):**

| Datei | In Vermächtnis | In Theme | Entscheidung |
|-------|---------------|----------|-------------|
| `master-template-v6.html` | `1. Design-Matrix/` | `docs/spec/` | Vermächtnis-Kopie → `Archiv/Design/` |
| `ui-kit-demo-v11.html` | `1. Design-Matrix/` | `docs/spec/` | Vermächtnis-Kopie → `Archiv/Design/` |
| `ui-kit-reference-v4.html` | `1. Design-Matrix/` | `docs/spec/` | Vermächtnis-Kopie → `Archiv/Design/` |

---

## Was in Phase 3 erledigt wurde (2026-05-02, teilweise)

| Aufgabe | Ergebnis |
|---------|---------|
| Verzeichnisstruktur angelegt | ✅ `docs/` mit steering/spec/design-system/editorial/ |
| Theme-Inhalte überführt | ✅ `Theme/docs/` → `docs/`, `Theme/docs/` gelöscht |
| `.claude/` aufgebaut | ✅ von `Theme/.claude/` → Projektroot, CLAUDE.md erweitert |

---

## Was in Phase 4 erledigt wurde (2026-05-02, teilweise)

| Aufgabe | Ergebnis |
|---------|---------|
| Root-CLAUDE.md erweitert (Phase 6) | ✅ Titel, §1 Scope, Pfade, §7 Abschluss-Ritual, §8 Commit-Template |
| Root-CLAUDE.md erweitert (Phase 7) | ✅ Pre-Code-Gate, Abbruchkriterien, Regelaufnahme-Schutz, Protected Paths |
| Root-CLAUDE.md erweitert (Phase 8) | ✅ Session-Start Pflicht, Pre-Code-Gate sichtbar, App-Arbeit Routing, Stand-Datum |

---

## Was in Phase 5 erledigt wurde (2026-05-02)

| Aufgabe | Ergebnis |
|---------|---------|
| `docs/context/` Einzeldateien gesichtet | ✅ Alle 10 Dateien klassifiziert |
| GEO statt SEO.md → Content-Workflow/ | ✅ verschoben |
| SEO-WORKFLOW.md → Content-Workflow/ | ✅ verschoben |
| NAVIGATION.md am Projektroot erstellt | ✅ neu — Master-Router für LLMs und Albert |
| Zielstruktur entschieden | ✅ `docs/` zentral am Root, `Theme/` wird code-only |
| CLAUDE.md gelesen | ✅ existiert (11 KB), gut, wird aber NICHT geladen (lag in Theme/.claude/) |
| Alte Theme-Memory gelesen (28 KB) | ✅ Abschluss-Ritual identifiziert — fehlte in aktueller CLAUDE.md |
| docs/context/ Unterstruktur entschieden | ✅ engine/ + design/ + theme-build/ |

---

## Was in Phase 6 erledigt wurde (2026-05-02)

| Aufgabe | Ergebnis |
|---------|---------|
| `.claude/` von `Theme/` → Projektroot | ✅ CLAUDE.md wird jetzt automatisch geladen |
| `.gitignore` am Projektroot angelegt | ✅ Active Campaign Liste/, Archiv/, .claude/ u.a. ausgeschlossen |
| `docs/` Verzeichnisstruktur erstellt | ✅ steering/ (engine/design/theme-build/audits/archiv) + spec/ + design-system/ + editorial/ |
| `docs/steering/engine/` befüllt | ✅ KNOWN-ISSUES-Triade + WORKING-FEATURES |
| `docs/steering/design/` befüllt | ✅ CSS-KONVENTIONEN + DESIGN-SYSTEM-ISSUES |
| `docs/steering/theme-build/` befüllt | ✅ THEME-ASSEMBLY-CHECKLIST |
| `docs/steering/audits/` befüllt | ✅ 3 Audit-Dateien |
| `docs/steering/archiv/` befüllt | ✅ 12 historische Dateien |
| `docs/spec/` befüllt | ✅ alle Spec-Dateien aus `Theme/docs/spec/` |
| `docs/design-system/` befüllt | ✅ kompletter Baum aus `Theme/docs/design-system/` |
| `docs/editorial/` befüllt | ✅ aus `Content-Workflow/`, Quellordner gelöscht |
| `Theme/docs/` gelöscht | ✅ Theme ist jetzt code-only |
| CLAUDE.md erweitert | ✅ Titel, §1 Scope (ganzes Projekt), Pfade, §7 Abschluss-Ritual, §8 Commit-Template |
| NAVIGATION.md Pfade aktualisiert | ✅ alle `Theme/docs/context/` + `Content-Workflow/` Pfade neu |
| Alte Theme-Memory archiviert | ✅ → `docs/steering/archiv/MEMORY-THEME-PHASE.md` |
| `docs/steering/SYSTEM-DESIGN.md` erstellt | ✅ Architektur, Workflow, Design Decisions |

**docs/context/ Klassifizierungen (alle erledigt):**

| Datei | Ziel | Status |
|-------|------|--------|
| `Briefing Ghost.io-Tuning für Andreas.md` | `docs/steering/archiv/` | ✅ |
| `DESIGN-SYSTEM-ISSUES.md` | `docs/steering/design/` | ✅ |
| `IMPLEMENTIERUNG BAN LINIENDIAGRAMME PROMPT.md` | `docs/steering/archiv/` | ✅ |
| `KNOWN-ISSUES-ARCHIV.md` | `docs/steering/archiv/` | ✅ |
| `KNOWN-ISSUES-PROMPT.md` | `docs/steering/engine/` | ✅ |
| `PERFORMANCE-ANALYSE.md` | `docs/steering/audits/` | ✅ |
| `PROMPT-SECURITY-AUDIT.md` | `docs/steering/audits/` | ✅ |
| `SECURITY-AUDIT.md` | `docs/steering/audits/` | ✅ |
| `SEO-WORKFLOW.md` | `docs/editorial/` | ✅ |
| `THEME-ASSEMBLY-CHECKLIST.md` | `docs/steering/theme-build/` | ✅ |

---

## Was in Phase 7 erledigt wurde (2026-05-02)

Peer-Review-Findings (ChatGPT, Perplexity, Gemini) umgesetzt — Gehirn Iteration 2.
Ziel: Von „gut dokumentiert" zu „operativ fehlertolerant und regressionsarm".

| Aufgabe | Ergebnis |
|---------|---------|
| `CLAUDE.md` erweitert | ✅ Pre-Code-Gate, Abbruchkriterien, Regelaufnahme-Schutz, Protected-Paths-Verweis, §7 Schritt 0, Stand-Datum-Pflicht, PROJECT-STATUS |
| `.claude/PROTECTED_PATHS.json` angelegt | ✅ Maschinenlesbarer Guardrail-Katalog (forbidden / protected) |
| `PROJECT-STATUS.md` angelegt | ✅ Wiedereinstiegsdokument am Projektroot |
| `docs/steering/DEFINITION-OF-DONE.md` angelegt | ✅ Fertig-Kriterien für 7 Aufgabentypen |
| `docs/steering/engine/REGRESSION-MATRIX.md` angelegt | ✅ 17 manuelle Regressionstests |
| `docs/steering/audits/SECURITY-BASELINE.md` angelegt | ✅ Security-Grundregeln + Domain-Lock + Audit-Pflegezyklus |
| `docs/steering/DECISION-LOG.md` angelegt | ✅ 3 offene Architekturentscheidungen |
| `docs/steering/templates/SESSION-CONTRACT.md` angelegt | ✅ Template für längere oder riskante Sessions |
| `docs/steering/templates/ISSUE-TEMPLATE.md` angelegt | ✅ Template für APs und Bugs |
| `docs/spec/APP-INTERFACE.md` angelegt | ✅ Vertrag Ghost-HTML ↔ App-JS |
| `NAVIGATION.md` erweitert | ✅ Neue Dateien geroutet |
| `docs/steering/engine/KNOWN-ISSUES.md` ergänzt | ✅ 4 Tracking-APs: AP-DOC-1 bis AP-DOC-4 |

---

## Was in Phase 8 erledigt wurde (2026-05-02)

Trigger-Analyse der CLAUDE.md-Verhaltensregeln und Härtung der schwachen Trigger.
Ziel: Implizite Annahmen durch explizite Kommunikation ersetzen — Sherpa-Prinzip.

| Aufgabe | Ergebnis |
|---------|---------|
| Trigger-Analyse: 9 CLAUDE.md-Trigger bewertet | ✅ 8 von 9 als reine Verhaltensversprechen identifiziert; 5 schwache Trigger als Lücken priorisiert |
| data-csv Domain-Lock als CLAUDE.md-Regel geprüft | ✅ Abgelehnt — technisch im App-Code erzwungen |
| `CLAUDE.md` §6 — Session-Start Pflicht | ✅ PROJECT-STATUS.md + NAVIGATION.md lesen + bestätigen |
| `CLAUDE.md` §6 — Pre-Code-Gate sichtbar | ✅ 7 Gate-Antworten in Chat schreiben; Single-File vs. Multi-File Bestätigungsregel |
| `CLAUDE.md` §6 — App-Arbeit Routing-Pflicht | ✅ APP-INTERFACE.md + SECURITY-BASELINE.md als Pflicht-Lektüre |
| `CLAUDE.md` §6 — Stand-Datum Sofortpflicht | ✅ Steering-Dateien sofort beim Edit aktualisieren |
| Strukturelle Lücken dokumentiert | ✅ 2 nicht durch CLAUDE.md schließbar: Cross-session Abbruch-Zähler, Protected Paths technisch |

---

## Was in Phase 9 erledigt wurde (2026-05-02)

Technische Implementierung der zwei verbleibenden strukturellen Lücken aus Phase 8.
Ziel: Von Verhaltensversprechen zu technisch erzwungenen Guardrails.

| Aufgabe | Ergebnis |
|---------|---------|
| `.claude/hooks/check-protected-paths.ps1` angelegt | ✅ PreToolUse-Hook: `forbidden` → exit 2 (geblockt), `protected` → Warnung |
| `.claude/ATTEMPT-LOG.json` angelegt | ✅ Cross-session Abbruch-Zähler; leer initialisiert |
| `.claude/settings.local.json` erweitert | ✅ `hooks.PreToolUse` auf `Write|Edit` |
| `CLAUDE.md` §6 Session-Start erweitert | ✅ Schritt 3: ATTEMPT-LOG.json lesen |
| `CLAUDE.md` §6 Abbruchkriterien erweitert | ✅ Schreib-Pflicht nach jedem gescheiterten Versuch |
| Domain-Lock aus offenen Lücken entfernt | ✅ War bereits technisch im App-Code erzwungen |
| Obsolete Regulatorik-Zeile gelöscht | ✅ Kein aktives Entwicklungsgebiet mehr |

**Mechanik Protected Paths Hook:**
* Hook liest `file_path` aus dem Tool-Input (stdin JSON)
* Vergleicht gegen alle Einträge in `.claude/PROTECTED_PATHS.json`
* `forbidden`: Operation wird geblockt (exit 2) — kein Bypass ohne Alberts explizite Anweisung
* `protected`: Warnung wird ausgegeben, Operation läuft durch

**Mechanik ATTEMPT-LOG:**
* Claude schreibt nach jedem gescheiterten Fix einen Eintrag (issue-key, attempts, description, status, files_touched, last_hypothesis)
* Bei `attempts >= 2`: status → `BLOCKED`
* Jede Session liest die Datei als Schritt 3 des Session-Start-Rituals
* Treffer auf `BLOCKED` oder `attempts >= 2` → sofortiger Abbruch-Trigger

---

## Detailnotizen: Theme (Kontext)

**Rolle:** Herzstück von Finanzwesir 2.0 — aktives Entwicklungsverzeichnis mit Git, Claude-Steuerung, Ghost-Theme und Chart Engine.

### Block A: Ghost-Theme (bleibt in Theme)

| Bereich | Inhalt | Bewertung |
|---------|--------|-----------|
| `assets/css/` | `screen.css` | OK — produktiv, canonical |
| `assets/fonts/` | Source Sans Pro, Archivo Black | OK |
| `assets/images/` | SVGs, Favicons, Bilder | OK, aber Duplikate (offen) |
| `assets/js/fw-janitor.js` | Theme-spezifisches JS | OK |
| `assets/js/vendor/` | Chart.js (UMD) | OK |
| `partials/` | Ghost-Partials | OK (leer, nur .gitkeep) |
| `index.html` | Haupt-Testseite | Behalten |
| `.claude/` | CLAUDE.md, settings.local.json, Skills | Gut strukturiert, behalten |

### Block B: Chart Engine (Merge-Kandidat)

| Bereich | Inhalt | Hinweis |
|---------|--------|---------|
| `assets/js/fw-chart-engine/` | Core, Strategies, Data (15 JS-Dateien) | Bleibt vorerst hier, zieht beim Merge in eigenes Verzeichnis |
| `data/` | 60+ CSV-Testdaten | Gehören zur Chart Engine, nicht zum Theme |

### Aktiver Bestand docs/spec/ (13 Dateien)

Architecture Strategy, Chart.js bändigen, Charts Ticks v14, Rucksack, X-Achse I–III + Datendichte + Extraktion, Mobile vs Desktop, TECH-SPEC, Tooltips v2, Y-Achse v2.

---

## Detailnotizen: Inhalte alte Site (Kontext)

**Rolle:** Steinbruch für Finanzwesir 2.0 — Blogposts, Evergreen-Texte, Stilvorlage für Duktus/Ton

**Struktur:**
- `blog/` — 867 Dateien (Kern-Content, Blogposts im Markdown-Format)
- `buecher/` — 25 Dateien
- `angebote/` — 14 Dateien (Seminar, Coach, Podcast, Fincamp, Workation)
- `erfolg/` — 13 Dateien (Danke-Seiten, Onboarding-Flows)
- Einzelseiten: Impressum, Datenschutz, Newsletter, Transparenz, Über mich etc.

**Offene Aufgabe (Phase 4, Item 24):** Blog-Texte lesen → Duktus des Finanzwesirs herausarbeiten als Stilvorlage für App-Texte in Finanzwesir 2.0
