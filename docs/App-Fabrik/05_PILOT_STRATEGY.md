# Pilot-Strategie — App-Fabrik

Stand: 2026-05-09 | Arbeitsstand | Geändert von: Claude
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
| **1** | **Prokrastinations-Preis** | `prokrastinations-preis` | Einfachster Calculator, keine externen Daten, erzwingt Slider/KPI/Counter/CTA-Standard | Renditeannahmen müssen seriös wirken |
| 2 | Risiko-Übersetzer | `risiko-uebersetzer` | Gleiche Calculator-Familie, Ankerlisten-Config testet JSON-Workflow | Konsumgut-Anker redaktionell abstimmen |
| 3 | ETF-Namensdecoder | `etf-namensdecoder` | Parser/Explainer-Template, kein Chart-Bedarf | Freitext-Parsing darf nicht ausufern |
| 4 | Geburtsjahrlos-Simulator | `geburtsjahrlos` | Nutzt vorhandenen Prototyp, testet Datenpipeline + Scenario Chart | Datenaufbereitung muss sauber ausgelagert sein |
| 5 | Weltkarte / Diversifikations-Detektor | `weltkarte-etf-indizes` → `diversifikations-detektor` | Nutzt vorhandenen Explorer-Prototyp | D3/TopoJSON und Overlap-Datenmodell sind Zusatzkomplexität |
| 6 | Regulatorik-Dashboard | `regulatorik-dashboard` | Wichtiges fertiges Material, aber Sonderfall-/Super-App-Gefahr | Nicht als erster Standard geeignet |

---

## Was der Pilot beweisen soll

Mit `prokrastinations-preis` als erstem Piloten entstehen:

1. **Calculator-Template** — wiederverwendbar für 5+ weitere Calculator-Apps
2. **Config-JSON-Workflow** — wie Config entsteht, validiert und deployed wird
3. **Ghost-Card-Vertrag** — Copy/Paste-Beispiel für Redakteur
4. **Test-Gate** — was Albert testen muss, bevor eine App live geht
5. **Claude-Workflow-Verifikation** — welche vorhandenen Skills ausreichen, was fehlt

---

## Exit-Kriterien (Pilot gilt als erfolgreich wenn)

- [ ] Alle vier States implementiert (Loading, Content, Error, Empty)
- [ ] Mobile-Test (375px) bestanden
- [ ] Config-JSON dokumentiert und von Albert ohne Claude-Hilfe anpassbar
- [ ] Ghost-Card-Beispiel funktioniert in einer Ghost-Testumgebung
- [ ] Calculator-Template ist explizit für `risiko-uebersetzer` wiederverwendbar dokumentiert
- [ ] `/abschluss-ritual` erfolgreich ausgeführt

---

## Warum nicht Regulatorik-Dashboard als Pilot

Das Regulatorik-Dashboard ist bereits gebaut und inhaltlich stark. Als Factory-Pilot ist es aber riskant:

- zu viele Sonderfälle (Szenario-Matrix, Rentenphase-Logik)
- Single-HTML mit CDN-Abhängigkeiten (Tailwind, Chart.js)
- Gefahr: Sondermodell wird zum Standard erklärt

Richtige Reihenfolge: Erst kleine Templates härten, dann Regulatorik in diese Standards migrieren.

---

## Offene Entscheidung für Albert

**Welche App soll der erste Pilot sein?**

Empfehlung: `prokrastinations-preis`  
Alternative: `risiko-uebersetzer` (mehr Fachlogik, stärkerer emotionaler Hebel)

→ Bitte in `01_DECISION_LOG.md` unter P-01 eintragen, wenn entschieden.
