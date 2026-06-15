# setup-memory-junction.ps1
# Einmalig pro Maschine ausfuehren.
# Verbindet das lokale Claude-Memory-Verzeichnis mit dem NAS/Nextcloud-Projekt.
# Benoetigt: Windows Developer Mode (fuer mklink /D ohne Admin).
#
# Laptop:   Ziel ist lokaler Nextcloud-Pfad  => mklink /D funktioniert direkt
# Heim-PC:  Ziel ist NAS-UNC-Pfad            => mklink /D benoetigt Developer Mode

$ErrorActionPreference = "Stop"

# Projektpfad = Elternverzeichnis von tools/
$projectRoot = Split-Path -Parent $PSScriptRoot
$memoryTarget = Join-Path $projectRoot ".claude\memory"

Write-Host "Projektpfad:     $projectRoot"
Write-Host "Memory-Ziel:     $memoryTarget"

# Slug ableiten: erster Buchstabe lowercase, dann : / \ / Leerzeichen / Punkt durch - ersetzen
$slug = $projectRoot.Substring(0, 1).ToLower() + $projectRoot.Substring(1)
$slug = $slug -replace ':', '-' -replace '\\', '-' -replace ' ', '-' -replace '\.', '-'

$linkPath = Join-Path $env:USERPROFILE ".claude\projects\$slug\memory"

Write-Host "Slug:            $slug"
Write-Host "Link-Pfad:       $linkPath"
Write-Host ""

# Pruefen ob Ziel erreichbar
if (-not (Test-Path $memoryTarget)) {
    Write-Error "Memory-Ziel nicht erreichbar: $memoryTarget"
    exit 1
}

# Bestehenden Zustand pruefen
if (Test-Path $linkPath) {
    $item = Get-Item $linkPath -Force
    $isLink = [bool]($item.Attributes -band [System.IO.FileAttributes]::ReparsePoint)
    if ($isLink) {
        Write-Host "Link bereits vorhanden - nichts zu tun." -ForegroundColor Green
        Write-Host "Ziel: $($item.Target)"
        exit 0
    } else {
        $backup = $linkPath + "_backup_" + (Get-Date -Format "yyyyMMdd-HHmmss")
        Write-Host "Echtes Verzeichnis gefunden - Backup: $backup" -ForegroundColor Yellow
        Rename-Item $linkPath $backup
    }
} else {
    $parent = Split-Path $linkPath -Parent
    if (-not (Test-Path $parent)) {
        New-Item -ItemType Directory -Path $parent -Force | Out-Null
    }
}

# Symbolischen Link anlegen (funktioniert fuer lokale und Netzwerkpfade)
$result = cmd /c "mklink /D `"$linkPath`" `"$memoryTarget`""
Write-Host $result

# Verifizieren
if (Test-Path $linkPath) {
    $count = (Get-ChildItem $linkPath).Count
    Write-Host "Erfolgreich: $count Dateien sichtbar." -ForegroundColor Green
} else {
    Write-Error "Link konnte nicht angelegt werden."
    exit 1
}
