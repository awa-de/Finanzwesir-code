# Ghost Theme Assembly — Checkliste
Stand: 2026-05-03 08:02 | Session: A7-Stand-Datum | Geändert von: Claude

> Status: **In Arbeit**
> Ziel: Finanzwesir-Theme für Ghost 6.x zusammenbauen und hochladen.
> Struktur angelegt am: 2026-02-16

---

## Phase 1 — Assets zusammentragen

### Grafiken
Im Verzeichnis sind jede Menge Favicons und Grafiken für mobile Nutzung (Android & Apple) vorhanden.Setze sie sinnvoll ein.
- [X] Logo (SVG) → `assets/images/Kopf_Finanzwesir_BigCircle.svg`
- [X] Favicon (ICO, 32×32) → `assets/images/favicon.ico`
- [X] Apple Touch Icon (PNG, 180×180) → `assets/images/apple-touch-icon.png`
- [X] Fallback Feature-Image für Posts ohne Bild → `assets/images/default-feature.jpg`
- [X] Social-Media-Icons (SVGs) → entfallen, gibt es nicht

### Fonts
Erledigt
- [x] Font-Dateien beschaffen (WOFF2-Format bevorzugt)
- [x] Ablegen in `assets/fonts/`
- [x] Lizenz prüfen (Google Fonts = frei, andere ggf. nicht)

### Chart.js
Erledigt
- [X] `chart.umd.min.js` herunterladen (aktuelle stabile Version)
- [X] Ablegen in `assets/js/vendor/chart.umd.min.js`

### CI-Dokumentation (Referenz für den Zusammenbau)
siehe docs/design-system/spec und docs/design-system/referenz
- [X] Farbpalette dokumentiert (Hex-Codes für Primär, Sekundär, Akzent, Text, Hintergrund)
- [X] Schriftarten dokumentiert (Name, Gewichte, Einsatzbereich)
- [X] Design-Vorlagen/Mockups bereitgelegt (Startseite, Artikelseite)

---

## Phase 2 — Templates bauen (mit LLM)

> Reihenfolge ist wichtig: default.hbs zuerst, dann die anderen.

### Basis-Layout
- [ ] `default.hbs` — HTML-Rahmen, Head (SEO/OG/Twitter/Schema.org/RSS), Body, ghost_head/ghost_foot
- [ ] `assets/css/screen.css` — Komplettes Stylesheet (Farben, Typo, Layout, Responsive)

#### default.hbs `<head>` Pflichtinhalte
- [ ] SEO-Meta: `<title>`, `<meta description>`, `<link canonical>` — **vor** `{{ghost_head}}`
- [ ] Open Graph Tags: og:type, og:title, og:description, og:url, og:site_name, og:image, article:*
- [ ] Twitter/X Card Tags: twitter:card, twitter:title, twitter:description, twitter:image
- [ ] BreadcrumbList JSON-LD (`<script type="application/ld+json">`)
- [ ] RSS-Feed: `<link rel="alternate" type="application/rss+xml">`
- [ ] Webmentions: `<link rel="webmention">` + `<link rel="pingback">` (optional)
- [ ] `{{ghost_head}}` vorhanden (DARF NICHT FEHLEN)
- [ ] Kein manueller `<title>` nach `{{ghost_head}}` (erster gewinnt)

### Partials (wiederverwendbare Bausteine)
- [ ] `partials/header.hbs` — Navigation + Logo
- [ ] `partials/footer.hbs` — Footer + Social Links + Copyright
- [ ] `partials/post-card.hbs` — Vorschau-Karte für Postlisten
- [ ] `partials/pagination.hbs` — Blätterfunktion (älter/neuer)

### Seiten-Templates
- [ ] `index.hbs` — Startseite / Postliste
- [ ] `post.hbs` — Einzelner Artikel (**Kernstück: Chart-Integration + BlogPosting JSON-LD**)
- [ ] `page.hbs` — Statische Seiten (ohne Chart-Engine, ohne `datePublished`)
- [ ] `tag.hbs` — Tag-Archivseite mit Tag-Description
- [ ] `author.hbs` — Autorenseite mit Schema.org Person-Microdata (E-E-A-T)
- [ ] `error.hbs` — Fehlerseite (404, 500)

#### post.hbs Pflichtinhalte
- [ ] BlogPosting JSON-LD (`<script type="application/ld+json">`) direkt nach `{{#post}}`
- [ ] Microdata: `itemscope itemtype="https://schema.org/BlogPosting"` auf `<article>`
- [ ] `itemprop="headline"` auf H1, `itemprop="datePublished"` auf `<time>`
- [ ] `itemprop="author"` mit Person-Microdata auf Autorenverweis
- [ ] `itemprop="articleBody"` auf Content-Section
- [ ] Chart-Engine: Chart.js (`defer`) + Engine (`type="module"`), Reihenfolge bindend
- [ ] `fw-janitor.js` eingebunden

#### author.hbs Pflichtinhalte (E-E-A-T)
- [ ] Profilbild, Name, Bio, Website-Link (`rel="me"`), Location
- [ ] Post-Liste via `{{#foreach posts}}{{> "post-card"}}{{/foreach}}`
- [ ] User muss Ghost Admin → Staff → Profil vollständig ausfüllen

#### partials/footer.hbs Pflichtinhalte
- [ ] Links zu Impressum und Datenschutz

---

## Phase 3 — Integration & QA

### Chart-Engine-Integration
- [ ] Chart.js-Einbindung in `default.hbs` oder `post.hbs` getestet
- [ ] Chart-Engine (`fw-chart-engine/index.js`) korrekt geladen
- [ ] `div.financial-chart-module` mit `data-*` Attributen funktioniert in Ghost-Content
- [ ] Charts rendern korrekt (Line, Bar, Pie)

### Ghost-Validierung
- [ ] GScan-Validierung bestanden (https://gscan.ghost.org)
- [ ] Keine fatalen Fehler
- [ ] Warnungen geprüft und ggf. behoben

### Responsive-Test
- [ ] Desktop (≥1024px) — Layout korrekt
- [ ] Tablet (768px) — Layout korrekt
- [ ] Mobile (≤480px) — Layout korrekt
- [ ] Charts skalieren in allen Viewports

### SEO-Check
- [ ] `{{meta_title}}` im `<title>` Tag (vor `{{ghost_head}}`)
- [ ] `{{ghost_head}}` vorhanden
- [ ] Semantisches HTML (`<article>`, `<nav>`, `<main>`, `<header>`, `<footer>`)
- [ ] Bilder mit `alt`-Attributen
- [ ] Viewport-Meta-Tag vorhanden
- [ ] Open Graph Tags vollständig (og:type, og:title, og:description, og:url, og:image)
- [ ] Twitter Card Tags vollständig (twitter:card, twitter:title, twitter:description, twitter:image)
- [ ] BlogPosting JSON-LD in post.hbs valide (https://validator.schema.org)
- [ ] BreadcrumbList JSON-LD in default.hbs valide
- [ ] RSS `<link rel="alternate">` im Quelltext
- [ ] `<link rel="canonical">` vorhanden

### SEO/Social-Validierung (nach Deploy)
- [ ] Schema.org validieren: https://validator.schema.org
- [ ] OG-Tags validieren: https://opengraph.xyz
- [ ] Twitter Card validieren: https://cards-dev.twitter.com/validator
- [ ] robots.txt: AI-Crawler erlaubt (GPTBot, PerplexityBot, ClaudeBot, GoogleOther)
- [ ] Sitemap: `/sitemap.xml` enthält alle Seiten
- [ ] Sitemap in Google Search Console + Bing Webmaster Tools eingereicht

---

## Phase 4 — Pre-Launch Audits

> Beide Audits werden am fertigen, produktionsbereiten Theme durchgeführt —
> nach QA (Phase 3), vor Deployment (Phase 5).

### 4A — Performance-Audit

**Asset-Optimierung**
- [ ] CSS minified (screen.css → screen.min.css)
- [ ] JavaScript minified (Chart-Engine, Janitor-Script, Chart.js bereits .min)
- [ ] Bilder optimiert (SVGs bereinigt, PNGs/JPGs komprimiert, korrekte Dimensionen)
- [ ] Font-Subsetting geprüft (nur benötigte Glyphen/Gewichte in WOFF2)
- [ ] Keine ungenutzten Assets im ZIP-Paket

**Ladezeit & Rendering**
- [ ] Critical CSS inline oder First Paint nicht blockierend
- [ ] JavaScript async/defer wo möglich (Chart.js + Engine erst nach DOM)
- [ ] Font-Loading-Strategie (`font-display: swap`, kein FOIT)
- [ ] Progressive Rendering: Seiteninhalt vor Charts sichtbar
- [ ] Lazy Loading für Feature-Images (`loading="lazy"`)

**Caching & Delivery**
- [ ] Cache-Busting-Strategie für Assets (Versionierung oder Content-Hash)
- [ ] Ghost-seitige Cache-Header geprüft (static assets: langlebig, HTML: kurz)
- [ ] Kein Render-Blocking durch externe Ressourcen

**Messungen**
- [ ] Lighthouse Performance Score ≥ 90 (Desktop)
- [ ] Lighthouse Performance Score ≥ 75 (Mobile)
- [ ] Largest Contentful Paint (LCP) < 2,5s
- [ ] Cumulative Layout Shift (CLS) < 0,1 (Charts dürfen Layout nicht verschieben)
- [ ] Total Transfer Size dokumentiert (Ziel: < 500 KB für Erstaufruf ohne CSV)

---

### 4B — Sicherheits-Audit

**Eingabe-Validierung & Injection-Schutz**
- [ ] CSV-Daten: Nur `textContent`, kein `innerHTML` (KDR 12 bestätigt)
- [ ] `_sanitize()`-Backup greift bei allen User-sichtbaren Strings
- [ ] `data-*` Attribute: Keine unkontrollierte Übernahme in DOM/JS
- [ ] Options-Whitelist: Nur erlaubte Werte für `data-mode`, `data-options`
- [ ] Kein `eval()`, kein `new Function()`, kein `document.write()`

**Content Security Policy (CSP)**
- [ ] CSP-Header definiert (oder Meta-Tag als Fallback)
- [ ] `script-src`: Nur eigene Scripts, kein `unsafe-inline`, kein `unsafe-eval`
- [ ] `style-src`: Nur eigenes CSS (inline nur wenn CSP-Hash/Nonce)
- [ ] `img-src`: Eigene Domain + Ghost-Storage
- [ ] `connect-src`: Nur `www.finanzwesir.com` für CSV-Fetch (Domain-Whitelist)

**CSV-Fetch-Sicherheit**
- [ ] Domain-Whitelist implementiert (nur `https://www.finanzwesir.com`)
- [ ] HTTPS erzwungen (kein HTTP-Fallback)
- [ ] Fehlerhafte/bösartige CSV-Dateien: Graceful Error, kein Crash
- [ ] Timeout für Fetch-Requests gesetzt
- [ ] Maximale Dateigröße begrenzt

**Redakteurs-Sicherheit (Trottel-Schutz)**
- [ ] Ungültige `data-mode` Werte → sichtbare Fehlermeldung, kein stiller Fehler
- [ ] Fehlende Pflicht-Attribute → klare Fehlermeldung
- [ ] Defekte CSV-URL → Fehlermeldung im Chart-Container (nicht in Console)
- [ ] Leere/kaputte CSV → Fehlermeldung statt leerer Chart
- [ ] Doppelte Chart-Container auf einer Seite → kein Konflikt

**Theme-Härtung**
- [ ] Keine Secrets im Theme-Paket (.env, API-Keys, Credentials)
- [ ] Keine Debug-Informationen in Produktion (console.log entfernt oder hinter Flag)
- [ ] Handlebars-Templates: Escaped Output `{{variable}}` statt `{{{variable}}}` (außer `ghost_head`/`ghost_foot`)
- [ ] Externe Links mit `rel="noopener noreferrer"`
- [ ] Formular-Inputs (falls vorhanden): CSRF-Schutz via Ghost

**Dependency-Check**
- [ ] Chart.js Version aktuell und ohne bekannte CVEs (lokal in `assets/js/vendor/chart.umd.min.js`)
- [ ] Keine weiteren externen Dependencies im Theme
- [ ] Keine extern geladenen Scripts (Chart.js lokal → SRI nicht nötig)

---

## Phase 5 — Deployment

- [ ] ZIP-Paket bauen (ohne data/, docs/, index*.html, .git/, .claude/)
- [ ] Upload in Ghost Admin (Settings → Design → Change theme)
- [ ] Theme aktivieren
- [ ] Smoke-Test: Startseite, ein Artikel mit Chart, eine statische Seite
- [ ] Screenshots für `package.json` erstellen (Desktop + Mobile)

---

## Phase 6 — Ghost-Instanz konfigurieren (nach Deploy)

> Nach erfolgreichem Deploy. Ghost Admin Einstellungen, keine Template-Änderungen.
> Details: → KNOWN-ISSUES-SCHLACHTPLAN.md, Phase GHOST-SETUP.

### Tracker
- [ ] Clicky Analytics: Code Injection in Ghost Admin (Site Footer)
- [ ] Clicky: Cookies deaktivieren (Clicky-Settings)
- [ ] VG-Wort: Snippet-Vorlage in Ghost Admin → Snippets anlegen
- [ ] VG-Wort: Mapping-Tabelle (Artikel-Slug → Zählmarken-ID) erstellen
- [ ] VG-Wort: Zählmarken per Snippet oder API in alle Posts einfügen

### Social/SEO-Infrastruktur
- [ ] OG-Default-Bild hochladen (1200×630 px) in Ghost Admin → Cover Image
- [ ] FAQPage Schema-Snippet in Ghost Admin → Snippets anlegen
- [ ] robots.txt prüfen (AI-Crawler erlaubt, Sitemap-URL korrekt)
- [ ] Sitemap in Search Console + Bing WMT einreichen
- [ ] Webmention.io Account anlegen + Domain verifizieren (optional)

### Tracker-Verifikation
- [ ] Clicky Dashboard: Echtzeit-Seitenaufrufe sichtbar
- [ ] VG-Wort Pixel: Browser DevTools → Network → img → Pixel feuert
- [ ] RSS-Feed: `/rss/` erreichbar, Eintrag in Feed-Aggregatoren (Feedly)

---

## Notizen

_Platz für Erkenntnisse, Entscheidungen und Probleme während des Zusammenbaus._
