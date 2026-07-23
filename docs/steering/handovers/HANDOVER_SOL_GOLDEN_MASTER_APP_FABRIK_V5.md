# Auftrag an ChatGPT Sol (Reasoning: High)
## Golden-Master-App-Fabrik V5 — Sonnet als ausführender Hersteller

## Geltung

Dieser Auftrag ersetzt vollständig `HANDOVER_SOL_GOLDEN_MASTER_APP_FABRIK_V4.md`.

Der abgenommene Prototyp ist ein **Golden Master**. Keine Design-, Wirkungs- oder
Usability-Kritik. Lies HTML ausschließlich als technische Blaupause. Entwickle keinen
Code.

Ziel ist eine schlanke, versionierte Produktionslinie, in der **Claude Sonnet der
ausführende Hersteller** ist: Sonnet baut aus einem eindeutig identifizierten Golden
Master eine sichere, spezifikationskonforme Ghost-App. Bewerte, ob das mit der richtigen
Arbeitszerlegung zuverlässig möglich ist. Opus ist keine Standardrolle und darf nicht
aus bloßer Vorsicht empfohlen werden.

## Wichtigster Eingangsbefund

Das vorliegende Duell enthält zwei Kandidaten (`a-sol`, `b-fable`), aber keinen gewählten
Golden Master. Ohne exakt einen Pfad, SHA-256, Varianten-Slug, Abnahme-ID und Datum darf
die Fabrik nicht starten. Behandle das als P1/Fall-zu-Fehler-Eingangsgate.

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

Empfiehl **eine** V1-Fabrikbauform. Die produktive Ausführung ist in kleinen,
abgeschlossenen Claude-Sonnet-APs vorzusehen — kein Großauftrag „baue die ganze App“.

### A. Versioniertes Factory-Input-Pack

Definiere ein überwiegend per Python erzeugtes Pack. Es ist kein Haufen Quellpfade und
kein Mega-Prompt mit vollständigen Dokumentkopien, sondern enthält nur relevante,
eindeutige, gehashte Fakten und einen Quellenmanifest mit Vorrangregeln.

Pflichtfelder mindestens:

1. Golden-Master-Identität: genau ein Pfad, SHA-256, Varianten-Slug, Abnahmedatum/-ID.
2. Quellenmanifest: feste Spec-Versionen/Pfade/Hashes, freigegebene Auszüge, Vorrang.
3. Produktentscheidungsledger: entschieden, offen, simuliert, redaktionell offen.
4. Interaktionsspuren: Startzustand; Happy-Path-Aktion -> sichtbarer Zustand/Control-
   State; Abschlusszustand. Nicht aus Mockup-JS erraten.
5. Visual-/Mechanik-Snapshot: App-Wurzel, statische DOM-Sektionen, literal verwendete
   Tailwind-Klassen, lokale Mechanik, Tokens/Fonts, responsive Regeln, Motion/Reduced
   Motion.
6. Daten-/Fachbrief: Datenklasse, Quellen, Simulationsverbot, Berechnung, Textstatus,
   Chart-/Plugin-Bedarf und A11y-Absicht.
7. Produktionsvertrag: erlaubter Write-Scope, Zielstruktur, verbotene Übernahmen,
   erwartete Test-/ZIP-Artefakte.
8. Referenzumgebung: Viewports, DPR, Fonts, Browser, feste Testdaten/Uhrzeit,
   Animationszustand und Toleranzregel.
9. Versionen: Factory-Protokoll, Python-Tool, Sonnet-Auftrag, Modellrolle.

Ordne jedes Feld eindeutig zu: Python-Extraktion, Alberts explizite Eingabe oder
Sonnet-Stop. Sonnet darf keine dieser Lücken plausibel ergänzen.

### B. Sonnet-taugliche Produktionslinie

Definiere folgende feste, einzeln beauftragbare Kette und begründe Abweichungen:

```text
Python: Golden-Master-Lint + Input-Pack
-> Sonnet AP 1: APP_SPEC/Entscheidungsdelta aus Pack, noch keine Runtime
-> Python + Review: Spec-/Vertragsgates
-> Sonnet AP 2..n: jeweils genau eine Runtime-/Daten-/CSS-/Test-Scheibe
-> Python/Node: Struktur-, Sicherheits-, Klassen-, Daten- und Paritätsgates
-> Sonnet: ausschließlich begründete Gate-Fails korrigieren
-> Ghost-nahe technische Abnahme
-> Input-Pack, Trace und reale Regression als Evalfall archivieren
```

Definiere für jeden Sonnet-AP: erlaubte Eingaben, erlaubten Write-Scope, erwartete
Ausgaben, deterministische Gates und Stop-Bedingungen. Sonnet erhält das kompakte Pack
plus exakt benannte Primärquellen zum Nachlesen, nicht einen blind kopierten
Dokumentenberg.

### C. Modellgrenzen und Opus-Eskalation

Erstelle eine Entscheidungsmatrix Python / Haiku / Sonnet / Opus / Reviewer / Albert.
Sie muss diese Regeln prüfen und präzisieren:

- Python übernimmt alles deterministisch extrahier- oder prüfbare.
- Haiku nur nach einem Pilot-Eval für enges JSON-Schema, niedrige Fehlertoleranz und
  Python-Nachprüfung. Ohne belastbaren Fall: V1 ohne Haiku.
- Sonnet ist Standard für klar abgegrenzte semantische Neubauarbeit, wenn das Pack,
  der Scope und die Gates vollständig sind.
- Unbekannte Produktentscheidung, fehlender Golden Master oder widersprüchliche
  Anforderungen sind Albert-Stop, **kein** Opus-Fall.
- Ein einmaliger Gate-Fehler ist ein normaler Sonnet-Korrekturzyklus.
- Zwei gleichartige Gate-Fehler ohne Änderung des Eingabepacks lösen Diagnose durch
  Reviewer aus; nicht blind weitere Sonnet-Wiederholungen.
- Opus darf nur für einen konkret dokumentierten, nicht mechanisierbaren
  Architektur-/Vertragskonflikt empfohlen werden. Formuliere objektive Trigger,
  erwarteten Einmal-Output und Rückgabe an Sonnet. „Komplex“ oder „zur Sicherheit“
  sind keine Trigger.

Beurteile ausdrücklich: Reicht Sonnet für V1 bei dieser Bauform? Falls nein, nenne die
kleinste exakt abgegrenzte Arbeit, die Opus braucht, samt Beweis, warum sie nicht durch
Pack, Gate oder Albert-Entscheidung lösbar ist.

### D. Evidenz, Eval und Ökonomie

Definiere drei Ebenen: (1) deterministische Assertions, (2) reproduzierbare
Interaktions-/visuelle Regression innerhalb `.fw-app`, (3) kurze menschliche Ghost-nahe
technische Abnahme. Bewerte Pixel-Diff gegen DOM-/Klassen-/State-Fingerprints: nur
einführen, wenn er bei 25 Apps mehr Fehler verhindert als Wartung erzeugt.

Erster Eval-Korpus: ein abgenommener Pilot und mindestens drei Fehlfälle (unbekannte
Datenklasse, fehlender Ledger, unzulässige Mockup-Übernahme). Jeder reale Produktions-
Fehler ergänzt künftig einen Regressionfall. Keine generische LLM-Eval-Plattform.

### E. Vertragsgrenze

Prüfe, ob statisches DOM, Literal-Tailwind und lokale Mechanik als unveränderlicher
Blueprint im Pack stehen dürfen, während JS, Datenmodell, Bootstrapper und Runtime
vollständig neu entstehen. Empfiehl nur die kleinste nötige Vertragsänderung.

Ockhams Rasiermesser und Via Negativa: kein HTML-zu-JS-Compiler, kein zweiter Renderer,
kein zweiter CSS-Weg, kein Multi-Agent-Schwarm und kein unversionierter Mega-Prompt.

## Write-Scope

Schreibe ausschließlich:

```text
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\audits\ANALYSE_GOLDEN_MASTER_APP_FABRIK_SOL_V5.md
```

## Ergebnisformat

1. Gesamturteil: Sonnet-V1 GO / GO MIT AUFLAGEN / NO-GO.
2. P1-Eingangskriterien.
3. Factory-Input-Pack: Feldtabelle mit Erzeuger, Pflicht, Prüfgate.
4. Sonnet-AP-Kette und Gates.
5. Routing- und Opus-Eskalationsmatrix.
6. Evidenz- und Evalstrategie.
7. Transfer-/Nichttransfer-Grenze.
8. Kleinste Vertragsänderungen.
9. Konkreter erster Implementierungs-AP.
