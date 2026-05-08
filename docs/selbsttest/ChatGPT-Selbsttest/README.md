# ZIP-Paket: `/selftest-chatgpt` für Claude Code

Dieses Paket enthält:

```txt
.claude/commands/selftest-chatgpt.md

docs/selftest-chatgpt/
  README.md
  ANWENDUNG.md
  ENTWURFSBEGRUENDUNG.md
  CHECKLISTE.md

examples/
  STARTPROMPTS.md
```

## Einbau

1. `.claude/commands/selftest-chatgpt.md` in dein Projekt kopieren.
2. `docs/selftest-chatgpt/` in dein Projekt kopieren.
3. Optional kurze Referenz in `CLAUDE.md` ergänzen.

## Nutzung

```txt
/start
/selftest-chatgpt quick
```

oder:

```txt
/start
/selftest-chatgpt full
```

oder:

```txt
/start
/selftest-chatgpt redteam
```

## Empfehlung zur Ablage

- Ausführbarer Command: `.claude/commands/selftest-chatgpt.md`
- Ausführliche Doku: `docs/selftest-chatgpt/`

Die Doku sollte nicht direkt neben die Commands gelegt werden, außer in einen klar markierten Unterordner wie `.claude/commands/_docs/selftest-chatgpt/`.
