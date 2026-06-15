Stand: 2026-06-09 | Autor: Claude Opus 4.7 | Status: Peer Review + eigene Weiterentwicklung

# OA-02 / B1 — Stellungnahme und Weiterentwicklung

**Gegenstand:** Peer Review der `OA-02-B1-architektur-herleitung-2026-06-09.md` (Sonnet 4.6, 2026-06-09) und Vorschlag einer überarbeiteten Lösungsskizze.

**Vorgeschichte:**
- `OA-02-chart-engine-integration-peer-review.md` (Sonnet 4.6, historisch, mit Deprecation-Banner)
- `OA-02-peer-review-claude-vs-perplexity-2026-06-09.md` (Claude Opus 4.7)
- ADR-COMP-ARCH-01 ist beschlossen.

---

## Kurzfassung

Die Herleitung ist in **vier Punkten ein echter Fortschritt** und in **zwei Punkten zu weich**. Alberts CSV-Korrektur trifft den Nagel auf den Kopf — der Slider ist tatsächlich nur ein weiterer Konfigurationsparameter, strukturell identisch zu `range:5y`. Die Wahl Option B (Simulation in app.js) ist mit dem Architecture Strategy Paper konsistent und für B1 die richtige Antwort. Aber: Der „Konsens" zu OA-02a (Scope als Pflichtparameter) ist eine Übernahme einer Behauptung, die in der vorherigen Stellungnahme **explizit als vertragsbrechend ausgewiesen** wurde — und der Bridge-Mechanismus (`renderFromData`) ist hand-waved an der Stelle, wo es interessant wird (Slider-Lifecycle, State-Bindung an den Container).

---

## TEIL A — Peer Review

### A.1 Was ich für richtig halte (Kongruenz)

**A.1.1 Alberts CSV-Korrektur ist analytisch sauber.**
Mein erster Peer Review hatte mit „B1 hat keine CSV" zu eng argumentiert. Der Punkt war falsch: Die historischen MSCI-World-Renditen sind sehr wohl eine CSV ([app.test.html:40](Apps/prokrastinations-preis/app.test.html:40), `msci-world-net-return-eur-monthly.csv`). Die Simulation ist eine **Funktion** über diesen Daten und dem Slider-Wert. Strukturell ist das identisch zu `range:5y`. Das hatte ich übersehen. Den Punkt nehme ich zurück.

**A.1.2 Die Wahl Option B (Simulation in app.js) ist robust begründet.**
Der wirklich starke Grund steht in §5 als „Vorteil 2": B1 braucht `depotwertHeute`, `eingezahlt` und `differenz` **jetzt schon** in `buildAppContext()` ([app.js:79-102](Apps/prokrastinations-preis/app.js:79)) für KPI-Karten und a11ySummary. Würde dieselbe Berechnung auch in einer `SparplanStrategy` leben, hätten wir entweder Doppelpflege oder müssten die KPI-Werte über `chart.meta` aus dem Chart-Output zurückholen. Das wäre umgedreht-falsch: Die App fragt den Renderer, was sie selbst berechnet hat. Option A würde die App-Datenführung umkehren.

**A.1.3 Die KDR-Lesart von Layer 3 ist korrekt.**
„Wandeln neutrale Daten in spezifische Chart-Konfigurationen um" ist mit Sparplan-Simulationslogik nicht vereinbar. Layer 3 ist Visualisierungs-Transformation, keine Finanzlogik. Das ist eine saubere Layer-1-bis-5-Anwendung.

**A.1.4 Die Bewertung gegen das Architecture Strategy Paper.**
§6 hält ehrlich fest, dass Option B die Vault-Invariante leicht erweitert: berechnete, versiegelte Datenstrukturen werden zur zweiten zulässigen Quelle neben CSVParser. Das ist eine ehrlich benannte Erweiterung, kein Bruch. Plus: `Object.freeze` greift weiterhin, der unidirektionale Fluss bleibt erhalten, die Strategy bleibt agnostisch gegenüber der Datenherkunft. Das ist sauber.

### A.2 Was ich für richtig halte, **aber stärker betonen würde**

**A.2.1 Multi-Konsumenten-Argument ist das Killer-Argument, nicht das Beiwerk.**
§5 listet das unter „Vorteile" — es ist aber das eigentliche Architekturargument. B1 hat **drei Konsumenten** derselben Simulationsergebnisse: SparplanChart, KpiCards, A11y-Summary. Jeder weitere App-Typ (Quiz, Calculator, Dashboard) wird dasselbe Muster haben: Eine Berechnung speist mehrere UI-Bausteine. Sobald die Berechnung in der ChartEngine sitzt, wird sie für alle Nicht-Chart-Konsumenten unerreichbar. Das macht Option B nicht nur sauber, sondern **alternativlos** für jede App mit mehr als nur einem Chart.

**A.2.2 Der FAANG-Block ist redundant.**
Amazon/Netflix/Google-Stilisierungen kommen alle zum gleichen Ergebnis, aber mit Argumenten, die schwächer sind als das Multi-Konsumenten-Argument. Drei Stimmen für denselben Befund klingen nach mehr Evidenz, sind aber genau eine. Würde ich kürzen.

### A.3 Was ich für zu weich oder falsch halte (Divergenz)

**A.3.1 BLOCKER: „OA-02a bereits konsentiert" ist eine unbewiesene Behauptung.**

§1 setzt voraus, dass `init(scope)` als **Pflichtparameter** konsentiert sei und verweist auf das parallele Peer-Review-Dokument. **Das parallele Peer-Review-Dokument argumentiert genau gegen Pflicht-Scope** und zwar mit drei harten Befunden:

- `APP-INTERFACE.md §3.2`: „Bestehender Vertrag — bleibt vollständig gültig"
- `ADR-COMP-ARCH-01`: „Bestehende Ghost-Card-Verträge (`financial-chart-module`) bleiben vollständig gültig"
- `fw-chart-engine/index.js`: Auto-Start ohne Parameter

§8 entkräftet das nur scheinbar: „Standalone-Charts: `engine.init(document)`". Damit ist `document` aber faktisch der Default — nur als Pflicht statt als Default-Argument zementiert. **Wenn der Caller den Default-Wert sowieso übergibt, ist der Unterschied zwischen `init(scope = document)` und Pflicht-`init(scope)` rein syntaktisch — und der Pflicht-Pfad bricht aktive Dateien (`index.js`, `Theme/index.html`) ohne erkennbaren Gewinn.**

Mein Befund: Der Konsens steht so nicht. Eine **optionale, additive** Scope-Erweiterung erreicht denselben semantischen Zweck (App-Fabrik-Apps können einen eigenen Scope übergeben) und bricht keine Verträge. Siehe Teil B.1 für meinen Gegenvorschlag.

**A.3.2 Bridge-Mechanismus C2 ist an der entscheidenden Stelle vage.**

§8 OA-02b skizziert C2:

> „Slider-Lifecycle: app.js hält Referenz auf `state` (oder Engine gibt Callback zurück) und ruft erneut `renderFromData()` bei jedem Slider-Tick auf"

Das sind zwei sehr unterschiedliche Architekturen:

| Variante | Konsequenz |
|---|---|
| app.js hält `state`-Referenz | App.js wird Engine-Intern bewusst. Bricht Kapselung. Smart-Update-Pfad wird ad-hoc rekonstruiert. |
| Engine gibt Handle zurück | Sauberer Vertrag. Engine bleibt SSoT für State. App.js sieht nur `update(newData)`/`destroy()`. |

Das sind nicht Varianten **einer** Lösung, das sind C2 und C3. §8 vermischt sie. Vor dem Slice-4-Gate muss eine klare Entscheidung getroffen werden. Mein Vorschlag (Teil B.2): **C2 mit zurückgegebenem Handle**. Das ist kleiner als ein eigenes `FwAppChart`-Modul, gibt aber die Kapselung, die ein sauberer Slider-Lifecycle braucht.

**A.3.3 Slider-Position ist keine offene Frage.**

§3, §8 deferieren: „Wo sitzt der Slider im DOM? Im `financial-chart-module` oder in der `fw-app`-Hülle?". Die Antwort steht bereits im Code: Der Slider wird heute in [app.js:155-177](Apps/prokrastinations-preis/app.js:155) gerendert und sitzt in `sliderSection`, einem App-Element außerhalb jedes Chart-Containers. Er ist eine **App-Control**, keine Chart-Toolbar. Diesen Punkt wieder zu öffnen, ist Scope-Drift. Konsequenz: app.js bindet den Slider-Event selbst und ruft `engine.update(handle, newData)` aus dem Handler. `_bindEvents()` in der Engine bleibt für range/view zuständig, bekommt **keine** `setMonthlyRate`-Action. Das hält den Engine-Vertrag eng.

**A.3.4 Smart-Update-Pfad wird unterschätzt.**

§4 stellt fest, dass `state.chartInstance.update()` „kostenlos" funktioniert — aber das ist nur wahr, **wenn** `renderFromData` so verdrahtet wird, dass es bei wiederholten Aufrufen denselben State-Container findet und in den Smart-Update-Zweig ([ChartEngine.js:173-181](Theme/assets/js/fw-chart-engine/core/ChartEngine.js:173)) eintritt. Das ist keine Selbstverständlichkeit der Engine; das muss spezifiziert werden. Sonst macht jeder Slider-Tick `new Chart()` + Canvas-Reset. Bei 120 Datenpunkten technisch machbar, aber Animation-Flacker garantiert.

**A.3.5 Verifikationsliste ist unvollständig.**

§8 nennt `detectRhythm()` und A11y. Code-Check:
- `detectRhythm()` mit SNAPSHOT-Semantik bucketet 25–35 Tage als MONTHLY ([FwDateUtils.js:139](Theme/assets/js/fw-chart-engine/core/FwDateUtils.js:139)). Synthetisch generierte Monatsdaten (28–31 Tage) fallen sauber rein. **Risiko geringer als befürchtet — Verifikation trotzdem Pflicht.**
- Was fehlt: `LineChartStrategy.transform()` auf rein synthetische, nicht-CSVParser-Daten. Sonnets ursprüngliche Frage „erwartet `transform()` implizit, dass Rows aus CSVParser kommen?" ist nicht beantwortet. Konkret: erwartet sie `metadata.unitKey`-Setzung (CSVParser füllt z.B. `CURRENCY_EUR`)? Erwartet sie eine spezifische Row-Form (`row.date` als Date-Objekt mit Noon-Anchor)?
- Performance des Smart-Update bei 120 Punkten + Slider mit z.B. 16ms-Debounce. Nicht erwähnt.
- Was passiert, wenn der App-Container vor Engine-Init noch im Loading-State ist (z.B. CSV laden während App-Bootstrap)? Race Condition zwischen `engine.init(document)` (Auto-Start) und `engine.renderFromData(...)` (App-Aufruf) noch nicht gedacht.

**A.3.6 Vault-Erweiterung sollte explizit benannt werden.**

§6 schreibt: „Vault-Befüllung kommt nicht mehr nur aus CSV, sondern auch aus verarbeiteter Berechnung. Widerspricht dem Geist des Papers nicht — das Paper kennt die App-Fabrik noch nicht." Das ist freundlich formuliert, aber eine ADR-würdige Erweiterung der Vault-Invariante. Mein Vorschlag (Teil B.3): kleines „ADR-VAULT-EXTENSION-01" oder Ergänzung in `CHART_ENGINE_ROLE_AND_INTEGRATION.md` — sonst entsteht in der nächsten LLM-Session wieder Kontextdrift.

---

## TEIL B — Eigene Weiterentwicklung

Aus dem Befund leite ich vier konkrete Vorschläge ab. Jeder ist klein genug, um einzeln durchgewunken werden zu können.

### B.1 Vorschlag: `init(scope = document)` als optionaler Parameter, **nicht** Pflicht

**Vertragsaussage:**

```js
async init(scope = document) {
  const containers = scope.querySelectorAll('.financial-chart-module');
  // ... unverändert
}
```

**Was das löst:**

| Anforderung | Pflicht-Scope | Optional-Scope |
|---|---|---|
| App-Fabrik-App kann lokal scannen lassen | ✅ | ✅ |
| `fw-chart-engine/index.js` Auto-Start funktioniert | ❌ (muss geändert werden) | ✅ |
| `APP-INTERFACE.md §3.2` (standalone Cards) hält | ⚠️ (nur wenn jemand `init(document)` aufruft) | ✅ |
| `Theme/index.html` Testsuite läuft | ❌ (muss geändert werden) | ✅ |
| Caller kann „nur dieser Bereich" sagen | ✅ | ✅ |

**Vorteil:** Drei aktive Dateien werden nicht gebrochen, der App-Fabrik-Anwendungsfall wird trotzdem ermöglicht.

**Realer Anwendungsfall in B1:** Vermutlich **gar nicht** — siehe B.2. App-Fabrik-Apps werden in der Regel `renderFromData()` direkt aufrufen, **nicht** über `init(scope)` den Container scannen lassen. Der Scope-Parameter wird dann zur Vorsichts-Erweiterung für später, nicht zum Pflicht-Eintritt für B1.

**Konsequenz:** OA-02a ist als Pflichtparameter zu verwerfen, als Default-Parameter zu beschließen. Eine Zeile Code-Änderung in `ChartEngine.js`. Kein Eingriff in `index.js`, `index.html` oder das `financial-chart-module`-Markup.

### B.2 Vorschlag: `renderFromData()` gibt ein Handle zurück, nicht nur einen Effekt

**Vertragsaussage:**

```js
class ChartEngine {
  /**
   * Rendert einen Chart aus bereits berechneten Daten.
   * Bei wiederholtem Aufruf mit demselben Handle: Smart Update (chart.update()).
   * @returns {ChartHandle}
   */
  renderFromData(container, data, type, options = {}) { ... }
}

interface ChartHandle {
  update(newData, newOptions = {}): void;   // Smart Update via chart.update()
  destroy(): void;                           // chart.destroy(), Listener weg, DOM räumen
  readonly container: HTMLElement;
}
```

**Was das löst:**

1. **Slider-Lifecycle ist explizit modelliert.** app.js hält das Handle, ruft im Slider-`input` Listener `handle.update(newSeries)`. Der Smart-Update-Pfad (`chart.update()`) wird genutzt, weil das Handle intern auf `state.chartInstance` zeigt. Kein Canvas-Neuaufbau, kein Flackern.
2. **Engine bleibt SSoT für State.** App.js sieht keinen `state`-Container, keine `_draw()`-Innereien. Die Kapselung steht.
3. **`destroy()` ist ein expliziter Vertrag.** Beim Container-Wechsel (z.B. App wird in Ghost ausgetauscht, Tab-Wechsel mit Lazy-Mount) kann sauber abgebaut werden — Chart.js-Instanzen leaken sonst Listener.
4. **Spätere C3-Extraktion ist trivial.** Wenn Pilot-2 zeigt, dass mehrere Apps denselben Lifecycle-Code haben, wird das in ein `FwAppChart` extrahiert, das intern das Handle nutzt. C2 ist die Basis, C3 wird der Convenience-Layer.

**Implementierungs-Skizze:**

```js
renderFromData(container, data, type, options = {}) {
  const strategy = this.strategies[type];
  if (!strategy) throw new Error(`Chart-Typ '${type}' unbekannt.`);
  if (!(data instanceof FinanzwesirData)) throw new Error('Erwarte FinanzwesirData-Instanz.');

  const viewOptions = strategy.getViewOptions(data);
  const state = {
    data, strategy, type,
    config: { colors: options.colors || {}, options: options.optionsString || '', title: options.title || '' },
    range: options.range || 'max',
    view: options.view || (viewOptions[0] && viewOptions[0].key) || '',
    viewOptions,
    benchmark: options.benchmark || null,
    chartInstance: null,
  };
  this._draw(container, state);

  return {
    container,
    update: (newData, newOptions = {}) => {
      state.data = newData;
      if (newOptions.range) state.range = newOptions.range;
      if (newOptions.view)  state.view  = newOptions.view;
      this._draw(container, state);   // Smart-Update-Zweig greift, weil state.chartInstance gesetzt
    },
    destroy: () => {
      state.chartInstance && state.chartInstance.destroy();
      state.chartInstance = null;
      container.replaceChildren();
    },
  };
}
```

**Aufrufseite (B1 Slice 4):**

```js
const chartHandle = engine.renderFromData(chartEl, asFinanzwesirData(chartSeries), 'line', { ... });

slider.addEventListener('input', () => {
  const rate = clamp(parseInt(slider.value, 10), 50, 2000);
  const ctx = buildAppContext(appData, rate, startBetrag);
  chartHandle.update(asFinanzwesirData(ctx.chartSeries));
  updateKpiCards(rate);    // bestehender Pfad
});
```

`asFinanzwesirData(chartSeries)` ist eine kleine Hilfsfunktion in app.js (oder besser: in einem App-Fabrik-Utility), die das versiegelte Objekt baut.

**Aufwand:** ~50 Zeilen `renderFromData()` + ~15 Zeilen `asFinanzwesirData()`. Kleiner als ein eigenes `FwAppChart`-Modul, kapselt aber den Lifecycle vollständig.

### B.3 Vorschlag: Vault-Invariante schriftlich erweitern

`FinanzwesirData` ist heute eine öffentliche Klasse mit unbescholtenem Konstruktor ([FinanzwesirData.js:18-58](Theme/assets/js/fw-chart-engine/data/FinanzwesirData.js:18)). Das ist nicht durch CSVParser gebunden. Der Vault-Vertrag im Architecture Strategy Paper sagt aber: „Alle Rohdaten (**aus der CSV**) landen in einem zentralen, streng bewachten Speicher". Das stimmt mit der Implementierung nicht mehr überein, sobald Option B greift.

**Vorschlag:** In `CHART_ENGINE_ROLE_AND_INTEGRATION.md` einen neuen Absatz „Vault-Befüllung" einziehen, der zwei zulässige Produzenten benennt:

> Der Vault (`FinanzwesirData`) akzeptiert Daten aus genau zwei Quellen:
> 1. **CSVParser** (Layer 1): externe Datenquellen, validiert, versiegelt.
> 2. **App-Berechnung** (Layer-1-Erweiterung für App-Fabrik): von einer App-Strategie berechnete Reihen, die als `FinanzwesirData` versiegelt und über `renderFromData()` übergeben werden.
>
> Beide Produzenten garantieren denselben Shape-Vertrag: `columns`, `rows`, `metadata.unitKey`. Beide unterliegen `Object.freeze`. Die Strategy (Layer 3) ist gegenüber der Herkunft der Daten **agnostisch**.

Das schließt die Lücke, die Sonnet in §6 ehrlich offen gelegt hat, ohne sie zu nennen. Drei Sätze Doku, kein Code.

### B.4 Vorschlag: Verifikations-Gate vor Slice-4-Implementierung

Konkrete Tests, die als Bedingung vor dem Slice-4-Start dokumentiert werden:

| ID | Verifikation | Wo | Geschätzter Aufwand |
|---|---|---|---|
| V1 | `detectRhythm` mit 120 synthetischen Monatszeitstempeln (28–31-Tage-Varianz) → `MONTHLY` | Test-HTML in `Apps/prokrastinations-preis/test-data/` | 30 min |
| V2 | `LineChartStrategy.transform(syntheticData, { range: 'max', view: '...' })` rendert ohne Fehler | Test-HTML | 30 min |
| V3 | `getA11yData()` Ergebnis wird durch `FwRenderer._renderA11yTable()` tatsächlich in DOM injiziert | DevTools-Check | 15 min |
| V4 | `renderFromData()` Smart-Update-Zweig wird bei zweitem Aufruf erreicht (state.chartInstance bleibt erhalten) | Console-Log oder Breakpoint | 15 min |
| V5 | Slider-Tick @ 60Hz mit Smart Update bleibt < 16ms (Chrome DevTools Performance) | DevTools | 30 min |

Reihenfolge: V1 → V2 → V4 zuerst (Pre-Conditions für die Architektur). V3 und V5 können parallel laufen. Kein V grün → Slice 4 nicht starten.

### B.5 Vorschlag: Markup-Vertrag für In-App-Charts klären

Eine versteckte Frage, die nirgendwo entschieden ist: Welches HTML-Markup hat der Chart-Container **innerhalb** einer `fw-app`-Hülle?

Drei Optionen:

| Option | HTML | Konsequenz |
|---|---|---|
| **M1** | `<div class="financial-chart-module" data-type="line">` ohne `data-csv` | Wiederverwendet bestehendes Klassen-Markup. Risiko: Wenn jemand `engine.init(document)` aufruft und der Container kein `data-csv` hat, wirft `_processContainer` „data-csv fehlt". |
| **M2** | `<div class="fw-app__chart" data-type="line">` (eigenes App-Markup) | Sauber getrennt. `init(document)` ignoriert ihn. App-Code muss aber selbst den Container finden und übergeben. |
| **M3** | Kein Markup, app.js erzeugt `<canvas>` zur Laufzeit und übergibt | Mehr Imperativität in app.js. Kein Markup-Vertrag für Redakteure (aber Redakteure sehen ja sowieso nur `fw-app`). |

**Mein Vorschlag: M2.** Eigenes Klassen-Markup `fw-app__chart` (oder `fw-chart`). Begründung:
- Trennt den globalen Auto-Scan klar vom App-internen Chart. `init(document)` findet ihn nicht und versucht nicht, ihn als CSV-Chart zu verarbeiten.
- Hält den `financial-chart-module`-Vertrag (§3.2) konstant: das ist und bleibt der **standalone**-Chart-Vertrag mit `data-csv`.
- Macht den Pfad in B1 schreibbar: app.js sucht `this.container.querySelector('.fw-app__chart')`, übergibt an `engine.renderFromData()`.

Konsequenz für `APP-INTERFACE.md`: §3.2 bleibt unverändert, §4 bekommt einen neuen Absatz, der das App-internalisierte Chart-Markup `fw-app__chart` einführt.

---

## TEIL C — Konsolidierte Empfehlung

Drei Entscheidungen, eine Verifikations-Pflicht, eine Doku-Ergänzung:

1. **OA-02a: `init(scope = document)` als Default-Parameter**, nicht Pflicht. Eine Zeile Code. Bricht nichts. (B.1)
2. **OA-02b: `renderFromData(container, data, type, options)` returns ChartHandle.** ~50 Zeilen Engine-Code, ~15 Zeilen App-Helper. Kein eigenes `FwAppChart`-Modul. (B.2)
3. **Chart-Markup im App-Kontext: `fw-app__chart`-Klasse**, distinkt vom `financial-chart-module`. (B.5)
4. **Verifikations-Gate V1–V5 grün vor Slice-4-Start.** (B.4)
5. **`CHART_ENGINE_ROLE_AND_INTEGRATION.md`** um Vault-Erweiterung ergänzen (3 Sätze). (B.3)

Aufwand-Schätzung gesamt: **~2 Tage** für Engine-Änderungen + Slice 4. Vorab ein halber Tag für V1–V5.

Was hingegen **nicht** in diesem Schritt entschieden werden muss:
- `FwAppChart`-Wrapper-Modul (C3): warten auf Pilot-2.
- Export-Fassade (`fw-chart-engine/index.js` als Re-Export): das wäre eine andere Datei als der heutige Auto-Starter — Begriffsverwechselung in Sonnets altem Dokument. Nicht jetzt.
- Card-/Map-Renderer als eigene Komponentenklassen: durch Bedarf.

---

## TEIL D — Drei harte Befunde in einer Zeile

1. **Albert hat in der CSV-Frage recht** — die Korrektur kippt meinen ersten Peer-Review-Punkt; die Option-B-Wahl steht damit fest.
2. **„OA-02a konsentiert" steht so nicht** — Pflicht-Scope bricht §3.2/index.js/index.html; Default-Scope löst dasselbe Problem ohne Brüche.
3. **C2 muss ein Handle zurückgeben**, sonst zerfällt der Slider-Lifecycle in undokumentierte Engine-Innereien.
