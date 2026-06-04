Stand: 2026-06-04 | Geändert von: Claude | Session: raw-to-csv-acwi

# Dataset Catalog — Finanzwesir 2.0

Liste aller freigegebenen, geplanten und archivierten Datasets.

---

## Statuswerte

| Status | Bedeutung |
|---|---|
| geplant | Bedarf identifiziert, Quelle noch nicht gesichert |
| in Arbeit | Quellenrecherche oder Aufbereitung läuft |
| freigegeben | Datei liegt, Contract existiert, App nutzt Dataset |
| veraltet | Neuere Version ersetzt dieses Dataset |
| gesperrt | Nicht verwenden — Qualitätsproblem oder Rechtefrage |

---

## Aktive Datasets

| Dataset-ID | Datei | Datenklasse | Quelle | Variante | Währung | Frequenz | Status | Apps | Owner |
|---|---|---|---|---|---|---|---|---|---|
| msci-world-net-return-monthly | `Theme/assets/data/b1/msci-world-net-return-eur-monthly.csv` | Index | MSCI direkt (msci.com), Tier 0, ab 2000-12-29 | Net Return | EUR | monatlich | freigegeben | prokrastinations-preis; später weitere Prinzip-Apps | Projektinhaber |
| msci-acwi-net-return-monthly | `Theme/assets/data/b1/msci-acwi-net-return-eur-monthly.csv` | Index | MSCI direkt (msci.com), Tier 0, ab 2000-12-29 | Net Return | EUR | monatlich | freigegeben | prokrastinations-preis; später weitere Prinzip-Apps | Projektinhaber |

---

## Hinweise zum Eintrag msci-world-net-return-monthly

- **Quelle:** MSCI direkt (msci.com), Tier 0. Startdatum 2000-12-29. Rohdatei `historyIndex.xls` liegt in `data-raw/index/msci-world/`.
- **Contract:** `docs/data/contracts/msci-world-net-return-monthly.md` — angelegt 2026-06-04 (AP-DATA-04).
- **Variante:** Net Return. Abweichung nur nach ausdrücklicher Entscheidung des Projektinhabers (→ `INDEX-RETURN-VARIANTEN.md`).
- **Status:** freigegeben — CSV 306 Zeilen, 2000-12-29 bis 2026-05-29, alle Checks grün (APP-01-B01 abgeschlossen 2026-06-04).

## Hinweise zum Eintrag msci-acwi-net-return-monthly

- **Quelle:** MSCI direkt (msci.com), Tier 0. Startdatum 2000-12-29. Rohdatei `historyIndex.xls` liegt in `data-raw/index/msci-acwi/`.
- **Contract:** `docs/data/contracts/msci-acwi-net-return-monthly.md` — angelegt 2026-06-04 (AP-DATA-11).
- **Variante:** Net Return. Abweichung nur nach ausdrücklicher Entscheidung des Projektinhabers (→ `INDEX-RETURN-VARIANTEN.md`).
- **Status:** freigegeben — CSV 306 Zeilen, 2000-12-29 bis 2026-05-29, alle Checks grün (AP-DATA-11 abgeschlossen 2026-06-04).

---

## Neue Datasets hinzufügen

Vor Anlage eines neuen Eintrags:
1. Quelle prüfen und Tier bestimmen (→ `SOURCE-TIERS.md`)
2. Variante, Währung, Frequenz klären
3. Dataset Contract auf Basis der Vorlage erstellen (→ `DATASET-CONTRACT-TEMPLATE.md`)
4. Eintrag hier ergänzen
5. Projektinhaber bestätigt Freigabe → Status auf „freigegeben" setzen
