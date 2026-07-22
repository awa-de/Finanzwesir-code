---
chronik_id: CHRONIK-2026-07-22-rubikon-json-eingabe-kern
datum: 2026-07-22
projekt: finanzwesir-2-0
thema: rubikon-json-eingabe-kern
beteiligte: [nutzer, claude]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [tooling-problem, sackgasse, durchbruch, annahme-verworfen]
---

# Chronik: Rubikon-V4-Übernahme, Konsolen-Hotfix und JSON-Eingabe-Tool-Kern

**Hauptgegenstand:** Drei aufeinanderfolgende, vom Nutzer als Handover-Dateien vorgelegte Aufträge zum Rubikon-Textfeld der App `prokrastinations-preis`: Übernahmeprüfung eines vorgefundenen V4-Standes, ein Windows-Konsolen-Encoding-Hotfix für das Bearbeitungswerkzeug, und schließlich eine Neuarchitektur dieses Werkzeugs als wiederverwendbarer Mechanik-Kern mit einem ersten Fachprofil.

## Ausgangslage

Der Faden begann mit `/start` im WARM-START-Modus (Fortsetzung eines bereits laufenden Tagesfadens, 2026-07-22). Fokus laut Hook-Output: „Ghost-Feed-Resolver-Vertrag GHOST-05–09 ✅ + Theme-Bootstrapper/CSS-Reparatur-Kette ✅". Direkt danach legte der Nutzer den ersten von drei Handover-Aufträgen aus `Archiv/local/muss noch eingeordnet werden/` vor, jeweils mit der Anweisung, die Datei vollständig zu lesen, den Auftrag exakt auszuführen und keine Folgearbeit zu beginnen.

## Chronologischer Verlauf

### Phase 1 — Rubikon-V4-Übernahmeprüfung (`HANDOVER_CLAUDE_RUBIKON_V4_UEBERNAHME_ABSCHLUSS_C1.md`)

Der Auftrag verlangte, einen bereits uncommittet vorliegenden Arbeitsstand (laut Dateikopf von einem parallelen Codex-Faden erzeugt) kritisch gegen einen definierten Sollzustand zu prüfen: ein eingeschränktes Markdown-Feld `rubikon.long`/`rubikon.short` in `stations-de.json`, gerendert als sicheres DOM auf Screen 4, mit einem lokalen Bearbeitungswerkzeug (`bearbeite-rubikon-text.bat`/`.ps1`). Da es sich um App-Arbeit mit mehreren betroffenen Dateien handelte, wurde zunächst das Full-Gate-Protokoll (App-Arbeit ist laut CLAUDE.md immer Full-Gate) durchlaufen: Pflichtquellen gelesen (`STATIONS_CONFIG_CONTRACT.md`, `APP_SPEC.md`, `JSON-APP-DATEN-WORKFLOW.md`, `APP-INTERFACE.md`, `01_DECISION_LOG.md`, `SECURITY-BASELINE.md`), danach der tatsächliche Stand aller im Write-Scope genannten Dateien per Diff und Byte-Vergleich (SHA-256) geprüft.

Alle geforderten Nachweise wurden ausgeführt: die neue Parser-/Testdatei `tests/prokrastinations-rubikon-content.test.mjs`, `json-validator.test.mjs`, `json-parser.test.mjs`, `csv-validator.test.mjs`, der Offline-Validator, `npm run css:build` sowie `python tools/check-test-pages.py`. Der Auftrag hatte für Letzteres explizit vor einer möglichen Laufzeitüberschreitung durch repositoryweite Archiv-Discovery gewarnt — der Lauf dauerte tatsächlich nur rund eine Minute und lieferte `TESTSEITEN-STRUKTUR: GRUEN`. Ergebnis der Prüfung: der vorgefundene Stand erfüllte den Sollzustand vollständig; es wurde nichts korrigiert. Offen blieb, dass das interaktive `ReadKey`-Eingabewerkzeug nur durch Code-Lektüre, nicht durch einen echten Lauf geprüft worden war — dies wurde als Lücke benannt, nicht verschwiegen.

### Phase 2 — Windows-Konsolen-Hotfix (`HANDOVER_CLAUDE_RUBIKON_EDITOR_WINDOWS_KONSOLE_HOTFIX_C1.md`)

Der zweite Auftrag benannte einen realen, vom Nutzer beobachteten Fehler: Umlaute im Editor erschienen beschädigt (`AbsÃ¤tze` statt `Absätze`), und das Konsolenfenster schloss sich nach Programmende sofort, sodass Erfolgs- oder Fehlermeldungen nicht lesbar waren. Ursache laut Auftrag: eine BOM-lose UTF-8-`.ps1`-Datei wird von Windows PowerShell 5.1 (`powershell.exe`) als ANSI-Codepage interpretiert. Da mehrere Dateien betroffen waren (`.ps1`, `.bat`, ein Doku-Dokument), wurde erneut ein Full-Gate mit den neun Standardfragen durchlaufen und auf explizites „ok, setze um" gewartet.

Umgesetzt wurden: `[Console]::InputEncoding` zusätzlich zu `OutputEncoding` gesetzt; das `.ps1` mit UTF-8-BOM neu gespeichert (Byte-Nachweis `EF BB BF`); die Hilfetexte um die L/K-Bedeutung (Desktop/Tablet vs. Mobil, CSS-Breakpoint 480 px) und die exakte Abschlussformulierung ergänzt; in der `.bat` `chcp 65001` vor dem Start und `pause` danach ergänzt — Letzteres deckte Erfolgs-, Abbruch- und Fehlerfall einheitlich ab, ohne die drei separaten Exit-Pfade im `.ps1` selbst anfassen zu müssen. `docs/editorial/JSON-APP-DATEN-WORKFLOW.md` wurde entsprechend nachgezogen (Version 1.1.0 → 1.1.1). Alle Nachweise (Byte-Prüfung, PowerShell-Syntaxprüfung, Offline-Validator, `git diff --check`) liefen grün.

### Phase 3 — JSON-Eingabe-Tool-Grundlage (`HANDOVER_CLAUDE_JSON_EINGABE_TOOL_GRUNDLAGE_C3.md`, ersetzt C1/C2 vollständig)

Der dritte Auftrag ersetzte die beiden vorherigen (anders benannten) Handover-Dateien `HANDOVER_CLAUDE_RUBIKON_MARKDOWN_UEBERSCHRIFTEN_HOTFIX_C1.md` und `HANDOVER_CLAUDE_RUBIKON_EDITOR_EINGABEKOMFORT_C2.md` „vollständig und vor Ausführung" — diese wurden nicht gelesen, da der neue Auftrag als vollständig in sich beschrieben galt. Ziel war eine Architekturtrennung: ein allgemeiner, wiederverwendbarer PowerShell-Mechanik-Kern (`json-eingabe-tool-core.psm1`) für Mehrzeileneingabe, Abschlussgeste und atomare Schreib-/Rollback-Logik, darüber ein dünnes Rubikon-Fachprofil (`bearbeite-rubikon-text.ps1`). Zusätzlich sollte der gemeinsame JS-Inhaltskern (`prokrastinations-preis-rubikon-content.js`) so korrigiert werden, dass eine Überschriftszeile direkt gefolgt von normalem Text (ohne Leerzeile) nicht mehr abgelehnt wird. Erneut Full-Gate mit neun Fragen, erneut auf explizites „ok,. setze um" gewartet.

Die Umsetzung erfolgte in mehreren Schritten: Der JS-Parser wurde von einer einfachen Schleife über leerzeilengetrennte Blöcke auf eine Arbeitswarteschlange umgestellt, die eine erkannte Überschriftszeile immer als eigenen Block abtrennt und den Rest erneut einreiht — verifiziert per Node-Testlauf direkt im Terminal, bevor die formalen Tests geschrieben wurden. Der neue PowerShell-Kern wurde angelegt (`Set-JsonEingabeConsoleEncoding`, `Read-JsonEingabeMultilineText`, `Invoke-JsonEingabeCommit`), das Rubikon-Profil zu einem dünnen Adapter umgebaut, der den Kern per `Import-Module` einbindet; der Hauptfluss wurde in eine Funktion `Invoke-RubikonEditorMain` gekapselt, die nur bei direktem Start läuft (Prüfung auf `$MyInvocation.InvocationName -ne '.'`), damit die reine Normalisierungsfunktion beim Dot-Sourcing für Tests nicht den interaktiven Ablauf auslöst.

Ein Smoke-Test der neuen `Invoke-JsonEingabeCommit`-Funktion deckte einen bis dahin unbemerkten Fehler auf: `[System.IO.File]::Replace($quelle, $ziel, $null)` warf unter der laufenden Windows-PowerShell-5.1-Version (`5.1.22621.6133`) zuverlässig „Der Pfad hat ein ungültiges Format" — auch mit `[string]$null` oder der Vier-Parameter-Überladung. Isoliertes Nachstellen in einem separaten Debug-Skript bestätigte: Mit einem echten (statt `$null`) Backup-Pfad als drittem Argument funktionierte der Aufruf. Da genau dieses `$null`-Muster im Originalcode aus Phase 1/2 verwendet worden war, folgte daraus, dass die atomare Schreiblogik dort nie tatsächlich einen Schreibvorgang erfolgreich abgeschlossen hatte — unbemerkt, weil nie interaktiv end-to-end getestet. Der Kern wurde entsprechend korrigiert (echte, im `finally`-Block aufgeräumte Backup-Pfade).

Anschließend wurden Tests ergänzt: neue Fälle in `tests/prokrastinations-rubikon-content.test.mjs` (Überschrift direkt vor Absatz/Liste, zwei Überschriften in Folge — Letzteres als bewusste, über den engen Auftragswortlaut hinausgehende Generalisierung explizit benannt, nicht verschwiegen) sowie eine neue, nicht-interaktive PowerShell-Testdatei (`tests/json-eingabe-tool-core.test.ps1`), die Normalisierung, die Abwesenheit von `Read-Host`/`Invoke-Expression` im Kern, sowie Erfolgs-, Validierungsfehler- und Schreibfehler-mit-Rollback-Szenarien gegen temporäre Kopien prüft (Schreibfehler erzwungen über ein `IsReadOnly`-Attribut auf der Zieldatei). Ein erster Versuch, den Test für „vier Pflichtparameter" per Regex zu schreiben, schlug fehl und wurde durch eine einfachere Textsuche ersetzt.

Beim Bau des Theme-V5-ZIPs zeigte sich ein zweiter, unabhängiger Fund: `Compress-Archive` erzeugte Zip-Einträge mit Backslash-Pfadtrennern (`assets\css\screen.css`) statt der ZIP-Standard-Vorwärtsslashes — ein Umstieg auf `[System.IO.Compression.ZipFile]::CreateFromDirectory` änderte daran nichts, da beide Wege unter dem hier laufenden .NET Framework denselben Trenner verwenden. Da ein Linux-Ghost-Server dies als wörtlichen Dateinamen mit Backslashes statt als Verzeichnisstruktur interpretiert hätte, wurde das ZIP stattdessen manuell über `ZipArchive`/`CreateEntryFromFile` mit explizit auf `/` normalisierten Eintragsnamen gebaut. Ein erster Korrekturversuch scheiterte dabei erneut: Die Ersetzung des Staging-Verzeichnispfads im Eintragsnamen per String-`Substring`-Längenberechnung ging fehl, weil `$env:TEMP` den kurzen 8.3-Pfad (`ALBERT~1`) lieferte, während `Get-ChildItem().FullName` den langen Pfad zurückgab — beide Formen unterschieden sich in der Zeichenlänge. Die Korrektur bestand darin, das Staging-Verzeichnis vorab über `(Get-Item ...).FullName` auf die lange Form aufzulösen und den Abgleich per `Replace` statt Index-Arithmetik durchzuführen.

Alle Nachweise (vier Testsuiten, Byte-Nachweis BOM/kein-BOM, PowerShell-Syntaxprüfung, `git diff --check` in beiden Repositories, ZIP-Struktur- und SHA-256-Nachweis) liefen am Ende grün; keine der echten `stations-de.json`-Kopien wurde in einem Testlauf verändert.

### Phase 4 — Bestätigung und Dokumentation

Der Nutzer bestätigte nach eigenem manuellem Test knapp: „Klappt alles ist grün." Daraufhin wurden zwei Projekt-Gedächtniseinträge angelegt (PowerShell-/.NET-Fallstricke; Architektur des JSON-Eingabe-Tool-Kerns) und im Gedächtnis-Index verlinkt. Anschließend wies der Nutzer an, alle im Faden gegebenen Abschlussmeldungen in eine Datei unter `docs/steering/patches/` zu sammeln, danach den Chronik-Prompt auszuführen, die Chronik zu prüfen und das Abschlussritual durchzuführen — die vorliegende Chronik ist Teil dieser Abschlusskette.

## Wendepunkte

- Der Fund, dass `File.Replace(..., $null)` unter der lokalen PowerShell-5.1-Version fehlschlägt, änderte die Bewertung des in Phase 1/2 vorgefundenen bzw. gebauten Standes rückwirkend: Die dort implementierte „atomare Schreiblogik" hatte nie tatsächlich geschrieben.
- Der Fund der Backslash-Zip-Pfade während des V5-ZIP-Baus verhinderte ein ZIP, das auf einem Linux-Ghost-Server beim Entpacken die Theme-Struktur zerstört hätte.

## Entscheidungen und Festlegungen

- **Full-Gate für alle drei Aufträge, kein Verzicht trotz expliziter „exakt ausführen"-Anweisung** · durchgehend · Begründung: App-Arbeit bzw. Mehrdateien-Änderung lösen laut CLAUDE.md immer Full-Gate aus, unabhängig vom Wortlaut der Nutzeranweisung · Status: gültig, in allen drei Phasen angewendet.
- **Mechanik-Kern (`json-eingabe-tool-core.psm1`) kennt keine Rubikon-/Markdown-Fachlogik, nimmt nur explizite Parameter/Scriptblocks entgegen** · Phase 3 · Begründung: Auftrag verlangte harte Trennung Kern/Profil, kein Universalformular vorwegbauen · Status: gültig, per Testfall verifiziert.
- **Generalisierung „zwei Überschriften direkt hintereinander" im JS-Parser zusätzlich zu „Überschrift vor Absatz" akzeptiert** · Phase 3 · Begründung: natürliche Folge derselben Abtrennungslogik · Status: gültig, aber ausdrücklich als über den engen Auftragswortlaut hinausgehend gekennzeichnet, nicht als reine Auftragsumsetzung.
- **Backup-Pfade statt `$null` bei `File.Replace`** · Phase 3 · Begründung: einzige gefundene funktionierende Variante unter der lokalen PS-5.1-Version · Status: gültig, per Testfall verifiziert.
- **ZIP-Einträge manuell mit Vorwärtsslash statt über `Compress-Archive`/`ZipFile.CreateFromDirectory`** · Phase 3 · Begründung: beide Standardwege lieferten hier Backslash-Pfade · Status: gültig, per Struktur-Listing verifiziert.

## Irrwege, Schleifen und verworfene Ansätze

- **`## Ueberschrift darf nur eine Zeile haben`-Regel unverändert lassen und stattdessen im PowerShell-Profil Leerzeilen einfügen** wurde nicht verfolgt; stattdessen wurde die Regel im JS-Kern selbst über die Warteschlangen-Umstellung aufgehoben, weil der Auftrag die Blockgrenzen-Korrektur explizit dem Inhaltskern zuwies.
- **`[System.IO.File]::Replace(..., $null)`** wurde zunächst unverändert aus dem Vorgängerstand übernommen, bis ein Smoke-Test den Fehlschlag zeigte; ein Zwischenversuch mit `[string]$null` und der Vier-Parameter-Überladung (`ignoreMetadataErrors`) scheiterte ebenfalls, bevor ein echter Backup-Pfad als funktionierende Lösung gefunden wurde.
- **`Compress-Archive` für das V5-ZIP** wurde verworfen, nachdem Backslash-Pfade auffielen; der direkte Ersatz **`ZipFile.CreateFromDirectory`** zeigte denselben Fehler und wurde ebenfalls verworfen.
- **Relativpfad-Berechnung per `Substring($stagingDir.Length + 1)`** beim manuellen ZIP-Bau scheiterte an einer Kurz-/Langpfad-Diskrepanz von `$env:TEMP`; verworfen zugunsten von `Replace` nach vorheriger Pfadauflösung über `Get-Item`.
- **Test der „vier Pflichtparameter" von `Invoke-JsonEingabeCommit` per komplexem Regex-Split** schlug fehl (Prüfung selbst fehlerhaft, nicht das geprüfte Modul) und wurde durch eine einfachere Substring-/Contains-Prüfung ersetzt.

## Erzeugte Artefakte

- `Theme/assets/js/apps/prokrastinations-preis-rubikon-content.js` — Blockgrenzen-Fix — Status: final (Phase 3).
- `content/files/app-data/json-eingabe-tool-core.psm1` — neu, allgemeiner Mechanik-Kern — Status: final.
- `content/files/app-data/bearbeite-rubikon-text.ps1` — umgebaut zu dünnem Rubikon-Profil, UTF-8-BOM — Status: final.
- `content/files/app-data/bearbeite-rubikon-text.bat` — `chcp 65001` + `pause` ergänzt — Status: final.
- `tests/prokrastinations-rubikon-content.test.mjs` — um Heading/Absatz-Fälle erweitert — Status: final.
- `tests/json-eingabe-tool-core.test.ps1` — neu, nicht-interaktive Kerntests — Status: final.
- `Apps/prokrastinations-preis/STATIONS_CONFIG_CONTRACT.md`, `docs/editorial/JSON-APP-DATEN-WORKFLOW.md` — inhaltlich ergänzt (Heading/Absatz-Regel, Kern/Profil-Hinweis, Versionsnummern erhöht) — Status: final.
- `Theme/finanzwesir-local-theme-prokrastinations-preis-v4.zip` und `-v5.zip` — Status: final, jeweils struktur- und hashverifiziert.
- `docs/steering/patches/PATCH-rubikon-handover-abschlussmeldungen-2026-07-22.md` — Sammlung der drei Abschlussmeldungen — Status: final (Phase 4).
- Zwei Projekt-Gedächtniseinträge (PowerShell-/.NET-Fallstricke; JSON-Eingabe-Tool-Kern-Architektur) — Status: final.

## Sachliche Erkenntnisse

- **Gesicherter Stand:** `[System.IO.File]::Replace(quelle, ziel, $null)` schlägt unter der hier laufenden Windows-PowerShell-5.1-Version (`5.1.22621.6133`) mit „Der Pfad hat ein ungültiges Format" fehl; ein echter Backup-Pfad als drittes Argument funktioniert.
- **Gesicherter Stand:** `Compress-Archive` und `[System.IO.Compression.ZipFile]::CreateFromDirectory` erzeugen unter derselben Umgebung Backslash- statt Vorwärtsslash-Pfade als Zip-Eintragsnamen.
- **Gesicherter Stand:** `python tools/check-test-pages.py` lief im vollen Repository-Scope in ca. einer Minute durch, ohne die im ersten Handover befürchtete Laufzeitüberschreitung.
- **Arbeitsannahme:** Die Generalisierung auf „zwei Überschriften direkt hintereinander" im JS-Parser ist funktional korrekt, war aber nicht ausdrücklich beauftragt.

## Offene Punkte am Ende

- Die interaktive `ReadKey`-Bedienung des Editors wurde in keiner Phase automatisiert getestet; jeweils auf Alberts manuellen Test verwiesen (für Phase 3 durch Rückmeldung „Klappt alles ist grün" bestätigt).
- Content-Repo enthält weiterhin zwei fremde, unveränderte Redaktionsdateien (`Das Finale.md`, `Der Deal.md`) mit vorbestehenden Trailing-Whitespace-Befunden — außerhalb des Scopes aller drei Aufträge, nur gemeldet.
- Kein Commit, kein Staging, kein Ghost-Upload wurde in diesem Faden vorgenommen (durchgehend ausdrücklich ausgeschlossen).

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: In zwei von drei Aufträgen dieses Fadens war die im vorgefundenen bzw. selbst geschriebenen PowerShell-Code enthaltene „atomare Schreiblogik" bzw. „Standard-ZIP-Bauweise" erst nach einem gezielten, nicht ausdrücklich beauftragten Smoke-Test als fehlerhaft erkennbar — beide Male, weil die jeweilige Funktion vorher nie tatsächlich end-to-end (mit echtem Schreibvorgang bzw. echtem Entpacken auf Zielplattform) ausgeführt worden war.

## Bewusst ausgelassen

Ausführliche Tool-Ausgaben (vollständige Testsuiten-Konsolenausgaben, einzelne `git status`/`git diff`-Rohtexte, Zwischenstände der Full-Gate-Antworten in voller Länge) wurden zugunsten der daraus gezogenen Entscheidungen verdichtet. Formulierungsdetails der drei Abschlussmeldungen wurden hier nicht wörtlich wiederholt, da sie bereits vollständig in `docs/steering/patches/PATCH-rubikon-handover-abschlussmeldungen-2026-07-22.md` gesichert sind.
