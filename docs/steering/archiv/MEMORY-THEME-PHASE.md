# Finanzwesir Chart Engine - Memory

## Arbeitsmodell (so arbeiten wir)

- **Dreistufig: Verstehen → Hinterfragen → Absichern.** Erst Code-Recherche und Hypothese, dann Stress-Test durch User-Rückfragen ("Was wenn...?"), dann Spec-Abgleich. Code erst, wenn die Lösung wasserdicht ist.
- **Spec ist Gesetz.** Jede Änderung muss auf eine Stelle in `docs/spec/` rückführbar sein. Wenn Code und Spec sich widersprechen, gilt die Spec.
- **Keine kosmetischen Fixes.** Korrekte Optik ergibt sich aus korrektem Code, nicht aus Label-Patches oder Display-Hacks.
- **Anfänger-verständliche Erklärungen.** User ist Fachanwender, kein Entwickler. Architektur-Konzepte in einfachen Worten, Implikationen immer mitliefern.
- **Kleine Patches, aber richtig.** Fokussierter Scope (eine Methode, eine Datei) – aber immer die architektonisch korrekte Lösung, nicht die schnellste. "Klein" heißt fokussiert, nicht niedrige Qualität.
- **Enterprise-Qualität, nicht Performance.** Kleines Projekt, wenig Last, kleine CSVs. Performance-Optimierung ist nicht nötig. Priorität ist wartbarer, erweiterbarer, sicherer Code — akzeptabel für einen Senior-Architekten bei Google/Amazon/Facebook. Goldstandard im Repo: `CSVParser.js` + `FinanzwesirData.js` (Defensive Coding, Deep Freeze, Allow-List, Gatekeeper-Pattern, actionable Errors, minimale Oberfläche).
- **UX-Qualitätskriterien.** Tufte (Data-Ink-Ratio, keine falsche Präzision), Krug (Don't Make Me Think), Nielsen (Heuristiken). Jede Maßnahme muss sowohl technisch als auch kognitiv begründbar sein.
- **Commit-Message-Template.** Auf "Commit-Message" immer dieses Format liefern:
  ```
  Typ: Kurze Zusammenfassung (50–72 Zeichen)

  - Was war das Problem?
  - Wie wurde es gelöst?
  - Warum ist die Lösung sicher (keine Regressionen)?

  Betroffene Bereiche:
  - Datei (Methode)

  Kontext:
  - Issue / Spec / Tested
  ```
- **Abschluss-Ritual (Pflicht nach jedem Code-Run).** Trigger: User sagt "fertig, finale Phase" (oder sinngemäß: "alles gefixt", "alle Aufträge ausgeführt"). Dann führt Claude selbständig und vollständig aus:
  1. **Specs aktualisieren** — alle betroffenen Dateien in `docs/spec/` auf den neuesten Stand bringen (Tabellen, Enums, Matrizen, Beispiele).
  2. **Kontext-Dateien aktualisieren** — `docs/context/KNOWN-ISSUES.md` (Punkte schließen/öffnen), `docs/context/working-features.md` (falls betroffen).
  3. **MEMORY.md aktualisieren** — Architektur-Kernwissen, offene Aufgaben, neue Patterns/Entscheidungen.
  4. **Commit-Message liefern** — im Template-Format (siehe oben).
  5. **CLAUDE.md prüfen (Ausnahme-Fall)** — Nur wenn eine neue *fundamentale Arbeitsregel* entstanden ist, die alle drei Kriterien erfüllt: (a) universell (gilt für jede Session, egal welches Thema), (b) verhaltenssteuernd (ändert *wie* Claude arbeitet, nicht *was* er weiß), (c) nicht ableitbar (ergibt sich nicht aus bestehenden Regeln). Im Normalfall: nichts tun. Wissen → MEMORY.md, nicht CLAUDE.md.
  Reihenfolge: Erst Code, dann Doku. Claude prüft proaktiv alle Touchpoints, der User muss nicht einzeln daran erinnern.

## Dauerhafte Arbeitsregeln (Dateien)

- **CSS-Konventionen:** `docs/context/CSS-KONVENTIONEN.md` — Bindend für alle CSS-Arbeiten. Eine Datei (screen.css), 7 Abschnitte, Drei-Fragen-Ritual, Verbotsliste. Kurzreferenz in CLAUDE.md Section 3.

## Architektur-Kernwissen

- **Dual-Track X-Achse:** PERIOD (Bar) vs. SNAPSHOT (Line), Weiche über `fwContext.dateSemantics`
- **BOP-Anchoring:** BarChartStrategy normiert auf Periodenstart. Fix: QUARTERLY/HALF_YEARLY→MONTHLY remapped (No-Q-Policy), andere Rhythmen unverändert
- **Rhythm-Detection (Code-Ist):** FwDateUtils.detectRhythm – PERIOD nutzt arithm. Durchschnitt, SNAPSHOT nutzt Bucket-Statistik. 6 Rhythmen: DAILY, WEEKLY, MONTHLY, QUARTERLY, HALF_YEARLY, YEARLY. **Spec-Ziel (v13):** SNAPSHOT-Erkennung wird auf CV-Heuristik umgestellt (Median + Variationskoeffizient). Code-Anpassung in Folge-AP.
- **CV-Heuristik (Spec v14, §4):** Rhythmus-Erkennung NUR für Snap + Tooltip-Formatierung, NICHT für Tick-Platzierung (v14-Abgrenzung). M (Median) einmalig aus Gesamtdatensatz (zoom-stabil). CV pro sichtbarem Fenster (zoom-dynamisch). Drei Klassen: Regulär (CV≤0,30 → M-Mapping), Lückenhaft (0,30<CV≤0,60 → wie Regulär), Erratisch (CV>0,60 oder N≤2 → T_window-Mapping).
- **fwContext ("Rucksack"):** Request-Scoped, immutable (Object.freeze), pro Render-Zyklus neu erstellt. Erweiterung um neue Felder ist spec-konform (Open-Closed, Rucksack-Spec §3). Enthält `durationYears` (exakt für feste Ranges, berechnet für 'max').
- **afterFit-Expansion:** Berechnung direkt in afterFit (nicht beforeUpdate – dort ist axis.width=0 beim ersten Render). Divisor N-1 (Intervalle), nicht N (Slots). Einzelpunkt-Fallback via getStepDuration(rhythm)/2.
- **Density Matrix (v14, Pixel-Budget-Formel):** SNAPSHOT-Track: Handgebaute Tabellen (SNAPSHOT_BASE, SNAPSHOT_TABLES, Rhythm Overrides) durch berechnete Formel ersetzt. Tick-Platzierung = reine Funktion von Zeitspanne × Zone. Daten-Rhythmus irrelevant. PERIOD-Tabellen (S/M/L, §5.1–5.3) bleiben unverändert (Folge-Schritt). Rhythm Overrides §5.5 nur noch PERIOD-Track.
- **Pixel-Budget (Spec v14, §5.4+§5.9):** Grundlage der Formel (war in v13 nur Validierung). Font: S 11px, M/L 12px. Nutzbare X-Achse: S ~270px, M ~620px, L ~940px. Kapazitäten: MMM'yy S:4/M:9/L:14, yyyy S:5/M:12/L:19, MMM S:6/M:13/L:20. Zwei Kandidaten-Listen (≤1y Kurzformat MMM, >1y Langformat MMM'yy). Quarter-End für alle Quartals-/HJ-Ticks (Mär/Jun/Sep/Dez bzw. Jun/Dez).
- **Tick-Deduplizierung (historisch, in V9/V10 entfernt):** Key-Dedup, Nano-Fallback, Proximity Guard — alle durch cursor-basierte Kalender-Ticks obsolet.
- **HALF_YEARLY:** Vollständig restauriert. Detection (Band 140–300d), Override-Pattern in Density Matrix, BOP via No-Q-Policy, Tooltip Option A (Monat zeigen). Specs aktualisiert (Waterfall §4, Density §3.4, Tooltip §4.2, Rucksack).
- **Y-Achse Proportional Grace (V1.7.0):** Zwei Bugs gefixt: (1) `axis.width` → `axis.chart?.width`. (2) Additive → multiplikative Grace (`max *= 1.15`, `min *= 1.15`).
- **Y-Achse TIGHT FRAME (V1.9.0):** Drei Defekte behoben: (1) Chart.js `buildTicks` überschreibt afterDataLimits-Grenzen → `afterBuildTicks`-Guardian (`_guardBoundaries`), selbes Pattern wie X-Achse. (2) Bildschirmabhängige Rahmenberechnung → feste `FRAME_TICKS=10` (Framing ≠ Ticking). (3) Zwei Snap-Kandidaten reichten nicht → Drei-Kandidaten-Selektion (`_tightBound`: gridSnapGraced, niceNumRaw, gridSnapRaw), tightest-wins mit ≥5% Atemraum. Getestet gegen 8 Fälle über 3 CSVs.
- **Y-Achse V2.0.0 MINIMUM BREATHING ROOM:** Zwei Fixes: (1) Richtungs-Filter in `_tightBound` — Kandidaten, die Datenwerte clippen würden, werden vor Selektion ausgeschlossen (floor ≤ rawValue, ceil ≥ rawValue). (2) Minor-Side Minimum Clearance — in Mixed-Sign-Charts wird jede Grenze < 1 Step auf ±1 Step expandiert.
- **Y-Achse V2.1.0 ENHANCED MAGNETIC ZERO:** Duale Schwelle für Prozentwerte: `magnetThreshold = max(span × 15%, 20)`. Für Renditen ≤ 20% ist Null immer der kognitive Ankerpunkt. Für Nicht-Prozentwerte (Euro) bleibt span-relative Schwelle. Nutzt `fwContext.valueMode` ('percent'/'return' vs. 'value').
- **Y-Achse V2.2.0 UNIVERSAL CLEARANCE:** Minor-Side Clearance gilt jetzt für ALLE Mixed-Sign-Charts (Bar + Line). Drei Wörter gelöscht (`fwContext.chartType === 'bar' &&`). Begründung: Nulllinie bei 2,7% Charthöhe visuell nicht vom Canvas-Rand unterscheidbar (Cleveland).
- **✅ SNAPSHOT Calendar Snap (AP-15, V16.0.0, 2026-02-26):** Kern-Erkenntnis: Visuelle Position (`x`) und Tooltip-Datum (`_originalDate`) entkoppeln — das `_originalDate`-Feld existierte bereits in FwSmartTooltips, wurde aber nie befüllt. Snap-Regel: YEARLY→Jan 1, HY/Q/M→1. des Monats, WEEKLY/DAILY→Identität. Monats-Start-Snap statt Halbjahres-Start-Snap für HALF_YEARLY (begrenzt Shift auf max 30 Tage statt 6 Monate). Spec §7 komplett neu geschrieben. Dateien: FwDateUtils V5.3.0 (`getSnapshotSnap`), LineChartStrategy V16.0.0 (`snappedTimestamps` + `_originalDate`), FwSmartXAxis V9.0.1 (nur Kommentar).
- **SNAPSHOT Kalender-Ticks (FwSmartXAxis V9.0.0):** Einheitliche cursor-basierte Kalender-Ticks für ALLE SNAPSHOT-Rhythmen. Guard, Data-Anchored, isRegularSeries — alles gelöscht. endLimit = `dataRange.max + halfStep`. HALF_YEARLY-Tabelle: `unit:'quarter', stepSize:2` (Jun/Dez) — geändert in AP-18.
- **SNAPSHOT Floor Principle (V8.0.0, Spec §3.5):** Tick-Granularität nie feiner als Daten-Rhythmus. WEEKLY SNAPSHOT < 0.5y → monatliche Ticks (nicht tägliche). DAILY SNAPSHOT < 14d → tägliche Ticks (Zone-aware stepSize). Jeder Rhythmus hat eigene SNAPSHOT-Tabelle in `SNAPSHOT_TABLES` (FwSmartXAxis). Regression 4 damit geschlossen.
- **URL-Validierung (CSVParser, Layer 1):** Domain-Whitelist in `parse()` vor `fetch()`. Erlaubt: `https://www.finanzwesir.com/`, relative Pfade (`/`, `./`, `../`), localhost (`http://localhost`, `http://127.0.0.1`). Alles andere → GATEKEEPER-Fehler. User-Entscheidung überschreibt Security-Audit-Empfehlung (nur Protokoll-Whitelist).
- **FwRenderer Safe DOM (V4.7.0):** `showError()` und `showLoading()` auf `createElement` + `textContent` umgebaut. Keine `innerHTML`-Stellen mit variablem Inhalt mehr im gesamten Renderer. `_sanitize()` bleibt für `_renderA11yTable()`.
- **Minibalken minBarLength (Layer 3):** `options.datasets.bar.minBarLength: 3` in BarChartStrategy.getChartConfig(). Natives Chart.js-Feature. Wichtig: Chart.js hat zwei Options-Ketten — `elements.bar` (BarElement, visuell: Farbe/Border/Radius) vs. `datasets.bar` (BarController, Verhalten: minBarLength/barThickness). minBarLength gehört auf die Controller-Kette, nicht die Element-Kette.
- **Pos/Neg-Färbung (BarChartStrategy V42.1.0):** Single-Asset History-View: `backgroundColor` als Array pro Datenpunkt, `val >= 0` → `theme.semantic.positiveBar` (Petrol), `< 0` → `theme.semantic.negativeBar` (Purpur). Multi-Asset unverändert. Semantische Tokens in `FwTheme.semantic`. Farbenblind-sicher (Petrol/Purpur statt Rot/Grün).
- **View-Toggle-Labels (Stand 2026-02-18):** Line: „Wert €" / „Verlauf %". Bar: „Verlauf" / „Vergleich".
- **PERIOD Kalender-Ticks (AP-13, FwSmartXAxis V10.0.0, 2026-02-27):** PERIOD-Track `afterBuildTicks` von datengetrieben → cursor-basierte Kalender-Ticks. Entfernt: Key-Dedup, Nano-Fallback (≤7), Proximity Guard. Extension-Cap in `afterFit`: `Math.min(rawExtension, halfStep)` bei ≤3 Datenpunkten. Dead Code `isRegularInterval()` entfernt (FwDateUtils V5.4.0). Beide Tracks (SNAPSHOT + PERIOD) haben jetzt Kalender-Ticks. Testseite: `index_irregular_bar_ap13.html`.
- **✅ WEEKLY/DAILY PERIOD-Fix (AP-17, 2026-02-27):** Drei Lücken geschlossen: (1) `detectRhythm()` PERIOD-Pfad fehlte WEEKLY-Zweig (`avg > 5`) — 7-Tage-Daten fielen auf DAILY. (2) `getStepDuration()` fehlte WEEKLY (7d) + DAILY (1d) Cases — Extension-Cap falsch. (3) `PERIOD_TABLES` fehlte DAILY/WEEKLY-Overrides — Density Matrix lieferte unit:week statt unit:day für tägliche Daten. Fix: FwDateUtils V5.6.0, FwSmartXAxis V10.1.0 (PERIOD_TABLES.DAILY/WEEKLY + displayFormats.week). AP-19 als DRY-Folge-AP angelegt.
- **BAN-Headline (LineChartStrategy V14.1.0 + FwRenderer V5.1.0 + ChartEngine V3.14.0):** Performance-Headline über Line Charts. Berechnung in `_computeHeadline()` (Layer 3, pure Function), Rendering in `_renderBAN()` / `_updateBAN()` (Layer 5). Transport via `meta.headline` (etablierter Rucksack-Kanal). Komplementärwert-Weiche: `hasComplementaryValue = (currency !== '' && currency !== 'PERCENT')` — Währungsdaten zeigen Prozent als Sub-Zeile, Prozentdaten (Anleihen, Tagesgeld) zeigen nur Zeitraum. Multi-Asset: 1–3 gestapelt, 4+ Hint-Text mit Zähler (kein Kursiv). Farbe immer neutral (#272727). Container: Background #E7ECEF@60%, border-radius 0.5rem, Padding 12/16px, intrinsische Breite (inline-block, min-width 200px). Typografie: Hauptzeile 20/24px Bold, Nebenzeile+Hint 15/16px Regular (Perfect Fourth 1,5:1). Legend-Toggle steuert BAN dynamisch via `computeHeadlineForVisibleSeries()`. Empty-Mode bei 0 sichtbar. Toolbar-Fix: Toggle immer rechtsbündig (margin-left: auto). UX-Spec: `docs/context/IMPLEMENTIERUNG BAN LINIENDIAGRAMME PROMPT.md`.

## Tabu-Bereiche

Layer 1 (FinanzwesirData, CSVParser), fwContext-Grundstruktur, zentrale Zeit-Erkennung in FwDateUtils – nur mit expliziter Begründung und Rückfrage ändern.

## Projekt-Dateipfade

- Engine: `assets/js/fw-chart-engine/core/` und `strategies/`
- Specs: `docs/spec/`
- Kontext: `docs/context/`
- Testdaten: `data/`

- **KDR 12 (Security/SafeDOM):** textContent-only für CSV-Daten, innerHTML nur für statisches Engine-HTML. `_sanitize()` als Backup.
- **KDR 13 (A11y):** Vollständig implementiert (2026-02-19). Visuell verborgene HTML-Tabelle neben Canvas (`position:absolute; left:-9999px`). Line/Bar History: letzte 20 Zeilen + Summary. Bar Ranking: alle Perioden. Pie: alle Segmente aufgelöst (kein „Weitere…"-Aggregat — Drilldown-Popup für blinde Nutzer nicht bedienbar). Formatierung: `FwFormatUtils.formatSmart()` + `FwDateUtils.formatTooltipDate(ts, rhythm, 'L')`. Guard in Renderer: `rows.length === 0` → keine Tabelle.
- **KDR 14 (CSS-Variables Bridge):** Implementiert (2026-02-25, CSS-3). FwTheme V5.0.0 mit `init()` liest `:root` CSS Custom Properties via `getComputedStyle()`. Hardcoded-Defaults als Fallback. Init-Reihenfolge bindend: `new FwTheme()` → `init()` → `_injectStyles()` (dokumentiert in FwRenderer + ChartEngine). Neue Tokens: `textMuted`, `textDisabled`, `bgFaint`, `zeroLine`, `loaderBg`, `tooltip.{bg,title,body,border}`. Hex-Fallbacks in Utilities (FwSmartTooltips, FwSmartYAxis, FwChartPlugins) akzeptiert als Defensive Coding (FAANG-Review bestätigt). screen.css hat 6 neue CSS Custom Properties. Zero-Line lineWidth: 2 nur bei Mixed-Sign (`min < 0 && max > 0`), Spec §5.2.
- **Unidirektionaler Datenfluss:** Explizites Grundgesetz in VX. Layer 1→5, Events über Manager.
- **Im Code vorhanden aber bisher undokumentiert:** Ranking Mode (Bar), Smart Updates (chart.update()), Legend Toggle, Error Boundaries (try-catch in _processContainer).

## HTML-Interface-Dokumentation (2026-02-17)

- **Zwei neue Specs angelegt** (ersetzen die alten HTML-Card-Dokumente):
  - `docs/spec/REDAKTEURS-HANDBUCH Chart-Integration.md` — Für Redakteure: CSV-Format, HTML-Snippet, 5 Attribute, Options-Referenz, CI-Farbpalette, Copy-Paste-Vorlagen, Fehlertabelle.
  - `docs/spec/TECH-SPEC Theme-Integration Chart-Engine.md` — Für Entwickler: Datei-Inventar, Script-Einbindung (Handlebars), CSS-Anforderungen, Font-Requirements, CSV-Hosting, Initialisierung, Responsive-Zonen, Theme-Bau-Checkliste.
- **Domain-Whitelist-Entscheidung:** CSV-URLs nur von `https://www.finanzwesir.com`. Noch nicht im Code implementiert (KNOWN-ISSUES). Überschneidung mit Security-Task 2.
- **Titel-Fallback:** Code zeigt keinen Titel bei leerem `data-title` (kein Fallback auf "Chart"). Alte Spec behauptete Fallback. Klärung in KNOWN-ISSUES.
- **Alte Docs abgelöst:** `docs/HTML-Card/` (6 Dateien) ist Steinbruch-Archiv. `Beschreibung HTML-Karten für Charts_v3.md` und `TECH_SPEC_V1` in docs/spec/ als "abgelöst" markiert.
- **Code-Befund:** BarChartStrategy hat keine ALLOWED_MODES-Whitelist (Line und Pie haben eine). Kein Bug-Ticket angelegt, da kein aktives Problem — aber architektonische Asymmetrie.

## Design-System Konsolidierung (2026-02-17)

- **Zwei Domänen getrennt:** `docs/spec/` = Chart-Engine, `docs/design-system/` = Visuelles Design-System
- **Issues getrennt:** `KNOWN-ISSUES.md` = Chart-Engine, `DESIGN-SYSTEM-ISSUES.md` = Design-System
- **Bewusste Asymmetrie — kein working-features.md für Design-System.** Chart-Engine braucht `working-features.md` wegen komplexer Laufzeit-Wechselwirkungen und undokumentierter Features. Design-System braucht das nicht: (1) Die 6 Specs SIND die Feature-Liste, (2) Golden Masters sind der visuelle Beweis (öffnen und sehen), (3) CSS-Komponenten sind isoliert (kein Regressions-Risiko zwischen Komponenten). Wenn alle Issues geschlossen sind, ist das Design-System "fertig" — endlicher Zustand.
- **Verzeichnisstruktur:** `docs/design-system/{spec, templates, referenz, archiv}`
- **Assets:** 17 SVGs + Testbild in `templates/assets/`
- **Stufe 2 ABGESCHLOSSEN (2026-02-17):**
  - 6 Specs geschrieben (01-Farben bis 06-Interaktion) + DESIGN-SYSTEM.md + LLM-INSTRUCTIONS.md
  - Golden Masters kopiert: master-template, homepage, content-page-demo, impressum, datenschutz, ui-kit-referenz
  - Boxen-Stress-Test-Referenz im Archiv (boxen-text-v7)
  - Bestandsaufnahme: Design-Matrix v7 = Basis + v9-Ergänzungen, LLM-Instructions v5 + v8 kombiniert
  - 12 Design-Entscheidungen dokumentiert (H3-Font, Secondary Hover, etc.) — nicht neu öffnen
- **Janitor-Script (DS-008):** `assets/js/fw-janitor.js` v1.1.0. Transformiert [!NOTE]/[!WARNING]/[!TIP] Blockquotes → Boxen, [+]/[-] Listen → Check/Warn-Listen. Idempotent, defensiv, textContent-only für User-Content. Icon-Pfad konfigurierbar via `data-icon-base` Attribut am Script-Tag oder `init({ iconBasePath })`. Testseite in `referenz/janitor-test.html` (9 Tests).
- **Alte Verzeichnisse:** `docs/design/Specs und Beschreibungen/` und `docs/design/HTML-Dateien/` können nach User-Freigabe gelöscht werden

## Theme Assembly (Ghost-Theme-Zusammenbau)

- **Checkliste:** `docs/context/THEME-ASSEMBLY-CHECKLIST.md` — 5 Phasen.
- **Phase 1 (Assets):** Erledigt. Fonts, Grafiken, Favicons, Chart.js vorhanden.
- **Phase 2 (Templates):** Offen. default.hbs, Partials, Seiten-Templates, screen.css.
- **Phase 3 (Integration & QA):** Offen. Chart-Engine-Integration, GScan, Responsive, SEO.
- **Phase 4 (Pre-Launch Audits):** Offen. 4A Performance (15 Checkpoints: Minification, Lazy Loading, Lighthouse ≥90), 4B Security (21 Checkpoints: CSP, Domain-Whitelist, Redakteurs-Sicherheit, Dependency-Check). Überlappung mit KNOWN-ISSUES Security-/Performance-Tasks.
- **Phase 5 (Deployment):** Offen. ZIP, Upload, Smoke-Test.

## KNOWN-ISSUES Schlachtplan (2026-02-17)

- **Steuerungsdateien:** `docs/context/KNOWN-ISSUES-SCHLACHTPLAN.md` (8 APs mit Tracking) + `docs/context/KNOWN-ISSUES-PROMPT.md` (statischer Übergabe-Prompt für neue Fäden).
- **Workflow:** Prompt kopieren → AP abarbeiten → Abschluss-Ritual → User committet → neuer Faden → Prompt kopieren → nächstes AP.
- **Prompt V2 (2026-02-17):** Zwei Ergänzungen: (1) Ghost-Theme-Kontext ("Zielprodukt"-Block — LLM soll im Kontext des fertigen Themes entscheiden, nicht einzelne Test-HTMLs patchen). (2) Regel "Kein git commit" — Claude liefert Commit-Message, User committet selbst (SSH-Key).
- **Reihenfolge:** Phase 1 Pflicht (AP-1→AP-2→AP-4→AP-3), Phase 2 Wertvoll (AP-5→AP-6a/b), Phase 3 Aufräumen (AP-7→AP-8→AP-6c).
- **AP-1 erledigt (2026-02-17).** Scope-Korrektur: CDN→lokal.
- **AP-2 erledigt (2026-02-17).** Domain-Whitelist in CSVParser (www.finanzwesir.com + relative Pfade + localhost). showError/showLoading auf createElement+textContent (FwRenderer V4.7.0 SAFE DOM).
- **AP-3 erledigt (2026-02-17).** Drei Pre-Launch-Punkte geschlossen: (1) Titel-Fallback: Kein Fallback — fehlendes `data-title` = kein Titel (User-Entscheidung, Code war korrekt). (2) Domain-Whitelist: Spec-Update in v3-Spec nachgezogen. (3) HTTP/2: Geschlossen als "wartet auf Deploy". Nächstes AP: AP-5 (BI kleine Tasks).
- **AP-4 erledigt (2026-02-17).** Falschalarm — Zeile `≤ 10 → year, Step 1, yyyy` in Zone M existiert sowohl in Spec v12 §3.2 als auch im Code (`PERIOD_TABLE_M`). Kein Defekt.

## Chart.js Hosting-Entscheidung (2026-02-17)

- **Entscheidung:** Chart.js wird **lokal** gehostet in `assets/js/vendor/chart.umd.min.js`, **nicht** vom CDN (jsdelivr.net).
- **Gründe:** Volle Kontrolle, DSGVO-konform, kein Third-Party-DNS/TCP/TLS.
- **Konsequenzen:** SRI, Preconnect, CDN-Versionspinning sind alle gegenstandslos. `defer` wird einmalig in `default.hbs` gesetzt.
- **Einbindung im Theme:** `<script defer src="{{asset 'js/vendor/chart.umd.min.js'}}"></script>`
- **WARNUNG für LLMs:** Die SECURITY-AUDIT.md und PERFORMANCE-ANALYSE.md enthalten historische Analyse-Abschnitte mit CDN-URLs (Critical Rendering Path Diagramm, CDN-vs-Lokal-Vergleichstabelle). Diese sind als historischer Kontext markiert. Die konkreten Anweisungen (Kochbuch, Quick Wins, Empfehlungstabellen) sind aktualisiert und referenzieren die lokale Datei. Die ~15 HTML-Testdateien im Repo-Root nutzen noch die alte CDN-URL — sie werden beim Theme-Bau durch `default.hbs` obsolet.

## CSS-System & Theme-Integration (2026-02-19)

- **CSS-Paket 2 erledigt:** screen.css mit 7 Abschnitten (E4), 4 @font-face Blöcke (WOFF2-only, Archivo Black Name-Fix), CHART HOST Abschnitt (Container Queries + CLS), Google Fonts aus 11 HTML-Dateien entfernt, alte Font-CSS deprecated.
- **CSS-Konventionen:** `docs/context/CSS-KONVENTIONEN.md` — Dauerhafter Arbeitsvertrag für CSS. Verankert in CLAUDE.md Section 3 + MEMORY.md.
- **CSS-4 superseded → CSS-7:** Template-Bau gehört in PRE-LAUNCH (nach Tailwind-Build), nicht in Dev-Time.
- **Abhängigkeits-Graph (aktuell):** Dev-Time: CSS-1→CSS-2✅→CSS-3→CSS-5. PRE-LAUNCH: CSS-6→CSS-7.
- **CSS-Reports gelöscht:** `CSS-REPORT.md` und `CSS-REPORT LANG.md` (Einweg-Briefings, Zweck erfüllt).

## AP-6c Touch-Test (2026-02-19)

- **Ergebnis:** DevTools-Test bestanden (12 Prüfungen, iPhone SE + Galaxy S21 Emulation). Touch-Tooltips funktionieren korrekt (`intersect: false` reicht).
- **Offene Aktion:** Echter Geräte-Test vor Launch (DevTools kann Fingergröße nicht simulieren).
- **Nebeneffekt:** Regression 4 entdeckt (→ AP-9).

## Geschlossene APs (Kurzform, Details → Schlachtplan)

- **Regression 4 ✅ (2026-02-23):** WEEKLY < 1y X-Achse chaotisch → SNAPSHOT Floor Principle V8.0.0.
- **AP-11 ✅ (2026-02-23):** Range-Button bei ≤1 Datenpunkt → `filterRows().length >= 2` Guard.
- **AP-16 ✅ (2026-02-27):** PERIOD/SNAPSHOT Cutoff-Semantik → `filterRows` mit `dateSemantics`-Weiche (PERIOD exklusiv `>`, SNAPSHOT inklusiv `>=`).
- **AP-7 ✅ (2026-02-23):** Architektur-Prüfpunkte (KDR-14→CSS-3, dispose→kein Bedarf, Debug→verworfen).
- **AP-8 ✅ (2026-02-23):** Feature-Triage. Post-Launch: PL-1 Einheiten-Anker, PL-2 Zone Zero.

## ✅ AP-18 — Quarter-End Tick-Monate (2026-02-27) — ERLEDIGT

- **Fix:** FwSmartXAxis V10.2.0. Quartals-Ticks Mär/Jun/Sep/Dez (Finanzindustrie-Standard). HY-Ticks Jun/Dez.
- **Rhythm-Weiche (Kern-Entscheidung):** Quarter-End NUR für `rhythm=QUARTERLY/HALF_YEARLY`. Andere Rhythmen (MONTHLY, DAILY, WEEKLY) behalten Quarter-Start (Jan/Apr/Jul/Okt) bei `unit:'quarter'` — das ist reine Platzoptimierung, kein Fach-Statement.
- **Formeln:** Tick-Filter `(m+1)%(3*stepSize)===0`. Cursor `Math.floor((m-2)/3)*3+2`.
- **HALF_YEARLY Tabellen:** SNAPSHOT `unit:'quarter', stepSize:2`. PERIOD `stepSize:2`.
- **⚠️ LESSON LEARNED — FwDateAdapter.startOf:** `startOf('quarter')` ist ein **Chart.js-API-Vertrag** (Perioden-START). Änderung auf Quarter-End bricht Chart.js intern (Tick-Spacing, autoSkip, diff-Berechnung). Symptom: erratische Ticks ("April-Start, dann Halbjahres-Rhythmus"). Fix: startOf REVERT, Quarter-End Convention nur in afterBuildTicks. **Diese Regel gilt für ALLE adapter-Funktionen: NIEMALS die Semantik von Chart.js-Adapter-Methoden ändern.**
- **AP-20 als Nebenprodukt entdeckt:** SNAPSHOT autoSkip Screen S — vorbestehender Defekt, kein AP-18-Problem.

## Charts Ticks und Label v13 → v14 (2026-03-01)

- **Spec-Versionssprung:** `Charts Ticks und Label_v13.md` → `Charts Ticks und Label_v14.md`. Scope: SNAPSHOT-Track (Liniendiagramme).
- **Kern-Erkenntnis:** Tick-Platzierung = Zeitspanne × Zone. Daten-Rhythmus irrelevant. Beweis: scenario_1 (Mixed) und scenario_2 (Quartale) — 25 Jahre, identische Ticks.
- **§5.4 ersetzt:** SNAPSHOT_BASE-Tabelle → Pixel-Budget-Formel mit Kandidaten-Listen und Kapazitätsberechnung.
- **§5.5 eingeschränkt:** Rhythm Overrides nur noch PERIOD-Track.
- **§5.6 umformuliert:** Floor Principle = nachgelagerter Guard, kein Matrix-Input.
- **§4 umbenannt:** "Rhythmus-Erkennung (Scope & Rolle)" — explizite Abgrenzung: nur für Snap/Tooltip.
- **User-Entscheidungen:** Quarter-End für Q/HJ-Ticks, Kurzformat MMM bei ≤1y, SNAPSHOT zuerst (PERIOD folgt).
- **Testdatei erstellt:** `data/scenario_2_long_25y.csv` (scenario_1 mit aufgefüllten Quartalen, 101 Datenpunkte).
- **Code-Anpassung ausstehend:** Spec ist Zielzustand. Code hat noch handgebaute SNAPSHOT_TABLES. Implementierung in AP-21.

## 🟡 AP-21 — SNAPSHOT X-Achse (2026-02-28) — T0 ERLEDIGT, PLAN AKTUALISIERT

- **Plan:** `docs/context/AP-21-IMPLEMENTATIONSPLAN.md` (Plan-Delta in §7).
- **T0 Ergebnis (2026-02-28):** min/max-Drift-Hypothese **WIDERLEGT**. `buildTicks()` überschreibt axis.min/max NICHT. Diagnostik-Logs temporär in FwSmartXAxis.js Z.230/233/236/243.
- **Neuer Root Cause:** Calendar Snap (AP-15) + globaler Rhythmus bei mixed-rhythm CSVs. `detectRhythm` liefert YEARLY (Plurality-Vote), `getSnapshotSnap` snappt alle Punkte auf Jan 1. Quartals-Punkte kollabieren → Schlaufen/senkrechte Anstiege. Bewiesen mit `scenario_1_long_25y.csv`.
- **Tasks gestrichen:** T1 (min/max-Kontrolle), T2 (time.unit-Sync), T4 (Chart.js bändigen) — alle basierten auf widerlegter Hypothese.
- **Verbleibende Tasks:** T5 (Pixel-Budget-Formel implementieren, SNAPSHOT_TABLES durch Berechnung ersetzen) → T3 (FwDateAdapter UTC) → T7 (Aufräumen/Diagnostik-Logs entfernen). T6 (Pixel-Budget) in T5 aufgegangen.
- **FwDateAdapter-Bug (T3, unverändert):** startOf/format/add/diff nutzen lokale Zeit statt UTC. Fix: UTC-Methoden + Noon-Protokoll.

## Schlachtplan-Restrukturierung (2026-02-23, erweitert 2026-02-25)

- **CSS-1 gestrichen (2026-02-23).** Tailwind-Config ist kein Dev-Fundament — gehört zum Production-Build. Scope vollständig in CSS-6 aufgegangen.
- **CSS-4 gestrichen (2026-02-19).** Scope aufgeteilt: Template-Schreiben → TMPL-1, Asset-Einbindung → CSS-7.
- **Drei CSS-Quellen — Zuständigkeit:** screen.css = Farben/Typo/Komponenten. FwTheme.js = Chart-Engine liest Tokens (KDR-14, CSS-3). Tailwind = nur Struktur (Grid, Spacing, Responsive).
- **5 neue PRE-LAUNCH-APs:** TMPL-1 (Templates schreiben), QA-1 (Integration & QA), AUDIT-P (Performance), AUDIT-S (Security), DEPLOY.
- **SEO/Social/Tracker-Integration (2026-02-25):** Ghost-Theme-Schlachtplan (temp/) in amtliche Dokumente übernommen. Drei Kategorien:
  1. **Template-Code → TMPL-1 erweitert:** SEO-Meta, OG, Twitter Cards, BreadcrumbList JSON-LD, BlogPosting JSON-LD, RSS-Link, Webmentions, Microdata, author.hbs E-E-A-T. Vollständige Handlebars-Snippets im Schlachtplan.
  2. **Ghost-Admin-Aktionen → Neue Phase GHOST-SETUP (7 APs):** GHOST-1 Clicky (Code Injection), GHOST-2 VG-Wort Snippet, GHOST-3 VG-Wort Bulk (200 Artikel), GHOST-4 OG-Default-Bilder, GHOST-5 FAQPage Snippet, GHOST-6 robots.txt+Sitemap, GHOST-7 Webmention.io.
  3. **Redaktionell → Handbuch erstellt (2026-02-25):** `docs/spec/REDAKTEURS-HANDBUCH Redaktionsleitfaden.md` — 8 Abschnitte (URL-Strategie [flach], FAQ-Block, Content-Struktur, Autoren-Bio, About-Seite, Impressum/Datenschutz, dateModified, VG-Wort). Veröffentlichungs-Checkliste (12+4 Punkte). Referenziert Chart-Integrations-Handbuch, ersetzt es nicht.
- **Ghost-CMS-Mechanik (Verständnis-Notiz):** `{{ghost_head}}` und `{{ghost_foot}}` sind Ghost-Betriebssystem-Funktionen, nicht Theme-Funktionen. Ghost injiziert dort Code Injection (site-weit + post-spezifisch). Das Theme muss nur die Platzhalter an der richtigen Stelle haben. Clicky und VG-Wort brauchen keinen Template-Code — sie werden über Ghost Admin → Code Injection eingefügt.

## Offene Aufgaben (Stand der Arbeit)

- **Engine-APs:** AP-1–AP-18 ✅. AP-19 ⬜ (PERIOD_TABLES DRY). AP-20/21 🟡 (T0 erledigt, T1/T2/T4 gestrichen, T5+T3+T6+T7 offen → `AP-21-IMPLEMENTATIONSPLAN.md` §7). AP-6c 🟡 (echter Geräte-Test vor Launch).
- **Schlachtplan-Reihenfolge:** DEV-TIME: CSS-5, AP-19, AP-21 (T5→T3→T6→T7). PRE-LAUNCH: TMPL-1 → CSS-7 → QA-1 → CSS-6 → Audits → DEPLOY. Details → `KNOWN-ISSUES-SCHLACHTPLAN.md`.
- **Design-System:** Konsolidierung abgeschlossen. Offene Issues: DS-003/004/005/006/007/011.
