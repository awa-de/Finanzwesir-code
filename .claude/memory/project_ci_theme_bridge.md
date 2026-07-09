---
name: project-ci-theme-bridge
description: CI-/Theme-Bridge — Engine/Theme-Seite umgesetzt und committed (1357b46), Spec-Wortlaut nachgeführt (AP-prokrast-kdr14); App-Migration (app.css) offen (AP-17), CI-Fonts noch nicht gebrückt, Property-Zahl-Widerspruch 19 vs. 20 offen (AP-prokrast-16-FOLLOWUP-B)
metadata:
  type: project
---

AP-prokrast-14a–14c (2026-07-07) hat die CI-/Theme-Bridge zwischen `screen.css` (einzige CI-Farb-/Font-Quelle) und Apps analysiert. Kernbefund: A-04 (`docs/App-Fabrik/01_DECISION_LOG.md`, 🟢 ENTSCHIEDEN) fordert, dass Apps dieselbe CSS-Variablen-Theme-Bridge wie die Chart-Engine nutzen (`FwTheme.js`-Muster) — im einzigen real gebauten App-Code (`Apps/prokrastinations-preis/app.css`) ist das nicht umgesetzt. `app.css` nutzt einen eigenen `--fw-*`-Namensraum, dessen 11 CI-semantische Tokens (Farbe/Font/Spacing) repo-weit nirgendwo definiert sind (deterministisch bestätigt, AP-14aR). 6 der 17 `--fw-*`-Tokens sind dagegen funktionierende, bewusst lokale App-Mechanik (Timing/Positionierung) — keine Bridge-Lücke, dürfen nicht mitmigriert werden.

Zusätzlicher Befund (AP-14b): `screen.css` hat nur Marken-Tokens (petrol/blau/purpur/gelb), aber keine Rollen-Tokens (primary/surface/error-*), die `app.css` braucht. Eine reine `--fw-*`→`--color-*`-Umbenennung würde daher ins Leere laufen — es fehlen 3 echte neue Farbentscheidungen (Primary-Zuordnung, Error-Farbfamilie, ggf. Surface), bevor migriert werden kann.

Empfohlener Zielkontrakt: Variante C (Hybrid) — CI-semantische Tokens zentral über `--color-*`, App-Mechanik bleibt app-lokal unter dokumentiertem `--fw-*`-Namensraum. Variante B (Alias-Layer `--fw-*` in `screen.css`) wurde verworfen, da sie der bestehenden `docs/steering/design/CSS-KONVENTIONEN.md`-Regel „`fw-*` ist reserviert für die Chart-Engine, nicht in `screen.css`" widerspricht.

Drei weitere App-Ordner (`regulatorik-dashboard`, `rollierende-sparplaene`, `weltkarte-etf-indizes`) enthalten nicht ins App-Fabrik-Muster integrierte Standalone-HTML-Prototypen mit eigenem Farb-/Font-System — kein AP-15-Scope, aber vorhanden und potenzielles Drift-Risiko für spätere App-Autoren, die sie fälschlich als Vorlage kopieren könnten.

**UMSETZUNG (AP-prokrast-15a–16c, 2026-07-09, DS-015 damit erledigt):** Die Farbrollen wurden entschieden und die Engine-/Theme-Seite umgesetzt. `Theme/assets/css/tokens.css` NEU ist die Single Source of Truth (volle Tailwind-kompatible Leitern 50–900 Petrol/Gelb/Purpur, Seeds gepinnt, am 15c-Board abgenommen; Rollen primary=Petrol/link=Blau/surface=bg-faint/error-Set zentralisiert). `screen.css` importiert `tokens.css` via `@import`, `:root`-Farbblock entfernt. `FwTheme.init()` bridged tokens.css; die drei Strategien bekommen das eine init()'te Theme per Composition Root durchgereicht (AP-16c, Constructor Injection mit Graceful Default) — Chart-Farben laufen live über die CSS-Kaskade, Null-Delta belegt (19/19 byte-identisch). Verbindliche Regeln: `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md`. Kaskaden-Harness: `Theme/chart-tests/AP-16-abnahme.html` (von Albert verifiziert).

**UMSETZUNG committed:** Die gesamte Kette AP-prokrast-15a–16c ist als Commit `1357b46` im Repo (git log verifiziert, 2026-07-09).

**Spec-Wortlaut nachgeführt (AP-prokrast-kdr14, 2026-07-09):** `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` KDR 14 + Datei-Matrix-Theme-Zelle sprachen bis dahin noch von „aktuell hardcoded; geplant" — auf den real umgesetzten Composition-Root-Stand synchronisiert (kein Code geändert). Dabei entdeckt: Kontrakt (`CI-POOL-ROLLENKONTRAKT.md` §8/P15) nennt 20 gelesene `--color-*`-Properties, die AP-16c-Null-Delta-QA maß aber 19 — Widerspruch nicht aufgelöst, sondern als **AP-prokrast-16-FOLLOWUP-B** registriert (Spec nennt die Zahl jetzt nicht mehr konkret, nur noch qualitativ „Null-Delta-QA, AP-16c").

**Noch offen:** (1) **App-Migration** `Apps/prokrastinations-preis/app.css` (`--fw-color-*`/`--fw-font-*`/`--fw-space-*` raus) = AP-prokrast-17. (2) **CI-Fonts** noch NICHT gebrückt — `FwTheme.init()` liest nur `--color-*`, keine `--font-*`; damit auch `FwChartTextPlugin.js`-Font-Fix + RubikonSymbolMarkers-Neumessung (DS-FOLLOWUP-07/08, DS-012/013) weiterhin offen. (3) **Property-Zahl-Widerspruch 19 vs. 20** (AP-prokrast-16-FOLLOWUP-B) — klären, ob Kontrakt-P15 eine veraltete Vor-Migrations-Schätzung ist oder eine Property real nicht gebridged wurde. (4) Standalone-Prototypen-Divergenz bleibt bis T1 (Tailwind-Produktionsbuild).

Ergebnisprotokolle: `docs/steering/patches/AP-prokrast-14a…14c_*`, `..._15a_*`, `..._15b_*`, `..._15c_*`, `..._16_theme-migration_Ergebnis.md`, `..._16b_bridge-konsolidierung-kaskaden-harness_Ergebnis.md`, `..._16c_theme-durchleitung_Ergebnis.md`, `..._kdr14_spec-wortlaut-nachfuehrung_Ergebnis.md`.

Verwandte Memories: [[project_app_fabrik_struktur]], [[project_prokrastinations_preis_drehbuch]], [[project_chartengine_anchormeasurement_contracts]].
