# AP-prokrast-03b — Rubikon-Reveal Architekturvorschläge und Peer-Review-Dossier Ergebnis

## Status

GRÜN

## Kurzbefund

Der Rubikon-Reveal (Übergang, nicht nur Endzustand) ist mit hoher Sicherheit ohne Engine-/Plugin-Änderung baubar. Entscheidender neuer Fund in diesem AP: `ChartEngine.js` besitzt seit B1-AP-15b einen „Smart Update"-Mechanismus (Zeilen 355–391) — ein zweiter `renderFromData()`-Aufruf auf demselben Container zerstört den Chart nicht neu, sondern ruft `state.chartInstance.update(this._prefersReducedMotion() ? 'none' : undefined)` (Zeile 363). Reduced Motion wird dabei **automatisch auf Engine-Ebene** geprüft (`_prefersReducedMotion()`, Zeile 477–484) — für die Achsen-/Linienbewegung braucht `app.js` also keinen eigenen RM-Check. Der Reveal lässt sich damit als zwei `renderFromData()`-Aufrufe (initial: `xDisplayRange` = reine Vergangenheit; nach 800ms: `xDisplayRange` = Vergangenheit+Zukunft) umsetzen. Dieses Muster ist zudem bereits produktiv: Screen 2 nutzt schon heute `xDisplayRange` UND `annotationPulse:{enabled:true, mode:'newly-added'}` im selben `renderFromData()`-Aufruf (`app.js:460–468`).

Zweiter zentraler Befund: `FwAnnotationPulsePlugin.js` (vollständig gelesen, 147 Zeilen) ist **ohne Änderung nicht geeignet** für ✅/❓. Es zeichnet ausschließlich pulsierende Kreisringe (kein Text/Glyphen), ist strukturell an ein `_fwAnnotationMarker`-Dataset gebunden, ist strikt transient (Puls läuft 1200ms und verschwindet danach dauerhaft — kein Redraw nach Ablauf) und blendet unter Reduced Motion vollständig aus statt einen statischen Zustand zu zeigen. `CHART_PLUGIN_ARCHITEKTUR.md §14` bestätigt das: das Plugin ist explizit als *Architekturmuster-Referenz* gedacht, nicht als Universal-Baustein („Die konkreten visuellen Parameter sind nicht automatisch Standard für alle künftigen Plugins"). Vorschlag B (reine Konfiguration) ist damit nicht tragfähig — dokumentiert als Peer-Review-relevanter Negativbefund, nicht als Implementierungspfad.

Dritter Fund: `app.js` hat aktuell **keine** `prefers-reduced-motion`-Erkennung und **keine** Timing-Mechanik (kein `setTimeout`/`requestAnimationFrame` irgendwo in der Datei) — der 800ms-Pausenbeat ist bisher nirgends implementiert. Das ist unkritisch (reines App-Layer-Neuland, kein Architekturrisiko), aber wichtig für die Aufwandsabschätzung eines späteren Implementierungs-APs.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short`: `M .claude/learning/session-log.md`, `M PROJECT-STATUS.md`, `?? docs/steering/patches/AP-prokrast-03a_..._Ergebnis.md` — alles eigene Änderungen aus dieser Session, keine Fremdänderungen
- `git diff --name-status`: `M .claude/learning/session-log.md`, `M PROJECT-STATUS.md`

Repo-Namensdiskrepanz ("Finanzwesir 2.0" statt "Finanzwesir-code") wie in AP-prokrast-02a/03a dokumentiert — kein Stop.

## Gelesene Pflichtquellen

### Vorgängerprotokolle

- `docs/steering/patches/AP-prokrast-03a_architektur-anamnese_rubikon-x-achse-plugin-vertrag_Ergebnis.md` — vollständig gelesen (in dieser Session selbst verfasst und im Anschluss wiedergelesen)
- `docs/steering/patches/AP-prokrast-02c_architektur-kontrakt_context-datenwahrheit_Ergebnis.md` — bereits in AP-03a vollständig gelesen (spec-scout), Kerninhalt bekannt
- `docs/steering/patches/AP-prokrast-02d_migrationsschnitt_ap-schnitt_ruecklaufkapsel_Ergebnis.md` — bereits in AP-03a vollständig gelesen, Kerninhalt bekannt (Future-Ticks Pflicht, 800ms bleibt bei RM, `pastMonths=futureMonths=120`)
- `docs/steering/patches/AP-prokrast-02e_abschluss-qa_ap02a-b-c-d_claims-vs-files_Ergebnis.md` — bereits in AP-03a berücksichtigt

### App-Dateien

- `Apps/prokrastinations-preis/app.js` (787 Zeilen) — gezielt tief gelesen (codebase-scout, Dispatch in diesem AP) auf: `latestMonth`-Logik, 120-Monats-Fenster, Datumshelfer, ChartEngine-Instanzen, Screen-Render-Flow, Screen-State, Reveal-/Timing-Mechaniken, Reduced-Motion, CTA, Fokus/A11y, Screen-3-`verticalLine:'last'`-Nutzung
- `Apps/prokrastinations-preis/app.css` (285 Zeilen) — gezielt gelesen (codebase-scout), CTA-Styling und Fokus-Styles
- `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` — bereits in AP-03a vollständig gelesen
- `Apps/prokrastinations-preis/APP_SPEC.md` — bereits in AP-03a vollständig gelesen

### Plugin- und Engine-Dateien

- `Theme/assets/js/fw-chart-engine/plugins/FwAnnotationPulsePlugin.js` (147 Zeilen) — **vollständig selbst gelesen** in diesem AP (nicht delegiert, da zentrale Pflichtquelle mit 14 Analysefragen)
- `Theme/assets/js/fw-chart-engine/plugins/FwVerticalLinePlugin.js` (26 Zeilen) — bereits in AP-03a vollständig selbst gelesen, in diesem AP erneut herangezogen
- `Theme/assets/js/fw-chart-engine/plugins/index.js` (16 Zeilen) — vollständig selbst gelesen, Barrel-Export-Muster bestätigt
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` — gezielt selbst gelesen: Header/Versionshistorie (Z.1–30), Smart-Update-Block (Z.330–392), `_prefersReducedMotion()` (Z.477–484); zusätzlich bereits in AP-03a gelesene Stellen (Z.152–163, 318–322) weiterhin gültig
- `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js` — bereits in AP-03a vollständig relevant gelesen (Z.304–353), in diesem AP nicht erneut geändert vorgefunden
- `Theme/assets/js/fw-chart-engine/core/FwSmartXAxis.js` — bereits in AP-03a gelesen (Z.195–250, 394–455)
- `Theme/assets/js/fw-chart-engine/strategies/BaseChartStrategy.js` — bereits in AP-03a gelesen (`_createFwContext`)

### Architektur-/Spec-Dokumente

- `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md` — in diesem AP gezielt vertieft: §14 (FwAnnotationPulsePlugin-Referenzbeispiel, Z.520–551), §15 (Peer-Review-Pflicht-Kriterien, Z.554–577), §16 (Stop-Regeln inkl. Verbot von `chart.update('none')` als Animationstreiber, Z.581–598), §17 (Verhältnis zu anderen Specs, Z.602–620) — vollständig gelesen
- `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md`, `docs/spec/Der Rucksack (Context Object Pattern).md`, `docs/spec/Charts Ticks und Label_v14.md` — bereits in AP-03a vollständig gelesen, Kontrakt in diesem AP unverändert gültig, nicht erneut vollständig gelesen

## Datei- und Vertragsinventur

| Bereich | Datei(en) | Relevanter Befund |
|---|---|---|
| Rubikon-Mechanik | `LineChartStrategy.js:304–353`, `FwSmartXAxis.js:230–236,416` | Unverändert seit AP-03a: `xDisplayRange` trägt Zukunftsraum, keine Obergrenzenprüfung |
| Reveal-/Render-Flow | `ChartEngine.js:355–392` (Smart Update), `app.js:460–468` (Screen 2 nutzt bereits `xDisplayRange`+`annotationPulse` produktiv) | **Neu:** Smart-Update-Mechanismus mit automatischer RM-Erkennung — zentraler Baustein für den Reveal |
| Datenfenster / latestMonth | `app.js:675` (`latestMonth` aus letztem CSV-Datensatz), `app.js:665–671` (`subtractMonths`-Helfer, kein `addMonths`), `app.js:674–677` (`activeWindow` mit `periodMonths:120`) | `latestMonth` bereits produktiv vorhanden; für Rubikon-Zukunftsrichtung fehlt ein `addMonths`-Äquivalent (kleine, unkritische Neuergänzung) |
| 800ms / Reduced Motion | `app.js`: **keine** `matchMedia`-Nutzung, **kein** `setTimeout`/`requestAnimationFrame` gefunden; `ChartEngine.js:477–484` `_prefersReducedMotion()` existiert nur auf Engine-Ebene | 800ms-Pause ist bisher nirgends implementiert (App-Layer-Neuland); Achsen-RM ist bereits von der Engine gelöst |
| CTA / Fokus / A11y | `app.js:418–422` (CTA-Element, `href=''`, keine Verzögerung), `app.js:496–517` (`showScreen`, `h2.focus()`), `app.js:434–437` (`aria-live="polite"`-Region) | Bestehendes Fokus-/A11y-Muster vorhanden und wiederverwendbar; CTA-Reveal-Timing nach 800ms ist neue Funktionalität |
| VerticalLinePlugin | `FwVerticalLinePlugin.js` (vollständig), `app.js:483–486` (Screen-3-Nutzung) | Bestätigt aus AP-03a: unverändert wiederverwendbar, positioniert sich am letzten Punkt von Dataset 0 |
| AnnotationPulsePlugin | `FwAnnotationPulsePlugin.js` (vollständig, 147 Z.), `CHART_PLUGIN_ARCHITEKTUR.md §14` | Nicht für ✅/❓ geeignet ohne Änderung — transient, Kreisringe statt Glyphen, `_fwAnnotationMarker`-Dataset-Pflicht, RM blendet komplett aus |
| X-Achse / displayRange | `FwSmartXAxis.js:230–236,416` | Unverändert seit AP-03a bestätigt |

## AP-03a Claims-vs-Files Nachprüfung

| Claim aus AP-03a | Bestätigt? | Datei/Beleg | Notiz |
|---|---:|---|---|
| `xDisplayRange` trägt Zukunftsraum | ja | `LineChartStrategy.js:304–314` | Unverändert, in diesem AP nicht erneut modifiziert vorgefunden |
| Future-Ticks ohne Zukunftsdaten | ja | `FwSmartXAxis.js:416`, `_generateLinearTicks` | Unverändert bestätigt |
| `FwVerticalLinePlugin` für Gegenwartslinie | ja | `FwVerticalLinePlugin.js` (vollständig erneut gelesen) | Unverändert bestätigt, zusätzlich: bereits produktiv in Screen 3 |
| ✅/❓ offen | ja, präzisiert | `FwAnnotationPulsePlugin.js` (147 Z., vollständig analysiert) | AP-03a ließ die Frage offen; dieser AP liefert die Antwort: ohne Änderung **nicht** geeignet |

## Rubikon-Reveal — fachliche Beschreibung

- **Vorher-Zustand:** Chart zeigt ausschließlich 10 Jahre echte Vergangenheit, füllt die gesamte Chartbreite (`xDisplayRange` = `dataRange`, analog zum bereits produktiven Screen-2-Muster).
- **800ms-Stille:** Keine sichtbare Änderung am Chart. App-seitiger Timer (`setTimeout`, neu zu bauen — aktuell nirgends vorhanden). Läuft identisch in RM und Nicht-RM (per AP-02d fest entschieden: „800ms bleibt Pausenbeat, RM-unabhängig").
- **Reveal-Bewegung:** Zweiter `renderFromData()`-Aufruf mit erweitertem `xDisplayRange` (`latestMonth-120M` bis `latestMonth+120M`). ChartEngine erkennt bestehende `chartInstance` (Smart Update) und animiert per `chart.update()` — bei Nicht-RM mit Standard-Chart.js-Animation (Achse fährt sichtbar auf, Vergangenheit schrumpft optisch auf die linke Hälfte, weil dieselben Datenpunkte jetzt in einem doppelt so breiten Zeitfenster liegen), bei RM mit `chart.update('none')` (sofortiger Sprung in den Endzustand, keine sichtbare Bewegung) — vollautomatisch, ohne dass `app.js` selbst zwischen den Modi unterscheiden muss.
- **Finaler Zustand:** Future-Ticks rechts sichtbar (automatisch durch `FwSmartXAxis`), Gegenwartslinie exakt am Ende der echten Datenlinie (`FwVerticalLinePlugin`, unverändert), rechte Hälfte ohne Datenlinie.
- **✅/❓:** erscheinen direkt an der Gegenwartslinie, links/rechts — Positionierungsweg ist der zentrale offene Punkt dieses APs (siehe Vorschläge A–D).
- **CTA-Reveal:** nach der Reveal-Bewegung (bzw. nach RM-Sprung sofort danach), aktuell keine bestehende Verzögerungslogik — muss neu gebaut werden (App-Layer, unkritisch).

## Rubikon-Reveal — technische Analyse

- **Initiale Domain:** `xDisplayRange = { min: latestMonth-119M, max: latestMonth }` — identisch zur bereits produktiven Screen-2-Domain-Berechnung (`app.js:463`).
- **Finale Domain:** `xDisplayRange = { min: latestMonth-119M, max: latestMonth+120M }` (rechte Grenze verschoben, linke Grenze unverändert — Validierung in `LineChartStrategy.js:309–311` bleibt in beiden Fällen unverletzt, da linke Grenze konstant bleibt und rechte Grenze nur wächst).
- **Re-Render vs. Update:** Ein erneuter `renderFromData()`-Aufruf auf demselben Container ist der **systemkonforme** Weg — löst intern automatisch den Smart-Update-Pfad aus (`ChartEngine.js:355`), kein manuelles `chart.update()` aus `app.js` nötig, kein direkter Chart.js-Internals-Zugriff.
- **Verhältnis zum Stop-Regel-Verbot „`chart.update('none')` als Animationstreiber" (`CHART_PLUGIN_ARCHITEKTUR.md §16`):** Dieses Verbot betrifft die missbräuchliche Nutzung von `update('none')`, um eine eigene, Chart.js-externe Animationsschleife zu fälschen (z. B. ein Plugin, das per RAF wiederholt `update('none')` aufruft, um selbst zu animieren). Der hier beschriebene Weg ist das Gegenteil: `update('none')` wird ausschließlich als **RM-Fallback** genutzt (keine Animation gewünscht), während die normale Animation über Chart.js' eigenes, eingebautes Animationssystem läuft (`update(undefined)`). Das ist der von der Engine selbst vorgesehene, bereits produktiv genutzte Pfad — kein Hack.
- **Weniger regressionsanfällige Variante:** Zwei `renderFromData()`-Aufrufe (statt eines manuellen `chart.update()`-Aufrufs aus `app.js`) ist die regressionsärmere Wahl, weil `renderFromData()` den vollständigen Strategy-`transform()`-Zyklus (inkl. `fwContext`-Neuaufbau, Validierung) jedes Mal frisch durchläuft — kein Risiko einer veralteten/inkonsistenten `fwContext`-Kopie.
- **Zukunftsdaten-Freiheit:** Beide Render-Aufrufe nutzen exakt dieselbe reale `chartSeries` (keine zusätzlichen Punkte) — nur `xDisplayRange` unterscheidet sich. Die Chart.js-Line-Geometrie zeichnet in beiden Fällen nur bis zum letzten realen Punkt.
- **Reduced Motion:** vollständig durch `ChartEngine._prefersReducedMotion()` abgedeckt für die Achsen-/Linienbewegung — kein neuer App-Code nötig. Die 800ms-Pause selbst bleibt laut AP-02d in beiden Modi unverändert bestehen (kein RM-Zweig für das Timing).

**Verbotene Wege — geprüft und ausgeschlossen:**
- CSS-Skalierung des Canvas (`transform: scale()` o. ä. auf den `<canvas>`) als Reveal-Mechanismus — würde die Chart.js-interne Pixelgeometrie nicht mit der visuellen Darstellung synchron halten und ist explizit als Nicht-Ziel ausgeschlossen.
- Direktes Setzen von `axis.min/max` in `app.js` — architekturwidrig, siehe AP-03a.
- Direkte Chart.js-Internals-Abfrage aus `app.js` als Regelpfad — nicht nötig, da `renderFromData()` alles kapselt.
- Zukunftsdaten/Dummy-Punkte/transparente Linie — nicht nötig, da der Zukunftsraum rein über `xDisplayRange` ohne Datenpunkte entsteht.

## Analyse `FwAnnotationPulsePlugin.js`

- **Vertrag:** „Ephemerer Runtime-Pulse für neu sedimentierte Annotation-Marker (Screen-2)" (Dateikopf, Z.7). Kein Domain-State, kein CSS, kein Einfluss auf Achsen/Tooltip/Legende (Z.8).
- **Aktivierung:** `chart.options.plugins.fwAnnotationPulse = { enabled: true, mode: 'newly-added' }` (Z.10, bestätigt durch `ChartEngine.js:187–190,325–329` und `app.js:467` produktiv genutzt).
- **Feature-Flags/Config:** genau ein unterstützter `mode`-Wert (`'newly-added'`); jeder andere Wert oder Fehlen von `enabled` deaktiviert das Plugin vollständig (Z.83: `if (!opts?.enabled || opts?.mode !== 'newly-added') return;`).
- **Zeichnet:** ausschließlich Canvas — Kreisring via `ctx.arc()`+`ctx.stroke()` (Z.50–54). Kein DOM, keine Text-/Glyphen-Darstellung.
- **Hook/Lifecycle:** ausschließlich `afterDraw` (Z.81, „absolut letzter Hook"), zusätzlich ein selbstgetriebener `requestAnimationFrame`-Loop (`_standaloneLoop`, Z.62–75), der `chart.draw()` aufruft, um zwischen Chart.js-eigenen Redraws weiterzuanimieren — Canvas-Ownership bleibt bewusst bei Chart.js (Kommentar Z.63).
- **Koordinatenlogik:** Positionen werden **nicht** aus Domain-Werten berechnet, sondern direkt aus Chart.js-Element-Pixelkoordinaten gelesen (`meta.data[i].x/y`, Z.116–120) — erfordert zwingend ein reales Dataset mit `ds._fwAnnotationMarker === true` (Z.86).
- **Daten-/Dataset-Annahmen:** braucht ein Annotation-Marker-Dataset mit mehreren Punkten (`dataset.data[i].x` als ID); ohne ein solches Dataset (`dsIdx === -1`) tut das Plugin nichts außer einem State-Reset (Z.89–94).
- **Redraw/Resize-Verhalten:** robust — Positionen werden bei jedem `afterDraw` neu aus den aktuellen Chart.js-Elementen gelesen (Z.115–121), daher automatisch resize-sicher, solange das Dataset weiterhin existiert.
- **Reduced-Motion-Verhalten:** `if (_reducedMotion()) return;` (Z.84) — **kompletter Ausstieg**, keine statische Ersatzdarstellung. Für ein persistentes UI-Element (✅/❓ muss immer sichtbar sein) ist das ein Fehlverhalten, kein akzeptabler Fallback.
- **Semantik:** eng auf „Pulsringe für frisch erschienene Punkte" beschränkt, nicht generisch für beliebige Symbole.
- **Eignung für ✅/❓ ohne Änderung:** **Nein.** Selbst mit einem künstlich eingeführten Dummy-Marker-Dataset würde das Plugin nur für 1200ms einen Kreisring zeichnen und danach für immer verschwinden (`state.animations.delete(id)` nach Ablauf, Z.58 — kein Re-Trigger vorgesehen außer bei erneutem „neu erschienen"), nicht ✅/❓-Glyphen darstellen.
- **Eignung für Erweiterung:** technisch möglich (siehe Vorschlag C), aber mit spürbarer Vertragsverwässerung, da „ephemer" und „persistent" gegensätzliche Lebenszyklus-Semantiken sind.
- **Risiken:** Verwechslungsgefahr für künftige Wartung, wenn ein „Pulse"-Plugin plötzlich auch „Static Symbol" zeichnet; RM-Verhalten müsste je nach `mode` unterschiedlich sein (Ausblenden bei Pulse, Anzeigen bei Symbol) — Quelle für Bugs.

## Abgrenzung `FwVerticalLinePlugin`

- **Vertrag:** zeichnet genau eine vertikale Linie am letzten Punkt von Dataset 0 (`meta.data[meta.data.length-1]`), opt-in über `features.verticalLine === 'last'`.
- **Zuständig für:** die Gegenwartslinie selbst (Pixelposition, Strichfarbe/-stärke).
- **Nicht zuständig für:** jede Art von Symbol-/Text-Rendering, Domain-Berechnung, Reveal-Timing.
- **Risiko bei Zweckentfremdung:** eine zweite Verantwortung (z. B. ✅/❓ direkt in diesem Plugin mitzeichnen) würde den engen, einzigen Zweck („eine Linie, ein Ort") aufweichen und ist deshalb explizit als verbotener Lösungsraum aus AP-03a bestätigt.

## Vorschlag A — App-Layer-Reveal mit bestehender Engine-Fähigkeit, Symbole separat geprüft

- **Beschreibung:** Reveal ausschließlich über zwei `renderFromData()`-Aufrufe (Smart Update) mit unterschiedlichem `xDisplayRange`, getrennt durch `setTimeout(800)`. ✅/❓ als CSS/DOM-Overlay (horizontale 50%-Symmetrie dank `pastMonths=futureMonths=120`), kein Plugin-Eingriff.
- **Betroffene Layer:** ausschließlich App-Layer.
- **Später erlaubte Dateien:** `Apps/prokrastinations-preis/app.js`, `Apps/prokrastinations-preis/app.css`.
- **Später verbotene Dateien:** alle Engine-/Strategy-/Plugin-/Spec-Dateien.
- **Reveal-Ablauf:** (1) Initialrender past-only, (2) `setTimeout(800)`, (3) zweiter `renderFromData()`-Aufruf mit erweitertem `xDisplayRange`, (4) CTA-Reveal + Fokus/A11y-Announce.
- **✅/❓-Pfad:** CSS-Overlay, horizontal robust; vertikale Ausrichtung „auf Höhe der Chartlinie" ungelöst — größte offene Frage dieses Vorschlags.
- **Reduced Motion:** Achsenbewegung vollautomatisch über `ChartEngine._prefersReducedMotion()`; 800ms-Pause unverändert in beiden Modi (kein neuer RM-Zweig für Timing nötig).
- **A11y/Fokus:** bestehendes Muster (`aria-live`, `h2.focus()`) um CTA-Reveal-Announce erweitern — neu zu bauen, aber stilistisch konsistent.
- **Datenwahrheit:** unangetastet, keine neuen Datenpunkte.
- **Risiken:** niedrig für die Kernmechanik (Screen-2-Präzedenzfall vorhanden); mittel für die vertikale Symbol-Positionierung.
- **Testbarkeit:** hoch — zwei deterministische `renderFromData()`-Aufrufe, RM per `matchMedia`-Mock prüfbar.
- **Stop-Bedingungen:** falls CSS-Overlay die vertikale Ausrichtung nicht sauber trifft → Eskalation zu Vorschlag C oder D, kein eigenmächtiger Plugin-Bau.

## Vorschlag B — App-Layer-Reveal plus vorhandenes `FwAnnotationPulsePlugin` nur per Konfiguration

- **Beschreibung:** identischer Reveal-Mechanismus wie Vorschlag A; für ✅/❓ sollte `FwAnnotationPulsePlugin` ohne Codeänderung per Config aktiviert werden.
- **Voraussetzung (geprüft):** **nicht erfüllt.** Das Plugin zeichnet nur Kreisringe (keine Glyphen), ist strikt transient (1200ms, dann dauerhaft weg) und braucht ein `_fwAnnotationMarker`-Dataset, das für zwei statische ✅/❓-Symbole fachlich nicht passt (kein „neu erschienener" Punkt, sondern Dauerzustand).
- **Betroffene Layer:** App-Layer (Reveal) + versuchter Plugin-Reuse (gescheitert).
- **Reveal-Ablauf:** identisch zu Vorschlag A.
- **✅/❓-Pfad:** **nicht tragfähig** ohne Änderung.
- **Reduced Motion:** Plugin blendet unter RM komplett aus (Z.84) — für ein persistentes Element ungeeignet, selbst wenn die Darstellungsfrage gelöst wäre.
- **Risiken:** falsche Erwartungshaltung, dass „Config reicht" — direkt am Code widerlegt.
- **Testbarkeit:** einfach zu verifizieren, dass es **nicht** funktioniert (negativer Befund, hier dokumentiert).
- **Stop-Bedingungen:** entfällt — Vorschlag wird nicht zur Umsetzung empfohlen.

## Vorschlag C — App-Layer-Reveal plus minimale generische Erweiterung von `FwAnnotationPulsePlugin`

- **Beschreibung:** identischer Reveal-Mechanismus wie Vorschlag A; `FwAnnotationPulsePlugin.js` erhält einen neuen, generischen `mode`-Wert (z. B. `'static-symbol'`) neben dem bestehenden `'newly-added'`, der statt Kreisringen Text-/Glyphen-Marker an gegebenen Positionen zeichnet, ohne Auto-Expire.
- **Notwendige Erweiterung:** neue Zeichenlogik (`ctx.fillText()` statt `ctx.arc()`+`stroke()`), neue Lebenszyklus-Semantik (persistent statt 1200ms-transient), eigener RM-Fallback (statisch sichtbar statt komplett ausgeblendet).
- **Warum generisch:** neuer Mode-Wert statt Rubikon-Spezialcode, potenziell für künftige „persistente Symbol"-Anwendungsfälle wiederverwendbar.
- **Warum opt-in:** nur aktiv bei explizitem `mode:'static-symbol'`; bestehende Screen-2-Nutzung (`mode:'newly-added'`) bleibt Zeile für Zeile unverändert.
- **Risiken:** vermischt zwei gegensätzliche Verhaltensweisen (ephemer vs. persistent) in einer Datei — spürbare Vertragsverwässerung des ursprünglich engen „Ephemerer Runtime-Pulse"-Vertrags; höherer Testaufwand, da beide Modi regressionsfrei bleiben müssen.
- **Testbarkeit:** mittel — Doppel-Testpflicht (alter + neuer Modus).
- **Warum Peer Review nötig:** `CHART_PLUGIN_ARCHITEKTUR.md §15` listet „State über mehrere Render hinweg", „Reduced-Motion-Sonderfälle" und „Achsen-/Scale-nahe Logik" explizit als Peer-Review-Pflicht-Kriterien — alle drei treffen hier zu.
- **Stop-Bedingungen:** falls die Erweiterung das bestehende `'newly-added'`-Verhalten auch nur geringfügig verändert (Regressionstest Screen 2 muss bytegleich bleiben) → stoppen, kein Merge ohne diesen Nachweis.

## Vorschlag D — App-Layer-Reveal plus neues opt-in Symbol-/Annotation-Plugin

- **Beschreibung:** identischer Reveal-Mechanismus wie Vorschlag A; neues, eigenständiges Plugin (Arbeitstitel `FwStateSymbolPlugin.js`) für persistente Text-/Glyphen-Marker, unabhängig von `FwAnnotationPulsePlugin`.
- **Plugin-Vertrag:** zeichnet statische Symbole an fest definierten, aus Config ableitbaren Positionen (nicht an Dataset-Punkten gebunden), `afterDraw`-Hook, opt-in via eigenes Options-Feld (z. B. `stateSymbol: { enabled: true, left: '✅', right: '❓' }`), kein Motion-Bezug (daher RM-Frage strukturell einfacher: das Plugin hat gar keine Animation, die ausgeblendet werden müsste).
- **Abgrenzung zu bestehenden Plugins:** `FwVerticalLinePlugin` bleibt exklusiv für die Linie, `FwAnnotationPulsePlugin` bleibt exklusiv für transiente Marker-Pulse, das neue Plugin exklusiv für persistente Text-Symbole — klare Trennung nach Zweck statt Vermischung in einer Datei.
- **Warum kein Card-to-Point:** zeichnet nur zwei statische Glyphen an bekannten, konfigurierbaren Positionen — keine generische, extern abfragbare Koordinaten-API, kein DOM-Bezug, keine Wiederverwendung außerhalb dieses engen Zwecks.
- **Risiken:** neue Datei + neue Registrierung in `plugins/index.js` (additiv, kein bestehender Export geändert) — kleines Wartungsplus, aber sauberste Verantwortungstrennung.
- **Testbarkeit:** hoch — isoliert testbar, kein bestehender Plugin-Code betroffen.
- **Warum Peer Review nötig:** `CHART_PLUGIN_ARCHITEKTUR.md §15` (Canvas-Overlay, Achsen-/Scale-nahe Logik) trifft zu; zusätzlich neue Plugin-Registrierung.
- **Stop-Bedingungen:** falls die Positionsberechnung doch dataset-punktgebunden werden müsste (dann wäre `FwAnnotationPulsePlugin`-Nähe größer als gedacht) → Rückfrage vor Bau, ob C statt D richtig ist.

## Bewertungsmatrix

| Kriterium | A | B | C | D | Begründung |
|---|---:|---:|---:|---:|---|
| Fachliche Wirkung | GRÜN | GRÜN | GRÜN | GRÜN | Alle vier teilen denselben Reveal-Mechanismus (Smart Update), unterscheiden sich nur im Symbol-Pfad |
| Architektur-Layer | GRÜN | GRÜN | GELB | GELB | A/B bleiben App-Layer; C/D berühren Plugin-Layer (additiv) |
| Datenwahrheit | GRÜN | GRÜN | GRÜN | GRÜN | Keine Variante erzeugt Zukunftsdaten |
| X-Achsen-Konformität | GRÜN | GRÜN | GRÜN | GRÜN | Alle nutzen `xDisplayRange`/`FwSmartXAxis` unverändert |
| Reveal-Konformität | GRÜN | GRÜN | GRÜN | GRÜN | Smart-Update-Mechanismus ist RM-bewusst und kein Chart.js-Hack |
| Plugin-Konformität | GRÜN | ROT | GELB | GRÜN | A berührt kein Plugin; B zweckentfremdet den Pulse-Vertrag; C erweitert ihn (Verwässerung); D respektiert alle bestehenden Verträge |
| `FwAnnotationPulsePlugin`-Eignung | n/a | ROT | GELB | n/a | B: ungeeignet ohne Änderung (belegt); C: geeignet nach Erweiterung; A/D nutzen es bewusst nicht |
| Gegenwartslinie | GRÜN | GRÜN | GRÜN | GRÜN | `FwVerticalLinePlugin` bleibt in allen vier Fällen unverändert zuständig |
| ✅/❓-Positionierung | GELB | ROT | GRÜN | GRÜN | A: horizontal robust, vertikal offen; B: technisch nicht darstellbar; C/D: pixelgenau nach Umsetzung |
| Reduced Motion | GRÜN | GELB | GRÜN | GRÜN | A: Achse automatisch, Pause RM-unabhängig; B: Plugin blendet komplett aus (ungeeignet für Daueranzeige); C/D: können korrekten statischen RM-Zustand definieren |
| A11y/Fokus | GRÜN | GRÜN | GRÜN | GRÜN | CTA-Reveal-Announce ist unabhängig vom Symbol-Pfad, überall gleich neu zu bauen |
| Erweiterbarkeit | GRÜN | GRÜN | GRÜN | GRÜN | Keine Variante verbaut Card-to-Point oder Screen-3-Timing |
| Regression | GRÜN | GRÜN | GELB | GRÜN | A/B: kein Plugin-Diff; C: bestehende Pulse-Datei geändert, Screen-2-Regressionstest zwingend; D: additive neue Datei |
| Testbarkeit | GRÜN | GRÜN | GELB | GRÜN | C erfordert Doppel-Testpflicht (alter+neuer Modus); die anderen sind isoliert testbar |
| Scope | GRÜN | GRÜN | GELB | GELB | A/B klein (App-Layer only, B allerdings mit untauglichem Ergebnis); C/D mittel (Plugin-Änderung + Peer Review Pflicht) |

## Offene Streitfragen für Peer Review

1. Ist die vertikale Positionierung von ✅/❓ ("auf Höhe der Chartlinie") mit reinem CSS lösbar (z. B. approximative Positionierung ohne Pixel-Exaktheit), oder ist Pixel-Exaktheit ein hartes Produktkriterium, das zwingend Canvas-Logik (C oder D) erfordert?
2. Ist eine generische Erweiterung von `FwAnnotationPulsePlugin` (Vorschlag C) architektonisch vertretbar, obwohl sie zwei gegensätzliche Lebenszyklus-Semantiken (ephemer vs. persistent) in einer Datei vereint — oder verlangt der bestehende enge Vertrag ("Ephemerer Runtime-Pulse") zwingend ein neues, separates Plugin (Vorschlag D)?
3. Ist der Smart-Update-basierte Reveal (zwei `renderFromData()`-Aufrufe) tatsächlich visuell überzeugend genug für den Drehbuch-Anspruch ("Die echte Vergangenheit schrumpft sichtbar auf die linke Hälfte"), oder braucht es zusätzliche Chart.js-Animation-Konfiguration (Easing, Dauer), die über das Default-Verhalten hinausgeht?
4. Muss `addMonths` als neuer lokaler Helfer in `app.js` entstehen (analog zu `subtractMonths`), oder gehört eine solche Funktion eher in `FwDateUtils.js` (Layer 4, VORSICHT laut CLAUDE.md) und würde damit außerhalb des App-Layer-Scopes liegen?

## Konkrete Peer-Review-Fragen

1. Ist der vorgeschlagene Reveal über zwei `renderFromData()`-Aufrufe (Smart Update) systemkonform, oder müsste eine Engine-seitige, explizite Transition-Schnittstelle her?
2. Ist `FwAnnotationPulsePlugin` semantisch für ✅/❓ geeignet — mit dem in diesem AP belegten Befund, dass reine Konfiguration nicht reicht — oder wird die Erweiterung (Vorschlag C) trotzdem als vertretbar eingestuft?
3. Ist ein neues Symbol-Plugin (Vorschlag D) sauberer als eine Erweiterung des Pulse-Plugins (Vorschlag C), gegeben die Trade-offs in der Bewertungsmatrix?
4. Ist CSS/DOM-Overlay (Vorschlag A) nach Kenntnis der Plugin-Architektur noch vertretbar, wenn die vertikale Symbol-Ausrichtung nur approximativ (nicht pixelgenau) gelöst werden kann?
5. Welche Variante minimiert Regression für Screen 1–3 und andere Apps am stärksten?
6. Welche Variante ist am besten testbar unter Berücksichtigung des Peer-Review-Pflicht-Katalogs aus `CHART_PLUGIN_ARCHITEKTUR.md §15`?
7. Verbaut eine der vier Varianten Card-to-Point stärker als die anderen — insbesondere: baut Vorschlag D versehentlich eine wiederverwendbare Koordinaten-API, die de facto schon Card-to-Point vorwegnimmt?
8. Braucht `app.js` einen neuen `addMonths`-Helfer, oder soll diese Funktionalität woanders (z. B. `FwDateUtils.js`) verankert werden — mit den entsprechenden Tabu-Zonen-Implikationen laut CLAUDE.md?

## Empfehlung für spätere Umsetzung

- **Bevorzugter Vorschlag:** Vorschlag A als Basis-Reveal-Mechanismus (praktisch unstrittig — Smart Update ist bereits produktiv erprobt in Screen 2, RM automatisch gelöst). Für die ✅/❓-Symbole wird empfohlen, zunächst den CSS-Overlay-Ansatz aus Vorschlag A zu verproben; falls die vertikale Ausrichtung damit nicht befriedigend lösbar ist, ist **Vorschlag D** (neues, dediziertes Plugin) gegenüber Vorschlag C (Erweiterung) leicht bevorzugt, da er den bestehenden `FwAnnotationPulsePlugin`-Vertrag unangetastet lässt und die sauberste Verantwortungstrennung bietet.
- **Warum:** Die Kernmechanik (Reveal) ist mit hoher Sicherheit belegt und risikoarm. Die einzige echte Unsicherheit betrifft die Symbol-Positionierung — dort ist der kleinstmögliche Schnitt (erst CSS versuchen) der günstigste erste Schritt, mit einem klar benannten, geprüften Fallback.
- **Nicht bevorzugte Vorschläge:** Vorschlag B wird ausdrücklich **nicht** empfohlen — direkt am Code widerlegt, dass reine Konfiguration ausreicht.
- **Was vor Implementierung entschieden sein muss:** (1) CSS-Overlay vs. Canvas-Plugin für ✅/❓ (Peer-Review-Frage 1/4), (2) bei Canvas-Plugin: Erweiterung (C) vs. neues Plugin (D) (Peer-Review-Frage 2/3), (3) ob die Chart.js-Default-Animation für den Reveal ausreicht oder Custom-Easing/-Dauer nötig ist (Streitfrage 3).
- **Welche Dateien ein späterer Implementierungs-AP ändern dürfte:** `Apps/prokrastinations-preis/app.js`, `Apps/prokrastinations-preis/app.css` (immer); zusätzlich `Theme/assets/js/fw-chart-engine/plugins/FwAnnotationPulsePlugin.js` (nur falls Peer Review Vorschlag C wählt) oder eine neue Datei unter `Theme/assets/js/fw-chart-engine/plugins/` + `plugins/index.js` (nur falls Peer Review Vorschlag D wählt).
- **Welche Dateien weiterhin verboten bleiben sollten:** `ChartEngine.js`, `LineChartStrategy.js`, `FwSmartXAxis.js`, `BaseChartStrategy.js`, `FwVerticalLinePlugin.js`, `APP_SPEC.md`, `config/stations.de.json`, alle `docs/spec/*`-Dokumente.

## Geänderte Dateien

Erlaubt:

- `docs/steering/patches/AP-prokrast-03b_rubikon-reveal_architekturvorschlaege_peer-review-dossier_Ergebnis.md`

Nicht erlaubt und nicht geändert:

- `Apps/prokrastinations-preis/app.js`: unverändert (nur gelesen)
- `Apps/prokrastinations-preis/app.css`: unverändert (nur gelesen)
- `Apps/prokrastinations-preis/APP_SPEC.md`: unverändert (nur gelesen, in AP-03a)
- `Apps/prokrastinations-preis/config/stations.de.json`: nicht gelesen, nicht geändert
- Chart-Engine-Dateien (`ChartEngine.js`, `FwSmartXAxis.js`, `BaseChartStrategy.js`, `LineChartStrategy.js`): unverändert (nur gelesen)
- Plugin-Dateien (`FwAnnotationPulsePlugin.js`, `FwVerticalLinePlugin.js`, `plugins/index.js`): unverändert (nur gelesen)
- Spec-Dateien (`docs/spec/*`): unverändert (nur gelesen)

## Wiederlesen des Ergebnisprotokolls

- Ergebnisprotokoll nach Write vollständig wiedergelesen: ja
- Abgleich gegen Aufgabenstellung bestanden: ja
- Abweichungen: keine

## Offene Punkte

- Architektur: CSS-Overlay vs. Canvas-Plugin für ✅/❓ (Peer-Review-Entscheidung), bei Canvas-Plugin: Erweiterung vs. neues Plugin
- Code: kein Code in diesem AP geändert
- UX: exakte vertikale Ausrichtung von ✅/❓ weiterhin ungelöst; Chart.js-Default-Animation-Qualität für den Reveal noch nicht visuell geprüft (nur architektonisch belegt)
- CSS: Layout für Chart-Container und CTA-Reveal-Timing in Screen 4 noch nicht entworfen
- Daten: keine offenen Fragen
- Test: siehe Peer-Review-Fragen; QA-Punkte folgen nach Peer-Review-Entscheidung in einem späteren AP
- Mobile: horizontale 50%-Symmetrie und Symbol-Lesbarkeit auf S-Zone noch zu prüfen
- Reduced Motion: Achsenbewegung technisch gelöst (Engine-automatisch); Symbol-RM-Verhalten hängt von der noch offenen Symbol-Pfad-Entscheidung ab
- A11y: CTA-Reveal-Announce-Text und Fokus-Ziel nach dem Reveal noch nicht formuliert
- Backlog: keine neuen Backlog-Einträge aus diesem AP

## Empfehlung

- Nächster interner AP: AP-prokrast-03c — Peer Review Rubikon-Reveal-Vorschläge
- Ausdrücklich nicht nächster AP: Implementierung, App-Code, CSS-Patch, Plugin-Patch, neues Plugin, APP_SPEC-Migration, Stationsdatenkorrektur, Card-to-Point, Screen-2- oder Screen-3-Bau, Commit, Abschlussritual
- Rückgabe an Masterfaden nötig: nein
