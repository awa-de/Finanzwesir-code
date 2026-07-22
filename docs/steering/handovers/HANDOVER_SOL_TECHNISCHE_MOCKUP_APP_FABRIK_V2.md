# Auftrag an ChatGPT Sol (Reasoning: High)
## Technische Fabrik: abgenommenes Mockup -> migrationsfähige Ghost-App

## Geltung

Dieser Auftrag ersetzt vollständig:
`HANDOVER_SOL_MOCKUP_ZU_GHOST_APP_ANALYSE_V1.md`.

Die psychologische Wirkung, der Flow und die Optik des Mockups sind durch Albert bereits
abgenommen. Sie werden hier **nicht bewertet, nicht verglichen und nicht verbessert**.
Kein Browser- oder Screenshot-Test der Mockups. Das HTML wird nur als bindende
Eingabe zur Extraktion technischer Umsetzungsanforderungen gelesen.

## Ziel

Definiere den kleinsten deterministischen Fabrikprozess, durch den Claude Sonnet aus einem
abgenommenen Werkstatt-Mockup eine neue, funktionierende und sichere Ghost-App baut.

„Deterministisch“ bedeutet hier: feste Eingaben, fester Write-Scope, feste
Nichtübernahme-Regeln, feste technische Gates und eine nachvollziehbare Abweichungsliste.
Nicht: Byte-identischer LLM-Code oder automatisches Erraten fehlender Produktentscheidungen.

## Bindende Eingabe des späteren Sonnet-Laufs

```text
1. Abgenommenes Mockup HTML
2. Alberts Abnahme-/Produktentscheidungsprotokoll
3. Mini-Spec mit lokalem Steuerungsblock
4. Ein pro App erzeugter Migrationsbrief
```

Das Mockup ist visuell-fachliche Wahrheit. Es bleibt zugleich Wegwerfcode:
kein JavaScript, CSS, DOM-Gerüst, simuliertes Datenmodell oder Inline-Architektur wird
kopiert. Sonnet baut eine neue Produkt-Runtime und übernimmt ausschließlich explizit
extrahierte Anforderungen.

## Pflichtquellen — vollständig lesen

```text
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\MOCKUP-VERTRAG.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\APP_FACTORY_STARTLINIE.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\03_APP_FACTORY_STANDARD_DRAFT.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\spec\ARCHITECTURE STRATEGY PAPER VX.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\spec\Der Rucksack (Context Object Pattern).md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\spec\APP-INTERFACE.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\handovers\MIGRATIONSSTRATEGIE_GHOST_APPS_V2_CHART_BLAUPAUSE.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\design\TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\design\CSS-KONVENTIONEN.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\audits\SECURITY-BASELINE.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\README.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\SONNET_AUFTRAG.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\SONNET_EINGABEPAKET.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\a-sol\mockup.html
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\b-fable\mockup.html
```

Keine rekursive Suche in `tests/scratch/` oder `Archiv/`. Bindende Specs gewinnen
über Drafts; Widersprüche mit Pfad:Zeile melden.

## Untersuchungsauftrag

Empfiehl **genau eine** Zielbauform:

1. Benenne die minimale Ergänzung zu `MOCKUP-VERTRAG.md` §8, die aus einer
   Abnahme einen vollständigen Sonnet-Migrationsauftrag macht.
2. Entwirf das eine Migrationsbriefing mit Pflichtfeldern für:
   - unveränderliche Screen-/Flow-Reihenfolge und Nutzerentscheidungen,
   - sichtbare Zustände, responsive Regeln und lokale Mechanik einschließlich Reduced Motion,
   - Copy: freigegeben / redaktionell offen / simuliert,
   - Datenklasse A0/A1-C/A1-J/A2-CJ und Datenentscheidungen,
   - Komponenten/ChartEngine/Plugins,
   - A11y-Absicht,
   - explizite Abweichungen gegenüber dem Mockup.
3. Entwirf die feste Sonnet-Pipeline:
   Migrationsbrief -> APP_SPEC -> Theme-Runtime/CSS/Testseite/Datenvertrag ->
   maschinelle Gates -> Ghost-nahe technische Abnahme.
   Für jedes Gate: Eingabe, Ergebnis, Beweis, Stop-Bedingung.
4. Erstelle eine Transfermatrix:
   Mockup-Anforderung -> Produktverantwortlicher -> technischer Nachweis.
   Trenne streng zwischen Übernahme und Nichtübernahme.
5. Definiere technische Umsetzungstreue:
   Alle im Brief festgelegten Screens, Zustandswechsel, Controls, semantischen
   Texte, Animationen/Reduced Motion und responsiven Regeln müssen in der
   Ghost-nahen Abnahme nachweisbar sein. Das ist kein neues Designurteil.
6. Begründe, welche Infrastruktur ausdrücklich nicht entsteht:
   kein HTML-zu-JS-Transpiler, kein zweiter Renderer, kein zweiter CSS-Weg,
   kein allgemeines App-Framework ohne zweiten Bedarf.
7. Nenne ausschließlich Entscheidungen, die Albert vor dem Sonnet-Lauf treffen muss.

Ockhams Rasiermesser und Via Negativa sind verbindlich.

## Write-Scope

Schreibe ausschließlich:

```text
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\audits\ANALYSE_TECHNISCHE_MOCKUP_APP_FABRIK_SOL_V2.md
```

Kein Code, kein Build, kein ZIP, keine Änderung an bestehenden Dateien.

## Ergebnisformat

1. Gesamturteil.
2. Befund mit Pfad:Zeile.
3. Empfohlene Zielbauform.
4. Migrationsbrief: Pflichtfelder als Tabelle.
5. Sonnet-Pipeline und Gates.
6. Transfer-/Nichttransfer-Matrix.
7. Minimaler Dokumentenplan.
8. Albert-Entscheidungen.
9. Nächster Implementierungs-AP: eine präzise Aufgabe zur Einführung der Fabrik.

