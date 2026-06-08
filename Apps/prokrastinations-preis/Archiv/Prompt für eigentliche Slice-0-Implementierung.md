Nutze das vorhandene Claude-Betriebssystem.

Arbeite nicht gegen bestehende Projektstrukturen.

Lösche nichts.

Erzeuge keine neuen Skills oder Commands.

Lege keine neuen Backlog-Dateien an.



Aufgabe:

Implementiere ausschließlich Slice 0 für:



/Apps/prokrastinations-preis/



Freigegebener Slice:

Slice 0 — App-Shell und Ghost-Card-Bootstrap.



Freigegebene Dateien:

\- /Apps/prokrastinations-preis/app.js

\- /Apps/prokrastinations-preis/app.css

\- /Apps/prokrastinations-preis/app.test.html



Nicht freigegeben:

\- keine APP\_SPEC-Änderung

\- keine RFC-Änderung

\- keine SECURITY-BASELINE-Änderung

\- keine APP-INTERFACE-Änderung

\- keine Chart-Engine-Änderung

\- keine Core-Extraktion

\- kein Framework

\- kein Build-System

\- kein Shadow DOM

\- keine Berechnung

\- keine Slider

\- keine externe Config

\- keine Dateien außerhalb /Apps/prokrastinations-preis/



Slice-0-Ziel:

\- app.test.html simuliert Ghost-Cards lokal

\- app.js erkennt .fw-app Container

\- data-fw-app wird geprüft

\- gültiger Slug zeigt einfachen Content-State-Platzhalter

\- ungültiger Slug zeigt Error-State

\- kein Container führt nur zu console.warn, keine User-Ausgabe

\- kein Stacktrace für Endnutzer

\- App-CSS ist auf .fw-app genamespaced

\- keine Nutzdaten via innerHTML



Pflicht-Test-Cards in app.test.html:

1\. Minimal-Card:

&#x20;  <div class="fw-app" data-fw-app="prokrastinations-preis"></div>



2\. Ungültiger Slug:

&#x20;  <div class="fw-app" data-fw-app="gibt-es-nicht"></div>



3\. Fehlender Slug:

&#x20;  <div class="fw-app"></div>



4\. Mehrere Container auf einer Seite:

&#x20;  mindestens zwei gültige .fw-app Container



5\. Options-XSS-Platzhalter:

&#x20;  data-fw-options mit offensichtlichem XSS-Testwert, auch wenn Slice 0 Options noch nicht fachlich verarbeitet.

&#x20;  Erwartung: wird nicht ausgeführt.



Sicherheitsregeln:

\- Alle data-\* Attribute sind untrusted input.

\- Kein innerHTML für Nutzdaten.

\- textContent / sichere DOM-APIs verwenden.

\- Ungültiger data-fw-app-Slug → Error-State.

\- Keine dynamischen Script-URLs aus Slug bauen.



Am Ende:

\- kurze Zusammenfassung

\- geänderte Dateien

\- wie Albert lokal testet

\- welche Akzeptanzkriterien erfüllt sind

\- welche Nicht-Ziele bewusst nicht umgesetzt wurden

\- Git-Diff zeigen

\- /patch-quittung vorbereiten

