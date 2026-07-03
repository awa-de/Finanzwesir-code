# AP-prokrast-03f — Screen-4 Rubikon-Reveal Integration mit FwChartTextPlugin Ergebnis

## Status

GELB

## Kurzbefund

Der Rubikon-Reveal für Screen 4 ist vollständig implementiert: neue `chartEngine4`-Instanz, neuer Chart-Mount-Container (`chartSection4`), zwei `renderFromData()`-Aufrufe (Smart Update statt manuellem `chart.update()`), `xDisplayRange`-Erweiterung nach rechts, `features.verticalLine:'last'`, `FwChartTextPlugin` mit leerem Initial-Zustand und gefülltem Final-Zustand, A11y-DOM-Kopie über die bestehende `aria-live`-Region, CTA-Reveal via `hidden`-Attribut, Timer-Cleanup gegen Mehrfach-Reveals. Ausschließlich `app.js` wurde geändert (83 additive Zeilen, keine Löschung); `app.css` blieb unangetastet, da die vorhandene Klasse `fw-app__chart-section` für Layout ausreichte. Kein Engine-/Plugin-/Spec-Diff.

**Grund für GELB statt GRÜN:** Albert hat für diesen AP explizit keine Browser-Automatisierung gewünscht ("Kein Playwright, ich teste manuell") — ein bereits begonnener Versuch, Playwright zur Selbstverifikation zu nutzen, wurde auf diese Anweisung hin sofort abgebrochen. Die Implementierung ist vollständig code-pfad-analysiert und gegen die Vorbedingungen aus AP-03a/03b/03d/03e verifiziert, aber die visuelle Reveal-Bewegung, das Reduced-Motion-Verhalten und die Mobile-Darstellung wurden in diesem AP nicht im echten Browser beobachtet. Symbole (✅/❓) wurden bewusst nicht umgesetzt (siehe „Canvas-Text" unten).

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short` (vor Implementierung): `M .claude/learning/session-log.md` — eigene Änderung aus dieser Session (Kettenmodus-Session-Start-Eintrag), keine Fremdänderungen
- `git diff --name-status` (vor Implementierung): `M .claude/learning/session-log.md`

Repo-Namensdiskrepanz `Finanzwesir 2.0` vs. `Finanzwesir-code` wie in AP-prokrast-02a/03a–e dokumentiert — kein Stop, Pfad plausibel.

## Gelesene Pflichtquellen

- `docs/steering/patches/AP-prokrast-03e_abschluss-qa_fw-chart-text-plugin_claims-vs-files_Ergebnis.md` — vollständig gelesen
- `docs/steering/patches/AP-prokrast-03d_fw-chart-text-plugin_minimum-implementierung_Ergebnis.md` — vollständig gelesen (inkl. beider Nachträge)
- `Apps/prokrastinations-preis/app.js` — vollständig gelesen (788 Zeilen, vor Patch)
- `Apps/prokrastinations-preis/app.css` — vollständig gelesen (286 Zeilen)
- `docs/steering/patches/AP-prokrast-03b_rubikon-reveal_architekturvorschlaege_peer-review-dossier_Ergebnis.md` — vollständig gelesen
- `docs/steering/patches/AP-prokrast-03a_architektur-anamnese_rubikon-x-achse-plugin-vertrag_Ergebnis.md` — vollständig gelesen
- `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` — vollständig gelesen
- `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js` — vollständig gelesen (115 Zeilen)
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` — vollständig gelesen (523 Zeilen)
- `Theme/assets/js/fw-chart-engine/plugins/FwVerticalLinePlugin.js` — vollständig gelesen (26 Zeilen)
- `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js` — gezielt gegen `xDisplayRange`-Validierung geprüft (Grep, Zeilen 301–329), Rest bereits in AP-03a/03b vollständig gelesen und seither unverändert (per `git diff --name-status` bestätigt)
- `Theme/assets/js/fw-chart-engine/core/FwSmartXAxis.js` — gezielt gegen `displayRange`/`endLimit`-Logik geprüft (Grep, Zeilen 229–236, 331–334, 411–418), Rest bereits in AP-03a/03b vollständig gelesen
- APP_SPEC.md: nicht erneut gelesen — keine Screen-4-Frage in diesem AP war ohne APP_SPEC nicht entscheidbar

## Geänderte Dateien

Erlaubt:

- `Apps/prokrastinations-preis/app.js`: geändert, 83 additive Zeilen, 0 Löschungen (`git diff --stat` bestätigt)
- `Apps/prokrastinations-preis/app.css`: unverändert (0 Diff, `git diff` bestätigt) — vorhandene Klasse `fw-app__chart-section` reichte für den neuen Chart-Container
- `docs/steering/patches/AP-prokrast-03f_screen-4_rubikon-reveal_integration_fw-chart-text_Ergebnis.md`: dieses Protokoll

Nicht erlaubt und nicht geändert (alle per `git diff --name-status` bestätigt, kein Treffer):

- `FwChartTextPlugin.js`: unverändert
- `ChartEngine.js`: unverändert
- `plugins/index.js`: unverändert
- `FwAnnotationPulsePlugin.js`: unverändert
- `FwVerticalLinePlugin.js`: unverändert
- `LineChartStrategy.js`: unverändert
- `FwSmartXAxis.js`: unverändert
- `APP_SPEC.md`: unverändert
- `stations.de.json`: unverändert
- `app.test.html`: unverändert
- `docs/spec/*`: unverändert

## Anamnese-Befund app.js

- Screen-4-Position im Render-Flow: `renderContent()` baut Screen 4 als viertes `<section data-fw-screen="4">` (vor Patch nur Headline/Subline/CTA/Nav, kein Chart); sichtbar geschaltet über `showScreen(4, true)`, ausgelöst durch `btnS3Next`-Klick
- vorhandene ChartEngine-Instanzen: `chartEngine2` (Screen 2, Journey-Schritte), `chartEngine3` (Screen 3, Endreveal) — beide als `const` im Closure-Scope von `renderContent()`; Screen 4 hatte vor diesem AP keine eigene Instanz
- bestehende Screen-2/3-Render-Muster: beide rufen `buildAppContext()` frisch pro Render auf und übergeben `ctx.chartSeries` an `chartEngineX.renderFromData(container, series, { type:'line', features:{...}, ... })` — kein Caching der Chart-Serie zwischen Renderaufrufen
- `latestMonth` / referenceMonth: `appData.latestMonth`, gespiegelt in `ctx.latestMonth` über `buildAppContext()`; Quelle ist `buildActiveJourneyWindow(msciData)` beim Laden (letzter CSV-Datensatz)
- Datumshilfen: `subtractMonths(yyyyMm, n)` bereits vorhanden; `addMonths` fehlte — als neue, rein lokale Funktion in `app.js` ergänzt (nicht in `FwDateUtils.js`, Tabu-Zone)
- CTA-/A11y-Muster: `cta`-Element (`<a>`, `fw-app__cta`) bereits vorhanden; geteilte `a11yRegion` (`aria-live="polite"`, Klasse `fw-app__visually-hidden`) bereits vorhanden und von S2/S3 bereits für Reveal-Announces genutzt
- Timer-/State-Strategie: vor diesem AP existierte in `app.js` kein `setTimeout`/Timer-Handle; S3 nutzt ein „last rendered for rate"-Cache-Muster (`lastRenderedRateS3`) um Re-Renders zu vermeiden — dieses Muster wurde für S4 übernommen (`screen4RevealedRate`)

## Implementierter Rubikon-Reveal

- initialer `xDisplayRange`: `{ min: ctx.startMonth, max: ctx.latestMonth }` — identisch zu `dataRange`, kein Zukunftsraum
- finaler `xDisplayRange`: `{ min: ctx.startMonth, max: addMonths(ctx.latestMonth, 119) }`
- Datumsarithmetik 119/120: `startMonth` wird an anderer Stelle bereits als `subtractMonths(latestMonth, 119)` berechnet (`buildActiveJourneyWindow`), wodurch das Vergangenheitsfenster `[startMonth, latestMonth]` eine Breite von 119 Kalendermonaten hat. Für exakte 50/50-Symmetrie der Chart-Fläche (von AP-03a explizit als Konsequenz aus `pastMonths=futureMonths=120` hergeleitet) muss das Zukunftsfenster dieselbe Breite haben — daher `addMonths(latestMonth, 119)` statt `120`. Eine Nutzung von `+120` hätte eine sichtbare, unbeabsichtigte Asymmetrie (Gegenwartslinie leicht links der Mitte) erzeugt. Diese Wahl setzt die Vorgabe „nicht eigenmächtig zwischen 119/120 wechseln" um, indem konsequent dieselbe Konvention wie für `startMonth` verwendet wird.
- gleiche Datenserie in beiden Rendern: `renderScreen4Initial()` und `renderScreen4Final()` rufen jeweils unabhängig `buildAppContext(appData, currentRate, startBetrag, journeyStations)` auf — deterministisch identischer Inhalt bei gleichem `currentRate`/`startBetrag` (keine neuen Datenpunkte, kein Caching-Unterschied zu S2/S3-Muster)
- `features.verticalLine:'last'`: in beiden Renderaufrufen gesetzt (Plugins werden nur bei `new Chart()` registriert, siehe AP-03d-Fund — daher bereits im Initialrender aktiv)
- `chartText` Initialrender `annotations: []`: ja, Plugin dadurch registriert, zeichnet aber nichts
- `chartText` Finalrender `annotations: [...]`: ja, ein Eintrag `{ id:'future-copy', text: RUBIKON_CANVAS_TEXT, x:0.75, y:0.35, align:'center', baseline:'middle' }`, exakt wie im Auftrag vorgegeben
- keine Zukunftsdaten: `chartSeries` stammt in beiden Aufrufen aus derselben `marketTimeStrategy()`-Berechnung über die realen 120 CSV-Monate, endet immer bei `latestMonth`
- keine Dummy-Punkte: keine zusätzlichen Datenpunkte, kein zweites Dataset, kein `null`-Padding

## Canvas-Text

- Text: `"Die nächsten 10 Jahre\nwerden anders nervig."` (Pflichttext, zweizeilig)
- Position: `x:0.75, y:0.35` (Pflichtvorgabe, unverändert übernommen)
- Styling: keine Feinjustierung vorgenommen — Plugin-Defaults (`fontSize:14`, `fontWeight:400`, `color:#272727`, `align:center`, `baseline:middle`) genutzt, da im Auftrag als optional markiert und keine abweichende Vorgabe vorlag
- Symbole umgesetzt: **nein**
- Warum nicht: AP-03a/03b haben die vertikale Pixel-genaue Positionierung von ✅/❓ ausdrücklich als offene, nicht in diesem AP zu entscheidende Frage markiert (CSS-Overlay vs. neues Canvas-Plugin, siehe AP-03a „Bewertete Lösungspfade" / AP-03b „Vorschlag D"). Eine CSS-Overlay-Umsetzung hätte eine neue, in diesem AP nicht verifizierbare vertikale Ausrichtung riskiert; ein Canvas-Plugin wäre eine verbotene Plugin-Layer-Änderung gewesen. Der AP-03f-Auftrag macht Symbole ausdrücklich optional („keine eigenmächtige Festlegung auf farbige Emoji-Glyphen als Produktentscheidung") — daher bewusst nicht gebaut. Der Pflicht-Zukunftsflächen-Text wurde umgesetzt, das reicht laut Auftrag für GRÜN in diesem Punkt.
- Emoji-/Unicode-Entscheidung: entfällt (keine Symbole umgesetzt)

## A11y

- DOM-/aria-live-Kopie des Rubikon-Satzes: ja — `a11yRegion.textContent = RUBIKON_A11Y_TEXT` (`"Die nächsten 10 Jahre werden anders nervig."`, ohne Zeilenumbruch, identisch zur Pflichtvorgabe)
- Ort im Code: `renderScreen4Final()` (Zeile ~540) beim ersten Reveal; zusätzlich in `revealScreen4()` beim erneuten Betreten eines bereits final gerenderten Screen 4 (Re-Announce, analog zu S3s `lastRevealA11yText`-Muster)
- Screenreader-/Live-Region-Strategie: Wiederverwendung der bereits bestehenden, geteilten `aria-live="polite"`-Region (`fw-app__visually-hidden`) — keine neue DOM-Struktur, kein neues CSS nötig, konsistent mit dem im AP-03d/03e-Protokoll dokumentierten Übergabeauftrag
- Canvas-Text nicht alleinige Informationsquelle: bestätigt — der Rubikon-Satz existiert unabhängig vom Canvas-Rendering im DOM-Text der `a11yRegion`

## CTA / Fokus

- CTA initial verborgen/nicht fokussierbar: ja — `cta.setAttribute('hidden', '')` bei Erzeugung des Elements und defensiv erneut zu Beginn jedes nicht-abgeschlossenen Reveals in `revealScreen4()`; das `hidden`-Attribut entfernt das Element aus Tab-Reihenfolge und Accessibility-Tree (Standardverhalten, kein zusätzliches ARIA nötig, konsistent mit dem bereits im gesamten Screen-Controller genutzten `hidden`-Muster)
- CTA nach Reveal sichtbar/bedienbar: ja — `cta.removeAttribute('hidden')` in `renderScreen4Final()`
- Fokusstrategie: keine neue Fokuslogik gebaut — bestehendes Muster (`showScreen(4, true)` fokussiert `h2S4` wie bei allen anderen Screens) bleibt unverändert; die Pflicht „CTA nach Reveal wieder erreichbar" ist über Tab-Reihenfolge erfüllt, ohne den bestehenden Fokus-Kontrakt zu verändern
- bestehende Navigation unverändert: ja — `btnS3Next`/`btnS4Prev`-Wiring unangetastet, nur der bereits vorhandene `showScreen()`-Aufruf löst jetzt zusätzlich `revealScreen4()` aus

## Reduced Motion

- 800ms Pause bleibt: ja — reiner `setTimeout(..., 800)` ohne RM-Verzweigung, läuft in beiden Modi identisch (Pflichtvorgabe „800ms bleibt Pausenbeat, RM-unabhängig", AP-02d)
- ChartEngine-RM genutzt: ja — die Achsen-/Linienbewegung läuft über `chartEngine4.renderFromData()` → `ChartEngine._draw()` → `_prefersReducedMotion()`-Guard (`chart.update('none')` bei RM, `chart.update(undefined)` sonst), exakt wie in S2/S3 bereits produktiv, kein neuer RM-Code in `app.js` nötig
- keine zusätzliche Bewegung: bestätigt — `app.js` fügt keine eigene CSS-Transition/Animation für den Reveal hinzu; CTA-Reveal erfolgt als direkter `hidden`-Attribut-Wechsel (kein CSS-Übergang, konsistent mit dem bestehenden Screen-Controller-Muster laut Drehbuch-Notiz „showScreen() Transition: aktuell nur hidden-Toggle, kein Übergang")
- Test/Befund: **nicht im Browser verifiziert** — Albert testet manuell, keine Browser-Automatisierung in diesem AP (Nutzeranweisung). Code-Pfad-Analyse ist vollständig (siehe oben), Laufzeit-Bestätigung steht aus.

## Wiederholtes Betreten von Screen 4

- Timer-Cleanup: `screen4Timer`-Handle im Closure-Scope; `showScreen()` löscht ihn defensiv bei jedem Wechsel weg von Screen 4 (`n !== 4`); `revealScreen4()` löscht ihn zusätzlich defensiv bei jedem Eintritt, bevor ggf. neu gestartet wird
- Initial-/Finalzustand bei erneutem Betreten: Screen 4 rendert nur dann erneut (Initial → 800ms → Final), wenn `screen4RevealedRate !== currentRate` — d. h. bei identischer eingefrorener Rate zeigt ein erneuter Besuch sofort den zuletzt erreichten Endzustand (Chart bleibt im DOM erhalten, da Screens nur über `hidden` ein-/ausgeblendet werden, nicht neu aufgebaut), inklusive erneuter `aria-live`-Ansage. Ändert sich die Rate (neuer Durchlauf über Screen 1 → `btnS1Next` friert eine neue `currentRate` ein), wird der komplette Reveal für die neue Rate erneut abgespielt — analog zum bestehenden `lastRenderedRateS3`-Muster für Screen 3, damit Screen 4 nie eine veraltete Rate anzeigt
- keine Mehrfach-Timer: durch die doppelte defensive Bereinigung (Screen-Wechsel weg von S4 UND jeder erneute Eintritt in S4) kann zu keinem Zeitpunkt mehr als ein `screen4Timer`-Handle aktiv sein

## QA

### Datei-/Scope-QA

- `git diff --name-status`: `M Apps/prokrastinations-preis/app.js` (plus dieses Protokoll und der bereits vor diesem AP vorhandene `session-log.md`-Eintrag)
- verbotene Dateien unverändert: ja, per gezieltem `git diff --name-status` gegen alle elf verbotenen Pfade gleichzeitig geprüft — leere Ausgabe, kein Treffer

### Code-QA

| Prüfpunkte | Erfüllt? | Beleg |
|---|---:|---|
| keine Zukunftsdaten | ja | `chartSeries` in beiden Renderaufrufen aus identischer `marketTimeStrategy()`-Berechnung über reale 120 CSV-Monate |
| keine Dummy-Datasets | ja | kein zweites Dataset, kein `null`-Padding, Grep auf `dummy`/`Dummy` negativ |
| kein `chart.scales` in app.js | ja | Grep negativ |
| kein `chart.update()` in app.js | ja | Grep negativ — Reveal läuft ausschließlich über `renderFromData()` (Smart Update intern in `ChartEngine._draw()`) |
| kein Canvas-CSS-Scale | ja | kein `transform`/`scale` auf Canvas oder Chart-Container hinzugefügt |
| gleiche Datenserie | ja | siehe „Implementierter Rubikon-Reveal" oben |
| Initialrender registriert Plugin | ja | `chartText:{enabled:true, annotations:[]}` bereits in `renderScreen4Initial()` |
| zweiter Render füllt Annotationen | ja | `renderScreen4Final()` liefert `annotations:[{...}]` mit Pflichttext/-position |

### Browser-QA

- Screen 4 initial geprüft: **nein** — nicht durchgeführt (Nutzeranweisung: manueller Test durch Albert)
- 800ms-Pause geprüft: nein
- Reveal geprüft: nein
- Future-Ticks geprüft: nein
- rechte Hälfte datenfrei geprüft: nein
- Text rechts geprüft: nein
- CTA-Reveal geprüft: nein
- Konsole geprüft: nein
- Screen 1–3 Regression geprüft: nein (Code-Analyse: keine bestehende S1–S3-Zeile verändert, `showScreen()` erhält nur einen zusätzlichen `if (n===4)`-Zweig und eine für n≠4 harmlose Timer-Bereinigung)
- Szenario AF Regression geprüft: nein (Code-Analyse: `app.test.html` in diesem AP nicht angefasst)

### Mobile/RM-QA

- S-Zone geprüft: nein
- Reduced Motion geprüft: nein (Code-Pfad-Analyse vollständig, siehe oben)
- offene Testlücken: vollständige Browser-QA (Beat-1-Bewegung, Textlesbarkeit im Zukunftsraum, CTA-Sichtbarkeit, Konsolenfehler, RM-Sprungverhalten, Mobile-Breite des Zukunftsraums) — alle offen, für Alberts manuellen Test vorgemerkt

## Stop-Regeln geprüft

| Stop-Regel | Ausgelöst? | Notiz |
|---|---:|---|
| Engine-/Plugin-Änderung nötig | nein | Reveal vollständig über bestehende `xDisplayRange`/`renderFromData`/`FwChartTextPlugin`-Mechanik lösbar |
| Zukunftsdaten nötig | nein | reiner `xDisplayRange`-Ansatz, keine zusätzlichen Punkte nötig |
| Chart.js-Internals aus app.js nötig | nein | ausschließlich `renderFromData()`-Aufrufe, kein `chart.scales`/`getPixelForValue` |
| CSS-Scale nötig | nein | Achsenbewegung läuft vollständig über Chart.js/ChartEngine, kein Canvas-Transform |
| A11y nur Canvas | nein | DOM-/`aria-live`-Kopie über bestehende Region umgesetzt |
| verbotene Datei nötig | nein | ausschließlich `app.js` geändert |
| Screen 1–3 Regression | nicht per Laufzeit geprüft, aber per Code-Diff ausgeschlossen | keine bestehende Zeile in S1–S3-Pfaden verändert |
| Timer-State nicht lösbar | nein | doppelte defensive Bereinigung deterministisch umgesetzt |

## Risiken / offene Punkte

- Architektur: keine offenen Punkte — Reveal-Mechanik folgt exakt dem in AP-03a/03b freigegebenen Lösungspfad A
- Code: keine bekannten Mängel; additive Patch-Struktur (83 Zeilen, 0 Löschungen)
- Test: **zentrale offene Aufgabe** — vollständige Browser-QA (siehe „Browser-QA"/„Mobile/RM-QA" oben) steht aus, Albert testet manuell im Live-Server
- A11y: DOM-Kopie umgesetzt, aber nicht mit echtem Screenreader verifiziert
- Unicode/Emoji: keine Symbole umgesetzt (bewusste Entscheidung, siehe „Canvas-Text"), daher kein Unicode-Rendering-Risiko in diesem AP
- Mobile: Zukunftsraum-Breite auf S-Zone laut Drehbuch „vor Go-Live testen" — in diesem AP nicht geprüft
- Reduced Motion: Code-Pfad korrekt (Engine-automatisch), Laufzeitverhalten nicht beobachtet
- Screen-4-UX: Drehbuch beschreibt einen deutlich reicheren Beat-Ablauf (Beat 1–5 mit Symbolen, gestaffelten Fade-ins, eigenem Body-Text/CTA-Wortlaut) als der AP-03f-Auftrag verlangt (ein Pflichttext, keine Symbol-Pflicht, bereits vorhandener Body-Text/CTA-Wortlaut aus einem früheren AP unangetastet gelassen). Diese Abweichung ist im AP-03f-Auftrag selbst so vorgegeben (explizite Pflichtwerte/Pflichtannotation), nicht eigenmächtig durch diesen AP entstanden — wird hier als Diskrepanz zwischen Drehbuch und AP-Auftrag dokumentiert, nicht als Fehler dieses APs.
- Reveal-Animation (neu, siehe „Nachtrag" oben): die Achsen-/Zukunftsraum-Öffnung läuft nicht smooth, sondern springt sofort auf den Zielzustand, während nur Linie/Vertikallinie über Chart.js' Standardanimation nachgleiten — Drehbuch-Beat-1-Anspruch aktuell nicht erfüllt. Root Cause identifiziert (Chart.js animiert Scale-Bounds nicht nativ), Fix vermutlich Engine-/Strategy-Layer, daher außerhalb des AP-03f-Scopes. Neuer Architektur-AP durch Albert bestätigt.

## Nachtrag — Manueller Browsertest durch Albert: Reveal-Bewegung nicht smooth, Architektur-Lücke gefunden

Albert hat Screen 4 im Live-Server durchgeklickt. Befund:

1. Übergang Screen 3 → Screen 4 ist ein abrupter Sprung — bekannt und dokumentiert (Drehbuch-Implementierungsnotiz: „`showScreen()` Transition: aktuell nur hidden-Toggle, kein Übergang"), kein neuer Fund, kein Blocker.
2. Der eigentliche Rubikon-Reveal (Achse öffnet sich, Vergangenheit schrumpft, blaue Linie wandert nach links, Zukunftstext erscheint) läuft **zackig/ruckartig statt smooth** ab — entgegen der fachlichen Erwartung.

**Alberts Wunsch (= Drehbuch-Vorgabe, zutreffend zitiert):** „Kein Sprung, kein Bruch nach dem Klick … sondern direkt danach setzt eine smoothe Schrumpfung der existierenden Grafik ein. Die X-Achse wächst langsam nach rechts, gleichzeitig schrumpft der Chart, die blaue Linie klebt immer am Ende der Linie und schiebt sich so auch nach rechts." Das deckt sich wörtlich mit Drehbuch Beat 1: „Die X-Achse fährt nach rechts … Der bestehende Chart schrumpft dadurch automatisch nach links zusammen. Die blaue Linie bleibt stehen, wo sie ist." **Albert hat sich nicht falsch ausgedrückt — die Erwartung ist spec-konform.**

**Realität/Diagnose (in dieser Session direkt am Code und an zwei Spec-Dokumenten verifiziert, nicht geraten):**

- Chart.js' `chart.update()` (aufgerufen in `ChartEngine._draw()`, `state.chartInstance.update(...)`) animiert standardmäßig ausschließlich **Datenelemente** (Linienpunkte/-pfad) über seinen eingebauten Animator. Die **Skalen-Grenzen selbst** (`axis.min`/`axis.max`, Ticks, Gridlines) werden von `FwSmartXAxis.afterDataLimits` (`FwSmartXAxis.js:230–232`) **synchron auf den finalen Zielwert** gesetzt, nicht animiert interpoliert. Der Zukunftsraum inkl. Future-Ticks erscheint dadurch sofort in voller Breite; nur die Linienpunkte (und die daran über die Pixel-Position gekoppelte `FwVerticalLinePlugin`-Linie) gleiten über die Chart.js-Standardanimation (~1s) nach.
- `FwChartTextPlugin.js` hat „keine Animation" explizit im eigenen V1-Vertrag stehen (Datei-Header, Zeile 12) — der Canvas-Text poppt also ebenfalls sofort auf, statt einzublenden.
- Kein Spec-Dokument garantiert eine sanfte Skalen-/Achsen-Transition: `docs/spec/Charts Ticks und Label_v14.md` regelt ausschließlich Tick-Dichte/-Platzierung, keine Animation. `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md` §6.2/§16 behandeln nur plugin-eigene rAF-Animation (z. B. `FwAnnotationPulsePlugin`) und das Verbot von `chart.update('none')` als Fake-Animationstreiber — keine Aussage zu nativer Scale-Animation.
- Root Cause der Fehleinschätzung: AP-03b stützte die Annahme „Smart Update liefert die Reveal-Bewegung, ist bereits produktiv in Screen 2 erprobt" — das ist irreführend. Screen 2 (`renderJourneyStep`) hält `xDisplayRange` über alle Stationsschritte hinweg **konstant** (`min:ctx.startMonth, max:ctx.latestMonth` ändert sich nie), es werden nur zusätzliche Datenpunkte sichtbar. Der Pfad „Achsen-`max` ändert sich zwischen zwei `renderFromData()`-Aufrufen" wurde vor diesem AP **nie tatsächlich durchlaufen** — die Annahme war unverifiziert, nicht falsch dokumentiert, aber auch nie bestätigt.

**Konsequenz:** Eine saubere Lösung (Chart.js-Animationskonfiguration um Scale-Bounds erweitern, oder alternativer Mechanismus) berührt sehr wahrscheinlich `ChartEngine.js`/`FwSmartXAxis.js`/`LineChartStrategy.js` — Engine-/Strategy-Layer, außerhalb des AP-03f-Scopes und durch dessen eigene Stop-Regel 1 explizit verboten („Für den Reveal müsste ChartEngine.js geändert werden"). Kein Code-Fix in diesem AP.

**Albert entscheidet (Rückfrage gestellt, Antwort erhalten):** neuer, eigenständiger Architektur-AP — AP-03f bleibt wie es ist (GELB, siehe unten), kein Nachschärfen hier.

## Empfehlung

- AP-03f final akzeptieren: **nein, noch nicht** — fachlich vollständig implementiert, aber GRÜN erfordert laut AP-Auftrag zentrale Browser-QA; Alberts Test hat zusätzlich eine reale Architektur-Lücke aufgedeckt (siehe Nachtrag)
- Nächster interner AP: **neuer Architektur-AP** — Anamnese, ob/wie eine sanfte Chart.js-Scale-/Achsen-Animation für den Rubikon-Reveal sauber nachrüstbar ist (voraussichtlich Engine-/Strategy-Layer, Full-Gate, evtl. Masterfaden-Freigabe nötig, analog zum Verfahren aus AP-03a/03b für den Symbol-Pfad). Danach erst: Alberts vollständiger manueller Browsertest von Screen 4 (inkl. RM/Mobile), danach AP-prokrast-03g — Abschluss-QA Screen 4 Rubikon-Reveal Claims-vs-Files
- Commit empfohlen: **nein** — weder vor dem Architektur-AP noch vor Alberts vollständigem Test
- Ausdrücklich nicht nächster AP: Symbol-Implementierung (✅/❓), eigenmächtiger Engine-Patch ohne Architektur-AP/Freigabe, Drehbuch-Angleichung an die volle Beat-1–5-Choreografie, Commit ohne Alberts Testbestätigung, Abschlussritual
- Rückgabe an Masterfaden nötig: **ja** — Erkenntnis aus diesem Nachtrag ist als offener Punkt für die Steuerungsebene zu übernehmen (neuer AP für Reveal-Animation-Architektur)

## Wiederlesen des Ergebnisprotokolls

- Ergebnisprotokoll nach Write vollständig wiedergelesen: ja (inkl. Nachtrag nach Alberts manuellem Browsertest)
- Abgleich gegen Aufgabenstellung bestanden: ja
- Abweichungen: keine strukturellen Abweichungen vom ursprünglichen Auftrag; Symbol-Verzicht und Drehbuch-Diskrepanz sind im Text explizit begründet dokumentiert, nicht stillschweigend. Nachträglich (nach Alberts Test) ein realer Architektur-Fund ergänzt: Reveal-Animation nicht smooth, Ursache identifiziert, kein Fix in diesem AP, neuer Architektur-AP durch Albert bestätigt (siehe „Nachtrag" und aktualisierte „Empfehlung")
