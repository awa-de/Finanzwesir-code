---
name: Abschluss-Ritual append-only + Snapshot-Modell
description: Kostenmodell der Steuerungsdateien — Snapshot klein halten (PROJECT-STATUS, Größen-Riegel) vs. append-only-Log read-frei anhängen (BACKLOG-ARCHIV/session-log/DECISION-LOG); Tools + Nebenabschluss-Phantomfeld-Lehre
metadata:
  type: project
  originSessionId: 44720c16-88a2-46b0-bac8-772531e1f39e
---
# Abschluss-Ritual & Steuerungsdateien: append-only + Snapshot-Modell

Stand: 2026-07-12 | RITUAL-OPT-1

Kostenmodell seit 2026-07-12: **teuer ist der Modell-Read, nicht der Schreibvorgang.** Danach richten sich Ritual und Steuerungsdateien.

## Zwei Dateiklassen
- **Snapshot** (klein halten, überschreiben/beschneiden): `PROJECT-STATUS.md`. Darf nie zum Log werden. HOOK-META-Block hat feste Feld-Whitelist + Längengrenzen; Datei-Größen-Riegel WARN>30 KB / FAIL>50 KB.
- **Append-only-Log** (read-frei anhängen, nie voll lesen, wächst ewig): `BACKLOG-ARCHIV.md`, `session-log.md`, `DECISION-LOG.md`. Neueste **unten**. Jede Zeile datiert → physische Reihenfolge forensisch egal.

## Werkzeuge (2026-07-12 gebaut)
- `tools/check-project-status-hook-meta.py` — enforcing HOOK-META-Validator (Feld-Whitelist, Feldlängen 160/240, Blockgröße 600, Datei-Größe). Läuft **unbedingt** im Ritual §3.6 + Writer; Exit≠0 stoppt das Ritual. Riegel gegen stille Phantom-Felder — Lehre: `Nebenabschluss` wuchs auf ~14.000 Zeichen, weil das Schema nie maschinell durchgesetzt war (eingeführt 2026-07-01, entfernt 2026-07-12).
- `tools/append-log-line.py` — hängt read-frei EINE Zeile ans Dateiende (Dublettensperre `--unless-contains AP-ID`). In Ritual §3.7 + Writer verdrahtet. Archiv-Read pro Abschluss ~36k→~0 Tokens.
- `tools/rotate-log.py` — rotiert header-delimitierte Logs in Jahres-Segmente (`<stem>-archiv/<stem>-YYYY.md`, Carry-Forward für undatierte Marker). `/distill` Schritt 7 ruft es auf: löschen→archivieren, der Rohlog bleibt für die Forensik erhalten.

## Regel für read-freies Anhängen
Das Format darf keine schließende Klammer haben: Markdown-Zeilen und JSONL ja, JSON-Arrays und YAML-Listen nein. `ATTEMPT-LOG.json` bleibt bewusst JSON (per-AP-Zustandsspeicher, kein Log — kein Append-Fall). Batching ist unnötig, wenn der Einzel-Append read-frei ist.

Verwandt: [[project_session_start_infra]], [[project_learning_system]]. Offen: RITUAL-OPT-2 (NAVIGATION gezielter Read, start/Hook, REGRESSION-MATRIX Automatik-Review). „Append-only read-frei + Snapshot klein" als CLAUDE.md-Prinzip = offener Kandidat (Regelaufnahme-Schutz-Gate).
