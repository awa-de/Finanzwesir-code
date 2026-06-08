# Übergabeprompt: Finanzwesir 2.0 — Phase 3 (Basis/ aufräumen)
Stand: 2026-05-01 00:00 | Nächste Aufgabe: `Basis/` Stück für Stück abarbeiten

---

## Regeln für tokensparendes Arbeiten (einhalten)

- `Aufraeum-Analyse.md` NICHT prophylaktisch lesen — nur mit `offset`+`limit` wenn ein konkreter Abschnitt gebraucht wird
- Dateien erst lesen wenn konkret gebraucht — nicht vorsorglich
- Vor jeder Leseoperation in einem Satz erklären warum sie nötig ist
- Lieber einmal mehr fragen als einmal mehr lesen
- Fragen so formulieren dass Albert mit Ja/Nein oder einem Wort antworten kann
- Memory-Dateien nutzen statt Analyse neu lesen
- PowerShell-Ausgaben: nur ausgeben was gebraucht wird

---

## Projekt (Kurzversion)

Albert Warnecke (Finanzwesir) baut `Finanzwesir 2.0` auf Ghost.io. Einpersonen-Projekt, KI-first.
Kein Backend, kein Build-Prozess. Entwicklung: VSCode + Live Server von `Theme/` als Root.
Arbeitsverzeichnis: `z:\Documents\Nextcloud\Finanzwesir 2.0\`

Vollständiger Kontext in Memory-Dateien:
- `C:\Users\Albert HP PC\.claude\projects\z--Documents-Nextcloud-Finanzwesir-2-0\memory\project_structure.md`
- `C:\Users\Albert HP PC\.claude\projects\z--Documents-Nextcloud-Finanzwesir-2-0\memory\project_app_architecture.md`

---

## Aktuelle Toplevel-Struktur (umgesetzt, Stand 2026-05-01)

```
Finanzwesir 2.0/
├── Aufraeum-Analyse.md
├── Archiv/
│   ├── Apps/               ← Regulatorik I+II, Ideen für Apps, ChatGPT-Ansatz
│   ├── Chart-Engine-Historie/
│   ├── Design/             ← LLM-Evaluierungen
│   ├── Historische Excel-Kalkulationen/
│   ├── Seminar - die Basis/
│   └── Rechtliches/
├── Active Campaign Liste/
├── Apps/                   ← 21 App-Backlog-Ordner (Slugs aus ETF-Apps-Hauptdokument-v2.md)
├── Basis/                  ← war: Finanzwesir Vermächtnis — NOCH IN BEARBEITUNG
├── Content-Workflow/       ← AUTHOR_GUIDE-v3.md (Redaktions-Anleitungen, skaliert)
├── Datenquellen für Apps/
├── Inhalte alte Site/
└── Theme/
    ├── homepage/           ← Mockup + Freigabe.md (aktiv, noch anzupassen)
    ├── apps/               ← STUFE 2: Dev-HTML-Dateien
    └── assets/js/apps/     ← STUFE 3: Produktions-JS für Ghost-ZIP
```

---

## Was heute erledigt wurde (Phase 2)

- Regulatorik I+II → `Archiv/Apps/`
- Regulatorik III → umbenannt zu `regulatorik-dashboard`, liegt in `Apps/`
- `Ideen für Apps` (3 Dateien) → `Archiv/Apps/Ideen für Apps/`
- `Apps/` auf Top-Level gezogen: 21 Ordner, Slugs aus `ETF-Apps-Hauptdokument-v2.md`
- `Theme/apps/` und `Theme/assets/js/apps/` angelegt (3-Stufen-Pipeline)
- Chart-Engine als Dual-Role dokumentiert (solo + shared library) — in `Aufraeum-Analyse.md`
- `Finanzwesir Vermächtnis` → `Basis/`
- `1. Design-Matrix/`: Homepage-Mockup → `Theme/homepage/`, LLM-Eval → `Archiv/Design/`
- `2. Ghost.io-Template/`: Start.md → `Theme/docs/context/archiv/`
- `3. Kurs-Charts/`: alles → `Archiv/Chart-Engine-Historie/`
- `Content-Eingabe in Ghost/`: v3 → `Content-Workflow/`, v1+v2 → `Archiv/`
- `Aufraeum-Analyse.md` vollständig aktualisiert

---

## Nächste Aufgabe: Basis/ abarbeiten

Noch offen in `Basis/`:

| Ordner/Datei | Erwartete Behandlung |
|---|---|
| `Homepage/` | Unbekannt — erst `ls` dann mit Albert besprechen |
| `Meta/` | Unbekannt — erst `ls` dann besprechen |
| `Prompts/` | → wird zu `.claude/` eingearbeitet (Merge-Phase) |
| `Rechtliche Seiten/` | Unbekannt — erst `ls` dann besprechen |
| `Finanzwesir Vermächtnis MOC.md` | Root-Datei — Aktion besprechen |
| `Cheat-Sheet HTML-Karten.md` | Root-Datei — Aktion besprechen |
| `GEO statt SEO.md` | Root-Datei — Aktion besprechen |
| `Technische Struktur Finanzwesir 2.0.md` | Root-Datei — Aktion besprechen |

Vorgehen: für jeden Eintrag erst `ls` (1 Leseop), dann Albert kurz fragen, dann handeln.

---

## Wichtige offene Aufgabe (nicht vergessen)

⚠ Relative Pfade in `Theme/apps/` Dev-Dateien können gebrochen sein (Apps/ wurde verschoben).
Beim ersten Entwicklungsstart einer App prüfen und korrigieren.

---

## Nach Basis/: Theme/ aufräumen (Phase 3b)

Noch offen in `Theme/` (aus Aufräum-Analyse, Abschnitt "Aufräum-Maßnahmen in Theme"):
- Root-HTML-Chaos: Test-HTMLs sortieren, Entwicklungs-Schrott prüfen
- SVG-Duplikate: `assets/images/` vs. `docs/design-system/templates/assets/`
- `data/` Unterordner-Struktur (Präfix-Gruppen)
- `docs/context/` offene Dateien (10 Stück noch zu entscheiden)

Details stehen in `Aufraeum-Analyse.md` Abschnitt "Aufräum-Maßnahmen in Theme" —
nur lesen wenn konkret gebraucht (offset ~169, limit ~50).

---

## Arbeitsweise (einhalten)

- Interaktiv: Vorhaben ankündigen → Albert gibt Kontext → dann handeln
- Nichts löschen ohne explizite Bestätigung im Chat
- Ergebnisse in `Aufraeum-Analyse.md` festhalten (nur relevanten Abschnitt, mit offset+limit schreiben)
- Vor Phase 4 (Monorepo): prüfen ob Nextcloud synchronisiert ist
