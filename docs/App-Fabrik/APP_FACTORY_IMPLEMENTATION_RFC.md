# APP_FACTORY_IMPLEMENTATION_RFC

**Projekt:** Finanzwesir 2.0 — App-Fabrik  
**Stand:** 2026-07-21 16:49 — Resolver-Suffixwiderspruch korrigiert (reine Präfixbildung, `01_DECISION_LOG.md` SEC-04)
**Status:** RFC / Draft  
**Pilot-App:** `Apps/prokrastinations-preis`  
**Ziel-Spec nach Review:** `docs/spec/APP-FACTORY-IMPLEMENTATION-STANDARD.md`  
**Quelle:** Pre-Code-Grill ChatGPT + Peer Review Perplexity / Claude Sonnet 4.6

---

## 1. Status

Dieses Dokument ist ein **RFC** — ein begründeter technischer Vorschlag.

Es ist noch keine finale, bindende Spec.

Es erzeugt keine Code-Freigabe.

Es dient als Grundlage für:

1. Pre-Code-Gate von Pilot 1 (`prokrastinations-preis`)
2. spätere Überführung in `docs/spec/APP-FACTORY-IMPLEMENTATION-STANDARD.md`
3. Aktualisierung von Decision Log, Workflow, Skills und Commands
4. Vermeidung stiller Architekturentscheidungen durch Claude während der Implementierung

---

## 2. Zweck

Die App-Fabrik soll 21 interaktive Apps plus bestehende Chart-Engine tragen.

Ziel ist keine Sammlung von 21 Einzelanfertigungen, sondern eine standardisierte Produktionslinie:

> Kennt man eine App, kennt man alle.

Dieses Dokument beantwortet die Implementierungsfragen, die **nicht** nur für `prokrastinations-preis` gelten, sondern für die ganze App-Fabrik:

- Wie bauen wir Apps technisch?
- Mit oder ohne Build-System?
- Mit oder ohne Framework?
- Wie werden Styles isoliert?
- Wie kommen CI-Farben und Fonts in die Apps?
- Wie wird getestet?
- Wo liegen Code-Dateien?
- Wann wird gemeinsamer Core extrahiert?
- Wie erfolgt Deployment in Ghost?
- Wie wird Vertical Slicing definiert?

---

## 3. Nicht-Ziele

Dieses Dokument ist **nicht**:

- keine neue APP_SPEC für `prokrastinations-preis`
- kein UX-/Heldenreise-Dokument
- keine Chart-Engine-Refactoring-Spec
- kein endgültiger Deploy-Plan für Ghost
- kein vollständiges Testautomationskonzept
- kein Build-System-Setup
- keine Framework-Evaluation aus akademischem Interesse
- keine Freigabe für produktiven Code

---

## 4. Technische Leitprinzipien

Diese Prinzipien steuern alle Entscheidungen.

### 4.1 Einfach, aber nicht einfacher

Die App-Fabrik soll so einfach wie möglich starten, aber nicht naiv.

Einfach heißt:

- keine unnötigen Frameworks
- keine unnötige Build-Pipeline
- keine unnötigen Abhängigkeiten
- lokale Testbarkeit
- verständliche Dateien
- klare Architekturgrenzen

Nicht einfacher heißt:

- sichere DOM-Ausgabe
- saubere State-Modelle
- AppContext
- A11y
- Validierung
- klare Schnittstellen
- wiederholbare Struktur

### 4.2 Bewährt und zeitgemäß

Bevorzugt werden Technologien, die:

- browsernativ sind
- langfristig stabil sind
- gut verstanden sind
- keine unnötigen Abhängigkeiten erzeugen
- mit Ghost kompatibel sind

Vanilla JavaScript, ES-Module, CSS Custom Properties, semantisches HTML und lokale Testseiten erfüllen dieses Kriterium.

### 4.3 Keine Hype-Architektur

Technologien werden nicht eingeführt, weil sie modern wirken.

Ein Framework oder Bundler braucht einen nachgewiesenen Gegenwert:

- reduzierte Komplexität
- bessere Wartbarkeit
- notwendige Wiederverwendung
- bessere Tests
- realer Deploy-Nutzen

Ohne diesen Gegenwert gilt: nicht einführen.

### 4.4 Sicherheit und Wartbarkeit vor Eleganz

Die Apps laufen öffentlich im Browser und sind Teil einer Finanzseite.

Deshalb gelten:

- alle `data-*` Attribute sind untrusted input
- keine ungeprüfte HTML-Injection
- keine externen CDN-Skripte ohne explizite Freigabe
- keine geheimen Tokens im Frontend
- SafeDOM / `textContent` für Nutzdaten
- Whitelists statt freier Interpretation
- Error-State statt Crash

### 4.5 Ghost-first

Die Apps werden in Ghost.io-Artikelseiten eingebettet.

Daraus folgt:

- Redakteure arbeiten mit HTML-Cards
- Redakteure sollen keine Scripts pflegen
- Redakteure sollen kein JSON inline schreiben
- Apps müssen in normalem HTML/CSS/JS funktionieren
- lokale Testdateien müssen Ghost-Cards simulieren
- produktives Deployment muss Ghost real berücksichtigen

### 4.6 Standardisierung ohne frühe Überabstraktion

Die App-Fabrik braucht Standards, aber kein erfundenes Framework vor der ersten App.

Standardisiert werden sofort:

- Ghost-Card-Vertrag
- `fw-app` Namespace
- SafeDOM
- AppContext
- State-Modell
- A11y-Vertrag
- Vertical Slicing
- Testseitenprinzip

Nicht sofort standardisiert:

- gemeinsamer Core
- Build-System
- Testautomation
- Framework
- ChartAdapter/API

Diese werden erst nach echter Wiederholung extrahiert.

---

## 5. Verabschiedete Grundsatzentscheidungen

Diese Grundsätze gelten als Arbeitsentscheidung für Pilot 1 und als Kandidaten für den Factory-Standard.

1. Pilot 1 startet ohne unnötiges Build-System.
2. Vanilla JavaScript ist der Default.
3. Kein Framework ohne nachgewiesenen Bedarf.
4. CSS-Isolation erfolgt per `fw-app`-Namespace, nicht per Shadow DOM.
5. CI-Farben, Fonts und Designwerte kommen zentral aus Theme-Tokens.
6. Tests starten mit lokaler `app.test.html`; E2E-Automation später.
7. Gemeinsamer Core wird nicht vor App 2 extrahiert.
8. Implementierung erfolgt in Vertical Slices.
9. Ghost-Redakteure bekommen weiterhin nur Minimal-Cards.

---

## 6. Entscheidungsmatrix

---

## D1 — Build-System und Bundling

### Empfohlener Default

**Pilot 1: kein Bundler.**

Die Pilot-App wird als normales Vanilla-JavaScript geschrieben und lokal über `app.test.html` getestet.

Lieferartefakt für Pilot 1:

```text
/Apps/prokrastinations-preis/app.js
/Apps/prokrastinations-preis/app.css
/Apps/prokrastinations-preis/app.test.html
```

Noch kein:

- Vite
- Rollup
- Webpack
- esbuild
- Parcel
- `src/`
- `dist/`
- `node_modules/`

### Warum

Die erste App ist ein kleines Ghost-embedded Widget. Sie braucht keine Build-Pipeline, um lokal testbar zu sein.

Ein Bundler würde sofort neue Komplexität erzeugen:

- Node-Setup
- Build-Befehle
- Artefakt-Management
- Deploy-Fragen
- mögliche Tool-Versionen
- zusätzliche Wartungslast

Für Pilot 1 soll der Fokus auf dem App-Fabrik-Fließband liegen, nicht auf Tooling.

### Verworfene Alternativen

#### Vite

Vite ist ein gutes modernes Tool, aber in Pilot 1 nicht nötig.

Nicht verworfen wegen „unreif“, sondern wegen fehlendem Gegenwert in diesem Projektstadium.

Später sinnvoll, wenn:

- gemeinsamer Core entsteht
- viele Module gebündelt werden müssen
- TypeScript eingeführt wird
- automatisierte Tests eine Node-Toolchain brauchen

#### Rollup

Gut für Library-Bundles, aber für Pilot 1 zu früh.

#### Webpack

Zu schwergewichtig.

#### Single-HTML-App

Für Demos okay, aber nicht für die App-Fabrik.

### Risiken

Ohne Build-System können Dateien später unübersichtlich werden.

Gegenmaßnahme:

- Pilot 1 klein halten
- nach Pilot 2 prüfen
- Core und Build erst bei realem Bedarf

### Sicherheitsauswirkung

Positiv:

- keine fremde Toolchain
- keine zusätzlichen Abhängigkeiten
- keine CDN-Skripte
- weniger Supply-Chain-Angriffsfläche

### Komplexitätsauswirkung

Niedrig.

### Auswirkung auf Ghost

Gut für lokale Tests. Produktions-Deployment muss separat geprüft werden.

### Auswirkung auf alle Apps

Factory-Standard-Kandidat:

> Kein Build-System, solange kein echter Bedarf nachgewiesen ist.

### Wann neu bewerten

- nach App 2
- bei Shared Core
- bei TypeScript-Wunsch
- bei wachsender Modulkomplexität
- bei automatisierter Testpipeline

### Status

Pilot-1-Arbeitsannahme + Factory-Standard-Kandidat.

---

## D2 — Framework-Entscheidung

### Empfohlener Default

**Vanilla JavaScript. Kein Framework.**

Kein:

- React
- Vue
- Lit
- Alpine
- Svelte
- Web-Component-Framework

### Warum

Die Apps sind Ghost-embedded Widgets, keine Single Page Applications.

Die Architektur ist bereits definiert durch:

```text
init()
→ Config / data-* lesen
→ Two-Step Parsing
→ read-only AppData
→ Strategy
→ AppContext
→ Renderer
→ A11y
→ Error/Empty
```

Das ist bereits ein internes, leichtgewichtiges Architekturmodell.

Für Calculator-Apps mit wenigen Inputs ist Framework-Reaktivität nicht nötig.

### Verworfene Alternativen

#### React / Vue

Zu viel Runtime, Build-Komplexität und Konzeptlast.

#### Lit / Web Components

Interessant für spätere wiederverwendbare Komponenten, aber in Pilot 1 zu früh.

Shadow DOM kann Theme-Anbindung erschweren.

#### Alpine

Ghost-freundlich und leichtgewichtig, aber würde die Architektur in HTML-Attribute verlagern und AppContext/Renderer-Disziplin schwächen.

#### Svelte

Kompiliert zu JS, aber benötigt Build-System und Spezialsyntax.

### Risiken

Vanilla JS kann unstrukturiert werden.

Gegenmaßnahmen:

- 5-Layer-Modell
- AppContext
- klare Renderer-Grenze
- Vertical Slicing
- Code-Review

### Sicherheitsauswirkung

Positiv:

- keine Framework-Abhängigkeiten
- volle Kontrolle über SafeDOM
- keine fremde Rendering-Pipeline

### Komplexitätsauswirkung

Niedrig.

### Auswirkung auf Ghost

Sehr gut.

### Auswirkung auf alle Apps

Factory-Standard-Kandidat:

> Vanilla-first. Framework nur bei nachgewiesenem Bedarf.

### Wann neu bewerten

- nach 2–3 Apps
- bei Explorer-/Karten-Apps
- bei hoher DOM-Komplexität
- wenn vanilla Renderer schwer wartbar werden

### Status

Factory-Standard-Kandidat.

---

## D3 — CSS-Strategie und Ghost-Isolation

### Empfohlener Default

**`fw-app` CSS-Namespace + CSS Custom Properties. Kein Shadow DOM in Pilot 1.**

Alle App-CSS-Regeln beginnen mit `.fw-app` oder app-spezifisch:

```css
.fw-app { ... }

.fw-app .fw-app__hero { ... }

.fw-app .fw-app__slider { ... }

.fw-app[data-fw-app="prokrastinations-preis"] .fw-app__hero { ... }
```

### Warum

Die App soll:

- den Artikel nicht beschädigen
- vom Ghost-Theme nicht unkontrolliert beschädigt werden
- dennoch normale Theme-Tokens konsumieren
- im Browser einfach inspizierbar bleiben

Shadow DOM ist stärker isolierend, aber für Pilot 1 nicht passend, weil es:

- Theme-Anbindung erschwert
- Debugging erschwert
- A11y-Prüfung erschwert
- lokale Tests weniger transparent macht

### Verworfene Alternativen

#### Shadow DOM

Nicht für Pilot 1.

Später prüfen, wenn:

- Ghost-CSS trotz Namespace leakt
- Apps als Web Components außerhalb Ghost wiederverwendet werden sollen
- starke DOM-Isolation wichtiger wird als Theme-Einbindung

#### CSS Modules

Benötigt Build-System.

#### Kein Namespace

Nicht akzeptabel. Führt zu Ghost-CSS-Konflikten.

### Risiken

Theme-CSS kann trotz Namespace beeinflussen.

Gegenmaßnahmen:

- alle Selektoren relativ zu `.fw-app`
- keine globalen Selektoren
- keine globalen IDs
- keine App-CSS-Regeln für normale Artikel-Elemente

### Sicherheitsauswirkung

Neutral bis positiv. Einfacher zu auditieren als Shadow DOM.

### Komplexitätsauswirkung

Niedrig.

### Auswirkung auf Ghost

Sehr gut.

### Auswirkung auf alle Apps

Factory-Standard-Kandidat.

### Wann neu bewerten

- nach echtem Ghost-Test
- bei CSS-Leaks
- bei Einsatz außerhalb Ghost

### Status

Factory-Standard-Kandidat.

---

## D4 — Design-System-Anbindung

### Empfohlener Default

**Theme-Tokens sind die zentrale Design-Wahrheit. Apps konsumieren semantische CSS Custom Properties.**

Es gibt keine Farb- und Font-Tabellen pro App.

Zielbild:

```text
Ghost Theme / screen.css
→ CI-Rohwerte
→ semantische App-Tokens
→ App-CSS konsumiert Tokens
```

Beispiel:

```css
:root {
  --fw-app-color-primary: var(--color-petrol);
  --fw-app-color-text: var(--color-text);
  --fw-app-color-surface: var(--color-surface);
  --fw-app-font-body: var(--font-body);
  --fw-app-font-heading: var(--font-heading);
}
```

App-CSS:

```css
.fw-app__hero-value {
  color: var(--fw-app-color-primary);
  font-family: var(--fw-app-font-heading);
}
```

### Was App-CSS darf

- Layout
- Komponentenstruktur
- responsive Verhalten
- Token-Nutzung
- Fallback-Werte in `var()`

### Was App-CSS nicht darf

- Hex-Werte hardcoden
- eigene Fonts setzen
- eigene CI-Farben definieren
- globale Artikel-Styles überschreiben
- eigene Farbsysteme pro App erfinden

### Warum

Eine CI-Änderung soll zentral passieren, nicht in 21 App-Dateien.

### Risiken

Das Theme-Token-Inventar muss bekannt sein.

### Sicherheitsauswirkung

Indirekt positiv: weniger ad-hoc Inline-CSS und weniger lokale Sonderfälle.

### Komplexitätsauswirkung

Mittel: Token-Inventar muss einmal sauber definiert werden.

### Auswirkung auf Ghost

Sehr gut.

### Auswirkung auf alle Apps

Factory-Standard-Kandidat.

### Wann neu bewerten

- wenn `screen.css` keine ausreichenden Tokens liefert
- wenn Ghost-Theme noch stark im Fluss ist

### Status

Factory-Standard-Kandidat, aber abhängig von Theme-Token-Inventar.

---

## D5 — Config-Strategie

### Empfohlener Default

**Pilot 1: Config als interne JS-Konstante in `app.js`.**

Die APP_SPEC darf weiterhin ein JSON-ähnliches Config-Schema dokumentieren, aber die Implementierung lädt in Pilot 1 keine externe Config-Datei.

Pilot 1:

```text
internal defaults
→ data-fw-options overrides
→ validated AppData
```

Später (entschieden, → SEC-04 `01_DECISION_LOG.md`): `data-fw-config` trägt ausschließlich einen vollständigen kanonischen JSON-Dateinamen einschließlich Suffix (`^[a-z0-9_-]+\.json$`), keine URL. Der zentrale Resolver bildet `/content/files/app-data/<dateiname>` durch reine Präfixbildung — `<dateiname>` ist bereits vollständig mit `.json`, kein zusätzlich angehängtes Suffix (analog `data-fw-data`/`data-app-file`, → `ChartEngine.js`). Kein Fetch aus freier Domain, kein CORS-Thema.

```text
internal defaults
→ optional data-fw-config (kanonischer Dateiname, zentral aufgelöst)
→ data-fw-options overrides
→ validated AppData
```

### Warum

Eine externe `app.config.json` erzeugt sofort Fragen:

- Fetch?
- CORS?
- URL?
- Cache-Busting?
- Domain-Lock?
- Fehlermeldungen?
- Deployment?

Für Pilot 1 ist das unnötig.

### Verworfene Alternativen

#### Externe `data-fw-config` in Pilot 1

Zu früh.

#### JSON inline in Ghost-Card

Verboten / nicht redakteursfreundlich.

#### Alles hart verdrahten ohne Config-Struktur

Zu unflexibel für spätere Apps.

### Risiken

Inline Config bedeutet: Text-/Default-Änderungen brauchen Codeänderung.

Für Pilot 1 akzeptabel.

### Sicherheitsauswirkung

Positiv: keine externe Config-Angriffsfläche.

### Komplexitätsauswirkung

Niedrig.

### Auswirkung auf Ghost

Sehr gut.

### Auswirkung auf alle Apps

Factory-Standard-Kandidat:

- interne Defaults immer
- externe Config nur bei Bedarf
- `data-fw-options` nur für kleine Whitelist-Overrides

### Wann neu bewerten

- ab App 2/3
- bei redaktionell häufig geänderten Texten
- bei komplexen Szenario-Configs
- wenn echte externe Datenquellen nötig sind

### Status

Pilot-1-Arbeitsannahme + Factory-Standard-Kandidat.

---

## D6 — Teststrategie

### Empfohlener Default

**Pilot 1: manuelle lokale Testseite `app.test.html`.**

Die Testseite simuliert Ghost-Cards und läuft lokal über den VSCode-Server:

```text
http://127.0.0.1:5500/Apps/prokrastinations-preis/app.test.html
```

### Pflicht in Pilot 1

`app.test.html` enthält mindestens:

- Minimal-Card
- Card mit `data-fw-options`
- ungültiger Slug
- ungültiger Optionswert
- XSS-Versuch
- Hinweise für Mobile-Test
- Hinweise für Tastaturtest
- Hinweise für `prefers-reduced-motion`

### Warum

Das entspricht Alberts bisherigem Chart-Engine-Testmodell:

```text
lokale HTML-Datei
→ VSCode-Server
→ HTML-Card
→ JavaScript liest Card
→ App entsteht
→ Albert prüft im Browser
```

### Späterer Ausbau

Ab App 2 prüfen:

- Vitest für reine Berechnungsfunktionen

Ab App 3 prüfen:

- Playwright für Ghost-Integration
- axe-core für A11y-Automation

### Verworfene Alternativen

#### Automatisierung vor Pilot 1

Zu früh. Horizontale Infrastruktur ohne direkten Nutzerwert.

#### Nur manuell für immer

Zu schwach für 21 Apps.

### Risiken

Manuelle Tests können Fehler übersehen.

Gegenmaßnahmen:

- strukturierte Testfälle aus APP_SPEC
- Testseite mit klaren Szenarien
- später Automatisierung

### Sicherheitsauswirkung

XSS- und Options-Tests bleiben Pflicht, zunächst manuell.

### Komplexitätsauswirkung

Niedrig in Pilot 1.

### Auswirkung auf Ghost

Gut, weil Testseite Ghost-Card realistisch simuliert.

### Auswirkung auf alle Apps

Factory-Standard-Kandidat:

> Jede App bekommt eine lokale `app.test.html`.

### Wann neu bewerten

- nach Pilot 1
- nach App 2
- bei wiederholten Regressionen

### Status

Pilot-1-Arbeitsannahme + Factory-Standard-Kandidat.

---

## D7 — Code-Ablage / Verzeichnisstruktur

### Empfohlener Default für Pilot 1

Pflichtdateien:

```text
/Apps/prokrastinations-preis/
  APP_SPEC.md
  MINI_SPEC_FROM_HAUPTDOKUMENT.md
  app.js
  app.css
  app.test.html
```

Optional:

```text
  README.md
  NOTES.md
  ghost-card.example.html
  app.config.json
```

Nicht in Pilot 1:

```text
  src/
  dist/
  tests/
  node_modules/
```

### Warum

Ohne Build-System gibt es kein `dist`.

`app.js` ist Quelle und Lieferdatei zugleich.

### Verworfene Alternativen

#### `src/` / `dist/` sofort

Zu früh ohne Build-System.

#### alles in eine HTML-Datei

Nicht App-Fabrik-tauglich.

#### globaler Core-Ordner sofort

Zu frühe Abstraktion.

### Risiken

`app.js` kann groß werden.

Gegenmaßnahmen:

- Slice für Slice bauen
- nach Pilot 2 prüfen
- bei Bedarf strukturieren

### Sicherheitsauswirkung

Klare Ablage erleichtert Review.

### Komplexitätsauswirkung

Niedrig.

### Auswirkung auf Ghost

Einfach.

### Auswirkung auf alle Apps

Factory-Standard-Kandidat.

### Wann neu bewerten

- nach Pilot 1
- wenn `app.js` zu groß wird
- wenn Build-System eingeführt wird

### Status

Pilot-1-Arbeitsannahme + Factory-Standard-Kandidat.

---

## D8 — App-Fabrik-Core vs. app-lokal

### Empfohlener Default

**Pilot 1 bleibt app-lokal. Kein gemeinsamer Core vor App 2.**

### Extraction-Regel

Eine Funktion wandert in den Core, wenn:

1. sie in mindestens zwei verschiedenen Apps identisch oder fast identisch gebraucht wird
2. ihre Extraktion die App-Logik nicht unverständlicher macht
3. sie klar testbar und stabil ist
4. sie nicht nur hypothetisch gebraucht wird

### Was in Pilot 1 app-lokal bleibt

- Bootstrap
- Config-Konstante
- Options-Parsing
- Validatoren
- Berechnung
- Renderer
- State Handling
- SafeDOM-Helfer

### Was ab App 2 Kandidat für Core wird

- Bootstrapper
- Slug-Whitelist
- Options-Parser
- SafeDOM-Helfer
- Formatierungs-Helfer
- State-Renderer
- A11y-Helfer

### Warum

Zu frühe Abstraktion ist ein hohes Risiko.

Ein falscher Core zentralisiert Fehler und zwingt alle Apps in eine falsche Struktur.

### Risiken

App-lokal kann Copy-Paste fördern.

Gegenmaßnahmen:

- Extraction-Liste in `NOTES.md`
- Pilot-Auswertung
- nach App 2 bewusst extrahieren

### Sicherheitsauswirkung

Ein späterer guter Core kann Sicherheit zentralisieren. Ein früher falscher Core zentralisiert Fehler.

### Komplexitätsauswirkung

Niedrig in Pilot 1.

### Auswirkung auf alle Apps

Factory-Standard-Kandidat.

### Wann neu bewerten

Nach Pilot 2 (`risiko-uebersetzer`).

### Status

Factory-Standard-Kandidat.

---

## D9 — Deployment in Ghost

### Empfohlener Default

**Entschieden (→ SEC-04, `01_DECISION_LOG.md`, 2026-07-21): statischer Bootstrapper im Theme-Bundle + Minimal-Cards.**

Redakteur fügt nur ein:

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis">
</div>
```

Ein statischer Bootstrapper im Theme-Bundle sucht `.fw-app` Container, prüft den Slug gegen eine literale Registry (Slug → statisch importierte Init-Funktion) und initialisiert die passende App. Kein Wert aus einem `data-*`-Attribut beeinflusst je einen Import-Pfad, eine Script-URL oder einen `import()`-Ausdruck. Unbekannter Slug → Error-State, kein Nachladen. Jeder Container eigene `try/catch`-Error-Boundary; `data-fw-initialized`-Guard bleibt Pflicht.

### Wichtig

Das Grundprinzip (Theme-Einbindung statt Code Injection, statische Registry statt dynamischem Nachladen) ist **entschieden**, nicht mehr Kandidat. Löst B3 zugunsten „Theme". Praktisch noch zu testen bleiben nur die operativen Ghost-Details:

- Ghost-Theme-Integration: genaue Einbindungsstelle im Theme-Build
- echtes Upload-URL-Schema
- Pfadstruktur für App-Dateien
- Cache-Busting
- Whitelist-Pflege

### Warum

Das schützt Redakteure vor Technik.

Redakteure sollen nicht:

- Skript-Tags einfügen
- App-Dateien kennen
- JSON schreiben
- CSS pflegen
- Assets verwalten

### Verworfene Alternativen

#### Skript-Tags pro Artikel

Zu fehleranfällig für Redakteure.

#### App-Logik inline in HTML-Card

Nicht wartbar und sicherheitlich schlecht.

#### Redakteur pflegt JSON

Zu fehleranfällig.

### Risiken

- globaler Bootstrapper läuft auf allen Seiten
- Upload-URLs müssen stabil sein
- Bootstrapper braucht Slug-Whitelist
- App-Dateien müssen versioniert/cachegebustet werden

### Sicherheitsauswirkung

Bootstrapper wird Sicherheitsperimeter:

- Slug-Whitelist
- keine freien URLs
- kein `eval`
- keine dynamischen Script-Injections aus untrusted input

### Komplexitätsauswirkung

Mittel, aber zentral.

### Auswirkung auf Ghost

Gut, wenn praktisch verifiziert.

### Auswirkung auf alle Apps

Factory-Standard-Kandidat.

### Wann neu bewerten

Vor erstem echten Ghost-Deployment.

### Status

Grundprinzip entschieden (→ SEC-04). Operative Deployment-Details (Upload-URL-Schema, Cache-Busting, Whitelist-Pflege) bleiben offen.

---

## D10 — Vertical Slicing

### Empfohlener Default

**Alle App-Implementierungen erfolgen in Vertical Slices.**

Kein horizontaler Vorbau ohne sichtbaren Nutzerwert.

Ein Slice läuft durch die relevanten Layer:

```text
Ghost-Card
→ Bootstrap
→ Config
→ Parsing / Validation
→ AppData
→ Strategy
→ AppContext
→ Renderer
→ UI
→ A11y
→ Test
```

### Was ein Slice nicht ist

Nicht gültig als eigenständiger Slice:

- „CSS-System bauen“
- „Core bauen“
- „Parser bauen“
- „alle Komponenten bauen“
- „Testsystem aufsetzen“

### Was ein Slice ist

Gültig:

- „Minimal-Card lädt und zeigt Error-State“
- „Default-Berechnung zeigt Hauptzahl“
- „Wartezeit-Slider verändert Hauptzahl live“

### Warum

Vertical Slicing verhindert, dass Claude lange horizontale Infrastruktur baut, ohne dass Albert etwas sehen, bedienen und prüfen kann.

### Risiken

Slices können zu klein und technisch werden.

Gegenmaßnahme:

Jeder Slice braucht:

- Ziel
- Nutzerwert / Erkenntniswert
- betroffene Layer
- geänderte Dateien
- Akzeptanzkriterien
- Nicht-Ziele
- Risiken

### Status

Factory-Standard-Kandidat.

---

## D11 — Erster Implementierungs-Slice

### Empfohlener Default

**Slice 0: App-Shell und Ghost-Card-Bootstrap.**

### Ziel

Beweisen, dass der App-Container erkannt wird, Slug-Prüfung funktioniert und States sauber dargestellt werden.

### Dateien

```text
/Apps/prokrastinations-preis/app.js
/Apps/prokrastinations-preis/app.css
/Apps/prokrastinations-preis/app.test.html
```

### Akzeptanzkriterien

- Minimal-Card lädt lokal.
- Ungültiger Slug zeigt sauberen deutschen Error-State.
- Kein leerer Container.
- Kein Stacktrace für Endnutzer.
- Keine Berechnung.
- Keine Slider.
- Keine Codeänderungen außerhalb des App-Ordners.
- Kein `innerHTML` für Nutzdaten.

### Nicht-Ziele

- keine Berechnung
- keine echte Hauptzahl
- kein Slider
- kein Vergleichsanker
- keine Ghost-Produktionsintegration

### Warum

Dieser Slice validiert:

- Card-Erkennung
- Bootstrap
- State-Grundstruktur
- CSS-Namespace
- lokale Testbarkeit

### Status

Pilot-1-Arbeitsannahme.

---

## 7. Vertical-Slicing-Standard

### 7.1 Definition

Ein Vertical Slice ist ein kleiner, vollständiger, testbarer Durchstich durch die App, der einen Nutzerwert oder eine kritische Infrastrukturannahme sichtbar macht.

### 7.2 Pflicht je Slice

Jeder Slice dokumentiert:

- Ziel
- Nutzerwert
- betroffene Layer
- geänderte Dateien
- Akzeptanzkriterien
- Testfälle
- Nicht-Ziele
- Risiken

### 7.3 Fertig-Kriterien

Ein Slice ist fertig, wenn:

1. Akzeptanzkriterien erfüllt sind
2. lokale Testseite funktioniert
3. relevante APP_SPEC-Testfälle erfüllt sind
4. keine Sicherheitsregel verletzt ist
5. keine A11y-Regel des Slices verletzt ist
6. Albert den sichtbaren Stand prüfen kann
7. Diff dokumentiert ist

### 7.4 Anti-Pattern

Nicht erlaubt als eigene frühe Phase:

- erst alle Komponenten bauen
- erst kompletten Core bauen
- erst CSS-System bauen
- erst automatisierte Tests bauen
- erst vollständige Architektur bauen

Solche Arbeiten sind nur erlaubt, wenn sie für einen konkreten Slice nötig sind.

---

## 8. Empfohlener Slice-Plan für `prokrastinations-preis`

### Slice 0 — App-Shell und Ghost-Card-Bootstrap

**Ziel:**  
Ghost-Card-Vertrag lokal beweisen.

**Nutzerwert:**  
Kein leerer Container; Fehler werden menschlich angezeigt.

**Layer:**  
Ghost-Card → Bootstrap → State → Renderer → CSS.

**Dateien:**  
`app.js`, `app.css`, `app.test.html`

**Akzeptanzkriterien:**

- Minimal-Card lädt.
- ungültiger Slug zeigt Error-State.
- Content-State zeigt statischen Platzhalter.
- kein Stacktrace.
- kein `innerHTML` für Nutzdaten.

**Nicht-Ziele:**  
Keine Berechnung, keine Slider.

---

### Slice 1 — Hauptzahl aus Defaults

**Ziel:**  
Die Kernaussage wird sichtbar.

**Nutzerwert:**  
Nutzer sieht den Prokrastinations-Preis aus Default-Werten.

**Layer:**  
Config → Parser/Validator → AppData → Strategy → AppContext → Renderer → A11y.

**Akzeptanzkriterien:**

- `prokrastinationsPreis` korrekt berechnet.
- monatliche Rendite korrekt abgeleitet.
- AppContext enthält reine Zahlen.
- Hero-Zahl sichtbar.
- A11y-Summary vorhanden.
- SafeDOM eingehalten.

**Nicht-Ziele:**  
Keine Slider.

---

### Slice 2 — Wartezeit-Slider

**Ziel:**  
Primärer interaktiver Beweis.

**Nutzerwert:**  
Nutzer spürt, dass Wartezeit den Betrag verändert.

**Layer:**  
UI → Event → Validation/Clamp → Strategy → AppContext → Renderer → Live Region.

**Akzeptanzkriterien:**

- Wartezeit-Slider steht zuerst.
- Hauptzahl reagiert sofort.
- Tastaturbedienung funktioniert.
- `aria-valuetext` sinnvoll.
- Live Region wird nicht gespammt.
- `prefers-reduced-motion` respektiert.

---

### Slice 3 — Monatsrate und Anlagedauer

**Ziel:**  
Alle drei Eingaben funktionieren.

**Nutzerwert:**  
Nutzer kann eigene Lage grob annähern.

**Akzeptanzkriterien:**

- Monatsrate änderbar.
- Anlagedauer änderbar.
- Clamp-Regeln greifen.
- kein Empty-State bei normaler Bedienung.

---

### Slice 4 — AssumptionsBox

**Ziel:**  
Truthful UX.

**Nutzerwert:**  
Nutzer sieht die Renditeannahme.

**Akzeptanzkriterien:**

- erste Zeile immer sichtbar
- Renditeannahme nicht versteckt
- Inflation-Hinweis ohne Realrechnung
- keine Finanzberatung
- textContent

---

### Slice 5 — Nebenwerte und Vergleichsanker

**Ziel:**  
Hauptzahl wird erklärt.

**Nutzerwert:**  
Nutzer versteht, woher der Betrag kommt.

**Akzeptanzkriterien:**

- Nebenwerte positiv zuerst
- keine zweite Hauptzahl
- Vergleichsanker optional und untergeordnet
- Kontextsatz verständlich

---

### Slice 6 — Responsive und A11y-Härtung

**Ziel:**  
Nutzbar auf echten Geräten.

**Akzeptanzkriterien:**

- 375px ohne horizontalen Overflow
- Tablet lesbar
- Desktop sauber
- Tastaturtest bestanden
- Kontrasttest bestanden
- reduced motion funktioniert
- Screenreader-Summary sinnvoll

---

### Slice 7a — Lokale QA / Testseite vollständig

**Ziel:**  
Albert kann lokal vollständig prüfen.

**Akzeptanzkriterien:**

- alle relevanten APP_SPEC-Testfälle lokal prüfbar
- `app.test.html` dokumentiert Szenarien
- manuelle Testliste vorhanden

---

### Slice 7b — Echter Ghost-Integrationstest

**Ziel:**  
Produktionsnaher Embed-Test.

**Akzeptanzkriterien:**

- App lädt in echter oder Staging-Ghost-Seite
- Bootstrapper funktioniert
- Upload-URLs funktionieren
- Minimal-Card funktioniert
- keine Theme-CSS-Konflikte
- keine unerwarteten Konsolenfehler

**Hinweis:**  
Dieser Slice ist vor Produktionsfreigabe Pflicht, aber nicht zwingend vor lokalem Lernen aus Pilot 1.

---

## 9. Offene Blocker

### B1 — Theme-Token-Inventar

**Frage:**  
Welche CSS Custom Properties exportiert `screen.css` tatsächlich?

**Einordnung:**  
Blocker für finales Design-System und produktives Styling.  
Kein Blocker für Slice 0/1, wenn Fallback-Werte genutzt werden.

**Nächster Schritt:**  
`screen.css` inventarisieren und Token-Mapping dokumentieren.

---

### B2 — Ghost-Upload-URL-Schema

**Frage:**  
Wie lauten echte URLs für hochgeladene JS/CSS-Dateien?

**Einordnung:**  
Blocker vor echtem Ghost-Deployment.  
Kein Blocker für lokale Testdatei.

**Nächster Schritt:**  
Testdatei in Ghost hochladen und URL-Schema dokumentieren.

---

### B3 — Bootstrapper-Strategie

**Status: 🟢 ERLEDIGT (2026-07-21, → SEC-04 `01_DECISION_LOG.md`).**

**Frage (historisch):**
Wird der Bootstrapper global per Ghost Code Injection / Theme eingebunden oder app-spezifisch geladen?

**Entscheidung:**
Theme — statischer Bootstrapper im Theme-Bundle mit fester Registry/Slug-Whitelist, kein Code Injection, kein Script pro Ghost-Card.

**Verbleibt offen (kein Blocker für Migration):**
Genaue Einbindungsstelle innerhalb des Theme-Builds (Header/Footer-Äquivalent im Theme-Bundle-Prozess) — praktischer Ghost-Test.

---

## 10. Nicht-Blocker

Diese Themen werden bewusst später geklärt:

- Vite
- Rollup
- TypeScript
- Vitest
- Playwright
- axe-core
- gemeinsamer `fw-app-core`
- Shadow DOM
- ChartAdapter/API
- externe `data-fw-config`
- App-spezifische Build-Pipeline
- NumericInput
- Share-Feature
- Chart in `prokrastinations-preis`

---

## 11. Was Albert wirklich entscheiden muss

Albert entscheidet Prinzipien, nicht Technikdetails.

Bestätigt sind:

1. Pilot 1 ohne unnötiges Build-System.
2. Vanilla JS als Default.
3. Kein Framework ohne Bedarf.
4. CSS-Isolation per `fw-app`-Namespace statt Shadow DOM.
5. Theme-Tokens bleiben Design-Wahrheit.
6. Tests starten manuell mit lokaler HTML-Testseite.
7. Core wird nicht vor App 2 extrahiert.
8. Implementierung erfolgt in Vertical Slices.
9. Ghost-Redakteur bekommt weiterhin nur Minimal-Cards.

Noch echte Albert-Entscheidungen / Bestätigungen:

1. ~~Soll der globale Bootstrapper als Zielbild weiterverfolgt werden?~~ Entschieden: Ja — statischer Theme-Bootstrapper mit fester Registry/Slug-Whitelist (→ SEC-04, 2026-07-21).
2. Reicht lokale Testseite für Slice 0–6 vor echtem Ghost-Test?
3. Wird Core-Extraktion erst nach Pilot 2 geprüft?
4. Darf Pilot 1 mit Fallback-Design-Tokens starten, falls `screen.css` noch unvollständig ist?

---

## 12. Was Claude / Entwickler entscheiden darf

Claude darf innerhalb dieser Leitplanken entscheiden:

- Funktionsnamen
- interne Organisation in `app.js`
- konkrete CSS-Klassennamen im `fw-app` Namespace
- DOM-Struktur
- Formatierungsfunktionen
- Berechnungsfunktionen
- Slider-Event-Handling
- Debounce / requestAnimationFrame Details
- State-Rendering
- Testseitenaufbau

Claude darf nicht still entscheiden:

- neues Framework
- neues Build-System
- Shadow DOM
- externe Config als Pflicht
- Chart-Engine-Refactoring
- gemeinsamer Core vor Freigabe
- externe CDN-Abhängigkeiten
- Änderung des Ghost-Card-Vertrags
- globale Spec-Änderungen ohne Gate

---

## 13. Dokumentationsfolgen

Nach Review dieses RFC sollten folgende Dateien aktualisiert werden.

### 13.1 `docs/App-Fabrik/01_DECISION_LOG.md`

Neue Einträge für:

- Vanilla JS als Default
- kein Bundler für Pilot 1
- `fw-app` Namespace statt Shadow DOM
- Theme Tokens als Design-Wahrheit
- manuelle Testseite als Pilot-Teststandard
- Core-Extraktion frühestens nach App 2
- Vertical Slicing als Implementierungsprinzip
- Bootstrapper-Zielbild als Factory-Standard-Kandidat

### 13.2 `docs/App-Fabrik/04_CLAUDE_WORKFLOW_DRAFT.md`

Ergänzen:

- Pre-Code-Gate enthält Implementation-RFC
- vor Code: Slice-Plan erforderlich
- keine Implementierung ohne Slice-Akzeptanzkriterien
- lokale `app.test.html` als Pflicht für Pilot 1

### 13.3 `.claude/skills/tech-spec-app/SKILL.md`

Ergänzen:

- APP_SPEC muss auf Implementation-Standard verweisen
- technische Spec darf Build/Framework nicht still entscheiden
- Vertical Slicing später vor Implementierung prüfen

### 13.4 `.claude/commands/app-spec-create.md`

Ergänzen:

- APP_SPEC-Erstellung endet nicht mit Code-Freigabe
- Pre-Code-Gate liest Implementation-RFC/Standard
- App-Spec und Implementation-Standard getrennt halten

### 13.5 Spätere Ziel-Spec

Nach Pilot-Erfahrung:

```text
docs/spec/APP-FACTORY-IMPLEMENTATION-STANDARD.md
```

---

## 14. Empfehlung

Der RFC sollte jetzt als Arbeitsgrundlage gesichert werden.

Dann:

1. Albert prüft die 4 offenen Bestätigungen in §11.
2. Claude erstellt / aktualisiert Decision Log.
3. Claude aktualisiert Workflow, Skill und Command mit Verweisen.
4. Spec-Gate für `prokrastinations-preis`.
5. Pre-Code-Gate mit Slice-Plan.
6. Slice 0 Implementierung.
7. Slice 1 Implementierung.
8. Nach Pilot 1: Review, dann RFC → Spec.

---

## 15. Kurzfazit

Die faire Synthese aus ChatGPT-Grill und Perplexity-Review lautet:

```text
Vanilla JS.
Kein Bundler in Pilot 1.
Keine Frameworks.
Namespace-CSS.
Zentrale Theme-Tokens.
Lokale HTML-Testseite.
Keine frühe Core-Abstraktion.
Vertical Slicing.
Minimal-Cards für Redakteure.
Bootstrapper als Zielbild, aber praktisch testen.
```

Damit entsteht ein System, das:

- einfach genug ist
- sicher genug ist
- wartbar bleibt
- Ghost respektiert
- Albert nicht mit Technikdetails belastet
- Claude trotzdem klare Leitplanken gibt
- und nach 2–3 Apps sinnvoll generalisiert werden kann
