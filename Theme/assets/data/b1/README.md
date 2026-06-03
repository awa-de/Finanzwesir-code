Stand: 2026-06-03 | Erstellt von: Claude | Session: Datenlayer-Setup

# Theme/assets/data/b1/ — Externe B1-Datendateien

Dieses Verzeichnis enthält externe B1-Datendateien, die von Finanzwesir-2.0-Apps geladen werden.

---

## Was bedeutet B1?

B1 steht für:
- **Externe Datenbasis** — nicht von der App selbst erzeugt
- **Redaktionell gepflegt** — vom Projektinhaber erstellt und aktualisiert
- **Von Apps konsumiert** — Apps lesen, verarbeiten und zeigen diese Daten
- **Nicht von Claude erfunden** — keine interpolierten oder generierten Werte
- **Nicht vom Parser erzeugt** — CSVParser verarbeitet die Daten, erzeugt sie nicht

---

## Format

Externe Datendateien folgen dem Format des bestehenden CSVParser:

- Semikolon als Trennzeichen
- Komma als Dezimalzeichen
- Datum im Format YYYY-MM-DD
- Monatsultimo bei monatlichen Daten
- Keine Kommentarzeilen
- Keine Leerzeilen innerhalb der Daten

Beispiel:
```
Datum;Wert
2002-01-31;1234,56
2002-02-28;1256,78
```

---

## Regeln

- **Jede CSV braucht einen Dataset Contract** — in `docs/data/contracts/[dataset-id].md`
- **Keine Daten ohne Dokumentation** — Quelle, Variante, Währung, Frequenz sind Pflicht
- **Keine manuelle Änderung durch Claude ohne Freigabe** — Datenhoheit liegt beim Projektinhaber
- **CSVParser ist untouchable** — liegt unter `Theme/assets/js/fw-chart-engine/data/CSVParser.js`
- **Keine Beispieldaten als produktive Daten** — Testdaten gehören nicht in dieses Verzeichnis

---

## Governance

Fachliche Regeln für dieses Verzeichnis: `docs/data/DATENQUELLEN-GOVERNANCE.md`
Quellenhierarchie: `docs/data/SOURCE-TIERS.md`
Dataset-Liste: `docs/data/DATASET-CATALOG.md`
