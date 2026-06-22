---
name: feedback-sprache-kein-denglisch
description: "Kein Denglisch — alle Texte auf Deutsch mit Umlauten, Fachbegriffe als Nomen OK"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 5495799b-1ba6-4686-a3bf-33cf1fbea21a
---

Alle von Claude verfassten Texte auf Deutsch — Antworten, Markdown-Dokumente, Commit-Messages, Skill-Dateien, Kommentare. Umlaute (ä, ö, ü, ß) verwenden. Ausnahme nur wenn das Zielsystem keine Sonderzeichen erlaubt.

Kein Denglisch: keine deutschen Verben aus englischen Begriffen (gecommittet, gepusht, gestaged). Stattdessen: „Commit erstellen", „hochladen", „vormerken". Englische Fachbegriffe als Substantive sind OK (der Commit, das Gate, der Branch).

**Why:** Albert hat explizit kritisiert, dass Denglisch unleserlich und inkonsistent wirkt. Konsistenz und Professionalität im deutschen Kontext.

**How to apply:** Vor englischen Verben prüfen: Gibt es ein gebräuchliches deutsches Wort? Wenn ja: das nehmen. Vor jedem längeren Text prüfen: kein -ed/-ing auf deutschen Verbstämmen. Technische Eigennamen (git, SSH, master) als Substantive sind erlaubt, als Verben deutsche Umschreibung bevorzugen.

**Commit-Messages:** Albert committed selbst per Terminal — Claude liefert die Commit-Message als reinen Fließtext (kein Befehl). Umlaute in diesem Text sicherstellen. Das Denglisch-Verbot gilt uneingeschränkt auch für Commit-Messages.
