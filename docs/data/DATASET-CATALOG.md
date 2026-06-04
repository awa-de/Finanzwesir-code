Stand: 2026-06-04 | Geändert von: Claude | Session: AP-DATA-01-04-05-Abschluss

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
| msci-world-net-return-monthly | `Theme/assets/data/b1/msci-world-net-return-eur-monthly.csv` | Index | MSCI direkt (msci.com), Tier 0, ab 2000-12-29 | Net Return | EUR (entschieden B-01-B, 2026-06-04) | monatlich | in Arbeit | prokrastinations-preis; später weitere Prinzip-Apps | Projektinhaber |

---

## Hinweise zum Eintrag msci-world-net-return-monthly

- **Quelle:** MSCI direkt (msci.com), Tier 0. Startdatum 2000-12-29 (tatsächlicher erster Datenpunkt). Rohdatei `historyIndex.xls` liegt in `Datenquellen für Apps/`.
- **Dateiname:** `msci-world-net-return-eur-monthly.csv` — entschieden 2026-06-04 (AP-DATA-05).
- **Contract:** `docs/data/contracts/msci-world-net-return-monthly.md` — angelegt 2026-06-04 (AP-DATA-04).
- **Variante:** Net Return. Abweichung nur nach ausdrücklicher Entscheidung des Projektinhabers (→ `INDEX-RETURN-VARIANTEN.md`).
- **Nächster Schritt:** CSV aus Rohdatei generieren → `Theme/assets/data/b1/` (APP-01-B01 offen).

---

## Neue Datasets hinzufügen

Vor Anlage eines neuen Eintrags:
1. Quelle prüfen und Tier bestimmen (→ `SOURCE-TIERS.md`)
2. Variante, Währung, Frequenz klären
3. Dataset Contract auf Basis der Vorlage erstellen (→ `DATASET-CONTRACT-TEMPLATE.md`)
4. Eintrag hier ergänzen
5. Projektinhaber bestätigt Freigabe → Status auf „freigegeben" setzen
