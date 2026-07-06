# AP-prokrast-07a — RubikonSymbolMarkers Implementierung Ergebnis

## Status

GRÜN

## Kurzbefund

RubikonSymbolMarkers (✅ links / ❓ rechts der blauen Rubikon-Linie) ist über eine kleine, opt-in-fähige Erweiterung von `FwChartTextPlugin.js` gebaut (Variante B). Statt einer eigenen Zeitberechnung nutzt die neue Positionierung dieselbe Referenz wie `FwVerticalLinePlugin` (`chart.getDatasetMeta(0)`, letzter Datenpunkt), wodurch die Symbole strukturgarantiert exakt an der blauen Linie sitzen — unabhängig vom X-Skalentyp. Kein DOM, keine A11y-Semantik, keine Datenmutation, keine Timing-Änderung an Screen 4.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short` (vor Bau): ` M .claude/learning/session-log.md` (eigener SESSION-START-Eintrag, außerhalb AP-07-Scope, unverändert bereits vor Bau vorhanden)
- `git diff --name-status` (vor Bau): `M .claude/learning/session-log.md`
- `git log --oneline -8`: 4093808, 0f355f7, a735981, c633f82, ffacc13, a399b5f, eacdc0e, cba810e — lückenlose Kette, AP-06a–06d durch 0f355f7 abgedeckt

Keine unerwarteten Änderungen an Code-/Plugin-/Spec-/QA-Dateien vorgefunden. AP-06-Doku war bereits committed (0f355f7) — kein Vermischungsrisiko.

## Gelesene Pflichtquellen

- `Apps/prokrastinations-preis/APP_SPEC.md` §16.1a, §16.3 (via spec-scout-Dispatch)
- `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` Beat 2, Responsive-Regel (via spec-scout-Dispatch)
- `Apps/prokrastinations-preis/QA_TEST_CASES.md` TC-F05 wörtlich (via spec-scout-Dispatch)
- `Apps/prokrastinations-preis/app.js` — direkt gelesen (Z. 60–104, 540–588)
- `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js` — direkt vollständig gelesen (vor und nach Änderung)
- `Theme/assets/js/fw-chart-engine/plugins/FwVerticalLinePlugin.js` — direkt vollständig gelesen
- `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` Z. 180–360 — direkt gelesen (Registrierungslogik `chartText`, Bestätigung: Top-Level-Key im `options`-Objekt, gleiche Ebene wie `features`/`xDisplayRange`)
- `Theme/assets/js/fw-chart-engine/strategies/LineChartStrategy.js` — Grep auf `datasets` (Bestätigung: Screen 4 ohne `annotations`-Option erzeugt genau ein Dataset, Index 0 = Preisreihe)
- `docs/steering/patches/AP-prokrast-06a_*` bis `06d_*` — via spec-scout-Dispatch (Produktentscheidung, Sollstand, Bau-Freigabe)

## Implementierungsentscheidung

- **Variante: B** — kleine opt-in-Erweiterung von `FwChartTextPlugin.js`
- **Begründung:** Bestehende `plotFraction`-Positionierung (Variante A) hätte eine eigene Monats-Bruchrechnung in `app.js` erfordert, um die x-Position der Linie nachzubilden. Das wäre eine zweite, potenziell divergierende Zeitberechnung gewesen (Risiko: X-Skalentyp/-verhalten von Chart.js war vorab nicht abschließend geklärt — siehe Full-Gate Advocatus Diaboli). Die neue `anchor:'lastPoint'`-Option liest stattdessen exakt denselben Pixel-Wert, den `FwVerticalLinePlugin` bereits für die Linie selbst verwendet (`chart.getDatasetMeta(0)`, letzter Punkt) — keine neue Berechnung, keine Divergenzmöglichkeit.
- **Warum kein DOM:** Anforderung ist rein visuelle Canvas-Zeichnung (APP_SPEC §16.1a, TC-F05); `FwChartTextPlugin.afterDraw` zeichnet ausschließlich über `ctx.fillText` auf den Canvas-Kontext, erzeugt keinerlei DOM-Knoten.
- **Warum keine Engine-Änderung:** `ChartEngine.js` registriert `FwChartTextPlugin` bereits bedingt bei `chartText.enabled` (Z. 342–348, seit AP-prokrast-03d) — kein Anpassungsbedarf.
- **Warum keine Datenänderung:** Es wird kein neues Dataset, kein Zukunftspunkt und keine Mutation von `chartSeries`/`msciData` eingeführt. Die Marker lesen nur die bereits von Chart.js berechnete Pixel-Position des letzten echten Datenpunkts.

## Geänderte Dateien

- Datei: `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js`
  - Änderung: Header-Doku erweitert (`anchor`-Feld dokumentiert); `_isValidAnnotation` akzeptiert Annotationen ohne `x`, wenn `anchor:'lastPoint'` gesetzt ist; neue Funktion `_resolveAnchorX(chart, a)` liest `chart.getDatasetMeta(anchorDatasetIndex).data[last].x`; `_drawAnnotation` nimmt vorab aufgelöste `anchorX` entgegen und nutzt sie statt `plotFraction`, wenn vorhanden; `afterDraw`-Schleife löst `anchorX` pro Annotation auf und überspringt defensiv, wenn das Dataset (noch) nicht bereit ist.
  - Warum im Scope: einzige laut Auftrag erlaubte Engine-Datei; Erweiterung ist additiv und opt-in.
  - Risiko: gering — bestehende Annotationen ohne `anchor`-Feld durchlaufen exakt denselben Code-Pfad wie vorher (`anchorX === null` → `plotFraction`-Zweig), keine Verhaltensänderung am Default-Pfad.
  - nach Write wiedergelesen: ja, vollständige Datei (136 Zeilen), Verhalten wie beschrieben bestätigt.

- Datei: `Apps/prokrastinations-preis/app.js`
  - Änderung: `renderScreen4Chart()` erhält neuen `chartText`-Konfigurationsblock mit zwei Annotationen (✅ `anchor:'lastPoint', offsetX:-14, y:0.08, align:'right'`; ❓ `anchor:'lastPoint', offsetX:14, y:0.08, align:'left'`); veralteter Kommentar „Kein Canvas-Text mehr (FwChartTextPlugin bleibt ungenutzt)" korrigiert, da er durch diese Änderung falsch geworden wäre.
  - Warum im Scope: einzige laut Auftrag erlaubte App-Datei; Kommentarkorrektur ist notwendige Folgeänderung (Surgical-Check), kein kosmetischer Eingriff.
  - Risiko: gering — `chartText` ist ein neuer, additiver Options-Key; bestehende Screen-2/3/4-Konfiguration (`features`, `xDisplayRange`, `annotations`) unverändert.
  - nach Write wiedergelesen: ja, Z. 550–588, Inhalt wie beschrieben bestätigt.

## Nicht geändert

- APP_SPEC.md: nicht geändert (nur gelesen)
- Drehbuch: nicht geändert (nur gelesen)
- QA_TEST_CASES.md: nicht geändert (nur gelesen)
- app.css: nicht geändert — nicht benötigt, da reine Canvas-Zeichnung
- FwVerticalLinePlugin.js: nicht geändert (nur gelesen, als Referenzmechanik genutzt)
- ChartEngine: nicht geändert (Registrierungslogik existierte bereits seit AP-prokrast-03d)
- Strategies: nicht geändert (nur LineChartStrategy.js per Grep gelesen)
- Stationsdaten: nicht geändert

## RubikonSymbolMarkers gegen Sollstand

| Pflicht | Erfüllt? | Beleg |
|---|---:|---|
| ✅ links der blauen Rubikon-Linie | ja | `offsetX:-14, align:'right'` relativ zu `anchor:'lastPoint'` (identischer Punkt wie die Linie) |
| ❓ rechts der blauen Rubikon-Linie | ja | `offsetX:14, align:'left'` relativ zu `anchor:'lastPoint'` |
| Canvas / Plugin, kein DOM | ja | `afterDraw` zeichnet nur via `ctx.fillText`, kein `document.createElement`/`innerHTML` |
| keine A11y-Pflicht / keine Live-Region / kein Fokus | ja | keine ARIA-Attribute, keine `aria-live`-Ausgabe, keine Tab-Order-Beteiligung — Canvas-Inhalt ist strukturell nicht fokussierbar |
| keine Datenpunkte | ja | kein neues Dataset, `chartSeries` unverändert |
| keine Future-Line | ja | `xDisplayRange` unverändert, kein Zukunftsdatenpunkt |
| keine Prognose | ja | keine Werte, keine Berechnung von Zukunftsdaten |
| keine Interaktion / kein CTA | ja | keine Event-Listener am Plugin, CTA-Logik (`revealScreen4`) unverändert |
| S gewährleistet | strukturell ja, Browser-QA offen | Positionierung über `chartArea`/`getDatasetMeta` ist viewport-agnostisch; kein Live-Server-Test in diesem Nebenfaden durchgeführt |
| M gewährleistet | strukturell ja, Browser-QA offen | s.o. |
| L gewährleistet | strukturell ja, Browser-QA offen | s.o. |
| Screen 4 Timing unverändert | ja | `revealScreen4()` (Z. 574–588) nicht angefasst, Marker werden mit dem einzigen `renderScreen4Chart()`-Aufruf persistent gezeichnet, keine eigene Beat-Logik ergänzt |
| Screen 1–3 unverändert | ja | keine Änderung außerhalb `renderScreen4Chart()` |

## TC-F05

- Fundstelle TC-F05: `Apps/prokrastinations-preis/QA_TEST_CASES.md` Z. 659–683 (laut spec-scout-Dispatch)
- Anforderungen: ✅ links/❓ rechts der blauen Linie auf S/M/L sichtbar und korrekt positioniert; reine Canvas-Zeichnung ohne DOM-Knoten, ohne Accessibility-Tree-Eintrag, ohne Live-Region-Aktualisierung; rechter Zukunftsraum bleibt frei von Datenpunkten/Linie/Prognose (TC-F01); DOM-Haupttext (TC-F03) bleibt einzige semantische Schicht
- Umsetzung: `chartText`-Konfiguration in `renderScreen4Chart()` + `anchor:'lastPoint'`-Erweiterung in `FwChartTextPlugin.js`
- Prüfbefund: statisch bestätigt — Code-Pfad erzeugt nachweislich keinen DOM-Knoten (nur `ctx.fillText`), keine Datenmutation (`chartSeries`/`xDisplayRange` unverändert), Positionsmechanik strukturell identisch zur bestehenden, bereits produktiv genutzten `FwVerticalLinePlugin`-Referenz
- offen/nicht prüfbar: Browser-QA (visuelle Kontrolle auf echten S/M/L-Viewports, DOM-Inspektor-Check, Screenreader-Check) wurde in diesem Nebenfaden nicht durchgeführt — dieser AP hatte keinen Live-Server-Zugriff im Scope. Empfehlung: TC-F05 in AP-prokrast-07b oder durch Albert im lokalen Live-Server final abnehmen.

## Datenwahrheit

- Datenquelle unverändert: ja (`appData.msciData`, `chartSeries` unangetastet)
- keine Zukunftsdaten: ja
- keine Dummy-Datasets: ja
- keine Future-Line: ja
- keine Prognose: ja

## Risiken

- Feinjustierung von `offsetX` (±14px) und `y` (0.08) ist eine UX-Schätzung ohne vorgegebene Pixel-/Prozentwerte (laut Vorgänger-APs bewusst offengelassene UX-Detailfrage). Mögliche Nachjustierung nach visueller Kontrolle durch Albert.
- Bei sehr schmalen Viewports (S) könnte der feste Pixel-Offset (±14px) bei extrem kleiner `chartArea.width` relativ groß wirken — nicht browser-getestet.

## Offene Punkte

- Code: keine
- UX: exakte Symbolgröße/-abstand ggf. nach visueller Kontrolle nachjustieren (`offsetX`, `y`, ggf. `fontSize` in der Annotation ergänzen)
- CSS: keine Änderung nötig, keine offen
- Mobile: Browser-QA auf S-Viewport offen
- Test: `app.test.html` Szenario AF nicht erneut ausgeführt (nur statisch geprüft, dass bestehender Code-Pfad bei fehlendem `anchor`-Feld unverändert bleibt) — Live-Nachprüfung empfohlen
- Reduced Motion: nicht betroffen, da Plugin keine Animation enthält (V1-Vertrag unverändert)
- Backlog: AP-26 kann nach Browser-Bestätigung auf „erledigt" gesetzt werden

## Empfehlung

- nächster interner AP: AP-prokrast-07b — Abschluss-QA Claims-vs-Files / TC-F05 (read-only)
- ausdrücklich nicht: Commit, Abschlussritual, Card-to-Point, A11y-/Fokus-/Live-Region-Bau, Screen-4-Timing-Änderung
