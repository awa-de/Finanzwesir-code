# Skill: /selftest-perplexity

Autor: Perplexity

Stand: 2026-05-08 | Typ: Systemgesundheitscheck

## Zweck

Prüft das CLAUDE.md-Regelsystem unabhängig von einem konkreten Arbeitspaket.
Kein Code. Keine Datei wird angefasst.
Ergebnis: strukturierte Selbstauskunft über Zustandsvollständigkeit.

\---

## Wann aufrufen

* Nach einer CLAUDE.md-Änderung
* Wenn ein Abbruch-Muster sich wiederholt und die Ursache unklar ist
* Nach Aufnahme einer neuen Regel (§ 8 Regelaufnahme-Schutz bestanden?)
* Zu Beginn einer neuen langen Arbeitsphase
* Auf Alberts expliziten Wunsch

\---

## Ablauf (5 Schritte, ca. 5-10 Minuten)

**Schritt 1: Zustandsinventur**
Alle benannten Zustände auflisten (MODUS N/R/M/A, Gates, Abbruch, Warte-Zustände).
Prüffrage: Hat jeder Zustand einen definierten Rückweg nach MODUS N?

**Schritt 2: Transition Coverage**
Jeden Übergang einmal durchspielen (Gedankenexperiment):

* Normalpfade (BUG/FIX, NEUE AUFGABE, IDEE, APP, FRAGE, UNKLAR)
* Abbruchpfade (§ 4, alle 8 Trigger)
* Lastabwurf-Übergänge (S0→R→M→A→N)
* Gate-Entscheidungsbaum (Light vs. Full, Grenzfälle)
* Subagent-Pfade (Spawn-Entscheidung, falsches Modell, Tabu-Erkennung)

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
Kategorie | Getestet | Bestanden | Probleme
Gesamt:   | N        | N         | 0 (oder Liste)
```

Offene Punkte mit Empfehlung und Priorität.
Systemurteil in einem Satz.

\---

## Output-Format

Direkte Ausgabe in den Chat. Kein File, kein Commit, keine Backlog-Änderung.
Der Test hinterlässt keine Spuren im Projekt — er ist rein beobachtend.

\---

## Vollständiges Referenzprotokoll

Das erste vollständige Durchlauf-Protokoll liegt in:
`docs/selbsttest\\Perplexity-Selbsttest\\selbsttest\_protokoll.md` (erstellt 2026-05-08)

Es dokumentiert alle 30 Übergänge des Systems zum Zeitpunkt der Upgrade-Version.
Bei künftigen Selbsttests: gegen dieses Protokoll diffsen um neue Lücken zu erkennen.

