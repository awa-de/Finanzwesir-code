# Fable-Prompt: Tailwind-App-Baukasten — Designentscheidung, Spezifikation und visuelle Referenz

**Modell:** `claude-fable-5`  
**Modus:** Konzept, Design-System und visuelle Referenz — keine Produktionsumsetzung  
**Reasoning-Effort:** high  
**Repository:** `Z:\Documents\Nextcloud\Finanzwesir 2.0`

---

## 1. Start und verbindliche Befundquelle

Verbinde dich mit dem Projektverzeichnis:

```text
Z:\Documents\Nextcloud\Finanzwesir 2.0
```

Lies zuerst diese Datei vollständig:

```text
docs/steering/patches/AP-tailwind-01_befund-und-forschung_Ergebnis.md
```

Sie ist die maßgebliche Anamnese für diesen Auftrag. Erfinde die Repository-Inventur nicht neu und wiederhole keine breite Webrecherche. Prüfe nur gezielt reale Dateien, wenn du eine konkrete Aussage oder visuelle Entscheidung aus dem Befund gegen den aktuellen Bestand absichern musst.

Der GELB-Status der Anamnese beruht ausschließlich darauf, dass die reale Ghost-`.hbs`-Auslieferungskette in diesem Repository nicht verifizierbar ist. Das ist ein bekannter, nicht neuer Infrastrukturpunkt und **kein Blocker für dieses Design-System-Konzept**. Verbringe keine Fable-Denkzeit damit, den fehlenden Ghost-Theme-Build zu rekonstruieren.

Führe zu Beginn kompakt aus:

```bash
git rev-parse --show-toplevel
git branch --show-current
git rev-parse --short HEAD
git status --short
```

Vorhandene Änderungen nicht anfassen. Kein Commit, kein Push, kein Abschlussritual.

---

## 2. Tatsächlicher Stand

Gesetzt ist:

- Apps und Chart-Engine funktionieren fachlich und technisch.
- Die CI-Farben und Fonts sind final definiert und bereits über `tokens.css` und die Theme-Bridge eingebunden.
- Tailwind ist als strukturelles Fundament verbindlich beschlossen.
- Im realen App-Fabrik-Code ist Tailwind strukturell noch nicht umgesetzt:
  - `prokrastinations-preis` nutzt eigene `fw-app__*`-Klassen und CSS,
  - das DOM-Chrome der Chart-Engine nutzt eigene `fw-chart-*`-Klassen und CSS,
  - die drei Standalone-Prototypen besitzen eigene, CI-fremde Systeme.
- Für die Konzept- und spätere Pilotphase soll Tailwind vollständig verfügbar sein. Der Nutzer sieht hierfür derzeit eine CDN-Nutzung vor.
- Der reale Tailwind-Ladepfad im Ghost-Theme ist aus diesem Repository nicht verifizierbar. Behandle „Tailwind per CDN in der Konzept-/Pilotphase verfügbar“ daher als **Nutzer-Laufzeitannahme**, nicht als belegten Repository-Fakt.
- Die spätere lokale, minimierte Produktionsintegration ist ein eigener Folgeauftrag und wird hier nicht entworfen oder umgesetzt.
- Dynamisch erzeugte Klassen müssen dennoch schon jetzt so spezifiziert werden, dass sie später build-sicher sind.

---

## 3. Produktkontext

Die Finanzwesir-App-Fabrik umfasst mehr als 25 interaktive Finanz-, Lern-, Rechner-, Daten- und Story-Apps, eingebettet in Ghost-Artikel.

Das ist **keine klassische SaaS-Admin-Konsole und kein Dashboard-Produkt**. Nutze die gestalterische Intelligenz aus Tailwind Application UI und Refactoring UI, aber übertrage keine Dashboard-Chrome, Navigation, Sidebar-Logik oder übermäßige Kartenlandschaft unkritisch.

Der globale Ghost-Auftritt ist in diesem Auftrag nur als **Host-Kontext** relevant:

- Artikel und App dürfen sich visuell und technisch nicht gegenseitig beeinflussen.
- App-Container müssen in redaktionelle Seiten passen.
- Das Content-System (`fw-janitor.js`) wird nicht neu gestaltet.
- Die gesamte Ghost.io-Site wird nicht redesigniert.

Der eigentliche Scope ist:

1. gemeinsame App-Fabrik-Schnittstelle,
2. `prokrastinations-preis` als Referenz-App,
3. DOM-Chrome der Chart-Engine als zweiter Referenzverbraucher,
4. visuelle Rahmung von Linie, Balken und Torte,
5. nicht das Canvas-Innenleben der Charts.

---

## 4. Ziel

Entwickle einen belastbaren Tailwind-App-Baukasten, der als Design- und Implementierungsvertrag für mehr als 25 Apps dienen kann.

Der Baukasten soll klären:

- App-Shell und Außencontainer,
- Weißraum und Dichte,
- Card-/Panel-Taxonomie,
- KPI-/Stat-Muster,
- Chart-Container und Chart-DOM-Chrome,
- Buttons, CTA und kompakte Chart-Controls,
- Slider und Form-Controls,
- Story-/Stationen-Bereich,
- Disclosure,
- Annahmen-/Disclaimer-Box,
- Loading, Empty und Error,
- Borders, Radien, Shadows und Surfaces,
- responsive Komposition,
- A11y-/Fokuszustände,
- Utility-Klassen versus wiederverwendbare Rezepte,
- Vanilla-JS-erzeugtes DOM,
- spätere Build-Sicherheit.

Maßstab:

> Gestaltung unterstützt Aufgabe, Lesefluss und innere Bewegung der App. Sie ist weder Dekoration noch eine Sammlung möglichst vieler Cards.

---

## 5. Nicht verhandelbare Leitplanken

Diese Punkte sind bereits entschieden und dürfen nicht erneut geöffnet werden:

- CI-Farben und CI-Fonts bleiben unverändert.
- `tokens.css` bleibt die Single Source of Truth für Farben und Fonts.
- Tailwind liefert Struktur: Spacing, Radien, Borders, Standardschatten und responsive Utilities.
- Kein zweites allgemeines Spacing-, Radius-, Border- oder Shadow-System neben Tailwind.
- Die bestehenden Zusatzstufen `shadow-soft` und `shadow-hover` dürfen als bereits freigegebene Ergänzungen verwendet werden.
- App-spezifische Mechanik bleibt app-lokal unter `--fw-*`.
- Canvas-Zeichnung, Chart.js-Datasets, Scales, Plugins und Chart-Geometrie sind kein Tailwind-Scope.
- Testharness-Chrome bleibt getrennt von Produktions-UI.
- Mehrfachinstanzen auf einer Seite, SafeDOM, A11y, Fokusführung und Reduced Motion bleiben erhalten.
- Vanilla JavaScript bleibt bestehen. Kein Frameworkwechsel.
- Keine neue Library und kein Tailwind-Plugin ohne ausdrückliche Nutzerentscheidung.
- Headless UI darf als Interaktions- und A11y-Referenz dienen, nicht als still einzuführende React-/Vue-Abhängigkeit.
- Keine dynamisch zusammengesetzten Tailwind-Klassennamen wie ``bg-${tone}-500``.
- Keine neuen freien Designwerte erfinden, wenn Tailwind-Defaults oder bestehende CI-Tokens den Bedarf decken.

Erlaubt und ausdrücklich gewünscht ist:

- konkrete Auswahl aus Tailwinds Default-Klassen,
- klare Klassenrezepte,
- Festlegung, welche wenigen Kombinationen als wiederverwendbarer Vertrag gelten,
- visuelle Empfehlung und begründete Designentscheidung.

---

## 6. Deine Rolle

Handle als verantwortlicher Design-System-Lead, nicht als neutraler Ideensammler.

Für jede echte offene Frage:

1. gib zuerst deine klare Empfehlung,
2. begründe sie knapp,
3. nenne die wichtigste verworfene Alternative,
4. zeige die Wirkung auf mehr als 25 Apps,
5. kennzeichne, ob der Nutzer noch entscheiden muss.

Liefere nicht nur Optionen. Wo der Befund ausreichend ist, entscheide und empfehle.

Stelle keine Rückfrage, nur weil ein Detail nicht vollständig belegt ist. Nutze eine ausdrücklich markierte Arbeitsannahme, sofern sie reversibel ist und die Entscheidung nicht verfälscht. Frage nur bei einem echten Blocker, der eine folgenreiche Entscheidung unmöglich macht.

---

## 7. Verbindlicher Decision Docket D-01 bis D-16

Beantworte **jede** Entscheidungsfrage `D-01` bis `D-16` aus Abschnitt 13 der Befunddatei.

Keine ID darf ausgelassen oder still zusammengelegt werden.

Nutze diese Ergebnismatrix:

| ID | Empfehlung | Begründung | verworfene Hauptalternative | Wirkung auf App-Pool | Nutzerentscheidung nötig | Folgeauswirkung |
|---|---|---|---|---|---|---|

Mögliche Statuswerte:

- `EMPFOHLEN — FREIGABE NÖTIG`
- `EMPFOHLEN — KEINE NEUE GRUNDSATZENTSCHEIDUNG`
- `BESTÄTIGT — BEREITS KANONISCH`
- `VERTAGT — NICHT IM SCOPE`
- `BLOCKIERT — KONKRETE FEHLINFORMATION`

Bei `BLOCKIERT` exakt benennen, welche Information fehlt und warum keine belastbare Empfehlung möglich ist. Der bekannte `.hbs`-Gap allein rechtfertigt hier kein `BLOCKIERT`.

---

## 8. Architektur des Baukastens

Lege die Ebenen ausdrücklich fest:

### Ebene A — kanonische CI

- Farben,
- Fonts,
- bestehende Zusatzschatten,
- semantische Rollen.

### Ebene B — Tailwind-Struktur

- Spacing,
- Layout,
- Grid/Flex,
- Radius,
- Border,
- Standardshadow,
- responsive Varianten,
- Zustandsvarianten,
- Fokusvarianten,
- Reduced-Motion-Varianten.

### Ebene C — gemeinsame App-Primitiven

Zum Beispiel:

- App Shell,
- Panel,
- Card,
- Stat/KPI,
- Button-Familie,
- Control Group,
- Slider Field,
- Disclosure,
- Callout/Assumptions,
- Status State,
- Chart Chrome.

### Ebene D — Kompositionen

Zum Beispiel:

- Screen Flow,
- KPI-Ergebnisgruppe,
- Chart mit Toolbar und Legende,
- Stationen-/Story-Bereich,
- Abschluss-CTA.

### Ebene E — lokale App-Mechanik

Zum Beispiel:

- Card-to-Point-Flug,
- Rubikon-Position,
- spezielle Timings,
- app-spezifische Overlays.

Definiere die Besitzgrenzen. Ein Primitive darf nicht still App-Mechanik übernehmen.

---

## 9. Verbindlicher Primitive-Vertrag

Erstelle für jedes vorgeschlagene gemeinsame Primitive eine Tabelle mit:

| Feld | Inhalt |
|---|---|
| Primitive-ID und Name | stabiler Name |
| Zweck | wann es eingesetzt wird |
| Nicht verwenden für | klare Grenze |
| semantisches HTML | Elementstruktur |
| Tailwind-Klassenrezept | vollständige, build-sichere Klassenstrings |
| erlaubte Varianten | z. B. primary, secondary, toolbar |
| Interaktionszustände | hover, focus-visible, active, disabled |
| responsive Verhalten | mobile-first |
| A11y-Vertrag | Semantik/ARIA/Fokus |
| Surface/Border/Shadow-Regel | nach „Abstand > Flächenton > Schatten > Border zuletzt“ |
| Besitzer | App-Shell, gemeinsame Primitive, Chart-Engine oder app-lokal |
| bestehender Verbraucher | App/Engine |
| Migrationshinweis | nur konzeptionell, kein Write |

Die Klassenrezepte müssen vollständige Literalstrings sein. Keine dynamischen Klassennamen.

---

## 10. Responsive- und Dichtevertrag

Erarbeite eine klare Empfehlung für:

- Tailwind-default mobile-first Breakpoints der allgemeinen UI,
- begründete Ausnahmebehandlung für app-mechanische Breakpoints,
- Container Queries des Chart-DOMs,
- S/M/L-Darstellung der Referenz-App,
- Stacking von Controls,
- KPI-Grid,
- Chart-Toolbar und Legende,
- App-Padding im Ghost-Artikel,
- maximale Breite beziehungsweise Lesebreite,
- vertikale Rhythmik,
- Touch Targets.

Zeige ausdrücklich:

- was kanonisch vereinheitlicht wird,
- was als App-/Engine-Ausnahme bestehen bleibt,
- welche Ausnahme dokumentationspflichtig ist.

---

## 11. Chart-Grenze

Entwirf nur das Tailwind-fähige DOM-Chrome:

- Außencontainer,
- Titel,
- Toolbar,
- Segmented Controls,
- Legende,
- große Kennzahl,
- Loading/Error/Empty,
- Popover-/Dialog-Rahmung,
- Caption/Disclaimer.

Nicht gestalten oder ändern:

- Chartdaten,
- Diagrammsemantik,
- Linien-, Balken- oder Tortenlogik,
- Scales,
- Canvas-Plugins,
- Marker,
- Annotationen,
- Tooltips innerhalb von Chart.js.

Die visuellen Beispiele für Linie, Balken und Torte sollen zeigen, wie **derselbe DOM-Vertrag** unterschiedliche Chart-Typen trägt.

---

## 12. Visuelle Referenz ist Pflicht

Fable soll nicht nur Prosa liefern.

Erstelle zusätzlich zur Konzeptdokumentation ein neues, rein statisches, klar als `NON-PRODUCTION DESIGN BOARD` gekennzeichnetes HTML-Board.

Das Board darf für diesen Konzeptnachweis Tailwind per CDN laden. Dies ist keine Aussage über die spätere Produktionsauslieferung.

Das Board zeigt mindestens:

1. **App Shell S/M/L**
   - schmale mobile Einbettung,
   - mittlere Artikelbreite,
   - breite Desktop-Einbettung.

2. **Prokrastinations-App als zusammenhängender Flow**
   - Eingabe mit Slider,
   - Stationen-/Story-Panel,
   - KPI-Ergebnisgruppe,
   - Chart-Bereich,
   - Annahmen-/Disclaimer,
   - Primär- und Sekundäraktion.

3. **Chart-DOM-Chrome**
   - Linie,
   - Balken,
   - Torte,
   - jeweils mit Titel, Toolbar/Control, Legende und Status-/Caption-Bereich,
   - Chart-Innenleben nur als repräsentative statische SVG- oder Platzhalterdarstellung.

4. **Primitive-Zustände**
   - Default,
   - Hover,
   - Focus-visible,
   - Active,
   - Disabled,
   - Loading,
   - Empty,
   - Error.

5. **Trennungslogik**
   - gutes Beispiel für Panel/Card,
   - absichtlich vermiedene Card-in-Card-Struktur,
   - Beispiel „Abstand vor Border“.

Das Board muss CI-Farben und Fonts aus den vorhandenen Tokens übernehmen oder exakt referenzieren. Keine neuen freien Farben.

Es ist ein visuelles Entscheidungsartefakt, kein Produktionsprototyp. Keine App-Logik, keine Datenpipeline, keine Chart-Engine-Integration.

---

## 13. Liefergegenstände und Write-Scope

Erzeuge ausschließlich diese zwei neuen Dateien:

```text
docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md
docs/steering/design/TAILWIND-APP-BAUKASTEN_VISUAL-BOARD_V0-1.html
```

Keine bestehende Datei ändern.

### Konzeptdokument: Mindeststruktur

1. Status und Empfehlung
2. Designprinzipien
3. Ebenen- und Besitzmodell
4. Antworten D-01 bis D-16
5. Card-/Panel-/Surface-Taxonomie
6. Primitive-Verträge
7. Spacing-, Radius-, Border- und Shadow-Matrix
8. Button-/Control-Hierarchie
9. Responsive- und Dichtevertrag
10. App↔Chart-DOM-Schnittstelle
11. A11y-/Interaktionsvertrag
12. Build-sichere Klassenkonvention
13. Anwendung auf `prokrastinations-preis`
14. Anwendung auf Linie/Balken/Torte
15. bewusst lokale Ausnahmen
16. offene Nutzerentscheidungen
17. Akzeptanzkriterien für den späteren Pilot
18. ausdrücklich nicht Teil dieses Konzepts

Kopfstatus:

```text
ENTWURF — NICHT FREIGEGEBEN — KEIN PRODUKTIONSCODE
```

### Visual Board

- eigenständig lokal öffnbar,
- keine Abhängigkeit von App-/Engine-JavaScript,
- keine bestehenden Dateien importieren, deren Verhalten verändert werden könnte,
- klarer Hinweis „Design Board, kein Produktionscode“,
- Klassen und Komponenten müssen mit dem Konzeptdokument übereinstimmen.

---

## 14. Qualitätsgates

Vor Abschluss:

### Gate A — Scope

```bash
git status --short
git diff --name-only
git diff --check
```

Neu erlaubt sind nur die beiden festgelegten Dateien. Vorbestehende Änderungen separat nennen und nicht anfassen.

### Gate B — Decision Docket

Prüfe deterministisch, dass `D-01` bis `D-16` jeweils genau einmal als Entscheidung beantwortet sind.

### Gate C — Konsistenz

Prüfe:

- jede im Visual Board verwendete gemeinsame Komponente ist im Konzept definiert,
- jedes Klassenrezept ist ein vollständiger String,
- keine neuen CI-Farb- oder Fontwerte,
- keine neue freie Spacing-/Radius-/Shadow-Skala,
- keine Canvas-Mechanik als Tailwind-Primitive,
- keine Testharness-Gestaltung in den Produktionsbaukasten gerutscht,
- keine Card-in-Card-Inflation,
- keine globale Ghost-Site-Neugestaltung.

### Gate D — Responsive

Board und Konzept zeigen S/M/L und benennen Ausnahmen von Tailwind-Defaults.

### Gate E — A11y

Semantisches HTML, Fokuszustände, Disabled, Statuszustände und Reduced Motion sind dokumentiert. Keine Screenreader- oder Browserprüfung behaupten, die nicht wirklich durchgeführt wurde.

### Gate F — Datei-Wahrheit

Beide neuen Dateien vollständig vom Datenträger neu lesen. Erst danach Status melden.

---

## 15. Nicht-Ziele

Nicht tun:

- bestehenden Produktionscode ändern,
- `app.css`, `app.js`, `screen.css`, `tokens.css`, Engine- oder Testdateien anfassen,
- Tailwind lokal installieren oder bundeln,
- Ghost-`.hbs`-Integration entwerfen,
- CDN-/Build-Frage lösen,
- neue Library oder Plugin einführen,
- Chart-Innenleben redesignieren,
- alle 25 Apps migrieren,
- Standalone-Prototypen umbauen,
- globale Website-/Content-Komponenten redesignieren,
- CI-Farben oder Fonts verändern,
- neue freie Designwerte erfinden,
- Folge-AP selbst starten,
- committen oder pushen.

---

## 16. Erwartete Chat-Ausgabe

Beginne mit dem Ergebnis und melde knapp:

```text
Status: GRÜN / GELB / ROT
Empfohlene Grundarchitektur: ...
Konzeptdatei: ...
Visual-Board-Datei: ...
D-01 bis D-16 vollständig beantwortet: ja/nein
Nutzerentscheidungen offen: ...
Wichtigste verworfene Alternative: ...
Neue Werte/Libraries/Plugins eingeführt: nein / Abweichung
Bestehende Dateien geändert: nein / Abweichung
Scope-QA: ...
Nächster richtiger Schritt: Konzept und Visual Board durch Nutzer und steuerndes LLM abnehmen.
Ausdrücklich nicht der nächste Schritt: Tailwind in Produktionscode implementieren.
```

Danach stoppen. Weiter nur nach Nutzer-OK.
