# AP-prokrast-03h2 — DOM-Overlay Rubikon-Text ins rechte Zukunftsfeld Ergebnis

## Status

GRÜN

## Kurzbefund

Der Rubikon-Haupttext steht weiterhin als echter DOM-Text (keine Canvas-/`FwChartTextPlugin`-Nutzung), wird aber jetzt visuell über CSS `position:absolute` in die rechte, leere Zukunftshälfte des Screen-4-Charts gelegt statt als eigenständiger Absatz darunter zu erscheinen. Umgesetzt über einen neuen, minimalen Wrapper (`screen4ChartWrap`, `position:relative`), der `chartSection4` (unverändert ChartEngine-eigen, nicht angefasst) und den Overlay-Textblock (`rubikonText`) als Geschwisterelemente umschließt — kein Eingriff in den von `ChartEngine`/`FwRenderer` verwalteten Chart-DOM, keine Chart.js-Internals, kein `getPixelForValue`. Für Mobile existieren zwei Textvarianten im selben DOM-Subtree (lange Desktop-Fassung, kompakte Mobile-Kurzfassung aus der Aufgabenstellung), gesteuert allein über einen CSS-`max-width:480px`-Breakpoint — keine zusätzliche JS-Verzweigung, kein zweiter `hidden`-Zustand. Timing (800ms/800ms), `aria-live` (genau eine Aktualisierung), Timer-Cleanup und Re-Entry-/Rate-Wechsel-Schutz aus AP-03h sind unverändert — es wurde ausschließlich DOM-Struktur (ein neuer Wrapper, zwei Text-Varianten) und CSS (Positionierung, Breakpoint) geändert, keine Zeile der Reveal-/Timer-Logik in `revealScreen4()`/`renderScreen4Chart()`/`showScreen()` wurde angefasst.

**Grund für GRÜN:** Albert hat den vollständigen 18-Punkte-Test durchgeführt, über zwei Nachtrag-Zyklen zwei konkrete Korrekturen angestoßen (Desktop-Abstand zur Linie, S-Zone-Position) und beide nach Umsetzung erneut geprüft. Letzte Rückmeldung: „Screen S sieht auch gut aus, jetzt alles ok." Damit sind alle GRÜN-Kriterien dieses AP-Auftrags erfüllt: Text sitzt bestätigt im rechten Zukunftsfeld auf allen drei geprüften Breakpoints (S/M/L), DOM/A11y/CTA-Timing unverändert aus AP-03h, Konsole sauber, keine Engine-/Plugin-/Strategy-Berührung, keine Zukunftsgrafik.

## Ausgangspunkt AP-03h

- AP-03h Status: GELB
- offener Punkt: Text stand unter dem Chart statt im rechten leeren Zukunftsfeld; Albert lehnte das als Endzustand ab und verwies auf `FwChartTextPlugin`
- gewählte Lösung (Masterfaden-Entscheidung, in diesem AP-Auftrag vorgegeben): DOM-Overlay statt Canvas-Text — Text bleibt semantisch/strukturell DOM, wird nur visuell repositioniert

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short` (vor Implementierung): `M .claude/learning/session-log.md`, `M Apps/prokrastinations-preis/app.css`, `M Apps/prokrastinations-preis/app.js`, `?? docs/steering/patches/AP-prokrast-03f_..._Ergebnis.md`, `?? docs/steering/patches/AP-prokrast-03g_..._Ergebnis.md`, `?? docs/steering/patches/AP-prokrast-03h_..._Ergebnis.md` — alle bereits bekannte Vorzustände dieser Session, keine Fremdänderungen
- `git diff --name-status` (vor Implementierung): `M .claude/learning/session-log.md`, `M Apps/prokrastinations-preis/app.css`, `M Apps/prokrastinations-preis/app.js`

Repo-Namensdiskrepanz wie in allen AP-prokrast-0x-Protokollen dokumentiert — kein Stop. AP-03h-Ergebnisprotokoll vorhanden, `rubikonText`/Screen-4-/CTA-/Timer-Logik aus AP-03h im Code auffindbar (verifiziert vor Umsetzung) — kein Stop-Grund ausgelöst.

## Gelesene Pflichtquellen

- `docs/steering/patches/AP-prokrast-03h_stehender-rubikon-screen_rueckspiegel-horizont_Ergebnis.md` — vollständig gelesen (bereits in dieser Session selbst verfasst, erneut geprüft)
- `Apps/prokrastinations-preis/app.js` — gezielt tief gelesen: Screen-4-DOM-Block (Zeilen 401–480), `revealScreen4()`/`renderScreen4Chart()`/Timer-Logik (Zeilen 520–557), `showScreen()`-Timer-Cleanup
- `Apps/prokrastinations-preis/app.css` — vollständig gelesen (301 Zeilen vor Patch), insbesondere `.fw-app__chart-section` (Zeile 104–108, bereits `position:relative`) und die in AP-03h neu eingeführten `.fw-app__rubikon-*`-Klassen
- `docs/steering/patches/AP-prokrast-03f_screen-4_rubikon-reveal_integration_fw-chart-text_Ergebnis.md` — bereits in dieser Session vollständig gelesen, für Kontext zur `.fw-chart-canvas-container{height:400px}`-Engine-CSS herangezogen (dort in AP-03d/03f dokumentierter Fund)
- `docs/steering/patches/AP-prokrast-03g_klaerung-forschung_rubikon-reveal_scale-animation_Ergebnis.md` — bereits in dieser Session vollständig gelesen, für Kontext nicht erneut inhaltlich benötigt (betrifft Achsenanimation, nicht Textposition)
- `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js` — bereits in dieser Session vollständig gelesen, zur Bestätigung, dass dieser AP es bewusst ungenutzt lässt
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` — bereits in dieser Session vollständig gelesen, `renderFromData()`-Container-Guards erneut herangezogen, um zu bestätigen, dass `chartSection4` als `data-fw-appchart`-Container unverändert bleiben muss und nicht selbst als Overlay-Anker dienen darf

## Pre-Code-Gates

| Frage | Befund |
|---|---|
| `rubikonText` aktueller DOM-Ort | direktes Geschwisterelement von `chartSection4`, beide Kinder von `screen4` (AP-03h-Stand) |
| geeigneter Overlay-Container | neuer Wrapper `screen4ChartWrap` (`position:relative`), umschließt `chartSection4` und `rubikonText` als Geschwister — `chartSection4` selbst bleibt unverändert (kein Nesting von `rubikonText` in den ChartEngine-eigenen Container, da `renderFromData()`/`FwRenderer.setupStructure()` diesen Container intern verwalten und potenziell neu aufbauen; ein Eingriff dort wäre riskant und nicht nötig) |
| Positionierungsstrategie | `position:absolute` auf `rubikonText`, `top/left/right` in Prozent relativ zu `screen4ChartWrap` — keine Pixelmessung, keine Chart.js-Koordinatenabfrage |
| Desktop/Tablet | `left:54%` (Sicherheitsabstand zur bei ~50 % liegenden Rubikon-Linie), `right:3%`, `top:8%` |
| Mobile 375px | eigene, kompaktere Textfassung (aus Aufgabenstellung übernommen) + engerer Breakpoint-Bereich (`left:50%`, `right:2%`, `top:6%`, `font-size:0.85em`) unter `@media (max-width:480px)` |
| A11y | keine Änderung an DOM-Inhalt/`hidden`-Steuerung/`aria-live` — nur visuelle CSS-Position; `pointer-events:none` verhindert versehentliche Interaktions-Blockade, ändert aber nichts an Fokus-/Screenreader-Reihenfolge (Quellcode-Reihenfolge bleibt: `chartSection4` vor `rubikonText` vor `cta`) |
| Timing | vollständig unverändert aus AP-03h übernommen — keine Zeile in `revealScreen4()`/`renderScreen4Chart()`/`showScreen()` geändert |
| RM | keine neue Bewegung eingeführt (keine CSS-Transition ergänzt) — unverändert `hidden`-Attribut-Toggling, RM bleibt trivial erfüllt |

## Geänderte Dateien

Erlaubt:

- `Apps/prokrastinations-preis/app.js`: geändert — 119 Zeilen Diff (5 Löschungen, Rest additiv): neuer `screen4ChartWrap`-Wrapper, `rubikonText` in zwei Varianten (`rubikonLong`/`rubikonShort`) statt einer, keine Änderung an Timer-/Reveal-Funktionen
- `Apps/prokrastinations-preis/app.css`: geändert — 44 Zeilen Diff (rein additiv/ersetzend im bereits in AP-03h neu eingeführten Block): Overlay-Positionierung, Mobile-Breakpoint, alte `margin-top`-Regel für `.fw-app__rubikon-text` durch `position:absolute`-Regelsatz ersetzt
- `docs/steering/patches/AP-prokrast-03h2_dom-overlay-rubikon-text_rechtes-zukunftsfeld_Ergebnis.md`: dieses Protokoll

Nicht geändert (per `git diff --name-status` bestätigt, kein Treffer):

- Engine-Dateien: `ChartEngine.js`, `FwSmartXAxis.js`, `LineChartStrategy.js`, `BaseChartStrategy.js` — unverändert
- Plugin-Dateien: `FwChartTextPlugin.js`, `FwVerticalLinePlugin.js`, `FwAnnotationPulsePlugin.js`, `plugins/index.js` — unverändert
- `app.test.html`: unverändert
- `APP_SPEC.md`: unverändert
- `stations.de.json`: unverändert
- `package.json`/Lockfiles/`chart.umd.min.js`: unverändert, keine Dependency installiert

## Implementierte Lösung

- DOM-Overlay: ja — `rubikonText` liegt `position:absolute` innerhalb von `screen4ChartWrap`, visuell über `chartSection4`
- visueller Ort im rechten Zukunftsfeld: ja — `left:62%/right:3%` (Desktop), `left:56%/right:2%` (≤480px), Werte über CSS Custom Properties einstellbar (siehe „Nachtrag")
- kein Canvas-Haupttext: ja — kein `chartText`-Options-Feld, `FwChartTextPlugin` bleibt ungenutzt
- kein `FwChartTextPlugin`: ja — Grep bestätigt keine neue Nutzung, nur ein erklärender Kommentar
- keine Chart.js-Internals: ja — kein `chart.scales`, `getPixelForValue`, `Chart.getChart`
- keine Zukunftsgrafik: ja — reiner Text, keine Linie/Symbol/Icon im Overlay

## Text / A11y

- verwendete Textfassung: identisch zur AP-03h-Fassung (Desktop/Tablet, `rubikonLong`), unverändert übernommen
- mobile Fassung: die in dieser Aufgabenstellung vorgegebene Kurzfassung („Die nächsten 10 Jahre sind leer.\nNoch." / „Die Linie fehlt noch.\nDie Aufgabe nicht:\ndranbleiben.") als `rubikonShort`, aktiv unter `max-width:480px`; Fußnote „Keine Vorhersage. Nur Markterfahrung." bewusst nur in der langen Fassung enthalten (auf Mobile ausgeblendet, um das Overlay kompakt zu halten — wie in der Aufgabenstellung als zulässige Option benannt)
- `aria-live`: unverändert — `RUBIKON_A11Y_TEXT` (einzelner, bereits in AP-03h formulierter Satz), unabhängig davon, welche visuelle Variante gerade sichtbar ist; keine Änderung, keine zweite Ansage
- Screenreader-Bedeutung: unverändert vollständig abgedeckt über `RUBIKON_A11Y_TEXT` plus die im DOM stets vorhandene (je nach Breakpoint sichtbare) Textvariante — `display:none` auf der jeweils inaktiven Variante entfernt diese korrekt auch aus dem Accessibility-Tree, keine doppelte Vorlesung
- keine Doppelpflege: die beiden visuellen Textvarianten (lang/kurz) sind bewusst unterschiedliche Fassungen für unterschiedliche Bildschirmgrößen (von der Aufgabenstellung selbst so vorgegeben, nicht redundante Duplikate derselben Aussage) — keine dritte, separat gepflegte Canvas-Kopie

## Timing / CTA

- 800ms Stille vor Text: unverändert (AP-03h)
- Text sichtbar: unverändert — `rubikonText.removeAttribute('hidden')`, jetzt nur visuell anders positioniert
- 800ms Stille vor CTA: unverändert (AP-03h)
- CTA sichtbar: unverändert
- Re-Entry: unverändert (`screen4RevealedRate`-Cache-Muster unangetastet)
- Rate-Wechsel: unverändert

## CSS / Responsive

- Overlay-CSS (finaler Stand nach Nachtrag): `.fw-app__rubikon-chart-wrap { position:relative; }`, `.fw-app__rubikon-text { position:absolute; top:var(--fw-rubikon-text-top, 14%); left:var(--fw-rubikon-text-left, 62%); right:3%; pointer-events:none; }`
- `position: relative` / `absolute`: `relative` auf dem neuen Wrapper, `absolute` auf `rubikonText` — kein Eingriff in `.fw-app__chart-section`s eigenes `position:relative` (das bleibt für ChartEngine-interne absolut positionierte Elemente reserviert, unangetastet)
- `pointer-events`: `none` auf `.fw-app__rubikon-text` — Text blockiert keine darunterliegende Chart-Interaktion (aktuell ohnehin keine Tooltip-Interaktion auf Screen 4 aktiv, aber defensiv korrekt)
- Desktop: `--fw-rubikon-text-top:14%`, `--fw-rubikon-text-left:62%`, `right:3%` (Werte nach Nachtrag erhöht, siehe unten), Basis-Schriftgröße aus `.fw-app__screen-subline` (0.9em) unverändert übernommen
- Tablet: kein eigener Breakpoint — nutzt die Desktop-Regeln (Prozentwerte skalieren automatisch mit der Chart-Breite)
- Mobile 375px: `@media (max-width:480px)` — kompaktere Fassung (`rubikonShort`), `--fw-rubikon-text-top:10%`, `--fw-rubikon-text-left:56%`, `right:2%`, `font-size:0.85em`
- Reduced Motion: keine neue CSS-Transition eingeführt — unverändert `hidden`-Attribut-basiert, RM-Frage stellt sich nicht neu

## Code-QA

| No-Go | Gefunden? | Beleg |
|---|---:|---|
| Canvas-Haupttext | nein | kein `chartText`-Options-Feld in `renderScreen4Chart()` |
| `FwChartTextPlugin`-Rückfall | nein | Grep: nur ein erklärender Kommentar, keine Nutzung |
| Chart.js-Internals | nein | Grep auf `Chart.getChart`/`chart.scales`/`getPixelForValue` negativ |
| update-none/rAF | nein | Grep auf `chart.update(`/`update('none')`/`requestAnimationFrame`/`setInterval` negativ |
| Zukunftsgrafik | nein | reiner Text im Overlay, keine Linie/Symbol |
| Engine-/Plugin-/Strategy-Diff | nein | `git diff --name-status`: nur `app.js`, `app.css`, dieses Protokoll |
| mehrfach `aria-live` | nein | unverändert aus AP-03h, genau eine Aktualisierung pro Reveal-Moment |
| Text unter Chart als Endzustand | nein | Text ist jetzt `position:absolute` innerhalb des Chart-Wrappers, kein eigenständiger Flow-Absatz mehr darunter |

## Manuelle Browser-QA

- von Albert durchgeführt: **ja** — formaler Test durchgeführt, Ergebnis: „So ist es gut, alle optisch alle Tests bestanden", plus Konsolenausgabe und ein gezielter S-Zone-Befund (siehe „Nachtrag 2")
- Text rechts im leeren Feld: bestätigt auf allen drei Breakpoints (S/M/L), S-Zone-Korrektur von Albert re-verifiziert (siehe „Nachtrag 3")
- Lesbarkeit: bestanden (Screen M/L „alles ok", Screen S nach Korrektur „sieht auch gut aus")
- Leere wirkt: bestanden (kein gegenteiliger Befund von Albert)
- Prognosegefühl: bestanden (kein gegenteiliger Befund von Albert)
- Mobile: bestanden — Korrektur umgesetzt (`--fw-rubikon-text-left` 56%→68% im S-Breakpoint) und von Albert re-verifiziert
- Reduced Motion: kein gegenteiliger Befund, Code-Pfad unverändert
- CTA: bestanden (kein gegenteiliger Befund)
- Re-Entry: bestanden (kein gegenteiliger Befund)
- Konsole: **bestanden** — vollständig geprüft, alle Meldungen stammen aus bekannten Testkarten (siehe „Nachtrag 2"), kein neuer AP-03h2-Fehler

## Stop-Regeln geprüft

| Stop-Regel | Ausgelöst? | Notiz |
|---|---:|---|
| nur Canvas möglich | nein | DOM-Overlay technisch vollständig umsetzbar, kein Canvas nötig |
| Chart.js-Internals nötig | nein | reine CSS-/DOM-Lösung, keine Koordinatenabfrage |
| Engine-/Plugin nötig | nein | `chartSection4` unverändert, kein Eingriff in ChartEngine-verwalteten DOM |
| Mobile nicht lösbar | nein | eigene Kurzfassung + engerer Breakpoint umgesetzt, plausibler Lösungsweg vorhanden (visuell ungeprüft, aber kein technischer Dead-End) |
| A11y leidet | nein | DOM-Struktur/`aria-live`/Fokusreihenfolge unverändert, nur CSS-Position geändert |
| Overlay verdeckt Linie | nein | durch Sicherheitsabstand (final `left:62%`/`68%` statt `50%`) minimiert und von Albert auf allen drei Breakpoints im echten Browser bestätigt (Nachtrag 2/3) |

## Risiken / offene Punkte

- Architektur: keine offenen Punkte — reine CSS-/DOM-Positionierungslösung, keine Engine-/Plugin-Berührung
- Code: keine bekannten Mängel; Timing-/Reveal-/A11y-Logik aus AP-03h vollständig unangetastet übernommen
- UX: von Albert auf allen drei Breakpoints bestätigt (siehe „Nachtrag 3") — keine offene Frage mehr
- Text: unverändert aus AP-03h, dort bereits geprüft (kein Prognose-/Nudging-Risiko erkannt)
- Mobile: kompakte Fassung + engerer Breakpoint umgesetzt; von Albert getestet, ein Positionsfehler gefunden, korrigiert und re-verifiziert (siehe „Nachtrag 2"/„Nachtrag 3") — kein offenes Risiko mehr
- Reduced Motion: kein neues Risiko
- Produktentscheidung: entspricht der in diesem AP-Auftrag vorgegebenen Masterfaden-Entscheidung (DOM-Overlay statt Canvas), vollständig umgesetzt

## Nachtrag — Alberts Live-Feedback: Text zu nah an der blauen Linie, Tuning-Parameter gewünscht

Albert hat den Screen bereits informell getestet: „Das hat alles geklappt. Aber der Text ist zu nah an der blauen Linie." Zusätzlich der Wunsch, die Position selbst nachjustieren zu können („linke obere Ecke etwas nach rechts/links/oben/unten").

**Umsetzung:** `top`/`left` von `.fw-app__rubikon-text` wurden auf CSS Custom Properties umgestellt (`--fw-rubikon-text-top`, `--fw-rubikon-text-left`), sowohl im Desktop-Regelsatz als auch im `max-width:480px`-Mobile-Breakpoint. Bedienlogik: größerer `--fw-rubikon-text-top`-Wert schiebt die linke obere Ecke nach unten, kleinerer nach oben; größerer `--fw-rubikon-text-left`-Wert schiebt sie nach rechts, kleinerer nach links — exakt Alberts genanntes mentales Modell. Zusätzlich wurde der Default-Sicherheitsabstand zur Rubikon-Linie direkt erhöht (Desktop `left: 54% → 62%`, `top: 8% → 14%`; Mobile `left: 50% → 56%`, `top: 6% → 10%`), um die gemeldete Nähe zur Linie zu adressieren.

Die neuen Custom Properties sind auch direkt in den Browser-DevTools live testbar (Element auswählen → Styles-Panel → Wert der beiden `--fw-rubikon-text-*`-Properties ändern), bevor eine endgültige Zahl an Claude zur Übernahme in den Code gegeben wird — kein erneuter Full-Gate-Zyklus pro Positionsversuch nötig.

**Konsequenz für den Status:** weiterhin GELB — die neuen Default-Werte (14 %/62 %) sind eine plausible, aber ebenfalls ungeprüfte Schätzung; Albert muss den tatsächlichen Abstand im Browser final bestätigen oder über die Custom Properties nachjustieren.

## Nachtrag 2 — Alberts formaler 18-Punkte-Test: Konsole geprüft, S-Zone-Korrektur

Albert hat den formalen Test durchgeführt und zurückgemeldet: „So ist es gut, alle optisch alle Tests bestanden" — inklusive Konsolenausgabe und einem gezielten Mobile-Befund.

**Konsole (Punkt 18):** Vollständig geprüft, per Volltext-Abgleich gegen den bereits in AP-03e dokumentierten Befund. Alle sichtbaren Fehler (`GATEKEEPER: URL nicht erlaubt`, `HTTP Error: 404`, `GATEKEEPER: Ungültiges Datum …`) stammen aus den bereits bestehenden, absichtlich fehlerhaften Test-CSV-Karten (`nonexistent.csv`, `invalid.csv`, `no-date.csv` — dieselben Pfade wie in AP-03e als „Testkarten H/I/J/Q" identifiziert), nicht aus Screen 4/`chartSection4`/`rubikonText`/`revealScreen4`-Code. Kein neuer, AP-03h2-bezogener Konsolenfehler. **Punkt 18: bestanden.**

**Desktop/Tablet (Screen M/L):** „alles ok" — keine Korrektur nötig.

**Mobile (Screen S):** „Muss weiter nach rechts. Die Buchstaben 'Di' von 'Die nächsten…' sind links von der blauen Linie." — Der Mobile-Breakpoint-Wert `--fw-rubikon-text-left:56%` war auf schmalen Viewports nicht ausreichend, der Textanfang lag noch im Vergangenheitsbereich statt vollständig rechts der Rubikon-Linie.

**Fix:** `--fw-rubikon-text-left` im `max-width:480px`-Breakpoint von `56%` auf `68%` erhöht (`top:10%`/`right:2%` unverändert, da dazu kein Befund vorlag). Ausschließlich `app.css` geändert, keine JS-/DOM-Änderung nötig — bestätigt die in Nachtrag 1 gebaute Tuning-Parameter-Lösung funktioniert wie vorgesehen (eine Zeile, kein Selektor-Suchen).

**Konsequenz für den Status:** damals weiterhin GELB — Desktop/Tablet waren bestätigt, S-Zone-Korrektur (56 %→68 %) stand noch zur Re-Verifikation aus.

## Nachtrag 3 — Alberts Re-Verifikation: Screen S bestätigt, AP abgeschlossen

Albert: „Screen S sieht auch gut aus, jetzt alles ok."

Damit sind alle drei Breakpoints (S/M/L) von Albert im echten Browser bestätigt, die Konsole ist sauber (Nachtrag 2), und keine weitere Korrektur ist offen. Alle GRÜN-Kriterien der Statuslogik dieses AP-Auftrags sind erfüllt. Status wird von GELB auf **GRÜN** hochgestuft.

## Empfehlung

- AP-03h2 final akzeptieren: **ja**
- AP-03h damit testreif: **ja** — vollständig abgeschlossen, alle 18 QA-Punkte bestanden (S/M/L-Breakpoints, Konsole, CTA-Timing, A11y-Struktur unverändert)
- Nächster AP: AP-prokrast-03i — Abschluss-QA Screen 4 Claims-vs-Files
- Commit empfohlen: **ja** — auf Alberts explizites OK hin, gesamte Rubikon-Reveal-Kette (AP-03f–03h2) ist jetzt in sich abgeschlossen und bestätigt
- Rückgabe an Masterfaden nötig: **nein** — der aus AP-03h offene Klärungspunkt (Overlay vs. Canvas) ist durch die Masterfaden-Vorgabe in diesem AP-Auftrag entschieden, umgesetzt und von Albert bestätigt

## Wiederlesen des Ergebnisprotokolls

- Ergebnisprotokoll nach Write vollständig wiedergelesen: ja
- Abgleich gegen Aufgabenstellung bestanden: ja
- Abweichungen: keine
