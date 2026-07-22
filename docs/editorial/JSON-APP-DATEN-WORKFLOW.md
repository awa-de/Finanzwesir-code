# JSON-App-Daten-Workflow: App-Konfigurationsdaten prüfen und veröffentlichen

**Version:** 1.1.2
**Datum:** 22.07.2026
**Status:** Verbindliche Referenz
**Zielgruppe:** Redakteure und Entwickler, die eine JSON-App-Konfigurationsdatei (`data-fw-config`) veröffentlichen.
**Kontext:** Schlankes Gegenstück zu `docs/editorial/CSV-APP-DATEN-WORKFLOW.md` für JSON statt CSV. Kein Ersatz für die dort beschriebenen CSV-Abläufe — beide bestehen unabhängig nebeneinander.

---

## 1. Der vollständige Ablauf in einem Bild

```text
JSON-Prüfkopie lokal unter content/files/app-data ablegen
→ pruefe-json.bat doppelklicken
→ Prüfer kanonisiert den Dateinamen und prüft neue/geänderte JSON-Dateien
→ bei GRÜN: für den lokalen Laufzeittest JSON manuell nach
  C:\Tools\ghost-local\site\content\files\app-data kopieren
→ für Produktion dieselbe geprüfte JSON mit FileZilla (SFTP/FTPS) nach
  Ghost/content/files/app-data übertragen
→ Ghost liefert die Datei danach nur noch statisch aus
→ Ghost-Card verwendet data-fw-config="<dateiname>.json"
```

Wichtig: **Ghost ist am Prüf- und Übertragungsschritt nicht beteiligt.** Es liefert die Datei erst danach aus.

---

## 2. Vier verschiedene Orte — nicht verwechseln

| Ort | Was liegt dort | Wer greift zu |
|---|---|---|
| **Quell-/Fixture-JSON** | `Apps/prokrastinations-preis/config/stations-de.json` — Testseiten-Fixture, **keine Ghost-Laufzeitquelle** | Testseite `app.test.html` |
| **Lokale Prüfkopie** | `content/files/app-data/` im eigenständigen `content`-Git-Repository — maßgeblicher Bearbeitungskandidat | Redakteur, Offline-Prüfer |
| **Lokaler Ghost-Laufzeitordner** | `C:\Tools\ghost-local\site\content\files\app-data\` — außerhalb jedes Repositories, rein für den lokalen Test | lokales Ghost (`http://localhost:2368/…`) |
| **Produktions-Ghost-Content-Pfad** | `Ghost/content/files/app-data/` auf dem Produktionsserver | Produktions-Ghost, erreicht per FileZilla |

Die Quell-/Fixture-Datei unter `Apps/.../config/` und die Prüfkopie unter `content/files/app-data/` bleiben zwei getrennte Dateien. Für Rubikon-Text pflegt `bearbeite-rubikon-text.bat` jedoch bewusst beide bytegleich; so testet die App-Testseite denselben Inhalt, der später veröffentlicht wird.

---

## 3. Namensvertrag

Vor jeder Prüfung bildet der Offline-Prüfer den **kanonischen Dateinamen**:

1. vollständig kleinschreiben;
2. deutsche Zeichen ersetzen: `ä`→`ae`, `ö`→`oe`, `ü`→`ue`, `ß`→`ss`;
3. danach sind ausschließlich ASCII-Buchstaben, Ziffern, `-`, `_` und die Endung `.json` zulässig — **kein zweiter Punkt** im Namen (z. B. ist `stations.de.json` ungültig, nicht `stations-de.json`).

Ist der kanonische Name anders als der abgelegte, benennt der Prüfer die Datei um — aber nur, wenn das ohne Konflikt möglich ist. Bei einem Konflikt wird **nichts** umbenannt, der Prüfer meldet einen klaren Fehler.

Derselbe kanonische Name ist der gültige Wert für `data-fw-config` in der Ghost-Card — vollständiger Dateiname inklusive `.json`, keine URL, kein Pfad.

---

## 4. Offline-Prüfer

- **Ort:** `content/files/app-data/` im eigenständigen `content`-Git-Repository.
- **Start:** `pruefe-json.bat` per Doppelklick unter Windows 11.
- **Parser-Kern:** derselbe `parseJsonText()` aus `Theme/assets/js/fw-chart-engine/data/JSONParser.js`, den auch der Browser nutzt.
- **Fachvalidierung:** dieselbe `validateStationsJson()` aus `Theme/assets/js/apps/prokrastinations-preis-stations-contract.js` — genau eine fachliche Implementierung, geteilt zwischen Browser-Laufzeit und Offline-Prüfer.
- **Registry:** literal, im Prüfer-Code fest eingetragen (`'stations-de.json'` → `validateStationsJson`). Ein unbekannter, aber sonst gültig benannter Dateiname wird abgelehnt — es gibt keinen generischen Fallback-Validator.
- **Zustand/Hash-Verhalten:** Für jede erfolgreich geprüfte Datei speichert der Prüfer SHA-256 und einen Prüfer-Fingerabdruck in `json-validation-state.json` (lokal, nicht versioniert). Unveränderte Dateien werden bei erneuten Läufen übersprungen. Ändert sich der Dateiinhalt, `JSONParser.js` oder das Stations-Vertragsmodul, wird automatisch neu geprüft. Bei einem Fehler bleibt der letzte erfolgreiche Zustand erhalten.
- **Was grün bedeutet:** Exit-Code 0 — die Datei ist syntaktisch gültiges JSON, ihr Dateiname hat einen Registry-Eintrag, und ihr Inhalt erfüllt den zugehörigen Fachvertrag (z. B. `STATIONS_CONFIG_CONTRACT.md`). Grün sagt nichts über redaktionelle Qualität der Inhalte aus.
- **Ausgabe:** eine klare Zeile pro Datei, z. B. `stations-de.json  ok`.
- **Ignorierte Betriebsartefakte:** `json-validation-state.json`, `json-contract.json` (eigene Artefakte), `validation-state.json`, `csv-contract.json` (bestehende CSV-Artefakte im selben Ordner) und `package.json` (Werkzeug-Infrastruktur des CSV-Prüfers) werden nie als Nutzdaten geprüft.

---

## 5. Produktive Ghost-Card

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis"
     data-fw-data="world-acwi-em.csv"
     data-fw-config="stations-de.json">
</div>
```

`data-fw-config` enthält ausschließlich den vollständigen, kanonischen Dateinamen — keine URL, kein Pfad, kein Query-String. Der zentrale Resolver bildet daraus `/content/files/app-data/stations-de.json`.

---

## 6. Checkliste „Neue oder geänderte JSON-Konfiguration veröffentlichen"

1. Für Rubikon-Text: `bearbeite-rubikon-text.bat` unter `content/files/app-data/` doppelklicken. `L` = Langfassung (Desktop/Tablet, CSS zeigt sie oberhalb 480 px), `K` = Kurzfassung (Mobil, CSS zeigt sie bis einschließlich 480 px). Fassung wählen, Text eingeben, letzte Zeile mit Enter abschließen, danach zweimal Enter für zwei leere Zeilen; `Esc` bricht jederzeit ohne Änderung ab. Das Werkzeug prüft vor dem Schreiben und hält Prüfkopie und Fixture bytegleich. Das Fenster bleibt nach Erfolg, Abbruch oder Fehler offen — Meldung lesen und mit beliebiger Taste schließen. (`bearbeite-rubikon-text.ps1` ist als UTF-8-Quelldatei mit BOM gespeichert — nötig für korrekte Umlaute unter Windows PowerShell 5.1; `stations-de.json` bleibt davon unberührt UTF-8 ohne BOM.)
2. Für Stationsdaten: die Prüfkopie unter `content/files/app-data/stations-de.json` gezielt bearbeiten und die Fixture anschließend bytegleich nachziehen.
3. `pruefe-json.bat` doppelklicken.
4. Nur bei **GRÜN** weitermachen. Bei Fehler: Meldung lesen, JSON korrigieren, erneut prüfen.
5. Für den lokalen Test: die (ggf. kanonisch umbenannte) JSON nach `C:\Tools\ghost-local\site\content\files\app-data\` kopieren.
6. Für Produktion: dieselbe geprüfte JSON mit FileZilla (SFTP/FTPS) nach `Ghost/content/files/app-data/` übertragen.
7. Ghost-Card mit `data-fw-config="<kanonischer-dateiname>.json"` einfügen oder aktualisieren.
8. Seite im Browser öffnen, App und Konsole prüfen.

**Eingabewerkzeug-Architektur:** `bearbeite-rubikon-text.ps1` ist ein dünnes Profil (L/K-Auswahl, Zielpfade, Hilfetexte, mechanische Zeilen-Normalisierung) über einem allgemeinen, wiederverwendbaren Mechanik-Kern (`content/files/app-data/json-eingabe-tool-core.psm1`: Mehrzeileneingabe, Abschlussgeste, atomare Doppel-Schreiblogik mit Rollback). Rubikon ist heute das erste Profil dieses Kerns; weitere Profile werden erst bei konkretem Bedarf ergänzt — kein allgemeiner `bearbeite-json.bat`, keine App-Auswahl und kein allgemeiner Feldeditor sind vorweggebaut.

## 7. Checkliste „Weiteren JSON-Feed hinzufügen"

Keine externe Registry- oder Manifestdatei. Stattdessen:

1. Reine Validator-Funktion als eigenes Vertragsmodul unter `Theme/assets/js/apps/` anlegen (Muster: `prokrastinations-preis-stations-contract.js`).
2. Browser-App importiert diese Funktion statisch und übergibt sie als `options.validator` an `JSONParser.parse()`.
3. Im Offline-Prüfer (`content/files/app-data/json-validator.mjs`) einen weiteren literalen Registry-Eintrag ergänzen: Dateiname → statisch importierte Validator-Funktion.
4. Testfall in `tests/json-validator.test.mjs` ergänzen (mindestens: gültiger Fall, fachlich ungültiger Fall).
5. Diesen Workflow um den neuen Dateinamen/App-Bezug ergänzen.

---

## 8. Typische Fehlerbilder

| Situation | Ursache | Lösung |
|---|---|---|
| Prüfer meldet „ungültig" (JSON-Syntax) | Datei ist kein valides JSON (fehlendes Komma, Klammer etc.) | JSON-Syntax korrigieren, `pruefe-json.bat` erneut ausführen |
| Prüfer meldet „JSON-Validierung fehlgeschlagen" mit Code/Detail | Inhalt verletzt den Fachvertrag (z. B. `STATIONS_CONFIG_CONTRACT.md`) — falscher `version`-Wert, fehlendes Pflichtfeld | Meldung lesen, betroffenes Feld korrigieren |
| Prüfer meldet „keine Registry-Zuordnung" | Dateiname ist syntaktisch gültig, aber nicht als App-Datenfeed registriert | Dateinamen prüfen (Tippfehler?) oder neuen Feed nach Abschnitt 7 anlegen |
| Prüfer meldet „unzulässige Zeichen" | Dateiname enthält Großbuchstaben, Umlaute, Leerzeichen oder einen zweiten Punkt | Kanonischen Namen gemäß Abschnitt 3 verwenden |
| Datei unter der Ziel-URL nicht erreichbar | JSON wurde geprüft, aber noch nicht nach `C:\Tools\ghost-local\...` bzw. per FileZilla nach `Ghost/content/files/app-data/` kopiert | Kopier-/Übertragungsschritt nachholen |

---

## 9. Sechs Monate später: Was ist jetzt zu tun?

Dieser Abschnitt funktioniert eigenständig — ohne Chat-, Patch- oder Personenwissen.

### Neue oder geänderte JSON-Konfiguration veröffentlichen

```text
1. Apps/prokrastinations-preis/config/stations-de.json bearbeiten.
2. Aktualisierte Kopie nach content/files/app-data legen und pruefe-json.bat doppelklicken.
3. Nur bei GRÜN die kanonisch benannte JSON mit FileZilla übertragen.
4. Lokaler Test: JSON nach C:\Tools\ghost-local\site\content\files\app-data kopieren.
5. Ghost-Page öffnen und data-fw-config="stations-de.json" prüfen.
```

### Ghost-/Theme-Update

- `content/files/app-data` ist Inhalt, kein Theme-Bestandteil. Dort liegende JSON-Dateien bleiben durch Theme-Updates unberührt.
- Ein Theme-Build oder Theme-Upload ist wegen einer JSON-Datenänderung nicht nötig — nur wenn ein neues Vertragsmodul oder eine neue Registry-Zeile im Theme selbst hinzukommt (Abschnitt 7).

### Fehlertabelle (Kurzfassung, siehe auch Abschnitt 8)

| Fehlerbild | Sofortmaßnahme |
|---|---|
| JSON-Syntaxfehler | Syntax korrigieren, erneut prüfen |
| Fachliche Validierung fehlgeschlagen | Feld gemäß Fehlercode/Detail korrigieren |
| Keine Registry-Zuordnung | Dateinamen prüfen oder neuen Feed anlegen (Abschnitt 7) |
| Datei unter Ziel-URL nicht erreichbar | Kopier-/FileZilla-Schritt nachholen |

**Abschlussnachweis dieses Abschnitts:** Wer ausschließlich diese Seite liest, kann ohne weiteren Kontext beantworten: „Wie veröffentliche ich heute eine neue JSON-Konfiguration?" (Abschnitt 9, erste Checkliste) und „Was bleibt bei einem Ghost-/Theme-Update unangetastet, was löst einen Theme-Build aus?" (Abschnitt 9, zweiter Block).

---

## 10. Verhältnis zu anderen Dokumenten

| Dokument | Rolle |
|---|---|
| `docs/editorial/JSON-APP-DATEN-WORKFLOW.md` (diese Datei) | Kanonischer Redaktionsablauf: JSON-Prüfkopie → Prüfer → FileZilla → Card |
| `docs/editorial/CSV-APP-DATEN-WORKFLOW.md` | Paralleler Ablauf für CSV-Daten — eigenständig, nicht durch diese Datei ersetzt |
| `Apps/prokrastinations-preis/STATIONS_CONFIG_CONTRACT.md` | Fachlicher Stations-Vertrag (Felder, Formate, Beispiele) |
| `docs/spec/APP-INTERFACE.md` | Kanonischer Schnittstellen-Vertrag, Attribut-Referenz, Sicherheitsregeln |
