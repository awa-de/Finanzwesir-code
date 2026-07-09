---
chronik_id: CHRONIK-2026-07-09-content-repo-setup
datum: 2026-07-09
projekt: finanzwesir-2-0
thema: content-repo-setup
beteiligte: [nutzer, perplexity]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, annahme-verworfen, praezisierung-durch-gegenfrage, tooling-problem, konzept-vs-umsetzung]
---

# Chronik: Aufbau des Content-Verzeichnisses für Finanzwesir 2.0

**Hauptgegenstand:** Konzeption und technische Umsetzung eines getrennten Content-Systems (Artikel, Seiten, Rechtstexte) neben dem bestehenden öffentlichen Code-Repository `Finanzwesir-code`, inklusive Verzeichnisstruktur, Git-Aufteilung, Obsidian-Anbindung und Nextcloud-Konfliktbehebung.

## Ausgangslage

Der Nutzer betreibt das GitHub-Repository `awa-de/Finanzwesir-code`, das Apps (in `Apps/<app-slug>/`), ein Theme und technische Dokumentation (`docs/`) enthält. Diese Apps werden künftig in redaktionelle Artikel eingebettet, die zusammen mit der App eine Seite eines mit Ghost.io betriebenen Blogs bilden sollen. Die Artikeltexte liegen als Markdown vor; ein Beispiel existierte bereits als Rohskizze unter `Apps/prokrastinations-preis/App-Artikel.md`, ohne YAML-Frontmatter. Der Nutzer hatte zwei eigene Strukturideen (Artikel direkt im App-Ordner; separates zentrales Content-Verzeichnis) und bat um Prüfung, Erweiterung und Bewertung aller denkbaren Permutationen. Als Randbedingung nannte er: kein zusätzliches Verzeichnis neben `Finanzwesir 2.0` auf gleicher Dateiebene; `Finanzwesir 2.0` soll Wurzelverzeichnis für Code und Text bleiben. Zusätzlich existieren künftig redaktionelle Texte und Meta-Texte (Impressum, Datenschutz).

## Chronologischer Verlauf

### Repo-Analyse und erster Strukturvorschlag
Das GitHub-Repo wurde verbunden (Owner `awa-de`, nicht `finanzwesir` wie zunächst angenommen). Die Root-Struktur (`Apps/`, `Theme/`, `docs/`, `tools/`, `Archiv/`) und der Inhalt von `Apps/` (ca. 25 App-Unterordner) wurden gelesen. Perplexity schlug vier Permutationen vor: (A) Artikel im App-Ordner, (B) zentrales `content/`-Verzeichnis *innerhalb* des Code-Repos, (C) Hybrid mit Stub-Datei, (D) zwei getrennte GitHub-Repos. Empfohlen wurde Variante B mit `content/` als Unterordner des öffentlichen Code-Repos, Obsidian-Vault auf `content/`, kein Obsidian Sync, nur Git.

### Korrektur durch externe Analyse (ChatGPT)
Der Nutzer fügte eine ausführliche Analyse eines anderen Modells (ChatGPT) ein, die auf denselben Repo-Zustand Bezug nahm. Diese Analyse stellte fest, dass das Repo `Finanzwesir-code` öffentlich ist und die bestehende `.gitignore` bereits `content/`, `Inhalte alte Site/` und `Rechtliche Seiten/` explizit ausschließt. Daraus wurde gefolgert, dass `content/` NICHT im öffentlichen Code-Repo liegen darf, sondern als separates, privates, im Code-Repo genestetes Git-Repository geführt werden muss. Perplexity prüfte die `.gitignore` direkt im Repo und bestätigte den Befund. Dies markierte einen Richtungswechsel: die zuvor empfohlene Variante B (content im selben Repo) wurde verworfen.

### Legierung beider Konzepte
Perplexity verglich die eigene ursprüngliche Empfehlung mit der ChatGPT-Analyse und hielt fest, wo die eigene erste Einschätzung fehlerhaft war (content im selben Repo) und wo die ChatGPT-Struktur nach Einschätzung von Perplexity zu viel Verwaltungsaufwand erzeugen würde (`_registry/`-Dateien wie `content-index.md`, `publish-log.md`, `snippets/app-embeds/`). Aus beiden Vorschlägen wurde eine gemeinsame Zielstruktur gebildet: `Finanzwesir 2.0/` als lokaler Ordner mit zwei Git-Repos nebeneinander (`Finanzwesir-code` öffentlich, `content/` privat/genested), Obsidian-Vault auf `content/`, kein Obsidian Sync (später revidiert), Frontmatter-Standard mit `app_slug`-Feld als einzige Verknüpfung zwischen Artikel und App-Code, `docs/editorial/` (bereits im Repo vorhanden) als Ort für Prozessdokumente statt Artikeltexte.

### Festlegung: Ghost-Upload bleibt manuell
Auf die offene Frage, ob der Ghost-Upload automatisiert werden solle, legte der Nutzer fest: „Alles immer manuell.“ Dies schloss den Bau eines Ghost-API-Exporters für den aktuellen Zeitpunkt aus. Perplexity beschrieb den manuellen Workflow (Text kopieren, Bilder per Drag&Drop, HTML-Card aus `ghost-card.example.html` manuell einfügen, Metadaten manuell setzen).

### Korrektur der Wurzelverzeichnis-Annahme
Der Nutzer korrigierte eine Fehlannahme: Perplexity hatte formuliert, `Finanzwesir 2.0` sei „kein Git“. Tatsächlich ist der lokale Ordner `Finanzwesir 2.0` identisch mit dem Git-Root des Code-Repos `Finanzwesir-code` (Beleg: eine vom Nutzer angehängte `.gitignore`-Datei aus diesem Wurzelverzeichnis). Perplexity korrigierte das Modell: `content/` ist ein genestetes zweites Git-Repository innerhalb eines vom äußeren Repo ignorierten Unterordners, kein eigenständiger dritter Ort.

### Klärung Obsidian-Sync-Strategie
Der Nutzer legte fest, als einziger Bearbeiter zu arbeiten, mit laufendem Sync über Obsidian Sync und Git-Commits nur zu Meilensteinen. Dies ersetzte die zuvor genannte Position „kein Obsidian Sync“. Für die `.gitignore` des Content-Repos wurde `.obsidian/` als auszuschließender Eintrag festgelegt.

### Umsetzung über Claude (VSCode-Extension)
Der Nutzer gab an, mit VSCode und der Claude-Extension zu arbeiten. Perplexity verfasste mehrere Prompt-Vorlagen zur Dateioperation: zunächst für eine einzelne App (Migration von `App-Artikel.md` in eine neue `index.md`-Struktur), dann – auf Wunsch des Nutzers – für alle App-Ordner gleichzeitig per generiertem und wieder gelöschtem Hilfsskript, das für jede der Apps ein Skelett aus `index.md` und `assets/`-Ordner anlegen sollte, inklusive Sonderregel für die Übernahme des bereits vorhandenen Prokrastinations-Preis-Texts.

### Korrektur des Umsetzungsstands
Der Nutzer stellte richtig, dass zu diesem Zeitpunkt außer der einen Datei `Apps/prokrastinations-preis/App-Artikel.md` (eine Rohskizze ohne YAML-Header) nichts von der vorgeschlagenen Struktur real existierte. Die Massen-Migrationsidee für 25 Apps war zu diesem Zeitpunkt hypothetisch; erst danach wurde vom Nutzer bestätigt, dass die vollständige Skelett-Erzeugung für alle Apps durchgeführt werden solle („will nachher die gesamte Struktur so haben“). Der Nutzer bestätigte im weiteren Verlauf die Ausführung („Erledigt“) mehrfach ohne Detailrückmeldung zum Ergebnis der Skriptausführung.

### Git-Einrichtung im Content-Ordner
Nach Anlage der `.gitignore` (später erweitert um `.trash/`) wurde das Content-Verzeichnis als eigenständiges Git-Repository initialisiert. Ein `git status`-Aufruf vor `git init` zeigte fälschlich den Status des äußeren Repos an (Pfade mit `../`), da im `content/`-Ordner noch kein eigenes `.git` existierte und Git automatisch eine Ebene nach oben wechselte. Der Nutzer äußerte Vorsicht, „nichts kaputt machen“ zu wollen. Mit `git check-ignore -v content` wurde bestätigt, dass der Ordner durch Zeile 26 der äußeren `.gitignore` (`content/`) vollständig ignoriert wird, wodurch `git init` als unbedenklich eingestuft wurde. `git init`, `git add .` und `git commit` wurden ausgeführt; `git status` zeigte danach „nothing to commit, working tree clean“ im neuen, isolierten Repository.

### Anbindung an GitHub
Der Nutzer legte ein privates GitHub-Repository `Finanzwesir-content` an (ohne README, ohne `.gitignore`). Es entstand eine Rückfrage, warum der Befehl `git branch -M main` vorgeschlagen wurde, obwohl der lokale Branch `master` hieß. Perplexity erläuterte den historischen Unterschied zwischen `master` (lokaler Git-Standard) und `main` (GitHub-Standard seit Oktober 2020) und empfahl, wegen des leeren Ziel-Repos ohne Umbenennung mit `master` zu pushen. Der Push (`git remote add origin …`, `git push -u origin master`) verlief erfolgreich, neuer Branch `master` wurde remote angelegt und Tracking eingerichtet.

### Nextcloud-Konflikte durch Obsidian
Nach Öffnen des Vaults in Obsidian schloss sich dieser wiederholt selbständig; der Nutzer identifizierte Nextcloud-Sync-Konflikte als Ursache und schlug vor, den `content`-Ordner aus dem Nextcloud-Sync zu entfernen. Perplexity empfahl zunächst, den Ordner über die Checkbox-Auswahl („Auswahl bearbeiten“) von der Synchronisation auszuschließen. Der Nutzer widersprach: dieser Mechanismus lösche den Ordner lokal, was nicht gewünscht sei, da im Ordner aktiv geschrieben werde. Perplexity korrigierte den Vorschlag auf die Nextcloud-Ignore-Liste („Ignorierte Dateien bearbeiten“), die den Ordner am Ort belässt, aber von der Überwachung ausnimmt. Der Nutzer legte eine Testdatei an, die von Nextcloud mit einem gelben Ausrufezeichen markiert wurde; eine Prüfung über die Nextcloud-Weboberfläche ergab, dass die Testdatei dort fehlte, was als korrekte Funktion der Ignore-Regel gewertet wurde.

### Obsidian-Git-Plugin und Authentifizierungsfrage
Der Nutzer installierte das Obsidian-Git-Plugin und führte einen erfolgreichen Sync durch, ohne dabei aktiv Zugangsdaten einzugeben. Er fragte nach der korrekten Bedienreihenfolge und dem Grund für das Ausbleiben einer Passwortabfrage. Perplexity erläuterte die Stage-Commit-Push-Pull-Reihenfolge, verwies auf den Sammelbefehl „Commit-and-sync“ und führte das Ausbleiben der Passwortabfrage auf zuvor beim Terminal-Push hinterlegte, im Windows Credential Manager gespeicherte Zugangsdaten zurück, die das Plugin wiederverwendet habe. Auf Nachfrage, was nach einem Neustart des Rechners passiere, stellte Perplexity klar, dass das Plugin ohne laufenden Obsidian-Prozess keine Aktionen ausführt, die im Credential Manager gespeicherte Authentifizierung jedoch über einen Neustart hinaus bestehen bleibe und ein erneuter Push ohne erneute Anmeldung funktionieren sollte, außer bei Löschung des gespeicherten Tokens oder dessen Ablauf.

### Erweiterung der `.gitignore`
Auf Wunsch des Nutzers wurde die bestehende `.gitignore` des Content-Repos um den Eintrag `.trash/` (Obsidian-Papierkorb) ergänzt und vollständig zum Kopieren bereitgestellt.

### Abgleich mit realem Verzeichniszustand
Der Nutzer übermittelte einen Screenshot des tatsächlichen `content/`-Verzeichnisses. Sichtbar waren `.git`, `.obsidian`, `_vorlagen`, `legal`, `pages`, `posts`, `.gitignore`, `.trash`. Der Ordner `legal/` als eigenständige Ebene neben `pages/` war in den vorherigen Konzeptvorschlägen nicht in dieser Form vorgesehen (dort war Rechtliches als Unterordner von `pages/meta/` skizziert worden). Der Nutzer bat um Abgleich der Entwürfe mit dem realen Stand und um eine zusammenfassende Markdown-Dokumentation des Gesamtsystems (Rollen, Verzeichnisse, Tools, Abläufe), unter ausdrücklichem Ausschluss der Git-Detailfragen.

### Erstellung der System-Dokumentation
Perplexity erstellte die Datei `Finanzwesir-Content-System.md` mit Zonenmodell, Verzeichnisbaum (inklusive `legal/` als eigener Ebene), Rollen-/Tool-Tabelle, Beschreibung der Code-Artikel-Brücke über `app_slug` und `ghost-card.example.html`, Frontmatter-Standard und Ablaufbeschreibung von App-Entstehung bis Veröffentlichung.

## Wendepunkte

- Die eingefügte externe Analyse (ChatGPT) samt Prüfung der bestehenden `.gitignore` führte zur Verwerfung der ursprünglichen Empfehlung, `content/` im öffentlichen Code-Repo zu belassen; stattdessen wurde ein genestetes, privates zweites Git-Repository festgelegt.
- Die Korrektur des Nutzers zur Wurzelverzeichnis-Identität („Finanzwesir 2.0 IST das Git“) veränderte das Modell von „drei getrennten Ebenen“ zu „ein Code-Repo mit genestetem Content-Repo“.
- Die Festlegung „Alles immer manuell“ schloss Automatisierungsüberlegungen zum Ghost-Upload für den weiteren Verlauf aus.
- Der Widerspruch des Nutzers zur Checkbox-Methode bei Nextcloud führte zum Wechsel auf die Ignore-Listen-Methode.

## Entscheidungen und Festlegungen

- **Zwei-Repo-Modell:** `Finanzwesir-code` (öffentlich) und `Finanzwesir-content` (privat, genestet in `content/`) unter gemeinsamer lokaler Wurzel `Finanzwesir 2.0`. Festgelegt nach externer Analyse und `.gitignore`-Prüfung. Status: gültig.
- **Kein zentrales Registry-Dokument** (verworfen aus ChatGPT-Vorschlag: `content-index.md`, `publish-log.md`, `app-page-map.md`); Verknüpfung stattdessen über Frontmatter-Feld `app_slug`. Status: gültig.
- **Verzeichnisstruktur mit `posts/apps/`, `posts/redaktion/`, `pages/`, `legal/`, `_vorlagen/`.** Der `legal/`-Ordner wurde vom Nutzer eigenständig auf oberster Ebene angelegt (Abweichung vom ursprünglichen Vorschlag `pages/meta/`). Status: gültig, übernommen in Dokumentation.
- **Ghost-Upload bleibt manuell**, keine API-Automatisierung. Festgelegt durch expliziten Nutzerentscheid. Status: gültig für den betrachteten Zeitraum.
- **Sync-Strategie:** Obsidian Sync für laufende Arbeit, Git-Commits zu Meilensteinen, Nextcloud über Ignore-Liste ausgeschlossen. Status: gültig.
- **Branch-Name `master`** statt `main` für das Content-Repo, wegen leerem Ziel-Repo ohne vorherige Standardbranch-Erstellung. Status: gültig.
- **`.gitignore` Content-Repo:** `.obsidian/`, `.trash/`, `.DS_Store`, `Thumbs.db`, `desktop.ini`, `*.sync-conflict-*`. Status: gültig, zuletzt erweitert.

## Irrwege, Schleifen und verworfene Ansätze

- Perplexitys erster Strukturvorschlag (Permutation B: zentrales `content/`-Verzeichnis innerhalb des öffentlichen Code-Repos) wurde nach Prüfung der `.gitignore` verworfen, da das Repo öffentlich ist und die `.gitignore` bereits eine gegenteilige Absicht dokumentierte.
- Permutation D (zwei vollständig getrennte, nicht genestete Repos nebeneinander auf Dateiebene) wurde durchgehend verworfen, da sie der Nutzeranforderung eines einzigen Wurzelverzeichnisses widersprach.
- Permutation C (Stub-Datei im App-Ordner mit Verweis auf zentralen Artikel) wurde wegen Doppelpflegeaufwand verworfen.
- Die Annahme, `Finanzwesir 2.0` sei kein Git-Repository, sondern ein reiner Container-Ordner, erwies sich als unzutreffend und wurde nach Nutzerkorrektur revidiert.
- Der `git status`-Befehl vor `git init` im `content`-Ordner zeigte irreführend den Zustand des äußeren Repos; dies wurde als Effekt der fehlenden eigenen `.git`-Instanz erkannt und aufgeklärt, ohne dass reale Schäden entstanden.
- Der erste Vorschlag zum Nextcloud-Ausschluss über die Checkbox-Auswahl wurde vom Nutzer als ungeeignet zurückgewiesen, weil er lokale Löschung bedeutet hätte.

## Erzeugte Artefakte

- Mehrere Prompt-Texte für die Claude-Extension in VSCode zur Einzel- und Massen-Migration der App-Artikel in die neue Content-Struktur. Status: vom Nutzer als „erledigt“ bestätigt, Ergebnis der Skriptausführung nicht im Faden im Detail rückgemeldet.
- `.gitignore` für das Content-Repo (final erweitert um `.trash/`). Status: final, vom Nutzer übernommen.
- Privates GitHub-Repository `Finanzwesir-content`, initialisiert, gepusht, mit Obsidian-Git-Plugin verbunden. Status: final, in Betrieb.
- Datei `Finanzwesir-Content-System.md` (Systemdokumentation: Zonenmodell, Verzeichnisstruktur, Rollen/Tools, Frontmatter-Standard, Ablauf). Status: final erstellt, abgeglichen mit realem Verzeichnisstand per Screenshot.

## Sachliche Erkenntnisse

- Gesicherter Stand: Ein Unterordner, der in der `.gitignore` eines Repos vollständig ausgeschlossen ist, kann bedenkenlos mit `git init` zu einem eigenständigen, isolierten Repository gemacht werden, ohne das äußere Repo zu beeinflussen (verifiziert über `git check-ignore -v`).
- Gesicherter Stand: Git-Zugangsdaten, die einmal im Windows Credential Manager hinterlegt wurden, werden von verschiedenen lokalen Git-Clients (Terminal, Obsidian-Git-Plugin) gemeinsam genutzt, ohne erneute Eingabe.
- Arbeitsannahme: Nextcloud-Sync-Konflikte im `content`-Ordner entstanden durch gleichzeitiges Schreiben von Nextcloud, Obsidian Sync und/oder Git in denselben Ordner; die Ignore-Listen-Lösung wurde als Abhilfe eingesetzt, eine abschließende Bestätigung der vollständigen Konfliktfreiheit über einen längeren Zeitraum steht im Faden nicht.
- Offene Frage: Ob die Massen-Migration aller ca. 25 App-Ordner durch das generierte Skript vollständig und fehlerfrei durchgeführt wurde, wird im Faden nur durch die knappe Nutzerrückmeldung „erledigt“ bestätigt, ohne Detailprüfung des Ergebnisses.

## Offene Punkte am Ende

- Keine inhaltliche Prüfung, ob alle App-Ordner tatsächlich korrekt migrierte `index.md`-Dateien mit gültigem Frontmatter enthalten.
- Kein im Faden festgelegter Prozess für den Übergang von `status: draft` zu `status: published` über den reinen Frontmatter-Eintrag hinaus (z. B. Review-Schritt).
- Keine Festlegung, ob/wie Bilder aus `assets/`-Ordnern beim manuellen Ghost-Upload benannt oder organisiert werden sollen.
- Kein festgelegtes Intervall für den automatischen Commit im Obsidian-Git-Plugin wurde im Faden bestätigt eingestellt (nur als Empfehlung genannt).

## Analysefähige Rohmuster

- Für spätere Musteranalyse vormerken: Eine vom Nutzer eingefügte Analyse eines anderen LLM (ChatGPT) korrigierte einen zentralen strukturellen Vorschlag von Perplexity, nachdem Perplexity die zugrunde liegende `.gitignore` zunächst nicht mit der gebotenen Konsequenz ausgewertet hatte.
- Für spätere Musteranalyse vormerken: Mehrfach musste der Nutzer technische Fehlannahmen von Perplexity korrigieren (Wurzelverzeichnis-Identität, Nextcloud-Ausschlussmechanismus), bevor die jeweils passende Lösung entstand.
- Für spätere Musteranalyse vormerken: Der Nutzer bestätigte mehrere umfangreiche Umsetzungsschritte (Massen-Migration, Git-Setup) im Faden nur mit knappen Einwort-Rückmeldungen („erledigt“, „Erledigt“), ohne Detailergebnisse einzufügen.

## Bewusst ausgelassen

- Wörtliche Wiedergabe der vollständigen eingefügten ChatGPT-Analyse (nur deren Kernaussagen und Wirkung auf den Verlauf wurden übernommen).
- Wiederholte Bestätigungsfloskeln und Zwischenmeldungen ohne neuen Sachstand.
- Vollständige Wortlaute der generierten Prompt-Texte für die Claude-Extension (nur Zweck und Ergebnis wurden festgehalten).
- Detailliertes Nacherzählen der Erklärtexte zu Git-Grundbefehlen, soweit sie reine Erläuterung ohne Zustandsänderung waren.
