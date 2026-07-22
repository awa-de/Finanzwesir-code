---
chronik_id: CHRONIK-2026-07-22-prokrastinations-theme-css-kette
datum: 2026-07-22
projekt: finanzwesir-2-0
thema: prokrastinations-theme-css-kette
beteiligte: [nutzer, claude]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [sackgasse, blockade, tooling-problem, abbruchregel]
---

# Chronik: Theme-Bootstrapper, JSON-Validator und CSS-Reparatur für prokrastinations-preis

**Hauptgegenstand:** Ein Faden aus elf aufeinanderfolgenden, von einem steuernden Faden vorformulierten Handover-Aufträgen (jeweils als Datei unter `Archiv/local/muss noch eingeordnet werden/` abgelegt), die gemeinsam die Theme-Migration der App `prokrastinations-preis` abschlossen: Runtime-Verlagerung in einen statischen Theme-Bootstrapper, ein JSON-Offline-Validator als Geschwister des bestehenden CSV-Prüfers, die Formalisierung und anschließende Umsetzung einer CSS-Architekturreparatur, ein dabei entdeckter Fehlalarm im Testseiten-Checker samt Korrektur, sowie drei nacheinander erzeugte Ghost-Theme-ZIPs.

## Ausgangslage

Der Faden begann im KETTENMODUS (Fokus laut Hook: „Ghost-Prototyp ✅ + App-Duell 19 Apps ✅ + APP-DATA-00–05a ✅ + Ghost-Feed-Resolver-Vertrag GHOST-05–09 ✅"). Bereits vor diesem Faden war der Theme-Bootstrapper architektonisch entschieden (SEC-04, `01_DECISION_LOG.md`) und ein statischer Registry-Mechanismus für `fw-app`-Slugs festgelegt. Jeder folgende Auftrag traf als vollständiger, selbsttragender Handover ein, mit explizitem Write-Scope, Verbotsliste und Pflichtnachweisen; der Nutzer wies wiederholt an, den jeweiligen Auftrag „exakt" und „ohne Rückfragen"/„keine Folgearbeit" auszuführen.

## Chronologischer Verlauf

### AP1 — Theme-Bootstrapper-Runtime-Grenze (SEC-05)
Volles Gate mit Subagenten-Dispatch (spec-scout, codebase-scout) wurde durchlaufen. Umgesetzt: `Apps/prokrastinations-preis/app.js` nach `Theme/assets/js/apps/prokrastinations-preis.js` verschoben, dortiger globaler `bootstrap()` entfernt, stattdessen `initProkrastinationsPreis(container)` exportiert; neuer zentraler Bootstrapper `Theme/assets/js/apps/index.js` mit literaler Registry; `Theme/default.hbs` erhielt den einen Moduleinstieg; `tools/check-test-pages.py` wurde auf die neue Runtime-Grenze angepasst. Alle Nachweise liefen grün, Status „bestanden" wurde gemeldet.

Direkt danach benannte der Nutzer eine **P1-Korrektur**: Die Registry-Lookup-Logik in `index.js` akzeptierte geerbte Object-Prototype-Eigenschaften (`data-fw-app="toString"`) als gültige Init-Funktion. Korrektur mit `Object.hasOwn()`, ein neuer Negativtestfall B2 in `app.test.html`, erneuter Testlauf grün.

### Nachgeholte Gate-Prüfung nach unterbrochenem Tool
Beim ursprünglichen Abschluss war ein `git status`-Aufruf im separaten `content`-Repository vom Nutzer unterbrochen worden; Gate 6/7 blieben dadurch für diesen Repo-Teil unvollständig. Der Nutzer wies darauf hin, dass dies ein Versehen war („das war ein Fehler"). Die fehlenden Prüfungen (`git -C content status/diff --check`) wurden nachgeholt: zwei vorbestehende, fremde Content-Änderungen (`pages/Das Finale.md`, `pages/Der Deal.md`) wurden identifiziert und als außerhalb des Scopes liegend gemeldet.

### AP2 — JSON-Offline-Validator
Erneutes volles Gate. Während der Planung stellte sich heraus, dass die reale Datei `content/files/app-data/package.json` (ESM-Konfiguration des CSV-Prüfers) die Namensgrammatik für JSON-Nutzdaten erfüllt, aber nicht zu den vier bereits benannten Eigenartefakten zählte — eine Rückfrage per Auswahlfrage wurde gestellt; der Nutzer entschied, `package.json` als fünftes exaktes Eigenartefakt auszunehmen. Umgesetzt: gemeinsames Vertragsmodul `prokrastinations-preis-stations-contract.js` (aus der Runtime herausgelöst), `content/files/app-data/json-validator.mjs` und `pruefe-json.bat` als Klon des CSV-Prüfers, `tests/json-validator.test.mjs` mit acht Nachweisen, `docs/editorial/JSON-APP-DATEN-WORKFLOW.md`. Alle Nachweise grün.

### AP3 — Theme-ZIP v1
Deterministischer Paket-AP (vom Auftrag selbst als Risikoklasse A eingestuft), mit Light-Gate statt vollem Neun-Fragen-Gate behandelt. Fünf Regressionen liefen grün, `finanzwesir-local-theme-prokrastinations-preis-v1.zip` wurde erzeugt und strukturell geprüft (kein führender `Theme/`-Pfad, kein ZIP im ZIP, alle Pflichtdateien vorhanden), SHA-256 und Größe ausgegeben.

### AP4 — CSS-Architektur-Formalisierung (D-CSS-01 bis D-CSS-04)
Reiner Dokumentations-AP auf Basis zweier bereits vorliegender Peer-Reviews. In `01_DECISION_LOG.md` wurden vier neue Entscheidungen verankert: Übergangsoption C für den Chart-Renderer-Fallback (produktiv wirksame, ungelayerte Spiegel-CSS mit Paritätspflicht, spätere Option A erst im separaten Engine-DOM-AP), die Ghost-Kaskadengrenze (`:not(.fw-app *)`, enges `!important`-Verbot), ein Buildweg für lokale App-Mechanik (bare `@import`, kein `url()`), sowie ein vierteiliges Migrations-Gate. Vier weitere Dokumente wurden entsprechend korrigiert bzw. ergänzt (`GHOST_APP_CSS_ARCHITEKTUR_UMSETZUNGSVORLAGE_V2.md`, `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`, `CSS-KONVENTIONEN.md`, `MIGRATIONSSTRATEGIE_GHOST_APPS_V2_CHART_BLAUPAUSE.md`).

### AP5 — CSS-Reparatur, Option B (Wendepunkt: Nachweis schlägt fehl)
Umsetzung der zuvor formalisierten Entscheidung: `screen.source.css` erhielt die reale `@source`-Quelle und den baren Import einer neuen Mechanikdatei `Theme/src/css/apps/prokrastinations-preis.css` (Card-to-Point-Flug, Rubikon-Overlay, KPI-/Disclaimer-Reveal, Fokus-Kompatibilitätsregel, jeweils auf `.fw-app.fw-app--prokrastinations-preis` begrenzt); fünf `.gh-content`-Selektorgruppen erhielten die Kaskaden-Ausnahme; `prokrastinations-preis.js` erhielt das Root-Marker-Token und die Button-Normalisierung; `app.test.html` wurde auf die Theme-Mechanikquelle umgestellt. Acht der neun Pflichtnachweise liefen grün — **Nachweis 4, der volle Lauf von `tools/check-test-pages.py`, schlug fehl**: `check_app_pflicht()` behandelte jede `.js`-Datei unter `Theme/assets/js/apps/` außer `index.js` als eigene, testpflichtige Runtime und meldete einen Fehlalarm für das in AP2 neu entstandene Vertragsmodul `prokrastinations-preis-stations-contract.js`. Da die Korrektur `tools/check-test-pages.py` betroffen hätte, was außerhalb des erlaubten Write-Scopes dieses APs lag, wurde der AP als „nicht bestanden" mit explizitem Stop-Befund gemeldet, kein Theme-ZIP erzeugt, und dem Nutzer zwei Optionen zur Entscheidung vorgelegt.

### AP6 — Checker-Registry-Pflicht (Korrektur des Fehlalarms)
Eigener Handover zur Behebung. `check_app_pflicht()` wurde neu geschrieben: Die Testpflicht wird nun ausschließlich aus den literalen Slug-Schlüsseln der `const REGISTRY = Object.freeze({...})` in `index.js` abgeleitet (neue Hilfsfunktion `extract_registry_slugs()`, fail-closed bei nicht eindeutig auffindbarem Block), nicht mehr aus einer Ordner-Iteration. `TEST_PAGE_STANDARD.md` §12 wurde entsprechend angepasst (Version 11). Verifiziert wurden ein positiver Realnachweis (`prokrastinations-preis` korrekt abgeleitet), ein Negativnachweis gegen das Vertragsmodul (kein Fehlalarm mehr) sowie ein Negativnachweis gegen Abschwächung (eine temporäre, außerhalb des Repositorys angelegte Fixture mit einem Registry-Slug ohne `app.test.html` wurde weiterhin korrekt als Strukturfehler gemeldet). Voller Checker-Lauf danach grün.

### AP7 — Checker-Registry-Dokupräzisierung
Zwei verbleibende, fachlich unpräzise Aussagen in `TEST_PAGE_STANDARD.md` §12 wurden korrigiert: die Klammerbemerkung „(noch nicht gebaut)" zum bereits existierenden Checker entfernt, und die Aussage präzisiert, dass nicht die Registry selbst, sondern der Ordner/Importgraph des Bootstrappers Hilfsmodule enthalten kann (Version 12).

### AP8 — Testseitenstandard-Zustandskorrektur
Zwei weitere veraltete Zustandsaussagen wurden korrigiert: §9 beschrieb `tests/shared/test-page.js` fälschlich als „noch nicht gebaut", obwohl die Datei existiert und produktiv eingebunden ist; §17 enthielt denselben Klammerzusatz „(sobald gebaut)" beim Checker. Beide auf den vorhandenen Zustand umgestellt (Version 13). Eine dritte, ähnliche Stelle (§11, „Beide werden in TESTENV-1c gebaut") wurde als außerhalb des benannten Korrekturumfangs liegend nur gemeldet, nicht verändert.

### AP9 — Theme-ZIP v2
Nach bestätigt grünem CSS-Reparatur-Stand wurde `npm run css:build` erneut ausgeführt, alle Regressionen liefen grün, `finanzwesir-local-theme-prokrastinations-preis-v2.zip` erzeugt und strukturell geprüft.

### AP10 — Disclosure-Button-Hotfix
Befund: `FW_DISCLOSURE_TRIGGER_CLASS` (ein echtes `<button>`-Rezept) war das einzige Button-Rezept ohne `appearance-none`/`border-0`, wodurch in Ghost Local ein nativer grauer Rahmen sichtbar blieb. Korrektur um `appearance-none border-0 font-body`; das Play-CDN-Manifest musste nicht geändert werden, da alle drei Tokens bereits durch andere Rezepte gedeckt waren (geprüft, nicht vorsorglich geändert).

### AP11 — Theme-ZIP v3
Build, Checker und Regressionstests liefen grün; `finanzwesir-local-theme-prokrastinations-preis-v3.zip` erzeugt und geprüft.

## Wendepunkte

- Der fehlgeschlagene Pflichtnachweis 4 in AP5 (CSS-Reparatur) veränderte den weiteren Verlauf unmittelbar: Statt direkt zum Theme-ZIP überzugehen, wurden zwei eigenständige Korrektur-APs (AP6, AP7) eingeschoben, bevor die CSS-Reparatur als abgeschlossen gelten konnte.
- Die unterbrochene Tool-Nutzung nach AP1 führte zu einer nachträglichen Vervollständigung der Gate-Prüfung für das separate `content`-Repository.

## Entscheidungen und Festlegungen

- **Übergangsoption C für den Chart-Renderer-Fallback** · AP4 · Begründung: kleinster Eingriff, korrekte Ist-Beschreibung statt fälschlicher „nur Testhilfe"-Behauptung · Status am Ende: gültig, Option A bleibt Zielzustand eines künftigen, separaten Engine-DOM-APs.
- **`package.json` als fünftes Eigenartefakt des JSON-Validators** · AP2, per Auswahlfrage vom Nutzer entschieden · Begründung: Werkzeug-Infrastruktur, keine App-Nutzdaten · Status am Ende: gültig, umgesetzt.
- **Registry-basierte Testpflicht-Ableitung statt Ordner-Iteration** · AP6 · Begründung: Ordner-Iteration erzeugte einen Fehlalarm für Hilfsmodule ohne Registry-Eintrag · Status am Ende: gültig, verifiziert.
- **Bare `@import` statt `@import url()` für lokale App-Mechanik** · AP4, umgesetzt AP5 · Begründung: nur die bare Form wird vom Tailwind-Compiler inliniert · Status am Ende: gültig.

## Irrwege, Schleifen und verworfene Ansätze

- `check_app_pflicht()` iterierte ursprünglich (aus einem früheren, in diesem Faden nicht sichtbaren AP) den Dateisystem-Ordner `Theme/assets/js/apps/` und behandelte jede `.js`-Datei außer `index.js` als testpflichtige App. Dieser Ansatz erwies sich in AP5 als zu grob, sobald ein reines Hilfsmodul (`prokrastinations-preis-stations-contract.js`, aus AP2) in denselben Ordner gelangte; er wurde in AP6 durch die Registry-Ableitung ersetzt.
- Die Registry-Lookup-Logik in `index.js` (AP1) ließ zunächst geerbte Object-Prototype-Eigenschaften als gültige Treffer durch; dies wurde durch die P1-Korrektur direkt nach AP1 behoben, bevor es weiterverwendet wurde.

## Erzeugte Artefakte

- `Theme/assets/js/apps/index.js` — Theme-Bootstrapper mit literaler Registry — final.
- `Theme/assets/js/apps/prokrastinations-preis.js` — produktive Runtime, mehrfach in AP1/AP2/AP5/AP10 geändert — final (Stand nach AP10).
- `Theme/assets/js/apps/prokrastinations-preis-stations-contract.js` — gemeinsames Stations-Vertragsmodul — final.
- `content/files/app-data/json-validator.mjs`, `pruefe-json.bat` — JSON-Offline-Prüfer — final.
- `tests/json-validator.test.mjs` — final.
- `docs/editorial/JSON-APP-DATEN-WORKFLOW.md` — final.
- `Theme/src/css/apps/prokrastinations-preis.css` — überführte App-Mechanik-CSS — final.
- `Theme/src/css/screen.source.css`, `Theme/assets/css/screen.css` — final (Build-Artefakt).
- `tools/check-test-pages.py` — `check_app_pflicht()` neu geschrieben — final.
- `docs/testing/TEST_PAGE_STANDARD.md` — mehrfach korrigiert, Version 9→13 — final.
- `docs/App-Fabrik/01_DECISION_LOG.md` — SEC-05, D-CSS-01–04 — final.
- `docs/steering/handovers/GHOST_APP_CSS_ARCHITEKTUR_UMSETZUNGSVORLAGE_V2.md`, `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`, `docs/steering/design/CSS-KONVENTIONEN.md`, `docs/steering/handovers/MIGRATIONSSTRATEGIE_GHOST_APPS_V2_CHART_BLAUPAUSE.md` — final.
- `docs/steering/BACKLOG.md` — T1-Eintrag um P3-Punkt ergänzt — final.
- `Theme/finanzwesir-local-theme-prokrastinations-preis-v1.zip`, `-v2.zip`, `-v3.zip` — je ein Release-Artefakt pro Korrekturstand — v1/v2 durch v3 fachlich abgelöst, alle drei Dateien bleiben unverändert erhalten.

## Sachliche Erkenntnisse

- Gesicherter Stand: `FwRenderer._injectStyles()` läuft unbedingt auf jeder Seite mit geladener Chart-Engine und gewinnt dort ungelayert gegen gelayerte Tailwind-Utilities — bereits vor diesem Faden durch Peer-Review belegt, in AP4 formal dokumentiert.
- Gesicherter Stand: Tailwind v4 inliniert ausschließlich die bare `@import`-Form; `@import url(...)` wird unverändert durchgereicht.
- Gesicherter Stand: `Object.hasOwn()` ist notwendig, um Prototype-Pollution bei Registry-Lookups über Nutzereingaben (`data-fw-app`) auszuschließen.
- Arbeitsannahme: Übergangsoption C bleibt bestehen, bis ein separater Engine-DOM-AP zwischen Option A und B entscheidet.
- Offene Frage (P3): Ob `tokens.css` künftig inliniert oder als zweites Runtime-Artefakt legalisiert wird, ist nicht entschieden.

## Offene Punkte am Ende

- Manuelle Ghost-Local-Sichtabnahme durch den Nutzer steht aus: v3-ZIP hochladen, Disclosure-Button und kurze Regression der übrigen Buttons prüfen.
- P2: Janitor-Fallback-Abschnitt (`CSS-KONVENTIENEN.md` §7, leer) bleibt unbehandelte Folgearbeit.
- P3: `tokens.css`-Inlining/Artefaktfrage bleibt offen.
- `TEST_PAGE_STANDARD.md` §11 enthält weiterhin eine veraltete „wird in TESTENV-1c gebaut"-Aussage zu `test-page.css`/`test-page.js` — bewusst nicht korrigiert, da außerhalb der jeweils benannten Korrekturaufträge.
- Der separate Engine-DOM-AP (Entscheidung zwischen Fallback-Option A und B für den Chart-Renderer) ist nicht Teil dieses Fadens.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Eine Kette eng geschnittener, extern vorformulierter Handover-Aufträge mit strikt geprüftem Write-Scope deckte einen vorbestehenden, latenten Fehlzustand im Testseiten-Checker zuverlässig auf, sobald ein neuer Dateityp (Hilfsmodul) in einen zuvor nur für Runtimes gedachten Ordner gelangte — der Fehler wurde nicht durch gezielte Fehlersuche gefunden, sondern als Nebenprodukt eines routinemäßigen Pflichtnachweises in einem thematisch anderen AP.

Für spätere Musteranalyse vormerken: Bei mehreren, sehr ähnlich aufgebauten Handover-Aufträgen in Folge (Statuskorrekturen an derselben Datei) wurden pro Auftrag jeweils nur die explizit benannten Textstellen korrigiert, obwohl weitere, ähnlich veraltete Stellen in derselben Datei erkennbar waren — diese wurden konsequent nur gemeldet, nie im selben Zug mitkorrigiert.

## Bewusst ausgelassen

- Wörtliche Wiedergabe der einzelnen Bash-/Grep-Kommandos und ihrer Rohausgaben.
- Vollständige Codeinhalte der geänderten oder neu angelegten Dateien; nur Zweck und fachliches Delta wurden festgehalten.
- Wiederholte, gleichartige Pflichtnachweis-Läufe (z. B. mehrfache `node --check`-, `git status`- und Checker-Aufrufe über die APs hinweg) wurden zusammengefasst statt einzeln aufgeführt.
- Die vollständigen Texte der elf gelesenen Handover-Dateien.
