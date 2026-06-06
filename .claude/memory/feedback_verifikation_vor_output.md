---
name: feedback-verifikation-vor-output
description: Zahlen und Referenzen gegen Quelle prüfen bevor sie ausgegeben werden
metadata:
  type: feedback
---

Bevor Zählungen, Abschnittsnummern oder Referenzen ausgegeben werden: gegen die Quelldatei prüfen.

**Why:** Falsche Zahlen haben Albert zweimal zur manuellen Korrektur gezwungen — bei AF-07 (Prinzipien-Zählung) und APP-01-spec (Paragraph-Referenzen). Zahlen die stimmen sollten aber nicht stimmen untergraben das Vertrauen in die Analyse.

**How to apply:** Bei Aussagen wie „X hat N Einträge/Abschnitte/Dateien": vorher zählen, nicht schätzen. Bei „siehe §Y" oder „laut Punkt Z": vorher nachlesen. Besonders bei: Spec-Abschnittsnummern, BACKLOG-AP-Zählungen, Pattern-Zählungen, Datei-Inventuren.
