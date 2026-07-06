---
name: project_chartengine_anchormeasurement_contracts
description: "ChartEngine trägt seit AP-prokrast-08b drei neue additive Render-Contracts (anchorMeasurement, chartSettled, renderMotion) für DOM↔Canvas-Koordination; Chart.js registriert Plugins nur bei new Chart(), nie im Smart-Update-Pfad"
metadata: 
  node_type: memory
  type: project
  originSessionId: 1f75a671-a76b-4f85-b6cd-a68936191246
---

`Theme/assets/js/fw-chart-engine/core/ChartEngine.js` trägt seit AP-prokrast-08b (Card-to-Point-Motion, `prokrastinations-preis` Screen 2) drei neue, rein additive, opt-in Render-Contracts in `renderFromData(container, chartSeries, options)`:

1. **`anchorMeasurement`** (`{enabled, anchors, onAnchorMeasurement}`) — Engine übersetzt semantische Datenpunkt-Koordinaten (`x`/`y`-Werte) über `FwAnchorMeasurementPlugin.js` (neu, `afterDraw`-Hook) in Pixel-Positionen relativ zum Container und liefert sie per Callback an die App. Das ist der einzige app-seitig zulässige Weg, Pixel-Positionen von Chart.js-Datenpunkten zu bekommen — direkter Zugriff auf `chart.scales`/`getPixelForValue`/`chartArea` aus `app.js` bleibt laut `APP-INTERFACE.md` §4 verboten.
2. **`chartSettled`** (`{enabled, onSettled}`) — komponiert mit Chart.js' nativem `options.animation.onComplete` (kein neues Plugin, kein Event-Bus) und feuert zusätzlich synchron, wenn `update('none')` läuft (Reduced Motion oder `renderMotion:'instant'`, wo `onComplete` nie natürlich auslöst) — aber **nur auf dem Smart-Update-Pfad**, siehe Lücke unten.
3. **`renderMotion`** (`{mode:'instant'}`) — entfernt Chart.js' Default-Tweening-Animation gezielt für einen Render-Call, indem derselbe `update('none')`/`chartConfig.options.animation=false`-Mechanismus wiederverwendet wird, der bereits für Reduced Motion existiert (AP-prokrast-08b5).

**Chart.js-Plattform-Constraint (empirisch verifiziert in AP-prokrast-08b2):** Chart.js liest die Plugin-Liste (`chartConfig.plugins`) ausschließlich beim allerersten `new Chart()`-Aufruf. `ChartEngine._draw()`s Smart-Update-Pfad (bestehender Chart, `chartInstance.update()`) reassigned niemals `.plugins` — ein Plugin kann also nicht nachträglich für einen bereits existierenden Chart „aktiviert" werden. Aktueller Workaround in `app.js`: ein **No-op-Bootstrap** — `anchorMeasurement` wird beim allerersten Render eines Journey-Charts mit leerem Callback aktiviert, nur um die Plugin-Registrierung zu erzwingen. Als HÄRTEN-Technical-Debt dokumentiert, nicht als sauberes Muster — Masterfaden-Entscheidung offen unter BACKLOG `AP-prokrast-08-FOLLOWUP-A`.

**Bekannte Lücke (gefunden in AP-prokrast-08c, aktuell folgenlos):** Der Creation-Pfad von `ChartEngine._draw()` (der `new Chart()`-Ast) hat — anders als der Update-Pfad — keinen synchronen `_emitChartSettled()`-Fallback, wenn `animation:false` gesetzt wird. `chartSettled` würde also nie feuern, wenn es zusammen mit `renderMotion:'instant'`/Reduced-Motion auf einem chart-erzeugenden Aufruf angefordert würde. In `prokrastinations-preis` aktuell nicht auslösbar, da `app.js` `chartSettled` nur auf dem Update-Pfad setzt — vor jeder Plattform-Dokumentation des Contracts zu schließen. BACKLOG `AP-prokrast-08-FOLLOWUP-B`.

**Warum wichtig:** Alle drei Contracts sind bewusst app-neutral in der Engine gebaut (kein `fwContext`-Schreibzugriff, kein `chart._fwGeometry`, kein direkter Plugin→App-Kanal) und stehen damit jeder künftigen App zur Verfügung, die DOM-Elemente an Chart.js-Datenpunkte koppeln oder Chart.js' Default-Animation gezielt abschalten muss — nicht nur `prokrastinations-preis`.

**How to apply:** Bevor ein neues Feature Pixel-Koordinaten von Chart.js-Datenpunkten braucht: `anchorMeasurement` wiederverwenden statt neuen Plugin-Kanal zu bauen — aber den No-op-Bootstrap-Bedarf einplanen, solange `AP-prokrast-08-FOLLOWUP-A` offen ist. Bevor `chartSettled` auf einem Creation-Aufruf (erster Chart-Render, nicht Update) verwendet wird: `AP-prokrast-08-FOLLOWUP-B` zuerst schließen oder den fehlenden Fallback selbst ergänzen. Volles Herleitungsprotokoll: `docs/steering/patches/AP-prokrast-08a…08c_*_Ergebnis.md`, `AP-prokrast-08b2_llm-review-kontext.md`. Siehe auch [[project_chartjs_scale_animation_limit]] (verwandte Chart.js-Animations-Plattformgrenze) und [[project_prokrastinations_preis_drehbuch]].
