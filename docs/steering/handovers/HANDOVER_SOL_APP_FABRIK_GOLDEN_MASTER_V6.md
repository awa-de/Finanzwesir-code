# Auftrag an ChatGPT Sol (Reasoning: High)
## App-Fabrik V6 — vom abgenommenen Mockup zur sicheren Ghost-App

## Geltung und Ziel

Dieser Auftrag ersetzt für diese Fragestellung alle früheren Golden-Master-/App-Fabrik-
Aufträge V1 bis V5.

Entwickle **keinen Code** und bewerte **nicht** Optik, Psychologie, Copy oder Usability
des Mockups. Diese Punkte sind mit Alberts Abnahme abgeschlossen.

Entwirf die vollständige, schlanke und wiederholbare **App-Fabrik** für rund 25 Apps:
Aus genau einem abgenommenen Werkstatt-Mockup soll Claude Sonnet eine visuell und im
Happy Path identische, sichere, spezifikationskonforme Ghost-App herstellen. Die
Fabrik baut nicht das Design neu, sondern übersetzt einen fixen Prototyp in ein
Produktionssystem.

Die Produktmetapher ist verbindlich: Der abgenommene Prototyp definiert die Scheinwerfer.
Die Fabrik entscheidet nicht mehr über Größe, Form oder Wirkung, sondern stellt sie
zuverlässig, wartbar und nach Sicherheitsvertrag her.

## Nichtziele

- keine neue Design-/Wirkungsanalyse, kein Browser, keine Screenshots zur Designkritik;
- kein HTML-zu-JS-Compiler und keine Übernahme der Mockup-Runtime;
- keine zweite CSS-Wahrheit, kein zweiter Renderer, kein zweites Deployment-System;
- keine generische Multi-Agent-Plattform und keine generische LLM-Eval-Plattform;
- keine App-Implementierung, keine Spekulation über fachliche Entscheidungen.

## Bereits verbindliche Architektur

Diese Tatsachen sind Ausgangspunkt, nicht Designoptionen:

1. Charts und sonstige Anwendungen sind eine App-Familie. Eine Chart-App kann die
   Chart-Engine verwenden; andere Apps können die Engine/Plugins verwenden.
2. Die Ghost-Card ist `.fw-app`; der statische Theme-Bootstrapper nutzt eine literale
   Slug-Registry, keinen dynamischen Import. Jede App hat Error Boundary und
   Doppelinitialisierungs-Guard.
3. App-Daten folgen dem Dateinamenvertrag: Card -> zentraler Resolver -> CSV-/JSON-
   Parser -> Validator -> eingefrorener Vault -> AppContext/Rucksack. Dateien werden
   offline geprüft, dann manuell nach Ghost übertragen. Datenklasse: keine Daten,
   CSV, JSON oder CSV+JSON.
4. Der produktive Motor liegt im Theme; `Apps/<slug>` bleibt nach Migration als
   Dossier/Vertrag/Testartefakte, nicht als zweite Runtime. Der Nutzer lädt Theme-ZIP,
   Daten und HTML-Card manuell hoch und nimmt Ghost-nah ab.
5. CSS: Tailwind-Quellen werden einmal zu Theme-CSS gebaut. Die allgemeine
   `.fw-app`-Hostgrenze schützt vor Ghost-Content-CSS; einzigartige App-Mechanik liegt
   app-lokal im Theme-CSS. Kein JS-Stil-Injection-Weg, kein `!important` als
   Kaskadenreparatur. Reduced Motion und A11y sind Produktionsanforderungen.
6. Der Rucksack-/AppContext-Vertrag und die bindenden Specs haben Vorrang. Der
   Rucksack ist tief unveränderlich; fachliche Funktionen, Datenladen und Rendering
   werden nicht aus dem Mockup kopiert.

Prüfe den Quellenstand; bei Konflikten gilt die bindende Spec mit Pfad:Zeile.

## Pflichtquellen — vollständig lesen

```text
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\MOCKUP-VERTRAG.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\APP_FACTORY_STARTLINIE.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\03_APP_FACTORY_STANDARD_DRAFT.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\01_DECISION_LOG.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\App-Fabrik\APP_FACTORY_IMPLEMENTATION_RFC.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\spec\ARCHITECTURE STRATEGY PAPER VX.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\spec\Der Rucksack (Context Object Pattern).md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\spec\APP-INTERFACE.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\handovers\MIGRATIONSSTRATEGIE_GHOST_APPS_V2_CHART_BLAUPAUSE.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\design\TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\design\CSS-KONVENTIONEN.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\audits\SECURITY-BASELINE.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\testing\TEST_PAGE_STANDARD.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\editorial\CSV-APP-DATEN-WORKFLOW.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\editorial\JSON-APP-DATEN-WORKFLOW.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\README.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\SONNET_AUFTRAG.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\SONNET_EINGABEPAKET.md
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\a-sol\mockup.html
Z:\Documents\Nextcloud\Finanzwesir 2.0\tests\scratch\crash-reaktions-test\mockup-duell\b-fable\mockup.html
```

Keine rekursive Suche in `tests/scratch/` oder `Archiv/`; keine andere App als Vorlage.

## Arbeitsauftrag: vollständige Produktionslinie

Entwirf eine einzige V1-Bauform. Sie muss mindestens diese Stufen mit Eingabe,
Ausgabe, Eigentümer, Fall-zu-Fehler-Gate und Nachweis beschreiben.

### 1. Abnahme- und Intake-Grenze

Definiere den verbindlichen Startpunkt nach der Mockup-Abnahme. Ein Factory-Run braucht
genau einen gewählten Golden Master (Pfad, Varianten-Slug, SHA-256, Abnahme-ID/-datum).
Behandle zwei Varianten, fehlende Abnahme oder veränderten Hash als Stop. Kläre, welche
kleinste Erweiterung des `MOCKUP-VERTRAG` nötig ist, damit ein statischer visueller
Blueprint rechtmäßig aus dem Wegwerf-Mockup extrahiert werden darf.

### 2. Versioniertes Factory-Input-Pack

Definiere ein überwiegend durch Python erzeugtes, gehashtes Pack — kein Mega-Prompt,
kein bloßes Pfadverzeichnis. Es muss Sonnet ohne Raten führen und mindestens enthalten:

- Master-Identität und Quellenmanifest mit Vorrangregeln;
- Produktentscheidungsledger: entschieden/offen/simuliert/redaktionell offen;
- Interaktionsspuren: Start, Aktion -> sichtbarer Zustand + Control-State, Ende;
- visueller/mechanischer Blueprint: App-Wurzel, statische DOM-Sektionen, literal
  verwendete Tailwind-Rezepte, lokale CSS-Mechanik, Tokens/Fonts, Breakpoints,
  Motion/Reduced Motion;
- fachlicher Datenbrief: Datenklasse, Quellen, Simulationen, Regeln, Copy-Status,
  Plugin-/Chart-Bedarf und A11y-Absicht;
- Produktionsvertrag: Zielpfade, verbotene Transfers, Test-/ZIP-Artefakte;
- Referenzumgebung: Viewports, DPR, Browser, Fonts, feste Testdaten/Uhrzeit,
  Animationszustand und angemessene Toleranz;
- Protokoll-, Tool-, Prompt- und Modellversionen.

Ordne jedes Feld zu: Python-Extraktion, Alberts Eingabe oder Sonnet-Stop. Ein fehlendes
Feld darf nie durch plausibles Vervollständigen ersetzt werden.

### 3. Deterministische Produktions-APs

Zerlege die Herstellung in kleinste Sonnet-taugliche APs, jeweils mit engem Write-Scope,
exakter Leseliste, erwarteten Nachweisen und Stop-Regeln. Die Reihenfolge muss mindestens
abdecken: Vertrags-/APP_SPEC-Differenz, Datenklasse/Validatoren, Theme-Runtime und
AppContext, Rendering/Chart-Plugin-Einbindung, Tailwind/Mechanik-CSS, dauerhafte
Testseite, Sicherheits-/Parser-/Unit-/Build-Gates, Theme-ZIP und menschliche Ghost-nahe
Abnahme.

Beschreibe die Wiederholungsregel für die vier Datenklassen und die Sonderrolle der
Chart-Engine, ohne Charts wieder künstlich von Apps zu trennen.

### 4. Transfer- und Lebenszyklusgrenze

Lege präzise fest, was aus dem Mockup als Blueprint übernommen werden darf und was
zwingend neu entsteht. Kläre Zielorte und Eigentum für Theme-Runtime, CSS, App-Dossier,
Testseite, Datenvertrag, Validator, Betriebsdaten und Theme-ZIP. Beschreibe außerdem
den späteren Änderungsweg für App-Code, Daten und redaktionellen Text, ohne das
Deployment-Modell zu verdoppeln.

### 5. Nachweisstrategie und Fabrik-Gates

Definiere drei Ebenen:

1. Python/Node: strukturelle, Sicherheits-, Daten-, Manifest-, Parser-, Klassen- und
   Artefaktprüfungen;
2. reproduzierbare technische Parität innerhalb `.fw-app`: State-/DOM-/Klassen-/Trace-
   Fingerprints und nur bei begründetem Nutzen Screenshotvergleich;
3. kurze menschliche Ghost-nahe Abnahme (Upload, Card, Daten, Interaktion, Fehler,
   Reduced Motion, relevante Viewports).

Bestimme den minimalen Eval-Korpus: abgenommener Pilot, absichtlich fehlerhafte Packs
(fehlender Ledger, unzulässige Mockup-Übernahme, unbekannte Datenklasse) und jede echte
spätere Störung als Regression. Kein Plattform-Überbau.

### 6. Rollen, Kosten und Modellrouting

Gestalte die Fabrik so, dass **Claude Sonnet das ausführende Modell** ist. Python
übernimmt alles deterministisch Extrahier- und Prüfbare. Haiku ist nur nach einem
gemessenen Pilot-Eval für enges, schema-validiertes Zuarbeiten zulässig; ohne Nachweis
empfiehl V1 ohne Haiku. Sol/Fable sind Architektur-/Peer-Review-Instanzen, nicht
Produktionsarbeiter.

Bewerte Opus als Teilfrage, nicht als Leitfrage: Formuliere objektive Auslöser für eine
einmalige Opus-Analyse eines nicht mechanisierbaren Architektur-/Vertragskonflikts und
die Rückgabe an Sonnet. Fehlende Produktentscheidung, fehlender Golden Master und
widersprüchliche Produktvorgaben sind Albert-Stop, niemals Opus-Ersatz. Zwei gleiche
Gate-Fails bei unverändertem Pack lösen Reviewer-Diagnose aus.

Nutze Ockhams Rasiermesser und Via Negativa aktiv: minimaler Mechanismus, kein
Agentenschwarm, keine Wiederholung von Source-of-Truth-Dokumenten, keine ungemessene
Modelloptimierung.

## Write-Scope

Schreibe ausschließlich:

```text
Z:\Documents\Nextcloud\Finanzwesir 2.0\docs\steering\audits\ENTWURF_APP_FABRIK_GOLDEN_MASTER_V6.md
```

## Ergebnisformat

1. Gesamturteil und Architekturdiagramm der Produktionslinie.
2. Eingangsgates und Golden-Master-Vertrag.
3. Factory-Input-Pack als Feldtabelle (Erzeuger, Pflicht, Prüfgate).
4. AP-Kette für Sonnet einschließlich Datenklassen-/Chart-Varianten.
5. Transfer-, Zielpfad- und Lebenszyklusmodell.
6. Gate-, Evidenz- und Evalstrategie.
7. Rollen-/Routingmatrix einschließlich objektiver Opus-Ausnahme.
8. Kleinste notwendige Vertrags- und Dokumentänderungen.
9. Reihenfolge der ersten Implementierungs-APs.
