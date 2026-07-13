---
name: engine-layer-grenzen-im-entwurf
description: Frühe Engine-Entwürfe tendieren zu Layer-Verletzungen — Layer-Check explizit vor Freigabe
metadata: 
  node_type: memory
  type: feedback
  originSessionId: fee6cbf1-99c6-49d3-8cf9-d5755e0c6d94
---

Erste Implementierungsentwürfe für Engine-Erweiterungen neigen zu Layer-Verschmutzungen: Logik wird in die falsche Schicht gelegt.

Belegte Fälle (APP-01 Slice-4, 2026-06-10):
- Revision 2: inline Chart.js-Pfad in `renderFromData()` = Engine-interner Bypass (Layer 2 greift auf externe Abhängigkeit zu)
- Revision 4: inline `appDataLineStrategy` in `ChartEngine.js` = Layer-2-Verschmutzung (Transformation, fwContext, A11y, Zeitlogik gehören in Layer 3)

Reoccurrence (AP-prokrast-16b, 2026-07-09): erster Weg zur Konsolidierung eines Plugin-Direkt-`getComputedStyle` injizierte Options in `ChartEngine.js` (Layer 2, via `this.renderer.theme`) — verstieß gegen KDR 14.2/Layer-Disziplin. Durch Alberts Verweis auf `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` erkannt, vollständig revertiert und stattdessen spec-konform in `LineChartStrategy` (Layer 3) verlagert.

**Why:** Layer-Grenzen werden beim schnellen Entwurf übersehen. Revision 4 wurde nicht freigegeben. Beide Fälle erforderten Alberts Korrektur. Die Reoccurrence 2026-07-09 zeigt: der Fehlertyp tritt weiterhin beim ersten Lösungsentwurf auf, wird aber zuverlässig durch expliziten Spec-Abgleich (nicht nur Vorgänger-Code-Vergleich) gefangen, bevor er freigegeben wird.

**How to apply:** Bei Engine-Erweiterungen vor Freigabe explizit prüfen: Welcher Layer erhält diese Logik? Datenfluss nur abwärts (Layer 1→5). Transformation/fwContext/A11y/Zeitlogik → Layer 3, nicht Layer 2. Externe Abhängigkeiten (Chart.js) gehören nicht in Engine-Methoden.
