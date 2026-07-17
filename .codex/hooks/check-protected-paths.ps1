# PreToolUse Hook: Enforces PROTECTED_PATHS.json before Write/Edit operations.
# forbidden  → exit 2 (blocked, operation cancelled)
# protected  → warning printed, operation continues (Pre-Code-Gate + Albert required)

$raw = [System.Console]::In.ReadToEnd()

try {
  $data = $raw | ConvertFrom-Json
} catch {
  exit 0
}

$filePath = $data.tool_input.file_path
if (-not $filePath) { exit 0 }

$configPath = ".claude\PROTECTED_PATHS.json"
if (-not (Test-Path $configPath)) { exit 0 }

try {
  $config = Get-Content $configPath -Raw | ConvertFrom-Json
} catch {
  exit 0
}

$normalized = $filePath.Replace('\', '/').ToLower()

foreach ($entry in $config.protected_paths) {
  $p = $entry.path.Replace('\', '/').ToLower()
  if ($normalized -like "*$p*") {
    if ($entry.level -eq "forbidden") {
      Write-Host "GEBLOCKT (forbidden): $filePath"
      Write-Host "Grund: $($entry.reason)"
      Write-Host "Sperre kann nur Albert explizit aufheben."
      exit 2
    }
    if ($entry.level -eq "protected") {
      Write-Host "WARNUNG (protected): $filePath"
      Write-Host "Grund: $($entry.reason)"
      Write-Host "Pre-Code-Gate + Albert-Freigabe erforderlich bevor weiter."
    }
  }
}

exit 0
