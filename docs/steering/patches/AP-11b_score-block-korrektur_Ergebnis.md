# AP-11b Ergebnis — Score-Block-Korrektur

Stand: 2026-06-29 | Session: APP-01 AP-11b | Geändert von: Claude

---

## Auftrag

Nach AP-11a den alten 5-Fragen-Selbsttest im Steuerungsblock-Template durch den echten standardisierten `LLM-Prüfscore pro Änderung` ersetzen.

---

## Problem

AP-11a hatte `LLM-Selbsttest vor jeder Änderung` begrifflich auf `LLM-Prüfscore pro Änderung` synchronisiert, aber den alten 5-Fragen-Selbsttest inhaltlich unverändert gelassen.

Das war ein Drift: Der `LLM-Prüfscore pro Änderung` ist kein umbenannter Selbsttest, sondern ein 4-Kriterien-Score mit 0–2 Punkten je Kriterium und verbindlicher Score-Regel.

---

## Geänderte Dateien

- `docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md`
- `docs/steering/patches/AP-11a_template-status-skill-begriff-nachputz_Ergebnis.md`
- `docs/steering/patches/AP-11b_score-block-korrektur_Ergebnis.md` (dieses Protokoll)

AP-11-Protokoll: kein Update nötig (Offene-Punkte-Abschnitt bereits durch AP-11a korrekt).

---

## Änderungen im Detail

### §5 Standardblock — Score-Block ersetzt

**Entfernt (alter 5-Fragen-Selbsttest unter falschem Namen):**
```
**LLM-Prüfscore pro Änderung:**  
1. Entfernt diese Änderung die definierte Barriere?
2. Stärkt diese Änderung den Zielzustand?
3. Vermeidet diese Änderung alle Nicht-Ziele?
4. Bleibt die App in ihrer Mentorrolle innerhalb der Heldenreise?
5. Wenn nein bei einer der Fragen: Änderung nicht durchführen.
```

**Neu (echter standardisierter 4-Kriterien-Score, verbatim aus Seed §2.1):**
```
**LLM-Prüfscore pro Änderung:**

Bewerte vor der Umsetzung von 0–2:

1. **Barriere-Abbau:** Entfernt die Änderung die definierte psychologische Hürde?
2. **Zielzustand:** Führt die Änderung zum gewünschten Nutzerzustand?
3. **Nicht-Ziele:** Vermeidet die Änderung alle verbotenen Drifts?
4. **Mentorrolle:** Stärkt die Änderung die Rolle dieser App in der Heldenreise?

**Score-Regel:**

- **8/8** = umsetzen
- **6–7/8** = nur umsetzen, wenn `Nicht-Ziele = 2/2`
- **≤5/8** = nicht umsetzen
- **jede Nicht-Ziel-Verletzung** = stoppen

**Wichtig:**

- Punkt 3 ist ein KO-Kriterium.
- Eine Änderung mit `Nicht-Ziele < 2/2` darf nicht umgesetzt werden, auch wenn der Gesamtscore hoch wirkt.
- Der Score ersetzt nicht den Steuerungsblock, sondern zwingt das LLM, jede Änderung gegen Barriere, Zielzustand, Nicht-Ziele und Heldenreise-Rolle zu prüfen.
- Bei Unsicherheit: nicht umsetzen, sondern Klärungsbedarf markieren.
```

### AP-11a-Protokoll — falscher Endzustand korrigiert

Ersetzte Aussage: „Inhalt (5 Prüffragen) unverändert. Nur der Feldname synchronisiert."

Korrekte Dokumentation: Drift erkannt, in AP-11b behoben.

---

## Prüfungen

| Prüfung | Ergebnis |
|---|---|
| `LLM-Selbsttest` als aktueller Feldname im Template: nicht vorhanden | ✅ |
| Alter 5-Fragen-Selbsttest aus §5 Template entfernt | ✅ |
| Echter 4-Kriterien-Score in §5 Template verankert | ✅ |
| Score-Kriterien: Barriere-Abbau / Zielzustand / Nicht-Ziele / Mentorrolle | ✅ |
| Score-Regeln: 8/8 / 6–7/8 / ≤5/8 / Nicht-Ziel-Verletzung | ✅ |
| Score-Satz (Merksatz §7) bereits vorhanden aus AP-11 | ✅ |
| AP-11a-Protokoll korrigiert | ✅ |
| keine APP_SPEC neu verteilt | ✅ |
| kein `--write` ausgeführt | ✅ |
| keine App-Fachinhalte geändert | ✅ |
| Seed-Datei nicht geändert | ✅ |
| Script-Logik nicht geändert | ✅ |
| kein Commit | ✅ |
| kein Abschlussritual (AP-Anweisung) | ✅ |

---

## Status

GRÜN

---

## Offene Punkte

Keine. AP-11 / AP-11a / AP-11b sind inhaltlich abgeschlossen. Bereit für Commit.
