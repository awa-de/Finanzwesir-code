# Migrationsstrategie Ghost-Apps V1

**Pilot:** `prokrastinations-preis`  
**Ziel:** Ein belastbarer Migrationsweg fuer die 25 weiteren Apps, ohne vor dem ersten echten Pilot unnoetig eine zweite Plattform zu bauen.

## 1. Architektur

### Ursache

Ghost liefert Pages und Theme-Assets aus, ist aber keine App-Laufzeit und kein Datenpruefer. Ohne einen kleinen gemeinsamen Einstieg entstehen pro App eigene Script-Einbindungen, eigene Datenpfade und voneinander abweichende Ghost-Cards.

Der Pilot besitzt bereits zwei Datenfeeds:

- MSCI-Zeitreihe als CSV fuer Berechnung und Chart;
- Stationsbibliothek als JSON fuer redaktionelle Haltepunkte.

Der aktuelle Abruf `fetch('config/stations.de.json')` ist relativ zur aktuellen Page-URL. Auf einer Ghost-Page wird daraus beispielsweise `/prokrastinations-preis/config/stations.de.json`; die Datei liegt dort nicht. Dieser Pfad darf nicht in die produktive Migration uebernommen werden.

### Muster und Systemgrenzen

```text
Ghost HTML-Card (untrusted data-attribute)
  -> Theme: fw-app Bootstrapper + feste Slug-Registry
    -> App-Modul: Fachlogik, State, Rendering
      -> CSVParser / JSONParser: laden und validieren
        -> /content/files/app-data/*.csv|*.json
```

| Schicht | Verantwortet | Verantwortet nicht |
|---|---|---|
| Ghost-Card | App-Slug, Feed-Dateinamen, kleine whitelisted Overrides | Code, freie URLs, freies JSON, Secrets |
| Bootstrapper | bekannte Slugs finden, nur bekannte Module laden, Doppelstart verhindern | App-Fachlogik |
| App-Modul | Schema, Berechnung, UI, A11y, Error/Empty | globales Scannen fremder Apps |
| Dateninfrastruktur | Dateinamen-Gate, feste Pfadauflösung, CSV-/JSON-Parsing, unveränderlicher Container | fachliche Reparatur von Daten |
| app-data | freigegebene CSV/JSON-Dateien | Theme-Code |

### Annahmen und Festlegungen

1. `fw-app` bleibt der einzige Vertrag fuer interaktive Apps; `financial-chart-module` bleibt unveraendert.
2. Es werden keine neuen HTML-Attribute erfunden. Der vorhandene Vertrag reicht aus:

   | Datenklasse | Ghost-Card |
   |---|---|
   | keine externen Daten | `data-fw-app` |
   | eine CSV | `data-fw-app` + `data-fw-data` |
   | eine JSON | `data-fw-app` + `data-fw-config` |
   | CSV und JSON | beide Attribute |

3. Produktive Dateien liegen gemeinsam unter `/content/files/app-data/`; die Card enthält ausschliesslich kanonische Dateinamen. Der App-Datenadapter validiert den Namen und bildet erst danach zentral den festen Pfad. Das entspricht dem gehärteten `data-app-file`-Weg der Chart-Engine.
4. JSON bleibt Daten. `JSONParser` wird als struktureller Klon von `CSVParser` gebaut: identische öffentliche Form (`parse(url, options)` und `parseJsonText(text, config)`), identisches URL-Gate, derselbe Fetch-/HTTP-/Fehlerablauf und ein tief eingefrorener Datencontainer als Rueckgabe. Alle Renderer lesen nur aus diesem Container.
5. Unterschiedlich bleiben ausschliesslich das Textformat und die fachliche Prüfung: `parseJsonText()` verwendet `JSON.parse()`; die konkrete Schema- und Wertebereichsprüfung kommt als `options.validator` von der App. Es entsteht kein allgemeines JSON-Schema-Framework und keine zweite, frei erfundene Loader-Architektur.
6. `CSVParser.js` und `JSONParser.js` bleiben zwei spezialisierte Geschwisterdateien, nicht ein verzweigter Universalparser. Beim aktuellen 169-Zeilen-CSVParser sind voraussichtlich rund 30-40 Zeilen (ca. 20 %) wortgleich kopierbar: API-Hülle, URL-Gate, Fetch, HTTP- und Fehlerpfad. Weitere ca. 60-70 % sind strukturgleich, aber formatbedingt anders. Der Textkern bleibt bewusst getrennt. `FinanzwesirJsonData` kopiert den unveränderlichen Containervertrag; bei verschachtelten JSON-Werten friert er rekursiv ein.

Die CSV-Veröffentlichung bleibt exakt der vorhandene Chart-Weg: `content/files/app-data` -> `pruefe-csv.bat` -> lokaler Ghost-Content bzw. FileZilla -> statische Auslieferung. Nur das Attribut ist anders: `data-app-file` gehoert zum deklarativen `financial-chart-module`; die App braucht `data-fw-data`, weil sie die CSV zuerst fachlich verarbeitet und die resultierende Datenreihe erst danach ueber `ChartEngine.renderFromData()` an die Chart-Engine und ihre Plugins uebergibt. Beide Werte sind nur Dateinamen, nie URLs.

## 2. Ziel-Card fuer den Pilot

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis"
     data-fw-data="msci-world-net-return-eur-monthly.csv"
     data-fw-config="prokrastinations-preis-stations.de.json"
     data-fw-options="defaultRate:300">
</div>
```

`data-fw-options` bleibt auf die bestehende Whitelist `defaultRate`, `startBetrag` begrenzt. Die Card enthaelt weder inline JSON noch App-Script-Tags.

## 3. Sicherheits- und Dateninvarianten

- Der Bootstrapper bildet keine Script-URL aus `data-fw-app`; er verwendet ausschliesslich eine feste Registry.
- Jede Card wird genau einmal initialisiert. Ein Fehler einer Card beschaedigt die Page oder eine zweite Card nicht.
- `data-fw-data` und `data-fw-config` akzeptieren nur kanonische Dateinamen (`.csv` bzw. `.json`) und werden vor `fetch()` ausschliesslich zu `/content/files/app-data/<dateiname>` aufgeloest.
- CSV nutzt unveraendert den gemeinsamen `CSVParser`; die geschuetzte Parser-Infrastruktur wird nicht fuer den Pilot umgebaut.
- JSON muss parsbar sein und den app-spezifischen Pflichtfeldern, Typen und Wertebereichen genuegen. Kein stiller Ersatz von Stationsdaten.
- Nutz-, Config- und Optionswerte erreichen den DOM nur via `textContent` bzw. sichere DOM-APIs.
- Unbekannte Slugs, ungueltige Quellen und ungueltige Daten enden in einem deutschen Error-State, nicht im Crash.
- Jede produktive Feed-Datei besitzt genau eine Quelle im `content`-Repository. Nach dem Pilot darf keine zweite produktive `stations.de.json` im App-Ordner weiter gepflegt werden.

## 4. Arbeitspakete fuer Claude

| AP | Klasse | Ziel und erlaubtes Ergebnis | Todeszone / Beweis |
|---|---|---|---|
| GAPP-00 | C | Anamnese und Vertrags-Gate: Ist/ Soll fuer Theme, App, Content, Card und Security synchronisieren; `data-fw-data`/`data-fw-config` von URL- auf Dateinamenvertrag nachziehen; keine Implementierung. | Keine neue Semantik oder implizite Sicherheitsentscheidung. Befund gegen reale Dateien, explizite Entscheidungsvorlage. |
| GAPP-01 | C | Gemeinsamen Theme-Bootstrapper mit fester Slug-Registry bauen; `prokrastinations-preis` als einziges registriertes Modul. | Kein Import aus Card-Input, kein doppelter Start, kein Einfluss auf Chart-Engine. Test unbekannter Slug, zwei Cards, kein Card-Fund. |
| GAPP-02 | B | Den vorhandenen `CSVParser` 1:1 als `JSONParser`-Geschwisterstruktur nachbilden: gleiche API-Form, URL-Gate, Fetch-/HTTP-Fehlerpfad, Textkern, Container und Teststruktur. Der kleine Dateinamen-Resolver bildet vor beiden Parsern ausschliesslich `/content/files/app-data/<dateiname>`. JSON-spezifisch sind nur `JSON.parse()`, `options.validator` und `FinanzwesirJsonData`. | Keine Änderung am geschützten `CSVParser`, keine automatische Datenkorrektur, keine Card-URLs oder fremden URLs, keine HTML-Ausgabe. Tests jeweils paarig zu CSV plus JSON-Syntax-, Schema- und Änderungsversuch-Test. |
| GAPP-03 | B | Pilotmodul und sein CSS in Theme-Assets ueberfuehren; Modul exportiert einen lokalen Mount statt selbst global zu bootstrappen. CSV aus `data-fw-data`, Stationen aus `data-fw-config`. Tailwind-Content-Scan muss die migrierten App-Module erfassen; eigenes CSS bleibt auf nicht mit Utilities ausdrueckbare Animationen und Chart-Overlays begrenzt. | Keine Aenderung an CSVParser/ChartEngine; kein relativer Stationspfad; AppContext und Dramaturgie bleiben erhalten. Lokale Testseite vollstaendig nachlesen. |
| GAPP-04 | B | Stations-JSON als einzige produktive Quelldatei in `content/files/app-data` veroeffentlichungsfaehig machen und schema-pruefen. | Kein zweiter Wahrheitsort, keine redaktionelle Erfindung. Deterministischer Validator, gueltig/ungueltig-Fixtures. |
| GAPP-05 | B | Ghost-Page lokal integrieren: Theme bauen/hochladen, CSV und JSON in Ghost-Content kopieren, Ziel-Card einsetzen. | Kein direkter Kopiervorgang in aktiven Theme-Ordner. Browsernachweis fuer alle vier Screens, Fehlerfaelle und zwei Cards. |
| GAPP-06 | B | Redaktions- und Rolloutstandard aus dem bewiesenen Pilot ableiten: HTML-Card-Cheat-Sheet, Datenworkflow und App-Migrations-Checkliste. | Keine Prozessplattform erfinden. Jeder Schritt muss sich auf einen Pilotnachweis beziehen. |

Nach jedem AP: Datei-Wahrheit erneut lesen, Scope-Diff pruefen, nur die risikogerechte Evidenz berichten. Der naechste AP startet erst nach fachlicher Freigabe.

## 5. Qualitaetsnachweise

1. **Statisch:** Registry, Dateinamen-Gate, Options-Whitelist, kein `innerHTML` fuer Daten, kein relativer JSON-Produktivpfad.
2. **Automatisiert:** gueltige und ungueltige CSV-/JSON-Fixtures, unbekannter Slug, Doppelinitialisierung, zwei App-Container.
3. **Lokal in Ghost:** Card mit beiden Datenfeeds, Screens 1 bis 4, Mobile, Tastatur, `prefers-reduced-motion`, Browser-Konsole leer.
4. **Betrieb:** CSV und JSON nach dem Offline-Pruef-/Transferweg erreichbar; Theme-Update beruehrt die Daten nicht.
5. **Redaktion:** Ein Redakteur kann die Card anhand einer einzigen Vorlage einsetzen und erkennt, welche Datei bei einer Datenaktualisierung zu pruefen bzw. zu uebertragen ist.

## 6. Aufwand

Ockhams Rasiermesser: Der vorhandene `fw-app`-, `data-fw-data`- und `data-fw-config`-Vertrag wird genutzt, nicht ersetzt. Ein Bootstrapper, ein kleiner App-Datenadapter und ein Pilotmodul reichen als erste gemeinsame Infrastruktur.

Via negativa: Kein Backend, kein Ghost-Admin-Plugin, kein iframe, kein freies JSON in Cards, keine neue Datenbank, kein universelles Schema-System, kein Umbau des geschuetzten CSV-Parsers und kein Rollout auf 25 Apps vor dem lokalen Ghost-Nachweis des Piloten.

## 7. Startpunkt

Als naechster Auftrag an Claude wird ausschliesslich **GAPP-00** geschnitten. Er klaert die reale Zielablage, die zu aendernden Vertragsdateien und die Tests vor jeder Schreibarbeit. Erst sein Befund entscheidet den exakten Write-Scope von GAPP-01 bis GAPP-05.
