Stand: 2026-07-20 | Session: APP-DATA-03b | Geändert von: Claude

# APP-DATA-03b — HTTP-Upload-Dienst kontrolliert zurückgebaut

## Status: GELB

Funktional vollständig, kein Blocker. GELB statt GRÜN wegen einer bekannten, von Albert
explizit akzeptierten Restabweichung bei einem der vier Negativnachweise (leeres
Verzeichnis ließ sich nicht entfernen, siehe unten).

## Ausgangslage

Der lokale HTTP-Upload-Dienst unter `tools/upload-dienst/` (Port 4790, aus APP-DATA-02)
wurde durch den Offline-CSV-Prüfer unter `content/files/app-data/` (APP-DATA-03a, inkl.
automatischer Datenform-Erkennung) ersetzt und war ein verworfener Architekturpfad.
Auftrag: kontrollierter, verifizierter Rückbau — kein Datenverlust, keine Berührung der
Tabu-Zonen oder des Offline-Prüfers.

## Ergebnis der Prozess- und Referenzvorprüfung

- **Referenzsuche:** keine nicht-historische Laufzeitreferenz auf `tools/upload-dienst`,
  Port `4790` oder das Startskript gefunden (Theme, Apps, tests,
  `content/files/app-data`, `package.json`, `PROJECT-STATUS.md`, `NAVIGATION.md`
  geprüft). Drei Zufallstreffer für „4790" in SVG-Dateien waren Zeichenkoordinaten,
  keine Portreferenzen.
- **Prozessprüfung:** Ein Prozess lauschte tatsächlich auf `127.0.0.1:4790`.
  Verifiziert über `Get-NetTCPConnection`/`Win32_Process`: PID 28584, Kommandozeile
  exakt `node.exe ".../tools/upload-dienst/server.js"`. Kommandozeile unmittelbar vor
  dem Beenden erneut geprüft, dann ausschließlich diese PID beendet. Kein anderer
  Node- oder Ghost-Prozess angefasst.

## Exakt entfernte Dateien und `.gitignore`-Delta

Entfernt (teils manuell durch Albert, teils durch Claude):

- `tools/upload-dienst/server.js`
- `tools/upload-dienst/config.example.json`
- `tools/upload-dienst/config.local.json`
- `tools/upload-dienst/package.json`
- `tools/upload-dienst/start-upload-dienst.ps1`
- `tools/upload-dienst/public/upload.html`

Root-`.gitignore`: 3 Zeilen entfernt (Kommentarblock +
`tools/upload-dienst/config.local.json`), Rest der Datei unverändert.

`content`-Repository: nicht angefasst. Historische Patch-/Übergabedokumente: nicht
angefasst.

## Negativnachweise

| Nachweis | Ergebnis |
|---|---|
| Port 4790 frei | ✅ `ECONNREFUSED` bei Verbindungsversuch nach Prozessende |
| Keine Laufzeitreferenzen | ✅ keine außerhalb historischer Patch-Dokumente |
| Root-`.gitignore` ohne verwaisten Eintrag | ✅ bestätigt |
| `tools/upload-dienst/` existiert nicht mehr | ⚠️ teilweise: alle Dateien und `public/` entfernt, das leere Top-Level-Verzeichnis selbst ließ sich nicht löschen (Windows: „Der Prozess kann nicht auf die Datei zugreifen, da sie von einem anderen Prozess verwendet wird" — vermutlich ein offenes Explorer-/Sync-Handle). Auf Alberts ausdrückliche Anweisung („halten wir uns nicht damit auf") so belassen. Keine funktionale Wirkung. |

## Positivnachweise

- `content/files/app-data/csv-validator.mjs` und `pruefe-csv.bat`: vorhanden,
  unverändert.
- `tests/csv-validator.test.mjs`: erneut ausgeführt, alle Nachweise grün.
- `CSVParser.js`, `FinanzwesirData.js`, `ChartEngine.js`,
  `.claude/PROTECTED_PATHS.json`: in diesem AP nicht angefasst (als „M" markierte
  Zeilen in `git status` stammen aus dem bereits abgeschlossenen APP-DATA-02, nicht aus
  diesem Auftrag).
- Theme, Ghost-Installation, `C:\Tools\ghost-local\site\content\files\app-data`:
  unangetastet (Verzeichnisinhalt unverändert: `bd_many_years.csv`,
  `test_data-Liniendiagramm.csv`, `test_data_multibalken.csv`,
  `test_data_singlebalken.csv`, `test_data_torte.csv` — Alberts eigene frühere
  Testdateien).

## Restabweichungen oder Blocker

- Leeres Verzeichnis `tools/upload-dienst/` bleibt physisch bestehen (kein Inhalt,
  keine Funktion) — auf Alberts Anweisung akzeptiert, kein Blocker.
- Keine Commits durchgeführt (liegt bei Albert).

## Damit abgeschlossen: CSV-Upload-Pipeline APP-DATA-00 bis 03b

Der HTTP-Upload-Dienst-Pfad (APP-DATA-01/02) ist vollständig zurückgebaut. Aktiver,
alleiniger Weg für geprüfte CSVs: `content/files/app-data/` (Offline-Prüfer mit
automatischer Datenform-Erkennung, APP-DATA-03a). Voller Verlauf und offene Punkte:
`docs/steering/patches/UEBERGABE_steuerungsfaden_csv-upload-pipeline-app-data-00-03a_2026-07-20.md`.
