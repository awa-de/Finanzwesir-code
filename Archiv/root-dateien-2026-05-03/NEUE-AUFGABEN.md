# NEUE-AUFGABEN – Finanzwesir 2.0
Stand: 2026-05-03 08:02 | Session: A7-Stand-Datum-Format | Geändert von: Claude

Kochbuch für das Erfassen neuer Aufgaben — egal ob einzelne Idee oder nach Whiteboard-Phase.

---

## Situation 1: Einzelne Idee

*"Mir ist etwas aufgefallen / ich habe eine Idee."*

### Dein Trigger-Satz

Sag einfach:

> **„Neue Aufgabe: [1 Satz was das Problem oder die Idee ist]"**

Beispiele:
- „Neue Aufgabe: Die Tooltips auf dem iPad zeigen falsche Werte."
- „Neue Aufgabe: Ich will eine Monatsübersicht-App bauen."
- „Neue Aufgabe: Der Kontrast der Buttons ist zu gering."

### Was Claude dann macht

Claude führt das **Abfrage-Protokoll** durch — du beantwortest, Claude schreibt:

| # | Frage | Zweck |
|---|-------|-------|
| 1 | **Bereich?** Engine / CSS / Design / Theme / Cleanup / App | → ID-Präfix + Routing |
| 2 | **Problem in einem Satz** (nicht die Lösung, sondern was nicht stimmt) | → Titel der Aufgabe |
| 3 | **Symptom:** Was siehst du konkret, was passiert oder fehlt? | → Detail-Datei-Entscheidung |
| 4 | **Priorität:** H (launch-blockierend) / M (wichtig) / L (nice-to-have) | → Einsortierung |
| 5 | **Abhängigkeiten:** Welche anderen Aufgaben müssen vorher ✅ sein? Oder: keine | → Dep-Spalte |
| 6 | **Komplex?** Braucht es Code-Spec / Testmatrix / Lösungsvorschlag? | → Detail-Datei ja/nein |

### Was Claude danach zeigt (Preview)

```
Vorgeschlagener BACKLOG-Eintrag:

| ID    | Bereich | Titel                        | Prio | Dep | Detail |
|-------|---------|------------------------------|------|-----|--------|
| DS-008| Design  | Button-Kontrast erhöhen      | M    | —   | —      |

Einsortierung: ⬜ Offen – Pre-Launch
```

Du sagst: **„OK"** oder korrigierst einzelne Felder.
Erst nach deinem OK schreibt Claude in `docs/steering/BACKLOG.md`.

---

## Situation 2: Whiteboard-Phase war erfolgreich — „Jetzt zerlegen"

*"Wir haben geplant, diskutiert, Fragmente gesammelt. Jetzt soll Ordnung rein."*

### Dein Trigger-Satz

> **„Jetzt zerlegen."**

(Oder: „Mach daraus Aufgaben.", „Pack das in den Backlog.", „Strukturiere das.")

### Was Claude dann macht (Zerlegungs-Protokoll, 5 Schritte)

**Schritt 1 — Inventur der Konversation**
Claude liest die gesamte bisherige Unterhaltung durch und listet alles, was als Aufgabe in Frage kommt: Probleme, Ideen, Anforderungen, Randnotizen, „wäre gut wenn…".

**Schritt 2 — Trennen: eigenständig vs. Unter-Schritt**

Claude entscheidet für jeden Kandidaten:

| Kriterium | Ergebnis |
|-----------|----------|
| Unabhängig testbar, kann allein abgenommen werden | → eigener BACKLOG-Eintrag |
| Ist ein Schritt innerhalb einer größeren Aufgabe | → landet in der Detail-Datei der übergeordneten Aufgabe |
| Ist eine Architekturentscheidung, keine Aufgabe | → als Kommentar/Frage markiert, nicht eingetragen |

**Schritt 3 — Strukturieren**
Pro Kandidat: Domain, Titel (Verb + Objekt, max. 8 Wörter), Prio, Dep, Detail-Datei nötig?

**Schritt 4 — Preview im Chat zeigen**
Claude zeigt die vollständige Liste als Tabelle im Chat. Noch nichts schreiben.

**Schritt 5 — Review durch dich**

Du gehst die Liste durch:

| Aktion | Wie |
|--------|-----|
| Eintrag löschen | „Streich APP-03" |
| Prio ändern | „APP-02 ist H, nicht M" |
| Zwei Einträge zusammenführen | „APP-04 und APP-05 sind dasselbe" |
| Neue Abhängigkeit | „APP-06 braucht APP-01 vorher" |
| Eintrag teilen | „APP-07 sind eigentlich zwei Aufgaben: [a] und [b]" |
| Alles OK | „OK" |

Nach deinem **„OK"** schreibt Claude alles auf einmal in `docs/steering/BACKLOG.md`.

---

## Qualitätsregeln (struktureller Zwang — Claude hält sich immer daran)

### Titelformat: Verb + Objekt, max. 8 Wörter

| Falsch | Richtig |
|--------|---------|
| „Hier implementieren wir die vollständige Authentifizierungslogik mit JWT" | „JWT-Authentifizierung implementieren" |
| „Das Problem mit den Tooltips auf dem iPad lösen" | „iPad-Tooltip-Darstellung korrigieren" |
| „Würde cool sein wenn man..." | „Monatsübersicht-View hinzufügen" |

### Prioritätsdefinitionen (bindend, kein Ermessen)

| Prio | Definition | Beispiel |
|------|-----------|---------|
| **H** | Launch-blockierend: ohne das kann kein abhängiger Schritt starten | TMPL-1, CSS-6, TH-05 |
| **M** | Wichtig, aber kein unmittelbarer Blocker | AP-19, DS-003, CL-04 |
| **L** | Nice-to-have, schadet nicht wenn es später kommt | PL-1, DS-005, CL-08 |

Wenn du dir nicht sicher bist: Claude schlägt eine Prio vor und begründet sie kurz.

### ID-Vergabe

| Domain | Präfix | Beispiel |
|--------|--------|---------|
| Chart-Engine | AP-N | AP-23, AP-24 |
| CSS | CSS-N | CSS-8, CSS-9 |
| Design-System | DS-N | DS-008, DS-009 |
| Theme-Build | TH-N | TH-07 |
| Cleanup | CL-N | CL-14 |
| App (neue App oder Feature) | APP-N | APP-01, APP-02 |

Claude schaut im BACKLOG.md nach der letzten verwendeten Nummer und nimmt die nächste freie.

---

## Entscheidungshilfe: Ist das eine Aufgabe oder eine Entscheidung?

Manchmal entstehen in der Whiteboard-Phase Dinge, die kein Arbeitspaket sind.

| Was es ist | Was damit passiert |
|------------|-------------------|
| Konkrete Arbeit mit klarem Ergebnis | → BACKLOG-Eintrag |
| Architekturentscheidung: „Soll A oder B?" | → Als Frage im Chat festhalten, zuerst entscheiden, dann eintragen |
| Wissenslücke: „Ich weiß nicht wie X funktioniert" | → Spike-Aufgabe eintragen: „X recherchieren und entscheiden" |
| Daueraufgabe: „Immer wenn X passiert, Y tun" | → CLAUDE.md-Regel, kein BACKLOG-Eintrag |
| Post-Launch-Idee ohne Dringlichkeit | → In Abschnitt 📋 Post-Launch einsortieren |

---

## Schnellreferenz: Trigger-Sätze

| Situation | Was du sagst |
|-----------|-------------|
| Einzelne Idee | „Neue Aufgabe: [1 Satz]" |
| Whiteboard fertig, Zerlegung | „Jetzt zerlegen." |
| Unsicher ob H/M/L | „Was würdest du empfehlen?" |
| Eintrag rückgängig | „Streich [ID] wieder raus" |
| Noch nicht sicher ob es eine Aufgabe ist | „Ist das eine Aufgabe oder eine Entscheidung?" |
