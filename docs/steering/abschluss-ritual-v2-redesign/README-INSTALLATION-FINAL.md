# Installation: Abschluss-Ritual Final

Dieses Paket enthält die finale Version nach Peer Review von Claude und Perplexity.

## Enthaltene Zielpfade

```text
.claude/skills/abschluss-ritual/SKILL.md
.claude/agents/abschluss-writer.md
docs/steering/ABSCHLUSS-RITUAL-FINAL-ENTSCHEIDUNG.md
README-INSTALLATION-FINAL.md
```

## Einbau

1. ZIP entpacken.
2. Dateien in dieselben Pfade im Repo kopieren.
3. Vorhandene `SKILL.md` und `abschluss-writer.md` ersetzen.
4. Entscheidungsdokument im passenden Verzeichnis in `docs/steering/` ablegen.
5. Commit erstellen.

## Empfohlene Commit-Message

Abschluss-Ritual Final: Drift-sichere Token-Optimierung

Was war das Problem?
Der Abschluss-Skill ist zentral und hochfrequent. Die V2.1 war konzeptionell fertig, brauchte aber nach Peer Review noch Patches für Terminologie, Kettenkredit, NAVIGATION-Mehrdeutigkeit, BACKLOG-FAIL, Sessionwechsel und Archivformat.

Wie wurde es gelöst?
Der Skill und der abschluss-writer wurden final gepatcht. Ketten-Minimalabschluss bleibt vollständig für startkritische Artefakte, Deferred bleibt auf Reflexionschecks begrenzt, Haiku darf nur Literal-Edits ausführen, und bei Unsicherheit fragt Claude.

Warum ist die Lösung sicher?
BACKLOG, BACKLOG-ARCHIV, NAVIGATION, PROJECT-STATUS/HOOK-META und session-log bleiben nach jedem echten AP-Abschluss korrekt. NAVIGATION-Mehrdeutigkeit und BACKLOG-FAIL haben definierte Fehlerpfade.

Betroffene Bereiche:
.claude/skills/abschluss-ritual/SKILL.md
.claude/agents/abschluss-writer.md
docs/steering/ABSCHLUSS-RITUAL-FINAL-ENTSCHEIDUNG.md

Kontext:
Peer Review Claude + Perplexity, Endentscheidung P1–P6

