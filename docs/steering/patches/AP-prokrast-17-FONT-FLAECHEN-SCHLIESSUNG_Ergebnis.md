Stand: 2026-07-10 19:37 | Session: AP-prokrast-17-FONT-FLÄCHEN-SCHLIESSUNG | Geändert von: Claude

**Status:** GRÜN · **Blocker:** nein · **Commit:** nein · **Typ:** Anamnese, kein Code

---

## 1. Gelesen

`Apps/prokrastinations-preis/app.js` (vollständig, 1274 Zeilen) · `Theme/assets/js/fw-chart-engine/core/FwFormatUtils.js` (vollständig) · zur Einordnung erneut `FwRenderer.js:368-399` (A11y-Render) und `app.css:13`.

---

## 2. B6 aufgelöst — A11y-Datentabelle im Piloten

**Container-Kette (Beleg):**
- `bootstrap()` (`app.js:1256-1270`) selektiert `document.querySelectorAll('.fw-app')` und ruft `initApp(container, slug)` **direkt mit dem `.fw-app`-Element selbst** als `container` auf.
- `renderContent(container, ...)` (`app.js:281`) hängt `screen1..screen4` direkt an dieses `container` (= `.fw-app`) (`app.js:513`).
- Die Chart-Container `chartSection2`/`chartSection3`/`chartSection4` (`app.js:365-368,395-397,444-446`) sind DIVs innerhalb der jeweiligen `screen`-Sections — also Nachfahren von `.fw-app`.
- Diese `chartSection*`-DIVs werden als `container`-Parameter an `chartEngine{2,3,4}.renderFromData(chartSection*, ...)` übergeben (`app.js:554,632,717,823`) → intern an `ChartEngine._draw()` → `renderer.setupStructure(container, ...)` → `_renderA11yTable(container, a11yData)` (`FwRenderer.js:118`), die die Tabelle **direkt an diesen `container`** hängt, außerhalb von `.fw-chart-wrapper`.

**Ergebnis für den Piloten:** Die A11y-Tabelle liegt innerhalb von `.fw-app` (mehrere DOM-Ebenen tief, aber `font-family` ist eine vererbende CSS-Eigenschaft — die Ebenen dazwischen setzen kein eigenes `font-family`, außer `.fw-chart-wrapper`, das die A11y-Tabelle aber nicht umschließt). Sie erbt daher **`.fw-app { font-family: var(--fw-font-base, sans-serif); }`** (`app.css:13`) — dieselbe gebrochene Quelle wie B9 (App-Fließtext). Da `--fw-font-base` nirgends definiert ist, löst sie auf **Fallback `sans-serif`** auf.

**Zweiter Kontext (Ghost-Artikel, generischer `.financial-chart-module`-Einsatz außerhalb des Piloten):** `ChartEngine.init()`/`_processContainer()` nutzt `document.querySelectorAll('.financial-chart-module')` (`ChartEngine.js:311`) — solche Container liegen typischerweise direkt im Ghost-Artikeltext (`.gh-content`), nicht unter `.fw-app`. Dort gibt es keine `--fw-font-base`-Regel; die A11y-Tabelle erbt in diesem Fall von `body { font-family: 'Source Sans Pro', sans-serif; }` (`screen.css:79`) — eine funktionierende, nicht gebrochene Quelle.

**Fazit B6:** Für den Piloten ist die Quelle jetzt eindeutig B9-Sippe (gebrochener Fallback). Der zweite, nicht-gebrochene Ghost-Kontext existiert parallel und ist architektonisch bedingt (kein Bug, andere Einbettung).

---

## 3. Neue Flächen aus `app.js`

Keine neue, eigenständige Font-*Quelle* gefunden — `app.js` injiziert selbst keinen `<style>`-Block, setzt nirgendwo `style.fontFamily` oder `font-family` direkt (einzige `getComputedStyle`-Nutzung betrifft `--fw-card-to-point-flight-duration`, eine Timing-Variable, keine Font, `app.js:868`). Alle von `app.js` gerenderten Textelemente hängen ausschließlich an CSS-Klassen und erben damit von der bereits dokumentierten B9-Quelle (`.fw-app{font-family:var(--fw-font-base,sans-serif)}`).

Zur Vollständigkeit als **konkretisierende Aufzählung unter B9** (keine neue Zeile in der Karte, da gleiche Quelle):
- Screen-1–4-Headlines/-Sublines (`h2S1..h2S4`, `subline`, `sublineS3`), Slider-Label (`labelText`, `valueDisplay`), Journey-/Nav-Buttons (`makeBtn()`), KPI-Cards (`renderKpiCards()`), Station-Card-Texte (`renderStationCard()`: Quellenzeile, Headline, Anker, Collapsible-Trigger, Zwischenstand-`dl`), Rubikon-Text (`rubikonLong`/`rubikonShort`, Footnote), CTA (`cta`), AssumptionsBox (`assumptionsS3`).

**Eine separat zu benennende, bisher nicht einzeln erfasste Fläche:**
- **App-Top-Level-Fehler-/Lade-/Leer-Meldungen** (`renderLoading()` `app.js:29-34`, `renderError()` `app.js:36-41`) — werden direkt an `container` (= `.fw-app` selbst) gehängt, z.B. „Diese App konnte nicht geladen werden.", „Daten konnten nicht geladen werden...", „Nicht genug Daten...". Kein eigenes Inline-Font-Styling — erbt direkt `.fw-app`'s `font-family` (B9-Quelle). Diese Fläche ist konzeptionell von der bereits dokumentierten B7 (`FwRenderer.showError`, Engine-Ebene für einzelne Chart-Container) zu unterscheiden: B7 rendert *innerhalb* eines Chart-Containers mit explizitem Inline-Style (`f.body`), diese neue Fläche rendert auf **App-Ebene** (ganzer `.fw-app`-Container wird geleert und ersetzt) ohne Inline-Style, nur per Vererbung.

---

## 4. `FwFormatUtils`-Verifikation

**Fakt (verifiziert, nicht mehr Annahme):** `FwFormatUtils.js` enthält **keine** Font-Berührung. Vollständig gelesen (118 Zeilen) — die Klasse enthält ausschließlich `getSymbol()`, `formatSmart()`, `formatAbbreviated()`, alle drei nutzen nur `Intl.NumberFormat` und String-Konkatenation. Kein `font`, kein `font-family`, kein `ctx.font`, kein `style.font*` im gesamten Dateiinhalt.

---

## 5. Karten-Abschluss

Die Textflächen-Karte aus `AP-prokrast-17-FONT-FLAECHEN-ANAMNESE_Ergebnis.md` ist jetzt **lückenlos (360°)**:
- B6 aufgelöst (Pilot-Quelle eindeutig B9-Sippe, Ghost-Kontext als zweiter, funktionierender Kontext benannt).
- `FwFormatUtils.js` als faktisch font-frei verifiziert (keine Restannahme mehr).
- `app.js` vollständig gelesen — keine neue, eigenständige Font-Quelle gefunden; eine zusätzliche, bisher nicht separat benannte Fläche (App-Top-Level-Fehler-/Lade-Meldungen) ergänzt, gleiche Quelle wie B9.

Keine Restlücke bekannt.

---

## 6. Doppelte Abschlussfrage

- **Nächster AP (Erwartung):** Write-AP A — Canvas-Fonts (Opus, metriksensibel), danach Write-AP B — HTML-UI-Fonts (Opus).
- **Was nicht der nächste AP ist:** Rubikon-Symbolmarker-Neumessung (Backlog, entkoppelt), andere Apps, Tailwind, Design-Entscheidungen, jede Code-Änderung — auch nicht in diesem AP selbst.

---

## Chat-Ausgabe (Kurzfassung)

**Status:** GRÜN.
**B6-Quelle:** Im Piloten erbt die A11y-Tabelle `.fw-app`'s gebrochenen `--fw-font-base`-Fallback (`sans-serif`) — im generischen Ghost-Artikel-Kontext dagegen `screen.css`-Body (funktionierend, `'Source Sans Pro'`).
**Neue Flächen:** Nein (nur eine zusätzliche Benennung derselben B9-Quelle: App-Top-Level-Fehler-/Lade-Meldungen).
**FwFormatUtils sauber:** Ja, verifiziert (keine Font-Berührung).
**Karte jetzt 360°:** Ja.
**Blocker:** nein.

**Kein Commit, kein Abschlussritual, kein Folge-AP-Start ohne Alberts ausdrückliches OK.**
