Stand: 2026-07-24 | Session: PY-CACHE-01 | Geaendert von: Codex

# Patch-Quittung - PY-CACHE-01

## Auftrag

Python-Bytecode-Caches aus der Versionskontrolle entfernen und kuenftig ignorieren.

## Geaendert

1. `.gitignore`: ein neuer Block mit `__pycache__/`.
2. `tools/__pycache__/check-test-pages.cpython-314.pyc`: nur aus dem Git-Index entfernt; lokale Datei bleibt erhalten.
3. `tools/golden-master/__pycache__/repo_path_guard.cpython-314.pyc`: nur aus dem Git-Index entfernt; lokale Datei bleibt erhalten.
4. `tools/golden-master/__pycache__/validate_schema.cpython-314.pyc`: nur aus dem Git-Index entfernt; lokale Datei bleibt erhalten.

## Gate und Schutz

- Gate: Full.
- `.gitignore`: protected; explizite Begruendung und Albert-Freigabe liegen vor.
- Keine Layer-1-, App-, Theme-, Engine-, Daten- oder Ghost-Datei beruehrt.
- Kein Unlock erforderlich, da `.gitignore` protected und nicht forbidden ist.

## Nachweise

1. Alle drei lokalen `.pyc`-Dateien sind vorhanden.
2. `git check-ignore -v` ordnet alle drei Dateien der neuen Regel `__pycache__/` zu.
3. `python tools/golden-master/validate_package.py tests/golden-master/packages/af-gm-03-positive` liefert `PASS`.
