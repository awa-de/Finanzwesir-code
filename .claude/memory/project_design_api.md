---
name: Design-API Konzept (beschlossen)
description: Zentraler Komponentenbaukasten für interaktive App-Elemente — Kern-Architekturentscheidung
type: project
originSessionId: 65c4fd2d-4f10-4cdc-a47d-a43bfb91883f
---
Alle 18+ Apps nutzen dieselben CSS-Selektoren aus einem zentralen Baukasten.
Kein App erfindet eigene Chips, Slider oder Cards — alle bedienen sich aus der Design-API.

**Why:** 18 Apps ohne zentrale Definitionen → 18 verschiedene Input-Styles, divergierende Ergebnisanzeigen, kein konsistentes CI.

**How to apply:** DS-014 (07-APP-KOMPONENTEN.md) muss fertig sein bevor neue Apps gebaut werden. Bei jeder neuen App-Komponente: erst prüfen ob sie in der Design-API existiert, dann erst neu definieren.

## Kern-Unterschied zu statischen Seiten

Statische Seitenelemente: ein Zustand (H1 sieht so aus — fertig).
App-Elemente: mehrere Zustände, alle müssen definiert werden.

Beispiel Filter-Chip:
- default (nicht ausgewählt)
- hover
- selected/active
- disabled
- max-reached (Auswahl voll)

Jede Komponente in 07-APP-KOMPONENTEN.md braucht vollständige Zustandsdefinition.

## Bekannter Komponentenkatalog (aus Weltkarten-Mockup)

- fw-chip (Filter-Pill, auswählbar)
- fw-select-row (auswählbare Zeile mit Farbpunkt)
- fw-kpi-card (Kennzahl: großer Wert + Label)
- fw-app-header (Titel + Subtitle + Controls)
- fw-placeholder (Leer-Zustand)
- fw-bottom-sheet (Mobile-Overlay für komplexe Auswahl)
- fw-compare-card (Vergleichsdarstellung)
- fw-info-card (Container für Ergebnisse)

## Technische Basis

- Tailwind für Layout/Spacing (zwingend)
- screen.css §1 Tokens für Farben (var(--color-petrol) etc.)
- screen.css §6 Components für Custom-CSS (wie .ci-link heute)
- Erweiterbar: neue Klasse rein, alte deprecated markieren
- Dokumentiert in: docs/design-system/spec/07-APP-KOMPONENTEN.md (noch nicht erstellt)
