# Rechercheauftrag – geprüfte CSV-App-Daten in Ghost redaktionell verwalten

## Zweck der Recherche

Bewerte, wie Redakteure CSV-Dateien für interaktive Chart-Module in Ghost zuverlässig hochladen und verwalten können. Gesucht ist eine updatefähige, von Ghost unterstützte Lösung für lokale Entwicklung und einen späteren Web-Server-Betrieb.

Es geht **nicht** um die Gestaltung von Charts, um Ghost-Pages oder um die Auswertung der CSV im Browser. Es geht ausschließlich um den sicheren redaktionellen Weg von einer lokalen CSV-Datei in den öffentlich lesbaren, aber zuvor geprüften Datenbestand der Website.

## Ausgangslage

- Ghost läuft lokal unter Windows 11 in `C:\Tools\ghost-local\site`; später soll dieselbe Website auf einem Web-Server laufen.
- Ghost-Pages enthalten HTML-Cards mit Chart-Modulen. Die Chart-Engine lädt ihre CSV im Browser per HTTP und wandelt sie dort erneut in ein unveränderliches `FinanzwesirData`-Objekt um.
- Chart-Daten sollen später über einen stabilen relativen Namen referenziert werden, zum Beispiel:

  ```html
  <div class="financial-chart-module"
       data-app-file="acwi-world.csv"
       data-type="line">
  </div>
  ```

  Die Chart-Engine soll daraus zentral eine URL unter `/content/files/app-data/acwi-world.csv` bilden. Der endgültige `data-app-file`-Adapter ist noch nicht implementiert.

- Ghost liefert Dateien unter seinem Content-Pfad statisch aus. Der gewünschte Datenordner ist lokal `C:\Tools\ghost-local\site\content\files\app-data`; öffentlich entspricht das `/content/files/app-data/<dateiname>.csv`.
- Diese CSV-Dateien sind absichtlich öffentlich lesbar, denn der Browser braucht sie zum Zeichnen der Charts. Sie sind nicht als geheime Daten gedacht.

## Fachlicher Sicherheitsvertrag

Nur CSV-Dateien, die den Finanzwesir-Parser bestanden haben, dürfen im App-Datenordner landen:

```text
Datei wählen
→ Upload-Eingang
→ serverseitige Parser-Prüfung und Transport-Normalisierung
→ nur akzeptierte CSV atomar speichern
→ Ghost liefert die Datei statisch aus
→ Browser-Parser baut erneut den FinanzwesirData-Tresor
```

Die Prüfung darf nicht nur im Browser stattfinden, weil Browser-Logik umgangen werden kann.

Für die Datenform ist keine automatische Heuristik erlaubt:

- Zeitreihe für Linie und Balken: Datum erforderlich (`expectDate: true`);
- Snapshot für Torte/Donut: Kategorie in Spalte 1 zulässig (`expectDate: false`).

Der bestehende Bar-Vertrag ist bewährt und darf nicht verändert werden.

## Warum Ghosts normale File-Card nicht genügt

Über Ghost Admin kann eine CSV aktuell über „File“ hochgeladen werden. Ghost erzeugt daraus jedoch eine sichtbare Download-Card im Beitrag bzw. auf der Page. Das ist für Dokument-Downloads richtig, aber nicht für Hintergrunddaten eines Chart-Moduls.

Zudem braucht der gewünschte Ablauf:

- serverseitige Parser-Prüfung vor Veröffentlichung;
- festen Ordner `files/app-data` statt Ghosts normaler Dateiablage;
- stabile, redaktionell gewählte Dateinamen;
- atomisches Ersetzen statt stiller URL-Änderung;
- keine sichtbare File-Card.

## Bereits existierender lokaler Prototyp

Es existiert bereits ein eigenständiger Node-22-Upload-Dienst unter `tools/upload-dienst/`:

- eigene Oberfläche auf `http://127.0.0.1:4790/`;
- schreibt nur nach erfolgreicher Parser-Prüfung nach `content/files/app-data`;
- bindet ausschließlich an `127.0.0.1`;
- verwendet denselben textbasierten Parser-Kern wie die Browser-Chart-Engine;
- unterstützt Zeitreihe/Snapshot, Dateinamenprüfung, Konflikt/ausdrückliches Ersetzen, Temp-Dateien und atomaren Wechsel;
- verändert weder Ghost-Core noch Theme.

Der Prototyp soll nicht blind als Produktionslösung vorausgesetzt werden. Seine offene Produktfrage ist die redaktionelle Integration: Ein Redakteur arbeitet in Ghost Admin, der Uploader liegt jedoch auf einer separaten lokalen URL und würde auf einem Web-Server ebenfalls als separater Dienst laufen.

## Harte Grenzen

- Ghost-Core darf nicht verändert werden.
- Keine Änderung oder Neu-Kompilierung von Ghost Admin, keine Patch-Dateien gegen Ghost.
- Das Theme bleibt ein statisches Auslieferungsartefakt; CSV-Änderungen dürfen keinen Theme-Build oder Theme-Upload erfordern.
- Keine sichtbare Ghost-File-Card als Nebenprodukt.
- Keine Schreibberechtigung oder API-Schlüssel im Browser.
- Keine ungesicherte öffentliche Upload-URL auf dem Produktionsserver.
- Keine Docker-, Cloud- oder Plugin-Lösung nur um der Technik willen.
- Der bestehende CSVParser, die Bar-Semantik sowie Line- und Pie-Tests sollen nicht unnötig verändert werden.

## Kernfrage

Wie sollte der Upload-Dienst in den Redaktionsablauf integriert und auf einem Web-Server betrieben werden, ohne Ghost-Core oder Ghost Admin zu verändern und ohne eine zweite, vom Browser abweichende Parser-Implementierung einzuführen?

## Zu untersuchende Varianten

Bewerte mindestens diese Varianten anhand offizieller Ghost-Dokumentation und, falls nötig, des aktuellen Ghost-Quellcodes:

1. Eigenständiger Upload-Dienst auf demselben Server wie Ghost, durch Reverse Proxy unter einer geschützten Redakteurs-URL erreichbar.
2. Ghost Custom Integration / Admin API: Kann sie den gewünschten Parser-, Zielordner- und unsichtbaren Datenablauf sauber erfüllen, ohne Schlüssel im Browser und ohne sichtbare File-Card?
3. Ghost Storage Adapter: Eignet sich dieser Mechanismus für genau diesen begrenzten App-Daten-Pfad, oder ersetzt/verändert er Ghosts allgemeine Dateiverwaltung zu weit?
4. Einbettung in Ghost Admin, Theme oder eine Ghost-Page: Welche davon sind technisch unterstützt, upgradefähig und sicher? Welche sind aus welchem konkreten Grund auszuschließen?
5. Falls ein externer Dienst richtig ist: Wie sieht der minimal nötige Produktionsbetrieb aus (Prozess, Zugriffsschutz, Reverse Proxy, gleicher Content-Speicher, Konfiguration, Updates)?

## Erwartete Antwort

Liefere keine Implementierung und ändere keine Dateien.

Erwarte stattdessen:

1. Eine klare Empfehlung mit begründetem Architekturdiagramm.
2. Vergleichstabelle der Varianten: Updatefähigkeit, Sicherheit, Redaktionskomfort, Betriebsaufwand, Eignung für lokalen Betrieb und Produktionsserver.
3. Belege mit direkten Links zu offiziellen Ghost-Quellen; Annahmen und nicht belegte Punkte ausdrücklich markieren.
4. Eine präzise Antwort, ob und wie eine eigene Upload-Oberfläche **innerhalb** von Ghost Admin möglich ist. „Custom Integration“ und „eigene Admin-Oberfläche“ dabei nicht gleichsetzen.
5. Einen minimalen, konkreten Ablauf für Redakteure lokal und auf dem Produktionsserver.
6. Eine Empfehlung, welche bestehenden Prototyp-Teile weiterverwendet werden und welche Anpassungen vor Produktion zwingend wären.
