Stand: 2026-07-19 19:30 | Session: Ghost-Lokalbetrieb umsetzen | Geändert von: Codex

# Lokaler Ghost-Betrieb – Kochbuch für die temporäre Entwicklungsumgebung

## 1. Ziel und Systemgrenze

Diese Anleitung erzeugt eine ersetzbare Ghost-6-Entwicklungsinstanz für Finanzwesir. Sie dient nur zum Prüfen von Theme, Inhalten und Apps im Browser.

- Projektquellen bleiben im Repository: `Theme/`, `content/` und `Apps/`.
- Die gesamte Ghost-Laufzeit liegt außerhalb des Repositories unter `C:\Tools\ghost-local\`.
- Die Produktionsumgebung erhält später eine eigene reguläre Ghost-Installation. Übernommen werden Theme-ZIP, Ghost-Inhaltsexport sowie bei Bedarf Medien, `routes.yaml` und Redirects.

Nicht Bestandteil sind Docker, MySQL, Produktionshärtung, Performance-Arbeit oder ein automatischer Markdown-Massenimport.

## 2. Festgelegte technische Entscheidung

Ghost 6 benötigt Node 22. Der Rechner kann weiterhin global Node 24 verwenden; Ghost erhält eine portable, ausschließlich lokale Node-22-Kopie.

Das vorhandene System-Python bleibt unverändert. Ghost-CLI benötigt für die lokale SQLite-Installation Python plus `setuptools`. Deshalb gibt es nur ein lokales Python-Umfeld unter `C:\Tools\ghost-local\runtime\python-env\`.

Die Installation verwendet weder einen Node-MSI-Installer noch globales npm. Die notwendige Prozessumgebung wird nur im Ghost-Starter gesetzt. Damit werden `PATH`, Registry und die normalen Node-/Python-Installationen des Rechners nicht verändert.

## 3. Zielverzeichnisbaum

```text
C:\Tools\ghost-local\
├─ downloads\
│  └─ node-v22.23.1-win-x64.zip       # heruntergeladene portable Node-Version
├─ runtime\
│  ├─ node22\                         # entpacktes Node 22, kein MSI
│  ├─ ghost-cli\                      # lokale npm-Installation von Ghost-CLI
│  ├─ python-env\                     # venv mit setuptools und python3.cmd
│  ├─ npm-cache\
│  └─ pip-cache\
├─ site\                              # vollständige lokale Ghost-Instanz
│  ├─ content\                        # SQLite, Bilder, Themes, Logs
│  ├─ current\                        # aktive Ghost-Version
│  ├─ versions\6.53.0\                # installierte Ghost-Version (Beispiel)
│  ├─ .ghost-cli                       # Instanz-Metadaten
│  └─ config.development.json          # localhost:2368 und SQLite
├─ state\
│  ├─ userprofile\                    # isoliertes Ghost-CLI-Profil, einschließlich .ghost\config
│  ├─ appdata\
│  ├─ localappdata\
│  └─ reset-backup\                    # umbenannte SQLite-Dateien vor einem Reset
└─ start-ghost.ps1                     # einziger Startpunkt
```

`Theme/` wird nicht direkt aus dem NAS ausgeführt. Erst ein gültiges Ghost-Theme wird als Testkopie nach `site\content\themes\` übertragen; die Quellwahrheit bleibt `Theme/` im Projekt.

## 4. Einmalig installieren

Die folgenden Schritte führt ein LLM oder Entwickler in PowerShell aus. Alle Variablen beziehen sich ausdrücklich auf `C:\Tools\ghost-local`.

### 4.1 Grundverzeichnisse anlegen

```powershell
$ghostRoot = 'C:\Tools\ghost-local'
New-Item -ItemType Directory -Force -Path `
  "$ghostRoot\downloads", "$ghostRoot\runtime", "$ghostRoot\site", `
  "$ghostRoot\state\userprofile", "$ghostRoot\state\appdata", "$ghostRoot\state\localappdata" | Out-Null
```

### 4.2 Node 22 portabel bereitstellen

Die aktuelle Node-22-Windows-x64-ZIP von `nodejs.org` herunterladen, SHA-256 gegen die offizielle Prüfsumme prüfen und nach `runtime\node22\` entpacken. Kein MSI-Installer, kein globaler `PATH`-Eintrag.

Erwartete Prüfung:

```powershell
& 'C:\Tools\ghost-local\runtime\node22\node.exe' --version
```

Die erprobte Installation verwendet Node `v22.23.1`.

### 4.3 Lokales Python-Umfeld vorbereiten

Das vorhandene Python auf dem Rechner nur zum Erzeugen des venv verwenden; es wird weder aktualisiert noch verändert.

```powershell
$ghostRoot = 'C:\Tools\ghost-local'
& 'C:\Python314\python.exe' -m venv "$ghostRoot\runtime\python-env"
& "$ghostRoot\runtime\python-env\Scripts\python.exe" -m pip install setuptools
```

Ghost-CLI 1.30.0 ruft bei seinem SQLite-Check unter Windows ausschließlich `python3` auf. Ein Windows-venv enthält standardmäßig nur `python.exe`. Deshalb zusätzlich diese Datei anlegen:

`C:\Tools\ghost-local\runtime\python-env\Scripts\python3.cmd`

```cmd
@echo off
"C:\Tools\ghost-local\runtime\python-env\Scripts\python.exe" %*
```

Prüfung:

```powershell
$env:PATH = 'C:\Tools\ghost-local\runtime\python-env\Scripts;' + $env:PATH
python3 --version
```

### 4.4 Ghost-CLI lokal installieren

```powershell
$ghostRoot = 'C:\Tools\ghost-local'
$env:PATH = "$ghostRoot\runtime\node22;" + $env:PATH
$env:npm_config_cache = "$ghostRoot\runtime\npm-cache"
New-Item -ItemType Directory -Force -Path "$ghostRoot\runtime\ghost-cli" | Out-Null
Set-Location "$ghostRoot\runtime\ghost-cli"
& "$ghostRoot\runtime\node22\npm.cmd" install ghost-cli
```

Der lokale CLI-Aufruf lautet anschließend:

```powershell
& 'C:\Tools\ghost-local\runtime\node22\node.exe' `
  'C:\Tools\ghost-local\runtime\ghost-cli\node_modules\ghost-cli\bin\ghost' --version
```

Die erprobte Installation verwendet Ghost-CLI `1.30.0`.

### 4.5 Ghost mit SQLite installieren

Vor dem Aufruf die isolierte Prozessumgebung setzen. Diese Werte gelten nur für die aktuelle PowerShell und ihren Kindprozess.

```powershell
$ghostRoot = 'C:\Tools\ghost-local'
$env:PATH = "$ghostRoot\runtime\python-env\Scripts;$ghostRoot\runtime\node22;" + $env:PATH
$env:USERPROFILE = "$ghostRoot\state\userprofile"
$env:APPDATA = "$ghostRoot\state\appdata"
$env:LOCALAPPDATA = "$ghostRoot\state\localappdata"
$env:npm_config_cache = "$ghostRoot\runtime\npm-cache"
New-Item -ItemType Directory -Force -Path $env:USERPROFILE, $env:APPDATA, $env:LOCALAPPDATA | Out-Null

Set-Location "$ghostRoot\site"
& "$ghostRoot\runtime\node22\node.exe" `
  "$ghostRoot\runtime\ghost-cli\node_modules\ghost-cli\bin\ghost" install local --no-prompt
```

Ghost legt dabei `config.development.json` mit SQLite und `http://localhost:2368/` an. Die konkrete Ghost-Version darf sich bei einer Neuinstallation ändern; deshalb nicht hart kodieren.

## 5. Startskript anlegen

`ghost start` startet unter Windows einen abgekoppelten Kindprozess mit einer zweiten Konsole. `ghost run` gibt bei direktem Aufruf nur einen Hinweis aus und kehrt zurück. Für den einfachen, sichtbaren Betrieb startet der erprobte Starter den eigentlichen Ghost-Server direkt.

Datei: `C:\Tools\ghost-local\start-ghost.ps1`

```powershell
# Startet ausschliesslich die lokale Ghost-Entwicklungsinstanz in diesem Fenster.
$ErrorActionPreference = 'Stop'

$ghostRoot = 'C:\Tools\ghost-local'
$env:PATH = "$ghostRoot\runtime\python-env\Scripts;$ghostRoot\runtime\node22;$env:PATH"
$env:USERPROFILE = "$ghostRoot\state\userprofile"
$env:APPDATA = "$ghostRoot\state\appdata"
$env:LOCALAPPDATA = "$ghostRoot\state\localappdata"
$env:npm_config_cache = "$ghostRoot\runtime\npm-cache"
$env:NODE_ENV = 'development'

Set-Location -LiteralPath "$ghostRoot\site"
$Host.UI.RawUI.WindowTitle = 'Ghost lokal - laufender Entwicklungsserver'
Write-Host 'Ghost laeuft in diesem Fenster. Zum Beenden Strg+C druecken.'
& "$ghostRoot\runtime\node22\node.exe" 'current/index.js'
```

## 6. Täglicher Start, Browser und Stopp

### Start

PowerShell öffnen und ausführen:

```powershell
powershell.exe -NoExit -ExecutionPolicy Bypass -File 'C:\Tools\ghost-local\start-ghost.ps1'
```

Es öffnet sich genau ein Fenster. Nicht schließen, solange Ghost laufen soll. Ein erfolgreicher Start zeigt mindestens:

```text
Listening on: 127.0.0.1:2368
Ghost booted in ...
```

Danach öffnen:

- Website: `http://localhost:2368/`
- Verwaltung: `http://localhost:2368/ghost/`

### Ersteinrichtung

Auf einer frischen Datenbank leitet Ghost nach `http://localhost:2368/ghost/#/setup` weiter. Das ist korrekt. Titel, Name, E-Mail und Passwort einmal eintragen und absenden, während das Ghost-PowerShell-Fenster geöffnet bleibt.

Ghost legt vor dem Setup bereits einen inaktiven Owner-Datensatz an. Das ist Standardzustand und kein defekter Teilimport.

### Stopp

Im sichtbaren Ghost-PowerShell-Fenster einmal `Strg+C` drücken und warten, bis die Meldung `Ghost has shut down` sowie wieder ein `PS ...>`-Prompt erscheint. Erst dann das Fenster schließen.

## 7. Diagnose und lokaler Reset

### Website nicht erreichbar

1. Prüfen, ob das Ghost-PowerShell-Fenster noch offen ist.
2. Prüfen, ob es `Listening on: 127.0.0.1:2368` ausgibt.
3. Nicht `ghost start` verwenden und keine zweite, leere PowerShell-Konsole schließen; der Starter aus Abschnitt 5 ist der einzige Standardweg.
4. Bei aktivem Ghost antwortet dieser Test mit HTTP 200:

```powershell
Invoke-WebRequest 'http://localhost:2368/ghost/' -UseBasicParsing
```

Die Meldungen zu SQLite/Knex, `Explore URL not set` und ActivityPub-Webhooks blockieren den lokalen Betrieb nicht.

### Frische Datenbank erzeugen

Nur verwenden, solange keine schützenswerten lokalen Inhalte existieren.

1. Ghost sauber mit `Strg+C` stoppen.
2. Sicherstellen, dass Port 2368 frei ist.
3. Die Datenbank umbenennen oder verschieben, nicht direkt löschen:

```powershell
$ghostRoot = 'C:\Tools\ghost-local'
$stamp = Get-Date -Format 'yyyy-MM-ddTHHmmss'
$backup = "$ghostRoot\state\reset-backup\$stamp"
New-Item -ItemType Directory -Force -Path $backup | Out-Null
Move-Item -LiteralPath "$ghostRoot\site\content\data\ghost-local.db" -Destination "$backup\ghost-local.db"
```

4. Den Starter aus Abschnitt 6 wieder ausführen. Ghost erzeugt eine neue SQLite-Datenbank und zeigt das Setup erneut.

## 8. Theme, Inhalte und Produktionsumzug

Die lokale Installation ist nur Laufzeit. Fachliche Arbeit bleibt im Repository.

1. Ein gültiges Theme aus `Theme/` als ZIP in Ghost hochladen. Voraussetzung sind die notwendigen Ghost-Templates, insbesondere `index.hbs` und `post.hbs`.
2. Inhalte erst nach einer bewusst festgelegten Importstrategie in Ghost übernehmen. Das Projekt-Markdown wird nicht automatisch importiert.
3. Für den Produktionsumzug Ghost-Inhalte als JSON exportieren und das Theme als ZIP bereitstellen; bei Verwendung zusätzlich Medien, `routes.yaml` und Redirects.
4. Auf dem Produktionsserver eine eigene Ghost-Installation einrichten und dort Theme, Inhalte und Medien importieren.

## 9. Finale Entfernung nach dem Produktionsumzug

Vorher sicherstellen: Produktion geprüft, Theme und Inhalte exportiert, lokale Testdaten nicht mehr benötigt.

1. Ghost wie in Abschnitt 6 stoppen.
2. Den exakten Zielpfad prüfen: `C:\Tools\ghost-local`.
3. Den gesamten Ordner löschen. Damit verschwinden Ghost, SQLite, lokale Node 22, Ghost-CLI, Python-venv, Caches und die Sicherungsdaten gemeinsam.

`C:\Tools` selbst bleibt als übergeordneter Werkzeugordner erhalten. Es gibt keine Ghost-Registry-Einträge, keine globale npm-Installation und keine Änderung am System-Python oder am globalen Node 24. Browser-Verlauf, Defender-/Download-Historie und Windows-Prefetch sind allgemeine Windows-Spuren und nicht Teil der Ghost-Laufzeit.
