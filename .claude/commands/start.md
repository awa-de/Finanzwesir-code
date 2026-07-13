# /start — Session-Start-Sequenz
<!-- Token-Strategie: Hook liefert Fakten | Schritt 1 → Haiku-Dispatch | Synthese → Hauptinstanz -->
<!-- CLAUDE_CODE_SUBAGENT_MODEL=haiku ist in settings.json gesetzt — gilt für alle Dispatches -->

## Vorab — Montag-Kassensturz/Distill-Check (vor allen Ästen)

Gilt unabhängig vom nachfolgenden Ast (Warm-Start/Kettenmodus/Vollmodus) — hängt nur von Hook-Output ab, nicht vom gewählten Pfad.

**Kassensturz:** Wenn Hook-Output `Wochentag: Monday`:
Vergleiche Hook-Output `Kassensturz-Datum` (Format YYYY-MM-DD) mit heutigem Datum:
- Kassensturz-Datum ≠ heute ODER „nie":
  `/kassensturz wird jetzt ausgeführt (Wochentag: Montag)` → Kassensturz-Output direkt ausgeben
  Danach: Edit-Tool auf `PROJECT-STATUS.md` — Feld `Kassensturz-Datum:` auf heutiges Datum (YYYY-MM-DD) setzen
- Kassensturz-Datum == heute:
  `Kassensturz bereits heute ausgeführt (${Kassensturz-Datum}) — übersprungen.`

**Distill-Empfehlung (optional):** Aus Hook-Output-Feldern prüfen:
- Log-Einträge ≥ 5 → „Distill empfohlen (Daten-Schwelle) — aufrufen?"
- Letzter Distill > 14 Tage → „Distill überfällig (Zeit-Schwelle) — aufrufen?"
- Pattern-Kandidaten > 0 → „[N] Muster warten — aufrufen?"

Wenn nicht Montag: Abschnitt entfällt, direkt weiter mit Warm-Start-Check.

---

## Vorab — Warm-Start-Check (vor allem anderen)

Lies die letzten 20 Zeilen von `.claude/learning/session-log.md`.

Enthält die Datei einen Eintrag `## YYYY-MM-DD – SESSION START` mit dem **heutigen Datum**?

**JA → WARM-START-Modus:**
- Schreibe sofort in session-log.md: `### [AP-ID aus Hook-Output] — AP-Wechsel`
- Layer-1-Fingerabdruck bestätigen (wie Schritt 0).
- Ausgabe: `[WARM-START] AP-Wechsel | Jetzt: [Fokus-AP] | Faden läuft seit: [Datum des SESSION-START-Eintrags]`
- Alle weiteren Schritte entfallen (kein Dispatch, kein BACKLOG-Lesen).
- Fertig.

**NEIN → Kaltstart:** weiter mit „Vorab — Ketten-Modus-Check" unten.

---

## Vorab — Ketten-Modus-Check (nur bei Kaltstart, neuer Faden)

Parse Hook-Output-Feld `Naechster Schritt`:
Enthält es das Muster `(AP-ID ✅ YYYY-MM-DD)` und ist YYYY-MM-DD ≤ 7 Tage alt?

**JA → KETTENMODUS:**
- Schreibe sofort in session-log.md: `## YYYY-MM-DD – SESSION START | [KETTENMODUS] | Fokus: [Fokus-AP]`
- Layer-1-Fingerabdruck bestätigen: `FinanzwesirData.js, CSVParser.js, FwDateUtils.js — diese Session nicht berühren. ✓`
- BLOCKED-Check (Schritt 1) ausführen.
- Schritt 1b (MEMORY), 2 (Haiku-Dispatch), 3 (Lücken-Alarm/Distill) entfallen.
- Stil-Skill (Schritt 4) ausführen.
- Ausgabe: `[KETTENMODUS] | Fokus: [Fokus-AP] | Letzte Station: [AP-ID ✅ DATUM] | BLOCKED: [keine oder AP-ID]`
- Fertig.

**NEIN → Vollmodus:** weiter mit „Vorab — Hook-Status-Check" unten.

---

## Vorab — Hook-Status-Check

Wenn Hook-Output `Hook-Status: DEGRADED` enthält:
→ Sichtbar melden: „Hook-Status: DEGRADED — [Warnungen aus Hook-Output]."
→ Nicht still in alten Modus zurückfallen. Hauptinstanz liest keine Quelldateien selbst nach.
→ Session-Start mit verfügbaren Fakten durchführen; fehlende Werte als „unbekannt" markieren.
→ Albert informieren: was fehlt und was das für die Session bedeutet.

Wenn `Hook-Status: OK` → direkt weiter mit Schritt 0.

## Schritt 0 — Kern-Invariante 5 (max. 30 Sekunden, vor allem anderen)

Schreibe sofort in `.claude/learning/session-log.md`:
`## YYYY-MM-DD – SESSION START | Fokus: [Fokus-AP aus Hook-Output oder „unbekannt"]`

Layer-1-Fingerabdruck bestätigen:
`FinanzwesirData.js, CSVParser.js, FwDateUtils.js — diese Session nicht berühren. ✓`

## Schritt 1 — BLOCKED-Check (Hook hat bereits geliefert)

Hook-Output enthält `BLOCKED-APs`. Wenn nicht „keine":
→ Sofortiger Abbruch-Trigger: „BLOCKED: [AP-ID] — Session pausiert. Situation beschreiben."

## Schritt 1b — Memory-Index lesen

Lies: `.claude/memory/MEMORY.md`
Gilt für diese Session als Hintergrundkontext. Einzelne Memory-Files bei Bedarf nachladen.

## Schritt 2 — Haiku-Dispatch: NAVIGATION-Status

`Archiv-seit-Log` (Lücken-Alarm) und `Aktive-APs` (Zählprüfung) liefert der Hook seit RITUAL-OPT-2 bereits mechanisch (PowerShell-Regex auf die sauberen Markdown-Tabellen in `BACKLOG.md`/`BACKLOG-ARCHIV.md`) — kein Dispatch mehr nötig. `NAVIGATION.md` ist Fließtext ohne Tabellenformat und bleibt deshalb beim Haiku-Dispatch (Blind-Regex auf Prosa hätte ein stilles Fehlerkennungsrisiko, das der DEGRADED-Mechanismus nicht abfangen würde).

Dispatch an `spec-scout` (läuft auf Haiku per settings.json):

> Lies `NAVIGATION.md` und gib strukturierten Text zurück. Kein Urteil — nur Fakten.
>
> Extrahiere: alle AP-IDs mit Status (Liste).
>
> Ausgabe-Format:
> AKTIVE_APS: [AP-1, AP-2, ...]

## Schritt 3 — Hauptinstanz: Urteile

**Lücken-Alarm** (AP-ID-Abgleich aus Hook-Output-Feld `Archiv-seit-Log`):
Für jede AP-ID in `Archiv-seit-Log` (wenn nicht „keine"):
`Kein session-log-Eintrag für [AP-ID]. Abschluss-Ritual vollständig ausgeführt?`

(Distill-Empfehlung: siehe Vorab — Montag-Kassensturz/Distill-Check oben.)

## Schritt 4 — Hauptinstanz: Stil (kein Dispatch — stil-relevant)

Lies: `.claude/skills/00-style-sei-deutsch/SKILL.md`
Wende Kommunikationsstil ab jetzt an.

## Schritt 5 — Ausgabe

`Aktive APs: [Y]` und die Zählprüfung `[N]` kommen direkt aus Hook-Output-Feld `Aktive-APs` (Anzahl + ID-Liste aus `BACKLOG.md`-Abschnitt „Aktiv") — keine eigene Zählung nötig.

Erste Zeile:
`SESSION-START ✓ | Fokus: [X] | Aktive APs: [Y] | Log: [Z] Einträge | BLOCKED: [keine oder AP-ID]`

Direkt danach:
`Zählprüfung: „Du hast [N] aktive APs (🟡): [IDs aus Hook-Feld Aktive-APs]. Stimmt diese Zahl?"`
