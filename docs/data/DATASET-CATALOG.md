Stand: 2026-06-03 | Erstellt von: Claude | Session: Datenlayer-Setup

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
| msci-world-net-return-monthly | `Theme/assets/data/b1/[Dateiname offen — AP-DATA-05]` | Index | MSCI direkt ab 31.01.2002; ältere Quelle offen (AP-DATA-01/02) | Net Return stark bevorzugt | offen — USD oder EUR (AP-DATA-01) | monatlich | in Arbeit | prokrastinations-preis; später weitere Prinzip-Apps | Projektinhaber |

---

## Hinweise zum Eintrag msci-world-net-return-monthly

- **Quelle:** MSCI direkt liefert aktuell ab 31.01.2002. Für längere Historien laufen
  die Recherchen AP-DATA-01 und AP-DATA-02.
- **Dateiname:** Steht erst fest wenn Währung geklärt ist (→ AP-DATA-05).
- **Contract:** Noch nicht erstellt — wird Gegenstand von AP-DATA-04.
- **Variante:** Net Return ist stark bevorzugt. Abweichung nur nach ausdrücklicher
  Entscheidung des Projektinhabers (→ `INDEX-RETURN-VARIANTEN.md`).

---

## Neue Datasets hinzufügen

Vor Anlage eines neuen Eintrags:
1. Quelle prüfen und Tier bestimmen (→ `SOURCE-TIERS.md`)
2. Variante, Währung, Frequenz klären
3. Dataset Contract auf Basis der Vorlage erstellen (→ `DATASET-CONTRACT-TEMPLATE.md`)
4. Eintrag hier ergänzen
5. Projektinhaber bestätigt Freigabe → Status auf „freigegeben" setzen
