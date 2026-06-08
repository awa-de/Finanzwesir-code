Hier ist die aktualisierte Standard Operating Procedure (SOP). Sie integriert die neuen Anforderungen (Pflichtfeld `data-title` für Barrierefreiheit und `data-options` für Business-Logik) in den bestehenden Workflow.

-----

# 📄 SOP: Interaktiven Finanz-Chart in Ghost Artikel einfügen (V2.0)

**Benötigte Zutaten:**

1.  Die vorbereitete CSV-Datei (z.B. `kursdaten_2024.csv`) – siehe [[SOP CSV erstellen]]
2.  Die Hex-Codes Ihrer Farben (falls Sie vom Standard abweichen wollen)

-----

### Schritt 1: Die Daten hochladen (Der "Upload-Trick")

*Dieser Schritt bleibt unverändert.*

Wir müssen die CSV-Datei in Ghost hochladen, um einen Link zu erhalten.

1.  Klicken Sie in Ihrem Artikel an eine leere Stelle.
2.  Tippen Sie `/file` und drücken Sie `Enter` (oder wählen Sie im Menü (+) die Karte **"File"**).
3.  Ziehen Sie Ihre CSV-Datei in das Feld.
4.  **WICHTIG:** Sobald der Upload fertig ist, erscheint ein Datei-Symbol im Editor.
      - Rechtsklick auf den blauen Datei-Link / Button.
      - Wählen Sie **"Link-Adresse kopieren"** (Copy Link Address).
5.  Löschen Sie die "File"-Karte jetzt wieder aus dem Artikel (einfach `Backspace` oder `Entf` drücken, wenn sie markiert ist).

*Keine Sorge: Die Datei bleibt auf dem Server, wir haben ja jetzt den Link in der Zwischenablage.*

-----

### Schritt 2: Das Werkzeug anlegen (Einmalig)

*Aktualisiert: Snippets enthalten jetzt `data-title` und `data-options`.*

Wir nutzen die **Snippet-Funktion** von Ghost, um uns drei fertige Werkzeuge in den Editor zu legen. Tippen Sie `/html`, fügen Sie den Code ein und speichern Sie ihn als Snippet.

**Snippet A: Chart: Linie (Verlauf)**
*Standard-Ansicht für Zeitreihen.*

```html
<div class="financial-chart-module" 
     data-type="line"
     data-csv="HIER_LINK_EINFÜGEN"
     data-title="HIER_TITEL_EINFÜGEN" 
     data-colors="World: #0071BF, ACWI: #218380">
</div>
```

**Snippet B: Chart: Balken (Jahresvergleich)**
*Optional mit Ranking-Modus.*

```html
<div class="financial-chart-module" 
     data-type="bar"
     data-csv="HIER_LINK_EINFÜGEN"
     data-title="HIER_TITEL_EINFÜGEN"
     data-options="mode:ranking">
</div>
```

**Snippet C: Chart: Kreis (Asset Allokation)**
*Für Verteilungen.*

```html
<div class="financial-chart-module" 
     data-type="pie"
     data-csv="HIER_LINK_EINFÜGEN"
     data-title="HIER_TITEL_EINFÜGEN"
     style="height: 400px;">
</div>
```

-----

### Schritt 3: Verkabelung (Der neue Workflow)

*Aktualisiert: Titel muss nun ebenfalls eingegeben werden.*

1.  **Werkzeug wählen:** Tippen Sie `/snippet` oder `/chart` und wählen Sie das gewünschte Diagramm (Linie, Balken, Kreis).
2.  **Daten verbinden:** Fügen Sie den kopierten CSV-Link (aus Schritt 1) bei `HIER_LINK_EINFÜGEN` ein.
3.  **Titel setzen (NEU):** Ersetzen Sie `HIER_TITEL_EINFÜGEN` durch einen aussagekräftigen Titel (z.B. "Renditevergleich 2020-2024").
      * *Hinweis: Dieser Titel ist wichtig für Screenreader (Barrierefreiheit).*
4.  **Vorschau:** Prüfen Sie die Vorschau ("Preview").

**Die Bildunterschrift (Optional):**
Schreiben Sie direkt unter den Chart die Quelle oder Hinweise (kursiv/klein).
*Beispiel: Quelle: Eigene Berechnung basierend auf MSCI Daten.*

-----

# 🔍 Vergleich & Analyse (Diff)

Hier sehen Sie, was sich gegenüber der ersten Iteration verändert hat.

| Element | Status | Änderung & Begründung |
| :--- | :--- | :--- |
| **Schritt 1 (Upload)** | **Konstant** | Der "Upload-Trick" funktioniert weiterhin identisch. Keine Änderung am Workflow. |
| **HTML-Struktur** | **Geändert** | Alle Snippets haben jetzt das Attribut `data-title="..."`. <br>**Grund:** Barrierefreiheit (A11y) und Unabhängigkeit vom Artikeltext. |
| **Balken-Chart** | **Erweitert** | Neues Attribut `data-options="mode:ranking"` hinzugefügt. <br>**Grund:** Ermöglicht Business-Logik (Sortierung) direkt beim Start. |
| **Pie-Chart** | **Vereinfacht** | `data-center-text="true"` wurde entfernt. <br>**Grund:** Die Logik für den Center-Text ist jetzt fest im Plugin verbaut (automatisch), muss nicht mehr konfiguriert werden. |
| **Schritt 3 (Workflow)** | **Erweitert** | Der Redakteur muss jetzt **zwei** Dinge einfügen: Link UND Titel. <br>**Grund:** Datenintegrität. |
| **Sicherheit** | **Neu (Implizit)** | Tippfehler bei Farben oder fehlende Titel führen nicht mehr zum Crash, sondern zu Fallbacks (Standard-Farbe, Standard-Titel), dank der neuen Engine-Architektur. |

**Fazit:** Der Workflow wird für Sie minimal aufwändiger (Titel eintippen), aber das Ergebnis wird deutlich robuster, barrierefreier und mächtiger (Ranking-Option).