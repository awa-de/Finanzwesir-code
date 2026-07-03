# AP-prokrast-03g — Klärung/Forschung Rubikon-Reveal Scale-Animation Ergebnis

## Status

GRÜN

## Kurzbefund

Der AP-03f-Root-Cause ist **bestätigt und jetzt auf Quellcode-Ebene verifiziert, nicht mehr nur vermutet**: Chart.js (lokal produktiv eingesetzt in Version **4.5.0**) leitet Skalen-Änderungen (`scale.min`/`scale.max`, Ticks, Gridlines) ausschließlich über `Chart.prototype.update()` → `_updateLayout()` — einen **synchronen** Codepfad, der vollständig getrennt von `_updateDatasets(mode)` läuft, wo Chart.js' Animations-/Animator-System hängt. Skalen-Grenzen durchlaufen strukturell **nie** den Animator; nur Datensatz-Elemente (Linienpunkte, Radius, Farben) werden interpoliert. Das ist direkt am Chart.js-4.5.0-Quellcode (`core.controller.js`) verifiziert, zusätzlich gestützt durch die offizielle Chart.js-Doku (Default-Animationsziele: `numbers:['x','y','borderWidth','radius','tension']`, `colors:[...]` — keine Skalen-Eigenschaften) und ein offenes GitHub-Issue (`chartjs/Chart.js#10674`), das exakt dasselbe Glitch-Symptom bei Scale-min/max-Änderungen während Animation dokumentiert.

**Native Chart.js-Lösung (Forschungsfrage B): nicht vorhanden.** Auch der naheliegende Kandidat `chartjs-plugin-zoom` (wirbt mit „smooth zoom/pan") wurde bis auf Quellcode-Ebene geprüft: Er setzt lediglich `scale.options.min/max` und ruft `chart.update(mode)` — **keine eigene Interpolation, keine Sonderbehandlung**. Sein „smoother" Eindruck entsteht ausschließlich dadurch, dass die (bereits final gesetzte, nicht animierte) Skala unverändert bleibt oder sich nur moderat verschiebt, während die ohnehin schon dichten Datenpunkte weich nachgleiten — ein Effekt, der bei Rubikon (Verdopplung des Zeitfensters, große neue Leerfläche) strukturell **nicht** greift, weil hier Ticks/Gridlines/Zukunftsraum in voller Breite sofort erscheinen, während nur 120 Linienpunkte auf die neue, bereits fertige Skala nachziehen — exakt der in AP-03f beobachtete „zackige" Effekt.

Zwei der von Albert benannten Risiken bestätigen sich direkt im Projekt-eigenen Spec-Dokument: `CHART_PLUGIN_ARCHITEKTUR.md §6.2/§6.3/§7` verbietet bereits heute explizit `chart.update('none')` als Animationstreiber und das nachträgliche Setzen von `x.min`/`x.max` außerhalb des regulären Strategy-Flows — mit exakt der von Albert genannten Begründung („Chart.js behält Canvas-Ownership, Resize/interne Renderzyklen überschreiben unkontrolliert"). Ein Engine- oder App-seitiger rAF-Tween, der `xDisplayRange` in vielen kleinen Schritten über `update('none')` durchtreibt, wäre also ein Verstoß gegen bestehende, bindende Projekt-Spec — unabhängig davon, in welchem Layer er läuft.

**Empfehlung für AP-03h:** kein reiner rAF/`update('none')`-Tween (verboten). Stattdessen ein **gestufter Reveal über 3–5 diskrete `renderFromData()`-Aufrufe mit Zwischenwerten von `xDisplayRange.max`**, jeder Schritt mit Chart.js' **echter** Standardanimation (nicht `'none'`), zeitlich verkettet über feste Verzögerungen (kein `update('none')`-Loop, kein Scale-Hack, ausschließlich der bereits von AP-03f genutzte öffentliche `renderFromData()`-Vertrag). Das ist kein perfekt kontinuierliches Tween, aber ein spec-konformer, risikoarmer, mit den Projektregeln vereinbarer Mittelweg. Details, Stop-Regeln und Bewertungsmatrix unten.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short`: `M .claude/learning/session-log.md`, `M Apps/prokrastinations-preis/app.js`, `?? docs/steering/patches/AP-prokrast-03f_..._Ergebnis.md` — alles bereits aus AP-03f bekannte, unveränderte Vorzustände, keine Fremdänderungen
- `git diff --name-status`: identisch — `M .claude/learning/session-log.md`, `M Apps/prokrastinations-preis/app.js`

Repo-Namensdiskrepanz wie in allen AP-prokrast-0x-Protokollen dokumentiert — kein Stop.

## Chart.js-Version / Quellenlage

- **Chart.js-Version: 4.5.0**
- Quelle der Version: Datei-Header von `Theme/assets/js/vendor/chart.umd.min.js` (`/*! Chart.js v4.5.0 ... (c) 2025 Chart.js Contributors */`), zusätzlich per Grep im Bundle als Literal `"4.5.0"` bestätigt
- Autoritative Quelle für Produktionseinsatz: `docs/steering/theme-build/THEME-ASSEMBLY-CHECKLIST.md` (Zeilen 26–29, 205–207) — dokumentiert explizit, dass Chart.js **lokal vendored** ausgeliefert wird (`assets/js/vendor/chart.umd.min.js`), gerade **weil** keine extern geladenen Scripts gewünscht sind (SRI-Vermeidung, Security)
- **Wichtiger Nebenfund, nicht Teil dieses APs, aber dokumentationswürdig:** `Theme/index.html` und `Apps/prokrastinations-preis/app.test.html` laden Chart.js aktuell über ein **ungepinntes** CDN-Tag (`<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>`, kein Versions-Suffix) — das ist nur der lokale Dev-/Test-Harness-Pfad, nicht der Produktionspfad, kann aber bei einem künftigen Chart.js-Major-Release im Test-Kontext eine andere Version laden als produktiv vendored ist. Kein Blocker für AP-03g, aber als Randbefund vermerkt (siehe „Risiken/offene Punkte")
- lokale Chart.js-Quellen verfügbar: ja — `Theme/assets/js/vendor/chart.umd.min.js` (minifiziertes UMD-Bundle), zusätzlich der volle Chart.js-4.5.0-Quellcode über GitHub-Tag `v4.5.0` per Webzugriff verifiziert
- offizielle Dokumentation geprüft: ja — `chartjs.org/docs/latest/configuration/animations.html`, `chartjs.org/docs/latest/developers/plugins.html`, `chartjs.org/docs/latest/developers/updates.html`, zusätzlich `chartjs-plugin-zoom`-Doku (`chartjs.org/chartjs-plugin-zoom/latest/guide/animations.html`, `.../developers.html`)
- Chart.js-4.5.0-Kernquelle geprüft: ja — `raw.githubusercontent.com/chartjs/Chart.js/v4.5.0/src/core/core.controller.js` (`update()`-Methode) direkt gelesen
- `chartjs-plugin-zoom`-Quelle geprüft: ja — `src/core.ts`, `src/defaults.ts` auf `master`-Branch direkt gelesen
- GitHub-Issue geprüft: ja — `chartjs/Chart.js#10674` (offen, Symptom „blaue Linie glitcht" bei Scale-min/max-Änderung während Animation, Chart.js 3.9.1, kein offizieller Fix/Workaround dokumentiert)
- Einschränkungen der Recherche: Die WebFetch-Abfragen laufen über ein zwischengeschaltetes Zusammenfassungs-Modell (nicht Rohtext-Volltext), daher wurden Kernaussagen wo möglich durch mehrfache, gezielt unterschiedlich formulierte Abfragen gegen dieselbe Quelle gegengeprüft (z. B. `core.controller.js` einmal allgemein, `chartjs-plugin-zoom/core.ts` zweimal mit unterschiedlichem Fokus). Die entscheidende Aussage („Scale-Updates laufen nicht durch den Animator, sondern durch `_updateLayout()`, getrennt von `_updateDatasets(mode)`") stammt direkt aus dem Chart.js-4.5.0-Quellcode selbst, nicht aus einer Sekundärquelle — das ist die höchste in diesem AP erreichbare Verlässlichkeitsstufe ohne lokale Node/Chart.js-Laufzeitumgebung mit Debugger.

## Gelesene Pflichtquellen

- `docs/steering/patches/AP-prokrast-03f_screen-4_rubikon-reveal_integration_fw-chart-text_Ergebnis.md` — vollständig gelesen (inkl. Nachtrag zum Reveal-Animation-Befund)
- `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` — bereits in dieser Session vollständig gelesen (AP-03f), Beat-1-Passage erneut herangezogen
- `Apps/prokrastinations-preis/app.js` — bereits in dieser Session vollständig gelesen und selbst verfasst (AP-03f); Rubikon-Reveal-Implementierung (`renderScreen4Initial`, `renderScreen4Final`, `revealScreen4`) erneut gegen Chart.js-Verhalten geprüft
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` — bereits in dieser Session vollständig gelesen (523 Zeilen); `_draw()`-Methode (Zeilen 373–410) gezielt erneut gegen die neue Chart.js-Kernquelle abgeglichen
- `Theme/assets/js/fw-chart-engine/core/FwSmartXAxis.js` — bereits in dieser Session gezielt gelesen (`afterDataLimits` Zeilen 229–236, `endLimit`-Logik Zeilen 331–334/411–418)
- `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js` — bereits in dieser Session gezielt gegen `xDisplayRange`-Validierung gelesen (Zeilen 301–329)
- `docs/steering/patches/AP-prokrast-03b_rubikon-reveal_architekturvorschlaege_peer-review-dossier_Ergebnis.md` — vollständig gelesen (in dieser Session bereits für AP-03f gelesen)
- `docs/steering/patches/AP-prokrast-03a_architektur-anamnese_rubikon-x-achse-plugin-vertrag_Ergebnis.md` — vollständig gelesen (in dieser Session bereits für AP-03f gelesen)
- `docs/steering/patches/AP-prokrast-03e_abschluss-qa_fw-chart-text-plugin_claims-vs-files_Ergebnis.md` — vollständig gelesen (in dieser Session bereits für AP-03f gelesen)
- `docs/steering/patches/AP-prokrast-03d_fw-chart-text-plugin_minimum-implementierung_Ergebnis.md` — vollständig gelesen (in dieser Session bereits für AP-03f gelesen)
- `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js` — vollständig gelesen (in dieser Session bereits für AP-03f gelesen)
- `Theme/assets/js/fw-chart-engine/plugins/FwVerticalLinePlugin.js` — vollständig gelesen (in dieser Session bereits für AP-03f gelesen)
- `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md` — in diesem AP gezielt neu gelesen: §6 („Verbotene Muster"/„Animationstreiber", Zeilen 246–286), §7 („Achsenvertrag", Zeilen 289–320), §9 („Reduced Motion", Zeilen 362–398)
- `docs/spec/Charts Ticks und Label_v14.md` — bereits in AP-03a vollständig gelesen, in diesem AP gezielt auf Animations-/Transition-Begriffe durchsucht (Grep, kein Treffer außerhalb von Tick-Dichte-Kontext)
- `Theme/package.json` — vollständig gelesen: keine `dependencies`/`devDependencies`, kein npm-verwaltetes Chart.js

## AP-03f-Root-Cause geprüft

| Behauptung | Urteil | Beleg |
|---|---:|---|
| `xDisplayRange` ändert sich zwischen Initial/Final | bestätigt | `app.js`: `renderScreen4Initial()` setzt `max: ctx.latestMonth`, `renderScreen4Final()` setzt `max: addMonths(ctx.latestMonth, 119)` — unterschiedliche Werte, gleicher Container, zwei `renderFromData()`-Aufrufe |
| `FwSmartXAxis` setzt `axis.min`/`axis.max` synchron | bestätigt | `FwSmartXAxis.js:230–232`: `axis.min = fwContext.displayRange.min; axis.max = fwContext.displayRange.max;` innerhalb des Chart.js-Lifecycle-Hooks `afterDataLimits` — läuft laut Chart.js-4.5.0-Kernquelle synchron als Teil von `_updateLayout()`, **vor** jeder Animationslogik |
| kein Zwischenwert/Tween im aktuellen Code | bestätigt | Weder `app.js` noch `ChartEngine.js` noch `FwSmartXAxis.js` enthalten eine Interpolation zwischen Alt- und Neu-Wert von `xDisplayRange`/`axis.min`/`axis.max` — jeder Aufruf liefert direkt den Zielwert |
| Chart.js animiert aktuelle Scale-Bounds nicht sichtbar | bestätigt, jetzt auf Quellcode-Ebene | Chart.js-4.5.0 `core.controller.js#update()`: `_updateLayout()` (Scale-Neuaufbau inkl. `min`/`max`) läuft getrennt und **vor** `_updateDatasets(mode)` (wo der Animator hängt) — Scale-Werte durchlaufen strukturell nie den Animations-Pfad |
| Linie/Punkte animieren anders als Scale/Ticks | bestätigt | Nur Datensatz-Controller-Elemente (`_updateDatasets(mode)`) werden vom Animator interpoliert; `FwVerticalLinePlugin` liest `meta.data[last].x` (Zeile 9) — das ist eine Controller-Element-Pixelposition und wird dadurch mitanimiert, während die Skala selbst bereits final steht |
| `FwChartTextPlugin` animiert nicht | bestätigt | Eigener Datei-Header (`FwChartTextPlugin.js:12`: „keine Animation") sowie Code-Review: `afterDraw` liest Optionen live und zeichnet sofort, kein Zeit-/Interpolationszustand |
| Screen 2 war kein Beleg für Scale-Animation | bestätigt (bereits in AP-03f-Nachtrag festgehalten, hier erneut verifiziert) | `renderJourneyStep()` in `app.js`: `xDisplayRange: { min: ctx.startMonth, max: ctx.latestMonth }` — identischer Wert bei jedem Stationsschritt, ändert sich nie zwischen Aufrufen |

**Ergebnis: Root Cause bestätigt — jetzt mit Quellcode-Beleg auf Chart.js-4.5.0-Ebene, nicht mehr nur aus Beobachtung/Analogie hergeleitet.**

## Native Chart.js-Möglichkeiten

### Geprüfte Optionen / Suchfelder

| Suchfeld | Befund | Quelle/Beleg |
|---|---|---|
| `animation`/`animations` (Default-Konfiguration) | Default-Ziele sind ausschließlich Element-Properties: `numbers:['x','y','borderWidth','radius','tension']`, `colors:['color','borderColor','backgroundColor']` — keine Skalen-Properties gelistet | `chartjs.org/docs/latest/configuration/animations.html` (offizielle Doku, direkt zitiert) |
| `transitions` (Update-Modi) | Standard-Modi: `active`, `hide`, `reset`, `resize`, `show`, `none`, `default` — alle steuern **globales** Animationsverhalten (z. B. „keine Animation bei Resize"), keiner animiert Skalen-Bounds granular | `chartjs.org/docs/latest/developers/updates.html` + Bestätigung per Grep im lokalen Vendor-Bundle (`chart.umd.min.js`): alle sechs Modus-Strings vorhanden |
| Scale-spezifische Animation | keine gefunden | keine Erwähnung in `configuration/animations.html`, keine Scale-Animation-Sektion in der offiziellen Doku |
| Options-Update-Animation (`chart.options.scales.x.min/max = ...; chart.update()`) | wird angewendet, aber **nicht interpoliert** — sofortige Übernahme via `_updateLayout()` | Chart.js-4.5.0-Quellcode `core.controller.js#update()` |
| Plugin-Lifecycle (`afterDataLimits`, `afterBuildTicks`, `beforeDraw`/`afterDraw`) | alle laufen synchron einmal pro `update()`-Aufruf, nicht als animierbare Zwischenwert-Hooks; kein dokumentierter „Animation-Progress"-Hook für Scale-Werte | `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md` §6 (keine Erwähnung eines Scale-Animation-Progress-Hooks), eigene Code-Analyse `FwSmartXAxis.js` |
| Chart.js-eigener Animator/„Animations"-Klasse | zuständig ausschließlich für `_updateDatasets(mode)`-Pfad (Controller-Elemente), strukturell getrennt vom `_updateLayout()`-Pfad (Scales) | Chart.js-4.5.0-Quellcode `core.controller.js#update()`, direkt zitiert: „Synchronous layout updates … happens before any animation logic"; „NO code path … interpolates scale.min or scale.max" |
| `chartjs-plugin-zoom` (Ökosystem-Referenz für „smooth zoom") | setzt nur `scale.options.min/max`, ruft `chart.update(transition)` — **keine eigene Interpolation, keine Sonderbehandlung von Scale-Werten** | `chartjs-plugin-zoom` Quellcode (`src/core.ts`, Funktion `zoomScale`/`resetZoom`), `src/defaults.ts` (keine `min`/`max`-Registrierung als Animationsziel) |
| GitHub-Issue-Recherche | offenes, ungelöstes Issue zu genau diesem Symptom (Glitch bei Scale-min/max-Änderung während Animation), keine offizielle native Lösung dokumentiert | `github.com/chartjs/Chart.js#10674` |

### Bewertung native Lösung

- **Native Scale-/Options-Animation gefunden: nein — strukturell ausgeschlossen, nicht nur unkonfiguriert.** Es handelt sich nicht um eine fehlende Konfigurationsoption, sondern um eine architektonische Trennung in Chart.js selbst: Scale-Updates laufen über `_updateLayout()`, Animationen ausschließlich über `_updateDatasets(mode)` — zwei getrennte Codepfade im `update()`-Ablauf.
- Falls ja: entfällt.
- Falls nein: warum ausreichend ausgeschlossen: vier unabhängige Quellen konvergieren auf dasselbe Ergebnis — (1) offizielle Animations-Doku (Default-Ziele ohne Scale-Properties), (2) Chart.js-4.5.0-Kernquelle selbst (`core.controller.js`, die höchste verfügbare Verlässlichkeitsstufe), (3) `chartjs-plugin-zoom`-Quellcode (keine eigene Interpolation, obwohl das Plugin genau für „smooth zoom" wirbt — wenn Chart.js selbst es könnte, bräuchte das Plugin keinen eigenen Ansatz), (4) offenes GitHub-Issue, das dasselbe Symptom bestätigt. Keine der vier Quellen widerspricht den anderen.
- Unsicherheiten: Die WebFetch-Abfragen laufen über ein Zusammenfassungs-Modell, kein Rohtext-Zugriff. Die entscheidende Kernaussage (Trennung `_updateLayout()`/`_updateDatasets(mode)`) stammt aber direkt aus dem 4.5.0-Quellcode-Zitat, nicht aus einer sekundären Interpretation — daher als **belastbar**, nicht als „unbestätigt" markiert. Eine letzte Restunsicherheit bleibt, ob eine noch nicht gefundene, undokumentierte interne Chart.js-API dasselbe leisten könnte — das wäre aber per Definition kein „nativer, dokumentierter oder zumindest stabiler" Weg im Sinne von Alberts Vorgabe und daher für eine Produktionsentscheidung ungeeignet.

## Lösungspfade

### Lösung A — Native Chart.js-Scale-/Options-Animation

- Beschreibung: Chart.js animiert Scale-Bounds-Änderungen selbst über dokumentierte Konfiguration.
- Betroffene Dateien: keine (Lösung existiert nicht).
- Vorteile: wäre die sauberste Lösung, keine Sonderlogik nötig.
- Risiken: n/a.
- Reduced Motion: n/a.
- Regression: n/a.
- Aufwand: n/a.
- **Urteil: verworfen — nicht vorhanden, mit vier konvergierenden Quellen belegt (siehe oben). Kein Sonderweg gegen Chart.js nötig, weil schlicht keine native Option existiert, die man falsch nutzen könnte.**

### Lösung B — Engine-seitiges DisplayRange-Tweening (klassische Variante: rAF-Loop + `update('none')`)

- Beschreibung: Die Engine interpoliert `displayRange`/`xDisplayRange` zwischen Start- und Zielwert über viele Frames (z. B. 60fps) und ruft Chart.js pro Frame mit Zwischenwerten auf, jeweils mit `chart.update('none')`, um Chart.js' eigene Animation für den Mikro-Schritt zu unterdrücken.
- Betroffene Dateien: `ChartEngine.js` und/oder `FwSmartXAxis.js` (neuer Tweening-Manager), potenziell neue Datei.
- Vorteile: würde eine wirklich kontinuierliche Bewegung erzeugen.
- Risiken: **verstößt direkt gegen bestehende, bindende Projekt-Spec.** `CHART_PLUGIN_ARCHITEKTUR.md §6.3` verbietet explizit `chart.update('none')` als Animationstreiber und das nachträgliche Setzen von `x.min`/`x.max` außerhalb des Strategy-Flows — mit der Begründung „Chart.js behält Canvas-Ownership, Resize/interne Renderzyklen überschreiben unkontrolliert" (§6.2). Das ist exakt Alberts Risikohinweis („Chart.js setzt sich manchmal sehr aggressiv durch, wenn man Sonderwege geht"), bereits in der Spec aus einer früheren AP-14-Lernerfahrung kodifiziert. Diese Regel ist zwar im Plugin-Kapitel verortet, ihre technische Begründung (Chart.js-Lifecycle-Konflikt) gilt aber unabhängig davon, ob der Loop in einem Plugin oder einem neuen Engine-Manager läuft — dieselbe Chart.js-Instanz, derselbe Lifecycle.
- Reduced Motion: müsste komplett eigenständig nachgebaut werden (aktuell delegiert `app.js` das vollständig an `ChartEngine._prefersReducedMotion()` — ein Tween-Loop bräuchte einen eigenen RM-Kurzschluss).
- Regression: hoch — neue, dauerhafte Engine-Fähigkeit, die alle bestehenden Charts potenziell berühren könnte, wenn nicht strikt Screen-4-lokal gehalten.
- Aufwand: L.
- **Urteil: verworfen — nicht wegen Aufwand, sondern wegen direkten Verstoßes gegen `CHART_PLUGIN_ARCHITEKTUR.md §6.3`.**

### Lösung C — App-seitiger Tween über wiederholte `renderFromData()`-Aufrufe

- Beschreibung: **Zwei Varianten geprüft, siehe unten — C1 verworfen, C2 empfohlen.**

**C1 — Hochfrequenter Tween (rAF, viele Zwischenwerte, `update('none')` je Schritt):**
- Identisches Grundproblem wie Lösung B, nur im App-Layer statt Engine-Layer. `CHART_PLUGIN_ARCHITEKTUR.md §6.3` verbietet `chart.update('none')` als Animationstreiber unabhängig vom aufrufenden Layer — die zugrunde liegende Chart.js-Lifecycle-Gefahr (Canvas-Ownership, Resize-Konflikte) ist layer-agnostisch.
- **Urteil: verworfen.**

**C2 — Gestufter Reveal über 3–5 diskrete `renderFromData()`-Aufrufe, jeweils mit Chart.js' echter Animation (kein `'none'`):**
- Beschreibung: Statt eines einzigen Sprungs von „past-only" zu „past+future" wird der finale `xDisplayRange.max` in z. B. 4 diskreten Zwischenschritten angefahren (z. B. 25 %/50 %/75 %/100 % des Zukunftsraums), jeder Schritt ein regulärer `renderFromData()`-Aufruf mit der **normalen** Chart.js-Animation (kein `'none'`), zeitlich verkettet über feste `setTimeout`-Verzögerungen (kein rAF-Loop, kein `update('none')`, kein Scale-Hack).
- Betroffene Dateien: ausschließlich `app.js` — nutzt exakt denselben öffentlichen `renderFromData()`-Vertrag, den AP-03f bereits für den Zwei-Schritt-Reveal genutzt hat, nur mit mehr Zwischenaufrufen.
- Vorteile: verstößt gegen **keine** bestehende Spec-Regel (kein `update('none')`-Missbrauch, kein direktes Scale-Setzen, keine Chart.js-Internals-Abfrage aus `app.js`); jeder Einzelschritt läuft vollständig durch den regulären, bereits geprüften `LineChartStrategy.transform()`-Zyklus; Reduced Motion bleibt vollautomatisch über `ChartEngine._prefersReducedMotion()` gelöst (bei RM springt jeder Zwischenschritt sofort, in Summe wirkt das RM-Verhalten identisch zum heutigen Ein-Schritt-Sprung, nur technisch in 4 sofortige Mikro-Sprünge zerlegt — visuell nicht unterscheidbar von einem einzigen Sprung).
- Risiken: kein echtes kontinuierliches Tween — bei genauem Hinsehen bleiben 3–5 sichtbare „Rucke" statt einem. Mögliche Überlappung, wenn Chart.js' Default-Animationsdauer (~1000ms) länger ist als die zwischen den Schritten gewählte Verzögerung — jeder neue Schritt würde die noch laufende Animation des vorherigen Schritts abbrechen/überschreiben (Chart.js verhält sich dabei wie bei jedem regulären `update()`-Aufruf während einer laufenden Animation: kontrolliert, kein Crash, aber die Bewegungskurve wird uneinheitlich). Muss in AP-03h sorgfältig getimt werden (z. B. Schrittintervall ≥ Chart.js-Animationsdauer, oder Animationsdauer pro Schritt bewusst verkürzt via `options.animation.duration`, das **ist** eine dokumentierte, reguläre Chart.js-Option und kein Sonderweg).
- Reduced Motion: automatisch über bestehenden Engine-Mechanismus, keine neue Logik nötig.
- Regression: sehr gering — reiner App-Layer-Patch in `app.js`, identisches Muster wie der bereits akzeptierte AP-03f-Zwei-Schritt-Reveal, nur mit mehr Zwischenaufrufen und Timern.
- Aufwand: S–M.
- **Urteil: empfohlen — einzige geprüfte Lösung, die spürbar smoother wirkt, ohne gegen bestehende Chart.js-Sonderweg-Verbote zu verstoßen.**

### Lösung D — Plugin-basierter Reveal-Overlay/Tween

- Beschreibung: Ein Plugin zeichnet/maskiert den Reveal visuell (z. B. Canvas-Crossfade, Wischeffekt), ohne echte Scale-Bounds zu animieren.
- Betroffene Dateien: neue Plugin-Datei unter `Theme/assets/js/fw-chart-engine/plugins/` + `plugins/index.js` (additiv) — Plugin-Layer, Masterfaden-Freigabe nötig (analog AP-03a/03b-Präzedenzfall für den Symbol-Pfad).
- Vorteile: könnte rein visuell sehr überzeugend wirken.
- Risiken: löst das eigentliche Problem nicht, sondern übermalt es — die tatsächliche Achse würde weiterhin sofort springen, nur optisch verdeckt (z. B. durch einen kurzen Weißblitz/Blur). A11y/Tooltip/Scale-Wahrheit blieben potenziell inkonsistent mit dem sichtbaren Bild während der Übergangsphase. Verstößt tendenziell gegen den in `CHART_PLUGIN_ARCHITEKTUR.md §7` verankerten Achsenvertrag im Geiste, auch wenn kein Buchstabenverstoß vorläge (dort geht es um Domain-Wahrheit, nicht Verdeckung).
- Reduced Motion: müsste eigenständig gelöst werden.
- Regression: mittel (neue Plugin-Datei, aber additiv).
- Aufwand: M–L.
- **Urteil: eher ablehnen** — löst das Kernproblem nicht, sondern kaschiert es; nur falls Lösung C2 in AP-03h visuell nicht überzeugt, als späterer Rückfall in Betracht zu ziehen (mit Masterfaden-Freigabe für die neue Plugin-Datei).

### Lösung E — Produkt-/Drehbuch-Rückschnitt

- Beschreibung: Kein smoothes Achsen-Wachsen; stattdessen ein bewusster harter Zustandswechsel mit einem anderen dramaturgischen Mittel (z. B. kurzer CSS-Opacity-Crossfade des gesamten Canvas-Elements zwischen den beiden fertigen Zuständen — technisch vollständig orthogonal zu Chart.js, da nur das DOM-Element als Ganzes überblendet wird, keine Interaktion mit Scale/Canvas-Internals).
- Vorteile: null Chart.js-Risiko, minimaler Aufwand (reines CSS auf dem Canvas-Container), vollständig regressionsfrei.
- Risiken: erfüllt Drehbuch-Beat-1 nicht wörtlich („Linie schiebt sich nach links"), sondern ersetzt ihn durch einen anderen, ebenfalls nicht-abrupten Übergang — das ist eine Produktentscheidung, keine rein technische.
- **Urteil: als Fallback vormerken, falls C2 in AP-03h visuell nicht überzeugt — nicht als Erstwahl, da Albert explizit die Wachstums-/Schrumpf-Bewegung beschrieben hat und C2 diese (wenn auch gestuft statt kontinuierlich) tatsächlich liefert.**

## Vergleichsmatrix

| Kriterium | A | B | C1 | C2 | D | E |
|---|---:|---:|---:|---:|---:|---:|
| erfüllt Drehbuch-Beat 1 | n/a | ja (falls erlaubt) | ja (falls erlaubt) | teilweise (gestuft, nicht kontinuierlich) | teilweise (kaschiert) | nein (anderer Beat) |
| nutzt Chart.js nativ statt dagegen zu arbeiten | n/a | nein | nein | **ja** | nein | ja (umgeht Chart.js komplett) |
| kämpft nicht gegen Chart.js | n/a | nein — verboten | nein — verboten | **ja** | teilweise | ja |
| Engine-Risiko | – | hoch | – | keins | mittel | keins |
| App-Sonderlogik | – | – | hoch | gering (Timer-Verkettung) | – | gering (CSS) |
| Reduced Motion sauber | – | müsste neu gebaut werden | müsste neu gebaut werden | automatisch (Engine) | müsste neu gebaut werden | trivial (kein Motion) |
| wenige Dateien | – | nein | ja (nur app.js) | ja (nur app.js) | nein (neues Plugin) | ja (nur app.css) |
| regressionsarm für S1–S3/andere Apps | – | fraglich | ja | ja | mittel | ja |
| manuell testbar | – | ja | ja | ja | ja | ja |
| testbar ohne Playwright | – | ja | ja | ja | ja | ja |
| später wiederverwendbar | – | ja (falls erlaubt) | nein | bedingt (App-Pattern, nicht generisch) | ja | nein |
| Aufwand | – | L | S–M | S–M | M–L | S |
| Risiko | – | hoch (Spec-Verstoß) | hoch (Spec-Verstoß) | **niedrig** | mittel | niedrig |

## Empfehlung für AP-03h

- **Empfohlener Pfad: C2 — gestufter Reveal über 3–5 diskrete `renderFromData()`-Aufrufe mit Zwischenwerten von `xDisplayRange.max`, jeweils mit Chart.js' regulärer Animation (kein `'none'`).**
- Begründung: einzige geprüfte Lösung, die (a) spürbar smoother wirkt als der aktuelle Ein-Schritt-Sprung, (b) keine bestehende, bindende Projekt-Spec verletzt (`CHART_PLUGIN_ARCHITEKTUR.md §6.3`/§7), (c) ausschließlich den bereits von AP-03f genutzten öffentlichen `renderFromData()`-Vertrag nutzt, (d) Reduced Motion ohne neue Logik korrekt erbt, (e) Alberts Chart.js-Risikohinweis direkt respektiert, indem sie explizit **keinen** Sonderweg gegen Chart.js' Lifecycle geht.
- Betroffene Dateien: `Apps/prokrastinations-preis/app.js` (Erweiterung von `revealScreen4()`/`renderScreen4Final()` um Zwischenschritte).
- Erlaubte Dateien: `Apps/prokrastinations-preis/app.js`, `Apps/prokrastinations-preis/app.css` (nur falls Timing-Feinschliff CSS braucht, unwahrscheinlich).
- Verbotene Dateien: alle Engine-/Strategy-/Plugin-/Spec-/Testharness-/Config-Dateien — identisch zur Verbotsliste aus AP-03f. Insbesondere: kein `chart.update('none')`-Aufruf aus `app.js`, kein direktes Setzen von `chart.scales`/`chart.options.scales.x.min/max` aus `app.js`.
- Stop-Regeln für AP-03h:
  1. Falls C2 in der Praxis (Alberts Browsertest) trotzdem als ruckartig/unbefriedigend wahrgenommen wird → nicht auf C1/B ausweichen (Spec-Verstoß), sondern zurück an den Masterfaden für Lösung D (mit Freigabe) oder E (Produktentscheidung).
  2. Falls die Zwischenschritt-Verkettung `chart.update('none')` oder direkte Scale-Manipulation erfordern würde, um sauber zu funktionieren → stoppen, kein Sonderweg.
  3. Falls mehr als eine Datei (`app.js`) für die Umsetzung nötig würde → Full-Gate, Rückfrage.
  4. Falls Screen 1–3 durch die Änderung sichtbar regressieren → stoppen.
- QA-Pflichten: manueller Browsertest wie in AP-03f vorgesehen (Beat-1-Bewegung, Konsole, Screen-1–3-Regression, Szenario-AF-Regression), zusätzlich gezielt: wirkt die gestufte Bewegung durchgängig oder sind die 3–5 Rucke störend sichtbar (Albert entscheidet subjektiv, das ist eine Produktfrage, keine rein technische).
- Reduced-Motion-Regel: unverändert — vollständig durch `ChartEngine._prefersReducedMotion()` gelöst, AP-03h baut keine eigene RM-Logik.
- Manuelle Testanweisung für Albert: nach Umsetzung Screen 3 → Screen 4 erneut durchklicken, gezielt auf die Qualität der gestuften Bewegung achten (spürbar smoother vs. weiterhin störend ruckartig) und Rückmeldung geben, ob C2 genügt oder ob Fallback D/E nötig wird.
- Commit-Empfehlung vor AP-03h: nein — AP-03f bleibt unverändert GELB bis AP-03h abgeschlossen und von Albert getestet ist.

## Risiken / offene Punkte

- Chart.js: keine offenen technischen Fragen zur Root-Cause-Analyse; Restunsicherheit nur bezüglich undokumentierter interner APIs (siehe „Unsicherheiten" oben), für Produktionsentscheidung nicht relevant
- Engine: keine Änderung in diesem AP; AP-03h bleibt bewusst App-Layer-only, um Lösung B (Engine-Tweening) zu vermeiden
- App: AP-03h muss das Timing der 3–5 Zwischenschritte sorgfältig gegen Chart.js' Default-Animationsdauer abstimmen (siehe Lösung C2 „Risiken")
- Test: weiterhin keine Browser-Automatisierung (Alberts Anweisung aus AP-03f gilt unverändert fort); C2 kann nur durch Alberts subjektiven visuellen Eindruck final bewertet werden
- Mobile: unverändert offen aus AP-03f, für AP-03h/AP-03i weiterhin vorgemerkt
- Reduced Motion: kein neues Risiko, vollständig Engine-automatisch
- Produkt/Drehbuch: C2 liefert eine gestufte, nicht perfekt kontinuierliche Annäherung an Beat 1 — falls Albert das nach dem Test als nicht ausreichend empfindet, ist das eine legitime, im AP-03h-Nachtrag zu dokumentierende Rückmeldung, kein Fehler dieses APs
- **Nebenfund (kein Blocker, aber dokumentationswürdig):** ungepinntes Chart.js-CDN-Tag in `Theme/index.html`/`app.test.html` (Dev-/Test-Harness) vs. lokal vendored `4.5.0` in Produktion — Drift-Risiko zwischen Test- und Produktionsumgebung bei künftigen Chart.js-Majors, außerhalb des Scopes von AP-03g/03h, ggf. eigener kleiner Backlog-Eintrag wert

## Geänderte Dateien in AP-03g

Erlaubt:

- `docs/steering/patches/AP-prokrast-03g_klaerung-forschung_rubikon-reveal_scale-animation_Ergebnis.md`

Nicht geändert:

- alle Produkt-/Code-/Spec-/Plugin-/App-/Testharness-/Config-Dateien (bestätigt per `git diff --name-status` vor und nach diesem AP identisch, außer der neuen Protokolldatei selbst)
- keine Dependency installiert, kein Playwright, keine Browser-Automatisierung aufgebaut

## Wiederlesen des Ergebnisprotokolls

- Ergebnisprotokoll nach Write vollständig wiedergelesen: ja
- Abgleich gegen Aufgabenstellung bestanden: ja
- Abweichungen: keine
