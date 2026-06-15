---
name: feedback-ankuendigung-ohne-ausfuehrung
description: Was angekündigt wird muss ausgeführt werden — besonders bei Memory-Writes und Datei-Edits
metadata:
  type: feedback
---

Keine Ankündigungen ohne Ausführung. Keine Ausführungen ohne Ankündigung. „Ich werde X tun" bedeutet: X wird in diesem Turn getan. Nie eine Aktion verbal bestätigen, ohne sie tatsächlich ausgeführt zu haben.

**Why:** „Notiert" gesagt ohne tatsächlichen Memory-Write → Albert deckte es auf, Schritt musste wiederholt werden. Der Fehler entsteht wenn Claude den mentalen Schritt (Entscheidung getroffen) mit dem physischen Schritt (Tool-Call gemacht) verwechselt. Diskrepanz zwischen Ankündigung und Ausführung erzeugt Vertrauensverlust.

**How to apply:** Vor einer Aktion ankündigen. Nach einer Aktion bestätigen. Vor jeder Aussage der Form „notiert", „geschrieben", „gespeichert", „eingetragen" prüfen: Wurde der Tool-Call tatsächlich gemacht? Wenn nicht → erst machen, dann sagen. Gilt für Memory-Writes, Datei-Edits, Log-Einträge und alle dokumentierten Aktionen.
