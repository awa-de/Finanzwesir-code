Stand: 2026-06-15 | Session: kassensturz-idempotenz | Geändert von: Claude

# PATCH-QUITTUNG | Kassensturz-Idempotenz | 2026-06-15

**Beauftragt:** Kassensturz nur einmal pro Montag ausführen — Zustandsmarker via neuem HOOK-META-Feld `Kassensturz-Datum`

**Gate-Typ:** Full

---

## Geänderte Dateien (3 Dateien, 5 Stellen)

| Datei | Stelle | Art |
|---|---|---|
| `PROJECT-STATUS.md` | HOOK-META-Block: Zeile `Kassensturz-Datum: 2026-06-15` | NEW |
| `.claude/hooks/session-start.ps1` | Variable `$kassensturzDatum = "nie"` | NEW |
| `.claude/hooks/session-start.ps1` | Regex-Zweig `Kassensturz-Datum` im HOOK-META-Parse-Loop | NEW |
| `.claude/hooks/session-start.ps1` | `Write-Output "Kassensturz-Datum: $kassensturzDatum"` | NEW |
| `.claude/commands/start.md` | Letzter Block Schritt 5: Kassensturz-Logik mit Datum-Vergleich | CHANGED |

## CHANGED/NEW-Marker

`session-start.ps1`: alle 3 neuen Zeilen mit `# NEW` markiert.
Markdown-Dateien (`PROJECT-STATUS.md`, `start.md`): N/A.

## Tabu-Check

Keine Tabu-Zone, keine PROTECTED_PATHS-Kollision. ✓

## Logik nach Patch

```
Montag, Session 1 (Kassensturz-Datum ≠ heute):
  → Kassensturz läuft
  → start.md schreibt Kassensturz-Datum auf heutiges Datum in PROJECT-STATUS.md

Montag, Session 2+ (Kassensturz-Datum == heute):
  → „Kassensturz bereits heute ausgeführt — übersprungen."
```

## Testfall

1. Neuen Faden starten (`/start` aufrufen)
2. Hook-Output muss enthalten: `Kassensturz-Datum: 2026-06-15`
3. Kassensturz darf **nicht** laufen (Datum == heute)

Optional-Verifikation:
- `Kassensturz-Datum` in `PROJECT-STATUS.md` temporär auf `2026-06-08` setzen
- `/start` aufrufen → Kassensturz **muss** laufen
- `PROJECT-STATUS.md` muss danach `Kassensturz-Datum: 2026-06-15` enthalten

## Offene Fragen

Keine.
