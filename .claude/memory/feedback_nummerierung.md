---
name: feedback-nummerierung
description: AP-IDs nach Projekt-Schema nummerieren; Schritte/Abschnitte in Docs mit sprechenden Namen
metadata:
  type: feedback
---

Zwei getrennte Regeln — je nach Kontext:

**AP-IDs und Backlog-Einträge:** Nummerierungskonventionen des Projekts einhalten. APs folgen dem etablierten Schema (APP-01, AP-20, ST-16, DS-012, AF-19...). Distill-Kandidaten alphabetisch (A, B, C...). Kein freies Schema einführen ohne Alberts OK.

**Schritte und Abschnitte in Docs:** Knappe sprechende Namen vergeben statt Nummern oder Buchstaben-Suffixe (z.B. „Layer-1-Fingerabdruck" statt „Schritt 3b", „Gate-Checkliste" statt „§4"). Namen bleiben konstant unabhängig von Strukturänderungen.

**Why (AP-IDs):** Konsistentes Schema ist Voraussetzung für automatisierte Auswertung durch Hook und Haiku-Dispatch. Kollisionen und Suchprobleme bei freier Nummerierung.

**Why (Schritte/Abschnitte):** Albert: „Weder Nummern noch Buchstaben-Suffixe — bevorzugt knappe sprechende Namen, die immer konstant bleiben." Nummern erzeugen Drift bei Strukturänderungen und erzwingen Querverweise-Updates.

**How to apply:** Neue AP-ID: im BACKLOG.md prüfen was der letzte vergebene Wert ist. Neue Schritt-Bezeichnung in Docs: semantischen Namen vergeben. Wenn Nummerierung systembedingt unvermeidbar: Alberts Präferenz prüfen.
