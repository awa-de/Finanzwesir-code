# Übergabeprompt: Finanzwesir 2.0 — Phase 4 (Theme/ aufräumen)
Stand: 2026-05-01 00:00 | Nächste Aufgabe: `Theme/` Stück für Stück abarbeiten

---

## Regeln für tokensparendes Arbeiten (PFLICHT — immer einhalten)

- `Aufraeum-Analyse.md` NICHT prophylaktisch lesen — nur mit `offset`+`limit` wenn ein konkreter Abschnitt gebraucht wird
- Dateien erst lesen wenn konkret gebraucht — nicht vorsorglich
- Vor jeder Leseoperation in einem Satz erklären warum sie nötig ist
- **Fragen so formulieren dass Albert mit Ja/Nein oder einem Wort antworten kann** — das spart die meisten Tokens
- Lieber einmal mehr fragen als einmal mehr lesen
- Memory-Dateien nutzen statt Analyse neu lesen
- PowerShell-Ausgaben: nur ausgeben was gebraucht wird (mit `Select-Object` oder `Format-Table` eingrenzen)
- Niemals ganze Ordnerbäume rekursiv lesen — immer eine Ebene nach der anderen
- Vorhaben ankündigen → Albert gibt Kontext → dann handeln (nie umgekehrt)

---

## Projekt (Kurzversion)

Albert Warnecke (Finanzwesir) baut `Finanzwesir 2.0` auf Ghost.io. Einpersonen-Projekt, KI-first.
Kein Backend, kein Build-Prozess. Entwicklung: VSCode + Live Server von `Theme/` als Root.
Arbeitsverzeichnis: `z:\Documents\Nextcloud\Finanzwesir 2.0\`

Vollständiger Kontext in Memory-Dateien (nur bei Bedarf lesen):
- `C:\Users\Albert HP PC\.claude\projects\z--Documents-Nextcloud-Finanzwesir-2-0\memory\project_structure.md`
- `C:\Users\Albert HP PC\.claude\projects\z--Documents-Nextcloud-Finanzwesir-2-0\memory\project_app_architecture.md`

---

## Aktuelle Toplevel-Struktur (Stand 2026-05-01, nach Phase 3)

```
Finanzwesir 2.0/
├── Aufraeum-Analyse.md
├── Uebergabeprompt-Phase4.md        ← diese Datei
├── Archiv/
│   ├── Apps/
│   ├── Chart-Engine-Historie/
│   ├── Design/                      ← inkl. Homepage/ LLM-Evals (neu)
│   ├── Historische Excel-Kalkulationen/
│   ├── Seminar - die Basis/
│   └── Rechtliches/
├── Active Campaign Liste/
├── Apps/                            ← 21 App-Backlog-Ordner
├── content/                         ← NEU (Phase 3)
│   ├── pages/                       ← Über mich, Manifest, Neu hier, Ich bin bullish
│   └── legal/                       ← Impressum, Datenschutz
├── Content-Workflow/                ← AUTHOR_GUIDE-v3.md, Cheat-Sheet HTML-Karten.md
├── Datenquellen für Apps/
├── Inhalte alte Site/
├── Rechtliche Seiten/               ← CLICKY + KOCHREZEPT (Querschnittsdateien, Heimat offen)
└── Theme/                           ← NÄCHSTE AUFGABE
    ├── homepage/
    ├── apps/
    └── assets/js/apps/
```

---

## Was in Phase 3 erledigt wurde

- `Basis/` vollständig aufgelöst und gelöscht
- `Basis/Homepage/` → `Archiv/Design/Homepage/`
- `Basis/Meta/`: MOC gelöscht, 4 Seiten → `content/pages/`
- `Basis/Rechtliche Seiten/`: Impressum+Datenschutz → `content/legal/`, MOC gelöscht, CLICKY+KOCHREZEPT → Top-Level `Rechtliche Seiten/`
- `Basis/Prompts/`: MOC gelöscht, Start-Prompt Gemini → `Archiv/`, 5 Kern-Prompts bleiben (Merge-Phase)
- Root-Dateien: 2× gelöscht, Cheat-Sheet → `Content-Workflow/`, GEO statt SEO → `Theme/docs/context/`
- `content/` als neue Top-Level-Struktur etabliert (Git-Strategie: 1 Repo, content/ neben Theme/)
- `Aufraeum-Analyse.md` vollständig aktualisiert

---

## Nächste Aufgabe: Theme/ aufräumen

Offene Punkte laut Aufraeum-Analyse (Abschnitt "Aufräum-Maßnahmen in Theme"):
Details stehen in `Aufraeum-Analyse.md` — **nur lesen wenn konkret gebraucht** (offset ~175, limit ~55, Zeilenzahl kann leicht abweichen, ggf. anpassen).

Bekannte Baustellen:

| Bereich | Was zu tun ist |
| ------- | -------------- |
| Root-HTML-Chaos | Test-HTMLs und Entwicklungs-Schrott sichten — behalten oder löschen |
| SVG-Duplikate | `assets/images/` vs. `docs/design-system/templates/assets/` abgleichen |
| `data/` Unterordner | Präfix-Gruppen-Struktur prüfen |
| `docs/context/` | ~10 Dateien noch zu entscheiden |

**Vorgehen:** Für jeden Bereich erst `ls` (1 Leseop), dann Albert kurz fragen, dann handeln.

---

## Wichtige offene Aufgaben (nicht vergessen)

⚠ **Relative Pfade in `Theme/apps/`** können gebrochen sein (Apps/ wurde verschoben). Beim ersten Entwicklungsstart einer App prüfen.

⚠ **`Basis/Prompts/`** (5 Dateien: CONTENT_GUIDE, LLM_INSTRUCTIONS, OUTPUT_SPECS, PROJECT_CORE, SOURCES) — noch nicht ins `.claude/` verschoben. ~80% aktuell, Rest veraltet. Jeden Prompt einzeln prüfen vor dem Merge.

⚠ **`Rechtliche Seiten/`** (CLICKY + KOCHREZEPT) — Heimat noch offen. Berührt Theme-Bau (Felder vorsehen) und Content-Workflow (VG Wort Pixel pro Artikel). Details in `Aufraeum-Analyse.md` Abschnitt "Wichtige Querschnittsdateien".

---

## Arbeitsweise (einhalten)

- Interaktiv: Vorhaben ankündigen → Albert gibt Kontext → dann handeln
- Nichts löschen ohne explizite Bestätigung im Chat
- Ergebnisse in `Aufraeum-Analyse.md` festhalten (nur relevanten Abschnitt mit offset+limit lesen/schreiben)
- Vor Phase 5 (Monorepo/Git): prüfen ob Nextcloud synchronisiert ist
