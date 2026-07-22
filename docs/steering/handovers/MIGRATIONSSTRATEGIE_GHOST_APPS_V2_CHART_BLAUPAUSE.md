# Migrationsstrategie Ghost-Apps V2: Die Chart-App als Blaupause

Stand: 2026-07-22 11:00 | Session: css-architektur-formalisierung-c1 | Geändert von: Claude

**Status:** Strategischer Sollstand fuer `prokrastinations-preis` und die folgenden Apps.  
**Bindende Grundlage:** `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` und `docs/spec/Der Rucksack (Context Object Pattern).md`.

## 1. Eine technische App-Familie

Ein Chart ist technisch eine App: Er wird per Ghost-Card gestartet, laedt validierte Daten, versiegelt sie im Vault, steuert einen Render-Zyklus, baut einen request-scoped Context und rendert ueber Strategie, Renderer und Plugins.

Die Chart-Migration ist deshalb die bereits bewiesene Blaupause. `prokrastinations-preis` ist keine Gegenarchitektur, sondern eine **Chart-App mit zusaetzlicher Domain-Schicht**.

Die zwei bestehenden Card-Formen bleiben vorerst als Redakteursadapter erhalten:

| App-Ausprägung | Bestehende Card | Technischer Kern |
|---|---|---|
| Standalone-Chart | `financial-chart-module` + `data-app-file="abc.csv"` | ChartEngine-App |
| Interaktive App | `fw-app` + `data-fw-*` | App-Modul, bei Chartbedarf mit ChartEngine-Bridge |

Das ist kein zweites technisches System. Die getrennten Card-Namen sichern Bestandsschutz und eine einfache Redaktion; darunter gelten dieselben Daten-, Sicherheits- und Renderregeln.

## 2. Gemeinsame Pipeline

```text
Ghost-Card: nur kanonische Dateinamen und whitelisted Optionen
  -> fester Pfad /content/files/app-data/<dateiname>
    -> Parser + unveränderlicher Daten-Vault
      -> Manager/Domain-Strategie
        -> request-scoped Context-Rucksack
          -> Renderer, ChartEngine und Plugins
```

Der Chart-Pfad endet nach dem Chart-Rucksack (`fwContext`). Die Prokrastinations-App besitzt davor einen fachlichen Rucksack (`AppContext`): Sie verbindet validierte CSV-Daten, validierte Stationsdaten und Nutzereingabe zu Berechnung, Screen-State und `chartSeries`.

```text
CSV-Vault + JSON-Vault + Nutzereingabe
  -> MarketTimeStrategy
    -> unveränderlicher AppContext
      -> ChartEngine.renderFromData(chartSeries, Optionen)
        -> ChartEngine-Strategie erzeugt fwContext
          -> Line-Renderer und vorhandene Plugins
```

`AppContext` und `fwContext` sind geschachtelte, getrennte Rucksäcke. Keiner schreibt in einen Vault zurueck; Plugins lesen nur ihren Render-Context.

## 3. Datenklassen

| Klasse | Laufzeitdaten | Umsetzung |
|---|---|---|
| A0 | keine | Nutzereingabe -> AppContext -> DOM-Renderer |
| A1-C | CSV | Dateiname -> CSVParser -> FinanzwesirData -> App/Chart |
| A1-J | JSON | Dateiname -> JSONParser -> FinanzwesirJsonData -> App |
| A2-CJ | CSV + JSON | beide Vaults -> Domain-Strategie -> AppContext -> ChartEngine |

`prokrastinations-preis` ist A2-CJ. Seine CSV geht durch den vorhandenen `CSVParser`; sein JSON geht durch den als Geschwisterdatei gebauten `JSONParser`. Beide Card-Werte sind ausschliesslich Dateinamen. Der feste Ghost-Pfad wird zentral gebildet.

## 4. Was aus der Chart-Migration unveraendert uebernommen wird

1. Offline pruefen, danach nach `C:\Tools\ghost-local\site\content\files\app-data` kopieren; Produktion entspricht dem FTP-Transfer in den Ghost-Content-Pfad.
2. Card nennt nur den kanonischen Dateinamen; keine URL, kein Inline-JSON.
3. Laufzeit-Validierung und unveränderlicher Daten-Vault sind Pflicht, auch nach erfolgreicher Offline-Pruefung.
4. Unidirektionaler Datenfluss und Error Boundary: Fehler einer Card lassen die Page intakt.
5. Design-Hoheit bleibt beim Theme: Tokens und Tailwind fuer die DOM-App; ChartEngine liest Theme-Tokens fuer Canvas und eigenen Chrome.
6. Strategien enthalten Fach- und Darstellungssemantik, nicht DOM-/Tailwind-Rezepte. Plugins kapseln ihre Speziallogik.
7. Der Rucksack ist request-scoped und unveränderlich; bei Resize ist nur die dynamische Schale flüchtig.

## 5. Das einzige neue Delta

JSON ergaenzt die Chart-Blaupause, ersetzt sie nicht:

```text
JSONParser.js                 Klon von CSVParser.js
FinanzwesirJsonData.js        Gegenstueck zum CSV-Vault
parseJsonText(text, config)   Gegenstueck zu parseCsvText()
options.validator             App-spezifische Schema-/Wertebereichspruefung
```

Der JSONParser uebernimmt API-Form, URL-Gate, Fetch, HTTP-Fehler, Fehlerpfad und Teststruktur vom CSVParser. Nur Format-Parsing, Validator und rekursives Einfrieren unterscheiden sich. Es gibt keinen Universalparser und keinen neuen Backend-Weg.

## 6. Migrationsablauf

1. **Chart-Blaupause feststellen:** Fuer jede App zuerst Datenklasse A0/A1-C/A1-J/A2-CJ und vorhandene ChartEngine-/Plugin-Nutzung bestimmen.
2. **Daten migrieren:** CSV unveraendert durch den bestehenden CSV-Weg; JSON durch den parallelen JSON-Pruef- und Transferweg.
3. **Vault pruefen:** Parser, Datencontainer, Error-/Empty-State und Test-Fixtures vor UI-Migration nachweisen.
4. **App-Modul migrieren:** Domain-Strategie baut aus Vaults und Nutzereingabe den AppContext; Chartteile laufen ausschliesslich ueber `ChartEngine.renderFromData()`.
5. **Theme integrieren:** Tailwind-Scan erfasst das App-Modul; Spezial-CSS bleibt auf echte Animationen/Overlays begrenzt.
6. **Ghost nachweisen:** Card, beide Dateien, vier Screen-Zustände, Tastatur, Mobile, Reduced Motion und Browser-Konsole pruefen.
7. **Erst nach dem Pilot standardisieren:** Aus bewiesenen Deltas eine knappe Checkliste fuer A0, A1-C, A1-J und A2-CJ ableiten.

## 7a. Runtime-Grenze (SEC-04/SEC-05, `01_DECISION_LOG.md`) — Wiederholungsregel fuer kuenftige Apps

Fuer jede migrierte oder neu gebaute `fw-app` gilt dieselbe Ablage-Grenze:

```text
Apps/{slug}/                        Fach-/Testakte
  APP_SPEC.md, Testseite, Testdaten/Uebergangs-Fixtures
  keine produktive app.js

Theme/assets/js/apps/{slug}.js      einzige produktive Runtime
Theme/assets/js/apps/index.js       einziger Bootstrapper-Einstieg, literale Registry
```

`prokrastinations-preis` ist der erste umgesetzte Registry-Eintrag (Pilot). Jede weitere App
erweitert dieselbe literale Registry um einen weiteren Slug-Eintrag — kein zweiter Bootstrapper,
kein zweiter Codepfad, keine Kopie der Runtime unter `Apps/`.

## 7b. CSS-Migrations-Gate (D-CSS-04, `01_DECISION_LOG.md`)

Eine App-Runtime gilt erst als **ins Theme migriert**, wenn zusätzlich zur Runtime-Grenze (§7a) alle vier CSS-Nachweise vorliegen:

1. Jede von ihr gesetzte Nicht-Tailwind-Klasse und jede gelesene lokale `--fw-*`-Property ist in einer vom Theme ausgelieferten CSS-Quelle definiert.
2. Die reale Runtime wird von der Tailwind-`@source`-Liste erfasst; ein frischer Build enthält die benötigten Utilities.
3. Die lokale CSS-Mechanik ist auf eine literale App-Wurzel begrenzt; `Apps/{slug}` enthält keine zweite aktuelle CSS-Wahrheit.

Die drei später zu bauenden maschinellen Gates dafür heißen Quellen-Existenz, Utility-Deckung und Mechanik-Parität (noch nicht gebaut, diese Regel baut sie nicht).

4. Die sichtbare Abnahme erfolgt in einer **Ghost-nahen Umgebung**: Artikelkontext, produktives `screen.css`, kein Play-CDN.

**Klare Trennung zweier Prüfungen:**

- **Strukturelle App-Testseite** (`Apps/{slug}/app.test.html`, Play-CDN, kein `.gh-content`-Kontext): schneller App-/DOM-Test, prüft Funktion und Struktur — beweist aber nichts über die Ghost-Kaskadengrenze oder das produktive CSS-Artefakt.
- **Ghost-nahe Sichtabnahme** (lokales Ghost, Artikelkontext, gebautes `screen.css`, kein CDN): einzige Umgebung, in der Punkt 4 erfüllt werden kann.

„Grün auf `app.test.html`" ersetzt die Ghost-nahe Sichtabnahme nicht und umgekehrt. Keine Testinfrastruktur wird durch diese Regel neu gebaut.

## 7. Konsequenz fuer die Arbeitspakete

Der erste Claude-AP ist kein allgemeiner App-Framework-Bau. Er prueft nur den Chart-Blaupausen-Abgleich fuer `prokrastinations-preis`: bestehende Chart-Bridge, AppContext/fwContext-Grenze, CSV-Dateiname, Stations-JSON, Validator, Theme-Asset-Ziel und reale Tests.

**Realer Pilot-Gap und verbindliches Migrationsdelta:** `buildAppContext()` erzeugt derzeit ein neues Objekt, friert es aber noch nicht ein. Fuer die Migration wird sein statischer, aus Vaults und Nutzerwerten berechneter Kern tief eingefroren. Flüchtiger Screen-, Fokus- und Animationszustand bleibt im Controller ausserhalb des AppContext. Diese Reparatur ist Teil der Produktivmigration.

Ockhams Rasiermesser: Bestehende Chart-Engine, Parser, Vault, Context-Pattern und Plugins werden wiederverwendet.  
Via Negativa: Kein zweiter Render-Stack, kein Ersatz-Chart, kein Backend, keine allgemeine App-Plattform und keine Umbenennung bestehender Chart-Cards.
