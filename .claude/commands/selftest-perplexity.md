# Command: /selftest-perplexity
Stand: 2026-05-08 | Typ: Systemgesundheitscheck

## Zweck
Prüft das CLAUDE.md-Regelsystem unabhängig von einem konkreten Arbeitspaket.
Kein Code. Keine Projektdatei wird angefasst.
Ergebnis: strukturierte Selbstauskunft über Zustandsvollständigkeit.

---

## Wann aufrufen

- Nach einer CLAUDE.md-Änderung
- Wenn ein Abbruch-Muster sich wiederholt und die Ursache unklar ist
- Nach Aufnahme einer neuen Regel (§ 8 Regelaufnahme-Schutz bestanden?)
- Zu Beginn einer neuen langen Arbeitsphase
- Auf Alberts expliziten Wunsch

---

## Ablauf (5 Schritte, ca. 5-10 Minuten)

**Schritt 1: Zustandsinventur**
Alle benannten Zustände auflisten (MODUS N/R/M/A, Gates, Abbruch, Warte-Zustände).
Prüffrage: Hat jeder Zustand einen definierten Rückweg nach MODUS N?

**Schritt 2: Transition Coverage**
Jeden Übergang einmal durchspielen (Gedankenexperiment):
- Normalpfade (BUG/FIX, NEUE AUFGABE, IDEE, APP, FRAGE, UNKLAR)
- Abbruchpfade (§ 4, alle 8 Trigger)
- Lastabwurf-Übergänge (S0→R→M→A→N)
- Gate-Entscheidungsbaum (Light vs. Full, Grenzfälle)
- Subagent-Pfade (Spawn-Entscheidung, falsches Modell, Tabu-Erkennung)

**Schritt 3: Invarianten-Härtetest**
Jede der 5 Invarianten gegen das härteste Szenario testen:
„Gilt die Invariante auch wenn Albert Zeitdruck macht?"
„Gilt sie in MODUS M mit fast leerem Kontext?"
„Gilt sie wenn die einzige Lösung in der Tabu-Zone liegt?"

**Schritt 4: Lückenanalyse**
Gibt es Übergänge die nicht definiert sind?
Gibt es Zyklen ohne Exit?
Gibt es Zustände ohne Rückweg?

**Schritt 5: Scorecard ausgeben**
Format:
```
Kategorie            | Getestet | Bestanden | Probleme
Normale Betriebspfade|          |           |
Abbruchpfade         |          |           |
Lastabwurf           |          |           |
Gate-Entscheidungen  |          |           |
Subagent-Pfade       |          |           |
Invarianten          |          |           |
Gesamt               | N        | N         | 0 (oder Liste)
```
Offene Punkte mit Empfehlung und Priorität.
Systemurteil in einem Satz.

---

## Referenzprotokoll

Liegt in: `docs/selbsttest/Perplexity-Selbsttest/selbsttest_protokoll.md`
Nur laden wenn Diff gegen früheren Zustand nötig ist (nicht bei jedem Lauf).

---

## Speichern nach dem Durchlauf (Schritt 6)

Nach der Scorecard fragt Claude:

> „Ergebnis speichern? (ja/nein)
> Zieldatei: `docs/selbsttest/Perplexity-Selbsttest/results/YYYY-MM-DD_HHMM.md`"

Wenn Albert „ja" antwortet:
1. Dateiname mit aktuellem Zeitstempel bilden: `YYYY-MM-DD_HHMM.md`
2. Vollständige Scorecard + Systemurteil + offene Punkte in die Datei schreiben
3. Bestätigung ausgeben: „Gespeichert unter: [Pfad]"

Wenn Albert „nein" antwortet oder nicht reagiert:
- Nicht speichern. Keine weitere Nachfrage.

Format der gespeicherten Datei:
```markdown
# Selbsttest-Ergebnis
Datum: YYYY-MM-DD HH:MM
CLAUDE.md Stand: [Stand-Datum aus § 0]

## Scorecard
[Tabelle]

## Offene Punkte
[Liste oder „keine"]

## Systemurteil
[Ein Satz]
```
