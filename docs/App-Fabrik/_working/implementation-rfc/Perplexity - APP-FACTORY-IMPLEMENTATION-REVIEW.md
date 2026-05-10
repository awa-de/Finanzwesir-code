# App-Fabrik Implementation Review / Pre-Code-Grill

**Reviewer:** Unabhängiger technischer Review (Perplexity / Claude Sonnet 4.6)  
**Stand:** 2026-05-10  
**Repo:** `awa-de/Finanzwesir-code`  
**Pilot-App:** `Apps/prokrastinations-preis`  
**Zieldokument:** `docs/spec/APP-FACTORY-IMPLEMENTATION-STANDARD.md`

---

## Executive Summary

**Empfohlene Grundrichtung: Vanilla JS, kein Bundler, CSS-Namespace, Vertical Slicing.**

Die App-Fabrik soll 21 kleine bis mittelgroße Ghost-embedded Widgets produzieren — keine SPA, kein Framework-Overhead, kein CDN-Rollout-Problem. Die bestehende Architektur (P-01–P-10, APP-INTERFACE.md, fw-app-Namespace) ist tragfähig und gut durchdacht. Sie muss nicht überbaut werden.

Empfehlung in einem Satz: **Schreibe Pilot-1 als moderne ES-Module in reinem Vanilla JS ohne Bundler, scoped mit `fw-app`-CSS-Namespace, deploye als einzelne `.js`-Datei via Ghost Code Injection, vertikal geschnitten in 8 Slices.**

Die wichtigste Erkenntnis aus diesem Review: Das Risiko liegt nicht im fehlenden Framework oder Build-System. Das Risiko liegt in **zu früher Abstraktion** (Core extrahieren bevor zwei Apps existieren) und **horizontalem Bauen** (erst CSS-System, erst Shell, dann App). Beide Fehler würden Pilot-1 verlangsamen und den Standard korrumpieren.

---

## Grundprinzipien

Diese Prinzipien gelten für alle Entscheidungen in diesem Review:

1. **Lindy-Prinzip:** Bevorzuge Technik, die seit mindestens 5 Jahren stabil ist und noch mindestens 5 Jahre stabil sein wird. Vanilla JS, ES-Module, CSS Custom Properties erfüllen das. Vite, Alpine.js noch nicht sicher.
2. **Ghost-first:** Jede Entscheidung muss mit dem Ghost.io-Deployment-Modell kompatibel sein. Ghost ist kein Webserver, der Build-Artefakte verwaltet.
3. **Kein Framework ohne Gegenwert:** Ein Framework bringt nur dann Wert, wenn es spürbare Schmerzen bei Vanilla löst. Für Calculator-Apps mit 3–5 Inputs gibt es keinen solchen Schmerz.
4. **Pilot zuerst validieren, dann abstrahieren:** Core-Extraktion nach App 2, nicht vorher.
5. **Komplexität kostet Alberts Zeit:** Jede Build-Pipeline, jeder Bundler, jede Dev-Dependency ist eine Erklärschuld gegenüber Albert und eine Wartungslast.
6. **Sicherheit ist kein Feature:** SafeDOM, URL-Whitelisting, Whitelist-Prinzip sind Architekturgegebenheiten, keine optionalen Checks.
7. **Vertical over Horizontal:** Sichtbarer Nutzerwert vor vollständigem Schichtsystem.

---

## Entscheidungsmatrix

---

### D1 — Build-System und Bundling

**Empfohlener Default:**  
**Kein Bundler. Native ES-Module. Einzelne `.js`-Datei pro App.**

Die App-Logik (app.js) wird als natives ES-Modul geschrieben (`type="module"`). Deployment in Ghost über Ghost's **Code Injection** (Header-Abschnitt in den Ghost-Admin-Einstellungen) oder via Ghost-Theme-Skript-Tag. Die produzierte Datei ist `app.js` — kein Bundle, kein Transpiling, kein Minifizier-Schritt für Pilot 1.

**Warum:**  
ES-Module sind seit 2017 in allen Browsern nativ verfügbar und seit 2020 stabil. Ghost ist kein Node.js-Server mit Asset-Pipeline — Redakteure laden Dateien hoch, sie deployen keine npm-Builds. Ein Bundler würde eine lokale Build-Kette erfordern, die Albert nicht betreiben kann und Claude bei jedem Patch ausführen müsste. Vanilla ES-Module benötigen keinen Build-Schritt.

**Verworfene Alternativen:**
- **Vite:** Exzellentes DX-Tool, aber erzeugt Build-Artefakte, die irgendwo deployt werden müssen. Für Ghost gibt es keinen Vite-Plugin-Support. Overhead ohne klaren Gewinn bei 21 kleinen Apps.
- **Rollup:** Sinnvoll für Library-Bundles. Hier gibt es keine Library, nur App-Logik.
- **esbuild/Parcel:** Dasselbe Argument wie Rollup — kein Build ohne Deployment-Infrastruktur.
- **`<script>`-Tags ohne Module:** Funktioniert, verhindert aber saubere Kapselung und Top-Level-Await.

**Risiken:**  
- ES-Module laden asynchron — der Bootstrap-Moment muss korrekt gehandelt werden (App-Shell muss auf DOMContentLoaded warten oder `defer` nutzen).
- Kein Tree-Shaking → wenn ein Shared-Core-Modul groß wird, wird er vollständig geladen. Bei App-Größen von 5–30 KB ist das irrelevant.
- Ältere Ghost-Installationen: Falls Ghost selbst ein älteres Theme hostet, muss `type="module"` explizit gesetzt sein.

**Sicherheitsauswirkung:**  
Positiv. Keine CDN-Abhängigkeit, kein externer Bundle-Download. Alle Dateien liegen auf `finanzwesir.com`. Entspricht Sicherheitsregel §9 (APP-INTERFACE.md).

**Komplexitätsauswirkung:**  
Minimal. Kein lokales Build-Setup für Albert. Claude schreibt `.js`, Albert lädt hoch, fertig.

**Auswirkung auf Ghost:**  
Optimal. Ghost Code Injection akzeptiert `<script type="module" src="...">`. Ghost-Upload-URLs können als CDN für die Skriptdatei dienen.

**Auswirkung auf alle Apps:**  
Alle 21 Apps folgen demselben Muster: `app.js` schreiben, in Ghost hochladen, Code Injection eintragen. Keine App braucht eine eigene Build-Pipeline.

**Wann neu bewerten:**  
Wenn ab App 5+ ein Shared-Core-Modul > 50 KB entsteht oder TypeScript eingeführt werden soll. Dann: Vite als optionaler Dev-Build ohne Änderung am Deployment-Modell.

**Status:** Factory-Standard-Kandidat

---

### D2 — Framework-Entscheidung

**Empfohlener Default:**  
**Vanilla JavaScript. Kein Framework.**

App-Logik folgt dem P-01–P-10-Architekturmuster: `init()` → `loadData()` → `parseConfig()` → `Strategie` → `AppContext` → `Renderer`. Das ist ein klares, strukturiertes Muster ohne Framework-Anforderung.

**Warum:**  
Calculator-Apps mit 3–5 Slider-Inputs haben keine DOM-Komplexität, die ein Framework rechtfertigt. Reaktivität (Slider → Neuberechnung → Anzeige) ist mit 10–15 Zeilen Vanilla JS lösbar. Ein Framework würde eine neue Lernkurve, neue Abhängigkeiten und neue Versionsrisiken einführen, ohne einen messbaren Gewinn bei dieser App-Größe.

Der bestehende Architekturplan (P-01–P-10) ist bereits ein ausgezeichnetes Vanilla-Framework — er definiert Phasen, Datenfluss und AppContext. Ein externes Framework würde entweder diesen Plan ignorieren oder überlagern.

**Verworfene Alternativen:**
- **Lit (Web Components):** Gut für wiederverwendbare Komponenten-Libraries. Hier gibt es keine Library — es gibt 21 App-Instanzen. Shadow DOM würde die Theme-Bridge-Anbindung (CSS Custom Properties aus Ghost-Theme) verkomplizieren.
- **Alpine.js:** Kompakt und Ghost-freundlich. Setzt aber `x-data`, `x-bind` etc. in HTML voraus, was die APP_SPEC-Architektur (Strategie → AppContext → Renderer) umkehren würde. Außerdem: weitere Abhängigkeit, weitere CDN-Quelle.
- **React/Vue:** Massiver Overhead für Ghost-Widgets. Bundle-Größe, Build-Pipeline, SSR-Fragen. Klar abzulehnen.
- **Web Components ohne Framework:** Interessant für längere Laufzeit (> 3 Jahre). Ohne Shadow DOM: kaum Unterschied zu Vanilla. Mit Shadow DOM: Theme-Isolation erschwert Theme-Bridge. Für Pilot-1: nicht gebraucht.
- **Svelte:** Kompiliert zu Vanilla JS — theoretisch interessant. Aber: Build-Step erforderlich, Svelte-spezifische Syntax, kein Lindy-Vorteil.

**Risiken:**  
- Bei komplexen Apps (Multi-Chart, Tabellenexplorer) kann Vanilla DOM-Management unübersichtlich werden. Lösung: saubere Renderer-Abstraktion per Architekturprinzip, nicht Framework.
- Copy-Paste-Muster ohne Framework erfordern Disziplin. Lösung: Vertical Slicing + Shared Core ab App 2.

**Sicherheitsauswirkung:**  
Neutral bis positiv. Kein Framework-Sicherheitsrisiko (keine fremden Render-Pipelines). SafeDOM-Pflicht bleibt vollständig in Entwicklerhand — kein Framework kann diese Entscheidung abnehmen.

**Komplexitätsauswirkung:**  
Minimal. Kein Framework-Setup, keine Versionskonflikt-Risiken.

**Auswirkung auf Ghost:**  
Optimal. Kein Framework-Bundle in Ghost Code Injection nötig.

**Auswirkung auf alle Apps:**  
Alle 21 Apps folgen demselben Vanilla-Muster. Claude kennt das Muster nach App 1 auswendig.

**Wann neu bewerten:**  
Bei Apps der Familien Explorer (Kartennavigation) oder Multi-Chart-Dashboard, wenn DOM-Komplexität messbar wird. Dann: Lit für die betroffene Familien-Shell, nicht für alle Apps.

**Status:** Factory-Standard-Kandidat

---

### D3 — CSS-Strategie und Ghost-Isolation

**Empfohlener Default:**  
**`fw-app`-CSS-Namespace + CSS Custom Properties aus Ghost-Theme. Kein Shadow DOM für Pilot-1.**

Alle CSS-Regeln der App beginnen mit `.fw-app` oder `.fw-app__*`. Das verhindert Leaks in beide Richtungen. Ghost-Theme-CSS-Custom-Properties (`--fw-color-primary`, `--fw-font-body` etc.) werden via **Theme-Bridge** konsumiert — Apps hardcoden keine Hex-Werte.

```css
/* Korrekt */
.fw-app { font-family: var(--fw-font-body, sans-serif); }
.fw-app__hero-number { color: var(--fw-color-primary, #01696f); }

/* Verboten */
.fw-app__hero-number { color: #01696f; }
```

**Warum:**  
Shadow DOM würde die Anbindung an CSS Custom Properties aus dem Ghost-Theme blockieren — Custom Properties durchqueren Shadow-DOM-Grenzen nur bedingt (sie werden vererbt, aber Theme-Bridge-Mechanik kann komplex werden). Da das Design-System auf Theme-Tokens aufbaut, ist Shadow DOM ein Anti-Pattern für diese Architektur.

`fw-app`-Namespace ist einfach, verständlich und ausreichend für 21 Apps. BEM-Notation (`.fw-app__element--modifier`) ist optional, aber empfohlen für größere App-CSS-Dateien.

**Verworfene Alternativen:**
- **Shadow DOM:** Stärker isoliert, aber durchbricht Theme-Bridge. Nur sinnvoll, wenn Apps bewusst *keine* Theme-Tokens konsumieren sollen. Das ist hier explizit nicht gewünscht.
- **CSS Modules (Bundler-abhängig):** Funktioniert nur mit Build-Step. Widerspricht D1.
- **Scoped Styles per `<style scoped>`:** Kein Standard in HTML. Nur Vue-spezifisch.
- **Kein Namespace (globales CSS):** Garantierter Konflikt mit Ghost-Theme-CSS nach App 3.

**Risiken:**  
- Ghost-Theme-Updates können Theme-Token-Namen ändern. Lösung: Fallback-Werte in `var(--token, fallback)` pflegen.
- CSS-Namespace-Verletzungen sind schwer automatisch zu prüfen. Lösung: CSS-Lint-Regel `selector-class-prefix` für `.fw-app`.

**Sicherheitsauswirkung:**  
Positiv. Kein Shadow DOM vermeidet versteckte DOM-Bäume, die Security-Audits erschweren.

**Komplexitätsauswirkung:**  
Gering. Eine CSS-Datei pro App (`app.css`), alle Regeln mit `.fw-app`-Präfix. Kein Tooling nötig.

**Auswirkung auf Ghost:**  
Sehr gut. Ghost-Theme-CSS bleibt unberührt. App-CSS ist self-contained.

**Auswirkung auf alle Apps:**  
Alle Apps nutzen denselben Namespace. Theme-Bridge ist einmal definiert, alle Apps konsumieren dieselben Tokens.

**Wann neu bewerten:**  
Wenn Ghost-Theme-Konflikte trotz Namespace auftreten oder wenn Apps als wiederverwendbare Widgets außerhalb von Ghost deployt werden sollen. Dann: Lit-Shadow-DOM-Migration für betroffene Apps.

**Status:** Factory-Standard-Kandidat

---

### D4 — Design-System-Anbindung

**Empfohlener Default:**  
**CSS Custom Properties als Theme-Bridge. Apps konsumieren Token-Namen. Keine Hex-Werte in App-CSS.**

Das Ghost-Theme stellt CSS Custom Properties bereit (z.B. `--fw-color-primary`, `--fw-font-body`, `--fw-space-4`). Apps lesen diese Properties. Wenn ein Token nicht existiert, greift der Fallback-Wert im `var()`.

Was App-CSS definieren **darf:**
- App-spezifische Layout-Regeln (Grid, Flexbox, Abstände)
- App-spezifische Komponenten-Strukturen (Slider-Track, Hero-Number-Box)
- Fallback-Werte für Theme-Tokens

Was App-CSS **nicht** definieren darf:
- Absolut codierte Farben (Hex, RGB, HSL)
- Absolut codierte Schriftfamilien ohne Theme-Bridge-Fallback
- Globale Selektoren ohne `fw-app`-Präfix

**Warum:**  
Konsistenz über 21 Apps. Eine Theme-Änderung (Ghost-Theme-Update) wirkt automatisch auf alle Apps. Apps werden nicht zu visuellen Ausreißern.

**Risiken:**  
- Theme-Bridge ist nur so stark wie das Ghost-Theme, das die Tokens pflegt. Wenn das Theme keine Tokens exportiert, müssen Fallback-Werte alle Design-Entscheidungen abdecken.
- Pilot-1 muss klären, welche Token-Namen tatsächlich aus `screen.css` verfügbar sind.

**Status:** Factory-Standard-Kandidat (abhängig von Ghost-Theme-Token-Inventar)

---

### D5 — Config-Strategie

**Empfohlener Default:**  
**Pilot-1: interne Default-Config in `app.config.json`, kein externes `data-fw-config`.**

Struktur:
1. **Interne Default-Config** (`app.config.json` im App-Ordner) — alle Defaults, Slider-Grenzen, Texte, Berechnungsparameter. Wird beim App-Build eingebunden oder als statische Import-Ressource geladen.
2. **`data-fw-options`-Overrides** — kleine Inline-Überschreibungen für Redakteure (max. 3–4 Keys, Whitelist in APP_SPEC.md).
3. **`data-fw-config`** — externe JSON-Config für spätere Apps mit komplexeren Konfigurationen. **Nicht in Pilot-1.**

**Config-Loading-Reihenfolge:**  
`internal defaults` → `data-fw-options overrides` → (später: `data-fw-config`)

**Cache-Busting:**  
Für `data-fw-config` und `data-fw-data`: expliziter `?v=DATUM`-Parameter. Kein `Date.now()` in Produktion (vgl. APP-INTERFACE.md §9).

**Validierung:**  
Alle Config-Werte werden nach dem Two-Step-Parsing-Prinzip (P-02) validiert. Unbekannte Keys werden ignoriert. Ungültige Werte fallen auf Default zurück — kein Crash.

**Risiken:**  
- `app.config.json` als eingebettete Ressource: Wenn sie serverseitig geladen werden muss (CORS), muss sie auf `finanzwesir.com` liegen. Alternativ: Config direkt in `app.js` als JS-Objekt einbetten (einfacher, keine HTTP-Anfrage).

**Empfehlung für Pilot-1:**  
Config als JS-Konstante direkt in `app.js` einbetten — kein separater HTTP-Request, kein CORS-Problem, keine Cache-Busting-Frage. Erst ab App 2 auslagern, wenn Redakteure Config-Werte editieren müssen.

**Status:**  
- `app.config.json` als Datei: Factory-Standard-Kandidat  
- Config-Inline in `app.js` für Pilot-1: Pilot-1-Arbeitsannahme  
- `data-fw-config` extern: späterer Backlog

---

### D6 — Teststrategie

**Empfohlener Default:**  
**Pilot-1: manuelle Testseite (`app.test.html`) + manueller Testplan. Kein automatisiertes Testing in Pilot-1.**

**Was Pilot-1 braucht:**
- `app.test.html` — lokale Testseite mit allen 4 States (Loading, Content, Error, Empty) und allen Slider-Positionen
- Manueller Testplan (aus `manual-test-plan`-Skill) mit definierten Akzeptanzkriterien
- A11y-Check manuell mit Tastatur + Screen Reader (VoiceOver/NVDA)

**Was später Standard wird:**
- **Playwright** — für Ghost-Embed-Integration-Tests (prüft, ob die App korrekt in einer Ghost-Seite geladen wird). Factory-Standard ab App 3.
- **Vitest** — für Unit-Tests der Berechnungslogik (Strategie-Funktionen). Factory-Standard ab App 2, sobald Calculator-Template extrahiert ist.
- **axe-core** — automatisierter A11y-Check als Teil der Playwright-Suite. Factory-Standard ab App 3.

**Warum kein automatisiertes Testing in Pilot-1:**  
Das Risiko liegt nicht in fehlenden Tests — es liegt darin, Test-Infrastructure vor der ersten App zu bauen. Playwright-Setup, Vitest-Config, CI-Pipeline: Das ist horizontale Arbeit ohne sofortigen Nutzerwert. Der manuelle Testplan für Pilot-1 ist ausreichend und validiert den Workflow.

**Risiken:**  
- Manuelle Tests sind langsamer bei Regressions-Checks. Akzeptabel für Pilot-1, nicht für 21 Apps.
- Vitest kann die Strategie-Funktionen nur testen, wenn sie als pure Functions exportiert sind. Das ist eine Architekturanforderung, die beim Schreiben von `app.js` beachtet werden muss.

**Sicherheitsauswirkung:**  
Neutraler als XSS-Injection-Test manuell durchführbar (lt. APP-INTERFACE.md §7 Testfall).

**Status:**  
- Manuelle Testseite: Factory-Standard-Kandidat (alle Apps)  
- Vitest für Strategie-Funktionen: Factory-Standard ab App 2  
- Playwright für Ghost-Integration: Factory-Standard ab App 3  
- axe-core A11y: Factory-Standard ab App 3

---

### D7 — Code-Ablage / Verzeichnisstruktur

**Empfohlener Default:**  
Bestehende Struktur aus `04_CLAUDE_WORKFLOW_DRAFT.md` §5 ist korrekt und ausreichend. Für Pilot-1 gilt:

```
/Apps/prokrastinations-preis/
  README.md               — Zweck, Funnel-Block, Inputs, Outputs, Annahmen
  APP_SPEC.md             — technische Spezifikation (bereits vorhanden)
  MINI_SPEC_FROM_HAUPTDOKUMENT.md  — (bereits vorhanden)
  app.config.json         — Defaults als strukturierte Datei (oder inline in app.js)
  app.js                  — App-Logik als ES-Modul (kein Shell-Code)
  app.css                 — App-spezifisches CSS mit fw-app-Namespace
  app.test.html           — lokale Testseite (alle 4 States)
  NOTES.md                — Entwicklungsnotizen, offene Fragen
  ghost-card.example.html — Ghost-Card-Beispiel für Redakteur
```

**Was Pilot-1 NICHT anlegen darf:**
- `/src/` und `/dist/` (kein Build-System in Pilot-1)
- `/tests/` als separater Ordner (Tests-Setup nach Pilot-1)
- Globale `/core/` oder `/shared/`-Ordner (nach App 2)
- `/node_modules/` (kein npm in Pilot-1)

**Warum kein `src/dist`-Split:**  
Ohne Bundler gibt es keine dist. `app.js` ist gleichzeitig Source und Output. Dieser Overhead entsteht erst, wenn ein Build-Schritt eingeführt wird.

**Status:** Factory-Standard-Kandidat (Dateistruktur), Pilot-1-Arbeitsannahme (kein src/dist)

---

### D8 — App-Fabrik-Core vs. App-Lokal

**Empfohlener Default:**  
**Pilot-1: alles app-lokal. Kein Core. Extraction nach App 2.**

Was in Pilot-1 app-lokal bleibt:
- Bootstrap-Logik (Ghost-Card lesen, App initialisieren)
- Config-Parsing (Two-Step, P-02)
- AppContext-Befüllung (P-04)
- Renderer
- State-Management (Loading/Content/Error/Empty)
- SafeDOM-Helfer

Was ab App 2 geteilt wird (wenn es in beiden Apps identisch vorkommt):
- Bootstrap-Funktion
- Config-Parser
- SafeDOM-Helfer

**Extraction-Regel:**  
Eine Funktion wandert in den Core, wenn sie in mindestens **zwei verschiedenen Apps** identisch (oder fast identisch) gebraucht wird, und wenn ihre Extraktion die App-Logik nicht aufbläht.

**Wie Copy-Paste-Chaos verhindert wird:**  
Durch den Workflow: `04_CLAUDE_WORKFLOW_DRAFT.md` §5 legt pro App dieselbe Dateistruktur fest. Wenn Claude App 2 implementiert, liest er App 1 als Referenz und extrahiert explizit, was gleich ist. Das ist kontrolliertes Copy-Paste-to-Extract, nicht unkontrolliertes Copy-Paste.

**Zu frühe Abstraktion verhindern:**  
Keine globale Core-Datei anlegen, bevor App 2 existiert. Hypothetische Abstraktion ("das werden alle Apps brauchen") ist ein Architektur-Irrtum bei unbekannten Anforderungen.

**Status:** Factory-Standard-Kandidat (Extraction-Regel), Pilot-1-Arbeitsannahme (alles lokal)

---

### D9 — Deployment in Ghost

**Empfohlener Default:**  
**Ghost Code Injection (Header) für Bootstrapper. Ghost-Upload für App-Skriptdateien.**

**Deployment-Modell:**

1. **Bootstrapper** (1 × global, alle Apps): Kleines Skript in Ghost Code Injection (Header-Bereich in Ghost Admin → Settings → Code Injection). Dieser Bootstrapper sucht alle `.fw-app`-Container auf der Seite, liest den `data-fw-app`-Slug, lädt die entsprechende `app.js` aus dem Ghost-Content-Ordner und initialisiert die App.

   ```html
   <!-- Ghost Code Injection (Header) -->
   <script type="module" src="https://www.finanzwesir.com/content/files/apps/fw-bootstrapper.js"></script>
   ```

2. **App-Dateien** (`app.js`, `app.css`) werden über Ghost Admin → Labs → File Upload (oder Ghost-API) in den Content-Bereich hochgeladen. URL-Muster: `https://www.finanzwesir.com/content/files/apps/prokrastinations-preis/app.js`

3. **Ghost-HTML-Card** (Redakteur): Nur das minimalste `<div>` mit den korrekten Attributen. Der Redakteur muss nie einen Skript-Tag schreiben.

   ```html
   <div class="fw-app" data-fw-app="prokrastinations-preis"></div>
   ```

**Was der Redakteur tun muss:**
- HTML-Card in Ghost-Artikel einfügen
- `data-fw-app`-Slug korrekt setzen
- Optional: `data-fw-options` mit erlaubten Key-Value-Paaren

**Was der Redakteur nicht tun darf/muss:**
- Skript-Tags in Articles einfügen
- App-Dateien kennen oder verwalten
- JSON-Syntax schreiben

**Risiken:**  
- Ghost-Upload-URLs ändern sich bei Ghost-Major-Updates. Lösung: URL-Schema in `01_DECISION_LOG.md` dokumentieren.
- Bootstrapper muss App-Slugs kennen (Whitelist aus Sicherheitsregel §4 APP-INTERFACE.md). Die Whitelist muss bei jeder neuen App aktualisiert werden.
- Ghost Code Injection gilt global (alle Seiten). Bootstrapper lädt nur bei vorhandenen `.fw-app`-Containern — Performance-Impact vernachlässigbar.

**Sicherheitsauswirkung:**  
Der Bootstrapper ist der Perimeter: Er validiert den Slug gegen die Whitelist und verhindert das Laden unbekannter App-Skripte. Kein `eval()`, kein dynamischer Skript-Inject aus Nutzer-Input.

**Ghost-Auswirkung:**  
Sehr gut. Redakteure arbeiten nur mit HTML-Cards. Ghost-Deployment-Modell wird respektiert.

**Auswirkung auf alle Apps:**  
Ein Bootstrapper für alle 21 Apps. Bei neuer App: Whitelist aktualisieren, Dateien hochladen, fertig.

**Status:** Factory-Standard-Kandidat

---

### D10 — Vertical Slicing als Implementierungsstrategie

*(Siehe gesonderter Abschnitt „Vertical-Slicing-Standard" unten)*

**Status:** Factory-Standard-Kandidat

---

### D11 — Erster Implementierungs-Slice

**Empfohlener Default:**  
**Slice 0: App-Shell mit Ghost-Card-Bootstrap, Slug-Prüfung, drei sichtbaren States.**

**Was dieser Slice erzeugt:**
- `app.js` (Grundgerüst: init(), state management, loading/error/empty states)
- `app.css` (fw-app-Namespace, Reset, State-Styling)
- `app.test.html` (alle 3 States sichtbar: loading, error, content placeholder)
- Kein Berechnungslogik. Kein Slider. Keine echte Zahl.

**Was Done bedeutet:**
- Ghost-Card mit `data-fw-app="prokrastinations-preis"` lädt ohne Fehler in `app.test.html`
- Loading-State ist sichtbar (Spinner oder Ladetext)
- Error-State ist sichtbar (deutsche Fehlermeldung, kein Stack-Trace)
- Content-State zeigt statischen Platzhalter (Zahl „0 €", kein Berechnung)
- Tastatur-Navigation landet auf dem Container ohne Fehler
- Kein `innerHTML` für Nutzdaten

**Was draußen bleibt:**
- Alle Berechnungslogik
- Slider
- AppContext
- Styles außer State-Grundlayout
- A11y ARIA Live Region

**Warum:**  
Dieser Slice validiert den kompletten Deployment-Weg. Nach Slice 0 weiß man: Ghost-Card funktioniert, Bootstrap läuft, Error-Handling steht. Alle weiteren Slices bauen auf sicherer Infrastruktur.

**Status:** Pilot-1-Arbeitsannahme

---

## Vertical-Slicing-Standard

### Was ist ein Vertical Slice bei einer Ghost-embedded App?

Ein Vertical Slice ist ein vollständiger, testbarer Durchstich durch **alle relevanten Layer** der App — von der Ghost-Card bis zur sichtbaren UI — der einen messbaren Nutzerwert liefert oder eine klare Infrastruktur-Prämisse validiert.

**Kein Layer darf horizontal aufgebaut werden, bevor ein erster Slice das vertikale Durchstechen zeigt.**

### Welche Layer muss ein Slice mindestens berühren?

| Layer | Beschreibung | Pflicht ab Slice |
|---|---|---|
| Ghost-Card-Vertrag | `fw-app` + `data-fw-app` korrekt gelesen | Slice 0 |
| Bootstrap / init() | App-Initialisierung, Slug-Prüfung | Slice 0 |
| State-Management | Loading / Error / Content / Empty | Slice 0 |
| Config / AppData | Default-Werte geladen und eingefroren (P-01) | Slice 1 |
| Strategie / Berechnung | Fachlogik, AppContext befüllen (P-04) | Slice 1 |
| AppContext | Semantischer Rucksack mit Pflichtfeldern | Slice 1 |
| Renderer | AppContext → DOM (SafeDOM, kein innerHTML) | Slice 1 |
| UI / CSS | Sichtbarer Output, fw-app-Namespace | Slice 0 (States), Slice 1 (Ergebnis) |
| A11y | ARIA Live Region, aria-label, Keyboard | Slice 1 (Summary), Slice 2 (Slider) |
| Test | Akzeptanzkriterien des Slices erfüllt | jeder Slice |

### Wann ist ein Slice fertig?

Ein Slice ist fertig, wenn:
1. Die definierten Akzeptanzkriterien manuell bestätigt sind
2. Albert den Slice freigegeben hat
3. Kein offener Testfall für diesen Slice existiert
4. Der Diff des Slices dokumentiert ist (`/patch-quittung`)

### Wie wird horizontale Vorarbeit verhindert?

- **Kein CSS-System anlegen, bevor Slice 0 steht.** CSS entsteht Slice für Slice, nur was der aktuelle Slice braucht.
- **Kein Renderer schreiben, bevor die Strategie steht.** Kein leeres AppContext-Objekt "vorbereiten".
- **Kein shared Core extrahieren in Pilot-1.** Erst nach App 2.
- **Kein Testplan für Slice N schreiben, bevor Slice N-1 fertig ist.** Pläne veralten.

---

## Empfohlener Slice-Plan für prokrastinations-preis

---

### Slice 0 — App-Shell und Ghost-Card-Bootstrap

**Ziel:** Beweis, dass Ghost-Card-Vertrag funktioniert und States sichtbar sind.

**Nutzerwert:** App lädt stabil, zeigt saubere Lade- und Fehlerzustände. Kein weißer Container, kein Crash.

**Betroffene Layer:** Ghost-Card-Vertrag, Bootstrap/init(), State-Management, CSS (States)

**Dateien:**
- `app.js` (init, State-Maschine, Slug-Prüfung, DOM-Setup)
- `app.css` (fw-app-Namespace, Loading-/Error-/Content-Grundlayout)
- `app.test.html` (alle 3 States parallel testbar)

**Akzeptanzkriterien:**
- [ ] `class="fw-app" data-fw-app="prokrastinations-preis"` lädt ohne Fehler
- [ ] Loading-State sichtbar (mind. 300ms künstlich)
- [ ] Error-State zeigt deutsche Meldung, kein Stack-Trace
- [ ] Content-State zeigt statischen Platzhalter
- [ ] Kein `innerHTML` für Nutzdaten
- [ ] Keyboard-Fokus landet auf App-Container ohne Fehler

**Nicht-Ziele:** Keine Berechnung, kein Slider, kein AppContext, kein echtes Layout.

**Risiken:** Bootstrap-Modell muss mit Ghost's Script-Loading-Verhalten kompatibel sein (defer-Timing prüfen).

---

### Slice 1 — Hauptzahl aus Defaults, AppContext, Hero-Display

**Ziel:** Die Kernaussage der App ist sichtbar und korrekt berechnet.

**Nutzerwert:** Nutzer sieht den prokrastinationsPreis mit Default-Werten. Der "interaktive Beweis" ist real — die Zahl wirkt.

**Betroffene Layer:** Config/AppData (P-01, P-02), Strategie/Berechnung, AppContext (P-04), Renderer (SafeDOM), UI/CSS (Hero-Number), A11y (aria-live, aria-describedby)

**Dateien:**
- `app.js` erweitert: `parseConfig()`, `calculateProkrastinationsPreis()`, `buildAppContext()`, `renderHeroNumber()`
- `app.css` erweitert: Hero-Number-Box, Formatierung
- `app.test.html` aktualisiert: zeigt berechnete Hauptzahl

**Akzeptanzkriterien:**
- [ ] prokrastinationsPreis wird korrekt berechnet (Default-Werte, manuell verifiziert)
- [ ] AppContext enthält `valueMode: 'currency'`, `currency: 'EUR'`, `prokrastinationsPreis`, `a11ySummary`
- [ ] Hero-Zahl wird via `textContent` gesetzt (kein `innerHTML`)
- [ ] `aria-live="polite"` Region vorhanden
- [ ] `a11ySummary` wird von Screen Reader vorgelesen (manuell geprüft)
- [ ] AppData ist eingefroren (Object.freeze, P-01)

**Nicht-Ziele:** Kein Slider, keine Interaktivität, keine Nebenwerte.

**Risiken:** Berechnungsformel muss mit APP_SPEC exakt übereinstimmen. Floating-Point-Präzision bei Currency-Werten beachten.

---

### Slice 2 — Wartezeit-Slider als primärer interaktiver Beweis

**Ziel:** Der Nutzer kann die Wartezeit verändern und sieht sofort den Preis der Prokrastination.

**Nutzerwert:** Die Kerninteraktion der App. "Warten ist nicht neutral" wird erlebbar.

**Betroffene Layer:** Slider-Komponente, Event-Handling, Neuberechnung, AppContext-Update, Renderer-Update, A11y (aria-label, aria-valuemin, aria-valuemax, aria-valuenow)

**Dateien:**
- `app.js` erweitert: Slider-Event-Listener, Neuberechnung auf Input
- `app.css` erweitert: Slider-Styling (fw-app__slider)
- `app.test.html` aktualisiert: Slider bedienbar

**Akzeptanzkriterien:**
- [ ] Slider ändert prokrastinationsPreis in Echtzeit (kein Lag > 50ms)
- [ ] Alle ARIA-Attribute korrekt (aria-label, aria-valuemin, aria-valuemax, aria-valuenow)
- [ ] Tastatur-Bedienung (Pfeiltasten) funktioniert
- [ ] Live-Region wird bei jeder Neuberechnung aktualisiert
- [ ] Slider-Grenzen aus APP_SPEC: Min/Max aus Config, kein Hardcoding
- [ ] `prefers-reduced-motion` beachtet (keine Animation bei Slider-Bewegung wenn gesetzt)

**Nicht-Ziele:** Kein zweiter Slider, keine Nebenwerte.

**Risiken:** Slider-Performance bei sehr schneller Bewegung (debounce/requestAnimationFrame prüfen).

---

### Slice 3 — Monatsrate und Anlagedauer

**Ziel:** Die zwei weiteren Eingabeparameter sind interaktiv.

**Nutzerwert:** Nutzer kann seinen eigenen Sparplan spiegeln.

**Betroffene Layer:** Zwei weitere Slider/Inputs, erweiterte Berechnung, AppContext-Erweiterung

**Dateien:** `app.js` und `app.css` erweitert

**Akzeptanzkriterien:**
- [ ] Monatsrate und Anlagedauer änderbar
- [ ] prokrastinationsPreis reagiert korrekt auf alle drei Inputs
- [ ] Alle ARIA-Attribute vollständig
- [ ] Config-Whitelist für data-fw-options: `defaultRate`, `years` (aus APP_SPEC)

**Nicht-Ziele:** AssumptionsBox, Vergleichsanker.

---

### Slice 4 — AssumptionsBox mit Renditeannahme

**Ziel:** Die Annahme hinter der Berechnung ist dauerhaft sichtbar.

**Nutzerwert:** Transparenz. Nutzer versteht, was die Zahl bedeutet und worauf sie basiert.

**Betroffene Layer:** AssumptionsBox-Renderer, A11y (semantisches `<details>` oder statisch)

**Dateien:** `app.js` und `app.css` erweitert

**Akzeptanzkriterien:**
- [ ] Renditeannahme dauerhaft sichtbar (nicht nur on-hover)
- [ ] Kein Rendite-Slider (explizit nicht in Pilot-1 laut APP_SPEC)
- [ ] Text via `textContent` gesetzt

---

### Slice 5 — Nebenwerte und optionaler Vergleichsanker

**Ziel:** Kontextinformationen runden den Beweis ab.

**Nutzerwert:** Einordnung der Hauptzahl. "Was ist 47.000 € wirklich?"

**Betroffene Layer:** Erweiterte AppContext-Felder, Renderer für Sekundär-Output

**Dateien:** `app.js` und `app.css` erweitert

**Akzeptanzkriterien:**
- [ ] Nebenwerte (aus APP_SPEC) korrekt berechnet und angezeigt
- [ ] Vergleichsanker nur wenn in data-fw-options gesetzt (optionale Feature)
- [ ] Semantisch korrekte Markup-Struktur

---

### Slice 6 — Responsive & A11y-Härtung

**Ziel:** App funktioniert auf allen Viewports und mit assistiven Technologien.

**Nutzerwert:** Niemand ist ausgeschlossen.

**Betroffene Layer:** CSS Responsive Breakpoints, vollständiger A11y-Audit

**Dateien:** `app.css` finalisiert

**Akzeptanzkriterien:**
- [ ] 375px (Mobile), 768px (Tablet), 1280px (Desktop) — alle States visuell geprüft
- [ ] WCAG AA Kontrast für alle Texte (manuell + Browser DevTools)
- [ ] Screen-Reader-Durchgang: VoiceOver (macOS) oder NVDA (Windows)
- [ ] Tastatur-Komplettdurchgang ohne Maus
- [ ] `prefers-reduced-motion`: alle Transitionen deaktiviert

---

### Slice 7 — Ghost-Integration, Testseite, manuelle QA

**Ziel:** App läuft in echter Ghost-Umgebung. Testplan abgeschlossen.

**Nutzerwert:** Release-Readiness bewiesen.

**Betroffene Layer:** Ghost-Deployment, Bootstrapper-Integration, manueller Testplan

**Dateien:**
- `ghost-card.example.html` finalisiert
- `NOTES.md` mit Deployment-Notizen
- `manual-test-plan` (Skill-Output) dokumentiert

**Akzeptanzkriterien:**
- [ ] Ghost-Card in Test-Ghost-Instanz lädt App korrekt
- [ ] Alle Testfälle aus APP_SPEC §Testfälle durchgeführt und bestätigt
- [ ] XSS-Versuch in data-fw-options: keine Ausführung
- [ ] Fehlende/ungültige URL in data-fw-data: Error-State, kein Crash
- [ ] Albert hat manuell getestet und freigegeben

---

## Was Albert wirklich entscheiden muss

Diese Fragen sind Prinzipienentscheidungen, keine Technik-Rätsel:

**1. Wann ist Pilot-1 fertig?**  
Nach Slice 7 oder nach Slice 4 ("minimal viable interaktiver Beweis")? Empfehlung: Slice 4 als Pilot-1-MVP, Slice 5–7 als Pilot-1-Completion. Albert entscheidet, wann er "genug gelernt hat, um App 2 zu starten."

**2. Darf der Bootstrapper in Ghost Code Injection global laufen?**  
Das bedeutet: Ein kleines Skript läuft auf jeder Finanzwesir-Seite, auch wo keine App eingebettet ist. Impact ist minimal (der Bootstrapper tut nichts ohne `.fw-app`-Container). Albert muss das Deployment-Modell einmal bestätigen.

**3. Wann wird der Calculator-Template extrahiert?**  
Nach Pilot-1 (prokrastinations-preis) oder nach Pilot-2 (risiko-uebersetzer)? Empfehlung: nach Pilot-2, weil erst dann klar ist, was wirklich geteilt wird. Albert entscheidet, wann er bereit ist, den Workflow zu unterbrechen für Extraktion.

**4. Welche Ghost-Token-Namen existieren im Theme?**  
Das ist eine faktische Frage, die Albert klären oder bestätigen muss: Exportiert `screen.css` Custom Properties mit `--fw-`-Präfix? Wenn ja: welche? Das blockiert D3/D4 (CSS-Strategie, Theme-Bridge).

---

## Was Claude / Entwickler fachlich entscheiden kann

Diese Entscheidungen belasten Albert nicht:

- Welche JS-Patterns für Event-Delegation und Neuberechnung verwendet werden
- Wie `Object.freeze` auf AppData angewendet wird (P-01)
- Welche CSS-Klassen im `fw-app`-Namespace verwendet werden (Naming-Convention)
- Wie `textContent` vs. `createTextNode` in SafeDOM implementiert wird
- Wie die Berechnungsformel für prokrastinationsPreis in JS übersetzt wird
- Welche Debounce-Strategie für Slider-Events optimal ist
- Wie `aria-live` und `aria-describedby` verdrahtet werden
- Welche Fallback-Werte für fehlende Theme-Tokens verwendet werden
- Wie `app.test.html` alle States parallel zeigt (CSS-Grid oder Tabs)
- Wie der Bootstrapper den Slug gegen die Whitelist prüft
- Wie `?v=DATUM` Cache-Busting in URLs eingebettet wird

---

## Offene Blocker vor Code

Nur echte Blocker — Dinge, die Slice-0-Start verhindern:

**B1: Ghost-Theme-Token-Inventar fehlt.**  
Welche CSS Custom Properties exportiert `screen.css`? Ohne diese Antwort müssen alle Design-Entscheidungen mit Fallback-Werten abgesichert werden. Das ist lösbar, aber besser vorher geklärt.  
→ Albert prüft `screen.css` oder bestätigt: "Fallback-Werte genügen für Pilot-1."

**B2: Ghost-Upload-URL-Schema unklar.**  
Wo genau liegen hochgeladene Dateien auf `finanzwesir.com`? Ist `/content/files/apps/` ein valider Pfad?  
→ Albert bestätigt URL-Muster oder testet mit einer Test-Datei.

**B3: Bootstrapper-Strategie noch nicht entschieden.**  
Soll ein globaler Bootstrapper in Code Injection eingebunden werden, oder lädt jede Ghost-Card ihren eigenen Bootstrap? Diese Entscheidung betrifft alle 21 Apps und muss vor Slice 0 geklärt sein.  
→ Empfehlung: globaler Bootstrapper (einmal deployen, alle Apps). Albert bestätigt.

---

## Nicht-Blocker

Diese Dinge können nach Pilot-1 geklärt werden:

- Vitest-Konfiguration und automatisierte Tests
- Playwright-Integration-Tests für Ghost
- axe-core A11y-Automation
- Redakteurs-Cheat-Sheet für fw-apps (BACKLOG AF-05)
- AUTHOR_GUIDE-v3.md Harmonisierung (BACKLOG AF-04)
- ChartAdapter/API-Definition (intern)
- Core-Extraktion und Shared-Module
- data-fw-config für externe JSON-Konfigurationen
- data-fw-theme Implementierung
- app.config.json als separate Datei vs. inline
- Rollup/Vite als optionaler Build-Step
- TypeScript-Migration

---

## Empfehlung

**Ja, daraus soll eine zentrale Spec entstehen.**

**Empfohlener Zielort:** `docs/spec/APP-FACTORY-IMPLEMENTATION-STANDARD.md`

**Inhalt dieser Spec:**
- Die 9 Entscheidungen aus diesem Review (D1–D9) in Bindend/Arbeitsannahme-Status
- Slice-Definitionen und Slice-Fertig-Kriterien
- Deployment-Modell (Bootstrapper, Ghost Code Injection, Upload-URLs)
- CSS-Namespace-Regeln
- SafeDOM-Regeln
- Config-Loading-Reihenfolge

**Zeitpunkt:** Diese Spec nicht jetzt vollständig schreiben. Erst Pilot-1 durchführen, dann die Spec aus den bestätigten Entscheidungen erzeugen. Die Factory-Standard-Kandidaten aus diesem Review werden zu bindenden Entscheidungen; die Pilot-1-Arbeitsannahmen werden entweder bestätigt oder korrigiert.

**Prozess:**
1. Albert bestätigt die 3 Blocker (B1–B3)
2. Slice 0 implementieren
3. Nach Pilot-1-Abschluss: `/abschluss-ritual` ausführen
4. `01_DECISION_LOG.md` mit bestätigten Entscheidungen aktualisieren
5. `docs/spec/APP-FACTORY-IMPLEMENTATION-STANDARD.md` aus diesem Review + Pilot-Erkenntnissen erstellen

---

*Ende des Reviews — Version 1.0 — Erstellt: 2026-05-10*
