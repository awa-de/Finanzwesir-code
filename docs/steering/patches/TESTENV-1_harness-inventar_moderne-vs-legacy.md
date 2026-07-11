Stand: 2026-07-11 07:28 | Session: AP-prokrast-17-FONT-CODE-B (Nebenprodukt) | Geändert von: Claude

# Test-Harness-Inventar: „moderne" vs. Legacy-Testseiten (Groundwork TESTENV-1)

**Zweck dieser Datei:** Vorarbeit für einen späteren Faden, dessen Ziel die **Vereinheitlichung der Testumgebung** ist (BACKLOG **TESTENV-1**, Harness-Versionierung). Sie beschreibt evidenzbasiert, worin sich die aktuellen Testseiten unterscheiden, damit ein anderes LLM ohne Vorwissen darauf aufbauen und die Angleichung planen kann. **Sie ändert nichts** — reines Inventar.

**Erhebungsmethode:** deterministischer Merkmals-Scan (Python) über alle 19 Dateien in `Theme/chart-tests/*.html` + `Apps/prokrastinations-preis/app.test.html`, plus Kopf-Lektüre der beiden modernen Referenzen. Stichtag 2026-07-11.

---

## 1. Die drei Kategorien

### A) Moderne **App**-Testseite — `Apps/prokrastinations-preis/app.test.html`
Die einzige Seite, die die **echte App** (nicht nur die Engine) fährt.
- Lädt `../../Theme/assets/css/tokens.css` **vor** `./app.css` (bewusst, damit `--color-*`/`--font-*` im App-Laufzeitkontext auflösen — Kommentar Z.7-8).
- Lädt **kein** `screen.css`.
- Chart.js **vom CDN** (`cdn.jsdelivr.net`).
- Rendert echte `<div class="fw-app" data-fw-app=… data-fw-data=…>` → exerziert `app.js` + Engine + Datenlayer.
- Eigenes Inline-`<style>` nur für das Seiten-Chrome (`body{font-family:sans-serif}`, `.test-*`) — ausdrücklich „gehört nicht in app.css".
- ES-Module → **nur über Live Server** lauffähig, nicht `file://`.
- Ergebnis `fwTokenCheck()`/`fwFontCheck()`: **alles ✅** (tokens.css greift live; `.fw-app` etc. tragen `--font-body`). Das ist die in AP-prokrast-17 / -FONT-CODE-B verifizierte Seite.

### B) Moderner **Engine**-Harness — `Theme/chart-tests/AP-16-abnahme.html`
Referenz dafür, wie ein Engine-Test die **echte CSS-Kaskade** einbindet.
- Lädt `../assets/css/screen.css`, das seinerseits `tokens.css` per `@import` einbindet → volle Live-Kaskade.
- Chart.js aus **lokalem `vendor/chart.umd.min.js` — kein CDN** (DSGVO/offline/deterministische Version).
- Inline-`<style>` nur für Harness-Layout, nutzt durchgängig `var(--color-*)`, überschreibt **keine** CI-Tokens.
- Enthält **Live-Indikatoren** (Kaskade-Indikator + Chart-Bridge-Indikator: prüft `strategy.theme === renderer.theme`, AP-16c).
- Rendert `.financial-chart-module` (Charts) + `.fw-app-host`.
- Ergebnis Token-Check: **✅** (Farben & Fonts lösen live auf).

### C) **Legacy**-Engine-Workbenches — 17 Dateien in `Theme/chart-tests/`
Alle vor der Token-Migration (AP-16) entstandenen Chart-Workbenches, u. a. `index_alt.html`.
- Chart.js **vom CDN**.
- **Kein** `tokens.css`, **kein** `screen.css`.
- Jeweils eigenes Inline-`<style>` mit **hartcodierten Hex-Farben** (7–52 Stück je Datei) und **hartcodiertem `font-family`** (meist `'Source Sans Pro'`).
- Kein `app.js`, kein `.fw-app` — reine Engine-/Chart-Workbench (verschiedene Chart-Typen: linien, balken, torte, minmax, irregular, tooltip …).
- **Wichtig:** Die **Charts rendern hier trotzdem korrekt**, weil `FwTheme.init()` die CSS-Tokens nur liest *wenn vorhanden*, sonst die **JS-Fallback-Konstanten** nutzt (Null-Delta zu `tokens.css`, AP-16c). Fehlt `tokens.css`, ist nur die *CSS-Token-Schicht* abwesend, nicht die Farbe selbst.
- Ergebnis `fwTokenCheck()`: **alle ❌** mit aufgelöstem `#000000` — das ist die **Signatur „Token undefiniert"** (`var(--x)` ohne Fallback → ungültig → Default-Schwarz der Sonde), **nicht** die Chart-Farbe. `fwFontCheck()`: `In :root ❌`; `--font-body` matcht nur zufällig den seiteneigenen hartcodierten Body-Font (seit dem Härtungsfix 2026-07-11 korrekt als Match ❌ ausgewiesen).

---

## 2. Merkmalsmatrix (Scan-Ergebnis)

| Datei | Kat. | Chart.js | tokens.css | screen.css | app.css/app.js | Struktur |
|---|---|---|---|---|---|---|
| `Apps/prokrastinations-preis/app.test.html` | **A** | CDN | ✅ | – | app.css + app.js | `.fw-app` (echte App) |
| `Theme/chart-tests/AP-16-abnahme.html` | **B** | **lokal vendor** | ✅ (via screen.css) | ✅ | – | Charts + Indikatoren |
| `index_alt.html` + 16 weitere `index*.html` | **C** | CDN | – | – | – | Inline-Style, hart Hex/Font |

Die 17 Legacy-Dateien (Kat. C): `index copy.html`, `index-balken2.html`, `index._linien3.html`, `index3.html`, `index_alles test.html`, `index_alt.html`, `index_balken.html`, `index_balken_CI.html`, `index_balken_alle.html`, `index_data_anchored.html`, `index_irregular_bar_ap13.html`, `index_irregular_xaxis.html`, `index_linen_2.html`, `index_linie_CI.html`, `index_linien.html`, `index_minmax.html`, `index_tool_tip.html`, `index_torte_CI.html`. Alle: CDN-Chart.js, kein tokens/screen.css, eigenes Inline-CSS.

---

## 3. Die Unterschieds-Achsen (das, was vereinheitlicht werden muss)

1. **Chart.js-Quelle:** 18 Seiten CDN (inkl. der modernen App-Seite A) vs. **nur** AP-16-abnahme lokal. → Ziel: durchgängig **lokales `vendor/chart.umd.min.js`**, kein CDN (DSGVO, offline, gepinnte Version).
2. **CSS-Kaskade / Tokens:** keine (17× Legacy, inline hart) vs. `tokens.css`+`app.css` (App-Seite A) vs. `screen.css`→`tokens.css` (Engine-Referenz B). → Ziel: jede Seite lädt die **echte Token-Kaskade**, damit Farben/Fonts **live** auflösen statt über JS-Fallback bzw. Inline-Hex.
3. **Fonts:** hartcodiert inline (Legacy) vs. token-getrieben (`--font-body`/`--font-display`, modern). Legacy nutzt zufällig `'Source Sans Pro'`, aber **nicht** über den Token — nach Font-Migration (AP-17-FONT-CODE-B) ist Token-Bezug der Sollzustand.
4. **Prüfbarkeit:** moderne Seiten sind `fwTokenCheck()`/`fwFontCheck()`-**grün** und haben teils Live-Indikatoren; Legacy ist per Konstruktion **rot** (kein Token-Layer).
5. **Zweck-Trennung:** genau **eine** Seite (A) testet die echte App (`app.js`/`.fw-app`); alle anderen sind Engine-/Chart-Workbenches. Eine Vereinheitlichung sollte diese zwei Test-*Arten* bewusst getrennt halten, aber mit **gemeinsamer Lade-Konvention**.

---

## 4. Zielbild für einen vereinheitlichten Harness (Checkliste für den TESTENV-1-Faden)

Ein „moderner" Harness — unabhängig ob App- oder Engine-Test — sollte:
- [ ] Chart.js aus **lokalem `vendor/`** laden (kein CDN).
- [ ] die **Token-Kaskade** einbinden: Engine-Tests über `screen.css` (das `tokens.css` importiert), App-Tests über `tokens.css` (+ `app.css`) — Ladeordnung: Tokens **vor** konsumierendem CSS.
- [ ] **keine** CI-Farben/-Fonts im Inline-`<style>` hartcodieren; Inline-CSS nur für Harness-Chrome, und dort nur `var(--…)`.
- [ ] mit `tools/ci-token-check.js` (`fwTokenCheck()` + `fwFontCheck()`) **grün** laufen (harte Regression-Sonde für CSS-Token- **und** Font-Auflösung).
- [ ] optional einen Live-Indikator wie in `AP-16-abnahme.html` tragen (Kaskade/Bridge sichtbar AKTIV/LIVE).

**Offene Entscheidungen für den TESTENV-1-Faden (nicht hier zu treffen):**
- Legacy-Dateien (Kat. C) **migrieren** (auf lokal Vendor + Kaskade nachziehen) **oder archivieren** (viele sind vermutlich durch `AP-16-abnahme.html` und typspezifische Neu-Harnesse abgelöst)?
- Namens-/Versionskonvention für Harnesse (das „_alt"/„ copy"/„ test"-Wildwuchs-Muster auflösen).
- Soll die App-Seite A ebenfalls auf lokales Vendor-Chart.js umgestellt werden (Konsistenz mit B)?

---

## 5. Referenz-Werkzeug

`tools/ci-token-check.js` (DevTools-Konsole, read-only) ist die deterministische Prüfsonde für beide Achsen:
- `fwTokenCheck()` — Farb-Token-Auflösung + ΔE76-Drift.
- `fwFontCheck()` — Font-Token-Auflösung, reale Element-`font-family`, `document.fonts.check` (Schrift real geladen?). Seit 2026-07-11 gehärtet: Font-Match nur ✅, wenn der Token **in :root definiert** ist (kein Fehlalarm durch zufällig geerbte seiteneigene Fonts).

Anwendung: Zielseite im Live-Server öffnen → Dateiinhalt in die Konsole einfügen (Auto-Lauf beider Checks). Grün = Seite ist auf der Token-Kaskade; rot/`#000000` = Legacy ohne Token-Layer.
