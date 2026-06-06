---
name: feedback-nummerierung
description: AP-IDs und Distill-Kandidaten nach Projekt-Schema nummerieren — kein freies Schema einführen
metadata:
  type: feedback
---

Nummerierungskonventionen des Projekts einhalten. APs folgen dem etablierten ID-Schema (APP-01, AP-20, ST-16, DS-012, AF-19...). Distill-Kandidaten alphabetisch (A, B, C...), Observing-Einträge mit Buchstaben in eckigen Klammern ([B], [C]...).

**Why:** Konsistentes Schema ist Voraussetzung für automatisierte Auswertung durch Hook und Haiku-Dispatch. Freie Nummerierung erzeugt Kollisionen und erschwert Suche.

**How to apply:** Vor einer neuen ID: im BACKLOG.md und session-log prüfen was der letzte vergebene Wert im jeweiligen Schema ist. Nie ein neues Schema einführen ohne Alberts OK.
