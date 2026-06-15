---
name: project-comp-arch
description: "Component Composition Architecture — verbindliches App-Fabrik-Architekturmodell, verankert 2026-06-05"
metadata: 
  node_type: memory
  type: project
  originSessionId: 9b289819-9783-40c3-86f0-eb66c8e06ae8
---

Component Composition Architecture ist das verbindliche mentale Modell der App-Fabrik (🟢 ENTSCHIEDEN 2026-06-05).

Das Modell: Die App ist das Lego-Brett. Die Komponenten sind die Steine. Engines und Renderer sind die Spezialwerkzeuge, die bestimmte Steine korrekt herstellen.

**Why:** Die App-Fabrik war implizit um Charts herum gebaut ("App = Chart mit Drumherum"). Viele geplante Apps sind chartfrei (A1, D1, Weltkarte, G1 u.a.). OA-02 hat die Asymmetrie aufgedeckt — eine saubere Rahmung war nötig.

**How to apply:**
- Eine Finanzwesir-App ist eine Kompositionsfläche (App Board) — kein Sonderfall eines Charts.
- Chart-Komponente ist eine von mehreren Komponentenklassen (Map, Card, Control, Text/Copy).
- ChartEngine = Single Source of Truth für Chart-Komponenten, nicht für die App-Fabrik als Ganzes.
- OA-02 ist eine Chart-Komponenten-Entscheidung, kein App-Fabrik-Sonderweg.
- Verbindliches Modell: `docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md` §1a
- ADR: `docs/steering/audits/ADR-COMP-ARCH-01-component-composition-architecture.md`

## config.features-Doktrin (2026-06-10, OA-02 Slice-4-Gate)

Beim Konfigurieren von Engine-Features: neutrales `config.features`-Objekt mit Boolean-Flags.

Verboten:
- Negative Sonderflags: kein `noRangeButtons`, kein `hideControls`
- Domainspezifische Flags in Engine/Renderer: kein `isAppChart`

Die App wählt deklarativ aus, welche Fähigkeiten die Engine liefern soll. Die Engine unterdrückt nichts — sie bietet an.

**How to apply:** Bei App/Engine-Interfaces: immer positiv formulieren. `rangeControls: false` statt `noRangeButtons: true`.
