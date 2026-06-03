Stand: 2026-06-03 | Erstellt von: Claude | Session: Datenlayer-Setup

# Datenlayer — Finanzwesir 2.0

## Was ist der Datenlayer?

Der Datenlayer ist der fachlich-redaktionelle Governance-Layer für externe Finanzdaten in Finanzwesir 2.0.

Er ist kein technischer Parser. Er definiert, welche Datenquellen zulässig sind, wie Datasets dokumentiert werden, welche Return-Varianten bevorzugt werden, wer Datenhoheit hat und was Claude niemals eigenmächtig ändern darf.

## Warum existiert er?

Externe Finanzdaten sind für Finanzwesir 2.0 keine technischen Dateien — sie sind redaktionelle Quellen.

Ohne Datenlayer entstehen typische Fehler:
- Eine App entscheidet eigenmächtig über Quellen
- Ein LLM wählt eine längere, aber fachlich schlechtere Reihe
- Indexdaten werden mit ETF-Daten verwechselt
- Price Return wird verwendet, obwohl Net Return gewünscht ist
- Währung, Return-Variante, Frequenz und Quelle bleiben undokumentiert
- Bei späteren Apps wird dieselbe Diskussion erneut geführt

## Zentrale Architekturentscheidung

> Der CSVParser bleibt Infrastruktur. Der Datenlayer ist Governance.

```
docs/data/                 = Warum, Quelle, Qualität, Regeln, Contracts
Theme/assets/data/b1/      = produktive externe CSV-Dateien
Theme/assets/js/.../data/  = bestehende technische Verarbeitung, untouchable für CSV
apps/...                   = konkrete App nutzt freigegebenes Dataset
```

## Was gehört hinein?

- Fachliche Entscheidungen über Datenquellen
- Return-Variantenpräferenzen
- Quellenhierarchie und Qualitätsstufen
- Dataset Contracts (je freigegebenes Dataset)
- Offene Arbeitspunkte

## Was gehört ausdrücklich nicht hinein?

- Technische Parser-Logik (→ `CSVParser.js`, untouchable)
- App-spezifische Implementierungen (→ `apps/`)
- Produktive CSV-Daten (→ `Theme/assets/data/b1/`)
- Professionelle Terminal-Abhängigkeiten (Bloomberg, Refinitiv, FactSet usw.)

## Struktur

| Datei | Zweck |
|---|---|
| `README.md` | Diese Datei — Einstieg |
| `DATENQUELLEN-GOVERNANCE.md` | Zentrales Regelwerk |
| `SOURCE-TIERS.md` | Quellenhierarchie |
| `DATASET-CATALOG.md` | Liste aller Datasets |
| `DATASET-CONTRACT-TEMPLATE.md` | Vorlage für Dataset Contracts |
| `INDEX-RETURN-VARIANTEN.md` | Return-Variantenregel für Aktienindizes |
| `OFFENE-ARBEITSPUNKTE.md` | Offene Aufgaben mit IDs |
| `contracts/` | Individuelle Dataset Contracts (angelegt wenn erstes Dataset freigegeben) |
