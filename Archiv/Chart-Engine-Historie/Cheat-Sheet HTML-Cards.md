Hier ist das **Finanzwesir Chart Engine Cheat-Sheet**.

Speichern Sie dieses Dokument an einem Ort, wo Sie es in 6 Wochen garantiert wiederfinden (z.B. in Ihrer Notion-Wissensdatenbank oder als angeheftete Notiz). Es enthält alles, was Sie brauchen, um Charts ohne Vorwissen zu konfigurieren.

-----

# 📋 Cheat-Sheet: Finanzwesir Chart-Befehle

Dieses Dokument erklärt, wie Sie das Verhalten der Charts über das Feld `data-options` steuern.

## 1\. Die Befehls-Tabelle (Referenz)

Suchen Sie hier den Chart-Typ, den Sie verwenden, und wählen Sie den passenden Effekt.

| Chart Typ | Befehl (Links) | Wert (Rechts) | Effekt / Beschreibung |
| :--- | :--- | :--- | :--- |
| **Balken** (`bar`) | `mode` | `time` | **Standard:** Zeigt den Verlauf chronologisch (Jahre nacheinander). |
| | | `ranking` | **Bestenliste:** Sortiert die Jahre absteigend nach Rendite (bestes Jahr links). |
| | | `asset` | **Vergleich:** Gruppiert die Balken nach Asset-Klassen (nicht nach Jahren). |
| **Linie** (`line`) | `range` | `max` | **Standard:** Zeigt den gesamten verfügbaren Zeitraum der CSV. |
| | | `5y` | Zoomt beim Start direkt auf die letzten **5 Jahre**. |
| | | `1y` | Zoomt beim Start direkt auf das letzte **1 Jahr**. |
| | `benchmark` | *Name* | Hebt die Linie mit diesem Namen fett hervor (z.B. `benchmark:ACWI`). |
| **Kreis** (`pie`) | `slice` | `latest` | **Standard:** Zeigt die Verteilung zum **aktuellsten** Datum in der CSV. |
| | | `first` | Zeigt die Verteilung zum **Start-Datum** der CSV. |
| | | *Jahr* | Zeigt die Verteilung für ein festes Jahr (z.B. `slice:2020`). |

-----

## 2\. Praxis-Beispiel

Sie möchten einen **Linien-Chart** zeigen, der sich auf die **letzten 5 Jahre** konzentriert und den **ACWI** als wichtigste Linie hervorhebt.

**Ihr Code im Ghost-Editor:**

```html
<div class="financial-chart-module" 
     data-type="line"
     data-title="Rendite-Vergleich (Fokus 5 Jahre)" 
     data-csv="HIER_LINK_EINFÜGEN"
     data-colors="World: #0071BF, ACWI: #218380"
     data-options="range:5y, benchmark:ACWI">
</div>
```

-----

## 3\. Die Anatomie eines Befehls

Das Feld `data-options` funktioniert wie eine einfache Anweisung an einen Assistenten.

Die Grundregel lautet: **`Was : Wie`**

### Der Aufbau im Detail:

`data-options="Befehl1:Wert, Befehl2:Wert"`

1.  **Der Doppelpunkt (`:`)**
    Er verbindet den Befehl mit dem gewünschten Wert.

      * *Falsch:* `range=5y`
      * *Richtig:* `range:5y` ("Zoom-Bereich **ist** 5 Jahre")

2.  **Das Komma (`,`)**
    Es trennt zwei verschiedene Befehle voneinander, wenn Sie mehrere Dinge gleichzeitig wollen.

      * *Beispiel:* `range:5y, benchmark:ACWI` ("Zoom auf 5 Jahre **UND** hebe ACWI hervor")

3.  **Die Anführungszeichen (`"`)**
    Sie umschließen die *gesamte* Liste der Optionen.

      * *Wichtig:* Schreiben Sie niemals Anführungszeichen *innerhalb* der Optionen.

-----

## 4\. Das Kochrezept (Schritt-für-Schritt)

**Szenario:** Sie haben das HTML-Snippet in Ghost eingefügt und wollen nun spezielle Optionen aktivieren.

1.  **Cursor platzieren:**
    Klicken Sie in die Zeile `data-options="..."` zwischen die beiden Anführungszeichen.

2.  **Einen Befehl schreiben:**
    Schauen Sie in die **Tabelle oben**.

      * Wollen Sie sortieren? Tippen Sie: `mode:ranking`
      * Wollen Sie zoomen? Tippen Sie: `range:5y`

3.  **Mehrere Befehle schreiben (Optional):**
    Wenn Sie schon einen Befehl haben (z.B. `range:5y`) und noch einen zweiten wollen:

      * Tippen Sie ein Komma `,` hinter den ersten Wert.
      * Tippen Sie den zweiten Befehl direkt dahinter (Leerzeichen nach dem Komma ist erlaubt, aber nicht nötig).
      * *Ergebnis:* `range:5y, benchmark:World`

4.  **Kontrolle:**
    Prüfen Sie, ob am Anfang und am Ende der Zeile die Anführungszeichen `"` stehen.

**Fertig.** Der Chart wird nun Ihre Anweisungen befolgen.