# AP-prokrast-16 — Theme-Migration Stufe 1 — Ergebnis

## Status

GRÜN

„GRÜN" bedeutet hier: **bereit für Alberts manuelle Live-Server-Tests** — nicht „getestet". Die Browser-Verifikation ist ausdrücklich offen und Alberts Part (Testplan unten). Alle acht Arbeitsschritte umgesetzt, alle sechs QA-Ebenen per Python bestanden, Schreib-Scope exakt eingehalten, keine eigenen Designentscheidungen.

## Kurzurteil

Die Theme-Migration ist in einem Lauf vollzogen: `tokens.css` als Single Source of Truth angelegt (Werte byte-identisch zu 15c FINAL), `screen.css` per `@import` angebunden und ihr `:root`-Farbblock vollständig entfernt (keine Duplikate, keine Leichen), drei Alt-Token-Konsumenten + Caption-`#666` umgestellt, `FwTheme`-Bridge und Fallback-Konstanten auf die neuen Stufen nachgezogen (Palette-Slots in Reihenfolge unverändert), zwei Plugin-Hartcodierungen aufgelöst (VerticalLine → Theme-Blau, AnnotationPulse → Petrol-Vollton). Kontrakt §8 auf FINAL gesetzt, §4.3 Pin 600 bestätigt, §10 Ghost-Zeile präzisiert; Erratum in der Rücklaufkapsel. Repo-weit keine weiteren Alt-Token-Konsumenten; keine lokale Seite bindet `screen.css` ein (kein Include bricht).

## Geänderte Dateien (mit Zweck je Datei)

| Datei | Art | Zweck |
|---|---|---|
| `Theme/assets/css/tokens.css` | **neu** | Single Source of Truth: 3 Brand-Leitern 50–900 + blau-700, Aliase, semantische Rollen, Neutral-Familie, Error-Set, Bridge-only-Tokens, Fonts, Schatten. Reines CSS, kein Tailwind-Bezug. |
| `Theme/assets/css/screen.css` | geändert | `@import url("tokens.css")` als erste Regel; `:root`-Block entfernt; 4 Konsumenten umgestellt (petrol-tint/purpur-tint → `color-mix`, petrol-20 → petrol-200, Caption `#666` → `var(--color-text-muted)`). |
| `Theme/assets/js/fw-chart-engine/core/FwTheme.js` | geändert | Bridge-Reads auf neue Stufen-Namen (`--color-petrol-500/-400/-200`, `--color-purpur-400`, `--color-gelb-200`); Konstruktor-Fallbacks auf neue Werte (byte-identisch zu tokens.css). Palette-Reihenfolge/Slots, `getGhostColor`/`getColor` unverändert. |
| `Theme/assets/js/fw-chart-engine/plugins/FwVerticalLinePlugin.js` | geändert | hartcodiertes `#0071bf` → Theme-Blau (`--color-blau` via CSS-Bridge, Fallback `#0071BF`). |
| `Theme/assets/js/fw-chart-engine/plugins/FwAnnotationPulsePlugin.js` | geändert | hartcodiertes `#006273` (2 Stellen) → Petrol-Vollton (`--color-petrol` via CSS-Bridge, Fallback `#218380`, E11/§7.8). |
| `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md` | geändert | §4.3 Pin 600 bestätigt; §8 VORLÄUFIG → **FINAL** mit finalen Werten inkl. Petrol 700–900 + Freigabevermerk; §10 Ghost-Zeile präzisiert; Stand-Zeile. |
| `docs/steering/patches/AP-prokrast-15a_ruecklauf_masterentscheidungen_F1-F11.md` | geändert | Erratum-Block (gelb-80/purpur-80 real vs. abgeleitet) unter Statuszeile. |
| `docs/steering/patches/AP-prokrast-16_theme-migration_Ergebnis.md` | **neu** | dieses Protokoll. |

`Theme/index.html` **nicht** geändert — kein Include bricht (Schritt 7).

## Mapping-Tabelle Alt → Neu (vollständig)

| Alt-Token / Wert | Neu | Neuer Wert | Bestimmung | Konsument(en) |
|---|---|---|---|---|
| `--color-petrol-80` `#4D9C99` | `--color-petrol-500` | `#49B3AF` | AP-Vorgabe (= OKLCH-nächste, ΔE 0,065) | FwTheme `petrol80`-Slot (Palette) |
| `--color-petrol-50` `#90C1BF` | `--color-petrol-400` | `#64CDC9` | AP-Vorgabe (= OKLCH-nächste, ΔE 0,047) | FwTheme `petrol50`-Slot (Palette), — |
| `--color-petrol-20` `#D3E6E6` | `--color-petrol-200` | `#B4EEEB` | AP-Vorgabe (= OKLCH-nächste, ΔE 0,039) | screen.css `.box-petrol`-Border, FwTheme `petrol20` |
| `--color-gelb-80` `#F9EF9E` | `--color-gelb-200` | `#FCF09C` | OKLCH-nächste (ΔE 0,0056 — quasi identisch); Palette = Data-Viz, keine Regelkollision | FwTheme `gelb80`-Slot (Palette) |
| `--color-purpur-80` `#C57EB2` | `--color-purpur-400` | `#F172C1` | OKLCH-nächste (ΔE 0,082); Palette = Data-Viz, Purpur 300–600 erlaubt (§7.3) → keine Kollision | FwTheme `purpur80`-Slot (Palette) |
| `--color-petrol-tint` `rgba(33,131,128,0.08)` | `color-mix(... petrol-600 8% ...)` | pixel-identisch | Kontrakt §4.4 (Alpha statt Pseudostufe) | screen.css `.box-petrol`-BG |
| `--color-purpur-tint` `rgba(141,2,103,0.08)` | `color-mix(... purpur-900 8% ...)` | pixel-identisch | Kontrakt §4.4 | screen.css `.box-purpur`-BG |
| Caption `#666` (hartcodiert) | `var(--color-text-muted)` | `#666666` | 15a-Fund, tokenisiert | screen.css `.gh-content img + em` |
| `#0071bf` (hartcodiert) | `--color-blau` (Theme) / Fallback `#0071BF` | `#0071BF` | Bridge-Lücke geschlossen | FwVerticalLinePlugin |
| `#006273` (hartcodiert) | `--color-petrol` (Theme) / Fallback `#218380` | `#218380` | E11/§7.8 | FwAnnotationPulsePlugin |

**Ersatzlos entfallen** (unused, keine Konsumenten repo-weit): `--color-gelb-tint`, `--color-gelb-30`, `--color-petrol-30`, `--color-purpur-30`. Sie waren in `screen.css` definiert, aber nirgends verwendet (Definition-vs-Use bestätigt) — nicht nach `tokens.css` übernommen (Deckkraft künftig per Alpha-Modifier/`color-mix`, Kontrakt §4.4).

**Kollisions-Check (AP-Vorgabe):** Für gelb-80/purpur-80 galt „nächste Stufe vs. Nutzungsregel — Nutzungsregel gewinnt". Beide Konsumenten sind die **FwTheme-Palette (Data-Viz)**, nicht Box-/Flächen-Konsumenten. Die §7-Beschränkung „Box/Fläche → Stufe 50–200" greift hier nicht; für Data-Viz ist Purpur 300–600 ausdrücklich Reserve (§7.3). → **keine Kollision, OKLCH-nächste Stufe direkt anwendbar.**

**Hinweis zu JS-Key-Namen:** Die FwTheme-Objektschlüssel (`petrol80`, `petrol50`, `petrol20`, `purpur80`, `gelb80`) bleiben unverändert (Slot-Erhalt, wie AP vorgegeben) — sie tragen jetzt aber die gemappten neuen Stufenwerte. Umbenennung wäre breitere Chirurgie (Palette-Referenzen, `_allowedColors`) ohne funktionalen Gewinn und wurde bewusst unterlassen (Surgical-Check). Kommentar im Code kennzeichnet den Versatz.

## Nicht geändert

Explizit bestätigt, nicht berührt:

- `Apps/prokrastinations-preis/app.css`, `app.js` — nicht angefasst (AP-17). App liest nichts aus `screen.css` (eigener `--fw-*`-Raum), bleibt funktional unberührt.
- `FwChartTextPlugin.js` — nicht angefasst (Font-Bridge nur mit Rubikon-Nachmessung, eigener Mini-AP).
- `ChartEngine.js`, `FwRenderer.js`, Strategien (`*ChartStrategy.js`) — nicht angefasst.
- Design-System-Templates, Standalone-Demos — nicht angefasst (bewusste Übergangs-Divergenz P20/T1).
- Tabu-Zonen (`FinanzwesirData.js`, `CSVParser.js`, `FwDateUtils.js`, `fwContext`-Struktur) — nicht berührt; PROTECTED_PATHS.json vorab geprüft (keine Zieldatei protected/forbidden).
- `BACKLOG.md`, `session-log.md` erscheinen in `git status` als `M`, stammen aber aus **AP-15b (T1-Eintrag)** bzw. dem Warm-Start dieser Session — **nicht** aus AP-16.

## Nachweis-QA (alle sechs Ebenen, Python-belegt)

1. **Definition-vs-Use:** 55 Tokens in `tokens.css` definiert; 23 distinct `var()`/`getPropertyValue`/`read`-Nutzungen in `screen.css` + Engine — **0 unauflösbar** (alle definiert; `--fw-*` app-lokal liegt außerhalb Scope). → OK
2. **Altlasten-QA (wortgrenzen-genau, kommentarbereinigt):** **0 echte aktive Vorkommen** von `--color-petrol-80/-50/-20`, `--color-gelb-80`, `--color-purpur-80`, `-tint`, `-30`, `#006273`, hartcodiertem `#0071bf`, Caption-`#666` in aktivem Code. (Substring-Fehlalarme `-50 ⊂ -500` / `-20 ⊂ -200` sowie Kommentar-Erwähnungen „war …" ausgeschlossen.) → OK
3. **Seed- & Wertekonsistenz:** Seeds byte-identisch in `tokens.css` (petrol-600 `#218380`, gelb-500 `#DFC805`, purpur-900 `#8D0267`, blau-700 `#0071BF`); alle 5 gemappten Werte byte-identisch in `tokens.css` **und** `FwTheme.js`-Fallback; alle 30 15c-Leiterwerte in `tokens.css` vorhanden. → OK
4. **Marker-QA:** Kontrakt §8 „Status FINAL" + „✓ FINAL — verbindlich" + Freigabevermerk „abgenommen durch Albert am 15c-Board"; §4.3 „Pin 600 per Masterentscheidung bestätigt"; Erratum-Block in Rücklaufkapsel; `/* CHANGED */`-Marker: screen.css 4 + `@import`(NEW), FwTheme 6, VLine 1, Pulse 3. → OK
5. **Scope-QA:** `git diff --name-status` zeigt als von AP-16 geändert ausschließlich gelistete Dateien (screen.css, FwTheme.js, 2 Plugins tracked-modified; tokens.css, Kontrakt, Rücklaufkapsel, dieses Protokoll untracked/neu). `BACKLOG.md`/`session-log.md`-`M` sind Vor-AP-Stände (15b/Warm-Start). → OK
6. **Wiederlesen:** Alle geänderten Dateien vollständig per Python erneut gelesen und abgeglichen (Body-QA); `@import` ist die **erste** Nicht-Kommentar-Regel in `screen.css`, `:root` vollständig ausgelagert (kein `:root` mehr in screen.css). → OK

## Manueller Testplan für Albert (Live-Server)

**Wichtige Rahmenbedingung:** Aktuell bindet **keine** lokale Seite `screen.css` ein. Der Chart-Harness `Theme/index.html` nutzt eigenes Inline-CSS ohne `--color-*`-Variablen. Deshalb liest `FwTheme.init()` dort leere CSS-Variablen und fällt auf die **Konstruktor-Fallbacks** zurück — die habe ich byte-identisch auf die neuen Werte gesetzt. **Ergebnis:** `Theme/index.html` prüft den neuen Palette-Stand über den JS-Fallback-Pfad (= dieselben Werte wie `tokens.css`). Die vollständige CSS-Kaskade (`tokens.css` → `screen.css` → Bridge-Reads) wird erst mit einer `screen.css`-ladenden Seite (Theme-Build) scharf — das ist bewusst so (Masterentscheidung 3: keine Ghost-Live-Kette in diesem AP).

**Schritte (Live-Server, `Theme/index.html`), Viewport S / M / L je einmal:**

1. **Achsen/Grid/Nulllinie:** Achsentext gedämpftes Grau (`#666`), Gridlinien hellgrau (`#E7ECEF`), Nulllinie mittelgrau (`#999`) — **unverändert** gegenüber vorher.
2. **Balkenfarben Single-Asset:** positive Balken **Petrol `#218380`**, negative **Purpur `#8D0267`** — **unverändert** (Basisfarben).
3. **Multi-Serie-Palette:** Serien 1–4 (Blau/Purpur/Petrol/Gelb) **unverändert**; Serien 5–7 tragen die neuen Stufen — **erwartete sichtbare Abweichung (P13):** Serie 5 (früher Purpur-80 `#C57EB2`) ist jetzt **`#F172C1` — sichtbar pinker/kräftiger**; Serie 6 (früher Petrol-50) `#64CDC9`; Serie 7 (früher Gelb-80) `#FCF09C`. Charts mit ≥ 5 Serien im Test (`E-`/Multi-Charts) zeigen das.
4. **Asset-Modus-Fächer (Balken):** wird aus `getGhostColor(getColor(i), opacity)` berechnet — Basisfarben unverändert, aber Fächer, die Palette-Slots 5–7 nutzen, zeigen die neuen Töne. Verlauf (0,35 → 1,0 Deckkraft) sonst unverändert.
5. **Ergebnislinie (vertikale blaue Linie, `FwVerticalLinePlugin`):** blau gestrichelt am letzten Datenpunkt. In `Theme/index.html` (ohne `--color-blau`) greift der Fallback `#0071BF` — **muss blau bleiben**, nicht schwarz/leer.
6. **Pulse-Ring (`FwAnnotationPulsePlugin`):** In `Theme/index.html` nicht aktiv (nur im App-Screen-2-Kontext). Der Fallback ist jetzt **Petrol `#218380`** statt `#006273` — final zu verifizieren im App-Pilot (AP-17).

**Erwartete bewusste Abweichungen (kein Fehler, P13):** Multi-Serie-Slots 5–7 (s. 3); auf einer künftigen `screen.css`-Seite zusätzlich: Info-Box-Border `.box-petrol` von `#D3E6E6` → `#B4EEEB` (kräftiger); Box-Hintergründe via `color-mix` **pixel-identisch**.

**Mögliche Regressionen (gezielt gegenprüfen):**
- **`color-mix`-Browserunterstützung:** `color-mix(in srgb, …)` braucht einen aktuellen Browser (Chrome ≥ 111, Firefox ≥ 113, Safari ≥ 16.2). Nur relevant, sobald eine Seite `screen.css` lädt (Box-Hintergründe). Im aktuellen Live-Server-Setup (Chart-Harness) nicht ausgelöst.
- **`@import`-Auflösung:** relative Auflösung `tokens.css` neben `screen.css` — nur relevant, sobald `screen.css` geladen wird.
- **Palette-Verwechslung:** Prüfen, dass Serien 1–4 wirklich unverändert sind (nur 5–7 sollen driften).

## Offene Punkte

1. **CSS-Kaskade lokal nicht scharf prüfbar:** Da keine lokale Seite `screen.css` lädt, wird die Bridge-Read-Kette (`tokens.css` → `screen.css` → `FwTheme` liest `--color-petrol-500` etc.) lokal nicht ausgeführt — nur der Fallback-Pfad (byte-identische Werte). Vollständige Kaskadenprüfung erst mit Theme-Build (BACKLOG TMPL-1/T1). Funktional folgenlos, da Fallback == Token-Wert.
2. **Pulse-Ring-Farbe** final erst im App-Pilot (AP-17) sichtbar (Screen-2-Kontext).
3. **`color-mix`-Support** erst bei screen.css-ladender Seite relevant (s. Regressionen).

## Empfehlung

- **Nächster Schritt:** Alberts manuelle Tests im Live-Server (`Theme/index.html`, Viewport S/M/L) nach obigem Plan. Bei Befund: Rückmeldung **vor** jedem weiteren Patch (kein Blind-Nachbessern).
- **Danach:** `AP-prokrast-17 — Pilot-Migration prokrastinations-preis` (dort `--fw-color-*`/`--fw-font-*`/`--fw-space-*` raus, Pulse-Ring im App-Kontext verifizieren, `QA_TEST_CASES.md` erneut).
- **Ausdrücklich nicht:** Commit, Standalone-Demos/Templates, Font-Bridge (`FwChartTextPlugin`), Tailwind-Produktionsbuild.
- **Umsetzungsfreigabe für weitere Änderungen:** nein — erst nach Alberts Testrückmeldung.
