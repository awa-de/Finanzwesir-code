Stand: 2026-07-09 19:47 | Session: AP-prokrast-17 | Geändert von: Claude

# AP-prokrast-17 — Ergebnisprotokoll: Pilot-Migration `prokrastinations-preis` (CI-Farbtoken `--fw-color-*` → Kontrakt-Tokens)

**Status:** GRÜN (Vier-QA statisch bestanden) · **Blocker:** nein · **Commit:** nein (Freigabe bei Albert) · **Typ:** APP-ARBEIT + Full-Gate, zweiphasig

---

## 1. Gelesen (Phase A, read-only)

| Datei | Zweck | Kernbefund |
|---|---|---|
| `Apps/prokrastinations-preis/app.css` | Migrationsobjekt | 44 CI-Referenzen (24 Farbe, 1 Font, 19 Space) über hartcodierte Fallbacks; `--fw-*`-Tokens nirgends definiert |
| `Apps/prokrastinations-preis/app.test.html` | Testharness | lädt nur `./app.css` + Chart.js-CDN + `app.js` — keine `tokens.css`/`screen.css`/Tailwind |
| `Apps/prokrastinations-preis/APP_SPEC.md` §Steuerungsblock | 80%-Entwurf-Gate | Zweck B1-Stationen-Zeitreise; Nicht-Ziel „keine rote Panikcodierung" — durch Petrol-Primary nicht verletzt |
| `docs/spec/APP-INTERFACE.md` | APP-ARBEIT-Pflicht | Schnittstellen-/Sicherheitsvertrag; CSS-Isolation `fw-app`-Namespace |
| `docs/steering/audits/SECURITY-BASELINE.md` | APP-ARBEIT-Pflicht | §6.10 CSS-Isolation; Migration ist rein visuell, keine Angriffsfläche |
| `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md` §1/§8/§9 | Mapping-Quelle | Ziel-Rollen + FINAL-Hex; §9 Font-Bridge-Ausklammerung |
| `Theme/assets/css/tokens.css` | Ground-Truth Ziel-Werte | alle 8 Ziel-Tokens real vorhanden (§8-Stop abgesichert) |

## 2. Mapping-Tabelle (Ist gegen `tokens.css`, real verifiziert)

| Alt-Token (Pilot) | × | Alt-Fallback | Ziel-Token | Ziel-Fallback (Kontrakt-FINAL) | Delta |
|---|---|---|---|---|---|
| `--fw-color-error-text` | 1 | `#b71c1c` | `--color-error-text` | `#b71c1c` | null |
| `--fw-color-error-border` | 1 | `#c62828` | `--color-error-border` | `#c62828` | null |
| `--fw-color-error-bg` | 1 | `#fff8f8` | `--color-error-bg` | `#fff8f8` | null |
| `--fw-color-bg` | 3 | `#ffffff` | `--color-bg` | `#ffffff` | null |
| `--fw-color-muted` | 8 | `#555555` | `--color-text-muted` | `#666666` | **DRIFT** (P16, Fork 3) |
| `--fw-color-primary` | 5 | `#0071bf` | `--color-primary` | `#218380` (Petrol) | **DRIFT** (Fork 4, §1.1-Anomalie-Korrektur) |
| `--fw-color-text` | 4 | `#1a1a1a` | `--color-text` | `#272727` | **DRIFT** (klein) |
| `--fw-color-surface` | 1 | `#f5f5f5` | `--color-surface` | `#fafafa` | **DRIFT** (§7.5 unter Wahrnehmungsschwelle) |

Summe migriert: **24 Farb-Referenzen / 8 Tokens.** Fallback-Casing bewusst lowercase (Datei-Stil, Surgical-Check); Werte = Kontrakt-FINAL.

## 3. Fork-Entscheidungen (durch Albert, Phase B)

| Fork | Entscheidung |
|---|---|
| 1 — Token-Auflösung | **Variante A**: `tokens.css` als `<link>` in `app.test.html` (eine Zeile, VOR `app.css`). Keine Ghost-/Prod-Bindung (bleibt T1). Ziel-Fallbacks = Kontrakt-FINAL je Token. |
| 2 — `--fw-space-*` | **VERTAGT**: unberührt (kein Ziel-Token; „`--fw-*` nur App-Mechanik" legitimiert; Tailwind-Spacing erst T1). |
| 3 — `muted` | **JA**: `#555555` → `--color-text-muted` (`#666666`), P16. |
| 4 — `primary` | **JA**: Blau `#0071bf` → `--color-primary` (Petrol `#218380`). Visuelle Abnahme im `app.test.html`-Schritt. |
| 5 — `font` | **NICHT migrieren**: `--fw-font-base` bleibt (Kontrakt §9 + Rubikon-Kopplung DS-FOLLOWUP-07). Font-Migration = eigener Mini-AP mit Nachmessung. → §8-Font-Stop damit aufgelöst. |

## 4. Geändert

| Datei | Änderung |
|---|---|
| `Apps/prokrastinations-preis/app.css` | 24 Farb-Referenzen `var(--fw-color-*)` → `var(--color-*)` mit Kontrakt-FINAL-Fallbacks; 1 Doku-Header-Kommentar (statt 24 Inline-Marker). Deterministischer Python-Replace mit Count-Assertions. |
| `Apps/prokrastinations-preis/app.test.html` | 1 `<link rel="stylesheet" href="../../Theme/assets/css/tokens.css">` VOR `app.css` + Kommentar (Dev-Harness-Bindung, T1-Abgrenzung). |

## 5. Bewusst NICHT geändert

| Element | Grund |
|---|---|
| `--fw-font-base` (1×) | Fork 5 / Kontrakt §9 Font-Ausklammerung + Rubikon-Metrik-Kopplung |
| `--fw-space-md/-sm` (19×) | Fork 2 / Kontrakt §7.6 (Tailwind-Spacing erst T1) |
| Mechanik-`--fw-*` (flight-duration, screen3-reveal, flight-delta-x/-y, rubikon-text-top/left) | Tabu §4 — bewusst lokale Mechanik |
| `app.js` | Nicht-Ziel §0; liest `--fw-card-to-point-flight-duration` unter diesem Namen (Timing-Kopplung) |
| Engine/Theme/Plugins/`tokens.css`/`screen.css`/Specs | Nicht-Ziel §0 |

## 6. Datei-Wahrheit nach Wiederlesen (nicht Protokoll)

- `app.css` neu gelesen: `--fw-font-base` (Z.13) steht, `--color-text/-bg/-error-*/-text-muted/-primary/-surface` real vorhanden, Mechanik-/Space-Deklarationen unverändert.
- Determinismus-Nachweis: `var(--color-` = 24 · `var(--fw-color` = **0** · `var(--fw-font-` = 1 · `var(--fw-space-` = 19 · Mechanik-Vorkommen = 20.
- 8 distinkte Ziel-Tokens: `--color-bg, --color-error-bg, --color-error-border, --color-error-text, --color-primary, --color-surface, --color-text, --color-text-muted`.

## 7. Altlasten weg / Scope

- Keine Live-`var(--fw-color-*)` mehr in `app.css` (0).
- `git diff --name-status`: genau `app.css` + `app.test.html` (+ AP-fremder /start-Vorzustand `session-log.md`, `project_content_system.md`). `app.js` nicht im Diff.

## 8. Manuelle QA (Live-Server) — Farb-Abnahme durch Albert bestätigt (2026-07-09)

**Abnahme-Ergebnis:** Albert hat im VSCode-Live-Server (`app.test.html`) bestätigt: Buttons/Slider Petrol und lesbar; Fließtext/Surface keine wahrnehmbare Änderung; Screen-Durchlauf + Animationen (Card-to-Point-Flug, Screen-3-Reveal) ok; CSS-Leak-Check (Szenario G) unauffällig (Überschrift/Hintergrund wie immer).

**Objektive Gegenprobe (Konsolen-Check, `--color-*` real aus der Kaskade aufgelöst):** alle 5 Tokens `Match ✅` (aufgelöster Wert == Kontrakt-FINAL, nicht die Fallback-Hexe). ΔE76 alt→neu: Fließtext 6,37 · Gedämpft 7,05 · Surface 1,73 (klein, im UI-Kontext unauffällig) · Primary 52,02 (bewusst sichtbar) · Hintergrund 0,00. → **Farb-Auflösung browserseitig empirisch bestätigt**, nicht nur statisch. Der Check ist als wiederverwendbares Tool persistiert: `tools/ci-token-check.js` (generisch, eigene Tokenliste übergebbar — für T1-Ghost-Anbindung und Font-Migration nachnutzbar).

**Noch offen (nicht in diesem AP behauptet):** Screenreader-Volltest; systematischer S/M/L-Viewport-Durchlauf als dokumentierte Matrix (Farb-Abnahme erfolgte visuell, nicht pro Breakpoint protokolliert).

Erwartete Prüfpunkte im VSCode-Live-Server (`app.test.html`), S/M/L (375/768/1280px):

| Prüfpunkt | Erwartung |
|---|---|
| **Primary/Petrol (Fork 4)** | Slider-Accent, alle Buttons (Border+Fläche), `--next`-Button, CTA jetzt **Petrol `#218380`** statt Blau. Bewusste, kontrakttreue Farbänderung — visuell abnehmen. |
| **muted (Fork 3)** | Sublines, Labels, Fußnoten minimal heller (`#555`→`#666`). |
| **text/surface** | Textfarbe `#272727` (leicht dunkler), KPI-Card-Fläche `#fafafa` (≈ unverändert). |
| **Error-States (B/F/H–N)** | Farben unverändert (Null-Delta), Meldungen auf Deutsch, kein Stacktrace. |
| **Rubikon-Text (Screen 4)** | Position unverändert — Font wurde bewusst NICHT migriert (Metrik stabil). |
| **CSS-Leak (Szenario G)** | Artikeltext neben `.fw-app` unverändert. |
| **Konsole** | keine JS-Exception; `tokens.css` lädt (200). |

## 9. Restliste / Klassifikation

| Punkt | Kategorie | Status |
|---|---|---|
| Ghost-/Prod-Bindung von `tokens.css` | Testharness-/Auslieferungslücke | offen → To-do **T1** (bewusst nicht hier) |
| `--fw-space-*` → Tailwind-Spacing | CSS-Integrationspunkt | vertagt → **T1** (Fork 2) |
| `--fw-font-base` → `--font-body` | CSS-/Metrik-Punkt | eigener Mini-AP mit Rubikon-Nachmessung (**DS-FOLLOWUP-07**, Fork 5) |
| Browser-Farb-QA | QA | **bestätigt** (Albert visuell + Konsolen-ΔE-Check, 2026-07-09) |
| Screenreader-Volltest + S/M/L-Viewport-Matrix | QA | offen (Farb-Abnahme erfolgte, systematische Breakpoint-Matrix nicht protokolliert) |

## 10. Nächster AP

- **Nächster AP (bei GRÜN):** `QA_TEST_CASES.md` vervollständigen + `app.test.html`-Abnahme durch Albert (Farbabnahme Fork 4).
- **Ausdrücklich NICHT nächster AP in diesem Faden:** QA_TEST_CASES-Rewrite, Ghost-Template-Bau, AP-18, Font-Migration, Commit.
