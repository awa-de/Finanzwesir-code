# CSV-App-Daten-Workflow: Chart-CSVs prüfen und veröffentlichen

**Version:** 1.0.0
**Datum:** 20.07.2026
**Status:** Verbindliche Referenz
**Zielgruppe:** Redakteure und Entwickler, die eine Chart-CSV veröffentlichen oder eine Ghost-Card auf `data-app-file` umstellen.
**Kontext:** Kanonische Beschreibung des aktiven Redaktionswegs für App-Daten-CSVs — ersetzt den früheren, zurückgebauten HTTP-Upload-Dienst.

---

## 1. Der vollständige Ablauf in einem Bild

```text
CSV lokal unter content/files/app-data ablegen
→ pruefe-csv.bat doppelklicken
→ Prüfer kanonisiert den Dateinamen und prüft neue/geänderte CSVs
→ bei GRÜN: für den lokalen Laufzeittest CSV manuell nach
  C:\Tools\ghost-local\site\content\files\app-data kopieren
→ für Produktion dieselbe geprüfte CSV mit FileZilla (SFTP/FTPS) nach
  Ghost/content/files/app-data übertragen
→ Ghost liefert die Datei danach nur noch statisch aus
→ Ghost-Card verwendet data-app-file="<dateiname>.csv"
```

Wichtig: **Ghost ist am Prüf- und Übertragungsschritt nicht beteiligt.** Es liefert die Datei erst danach aus. Eine CSV-Änderung braucht deshalb weder einen Theme-Build noch einen Theme-Upload.

Der frühere HTTP-Upload-Dienst (`tools/upload-dienst/`, Port 4790) ist verworfen und vollständig zurückgebaut. Er ist kein aktueller Weg mehr.

---

## 2. Vier verschiedene Orte — nicht verwechseln

| Ort | Was liegt dort | Wer greift zu |
|---|---|---|
| **Lokale Quell-CSV** | `content/files/app-data/` im eigenständigen `content`-Git-Repository (auf diesem Rechner) | Redakteur, Offline-Prüfer |
| **Lokaler Ghost-Laufzeitordner** | `C:\Tools\ghost-local\site\content\files\app-data\` — außerhalb jedes Repositories, rein für den lokalen Test | lokales Ghost (`http://localhost:2368/…`) |
| **Produktions-Ghost-Content-Pfad** | `Ghost/content/files/app-data/` auf dem Produktionsserver | Produktions-Ghost, erreicht per FileZilla |
| **Öffentlich ausgelieferte URL** | `https://www.finanzwesir.com/content/files/app-data/<dateiname>.csv` (produktiv) bzw. `http://localhost:2368/content/files/app-data/<dateiname>.csv` (lokal) | Browser, `CSVParser.parse()` |

Die CSV ist an der öffentlichen URL bewusst ohne Login lesbar — der Browser braucht sie ungeschützt, um den Chart zu laden.

---

## 3. Namensvertrag

Vor jeder Prüfung bildet der Offline-Prüfer den **kanonischen Dateinamen**:

1. vollständig kleinschreiben;
2. deutsche Zeichen ersetzen: `ä`→`ae`, `ö`→`oe`, `ü`→`ue`, `ß`→`ss`;
3. danach sind ausschließlich ASCII-Buchstaben, Ziffern, `-`, `_` und die Endung `.csv` zulässig.

Beispiel: `MSCI-Überblick.csv` wird zu `msci-ueberblick.csv`.

Ist der kanonische Name anders als der abgelegte, benennt der Prüfer die Datei um — aber nur, wenn das ohne Konflikt möglich ist (kein Überschreiben, keine zwei Dateien mit demselben Zielnamen). Bei einem Konflikt wird **nichts** umbenannt, der Prüfer meldet einen klaren Fehler.

Derselbe kanonische Name ist der gültige Wert für `data-app-file` in der Ghost-Card.

---

## 4. Offline-Prüfer

- **Ort:** `content/files/app-data/` im eigenständigen `content`-Git-Repository.
- **Start:** `pruefe-csv.bat` per Doppelklick unter Windows 11.
- **Parser-Kern:** derselbe `parseCsvText()` aus `Theme/assets/js/fw-chart-engine/data/CSVParser.js`, den auch der Browser nutzt — keine zweite Parser-Implementierung, keine abweichende Prüflogik.
- **Datenform:** wird automatisch und strukturell ermittelt, **keine manuelle Eingabe nötig**. Eine Zeitreihe verlangt echte ISO-Daten (`YYYY-MM-DD`) in jeder Zeile von Spalte 1; ein Snapshot schließt aus, dass diese Spalte komplett aus solchen Datumswerten besteht (das wäre strukturell eine fehlplatzierte Zeitreihe).
- **Zustand/Hash-Verhalten:** Für jede erfolgreich geprüfte Datei speichert der Prüfer SHA-256, erkannte Datenform und einen Prüfer-Fingerabdruck in `validation-state.json` (lokal, nicht versioniert). Unveränderte Dateien werden bei erneuten Läufen übersprungen. Ändert sich der Dateiinhalt oder der Prüfer selbst (`CSVParser.js` oder `csv-validator.mjs`), wird automatisch neu geprüft. Bei einem Fehler bleibt der letzte erfolgreiche Zustand erhalten.
- **Ausgabe:** eine klare Zeile pro Datei, z. B. `world-acwi-em.csv  ok als Zeitreihe` oder `beispiel.csv  ok für Tortendiagramme`.

---

## 5. Produktive Ghost-Card

Produktive Cards verwenden ausschließlich `data-app-file`:

```html
<div class="financial-chart-module"
     data-app-file="world-acwi-em.csv"
     data-type="line">
</div>
```

Die Chart-Engine validiert den Namen serverseitig unabhängig erneut und bildet zentral immer denselben Pfad:

```text
/content/files/app-data/world-acwi-em.csv
```

Zulässige Namen: `^[a-z0-9_-]+\.csv$` (siehe Namensvertrag oben — derselbe Vertrag).

Alle weiteren Card-Attribute bleiben unverändert verfügbar und unabhängig von der Datenquelle: mindestens `data-type`, `data-title`, `data-colors`, `data-options`.

### Fixture-Ausnahme: `data-csv`

`data-csv` bleibt bewusst der Adapter für Testseiten unter `tests/engine/`. Dort enthält es immer einen unmittelbar nutzbaren relativen oder erlaubten URL-Pfad, z. B.:

```html
data-csv="../fixtures/engine/test_data-Liniendiagramm.csv"
```

Ein bloßer Dateiname in `data-csv` ist **ungültig** — die Chart-Engine erkennt nur Werte, die mit `/`, `./` oder `../` beginnen (oder eine vollständige `https://www.finanzwesir.com/…`-URL sind), als nutzbaren Pfad. Produktive Cards dürfen `data-csv` deshalb nicht mit einem bloßen Dateinamen verwenden — das ist der häufigste Verwechslungsfehler (siehe Fehlertabelle unten).

`data-csv` und `data-app-file` sind gegenseitig exklusiv: nie beide, nie keines.

---

## 6. Checkliste „Neue Chart-CSV veröffentlichen"

1. CSV nach `content/files/app-data/` legen.
2. `pruefe-csv.bat` doppelklicken.
3. Nur bei **GRÜN** weitermachen. Bei Fehler: Meldung lesen, CSV korrigieren, erneut prüfen.
4. Für den lokalen Test: die (ggf. kanonisch umbenannte) CSV nach `C:\Tools\ghost-local\site\content\files\app-data\` kopieren.
5. Für Produktion: dieselbe geprüfte CSV mit FileZilla (SFTP/FTPS) nach `Ghost/content/files/app-data/` übertragen.
6. Ghost-Card mit `data-app-file="<kanonischer-dateiname>.csv"` einfügen oder aktualisieren.
7. Seite im Browser öffnen, Chart und Konsole prüfen.

## 7. Checkliste „Bestehende Chart-Card auf data-app-file umstellen"

1. Card in Ghost öffnen.
2. Prüfen: enthält sie `data-csv` mit einer vollständigen URL (nicht nur einem Dateinamen)?
3. Die referenzierte CSV-Datei besorgen, unter `content/files/app-data/` ablegen, mit `pruefe-csv.bat` prüfen (siehe Checkliste oben).
4. `data-csv="…"` durch `data-app-file="<kanonischer-dateiname>.csv"` ersetzen.
5. Alle übrigen Attribute (`data-type`, `data-title`, `data-colors`, `data-options`) unverändert lassen.
6. Seite speichern, veröffentlichen, im Browser prüfen.

---

## 8. Typische Fehlerbilder

| Situation | Ursache | Lösung |
|---|---|---|
| Prüfer meldet Fehler | CSV entspricht weder Zeitreihen- noch Snapshot-Form, oder Format verletzt Grundregeln (Semikolon, Komma-Dezimal, ISO-Datum) | Fehlermeldung lesen, CSV korrigieren, `pruefe-csv.bat` erneut ausführen |
| Datei unter der Ziel-URL nicht erreichbar | CSV wurde geprüft, aber noch nicht nach `C:\Tools\ghost-local\site\content\files\app-data\` (lokal) bzw. per FileZilla nach `Ghost/content/files/app-data/` (Produktion) kopiert | Kopier-/Übertragungsschritt nachholen |
| Falscher bzw. nicht kanonischer Dateiname in der Card | `data-app-file` enthält Großbuchstaben, Umlaute, Leerzeichen oder Sonderzeichen | Kanonischen Namen aus der Prüfer-Ausgabe bzw. `csv-contract.json` übernehmen |
| Card enthält `data-csv` statt `data-app-file` | Alte Vorlage kopiert, oder Card wurde noch nicht umgestellt | `data-csv="…"` durch `data-app-file="<name>.csv"` ersetzen (siehe Checkliste 7) |
| Card enthält beide Datenattribute | Kopierfehler beim Umstellen | Genau eines der beiden Attribute entfernen |
| Datenform passt nicht zu `data-type` | z. B. eine Kategorie-CSV mit `data-type="line"`, oder eine echte Zeitreihe fälschlich als Snapshot gespeichert | Prüfer-Ausgabe prüfen (`ok als Zeitreihe` / `ok für Tortendiagramme`), `data-type` bzw. CSV-Inhalt korrigieren |

---

## 9. Sechs Monate später: Was ist jetzt zu tun?

Dieser Abschnitt funktioniert eigenständig — ohne Chat-, Patch- oder Personenwissen.

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

### Fehlertabelle (Kurzfassung, siehe auch Abschnitt 8)

| Fehlerbild | Sofortmaßnahme |
|---|---|
| Prüfer meldet Fehler | CSV korrigieren, erneut prüfen |
| Datei unter Ziel-URL nicht erreichbar | Kopier-/FileZilla-Schritt nachholen |
| Falscher/nicht kanonischer Dateiname | Kanonischen Namen aus Prüfer-Ausgabe übernehmen |
| `data-csv` statt `data-app-file` in der Card | Attribut ersetzen |
| Beide Datenattribute gesetzt | Eines entfernen |
| Datenform passt nicht zu `data-type` | Prüfer-Ausgabe und `data-type` abgleichen |

**Abschlussnachweis dieses Abschnitts:** Wer ausschließlich diese Seite liest, kann ohne weiteren Kontext beantworten: „Wie veröffentliche ich heute eine neue CSV?" (Abschnitt 9, erste Checkliste) und „Was bleibt bei einem Ghost-/Theme-Update unangetastet, was prüfe ich danach?" (Abschnitt 9, zweiter Block).

---

## 10. Verhältnis zu anderen Dokumenten

| Dokument | Rolle |
|---|---|
| `docs/editorial/CSV-APP-DATEN-WORKFLOW.md` (diese Datei) | Kanonischer Redaktionsablauf: CSV → Prüfer → FileZilla → Card |
| `docs/editorial/REDAKTEURS-HANDBUCH Chart-Integration.md` | CSV-Formatregeln (Semikolon, Dezimalzeichen, Einheiten), Chart-Typen, Options-Referenz |
| `docs/editorial/Cheat-Sheet HTML-Karten.md` | Kurzreferenz `data-options`-Befehle |
| `docs/spec/APP-INTERFACE.md` | Kanonischer Schnittstellen-Vertrag, Attribut-Referenz, Sicherheitsregeln |
| `docs/spec/TECH-SPEC Theme-Integration Chart-Engine.md` | Technische Theme-Integration, Entwicklerperspektive |
