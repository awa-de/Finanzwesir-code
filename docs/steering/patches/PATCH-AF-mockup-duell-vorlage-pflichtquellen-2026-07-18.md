Stand: 2026-07-18 | Session: AF-crash-reaktions-test-mockup-duell | Geändert von: Claude

# Patch-Quittung — Pflichtquellen-Lücke in der Sonnet-Mockup-Duell-Vorlage

**Auftrag:** Nach dem Bau der Crash-Reaktions-Test-Mockups fielen zwei fehlende Pflichtquellen auf (`Theme/assets/css/tokens.css` für CI-Farben, eine Datenquelle für echte historische Kurse). Albert fragte, warum sie fehlten und wo die Lösung hingehört. Root Cause geklärt (siehe unten) und die kanonische Vorlage entsprechend ergänzt.

## Root Cause

`docs/App-Fabrik/vorlagen/SONNET_MOCKUP-DUELL_VORLAGE.md` ist laut `git log` erst mit dem heutigen Commit (AP-app-fabrik-09h–09k, Quellensperre-Härtung) entstanden. Die ältere, ungehärtete Fassung (Vergleich: `tests/scratch/depot-kipppunkt/mockup-duell/SONNET_AUFTRAG.md`, frühere Runde) hatte dieselben 7 Pflichtquellen — aber **keine** harte Quellensperre-Klausel. In früheren Runden konnte Sonnet `tokens.css` und Datendateien zusätzlich lesen, ohne zu stoppen; das lief unauffällig durch. Die heutige Härtung hat die Sperre verschärft, aber vergessen, `tokens.css` (universell für jede App nötig) in die statische Liste nachzuziehen.

## Geänderte Datei

`docs/App-Fabrik/vorlagen/SONNET_MOCKUP-DUELL_VORLAGE.md`, Abschnitt „Pflichtquellen — nur diese":

- **Hinzugefügt (fest, universell):** `Theme/assets/css/tokens.css`, `docs/testing/templates/app.test.template.html` (nur der `@theme inline`-Bridge-Block) — beide für jede künftige App gleich nötig, keine App-spezifische Entscheidung.
- **Hinzugefügt (Klärsatz, kein fester Pfad):** Hinweis, dass eine echte Datenquelle für historische Kurse app-spezifisch bleibt und nach der bestehenden Quellensperre-Regel bei Bedarf erfragt werden muss — kein Raten, keine andere App als Ersatzquelle.
- **Entfernt:** nichts. Bestehende 7 Einträge bleiben inhaltlich unverändert, nur umnummeriert (7 → 9 Einträge).

## Zählprüfung

Geändert: **1 Datei**, **1 zusammenhängende Stelle** (ein Edit-Block: 2 neue Listeneinträge + Renumerierung der 3 nachfolgenden + 1 neuer Klärsatz).

## Tabu-Check

`docs/App-Fabrik/vorlagen/` steht nicht in `.claude/PROTECTED_PATHS.json`, kein Layer-1-Bezug. **Keine Tabu-Verletzung.**

## CHANGED/NEW

N/A — Markdown-Patch, keine Code-Marker nötig.

## Gate-Typ

**Light** — genau 1 Datei, kein Tabu-Bereich, keine Architekturwirkung auf Produktionscode, klare Ursache, keine Security-Auswirkung, keine Änderung an `docs/spec/` oder `docs/steering/`.

## Testfall

Kein Browser-Testfall (reine Prozess-Vorlage). Verifikation: Der nächste `sonnet-paket --write`-Lauf für eine beliebige App erzeugt ein `SONNET_AUFTRAG.md` mit 9 statt 7 Pflichtquellen inkl. `tokens.css` und `app.test.template.html`. Da das Tool nur `{{SLUG}}`/`{{APP_NAME}}` ersetzt (reine Textsubstitution), reicht zur Kontrolle auch ein direkter Blick in die editierte Vorlage.

## Offene Frage (nicht in diesem Patch gelöst)

`docs/App-Fabrik/MASTERPROMPT_MOCKUP-DUELL.md`, Abschnitt „Bestandsdateien" (Orchestrator-Ebene, separate Liste) nennt `tokens.css`/`app.test.template.html` bisher ebenfalls nicht als dauerhafte Abhängigkeit. Nicht angefasst, da nicht Albert-beauftragt und ein separater, eigener Entscheidungspunkt (andere Datei, anderer Zweck: Datei-Schreibschutz für den Orchestrator, nicht Sonnets Leseliste).

---

**Zählprüfung:** Ich habe 1 Stelle in 1 Datei geändert (Pflichtquellenliste + Klärsatz). Aufzählen?
→ Bitte bestätige: Passt diese Lösung, oder soll die offene Frage zu `MASTERPROMPT_MOCKUP-DUELL.md` auch gleich mit erledigt werden? Ich warte vor dem nächsten Patch.
