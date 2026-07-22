# Peer-Review-Paket: Ghost-App-CSS-Architektur und sichtbare Regressionsfehler

**Stand:** 2026-07-22  
**Status:** Analysepaket. Keine Architekturentscheidung und keine Codeänderung durch dieses Dokument.  
**Auftrag:** Ein unabhängiges LLM soll die Diagnose, die vorgeschlagene Zielarchitektur und den minimalen Korrekturumfang read-only prüfen.  
**Scope:** `prokrastinations-preis` als erster normaler App-Pilot nach der Chart-App-Migration; daraus ableitbare Regel für weitere Apps.  

---

## 1. Verbindlicher Ausgangspunkt

Die folgende Begriffsentscheidung ist für dieses Review bindend:

```text
Chart = App
Chart-App kann von anderen Apps aufgerufen werden
```

Die Chart-Engine ist keine Infrastruktur außerhalb der App-Welt und keine bloße Bibliothek. Sie ist eine wiederverwendbare App mit eigenem Datenpfad, `fwContext`-Rucksack, Renderer und Chart-Plugins. Eine normale App wie `prokrastinations-preis` orchestriert eigenen Screen-/Eingabeablauf und ruft die Chart-App für Diagramme auf.

Die bestehende Sicherheits- und Deployment-Entscheidung bleibt unverändert:

- ein statischer Theme-Bootstrapper mit literaler Slug-Registry;
- keine dynamischen Import-Pfade, keine Card-seitige Script- oder CSS-URL;
- App-Runtime im Theme unter `Theme/assets/js/apps/`;
- `data-fw-*` enthält ausschließlich geprüfte Dateinamen für Datenfeeds.

Dieses Paket betrifft ausschließlich die sichtbare CSS-/Renderer-Grenze. Datenvertrag, Parser, Vault, Registry und Bootstrapper sind nicht zu verändern.

---

## 2. Reproduzierter visueller Bugreport

Die lokale Ghost-HTML-Card war:

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis"
     data-fw-data="msci-world-net-return-eur-monthly.csv"
     data-fw-config="stations-de.json">
</div>
```

Die CSV-/JSON-Ladung ist nach vorangegangener Datenkorrektur funktionsfähig. Die folgenden Erscheinungen wurden im lokalen Ghost-Rendering beobachtet:

1. Primäre Buttons haben einen dicken grauen nativen Rand.
2. App-`h2` erscheinen in Archivo Black statt im vorgesehenen Fließtext-Font in kräftigem Schnitt.
3. Zwischen Quellenlabel, Stationsheadline und Anleger-Anker entstehen übergroße vertikale Abstände.
4. Der Kartenflug von Station zu Entscheidungspunkt findet nicht sichtbar statt: Nach „Weiter investiert bleiben“ erscheint die Karte statisch unter dem Button und verschwindet später.
5. KPI-Karten und Annahmen erscheinen auf Screen 3 ohne weiches Einblenden.
6. Rubikon-Text steht auf Screen 4 unter dem Diagramm statt als Overlay im rechten Zukunftsbereich.
7. Die CTA auf Screen 4 zeigt blauen, unterstrichenen Linktext auf petrolfarbenem Hintergrund.

Die Symptome 4–6 betreffen vorhandene Ablauf-Logik, nicht fehlende Fachlogik oder fehlende Chart-Plugins.

---

## 3. Befundlage im aktuellen Code

### 3.1 Migration hat JavaScript-Runtime, nicht aber lokale Mechanik-CSS überführt

Die produktive Runtime existiert unter:

```text
Theme/assets/js/apps/prokrastinations-preis.js
```

Die frühere, weiterhin vorhandene Mechanik-CSS liegt dagegen nur unter:

```text
Apps/prokrastinations-preis/app.css
```

Eine Suche nach den folgenden Selektoren im Theme ergab keine Theme-CSS-Definition:

```text
.fw-app__station-area--flight-clone
.fw-app__station-area--flight-active
.fw-app__kpi-slot
.fw-app__screen3-reveal--visible
.fw-app__rubikon-chart-wrap
.fw-app__rubikon-text
```

Die Runtime verwendet diese Klassen dennoch:

- `flyCardToPoint()` erzeugt und aktiviert den Flug-Clone.
- Screen 3 ergänzt nach der Bridge-Haltephase `fw-app__screen3-reveal--visible`.
- Screen 4 baut `.fw-app__rubikon-text` im Chart-Wrapper.

Damit sind die Symptome kausal erklärt:

| Sichtbarer Fehler | fehlende CSS-Regel | vorhandene JS-Logik |
|---|---|---|
| Karte erscheint unter Button und verschwindet | absolute Position, Transform-/Opacity-Transition und Flight-Active-Transformation | `flyCardToPoint()` |
| KPI ohne Fade | Start-Opacity und Transition plus Visible-State | Screen-3-Reveal-Timeout |
| Rubikon-Text unter dem Chart | `position: absolute` auf dem Text und `position: relative` auf dem Wrapper | DOM-Aufbau des Rubikon-Overlays |

Die alte `app.css` ist nicht pauschal zu kopieren: Sie enthält nach der früheren Tailwind-Migration nur noch lokale Mechanik, einzelne Fokus-/Typografie-Regeln und ausführliche historische Kommentare. Alle allgemeinen visuellen Primitiven wurden bewusst nach Tailwind-Klassenrezepten in JavaScript verlagert.

### 3.2 Ghost-Artikel-CSS dringt in die App ein

`Theme/src/css/screen.source.css` enthält ungescopte Ghost-Artikelregeln unter `.gh-content` für `h1/h2`, `h3`, `p` und `a`. Die HTML-Card liegt innerhalb dieses Host-Kontexts.

Folgen:

- `.gh-content h2` gewinnt gegen eine nur geerbte App-Body-Font-Angabe; daher Archivo Black.
- `.gh-content p` gewinnt gegen Tailwind-Utility `m-0`, weil der Host-Selektor spezifischer ist; daher die Absatzabstände.
- `.gh-content a` gewinnt gegen einzelne Tailwind-Utilities `text-white` und `no-underline`; daher die blaue unterstrichene CTA.

Das ist keine app-spezifische Stylingfrage, sondern eine einmalige Kaskaden-Grenze zwischen Ghost-Redaktionsinhalt und dynamisch erzeugten App-Inhalten.

### 3.3 Native Button-Ränder sind ein gemeinsames Primitive-Problem

Tailwind wird in `screen.source.css` absichtlich ohne Preflight importiert:

```css
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities) source(none);
```

Der Verzicht verhindert einen globalen Reset, der bestehende Ghost-Seiten, HBS und Editorial-Inhalt unkontrolliert beeinflussen könnte. Der Preis ist: native Element-Defaults, insbesondere Button-Ränder, werden nicht automatisch neutralisiert.

Der richtige Schluss ist **nicht**, in 25 Apps einzelne ad-hoc-`border-0`-Ergänzungen zu verlangen. Zu prüfen ist ein gemeinsames App-Button-Basisrezept, das Erscheinung, Fokus und native Defaults einmalig festlegt. Ein globales Aktivieren von Preflight wäre ein separater, vollständiger Theme-Audit und ist außerhalb dieses Bugfix-Scopes.

### 3.4 Veraltete Tailwind-Quellenangabe

Die Tailwind-Quellenliste enthält noch:

```css
@source "../../../Apps/prokrastinations-preis/app.js";
```

Diese Datei wurde bei der Runtime-Migration entfernt. Die aktuelle Produktivruntime liegt unter `Theme/assets/js/apps/prokrastinations-preis.js`.

Das ist kein unmittelbarer Grund für die verlorene Mechanik-CSS, verhindert aber die sichere, wiederholbare Generierung künftig neu verwendeter App-Tailwind-Utilities. Die Quelle muss als allgemeine, reale Runtime-Quelle auf `Theme/assets/js/apps/` umgestellt werden, nicht pro App einzeln ergänzt werden.

---

## 4. Was die Chart-App tatsächlich als Blaupause liefert

Die Chart-App arbeitet bereits in zwei bewusst getrennten visuellen Wegen für **denselben** Vertrag:

1. `FW_CHROME_*_CLASS`-Konstanten im `FwRenderer` enthalten ausgeschriebene Tailwind-Rezepte für das Theme-Rendering.
2. `_injectStyles()` stellt einen statischen, tokenbasierten CSS-Fallback für Tailwind-freie Engine-Testseiten bereit.

`FwTheme` liest dafür die gemeinsamen Theme-Werte (`--color-*`, `--font-*`) aus `tokens.css`. Die Engine erfindet keine zweite Farb- oder Fontwahrheit.

Wichtige Unterscheidung der Namensräume:

| Form | Bedeutung | Beispiel |
|---|---|---|
| `--color-*`, `--font-*` | globale Designwerte aus `tokens.css` | `--color-petrol`, `--font-body` |
| `.fw-chart-*` | DOM-/CSS-Anker der Chart-App | `.fw-chart-wrapper` |
| `FW_CHROME_*_CLASS` | JavaScript-Konstanten mit Tailwind-Rezepten | `FW_CHROME_TITLE_CLASS` |
| `--fw-*` | lokale Mechanikwerte einer App | `--fw-card-to-point-flight-duration` |

Die bestehende Baukasten-Spezifikation sagt ausdrücklich: Flug, Rubikon-Overlay, zugehörige Sonderbreakpoints und die beiden Fade-/Flug-Dauern bleiben lokale App-Mechanik und werden nicht als allgemeines Primitive verallgemeinert.

---

## 5. Vorgeschlagene Zielarchitektur zur Peer-Prüfung

Diese Zielarchitektur ist ein Vorschlag, keine noch freigegebene Entscheidung. Sie soll insbesondere die Frage beantworten, ob die Chart-App-Blaupause vollständig und ohne zweite CSS-Deployment-Infrastruktur für normale Apps nutzbar ist.

```text
tokens.css
  └─ zentrale Designwerte: Farben, Fonts, Schatten

screen.css (aus screen.source.css gebaut)
  └─ Ghost-Theme-Regeln
  └─ einmalig generierte Tailwind-Utilities aus HBS, Chart-Runtime und App-Runtimes
  └─ keine app-exklusive Flug-/Overlay-Mechanik

App-Style-Bridge (gemeinsam, statisch im Theme-JS)
  └─ einmalige Host-Grenze nur für .fw-app
  └─ schützt gegen .gh-content-Überschriften, Absatz-/Link-Leaks
  └─ definiert keine Fachoptik und greift nicht in Editorial-Content ein

App-Mechanikmodul (pro App, statisch im Theme-JS)
  └─ nur app-exklusive Regeln, analog FwRenderer._injectStyles()
  └─ einmaliger, idempotenter Style-Eintrag; keine URL, kein dynamischer Import
  └─ Beispiel: Flug, KPI-Fade, Rubikon-Overlay

App-Runtime
  └─ lädt ihre eigene statische Mechanik und rendert den DOM-Ablauf
  └─ ruft bei Bedarf die Chart-App auf
```

Die zentrale Abgrenzung wäre für alle normalen Apps gültig, die der Theme-Bootstrapper als `.fw-app` initialisiert. Sie gilt nicht rückwirkend für beliebigen Ghost-Inhalt. Die Chart-App behält ihre vorhandene eigene Renderer-Grenze; sie muss für diesen Bugfix nicht funktional umgebaut werden.

Für eine eindeutige lokale Kapselung ist zu prüfen, ob der Bootstrapper jeder Runtime zusätzlich eine stabile Wurzelklasse gibt:

```text
.fw-app.fw-app--prokrastinations-preis
```

Dann kann lokale Mechanik sicher so begrenzt werden:

```css
.fw-app--prokrastinations-preis .fw-app__rubikon-text { ... }
```

Das verhindert Kollisionen zwischen künftigen Apps, ohne den gemeinsamen `.fw-app`-Hostvertrag zu duplizieren.

### Renderer-Regel für normale Apps

Jede App besitzt fachlich einen Renderer, aber nicht zwingend eine kopierte Klasse `FwRenderer`:

```text
Daten / Nutzereingaben → eingefrorener AppContext → App-Renderer → DOM
```

In `prokrastinations-preis.js` ist dieser Renderer heute als zusammengehörige `render…()`-Funktionen vorhanden. Eine neue globale `FwAppRenderer`-Klasse wäre Vorratsarchitektur. Erst wenn mindestens zwei normale Apps dieselben DOM-Primitiven tatsächlich benötigen, darf genau dieses Primitive zentralisiert werden.

### Gemeinsame Button-Regel

Die Peer-Prüfung soll bestätigen oder widerlegen, dass ein gemeinsames, literal ausgeschriebenes App-Button-Basisrezept in einer zentralen Runtime-Quelle der kleinste sichere Fix ist. Es muss:

- native Button-Darstellung neutralisieren;
- den sichtbaren Fokuszustand erhalten;
- von Primary-, Secondary- und weiteren Varianten wiederverwendet werden;
- weiterhin vom Tailwind-Scan erfasst werden;
- keine Änderung an globalem Preflight erfordern.

---

## 6. Ausdrücklich nicht vorgeschlagene Wege

- Kein globales Aktivieren von Tailwind Preflight ohne Theme-Gesamtaudit.
- Kein app-spezifisches `<link>` oder `<style>` in einer Ghost-HTML-Card.
- Keine CSS-Datei oder Importpfad aus `data-*`-Attributen.
- Kein zweites Deployment- oder Manifest-System.
- Keine Duplikation der Chart-Engine oder ihrer Chart-/Plugin-CSS in einer aufrufenden App.
- Keine globale `FwAppRenderer`-Fabrik vor nachgewiesener Wiederverwendung.
- Keine Verlagerung von Flug, Rubikon oder Screen-Choreografie in den Chart-Rucksack oder ein Chart.js-Plugin.

---

## 7. Verbindliche Quellen für das Peer Review

Der Peer liest alle folgenden Dateien vollständig. Die erste Gruppe sind bindende Verträge, die zweite Gruppe der reale Ist-Code und die dritte Gruppe die Migrations-/Testregeln.

### A. Bindende Architektur und Design

1. `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md`
2. `docs/spec/Der Rucksack (Context Object Pattern).md`
3. `docs/spec/APP-INTERFACE.md`
4. `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`
5. `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md`
6. `docs/steering/audits/SECURITY-BASELINE.md`
7. `docs/App-Fabrik/01_DECISION_LOG.md`

### B. Reale Theme-/App-Implementierung

8. `Theme/src/css/screen.source.css`
9. `Theme/assets/css/tokens.css`
10. `Theme/assets/js/apps/index.js`
11. `Theme/assets/js/apps/prokrastinations-preis.js`
12. `Apps/prokrastinations-preis/app.css`
13. `Theme/assets/js/fw-chart-engine/core/FwRenderer.js`
14. `Theme/assets/js/fw-chart-engine/core/FwTheme.js`
15. `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`
16. `Theme/assets/js/fw-chart-engine/plugins/FwAnnotationPulsePlugin.js`

### C. Spezifikation, Test und Migrationskontext

17. `Apps/prokrastinations-preis/APP_SPEC.md`
18. `Apps/prokrastinations-preis/app.test.html`
19. `docs/testing/TEST_PAGE_STANDARD.md`
20. `docs/steering/handovers/MIGRATIONSSTRATEGIE_GHOST_APPS_V2_CHART_BLAUPAUSE.md`
21. `docs/steering/audits/PEER_REVIEW_ERGEBNIS_GHOST_APP_MIGRATION_V1.md`
22. dieses Dokument

Der Peer darf zusätzlich ausschließlich direkte Importe und unmittelbare Build-Skripte dieser Quellen lesen, wenn dies für eine Aussage zwingend nötig ist. Keine Schreiboperation, kein Deploy, kein Umbenennen, kein Build-Artefakt.

---

## 8. Prüffragen

Der Peer beantwortet jede Frage mit **bestätigt**, **widerlegt** oder **offen** sowie Pfad:Zeile und kurzer Begründung.

### Architektur

1. Ist die Gleichsetzung „Chart = App; Chart-App kann von anderen Apps aufgerufen werden“ mit den bindenden Specs und der realen Runtime vereinbar?
2. Ist die Unterscheidung zwischen Chart-Plugin, App-Mechanik und Rucksack fachlich/technisch korrekt?
3. Besitzt `prokrastinations-preis.js` bereits eine ausreichende lokale Renderer-Grenze, oder gibt es konkrete DOM-/Strategie-Vermischung, die vor dem CSS-Fix korrigiert werden muss?
4. Ist eine globale `FwAppRenderer`-Abstraktion zum jetzigen Zeitpunkt begründet oder Vorratsarchitektur?

### CSS, Kaskade und Build

5. Erklärt die nicht in das Theme überführte `app.css` die drei Funktionssymptome Kartenflug, KPI-Fade und Rubikon-Overlay vollständig?
6. Erklären die `.gh-content`-Selektoren tatsächlich die Font-, Abstand- und CTA-Link-Symptome unter Berücksichtigung der CSS-Spezifität und Reihenfolge?
7. Ist der Preflight-Verzicht im aktuellen Theme nachweisbar, und ist ein gemeinsames App-Button-Basisrezept gegenüber einem globalen Preflight-Aktivieren der kleinere sichere Eingriff?
8. Ist ein statisches, idempotentes App-Mechanikmodul analog `FwRenderer._injectStyles()` technisch und sicherheitsseitig mit der Bootstrapper-Entscheidung vereinbar?
9. Falls nein: Welche kleinste Alternative erreicht Selbstständigkeit der App ohne Card-seitige CSS-URLs und ohne ein zweites Deployment-System?
10. Ist ein zentraler `.fw-app`-Hostschutz ausreichend präzise, um Ghost-Leaks zu neutralisieren, ohne Editorial-Content oder Chart-Host zu verändern?
11. Ist eine zusätzliche Klassenwurzel `.fw-app--{slug}` der kleinste robuste Kapselungsweg? Falls nein, konkrete Alternative nennen.
12. Ist die veraltete `@source`-Zeile ein tatsächlicher Wiederholbarkeitsfehler? Welche allgemeine reale Quelle muss sie ersetzen?

### Wiederverwendung und Größe

13. Welche Teile des aktuellen Prokrastinations-CSS sind nach Baukastenvertrag gemeinsame Primitive und welche beweisbar lokal?
14. Wird bei der vorgeschlagenen Struktur eine Tailwind-Utility, die mehrere Apps verwenden, nur einmal in `screen.css` erzeugt?
15. Entsteht durch das vorgeschlagene Muster ein unnötiger globaler CSS- oder JavaScript-Wachstumspfad? Falls ja, mit konkreter, minimaler Korrektur.

### Testbarkeit

16. Welche automatischen Nachweise sind zwingend, welche sichtbaren Browserprüfungen bleiben unverzichtbar?
17. Fehlt ein verbindlicher Migrations-Gate, der verhindert hätte, dass eine App-Runtime ohne ihre sichtbare Fachmechanik ins Theme zieht? Formuliere den kleinsten Gate-Satz.

---

## 9. Erwartetes Ergebnisformat des Peers

```markdown
# Peer Review — Ghost-App-CSS-Architektur

## Gesamturteil
GO / GO MIT AUFLAGEN / NO-GO

## Findings
| ID | Priorität | Prüffrage | Befund | Beleg | Kleinste Korrektur |

## Bestätigte Architekturentscheidungen
- nur tatsächlich bestätigte Aussagen

## Widerlegte oder unsichere Annahmen
- keine stillschweigende Übernahme

## Minimaler Folge-AP
- konkreter Write-Scope
- explizite No-Go-Änderungen
- maschinelle Nachweise
- manuelle Browser-Abnahme
```

Prioritäten:

- **P1:** würde Architektur-, Sicherheits- oder sichtbare Produktionsfunktion falsch festlegen.
- **P2:** führt zu Wiederholungsfehlern bei weiteren Apps oder unzureichender Abnahme.
- **P3:** Dokumentations- oder Wartbarkeitsverbesserung ohne aktuellen Funktionsverlust.

---

## 10. Definition einer erfolgreichen Folgereparatur

Der künftige Write-AP ist erst fertig, wenn alle folgenden Punkte belegt sind:

1. Keine Ghost-HTML-Card enthält Script-, Stylesheet- oder CSS-URLs.
2. Die App-Mechanik ist beim Initialisieren der App zuverlässig und höchstens einmal aktiv.
3. Die Host-Grenze wirkt ausschließlich unter `.fw-app`.
4. Der Button-Basisvertrag verhindert den nativen Rand und lässt sichtbaren Tastaturfokus bestehen.
5. `@source` referenziert nur reale produktive App-Runtime-Dateien bzw. deren Ordner.
6. Der Tailwind-Build erfolgt über den vorhandenen kanonischen Build-Weg; generierte CSS wird nicht von Hand bearbeitet.
7. Bestehende Parser-/Resolver-/Bootstrapper-Tests bleiben grün.
8. `app.test.html` belegt mindestens Flug, Reduced Motion, KPI-Fade, Rubikon-Overlay, CTA-Linkdarstellung und Host-Leak-Abwehr.
9. Lokale Ghost-Browser-Abnahme belegt die sieben Symptome aus Abschnitt 2 als behoben.
10. Chart-Engine-Verhalten, Datenvertrag und vorhandene Chart-Plugins bleiben unverändert.

