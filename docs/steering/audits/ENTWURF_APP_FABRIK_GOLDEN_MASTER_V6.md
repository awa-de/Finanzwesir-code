# Entwurf App-Fabrik Golden Master V6

**Stand:** 2026-07-22  
**Status:** Architekturentwurf, keine Code-Freigabe  
**Geltung:** Eine schlanke V1-Produktionslinie vom durch Albert abgenommenen Werkstatt-Mockup zur sicheren Ghost-App. Der Entwurf bewertet weder Optik, Psychologie, Copy noch Usability neu.

## 1. Gesamturteil und Architekturdiagramm der Produktionslinie

### 1.1 Urteil

Eine schlanke, wiederholbare V1 ist mit dem vorhandenen System möglich. Es braucht keinen HTML-zu-JS-Übersetzer, keinen neuen App-Core, keine zweite CSS-Wahrheit, kein zweites Deployment-System und keinen Agentenschwarm. Es braucht genau vier neue Fabrikmechanismen:

1. einen eindeutigen, hashgebundenen Golden-Master-Abnahmenachweis;
2. ein versioniertes, überwiegend durch Python erzeugtes Factory-Input-Pack;
3. eine deterministisch erzeugte Kette enger Sonnet-Arbeitspakete mit Fall-zu-Fehler-Gates;
4. einen technischen Paritätsnachweis vor der kurzen menschlichen Ghost-Abnahme.

Die Ursachen der heutigen Lücke sind keine fehlende App-Architektur, sondern eine fehlende Übergangsgrenze zwischen Wegwerf-Mockup und Produktion:

- Der Mockup-Vertrag erlaubt bisher nur die Übernahme von beobachtetem Verhalten und Gestaltung, verbietet aber jede Code-/Architekturübernahme (`docs/App-Fabrik/MOCKUP-VERTRAG.md:69-77`).
- Theme-Runtime, Datenpfad, Sicherheitsperimeter, CSS-Build und Testseite sind bereits entschieden (`docs/App-Fabrik/01_DECISION_LOG.md:400-437`, `:459-497`; `docs/spec/APP-INTERFACE.md:98-114`, `:153-183`, `:242-276`).
- Was fehlt, ist ein rechtmäßig extrahierter, deklarativer Blueprint mit eindeutiger Provenienz, nicht eine weitere Runtime.

**Konsequenz für den vorhandenen Crash-Reaktions-Test:** Ein Factory-Run darf mit dem gelesenen Stand noch nicht beginnen. Es liegen zwei Varianten vor; die README bezeichnet beide als GELB bis zu Alberts realer Abnahme (`tests/scratch/crash-reaktions-test/mockup-duell/README.md:40-44`). Keine der Pflichtquellen enthält eine eindeutige Golden-Master-Abnahme-ID mit genau einem Varianten-Slug. Das Intake-Gate muss deshalb stoppen. Dies ist kein Urteil über A oder B.

### 1.2 Verbindliches Muster

```text
Albert: genau einen Golden Master abnehmen
  │  Pfad + Varianten-Slug + SHA-256 + Abnahme-ID + Datum
  ▼
Python: Intake- und Quellen-Gate
  │  zwei Varianten / fehlende Abnahme / Hash-Drift => STOP
  ▼
Factory-Input-Pack V1 (kanonisches JSON + Pack-Hash)
  │  Fakten, Ledger, Traces, Blueprint, Datenbrief, Zielvertrag
  ▼
Python: enges AP-Paket für den jeweils nächsten Schritt erzeugen
  │
  ▼
Claude Sonnet: genau ein begrenztes Produktions-AP ausführen
  │  enger Write-Scope, exakte Leseliste, erwartete Evidenz
  ▼
Python/Node-Gate je AP
  │  strukturell, Security, Daten, Parser, Klassen, Build, Artefakte
  ├── Fehler => lokaler STOP; kein Folgeschritt
  ▼
Technische Parität innerhalb .fw-app
  │  State-/DOM-/Klassen-/Trace-Fingerprints
  │  Screenshotvergleich nur für nicht anders belegbare Geometrie
  ▼
Theme-ZIP + separat geprüfte CSV-/JSON-Betriebsdaten
  │
  ▼
Albert: kurze Ghost-nahe Abnahme
  │  Upload, Card, Daten, Interaktion, Fehler, Reduced Motion, Viewports
  ▼
Freigabe oder nummerierter Rücklauf in genau das fehlerhafte AP
```

### 1.3 Systemgrenzen und Annahmen

| Grenze | Verbindliche V1-Regel | Beleg |
|---|---|---|
| App-Familie | Charts und andere Anwendungen sind eine App-Familie; ChartEngine ist ein Subsystem, kein Gegenmodell. | `MIGRATIONSSTRATEGIE_GHOST_APPS_V2_CHART_BLAUPAUSE.md:8-21` |
| Ghost-Card | Neue Apps: `.fw-app` + `data-fw-app`; bestehende Standalone-Charts behalten `financial-chart-module`. | `APP-INTERFACE.md:48-58`, `:117-149` |
| Runtime | Einzige produktive App-Runtime im Theme; `Apps/{slug}` bleibt Fach-/Testakte. | `01_DECISION_LOG.md:426-437` |
| Bootstrap | Ein Theme-Einstieg, literale Slug-Registry, keine dynamischen Imports aus Card-Werten; Error Boundary und Doppelinitialisierungs-Guard pro Container. | `SECURITY-BASELINE.md:183-194` |
| Daten | Reiner Dateiname → zentraler Resolver → spezialisierter Parser → Validator → tief eingefrorener Vault → AppContext. | `APP-INTERFACE.md:206-239` |
| CSS | Eine gebaute `screen.css`; lokale Mechanik über `Theme/src/css/apps/{slug}.css`, barem Import und denselben Build. | `CSS-KONVENTIONEN.md:10-27`, `:79-83` |
| Tests | Dauerhafte `Apps/{slug}/app.test.html` nutzt dieselbe Theme-Runtime; strukturelle Testseite und Ghost-nahe Sichtabnahme beweisen verschiedene Dinge. | `TEST_PAGE_STANDARD.md:475-514`; `MIGRATIONSSTRATEGIE...md:120-125` |
| Mensch | Albert entscheidet Wirkung, Golden Master, offene Produktfragen und die finale Ghost-nahe Freigabe. | `MOCKUP-VERTRAG.md:79-97` |

Ockhams Rasiermesser: Das vorhandene Theme-, Parser-, Vault-, Context-, ChartEngine-, Tailwind- und Testsystem wird wiederverwendet.  
Via Negativa: Kein Mockup-JavaScript, kein Mockup-Datenmodell, kein zweiter Renderer, kein neuer Loader, kein Backend, kein Universalparser, kein LLM-Freigabeersatz.

## 2. Eingangsgates und Golden-Master-Vertrag

### 2.1 Verbindlicher Startpunkt

Ein Factory-Run beginnt erst, wenn ein maschinenlesbarer Abnahmesatz vollständig vorliegt:

| Feld | Vertrag |
|---|---|
| `appSlug` | kanonischer App-Slug |
| `goldenMaster.path` | repository-relativer Pfad zu genau einer HTML-Datei unter der aktuellen Werkstatt |
| `goldenMaster.variantSlug` | genau ein Varianten-Slug, z. B. `a-sol` oder `b-fable` |
| `goldenMaster.sha256` | SHA-256 der abgenommenen Datei, 64 Hexzeichen |
| `acceptance.id` | eindeutige, unveränderliche Abnahme-ID |
| `acceptance.date` | ISO-Datum mit Zeitzone |
| `acceptance.by` | `Albert` |
| `acceptance.scope` | `Optik + Verhalten + Happy Path` |
| `acceptance.notes` | nur ausdrücklich verbleibende Bedingungen; leer ist zulässig |

Der Run-Identifier wird deterministisch gebildet:

```text
<appSlug>__<acceptance.id>__<erste-12-Zeichen-des-GM-Hashes>
```

### 2.2 Harte Intake-Gates

| Gate | Prüfung | Fall-zu-Fehler-Verhalten | Nachweis |
|---|---|---|---|
| GM-01 Eindeutigkeit | genau ein `goldenMaster.path`, genau ein `variantSlug` | zwei Varianten, Verzeichnis statt Datei oder fehlender Wert: STOP vor Pack-Erzeugung | JSON-Schema + Dateiexistenz |
| GM-02 Abnahme | ID, Datum, `by=Albert`, Scope vorhanden | fehlende/bedingte, aber nicht aufgelöste Abnahme: Albert-STOP | signierter Abnahmesatz im Pack |
| GM-03 Integrität | Ist-Hash entspricht abgenommenem SHA-256 | jede Abweichung: STOP; nie automatisch neu hashen und fortfahren | Hashvergleich |
| GM-04 Quellenbindung | alle Pflichtquellen vorhanden, UTF-8 lesbar, Hash erfasst | fehlende oder unlesbare Pflichtquelle: STOP | Quellenmanifest |
| GM-05 Ledger | jeder Eintrag genau einer der Klassen `entschieden`, `offen`, `simuliert`, `redaktionell offen` zugeordnet | unbekannter Status, Duplikat, Lücke oder widersprüchliche Entscheidung: STOP | Schema- und ID-Mengenprüfung |
| GM-06 Quellvorrang | jeder erkannte Widerspruch besitzt eine auf Pfad:Zeile gestützte Auflösung | Sicherheitswiderspruch oder nicht auflösbarer Spec-Konflikt: STOP, keine stille Entscheidung | Konfliktliste im Pack |
| GM-07 Scope | Golden Master liegt in der aktuellen App-Werkstatt; keine andere App wird als Vorlage gelesen | Fremd-App-/Archiv-/Scratch-Quellgriff: STOP | erlaubte Pfadmenge |
| GM-08 Vollständigkeit | alle Pflichtfelder des Packs belegt | kein plausibles Vervollständigen durch Sonnet | Schemafehler mit Feldpfad |

### 2.3 Kleinste rechtmäßige Erweiterung des Mockup-Vertrags

In `docs/App-Fabrik/MOCKUP-VERTRAG.md` ist nach §6 genau ein neuer Unterabschnitt nötig; keine zweite Übergabe-Spec:

> **Deklarative Golden-Master-Extraktion nach Alberts Abnahme.** Nach einer mit Pfad, Varianten-Slug, SHA-256, Abnahme-ID und Datum festgehaltenen Abnahme darf ein deterministisches Intake-Werkzeug aus genau diesem Golden Master einen statischen Produktions-Blueprint extrahieren: App-Wurzel, Reihenfolge und Semantik statischer DOM-Sektionen, sichtbare Zustände und Control-States, wörtlich vorhandene Tailwind-Rezepte, app-lokale CSS-Mechanik einschließlich `--fw-*`, Token-/Font-Verwendung, Breakpoints sowie Motion-/Reduced-Motion-Verhalten. Diese Extraktion ist Evidenz für Optik und beobachtbares Verhalten, keine Codeübernahme. Weiterhin verboten sind insbesondere Mockup-JavaScript, Zustands- und Datenmodell, Berechnungen, Loader/Parser, Modulstruktur, Schnittstellen, Bootstrapper, Architekturentscheidungen sowie ungeprüfte Daten und Copy. Fehlt die eindeutige Abnahme oder stimmt der Hash nicht, wird nichts extrahiert.

Damit bleibt `MOCKUP-VERTRAG.md:69-77` wirksam; nur die bisher fehlende Erlaubnis für eine deklarative, hashgebundene Beobachtung wird ergänzt.

### 2.4 Quellenrang und erkannte Konflikte

| Konflikt | Geltender Stand | Begründung mit Pfad:Zeile |
|---|---|---|
| URL oder Dateiname in `data-fw-data/config` | ausschließlich kanonischer Dateiname | `APP-INTERFACE.md:100-112`, `01_DECISION_LOG.md:400-410` überschreiben ältere URL-Beispiele in `03_APP_FACTORY_STANDARD_DRAFT.md:449-510` |
| Runtime unter `Apps/{slug}` oder Theme | ausschließlich Theme | `01_DECISION_LOG.md:426-437`; ältere Draft-Struktur `03_APP_FACTORY_STANDARD_DRAFT.md:406-425` ist überholt |
| Testseite lädt App-Kopie oder Theme-Runtime | dieselbe Theme-Runtime wie Ghost | `TEST_PAGE_STANDARD.md:480-493`; die allgemeine Baumgrafik `:68-95` ist an dieser Stelle veraltet |
| App-CSS als zweite Datei oder Theme-Quelle | lokale Mechanik als Theme-Quelle, eingebaut in eine `screen.css` | `01_DECISION_LOG.md:471-497`, `CSS-KONVENTIONEN.md:79-83` |
| `fw-*` nur Chart-Engine oder auch App-Mechanik | `.fw-app`/app-lokales `fw-app__*` und `--fw-*` sind ausdrücklich zulässig; allgemeine Engine-Klassen bleiben getrennt | spezifischer Vertrag `TAILWIND-APP-BAUKASTEN...md:25-40`, `:530-532` präzisiert die zu breite Formulierung `CSS-KONVENTIONEN.md:105-110` |
| Empty bei fehlenden Daten | fehlende/unvollständige Pflichtdaten sind Error; Empty nur bei gültigem, fachlich leerem Ergebnis | `APP-INTERFACE.md:278-298` überschreibt ältere Draft-Formulierung `03_APP_FACTORY_STANDARD_DRAFT.md:825-837` |
| `app.test.html` als Ghost-Beweis | nur Struktur-/DOM-Test; produktive Kaskade nur im lokalen Ghost mit gebautem `screen.css` | `MIGRATIONSSTRATEGIE...md:108-125` |
## 3. Factory-Input-Pack als Feldtabelle

### 3.1 V1-Bauform und Ablage

Kanonischer Laufordner in der Fach-/Testakte:

```text
Apps/{slug}/factory-runs/{runId}/
├── FACTORY_INPUT_V1.json        # einzige kanonische Pack-Nutzlast
├── FACTORY_INPUT_V1.sha256      # Hash über die exakten JSON-Bytes
├── ap/                          # deterministisch aus dem Pack erzeugte, enge AP-Eingaben
└── evidence/                    # AP-Ergebnisse, Gate-Berichte, Release-Manifest
```

`FACTORY_INPUT_V1.json` wird als kanonisch serialisiertes UTF-8 ohne BOM erzeugt: sortierte Schlüssel, feste Zeilenenden, keine Zeitstempel außer den ausdrücklich protokollierten Versions-/Abnahmefeldern. `ap/` und `evidence/` sind abgeleitete Laufartefakte, keine zweite Sachwahrheit. Sie nennen immer Pack-Hash und AP-Version.

Das Pack ist kein Mega-Prompt. Es ist eine strukturierte, gehashte Laufkapsel. Sonnet erhält pro AP nur:

- den relevanten Pack-Ausschnitt;
- eine exakte Leseliste;
- den engen Write-Scope;
- Vorbedingungen, Stop-Regeln und erwartete Nachweise.

### 3.2 Feldvertrag

**Globale Regel:** Jedes als Pflicht markierte Feld fehlt → Pack ungültig → Sonnet-STOP. Sonnet darf kein Feld ergänzen, raten oder aus anderen Apps ableiten.

| JSON-Feld | Inhalt | Erzeuger | Pflicht | Prüfgate |
|---|---|---|---:|---|
| `schemaVersion` | exakt `factory-input/v1` | Python-Konstante | ja | Schema-ID exakt |
| `runId` | deterministische ID nach §2.1 | Python | ja | Regex + Neuableitung |
| `app.slug` | kanonischer Slug | Python aus Pfad/Abnahme | ja | Gleichheit Card/Ordner/Abnahme |
| `app.specPath` | aktueller APP_SPEC-Pfad oder `null` | Python | ja | existiert oder AP-01 als Spec-Neuanlage markiert |
| `goldenMaster.path` | genau eine HTML-Datei | Albert liefert, Python prüft | ja | GM-01/07 |
| `goldenMaster.variantSlug` | genau eine Variante | Albert | ja | Pfad-/Slug-Konsistenz |
| `goldenMaster.sha256` | abgenommener Hash | Python berechnet, Albert bindet ihn in der Abnahme | ja | GM-03 |
| `acceptance.id/date/by/scope` | Abnahmeidentität | Albert | ja | GM-02 |
| `acceptance.conditions[]` | ausdrücklich verbleibende Bedingungen | Albert | ja, leere Liste zulässig | keine unaufgelöste Bedingung vor betroffenem AP |
| `sources[]` | Pfad, SHA-256, Rolle, Rang, Zeilenende, Encoding | Python | ja | Existenz, Hash, UTF-8, erlaubte Pfade |
| `sourcePrecedence[]` | aufgelöste Konflikte mit Pfad:Zeile | Python aus bindenden Vorrangregeln; bei neuer Wertentscheidung Albert | ja | GM-06 |
| `decisionLedger[]` | ID, Text, Status: entschieden/offen/simuliert/redaktionell offen, Besitzer, Beleg | Python extrahiert; Albert bestätigt offene/produktrelevante Entscheidungen | ja | eindeutige IDs, erlaubte Statusmenge, keine widersprüchlichen Werte |
| `openProductStops[]` | noch von Albert zu entscheidende Punkte | Albert | ja, leere Liste zulässig | betroffene APs bleiben gesperrt |
| `traces[].id` | stabile Trace-ID je Happy-Path-Schritt | Python | ja | eindeutig, lückenlose Reihenfolge |
| `traces[].startState` | sichtbare Sektion, Werte, Fokus, Control-State vor Aktion | Python-Extraktion | ja | DOM-Bezug auf GM vorhanden |
| `traces[].action` | Nutzeraktion/Auslöser | Python-Extraktion | ja | Element und Ereignis beobachtbar |
| `traces[].endState` | sichtbarer Zustand, `disabled`, `hidden`, `aria-*`, Fokusziel, relevante Anzeige | Python-Extraktion | ja | vollständig für jede Aktion |
| `blueprint.root` | `.fw-app`, Variantenmarker nur als Referenz, Root-Utilities | Python-Extraktion | ja | genau eine App-Wurzel |
| `blueprint.domSections[]` | Reihenfolge, semantische Tags/Rollen, statische Kindgruppen | Python-Extraktion | ja | normalisierter DOM-Fingerprint |
| `blueprint.tailwindRecipes[]` | vollständige wörtliche Klassenlisten; keine Laufzeitkomposition | Python-Extraktion | ja | Literal- und Mengenprüfung |
| `blueprint.localCssMechanics[]` | Selektoren, Properties, Keyframes/Transitions, app-lokale `--fw-*` | Python-Extraktion | ja, leere Liste zulässig | nur App-Wurzel; keine globale Regel |
| `blueprint.tokensAndFonts[]` | verwendete CI-Tokens/Fontrollen, keine kopierten Tokenwerte als neue Wahrheit | Python-Extraktion | ja | alle Token existieren in `tokens.css` |
| `blueprint.breakpoints[]` | `sm/md/lg` plus begründete lokale Mechanikgrenzen | Python-Extraktion | ja | nur erlaubte generische Breakpoints; lokale Ausnahme deklariert |
| `blueprint.motion[]` | Bewegung, Dauer, Auslöser, Endzustand, Reduced-Motion-Verhalten | Python-Extraktion | ja, leere Liste zulässig | jede Bewegung besitzt Reduced-Motion-Vertrag |
| `data.class` | exakt `A0`, `A1-C`, `A1-J` oder `A2-CJ` | Python aus bindender APP_SPEC; fehlt sie, Albert | ja | unbekannter Wert: STOP |
| `data.sources[]` | Dateiname, Format, fachliche Rolle, Versions-/Quellenstatus | Python; redaktionelle Freigabe durch Albert | datenklassenabhängig | Dateinamenvertrag, Ledger-Status |
| `data.simulations[]` | simulierte Werte/Formeln, ausdrücklich als Simulation | Python aus Ledger; Albert bestätigt | ja, leere Liste zulässig | keine Simulation als Produktionsfakt maskiert |
| `data.rules[]` | fachliche Regeln, Einheiten, Wertebereiche, Rundung, Truthful-UX-Grenzen | Python aus Spec; fehlend Albert-STOP | ja | Spec-Beleg und Testvektoren |
| `data.copyStatus[]` | Text-ID, Wortlaut/Quelle, `entschieden` oder `redaktionell offen` | Python; Albert entscheidet offene Copy | ja | offene produktive Copy sperrt Render-AP |
| `data.chartNeed` | `none` oder benannter ChartEngine-Bedarf/Plugin | Python aus Spec; Konflikt Albert | ja | kein direkter Canvas-Sonderweg |
| `data.a11yIntent` | textliche Alternative, Live-Region, Fokus-/Control-Semantik | Python aus Spec; fehlend Albert-STOP | ja | A11y-Vertrag vollständig |
| `production.targets` | erlaubte Zielpfade für Runtime, CSS, Dossier, Test, Daten, ZIP | Python aus Factory-Vertrag | ja | exakte Allowlist |
| `production.forbiddenTransfers[]` | Mockup-JS, Architektur, Parser, Inline-Daten usw. | Python-Konstante aus Mockup-Vertrag | ja | statischer Sperrscan + Review |
| `production.requiredArtifacts[]` | AP-Evidenz, Testseite, Build, ZIP, Release-Manifest | Python | ja | Artefaktmengenprüfung |
| `reference.browser` | Browsername und exakte Version | Python erfasst; Albert bestimmt den Referenzlauf | ja | nicht `latest` |
| `reference.viewports[]` | mindestens 375, 768, 1280 CSS-Pixel | Python-Profil; Albert bestätigt | ja | exakte Breite/Höhe |
| `reference.dpr` | Device Pixel Ratio | Python erfasst | ja | Zahl > 0 |
| `reference.fonts[]` | erwartete lokale Fonts/Weights und Ladebestätigung | Python | ja | Font-Load-Gate |
| `reference.fixedDataTime` | feste Fixtures, Datum/Uhrzeit/Zeitzone | Python; fachliche Auswahl aus Spec/Albert | ja | keine laufzeitabhängige Uhr |
| `reference.animationState` | normal/reduced, Wartepunkt für Messung | Python-Profil | ja | beide Zustände geprüft, wenn Motion existiert |
| `reference.tolerances` | exakte strukturelle und begründete visuelle Toleranzen | Python-Default; jede Abweichung Albert | ja | keine freie Sonnet-Toleranz |
| `versions.generator` | Generatorname, Version, eigener SHA-256 | Python | ja | Hash gegen ausgeführtes Werkzeug |
| `versions.tools` | Python/Node/Browser/Checker-Versionen | Python | ja | vollständig |
| `versions.prompt` | AP-Schablonenversion | Python | ja | erlaubte Version |
| `versions.model` | ausführendes Modell, z. B. Claude Sonnet mit fester Modellkennung | Python aus Run-Konfiguration | ja | Sonnet-Pflicht für Produktions-APs |
| `packHash` | nicht im JSON selbst; steht in `.sha256` und jedem Folgeartefakt | Python | ja | Byte-Hash vor jedem AP erneut prüfen |

### 3.3 Referenztoleranzen V1

| Merkmal | V1-Toleranz |
|---|---|
| State-, Trace-, Rollen-, `aria-*`-, Control- und Reihenfolge-Fingerprint | exakt, keine Toleranz |
| Text und berechnete Testwerte | exakt, sofern Ledger nicht ausdrücklich `redaktionell offen` sagt |
| Tailwind-Rezeptmenge und lokale Mechanik-Selektoren | exakt bzw. explizit begründetes Mapping im APP_SPEC-Diff |
| Schlüsselgeometrie im festgelegten Browser | höchstens 2 CSS-Pixel und höchstens 1 % der jeweiligen Referenzdimension; beide Grenzen müssen eingehalten sein |
| Farbe/Token | gleiche semantische Tokenrolle; bei identischer Referenzumgebung auch gleicher berechneter Farbwert |
| Screenshot | nur für benannte Schlüsselzustände; Text-Antialiasing wird maskiert, ungeklärte Flächenabweichung über 0,5 % stoppt die Freigabe |

Eine Toleranz ist kein Reparaturmittel. Eine vom lokalen Font-Laden, Browser oder fehlender Fixture verursachte Abweichung wird zuerst an der Ursache behoben.
## 4. AP-Kette für Sonnet einschließlich Datenklassen- und Chartvarianten

### 4.1 Allgemeine AP-Regel

Jedes AP enthält: Pack-Hash, Risikoklasse, Ziel, exakte Leseliste, engen Write-Scope, Vorbedingungen, Invarianten, typische Fehler, Fehler-Todeszonen, Akzeptanzkriterien, erwartete Nachweise und Stop-Regeln. Ein AP darf nur den Zustand `grün` oder `gestoppt mit Gate-ID` liefern. Ein grünes AP erzeugt noch keine automatische Freigabe des Folge-AP; Python prüft zuerst die Nachbedingungen.

### 4.2 Produktionskette

| AP | Eingabe und exakte Leseliste | Enger Write-Scope / Ausgabe | Eigentümer | Fall-zu-Fehler-Gate | Nachweis |
|---|---|---|---|---|---|
| AP-00 Intake einfrieren | Abnahmesatz, GM-Datei, in V6 benannte Pflichtquellen | nur `Apps/{slug}/factory-runs/{runId}/FACTORY_INPUT_V1.*` | Python; Albert liefert Abnahme | GM-01 bis GM-08 | Pack-Hash, Schema grün, Quellenmanifest |
| AP-01 APP_SPEC-Differenz | relevanter Pack-Ausschnitt; vorhandene `Apps/{slug}/APP_SPEC.md`; `APP-INTERFACE.md`; Security-Baseline; Baukasten; Migrationsstrategie | nur `Apps/{slug}/APP_SPEC.md` und `evidence/AP-01-spec-diff.md` | Sonnet | offene Produkt-, Daten-, Copy- oder A11y-Frage nicht als Pflicht erfinden; Security-Sync nicht grün => STOP | nummerierte Differenz Mockup-Beobachtung → Produktionsvertrag; „Reise eines Inputs“ |
| AP-02 Datenklasse festlegen | Pack `data.*`; freigegebene APP_SPEC; CSV-/JSON-Workflow; Parser-/Vault-Verträge | nur APP_SPEC-Datenabschnitt und `evidence/AP-02-data-plan.json`; noch kein UI-Code | Sonnet + Python-Prüfer | Datenklasse unbekannt, Quelle ungeklärt, Simulation als Fakt, fehlender Wertebereich => STOP | Datenklasse, Quellen, Testvektoren, Validatorplan |
| AP-03 Datenvertrag/Validator | AP-02; datenklassenabhängige Parser-/Vault-Dateien; fachliche Spec | nur benannte app-spezifische Vertragsmodule, Offline-Validator-Registry/Test und Fixtures; gemeinsame Parser nur lesen | Sonnet | A0 mit unnötigem Parser; eigener CSV-Parser; generischer JSON-Fallback; nicht tief eingefrorene Nutzdaten => STOP | Positiv-/Negativtests, Freeze- und Fehlercodes |
| AP-04 Theme-Start und Error Boundary | APP_SPEC; Theme-Bootstrapper; APP-INTERFACE; Security-Baseline | nur `Theme/assets/js/apps/{slug}.js`, literaler Eintrag in `Theme/assets/js/apps/index.js`, minimale Testseitenanpassung für den Startzustand | Sonnet | dynamischer Importpfad, Script pro Card, fehlender `data-fw-initialized`-Guard oder container-lokales `try/catch` => STOP | Slug-, Mehrfachinstanz-, Unknown-Slug-, Error-State-Tests |
| AP-05 Fachkern und AppContext | APP_SPEC; AP-03-Verträge; Rucksack-/Architekturvertrag | nur benannte reine Fachfunktionen und Context-Erzeugung innerhalb der Theme-Runtime oder eines ausdrücklich erlaubten Theme-Hilfsmoduls | Sonnet | Mockup-Berechnung kopiert; Vault mutiert; AppContext nicht tief unveränderlich; UI-State im statischen Context => STOP | Unit-Tests, Input-Reise, Freeze-Test |
| AP-06 Rendering und Happy-Path-Traces | APP_SPEC; Pack-Traces/Blueprint; Baukasten; Theme-Runtime | nur Renderer-/Controller-Anteil der App-Runtime; kein CSS-Mechanik-AP | Sonnet | `innerHTML` mit Nutz-/Configdaten, globale IDs als API, fehlender Fokus-/ARIA-/State-Vertrag, Trace-Abweichung => STOP | Trace-, DOM-, Rollen- und Control-State-Fingerprints |
| AP-07 ChartEngine-Variante | nur wenn `data.chartNeed != none`: APP_SPEC; ChartEngine-Vertrag; Bridge-/Plugin-Spec; AppContext-Ausgabe | nur benannte App-Bridge-Nutzung; ChartEngine selbst nur in separatem, von Albert freigegebenem Gate änderbar | Sonnet | direktes Canvas-Rendering, zweiter Chart-Renderer, `financial-chart-module` im internen App-Zielcontainer, Doppelinitialisierung => STOP | `renderFromData`-Eingabe tief eingefroren; Container-Guard; Chart-A11y |
| AP-08 Tailwind und lokale Mechanik | Pack-Blueprint; Baukasten; CSS-Konventionen; `screen.source.css`; reale Theme-Runtime | nur Literalrezepte in der Runtime, `Theme/src/css/apps/{slug}.css`, barer Import in `screen.source.css`, gebaute `screen.css` | Sonnet + Build | Klassenkomposition, JS-Stilinjektion, globale App-Mechanik, `!important` als Kaskadenreparatur, fehlende `@source`-Deckung => STOP | Quellen-Existenz, Utility-Deckung, Mechanik-Parität, frischer Build |
| AP-09 Dauerhafte Testseite | APP_SPEC-Testfälle; `TEST_PAGE_STANDARD.md`; kanonisches Template; Theme-Runtime | nur `Apps/{slug}/app.test.html`, app-spezifische Testdaten und deterministisch erzeugter Launcher | Sonnet + Python | zweite Runtime, falsche Card, fehlende Erwartungsblöcke, undeclarierte fehlende Referenz => STOP | `tools/check-test-pages.py` grün; sichtbare Szenarien |
| AP-10 Vollgates und technische Parität | kompletter Run, aber keine neuen fachlichen Quellen | nur `evidence/AP-10-*`; Fixes sind neue, eng begrenzte Rücklauf-APs | Python/Node; Sonnet nur für nichtmechanische Diagnose | jedes Struktur-, Security-, Daten-, Parser-, Klassen-, Build-, Trace- oder Paritätsgate rot => STOP | drei Nachweisebenen nach §6 |
| AP-11 Theme-ZIP | grüner AP-10; Theme-Quellbaum; Theme-Metadaten | nur `Theme/releases/{runId}/finanzwesir.zip` und `release-manifest.json` | Python-Paketierer | unerwartete Datei, fehlendes Asset, Hash-/Gscan-/Buildfehler => STOP | ZIP-Inhaltsmanifest, SHA-256, Reproduzierbarkeitslauf |
| AP-12 Ghost-nahe Abnahme | ZIP, geprüfte Betriebsdaten, Card-Beispiel, Kurzcheckliste | keine Repo-Schreibpflicht; Abnahmebefund unter `evidence/AP-12-ghost-acceptance.md` erst nach Alberts Ergebnis | Albert | Upload/Card/Daten/Interaktion/Fehler/Reduced Motion/Viewports nicht grün => keine Freigabe | datierter manueller Befund, konkrete Fehler-IDs |

### 4.3 Wiederholungsregel der vier Datenklassen

| Klasse | Produktionsweg | Pflichtgates | Was entfällt |
|---|---|---|---|
| A0 — keine Laufzeitdatei | Card/Options/User Input → Validierung → AppData/AppContext → DOM-Renderer | Options-/Input-Whitelist, Wertebereiche, Freeze, States, SafeDOM | CSV-/JSON-Resolver, Parser und Datentransfer |
| A1-C — CSV | `data-fw-data` → `AppDataResolver.resolveCsvAppDataFile` → vorhandener `CSVParser` → `FinanzwesirData` → App/Chart | Dateiname, Offline-Prüfung, Parser-Laufzeitprüfung, Pflichtfelder/Wertebereiche, Error/Empty | eigener CSV-Parser, JSON-Vertrag |
| A1-J — JSON | `data-fw-config` → JSON-Resolver → `JSONParser` + app-spezifischer Validator → `FinanzwesirJsonData` → App | Dateiname, literale Offline-Validator-Registry, Syntax/Fachvertrag, Deep Freeze, Error/Empty | Universalparser, CSV-Pfad |
| A2-CJ — CSV+JSON | beide unabhängigen Vaults → Domain-Strategie → tief unveränderlicher AppContext → Renderer/ChartEngine | beide Einzelpfade plus Cross-Source-Invarianten und gemeinsamer Fehlerzustand | Zusammenlegung der Parser oder Dateien |

Die ChartEngine ist in jeder Klasse eine optionale Komponenten-Engine. Sie ändert nicht die Datenklasse und begründet keine fünfte Klasse. Eine App mit app-berechneten Chartdaten verwendet den Daten-Bridge-Pfad; ein Standalone-Chart behält den deklarativen Legacy-Card-Pfad (`APP-INTERFACE.md:153-183`).

## 5. Transfer-, Zielpfad- und Lebenszyklusmodell

### 5.1 Was aus dem Mockup übernommen werden darf

| Darf als Blueprint übernommen werden | Muss in Produktion neu entstehen |
|---|---|
| App-Wurzel und statische DOM-Sektionsreihenfolge | Module, Imports und Bootstrap |
| semantische Tags, Rollen und beobachtbare Fokusziele | Zustandsmodell und Controller |
| sichtbare Start-/Endzustände und Control-States | fachliche Funktionen und Berechnungen |
| vollständige, wörtlich verwendete Tailwind-Rezepte | Datenladen, Resolver, Parser, Validatoren, Vaults |
| app-lokale CSS-Mechanik, `--fw-*`, Breakpoints, Motion/Reduced Motion | AppData, AppContext und Chart-Bridge |
| Token-/Fontrollen und responsive Referenzzustände | Error/Empty/Loading-Verträge und Security-Härtung |
| abgenommene Copy nur mit Ledger-Status `entschieden` | jede offene, simulierte oder redaktionell offene Aussage |

**Immer verboten:** Kopieren von Mockup-JavaScript, Eventlogik, Arrays/Inline-Daten, Berechnungen, Modulstruktur, Schnittstellen, Play-CDN-/Testhülle, Tokenkopien, Bootstrapper oder Architekturannahmen. Ein Hashgleichheitstest gegen Mockup-Skriptblöcke und ein verbotene-Muster-Scan sind Pflicht, ersetzen aber nicht die begrenzte semantische Prüfung auf umbenannte Kopien.

### 5.2 Zielorte und Eigentum

| Artefakt | Kanonischer Zielort | Eigentümer / Wahrheit |
|---|---|---|
| produktive App-Runtime | `Theme/assets/js/apps/{slug}.js` und ausdrücklich erlaubte Theme-Hilfsmodule | Theme; einzige Runtime-Wahrheit |
| Bootstrapper-Eintrag | `Theme/assets/js/apps/index.js` | Theme; literale Registry |
| lokale App-Mechanik | `Theme/src/css/apps/{slug}.css` | Theme-CSS-Quelle; app-lokal begrenzt |
| CSS-Import/Scan | `Theme/src/css/screen.source.css` | einziger Buildweg |
| ausgeliefertes CSS | `Theme/assets/css/screen.css` | Build-Artefakt, nie direkt bearbeiten |
| App-Dossier | `Apps/{slug}/` | APP_SPEC, Testseite, Run-Pack, Evidenz; keine produktive Runtime |
| dauerhafte Testseite | `Apps/{slug}/app.test.html` | Fach-/Testakte; lädt Theme-Runtime |
| app-spezifischer JSON-Vertrag | benanntes Vertragsmodul unter `Theme/assets/js/apps/` | eine fachliche Validatorfunktion für Browser und Offline-Prüfer |
| Offline-Validator-Registry | `content/files/app-data/json-validator.mjs` bzw. vorhandener CSV-Prüfer | separates Content-Repository; literale Zuordnung |
| produktive Betriebsdaten | geprüft unter `content/files/app-data/`, danach manuell nach `Ghost/content/files/app-data/` | Content, nicht Theme |
| lokaler Ghost-Datentest | `C:\Tools\ghost-local\site\content\files\app-data\` | flüchtige lokale Laufzeitkopie |
| Theme-ZIP | `Theme/releases/{runId}/finanzwesir.zip` | reines Paket des einen Theme-Systems |
| Release-Manifest | neben dem ZIP: `release-manifest.json` | Python-erzeugte Datei-/Hashliste, keine zweite Spec |
| Ghost-Card | Ghost-Artikel, `.fw-app` + erlaubte `data-fw-*` | redaktioneller Adapter, keine Logik |

`Theme/releases/` ist der kleinste neue Zielpfad, weil der aktuelle Theme-Bestand keinen Build-/ZIP-Ausgabeort und kein Paketwerkzeug definiert. Er ist kein zweites Deployment-System: Er enthält nur das reproduzierbare ZIP und sein Manifest; der Upload bleibt der bestehende manuelle Ghost-Admin-Weg.

### 5.3 Änderungswege nach Veröffentlichung

| Änderung | Weg | Kein zweiter Weg |
|---|---|---|
| App-Code / Interaktion / A11y | APP_SPEC-Differenz → enges Theme-AP → Gates → neues Theme-ZIP → Ghost-Admin-Upload | nie Runtime unter `Apps/{slug}`, nie Code Injection |
| lokale App-Mechanik / Tailwind | Theme-Quelle → frischer Build → Utility-/Mechanik-Gates → Theme-ZIP | nie JS-Stilinjektion, nie CSS-Datei über Card laden |
| CSV-Betriebsdaten | `content/files/app-data` → `pruefe-csv.bat` → lokal kopieren / FileZilla in Produktion → Card-Dateiname nur bei Versionswechsel ändern | kein Theme-Build, kein HTTP-Uploader |
| JSON-Betriebsdaten | Prüfkopie/Fixture gemäß Workflow → `pruefe-json.bat` → lokal/FileZilla | kein freies JSON in der Card, kein generischer Validator |
| redaktioneller Text in JSON | app-spezifisches Eingabeprofil oder gezielte JSON-Pflege → Fachvalidator → Datentransfer | keine Kopie zusätzlich in App-Code |
| redaktioneller Text in Runtime | Ledger/APP_SPEC → Theme-AP → ZIP | nicht parallel in JSON und JS pflegen |
| Chart-Verhalten | separater ChartEngine-Gate-AP mit Albert-Freigabe | kein app-lokaler Ersatzrenderer |
## 6. Gate-, Evidenz- und Evalstrategie

### 6.1 Fabrik-Gates

| Gate | billigster gültiger Beweis | Fehler-Todeszone |
|---|---|---|
| Intake/Manifest | Python: Schema, Pfad, Hash, ID-Mengen, Quellen-Allowlist | vor Pack-Erzeugung |
| Spec-/Security-Sync | Pfad:Zeile-Cross-Check + nummerierte Konfliktliste | AP-01, vor Code |
| Datenvertrag | Parser-/Validator-Positiv- und Negativtests, Freeze-Test | AP-02/03 |
| Runtime-Perimeter | statische Registry-Prüfung, Unknown-Slug, Error Boundary, Doppelinit | AP-04 |
| Fachkern | Unit- und Invariantentests mit festen Vektoren | AP-05 |
| SafeDOM/A11y/States | AST-/Textscan plus DOM-/Trace-Test | AP-06/07 |
| Tailwind/CSS | Literalprüfung, `@source`-Deckung, Selektor-Grep im Build, Root-Scope | AP-08 |
| Testseite | `tools/check-test-pages.py` und sichtbare Erwartungsblöcke | AP-09 |
| technische Parität | normalisierte Fingerprints, feste Referenzumgebung | AP-10 |
| ZIP | Inhalts-Allowlist, Ghost-Theme-Validierung mit im Pack fixierter Werkzeugversion, SHA-256, zweiter identischer Paketlauf | AP-11 |
| Ghost | Albert prüft reale Darstellung und Bedienung | AP-12 |

### 6.2 Drei Nachweisebenen

#### Ebene 1 — Python/Node

Pflichtprüfungen:

- Schema, Pack-Hash, Quellen-Hash und Zielpfad-Allowlist;
- genau ein Golden Master und vollständiges Entscheidungsledger;
- verbotene Mockup-Transfers und unerwartete Dateien;
- Slug-/Dateinamen-/Options-Whitelists;
- Parser, Validatoren, Deep Freeze, Wertebereiche und Fehlercodes;
- SafeDOM-Sperren, literale Klassen, Registry und Doppelinitialisierungs-Guard;
- `tools/check-test-pages.py`, frischer CSS-Build, Utility-Deckung, Mechanik-Selektoren;
- ZIP-Inhalt und Hash-Reproduzierbarkeit.

Jeder tragende Checker erhält mindestens einen Positivfall und einen absichtlich fehlerhaften Negativfall mit erwartetem Exit-Code und Fehler-ID (`STRUKTURELLE_SICHERHEIT...md:489-510`).

#### Ebene 2 — reproduzierbare technische Parität innerhalb `.fw-app`

Für jeden Trace werden drei Fingerprints erzeugt:

1. **State-/Control-Fingerprint:** sichtbare Sektion, `hidden`, `disabled`, `aria-expanded`, `aria-pressed`, Fokusziel, relevante Ausgabe;
2. **DOM-Fingerprint:** normalisierte Tag-/Rollen-/Reihenfolge-Struktur ohne flüchtige IDs;
3. **Klassen-/Mechanik-Fingerprint:** vollständige Literalrezepte, semantische Tokenrollen, lokale Selektoren und Motion-Zustand.

Abweichungen sind nur zulässig, wenn der APP_SPEC-Diff sie als Produktionshärtung verlangt, zum Beispiel die neue Error-/Loading-Hülle. Sie dürfen den abgenommenen Happy Path nicht verändern.

Screenshotvergleich wird nur für benannte Schlüsselzustände eingesetzt, wenn DOM, Klassen und Trace die geometrische Wirkung nicht belegen können. Er ist Messung, keine neue Designkritik. Mindestkandidaten: Startzustand, wirkkritischer Zustandswechsel, Endzustand; jeweils nur an den Viewports, an denen sich Layout oder lokale Mechanik real ändert.

#### Ebene 3 — kurze menschliche Ghost-nahe Abnahme

Albert prüft im lokalen Ghost mit produktiv gebautem `screen.css`, ohne Play-CDN:

1. Theme-ZIP hochladen/aktivieren;
2. echte `.fw-app`-Card einfügen;
3. benötigte geprüfte Daten in `content/files/app-data` bereitstellen;
4. Happy Path vollständig bedienen;
5. Error-Fall und eine zweite App-Instanz prüfen;
6. Reduced Motion aktivieren;
7. relevante Viewports 375/768/1280 prüfen;
8. Konsole auf unerwartete Fehler prüfen.

Die App-Testseite ersetzt diesen Schritt nicht; der Ghost-Test ersetzt umgekehrt nicht Parser-, Struktur- oder Build-Gates.

### 6.3 Minimaler Eval-Korpus

| Fall | Erwartung |
|---|---|
| EVAL-01 abgenommener Pilot | kompletter Run wird grün; technischer und menschlicher Nachweis getrennt |
| EVAL-02 Pack ohne Ledger | GM-05/GM-08 rot; kein Sonnet-AP erzeugt |
| EVAL-03 Pack mit unzulässiger Mockup-Übernahme | Transfer-Gate rot; genaue Fundstelle und Verbotsklasse |
| EVAL-04 unbekannte Datenklasse | Schema rot; kein plausibles Mapping |
| EVAL-05 Hash-Drift am Golden Master | GM-03 rot; keine automatische Neuabnahme |
| EVAL-06 echte spätere Störung | minimal reproduzierbarer Fall wird dauerhaft als Regression dem zuständigen Gate hinzugefügt |

Kein Ranglistensystem, keine generische Eval-Plattform, kein Dashboard. Eine kleine Fixture-Sammlung und maschinenlesbare erwartete Gate-IDs reichen.

## 7. Rollen- und Routingmatrix einschließlich objektiver Opus-Ausnahme

| Aufgabe | Python | Claude Sonnet | Haiku | Sol/Fable | Opus | Albert |
|---|---|---|---|---|---|---|
| Hashes, Pfade, Schema, Manifest, Pack, AP-Schnitt | verantwortlich | liest nur gültige Eingaben | nein | nein | nein | liefert Abnahme/Entscheidungen |
| Produktions-APs | prüft und begrenzt | **ausführendes Modell** | V1: nein | nein | nein | nimmt sichtbare Meilensteine ab |
| Produktentscheidung / Golden Master | keine Entscheidung | STOP | nein | keine Entscheidung | kein Ersatz | **allein verantwortlich** |
| deterministische QA | verantwortlich | behebt nur freigegebene Findings | nur nach Eval denkbar | nein | nein | erhält Kurzbefund |
| Architektur-/Peer-Review | Fakten liefern | nicht Selbstfreigabe | nein | gezielte Reviewinstanz | nur Ausnahme unten | entscheidet über Findings |
| Ghost-nahe Endabnahme | Checkliste liefern | keine Selbstzertifizierung | nein | nein | nein | verantwortlich |

### 7.1 Haiku

V1 startet ohne Haiku. Zulässig wäre Haiku erst nach einem gemessenen Pilot-Eval für eine enge, schema-validierte Zuarbeit, wenn zugleich nachgewiesen ist:

- gleiche Gate-Trefferquote wie der bisherige deterministische/Sonnet-Weg;
- kein zusätzlicher Reviewbedarf;
- messbare Kosten- oder Zeitreduktion;
- Ergebnis vollständig durch Schema und Checker begrenzt.

Ohne diesen Nachweis ist Haiku zusätzliche Modellkomplexität ohne belegten Nutzen.

### 7.2 Objektive Opus-Ausnahme

Opus wird genau einmal für eine Teilfrage zugelassen, wenn **alle** folgenden Bedingungen erfüllt sind:

1. Der Konflikt betrifft zwei bindende Architektur-, Sicherheits-, A11y- oder Schnittstellenverträge.
2. Pfad:Zeile-Vorrang und vorhandenes Decision Log lösen ihn nicht.
3. Python kann den Sachstand beweisen, aber nicht zwischen mindestens zwei folgenreichen, nichtmechanischen Optionen entscheiden.
4. Sonnet darf die Entscheidung laut Vertrag nicht still treffen.
5. Der Konflikt blockiert den aktuellen AP und hätte Wirkung auf mehr als eine App oder eine gemeinsame Schnittstelle.

Opus liefert nur: Konflikt, belegte Invarianten, höchstens drei Optionen, Folgewirkung und Empfehlung. Es schreibt keinen Produktionscode und entscheidet nicht an Alberts Stelle. Alberts Entscheidung wird als neue Ledger-ID aufgenommen; danach erzeugt Python ein neues AP-Paket für Sonnet.

**Keine Opus-Auslöser:** fehlende Produktentscheidung, fehlender Golden Master, Hash-Drift, widersprüchliche Produktvorgaben, offene Copy. Das sind Albert-STOPs.

**Zwei gleiche Gate-Fails bei unverändertem Pack:** Sonnet stoppt. Sol oder Fable diagnostiziert einmalig, ob ein mechanischer Fehler, ein unvollständiges AP oder ein echter Vertragskonflikt vorliegt. Nur die dritte Klasse kann anschließend die Opus-Bedingungen erfüllen. Kein wiederholtes „noch einmal versuchen“ mit demselben Pack.

## 8. Kleinste notwendige Vertrags- und Dokumentänderungen

| Priorität | Änderung | Umfang | Warum nötig |
|---|---|---|---|
| 1 | `MOCKUP-VERTRAG.md` um §2.3 dieses Entwurfs ergänzen | ein Unterabschnitt | rechtmäßige, eng begrenzte Blueprint-Extraktion; ohne sie bleibt die Übergabe widersprüchlich |
| 2 | Factory-Input-Schema und Pack-/Gate-Vertrag als eine kanonische technische Spec festlegen | nach Pilot aus diesem Entwurf in die bestehende Ziel-Spec `docs/spec/APP-FACTORY-IMPLEMENTATION-STANDARD.md` überführen | keine dauerhafte Parallelwahrheit zwischen Entwurf und RFC |
| 3 | `03_APP_FACTORY_STANDARD_DRAFT.md` an den bereits bindenden Dateinamen- und Theme-Runtime-Stand angleichen oder die überholten Blöcke explizit als historisch markieren | nur §§5–7, 8–13 betroffene Aussagen | alte URL-/`Apps/app.js`-/Empty-Regeln dürfen Sonnet nicht fehlleiten |
| 4 | `TEST_PAGE_STANDARD.md:68-95` auf die bereits in `:480-493` geltende Theme-Runtime-Grenze korrigieren | Baumgrafik und Begleittext | keine zweite Runtime in der Teststruktur behaupten |
| 5 | `CSS-KONVENTIONEN.md:105-110` präzisieren | ein Satz | reservierte Engine-Klassen von erlaubtem `.fw-app`/`fw-app__*`/`--fw-*` unterscheiden |
| 6 | Theme-Paketvertrag ergänzen | Zielpfad `Theme/releases/{runId}`, ZIP-Inhalts-Allowlist, Manifest/Hash; kein neues Deployment | heute existieren weder Paket-Skript noch Ausgabeort im Theme-Bestand |

Nicht nötig:

- neue App-Familien-Spec;
- generischer Core oder Registrydienst;
- neue Chart-Engine-Schnittstelle auf Vorrat;
- getrennte CSS-/JS-Deployment-Regeln pro App;
- neuer Redaktions-Uploaddienst;
- zweites Abnahmedokument neben dem Pack;
- Aktualisierung jeder historischen Prozessdatei vor dem Pilot.

## 9. Reihenfolge der ersten Implementierungs-APs

1. **GMV6-01 — Mockup-Vertrag ergänzen.** Nur der Unterabschnitt aus §2.3; Klasse C, Albert-Freigabe erforderlich.
2. **GMV6-02 — `factory-input/v1`-Schema und kanonische Serialisierung.** Python; Felder, Enums, Hashformat, Pfad-Allowlist. Noch keine App-Produktion.
3. **GMV6-03 — Intake-/Pack-Generator.** Liest genau eine Abnahme und die explizite Quellenliste; extrahiert Blueprint/Traces; schreibt nur den Run-Ordner.
4. **GMV6-04 — Negativkorpus für Intake.** Fehlendes Ledger, zwei Golden Master, Hash-Drift, unbekannte Datenklasse, verbotener Pfad und unerlaubte Mockup-Übernahme; erwartete Gate-IDs.
5. **GMV6-05 — AP-Paket-Generator.** Erzeugt aus Pack und AP-Schablone nur den nächsten engen Sonnet-Auftrag; Pack-Hash und Write-Scope sind Pflicht.
6. **GMV6-06 — Theme-Paketierer.** Reproduzierbares `finanzwesir.zip` plus Inhaltsmanifest/Hash unter `Theme/releases/{runId}`; noch ohne neue App.
7. **GMV6-07 — Pilot-Golden-Master-Abnahme erfassen.** Albert benennt genau A oder B mit Abnahme-ID, Datum und Hash. Ohne diese Eingabe bleibt der Pilot gestoppt.
8. **GMV6-08 — Pilot AP-00 bis AP-02.** Pack erzeugen, APP_SPEC-Differenz und Datenklasse härten; noch kein Rendering.
9. **GMV6-09 — Pilot AP-03 bis AP-09.** Datenvertrag, Theme-Runtime, AppContext, Rendering, gegebenenfalls ChartEngine-Bridge, CSS und dauerhafte Testseite in der festgelegten Reihenfolge.
10. **GMV6-10 — Pilot AP-10 bis AP-12.** Vollgates, technische Parität, Theme-ZIP und Alberts Ghost-nahe Abnahme.
11. **GMV6-11 — einmaliger Peer-Review und gebündelter Fix.** Review der V1-Fabrik anhand des realen Piloten; alle akzeptierten Findings in einem Fix-Batch, danach finale Freigabe.
12. **Erst danach zweite App.** Nur reale Wiederholungen dürfen zu gemeinsamen Helfern oder einer Haiku-Ausnahme führen.

Die erste Umsetzung baut somit zuerst die Fehler-Todeszonen und erst danach eine App. Das ist hier kein Plattform-Überbau: Schema, Hash, Intake, AP-Schnitt und Paketierer sind die kleinste Infrastruktur, ohne die sich der gleiche Produktionsfehler über rund 25 Apps vervielfältigen würde.
