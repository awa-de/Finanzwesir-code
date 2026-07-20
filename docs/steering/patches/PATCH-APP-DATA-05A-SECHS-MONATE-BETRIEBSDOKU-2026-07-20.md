# Ergänzung zu APP-DATA-05 – Betriebsdokumentation für den Wiedereinstieg

Diese Ergänzung ist zusammen mit `PATCH-APP-DATA-05-DOKUMENTATION-2026-07-20.md` verbindlich auszuführen.

## Ziel

Die neue kanonische Workflow-Seite `docs/editorial/CSV-APP-DATEN-WORKFLOW.md` muss nach sechs Monaten ohne Chat-, Patch- oder Personenwissen als alleinige Arbeitsanweisung funktionieren.

## Pflichtabschnitt

Füge den selbsttragenden Abschnitt **„Sechs Monate später: Was ist jetzt zu tun?“** ein. Er enthält zwei getrennte Checklisten.

### Neue oder geänderte CSV veröffentlichen

```text
1. content/files/app-data öffnen.
2. CSV ablegen und pruefe-csv.bat doppelklicken.
3. Nur bei GRÜN die kanonisch benannte CSV mit FileZilla übertragen.
4. Lokaler Test: CSV nach C:\Tools\ghost-local\site\content\files\app-data kopieren.
5. Ghost-Page öffnen und data-app-file="<dateiname>.csv" prüfen.
```

### Ghost-/Theme-Update

- `content/files/app-data` ist Inhalt, kein Theme-Bestandteil. Dort liegende CSV-Dateien bleiben durch Theme-Updates unberührt.
- Theme nur über Ghost Admin aktualisieren; nie direkt in den aktiven Theme-Ordner kopieren.
- Ein Theme-Build oder Theme-Upload ist wegen einer CSV-Änderung nicht nötig.
- Nach jedem Ghost- oder Theme-Update eine vorhandene Page mit `data-app-file` prüfen:
  1. `/content/files/app-data/<dateiname>.csv` ist erreichbar;
  2. Chart rendert korrekt;
  3. keine Browser-Console-Fehler.

## Fehlertabelle

Ergänze eine kurze, konkrete Tabelle für mindestens:

- Prüfer meldet Fehler;
- Datei ist unter Ziel-URL nicht erreichbar;
- falscher bzw. nicht kanonischer Dateiname;
- Card enthält `data-csv` statt `data-app-file`;
- Card enthält beide Datenattribute;
- Datenform passt nicht zu `data-type`.

## Abschlussnachweis

Beantworte ausschließlich anhand der neuen Workflow-Seite:

1. „Wie veröffentliche ich heute eine neue CSV?“
2. „Was bleibt bei einem Ghost-/Theme-Update unangetastet und was prüfe ich danach?“

Wenn beide Antworten ohne Patch- oder Chat-Kontext vollständig möglich sind, ist der Abschnitt erfüllt.
