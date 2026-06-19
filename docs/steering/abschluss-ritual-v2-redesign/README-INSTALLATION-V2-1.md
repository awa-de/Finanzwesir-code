# Installation: Abschluss-Ritual V2.1 Review-Paket

Dieses Paket ist für ein finales Peer Review gedacht, noch nicht zwingend für direkten Produktiveinsatz.

## Enthaltene Dateien

```text
.claude/skills/abschluss-ritual/SKILL.md
.claude/agents/abschluss-writer.md
docs/steering/ABSCHLUSS-RITUAL-V2-1-ENTSCHEIDUNG.md
docs/steering/PEER-REVIEW-ABSCHLUSS-RITUAL-V2-1.md
```

## Vorgehen

1. Paket entpacken.
2. Dateien an die entsprechenden Zielpfade im Repo verschieben.
3. Zuerst Claude und Perplexity mit `PEER-REVIEW-ABSCHLUSS-RITUAL-V2-1.md` prüfen lassen.
4. Feedback konsolidieren.
5. Erst danach `SKILL.md` produktiv übernehmen.

## Noch nicht enthalten

Ein Python-Validator für HOOK-META ist in dieser Markdown-Version nicht enthalten.

Empfehlung nach Peer Review:

- Entweder vorhandenen Validator aus V2 übernehmen,
- oder separat als Code-AP erstellen.

## Commit-Message-Vorschlag nach finalem Einspielen

Abschluss-Ritual V2.1: Drift-sicherer Kettenabschluss

Was war das Problem?
Der Abschluss-Skill ist zentral und hochfrequent. Die frühere Token-Optimierung riskierte temporären Drift, weil BACKLOG/ARCHIV im Kettenmodus aufgeschoben werden konnten.

Wie wurde es gelöst?
Der Kettenmodus aktualisiert jetzt alle start- und steuerungskritischen Artefakte sofort. Deferred ist nur noch für Memory-/Spec-/Working-Features-Checks erlaubt. Bei Modusunsicherheit fragt Claude aktiv nach.

Warum ist die Lösung sicher?
PROJECT-STATUS/HOOK-META, NAVIGATION, BACKLOG, BACKLOG-ARCHIV und session-log bleiben nach jedem AP korrekt. Haiku darf nur mechanische Literal-Edits ausführen. Bei Zweifel fällt der Skill auf Vollabschluss zurück.

Betroffene Bereiche:
  .claude/skills/abschluss-ritual/SKILL.md
  .claude/agents/abschluss-writer.md
  docs/steering/ABSCHLUSS-RITUAL-V2-1-ENTSCHEIDUNG.md
  docs/steering/PEER-REVIEW-ABSCHLUSS-RITUAL-V2-1.md

Kontext:
  Abschluss-Ritual Token-Optimierung, philosophischer Review, Genauigkeit vor Preis
