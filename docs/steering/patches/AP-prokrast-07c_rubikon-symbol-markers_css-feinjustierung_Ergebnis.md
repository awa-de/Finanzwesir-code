# AP-prokrast-07c — RubikonSymbolMarkers CSS-Feinjustierung Ergebnis

## Haupt-AP

AP-prokrast-07 — Bau RubikonSymbolMarkers über FwChartTextPlugin.js

## Status

GELB

## Kettenposition

- AP-prokrast-07a: Bau RubikonSymbolMarkers (Canvas-Marker ✅/❓), Status GRÜN. Protokoll: `docs/steering/patches/AP-prokrast-07a_rubikon-symbol-markers_implementierung_Ergebnis.md`
- AP-prokrast-07b: reserviert für separate read-only Abschluss-QA Claims-vs-Files / TC-F05 — **in diesem Faden nicht durchgeführt**, weiterhin offen.
- AP-prokrast-07c: dieser AP — Albert hat Screen 4 nach AP-07a manuell im Live-Server getestet und zwei reale Layout-Defekte am DOM-Textblock (`.fw-app__rubikon-text`) gefunden: Kollision mit dem "?" auf Viewport S, und fehlende horizontale Fluchtlinie zwischen Textblock und "?" auf allen Breiten. Dieser AP behebt beides über CSS-Feinjustierung, kein Rücklauf an den Masterfaden (dafür fehlt noch AP-07b).

## Ursprüngliches Ziel dieses Unter-APs

Zwei von Albert beim manuellen Test gemeldete visuelle Defekte an `Apps/prokrastinations-preis/app.css` beheben:
1. Screen S: "D" von "Die nächsten…" kollidiert mit dem Punkt des "?"-Markers.
2. Alle Screens: Textblock und "?"-Marker haben keine gemeinsame linke Fluchtlinie.

## Vorgehen

Kein rechnerisch-einmaliger Fix möglich, weil die Canvas-Marker-Position (Chart.js-Pixelkoordinate, `chart.getDatasetMeta(0)`) und die DOM-Text-Position (CSS `left`/`top` in Prozent relativ zum Wrapper) zwei unabhängige Koordinatenräume sind, die laut `APP-INTERFACE.md` §4 nicht zur Laufzeit im App-Code verknüpft werden dürfen (App-Layer darf keine Chart.js-Pixelinternals lesen). Stattdessen: neu geschriebenes DevTools-Konsolen-Diagnoseskript (`tools/rubikon-symbol-markers-diagnose.js`) misst pro Breakpoint die reale Abweichung zwischen "?"-Kante und Textkante und schlägt einen korrigierten CSS-Custom-Property-Wert vor. Mehrere Messrunden mit Albert (S/M/L einzeln), da die erste rein rechnerische Schätzung (aus `chartArea`/Wrap-Rect ohne reale Messung) eine kleine, aber sichtbare Restabweichung (2–7px, vermutlich Font-Rendering-Unterschiede zwischen Canvas-`sans-serif` und DOM-Font) hatte.

Zusätzlicher Befund während der Messrunden: `M` (768–820px) und `L` (1433px) benötigten unterschiedliche `--fw-rubikon-text-left`-Werte, obwohl sie sich bisher eine gemeinsame Basisregel teilten — ein einzelner Wert konnte beide Breiten nicht gleichzeitig treffen. Deshalb wurde ein dritter Breakpoint (`M`) eingeführt.

## Geänderte Dateien

| Datei | Änderung | Risiko | Nach Write bestätigt |
|---|---|---|---|
| `Apps/prokrastinations-preis/app.css` | `--fw-rubikon-text-top`/`--fw-rubikon-text-left` in Basisregel (jetzt nur noch L, >1024px) und S-Media-Query (≤480px) angepasst; neue Media-Query `(min-width:481px) and (max-width:1024px)` für M ergänzt | niedrig — reine Wertänderung + eine zusätzliche, klar abgegrenzte Media-Query; keine Struktur-/Selektor-Änderung an bestehenden Regeln | ja, nach jeder Einzeländerung erneut gelesen |
| `tools/rubikon-symbol-markers-diagnose.js` | neu — DevTools-Diagnoseskript, kein Bestandteil des Build/Runtime-Codes | keins — reines Diagnosewerkzeug, wird nicht ausgeliefert/eingebunden | ja |
| `docs/steering/patches/AP-prokrast-07c_..._Ergebnis.md` | neu (dieses Protokoll) | — | wird nach Write geprüft |

## Finale Werte

| Breakpoint | Bereich | `--fw-rubikon-text-left` | `--fw-rubikon-text-top` |
|---|---|---|---|
| S | ≤480px | 66,2% | 14,8% |
| M (neu) | 481–1024px | 56,3% | 14,9% |
| L (Basisregel) | ≥1025px | 55,2% | 14,9% |

Albert-Rückmeldung nach Anwendung: S und L "fertig". M zuletzt "besser, noch ein paar Pixel nach rechts" — **letzte Nachjustierung von M (56,3% → minimal höher) wurde in diesem Faden nicht mehr umgesetzt**, siehe Offene Punkte.

## Nicht geändert

- `Apps/prokrastinations-preis/app.js`: nicht angefasst in diesem AP
- `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js`: nicht angefasst in diesem AP
- `APP_SPEC.md`, Drehbuch, `QA_TEST_CASES.md`: nicht angefasst
- Engine-Dateien, andere Plugins, Strategies, Stationsdaten: nicht angefasst

## Wichtiger Befund — Font-Vorbehalt

Weder der DOM-Textblock noch der Canvas-"?"-Marker nutzen aktuell die offiziellen CI-Fonts:

- DOM (`app.css`): `font-family: var(--fw-font-base, sans-serif)` — `--fw-font-base` ist nirgendwo im Theme definiert (`screen.css` `:root` enthält nur Farb-Tokens), es greift der Fallback `sans-serif` (Browser-Default).
- Canvas (`FwChartTextPlugin.js`): `ctx.font = ... + 'px sans-serif'` — hartkodiert, kein `fontFamily`-Konfigurationsfeld im Plugin vorhanden.
- Die echten CI-Fonts ('Source Sans Pro', 'Archivo Black') sind im Theme bereits per `@font-face` geladen und andernorts im Theme genutzt (`screen.css`), aber noch nicht an diese App angebunden — passt zur bekannten offenen Theme-Bridge-Lücke (Backlog DS-012/DS-013).

**Konsequenz:** Sobald `--fw-font-base` real gesetzt wird oder das Plugin eine Font-Option erhält, ändern sich die Zeichenbreiten/Kerning beider Elemente — die in diesem AP gemessenen Prozentwerte werden dann mit hoher Wahrscheinlichkeit erneut abweichen und müssen neu gemessen werden. Albert wurde dies mitgeteilt; auf seinen Wunsch wurde die Feinjustierung an dieser Stelle bewusst nicht weiter verfeinert.

## Offene Punkte

- **M-Feinjustierung:** letzte Albert-Rückmeldung ("noch ein paar Pixel nach rechts") wurde nicht mehr umgesetzt — `--fw-rubikon-text-left` für M steht aktuell bei 56,3%, vermutlich minimal zu niedrig.
- **Font-Anbindung:** `--fw-font-base` ist nicht definiert (Theme-Bridge fehlt, Backlog DS-012/DS-013). Sobald das behoben ist: komplette Neumessung von S/M/L mit `tools/rubikon-symbol-markers-diagnose.js` erforderlich, sowohl für den DOM-Text als auch — falls das Plugin dann eine Font-Option bekommt — für den Canvas-Marker.
- **AP-prokrast-07b (Abschluss-QA Claims-vs-Files / TC-F05):** weiterhin nicht durchgeführt. TC-F05 wurde in diesem Faden nicht formal gegen die reale Implementierung geprüft (nur die hier behobenen Layout-Defekte wurden visuell von Albert bestätigt).
- Kein Commit in diesem Faden ausgeführt.
- Kein Abschlussritual vor diesem Protokoll ausgeführt — wird im Anschluss separat angestoßen.

## Empfehlung des Nebenfadens

- Nächster sinnvoller Schritt: **AP-prokrast-07d** (oder direkt bei der Font-Anbindung mitlaufen lassen) — M-Feinjustierung nachziehen, sobald wieder ein Live-Server-Test möglich ist.
- Vor einer finalen Rücklaufkapsel an den Masterfaden fehlen noch: AP-prokrast-07b (formale QA) und die Font-Anbindung (danach zwingend Neumessung).
- Ausdrücklich nicht: TC-F05 als „bestanden" vermerken, solange AP-07b nicht gelaufen ist.
