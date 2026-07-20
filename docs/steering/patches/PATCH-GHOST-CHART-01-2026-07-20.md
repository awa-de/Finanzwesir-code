# GHOST-CHART-01 – Chart-Laufzeit für Pages, Post-Doppelstart korrigieren

Lies ausschließlich diese Quellen:

- docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md
- docs/steering/STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md
- docs/steering/theme-build/GHOST-LOKALBETRIEB.md
- docs/steering/patches/PATCH-GHOST-CHART-00-2026-07-20.md
- docs/spec/TECH-SPEC Theme-Integration Chart-Engine.md
- docs/spec/CHART_ENGINE_REGRESSIONSREGELN.md
- docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md
- tests/engine/line-ci.test.html
- Theme/page.hbs
- Theme/post.hbs
- Theme/assets/js/fw-chart-engine/index.js

## Ausgangsbefund

`Theme/page.hbs` lädt die Chart-Laufzeit nicht. Daher können HTML-Cards mit `.financial-chart-module` auf Ghost Pages heute nicht arbeiten.

`Theme/assets/js/fw-chart-engine/index.js` startet die Engine selbst beim `DOMContentLoaded`. Der bisherige manuelle Import und Init-Block in `Theme/post.hbs` erzeugt deshalb eine Doppelinitialisierung.

Der funktionierende Referenzpfad ist:

```html
<script defer src="{{asset "js/vendor/chart.umd.min.js"}}"></script>
<script type="module" src="{{asset "js/fw-chart-engine/index.js"}}"></script>
```

## Auftrag

1. Ergänze in `Theme/page.hbs` am Ende des bestehenden Page-Inhalts genau diesen Ladepfad. Die Scripts gehören in den vorhandenen `{{#post}}`-Block, nach dem Artikel.

2. Korrigiere in `Theme/post.hbs` ausschließlich die Doppelinitialisierung:
   - Chart.js-Ladezeile behalten.
   - Den bisherigen Inline-Modulblock mit `import { ChartEngine } ...`, `DOMContentLoaded`, `new ChartEngine()` und `.init()` vollständig durch die externe Modulzeile aus dem Referenzpfad ersetzen.

3. Theme gemäß `GHOST-LOKALBETRIEB.md` als Ghost-Upload-ZIP paketieren. Kein Direktkopieren in `C:\Tools\ghost-local`.

## Feste Grenzen

- Nur `Theme/page.hbs` und `Theme/post.hbs` ändern.
- Kein Eingriff in `ChartEngine.js`, `CSVParser.js`, Renderer, Strategien, Plugins, Janitor, CSS, Tailwind-Quellen, Homepage, Routing oder Ghost-Inhalte.
- Kein neues Plugin, kein neues Datenformat, kein neuer CSS-Namespace.
- Kein CSS-Build: Es gibt keine CSS- oder Tailwind-Quelländerung.
- Nicht in Ghost Admin hochladen und keine Page-Inhalte anlegen oder ändern.
- Die CSV-Upload-Prüfung ist nicht Teil dieses Auftrags.

## Deterministische Nachweise

1. Diff ausschließlich für `Theme/page.hbs` und `Theme/post.hbs`.
2. In beiden Templates jeweils genau eine Chart.js-Ladezeile und genau eine externe Modulzeile auf `fw-chart-engine/index.js` nachweisen.
3. In beiden Templates darf kein manueller `new ChartEngine()`-, `.init()`- oder `import { ChartEngine }`-Block verbleiben.
4. Nachweisen, dass `index.js` weiterhin der einzige Startpunkt der Engine ist.
5. ZIP-Inhalt prüfen: Theme-Dateien an ZIP-Wurzel; kein `src/`, `node_modules/`, `.git/` oder `.claude/` im Upload-Paket.

## Abschlussausgabe

- Status: GRÜN / GELB / ROT
- Geänderte Dateien mit knapper Begründung
- Build: nicht erforderlich, mit Begründung
- ZIP-Pfad und Paketierungsnachweis
- Deterministische Nachweise
- Nicht durchgeführt: Ghost-Upload, CSV-Upload, Browserprüfung
- Restschritt für Albert: ZIP über Ghost Admin hochladen/aktivieren; danach `/index-vergleich/` mit einer HTML-Card und realer Ghost-CSV-URL prüfen.
- Blocker oder Restunsicherheiten
