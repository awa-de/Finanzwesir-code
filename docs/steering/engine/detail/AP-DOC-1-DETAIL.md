# AP-DOC-1: Basis/Prompts/ bereinigen
Stand: 2026-05-03 08:02 | Session: A10-Masterplan | Geändert von: Claude

**Status:** Offen
**Priorität:** H — vor ernsthafter App-Entwicklung
**Typ:** Doku-/Prompt-Migration
**Ziel:** Fünf Prompt-Dateien einzeln prüfen, klassifizieren und korrekt einordnen.

---

## Vorgehen

Für jede Datei und jeden Abschnitt entscheiden:

- `KEEP` — bleibt als Referenz erhalten
- `INTEGRATE` — in `CLAUDE.md`, `docs/spec/` oder `docs/steering/` integrieren
- `ARCHIVE` — nach `docs/steering/archiv/`
- `DELETE` — löschen, wenn eindeutig veraltet und nutzlos

## Ablageregel

| Inhalt | Ziel |
|--------|------|
| Verhalten / Arbeitsweise | `.claude/CLAUDE.md` |
| Bindende Architektur | `docs/spec/` |
| Aktueller Projektzustand | `docs/steering/` |
| Historisches Material | `docs/steering/archiv/` |

## Dateien (5)

Vor der Session prüfen, ob diese Dateien noch unter `Basis/Prompts/` liegen:

1. `Basis/Prompts/[Datei 1]`
2. `Basis/Prompts/[Datei 2]`
3. `Basis/Prompts/[Datei 3]`
4. `Basis/Prompts/[Datei 4]`
5. `Basis/Prompts/[Datei 5]`

Die konkreten Dateinamen beim Session-Start durch Verzeichnis-Listing ermitteln.

## Warnung

Nicht blind in `CLAUDE.md` übernehmen. Ca. 80 % aktuell, ca. 20 % veraltet — jede Datei einzeln bewerten.
