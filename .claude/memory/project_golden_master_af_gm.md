---
name: golden-master-af-gm-pipeline
description: "AF-GM-01–04 Golden-Master-Produktionslinie (tools/golden-master/) — Werkzeuge, Fehler-IDs, AF-GM-04-Pilot depot-kipppunkt/b-fable, zwei technische Fallstricke (spawnSync-Event-Loop, relative Pfadtiefe bei Snapshot-Kopien)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 4fb60f89-4810-48da-a006-8c55a134f850
  modified: 2026-07-23T21:01:52.027Z
---

`tools/golden-master/` ist die Golden-Master-Werkzeugkette der App-Fabrik: `record.mjs`/`verify.mjs` (Trace-Recorder/-Verifizierer), `browser-path.mjs` (gepinnter Chromium-Pfad, lokal unter `C:\Tools\finanzwesir-playwright\af-gm-02\browsers`, bewusst nicht im NAS-Sync-Pfad), `validate_schema.py`, `generate_package.py`/`validate_package.py`/`protected_diff_check.py`/`repo_path_guard.py` (Eingabepaket-Werkzeuge, AF-GM-03).

Seit AF-GM-02c (2026-07-23) hat `verify.mjs` einen optionalen `--target-url`-Loopback-Modus: nur `http:`, Host exakt `localhost`/`127.0.0.1`/`[::1]`, kein Userinfo. CLI-Vertrag ist strikt: nur `<trace>` oder `<trace> --target-url <url>` gültig, alles andere `GM-ERR-CLI-ARGS-INVALID`. Fehler-IDs insgesamt: `GM-ERR-HASH-MISMATCH`, `-SELECTOR-NOT-FOUND`, `-STATE-MISMATCH`, `-INPUT-TARGET-INVALID`, `-TARGET-URL-NOT-LOCAL`, `-CLI-ARGS-INVALID`, `-UNEXPECTED`.

**AF-GM-04-Pilot (erster, Stand 2026-07-23):** App `depot-kipppunkt`, Variante `b-fable`. Artefakte unter `Apps/depot-kipppunkt/factory-runs/`: `ACCEPTANCE-depot-kipppunkt-b-fable-pilot.json`, `pilot-b-fable-2026-07-23/snapshot/mockup.html` (kanonischer Pfad — **nicht** direkt im Run-Ordner, siehe Fallstrick 2), `b-fable.actions.json`, `behavior-trace.json`, `screenshots/b-fable-normal/`, `evidence/`. Gebundener SHA-256: `855fad37884834ef030ef6a770d0d1118849ef81576e569b4189c2d68a27ebe9`. Der Snapshot lädt Tailwind über Play-CDN (`https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`) — das ist eine von Albert nur befristet (ca. eine Woche ab 2026-07-23) für die Pilotphase erlaubte Ausnahme, keine dauerhafte Freigabe. Die AF-GM-04-Produktionslinie ist damit nicht abgeschlossen: Eingabepaket und tatsächlicher App-Bau für `depot-kipppunkt`/`b-fable` stehen noch aus.

**Fallstrick 1 — spawnSync blockiert die Event-Loop.** Eine Testhilfe, die im selben Prozess einen HTTP-Server betreibt und per `node:child_process` einen Kindprozess startet, darf `spawnSync` nicht verwenden — es blockiert die Event-Loop des Elternprozesses vollständig, wodurch der eigene Server während der Kindprozesslaufzeit keine Anfragen bedienen kann (beobachtet als 30-Sekunden-Timeout `GM-ERR-UNEXPECTED` in `tests/golden-master/target-replay-check.mjs`, behoben durch asynchrones `spawn`).

**Fallstrick 2 — relative Pfade sind an die Verzeichnistiefe der Quelle gebunden.** Eine bytegleiche Kopie eines Mockups aus der Werkstatt (`tests/scratch/...`) in einen strukturell flacheren Zielordner bricht relative Links (z. B. `../../../../../Theme/assets/css/tokens.css`) unbemerkt — der Hash bleibt identisch, aber die Optik nicht. Bei jedem künftigen Golden-Master-Snapshot die Zielverzeichnistiefe gegen die Werkstattquelle prüfen (ggf. zusätzlicher Unterordner nötig, wie bei `depot-kipppunkt` der `snapshot/`-Unterordner), nicht nur den Hash.

**How to apply:** Vor jedem neuen AF-GM-Snapshot/Trace zuerst `docs/spec/APP_FACTORY_PRODUKTIONSSTANDARD.md` §3–10 und `tools/golden-master/README.md` lesen; die beiden Fallstricke oben aktiv gegenprüfen, bevor ein Snapshot kopiert oder eine Testhilfe mit Server+Kindprozess gebaut wird.
