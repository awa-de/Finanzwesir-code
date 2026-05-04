# Security-Audit: Finanzwesir Chart Engine
Stand: 2026-05-03 08:02 | Session: A7-Stand-Datum | Geändert von: Claude

**Datum:** 2026-02-16
**Version:** 1.0
**Scope:** `assets/js/fw-chart-engine/` — 17 Dateien, ~3.500 Zeilen JavaScript
**Methodik:** Manuelles Code-Review + Vier-Methoden-Bewertung (Mainstream, Via Negativa, Occam, Devil's Advocate)
**Constraint:** Analyse und Empfehlungen — kein Code.

---

## Executive Summary (5 Sätze für den Blog-Betreiber)

Die Finanzwesir Chart Engine hat **keine kritischen Sicherheitslücken**. Die Architektur — insbesondere das Gatekeeper-Pattern in Layer 1, Deep Freeze auf allen Datenobjekten, und die konsequente Nutzung von `innerText`/`textContent` statt `innerHTML` für Datenausgabe — ist für eine Client-Side Content-Engine **überdurchschnittlich sicher**. Die einzige reale Angriffsfläche (CMS-Redakteur mit Ghost-Zugang) ist ein Trust-Boundary-Problem, kein Engine-Problem: wer HTML im CMS schreiben kann, braucht die Chart Engine nicht als Angriffsvektor. Es gibt **drei sinnvolle Härtungsmaßnahmen** (fetch-URL Whitelist, SRI für Chart.js, Sanitizer-Verbesserung in `showError`), die alle Quick Wins sind und die Defense-in-Depth verbessern, ohne die Architektur zu verändern. Aufwändige Maßnahmen wie DOMPurify, CSP-Umbau oder Input-Sanitization-Libraries wären kontraproduktiv — sie erhöhen Komplexität und Wartungsaufwand, ohne das reale Risikoprofil zu senken.

---

## 1. Threat Model — Validierung

### 1.1 Stimmt das beschriebene Bedrohungsmodell?

**Ja, das Bedrohungsmodell ist korrekt.** Verifizierung nach Code-Review:

| Behauptung | Verifiziert? | Nachweis |
|---|---|---|
| Blog-Leser hat KEINE Eingabemöglichkeit | **Ja** | Kein `location.search`, kein `location.hash`, kein `postMessage`-Listener, keine Formulare, kein LocalStorage-Zugriff. Die Engine liest ausschließlich `data-*`-Attribute und CSV-Dateien. |
| Einzige Schnittstelle sind `data-*`-Attribute | **Ja** | `ChartEngine._processContainer()` (Zeile 80–124) liest `dataset.csv`, `dataset.type`, `dataset.colors`, `dataset.options`, `dataset.title`. Keine anderen Eingabekanäle. |
| "Angreifer braucht CMS-Zugang" als Sicherheitsannahme | **Ja** | Wer `data-csv` oder `data-colors` manipulieren kann, hat Ghost-Editor-Zugang und kann dort auch beliebiges `<script>` injizieren. Die Engine erhöht die Angriffsfläche nicht. |

### 1.2 Gibt es versteckte Eingabekanäle?

**Nein.** Systematische Suche nach allen bekannten Client-Side-Eingabevektoren:

| Vektor | Vorhanden? | Nachweis |
|---|---|---|
| `location.search` / `location.hash` | Nein | Kein Vorkommen im gesamten Engine-Code |
| `postMessage` Listener | Nein | Kein `addEventListener('message', ...)` |
| LocalStorage / SessionStorage | Nein | Kein `localStorage` / `sessionStorage` Zugriff |
| Cookies | Nein | Kein `document.cookie` Zugriff |
| WebSocket | Nein | Kein `WebSocket` Konstruktor |
| Dynamic Import | Nein | Kein `import()` (dynamisch), nur statische ES6-Imports |
| `eval` / `Function` / `setTimeout(string)` | Nein | Zero dynamic code execution |

### 1.3 Einziger realer Eingabekanal: CSV-Dateien

Die CSV-Datei ist der einzige externe Datenkanal, der **nicht vom CMS-HTML selbst stammt**. Aber auch hier gilt:

1. Die URL wird vom CMS-Redakteur gesetzt (nicht vom Besucher)
2. Der Inhalt wird vom eigenen Server ausgeliefert
3. CSVParser (Layer 1) parst defensiv:
   - Gatekeeper für Datumsformat (`/^\d{4}-\d{2}-\d{2}$/`)
   - Sanitization-Pipeline: `valStr.replace(/[^\d,.-]/g, '')` entfernt alle nicht-numerischen Zeichen
   - Ergebnis wird an `parseFloat()` übergeben — kein String-Wert erreicht das DOM

**Fazit:** Das Threat Model ist solide. Die reale Sicherheitsfrage ist nicht "Kann ein Angreifer die Engine exploiten?" sondern "Wie viel Defense-in-Depth ist bei diesem Risikoprofil angemessen?"

---

## 2. Befund-Verifizierung und -Bewertung

### Befund 1: `fetch()` ohne URL-Validierung (CSVParser.js:51)

**Code-Kontext korrekt:** Ja. `ChartEngine.js:84` liest `container.dataset.csv` und übergibt es an `CSVParser.parse(csvUrl)`. Keine Protokoll- oder Origin-Prüfung.

**Vier-Methoden-Bewertung:**

| Methode | Bewertung |
|---|---|
| **Mainstream (OWASP)** | OWASP empfiehlt URL-Validierung für alle fetch-Aufrufe, insbesondere Protokoll-Whitelisting (SSRF Prevention Cheat Sheet). `file://` und `javascript:` sollten immer blockiert werden, auch bei vertrauenswürdiger Quelle. |
| **Via Negativa** | Was können wir weglassen? Origin-Prüfung gegen eine Domain-Whitelist wäre über-rigide — der Blog-Betreiber muss auch CSVs von anderen Domains laden können (z.B. S3-Bucket, CDN). Aber `file://` und `javascript://` Protokolle haben null legitimen Nutzen. |
| **Occam's Razor** | Einfachste Lösung: Drei Zeilen Code — `if (!url.startsWith('https://') && !url.startsWith('/'))` vor dem `fetch()`. Keine Library nötig, keine Regex, keine URL-Klasse. |
| **Devil's Advocate** | Der Redakteur kontrolliert die URL. Browser blockieren `file://` von `https://`-Seiten ohnehin (Mixed Content / Same-Origin Policy). `fetch('file:///etc/passwd')` von einer HTTPS-Seite ergibt einen Browser-Fehler, kein Datenleck. Und: Was ist mit relativen URLs (`/data/meine.csv`)? Die müssen weiterhin funktionieren. |

**Severity: Low (Informational bei aktuellem Deployment)**

**Realistischer Angriffsvektor:** Ein Redakteur mit CMS-Zugang setzt `data-csv="https://evil.com/tracker.csv"`. Ergebnis: Browser lädt die URL. Aber: (a) kein Cookie wird mitgesendet (kein `credentials: include`), (b) die Antwort wird als CSV geparst und numerische Werte extrahiert — kein Rückkanal zum Angreifer. Theoretisch: Timing-basierte SSRF-Erkennung (Antwortzeit messen), aber das ist akademisch bei einem Blog.

**Empfehlung:** Quick Win. Protokoll-Whitelist (`https://` + relative Pfade). Nicht weil das aktuelle Risiko hoch ist, sondern weil es 3 Zeilen Code kostet und die Defense-in-Depth verbessert.

---

### Befund 2: `innerHTML` mit Sanitizer (FwRenderer.js:31)

**Code-Kontext korrekt:** Teilweise. Der Vorab-Scan ist korrekt über `showError()`, aber unvollständig. Die vollständige `innerHTML`-Nutzung in der Engine:

| Stelle | Code | Risiko |
|---|---|---|
| `showLoading()` :26 | `container.innerHTML = '<div class="fw-loading...">...'` | **Kein Risiko** — statischer String, keine Variablen |
| `showError()` :31 | `container.innerHTML = '...${ this._sanitize(message) }...'` | **Zu prüfen** — `message` kommt aus Error-Objekten |
| `setupStructure()` :90 | `container.innerHTML = ''` | **Kein Risiko** — Leerung des Containers |
| `closeBtn` :146 | `closeBtn.innerHTML = '&times;'` | **Kein Risiko** — statisches HTML-Entity |

**Analyse von `showError()`:**

Der `message`-Wert stammt aus:
1. `ChartEngine.js:87` — `"data-csv fehlt"` (statischer String)
2. `ChartEngine.js:96` — `"Chart-Typ '" + type + "' ist unbekannt."` (enthält `dataset.type`)
3. `CSVParser.js:57` — `"CSV Load Error (${url}): ${err.message}"` (enthält `dataset.csv` + Netzwerk-Fehlermeldung)
4. `CSVParser.js:95` — `"GATEKEEPER: Ungültiges Datum '${rawCol0}'"` (enthält CSV-Inhalt)

Der Sanitizer `_sanitize()` entfernt `<` und `>`:
```javascript
str.replace(/[<>]/g, '')
```

**Vier-Methoden-Bewertung:**

| Methode | Bewertung |
|---|---|
| **Mainstream** | OWASP empfiehlt: "Verwende `textContent` statt `innerHTML` für Textausgabe." Das ist hier die korrekte Empfehlung — `showError()` gibt reinen Text aus, kein HTML. |
| **Via Negativa** | Statt den Sanitizer zu verbessern (Anführungszeichen escapen, HTML-Entities behandeln, ...) den Sanitizer **weglassen** und `textContent` nutzen. Weniger Code = weniger Angriffsfläche. |
| **Occam's Razor** | Einfachste Lösung: `showError()` auf `createElement` + `textContent` umbauen (wie alle anderen Stellen im Renderer bereits funktionieren). 5 Zeilen statt Template-Literal. |
| **Devil's Advocate** | Der aktuelle Sanitizer ist **funktional sicher** für den Kontext: Der sanitisierte String landet als Textinhalt innerhalb eines `<div>`, nicht in einem HTML-Attribut. Ohne `<` und `>` kann kein neues HTML-Element erzeugt werden. `"onmouseover=alert(1)"` in einem Textknoten ist harmlos — es wird literal angezeigt, nicht als Attribut interpretiert. Der Sanitizer schützt also gegen den einzigen relevanten Angriffsvektor (Tag-Injection). Aber: Die Architektur ist inkonsistent — 95% des Renderers nutzt das sichere Pattern (createElement + innerText), nur `showError()` und `showLoading()` nutzen innerHTML. |

**Severity: Low**

**Empfehlung:** Quick Win. `showError()` auf `createElement` + `textContent` umbauen. Nicht weil der aktuelle Code exploitbar ist, sondern um architektonische Konsistenz herzustellen und den `_sanitize()`-Sonderweg zu eliminieren. Der Sanitizer wird dann nur noch für die A11y-Tabelle benötigt (wo er ebenfalls mit `innerText` verwendet wird und daher redundant ist).

---

### Befund 3: Farb-Parsing ohne Validierung (ChartEngine.js:271–280)

**Code-Kontext korrekt:** Ja. `data-colors="ETF:blau,Aktie:purpur"` wird in ein Key-Value-Objekt geparst. Die Farbwerte werden anschließend an zwei Stellen verwendet:

1. **Chart.js Datasets** (borderColor, backgroundColor) — Chart.js' Canvas-Renderer
2. **Legend-Dots** (`dot.style.backgroundColor = items[i].color`) — direkte CSS-Property

**Angriffsszenario CSS-Injection:**

Hypothese: `data-colors="ETF: red; } body { display:none; } .x {"` — CSS-Injection?

Analyse:
- Der Wert wird **nicht** in ein `<style>`-Tag geschrieben, sondern als `dot.style.backgroundColor` gesetzt
- `element.style.backgroundColor = "red; } body { display:none; }"` — der Browser ignoriert den ungültigen Wert (CSS-Parser im Style-Attribut erwartet einen einzelnen Wert, nicht mehrere Deklarationen)
- Chart.js' Canvas-Renderer: Ungültige Farbwerte — Canvas verwendet `#000000` (Fallback) oder ignoriert den Wert

**Aber:** `FwTheme.validateColorMap()` existiert bereits und prüft gegen eine Allow-List:
```javascript
this._allowedColors = new Set(Object.values(this.colors).map(c => c.toUpperCase()));
```
Diese Validierung wird in `LineChartStrategy.transform()` und `PieChartStrategy.transform()` aufgerufen. Bei ungültigen Farben wird auf die Theme-Palette zurückgefallen (`effectiveColors = {}`).

**Vier-Methoden-Bewertung:**

| Methode | Bewertung |
|---|---|
| **Mainstream** | OWASP: CSS-Injection über Style-Attribute ist in modernen Browsern ein Nicht-Problem (kein `expression()` seit IE). Canvas-basiertes Rendering (Chart.js) ist per se XSS-immun — Canvas erzeugt Pixel, kein DOM. |
| **Via Negativa** | Eine Regex-Validierung für Farbwerte wäre Over-Engineering. Der existierende Gatekeeper (`validateColorMap`) ist bereits die korrekte Architekturantwort. |
| **Occam's Razor** | Der Gatekeeper existiert bereits und funktioniert. Kein zusätzlicher Code nötig. |
| **Devil's Advocate** | Die Legend-Dots nutzen `element.style.backgroundColor` direkt. Browser parsen CSS-Properties strikt — ein Wert mit `;` oder `}` wird als ungültig verworfen. Es gibt keinen bekannten Vektor, um über eine einzelne CSS-Property-Zuweisung Code auszuführen. |

**Severity: Informational**

**Empfehlung:** Keine Aktion nötig. Der existierende Gatekeeper in `FwTheme.validateColorMap()` ist architektonisch korrekt. Die einzige theoretische Verbesserung wäre, die Validierung auch in `_parseConfig()` (ChartEngine) statt in jeder Strategie einzeln aufzurufen — aber das ist Architektur-Kosmetik, kein Sicherheitsfix.

---

### Befund 4: Options-Parsing ohne Whitelist (ChartEngine.js:261–266)

**Code-Kontext korrekt:** Ja. `_extractOption()` extrahiert Werte aus `data-options` per String-Suche.

**Datenfluss-Analyse:**

```
data-options="range:3y,benchmark:MSCI World"
    _extractOption(optionsStr, 'range')    -> '3y'
    _extractOption(optionsStr, 'benchmark') -> 'MSCI World'
```

Wo landen die Werte?
- `range` — `FwDateUtils.filterRows()` — String-Match gegen `/^(\d+)([ym])$/i` — ungültige Werte — Fallback auf 'max'
- `benchmark` — `LineChartStrategy` — String-Vergleich mit Spaltennamen — kein Match — ignoriert
- `view` — String-Vergleich in `getViewOptions()` — kein Match — ignoriert

**Vier-Methoden-Bewertung:**

| Methode | Bewertung |
|---|---|
| **Mainstream** | Allow-Lists sind Best Practice für Konfigurationswerte. OWASP empfiehlt Whitelist-Validierung für alle Eingaben. |
| **Via Negativa** | Die nachgelagerten Konsumenten (`filterRows`, Strategy-Lookup) **haben bereits implizite Whitelists** durch String-Matching und Regex. Ein ungültiger `range`-Wert fällt auf `'max'` zurück. Ein ungültiger `benchmark` wird ignoriert. Eine explizite Whitelist in `_extractOption()` wäre doppelte Validierung. |
| **Occam's Razor** | Da die nachgelagerten Funktionen bereits defensiv sind, ist der minimalste Fix: nichts tun. |
| **Devil's Advocate** | Gegenargument: Die implizite Validierung ist verstreut über mehrere Dateien. Eine zentrale Whitelist in `_extractOption()` oder `_parseConfig()` wäre wartbarer und expliziter — nicht für Security, sondern für Code-Klarheit. Aber das ist ein Architektur-Argument, kein Sicherheitsargument. |

**Severity: Informational**

**Empfehlung:** Optional (Architektur-Verbesserung, nicht Security-Fix). `LineChartStrategy` hat bereits `ALLOWED_MODES` und `ALLOWED_RANGES` als Allow-Lists. Das Pattern ist vorbildlich und könnte auf `ChartEngine._parseConfig()` hochgezogen werden — aber nur bei nächster Gelegenheit, nicht als Sicherheitsmaßnahme.

---

### Befund 5: Error-Messages leaken URLs (CSVParser.js:57)

**Code-Kontext korrekt:** Ja. `throw new Error('CSV Load Error (${url}): ${err.message}')` wird von `ChartEngine.js:123` an `FwRenderer.showError(container, e.message)` weitergereicht und im DOM angezeigt.

**Vier-Methoden-Bewertung:**

| Methode | Bewertung |
|---|---|
| **Mainstream** | OWASP: "Leake keine internen Pfade in Fehlermeldungen." Aber: Die URL steht bereits im HTML-Quelltext (`data-csv="..."`) — sichtbar für jeden, der F12 drückt. |
| **Via Negativa** | Die URL aus der Fehlermeldung zu entfernen würde das **Debugging erschweren**, ohne einen Informationsvorteil für den Angreifer zu beseitigen. |
| **Occam's Razor** | Die einfachste Lösung ist: nichts tun. Die Information ist bereits öffentlich. |
| **Devil's Advocate** | Einziges Szenario: Fehlermeldung enthält `err.message` vom Browser — z.B. `"Failed to fetch"`. Das ist harmlos. Aber: Bei einem Redirect könnte die finale URL (nach 301/302) in `err.message` stehen und sich von der Original-URL unterscheiden. Das ist extrem theoretisch. |

**Severity: Informational**

**Empfehlung:** Keine Aktion nötig. URL-Exposure in Fehlermeldungen ist hier kein Risiko, weil die URL ohnehin im HTML-Quelltext steht. Das Entfernen würde Debugging-Fähigkeit ohne Sicherheitsgewinn opfern.

---

### Befund 6: Positive Befunde — Verifizierung

Alle positiven Befunde sind **korrekt und verifiziert:**

| Befund | Verifiziert | Kommentar |
|---|---|---|
| Kein `eval()`, `Function()`, `setTimeout(string)` | **Ja** | Grep über gesamte Codebasis: 0 Treffer |
| Deep Freeze auf Datenobjekten | **Ja** | `FinanzwesirData.js:36-58`: Columns, Rows (inkl. jede einzelne Zeile), Metadata, Hauptobjekt — alles eingefroren. |
| `innerText` statt `innerHTML` für Daten | **Ja** | 10x `innerText`, 2x `textContent` (A11y-Tabelle). Nur 3x `innerHTML` (Loading, Error, Container-Clear). |
| `document.createElement()` Pattern | **Ja** | Der gesamte Renderer (Toolbar, Legend, Popover, A11y-Tabelle) nutzt das sichere DOM-API. |
| Einfache Regex ohne ReDoS | **Ja** | Alle Regex-Patterns sind linear: `/^\d{4}-\d{2}-\d{2}$/`, `/[<>]/g`, `/[^\d,.-]/g`, `/^(\d+)([ym])$/i`. Keine Backtracking-Katastrophen. |
| Minimaler Global State | **Ja** | Einziger globaler Export: `window.FinanzwesirChartEngine` in `index.js:5`. |

---

## 3. Eigene Findings — Was der Vorab-Scan übersehen hat

### Finding A: Chart.js ohne Subresource Integrity (SRI) — ✅ GEGENSTANDSLOS

> **Korrektur (2026-02-17):** Dieses Finding wurde geschrieben, als Chart.js
> noch vom CDN (jsdelivr.net) geladen wurde. Inzwischen liegt Chart.js
> **lokal** im Theme (`assets/js/vendor/chart.umd.min.js`). SRI schützt
> gegen CDN-Manipulation und ist bei lokalen Dateien unnötig — die Integrität
> wird durch das eigene Repository und den Deploy-Prozess gewährleistet.
> Die HTML-Testdateien im Repo-Root nutzen noch die CDN-URL, aber diese
> Dateien werden beim Theme-Bau durch `default.hbs` ersetzt.
>
> Die ursprüngliche Analyse bleibt unten als historische Referenz stehen.

**Ursprüngliche Analyse (historisch):**

Alle HTML-Testdateien laden Chart.js so:
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

Subresource Integrity (SRI) ist ein Browser-Mechanismus, der sicherstellt, dass eine extern geladene Datei nicht manipuliert wurde. Ohne SRI vertraut der Browser blind darauf, dass jsdelivr.net die richtige Datei ausliefert.

**Was könnte passieren?**

Wenn jemand den CDN-Server kompromittiert (oder ein Man-in-the-Middle-Angriff stattfindet), könnte eine manipulierte Chart.js-Version geladen werden, die beliebigen Code ausführt. Das ist kein theoretisches Szenario — das npm-Ökosystem hatte mehrere solcher Vorfälle (event-stream 2018, ua-parser-js 2021, colors.js 2022).

**Severity: Gegenstandslos** — Chart.js wird lokal gehostet. Supply-Chain-Risiko über CDN existiert nicht.

---

### Finding B: Event-Listener-Akkumulation bei Re-Renders

**Was ist das Problem?**

In `ChartEngine._draw()` (Zeile 188–192) wird bei jedem Initial-Render ein `requestAnimationFrame`-Callback ausgeführt, der `_bindEvents()` und `_bindLegendEvents()` aufruft. Diese Methoden fügen Event-Listener auf Toolbar und Legend hinzu.

Bei `_updateLegend()` (Zeile 196–213) wird bei einem Legend-Update die Legend durch `replaceWith()` ausgetauscht und danach `_bindLegendEvents()` erneut aufgerufen. Das ist korrekt — der alte DOM-Knoten (mit seinem Listener) wird entfernt, der neue bekommt einen frischen Listener.

**Aber:** `_bindEvents()` für die Toolbar (Zeile 229–246) wird nur beim Initial-Render aufgerufen. Die Toolbar bleibt über Re-Renders hinweg bestehen. Da `_draw()` beim Initial-Render nur einmal aufgerufen wird (Guard: `if (state.chartInstance)`), gibt es **keine Listener-Akkumulation**.

**Severity: Kein Finding** — nach Code-Review kein Problem. Die Implementierung ist korrekt.

---

### Finding C: Chart-Instanzen werden nicht explizit destroyed

**Was ist das Problem?**

`Chart.js`-Instanzen belegen Canvas-Kontexte und interne Event-Listener. Die empfohlene Praxis ist, `chart.destroy()` aufzurufen, bevor eine neue Instanz erstellt wird. Im Code:

- `_draw()` erstellt neue Chart-Instanzen (`new Chart(canvas, chartConfig)`)
- Updates nutzen `chart.update()` (korrekt, keine neue Instanz)
- Es gibt keinen expliziten `destroy()`-Aufruf

**Ist das ein Problem?**

Auf einer Blog-Seite mit 1–3 Charts, die einmalig geladen werden: **Nein.** Charts werden erstellt und bleiben bis zum Seitenwechsel bestehen. Beim Seitenwechsel räumt der Browser den gesamten JavaScript-Kontext auf.

Ein Problem wäre es bei einer Single-Page-Application (SPA), wo Charts dynamisch erstellt und entfernt werden — aber Ghost ist ein klassisches Multi-Page-CMS.

**Severity: Informational** (kein aktuelles Risiko, Hygiene-Empfehlung für Zukunftssicherheit)

**Empfehlung:** Keine Aktion nötig. Sollte die Engine jemals in einer SPA eingesetzt werden, wäre ein `destroy()`-Aufruf beim Container-Entfernen nötig.

---

### Finding D: Prototype Pollution — Analyse

**Was ist das?** (Einfach erklärt)

Prototype Pollution ist ein Angriff, bei dem ein Angreifer die "Blaupause" aller JavaScript-Objekte manipuliert. Stellen Sie sich vor, jemand ändert die Vorlage, nach der alle Häuser in einer Siedlung gebaut werden — plötzlich haben alle Häuser eine Hintertür.

**Systematische Suche:**

| Pattern | Vorkommen | Risiko |
|---|---|---|
| `Object.assign({}, ...)` | 4x (ChartEngine, CSVParser, FinanzwesirData) | **Kein Risiko** — Ziel ist immer ein frisches `{}`, Quelle ist Engine-interner State oder Konfiguration. Kein unkontrollierter User-Input fließt in das erste Argument. |
| Spread-Operator (`...`) | 1x (FwSmartTooltips:112 `{ ...base, weight: 'bold' }`) | **Kein Risiko** — Quelle ist ein internes Objekt. |
| Property-Zugriff mit variablem Key | `colors[pieces[0].trim()]` in _parseConfig | **Sehr geringes Risiko** — der Key kommt aus `data-colors`. `pieces[0].trim()` könnte theoretisch `__proto__` sein. Aber: Das Ergebnis-Objekt `colors` wird nur als Lookup für Theme-Farben verwendet und durchläuft `validateColorMap()`. Ein `__proto__`-Key würde einfach keinen Match in der Allow-List finden. |
| Bracket-Notation mit variablem Key | `this.strategies[type]` in _processContainer | **Kein Risiko** — `type` kommt aus `dataset.type`. Selbst bei `type = '__proto__'` oder `type = 'constructor'` ergibt `this.strategies.__proto__` keine gültige Strategy, Ergebnis: Fehler "Chart-Typ ist unbekannt", kein Pollution. |

**Severity: Kein Finding** — keine Prototype-Pollution-Vektoren.

---

### Finding E: DOM Clobbering — Analyse

**Was ist das?** (Einfach erklärt)

DOM Clobbering ist ein Trick, bei dem HTML-Elemente mit bestimmten `id` oder `name`-Attributen globale JavaScript-Variablen überschreiben. Beispiel: `<img id="fetch">` würde `window.fetch` überschreiben.

**Analyse:**

Die Engine erzeugt HTML-Elemente mit CSS-Klassen (`fw-chart-wrapper`, `fw-legend-item`, etc.), aber **setzt keine HTML-IDs auf Chart-Elemente**. Die einzige ID ist `fw-chart-styles` auf dem injizierten `<style>`-Tag (FwRenderer.js:359).

Der Engine-Code greift nicht über `window.variableName` auf eigene DOM-Elemente zu — alle DOM-Zugriffe nutzen `container.querySelector()` mit Klassen-Selektoren.

**Severity: Kein Finding** — korrekte Architektur, kein DOM-Clobbering-Risiko.

---

### Finding F: CSP-Kompatibilität (Content Security Policy)

**Was ist CSP?** (Einfach erklärt)

Content Security Policy ist eine HTTP-Header-basierte Sicherheitsrichtlinie, die dem Browser sagt, welche Ressourcen eine Seite laden darf. Zum Beispiel: "Führe nur JavaScript aus, das in einer Datei steht, nicht in einem `<script>`-Tag im HTML."

**Analyse der Engine:**

| CSP-Direktive | Engine-kompatibel? | Ursache |
|---|---|---|
| `script-src` (kein `unsafe-inline`) | **Ja** | Kein Inline-JavaScript, nur ES6-Module |
| `style-src` (kein `unsafe-inline`) | **Nein** | `_injectStyles()` (FwRenderer.js:358–419) erstellt ein `<style>`-Tag mit dynamischem CSS. Ausserdem: `dot.style.backgroundColor = ...` (3 Stellen) |
| `img-src` | **Ja** | Keine Bilder geladen |
| `connect-src` | **Einschränkung** | `fetch()` für CSV-Dateien muss in CSP erlaubt sein |

**Vier-Methoden-Bewertung:**

| Methode | Bewertung |
|---|---|
| **Mainstream** | Mozilla empfiehlt CSP für alle Websites. Für Content-Blogs ist eine moderate CSP (`script-src 'self' cdn.jsdelivr.net`) bereits ein grosser Gewinn. |
| **Via Negativa** | Die Engine CSP-kompatibel zu machen (Inline-Styles in eine externe CSS-Datei auslagern) wäre ein **signifikanter Umbau** von `_injectStyles()`. Das CSS ist dynamisch (Theme-Farben werden zur Laufzeit eingesetzt). Alternative: CSS Custom Properties (CSS Variables) in einer statischen Datei + `style.setProperty()` zur Laufzeit. |
| **Occam's Razor** | Die Inline-Style-Attribute (`element.style.backgroundColor`) sind CSP-kompatibel — `unsafe-inline` in `style-src` bezieht sich nur auf `<style>`-Tags und `style`-Attribute im HTML, nicht auf JavaScript-gesetzte Properties. Einziges Problem: das `<style>`-Tag von `_injectStyles()`. |
| **Devil's Advocate** | Ghost CMS setzt wahrscheinlich bereits `style-src 'unsafe-inline'`, weil das CMS-Template selbst Inline-Styles verwendet (fast alle CMS tun das). Die Engine verursacht also kein neues CSP-Problem — sie passt sich dem bestehenden CSP-Profil der Host-Seite an. |

**Severity: Low** (Architektur-Schuld, nicht akutes Risiko)

**Empfehlung:** Mittelfristig — nicht jetzt. Bei einem zukünftigen Refactoring die CSS-Injection in `_injectStyles()` durch eine externe CSS-Datei mit CSS Custom Properties ersetzen. Das ist eine Architektur-Verbesserung, kein Sicherheitsfix.

---

### Finding G: `parseInt` ohne Radix (ChartEngine.js:254)

**Code:**
```javascript
var index = parseInt(item.dataset.index);
```

**Analyse:** `parseInt` ohne zweites Argument (`radix`) kann bei Strings mit führender `0` (z.B. `"08"`) in älteren Engines als Oktal interpretiert werden. In ES5+ ist der Default `10`, aber explizit `parseInt(x, 10)` ist Best Practice.

**Severity: Informational** — kein Sicherheitsrisiko, reine Robustheits-Verbesserung.

**Empfehlung:** Optional. `parseInt(item.dataset.index, 10)` — ein Wort hinzufügen.

---

## 4. Architektur-Bewertung

### 4.1 Ist das 5-Layer-Modell sicherheitstechnisch sinnvoll?

**Ja, ausgezeichnet.** Das Layer-Modell implementiert drei fundamentale Sicherheitsprinzipien:

1. **Principle of Least Privilege:** Layer 1 (Vault) parst und versiegelt Daten. Kein anderer Layer kann Rohdaten verändern (Deep Freeze). Layer 4 (Curator) berechnet nur, keine I/O. Layer 5 (Face) rendert nur, kein Daten-Rückfluss.

2. **Defense in Depth:** Daten durchlaufen mehrere Validierungsschichten:
   - Layer 1: Gatekeeper (Datums-Regex, Unit-Allow-List, Sanitization-Pipeline)
   - Layer 3: fwContext-Validierung (Pflichtfelder, Allow-List für dateSemantics)
   - Layer 5: innerText/textContent für DOM-Ausgabe

3. **Immutability:** `Object.freeze()` auf allen Datenobjekten verhindert nachträgliche Manipulation — auch durch fehlerhafte oder kompromittierte Plugins.

### 4.2 Ist der Datenfluss sicher?

```
HTML data-* -> ChartEngine (parse) -> CSVParser (fetch+validate)
-> FinanzwesirData (freeze) -> Strategy (transform+context)
-> Chart.js (Canvas render) + FwRenderer (DOM render)
```

**Bewertung:** Der Datenfluss ist unidirektional (keine Rückkanäle von Layer 5 nach Layer 1). Daten werden beim Eintritt validiert (Layer 1) und beim Austritt sicher gerendert (Layer 5). Das ist das korrekte Pattern.

### 4.3 Layer-Verletzungen?

**Keine gefunden.** Jede Datei importiert nur aus dem eigenen oder einem tieferen Layer. Es gibt keine zirkulären Abhängigkeiten. `fwContext` als Request-Scoped, immutable Context-Objekt ist das korrekte Plugin-Kommunikationsmuster.

### 4.4 Gatekeeper-Qualität (Layer 1)

**CSVParser.js** und **FinanzwesirData.js** setzen den höchsten Standard im Repository:
- Allow-List für Einheiten (`ALLOW_LIST`)
- Regex-Gatekeeper für Datumsformat
- Aggressive Sanitization (`/[^\d,.-]/g`)
- Deep Freeze aller Ausgaben
- Actionable Error Messages

**Einzige Schwäche:** Die `fetch()`-URL wird nicht validiert (Befund 1) — das ist der einzige Punkt, an dem Layer 1 unter seinem eigenen Standard liegt.

---

## 5. Priorisierte Empfehlungstabelle

| # | Massnahme | Severity | Aufwand | Methodik-Verdict |
|---|---|---|---|---|
| ~~1~~ | ~~**SRI + Versionspinnung für Chart.js**~~ | ~~Medium~~ | — | **Gegenstandslos** (2026-02-17): Chart.js lokal gehostet, kein CDN. |
| ~~2~~ | ~~**Protokoll-Whitelist für fetch-URL**~~ | ~~Low~~ | — | **Erledigt** (2026-02-17): Domain-Whitelist implementiert (strengere Variante). |
| ~~3~~ | ~~**`showError()` auf createElement + textContent umbauen**~~ | ~~Low~~ | — | **Erledigt** (2026-02-17): showError + showLoading auf createElement umgebaut. |
| ~~4~~ | ~~**`parseInt` mit Radix**~~ | ~~Informational~~ | — | **Erledigt** (2026-02-17). |
| 5 | **CSP-Kompatibilität (Inline-Styles auslagern)** | Low | Mittel (1–2h) | Devil's Advocate: Ghost setzt wahrscheinlich bereits `unsafe-inline`. Erst relevant, wenn CSP-Header tatsächlich eingeführt werden. |

---

## 6. Anti-Empfehlungstabelle — Was man NICHT tun sollte

| Massnahme | Warum oft empfohlen | Warum hier kontraproduktiv |
|---|---|---|
| **DOMPurify einführen** | "Jede innerHTML-Stelle braucht DOMPurify!" | 3.500 Zeilen Code, 3x innerHTML (davon 2x statisch). DOMPurify (15 KB gzip) hat mehr Code als die gesamte Engine-Sicherheitslogik. Der aktuelle Renderer nutzt bereits das sichere Pattern (createElement + innerText). Statt DOMPurify: die verbleibenden 2 innerHTML-Stellen auf createElement umbauen. |
| **Content Security Policy erzwingen** | "Jede Website braucht CSP!" | Die Engine injiziert CSS dynamisch via `<style>`-Tag mit Theme-Farben. CSP-Compliance würde einen signifikanten Umbau erfordern (CSS Variables, externe Datei). Aufwand-Nutzen-Verhältnis ist negativ, solange Ghost selbst `unsafe-inline` braucht. |
| **Input-Sanitization-Library** | "Alle Eingaben müssen sanitized werden!" | Die Eingaben kommen vom eigenen CMS (trust boundary) und vom eigenen Server (CSV-Dateien). Layer 1 hat bereits eine eigene Sanitization-Pipeline. Eine generische Library (z.B. validator.js) würde doppelte Validierung erzeugen und falsche Sicherheit suggerieren. |
| **CSRF-Tokens für CSV-Fetch** | "Alle HTTP-Requests brauchen CSRF-Schutz!" | CSRF-Tokens schützen gegen ungewollte Zustandsänderungen (POST/PUT/DELETE). CSV-Fetch ist ein idempotenter GET-Request, der öffentliche Daten liest. CSRF-Tokens sind hier sinnfrei. |
| **Rate Limiting / Throttling** | "API-Calls müssen rate-limited werden!" | Die Engine ist 100% Client-Side. Rate Limiting auf Client-Seite ist Security Theater — ein Angreifer kann es einfach umgehen. Wenn der CSV-Server geschützt werden soll, ist das ein Server-Problem, kein Engine-Problem. |
| **Farb-Validierung per Regex** | "Farbwerte müssen gegen Injection validiert werden!" | Chart.js rendert auf Canvas (pixel-basiert, kein DOM). Canvas-Kontext-Methoden akzeptieren ungültige Farben ohne Seiteneffekt (Fallback auf Schwarz oder Ignorieren). Der existierende Gatekeeper (`validateColorMap()` mit Allow-List) ist bereits die korrekte Architekturantwort. |
| **`Object.freeze()` auf Chart-Config** | "Alle Objekte sollten immutable sein!" | Chart.js mutiert seine Config-Objekte intern (Scales, Ticks, Animations). Einfrieren würde Chart.js brechen. Immutability gehört auf die Daten (Layer 1, korrekt umgesetzt), nicht auf die Chart-Konfiguration (Layer 3). |

---

## 7. Kochbuch — Anweisungsliste für das umsetzende LLM

> **Kontext für das umsetzende LLM:** Du arbeitest an der Finanzwesir Chart Engine,
> einer Client-Side JavaScript-Engine mit 17 Dateien in `assets/js/fw-chart-engine/`.
> Der Code-Stil ist ES6-Module, `const`/`let` in neuem Code, 2 Spaces Indent.
> Die Architektur (5-Layer-Modell) und die Dateien in `docs/spec/` sind bindend.
> Lies die CLAUDE.md im Repo-Root für alle Regeln.

### WAS TUN (priorisiert)

---

**~~1. SRI für Chart.js~~ — GEGENSTANDSLOS (2026-02-17)**

> Chart.js wird lokal gehostet (`assets/js/vendor/chart.umd.min.js`), nicht
> vom CDN. SRI schützt gegen CDN-Manipulation und ist bei lokalen Dateien
> unnötig. Die HTML-Testdateien im Repo-Root nutzen noch die CDN-URL, aber
> diese Dateien werden beim Theme-Bau durch `default.hbs` ersetzt.
> Dort wird Chart.js so eingebunden:
> ```handlebars
> <script defer src="{{asset 'js/vendor/chart.umd.min.js'}}"></script>
> ```
> Kein SRI, kein Preconnect, kein CDN.

---

**~~2. Protokoll-Whitelist für fetch-URL~~ — ✅ ERLEDIGT (2026-02-17)**

> Implementiert als **Domain-Whitelist** (strengere Variante als die ursprünglich
> vorgeschlagene Protokoll-Whitelist). Erlaubt: `https://www.finanzwesir.com/...`,
> relative Pfade (`/`, `./`, `../`), `http://localhost`, `http://127.0.0.1`.
> Alles andere → GATEKEEPER-Fehler. Entscheidung: Domain-Whitelist ersetzt die
> reine Protokoll-Prüfung (User-Entscheidung, überschreibt die ursprüngliche
> Empfehlung "keine Domain-Whitelist" aus der Analyse).

---

**~~3. showError() und showLoading() auf createElement umbauen~~ — ✅ ERLEDIGT (2026-02-17)**

> Beide Methoden in FwRenderer.js (V4.7.0 SAFE DOM) auf `createElement` +
> `textContent` umgebaut. `_sanitize()` wird in showError nicht mehr aufgerufen
> (textContent escaped automatisch). `_sanitize()` Methode bleibt erhalten
> (wird in `_renderA11yTable()` verwendet). `container.innerHTML = ''` bleibt
> als Leerung (statischer Leerstring, sicher).

---

**~~4. parseInt mit Radix~~ — ✅ ERLEDIGT (2026-02-17)**

`ChartEngine.js:254` — `parseInt(item.dataset.index)` → `parseInt(item.dataset.index, 10)`.

---

### WAS NICHT TUN

Diese Liste ist **bindend**. Jeder Punkt hat eine Begründung in der Analyse oben (Abschnitt 6, Anti-Empfehlungstabelle). Bei Unsicherheit: lieber NICHTS tun als eine dieser Regeln brechen.

1. **KEIN DOMPurify** oder andere Sanitization-Libraries einführen — der Renderer nutzt bereits createElement + innerText/textContent. DOMPurify (15 KB) hat mehr Code als die gesamte Engine-Sicherheitslogik.
2. **KEINE CSP-Kompatibilität erzwingen** — würde `_injectStyles()` brechen, Ghost braucht ohnehin `unsafe-inline`.
3. **KEINE Farb-Validierung per Regex** — Chart.js rendert auf Canvas (pixelbasiert), der existierende Gatekeeper `validateColorMap()` mit Allow-List ist die korrekte Lösung.
4. ~~**KEINE Domain-Whitelist für fetch-URLs**~~ — **Überholt** (2026-02-17): Domain-Whitelist wurde implementiert (User-Entscheidung). Erlaubt: `https://www.finanzwesir.com`, relative Pfade, localhost.
5. **KEINE CSRF-Tokens, Rate Limiting oder andere Server-Side-Patterns** — Engine ist 100% Client-Side.
6. **KEINE Änderungen an Layer 1** (CSVParser/FinanzwesirData) **ausser** der Protokoll-Whitelist in Task 2. Layer 1 ist Tabu-Bereich (siehe CLAUDE.md §5).
7. **KEIN `Object.freeze()` auf Chart.js Config-Objekte** — Chart.js mutiert seine Config intern, Einfrieren bricht die Library.
8. **KEINE `var` zu `const`/`let` Umschreibungen** als Teil dieses Security-Fixes. Das ist ein separates Refactoring.
9. **KEINE zusätzlichen `console.log` oder Debug-Ausgaben** einfügen.
10. **KEINEN Code in anderen Dateien ändern** als den oben genannten (CSVParser.js, FwRenderer.js, ChartEngine.js). Die HTML-Testdateien im Repo-Root sind Testdateien und werden beim Theme-Bau durch `default.hbs` ersetzt.

### WAS OPTIONAL IST

Diese Punkte sind **kein Security-Fix**, sondern Architektur-Hygiene. Nur umsetzen, wenn explizit beauftragt:

- `_extractOption()` in ChartEngine.js um explizite Allow-Lists erweitern (Konsistenz mit `LineChartStrategy.ALLOWED_RANGES`)
- `_sanitize()` Aufrufe in `_renderA11yTable()` evaluieren (Zeilen 335, 349 — dort wird `innerText` verwendet, `_sanitize()` ist doppelt gemoppelt)
- CSP-Kompatibilität bei einem zukünftigen Refactoring von `_injectStyles()` berücksichtigen (CSS Custom Properties statt dynamisches CSS-Template-Literal)
- `chart.destroy()` Aufrufe für den Fall einer zukünftigen SPA-Integration vorbereiten (aktuell nicht nötig)

---

## Quellen

1. **OWASP DOM-Based XSS Prevention Cheat Sheet** — Referenz für innerHTML vs. textContent Empfehlungen
2. **OWASP Server-Side Request Forgery (SSRF) Prevention Cheat Sheet** — Referenz für URL-Validierung
3. **OWASP Third-Party JavaScript Management Cheat Sheet** — Referenz für SRI-Empfehlung
4. **Mozilla MDN: Subresource Integrity** — Technische Spezifikation für SRI-Attribute
5. **Mozilla Web Security Guidelines** — CSP-Empfehlungen und Inline-Style-Bewertung
6. **Google Trusted Types** — API für DOM-XSS-Prävention (hier nicht anwendbar, da kein Bundler)
7. **Edward Tufte, "The Visual Display of Quantitative Information"** — Referenz für Data-Ink-Ratio (keine falsche Sicherheits-Komplexität)
8. **Charlie Munger, "Invert, always invert"** — Methodische Grundlage für Via-Negativa-Analyse
