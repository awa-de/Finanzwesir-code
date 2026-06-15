# .claude/hooks/session-start.ps1
# Zweck: Liefert Claude beim Fadenbeginn strukturierte Fakten statt Regeln.
# Shell liest HOOK-META + Zustandsdateien, Claude synthetisiert nur.

# NEW: RepoRoot aus Skriptpfad — unabhaengig vom aktuellen Working Directory
$RepoRoot = if ($PSScriptRoot) {
    Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
} else {
    Get-Location
}

# NEW: UTF-8 explizit setzen
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$ErrorActionPreference = "SilentlyContinue"

$hookStatus = "OK"
$warnungen  = @()

# --- HOOK-META aus PROJECT-STATUS.md ---
# CHANGED: Liest maschinenlesbaren Block statt Fliesstext per Regex
$metaVersion      = $null
$metaStand        = $null
$fokus            = "unbekannt"
$naechster        = "unbekannt"
$blocker          = "unbekannt"
$kassensturzDatum = "nie"                                                          # NEW
$lastDistill      = "nie"

$statusFile = Join-Path $RepoRoot "PROJECT-STATUS.md"
if (Test-Path $statusFile) {
    $statusLines = Get-Content $statusFile -Encoding UTF8
    $inMeta      = $false
    $metaLines   = @()
    foreach ($line in $statusLines) {
        if ($line -match "<!--\s*HOOK-META")             { $inMeta = $true;  continue }
        if ($inMeta -and $line -match "-->")             { $inMeta = $false; break    }
        if ($inMeta)                                     { $metaLines += $line        }
    }

    if ($metaLines.Count -eq 0) {
        $hookStatus  = "DEGRADED"
        $warnungen  += "PROJECT-STATUS.md enthaelt keinen HOOK-META-Block"
    } else {
        foreach ($ml in $metaLines) {
            $ml = $ml.Trim()
            if      ($ml -match "^Version:\s*(.+)$")          { $metaVersion = $matches[1].Trim() }
            elseif  ($ml -match "^Stand:\s*(.+)$")            { $metaStand   = $matches[1].Trim() }
            elseif  ($ml -match "^Fokus-AP:\s*(.+)$")         { $fokus       = $matches[1].Trim() }
            elseif  ($ml -match "^N.chster-Schritt:\s*(.+)$") { $naechster   = $matches[1].Trim() }
            elseif  ($ml -match "^Blocker:\s*(.+)$")                { $blocker          = $matches[1].Trim() }
            elseif  ($ml -match "^Letzter-Distill:\s*(.+)$")     { $lastDistill      = $matches[1].Trim() } # NEW
            elseif  ($ml -match "^Kassensturz-Datum:\s*(.+)$")   { $kassensturzDatum = $matches[1].Trim() } # NEW
        }
        if ($metaVersion -ne "1") {
            $hookStatus  = "DEGRADED"
            $warnungen  += "HOOK-META Version unbekannt oder fehlend (gefunden: '$metaVersion')"
        }
        if ($fokus     -eq "unbekannt") { $hookStatus = "DEGRADED"; $warnungen += "HOOK-META Feld fehlt: Fokus-AP"        }
        if ($naechster -eq "unbekannt") { $hookStatus = "DEGRADED"; $warnungen += "HOOK-META Feld fehlt: Naechster-Schritt" }
        if ($blocker   -eq "unbekannt") { $hookStatus = "DEGRADED"; $warnungen += "HOOK-META Feld fehlt: Blocker"          }
    }
} else {
    $hookStatus  = "DEGRADED"
    $warnungen  += "PROJECT-STATUS.md fehlt"
}

# --- BLOCKED-APs aus ATTEMPT-LOG.json ---
# CHANGED: korrekte Struktur — issues-Objekt, nicht Root-Array
$blocked    = "keine"
$attemptLog = Join-Path $RepoRoot ".claude\ATTEMPT-LOG.json"
if (Test-Path $attemptLog) {
    $json = Get-Content $attemptLog -Encoding UTF8 -Raw | ConvertFrom-Json
    if ($json.issues -and ($json.issues | Get-Member -MemberType NoteProperty -ErrorAction SilentlyContinue)) {
        $blockedIds = $json.issues.PSObject.Properties |
            Where-Object { $_.Value.attempts -ge 2 -or $_.Value.status -eq "BLOCKED" } |
            ForEach-Object { $_.Name }
        if ($blockedIds) { $blocked = $blockedIds -join ", " }
    }
} else {
    $blocked    = "ATTEMPT-LOG.json fehlt"
    $warnungen += "ATTEMPT-LOG.json fehlt"
}

# --- Session-Log Eintragsanzahl & letzter Distill (Fallback) ---
$logCount   = 0
$sessionLog = Join-Path $RepoRoot ".claude\learning\session-log.md"
if (Test-Path $sessionLog) {
    $logContent = Get-Content $sessionLog -Encoding UTF8
    $logCount   = ($logContent | Where-Object { $_ -match "^## 20" }).Count
    # Fallback: nur wenn HOOK-META kein Datum geliefert hat
    if ($lastDistill -eq "nie") {
        $distillLine = $logContent | Where-Object { $_ -match "^## 20.*(?:DIST-\d+|[Dd]istill)" } | Select-Object -Last 1
        if ($distillLine -match "(\d{4}-\d{2}-\d{2})") { $lastDistill = $matches[1] }
    }
} else {
    $warnungen += "session-log.md fehlt"
}

# --- Pattern-Kandidaten ---
$patterns     = 0
$patternsFile = Join-Path $RepoRoot ".claude\learning\patterns.md"
if (Test-Path $patternsFile) {
    $patterns = (Get-Content $patternsFile -Encoding UTF8 | Where-Object { $_ -match "^### KANDIDAT" }).Count
}

# --- Subagent-Modell ---
$subagentModel = $env:CLAUDE_CODE_SUBAGENT_MODEL
if (-not $subagentModel) {
    $subagentModel  = "nicht gesetzt"
    $warnungen     += "CLAUDE_CODE_SUBAGENT_MODEL ist nicht gesetzt"
}

# --- Wochentag ---
$wochentag = (Get-Date).ToString("dddd")

# --- Ausgabe ---
Write-Output "=== HOOK: SESSION-CONTEXT ==="
Write-Output "Hook-Status:        $hookStatus"
Write-Output "Subagent-Modell:    $subagentModel"
Write-Output "Meta-Version:       $metaVersion"
Write-Output "Meta-Stand:         $metaStand"
Write-Output "Fokus-AP:           $fokus"
Write-Output "Naechster Schritt:  $naechster"
Write-Output "Blocker-Meta:       $blocker"
Write-Output "BLOCKED-APs:        $blocked"
Write-Output "Log-Eintraege:      $logCount"
Write-Output "Letzter Distill:    $lastDistill"
Write-Output "Kassensturz-Datum:  $kassensturzDatum"                                 # NEW
Write-Output "Pattern-Kandidaten: $patterns"
Write-Output "Wochentag:          $wochentag"
Write-Output "==========================="

if ($warnungen.Count -gt 0) {
    Write-Output ""
    Write-Output "Warnungen:"
    foreach ($w in $warnungen) {
        Write-Output "- $w"
    }
}
