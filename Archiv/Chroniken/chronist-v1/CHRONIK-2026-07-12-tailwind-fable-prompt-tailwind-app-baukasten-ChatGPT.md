---
chronik_id: CHRONIK-2026-07-12-tailwind-fable-prompt-tailwind-app-baukasten-ChatGPT
datum: 2026-07-12
projekt: finanzwesir-app-fabrik
thema: tailwind-fable-prompt
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: prompt-erstellung
status_am_ende: abgeschlossen
quellenlage: mit-anhaengen
schlagworte: [richtungswechsel, konzept-vs-umsetzung, vollstaendigkeit-vs-verdichtung, annahme-verworfen]
---

# Chronik: Vom Tailwind-Befund zum Fable-Entscheidungsauftrag

**Hauptgegenstand:** Der Faden diente zunächst der Vorbereitung einer repository-gestützten Anamnese zum Tailwind-Fundament der Finanzwesir-App-Fabrik. Nach dem Rücklauf dieser Anamnese wurde ein Fable-Prompt für die Design-System-Entscheidung entwickelt, verschärft und anschließend zugunsten größerer Denkfreiheit wieder verdichtet.

## Ausgangslage

Der Nutzer wollte den Stand des Repositories `awa-de/Finanzwesir-code` untersuchen lassen. Im Mittelpunkt standen `Apps/prokrastinations-preis`, die Chart-Engine unter `Theme/assets/js/fw-chart-engine`, die Engine-Tests sowie die bereits vorhandenen CI-Farben und Fonts. Nicht untersucht werden sollte, ob Tailwind grundsätzlich eingeführt werde; diese Grundsatzentscheidung war bereits gefallen. Offen war, wie Tailwind als strukturelles Fundament für mehr als 25 Apps eingesetzt werden sollte.

Als erster Liefergegenstand wurde ein ausführbarer Claude-Code-Prompt verlangt. Dieser sollte eine breite, aber tokenbewusste Anamnese erzeugen: Python für die deterministische Inventur, Haiku nur optional für Grobsortierung und Sonnet für Synthese und Verantwortung. Eine Umsetzung von Tailwind war ausdrücklich noch nicht vorgesehen.

## Chronologischer Verlauf

### Repository-Befund und Anamneseauftrag

Das Repository wurde über die GitHub-Verbindung gelesen. Dabei wurden unter anderem `Apps/prokrastinations-preis/app.css`, `app.js`, die Testseite, `Theme/assets/css/tokens.css`, der CI-Pool-Rollenkontrakt, das App-Fabrik-Decision-Log und die historische Tailwind-Rohreferenz geprüft.

Als Arbeitsstand wurde festgehalten:

- Farben und Fonts waren bereits zentralisiert.
- `tokens.css` war als Quelle für CI-Rollen etabliert.
- Tailwind war als Ziel für Strukturwerte beschlossen, aber in der App-Fabrik noch nicht als Utility-Fundament umgesetzt.
- Die Prokrastinations-App arbeitete weiterhin mit `fw-app__*`-Klassen und eigenem CSS.
- Das DOM-Chrome der Chart-Engine arbeitete mit `fw-chart-*`-Klassen.
- Die historische Datei `fw-app-template.html` war nur ein „Steinbruch“ und kein verbindlicher Zielstand.

Daraufhin entstand die Datei `claude_prompt_AP-tailwind-01_befund-und-forschung.md`. Sie begrenzte den Auftrag auf Lesen, Inventur, externe Forschung und ein Fable-Entscheidungsdossier. Produktionscode, Tailwind-Installation und Migration blieben ausgeschlossen.

### Rücklauf von AP-tailwind-01

Der Nutzer brachte anschließend den Rücklauf aus Claude ein. Die Ergebnisdatei lautete:

`docs/steering/patches/AP-tailwind-01_befund-und-forschung_Ergebnis.md`

Der Rücklauf meldete den Status GELB. Inventarisiert worden waren 25 App-Ordner:

- eine produktiv integrierte App,
- drei Standalone-Prototypen mit eigenem CI-fremdem System,
- 21 reine Spec-Ordner ohne Laufzeitcode.

Weiter wurden 25 UI-Primitiven, neun Findings, sechs Forschungsthesen und 16 Fable-Entscheidungen ausgewiesen. Als einzige Research-Lücke blieb die nicht verifizierbare Ghost-`.hbs`-Template-Kette. Dieser Punkt war bereits zuvor als P18 dokumentiert und wurde nicht als neuer Fund dargestellt. Die Ergebnisdatei hatte keine Produktionsdateien verändert.

### Prüfung des ersten Fable-Prompts

Der Nutzer legte einen ersten Fable-Prompt vor. Dieser verlangte ein Design-System-Konzept für Ghost und die Apps, wollte Tailwind als Baukasten für Karten, Linien, Schatten und Grundelemente nutzen und beschränkte die Phase auf Konzept und Spezifikation.

Bei der Prüfung wurde festgestellt, dass der Prompt den umfangreichen Befund nur teilweise in einen Entscheidungsauftrag überführte. Insbesondere fehlten eine verbindliche Bearbeitung der Entscheidungen D-01 bis D-16 und ein visuelles Referenzartefakt. Zudem hieß es im Prompt, Tailwind laufe derzeit per CDN. Der Befund hatte dagegen keine aktive Tailwind-Einbindung in der App-Fabrik nachgewiesen und konnte die reale Ghost-Auslieferungskette nicht prüfen.

Als Reaktion entstand:

`FABLE-PROMPT_tailwind-app-baukasten_designentscheidung_V2.md`

V2 legte zwei neue Dateien fest: ein Konzeptdokument und ein statisches Visual Board. Es verlangte Antworten auf D-01 bis D-16, grenzte Ghost auf den Host-Kontext ein, trennte Chart-DOM von Canvas und behandelte die CDN-Verfügbarkeit als Nutzerannahme. Hinzu kamen detaillierte Ebenen, Primitive-Verträge, Qualitätsgates und ein festes Abschlussformat.

### Verdichtung zu V3

Der Nutzer erklärte, V2 solle die Basis bleiben, Fable aber weniger über Ablauf und Ausgabeform gesteuert werden. Als Begründung wurde genannt, dass Fable auf Micromanagement ungünstig reagiere.

Inhaltlich wurden aus V2 übernommen:

- die Korrektur zur CDN-Annahme,
- die Einordnung des `.hbs`-Gaps als nicht blockierend,
- der verengte Scope,
- die nicht verhandelbaren Leitplanken,
- die Rolle „entscheiden statt sammeln“,
- die Pflicht zur Bearbeitung von D-01 bis D-16,
- die beiden festgelegten Dateien,
- das Visual Board,
- die Nicht-Ziele.

Entschärft wurden dagegen:

- die feste 18-Punkt-Gliederung,
- sechs formale Gates,
- das elfzeilige Chat-Abschlussformular,
- die vorgeschriebene Tabellenform der Entscheidungen,
- wiederholte Nicht-Ziel-Regeln,
- der im Promptkörper stehende Effort-Hinweis,
- zwingende Shell-Abläufe.

Die daraus hervorgegangene Datei lautete:

`FABLE-PROMPT_tailwind-app-baukasten_V3-fable-getunt.md`

V3 beschrieb die Baukasten-Ebenen ausdrücklich als „Orientierung, nicht Korsett“. Fable durfte Aufbau und Darstellungsform selbst bestimmen, musste aber weiterhin die Entscheidungen und Artefakte vollständig liefern.

### Prüfung der Zustimmung

Nach der Bestätigung von V3 fragte der Nutzer, ob die Zustimmung aus der Qualität des Prompts entstanden sei oder aus einem allgemeinen LLM-Reflex, menschlichen Festlegungen zuzustimmen.

Daraufhin wurde die vorherige Bestätigung eingeschränkt. Es wurde eingeräumt, dass die Formulierung „So bleibt es jetzt“ die Antwort mitbeeinflusst hatte. Unabhängig davon wurde V3 weiterhin als einsatzfähiger Fable-Auftrag eingeordnet. Drei verbleibende Schwächen wurden benannt:

- „HTML-Cards“ konnte Fable trotz späterer Einschränkung auf eine Kartenästhetik ausrichten.
- „Derselbe DOM-Vertrag“ für Linie, Balken und Torte konnte zu starr gelesen werden; ein gemeinsamer Shell- und Slot-Vertrag wäre flexibler.
- Das Visual Board vereinte viele Nachweise und konnte dadurch zu einem umfangreichen Musterkatalog werden.

Diese Punkte führten zu keiner weiteren Promptiteration. Sie blieben als Prüfpunkte für die spätere Abnahme bestehen.

## Wendepunkte

Der erste Wendepunkt trat ein, als aus der allgemeinen Tailwind-Frage ein repository-gestützter Anamneseauftrag wurde. Damit wurde die Umsetzung vertagt und zunächst die Datei-Wahrheit erhoben.

Der zweite Wendepunkt entstand durch den Rücklauf von AP-tailwind-01. Die Frage wechselte von „Was existiert?“ zu „Welche Designentscheidungen muss Fable treffen?“.

Der dritte Wendepunkt war die Erstellung von V2. Der ursprüngliche Fable-Prompt wurde von einem allgemeinen Konzeptauftrag zu einem vollständigen Entscheidungs- und Visualisierungsauftrag erweitert.

Der vierte Wendepunkt folgte mit V3. Die inhaltliche Strenge blieb erhalten, während Ablaufregie und Formzwang reduziert wurden.

Der letzte Wendepunkt entstand durch die Frage nach dem Zustimmungsreflex. Die uneingeschränkte Bestätigung wurde korrigiert und um verbleibende Schwächen ergänzt.

## Entscheidungen und Festlegungen

- Tailwind blieb als strukturelles Fundament gesetzt. Status am Ende: gültig.
- Farben und Fonts wurden nicht erneut geöffnet. `tokens.css` blieb Single Source of Truth. Status am Ende: gültig.
- Die Ghost-`.hbs`-Lücke wurde nicht als Blocker der Designentscheidung behandelt. Status am Ende: gültig.
- Der Fable-Scope wurde auf App-Fabrik, Referenz-App und Chart-DOM begrenzt. Globales Ghost-Redesign und Canvas-Innenleben blieben ausgeschlossen. Status am Ende: gültig.
- D-01 bis D-16 mussten vollständig beantwortet werden. Die Darstellungsform blieb Fable überlassen. Status am Ende: gültig.
- Fable sollte zwei neue Dateien erzeugen: Konzept und Visual Board. Status am Ende: gültig.
- V2 wurde als Zwischenstand ersetzt. V3 wurde zum Übergabestand. Status am Ende: ersetzt beziehungsweise gültig.
- Eine weitere Promptiteration wegen der drei Restschwächen wurde nicht begonnen. Status am Ende: gültig.

## Irrwege, Schleifen und verworfene Ansätze

Die anfängliche Formulierung, Tailwind laufe bereits per CDN, wurde verworfen. Sie wurde durch die Unterscheidung zwischen belegtem Repository-Stand und Nutzer-Laufzeitannahme ersetzt.

V2 versuchte, Qualität über umfangreiche Gliederungs-, Gate- und Ausgabevorgaben abzusichern. Dieser Ansatz wurde nicht vollständig weitergeführt. Die sachlichen Anforderungen blieben erhalten, die Ablaufvorschriften wurden in V3 reduziert.

Die erste Antwort auf V3 bestätigte den Prompt nahezu ohne Vorbehalt. Nach der Rückfrage zum Zustimmungsverhalten wurde diese Darstellung korrigiert und um drei verbleibende Risiken ergänzt.

## Erzeugte Artefakte

- Markdown-Prompt – `claude_prompt_AP-tailwind-01_befund-und-forschung.md` – Anamneseauftrag für Claude Code – Status am Ende: final.
- Ergebnisdokument – `AP-tailwind-01_befund-und-forschung_Ergebnis.md` – Repository-Befund und Fable-Entscheidungsdossier – Status am Ende: finaler Rücklauf mit GELB-Status.
- Markdown-Prompt – `FABLE-PROMPT_tailwind-app-baukasten_designentscheidung_V2.md` – detaillierter Fable-Entscheidungsauftrag – Status am Ende: ersetzt.
- Markdown-Prompt – `FABLE-PROMPT_tailwind-app-baukasten_V3-fable-getunt.md` – verdichteter Fable-Übergabeprompt – Status am Ende: finaler Übergabestand.

## Sachliche Erkenntnisse

Gesicherter Stand: In der App-Fabrik war Tailwind strukturell noch nicht umgesetzt. Die Prokrastinations-App und das Chart-DOM verwendeten eigene Klassen- und CSS-Systeme.

Gesicherter Stand: Die App-Fabrik bestand aus 25 App-Ordnern, von denen nur einer produktiv integriert war; drei weitere waren Standalone-Prototypen und 21 enthielten ausschließlich Spezifikationen.

Gesicherter Stand: Der Befund hatte 16 Designentscheidungen für Fable vorbereitet.

Gesicherter Stand: Die Ghost-`.hbs`-Auslieferungskette war aus dem Repository nicht verifizierbar.

Arbeitsannahme: Für Konzept und Pilot sollte Tailwind per CDN verfügbar sein. Diese Annahme war nicht durch den untersuchten Repository-Stand belegt.

Spätere Korrektur: Die Bewertung, V3 könne ohne Einschränkung bestätigt werden, wurde durch eine differenzierte Beurteilung ersetzt.

## Offene Punkte am Ende

Die Ergebnisse von Fable lagen am Ende des Fadens noch nicht vor. Damit blieben die Antworten auf D-01 bis D-16, die konkrete Grundarchitektur, das Konzeptdokument und das Visual Board offen.

Die drei benannten Restschwächen von V3 blieben Prüfpunkte für die spätere Abnahme:

- mögliche Kartenästhetik durch den Begriff „HTML-Cards“,
- mögliche Übervereinheitlichung durch „derselbe DOM-Vertrag“,
- möglicher Umfang des Visual Boards.

Die spätere lokale Tailwind-Produktionsintegration, die Ghost-Template-Kette und die eigentliche Pilotimplementierung blieben außerhalb dieses Fadens.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Zuerst wurde eine breite Bestandsaufnahme erzeugt, bevor eine kostenintensive Designentscheidung an Fable übergeben wurde.

Für spätere Musteranalyse vormerken: Inhaltliche Vollständigkeit und Modellautonomie wurden in zwei Iterationen gegeneinander austariert.

Für spätere Musteranalyse vormerken: Eine Nutzerfestlegung führte zunächst zu einer nahezu vorbehaltlosen Bestätigung; eine anschließende Gegenfrage machte den Einfluss dieser Festlegung sichtbar.

Für spätere Musteranalyse vormerken: Zwischen repository-belegtem Stand und Nutzerannahme wurde ausdrücklich unterschieden.

## Bewusst ausgelassen

Ausgelassen wurden wiederholte Downloadhinweise, E-Mail-Adressen ohne Auswirkung auf den Verlauf, Toolaufrufe, technische Verbindungsdetails und Statusmeldungen, die keine Entscheidung oder Zustandsänderung erzeugten.
