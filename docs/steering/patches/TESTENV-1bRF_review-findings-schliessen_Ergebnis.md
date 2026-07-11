Stand: 2026-07-11 | Session: TESTENV-1bRF | Geändert von: Claude (Sonnet)

# TESTENV-1bRF – Review-Findings gebündelt schließen

## 1. Status und Kurzurteil

**Status: GRÜN**

Modell-Gate bestanden (Claude Sonnet 5). Alle drei Findings aus `TESTENV-1bR` (F-01
Discovery-Mechanismus, F-02 Script-/Stylesheet-Regel, F-03 Ghost-Abgrenzung) sind vollständig
und wörtlich wie vom Auftrag vorgegeben in `docs/testing/TEST_PAGE_STANDARD.md` eingearbeitet.
Keine neue Architekturentscheidung getroffen, keine Alternative entworfen — ausschließlich die
vorgegebenen Ergänzungen übernommen. Genau eine bestehende Sachdatei geändert
(`TEST_PAGE_STANDARD.md`), genau eine Ergebnisdatei neu angelegt. Kein Bau, keine Migration.
Alle deterministischen Nachbedingungen aus §12 des Auftrags bestanden.

## 2. Modell-Gate und Risikoklasse

Aktives Modell: Claude Sonnet 5 (Basismodell dieser Instanz, unverändert seit `/model sonnet`) —
eindeutig Sonnet-Familie, Gate bestanden. Risikoklasse **A** (deterministischer Minifix, drei
vorgegebene Textergänzungen, keine eigene Lösungsfindung).

## 3. Vorprüfung und Scope

`git status --short` und `git diff --name-status` vor dem ersten Write geprüft: ausschließlich
die drei bekannten, bereits bestätigten Fremdänderungen/-artefakte
(`docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md`,
`docs/steering/STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA_V1.md`, sitzungseigene
`session-log.md`-Änderung) sowie die bestehenden `TESTENV-1bF`-/`TESTENV-1bR`-Dateien dieses
Arbeitsgangs. Beide Pflichtdateien (`TEST_PAGE_STANDARD.md`, `TESTENV-1bR_..._Ergebnis.md`) real
vorhanden. Keine STOP-Bedingung ausgelöst. Keine der Fremdänderungen wurde gelesen, geändert
oder bewertet.

## 4. F-01 Discovery-Regel

Zwei Ergänzungen, wörtlich wie im Auftrag §7 vorgegeben:

1. Neuer Unterabschnitt „§12.1 Discovery ohne Manifest" direkt nach der 14-Punkte-Checkerliste
   in §12: „Der Checker durchsucht das gesamte Repository nach Dateien mit dem Namensmuster
   `*.test.html` und nach HTML-Dateien, die das Attribut `data-fw-test-template` enthalten. Jeder
   Treffer außerhalb der erlaubten Standardorte (§3) und außerhalb von `tests/scratch/` ist ein
   Strukturfehler." Ergänzt um die explizite Negativabgrenzung: kein Manifest, keine zweite
   dauerhafte Liste, keine spekulativen Heuristiken über Titel/Chart.js-Nutzung/Dateinamen wie
   `index`.
2. In §15 (Migration) ergänzt: das freigegebene TESTENV-Inventar (`TESTENV-1a`/`TESTENV-1aFR`,
   beide GRÜN) ist die vollständige Ausgangsliste für die einmalige Migration; nach deren
   Abschluss müssen alle dauerhaften Testseiten dem Namensmuster oder dem Template-Marker
   entsprechen — das Inventar ist ausdrücklich nur Migrationsquelle, keine dauerhafte
   Laufzeitquelle des Checkers.

Damit ist die in `TESTENV-1bR` Fall 11/12 offene Lücke geschlossen: eine fehlplatzierte
Testseite ist jetzt über einen repo-weiten Namens-/Attribut-Scan erkennbar, ohne Manifest.

## 5. F-02 Script-/Stylesheet-Regel

Die bisher allgemeine CDN-Formulierung in §10 (Testdaten und lokale Referenzen) ersetzt durch die
präzise Regel: `<script src>`/`<link href>` dürfen in dauerhaften Testseiten ausschließlich
repository-relative oder lokale Pfade verwenden; absolute `http://`/`https://`-URLs in diesen
Elementen sind ein Strukturfehler. `cdn.jsdelivr.net` und `cdn.tailwindcss.com` explizit als
bekannte Regressionsbeispiele genannt (nicht als abschließende Enumerationsliste — die Regel
selbst greift generisch über jede absolute URL in diesen zwei Elementtypen). Lokale
Vendor-Dateien (`Theme/assets/js/vendor/chart.umd.min.js`) explizit als weiterhin erlaubt
benannt.

Ausdrücklich abgegrenzt: absolute Daten-URLs in `data-fw-data`, `data-fw-config`, `data-csv`
werden durch diese Regel **nicht** erfasst — dafür gelten weiterhin die Datenquellen-/
Domainregeln aus `APP-INTERFACE.md` §6/§7. Die parallele Checker-Regel in §12 Punkt 11 auf
dieselbe präzise Formulierung angeglichen (vorher: „keine unerlaubte CDN-Abhängigkeit").

Damit ist die in `TESTENV-1bR` F-02 benannte Lücke geschlossen, ohne eine dauerhaft zu pflegende
CDN-Hostliste einzuführen (Auftragsvorgabe §8: „keine ständig zu pflegende abschließende
CDN-Hostliste") — die Regel greift strukturell (Elementtyp + absolute URL), nicht über eine
Enumeration von Hostnamen.

## 6. F-03 Ghost-Abgrenzung

In §6 (Ghost-nahe Einbettung) direkt nach der bestehenden `.kg-card`-Beschreibung ergänzt: „Ghost-
nah" bedeutet Prüfung der realen HTML-Card, ihrer Attribute, der lokalen Bootstrap-Logik und
ihres Verhaltens im artikelähnlichen DOM-Kontext — **keine** vollständige Simulation von
Ghost-Admin, Server-Rendering, Theme-Build, Hosting oder produktiver Font-Auslieferung.
`tests/ghost/` bleibt wie zuvor ein reservierter, in diesem Standard weder gebauter noch weiter
spezifizierter Standardort.

Keine neue Ghost-Testarchitektur entworfen — reine Begriffsabgrenzung, wie vom Auftrag §9
vorgegeben.

## 7. Bewusst nicht geändert

- `docs/spec/APP-INTERFACE.md`, `docs/editorial/AUTHOR_GUIDE-v3.md` — nicht angefasst
  (Nicht-Ziel).
- §14 (Verbindliche Anweisung an bauende LLMs) — der Copy-Paste-Block enthält weiterhin den Satz
  „Keine CDN-Laufzeitabhängigkeit." Der Auftrag hat ausdrücklich nur „die bisher allgemeine
  CDN-Regel" in §10/§12 zu ersetzen verlangt, §14 nicht erwähnt. Beide Formulierungen
  widersprechen sich nicht (die präzisere Regel ist eine Verschärfung, keine Abweichung) — im
  Sinne des chirurgischen Patch-Grundsatzes nicht mitgeändert, da nicht beauftragt.
- Kein Template, kein Shared CSS/JS, kein Python-Checker, kein Launcher gebaut.
- Kein Altbestand migriert, keine Fixtures verschoben, keine Dubletten gelöscht, kein Inventar
  aktualisiert.
- Keine neuen Attribute oder Enums eingeführt; kein alter Harness-Vertrag wiederbelebt.

## 8. Deterministische Nachweise

Alle Prüfungen aus Auftrag §12 per `grep -c` gegen die reale Datei durchgeführt:

```text
=== F-01 ===
*.test.html: 2 Treffer
data-fw-test-template: 5 Treffer
"gesamte Repository": 1 Treffer
tests/scratch/: 3 Treffer
TESTENV-Inventar: 1 Treffer
→ kein Manifest als Pflicht, keine zweite dauerhafte Testliste (explizit ausgeschlossen in §12.1)

=== F-02 ===
<script src>: 2 Treffer
<link href>: 2 Treffer
http://: 2 Treffer
https://: 3 Treffer
cdn.jsdelivr.net: 1 Treffer
cdn.tailwindcss.com: 1 Treffer
data-fw-data: 3 Treffer
data-fw-config: 2 Treffer
data-csv: 3 Treffer
APP-INTERFACE.md: 12 Treffer
→ ausdrückliche Abgrenzung für data-fw-data/data-fw-config/data-csv gegen APP-INTERFACE.md vorhanden

=== F-03 ===
Ghost-Admin: 1 Treffer
Server-Rendering: 1 Treffer
Theme-Build: 1 Treffer
Hosting: 1 Treffer
produktiver Font-Auslieferung: 1 Treffer

=== Negativprüfung ===
harness-manifest: 1 Treffer (weiterhin nur in §1.3, als entfernt benannt)
migration-pending: 1 Treffer (weiterhin nur in §1.3)
appMaturity: 1 Treffer (weiterhin nur in §1.3)
expected-result: 1 Treffer (weiterhin nur in §1.3)
```

Alle geforderten Begriffe vorhanden, keine der vier Altkonzepte als neue aktive Pflicht
wieder eingeführt (unverändert je 1 Treffer, ausschließlich im bereits vor diesem AP bestehenden
§1.3-Absatz „bewusst nicht fortgeführt").

Abschnittszahl der Standarddatei weiterhin exakt 17 (`grep -c "^## [0-9]"` → 17) — keine neue
Top-Level-Sektion eingeführt, alle Ergänzungen sind Unterabschnitte oder Absätze in bestehenden
Abschnitten (§6, §10, §12, §15).

## 9. Scope-QA

```text
=== AP-eigener Diff ===
M docs/testing/TEST_PAGE_STANDARD.md
A docs/steering/patches/TESTENV-1bRF_review-findings-schliessen_Ergebnis.md
```

`git status --short` am Ende zeigt zusätzlich ausschließlich die drei bekannten,
unangetasteten Fremdänderungen/-artefakte (`TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md`,
`STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA_V1.md`, `session-log.md`) sowie die bereits
bestehenden `TESTENV-1b`-/`TESTENV-1bF`-/`TESTENV-1bR`-Ergebnisdateien und den `docs/testing/`-
Ordner (unverändert außer der hier vorgenommenen Edit an `TEST_PAGE_STANDARD.md`). Keine dieser
Dateien wurde geändert, gelöscht, zurückgesetzt, gestaged oder bewertet.

## 10. Wiederlesen / Datei-Wahrheit

- Alle drei geänderten Abschnitte (§6, §10+§12, §15) jeweils mit vollständigem Kontext neu vom
  Datenträger gelesen (nicht nur die eingefügten Zeilen isoliert) — Formulierungen decken sich
  wortgleich mit den Auftragsvorgaben §7/§8/§9.
- Alle Nachbedingungen aus §12 des Auftrags per `grep -c` gegen die reale Datei geprüft (§8
  oben), alle bestanden.
- Diese Ergebnisdatei nach dem Schreiben vollständig neu gelesen (State-Bestätigung durch das
  Schreibwerkzeug, Inhalt wie beabsichtigt).
- Geprüft: keine neue Architektur oder zusätzliche Pflicht eingeführt (Abschnittszahl
  unverändert 17, keine neuen Top-Level-Abschnitte, Negativprüfung §8 bestanden).
- Geprüft: `TESTENV-1c` kann ohne weitere Entscheidung starten — Template-Markup, Fehlerbox,
  Launcher-Quelle, Checker-Kernregeln UND die drei jetzt geschlossenen Detailregeln
  (Discovery, Script-/Stylesheet-Verbot, Ghost-Abgrenzung) liegen vollständig determiniert vor.

## 11. Nächster AP

**Status GRÜN → `TESTENV-1c` — Template, Shared CSS/JS, Python-Checker und Launcher bauen.**

Kein weiterer `TESTENV-1bR2`, kein erneuter Vollreview.

Weiter nur nach Alberts OK.
