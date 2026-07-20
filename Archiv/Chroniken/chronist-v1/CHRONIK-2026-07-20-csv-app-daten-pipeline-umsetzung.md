---
chronik_id: CHRONIK-2026-07-20-csv-app-daten-pipeline-umsetzung
datum: 2026-07-20
projekt: finanzwesir-2-0
thema: csv-app-daten-pipeline-umsetzung
beteiligte: [nutzer, claude]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, annahme-verworfen, tooling-problem, sackgasse, konzept-vs-umsetzung, praezisierung-durch-gegenfrage, durchbruch]
---

# Chronik: CSV-App-Daten-Pipeline — Umsetzung in Claude Code

**Hauptgegenstand:** Der Faden setzte eine Kette von sechs vorbereiteten Aufträgen (APP-DATA-00 bis 05a) um, die einen HTTP-Upload-Dienst für Chart-CSVs bauten, dessen Kernfehler live fanden und behoben, den Dienst wieder verwarfen, ihn durch einen lokalen Offline-Prüfer mit automatischer Datenform-Erkennung ersetzten, ein neues Ghost-Card-Attribut `data-app-file` einführten und die aktive Projektdokumentation auf diesen Endzustand nachzogen.

## Ausgangslage

Der Faden begann mit `/start` im Kettenmodus; ein bereits am selben Tag begonnener Faden wurde per Warm-Start fortgeführt (Fokus laut Hook: Ghost.io-Prototyp-Start / App-Duell-Runde, beide 2026-07-19 abgeschlossen). Ab der ersten inhaltlichen Anweisung folgten alle weiteren Schritte einem festen Muster: Der Nutzer benannte eine Datei unter `docs/steering/patches/PATCH-APP-DATA-*.md`, geschrieben von einem separaten „steuernden" LLM-Faden (ChatGPT), und verlangte, ausschließlich den darin beschriebenen Auftrag auszuführen. Claude las die Patch-Datei und die darin gelisteten Pflichtquellen und setzte um oder analysierte, je nach Auftragstyp.

## Chronologischer Verlauf

### APP-DATA-00 — Anamnese des bestehenden Parser-Vertrags

Reiner Lese-Auftrag: Vergleich von Strategiepapier, `CSVParser.js`, `ChartEngine.js` und dem bestehenden Testbestand. Ergebnis war eine Parser-Verhaltensmatrix für zehn Fälle (gültige Zeitreihe, gültiger Snapshot, doppelte Header, zu kurze/lange Zeile, leere Werte, ungültiges Datum, ungültiger Zahlenwert, Einheiten, abschließendes Semikolon). Der Bar-Vertrag (`expectDate: true` für Linie/Balken) wurde als intakt bestätigt. Eine Volltextsuche im separaten `content`-Repository nach `financial-chart-module` ergab null Treffer — `data-csv` hatte zu diesem Zeitpunkt keinen belegten Produktiveinsatz. Als Doku-Drift wurden zwei Punkte notiert: Das Strategiepapier behauptete Invarianten („Header eindeutig", „gleiche Spaltenzahl"), die der Code nicht durchsetzte; eine dort erwähnte Methode `analyzeStructure` existierte im Code nicht. Keine Datei wurde verändert.

### APP-DATA-01 — Architekturentscheidung für einen lokalen Upload-Dienst

Ebenfalls reiner Entwurfs-Auftrag. Festgelegt wurden: Systemgrenzen (Browser-Oberfläche, lokaler Dienst, gemeinsamer Parser-Kern, Ghost als reiner statischer Auslieferer), ein Upload-/Speicher-/Fehlervertrag mit Temp-Verzeichnis und atomarem Umbenennen, die Entscheidung, aus `CSVParser.js` einen fetch-freien Kern `parseCsvText()` herauszulösen, sowie ein Windows-11-Betriebsmodell ohne Docker. Mehrere Punkte blieben ausdrücklich als offene Entscheidungen für den Nutzer stehen (u. a. serverseitig generierter vs. bereinigter Dateiname, Überschreibregel).

### APP-DATA-02 — Umsetzung des Upload-Diensts

Vor der Umsetzung führte Claude ein Full-Gate mit neun Fragen aus und wartete auf Freigabe („ok, setze um"). Drei Vorprüfungen liefen gegen die reale lokale Node-22-Laufzeit: Der bestehende ES-Modul-Code war ohne Browser-Globals importierbar; ein UTF-8-BOM wurde vom bestehenden Parser bereits über `.trim()` toleriert; ein atomarer Dateiaustausch über `fs.renameSync` auf demselben Volume funktionierte nachweislich. Alle drei liefen grün.

Beim Versuch, `CSVParser.js` zu bearbeiten, blockierte ein Pre-Edit-Hook den Schreibvorgang: Die Datei war in `.claude/PROTECTED_PATHS.json` als `forbidden` markiert — strenger als die allgemeine Tabu-Zonen-Regel. Der Nutzer wählte zunächst die Option „einmaliger Override ohne Dokumentänderung"; Claude stellte klar, dass der Hook rein mechanisch prüft und ein mündliches Override technisch nicht greifen kann. Auf Nachfrage wählte der Nutzer, die Sperre in der JSON-Datei temporär auf `protected` herabzustufen. Erst danach ließ sich `parseCsvText()` als benannter Export herauslösen; `parse()` rief ihn intern weiter auf. Die Verhaltensgleichheit wurde per Node-Test gegen Zeitreihe, Snapshot und den ungültigen-Datum-Fehlerfall bestätigt.

Es folgte der Bau von `tools/upload-dienst/` (Node-22-HTTP-Server ohne zusätzliche Abhängigkeit, eigener Multipart-Parser, Startskript, Konfigurationsdateien, minimale Upload-Oberfläche). Alle neun im Patch geforderten Pflichtnachweise liefen grün gegen den laufenden Dienst und das laufende lokale Ghost; ein Regressionscheck gegen 27 reale CSV-Fixtures aus den bestehenden Test-HTMLs bestätigte, dass der ausgelöste Kern unverändert blieb.

Beim anschließenden eigenen Test des Nutzers zeigte sich ein realer Fehler: Eine echte Zeitreihen-CSV (`test_data_singlebalken.csv`), versehentlich als „Snapshot" hochgeladen, wurde klaglos akzeptiert — während der umgekehrte Fall (Snapshot als Zeitreihe) korrekt abgelehnt wurde. Ursache war, dass der Snapshot-Zweig des Parsers die Kategorie-Spalte inhaltlich gar nicht prüfte. Claude schlug eine Plausibilitätsprüfung vor (Ablehnung, wenn alle Werte der Kategorie-Spalte wie ein ISO-Datum aussehen) und setzte sie ausschließlich in `tools/upload-dienst/server.js` um, nicht im gemeinsamen Parser-Kern. Auf die Nutzerfrage, warum das besser sei als eine Parser-Änderung, begründete Claude dies mit dem Regressionsrisiko für alle bestehenden, bereits produktiven Charts sowie der Unterscheidung zwischen syntaktischer Gültigkeit (Parser-Aufgabe) und Aufnahme-Plausibilität (Upload-Aufgabe). Nach einem kurzen Portkonflikt (der Nutzer hatte noch eine eigene Instanz laufen) bestätigte ein erneuter Testlauf den Fix (12 von 12 Prüfungen grün).

### Erste Übergabe an das steuernde LLM

Auf Wunsch des Nutzers erzeugte Claude über den Skill `/uebergabe` eine strukturierte Zusammenfassung für den steuernden Faden, hielt einen Breadcrumb im Session-Log fest und benannte als wiederkehrendes Muster: Zweimal in dieser Kette wurde eine „keine Heuristik"-Vorgabe aus der Planung nach echtem Praxiskontakt wieder aufgehoben (die zweite Instanz folgte später in APP-DATA-03a).

### APP-DATA-03a — Lokaler Offline-Prüfer

Auftrag: einen ohne Server laufenden, per Doppelklick startbaren CSV-Prüfer unter `content/files/app-data/` bauen — ein zu diesem Zeitpunkt entdecktes, vom Code-Repository getrenntes eigenständiges Git-Repository. Umgesetzt wurden ein Namensvertrag (Kleinschreibung, `ä/ö/ü/ß`-Ersetzung, danach nur ASCII/`-`/`_`/`.csv`), eine Konfliktprüfung vor jeder Umbenennung (bei Kollision keinerlei Umbenennung, ganzer Lauf blockiert — eine bewusst konservative, offen benannte Auslegung einer mehrdeutigen Formulierung), sowie ein SHA-256-basierter Zustand zum Überspringen unveränderter Dateien. Die Datenform wurde zu diesem Zeitpunkt noch manuell in `csv-contract.json` deklariert.

Der zugehörige automatisierte Test (`tests/csv-validator.test.mjs`, 11 Nachweise in isolierten Temp-Ordnern) deckte einen eigenen Fehler auf: Eine Testassertion nutzte `fs.existsSync()` case-sensitiv, was unter Windows/NTFS grundsätzlich nicht möglich ist — der Prüfer selbst hatte korrekt gearbeitet, der Test war falsch. Nach Korrektur der Assertion liefen alle Nachweise grün.

### Richtungswechsel: automatische statt manueller Datenform-Erkennung

Nach einem eigenen Testlauf lehnte der Nutzer die manuelle JSON-Pflege ausdrücklich ab („Menschen, die was in JSON eintragen, machen nur Fehler") und verlangte, der Prüfer solle beide Interpretationen automatisch testen und je Datei genau einen Treffer melden. Claude identifizierte einen strukturellen Mechanismus, der „nie beide Formen zugleich grün" garantiert, ohne geraten zu werden: Eine gültige Zeitreihe erzwingt über den bestehenden GATEKEEPER zwingend durchgängig echte ISO-Daten in Spalte 1; die Snapshot-Prüfung schließt genau diesen Fall explizit aus. `csv-contract.json` wurde damit von einer Eingabedatei zu einem automatisch geschriebenen Ergebnisprotokoll. Der Testsatz wurde angepasst (zwei der ursprünglich elf Nachweise entfielen, ein neuer Nachweis für die Ausschließlichkeit kam hinzu); alle liefen grün. Ein anschließender Live-Test des Nutzers mit einer echten Datei (`world-acwi-em.csv`) bestätigte die Funktion; eine begleitende Node-ESM-Warnmeldung wurde als unschädlich eingeordnet.

Der Nutzer forderte danach zweimal einen formalisierten Bericht: einmal als erneute `/uebergabe`-Zusammenfassung mit Fokus auf das Delta zum ursprünglichen Auftrag, einmal als eigenständige, committete Ergebnisdatei unter `docs/steering/patches/` plus einen kurzen Verweissatz für den steuernden Faden. Dieses Zwei-Teile-Muster (Patches-Bericht + Verweissatz) wiederholte sich danach nach jedem weiteren Auftrag.

### APP-DATA-03b — Rückbau des Upload-Diensts

Nach Abnahme des Offline-Prüfers wurde der HTTP-Upload-Dienst als verworfener Architekturpfad eingestuft und sollte kontrolliert entfernt werden. Eine Vorprüfung fand keine aktive Laufzeitreferenz außerhalb historischer Patch-Dokumente, aber einen tatsächlich lauschenden Prozess auf Port 4790; dessen Kommandozeile wurde per PowerShell verifiziert, bevor ausschließlich diese PID beendet wurde. Claude bat vor der eigentlichen Löschung ausdrücklich um Bestätigung („Ja, mache das, das ist ok").

Der folgende Löschversuch geriet in eine Sackgasse: `rm -rf tools/upload-dienst` wurde von der Berechtigungsprüfung blockiert. Auf Nachfrage entschied sich der Nutzer, den Ordner selbst zu leeren; das verbleibende leere Verzeichnis ließ sich weder über `rmdir` noch über PowerShells `Remove-Item` entfernen („Device or resource busy" — vermutlich ein noch offenes Explorer-Fenster). Der Nutzer beendete die Sackgasse pragmatisch: „Wenn der Ordner nicht gelöscht werden kann, halten wir uns nicht damit auf." Das leere Verzeichnis blieb bewusst bestehen. Die übrigen Schritte (Bereinigung des zugehörigen `.gitignore`-Eintrags, Negativ-/Positivnachweise) liefen wie geplant; der Abschlussstatus wurde wegen der stehengebliebenen leeren Verzeichnisleiche als GELB statt GRÜN eingestuft.

### APP-DATA-04a — Vertrag für ein neues Card-Attribut `data-app-file`

Reiner Analyse-Auftrag, diesmal mit vollständiger Lektüre von `ChartEngine.js`. Festgelegt wurden ein kanonischer Namensvertrag (identisch zum Offline-Prüfer), eine feste URL-Ableitung (`/content/files/app-data/<name>.csv`), gegenseitige Exklusivität zu `data-csv`, sowie der Nachweis, dass die neue relative URL den bestehenden Gatekeeper unverändert passiert und die `expectDate`-Polymorphie (Linie/Balken vs. Torte) automatisch erhalten bleibt, weil beide Attribute in denselben Codepfad münden. Eine Grep-Suche bestätigte, dass die Engine keinerlei Kenntnis vom Zustand des Offline-Prüfers braucht oder hat.

### APP-DATA-04b — Umsetzung von `data-app-file`

Der Nutzer erteilte die Freigabe mit einer expliziten Abweichung vom vorgeschlagenen Auslieferungsplan: kein `npm run css:build`, da keine CSS-Datei geändert wurde — nur Theme-ZIP bauen und über Ghost Admin hochladen. Die Änderung selbst blieb auf einen einzigen Codeblock in `ChartEngine.js._processContainer()` begrenzt. Da die Engine eng an echtes DOM gekoppelt ist, wurde die neue Validierungs-/Exklusivitätslogik nicht end-to-end, sondern isoliert in Node nachgebaut und gegen 17 Fälle geprüft (inkl. aller im Auftrag genannten unzulässigen Namensformen). Eine neue Testseite `tests/engine/app-file.test.html` wurde angelegt, mit einem ausdrücklichen Hinweis, dass die Positivfälle nur bei Auslieferung durch echtes Ghost aussagekräftig sind. Zwei zusätzliche Test-CSVs wurden in den lokalen (repository-externen) Ghost-Laufzeitordner kopiert; eine dritte Datei lag dort bereits aus einem früheren Test des Nutzers. Die Theme-ZIP wurde ohne `src/`-Verzeichnis gebaut und auf korrekte interne Struktur geprüft.

Beim ersten echten Test durch den Nutzer trat ein Fehler auf einer realen Ghost-Page (`/index-vergleich/`) auf: `data-csv="world-acwi-em.csv"` löste den GATEKEEPER-Fehler „URL nicht erlaubt" aus. Claude stellte klar, dass dies kein Code-Fehler war — `data-csv` akzeptiert grundsätzlich nur vollständige Pfade, nie einen bloßen Dateinamen, unverändert seit vor diesem Auftrag — und nannte die Korrektur: `data-app-file="world-acwi-em.csv"` anstelle von `data-csv`. Der Nutzer bestätigte danach den erfolgreichen Chart-Aufbau.

### APP-DATA-05 und 05a — Dokumentationskonsolidierung

Der letzte Auftrag verlangte, die gesamte aktive Projektdokumentation auf den erreichten Stand nachzuziehen, plus einen selbsttragenden „Sechs Monate später"-Abschnitt für den Wiedereinstieg ohne Chat-Kontext. Claude prüfte vor einer Subagenten-Delegation die drei Wirtschaftlichkeitsfragen der Subagent-Policy, entschied sich dagegen (die meisten Pflichtquellen waren aus dem Faden bereits bekannt, die verbleibende Stichwortsuche ließ sich direkt mit dem Grep-Werkzeug ebenso schnell erledigen) und begründete dies sichtbar. Eine Suche über acht Stichworte (`data-csv`, `data-app-file`, `app-data`, `upload-dienst`, `4790`, `FileZilla`, `financial-chart-module`, `CSV`) ergab, dass keiner der neuen Begriffe außerhalb der eigenen Patch-Dokumente in der aktiven Dokumentation vorkam.

Neu angelegt wurde `docs/editorial/CSV-APP-DATEN-WORKFLOW.md` als kanonische Ablaufseite inklusive des geforderten Sechs-Monate-Abschnitts. Neun bestehende aktive Dokumente wurden nachgezogen (Redakteurs-Handbuch, Cheat-Sheet, Autorenleitfaden, App-Interface-Spec, Theme-Integrations-Tech-Spec, App-Fabrik-Standard-Entwurf, Regressionsregeln, Testseiten-Standard, Navigationsdatei); dabei fielen im bearbeiteten Abschnitt der Theme-Integrations-Spec drei bereits länger defekte Pfadverweise auf, die im selben Zug korrigiert wurden. Historische Patch-, Ergebnis-, Audit- und Archivdokumente blieben unverändert. Drei abschließende Suchen bestätigten: alle produktiven Beispiele nutzen `data-app-file`; verbleibende `data-csv`-Belege sind als Fixture gekennzeichnet oder liegen im Archiv; keine aktive Anweisung verweist noch auf den zurückgebauten Dienst oder Port 4790. Ein `git status` bestätigte, dass in diesem Auftrag ausschließlich Dokumentationsdateien verändert wurden.

## Wendepunkte

- Der Fund der Snapshot-Plausibilitätslücke durch den eigenen Test des Nutzers in APP-DATA-02 führte zu einem gezielten, bewusst nicht im gemeinsamen Parser platzierten Fix.
- Die Ablehnung der manuellen `dataForm`-Pflege durch den Nutzer nach dem ersten echten Testlauf des Offline-Prüfers kehrte die ursprüngliche „keine Heuristik"-Architekturvorgabe explizit um und führte zur automatischen, strukturell eindeutigen Erkennung.
- Der gescheiterte `rm -rf`/`rmdir`-Versuch in APP-DATA-03b beendete sich nicht durch technische Lösung, sondern durch eine pragmatische Entscheidung des Nutzers, die Restabweichung zu akzeptieren.
- Der Bedienfehler `data-csv` statt `data-app-file` auf der echten Ghost-Page in APP-DATA-04b klärte sich als Attributverwechslung, nicht als Implementierungsfehler.

## Entscheidungen und Festlegungen

- Gemeinsamer Parser-Kern `parseCsvText()`, aus `CSVParser.js` extrahiert, ohne Verhaltensänderung — gültig, Bestandteil aller Folgeschritte.
- `.claude/PROTECTED_PATHS.json`-Eintrag für `CSVParser.js`: temporär auf `protected` herabgestuft für die Extraktion, danach auf ausdrückliche Anweisung wieder auf `forbidden` zurückgestuft — gültig im Ausgangszustand.
- Snapshot-Plausibilitätsprüfung (ISO-Datums-Ausschluss) lebt ausschließlich im Upload-Dienst-Code, nicht im gemeinsamen Kern — gültig zum Zeitpunkt der Umsetzung, wurde mit dem Rückbau des Upload-Diensts in APP-DATA-03b gegenstandslos, da derselbe Mechanismus im Offline-Prüfer unabhängig neu gebaut wurde.
- HTTP-Upload-Dienst auf Port 4790: gebaut, getestet, dann vollständig verworfen und zurückgebaut — ersetzt durch den Offline-Prüfer.
- Datenform-Erkennung: von manueller Vertragsdatei zu automatischer, struktureller Erkennung geändert — gültiger Endstand.
- `data-app-file` als produktives Ghost-Card-Attribut eingeführt, `data-csv` bleibt exklusiv als Test-/Fixture-Adapter bestehen — gültiger Endstand, in der Dokumentation nachgezogen.

## Irrwege, Schleifen und verworfene Ansätze

- Der Versuch, die Tabu-Zonen-Sperre für `CSVParser.js` durch ein rein mündliches Override ohne Dateiänderung zu umgehen, scheiterte an der mechanischen Natur des Pre-Edit-Hooks und musste durch eine tatsächliche, dokumentierte Herabstufung ersetzt werden.
- Die manuelle `csv-contract.json`-Pflege aus APP-DATA-03a wurde nach echtem Nutzertest vollständig verworfen und durch automatische Erkennung ersetzt; die Datei blieb bestehen, änderte aber ihre Rolle von Eingabe zu Ausgabe.
- Der gesamte HTTP-Upload-Dienst (APP-DATA-01/02) wurde nach Fertigstellung und Abnahme als Architekturpfad verworfen, nicht weil er fehlerhaft war, sondern weil der Offline-Prüfer als der geeignetere Weg bewertet wurde.
- Die direkte Bash-Löschung (`rm -rf`) und danach auch die PowerShell-Alternative (`Remove-Item`) für das leere `tools/upload-dienst/`-Verzeichnis scheiterten; der Weg wurde nicht weiterverfolgt, sondern die Restabweichung dokumentiert und akzeptiert.

## Erzeugte Artefakte

- `Theme/assets/js/fw-chart-engine/data/CSVParser.js` — erweitert um Export `parseCsvText()`; Endstand final.
- `tools/upload-dienst/` (Server, Konfiguration, Startskript, Oberfläche) — final gebaut, vollständig wieder entfernt (Ordnerleiche als Restabweichung).
- `content/files/app-data/csv-validator.mjs`, `csv-contract.json`, `pruefe-csv.bat` — final, aktiver Produktivweg am Ende des Fadens.
- `tests/csv-validator.test.mjs` — final, 11 automatisierte Nachweise.
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` — final erweitert um `data-app-file`-Logik.
- `tests/engine/app-file.test.html` — final, inkl. Hinweis auf Ghost-Abhängigkeit der Positivfälle.
- `docs/editorial/CSV-APP-DATEN-WORKFLOW.md` — neu, final, kanonische Ablaufseite.
- Neun weitere Dokumentationsdateien — final auf den Endstand nachgezogen.
- Mehrere Ergebnisberichte unter `docs/steering/patches/` (u. a. zu APP-DATA-03b, APP-DATA-04b) sowie ein zusammenfassender Übergabeprompt für den steuernden Faden — final, dienen der Weitergabe an andere Fäden.

## Sachliche Erkenntnisse

- Gesicherter Stand: Eine relative, mit `/` beginnende URL passiert den bestehenden Domain-Gatekeeper unabhängig von Produktions- oder lokaler Umgebung — Grundlage für die feste `data-app-file`-URL-Ableitung.
- Gesicherter Stand: `fs.existsSync()` ist unter Windows/NTFS case-insensitiv; case-sensitive Testannahmen darauf sind grundsätzlich fehleranfällig.
- Gesicherter Stand: Eine gültige Zeitreihe (durchgängig ISO-Daten) und ein gültiger Snapshot (Kategorie-Spalte ohne durchgängige ISO-Daten) schließen sich durch die bestehende Parser-Logik strukturell gegenseitig aus — Grundlage der automatischen Datenform-Erkennung.
- Arbeitsannahme, offen gelassen: Bei einem Kanonisierungs-Konflikt blockiert der Offline-Prüfer den gesamten Umbenennungslauf, nicht nur die konfliktbehafteten Dateien — als bewusst konservative Auslegung einer mehrdeutigen Auftragsformulierung benannt, nicht abschließend vom Nutzer bestätigt.
- Spätere Korrektur: Die ursprüngliche Annahme, Datenform müsse explizit deklariert werden („keine Heuristik"), wurde nach echtem Nutzungstest revidiert.

## Offene Punkte am Ende

- Das leere Verzeichnis `tools/upload-dienst/` ließ sich technisch nicht entfernen und blieb auf Nutzerentscheidung bestehen.
- Die konservative Interpretation der Konflikt-Umbenennungsregel im Offline-Prüfer wurde benannt, aber nicht ausdrücklich vom Nutzer bestätigt oder korrigiert.
- Die Umstellung bestehender, noch mit `data-csv` arbeitender produktiver Ghost-Cards auf `data-app-file` ist ausdrücklich nicht Teil dieses Fadens und bleibt künftige Redaktionsarbeit.
- Ein möglicher Folgeschritt (`data-app-file`-Rollout auf weitere Cards) wurde als Vorschlag, nicht als Entscheidung, an den steuernden Faden weitergegeben.
- Offene, schon vor diesem Faden bestehende Fragen zu doppelten CSV-Headern und abweichenden Spaltenzahlen im Parser wurden mehrfach als bewusst unverändert benannt, aber in keinem Schritt dieses Fadens entschieden.

## Analysefähige Rohmuster

- Für spätere Musteranalyse vormerken: Zweimal wurde eine in einem vorgelagerten Planungsfaden getroffene „keine Heuristik/keine Automatik"-Entscheidung erst nach echtem Praxiskontakt des Nutzers mit dem laufenden System revidiert (Snapshot-Plausibilität in APP-DATA-02, Datenform-Erkennung in APP-DATA-03a).
- Für spätere Musteranalyse vormerken: Mechanische Sicherheits-Hooks (Pre-Edit-Hook auf `PROTECTED_PATHS.json`, Bash-Berechtigungsprüfung bei `rm -rf`) ließen sich nicht durch ausdrückliche mündliche Nutzerfreigabe umgehen, sondern erforderten jeweils eine dem Hook sichtbare, dokumentierte Zustandsänderung.
- Für spätere Musteranalyse vormerken: Nach mehreren umsetzungsstarken Aufträgen etablierte sich ohne expliziten Auftrag ein wiederkehrendes Abschlussmuster — ein committeter Ergebnisbericht unter `docs/steering/patches/` plus ein kurzer Verweissatz für den steuernden Faden.

## Bewusst ausgelassen

Die vollständigen Neun-Fragen-Full-Gate-Dialoge vor jedem umsetzenden Auftrag wurden nicht einzeln wiedergegeben, ebenso wenig die vollständigen Dateilisten der jeweils gelesenen Pflichtquellen, der genaue Wortlaut aller Konsolenausgaben automatisierter Testläufe, und wiederholte, inhaltsgleiche Bestätigungen einzelner Zwischenschritte ohne eigene Verzweigungswirkung.
