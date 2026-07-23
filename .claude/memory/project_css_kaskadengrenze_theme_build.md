---
name: project-css-kaskadengrenze-theme-build
description: "D-CSS-01 bis D-CSS-04 (01_DECISION_LOG.md): Chart-Fallback-Übergangsoption C, Ghost-Kaskadengrenze via :not(.fw-app *), barer @import als einziger Buildweg für App-Mechanik, viertteiliges Migrations-Gate — plus reale Umsetzung an prokrastinations-preis. Seit 2026-07-23: tokens.css eingebettet + Janitor-Fallback entfernt (P2/P3 geschlossen), Janitor-.fw-app-Grenze ergänzt."
metadata: 
  node_type: memory
  type: project
  originSessionId: 2d4e31d7-d4ed-418b-90be-d36446cb793c
  modified: 2026-07-23T09:07:53.805Z
---

Seit 2026-07-22 (`01_DECISION_LOG.md`, Sektion „CSS-Architektur") vier verbindliche Entscheidungen zur Ghost/Tailwind-CSS-Architektur der App-Fabrik:

- **D-CSS-01 — Übergangsoption C:** `FwRenderer._injectStyles()` läuft unbedingt auf jeder Seite mit geladener Chart-Engine — auch produktiv, nicht nur auf Tailwind-freien Testseiten (bereits durch Peer-Review belegt). Der Fallback bleibt vorerst bestehen, Parität zu den Tailwind-Chrome-Rezepten ist jetzt ausdrücklich Pflicht statt impliziter Zufall. Zielzustand Option A (Fallback auf Tailwind-freie Testumgebungen begrenzt) ist ein **separater, künftiger Engine-DOM-AP** — noch nicht terminiert.
- **D-CSS-02 — Ghost-Kaskadengrenze:** Ghost-Artikelregeln (`.gh-content`) sind ungelayert, Tailwind-Utilities gelayert — ungelayert schlägt gelayert unabhängig von Spezifität. Die Grenze liegt **an der Ursprungsregel** (`:not(.fw-app *)` an den betroffenen `.gh-content`-Selektoren), nie an einer neuen App-Gegenregel. `!important` ist für diese eine Kaskadenreparatur kategorisch verboten — das Verbot ist eng gescoped, nicht pauschal (historische `!important`-Stellen in Engine-/Layout-Fallbacks bleiben unberührt).
- **D-CSS-03 — Ein Buildweg:** Lokale App-Mechanik-CSS wird als Theme-Quelle unter `Theme/src/css/apps/{slug}.css` ausgeliefert, eingebunden mit der **baren** Importform `@import "./apps/{slug}.css";` — `@import url(...)` wird von Tailwind v4 nicht inliniert und würde einen zweiten Browser-Download erzeugen.
- **D-CSS-04 — Migrations-Gate:** Eine App-Runtime gilt erst als migriert, wenn (1) jede Nicht-Tailwind-Klasse/`--fw-*`-Property in einer Theme-CSS-Quelle definiert ist, (2) die Tailwind-`@source`-Liste die reale Runtime erfasst, (3) die Mechanik auf eine literale App-Wurzel (`.fw-app.fw-app--{slug}`) begrenzt ist, (4) die sichtbare Abnahme in Ghost-naher Umgebung (Artikelkontext, gebautes `screen.css`, kein Play-CDN) erfolgt. `app.test.html` ersetzt diese Ghost-nahe Abnahme nicht.

**Umgesetzt an `prokrastinations-preis` (2026-07-22):** `Theme/src/css/apps/prokrastinations-preis.css` neu (Card-to-Point-Flug, Rubikon-Overlay, KPI-/Disclaimer-Reveal, Fokus-Kompatibilitätsregel — jeder Selektor auf `.fw-app.fw-app--prokrastinations-preis` begrenzt); `screen.source.css` bekam die reale `@source`-Quelle (`../../assets/js/apps`, ersetzt die gelöschte alte App-Datei) und den baren Import; fünf `.gh-content`-Selektorgruppen erhielten die `:not(.fw-app *)`-Ausnahme; alle Button-Rezepte (inkl. eines zunächst vergessenen Disclosure-Triggers, Hotfix) bekamen `appearance-none`/`border-0`(außer Secondary)/`font-body`. Drei Ghost-Theme-ZIPs erzeugt (`finanzwesir-local-theme-prokrastinations-preis-v1/v2/v3.zip`).

**P2/P3 geschlossen (2026-07-23):** `tokens.css` wird jetzt per barem Import in `screen.css` eingebettet (D-CSS-03 datiert präzisiert, kein zweites Runtime-Artefakt mehr — vorher lief es trotz Doku-Behauptung noch über `@import url(...)`, also faktisch als zweiter Download). Die leere Janitor-Fallback-Sektion (`CSS-KONVENTIONEN.md` §7) wurde ersatzlos entfernt (jetzt 6 statt 7 Abschnitte). Zusätzlich erhielt `fw-janitor.js` eine `.fw-app`-Ausschlussgrenze (`closest()`-basiert, nur isoliert simuliert, kein echter Browsertest). Dabei aufgedeckt: `fw-janitor.js` war nur in `post.hbs` eingebunden, das Projekt nutzt aber nur Ghost-Pages/Homepage, keine Posts — Fix in `page.hbs` ergänzt (siehe [[project_ghost_theme_build]] für den vollen Produktionsfakt). `screen.css` misst danach 31.594 Bytes/6.564 Bytes gzip, über dem 30-KB-Ziel (BACKLOG CSS-6 bleibt dafür offen, bewusst kein Weglass-Gate). Nach dem Fix vom Nutzer bestätigt: Janitor lädt, aber zwei Detailfehler offen (Icons fehlen, rote Kreuze in Listen funktionieren nicht) — an BACKLOG DS-015 vermerkt.

**Weiterhin offen:** Der Engine-DOM-AP (Option A vs. C aus D-CSS-01) ist nicht terminiert.

Faden-Chroniken: `Archiv/Chroniken/chronist-v1/CHRONIK-2026-07-22-prokrastinations-theme-css-kette.md`, `Archiv/Chroniken/chronist-v1/CHRONIK-2026-07-23-css-altlasten-janitor-tokens-und-ghost-theme-zip.md`.

Verwandte Memories: [[project_ghost_feed_resolver_vertrag]], [[project_ci_theme_bridge]], [[project_chartengine_chrome_migration]].
