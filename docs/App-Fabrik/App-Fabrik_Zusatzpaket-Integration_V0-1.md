# App-Fabrik — Bewertung des Zusatzpakets und Integration in den Workflow

> **Status: HISTORISCH — Empfehlungen umgesetzt, Pfadverweise veraltet** (Statuskopf ergänzt 2026-07-12, Konsolidierung)
> Die Kernempfehlungen dieses Dokuments (State-Modell, App-Shell, SafeDOM, Whitelist, UI-Primitiven-Inventar,
> `fw-*`-Konventionen) sind in `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md` und
> `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` eingeflossen — dort steht die lebende Fassung.
> Pfadverweise auf `docs/design-system/templates/` bzw. `spec/06-INTERAKTION.md` zeigen ins Archiv
> (`Archiv/design-system-2026-05/`); die erwähnte `fw-app-template-demo.html` wurde nie gebaut.
> Nicht als Quelle für Klassen, Farben oder Pfade verwenden.

**Version:** V0.1  
**Datum:** 2026-05-09  
**Quelle:** `finanzwesir-app-fabrik-2026-05-09.zip`  
**Einordnung:** Konstruktiver Vorschlag, nicht bindend. Das Paket wird als ernstzunehmende Unterstützung geprüft, aber nicht 1:1 als Produktionsstandard übernommen.

---

## 1. Executive Summary

Das Zusatzpaket ist **nützlich**, aber nicht als fertiger Produktionsstandard. Es ist am stärksten als **Demo-Template / Golden-Path-Prototyp**: Es zeigt sichtbar, wie eine App aussehen und sich verhalten könnte, und macht mehrere bisher abstrakte Anforderungen greifbar.

Wir sollten daraus übernehmen:

1. **State-Modell:** Loading → Content → Error.
2. **App-Shell-Idee:** Gemeinsame Shell, App-spezifische Logik separat.
3. **Whitelist-Prinzip für Optionen:** Unbekannte Optionen werden ignoriert.
4. **SafeDOM-Regel:** Nutzdaten nie via `innerHTML`.
5. **UI-Primitiven-Inventar:** Range-Buttons, KPI-Karten, Slider, CTA, Skeleton, Error-State.
6. **Namenskonventionen:** `fw-*`, Slugs, klare JS-/CSS-Konventionen.
7. **Template als UX-/Design-Labor:** Hilfreich, um Eingabeelemente und App-Bausteine sichtbar zu prüfen.

Wir sollten **nicht** 1:1 übernehmen:

1. Globales `window.FwAppInit` und `window.FW_APP_OPTIONS_WHITELIST`.
2. `document.querySelector('.fw-app')` für nur eine App.
3. Kopieren kompletter HTML-Templates pro App als Produktionsweg.
4. Tailwind CDN im Produktivbetrieb.
5. `FW_THEME_OVERRIDE`, weil die CSS-Variables-Bridge im aktuellen Repo bereits in `FwTheme.js` implementiert ist.
6. Inline-JSON als primäre Redakteurs-Schnittstelle.
7. Eine starre Regel „nur diese UI-Elemente sind erlaubt“ ohne Erweiterungsprozess.

Kurz: **Idee übernehmen, Implementierung härten.**

---

## 2. Richtige Einordnung des Demo-Templates

Dein Hinweis ist entscheidend: Das Template will kein Produktionsframework sein. Es will ein Demo-Template sein. Dann ist die faire Bewertung:

**Gut als:**

- visuelle Referenz,
- UI-Baukasten-Skizze,
- Demonstrator für State-Handling,
- Diskussionsgrundlage für Design-System-Lücken,
- Einstiegspunkt für die erste App-Familie,
- Testbett für Slider, KPI-Karten, Range-Buttons, CTA und Error-State.

**Nicht gut als:**

- endgültige Runtime-Architektur,
- Kopiervorlage für 21 produktive HTML-Dateien,
- globale JavaScript-API,
- Multi-App-fähiger Bootstrapper,
- finale Ghost-Card-Schnittstelle.

Daraus folgt: Das Template sollte im Repo nicht unter `Theme/assets/js/` oder als produktiver App-Code landen, sondern zuerst unter:

```text

docs/design-system/templates/fw-app-template-demo.html
```

Oder:

```text

docs/app-factory/demos/fw-app-template-demo.html
```

Damit ist klar: **Referenz und Labor, nicht Produktivcode.**

---

## 3. Was wir konkret übernehmen sollten

### 3.1 State-Modell übernehmen

Das Paket definiert drei Pflichtzustände:

```text
Loading → Content | Error
```

Das passt sehr gut zur vorhandenen Chart-Engine-Logik: Auch dort ist pro Container eine Error Boundary vorgesehen, sodass ein fehlerhafter Chart nicht die ganze Seite zerstört.

**Übernahme:** Ja, als App-Fabrik-Standard.

**Zielstandard:**

```text
Jede App muss haben:
- Loading-State oder Skeleton
- Content-State
- Error-State
- leeren / ungültigen Datenzustand
- keine technischen Stacktraces für Endnutzer
```

**Einbauort:**

```text

docs/spec/APP-FACTORY-STANDARD.md
```

Abschnitt:

```text
4. Runtime States und Fehlerverhalten
```

---

### 3.2 App-Shell-Idee übernehmen, aber anders implementieren

Die Grundidee ist richtig:

```text
Gemeinsame Shell macht:
- Container finden
- Konfiguration lesen
- Daten laden
- States verwalten
- sichere DOM-Helfer bereitstellen

App-spezifische Datei macht nur:
- Fachlogik
- Interaktionen
- konkrete Ausgabe
```

Das ist genau App-Fabrik-Denken.

Aber die Demo-Implementierung nutzt globale Namen:

```javascript
window.FW_APP_OPTIONS_WHITELIST
window.FwAppInit
window.FwApp
```

Das ist als Demo okay, aber produktiv riskant, weil mehrere Apps auf einer Seite kollidieren können.

**Produktionsstandard sollte stattdessen sein:**

```javascript
// Theme/assets/js/fw-app-factory/AppRegistry.js
AppRegistry.register('prokrastinations-preis', ProkrastinationsPreisApp);
```

Oder mit ES-Modulen:

```javascript
export const appDefinition = {
  slug: 'prokrastinations-preis',
  optionsWhitelist: ['startDelay', 'monthlyRate'],
  async init(ctx) { ... }
};
```

**Übernahme:** Ja, aber nur als Architekturprinzip, nicht als globale Window-API.

**Einbauort:**

```text
Theme/assets/js/fw-app-factory/
  AppBootstrapper.js
  AppRegistry.js
  ConfigReader.js
  DataLoader.js
  DomScope.js
  StateController.js
```

---

### 3.3 Whitelist-Prinzip übernehmen

Das Paket übernimmt den Gedanken, dass `data-options` nur bekannte Keys akzeptieren darf. Das passt exakt zum bestehenden `APP-INTERFACE.md`.

**Übernahme:** Ja.

**Aber:** Nicht jede Konfiguration sollte inline in `data-options` stehen. Für Redakteure ist JSON in HTML fehleranfällig. Deshalb:

```text
CSV = tabellarische Daten
JSON = strukturierte App-Konfiguration
Inline data-options = nur kleine, menschlich lesbare Overrides
```

Empfohlener Vertrag:

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis"
     data-fw-data="https://www.finanzwesir.com/content/files/prokrastinations-preis.csv?v=2026-05"
     data-fw-config="https://www.finanzwesir.com/content/files/prokrastinations-preis.config.json?v=2026-05"
     data-fw-options="range:20y, showCta:true">
</div>
```

Wichtig: Der Redakteur muss JSON nicht manuell im Ghost-HTML pflegen. Wenn JSON gebraucht wird, sollte es als Datei vorliegen und von Claude/Entwicklung gepflegt werden.

---

### 3.4 UI-Primitiven übernehmen, aber als erlaubte V0.1-Liste

Das Paket listet sinnvolle App-Bausteine:

- App-Header,
- Range-Buttons,
- Chart-Canvas,
- KPI-Cards,
- Slider,
- Loading/Error-States,
- CTA.

Das ist ein guter Start.

**Aber:** Die Formulierung „nur diese Komponenten, alles andere verboten“ ist für 21 Apps zu hart. Es gibt bereits absehbar weitere Eingaben:

- Select,
- Radio,
- Checkbox,
- Number-Input,
- Text-Input,
- Toggle,
- Accordion,
- Detail-Tabelle.

**Übernahme:** Ja, als `Approved UI Primitives V0.1`.

**Ergänzung:** Es braucht einen Erweiterungsprozess:

```text
Neue UI-Komponente nur erlaubt, wenn:
1. mindestens zwei Apps sie wahrscheinlich brauchen,
2. sie ins Design-System aufgenommen wird,
3. sie A11y-Regeln erfüllt,
4. sie im Demo-Template sichtbar getestet wird,
5. sie dokumentiert wird.
```

**Einbauort:**

```text
docs/spec/APP-FACTORY-STANDARD.md

docs/design-system/spec/06-INTERAKTION.md
```

---

### 3.5 Demo als Design-System-Testlabor übernehmen

Das Paket macht eine wichtige Lücke sichtbar: Eingabeelemente wie Checkbox, Radio, Select und Text-/Zahl-Input sind noch nicht sauber im Design-System definiert.

Das ist wertvoll.

**Übernahme:** Ja.

**Einbau:**

```text
docs/design-system/templates/fw-app-template-demo.html
```

Diese Datei sollte künftig bewusst zeigen:

- alle freigegebenen App-Komponenten,
- alle noch ungeklärten Komponenten,
- Mobile/Tablet/Desktop-Verhalten,
- Empty State,
- Error State,
- Loading State,
- reduzierte Bewegung bei `prefers-reduced-motion`.

Das Demo-Template wird damit ein **Design-System-Prüfstand**.

---

### 3.6 Namenskonventionen übernehmen

Die vorgeschlagenen Konventionen sind vernünftig:

```text
CSS: fw-[komponente]
JS: camelCase, PascalCase, SCREAMING_SNAKE
Dateien: [slug].js, [slug].csv, [slug].config.json
```

**Übernahme:** Ja.

**Aber ergänzen:** IDs wie `fw-kpi-1` dürfen in produktivem Code nicht global sein, wenn mehrere Apps auf einer Seite möglich sind. Produktiv muss alles relativ zum App-Root gesucht werden:

```javascript
ctx.root.querySelector('[data-fw-kpi="delay-cost"]')
```

Statt:

```javascript
document.getElementById('fw-kpi-1')
```

**Standard:** Keine globalen IDs innerhalb wiederholbarer App-Komponenten, außer sie werden pro Instanz eindeutig erzeugt.

---

## 4. Was wir nicht übernehmen sollten

### 4.1 `FW_THEME_OVERRIDE` nicht übernehmen

Das Paket schlägt eine Übergangs-Bridge vor:

```javascript
window.FW_THEME_OVERRIDE
```

Im aktuellen Repo ist `FwTheme.js` aber bereits als `V5.0.0 (CSS-VARIABLES BRIDGE — KDR-14)` implementiert und liest CSS Custom Properties aus `:root`. Das passt zum vorhandenen `screen.css`, in dem die CI-Tokens zentral unter `:root` definiert sind.

**Entscheidung:** Nicht übernehmen.

**Stattdessen:** App-Fabrik nutzt dieselbe Theme-Bridge wie die Chart-Engine:

```text
Design-Hoheit liegt bei screen.css / CSS Custom Properties.
JavaScript liest Tokens, hardcodet sie aber nicht als primäre Wahrheit.
```

---

### 4.2 Tailwind CDN nicht als Produktionsstandard übernehmen

Für ein Demo-Template ist Tailwind CDN okay. Für Ghost-Produktion ist es nicht ideal:

- externe Abhängigkeit,
- DSGVO-/Performance-Fragen,
- abweichend vom Theme-Build,
- schwer kontrollierbar.

**Entscheidung:** Nicht als Produktionsstandard übernehmen.

**Stattdessen:**

```text
Produktion: Theme-CSS / Build-Pipeline / lokale Assets.
Demo: CDN erlaubt, aber klar als Demo markiert.
```

---

### 4.3 Script pro App in der Ghost-Card nur als Übergang

Das Paket schlägt vor:

```html
<div class="fw-app" data-type="APP-SLUG"></div>
<script src="{{asset "js/fw-apps/APP-SLUG.js"}}" defer></script>
```

Das ist verständlich und für erste Tests brauchbar. Für die Fabrik ist aber besser:

```html
<div class="fw-app" data-fw-app="prokrastinations-preis" ...></div>
```

Und das Theme lädt einmal:

```html
<script type="module" src="{{asset "js/fw-app-factory/index.js"}}"></script>
```

Der Bootstrapper lädt dann die passende App anhand von `data-fw-app`.

**Vorteil:**

- Ghost-HTML-Cards bleiben einfacher,
- keine Script-Reihenfolge pro App,
- keine doppelten Globals,
- mehrere Apps pro Seite werden möglich,
- einheitliches Error-Handling.

---

### 4.4 `data-type` nicht weiter ausbauen

Für Charts ist `data-type="line"` sinnvoll. Für Apps ist `data-type="APP-SLUG"` begrifflich unsauber.

**Besser:**

```html
data-fw-app="prokrastinations-preis"
data-fw-family="calculator"
```

Oder `data-fw-family` wird gar nicht im HTML gebraucht, weil die Registry es kennt.

---

### 4.5 Globale IDs vermeiden

Das Demo nutzt IDs wie:

```html
id="fw-kpi-1"
id="fw-chart"
id="fw-slider-input"
```

Für ein einzelnes Demo okay. Produktiv gefährlich, wenn zwei Apps auf einer Seite stehen.

**Produktionsregel:**

- keine globalen IDs als App-API,
- alle Selektoren relativ zum App-Root,
- App-Kontext `ctx.root`,
- Elemente über `data-fw-role` oder `data-fw-kpi` finden.

Beispiel:

```html
<div data-fw-role="chart"></div>
<div data-fw-kpi="delay-cost"></div>
```

---

## 5. Wie die Dokumente in unseren Workflow passen

### 5.1 `README.md` aus dem Paket

**Rolle:** Übergabe-/Kontextdokument.

**Einbau:** Nicht als Spec, sondern als Grundlage für ein kurzes internes Memo:

```text
docs/app-factory/notes/2026-05-09_demo-template-review.md
```

**Verwendung:** Hilft zu verstehen, warum das Demo-Template existiert und welche Probleme es sichtbar macht.

---

### 5.2 `APP-ARCHITEKTUR.md` aus dem Paket

**Rolle:** Guter Architekturvorschlag, aber zu absolut formuliert.

**Einbau:** Nicht als `Binding Reference` übernehmen, sondern in eine kuratierte Ziel-Spec überführen:

```text
docs/spec/APP-FACTORY-STANDARD.md
```

Dabei werden übernommen:

- Schichtenidee,
- Dateistruktur-Idee,
- State-Regeln,
- UI-Primitiven,
- Namenskonventionen,
- Whitelist-Prinzip,
- Prozess „neue App bauen“.

Korrigiert werden:

- keine globale Window-API,
- kein `FW_THEME_OVERRIDE`,
- kein Tailwind CDN als Produktion,
- keine globale `document.querySelector`-Logik,
- kein produktives Kopieren kompletter HTML-Dateien,
- kein `data-type` als App-Slug.

---

### 5.3 `fw-app-template.html`

**Rolle:** Demo, Prüflabor, visuelle Referenz.

**Einbau:**

```text
docs/design-system/templates/fw-app-template-demo.html
```

**Nicht:**

```text
Theme/assets/... als produktive App-Shell
```

**Nutzen im Workflow:**

- bei Design-System-Änderungen öffnen,
- neue UI-Komponenten dort testen,
- Mobile/Tablet/Desktop prüfen,
- Entwickler/Claude zeigen, was „Finanzwesir-App“ visuell bedeutet.

---

### 5.4 `fw-apps/_template.js`

**Rolle:** Gute Denkschablone für app-spezifische Logik.

**Einbau:** Ja, aber refaktoriert.

Aus:

```javascript
window.FW_APP_OPTIONS_WHITELIST = [...];
window.FwAppInit = async function (...) { ... };
```

Wird:

```javascript
export default {
  slug: 'APP-SLUG',
  family: 'calculator',
  optionsWhitelist: [...],
  async init(ctx) { ... }
};
```

Oder:

```javascript
AppRegistry.register('APP-SLUG', {
  family: 'calculator',
  optionsWhitelist: [...],
  async init(ctx) { ... }
});
```

**Einbauort:**

```text
Theme/assets/js/fw-apps/_template.js
```

Aber erst nach Refactoring auf die spätere AppFactory-API.

---

## 6. Zielarchitektur nach Integration

Empfohlene Struktur:

```text
Theme/assets/js/
├── fw-chart-engine/
│   └── ... bestehend
├── fw-app-factory/
│   ├── index.js
│   ├── AppBootstrapper.js
│   ├── AppRegistry.js
│   ├── ConfigReader.js
│   ├── DataLoader.js
│   ├── StateController.js
│   ├── SafeDom.js
│   ├── FormatUtils.js
│   └── families/
│       ├── CalculatorShell.js
│       ├── ScenarioShell.js
│       ├── DiagnosticShell.js
│       ├── ExplorerShell.js
│       └── DashboardShell.js
└── fw-apps/
    ├── _template.js
    ├── prokrastinations-preis.js
    ├── risiko-uebersetzer.js
    └── etf-namensdecoder.js
```

Dokumentation:

```text
docs/spec/
├── APP-INTERFACE.md
├── APP-FACTORY-STANDARD.md
└── ARCHITECTURE STRATEGY PAPER VX.md

docs/design-system/templates/
└── fw-app-template-demo.html

docs/app-factory/
├── produktlandkarte-v0-2.md
├── app-family-matrix.md
└── notes/
    └── 2026-05-09_demo-template-review.md
```

---

## 7. Empfohlener Ghost-HTML-Card-Vertrag

Für Redakteure sollte die HTML-Card möglichst einfach bleiben.

### Für einfache datenlose Apps

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis"
     data-fw-options="monthlyRate:300, years:30">
</div>
```

### Für datengetriebene Apps

```html
<div class="fw-app"
     data-fw-app="rendite-kalibrierung"
     data-fw-data="https://www.finanzwesir.com/content/files/rendite.csv?v=2026-05"
     data-fw-options="range:20y">
</div>
```

### Für komplex konfigurierte Apps

```html
<div class="fw-app"
     data-fw-app="regulatorik-dashboard"
     data-fw-config="https://www.finanzwesir.com/content/files/regulatorik.config.json?v=2026-05"
     data-fw-data="https://www.finanzwesir.com/content/files/regulatorik.csv?v=2026-05">
</div>
```

**Regel:** Der Redakteur soll möglichst keine komplexen JSON-Blöcke direkt in Ghost schreiben müssen.

---

## 8. Workflow-Integration mit Claude

Das Zusatzpaket passt sehr gut in den vorhandenen Claude-Workflow, aber nicht als neuer Skill-Wildwuchs.

### Bestehende Skills nutzen

| Phase | Bestehender Skill / Command | Rolle |
|---|---|---|
| Projektstart | `/start` | Projektzustand laden |
| Neue App-Aufgabe | `/intake` | Arbeitspaket erfassen |
| Briefing prüfen | `01-process-extreme-ownership` | Lücken im App-Briefing finden |
| Architektur klären | `spec-mode-architecture` | App-Familie, Daten, Shell, Schnittstellen |
| Vor Code | `/pre-code-gate full` | Sicherheits-/Regressionstor |
| Umsetzung planen | `impl-mode-workpackages` | Arbeitspakete schneiden |
| Code prüfen | `code-quality-faang-review` | Qualitätsgate |
| Testplan | `manual-test-plan` | Manuelle Tests definieren |
| Abschluss | `patch-quittung`, `abschluss-ritual` | Änderung dokumentieren |

### Neuer Command statt neuer Skill

Empfohlen ist ein neuer orchestrierender Command:

```text
.claude/commands/app-factory-spec.md
```

Dieser Command sollte vorhandene Skills in Reihenfolge aufrufen:

```text
1. App aus Produktlandkarte identifizieren
2. App-Familie bestimmen
3. Briefing gegen Mini-App-Briefing prüfen
4. Datenmodell klären: keine Daten / CSV / JSON / CSV+JSON
5. UI-Primitiven auswählen
6. Ghost-Card-Vertrag erzeugen
7. Factory-Lücken benennen
8. Abnahmefragen stellen
```

Danach:

```text
.claude/commands/app-factory-build.md
```

Dieser Command darf erst nach Spezifikationsabnahme und `/pre-code-gate full` arbeiten.

---

## 9. Konkreter Integrationsplan

### Schritt 1 — Zusatzpaket ins Repo einordnen, aber nicht produktiv aktivieren

```text
docs/app-factory/inbox/finanzwesir-app-fabrik-2026-05-09/
```

Oder nur die kuratierte Bewertung behalten:

```text
docs/app-factory/notes/2026-05-09_demo-template-review.md
```

### Schritt 2 — Demo-Template verschieben

```text
fw-app-template.html
→ docs/design-system/templates/fw-app-template-demo.html
```

### Schritt 3 — APP-FACTORY-STANDARD.md erstellen

Aus folgenden Quellen synthetisieren:

- bestehendes `APP-INTERFACE.md`,
- Produktlandkarte V0.2,
- Chart-Engine-Architektur,
- `screen.css` Tokens,
- Zusatzpaket `APP-ARCHITEKTUR.md`,
- Demo-Template-Erkenntnisse.

### Schritt 4 — AppFactory-Runtime entwerfen, nicht sofort voll bauen

Zuerst Spec:

```text
Theme/assets/js/fw-app-factory/index.js
```

Dann Pilot.

### Schritt 5 — Erste Pilot-App bauen

Nicht Regulatorik-Dashboard. Besser:

```text
1. Prokrastinations-Preis
2. Risiko-Übersetzer
3. ETF-Namensdecoder
```

Der Grund: Diese Apps erzeugen echte Fabrikmuster, ohne sofort Dashboard-Komplexität zu erzwingen.

---

## 10. Wichtigste Entscheidungen

### Entscheidung 1: Template ist Demo, nicht Produktion

**Beschlussvorschlag:** Ja.

### Entscheidung 2: Gemeinsame App-Shell wird produktiver Standard

**Beschlussvorschlag:** Ja.

### Entscheidung 3: Keine globalen App-Initialisierer

**Beschlussvorschlag:** Ja.

### Entscheidung 4: CSV für Daten, JSON für strukturierte Konfig, Inline-Options nur klein

**Beschlussvorschlag:** Ja.

### Entscheidung 5: KDR-14 nicht über `FW_THEME_OVERRIDE`, sondern über vorhandene CSS-Variables-Bridge

**Beschlussvorschlag:** Ja.

### Entscheidung 6: UI-Primitiven-Liste als V0.1 übernehmen, aber mit Erweiterungsprozess

**Beschlussvorschlag:** Ja.

---

## 11. Kurzfazit

Das Zusatzpaket ist wertvoll, weil es die App-Fabrik konkret macht. Es löst nicht die Produktionsarchitektur, aber es zeigt sehr gut, welche Bausteine jede App braucht.

Die richtige Integration lautet:

```text
Demo-Template als visuelles Labor behalten.
APP-ARCHITEKTUR als RFC ausschlachten.
State-, Shell-, Whitelist-, UI- und Naming-Ideen übernehmen.
Globale Demo-Mechanik durch robuste AppFactory ersetzen.
Workflow über bestehende Claude-Commands/Skills orchestrieren.
```

Damit wird das Paket nicht verworfen, aber auch nicht unkritisch zum Fundament erklärt. Es wird genau dort eingesetzt, wo es stark ist: als Anschauungs-, Prüf- und Standardisierungswerkzeug.
