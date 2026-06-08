---
Angelegt am: 03.12.2025 10:33:30
zuletzt verändert am: 2025-12-08T14:05:36+01:00
---
---
## SOP: Interaktiven Finanz-Chart in Ghost Artikel einfügen

**Benötigte Zutaten:**

1. Die vorbereitete CSV-Datei (z.B. `kursdaten_2024.csv`) siehe [[SOP CSV erstellen]]
2. Die Hex-Codes Ihrer Farben (falls Sie vom Standard abweichen wollen)
### Schritt 1: Die Daten hochladen (Der "Upload-Trick")

Wir müssen die CSV-Datei in Ghost hochladen, um einen Link zu erhalten.

1. Klicken Sie in Ihrem Artikel an eine leere Stelle.
2. Tippen Sie `/file` und drücken Sie `Enter` (oder wählen Sie im Menü (+) die Karte **"File"**).
3. Ziehen Sie Ihre CSV-Datei in das Feld.
4. **WICHTIG:** Sobald der Upload fertig ist, erscheint ein Datei-Symbol im Editor.
    - Rechtsklick auf den blauen Datei-Link / Button.
    - Wählen Sie **"Link-Adresse kopieren"** (Copy Link Address).
5. Löschen Sie die "File"-Karte jetzt wieder aus dem Artikel (einfach `Backspace` oder `Entf` drücken, wenn sie markiert ist).

_Keine Sorge: Die Datei bleibt auf dem Server, wir haben ja jetzt den Link in der Zwischenablage._
#### Empfehlung für den redaktionellen Ablauf

Um den Einbindungs-Prozess ("Upload-Trick") robuster zu machen, empfehle ich folgende **Optimierung für die Redakteure**:

**Das Problem beim "Löschen der Karte":** Ghost löscht Dateien momentan _nicht_ vom Server, wenn man die Karte im Editor löscht (sogenannte "orphaned files"). Das ist gut für Ihren Trick. **Aber:** Es ist kein garantiertes Verhalten für die Ewigkeit. Wenn Ghost in Version 6.0 einen "Aufräum-Bot" einführt, könnten Ihre Charts plötzlich leer sein.

**Der professionellere Weg (Best Practice):** Statt die Karte zu löschen, lassen Sie sie als **"Datenquelle / Download"** am Ende des Artikels oder in einem Akkordeon stehen.

- **Vorteil 1:** Die Datei ist offiziell "in Benutzung" und wird von künftigen Aufräum-Skripten verschont.
- **Vorteil 2:** Transparenz für Ihre Leser ("Open Data" Ansatz – Finanzwesir-Leser lieben Rohdaten).
- **Ablauf:** Datei hochladen -> Link kopieren -> Karte nach unten schieben und z.B. "Datenquelle (CSV)" nennen.


Wir nutzen die **Snippet-Funktion** von Ghost, um uns drei fertige Werkzeuge in den Editor zu legen.

### 1. Vorbereitung (Einmalig durchzuführen)

Wir legen uns jetzt drei "Schablonen" an.

**Schritt A: Das Werkzeug für Kursverläufe anlegen**

1. Erstellen Sie eine leere HTML-Karte.
2. Fügen Sie diesen Code ein:
   
    ```
    <div class="financial-chart-module" 
         data-type="line"
         data-csv="HIER_LINK_EINFÜGEN"
         data-colors="World: #0071BF, ACWI: #218380">
    </div>
    ```
    
3. Klicken Sie auf das Snippet-Icon in der Toolbar der Karte.
4. Name: **"Chart: Linie"** -> Speichern.
   
**Schritt B: Das Werkzeug für Balkendiagramme anlegen**

1. Erstellen Sie eine neue HTML-Karte.
2. Fügen Sie diesen Code ein:
       
    ```
    <div class="financial-chart-module" 
         data-type="bar"
         data-csv="HIER_LINK_EINFÜGEN"
         data-colors="World: #0071BF, ACWI: #218380">
    </div>
    ```
    
3. Klicken Sie auf das Snippet-Icon.
4. Name: **"Chart: Balken"** -> Speichern.

**Schritt C: Das Werkzeug für Asset-Allokation (Kreis) anlegen**

1. Erstellen Sie eine neue HTML-Karte.
2. Fügen Sie diesen Code ein:

    ```
    <div class="financial-chart-module" 
         data-type="pie"
         data-csv="HIER_LINK_EINFÜGEN"
         style="height: 400px;">
    </div>
    ```
    
3. Klicken Sie auf das Snippet-Icon.
4. Name: **"Chart: Kreis"** -> Speichern.

---

### 2. Der neue Workflow (Täglicher Einsatz)

Wenn Sie jetzt einen Artikel schreiben, müssen Sie nicht mehr über Code nachdenken.

1. **Datei hochladen:** Wie gewohnt CSV hochladen, Link kopieren, Datei-Karte löschen.
2. **Werkzeug wählen:**
    - Tippen Sie `/chart` oder klicken Sie auf das Snippet-Menü.
    - Sie sehen jetzt Ihre Auswahl:
        - `Chart: Linie`
        - `Chart: Balken`
        - `Chart: Kreis`

3. **Klick:** Das komplette, korrekte HTML für diesen Typ erscheint sofort.
4. **Einfügen:** Link bei `HIER_LINK_EINFÜGEN` reinpasten. Fertig.

**Der Vorteil:** Keine Tippfehler bei `data-type`, kein Vergessen von Attributen. Die Komplexität ist komplett in den Snippets versteckt.

### Schritt 3: Verkabeln & Abschmecken

Jetzt verbinden wir Ihren kopierten Link mit dem Code.

1. **Link einfügen:**
    - Markieren Sie im HTML-Code den Text `HIER_LINK_EINFÜGEN`.
    - Drücken Sie `Strg+V` (Windows) oder `Cmd+V` (Mac), um den CSV-Link einzufügen, den Sie in Schritt 1 kopiert haben.
    - _Es sollte dann so aussehen: `data-csv="https://ihre-seite.de/content/files/2024/12/daten.csv"`_

2. **Farben anpassen (Optional):**
    - Schauen Sie in die Zeile `data-colors`.
    - Das Format ist simpel: `Name der Spalte: #Farbcode`.
    - Ändern Sie die Namen so, dass sie zu Ihrer CSV passen (z.B. "ACWI IMI" statt "ACWI").
    - _Tipp:_ Wenn Sie die Zeile `data-colors` komplett löschen, nutzt das System automatisch Ihre CI-Farben in zufälliger Reihenfolge.

### Schritt 4: Vorschau

1. Klicken Sie oben rechts in Ghost auf **"Preview"**.
2. Der Chart sollte nun laden, interaktiv sein und die Buttons (1J, 3J, Max) anzeigen.

### Schritt 5: Monatliches Update (Wartung)

Wie aktualisieren Sie einen bestehenden Chart, wenn neue Daten vorliegen (z.B. neuer Monat)?

**Das Problem:** Ghost überschreibt Dateien nicht. Wenn Sie `daten.csv` erneut hochladen, benennt Ghost sie in `daten-1.csv` um. Der Link ändert sich also immer.

**Der Workflow:**

1. **Excel aktualisieren:** Fügen Sie die neuen Zeilen in Ihre Excel-Liste ein und speichern Sie erneut als CSV.
2. **Upload:** Laden Sie die neue Datei in den Ghost-Artikel hoch (wie in Schritt 1).
3. **Link kopieren:** Kopieren Sie den Link der _neuen_ Datei.
4. **Austauschen:**
    - Klicken Sie auf die bestehende HTML-Karte mit dem Chart.
    - Löschen Sie den alten Link bei `data-csv="..."`.
    - Fügen Sie den neuen Link ein.

5. **Aufräumen:** Löschen Sie die File-Upload-Karte (aus Schritt 2) wieder.

_Hinweis: Der alte Link ist nun tot, aber da Sie ihn ersetzt haben, sieht der Leser sofort die neuen Daten._

### Strategischer Hintergrund: Warum "Self-Hosting"?

Wir laden CSV-Dateien manuell hoch, anstatt bequeme Cloud-Dienste (wie Google Sheets) einzubinden. Diese Entscheidung hat **drei strategische Gründe**:

1. **Datenschutz & DSGVO (Privacy First):** Würden wir die Daten direkt von Google laden, würde der Browser jedes Besuchers eine Verbindung zu Google-Servern aufbauen. Dabei wird die IP-Adresse des Lesers an Google übermittelt – ohne dass er zugestimmt hat. Durch das Selbst-Hosten bleibt der Besucher zu 100% auf unserem Server. Keine Datenlecks, kein Cookie-Banner-Ärger.
    
2. **Digitale Souveränität (Unabhängigkeit):** Cloud-Dienste ändern ihre Schnittstellen (APIs) oder Nutzungsbedingungen. Ein Chart, der heute via Google funktioniert, könnte morgen kaputt sein. Eine CSV-Datei auf dem eigenen Server gehört uns. Sie funktioniert auch noch in 10 Jahren garantiert.
    
3. **Performance & Stabilität:** Der Abruf einer lokalen Datei ist meist schneller als der Verbindungsaufbau zu einem externen Server. Zudem vermeiden wir Ausfälle: Wenn Google Wartungsarbeiten hat, bleibt unser Artikel trotzdem lesbar.
   
   
   
   # SOP: Finanz-Charts in Ghost Artikel (Best Practice)

Diese Anleitung garantiert, dass Ihre Charts auf allen Geräten (Mobile/Desktop) sauber aussehen und technisch robust sind.

### Schritt 1: Datei-Vorbereitung

1. Erstellen Sie Ihre CSV in Excel (Spalte A = Datum).
    
2. Laden Sie die CSV im Ghost-Artikel über `/file` hoch.
    
3. **Kopieren Sie den Link** und löschen Sie die File-Karte wieder.
    

### Schritt 2: Der Artikel-Aufbau (Das Sandwich-Prinzip)

Bauen Sie den Chart immer in drei Teilen auf:

**1. Die Überschrift (Ghost Editor)** Schreiben Sie den Titel des Charts als normale Text-Zeile und formatieren Sie ihn als **Überschrift 3 (H3)**.

- _Beispiel:_ "Abbildung 1: Performance-Vergleich seit 2008"
    

**2. Der Chart (HTML Snippet)** Fügen Sie direkt darunter das passende Snippet ein (`/chart`).

- **Snippet A: Liniendiagramm (Verlauf)**
    
    ```
    <div class="financial-chart-module" 
         data-type="line"
         data-csv="HIER_LINK_EINFÜGEN"
         data-colors="World: #0071BF, ACWI: #218380">
    </div>
    ```
    
- **Snippet B: Balkendiagramm (Jahresvergleich)**
    
    ```
    <div class="financial-chart-module" 
         data-type="bar"
         data-csv="HIER_LINK_EINFÜGEN"
         data-colors="World: #0071BF">
    </div>
    ```
    
- **Snippet C: Kreisdiagramm (Asset Allokation)**
    
    ```
    <div class="financial-chart-module" 
         data-type="pie"
         data-csv="HIER_LINK_EINFÜGEN"
         data-center-text="true"
         style="height: 400px;">
    </div>
    ```
    

**3. Die Bildunterschrift (Ghost Editor)** Schreiben Sie direkt unter den Chart die Quelle oder Hinweise. Formatieren Sie dies kursiv oder klein.

- _Beispiel:_ _Quelle: Eigene Berechnung basierend auf MSCI Daten._
    

### Schritt 3: Verkabelung

1. Fügen Sie den kopierten CSV-Link im Snippet bei `HIER_LINK_EINFÜGEN` ein.
    
2. Prüfen Sie die Vorschau ("Preview").
    

### Warum machen wir das so? (Architektur-Entscheidung)

Wir trennen **Inhalt** (Überschrift, Quelle) von **Technik** (Chart).

- Das garantiert, dass Google Ihre Überschriften lesen kann (SEO).
    
- Es sorgt dafür, dass die Schriftgrößen auf Handys automatisch korrekt skaliert werden.
    
- Es macht den Austausch des Charts einfacher, da der Text nicht im Code versteckt ist.