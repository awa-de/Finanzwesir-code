---
name: raw-to-csv
description: Rohdatei (XLS/XLSX/CSV) in eine CSVParser-kompatible CSV umwandeln. Albert nennt Dateiname und Pfad in der Konversation, Codex liest den Dataset Contract und ruft tools/raw-to-csv.py auf.
---

# Skill: /raw-to-csv

## V1-Scope

Dieser Skill ist in V1 nur für MSCI-EUR-Indexreihen freigegeben.

Er nutzt `tools/raw-to-csv.py`, das bewusst:
- `EUR` als Suffix schreibt,
- Werte mit drei Nachkommastellen ausgibt,
- nur als Vorab-Konverter/Validator arbeitet,
- den produktiven CSVParser nicht ersetzt.

Andere Währungen, andere Einheiten oder andere Dezimalstellen erst nach expliziter Erweiterung.

## Auslöser

Albert schreibt sinngemäß:
> "Ich habe die Datei [Name] im Verzeichnis [Pfad]. Nutze den Skill /raw-to-csv."

Dateiname und Pfad kommen aus der Konversation — kein Argument im Befehl nötig.

## Schritt 1 — Quelldatei und Contract identifizieren

Aus der Konversation extrahieren:
- `source_file`: Dateiname (z.B. `historyIndex.xls`)
- `source_dir`: Verzeichnis (z.B. `data-raw/index/msci-world/`)
- Vollpfad: `{source_dir}/{source_file}`

Dataset Contract suchen: `docs/data/contracts/` nach einer `.md`-Datei durchsuchen,
deren `## Extraktion`-Block `source:` auf diesen Pfad zeigt.

## Schritt 2a — Contract mit Extraktions-Block gefunden

Den `## Extraktion`-Block aus dem Contract lesen und daraus den Aufruf bauen:

```
python tools/raw-to-csv.py \
  --source         {source} \
  --output         {output} \
  --header-row     {header_row} \
  --date-col       {date_col} \
  --date-format    "{date_format}" \
  --value-col      {value_col} \
  --expected-start {expected_start} \
  --min-rows       {min_rows}
```

Aufruf ausführen. Validierungsbericht ausgeben.

Bei Erfolg melden:
> "CSV liegt in `{output}` — [N] Zeilen, [Startdatum] bis [Enddatum]."

## Schritt 2b — Kein passender Contract / kein Extraktions-Block

### Neue Datenquelle (kein Contract)

1. Datei inspizieren (Python, erste 10 Datenzeilen ausgeben)
2. Struktur beschreiben: Wie viele Header-Zeilen? Welche Spalte ist Datum, welche Wert? Welches Datumsformat?
3. Vorschlag für Extraktions-Block machen:

```
source:         [Pfad zur Rohdatei]
output:         Theme/assets/data/b1/[dateiname].csv
header_row:     [N]
date_col:       [N]
date_format:    [Format]
value_col:      [N]
expected_start: [YYYY-MM-DD]
min_rows:       [N]
```

4. Albert bestätigt → Extraktions-Block in den Contract schreiben → Schritt 2a ausführen.

### Contract vorhanden, aber kein Extraktions-Block

Wie "Neue Datenquelle" — Block vorschlagen, bestätigen lassen, dann ausführen.

## Fehlerbehandlung

Wenn `tools/raw-to-csv.py` mit `[FAIL]` abbricht:
- Fehlermeldung direkt ausgeben
- Mögliche Ursache benennen (Lücke, Duplikat, falsches Datumsformat)
- Nicht selbst reparieren — Albert informieren

Wenn `xlrd` oder `openpyxl` fehlt:
- Das Script gibt die Install-Anweisung aus
- Pip-Befehl ausführen, dann erneut versuchen

## Referenzbeispiel

MSCI World Net Return EUR — erster vollständiger Durchlauf 2026-06-04:
- Rohdatei: `data-raw/index/msci-world/historyIndex.xls`
- Contract: `docs/data/contracts/msci-world-net-return-monthly.md`
- Ausgabe: `Theme/assets/data/b1/msci-world-net-return-eur-monthly.csv`
- 306 Zeilen, alle Checks grün
