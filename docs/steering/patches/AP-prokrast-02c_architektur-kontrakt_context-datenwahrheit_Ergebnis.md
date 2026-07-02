# AP-prokrast-02c — Architektur-Kontrakt, Rucksack-/Context-Prüfung und Datenwahrheit Zukunftsraum — Ergebnis

## Status

Status: GRÜN
Blocker: nein

## Kurzbefund

Der wichtigste Fund dieses AP: Der bestehende `xDisplayRange`/`displayRange`-Mechanismus (AP-14b, Layer 3+4) unterstützt bereits strukturell eine Anzeige-Domain, die über die echten Daten hinausreicht — die Validierung in `LineChartStrategy.transform()` erzwingt nur, dass die Anzeige-Domain die Datendomain vollständig abdeckt, prüft aber keine Obergrenze. `FwSmartXAxis.compute()` setzt `axis.max` direkt auf `fwContext.displayRange.max`, unabhängig davon, ob dort echte Daten liegen. Damit ist der „leere Zukunftsraum" der Rubikon-Mechanik ohne Chart-Engine-Codeänderung erreichbar, solange kein Datenpunkt jenseits `dataRange.max` erzeugt wird. Ebenso ist `FwVerticalLinePlugin` bereits so implementiert, dass es sich am letzten echten Datenpunkt positioniert (nicht am Chart-Rand) — die Gegenwartslinie ist damit 1:1 wiederverwendbar. Offen bleiben zwei genuin neue Architekturflächen: eine Lese-Schnittstelle für Card-to-Point-Zielkoordinaten (aktuell keine öffentliche API vom Chart-Engine nach außen) und die Frage, ob der Zukunftsraum automatisch Achsen-Ticks erhält (aktueller Tick-Algorithmus würde das tun, sofern nicht unterdrückt).

## Steuerfaden-Klärungen übernommen

- Lokaler Repo-Root `Finanzwesir 2.0` ist korrekt trotz GitHub-Name `Finanzwesir-code`.
- Ergebnisdateien liegen unter `docs/steering/patches/`.
- Drehbuch ist amtliches, freigegebenes Zielbild.
- 7 Stationen sind verbindlich.
- 800ms-Stille ist fachlich entschieden, nicht offene Produktentscheidung — dieser AP klärt nur, wie sie architektur-, A11y- und Reduced-Motion-konform kontrahiert wird, nicht ob sie gilt.
- AP-02c schreibt keinen Code und keinen Spec-Patch — nur dieses eine Ergebnisprotokoll.

## Vorprüfung / Git-Baseline

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- Branch: `master`
- `git status --short` (vor AP-02c):
  ```
   M .claude/learning/session-log.md
  ?? Apps/prokrastinations-preis/AP-prokrast-01_befund-anamnese.md
  ?? Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md
  ?? docs/steering/patches/AP-prokrast-02a_quelleninventur-datei-wahrheit_Ergebnis.md
  ?? docs/steering/patches/AP-prokrast-02b_soll-ist-architektur-konfliktmatrix_Ergebnis.md
  ```
- `git diff --name-status`: nur `.claude/learning/session-log.md` (Session-Start-Eintrag, LF/CRLF-Hinweis von Git, kein Inhaltsproblem)
- Bewertung: AP-02b liegt bestätigt unter `docs/steering/patches/` (Steuerfaden-Normalisierung nachvollzogen). Ausschließlich erwartete/tolerierte Pfade dirty/untracked. App-Code, APP_SPEC, CSS, Stationsdaten, Chart-Engine und Plugins sind clean. Kein Stop-Grund.

## Gelesene Pflichtquellen

| Quelle | Pfad | Gelesen? | Rolle | Bemerkung |
|---|---|---:|---|---|
| AP-02b-Ergebnis | `docs/steering/patches/AP-prokrast-02b_soll-ist-architektur-konfliktmatrix_Ergebnis.md` | ja | Befundanker, Architekturfragen-Liste | GRÜN, vollständig gelesen inkl. Konflikt- und Beat-Matrix |
| AP-02a-Ergebnis | `docs/steering/patches/AP-prokrast-02a_quelleninventur-datei-wahrheit_Ergebnis.md` | ja | Befundanker Datei-Wahrheit | GELB ohne Blocker, vollständig gelesen |
| Drehbuch | `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` | ja | amtliches Zielbild | Screen 2–4, Responsive, Nicht-Ziele, Implementierungsnotizen erneut gezielt ausgewertet |
| AP-prokrast-01-Befund | `Apps/prokrastinations-preis/AP-prokrast-01_befund-anamnese.md` | ja | Vorgänger-Anamnese | Ist/Soll-Abgleich gegen alte APP_SPEC |
| Rucksack (Context Object Pattern) | `docs/spec/Der Rucksack (Context Object Pattern).md` | ja | Architektur-Wahrheit fwContext | Zwiebel-Modell, Producer/Consumer, Klasse-1/Klasse-2-Fehlerlogik |
| Architecture Strategy Paper | `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` | ja | Architektur-Wahrheit Layer 1–5, KDR 1–14 | V12.0.0, Datei-Matrix, unidirektionaler Datenfluss |
| APP_SPEC.md | `Apps/prokrastinations-preis/APP_SPEC.md` | ja | Repo-Spec-Wahrheit | §13 AppContext, §14 A11y/RM, §16.1/16.3/16.4, §17 |
| app.js | `Apps/prokrastinations-preis/app.js` | ja | Code-Wahrheit App-Seite | `renderJourneyStep`, `renderS3`, `showScreen`, `buildVisibleChartSeries`, `buildAppContext`, Screen-4-DOM ohne Chart |
| app.css | `Apps/prokrastinations-preis/app.css` | ja | Styling-/Motion-Wahrheit | keine Motion-Basis vorhanden (bestätigt) |
| stations.de.json | `Apps/prokrastinations-preis/config/stations.de.json` | ja | Datenwahrheit | 7/7 Stationen, SaaS-Bezug |
| `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` | optional, gezielt gelesen | ja | Layer 2 Manager | `renderFromData()`-Validierung, WeakMap-State pro Container, Typ-Wechsel-Verbot, `_prefersReducedMotion()`-Pattern (zweifach: Initial-Render + Update) |
| `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js` | optional, gezielt gelesen | ja | Layer 3 Strategy | `xDisplayRange`-Validierung (nur Untergrenzenschutz, keine Obergrenze), `_createFwContext`-Aufruf, `displayRange`-Berechnung |
| `Theme/assets/js/fw-chart-engine/strategies/BaseChartStrategy.js` | optional, gezielt gelesen | ja | Layer 3 Basis | `_createFwContext` Pflichtfeld-Liste (Fail-Fast), `displayRange` nicht pflichtig |
| `Theme/assets/js/fw-chart-engine/core/FwSmartScales.js` | optional, gezielt gelesen | ja | Layer 4 Curator (Orchestrator) | delegiert an `FwSmartXAxis`, `minTime`/`maxTime`-Argumente sind laut Code-Kommentar im neuen Modell wirkungslos |
| `Theme/assets/js/fw-chart-engine/core/FwSmartXAxis.js` | optional, gezielt gelesen | ja | Layer 4 Curator (Spezialist) | `axis.min/max = fwContext.displayRange.min/max` wenn gesetzt; Tick-Generator läuft bis `displayRange.max` (oder `dataRange.max`) |
| `Theme/assets/js/fw-chart-engine/plugins/FwVerticalLinePlugin.js` | optional, gezielt gelesen | ja | Plugin | positioniert sich am letzten echten Datenpunkt (`meta.data[last].x`), nicht am Chart-Rand — reine Wiederverwendung möglich |
| `Theme/assets/js/fw-chart-engine/plugins/FwAnnotationPulsePlugin.js` | optional, gezielt gelesen | ja | Plugin | WeakMap-State, `afterDraw`-only, eigener `_reducedMotion()`-Guard, liest Canvas-Pixelpositionen aus `chart.getDatasetMeta()` |

## Mechanische Prüfungen

| Prüfung | Ergebnis | Bemerkung |
|---|---|---|
| AP-02b GRÜN und lesbar | ✅ | `Status: GRÜN` gefunden |
| AP-02b enthält Architekturfragen für AP-02c | ✅ | Abschnitt vollständig vorhanden, 13 Fragen |
| Drehbuch enthält Rubikon/Card-to-Point/800ms-Signale | ✅ | alle Signale gefunden |
| APP_SPEC §13/§14/§16/§17 vorhanden | ✅ | alle vier Überschriften gefunden |
| Rucksack-Dokument gelesen | ✅ | vollständig |
| Architecture Strategy Paper gelesen | ✅ | vollständig |
| app.js xDisplayRange / Screen 4 geprüft | ✅ | `xDisplayRange` in `renderJourneyStep` (Screen 2) genutzt; Screen-4-DOM-Block hat keinen Chart-Mount |
| app.css Motion-/Reduced-Motion-Hinweise geprüft | ✅ | kein `@keyframes`, kein `prefers-reduced-motion`, kein `transition` |
| stations.de.json 7 Stationen / SaaS-Bezug geprüft | ✅ | 7/7, SaaS-Bezug bestätigt |

## Architektur-Leitentscheidungen

1. **Zukunftsraum ist Darstellung, keine Datenbehauptung.** Kein Datenpunkt jenseits `dataRange.max` wird jemals erzeugt — weder in `chartSeries`, noch in `dataRange`, noch als transparenter oder gestrichelter Datensatz.
2. **Echte Daten enden am letzten realen Datenpunkt.** `dataRange` bleibt strikt an `FinanzwesirData`/`chartSeries` gebunden — unveränderlich gegenüber der Rubikon-Mechanik.
3. **Anzeige-Domain darf als Opt-in über echte Daten hinausreichen.** Der bestehende `xDisplayRange`/`displayRange`-Kontrakt (AP-14b) erlaubt das bereits strukturell; kein neuer Engine-Kontrakt nötig für die Kernmechanik, nur eine neue Nutzung des bestehenden Kontrakts durch die App.
4. **800ms-Stille ist fachlicher Beat, aber App-State/UI-Orchestration, nicht Chart-/Datenlogik.** Sie darf niemals in ChartEngine, Strategy, Curator oder Plugin wandern.
5. **Reduced Motion entfernt keine Information, nur Bewegung.** Für jeden neuen Beat gilt der bereits etablierte Zwei-Stellen-Check aus `ChartEngine._draw()` (Initial-Render + `chart.update()`) und `FwAnnotationPulsePlugin` (`_reducedMotion()`-Guard in `afterDraw`) als Vorbild — keine neue Prüfmethode erfinden.
6. **Neue Fähigkeiten müssen opt-in sein und bestehende Charts unverändert lassen.** Jede neue Option (z. B. Tick-Unterdrückung im Zukunftsraum) braucht einen Default, der dem heutigen Verhalten (kein `displayRange` gesetzt → Achse folgt Daten) entspricht.
7. **Card-to-Point-Zielkoordinaten sind heute nicht öffentlich abrufbar.** `ChartEngine.renderFromData()` gibt weder die `Chart`-Instanz noch eine Koordinaten-Query-Methode nach außen. Diese Lücke ist real und muss in einem späteren Architektur-/Bau-AP geschlossen werden — hier nur als Kontrakt-Kandidat markiert, nicht entschieden.
8. **Bestehende, bereits produktiv genutzte Plugins werden wiederverwendet, nicht neu erfunden.** `FwVerticalLinePlugin` für die Gegenwartslinie, `FwAnnotationPulsePlugin`-Muster (WeakMap, `afterDraw`, RM-Guard) als Vorlage für neue Canvas-Animationen.
9. **Screen-3- und Screen-4-Timing-Choreographie (Fade-Staffelung, 800ms-Stille, Button-Reveal) ist reine App-Orchestrierung in `app.js`, ohne jede Chart-Engine-Beteiligung.** Die Chart-Engine wird zeitversetzt aufgerufen (analog zu `renderS3()` heute), kennt aber keine Beat-Logik.
10. **Tick-Verhalten im Zukunftsraum ist ein offener Gestaltungspunkt, kein Blocker.** Der aktuelle Algorithmus generiert per Default Ticks bis `displayRange.max` — ob das im Zukunftsraum gewünscht ist (z. B. „2027", „2028" als Beschriftung) oder unterdrückt werden soll, ist im Drehbuch nicht spezifiziert und wird an AP-02d/Bau-AP weitergereicht.

## Datenwahrheit und Zukunftsraum

- **Echte Daten:** `chartSeries` aus `MarketTimeStrategy` / `buildAppContext()` — 120 Monate reale MSCI-World-Werte, endet bei `latestMonth`. Für Screen 4 wäre das die vollständige (nicht auf eine Station truncatete) Serie.
- **Anzeige-Domain:** `xDisplayRange` (App-seitig übergeben) → `displayRange` (Strategy-intern berechnet, im `fwContext` abgelegt) → `axis.min/max` (Curator, `FwSmartXAxis.compute()`). Für Screen 4 müsste `xDisplayRange.max` auf `latestMonth + 120 Monate` gesetzt werden.
- **`chartSeries`:** darf für den Zukunftsraum **keinen** zusätzlichen Eintrag erhalten. Kein `{ month: '2036-06', depotwert: null }` und kein Platzhalter-Datensatz.
- **`dataRange`:** bleibt exakt der reale Datenbereich (`min`/`max` aus `snappedTimestamps` der echten `rows`). Wird durch `xDisplayRange` nicht verändert — die Trennung ist im bestehenden Code bereits strikt (siehe `LineChartStrategy.transform()` Z.322–327 vs. Z.302–314).
- **`displayRange` / `xDisplayRange`:** darf laut aktueller Validierung (`LineChartStrategy.js` Z.309–311) über `dataRange.max` hinausgehen — nur eine Unterschreitung von `dataRange.max` bzw. eine Überschreitung von `dataRange.min` ist verboten (die Anzeige-Domain muss die Daten-Domain vollständig einschließen, darf sie aber überall überragen). Diese Eigenschaft ist bereits heute Voraussetzung dafür, dass Screen 2 funktioniert (Anzeige zeigt 10 Jahre, Daten nur bis zur aktuellen Station) — Screen 4 nutzt exakt dieselbe Eigenschaft, nur mit Überstand nach der Zukunftsseite statt (implizit) nach der Vergangenheitsseite.
- **Tooltips:** `FwSmartTooltips` liest ausschließlich aus `fwContext` und den echten Datensatz-Punkten (`chart.data.datasets`). Da im Zukunftsraum kein Datenpunkt existiert, kann kein Tooltip dort erscheinen — das ist bereits durch die Abwesenheit von Daten strukturell sichergestellt, nicht durch eine explizite Sperrregel. Kein zusätzlicher Code nötig, aber im Bau-AP durch echten Test verifizieren (Hover im leeren Bereich darf keinen JS-Fehler werfen).
- **A11y:** `getA11yData()` (Layer 3, KDR 13) erzeugt die Screenreader-Tabelle ausschließlich aus `data.rows` (echte Daten). Ein leerer Zukunftsraum ohne Datenpunkte erzeugt dort automatisch keine Zeilen — muss aber im Summary-Text (`"${assetColumns.join(', ')}, ${firstDate} bis ${lastDate}, ${rows.length} Datenpunkte"`) weiterhin nur die echte Datenspanne nennen, nicht die erweiterte Anzeige-Domain. Dieser Text ist bereits an `rows` gebunden, nicht an `displayRange` — strukturell sicher, aber im Bau-AP explizit zu prüfen.
- **Verbotene technische Lösungen:** transparente/gestrichelte Zukunftslinie, Dummy-Dataset mit `y: null`-Punkten über den echten Bereich hinaus, `Chart.getChart()`-Post-Render-Hack, nachträgliches `options.scales.x.max`-Overwrite, `setTimeout`/`requestAnimationFrame`-Kaschierung der Achse (alle bereits in APP_SPEC §16.1 „Verbotene Implementierungen (AP-14b)" für Screen 2 festgehalten und gelten unverändert für Screen 4).

## Layer-Zuordnung

| Wirkung / Mechanik | Primärer Layer | Zulässige Verantwortung | Verbotene Abkürzung | Benötigter Kontrakt |
|---|---|---|---|---|
| Card-to-Point-Motion | App-State/Orchestration (Trigger) + Plugin (Zielkoordinate) | App-State löst Beat aus und animiert DOM-Karte; Zielkoordinate kommt aus dem Chart-Engine-internen Koordinatensystem | App liest Chart.js-Internals direkt am Plugin-Layer vorbei (z. B. eigenes `new Chart()`-Handle) | neue, minimale Lese-API oder Callback-Mechanismus vom Chart-Engine zur App (Kontrakt-Kandidat, siehe Card-to-Point-Kontrakt) |
| Marker-Pulse | Plugin | bestehendes `FwAnnotationPulsePlugin` unverändert wiederverwenden | eigene, parallele Pulse-Implementierung in app.js | keiner — bereits vorhanden |
| Screen-3 Satz → Chart → KPI | App-State/Orchestration | `app.js`-Screen-Controller ruft `renderS3()`/`renderKpiCards()` zeitversetzt auf | Timing-Logik in ChartEngine/Strategy verlagern | keiner — reine App-seitige Sequenzierung |
| Rubikon-X-Achse | Layer 3 Strategy (`xDisplayRange`) + Layer 4 Curator (`FwSmartXAxis`) | App übergibt erweiterten `xDisplayRange.max`, Strategy/Curator berechnen Achse wie gehabt | lokaler Chart.js-Achsen-Hack in app.js statt `xDisplayRange`-Nutzung | keiner — bestehender Kontrakt trägt bereits, siehe xDisplayRange-Abschnitt |
| Leerer Zukunftsraum | Layer 1 Vault (Abwesenheit von Daten) + Layer 3/4 (Anzeige-Domain) | keine Datenerzeugung, reine Achsenverlängerung | Fake-/Dummy-Datenpunkte, transparente Linie | keiner — Abwesenheit von Code ist die Lösung |
| Gegenwartslinie / blaue Linie | Plugin | bestehendes `FwVerticalLinePlugin` unverändert wiederverwenden (positioniert sich bereits am letzten echten Datenpunkt) | neue, parallele Linien-Implementierung | keiner — bereits vorhanden und passend |
| ✅ / ❓ | Plugin (Canvas) **oder** Renderer/CSS (DOM-Overlay) — Entscheidung offen | Positionierung an der Gegenwartslinie; Canvas-Variante analog `FwVerticalLinePlugin`, DOM-Variante als absolut positioniertes Overlay über dem Chart-Container | fragile Pixel-Berechnung außerhalb eines der beiden sanktionierten Pfade | Entscheidung Canvas vs. DOM (Kontrakt-Kandidat, siehe Plugin-/Symbol-Kontrakt) |
| 800ms Stille | App-State/Orchestration | reiner Timer in `app.js`, analog zu bestehenden `showScreen()`-Aufrufen | Verlagerung in ChartEngine/Strategy/Plugin | keiner — reine App-seitige Zeitsteuerung |
| Button-Reveal | App-State/Orchestration + CSS | Sichtbarkeit/Opacity-Wechsel nach Timer-Ablauf | Chart-Engine-Beteiligung | keiner |
| Reduced Motion | App-State (für neue Beats) + bestehende Plugin-/Engine-Guards (für Chart-Teile) | `window.matchMedia('(prefers-reduced-motion: reduce)')`-Check analog zu `ChartEngine._prefersReducedMotion()` und `FwAnnotationPulsePlugin._reducedMotion()` | neue, abweichende RM-Erkennungsmethode | keiner — bestehendes Muster kopieren |
| Mobile-Fallback | CSS/Renderer + App-State (Layout-Entscheidung Textkarte vs. Canvas-Symbol) | Breakpoint-gesteuerte Darstellung | eigenes zweites Design statt Anpassung | keiner, aber Spezifikationsbedarf für künftiges APP_SPEC-Update (bereits in AP-02b notiert) |

## fwContext-/Rucksack-Prüfung

| Information | Gehört in fwContext? | Statischer Kern / dynamische Schale / App-State / Runtime-State | Begründung |
|---|---:|---|---|
| dataRange | ja | statischer Kern (Pflichtfeld, Fail-Fast bei Fehlen) | bereits heute Pflichtfeld in `_createFwContext`, ändert sich nicht durch Rubikon |
| displayRange / xDisplayRange | ja | statischer Kern, aber optional (kein Pflichtfeld) | bereits heute vorhanden (AP-14b), Rubikon nutzt denselben Mechanismus nur mit größerem Überstand |
| Zukunftsraum-Dauer | nein, nicht als eigenes Feld nötig | ergibt sich implizit aus `displayRange.max − dataRange.max` | kein neues Feld nötig, wäre redundant zu bereits vorhandenen Werten |
| Gegenwartslinie | nein | ergibt sich implizit aus letztem Datenpunkt (`FwVerticalLinePlugin` liest `meta.data[last]`) | kein Kontext-Feld nötig, rein visuelle Ableitung im Plugin |
| Rubikon-Beat-State | nein | App-State | Beat-Sequenz (welcher Beat läuft gerade) ist reine UI-Orchestrierung in `app.js`, hat keinen Bezug zu Chart-Daten oder -Darstellung im Sinne des Rucksacks |
| Card-to-Point-Zielpunkt | nein, als fester Rucksack-Wert ungeeignet | Runtime-State (ephemer) — falls über Plugin gelöst, analog zu Marker-Pulse-Positionen | Zielkoordinate ändert sich pro Stationswechsel, ist kein „Kern"-Feld, sondern flüchtiger Zustand wie bei `FwAnnotationPulsePlugin._pulseState` |
| Marker-Pulse-State | nein (bereits so implementiert) | Runtime-State (WeakMap, ephemer) | exakt wie in `FwAnnotationPulsePlugin` bereits umgesetzt — kein Vorbild-Bruch nötig |
| isMobile / Breite | ja (bereits im Zwiebel-Modell vorgesehen) | dynamische Schale | laut Rucksack-Dokument §2.3 bereits als Schicht-B-Feld definiert, wird zur Laufzeit gemessen |
| 800ms-Timer | nein | App-State | reiner Screen-Controller-Timer, hat nichts mit Chart-Rendering zu tun |
| CTA-URL | nein | App-State / redaktionelle Konfiguration | keine Chart-Darstellungsinformation, gehört nicht in den Rucksack |

## xDisplayRange-/Zukunftsfenster-Kontrakt

- **Reicht `xDisplayRange` konzeptionell?** Ja, für die Kernmechanik (Achse zeigt mehr als die Daten). Die Validierung in `LineChartStrategy.transform()` prüft nur `dispMinTs > drMin` und `dispMaxTs < drMax` als Fehlerfälle — eine Überschreitung von `dataRange.max` nach oben ist nicht verboten und wird von `FwSmartXAxis.compute()` (`axis.max = fwContext.displayRange.max`) korrekt in eine erweiterte, leere Achse übersetzt.
- **Bedingungen:** Der übergebene `chartSeries`/`visibleSeries`-Datensatz darf für Screen 4 keinen Eintrag jenseits `latestMonth` enthalten. Y-Achse (`yRangePolicy: 'cumulative-expand-zero'`) bleibt unverändert korrekt, da sie nur auf tatsächlich vorhandene Datenpunkte reagiert.
- **Zusätzlicher Kontrakt nötig für:** die Frage, ob im Zukunftsraum Achsen-Ticks/Beschriftungen erscheinen sollen. Der bestehende Tick-Generator (`FwSmartXAxis.js` Z.416) läuft standardmäßig bis `displayRange.max`. Falls das Drehbuch einen komplett leeren, unbeschrifteten Zukunftsraum will (wofür „Nur Raum." spricht), müsste eine neue, optionale Steuergröße ergänzt werden (Kontrakt-Kandidat, z. B. `xDisplayRange.suppressFutureTicks: true` — Name nicht bindend). Das ist eine additive Erweiterung, kein Bruch bestehender Nutzung.
- **Opt-in-Regel:** Neue Steuergrößen wirken nur, wenn explizit gesetzt. Ohne sie bleibt das heutige Verhalten (Ticks bis `displayRange.max`) erhalten — kein bestehender Chart wird beeinflusst, da kein anderer Aufrufer `xDisplayRange` über `dataRange.max` hinaus nutzt.
- **Default-Regel:** Fehlt `xDisplayRange` komplett, bleibt die Achse wie heute rein datengetrieben (`bounds: 'data'`-Fallback in `FwSmartXAxis`).
- **Regression-Schutz:** Screen 2 und Screen 3 nutzen `xDisplayRange` bereits produktiv (Screen 2 rückwärtsgewandt begrenzt, Screen 3 implizit über die volle Serie). Jede neue Erweiterung muss an bestehenden Testfällen (`app.test.html`, Szenarien U/W/X/Y aus B1-STATIONS-v3.0) nicht regressieren — das ist ein Bau-AP-Prüfpunkt, kein Architekturrisiko.
- **Verbotene Lösungen:** siehe „Verbotene technische Lösungen" oben (Datenwahrheit-Abschnitt) — identisch gültig.

## Plugin-/Symbol-Kontrakt

- **Blaue Gegenwartslinie:** gehört ins bestehende `FwVerticalLinePlugin` (Feature-Flag `verticalLine: 'last'`, bereits heute für Screen 3 genutzt). Für Screen 4 identisch aktivierbar, keine Codeänderung nötig — das Plugin positioniert sich bereits korrekt am letzten realen Datenpunkt, auch wenn die Achse durch `xDisplayRange` weiter reicht.
- **✅ / ❓:** zwei plausible, architekturkonforme Pfade — **(a) Canvas-Plugin**, analog zu `FwVerticalLinePlugin`/`FwAnnotationPulsePlugin`: liest die Pixel-Position der Gegenwartslinie (`meta.data[last].x`) im `afterDraw`-Hook und zeichnet die Symbole links/rechts davon; **(b) DOM-Overlay**, absolut positioniert über dem Chart-Container via CSS, mit Positionsberechnung aus `canvas.getBoundingClientRect()` plus der bekannten Pixel-Position. Beide sind mit der bestehenden Architektur vereinbar. Canvas hat den Vorteil, dass Resize/Redraw automatisch mitläuft (wie beim Vertical-Line-Plugin); DOM hat den Vorteil, dass Emoji/Text-Rendering (Schriftart, Screenreader-Zugriff) einfacher ist. **Diese Entscheidung wird hier nicht getroffen** — Kontrakt-Kandidat für AP-02d/Bau-AP.
- **Canvas vs. DOM — Kriterium:** Wenn A11y-Text direkt am Symbol hängen soll (z. B. „Vergangenheit / Zukunft" als Screenreader-Label), spricht das für DOM (natives `aria-label` auf einem echten Element). Wenn visuelle Konsistenz mit den übrigen Canvas-Elementen (Marker, Linie) Priorität hat, spricht das für Canvas.
- **Mobile-Fallback:** Drehbuch nennt bereits „Textkarte unter Chart" als Fallback — das ist unabhängig von Canvas/DOM ein reiner Renderer-/CSS-Layer-Entscheid (andere Darstellung unterhalb eines bestimmten Breakpoints), kein Architekturkonflikt.
- **A11y:** unabhängig von der Canvas/DOM-Entscheidung muss ein Text-Äquivalent existieren (z. B. in der ohnehin vorhandenen `getA11yData()`-Tabelle oder als zusätzlicher `aria-live`-Hinweis analog zu `stationLiveMessage`). Muss im Bau-AP konkretisiert werden.
- **Verbotene Pixel-Hacks:** kein `Chart.getChart()`-Post-Render-Zugriff von außerhalb eines Plugins, keine hartcodierten Pixel-Offsets, die die Chart-Breite ignorieren (§16.1-Verbotsliste gilt analog).

## Card-to-Point-Kontrakt

- **Benötigte Information:** Ziel-Pixelposition (x/y) der neu erscheinenden Station auf der Screen-2-Chartlinie, im Moment des Kartenwechsels.
- **Zulässige Schnittstelle:** aktuell **nicht vorhanden**. `ChartEngine.renderFromData()` gibt weder `Chart`-Instanz noch Koordinaten nach außen — die gesamte Zustandsverwaltung (`_appChartStates`, `WeakMap`) ist Engine-intern (Layer 2). Ein direkter Zugriff von `app.js` auf `chart.getDatasetMeta()` wäre nur möglich, wenn die Engine eine `Chart`-Referenz oder eine Koordinaten-Query-Methode exponiert — das existiert heute nicht.
- **Zwei Kontrakt-Kandidaten** (keine Entscheidung in diesem AP):
  1. **Minimale Read-Only-Query-API:** `chartEngine.getPointScreenPosition(container, month)` o. ä. — kleine, additive Erweiterung von `ChartEngine`, liefert Pixel-Koordinaten relativ zum Container. Bleibt Layer-2-Verantwortung, App bleibt Konsument.
  2. **Plugin-getriebener Event/Callback-Ansatz:** ein neues Plugin (analog `FwAnnotationPulsePlugin`) berechnet die Zielposition selbst im `afterDraw`-Hook und meldet sie per Callback/CustomEvent an `app.js` — die Chart-Engine bleibt vollständig kapselnd, die App reagiert nur auf das Ereignis.
- **App-State:** Auslösen des Beats (Klick auf „Weiter investiert bleiben"), Verwaltung der DOM-Karte, Start/Ende der Bewegung.
- **Chart-/Plugin-Verantwortung:** ausschließlich Bereitstellung der Zielkoordinate — niemals DOM-Manipulation der Karte durch die Chart-Engine.
- **Verbotene Kopplung:** `app.js` darf nicht eigenständig eine zweite, parallele `Chart`-Instanz oder `Chart.getChart(canvas)` verwenden, um an Layout-Daten zu kommen — das würde die WeakMap-State-Kapselung der Engine umgehen und laut `ChartEngine`-Kommentar („Typ-Wechsel nach initialem Render ist verboten") gegen das Kontroll-Prinzip der Engine verstoßen.
- **Reduced-Motion-Endzustand:** Karte erscheint direkt in ihrer finalen (kleinen, am Chartpunkt liegenden) Position ohne Bewegung — Information (welche Station war das, wo liegt sie) bleibt vollständig erhalten, nur die Bewegung entfällt. Deckt sich mit dem bereits etablierten Reduced-Motion-Prinzip aus §14.6.

## Screen-3-Reveal-Kontrakt

- **Primärer Layer:** App-State/UI-Orchestration in `app.js` (Screen-Controller, `showScreen()`/`renderS3()`-Umgebung).
- **Chart-Engine-Beteiligung:** keine über das bereits Bestehende hinaus. `chartEngine3.renderFromData()` wird lediglich zeitversetzt statt sofort aufgerufen. Die Engine kennt keinen „Reveal"-Begriff.
- **A11y-Endwissen:** `revealA11ySummary` (bereits in §13.2 definiert) darf weiterhin erst gesetzt/angekündigt werden, wenn der volle Reveal (inklusive KPI) sichtbar ist — nicht schon beim ersten Satz. Die zeitliche Staffelung darf die bestehende A11y-Reihenfolge nicht vorwegnehmen.
- **Reduced Motion:** alle drei Phasen (Satz, Chart, KPI) erscheinen sofort/gleichzeitig, ohne Fade und ohne Verzögerung — Information bleibt vollständig erhalten, nur die zeitliche Inszenierung entfällt.
- **Bleibt / wird ersetzt:** DOM-Grundstruktur (Headline → Subline → Chart-Section → KPI-Slot → AssumptionsBox, app.js Z.368–391) bleibt unverändert bestehen. Ersetzt wird nur die Render-Reihenfolge/das Timing in `renderS3()` sowie die Copy-Texte (laut AP-02b bereits als redaktionelle Aufgabe eingeordnet).

## 800ms-Stille-Kontrakt

- **Fachlicher Status:** entschieden (Steuerfaden). Nicht Gegenstand dieser Prüfung.
- **Primärer Layer:** App-State / Screen-Orchestration in `app.js`, exakt auf derselben Ebene wie `showScreen()`-Aufrufe und Button-Sichtbarkeitssteuerung.
- **Nicht zuständig:** ChartEngine, Strategy, Curator, Plugin, Renderer der Chart-Engine — die 800ms-Stille hat keinerlei Bezug zu Daten oder Darstellung eines Charts, sie betrifft ausschließlich die Sichtbarkeit des Buttons nach dem Symbol-/Satz-Beat.
- **Nutzerkontrolle:** Die Stille ist eine reine Wartezeit ohne Interaktionsmöglichkeit (laut Drehbuch explizit gewollt: „Kein Button, keine Ablenkung"). Das ist die Ausnahme, die der Steuerfaden für diese eine Stelle bereits freigegeben hat. Sie darf nicht zusätzlich durch Klick/Tastatur überspringbar gemacht werden, außer Albert entscheidet das separat — hier nicht vorentschieden.
- **Tastatur/Screenreader:** Während der Stille darf kein interaktives Element (insbesondere der noch nicht sichtbare Button) im Tab-Fokus oder für Screenreader erreichbar sein — der Button darf erst nach den 800ms ins DOM/den Fokusring eintreten oder muss bis dahin `hidden`/`aria-hidden` bleiben, analog zum bestehenden `tabIndex = -1`/Fokus-Management-Muster der anderen Screens.
- **Reduced Motion:** **Empfehlung (Kontrakt-Kandidat, keine Vorentscheidung):** Die 800ms-Stille selbst enthält keine Bewegung — kein Element animiert, nichts fährt oder faded während der Stille. Sie fällt damit eher unter „Timing/Pacing" als unter „Motion" im engeren Sinn von §14.6. Empfehlung: die Stille bleibt auch bei `prefers-reduced-motion` bestehen (da sie inhaltlich, nicht dekorativ motiviert ist), während die *vorangehenden* Beats (Symbol-Fade, Satz-Fade) unter Reduced Motion sofort erscheinen. Diese Empfehlung ersetzt keine Alberts-Entscheidung — sie ist ein Vorschlag für den Bau-AP.
- **Spätere APP_SPEC-Konsequenz:** §14.6 („keine künstliche Wartepflicht vor dem Button") braucht eine dokumentierte Rubikon-Ausnahme in einem künftigen Spec-AP, z. B. sinngemäß: „Ausnahme Screen 4 Beat 4: 800ms fester Pausenbeat, fachlich begründet im Drehbuch, gilt nicht als künstliche Wartepflicht im Sinne dieser Regel." Dieser AP schreibt diese Ausnahme nicht selbst in die APP_SPEC — das ist Aufgabe eines späteren Spec-AP.
- **Verbotene Umsetzung:** Stille als Chart-Engine-Animation-Delay kaschieren, Stille an Chart-Ladezeiten koppeln, Stille durch künstliche Netzwerk-/Rendering-Verzögerung simulieren statt als expliziten Timer.

## Reduced-Motion-Kontrakt

| Wirkung | Standardmodus | Reduced-Motion-Endzustand | Information bleibt erhalten? | Offene QA |
|---|---|---|---:|---|
| Card-to-Point-Motion | Karte schrumpft/wandert (300ms) → Punkt pulst → nächste Karte fadet ein (200ms) | Karte erscheint direkt in Zielposition, kein Schrumpfen/Wandern | ja | Prüfen, ob „Zielposition" für RM überhaupt sichtbar dargestellt werden muss oder die Karte einfach ausgetauscht wird wie heute |
| Marker-Pulse | 1200ms, 1.8×, 2 Pulse | Ring bleibt statisch sichtbar (bereits implementiert, `_reducedMotion()`-Guard) | ja | keine — bereits gelöst |
| Screen-3 Reveal | Satz → Chart-Fade → KPI-Fade, gestaffelt | alle drei Elemente sofort/gleichzeitig sichtbar | ja | Reihenfolge der A11y-Ankündigung bei Sofort-Anzeige festlegen |
| Rubikon-X-Achse | Achse „fährt" 500ms nach rechts, Chart schrumpft optisch | Achse erscheint sofort in finaler (erweiterter) Position | ja | keine zusätzliche, nur Standard-RM-Guard vor `new Chart()`/`chart.update()` wie bereits in `ChartEngine._draw()` |
| ✅ / ❓ | Fade-in nach 300ms Pause | Symbole erscheinen sofort, kein Fade | ja | A11y-Text-Äquivalent unabhängig vom Motion-Modus sicherstellen |
| 800ms Stille | feste 800ms Pause | siehe 800ms-Stille-Kontrakt — Empfehlung: Stille bleibt bestehen (kein Motion-Element), nur vorangehende Fades entfallen | ja | Alberts Bestätigung der Empfehlung ausstehend |
| Button-Reveal | Fade-in nach der Stille | Button ist sofort sichtbar/fokussierbar, sobald sein Anzeigezeitpunkt erreicht ist | ja | Fokus-Management-Regel (analog `h2.focus()` bei Screen-Wechsel) für den neuen Button-Reveal-Moment festlegen |

## Mobile-/A11y-Kontrakt

- **Mobile-Grundsatz:** bleibt „eine Anpassung, kein zweites Design" (§14.0, vom Drehbuch bestätigt) — Rubikon-Elemente werden auf Mobile umplatziert oder vereinfacht, nicht durch eine komplett andere Interaktion ersetzt.
- **Zukunftsraum Mobile:** Drehbuch verlangt „mindestens ein Drittel Chartbreite — vor Go-Live testen" (eigener QA-Auftrag aus dem Drehbuch selbst, keine Architekturfrage).
- **✅ / ❓ Mobile:** laut Drehbuch „unter dem Chart als Textkarte, falls zu eng" — reiner Renderer-/CSS-Breakpoint-Entscheid, siehe Plugin-/Symbol-Kontrakt.
- **Textkarten-Fallback:** technisch unabhängig von Canvas/DOM-Entscheidung umsetzbar, da beide Pfade eine reine Sichtbarkeits-/Layout-Umschaltung unterhalb eines Breakpoints erlauben.
- **Screenreader-Aussage Zukunftsraum:** darf ausschließlich sagen, dass hier ein noch unbekannter, zukünftiger Zeitraum beginnt — niemals eine Zahl, einen Trend oder eine Erwartung nennen.
- **Verbotene A11y-Aussage:** jede Formulierung, die Zukunftsdaten, -werte oder -tendenzen suggeriert („die nächsten 10 Jahre werden voraussichtlich...", Prozentangaben, Trendpfeile) — deckt sich mit APP_SPEC §17 (verbotene Prognose) und §14.1 (kein Endwissens-Leak).
- **QA-Punkte:** Hover/Tap im leeren Zukunftsraum darf keinen Tooltip und keinen JS-Fehler erzeugen (siehe Datenwahrheit-Abschnitt); Screenreader darf beim Durchlaufen der A11y-Tabelle keine „leeren" Zukunftszeilen ankündigen.

## Opt-in- und Regression-Kontrakt

- **Neue opt-in-Fähigkeiten:** erweiterter `xDisplayRange.max` über `dataRange.max` hinaus (nutzt bestehenden Kontrakt); mögliche neue Steuergröße für Tick-Unterdrückung im Zukunftsraum (additiv); mögliche neue Card-to-Point-Koordinaten-API (additiv, Layer 2).
- **Defaults:** kein `xDisplayRange` → Achse bleibt datengetrieben (heutiges Verhalten). Keine neue Tick-Steuergröße gesetzt → Ticks laufen wie heute bis `displayRange.max` (kein neues Verhalten ungewollt aktiviert).
- **Wiederverwendbare bestehende Mechaniken:** `xDisplayRange`/`displayRange` (AP-14b), `FwVerticalLinePlugin` (unverändert), `FwAnnotationPulsePlugin`-Muster (WeakMap + `afterDraw` + RM-Guard als Vorlage), `ChartEngine._prefersReducedMotion()`-Pattern, `yRangePolicy: 'cumulative-expand-zero'` (bleibt für Screen 4 unverändert nutzbar, da Y-Achse nur auf echte Daten reagiert).
- **Nicht umzudeutende bestehende Mechaniken:** `dataRange` darf niemals Zukunftswerte enthalten; `verticalLine: 'last'` darf nicht so umgebaut werden, dass es sich am Chart-Rand statt am letzten Datenpunkt orientiert (würde Screen 3 brechen); die WeakMap-Typ-Wechsel-Sperre in `ChartEngine` darf nicht umgangen werden, um einen Container für mehrere Chart-Typen wiederzuverwenden.
- **Spätere Regressionstests:** bestehende Screen-2/3-Testszenarien (`app.test.html`, Szenarien U/W/X/Y aus B1-STATIONS-v3.0) müssen nach jeder Rubikon-Implementierung unverändert grün bleiben; Marker-Pulse auf Screen 2 darf durch eine neue Card-to-Point-API nicht beeinträchtigt werden; Y-Achsen-Gedächtnis (`axisMemory.yMaxSeen`) darf durch einen neuen Screen-4-Chart-Container nicht mit Screen 2/3 kollidieren (WeakMap ist bereits pro Container isoliert, daher strukturell sicher).

## Offene Punkte für AP-02d

- **Architektur:** Card-to-Point-Koordinaten-API (Kandidat 1 vs. 2, siehe Card-to-Point-Kontrakt); Tick-Unterdrückung im Zukunftsraum (ja/nein, welche Steuergröße); Canvas- vs. DOM-Entscheidung für ✅/❓
- **Spec/Migration:** §14.6-Rubikon-Ausnahme muss in künftigem Spec-AP dokumentiert werden; §16-Screen-4-Primitive-Liste muss um Chart, Symbole, Beat-Choreographie erweitert werden
- **Produkt:** CTA-Ziel-URL (E-04, unverändert seit AP-01 offen); Pulse-Anzahl 1× (Drehbuch) vs. 2× (Ist) redaktionell abgleichen; Alberts Bestätigung der 800ms-Reduced-Motion-Empfehlung aus diesem Protokoll
- **Redaktion:** Screen-1-Subline-Abgleich gegen Drehbuch (unverändert aus AP-02b); „Station 1 von 8" → „Station 1 von 7" im Drehbuchtext
- **Code:** Card-to-Point-Beat A–C, Screen-3-Fade-Staffelung, Rubikon-Beats 1–3 und 5, neue Screen-4-Chart-Mount-Erstellung in app.js, showScreen()-Transition (bereits vor diesem AP als offen bekannt, B1-AP-15a)
- **CSS/Motion:** keine bestehende Animation/Transition/Keyframe-Basis vorhanden — alles neu; Mobile-Responsive-Tabelle aus Drehbuch noch nicht in APP_SPEC übernommen
- **A11y:** Text-Äquivalent für ✅/❓ konkretisieren; A11y-Ankündigungsreihenfolge für Screen-3-Staffelung festlegen; Screenreader-Verhalten im leeren Zukunftsraum im Bau-AP verifizieren (nicht nur strukturell annehmen)
- **Reduced Motion:** Empfehlung zur 800ms-Stille braucht Alberts Bestätigung (siehe 800ms-Stille-Kontrakt); Fokus-Management-Regel für neuen Button-Reveal-Moment festlegen
- **Mobile:** Zukunftsraum-Mindestbreite vor Go-Live testen (Drehbuch-eigene Forderung); Textkarten-Fallback-Breakpoint festlegen
- **QA:** Hover/Tap-Test im leeren Zukunftsraum (kein Tooltip, kein JS-Fehler); Regressionstest bestehender Screen-2/3-Szenarien nach jeder Rubikon-Implementierung
- **Backlog:** visuelles Design-Vakuum (B1-UX-01 Befund 4) wird durch Rubikon-/Card-to-Point-Bau voraussichtlich mit-adressiert, kein eigener AP nötig

Hinweis: Die 800ms-Stille steht hier ausschließlich als Reduced-Motion-/A11y-Ausgestaltungsfrage und als spätere APP_SPEC-Konsequenz, nicht als offene Produktentscheidung, ob sie gilt.

## Nicht geändert

- keine APP_SPEC geändert
- kein app.js geändert
- kein app.css geändert
- keine Stationsdaten geändert
- kein Drehbuch geändert
- keine AP-02a/AP-02b-Dateien geändert
- keine Architekturdateien geändert
- keine Engine-Dateien geändert
- keine Plugin-Dateien geändert
- kein Commit
- kein Abschlussritual

## Scope- und Diff-QA nach Write

Nach dem Schreiben dieses Protokolls:

```
git status --short:
 M .claude/learning/session-log.md
?? Apps/prokrastinations-preis/AP-prokrast-01_befund-anamnese.md
?? Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md
?? docs/steering/patches/AP-prokrast-02a_quelleninventur-datei-wahrheit_Ergebnis.md
?? docs/steering/patches/AP-prokrast-02b_soll-ist-architektur-konfliktmatrix_Ergebnis.md
?? docs/steering/patches/AP-prokrast-02c_architektur-kontrakt_context-datenwahrheit_Ergebnis.md

git diff --name-status:
M	.claude/learning/session-log.md
```

Bewertung: Nur die erlaubte Ergebnisdatei ist neu hinzugekommen. APP_SPEC.md, app.js, app.css, stations.de.json, Chart-Engine (inkl. der gezielt gelesenen Dateien ChartEngine.js, LineChartStrategy.js, BaseChartStrategy.js, FwSmartScales.js, FwSmartXAxis.js, FwVerticalLinePlugin.js, FwAnnotationPulsePlugin.js) und alle übrigen Plugins sind unverändert. Keine unerwarteten Diffs.

## Nächster richtiger AP

AP-prokrast-02d — Migrationsschnitt, AP-Schnitt und Rücklaufkapsel an den Masterfaden

Ziel von AP-02d: Aus AP-02a–c einen finalen Migrationsschnitt und genau einen empfohlenen nächsten Haupt-AP ableiten. Besonders zu bündeln: die beiden noch offenen Architektur-Kandidatenentscheidungen (Card-to-Point-API, Canvas-vs-DOM für Symbole), die Reduced-Motion-Empfehlung zur 800ms-Stille zur Bestätigung an Albert, und die Priorisierung zwischen den drei Bauflächen (Screen 2 Card-to-Point, Screen 3 Timing, Screen 4 Rubikon-Gesamtmechanik).

## Ausdrücklich nicht nächster AP

- Bau-AP
- APP_SPEC-Patch
- Rubikon-Prototyp
- Screen-3-Reveal-Minifix
- Card-to-Point-Minifix
- CSS-Motion-Patch
- Chart-Engine-Patch
- Commit
- Abschlussritual
