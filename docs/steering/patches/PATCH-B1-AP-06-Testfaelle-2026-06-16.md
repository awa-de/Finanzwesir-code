Stand: 2026-06-16 | Session: B1-AP-06 | Geändert von: Claude

# Patch-Quittung — B1-AP-06 Testfälle aktualisieren

## PATCH-QUITTUNG | AP B1-AP-06 | 2026-06-16

| Feld | Wert |
|---|---|
| Beauftragt | AP-06: QA-Testfälle und Abnahmekriterien für Stationen-Zeitreise anlegen |
| Geändert | 2 Dateien, 5 Stellen |
| Gate-Typ | Full-Gate |
| CHANGED/NEW | N/A — Markdown-Patch, keine Code-Marker nötig |
| Tabu-Check | keine ✓ (FinanzwesirData.js, CSVParser.js, FwDateUtils.js nicht berührt) |

## Geänderte Dateien

1. `Apps/prokrastinations-preis/QA_TEST_CASES.md` — neu angelegt
2. `Apps/prokrastinations-preis/APP_SPEC.md` — 4 Stellen

## Geänderte Stellen

| # | Datei | Stelle | Änderung |
|---|---|---|---|
| 1 | `QA_TEST_CASES.md` | komplett (neu) | 12 Testgruppen A–L, 23 Testfälle im TC-Format, manuell/automatisierbar-Übersicht |
| 2 | `APP_SPEC.md` | Zeile 3 (Stand-Datum) | V2.2 → V2.3, AP-Referenz auf AP-06 |
| 3 | `APP_SPEC.md` | §1 Status | Version V2.2 → V2.3 / Phase AP-06 ✅ ergänzt / Nächster Schritt AP-06 → AP-07 |
| 4 | `APP_SPEC.md` | §19 (oben) | Referenzblock zu QA_TEST_CASES.md + Muss-Kurzliste (8 Einträge) eingefügt |
| 5 | `APP_SPEC.md` | §22 Nächster Schritt | B1-AP-06 → B1-AP-07 |

## Was QA_TEST_CASES.md enthält

| Gruppe | Testfälle | Muss |
|---|---|---|
| A — Datenladen und Validierung | TC-A01, A02, A03 | alle 3 |
| B — Rolling Window und Stationenfilter | TC-B01, B02, B03, B04 | alle 4 |
| C — Screen-Flow | TC-C01, C02 | C01 |
| D — Screen 2 Stationen-Zeitreise | TC-D01, D02, D03, D04, D05 | alle 5 |
| E — Screen 3 Reveal | TC-E01, E02, E03 | alle 3 |
| F — Screen 4 Transfer | TC-F01, F02 | beide |
| G — Mobile und Collapsible | TC-G01, G02, G03 | G01, G02 |
| H — Accessibility | TC-H01, H02, H03, H04 | H01, H02, H03 |
| I — Reduced Motion | TC-I01 | ja |
| J — Visual- und Ethikregeln | TC-J01, J02 | beide |
| K — Fehler- und Empty-States | TC-K01, K02, K03 | K01, K02 |
| L — Regression gegen alte Logik | TC-L01, L02 | L01 |

**Gesamt: 23 Testfälle; 18 davon Priorität Muss.**

## Nicht geändert

- `SLICE_PLAN.md` — AP-08-Scope
- `MINI_SPEC_FROM_HAUPTDOKUMENT.md` — AP-08-Scope
- `ENTSCHEIDUNGSPROTOKOLL.md` — konsistent, keine Änderung nötig
- `STATIONS_CONFIG_CONTRACT.md` — konsistent, keine Änderung nötig
- `APP_SPEC.md §19` T-01–T-40 — bleiben unverändert (Kurzreferenz)
- `app.js`, `app.css` — kein Code in AP-06
- `config/stations.de.json` — nicht angelegt (AP-09-Scope)

## Testfall

**Art:** Spec-Review (kein Live-Server-Test)

**Prüfpunkte:**
- `Apps/prokrastinations-preis/QA_TEST_CASES.md` öffnen
- 12 Gruppen A–L vorhanden?
- Stichprobe: TC-D01 (Teilchart), TC-D02 (keine KPI-Cards), TC-E02 (KPIs erst Screen 3), TC-L01 (Regression)?
- Manuell/automatisierbar-Übersicht vorhanden?
- `Apps/prokrastinations-preis/APP_SPEC.md §19` öffnen
- Referenzblock zu `QA_TEST_CASES.md` am Anfang von §19?
- Muss-Kurzliste (8 Punkte) vorhanden?
- Version V2.3 + Nächster Schritt AP-07 in §1?

## Offene Punkte für Folge-APs

| Punkt | AP |
|---|---|
| Redaktions-Gate vollständig dokumentieren | AP-07 |
| Widersprüchliche Stellen in SLICE_PLAN.md und MINI_SPEC_FROM_HAUPTDOKUMENT.md bereinigen | AP-08 |
| Testfälle bei Coding-Beginn ausführen | Coding-AP |
| Automatisierbare Tests (TC-A02, TC-B01–B04 etc.) implementieren | Coding-AP |

---

**Zählprüfung: 5 Stellen in 2 Dateien.**

→ Bitte prüfe `Apps/prokrastinations-preis/QA_TEST_CASES.md` und `APP_SPEC.md §19`. Ich warte vor dem nächsten Patch.
