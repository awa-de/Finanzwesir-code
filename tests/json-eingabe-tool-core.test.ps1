# Nicht-interaktive Tests für content/files/app-data/json-eingabe-tool-core.psm1 und die
# Rubikon-fachliche Normalisierung in content/files/app-data/bearbeite-rubikon-text.ps1.
# Arbeitet ausschließlich mit temporären Kopien -- die echten stations-de.json-Dateien
# werden nie mutiert. Start: `powershell -File tests/json-eingabe-tool-core.test.ps1`.

$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)

$root = Split-Path -Parent $PSScriptRoot
$coreModulePath = Join-Path $root 'content\files\app-data\json-eingabe-tool-core.psm1'
$profilePath = Join-Path $root 'content\files\app-data\bearbeite-rubikon-text.ps1'
$validatorPath = Join-Path $root 'content\files\app-data\json-validator.mjs'
$realStationsPath = Join-Path $root 'content\files\app-data\stations-de.json'
$originalRealStationsBytes = [System.IO.File]::ReadAllBytes($realStationsPath)

Import-Module $coreModulePath -Force
. $profilePath   # InvocationName ist hier der Dateipfad, nicht '.': Hauptfluss läuft NICHT.

$script:failures = 0
function Assert-True([string]$Label, [bool]$Value) {
  if ($Value) { Write-Host "OK   $Label" }
  else { Write-Host "FAIL $Label"; $script:failures++ }
}

# --- 1) Rubikon-Normalisierung: eindeutig mechanische Formvarianten -----------------
Write-Host '=== 1) Normalisierte Eingabe und unveraenderte andere Textzeilen ==='
Assert-True '##Text -> ## Text' ((ConvertTo-NormalizedRubikonLine '##Text') -eq '## Text')
Assert-True '###Text -> ### Text' ((ConvertTo-NormalizedRubikonLine '###Text') -eq '### Text')
Assert-True '##   Text (mehrere Leerzeichen) -> ## Text' ((ConvertTo-NormalizedRubikonLine '##   Text') -eq '## Text')
Assert-True '###   Text (mehrere Leerzeichen) -> ### Text' ((ConvertTo-NormalizedRubikonLine '###   Text') -eq '### Text')
Assert-True '## Text (bereits korrekt) bleibt unveraendert' ((ConvertTo-NormalizedRubikonLine '## Text') -eq '## Text')
Assert-True 'normaler Absatz bleibt unveraendert (bis auf Trailing-Whitespace)' ((ConvertTo-NormalizedRubikonLine 'Ein normaler Absatz.') -eq 'Ein normaler Absatz.')
Assert-True 'Trailing-Whitespace wird entfernt' ((ConvertTo-NormalizedRubikonLine "Zeile mit Leerzeichen am Ende   ") -eq 'Zeile mit Leerzeichen am Ende')
Assert-True 'Listenzeile bleibt unveraendert' ((ConvertTo-NormalizedRubikonLine '- Punkt eins') -eq '- Punkt eins')
Assert-True 'Ebene-1-Ueberschrift wird NICHT hochgestuft' ((ConvertTo-NormalizedRubikonLine '#Text') -eq '#Text')
Assert-True 'Fett-/Kursiv-Marker bleiben unveraendert' ((ConvertTo-NormalizedRubikonLine '**fett** und *kursiv*') -eq '**fett** und *kursiv*')
Assert-True 'verbotene Syntax wird nicht "repariert" (Backtick bleibt bestehen)' ((ConvertTo-NormalizedRubikonLine '`Code`') -eq '`Code`')

# --- 2) Kern akzeptiert keine dynamischen Profile/Pfade/Befehle aus Nutzereingabe ---
Write-Host ''
Write-Host '=== 2) Kern nimmt keine Nutzereingabe als Ziel-Datei, Pfad, Validator oder Befehl ==='
$coreSource = Get-Content -Raw $coreModulePath
Assert-True 'Kern enthaelt kein Read-Host (keine interaktive Pfad-/Befehlsabfrage im Kern)' ($coreSource -notmatch 'Read-Host')
Assert-True 'Kern enthaelt kein Invoke-Expression/iex (kein dynamisches Ausfuehren)' ($coreSource -notmatch '(?i)Invoke-Expression|\biex\b')

$commitStart = $coreSource.IndexOf('function Invoke-JsonEingabeCommit')
$commitEnd = $coreSource.IndexOf('Export-ModuleMember')
$commitFunctionText = $coreSource.Substring($commitStart, $commitEnd - $commitStart)
$mandatoryCount = ([regex]::Matches($commitFunctionText, '\[Parameter\(Mandatory\)\]')).Count
$allFourNamesPresent = @('$CandidateText', '$PrimaryPath', '$FixturePath', '$ValidatorPath') |
  ForEach-Object { $commitFunctionText.Contains($_) } |
  Where-Object { $_ -eq $false } |
  Measure-Object
Assert-True 'Alle vier Pfad-/Textparameter von Invoke-JsonEingabeCommit sind Pflichtparameter ([Parameter(Mandatory)] x4)' (
  $mandatoryCount -eq 4 -and $allFourNamesPresent.Count -eq 0
)

# --- Testfixture-Vorbereitung (nur temporaere Kopien, echte Dateien bleiben unberuehrt) ---
$scratch = Join-Path $env:TEMP ('json-eingabe-tool-core-test-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $scratch | Out-Null
$primaryPath = Join-Path $scratch 'stations-de.json'
$fixturePath = Join-Path $scratch 'stations-de.fixture.json'

$realJsonText = [System.IO.File]::ReadAllText($realStationsPath, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText($primaryPath, $realJsonText, [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText($fixturePath, $realJsonText, [System.Text.UTF8Encoding]::new($false))
$originalPrimaryBytes = [System.IO.File]::ReadAllBytes($primaryPath)
$originalFixtureBytes = [System.IO.File]::ReadAllBytes($fixturePath)

$config = $realJsonText | ConvertFrom-Json

try {
  # --- 3) Erfolgsfall: gueltiger Kandidat wird geprueft und in beide Kopien geschrieben ---
  Write-Host ''
  Write-Host '=== 3) Invoke-JsonEingabeCommit: gueltiger Kandidat wird uebernommen ==='
  $config.rubikon.long = "## Testueberschrift`nDirekt folgender Absatz ohne Leerzeile."
  $validCandidate = ($config | ConvertTo-Json -Depth 32) + "`n"
  $successResult = Invoke-JsonEingabeCommit -CandidateText $validCandidate -PrimaryPath $primaryPath -FixturePath $fixturePath -ValidatorPath $validatorPath
  Assert-True 'Ok = true' ($successResult.Ok -eq $true)
  Assert-True 'Primary enthaelt neuen Text' ((Get-Content -Raw $primaryPath) -match 'Testueberschrift')
  Assert-True 'Fixture enthaelt denselben neuen Text (bytegleich)' (
    [System.IO.File]::ReadAllBytes($primaryPath) -join ',' -eq ([System.IO.File]::ReadAllBytes($fixturePath) -join ',')
  )
  $afterSuccessPrimaryBytes = [System.IO.File]::ReadAllBytes($primaryPath)
  $afterSuccessFixtureBytes = [System.IO.File]::ReadAllBytes($fixturePath)

  # --- 4) Validierungsfehler: nichts wird geschrieben ---------------------------------
  Write-Host ''
  Write-Host '=== 4) Invoke-JsonEingabeCommit: Validierungsfehler schreibt nichts ==='
  $config.rubikon.long = '<script>alert(1)</script>'
  $invalidCandidate = ($config | ConvertTo-Json -Depth 32) + "`n"
  $failResult = Invoke-JsonEingabeCommit -CandidateText $invalidCandidate -PrimaryPath $primaryPath -FixturePath $fixturePath -ValidatorPath $validatorPath
  Assert-True 'Ok = false' ($failResult.Ok -eq $false)
  Assert-True 'Stage = validate' ($failResult.Stage -eq 'validate')
  Assert-True 'Primary unveraendert (bytegleich zum Stand vor diesem Aufruf)' (
    (Compare-Object ([System.IO.File]::ReadAllBytes($primaryPath)) $afterSuccessPrimaryBytes -SyncWindow 0 | Measure-Object).Count -eq 0
  )
  Assert-True 'Fixture unveraendert (bytegleich zum Stand vor diesem Aufruf)' (
    (Compare-Object ([System.IO.File]::ReadAllBytes($fixturePath)) $afterSuccessFixtureBytes -SyncWindow 0 | Measure-Object).Count -eq 0
  )

  # --- 5) Schreibfehler beim zweiten Austausch: Rollback beider Zielkopien ------------
  Write-Host ''
  Write-Host '=== 5) Invoke-JsonEingabeCommit: Schreibfehler -> Rollback beider Kopien ==='
  $config.rubikon.long = "## Rollback-Testueberschrift`nEin weiterer Absatz."
  $rollbackCandidate = ($config | ConvertTo-Json -Depth 32) + "`n"
  (Get-Item $fixturePath).IsReadOnly = $true
  try {
    $rollbackResult = Invoke-JsonEingabeCommit -CandidateText $rollbackCandidate -PrimaryPath $primaryPath -FixturePath $fixturePath -ValidatorPath $validatorPath
  } finally {
    (Get-Item $fixturePath).IsReadOnly = $false
  }
  Assert-True 'Ok = false' ($rollbackResult.Ok -eq $false)
  Assert-True 'Stage = write' ($rollbackResult.Stage -eq 'write')
  Assert-True 'Primary auf Vor-Rollback-Stand zurueckgerollt (obwohl der erste Austausch geglueckt war)' (
    (Compare-Object ([System.IO.File]::ReadAllBytes($primaryPath)) $afterSuccessPrimaryBytes -SyncWindow 0 | Measure-Object).Count -eq 0
  )
  Assert-True 'Fixture unveraendert (zweiter Austausch nie geglueckt)' (
    (Compare-Object ([System.IO.File]::ReadAllBytes($fixturePath)) $afterSuccessFixtureBytes -SyncWindow 0 | Measure-Object).Count -eq 0
  )
  Assert-True 'Kein Temp-/Backup-Artefakt im Scratch-Verzeichnis zurueckgelassen' (
    (Get-ChildItem $scratch -Force | Where-Object { $_.Name -match '^\.json-eingabe-tool' } | Measure-Object).Count -eq 0
  )
} finally {
  Remove-Item -Recurse -Force $scratch -ErrorAction SilentlyContinue
}

# --- Nachbedingung: echte Projektdateien wurden nie beruehrt ------------------------
Write-Host ''
Write-Host '=== Nachbedingung: echte stations-de.json unberuehrt ==='
$realBytesAfter = [System.IO.File]::ReadAllBytes($realStationsPath)
Assert-True 'content/files/app-data/stations-de.json bytegleich zum Stand vor diesem Testlauf' (
  (Compare-Object $realBytesAfter $originalRealStationsBytes -SyncWindow 0 | Measure-Object).Count -eq 0
)

Write-Host ''
if ($script:failures -gt 0) {
  Write-Host "$($script:failures) Nachweis(e) fehlgeschlagen."
  exit 1
} else {
  Write-Host 'ALLE NACHWEISE GRUEN'
  exit 0
}
