# Übergabeprompt: Finanzwesir 2.0 — Strukturierung & Aufbau

## Kontext

Du übernimmst ein laufendes Projekt. Die vollständige Analyse liegt in:
`z:\Documents\Nextcloud\Finanzwesir 2.0\Aufraeum-Analyse.md`

**Lies diese Datei zuerst, bevor du irgendetwas tust.**

---

## Was bisher entschieden wurde

### Das Projekt

Albert Warnecke (Finanzwesir) baut eine neue Website (Finanzwesir 2.0) auf Basis von Ghost.io. Es ist ein Einpersonen-Projekt, KI-first: Claude Code ist das primäre Werkzeug. Ziel ist eine vollständig KI-gestützte Entwicklungs- und Redaktions-Pipeline.

### Drei Stränge, drei Schnittstellen-Verträge

Das Projekt hat drei Arbeitsstränge mit klar definierten Interfaces:

1. **Theme / Design-System** — Ghost.io-Template, CSS, Design-Tokens (selten geändert)
2. **Apps** — interaktive Rechner, Chart Engine (mittel oft geändert)
3. **Content / Texte** — Blogartikel, Meta, App-Copy (häufig geändert)

Kernprinzip: Alle nutzer-sichtbaren App-Texte leben in `copy.md` pro App, NICHT im JS-Code.

### Verzeichnis-Situation

Das Arbeitsverzeichnis ist `z:\Documents\Nextcloud\Finanzwesir 2.0\` mit 8 Toplevel-Ordnern. Der aktuelle Zustand ist unaufgeräumt. Die Analyse-Datei enthält den vollständigen Status jedes Ordners und eine priorisierte Aktionsliste (Phase 0–4).

**Die zwei Herzstücke des Projekts:**
- `Theme/` — Git-Repo, Ghost-Theme, Chart Engine (in assets/js/fw-chart-engine/), Claude-Skills
- `Finanzwesir Vermächtnis/` — Konzept, CI, Content, Apps (kein Git, kein .claude yet)

**Beschlossene Zielstruktur:** Ein Monorepo `finanzwesir-2.0/` das beide zusammenführt (außerhalb von Nextcloud, da Git + Nextcloud-Sync problematisch).

### Git-Strategie

- **Ein Monorepo** für Theme + Apps + Design-System + Chart Engine
- Außerhalb von Nextcloud (Empfehlung: `C:\Users\Albert HP PC\dev\finanzwesir-2.0\`)
- `Active Campaign Liste/` niemals versionieren (E-Mail-Adressen, sensibel)
- `Archiv/` nicht in Git

### Claude-Konfiguration (Ziel)

- Hierarchische CLAUDE.md: Root (Gesamtprojekt) → `theme/CLAUDE.md` → `apps/CLAUDE.md`
- `MEMORY.md` für persistente Entscheidungen
- Skills aus `Theme/.claude/skills/` werden übernommen und erweitert
- `Prompts/` aus `Finanzwesir Vermächtnis/` wird in `.claude/` eingearbeitet

---

## Was als nächstes zu tun ist

Die Aktionsliste in `_Aufraeum-Analyse.md` ist priorisiert (Phase 0–4).

**Phase 0 ist der empfohlene Einstieg** (keine Git-Kenntnisse nötig, reine Dateioperationen):
1. `Inhalte alte Site/_kontaktformular/` löschen — 51.346 Spam-Dateien, ersatzlos
2. `Archiv/` anlegen und befüllen (3 Ordner verschieben/umbenennen)
3. `Datenquellen für Apps/` anlegen
4. `Design/` ZIPs sichten und mit `Theme/assets/images/` abgleichen (sehr sorgfältig — nichts verlieren)

**Danach Phase 1:** Aufräumen in `Theme/` (HTML-Test-Chaos, data/-Unterordner, docs/context/archiv/)

**Danach Phase 2:** `Regulatorik I/II/III` in `Finanzwesir Vermächtnis/Content und Apps/Apps/` — sehr kleinteilig, viel Diskussion mit dem Nutzer nötig.

**Danach Phase 3+4:** Merge und KI-Konfiguration.

---

## Arbeitsweise

- Interaktiv: Du nennst was du tun willst, Albert gibt Kontext, dann handelst du
- Vor jeder Datei-Operation: Freigabe einholen
- Nichts löschen ohne explizite Bestätigung im Chat
- Ergebnisse in `_Aufraeum-Analyse.md` festhalten (die Datei wächst mit)
- Vor Phase 3: prüfen ob Nextcloud synchronisiert ist

---

## Offene strategische Fragen (noch nicht entschieden)

1. Liegt `content/blog/` im Repo (Entwürfe) oder nur in Ghost? Ghost verwaltet published content selbst.
2. `design-system/` als eigener Toplevel-Ordner oder unter `theme/`? (Empfehlung: eigener Ordner)
3. Nextcloud-Sync-Strategie nach dem Merge: Welche Ordner bleiben in Nextcloud, welche nicht mehr?
4. Duktus-Analyse: Blog-Texte aus `Inhalte alte Site/blog/` (867 Dateien, Markdown) lesen → Stilvorlage für App-Texte. Skill `style-finanzwesir-duktus` daraus erstellen.
