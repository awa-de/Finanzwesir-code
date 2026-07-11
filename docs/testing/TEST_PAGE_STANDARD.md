# Finanzwesir Test Page Standard

Stand: 2026-07-11 | Standard-Version: 3 (AP-apptest-01: §14 Launcher-Erzeugung präzisiert) | Geändert von: Claude (Sonnet)

> Normativer Standard. Kein Projekttagebuch. Die Wörter **MUSS**, **DARF**, **DARF NICHT**
> und **SOLL** sind im Sinne von RFC 2119 zu lesen. **SOLL** wird nur bei bewusst begründeter
> Nicht-Pflicht verwendet.
>
> Dieser Standard ersetzt `docs/testing/HARNESS_CONTRACT.md` (gelöscht). Der frühere Vertrag
> war für ein automatisiertes Test-/Capability-System entworfen. Das reale Arbeitsmodell ist
> einfacher: ein einzelner Entwickler prüft Testseiten manuell und Ghost-nah im Browser. Dieser
> Standard trägt genau das — nicht mehr.

---

## 1. Zweck und Grenzen

### 1.1 Zweck

Testseiten sind **manuelle, Ghost-nahe Sicht- und Bedienprüfungen** für Apps, Chart-Engine-Charts
und Tooling. Der Entwickler öffnet eine Testseite, bedient sie und vergleicht das sichtbare
Ergebnis mit einem gut lesbaren Block „Erwartetes Verhalten" direkt auf der Seite.

Ein kleiner Python-Strukturchecker (§12) prüft später nur Ablage, Aufbau, Card-Vertrag und lokale
Referenzen. Er bewertet **nicht**, ob eine App fachlich oder visuell korrekt funktioniert.

### 1.2 Was dieser Standard nicht ist

Kein:

- automatisiertes funktionales Testframework;
- Testmanagementsystem;
- Lifecycle-System mit Übergangsstatus;
- Capability-Katalog oder Capability-Grammatik;
- Manifest-/Schema-System;
- Ersatz für die visuelle und manuelle Prüfung durch Albert.

Der Checker DARF melden: „Testseite strukturell korrekt." Er DARF NICHT melden: „App
funktioniert."

### 1.3 Verhältnis zum Vorgängervertrag

`docs/testing/HARNESS_CONTRACT.md` ist gelöscht und keine aktive Parallelwahrheit mehr. Konzepte,
die dort Pflicht waren, sind hier bewusst **nicht** fortgeführt: `harness-manifest.json`, JSON
Schema für Harness-Metadaten, Capabilities/Capability-Grammatik, der Lifecycle
`active`/`migration-pending`/`archived`, `migrationTarget`, `since`, `appMaturity`,
`launcherVisible`, `usesChartJs` als Metadatum, `expected-result`-Enum, Fehlerklassen-Enums,
doppelt gepflegte Manifest-/HTML-Felder, Präzedenzregeln Manifest↔HTML, globale Harness-/
Szenario-ID-Grammatiken als Pflicht, ein dauerhaftes Migrationsregister. Diese Architektur war in
sich konsistent, aber für einen Einzelentwickler mit manueller Prüfung überdimensioniert.

---

## 2. Kanonische Quellen

| Thema | Quelle | Rolle |
|---|---|---|
| Ghost-Card-Attribute (`fw-app`, `financial-chart-module`) | `docs/spec/APP-INTERFACE.md` | kanonisch, bindend |
| App-Fabrik-Dateistruktur | `docs/App-Fabrik/APP_FOLDER_STRUCTURE.md` | kanonisch |
| App-Fabrik-Gesamtstandard | `docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md` | Arbeitsstand, Ghost-Card-Vertrag deckungsgleich mit APP-INTERFACE.md |
| Redakteursdoku | `docs/editorial/AUTHOR_GUIDE-v3.md` | Redaktionssicht, nicht technischer Vertrag |
| Chart-Card-Cheat-Sheet | `docs/editorial/Cheat-Sheet HTML-Karten.md` | Redaktionssicht Chart-Cards |

Dieser Standard kopiert **nicht** den Card-Vertrag. Bei Widerspruch gilt `APP-INTERFACE.md`.

---

## 3. Verbindliche Ablageorte

```text
Apps/{slug}/
├── app.js
├── app.css
├── app.test.html
└── test-data/

tests/
├── index.html
├── shared/
│   ├── test-page.css
│   └── test-page.js
├── engine/
├── tooling/
├── ghost/
├── fixtures/
└── scratch/

docs/testing/
├── TEST_PAGE_STANDARD.md
└── templates/
    └── app.test.template.html

tools/
└── check-test-pages.py
```

Regeln:

- Eine App-Testseite liegt **immer** unter `Apps/{slug}/app.test.html`.
- App-spezifische Testdaten liegen **immer** unter `Apps/{slug}/test-data/`.
- Reine Chart-Engine-Testseiten liegen künftig unter `tests/engine/`.
- Tool-/Design-System-Testseiten liegen künftig unter `tests/tooling/`.
- Echte Ghost-Integrationsharnesses liegen nur bei realem Bedarf unter `tests/ghost/`.
- Gemeinsame Fixtures liegen unter `tests/fixtures/`.
- Freie Experimente liegen **ausschließlich** unter `tests/scratch/`.
- Es gibt keine weiteren dauerhaften Testorte.

Die leeren Zielordner (`tests/`, `tools/check-test-pages.py`, `docs/testing/templates/`) werden
in `TESTENV-1bF` **noch nicht** angelegt — das ist Aufgabe von `TESTENV-1c`.

---

## 4. Grundaufbau einer Testseite

### 4.1 Seitenmarker und Laufzeitstatus

```html
<body data-fw-test-template="1">
  <header class="fw-test-header">
    <h1>Testseite: [Name]</h1>

    <div class="fw-test-runtime-status"
         data-fw-runtime-status>
      Bereit – bisher kein JavaScript-Fehler erkannt.
    </div>
  </header>

  <main>
    <!-- ein oder mehrere Testfälle -->
  </main>
</body>
```

`data-fw-test-template="1"` ist der maschinenprüfbare Template-Versionsmarker. Er MUSS auf jeder
Testseite vorhanden sein.

### 4.2 Kein Metadaten-Overhead

Die Seite trägt **keine** Harness-ID, kein Profil-Attribut, keine Capability-Liste, keinen
Status. Diese Konzepte sind bewusst nicht Teil dieses Standards (§1.3).

---

## 5. Testfall und erwartetes Verhalten

### 5.1 Struktur

```html
<section class="fw-test-case"
         data-fw-test-case>
  <h2>[Testfall-Titel]</h2>

  <section class="fw-test-expected"
           data-fw-expected-behavior>
    <h3>Erwartetes Verhalten</h3>
    <ul>
      <li>[konkrete sichtbare oder bedienbare Erwartung]</li>
    </ul>
  </section>

  <!-- danach mindestens eine echte Ghost-Card -->
</section>
```

### 5.2 Regeln

- Jeder Testfall MUSS eine sichtbare Überschrift tragen.
- Jeder Testfall MUSS genau einen Block `data-fw-expected-behavior` tragen.
- Der Erwartungsblock MUSS mindestens einen konkreten Punkt enthalten.
- Erwartungen stehen **sichtbar auf der Seite**, nicht nur in Kommentaren oder Metadaten.
- Ein Testfall DARF mehrere `.kg-card`-Blöcke enthalten, wenn gerade Mehrfachinitialisierung
  oder Zusammenspiel geprüft wird.
- Kein Capability-Zwang, keine künstliche Zerlegung natürlicher Bedienabläufe.

### 5.3 Beispiel einer zulässigen Erwartung

```text
- Beim Überfahren eines Datenpunkts erscheint ein Tooltip.
- Tooltip-Text: schwarz.
- Tooltip-Hintergrund: weiß.
- Angezeigt werden Datum, Wert und Reihenname.
- Der Slider aktualisiert Diagramm und Ergebnistext.
```

Erwartungen nennen konkrete Werte, wenn sie feststehen (Texte, Farben, Zustände, Reihenfolge,
Breakpoints, Tooltip-Inhalt, Fehlermeldungen) — keine vagen Pauschalaussagen wie „sollte
funktionieren".

---

## 6. Ghost-nahe Einbettung

Jede zu prüfende App oder jeder Chart MUSS über die **echte produktive HTML-Card** eingebunden
werden. Kein besonderer Testcontainer ersetzt die produktive Card.

Die Testseite besitzt zwei getrennte Schichten:

```text
Test-/Orientierungsschicht
→ Überschrift
→ erwartetes Verhalten
→ Laufzeit-/Fehlerhinweise

Ghost-nahe Einbettung
→ .kg-card
→ echter Produktionscontainer
```

`.kg-card` approximiert die Ghost-Content-Card, in die der Redakteur die App-/Chart-Card real
einfügt (Bestandsmuster, siehe `Apps/prokrastinations-preis/app.test.html`).

„Ghost-nah" bedeutet die Prüfung der realen HTML-Card, ihrer Attribute, der lokalen
Bootstrap-Logik und ihres Verhaltens in einem artikelähnlichen DOM-Kontext. Die Testseite
behauptet **keine** vollständige Simulation von Ghost-Admin, Server-Rendering, Theme-Build,
Hosting oder produktiver Font-Auslieferung. `tests/ghost/` (§3) bleibt ein reservierter
Standardort für echte spätere Ghost-spezifische Testseiten — in diesem Standard weder gebaut
noch weiter spezifiziert.

---

## 7. App-Card-Vertrag

Kanonische Quelle: `docs/spec/APP-INTERFACE.md` §3.1. Dieser Standard kopiert nur den nötigen
Mindestvertrag für die Testseite.

```html
<div class="kg-card">
  <div class="fw-app"
       data-fw-app="prokrastinations-preis"
       data-fw-data="../../Theme/assets/data/b1/msci-world-net-return-eur-monthly.csv">
  </div>
</div>
```

- `class="fw-app"` — Pflicht.
- `data-fw-app="[slug]"` — Pflicht.
- `data-fw-data`, `data-fw-config`, `data-fw-options` — optional, je nach Szenario (§APP-INTERFACE.md §3.1).

Für Details zu Attributsyntax, Whitelist-Prinzip und Sicherheitsregeln gilt ausschließlich
`APP-INTERFACE.md` — hier nicht dupliziert.

---

## 8. Chart-Card-Vertrag

Kanonische Quelle: `docs/spec/APP-INTERFACE.md` §3.2 (Legacy-Vertrag, Bestandsschutz, keine
Migration geplant).

```html
<div class="kg-card">
  <div class="financial-chart-module"
       data-type="line"
       data-title="Monatliche Liniendaten"
       data-csv="./test-data/monthly.csv"
       data-colors="MSCI World: #0071BF">
  </div>
</div>
```

- `class="financial-chart-module"` — Pflicht.
- `data-type="line|bar|pie"` — Pflicht.
- `data-csv`, `data-title`, `data-colors`, `data-options` — je nach Szenario, siehe
  `APP-INTERFACE.md` §3.2 und `Cheat-Sheet HTML-Karten.md`.

---

## 9. Sichtbare technische Fehler

`tests/shared/test-page.js` (noch nicht gebaut, §12 Rollout `TESTENV-1c`) MUSS künftig mindestens
sichtbar abfangen:

- `window.onerror`;
- `unhandledrejection`;
- explizit gemeldete Testseitenfehler.

Die sichtbare Fehlerbox zeigt mindestens:

```text
FEHLER
[reale Fehlermeldung]
Datei: [...]
Zeile: [...]
```

Keine Pflicht zu Fehlerklassen-Enums (bewusst entfernt, §1.3).

Wichtig:

- Produktive App-Fehlerzustände bleiben nutzerfreundlich (`APP-INTERFACE.md` §8).
- Die Dev-Testseite zeigt zusätzlich technische Details für Albert und das nächste LLM
  (`APP-INTERFACE.md` §8: „Dev-Testseiten dürfen technische Zusatzinfos anzeigen").
- `TESTENV-1bF` baut das Shared JavaScript noch nicht.

---

## 10. Testdaten und lokale Referenzen

- App-spezifische Testdaten liegen unter `Apps/{slug}/test-data/` (Bestandsmuster).
- Gemeinsame Engine-/Tooling-/Ghost-Fixtures liegen künftig unter `tests/fixtures/`.
- Referenzierte lokale Dateien MÜSSEN existieren; Pfade werden **case-sensitiv** geprüft (auch
  unter Windows) — Bestandsfehler wie der Case-Mismatch `scenario_6_decimals.csV` in
  `Theme/chart-tests/index_linien.html:97` (siehe `TESTENV-1a` §11) zeigen, warum das nötig ist.
- Absichtlich fehlende Dateien oder externe URLs (z. B. `app.test.html`s `./test-data/nonexistent.csv`
  und `https://evil.example.com/data.csv`) bleiben für den **menschlichen Prüfer** zulässig, wenn
  der zugehörige Testfall im sichtbaren Erwartungstext klar als Negativtest beschrieben ist. Für den
  **Checker** gilt zusätzlich §10.1: eine absichtlich fehlende lokale Card-Datenreferenz MUSS am
  Testfall explizit mit `data-fw-test-allow-missing-ref` deklariert werden, sonst bleibt sie ein
  Strukturfehler — der Checker kann Erwartungstext nicht lesen und interpretieren.
- In dauerhaften Testseiten dürfen `<script src>` und Stylesheet-`<link href>` ausschließlich
  repository-relative oder lokale Pfade verwenden. Absolute `http://`- oder `https://`-URLs in
  diesen Elementen sind ein Strukturfehler — bekannte Regressionen dieser Art sind
  `cdn.jsdelivr.net` (Chart.js) und `cdn.tailwindcss.com` (Tailwind). Lokale Vendor-Dateien
  (z. B. `Theme/assets/js/vendor/chart.umd.min.js`) bleiben erlaubt.
- Absolute Daten-URLs in produktiven Card-Attributen wie `data-fw-data`, `data-fw-config` oder
  `data-csv` werden durch diese Regel **nicht** pauschal verboten; für sie gelten die
  kanonischen Datenquellen- und Domainregeln aus `docs/spec/APP-INTERFACE.md` (§6/§7). Diese
  Regel betrifft ausschließlich Script-/Stylesheet-Ladeelemente, nicht Datenattribute.
- Auf neu gebauten oder migrierten Testseiten gilt diese Regel sofort; auf unmigriertem
  Altbestand wird sie erst im Zuge der Migration (§15) durchgesetzt, nicht rückwirkend als
  Fehler erzwungen.

### 10.1 Bewusst fehlende lokale Referenzen (`data-fw-test-allow-missing-ref`)

`data-fw-test-allow-missing-ref` ist ein optionales Attribut ausschließlich für ein Element mit
`data-fw-test-case`. Es erlaubt genau **eine** absichtlich fehlende lokale Referenz in diesem
Testfall — keine Liste, kein JSON, keine Mehrfachsyntax.

**Exakter Wert:** Der Attributwert MUSS nach HTML-Decodierung und Entfernung äußerer Leerzeichen
exakt mit dem Attributwert der bewusst fehlenden lokalen Referenz übereinstimmen. Keine
Pfadnormalisierung für diesen Vergleich — `./test-data/nonexistent.csv` und
`test-data/nonexistent.csv` gelten als unterschiedliche Werte. Beispiel:

```html
<section data-fw-test-case
         data-fw-test-allow-missing-ref="./test-data/nonexistent.csv">
  ...
  <div class="fw-app"
       data-fw-app="beispiel"
       data-fw-data="./test-data/nonexistent.csv">
  </div>
</section>
```

**Zulässiger Anwendungsbereich:** Der Marker erlaubt eine fehlende lokale Referenz ausschließlich
aus `data-fw-data`, `data-fw-config` oder `data-csv`. **Nicht** für `<script src>`,
Stylesheet-`<link href>`, Shared CSS/JS, App-Script, Dateien außerhalb des Repositories oder
absolute `http://`/`https://`-Daten-URLs (diese brauchen und dürfen den Marker nicht — absolute
Daten-URLs sind ohnehin nie Gegenstand einer lokalen Existenzprüfung, §10 oben).

**Gültigkeitsbedingungen** (alle MÜSSEN erfüllt sein):

1. Marker steht auf einem Element mit `data-fw-test-case`.
2. Genau eine lokale Card-Datenreferenz desselben Testfalls besitzt exakt denselben Stringwert.
3. Die referenzierte Datei existiert tatsächlich nicht.
4. Die Referenz würde ohne Marker als fehlende lokale Datei gemeldet.
5. Der Markerwert ist nicht leer.

**Fehlerfälle** (Checker MUSS melden): Marker außerhalb von `data-fw-test-case`; leerer Marker;
Marker ohne exakt passende Card-Datenreferenz; mehr als eine exakt passende Referenz; passende
Referenz außerhalb desselben Testfalls; markierte Datei, die real existiert; Marker für absolute
URL; Marker für Script oder Stylesheet; unmarkierte fehlende lokale Card-Datenreferenz.

Keine Textheuristik über Begriffe wie „404" oder „Negativtest", keine globale Ausnahmeliste, keine
Ausnahme nach Dateiname oder Ordner — ausschließlich der exakte, testfalllokale Stringvergleich
entscheidet.

### 10.2 Bewusst fehlendes Pflichtattribut `data-fw-app` (`data-fw-test-allow-missing-app-id`)

`data-fw-test-allow-missing-app-id` ist ein optionales, wertloses Attribut ausschließlich für ein
Element mit `data-fw-test-case`. Es erlaubt genau **eine** `.fw-app` in diesem Testfall, die
bewusst kein oder ein leeres `data-fw-app` trägt — z. B. ein Negativtest für den Error-State bei
fehlendem Slug. Anders als `data-fw-test-allow-missing-ref` (§10.1) ist kein Wertevergleich nötig,
da es keine Datei-/Pfadreferenz gibt, die eindeutig zugeordnet werden müsste — reine
Präsenzprüfung.

**Gültigkeitsbedingungen** (alle MÜSSEN erfüllt sein):

1. Marker steht auf einem Element mit `data-fw-test-case`.
2. Der Testfall enthält genau eine `.fw-app`.
3. Diese `.fw-app` besitzt tatsächlich kein oder ein leeres `data-fw-app`.

**Fehlerfälle** (Checker MUSS melden): Marker außerhalb von `data-fw-test-case`; Testfall mit
Marker, aber ohne genau eine `.fw-app`; markierte `.fw-app`, die bereits ein nicht-leeres
`data-fw-app` besitzt (Marker dann entfernen, nicht aufweichen).

Kein generisches Capability-System, keine Ausnahme für andere Pflichtattribute (§7/§8) — der
Marker deckt ausschließlich dieses eine, benannte Negativtest-Muster ab.

---

## 11. Shared CSS und Shared JavaScript

- `tests/shared/test-page.css` — gemeinsames Testseiten-Chrome (Header, Erwartungsblock,
  Laufzeitstatus, Fehlerbox). Überschreibt **keine** CI-Tokens/-Farben.
- `tests/shared/test-page.js` — Laufzeitstatus + sichtbare Fehleranzeige (§9).
- Beide werden in `TESTENV-1c` gebaut. Bis dahin dürfen bestehende Testseiten ihr eigenes,
  lokales Inline-`<style>` für das Seiten-Chrome behalten (Bestandsmuster
  `Apps/prokrastinations-preis/app.test.html`).

---

## 12. Python-Strukturchecker

`tools/check-test-pages.py` (noch nicht gebaut) prüft künftig **ausschließlich Struktur**:

1. Testdateien liegen an erlaubten Orten (§3).
2. Existiert `Apps/{slug}/app.js`, MUSS `Apps/{slug}/app.test.html` existieren.
3. `app.test.html` besitzt `data-fw-test-template="1"`.
4. Shared CSS und Shared JavaScript sind eingebunden.
5. Mindestens ein `data-fw-test-case` ist vorhanden.
6. Jeder Testfall besitzt: eine Überschrift; genau einen nicht leeren Block
   `data-fw-expected-behavior`; mindestens eine `.kg-card`.
7. Jede `.kg-card` enthält genau einen zulässigen Produktionscontainer: `.fw-app` oder
   `.financial-chart-module`. Ausschließlich unter `tests/engine/` ist zusätzlich
   `[data-fw-appchart]` zulässig (reiner Engine-/Plugin-Regressionstest ohne Ghost-Card, der die
   Engine direkt per `<script type="module">` bootstrapt, Bestandsmuster seit
   `AP-prokrast-03d`/`AP-16`) — außerhalb von `tests/engine/` bleibt `[data-fw-appchart]` ein
   Strukturfehler.
8. Pflichtattribute des jeweiligen Card-Vertrags sind vorhanden (§7/§8).
9. Referenzierte lokale Dateien existieren.
10. Pfade stimmen auch in Groß-/Kleinschreibung exakt.
11. Dauerhafte Testseiten laden `<script src>`/`<link href>` ausschließlich repository-relativ
    oder lokal (§10) — keine absoluten `http://`/`https://`-URLs in diesen Elementen.
12. Keine dauerhafte Testseite liegt außerhalb der Standardorte, außer unter `tests/scratch/`.
13. Exakte Dateidubletten werden gemeldet.
14. Aus den real gefundenen Testseiten kann der Launcher erzeugt werden (§13).

### 12.1 Discovery ohne Manifest

Der Checker durchsucht das gesamte Repository nach Dateien mit dem Namensmuster `*.test.html`
und nach HTML-Dateien, die das Attribut `data-fw-test-template` enthalten. Jeder Treffer
außerhalb der erlaubten Standardorte (§3) und außerhalb von `tests/scratch/` ist ein
Strukturfehler.

Keine zweite dauerhafte Liste, kein Manifest, keine spekulativen Heuristiken über Titel,
Chart.js-Nutzung oder Dateinamen wie `index` — ausschließlich Namensmuster und Template-Marker
entscheiden, ob eine Datei als Testseite gilt.

### Der Checker prüft ausdrücklich nicht:

- ob Diagramme korrekt oder schön aussehen;
- ob Tooltip, Slider oder Animation fachlich funktionieren;
- ob alle Erwartungen inhaltlich vollständig sind;
- ob eine App produktionsreif ist;
- ob ein sichtbarer Test bestanden wurde.

---

## 13. Automatisch erzeugte Übersicht

- `tests/index.html` wird künftig aus den real gefundenen Testseiten erzeugt.
- Kein Manifest, keine zweite manuell gepflegte Testliste.
- Quelle sind die Standardorte (§3) und die real vorhandenen Dateien.
- Titel kommen aus `<title>` bzw. `<h1>`.
- Gruppierung erfolgt nach Ablageort: Apps, Engine, Tooling, Ghost.

Der Launcher ist Komfortschicht, keine zweite Wahrheit.

---

## 14. Verbindliche Anweisung an bauende LLMs

Beim Bau einer implementierten App MUSS gleichzeitig `Apps/{slug}/app.test.html` aus dem
kanonischen Template erstellt oder aktualisiert werden.

Pflichten:

```text
- Template aus docs/testing/templates/app.test.template.html verwenden.
- Testseite unter Apps/{slug}/app.test.html speichern.
- App-spezifische Testdaten unter Apps/{slug}/test-data/ speichern.
- Echte Ghost-App-Card nach docs/spec/APP-INTERFACE.md verwenden.
- Für jede relevante Sicht-, Bedien- und Fehlerprüfung einen sichtbaren Block
  „Erwartetes Verhalten" anlegen.
- Erwartungen aus APP_SPEC.md, dem konkreten Bauauftrag und dem real gebauten Verhalten ableiten.
- Konkrete Werte nennen, wenn sie festgelegt sind: Texte, Farben, Zustände, Reihenfolge,
  Breakpoints, Tooltip-Inhalt, Fehlermeldungen.
- Shared Test CSS/JS einbinden.
- Keine CDN-Laufzeitabhängigkeit.
- Nach dem Write python tools/check-test-pages.py ausführen.
- Nach grünem Strukturcheck zusätzlich python tools/check-test-pages.py --write-index
  ausführen, um tests/index.html neu zu erzeugen.
- tests/index.html niemals manuell bearbeiten — es entsteht ausschließlich durch
  --write-index (§13).
- Der Checker beweist nur Strukturkorrektheit. Manuelle Sicht- und Bedienprüfung bleibt
  erforderlich.
```

Absichtlich fehlende lokale `data-fw-data`-, `data-fw-config`- oder `data-csv`-Referenzen sind nur
für echte Negativtests zulässig und müssen am zugehörigen `data-fw-test-case` mit
`data-fw-test-allow-missing-ref` exakt deklariert werden (§10.1). Keine Textheuristik und keine
globale Ausnahme verwenden.

Keine zusätzliche Capability- oder Manifestpflege verlangen.

---

## 15. Einmalige Migration des Altbestands

Migration ist ein **einmaliger Arbeitsvorgang**, kein dauerhafter Status:

```text
1. Altbestand klassifizieren: behalten / zusammenführen / löschen
2. Dubletten und tote Seiten entfernen
3. gebrochene und case-falsche Referenzen reparieren
4. behaltene Seiten an Standardorte verschieben
5. behaltene Seiten auf Template, Erwartungsblöcke und echte Ghost-Cards modernisieren
6. Checker vollständig grün
7. Launcher erzeugen
8. Migration abgeschlossen
```

Danach existiert kein Migrationsstatus und kein Migrationsregister mehr — eine Seite entspricht
dem Standard, oder sie entspricht ihm nicht. `TESTENV-1bF` **führt diese Migration noch nicht
aus** — reine Standardfestlegung.

Bekannter, noch unklassifizierter Altbestand (Quelle: `TESTENV-1a`, `TESTENV-1aFR`, beide GRÜN
bestätigt): 1 App-Testseite, 19 Engine-Workbenches (1 modern + 18 Legacy) in
`Theme/chart-tests/`, 1 versionierte Sonderseite (`Theme/index.html`), 2 fachfremde
Design-System-Testseiten. Die KEEP/MERGE/DELETE-Klassifizierung ist Teil der Migration
(Schritt 1), nicht dieses Standards.

Während der einmaligen Altbestandsmigration ist das freigegebene TESTENV-Inventar (`TESTENV-1a`,
korrigiert und in `TESTENV-1aFR` GRÜN bestätigt) die vollständige Ausgangsliste. Nach Abschluss
der Migration müssen alle dauerhaften Testseiten entweder dem Namensmuster `*.test.html`
entsprechen oder den Template-Marker `data-fw-test-template` tragen (§12.1) — das Inventar ist
nur Migrationsquelle für diesen einmaligen Vorgang, keine dauerhafte Laufzeitquelle des
Checkers.

---

## 16. Was dieser Standard nicht prüft

- Fachliche Korrektheit einer App oder eines Charts.
- Visuelle Qualität oder Gestaltung.
- Vollständigkeit der Erwartungstexte.
- Produktionsreife einer App.
- Ob ein manueller Test tatsächlich bestanden wurde — das bleibt Alberts Urteil im Live-Server.

---

## 17. Definition of Done

Eine Testseite gilt als vertragskonform, wenn:

- sie unter einem der Standardorte (§3) liegt;
- sie den Grundaufbau (§4) und mindestens einen vollständigen Testfall (§5) trägt;
- jede geprüfte App/jeder Chart über die echte Ghost-Card (§6–§8) eingebunden ist;
- `tools/check-test-pages.py` (sobald gebaut) sie strukturell grün meldet;
- Albert die Seite manuell im Live-Server geöffnet, bedient und gegen die sichtbaren
  Erwartungen verglichen hat.

Der letzte Punkt ist durch keinen Checker ersetzbar (§1.2).
