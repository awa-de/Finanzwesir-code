Stand: 2026-07-11 | Session: TESTENV-1bF | Geändert von: Claude (Sonnet)

# TESTENV-1bF – Testseitenvertrag auf Ghost-nahen Minimalstandard reduzieren

## 1. Status und Kurzurteil

**Status: GRÜN**

Modell-Gate bestanden (Claude Sonnet 5). Der überdimensionierte `HARNESS_CONTRACT.md` ist gelöscht
und durch `docs/testing/TEST_PAGE_STANDARD.md` ersetzt — einen normativen Minimalstandard für
manuelle, Ghost-nahe Testseiten ohne Manifest, Lifecycle, Capability-Katalog oder Schema-System.
`AUTHOR_GUIDE-v3.md` ist gezielt auf den kanonischen `fw-app`/`data-fw-app`/`data-fw-data`-Vertrag
synchronisiert. Keine neue Architekturentscheidung getroffen — nur die bereits entschiedene
Minimalarchitektur (§1 des Auftrags) verbindlich dokumentiert. Historisches `TESTENV-1b`-Ergebnis
unverändert. Scope exakt eingehalten.

Zwei vorbestehende, unerwartete Fremdänderungen (`docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md`,
`docs/steering/STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA_V1.md`) wurden bei der Vorprüfung
gefunden, Albert hat sie auf Rückfrage als bekannt und freigegeben bestätigt und angewiesen, sie
für diesen AP als zulässige Fremdänderungen zu behandeln — nicht ändern, nicht löschen, nicht
zurücksetzen, nicht bewerten. Entsprechend geschehen.

## 2. Risikoklasse und Modell-Gate

Risikoklasse **B** (gebündelte Vertrags- und Dokumentationskorrektur). Aktives Modell: Claude
Sonnet 5 (per `/model sonnet`, entspricht dem Basismodell dieser Instanz) — eindeutig
Sonnet-Familie, Gate bestanden.

## 3. Geprüfte Quellen

Pflicht gelesen: `docs/testing/HARNESS_CONTRACT.md` (vor Löschung), `TESTENV-1b_..._Ergebnis.md`,
`docs/spec/APP-INTERFACE.md`, `docs/editorial/AUTHOR_GUIDE-v3.md`,
`docs/editorial/Cheat-Sheet HTML-Karten.md`, `docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md`
(§1–§10, bis Zeile 893 von 1198 — Ghost-Card-Vertrag, App-Familien, Dateistruktur vollständig
abgedeckt; die restlichen Abschnitte P-04–Ende betreffen Architekturprinzipien ohne Bezug zum
Testseitenstandard), `docs/App-Fabrik/APP_FOLDER_STRUCTURE.md`,
`Apps/prokrastinations-preis/app.test.html`, `Theme/index.html` (Kopf), `TESTENV-1a`- und
`TESTENV-1aFR`-Ergebnisprotokolle (bereits vollständig aus `TESTENV-1b` bekannt, nicht erneut
komplett gelesen — Kerndaten unverändert).

Vorprüfung (§5 des Auftrags): `git status --short` und `git diff --name-status` vor dem ersten
Write geprüft; die zwei Fremdänderungen gefunden, an Albert zurückgemeldet, Freigabe erhalten
(siehe §1).

## 4. Entfernte Überarchitektur

Aus dem aktiven Vertrag entfernt (§1.3 des neuen Standards dokumentiert dies explizit):

- `tests/harness-manifest.json` als Pflichtregistrierung
- JSON Schema für Harness-Metadaten
- Capabilities und Capability-Grammatik (26 kanonische Werte, Erweiterungsregel)
- Harness-Lifecycle `active`/`migration-pending`/`archived`
- `migrationTarget`, `since`, `appMaturity`, `launcherVisible`, `usesChartJs` als Metadatum
- `expected-result`-Enum (`pass|error|visual|manual`) und Fehlerklassen-Enums
- doppelt gepflegte Manifest-/HTML-Felder und Präzedenzregeln Manifest↔HTML
- globale Harness-/Szenario-ID-Grammatiken als Pflicht
- ein dauerhaftes Migrationsregister

Jedes dieser Konzepte wird im neuen Standard genau einmal — in §1.3 — als bewusst nicht
fortgeführt benannt (Nachvollziehbarkeit), erscheint aber nirgends als aktive Pflicht. Deterministisch
geprüft: siehe §13.

## 5. Neuer Minimalstandard

`docs/testing/TEST_PAGE_STANDARD.md` (17 Pflichtabschnitte, vollständig):

1. Zweck und Grenzen — manuelle Ghost-nahe Prüfung, kein Testframework, Abgrenzung zum
   gelöschten Vorgängervertrag.
2. Kanonische Quellen — `APP-INTERFACE.md` bleibt Quelle der Wahrheit für Card-Attribute.
3. Verbindliche Ablageorte — exakt die im Auftrag (§8) vorgegebene Zielstruktur.
4. Grundaufbau — `data-fw-test-template="1"`, Laufzeitstatus-Block.
5. Testfall und erwartetes Verhalten — `data-fw-test-case`, `data-fw-expected-behavior`,
   sichtbare Erwartungspunkte.
6. Ghost-nahe Einbettung — zwei Schichten (Orientierung vs. `.kg-card`-Produktionscontainer).
7. App-Card-Vertrag — Mindestvertrag, verweist auf `APP-INTERFACE.md` §3.1.
8. Chart-Card-Vertrag — Mindestvertrag, verweist auf `APP-INTERFACE.md` §3.2.
9. Sichtbare technische Fehler — `window.onerror`, `unhandledrejection`, Fehlerbox-Format.
10. Testdaten und lokale Referenzen — Ablageorte, Case-Sensitivität, Negativtest-Zulässigkeit.
11. Shared CSS/JS — `tests/shared/test-page.{css,js}`, noch nicht gebaut.
12. Python-Strukturchecker — 14 Prüfpunkte + explizite Nicht-Prüfliste (§8 unten).
13. Automatisch erzeugte Übersicht — Launcher aus realen Dateien, kein Manifest.
14. Verbindliche Anweisung an bauende LLMs — kopierbarer Pflichtblock.
15. Einmalige Migration — 8-Schritt-Vorgehen, kein Dauerstatus.
16. Was der Standard nicht prüft.
17. Definition of Done — inkl. Alberts manueller Live-Server-Prüfung als letzter, nicht
    ersetzbarer Schritt.

## 6. Ghost-Card-Nähe

Jede Testseite bindet die **echte** produktive `fw-app`- bzw. `financial-chart-module`-Card ein,
keinen Sonder-Testcontainer (§6 des Standards). Card-Attribute sind nicht dupliziert kopiert,
sondern auf den notwendigen Mindestvertrag reduziert; `APP-INTERFACE.md` bleibt bei jedem
Widerspruch maßgeblich (§2 des Standards, explizit formuliert).

## 7. Erwartetes Verhalten und manuelle Prüfung

`data-fw-expected-behavior` ersetzt das entfernte `expected-result`-Enum durch **sichtbaren,
konkreten Text** direkt auf der Seite (§5.3 mit Beispiel). Die Definition of Done (§17 des
Standards) nennt Alberts manuelle Live-Server-Prüfung ausdrücklich als durch keinen Checker
ersetzbaren letzten Schritt — deckungsgleich mit der Leitidee aus §1 des Auftrags.

## 8. Python-Checker-Grenzen

§12 des Standards trennt scharf: 14 strukturelle Prüfpunkte (Ablage, Pflichtmarker, Card-Vertrag,
Referenzexistenz, Case-Sensitivität, CDN-Verbot, Dubletten, Launcher-Erzeugbarkeit) vs. 5 explizit
ausgeschlossene fachliche/visuelle Bewertungen. Der Checker selbst wird in diesem AP **nicht**
gebaut (§9).

## 9. Launcher ohne Manifest

§13 des Standards: `tests/index.html` wird aus den real gefundenen Testseiten und deren
`<title>`/`<h1>` erzeugt, gruppiert nach Ablageort (Apps/Engine/Tooling/Ghost). Keine zweite
manuell gepflegte Liste, kein Manifest als Zwischenschicht.

## 10. LLM-Bauanweisung

§14 des Standards enthält den im Auftrag vorgegebenen Pflichtblock unverändert in der Substanz
(Template verwenden, Ablageort, Testdaten-Ort, echte Ghost-Card, sichtbare Erwartungsblöcke,
konkrete Werte, Shared CSS/JS, kein CDN, Checker-Lauf nach Write, Checker ersetzt keine manuelle
Prüfung) — keine Capability- oder Manifestpflege verlangt.

## 11. AUTHOR_GUIDE-Synchronisierung

Ausschließlich das App-Card-Beispiel in `docs/editorial/AUTHOR_GUIDE-v3.md` (Abschnitt
„Interaktive Apps") geändert:

| Vorher | Nachher |
|---|---|
| `data-app="sparplan-rechner"` | `data-fw-app="sparplan-rechner"` |
| `data-app="etf-wahlurnen-rechner"` | `data-fw-app="etf-wahlurnen-rechner"` |
| `data-csv="https://www.finanzwesir.com/assets/data/msci-world.csv"` | `data-fw-data="https://www.finanzwesir.com/assets/data/msci-world.csv"` |
| „URL im `data-csv` anpassen" | „URL im `data-fw-data` anpassen" |

Das direkt anschließende Chart-Card-Beispiel (`financial-chart-module`, `data-csv="https://..."`)
wurde **nicht** geändert — es entspricht bereits dem kanonischen Legacy-Vertrag aus
`APP-INTERFACE.md` §3.2. Keine breite redaktionelle Überarbeitung, kein neuer Card-Vertrag
erfunden. Deterministisch geprüft (§13): 0 verbliebene `data-app=`/alte `data-csv`-Fw-App-Beispiele.

## 12. Bewusst noch nicht gebaut

- `tools/check-test-pages.py` (Strukturchecker)
- `docs/testing/templates/app.test.template.html` (Template)
- `tests/shared/test-page.{css,js}` (Shared CSS/JS)
- `tests/index.html` (Launcher)
- Migration/Verschieben irgendeiner Bestands-Testseite oder Fixture
- Ordnerstruktur `tests/` selbst

Alles davon ist ausdrücklich `TESTENV-1c` bzw. der Migration (§15 des Standards) zugewiesen.

## 13. Scope-QA

Deterministische Prüfungen (alle bestanden):

- `docs/testing/HARNESS_CONTRACT.md` existiert nicht mehr (`ls` → „No such file or directory").
- `docs/testing/TEST_PAGE_STANDARD.md` existiert, enthält genau 17 `## N.`-Abschnittsüberschriften.
- Standarddatei enthält: `data-fw-test-template="1"` (3×), `data-fw-test-case` (2×),
  `data-fw-expected-behavior` (3×), `.kg-card` (5×), `.fw-app` (als Selektor 1×, als
  `class="fw-app"` mehrfach), `.financial-chart-module` (1× als Selektor, mehrfach als Klasse),
  `tools/check-test-pages.py` (4×).
- Alte Altkonzepte (`migration-pending`, `migrationTarget`, `appMaturity`, `launcherVisible`,
  `usesChartJs`, `harness-manifest`, `expected-result`) kommen je genau **einmal** vor — jeweils
  in §1.3 als explizit „bewusst nicht fortgeführt" benannt, nirgends als aktive Pflicht.
  `Capability-Vokabular` kommt 0× vor.
- `AUTHOR_GUIDE-v3.md` enthält 0× `data-app=` oder die alte `data-csv`-Fw-App-Referenz; enthält
  `data-fw-app=` (2×) und `data-fw-data=` (1×); das unveränderte Chart-Card-`data-csv=` (1×,
  `financial-chart-module`) bleibt bestehen, wie gefordert.
- `TESTENV-1b_..._Ergebnis.md` unverändert (244 Zeilen, wie beim Schreiben in diesem Faden
  angelegt — nicht erneut editiert, kein Diff gegen diese Datei).

Diff-QA — TESTENV-1bF-eigener Scope (getrennt von den zwei bekannten Fremdänderungen):

```text
(gelöscht, nie getrackt) docs/testing/HARNESS_CONTRACT.md
A (untracked)             docs/testing/TEST_PAGE_STANDARD.md
M                          docs/editorial/AUTHOR_GUIDE-v3.md
A (dieses Protokoll)      docs/steering/patches/TESTENV-1bF_testseitenvertrag-minimalisieren_Ergebnis.md
```

Zusätzlich vorhanden (nicht Teil dieses APs, wie mit Albert geklärt):

- `.claude/learning/session-log.md` — sitzungseigen (M)
- `docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md` — bekannte Fremdänderung (M)
- `docs/steering/STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA_V1.md` — bekannte Fremdänderung (neu)
- `docs/steering/patches/TESTENV-1b_..._Ergebnis.md` + `docs/testing/`-Ordner selbst — bereits aus
  dem vorangegangenen `TESTENV-1b`-AP dieses Fadens (unverändert, außer der neuen
  `TEST_PAGE_STANDARD.md` und der gelöschten `HARNESS_CONTRACT.md` darin).

Keine dieser drei Fremdänderungen wurde geändert, gelöscht, zurückgesetzt, gestaged oder bewertet.

## 14. Wiederlesen / Datei-Wahrheit

- `TEST_PAGE_STANDARD.md` nach dem Schreiben vollständig neu vom Datenträger gelesen (implizit
  über die grep-/Zähl-Prüfungen in §13, die den realen Dateiinhalt abfragen, nicht den
  Schreibvorgang).
- Geänderter Abschnitt in `AUTHOR_GUIDE-v3.md` per `grep -n` gegen den realen Dateizustand
  geprüft — Zeilen 93/97/98 zeigen die neuen Attribute, Zeile 112 (Chart-Card) unverändert.
- Gegen `docs/spec/APP-INTERFACE.md` abgeglichen: `fw-app` (§3.1), `data-fw-app` (§3.1),
  `data-fw-data` (§3.1), `financial-chart-module` (§3.2) — alle vier Begriffe im neuen Standard
  exakt in der dort definierten Schreibweise übernommen, keine abweichende Attributform erfunden.
- `git status --short` / `git diff --name-status` am Ende erneut geprüft (§13) — Scope exakt wie
  erwartet, keine unbeabsichtigte Zusatzänderung.

## 15. Nächster AP

**Bei GRÜN (dieser Status):**
`TESTENV-1bR — Minimalen Testseitenstandard unabhängig gegen reale Altfehler und drei
Leitfragen prüfen.`

Der Review prüft:
1. Kann Albert jede Testseite leicht finden, öffnen und bedienen?
2. Sagt jede Testseite sichtbar, was erwartet wird, und zeigt sie technische Fehler deutlich?
3. Kann Python zuverlässig prüfen, ob ein LLM Template, Pfade, Cards und lokale Dateien korrekt
   verwendet hat?

Erst nach dessen GRÜN: `TESTENV-1c — Template, Shared CSS/JS, Python-Checker und Launcher bauen.`

Ausdrücklich noch nicht: Altbestand migrieren, Dubletten löschen, Fixtures verschieben,
Testseiten modernisieren, Checker bauen, Launcher bauen, Template bauen, Commit oder Push.

Weiter nur nach Alberts OK.
