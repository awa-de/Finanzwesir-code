# AP-prokrast-15a — Tailwind-CI-Pool Inventar, Renderfluss und Namensanalyse — Ergebnis

## Status

GRÜN

## Kurzurteil

Das CI-Farb-/Font-Fundament ist real, konsistent und vollständig dokumentiert: 4 Markenfarben (Petrol, Blau, Gelb, Purpur) + Neutral-/Text-/Border-Palette + 2 Fonts (Archivo Black, Source Sans Pro) sind über `screen.css`, `FwTheme.js`-Fallbacks und alle Design-System-Templates identisch. Die Farbfächer-Mechanik existiert doppelt: **statisch** als CSS-Custom-Properties-Ramp (`petrol-80/-50/-20/-tint/-30` etc. in `screen.css`) UND **dynamisch** als JS-Funktion (`FwTheme.getGhostColor()` für Opacity-Gradation im Asset-Modus der Balken, `theme.getColor()` für Palette-Zyklus bei Multi-Serie). Der Renderfluss von CSS bis Chart.js ist lückenlos rekonstruierbar, mit drei dokumentierten Bridge-Lücken (einzelne Plugins hardcoden Farbe/Font statt Theme zu nutzen).

Zwei neue, bisher nicht dokumentierte Funde:

1. Ein bereits fertig ausgearbeitetes Tailwind-App-Template (`fw-app-template.html`, `docs/App-Fabrik/_input/perplexity/`) mit KPI-Card/CTA/Skeleton/Slider/Chart-Container-Komponenten existiert unentdeckt im Repo — im Kern ein Prototyp für genau das, was die App-Pool-Benennung braucht.
2. Die Design-System-Referenzdateien nutzen zwei konkurrierende Tailwind-Config-Strategien nebeneinander: Ghost-integrierte Dateien referenzieren `var(--color-*)` aus `screen.css`, alle Demo-/Standalone-Dateien tragen dieselben Werte als Hex-Literale direkt in der Tailwind-Config. Werte sind identisch, aber die Referenzierungs-Mechanik ist dupliziert — direkt relevant für die „eine Quelle der Wahrheit"-Frage.

`Apps/prokrastinations-preis/app.css` bleibt komplett unverbrückt (eigener `--fw-*`-Namensraum ohne Verbindung zu `screen.css`) — bestätigt den AP-14-Kernbefund erneut, jetzt mit vollständiger Token-Liste. Drei Standalone-Prototypen (`regulatorik-dashboard`, `rollierende-sparplaene`, `weltkarte-etf-indizes`) haben je eigene, CI-fremde Farb-/Font-Systeme inklusive Dark Mode — rein technisch inventarisiert, nicht fachlich bewertet.

## Warum dieser AP nötig wurde

- alter AP-15-Umsetzungszuschnitt gestoppt: ja
- Grund: Farbrollen Primary, Surface und Error-Familie waren noch nicht mit Albert/Master entschieden (aus AP-prokrast-14b/14c). Ein Umsetzungs-AP hätte Vorschläge fälschlich als Masterentscheidungen behandelt.
- Konsequenz: AP-prokrast-15a liefert stattdessen nur Bestandsaufnahme + Benennungsvorschlag + präzise Entscheidungsfragen, keine Umsetzung.

## Geprüfte Ausgangslage

- Repo: `z:\Documents\Nextcloud\Finanzwesir 2.0` (Netzwerkpfad-Alias: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`)
- Branch: nicht separat geprüft (kein Hinweis auf Nicht-Standard-Branch, `git log` zeigt lineare Historie auf aktuellem Checkout)
- `git status --short`: nur `M .claude/learning/session-log.md` (erwartbar — `/start`-Warm-Start-Eintrag dieser Session)
- `git diff --name-status`: identisch, nur session-log.md
- Letzter Commit: `d9ca9da` (AP-prokrast-14a-14c, Rücklaufkapsel, bewusst GELB)
- Bewertung: keine unerwarteten Änderungen an App-/Theme-/Engine-/Spec-/Daten-Dateien. Datei-Wahrheit uneingeschränkt belastbar.

## Gelesene / geprüfte Dateien und Pfade

### Pflichtquellen

- `docs/steering/patches/AP-prokrast-14a_ci-theme-bridge_inventar_Ergebnis.md`
- `docs/steering/patches/AP-prokrast-14aR_claims-vs-files-review_Ergebnis.md`
- `docs/steering/patches/AP-prokrast-14b_ci-theme-bridge_zielkontrakt-analyse_Ergebnis.md`
- `docs/steering/patches/AP-prokrast-14c_ruecklaufkapsel_master_Ergebnis.md`
- `docs/App-Fabrik/01_DECISION_LOG.md` (Eintrag A-04)
- `docs/steering/design/CSS-KONVENTIONEN.md`
- `docs/spec/APP-INTERFACE.md`
- `docs/design-system/spec/01-FARBEN-UND-TYPOGRAFIE.md`
- `docs/design-system/spec/03-LAYOUT-UND-RESPONSIVE.md`
- `docs/design-system/spec/DESIGN-SYSTEM.md`
- `Theme/assets/css/screen.css` (vollständig, 454 Zeilen)
- `Theme/assets/js/fw-chart-engine/core/FwTheme.js`, `ChartEngine.js`, `FwRenderer.js`, `FwLayoutRules.js`, `FwFormatUtils.js`
- `Theme/assets/js/fw-chart-engine/plugins/*.js` (alle 6 Plugin-Dateien)
- `Theme/assets/js/fw-chart-engine/strategies/*.js` (alle 4 Strategie-Dateien)
- `Apps/prokrastinations-preis/app.css`, `app.js` (grep-basiert für Farb-/Font-/Style-relevante Stellen)
- `Apps/prokrastinations-preis/APP_SPEC.md`, `drehbuch_prokrastinationspreis_app.md`, `QA_TEST_CASES.md` (Kontext, über spec-scout-Dispatch)

### Zusätzlich geprüfte Quellen

- `Theme/index.html` (technischer Test-Harness für `FwSmartXAxis`, kein CI-/Tailwind-Bezug — hartcodierte Testfarben, nicht produktionsrelevant)
- `Theme/package.json` (kein Tailwind-Build-Toolchain-Hinweis, reines Ghost-Theme-Manifest)
- `docs/design-system/templates/master-template.html`
- `docs/design-system/referenz/ui-kit-referenz.html`, `homepage-demo.html`, `content-page-demo.html`, `datenschutz-demo.html`, `impressum-demo.html`, `janitor-test.html`
- `docs/App-Fabrik/_input/perplexity/fw-app-template.html` (neuer Fund, siehe Kurzurteil)
- `docs/homepage/09-erste-html-version/finanzwesir-homepage-v12-gemini-tailwind-v16.html` (Standalone-Homepage-Prototyp mit Tailwind CDN)
- `Apps/regulatorik-dashboard/**`, `Apps/rollierende-sparplaene/**`, `Apps/weltkarte-etf-indizes/**` (technischer Fingerabdruck der dort enthaltenen Standalone-HTML-Prototypen, s. AP-14aR-Fund)
- repo-weite Suche nach `cdn.tailwindcss.com` (liefert vollständige Trefferliste, s. Abschnitt „Tailwind-Ist-Stand")

### Nicht gelesen / bewusst ausgeschlossen

- `Theme/assets/fonts/**` (Fontdateien nicht geöffnet, wie vorgeschrieben)
- `Archiv/**` (historisches Regulatorik-Material, `Archiv/Design/*`, `Archiv/local/**` — nur über die repo-weite Grep-Trefferliste sichtbar, nicht inhaltlich ausgewertet)
- Ghost `.hbs`-Templates: **im Repo nicht auffindbar** (zwei unabhängige Suchmethoden, auch von AP-14a/14aR bereits so festgestellt). Dadurch ist die reale Auslieferungskette (lädt eine echte Ghost-Seite `screen.css` + Tailwind CDN wirklich gemeinsam?) nicht repo-verifizierbar — siehe „Renderfluss", Abschnitt „Konkurrierende oder unklare Quellen".
- 21 der 25 App-Ordner (alle außer `prokrastinations-preis`, `regulatorik-dashboard`, `rollierende-sparplaene`, `weltkarte-etf-indizes`) — nicht geprüft, da weder Pflichtquelle noch von AP-14aR als Fund gemeldet.
- `tailwind.config.*`, `postcss.config.*`, `vite.config.*`: repo-weit gesucht, **nicht gefunden** — kein lokaler Tailwind-Build vorhanden (erwartungsgemäß, kein Fehler).

## Nicht geändert

- `Theme/assets/css/screen.css`: nicht geändert
- `Theme/assets/js/fw-chart-engine/**`: nicht geändert
- `Apps/prokrastinations-preis/app.css`: nicht geändert
- `Apps/prokrastinations-preis/app.js`: nicht geändert
- App-Spec/Drehbuch/QA: nicht geändert
- Fontdateien: nicht geöffnet / nicht geändert
- Tailwind-Build/Config: nicht geändert (existiert nicht)
- andere Apps: nicht geändert
- Standalone-Prototypen: nicht migriert / nicht ausgewertet (nur technischer Fingerabdruck)

## Tailwind-Ist-Stand

- **CDN / Play-Modus:** `<script src="https://cdn.tailwindcss.com"></script>` ohne Versionsnummer, ohne `type="text/tailwindcss"`. Gefunden in: `docs/design-system/templates/master-template.html`, allen 6 `docs/design-system/referenz/*.html`, `docs/App-Fabrik/_input/perplexity/fw-app-template.html`, `docs/homepage/09-erste-html-version/finanzwesir-homepage-v12-...html`, sowie in `Apps/regulatorik-dashboard/Altmaterial/dashboard-regulatorikXIX.html` und zahlreichen `Archiv/**`-Dateien (historisch, nicht produktionsrelevant).
- **In `Theme/` selbst (das eigentliche Ghost-Theme):** **kein** Tailwind-CDN-Treffer. `Theme/index.html` ist ein reiner Chart-Engine-Testharness ohne Tailwind. `Theme/partials/` enthält nur `.gitkeep` (leer). Keine `.hbs`-Dateien im Repo.
- **`Apps/prokrastinations-preis/app.css` / `app.js`:** kein Tailwind-Bezug, reines Vanilla-CSS mit `--fw-*`-Custom-Properties.
- **Lokale Tailwind-Konfiguration:** repo-weit kein `tailwind.config.*`, `postcss.config.*`, `vite.config.*` gefunden. `Theme/package.json` listet keine Build-Toolchain.
- **`@theme`-Direktive (Tailwind-v4-Style):** in KEINER Datei gefunden.
- **`@layer`-Direktive (Tailwind-natives Feature):** in KEINER Datei gefunden. Stattdessen wird der Name `@layer` in den Design-System-Dateien informell für klassische `<style>`-Blöcke mit Custom-CSS verwendet — kein natives Tailwind-`@layer`.
- **Konfigurationsmuster (JS `tailwind.config = {...}`):** in allen CDN-Dateien vorhanden, mit `theme.extend.colors` / `theme.extend.fontFamily`. Zwei Sub-Strategien: (a) `var(--color-petrol)`-Referenz in Ghost-integrierten Dateien (`master-template.html`, `ui-kit-referenz.html`, `fw-app-template.html`), (b) Hex-Literal direkt in der Config in allen Standalone-Demo-Dateien. Werte sind über alle Dateien identisch, die Referenzierungsmechanik nicht.
- **Utility-Nutzung:** umfangreich in den Design-System-Templates (`bg-petrol`, `text-petrol`, `font-display`, `rounded-xl`, `shadow-soft` usw.) — reales, benutztes Muster, nicht nur Theoriegerüst.
- **Produktionsbuild-Hinweise:** keine. `screen.css` §7 „JANITOR FALLBACK" ist explizit als Vorbereitung für einen fehlenden/nicht geladenen Tailwind-Build dokumentiert, aktuell aber leer (kein Fallback-Content vorhanden).
- **Bewertung (rein deskriptiv, kein Werturteil):** Tailwind-CDN ist im produktiven Ghost-Theme-Pfad (`Theme/`) nicht nachweisbar eingebunden — nur in Design-System-Referenzmaterial und Standalone-Prototypen. Ob eine echte Ghost-Seite `screen.css` + Tailwind-CDN gemeinsam lädt, ist wegen fehlender `.hbs`-Dateien im Repo nicht verifizierbar (bereits AP-14c als offener, nicht-blockierender Punkt vermerkt: Browser-Stichprobe empfohlen). Gemäß Auftrag ist dieser CDN-Zustand kein Blocker und kein Stop-Grund.

## Farbinventar

| Name / Token / Wert | Fundstelle | Ebene | Verwendung | Bewertung |
|---|---|---|---|---|
| `--color-petrol: #218380` | screen.css:22; FwTheme.js:32 (Fallback); alle Design-System-Templates | CI-Rohwert | Primäre Markenfarbe, Buttons, H1/H2, positive Balken | kanonisch |
| `--color-petrol-80: #4D9C99` | screen.css:23; Templates | Farbfächer | Hover-Zustand, Deko | kanonisch |
| `--color-petrol-50: #90C1BF` | screen.css:24; Templates | Farbfächer | Dekorative Hintergründe | kanonisch |
| `--color-petrol-20: #D3E6E6` | screen.css:25; Templates | Farbfächer | Info-Box-Border | kanonisch |
| `--color-petrol-tint: rgba(33,131,128,.08)` | screen.css:26; Templates | Farbfächer | Info-Box-Hintergrund | kanonisch |
| `--color-petrol-30: rgba(33,131,128,.3)` | screen.css:27; Templates | Farbfächer | Icon-Hintergrund | kanonisch |
| `--color-blau: #0071BF` | screen.css:29; FwTheme.js:33; Templates | CI-Rohwert | Text-Links (`.ci-link`), Blockquote-Kontext teils | kanonisch, aber **keine Ramp-Varianten** (nur DEFAULT) |
| `--color-gelb: #DFC805` | screen.css:31; FwTheme.js:34; Templates | CI-Rohwert | Blockquote-Border, Highlight (nie Text) | kanonisch |
| `--color-gelb-80 / -tint / -30` | screen.css:32–34; Templates | Farbfächer | Deko/Hintergrund | kanonisch — **keine -50/-20-Stufe** (Muster weicht von Petrol ab) |
| `--color-purpur: #8D0267` | screen.css:36; FwTheme.js:35; Templates | CI-Rohwert | Warnungen, Visited-Links, negative Balken | kanonisch |
| `--color-purpur-80 / -tint / -30` | screen.css:37–39; Templates | Farbfächer | Deko/Warn-Box | kanonisch |
| `--color-purpur-gradient-light/-medium` (rgba, ~3% Opacity) | nur `homepage-demo.html:35-37`, `impressum-demo.html`, `finanzwesir-homepage-v12` | Farbfächer | feinere Gradation | **nur in Demo-Dateien, nicht in master-template — Asymmetrie, ungeklärt** |
| `--color-text: #272727`, `-sec: #4C4C4C`, `-muted: #666666`, `-disabled: #888888` | screen.css:42–45; FwTheme.js | Neutral/Semantisch | Textfarben-Hierarchie | kanonisch |
| `--color-bg: #FFFFFF`, `-faint: #FAFAFA` | screen.css:46–47; FwTheme.js | Neutral | Hintergrund, Card-Hintergrund | kanonisch, `-faint` einziger Surface-Kandidat |
| `--color-border: #E7ECEF`, `--color-grid: #E7ECEF` (identisch) | screen.css:48–49; FwTheme.js | Neutral | Borders, Chart-Gridlines | kanonisch |
| `--color-zero-line: #999999` | screen.css:50; FwTheme.js | Komponentenrolle (Chart) | Nulllinie Balkendiagramm | kanonisch |
| `--color-loader-bg: #F3F3F3` | screen.css:51; FwTheme.js | Komponentenrolle | Loader-Hintergrund | kanonisch |
| `--shadow-soft`, `--shadow-hover` | screen.css:54–55; Tailwind-Configs | Komponentenrolle | Card-/Hover-Schatten | kanonisch |
| `#0071bf` (Fallback, `--fw-color-primary`) | `app.css:100` u.a. | App-lokal / JS-Fallback | App-Primary-Fallback | **identisch zu `--color-blau`, aber eigener Namensraum — nicht gebrückt** |
| `--fw-color-error-border #c62828`, `-bg #fff8f8`, `-text #b71c1c` | `app.css:31-34` | App-lokal / Fallback | Error-Box im App-Pilot | **keine CI-Farbe — eigene, undokumentierte Statusfarbe** |
| `--fw-color-muted #555555`, `--fw-color-surface #f5f5f5`, `--fw-color-text #1a1a1a`, `--fw-color-bg #ffffff` | `app.css:10-60` | App-lokal / Fallback | App-UI-Grundfarben | **eigene Werte, nicht identisch mit `--color-text`(#272727)/`--color-bg-faint`(#FAFAFA)** |
| `#006273` (FwAnnotationPulsePlugin Fallback) | `FwAnnotationPulsePlugin.js:107` | JS-Fallback | Pulse-Ring-Border | **kein Palette-Eintrag — eigenständiger, nicht dokumentierter Ton** |
| `#0071bf` (FwVerticalLinePlugin, hartcodiert) | `FwVerticalLinePlugin.js:20` | JS-Fallback | Ergebnislinie im Chart | identisch zu `--color-blau`, aber nicht aus Theme gelesen — Bridge-Lücke |
| `rgba(200,200,200,0.3)` (getGhostColor-Fallback) | `FwTheme.js:208` | JS-Fallback | Fallback wenn Hex null | technisch, kein CI-Bezug |
| Standalone-Prototypen (regulatorik-dashboard: teal/blue/amber/red; rollierende-sparplaene + weltkarte-etf-indizes: eigene Light/Dark-Paletten inkl. oklch()) | s. Teil B unten | App-lokal, CI-fremd | eigenständige Prototyp-UI | technischer Fingerabdruck, nicht bewertet |

## Farbfächer / Color-Ramp / Tints-Shades-Mechanik

- **Mechanismus gefunden:** ja — doppelt (statisch UND dynamisch).
- **Statisch (CSS):** `screen.css` definiert für Petrol/Gelb/Purpur je eine Stufenfolge aus DEFAULT + `-80` (heller) + `-50`/`-20` (nur Petrol) + `-tint` (8% rgba) + `-30` (30% rgba). Prozentnamen sind fix vergeben, kein generisches Muster über alle drei Farben (Gelb/Purpur fehlt die `-50`/`-20`-Stufe, die Petrol hat). Identisch dupliziert in allen Design-System-Templates.
- **Dynamisch (JS, Chart-Engine):**
  - `FwTheme.getGhostColor(hex, opacity)` (`FwTheme.js:207-218`): parst einen Hex-String per Bitshift in r/g/b und baut `rgba(r,g,b,opacity)`. Opacity-Default 0.35, Fallback `rgba(200,200,200,0.3)` wenn kein Hex übergeben.
  - `theme.getColor(index)` (`FwTheme.js:194-197`): zyklischer Zugriff auf `this.palette` (`[blau, purpur, petrol, gelb, purpur80, petrol50, gelb80, textSec]`) via Modulo — für Multi-Serie-Charts.
  - `BarChartStrategy._transformAssetView()` (Zeile 214): nutzt `getGhostColor(getColor(i), opacity)` mit einer pro Zeile linear ansteigenden Opacity (`0.35 + 0.65 * (rowIndex/(rows.length-1))`) — das ist der reale „Asset-Modus"-Farbfächer, komplett laufzeitberechnet, nicht in CSS vordefiniert.
- **Beteiligte Dateien:** `screen.css` (statische Stufen), `FwTheme.js` (dynamische Berechnung + Palette), `BarChartStrategy.js` (Anwendung im Asset-Modus).
- **Zentral oder verstreut:** Die dynamische Berechnung ist zentral (eine Funktion `getGhostColor`, ein Palette-Array). Die statische CSS-Ramp ist dagegen an drei Stellen dupliziert (`screen.css`, `master-template.html`/`ui-kit-referenz.html` als `:root`-Kopie, alle Demo-Dateien als weitere Kopie).
- **Bewertung:** Die JS-Mechanik ist bereits Tailwind-kompatibel im Sinne von „eine Quelle, parametrisiert" (nimmt jeden Hex + Opacity entgegen, nicht an CI-Rohwerte gebunden). Die CSS-Ramp dagegen müsste bei einer Umbenennung an mehreren Stellen synchron gehalten werden, wenn die Duplikation nicht aufgelöst wird.
- **Offene Fragen:** Sollen die CSS-Ramp-Stufen künftig einer Tailwind-Skala (50/100/.../900) statt der Prozentnamen (20/30/50/80) folgen? Soll `getGhostColor()` künftig direkt Tailwind-Farb-Tokens (`--color-petrol-500` o.ä.) konsumieren, oder bleibt sie roh Hex-basiert (aktuell unabhängig vom Namensraum)?

## Fontinventar

| Font / Token / Wert | Fundstelle | Verwendung | Bewertung |
|---|---|---|---|
| `'Archivo Black', sans-serif` | `screen.css:68` (@font-face), `:135` (h1/h2-Selektor); `FwTheme.js:57` (`this.fonts.heading`); alle Design-System-Templates (`font-display`-Tailwind-Klasse) | Display-Font (H1/H2, KPI-Werte, CTA teils) | kanonisch, konsistent über alle Quellen |
| `'Source Sans Pro', sans-serif` (400/600/700) | `screen.css:80/88/96` (@font-face), `:113` (body); `FwTheme.js:56` (`this.fonts.body`); Templates (`font-body`) | Fließtext, UI-Standard | kanonisch, konsistent |
| `--fw-font-base: sans-serif` (Fallback) | `app.css:9` | App-Root-Font | **generischer Fallback, kein CI-Font-Name im App-CSS selbst** — Bridge fehlt in `app.css`, obwohl `FwTheme.js` denselben Wert korrekt hartcodiert |
| `sans-serif` (generisch, hartcodiert) | `FwChartTextPlugin.js:95` | RubikonSymbolMarkers Canvas-Text | **Bridge-Lücke** — nutzt nicht `theme.fonts.body`, rendert im Browser-Fallback-Font statt Source Sans Pro (bereits in AP-14b/DS-FOLLOWUP-07 bekannt) |
| `'Source Sans Pro', sans-serif` (Plugin-Fallback) | `CenterTextPlugin.js:45-46` | Pie-Center-Text | korrekt, kein Bridge-Problem |
| Google Fonts Link (Archivo Black + Source Sans Pro) | `finanzwesir-homepage-v12...html:8-10` | Standalone-Homepage-Prototyp | alternative Einbindung außerhalb Ghost-Fontauslieferung |
| Satoshi (via api.fontshare.com) | `regulatorik-dashboard`-Prototyp, `weltkarte-etf-indizes`-Prototyp | Standalone-UI | CI-fremd, technischer Fund |
| Instrument Serif + DM Sans (Google Fonts) | `rollierende-sparplaene`-Prototyp | Standalone-UI | CI-fremd, technischer Fund |

## Element- und Komponenten-Inventar

### Website / Theme

| Element | vorhanden | Font-Quelle | Farbquelle | Fundstelle | Bewertung |
|---|---:|---|---|---|---|
| H1/H2 | ja | Archivo Black | `--color-petrol` | screen.css:133-138 | zentral |
| H3-H5 | ja | Source Sans Pro 700 | `--color-text` | screen.css:140-147 | zentral |
| Fließtext (`.gh-content`) | ja | Source Sans Pro | `--color-text-sec` | screen.css | zentral |
| Links (`.ci-link`) | ja | Source Sans Pro 600 | `--color-blau` → Hover `--color-petrol` | screen.css:363-376 | zentral |
| Blockquotes | ja | — | Border `--color-gelb`, Text `--color-text` | screen.css:151-160 | zentral |
| Tabellen (th/td/tr) | ja | Source Sans Pro 700 (th) | th-bg `--color-petrol`, td `--color-text-sec`, Border `--color-border` | screen.css:171-215 | zentral |
| Bilder/Captions | ja | Source Sans Pro | `#666` (hartcodiert, nicht Token!) | screen.css:238-252 | **kleine Lücke: Caption-Farbe nicht tokenisiert** |
| Listen (ul/ol) | ja | — | `--color-text-sec`, Marker `--color-petrol` | screen.css:277-306 | zentral |
| Boxen (`.box-petrol`, `.box-purpur`) | ja | — | `-tint`/`-20` bzw. `-tint`/DEFAULT | screen.css:429-437 | zentral, aber nur 2 Farbvarianten (kein Gelb-Box, kein neutrales Info-Muster) |
| Buttons/CTA | **nur in Design-System-Templates, nicht in screen.css** | Source Sans Pro | `bg-petrol`/`bg-white` (Tailwind-Klassen) | master-template.html:249-266 | existiert nur als Tailwind-Utility-Muster, nicht als `screen.css`-Komponente |
| Cards/Panels/Surfaces | **nur in Templates** | — | `bg-petrol-tint`/`border-petrol-20` | fw-app-template.html:197 | fehlt in `screen.css` als eigenständige Komponente |
| Modals/Overlays | **nur in master-template.html** | — | `bg-black/20` | master-template.html:126 | fehlt in `screen.css` |
| Tooltips (Website-Kontext) | **nicht gefunden** | — | — | — | fehlt projektweit außerhalb Chart-Tooltip |
| Navigation | teilweise (`#mainHeader`, `#mainNav`) | — | Transition/Opacity-Logik, keine eigene Farbe | screen.css:397-417 | strukturell vorhanden, Farbgebung indirekt über andere Regeln |
| Footer | **nicht gefunden** in screen.css | — | — | — | fehlt |
| Divider/Linien | ja (Border-Regeln) | — | `--color-border` | screen.css | zentral, kein eigenes `<hr>`-Styling gefunden |
| Formulare/Inputs | **nicht gefunden** in screen.css, nur Slider in fw-app-template.html | — | — | — | fehlt projektweit außer App-lokalem Slider-Prototyp |
| Focus/Hover/Active/Disabled | teilweise: `*:focus-visible` (screen.css:121-124, `--color-petrol`); Hover nur `.hover-lift`; Disabled nur als Textfarbe (`--color-text-disabled`), kein Zustands-Pattern für Buttons/Inputs | — | — | screen.css | lückenhaft |

### Apps

| Element | vorhanden | Font-Quelle | Farbquelle | Fundstelle | Bewertung |
|---|---:|---|---|---|---|
| App-Shell (`.fw-app`) | ja | `var(--fw-font-base, sans-serif)` | `var(--fw-color-bg, #ffffff)` | app.css:9-11 | lokal, unverbrückt |
| Error-/Fallback-Bereich | ja | — | `--fw-color-error-*` (eigene Statusfarbe, keine CI-Farbe) | app.css:31-34 | lokal, keine CI-Zuordnung |
| KPI-Karten, CTA, Skeleton, Slider, Range-Buttons, Chart-Container | **nicht in prokrastinations-preis, aber vollständig prototypisiert in `fw-app-template.html`** | Archivo Black (KPI-Value) | `var(--color-petrol)` | fw-app-template.html:102-269 | wichtiger Fund: existierendes Muster für den App-Pool, bisher nicht genutzt |
| Pop-ups/Dialoge | nicht gefunden in App-Pilot | — | — | — | fehlt |
| Progress-/Step-Elemente | nicht als eigene Komponente, nur Bridge-Text „Station X von Y" (aus Memory AP-10b) | — | — | — | app-spezifisch gelöst, nicht generisch |
| Lokale Animations-/Mechanik-Elemente | ja, umfangreich (`--fw-card-to-point-flight-duration`, `--fw-flight-delta-x/-y`, `--fw-rubikon-text-top/-left`, `--fw-screen3-reveal-fade-duration`) | — | — | app.css:16-377 | korrekt als App-lokal klassifiziert, gehört NICHT in CI-Pool |

### Charts / Data-Viz

| Element | vorhanden | Font-Quelle | Farbquelle | Fundstelle | Bewertung |
|---|---:|---|---|---|---|
| Achsentext | ja | `theme.fonts.body` (via `t.fonts`) | `theme.colors.textMuted` | BarChartStrategy.js:238-247, FwSmartScales | zentral, aus Theme |
| Gridlinie | ja | — | `theme.colors.grid` | BarChartStrategy.js:273 | zentral |
| Nulllinie | ja | — | `theme.colors.zeroLine` | BarChartStrategy.js:274 | zentral |
| Serienfarben (Single-Asset) | ja | — | `theme.semantic.positiveBar`(petrol)/`negativeBar`(purpur) | BarChartStrategy.js:165-167 | zentral, Ampel-Kodierung |
| Serienfarben (Multi-Asset) | ja | — | `theme.getColor(i)` (Palette-Zyklus) | BarChartStrategy.js:214 | zentral |
| Asset-Modus-Farben | ja | — | `getGhostColor()` mit laufzeitberechneter Opacity | BarChartStrategy.js:214 | zentral, dynamisch |
| Tooltip | ja | `theme.fonts.body` | `theme.colors.bgWhite/text/border` | FwRenderer.js:69-78 | zentral |
| Legende | ja (DOM-basiert, nicht Chart.js-nativ) | CSS-gesteuert | CSS-gesteuert | FwRenderer.js `_renderLegend` | strukturell anders als übrige Elemente (DOM statt Canvas) |
| Vertikale Linie (Ergebnislinie) | ja | — | **hartcodiert `#0071bf`**, nicht aus Theme | FwVerticalLinePlugin.js:20 | **Bridge-Lücke** — Wert identisch zu `--color-blau`, aber nicht aus Theme gelesen |
| RubikonSymbolMarkers (✅/❓) | ja | **hartcodiert `sans-serif`**, nicht `theme.fonts.body` | `#272727` (DEFAULT_COLOR, entspricht `--color-text`) | FwChartTextPlugin.js:42, 95 | **Bridge-Lücke** (bekannt, DS-FOLLOWUP-07) |
| Annotation-Pulse-Ring | ja | — | **hartcodiert `#006273`**, kein Palette-Eintrag | FwAnnotationPulsePlugin.js:107 | **eigenständiger, nicht dokumentierter Farbton außerhalb der Palette** |
| Crosshair | ja | — | `rgba(0,0,0,0.2)` Fallback, hartcodiert | CrosshairPlugin.js:22 | Fallback, kein Theme-Bezug (geringe Priorität, technische Hilfslinie) |
| Chart-Container/Chart-Host | ja | — | — (Layout, kein Farb-Bezug) | screen.css:337-354 (`.financial-chart-module`) | zentral |

## Aktuelle Assoziationen Farbe/Font ↔ Element

| Element | Kontext | Font-Quelle | Farbquelle | Token / Hex / Fallback | Datei/Fundstelle | Bewertung |
|---|---|---|---|---|---|---|
| H1/H2 | Website | Archivo Black | Petrol | `--color-petrol` | screen.css:133-138 | zentral, konsistent |
| Text-Link | Website | Source Sans Pro 600 | Blau→Petrol (Hover) | `--color-blau`/`--color-petrol` | screen.css:363-376 | zentral |
| Button Primary | Design-System | Source Sans Pro | Petrol-BG/Weiß-Text | Tailwind `bg-petrol text-white` | master-template.html:249 | existiert nur als Muster, nicht in screen.css umgesetzt |
| KPI-Wert (App) | App-Template (Prototyp) | Archivo Black | Petrol | `var(--color-petrol)` | fw-app-template.html:200-205 | Muster vorhanden, in echter App (prokrastinations-preis) nicht genutzt |
| App-Root-Text | prokrastinations-preis | `var(--fw-font-base, sans-serif)` (generisch) | `var(--fw-color-text, #1a1a1a)` | `--fw-font-base`, `--fw-color-text` | app.css:9-10 | **unverbrückt** — eigener Fallback-Hex statt CI-Token |
| Error-Box (App) | prokrastinations-preis | Vererbt (kein eigener Font) | `--fw-color-error-*` (#c62828/#fff8f8/#b71c1c) | eigener Namensraum | app.css:31-34 | keine CI-Zuordnung, keine Rolle in `screen.css` |
| Chart-Achsentext | Chart-Engine | Source Sans Pro (via theme.fonts) | textMuted `#666666` | `theme.colors.textMuted` | FwTheme.js / BarChartStrategy.js | zentral, aus Theme |
| Chart-Ergebnislinie | Chart-Engine | — | Blau `#0071bf` hartcodiert | kein Token, direkter Hex | FwVerticalLinePlugin.js:20 | Bridge-Lücke |
| RubikonSymbolMarkers-Text | Chart-Engine (App-spezifisch) | `sans-serif` hartcodiert | `#272727` (= `--color-text`) | teilweise Token (Farbe), kein Token (Font) | FwChartTextPlugin.js:42,95 | Bridge-Lücke Font, Farbe zufällig korrekt |

## Fehlende Elemente / Rollen für App-Pool und Website

| Rolle / Element | Status | Warum nötig | Risiko | Empfehlung |
|---|---|---|---|---|
| **Primary/Action** | existiert als Marken-Token (Petrol), aber keine explizite Rolle „Primary" definiert | jede App/Button braucht eine eindeutige Handlungsfarbe | ohne Rolle könnte jede App eine andere Marke als „primary" interpretieren (App-Pilot nutzt Blau!) | Masterentscheidung nötig (s. Entscheidungsfragen) |
| **Error/Warning/Info/Success** | Error nur App-lokal + inkonsistent (App-Pilot: eigene rote Statusfarbe; Design-System-Templates: Purpur als „Warning"); **Success fehlt komplett** — kein Grünton irgendwo im Repo gefunden | konsistente Statuskommunikation über 25 Apps | aktuell würde jede App eine andere „Fehler"-Farbe erfinden | Rollen-Kontrakt + fehlenden Success-Ton nachtragen |
| **Surface/Card** | kein eigenes Token, nur `--color-bg-faint` als Kandidat | Cards/Panels sind Standard-UI-Baustein für App-Pool (s. fw-app-template.html) | Ableitung aus Faint-BG ungeprüft, könnte zu wenig Kontrast liefern | Masterentscheidung: Surface neu vs. aus Faint-BG ableiten |
| **Muted Text** | vorhanden (`--color-text-muted`), aber App-Pilot hat eigenen `--fw-color-muted` mit anderem Hex | Konsistenz | geringes Risiko (nur visuelle Abweichung) | bei Migration vereinheitlichen |
| **Border/Divider** | vorhanden zentral (`--color-border`) | — | kein Risiko | übernehmen |
| **Focus-Ring** | vorhanden, aber nur für Links (`*:focus-visible`), nicht für Buttons/Inputs (die es projektweit kaum gibt) | A11y-Anforderung bei App-Rollout | mittel, wenn App-Pool interaktive Elemente bekommt | bei Komponentenrollen-Ebene mitdenken |
| **Disabled** | nur als Textfarbe (`--color-text-disabled`), kein Zustands-Pattern für interaktive Elemente | App-Formulare/Buttons brauchen das | gering (aktuell keine Formulare im App-Pool) | zurückstellen bis Formulare gebraucht werden |
| **Overlay/Modal** | nur in Design-System-Templates (`master-template.html`), nicht in `screen.css` | mehrere Apps planen evtl. Pop-ups/Dialoge (s. Nicht-Ziele-Liste dieses APs, die Pop-ups explizit nennt) | mittel | als Komponentenrolle vormerken, aktuell nicht dringend |
| **Chart-Axis/Grid/Series** | vollständig vorhanden und zentral gepflegt | — | kein Risiko | keine Änderung nötig |
| **Chart-Asset-Ramp** | vorhanden, dynamisch berechnet (`getGhostColor`) | — | kein Risiko, aber nicht CSS-tokenisiert | als App-lokale/Chart-lokale JS-Mechanik einordnen, nicht in CI-Pool heben |
| **App-Shell** | vorhanden als Muster (`.fw-app` + Design-System-Vorlage `fw-app-template.html`), aber nicht einheitlich genutzt (App-Pilot hat eigene, abweichende Werte) | Grundlage für alle 25 Apps | mittel — je mehr Apps vor Vereinheitlichung entstehen, desto teurer die Migration | Priorität: Rollen-Kontrakt vor Rollout weiterer Apps |
| **CTA** | vorhanden als Muster in `fw-app-template.html`, App-Pilot hat eigenen, nicht abgeglichenen CTA-Stil (laut Nächster-Schritt-Feld auch „CTA-Copy" offen) | — | gering-mittel | im Zuge der Komponentenrollen-Entscheidung mit abgleichen |

## Renderfluss CSS / Tailwind / App / Chart-Engine

### Überblick

```
screen.css (:root, CI-Rohwerte + Farbfächer)
  │
  ├─→ Ghost-Content direkt (h1-h5, Links, Tabellen, Boxen — via var())
  │
  ├─→ Design-System-Templates (master-template.html, ui-kit-referenz.html,
  │     fw-app-template.html): Tailwind-Config referenziert dieselben var(--color-*)
  │     → Tailwind-Utility-Klassen (bg-petrol, text-petrol, font-display, ...)
  │
  ├─→ Standalone-Demos (homepage-demo.html u.a.): dieselben Werte als Hex-Literal
  │     in eigener Tailwind-Config (KEINE var()-Abhängigkeit, Duplikat)
  │
  └─→ FwTheme.init() liest 20 CSS Custom Properties via getComputedStyle()
        → theme.colors{...}, theme.fonts{...}, theme.palette[...]
        → theme.getColor(i), theme.getGhostColor(hex, opacity)  [dynamische Ramp]
        → ChartEngine._draw() → Strategies (Bar/Line/Pie) bauen Chart.js-Config
        → Chart.js-Optionen (scales, tooltip, legend) aus theme.* gespeist
        → Plugins (CenterText, Crosshair, FwVerticalLine, FwChartText,
              FwAnnotationPulse, FwAnchorMeasurement) — TEILWEISE aus theme.*,
              TEILWEISE mit eigenen hartcodierten Fallback-Farben/-Fonts
              (Bridge-Lücken, s. oben)
        → sichtbarer Chart im Canvas

Apps/prokrastinations-preis/app.css (--fw-color-*, --fw-font-base, eigene Fallback-Hex)
  → KOMPLETT SEPARAT, liest NICHTS aus screen.css oder FwTheme.js
  → app.js setzt App-lokale Mechanik-Properties (--fw-flight-delta-x/-y) dynamisch via JS
  → sichtbare App-UI (HTML-Card)
```

### CSS als Quelle der Wahrheit

Für die Website (`screen.css` → Ghost-Content) und für die Chart-Engine (`screen.css` → `FwTheme.init()` → `theme.*`) ist CSS tatsächlich die Quelle der Wahrheit — Werte werden zur Laufzeit per `getComputedStyle()` gelesen, nicht in JS dupliziert (mit Ausnahme der Fallback-Konstanten in `FwTheme.js`, die aber wortidentisch zu `screen.css` sind — siehe AP-14a-Fund, weiterhin bestätigt).

### JS / Chart-Engine Bridge

`FwTheme.js:110-169` (`init()`) ist die einzige Bridge-Stelle. Sie liest 20 benannte `--color-*`-Properties, baut daraus `this.colors`, hält zusätzlich eine hartcodierte Fallback-Kopie (`this.colors` Constructor-Defaults, Zeile 31-51) für den Fall, dass `init()` nicht aufgerufen wird oder CSS-Werte fehlen. `FwLayoutRules.js` instanziiert laut Kommentar bewusst eine `FwTheme`-Instanz OHNE `init()`-Aufruf (nutzt nur `fonts.body`) — als Absicht dokumentiert, aber nicht in einer Spec-Datei fixiert.

### Chart.js / Plugins / Renderer

Achsen, Gridlinien, Nulllinie, Tooltip und Serienfarben laufen sauber durch `theme.colors`/`theme.fonts`. Drei Plugins durchbrechen das Muster mit eigenen Hartcodierungen (`FwVerticalLinePlugin` Farbe, `FwChartTextPlugin` Font, `FwAnnotationPulsePlugin` Farbe außerhalb der Palette) — technische Schuld, bereits teilweise bekannt (DS-FOLLOWUP-07 für den Font-Fall), der Farbfall bei `FwVerticalLinePlugin`/`FwAnnotationPulsePlugin` war bisher nicht explizit dokumentiert.

### Konkurrierende oder unklare Quellen

1. **App-Pilot vs. CI:** `Apps/prokrastinations-preis/app.css` ist eine vollständig eigenständige Quelle der Wahrheit, ohne jede Verbindung zu `screen.css`/`FwTheme.js` — bestätigt AP-14-Kernbefund mit vollständiger Token-Liste.
2. **Design-System var() vs. Hex-Literal:** Ghost-integrierte Templates referenzieren `screen.css` über `var()`, alle Standalone-Demos duplizieren dieselben Werte als Hex-Literal in einer eigenen Tailwind-Config. Bei einer künftigen Farbänderung müssten beide Pfade synchron gepflegt werden.
3. **Ghost-Produktionskette nicht verifizierbar:** Da keine `.hbs`-Dateien im Repo liegen, ist nicht repo-seitig nachweisbar, ob eine echte Ghost-Seite `screen.css` und Tailwind-CDN tatsächlich gemeinsam lädt (bereits AP-14c als offener, nicht-blockierender Punkt vermerkt).
4. **Purpur-Gradient-Asymmetrie:** Zwei zusätzliche Purpur-Zwischenstufen (`gradient-light`/`-medium`) existieren nur in Standalone-Demo-Dateien, nicht im `master-template.html` — ungeklärt, ob bewusste Erweiterung oder Versionsdrift.

## Bestehende Namensräume

| Namensraum | Beispiele | Ort | Zweck | Bewertung |
|---|---|---|---|---|
| `--color-*` | `--color-petrol`, `--color-text`, `--color-border` | screen.css, Design-System-Templates | CI-Marken- und Neutralwerte | Tailwind-kompatibel, sollte Basis bleiben |
| `--shadow-*` | `--shadow-soft`, `--shadow-hover` | screen.css, Templates | Schattenwerte | Tailwind-kompatibel, bereits konsistent genutzt |
| `--fw-color-*` (App-lokal) | `--fw-color-primary`, `--fw-color-error-border` | Apps/prokrastinations-preis/app.css | App-eigene UI-Farben | **konkurrierender Namensraum** — laut Leitentscheidung dieses APs künftig unzulässig für allgemeine Farbrollen |
| `--fw-font-*` | `--fw-font-base` | app.css | App-Font-Fallback | konkurrierender Namensraum (generischer Fallback ohne CI-Bezug) |
| `--fw-space-*` | `--fw-space-sm`, `--fw-space-md` | app.css | App-Spacing | app-lokal vertretbar, aber kein `--spacing-*`-Gegenstück in screen.css vorhanden (bereits AP-14b-Befund) |
| `--fw-*` (App-Mechanik) | `--fw-card-to-point-flight-duration`, `--fw-flight-delta-x/-y`, `--fw-rubikon-text-top/-left` | app.css | Timing/Position/Delta, rein app-lokal | korrekt eingeordnet — genau der Zweck, für den `--fw-*` laut Leitentscheidung reserviert bleiben soll |
| Tailwind Utility-Klassen (`bg-petrol`, `text-petrol`, `font-display`, `rounded-xl`) | master-template.html, fw-app-template.html | Design-System-Templates | UI-Komponenten-Bau auf Marken-Basis | Tailwind-kompatibel, funktionierendes Muster, aber ungenutzt außerhalb Templates |
| Tailwind-Config-Farbnamen (`petrol`, `blau`, `gelb`, `purpur`, `text`) | alle CDN-Dateien | Design-System | Brückt CI-Rohwerte zu Tailwind | funktioniert, aber dupliziert (var() vs. Hex, s.o.) |
| `theme.palette` / `theme.semantic.positiveBar/negativeBar` (JS) | FwTheme.js | Chart-Engine | interne Serien-/Ampel-Zuordnung | funktionierend, kein CSS-Pendant nötig (rein laufzeitintern) |
| CI-Rohwert-Namen in Doku (Petrol, Blau, Purpur, Gelb) | 01-FARBEN-UND-TYPOGRAFIE.md | Spec | Redaktions-/Entwickler-Sprache | konsistent mit Code, gute Grundlage für Ebene-1-Namen |

## Tailwind-kompatibler Benennungsvorschlag

### Grundregel

CSS bleibt bevorzugt Quelle der Wahrheit (bestätigtes, funktionierendes Muster in `FwTheme.js`). Allgemeine Designwerte (Farbe, Font, perspektivisch Spacing/Radius/Shadow) erhalten Tailwind-kompatible Namen (`--color-*`, `--font-*`, `--shadow-*` — bereits größtenteils vorhanden). `--fw-*` bleibt ausschließlich für App-lokale Mechanik reserviert (Timing, Position, Delta) — das Repo zeigt bereits, dass dieses Muster in `app.css` funktioniert, wenn es sauber von allgemeinen Farbwerten getrennt wird.

### Ebene 1 — Brand / Foundation

Bereits vorhanden und funktionierend, keine Änderung nötig an den Werten selbst:

```css
--color-petrol: #218380;
--color-petrol-80: #4D9C99;
--color-petrol-50: #90C1BF;
--color-petrol-20: #D3E6E6;
--color-petrol-tint: rgba(33,131,128,.08);
--color-petrol-30: rgba(33,131,128,.3);
--color-blau: #0071BF;      /* bisher keine Ramp-Varianten */
--color-gelb: #DFC805;
--color-purpur: #8D0267;
--color-neutral-text: #272727;
--font-body: 'Source Sans Pro', sans-serif;
--font-display: 'Archivo Black', sans-serif;
```

Prozentnamen (`-20/-30/-50/-80`) vs. Tailwind-Skala (`50/100/.../900`): siehe eigener Abschnitt unten — nicht final entschieden.

### Ebene 2 — Semantische Rollen

**Noch nicht vorhanden, muss von Albert entschieden werden:**

```css
--color-text: ...          /* vorhanden, übernehmbar */
--color-muted: ...         /* vorhanden als --color-text-muted, übernehmbar */
--color-background: ...    /* vorhanden als --color-bg, übernehmbar */
--color-surface: ...       /* NICHT vorhanden — Kandidat: --color-bg-faint, ungeprüft ob ausreichend Kontrast */
--color-border: ...        /* vorhanden, übernehmbar */
--color-link: ...          /* faktisch = --color-blau, aber nicht als Rolle benannt */
--color-primary: ...       /* NICHT entschieden — Petrol oder Blau? */
--color-accent: ...        /* Kandidat: Gelb, bereits so genutzt (nie als Text) */
--color-warning: ...       /* faktisch teils Purpur (Design-System-Templates), nicht konsistent */
--color-error: ...         /* NICHT vorhanden zentral — nur App-lokal mit eigener Farbe */
--color-success: ...       /* FEHLT KOMPLETT im gesamten Repo */
```

### Ebene 3 — Komponentenrollen

Noch nicht flächendeckend nötig — `fw-app-template.html` zeigt bereits ein funktionierendes Beispielmuster (`--fw-kpi-value`-artige Klassen, aber dort noch als Tailwind-Utility statt eigenem Token gelöst). Empfehlung: diese Ebene erst nach Klärung von Ebene 2 angehen, da sie darauf aufbaut (z.B. `--button-primary-bg` würde `--color-primary` referenzieren).

```css
/* Beispielhaft, nicht final: */
--button-primary-bg: var(--color-primary);
--card-bg: var(--color-surface);
--chart-axis-text: var(--color-muted);     /* bereits faktisch so in FwTheme.js */
--chart-asset-ramp: /* bleibt JS-Funktion getGhostColor(), kein CSS-Token nötig */
```

### Ebene 4 — App-lokale Mechanik

Bereits korrekt umgesetzt in `app.css`, keine Änderung nötig, Muster als Vorbild für weitere Apps geeignet:

```css
--fw-card-to-point-flight-duration: 1350ms;
--fw-rubikon-text-top: 14.9%;
--fw-flight-delta-x: 0px;
--fw-flight-delta-y: 0px;
```

### Prozentnamen vs. Tailwind-Skala

| Aspekt | Prozentnamen behalten (20/30/50/80) | Tailwind-Skala (50/100/.../900) |
|---|---|---|
| Vorteil | Kein Migrationsaufwand, bereits an 4+ Stellen dupliziert im Repo verwendet, für Redaktion/Doku (01-FARBEN-UND-TYPOGRAFIE.md) bereits etabliert | Passt zu Tailwind-Erwartungshaltung (`bg-petrol-500`), macht künftige Fremd-Tailwind-Plugins/Tools kompatibel |
| Nachteil | Kein 1:1-Mapping zu Tailwind-Skalenlogik, wirkt für neue Entwickler ungewohnt | Erfordert Migration an mind. 4 Dateien (screen.css, master-template.html, ui-kit-referenz.html, fw-app-template.html) + alle Demo-Dateien, keine 1:1-Werte-Entsprechung vorhanden (nur 2-3 Stufen pro Farbe statt 9) |
| Risiko | Kollidiert nicht mit Tailwind-Utilities (Tailwind kennt beliebige Suffixe) | Falsche Erwartung könnte entstehen, dass alle 9 Stufen existieren, obwohl nur 2-3 real gepflegt werden |

Keine Empfehlung hier final ausgesprochen — echte Kostenfrage für Albert/Master (Migrationsaufwand vs. Tooling-Kompatibilität).

### Was ausdrücklich nicht weitergeführt werden sollte

- `--fw-color-*`, `--fw-font-*` als allgemeine App-Namensräume (aktuell in `app.css`) — sollten bei künftiger Migration durch `--color-*`/`--font-*` ersetzt werden.
- Duplizierte Hex-Literale in Tailwind-Configs der Standalone-Demo-Dateien — sollten langfristig auf `var(--color-*)`-Referenz umgestellt werden (wie bereits in `master-template.html` vorgemacht).
- Hartcodierte Fallback-Farben in einzelnen Plugins (`FwVerticalLinePlugin`, `FwAnnotationPulsePlugin`), die zufällig oder absichtlich von der Palette abweichen — sollten auf `theme.colors.*` umgestellt werden.

## Entscheidungsfragen an Albert / Masterfaden

1. Soll `Primary/Action` Petrol oder Blau sein? (Aktuell nutzt `screen.css` Petrol für Headings/Buttons-Muster, aber der einzige real gebaute App-Pilot nutzt Blau als `--fw-color-primary`-Fallback.)
2. Welche Rolle hat Blau künftig: Link (aktueller De-facto-Zustand in `screen.css`), Data-Viz-Serie (aktueller Zustand in Chart-Engine als `palette[0]`), Secondary, oder App-Primary (aktueller Zustand im App-Pilot)? Blau hat als einzige der vier Marken-Farben keine Ramp-Varianten — soll das so bleiben?
3. Welche Rolle hat Purpur: In Design-System-Templates de facto „Warning", in `screen.css` nur als Box-Akzent, in Chart-Engine als „negativer Balken". Ist das eine bewusste Mehrfachrolle oder soll sie vereinheitlicht werden?
4. Soll `Error` eine eigene, CI-fremde Statusfarbe bekommen (wie aktuell im App-Pilot, `#c62828`) oder eine CI-Farbe nutzen (Purpur läge nahe, da dort bereits „Warning"-artig verwendet)?
5. `Success` fehlt komplett im Repo — soll eine neue Farbe eingeführt werden, und wenn ja, CI-konform (aus bestehender Palette abgeleitet) oder freistehend (z.B. Grün, wie in vielen UI-Baukästen üblich)?
6. Wird `Surface` aus dem bestehenden `--color-bg-faint` abgeleitet, oder braucht es eine eigene, neue Surface-Rampe (aktuell nur eine einzige Stufe vorhanden)?
7. Bleiben die CI-Abstufungen als Prozentnamen (`20/50/80`) oder werden sie in eine Tailwind-Skala (`50/100/.../900`) übersetzt? (s. Abwägungstabelle oben)
8. Welche Tokens sollen später echte Tailwind-Utilities erzeugen (`bg-primary`, `text-error` usw.), welche bleiben reine Runtime-/JS-/Chart-Bridge-Werte (wie `theme.palette`, `getGhostColor()`)?
9. Soll die gefundene Duplikation zwischen `var(--color-*)`-Referenz (Ghost-integrierte Templates) und Hex-Literal-Config (Standalone-Demos) aufgelöst werden — und wenn ja, zugunsten welcher Strategie?
10. Soll `fw-app-template.html` (`docs/App-Fabrik/_input/perplexity/`) als offizielle Grundlage für die App-Pool-Komponentenrollen (KPI-Card, CTA, Skeleton, Slider) genutzt werden, oder war das ein verworfener Perplexity-Entwurf ohne Bindungskraft?
11. Sollen die beiden zusätzlichen Purpur-Gradient-Stufen aus den Standalone-Demo-Dateien (`gradient-light`/`-medium`) offiziell in die CI-Palette aufgenommen werden, oder waren sie ein lokales Experiment ohne Fortführungsabsicht?

## Risiken

| Risiko | Schwere | Begründung | Folge |
|---|---|---|---|
| Ghost-Produktionskette nicht repo-verifizierbar (keine `.hbs`-Dateien) | niedrig-mittel | Ohne Browser-Stichprobe unklar, ob `screen.css` + Tailwind-CDN auf echten Ghost-Seiten wirklich gemeinsam laden | Theoretisches Risiko, dass Tailwind-Utilities in Produktion ohne CSS-Var-Grundlage laufen — bereits als nicht-blockierender Punkt in AP-14c vermerkt |
| var()-vs-Hex-Duplikation in Tailwind-Configs | mittel | Zwei Pflegepfade für dieselben Werte, aktuell noch synchron, aber ohne Mechanismus dagegen | Bei künftigen Farbänderungen könnten Demo-Dateien und Ghost-Templates auseinanderlaufen |
| Fehlende Success-Farbe | mittel | Kein Grünton im gesamten Repo dokumentiert | Apps mit Erfolgs-/Bestätigungs-Zuständen (z.B. „Ziel erreicht") hätten keine CI-konforme Farbe zur Verfügung |
| Purpur-Mehrfachrolle (Warning/Box-Akzent/negativer Balken) | niedrig-mittel | Keine einheitliche semantische Bedeutung | Neue Apps könnten Purpur inkonsistent einsetzen, wenn keine Rollen-Klärung erfolgt |
| Plugin-Bridge-Lücken (`FwVerticalLinePlugin`, `FwAnnotationPulsePlugin`, `FwChartTextPlugin`) | niedrig | Werte sind aktuell zufällig/bewusst konsistent zur Palette, aber nicht strukturell gebunden | Bei künftiger Farbänderung müssten diese 3 Stellen manuell nachgezogen werden — leicht zu übersehen |
| `fw-app-template.html` als unklarer Artefaktstatus | niedrig-mittel | Datei liegt in `_input/perplexity/`, könnte ein verworfener KI-Entwurf ohne Bindungskraft sein | Ohne Klärung besteht Risiko, dass AP-15b versehentlich auf einen nicht autorisierten Entwurf aufbaut oder ihn übersieht |

## Empfehlung

- Nächster sinnvoller Unter-AP: `AP-prokrast-15b — CI-Pool Rollen- und Benennungskontrakt` (wie in der Kettenposition vorgesehen), nachdem Albert/Master die 11 Entscheidungsfragen oben beantwortet hat.
- Warum: Die Bestandsaufnahme ist vollständig und belastbar; die verbleibende Arbeit ist keine weitere Recherche, sondern eine Reihe konkreter Rollenentscheidungen, die nur Albert/Master treffen kann.
- Ausdrücklich nicht nächster AP: jede Umsetzung/Migration von `app.css`, `screen.css` oder den Design-System-Templates, solange die Rollenentscheidungen offen sind.
- Umsetzungsfreigabe: nein

## Anschlussbedingung

Der nächste AP darf erst erstellt werden, wenn dieser Befund im Nebenfaden/Masterfaden ausgewertet und die offenen Rollen-/Benennungsentscheidungen getroffen wurden.
