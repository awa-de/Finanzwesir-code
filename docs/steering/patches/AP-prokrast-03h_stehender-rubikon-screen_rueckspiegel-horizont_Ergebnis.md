# AP-prokrast-03h — Stehender Rubikon-Screen Rückspiegel → Horizont Ergebnis

## Status

GELB

## Kurzbefund

Screen 4 wurde vollständig auf die Masterfaden-Entscheidung umgestellt: kein Morph, keine C2-Staffelung, keine Achsenanimation mehr. Beim Eintritt in Screen 4 wird der finale 20-Jahres-Rubikon-Zustand in **einem einzigen** `renderFromData()`-Aufruf gerendert (`xDisplayRange.max = addMonths(ctx.latestMonth, 119)`, `features.verticalLine:'last'`), die alten Funktionen `renderScreen4Initial()`/`renderScreen4Final()` und der alte Zwei-Schritt-Morph-Timer sind vollständig entfernt (per Grep bestätigt, keine Treffer mehr im Code). Der semantische Haupttext steht als vierteiliger DOM-Textblock (`rubikonText`, `<p>`-Elemente mit `white-space:pre-line` für bewusste Zeilenumbrüche) plus einer kleinen Prognose-Abgrenzungs-Fußnote, beides zunächst `hidden`. `FwChartTextPlugin`/Canvas-Text wird nicht mehr genutzt — das `chartText`-Options-Feld wird gar nicht mehr übergeben. Die Beat-Sequenz läuft als zwei verkettete `setTimeout`-Timer (800ms Stille → Text sichtbar + genau eine `aria-live`-Aktualisierung → 800ms Stille → CTA sichtbar), Timer-Cleanup läuft sowohl beim Verlassen von Screen 4 als auch defensiv bei jedem `revealScreen4()`-Aufruf. Ausschließlich `app.js` (89 Zeilen Diff, additiv + gezielte Entfernung der alten Morph-Logik) und `app.css` (15 neue, additive Zeilen) wurden geändert — kein Engine-/Plugin-/Strategy-/Spec-Diff.

**Grund für GELB statt GRÜN:** Wie in AP-03f/03g bereits etabliert, führt Claude in diesem Repo keine Browser-Automatisierung durch (explizite Nutzeranweisung, in diesem AP zusätzlich nochmals ausdrücklich als Bedingung für GRÜN vorgeschrieben: „Wenn Albert nicht testet, Status höchstens GELB"). Die Implementierung ist vollständig code-pfad-verifiziert (Syntax-Check, Scope-Diff, No-Go-Grep — alle grün), aber der entscheidende Punkt dieses APs — **trägt der reduzierte, stehende Screen produktseitig, wirkt die Leere absichtlich, kein Prognosegefühl, Textton stimmig** — ist eine rein subjektive Wahrnehmungsfrage, die nur Albert im echten Browser beurteilen kann.

**Zusätzlicher, wichtiger offener Punkt (siehe „Nachtrag" unten):** Albert hat den Screen bereits informell gesichtet („Klappt soweit") und einen konkreten Änderungswunsch geäußert — der Haupttext soll visuell in die rechte, leere Chart-Hälfte statt darunter, unter Verweis auf `FwChartTextPlugin`. Das steht in direktem Konflikt mit der A11y-Pflicht dieses AP-Auftrags (Haupttext muss im DOM stehen, nicht im Canvas). Auf Alberts eigene Anweisung wird dieser Konflikt **nicht** in diesem AP aufgelöst, sondern ausdrücklich als klärungsbedürftiger Punkt an die Steuerungsebene zurückgegeben.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short` (vor Implementierung): `M .claude/learning/session-log.md`, `M Apps/prokrastinations-preis/app.js`, `?? docs/steering/patches/AP-prokrast-03f_..._Ergebnis.md`, `?? docs/steering/patches/AP-prokrast-03g_..._Ergebnis.md` — alles bereits bekannte Vorzustände aus AP-03f/03g dieser Session, keine Fremdänderungen
- `git diff --name-status` (vor Implementierung): `M .claude/learning/session-log.md`, `M Apps/prokrastinations-preis/app.js`

Repo-Namensdiskrepanz wie in allen AP-prokrast-0x-Protokollen dokumentiert — kein Stop.

## Gelesene Pflichtquellen

- `docs/steering/patches/AP-prokrast-03f_screen-4_rubikon-reveal_integration_fw-chart-text_Ergebnis.md` — vollständig gelesen (inkl. Nachtrag)
- `docs/steering/patches/AP-prokrast-03g_klaerung-forschung_rubikon-reveal_scale-animation_Ergebnis.md` — vollständig gelesen
- `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` — bereits in dieser Session vollständig gelesen (AP-03f); Beat-1-Anspruch aus diesem AP nun bewusst durch die Masterfaden-Entscheidung ersetzt, nicht mehr Zielvorgabe
- `Apps/prokrastinations-preis/app.js` — vollständig gelesen (871 Zeilen vor Patch)
- `Apps/prokrastinations-preis/app.css` — vollständig gelesen (286 Zeilen vor Patch)
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` — bereits in dieser Session vollständig gelesen (AP-03f/03g); `renderFromData()`-Vertrag erneut gegen die neue Screen-4-Nutzung (ein einziger Aufruf statt zwei) geprüft
- `Theme/assets/js/fw-chart-engine/core/FwSmartXAxis.js` — bereits in dieser Session gezielt gelesen (AP-03f/03g)
- `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js` — bereits in dieser Session gezielt gegen `xDisplayRange`-Validierung gelesen (AP-03f/03g)
- `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js` — bereits in dieser Session vollständig gelesen (AP-03f); in diesem AP genutzt, um zu bestätigen, dass ein komplett fehlendes `chartText`-Options-Feld in `ChartEngine._draw()` sauber zu „Plugin nicht registriert" führt (`if (options.chartText != null ...)`-Guard, Zeile 196–200 in `ChartEngine.js`)
- `Theme/assets/js/fw-chart-engine/plugins/FwVerticalLinePlugin.js` — bereits in dieser Session vollständig gelesen (AP-03f)
- `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md` — bereits in AP-03g gezielt gelesen (§6/§7/§9), für diesen AP nicht erneut vollständig gelesen (unverändert laut Diff-Check, keine Plugin-/Engine-Änderung in diesem AP nötig)

## Produktentscheidung übernommen

- C2 verworfen: ja — keine gestufte `renderFromData()`-Sequenz, kein `addMonths(ctx.latestMonth, 30/60/89)`, per Grep bestätigt (keine Treffer)
- Morph-Idee entfernt: ja — `renderScreen4Initial()` und `renderScreen4Final()` sowie der alte Ein-Timer-Morph-Mechanismus (`screen4Timer`) sind vollständig aus dem Code entfernt (per Grep bestätigt, nur noch als Erklärung in einem Migrations-Kommentar erwähnt)
- stehender finaler Rubikon-Screen: ja — `renderScreen4Chart()` rendert beim Eintritt sofort und einmalig den finalen 20-Jahres-Zustand
- Zukunft bleibt leer: ja — keine Zukunftsdaten, kein zweites Dataset, keine Canvas-Zukunftsannotation mehr (kein `chartText`-Options-Feld mehr übergeben)
- Haupttext im DOM: ja — vier `<p>`-Elemente + Fußnote in `rubikonText`, kein Canvas-Text

## Pre-Code-Gates

| Frage | Befund |
|---|---|
| AP-03f-Screen-4-Stand | Chart-Section (`chartSection4`) vorhanden, CTA (`cta`, hidden), geteilte A11y-Region (`a11yRegion`), Navigation (`navS4`/`btnS4Prev`) — alles wiederverwendbar |
| alte Morph-/Reveal-Logik | `renderScreen4Initial()` (Initialrender past-only), `renderScreen4Final()` (Finalrender + Canvas-Text + CTA-Reveal), `revealScreen4()` (ein Timer, 800ms) — alle drei ersetzt/entfernt |
| finaler Rubikon-Zustand | direkt renderbar über exakt dieselbe `xDisplayRange`-Formel wie das alte `renderScreen4Final()` (`ctx.startMonth` bis `addMonths(ctx.latestMonth, 119)`), nur jetzt als einziger, sofortiger Aufruf statt als zweiter Schritt nach einem Morph |
| Text-/DOM-Möglichkeiten | bestehende `.fw-app__screen-subline`-Klasse wiederverwendbar für einzelne Absätze; `white-space:pre-line` als einzige neue CSS-Regel nötig für absichtliche Innerhalb-Absatz-Zeilenumbrüche (z. B. „Noch." als eigene Zeile) |
| CSS-/Layout-Möglichkeiten | `.fw-app__chart-section` (Layout), `.fw-app__screen-subline` (Textfarbe/-größe/-abstand), `.fw-app__visually-hidden` (A11y) — alle bereits vorhanden und ausreichend; nur drei neue, minimale Klassen für Rubikon-Text-Container/-Zeilen/-Fußnote nötig |
| Timer-State | AP-03f hatte einen Timer (`screen4Timer`) für den Morph; dieser AP braucht zwei verkettete Timer (Text-Reveal, CTA-Reveal) — Struktur direkt aus dem bestehenden `screen4RevealedRate`-Cache-Muster erweitert, keine neue Architektur nötig |
| Reduced-Motion-Strategie | keine CSS-Transition gebaut (siehe „CSS/Layout/Mobile" unten) — reines `hidden`-Attribut-Toggling, exakt wie der bereits im Code dokumentierte Screen-Controller-Grundsatz „hidden-Toggle ist direkt, kein CSS-Übergang" (Zeile 559 im Patch). Dadurch ist RM trivial erfüllt: es gibt keine Bewegung, die deaktiviert werden müsste |
| Mobile-Risiko | Textblock nutzt Flow-Layout ohne feste Breiten/Positionierung, reflowt automatisch; kein neues Risiko über das bereits bestehende Chart-Container-Verhalten hinaus — nicht im Browser geprüft (siehe „Manuelle Browser-QA") |

## Geänderte Dateien

Erlaubt:

- `Apps/prokrastinations-preis/app.js`: geändert — 89 Zeilen Diff (Entfernung der alten Morph-Funktionen, neue `renderScreen4Chart()`/`revealScreen4()`, neuer DOM-Textblock, angepasste Timer-Cleanup-Stelle in `showScreen()`)
- `Apps/prokrastinations-preis/app.css`: geändert — 15 additive Zeilen (drei neue, minimale Klassen für den Rubikon-Textblock)
- `docs/steering/patches/AP-prokrast-03h_stehender-rubikon-screen_rueckspiegel-horizont_Ergebnis.md`: dieses Protokoll

Nicht geändert (alle per `git diff --name-status` bestätigt, kein Treffer):

- Engine-Dateien: `ChartEngine.js`, `FwSmartXAxis.js` — unverändert
- Plugin-Dateien: `FwChartTextPlugin.js`, `FwVerticalLinePlugin.js`, `FwAnnotationPulsePlugin.js`, `plugins/index.js` — unverändert
- Strategy-Dateien: `LineChartStrategy.js`, `BaseChartStrategy.js` — unverändert
- Spec-Dateien: `docs/spec/*` — unverändert
- `app.test.html`: unverändert
- `APP_SPEC.md`: unverändert
- `stations.de.json`: unverändert
- `package.json`/Lockfiles/`chart.umd.min.js`: unverändert, keine Dependency installiert

## Implementierter Screen 4

- finaler Rückspiegel/Horizont-Zustand ab Eintritt: ja — `renderScreen4Chart()` wird als erster und einziger Chart-Renderaufruf in `revealScreen4()` genutzt, kein Initialrender mit anderem `xDisplayRange` mehr
- `xDisplayRange.max = addMonths(ctx.latestMonth, 119)`: ja, exakt wie in der Aufgabenstellung vorgegeben und identisch zur bereits in AP-03a bestätigten 119-Monats-Symmetriekonvention (`startMonth = subtractMonths(latestMonth, 119)`)
- Rubikon/Heute-Schwelle: `features.verticalLine:'last'` aktiviert `FwVerticalLinePlugin` unverändert (positioniert sich am letzten echten Datenpunkt von Dataset 0)
- leerer Zukunftsraum: ja — Chart.js zeichnet nur bis zum letzten realen Punkt, der Achsenraum rechts davon bleibt automatisch leer
- keine Zukunftsgrafik: ja — kein zweites Dataset, keine Symbolkurve, keine Pfeile/Icons
- keine Forecast-Andeutung: ja — Text vermeidet explizit alle in der Aufgabenstellung verbotenen Formulierungen (siehe „Text/Copy" unten)
- keine Zukunftsdaten: ja — `chartSeries` stammt unverändert aus `marketTimeStrategy()` über die realen 120 CSV-Monate
- keine Dummy-Datasets: ja
- keine C2-Step-Sequenz: ja — nur ein `renderFromData()`-Aufruf für den Chart, kein Zwischenwert-Loop

## Text / Copy

- verwendete Hauptfassung: die in der Aufgabenstellung vorgegebene primäre Textfassung, unverändert übernommen, aufgeteilt in vier `<p>`-Absätze entlang der Leerzeilen-Struktur der Vorgabe (```Die letzten zehn Jahre sind gelaufen.``` / ```Die nächsten zehn sind leer.\nNoch.``` / ```Nicht weil nichts passiert —\nsondern weil niemand weiß, was.``` / ```Andere Krisen. Gleiche Zumutung.\nDer Job bleibt:\ndranbleiben, wenn es nervt.```); interne Zeilenumbrüche innerhalb eines Absatzes (z. B. „Noch." als eigene Zeile) über `\n` + CSS `white-space:pre-line` erhalten, nicht über `<br>` (SafeDOM-Konvention dieses Codebase — `textContent`, kein `innerHTML`)
- mobile Fassung: **nicht separat gebaut.** Die primäre Fassung wurde stattdessen mit responsivem Flow-Layout (kein fixer Umbruch, `.fw-app__screen-subline` reflowt normal) umgesetzt, wie von der Aufgabenstellung als bevorzugter erster Versuch vorgegeben („Erst versuchen, die primäre Fassung mit guter DOM-Struktur mobil lesbar zu machen"). Ob das auf 375px tatsächlich trägt, ist ungeprüft (siehe „Risiken")
- optionaler Prognose-Abgrenzungssatz: ja, umgesetzt — „Keine Vorhersage. Nur Markterfahrung." als eigene, kleine Fußnote (`.fw-app__rubikon-footnote`), erscheint zusammen mit dem Haupttext (kein separater Timer, um „nicht überarchitektonisieren" zu respektieren)
- bewusst nicht verwendete Formulierungen: alle in der Aufgabenstellung explizit verbotenen Sätze („Das Muster nicht.", „Es wird wieder fallen/steigen.", „Am Ende hast du wahrscheinlich mehr.", „80 % Chance.", „Langfristig wird es mehr.", „Jedenfalls geht es gut aus.") kommen im implementierten Text nicht vor (per Volltext-Abgleich der vier Absätze + Fußnote gegen die Verbotsliste bestätigt)
- Prognose-/Nudging-Risiko: niedrig eingeschätzt — der Text beschreibt ausdrücklich Ungewissheit („niemand weiß, was") statt eines erwarteten Ausgangs, verstärkt durch die Fußnote; keine Rendite-, Verlaufs- oder Wahrscheinlichkeitsangabe im Text

## DOM / Canvas / A11y

- Haupttext im DOM: ja — vollständig als `<p>`-Elemente in `rubikonText` (SafeDOM: `textContent`, kein `innerHTML`)
- Canvas-Text entfernt/deaktiviert: ja — `chartText`-Options-Feld wird in `renderScreen4Chart()` nicht mehr übergeben; `ChartEngine._draw()` behandelt ein fehlendes `chartText`-Feld als `null` (Guard `options.chartText != null`, `ChartEngine.js:196–200`), das Plugin wird dadurch für Screen 4 gar nicht erst registriert — sauberer als eine leere `annotations`-Liste, weil kein totes Options-Feld mehr im Code steht
- aria-live-Strategie: Wiederverwendung der bestehenden geteilten `aria-live="polite"`-Region (`a11yRegion`, `.fw-app__visually-hidden`), identisch zum bereits etablierten Muster aus AP-03f/S2/S3
- Anzahl Announcements: **genau eine** pro tatsächlichem Text-Reveal-Moment (Zeile im Timer-Callback bei Text-Sichtbarkeit) — die zweite Fundstelle im Code (`a11yRegion.textContent = RUBIKON_A11Y_TEXT` im „bereits revealed"-Frühausstieg) ist ein alternativer, sich gegenseitig ausschließender Codepfad (Re-Announce bei Rückkehr ohne neuen Reveal), niemals beide im selben Aufruf
- Screenreader-Bedeutung der Leere: über den vollständigen `RUBIKON_A11Y_TEXT`-Satz abgedeckt („Die letzten zehn Jahre sind gelaufen. Die nächsten zehn Jahre sind bewusst leer, weil niemand weiß, was passiert. Der Handlungsrahmen ist: dranbleiben, wenn es nervt.") — wörtlich wie in der A11y-Pflicht-Vorgabe des Auftrags formuliert

## CTA / Timing

- 800ms Stille vor Text: ja — erster `setTimeout(..., 800)` in `revealScreen4()`
- Text-Reveal: `rubikonText.removeAttribute('hidden')` im ersten Timer-Callback, direkt gefolgt von der einmaligen `aria-live`-Aktualisierung
- 800ms Stille vor CTA: ja — zweiter, im ersten Callback gestarteter `setTimeout(..., 800)`
- CTA hidden bis: Chart final gerendert **und** Text sichtbar **und** weitere 800ms Stille abgelaufen
- CTA sichtbar ab: `cta.removeAttribute('hidden')` im zweiten Timer-Callback, gleichzeitig wird `screen4RevealedRate = currentRate` gesetzt (schließt die Sequenz ab)

## CSS / Layout / Mobile

- Layout-Änderungen: `rubikonText`-Container ohne feste Breite/Position, reines Flow-Layout unterhalb des Charts (`margin-top` über bestehendes Spacing-Token `--fw-space-md`)
- Horizont-/Empty-State-Darstellung: **keine zusätzlichen Bereichslabels („Rückspiegel"/„Horizont") gebaut.** Bewusste Scope-Entscheidung: Die Aufgabenstellung listet solche Labels nur unter „Mögliche Mittel" (optional), nicht als Pflicht. Die Leere wird stattdessen — wie in der Aufgabenstellung ausdrücklich als ausreichend benannt („Die Leere wird durch DOM-Text erklärt") — über den DOM-Text und die bereits vorhandene, klar erkennbare `FwVerticalLinePlugin`-Schwellenlinie kommuniziert. Minimiert CSS-Footprint und Regressionsrisiko; falls Albert im Test befindet, dass die Leere trotzdem wie ein Darstellungsfehler wirkt, ist das im nächsten AP gezielt nachrüstbar
- Bereichslabels: keine (siehe oben)
- Mobile 375px: **nicht browser-geprüft** (siehe „Manuelle Browser-QA"/„Risiken") — Layout nutzt ausschließlich bereits im Projekt etablierte, responsive Muster (`.fw-app__chart-section`, `.fw-app__screen-subline`), keine neue fixe Breite/Position eingeführt
- Reduced Motion CSS: **keine CSS-Transition gebaut, daher kein `prefers-reduced-motion`-Override nötig.** Text- und CTA-Reveal laufen ausschließlich über das `hidden`-Attribut (sofortiges Erscheinen, keine Animation) — identisch zum bereits im Code dokumentierten Grundsatz des gesamten Screen-Controllers. Damit ist RM automatisch und ohne zusätzlichen Code sauber, es gibt schlicht keine Bewegung, die unter RM deaktiviert werden müsste. Die 800ms-Stille-Beats bleiben in beiden Modi identisch (reines Timing, keine visuelle Bewegung während der Stille)

## Timer / State / Re-Entry

- Timer-Struktur: zwei benannte, verkettete `setTimeout`-Handles (`screen4TextTimer`, `screen4CtaTimer`) — kein `setInterval`, kein `requestAnimationFrame`
- Cleanup beim Verlassen von Screen 4: `showScreen()` löscht beide Timer, sobald `n !== 4`
- Schutz gegen Re-Entry: `revealScreen4()` löscht beide Timer defensiv bei jedem Aufruf, bevor ggf. neu gestartet wird; bei unverändertem `currentRate` (`screen4RevealedRate === currentRate`) erfolgt kein erneuter Reveal, nur eine erneute `aria-live`-Ansage — der bereits gerenderte Chart und die bereits sichtbaren Text-/CTA-Elemente bleiben unverändert stehen (Screens werden nur über `hidden` aus-/eingeblendet, nicht neu aufgebaut)
- Schutz gegen Rate-Wechsel: `screen4RevealedRate` wird nur im finalen Timer-Callback gesetzt; ändert sich `currentRate` (neuer Durchlauf über Screen 1 → `btnS1Next`), erkennt der Vergleich `screen4RevealedRate === currentRate` automatisch die Abweichung und der komplette Reveal (Chart neu rendern, Text/CTA zurücksetzen, beide Timer neu starten) läuft erneut — identisch zum bereits in AP-03f etablierten und hier unverändert übernommenen Muster
- keine Floating-Timer: durch die doppelte defensive Bereinigung (Screen-Wechsel weg von S4 UND jeder erneute `revealScreen4()`-Aufruf) kann zu keinem Zeitpunkt mehr als je ein Text- und ein CTA-Timer gleichzeitig aktiv sein

## Code-QA

| No-Go | Gefunden? | Beleg |
|---|---:|---|
| alter Morph-Reveal als Default | nein | `renderScreen4Initial()`/`renderScreen4Final()` per Grep vollständig entfernt, kein Treffer mehr |
| C2-Step-Sequenz | nein | kein `addMonths(ctx.latestMonth, 30/60/89)`, keine 25/50/75/100-Logik, Grep negativ |
| Future-Line / Symbolchart | nein | kein zweites Dataset, keine Symbol-/Icon-/Pfeil-Elemente im neuen Code |
| Zukunftsdaten/Dummy | nein | Grep auf `dummy`/`forecast`/`Cone`/`Zukunftsdaten` negativ |
| Chart.js-Internals | nein | Grep auf `Chart.getChart`/`chart.scales`/`getPixelForValue` negativ |
| update-none/rAF | nein | Grep auf `chart.update(`/`update('none')`/`requestAnimationFrame`/`setInterval` negativ |
| Engine-/Plugin-/Strategy-Diff | nein | `git diff --name-status`: nur `app.js`, `app.css`, dieses Protokoll |
| Canvas-only-Semantik | nein | Haupttext ausschließlich im DOM, `chartText`-Options-Feld entfernt |
| mehrfaches aria-live | nein | genau eine Aktualisierung pro Reveal-Moment, zweite Fundstelle ist alternativer, sich ausschließender Re-Announce-Pfad |

## Manuelle Browser-QA

- von Albert durchgeführt: **nein** (noch nicht — dieses AP endet vor Alberts Testrunde, wie in Kettenposition/Statuslogik vorgesehen)
- stehender Rubikon-Zustand trägt: offen
- Rückspiegel/Horizont fühlbar: offen
- Leere wirkt absichtlich: offen — größte offene Frage, da bewusst auf zusätzliche Bereichslabels verzichtet wurde (siehe „CSS/Layout/Mobile")
- Prognosegefühl: offen (Text-Analyse spricht dagegen, siehe „Text/Copy", aber nicht im echten Kontext geprüft)
- Textton: offen
- CTA-Timing: offen (Code-Pfad korrekt, subjektive Wirkung ungeprüft)
- Re-Entry: offen
- Rate-Wechsel: offen
- Screen 1–3: offen (Code-Diff zeigt keine Berührung von S1–S3-Pfaden, aber nicht laufzeitgeprüft)
- Szenario AF: offen (`app.test.html` in diesem AP nicht angefasst, aber nicht laufzeitgeprüft)
- Mobile: offen
- Reduced Motion: offen (Code-Pfad korrekt — keine Bewegung vorhanden — aber nicht laufzeitgeprüft)
- Konsole: offen

## Stop-Regeln geprüft

| Stop-Regel | Ausgelöst? | Notiz |
|---|---:|---|
| Mehrdateienbedarf | nein | nur `app.js`/`app.css`, wie erlaubt |
| Engine-/Plugin-/Strategy nötig | nein | vollständig über bestehenden `renderFromData()`-Vertrag lösbar |
| Chart.js-Internals nötig | nein | kein Bedarf erkannt |
| Zukunftsgrafik nötig | nein | Leere wird über Text + bestehende Vertikallinie kommuniziert |
| Mobile nicht lösbar | nein, aber ungeprüft | Flow-Layout ohne fixe Breiten, kein technischer Blocker erkennbar, subjektive Bewertung steht aus |
| Timer nicht sauber lösbar | nein | doppelte defensive Bereinigung, analog AP-03f-Muster |
| reduzierter Screen subjektiv nicht ausreichend | **noch nicht geprüft** | Albert hat noch nicht getestet — das ist der zentrale Grund für Status GELB, nicht ROT |

## Risiken / offene Punkte

- Architektur: keine offenen Punkte — Umsetzung folgt exakt der Masterfaden-Entscheidung, keine Engine-/Plugin-Berührung
- Code: keine bekannten Mängel; alte Morph-Logik vollständig entfernt statt nur überschrieben (Surgical-Check: verwaister Code wurde beseitigt, nicht liegen gelassen)
- UX: zentrale offene Frage, ob der Verzicht auf Bereichslabels („Rückspiegel"/„Horizont") ausreicht, damit die Leere absichtlich statt fehlerhaft wirkt — bewusste Minimal-Scope-Entscheidung, im Test zu verifizieren
- Text: Prognose-/Nudging-Risiko nach eigener Prüfung niedrig, aber Textton („finanzwesirig, nicht kitschig") ist eine rein subjektive Qualität, die nur Albert beurteilen kann
- Mobile: 375px-Verhalten vollständig ungeprüft, kein Blocker aus Code-Sicht erkennbar
- Reduced Motion: kein neues Risiko — Design vermeidet jede Bewegung, die deaktiviert werden müsste
- Produktentscheidung: entspricht vollständig der im Auftrag konsolidierten Masterfaden-Entscheidung; kein Rückfall auf C2/Morph im Code vorhanden

## Nachtrag — Alberts informeller Zwischentest: Textposition-Konflikt mit A11y-Pflicht gefunden

Albert hat den Screen bereits informell angesehen (vor dem formalen 18-Punkte-Test) und zurückgemeldet: „Klappt soweit." Zusätzlich ein konkreter Änderungswunsch:

> „Die Texte müssen in den rechten Teil des Graphen, nicht darunter. Dafür haben wir doch das neue Plugin."

Mit „das neue Plugin" ist `FwChartTextPlugin` gemeint (aus AP-03f gebaut, in AP-03h für den Screen-4-Haupttext bewusst deaktiviert).

**Konflikt, hier aufgedeckt und Albert direkt zur Entscheidung vorgelegt (Rückfrage gestellt, nicht eigenmächtig entschieden):**

- Alberts visueller Wunsch (Text im rechten, leeren Zukunftsraum des Charts statt darunter) ist dramaturgisch nachvollziehbar — der Text säße dort, wo die Leere tatsächlich ist.
- Der direkte Weg dahin (`FwChartTextPlugin`, Canvas-Text) verletzt aber genau die A11y-Pflicht, die dieser AP-Auftrag selbst explizit vorschreibt: „Der semantische Haupttext muss im DOM stehen. Nicht nur Canvas." Canvas-Text ist für Screenreader unsichtbar; eine Canvas-Lösung bräuchte zusätzlich eine separate, synchron gepflegte DOM-/`aria-live`-Kopie desselben (recht langen, vierteiligen) Texts — Doppelpflege, Drift-Risiko zwischen den beiden Textversionen, zusätzliche Komplexität.
- Als Alternative wurde eine DOM-Overlay-Lösung vorgeschlagen (bestehender `rubikonText`-Block per CSS `position:absolute` über die rechte Hälfte des `.fw-app__chart-section`-Containers gelegt) — bliebe vollständig screenreaderfähig, responsiv, ohne Canvas-Text-Wrap-Probleme, und würde den visuellen Wunsch (Text sitzt im leeren Bereich) trotzdem erfüllen.

**Alberts Entscheidung auf Rückfrage:** Diesen Konflikt nicht in diesem AP eigenmächtig auflösen (weder Canvas- noch Overlay-Lösung bauen). Stattdessen als offenen, klärungsbedürftigen Punkt an die Steuerungsebene (Masterfaden) zurückgeben. Status bleibt **GELB**, nicht GRÜN. Kein weiterer Code-Patch in diesem AP.

**Konsequenz für den Code-Stand:** Der `rubikonText`-Block bleibt wie ursprünglich in diesem AP gebaut — als DOM-Textblock unterhalb des Charts, kein Overlay, kein Canvas-Text. Keine Code-Änderung aus diesem Nachtrag heraus.

## Empfehlung

- AP-03h final akzeptieren: **nein** — Code ist vollständig und spec-konform gegenüber dem ursprünglichen Auftrag umgesetzt, aber zusätzlich zur offenen formalen Browser-QA jetzt ein zweiter, wichtiger offener Punkt: Textposition-Konflikt zwischen Alberts visuellem Wunsch (Text im rechten Chart-Bereich) und der A11y-Pflicht dieses APs (Haupttext im DOM, nicht Canvas)
- reduzierter Screen trägt produktseitig: **offen** — Alberts formaler 18-Punkte-Test steht noch aus; die Grundmechanik wurde informell bereits als funktionierend bestätigt („Klappt soweit")
- **Wichtiger, klärungsbedürftiger Punkt für die Steuerungsebene:** Soll der Rubikon-Haupttext (a) als DOM-Overlay visuell in die rechte Chart-Hälfte verlegt werden (A11y-Pflicht bleibt erfüllt, zusätzlicher CSS-Aufwand), oder (b) tatsächlich über `FwChartTextPlugin`/Canvas gezeichnet werden (A11y-Pflicht müsste neu gefasst werden, z. B. via zusätzlicher, separat gepflegter DOM-/aria-live-Kopie), oder (c) bleibt der Text unterhalb des Charts wie jetzt umgesetzt? Diese Entscheidung ist ausdrücklich nicht in diesem AP getroffen worden.
- Nächster interner AP: Masterfaden-Klärung der Textposition-Frage, danach ggf. ein kleiner Folge-AP zur Umsetzung (falls Overlay oder Canvas gewählt wird), danach Alberts vollständiger formaler Browsertest (18 QA-Punkte), danach bei GRÜN AP-prokrast-03i — Abschluss-QA Screen 4 Claims-vs-Files
- Commit empfohlen: **nein** — weder vor der Textposition-Klärung noch vor Alberts vollständigem Test
- Rückgabe an Masterfaden nötig: **ja** — die Textposition-Frage ist ausdrücklich als offener, klärungsbedürftiger Punkt an die Steuerungsebene zurückzugeben (Alberts eigene Anweisung in diesem AP)

## Wiederlesen des Ergebnisprotokolls

- Ergebnisprotokoll nach Write vollständig wiedergelesen: ja
- Abgleich gegen Aufgabenstellung bestanden: ja
- Abweichungen: eine bewusste, oben begründete Scope-Entscheidung (keine zusätzlichen Bereichslabels „Rückspiegel"/„Horizont" gebaut, da im Auftrag nur optional gelistet) — transparent dokumentiert, keine stillschweigende Abweichung
