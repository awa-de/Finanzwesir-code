Stand: 2026-07-11 | Session: TESTENV-1cF | Geändert von: Claude (Sonnet)

# TESTENV-1cF – Absichtlich fehlende lokale Referenzen explizit kennzeichnen

## 1. Status und Kurzurteil

**Status: GRÜN**

Modell-Gate bestanden (Claude Sonnet 5). Das neue optionale Attribut
`data-fw-test-allow-missing-ref` ist normativ in `TEST_PAGE_STANDARD.md` §10.1 definiert, im
Checker (`tools/check-test-pages.py`) testfalllokal implementiert und an der einen realen Stelle
(`Apps/prokrastinations-preis/app.test.html`, Testfall I) chirurgisch angewendet. Alle 28
bestehenden temporären Tests bestehen weiterhin unverändert (keine Regression), alle 4
vorgegebenen neuen Fälle (P-07, N-23, N-24, N-25) und 4 zusätzliche Negativprüfungen (leerer
Marker, Marker außerhalb `data-fw-test-case`, Marker mit absoluter URL, zwei identische passende
Referenzen) bestehen. Der reale Checker-Bericht sinkt exakt von 6 auf 5 Strukturfehler, die
`nonexistent.csv`-Meldung ist verschwunden, keine neue unerwartete Fehlerklasse, keine interne
Exception. Der Launcher ist byte-identisch vor/nach der Änderung. Keine Migration, keine andere
Testseite verändert, keine Architektur neu erfunden.

## 2. Modell-Gate und Risikoklasse

Aktives Modell: Claude Sonnet 5 (Basismodell dieser Instanz, unverändert seit `/model sonnet`) —
eindeutig Sonnet-Familie, Gate bestanden. Risikoklasse **A** (deterministischer
Infrastruktur-Minifix, Lösung im Auftrag vollständig vorgegeben).

## 3. Vorprüfung und Fundstellenkarte

`git status --short`/`git diff --name-status` vor dem ersten Write geprüft: ausschließlich
bekannte, bereits bestätigte Fremdänderungen/-artefakte aus vorherigen APs dieses Fadens
(`TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md`, `STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA_V1.md`,
sitzungseigene `session-log.md`, `.gitignore`, `AUTHOR_GUIDE-v3.md`, alle `TESTENV-1b*`/`1c`-
Ergebnisdateien, `docs/testing/`, `tests/`, `tools/check-test-pages.py`). Keine STOP-Bedingung.

Fundstellenkarte:

- `TEST_PAGE_STANDARD.md` §10 (Zeile ~303) beschreibt absichtlich fehlende Referenzen bislang nur
  als für den menschlichen Prüfer zulässig, ohne Checker-Deklarationsmechanismus.
- `check-test-pages.py` verarbeitet `data-fw-data`/`data-fw-config`/`data-csv` global über
  `check_data_ref`/`validate_references`, ohne Testfallbezug.
- Testfall I liegt exakt in `Apps/prokrastinations-preis/app.test.html:162-176`
  (`<!-- Szenario I -->` bis zum schließenden `</div>`), einzige Referenz auf
  `./test-data/nonexistent.csv` im gesamten realen Testbestand.
- Realer Vorher-Bericht: 6 Strukturfehler, davon einer exakt
  `data-fw-data: referenzierte Datei './test-data/nonexistent.csv' existiert nicht.`

## 4. Standardänderung

`docs/testing/TEST_PAGE_STANDARD.md` §10 dritter Bullet präzisiert: die bisherige
„für den menschlichen Prüfer"-Aussage bleibt bestehen, ergänzt um den expliziten Hinweis, dass der
**Checker** zusätzlich die formale Deklaration in §10.1 verlangt. Neuer Unterabschnitt **§10.1
„Bewusst fehlende lokale Referenzen (`data-fw-test-allow-missing-ref`)"** — vollständig wie im
Auftrag §9.1–9.6 vorgegeben: Bedeutung, exakter Stringvergleich ohne Pfadnormalisierung,
zulässiger Anwendungsbereich (nur `data-fw-data`/`data-fw-config`/`data-csv`, nie Script/Stylesheet/
absolute URLs), 5 Gültigkeitsbedingungen, 9 Fehlerfälle, „nur eine Ausnahme pro Testfall" ohne
Listen-/JSON-Syntax. §14 (LLM-Bauanweisung) um den vorgegebenen Zusatzsatz ergänzt. Keine neue
Top-Level-Architektursektion — beide Ergänzungen liegen in bereits bestehenden Abschnitten (§10,
§14).

## 5. Checkeränderung

`tools/check-test-pages.py` — zwei neue Funktionen, keine bestehende Funktionssignatur entfernt:

- `find_local_data_refs_in_case(case)` — sammelt alle `data-fw-data`/`data-fw-config`/`data-csv`
  innerhalb eines Testfalls (Knoten, Attributname, Rohwert).
- `validate_allow_missing_markers(root, path, dom, test_cases)` — implementiert den 7-Schritte-
  Algorithmus exakt wie in §11/§12 des Auftrags vorgegeben:
  1. Marker außerhalb `data-fw-test-case` → Fehler (Vergleich gegen die Menge der `test_cases`-
     Knoten-IDs, nicht nur „irgendwo innerhalb").
  2. Leerer Markerwert (nach `strip()`) → Fehler.
  3. Absolute URL als Markerwert → Fehler.
  4. Passende lokale Card-Referenzen im selben Testfall sammeln (exakter Stringvergleich nach
     `strip()`, keine Pfadnormalisierung).
  5. 0 Treffer → Fehler; >1 Treffer → Fehler; genau 1 Treffer → weiter.
  6. Reale Existenzprüfung über das bestehende `resolve_local_ref`: Datei existiert (`ok`) → Fehler
     „Ausnahme entfernen"; Datei fehlt (`not_found`) → Ausnahme gültig, Knoten+Attribut in die
     `exempt`-Menge aufgenommen. `case_mismatch`/`escapes_repo` werden bewusst **nicht** exemptiert
     (andere Fehlerklasse als „bewusst nicht vorhanden") — die normale Referenzprüfung meldet sie
     wie gewohnt.
  7. `validate_references()` erhält die `exempt`-Menge als neuen optionalen Parameter
     (`frozenset`, Default leer) und überspringt exakt diese `(id(node), attr_name)`-Paare —
     alle anderen lokalen Referenzen (Script/Stylesheet, andere Card-Attribute, andere Testfälle)
     durchlaufen unverändert die bisherige Prüfung.

Integration in `validate_test_page`: Aufruf direkt vor `validate_references`, Findings beider
Funktionen werden zusammengeführt. Keine Änderung an Discovery, Standardorten, Launcher,
Dublettenprüfung, CDN-Regel, Case-Sensitivitätsprüfung, Exit-Code-Logik oder der
Ausgabegrenze „strukturell korrekt, nicht funktional bestanden" — alles unverändert wie in §14
des Auftrags gefordert.

## 6. Chirurgische Änderung an Testfall I

`Apps/prokrastinations-preis/app.test.html` Zeilen 163–165 — ausschließlich der äußere Container
von Testfall I geändert:

```diff
-  <div class="test-section">
+  <div class="test-section"
+       data-fw-test-case
+       data-fw-test-allow-missing-ref="./test-data/nonexistent.csv">
```

Kein anderer Testfall angefasst, kein Template-Marker ergänzt, kein Shared CSS/JS ergänzt, CDN
nicht ersetzt, Erwartungstext (`<p class="test-meta">`) nicht umgeschrieben, Ghost-Card und
`data-fw-data` unverändert, keine Datei `nonexistent.csv` angelegt. `git diff` bestätigt exakt
diese 3 hinzugefügten Zeilen als einzige Änderung an der Datei.

## 7. Neue Selbsttests

Ergänzt im bestehenden temporären Verifikations-Harness (Scratchpad, außerhalb des Repositorys):

```text
[OK] P-07 passend markierte fehlende Referenz -- kein Fehler deswegen
[OK] N-23 unmarkierte fehlende Referenz bleibt Fehler
[OK] N-24 falscher Markerpfad -- Marker ohne passende Referenz UND unmarkierte fehlende Referenz
[OK] N-25 Marker fuer real existierende Datei -- ueberfluessig
[OK] Zusatz: leerer Marker -- Fehler
[OK] Zusatz: Marker ausserhalb data-fw-test-case -- Fehler
[OK] Zusatz: Marker mit absoluter URL -- Fehler
[OK] Zusatz: zwei identische passende Referenzen -- Fehler
```

Alle 8 bestanden.

## 8. Regression der bestehenden Checkerregeln

Die vollständige bisherige Matrix (P-01–P-06, N-01–N-22, insgesamt 28 Fälle) erneut ausgeführt —
alle 28 weiterhin bestanden, keine Regression durch die neuen Funktionen oder die geänderte
Signatur von `validate_references`. Gesamtlauf: **36 Fälle, 0 fehlgeschlagen.**

## 9. Realer Vorher-Nachher-Lauf

**Vorher** (vor Standard-/Checker-/Testfalländerung, gesichert vor dem ersten Write):

```text
Geprueft dauerhafte Testseiten: 1
Strukturfehler: 6
Exit-Code: 1
```
(inkl. `data-fw-data: referenzierte Datei './test-data/nonexistent.csv' existiert nicht.`)

**Nachher:**

```text
Geprueft dauerhafte Testseiten: 1
Strukturfehler: 5
Exit-Code: 1
```

Die verbliebenen 5 Meldungen:

1. externe Script-Abhängigkeit `cdn.jsdelivr.net`;
2. fehlender Template-Marker `data-fw-test-template`;
3. fehlendes Shared CSS;
4. fehlendes Shared JS;
5. `Testfall #1: erwartet genau einen Block data-fw-expected-behavior, gefunden: 0.`

Meldung 5 ist die im Auftrag §19 explizit antizipierte Umgruppierung: die vorherige, dokumentweite
Meldung „Kein Element mit data-fw-test-case gefunden" ist verschwunden, weil Testfall I jetzt
korrekt als Testfall erkannt wird — er besitzt aber (noch) keinen `data-fw-expected-behavior`-
Block (sein `<p class="test-meta">` ist unverändert, wie in §15 des Auftrags ausdrücklich
gefordert). Dieselbe Fehlerklasse („fehlender/nicht erkannter Testfall-Vertrag"), keine neue,
unerwartete Klasse — Gesamtsumme exakt 5, keine interne Exception. Kein Fehler mehr für
`nonexistent.csv`.

## 10. Launcher-Nachweis

`tests/index.html` vor und nach der Änderung per SHA-256 verglichen:
`8fad7b3db9a6c61d45c5149fbba95eb73722bf1b3dc56860e8fed26706b3ad34` — **identisch**. Titel und
Discovery-Ergebnis unverändert (weiterhin 1 Eintrag unter „Apps", markiert „(Strukturfehler)").
Kein manueller Write an `tests/index.html`.

## 11. Bewusst nicht migriert

- `Apps/prokrastinations-preis/app.test.html` bleibt im Übrigen unmigriert (CDN-Chart.js, kein
  Template-Marker, kein Shared CSS/JS, Testfall I ohne `data-fw-expected-behavior`) — nur die eine
  beauftragte Ergänzung vorgenommen.
- Kein anderer Testfall der Seite verändert.
- Keine Legacy-Chart-Workbench, kein `Theme/index.html`, keine Design-System-Testseite angefasst.
- Kein Inventar aktualisiert, keine Datei verschoben oder gelöscht.

## 12. Scope-QA

AP-eigener Diff — genau wie im Auftrag §27 vorgegeben:

```text
M docs/testing/TEST_PAGE_STANDARD.md         (Ordner insgesamt weiterhin untracked, s. u.)
M tools/check-test-pages.py                  (Datei insgesamt weiterhin untracked, s. u.)
M Apps/prokrastinations-preis/app.test.html  (getrackt, zeigt real als M)
A docs/steering/patches/TESTENV-1cF_absichtlich-fehlende-referenzen_Ergebnis.md
```

`git status --short` zeigt `Apps/prokrastinations-preis/app.test.html` korrekt als `M`.
`docs/testing/TEST_PAGE_STANDARD.md` und `tools/check-test-pages.py` liegen weiterhin in
Ordnern/Dateien, die seit ihrer Ersterstellung in `TESTENV-1b`/`TESTENV-1c` nie committed und daher
als `??` (nicht als eigenständiges `M`) geführt werden — das ist dieselbe, bereits in den
Vorgänger-Protokollen dokumentierte Git-Mechanik, keine neue Auffälligkeit.

`tests/index.html`, `docs/testing/templates/app.test.template.html`, `tests/shared/test-page.css`,
`tests/shared/test-page.js`, `.gitignore`, `docs/spec/APP-INTERFACE.md`, `docs/editorial/
AUTHOR_GUIDE-v3.md` sowie alle anderen Testfälle in `app.test.html` — **nicht verändert**
(verifiziert per Diff-Kontext und erneutem Lesen, siehe §13).

`nonexistent.csv` wurde an keiner Stelle angelegt (`ls` bestätigt „No such file or directory").
Ein Nebenprodukt der eigenen temporären Verifikation (`tools/__pycache__/`) wurde vor diesem
Protokoll entfernt.

## 13. Wiederlesen / Datei-Wahrheit

- **Beim ersten vollständigen Wiederlesen selbst gefunden und korrigiert:** Die §10.1-Einfügung
  landete zunächst mitten in der ursprünglichen §10-Bullet-Liste, sodass die nachfolgenden
  CDN-/Script-Regel-Bullets („In dauerhaften Testseiten dürfen...", „Absolute Daten-URLs...",
  „Auf neu gebauten...") optisch unter der neuen §10.1-Überschrift zu hängen schienen — ein reiner
  Gliederungsfehler, kein inhaltlicher. Korrigiert: alle ursprünglichen §10-Bullets bleiben
  geschlossen vor §10.1, die neue Unterüberschrift folgt erst danach. Nach der Korrektur erneut
  gegen den Datenträger verifiziert (Abschnittszahl weiterhin 17 Top-Level-Abschnitte, 2
  Unterabschnitte `### 10.1`/`### 12.1`) und alle 36 temporären Tests sowie der reale Checker-Lauf
  (weiterhin 5 Strukturfehler) erneut bestanden.
- Geänderter Abschnitt §10/§10.1/§14 in `TEST_PAGE_STANDARD.md` vollständig mit Kontext neu vom
  Datenträger gelesen (nicht nur die eingefügten Zeilen isoliert).
- `tools/check-test-pages.py` — die beiden neuen Funktionen und die geänderte Signatur von
  `validate_references` gegen den realen Dateiinhalt geprüft.
- Testfall I samt vorherigem Testfall H und folgendem Testfall J erneut gelesen — genau 3 neue
  Zeilen, kein anderer Testfall berührt.
- Diese Ergebnisdatei nach dem Schreiben vollständig neu gelesen.
- `git diff --name-status`/`git status --short` nach Abschluss erneut geprüft (§12).
- Alle 36 temporären Tests ein zweites Mal nach Fertigstellung aller Änderungen ausgeführt —
  weiterhin 36/36 bestanden.
- Realer Checker-Bericht ein zweites Mal erzeugt — weiterhin exakt 5 Strukturfehler, kein
  `nonexistent.csv`-Fund, keine Exception.
- Launcher-Hash vor/nach verglichen (§10) — identisch.
- `ls Apps/prokrastinations-preis/test-data/nonexistent.csv` erneut geprüft — weiterhin nicht
  vorhanden.

## 14. Nächster Arbeitsbereich

**Bei GRÜN (dieser Status): `TESTENV-1d` — Altbestand anhand Inventar (`TESTENV-1a`/
`TESTENV-1aFR`) und Checker-Bericht klassifizieren: KEEP / MERGE / DELETE.**

Der Ausgangsbericht für `TESTENV-1d` enthält jetzt nur noch echte Handlungsbedarfe (5 statt 6
Strukturfehler für die eine reale Testseite; die 18 Legacy-Chart-Workbenches, `Theme/index.html`
und die 2 Design-System-Seiten bleiben wie erwartet unentdeckt bis zur Migration).

Noch nicht: Dateien verschieben, Dubletten löschen, Fixtures reparieren, Testseiten modernisieren,
Launcher vollständig füllen, Commit oder Push.

Weiter nur nach Alberts OK.
