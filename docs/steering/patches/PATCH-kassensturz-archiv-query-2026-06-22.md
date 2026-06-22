Stand: 2026-06-22 | Session: kassensturz-archiv-query | Geändert von: Claude

# PATCH-QUITTUNG | kassensturz-archiv-query | 2026-06-22

## Auftrag
Python-Skript für deterministischen Datumsvergleich im Kassensturz + SKILL.md-Anpassung zur Einbindung.

Hintergrund: Kassensturz meldete „Abgeschlossen seit KW N-1: nicht berechenbar", obwohl BACKLOG-ARCHIV.md
ISO-Daten enthält. Ursache: LLM-basierter Scout für Datumsvergleich unzuverlässig.
Lösung: Python-Skript (deterministisch) übernimmt die Filterlogik.

## Geänderte Dateien

| Datei | Art | Stellen |
|-------|-----|---------|
| `tools/kassensturz-archiv-query.py` | NEU | 1 (Gesamtdatei, ~50 Zeilen) |
| `.claude/skills/kassensturz/SKILL.md` | EDIT | 3 |

## Stellen im Detail

### tools/kassensturz-archiv-query.py (NEU)
- Argument-Parsing: `--since YYYY-MM-DD`, `--archiv` (default: docs/steering/BACKLOG-ARCHIV.md)
- Markdown-Tabelle parsen: Spalten von rechts (parts[-3] = Abgeschlossen) — robust gegen Pipes im Titel
- Datum-Filter: `abgeschlossen > since` (exklusiv)
- Ausgabe: `ABGESCHLOSSEN_SEIT: N` + `AP_IDS: id1, id2, ...`

### SKILL.md — Stelle 1: Neuer Schritt 1c
Schritt 1c „Python-Abfrage" nach 1b eingefügt:
`python tools/kassensturz-archiv-query.py --since [Kassensturz-Datum aus HOOK-META]`
Fallback bei Skript-Fehler explizit benannt.

### SKILL.md — Stelle 2: Output-Format
`Abgeschlossen seit KW [N-1]: [N]` → `[N] — [AP-IDs aus Python-Skript]`

### SKILL.md — Stelle 3: Hinweis „Wenn Basisdaten fehlen"
Veralteten Text „BACKLOG-ARCHIV.md enthält keine einheitlichen KW-Angaben" entfernt.
Ersetzt durch: Skript-Fehler-Fallback + Erklärung warum „Neu hinzugekommen" weiterhin nicht berechenbar.

## Tabu-Check
- FinanzwesirData.js: nicht berührt ✓
- CSVParser.js: nicht berührt ✓
- FwDateUtils.js: nicht berührt ✓
- PROTECTED_PATHS: nicht berührt ✓
- BACKLOG-ARCHIV.md: nur gelesen, nicht beschrieben ✓

## Gate-Typ
Full (2 Dateien)

## Smoke-Test (bereits durchgeführt)
```
python tools/kassensturz-archiv-query.py --since 2026-06-15
ABGESCHLOSSEN_SEIT: 31
AP_IDS: B1-AP-14e5, B1-AP-14e4, B1-AP-14e3, ...
```
Ergebnis: korrekt ✓

## Testfall für Albert
```
python tools/kassensturz-archiv-query.py --since 2026-06-15
```
Erwartung: ABGESCHLOSSEN_SEIT: 31, AP_IDS-Liste mit B1-AP-14e5 an erster Stelle.
Dann: /kassensturz ausführen → Feld „Abgeschlossen seit KW 25" zeigt 31 statt „nicht berechenbar".
