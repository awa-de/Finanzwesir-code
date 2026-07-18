Stand: 2026-07-18 | Session: AF-crash-reaktions-test-mockup-duell | Geändert von: Claude

# Patch-Quittung — Bestandsdateien-Liste im Masterprompt ergänzt

**Auftrag:** Folgepatch zu `PATCH-AF-mockup-duell-vorlage-pflichtquellen-2026-07-18.md`. Albert bat, die dort offen gelassene Frage jetzt auch zu schließen: `docs/App-Fabrik/MASTERPROMPT_MOCKUP-DUELL.md` §„Bestandsdateien" nannte `tokens.css`/`app.test.template.html` noch nicht, obwohl Sonnets Vorlage sie jetzt als Pflichtquellen führt.

## Geänderte Datei

`docs/App-Fabrik/MASTERPROMPT_MOCKUP-DUELL.md`, Abschnitt „Bestandsdateien":

- **Hinzugefügt:** `Theme/assets/css/tokens.css`, `docs/testing/templates/app.test.template.html` — Position nach `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`, vor `APP-INTERFACE.md` (spiegelt dieselbe Reihenfolge wie in `SONNET_MOCKUP-DUELL_VORLAGE.md`).
- **Entfernt:** nichts.

## Zählprüfung

Geändert: **1 Datei**, **1 Stelle** (2 neue Zeilen in der bestehenden Bestandsdateien-Codeblock-Liste).

## Tabu-Check

`docs/App-Fabrik/` steht nicht in `.claude/PROTECTED_PATHS.json`, kein Layer-1-Bezug. **Keine Tabu-Verletzung.**

## CHANGED/NEW

N/A — Markdown-Patch.

## Gate-Typ

**Light** — genau 1 Datei, kein Tabu-Bereich, klare Ursache (Folgefund aus vorherigem Patch), explizit von Albert angewiesen.

## Testfall

Kein Browser-Testfall. Sichtprüfung: Abschnitt „Bestandsdateien" führt jetzt beide Dateien, konsistent mit der Pflichtquellenliste in `SONNET_MOCKUP-DUELL_VORLAGE.md`.

## Offene Fragen

Keine mehr aus dieser Fund-Kette.

---

**Zählprüfung:** Ich habe 1 Stelle in 1 Datei geändert (2 neue Zeilen). Aufzählen?
→ Testfall: Sichtprüfung reicht. Ich warte vor dem nächsten Patch.
