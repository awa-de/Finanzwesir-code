---
name: feedback-review-als-datei
description: Reviews als committed Files ablegen — kein direkter Claude-Beschluss bei Evaluierungen
metadata:
  type: feedback
---

Spec-Gate-Reports, FAANG-Reviews und Evaluierungen werden als eigenständige Dateien committed, nicht nur als Chat-Output ausgegeben. Bei Evaluierungen keine direkten Beschlüsse fassen — kommentierte Review-Datei als Entscheidungsgrundlage liefern.

**Why:** Chat-Output ist flüchtig und nicht nachschlagbar. Albert: „Review als eigenständige kommentierte Datei — Albert liest selbst, entscheidet selbst; kein direkter Claude-Beschluss." Beispiel: SPEC_GATE_REPORT.md in Apps/prokrastinations-preis/.

**How to apply:** Nach Spec-Gate, FAANG-Review oder Evaluierungsaufgabe: Report-File anlegen (SPEC_GATE_REPORT.md, REVIEW_[NAME].md o.ä.), committen. Bei Evaluierungen (z.B. /finde-skills, Option A vs. B): kommentierte Datei mit Pro/Contra erstellen. Empfehlung als „Tendenz" formulieren — nie als abschließenden Beschluss.
