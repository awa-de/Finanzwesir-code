# CSS-Konventionen — Dauerhafter Arbeitsvertrag
Stand: 2026-07-23 | Session: css-altlasten-tokens-janitor-grenze | Geändert von: Claude (vorher: Codex, DS-013-Entscheidung)

> **Status:** Bindend ab 2026-02-19, gilt bis Production-Build.
> **Scope:** Jede CSS-Änderung im Theme.
> **Referenziert von:** CLAUDE.md Section 3, MEMORY.md

---

## Die ausgelieferte Datei und ihre Quelle

Eine einzige **ausgelieferte** CSS-Datei: `assets/css/screen.css`. Ghost lädt
ausschließlich diese Datei. Kein zweites ausgeliefertes CSS, keine Inline-
Styles in HTML außer Tailwind-Utility-Klassen, keine `<style>`-Blöcke in
Templates.

Vor T1 ist `assets/css/screen.css` zugleich die manuell gepflegte Quelle. Ab
T1 gilt die entschiedene Trennung:

- Bearbeitete Quelle: `src/css/screen.source.css`.
- Build-Ausgabe: `assets/css/screen.css`.
- `tokens.css` bleibt die CI-Quelle und wird von der Build-Quelle importiert.
- Build-Ausgabe niemals direkt ändern; CSS-Änderungen gehen ausschließlich in
  die Quelle.

Der Build ergänzt Tailwind-Theme und -Utilities ohne Preflight-Reset. Die
sechs Abschnitte dieses Dokuments strukturieren weiterhin die bearbeitete
Quelle.

## Die sechs Abschnitte — Zuständigkeiten sind bindend

```
/* ============================================================
   1. TOKENS
   Einzige Stelle mit Hex-Werten und rgba()-Werten.
   Alle Brand-Farben, Schatten, Basis-Werte.
   Neue Farbe? Nur hier. Nirgendwo sonst.
   ============================================================ */

/* ============================================================
   2. FONTS
   Ausschließlich @font-face Deklarationen.
   Nur WOFF2. Nur genutzte Gewichte.
   Nicht anfassen außer neue Schrift kommt dazu.
   ============================================================ */

/* ============================================================
   3. BASE
   Body, HTML, globale Resets, :focus-visible.
   Keine Komponenten hier.
   ============================================================ */

/* ============================================================
   4. GHOST CONTENT
   Alles unter .gh-content — Typografie, Links, Tabellen,
   Bilder, Blockquotes. Nur was Ghost ausgibt.
   Janitor transformiert nur normalen Ghost-Inhalt;
   .fw-app-Teilbäume sind ausgeschlossen.
   ============================================================ */

/* ============================================================
   5. CHART HOST
   Nur .financial-chart-module und direkte Kinder.
   Keine fw-* Klassen hier — die gehören der Engine.
   ============================================================ */

/* ============================================================
   6. COMPONENTS
   Wiederverwendbare UI-Elemente: .ci-link, .hover-lift,
   Info-Boxen, Call-to-action, Checklisten, Cards.
   Neue Komponenten landen hier.
   ============================================================ */
```

## Lokale App-Mechanik und Ghost-Kaskadengrenze

**App-Mechanik-Quelle (→ D-CSS-03, `01_DECISION_LOG.md`):** Nicht verallgemeinerbare App-Mechanik (z. B. Card-to-Point-Flug, Rubikon-Overlay) wird als eigene Theme-CSS-Quelle unter `Theme/src/css/apps/{slug}.css` ausgeliefert und über den kanonischen Tailwind-Build in `screen.css` eingebettet. Einbindung ausschließlich mit der baren Importform `@import "…";` — nicht `@import url("…");`. Nachweis der Einbettung ist der Selektor-Grep der Mechanik-Klassen im gebauten Artefakt. Keine JavaScript-Style-Injektion, keine CSS-URL in einer HTML-Card und kein zweites CSS-Deployment- oder Loader-System für diese Mechanik.

**Ghost-Kaskadengrenze (→ D-CSS-02, `01_DECISION_LOG.md`):** Ghost-Artikelregeln (`.gh-content`, ungelayert) dürfen den `.fw-app`-Teilbaum nicht ungegrenzt gestalten — ungelayerte Autorenregeln schlagen gelayerte Tailwind-Utilities unabhängig von Spezifität und Reihenfolge. Die Ausnahme liegt an der Ursprungsregel selbst (`:not(.fw-app *)` an den betroffenen `.gh-content`-Regelgruppen), nicht an einer neuen App-Gegenregel. `!important` ist für diese Kaskadengrenze kategorisch verboten; das Verbot betrifft ausschließlich diese Reparatur, nicht historische `!important`-Stellen in abgegrenzten Engine-/Layout-Fallbacks.

## Ritual für jede neue Komponente

Bevor du CSS für ein neues Element schreibst, beantworte diese drei Fragen:

### 1. Einmalig oder wiederverwendbar?

- **Einmalig** (nur eine Seite, nie wieder): Tailwind-Utility-Klassen direkt im HTML reichen.
- **Wiederverwendbar** (taucht auf mehreren Seiten auf): eigene Klasse in screen.css Abschnitt 6.

### 2. Braucht es einen neuen Token?

- Neue Farbe → erst in Abschnitt 1 als CSS Custom Property definieren, dann verwenden.
- Existierende Farbe in neuer Transparenz → `rgba()` mit dem Token: `rgba(var(--color-petrol-rgb), 0.15)` — kein neuer Hex-Wert.
- **Kein neuer Hex-Wert außerhalb von Abschnitt 1. Nie.**

### 3. Tailwind oder Custom CSS?

- Layout, Abstände, Flexbox, Grid → Tailwind-Klassen im HTML.
- Marken-Styling, Hover-Effekte mit Brand-Farben, komplexe Übergänge → Custom CSS in Abschnitt 6.

## Namenskonventionen

- **`fw-*` ist reserviert** für die Chart-Engine — nicht in screen.css verwenden.
- Theme-Komponenten: beschreibender Name ohne Präfix: `.info-box`, `.cta-card`, `.ci-link`
- Modifier mit doppeltem Bindestrich: `.info-box--warning`, `.cta-card--primary`
- Keine kryptischen Abkürzungen. Namen müssen in sechs Monaten noch verständlich sein.

## Was du niemals tust

1. Hex-Werte außerhalb von Abschnitt 1 schreiben
2. `fw-*` Klassen in screen.css definieren oder überschreiben
3. `contain: layout` oder `contain: content` auf `.financial-chart-module` setzen
4. Google Fonts oder andere externe Font-Quellen einbinden
5. Tailwind-Konfiguration inline in HTML-Dateien schreiben

> **Wenn du unsicher bist wo etwas hingehört:** Frag bevor du schreibst. Beschreibe das Element, der User sagt dir den richtigen Abschnitt.
