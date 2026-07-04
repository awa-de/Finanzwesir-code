# AP-prokrast-06b — Regression-Sync ✅/❓ als Chart-Marker Ergebnis

## Status

GRÜN

## Kurzbefund

`FwChartTextPlugin.js` existiert und passt technisch exakt zum Auftrag: opt-in, persistent, keine Animation/Events/DOM-Brücke, Positionierung ausschließlich per `plotFraction` relativ zu `chart.chartArea` (also anteilig, nicht in Absolutpixeln — dadurch auf S/M/L grundsätzlich tragfähig). `APP_SPEC.md` (§16.1a + UI-Primitive-Liste), das Drehbuch (Beat 2, Responsive-Tabelle, Implementierungs-Notizen) und `QA_TEST_CASES.md` (neuer TC-F05) sind minimal synchronisiert: ✅ links / ❓ rechts der blauen Rubikon-Linie sind wieder aktives Soll, als reiner Canvas-Chart-Marker ohne DOM-/A11y-Anspruch, S/M/L-Pflicht dokumentiert, `FwChartTextPlugin.js` als technischer Baustein genannt. Gebaut wurde nichts — dieser AP ist reiner Doku-Sync.

**Wichtige Einordnung (siehe unten, „Regressionseinordnung"):** Dies ist kein Wiederherstellen eines vorher schon final entschiedenen, dann verlorenen Fakts. Die gelesenen Quellen (AP-04a bis AP-06a) dokumentieren die ✅/❓-Symbolik durchgängig als offene, nie entschiedene Produktfrage; AP-06a selbst kam zu Status GELB mit Empfehlung „streichen". Was diesem AP zugrunde liegt, ist eine neue, bindende Nutzerentscheidung von Albert nach AP-06a, die die GELB-Empfehlung überschreibt. Die Dokumente sprechen das jetzt entsprechend explizit aus, statt eine falsche „schon immer so entschieden"-Historie zu behaupten.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short` (vor dem Patch): ` M .claude/learning/session-log.md`, `?? Archiv/Chroniken/chronist-v1/CHRONIK-2026-07-03-ap-prokrast-05-qa-test-cases.md`, `?? docs/steering/patches/AP-prokrast-06a_symbolik-beat2_entscheidung_Ergebnis.md` — alles bekannte, unabhängige Vorgänger-Artefakte dieser Sitzung, kein Blocker
- `git diff --name-status` (vor dem Patch): `M	.claude/learning/session-log.md`
- `git log --oneline -5`:
  ```
  a735981 docs(AP-prokrast-05a-05e): QA_TEST_CASES.md auf Rubikon-Endstand synchronisiert — CTA-Fokus-Lücke gefunden und geschlossen
  c633f82 docs(AP-prokrast-04a-04c): Soll-/Spec-Synchronisierung nach Rubikon-Entscheidung + Kettenabschluss
  ffacc13 feat(AP-prokrast-03f–03i): Screen 4 Rubikon-Reveal — von Morph-Animation zu stehendem Screen mit DOM-Overlay-Text
  a399b5f feat(AP-prokrast-03a-03e): FwChartTextPlugin.js — Rubikon-Zukunftsraum architektonisch geklärt und isoliertes Canvas-Text-Plugin gebaut
  eacdc0e docs(AP-prokrast-01–02e): prokrastinations-preis Drehbuch-Analyse abgeschlossen — Migrationsschnitt + unabhängige Abschluss-QA GRÜN
  ```
- AP-prokrast-06a-Ergebnisdatei: vorhanden (`docs/steering/patches/AP-prokrast-06a_symbolik-beat2_entscheidung_Ergebnis.md`), wie erwartet
- `FwChartTextPlugin.js`: vorhanden unter `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js`

## Regressionseinordnung

- **Datei-/Repo-Wahrheit aus AP-04 bis AP-06a:** Die ✅/❓-Symbolik war in allen gelesenen Quellen (Drehbuch Zeile 131–141/200, AP-prokrast-04a/04b/04c, AP-prokrast-05a–05e, AP-prokrast-06a) durchgängig als „offen, nie entschieden" bzw. „weder gebaut noch verworfen" dokumentiert — nie als final beschlossen und dann verlorengegangen. AP-06a kam eigenständig zu Status GELB mit Empfehlung Option B (streichen), Fallback D (parken).
- **Nutzer-/Produktentscheidung jetzt:** Albert hat nach AP-06a klargestellt, dass ✅ links und ❓ rechts der blauen Rubikon-Linie fachlich gesetzt sind und spec-konform in `APP_SPEC.md`, Drehbuch und `QA_TEST_CASES.md` wieder aufgenommen werden müssen — als rein visueller Canvas-Chart-Marker über `FwChartTextPlugin.js`, ohne DOM- und ohne A11y-Anspruch.
- **Einordnung:** Dies wird in allen drei Dokumenten als **„Korrektur durch bindende Nutzerentscheidung nach AP-06a-GELB"** benannt, nicht als „quellenbelegt schon immer final entschieden". Aus Nutzer-/Produktsicht mag es sich wie eine Regression anfühlen („die Symbole sollten immer da sein"); aus der Datei-Historie ist es eine neue, bindende Entscheidung, die eine bis dahin offene Frage schließt.
- **Warum spec-konform:** Nach dieser Entscheidung ist die Aufnahme in `APP_SPEC.md` §16.1a und die UI-Primitive-Liste die korrekte Handlung, weil `APP_SPEC.md` laut CLAUDE.md „Spec schlägt Code" die führende, bindende Quelle für den Sollstand ist — ein bindend entschiedenes Produktelement muss dort stehen, unabhängig davon, ob es vorher offen war.

## Gelesene Pflichtquellen

- `Apps/prokrastinations-preis/APP_SPEC.md` — §16.1a (Zeile 1250–1274 vor Patch), §16.3 UI-Primitive-Liste (Zeile 1330–1352 vor Patch)
- `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` — vollständig, insb. Beat 2 (Zeile 131–141), Responsive-Tabelle (Zeile 170–179), „Was nicht gebaut wird" (Zeile 183–189), Implementierungs-Notizen (Zeile 193–203)
- `Apps/prokrastinations-preis/QA_TEST_CASES.md` — Gruppe F vollständig (TC-F01–TC-F04), Testfall-Format-Template (Zeile 37–64), Testgruppen-Übersicht (Zeile 17–34)
- `docs/steering/patches/AP-prokrast-06a_symbolik-beat2_entscheidung_Ergebnis.md` — vollständig (bereits im Kontext dieser Sitzung geschrieben)
- `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js` — vollständig, read-only

## Optional gelesene Quellen

- keine — die Pflichtquellen (insb. AP-06a, das selbst bereits AP-04a–05e ausgewertet hatte) lieferten ausreichend Kontext für einen minimalen, zielgenauen Sync

## Geänderte Dateien

| Datei | Änderung | Warum nötig | Nach Write wiedergelesen |
|---|---|---|---|
| `Apps/prokrastinations-preis/APP_SPEC.md` | §16.1a: neuer Absatz „Chart-Marker ✅/❓ (AP-prokrast-06b)"; §16.3: neue Zeile `RubikonSymbolMarkers` in UI-Primitive-Liste | Symbolik muss laut Nutzerentscheidung wieder aktives Soll in der führenden Spec sein | ja |
| `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` | Beat-2-Überschrift/Statusblock umformuliert (gesetzt statt offen); Responsive-Zeile ✅/❓ (kein DOM-Fallback mehr); Implementierungs-Notizen-Zeile ✅/❓ (gesetzt statt offen) | Drehbuch darf die Symbole nicht mehr als offen/ungeklärt behandeln; alter Mobile-Textkarten-Fallback widersprach „kein DOM" | ja |
| `Apps/prokrastinations-preis/QA_TEST_CASES.md` | neuer Testfall TC-F05 nach TC-F04, vor Gruppe G | S/M/L-Sichtbarkeit und Nicht-DOM/Nicht-A11y-Charakter der Symbole müssen testbar sein | ja |
| `docs/steering/patches/AP-prokrast-06b_regression-sync_symbolik-chartmarker_Ergebnis.md` | neu angelegt (dieses Protokoll) | Pflicht-Ergebnisprotokoll dieses APs | ja |

## APP_SPEC-Sync

- Screen-4-Sollstand ergänzt: ja — neuer Absatz direkt nach dem Reveal-Timing, vor „Nachgelagerte Pflichtteile" (§16.1a)
- UI-Primitive ergänzt: ja — `RubikonSymbolMarkers` zwischen Rubikon-Text und PrimaryCta eingefügt, Status „⏳ Soll gesetzt (AP-prokrast-06b), Bau offen"
- `FwChartTextPlugin.js` als technischer Baustein genannt: ja, in beiden Stellen
- Nicht-DOM/Nicht-A11y klargestellt: ja — explizit „kein DOM-Inhalt, keine Live-Region-Aktualisierung und keine A11y-Anforderung"
- Keine Zukunftsdaten/Future-Line/Prognose bestätigt: ja — explizit im neuen Absatz ausgeschlossen

## Drehbuch-Sync

- Beat-2-Symbolik wieder gesetzt: ja — Überschrift und Statusblock umformuliert, Historie (AP-04a–06a: offen, GELB) bleibt korrekt erwähnt
- Stellung links/rechts der blauen Linie geklärt: ja
- S/M/L geklärt: ja — sowohl im Statusblock als auch in der Responsive-Tabelle, expliziter Ausschluss des alten Mobile-Textkarten-Fallbacks
- Keine A11y-/DOM-Pflicht: ja — „kein DOM-Knoten, keine aria-Semantik, kein Fokus, keine Live-Region"
- Keine Morph-/Future-Line-/Prognose-Rückkehr: ja — an diesen Stellen nichts geändert, Beat 1/3-Status unangetastet

## QA_TEST_CASES-Sync

- Testfall/Prüfpunkt ergänzt: ja — TC-F05
- S/M/L-Sichtbarkeit: ja — Schritt 1 und Erwartetes Ergebnis prüfen explizit alle drei Breakpoints
- `FwChartTextPlugin.js` / Chart-Symbolmechanismus: ja, im Hintergrund-Feld genannt
- Keine Zukunftsdaten/Future-Line/Prognose: ja — Schritt 5 grenzt explizit gegen TC-F01 ab
- Keine DOM-/A11y-Pflicht für Symbole: ja — Schritt 3/4 und Fehlschlag-Kriterien prüfen explizit auf Abwesenheit von DOM-Knoten/Accessibility-Tree-Eintrag

## Nicht geändert

- app.js: nicht angefasst
- app.css: nicht angefasst
- `FwChartTextPlugin.js`: nur gelesen, nicht geändert
- andere Engine-Dateien: nicht angefasst
- andere Plugin-Dateien: nicht angefasst
- Strategy-Dateien: nicht angefasst
- Stationsdaten: nicht angefasst
- BACKLOG: nicht angefasst (BACKLOG AP-26 bleibt beim Masterfaden zur Aktualisierung)
- Card-to-Point: nicht angefasst, nicht spezifiziert
- Screen-3-Timing: nicht angefasst
- CTA-Copy: nicht angefasst

## Wiederlesen nach Write

- APP_SPEC.md wiedergelesen: ja
- Drehbuch wiedergelesen: ja
- QA_TEST_CASES.md wiedergelesen: ja
- Ergebnisprotokoll wiedergelesen: ja
- Befund: Alle vier Dateien enthalten die erwarteten Formulierungen (Grep bestätigt: `✅/❓`, `RubikonSymbolMarkers`, `AP-prokrast-06b`, `TC-F05` an den vorgesehenen Stellen); Drehbuch enthält an den Symbolik-Stellen kein „offen"/„ungeklärt" mehr; keine der elf verbotenen Dateien wurde berührt

## Rest-/Folgepunkte

- BACKLOG AP-26 sollte durch den Masterfaden von „offen" auf „entschieden, Bau offen" umgestellt werden — außerhalb des erlaubten Scopes dieses APs
- Die Farbangabe „grün" für ✅ aus dem ursprünglichen Drehbuch-Wortlaut wurde in diesem AP nicht übernommen, weil der neue Auftrag keine Farbe mehr nennt; falls eine konkrete Farbe gewünscht ist, ist das eine offene redaktionelle Detailfrage für den Bau-AP, nicht für diesen Sync-AP
- Der Satz „Keine Erklärung, was die blaue Linie bedeutet — ✅ ❓ reichen" (Drehbuch, „Was nicht gebaut wird") wurde unverändert gelassen, da er eine engere Aussage (keine separate Linien-Erklärung) trifft, die durch diesen AP nicht berührt wird

## Empfehlung

- nächster interner AP: AP-prokrast-06c — Abschluss-QA Regression-Sync Entscheidung-vs-Files
- nächster Haupt-AP aus Sicht dieses Nebenfadens: Bau von `RubikonSymbolMarkers` über `FwChartTextPlugin.js` (sobald priorisiert), parallel bleiben Card-to-Point und Screen-3-Timing-Reveal offene Haupt-AP-Kandidaten
- ausdrücklich nicht: bauen, committen, Abschlussritual ausführen, nächsten Haupt-AP selbst starten
