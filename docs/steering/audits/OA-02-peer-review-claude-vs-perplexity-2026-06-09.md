Stand: 2026-06-09 | Reviewer: Claude Sonnet 4.6 | Status: Arbeitsfassung für Alberts Entscheidung zu OA-02

# OA-02 — Peer Review: Perplexity-Analyse vs. Claude-Befund

---

## Grundlage dieses Reviews

Für diesen Review wurden gelesen:

| Dokument | Relevanz |
|---|---|
| Perplexity-Briefing (von Albert, 2026-06-09) | Primäre Vergleichsquelle |
| `docs/steering/audits/OA-02-chart-engine-integration-peer-review.md` | Historischer Peer-Review (vor ADR-COMP-ARCH-01) |
| `docs/steering/audits/ADR-COMP-ARCH-01-component-composition-architecture.md` | Verbindliche Architekturentscheidung |
| `docs/spec/APP-INTERFACE.md` (§4) | Interner Entwicklervertrag — heute noch offen |
| `docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md` (§1a) | Component Composition Architecture |
| `docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md` | Rolle der Chart-Engine |
| `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` | Aktueller Code (V3.14.0) |

---

## 1. Kongruenz — Wo beide Analysen übereinstimmen

### 1.1 Component Composition Architecture ist das richtige Modell

Volle Kongruenz. Perplexity formuliert es klar: "Die App ist das Brett, Komponenten sind die Steine, Engines sind Spezialwerkzeuge." ADR-COMP-ARCH-01 und `03_APP_FACTORY_STANDARD_DRAFT.md` §1a sagen dasselbe. Sowohl der historische Peer-Review als auch Perplexity landen nach Korrekturdurchlauf an diesem Punkt.

Keine Abweichung.

### 1.2 Chart-Engine bleibt Single Source of Truth für Chart-Komponenten

Kongruenz. Beide bestätigen: ChartEngine ist nicht die App-Fabrik, sondern das Subsystem für Chart-Komponenten. Charts sind keine Sonder-Apps. Die Architektur-Dokumente belegen das einstimmig.

### 1.3 Kein zweiter Rendering-Pfad

Kongruenz. Perplexity und der historische Peer-Review sind sich einig: Option A (Canvas direkt) und Option B (Chart.js direkt in app.js) scheiden aus, weil sie einen zweiten Rendering-Pfad erzeugen — Styling-Drift, doppelte Pflege. Das ist projektintern nicht vertretbar.

### 1.4 Keine Abwärtskompatibilität

Kongruenz. Kein optionaler `scope`-Fallback auf `document`. Ein Pflichtparameter erzwingt das neue Architekturmodell konsequent. Der historische Peer-Review hat diesen Punkt nicht explizit gemacht — Perplexity tut es, und das ist richtig.

---

## 2. Abweichungen — Wo die Positionen auseinandergehen

### 2.1 Das technische Kernproblem: Scope vs. Datenpipeline [KRITISCH]

**Perplexity:** "Das eigentliche Problem sitzt allein im heutigen globalen DOM-Scan in `ChartEngine.init()` — nicht in der Datenpipeline, nicht in den fünf Layern."

**Historischer Peer-Review:** Das Problem ist zweiteilig:
1. Globaler DOM-Scan (Scope — Perplexity hat Recht)
2. **Datenpipeline-Mismatch**: B1's SparplanChart hat keine CSV-Datei. Die Daten werden durch den Slider dynamisch berechnet. Die Engine akzeptiert ausschließlich CSV-URLs.

Der zweite Punkt ist der Kern von OA-02 aus dem historischen Review, und er fehlt in Perplexitys Analyse vollständig.

**Code-Beleg aus ChartEngine.js, _processContainer() Zeile 96–103:**
```js
var csvUrl = container.dataset.csv;
if (!csvUrl) throw new Error("data-csv fehlt");
var data = await this.parser.parse(csvUrl, { expectDate: isTimeSeries });
```

Die Engine verlangt einen `data-csv`-Attribut mit einer URL. Hardkodiert, kein Fallback, kein alternativer Dateneinstieg.

**B1's tatsächlicher Datenpfad:**
```
Slider → app.js → MarketTimeStrategy.compute() → chartSeries[]
```

Es gibt keine statische CSV-Datei für simulierte Sparplan-Entwicklungen. Sie kann nicht existieren: die Simulation läuft vollständig client-seitig, der Depotwert hängt von den Slider-Werten ab (monatliche Rate, Laufzeit).

**Fazit:** Perplexitys Scope-Lösung (`init(scope)`) löst das Scope-Problem, nicht das Datenpipeline-Problem. Eine App, die `init(scope)` aufruft, übergibt nur einen Suchbereich. Die Engine sucht darin nach `.financial-chart-module`-Containern mit `data-csv`. Wenn B1 einen solchen Container erzeugt, bräuchte er eine echte CSV-URL — die es für dynamisch berechnete Daten nicht gibt.

**Warum Perplexity das übersehen hat:** Das Briefing-Dokument verschweigt diesen Aspekt. Der Satz "der bestehende Datenflow bleibt erhalten" klingt nach einer Lösung, ist aber eine Wunschannahme, die für B1 nicht gilt.

---

### 2.2 Slider-Update-Lifecycle fehlt bei Perplexity

**Perplexity:** Erwähnt den Slider-Lifecycle nicht.

**Historischer Peer-Review:** Als Schlüsselanforderung explizit aufgeführt:
- Slider-Änderung → Chart neu rendern (Echtzeit)
- `chart.destroy() + new Chart()` vs. `chart.data = …; chart.update()` — welcher Weg ist bei 120 Datenpunkten performant?
- C3's `render() / update(newSeries) / destroy()`-Lifecycle war direkt darauf ausgerichtet

Die Scope-Lösung adressiert den Slider-Lifecycle überhaupt nicht. Sie gibt keinen Mechanismus, den Slider-State an eine Chart-Instanz zu binden.

**Code-Befund: Smart-Update-Pfad bereits vorhanden (ChartEngine.js Zeile 173–181):**
```js
if (state.chartInstance) {
    state.chartInstance.data = chartConfig.data;
    state.chartInstance.options = chartConfig.options;
    this._updateUIState(container, state);
    this._updateLegend(container, chartConfig, meta.interactiveFilters, state);
    state.chartInstance.update();
}
```

Dieser Pfad existiert seit V3.2.0 ("Smart Updates"). Er aktualisiert einen Chart ohne Canvas-Zerstörung. Für Slider-Updates hochrelevant: kein Flackern, keine Performance-Einbußen. Die Scope-Lösung gibt B1 keinen Zugriff auf diesen Mechanismus.

---

### 2.3 Abwärtskompatibilität: Richtige Schlussfolgerung, lückenhafte Begründung

**Perplexity:** Keine Abwärtskompatibilität nötig, weil Standalone-Charts nur prototypisch auf Demo-Seiten existieren.

**Befund aus APP-INTERFACE.md §3.2:** Der bestehende Chart-Engine-Vertrag (`financial-chart-module`) "bleibt vollständig gültig, wird nicht auf fw-app migriert." D.h. Standalone-Charts bleiben ein offizieller Redakteursvertrag — kein reines Demo-Artefakt.

Der Pflichtparameter ist trotzdem richtig, aber die Begründung muss präziser sein: Das Theme-Bootstrap-Skript muss für Standalone-Charts `init(document)` und für Apps `init(appContainer)` aufrufen können. Kein optionaler Fallback — aber die Caller-Seite muss die Unterscheidung explizit machen. Das fehlt in Perplexitys Analyse.

---

## 3. Was Perplexity gefunden hat, was der historische Review übersehen hatte

### 3.1 Präzisere konzeptuelle Rahmung — für den richtigen Teilfall

Der historische Review fragte: "Wie bekommt eine App ihre Daten in die Engine?" Das ist schon zu nah an einer Lösung und blendet eine wichtige Variante aus.

Perplexity fragt: "Wie weist eine App der Engine einen Suchbereich zu?" Das ist die sauberere Problemdefinition für den Teilfall, in dem eine App einen traditionellen CSV-basierten Chart als Komponente enthält — also z.B. eine Story-App, die historische Renditedaten als Chart zeigt.

**Für diesen Teilfall ist die Scope-Lösung tatsächlich die einfachste, cleanste und vollständige Lösung.** Kein neues Modul, keine neue Klasse, nur ein geänderter Suchbereich.

Der historische Peer-Review hat diesen Teilfall durch seinen B1-Fokus nicht explizit sauber getrennt. Das ist eine echte Lücke.

### 3.2 `scope` als Parametername — bessere Begründung

Der historische Review diskutierte Naming nicht. Perplexity begründet, warum `scope` präziser ist als `appContainer`, `root` oder `container`: Es beschreibt die Funktion (Suchbereich), nicht die Herkunft (App-Container). Das ist eine robuste, zukunftsfähige Argumentation.

**Konkret:** Ein Scope kann künftig auch ein Shadow-DOM-Root oder ein iFrame-Element sein — der Name trägt diese Flexibilität. `appContainer` würde das nicht. Ich schließe mich dieser Begründung vorbehaltlos an.

### 3.3 Archivierungsproblem als Strukturartefakt benannt

Perplexity benennt explizit, dass historische Dokumente Kontextdrift erzeugen. Das ist nicht neu (das historische Review trägt bereits den Warning-Banner), aber es als eigenständiges Strukturproblem zu rahmen — nicht nur als redaktionelles Qualitätsproblem — ist eine nützliche Ergänzung.

---

## 4. Was der historische Review gefunden hat, was Perplexity übersehen hat

### 4.1 Das Datenpipeline-Problem von B1 — die Scope-Lösung ist unvollständig

Ausführlich in §2.1 begründet. Der entscheidende Befund:

Die Scope-Lösung (`init(scope)`) reicht für B1's SparplanChart nicht aus, weil die Daten nicht aus einer CSV-URL kommen, sondern aus einer Echtzeit-Simulation. Die Engine hat keinen Einstiegspunkt für dynamisch berechnete Daten.

Für B1 braucht es neben dem Scope mindestens eine dieser Ergänzungen:
- **C2:** `renderFromData(container, finanzwesirData, type, options)` in ChartEngine.js — sauber, minimal, Full-Gate-pflichtig
- **C3:** `FwAppChart`-Wrapper mit render/update/destroy-Lifecycle — sauberer für Mehrfach-App-Szenarien, einmalig mehr Aufwand

### 4.2 Smart-Update-Infrastruktur existiert bereits — und kann genutzt werden

Der historische Review fragte, ob `destroy() + new Chart()` performant genug sei. Die Antwort aus dem Code: Die Engine hat den Smart-Update-Pfad seit V3.2.0 (Zeile 173–181). 120 Datenpunkte, `chart.update()` statt Canvas-Neuaufbau — das ist für Slider-UX ausreichend.

C2 oder C3 könnten diesen Pfad nutzen, indem sie den `state`-Mechanismus der Engine übernehmen oder nachbauen. Die Scope-Lösung gibt keinen Zugang dazu.

### 4.3 `detectRhythm()` mit MONTHLY-Daten — unverifiziertes Risiko

Der historische Review hat explizit als Pflicht-Verifikation markiert: Ist `detectRhythm()` mit synthetisch generierten Monatsdaten (28–31-Tage-Varianz) stabil? Das MONTHLY-Bucket muss diese Varianz korrekt erkennen.

Perplexity erwähnt das nicht. Es bleibt eine offene Pflicht-Verifikation vor jeder Implementierung, die berechnete Monatsdaten durch die Chart-Engine laufen lässt — unabhängig davon, welche OA-02-Option gewählt wird.

### 4.4 A11y-Implementierungslücke ist noch offen

Der historische Review hat gemeldet: `getA11yData()` existiert in den Strategien, aber es war unklar, ob das Ergebnis tatsächlich korrekt in den DOM injiziert wird. Perplexity adressiert das nicht. Die Lücke ist noch zu verifizieren.

---

## 5. Syntheseempfehlung

### 5.1 Die Scope-Lösung ist richtig — für den richtigen Teilfall

Perplexity beschreibt die korrekte Lösung für Apps, die CSV-basierte Charts als Komponenten enthalten. `init(scope)` ist dort minimal, korrekt und ohne überflüssige Abstraktion.

Dieser Teilfall existiert im Projekt und wird mit dem Wachstum der App-Fabrik wichtiger: Story-Apps, Dashboards mit externer Datenpipeline, alle Apps der Familie 4.6 (Chart-/Datenvisualisierung).

### 5.2 B1's SparplanChart braucht Datenpipeline + Scope

Für B1 braucht es beides:
1. **Scope** (`init(scope)`): App kontrolliert Suchbereich — Perplexity-Lösung, richtig
2. **Datenpipeline**: App liefert berechnete Daten an den Chart — historischer Review, C2 oder C3

Die einfachste Kombinationslösung für B1:
- `init(scope)` für Apps mit CSV-Charts
- `renderFromData(container, finanzwesirData, type, options)` für Apps mit berechneten Daten (C2-Variante)

C3 (FwAppChart) ist sauberer für Mehrfach-App-Szenarien. Falls nach Pilot-2 weitere Apps denselben Bedarf haben, ist C3 die natürliche Extraktion. Netflix-Prinzip: Jetzt C2, nach Pilot-2 auf C3 hochziehen, wenn der Schmerz real ist.

### 5.3 OA-02 in zwei Teile zerlegen

| Teil | Frage | Empfehlung |
|---|---|---|
| OA-02a | Wie sieht der Suchbereich aus? | `init(scope)` als Pflichtparameter — Perplexity-Lösung |
| OA-02b | Wie kommen berechnete Daten in die Engine? | C2 (`renderFromData`) für B1's Slider-Simulation |

OA-02a ist durch Perplexity gut gelöst. OA-02b ist noch offen; der historische Peer-Review bleibt dafür die relevantere Analyse.

### 5.4 Was nicht entschieden werden muss (jetzt)

- Export-Fassade (`fw-chart-engine/index.js`): Nicht jetzt. Kein Nutzen bis C3 existiert.
- C4 (DataSource-Abstraktion): Overengineering für ein Einpersonen-Blog. Bleibt ausgeschlossen.
- Abwärtskompatibilitäts-Fallback: Kein optionaler `scope`-Fallback — Pflichtparameter bleibt.

---

## 6. Antworten auf Perplexitys offene Fragen

Perplexity stellt 5 offene Fragen. Antworten aus Projektsicht:

**Frage 1: "Ist die Umdeutung von OA-02 in ein Scope-/Container-Problem fachlich überzeugend?"**

Teilweise. Für Apps mit CSV-basierten Charts: ja, vollständig überzeugend. Für B1 mit dynamisch berechnetem Chart: nein — zu kurz gedacht. Die Umdeutung ist ein Gewinn, löst aber nicht das vollständige Problem.

**Frage 2: "Reicht die Änderung an `ChartEngine.init()` tatsächlich aus?"**

Nein. Für B1 fehlt der Datenpipeline-Einstieg. Seiteneffekte mit Toolbar-Events, Legend und Ghost-Einbettung sind durch den bestehenden State-Mechanismus beherrschbar, wenn der State korrekt an den Caller übergeben wird.

**Frage 3: "Sollte `financial-chart-module` als internes Markup innerhalb von `fw-app` bestehen bleiben?"**

Ja. APP-INTERFACE.md §3.2 ist eindeutig: "bleibt vollständig gültig, wird nicht auf fw-app migriert." Der Redakteursvertrag ändert sich nicht. Intern unterscheidet sich nur der Suchbereich (scope vs. document).

**Frage 4: "Ist `scope` der beste Parametername?"**

Ja. Perplexitys Begründung ist überzeugend und ich schließe mich ihr an.

**Frage 5: "Welche minimale Dokumentationsänderung genügt?"**

APP-INTERFACE.md §4 muss konkretisiert werden. Minimaler Inhalt:
- OA-02a (Scope): `init(scope: HTMLElement): Promise<void>` — Signatur, Verhalten, Fehlerbedingung (kein DOM-Element → Fehler, kein Fallback auf `document`)
- OA-02b (Datenpipeline): Entscheidung C2 oder C3 dokumentieren; Lifecycle für berechnete Daten (`renderFromData` oder FwAppChart-Vertrag)

---

## 7. Gesamtbewertung

| Dimension | Perplexity | Historischer Peer-Review |
|---|---|---|
| Architekturmodell (COMP-ARCH-01) | ✅ korrekt | ✅ korrekt (nachträglich korrigiert) |
| Problemdefinition Scope | ✅ präziser und vollständiger | ⚠️ weniger explizit für diesen Teilfall |
| Datenpipeline-Problem B1 | ❌ nicht gesehen | ✅ klar benannt und analysiert |
| Slider-Update-Lifecycle | ❌ fehlt | ✅ als Schlüsselanforderung erkannt |
| Parametername `scope` | ✅ besser begründet | — (nicht thematisiert) |
| Abwärtskompatibilität | ✅ richtig (Pflichtparameter) | — (nicht explizit) |
| detectRhythm()-Risiko | ❌ fehlt | ✅ als Pflicht-Verifikation markiert |
| A11y-Lücke | ❌ fehlt | ✅ gemeldet |

**Fazit:** Perplexity liefert eine saubere, gedanklich stimmige Lösung für den Teilfall "App mit CSV-basiertem Chart als Komponente". Für B1's SparplanChart — den Anlass des ursprünglichen OA-02 — ist die Analyse unvollständig, weil sie das Datenpipeline-Problem nicht sieht.

Beide Analysen zusammen ergeben ein vollständiges Bild. Keine von beiden allein reicht für eine sichere Implementierungsentscheidung.

---

## 8. Empfohlene nächste Schritte

1. **OA-02a entscheiden:** `init(scope)` als Pflichtparameter — Perplexity-Lösung. Full-Gate auf ChartEngine.js. Signatur und Fehlerbedingungen festlegen.

2. **OA-02b entscheiden:** C2 (`renderFromData`) für B1's Slider-Simulation — oder C3 wenn nach Pilot-2 Extraktion sinnvoll. Albert entscheidet; Basis: historischer Peer-Review §4 (C2) und §5 (Analytische Linsen).

3. **detectRhythm()-Verifikation:** Vor Implementierung prüfen, ob MONTHLY-Zeitstempel mit 28–31-Tage-Varianz stabil erkannt werden.

4. **APP-INTERFACE.md §4 aktualisieren:** Sobald beide Teile entschieden — Entwicklervertrag konkretisieren.

5. **A11y-Lücke klären:** Wurde `getA11yData()`-Output korrekt in den DOM injiziert? Vor dem Slice-4-Gate prüfen.
