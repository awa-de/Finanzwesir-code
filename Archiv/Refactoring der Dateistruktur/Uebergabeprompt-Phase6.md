# Übergabeprompt: Finanzwesir 2.0 — Phase 6
Stand: 2026-05-02 00:00 | Aufgabe: Migration zur neuen Projektstruktur
---

## Token-Regeln (PFLICHT — immer einhalten)

- Dateien erst lesen wenn konkret gebraucht — nie vorsorglich
- Vor jeder Leseoperation: 1 Satz warum sie nötig ist
- Fragen als Ja/Nein formulieren — kein Prosa
- Vorhaben ankündigen → Albert bestätigt → dann handeln
- offset+limit bei großen Dateien — nie ganz lesen
- Keine rekursiven Ordner-Scans — eine Ebene nach der anderen
- Lieber einmal mehr fragen als einmal mehr lesen
- PowerShell-Ausgaben eingrenzen (Select-Object, Format-Table)

---

## Kontext (steht alles hier — NICHT nachschlagen)

Albert Warnecke (Finanzwesir), Ghost.io, Einpersonen-Projekt, KI-first.
Arbeitsverzeichnis: `z:\Documents\Nextcloud\Finanzwesir 2.0\`
Dev: VSCode + Live Server, Live-Server-Root ist `Theme/`
Kein Backend, kein Build-Prozess (Tailwind kommt erst bei Deploy).

**Problem dieser Session:**
CLAUDE.md liegt in `Theme/.claude/CLAUDE.md` (11 KB, gut, existiert).
Claude Code läuft vom Projektroot — daher wird CLAUDE.md aktuell NICHT geladen.
Das ist der wichtigste Bug dieser Migration.

---

## Entschiedene Zielstruktur

```
Finanzwesir 2.0/
├── .claude/
│   ├── CLAUDE.md              ← von Theme/.claude/ hierher + erweitern
│   ├── settings.local.json    ← mitnehmen
│   └── skills/                ← Inhalt prüfen, mitnehmen
├── NAVIGATION.md              ← bereits erstellt ✅
├── .gitignore                 ← NEU anlegen
│
├── docs/                      ← NEU: alles Wissen zentral
│   ├── steering/              ← war: Theme/docs/context/
│   │   ├── engine/            ← KNOWN-ISSUES-Triade + WORKING-FEATURES + AP-21-Plan
│   │   ├── design/            ← CSS-KONVENTIONEN + DESIGN-SYSTEM-ISSUES
│   │   ├── theme-build/       ← THEME-ASSEMBLY-CHECKLIST
│   │   ├── audits/            ← war: Theme/docs/context/audits/
│   │   └── archiv/            ← war: Theme/docs/context/archiv/
│   ├── spec/                  ← war: Theme/docs/spec/
│   ├── design-system/         ← war: Theme/docs/design-system/
│   └── editorial/             ← war: Content-Workflow/
│
├── Theme/                     ← Ghost-Theme, nur Code
│   ├── assets/
│   ├── partials/
│   ├── chart-tests/
│   ├── data/
│   ├── homepage/
│   ├── apps/
│   ├── index.html
│   ├── .git                   ← bleibt hier (trackt Theme-Code)
│   └── .gitignore             ← bleibt hier (Theme-spezifisch)
│
├── Apps/
├── content/
├── Datenquellen für Apps/
└── Archiv/
```

**Wichtige Konstanten:**
- `Active Campaign Liste/` — niemals in Git, nicht verschieben
- `.git` in `Theme/` bleibt — trackt Theme-Code für Ghost-Deploy
- Docs brauchen kein Git (Nextcloud synct)
- Live Server läuft von `Theme/` — unberührt von Migration

---

## Migrationsschritte (in dieser Reihenfolge ausführen)

### Schritt 1: skills/ Inhalt prüfen, dann .claude/ verschieben

Vor dem Verschieben:
```powershell
Get-ChildItem "z:\Documents\Nextcloud\Finanzwesir 2.0\Theme\.claude\skills\"
```
Albert entscheidet pro Skill-Datei ob sie mitkommt.
Dann `.claude/` als Ganzes nach Projektroot verschieben.

### Schritt 2: .gitignore am Projektroot anlegen

```
Active Campaign Liste/
Archiv/
Datenquellen für Apps/
node_modules/
.env
.env.local
.claude/
.DS_Store
```

### Schritt 3: docs/ Verzeichnisstruktur anlegen (leer)

```powershell
New-Item -ItemType Directory "z:\...\docs\steering\engine"
New-Item -ItemType Directory "z:\...\docs\steering\design"
New-Item -ItemType Directory "z:\...\docs\steering\theme-build"
New-Item -ItemType Directory "z:\...\docs\steering\audits"
New-Item -ItemType Directory "z:\...\docs\steering\archiv"
New-Item -ItemType Directory "z:\...\docs\spec"
New-Item -ItemType Directory "z:\...\docs\design-system"
New-Item -ItemType Directory "z:\...\docs\editorial"
```

### Schritt 4: steering/ befüllen

Von `Theme/docs/context/` verschieben:

| Datei | Ziel |
|-------|------|
| `KNOWN-ISSUES-PROMPT.md` | `docs/steering/engine/` |
| `KNOWN-ISSUES.md` | `docs/steering/engine/` |
| `KNOWN-ISSUES-SCHLACHTPLAN.md` | `docs/steering/engine/` |
| `WORKING-FEATURES.md` | `docs/steering/engine/` |
| `AP-21-IMPLEMENTATIONSPLAN.md` | `docs/steering/engine/` (falls vorhanden — erst prüfen) |
| `CSS-KONVENTIONEN.md` | `docs/steering/design/` |
| `DESIGN-SYSTEM-ISSUES.md` | `docs/steering/design/` |
| `THEME-ASSEMBLY-CHECKLIST.md` | `docs/steering/theme-build/` |
| `audits/*` | `docs/steering/audits/` |
| `archiv/*` | `docs/steering/archiv/` |

### Schritt 5: spec/ und design-system/ verschieben

```powershell
# Alle Dateien aus Theme/docs/spec/ → docs/spec/
# Alle Dateien aus Theme/docs/design-system/ → docs/design-system/
```

Verzeichnisstruktur in design-system/ vorher mit `ls` prüfen — hat Unterordner.

### Schritt 6: editorial/ befüllen

Alle Dateien aus `Content-Workflow/` nach `docs/editorial/`.
Ordner `Content-Workflow/` danach löschen (nur nach Bestätigung).

### Schritt 7: CLAUDE.md erweitern

CLAUDE.md liegt jetzt in `.claude/CLAUDE.md`.
**Zwei Erweiterungen nötig — minimale Edits, kein Rewrite:**

**A) Abschluss-Ritual einfügen** (nach Section 6 "Arbeitsweise"):

```markdown
## 7. Abschluss-Ritual (Pflicht nach jedem Code-Run)

Trigger: Albert sagt "fertig, finale Phase" oder sinngemäß.
Claude führt selbständig und vollständig aus:

1. **Specs aktualisieren** — betroffene Dateien in `docs/spec/`
2. **Kontext-Dateien** — `docs/steering/engine/KNOWN-ISSUES.md` + `WORKING-FEATURES.md`
3. **MEMORY.md** — `C:\Users\Albert HP PC\.claude\projects\z--Documents-Nextcloud-Finanzwesir-2-0\memory\`
4. **Commit-Message** im Template-Format (siehe unten)
5. **CLAUDE.md** — nur wenn neue fundamentale Regel entstand (universell + verhaltenssteuernd + nicht ableitbar)

Reihenfolge: Erst Code, dann Doku. Claude prüft proaktiv alle Touchpoints.
```

**B) Commit-Message-Template einfügen:**

```markdown
## 8. Commit-Message-Template

Format bei "Commit-Message":
```
Typ: Kurze Zusammenfassung (50–72 Zeichen)

- Was war das Problem?
- Wie wurde es gelöst?
- Warum ist die Lösung sicher (keine Regressionen)?

Betroffene Bereiche:
- Datei (Methode)

Kontext:
- Issue / Spec / Tested
```
```

**C) Zwei Pfade aktualisieren:**
- `docs/context/CSS-KONVENTIONEN.md` → `docs/steering/design/CSS-KONVENTIONEN.md`
- `docs/context/working-features.md` → `docs/steering/engine/WORKING-FEATURES.md`
- `docs/spec/` bleibt `docs/spec/` — Pfad unverändert ✓

**D) Titel + §1 Scope erweitern:**
Von "Finanzwesir Chart Engine" auf "Finanzwesir 2.0"
§1 Kontext & Ziel: Hinweis ergänzen dass CLAUDE.md für ganzes Projekt gilt (Theme + Apps + Content)

### Schritt 8: NAVIGATION.md Pfade aktualisieren

Ersetzen:
- `Theme/docs/context/` → `docs/steering/`
- `Content-Workflow/` → `docs/editorial/`

Datei lesen (offset 1, limit 120) um Stellen zu finden, dann gezielt editieren.

### Schritt 9: Alte Theme-Memory archivieren

```powershell
# Kopieren (nicht verschieben — Original bleibt):
Copy-Item "C:\Users\Albert HP PC\.claude\projects\Z--Documents-Nextcloud-Finanzwesir-2-0-Theme\memory\MEMORY.md"
         "z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\archiv\MEMORY-THEME-PHASE.md"
```

---

## Bekannte Folgen der Migration (kein Handlungsbedarf)

- Git in `Theme/` sieht `Theme/docs/` als "deleted" — unkritisch (Nextcloud synct)
- CLAUDE.md Spec-Referenzen (`@docs/spec/...`) bleiben gültig — Pfad war relativ zum Root
- Live Server von `Theme/` — unberührt

---

## Offene Fragen (diese Session NICHT lösen — nur notieren falls Albert fragt)

| Frage | Status |
|-------|--------|
| Git: 2 Repos? (Code vs. Content) | Entscheidung ausstehend |
| `Basis/Prompts/` → `.claude/` (5 Dateien, ~80% aktuell) | Einzeln prüfen, nächste Phase |
| `Rechtliche Seiten/` (CLICKY + KOCHREZEPT) | → `content/legal/` oder `docs/editorial/`? |
| Font-CSS-Dopplung: `fonts/styles.css` vs. `fonts/stylesheet.css` | Welche lädt index.html? |
| SVG-Duplikate: `assets/images/` vs. `docs/design-system/templates/assets/` | Templates-Kopien löschen? |

---

## Verifikation nach Migration

Nach Abschluss prüfen:
```powershell
# .claude/ am richtigen Ort?
Test-Path "z:\Documents\Nextcloud\Finanzwesir 2.0\.claude\CLAUDE.md"

# docs/ Struktur vollständig?
Get-ChildItem "z:\Documents\Nextcloud\Finanzwesir 2.0\docs\" -Recurse -Directory | Select-Object FullName

# Theme/ ist code-only (kein docs/ mehr)?
Test-Path "z:\Documents\Nextcloud\Finanzwesir 2.0\Theme\docs"  # soll $false sein
```
