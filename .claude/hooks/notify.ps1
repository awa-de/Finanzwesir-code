param(
    [string]$Title = "Claude Code",
    [string]$Message = "Aufmerksamkeit erforderlich",
    [int]$Duration = 10
)
Import-Module BurntToast
New-BurntToastNotification -Text $Title, $Message