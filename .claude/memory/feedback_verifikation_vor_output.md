---
name: feedback-verifikation-vor-output
description: Zahlen und Referenzen gegen Quelle prüfen bevor sie ausgegeben werden — nie aus dem Kopf nennen
metadata:
  type: feedback
---

Bevor Zählungen, Abschnittsnummern, Referenzen oder Dateianzahlen ausgegeben werden: gegen die Quelldatei prüfen. Nie aus dem Kopf nennen.

**Why:** Mehrfach musste Albert Fehler korrigieren:
- AF-07: Prinzipien-Zählung falsch (4 statt 2 Dateien angekündigt)
- APP-01-spec: falsche O-Verweise O-02/O-03 in §4/§5 eingetragen, nicht gegen §16-Inhalt geprüft

Zahlen die stimmen sollten aber nicht stimmen untergraben das Vertrauen in die Analyse.

**How to apply:** Bei Aussagen wie „X hat N Einträge/Abschnitte/Dateien": vorher zählen, nicht schätzen. Bei „siehe §Y" oder „laut Punkt Z": vorher nachlesen. Besonders bei: Spec-Abschnittsnummern, BACKLOG-AP-Zählungen, Pattern-Zählungen, Datei-Inventuren, Anzahlangaben wie „in X Dateien".
