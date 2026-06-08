Nutze das vorhandene Claude-Betriebssystem.

Arbeite nicht gegen bestehende Projektstrukturen.

Ändere keinen produktiven Code außerhalb des freigegebenen Slice.

Lösche nichts.

Erzeuge keine neuen Skills oder Commands.

Lege keine neuen Backlog-Dateien an.



Aufgabe:

Führe den Slice-0-Kickoff durch — noch ohne Code.



App:

&#x20;/Apps/prokrastinations-preis/



Slice:

&#x20;Slice 0 — App-Shell und Ghost-Card-Bootstrap



Kontext:

Vor jedem Code-Slice gilt ein Anti-Agreeableness-Gate:

1\. Annahmen offenlegen.

2\. Failure Cases zuerst benennen.

3\. 6-Monats-Regret benennen.



Noch kein Code schreiben.



Pflichtquellen:

\- /Apps/prokrastinations-preis/APP\_SPEC.md

\- /Apps/prokrastinations-preis/SPEC\_GATE\_REPORT.md

\- /Apps/prokrastinations-preis/SLICE\_PLAN.md

\- docs/steering/audits/SECURITY-BASELINE.md

\- docs/spec/APP-INTERFACE.md

\- docs/App-Fabrik/APP\_FACTORY\_IMPLEMENTATION\_RFC.md

\- docs/App-Fabrik/04\_CLAUDE\_WORKFLOW\_DRAFT.md



Arbeitsauftrag:



1\. Annahmenliste

Liste jede Annahme, die Du für Slice 0 machst.



Mindestens prüfen:

\- Welche Dateien dürfen angelegt werden?

\- Welche Dateien dürfen nicht geändert werden?

\- Welche App-Funktion ist in Slice 0 ausdrücklich nicht enthalten?

\- Wie wird lokal getestet?

\- Welche CSS-Strategie gilt?

\- Welche Sicherheitsregeln gelten?

\- Was ist der erlaubte Umgang mit data-fw-app?

\- Was passiert bei ungültigem Slug?

\- Wird ein Framework genutzt?

\- Wird ein Build-System genutzt?

\- Wird Shadow DOM genutzt?

\- Wird ein gemeinsamer Core extrahiert?



2\. Failure Cases zuerst

Liste reale Failure Cases für Slice 0.



Mindestens:

\- kein .fw-app Container vorhanden

\- data-fw-app fehlt

\- data-fw-app ungültig

\- mehrere .fw-app Container

\- doppelte Initialisierung

\- Error-State zeigt technische Details

\- innerHTML wird versehentlich genutzt

\- CSS leakt aus der App heraus

\- Ghost-Theme überschreibt App unerwartet

\- Testseite simuliert Ghost nicht realistisch genug



Für jeden Failure Case:

\- erwartetes Verhalten

\- wie Slice 0 ihn behandelt

\- ob er in app.test.html sichtbar testbar sein muss



3\. 6-Monats-Regret

Beantworte:

„Was würde Albert an diesem Slice in 6 Monaten bereuen, wenn wir ihn jetzt falsch schneiden oder schlampig bauen?“



Mindestens prüfen:

\- zu viel Logik in Slice 0

\- unklare Bootstrapper-Struktur

\- zu lockere Slug-Prüfung

\- app.js als unstrukturierter Blob

\- CSS ohne klares Naming

\- Testseite nur Happy Path

\- Sicherheitsregeln nicht sichtbar im Code

\- späterer Core schwer extrahierbar



4\. Umsetzungsvorschlag für Slice 0

Beschreibe präzise:

\- welche Dateien angelegt werden

\- welche Minimalstruktur app.js bekommt

\- welche Minimalstruktur app.css bekommt

\- welche Test-Cards app.test.html enthält

\- welche Akzeptanzkriterien erfüllt sein müssen



5\. Freigabefrage

Beende mit:

„Albert, gibst Du Slice 0 zur Implementierung frei?“



Regeln:

\- Kein Code in diesem Schritt.

\- Keine Dateien ändern.

\- Keine Implementierung.

\- Keine APP\_SPEC ändern.

\- Keine RFC-/Baseline-/Workflow-Änderung.

\- Nur Kickoff und Entscheidungsgrundlage.

