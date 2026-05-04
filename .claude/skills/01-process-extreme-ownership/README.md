# Wann der Skill greift
Der Skill ist als „Briefing-Validator“ gebaut; er soll nur bei neuen Projekten/Vorhaben anspringen, nicht bei jeder kleinen Rückfrage.
Typischer Startpunkt: Neues Feature, neues Produkt, neue Content‑Serie, neuer Prozess etc.
Konkrete Aufruf-Prompts
Beispiele, die du direkt in Claude Code verwenden kannst:

## Variante 1 – sehr explizit
Nutze den Skill 01-process-extreme-ownership.
Hier ist mein Briefing für ein neues Projekt.
Bitte zuerst nur Briefing-Analyse und Lücken-Report nach deinem Skill, noch keine Lösungen oder Umsetzung.
[Briefing-Text einfügen]

## Variante 2 – eingebauter Ablauf
Für dieses neue Projekt sollst du als erstes den Skill 01-process-extreme-ownership anwenden.
Phase 1 \& 2 deines Skills (Analyse + Briefing-Report).
Erst wenn Briefing-Score ≥ 7/10 oder ich „Starte trotzdem“ schreibe, beginnst du mit der Ausführung.
[Briefing-Text einfügen]

## Variante 3 – dauerhaft für einen Chat-Thread
In diesem Chat gilt: Wende bei jedem neuen Projektbeschrieb zuerst den Skill 01-process-extreme-ownership an, bevor du Inhalte oder Code lieferst.
Hier ist das erste Briefing:
[Briefing-Text]

## Praktische Nutzung in deinem Workflow

1. Neues Projekt → du schreibst dein bestes Briefing in VS Code.
2. Neue Claude‑Code‑Session öffnen.
3. Einen der obigen Aufruf‑Prompts + Briefing einfügen.
4. Claude antwortet mit dem Briefing‑Report (Klar/Lücken/Blocker, Fragen, Score).
5. Du beantwortest die Rückfragen oder sagst: „Starte trotzdem“.
6. Erst dann bittest du um konkrete Ausführung („Jetzt bitte Umsetzung starten, gleiche Session“).