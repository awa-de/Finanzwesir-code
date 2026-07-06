# AP-prokrast-07d — QA-Nachtrag und Rücklaufkapsel Ergebnis

## Status

GRÜN

## Kurzbefund

Die beiden GELB-tragenden Punkte aus AP-prokrast-07b sind durch Alberts nachträgliche Entscheidung und Prüfung aufgelöst: M-Breakpoint ist unter dem aktuellen Fallback-Font-Stand bewusst abgenommen (Feinjustierung erst nach CI-Font-Anbindung sinnvoll), und der formale DOM-/Accessibility-Tree-Check wurde von Albert durchgeführt (kein DOM-Treffer, kein Accessibility-Tree-Eintrag, keine Live-Region-Aktualisierung für ✅/❓). Seit AP-07b sind keine neuen Datei-Änderungen entstanden (`git diff --name-status` identisch). TC-F05 gilt für den aktuellen Font-Stand als bestanden. AP-prokrast-07 wird als GRÜN mit einem dokumentierten Folgeauftrag (Neumessung nach CI-Font-Anbindung) an den Masterfaden zurückgegeben.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short`: identische 9 geänderte + 4 neue Dateien wie bei AP-07b, plus die neue `AP-prokrast-07b_*_Ergebnis.md` (jetzt nicht mehr `??`, da bereits Teil des vorherigen Stands)
- `git diff --name-status`: keine Abweichung zu AP-07b — keine neuen Code-/Spec-/QA-Änderungen seit dem letzten QA-Pass
- `git log --oneline -8`: unverändert, letzter Commit weiterhin `4093808`, AP-prokrast-07a–07d nicht enthalten

## Anlass dieses Nachtrags

- **AP-07b-Status:** GELB — zwei offene Punkte: (1) M-Breakpoint als nicht final gewertet, (2) formaler DOM-/Accessibility-Tree-Check nicht dokumentiert.
- **Neue Albert-Entscheidung zu M:** M ist unter dem aktuellen Fallback-Font-Stand gut genug; weitere Pixel-Feinjustierung lohnt sich erst nach Anbindung der echten CI-Fonts, da die Messwerte dann ohnehin neu ermittelt werden müssen. Kein AP-07-Blocker mehr, sondern ein terminierter Folgeauftrag.
- **Neuer Albert-DOM-/Accessibility-Check:** Screen 4 in DevTools geöffnet — Elements-Suche nach ✅/❓ ohne Treffer, Accessibility-Pane zeigt keinen zugänglichen Namen mit ✅/❓, keine Live-Region-Aktualisierung durch die Symbole.
- **Konsequenz:** Beide GELB-Gründe aus AP-07b sind durch reale Nutzerentscheidung bzw. reale Prüfung aufgelöst. AP-07b war zum damaligen Prüfstand korrekt GELB — kein Fehlurteil, sondern ein zwischenzeitlich durch neue Fakten überholter Befund.

## Geprüfte Quellen

- `docs/steering/patches/AP-prokrast-07a_rubikon-symbol-markers_implementierung_Ergebnis.md` — erneut gelesen
- `docs/steering/patches/AP-prokrast-07c_rubikon-symbol-markers_css-feinjustierung_Ergebnis.md` — erneut gelesen
- `docs/steering/patches/AP-prokrast-07b_abschluss-qa_claims-vs-files_tc-f05_Ergebnis.md` — erneut gelesen (eigenes Vorgänger-Protokoll dieser Kette)
- `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js` — Stand identisch zu AP-07b-Prüfung (kein neuer Diff)
- `Theme/assets/js/fw-chart-engine/plugins/FwVerticalLinePlugin.js` — Stand identisch
- `Apps/prokrastinations-preis/app.js` — Stand identisch (`chartText`-Block Z. 564–570 unverändert)
- `Apps/prokrastinations-preis/app.css` — Stand identisch (M-Regel weiterhin 56.3%, jetzt bewusst als „gut genug" abgenommen statt als offen gewertet)
- `tools/rubikon-symbol-markers-diagnose.js` — vorhanden, unverändert, weiterhin nicht in Build/Runtime eingebunden (`git diff --name-status` zeigt keine neuen Referenzen)
- `docs/steering/BACKLOG.md`, `PROJECT-STATUS.md`, `NAVIGATION.md` — Stand identisch zu AP-07b-Prüfung, tragen den Font-Folgeauftrag bereits

Kein Delta zu AP-07b in den technischen Dateien — die Neubewertung beruht ausschließlich auf Alberts zwei neuen Entscheidungen/Befunden, nicht auf neuen Code-Änderungen.

## Nachtragsbewertung AP-07b

| Früherer GELB-Punkt | Neuer Befund | Konsequenz |
|---|---|---|
| M-Breakpoint offen (56.3%, Albert wollte „noch etwas nach rechts") | Albert nimmt M unter aktuellem Fallback-Font-Stand bewusst ab — weitere Pixel-Feinjustierung erst nach CI-Font-Anbindung sinnvoll, da Messwerte sonst zweimal ermittelt werden müssten | kein AP-07-Blocker mehr — terminierter Folgeauftrag statt offener Mangel |
| DOM-/Accessibility-Tree-Schritt (TC-F05 Schritt 3/4) nicht dokumentiert | Albert hat DevTools Elements + Accessibility-Pane geprüft: kein DOM-Treffer für ✅/❓, kein zugänglicher Name am Canvas/Chart, keine Live-Region-Aktualisierung | TC-F05-Schritt 3/4 bestanden, manuell durch Albert bestätigt |

## TC-F05 final

| TC-F05-Anforderung | Status | Beleg |
|---|---:|---|
| ✅ links der Rubikon-Linie | bestanden | `anchor:'lastPoint', offsetX:-14, align:'right'` (statisch), visuell von Albert bestätigt |
| ❓ rechts der Rubikon-Linie | bestanden | `anchor:'lastPoint', offsetX:14, align:'left'` (statisch), visuell von Albert bestätigt |
| S gewährleistet | bestanden | Albert im Live-Server bestätigt (AP-07c) |
| M gewährleistet | bestanden — für aktuellen Font-Stand bewusst abgenommen | Albert-Entscheidung dieses Nachtrags; Folgeauftrag nach CI-Font-Anbindung dokumentiert |
| L gewährleistet | bestanden | Albert im Live-Server bestätigt (AP-07c) |
| visuell-only / Canvas | bestanden | `_drawAnnotation` zeichnet nur via `ctx.fillText`, keine DOM-API (AP-07b verifiziert) |
| kein DOM | bestanden, jetzt auch manuell bestätigt | Code-Grep (AP-07b) + Alberts DevTools-Elements-Check (dieser AP) |
| kein Accessibility-Tree-Eintrag | bestanden, manuell bestätigt | Alberts Accessibility-Pane-Check: kein zugänglicher Name mit ✅/❓ |
| keine Live-Region-Aktualisierung | bestanden, manuell bestätigt | Alberts Check: keine Live-Region-Aktualisierung durch die Symbole |
| kein Fokus | statisch bestätigt | kein `tabindex`/`focus()` im Plugin (AP-07b-Grep), kein expliziter Fokus-Test durchgeführt, aber Canvas-Inhalt ist strukturell nicht fokussierbar |
| keine Zukunftsdaten | bestanden | keine neuen Datasets (AP-07b verifiziert) |
| keine Future-Line | bestanden | `xDisplayRange` unverändert |
| keine Prognose | bestanden | kein neuer Prognose-Code |
| DOM-Haupttext bleibt semantische Schicht | bestanden | `rubikonText`/`revealScreen4()` unverändert |
| Folgeauftrag nach CI-Font-Anbindung | dokumentiert, kein AP-07-Blocker | in BACKLOG/PROJECT-STATUS/NAVIGATION/MEMORY verankert (AP-07b bereits bestätigt) |

**Gesamturteil TC-F05: bestanden — für den aktuellen Font-Stand.** Einschränkung bewusst dokumentiert, kein Screenreader-Volltest behauptet (nur DevTools-Accessibility-Pane, kein tatsächlicher Screenreader wie NVDA/VoiceOver eingesetzt) — das bleibt ein separater, nicht AP-07-blockierender Punkt (bereits in der AP-05-Kette als offen dokumentiert).

## Datenwahrheit

- Datenquelle unverändert: bestätigt (kein neuer Diff seit AP-07b)
- keine Zukunftsdaten: bestätigt
- keine Dummy-Datasets: bestätigt
- keine Future-Line: bestätigt
- keine Prognose: bestätigt

## Scope- und Regressionseinschätzung

- `FwChartTextPlugin.js`: unverändert seit AP-07b, additive `anchor:'lastPoint'`-Erweiterung bestätigt
- `app.js`: unverändert seit AP-07b, `chartText` nur in `renderScreen4Chart()`
- `app.css`: unverändert seit AP-07b (M-Wert 56.3% bleibt stehen, jetzt bewusst statt offen)
- Diagnose-Skript: unverändert, weiterhin nicht in Build/Runtime eingebunden
- Steering-/Memory-Dateien: unverändert seit AP-07b, keine neue Scope-Ausweitung
- Screen 1–3: nicht berührt
- Screen-4-Timing: unverändert
- CTA: unverändert
- Reduced Motion: unverändert (Plugin ohne Animation)

## Font-Folgeauftrag

Nach oben zu tragen:

„Nach Anbindung der echten CI-Fonts / Theme-Bridge muss die Rubikon-Positionierung S/M/L mit `tools/rubikon-symbol-markers-diagnose.js` neu gemessen und ggf. feinjustiert werden."

- Bereits in BACKLOG dokumentiert: ja (AP-26-Zeile, Querverweis DS-012/DS-013)
- Bereits in PROJECT-STATUS dokumentiert: ja (HOOK-META, Nächster-Schritt-Feld)
- Bereits in NAVIGATION dokumentiert: ja (AP-prokrast-07a/07c-Zeile)
- Weitere Empfehlung: keine — Dokumentationslage vollständig, keine weitere Datei muss ergänzt werden. Bei Bau von DS-012/DS-013 (Theme-Bridge) sollte der Bau-AP explizit auf diesen Folgeauftrag verweisen.

## Rücklauf an den Masterfaden

### Haupt-AP

AP-prokrast-07 — Bau RubikonSymbolMarkers über FwChartTextPlugin.js

### Status

GRÜN

### Abgenommen?

ja

### QA-Freigabe

- separater Abschluss-QA-AP durchgeführt: ja (AP-prokrast-07b)
- QA-Nachtrag durchgeführt: ja (AP-prokrast-07d, dieser AP)
- QA-Urteil: GRÜN — beide ursprünglichen GELB-Gründe durch reale Nutzerentscheidung/-prüfung aufgelöst, keine neuen Blocker seit AP-07b
- Rücklauf freigegeben: ja

### Ursprüngliches Ziel

RubikonSymbolMarkers bauen: ✅ links und ❓ rechts der blauen Rubikon-Linie, rein visuell, über `FwChartTextPlugin.js`, ohne DOM/A11y/Datenwirkung.

### Tatsächlicher Endstand

RubikonSymbolMarkers ist gebaut, funktional korrekt (`anchor:'lastPoint'` nutzt dieselbe Chart.js-Pixelreferenz wie `FwVerticalLinePlugin`, keine Divergenzgefahr), visuell auf S/M/L abgenommen (M bewusst unter Fallback-Font-Stand statt pixelperfekt), formal DOM-/A11y-frei bestätigt. Einziger verbleibender Punkt ist ein terminierter, sauber dokumentierter Folgeauftrag nach Anbindung der offiziellen CI-Fonts.

### Interne Unter-APs

- AP-prokrast-07a: Implementierung, GRÜN
- AP-prokrast-07b: Abschluss-QA Claims-vs-Files/TC-F05, GELB (zum damaligen Prüfstand korrekt)
- AP-prokrast-07c: eingeschobene CSS-Feinjustierung, GELB → durch diesen Nachtrag GRÜN für aktuellen Font-Stand
- AP-prokrast-07d: dieser AP — QA-Nachtrag + Rücklaufkapsel, GRÜN

### Geänderte Dateien

| Datei | Änderung | Risiko | Nach Write / QA wiedergelesen |
|---|---|---|---|
| `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js` | additiv: `anchor:'lastPoint'`, `_resolveAnchorX()` | niedrig, Default-Pfad unverändert | ja (AP-07a + AP-07b) |
| `Apps/prokrastinations-preis/app.js` | `chartText`-Block in `renderScreen4Chart()` | niedrig, additiv | ja (AP-07a + AP-07b) |
| `Apps/prokrastinations-preis/app.css` | `--fw-rubikon-text-*`-Werte + neue M-Media-Query | niedrig, reine Wertänderung + eine Regel | ja (AP-07c + AP-07b) |
| `tools/rubikon-symbol-markers-diagnose.js` | neu, DevTools-Diagnoseskript | keins, nicht eingebunden | ja (AP-07b) |
| `docs/steering/patches/AP-prokrast-07a_*_Ergebnis.md` | neu | — | ja |
| `docs/steering/patches/AP-prokrast-07b_*_Ergebnis.md` | neu | — | ja |
| `docs/steering/patches/AP-prokrast-07c_*_Ergebnis.md` | neu | — | ja |
| `docs/steering/patches/AP-prokrast-07d_*_Ergebnis.md` | neu (dieses Protokoll) | — | wird nach Write geprüft |
| `NAVIGATION.md`, `PROJECT-STATUS.md`, `docs/steering/BACKLOG.md`, `.claude/learning/session-log.md`, `.claude/memory/MEMORY.md`, `.claude/memory/project_prokrastinations_preis_drehbuch.md` | Steering-/Memory-Sync im Rahmen des regulären Abschluss-Rituals | niedrig, reine Statuspflege | ja (AP-07b Scope-QA) |

### Ergebnisprotokolle

- `docs/steering/patches/AP-prokrast-07a_rubikon-symbol-markers_implementierung_Ergebnis.md`
- `docs/steering/patches/AP-prokrast-07b_abschluss-qa_claims-vs-files_tc-f05_Ergebnis.md`
- `docs/steering/patches/AP-prokrast-07c_rubikon-symbol-markers_css-feinjustierung_Ergebnis.md`
- `docs/steering/patches/AP-prokrast-07d_qa-nachtrag_ruecklaufkapsel_Ergebnis.md`

### Nicht geändert

- APP_SPEC.md: nicht angefasst über die gesamte Kette
- Drehbuch: nicht angefasst
- QA_TEST_CASES.md: nicht angefasst (TC-F05 war bereits seit AP-06b vorhanden)
- FwVerticalLinePlugin.js: nur gelesen, nie geändert
- ChartEngine: nicht geändert (Registrierungslogik existierte bereits seit AP-03d)
- andere Plugins: nicht angefasst
- Strategies: nicht angefasst
- Stationsdaten: nicht angefasst
- Screen 1–3: nicht angefasst

### Neue Datei-Wahrheit

- `FwChartTextPlugin.js`: opt-in `anchor:'lastPoint'`, Default-Verhalten ohne `anchor` unverändert
- `app.js`: `renderScreen4Chart()` aktiviert `chartText` mit zwei Annotationen, sonst unverändert
- `app.css`: drei Breakpoints (S/M/L) mit gemessenen `--fw-rubikon-text-*`-Werten, M bewusst nicht pixelperfekt
- Diagnose-Skript: dauerhaft in `tools/` gesichert, kein Runtime-Bezug
- Screen 4: visuell und strukturell unverändert außerhalb der Marker-Ergänzung
- TC-F05: bestanden für aktuellen Font-Stand, mit dokumentiertem Folgeauftrag
- offene Punkte: CI-Font-/Theme-Bridge-Anbindung (DS-012/DS-013) mit anschließender Neumessung; Card-to-Point; Screen-3-Timing; CTA-Copy; Screenreader-Volltest (unabhängig von AP-07)

### Pflichtumfang-Erfüllung

| Pflicht | Erfüllt? | Beleg |
|---|---:|---|
| ✅ links der blauen Rubikon-Linie | ja | `anchor:'lastPoint'`/`offsetX:-14`, visuell bestätigt |
| ❓ rechts der blauen Rubikon-Linie | ja | `anchor:'lastPoint'`/`offsetX:14`, visuell bestätigt |
| Bau über FwChartTextPlugin.js | ja | additive Erweiterung, keine neue Datei/Plugin |
| S/M/L gewährleistet | ja | S/L visuell bestätigt, M bewusst unter Fallback-Font abgenommen |
| visuell-only | ja | nur `ctx.fillText`, kein DOM |
| kein DOM | ja | Code-Grep + Alberts DevTools-Elements-Check |
| keine A11y-Pflicht | ja | kein A11y-Code im Plugin |
| keine Live-Region | ja | Alberts Accessibility-Pane-Check |
| kein Fokus | ja | kein `tabindex`/`focus()`, Canvas strukturell nicht fokussierbar |
| keine Zukunftsdaten | ja | keine neuen Datasets |
| keine Future-Line | ja | `xDisplayRange` unverändert |
| keine Prognose | ja | kein neuer Prognose-Code |
| TC-F05 geprüft | ja | statisch + visuell + DOM-/Accessibility-Check |
| Screen 1–3 nicht regressiert | ja | kein Diff außerhalb Screen 4 |
| Screen-4-Timing nicht verändert | ja | `revealScreen4()` unverändert |

### Abweichung vom ursprünglichen Plan

Gering

Erläuterung:

```text
AP-07c wurde als CSS-Feinjustierung eingeschoben, nachdem Albert beim Live-Server-Test
zwei reale Layout-Defekte fand — nicht im ursprünglichen AP-07a-Plan vorgesehen.
Die Rücklaufkapsel erfolgt deshalb als AP-07d statt als AP-07c.
M wurde nicht weiter pixelperfekt feinjustiert, sondern unter aktuellem Fallback-Font-Stand
bewusst abgenommen, weil die CI-Font-Anbindung ohnehin eine spätere Neumessung erzwingt —
eine Nutzerentscheidung, keine technische Abweichung.
```

Die Abweichung ist gering: Sie betrifft nur die interne AP-Nummerierung und die Reihenfolge der Feinarbeit, nicht Scope, Architektur oder Datenwahrheit. Kein Code außerhalb des ursprünglich vorgesehenen Bereichs (`FwChartTextPlugin.js`, `app.js`, mit Begründung `app.css`) wurde geändert.

### Regressionsrisiko

Niedrig

Begründung:

Alle Code-Änderungen sind additiv (opt-in `anchor`-Feld, neue `chartText`-Konfiguration, reine CSS-Wertänderungen + eine neue, eng begrenzte Media-Query). Kein bestehender Code-Pfad wurde umgebaut. Einziger anderer Nutzer von `FwChartTextPlugin.js` (Test-Szenario AF) ist vom `anchor`-Feld nicht betroffen, da er es nicht setzt. Screen 1–3, CTA-Timing und Reduced-Motion-Verhalten sind laut Diff nicht berührt.

### Offene Punkte

- Card-to-Point: unverändert offen, unabhängiger Haupt-AP-Kandidat
- Screen-3 Timing: unverändert offen, unabhängiger Haupt-AP-Kandidat
- CTA-Copy: unverändert offen, nicht Teil dieser Kette
- Screenreader-Praxistest: für die Symbolik nicht erforderlich (kein A11y-Anspruch); für den DOM-Haupttext weiterhin als offen dokumentiert (AP-05-Kette)
- Code: keine offenen Punkte innerhalb des AP-07-Scopes
- UX: keine — M-Feinschliff ist terminiert auf „nach CI-Font-Anbindung"
- CSS: keine — `CSS-KONVENTIENEN.md` nicht einschlägig für `app.css` (AP-07b geklärt)
- Daten: keine
- Test: TC-F05 bestanden für aktuellen Font-Stand; Neuprüfung nach Font-Anbindung erforderlich
- Mobile (S): bestätigt
- Reduced Motion: kein Sonderfall (Plugin ohne Animation)
- Backlog: AP-26 sollte vom Masterfaden auf „gebaut, GRÜN — Folgeauftrag Font-Neumessung nach DS-012/DS-013" nachgezogen werden (dieser AP darf BACKLOG selbst nicht mehr ändern, siehe Nicht-Ziele)
- CI-Font-/Theme-Bridge-Folgeauftrag: „Nach Anbindung der echten CI-Fonts / Theme-Bridge muss die Rubikon-Positionierung S/M/L mit `tools/rubikon-symbol-markers-diagnose.js` neu gemessen und ggf. feinjustiert werden." — vollständig dokumentiert, kein AP-07-Blocker

### Empfehlung des Nebenfadens

- Commit-Freigabe aus AP-07-Sicht: ja
- Abschlussritual: durch Albert/Claude separat nach diesem Rücklauf, nicht in diesem AP
- Nächster sinnvoller Haupt-AP: Kandidaten sind Card-to-Point (Screen 2), Screen-3-Timing-Reveal, oder DS-012/DS-013 (Theme-Bridge-Fonts, worauf der AP-07-Folgeauftrag direkt verweist)
- Warum: AP-07 ist inhaltlich und formal abgeschlossen; die einzige verbleibende AP-07-Nacharbeit (Font-Neumessung) hat keine eigene Dringlichkeit vor der Font-Anbindung selbst und ist kein eigenständiger Haupt-AP, sondern ein Anhängsel an DS-012/DS-013
- Ausdrücklich nicht nächster AP: erneute Produktdiskussion zur Symbolik (entschieden); weitere M-Pixel-Politur vor Font-Anbindung (laut Albert nicht sinnvoll)

### Anschlussbedingung

Der nächste Haupt-AP darf erst erstellt werden, wenn dieser Rücklauf im Masterfaden ausgewertet wurde.

## Commit-Empfehlung

Commit aus AP-07-Sicht freigegeben: ja

Falls ja:
- Commit erst nach Abschlussritual.
- Commit durch Albert/Claude, nicht in diesem AP.
- Commit-Message-Vorschlag:

```text
feat(AP-prokrast-07a-07d): RubikonSymbolMarkers gebaut, CSS-Feinjustierung + Abschluss-QA — BACKLOG AP-26

Was war das Problem?
BACKLOG AP-26: Die in AP-prokrast-06a-06d entschiedene ✅/❓-Symbolik war spec-seitig
vollständig vorbereitet, aber nicht gebaut. Nach dem Bau fand Albert beim manuellen
Live-Server-Test zwei Layout-Defekte am DOM-Textblock (Kollision mit "?" auf Screen S,
fehlende Fluchtlinie auf allen Breiten).

Wie wurde es gelöst?
FwChartTextPlugin.js additiv um anchor:'lastPoint' erweitert — bindet ✅/❓ an denselben
Datenpunkt wie FwVerticalLinePlugin (chart.getDatasetMeta(0), letzter Punkt), keine
eigene Zeitberechnung. app.js aktiviert chartText nur für Screen 4. CSS-Feinjustierung
über iterative DevTools-Messung (neues Diagnoseskript tools/rubikon-symbol-markers-diagnose.js)
statt Formel-Schätzung, da app.js keine Chart.js-Pixelinternals lesen darf
(APP-INTERFACE.md §4). Neue dritte CSS-Breakpoint-Stufe (M, 481-1024px) ergänzt.
M unter aktuellem Fallback-Font-Stand bewusst abgenommen statt weiter pixelgenau
nachjustiert, da die noch ausstehende CI-Font-Anbindung (DS-012/DS-013) die Werte
ohnehin neu invalidieren wird.

Warum ist die Lösung sicher (keine Regressionen)?
Alle Änderungen additiv/opt-in. Bestehender Annotation-Pfad ohne anchor-Feld unverändert.
Einziger anderer Plugin-Nutzer (Test-Szenario AF) nicht betroffen. Screen 1-3,
Screen-4-Timing, CTA-Reveal unverändert laut Diff. Unabhängige Abschluss-QA
(AP-prokrast-07b) plus QA-Nachtrag (AP-prokrast-07d) bestätigen: kein DOM, keine
A11y-/Live-/Fokus-Semantik für die Symbole (DevTools Elements + Accessibility-Pane
von Albert geprüft), keine Zukunftsdaten/Future-Line/Prognose, dieselbe Chart.js-
Pixelreferenz wie FwVerticalLinePlugin (keine Divergenzgefahr).

Betroffene Bereiche:
  Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js (anchor:'lastPoint')
  Apps/prokrastinations-preis/app.js (renderScreen4Chart chartText-Config)
  Apps/prokrastinations-preis/app.css (--fw-rubikon-text-top/-left, neue M-Media-Query)
  tools/rubikon-symbol-markers-diagnose.js (NEU, DevTools-Diagnoseskript)
  docs/steering/patches/AP-prokrast-07a_bis_07d_*_Ergebnis.md (NEU)
  NAVIGATION.md, PROJECT-STATUS.md, docs/steering/BACKLOG.md, .claude/learning/session-log.md,
  .claude/memory/MEMORY.md, .claude/memory/project_prokrastinations_preis_drehbuch.md

Kontext:
  Kette AP-prokrast-06a-06d (✅ 2026-07-04) → 07a-07d (2026-07-06)
  Getestet: Albert im Live-Server, Screen 4, Viewport S/M/L; DevTools Elements +
  Accessibility-Pane für TC-F05 DOM-/A11y-Schritt
  Offen (kein Blocker): Neumessung S/M/L nach Anbindung der offiziellen CI-Fonts
  (--fw-font-base derzeit nicht definiert — DS-012/DS-013)
```
