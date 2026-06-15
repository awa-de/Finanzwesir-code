---
name: project-datenlayer
description: "Datenlayer Governance-Layer für Finanzwesir 2.0 — Struktur, Regeln, offene APs"
metadata: 
  node_type: memory
  type: project
  originSessionId: e652efda-0392-492b-863e-31e0836a2034
---

Datenlayer als fachlich-redaktioneller Governance-Layer eingeführt (2026-06-03, Session Datenlayer-Setup).

**Warum:** Externe Finanzdaten sind redaktionelle Quellen, keine technischen Dateien. Ohne Layer entstehen dieselben Grundsatzfragen bei jeder App neu.

**Struktur:**
- `data-raw/` — Bronze-Zone (gitignored): Rohdaten vom Anbieter, unveränderlich. Unterordner: `index/[dataset]/`, `etf/[dataset]/`, `macro/[dataset]/`
- `docs/data/` — Governance-Regeln, Quellenhierarchie, Dataset Catalog, Contract Template, Return-Varianten, offene APs
- `Theme/assets/data/b1/` — produktive externe CSV-Dateien für Apps (Gold-Zone, versioniert)
- `tools/raw-to-csv.py` — Extraktions- und Validierungs-Script (XLS/XLSX/CSV → CSVParser-Format); 5 Checks; via Skill `/raw-to-csv` aufgerufen

**Kernentscheidungen dokumentiert:**
- CSVParser.js ist untouchable (forbidden) — nur nutzen, nie ändern
- Net Return ist starke Standardpräferenz für alle Aktienindex-Apps (MSCI World, S&P 500 usw.)
- ETF-Daten dürfen nicht als Indexdaten verwendet werden
- Source Tiers 0–4 definiert (Tier 0 = offizielle Quelle, Tier 4 = Foren/Blogs nur als Recherchehinweis)
- Data Need Snapshot Standard eingeführt (2026-06-03): Jede datengetriebene APP_SPEC enthält §7 Datenbedarf/Data Need Snapshot mit 10 Unterabschnitten (Wofür, Ideale Reihe, Mindeststandard, Nicht verwenden, CSV-Format, Produktive Anbindung, Klärungspflichten, CSV-Prüfprotokoll, Pflegehinweis, Berechnung). Standard dokumentiert in DATENQUELLEN-GOVERNANCE.md §Verhältnis zur App-Spec.

**APs (alle in docs/data/OFFENE-ARBEITSPUNKTE.md; aktive auch in BACKLOG.md):**
- AP-DATA-01: Quellenrecherche MSCI World Net Return — ✅ ABGESCHLOSSEN 2026-06-04; Quelle MSCI direkt (msci.com) Tier 0; EUR; Startdatum 2000-12-29 (korrigiert von Annahme 2002-01-31); Rohdatei historyIndex.xls in `data-raw/index/msci-world/`
- AP-DATA-02: Archivierte MSCI-Dateien prüfen — offen
- AP-DATA-03: Yahoo/Investing/Stooq bewerten — offen
- AP-DATA-04: Dataset Contract MSCI World Pilot — ✅ ABGESCHLOSSEN 2026-06-04; `docs/data/contracts/msci-world-net-return-monthly.md` angelegt; EUR-Suffix-Pflicht dokumentiert
- AP-DATA-05: Dateiname produktive CSV festlegen — ✅ ABGESCHLOSSEN 2026-06-04; `msci-world-net-return-eur-monthly.csv`; Ablageort `Theme/assets/data/b1/`
- AP-DATA-06: Optionales Validierungsskript — ✅ ABGESCHLOSSEN 2026-06-04; `tools/raw-to-csv.py` V1 freigegeben für MSCI-EUR-Indexreihen; kein CSVParser-Ersatz; nur Vorab-Konverter/Validator
- AP-DATA-07: App-Spec prokrastinations-preis auf Datenlayer umstellen — ✅ VOLLSTÄNDIG ERLEDIGT 2026-06-03 (APP_SPEC V1.5: §7 zu Datenbedarf/Data Need Snapshot mit 10 Unterabschnitten umgebaut)
- AP-DATA-08: Data Need Snapshot Blaupause für APP_SPEC.md dokumentieren — ✅ ABGESCHLOSSEN 2026-06-03 (Blaupause in `docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md §7a`)
- AP-DATA-09: Bestehende APP_SPEC.md nach Data-Need-Blaupause angleichen — offen (Rollout nach Alberts explizitem Auftrag)
- AP-DATA-10: data-raw Bronze-Architektur — ✅ ABGESCHLOSSEN 2026-06-04; `data-raw/index/|etf/|macro/` (type-first); .gitignore; README; DATENQUELLEN-GOVERNANCE.md + NAVIGATION.md aktualisiert
- AP-DATA-11: MSCI ACWI Net Return EUR monatlich — ✅ ABGESCHLOSSEN 2026-06-04; Contract `docs/data/contracts/msci-acwi-net-return-monthly.md`; CSV 306 Zeilen 2000-12-29 bis 2026-05-29 → `Theme/assets/data/b1/msci-acwi-net-return-eur-monthly.csv`. ACWI ist **Reserve-/Vergleichsdataset** für prokrastinations-preis — nicht automatisch operative B1-Slice-0-Datenreihe. Operative Datenreihe bleibt MSCI World bis ausdrückliche Umstellung.
- ST-17: tools/raw-to-csv.py + /raw-to-csv Skill — ✅ ABGESCHLOSSEN 2026-06-04; XLS/XLSX/CSV → CSVParser-Format; 5 Validierungschecks; Contract-gesteuert; Albert nennt Datei + Pfad

**Währungs-Validierungskette (2026-06-04):** CSVParser V4.2 erkennt Währungssuffix aus Datenwerten → `unitKey` in `FinanzwesirData.metadata`. App (MarketTimeStrategy) prüft `unitKey === CURRENCY_EUR`; Abweichung → Error State (c); kein stilles Versagen. Redakteur-Pflicht: `index_value`-Werte mit `EUR`-Suffix. Skalierbar: jede App deklariert eigene Währungsanforderung in APP_SPEC §7 und prüft in eigener Strategy. Kein zentrales Framework nötig.

**How to apply:** Bei jeder App-Arbeit mit externen Finanzdaten zuerst `docs/data/DATENQUELLEN-GOVERNANCE.md` lesen. Neue Datasets brauchen einen Contract (Template: `docs/data/DATASET-CONTRACT-TEMPLATE.md`).

Verwandte Memories: [[project-app-fabrik-struktur]]
