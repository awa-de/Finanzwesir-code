> Immer sagen, dass diese Aufgaben trotzdem in den Backlog Archiv geschrieben werden. Auch wenn sie nicht als Arbeitspunkte im Backlog waren.

## Verzeichnis aufbohren

Die Überschrift im Dokument wird der Name des Unterverzeichnisses, dabei wird der String "Block" weggelassen.\
ETF-Apps-Hauptdokument.md lesen und dann die Struktur des Dokumente nutzen, um die Verzeichnisstruktur  in  \Apps zu modellieren.

Aus "Block A: Psychologie & Verhalten" wird das Verzeichnis " A_Psychologie_Verhalten" Die Dateinamen sollten ohne Probleme von einem LLM gelesen werden können.

Dann kommt in jedes Unterverzeichnis eine Markdown-Datei. Name aus dem Hauptdokument, Beispiel\
"A1 – Risiko-Übersetzer (Dacia-Test).md" - bereinige um alle Zeichen, die nicht im Dateinamen stehen dürfen.\
Inhalt der MD-Datei: Eine Kopie der Erklärung, die im Hauptdokument steht. 

Alles inklusive slug bis Implementationshinweise.

## Überblick verschaffen
1. Erstmal schauen, was schon das ist. docs\design-system
2. Was ist im Backlog und anderen Dateien bereits als Arbeitspaket niedergelegt?

## App-Fabrik bauen
Aktuell vollkommene Unklarheit, wie wir vorangehen.
Ich erwarte Vorschläge. Wir sind ganz am Anfang. Jetzt wird das architektonische Fundament gelegt. Jeden Fehler, den wir jetzt machen, werden wir in der Zukunft teuer bezahlen. Jede Schlamperei bekommen wir dann mit Zinseszins zurückgezahlt.

Was wir brauchen ist eine App-Fabrik, die verlässliche, normierte, standardisierte Software produziert. Nichts Geniales, nur Qualitätsstandards konsequent verwirklicht. Wir lösen hier Probleme, die schon 1.000 mal vorher gelöst wurden. Ich will Code, der nach Prinzipien aufgebaut ist, die sich bewährt haben. Auch für Code gilt der Lindy-Effekt. 

Es gibt 21 Apps. Plus die Chart-Engine. Ich brauche ein System, mit dem ich basierend, auf dem was das ist, die Prompts /Hooks / Commands für die Skill-App baue. Das muss ein Fließbandprozess werden.
Die Schnittstellen zu externen Dateien (CSV, JSON) muss für alle gleich sein, die Schnittstelle zum Design-System auch (nicht nur Farben und Fonts, auch erlaubte Elemente).
Auch der Code, wie werden Variablen bezeichnet, wie ist das Ganze aufgebaut und welche Namenskonventionen gelten. Das Ziel ist: Kennt man eine App, kennt man alle. Alles, was für mehr als eine App genutzt werden kann wird standardisiert und - wenn sinnvoll - in Bibliotheken ausgelagert.

Prüfe, ob diese Skills nützlich sind:
- extreme-ownership
- code-quality-faang-review samt Unterverzeichnis "ressources"

Die App besteht aus normalem HTML und Javascript. Sie ist einbettet in eine normale HTML-Seite, wie sie das CMS Ghost.io ausliefert.

Wichtig: Bei der Planung sind zwei Dinge zu berücksichtigen. Beides ist gleichberechtigt. 

1. Die Systemarchitektur, Beispiel: Wie greifen die Apps auf externe Daten z.B. CSV-Dateien zu, über welche Steuerparameter werden sie in Ghost.io via HTML-Card aufgerufen, wie ist die Schnittstelle ans Design.System, so dass die Apps die CI korrekt ausspielen. Hier schauen wir uns ab, was für Prinzipien FAANG-Programmierer anwenden.
2. Die UX/UI, kognitive Psychologie. Minimale kognitive Last bei maximaler Informationsdichte. Hier sind Edward Tufte, Steven Krug und die Prinzipien der FAANG-Designer gefragt.

## Möglicher Prozess eine App zu bauen
1. Sammeln was da ist für diese konkrete App
2. In einer ersten Interation das generische App-Template (stellt sicher, dass alle Apps eine gemeinsame Basis teilen. So viel wie möglich teilen, nur das, was die Apps speziell ausmacht ist neu).
3. Dann die Lücken interativ mit dem Skill extreme ownership füllen. Claude macht Vorschläge, ich steuere.
4. Abnahme des fertigen Konzepts
5. Umsetzung in Code durch Claude. Erwartungshaltung: Da wie so eine gute Vorarbeit gemacht haben, sollte das Coden der App extrem schnell gehen und auf Anhieb fehlerlos sein.