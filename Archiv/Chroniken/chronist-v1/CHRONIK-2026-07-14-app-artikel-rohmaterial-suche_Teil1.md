---
chronik_id: CHRONIK-2026-07-14-app-artikel-rohmaterial-suche_Teil1
datum: 2026-07-14
projekt: finanzwesir-vermaechtnis
thema: rohmaterial-suche-app-artikel
beteiligte: [nutzer, perplexity]
typ: chronik
standard: chronist-v1
faden_typ: konzeptarbeit
status_am_ende: teilweise
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, praezisierung-durch-gegenfrage, annahme-verworfen, tooling-problem, externe-abhaengigkeit]
---

# Chronik: Konzeption einer Rohmaterial-Suche fuer App-Artikel im Finanzwesir-Projekt

**Hauptgegenstand:** Entwicklung eines mehrstufigen Prozesses (Python, Haiku, Sonnet), um aus alten Blogtexten passendes Rohmaterial fuer App-Artikel zu 25 Apps im Projekt "Finanzwesir-Vermaechtnis" zu finden und in Zielordner zu kopieren, sowie die Frage der Modellwahl und Tokenersparnis.

## Ausgangslage

Der Nutzer arbeitet an einer Website "Finanzwesir-Vermaechtnis" mit Code im Repository awa-de/Finanzwesir-code und Inhalten im Repository awa-de/Finanzwesir-content. Alte Blogtexte liegen lokal unter Z:\Documents\Nextcloud\Finanzwesir 2.0\Inhalte alte Site\blog, nicht im Repository. Ziel war zunaechst, fuer die App "prokrastinations-preis" passende alte Texte als Rohmaterial in einen neuen Unterordner content\posts\apps\prokrastinations-preis\Rohmaterial zu kopieren. Der Nutzer fragte, ob Claude Sonnet dafuer ausreicht oder Opus/Fable noetig sind, und wie sich Token sparen lassen, ohne die Qualitaet zu verschlechtern.

## Chronologischer Verlauf

### Repository-Identifikation
Die Repositories wurden unter dem GitHub-Account awa-de gefunden: Finanzwesir-content, finanzwesir-chart-engine (beendet, in Finanzwesir-code aufgegangen) und Finanzwesir-code. Der Ordner Apps/prokrastinations-preis enthaelt zahlreiche Dokumente, darunter APP_SPEC.md (102 KB), App-Artikel.md, drehbuch_prokrastinationspreis_app.md, AP-prokrast-01_befund-anamnese.md, MINI_SPEC_FROM_HAUPTDOKUMENT.md und weitere.

### Modellwahl-Empfehlung
Es wurde festgelegt: Sonnet reicht fuer die Aufgabe, weil Retrieval und Matching kein komplexes Reasoning erfordern und das Kontextfenster fuer die 102-KB-Spec ausreicht. Opus wurde nur fuer qualitative Redaktionsentscheidungen als sinnvoll markiert. Fable wurde als nicht relevant fuer diesen Anwendungsfall eingeordnet.

### Dreistufiges Token-Sparmodell (erste Fassung)
Ein Modell mit drei Schichten wurde vorgeschlagen: Python fuer lokalen Dateisystem-Scan und Keyword-Vorfilterung (0 Token), Haiku fuer binaere Relevanzpruefung an einer Shortlist, Sonnet fuer finales Matching und Schreiben "via GitHub API". Eine Beispielrechnung (Python) modellierte Kosten von ca. 0€, 0,05€ und 0,30€ fuer die drei Stufen.

### Korrektur: Lokaler Ablauf statt GitHub-Write
Der Nutzer stellte richtig, dass das Schreiben in den Zielordner /Rohmaterial reine Dateioperationen sind und komplett lokal auf der Festplatte stattfindet, nicht via GitHub API. Der Plan wurde entsprechend angepasst: GitHub dient nur als Quelle, um die App zu verstehen, nicht als Ziel des Schreibvorgangs.

### Kritik am Keyword-Matching-Ansatz
Der Nutzer wies darauf hin, dass reines String-Matching nach "prokrastinieren" scheitert, weil alte Blogposts diesen Begriff nie verwendet haben, sondern die gleiche Psychologie in anderen Worten beschreiben (z. B. Marktzeitpunkt, Sparplan-Disziplin). Es wurde ein zweistufiges Modell festgelegt: Ein LLM (Sonnet) generiert einmalig semantische Suchbegriffe inklusive Gegenteile und Nebenthemen aus den Spec-Dateien; Python wendet diese Begriffsliste danach als Batch-Suche an; Haiku prueft die Treffer auf Relevanz.

### Skalierung auf 25 Apps
Der Nutzer stellte klar, dass dies die erste von 25 Apps ist und jede ein Verzeichnis mit einer Datei MINI_SPEC_FROM_HAUPTDOKUMENT.md besitzt, die weniger ausgearbeitet ist als bei "prokrastinations-preis". Gefragt wurde, ob der "Steuerungsblock" in dieser Datei allein als Suchgrundlage ausreicht.

### Bewertung des Steuerungsblocks anhand eines Echtbeispiels
Der Nutzer legte einen konkreten Steuerungsblock der App "etf-vergleich" vor (Rolle, Existenzzweck, psychologische Barriere, falscher Glaubenssatz, Zielzustand, Muss-Kriterien, Nicht-Ziele). Anhand dieses Beispiels wurde eingeschaetzt, dass der Block fuer die Suchbegruendung ausreicht (Ampel-Bewertung gruen), aber normalerweise nicht als alleinige Grundlage fuer die Endauswahl des Rohmaterials genuegt.

### Praezisierung: Migration statt Feedbackschleife
Der Nutzer stellte fest, dass es sich um eine einmalige Migration handelt (jede der 25 Apps wird genau einmal durchlaufen), und fragte nach dem Sinn einer Feedbackschleife (Nutzer markiert genutzte/verworfene Texte). Es wurde zwischen zwei Effekten unterschieden: struktureller Wiederverwendung von Prompt und Skript (hoher Nutzen, weil alle Steuerungsbloecke gleich aufgebaut sind) und inhaltlichem Lernen zwischen Apps (kaum Nutzen, weil die Themen der einzelnen Apps sich stark unterscheiden). Eine Feedback-Logdatei oder ein Lernsystem wurde als nicht sinnvoll fuer diesen Fall verworfen.

### Anfrage nach Leitplanken-Uebernahme aus Coding-Prompts
Der Nutzer stellte zwei Dateien bereit: TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md und STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA-2.md, die Regeln fuer risikogestufte QA, Werkzeugwahl (Python/Haiku/Sonnet/Opus), Pay-Grade-Prinzip und Promptbudget nach Risikoklasse (A/B/C) enthalten. Gefragt wurde, ob eine Prompt-Kette statt eines Einzelprompts sinnvoll ist und was aus diesen Leitplanken uebernommen werden kann, da das Schadenspotential bei der Rohmaterial-Suche geringer ist als beim Coding.

### Einordnung als Risikoklasse A
Anhand der Kriterien Radius, Irreversibilitaet, Erkennbarkeit und Vervielfaeltigung wurde die Aufgabe als Risikoklasse A (deterministischer, lokaler, reversibler Vorgang) eingeordnet. Daraus wurde abgeleitet, dass kein unabhaengiger Review, kein Opus und kein Reviewbudget-Ritual noetig sind. Vier Elemente wurden als uebernehmenswert benannt: explizite Trennung von Quelle und Ziel, Dry-run vor Write, Pay-Grade-Kontext (nur Steuerungsblock statt ganzer Spec), und der Werkzeug-Merksatz Python/Haiku/Sonnet.

### Erster Prompt-Entwurf und Korrektur (Platzhalter-Fehler)
Ein erster Zwei-Prompt-Vorschlag wurde erstellt, mit einem Platzhalter "[STEUERUNGSBLOCK HIER EINFUEGEN]" fuer Prompt 1. Der Nutzer wies dies als nicht funktionierend zurueck: Der Steuerungsblock ist pro App inhaltlich verschieden und liegt in 25 Unterordnern unter /Apps in je einer Datei MINI_SPEC_FROM_HAUPTDOKUMENT.md; das LLM muesse alle Dateien durchgehen, nicht der Nutzer den Block händisch einfuegen. Der Block wurde als beginnend mit der Zeile "## Steuerungsblock: Zweck, Barriere, Pruefregeln" und endend nach der Liste unter "**Nicht-Ziele / harte Verbote:**" spezifiziert.

### Korrigierte Architektur mit Python-Extraktionsschritt
Die Architektur wurde auf einen zusaetzlichen Schritt 0 erweitert: Ein Python-Skript durchsucht /Apps rekursiv, extrahiert den Steuerungsblock aus jeder MINI_SPEC_FROM_HAUPTDOKUMENT.md anhand der Start- und Endmarker und schreibt das Ergebnis in eine strukturierte steuerungsbloecke.json. Ein Testlauf der Extraktionslogik (Regex-basiert, Suche nach naechstem Markdown-Header nach dem Endmarker) wurde im Code-Sandbox ausgefuehrt und bestand den Testfall. Prompt 1 wurde dahingehend korrigiert, dass ein einziger Sonnet-Aufruf alle 25 Steuerungsbloecke aus der JSON-Datei gebuendelt verarbeitet, statt 25 Einzelaufrufe mit Platzhalter.

### Anpassung: Claude Code als Ausfuehrendes statt Nutzer
Der Nutzer stellte klar, dass er selbst kein Skript anlegt, sondern den Prompt an Claude Code weitergibt, welches Auftrag und Skriptvorschlag erhaelt, das Skript gegen die reale Systemumgebung prueft, bei Bedarf anpasst und den Rest der Arbeit selbst durchfuehrt. Der Prompt wurde entsprechend in ein Muster "Auftrag - Skriptvorschlag zur Pruefung/Anpassung - weitere Schritte in Eigenverantwortung von Claude Code" umgebaut, inklusive Pflichtquellen, Scope-Grenzen (nur Lesen aus /Apps und Blog-Ordner, nur Schreiben von steuerungsbloecke.json), Nachbedingungen und Stop-Regel bei fehlenden Markern.

### Zwischenfrage zur Dateistruktur
Waehrend Claude Code an der Aufgabe arbeitete, fragte der Nutzer nach der bisher festgelegten Dateistruktur. Die Struktur wurde zusammengefasst: Eingabe /Apps/{app_slug}/MINI_SPEC_FROM_HAUPTDOKUMENT.md, Zwischenergebnis steuerungsbloecke.json (Array mit app_slug und block je Eintrag) im Arbeitsverzeichnis, Blog-Rohmaterial-Quelle Z:\Documents\Nextcloud\Finanzwesir 2.0\Inhalte alte Site\blog (weitere Zusatzpfade wie Essays oder Podcast-Transkripte waren zu diesem Zeitpunkt noch nicht final benannt), Zielstruktur content\posts\apps\{app_slug}\Rohmaterial\ mit Kopieren statt Verschieben.

## Wendepunkte

Der Hinweis des Nutzers, dass das Schreiben lokal statt via GitHub API erfolgt, veraenderte die Zielarchitektur von einem Remote-Write-Modell zu einem rein lokalen Dateioperationsmodell.

Der Hinweis, dass Keyword-Matching nach "Prokrastination" scheitert, veraenderte den Suchansatz von direktem String-Matching zu einem zweistufigen Modell mit LLM-generierten semantischen Suchachsen vor dem Python-Matching.

Die Feststellung, dass es sich um eine einmalige Migration handelt, veraenderte die Einschaetzung des Nutzens einer Feedbackschleife von "sinnvoll" zu "Aufwand ohne Gegenwert in diesem Fall".

Der Hinweis, dass der Steuerungsblock inhaltlich pro App verschieden ist und in 25 Dateien liegt, machte den ersten Prompt-Entwurf mit Platzhalter unbrauchbar und fuehrte zur Einfuehrung eines vorgeschalteten Python-Extraktionsschritts.

Die Klarstellung, dass Claude Code der Ausfuehrende ist und der Nutzer selbst kein Skript anlegt, veraenderte das Prompt-Format von einer direkten Ausfuehrungsanleitung fuer den Nutzer zu einem Uebergabeprompt mit Skriptvorschlag zur Pruefung.

## Entscheidungen und Festlegungen

- Sonnet ist fuer die Rohmaterial-Suche ausreichend, Opus nur bei qualitativen Redaktionsentscheidungen sinnvoll, Fable nicht relevant · frueh im Verlauf · Begruendung: Aufgabe ist Retrieval/Matching, kein komplexes Reasoning · Status am Ende: gueltig.
- Dreistufiges Werkzeugmodell Python/Haiku/Sonnet fuer die Suche · frueh im Verlauf · Begruendung: Tokenersparnis ohne Qualitaetsverlust · Status am Ende: gueltig, aber um Extraktionsschritt (Schritt 0) erweitert.
- Schreiben des Rohmaterials erfolgt lokal, nicht via GitHub API · nach Nutzerkorrektur · Status am Ende: gueltig.
- Keine Feedbackschleife zwischen den 25 Apps, da einmalige Migration · nach Praezisierung durch Nutzer · Begruendung: kein zweiter Durchlauf derselben App, inhaltliche Themen zu unterschiedlich fuer Uebertragbarkeit von Lernpunkten · Status am Ende: gueltig.
- Aufgabe wird als Risikoklasse A eingestuft (kein unabhaengiger Review, kein Opus, kurzer Delta-Prompt) · nach Vorlage der Leitplanken-Dateien · Status am Ende: gueltig.
- Steuerungsblock-Extraktion erfolgt durch Python anhand fester Start-/Endmarker, nicht durch manuelles Einfuegen durch den Nutzer oder durch das LLM selbst · nach Nutzerkorrektur · Status am Ende: gueltig.
- Prompt an Claude Code enthaelt Auftrag und Skriptvorschlag zur Pruefung/Anpassung, Claude Code fuehrt eigenstaendig weiter aus · nach expliziter Nutzeranweisung · Status am Ende: gueltig, Ausfuehrung zum Zeitpunkt dieser Chronik im Gange.

## Irrwege, Schleifen und verworfene Ansaetze

Ein erster Vorschlag sah vor, dass Sonnet in Schritt 3 das Kopieren "via GitHub API" durchfuehrt; dies wurde verworfen, nachdem der Nutzer klarstellte, dass der gesamte Vorgang lokal auf der Festplatte stattfindet.

Ein erster Ansatz fuer die Themenfindung war reines Keyword-Matching mit festen Begriffen wie "prokrastinieren", "Kosten des Wartens", "ETF kaufen"; dieser wurde verworfen, weil der Nutzer nachwies, dass die Zielbegriffe in den alten Texten nicht woertlich vorkommen und ein LLM zur semantischen Ableitung noetig ist.

Ein erster Zwei-Prompt-Entwurf mit dem Platzhalter "[STEUERUNGSBLOCK HIER EINFUEGEN]" wurde verworfen, weil er implizit voraussetzte, dass der Nutzer den Block manuell aus 25 Dateien heraussucht und einfuegt; stattdessen wurde ein Python-Extraktionsschritt vorgeschaltet.

Ein Versuch, den urspruenglichen Steuerungsblock-Text von "prokrastinations-preis" per Web-Fetch direkt aus dem privaten GitHub-Repository abzurufen, schlug fehl (Fetch-Fehler), weil das Repository privat ist und kein passender Zugriffsweg genutzt wurde; dies wurde nicht weiterverfolgt, da der Nutzer stattdessen den Steuerungsblock der App "etf-vergleich" direkt im Chat vorlegte.

## Erzeugte Artefakte

- Python-Rechenmodell (Code-Sandbox) zur Kosteneinschaetzung des dreistufigen Werkzeugmodells – Zweck: Illustration der Tokenersparnis – Status am Ende: durch spaetere Architekturaenderung (lokaler Ablauf, Extraktionsschritt) ueberholt.
- Python-Rechenmodell (Code-Sandbox) zu Aufwand/Nutzen einer Feedbackschleife ueber 25 Apps – Zweck: Entscheidungsgrundlage fuer Feedbackschleifen-Frage – Status am Ende: durch Praezisierung "einmalige Migration" relativiert, im Kern nicht widerlegt, aber Anwendungsfall entfaellt.
- Zwei-Prompt-Entwurf (Suchachsen-Generierung und Kandidatenbewertung) mit Platzhalter – Zweck: erster Vorschlag fuer Sonnet-Prompts – Status am Ende: ersetzt durch korrigierte Fassung mit Batch-Verarbeitung aus steuerungsbloecke.json.
- Python-Skript zur Extraktion von Steuerungsbloecken aus MINI_SPEC_FROM_HAUPTDOKUMENT.md (Regex-basiert, Start-/Endmarker) inklusive Testlauf in der Code-Sandbox – Zweck: Vorschlag fuer Claude Code zur Pruefung und Anpassung – Status am Ende: als Entwurf an Claude Code uebergeben, Anwendung auf reale Dateien zum Zeitpunkt dieser Chronik noch nicht bestaetigt.
- Uebergabeprompt fuer Claude Code (Auftrag, Skriptvorschlag, Scope, Nachbedingungen, Stop-Regel) – Zweck: Ausfuehrung von Schritt 0 der Rohmaterial-Suche – Status am Ende: an Claude Code uebergeben, Ausfuehrung laeuft laut Nutzerangabe.
- steuerungsbloecke.json (Zwischenergebnis) – Zweck: strukturierte Ablage aller 25 extrahierten Steuerungsbloecke – Status am Ende: zum Zeitpunkt dieser Chronik noch nicht bestaetigt erzeugt, da Claude Code an der Aufgabe arbeitet.

## Sachliche Erkenntnisse

Gesicherter Stand: Beide Repositories (Finanzwesir-content, Finanzwesir-code) liegen unter dem GitHub-Account awa-de; Finanzwesir-code ist oeffentlich, Finanzwesir-content privat.

Gesicherter Stand: Der Ordner Apps/prokrastinations-preis im Repository Finanzwesir-code enthaelt unter anderem APP_SPEC.md, App-Artikel.md, drehbuch_prokrastinationspreis_app.md und MINI_SPEC_FROM_HAUPTDOKUMENT.md.

Gesicherter Stand: Der Steuerungsblock in MINI_SPEC_FROM_HAUPTDOKUMENT.md beginnt mit der Zeile "## Steuerungsblock: Zweck, Barriere, Pruefregeln" und endet nach der Liste unter "**Nicht-Ziele / harte Verbote:**".

Arbeitsannahme: Die Rohmaterial-Suche wurde als Risikoklasse A (deterministisch, lokal, reversibel) eingestuft; diese Einstufung wurde vom Nutzer nicht explizit bestaetigt, sondern von Perplexity vorgeschlagen und im weiteren Verlauf unwidersprochen verwendet.

Offene Frage: Ob die MINI_SPEC_FROM_HAUPTDOKUMENT.md in allen 25 App-Ordnern tatsaechlich exakt dieselbe Marker-Struktur verwendet, wurde angenommen, aber nicht fuer alle 25 Apps einzeln verifiziert.

Spaetere Korrektur: Die urspruengliche Annahme, dass Prompt 1 einen einzelnen Steuerungsblock per Platzhalter erhaelt, wurde durch die Erkenntnis ersetzt, dass ein vorgeschalteter Python-Schritt alle 25 Bloecke automatisiert extrahieren muss.

## Offene Punkte am Ende

Ob Claude Code das vorgeschlagene Python-Extraktionsskript unveraendert uebernommen oder angepasst hat, war zum Zeitpunkt dieser Chronik nicht bekannt.

Ob alle 25 MINI_SPEC_FROM_HAUPTDOKUMENT.md-Dateien die erwartete Marker-Struktur tatsaechlich enthalten oder ob einzelne Apps als "fehlend/unklar" markiert wurden, war offen.

Welche weiteren Verzeichnisse neben dem Blog-Ordner (z. B. Essays, Podcast-Transkripte) in die Rohmaterial-Suche einbezogen werden sollen, war zum Zeitpunkt dieser Chronik noch nicht abschliessend benannt.

Prompt 1 (Suchachsen-Generierung aus steuerungsbloecke.json) und Prompt 2 (Kandidatenbewertung) waren zum Zeitpunkt dieser Chronik entworfen, aber noch nicht gegen reale Ergebnisse von Schritt 0 angewendet oder verifiziert worden.

Die konkrete Pfadangabe fuer APPS_ROOT im Python-Skript war im Entwurf als Platzhalter ("PFAD_ZU_APPS_ANPASSEN") markiert und musste von Claude Code gegen die reale lokale Struktur ersetzt werden.

## Analysefaehige Rohmuster

Fuer spaetere Musteranalyse vormerken: Mehrfaches Muster im Faden, dass ein von Perplexity vorgeschlagener Architekturschritt (GitHub-Write, Keyword-Matching, Platzhalter-Prompt) vom Nutzer anhand konkreter Detailkenntnis des eigenen Systems korrigiert wurde, bevor die naechste Stufe sinnvoll weiterentwickelt werden konnte.

Fuer spaetere Musteranalyse vormerken: Wiederkehrende Anwendung der Unterscheidung zwischen deterministischer Python-Arbeit, guenstiger Haiku-Vorsortierung und semantischer Sonnet-Entscheidung als durchgehendes Ordnungsprinzip ueber mehrere Teilaufgaben des Fadens hinweg.

Fuer spaetere Musteranalyse vormerken: Die vom Nutzer eingefuehrten Leitplanken-Dokumente aus einem Coding-Kontext (Risikoklassen A/B/C, Pay-Grade-Prinzip) wurden erfolgreich auf einen nicht-Coding-Anwendungsfall (Redaktionsarbeit) uebertragen, mit expliziter Abschwaechung des Schutzapparats aufgrund geringeren Schadenspotentials.

## Bewusst ausgelassen

Ausfuehrliche Wiedergabe der vollstaendigen Inhaltslisten aller einzelnen Dateien im Ordner Apps/prokrastinations-preis wurde auf die fuer die Aufgabe relevanten Dateinamen verdichtet.

Vollstaendiger Wortlaut der beiden Leitplanken-Dokumente (taktischer Startprompt, Sicherheitsdokument) wurde nicht wiedergegeben, nur die fuer die Entscheidungen relevanten Prinzipien (Risikoklassen, Pay-Grade-Prinzip, Werkzeugmerksatz).

Vollstaendiger Wortlaut der im Faden formulierten Prompt-Entwuerfe (Zwischenfassungen von Prompt 1 und Prompt 2) wurde nicht jeweils vollstaendig wiederholt, nur deren inhaltliche Aenderung zwischen den Fassungen.

Hoeflichkeitsformeln und Bestaetigungen ohne inhaltliche Aenderung wurden nicht einzeln aufgefuehrt.
