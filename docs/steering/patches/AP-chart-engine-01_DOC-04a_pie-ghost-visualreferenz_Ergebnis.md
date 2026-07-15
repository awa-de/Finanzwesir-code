# AP-chart-engine-01, DOC-04a: Pie-Ghost-Visualreferenz — Ergebnisprotokoll

Status: GRÜN — reiner Dokumentationsnachtrag, kein Code und keine Testdatei geändert.

## Anlass

Die Auditfrage vor dem Abschlusscommit zeigte: Die gemeinsame Legend-Pill-Basis war in Konzept, Visual Board und Renderer kongruent. Der fachlich zulässige Pie-Ghost-Zustand war im Konzept beschrieben, aber im Visual Board noch nicht sichtbar referenziert. Damit lag seine genaue DOM-Optik nur im Renderer vor und hätte bei einer künftigen App driften können.

## Geänderte Dateien

- `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`
- `docs/steering/design/TAILWIND-APP-BAUKASTEN_VISUAL-BOARD_V0-1.html`
- diese Ergebnisdatei

## Verbindlicher Ghost-Vertrag

Der Pie-Ghost bleibt ein fachlicher Zustands-Overlay über der gemeinsamen Legend-Pill-Basis:

- Hintergrund `--color-grid` (Bridge-Token, keine Tailwind-Utility);
- transparente Border, kein Schatten und `opacity: .6`;
- Text `--color-text-disabled` und durchgestrichen;
- Dot `grayscale(100%)` mit `opacity: .5`;
- kein aktiver Hover/Lift;
- ausschließlich aus dem realen Pie-active/ghost-Zustand abgeleitet.

Die gemeinsame Ruhe-/Hover-/Fokusoptik der aktiven Legend-Pill und die Canvas-Segment-Dämpfung bleiben unverändert.

## Visual-Board-Nachzug

Der statische Zustandsblock zeigt nun zusätzlich `Legend-Pill · Segment gedämpft`, neben Ruhe, Hover, Fokus und Datenreihe aus. Er verwendet ausschließlich bestehende Token und Utilities; der Bridge-Token `--color-grid` wird wie im Renderer direkt als CSS-Variable referenziert.

## Dokumentations-QA

- Zielstellen eindeutig vor dem Write geprüft.
- Konzept, Visual Board und die Ist-CSS des Renderers stimmen in Hintergrund, Border, Schatten, Opazität, Text- und Dot-Dämpfung überein.
- `git diff --check`: bestanden.
- Kein Code, keine Strategie, kein Tool, keine Testseite und kein `tokens.css` geändert.

## Nächster zulässiger Schritt

Die Legend-Pill-Dokumentation ist für gemeinsame Basis und beide belegten Fachzustände vollständig. Abschlusscommit der CE-5–CE-5d-/DOC-04-/DOC-04a-Kette kann vorbereitet werden; kein automatischer CE-6-Start.