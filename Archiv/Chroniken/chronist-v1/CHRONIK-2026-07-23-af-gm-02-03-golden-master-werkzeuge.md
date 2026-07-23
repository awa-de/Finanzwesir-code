---
chronik_id: CHRONIK-2026-07-23-af-gm-02-03-golden-master-werkzeuge
datum: 2026-07-23
projekt: finanzwesir-2-0
thema: af-gm-02-03-golden-master-werkzeuge
beteiligte: [nutzer, claude]
typ: chronik
standard: chronist-v1
faden_typ: umsetzung
status_am_ende: teilweise
quellenlage: vollstaendiger-faden
schlagworte: [praezisierung-durch-gegenfrage, richtungswechsel, tooling-problem, annahme-verworfen, durchbruch]
---

# Chronik: Golden-Master-Werkzeugkette AF-GM-02/02b/03 und Protected-Paths-Präzisierung

**Hauptgegenstand:** Der Faden setzte im Rahmen der App-Fabrik (Finanzwesir 2.0) die App-Fabrik-Arbeitspakete AF-GM-02 (Playwright-Chromium-Trace-Recorder/-Verifizierer), AF-GM-02b (Eingabe-/Slider-Aktion) und AF-GM-03 (deterministisches Golden-Master-Eingabepaket-Werkzeug samt Inhaltsgate-Nachputz) anhand vorbereiteter Prompt-Dateien exakt um. Dazwischen lag eine Korrektur an `CLAUDE.md` (Protected-Paths-Lesevertrag) sowie mehrere technische Zwischenfälle beim Browser-Setup. Der Faden endete mit einem Ketten-Minimalabschluss.

## Ausgangslage

Der Faden begann mit `/start` im WARM-START-Modus (bereits laufende Session desselben Tages, 2026-07-23). Laut Hook-Kontext war AF-GM-01 (App-Fabrik-Fundament) abgeschlossen; nächster vorgesehener Schritt war AF-GM-02. Der Nutzer arbeitete die App-Fabrik-Kette über eine Serie einzelner, im Voraus geschriebener Prompt-Dateien unter `Archiv/local/muss noch eingeordnet werden/` ab, die Claude jeweils vollständig lesen und exakt ausführen sollte.

## Chronologischer Verlauf

### AF-GM-02-Preflight
Der Nutzer wies an, `PROMPT_CLAUDE_AF-GM-02_PREFLIGHT_V1.md` zu lesen und auszuführen. Der Auftrag verlangte einen reinen Read-only-Vorlauf (Pflichtquellen lesen, reale Toolumgebung erfassen, Baukarte liefern) und endete zwingend im Status „wartet auf Unlock" — kein Schreiben, keine Installation. Beim Lesen der Toolumgebung sollte laut Auftrag auch `package.json`/`package-lock.json` gelesen werden. Beide Dateien standen in `.claude/PROTECTED_PATHS.json` auf `forbidden`; `CLAUDE.md` definierte an dieser Stelle wörtlich „forbidden: nicht lesen, ändern, verschieben oder löschen". Claude wertete dies als bindenden Lesebann, öffnete die beiden Dateien nicht direkt und ermittelte die nötigen Fakten stattdessen indirekt (`node -v`, `npm -v`, `ls -la`-Metadaten, Verzeichnislisten). Die Baukarte wurde ohne Installation geliefert, Status „wartet auf Unlock".

### Korrektur des Protected-Paths-Lesevertrags
Der Nutzer widersprach der Auslegung: „Das ist zu stark. Lesen geht immer. forbidden = ändern, verschieben oder löschen verboten." Und fragte, wie das geändert werden könne. Claude schlug einen minimalen Diff an `CLAUDE.md` § Protected Paths vor (forbidden erlaubt Lesen, außer der `reason`-Eintrag nennt ein explizites Leseverbot — mit Verweis auf `Active Campaign Liste/`, deren `reason` „Niemals lesen" enthält) und wies darauf hin, dass `CLAUDE.md` selbst in `PROTECTED_PATHS.json` auf `forbidden` steht, ein Unlock also vor der Bearbeitung nötig sei. Nach Zustimmung („ok, setze um") führte Claude Unlock (`CLAUDE.md` `forbidden`→`protected` mit Begründungstext), den Textpatch (inkl. Versionssprung v2.1.3→v2.1.4) und Relock (zurück auf `forbidden`, Original-`reason` wiederhergestellt) durch, jeweils mit Grep-Nachweis verifiziert.

### Fortsetzung des Preflight
Der Nutzer bat, mit dem Originalauftrag fortzufahren, „jetzt ist ja alles lesbar". Claude las `package.json` und `package-lock.json` direkt (nur `@tailwindcss/cli`/`tailwindcss` als bestehende Dev-Abhängigkeiten, kein Playwright, keine Konflikte) und bestätigte die zuvor indirekt ermittelten Befunde. Die Baukarte blieb inhaltlich unverändert, Status weiterhin „wartet auf Unlock".

### AF-GM-02 Unlock/Werkzeug/Relock
Mit `PROMPT_CLAUDE_AF-GM-02_UNLOCK_WERKZEUG_RELOCK_V1.md` war die vollständige Kette freigegeben. Claude entsperrte `package.json`/`package-lock.json` (mit AF-GM-02-spezifischer Begründung), installierte `playwright@1.61.1` exakt als Dev-Abhängigkeit und startete die Chromium-Installation (`PLAYWRIGHT_BROWSERS_PATH=0`) im Hintergrund. Während der Download lief, baute Claude die Werkzeugdateien: `tests/fixtures/golden-master-trace/fixture.html` (Zähler + Button + `data-motion-state`), `tests/golden-master/action-scripts/minimal.actions.json`, `tools/golden-master/behavior-trace.schema.json`, `validate_schema.py`, `record.mjs`, `verify.mjs`, `README.md`.

Der erste Aufnahmeversuch scheiterte mit `browserType.launch: spawn EBUSY`, ein erneuter Versuch kurz darauf mit `browserContext.newPage: Target page, context or browser has been closed`. Zu diesem Zeitpunkt zeigte die Statusabfrage des Hintergrundprozesses trotz sichtbar abgeschlossenem Download (100 % bei allen drei Artefakten) weiterhin „running". Nach Eintreffen der Abschluss-Benachrichtigung (Exit-Code 0) gelang die Aufnahme im nächsten Versuch fehlerfrei.

Anschließend wurden alle geforderten Nachweise real ausgeführt: Aufnahme+Verifikation `normal` und `reduced` (inkl. Beleg, dass `data-motion-state` in beiden Modi tatsächlich unterschiedliche Werte lieferte), drei Negativfälle (manipulierte Aktion → `GM-ERR-STATE-MISMATCH`, fehlender Selector → `GM-ERR-SELECTOR-NOT-FOUND`, Hash-Mismatch → `GM-ERR-HASH-MISMATCH`), Browserartefakt-Größen (≈688,4 MB unter `node_modules/playwright-core/.local-browsers`) sowie Python-Strukturvalidierung. Relock von `package.json`/`package-lock.json` wurde vorbereitet, aber durch die nächste Nutzeranweisung noch vor der Ausführung unterbrochen.

### Zwischenauftrag: lokaler Browserpfad (Nachputz)
Mitten in der laufenden Antwort (vor dem geplanten Relock-Schritt) wies der Nutzer an, zusätzlich `PROMPT_CLAUDE_AF-GM-02_C_LOKALER_BROWSERPFAD_NACHPUTZ_V1.md` auszuführen: Die Chromium-Laufzeit sollte von `node_modules/playwright-core/.local-browsers` (NAS-/Nextcloud-Sync-Pfad `Z:\`) auf einen lokalen, projektgebundenen Pfad `C:\Tools\finanzwesir-playwright\af-gm-02\browsers` umgezogen werden — Browser-Binaries gehörten nicht in den Sync-Pfad. Der erste Installationsversuch über `powershell.exe -Command "$env:PLAYWRIGHT_BROWSERS_PATH = '...'; ..."` innerhalb des Bash-Tools scheiterte: Git Bash interpretierte `$env` als eigene, leere Shell-Variable und reichte nur `:PLAYWRIGHT_BROWSERS_PATH` an PowerShell durch. Der Environment-Variable wurde dadurch nie gesetzt; Chromium wurde stattdessen in den globalen `%USERPROFILE%\AppData\Local\ms-playwright`-Cache heruntergeladen — dieselbe globale Ablage, die der Auftrag ausdrücklich ausschloss. Claude prüfte über Erstellungszeitstempel, dass der gesamte Ordner erst durch diesen fehlerhaften Befehl entstanden war, und entfernte ihn vollständig. Ein zweiter Versuch über eine geschriebene `.ps1`-Datei, aufgerufen mit `powershell.exe -File`, umging das Bash-Escaping-Problem und installierte Chromium korrekt unter dem lokalen Pfad.

`record.mjs`/`verify.mjs` wurden auf ein neues gemeinsames Modul `browser-path.mjs` umgestellt, das `PLAYWRIGHT_BROWSERS_PATH` vor einem dynamischen `import('playwright')` setzt (ein statischer Import hätte das Setzen der Variable durch ESM-Hoisting umgangen) und `chromium.executablePath()` gegen den erwarteten Pfad prüft. Beide Positivnachweise (`normal`, `reduced`) wurden mit dem neuen Pfad wiederholt, das Executable jeweils bestätigt. Erst nach beiden grünen Läufen wurde der alte NAS-Browserordner entfernt (`Test-Path` → `False` bestätigt). Danach wurden die drei Negativnachweise erneut ausgeführt und der ursprünglich unterbrochene Relock-Schritt für `package.json`/`package-lock.json` nachgeholt (Diff auf genau einen neuen `playwright`-Eintrag geprüft).

### AF-GM-03: Eingabepaket-Werkzeuge
Mit `PROMPT_CLAUDE_AF-GM-03_EINGABEPAKET_V1.md` baute Claude die deterministischen Werkzeuge für das Golden-Master-Eingabepaket, ausdrücklich ohne ein echtes Paket für Werkstatt-Mockups und ohne Pilotstart. Es entstanden `generate_package.py` (erzeugt die acht Pflichtdateien eines Eingabepakets aus einer deklarativen Spec, ohne eigene Inhaltserfindung), `validate_package.py` (Struktur-/Hash-/Herkunftsprüfung, verwendet `validate_schema.py` für die enthaltene `behavior-trace.json` mit) und `protected_diff_check.py` (prüft eine Dateiliste gegen `.claude/PROTECTED_PATHS.json`, schlägt bei `forbidden`-Treffern fehl). Als Testgrundlage entstand eine vollständig synthetische Fixture unter `tests/golden-master/fixtures/af-gm-03-synthetic-package/`, die für die Positivprobe ursprünglich die bereits vorhandene AF-GM-02-Spur (`minimal-normal.behavior-trace.json`) wiederverwendete. Positiv- und vier Negativnachweise (fehlendes Acceptance-Feld → `GM03-ERR-MISSING-FIELD`, Source-Hash-Mismatch → `GM03-ERR-HASH-MISMATCH`, `blocked`-Annahmenstatus → `GM03-ERR-ASSUMPTION-BLOCKED`, `forbidden`-Pfad → `GM03-ERR-FORBIDDEN-PATH-TOUCHED`) sowie eine AF-GM-02-Regressionsprüfung wurden ausgeführt und in `AF-GM-03-NACHWEISE.md` dokumentiert.

### AF-GM-03-Inhaltsgate-Nachputz
`PROMPT_CLAUDE_AF-GM-03_INHALTSGATE_NACHPUTZ_V1.md` benannte vier Inhaltslücken des gerade gebauten Werkzeugs: (1) Trace und Abnahmebeleg mussten dasselbe Mockup/denselben Hash binden — bei der Positivfixture war das nicht der Fall, da deren `behavior-trace.json` auf die AF-GM-02-Fixture verwies, während `acceptance.json.mockupPath` auf das eigene `synthetic-mockup.html` zeigte; (2) jeder gelesene Quellpfad musste innerhalb des Repository-Roots liegen, absolute Pfade und `..`-Traversal mussten vor jedem Lesen abgewiesen werden; (3) eine Quelle mit `permitted: false` durfte weder generiert noch validiert werden; (4) `production-plan.md` brauchte vier Pflichtabschnitte.

Claude baute ein gemeinsames Modul `repo_path_guard.py` (Pfad-/Leseschutzgrenze, prüft zusätzlich gegen ein explizites Leseverbot im `reason`-Feld von `.claude/PROTECTED_PATHS.json`) und band es in Generator und Validator ein. Die Trace-/Acceptance-Bindungslücke wurde geschlossen, indem `synthetic-mockup.html` um ein kleines Zähler-/`data-motion-state`-Skript ergänzt und mit dem AF-GM-02-Recorder eine echte, neue Spur gegen diese Datei selbst aufgezeichnet wurde (`af-gm-03-synthetic.behavior-trace.json`) — die Spec verweist seither auf diese Spur statt auf die AF-GM-02-Spur. Weil die drei bereits bestehenden Negativpakete (Acceptance-Feld, Source-Hash, Annahme) noch auf dem alten, nicht gebundenen Positiv-Stand basierten, wurden sie aus dem korrigierten Positiv-Stand neu abgeleitet, damit die neue Trace-Bindungsprüfung ihre jeweils ursprüngliche Fehlerursache nicht vor der eigentlich getesteten überdeckte. Vier neue Negativfälle wurden ergänzt (Trace verweist auf anderes, valides Mockup → `GM03-ERR-TRACE-ACCEPTANCE-MISMATCH`; `../`-Pfad → `GM03-ERR-PATH-OUTSIDE-REPO`; `permitted: false`, geprüft sowohl im Validator als auch im Generator → `GM03-ERR-SOURCE-NOT-PERMITTED`; Produktionsplan ohne `## Tests` → `GM03-ERR-PRODUCTION-PLAN-INCOMPLETE`), zusätzlich ein nicht geforderter Bonus-Smoke-Test des expliziten Lesebanns gegen `Active Campaign Liste/` (`GM03-ERR-SOURCE-READ-FORBIDDEN`).

### AF-GM-02b: Eingabe-/Slider-Aktion
`PROMPT_CLAUDE_AF-GM-02B_EINGABEN_SLIDER_V1.md` verlangte genau eine neue deklarative Aktion `set-input-value` für native `<input>`-Elemente (mindestens `type="number"`/`type="range"`), die den Wert setzt, ein bubbelndes `input`-Event auslöst und danach den tatsächlichen `input.value` als beobachteten Zustand liest. Claude erweiterte Schema, `validate_schema.py`, `record.mjs` und `verify.mjs` entsprechend, ergänzte die neue Fehler-ID `GM-ERR-INPUT-TARGET-INVALID` (kein Treffer bzw. Ziel ist kein `<input>`) und baute eine eigenständige, synthetische Fixture mit einem `input[type=number]` und einem `input[type=range]`, deren `input`-Events jeweils eine sichtbare Textausgabe aktualisieren. Alle neun geforderten Nachweise (Aufnahme+Verifikation, Strukturprüfung, drei Verifizierer-/Struktur-Negativfälle, zwei AF-GM-02-Regressionen, AF-GM-03-Paket-Regression, Browserpfad-Bestätigung) wurden ausgeführt und dokumentiert.

### Ketten-Minimalabschluss
Der Nutzer bat um „nur ein kurzes Abschlussritual für verkettete APs", da der Prozess weiterlief. Claude rief den Skill `abschluss-ritual` auf, bestimmte anhand der Signale (AP fertig, Nachfolge-AP AF-GM-04 aus `BACKLOG.md` bekannt) den Ketten-Minimalabschluss (Pfad B) und führte die Pflichtschritte aus: Eintrag in `.claude/learning/session-log.md`, Anhängen einer AF-GM-02+03-Zeile an `NAVIGATION.md`, Entfernen der AF-GM-02- und AF-GM-03-Zeilen aus `BACKLOG.md` (beim ersten Versuch für AF-GM-02 meldete das Werkzeug zwei Treffer, weil die AF-GM-03-Zeile in ihrer Abhängigkeitsspalte zufällig denselben Substring `| AF-GM-02 |` enthielt — nach Entfernen der AF-GM-03-Zeile war der Treffer eindeutig), Anhängen einer kombinierten Archivzeile an `BACKLOG-ARCHIV.md`, Aktualisierung von `PROJECT-STATUS.md` (Fließtext, rollierendes Meilenstein-Fenster, HOOK-META) und Ausführung des HOOK-META-Validators (grün). Die Commit-Status-Aussage „nicht committed" wurde vor dem Schreiben gegen `git log --oneline -5` geprüft. Der Faden endete mit einer Langformat-Commit-Message als Text, ohne ausgeführten Commit.

## Wendepunkte

- Die Korrektur der `CLAUDE.md`-Formulierung zu `forbidden` (Lesen erlaubt, Ändern/Verschieben/Löschen verboten) veränderte unmittelbar die Fortsetzung des laufenden Preflight-Auftrags: package.json/package-lock.json konnten danach direkt gelesen werden.
- Die vom Nutzer mitten im laufenden AF-GM-02-Werkzeugauftrag eingefügte Anweisung zum lokalen Browserpfad unterbrach den geplanten Relock-Schritt und änderte die technische Ablage der Chromium-Laufzeit sowie den Ladepfad in `record.mjs`/`verify.mjs` nachträglich.
- Der im Inhaltsgate-Nachputz gefundene fehlende Zusammenhang zwischen `behavior-trace.json` und `acceptance.json` in der AF-GM-03-Positivfixture führte dazu, dass die Positivfixture neu aufgezeichnet und alle bereits bestehenden Negativpakete aus dem korrigierten Stand neu abgeleitet wurden.

## Entscheidungen und Festlegungen

- **Protected-Paths-Lesevertrag:** `forbidden` verbietet Ändern/Verschieben/Löschen, nicht Lesen — außer der `reason`-Eintrag nennt ein explizites Leseverbot. Wann im Verlauf: nach dem AF-GM-02-Preflight, auf Nutzerkorrektur. Status am Ende: gültig, in `CLAUDE.md` § Protected Paths umgesetzt.
- **Chromium-Ablageort:** lokal unter `C:\Tools\finanzwesir-playwright\af-gm-02\browsers`, nicht unter `node_modules/playwright-core/.local-browsers` (NAS-/Nextcloud-Sync) und nicht im globalen `ms-playwright`-Cache. Wann im Verlauf: eigener Nachputz-Auftrag während der AF-GM-02-Werkzeugkette. Status am Ende: gültig, hartkodiert in `browser-path.mjs`.
- **Trace-Acceptance-Bindung als Pflichtprüfung:** `behavior-trace.json.referencePath`/`referenceSha256` müssen exakt `acceptance.json.mockupPath`/`mockupSha256` entsprechen, sonst `GM03-ERR-TRACE-ACCEPTANCE-MISMATCH`. Wann im Verlauf: AF-GM-03-Inhaltsgate-Nachputz. Status am Ende: gültig, im Validator umgesetzt.
- **`permitted`-Feld strikt Boolean `true`:** jeder andere Wert stoppt Generator und Validator. Wann im Verlauf: AF-GM-03-Inhaltsgate-Nachputz. Status am Ende: gültig.
- **Nächster Fokus:** AF-GM-04 (erster ausdrücklich abgenommener Golden Master). Wann im Verlauf: beim Ketten-Minimalabschluss festgehalten. Status am Ende: offen, noch kein Mockup von Albert abgenommen.

## Irrwege, Schleifen und verworfene Ansätze

- Der erste Aufnahmeversuch nach der Playwright-Installation scheiterte zweimal mit unterschiedlichen Fehlermeldungen (`spawn EBUSY`, dann `Target page, context or browser has been closed`), bevor der Abschluss des Hintergrund-Installationsprozesses abgewartet und ein dritter Versuch erfolgreich war. Der Zusammenhang zwischen Prozessstatus und den beiden Fehlern wurde nicht abschließend geklärt, sondern als wahrscheinlich transiente Sperre während/kurz nach der Installation eingeordnet.
- Der erste Versuch, `PLAYWRIGHT_BROWSERS_PATH` für die lokale Installation per `powershell.exe -Command "$env:..."` über das Bash-Tool zu setzen, scheiterte an der Interpretation von `$env` durch Git Bash. Chromium wurde dadurch versehentlich in den globalen `ms-playwright`-Cache geladen, was dem Auftrag widersprach; der Ordner wurde nach Zeitstempel-Prüfung vollständig entfernt. Der zweite Versuch über eine `.ps1`-Datei mit `powershell.exe -File` verwarf den Inline-`-Command`-Ansatz zugunsten einer Datei, die von Bash nicht interpretiert wird.
- Die ursprüngliche AF-GM-03-Positivfixture verwendete eine wiederverwendete AF-GM-02-Spur, deren referenzierte Fixture nicht mit dem eigenen `acceptance.json.mockupPath` übereinstimmte. Dieser Ansatz wurde im Inhaltsgate-Nachputz verworfen zugunsten einer eigens gegen `synthetic-mockup.html` aufgezeichneten Spur.

## Erzeugte Artefakte

- `tools/golden-master/record.mjs`, `verify.mjs`, `browser-path.mjs`, `behavior-trace.schema.json`, `validate_schema.py`, `README.md` — final, laufender Stand.
- `tools/golden-master/generate_package.py`, `validate_package.py`, `protected_diff_check.py`, `repo_path_guard.py` — final, laufender Stand.
- `tests/fixtures/golden-master-trace/fixture.html`, `tests/fixtures/golden-master-input-controls/fixture.html` — final, synthetische Testfixtures.
- `tests/golden-master/fixtures/af-gm-03-synthetic-package/` (inkl. `package-spec.json`, `synthetic-mockup.html`, `synthetic-icon.svg`, `synthetic-data.csv`) — final.
- `tests/golden-master/packages/af-gm-03-positive/` sowie mehrere manipulierte Negativpakete unter `tests/golden-master/packages/` — final, Testartefakte.
- `tests/golden-master/evidence/AF-GM-02-NACHWEISE.md` (an mehreren Stellen des Fadens nachgeführt), `AF-GM-03-NACHWEISE.md`, `AF-GM-02B-NACHWEISE.md` — final.
- `.claude/PROTECTED_PATHS.json` — mehrfach temporär entsperrt/gesperrt (Unlock/Relock-Zyklen für `CLAUDE.md` und für `package.json`/`package-lock.json`), Endzustand identisch zum Ausgangszustand vor dem Faden.
- `.claude/CLAUDE.md` — final geändert (§ Protected Paths, Version v2.1.3→v2.1.4).
- `NAVIGATION.md`, `docs/steering/BACKLOG.md`, `docs/steering/BACKLOG-ARCHIV.md`, `PROJECT-STATUS.md`, `.claude/learning/session-log.md` — final aktualisiert im Rahmen des Ketten-Minimalabschlusses.
- Eine Commit-Message im Langformat — als Text ausgegeben, nicht ausgeführt.

## Sachliche Erkenntnisse

- Gesicherter Stand: `chromium.launch()` verwendet standardmäßig im Headless-Modus `chrome-headless-shell`, nicht das vollständige Chrome-for-Testing-Binary (sichtbar am Executable-Pfad in den Playwright-Launch-Logs).
- Gesicherter Stand: Statische ES-Modul-Importe (`import { x } from 'y'`) werden vor jedem anderen Code im selben Modul ausgeführt; das Setzen eines Environment-Vars vor einem `import`-Statement derselben Datei wirkt sich nicht mehr auf dessen Auswertung aus. Ein dynamischer `import()` nach dem Setzen der Variable umgeht das.
- Gesicherter Stand: Git Bash auf Windows interpretiert `$env:VARNAME = 'wert'` (PowerShell-Syntax) als eigene, leere Shell-Variable `$env`, gefolgt vom literalen Text `:VARNAME = 'wert'` — die Variable wird dabei nicht gesetzt. Eine `.ps1`-Datei, per `powershell.exe -File` aufgerufen, ist davon nicht betroffen.
- Arbeitsannahme: Deutsche Sonderzeichen erscheinen in einem Teil der Bash-Tool-Konsolenausgaben dieser Session als `�`; dies wurde als Windows-Codepage-Darstellungsartefakt eingeordnet, nicht als fehlerhafte UTF-8-Kodierung der geschriebenen Dateien — eine unabhängige Verifikation der Ursache erfolgte im Faden nicht.

## Offene Punkte am Ende

- AF-GM-04 (erster ausdrücklich von Albert abgenommener Golden Master) ist der nächste vorgesehene Schritt; es liegt noch kein abgenommenes Mockup mit Acceptance-ID und Hash vor.
- Sämtliche im Faden entstandenen Datei-Änderungen sind nicht committed; die Freigabe zum Commit liegt bei Albert.
- `record.mjs` meldet `GM-ERR-INPUT-TARGET-INVALID` als geworfenen `Error` mit der ID im Nachrichtentext, während `verify.mjs` denselben Fehler als strukturiertes JSON ausgibt — als Stilunterschied zwischen beiden Skripten benannt, nicht behoben.
- Die Ursache der beiden ersten Aufnahme-Fehlschläge (`EBUSY`, danach `Target page ... closed`) direkt nach der ersten Chromium-Installation wurde nicht tiefer untersucht.

## Analysefähige Rohmuster

- Für spätere Musteranalyse vormerken: Mehrfaches Muster im Faden, dass eine zunächst zu eng gefasste Regelauslegung (Protected-Paths-Lesebann) durch eine kurze, präzise Nutzerkorrektur aufgelöst wurde, statt dass Claude die Interpretation selbst hinterfragte.
- Für spätere Musteranalyse vormerken: Bei jedem der drei „Auftrag exakt ausführen"-Prompt-Dateien wich Claude an mindestens einer Stelle von einer wörtlichen Einzelanweisung ab, wenn diese mit einer bereits bestehenden, generischeren Projektregel kollidierte (z. B. Lesebann, dann später Umsetzung der Regelkorrektur), und benannte die Abweichung jeweils sichtbar statt sie stillschweigend zu vollziehen.
- Für spätere Musteranalyse vormerken: Zwei der drei technischen Zwischenfälle (Bash-`$env:`-Escaping, EBUSY/Browser-Absturz) betrafen die Interaktion zwischen dem Bash-Tool und der Windows-/PowerShell-Umgebung, nicht die eigentliche Playwright- oder Node-Logik.

## Bewusst ausgelassen

Einzelne Zwischen-Iterationen von Dateiinhalten (z. B. mehrfach überschriebene Zwischenstände von `record.mjs`/`verify.mjs` innerhalb desselben Arbeitsschritts) wurden zugunsten des jeweils gültigen Endstands nicht einzeln aufgeführt. Wortlaut vollständiger Kommandozeilenaufrufe und vollständiger JSON-/Markdown-Dateiinhalte wurde nicht reproduziert, nur ihre Funktion und ihr Ergebnis. Reine Bestätigungs- und Statusmeldungen ohne neue Information (z. B. wiederholte „Exit-Code 0"-Bestätigungen bereits grüner Läufe) wurden zusammengefasst statt einzeln aufgeführt.
