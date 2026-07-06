# AP-prokrast-08a — Koordinaten-Schnittstelle Card-to-Point Analyse Ergebnis

## Status

GRÜN

## Kurzbefund

Es existiert in der gesamten Chart-Engine keine read-only Schnittstelle, die Pixelkoordinaten eines Datenpunkts nach außen (an `app.js`) meldet. Alle drei bestehenden Plugins, die Chart.js-Internals lesen (`FwVerticalLinePlugin.js`, `FwChartTextPlugin.js`, `FwAnnotationPulsePlugin.js`), tun dies ausschließlich für die eigene Canvas-Zeichnung — keins gibt die Koordinate weiter. `FwChartTextPlugin.js` dokumentiert „keine Pixelkoordinaten nach außen, keine Card-to-Point-API" sogar explizit als bewussten Nicht-Anspruch (V1-Vertrag, AP-prokrast-03d). `app.js` selbst enthält aktuell keinen einzigen Zugriff auf `chart.scales`, `getDatasetMeta`, `getPixelForValue` oder `chartArea` — die Architekturgrenze aus `APP-INTERFACE.md` §4 ist bisher sauber eingehalten. Card-to-Point kann daher nicht über Variante A (vorhandene Schnittstelle) gebaut werden — die Schnittstelle existiert schlicht nicht. Sie kann aber mit sehr geringem Risiko über Variante B gebaut werden: ein kleiner, opt-in Plugin-Pfad, der exakt dieselbe bereits zweimal bewährte Anchor-Auflösung (`chart.getDatasetMeta(0)`, letzter/aktueller Punkt — Referenzmechanik aus `FwVerticalLinePlugin`/`FwChartTextPlugin`, AP-prokrast-07a) nutzt und das Ergebnis als reine Zahl `{x, y}` über einen neuen, additiven Options-Callback an `app.js` zurückgibt. Ein sauberer Stop (Variante C) ist nicht nötig.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short`: ` M .claude/learning/session-log.md` (eigener SESSION-START/AP-Wechsel-Eintrag dieses Fadens) + `?? Archiv/Chroniken/chronist-v1/CHRONIK-2026-07-06-ap-prokrast-07-rubikon-symbolmarkers.md` (neue Chronik-Datei, per `/chronik-check` bereits als konform geprüft) — beides bekannte, unkritische Meta-Dateien außerhalb App-/Engine-/Plugin-/Spec-/QA-Scope
- `git diff --name-status`: `M .claude/learning/session-log.md` — keine Code-/Spec-/QA-Änderung
- `git log --oneline -10`: `ca45c94` (feat AP-prokrast-07a-07d, committed), `4093808`, `0f355f7`, `a735981`, `c633f82`, `ffacc13`, `a399b5f`, `eacdc0e`, `cba810e`, `7104b77` — AP-07-Kette sichtbar committed, lückenlose Historie

Keine unerwarteten Änderungen an App-/Engine-/Plugin-/Spec-/QA-Dateien. Repo-Lage sauber, AP-07 committed. Gate-Voraussetzung für Anamnese erfüllt.

## Gelesene Pflichtquellen

- `Apps/prokrastinations-preis/APP_SPEC.md` (V2.9, vollständig §1–§14 gelesen, Rest per Struktur bekannt aus Vorgängerfäden)
- `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` — vollständig gelesen (Screen 2 Beat A–C, „Groß → schrumpft → Punkt", 7 Stationen)
- `Apps/prokrastinations-preis/QA_TEST_CASES.md` — vollständig gelesen (Gruppen A–M, P)
- `Apps/prokrastinations-preis/app.js` — vollständig gelesen (907 Zeilen)
- `Apps/prokrastinations-preis/config/stations.de.json` — vollständig gelesen (v3.0, 7 Stationen)
- `docs/steering/patches/AP-prokrast-07a_*_Ergebnis.md` — vollständig gelesen
- `docs/steering/patches/AP-prokrast-07d_*_Ergebnis.md` — vollständig gelesen (07b/07c-Inhalte darüber vollständig referenziert/zusammengefasst)
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` — vollständig gelesen (523 Zeilen)
- `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js` — vollständig gelesen
- `Theme/assets/js/fw-chart-engine/plugins/FwVerticalLinePlugin.js` — vollständig gelesen
- `Theme/assets/js/fw-chart-engine/plugins/FwAnnotationPulsePlugin.js` — vollständig gelesen
- `docs/spec/APP-INTERFACE.md` §4 (Interner Entwicklervertrag, Verantwortungsgrenzen) — gezielt gelesen
- `Theme/assets/data/b1/msci-world-net-return-eur-monthly.csv` — Zeilenzahl (307) und gezielte Zeilen (Ende + 7 Stationsmonate) geprüft

## Optional gelesene Quellen

- `Theme/assets/js/fw-chart-engine/core/FwSmartXAxis.js` — gezielt per Grep geprüft (kein `getPixelForValue`/`chartArea`/Pixel-Export vorhanden, nur Tick-Generierung)
- `Apps/prokrastinations-preis/app.css` — gezielt per Grep geprüft (`station-card|shrink|card-to-point|transition|transform|journey|pulse`): kein Card-to-Point-CSS, keine Motion-Vorarbeit vorhanden

Nicht gelesen, da Pflichtquellen die Schnittstellenfrage bereits eindeutig klärten: AP-06a-06d-Protokolle, AP-02c-02e-Protokolle, `tools/rubikon-symbol-markers-diagnose.js`, `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js` (nur aus AP-07a-Protokoll referenziert übernommen: erzeugt bei Screen-4-Aufruf ohne `annotations` genau ein Dataset, Index 0), `FwDateUtils.js` (Tabu-Zone, für diese Analyse nicht erforderlich).

## Screen-2-Iststand

- **Renderpfad:** `renderContent()` baut Screen 2 als `<section data-fw-screen="2">` mit `stationArea` (Card-Container), `chartSection2` (`data-fw-appchart="sparplan-s2"`), Orientierungs-Chip (`progressEl`) und Journey-Button (`journeyBtn`). `renderJourneyStep(stationIdx)` rendert bei jedem Stationswechsel neu.
- **Event-Card-Struktur:** `renderStationCard()` leert `stationArea` per `container.textContent = ''` und baut Quellenzeile, `<h3>`-Headline (fokussierbar), Anker-Text und Collapsible-Zwischenstand komplett neu auf. Es gibt **keine** DOM-Persistenz einer „alten" Karte während des Wechsels — die vorherige Karte wird ersetzt, nicht animiert.
- **Chart-Bezug:** `chartEngine2.renderFromData(chartSection2, visibleSeries, {...})` mit `xDisplayRange` (festes 120-Monats-Fenster), `yRangePolicy: 'cumulative-expand-zero'`, `annotations: { events: journeyAnnotations }` und `annotationPulse: { enabled: true, mode: 'newly-added' }`. Die Chart-Annotationen (`buildJourneyStationAnnotations`) berechnen bereits **Daten-Koordinaten** (Monat → `x` als Timestamp, `depotwert` → `y`) für alle vergangenen Stationen — nicht Pixel, sondern Fachwerte. Die Umrechnung Daten→Pixel geschieht ausschließlich engine-/plugin-seitig in `FwAnnotationPulsePlugin` (`chart.getDatasetMeta(dsIdx).data[i].x/.y`).
- **Vorhandene Motion:** Der einzige bereits gebaute Bewegungseffekt ist der Pulse-Ring auf dem zuletzt hinzugefügten Annotation-Marker (`FwAnnotationPulsePlugin`, „newly-added"-Modus, 1200 ms, 2 Auswüchse). Das ist **Beat B** aus dem Drehbuch (Punkt pulst) — bereits funktional vorhanden. **Beat A** (Karte schrumpft und wandert sichtbar zum Chartpunkt) existiert nicht: Der Kartenwechsel ist ein reiner DOM-Ersatz ohne Übergangsanimation, keine CSS-Transition/-Transform vorhanden (per Grep bestätigt).
- **Vorhandene A11y-/Reduced-Motion-Logik:** `FwAnnotationPulsePlugin._reducedMotion()` unterdrückt den Pulse bei `prefers-reduced-motion`. Die Marker sind gemäß TC-M12/TC-P05 nicht interaktiv, nicht fokussierbar, ohne Label. `stationLiveMessage` (`a11yRegion.textContent = station.headline`) verhindert Endwissens-Leaks (TC-H05).

## Daten-/Stationsmapping

CSV-Fenster (`Theme/assets/data/b1/msci-world-net-return-eur-monthly.csv`, 307 Zeilen inkl. Header, letzte Zeile `2026-05-29`): `latestMonth = 2026-05`, `startMonth = subtractMonths('2026-05', 119) = 2016-06` (aus `buildActiveJourneyWindow()`, `app.js` Z. 792–797). Alle 7 Stationen liegen innerhalb `[2016-06, 2026-05]`. Direkter Zeilen-Beleg (Grep auf exakte Monatspräfixe) bestätigt je genau einen Treffer pro Station — kein Mehrfach- oder Nulltreffer.

| Station | Datum/Monat | Datenpunkt gefunden? | Mapping-Quelle | Risiko |
|---|---|---:|---|---|
| Trump 2016 | 2016-11-09 → Monat 2016-11 | ja (CSV Z. 193: `2016-11-30;228,326 EUR`) | `stations.de.json` `date` → `buildJourneyStationAnnotations` Snapshot-Snap gegen `visibleSeries` | gering |
| Bitcoin 2017 | 2017-12-17 → Monat 2017-12 | ja (CSV Z. 206: `2017-12-29;252,796 EUR`) | dito | gering |
| Corona Crash 2020 | 2020-03-10 → Monat 2020-03 | ja (CSV Z. 233: `2020-03-31;254,556 EUR`) | dito | gering |
| Impfstoff-Rally 2020 | 2020-11-09 → Monat 2020-11 | ja (CSV Z. 241: `2020-11-30;328,853 EUR`) | dito | gering |
| Ukraine 2022 | 2022-02-24 → Monat 2022-02 | ja (CSV Z. 256: `2022-02-28;410,541 EUR`) | dito | gering |
| Nvidia / KI 2024 | 2024-06-19 → Monat 2024-06 | ja (CSV Z. 284: `2024-06-28;527,746 EUR`) | dito | gering |
| SaaS-Apokalypse 2026 | 2026-02-06 → Monat 2026-02 | ja (CSV Z. 304: `2026-02-27;634,448 EUR`) | dito — kein Sonderfall, wie im Drehbuch gefordert | gering — liegt nahe `latestMonth`, aber innerhalb des Fensters, kein Randproblem |

Randnotiz (kein AP-08a-Blocker, nur dokumentiert): Das Drehbuch spricht an einer Stelle noch von „Station 1 von 8", die produktive `stations.de.json` (v3.0) enthält jedoch 7 redaktionelle Stationen plus synthetischen `final_reveal`. `app.js` verwendet bereits korrekt die dynamische Zählung `Station ${n} von ${total}` — die „8" ist eine veraltete Drehbuch-Textstelle ohne Code-Auswirkung. Fremder Mess, nicht repariert (Surgical-Check).

## Koordinatenlage

- **Vorhandene Schnittstelle:** keine. `ChartEngine.js` hat keine Methode, die Pixelkoordinaten zurückgibt oder meldet. `renderFromData()` ist reines Fire-and-Forget ohne Rückgabewert/Callback für Render-Ergebnisse.
- **Vorhandene Plugin-Möglichkeit:** `FwVerticalLinePlugin`, `FwChartTextPlugin` und `FwAnnotationPulsePlugin` lösen alle denselben Referenzpunkt auf (`chart.getDatasetMeta(dsIndex).data[i]`, `.x`/`.y` in Canvas-Pixeln), zeichnen aber ausschließlich selbst — keins hat einen Ausgang nach außen. `FwChartTextPlugin.js` Kopfzeile (Z. 16–17): „keine Pixelkoordinaten nach außen, keine Card-to-Point-API" — explizit als V1-Nicht-Ziel dokumentiert (AP-prokrast-03d), nicht nur zufällig fehlend.
- **Chart.js-Internal-Zugriffe in `app.js`:** keine. Grep auf `getDatasetMeta|chart\.scales|scales\.x|chartArea|getPixelForValue` in `app.js` ergibt null Treffer — die Architekturgrenze aus §4 ist bislang vollständig eingehalten.
- **Architekturbewertung:** `APP-INTERFACE.md` §4 zieht die Grenze eindeutig: „App: Domänenlogik … ChartEngine: Visualisierung … Chart-State" und verlangt für jede Engine-Änderung ein separates Gate mit Alberts expliziter Freigabe. Card-to-Point verlangt aber unvermeidlich, dass eine Pixelposition einmal die App/Engine-Grenze überquert — die DOM-Karte muss wissen, wohin sie visuell wandern soll. Diese Grenzüberquerung ist nur sauber, wenn sie als schmaler, expliziter, engine-eigener Kanal geschieht (Zahlenpaar `{x, y}`, keine Chart.js-Objektreferenzen), nicht durch direktes Lesen von Chart.js-Internals in `app.js`.

## Entscheidung

Gewählte Variante:

```text
B
```

Begründung:

`FwChartTextPlugin.js` hat in AP-prokrast-07a bereits exakt dieses Muster erfolgreich vorgemacht: eine kleine, additive `anchor`-Option, die intern denselben `getDatasetMeta(0)`-Zugriff wie `FwVerticalLinePlugin` nutzt, um strukturgarantiert (keine zweite, divergierende Zeitberechnung) an einen Datenpunkt zu binden. Für Card-to-Point ist der einzige Unterschied, dass das Ergebnis nicht auf den Canvas gezeichnet, sondern als reine Zahl `{x, y}` (Canvas-relative Pixel, ggf. zusätzlich per `canvas.getBoundingClientRect()` in Container-/Viewport-relative CSS-Pixel übersetzt) über einen neuen, additiven Options-Callback an `app.js` zurückgegeben wird — z. B. `options.onAnchorPixel(fn)` bei `renderFromData()`, aufgerufen nach jedem Draw/Update, analog zur bestehenden Registrierungslogik von `chartText`/`annotationPulse`/`verticalLine` in `ChartEngine._draw()`. `app.js` bekommt dadurch nie eine Chart.js-Objektreferenz, `chart.scales` oder `getDatasetMeta` in die Hand — nur zwei Zahlen. Das ist kein „Chart.js-Internal-Koordinatenhack in app.js" (weiterhin verboten), sondern die konsequente Fortsetzung des in AP-07a bereits etablierten und geprüften Musters: Der Chart.js-Zugriff bleibt vollständig in der Plugin-/Engine-Schicht, nur das fertige Zahlenpaar überquert die Grenze. Variante A entfällt, weil es keine vorhandene Schnittstelle gibt, die das leisten würde. Variante C (sauberer Stop) ist nicht nötig, weil kein Architekturbruch erforderlich ist — der Weg ist eng, additiv und durch einen echten Vorgänger belegt.

## Empfehlung für AP-08b

- bauen ja/nein: ja, unter Full-Gate und mit separatem Engine-Gate für den neuen Callback-Pfad (APP-INTERFACE.md §4 verlangt das explizit für jede ChartEngine-Änderung)
- erlaubte Dateien:
  - `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` (neuer optionaler `onAnchorPixel`/gleichwertiger Options-Callback, additiv, analog `chartText`/`annotationPulse`)
  - ein neues, kleines Plugin (analog `FwChartTextPlugin.js`, kein Umbau eines bestehenden Plugins mit fremdem V1-Vertrag) ODER eine sehr kleine additive Erweiterung von `FwAnnotationPulsePlugin.js`, falls Albert das im Engine-Gate so entscheidet
  - `Apps/prokrastinations-preis/app.js` (Registrierung des Callbacks in `renderJourneyStep`/`renderContent`, DOM-Card-Animation über CSS-Custom-Properties oder `style.transform`, State-Handling für Beat A–C)
  - `Apps/prokrastinations-preis/app.css` (neue Transition-/Transform-Regeln für die Karte, `prefers-reduced-motion`-Zweig)
- verbotene Dateien:
  - `FwChartTextPlugin.js` nicht für Card-to-Point zweckentfremden — sein V1-Vertrag schließt eine Card-to-Point-API ausdrücklich aus; eine Erweiterung dort würde eine dokumentierte Architekturentscheidung stillschweigend aufheben
  - `Apps/prokrastinations-preis/APP_SPEC.md`, `drehbuch_prokrastinationspreis_app.md`, `QA_TEST_CASES.md`, `config/stations.de.json` — nur nach separatem Spec-Sync-AP, nicht im selben AP wie der Code
  - `FinanzwesirData.js`, `CSVParser.js`, `FwDateUtils.js` (Tabu-Zonen, unverändert nicht betroffen)
- besondere QA-Punkte:
  - Neuer Callback darf ausschließlich Zahlen (`{x, y}`) liefern, keine Chart.js-Objekte/Referenzen
  - Reduced-Motion-Verhalten für die Card-Bewegung selbst (analog `FwAnnotationPulsePlugin._reducedMotion()`) — Inhalt darf nicht verschwinden, nur Bewegung
  - Kein neues Dataset, kein Dummy-Punkt, keine Future-Line (TC-F01/TC-M09-Analogon für Screen 2 weiterhin gültig)
  - Regressionscheck gegen TC-D01/TC-D06/TC-D07 (Screen-2-X-Achse/Teilchart-Regeln) und TC-M08 (keine Post-Render-Hacks) — der neue Callback darf kein `Chart.getChart()`/`options.scales.x.max`-Nachbau sein
  - A11y: Card-Bewegung ist rein visuell, `stationLiveMessage`/Fokusführung (TC-H02) bleibt unverändert führend

## Nicht geändert

- `app.js`: nicht geändert (nur gelesen)
- `app.css`: nicht geändert (nur gelesen/gegrept)
- Engine (`ChartEngine.js`): nicht geändert (nur gelesen)
- Plugins (`FwChartTextPlugin.js`, `FwVerticalLinePlugin.js`, `FwAnnotationPulsePlugin.js`): nicht geändert (nur gelesen)
- APP_SPEC: nicht geändert (nur gelesen)
- Drehbuch: nicht geändert (nur gelesen)
- QA_TEST_CASES: nicht geändert (nur gelesen)
- Stationsdaten (`stations.de.json`): nicht geändert (nur gelesen)
- RubikonSymbolMarkers: nicht angefasst
- Screen 4: nicht angefasst

## Offene Punkte

| Punkt | Kategorie | Blockierend? | Empfehlung |
|---|---|---:|---|
| Drehbuch nennt an einer Stelle „Station 1 von 8" statt 7 | Doku-Inkonsistenz, kein Code-Effekt | nein | bei nächstem Drehbuch-Sync-AP korrigieren, nicht Teil von AP-08 |
| Exakte Pixel→CSS-Umrechnung (Canvas- vs. Container- vs. Viewport-relative Koordinaten) für die Card-Bewegung ist noch nicht spezifiziert | technische Detailfrage | nein, aber AP-08b muss sie im Full-Gate klären | im Full-Gate von AP-08b als Annahme sichtbar machen, nicht in AP-08a vorentscheiden |
| Engine-Gate für den neuen Callback-Pfad ist laut APP-INTERFACE.md §4 separat von der App-Änderung zu behandeln | Prozess | nein | AP-08b sollte den Engine-Teil und den App-Teil im selben Full-Gate transparent, aber getrennt benennen |

## Nächster richtiger AP

AP-prokrast-08b — Card-to-Point Implementierung, mit Full-Gate (mehrere Dateien, Engine-Verhalten betroffen) und explizitem Engine-Sub-Gate für den neuen `onAnchorPixel`-Callback, bevor `ChartEngine.js`/neues Plugin angefasst werden.

## Ausdrücklich nicht nächster AP

Erneute Öffnung von AP-07 (RubikonSymbolMarkers/TC-F05/Screen 4). Font-/Theme-Bridge-Arbeit (DS-012/DS-013) — unabhängiger Strang, nicht Voraussetzung für Card-to-Point. Zweckentfremdung von `FwChartTextPlugin.js` für Card-to-Point.
