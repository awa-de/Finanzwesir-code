---
name: manual-test-plan
description: Erstellt einen strukturierten manuellen Testplan für visuell zu prüfende Features in Finanzwesir 2.0 (Chart-Engine, Apps, CSS).
argument-hint: "[AP-ID oder Feature-Beschreibung]"
---

# Skill: manual-test-plan

Trigger: Codex schlägt vor bei komplexen visuellen Testfällen. Albert kann explizit aufrufen.
Argumente: $ARGUMENTS (AP-ID oder Feature)

Hintergrund: Es gibt keine automatische Testpipeline. Albert testet manuell im VSCode Live-Server.
Dieser Plan gibt Albert eine konkrete Checkliste — kein Raten, kein Vergessen.

---

## Testplan-Format

**Aufgabe:** [AP-ID: Titel]

**Betroffene Datei(en):** [Liste]

**Primärer Testfall:**
- Testseite: `Apps/{slug}/app.test.html` (App) oder `tests/engine/[datei].test.html` (Chart-Engine)
- Testdaten: `Apps/{slug}/test-data/[datei].csv` (App) oder `tests/fixtures/engine/[datei].csv` (Engine) — Ablageorte gemäß docs/testing/TEST_PAGE_STANDARD.md §3
- Chart-Typ: [Line / Bar / Pie]
- Datums-Rhythmus: [täglich / wöchentlich / monatlich / jährlich]

**Viewport-Zonen prüfen:**

| Zone | Breite | Was prüfen |
|---|---|---|
| S | < 600px | [spezifisch] |
| M | 600–1200px | [spezifisch] |
| L | > 1200px | [spezifisch] |

**Erwartetes Verhalten:**
[Konkret beschreiben — was soll zu sehen sein]

**Bekannte Regressionsrisiken:**
[Was könnte durch diese Änderung kaputt gehen]

**Regressions-Checks (aus REGRESSION-MATRIX.md):**
[Relevante Testfälle nennen die Codex für betroffen hält]

**Bestanden wenn:**
[Konkretes Kriterium — nicht „sieht gut aus"]

---

## Subagent-Zuarbeit bei komplexen Regressionen

Bei komplexen visuellen oder regressionsrelevanten Testfällen Subagent-Policy anwenden:
`.Codex/skills/subagent-dispatch/SKILL.md`

Standard-Agent: `regression-scout`

`regression-scout` sammelt:
- relevante Regression-Matrix-Fälle, Working-Features-Fundstellen
- Test-HTMLs, CSV-/Datenfälle, mögliche Viewport-/A11y-Testflächen

Die Hauptinstanz erstellt den manuellen Testplan.
Subagent-Aufruf und Rückfall müssen sichtbar quittiert werden (→ `.Codex/skills/subagent-dispatch/SKILL.md`).

---

## Hinweis

Codex wartet nach diesem Plan auf Alberts Rückmeldung.
Kein weiterer Code-Patch bevor Albert die Testfälle geprüft hat.
