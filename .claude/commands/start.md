Führe die vollständige Session-Start-Sequenz aus:

1. Lies `PROJECT-STATUS.md`
2. Lies `NAVIGATION.md`
3. Lies `.claude/ATTEMPT-LOG.json` — prüfe auf `attempts >= 2` oder `"status": "BLOCKED"` → sofortiger Abbruch-Trigger
   → Layer-1-Fingerabdruck bestätigen: „FinanzwesirData.js, CSVParser.js, FwDateUtils.js — diese Session nicht berühren. ✓"
4. Lies `docs/steering/BACKLOG.md`
5. Lies `.claude/skills/00-style-sei-deutsch/SKILL.md` und wende den Kommunikationsstil an

Gib als erste Zeile aus:
SESSION-START ✓ | Fokus: [X] | Aktive APs: [Y] | BLOCKED: [Z oder keine]

Direkt danach ausgeben:
- Zählprüfung: „Du hast [N] aktive APs (🟡). Stimmt diese Zahl?"
- Wenn aktueller Wochentag = Montag: „/kassensturz wird jetzt ausgeführt (Wochentag: Montag)" → Kassensturz-Output direkt ausgeben
