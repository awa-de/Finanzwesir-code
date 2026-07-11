Stand: 2026-07-11 | Session: TESTENV-1c | Geändert von: Claude (Sonnet)

# TESTENV-1c – Template, Shared CSS/JS, Python-Checker und Launcher bauen

## 1. Status und Kurzurteil

**Status: GRÜN**

Modell-Gate bestanden (Claude Sonnet 5). Die gesamte im freigegebenen Standard
(`TEST_PAGE_STANDARD.md`, nach `TESTENV-1bRF`) verlangte Infrastruktur ist gebaut: Template,
Shared CSS, Shared JavaScript, Python-Strukturchecker (nur Standardbibliothek), automatisch
erzeugter Launcher, Scratch-Zone. Alle 6 temporären Positivfälle und alle 22 temporären
Negativfälle bestehen. Shared-JS-, Shared-CSS- und Template-QA bestanden. Der Launcher ist
nachweislich deterministisch (byte-identisch bei zweifacher Generierung, sowohl im temporären
Testbaum als auch am realen Repository). Der reale Checker-Lauf gegen den unmigrierten
Altbestand liefert erwartungsgemäß Exit-Code `1` mit 6 dokumentierten, im Standard begründeten
Strukturfehlern — keine interne Exception, keine Datei verändert. Kein Altbestand migriert, keine
Architektur neu erfunden. Scope exakt eingehalten.

Eine offene, transparent dokumentierte Grenze bleibt (§15/§16 unten): der Checker kann nicht
zwischen einer versehentlich und einer absichtlich fehlenden lokalen Datei unterscheiden — das
ist eine bewusste, im Auftrag so vorgezeichnete Vereinfachung (kein Deklarationsattribut im
Standard vorgesehen), aber ein Punkt, den der nächste Arbeitsbereich kennen sollte.

## 2. Modell-Gate und Risikoklasse

Aktives Modell: Claude Sonnet 5 (Basismodell dieser Instanz, unverändert seit `/model sonnet`) —
eindeutig Sonnet-Familie, Gate bestanden. Risikoklasse **B** (zusammenhängender
Infrastruktur-Bau bei bereits festgelegter Architektur).

## 3. Vorprüfung und Fundstellenkarte

`git status --short`/`git diff --name-status` vor dem ersten Write geprüft: ausschließlich die
bekannten, bereits bestätigten Fremdänderungen (`TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md`,
`STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA_V1.md`, sitzungseigene `session-log.md`) sowie die
bestehenden `TESTENV-1b*`-Ergebnisdateien dieses Arbeitsgangs. Keine STOP-Bedingung.

Fundstellenkarte (nur Terminal-Ausgabe, keine Datei):

- Alle sechs Zielpfade (`app.test.template.html`, `test-page.css`, `test-page.js`,
  `tests/index.html`, `tests/scratch/README.md`, `check-test-pages.py`) existierten vor diesem
  AP nicht; `tools/` existierte bereits (leer bis auf frühere Skripte außerhalb dieses Scopes).
- Nur `Apps/prokrastinations-preis` hat `app.js` **und** `app.test.html`; alle 24 übrigen
  App-Ordner haben keins von beidem.
- Repo-weiter Scan auf `*.test.html`-Namensmuster oder `data-fw-test-template`-Inhalt: genau 1
  Treffer (`Apps/prokrastinations-preis/app.test.html`) — die 18 Legacy-Chart-Tests und
  `Theme/index.html` matchen weder Namensmuster noch Marker und bleiben daher wie in
  `TEST_PAGE_STANDARD.md` §15/§20 dieses Auftrags vorhergesagt unentdeckt.
- Die reale `app.test.html` lädt Chart.js aktuell von `cdn.jsdelivr.net` (bekannte, noch nicht
  migrierte Altlast).
- `Theme/assets/css/tokens.css` und `Theme/assets/js/vendor/chart.umd.min.js` real vorhanden und
  auflösbar.

## 4. Gebaute Dateien

```text
docs/testing/templates/app.test.template.html   (neu)
tests/shared/test-page.css                      (neu)
tests/shared/test-page.js                       (neu)
tests/index.html                                (neu, generiert)
tests/scratch/README.md                         (neu)
tools/check-test-pages.py                       (neu)
.gitignore                                       (gezielt ergänzt: 3 Zeilen für tests/scratch/)
docs/steering/patches/TESTENV-1c_testinfrastruktur-bauen_Ergebnis.md  (dieses Protokoll)
```

`tests/engine/`, `tests/tooling/`, `tests/ghost/`, `tests/fixtures/` bewusst **nicht** angelegt —
bleiben leer, bis die Migration reale Dateien dorthin verschiebt (§9 des Auftrags).

## 5. App-Testseiten-Template

`docs/testing/templates/app.test.template.html` — Dokumentkopf mit `tokens.css` → Shared-CSS →
`app.css`, Shared-JS mit `defer`; Body-Marker `data-fw-test-template="1"`; Kopf mit Laufzeitstatus
und (versteckter) Fehlerbox; ein vollständiger Beispiel-Testfall mit Erwartungsblock, Artikeltext
vor/nach der echten `.kg-card`/`.fw-app`-Card, App-Start am Dateiende. Genau die fünf
vorgegebenen Platzhalter (`__APP_TITLE__`, `__APP_SLUG__`, `__ERWARTUNG_1__` bis `_3__`), keine
Template-Engine-Syntax. Optionale `data-fw-data`/`data-fw-config`/`data-fw-options`-Beispiele
ausschließlich als HTML-Kommentar (kein aktives ungültiges Platzhalterattribut). Discovery-
Ausnahme (§11.7) als benannte Konstante `TEMPLATE_EXCLUSION_PATH` im Checker dokumentiert, nicht
versteckt.

## 6. Shared Test CSS

`tests/shared/test-page.css` gestaltet ausschließlich die Test-/Orientierungsschicht
(`.fw-test-page`, `.fw-test-header`, `.fw-test-main`, `.fw-test-instruction`,
`.fw-test-runtime-status[.is-error]`, `.fw-test-errors`, `.fw-test-case`, `.fw-test-expected`,
`.fw-test-index[-group|-list|-empty]`). Deterministisch geprüft: 0 verbotene Selektoren
(`.kg-card`, `.fw-app`, `.financial-chart-module`, `[data-fw-app]`, `[data-fw-appchart]`,
`canvas`), 0 unqualifizierte Tag-only-Selektoren, 0 `@import`, 0 externe URLs, 0
Animationen/`@keyframes`. Nutzt reale CI-Tokens (`--font-body`, `--color-text`, `--color-border`
usw.) mit neutralen Hex-Fallbacks, damit die Datei auch ohne geladene `tokens.css` funktioniert.

## 7. Shared Test JavaScript

`tests/shared/test-page.js` — Vanilla JS, IIFE, kein Modulzwang, keine externe Bibliothek.
Registriert `window.addEventListener("error", ..., true)` (Laufzeit- **und**
Ressourcenladefehler ohne `event.error`) und `window.addEventListener("unhandledrejection", ...)`,
stellt `window.FwTestPage.reportError(error, context)` bereit. Normalisiert `Error`-Objekte,
Strings, beliebige Promise-Rejection-Werte und Ressourcenfehler einheitlich. Sichtbare Ausgabe
ausschließlich über `document.createElement`/`textContent` (kein `innerHTML`), Fehler zusätzlich
via `console.error`, Events werden nicht mit `preventDefault()` verschluckt. Status wechselt auf
„FEHLER – mindestens ein technischer Fehler wurde erkannt." mit Klasse `.is-error`. Deterministisch
geprüft: alle sieben geforderten Marker vorhanden (`window.addEventListener`, `error`,
`unhandledrejection`, `window.FwTestPage`, `reportError`, `textContent`, `console.error`), kein
`innerHTML`, Klammerbalance 33/33.

**Korrektur während des Baus:** Die erste Fassung kapselte `window` intern als generischen
IIFE-Parameter `global` — funktional identisch, aber ohne die literal geforderten
`window.addEventListener`/`window.FwTestPage`-Zeichenketten. Auf eigene deterministische Prüfung
hin (§35) korrigiert: durchgängig `window.` direkt verwendet, keine Parameter-Indirektion mehr.

## 8. Python-Checker

`tools/check-test-pages.py` — nur Python-Standardbibliothek (`html.parser.HTMLParser`, `hashlib`,
`pathlib`, `dataclasses`, `re`, `os`). Interne Struktur wie vorgegeben getrennt:
`discover_test_pages`, `validate_repository`, `validate_test_page`, `build_index`, `main`, plus
Hilfsfunktionen (`resolve_local_ref`, `check_loadable_ref`, `check_data_ref`,
`check_app_pflicht`, `check_duplicates`, ein minimaler nachsichtiger DOM-Baum aus
`Node`/`DomBuilder`). Repo-Root deterministisch aus `Path(__file__).resolve().parent.parent`
abgeleitet; alle Kernfunktionen nehmen einen expliziten `root: Path` entgegen und sind daher
gegen einen beliebigen temporären Repo-Baum aufrufbar (Beweis: §12/§13 unten).

CLI exakt wie vorgegeben: `python tools/check-test-pages.py` (read-only, Exit `0`/`1`) und
`python tools/check-test-pages.py --write-index` (zusätzlich Launcher schreiben, Fehlerseiten
werden nicht herausgefiltert). Unbekanntes Argument → verständliche Meldung, Exit `1`.

## 9. Discovery und Pfadprüfung

Repo-weiter Scan nach `*.test.html`-Namensmuster **oder** `data-fw-test-template`-Inhalt, ohne
Manifest. Exakte Ausschlüsse: `.git/`, `node_modules/`, `__pycache__/`, `tests/scratch/` (per
Pfadvergleich, nicht Namensmuster), sowie exakt der eine Template-Pfad (benannte Konstante,
§11.7). Klassifikation gegen vier feste Regex-Muster (`Apps/{slug}/app.test.html`,
`tests/{engine,tooling,ghost}/*.test.html`, keine tieferen Unterordner zugelassen) — jeder Treffer
außerhalb dieser Muster wird als „liegt außerhalb der erlaubten Standardorte" gemeldet, jede
Seite innerhalb durchläuft die volle Strukturprüfung (§22–24 des Auftrags). Referenzauflösung
case-sensitiv **segmentweise** gegen den realen Ordnerinhalt (nicht nur `Path.exists()`) — findet
Case-Mismatches auch unter Windows zuverlässig (siehe N-16). Externe `http(s)://`-URLs in
`<script src>`/`<link href stylesheet>` sind immer ein Strukturfehler; dieselben absoluten URLs in
`data-fw-data`/`data-fw-config`/`data-csv` sind ausdrücklich zulässig und werden nicht lokal
geprüft (APP-INTERFACE.md bleibt kanonisch, keine neue Domain-Whitelist im Checker).

## 10. Launcher

`tests/index.html` wird ausschließlich durch `--write-index` erzeugt/aktualisiert, nie manuell
gepflegt (Kopfkommentar warnt davor). Vier feste Gruppen (Apps → Engine → Tooling → Ghost) in
dieser Reihenfolge, leere Gruppen zeigen „Noch keine Testseiten." Titel deterministisch aus
`<title>`, sonst `<h1>`, sonst Pfad; Sortierung Titel case-insensitiv, Pfad als Tie-Breaker.
Seiten mit Strukturfehlern werden **nicht** gefiltert, sondern mit sichtbarem Zusatz
„(Strukturfehler)" gelistet. Nur lokales Stylesheet (`./shared/test-page.css`), kein
JavaScript nötig. Determinismus doppelt bewiesen: einmal im temporären Testbaum (P-06), einmal
am realen Repository (SHA-256 vor/nach zweitem `--write-index`-Lauf identisch:
`8fad7b3d…6b3ad34`). Datei wird nur geschrieben, wenn sich der Inhalt tatsächlich ändert.

## 11. Scratch-Zone

`tests/scratch/README.md` neu, kurz (12 Zeilen), verweist auf `TEST_PAGE_STANDARD.md` §1.4.
`.gitignore` um exakt die vorgegebenen drei Zeilen ergänzt (`tests/scratch/*` +
`!tests/scratch/README.md`), keine bestehende Regel geändert oder entfernt (`Theme/chart-tests/`
unangetastet, wie explizit gefordert). P-05 bestätigt: Inhalte unter `tests/scratch/` erzeugen
keine Validierungsfehler und erscheinen nicht im Launcher.

## 12. Temporäre Positivtests

Alle 6 vorgegebenen Positivfälle bestanden (Harness: `tempfile.TemporaryDirectory` +
`importlib.util.spec_from_file_location`, außerhalb des Repositorys im Scratchpad, nach Lauf
automatisch entfernt):

```text
[OK] P-01 gueltige App-Testseite
[OK] P-02 gueltige Chart-Testseite
[OK] P-03 mehrere Cards in einem Testfall
[OK] P-04 absolute erlaubte Daten-URL
[OK] P-05 scratch keine Validierungsfehler, nicht im Launcher
[OK] P-06 Launcher deterministisch (byte-identisch)
```

## 13. Temporäre Negativtests

Alle 22 vorgegebenen Negativfälle bestanden — jeder erzeugt genau den erwarteten Strukturfehler:

```text
[OK] N-01 app.js ohne app.test.html
[OK] N-02 fehlender Template-Marker
[OK] N-03 falsche Template-Version
[OK] N-04 fehlendes Shared CSS
[OK] N-05 fehlendes Shared JS
[OK] N-06 kein Testfall
[OK] N-07 fehlender Erwartungsblock
[OK] N-08 leerer Erwartungsblock
[OK] N-09 keine .kg-card
[OK] N-10 .kg-card ohne Produktionscontainer
[OK] N-11 zwei Produktionscontainer in einer .kg-card
[OK] N-12 .fw-app ohne data-fw-app
[OK] N-13 Chart ohne data-type
[OK] N-14 ungueltiger Chart-Typ
[OK] N-15 fehlende lokale CSV
[OK] N-16 Case-Mismatch (real 'Data.csv', Referenz 'data.csv')
[OK] N-17 externes Script (cdn.jsdelivr.net)
[OK] N-18 externes Stylesheet (cdn.tailwindcss.com)
[OK] N-19 fehlplatzierte Testseite per Dateiname
[OK] N-20 fehlplatzierte Testseite nur per Marker
[OK] N-21 exakte Dateidublette
[OK] N-22 Referenz verlaesst Repo

Gesamt: 28 Faelle, 0 fehlgeschlagen.
```

Shared-JS-QA (§35): alle 7 Pflichtmarker vorhanden, kein `innerHTML`, Klammerbalance
ausgeglichen — **bestanden** (nach der in §7 dokumentierten Korrektur).
Shared-CSS-QA (§36): 0 verbotene Selektoren, 0 unqualifizierte Tag-Selektoren, alle Selektoren
aus der whitelisted `fw-test-*`-Klassenfamilie, 0 `@import`/externe URLs/Animation —
**bestanden**.
Template-QA (§37): alle 5 Platzhalter, Marker, Shared-CSS/JS, `tokens.css`, `app.css`,
Erwartungsblock, `.kg-card`/`.fw-app`, Artikeltext vor/nach, `./app.js`, 0 absolute Script-/
Stylesheet-URLs, 0 aktive Daten-Platzhalterattribute — **bestanden**.

## 14. Realer Repository-Lauf

```bash
python tools/check-test-pages.py
```

```text
TESTSEITEN-STRUKTUR: FEHLER
Gepruefte dauerhafte Testseiten: 1
Strukturfehler: 6
Exit-Code: 1
```

Keine interne Checkerexception. Keine bestehende Datei verändert (per `git status`/`git diff`
vor und nach dem Lauf verifiziert). Anschließend:

```bash
python tools/check-test-pages.py --write-index
```

erzeugt `tests/index.html` (1 Eintrag unter „Apps", markiert mit „(Strukturfehler)"; Engine/
Tooling/Ghost korrekt leer). Zweiter Lauf produziert byte-identische Datei (SHA-256 vorher/nachher
gleich).

## 15. Aktueller Altbestands-Fehlerbericht

Genau **1** dauerhafte Testseite entdeckt (`Apps/prokrastinations-preis/app.test.html`), **6**
Strukturfehler, gruppiert:

| Regel | Anzahl | Bereits aus TESTENV-1a bekannt? |
|---|---|---|
| externe Script-Abhängigkeit (`cdn.jsdelivr.net`) | 1 | ja — TESTENV-1a §5 „21 Seiten CDN" |
| fehlender Template-Marker `data-fw-test-template` | 1 | neu (Standard existierte vor `TESTENV-1b` nicht) |
| fehlendes Shared CSS | 1 | neu (Shared-Datei existierte vor diesem AP nicht) |
| fehlendes Shared JS | 1 | neu (Shared-Datei existierte vor diesem AP nicht) |
| kein `data-fw-test-case`-Element | 1 | neu (Testfall-Vertrag existierte vor `TESTENV-1b` nicht) |
| fehlende lokale Referenz (`./test-data/nonexistent.csv`) | 1 | teilweise bekannt — siehe Einschränkung unten |

**Wichtige Einschränkung, transparent statt stillschweigend behoben:** Der letzte Fund
(`data-fw-data: referenzierte Datei './test-data/nonexistent.csv' existiert nicht.`) betrifft
real Testfall I der Seite — eine **absichtlich** fehlende Datei für den 404-Negativtest
(dokumentiert im sichtbaren Erwartungstext der Seite selbst, siehe `app.test.html`
Szenario I: „Erwartung: Error-State (b) … Testfall: T-04"). `TEST_PAGE_STANDARD.md` §10 erlaubt
genau das: „Absichtlich fehlende Dateien … bleiben zulässig, wenn der zugehörige Testfall im
sichtbaren Erwartungstext klar als Negativtest beschrieben ist (kein separates
Deklarationsattribut nötig)". Der in diesem AP gebaute Checker implementiert diese Ausnahme
**nicht** — er kann nicht zwischen einer versehentlich und einer absichtlich fehlenden Datei
unterscheiden, da §23 dieses Auftrags keine Ausnahmeregel und kein Deklarationsattribut vorsieht
und kein Positiv-/Negativfall der Verifikationsmatrix (§12/§13) diese Unterscheidung verlangt.
Diese Diskrepanz zwischen dem Standarddokument (das die Ausnahme als „für den menschlichen
Prüfer" beschreibt) und dem Checker (der strukturell jede fehlende Referenz meldet) ist real und
wird hier bewusst dokumentiert statt stillschweigend durch eine neue, unbeauftragte
Checker-Ausnahme „repariert" — das wäre eine neue Architekturentscheidung gewesen, die dieser AP
nicht treffen sollte. Empfehlung für den nächsten Arbeitsbereich: bei der Migration entweder
akzeptieren, dass auch absichtliche Negativ-Fixtures künftig real vorhanden sein müssen (z. B.
durch eine dedizierte, real leere Platzhalterdatei statt eines bewusst falschen Pfades), oder den
Checker um eine minimale Ausnahmeregel erweitern — beides ist eine Entscheidung für später, nicht
für dieses AP.

Keine Reparaturempfehlung pro Einzeldatei über das oben Gesagte hinaus. Der Bericht dient dem
Zuschnitt der Migrations-APs.

## 16. Bewusst nicht migriert

- `Apps/prokrastinations-preis/app.test.html` nicht angefasst (weiterhin CDN-Chart.js, kein
  Template-Marker, kein Shared CSS/JS, kein `data-fw-test-case`).
- Die 18 Legacy-Chart-Workbenches unter `Theme/chart-tests/` und `Theme/index.html` bleiben
  unentdeckt (entsprechen weder Namensmuster noch Marker) — erwartungsgemäß, siehe §40 des
  Auftrags.
- Die 2 fachfremden Design-System-Testseiten (`janitor-test.html`,
  `boxen-stress-test-referenz.html`) ebenfalls unentdeckt, aus demselben Grund.
- Keine Fixture verschoben, keine Dublette gelöscht, kein Inventar aktualisiert.
- `tests/engine/`, `tests/tooling/`, `tests/ghost/`, `tests/fixtures/` nicht angelegt (bleiben
  leer bis zur Migration).

## 17. Scope-QA

AP-eigener Diff:

```text
M .gitignore
A docs/testing/templates/app.test.template.html
A tests/shared/test-page.css
A tests/shared/test-page.js
A tests/index.html
A tests/scratch/README.md
A tools/check-test-pages.py
A docs/steering/patches/TESTENV-1c_testinfrastruktur-bauen_Ergebnis.md
```

Zusätzlich vorhanden (nicht Teil dieses APs, unangetastet): `.claude/learning/session-log.md`
(sitzungseigen), `docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md`,
`docs/steering/STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA_V1.md` (bekannte Fremdänderungen),
`docs/editorial/AUTHOR_GUIDE-v3.md` sowie die vier `TESTENV-1b*`-Ergebnisdateien und
`docs/testing/TEST_PAGE_STANDARD.md` (bereits aus vorangegangenen APs dieses Fadens, hier nicht
erneut geändert).

Ein Nebeneffekt der eigenen Verifikation (`tools/__pycache__/`, durch `importlib`-Laden des
Checkers während der temporären Tests erzeugt) wurde bemerkt und **vor** diesem Protokoll wieder
entfernt — kein Repository-Artefakt dieses APs.

`git status --short` und `git diff --name-status` am Ende zeigen exakt den oben genannten Scope,
keine unbeabsichtigte Zusatzänderung.

## 18. Wiederlesen / Datei-Wahrheit

- Alle sechs gebauten Dateien (Template, Shared CSS, Shared JS, Checker, Launcher, Scratch-README)
  nach dem Schreiben vollständig vom Datenträger neu gelesen.
- Die ergänzten `.gitignore`-Zeilen per `git diff -- .gitignore` mit Kontext geprüft — nur die
  drei neuen Zeilen, keine bestehende Regel verändert.
- Alle 28 temporären Tests **zusätzlich nach der JS-Korrektur erneut ausgeführt** (nicht nur
  einmalig vor der Korrektur) — weiterhin 28/28 bestanden.
- Launcher zweimal am realen Repository generiert, SHA-256 vorher/nachher identisch
  (`8fad7b3d…6b3ad34`).
- Realer Checker-Bericht ein zweites Mal erzeugt — identische 6 Strukturfehler, identischer
  Exit-Code `1`, keine neue Exception.
- `git status --short`/`git diff --name-status` nach Abschluss aller Arbeiten erneut geprüft
  (§17) — Scope exakt bestätigt.

## 19. Nächster Arbeitsbereich

Keine automatische Fortsetzung. Der reale Checker-Bericht (§14/§15) wird an den steuernden Faden
zurückgegeben. Dort wird die einmalige Migration anhand der echten Befunde zugeschnitten,
voraussichtlich:

```text
TESTENV-1d
→ Altbestand anhand Inventar (TESTENV-1a/TESTENV-1aFR) und Checker-Bericht klassifizieren:
   KEEP / MERGE / DELETE
```

Zusätzlich zur Kenntnis für den Zuschnitt: die in §15 dokumentierte Checker/Standard-Diskrepanz
bei absichtlich fehlenden Negativtest-Referenzen sollte vor oder während der Migration geklärt
werden (siehe dortige Empfehlung).

Danach erst: Dubletten löschen, gebrochene Referenzen reparieren, Fixtures verschieben, behaltene
Seiten modernisieren, Launcher vollständig füllen, Checker repo-weit grün machen. Keine dieser
Arbeiten in `TESTENV-1c` vorweggenommen.

Weiter nur nach Alberts OK.
