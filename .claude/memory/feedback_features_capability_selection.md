---
name: feedback_features_capability_selection
description: Engine-Fähigkeiten deklarativ wählen statt unterdrücken — kein isAppChart, keine negativen Sonderflags
metadata:
  type: feedback
---

App wählt Engine-Fähigkeiten deklarativ aus via `config.features`-Objekt mit Boolean-Flags. Keine AppChart-Sonderlogik, kein `isAppChart`, keine negativen Flags wie `noRangeButtons`.

**Why:** Albert hat korrigiert: „Es geht nicht um Unterdrückung als Sonderfall. Offizielle Doktrin: Die ChartEngine bietet Fähigkeiten an. Die App wählt pro Chart deklarativ aus, welche Fähigkeiten aktiv sind." Die Framing-Richtung bestimmt die Architektur — Sonderfall-Logik führt zu AppChart-Sonderwegen; Capability-Selection bleibt generisch.

**How to apply:** Bei App-Chart-Konfiguration: neutral `config.features: { rangeControls: false, headline: false }` statt `noRangeButtons: true` oder `isAppChart: true`. Feature-Check prüft `feature === false` (nicht `!feature`) damit bestehende Charts ohne `features`-Feld unverändert bleiben. Domainbegriffe (Sparplan, APP-01, prokrastinations-preis) gehören nie in Engine- oder Renderer-Code.
