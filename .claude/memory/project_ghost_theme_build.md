---
name: project-ghost-theme-build
description: "Ghost.io-Prototyp (Theme/-Templates) wird teilweise von Albert über ein anderes KI-Werkzeug (Codex) außerhalb von Claude-Code-Sessions gebaut — Stand 2026-07-19: GHOST-LOKALBETRIEB (lokale Ghost-6-Devinstanz), TMPL-1 (Grundgerüst, 10 Templates+4 Partials), T1 (erster lokaler Tailwind-Build), M1 (Homepage auf Tailwind) fertig, per Abschluss-Ritual nachträglich in Steuerungsartefakte eingepflegt."
metadata: 
  node_type: memory
  type: project
  originSessionId: 10138f1c-7f92-4202-806f-516010c79a0c
  modified: 2026-07-19T20:41:39.910Z
---

Ab 2026-07-19 baut Albert den ersten Ghost.io-Prototypen teils selbst über ein anderes KI-Werkzeug (Codex), nicht nur über Claude Code. Erkennbar an Stand-Headern mit „Geändert von: Codex" in `docs/steering/theme-build/`- und `docs/steering/design/`-Dateien. Diese Arbeit kann daher zwischen Claude-Sessions unangekündigt im Git-Status auftauchen (neue/geänderte Dateien ohne vorherigen Claude-AP) — bei Session-Start oder Abschluss aktiv gegen `git status` prüfen, nicht blind vom letzten HOOK-META-Stand ausgehen.

**Stand 2026-07-19 (per Abschluss-Ritual nachgezogen, Details BACKLOG-ARCHIV.md „Ghost.io-Prototyp-Start"):**
- `GHOST-LOKALBETRIEB.md` — portable Ghost-6-Devinstanz außerhalb des Repos (`C:\Tools\ghost-local\`, eigenes Node 22 + Python-Env, Systeminstallationen unangetastet).
- `TMPL-1-PLAN.md` — Grundgerüst: alle 10 Templates + 4 Partials angelegt (`default/index/post/page/tag/author/error.hbs`, `partials/header/footer/post-card/pagination.hbs`).
- `T1-TAILWIND-PRODUKTIONSBUILD-PLAN.md` — DS-013 entschieden (Quelle `Theme/src/css/screen.source.css` → Auslieferung `Theme/assets/css/screen.css`), erster lokaler Build via `npm run css:build` (Root-`package.json` + `Theme/package.json` neu) erfolgreich, 25,4 KB < 30-KB-Ziel. Produktions-Gate/Mengenvergleich, CDN-Ablösung der Testseiten, JANITOR-FALLBACK bleiben offen (BACKLOG T1).
- `M1-HOMEPAGE-TAILWIND-PLAN.md` + `M1-HOMEPAGE-TAILWIND-KOCHBUCH.md` — 6 sichtbare Homepage-Templates vollständig auf Tailwind umgestellt, lokal sichtgeprüft. `post/page/tag/author/error.hbs` bewusst noch unstyled, `THEME-ASSEMBLY-CHECKLIST.md`-Pflichtinhalte (SEO/JSON-LD/Schema) ungeprüft.

`fw-*` bleibt technischer Namensraum für Chart-Engine/App-Anker, taucht in keinem der neuen Theme-Templates mehr visuell auf — siehe [[project_ci_theme_bridge]] für die parallele CI-/Farbtoken-Bridge-Kette (anderes Teilprojekt, gleiche Tailwind-Initiative).
