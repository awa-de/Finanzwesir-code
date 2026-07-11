---
chronik_id: CHRONIK-2026-07-11-testenv-migration
datum: 2026-07-11
projekt: finanzwesir-2-0
thema: testenv-migration
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, sackgasse, durchbruch, abbruchregel, tooling-problem, annahme-verworfen, vollstaendigkeit-vs-verdichtung]
---

# Chronik: Konsolidierung und Abschluss der TESTENV-Kette

**Hauptgegenstand:** Der Faden dokumentierte die Klassifikation, Migration, Prüfung und Nachbesserung der Testumgebung im Projekt Finanzwesir 2.0. Dabei wurden alte Testseiten und Fixtures in eine zentrale Struktur überführt, ein Checker und Launcher eingesetzt, Browserfunde behoben und die gesamte TESTENV-Kette abgeschlossen und committed.

## Ausgangslage

Zu Beginn lag `TESTENV-1d` als GRÜN klassifizierter Bestand vor: 14 KEEP-, 1 MERGE-, 6 DELETE-, 2 OUTSIDE- und 0 UNKLAR-Fälle. Die Migration war noch nicht begonnen. Der Nutzer fragte, ob nun die Umsetzung folge. Die Einordnung bestätigte dies und teilte die Arbeit in zwei Migrationsschritte: zunächst die App-Testseite (`TESTENV-1eA`), danach die gebündelte Engine-/Fixture-Migration (`TESTENV-1eB`).

## Chronologischer Verlauf

### TESTENV-1eA: App-Testseite

Für `TESTENV-1eA` wurde ein begrenzter Claude-Prompt erzeugt. Er sollte `Apps/prokrastinations-preis/app.test.html` auf den neuen Testseitenstandard migrieren, die vorhandenen Testfälle erhalten, CDN-Abhängigkeiten durch lokale Dateien ersetzen und den Checker ausführen.

Beim Rücklauf wurde die anfänglich angenommene Zahl von 34 Testfällen korrigiert. Die reale Folge A–Z und AA–AF ergab 32 Testfälle. Die Migration erhielt alle 32 Fälle, 33 `.kg-card`-Elemente und den absichtlich fehlenden 404-Pfad. Zwei Checker-Befunde blieben: Szenario C fehlte absichtlich `data-fw-app`, Szenario AF verwendete absichtlich `[data-fw-appchart]` statt einer Ghost-Card-Struktur.

Der Browser-Smoke wurde durch den Nutzer durchgeführt. Die ARIA-Live-Region arbeitete, die normalen App-Schritte wurden angekündigt, Szenario C und Szenario I zeigten die vorgesehenen deutschen Error-States. Konsolenmeldungen zu Gatekeeper-, 404- und ungültigen CSV-Fällen wurden als erwartete Negativtestdiagnostik eingeordnet. Damit wurde `TESTENV-1eA` fachlich freigegeben.

### TESTENV-1eB: Engine-Seiten und Fixtures

`TESTENV-1eB` wurde als ein Python-gestützter Batch formuliert. Der Prompt enthielt eine feste Quell-/Zielmatrix für 13 migrierte Seiten, zwei neue Seiten für Security-Gatekeeper und Smart-Update, die Auslagerung von Szenario AF, eine eng begrenzte Checker-Erweiterung für den Missing-App-ID-Fall und `[data-fw-appchart]` unter `tests/engine/`, sowie die Fixture-Migration.

Der Rücklauf meldete 15 Engine-Seiten, 76 migrierte Fixtures, bestätigte Hashes, vier bestandene fokussierte Checker-Tests, sieben freigegebene DELETE-Quellen und vier gelöschte Orphan-CSVs. Die App-Testseite sank durch die Auslagerung von AF von 32 auf 31 Fälle. Checker und Launcher meldeten 16 dauerhafte Testseiten und 0 Strukturfehler.

Claude hatte zusätzlich zwölf bereits migrierte Altquellen unter `Theme/chart-tests/` und `Theme/index.html` gelöscht, da „migrieren“ als Verschieben ausgelegt worden war. Diese Auslegung wurde akzeptiert. Der Nutzer stellte anschließend fest, dass die Verzeichnisse `Theme/chart-tests` und `Theme/data` noch existierten. `chart-tests` war leer; `data` enthielt nur `Alle-Balkendiagramm-CSV.txt`. Beide Verzeichnisse wurden vollständig gelöscht.

### TESTENV-1f: Abschlussgate

Für `TESTENV-1f` wurde zunächst ein längerer Abschluss-Prompt entworfen. Nach dem Hinweis des Nutzers, der Prompt solle auf das Wesentliche begrenzt bleiben, wurde er auf 431 Wörter reduziert. Er prüfte nur `.gitignore`, Checker, Launcher, Zählungen, Referenzen und eine repräsentative Browser-Stichprobe.

Das automatische Gate bestand: 16 Testseiten, 76 Fixtures, 0 Checkerfehler, keine alten funktionalen Theme-Pfade. Die veralteten `.gitignore`-Einträge für `Theme/data/` und `Theme/chart-tests/` wurden entfernt. Die Browser-Stichprobe blieb zunächst offen.

Im Umfeld dieses Gates wurde `tools/ci-token-check.js` erweitert. Das Tool erhielt ein Ist/Soll-Audit für Fonts und Farben, später Canvas-Auswertung, Präzisionskorrekturen für deaktivierte Tooltips, `.kg-card`-Chrome und nicht-textuelle Inputs sowie dokumentierte Erweiterungspunkte. Diese Tooländerungen wurden in separaten Patch-Quittungen festgehalten.

### Browserfunde und TESTENV-1g

Das Abschlussgate machte zwei neue Darstellungsfehler sichtbar. Erstens renderten `.fw-app__btn`-Buttons in Arial, weil native Buttons die auf `.fw-app` gesetzte Schrift nicht zuverlässig erbten. Zweitens wurden die H3-Überschriften „Erwartetes Verhalten“ orange eingefärbt.

Für `TESTENV-1g` wurde ein enger Prompt formuliert. Er beschränkte die Suche auf `app.css`, `tests/shared/test-page.css` und `tests/engine/*.test.html`, untersagte Repo-weite Suche, Architekturarbeit und Tool-Erweiterungen und setzte zunächst eine Grenze von höchstens drei betroffenen Engine-Seiten.

Der Button-Fix wurde mit `font-family: inherit` in `.fw-app__btn` umgesetzt und browserseitig bestätigt. Beim H3-Fund stoppte Claude planmäßig: Der identische unqualifizierte orange `h3`-Block lag in vier statt höchstens drei Dateien. Nach ausdrücklicher Erweiterung der Grenze auf genau vier Dateien wurde derselbe AP fortgesetzt.

In `tooltip.test.html`, `cadence-density.test.html`, `irregular-bar.test.html` und `irregular-line.test.html` wurde `h3` zu `.fw-test-case > h3` gescoped. Dadurch blieben beabsichtigte Demo-Captions orange, während `.fw-test-expected h3` nicht mehr erfasst wurde. Zusätzlich erhielt die zentrale Regel in `tests/shared/test-page.css` die Farbe `var(--color-text, #272727)`. Checker und Browser-Smoke bestanden.

Der bereits bekannte Rahmenfund `#dddddd` an `.financial-chart-module` blieb als `TESTENV-1-FOLLOWUP-BORDER` für spätere Tailwind-Arbeit im Backlog.

### Abschluss

Nach GRÜN für beide Fixes wurde das Abschlussritual freigegeben. Die Browser-Stichprobe aus `TESTENV-1f` wurde nachgetragen, die gesamte TESTENV-Kette abgeschlossen und committed.

## Wendepunkte

- Die angenommene Zahl von 34 App-Testfällen wurde auf 32 korrigiert.
- Zwei verbliebene Checkerfehler wurden nicht als Migrationsergebnis akzeptiert, sondern später durch eng begrenzte Vertragsregeln aufgelöst.
- Die Altquellen wurden als echte Verschiebung statt als Kopie behandelt.
- Der Abschluss-Prompt wurde nach Nutzerhinweis deutlich gekürzt.
- Die H3-Reparatur stoppte an der Drei-Dateien-Grenze und wurde erst nach expliziter Erweiterung auf vier Dateien fortgesetzt.
- Browserfunde führten nach dem eigentlichen Abschlussgate zu `TESTENV-1g`.

## Entscheidungen und Festlegungen

- App- und Engine-Migration wurden getrennt umgesetzt · früh im Verlauf · unterschiedliche Arbeitsarten · gültig.
- Szenario AF wurde aus der App-Seite als eigene Engine-Seite ausgelagert · `1eB` · direkter Engine-Pfad · gültig.
- Missing-App-ID erhielt einen engen Checker-Marker; `[data-fw-appchart]` wurde nur unter `tests/engine/` zugelassen · `1eB` · Negativtest und Engine-Test sollten checker-grün bleiben · gültig.
- Alte Theme-Testverzeichnisse und ihre Ignore-Regeln wurden entfernt · nach `1eB`/in `1f` · zentrale Struktur unter `tests/` · gültig.
- Button-Font wurde mit `font-family: inherit` korrigiert · `1g` · vorhandene Schriftquelle blieb maßgeblich · gültig.
- Orange Demo-H3 wurden auf `.fw-test-case > h3` begrenzt; Testseiten-H3 erhielt eine zentrale Textfarbe · `1g` · Quelle und Orientierungsschicht wurden getrennt · gültig.
- `#dddddd`-Rahmen blieb im Backlog · Abschlussphase · spätere Tailwind-Arbeit · offen.

## Irrwege, Schleifen und verworfene Ansätze

- Die Zahl 34 wurde zunächst als feste Erwartung verwendet und später verworfen.
- Die zwei Checkerbefunde aus `1eA` wurden zunächst nur dokumentiert; später wurden sie durch klar begrenzte Standard-/Checkerregeln aufgelöst.
- Ein längerer `1f`-Prompt wurde erzeugt und nach Kritik durch eine wesentlich kürzere Fassung ersetzt.
- Die H3-Suche wurde absichtlich bei mehr als drei Verursachern abgebrochen. Der Befund führte zu einer kontrollierten Erweiterung auf vier Dateien, nicht zu einer repo-weiten Suche.
- Eine rein zentrale H3-Überschreibung wurde nicht allein verwendet; zusätzlich wurden die vier undichten Quellen gescoped.

## Erzeugte Artefakte

- Claude-Prompts für `TESTENV-1eA`, `1eB`, `1f` und `1g` – operative Steuerung – final.
- `TESTENV-1eA_app-testseite-migrieren_Ergebnis.md` – App-Migration – final.
- `TESTENV-1eB_engine-fixture-migration_Ergebnis.md` – Engine-/Fixture-Migration – final.
- `TESTENV-1f_browser-abschlussgate_Ergebnis.md` – Abschlussgate – final auf GRÜN ergänzt.
- `TESTENV-1g_ci-regressionsfix_Ergebnis.md` – Button-/H3-Fixes – final.
- 15 Engine-Testseiten, 1 App-Testseite und 76 Engine-Fixtures – zentrale Testumgebung – final.
- Erweiterungen und Patch-Quittungen für `tools/ci-token-check.js` – CI-Audit – final für diesen Stand.

## Sachliche Erkenntnisse

- Die App-Testseite enthielt 32 natürliche Testfälle; nach Auslagerung von AF blieben 31 App-Fälle.
- Native Buttons übernahmen die App-Schrift ohne explizites `font-family: inherit` nicht zuverlässig.
- Unqualifizierte `h3`-Selektoren in vier migrierten Seiten wirkten auf die Testseiten-Orientierungsschicht.
- `.fw-test-case > h3` trennte direkte Demo-Captions von verschachtelten Erwartungsüberschriften.
- Die zentrale Testumgebung umfasste am Ende 16 dauerhafte Seiten und 76 Fixtures.
- Erwartete Negativtests erzeugten Konsolendiagnostik, ohne dass daraus ungefangene JavaScript-Exceptions folgten.

## Offene Punkte am Ende

- `TESTENV-1-FOLLOWUP-BORDER`: `#dddddd`-Rahmen an `.financial-chart-module`, zurückgestellt bis zur Tailwind-Arbeit.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: wiederholte Begrenzung von Claude durch feste Lese- und Write-Scopes; Nutzung harter Abbruchregeln statt repo-weiter Suche; Korrektur überhöhter Promptlänge; Trennung deterministischer Python-Prüfungen von Browserurteilen; Nacharbeiten, die erst durch ein Abschlussgate sichtbar wurden; bewusste Verschiebung eines nicht blockierenden CI-Funds ins Backlog.

## Bewusst ausgelassen

Ausgelassen wurden wiederholte Downloadhinweise, vollständige Prompttexte, Konsolen-Stacks erwarteter Negativtests, identische Statusmeldungen, Toolaufrufdetails ohne Einfluss auf den Verlauf und Formulierungsdiskussionen ohne Zustandsänderung.
