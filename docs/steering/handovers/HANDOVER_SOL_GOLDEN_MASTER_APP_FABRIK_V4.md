# Auftrag an ChatGPT Sol (Reasoning: High)
## Golden-Master-App-Fabrik V4 — Input-Pack, Produktionslinie, Eval-Ökonomie

## Geltung

Dieser Auftrag ersetzt vollständig `HANDOVER_SOL_GOLDEN_MASTER_APP_FABRIK_V3.md`.

Der abgenommene Prototyp ist ein **Golden Master**. Keine Design-, Wirkungs- oder
Usability-Kritik. Lies HTML nur als technische Blaupause. Entwickle keinen Code.

Ziel: eine schlanke, versionierte Produktionslinie, mit der Claude Sonnet aus einem
eindeutig identifizierten Golden Master eine neue, sichere Ghost-App baut. Der Bau muss
visuell/ablaufseitig nachweisbar treu und zugleich nach den bestehenden Specs konform sein.

## Wichtigster Ausgangsbefund

Das vorliegende Duell enthält zwei Kandidaten (`a-sol`, `b-fable`), aber keinen gewählten
Golden Master. Eine Fabrik darf niemals aus mehreren Kandidaten erraten, welcher gilt.
Dieser Fakt ist als P1-Eingangskriterium zu behandeln.

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

Keine rekursive Suche in `tests/scratch/` oder `Archiv/`; keine andere App als Vorlage.
Bindende Specs schlagen Drafts. Konflikte mit Pfad:Zeile benennen.

## Arbeitsauftrag

Empfiehl **eine** V1-Fabrikbauform. Sie muss die folgenden Fragen verbindlich beantworten.

### A. Factory-Input-Pack

Definiere einen versionierten, überwiegend per Python erzeugten Input-Pack für Sonnet.
Er darf nicht bloß ein Haufen Quellpfade sein und nicht alle vorhandenen Dokumente als
Mega-Prompt duplizieren. Er enthält nur relevante, eindeutige und gehashte Fakten.

Prüfe als Pflichtfelder mindestens:

1. Golden-Master-Identität: genau ein Pfad, SHA-256, gewählter Varianten-Slug,
   Abnahmedatum und Abnahme-ID.
2. Quellenmanifest: feste Spec-Versionen/Pfade/Hashes und die für diese App freigegebenen
   Auszüge; klarer Vorrang bei Konflikten.
3. Produktentscheidungsledger: entschieden, offen, simuliert, redaktionell offen.
4. Interaktionsspuren: Startzustand; je Happy Path Aktion -> erwarteter sichtbarer
   Zustand/Control-State; Abschlusszustand. Kein implizites Ableiten nur aus JS.
5. Visual-/Mechanik-Snapshot: App-Wurzel, statische DOM-Sektionen, Literal-Tailwind-
   Klassen, lokale CSS-Mechaniken, Tokens/Fonts, responsive Regeln, Motion/Reduced Motion.
6. Daten-/Fachbrief: Datenklasse, jede Quelle, Simulationsverbot, Berechnungsregeln,
   Textstatus, Chart-/Plugin-Bedarf, A11y-Absicht.
7. Produktionsvertrag: zulässiger Write-Scope, Datei-Zielstruktur, verbotene
   Übernahmen, erwartete Test-/ZIP-Artefakte.
8. Referenzumgebung für Parität: Viewports, Device-Pixel-Ratio, Fonts, Browser,
   feste Testdaten/Uhrzeit, Animationszustand und Toleranzregel.
9. Versionen: Factory-Protokoll, Python-Toolversion, Sonnet-Promptversion und Modellrolle.

Entscheide, welche Felder Python sicher extrahiert, welche Albert explizit angibt und
welche Sonnet nicht ohne Stop entscheiden darf.

### B. Produktionslinie und Modell-Routing

Definiere den festen Ablauf:

```text
Python: Golden-Master-Lint + Pack erzeugen
-> Sonnet: neue APP_SPEC + Runtime nach Pack bauen
-> Python/Node: Struktur-, Sicherheits-, Klassen-, Daten- und Paritäts-Gates
-> Sonnet: nur echte Gate-Fails beheben
-> Ghost-nahe technische Abnahme
-> Factory-Evalfall/Trace archivieren
```

Begründe jede Abweichung davon.

Ordne Arbeit nach **Messbarkeit**, nicht nach Bauchgefühl zu:

- Python übernimmt alles, was deterministisch parsbar/prüfbar ist.
- Haiku erhält nur nach einem Pilot-Eval klar begrenzte Klassifikationen mit JSON-Schema,
  niedriger Fehlertoleranz und Python-Nachprüfung. Falls kein solcher Fall existiert,
  lautet die Empfehlung ausdrücklich: in V1 kein Haiku.
- Sonnet bearbeitet nur semantische Neubauarbeit und echte Architekturentscheidungen.
- Fable/vergleichbar starker Reviewer prüft nur Risikopunkte bzw. Abweichungsfälle.
- Albert entscheidet nur die nicht ableitbaren Produktfragen und nimmt ab.

### C. Nachweise und Ökonomie

Definiere drei Evidenzebenen:

1. deterministische Assertions (höchste Priorität),
2. reproduzierbare Interaktions-/visuelle Regression innerhalb `.fw-app`,
3. kurze menschliche Ghost-nahe technische Abnahme.

Bewerte Screenshot-/Pixel-Diff gegen DOM-/Klassen-/State-Fingerprints. Empfiehl nur,
was bei 25 Apps mehr Fehler verhindert als Wartung verursacht. Ein Golden Master muss
nicht automatisch ein teures Screenshot-System rechtfertigen.

Definiere den ersten Eval-Korpus: zunächst ein abgenommener Pilot plus je ein bewusstes
Fehlbeispiel (unbekannte Datenklasse, fehlender Entscheidungsledger, unzulässige
Mockup-Übernahme). Neue reale Fehler werden als Regression ergänzt. Keine generische
LLM-Eval-Plattform bauen.

### D. Vertragsfrage

Prüfe die aktuelle Wegwerfregel exakt: Kann ein statischer visueller Blueprint aus
DOM/Literal-Tailwind/lokaler Mechanik in den Input-Pack überführt werden, wenn JS,
Datenmodell, Bootstrapper und Runtime vollständig neu entstehen? Empfiehl die kleinste
präzise Vertragsänderung oder begründe, warum sie nicht nötig ist.

Ockhams Rasiermesser und Via Negativa: kein HTML-zu-JS-Compiler, kein zweiter Renderer,
kein zweiter CSS-Weg, kein frei laufender Multi-Agent-Schwarm, kein unversionierter
Mega-Prompt.

## Write-Scope

Schreibe ausschließlich:

```text
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\audits\ANALYSE_GOLDEN_MASTER_APP_FABRIK_SOL_V4.md
```

## Ergebnisformat

1. Gesamturteil.
2. P1-Eingangskriterien.
3. Factory-Input-Pack: Feldtabelle mit Erzeuger, Pflicht, Prüfregel.
4. Pipeline und Gates.
5. Routingmatrix Python/Haiku/Sonnet/Reviewer/Albert.
6. Evidenz- und Evalstrategie.
7. Transfer-/Nichttransfer-Grenze.
8. Kleinste Vertragsänderungen.
9. Konkreter erster Implementierungs-AP.
