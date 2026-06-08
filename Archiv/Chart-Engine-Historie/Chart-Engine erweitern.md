---
Angelegt am: 03.12.2025 12:31:04
zuletzt verändert am: 2025-12-03T12:31:56+01:00
---
---
up:: 

**Die kurze Antwort:** Die Architektur ist **extrem zukunftssicher**. Wir haben eine strikte Trennung von **Daten** (CSV), **Befehl** (HTML-Snippet) und **Ausführung** (Engine).

Wenn Sie in 6 Monaten einen neuen Typ (z.B. "Radar-Chart" oder "Gestapelte Balken") einführen wollen, müssen Sie **keinen einzigen alten Artikel anfassen**. Die alten Charts laufen weiter.

Hier ist der Prozess, den Sie (oder Ihr Entwickler) dann durchlaufen müssen. Es ist wie auf einer Speisekarte ein neues Gericht hinzufügen: Erst lernt die Küche (Engine), wie man es kocht, dann drucken wir es auf die Karte (Snippet).

---

### Der Erweiterungs-Workflow (3 Schritte)

Nehmen wir an, Sie wollen ein **"Radar-Chart"** (Netzdiagramm) einführen, um z.B. Länder-Gewichtungen zu vergleichen.

#### Schritt 1: Die "Küche" anlernen (Engine Update)

Sie gehen in Ghost zu **Code Injection** -> **Footer**. Sie suchen im Skript die Methode `render(rawData)`. Dort gibt es aktuell eine Weiche:

JavaScript

```
if (this.type === 'pie') {
   // ... Logik für Kuchen
} else if (this.type === 'bar') {
   // ... Logik für Balken
} else {
   // ... Logik für Linie
}
```

Sie fügen einfach einen neuen Block ein:

JavaScript

```
} else if (this.type === 'radar') {
    // --- NEUE LOGIK FÜR RADAR ---
    config = {
        type: 'radar',
        data: data,
        options: {
            // ... Chart.js Radar Konfiguration
        }
    };
}
```

_Aufwand: ca. 15 Minuten Coding._

#### Schritt 2: Das "Bestellformular" erstellen (Snippet)

Damit Sie als Redakteur das neue Gericht bequem bestellen können, legen Sie ein neues Snippet an.

1. Neue HTML-Karte.
    
2. Code:
    
    HTML
    
    ```
    <div class="financial-chart-module" 
         data-type="radar" 
         data-csv="HIER_LINK" 
         style="height: 500px;">
    </div>
    ```
    
3. Als Snippet speichern: **"Chart: Radar"**.
    

_Aufwand: 2 Minuten._

#### Schritt 3: Nutzung

Ab sofort tippen Sie im Artikel `/chart` und wählen "Chart: Radar". Sie laden dieselbe Art von CSV hoch wie immer. Die Engine weiß nun, dass sie bei `data-type="radar"` die Daten anders interpretieren und zeichnen muss.

---

### Warum das sicher ist (Architectural Review)

1. **Abwärtskompatibilität:** Da wir `else { ... }` (Liniendiagramm) als Fallback haben, wird selbst bei einem Tippfehler (`data-type="rader"`) nichts abstürzen. Es wird einfach eine Linie angezeigt.
    
2. **Keine Code-Duplizierung:** Der komplexe Teil – CSV parsen, Farben zuweisen, Daten bereinigen, Währungen erkennen – passiert **vor** dem Rendern. Der neue Chart-Typ nutzt 90% des bestehenden Codes (Parser, Farblogik, Init) mit. Sie müssen nur die letzten 10% (das Zeichnen) hinzufügen.
    
3. **Zentrales Update:** Wenn Chart.js ein Sicherheitsupdate bekommt oder wir die Schriftart der gesamten Seite ändern, ändern wir das an **einer** Stelle im Footer. Sofort sind _alle_ Diagramme (Linie, Balken, Kreis und der neue Radar) auf der gesamten Website aktualisiert.
    

![Bildmotiv: Chart.js chart types](https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRNAgeM47VvnqUBOxr7Ta1WY-USbhV39mE0yXarJpVsou4mC9BDYPCJP2-eRjn2lBkyjfQNUyhfSVgMBQqh09y7puXGIsQmyygYUpLdKa66ClEaDvs)

### Fazit

Sie haben sich mit dieser Architektur **nicht verbaut**. Im Gegenteil: Sie haben ein modulares System geschaffen, das beliebig wachsen kann, ohne dass der Content (die Artikel) jemals überarbeitet werden muss.