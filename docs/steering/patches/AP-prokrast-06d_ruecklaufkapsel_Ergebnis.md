# AP-prokrast-06d — Rücklaufkapsel an den Masterfaden Ergebnis

## Haupt-AP

AP-prokrast-06 — Produktentscheidung / Regression-Sync ✅/❓-Symbolik Beat 2

## Status

GRÜN

## Abgenommen?

ja

## QA-Freigabe

- separater Abschluss-QA-AP durchgeführt: ja (AP-prokrast-06c)
- QA-Protokoll: `docs/steering/patches/AP-prokrast-06c_abschluss-qa_regression-sync_symbolik-chartmarker_Ergebnis.md`
- QA-Urteil: GRÜN — alle Claims aus AP-06b gegen reale Dateien bestätigt (APP_SPEC, Drehbuch, QA_TEST_CASES konsistent; `FwChartTextPlugin.js` unverändert/read-only; Diff-Check zeigt reine Additivität; keine verbotenen Dateien geändert; Restsatz „✅ ❓ reichen" im Drehbuch als nicht-blockierend bewertet)
- Rücklauf freigegeben: ja

## Ursprüngliches Ziel

Produktentscheidung zur ✅/❓-Symbolik aus Drehbuch Beat 2 klären.

## Tatsächlicher Endstand

Die ✅/❓-Symbolik ist als rein visueller Chart-Marker verbindlich gesetzt. `APP_SPEC.md` (§16.1a-Absatz + `RubikonSymbolMarkers` in der UI-Primitive-Liste), das Drehbuch (Beat 2, Responsive-Tabelle, Implementierungs-Notizen) und `QA_TEST_CASES.md` (neuer Testfall TC-F05) sind darauf synchronisiert. Gebaut wurde nichts — der Bau steht als eigener, künftiger Haupt-AP aus.

## Entscheidung

Gewählte Option:

```text
A — behalten und bauen
```

Präzisierung:

```text
✅ links der blauen Rubikon-Linie
❓ rechts der blauen Rubikon-Linie
als rein visuelle Chart-Marker
für S, M und L gewährleistet
späterer Bau über FwChartTextPlugin.js
kein DOM
keine A11y-Pflicht
keine Live-Region
kein Fokus
keine Datenpunkte
keine Future-Line
keine Prognose
keine Interaktion
kein CTA
```

## Interne Unter-APs

- AP-prokrast-06a: Status GELB. Datei-Historie (AP-04a–05e) zeigte die Symbolik durchgängig als offen/nie entschieden; eigene Empfehlung war Option B (streichen), Fallback D (parken). Danach stellte Albert die Produktentscheidung verbindlich klar (Option A, präzisiert als reiner Canvas-Marker).
- AP-prokrast-06b: Status GRÜN. Minimaler Doku-/Spec-Sync von `APP_SPEC.md`, Drehbuch und `QA_TEST_CASES.md` auf die bindende Entscheidung; Historie ehrlich als „Korrektur durch bindende Nutzerentscheidung nach AP-06a-GELB" dokumentiert, nicht als „schon immer so entschieden".
- AP-prokrast-06c: Status GRÜN. Unabhängige, read-only Abschluss-QA bestätigt alle AP-06b-Claims gegen reale Dateien; Rücklauf freigegeben.
- AP-prokrast-06d: dieser AP — reine Übergabe, keine neue fachliche Entscheidung, keine Reparatur.

## Geänderte Dateien

| Datei | Änderung | Risiko | Nach Write / QA bestätigt |
|---|---|---|---|
| `Apps/prokrastinations-preis/APP_SPEC.md` | §16.1a: neuer Absatz „Chart-Marker ✅/❓ (AP-prokrast-06b)"; §16.3: neue Zeile `RubikonSymbolMarkers` | niedrig — reine Additivität, 0 Löschungen (AP-06c bestätigt) | ja (AP-06b + AP-06c) |
| `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` | Beat-2-Überschrift/Statusblock, Responsive-Zeile, Implementierungs-Notiz-Zeile umformuliert | niedrig — genau 3 erwartete Ersetzungen, sonst unverändert (AP-06c bestätigt) | ja (AP-06b + AP-06c) |
| `Apps/prokrastinations-preis/QA_TEST_CASES.md` | neuer Testfall TC-F05 nach TC-F04 | niedrig — reine Additivität, TC-F01–F04 unangetastet (AP-06c bestätigt) | ja (AP-06b + AP-06c) |
| `docs/steering/patches/AP-prokrast-06a_symbolik-beat2_entscheidung_Ergebnis.md` | neu | — | ja |
| `docs/steering/patches/AP-prokrast-06b_regression-sync_symbolik-chartmarker_Ergebnis.md` | neu | — | ja |
| `docs/steering/patches/AP-prokrast-06c_abschluss-qa_regression-sync_symbolik-chartmarker_Ergebnis.md` | neu | — | ja |
| `docs/steering/patches/AP-prokrast-06d_ruecklaufkapsel_Ergebnis.md` | neu (dieses Protokoll) | — | wird nach Write dieses APs geprüft |

Bekannte unabhängige Meta-Dateien (nicht Teil des AP-06-Claims):
- `.claude/learning/session-log.md` (Session-Start-Eintrag dieser Sitzung)
- `Archiv/Chroniken/chronist-v1/CHRONIK-2026-07-03-ap-prokrast-05-qa-test-cases.md` (Chronik zu AP-05, bereits vor AP-06a per `/chronik-check` geprüft)

## Ergebnisprotokolle

- `docs/steering/patches/AP-prokrast-06a_symbolik-beat2_entscheidung_Ergebnis.md`
- `docs/steering/patches/AP-prokrast-06b_regression-sync_symbolik-chartmarker_Ergebnis.md`
- `docs/steering/patches/AP-prokrast-06c_abschluss-qa_regression-sync_symbolik-chartmarker_Ergebnis.md`
- `docs/steering/patches/AP-prokrast-06d_ruecklaufkapsel_Ergebnis.md`

## Nicht geändert

- app.js: nicht angefasst
- app.css: nicht angefasst
- FwChartTextPlugin.js: nur gelesen (AP-06b, AP-06c), nicht geändert
- andere Engine-Dateien: nicht angefasst
- andere Plugin-Dateien: nicht angefasst
- Strategies: nicht angefasst
- Stationsdaten: nicht angefasst
- BACKLOG: nicht angefasst — bleibt offener Punkt für den Masterfaden
- Card-to-Point: nicht angefasst, nicht spezifiziert
- Screen-3: nicht angefasst
- CTA-Copy: nicht angefasst

## Begründung

AP-06a startete als reiner Produktentscheidungs-AP und stützte sich ausschließlich auf die dokumentierte Datei-Historie (Drehbuch, APP_SPEC, QA_TEST_CASES, AP-04a–05e) — dort war die Symbolik durchgängig als offen markiert, weshalb die eigenständige Empfehlung auf Streichen fiel. Das ist kein Fehler von AP-06a, sondern der korrekte Umgang mit einer damals noch ungeklärten Quellenlage. Nach AP-06a hat Albert die Frage außerhalb der Datei-Historie verbindlich entschieden: Die Symbole bleiben, aber ausschließlich als rein dekorativer Canvas-Marker ohne DOM-/A11y-Anspruch — eine Variante, die die in AP-06a benannten Kernrisiken (Nudging durch die grüne ✅-Erfolgsfarbe wird in der neuen Formulierung nicht mehr festgeschrieben; A11y-Konflikt entfällt, weil kein A11y-Anspruch mehr erhoben wird) entschärft, ohne die DOM-Text-Architektur von Screen 4 anzutasten. AP-06b hat diesen Sollstand minimal und additiv in die drei führenden Dokumente übertragen; AP-06c hat das unabhängig bestätigt. Damit ist die Kette sauber und widerspruchsfrei abgeschlossen.

## Konsequenzen

- Für APP_SPEC: §16.1a und die UI-Primitive-Liste enthalten `RubikonSymbolMarkers` als gesetztes, aber noch ungebautes Soll-Element.
- Für Drehbuch: Beat 2 ist nicht mehr offen — spätere APs müssen die Symbolik nicht erneut mit Albert klären, nur noch bauen.
- Für QA_TEST_CASES.md: TC-F05 existiert bereits als Prüfgrundlage für den künftigen Bau-AP; keine weitere Testfall-Vorarbeit nötig, solange sich der Bau an die dokumentierten Grenzen hält.
- Für BACKLOG: AP-26 muss vom Masterfaden von „offen" auf „entschieden, Bau offen" umgestellt werden — außerhalb des Scopes dieser Unter-AP-Kette.
- Für Screen 4: bleibt in Aufbau, Timing und DOM-Text-Architektur unverändert; die Symbolik ist eine reine Zusatzschicht ohne Einfluss auf Reveal-Timing oder A11y-Vertrag.
- Für FwChartTextPlugin.js: bleibt unverändert; ist technisch bereits geeignet (`plotFraction`-Positionierung, keine DOM-Brücke) für den künftigen Bau, ohne selbst Änderungen zu benötigen.
- Für Card-to-Point: keine direkte Abhängigkeit dokumentiert; eine mögliche technische Verwandtschaft (Koordinaten-Overlay-Logik) wurde in AP-06a als eigene, quellenfreie Einschätzung vermerkt und sollte bei Bedarf im Card-to-Point-AP gegengeprüft werden.
- Für Screen-3 Timing: unberührt, unabhängiger offener Punkt.
- Für spätere APs: Der Bau-AP für `RubikonSymbolMarkers` kann direkt auf Basis von APP_SPEC §16.1a/§16.3, Drehbuch Beat 2 und QA_TEST_CASES TC-F05 aufsetzen, ohne erneute Produktklärung.

## Abweichung vom ursprünglichen Plan

Gering

Erläuterung:

```text
AP-06a behandelte ✅/❓ zunächst als offene Produktentscheidung und kam GELB heraus.
Danach stellte Albert die Produktentscheidung verbindlich klar.
AP-06b synchronisierte die Dokumente auf diesen Sollstand.
AP-06c bestätigte den Sync unabhängig gegen reale Dateien.
```

Die Abweichung ist gering, weil sie ausschließlich die Dokumentationsebene betrifft (Spec/Drehbuch/QA-Text) und keine Code-, Engine- oder Datenänderung nach sich zog. Der ursprüngliche Ablauf (Entscheidung → ggf. Sync → QA → Rücklauf) wurde eingehalten, nur mit einer zusätzlichen, vom Nutzer eingeschobenen Klärungsrunde zwischen AP-06a und AP-06b.

## Regressionsrisiko

Niedrig

Begründung:

Alle drei inhaltlichen Änderungen (APP_SPEC, Drehbuch, QA_TEST_CASES) sind laut AP-06c-Diff-Prüfung rein additiv oder auf exakt die drei erwarteten Symbolik-Stellen im Drehbuch begrenzt; keine bestehende Testabdeckung (TC-F01–F04), kein App-Code, keine Engine-/Plugin-/Strategy-Datei und keine Stationsdaten wurden berührt. Da nichts gebaut wurde, existiert noch kein Laufzeitverhalten, das regressieren könnte — das Risiko verschiebt sich vollständig auf den künftigen Bau-AP.

## Offene Punkte

- BACKLOG AP-26: muss vom Masterfaden auf „entschieden, Bau offen" nachgezogen werden — nicht im Scope von AP-06b/06c/06d.
- Bau RubikonSymbolMarkers: technischer Bau über `FwChartTextPlugin.js` steht vollständig aus.
- Farbe/optische Details: Das alte Drehbuch nannte ✅ „grün"; der neue, bindende Auftrag (AP-06b) nennt keine Farbe mehr. Offene redaktionelle Detailfrage für den Bau-AP.
- Card-to-Point: unverändert offen, unabhängiger Haupt-AP-Kandidat.
- Screen-3 Timing: unverändert offen, unabhängiger Haupt-AP-Kandidat.
- CTA-Copy: unverändert offen (redaktionell zu bestätigen, siehe APP_SPEC §21/§16.2), nicht Teil dieser Kette.
- Screenreader-Praxistest: für die Symbolik nicht erforderlich (kein A11y-Anspruch); für den bereits umgesetzten DOM-Haupttext weiterhin als „DOM-/Fokus-Mini-QA, kein Screenreader-Volltest" dokumentiert (AP-05-Kette).
- Code: kein Code existiert bisher für `RubikonSymbolMarkers` — vollständig offen.
- UX: Positionierungsdetails (exakter Versatz zur Linie, Größe) sind für den Bau-AP zu konkretisieren.
- CSS: nicht betroffen, da reine Canvas-Zeichnung ohne DOM/CSS-Beteiligung.
- Daten: keine Datenänderung nötig oder erfolgt.
- Test: TC-F05 liegt vor, aber noch nicht gegen eine reale Implementierung gelaufen (kann erst nach dem Bau ausgeführt werden).
- Mobile: S/M/L-Pflicht ist dokumentiert, aber noch nicht implementiert oder visuell verifiziert.
- Reduced Motion: nicht gesondert behandelt — die Symbole sind laut Spec nicht animiert (persistente Annotation), daher vermutlich ohne Reduced-Motion-Sonderfall, aber noch nicht explizit im Bau-AP bestätigt.

## Empfehlung des Nebenfadens

- Nächster sinnvoller Haupt-AP: AP-prokrast-07 — Bau `RubikonSymbolMarkers` über `FwChartTextPlugin.js`. Kernauftrag: `FwChartTextPlugin.js` platziert ✅ links und ❓ rechts der blauen Rubikon-Linie im Chart; S/M/L muss gewährleistet sein; kein DOM; keine A11y-Pflicht; keine Zukunftsdaten; keine Future-Line; keine Prognose; keine Card-to-Point-Arbeit; keine Screen-3-Arbeit.
- Warum: Die Produktentscheidung ist getroffen und spec-/drehbuch-/QA-seitig vollständig abgesichert (AP-06a–06c); es gibt keinen fachlichen Klärungsbedarf mehr, nur noch Bauaufwand. Ein Verschieben auf Card-to-Point oder Screen-3-Timing wäre möglich, aber die Symbolik ist der kleinste, am klarsten spezifizierte offene Baustein dieser drei Kandidaten.
- Ausdrücklich nicht nächster AP: ein erneuter Produktentscheid zur Symbolik; Streichen/Ersetzen/Parken der Symbole (das ist entschieden); Card-to-Point oder Screen-3-Timing, falls der Masterfaden zuerst die Symbolik bauen lassen will — das entscheidet aber der Masterfaden, nicht dieser Nebenfaden.

## Anschlussbedingung

Der nächste Haupt-AP darf erst erstellt werden, wenn dieser Rücklauf im Masterfaden ausgewertet wurde.
