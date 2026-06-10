Stand: 2026-06-10 | Session: OA-02-Dissens-2 | Geändert von: Claude

# PATCH-QUITTUNG | OA-02-Dissens-2 | 2026-06-10

```
PATCH-QUITTUNG | AP OA-02-Dissens-2 | 2026-06-10
Beauftragt:    Befund "Vereinheitlichung auf der richtigen Ebene" in vier
               produktive Dokumente überführen — zwei offizielle ChartEngine-
               Einstiege, gemeinsamer Kern, Verantwortungsgrenzen explizit.
Geändert:      4 Datei(en), 10 Stelle(n)
Dateien:       docs/spec/APP-INTERFACE.md (3 Stellen)
               docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md (2 Stellen)
               docs/spec/ARCHITECTURE STRATEGY PAPER VX.md (3 Stellen)
               docs/steering/DECISION-LOG.md (2 Stellen)
CHANGED/NEW:   N/A — reiner Markdown-Patch, keine Code-Marker nötig
Tabu-Check:    keine ✓ — Layer-1 (FinanzwesirData.js, CSVParser.js,
               FwDateUtils.js) und alle Code-Dateien unberührt
Gate-Typ:      Full
Testfall:      Kein ausführbarer Code — Verifikation durch Lesen der 4 Dateien:
               • APP-INTERFACE.md §4: „offen"-Vermerk weg, zwei Pfade benannt,
                 Verantwortungsgrenzen explizit, §3 unverändert?
               • CHART_ENGINE_ROLE_AND_INTEGRATION.md §1: Bridge-Pfad drin,
                 „kein App-State-Manager"-Satz explizit, P-01–P-10 unverändert?
               • ARCHITECTURE STRATEGY PAPER VX.md: Layer-1 zwei Produzenten,
                 KDR 1–14 unverändert, Appendix-A-Verweis vorhanden?
               • DECISION-LOG.md: D-OA-02-2 vorhanden, Stand-Datum 2026-06-10?
Offene Fragen: Verifikationsbedarf aus dem Befund bleibt offen (vor
               ChartEngine.js-Implementierung zu klären):
               — Ist init() heute scope-parametrierbar?
               — Hat Layer 2 eine interne Trennlinie CSV vs. fertige Daten?
               — Existiert bereits ein Container-Guard?
               — Gibt es destroy() auf Container-Ebene?
```

## Geänderte Stellen (Detail)

### docs/spec/APP-INTERFACE.md

1. **Stand-Datum** (Zeile 3): `OA-02-Dissens-1` → `OA-02-Dissens-2`, Datum 2026-06-10
2. **§4 Interner Entwicklervertrag**: „offen"-Vermerk und „Langfristig:"-Zeile ersetzt durch beschlossenen Befund — zwei offizielle Einstiege, Verantwortungsgrenzen, Lifecycle-Ankündigung
3. **§10 Tabelle**: Eintrag „ChartAdapter/API — offen" → „ChartEngine-Einstiegspfade — beschlossen OA-02-Dissens-2"

### docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md

4. **Stand-Datum** (Zeile 3): `COMP-ARCH-01-Nachputz` → `OA-02-Dissens-2`, Datum 2026-06-10
5. **§1, neuer Unterabschnitt** nach „Einordnung in die Component Composition Architecture": „Zwei offizielle Einstiege — ein gemeinsamer Kern" mit Pfad-1/Pfad-2-Beschreibung und Verantwortungstabelle

### docs/spec/ARCHITECTURE STRATEGY PAPER VX.md

6. **§0 Präambel, Layer-1-Absatz**: „aus der CSV" → „aus der CSV oder über den Daten-Bridge-Pfad als app-berechnete, versiegelte Objekte"
7. **Dateimatrix-Tabelle, Layer-1-Zelle**: Ergänzung „Zwei zulässige Produzenten" nach API-Beschreibung
8. **Appendix A, Ende**: Neuer Absatz „Pfad 2 — App-berechnete Daten (Daten-Bridge)" mit Verweis auf D-OA-02-2

### docs/steering/DECISION-LOG.md

9. **Stand-Datum** (Zeile 1): `B1-CSV-Guardrail` → `OA-02-Dissens-2`, Datum 2026-06-10
10. **Neuer Eintrag D-OA-02-2** am Ende: Problem, Entscheidung, Begründung, Alternativen, Konsequenzen, Invariante, Revisit
