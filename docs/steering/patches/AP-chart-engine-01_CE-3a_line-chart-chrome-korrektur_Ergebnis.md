Stand: 2026-07-14 | Session: AP-chart-engine-01 / CE-3a (Sonnet) | Geändert von: Claude

# AP-chart-engine-01, CE-3a: Line-Chart-Chrome-Korrektur — Ergebnisprotokoll

**Status: GELB — statische QA vollständig bestanden; manuelle Albert-Browser-QA noch offen.**

Kettenposition: CE-3 blieb GELB bis zum Abschluss dieser Korrektur. **CE-3a** (dieser AP) behebt drei aus Alberts visueller Abnahme von `tests/engine/line-ci.test.html` abgeleitete Abweichungen vom Baukasten-Mockup „Depotverlauf mit und ohne Warten". Kein neuer Migrationsslice, keine Designüberarbeitung. Nächster Schritt nur nach Alberts Abnahme: CE-4 (Bar-Chart-Chrome).

## Geänderte Dateien

- `Theme/assets/js/fw-chart-engine/core/FwRenderer.js` (+187/−50 gegenüber Vor-CE-3-Stand; CE-3a-Anteil: 1 neue Konstante, 1 Konstanten-Erweiterung, 1 Klassenzuweisung, 2 neue CSS-Zeilen in der Zone-S-Gegenregel, 3 CSS-Erweiterungen/1 neue CSS-Zeile im Line-Fallback)
- `Apps/prokrastinations-preis/app.test.html` — ausschließlich das eine `@source inline(...)`-Manifest, ein fehlendes Token (`self-start`) ergänzt
- Diese Ergebnisdatei

Keine andere Datei geändert. `ChartEngine.js` und `tools/engine-dom-check.js` bytegleich unverändert (`git diff --stat` gegen den CE-3-Stand: 0 Zeilen bei `ChartEngine.js` seit CE-3a, leer bei `engine-dom-check.js`).

## Umgesetztes Korrekturdelta

**BAN kompakt:** `FW_LINE_BAN_CONTAINER_CLASS` um `self-start` ergänzt (Reihenfolge exakt wie im Mockup: `inline-block min-w-48 self-start rounded-lg bg-bg-faint px-4 py-3`). Im line-spezifischen Fallback für `.fw-ban-container` die gleichwertige Regel `align-self: flex-start;` ergänzt. `min-width:192px`, Padding, BAN-Inhalt, `aria-live` und die Zone-L-Skalierung unverändert.

**View-Gruppe auf M/L:** Neue vollständige Literalkonstante `FW_LINE_VIEW_GROUP_CLASS = 'fw-chart-segmented-group fw-chart-line-view-group inline-flex rounded-md bg-bg-faint p-0.5 gap-0.5 ml-auto'` — behält den bestehenden `fw-chart-segmented-group`-Anker (Basis-Fallback-Styling bleibt wirksam) und ergänzt einen neuen, ausschließlich für die View-Gruppe genutzten Anker `fw-chart-line-view-group` plus `ml-auto`. Nur die **View**-Gruppe im `_renderControls`-Toggle-Zweig nutzt diese neue Konstante; die **Range**-Gruppe bleibt unverändert bei `FW_LINE_SEGMENTED_GROUP_CLASS`. Struktur, `role="group"`, `aria-label="Ansicht"`, Optionsklassen, Buttons, `aria-pressed` und die Smart-Update-Logik sind exakt unverändert — nur der `className`-Wert des Gruppen-Containers wechselt. Im Fallback: `.fw-chart-wrapper--line .fw-chart-line-view-group { margin-left: auto; }`.

**Zone S:** Innerhalb der bestehenden `@container fw-chart (max-width:450px)`-Zone zwei neue, ausschließlich unter `.fw-chart-wrapper--line` selektierte Gegenregeln ergänzt: `.fw-chart-wrapper--line .fw-chart-toolbar { flex-direction: row !important; align-items: center; padding: 0 !important; gap: 8px !important; }` und `.fw-chart-wrapper--line .fw-chart-line-view-group { margin-left: 0; }`. Die höhere Selektorspezifität (zwei Klassen vs. eine Klasse) überschreibt die generischen Bar-Regeln zuverlässig, ohne sie zu verändern — die alten Zeilen (`.fw-chart-toolbar { flex-direction: column !important; … }`, `.fw-btn-group`, `.fw-btn`, `.fw-toggle`, `.fw-toggle-opt`) stehen unverändert darüber und bedienen weiterhin ausschließlich Bar.

**Legenden-Pill-Fallback:** Im bereits vorhandenen `.fw-legend-item`-Fallback ausschließlich `background-color: ${c.bgWhite}` und `border-radius: 9999px` ergänzt. `border: none`, `shadow-soft`-Box-Shadow, `cursor:pointer` (via unveränderte alte Bare-Regel weiterhin geerbt), Hover-Schatten, Fokus-Ring, Texte, Dot-Farbe sowie sichtbarer/ausgeblendeter Zustand (`aria-pressed`) unverändert. Keine Border- oder Ring-Regel im Ruhezustand ergänzt.

**Manifest:** `ml-auto` war bereits vorhanden (verifiziert, keine Änderung nötig). `self-start` fehlte — als einziges Token ergänzt, sonst keine Änderung an `app.test.html`.

## Beweise

- **Scope-/Diff-/Syntax-QA:** `git status`/`git diff --stat` zeigen ausschließlich `FwRenderer.js` und `app.test.html` (Manifest) + diese Ergebnisdatei geändert; `ChartEngine.js` seit CE-3a unverändert (Diff identisch zum CE-3-Endstand), `tools/engine-dom-check.js` bytegleich unverändert. `node --check` auf `FwRenderer.js`: exit 0, keine Fehler.
- **Line-vs.-Non-Line-/Vertrags-QA:** Vollständiger Diff Zeile für Zeile geprüft — keine einzige neue oder geänderte Zeile berührt `.fw-btn-group`, `.fw-toggle`, `.fw-btn`, `.fw-toggle-opt` oder deren Zone-S-Regeln; der `else`-Zweig (Bar) in `_renderControls` bleibt byte-identisch. Keine Änderung an DOM-Struktur, Elementtypen, `role`, `aria-label`, `aria-pressed`, `data-action`, `data-value`, `data-index`, Event-Delegation oder Smart-Update — einzig betroffene Codezeile in der Logik ist der `className`-Wert der View-Gruppe. BAN-Berechnung und Legendensichtbarkeit unverändert. Canvas, Daten, `fwContext`, Strategien, Skalen, Achsen, Ticks, Tooltips, Datasets, Crosshair, Marker, Annotationen, Journey, Rubikon, `anchorMeasurement`, `chartSettled`, `renderMotion` nicht berührt.
- **Literal-/Manifest-/CE-2b-QA:** Alle neuen/geänderten Werte sind vollständige Literal-Konstanten (kein `${`, keine neue Variablen-Konkatenation bei `className`). Manifest enthält genau ein `@source inline(...)` (wohlgeformt, schließende Klammer vorhanden); `self-start` jetzt enthalten, `ml-auto` war bereits vorhanden. Keine neue Farbe, kein neuer Hex-Wert, kein neuer Schatten- oder Border-Token, `tokens.css`/`FwTheme` unangetastet. Die gemeinsamen CE-2b-Verträge (Container-Query-Name `fw-chart`, Canvas-Höhe, `FwTheme.init()`-Reihenfolge, A11y-Fallback) unverändert vorhanden (Grep bestätigt, identisch zum CE-3-Stand). `engine-dom-check.js` konnte nicht ohne Browser lokal ausgeführt werden (das Tool erfordert eine geladene Seite/DOM) — sein Quellcode selbst ist unverändert.

## Manuelle Albert-QA

Status: **offen** — noch nicht rückgemeldet. Bitte im lokalen Live-Server prüfen:

1. `tests/engine/line-ci.test.html` auf Desktop: BAN ist kompakt; Zeitspannen links, Ansichtsauswahl rechts; Legendeneinträge sind als weiße, runde, klickbare Pills erkennbar.
2. Dieselbe Seite auf schmalem Bildschirm: keine künstlich zentrierte Spalte oder Zusatzpadding; Gruppen umbrechen bei Bedarf ruhig und linksbündig.
3. Zeitspanne, Ansicht und je eine Legend-Pill schalten: sichtbarer Aktivzustand, `aria-pressed`, Chart und BAN bleiben synchron.
4. `Apps/prokrastinations-preis/app.test.html` auf den relevanten Screens prüfen: kein unerwartetes Control, Journey/Rubikon/vertikale Linie unverändert.

## Nicht Teil dieses APs

Canvas, Daten, Smart-Update-Mechanik, DOM-Struktur/A11y-Attribute (unverändert, nur präzisiert), Bar, Donut/Pie, Ranking, Popover, `tokens.css`/`FwTheme`-Tokens und jede weitergehende Designüberarbeitung der Pills (z. B. zusätzliches Interaktionssignal über diese Paritätskorrektur hinaus) — das wäre ein separater Designentscheid, kein Teil von CE-3a.

## Nächster zulässiger Schritt

Nur nach Alberts Abnahme (inkl. der oben offenen manuellen Browser-QA): CE-4 Bar-Chart-Chrome.

Kein Commit. Stop.
