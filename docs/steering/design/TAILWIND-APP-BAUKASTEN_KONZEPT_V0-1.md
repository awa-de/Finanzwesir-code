Stand: 2026-07-13 | Session: AP-tailwind-02a | Geändert von: Claude (Sonnet)

# TAILWIND-APP-BAUKASTEN — KONZEPT V0.1

**Status: FREIGEGEBEN durch Albert am 2026-07-12 — verbindlicher Design- und Implementierungsvertrag der App-Fabrik. KEIN PRODUKTIONSCODE (Konzeptdokument; Umsetzung = eigene APs mit Gate).**

Grundlage: `docs/steering/patches/AP-tailwind-01_befund-und-forschung_Ergebnis.md` (maßgebliche Anamnese, Commit-Kontext `27deffa`). Dieses Dokument beantwortet das Decision Docket D-01–D-16 und definiert den Design- und Implementierungsvertrag für die App-Fabrik (25+ Apps). Es ändert keinen Bestandscode. Begleitdatei: `TAILWIND-APP-BAUKASTEN_VISUAL-BOARD_V0-1.html` (Non-Production-Nachweis derselben Rezepte).

**Entschieden (AP-tailwind-02a, 2026-07-13):** Für die vorproduktive Entwicklungs- und Testphase (vor Ghost-Integration) lädt `app.test.html` und vergleichbares aktives Referenzmaterial Tailwind CSS v4 ausschließlich über den kanonischen Play-CDN-Tag `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4` (siehe `docs/App-Fabrik/01_DECISION_LOG.md` A-04). Nach Ghost-Integration entfällt das CDN vollständig zugunsten eines lokalen, bereinigten und minimierten Builds (T1, eigener Folgeauftrag). Alle Rezepte sind so spezifiziert, dass sie unverändert den späteren lokalen Build (T1) überleben — vollständige Klassenstrings, keine Laufzeitkomposition. Der `.hbs`-Gap (Befund F-08) betrifft nur den späteren Produktions-Auslieferungsweg, nicht diese Testphasenregel.

---

## 1. Empfehlung und Grundarchitektur

**Ein-Satz-Vertrag:** Jede App ist ein Utility-First-Markup unter einer einzigen benannten Scope-Klasse (`fw-app`), bezieht Struktur ausschließlich aus Tailwind-Default-Skalen, Farbe/Font/Zusatzschatten ausschließlich aus den CI-Tokens (via Tailwind-`extend`-Spiegelung), und trennt Flächen nach der Regel **Abstand > Flächenton > Schatten > Border zuletzt**.

Die Grundarchitektur in fünf Ebenen mit expliziten Besitzgrenzen:

| Ebene | Inhalt | Besitzer | Darf NICHT |
|---|---|---|---|
| **CI (kanonisch)** | Farbleitern Petrol/Gelb/Purpur 50–900, Blau-700, Neutral-/Error-Set, `--font-display`/`--font-body`, `--shadow-soft`/`--shadow-hover`, semantische Rollen (`primary`, `link`, `surface`) | `tokens.css` (SSoT, Änderungsverbot) | Struktur definieren (Spacing/Radius/Border-Breiten) |
| **Tailwind-Struktur** | Spacing-, Radius-, Border-, Shadow-Default-Skalen; Flex/Grid; `sm/md/lg`-Responsive; `hover:`/`focus-visible:`/`active:`/`disabled:`/`motion-reduce:`-Varianten | Tailwind-Defaults (unverändert, nur `extend` für CI-Spiegelung) | CI-Werte neu erfinden; Kern-Skalen überschreiben |
| **Gemeinsame App-Primitiven** | App-Shell, Panel, Card, Stat/KPI, Button-Familie, Control-Group/Segmented, Slider-Field, Disclosure, Callout/Assumptions, Status-States, Chart-Chrome | dieser Vertrag (Abschnitt 6) | App-Mechanik übernehmen; Chart-Canvas berühren |
| **Kompositionen** | Screen-Flow, KPI-Ergebnisgruppe, Chart mit Toolbar+Legende, Stationen-/Story-Bereich, Abschluss-CTA | dieser Vertrag (Abschnitt 7) | neue Primitiven still einführen |
| **Lokale App-Mechanik** | Card-to-Point-Flug, Rubikon-Position, Spezial-Timings, deren `--fw-*`-Properties und Sonderbreakpoints | jeweilige App | zum allgemeinen Primitive verallgemeinert werden |

**Besitzgrenzen-Regel:** Ein Primitive übernimmt nie still App-Mechanik. Wenn eine App ein Primitive um Mechanik erweitert (z. B. der Stationen-Bereich als Flug-Ziel), geschieht das über eine zusätzliche app-lokale Klasse (`fw-app__*` bzw. `--fw-*`), nie durch Verändern des Primitive-Rezepts.

**Kein Dashboard-Import:** Tailwind Application UI und Refactoring UI liefern die gestalterische Intelligenz (Stat-Gruppen, Segmented Controls, Trennhierarchie), aber keine Chrome-Muster: keine Sidebars, keine Top-Nav, keine Kartenlandschaft. Eine App ist **eine** in einen Ghost-Artikel eingebettete, ruhige Fläche mit einem Aufgabenfluss — nicht viele Kacheln.

---

## 2. Build-sichere Klassenkonvention

### 2.1 CI-Spiegelung (Token-Name = Utility-Suffix)

Tailwind referenziert CI ausschließlich über `theme.extend`, und der Utility-Suffix ist immer der Token-Name ohne Umbenennung. Das verhindert Namensdrift zwischen `tokens.css` und Markup:

| Token (`tokens.css`) | Tailwind-`extend`-Eintrag | Utility-Beispiel |
|---|---|---|
| `--color-petrol-50…900` (analog Gelb, Purpur) | `colors.petrol[50…900] = var(--color-petrol-*)` | `bg-petrol-600`, `text-petrol-700`, `ring-petrol-500` |
| `--color-blau-700` | `colors.blau[700]` | `text-blau-700` |
| `--color-primary` / `--color-link` / `--color-surface` | `colors.primary` / `.link` / `.surface` | `bg-primary`, `text-link`, `bg-surface` |
| `--color-text`, `-sec`, `-muted`, `-disabled` | `colors.text.{DEFAULT,sec,muted,disabled}` | `text-text`, `text-text-muted` |
| `--color-bg`, `--color-bg-faint` | `colors.bg.{DEFAULT,faint}` | `bg-bg`, `bg-bg-faint` |
| `--color-border` | `colors.border` | `border-border` |
| `--color-error-text/-border/-bg` | `colors.error.{text,border,bg}` | `text-error-text`, `border-error-border`, `bg-error-bg` |
| `--font-display`, `--font-body` | `fontFamily.display` / `.body` | `font-display`, `font-body` |
| `--shadow-soft`, `--shadow-hover` | `boxShadow.soft` / `.hover` | `shadow-soft`, `shadow-hover` |

Verboten bleiben (CI-POOL §3): Prozentstufen (`petrol-80`), Alpha-Pseudostufen (`petrol-20`), `-tint`-Namen, `--fw-color-*`/`--fw-font-*`/`--fw-space-*` für allgemeine Gestaltung. Bridge-only-Tokens (`--color-grid`, `--color-zero-line`, `--color-loader-bg`) bekommen **keine** Utility — sie bleiben JS/Engine-Bridge.

Doppelnamen wie `text-text` und `border-border` sind bewusst in Kauf genommen: Token-Treue schlägt Eleganz. Wer `text-ink` einführt, erzeugt einen zweiten Namensraum — genau das ist verboten.

### 2.2 Literalregel (verbindlich für alle 25+ Apps, ab sofort)

1. Tailwind-Klassenlisten existieren nur als **vollständige String-Literale** — im HTML-Attribut oder als benannte JS-Konstante, deren Wert ein einziges Literal ist.
2. **Keine Interpolation** in Klassennamen: `` `bg-${tone}-500` `` ist verboten, ebenso `'bg-' + tone`.
3. Varianten sind **Maps vollständiger Strings**: `const BTN = { primary: '…voller String…', secondary: '…voller String…' }` — die Auswahl ist dynamisch, die Strings sind es nie.
4. Zustandswechsel laufen über `classList.add/remove` mit Literalen, über vollständigen `className`-Tausch aus einer Map, oder über `data-*`-Attribute plus Varianten-Präfixe.
5. **Datengetriebene Farben** (Chart-Serienfarben, Legend-Dots) sind kein Tailwind-Fall: Inline-`style` aus der Engine-Farblogik. Das ist die dokumentierte, korrekte Ausnahme — nicht per Safelist erschlagen.

Diese Regel gilt ab der ersten migrierten Zeile, nicht erst ab T1 (Befund R-05: der Purge-Scanner sieht nur wörtliche Strings; `fw-janitor.js` und `app.js` machen es heute bereits richtig).

### 2.3 Wertetreue und Rundungsregel

Wo ein Bestandswert nicht exakt auf einer Tailwind-Stufe liegt, wird auf die **nächste Tailwind-Stufe gerundet** und die Rundung im Migrationshinweis dokumentiert (z. B. `min-height: 200px` → `min-h-48` = 192px; KPI-Basis `140px` → `basis-36` = 144px; Popover `max-width: 340px` → `max-w-sm` = 384px; Callout-Border `3px` → `border-l-2`). Arbitrary Values (`min-h-[200px]`) sind nur zulässig für **inhaltsgetriebene** Werte ohne Design-Charakter (z. B. `min-w-[7ch]` für Zahlenbreite) — literal geschrieben und damit build-sicher.

---

## 3. Decision Docket — Antworten D-01 bis D-16

Jede Entscheidung: **Empfehlung → Begründung → wichtigste verworfene Alternative → Wirkung auf 25+ Apps → offene Nutzerentscheidung.**

### D-01 — App-Shell: benannte Klasse oder Utility-Verbund?

**Empfehlung: Hybrid (Option c).** Der Root-Container trägt genau eine benannte Klasse `fw-app` als Scope-, JS-Mount- und Test-Anker plus einen festen Utility-Verbund für die visuelle Basis: `relative box-border w-full min-h-48 bg-bg font-body text-text`. `fw-app` selbst trägt **kein** visuelles CSS mehr — es ist Adresse, nicht Aussehen.
**Begründung:** Mehrfachinstanz-Guard (`data-fw-initialized`), State-Attribute (`data-fw-state`) und Testselektoren brauchen einen stabilen benannten Anker; die visuelle Definition gehört nach der Leitentscheidung in Utilities. `@apply` fällt aus (Tailwind-Team rät ab, zweite Design-Sprache).
**Verworfen:** Reiner Utility-Verbund (b) — würde JS-Hooks an Utility-Klassen koppeln oder zusätzliche `data-*`-Selektorik erzwingen; fragiler ohne Designgewinn.
**Wirkung auf 25+ Apps:** Jede App startet mit identischem Shell-Rezept; Ghost-Artikel und App bleiben über den Scope-Anker sauber getrennt; Tests und JS bleiben stabil, während Utilities frei evolvieren.
**Nutzerentscheidung:** Ja — Freigabe des Hybrid-Musters (Teil der Gesamtabnahme).

### D-02 — Trennhierarchie Abstand/Flächenton/Schatten/Border

**Empfehlung: Bestätigung + konkrete Anwendungsregeln** (Grundsatz bereits kanonisch, CI-POOL §7.5). Anwendungsvertrag: (1) Erste Wahl ist immer Abstand (`gap-*`, `space-y-*`, `p-*`). (2) Flächenton (`bg-surface`/`bg-bg-faint`) nur für Cards und ausnahmsweise für ein hervorgehobenes Panel — nie zwei getönte Flächen direkt ineinander. (3) Schatten nur für erhobene Elemente: `shadow-soft` für schwebende Ruhe-Elemente (Legend-Pills, aktive Segmented-Option), `shadow-hover` für echte Überlagerungen (Popover) und Hover-Lift. (4) Border nur mit **funktionaler** Aufgabe: Konturen von Interaktionselementen (Sekundärbutton, Inputs), Error-Rahmen, Callout-Akzentkante. Dekorative Trenn-Borders sind verboten, wo Abstand reicht.
**Verworfen:** Nichts — es gab keine Optionen, nur Anwendungsdetails.
**Wirkung:** Einheitliche, ruhige Flächensprache über alle Apps; der F-01-Anti-Pattern-Typ (harter Rahmen als Erstmittel) ist vertraglich ausgeschlossen.
**Nutzerentscheidung:** Nur für die Anwendungsdetails im Rahmen der Gesamtabnahme; der Grundsatz ist entschieden.

### D-03 — Card- vs. Panel-Taxonomie

**Empfehlung: Zwei benannte Ebenen plus eine dritte, flächenlose (Option a, erweitert).** Taxonomie in Abschnitt 5: **Section** (unsichtbarer Gliederungsabschnitt, nur Abstand), **Panel** (größerer Layoutabschnitt, standardmäßig ohne Flächenton), **Card** (kleine, in sich geschlossene Informationseinheit mit Flächenton). Zuordnungsregel und Verschachtelungsverbot siehe Abschnitt 5.
**Begründung:** Der Bestand unterscheidet bereits intuitiv (KPI-Karte vs. Stationen-Bereich, Befund UI-04/UI-08, R-06); ohne Namen driftet das über 25 Apps auseinander — die „möglichst große Sammlung von Cards" ist genau das benannte Anti-Ziel.
**Verworfen:** Eine generische „Box"-Ebene (b) — diffuse Grenzen führen bei 25 Apps zwangsläufig zu Card-in-Card.
**Wirkung:** Jede App kann jeden Container eindeutig einer Ebene zuordnen; Reviews haben ein prüfbares Kriterium.
**Nutzerentscheidung:** Ja — Freigabe der Taxonomie (Teil der Gesamtabnahme).

### D-04 — Schnittstelle `.fw-app__chart-section` ↔ `.fw-chart-wrapper`

**Empfehlung: Option a mit hartem Ein-Container-Vertrag.** Der App-seitige Chart-Slot bleibt ein unsichtbarer Positionierungs-Wrapper (nur Layout-Utilities: `relative`, Abstände wie `mt-6`). Er darf **nie** `bg-*`, `border-*`, `shadow-*`, `rounded-*` oder Innen-Padding tragen. Genau ein sichtbarer Container existiert am Übergang: der Engine-eigene `fw-chart-wrapper`. Die Engine behält bis zum Engine-DOM-Folge-AP ihr eigenes CSS; dieser Vertrag definiert bereits die Ziel-Rezepte (Abschnitt 6.11), auf die die Engine später wechselt.
**Begründung:** Minimal-invasiv, respektiert die Engine-Verträge, und der Ein-Container-Vertrag eliminiert das Doppelrahmen-Risiko sofort — unabhängig davon, wann die Engine migriert.
**Verworfen:** Sofortige Engine-Umstellung (b) — größere Regressionsfläche, Engine-Koordination, außerhalb dieses AP-Scopes.
**Wirkung:** Alle Apps mit Charts (die Mehrheit der 25) haben eine identische, doppelrahmenfreie Übergabestelle; zwei CSS-Sprachen koexistieren befristet und dokumentiert.
**Nutzerentscheidung:** Ja — Bestätigung des Schnittstellenvertrags und später Timing des Engine-DOM-Folge-APs.

### D-05 — KPI-Karten vs. BAN-Headline

**Empfehlung: Getrennt lassen (Option b), aber als eine „Stat-Familie" mit gemeinsamer visueller Grammatik.** App-KPI (`dl`-Semantik, Endzustand nach Interaktion) und Engine-BAN (`aria-live`-Zahl im Chart-Kontext) bleiben zwei Primitiven mit getrennten Besitzern. Beide beziehen aber Typo-Stufen, Farbrollen und Flächenton aus derselben Rezeptfamilie (Label: `text-sm text-text-muted`; Wert: `text-2xl font-bold text-text`), sodass „große Zahl" überall gleich aussieht.
**Begründung:** Semantik und Lebenszyklus sind verschieden (statisches Ergebnis vs. Live-Region im Chart); eine Vereinheitlichung würde App- und Engine-Vertrag koppeln und den Engine-AP präjudizieren. Die visuelle Konsistenz ist ohne Kopplung erreichbar.
**Verworfen:** Ein gemeinsames Stat-Primitive für App+Engine (a) — Konsistenzgewinn rechtfertigt die Vertragsverflechtung nicht.
**Wirkung:** Apps nutzen das KPI/Stat-Primitive frei; Chart-BANs bleiben Engine-Sache, sehen aber gleich aus. Kein Abstimmungszwang pro App.
**Nutzerentscheidung:** Ja — Bestätigung der Trennung (Teil der Gesamtabnahme).

### D-06 — Button-/CTA-Vokabular

**Empfehlung: Ein gemeinsames Vokabular mit vier Varianten — `primary`, `secondary`, `ghost`, `toolbar`.** Primary/Secondary/Ghost tragen App-Navigation und CTA (ersetzt `fw-app__btn`, `--next`, `--prev`, `--journey`, `fw-app__cta` — der Journey-Button ist ein Primary mit Kompositionsregel, kein eigener Typ). `toolbar` ist die kompakte Segmented-Variante für Chart-Controls (ersetzt konzeptionell `fw-btn`/`fw-toggle-opt`; Engine-Umsetzung erst im Engine-AP). Die Konvention „genau ein Primary-CTA pro App, am Ende des Flows" wird übernommen (aus der Rohreferenz, hier verbindlich gemacht).
**Begründung:** Wiedererkennbarkeit über 25 Apps ist wichtiger als die Dichte-Differenz — die die `toolbar`-Variante ja gerade abdeckt. Zwei getrennte Button-Systeme wären genau die zwei visuellen Sprachen, die der Baukasten beenden soll.
**Verworfen:** Getrennte Systeme App vs. Engine (b) — die funktionale Differenz ist real, aber eine Varianten-, keine Systemfrage.
**Wirkung:** Vier Rezepte statt heute zwei unabgestimmten Systemen; jede neue App wählt aus der Map, erfindet keine Buttons.
**Nutzerentscheidung:** Ja — Freigabe des Varianten-Sets (Teil der Gesamtabnahme).

### D-07 — Breakpoints der Apps

**Empfehlung: Option b — generische UI wechselt auf Tailwinds `sm/md/lg` (mobile-first), App-Mechanik behält ihre Sonderbreakpoints als dokumentierte lokale Ausnahme.** Der `600px`-Journey-Umbruch wird zu `sm:` (640px, Rundung auf Tailwind-Raster). Die Rubikon-Positionslogik (480/1024px) bleibt unverändert in app-lokalem CSS unter App-Mechanik — sie ist Positions-Feinjustage, kein UI-Layout.
**Begründung:** Einheitliches Raster für alles Wiederverwendbare; die Rubikon-Nachmessungs-Kaskade (DS-FOLLOWUP-07) wird nicht ohne Not ausgelöst. Max-width-Denke wird bei der Migration in Mobile-first gedreht (Basis = mobil, `sm:`/`md:` = Aufwärts-Overrides).
**Verworfen:** Volle Umstellung inkl. Mechanik (a) — Nachmess-Aufwand ohne gestalterischen Gewinn; Mechanik ist per Leitplanke ohnehin lokal.
**Wirkung:** Alle 25 Apps teilen ein Breakpoint-Vokabular; Sonderbreakpoints sind nur noch in explizit deklarierter App-Mechanik zulässig.
**Nutzerentscheidung:** Ja — Freigabe des Breakpoint-Vertrags (Teil der Gesamtabnahme).

### D-08 — Ablösung `--fw-space-*`

**Empfehlung: Option a — ersatzlose, direkte Ablösung durch Tailwind-Spacing-Utilities im Markup.** Mapping: `--fw-space-sm` (0.5rem) → `p-2`/`gap-2`/`m-2`-Familie; `--fw-space-md` (1rem) → `p-4`/`gap-4`/`m-4`-Familie. Nach der Pilotmigration existiert `--fw-space-*` nicht mehr (löst F-02 auf); der Grep auf `--fw-space-` ist das Abnahmekriterium.
**Begründung:** Die Bridge-Variante würde den verbotenen Namensraum am Leben halten und nur die Werteherkunft tauschen — der Kontraktverstoß bliebe formal bestehen. Die Werte liegen exakt auf Tailwind-Stufen (0.5rem = `2`, 1rem = `4`), die Ablösung ist verlustfrei.
**Verworfen:** Bridge-Variable (b) — „weniger invasiv" ist hier nur „Verstoß verschoben".
**Wirkung:** Spacing hat ab dem Piloten genau eine Quelle (Tailwind-Skala); keine App führt je wieder eigene Spacing-Variablen ein.
**Nutzerentscheidung:** Ja — Freigabe für die Pilotumsetzung (das Markup in `app.js` ändert sich; hier nur Konzept).

### D-09 — Radius-/Shadow-Zuordnung

**Empfehlung: Option b — Tailwind-Default-Stufen plus die zwei freigegebenen Zusatzschatten**, mit fester Zuordnungstabelle (vollständig in Abschnitt 5.3): Buttons/Inputs/Segmented `rounded-md`; Cards `rounded-lg`; Panels mit Fläche und Popover `rounded-xl`; Pills `rounded-full`; Schatten ausschließlich `shadow-soft` (Ruhe-Elevation) und `shadow-hover` (Überlagerung/Hover-Lift) — Tailwinds eigene `shadow-sm`…`shadow-2xl` werden in der App-Fabrik **nicht** verwendet, damit genau zwei Schattenstufen existieren (Refactoring-UI: wenige, konsequente Stufen).
**Begründung:** `rounded-lg`/`rounded-xl` entsprechen exakt den bereits im Theme (`screen.css`) verwendeten 0.5/0.75rem — Kontinuität statt viertem Radius-Vokabular. Die harten `4px` der App und die Prototyp-Skalen gehen in diesen Stufen auf.
**Verworfen:** Reine Tailwind-Schatten ohne Zusatzstufen (a) — verwirft zwei bereits visuell abgenommene CI-Stufen ohne Gewinn.
**Wirkung:** Drei parallele Radius-Vokabulare kollabieren auf eine Skala; Schatten sind über alle Apps auf zwei bedeutungstragende Stufen begrenzt.
**Nutzerentscheidung:** Ja — Freigabe der Zuordnungstabelle (Teil der Gesamtabnahme).

### D-10 — Chart-DOM: zweite oder dritte Container-Query-Zone?

**Empfehlung: Option b — die DOM-Seite bleibt bei 2 Zonen (S ≤ 450px / Rest).** Die 3-Zonen-Matrix bleibt Canvas-Sache (`FwTheme.js`), wo Dichte (Ticks, Fonts im Canvas) tatsächlich M/L-sensibel ist. Das DOM-Chrome (Titel, Toolbar, Legende) hat zwischen M und L keinen belegten Layoutunterschied — eine dritte Stufe wäre Pflegeaufwand auf Vorrat.
**Begründung:** Kein belegter Bedarf im Befund; die Engine funktioniert. Reversibel: Zeigt der Engine-AP konkreten M/L-Bedarf im Chrome, wird eine dritte `@container`-Stufe ergänzt — der Vertrag hier steht dem nicht im Weg.
**Verworfen:** Dritte Stufe jetzt (a) — Konsistenz-Symmetrie ohne funktionalen Anlass.
**Wirkung:** Kein Engine-Eingriff nötig; der DOM-Chrome-Vertrag bleibt schlank für alle Chart-nutzenden Apps.
**Nutzerentscheidung:** Nein (bei Bedarf im Engine-AP erneut vorlegbar).

### D-11 — Loading/Empty/Error-Vokabular

**Empfehlung: Ein gemeinsames Zustands-Vokabular auf Vertragsebene, zwei Träger (Hybrid aus a und b).** Die Namen, ARIA-Rollen und visuellen Rezepte sind für App und Engine identisch definiert (Abschnitt 6.10): Loading = gedämpfte Fläche/Spinner + `role="status"`; Empty = ruhiger Hinweistext + `role="status"`; Error = `rounded-lg border border-error-border bg-error-bg p-4 text-error-text` + `role="alert"`. Träger bleiben getrennt: App-weit über `data-fw-state` auf der Shell, chart-lokal über den Engine-Container. Die Engine-Lücke (Loading ohne `role`) wird als Soll in den Engine-AP übergeben.
**Begründung:** Nutzer sehen einen Zustand, keine Zuständigkeit — das Vokabular muss eins sein. Die Trägertrennung folgt der realen Verantwortungsgrenze und vermeidet Engine-Eingriffe jetzt.
**Verworfen:** Vollständig getrennte Muster (b pur) — zwei visuelle Sprachen für „kaputt/leer/lädt" wären für Endnutzer unbegründbar.
**Wirkung:** Jede App und jedes Chart melden Zustände identisch; A11y-Rollen sind vertraglich fixiert statt implizit.
**Nutzerentscheidung:** Ja — Bestätigung (Teil der Gesamtabnahme); Engine-`role`-Nachrüstung gehört in den Engine-AP.

### D-12 — Disclosure-Referenzvertrag

**Empfehlung: Option a — das bestehende App-Muster wird als Referenzvertrag für alle 25 Apps kodifiziert**, angereichert um das Headless-UI-Interaktionsmuster als Soll (R-04): `<button>`-Trigger mit `aria-expanded`/`aria-controls`, Content mit `hidden`-Attribut, Enter/Space nativ, sichtbarer `focus-visible`-Ring. Es wird **keine** Bibliothek eingeführt — Headless UI ist Muster-Referenz, nicht Dependency (Leitplanke Vanilla-JS).
**Begründung:** Das App-Muster erreicht die A11y-Tiefe bereits; kodifizieren kostet nichts und verhindert, dass 24 künftige Apps eigene, schlechtere Disclosures bauen.
**Verworfen:** Nichts ändern/nichts dokumentieren (b) — funktioniert für die eine App, skaliert aber nicht als Vertrag.
**Wirkung:** Disclosure ist ab sofort ein fertiges Rezept inkl. A11y — null Entwurfsaufwand pro App.
**Nutzerentscheidung:** Nein (laut Docket direkt durch Fable entscheidbar; hiermit entschieden).

### D-13 — Utilities vs. extrahierte Komponenten

**Empfehlung: Option c — rohe Utilities im Markup, wiederkehrende Kombinationen als benannte JS-Klassen-Konstanten (vollständige Literalstrings), kein `@apply`.** Jede App führt ihre Rezept-Konstanten (z. B. `FW_CLASSES.KPI_CARD`) am Dateikopf; die Strings stammen wörtlich aus diesem Vertrag. Der Vergleich am KPI-Karten-Beispiel: (a) pure Utilities verstreuen denselben 7-Utility-String über jede `createElement`-Stelle; (b) `@apply` erzeugt eine zweite CSS-Komponentensprache, von der Tailwind selbst abrät und die die Leitentscheidung unterläuft; (c) hält den String an genau einer benannten Stelle pro App, bleibt zu 100 % scanner-sichtbar (Literal!) und macht `app.js`-Code lesbar.
**Begründung:** Bei JS-generiertem DOM (der Normalfall der App-Fabrik) ist (c) die einzige Variante, die Lesbarkeit, Build-Sicherheit und Tailwind-Idiomatik gleichzeitig hält.
**Verworfen:** `@apply`-Komponentenklassen (b) — kurzfristig hübsch, langfristig ein paralleles Design-System.
**Wirkung:** Einheitliches Muster für alle 25 Apps: Vertrag definiert Strings, App importiert sie als Konstanten, Markup bleibt Utility-pur.
**Nutzerentscheidung:** Ja — Freigabe des Musters (Teil der Gesamtabnahme).

### D-14 — Build-Sicherheits-Konvention

**Empfehlung: Option a — die Literalregel (Abschnitt 2.2) gilt ab sofort als verbindliche Coding-Konvention für alle Apps und die Engine**, nicht erst ab T1. Sie wird Prüfpunkt jedes App-Reviews („kein `${` und kein `+` innerhalb eines Klassenstrings"); eine Lint-Regel ist wünschenswert, aber nicht Voraussetzung.
**Begründung:** Das Risiko wächst mit jeder migrierten App; nachträgliches Einsammeln dynamischer Klassen ist teurer als die Regel von Anfang an. Der Bestand (app.js, fw-janitor.js) erfüllt sie heute bereits — es gibt nichts zu reparieren, nur nichts zu verschlechtern.
**Verworfen:** Erst bei T1 regeln (b) — verlagert ein bekanntes Risiko genau in die Phase mit der meisten neuen Codemenge.
**Wirkung:** T1 (lokaler Build mit Purge) wird ein mechanischer Schritt statt einer Klassen-Archäologie über 25 Apps.
**Nutzerentscheidung:** Nein (laut Docket durch Fable festlegbar; hiermit festgelegt — Albert zur Kenntnis).

### D-15 — Trennung Testharness/Produktion

**Empfehlung: Bestätigt — die Trennung bleibt vollständig unangetastet.** `fw-test-*`-Klassen und `tests/shared/test-page.css` bleiben Tailwind-frei; das CDN-Verbot des TEST_PAGE_STANDARD §10 für dauerhafte Testseiten bleibt in Kraft. Die Migration führt Tailwind ausschließlich in Produktions-Markup ein; Testseiten testen die App **mit** deren Produktionsklassen, stylen ihr eigenes Chrome aber weiterhin ohne Tailwind. Der bekannte `#ddd`-Border in 13 Testseiten (F-01) bleibt, wie von Albert entschieden, bis zur Tailwind-Arbeit zurückgestellt und wird hier nicht angefasst.
**Verworfen:** Keine Optionen — Bestätigungsfrage.
**Wirkung:** Keine; genau das ist der Punkt.
**Nutzerentscheidung:** Nein.

### D-16 — Reihenfolge der drei Standalone-Prototypen

**Empfehlung: Option a — nach der Haupt-App, als Neuaufbau auf dem Baukasten statt In-place-Umbau.** Reihenfolge: (1) Pilot `prokrastinations-preis` stabilisieren, (2) Engine-DOM-Chrome-AP, (3) die drei Prototypen einzeln in die App-Fabrik aufnehmen — dabei wird jeweils das UI auf Baukasten-Primitiven neu aufgesetzt und nur die Fachlogik übernommen (die CI-fremden Token-Systeme inkl. Fremd-Fonts werden verworfen, nicht konvertiert). Bis dahin bleiben sie, wie bereits entschieden, funktionsfähig im Ist-Zustand.
**Begründung:** Der Baukasten muss sich erst am Piloten beweisen; drei parallele Baustellen mit je eigenem Token-System zu konvertieren wäre die teuerste Route zum selben Ziel. Neuaufbau ist bei „eigenes komplettes Designsystem im `<style>`-Block" billiger und sauberer als Umbau.
**Verworfen:** Dauerhafter Sonderstatus (c) — würde die CI-Inkonsistenz auf Dauer stellen; „bewusste Übergangs-Divergenz" ist als Übergang definiert, nicht als Endzustand.
**Wirkung:** Klare T1-Vorstufen-Reihenfolge; die drei Apps werden zu normalen Baukasten-Apps statt ewigen Ausnahmen.
**Nutzerentscheidung:** Ja — Priorisierung, welche der drei zuerst und in welchem Zeithorizont (T1-Feinplanung).

---

## 4. Responsive-Vertrag

**Apps (generische UI):** Mobile-first. Erlaubte Präfixe: `sm:` (640), `md:` (768), `lg:` (1024). `xl:`/`2xl:` sind für in Artikel eingebettete Apps ohne Anwendungsfall und bleiben ungenutzt. Basisklassen beschreiben den mobilen Zustand; Präfixe erweitern aufwärts. Max-width-Denke aus dem Bestand wird bei Migration gedreht.

**App-Mechanik:** Sonderbreakpoints (Rubikon 480/1024px) bleiben in app-lokalem CSS und werden im App-Kopf als Mechanik deklariert (D-07). Sie sind kein Präzedenzfall für UI-Layout.

**Chart-Engine:** Behält ihren Container-Query-Vertrag (`@container fw-chart`, Grenze 450px, 2 Zonen — D-10). Die Koexistenz Viewport-Breakpoints (App) / Container-Queries (Engine) ist eine bewusste, dokumentierte Duldung bis zum Engine-AP; sie ist unkritisch, weil die Zuständigkeiten nicht überlappen (Ein-Container-Vertrag, D-04).

**Reduced Motion:** Jede Transition/Animation in Primitiven trägt `motion-reduce:transition-none` bzw. `motion-reduce:animate-none`. App-Mechanik behandelt `prefers-reduced-motion` weiterhin in ihrem lokalen CSS (Bestand bleibt).

**Zustands-Varianten:** Interaktive Primitiven definieren immer alle vier: `hover:`, `focus-visible:` (nie `focus:` allein), `active:`, `disabled:`. Fokusring einheitlich: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500 focus-visible:ring-offset-2`.

---

## 5. Surface-Taxonomie und Struktur-Zuordnung

### 5.1 Drei Ebenen

| Ebene | Definition | Fläche | Radius | Schatten | Border | Beispiele |
|---|---|---|---|---|---|---|
| **Section** | Unsichtbarer Gliederungsabschnitt; ordnet nur | nie | — | nie | nie | Screen-Inhalt, Slider-Bereich, Chart-Slot |
| **Panel** | Größerer Layoutabschnitt mit innerem Zusammenhalt | Standard: keine; Ausnahme: `bg-bg-faint` für genau einen hervorgehobenen Abschnitt pro Screen | `rounded-xl` (nur mit Fläche) | nie | nie | Stationen-/Story-Bereich, Annahmen-Umfeld, Chart-Chrome-Innenaufbau |
| **Card** | Kleine, in sich geschlossene Informationseinheit | immer (`bg-surface`) | `rounded-lg` | nur bei Interaktivität `shadow-soft`, Hover-Lift `shadow-hover` | nie (Ausnahme: Error-State) | KPI-Karte, Legend-Pill (Sonderform `rounded-full`) |

### 5.2 Zuordnungs- und Verbotsregeln

Eine Fläche ist eine Card, wenn sie allein stehen könnte und eine einzige Aussage trägt; sie ist ein Panel, wenn sie mehrere Unterelemente eines Themas bündelt; sonst ist sie eine Section. **Verboten:** Card in Card (getönte Fläche in getönter Fläche); Panel-Flächenton als Dekoration (mehr als ein getöntes Panel pro Screen); Border als Trennmittel, wo `gap-*` genügt; Schatten auf nicht-erhobenen Elementen.

### 5.3 Kanonische Struktur-Zuordnung (D-09)

| Primitive | Radius | Schatten | Border | Kern-Spacing |
|---|---|---|---|---|
| App-Shell | — | — | — | `p-4 md:p-6` |
| Panel (mit Fläche) | `rounded-xl` | — | — | `p-4 md:p-6`, innen `gap-3` |
| Card / KPI | `rounded-lg` | — | — | `px-4 py-2`, Gruppe `gap-4` |
| Button primary/secondary/ghost | `rounded-md` | — | secondary: `border border-border` | `px-4 py-2` |
| Segmented-Gruppe / -Option | `rounded-md` / `rounded` | aktive Option `shadow-soft` | — | Gruppe `p-0.5 gap-0.5`, Option `px-2.5 py-1` |
| Legend-Pill | `rounded-full` | `shadow-soft`, hover `shadow-hover` | — | `px-3 py-1`, Gruppe `gap-2` |
| Popover/Dialog | `rounded-xl` | `shadow-hover` | — | `p-4`, `max-w-sm` |
| Callout/Assumptions | — | — | `border-l-2 border-border` (Akzentkante) | `pl-4` |
| Error-State | `rounded-lg` | — | `border border-error-border` (funktional) | `p-4` |
| Slider/Input | `rounded-md` (wo stylbar) | — | Konturen funktional erlaubt | Feld `gap-x-4 gap-y-2` |

Tailwind-eigene `shadow-sm`…`shadow-2xl`: in der App-Fabrik ungenutzt (genau zwei Schattenstufen, D-09).

---

## 6. Primitive-Verträge

Jeder Vertrag: Zweck und Abgrenzung, semantisches HTML, vollständiges Klassenrezept (Literalstrings — wörtlich zu übernehmen), Varianten, Zustände, Responsive, A11y, Surface-Regel-Einordnung, Besitzer, Migrationshinweis (konzeptionell, kein Code).

### 6.1 App-Shell

**Zweck:** Wurzel jeder App-Instanz; Scope-Anker gegen den Ghost-Artikel, Mount-Punkt für JS, Träger der `data-fw-state`-Zustände. **Nicht verwenden für:** innere Abschnitte, Chart-Container, Testseiten-Chrome.
**HTML:** `<div class="fw-app …" data-fw-state="content">` (bestehende `data-fw-initialized`-Guard-Logik unverändert).
**Rezept:** `fw-app relative box-border w-full min-h-48 bg-bg font-body text-text p-4 md:p-6`
**Varianten:** keine. **Zustände:** über `data-fw-state` (siehe 6.10), nicht über Klassenwechsel. **Responsive:** nur Padding-Stufe (`p-4 md:p-6`). **A11y:** Shell trägt selbst keine Rolle; Live-Region ist eigenes Kind-Element (6.9).
**Surface-Regel:** Grundfläche `bg-bg` = Papier; keine Border/Schatten — die App grenzt sich vom Artikel durch die Ghost-Card-Einbettung und Abstand ab, nicht durch einen Rahmen.
**Besitzer:** Baukasten. **Migration:** `.fw-app`-Regelblock in `app.css` löst sich bis auf die App-Mechanik-Properties (`--fw-card-to-point-flight-duration` u. a.) auf; diese wandern in einen als Mechanik kommentierten Block. `min-height: 200px` → `min-h-48` (192px, Rundung dokumentiert).

### 6.2 Panel

**Zweck:** Bündelt mehrere Unterelemente eines Themas (Stationen-Bereich, Annahmen-Umfeld). **Nicht verwenden für:** Einzel-Kennzahlen (Card), reine Reihenfolge-Gliederung (Section), Dashboard-Kachel-Optik.
**HTML:** `<section>` mit Überschrift, wo inhaltlich sinnvoll.
**Rezept (Standard, flächenlos):** `flex flex-col gap-3`
**Rezept (hervorgehoben, max. 1× pro Screen):** `flex flex-col gap-3 rounded-xl bg-bg-faint p-4 md:p-6`
**Varianten:** nur die zwei obigen. **Zustände:** keine (Panels sind nicht interaktiv). **Responsive:** Padding-Stufe. **A11y:** Überschriften-Hierarchie fortführen (h2/h3), `tabindex="-1"` auf der Panel-Headline, wenn sie JS-Fokusziel ist (Bestandsmuster).
**Surface-Regel:** Trennung primär durch `gap`/Margin zum Nachbarn; Flächenton ist die markierte Ausnahme; nie Schatten/Border.
**Besitzer:** Baukasten. **Migration:** `.fw-app__station-area` wird Panel (Standard-Variante) + app-lokale Mechanik-Klasse für den Kartenflug (bleibt `fw-app__*`/`--fw-*`, D-Leitplanke).

### 6.3 Card / Stat (KPI)

**Zweck:** Eine in sich geschlossene Kennzahl oder Mini-Aussage. **Nicht verwenden für:** Container mit mehreren Themen (Panel), Buttons, verschachtelte Cards.
**HTML:** Gruppe als `<dl>`, Karte als `<div>` mit `<dt>`/`<dd>` (Bestandssemantik bleibt).
**Rezepte:**
- Gruppe: `flex flex-wrap gap-4 mt-4`
- Karte: `flex-1 basis-36 rounded-lg bg-surface px-4 py-2`
- Label (`dt`): `mb-1 text-sm text-text-muted`
- Wert (`dd`): `m-0 text-2xl font-bold text-text`
**Varianten:** Akzent-Wert für die eine hervorzuhebende Kennzahl: `dd` mit `text-primary` statt `text-text` (max. 1× pro Gruppe). **Zustände:** keine — KPI-Cards sind nicht klickbar; wird eine Kennzahl interaktiv, ist sie ein Button/Disclosure, keine Card-Erweiterung. **Responsive:** `flex-wrap` + `basis-36` erledigen S/M/L ohne Präfixe. **A11y:** `dl/dt/dd` nativ; Wertänderungen meldet die Live-Region (6.9), nicht die Karte.
**Surface-Regel:** Flächenton ja (`bg-surface`), Schatten nein (liegt auf, nicht erhoben), Border nie.
**Besitzer:** Baukasten (App-Seite). Engine-BAN ist eigenes Primitive derselben Stat-Familie (D-05, Rezeptteile Label/Wert identisch).
**Migration:** `.fw-app__kpi-cards/-card` 1:1 ersetzbar; `140px`-Basis → `basis-36` (144px), `4px`-Radius → `rounded-lg` (Vereinheitlichung auf Theme-Kontinuität, D-09), Schriftgrößen `0.8em/1.4em` → `text-sm`/`text-2xl` (Rundung auf Typo-Skala).

### 6.4 Button-Familie

**Zweck:** Alle klickbaren Aktionen der App-Fabrik. **Nicht verwenden für:** Links zu anderen Seiten (`<a>` mit Link-Farbe), Legend-Toggles (eigenes Primitive 6.11), Disclosure-Trigger (6.8).
**HTML:** immer `<button type="button">` (Bestandsregel bleibt).
**Basis (alle Varianten):** `inline-flex items-center justify-center rounded-md px-4 py-2 font-bold transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none`
**Varianten (vollständige Zusatzstrings, als Map zu führen):**
- `primary`: `bg-primary text-white hover:bg-petrol-700 active:bg-petrol-800`
- `secondary`: `border border-border bg-bg text-text hover:bg-bg-faint active:bg-surface`
- `ghost`: `text-primary hover:bg-petrol-50 active:bg-petrol-100`
- `toolbar`: siehe Control-Group 6.5 (kompakte Segmented-Option, eigenes Rezept)
**Zustände:** hover/active per Variante; focus-visible/disabled in der Basis; kein `focus:`-Ring ohne `-visible`.
**Responsive:** Standard keine Präfixe; der Journey-CTA nutzt die Kompositionsregel `w-full sm:w-auto` (ersetzt den 600px-Bestandsumbruch, D-07).
**A11y:** echtes `<button>`, Fokusring immer sichtbar, `disabled` nativ.
**Surface-Regel:** Primary trennt durch Farbfläche, Secondary durch funktionale Kontur (erlaubte Border), Ghost nur durch Textfarbe + Hover-Ton.
**Besitzer:** Baukasten. **Migration:** `fw-app__btn/--next/--prev/--journey/fw-app__cta` → Varianten-Map (`--next`=primary, `--prev`=secondary oder ghost je Kontext, `--journey`=primary+`w-full sm:w-auto`, `cta`=primary am Flow-Ende, genau einer pro App, D-06). Engine-`fw-btn` wechselt erst im Engine-AP.

### 6.5 Control-Group / Segmented Control

**Zweck:** Auswahl genau einer Option aus wenigen (Zeitraum, Chart-Modus). **Nicht verwenden für:** Aktionen (Buttons), Mehrfachauswahl, Navigation.
**HTML:** `<div role="group" aria-label="…">` mit `<button type="button" aria-pressed="true|false">` je Option.
**Rezepte:**
- Gruppe: `inline-flex rounded-md bg-bg-faint p-0.5 gap-0.5`
- Option (inaktiv): `rounded px-2.5 py-1 text-sm text-text-sec transition-colors motion-reduce:transition-none hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500`
- Option (aktiv, vollständiger Alternativ-String): `rounded px-2.5 py-1 text-sm font-semibold bg-bg text-primary shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500`
**Zustände:** aktiv/inaktiv als vollständiger String-Tausch aus der Map (Literalregel 2.2); hover nur inaktiv; disabled wie Button-Basis.
**Responsive:** Bei Enge bricht die Gruppe per Elternlayout um (`flex-wrap` im Träger); Engine-seitig übernimmt die Container-Query der Engine (Bestand).
**A11y:** `aria-pressed` verbindlich (schließt die Befund-Lücke des Bestands konzeptionell); Tastatur nativ über Buttons.
**Surface-Regel:** Gruppe = leiser Flächenton als „Schiene", aktive Option hebt sich durch helle Fläche + `shadow-soft` — keine Border.
**Besitzer:** Baukasten; Engine-Toolbar (`fw-btn-group`/`fw-toggle`) übernimmt dieses Rezept im Engine-AP.
**Migration:** konzeptionell 1:1; `active`-Klassen-Anhängsel des Bestands wird String-Tausch.

### 6.6 Slider-Field

**Zweck:** Numerische Eingabe mit Label und Live-Wertanzeige — das Kern-Eingabemuster der Rechner-Apps. **Nicht verwenden für:** diskrete Optionswahl (Segmented), Texteingabe.
**HTML:** `<label>` umschließt Labeltext, `<input type="range">` und Wertanzeige (Bestandsstruktur inkl. ARIA bleibt: `aria-valuemin/max/now/text`).
**Rezepte:**
- Feld: `my-4`
- Label-Zeile: `flex flex-wrap items-center gap-x-4 gap-y-2 cursor-pointer`
- Labeltext: `shrink-0 text-sm text-text-muted`
- Slider: `min-w-0 flex-1 basis-40 cursor-pointer accent-primary`
- Wert: `min-w-[7ch] shrink-0 text-right font-bold text-text`
**Zustände:** Fokus auf dem nativen Input: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500 focus-visible:ring-offset-2`; disabled: `disabled:opacity-50 disabled:cursor-not-allowed`.
**Responsive:** `flex-wrap` + `basis-40` — kein Breakpoint nötig. **A11y:** vollständiger Bestandsvertrag bleibt (Befund: bereits vollständig); Wertanzeige zusätzlich zur `aria-valuetext`.
**Surface-Regel:** reines Abstands-Primitive, keine Fläche.
**Besitzer:** Baukasten. **Migration:** `fw-app__slider-*` 1:1; `--fw-space-*`-Nutzungen gehen in `gap-x-4 gap-y-2`/`my-4` auf (D-08); `accent-color` → `accent-primary`. `min-w-[7ch]` = dokumentierte inhaltsgetriebene Ausnahme (2.3).

### 6.7 Callout / Assumptions

**Zweck:** Annahmen, Disclaimer, methodische Hinweise — leise Randinformation. **Nicht verwenden für:** Fehler (Status-State), Ergebnisse (Stat), redaktionelle Ghost-Content-Boxen (fw-janitor, außerhalb Scope).
**HTML:** `<aside>` mit optionaler Mikro-Überschrift.
**Rezept:** `border-l-2 border-border pl-4 text-sm text-text-muted`
**Varianten:** keine in V0.1 (Info/Warn-Färbungen erst bei belegtem Bedarf — bewusst gegen Callout-Inflation). **Zustände:** keine. **Responsive:** keins nötig. **A11y:** `<aside>` genügt; kein `role="note"` erforderlich.
**Surface-Regel:** die Akzentkante ist die vertraglich erlaubte funktionale Border (D-02 Punkt 4); keine Fläche, kein Schatten.
**Besitzer:** Baukasten. **Migration:** `.fw-app__assumptions` 1:1; `3px`-Kante → `border-l-2` (Rundung).

### 6.8 Disclosure

**Zweck:** Optionale Vertiefung (Zwischenwerte, Methodik) ein-/ausklappen. **Nicht verwenden für:** Screen-Navigation, Modals, Akkordeon-Landschaften (max. wenige pro App).
**HTML:** `<button type="button" aria-expanded="false" aria-controls="ID">` + Content-Element mit `hidden`-Attribut (Referenzvertrag D-12, Headless-UI-Muster ohne Bibliothek).
**Rezepte:**
- Trigger: `flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm font-semibold text-text-sec transition-colors motion-reduce:transition-none hover:bg-bg-faint hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500`
- Indikator (Chevron-Span): `transition-transform motion-reduce:transition-none` + offener Zustand `rotate-180` (Literal-Toggle)
- Content: `mt-2 pl-3`
**Zustände:** offen/geschlossen über `hidden` + `aria-expanded` + Chevron-Klasse; hover/focus-visible am Trigger.
**Responsive:** keins nötig. **A11y:** `aria-expanded`/`aria-controls` verbindlich; Enter/Space nativ; Fokus bleibt auf dem Trigger beim Toggling.
**Surface-Regel:** kein Flächenton im Ruhezustand; Hover-Ton als Affordanz.
**Besitzer:** Baukasten. **Migration:** `.fw-app__collapsible-*` erfüllt den Vertrag bereits funktional; nur Klassenrezepte wechseln.

### 6.9 ARIA-Live-Region

**Zweck:** Unsichtbare Ansage von Wert-/Zustandsänderungen. **Nicht verwenden für:** sichtbare Statusanzeigen.
**HTML:** `<div class="sr-only" aria-live="polite" aria-atomic="true">`
**Rezept:** `sr-only` (ersetzt `.fw-app__visually-hidden` 1:1; auch die Engine-Screenreader-Tabelle wechselt im Engine-AP auf `sr-only` statt `left:-9999px`).
**Besitzer:** Baukasten. **Migration:** trivial; Verhalten identisch.

### 6.10 Status-States (Loading / Empty / Error)

**Zweck:** Einheitliches Zustandsvokabular (D-11) für App-weite und chart-lokale Zustände. **Nicht verwenden für:** Validierungshinweise an einzelnen Feldern.
**Träger App:** `data-fw-state` auf der Shell (Bestandsmechanik bleibt). **Träger Chart:** Engine-Container (Engine-AP übernimmt Rezepte).
**Rezepte:**
- Loading-Fläche: `opacity-60` + Spinner `h-8 w-8 animate-spin motion-reduce:animate-none rounded-full border-4 border-border border-t-primary` in einem Zentrier-Wrapper `flex items-center justify-center p-6`, Träger mit `role="status"` und `sr-only`-Text „Wird geladen"
- Empty: `p-4 text-text-muted` + erklärender Satz, `role="status"`
- Error: `rounded-lg border border-error-border bg-error-bg p-4 text-error-text` + `role="alert"`, Icon/Präfix + Text (nie Farbe allein, CI-POOL §7.7)
**Zustände/Responsive:** keine weiteren. **A11y:** Rollen wie oben verbindlich; Engine-Loading erhält `role="status"` im Engine-AP (heute Lücke, Befund).
**Surface-Regel:** Error ist die vertragliche Border-Ausnahme (funktionaler Rahmen); Loading/Empty arbeiten nur mit Ton und Abstand.
**Besitzer:** Vokabular Baukasten; Trägerimplementierungen App bzw. Engine.
**Migration:** `data-fw-state`-Selektoren in `app.css` werden zu Klassenrezepten im JS-State-Wechsel (Map vollständiger Strings) oder bleiben als schlanke Attribut-Selektoren, die nur noch Utilities zusammenfassen — Entscheidung liegt beim Pilot-AP; der visuelle Vertrag ist hiermit fix.

### 6.11 Chart-Chrome (DOM-Vertrag der Engine)

**Zweck:** Tailwind-fähiger DOM-Rahmen um jedes Chart: Außencontainer, Titel, Toolbar, Legende, BAN, Zustände, Popover, Caption. **Nicht verwenden für / harte Grenze:** alles innerhalb des Canvas — Chart.js-Datasets, Scales, Plugins, Marker, Chart.js-Tooltips bleiben unberührt (Nicht-Scope).

**Canvas-Inventar (explizit KEIN Tailwind-/Baukasten-Scope — niemals mit Utilities stylen):**
Chart.js-Tooltips (Linie und Balken, alle Ansichten: Asset-/Zeitschiene); Crosshair-Linie (`CrosshairPlugin`);
der auf den Linien mitlaufende Maus-Punkt; senkrechte Markerlinien (`FwVerticalLinePlugin`, z. B. die blaue Linie);
in den Canvas gezeichnete Texte und Elemente der Plugins (`FwChartTextPlugin`, `FwAnnotationPulsePlugin`,
`CenterTextPlugin`/Donut-Loch). Diese Elemente sind über die Theme-Bridge (KDR 14) bereits CI-token-gesteuert
(Plugins beziehen Farben aus Engine-Options, Hex nur als defensive Fallbacks — verifiziert 2026-07-12).
Offener Prüfpunkt für den Engine-DOM-AP: Tooltip-Optik (Hintergrund/Schrift) vollständig token-konform?
**HTML-Vertrag (Reihenfolge fix, jeder Slot optional):** Wrapper → Titel (`h3`) → BAN → Toolbar → Legende → Canvas-Container (`<canvas>` unangetastet) → Caption. Das ist die reale Bestandsreihenfolge aus `FwRenderer.js setupStructure()` (Titel, BAN zwischen Titel und Toolbar, Legende vor dem Canvas) — sie wird übernommen, nicht neu erfunden. Dieselbe Struktur trägt Linie, Balken und Donut — Chart-Typ ändert nur den Canvas-Inhalt und ggf. welche Slots belegt sind (Beispiele: Abschnitt 10).
**Rezepte:**
- Wrapper: `flex flex-col gap-3` (im App-Kontext ohne eigene Fläche — die App liefert den Grund; Standalone-Nutzung darf `rounded-xl bg-bg p-4` ergänzen)
- Titel: `m-0 text-lg font-bold text-primary`
- Toolbar: `flex flex-wrap items-center gap-2` (+ Control-Group-Rezepte 6.5)
- BAN: Container `inline-block min-w-48 rounded-lg bg-bg-faint px-4 py-3` mit `aria-live="polite"` (spiegelt die Bestandsoptik: getönte, gerundete Inline-Box; Ton-in-flächenlosem-Chrome ist Card-analog erlaubt); Hauptwert `text-xl font-bold text-text` (Zone >450px: `text-2xl` via Engine-Container-Query); Subzeile `text-sm text-text-sec`; Hinweis `text-sm text-text-sec`
- Canvas-Container: `relative w-full` (Höhensteuerung bleibt Engine/Chart.js — kein Tailwind-Eingriff)
- Legende: Gruppe `flex flex-wrap gap-2`; Pill `inline-flex cursor-pointer select-none items-center gap-2 rounded-full bg-bg px-3 py-1 text-sm shadow-soft transition-shadow motion-reduce:transition-none hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petrol-500`; Pill (Serie ausgeblendet, vollständiger Alternativ-String): zusätzlich `opacity-40 grayscale`; Dot `h-2.5 w-2.5 rounded-full` mit **Inline-Style-Farbe aus der Engine-Serienfarbe** (dokumentierte Nicht-Tailwind-Ausnahme, 2.2 Punkt 5); Pills werden `<button type="button" aria-pressed>` (schließt F-09 konzeptionell)
- Caption: `text-xs text-text-muted`
- Popover: Backdrop `fixed inset-0 z-40 bg-black/30 backdrop-blur-sm`; Box `fixed z-50 w-11/12 max-w-sm rounded-xl bg-bg p-4 shadow-hover`; Kopf `flex items-center justify-between gap-2 font-bold text-text`; Zeile `flex items-center justify-between gap-2 py-1 text-sm`; Fußbutton = Button `secondary`. Soll-Verhalten (Engine-AP): Fokus-Trap, Escape, Fokus-Rückgabe — Headless-UI-Dialog als Muster-Referenz (D-12-Analogie), keine Bibliothek.
**Zustände:** Loading/Empty/Error nach 6.10 im Canvas-Container-Slot.
**Responsive:** Engine-Container-Query, 2 Zonen (D-10): Zone S stapelt Toolbar unter den Titel und lässt Pills umbrechen — beides leistet `flex-wrap` bereits, die Engine behält ihre `@container`-Steuerung für Sonderfälle.
**Surface-Regel:** Das Chrome selbst ist flächenlos im App-Kontext (Ein-Container-Vertrag D-04 vermeidet Doppelrahmen); Elevation nur an Pills (soft) und Popover (hover).
**Besitzer:** Chart-Engine; dieses Rezept ist der verbindliche Zielvertrag für den Engine-DOM-AP.
**Migration:** `fw-chart-title`, `fw-chart-toolbar`, `fw-btn-group`, `fw-chart-legend`, `fw-ban-*`, `fw-popover-*`, `fw-loading-container` wechseln im Engine-AP auf diese Literalrezepte (als JS-Konstanten, D-13); `className`-Zuweisungen in `FwRenderer.js` sind heute schon Literale — die Umstellung ist ein Stringtausch, kein Strukturumbau.

---

## 7. Kompositionen

Kompositionen kombinieren Primitiven; sie führen keine neuen Rezepte ein, nur Anordnungsregeln.

**Screen-Flow:** Screens sind Sections (`flex flex-col gap-6`), Sichtbarkeit über `hidden`-Attribut (Bestandsmechanik). Screen-Headline `text-xl font-bold text-text` mit `tabindex="-1"` als Fokusziel, Subline `text-sm text-text-muted`. Fortbewegung: primary (weiter) / ghost oder secondary (zurück) in einer Zeile `flex flex-wrap gap-3 mt-6`.

**KPI-Ergebnisgruppe:** Stat-Gruppe (6.3) direkt unter der Ergebnis-Headline; maximal eine Akzent-Kennzahl; darunter optional Disclosure „Zwischenwerte" (6.8) und Callout „Annahmen" (6.7) — in dieser Reihenfolge, getrennt nur durch `gap`.

**Chart mit Toolbar und Legende:** Chart-Chrome (6.11) im App-Chart-Slot (`relative mt-6`, sonst nichts — D-04). Toolbar vor dem Canvas, Legende danach, Caption zuletzt.

**Stationen-/Story-Bereich:** Panel (Standard, flächenlos) mit Quellen-Label `text-xs uppercase tracking-wide text-text-muted`, Story-Headline `text-lg font-bold text-text` (`tabindex="-1"`), Fließtext `text-sm text-text-sec`. Flug-Mechanik dockt per app-lokaler Zusatzklasse an (Besitzgrenze, Abschnitt 1).

**Abschluss-CTA:** Genau ein primary pro App, am Ende des Flows, `w-full sm:w-auto`; flankierender Sekundärlink höchstens als ghost. Kein CTA-Duplikat in früheren Screens (D-06).

---

## 8. A11y-Vertrag (Zusammenfassung)

Verbindlich für jedes Primitive und jede App: echte `<button type="button">` für Aktionen; sichtbarer Einheits-Fokusring (`focus-visible:ring-2 ring-petrol-500`, mit Offset auf Flächen); `aria-expanded`/`aria-controls` an jedem Disclosure; `aria-pressed` an jedem Toggle (Segmented, Legend-Pill); `role="status"`/`role="alert"` nach 6.10; `aria-live="polite"`-Region pro App (6.9) und an der BAN; `aria-valuemin/max/now/text` an Slidern; Fokusführung bei Screenwechsel über `tabindex="-1"` + `.focus()` (Bestand bleibt); `motion-reduce:`-Variante an jeder Transition; Status nie durch Farbe allein (Icon/Text zusätzlich); Mehrfachinstanz-Fähigkeit: alle `aria-controls`/`id`-Paare instanzpräfixiert (Bestandsmechanik). SafeDOM-Regeln (createElement + textContent, kein innerHTML mit Fremddaten) bleiben unberührt in Kraft.

---

## 9. Anwendung auf `prokrastinations-preis` (konzeptionelle Migrationskarte)

| Bestand (`app.css`/`app.js`) | Ziel-Primitive | Hinweis |
|---|---|---|
| `.fw-app` (Basis) | App-Shell 6.1 | Mechanik-Properties bleiben als deklarierter Mechanik-Block |
| `data-fw-state`-Blöcke | Status-States 6.10 | Rezepte identisch abgebildet (Error-Border bleibt funktionale Ausnahme) |
| `.fw-app__screen`, Headline/Subline | Screen-Flow 7 | `hidden`-Mechanik und Fokusführung unverändert |
| `.fw-app__kpi-cards/-card` | Card/Stat 6.3 | Rundungen: 140→`basis-36`, 4px→`rounded-lg`, em→Typo-Skala |
| `.fw-app__slider-*` | Slider-Field 6.6 | ARIA-Vertrag unverändert; `--fw-space-*` entfällt (D-08) |
| `.fw-app__btn*`, `.fw-app__cta` | Button-Familie 6.4 | Varianten-Map; Journey = primary + `w-full sm:w-auto` (600→`sm:`) |
| `.fw-app__station-area*` | Panel 6.2 + Story-Komposition 7 | Flug-Mechanik bleibt app-lokal angedockt |
| `.fw-app__collapsible*` | Disclosure 6.8 | funktional bereits vertragskonform |
| `.fw-app__intermediate-values` | Section mit `grid grid-cols-2 gap-x-4 gap-y-1` | direkter Grid-Ersatz |
| `.fw-app__assumptions` | Callout 6.7 | 3px→`border-l-2` |
| `.fw-app__visually-hidden` | `sr-only` 6.9 | 1:1 |
| `.fw-app__chart-section` | Chart-Slot (D-04) | nur `relative mt-6`; alles Sichtbare gehört der Engine |
| Flug/Rubikon (`--fw-*`, Sonderbreakpoints) | Lokale App-Mechanik | unangetastet, deklariert, kein Primitive |

Ergebnis der Pilotmigration (Folge-AP, nicht hier): `app.css` schrumpft auf App-Mechanik + evtl. schlanke `data-fw-state`-Sammler; alle Gestaltung liegt in Vertragsrezepten. `--fw-space-*`-Grep = leer (Abnahmekriterium D-08).

---

## 10. Anwendung auf Linie / Balken / Donut

Hinweis zur Benennung: Der „Torten"-Typ ist im Bestand ein **Donut** (`PieChartStrategy`: `type: 'doughnut'`, `cutout: '70%'`, Segment-Labels und Chart.js-Tooltips deaktiviert, Kennzahl im Loch via `CenterTextPlugin`). Alles davon ist Canvas-/Engine-Sache und bleibt unangetastet — die Mockup-Platzhalter imitieren dieses Ist-Bild lediglich.

Derselbe DOM-Vertrag (6.11), drei Belegungen — Nachweis, dass das Chrome chart-typ-agnostisch ist:

| Slot (Bestandsreihenfolge) | Linie (z. B. Sparplanverlauf) | Balken (z. B. Jahresrenditen) | Donut (z. B. Allokation) |
|---|---|---|---|
| Titel | ja | ja | ja |
| BAN | Endwert, `aria-live` (Bestand: nur Linie — Ausweitung auf Balken/Donut ist Engine-AP-Option) | Durchschnittswert (optional) | meist entbehrlich — die zentrale Kennzahl steht beim Donut bereits im Loch (`CenterTextPlugin`, Canvas-Sache) |
| Toolbar | Zeitraum-Segmented (1/5/10 J) | Modus-Segmented (nominal/real) | oft leer — Slot entfällt ersatzlos |
| Legende (vor dem Canvas) | Pills je Serie, `aria-pressed`-Toggle | Pills je Serie | Pills je Segment (Toggle je nach Chartlogik — Engine entscheidet) |
| Canvas | Linienchart (Engine/Chart.js, unangetastet) | Balkenchart (dito) | Donut, `cutout: '70%'`, Kennzahl im Loch (dito) |
| Caption | Quelle/Methodik | Quelle | Quelle |
| Zustände | 6.10 im Canvas-Slot | dito | dito |

Kein Slot erzwingt chart-typ-spezifisches Chrome; Unterschiede sind Belegung, nie Struktur. Das Canvas-Innenleben (Achsen, Marker, Chart.js-Tooltips, Farben der Serien) bleibt in allen drei Fällen vollständig Engine-/Chart.js-Sache.

---

## 11. Bewusst lokale Ausnahmen (kein Baukasten-Material)

Card-to-Point-Flug (Klassen + `--fw-card-to-point-flight-duration`), Rubikon-Overlay inkl. Sonderbreakpoints 480/1024px, `--fw-screen3-reveal-fade-duration` und künftige vergleichbare Mechanik: bleiben app-lokal unter `fw-app__*`/`--fw-*`, deklariert im App-Kopf, ohne Verallgemeinerungsanspruch. Bridge-only-Tokens (`--color-grid`, `--color-zero-line`, `--color-loader-bg`): keine Utilities. Testharness (`fw-test-*`, `test-page.css`): Tailwind-frei (D-15). Die drei Standalone-Prototypen: Ist-Zustand bis zur Neuaufnahme (D-16). `fw-janitor.js`/Content-System: außerhalb dieses Vertrags; die dort verwendeten Alt-Namensmuster (`-tint`, `-20`) sind bekannter Randbefund (F-07) und werden nicht hier gelöst.

---

## 12. Offene Nutzerentscheidungen

1. **Gesamtabnahme** dieses Konzepts + Visual Boards (deckt die Freigaben aus D-01, D-02-Details, D-03, D-05, D-06, D-07, D-08, D-09, D-11, D-13 ab — sie sind ein zusammenhängender Vertrag, keine Einzelentscheidungen).
2. **D-04/Engine:** Timing des Engine-DOM-Chrome-Folge-APs (Zielrezepte liegen mit 6.11 vor).
3. **D-16:** Priorisierung der drei Standalone-Prototypen (welche zuerst, Zeithorizont) in der T1-Feinplanung.
4. **T1-Detail (später):** ob die CI-`extend`-Utilities im lokalen Build exakt wie in 2.1 benannt bleiben (Empfehlung: ja, Token-Name = Suffix) — formal Teil des T1-APs.

Keine Entscheidung D-01–D-16 ist blockiert; der `.hbs`-Gap (F-08) berührt nur den Auslieferungsweg, nicht diesen Vertrag (entschieden, Kopf dieses Dokuments, AP-tailwind-02a).

---

*Ende V0.1 — ENTWURF, NICHT FREIGEGEBEN. Nächster Schritt: Abnahme von Konzept + Visual Board, danach Vertrags-/Komponenten-Spec und Pilotumsetzung (Folge-AP-Kette laut Befund Abschnitt 15).*

