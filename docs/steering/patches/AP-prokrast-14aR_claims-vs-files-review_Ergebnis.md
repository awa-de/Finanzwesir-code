# AP-prokrast-14aR — Claims-vs-Files-Review der CI-/Theme-Bridge-Inventur Ergebnis

## Status

GRÜN

## Kurzfazit

Alle 6 Fundament-Claims aus AP-14a sind deterministisch bestätigt: A-04 ist wortgleich als 🟢 ENTSCHIEDEN im Decision-Log belegt, `screen.css` ist die alleinige technische CI-Farb-/Font-Quelle, `FwTheme.js` bridged `--color-*` produktionsreif für die Chart-Engine, `app.css` nutzt einen eigenen `--fw-*`-Namensraum, und die dafür entscheidenden CI-Bridge-Tokens (`--fw-color-*`, `--fw-font-base`, `--fw-space-*`) sind repo-weit an keiner Stelle definiert oder per JS gesetzt — bestätigt durch einen vollständigen Definition-vs-Use-Scan über alle 39 relevanten Dateien in `Theme/assets/css`, `Theme/assets/js`, `Apps/**`.

Zwei Kontext-Claims werden präzisiert, nicht widerlegt: (a) Nicht alle `--fw-*`-Tokens in `app.css` sind "kaputte Bridge-Versuche" — 6 von 17 (Timing/Positionierung) sind bewusst lokal definierte, funktionierende App-Variablen; nur die 11 CI-semantischen (Farbe/Font/Spacing) sind die eigentliche Lücke. (b) Die Aussage "24 weitere Apps sind reine Spec-Stände" stimmt nur für 21 von 24 — drei Ordner (`regulatorik-dashboard`, `rollierende-sparplaene`, `weltkarte-etf-indizes`) enthalten substanzielle, aber nicht ins App-Fabrik-Muster integrierte Standalone-HTML-Prototypen (eigene Fonts, eigene Farbpaletten, eigenes Chart.js, kein `fw-app`-Contract). Der Kernpunkt von AP-14a — nur `prokrastinations-preis` nutzt den `.fw-app`/`data-fw-app`-Vertrag — bleibt davon unberührt bestätigt.

## Review-Urteil

- AP-14a als Fundament für AP-14b verwendbar: **ja**
- Begründung: Der zentrale, folgenreichste Befund (Token-Bridge-Lücke zwischen A-04-Entscheidung und realem `app.css`) ist nicht nur plausibel, sondern durch einen vollständigen, deterministischen Definition-vs-Use-Scan hart belegt. Keine Gegenbelege gefunden, die den Kernbefund in Frage stellen.
- Einschränkungen: Zwei Nebenaussagen (Homogenität des `--fw-*`-Namensraums, Vollständigkeit "24 Spec-only-Apps") sind zu grob formuliert und werden hier präzisiert. Komponenten-/Layout-/Interaktions-Specs (`02`–`06`) bleiben wie in AP-14a selbst vermerkt nur stichprobenartig geprüft.
- Blocker: keine.

## Gates

- Repo-Wurzel: `z:\Documents\Nextcloud\Finanzwesir 2.0` (bestätigt)
- git status --short vor Start: `M .claude/learning/session-log.md`; `?? Archiv/Chroniken/chronist-v1/CHRONIK-2026-07-07-ap-prokrast-08-13-ci-uebergabe.md`; `?? Archiv/Chroniken/chronist-v1/CHRONIK-2026-07-07-ap-prokrast-12-rubikon-symbolmarkers-drehbuch-errata.md`; `?? docs/steering/patches/AP-prokrast-14a_ci-theme-bridge_inventar_Ergebnis.md`
- git diff --name-status vor Start: nur `M .claude/learning/session-log.md`
- git log --oneline -1: `8bb9256 docs(AP-prokrast-12a-12c): RubikonSymbolMarkers Drehbuch-Errata korrigiert — BACKLOG AP-prokrast-11-FOLLOWUP erledigt`
- unerwartete relevante Änderungen: nein — `app.css`, `screen.css`, `FwTheme.js`, `FwChartTextPlugin.js`, `01_DECISION_LOG.md`, `APP-INTERFACE.md` sind allesamt unverändert (nicht im `git status`-Output), AP-14a-Ergebnisprotokoll ist vorhanden (als `??`, unkommittiert, wie erwartet)
- Stop-Regel ausgelöst: nein

## Gelesen / geprüft

| Pfad/Bereich | Art der Prüfung | Relevanz | Befund |
|---|---|---:|---|
| `docs/App-Fabrik/01_DECISION_LOG.md` (Kopf + A-01 bis A-05) | vollständig gelesen | hoch | A-04 wortgleich zu AP-14a-Zitat, Status 🟢 ENTSCHIEDEN, Stand 2026-06-04 |
| `Theme/assets/css/screen.css` (Tokens, Fonts, §7 Janitor-Fallback) | gezielt gegengelesen (bereits aus AP-14a bekannt, Tailwind-Kommentarstellen neu verifiziert) | hoch | Tokens/Fonts korrekt, §7 nur Kommentar, keine echte Tailwind-Einbindung |
| `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js` (vollständig, 135 Zeilen) | vollständig gegrept auf `theme`/`Theme` | hoch | 0 Treffer — bestätigt Font-Hartcodierung ohne Theme-Zugriff |
| Python-Scan: CSS-Custom-Property-Definitionen/-Verwendungen/-setProperty über `Theme/assets/css/**`, `Theme/assets/js/**`, `Apps/**`, `Theme/index.html`, `Theme/package.json` (39 Dateien) | deterministisch, Regex-basiert | hoch | 103 eindeutige Definitionstokens, 105 eindeutige Verwendungstokens, 9 setProperty-Tokens — vollständige Rohdaten in `scan_result.json` |
| `docs/design-system/spec/03-LAYOUT-UND-RESPONSIVE.md` §1 | gezielt gelesen | mittel | Projekteigene Breakpoints (768px/1280px, kein `lg:`) weichen selbst von genereller Tailwind-Konvention ab, auf die `app.css`-Kommentar sich bezieht |
| `Apps/*/`-Struktur (alle 25 Ordner) | strukturell per Bash-Loop, inkl. Unterordner-HTML | hoch | 21 reine Spec-Ordner, 3 mit Standalone-HTML ohne App-Fabrik-Integration, 1 real integriert (`prokrastinations-preis`) |
| Tailwind-Suchlauf (`Theme/**`, `Apps/**`, `docs/**` getrennt) | Grep, Scope-getrennt | hoch | Funktionale Einbindung nur in `docs/design-system/templates/master-template.html`; sonst nur Kommentare/Doku-Erwähnungen |
| `*.hbs`-Suche (git ls-files + Dateisystem-find, repoweit) | deterministisch, 2 unabhängige Methoden | hoch | 0 Treffer in beiden Methoden |

## Bewusst ausgespart

| Pfad/Bereich | Grund |
|---|---|
| `docs/design-system/spec/02–06` (Volltext) | Bereits in AP-14a als "nur stichprobenartig geprüft" markiert; Claim 12 prüft genau diese Einschränkung, keine Notwendigkeit zur Vollauswertung für das Review-Gate |
| `Apps/regulatorik-dashboard/*.html`, `Apps/rollierende-sparplaene/*.html`, `Apps/weltkarte-etf-indizes/*.html` (Volltext) | Nur strukturell + Token-Scan geprüft; für Claim 9 reicht Existenznachweis + Namensraum-Abgleich, inhaltliche App-Bewertung außerhalb Scope |
| `docs/homepage/09-erste-html-version/finanzwesir-homepage-v12-gemini-tailwind-v16.html` | Historischer Homepage-Exploration-Stand, kein Theme-/App-Runtime-Bezug, für Tailwind-Produktionsclaim irrelevant |
| Font-Binaries (`.woff2`) | Verboten laut Auftrag |
| Vollständiger Inhalt aller 21 Spec-only-Apps | Für Claim 9 reicht Strukturprüfung (Dateitypen vorhanden ja/nein), keine inhaltliche Spec-Bewertung nötig |

## Claim-Review-Matrix

| Claim | AP-14a-Aussage | Review-Status | Datei-Beleg | Einschränkung / Korrektur |
|---|---|---|---|---|
| 1 A-04 formal entschieden | Apps sollen dieselbe Theme-Bridge wie Chart-Engine nutzen, kein Tailwind CDN in Produktion | **bestätigt** | `01_DECISION_LOG.md:35-38`, Status 🟢, Quelle `App-Fabrik_Zusatzpaket-Integration_V0-1.md §4.1` | Zitat in AP-14a ist wortgleich korrekt; Reichweite gilt generisch für "Apps" (App-Fabrik-Konstrukt), nicht app-spezifisch eingeschränkt |
| 2 screen.css shared CI-Wahrheit | Farben/Fonts korrekt eingebunden, deckungsgleich mit Spec 01 | **bestätigt** | `screen.css:20-101`, Abgleich mit `01-FARBEN-UND-TYPOGRAFIE.md` 1:1 | keine |
| 3 FwTheme.js CSS-Variablen-Bridge | Farben gebridged, Fonts hartcodiert | **bestätigt** | `FwTheme.js:110-169` (Farben via `getComputedStyle`), `:55-58` (Fonts nie in `init()` überschrieben) | keine |
| 4 app.css nutzt --fw-* | Eigener Namensraum, ca. 30 Fundstellen | **bestätigt, präzisiert** | 17 eindeutige `--fw-*`-Tokens in `app.css` (Scan) | AP-14a nannte "ca. 30 Fundstellen" (Grep-Treffer, nicht eindeutige Tokens) — 17 eindeutige Tokens ist die korrekte Zahl, kein Widerspruch, nur Präzisierung |
| 5 --fw-* nirgendwo runtime-seitig gesetzt | App läuft dauerhaft auf Fallbacks | **teilweise bestätigt, präzisiert** | Scan: nur 4 von 17 `--fw-*`-Tokens haben überhaupt eine Definition — und die liegen alle in `app.css` selbst (`--fw-card-to-point-flight-duration`, `--fw-rubikon-text-top/-left`, `--fw-screen3-reveal-fade-duration`); die 11 CI-semantischen Tokens (`--fw-color-*`, `--fw-font-base`, `--fw-space-*`) haben **keine** Definition und **keine** `setProperty`-Zuweisung im gesamten Runtime-Scope | Die pauschale Aussage "App läuft auf Fallbacks" gilt korrekt für die CI-Bridge-Tokens (Farbe/Font/Spacing), nicht für die Timing-/Positionierungs-Tokens — die sind bewusst app-lokal definiert und funktionieren wie vorgesehen. AP-14a hat diese Unterscheidung nicht explizit gemacht |
| 6 --color-* vs --fw-* parallele Systeme | Nur --color-* ist shared/gebridged | **bestätigt** | Scan: `--color-*` fast ausschließlich in `screen.css` definiert (Ausnahme: siehe Einschränkung); `--fw-*` nur in `app.css` verwendet, dort teils lokal definiert (s. Claim 5) | Scan fand `--color-*`-Definitionen (mit abweichenden Werten wie `#f7f6f2`) auch in `Apps/rollierende-sparplaene/*.html` und `Apps/weltkarte-etf-indizes/*.html` — das sind aber eigenständige, nicht ins App-Fabrik-Muster integrierte Standalone-Prototypen mit komplett eigenem Farbsystem (inkl. Dark-Mode-Variante) und externen Google-Fonts, keine echte Nutzung der Theme-Bridge. Kein Widerspruch zum Kernclaim, aber eine Kontaminationsquelle, die ein naiver Repo-weiter Grep ohne Scope-Trennung fälschlich als "breite --color-*-Adoption" lesen könnte |
| 7 Tailwind nicht produktiv in Theme/Apps | Nur in Doku-Referenzen real | **bestätigt** | Grep `Theme/**`: 1 Treffer (`screen.css` §7-Kommentar, keine Funktion); Grep `Apps/**`: 1 funktionsloser Kommentar-Treffer (`app.css:372`, Breakpoint-Analogie); `Theme/package.json`: keine Tailwind-Dependency | Zusatzbefund: `screen.css` §7 "JANITOR FALLBACK" ist explizit als Tailwind-Fallback-Sektion konzipiert (aktuell leer) — architektonische Vorbereitung auf Tailwind vorhanden, aber keine Funktion |
| 8 keine Ghost-.hbs im Repo | Repo-seitig nicht verifizierbar, ob Ghost live CSS/Fonts lädt | **bestätigt** | `git ls-files \| grep .hbs` → 0 Treffer; `find . -iname "*.hbs"` → 0 Treffer (zwei unabhängige Suchmethoden, repoweit) | Aussage korrekt auf "im Repo nicht vorhanden" begrenzt, keine Aussage über Ghost-Live-Zustand getroffen — entspricht AP-14a-Formulierung |
| 9 prokrastinations-preis einzige reale App | 24 weitere Apps sind reine Spec-Stände | **teilweise bestätigt, präzisiert** | Struktur-Scan aller 25 `Apps/*`-Ordner | Kernaussage (nur `prokrastinations-preis` hat `app.css`+`app.js`, d.h. nur diese App nutzt den `.fw-app`/App-Fabrik-Vertrag) ist korrekt. Aber: 21 von 24 sind reine Spec-Stände (nur 1 `.md`), nicht 24 — `regulatorik-dashboard` (2 Standalone-HTML + 14 md), `rollierende-sparplaene` (2 Standalone-HTML), `weltkarte-etf-indizes` (2 Standalone-HTML) enthalten bereits gebaute, aber nicht integrierte Prototypen. AP-14a hat diese 3 Ordner nicht erwähnt, weil die App-Struktur-Prüfung nur auf `app.css`/`app.js`/`app.html` (exakter Dateiname) geprüft hat, nicht auf beliebige `.html`-Dateien |
| 10 FwChartTextPlugin sans-serif | Kein Theme-Zugriff, hartcodiert | **bestätigt** | `FwChartTextPlugin.js:95` `ctx.font = ... + 'px sans-serif'`; 0 Treffer für `theme`/`Theme` in der gesamten Datei | keine |
| 11 mehrere Breakpoint-Systeme | Design-System 768px / Chart-Engine 450+900px / App 480+1024+600px | **bestätigt, präzisiert** | `03-LAYOUT-UND-RESPONSIVE.md:8-16` (768/1280px, kein `lg:`); `FwTheme.js` Zonenmatrix (450/900px); `app.css:297,356,374` (600/480/481-1024px) | Zusatzbefund: `app.css:371-373` zeigt, dass die 481-1024px-Grenze bewusst an "Tailwind md/lg" angelehnt wurde — aber das Projekt-eigene Design-System nutzt laut eigener Spec explizit **kein** `lg:` (nur `md:`=768, `xl:`=1280). Die App-Breakpoint-Wahl orientiert sich also an genereller Tailwind-Konvention, nicht an der projekteigenen vereinfachten Skala — ein zusätzlicher, feinerer Diskrepanzpunkt als in AP-14a beschrieben |
| 12 AP-14a-Scope-Limit Komponenten/Layout | Specs 02-06 nur stichprobenartig geprüft | **bestätigt** | AP-14a-Abschnitt "Nicht gelesen / bewusst ausgespart" listet dies explizit | Einschränkung korrekt benannt, keine Korrektur nötig |

## Deterministische Prüfungen

### CSS-Custom-Property-Definitionen

- Suchlogik: Regex `(--[a-zA-Z0-9_-]+)\s*:\s*([^;]+);` für Definitionen, `var\(\s*(--[a-zA-Z0-9_-]+)\s*(,\s*([^)]+))?\)` für Verwendungen, `setProperty\(\s*['"](--[a-zA-Z0-9_-]+)['"]` für JS-Zuweisungen — in Python mit `encoding="utf-8"` ausgeführt.
- geprüfter Scope: `Theme/assets/css/**`, `Theme/assets/js/**` (rekursiv, .css/.js/.html), `Apps/**` (rekursiv, .css/.js/.html), plus `Theme/index.html`, `Theme/package.json`. 39 Dateien insgesamt.
- ausgeschlossene Bereiche: `docs/steering/patches/**`, `Archiv/**`, sonstige `docs/**` — nicht im Scan-Scope, daher automatisch ausgeschlossen (kein manueller Filter nötig, da Scope von vornherein auf Runtime-Verzeichnisse begrenzt war).
- Ergebnis Kurzfassung: 103 eindeutige Definitionstokens, 105 eindeutige Verwendungstokens, 9 `setProperty`-Tokens. Rohdaten in `scan_result.json` (Scratchpad, nicht Teil des Repos).

| Token-Familie | Definitionen Runtime | Definitionen Doku | Verwendungen Runtime | Bemerkung |
|---|---:|---:|---:|---|
| `--color-*` (CI-Kern, screen.css) | 20 (alle in `screen.css`) | ja (`01-FARBEN-UND-TYPOGRAFIE.md`) | 21 eindeutige Tokens, überwiegend in `screen.css` selbst | shared, gebridged via `FwTheme.js` |
| `--color-*` (Fremd, Standalone-HTML) | 16 zusätzliche Tokens in `Apps/rollierende-sparplaene/*.html`, `Apps/weltkarte-etf-indizes/*.html` | nein | dieselben Dateien | eigenständiges, nicht-CI-konformes Farbsystem (z. B. `--color-bg: #f7f6f2`), keine Runtime-Beziehung zu `screen.css` |
| `--fw-*` (App, CI-semantisch: Farbe/Font/Space) | 0 | nein | 11 eindeutige Tokens in `app.css`, alle mit Fallback | ungebridged, Kernlücke |
| `--fw-*` (App, Timing/Positionierung) | 4 (alle in `app.css` selbst) | nein | 6 eindeutige Tokens in `app.css` | funktionierende, bewusst lokale App-Variablen |

### app.css --fw-* Definition-vs-Use-Matrix

| --fw-Token | Verwendung in app.css | Definition gefunden? | Definitionsort | Wirksam runtime-seitig? | Fallback relevant? |
|---|---|---:|---|---:|---:|
| `--fw-color-bg` | 3x | nein | — | nein | ja (`#ffffff`) |
| `--fw-color-text` | 4x | nein | — | nein | ja (`#1a1a1a`) |
| `--fw-color-muted` | 8x | nein | — | nein | ja (`#555555`) |
| `--fw-color-primary` | 5x | nein | — | nein | ja (`#0071bf`) |
| `--fw-color-surface` | 1x | nein | — | nein | ja (`#f5f5f5`) |
| `--fw-color-error-border` | 1x | nein | — | nein | ja (`#c62828`) |
| `--fw-color-error-bg` | 1x | nein | — | nein | ja (`#fff8f8`) |
| `--fw-color-error-text` | 1x | nein | — | nein | ja (`#b71c1c`) |
| `--fw-font-base` | 1x | nein | — | nein | ja (`sans-serif`) |
| `--fw-space-md` | 14x | nein | — | nein | ja (`1rem`) |
| `--fw-space-sm` | 5x | nein | — | nein | ja (`0.5rem`) |
| `--fw-card-to-point-flight-duration` | 2x | ja | `app.css:16` (`.fw-app`-Scope) | ja | Fallback (`450ms`) greift nicht, da lokal definiert |
| `--fw-screen3-reveal-fade-duration` | 1x | ja | `app.css:21` | ja | Fallback (`400ms`) greift nicht, da lokal definiert |
| `--fw-rubikon-text-top` | 1x | ja | `app.css:344/364/377` (Breakpoint-abhängig) | ja | kein Fallback im Verwendungsblock |
| `--fw-rubikon-text-left` | 1x | ja | `app.css:345/365/376` (Breakpoint-abhängig) | ja | kein Fallback im Verwendungsblock |
| `--fw-flight-delta-x` | 1x | JS-`setProperty` | `app.js:910` | ja | Fallback (`0px`) als Initialwert |
| `--fw-flight-delta-y` | 1x | JS-`setProperty` | `app.js:911` | ja | Fallback (`0px`) als Initialwert |

### --color-* vs --fw-* Architekturwahrheit

| Namensraum | Definiert wo | Verwendet wo | Gebridged? | Dokumentiert? | Risiko |
|---|---|---|---:|---:|---|
| `--color-*` | `screen.css :root` (kanonisch); zusätzlich eigenständig (nicht CI-bezogen) in 2 Standalone-Prototyp-HTMLs außerhalb App-Fabrik | `screen.css`, `FwTheme.js` (via `getComputedStyle`), die 2 Standalone-HTMLs (eigener Kontext) | ja (für Chart-Engine, produktionsreif) | ja (`01-FARBEN-UND-TYPOGRAFIE.md`) | niedrig im CI-Kernsystem; die Namensraum-Koinzidenz mit fremden Standalone-HTMLs ist ein Kontaminationsrisiko für künftige Greps, kein technisches Risiko |
| `--fw-*` | Nur teilweise: Timing/Positionierung in `app.css` selbst; CI-semantische Tokens (Farbe/Font/Space) nirgendwo | nur `app.css` | nein (für CI-semantische Tokens) | nein (weder `CSS-KONVENTIENEN.md` noch `APP-INTERFACE.md` noch Design-System-Spec kennen diesen Namensraum) | hoch — einzige reale App-Vorlage für 24 weitere Apps |

### Tailwind-Fundstellen

| Scope | Treffer? | Fundstellen | Einordnung |
|---|---:|---|---|
| `Theme/**` | ja (1 Datei) | `screen.css:12,441-452` — nur Kommentar/§7-Platzhalter, keine Funktion | dokumentiert/vorbereitet, technisch inaktiv |
| `Apps/**` | ja (1 Datei mit Funktionsbezug) | `app.css:372` — Kommentar, Breakpoint-Analogie, keine Funktion; weitere Treffer in `.md`-Dateien (Spec-Doku, kein Code) | dokumentiert/Analogie, technisch inaktiv |
| `docs/design-system/**` | ja | `master-template.html:1` (CDN-Script + Inline-Config), plus Spec-Erwähnungen in `DESIGN-SYSTEM.md`, `03-LAYOUT-UND-RESPONSIVE.md` | einzige echte Funktions-Einbindung im Repo, Referenz-/Demo-Kontext |
| sonstige `docs/**` | ja (zahlreich) | u. a. `docs/App-Fabrik/01_DECISION_LOG.md`, `03_APP_FACTORY_STANDARD_DRAFT.md`, `docs/homepage/09-erste-html-version/finanzwesir-homepage-v12-gemini-tailwind-v16.html` | ausschließlich Doku-/Architektur-Diskussion oder historische Homepage-Exploration, kein Theme-/App-Runtime-Code |

### Ghost-/Template-Fundstellen

| Suche | Trefferzahl | Fundstellen | Aussagegrenze |
|---|---:|---|---|
| `*.hbs` (git ls-files) | 0 | — | Nur getrackte Dateien; ergänzt durch Dateisystem-Suche |
| `*.hbs` (Dateisystem-find, repoweit) | 0 | — | Deckt auch untracked Dateien ab; beide Methoden konsistent 0 |
| `Code Injection` (Doku-Grep) | zahlreich (siehe AP-14a) | u. a. `docs/App-Fabrik/01_DECISION_LOG.md`-Umfeld, `docs/editorial/`, `docs/steering/archiv/` | reine Doku-Aussagen zum vermuteten Ghost-Auslieferungsweg, kein Code-Beleg |
| `fw-app` (Runtime-Grep) | ja, in `app.js`/`app.css`/`APP-INTERFACE.md` | Vertrag technisch umgesetzt in `app.js` `bootstrap()` | Bestätigt Claim 8 begleitend: Contract existiert im Code, aber ohne Ghost-Template-Nachweis, wie/ob er in echten Ghost-Seiten eingebunden wird |

### Apps-Struktur-Inventar

| App-Ordner | app.css | app.js | Daten/Config | Spec/Doku | Einordnung |
|---|---:|---:|---:|---:|---|
| prokrastinations-preis | ja | ja | ja (stations.de.json etc., aus AP-14a-Kontext bekannt) | ja (19 md) | gebaut, App-Fabrik-integriert |
| regulatorik-dashboard | nein | nein | teilweise (Altmaterial) | ja (14 md) | Standalone-Prototyp, nicht integriert |
| rollierende-sparplaene | nein | nein | nein | ja (2 md) | Standalone-Prototyp, nicht integriert |
| weltkarte-etf-indizes | nein | nein | nein | ja (1 md) | Standalone-Prototyp, nicht integriert |
| investment-universum | nein | nein | nein | ja (2 md) | Spec-only |
| übrige 20 Ordner | nein | nein | nein | ja (je 1 md) | Spec-only |

### Breakpoint-/Zonen-Inventar

| Kontext | Datei | Werte | Zweck | Bemerkung |
|---|---|---|---|---|
| Design-System | `03-LAYOUT-UND-RESPONSIVE.md:8-16` | 0px (Mobile) / 768px (`md:`) / 1280px (`xl:`) | Ghost-Content-Responsive, Tailwind-Mobile-First | explizit kein `sm:`/`lg:`/`2xl:` |
| Chart-Engine | `FwTheme.js` `getLineWidth`/`getPointRadius` | S < 450px / M < 900px / L sonst | Linienstärken-/Punktradius-Zonenmatrix | unabhängig von Tailwind-Konvention, eigene Chart-Zonenlogik |
| App-CSS | `app.css:297,356,374` | 600px (min-width) / 480px (max-width) / 481–1024px | Card-to-Point-Layout, Rubikon-Text-Positionierung | 481-1024px bewusst an generischer Tailwind-`md`/`lg`-Konvention orientiert, nicht an projekteigener Design-System-Skala |

## Bestätigte AP-14a-Kernbefunde

- A-04 ist wortgleich und im Status 🟢 ENTSCHIEDEN im Decision-Log belegt.
- `screen.css` ist die alleinige technische Quelle für CI-Farben und -Fonts, deckungsgleich mit der Design-System-Spec.
- `FwTheme.js` bridged `--color-*` produktionsreif für die Chart-Engine; Fonts sind dort korrekt, aber hartcodiert (kein Bridge-Bedarf, da bereits CI-konform).
- `app.css` nutzt einen vollständig eigenen `--fw-*`-Namensraum.
- Die CI-semantischen `--fw-*`-Tokens (Farbe/Font/Spacing) sind repo-weit an keiner Stelle definiert oder per JS gesetzt — die App läuft für diese Werte dauerhaft auf Fallbacks.
- `--color-*` ist der lebendige, gebridgte shared Namensraum; `--fw-*` ist (für die CI-semantischen Tokens) ungebridged.
- Tailwind ist nicht produktiv im echten `Theme/`- oder `Apps/`-Code eingebunden, nur in `docs/design-system/`-Referenzen funktional.
- Keine Ghost-`.hbs`-Templates im Repo — Ghost-Live-Auslieferung ist repo-seitig nicht verifizierbar.
- `FwChartTextPlugin.js` hat keinerlei Theme-Zugriff, `sans-serif` ist hartcodiert.
- Es existieren mehrere unabhängige Breakpoint-/Zonensysteme.

## Korrigierte oder abgeschwächte AP-14a-Befunde

- **"App läuft auf Fallbacks" gilt nicht pauschal für alle `--fw-*`-Tokens.** 6 von 17 (Timing/Positionierung) sind bewusst app-lokal definiert und wirksam. Nur die 11 CI-semantischen Tokens (Farbe/Font/Spacing) sind tatsächlich ungebridged. AP-14b sollte diese Unterscheidung übernehmen, um nicht versehentlich funktionierende Custom Properties mit zu "reparieren".
- **"24 weitere Apps sind reine Spec-Stände" ist zu grob.** 21 von 24 sind reine Spec-Stände; 3 (`regulatorik-dashboard`, `rollierende-sparplaene`, `weltkarte-etf-indizes`) enthalten bereits gebaute, aber nicht ins App-Fabrik-Muster integrierte Standalone-HTML-Prototypen mit eigenem Farb-/Font-/Chart-System. Der Kernpunkt (nur 1 App nutzt den `.fw-app`-Vertrag) bleibt korrekt.
- **Breakpoint-Divergenz hat eine zusätzliche Facette.** Die App-Breakpoint-Grenze 481-1024px wurde laut Code-Kommentar bewusst an "Tailwind md/lg" angelehnt — aber die projekteigene Design-System-Spec nutzt explizit kein `lg:`. Die Angleichung erfolgte also an eine generische Tailwind-Konvention, nicht an die tatsächliche Projekt-Skala.

## Nicht verifizierbare Aussagen / Repo-Grenzen

- Ob echte Ghost-Live-Seiten `screen.css`/Fonts beim Einbetten einer App-Card tatsächlich laden, ist ohne Ghost-Admin-/Live-DOM-Zugriff nicht abschließend zu klären. Repo-seitig keine wirksame Definition oder Gegenbeleg gefunden; Aussage bleibt auf Repo-Ebene begrenzt.
- Ob `docs/design-system/spec/02-KOMPONENTEN.md` bis `06-INTERAKTION.md` weitere, hier nicht erfasste CI-/Token-Widersprüche enthalten, ist mit dieser Prüftiefe nicht auszuschließen — nur Breakpoints (§03) wurden gezielt gegengelesen.

## Konsequenz für AP-prokrast-14b

### AP-14b darf als gesichert voraussetzen

- A-04 ist eine belastbare, formal entschiedene Zielarchitektur — kein Interpretationsspielraum, ob überhaupt eine Bridge gewollt ist.
- Die CI-semantischen `--fw-*`-Tokens in `app.css` sind die alleinige, hart belegte Lücke — kein Verdacht, sondern gezählte, vollständige Definition-vs-Use-Evidenz.
- `--color-*`/`FwTheme.js` sind eine funktionierende, wiederverwendbare Bridge-Referenzimplementierung für die Farbseite — als Vorbild für die Lösung geeignet.
- Es gibt keine Ghost-Template-Dateien im Repo — jede Aussage zur Live-Auslieferung bleibt Annahme, nicht Repo-Fakt.

### AP-14b muss noch selbst lesen oder klären

- Ob die 3 Standalone-Prototypen (`regulatorik-dashboard`, `rollierende-sparplaene`, `weltkarte-etf-indizes`) für die Zielarchitektur relevant sind (z. B. als Negativbeispiele oder verworfene Vorstufen) oder komplett außerhalb des Scopes bleiben.
- Vollinhalt von `docs/design-system/spec/02-KOMPONENTEN.md` bis `06-INTERAKTION.md`, falls der Zielkontrakt über Farbe/Font/Spacing hinausgeht.
- Ob die Timing-/Positionierungs-`--fw-*`-Tokens (die funktionieren) im selben Namensraum bleiben sollen wie die künftig zu bridgenden CI-Tokens, oder ob eine Namensraum-Trennung sinnvoller ist.

### AP-14b darf ausdrücklich nicht daraus ableiten

- Dass alle 24 "übrigen" Apps identisch unberührt/leer sind — 3 davon haben bereits eigenständiges, nicht-integriertes Material, das bei einer Bestandsaufnahme für App-Migrationen relevant werden könnte.
- Dass jeder `--fw-*`-Token in `app.css` repariert werden muss — die 6 Timing-/Positionierungs-Tokens funktionieren wie vorgesehen.
- Dass die Breakpoint-Divergenz ein reiner Zufall ist — mindestens eine der drei Skalen wurde bewusst an eine (falsche) Tailwind-Referenz angelehnt, was auf ein Kommunikationsproblem zwischen App- und Design-System-Ebene hindeutet, nicht auf Unachtsamkeit.

## Regressions-/Folgekosten-Risiko

- Risiko, wenn AP-14a ohne Review genutzt würde: gering bis mittel — der Kernbefund war bereits korrekt, aber AP-14b hätte möglicherweise alle 17 `--fw-*`-Tokens undifferenziert als "kaputt" behandelt (unnötiger Umbauaufwand an bereits funktionierenden Timing-/Positionierungswerten) und die 3 Standalone-Prototypen als Migrationsfläche übersehen.
- Risiko nach diesem Review: niedrig — Kernbefund hart bestätigt, beide Präzisierungen sind dokumentiert und mit Belegen versehen, AP-14b kann direkt und ohne Nacharbeit auf der Claim-Matrix aufsetzen.
- Begründung: Ein vollständiger, deterministischer Scan (nicht nur Stichproben-Grep) über den gesamten Runtime-Scope liefert eine belastbarere Grundlage als jede weitere Plausibilitätsprüfung; verbleibende Unsicherheiten (Ghost-Live, Komponenten-Specs) sind sauber als Repo-Grenzen benannt, nicht verschwiegen.

## Geänderte Dateien

- docs/steering/patches/AP-prokrast-14aR_claims-vs-files-review_Ergebnis.md

## Explizit nicht geändert

- AP-14a-Ergebnisprotokoll: nicht geändert
- app.js: nicht geändert
- app.css: nicht geändert
- Theme/assets/css/screen.css: nicht geändert
- Theme/assets/js/fw-chart-engine/core/FwTheme.js: nicht geändert
- Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js: nicht geändert
- docs/App-Fabrik/01_DECISION_LOG.md: nicht geändert
- docs/design-system/**: nicht geändert
- docs/spec/APP-INTERFACE.md: nicht geändert
- docs/steering/BACKLOG.md: nicht geändert
- APP_SPEC.md: nicht geändert
- QA_TEST_CASES.md: nicht geändert
- stations.de.json: nicht geändert
- Produktentscheidungen Screen 2/3/4: nicht angefasst, nicht neu diskutiert
- RubikonSymbolMarkers: nicht geändert, nur referenziert (Fundstellen aus AP-14a bestätigt)

## Wiederlesen / Datei-Wahrheit

- Ergebnisprotokoll nach Write vollständig wiedergelesen: ja
- git diff --name-status nach Write: `M .claude/learning/session-log.md` (vorbestehend, nicht Teil dieses APs); `?? docs/steering/patches/AP-prokrast-14aR_claims-vs-files-review_Ergebnis.md` (dieser Write); `?? docs/steering/patches/AP-prokrast-14a_ci-theme-bridge_inventar_Ergebnis.md` (vorbestehend aus AP-14a); zwei vorbestehende `?? Archiv/Chroniken/chronist-v1/CHRONIK-*.md` (nicht Teil dieses APs)
- nur erlaubter Write-Scope verändert: ja
- Abweichungen: keine

## Empfehlung

- Status für AP-14a als Fundament: verwendbar, mit den zwei dokumentierten Präzisierungen (Claim 5, Claim 9).
- Nächster sinnvoller Unter-AP: AP-prokrast-14b — Zielkontrakt-/Architektur-Analyse auf Basis der jetzt review-geprüften Fundstellenkarte.
- Warum: Fundament ist hart genug, um direkt mit der Bridge-Design-Entscheidung zu beginnen, ohne weitere Anamnese-Schleifen.
- Was ausdrücklich nicht der nächste AP ist: keine Migration von `app.css`, keine Umsetzung der Bridge, keine Entscheidung über die 3 Standalone-Prototypen ohne expliziten Auftrag.

## Chat-Kurzfassung für den Nebenfaden

AP-14a hält einer harten, deterministischen Prüfung stand: A-04 ist real entschieden, die CI-semantischen `--fw-*`-Tokens in `app.css` sind repo-weit nachweisbar ungebridged (11 von 17 Tokens, vollständige Definition-vs-Use-Matrix erstellt), Tailwind und Ghost-Templates sind wie behauptet nicht im Produktionscode vorhanden. Zwei Präzisierungen: 6 der 17 `--fw-*`-Tokens (Timing/Positionierung) funktionieren bereits und sind keine Bridge-Lücke; und 3 statt 0 der "übrigen" 24 App-Ordner enthalten bereits nicht-integrierte Standalone-Prototypen. AP-14b kann auf dieser Karte direkt aufsetzen.
