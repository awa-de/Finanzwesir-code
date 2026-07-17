# Schicht 3 — Projektspezifischer Kontext: fw-chart-engine

> Gilt NUR für das Finanzwesir Chart Engine Projekt.
> Stack: Vanilla JavaScript (ES Modules, .js), Browser-Frontend,
> keine Build-Pipeline im Dev-Betrieb, Chart.js als Visualisierungsbibliothek.
>
> Für ein neues Projekt: Diese Datei vollständig ersetzen.

---

## Tabu-Zonen — Rückfrage ZWINGEND vor jeder Änderung

| Datei / Bereich | Regel |
|---|---|
| `CSVParser.js` (Layer 1) | Einziger erlaubter Eingriff: URL-Validierung (bereits implementiert). Vor jeder weiteren Änderung explizit beim User rückfragen. |
| `sanitize()`-Methode | NICHT löschen — wird in `renderA11yTable` verwendet. |
| Layer-Grenzen allgemein | Layer 1 (Datenschicht) wird nicht von Layer 3/5 direkt manipuliert. |

---

## Bindende Reihenfolgen — nicht verschieben, nicht refactoren

| Reihenfolge | Begründung |
|---|---|
| `FwTheme.init()` MUSS vor `new FwRenderer()` aufgerufen werden | `FwRenderer` ruft `injectStyles()` im Konstruktor auf. Ohne `init()` enthält `this.theme.colors` Fallback-Hex-Werte — kein Console-Fehler, schwer zu debuggen. |
| Chart.js MUSS vor der Chart-Engine geladen werden (`defer` in `post.hbs`) | Engine setzt `Chart` als globale Variable voraus. |

---

## Etablierte Patterns — konsistent halten, nicht neu erfinden

| Pattern | Wo | Regel |
|---|---|---|
| Table-Driven Strategy | `PERIOD_TABLE_M`, `SNAPSHOT_TABLES` in `FwSmartXAxis.js` | Alle Zeitintervall-Entscheidungen laufen über diese Tabellen. Kein paralleles if/else-System daneben. |
| `_anchorByUnit()` als generischer Helper | `FwSmartXAxis.js` | Neue Anchor-Modi hier ergänzen — keine parallele Methode erfinden. |
| `meta`-Rucksack für Modul-Kommunikation | `ChartEngine.js` → Strategien → Renderer | Datenweitergabe zwischen Modulen immer über benannte Objekte im `meta`-Rucksack. Nie über Positional Arrays oder globale Variablen. |
| Token-System für Farben | `FwTheme.js` | Jeder CI/UI-Hex-Wert ist ein Token. Mathematische Konstanten und Logik-Werte sind keine Tokens. |

---

## Explizite Verbote — bereits entschieden, nicht nochmal diskutieren

| Verbot | Begründung |
|---|---|
| KEIN `contain: layout` auf `.financial-chart-module` | Bricht Container Queries der Engine (Architekturentscheidung E3). |
| KEIN `async` statt `defer` für Chart.js | Zerstört Ladereihenfolge — Chart.js muss vor der Engine ausgeführt werden. |
| KEIN Bundler (Webpack/Rollup/Vite) im Dev-Betrieb | 130 KB über HTTP/2 ist kein Problem; Wartungskosten übersteigen den Gewinn. |
| KEIN Tree-Shaking für Chart.js | Engine nutzt den Großteil der Library; Einsparung nur 10–15 KB. |
| KEIN `innerHTML` mit variablem Inhalt | `showError`/`showLoading` in `FwRenderer` nutzen `createElement` + `textContent` (Security-Fix AP-2). |
| KEIN `DOMPurify`, KEINE CSP-Erzwingung im Code | Bewusste Architekturentscheidung — Defense-in-Depth auf anderem Layer. |
| Hex-Werte außerhalb von `screen.css :root` und `FwTheme.js` | Einzige Wahrheitsquelle für Farben ist `screen.css :root`. `FwTheme.js` liest dort nach. Kein dritter Ort. |

---

## Einzige Wahrheitsquellen

| Thema | Einzige Quelle |
|---|---|
| Brand-Farben (Hex-Werte) | `screen.css :root` |
| Token-Mapping (CSS-Var → JS-Name) | `FwTheme.js` |
| Zeitintervall-Logik | `PERIOD_TABLE_M` / `SNAPSHOT_TABLES` in `FwSmartXAxis.js` |
| Domain-Whitelist für CSV-Fetch | `CSVParser.js` (eine Zeile, nicht duplizieren) |
