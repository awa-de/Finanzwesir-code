---
name: App-Architektur (beschlossen)
description: Wie interaktive Apps in Ghost eingebettet werden, zwei Rendering-Welten, Design-API-Konzept
type: project
originSessionId: 65c4fd2d-4f10-4cdc-a47d-a43bfb91883f
---
Apps sind HTML+JS-Widgets, die als HTML-Card in Ghost-Seiten eingebettet werden.
Ghost-Seite stellt screen.css + Tailwind bereit — Apps erben alle Styles automatisch.

**Why:** Kein Backend, reine Client-Side-Verarbeitung. Redakteur schreibt nur einen parametrisierten Div.

**How to apply:** Bei jeder App-Entwicklung dieses Schema einhalten. DS-014 (Design-API) muss fertig sein bevor neue Apps gebaut werden.

## Ghost HTML-Card (was der Redakteur schreibt)

```html
<!-- App mit CSV-Daten: -->
<div class="fw-app"
     data-app="etf-wahlurnen-rechner"
     data-csv="https://www.finanzwesir.com/assets/data/msci-world.csv">
</div>

<!-- App ohne CSV (reine User-Input-Berechnung): -->
<div class="fw-app" data-app="sparplan-rechner"></div>
```

## Zwei Rendering-Welten

**Welt 1 — HTML/CSS:** screen.css §1 Tokens + Tailwind-Config → Utility-Klassen
- App-HTML erbt von Ghost-Seite: H2, Buttons, Abstände alles verfügbar
- Interaktive UI-Elemente (Chips, Slider, KPI-Cards) → Design-API (DS-014)

**Welt 2 — Canvas/JS:** FwTheme.init() liest :root CSS Custom Properties via getComputedStyle()
- Nur wenn App Charts/Canvas rendert
- Fallback: hardcodierte Hex-Werte im FwTheme Constructor

## Technische Regeln

- Kein Backend, keine Datenbank
- Dark Mode: Ghost Theme zuständig — Apps implementieren keinen eigenen Dark Mode
- CSS: screen.css §1 Tokens via var(--color-petrol) etc., Tailwind-Klassen für Layout
- Keine eigenen Farbwerte, kein externes Font-CDN
- App-spezifische Datenfarbgebungen (z.B. 16 Index-Farben) sind als App-eigene Tokens erlaubt
- Alle Apps nutzen dieselben CSS-Selektoren aus der Design-API

## Dateistruktur

```
Apps/[app-name]/          ← Dev-Prototypen (nicht deployen)
Theme/assets/js/apps/     ← Produktions-JS (geht in Ghost-ZIP)
```
