Stand: 2026-06-08 | Geändert von: Claude | Session: AP-KORR-7

# Archiv-Sonderfälle — Finanzwesir 2.0

Status: Arbeitsliste für spätere Entscheidungen
Quelle: AP-KORR-7

Diese Datei dokumentiert Archiv-Sonderfälle, die nicht automatisch bereinigt werden.

Sie ist keine Migrationsanweisung.
Sie ist keine Löschliste.
Sie ist kein operativer Standardkontext für Claude.

Claude darf aus dieser Datei keine Bereinigung ableiten,
außer Albert beauftragt dafür einen eigenen AP.

## Entscheidungslogik

| Status | Bedeutung |
|---|---|
| `ALBERT_ENTSCHEIDET` | Entscheidung nicht automatisieren |
| `SPÄTERER_AP` | Nur mit eigenem AP bearbeiten |
| `BELASSEN` | Derzeit kein Handlungsbedarf |
| `PRÜFEN` | Befund unklar, keine Aktion ohne Folge-AP |

## Sonderfälle

| Pfad | Typ | Befund | Risiko | Empfehlung | Darf Claude handeln? |
|---|---|---|---|---|---|
| `archivliste.md` | Datei, 1 KB | Manuelle Archivorte-Liste mit absoluten Windows-Pfaden; durch `docs/steering/ARCHIV-INVENTAR.md` faktisch ersetzt | niedrig | `ALBERT_ENTSCHEIDET` — Löschkandidat | Nein |
| `docs/App-Fabrik/_archive/` | Ordner, 1 Datei (README.md, 349 Bytes) | Bewusster Platzhalter mit Regeltext; kein Archivinhalt; nennt potenziellen Kandidaten (`ETF-App-Fabrik_Produktlandkarte_V0-1.md`) — Verschiebung erst nach Alberts Freigabe | niedrig | `PRÜFEN` — Platzhalter dauerhaft behalten oder auflösen? | Nein |
| `Inhalte alte Site/blog/archiv/` | Ordner, 1 Datei (page.md, 119 Bytes) | Alter Website-Kontext; außerhalb der Finanzwesir-2.0-Archivstrategie; de facto leer | niedrig | `ALBERT_ENTSCHEIDET` — Löschkandidat außerhalb des Projekts | Nein |

## Nicht erledigt in AP-KORR-7

- keine Löschung
- keine Migration
- keine Verschiebung
- keine Statusheader in Archiv-Inhaltsdateien
- keine Making-of-Erzählung
- keine Backlog-Übertragung
