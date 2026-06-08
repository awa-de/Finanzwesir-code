---
name: manual-test-plan
description: Erstellt einen strukturierten manuellen Testplan für visuell zu prüfende Features in Finanzwesir 2.0 (Chart-Engine, Apps, CSS).
argument-hint: "[AP-ID oder Feature-Beschreibung]"
---

# Skill: manual-test-plan

Trigger: Claude schlägt vor bei komplexen visuellen Testfällen. Albert kann explizit aufrufen.
Argumente: $ARGUMENTS (AP-ID oder Feature)

Hintergrund: Es gibt keine automatische Testpipeline. Albert testet manuell im VSCode Live-Server.
Dieser Plan gibt Albert eine konkrete Checkliste — kein Raten, kein Vergessen.

---

## Testplan-Format

**Aufgabe:** [AP-ID: Titel]

**Betroffene Datei(en):** [Liste]

**Primärer Testfall:**
- HTML-Testdatei: `Theme/chart-tests/[datei].html`
- CSV: `Theme/data/[datei].csv`
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
[Relevante Testfälle nennen die Claude für betroffen hält]

**Bestanden wenn:**
[Konkretes Kriterium — nicht „sieht gut aus"]

---

## Hinweis

Claude wartet nach diesem Plan auf Alberts Rückmeldung.
Kein weiterer Code-Patch bevor Albert die Testfälle geprüft hat.
