# check-mode-gatekeeper

## Was dieser Skill soll

`check-mode-gatekeeper` ist dein QA- und Review-Skill.  
Er agiert als Gatekeeper und bewertet, ob ein Code-Stand produktionsreif ist – ohne selbst Code zu ändern.

## Was der Skill macht

- Analysiert Code in Bezug auf:
  - Korrektheit
  - Edge-Cases & Fehlerverhalten
  - Sicherheit
  - Performance
  - Lesbarkeit & Wartbarkeit
- Vergibt Scores pro Kategorie (z.B. 1–5) und begründet sie.
- Listet konkrete Probleme und Risiken auf.
- Schlägt priorisierte Verbesserungsmaßnahmen vor.
- Hält offene Fragen und Unsicherheiten fest.

Er liefert also eine strukturierte Qualitätsbewertung und Entscheidungsgrundlage für Go/No-Go.

## Wie und wann du ihn einsetzt

Typische Einsatzmomente:

- Nach einer Implementierungsrunde (z.B. nach Nutzung von `impl-mode-workpackages`).
- Vor einem Release oder vor der Integration in ein Theme/Template.
- Wenn du wissen willst, ob ein Code-Teil eher „Proof-of-Concept“ oder „prod-nah“ ist.
- Bei sicherheits- oder fachlich kritischen Modulen (z.B. Finanzlogik, Auth, Rendering-Sandbox).

Ablauf:

1. Du gibst:
   - den relevanten Code (Dateien oder Ausschnitte),
   - optional die Spezifikation,
   - optional Kontext (wie kritisch, welche Umgebung).
2. Der Skill liefert:
   - Kurzfazit,
   - Score-Tabelle mit Begründungen,
   - Liste gefundener Probleme,
   - priorisierte Handlungsempfehlungen,
   - offene Fragen.

## Was du erwarten kannst

- Eine klare, strukturierte Sicht auf die Code-Qualität.
- Transparente Prioritäten: Was muss zuerst angegangen werden?
- Bessere Entscheidungsgrundlage, ob etwas in Produktion darf.
- Ein konsistentes Review-Format, das du über viele Iterationen vergleichen kannst (z.B. zur Technical-Debt-Entwicklung).
