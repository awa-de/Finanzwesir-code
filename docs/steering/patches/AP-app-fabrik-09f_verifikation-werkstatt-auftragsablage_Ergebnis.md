Stand: 2026-07-18 11:49 | Session: AP-app-fabrik-09f-Verifikation | Geändert von: Claude

# AP-app-fabrik-09f — Verifikation der Werkstatt-Auftragsablage — Ergebnis

Status: **GRÜN**.

Reine Verifikation mit zwei gültigen, schreibfreien Dry-Runs. Kein Werkzeug- und kein Bestandsdatei-Eingriff.

## Einordnung

- **AP-09f bleibt historisch korrekt GELB** und wird nicht überschrieben (`AP-app-fabrik-09f_werkstatt-auftragsablage_Ergebnis.md` unverändert). Diese Datei ergänzt nur die Nachprüfung.
- Der frühere `routing-probe`-Befehl war **absichtlich ungültig**: fremder Slug (`routing-probe`) plus fremde Mini-Spec (`Apps/depot-kipppunkt/…`). Er kann unter der strikten Validierung nicht grün sein — das war kein Werkzeugfehler.
- Die **Mini-Spec-Validierung bleibt strikt und unverändert** („Mini-Spec muss unter `Apps/<slug>/` liegen"). Der gültige Weg ist Slug + passende Mini-Spec derselben App.

## Ausgeführte Dry-Runs (beide grün, kein Schreiben)

```text
python tools/app-fabrik-psychosprint.py prepare --slug depot-kipppunkt \
    --app-name "Depot-Kipppunkt" --mini-spec "Apps/depot-kipppunkt/MINI_SPEC_FROM_HAUPTDOKUMENT.md"
  → DRY-RUN, Exit 0. Auftragsziel ausschließlich:
    tests/scratch/depot-kipppunkt/psychosprint/PSYCHOSPRINT_AUFTRAG.md
    (kein Archiv-Ziel; nichts geschrieben)

python tools/app-fabrik-psychosprint.py sonnet-paket --slug depot-kipppunkt --app-name "Depot-Kipppunkt"
  → DRY-RUN, Validierung OK, Exit 0. Auftragsziel ausschließlich:
    tests/scratch/depot-kipppunkt/mockup-duell/SONNET_AUFTRAG.md
    (kein Archiv-Ziel; nichts geschrieben)
```

Beide app-spezifischen Aufträge werden damit ausschließlich in der Werkstatt geführt:

```text
tests/scratch/depot-kipppunkt/psychosprint/PSYCHOSPRINT_AUFTRAG.md
tests/scratch/depot-kipppunkt/mockup-duell/SONNET_AUFTRAG.md
```

Kein Schreiben durch die Dry-Runs bestätigt; die beiden Zieldateien existieren bereits aus dem AP-09f-Move und wurden nicht berührt.

## Nächster zulässiger Schritt

Claude Sonnet liest ausschließlich `tests/scratch/depot-kipppunkt/mockup-duell/SONNET_AUFTRAG.md` und baut beide Werkstatt-Mockups.

## Patch-Quittung

- Angelegte Dateien: genau 1 (diese Datei)
- Scope-QA: grün
- Werkzeug und AP-09f-Ergebnisdatei unverändert
- Keine App-, Theme-, Engine-, Daten-, Test- oder Produktionsdatei geändert
