---
chronik_id: CHRONIK-2026-07-20-ghost-statische-seiten-csv-app-daten
datum: 2026-07-20
projekt: finanzwesir-2-0
thema: ghost-statische-seiten-csv-app-daten
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [missverstandene-anforderung, praezisierung-durch-gegenfrage, richtungswechsel, sackgasse, annahme-verworfen, konzept-vs-umsetzung, tooling-problem]
---

# Chronik: Ghost-Seitentypen und CSV-App-Daten

**Hauptgegenstand:** Der Faden behandelte die lokale Ghost-Installation, statische Pages, die Einbindung der Chart-Engine und den Weg geprüfter CSV-Dateien in produktive Chart-Cards. Der Arbeitsstand wechselte von einem HTTP-Upload-Dienst zu einem lokalen Offline-Prüfer mit manuellem FileZilla-Transfer.

## Ausgangslage

Der Nutzer beschrieb `C:\Tools\ghost-local` als lokale Ghost-Instanz. Inhalte lagen im Finanzwesir-Repository. Zunächst sollten Impressum und Datenschutz als statische Pages erscheinen. Die künftige Website sollte aus Homepage und statischen Pages bestehen; klassische Posts sollten keine redaktionelle Rolle erhalten.

Später wurde eine Ghost-Page `/index-vergleich/` angelegt, auf der Chart-Module mit CSV-Daten erscheinen sollten.

## Chronologischer Verlauf

### Statische Pages und Theme-Fundament

Zu Beginn wurde untersucht, wie Ghost Pages rendert und wie Header, Footer und Fließtext im Theme zusammenspielen. Die Diskussion über `prose`, Tailwind-Utilities und einen eigenen CSS-Namespace führte zu einer Korrektur des Ansatzes: Ghost-generiertes semantisches HTML erhielt keine Tailwind-Klassen; CI-Schrift und -Farben wurden daher über begrenzte semantische Regeln ergänzt, während Tailwind Layout und Raster bereitstellte.

Ein erster Theme-Auftrag stoppte vor Änderungen, weil der Prompt eine falsche Arbeitskopie annahm. Die tatsächliche Quelle lag unter `Theme/`, während `C:\Tools\ghost-local\site\content\themes\...` ein Deployment-Spiegel war. Daraus entstand bzw. wurde die Betriebsdokumentation `docs/steering/theme-build/GHOST-LOKALBETRIEB.md` als Pflichtquelle hervorgehoben.

`page.hbs`, Footer und Content-Regeln wurden danach angepasst. Impressum und Datenschutz wurden als Ghost-Pages angelegt; die Footer-Links führten nach dem Anlegen der Slugs nicht mehr auf 404-Seiten.

### Chart-Engine auf Pages

Die Chart-Engine war zunächst auf Posts ausgerichtet. Für die Page `/index-vergleich/` wurde die Theme-Einbindung erweitert. Ein Theme-ZIP wurde über Ghost Admin hochgeladen; direkte Kopien in den aktiven Theme-Ordner wurden ausgeschlossen.

Die erste Chart-CSV wurde über Ghosts File-Card hochgeladen. Die veröffentlichte Card zeigte den erwarteten Download-Block. Die URL war technisch nutzbar, die sichtbare File-Card entsprach aber nicht dem gewünschten Hintergrunddatenweg. Die Karte wurde wieder gelöscht.

### Erster App-Daten-Entwurf: lokaler HTTP-Dienst

Als Datenordner wurde `content/files/app-data` festgelegt. Zunächst entstand die Architektur eines lokalen HTTP-Upload-Diensts: Browser-Dateiauswahl, serverseitiger Parser, atomarer Speicherwechsel und statische Ghost-Auslieferung.

APP-DATA-00 verglich Strategiepapier, Parser, ChartEngine und Tests. Der Bar-Vertrag blieb dabei unverändert: `bar` verwendet `expectDate: true`. `data-csv` wurde als Fixture-Adapter der Testseiten eingeordnet.

APP-DATA-01 formulierte den Dienstvertrag. APP-DATA-02 extrahierte `parseCsvText()` aus `CSVParser.js`, sodass Browser-Chart und Node-Prozess denselben textbasierten Parser-Kern nutzten. Der Dienst auf Port `4790` wurde gebaut und gegen lokale Ghost-Dateien geprüft.

Während der Prüfung wurden offene Punkte sichtbar, darunter UTF-8- und Größenlimit-Verhalten des Diensts. Parallel wurde die Frage gestellt, wie ein solcher Dienst in Ghost Admin und später auf einem Web-Server erscheinen solle. Ghost Custom Integrations wurden als externe API-Integration eingeordnet, nicht als Plugin-Fläche für eigene Admin-Panels.

### Richtungswechsel zum Offline-Prüfer

Der Nutzer verwarf den HTTP-Dienst als Redaktionsweg. Festgelegt wurde stattdessen:

```text
CSV lokal prüfen
→ bei GRÜN mit FileZilla übertragen
→ Ghost liefert die Datei aus
→ Chart-Card referenziert die Datei
```

Für die lokale Entwicklung sollte das FileZilla-Ergebnis durch Kopieren nach `C:\Tools\ghost-local\site\content\files\app-data\` simuliert werden. Ghost sollte weder den lokalen Prüfvorgang noch den Transfer kennen.

Der Parser-Kern blieb bestehen. Er wurde für den neuen Offline-Prüfer wiederverwendet, statt zu einer älteren Parser-Version zurückzukehren.

APP-DATA-03a legte `content/files/app-data/` mit `pruefe-csv.bat`, Prüflogik und Zustandsdatei an. Der Prüfer kanonisierte Namen mit Kleinschreibung sowie `ä→ae`, `ö→oe`, `ü→ue`, `ß→ss`, berechnete SHA-256-Werte und übersprang unveränderte CSV-Dateien.

Die ursprünglich vorgesehene manuelle `dataForm`-Zuordnung in JSON wurde nach einem Doppelklick-Test verworfen. Der Prüfer bestimmte die Datenform durch Prüfung gegen Zeitreihen- und Snapshot-Interpretation. Der Bericht hielt die erkannte Form fest.

Nach der Abnahme des Offline-Prüfers wurde APP-DATA-03b ausgeführt. Der Prozess auf Port `4790` wurde gezielt beendet; die Dateien des HTTP-Diensts wurden entfernt. Ein leeres Verzeichnis blieb wegen eines Windows-Handles bestehen. Der Offline-Prüfer und die Parser-Quelle blieben unangetastet.

### `data-app-file` als produktive Card-Quelle

APP-DATA-04a legte den Card-Vertrag fest. `data-csv` blieb für Fixture-Testseiten erhalten. Produktive Cards sollten stattdessen `data-app-file` mit einem kanonischen Dateinamen verwenden.

APP-DATA-04b änderte `ChartEngine.js`. `data-csv` und `data-app-file` wurden gegenseitig exklusiv. `data-app-file="world-acwi-em.csv"` wurde gegen `^[a-z0-9_-]+\.csv$` geprüft und zu `/content/files/app-data/world-acwi-em.csv` aufgelöst. Parser-Aufruf und `data-type`-abhängige Semantik blieben danach unverändert.

Ein Theme-ZIP wurde ohne CSS-Build gebaut und über Ghost Admin aktiviert. Die Page `/index-vergleich/` lud eine zuvor offline geprüfte Datei mit `data-app-file="world-acwi-em.csv"`.

## Wendepunkte

- Die Annahme einer eigenständigen Arbeitskopie unter `C:\Tools\ghost-local` wurde durch den Nachweis des Theme-Quell- und Spiegelpfads ersetzt.
- Die Verwendung von `prose` und eines `fw-page`-Namespaces wurde nach der Designprüfung nicht weiterverfolgt.
- Ghosts sichtbare File-Card machte den Unterschied zwischen Download-Dokument und App-Datenquelle sichtbar.
- Der HTTP-Upload-Dienst wurde nach seiner Umsetzung durch den lokalen Offline-Prüfer und manuellen FileZilla-Transfer ersetzt.
- Die manuelle Datenform-Konfiguration wurde nach dem Praxistest durch automatische Erkennung ersetzt.
- `data-csv` wurde vom produktiven Card-Weg getrennt und als Fixture-Adapter behalten.

## Entscheidungen und Festlegungen

- Statische Ghost-Pages verwenden Header, Footer und einen ausbaubaren Content-Bereich. Status am Ende: gültig.
- Theme-Änderungen erfolgen in `Theme/`; lokale Ghost-Themes werden nur über Ghost Admin aktualisiert. Status am Ende: gültig.
- CSV-Dateien gehören nicht ins Theme. Status am Ende: gültig.
- Produktive CSV-Dateien liegen unter `content/files/app-data` und werden später unter `/content/files/app-data/<dateiname>.csv` ausgeliefert. Status am Ende: gültig.
- `data-app-file` ist die produktive Card-Quelle; `data-csv` bleibt Fixture-Infrastruktur. Status am Ende: gültig.
- Der HTTP-Upload-Dienst ist kein aktiver Weg mehr. Status am Ende: verworfen.
- Der Parser-Kern `parseCsvText()` bleibt als gemeinsame Quelle bestehen. Status am Ende: gültig.

## Irrwege, Schleifen und verworfene Ansätze

Der Ghost-File-Card-Upload wurde getestet und wieder entfernt, weil er eine sichtbare Download-Card erzeugte.

Ein lokaler HTTP-Upload-Dienst wurde geplant, implementiert und gegen Ghost getestet. Die Fragen nach Ghost-Admin-Einbettung, Produktionsbetrieb und Zugriffsschutz führten zur erneuten Prüfung des Redaktionswegs. Der Dienst wurde durch den Offline-Prüfer ersetzt und zurückgebaut.

Die manuelle Datenform-Zuordnung in `csv-contract.json` wurde zunächst vorgesehen. Nach dem ersten Doppelklick-Test wurde sie durch automatische strukturelle Erkennung ersetzt.

## Erzeugte Artefakte

- `GHOST-LOKALBETRIEB.md` – Theme-Quell-, Build- und Upload-Betrieb. Status am Ende: aktiv.
- Statische Page-Templates und Footer-Links – Ghost-Pages für Rechtliches und weitere Inhalte. Status am Ende: aktiv.
- `parseCsvText()` in `CSVParser.js` – gemeinsamer Parser-Kern. Status am Ende: aktiv.
- `content/files/app-data/pruefe-csv.bat` und Offline-Prüfer – lokale CSV-Prüfung. Status am Ende: aktiv.
- `data-app-file` in `ChartEngine.js` – produktive Card-Datenquelle. Status am Ende: aktiv.
- `CSV-APP-DATEN-WORKFLOW.md` – kanonische Betriebsdokumentation einschließlich „Sechs Monate später“. Status am Ende: aktiv.
- `tools/upload-dienst/` – lokaler HTTP-Dienst. Status am Ende: entfernt.

## Sachliche Erkenntnisse

Gesicherter Stand: Ghost liefert Dateien unter seinem Content-Pfad aus, ohne den Transferweg zu kennen.

Gesicherter Stand: Eine produktive Card benötigt mit `data-app-file` nur den kanonischen Dateinamen; der feste Pfad wird in der Chart-Engine ergänzt.

Gesicherter Stand: `line` und `bar` verwenden weiterhin `expectDate: true`; `pie` und `doughnut` verwenden `expectDate: false`.

Offene Parserfragen zu doppelten Headern und abweichender Spaltenzahl wurden nicht verändert.

## Offene Punkte am Ende

Keine offenen Punkte innerhalb des CSV-App-Datenwegs. Der Git- und Ablagestatus der Änderungen blieb bei Albert.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Der Faden wechselte mehrfach zwischen Architekturentwurf und Redaktionspraxis. Mehrere Anforderungen wurden erst nach lokaler Sichtprüfung präzisiert: semantisches Ghost-Markup, sichtbare File-Cards, Datenform-Zuordnung und Produktionsübertragung.

## Bewusst ausgelassen

Ausgelassen wurden wiederholte Tool-Aufrufe, ZIP-Prüfdetails, einzelne Prompt-Dateinamen ohne Folgewirkung sowie Formulierungsänderungen ohne Arbeitsstandsänderung.
