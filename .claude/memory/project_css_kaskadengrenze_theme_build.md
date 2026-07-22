---
name: project-css-kaskadengrenze-theme-build
description: "D-CSS-01 bis D-CSS-04 (01_DECISION_LOG.md): Chart-Fallback-Übergangsoption C, Ghost-Kaskadengrenze via :not(.fw-app *), barer @import als einziger Buildweg für App-Mechanik, viertteiliges Migrations-Gate — plus reale Umsetzung an prokrastinations-preis"
metadata:
  type: project
---

Seit 2026-07-22 (`01_DECISION_LOG.md`, Sektion „CSS-Architektur") vier verbindliche Entscheidungen zur Ghost/Tailwind-CSS-Architektur der App-Fabrik:

- **D-CSS-01 — Übergangsoption C:** `FwRenderer._injectStyles()` läuft unbedingt auf jeder Seite mit geladener Chart-Engine — auch produktiv, nicht nur auf Tailwind-freien Testseiten (bereits durch Peer-Review belegt). Der Fallback bleibt vorerst bestehen, Parität zu den Tailwind-Chrome-Rezepten ist jetzt ausdrücklich Pflicht statt impliziter Zufall. Zielzustand Option A (Fallback auf Tailwind-freie Testumgebungen begrenzt) ist ein **separater, künftiger Engine-DOM-AP** — noch nicht terminiert.
- **D-CSS-02 — Ghost-Kaskadengrenze:** Ghost-Artikelregeln (`.gh-content`) sind ungelayert, Tailwind-Utilities gelayert — ungelayert schlägt gelayert unabhängig von Spezifität. Die Grenze liegt **an der Ursprungsregel** (`:not(.fw-app *)` an den betroffenen `.gh-content`-Selektoren), nie an einer neuen App-Gegenregel. `!important` ist für diese eine Kaskadenreparatur kategorisch verboten — das Verbot ist eng gescoped, nicht pauschal (historische `!important`-Stellen in Engine-/Layout-Fallbacks bleiben unberührt).
- **D-CSS-03 — Ein Buildweg:** Lokale App-Mechanik-CSS wird als Theme-Quelle unter `Theme/src/css/apps/{slug}.css` ausgeliefert, eingebunden mit der **baren** Importform `@import "./apps/{slug}.css";` — `@import url(...)` wird von Tailwind v4 nicht inliniert und würde einen zweiten Browser-Download erzeugen.
- **D-CSS-04 — Migrations-Gate:** Eine App-Runtime gilt erst als migriert, wenn (1) jede Nicht-Tailwind-Klasse/`--fw-*`-Property in einer Theme-CSS-Quelle definiert ist, (2) die Tailwind-`@source`-Liste die reale Runtime erfasst, (3) die Mechanik auf eine literale App-Wurzel (`.fw-app.fw-app--{slug}`) begrenzt ist, (4) die sichtbare Abnahme in Ghost-naher Umgebung (Artikelkontext, gebautes `screen.css`, kein Play-CDN) erfolgt. `app.test.html` ersetzt diese Ghost-nahe Abnahme nicht.

**Umgesetzt an `prokrastinations-preis` (2026-07-22):** `Theme/src/css/apps/prokrastinations-preis.css` neu (Card-to-Point-Flug, Rubikon-Overlay, KPI-/Disclaimer-Reveal, Fokus-Kompatibilitätsregel — jeder Selektor auf `.fw-app.fw-app--prokrastinations-preis` begrenzt); `screen.source.css` bekam die reale `@source`-Quelle (`../../assets/js/apps`, ersetzt die gelöschte alte App-Datei) und den baren Import; fünf `.gh-content`-Selektorgruppen erhielten die `:not(.fw-app *)`-Ausnahme; alle Button-Rezepte (inkl. eines zunächst vergessenen Disclosure-Triggers, Hotfix) bekamen `appearance-none`/`border-0`(außer Secondary)/`font-body`. Drei Ghost-Theme-ZIPs erzeugt (`finanzwesir-local-theme-prokrastinations-preis-v1/v2/v3.zip`).

**Offen:** P3 — `tokens.css`-Inlining vs. zweites Runtime-Artefakt (nicht entschieden, in `docs/steering/BACKLOG.md` T1 vermerkt). P2 — Janitor-Fallback (`CSS-KONVENTIONEN.md` §7, leer) unbehandelt. Der Engine-DOM-AP (Option A vs. C) ist nicht terminiert.

Faden-Chronik: `Archiv/Chroniken/chronist-v1/CHRONIK-2026-07-22-prokrastinations-theme-css-kette.md`.

Verwandte Memories: [[project_ghost_feed_resolver_vertrag]], [[project_ci_theme_bridge]], [[project_chartengine_chrome_migration]].
