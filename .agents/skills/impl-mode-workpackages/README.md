# impl-mode-workpackages

## Was dieser Skill soll

`impl-mode-workpackages` ist dein Implementierer-Skill für **kleine, klar definierte Arbeitspakete**.  
Er setzt vorhandene Spezifikationen in Code + Tests um – im Stil deiner bestehenden Codebase.

## Was der Skill macht

- Implementiert gezielt einen abgegrenzten Baustein (Funktion, Modul, Hook, etc.).
- Hält sich an vorhandene Spezifikationen (Ziel, Edge-Cases, Testfälle, API).
- Schreibt passende Tests mit (Normalfälle, Edge-Cases, Fehlerfälle).
- Respektiert Architektur, Patterns und Konventionen deiner Codebase.

Er versucht nicht, „das ganze System“ auf einmal neu zu bauen, sondern arbeitet taskbasiert.

## Wie und wann du ihn einsetzt

Typische Einsatzmomente:

- Wenn du aus einer Spezifikation konkrete Implementierung brauchst.
- Wenn du ein Feature in kleine Workpackages geschnitten hast (z.B. einzelne Utility-Funktionen, Adapter, Renderer).
- Wenn du inkrementell bauen willst: erst ein Baustein + Tests, dann der nächste.

Ablauf:

1. Du gibst:
   - eine klare Beschreibung des Workpackages,
   - die zugehörige Spezifikation (idealerweise aus `spec-mode-architecture`),
   - relevante Code-Ausschnitte/Dateien und Constraints.
2. Der Skill liefert:
   - Kurzüberblick, was er getan hat,
   - Implementierung als vollständigen Code-Block,
   - dazu passende Tests,
   - Hinweise/TODOs.

## Was du erwarten kannst

- Fokussierte Implementierungen, die in deine bestehende Architektur passen.
- Weniger „Scope Creep“, weil der Skill nur den expliziten Scope bearbeitet.
- Sauberere Tests, weil sie aus der Spezifikation abgeleitet werden.
- Einen guten Fit mit deinem Gatekeeper-/Review-Skill, der danach die Qualität beurteilen kann.
