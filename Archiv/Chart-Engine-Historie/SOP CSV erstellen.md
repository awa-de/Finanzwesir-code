---
Angelegt am: 03.12.2025 09:19:18
zuletzt verändert am: 2025-12-03T09:21:14+01:00
---
---
up:: 
### Szenario A: Sie haben Rohdaten (z.B. MSCI Export)

_Dies ist der häufigste Fall, wenn Sie Daten von Index-Anbietern herunterladen._

1. **Datei öffnen:** Öffnen Sie die heruntergeladene Datei (oft `.xls` oder `.csv`) in Excel.
2. **Kopfzeilen bereinigen (WICHTIG):**

    - Meist enthalten diese Dateien in den ersten 5-10 Zeilen Informationen wie "Index Level", "Currency", "Disclaimers".
    - **Löschen Sie diese Zeilen.**
    - Die **Zeile 1** muss zwingend die Spaltenüberschriften enthalten (`Date`, `World`, `ACWI`, etc.).
3. **Speichern:**
       - Gehen Sie auf `Datei` -> `Speichern unter`.
    - Dateityp: **CSV (Trennzeichen-getrennt) (*.csv)**.
    - Dateiname: Geben Sie einen einfachen Namen ohne Leerzeichen an (z.B. `kursdaten_2024.csv`).
4. **Fertig.** Sie müssen **keine** Datumsformate umwandeln oder Punkte durch Kommas ersetzen. Die Software erkennt "Dec 31, 2000" und "100.25" automatisch.
 

---

### Szenario B: Sie pflegen die Liste manuell

_Dies ist der Fall, wenn Sie eigene Portfolios (z.B. "70/30 Portfolio") hinzufügen oder Daten händisch fortschreiben._

1. **Formatierung:**
    - Wenn Sie selbst tippen, nutzen Sie den **deutschen Standard**, da dieser in Excel am wenigsten Fehleranfällig ist.
    - **Datum:** `TT.MM.JJJJ` (z.B. `31.01.2024`).
    - **Kurse:** Zahl mit Komma (z.B. `105,50` oder Währungsformat `105,50 €`).

2. **Spalten:**
    - Spalte A ist immer das Datum.
    - Jede weitere Spalte ist eine Kurve. Der Name in der ersten Zeile (z.B. "Mein Depot") wird für die Zuordnung in der Config-Datei genutzt.

3. **Speichern:**
    - Gehen Sie auf `Datei` -> `Speichern unter`.
    - Dateityp: **CSV (Trennzeichen-getrennt) (*.csv)**.

---
### Qualitäts-Check (Optional)

Bevor Sie die Datei hochladen, öffnen Sie sie kurz mit dem Windows **Editor** (Rechtsklick -> Öffnen mit -> Editor).

- **Prüfung 1:** Stehen in der allerersten Zeile die Überschriften (`Date;World;...`)? -> **OK**.
- **Prüfung 2:** Sind die Daten darunter sichtbar?
    - Es ist egal, ob sie so aussehen: `Dec 31, 2000,100.50` (US-Format)
    - Oder so: `31.12.2000;100,50` (DE-Format)

    - _Die Software verarbeitet beides, solange es innerhalb einer Datei einheitlich ist._

---

### Nächster Schritt: Upload in Ghost

1. Laden Sie die `.csv` Datei in Ghost hoch.
2. Kopieren Sie den Link.
3. Fügen Sie den Link in das HTML-Snippet Ihres Artikels ein (`data-csv="..."`).
