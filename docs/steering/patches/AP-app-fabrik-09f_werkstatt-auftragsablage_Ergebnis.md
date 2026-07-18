Stand: 2026-07-18 11:40 | Session: AP-app-fabrik-09f | Geändert von: Claude

# AP-app-fabrik-09f — App-spezifische Aufträge vollständig in die Werkstatt — Ergebnis

Status: **GELB**. Ziel erreicht (alle app-spezifisch erzeugten Aufträge liegen in `tests/scratch/<slug>/`; nur generische Vorlagen im Archiv, Werkzeug unter `tools/`). Einzige Lücke: der wörtlich vorgeschriebene `routing-probe`-Dry-Run bleibt rot — bewusste Folge von Alberts Entscheidung, die Mini-Spec-Validierung strikt zu lassen (siehe unten). Die positive Routing-Prüfung übernimmt der Self-Test.

`tests/scratch/risiko-uebersetzer/` wurde in diesem AP nicht gelesen oder verwendet.

## Widerspruch im AP-Text (vor dem Schreiben gemeldet, Albert-Entscheidung eingeholt)

AP-09f verlangt „im Werkzeug **nur** app-spezifische Ausgabeziele ändern", der vorgeschriebene Verifikations-Dry-Run ruft aber `prepare --slug routing-probe --mini-spec Apps/depot-kipppunkt/…` mit **fremdem** App-Ordner auf. Die bestehende Validierung „Mini-Spec muss unter `Apps/<slug>/` liegen" (aus AP-09/Original-Spec) blockiert das. **Albert-Entscheidung: Validierung strikt lassen.** Damit ist der `routing-probe`-Dry-Run erwartungsgemäß rot; ich habe die Validierung **nicht** angefasst.

## Exakte Änderungen (genau 4 Dateien)

**Geändert (1):** `tools/app-fabrik-psychosprint.py` — nur zwei app-spezifische Ausgabeziele und die zugehörigen Self-Test-Erwartungen/Ausgabetexte (`# NEW`-markiert):
- `prepare`: Auftrag → `tests/scratch/<slug>/psychosprint/PSYCHOSPRINT_AUFTRAG.md` (vorher `Archiv/.../AP-app-fabrik-09_psychosprint_<slug>.md`). Label „Psychosprint-Auftrag".
- `sonnet-paket`: Auftrag → `tests/scratch/<slug>/mockup-duell/SONNET_AUFTRAG.md` (vorher `Archiv/.../AP-app-fabrik-09_mockup-duell-sonnet_<slug>.md`). Label „Sonnet-Auftrag".
- Self-Test prüft jetzt die zwei Werkstatt-Auftragspfade und dass **nichts** ins Archiv geschrieben wird. Nicht-Überschreiben, Validierung, A=Sol/B=Fable, SHA-256, Root-Schutz, UTF-8, Exit-Codes unverändert.

**Verschoben (2, bytegleich):**
- `Archiv/…/AP-app-fabrik-09_psychosprint_depot-kipppunkt.md` → `tests/scratch/depot-kipppunkt/psychosprint/PSYCHOSPRINT_AUFTRAG.md`
- `Archiv/…/AP-app-fabrik-09_mockup-duell-sonnet_depot-kipppunkt.md` → `tests/scratch/depot-kipppunkt/mockup-duell/SONNET_AUFTRAG.md`

**Angelegt (1):** `docs/steering/patches/AP-app-fabrik-09f_werkstatt-auftragsablage_Ergebnis.md` (diese Datei).

Nicht gelesen/geändert: `tests/scratch/risiko-uebersetzer/`, Apps/Theme/Engine/Daten/Produktionscode, alle Psychosprint-Rohentwürfe, `grok-gegenkritik.md`, `GROK_AUFTRAG.md`, `GROK_EINGABE_ANONYMISIERT.md`, `ANONYMISIERUNGSMANIFEST.md`, `SONNET_EINGABEPAKET.md`, `MOCKUP-VERTRAG.md`, `APP_FACTORY_STARTLINIE.md`, alle generischen Archiv-Vorlagen. Keine Scaffold-Extraktion, kein Mockup-Bau.

## Move-Hashes (vor = nach, bytegleich)

- psychosprint: `244163e0351d39dadde9a22bcdc12e3ed3241289f9ebd0d3a19183154281ecb8`
- sonnet: `22944478566cac76a2817bbd4699fac353591488da1ff7c4d8af14f3cff1ba5f`

Nach dem Move: beide Archivquellen fehlen; `PSYCHOSPRINT_AUFTRAG.md` und `SONNET_AUFTRAG.md` existieren.

## Beweise

1. **Move-Invarianten:** Hashes identisch (oben); Archivquellen weg; Werkstattziele vorhanden. ✓
2. **Self-Test:** `--self-test` → `SELF-TEST OK` (Exit 0). Prüft aktiv, dass `prepare` `PSYCHOSPRINT_AUFTRAG.md` in der Werkstatt erzeugt und **nichts** ins Archiv, ebenso `sonnet-paket` → `SONNET_AUFTRAG.md`; Nicht-Überschreiben; kein Repo-Write. Das ist der **positive** Nachweis der neuen Routings. Tool whitespace-frei; `__pycache__` entfernt.
3. **Dry-Run sonnet-paket depot-kipppunkt:** Validierung OK, nennt `tests/scratch/depot-kipppunkt/mockup-duell/SONNET_EINGABEPAKET.md` und `…/SONNET_AUFTRAG.md` (kein Archiv-Ziel), kein Schreiben (Exit 0). ✓
4. **Dry-Run prepare routing-probe:** rot (Exit 1) — `FAIL: Mini-Spec muss unter Apps/routing-probe/ liegen`. Erwartete Folge der strikten Validierung (Albert-Entscheidung); die AP-Erwartung, dass dieser Befehl `PSYCHOSPRINT_AUFTRAG.md` nennt, ist damit bewusst unerfüllt. Kein Schreiben.

## Verbliebene Grenze / Nächster Schritt

- Der `routing-probe`-Befehl aus AP-09f ist mit strikter Validierung nicht positiv ausführbar (App-Ordner ≠ Slug). Wer die neue `prepare`-Routing per Dry-Run direkt sehen will, nutzt einen Slug mit passender Mini-Spec (`--slug <app> --mini-spec Apps/<app>/…`). Falls die Validierung künftig gelockert werden soll, ist das ein eigener, bewusster AP.
- Nächster zulässiger Schritt: nach Bedarf `prepare`/`sonnet-paket` mit `--write` für die jeweilige App. Ausdrücklich nicht: neuer Psychosprint, neuer Grok-Lauf, Scaffold-Extraktion, Mockup-Bau, APP_SPEC oder Produktionscode.
