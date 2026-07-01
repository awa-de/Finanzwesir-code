---
name: Projektstruktur und Kontext
description: Wer, was, wie — Grunddaten zum Finanzwesir 2.0 Projekt
metadata:
  type: project
  originSessionId: 42d11711-f328-4811-81c9-716ccdfa866c
---
Albert Warnecke (Finanzwesir) baut Finanzwesir 2.0 auf Ghost.io. Einpersonen-Projekt, KI-first.

**Why:** Neue Website mit Ghost als CMS, interaktiven Finanz-Apps und Chart-Engine.

**How to apply:** Immer mitdenken: kein Team, kein Build-Prozess, primitiver Workflow (Live Server), Ghost als "dummes CMS".

## Stack

- Ghost.io als CMS (hosted)
- Kein Backend, kein Server-Side-Code
- Chart.js + eigene Chart-Engine (fw-chart-engine)
- Reines Client-Side JS
- CSS: screen.css mit Tokens in Abschnitt 1

## Entwicklungsworkflow

- VSCode + Live Server
- Theme/ ist der Live-Server-Root
- Alle relativen Pfade gehen von Theme/ aus
- Kein Build-Prozess, kein npm, kein Bundler

## Git (seit 2026-05-04)

- Programmier-Git an Root: `z:\Documents\Nextcloud\Finanzwesir 2.0\`
- Branch: `master`
- Remote: `git@github.com:awa-de/Finanzwesir-code.git` (privat)
- SSH: Windows OpenSSH, `git config core.sshCommand = C:/Windows/System32/OpenSSH/ssh.exe`
- Nicht versioniert: `Theme/data/`, `Theme/chart-tests/`, `content/`, `Archiv/`, `Active Campaign Liste/`
- Separates Content-Repo geplant (noch nicht angelegt)

## Arbeitsverzeichnis

`z:\Documents\Nextcloud\Finanzwesir 2.0\`

Toplevel nach Aufräumen (Stand 2026-05-01):
- `Archiv/` — historisches Material (Design, Excel, Seminar, Rechtliches)
- `Active Campaign Liste/` — E-Mail-Daten, NIE in Git
- `Datenquellen für Apps/` — Platzhalter für Produktionsdaten
- `Finanzwesir Vermächtnis/` — Konzept, Apps, Content (Merge-Kandidat)
- `Inhalte alte Site/` — Textstein­bruch, 867 Blog-Posts als Markdown
- `Theme/` — Ghost-Theme, Chart-Engine, aktives Entwicklungsverzeichnis

## Analyse-Dokument

Vollständige Entscheidungshistorie in:
`z:\Documents\Nextcloud\Finanzwesir 2.0\Aufraeum-Analyse.md`
