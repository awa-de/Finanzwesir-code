# Übergabeprompt: Finanzwesir 2.0 — Phase 2 (Regulatorik)

Stand: 2026-05-01 00:00 | Nächste Aufgabe: Regulatorik I/II/III in `Finanzwesir Vermächtnis/`

---

## Hinweis Cache-Effizienz (bitte einhalten)

Dieser Prompt enthält alle nötigen Informationen für den Start. **Bitte folgende Regeln einhalten:**

1. `Aufraeum-Analyse.md` NICHT am Anfang lesen — nur wenn ein konkreter Abschnitt gebraucht wird, dann mit `offset` und `limit`
2. Dateien erst lesen wenn konkret gebraucht — nicht prophylaktisch
3. `grep` statt `Read` für Suchen in Dateien
4. PowerShell-Ausgaben: nur ausgeben was gebraucht wird, keine langen Verzeichnislistings ohne Grund
5. Memory-Dateien unter `C:\Users\Albert HP PC\.claude\projects\z--Documents-Nextcloud-Finanzwesir-2-0\memory\` nutzen statt Analyse neu lesen
6. Albert führen: vor jeder Lese-Operation kurz sagen warum sie nötig ist — ihn sensibilisieren wenn eine Aktion viele Reads erzeugen würde
7. Lieber einmal mehr fragen als einmal mehr lesen

---

## Das Projekt (Kurzversion)

**Albert Warnecke (Finanzwesir)** baut `Finanzwesir 2.0` auf Ghost.io. Einpersonen-Projekt, KI-first.

- Kein Backend, kein Build-Prozess, kein npm
- Entwicklung: VSCode + Live Server von `Theme/` als Root — das war's
- Ghost als "dummes CMS": liefert CSS/JS, Inhalte kommen per Ghost-Editor
- Arbeitsverzeichnis: `z:\Documents\Nextcloud\Finanzwesir 2.0\`

---

## Beschlossene Architektur (nicht mehr diskutieren)

**Drei Stränge:**
1. Theme / Design-System — Ghost-Template, CSS, Tokens (selten geändert)
2. Apps — Rechner, Chart-Engine (mittel oft geändert)
3. Content / Texte — Artikel, App-Copy (häufig geändert)

**App-Integration in Ghost (beschlossen):**
```html
<!-- Gleicher Pattern wie Chart-Engine: kleiner Div, extern JS -->
<div class="fw-app" data-app="etf-wahlurnen-rechner" data-csv="https://..."></div>
```
Kein vollständiger HTML-Code in Ghost-Cards. JS lebt in `Theme/assets/js/apps/[name].js`.

**CSS-Tokens:** in `screen.css` Abschnitt 1 — keine separate Datei, kein externes Font-CDN.

**Chart-Engine:** bleibt vorerst in `Theme/assets/js/fw-chart-engine/` — zieht beim Monorepo-Merge in eigenes Verzeichnis.

**Git-Strategie:** Ein Monorepo außerhalb von Nextcloud (`C:\Users\Albert HP PC\dev\finanzwesir-2.0\`). Noch nicht umgesetzt — Phase 3.

---

## Was erledigt ist

### Phase 0 — Toplevel aufgeräumt ✅
- `Inhalte alte Site/_kontaktformular/` gelöscht (51.346 Spam-Dateien)
- `Archiv/` angelegt: Rechtliches, Historische Excel-Kalkulationen, Seminar - die Basis, Design
- `Datenquellen für Apps/` angelegt (leerer Platzhalter)
- `Design/` aufgeräumt: 3 Dateien → `Archiv/Design/`, Rest gelöscht

Toplevel jetzt: `Archiv/`, `Active Campaign Liste/`, `Datenquellen für Apps/`, `Finanzwesir Vermächtnis/`, `Inhalte alte Site/`, `Theme/`

### Phase 1 — Theme/ aufgeräumt ✅
- `RADME.md` in `.claude/skills/` gelöscht
- `docs/context/archiv/` angelegt — 11 historische Prompts/Handoffs verschoben
- `docs/context/audits/` angelegt — 3 Audit-Snapshots (Basis für künftige Iterationen)
- `docs/spec/archiv/` angelegt — 4 veraltete Spec-Versionen verschoben
- HTML-Referenz-Duplikate (master-template-v6, ui-kit-demo-v11, ui-kit-reference-v4): Theme-Version = kanonisch, Vermächtnis-Kopien → `Archiv/Design/`

`docs/context/` aktiv (8 Dateien): KNOWN-ISSUES.md, KNOWN-ISSUES-PROMPT.md, KNOWN-ISSUES-SCHLACHTPLAN.md, DESIGN-SYSTEM-ISSUES.md, CSS-KONVENTIONEN.md, SEO-WORKFLOW.md, THEME-ASSEMBLY-CHECKLIST.md, WORKING-FEATURES.md

---

## Was jetzt ansteht: Phase 2 — Regulatorik

**Verzeichnis:** `z:\Documents\Nextcloud\Finanzwesir 2.0\Finanzwesir Vermächtnis\Content und Apps\Apps\`

Drei Unterordner, alle müssen kleinteilig besprochen werden:

| Ordner | Inhalt | Offene Fragen |
|--------|--------|---------------|
| `Regulatorik I/` | 20 HTML-Versionen (I–XX), LLM-Feedback von 4 Modellen, Implementierungsplan | Welche Version ist final? Was archivieren? |
| `Regulatorik II/` | ETF-App-Konzept, Steuermodelle, Abschlussdokumentation | Verhältnis zu Regulatorik III? |
| `Regulatorik III/` | Super-App `etf-wahlurnen-rechner.html`, eigene CLAUDE.md, UX-Feedback, Baupropmts | Hat schon CLAUDE.md — wie in Gesamtstruktur integrieren? |

**Wichtig:** Das Prototype-CSS von `etf-wahlurnen-rechner.html` wird nicht übernommen. Die App muss neu gebaut werden — diesmal mit Design-System-Tokens. Der Prototyp ist nur Funktionsnachweis.

**Vorgehen:** Erst Regulatorik I durchgehen (finale HTML-Version identifizieren, Rest archivieren), dann II und III.

---

## Arbeitsweise (einhalten)

- Interaktiv: Vorhaben ankündigen → Albert gibt Kontext → dann handeln
- Nichts löschen ohne explizite Bestätigung im Chat
- Ergebnisse in `Aufraeum-Analyse.md` festhalten (nur den relevanten Abschnitt aktualisieren)
- Vor Phase 3 (Monorepo): prüfen ob Nextcloud synchronisiert ist

## Wichtige Dateien (nur bei Bedarf lesen)

| Was | Wo |
|-----|----|
| Vollständige Analyse | `z:\Documents\Nextcloud\Finanzwesir 2.0\Aufraeum-Analyse.md` |
| App-Architektur Memory | `.claude\projects\...\memory\project_app_architecture.md` |
| Projekt-Kontext Memory | `.claude\projects\...\memory\project_structure.md` |
| Theme CLAUDE.md | `Theme\.claude\CLAUDE.md` — nur lesen wenn an Chart-Engine gearbeitet wird |
| Regulatorik III CLAUDE.md | `Finanzwesir Vermächtnis\Content und Apps\Apps\Regulatorik III\CLAUDE.md` |
