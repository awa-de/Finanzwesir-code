Stand: 2026-06-16 | Session: B1-AP-05 | Geändert von: Claude

# Patch-Quittung — B1-AP-05 A11y- und Mobile-Regeln

## PATCH-QUITTUNG | AP B1-AP-05 | 2026-06-16

| Feld | Wert |
|---|---|
| Beauftragt | AP-05: A11y- und Mobile-Regeln für Stationen-Zeitreise in APP_SPEC.md ergänzen |
| Geändert | 1 Datei, 6 Stellen |
| Gate-Typ | Full-Gate |
| CHANGED/NEW | N/A — Markdown-Patch, keine Code-Marker nötig |
| Tabu-Check | keine ✓ (FinanzwesirData.js, CSVParser.js, FwDateUtils.js nicht berührt) |

## Geänderte Datei

`Apps/prokrastinations-preis/APP_SPEC.md`

## Geänderte Stellen

| # | Stelle | Änderung |
|---|---|---|
| 1 | Zeile 3 (Stand-Datum) | V2.1 → V2.2, AP-Referenz auf AP-05 |
| 2 | §1 Status: Version | Draft V2.1 → Draft V2.2 |
| 3 | §1 Status: Nächster Schritt | B1-AP-05 → B1-AP-06 |
| 4 | §14 (komplett) | „A11y-Vertrag" (7 Subsektionen) → „A11y- und Mobile-Regeln" (15 Subsektionen, §14.0–§14.14) |
| 5 | §22 Gate-Checkliste | AP-05-Gate-Tabelle mit 19 Prüfpunkten ergänzt |
| 6 | §22 Nächster Schritt | B1-AP-05 → B1-AP-06 |

## Was §14 jetzt enthält

| Subsektion | Inhalt |
|---|---|
| 14.0 | Mobile-Grundsatz — Mobile als Standardfall + 8 Leitregeln |
| 14.1 | ARIA Live Region — erweitert um Stationswechsel-Ankündigung |
| 14.2 | Chart-Accessibility — Screen 2 vs. Screen 3 Beschreibung + Überladungsverbote |
| 14.3 | Slider — unverändert |
| 14.4 | KpiCards — unverändert |
| 14.5 | Stationen + Collapsible-Zwischenstand — Fokusführung Variante A/B + Collapsible-Spec + Collapsible-A11y + Desktop-Zwischenstand |
| 14.6 | prefers-reduced-motion — erweitert um Animation/Timing-Grenzen |
| 14.7 | Screen-Flow-Navigation — erweitert um Scroll-Verhalten |
| 14.8 | Mobile-Layout Screen 2 — vertikale Reihenfolge + Höhenproblem |
| 14.9 | Button-Position und Bedienbarkeit — Sticky-Entscheidung offen |
| 14.10 | Quellenlabel auf Mobile |
| 14.11 | Touch-Ziele und Abstand |
| 14.12 | Content-Dichte pro Station |
| 14.13 | Fehlermeldungen A11y |
| 14.14 | Verhältnis zu globalen Regeln + globale Folgearbeit |

## Nicht geändert

- `SLICE_PLAN.md` — AP-08-Scope
- `MINI_SPEC_FROM_HAUPTDOKUMENT.md` — AP-08-Scope
- `ENTSCHEIDUNGSPROTOKOLL.md` — keine Widersprüche
- `STATIONS_CONFIG_CONTRACT.md` — konsistent, keine Änderung nötig
- `app.js`, `app.css` — kein Code in AP-05
- `config/stations.de.json` — nicht angelegt (AP-09-Scope)

## Testfall

**Art:** Spec-Review (kein Live-Server-Test)

**Prüfpunkte:**
- `Apps/prokrastinations-preis/APP_SPEC.md` öffnen
- §14 auf Vollständigkeit prüfen: 15 Subsektionen (§14.0–§14.14) vorhanden?
- §14.5: Fokusführung Variante A/B + Collapsible-A11y lesbar?
- §14.8: vertikale Reihenfolge Screen 2 klar?
- §22: AP-05-Gate-Tabelle mit 19 Prüfpunkten vorhanden?
- Version in §1: V2.2?
- Nächster Schritt in §1 und §22: B1-AP-06?

## Offene Punkte für Folge-APs

| Punkt | AP |
|---|---|
| Sticky-Button-Entscheidung (technisch) | Coding-AP |
| Fokus-Variante A vs. B (finale Wahl) | Coding-AP |
| Collapsible: `<details>`/`<summary>` vs. ARIA-Expand | Coding-AP |
| Touch-Target globale Regeln | AP-08 oder globales Pattern-Update |
| Collapsible-A11y als App-Fabrik-Muster | AP-08 oder globales Pattern-Update |
| Chart-A11y-Labels als Chart-Engine-Regel | AP-08 oder globales Pattern-Update |

---

**Zählprüfung: 6 Stellen in 1 Datei.**

→ Bitte prüfe `Apps/prokrastinations-preis/APP_SPEC.md` §14 und §22. Ich warte vor dem nächsten Patch.
