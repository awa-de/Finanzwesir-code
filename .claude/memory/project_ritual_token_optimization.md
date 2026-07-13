---
name: Abschluss-Ritual append-only + Snapshot-Modell
description: Kostenmodell der Steuerungsdateien — Snapshot klein halten (PROJECT-STATUS, Größen-Riegel) vs. append-only-Log read-frei anhängen (NAVIGATION/BACKLOG/BACKLOG-ARCHIV/session-log/DECISION-LOG); Tools, Hook-Redesign, Rotations-Fallstricke
metadata:
  type: project
  originSessionId: 44720c16-88a2-46b0-bac8-772531e1f39e
---
# Abschluss-Ritual & Steuerungsdateien: append-only + Snapshot-Modell

Stand: 2026-07-12 | RITUAL-OPT-1 + RITUAL-OPT-2 (Punkte 6–9, vollständig)

Kostenmodell seit 2026-07-12: **teuer ist der Modell-Read, nicht der Schreibvorgang.** Danach richten sich Ritual und Steuerungsdateien.

## Zwei Dateiklassen
- **Snapshot** (klein halten, überschreiben/beschneiden): `PROJECT-STATUS.md`. Darf nie zum Log werden. HOOK-META-Block hat feste Feld-Whitelist + Längengrenzen; Datei-Größen-Riegel WARN>30 KB / FAIL>50 KB.
- **Append-only-Log** (read-frei anhängen, nie voll lesen, wächst ewig): `NAVIGATION.md` (seit RITUAL-OPT-2), `BACKLOG.md`, `BACKLOG-ARCHIV.md`, `session-log.md`, `DECISION-LOG.md`. Neueste **unten**. Jede Zeile/jeder Block datiert → physische Reihenfolge forensisch egal (Ausnahme: Rotation braucht trotzdem Datum, nicht Position — siehe unten).

## Werkzeuge (2026-07-12 gebaut, RITUAL-OPT-1 + 2)
- `tools/check-project-status-hook-meta.py` — enforcing HOOK-META-Validator (Feld-Whitelist, Feldlängen 160/240, Blockgröße 600, Datei-Größe). Läuft **unbedingt** im Ritual §3.6 + Writer; Exit≠0 stoppt das Ritual. Riegel gegen stille Phantom-Felder — Lehre: `Nebenabschluss` wuchs auf ~14.000 Zeichen, weil das Schema nie maschinell durchgesetzt war (eingeführt 2026-07-01, entfernt 2026-07-12).
- `tools/append-log-line.py` — hängt read-frei EINE Zeile ans Dateiende (Dublettensperre `--unless-contains AP-ID`). Für NAVIGATION.md (Normalfall Append), BACKLOG-ARCHIV.md, session-log.md.
- `tools/replace-matched-line.py` (RITUAL-OPT-2) — ersetzt oder entfernt read-frei genau EINE Zeile per Substring-Match, FAIL bei 0 oder >1 Treffern (Eindeutigkeit im Tool erzwungen, kein Vollscan zur Prüfung nötig). Für NAVIGATION.md-Sonderfall (🟡→✅-Flip) und BACKLOG.md-Zeilenentfernung — löst den vorherigen Read+Edit-Zwang ab (Edit-Tool verlangt immer einen vorherigen Voll-Read derselben Datei).
- `tools/append-block.py` (RITUAL-OPT-2) — wie append-log-line.py, aber für MEHRZEILIGE Blöcke (DECISION-LOG.md-Einträge sind `## D-XX` + mehrere `####`-Abschnitte, kein Einzeiler). Block-Text kommt aus einer Datei (`--block-file`), nicht als CLI-Arg, wegen Anführungszeichen/Backticks in Decision-Texten. Fügt automatisch die `---`-Trennlinie ein.
- `tools/rotate-log.py` — rotiert header-delimitierte Logs (`## `/`### `-Blöcke, z.B. session-log.md) in Jahres-Segmente (`<stem>-archiv/<stem>-YYYY.md`).
- `tools/rotate-table-log.py` (RITUAL-OPT-2) — rotiert Markdown-TABELLEN (z.B. BACKLOG-ARCHIV.md) in Jahres-Segmente (`<stem>-YYYY.md`, flach im selben Ordner). **Wählt Zeilen nach Datum aus, nicht nach Position** — BACKLOG-ARCHIV.md dokumentiert selbst, dass ihr Altbestand vor der Append-only-Umstellung in umgekehrter Reihenfolge steht; eine positionsbasierte "letzte N Zeilen"-Rotation hätte dort neuere Zeilen archiviert und ältere aktiv gelassen. Erstrotation 2026-07-12: 219→12 aktive Zeilen, 207 nach `BACKLOG-ARCHIV-2026.md`.

## Hook-Redesign (`session-start.ps1`, RITUAL-OPT-2 Punkt 7)
`/start` Schritt 2 dispatchte bisher NAVIGATION.md (18,5 KB) + BACKLOG-ARCHIV.md (36 KB geschätzt, real 145 KB vor Rotation) + BACKLOG.md an `spec-scout` (Haiku). Nach Albert-Entscheidung (AskUserQuestion): BACKLOG.md + BACKLOG-ARCHIV.md sind saubere Markdown-Tabellen → jetzt PowerShell-Regex-Felder direkt im Hook (`Aktive-APs`, `Archiv-seit-Log`), Haiku-Dispatch dafür entfällt. **NAVIGATION.md bleibt bewusst beim Haiku-Dispatch** — Fließtext/Blockquote-Prosa, kein Tabellenformat, ein Blind-Regex hätte ein stilles Fehlerrisiko (AP-IDs tauchen auch beiläufig in Nachbarabsätzen auf), das der DEGRADED-Mechanismus nicht abfangen würde. „Aktive APs"-Zahl/Zählprüfung kommt jetzt eindeutig aus `BACKLOG.md`s 🟡-Aktiv-Tabelle (vorher unklar verdrahtet).

**PowerShell-5.1-Fallstrick:** `.ps1`-Dateien ohne BOM werden beim Skript-PARSEN selbst nicht als UTF-8 gelesen (unabhängig von `-Encoding UTF8` beim `Get-Content` der Zieldatei) — ein im Quelltext eingebettetes Mehrbyte-Emoji-Literal (z.B. 🟡) wird dabei korrumpiert. Fix: Emoji zur Laufzeit aus dem Codepoint bauen (`[char]::ConvertFromUtf32(0x1F7E1)`), nie als Literal im Regex-Quelltext.

## Rotations-Regressionsfalle (gefunden + behoben)
Nach der ersten BACKLOG-ARCHIV-Rotation brauchte `tools/kassensturz-archiv-query.py` (liest nur die aktive Datei) einen Fix: scannt jetzt zusätzlich alle `BACKLOG-ARCHIV-YYYY.md`-Segmente mit Jahr ≥ `--since`-Jahr, sonst verliert eine `--since`-Abfrage vor dem Rotations-Schnitt Treffer still. **Lehre: jedes Tool, das ein rotierbares Log/Tabelle liest, muss beim Rotieren mit-geprüft werden** — Rotation ist kein rein lokaler Eingriff.

## Regel für read-freies Anhängen
Das Format darf keine schließende Klammer haben: Markdown-Zeilen und JSONL ja, JSON-Arrays und YAML-Listen nein. `ATTEMPT-LOG.json` bleibt bewusst JSON (per-AP-Zustandsspeicher, kein Log — kein Append-Fall). Batching ist unnötig, wenn der Einzel-Append read-frei ist.

## Präferenz: aggressive Rotation statt sanfter

Bei der BACKLOG-ARCHIV-Rotation wählte Albert auf Rückfrage die aggressive größenbasierte Variante (145→27 KB) statt der sanften zeilenbasierten (RITUAL-OPT-2, 2026-07-12) — Begründung: Modell-Kontext-Lesekosten sind bei read-freien Tools (Punkt 1/7 oben) ohnehin irrelevant, Dateigröße ist reine Hygiene, kein Kostenfaktor mehr.

**How to apply:** Bei künftigen Rotations-/Größenentscheidungen für Append-only-Logs: die aggressivere Variante bevorzugen, sobald die Datei ohnehin read-frei behandelt wird — Kontext-Sparsamkeit ist dann kein Gegenargument mehr für eine sanftere, aber unübersichtlichere Rotation.

Verwandt: [[project_session_start_infra]], [[project_learning_system]]. „Append-only read-frei + Snapshot klein" als CLAUDE.md-Prinzip: Distill 11 (2026-07-13) hat den Kandidaten geprüft und **abgelehnt** — Regelaufnahme-Schutz-Bedingung 4 (universell genug) nicht erfüllt, gilt nur für eine schmale Dateiklasse, Durchsetzung liegt bereits mechanisch in den Tools oben, Wortlaut lebt bereits in `abschluss-ritual/SKILL.md` §0.6/§3.6a/§3.7. Kein CLAUDE.md-Eintrag, keine zusätzliche Memory nötig — dieser Abschnitt bleibt die maßgebliche Dokumentation.
