Stand: 2026-06-08 | Session: AP-4 Archivvertrag | Geändert von: Claude

# Archivstrategie — Finanzwesir 2.0

## Föderiertes Archivmodell

Das Projekt verwendet ein föderiertes Archivmodell.

Aktive Dateien zeigen, was heute gilt.

Lokale Archive dürfen in der Nähe ihres Subsystems bleiben, wenn sie lokalen Kontext erklären,
zum Beispiel App-, Spec-, Design- oder Steering-Historie.

Das Root-Archiv `/Archiv/` ist kein Sammelbecken für alle alten Dateien. Es dient
projektübergreifender Kuratierung, Making-of-Material, Querschnittsentscheidungen und
zentralen historischen Wendepunkten.

Die bestehende Archivstreuung ist historischer Befund, nicht Zielarchitektur. Sie wird nicht
blind bereinigt, sondern über einen gemeinsamen Archivvertrag kontrolliert. Physische
Konsolidierung erfolgt nur bei projektübergreifendem Wert oder nach gesondertem AP.

## Archivvertrag

Alle Archive — Root und lokal — folgen diesen Regeln:

1. Archivdateien sind nie operativer Standardkontext für Claude.
2. Aktuelle Regeln stehen im aktiven Pfad, nicht im Archiv.
3. Historische Entscheidungen tragen einen Status: HIST, ERSETZT, POSTMORTEM oder RAW.
4. ERSETZT verweist auf den aktiven Nachfolger.
5. Rohmaterial, Binärdateien, vollständige LLM-Dumps und unkuratierte Exporte gehören nach `local/`.
6. `local/` bleibt gitignored — wo es existiert. Neu anlegen nur auf gesonderten AP-Auftrag.
7. Root-Archiv nimmt nur projektübergreifendes Material auf.
8. Lokale Archive bleiben lokal, solange sie lokalen Kontext erklären.
9. Making-of-Material darf im Root-Archiv kuratiert werden, auch wenn die Belege lokal verbleiben.
10. Keine Massenkonsolidierung ohne gesonderten Plan.
11. Die narrative Making-of-Aufbereitung erfolgt später. Jetzt gilt: sichern, klassifizieren, Kontext schützen.

## Statuswerte

Jedes historische Dokument muss bei Kuratierung einen der folgenden Status tragen:

**HIST** — Historischer Input. Lehrreich, aber nicht handlungsleitend.

**ERSETZT** — Durch aktive Regel, aktive Spezifikation, aktiven Vertrag oder neue Entscheidung
ersetzt. Muss auf den Nachfolger verweisen (→ Nachfolgerregel für ERSETZT).

**POSTMORTEM** — Material zur späteren Fehler-, Drift- oder Prozessauswertung.

**RAW** — Rohmaterial, unkuratierter Export, vollständiger LLM-Dump, Binärdatei oder
Zwischenstand. Gehört nach `local/`.

**Nicht verwenden: `ARCHIV`** — zu ungenau. Jedes Artefakt braucht eine präzisere Einordnung.

## Nachfolgerregel für ERSETZT

Ein Dokument mit Status `ERSETZT` darf nicht einfach historisch markiert werden.
Es muss, soweit bekannt, auf den aktiven Nachfolger verweisen.

Beispiele:

```
Ersetzt durch: docs/spec/APP-INTERFACE.md §4
Ersetzt durch: docs/steering/ARCHIV-STRATEGIE.md
Ersetzt durch: aktuelle APP_SPEC.md der jeweiligen App
Ersetzt durch: PROJECT-STATUS.md Abschnitt X
```

Wenn der Nachfolger unbekannt ist:

```
Ersetzt durch: UNKLAR — in AP prüfen
```

## README-Schablone für lokale Archive

AP 4 definiert die Schablone. Flächendeckendes Anlegen erfolgt in AP 7.

Der Platzhalter `[Subsystem-Name]` wird beim Anlegen durch den tatsächlichen Namen ersetzt,
z.B. `App-Fabrik`, `spec`, `design-system`, `steering`.

```markdown
# Lokales Archiv — [Subsystem-Name]

Dieses Archiv enthält historische, nicht mehr handlungsleitende Materialien zu diesem Subsystem.

Es ist kein operativer Standardkontext für Claude.

Aktuelle Regeln stehen im aktiven Pfad dieses Subsystems, nicht in diesem Archiv.

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

Rohmaterial, Binärdateien, vollständige LLM-Dumps und unkuratierte Exporte gehören nach `local/`.

`local/` bleibt gitignored — wo es existiert.
Neu anlegen nur auf gesonderten AP-Auftrag.

## Verhältnis zum Root-Archiv

Dieses lokale Archiv bleibt beim Subsystem, solange es lokalen Kontext erklärt.

Projektübergreifendes Making-of- oder Querschnittsmaterial wird über das
Root-Archiv `/Archiv/` kuratiert. Lokale Belege dürfen lokal bleiben;
das Root-Archiv darf auf sie verweisen.
```

## Begriffsklärung

**Aktive Dateien** — Was heute gilt. Was Claude befolgen soll.

**Lokale Archive** — Nahe am Subsystem (z.B. `Apps/prokrastinations-preis/Archiv/`,
`docs/spec/archiv/`). Erklären lokale Entstehung, nicht aktiven Stand.

**Root-Archiv** (`/Archiv/`) — Projektübergreifende Reise: Wendepunkte, Peer-Reviews,
Querschnittsentscheidungen, KI-Workflow-Geschichte.

**`local/`** — Quarantäne für Rohmaterial: vollständige Chat-Exporte, LLM-Dumps,
Binärdateien, PDFs, ZIPs, Excel-, PowerPoint-Dateien. Bleibt gitignored.

## Making-of-Zielbild

Das Archiv ist das Reservoir für ein späteres Making-of der neuen Finanzwesir-Website.
Ziel: mit KI durch die Entstehungsgeschichte reisen (Was? Warum? Was hat funktioniert?
Was nicht? Welche Wendepunkte? Welche Rolle spielten Claude, ChatGPT, Gemini, Perplexity?).

Jetzt geht es um Sichern und Klassifizieren, nicht um Erzählen.
Die narrative Aufbereitung erfolgt wenn die Website steht.

## Infrastruktur-Stand (2026-06-08)

- `.gitignore`-Umstellung abgeschlossen: `Archiv/` versioniert, `Archiv/local/` gitignored
- Initiale Quarantäne (`Archiv/local/`) abgeschlossen
- Föderiertes Modell beschlossen (AP-3)

## Erwartete Folge-APs

AP 4 — Archivvertrag konkretisiert, README-Schablone definiert ✅
AP 5 — Alle Archiv-Vorkommen inventarisieren (Befund zuerst, Struktur danach)
AP 6 — Föderierter Archivkatalog / legacy-map.md aus Inventar erstellen (nach AP 5)
AP 7 — README-Schablone gezielt anwenden (lokale Archive)
AP 8 — Root-Making-of-Rahmen vorbereiten
AP 9 — Pilotarchiv auswählen und kontrolliert behandeln
