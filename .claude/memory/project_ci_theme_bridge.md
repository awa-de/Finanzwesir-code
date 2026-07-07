---
name: project-ci-theme-bridge
description: CI-/Theme-Bridge-Lücke zwischen App-Fabrik-Apps und screen.css — Status nach AP-prokrast-14a–14c, Masterentscheidung zu Farbrollen vor AP-15 offen
metadata:
  type: project
---

AP-prokrast-14a–14c (2026-07-07) hat die CI-/Theme-Bridge zwischen `screen.css` (einzige CI-Farb-/Font-Quelle) und Apps analysiert. Kernbefund: A-04 (`docs/App-Fabrik/01_DECISION_LOG.md`, 🟢 ENTSCHIEDEN) fordert, dass Apps dieselbe CSS-Variablen-Theme-Bridge wie die Chart-Engine nutzen (`FwTheme.js`-Muster) — im einzigen real gebauten App-Code (`Apps/prokrastinations-preis/app.css`) ist das nicht umgesetzt. `app.css` nutzt einen eigenen `--fw-*`-Namensraum, dessen 11 CI-semantische Tokens (Farbe/Font/Spacing) repo-weit nirgendwo definiert sind (deterministisch bestätigt, AP-14aR). 6 der 17 `--fw-*`-Tokens sind dagegen funktionierende, bewusst lokale App-Mechanik (Timing/Positionierung) — keine Bridge-Lücke, dürfen nicht mitmigriert werden.

Zusätzlicher Befund (AP-14b): `screen.css` hat nur Marken-Tokens (petrol/blau/purpur/gelb), aber keine Rollen-Tokens (primary/surface/error-*), die `app.css` braucht. Eine reine `--fw-*`→`--color-*`-Umbenennung würde daher ins Leere laufen — es fehlen 3 echte neue Farbentscheidungen (Primary-Zuordnung, Error-Farbfamilie, ggf. Surface), bevor migriert werden kann.

Empfohlener Zielkontrakt: Variante C (Hybrid) — CI-semantische Tokens zentral über `--color-*`, App-Mechanik bleibt app-lokal unter dokumentiertem `--fw-*`-Namensraum. Variante B (Alias-Layer `--fw-*` in `screen.css`) wurde verworfen, da sie der bestehenden `docs/steering/design/CSS-KONVENTIONEN.md`-Regel „`fw-*` ist reserviert für die Chart-Engine, nicht in `screen.css`" widerspricht.

Drei weitere App-Ordner (`regulatorik-dashboard`, `rollierende-sparplaene`, `weltkarte-etf-indizes`) enthalten nicht ins App-Fabrik-Muster integrierte Standalone-HTML-Prototypen mit eigenem Farb-/Font-System — kein AP-15-Scope, aber vorhanden und potenzielles Drift-Risiko für spätere App-Autoren, die sie fälschlich als Vorlage kopieren könnten.

**Status:** BACKLOG DS-015 registriert die offene Masterentscheidung (Primary/Error-Familie/ggf. Surface). AP-prokrast-15 (Umsetzung Stufe 1) darf laut Rücklaufkapsel (AP-14c, bewusst GELB) erst starten, wenn Albert diese Entscheidung getroffen hat. `FwChartTextPlugin.js`-Font-Fix (hartcodiert `sans-serif`, kein Theme-Zugriff) und die dadurch ausgelöste RubikonSymbolMarkers-Neumessung (DS-FOLLOWUP-07) sind bewusst als sequenzabhängiger Folge-Mini-AP nach AP-15 eingeordnet, nicht Teil von AP-15 selbst.

Ergebnisprotokolle: `docs/steering/patches/AP-prokrast-14a_ci-theme-bridge_inventar_Ergebnis.md`, `..._14aR_claims-vs-files-review_Ergebnis.md`, `..._14b_ci-theme-bridge_zielkontrakt-analyse_Ergebnis.md`, `..._14c_ruecklaufkapsel_master_Ergebnis.md`.

Verwandte Memories: [[project_app_fabrik_struktur]], [[project_prokrastinations_preis_drehbuch]], [[project_chartengine_anchormeasurement_contracts]].
