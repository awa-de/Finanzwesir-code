---
name: feedback_css_custom_properties_tuning
description: Für visuell nachjustierbare Positionswerte CSS Custom Properties statt harter Selektor-Werte anbieten
metadata:
  type: feedback
---

Wenn eine CSS-Position/-Größe erfahrungsgemäß mehrfach visuell nachjustiert werden muss (z. B. Overlay-Text-Position über einem Chart), die betroffenen Werte sofort als benannte CSS Custom Properties (`--fw-*`) mit Default-Fallback anlegen, statt sie hart im Selektor zu verdrahten.

**Why:** In AP-prokrast-03h2 (`prokrastinations-preis`, DOM-Overlay-Text im Rubikon-Chart) wollte Albert die Position selbst nachjustieren können, nachdem der erste Wurf zu nah an der Chartlinie lag: „Wie können wir Parameter einbauen, so dass ich sagen kann, die linke obere Ecke etwas nach rechts/links/oben/unten?" Nach Umstellung auf `--fw-rubikon-text-top`/`--fw-rubikon-text-left` liefen zwei weitere Korrekturrunden (Desktop-Abstand, dann S-Zone-Breakpoint) jeweils als Ein-Zeilen-Änderung statt erneuter Selektorsuche, und Albert konnte die Werte zusätzlich live in den Browser-DevTools vortesten, bevor er die finale Zahl durchgab.

**How to apply:** Bei jeder Positionierungsaufgabe mit absehbarem Iterationsbedarf (Overlay-Text, Feinabstände zu dynamischen Chart-/Canvas-Elementen, responsive Feinschliff) von Anfang an Custom Properties mit sprechenden Namen anlegen (`--fw-<kontext>-<eigenschaft>`), auch in Media-Query-Overrides. Spart dem Nutzer wiederholte Rückfragen und beschleunigt den Korrekturzyklus messbar.
