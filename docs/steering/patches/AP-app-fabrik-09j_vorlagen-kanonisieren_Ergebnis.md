Stand: 2026-07-18 20:06 | Session: AP-app-fabrik-09j | Geändert von: Claude

# AP-app-fabrik-09j — Prompt-Vorlagen kanonisieren + /app-duell dokumentieren — Ergebnis

Status: **GRÜN** (deterministisch bewiesen). Behebt: die drei dauerhaften Prompt-Vorlagen des Mockup-Duells lagen im gitignored `Archiv/local/muss noch eingeordnet werden/` und wurden vom Werkzeug hart von dort gelesen — nicht versioniert, kein Audit, Sync-Bruch, Bruchgefahr bei Archiv-Aufräumung.

## Beförderung (Move, bytegleich)

Neu, getrackt: `docs/App-Fabrik/vorlagen/`
- `AP-app-fabrik-06_psychosprint-grundprompt.md` → `PSYCHOSPRINT_GRUNDPROMPT.md` (`a73fdef7…`)
- `AP-app-fabrik-09_grok-gegenkritik_VORLAGE.md` → `GROK_GEGENKRITIK_VORLAGE.md` (`50b95980…`)
- `AP-app-fabrik-09_mockup-duell-sonnet_VORLAGE.md` → `SONNET_MOCKUP-DUELL_VORLAGE.md` (`20979e24…`)

Alte Namen/Ort sind weg; die drei Ziele sind getrackt-fähig (nicht mehr gitignored).

## Werkzeug-Diff (`tools/app-fabrik-psychosprint.py`)

- `ARCHIV_REL` entfernt; neu `VORLAGEN_REL = "docs/App-Fabrik/vorlagen"`.
- `TPL_REL["grok"|"sonnet"]` und `GRUNDPROMPT_REL` zeigen auf die neuen Pfade/Namen.
- Self-Test-Anker `arch` → `VORLAGEN_REL` (Stub-Vorlagen + „nichts in den Vorlagenordner"-Checks). Sonst nichts geändert; alle Garantien (Dry-Run, Nicht-Überschreiben, Validierung, Anonymisierung, SHA-256, Root-Schutz, Quellensperre-Marker AP-09g, Produktentscheidungs-Gate AP-09i) unberührt.

## Weitere Dateien

- `docs/App-Fabrik/MASTERPROMPT_MOCKUP-DUELL.md` — Bestandsdateien-Liste auf `docs/App-Fabrik/vorlagen/` umgestellt.
- `.claude/skills/app-duell/README.md` (neu) — Debug-/Abhängigkeitskarte (nicht im Betrieb geladen; verweist für die Vollliste auf den Masterprompt, dupliziert sie nicht).
- `.claude/skills/app-duell/SKILL.md` — eine Zeiger-Zeile auf die Debug-README + Changelog v1.0.1.

## Beweise

- `--self-test` → `SELF-TEST OK` (Exit 0): lädt die Vorlagen am neuen Ort, alle Fälle grün.
- Reale Dry-Runs belegen den neuen Fundort: `prepare --slug depot-kipppunkt` (liest `PSYCHOSPRINT_GRUNDPROMPT.md`) und `grok-paket --slug depot-kipppunkt` (liest `GROK_GEGENKRITIK_VORLAGE.md`) → beide grün, kein Write. (`sonnet-paket depot-kipppunkt` blockt weiterhin am 09i-Gate — offene Produktentscheidung, unverändert korrekt.)
- `py_compile` grün; Tool whitespace-frei; `tools/__pycache__/` entfernt.
- `git diff --check`: nur die vorbestehende `APP_FACTORY_STARTLINIE.md:3` (aus AP-08, von 09j nicht berührt).

## Nächster Schritt / offen

- Aufräumen des Rest-Archivs (`Archiv/local/muss noch eingeordnet werden/App-Fabrik/`): historische AP-/Review-Prompts. Als Lösch-Menü an Albert übergeben (Archiv/local ist unwiederbringlich → keine Blindlöschung).
- Kein Commit durch Claude.
