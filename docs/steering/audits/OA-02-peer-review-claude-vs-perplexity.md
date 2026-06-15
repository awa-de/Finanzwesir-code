Stand: 2026-06-09 | Autor: Claude Opus 4.7 | Status: Peer Review des Perplexity-Briefings

# OA-02 Peer Review — Claude vs. Perplexity

**Gegenstand:** Peer Review des Perplexity-Briefings „OA-02 Peer Review Briefing — Chart-Engine, Component Composition und Scope-Entscheidung"

**Quellen geprüft:**
- [docs/steering/audits/ADR-COMP-ARCH-01-component-composition-architecture.md](../ADR-COMP-ARCH-01-component-composition-architecture.md)
- [docs/spec/APP-INTERFACE.md](../../spec/APP-INTERFACE.md)
- [docs/steering/audits/OA-02-chart-engine-integration-peer-review.md](./OA-02-chart-engine-integration-peer-review.md) (Sonnet 4.6, historisch)
- [docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md](../../App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md) §1a
- [docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md](../../App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md)
- [docs/App-Fabrik/02_OPEN_QUESTIONS.md](../../App-Fabrik/02_OPEN_QUESTIONS.md) (Arch-03)
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js`
- `Theme/assets/js/fw-chart-engine/core/FwRenderer.js`
- `Theme/assets/js/fw-chart-engine/index.js`
- `Theme/index.html`
- `Apps/prokrastinations-preis/app.js`
- `Apps/prokrastinations-preis/app.test.html`
- `Apps/prokrastinations-preis/APP_SPEC.md` §17
- `Apps/prokrastinations-preis/SLICE_PLAN.md`

---

## Kurzfassung

Perplexitys konzeptioneller Schritt ist richtig: Charts sind Komponenten, nicht App-Typen. Der daraus abgeleitete technische Vorschlag — `ChartEngine.init(scope)` als Pflichtparameter — ist aber **nicht ausreichend, um OA-02 zu schließen, und an drei Stellen sogar im Widerspruch zu bereits beschlossenen Verträgen**. Der zentrale Datenpfad-Engpass von B1 wird nicht adressiert. Das Briefing verwechselt „Sucheinstieg" mit „Datenintegration".

---

## 1. Wo ich Perplexity zustimme (Kongruenz)

**1.1 Reframing über Component Composition Architecture.** ADR-COMP-ARCH-01 ist eindeutig, und `03_APP_FACTORY_STANDARD_DRAFT.md §1a` kodifiziert das Modell ausdrücklich („App = Brett, Komponenten = Steine, Engines = Spezialwerkzeuge"). Perplexitys Hauptbotschaft — die ChartEngine ist Subsystem, nicht App-Fabrik — stimmt mit ADR-COMP-ARCH-01 wörtlich überein.

**1.2 Verwerfen des alten C1/C2/C3-Framings.** Das alte Sonnet-Peer-Review trägt selbst einen Deprecation-Banner. Perplexity hat Recht: C1/C2/C3 wurden im falschen mentalen Modell gedacht — aber nur teilweise (siehe 2.4).

**1.3 `scope` als Name.** Wenn ein Suchbereich übergeben werden müsste, wäre `scope` linguistisch ehrlicher als `appContainer`. Das ist aber, wie wir gleich sehen, nicht die eigentliche Frage.

**1.4 CSVParser/Layer 1 unberührt lassen.** Korrekt und durch `CHART_ENGINE_ROLE_AND_INTEGRATION.md` bindend abgesichert.

---

## 2. Wo ich abweiche (Divergenz) — begründet

### 2.1 BLOCKER: Perplexity bricht beschlossene Verträge

Perplexity argumentiert: „Keine Abwärtskompatibilität gewünscht … Die alten Solo-Charts existieren nur prototypisch auf Demo-Seiten; es gibt keine produktiven Ghost-Seiten, die geschützt werden müssten."

Das ist **falsch**. Drei Quellen sagen das Gegenteil:

- `APP-INTERFACE.md §3.2`: „Bestehender Vertrag — **bleibt vollständig gültig**, wird nicht auf fw-app migriert."
- `APP-INTERFACE.md §3.2 Regeln`: „Die Chart-Engine wird vorerst nicht auf den fw-app-Namespace migriert."
- `ADR-COMP-ARCH-01` (Konsequenzen): „Bestehende Ghost-Card-Verträge (`financial-chart-module`) bleiben vollständig gültig."

Wenn `init(scope)` ein **Pflichtparameter** wird, beantworten Sie bitte: **Wer übergibt den Scope, wenn ein Redakteur in Ghost eine standalone `<div class="financial-chart-module">`-Card einfügt — ohne `fw-app`-Hülle?** Niemand. Damit fällt der von §3.2 garantierte Vertrag.

### 2.2 BLOCKER: Auto-Start in `fw-chart-engine/index.js` wird verschwiegen

Das Briefing erwähnt diese Datei mit keinem Wort, obwohl die Deprecation-Notiz im alten Sonnet-Dokument explizit warnt. Die Datei sieht heute so aus:

```js
import { ChartEngine } from './core/ChartEngine.js';

// Auto-Start wenn DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.FinanzwesirChartEngine = new ChartEngine();
    window.FinanzwesirChartEngine.init();   // ohne Argument
});
```

Diese Datei wird von `Theme/index.html:418` geladen (FwSmartXAxis-Testsuite) und ist der reguläre Einstieg auch in Ghost. Macht man `init(scope)` zur Pflicht, **bricht die einzige existierende Bootstrap-Stelle der Engine**. Perplexity behauptet „ein einziger zukunftsfähiger Einstieg" — der existierende Einstieg wird dabei stillschweigend zerstört.

### 2.3 BLOCKER: Das eigentliche OA-02-Problem wird umgangen

Das ist der schwerwiegendste Punkt. Perplexity schreibt: „Der bestehende Datenflow über CSVParser und die Chart-Layer bleibt erhalten; daran soll nichts Grundsätzliches geändert werden." Und: „nicht primär … neuer Chart-Weg, sondern wie die bestehende Chart-Engine als Subsystem … sauber angesprochen wird."

Aber B1s Realität ist:

- `APP_SPEC.md §17`: SparplanChart bekommt seine Daten aus `chartSeries`, einer **im Browser berechneten Reihe** (`app.js:66-75`, Funktion `marketTimeStrategy`).
- Diese Reihe ändert sich live bei jeder Slider-Bewegung (`app.js:204-217`).
- Es gibt **keine CSV-URL** für diese Reihe — sie existiert nur im Speicher.
- `CSVParser` ist URL-only mit Whitelist (`finanzwesir.com`/`localhost`) und steht unter Layer-1-TABU.

Der bestehende Pfad CSVParser → Strategy → FwRenderer ist also **gerade nicht** der Pfad, den B1 nutzen kann. Genau das war der Grund, warum Sonnet C1/C2/C3 überhaupt formuliert hat — nicht weil Charts ein „Sondertyp" waren, sondern weil **In-Memory-Daten nicht in den vorhandenen Eintritt passen**. Perplexitys Scope-Vorschlag löst dieses Problem **kein bisschen**: Auch in einem App-Scope sucht die Engine nach `data-csv`-URLs, die für SparplanChart nicht existieren.

`init(scope)` ist eine Antwort auf eine Frage, die niemand gestellt hat. Die ungelöste Frage ist nach wie vor: **„Wie kommt eine in der App berechnete Datenreihe in die Chart-Engine?"** ADR-COMP-ARCH-01 hält das ausdrücklich als offen fest: „OA-02: Welche Bibliothek und Integrationsform für Chart-Komponenten? — Offen".

### 2.4 Fehler in der Logik des „Sonnet war im falschen Modell" Arguments

Perplexitys Begründung gegen C1/C2/C3:

> „C1/C2/C3 wirkten plausibel, solange implizit noch im Modell ‚App-Chart als Sonderfall' gedacht wurde."

Das ist ein non-sequitur. C1 (synthetisches `FinanzwesirData`), C2 (`renderFromData()`) und C3 (`FwAppChart`-Wrapper) sind **keine** Antworten auf „App = Chart-Sonderfall". Sie sind drei verschiedene Antworten auf **„wie injiziert eine App in-memory berechnete Daten in eine Chart-Komponente"**. Diese Frage existiert unabhängig vom mentalen Modell. ADR-COMP-ARCH-01 ändert nicht die Existenz der Frage — sie ändert nur die Sprache, mit der wir sie stellen (Chart-Komponente statt App-Chart). Die drei technischen Optionen sind weiter auf dem Tisch.

### 2.5 Versteckte Seiteneffekte, die Perplexity selbst erwähnt, aber nicht prüft

Perplexity fragt in §8.2: „gibt es versteckte Seiteneffekte im Zusammenspiel mit FwRenderer, Toolbar-Events, Legende oder Ghost-Einbettung?". Sie fragt — beantwortet aber nicht. Befunde aus dem Code:

- **FwRenderer injiziert globale Styles im Konstruktor.** `FwRenderer.js:30-31` ruft `_injectStyles()`, das per `document.head.appendChild` ein `<style id="fw-chart-styles">` hängt (`FwRenderer.js:462-465`). Idempotent (Singleton-Guard auf Zeile 397), aber **das passiert bereits bei `new ChartEngine()`** — vor jedem `init(scope)`. Der „reine Suchraum"-Begriff ist dadurch unvollständig.
- **Popover/Backdrop am `document.body`.** `FwRenderer.js:237-238`. Bei mehreren Apps mit jeweils eigenem Scope teilen sich diese Popovers den globalen DOM-Slot. Funktioniert (Singleton), aber war im Briefing nicht geprüft.
- **`showLoading` benutzt `innerHTML = ''`** (`FwRenderer.js:39`). Leer ist harmlos, aber wenn jemand C2/C3 implementiert und Container teilt, ist das ein Punkt zum mitdenken.

### 2.6 Slider-Lebenszyklus bleibt ungelöst

`ChartEngine._draw()` hat einen exzellenten Smart-Update-Pfad (`ChartEngine.js:173-181`) — aber der setzt voraus, dass `state.chartInstance` existiert und die App den State-Container kennt. Die heutige Engine baut State **intern** in `_processContainer` und gibt **kein Handle** zurück. Scope-Ansatz hin oder her: ohne ein App-zugängliches Re-Render-Interface (`update(newSeries)`) gibt es für B1s Slider nur `destroy() + new Chart()`. Das war Sonnets korrekter Kernpunkt — Perplexity hat ihn nicht entkräftet, sondern stillschweigend übergangen.

---

## 3. Was Perplexity gefunden hat und ich (in der Vorgeschichte) übersah

**3.1 Konsequente sprachliche Anpassung.** Sonnet 4.6 redete weiter von „App-Charts" und einer impliziten Sonderbehandlung, obwohl ADR-COMP-ARCH-01 das untersagte. Perplexity hat das Vokabular sauber angepasst — „Chart-Komponente innerhalb einer App-Komposition". Das ist sprachlich präzise und wird zukünftige LLM-Konversationen weniger anfällig für Kontextdrift machen.

**3.2 Erkennen, dass das alte OA-02-Dokument als Implementierungsanweisung nicht mehr taugt.** Auch wenn das schon in dessen eigenem Header stand, ist es wichtig, das Briefing explizit als „historischer Input" einzustufen.

**3.3 Name `scope` vs. `appContainer`.** Wenn überhaupt ein Pflichtparameter eingeführt wird, ist `scope` der robustere Name. Das ist ein kleiner, aber valider Beitrag.

---

## 4. Was ich finde, das Perplexity übersieht

In Kürze, weil oben schon im Detail begründet:

1. **Auto-Start-Datei `index.js`** (Bootstrap-Bruch).
2. **§3.2-Vertrag** in APP-INTERFACE.md (standalone Ghost-Cards bleiben aktiv).
3. **In-Memory-Datenpfad fehlt** — das eigentliche OA-02-Problem.
4. **Kein App-zugängliches Re-Render-Handle** für Slider-Updates.
5. **Konstruktor-Seiteneffekte** in `FwRenderer` (globale Styles, Popover-Layer).
6. **`getA11yData`-Lücke**: Sonnets Schlussabschnitt (§7) flaggte, dass A11y-Daten zwar von der Strategy bereitgestellt werden, aber unsicher ist, ob der Renderer sie wirklich in den DOM injiziert. Perplexity hat diese Verifikation ersatzlos gestrichen — das ist aber eine OA-02-relevante Pflichtprüfung.
7. **B1 ist Pilot-1, kein Greenfield.** Slice 4 (SparplanChart) ist die nächste Lieferung (`SLICE_PLAN.md:27`). Eine Scope-Refactor-Entscheidung, die `data-csv`-Charts global bricht, wäre für das aktive Pilotprojekt eine Sackgasse.

---

## 5. Empfehlung — was OA-02 wirklich zu entscheiden hat

Die ehrliche Trennung ist:

| Teilfrage | Wer beantwortet das wirklich? | Status |
|---|---|---|
| Wo lebt die Chart-Komponente im Modell? | ADR-COMP-ARCH-01 | ✅ entschieden |
| Wer ist Single Source of Truth fürs Rendern? | ChartEngine | ✅ entschieden |
| Wie gelangen **in-Speicher berechnete Daten** in die Engine? | OA-02 | ❌ **immer noch offen** |
| Wie wird live aktualisiert (Slider)? | OA-02 | ❌ offen |
| Wie wird das **bestehende `financial-chart-module`-Markup** weiter bedient? | §3.2 — bleibt | ✅ entschieden — nicht antasten |
| Sollte `init()` ein optionales Scope-Argument bekommen? | Refactor-Frage, **separat von OA-02** | sinnvoll, aber **nur optional** und additiv |

Konkreter Vorschlag für das Re-Briefing:

- **OA-02 wieder schärfen auf den Datenintegrationsvertrag.** Die Optionen lauten nach wie vor: synthetisches `FinanzwesirData` (C1), `renderFromData()`-API (C2) oder `FwAppChart`-Wrapper (C3) — diesmal aber im Vokabular der Chart-Komponente, nicht des „App-Charts".
- **Scope-Argument höchstens additiv:** `init(scope = document)` mit Default. Das hält §3.2 und die Auto-Start-Datei am Leben **und** erlaubt App-lokale Sucheinstiege, falls sie überhaupt nötig werden. Pflichtparameter bricht aktive Verträge ohne Gewinn.
- **Slider-Update-Pfad explizit modellieren:** entweder ein öffentliches Handle (`engine.renderFromData(...)` returnt eine Instanz mit `.update()/destroy()`), oder ein eigenes App-Wrapper-Objekt. Ohne dieses Element ist B1 Slice 4 nicht realisierbar.
- **Vor Implementierung verifizieren** (steht schon korrekt in §7.3 des alten Dokuments und fehlt bei Perplexity): synthetisches `FinanzwesirData` durch `detectRhythm()` mit MONTHLY-Daten + `getA11yData`-DOM-Injektionspfad.

---

## 6. Fazit für den Projektinhaber

Perplexitys Briefing ist als **konzeptioneller Aufräumakt** wertvoll und korrekt — es bringt den Sprachgebrauch endlich in Linie mit ADR-COMP-ARCH-01.

Als **technische Empfehlung für OA-02** ist es jedoch unvollständig und teils widersprüchlich zu beschlossenen Verträgen. Insbesondere löst es das tatsächliche Engineering-Problem — In-Memory-Daten von B1 in die ChartEngine — nicht, und der vorgeschlagene Pflicht-Scope würde aktive Verträge brechen.

Mein Rat: Den konzeptionellen Teil (Charts = Komponenten, Engine = Subsystem) übernehmen, den technischen Teil (`init(scope)` als Pflicht) verwerfen oder zu einer optionalen, additiven Änderung degradieren, und OA-02 wieder auf den Datenintegrationsvertrag fokussieren — diesmal im richtigen Vokabular.

---

## 7. Drei harte Befunde in einer Zeile

1. `init(scope)` als Pflicht bricht `APP-INTERFACE.md §3.2` und `ADR-COMP-ARCH-01`.
2. Der Auto-Start in `fw-chart-engine/index.js` bricht durch denselben Eingriff.
3. Die eigentliche OA-02-Frage — In-Memory-`chartSeries` aus `app.js` in die Engine bringen — bleibt unbeantwortet.
