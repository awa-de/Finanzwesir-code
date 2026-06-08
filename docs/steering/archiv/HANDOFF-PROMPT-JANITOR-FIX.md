# Handoff: Janitor-Script fixen + Design-System Cleanup

## Kontext

In der vorigen Session wurde das Finanzwesir Design-System konsolidiert:
- 6 Specs + Master-Dokument + LLM-Instructions geschrieben → `docs/design-system/spec/`
- Golden Masters kopiert → `docs/design-system/{templates, referenz, archiv}/`
- Janitor-Script geschrieben → `assets/js/fw-janitor.js`

**Das Janitor-Script hat noch Probleme und muss gefixt werden.**

---

## Deine Rolle

Senior Frontend-Entwickler. Du fixst das Janitor-Script und fuehrst den Cleanup durch.

---

## Aufgabe 1: Janitor-Script fixen

**Datei:** `assets/js/fw-janitor.js` (v1.0.0)
**Testseite:** `docs/design-system/referenz/janitor-test.html`

Das Script transformiert Ghost-gerendertes Markdown in Design-System-Komponenten:
- `> [!NOTE] Titel` → Info-Box (Feder.svg, Petrol)
- `> [!WARNING] Titel` → Warn-Box (Schwert.svg, Purpur)
- `> [!TIP] Titel` → Fazit-Box (kein Icon, Gray)
- `- [+] Text` → Checkliste (Petrol-Haken)
- `- [-] Text` → Warnliste (Purpur-Kreuz)

**Vorgehen:**
1. Testseite im Browser oeffnen und alle 8 Tests pruefen
2. Probleme identifizieren und fixen
3. Sicherstellen:
   - Normale Blockquotes werden NICHT transformiert
   - Normale Listen werden NICHT transformiert
   - Idempotenz: Mehrfaches `FwJanitor.init()` darf nichts kaputt machen
   - Kein innerHTML fuer User-Content (nur textContent)
   - Defensive Error-Handling (try-catch, console.warn)

**Design-System-Specs als Referenz:**
- Komponenten: `docs/design-system/spec/02-KOMPONENTEN.md`
- Icons: `docs/design-system/spec/05-ICONS-UND-GRAFIKEN.md`
- HTML-Snippets: `docs/design-system/spec/LLM-INSTRUCTIONS.md`

---

## Aufgabe 2: Offene Design-System Issues

Alle offenen Issues stehen in `docs/context/DESIGN-SYSTEM-ISSUES.md`:

### Pre-Launch (Blocker)
- **DS-001:** Button Touch-Targets zu klein (py-3 → min 44px)
- **DS-002:** Secondary Button Hover in Homepage noch `text-blau` statt `text-petrol`

### Launch-Week
- **DS-003:** Focus-Visible nicht browser-getestet
- **DS-004:** WCAG-Kontrast-Tabelle unvollstaendig

### Post-Launch
- **DS-005:** CSS-Styles doppelt definiert (kein zentrales Stylesheet)
- **DS-006:** Tailwind-Config Divergenz (Homepage hardcoded Hex, Rest CSS-Vars)
- **DS-007:** Homepage Extra-Farben (gradient-light/medium) — Entscheidung offen
- **DS-011:** Icon-Grafiken nicht final

---

## Aufgabe 3: Alte Verzeichnisse loeschen (nach User-Freigabe)

Nach Bestaetigung durch den User koennen geloescht werden:
- `docs/design/Specs und Beschreibungen/` (22 Dateien, jetzt in `docs/design-system/spec/`)
- `docs/design/HTML-Dateien/` (20 Dateien, Golden Masters in `docs/design-system/`)

**Erst fragen, dann loeschen!**

---

## Qualitaets-Standards

- Lies `CLAUDE.md` im Projekt-Root fuer Arbeitsregeln
- Goldstandard im Repo: `CSVParser.js` + `FinanzwesirData.js` (Defensive Coding)
- Enterprise-Qualitaet, nicht Performance
- Kleine Patches, fokussierter Scope
- Abschluss-Ritual beachten (MEMORY.md, Issues, Commit-Message)

---

## Wichtige Dateipfade

| Was | Wo |
|:----|:---|
| Janitor-Script | `assets/js/fw-janitor.js` |
| Janitor-Testseite | `docs/design-system/referenz/janitor-test.html` |
| Design-System Specs | `docs/design-system/spec/` |
| Golden Masters | `docs/design-system/{templates, referenz}/` |
| Issues | `docs/context/DESIGN-SYSTEM-ISSUES.md` |
| MEMORY | Wird automatisch geladen |
