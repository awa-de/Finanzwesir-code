# Lokales Archiv — Steering

Dieses Archiv enthält historische, nicht mehr handlungsleitende Materialien
zu diesem Subsystem.

Es ist kein operativer Standardkontext für Claude.

Aktuelle Regeln stehen im aktiven Pfad dieses Subsystems, nicht in diesem Archiv.

Erstellt: 2026-06-08 (AP 7)

## Archivvertrag

Historische Entscheidungen müssen bei Kuratierung einen Status tragen:

- `HIST` — historischer Input, nicht handlungsleitend
- `ERSETZT` — durch aktiven Nachfolger ersetzt; Nachfolger muss genannt werden
- `POSTMORTEM` — Material für spätere Prozess- oder Fehlerauswertung
- `RAW` — Rohmaterial; gehört nach `local/`

Nicht verwenden: `ARCHIV` (zu ungenau).

Bei `ERSETZT` muss, soweit bekannt, der aktive Nachfolger genannt werden.
Wenn unbekannt: `Ersetzt durch: UNKLAR — in AP prüfen`

## Rohmaterial

Rohmaterial, Binärdateien, vollständige LLM-Dumps und unkuratierte Exporte
gehören nach `local/`.

`local/` bleibt gitignored — wo es existiert.
Neu anlegen nur auf gesonderten AP-Auftrag.

## Verhältnis zum Root-Archiv

Dieses lokale Archiv bleibt beim Subsystem, solange es lokalen Kontext erklärt.

Projektübergreifendes Making-of- oder Querschnittsmaterial wird über das
Root-Archiv `/Archiv/` kuratiert.

Lokale Belege dürfen lokal bleiben; das Root-Archiv darf auf sie verweisen.
