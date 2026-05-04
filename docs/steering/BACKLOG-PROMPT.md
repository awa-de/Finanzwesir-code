# Backlog-Prompt – Finanzwesir 2.0
Kopiere diesen Block als Eröffnungsnachricht in jeden neuen Faden.

## Kontext

Ghost.io-Theme für Finanzwesir 2.0. 100% Client-Side, kein Backend, kein Build-Step.
Alle Assets werden in `default.hbs` eingebettet. Dev: Live-Server auf lokalem HTML.

## Lesereihenfolge (Pflicht)

1. `docs/steering/BACKLOG.md` — alle offenen Aufgaben, nach Prio sortiert
2. Detail-Datei der gewählten Aufgabe (falls in Spalte „Detail" angegeben)
3. Relevante Spec aus `docs/spec/` (in Detail-Datei referenziert)
4. `.claude/CLAUDE.md` §Pre-Code-Gate — bindend vor jedem Code

## Aufgaben-Ablauf

1. Nächste ⬜-Aufgabe wählen: höchste Prio, alle Deps ✅ erfüllt
2. Plan in 3–5 Punkten formulieren — erst nach Alberts „OK": Code
3. Aufgabe umsetzen
4. Alberts Bestätigung abwarten
5. Abschluss-Ritual:
   a. `BACKLOG.md`: Zeile auf ✅ setzen → sofort nach `BACKLOG-ARCHIV.md` (append, Datum + Session) → Zeile in BACKLOG.md löschen
   b. `WORKING-FEATURES.md` aktualisieren (nur bei Engine-APs)
   c. Commit-Message im Template-Format liefern (Albert committet)
   d. `NAVIGATION.md` prüfen: neue Dateien angelegt? → eintragen

## Regeln

- Ein Faden = eine Aufgabe (keine zwei APs parallel)
- Kein `git commit` — Albert committet mit der gelieferten Message
- Plan vor Code (Pre-Code-Gate aus CLAUDE.md §Pre-Code-Gate ist bindend)
- Bei Entscheidungsbedarf: Albert fragen, nicht raten
- Neue Aufgabe während des Fadens? → in BACKLOG.md eintragen, nicht sofort umsetzen
