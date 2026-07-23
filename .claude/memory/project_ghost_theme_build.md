---
name: project-ghost-theme-build
description: "Ghost.io-Prototyp (Theme/-Templates) wird teilweise von Albert über ein anderes KI-Werkzeug (Codex) außerhalb von Claude-Code-Sessions gebaut — Stand 2026-07-19: GHOST-LOKALBETRIEB, TMPL-1, T1, M1 fertig. Stand 2026-07-21: SEO/GEO-Page-Feldvertrag (GHOST-02–04) umgesetzt und browserverifiziert; gesicherte Ghost-Fakten zu ghost_head-Duplikaten und {{#has}}-Tag-Syntax; Ergebnisdateien externer Prompt-Ketten jetzt in docs/steering/patches/. Stand 2026-07-23: Projekt nutzt real nur Ghost-Pages/Homepage, keine Posts — fw-janitor.js war deshalb nur in post.hbs verdrahtet und griff nie, jetzt auch in page.hbs; tokens.css jetzt per barem Import in screen.css eingebettet (D-CSS-03); zwei offene Janitor-Detailfehler (Icons, rote Kreuze) an DS-015 vermerkt."
metadata: 
  node_type: memory
  type: project
  originSessionId: 10138f1c-7f92-4202-806f-516010c79a0c
  modified: 2026-07-23T09:06:24.559Z
---

Ab 2026-07-19 baut Albert den ersten Ghost.io-Prototypen teils selbst über ein anderes KI-Werkzeug (Codex), nicht nur über Claude Code. Erkennbar an Stand-Headern mit „Geändert von: Codex" in `docs/steering/theme-build/`- und `docs/steering/design/`-Dateien. Diese Arbeit kann daher zwischen Claude-Sessions unangekündigt im Git-Status auftauchen (neue/geänderte Dateien ohne vorherigen Claude-AP) — bei Session-Start oder Abschluss aktiv gegen `git status` prüfen, nicht blind vom letzten HOOK-META-Stand ausgehen.

**Stand 2026-07-19 (per Abschluss-Ritual nachgezogen, Details BACKLOG-ARCHIV.md „Ghost.io-Prototyp-Start"):**
- `GHOST-LOKALBETRIEB.md` — portable Ghost-6-Devinstanz außerhalb des Repos (`C:\Tools\ghost-local\`, eigenes Node 22 + Python-Env, Systeminstallationen unangetastet).
- `TMPL-1-PLAN.md` — Grundgerüst: alle 10 Templates + 4 Partials angelegt (`default/index/post/page/tag/author/error.hbs`, `partials/header/footer/post-card/pagination.hbs`).
- `T1-TAILWIND-PRODUKTIONSBUILD-PLAN.md` — DS-013 entschieden (Quelle `Theme/src/css/screen.source.css` → Auslieferung `Theme/assets/css/screen.css`), erster lokaler Build via `npm run css:build` (Root-`package.json` + `Theme/package.json` neu) erfolgreich, 25,4 KB < 30-KB-Ziel. Produktions-Gate/Mengenvergleich, CDN-Ablösung der Testseiten, JANITOR-FALLBACK bleiben offen (BACKLOG T1).
- `M1-HOMEPAGE-TAILWIND-PLAN.md` + `M1-HOMEPAGE-TAILWIND-KOCHBUCH.md` — 6 sichtbare Homepage-Templates vollständig auf Tailwind umgestellt, lokal sichtgeprüft. `post/page/tag/author/error.hbs` bewusst noch unstyled.

`fw-*` bleibt technischer Namensraum für Chart-Engine/App-Anker, taucht in keinem der neuen Theme-Templates mehr visuell auf — siehe [[project_ci_theme_bridge]] für die parallele CI-/Farbtoken-Bridge-Kette (anderes Teilprojekt, gleiche Tailwind-Initiative).

**Stand 2026-07-21 (GHOST-02–04, SEO/GEO-Page-Feldvertrag für `page.hbs`):**
- Arbeitsmuster bestätigt: ein externes steuerndes LLM (ChatGPT) legt fertige Auftrags-Prompts als `claude_prompt_GHOST-NN_*.md` in `Archiv/local/muss noch eingeordnet werden/` ab; Albert übergibt sie mit „lies und führe exakt aus"; Ergebnis-/Patchdateien gehen **ab dieser Kette** nach `docs/steering/patches/` (nicht mehr nach `Archiv/local/` — Albert-Korrektur, gilt für künftige Ergebnisdateien dieses Musters).
- Gesicherte Ghost-Theme-Fakten (browserverifiziert, nicht nur dokumentiert): `{{ghost_head}}` erzeugt Meta Description/Canonical/OG/Twitter-Tags selbst, sobald das jeweilige Ghost-Feld befüllt ist — eine zusätzliche manuelle Zeile im Theme erzeugt ein Duplikat. `{{#has tag="..."}}` matcht interne Tags über den literalen Namen samt `#` (`tag="#schema-about"`), **nicht** über die „hash-<name>"-Slug-Form (das ist nur die CSS-Klassen-Konvention für `body_class`/`post_class`). `@site.twitter`/`@site.facebook` liefern rohe Handles, keine URLs.
- `THEME-ASSEMBLY-CHECKLIST.md` wurde in den direkt widerlegten Punkten korrigiert (Head-Inhalt von `default.hbs`, `page.hbs`-Beschreibung, Escaping-Ausnahmeliste für `{{{block "head"}}}`), der übrige, seit 2026-05-03 kaum aktualisierte Rest der Checkliste (fast durchgehend „[ ]" trotz weitgehend gebautem Theme) blieb bewusst unangetastet — offener Abgleich-Bedarf, kein eigener AP vergeben.

**Stand 2026-07-23 (CSS-Altlasten geschlossen, Janitor-Produktionslücke gefunden+gefixt):**
- **Wichtiger Produktionsfakt:** Das Projekt nutzt in der Praxis nur Ghost-**Pages** und die Homepage, **keine echten Blog-Posts**. Skripte, die für echte Live-Inhalte gedacht sind, müssen deshalb in `page.hbs` eingebunden sein, nicht nur in `post.hbs` — ein rein an `post.hbs` orientierter Blick auf „ist X eingebunden" ist in diesem Projekt irreführend.
- Konkreter Fund: `fw-janitor.js` war ursprünglich nur innerhalb des `{{#post}}`-Blocks in `post.hbs` eingebunden und griff dadurch in der realen Produktionsumgebung nie. Fix: dieselbe Script-Zeile zusätzlich in `page.hbs` ergänzt (dupliziert, nicht nach `default.hbs` zentralisiert, weil `default.hbs` `forbidden` ist).
- `tokens.css` wird jetzt per barem Import (`@import "…";`, nicht `url()`) in `screen.css` eingebettet und dort inlined (D-CSS-03 präzisiert, `01_DECISION_LOG.md`) — vorher blieb es trotz gegenteiliger Doku-Behauptung ein zweiter Laufzeit-Download. Die leere `JANITOR FALLBACK`-Sektion (Abschnitt 7) wurde ersatzlos aus `screen.source.css` und `CSS-KONVENTIONEN.md` entfernt (jetzt 6 statt 7 Abschnitte).
- `screen.css` misst nach der Einbettung 31.594 Bytes / 6.564 Bytes gzip — über dem alten 30-KB-Ziel; BACKLOG CSS-6 bewusst nicht als Weglass-Gate umformuliert, bleibt offen.
- Nach dem Fix vom Nutzer bestätigt: Janitor lädt jetzt, hat aber zwei offene Detailfehler — fehlende Icons bei Info-/Warn-Boxen, rote Kreuze in Listen funktionieren nicht (grüne Haken schon). Vermerkt in BACKLOG DS-015, nicht behoben in dieser Kette.
- Zwei Ghost-Theme-ZIPs erzeugt (`finanzwesir-local-theme-janitor-tokens-v1.zip`, `-v2.zip`) über manuell konstruiertes `System.IO.Compression.ZipArchive` mit auf `/` normalisierten Pfaden (bekanntes `Compress-Archive`/`CreateFromDirectory`-Backslash-Problem erneut umgangen).
