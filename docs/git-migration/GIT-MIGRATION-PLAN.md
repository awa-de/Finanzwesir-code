# Git-Migration Finanzwesir 2.0

Stand: 2026-05-03 | Bereit zur Ausführung

---

## Kontext

Albert ist Git-Laie. Jeder Schritt muss erklärt werden: was passiert, warum,
was er sieht, was als nächstes kommt. Kein Schritt ohne Bestätigung von Albert.

Ausgangslage:
- Root `z:\Documents\Nextcloud\Finanzwesir 2.0\` ist KEIN Git-Repo
- `Theme\.git\` ist ein altes lokales Git mit Remote `git@github.com:awa-de/finanzwesir-chart-engine.git`
- Dieses alte Git wird stillgelegt — GitHub-Repo bleibt als Archiv erhalten
- Neues GitHub-Repo heißt: `Finanzwesir-code` (unter awa-de), privat
- Neues Repo wird NACH dem ersten lokalen Commit eingerichtet (kein Blocker jetzt)

---

## Was wir bauen

Ein einziges "Programmier-Git" an der Root, das alles Technische trackt:
Theme-Code, Dokumentation, Apps, Claude-Konfiguration — alles in einer
VSCode-Git-Ansicht, alles zusammen stagebar und pushbar.

Für Content (Artikel, Seiten) kommt später ein separates "Finanzwesir-Content"-Repo.
Das ist heute kein Thema.

---

## Schritt 1 — Altes Theme-Git stilllegen

Was passiert: Der versteckte `.git`-Ordner in `Theme/` wird gelöscht.
Das löscht nur die lokale Git-Datenbank — JS/CSS-Dateien bleiben vollständig erhalten.
GitHub-Repo `finanzwesir-chart-engine` bleibt online als Archiv.

```powershell
Remove-Item -Recurse -Force "z:\Documents\Nextcloud\Finanzwesir 2.0\Theme\.git"
```

Verifikation: In VSCode bei Theme/ kein Git-Symbol mehr sichtbar?

---

## Schritt 2 — .gitignore anpassen

Datei: `z:\Documents\Nextcloud\Finanzwesir 2.0\.gitignore`

Entfernen (Zeilen 16-17):
```
# Claude-Konfiguration (lokale Einstellungen, kein Deployment-Wert)
.claude/
```

Hinzufügen am Ende:
```
# Content-Dateien (gehören ins spätere Finanzwesir-Content-Repo)
content/
Inhalte alte Seite/
Rechtliche Seiten/
```

---

## Schritt 3 — .claude/.gitignore anlegen

Neue Datei `z:\Documents\Nextcloud\Finanzwesir 2.0\.claude\.gitignore`:
```
ATTEMPT-LOG.json
settings.local.json
Claude-verzeichnisbaum.txt
```

Diese drei Dateien sind maschinenspezifisch oder temporär.
Alles andere in `.claude/` (CLAUDE.md, Skills, Hooks) kommt ins Git.

---

## Schritt 4 — Neues Git anlegen

`git init` erstellt einen unsichtbaren `.git`-Ordner im Root — die neue Datenbank.

```powershell
cd "z:\Documents\Nextcloud\Finanzwesir 2.0"
git init -b master
```

Erwartete Ausgabe: `Initialized empty Git repository in ...`

---

## Schritt 5 — git status prüfen (VOR dem Commit)

```powershell
git status
```

SOLL erscheinen: Theme/, docs/, .claude/, Apps/, root-Dateien
DARF NICHT erscheinen: content/, Inhalte alte Seite/, Active Campaign Liste/

Bei Unerwartetem: STOPP, gemeinsam klären.

---

## Schritt 6 — Alles stagen

```powershell
git add .
git status
```

"Grün = bereit für Commit"

---

## Schritt 7 — Erster Commit

```powershell
git commit -m "Init: Programmier-Git Finanzwesir 2.0

Ersetzt Theme/.git/ (altes Deployment-Git, stillgelegt).
Versioniert: Theme/, docs/, .claude/, Apps/, root-Dateien.
Ausgeschlossen: content/, Archiv/, Active Campaign Liste/."
```

Verifikation:
```powershell
git log --oneline
```
Erwartete Ausgabe: 1 Zeile mit dem Commit.

---

## Schritt 8 — GitHub-Repo anlegen und verbinden

1. github.com → einloggen → "New repository"
2. Name: `Finanzwesir-code` → Private → KEIN README, KEIN .gitignore → Anlegen
3. GitHub zeigt danach Befehle — diese zwei ausführen:

```powershell
git remote add origin git@github.com:awa-de/Finanzwesir-code.git
git push -u origin master
```

Verifikation: GitHub-Seite neu laden → Dateien sichtbar.

---

## Schritt 9 — PROTECTED_PATHS.json bereinigen

Datei: `z:\Documents\Nextcloud\Finanzwesir 2.0\.claude\PROTECTED_PATHS.json`

Entfernen: Eintrag `Theme/.git/` (forbidden) — Verzeichnis existiert nicht mehr.
Entfernen oder anpassen: Eintrag `Theme/.gitignore` (protected).

---

## Offener Punkt — nach Migration als BACKLOG-Eintrag anlegen

**CL-02a: Datenquellen für Apps/ prüfen**
- Was liegt dort? Test-CSVs oder produktive Daten?
- Entscheidung: versionieren oder dauerhaft in .gitignore
- Prio: L

---

## Abschluss-Verifikation

1. VSCode Source Control zeigt nur ein Repo (kein Submodul-Eintrag)
2. Test: Zeile in Theme/assets/js/ ändern + Zeile in docs/ ändern
   → beide Dateien erscheinen zusammen in VSCode Source Control
3. content/ und Active Campaign Liste/ erscheinen nicht in `git status`
4. github.com/awa-de/Finanzwesir-code zeigt alle Dateien
