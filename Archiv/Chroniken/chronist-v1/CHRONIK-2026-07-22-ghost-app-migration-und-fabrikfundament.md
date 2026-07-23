---
chronik_id: CHRONIK-2026-07-22-ghost-app-migration-und-fabrikfundament
datum: 2026-07-22
projekt: finanzwesir-2-0
thema: ghost-app-migration-und-fabrikfundament
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: teilweise
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, konzept-vs-umsetzung, tooling-problem, praezisierung-durch-gegenfrage, annahme-verworfen]
---

# Chronik: Ghost-App-Migration und Fabrikfundament

**Hauptgegenstand:** Der Faden begann mit der Überführung von `prokrastinations-preis` in eine Ghost-Page und entwickelte sich über Daten-, Runtime-, CSS- und Bedienfragen zu einem verbindlichen Fundament für eine wiederholbare App-Fabrik. Er endete mit AF-GM-01; die Werkzeugstufe AF-GM-02 blieb offen.

## Ausgangslage

Die ChartEngine war bereits so migriert, dass sie in einer Ghost-HTML-Card laufen konnte. Die zu migrierende Prokrastinations-App verwendete die ChartEngine und zusätzliche fachliche Plugins. Ziel war zunächst ein Prozess, der für weitere Apps mit keiner Datenquelle, CSV, JSON oder beiden Datenformen wiederholt werden konnte.

Der Nutzer stellte klar, dass Charts technisch Apps sind: Eine Chart-App kann die Engine verwenden, andere Apps können sie zusätzlich einbinden. Die spätere Fabrik sollte daher keine getrennten Kategorien „Charts“ und „Apps“ behandeln.

## Chronologischer Verlauf

### Datenvertrag und Theme-Einstieg

Die anfängliche Annahme, die Ghost-Card könne vollständige Daten-URLs tragen, wurde verworfen. Festgelegt wurde ein reiner Dateinamenvertrag für `data-fw-data` und `data-fw-config`; ein zentraler Resolver ergänzt `/content/files/app-data/`. Der Offline-Prüfer validiert Dateien vor dem manuellen Transfer nach Ghost Local; Laufzeitparser validieren sie erneut und versiegeln sie in Vaults.

Für JSON wurde kein allgemeiner „allwissender“ Parser vorgesehen. `JSONParser` und JSON-Vault wurden als strukturelle Geschwister von CSVParser und CSV-Vault angelegt. Der Produktivname `stations.de.json` verletzte die Namensgrammatik und wurde in `stations-de.json` überführt.

Ein unabhängiges Review hatte zwei Entscheidungen offen gelassen: den Dateinamenvertrag und den Theme-Einstieg. Der Nutzer legte eine statische Registry fest: Ein Literal-Slug wählt nur eine statisch importierte Init-Funktion; Card-Werte steuern nie Importpfade oder Script-URLs. Der Bootstrapper erhielt eine Error Boundary pro Container und den bestehenden Doppelinitialisierungs-Guard. Die Entscheidungen wurden als SEC-04 und SEC-05 sowie in den App-, Sicherheits- und Interface-Dokumenten formalisiert.

### Runtime-Grenze, Validatoren und Ghost-Übernahme

Die produktive App-Runtime wurde aus `Apps/prokrastinations-preis/app.js` nach `Theme/assets/js/apps/prokrastinations-preis.js` verlegt. `Theme/assets/js/apps/index.js` wurde der einzige statische Theme-Bootstrapper. Die Testseite lädt denselben Einstieg. Ein Prototype-Eigenschaftsname als Slug führte zur Ergänzung eines `Object.hasOwn`-Guards in der Registry.

Für JSON entstand ein Offline-Validator als struktureller Gegenpart zum CSV-Validator. `package.json` im Datenordner wurde als Werkzeugartefakt auf die Ignorierliste gesetzt. Der Validator erhielt Vertragsmodule und Fingerprints. Datenfeeds wurden weiterhin manuell in den Ghost-Local-Dateipfad übertragen.

Beim strukturellen Checker erschien ein Fehlalarm: Ein ausgelagertes Stations-Vertragsmodul wurde wie eine eigenständige App-Runtime behandelt. Die Testpflicht wurde danach aus den Literal-Slugs der Registry abgeleitet, nicht aus jeder JavaScript-Datei im Apps-Ordner.

### CSS-Befunde und Reparaturkette

Die Ghost-Sichtabnahme machte mehrere Abweichungen sichtbar: native Button-Ränder, falsche Schriftwirkung, zu große Textabstände, fehlende Kartenflug- und KPI-Animationen sowie ein Link-Styling im Abschluss-CTA. Die Ursache war nicht ein einzelner Stilwert: App-Mechanik-CSS war beim Runtime-Umzug nicht in den Theme-Build gelangt; außerdem schlugen ungelayerte Ghost-Artikelregeln Tailwind-Utilities.

Aus Reviews und Quellprüfung entstand eine CSS-Architektur: eine produktive CSS-Wahrheit über `screen.source.css` und den Tailwind-Build; app-lokale Mechanik in `Theme/src/css/apps/{slug}.css`; eine enge Ausnahme an den betroffenen `.gh-content`-Regeln; kein `!important` als Kaskadenreparatur und keine JavaScript-Style-Injektion. Der CSS-Quellpfad wurde erweitert, die Mechanik eingebunden und ein Migrations-Gate dokumentiert. Ein offener Disclosure-Button erhielt die fehlende native-Control-Normalisierung.

Nach Theme-ZIP-Tests blieben einzelne Bedien- und Textfragen. Die Rubikon-Texte wurden als zugänglicher DOM-Inhalt beibehalten, statt sie in ein Canvas-Textplugin zu verlagern. Der Textinhalt wurde in `stations-de.json` als JSON-Feed vorgesehen. Ein PowerShell-Eingabewerkzeug schrieb die beiden JSON-Kopien atomar und validierte sie. Mehrere Bedienprobleme — Encoding, Abschlussgeste und strenge Markdown-Eingaben — führten zu einem allgemeineren Eingabekern. Die operative V5-Abnahme wurde vom Nutzer als gelaufen bestätigt; spätere Bedienverbesserungen des Werkzeugs blieben als Backlog-Thema bestehen.

### Vom Migrationspilot zur App-Fabrik

Der Nutzer beschrieb die Werkstatt-Mockups als abgenommene Prototypen: Nach der psychologischen und optischen Abnahme sollen sie nicht erneut gestaltet, sondern deterministisch nach Spezifikation hergestellt werden. Als Vergleich wurde die Überführung eines abgenommenen Autobau-Prototyps in eine verlässliche Produktionsmaschine verwendet.

Sol und Fable prüften einen Golden-Master-Entwurf. Sie bestätigten die Richtung, wiesen aber auf eine Lücke hin: Zeitgatter, Rundenlogik und Zustandsverzweigungen dürfen nicht aus Mockup-JavaScript gefolgert werden. Dafür braucht die Fabrik eine beobachtete Browser-Spur. Playwright wurde nach anfänglicher Einordnung als schwergewichtig auf einen engen Anwendungsfall begrenzt: gepinntes Chromium, Recorder und Verifizierer, kein CI, Dashboard oder Browsermatrix.

Der Nutzer verlangte außerdem einen harten Schutz gegen schleichende Änderungen an gemeinsamer Theme- und Engine-Infrastruktur. Daraus entstand das Muster `forbidden → protected → forbidden`: Vor einer Shared-Änderung muss der Pfad formell geöffnet werden; danach folgt ein enger Shared-AP mit Regression und ein Relock. Eine rein verbale Freigabe wurde ausdrücklich nicht als Ersatz anerkannt.

## Wendepunkte

- Die Einordnung von Charts als Sonderkategorie wurde durch die Festlegung „Chart ist App“ ersetzt.
- Vollständige Card-URLs wurden durch den Dateinamen-/Resolver-Vertrag ersetzt.
- Die anfängliche Migration wurde um JSON-Parser, JSON-Vault und Offline-Validator erweitert.
- Die CSS-Abweichungen wurden von Einzelbugs zu einem Build- und Kaskadengrenzen-Thema umgedeutet.
- Die Arbeit wechselte von der einzelnen Prokrastinations-App zur Frage einer kontrollierten Produktionslinie für abgenommene Mockups.

## Entscheidungen und Festlegungen

- `data-fw-data` und `data-fw-config` enthalten ausschließlich geprüfte Dateinamen; Resolver, Spezialparser und Vaults bilden die Datenpipeline. Status am Ende: gültig.
- Der Theme-Einstieg ist ein statischer Bootstrapper mit Literal-Registry und Error Boundary pro `.fw-app`. Status am Ende: gültig.
- Die produktive Runtime liegt im Theme; `Apps/{slug}` bleibt Dossier, Vertrag und Testumgebung. Status am Ende: gültig.
- Normale App-Mechanik wird über den bestehenden Tailwind-Build ausgeliefert. Die Ghost-Kaskadengrenze wird an der Ursprungsregel hergestellt; `!important` dient nicht als Gegenmittel. Status am Ende: gültig.
- Der Golden Master wird über Abnahmebeleg, Hash, deklaratives Eingabepaket und beobachtete Browser-Spur definiert. Status am Ende: gültig als Standard; Recorder und Verifizierer noch nicht gebaut.
- Shared Paths stehen standardmäßig auf `forbidden`; eine Ausnahme benötigt Unlock, Shared-AP und Relock. Status am Ende: gültig.

## Irrwege, Schleifen und verworfene Ansätze

- Die URL-Form der Card-Feeds wurde verworfen, weil sie den zentralen Dateinamen- und Resolververtrag umging.
- Eine einzige Verzweigungsdatei für CSV und JSON wurde zugunsten zweier spezialisierter Parser verworfen.
- CSS-Style-Injektion aus JavaScript wurde als zweiter Auslieferungsweg nicht übernommen.
- Die Annahme, Engine-Fallback-CSS sei ausschließlich für Testseiten bestimmt, wurde durch Code- und Kaskadenprüfung ersetzt: Der Fallback war produktiv wirksam und erhielt eine Übergangsparitätspflicht.
- Die Ordnerheuristik des Testseiten-Checkers wurde verworfen, weil Hilfs- und Vertragsmodule keine Registry-Apps sind.
- Ein unveränderter Schutzstatus bei mündlicher Freigabe erwies sich als unzureichend und führte zum formellen Unlock-/Relock-Muster.

## Erzeugte Artefakte

- `Theme/assets/js/fw-chart-engine/data/AppDataResolver.js`, `JSONParser.js` und `FinanzwesirJsonData.js` — Resolver-, Parser- und Vault-Geschwister für JSON; Status: produktive Shared-Infrastruktur.
- `Theme/assets/js/apps/index.js` und `Theme/assets/js/apps/prokrastinations-preis.js` — statischer Theme-Einstieg und migrierte Runtime; Status: produktive Runtime.
- `content/files/app-data/json-validator.mjs` und `pruefe-json.bat` — Offline-JSON-Prüfung; Status: Redaktionswerkzeug.
- `Theme/src/css/apps/prokrastinations-preis.css` und angepasster Theme-Build — lokale Mechanik im produktiven CSS-Weg; Status: produktive Quelle.
- `bearbeite-rubikon-text.ps1`/`.bat` und JSON-Eingabekern — Textbearbeitung mit Validierung und Doppelschreibvorgang; Status: operativ erprobt, Bediennacharbeit offen.
- `docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md` — Kanon für Golden Master, Eingabepaket, Schutzprofil und Produktionsrollen; Status: verbindlich.
- AF-PROD-01 bis AF-PROD-04 im Decision Log sowie erweitertes `PROTECTED_PATHS.json` — formale Produktions- und Schutzentscheidungen; Status: verbindlich.

## Sachliche Erkenntnisse

- Gesicherter Stand: Parser und Vault werden je Datenformat spezialisiert, während Resolver-Ablauf und Sicherheitsnomenklatur gleich bleiben.
- Gesicherter Stand: Ungelayerte Ghost-Regeln können gelayerte Tailwind-Utilities unabhängig von Spezifität überstimmen; die Ausnahme muss an der Ghost-Ursprungsregel liegen.
- Gesicherter Stand: Eine produktive App benötigt dieselbe Theme-Runtime in Ghost und auf ihrer Testseite, nicht eine zweite App-Kopie.
- Gesicherter Stand: Ein abgenommenes Mockup liefert die sichtbare Zielwirkung, aber nicht die Produktionsarchitektur oder eine zuverlässige Beschreibung seiner JavaScript-Logik.
- Arbeitsannahme: Sonnet kann app-lokale Produktions-APs herstellen, wenn der Input Pack, die Gates und der Write-Scope vollständig sind.
- Offene Frage: Wie genau Recorder und Verifizierer für die Browser-Spur als AF-GM-02 umgesetzt werden; die Grenze ist dokumentiert, das Werkzeug fehlt.

## Offene Punkte am Ende

- AF-GM-02: gepinnten Playwright-Chromium-Recorder und JSON-Verifizierer über einen formellen Unlock-/Relock-Strang bauen.
- AF-GM-03: Eingabepaket-Generator, JSON-Schemas, Provenienz- und Shared-Regression-Checker bauen.
- AF-GM-04: ersten ausdrücklich abgenommenen Golden Master mit Sonnet durch die Produktionslinie führen.
- Die spätere Bediennacharbeit für das JSON-Eingabewerkzeug bleibt im Backlog.
- Der Engine-DOM-Zielzustand für die produktive Fallback-CSS bleibt ein separater künftiger AP.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Die einzelnen Ghost-Bugs führten wiederholt zu gemeinsamen Vertrags- oder Auslieferungsgrenzen. Der Faden wechselte mehrfach zwischen app-lokaler Korrektur und gemeinsamer Infrastruktur; die spätere Protected-Path-Regel entstand aus einer beobachteten Differenz zwischen verbaler Freigabe und formellem Status.

## Bewusst ausgelassen

Ausgelassen wurden einzelne Promptformulierungen, vollständige Testausgaben, ZIP-Hashes, wiederholte Browser-Schritte, Dateidiffs und Gesprächsreparaturen ohne spätere Wirkung. Die eingefügten Fremdberichte von Claude, Sol und Fable wurden als Material behandelt, nicht als direkte Fadenbeiträge.
