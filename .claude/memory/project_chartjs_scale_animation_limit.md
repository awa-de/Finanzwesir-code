---
name: project_chartjs_scale_animation_limit
description: Chart.js 4.5.0 animiert Skalen-Grenzen (min/max/Ticks/Grid) nicht nativ — nur Datensatz-Elemente
metadata:
  type: project
---

Chart.js (lokal vendored `Theme/assets/js/vendor/chart.umd.min.js`, Version 4.5.0) trennt Skalen-Updates strukturell von der Animation: `Chart.prototype.update()` führt Skalen-Neuaufbau (`min`/`max`, Ticks, Gridlines) über `_updateLayout()` synchron durch — ein Codepfad, der komplett getrennt von `_updateDatasets(mode)` läuft, wo der Animator hängt. Nur Datensatz-Elemente (Linienpunkte, Radius, Farben) werden interpoliert; Skalen-Grenzen springen immer sofort auf den Zielwert.

Direkt am Chart.js-4.5.0-Quellcode verifiziert (`core.controller.js#update()`), zusätzlich gestützt durch offizielle Doku (Default-Animationsziele sind ausschließlich `numbers:['x','y','borderWidth','radius','tension']`, keine Skalen-Properties), den Quellcode von `chartjs-plugin-zoom` (setzt nur `scale.options.min/max` + `chart.update()`, keine eigene Interpolation) und ein offenes GitHub-Issue (`chartjs/Chart.js#10674`) mit demselben Symptom.

**Why:** In AP-prokrast-03f/03g (Rubikon-Reveal, `prokrastinations-preis`) wurde ein Achsen-Zukunftsraum-Reveal gebaut, der als „ruckartig" statt „smooth" wahrgenommen wurde — die Achse/Ticks sprangen sofort, nur die Linie glitt nach. AP-03g hat das ursprünglich als Bug vermutete Verhalten als Chart.js-Architektureigenschaft entlarvt, nicht als Bug in `FwSmartXAxis`/`ChartEngine`.

**How to apply:** Bei jeder künftigen Anforderung „Achse soll sich sichtbar/smooth verändern" (Zoom, Pan, Zeitfenster-Wechsel, Reveal-Animation) sofort einordnen: das ist mit Chart.js-Bordmitteln **nicht** nativ lösbar. Kein `chart.update('none')`-Loop/rAF-Tween bauen — das verstößt zusätzlich gegen `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md §6.3` (Canvas-Ownership-Konflikt). Reale Alternativen: (a) gestufter Reveal über mehrere reguläre `renderFromData()`-Aufrufe mit echter Chart.js-Animation (kein `'none'`), (b) Produktentscheidung für einen stehenden/nicht-animierten Zustand (wie in AP-03h final gewählt), (c) rein CSS-basierte Übergänge, die keine Chart.js-Internals berühren. Siehe [[project_app_fabrik_struktur]] und die Ergebnisprotokolle `docs/steering/patches/AP-prokrast-03g_*_Ergebnis.md` für die vollständige Herleitung.
