---
name: feedback-protected-paths-hook-mechanisch
description: "PROTECTED_PATHS.json-Sperre \"forbidden\" wird von einem rein mechanischen Pre-Edit-Hook durchgesetzt, den kein mündliches Albert-OK umgehen kann — nur eine tatsächliche Herabstufung in der JSON-Datei selbst wirkt."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 374cb29b-effd-4476-8f47-87224c62ab03
  modified: 2026-07-20T20:13:48.800Z
---

Wenn eine Datei in `.claude/PROTECTED_PATHS.json` als `"level": "forbidden"` markiert ist, blockiert ein Pre-Edit-Hook den Edit/Write-Aufruf mechanisch (exit code 2) — unabhängig davon, ob Albert im Chat bereits ein explizites "ok, setze um" für genau diese Änderung gegeben hat.

**Why:** Der Hook liest nur `PROTECTED_PATHS.json`, kennt kein Konzept von "mündlicher Freigabe im laufenden Gespräch". Ein vom Full-Gate bereits geprüfter, von Albert freigegebener Edit an einer `forbidden`-Datei (z. B. `CSVParser.js`, APP-DATA-02) scheiterte deshalb trotzdem am Hook. Ein Bypass über ein anderes Tool (z. B. Bash statt Edit) wäre möglich gewesen, wurde aber bewusst nicht versucht — das wäre ein stiller Sicherheits-Bypass.

**How to apply:** Bei `forbidden`-Sperren, die laut Auftrag/Gate angetastet werden müssen: nicht versuchen, den Edit einfach erneut oder über ein anderes Tool auszuführen. Stattdessen Albert fragen, ob die Sperre in `PROTECTED_PATHS.json` selbst temporär auf `"protected"` herabgestuft werden soll (mit Begründung im `reason`-Feld), den Edit durchführen, und — sofern nichts weiter an der Datei zu tun ist — die Sperre danach auf Alberts Anweisung wieder auf `forbidden` zurückstufen. `"protected"` löst nur eine Warnung aus, blockiert aber nicht. Dasselbe Muster gilt vermutlich auch für andere mechanische Bash-Berechtigungsprüfungen (z. B. wurde ein `rm -rf` trotz Albert-OK ebenfalls blockiert, APP-DATA-03b) — ein mündliches OK ersetzt nie eine tatsächliche technische Freigabe, wenn ein Hook/eine Policy dazwischenliegt.
