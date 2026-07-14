Stand: 2026-07-14 | Session: AP-chart-engine-01 / CE-3b (Sonnet) | Geändert von: Claude

# AP-chart-engine-01, CE-3b: Line-Chart-Fallback-Rhythmus und Pill-Interaktion — Ergebnisprotokoll

**Status: GRÜN — statische QA vollständig bestanden; Albert hat die reale Browser-Abnahme ausdrücklich als bestanden zurückgemeldet („Optische Prüfung: Alles einwandfrei").**

Kettenposition: CE-3/CE-3a waren nicht abgenommen. **CE-3b** (dieser AP) behebt die drei aus Alberts realen Desktop-/S-Screenshots von `tests/engine/line-ci.test.html` abgeleiteten Fallback-Defizite. Nächster Schritt: CE-4 (Bar-Chart-Chrome) ist jetzt freigegeben.

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/core/FwRenderer.js`
- `Apps/prokrastinations-preis/app.test.html` — ausschließlich das eine `@source inline(...)`-Manifest, zwei fehlende Tokens ergänzt
- Diese Ergebnisdatei

`ChartEngine.js` und `tools/engine-dom-check.js` bytegleich unverändert seit CE-3a (`git diff --stat` gegen den CE-3a-Endstand: 0 Zeilen bzw. leer).

## Umgesetztes Delta

**Wrapper-Fallback-Rhythmus:** Neue Regel `.fw-chart-wrapper--line { display: flex; flex-direction: column; gap: 12px; }` ergänzt. Ursache des gemeldeten „Zusammenklebens": `FW_LINE_WRAPPER_CLASS` trägt zwar `flex flex-col gap-3`, aber auf den absichtlich Tailwind-freien Engine-Testseiten sind diese Klassen inerter Text — es gab keine CSS-Regel, die `display:flex`/`flex-direction:column`/`gap` für den Wrapper selbst herstellt. `gap:12px` entspricht exakt Tailwind `gap-3` (0.75rem). Die Tailwind-Konstante selbst blieb unverändert. Keine individuellen Margins bei Titel/BAN/Toolbar/Legende wieder eingeführt — der Wrapper-`gap` ist die einzige Rhythmusquelle.

**Zone-S-Kaskade:** Ursache war eine falsche Spezifitätsannahme im CE-3a-Protokoll: Die dort eingefügte Gegenregel `.fw-chart-wrapper--line .fw-chart-line-view-group { margin-left:0; }` stand **vor** der später im selben Stylesheet folgenden Basisregel `.fw-chart-wrapper--line .fw-chart-line-view-group { margin-left:auto; }` — bei identischer Selektorspezifität (zwei Klassen) gewinnt laut CSS-Kaskade die spätere Quellposition, nicht die frühere. Behoben: Der alte, zu früh platzierte CE-3a-Gegenregelblock wurde vollständig aus dem ersten (generischen, Bar-only) `@container fw-chart (max-width:450px)`-Block entfernt — dieser Block ist jetzt wieder byte-identisch zum Vor-CE-3a-Stand. Ein einziger neuer, line-spezifischer `@container fw-chart (max-width:450px)`-Block wurde stattdessen ganz am Ende des Line-Fallback-Abschnitts ergänzt — bewusst **nach** der Basisregel `margin-left:auto`. Inhalt unverändert wie in CE-3a spezifiziert (`flex-direction:row !important; align-items:center; padding:0 !important; gap:8px !important` für die Toolbar; `margin-left:0` **ohne** `!important` für die View-Gruppe). Damit gewinnt auf S durch spätere Quellposition zuverlässig `margin-left:0`; auf M/L bleibt `margin-left:auto` aktiv.

**Pill-Interaktion:** Beiden vollständigen Line-Pill-Literalstrings (`FW_LINE_LEGEND_PILL_CLASS`, `FW_LINE_LEGEND_PILL_HIDDEN_CLASS`) wurde `border border-border text-text transition-colors hover:border-primary hover:bg-bg-faint hover:text-primary` angehängt — alle bisherigen Klassen (`rounded-full`, `bg-bg`, `shadow-soft`, `transition-shadow`, `hover:shadow-hover`, Fokus-Ring, `opacity-40`, `grayscale`) blieben erhalten. Im line-spezifischen Fallback wurde `.fw-legend-item` von `border:none` auf `border: 1px solid ${c.grid}` umgestellt und `color: ${c.text}` ergänzt; `.fw-legend-item:hover` wurde von `border-color:transparent`/`background-color:${c.bgWhite}` auf `border-color:${c.petrol}; color:${c.petrol}; background-color:${c.bgFaint}` umgestellt. `box-shadow: var(--shadow-hover, …)` und `transform:none` (kein Hover-Lift) blieben unverändert. Kein neuer Hex-Wert, kein neuer Schatten- oder Border-Token — ausschließlich `c.grid`, `c.text`, `c.bgWhite`, `c.petrol`, `c.bgFaint` sowie die bereits vorhandenen `shadow-soft`/`shadow-hover`-Fallbacks verwendet.

**Manifest:** `hover:border-primary` und `hover:text-primary` fehlten und wurden ergänzt. `border`, `border-border`, `text-text`, `transition-colors`, `hover:bg-bg-faint` waren bereits vorhanden (verifiziert, keine Duplizierung nötig).

## Beweise

- **Scope-/Diff-/Syntax-QA:** `git status`/`git diff --stat` zeigen ausschließlich `FwRenderer.js` und `app.test.html` (Manifest) + diese Ergebnisdatei geändert. `ChartEngine.js` seit CE-3a unverändert (identischer Diff-Stand), `tools/engine-dom-check.js` bytegleich unverändert. `node --check` auf `FwRenderer.js`: exit 0.
- **Fallback-Paritäts-QA:** `.fw-chart-wrapper--line { display: flex; flex-direction: column; gap: 12px; }` real im Code vorhanden (Grep bestätigt); `FW_LINE_WRAPPER_CLASS` weiterhin `'fw-chart-wrapper flex flex-col gap-3 fw-chart-wrapper--line'`, unverändert.
- **Kaskaden-QA:** Genau ein line-spezifischer `@container fw-chart (max-width:450px)`-Block (Grep: 2 Gesamtvorkommen des Selektors im Stylesheet — 1 generischer Bar-only-Block unverändert am alten Ort, 1 neuer Line-only-Block am Ende); der erste Block enthält nach der Korrektur keine `.fw-chart-wrapper--line`-Selektoren mehr (Read bestätigt, Zeilen 562–570 = exakter Vor-CE-3a-Zustand). `margin-left:auto` (Basisregel, Zeile 585) steht textuell vor `margin-left:0` (neuer Zone-S-Block, Zeile 610) — Zeilennummer-Vergleich bestätigt die korrekte Reihenfolge. Kein `!important` bei `margin-left:0` (Grep bestätigt).
- **Pill-QA:** Beide Pill-Literalstrings enthalten dieselben neuen Interaktionsklassen (Diff-Vergleich bestätigt identische Anhängung); der Fallback verwendet ausschließlich `c.grid`, `c.text`, `c.bgWhite`, `c.petrol`, `c.bgFaint` und die bereits vorhandenen `shadow-soft`/`shadow-hover`-Fallbackwerte — keine neue Farbe, kein neuer Hex-Wert.
- **Line-vs.-Non-Line-/Vertrags-QA:** Vollständiger kumulativer Diff (CE-3 bis CE-3b) zeilenweise geprüft — keine einzige neue oder geänderte Zeile berührt `.fw-btn-group`, `.fw-toggle`, `.fw-btn`, `.fw-toggle-opt`; die Entfernung des alten CE-3a-Blocks ist eine reine Wiederherstellung, keine Bar-Änderung. DOM-Struktur, Elementtypen, `role`, `aria-label`, `aria-pressed`, `data-action`, `data-value`, `data-index`, Event-Delegation, Smart-Update, BAN-Berechnung, Legendensichtbarkeit, Canvas, Daten, `fwContext`, Strategien, Skalen/Achsen/Ticks/Tooltips, Journey, Rubikon, `anchorMeasurement`, `chartSettled`, `renderMotion` unverändert. Container-Query-Vertrag bleibt exakt bei zwei Zonen und der Schwelle 450px — kein Viewport-Breakpoint, kein Mess-JavaScript ergänzt.
- **Manifest-QA:** Genau ein `@source inline(...)`, wohlgeformt geschlossen; keine dynamische Klassenbildung.

## Manuelle Albert-QA

Checkliste (aus dem AP):

1. `tests/engine/line-ci.test.html` auf M/L: gleicher ruhiger Weißraum zwischen Titel/BAN/Toolbar/Legende; View rechts; Canvas/Daten unverändert.
2. Dieselbe Seite bei Engine-Containerbreite ≤450px: View-Gruppe bricht linksbündig um, keine Zusatzluft, keine zentrierte zweite Zeile.
3. Legend-Pills: subtile Ruhekontur; petrolfarbene Kontur/Text + Flächenwechsel beim Hover; Tastaturfokus sichtbar; sichtbare/ausgeblendete Serie mit Chart/BAN synchron.
4. `Apps/prokrastinations-preis/app.test.html`: keine unerwarteten Controls; Journey/Rubikon/vertikale Linie unverändert.

**Status: bestanden.** Albert-Rückmeldung im Chat: „Optische Prüfung: Alles einwandfrei" — eine generelle, nicht punktweise durchdeklinierte Bestätigung, aber eine ausdrückliche Positiv-Rückmeldung zur realen Browser-Abnahme dieser Korrektur, wie vom AP als Ausnahme von „GELB — offen" vorgesehen.

## Nicht Teil dieses APs

Canvas, Daten, DOM-Struktur/A11y-Attribute (unverändert), Smart-Update-Mechanik, Bar, Donut/Pie, Ranking, Popover, `tokens.css`/`FwTheme`-Tokens sowie jede weitergehende Designarbeit an den Pills über diese funktionale Interaktionspräzisierung hinaus.

## Nächster zulässiger Schritt

CE-4 Bar-Chart-Chrome — freigegeben nach Alberts Abnahme dieses Protokolls.

Kein Commit. Stop.
