# Übergabeprompt: Finanzwesir 2.0 — Phase 5
Stand: 2026-05-02 07:05 | Nächste Aufgabe: Restarbeiten Theme/ + Querschnittsthemen

---

## Regeln für tokensparendes Arbeiten (PFLICHT — immer einhalten)

- `Aufraeum-Analyse.md` NICHT prophylaktisch lesen — nur mit `offset`+`limit` wenn ein konkreter Abschnitt gebraucht wird
- Dateien erst lesen wenn konkret gebraucht — nicht vorsorglich
- Vor jeder Leseoperation in einem Satz erklären warum sie nötig ist
- **Fragen als Ja/Nein oder Einwort-Antwort formulieren** — das spart die meisten Tokens
- Niemals ganze Ordnerbäume rekursiv lesen — immer eine Ebene nach der anderen
- PowerShell-Ausgaben eingrenzen (`Select-Object`, `Format-Table` oder `sed` zum Kürzen)
- Vorhaben ankündigen → Albert gibt Kontext → dann handeln (nie umgekehrt)
- Lieber einmal mehr fragen als einmal mehr lesen

---

## Projekt (Kurzversion)

Albert Warnecke (Finanzwesir) baut `Finanzwesir 2.0` auf Ghost.io. Einpersonen-Projekt, KI-first.
Kein Backend, kein Build-Prozess. Entwicklung: VSCode + Live Server von `Theme/` als Root.
Arbeitsverzeichnis: `z:\Documents\Nextcloud\Finanzwesir 2.0\`
Vollständiger Kontext in Memory-Dateien (nur bei Bedarf lesen):
`C:\Users\Albert HP PC\.claude\projects\z--Documents-Nextcloud-Finanzwesir-2-0\memory\project_structure.md`
`C:\Users\Albert HP PC\.claude\projects\z--Documents-Nextcloud-Finanzwesir-2-0\memory\project_app_architecture.md`

---

## Toplevel-Struktur (Stand 2026-05-02, nach Phase 4)

```
Finanzwesir 2.0/
├── Aufraeum-Analyse.md
├── Uebergabeprompt-Phase4.md
├── Uebergabeprompt-Phase5.md        ← diese Datei
├── Archiv/
│   ├── Apps/
│   ├── Chart-Engine-Historie/
│   ├── Design/
│   ├── Historische Excel-Kalkulationen/
│   ├── Seminar - die Basis/
│   └── Rechtliches/
├── Active Campaign Liste/
├── Apps/                            ← 21 App-Backlog-Ordner
├── content/
│   ├── pages/
│   └── legal/
├── Content-Workflow/                ← AUTHOR_GUIDE-v3.md, Cheat-Sheet, 2x REDAKTEURS-HANDBUCH (neu Phase 4)
├── Datenquellen für Apps/
├── Inhalte alte Site/
├── Rechtliche Seiten/               ← CLICKY + KOCHREZEPT (Heimat noch offen — ⚠ Querschnitt)
└── Theme/
    ├── index.html                   ← einzige Root-HTML
    ├── chart-tests/                 ← 18 Test-HTMLs (NEU Phase 4, alle Chart-Engine-Varianten)
    ├── homepage/
    ├── apps/
    ├── assets/
    │   ├── css/screen.css
    │   ├── fonts/                   ← 13 WOFF2 + styles.css + stylesheet.css (⚠ Dopplung)
    │   ├── images/                  ← 16 SVGs + Favicons (canonical)
    │   └── js/
    ├── data/                        ← CSV-Testdaten, reine Dev-Ressource (kein Merge-Blocker)
    ├── docs/
    │   ├── context/                 ← ⚠ Einzeldateien noch nicht gesichtet
    │   │   └── archiv/              ← bleibt hier (entschieden Phase 4)
    │   ├── design-system/           ← ⚠ SVG-Duplikate + Referenz-Demos prüfen
    │   │   ├── spec/
    │   │   ├── referenz/
    │   │   ├── templates/assets/    ← SVG-Kopien mit Tippfehlern
    │   │   └── archiv/
    │   └── spec/                    ← aufgeräumt Phase 4 (13 Dateien + archiv/)
    └── partials/
```

---

## Was in Phase 4 erledigt wurde

| Aufgabe | Ergebnis |
|---------|----------|
| Root-HTML-Chaos | 18 Test-HTMLs → `chart-tests/` (alle wichtig, Chart-Engine-Varianten) |
| docs/spec/ bereinigt | 3 HTML-Duplikate gelöscht, 2 REDAKTEURS-HANDBUCH → `Content-Workflow/` |
| docs/spec/ X-Achse | Alle 5 Teile bleiben (Fortsetzungsroman, keine Versionsduplikate) |
| docs/context/archiv/ | Bleibt in Theme/docs/context/ (thematische Kohärenz) |
| data/ | Kontext geklärt: Dev-only, Ghost-Upload im Livebetrieb, kein Merge-Blocker |
| RADME.md | Existierte nicht mehr |
| Design-Assets-Inventar | Alle Fundstellen kartiert, als Aufgabe 7 in Analyse eingetragen |
| Aufraeum-Analyse.md | Aktualisiert, Zeitstempel gesetzt |

---

## Arbeitspaket Phase 5

### Priorität 1 — Theme/ fertig aufräumen

**A) docs/context/ Einzeldateien sichten**
- `ls Theme/docs/context/` (ohne archiv/) → Albert entscheidet pro Datei
- Ziel: aktiv behalten vs. → archiv/
- Bekannte Aktiv-Kandidaten laut alter Analyse: `KNOWN-ISSUES.md`, `WORKING-FEATURES.md`, `KNOWN-ISSUES-SCHLACHTPLAN.md`

**B) Design-Assets konsolidieren (Aufraeum-Analyse Punkt 7)**
- SVG-Duplikate: `assets/images/` (canonical) vs. `docs/design-system/templates/assets/` (Tippfehler) → Templates-Kopien löschen?
- Font-CSS-Dopplung: `fonts/styles.css` vs. `fonts/stylesheet.css` — welche wird in `index.html` geladen?
- `docs/design-system/referenz/` HTML-Demos — aktuell oder veraltet?
- Vorgehen: erst `ls`, dann gezielt 1–2 Dateien lesen wenn nötig, dann Albert fragen

### Priorität 2 — Querschnittsthemen entscheiden

**C) Rechtliche Seiten/ — CLICKY + KOCHREZEPT**
- Heimat noch offen. Berührt Theme-Bau (Felder vorsehen) und Content-Workflow (VG Wort Pixel)
- Details in `Aufraeum-Analyse.md` Abschnitt "Wichtige Querschnittsdateien" (offset ~85, limit ~30 — Zeilenzahl kann abweichen)
- Frage an Albert: Sollen sie in `content/legal/` oder in `Content-Workflow/` oder eigener Ordner?

**D) Basis/Prompts/ → .claude/ mergen**
- 5 Dateien: CONTENT_GUIDE, LLM_INSTRUCTIONS, OUTPUT_SPECS, PROJECT_CORE, SOURCES
- ~80% aktuell, Rest veraltet — jeden Prompt einzeln prüfen vor dem Merge
- Vorgehen: Dateien einzeln lesen, Albert fragt/entscheidet, dann verschieben

### Priorität 3 — Vorbereitung Monorepo/Git

**E) Vor Phase 6 (Monorepo/Git): Nextcloud-Sync prüfen**
- Sicherstellen dass alle Änderungen synchronisiert sind bevor Git eingerichtet wird

---

## Wichtige Nicht-Merken-Merker

⚠ Relative Pfade in `Theme/apps/` können gebrochen sein (Apps/ wurde verschoben). Beim ersten Entwicklungsstart einer App prüfen.

⚠ `Active Campaign Liste/` — niemals in Git. Sensible E-Mail-Daten.

⚠ Merge-Zielstruktur steht in `Aufraeum-Analyse.md` (offset ~95, limit ~40) — nur lesen wenn Merge konkret ansteht.

---

## Arbeitsweise (einhalten)

- Interaktiv: Vorhaben ankündigen → Albert gibt Kontext → dann handeln
- Nichts löschen ohne explizite Bestätigung im Chat
- Ergebnisse in `Aufraeum-Analyse.md` festhalten (offset+limit, nie ganz lesen)
- Fragen so stellen dass Albert mit Ja/Nein oder einem Wort antworten kann
