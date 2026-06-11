---
name: project_chartjs_global_requirement
description: Chart.js muss global via <script>-Tag geladen werden — nicht als ES-Module-Import
metadata:
  type: project
---

ChartEngine._draw() prüft `typeof Chart === 'undefined'` und erwartet Chart.js als globale Variable (`window.Chart`). Chart.js darf nie als ES-Module-Import in app.js oder der Engine geladen werden.

**Why:** Alle Theme-Test-HTMLs binden Chart.js via `<script src="https://cdn.jsdelivr.net/npm/chart.js">` ein. Standalone App-Test-HTMLs (z.B. `app.test.html`) erben dieses Tag nicht automatisch — fehlender Tag führt zu `Error: Chart.js Library nicht geladen!` für alle gültigen Szenarien. 2026-06-11 bei APP-01 Slice 4 aufgetreten.

**How to apply:** Beim Erstellen oder Prüfen von App-Test-HTMLs sicherstellen, dass `<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>` VOR dem `<script type="module" src="./app.js"></script>` steht. Gilt für alle standalone Test-Seiten, die die Engine nutzen.
