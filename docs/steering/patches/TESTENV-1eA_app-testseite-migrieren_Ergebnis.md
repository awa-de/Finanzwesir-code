Stand: 2026-07-11 | Session: TESTENV-1eA | Geändert von: Claude (Sonnet)

# TESTENV-1eA – App-Testseite migrieren

## 1. Status und Kurzurteil

**Status: GELB**

`Apps/prokrastinations-preis/app.test.html` ist vollständig auf den freigegebenen
`TEST_PAGE_STANDARD.md` migriert: Template-Marker, Shared CSS/JS, lokales Vendor-Chart.js, alle 32
natürlichen Testfälle als `data-fw-test-case` mit je einem sichtbaren `data-fw-expected-behavior`-
Block. **Kein Testfall wurde entfernt, zusammengelegt oder fachlich umformuliert.** Der Checker-
Bericht sank von 5 auf 2 Strukturfehler — beide sind keine Migrationsfehler, sondern bereits vor
diesem AP bestehende, bewusste Negativtests der App selbst, die mit Albert abgestimmt unverändert
erhalten bleiben (siehe §9). Deshalb GELB statt GRÜN: die Seite ist inhaltlich vollständig migriert,
aber der Checker meldet für sie noch 2 dokumentierte, architektur-bedingte Befunde statt 0.

**Wichtige Vorab-Korrektur:** Die im Auftrag angenommene Zahl „34 Testfälle" war ein Zählfehler
(bereits in `TESTENV-1a` unentdeckt übernommen). Die reale, mathematisch stimmige Zahl ist **32**
(Buchstabenfolge A–Z + AA–AF = 26 + 6 = 32). Albert hat nach Rückfrage bestätigt, mit 32 als
korrekter Zahl fortzufahren.

**Nachtrag:** Albert hat den Browser-Smoke-Test real durchgeführt — **bestanden** — und
`TESTENV-1eA` fachlich freigegeben (siehe §8, §11).

## 2. Geänderte Dateien

- `Apps/prokrastinations-preis/app.test.html` — migriert.
- `tests/index.html` — ausschließlich über `python tools/check-test-pages.py --write-index`
  neu erzeugt (listet die App-Testseite weiterhin mit „(Strukturfehler)"-Hinweis, siehe §7).
- `docs/steering/patches/TESTENV-1eA_app-testseite-migrieren_Ergebnis.md` — neu.

Keine andere Datei geändert (siehe Scope-QA, §10).

## 3. Vorher-/Nachher-Zählung der Testfälle

| Merkmal | Vorher | Nachher |
|---|---|---|
| Natürliche Testfälle (`test-section`-Blöcke bzw. `data-fw-test-case`) | 32 | 32 |
| `<h2>` gesamt | 33 (32 Testfall-Überschriften + 1 CSS-Leak-Decoy-`<h2>` in Szenario G) | 34 (dieselben 33 + 1 neue „Technische Fehler"-Überschrift der Fehlerbox) |
| `.kg-card` | 33 (Szenario D hat 2) | 33 |
| `data-fw-data`-Referenzen | 29 | 29, wortidentisch |
| 404-Marker (`data-fw-test-allow-missing-ref`) | 1, aus `TESTENV-1cF` | 1, unverändert `./test-data/nonexistent.csv` |

Deterministisch geprüft: alle 33 ursprünglichen `<h2>`-Texte sind nach Whitespace-Normalisierung
**inhaltlich und in exakt derselben Reihenfolge** in der migrierten Datei vorhanden (Python-
Vergleich `alt == neu` → `True`). Die eine zusätzliche `<h2>` ist ausschließlich die neue, vom
Standard vorgegebene Fehlerbox-Überschrift — keine verlorene oder verschobene Testfall-Überschrift.

## 4. Migration im Detail

- **Dokumentkopf:** `tokens.css` → Shared CSS (`tests/shared/test-page.css`) → `app.css`; Shared JS
  (`tests/shared/test-page.js`, `defer`) ergänzt. CDN-Chart.js (`cdn.jsdelivr.net`) ersetzt durch
  lokales `../../Theme/assets/js/vendor/chart.umd.min.js`. `<body>` trägt jetzt
  `class="fw-test-page" data-fw-test-template="1"`.
- **Testseitenkopf:** neuer `<header class="fw-test-header">` mit unverändertem Bedienhinweis
  („Muss über VSCode Live Server geöffnet werden …"), `data-fw-runtime-status`-Laufzeitanzeige und
  `data-fw-test-errors`/`data-fw-test-error-list`-Fehlerbox nach Templatevorgabe.
- **Lokales `<style>`:** auf die einzige noch page-spezifische Regel reduziert (`.kg-card`-Chrome);
  die vormaligen `body`-, `.test-section`- und `.test-meta`-Regeln entfallen, da die gleichwertige
  Gestaltung jetzt aus Shared CSS (`.fw-test-page`, `.fw-test-case`, `.fw-test-expected`) kommt.
- **Alle 32 Testfälle:** `<div class="test-section">` → `<div class="fw-test-case" data-fw-test-case>`
  (Testfall I behält zusätzlich seinen bestehenden `data-fw-test-allow-missing-ref`-Marker
  unverändert); `<p class="test-meta">…<br>…</p>` → `<div class="fw-test-expected"
  data-fw-expected-behavior><h3>Erwartetes Verhalten</h3><ul><li>…</li>…</ul></div>` — jede durch
  `<br>` getrennte Zeile wurde 1:1 (nur Whitespace normalisiert) zu einem `<li>`. Kein Fachtext
  umformuliert, keine Testfälle zusammengelegt oder entfernt, Kommentare/AP-Bezüge unverändert.
  Transformation deterministisch per Python-Skript über alle 32 strukturell gleichförmigen Blöcke
  durchgeführt (Skript im Scratchpad, nicht im Repository), danach Stichproben (Testfall I, G, AF,
  D) und die vollständige Zählung von Sonnet geprüft.
- **Testfall G (CSS-Leak-Check):** die verschachtelte `<article>` mit dem absichtlichen Decoy-`<h2>`
  und der zweiten `.kg-card` blieb vollständig unangetastet — nur die äußere Hülle und der eigene
  `<p class="test-meta">` wurden wie bei allen anderen Testfällen behandelt.
- **Testfall AF:** nur Hülle und Erwartungsblock migriert; die eigentliche Engine-Test-Logik
  (`.kg-card` mit `data-fw-appchart`-Container, Button, `<script type="module">` mit direktem
  `ChartEngine`-Aufruf) blieb vollständig unverändert (siehe §9).

## 5. Nachweise (§5 des Auftrags)

| # | Nachweis | Ergebnis |
|---|---|---|
| 1 | genau 32 `data-fw-test-case` | ✅ bestätigt |
| 2 | 32 Testfallüberschriften, gleiche Liste/Reihenfolge | ✅ bestätigt (alle 33 `<h2>`, s. §3) |
| 3 | jeder Testfall genau ein `data-fw-expected-behavior` | ✅ bestätigt (32 Vorkommen, 1:1 zu 32 Testfällen) |
| 4 | jeder Erwartungsblock enthält sichtbaren Text | ✅ bestätigt (0 leere Blöcke) |
| 5 | keine `.kg-card` verloren | ✅ bestätigt (33 vorher, 33 nachher) |
| 6 | 404-Marker + fehlende Referenz weiterhin vorhanden | ✅ bestätigt |
| 7 | `nonexistent.csv` weiterhin nicht vorhanden | ✅ bestätigt |
| 8 | keine absolute Script-/Stylesheet-URL | ✅ bestätigt (0 Treffer) |
| 9 | Shared CSS/JS + lokale Vendor-Datei korrekt auflösbar | ✅ bestätigt (Checker meldet dazu keinen Fehler mehr) |
| 10 | Checker meldet für diese Seite keine Strukturfehler | ❌ **2 verbleibende, dokumentierte Befunde** (§9) |

## 6. Checker-Ergebnis

Vorher (vor der Migration, zur Bestätigung des bekannten Standes):

```text
Strukturfehler: 5 (externe Script-Abhängigkeit, fehlender Template-Marker, fehlendes
Shared CSS, fehlendes Shared JS, fehlender Erwartungsblock)
```

Nachher:

```text
STRUKTURFEHLER
Apps/prokrastinations-preis/app.test.html
- Testfall #3, .kg-card #1: .fw-app ohne (nicht-leeres) data-fw-app.

STRUKTURFEHLER
Apps/prokrastinations-preis/app.test.html
- Testfall #32, .kg-card #1: erwartet genau einen Produktionscontainer (.fw-app oder .financial-chart-module), gefunden: 0.

TESTSEITEN-STRUKTUR: FEHLER
Gepruefte dauerhafte Testseiten: 1
Strukturfehler: 2
```

Keine interne Checkerexception. Keine sonstige Datei durch den Checker-Lauf verändert.

## 7. Launcher-Ergebnis

`python tools/check-test-pages.py --write-index` erzeugt `tests/index.html` erfolgreich; die
App-Testseite erscheint unter „Apps", weiterhin mit dem Zusatz „(Strukturfehler)" — das ist die
korrekte, ehrliche Launcher-Ausgabe angesichts der 2 verbliebenen, dokumentierten Befunde (§9). Der
Launcher filtert nichts still aus, wie vom Standard gefordert.

## 8. Browser-Smoke-Test

**Browser-Smoke bestanden — von Albert real durchgeführt.** In dieser Umgebung stand kein
Werkzeug zur eigenen Browser-Bedienung zur Verfügung (kein Playwright/Puppeteer o. ä.); Claude hat
den Test daher nicht selbst behauptet. Albert hat ihn über
`http://127.0.0.1:5500/Apps/prokrastinations-preis/app.test.html` nachgeholt und bestanden.

## 9. Bekannte, bewusst nicht behobene Befunde

Beide verbleibenden Checker-Meldungen sind **keine Migrationsfehler**, sondern bereits vor diesem
AP bestehende, bewusste Negativtests der App, die strukturell mit der starren Ghost-Card-Vertrag-
Prüfung des Checkers kollidieren:

1. **Testfall #3 (Szenario C — „Fehlender Slug (kein data-fw-app)")**: Die `.fw-app`-Card besitzt
   absichtlich **kein** `data-fw-app`-Attribut — genau das ist der Testzweck (Prüfung des
   Error-States bei fehlendem Slug). Der Checker verlangt laut `TEST_PAGE_STANDARD.md` §22.6 ein
   nicht-leeres `data-fw-app`; für „absichtlich fehlendes Pflichtattribut" existiert (anders als für
   fehlende Dateireferenzen über `data-fw-test-allow-missing-ref`) noch kein Deklarationsmechanismus.
2. **Testfall #32 (Szenario AF — „FwChartTextPlugin Smart-Update-Testfall")**: Diese Karte ruft
   laut eigenem Kommentar bewusst `ChartEngine` direkt über den Daten-Bridge-Pfad auf
   (`APP-INTERFACE.md` §4, „Pfad 2"), nicht über eine Ghost-Card — ihr `.kg-card` enthält daher
   `data-fw-appchart` statt `.fw-app`/`.financial-chart-module`.

**Mit Albert während dieses APs abgestimmt** (siehe Interaktion in der Session): Beide Testfälle
bleiben inhaltlich und strukturell unverändert, die Checker-Befunde werden dokumentiert statt durch
Checkeränderung (out of scope) oder fachliche Neuschreibung „repariert". Eine mögliche künftige
Erweiterung des Checkers (z. B. ein Marker für „absichtlich fehlendes Pflichtattribut" oder
Anerkennung von `data-fw-appchart` als dritter gültiger Produktionscontainer-Typ) ist eine
eigenständige Architekturfrage für einen späteren AP, nicht Teil dieser Migration.

## 10. Scope-QA

- Ausschließlich `Apps/prokrastinations-preis/app.test.html`, `tests/index.html` (nur via
  `--write-index`) und diese Ergebnisdatei geändert/angelegt.
- `app.js`, `app.css`, App-Fixtures, Shared CSS/JS, Checker, Standard, Template, andere Testseiten,
  Engine- und Produktionscode — **nicht verändert**.
- Ein temporäres Vergleichs-Backup (`app.test.html.BACKUP`) wurde während der Verifikation kurz im
  Repository-Ordner angelegt (für einen direkten Vorher-/Nachher-Diff mit korrekt auflösenden
  relativen Pfaden) und **vor Abschluss wieder entfernt** — kein Repository-Artefakt dieses APs.
  Ebenso ein durch die eigene Checker-Ausführung entstandener `tools/__pycache__/`-Ordner entfernt.
- `git status --short` am Ende zeigt ausschließlich die erwartete Änderung an
  `Apps/prokrastinations-preis/app.test.html` zusätzlich zu den bereits bekannten Fremdänderungen/
  -artefakten der vorherigen APs dieses Fadens.

## 11. Nächster Schritt

**Albert hat `TESTENV-1eA` fachlich freigegeben** (Browser-Smoke bestanden, §8; die zwei in §9
dokumentierten Checker-Befunde bleiben bewusst akzeptierte, dauerhafte Ausnahmen, kein
Nachbesserungsbedarf). Status bleibt formal **GELB** (der Checker meldet weiterhin 2 statt 0
Befunde), gilt aber als abgeschlossen und freigegeben.

Nächster Schritt: `TESTENV-1eB`, gebündelte Engine-/Fixture-Migration (gemäß Migrationsbatch 2 aus
`TESTENV-1d`).
