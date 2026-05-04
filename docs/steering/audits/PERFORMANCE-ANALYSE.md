# Performance-Analyse: Finanzwesir Chart Engine
Stand: 2026-05-03 08:02 | Session: A7-Stand-Datum | Geändert von: Claude

**Datum:** 2026-02-16
**Version:** 1.0
**Scope:** Client-Side BI-Engine für Finanzblog (Ghost CMS, selbst gehostet)
**Constraint:** Analyse und Empfehlungen — kein Code.

---

## Executive Summary (für den Blog-Betreiber)

Die Chart Engine ist für ihren Einsatzzweck — 1–3 Charts auf einer Blog-Seite — **architektonisch gesund**. Die Ladezeit wird nicht von der Engine dominiert, sondern von zwei externen Faktoren: dem Chart.js-Download vom CDN (~60 KB gzip) und der fehlenden Versionspinnung (kein deterministisches Caching). Die drei Quick Wins mit dem besten Aufwand-Wirkungs-Verhältnis sind: (1) Chart.js-URL auf eine feste Version pinnen (5 Minuten Arbeit, sofort 1 Jahr Browser-Cache statt 7 Tage), (2) `<link rel="preconnect">` für das CDN hinzufügen (1 Zeile HTML, spart ~100ms), (3) bei Ghost-Integration den `{{asset}}`-Helper für alle Engine-Dateien nutzen (automatisches Cache-Busting). Ein Bundler ist bei 130 KB Quellcode über HTTP/2 **nicht notwendig** — der Wartungsaufwand übersteigt den Performance-Gewinn.

---

## 1. Critical Rendering Path — Vom Klick zum ersten sichtbaren Chart

### 1.1 Die Ladekette (Wasserfall-Diagramm)

```
ZEIT ──────────────────────────────────────────────────────►

[1] HTML-Dokument herunterladen (Ghost liefert Seite aus)
    ├── ~50-200ms (Server-Response, TTFB)
    │
[2] HTML-Parser beginnt zu lesen
    │
    ├── trifft auf <script src="cdn.jsdelivr.net/npm/chart.js">
    │   ├── DNS-Lookup jsdelivr.net ............ ~20-80ms (Erstbesuch)
    │   ├── TCP + TLS Handshake ................ ~50-150ms (Erstbesuch)
    │   └── Download Chart.js (~60 KB gzip) .... ~30-100ms
    │       ├── Parse + Compile ................ ~20-50ms
    │       └── ▌▌▌ BLOCKING ▌▌▌ (kein type="module", kein defer!)
    │
[3] HTML-Parser liest weiter...
    │
    ├── trifft auf <script type="module" src="index.js">
    │   ├── Module sind implizit "defer" → NICHT blocking
    │   ├── Browser resolved Import-Baum:
    │   │   index.js → ChartEngine.js → [5 direkte Imports]
    │   │                                └── [je 2-4 Sub-Imports]
    │   │   Tiefe: 3 Ebenen, 17 Dateien total
    │   │   HTTP/2: Alle 17 parallel nach Discovery (~130 KB Quelle)
    │   └── Alle Module geladen + geparst ....... ~50-200ms (HTTP/2)
    │
[4] DOMContentLoaded feuert
    │
    ├── new ChartEngine() → FwRenderer._injectStyles() (CSS ins DOM)
    ├── ChartEngine.init()
    ├── querySelectorAll('.financial-chart-module')
    │
[5] Promise.all() — pro Container PARALLEL:
    │
    ├── Container 1:
    │   ├── showLoading() → Spinner sichtbar ...... ~0ms (synchron)
    │   ├── fetch(csv) ............................ ~20-80ms
    │   ├── parse + transform ..................... ~5ms
    │   └── requestAnimationFrame → new Chart() ... ~50-100ms
    │
    ├── Container 2: (parallel zu Container 1)
    │   └── ... identischer Ablauf ...
    │
    └── Container 3: (parallel)
        └── ... identischer Ablauf ...
```

### 1.2 Blocking Resources

| Resource | Blockiert was? | Dauer (geschätzt) |
|----------|---------------|-------------------|
| **Chart.js (CDN, sync)** | HTML-Parsing stoppt komplett | 100–380ms (Erstbesuch) |
| **17 ES6 Module** | Nicht blocking (defer implizit), aber verzögern DOMContentLoaded | 50–200ms (HTTP/2) |
| **CSS (injiziert)** | Kein externes Stylesheet → kein CSSOM-Block | 0ms |
| **Fonts** | Nicht von der Engine geladen → kein Block | 0ms (für die Engine) |

**Erkenntnis:** Der einzige echte Blocker ist das synchrone Chart.js-`<script>`-Tag. Es stoppt den HTML-Parser — der Browser kann nichts tun, bis Chart.js komplett heruntergeladen, geparst und ausgeführt ist.

### 1.3 Longest Chain (kritischer Pfad)

```
HTML-Download → Chart.js (sync, blocking) → Module-Resolution (17 Dateien)
→ DOMContentLoaded → CSV-Fetch → Chart.js Render
```

**Engpass-Kaskade bei Erstbesuch (kein Cache):**

| Schritt | 4G Mobile (~10 Mbit/s) | Desktop Breitband |
|---------|----------------------|-------------------|
| TTFB (Ghost-Server) | ~200ms | ~50ms |
| Chart.js DNS+TCP+TLS+Download | ~400ms | ~150ms |
| Module Resolution (17 Dateien) | ~300ms | ~100ms |
| DOMContentLoaded → init() | ~5ms | ~5ms |
| CSV-Fetch (2–10 KB) | ~100ms | ~30ms |
| Parse + Transform | ~5ms | ~5ms |
| Chart.js Rendering | ~100ms | ~50ms |
| **Gesamt bis erstes Chart sichtbar** | **~1.100ms** | **~390ms** |

**Beim zweiten Besuch (mit Cache):**

| Schritt | 4G Mobile | Desktop |
|---------|-----------|---------|
| TTFB | ~200ms | ~50ms |
| Chart.js (aus Cache) | ~20ms | ~10ms |
| Module (aus Cache) | ~50ms | ~20ms |
| CSV-Fetch + Parse | ~100ms | ~30ms |
| Chart.js Rendering | ~100ms | ~50ms |
| **Gesamt** | **~470ms** | **~160ms** |

### 1.4 Parallelisierbare Schritte

**Bereits parallel:**
- Alle Chart-Container werden via `Promise.all()` gleichzeitig verarbeitet (gut!)
- CSV-Fetches laufen parallel (gut!)
- `fetch(url, { priority: 'high' })` signalisiert dem Browser Priorität (gut!)

**Nicht parallel, aber parallelisierbar:**
- Chart.js-Download und Module-Resolution könnten überlappen (aktuell: Chart.js blockiert, Module warten)

---

## 2. Perceived Performance — Was sieht der Nutzer wann?

### 2.1 Zeitleiste der visuellen Enthüllung

```
ZEIT ──────────────────────────────────────────────────────►

[0ms]     Weißer Bildschirm (HTML wird geladen)
[50ms]    Blog-Text erscheint (First Contentful Paint)
          → Leser beginnt zu lesen ✓
[100ms]   Leere <div>-Container im Textfluss sichtbar
          → "Hier kommt was" (implizit durch Platz im Layout)
[~400ms]  DOMContentLoaded, Engine startet
          → Spinner erscheinen in allen Chart-Containern ✓
[~500ms]  CSV geladen, Chart-Chrome wird aufgebaut
          → Toolbar + Legende sichtbar (ohne Daten)
[~600ms]  Chart rendert (Canvas-Animation)
          → Erster Chart komplett sichtbar ✓

Wahrgenommene Wartezeit für den Leser: ~200ms
(Weil der Leser ab [50ms] Text liest und die Charts
erst bemerkt, wenn er/sie dorthin scrollt)
```

### 2.2 Bewertung der gefühlten Geschwindigkeit

**Was gut läuft:**

1. **Text-First:** Blog-Text erscheint sofort. Charts sind nie "above the fold" in einem Blogartikel — der Leser scrollt erst dorthin. Das ist der wichtigste Performance-Faktor.

2. **Spinner als Feedback:** `showLoading()` zeigt sofort einen Spinner, bevor der CSV-Fetch startet. Der Nutzer sieht nie einen "toten Moment" innerhalb des Containers.

3. **Parallele Hydration:** Bei 3 Charts erscheinen alle ~gleichzeitig (nicht nacheinander). Der Unterschied zwischen 1 und 3 Charts ist minimal (parallel, nicht seriell).

4. **Progressive Enthüllung:** Die Reihenfolge Text → Spinner → Toolbar → Chart ist kognitiv sauber. Jeder Schritt gibt mehr Information.

**Was problematisch sein könnte:**

1. **Leere Container vor DOMContentLoaded:** Zwischen HTML-Paint und Engine-Start sind die `<div>`-Container leer (kein Inhalt, nur ein Platzhalter). In einem langen Blogartikel ist das aber irrelevant — der Leser ist noch beim Text.

2. **Chart.js blockiert ALLES:** Während Chart.js synchron lädt (~100–400ms), passiert visuell nichts Neues. Aber: Der Blog-Text ist da, also liest der Leser. Diese "tote Zeit" ist versteckt.

### 2.3 Zusammenfassung: 1 Chart vs. 3 Charts

| Szenario | Wahrgenommener Unterschied |
|----------|--------------------------|
| 1 Chart | Nicht wahrnehmbar. Ein einzelner Fetch + Render. |
| 3 Charts | Nicht wahrnehmbar. Alle 3 parallel via Promise.all(). |
| 3 Charts, langsames Netz | Minimal. CSVs sind 2–10 KB, parallel. Der Flaschenhals ist Chart.js (einmal geladen, dreimal genutzt). |

**Fazit:** Die wahrgenommene Performance ist **ausgezeichnet** für einen Blog-Kontext. Der Leser wartet nicht auf Charts — er liest Text, und die Charts sind da, wenn er hinscrollt.

---

## 3. Ghost.io-spezifische Analyse

### 3.1 Aktueller Stand: Noch keine Ghost-Integration

Das Repository enthält **keine `.hbs`-Templates**. Die Engine wird aktuell in standalone HTML-Dateien getestet. Die Ghost-Integration steht noch aus.

### 3.2 Ghost Asset-Pipeline (was Ghost bietet)

| Feature | Ghost-Verhalten | Relevanz |
|---------|----------------|----------|
| **Caching** | `Cache-Control: max-age=31536000` (1 Jahr) für `/assets/`-Dateien | Hervorragend — Engine-Dateien werden nach erstem Besuch 1 Jahr gecacht |
| **Cache-Busting** | `{{asset}}`-Helper hängt `?v=hash` an URLs | Funktioniert, aber: Hash ist zufällig (nicht content-based), ändert sich bei jedem Ghost-Neustart |
| **Minification** | Keine automatische Minification | Engine-Dateien werden as-is ausgeliefert |
| **HTTP/2** | Nicht nativ — wird von nginx davor bereitgestellt | Standard-Setup via Ghost-CLI konfiguriert nginx + HTTP/2 automatisch |
| **Fingerprinting** | Kein Dateiname-Hashing (nur Query-String) | Einige CDN-Proxies ignorieren Query-Strings |

### 3.3 Empfohlene Ghost-Integration

**Script-Tags in `default.hbs` (Theme-Template):**

```handlebars
{{!-- Vor </body>: Chart.js (lokal) + Engine --}}
<script defer src="{{asset 'js/vendor/chart.umd.min.js'}}"></script>
<script type="module" src="{{asset 'js/fw-chart-engine/index.js'}}"></script>
```

**Wichtige Punkte:**
- Chart.js lokal in `assets/js/vendor/` (kein CDN, kein Preconnect nötig)
- `{{asset}}` für alle Dateien → automatisches Cache-Busting + korrekte Pfade
- `defer` statt synchronem Script für Chart.js

### 3.4 HTML-Cards im Ghost-Editor

Die `<div>`-Container mit `data-*`-Attributen werden über Ghost HTML-Cards eingebettet. Das ist architektonisch korrekt:

- HTML-Cards liefern **Daten** (Container mit Attributen)
- Engine-JavaScript kommt aus dem **Theme** (nicht aus den Cards)
- Kein `<script>` in HTML-Cards nötig (und Ghost führt diese auch nicht zuverlässig aus)

### 3.5 Cache-Strategie im Ghost-Betrieb

| Resource | Cache-Verhalten | Empfehlung |
|----------|----------------|------------|
| Engine JS (17 Module) | 1 Jahr via `{{asset}}` + Ghost-Caching | Optimal. Kein Handlungsbedarf. |
| Chart.js (lokal, `assets/js/vendor/`) | 1 Jahr via `{{asset}}` + Ghost-Caching | Optimal. Wie Engine JS. |
| CSV-Dateien | Browser-Default (Ghost-Server) | Akzeptabel (CSVs ändern sich selten) |
| CSS (inline injiziert) | Nicht cachebar (wird jedes Mal neu erzeugt) | Akzeptabel bei ~2 KB |

**Quellen:**
- Ghost Configuration Docs: https://docs.ghost.org/config
- Ghost Asset Helper: https://docs.ghost.org/themes/helpers/utility/asset
- GitHub Issue #9414 (Re-work asset hashes): https://github.com/TryGhost/Ghost/issues/9414

---

## 4. Die Bundler-Frage

### 4.1 Ist-Zustand

- 17 ES6-Module, ~130 KB Quellcode (unminifiziert)
- Kein Bundler, kein Build-Schritt
- Browser löst den Import-Baum nativ auf (type="module")
- Import-Baum-Tiefe: 3 Ebenen

### 4.2 Vier-Methoden-Analyse

**Mainstream (was die Performance-Literatur sagt):**

Die Performance-Community empfiehlt Bundling für Produktion. Paul Irish (Chrome-Team, 2018): *"Some of the brightest performance minds I know have tried to make loading unbundled ES modules fast. They have not yet succeeded."*

Benchmarks (sgom.es, 2017 — moment.js mit 105 Modulen):
- HTTP/2, unbundled: 2,0s vs. bundled: 0,67s (3x langsamer)
- HTTP/2 + preload, unbundled: 1,21s vs. bundled: 0,68s (1,8x langsamer)

ABER: Diese Benchmarks nutzen 105–334 Module, nicht 17.

**Via Negativa (was sollten wir NICHT tun?):**

Ein Build-System (Webpack, Rollup, Vite) für 3.500 Zeilen Code einzuführen bedeutet:
- Neue Abhängigkeit: Node.js, npm, Build-Tool, Konfiguration
- Neuer Fehlermodus: Build bricht, Versionen inkompatibel, npm audit-Warnungen
- Neuer Workflow: `npm run build` vor jedem Deploy
- Neue Komplexität: Source Maps für Debugging, Watch-Mode für Entwicklung

Was wir weglassen können: Den Bundler. Die 17 Module laden über HTTP/2 in ~50–200ms. Ein Bundle würde das auf ~30–80ms reduzieren. Die Differenz: **20–120ms**, versteckt hinter dem Blog-Text.

**Ockhams Rasiermesser:**

| Lösung | Komplexität | Performance-Gewinn |
|--------|------------|-------------------|
| Kein Bundler (Status quo) | Null | Basis |
| Rollup-Bundle (eine Datei) | Mittel (Build-Pipeline, Config, npm) | ~20–120ms |
| Manuelle Konkatenation | Niedrig (ein Script, keine Abhängigkeiten) | ~20–120ms |

Die einfachste Lösung ist: Kein Bundler. 130 KB über 17 Requests bei HTTP/2 sind für einen Blog akzeptabel.

**Devil's Advocate (warum ICH falsch liegen könnte):**

1. **HTTP/1.1-Fallback:** Wenn der Server kein HTTP/2 hat (unwahrscheinlich bei Ghost-CLI + nginx, aber möglich bei Fehlkonfiguration), sind 17 sequentielle Requests ein echtes Problem (~500ms+ extra).

2. **Minification fehlt:** Ohne Bundler gibt es auch keine automatische Minification. 130 KB Quellcode → ~65 KB minifiziert → ~20 KB gzip. Ohne Minification: 130 KB → ~35 KB gzip. Differenz: ~15 KB — bei einem Blog marginal, aber technisch suboptimal.

3. **Compression-Effizienz:** Gzip/Brotli komprimiert eine große Datei besser als 17 kleine (mehr Wiederholungsmuster). Der Overhead: geschätzt 10–20% größer als nötig.

### 4.3 Verdict: Bundler

**Empfehlung: Kein Bundler. Aber Version-Pinning und Preconnect sofort umsetzen.**

Der Performance-Gewinn eines Bundlers (20–120ms, einmalig beim Laden) rechtfertigt den Wartungsaufwand nicht. Die Engine ist 130 KB Quellcode — nicht 5 MB. Das Projekt hat einen Betreiber (nicht ein Entwicklerteam). Ein Build-System, das nur eine Person versteht und wartet, ist ein Risiko.

Die **einzige Ausnahme**: Wenn HTTP/1.1 statt HTTP/2 aktiv ist. Dann wäre Bundling sinnvoll. → Vorher HTTP/2 verifizieren (siehe Quick Wins).

**Aufwand: Groß (für den Gewinn unverhältnismäßig)**

**Quellen:**
- sgom.es (Module Loading Benchmark): https://sgom.es/posts/2017-06-30-ecmascript-module-loading-can-we-unbundle-yet/
- Chrome ES Module Bottleneck Analysis: https://docs.google.com/document/d/1ovo4PurT_1K4WFwN2MYmmgbLcr7v6DRQN67ESVA-wq0/pub
- Rolldown (Why Bundlers): https://rolldown.rs/in-depth/why-bundlers

---

## 5. Chart.js: CDN vs. Lokal vs. Tree-Shaking

### 5.1 Ist-Zustand

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

Keine Versionsnummer. jsDelivr liefert die neueste Version. Cache: 7 Tage.

### 5.2 Drei Optionen im Vergleich

#### Option A: CDN mit Version-Pinning (empfohlen)

```html
<script defer src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script>
```

| Pro | Contra |
|-----|--------|
| 1 Zeile Änderung | Third-Party-Abhängigkeit (jsDelivr muss online sein) |
| `immutable` + 1 Jahr Cache | Keine Tree-Shaking-Möglichkeit |
| Kein Build-System nötig | ~60 KB gzip statt ~50 KB (kein Tree-Shaking) |
| Edge-Server weltweit (schnell) | |

#### Option B: Lokal im Theme (Alternative)

```handlebars
<script defer src="{{asset 'js/vendor/chart.umd.min.js'}}"></script>
```

| Pro | Contra |
|-----|--------|
| Volle Kontrolle | Kein Edge-CDN (nur eigener Server) |
| Kein externer DNS/TCP/TLS | Manuelles Update bei neuen Chart.js-Versionen |
| Funktioniert offline | ~60 KB gzip (wie CDN, aber vom eigenen Server) |
| Ghost-Cache (1 Jahr + `?v=hash`) | |

#### Option C: Tree-Shaking (nur mit Bundler)

| Pro | Contra |
|-----|--------|
| Spart ~10–15 KB gzip | Erfordert Bundler (Rollup/Vite) |
| Nur genutzte Komponenten | Build-Pipeline nötig |
| | Wartungskosten hoch |

### 5.3 Vier-Methoden-Analyse

**Mainstream:**

Google empfiehlt seit 2020 Self-Hosting statt Third-Party-CDNs, weil Cache-Partitioning den Cross-Site-Cache-Vorteil eliminiert hat.

Addy Osmani (Chrome-Team): *"The shared cache benefit of third-party CDNs is effectively dead."*

**Via Negativa:**

Was wir NICHT tun sollten: Chart.js ohne Versionsnummer vom CDN laden. Das aktuelle Setup hat zwei Probleme:
1. **Kein deterministisches Caching:** jsDelivr cacht `@latest` nur 7 Tage (statt 1 Jahr bei exakter Version)
2. **Breaking Changes möglich:** Chart.js 5.x könnte die Engine brechen, ohne Vorwarnung

**Ockhams Rasiermesser:**

Die einfachste Verbesserung: Version an die URL anhängen. Eine Zahl, kein Build-System.

**Devil's Advocate:**

Gegen CDN mit Version-Pinning spricht: Wenn jsDelivr down ist (selten, aber möglich), laden keine Charts. Gegen lokal spricht: Der eigene Server hat kein globales Edge-Netzwerk. Für einen deutschen Blog mit primär deutschen Lesern ist das irrelevant.

### 5.4 Tree-Shaking: Lohnt es sich?

Die Engine nutzt: LineController, BarController, PieController (= DoughnutController), TimeScale, LinearScale, CategoryScale, Tooltip, Legend, PointElement, LineElement, BarElement, ArcElement.

Das ist der **Großteil von Chart.js**. Nicht genutzt werden: RadarController, ScatterController, BubbleController, RadialLinearScale, Filler-Plugin. Diese sind relativ klein.

Geschätzte Einsparung durch Tree-Shaking: **~10–15 KB gzip** (von ~60 KB auf ~45–50 KB).

**Verdict:** Tree-Shaking lohnt sich nicht. 10–15 KB Ersparnis bei gleichzeitiger Einführung eines Build-Systems (Rollup + Config + npm + Build-Script) ist ein schlechter Trade-off für ein Ein-Personen-Projekt.

### 5.5 Verdict: Chart.js-Strategie

> **Entscheidung (2026-02-17): Option B — Lokal im Theme.**
> Chart.js liegt bereits in `assets/js/vendor/chart.umd.min.js`.
> Gründe: Volle Kontrolle, DSGVO-konform (kein Third-Party-CDN),
> kein externer DNS/TCP/TLS-Overhead, Ghost-Cache (1 Jahr + `?v=hash`).
> Die CDN-Option (A) ist damit hinfällig.

**Anti-Empfehlung:** Tree-Shaking (Option C). Zu viel Aufwand für zu wenig Gewinn.

**Quellen:**
- Chart.js Integration Docs (Tree-Shaking): https://www.chartjs.org/docs/latest/getting-started/integration.html
- Addy Osmani (Cache Partitioning): https://addyosmani.com/blog/double-keyed-caching/
- Chrome Blog (HTTP Cache Partitioning): https://developer.chrome.com/blog/http-cache-partitioning
- jsDelivr Docs (Versioning): https://www.jsdelivr.com/documentation
- jsDelivr Issue #18532 (Major version pinning): https://github.com/jsdelivr/jsdelivr/issues/18532

---

## 6. Quick Wins (sofort umsetzbar, ohne Architekturänderung)

> **Korrektur (2026-02-17):** Quick Wins 1–3 wurden geschrieben, als Chart.js
> noch vom CDN geladen wurde. Entscheidung: Chart.js wird **lokal** gehostet
> (`assets/js/vendor/chart.umd.min.js`). Damit entfallen Versionspinning,
> SRI und Preconnect. `defer` wird in `default.hbs` beim Theme-Bau gesetzt.
> Die Hintergrund-Analyse (warum `defer` statt `async`, warum UMD) bleibt gültig.

### ~~Quick Win 1: Chart.js Version pinnen~~ — ENTFÄLLT

**Entfällt:** Chart.js liegt lokal in `assets/js/vendor/chart.umd.min.js`.
Version wird durch die lokale Datei kontrolliert, nicht durch CDN-URL.

---

### ~~Quick Win 2: Preconnect für CDN~~ — ENTFÄLLT

**Entfällt:** Kein CDN-Zugriff bei lokaler Datei.

---

### Quick Win 3: `defer` auf Chart.js — VERSCHOBEN auf Theme-Bau

Wird in `default.hbs` gesetzt, nicht in den HTML-Testdateien. Die technische
Analyse bleibt gültig:

- `defer` bewirkt: Chart.js wird **parallel zum HTML-Parsing** heruntergeladen
- Ausführung erst nach HTML-Parsing, aber vor DOMContentLoaded
- Die Engine (`type="module"`) ist ebenfalls defer → beide Scripts laufen in korrekter Reihenfolge

**Warum `defer` und nicht `async`?** `async` garantiert keine Reihenfolge — Chart.js könnte NACH der Engine ausgeführt werden. `defer` garantiert: erst Chart.js, dann Engine-Module.

**Ziel-Zeile in `default.hbs`:**
```handlebars
<script defer src="{{asset 'js/vendor/chart.umd.min.js'}}"></script>
<script type="module" src="{{asset 'js/fw-chart-engine/index.js'}}"></script>
```

---

### Quick Win 4: HTTP/2 verifizieren

**Prüfung:**
```bash
curl -sI https://[DOMAIN] | grep -i "http/"
```

Erwartet: `HTTP/2 200`. Wenn HTTP/1.1 → nginx-Konfiguration prüfen. Ghost-CLI konfiguriert HTTP/2 automatisch, aber nur wenn `ghost setup nginx` korrekt gelaufen ist.

**Wirkung:** Bei HTTP/2 laden die 17 Module parallel (kein Wasserfall). Bei HTTP/1.1 wäre Bundling plötzlich dringend nötig.

**Aufwand:** 1 Minute (Prüfung). Fix falls nötig: 30 Minuten (nginx-Config).

---

### Quick Win 5: Ghost `{{asset}}`-Helper für Engine-Dateien

Bei der Ghost-Integration:

```handlebars
<script type="module" src="{{asset 'js/fw-chart-engine/index.js'}}"></script>
```

**Wirkung:**
- Automatisches Cache-Busting (`?v=hash`)
- Korrekte Pfad-Auflösung (unabhängig von Ghost-Installationspfad)
- 1-Jahr-Caching im Produktionsmodus

**Hinweis:** Der `{{asset}}`-Helper wirkt nur auf die direkt referenzierte Datei (`index.js`). Die 16 importierten Module werden vom Browser über relative Pfade aufgelöst — ohne `?v=hash`. Das bedeutet: Bei einem Engine-Update könnte der Browser gecachte alte Module verwenden. **Lösung:** Nach Engine-Updates Ghost neu starten (invalidiert alle Asset-Hashes) oder manuell den Browser-Cache leeren.

**Aufwand:** Automatisch bei korrekter Ghost-Integration.

---

### Quick Win 6: `modulepreload` für kritische Module (optional)

```html
<link rel="modulepreload" href="/assets/js/fw-chart-engine/index.js">
<link rel="modulepreload" href="/assets/js/fw-chart-engine/core/ChartEngine.js">
```

**Wirkung:** Der Browser beginnt diese Module herunterzuladen, bevor er den Import-Baum entdeckt hat. Reduziert die Wasserfall-Tiefe um 1 Ebene.

**Via Negativa:** Bei nur 17 Modulen und HTTP/2 ist der Gewinn marginal (~20–50ms). Jede Zeile `modulepreload` ist manuell zu pflegen — bei 17 Modulen wird das unhandlich.

**Empfehlung:** Nur `index.js` und `ChartEngine.js` preloaden (die ersten zwei Ebenen). Nicht alle 17.

**Aufwand:** Klein (2–3 Zeilen HTML).

---

## 7. Priorisierte Empfehlungstabelle

| # | Empfehlung | Aufwand | Wirkung | Priorität |
|---|-----------|---------|---------|-----------|
| ~~1~~ | ~~Chart.js Version pinnen + `defer`~~ | — | — | **Entfällt** — Chart.js lokal (2026-02-17) |
| ~~2~~ | ~~`<link rel="preconnect">` für CDN~~ | — | — | **Entfällt** — kein CDN (2026-02-17) |
| 3 | **HTTP/2 verifizieren** | 1 Min | Bestätigt, dass 17 Module parallel laden | **Nach Deploy** |
| 4 | **`{{asset}}`-Helper bei Ghost-Integration** | Automatisch | Cache-Busting + 1-Jahr-Cache | **Bei Integration** |
| 5 | **`modulepreload` für index.js + ChartEngine.js** | 5 Min | ~20–50ms gespart | **Optional** |
| ~~6~~ | ~~Chart.js lokal hosten (statt CDN)~~ | — | — | **Erledigt** — `assets/js/vendor/chart.umd.min.js` (2026-02-17) |
| 7 | **Engine minifizieren (ohne Bundler)** | 30 Min | ~15 KB weniger Transfer (35 KB → 20 KB gzip) | **Nice-to-have** |
| 8 | **Bundler einführen** | 1–2 Tage | ~20–120ms Ladezeit gespart | **Nicht empfohlen** |
| 9 | **Chart.js Tree-Shaking** | 1–2 Tage | ~10–15 KB gespart | **Nicht empfohlen** |

---

## 8. Anti-Empfehlungen (Was wir NICHT tun sollten)

| Anti-Empfehlung | Warum verlockend? | Warum falsch für dieses Projekt? |
|----------------|-------------------|--------------------------------|
| **Service Worker** | "Offline-Fähigkeit! Instant Repeat Loads!" | Blog-Inhalte ändern sich. SW-Cache-Invalidierung ist komplex. Ghost hat kein SW-Tooling. Für einen Blog mit max 3 Charts pro Seite ist der Aufwand absurd. |
| **Code Splitting** | "Lade nur was gebraucht wird!" | 130 KB Quellcode. Davon sind ~80% bei jedem Chart-Typ nötig (Renderer, Scales, DateUtils, Theme). Es gibt nichts Sinnvolles abzuspalten. |
| **Lazy Loading der Engine selbst** | "Warum laden, wenn kein Chart auf der Seite?" | Wenn kein `.financial-chart-module` auf der Seite existiert, initialisiert die Engine nichts. Das "Lazy" ist bereits implizit: `querySelectorAll` findet 0 Container → 0 Arbeit. Das Script zu laden kostet ~35 KB gzip — weniger als ein typisches Artikelbild. |
| **Server-Side Rendering (SSR)** | "Charts als Bild vorrendern!" | Chart.js rendert auf Canvas — das erfordert einen Browser. SSR mit Puppeteer/Node-Canvas ist fragil, produziert statische Bilder (keine Interaktion), und ist für 1–3 Charts pro Seite massiv over-engineered. |
| **WebAssembly für CSV-Parsing** | "WASM ist schneller!" | CSV-Parsing dauert <5ms für 50 KB. Das ist schneller als ein einzelner Frame (16ms). WASM-Setup-Overhead wäre länger als das Parsing selbst. |
| **Intersection Observer (Lazy Chart Init)** | "Charts erst laden, wenn sichtbar!" | Klingt clever, hat aber UX-Kosten: Der Leser scrollt zum Chart und sieht... einen Spinner. Dann wartet er auf CSV-Fetch + Render. Bei 2–10 KB CSVs und paralleler Hydration ist eageres Laden besser — der Chart ist schon da, wenn der Leser ankommt. |
| **Prerender / Speculation Rules** | "Nächste Seite vorladen!" | Blog-Leser navigieren nicht vorhersagbar. Speculation Rules würden Charts auf Seiten vorrendern, die nie besucht werden. Verschwendete Bandbreite. |
| **Critical CSS Extraction** | "CSS im Head für schnelleren Paint!" | Die Engine injiziert CSS dynamisch (~2 KB). Es gibt kein externes Stylesheet. Critical-CSS-Extraktion hat kein Ziel. |
| **HTTP/3 (QUIC)** | "Noch schneller als HTTP/2!" | Erfordert Server-Konfiguration (nginx + QUIC-Modul). Für 17 kleine Dateien auf einem deutschen Server für deutsche Leser ist der Unterschied zu HTTP/2 nicht messbar. |
| **Font Subsetting für Charts** | "Nur genutzte Glyphen laden!" | Die Engine nutzt System-Fonts als Fallback. Font-Loading ist Sache des Ghost-Themes, nicht der Chart Engine. Subsetting für Zahlen + wenige Buchstaben spart ~5 KB — irrelevant neben einem 200-KB-Artikelbild. |

---

## Anhang A: Tiefe des Import-Baums (Wasserfall-Analyse)

```
Tiefe 0:  index.js
Tiefe 1:  ChartEngine.js
Tiefe 2:  CSVParser.js, FinanzwesirData.js,
          LineChartStrategy.js, BarChartStrategy.js, PieChartStrategy.js,
          FwRenderer.js
Tiefe 3:  BaseChartStrategy.js, FwTheme.js, FwSmartScales.js,
          FwSmartTooltips.js, FwDateUtils.js, FwFormatUtils.js,
          FwLayoutRules.js, FwSmartXAxis.js, FwSmartYAxis.js,
          FwDateAdapter.js, FwChartPlugins.js
```

**Maximale Wasserfall-Tiefe: 3** (index → ChartEngine → Strategy → SmartScales → SmartXAxis)

Eigentlich sind es 4 Ebenen, weil FwSmartScales auf Tiefe 3 noch FwSmartXAxis importiert. Aber: Nach Tiefe 2 sind alle Dateien auf Tiefe 3 parallel ladbar (HTTP/2). Die effektive Wasserfall-Tiefe ist **3 sequentielle Round-Trips** + 1 parallele Auflösung.

Bei ~30ms Round-Trip-Time (deutscher Server, deutscher Leser): 3 × 30ms = **~90ms** für die Module-Resolution. Das ist akzeptabel.

---

## Anhang B: Quellen-Verzeichnis

**Performance-Grundlagen:**
- Google Web Vitals: https://web.dev/vitals/
- Addy Osmani — Double-keyed Caching: https://addyosmani.com/blog/double-keyed-caching/
- Steve Souders — High Performance Web Sites (O'Reilly, 2007)
- Harry Roberts — csswizardry.com/2018/11/css-and-network-performance/

**ES-Module-Benchmarks:**
- sgom.es — Browser Module Loading: https://sgom.es/posts/2017-06-30-ecmascript-module-loading-can-we-unbundle-yet/
- Chrome ES Module Bottleneck Analysis: https://docs.google.com/document/d/1ovo4PurT_1K4WFwN2MYmmgbLcr7v6DRQN67ESVA-wq0/pub

**Cache-Partitioning:**
- Chrome Blog (HTTP Cache Partitioning): https://developer.chrome.com/blog/http-cache-partitioning
- Stefan Judis: https://www.stefanjudis.com/notes/say-goodbye-to-resource-caching-across-sites-and-domains/

**CDN & Versioning:**
- jsDelivr Docs: https://www.jsdelivr.com/documentation
- jsDelivr Issue #18532: https://github.com/jsdelivr/jsdelivr/issues/18532

**Ghost CMS:**
- Ghost Config Docs: https://docs.ghost.org/config
- Ghost Asset Helper: https://docs.ghost.org/themes/helpers/utility/asset
- Ghost Theme Structure: https://docs.ghost.org/themes/structure
- Ghost Code Injection: https://ghost.org/tutorials/use-code-injection-in-ghost/

**Chart.js:**
- Chart.js Tree-Shaking: https://www.chartjs.org/docs/latest/getting-started/integration.html
- Chart.js Bundle Analysis: https://github.com/chartjs/Chart.js/issues/10163

**Cache-Studien:**
- Yahoo Performance Research (2007): Browser Cache Usage
- Facebook Engineering (2015): Cache Efficiency Exercise — https://engineering.fb.com/2015/04/13/web/web-performance-cache-efficiency-exercise/

---

## KOCHBUCH: Umsetzungsanweisungen für die Ghost-Integration

> **Zielgruppe:** Ein LLM (oder Entwickler), das die Ghost-Theme-Integration
> der Chart Engine durchführt. Dieses Kochbuch ist die operative Ableitung
> aus der Analyse oben. Es sagt exakt, was zu tun ist und was nicht.

---

### TUN — Pflicht-Maßnahmen (in dieser Reihenfolge)

> **Korrektur (2026-02-17):** Schritte 1–2 (CDN-Versionspinning, Preconnect)
> sind gegenstandslos. Chart.js wird lokal gehostet. Schritt 3 (Engine
> über `{{asset}}`) und Schritt 4 (HTTP/2) bleiben gültig.
> Schritt 5 (Template-Platzierung) wurde auf lokale Datei aktualisiert.

#### ~~Schritt 1: Chart.js — Version pinnen + `defer`~~ — ENTFÄLLT

Chart.js liegt lokal in `assets/js/vendor/chart.umd.min.js`. Kein CDN.
`defer` wird in `default.hbs` gesetzt (siehe Schritt 5).

**Weiterhin gültige Regeln:**
- KEIN `async` (zerstört die Lade-Reihenfolge — Chart.js muss VOR der Engine ausgeführt werden)
- KEIN `type="module"` auf dem Chart.js-Tag (Chart.js ist UMD, kein ES-Module)

#### ~~Schritt 2: Preconnect für CDN~~ — ENTFÄLLT

Kein CDN-Zugriff bei lokaler Datei.

#### Schritt 3: Engine über `{{asset}}`-Helper einbinden

**Was:** Im Theme-Template, nach dem Chart.js-Script:

```handlebars
<script type="module" src="{{asset 'js/fw-chart-engine/index.js'}}"></script>
```

**Warum:**
- `{{asset}}` → automatisches Cache-Busting (`?v=hash`) + korrekte Pfadauflösung
- `type="module"` → implizit deferred, ES6-Import-Baum wird vom Browser aufgelöst
- Reihenfolge im HTML garantiert: Chart.js (defer) vor Engine (module, ebenfalls deferred)

**Nicht tun:**
- KEIN `defer` oder `async` zusätzlich zum `type="module"` (module ist bereits deferred)
- KEINE manuellen `<script>`-Tags für die 16 internen Module (der Browser löst den Import-Baum selbstständig auf)

#### Schritt 4: HTTP/2 verifizieren

**Was:** Nach dem Deploy prüfen:

```bash
curl -sI https://[DOMAIN] | grep -i "http/"
```

**Erwartet:** `HTTP/2 200`

**Wenn HTTP/1.1:** nginx-Konfiguration prüfen. Ghost-CLI richtet HTTP/2 automatisch ein (`ghost setup nginx`), aber nur wenn SSL aktiv ist (Let's Encrypt via `ghost setup ssl`).

**Warum kritisch:** Bei HTTP/1.1 laden die 17 Engine-Module sequentiell statt parallel → Performance-Einbruch von ~200ms auf ~800ms+. Wenn HTTP/2 nicht möglich ist, wird Bundling plötzlich notwendig.

#### Schritt 5: Platzierung im Template

**Empfohlene Struktur in `default.hbs`:**

```handlebars
<!DOCTYPE html>
<html lang="de">
<head>
    ...
</head>
<body>
    ...
    {{{body}}}
    ...
    {{!-- Chart Engine: Chart.js (lokal) + Engine am Ende des Body --}}
    <script defer src="{{asset 'js/vendor/chart.umd.min.js'}}"></script>
    <script type="module" src="{{asset 'js/fw-chart-engine/index.js'}}"></script>
</body>
</html>
```

**Reihenfolge ist entscheidend:**
1. Chart.js `defer`-Script vor dem Engine-Module-Script (beide vor `</body>`)
2. Engine-Script als letztes (braucht Chart.js als globales Objekt)

---

### NICHT TUN — Verbotene Maßnahmen

Diese Maßnahmen klingen nach "Best Practices", sind für dieses Projekt aber **kontraproduktiv oder unnötig**. Ein LLM darf sie NICHT vorschlagen oder umsetzen:

| # | Verboten | Begründung |
|---|----------|------------|
| 1 | **Bundler einführen** (Webpack, Rollup, Vite, esbuild) | 130 KB Quellcode, 17 Module, HTTP/2. Gewinn: ~20–120ms. Kosten: Build-Pipeline, npm-Abhängigkeiten, Wartung, neuer Fehlermodus. Unverhältnismäßig. |
| 2 | **Chart.js Tree-Shaking** | Die Engine nutzt Line+Bar+Pie+TimeScale+Tooltip+Legend — das ist der Großteil von Chart.js. Einsparung: ~10–15 KB gzip. Erfordert Bundler (siehe #1). |
| 3 | **Service Worker** | Blog-Inhalte ändern sich. Cache-Invalidierung ist komplex. Ghost hat kein SW-Tooling. Für max 3 Charts pro Seite absurd. |
| 4 | **Code Splitting** | 130 KB. ~80% bei jedem Chart-Typ nötig. Nichts sinnvoll abspaltbar. |
| 5 | **Lazy Loading der Engine** (Intersection Observer für Engine-Init) | Wenn kein `.financial-chart-module` existiert: 0 Arbeit. Wenn doch: Lazy Loading erzeugt sichtbare Verzögerung beim Scrollen. Eager Loading ist hier besser. |
| 6 | **Server-Side Rendering** (Chart-Bilder vorrendern) | Canvas erfordert Browser. SSR mit Puppeteer/Node-Canvas ist fragil, keine Interaktion, over-engineered. |
| 7 | **WebAssembly** für CSV-Parsing | Parsing dauert <5ms. WASM-Setup-Overhead wäre länger. |
| 8 | **Alle 17 Module per `modulepreload` auflisten** | Unhandlich, manuell zu pflegen, marginaler Gewinn. Maximal index.js + ChartEngine.js preloaden. |
| 9 | **Chart.js vom CDN laden** | Chart.js wird lokal gehostet (`assets/js/vendor/`). Kein CDN. DSGVO-konform, keine Third-Party-Abhängigkeit. |
| 10 | **`async` statt `defer` für Chart.js** | `async` garantiert keine Reihenfolge. Chart.js könnte NACH der Engine ausgeführt werden → Crash. |
| 11 | **Externe CSS-Datei für Chart-Styles erstellen** | Die Engine injiziert CSS dynamisch (~2 KB) via `_injectStyles()`. Das ist Absicht: Theme-Farben werden zur Laufzeit aus `FwTheme` gelesen. Ein externes Stylesheet würde diese Dynamik brechen. |
| 12 | **Engine-Dateien manuell konkatenieren** | Fragil, fehleranfällig, zerstört die Modul-Grenzen. Wenn Bundling nötig wird, dann richtig (Rollup), nicht manuell. |

---

### OPTIONAL — Nice-to-Have (niedrige Priorität)

| # | Maßnahme | Wann sinnvoll | Aufwand |
|---|----------|--------------|---------|
| 1 | `modulepreload` für `index.js` + `ChartEngine.js` | Wenn messbar langsam auf Mobile | 2 Zeilen HTML |
| 2 | Chart.js lokal hosten statt CDN | Wenn Third-Party-Abhängigkeit ein Concern ist | 15 Min (Datei kopieren, Pfad ändern) |
| 3 | Engine minifizieren (ohne Bundler, z.B. via terser CLI) | Wenn Transfergröße optimiert werden soll | 30 Min Setup |

---

### KONTEXT für das LLM

**Was ist die Finanzwesir Chart Engine?**
- Client-Side BI-Engine für einen deutschen Finanzblog
- 3 Chart-Typen: Line, Bar, Pie/Donut
- Max 3 Charts pro Seite
- ~3.500 Zeilen JavaScript, 17 ES6-Module, kein Bundler
- Abhängigkeit: Chart.js (~60 KB gzip), **lokal gehostet** in `assets/js/vendor/chart.umd.min.js`
- CMS: Ghost (selbst gehostet), Theme-Dateien in `/assets/`

**Was ist der Performance-Charakter?**
- Blog-First: Leser kommt wegen Text, nicht wegen Charts
- Charts sind nie above-the-fold
- Perceived Performance > Raw Performance
- Parallele Hydration bereits implementiert (Promise.all)
- Spinner-Feedback bereits implementiert (showLoading)
- CSV-Dateien sind winzig (2–50 KB)

**Was darf das LLM an der Engine ändern?**
- NICHT die 5-Layer-Architektur
- NICHT Layer 1 (CSVParser, FinanzwesirData) ohne explizite Begründung
- NICHT die fwContext-Grundstruktur
- NICHT die zentrale Zeit-Erkennung (FwDateUtils)
- Siehe `CLAUDE.md` für die vollständigen Architektur-Geländer
