# App-Fabrik — Pre-Code-Grill / Implementation-Zwischenstand

**Stand:** 2026-05-10  
**Projekt:** Finanzwesir 2.0 — App-Fabrik  
**Pilot-App:** `prokrastinations-preis`  
**Ziel dieses Dokuments:** Zwischenstand sichern, bevor aus den Implementation-Entscheidungen ein offizieller RFC bzw. später ein verbindlicher App-Fabrik-Implementation-Standard wird.

---

## 1. Ausgangslage

Die App-Fabrik soll keine Sammlung von 21 Einzelanfertigungen bauen, sondern eine standardisierte Produktionslinie für interaktive Finanzwesir-Apps.

Zielbild:

> Kennt man eine App, kennt man alle.

Die Apps laufen eingebettet in Ghost.io-Artikelseiten. Redakteure fügen in Ghost HTML-Cards ein. Die App-Logik wird clientseitig im Browser ausgeführt.

Öffentlicher App-Fabrik-Embed-Vertrag für neue Apps:

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis">
</div>
```

Optional später:

```html
<div class="fw-app"
     data-fw-app="risiko-uebersetzer"
     data-fw-options="defaultRate:300, years:30"
     data-fw-data="https://www.finanzwesir.com/content/files/2026/daten.csv"
     data-fw-config="https://www.finanzwesir.com/content/files/2026/config.json">
</div>
```

Wichtige bestehende Regeln:

- Neue Apps nutzen `class="fw-app"` und `data-fw-app`.
- Bestehende Chart-Engine-Charts nutzen weiterhin `class="financial-chart-module"`.
- `data-app` ist für neue Apps nicht der Standard.
- `data-fw-theme` ist reserviert und wird nicht produktiv verwendet.
- `data-fw-options` bleibt einfach: `key:value, key:value`.
- Kein freies JSON direkt in `data-fw-options`.
- Alle `data-*` Attribute gelten als untrusted input.
- Keine externen CDN-Skripte ohne explizite Architekturentscheidung.
- Kein Backend ohne explizite Architekturentscheidung.

---

## 2. Warum dieser Grill-Prozess nötig war

Die APP_SPEC für `prokrastinations-preis` ist fachlich, technisch und dramaturgisch bereits weit entwickelt.

Sie beschreibt unter anderem:

- Nutzerfrage
- Inputs und Outputs
- Config-Strategie
- Ghost-Card-Vertrag
- `data-fw-options`-Whitelist
- State-Modell
- AppContext
- A11y-Vertrag
- Sicherheitsregeln
- Testfälle
- Beweisdramaturgie / Heldenreise
- Spec-Gate-Checkliste

Was jedoch vor der Implementierung noch offen war:

- Wie wird gebaut?
- Mit welchem Tooling?
- Mit welchem Framework oder ohne Framework?
- Wie wird CSS isoliert?
- Wie wird getestet?
- Wo leben Code und Testdateien?
- Wann wird gemeinsamer Core extrahiert?
- Wie wird vertikal gesliced?
- Was davon gilt nur für `prokrastinations-preis`, was für alle Apps?

Diese Fragen dürfen nicht in `/Apps/prokrastinations-preis/APP_SPEC.md` versauern, weil sie alle Apps betreffen.

Sie gehören später in eine zentrale Implementation-Spec, voraussichtlich:

```text
docs/spec/APP-FACTORY-IMPLEMENTATION-STANDARD.md
```

Vorher sinnvoll als RFC:

```text
docs/App-Fabrik/APP_FACTORY_IMPLEMENTATION_RFC.md
```

---

## 3. Alberts technische Zielprinzipien

Albert ist nicht der Programmierer und soll nicht technische Detailentscheidungen erraten müssen.

Albert entscheidet nicht:

- Vite oder Rollup?
- React oder Lit?
- Shadow DOM oder Namespace-CSS?
- Playwright oder manuelle Tests?

Albert entscheidet die Prinzipien:

1. So einfach wie nötig, aber nicht einfacher.
2. Bewährte, zeitgemäße Standards.
3. Nicht dem neuesten Hype hinterherlaufen.
4. Nichts Veraltetes implementieren.
5. Sicherheit und Wartbarkeit vor technischer Eleganz.
6. Geringe Abhängigkeiten.
7. Ghost-kompatibel.
8. Standardisiert für 21 Apps.
9. Später generalisierbar, aber nicht zu früh abstrahiert.

Die technische Übersetzung dieser Prinzipien leistet Claude bzw. der Implementierungsprozess.

---

## 4. Verabschiedete 9 Grundsätze

Diese 9 Grundsätze sind als Arbeitsentscheidung für die App-Fabrik akzeptiert.

### 1. Pilot 1 startet ohne unnötiges Build-System

Für `prokrastinations-preis` wird kein schweres Build-System als Voraussetzung eingeführt.

Das bedeutet:

- Kein Vite/Rollup/Webpack als erste Pflicht.
- Kein Node-Projekt nur um des Node-Projekts willen.
- Lokale Testdatei und normales JavaScript reichen für den ersten Durchstich.
- Ein Build-System kann später eingeführt werden, wenn mehrere Apps, Core-Extraktion oder automatisierte Tests es rechtfertigen.

Begründung:

Die App ist klein, läuft clientseitig und soll zunächst lokal testbar sein. Zusätzliche Build-Komplexität würde in Pilot 1 mehr Risiken erzeugen als Nutzen.

---

### 2. Vanilla JavaScript ist der Default

Für Pilot 1 wird Vanilla JavaScript verwendet.

Kein React.  
Kein Lit.  
Kein Alpine.  
Kein Framework als Standard.

Begründung:

Die App ist ein Ghost-embedded Widget. Sie braucht:

- Bootstrapper
- Parser/Validator
- Berechnungslogik
- AppContext
- Renderer
- A11y-Ausgabe
- Error/Empty-State

Dafür ist kein Framework erforderlich.

Die bestehende Chart-Engine ist ebenfalls 100 % clientseitig und Vanilla-JS-basiert. Dieses Muster ist robust, verständlich und reduziert Abhängigkeiten.

Abweichung nur, wenn mehrere spätere Apps nachweisbar komplexe wiederverwendbare Komponenten brauchen.

---

### 3. Kein Framework ohne nachgewiesenen Bedarf

Ein Framework wird nicht eingeführt, weil es modern oder bequem wirkt.

Ein Framework darf erst geprüft werden, wenn ein echter Bedarf entsteht, zum Beispiel:

- viele wiederverwendbare komplexe UI-Komponenten
- schwer wartbare DOM-Logik trotz Disziplin
- mehrere Apps mit identischer komplexer Interaktionsstruktur
- nach Pilot 2/3 klare Wiederholungsmuster

Vorher gilt:

> Vanilla-first.

---

### 4. CSS-Isolation per `fw-app`-Namespace statt Shadow DOM

Für Pilot 1 wird kein Shadow DOM verwendet.

Stattdessen wird CSS über den `fw-app`-Namespace isoliert.

Beispiel:

```html
<div class="fw-app" data-fw-app="prokrastinations-preis">
  <!-- App-Inhalt -->
</div>
```

App-CSS darf nur innerhalb dieses Containers wirken:

```css
.fw-app {
  /* App-Basis */
}

.fw-app .fw-app__hero {
  /* Hero-Zahl */
}

.fw-app .fw-app__slider {
  /* Slider */
}

.fw-app[data-fw-app="prokrastinations-preis"] .fw-app__hero {
  /* falls app-spezifisch nötig */
}
```

Ziel:

- Die App beschädigt den Artikel nicht.
- Das Ghost-Theme beschädigt die App nicht.
- Styles leaken nicht unkontrolliert in beide Richtungen.
- Die App bleibt trotzdem normal im DOM sichtbar und leicht testbar.

Warum kein Shadow DOM in Pilot 1?

Shadow DOM kapselt stärker, erschwert aber:

- Design-System-Anbindung
- CSS Custom Properties aus dem Ghost-Theme
- Debugging
- A11y-Kontrolle
- einfache lokale Tests

Für Pilot 1 ist Namespace-CSS der bessere Kompromiss.

---

### 5. Theme-Tokens bleiben Design-Wahrheit

Es gibt keine Farb- und Font-Tabellen pro App.

Die zentrale Wahrheit liegt im Ghost-Theme bzw. in `screen.css`.

Zielbild:

```css
:root {
  --fw-app-color-primary: var(--color-petrol);
  --fw-app-color-text: var(--color-text);
  --fw-app-color-surface: var(--color-surface);
  --fw-app-font-body: var(--font-body);
  --fw-app-font-heading: var(--font-heading);
  --fw-space-sm: ...;
  --fw-space-md: ...;
  --fw-radius-md: ...;
}
```

Apps nutzen nur semantische Tokens:

```css
.fw-app__hero-value {
  color: var(--fw-app-color-primary);
  font-family: var(--fw-app-font-heading);
}
```

Apps hardcoden nicht:

```css
color: #0071BF;
font-family: "Irgendein Font";
```

Das bedeutet:

- CI-Farben und Fonts werden zentral gemappt.
- Änderungen an CI-Werten passieren einmal im Theme.
- Apps konsumieren nur die semantischen Token.
- Keine 21 parallelen Farbsysteme.

Wenn eine App einen neuen Designwert braucht, wird dieser zentral ergänzt, nicht lokal versteckt.

---

### 6. Tests starten manuell, E2E-Automation nach Pilot-Erfahrung

Für Pilot 1 wird so getestet wie bisher bei der Chart-Engine:

1. Claude baut eine lokale Testdatei.
2. Die Testdatei läuft über den VSCode-Server.
3. URL zum Beispiel:

```text
http://127.0.0.1:5500/Apps/prokrastinations-preis/app.test.html
```

4. In dieser HTML-Datei stehen verschiedene Ghost-HTML-Cards:

```html
<h2>Minimal-Card</h2>
<div class="fw-app" data-fw-app="prokrastinations-preis"></div>

<h2>Card mit Optionen</h2>
<div class="fw-app"
     data-fw-app="prokrastinations-preis"
     data-fw-options="defaultRate:500, years:20">
</div>

<h2>Ungültiger Slug</h2>
<div class="fw-app" data-fw-app="gibt-es-nicht"></div>
```

Albert testet manuell im Browser:

- Lädt die App?
- Sehe ich die Hauptzahl?
- Funktionieren die Slider?
- Bleibt die Renditeannahme sichtbar?
- Gibt es keinen horizontalen Scrollbalken auf Mobile?
- Kommt bei falschem Slug eine saubere Fehlermeldung?

E2E-Automation mit Playwright oder ähnlichem wird später geprüft.

Nicht jetzt.

Warum?

Ein automatisierter Test-Runner bringt neue Infrastruktur:

- Node
- Test-Runner
- Konfigurationsdateien
- ggf. Build-System
- Wartung der Tests

Das ist sinnvoll, aber erst nach Pilot-Erfahrung.

---

### 7. Core wird nicht vor Pilot 2 extrahiert

Kein gemeinsamer `fw-app-core` vor der ersten validierten App.

Für Pilot 1 gilt:

- App-lokal bauen.
- Wiederholungsmuster markieren.
- Extract-Kandidaten notieren.
- Nach Pilot 2 prüfen, was wirklich gemeinsam ist.

Warum?

Zu frühe Abstraktion ist gefährlich.

Man weiß noch nicht, welche Teile wirklich für mehrere App-Familien gleich sind:

- Calculator
- Scenario Chart
- Quiz
- Explorer
- Dashboard
- Companion-Modul

Ein falsch gebauter Core zentralisiert Fehler und bremst alle Apps.

Trotzdem sofort standardisiert:

- Ghost-Card-Vertrag
- SafeDOM
- `data-fw-options`-Parsing-Prinzip
- AppContext
- State-Modell
- A11y-Kontrakt
- CSS-Namespace

---

### 8. Implementierung erfolgt in Vertical Slices

Die App-Fabrik wird nicht horizontal implementiert.

Nicht:

- erst Core
- erst CSS-System
- erst alle Komponenten
- erst alle Tests
- dann irgendwann eine App

Sondern:

> Jeder Implementierungsschritt liefert einen kleinen, vollständigen, testbaren Durchstich durch die App.

Ein Slice läuft durch relevante Schichten:

```text
Ghost-Card
→ Bootstrap
→ Config
→ Parsing / Validation
→ AppData
→ Strategy
→ AppContext
→ Renderer
→ UI
→ A11y
→ Test
```

Ein Slice ist fertig, wenn er:

- sichtbar ist
- bedienbar ist
- testbar ist
- einen kleinen Nutzer- oder Erkenntniswert liefert
- Sicherheits- und A11y-Regeln nicht verletzt

---

### 9. Ghost-Redakteur bekommt weiterhin nur Minimal-Cards

Der Redakteur soll nicht mit App-Technik belastet werden.

Der Standard bleibt:

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis">
</div>
```

Optional kleine Overrides:

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis"
     data-fw-options="defaultRate:500, years:20">
</div>
```

Der Redakteur soll nicht:

- JSON inline schreiben
- Scripts einfügen
- CSS einfügen
- technische Config-Dateien direkt pflegen
- App-Templates kopieren
- App-Logik verstehen müssen

Die App-Fabrik und das Theme tragen die Komplexität, nicht der Redakteur.

---

## 5. Vertical Slicing — App-Fabrik-Definition

### Grundsatz

Vertical Slicing bedeutet in der App-Fabrik:

> Jeder Implementierungsschritt liefert einen kleinen, echten, testbaren Durchstich von Ghost-Card bis sichtbarer UI.

Ein Slice ist kein Technikpaket.

Kein gültiger Slice:

- „Slider-Komponente bauen“
- „CSS-System bauen“
- „Core bauen“
- „Parser bauen“

Gültiger Slice:

- „Minimal-Card lädt und zeigt einen sauberen Error-State bei falschem Slug“
- „Default-Berechnung zeigt die Hauptzahl und A11y-Summary“
- „Wartezeit-Slider verändert den Prokrastinations-Preis live“

### Pflicht je Slice

Jeder Slice beschreibt:

- Ziel
- Nutzerwert / Erkenntniswert
- betroffene Layer
- geänderte Dateien
- Akzeptanzkriterien
- Testfälle
- Nicht-Ziele
- Risiken

### Anti-Pattern

Verboten als eigenständige Implementierungsphasen:

- erst alle UI-Komponenten bauen
- erst kompletten Core bauen
- erst CSS-System bauen
- erst alle Tests bauen
- erst vollständige Architektur bauen

Diese Arbeiten sind erlaubt, wenn sie für einen konkreten Slice nötig sind.

---

## 6. Empfohlener Slice-Plan für `prokrastinations-preis`

### Slice 0 — App-Shell lädt

**Ziel:**  
App-Container wird erkannt, Slug wird geprüft, States funktionieren grundsätzlich.

**Nutzerwert:**  
Kein leerer Container. Redakteur/Tester sieht, ob die App grundsätzlich lädt.

**Layer:**  
Ghost-Card → Bootstrap → State → Renderer.

**Dateien:**

```text
/Apps/prokrastinations-preis/app.test.html
/Apps/prokrastinations-preis/app.js
```

**Akzeptanzkriterien:**

- Minimal-Card lädt.
- Ungültiger Slug zeigt sauberen Error-State.
- Kein Stacktrace für Endnutzer.
- Kein leerer weißer Container.
- Keine produktiven Änderungen außerhalb des App-Ordners.

**Nicht-Ziele:**

- Keine Berechnung.
- Keine Slider.
- Kein Design-Finish.

---

### Slice 1 — Hauptzahl aus Defaults

**Ziel:**  
Default-Config, Berechnung, AppContext, Hero-Zahl und A11y-Summary funktionieren.

**Nutzerwert:**  
Der Nutzer sieht erstmals den Preis des Wartens.

**Layer:**  
Config → Parser/Validator → AppData → Strategy → AppContext → Renderer → UI → A11y.

**Akzeptanzkriterien:**

- Hauptzahl sichtbar: „Warten kostet dich etwa X €“.
- Berechnung nutzt monatliche Rendite aus Jahresrendite.
- AppContext enthält reine Zahlen.
- Ergebnis wird formatiert, aber Berechnung bleibt einheitenfrei.
- A11y-Summary ist im DOM.
- Keine Sliderbewegung nötig.

**Nicht-Ziele:**

- Keine vollständige Interaktivität.
- Keine Nebenwerte.
- Kein Vergleichsanker.

---

### Slice 2 — Wartezeit-Slider

**Ziel:**  
Der primäre interaktive Beweis funktioniert.

**Nutzerwert:**  
Der Nutzer spürt: Wartezeit verändert den Eurobetrag sofort.

**Layer:**  
UI → Event → Validation/Clamp → Strategy → AppContext → Renderer → LiveCounter → A11y.

**Akzeptanzkriterien:**

- Wartezeit-Slider steht zuerst.
- Hauptzahl aktualisiert sich sofort.
- LiveCounter unterstützt, aber dominiert nicht als Showeffekt.
- `prefers-reduced-motion` wird respektiert.
- A11y Live Region wird nicht gespammt.

**Nicht-Ziele:**

- Noch keine vollständige Feinpolitur.
- Noch keine Chart-Integration.

---

### Slice 3 — Monatsrate und Anlagedauer

**Ziel:**  
Alle drei Slider funktionieren zusammen.

**Nutzerwert:**  
Nutzer kann eigene Situation grob annähern.

**Akzeptanzkriterien:**

- Monatsrate funktioniert.
- Anlagedauer funktioniert.
- Clamp-Regeln verhindern unmögliche Zustände.
- Kein Empty-State durch normale Sliderbedienung.
- Layout springt nicht stark.

---

### Slice 4 — Wahrheitsschicht / AssumptionsBox

**Ziel:**  
Die App bleibt ehrlich.

**Nutzerwert:**  
Nutzer sieht die Annahmen, ohne Kleingedrucktes suchen zu müssen.

**Akzeptanzkriterien:**

- Erste Zeile der AssumptionsBox ist immer sichtbar.
- Pflichtzeile:

```text
Annahme: 7 % p.a. nominal — historischer MSCI-World-Durchschnitt. Nicht garantiert.
```

- Weitere Hinweise dürfen expandierbar sein:
  - Inflation nicht eingerechnet.
  - Real wären die Beträge niedriger.
  - Keine Finanzberatung.
  - Vergangenheitsrenditen sagen nichts über die Zukunft.

**Nicht-Ziele:**

- Keine Realrechnung.
- Keine zweite Renditeannahme.
- Keine Inflationsrate.

---

### Slice 5 — Nebenwerte und Vergleichsanker

**Ziel:**  
Die Hauptzahl wird erklärbar, ohne Konkurrenz zu bekommen.

**Nutzerwert:**  
Nutzer versteht, woher die Zahl kommt.

**Neben-KPIs:**

1. `endwertSofort` — „Bei sofortigem Start“
2. `endwertSpaeter` — „Bei {N} Jahren Wartezeit“
3. `verloreneEinzahlungen` — „Nicht eingezahlte Beiträge“

**Optionaler Vergleichsanker:**

```text
Das entspricht etwa {vergleichsAnker} Monatsraten à {monatlicheRate}.
```

Berechnung:

```js
vergleichsAnker = Math.round(prokrastinationsPreis / monatlicheRate)
```

**Akzeptanzkriterien:**

- Nebenwerte erklären, konkurrieren aber nicht.
- Keine zweite dominante Zahl.
- Positiv zuerst rahmen.
- Vergleichsanker ist Kontext, nicht Haupt-KPI.

---

### Slice 6 — Responsive und A11y-Härtung

**Ziel:**  
Die App funktioniert auf realen Geräten und mit Assistive Technology.

**Akzeptanzkriterien:**

- Mobile 375px ohne horizontalen Overflow.
- Tablet 768px lesbar.
- Desktop 1280px sauber.
- Tastaturbedienung funktioniert.
- Slider haben sinnvolle Labels und `aria-valuetext`.
- `prefers-reduced-motion` deaktiviert Animationen.
- Kontrast erfüllt WCAG-AA.
- Live Region funktioniert.

---

### Slice 7 — Testseite und QA-Abschluss

**Ziel:**  
Albert kann die App ohne Code-Lesen testen.

**Datei:**

```text
/Apps/prokrastinations-preis/app.test.html
```

**Test-Cards:**

- Minimal-Card
- Card mit `data-fw-options`
- ungültiger Slug
- ungültige Optionswerte
- XSS-Versuch in Optionswert
- Mobile-Testhinweise
- A11y-Testhinweise

**Akzeptanzkriterien:**

- Alle APP_SPEC-Testfälle T-01 bis T-25 sind manuell prüfbar.
- Testseite läuft lokal über `127.0.0.1`.
- Testseite simuliert Ghost-HTML-Cards realistisch.

---

## 7. CSS- und Design-System-Vertrag

### Zentrale Design-Wahrheit

Die zentrale Wahrheit liegt im Ghost-Theme bzw. in `screen.css`.

Die Apps definieren nicht ihre eigene CI.

Es gibt keine Tabellen pro App.

Stattdessen:

```text
CI / Ghost Theme
→ zentrale CSS Custom Properties
→ App-semantische Tokens
→ App-CSS konsumiert Tokens
```

### Beispiel

Theme-Rohwerte:

```css
:root {
  --color-petrol: #005f73;
  --color-text: #1f2933;
  --font-body: system-ui, sans-serif;
  --font-heading: system-ui, sans-serif;
}
```

App-semantische Tokens:

```css
:root {
  --fw-app-color-primary: var(--color-petrol);
  --fw-app-color-text: var(--color-text);
  --fw-app-font-body: var(--font-body);
  --fw-app-font-heading: var(--font-heading);
}
```

App-Nutzung:

```css
.fw-app__hero-value {
  color: var(--fw-app-color-primary);
  font-family: var(--fw-app-font-heading);
}
```

### Regeln

Apps dürfen:

- Layout definieren
- Komponentenstruktur definieren
- responsive Verhalten definieren
- semantische Tokens nutzen

Apps dürfen nicht:

- Hex-Werte hardcoden
- eigene Fonts setzen
- eigene CI erfinden
- eigene Farbbedeutungen pro App definieren
- globale Artikel-Styles überschreiben

Wenn ein neuer Designwert nötig ist, wird er zentral ergänzt.

---

## 8. Teststrategie — praktische Bedeutung für Albert

Der Pilot-Test entspricht dem bisherigen Chart-Engine-Modell.

Bisher:

```text
Lokale HTML-Datei
→ läuft über VSCode-Server
→ enthält HTML-Card
→ JavaScript liest Card
→ Chart entsteht
→ Albert prüft im Browser
```

Neu für App-Fabrik:

```text
app.test.html
→ läuft über VSCode-Server
→ enthält fw-app HTML-Cards
→ JavaScript liest Cards
→ App entsteht
→ Albert prüft im Browser
```

Der zentrale Unterschied:

Chart-Engine:

```html
<div class="financial-chart-module" ...></div>
```

App-Fabrik:

```html
<div class="fw-app" data-fw-app="prokrastinations-preis"></div>
```

Das Testprinzip bleibt gleich.

---

## 9. Offene Blocker und Nicht-Blocker

### Kein Blocker für lokale Slice-0/1-Implementierung

Nach den verabschiedeten Grundsätzen gibt es für lokale Implementierung von Slice 0 und Slice 1 keinen harten Blocker.

### Blocker vor echtem Ghost-Deployment

Noch zu klären:

```text
Wie lädt Ghost bzw. das Theme das App-JS?
```

Mögliche Varianten:

- globaler Bootstrapper im Theme
- app-spezifisches Asset pro Artikel
- gebündeltes App-Fabrik-JS

Diese Entscheidung ist für lokale Testdateien nicht nötig, aber vor echtem Produktions-Embed.

### Nicht-Blocker

Diese Themen sind bewusst später:

- Vite
- Rollup
- Playwright
- Vitest
- gemeinsamer `fw-app-core`
- Shadow DOM
- ChartAdapter/API
- externe `data-fw-config`
- NumericInput
- Share-Feature
- Chart in `prokrastinations-preis`

---

## 10. Was Albert wirklich entscheiden muss

Albert entscheidet Prinzipien, keine Technikdetails.

Bestätigt sind:

1. Pilot 1 ohne unnötiges Build-System.
2. Vanilla JS als Default.
3. Kein Framework ohne Bedarf.
4. CSS-Isolation per `fw-app`-Namespace statt Shadow DOM.
5. Theme-Tokens bleiben Design-Wahrheit.
6. Tests starten manuell mit lokaler HTML-Testseite.
7. Core wird nicht vor Pilot 2 extrahiert.
8. Implementierung erfolgt in Vertical Slices.
9. Ghost-Redakteur bekommt weiterhin nur Minimal-Cards.

Albert muss nicht entscheiden:

- Vite oder Rollup
- React oder Lit
- Playwright jetzt oder später
- Shadow DOM intern ja/nein
- genaue Funktionsnamen
- genaue DOM-Struktur
- genaue Modulaufteilung in `app.js`

---

## 11. Was Claude / Entwickler fachlich entscheiden darf

Claude darf innerhalb dieser Leitplanken entscheiden:

- Funktionsnamen
- app-lokale Modulstruktur
- konkrete DOM-Struktur
- konkrete CSS-Klassennamen im `fw-app` Namespace
- Reihenfolge kleiner Hilfsfunktionen
- Aufbau der Testseite
- Berechnungsfunktion
- Formatierungsfunktion
- interne Organisation von State und Renderer

Claude darf nicht still entscheiden:

- neues Framework
- neues Build-System als Standard
- Shadow DOM
- externe Config als Pilot-Pflicht
- Chart-Engine-Refactoring
- shared Core vor Pilot-Freigabe
- externe CDN-Abhängigkeit
- Änderung des Ghost-Card-Vertrags
- Änderung zentraler Interface-Specs ohne Gate

---

## 12. Nächster sinnvoller Schritt

Aus diesem Zwischenstand sollte ein RFC entstehen:

```text
docs/App-Fabrik/APP_FACTORY_IMPLEMENTATION_RFC.md
```

Der RFC dokumentiert:

- Build-/Framework-Entscheidung
- CSS-Isolation
- Design-System-Anbindung
- Teststrategie
- Code-Ablage
- Core-vs-app-lokal
- Ghost-Deployment
- Vertical Slicing
- Slice-Plan für `prokrastinations-preis`

Nach Review und Freigabe kann daraus später eine verbindliche Spec werden:

```text
docs/spec/APP-FACTORY-IMPLEMENTATION-STANDARD.md
```

Erst danach:

1. Spec-Gate für `prokrastinations-preis`
2. Pre-Code-Gate
3. Vertical-Slice-Implementierung
4. Slice 0
5. Slice 1
6. weitere Slices

---

## 13. Kurzes Fazit

Der Implementation-Grill hat die technische Richtung geklärt:

```text
Einfach starten.
Vanilla JS.
Lokale Testseite.
Namespace-CSS.
Zentrale Theme-Tokens.
Keine frühe Core-Abstraktion.
Vertical Slicing.
Redakteur bleibt geschützt.
```

Damit passt die Umsetzung zur App-Fabrik-Idee:

> robust, sicher, wiederholbar, verständlich — und erst dann abstrahieren, wenn echte Wiederholung bewiesen ist.
