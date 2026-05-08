Führe die vollständige Session-Start-Sequenz aus:

1. Lies `PROJECT-STATUS.md`
2. Lies `NAVIGATION.md`
3. Lies `.claude/ATTEMPT-LOG.json` — prüfe auf `attempts >= 2` oder `"status": "BLOCKED"` → sofortiger Abbruch-Trigger
   → Layer-1-Fingerabdruck bestätigen: „FinanzwesirData.js, CSVParser.js, FwDateUtils.js — diese Session nicht berühren. ✓"
3c. Lies `.claude/learning/session-log.md` UND `.claude/learning/patterns.md`

    Lücken-Alarm (AP-ID-Abgleich — kein Datum-Vergleich, keine Schätzung):
    1. Lies `docs/steering/BACKLOG-ARCHIV.md` — welche AP-IDs wurden seit dem letzten session-log-Eintrag dort hinzugefügt?
    2. Prüfe session-log.md: gibt es einen Eintrag mit „## YYYY-MM-DD – [AP-ID]"?
    3. AP-ID in Archiv ohne passenden Eintrag = Lücke
    → Ausgabe: „Kein session-log-Eintrag für [AP-ID]. Abschluss-Ritual vollständig ausgeführt?"

    Distill-Empfehlung (Schwellen-basiert, kein Kalender):
    session-log ≥ 5 Einträge?         → „Distill empfohlen (Daten-Schwelle erreicht)"
    Letzter Distill > 14 Tage?        → „Distill überfällig (Zeit-Schwelle überschritten)"
    Pattern-Kandidaten offen?         → „X Muster warten auf Promotion"
    Keine Schwelle erreicht + kein Kandidat → nichts ausgeben

4. Lies `docs/steering/BACKLOG.md`
5. Lies `.claude/skills/00-style-sei-deutsch/SKILL.md` und wende den Kommunikationsstil an

Gib als erste Zeile aus:
SESSION-START ✓ | Fokus: [X] | Aktive APs: [Y] | Log: [Z] Einträge | BLOCKED: [Z oder keine]

Direkt danach ausgeben:
- Zählprüfung: „Du hast [N] aktive APs (🟡). Stimmt diese Zahl?"
- Wenn aktueller Wochentag = Montag: „/kassensturz wird jetzt ausgeführt (Wochentag: Montag)" → Kassensturz-Output direkt ausgeben
