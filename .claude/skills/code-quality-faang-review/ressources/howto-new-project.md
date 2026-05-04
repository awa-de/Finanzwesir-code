## Dreischichtige Skill-Architektur

SCHICHT 1 – Rolle (3 Sätze, einmalig)
  Wer ist Claude in diesem Projekt?
  → Senior Architect, FAANG-Maßstab, reviewt wie Google

SCHICHT 2 – Universelle Prinzipien (5 Prinzipien, je 1 Satz)
  Was gilt immer, unabhängig vom Projekt?
  → SOLID, DRY, KISS, Explicit over Implicit, Fail Fast

SCHICHT 3 – Projektspezifischer Kontext (kompakte Liste)
  Was gilt NUR in diesem Projekt?
  → Tabu-Zonen, etablierte Patterns, bindende Reihenfolgen
  → Diese Schicht ist token-effizient, weil Claude
     nicht ableiten muss, sondern nachschlagen kann


## Schicht-3-Austausch für neue Projekte

1. Diesen Skill-Ordner kopieren und umbenennen
2. Nur `resources/layer3-context.md` ersetzen
3. `SKILL.md` und `resources/scan-checklist.md` bleiben unverändert


## Wie du eine neue Schicht 3 gestaltest
Was Schicht 3 enthalten muss
Nicht alles, sondern nur das, was Claude nicht aus Schicht 1+2 ableiten kann:

| Kategorie                | Beispiel aus deinem Projekt            | Warum es in Schicht 3 gehört                   |
| ------------------------ | -------------------------------------- | ---------------------------------------------- |
| Tabu-Zonen               | CSVParser.js – Rückfrage vor Änderung  | Claude würde sonst "optimieren"                |
| Bindende Reihenfolgen    | FwTheme.init() vor new FwRenderer()    | Nicht aus Code-Logik ableitbar                 |
| Etablierte Patterns      | PERIOD_TABLE_M = das Intervall-Pattern | Kein zweites Pattern daneben erfinden          |
| Explizite Verbote        | Kein contain: layout                   | Bereits entschieden, nicht nochmal diskutieren |
| Einzige Wahrheitsquellen | Nur :root kennt Hex-Werte              | Verhindert Duplikate an Stelle 2 und 3         |
| Stack-Constraints        | Vanilla JS, kein Build-Step im Dev     | Claude schlägt sonst Webpack-Lösungen vor      |


## Bootstrap-Prompt für neue Schicht 3:

Du bist Senior Software Architect. Ich starte ein neues Projekt und 
brauche die Schicht 3 eines Code-Quality-Skills.

Schicht 1 (Rolle) und Schicht 2 (Prinzipien) existieren bereits.
Schicht 3 ist projektspezifisch und enthält NUR, was du aus Schicht 1+2
nicht ableiten kannst.

Hier ist der Kontext meines Projekts:

STACK:          [Sprache, Framework, Laufzeitumgebung]
ARCHITEKTUR:    [Modulstruktur, zentrale Klassen/Dateien]
ENTSCHEIDUNGEN: [Was bereits entschieden ist und nicht nochmal 
                 diskutiert wird]
TABU-ZONEN:     [Dateien/Module, die nur mit Rückfrage angefasst 
                 werden dürfen]
PATTERNS:       [Welche Patterns bereits eingeführt sind und 
                 konsistent bleiben müssen]
CONSTRAINTS:    [Was technisch verboten ist, mit Begründung]

Erstelle Schicht 3 als kompakte Liste.
Jeder Eintrag hat: Kategorie | Regel | Begründung (1 Satz).
Maximal 10 Einträge. Weniger ist mehr.
Wenn du Rückfragen hast, stelle sie zuerst – schreibe keinen 
Entwurf auf Basis von Annahmen.

## Self-Improvement nach 3–4 Paketen:
Wenn der Skill im Einsatz war und du merkst, dass etwas fehlt oder stört:

---- 

Wir haben [N] Arbeitspakete mit dem aktuellen Code-Quality-Skill 
abgeschlossen. Hier ist die aktuelle Schicht 3:

[aktuelle Schicht 3 einfügen]

Beurteile sie kritisch:
1. Welche Regeln haben sich als nützlich erwiesen?
2. Welche Regeln wurden nie gebraucht (YAGNI → streichen)?
3. Was hat Claude trotz Skill falsch gemacht? 
   → Fehlt eine Regel, oder war eine Regel zu vage?
4. Liefere eine überarbeitete Schicht 3 – maximal 10 Einträge,
   jede Änderung mit Begründung.