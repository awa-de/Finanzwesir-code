# Pilot-Strategie — App-Fabrik

Stand: 2026-05-28 | E-02-Entscheidung | Geändert von: Claude
Quelle: ETF-App-Fabrik_Produktlandkarte_V0-2.md §10, App-Fabrik_Konsolidierung_Naechste-Schritte_V0-1.md §7

---

## Auswahlprinzip

Der erste Pilot wird nicht nach strategischer Wichtigkeit gewählt, sondern nach **Template-Nutzen**.

Die erste App muss:
- den Factory-Standard auf Herz und Nieren testen,
- nicht zu komplex sein (keine externe Datenpipeline),
- typische UI-Primitiven enthalten (Slider, KPIs, Counter, CTA),
- Wiederverwendung für 5+ weitere Apps erzwingen.

---

## Empfohlene Pilot-Reihenfolge

| Rang | App | Slug | Warum | Risiko |
|---|---|---|---|---|
| **1** | **Risiko-Übersetzer** | `risiko-uebersetzer` | Calculator-Pilot: App-Shell, Slider, Formel, KPI, CTA, State-Modell, A11y, Ghost-Card-Vertrag validieren | Konsumgut-Anker redaktionell abstimmen |
| 2 | Prokrastinations-Preis | `prokrastinations-preis` | Daten-/Chart-/Story-Pilot: JSON-Datenpipeline, historischer Chart, Screen-Flow, Entscheidungspunkt-Marker, AssumptionsBox validieren | Externe Datenpipeline und Chart-Engine als Zusatzkomplexität |
| 3 | ETF-Namensdecoder | `etf-namensdecoder` | Parser/Explainer-Template, kein Chart-Bedarf | Freitext-Parsing darf nicht ausufern |
| 4 | Geburtsjahrlos-Simulator | `geburtsjahrlos` | Nutzt vorhandenen Prototyp, testet Datenpipeline + Scenario Chart | Datenaufbereitung muss sauber ausgelagert sein |
| 5 | Weltkarte / Diversifikations-Detektor | `weltkarte-etf-indizes` → `diversifikations-detektor` | Nutzt vorhandenen Explorer-Prototyp | D3/TopoJSON und Overlap-Datenmodell sind Zusatzkomplexität |
| 6 | Regulatorik-Dashboard | `regulatorik-dashboard` | Wichtiges fertiges Material, aber Sonderfall-/Super-App-Gefahr | Nicht als erster Standard geeignet |

---

## Was die Piloten beweisen sollen

**Pilot-1 `risiko-uebersetzer` (Calculator-Pilot):**

1. **Calculator-Template** — wiederverwendbar für Calculator-Familie (prokrastinations-preis, weitere Apps)
2. **Slider + Formel + KPI + CTA** — validierte UI-Primitive für Ghost-Card-Einbettung
3. **Ghost-Card-Vertrag** — Copy/Paste-Beispiel für Redakteur
4. **A11y-Baseline** — Keyboard, ARIA, Screen-Flow ohne externe Daten
5. **Test-Gate** — was Albert testen muss, bevor eine App live geht

**Pilot-2 `prokrastinations-preis` (Daten-/Chart-/Story-Pilot):**

1. **JSON-Datenpipeline** — historische MSCI-Monatsdaten laden, validieren, verarbeiten
2. **SparplanChart** — historische Linie, Entscheidungspunkt-Marker, Chart-Engine-Integration
3. **Screen-Flow-Mechanismus** — 4 Screens sequentiell, Fokus-Management, A11y
4. **AssumptionsBox** — Pflicht-Transparenzblock für Daten-Apps
5. **Claude-Workflow-Verifikation** — welche vorhandenen Skills für datengetriebene Apps ausreichen

---

## Exit-Kriterien Pilot-1 `risiko-uebersetzer` (Pilot gilt als erfolgreich wenn)

- [ ] Alle vier States implementiert (Loading, Content, Error, Empty)
- [ ] Mobile-Test (375px) bestanden
- [ ] Config-JSON dokumentiert und von Albert ohne Claude-Hilfe anpassbar
- [ ] Ghost-Card-Beispiel funktioniert in einer Ghost-Testumgebung
- [ ] Calculator-Template ist explizit für `prokrastinations-preis` (Pilot-2) wiederverwendbar dokumentiert
- [ ] `/abschluss-ritual` erfolgreich ausgeführt

---

## Warum nicht Regulatorik-Dashboard als Pilot

Das Regulatorik-Dashboard ist bereits gebaut und inhaltlich stark. Als Factory-Pilot ist es aber riskant:

- zu viele Sonderfälle (Szenario-Matrix, Rentenphase-Logik)
- Single-HTML mit CDN-Abhängigkeiten (Tailwind, Chart.js)
- Gefahr: Sondermodell wird zum Standard erklärt

Richtige Reihenfolge: Erst kleine Templates härten, dann Regulatorik in diese Standards migrieren.

---

## Entschiedene Pilot-Reihenfolge (E-02)

**Pilot 1:** `risiko-uebersetzer` (technischer Calculator-Pilot) — entschieden 2026-05-28  
**Pilot 2:** `prokrastinations-preis` (Daten-/Chart-/Story-Pilot) — entschieden 2026-05-28

Begründung: Calculator-Mechanik zuerst härten (keine externe Datenpipeline), historische Datenpipeline und Chart als zweiter Komplexitätsschritt. → DECISION-LOG.md D-APP-01-E02
