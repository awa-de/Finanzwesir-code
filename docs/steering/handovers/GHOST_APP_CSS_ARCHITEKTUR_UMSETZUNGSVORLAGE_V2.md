# Ghost-App-CSS-Architektur V2: konsolidierte Umsetzungsgrundlage

**Stand:** 2026-07-22 (formalisiert: D-CSS-01–04, Fallback-Ist-Beschreibung, bare Importform, Browser-Download-Präzisierung, P3 tokens.css offen)  
**Status:** Fachlich konsolidierte Entscheidungsvorlage nach unabhängigem Peer Review. Vor dem Code-AP ist nur die Wahl in Abschnitt 5 formell freizugeben.  
**Geltung:** Erste normale App `prokrastinations-preis`; Wiederholungsregel für weitere Ghost-Apps.  
**Nicht im Scope:** Datenvertrag, Parser, Vault, Resolver, Bootstrapper, Chart-Engine, Chart-Plugins, Preflight-Gesamtaudit und Ghost-HTML-Card-Vertrag.

---

## 1. Ergebnis in einem Satz

Die sichtbaren Fehler entstehen aus drei unabhängig belegten Ursachen: fehlende ausgelieferte App-Mechanik-CSS, ungeschützte Ghost-Artikelregeln außerhalb der Tailwind-Layer und ein veralteter Tailwind-Quellpfad. Die kleinste tragfähige Reparatur ist ein einziger Theme-CSS-Build mit lokaler App-Mechanik als Theme-Quelle, einer Ausnahme an den Ghost-Regeln selbst und einer allgemeinen `@source`-Quelle für alle App-Runtimes.

---

## 2. Verbindliches Modell

```text
Chart = App
Chart-App kann von anderen Apps aufgerufen werden
```

Die Chart-App und normale Apps unterscheiden sich nicht in ihrer Zugehörigkeit zur App-Familie, sondern in ihrem fachlichen Auftrag:

```text
Chart-App
  ├─ Daten → fwContext → Chart-Renderer → Canvas/Chart-DOM
  └─ wird bei Bedarf von einer anderen App aufgerufen

Normale App
  ├─ Eingabe/Daten → eingefrorener AppContext → App-Renderer → Screen-DOM
  └─ ruft für Diagramme die Chart-App über ihren bestehenden Vertrag auf
```

Jede App besitzt damit eine Renderer-Verantwortlichkeit. Nicht jede App braucht dafür eine kopierte Klasse `FwRenderer` oder eine globale `FwAppRenderer`-Fabrik. In `prokrastinations-preis.js` bilden die bestehenden zusammengehörigen `render…()`-Funktionen diese Grenze bereits ausreichend. Eine allgemeine Renderer-Abstraktion ist erst bei einem nachgewiesenen, identischen Bedarf von mindestens zwei normalen Apps zulässig.

Chart.js-Plugins bleiben Canvas-/Chart-Mechanik. Der Kartenflug, der KPI-Reveal und das Rubikon-Overlay bleiben App-DOM-Mechanik; sie gehören weder in ein Chart-Plugin noch in den Rucksack.

---

## 3. Korrigierte Ursache-Wirkungs-Karte

| Symptom | Nachgewiesene Ursache | Zuständiger Fix |
|---|---|---|
| Kartenflug erscheint statisch und verschwindet | `.fw-app__station-area--flight-*` wird vom JS gesetzt, aber nur die alte `Apps/.../app.css` enthält Position/Transition/Transform | lokale App-Mechanik im Theme ausliefern |
| KPI erscheinen ohne Einblenden | JS setzt `fw-app__screen3-reveal--visible`, aber die Opacity-/Transition-Regeln fehlen im Theme | lokale App-Mechanik im Theme ausliefern |
| Rubikon-Text steht unter dem Chart | DOM wird aufgebaut, aber `position: relative/absolute` der App-Mechanik fehlt | lokale App-Mechanik im Theme ausliefern |
| Archivo Black, Absatzlücken, blaue unterstrichene CTA | `.gh-content`-Regeln sind ungelayert; Tailwind-Utilities sind gelayert | Ghost-Regeln am Ursprung vom `.fw-app`-Teilbaum ausnehmen |
| nativer grauer Button-Rand und Systemschrift | kein Tailwind-Preflight; Button-Rezepte enthalten weder `border-0` noch `font-body` | bestehendes Button-Rezept ergänzen, Preflight unverändert lassen |
| nächster CSS-Build würde App-Layout still zerlegen | `@source` zeigt auf die gelöschte frühere `Apps/.../app.js`, nicht auf die Theme-Runtime | allgemeine reale Quelle `Theme/assets/js/apps/` eintragen |

### Kaskadenregel, die künftig maßgeblich ist

Die bisherige Erklärung „`.gh-content` gewinnt wegen höherer Spezifität“ reicht nicht.

```text
Tailwind-Utilities: benannter Cascade Layer `utilities`
Ghost-Artikelregeln: ungelayerte Autorenregeln

Normale ungelayerte Autorenregeln gewinnen gegen normale gelayerte Autorenregeln,
unabhängig von Spezifität und Reihenfolge.
```

`!important` könnte diese Reihenfolge technisch umdrehen, ist aber keine zulässige Architekturantwort: Es erzeugte eine schwer wartbare Gegenregel-Schlacht. Deshalb werden die Ghost-Regeln nicht durch neue App-Gegenregeln überstimmt, sondern an ihrer Quelle vom App-Teilbaum ausgenommen.

---

## 4. Zielstruktur

```text
Theme/assets/css/tokens.css
  └─ einzige Quelle für Farben, Fonts, Schatten

Theme/src/css/screen.source.css
  ├─ Theme- und Ghost-Artikelregeln
  ├─ @source für alle realen App-Runtimes
  └─ Import der lokalen App-Mechanikquellen

Theme/src/css/apps/prokrastinations-preis.css
  └─ nur Fachmechanik dieser App:
     Kartenflug, KPI-Reveal, Rubikon-Overlay,
     zugehörige Breakpoints, lokale Timing-Variablen,
     Übergangsrest Screen-Subline und Fokusregel

Theme/assets/js/apps/prokrastinations-preis.js
  ├─ App-Renderer/Controller, Daten- und Screenlogik
  ├─ literale Tailwind-Klassenrezepte für gemeinsame Primitiven
  └─ lokale Shell-Klasse `fw-app--prokrastinations-preis`

Theme/assets/css/screen.css
  └─ einziges gebautes, lokal ausgeliefertes CSS-Artefakt
```

### Was global ist – und was nicht

| Ebene | Inhalt | Reichweite |
|---|---|---|
| `tokens.css` | Werte, keine Fachkomposition | ganzes Theme, Chart-App, normale Apps |
| Tailwind-Utility-Pool | gemeinsame, aus realen Quellen extrahierte Klassen | ganzes Theme; jede Utility nur einmal |
| `.gh-content`-Ausnahme | Schutz der App gegen Editorial-CSS | nur Elemente innerhalb einer `.fw-app` |
| `apps/{slug}.css` | nicht verallgemeinerbare App-Mechanik | nur eine App-Wurzel |
| Chart-Renderer-Fallback | ungelayerte, produktiv wirksame Spiegel-CSS mit Paritätspflicht (Übergangsoption C, → D-CSS-01) | jede Seite mit geladener Chart-Engine; unverändert |

Die Chart-App erhält keinen Sonderstatus als App. Ihr CSS-Fallback (`FwRenderer._injectStyles()`) läuft heute unbedingt auf jeder Seite mit geladener Chart-Engine — auch produktiv auf Ghost-Post-/Page-Seiten, nicht nur auf Tailwind-freien Testseiten. Ungelayert gewinnt er dort gegen die gelayerten Tailwind-Chrome-Utilities, wo beide dieselbe Eigenschaft setzen; die Optik stimmt heute durch handgepflegte Parität. Diese Parität ist ab jetzt ausdrücklich Pflicht, nicht optional. Die Begrenzung des Fallbacks auf Tailwind-freie Engine-Testumgebungen (Option A) ist Zielzustand eines späteren, separaten Engine-DOM-APs — nicht der heutige Ist-Zustand. Normale Apps haben bereits den kanonischen Theme-Build; sie brauchen deshalb keinen zweiten CSS-Injektionsweg.

---

## 5. Formelle Auswahl: Mechanik-Auslieferung

### Beschlussvorlage: Option B freigeben

**Option B – vorhandenen Theme-Build nutzen (empfohlen):**

```text
Apps/prokrastinations-preis/app.css
        ↓ einmalig, ohne zweite Wahrheit
Theme/src/css/apps/prokrastinations-preis.css
        ↓ @import
Theme/src/css/screen.source.css
        ↓ npm run css:build
Theme/assets/css/screen.css
```

Warum Option B:

- ein vorhandener, kanonischer Build statt eines neuen Style-Injektionsmechanismus;
- ein CSS-Artefakt und ein Theme-Deployment-Weg;
- App-Mechanik ist im gebauten Artefakt maschinell auffindbar;
- keine CSS-URL aus HTML-Card oder Datenattribut;
- die alte App-Datei kann keine zweite aktuelle Wahrheit bleiben;
- die Chart-App wird nicht dupliziert oder verändert.

Die Pilotdatei hat heute 8.426 Byte Quell-CSS inklusive Kommentare. Ihre tatsächliche ausgelieferte Größe wird nach dem kanonischen Minify-Build gemessen und je Migration protokolliert. Vor einem belegten Größenproblem wird kein CSS-Splitting oder Loader eingeführt.

**Option A – statisches CSS-Literal per JavaScript einfügen:** technisch sicherheitskonform und am Chart-Renderer orientiert, aber nicht gewählt: Es wäre ein zusätzlicher Mechanismus neben dem bestehenden Theme-Build und erschwert die Prüfung im Build-Artefakt. Diese Option bleibt nur eine spätere, messungsbasierte Alternative.

---

## 6. Konkrete Bauform

### 6.1 Ghost-Hostgrenze: Ausnahme an der Quelle

Die folgenden Regelgruppen in `screen.source.css` werden vom App-Teilbaum ausgenommen:

```css
.gh-content h1:not(.fw-app *),
.gh-content h2:not(.fw-app *) { ... }

.gh-content h3:not(.fw-app *),
.gh-content h4:not(.fw-app *),
.gh-content h5:not(.fw-app *) { ... }

.gh-content p:not(.fw-app *) { ... }

.gh-content a:not(.fw-app *),
.gh-content a:hover:not(.fw-app *) { ... }
```

Die produktive Umsetzung muss den tatsächlichen bestehenden Selektorblock semantisch erhalten: ausschließlich die App-Ausnahme kommt hinzu. Ein Kommentar unmittelbar am Block hält fest:

> Jede neue `.gh-content`-Textregel muss denselben `.fw-app`-Ausschluss erhalten, sofern sie dynamischen App-DOM treffen könnte.

Damit bleiben Editorial-Inhalte außerhalb von `.fw-app` und der bestehende Chart-Host unverändert. Es gibt keine unlayerte App-Gegenregel, die versehentlich eigene Tailwind-Utilities wie `text-white` oder `no-underline` übersteuert.

### 6.2 Lokale App-Wurzel und Mechanik-Namensraum

Die Shell der Prokrastinations-App trägt als Literal:

```text
fw-app fw-app--prokrastinations-preis
```

Der Bootstrapper erzeugt diese Klasse nicht aus dem Slug. Dadurch bleibt die Registry-/Literal-Sicherheitsregel unverändert.

Die lokale Mechanikdatei begrenzt ihre Selektoren auf diese Wurzel:

```css
.fw-app--prokrastinations-preis .fw-app__station-area--flight-clone { ... }
.fw-app--prokrastinations-preis .fw-app__rubikon-text { ... }
```

`--fw-card-to-point-flight-duration`, `--fw-screen3-reveal-fade-duration` und die Rubikon-Variablen bleiben lokale CSS-Mechanikwerte. Sie liegen nicht im `AppContext` und nicht im Chart-Rucksack.

### 6.3 Button-Basis ohne Preflight

Der Baukastenvertrag für normale App-Buttons erhält in seinem bestehenden Literalrezept folgende Basis:

```text
appearance-none border-0 font-body
```

Für den aktuellen Piloten:

- Primary-/Journey-Buttons: `appearance-none border-0 font-body` ergänzen.
- Secondary-Button: `appearance-none font-body`; sein sichtbarer `border border-border` bleibt fachlich gewollt.
- Link-CTA erhält keine Button-Normalisierung; nach der Ghost-Ausnahme greifen ihre bestehenden Tailwind-Rezepte wieder korrekt.
- Vorhandene `focus-visible:`-Klassen bleiben unverändert, damit Tastaturfokus sichtbar bleibt.

Dies ist kein neues Komponentenframework. Es ist eine verbindliche Ergänzung des bestehenden Button-Primitivs; künftige Apps übernehmen das Literalrezept aus dem Baukasten.

### 6.4 Tailwind-Quellenliste

Die veraltete Zeile für die gelöschte App-Datei wird ersetzt durch genau eine reale Ordnerquelle:

```css
@source "../../assets/js/apps";
```

Damit enthält der nächste Build die Tailwind-Utilities aller statisch importierten und später hinzukommenden App-Runtimes. Ohne diese Änderung darf kein CSS-Build und kein daraus gebautes Theme-ZIP erzeugt werden.

### 6.5 Importform für lokale Mechanikquellen und Browser-Downloads

Lokale Mechanikquellen (z. B. `Theme/src/css/apps/prokrastinations-preis.css`) werden ausschließlich mit der **baren** Importform eingebunden:

```css
@import "./apps/prokrastinations-preis.css";
```

**Nicht** zulässig ist die URL-Form (`@import url("…");`) für diese Quellen. Der Build-Nachweis ist der Selektor-Grep der Mechanik-Klassen im gebauten Artefakt `Theme/assets/css/screen.css`.

**Präzisierung zur Anzahl Browser-Downloads:** Die Aussage „kein zweiter Browser-Download" gilt ausschließlich für lokale Mechanikquellen, die mit der baren Importform eingebunden sind — nur diese Form wird vom Compiler in das Artefakt inliniert. Sie ist keine allgemeine Aussage über jeden `@import` im Theme.

**Offen, hier nicht entschieden (P3):** Ob `tokens.css` künftig ebenfalls inliniert oder als zweites Runtime-Artefakt legalisiert wird, bleibt eine separate, offene Entscheidung. Diese Vorlage trifft dazu keine Aussage und deutet den heutigen Zustand nicht um.

Übergangsoption C (→ D-CSS-01) blockiert die separate Prokrastinations-CSS-Reparatur nicht — beide sind unabhängig voneinander umsetzbar.

---

## 7. Verbindliche Migrationsregel ab jetzt

Eine App-Runtime gilt erst als ins Theme migriert, wenn alle vier Nachweise vorliegen:

1. Jede von ihr gesetzte Nicht-Tailwind-Klasse und jede gelesene lokale `--fw-*`-Property ist in einer vom Theme ausgelieferten CSS-Quelle definiert.
2. Die Tailwind-`@source`-Liste umfasst die reale Runtime; ein frischer kanonischer Build enthält alle dort verwendeten Tailwind-Utilities.
3. Die CSS-Mechanik ist auf eine literale App-Wurzel (`.fw-app--{slug}`) begrenzt; `Apps/{slug}` enthält keine zweite aktuelle CSS-Wahrheit.
4. Die sichtbare Abnahme erfolgt in Ghost-naher Umgebung: Artikelkontext, produktives `screen.css`, kein Play-CDN.

`app.test.html` bleibt ein schneller App-/DOM-Test. Sie ersetzt die Ghost-nahe Sichtabnahme nicht.

---

## 8. Minimaler Code-AP nach Freigabe von Option B

### Erlaubter Write-Scope

1. `Theme/src/css/screen.source.css`
2. `Theme/src/css/apps/prokrastinations-preis.css` (neu)
3. `Theme/assets/js/apps/prokrastinations-preis.js`
4. `Apps/prokrastinations-preis/app.test.html`
5. `docs/steering/handovers/MIGRATIONSSTRATEGIE_GHOST_APPS_V2_CHART_BLAUPAUSE.md`
6. `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` (nur Button-Basisrezept und CSS-Migrationsregel, falls dort die aktuelle Regel fehlt)
7. `Theme/assets/css/screen.css` ausschließlich als Ergebnis von `npm run css:build`

### Nicht erlaubt

- Kein Preflight.
- Kein CSS-/Style-URL-Attribut in HTML-Cards.
- Kein dynamischer Import, keine zusätzliche Registry, kein Manifest, kein Loader.
- Kein `FwAppRenderer`.
- Keine Änderungen an Chart-Engine, Chart-Plugins, Parsern, Resolvern, Vaults, Bootstrapper oder Datenfeeds.
- Keine Änderung an Ghost-HTML-Card.

### Abnahme

Maschinell:

1. Jede `@source`-Angabe zeigt auf eine existierende Quelle.
2. Der frische Build enthält eine Stichprobe der bislang app-exklusiven Utilities, etwa `accent-primary`, `basis-36` und `min-w-[7ch]`.
3. Der Build enthält die drei Mechanik-Selektorgruppen Flight, Reveal und Rubikon.
4. `git diff --check` ist grün; vorhandene Parser-/Resolver-/Bootstrapper-Tests bleiben grün.
5. Testseiten-Manifest ist zu den geänderten `FW_*_CLASS`-Konstanten mengengleich.

Manuell in lokalem Ghost:

1. Alle sieben ursprünglichen Symptome sind behoben.
2. Button-Text nutzt Source Sans Pro; primäre Buttons haben keinen nativen grauen Rand; Secondary behält seine gewollte Kontur.
3. Tastaturfokus ist sichtbar auf Buttons, Slider und Disclosure.
4. Reduced Motion: kein Kartenflug, KPI ohne Transition, keine unpassende Restanimation.
5. Viewports 375, 768 und 1280 px: Rubikon-Overlay, Kartenflug und Abstände sind korrekt.
6. Editorial-Absätze vor und nach der HTML-Card bleiben unverändert.
7. Ein bestehender `financial-chart-module`-Chart auf einer Artikelseite bleibt unverändert.

---

## 9. Quellen und Nachweislinie

Diese Vorlage konsolidiert:

1. `docs/steering/audits/GHOST_APP_CSS_ARCHITEKTUR_BUGREPORT_PEER_PAKET_V1.md`
2. `docs/steering/audits/PEER_REVIEW_ERGEBNIS_GHOST_APP_CSS_ARCHITEKTUR_V1.md`
3. `Theme/src/css/screen.source.css`
4. `Theme/assets/css/screen.css`
5. `Theme/assets/js/apps/prokrastinations-preis.js`
6. `Apps/prokrastinations-preis/app.css`
7. `Theme/assets/js/fw-chart-engine/core/FwRenderer.js`
8. `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`
9. `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md`
10. `docs/spec/Der Rucksack (Context Object Pattern).md`
11. `docs/App-Fabrik/01_DECISION_LOG.md`

Die V1-Dokumente bleiben als Diagnose- und Peer-Review-Beleg unverändert erhalten. Diese V2 ersetzt sie nicht, sondern ist die fachliche Brücke von Befund zu einem späteren, klar begrenzten Code-AP.

