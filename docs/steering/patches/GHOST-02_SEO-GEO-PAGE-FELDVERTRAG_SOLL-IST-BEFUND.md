# GHOST-02 — SEO/GEO-Page-Feldvertrag: Soll/Ist-Befund

Status: ROT
Prüfdatum: 2026-07-21

## Gelesene Quellen
- \\NAS-Datengrab\Albert\Documents\Nextcloud\Finanzwesir 2.0\docs\editorial\SEO-GEO-PAGE-FELDVERTRAG.md
- \\NAS-Datengrab\Albert\Documents\Nextcloud\Finanzwesir 2.0\Theme\default.hbs
- \\NAS-Datengrab\Albert\Documents\Nextcloud\Finanzwesir 2.0\Theme\page.hbs
- \\NAS-Datengrab\Albert\Documents\Nextcloud\Finanzwesir 2.0\Theme\package.json
- \\NAS-Datengrab\Albert\Documents\Nextcloud\Finanzwesir 2.0\docs\editorial\GEO statt SEO.md
- \\NAS-Datengrab\Albert\Documents\Nextcloud\Finanzwesir 2.0\docs\editorial\REDAKTEURS-HANDBUCH Redaktionsleitfaden.md
- \\NAS-Datengrab\Albert\Documents\Nextcloud\Finanzwesir 2.0\docs\editorial\Finanzwesir-Content-System.md
- \\NAS-Datengrab\Albert\Documents\Nextcloud\Finanzwesir 2.0\Theme\post.hbs (Grep-Fundstelle zu `application/ld+json`, `schema.org`)
- \\NAS-Datengrab\Albert\Documents\Nextcloud\Finanzwesir 2.0\Theme\author.hbs (Grep-Fundstelle zu `schema.org`)

Zusätzlich durchsucht (Grep über alle Anker, gesamtes Verzeichnis `Theme/`):
`ghost_head`, `ghost_foot`, `meta_title`, `meta_description`, `canonical_url`, `og_`, `twitter_`, `application/ld+json`, `schema.org`, `robots`, `noindex`, `nosnippet`, `#seo-`, `#schema-`, `codeinjection`.
Treffer ausschließlich in: `default.hbs`, `post.hbs`, `author.hbs`. Keine Treffer in `tag.hbs`, `error.hbs`, `index.hbs`, `partials/header.hbs`, `partials/footer.hbs`, `partials/post-card.hbs`, `partials/pagination.hbs`, `package.json`.

Hinweis zur Vollständigkeit: Das weitere Lesen einzelner Dateien ohne Anker-Treffer (`header.hbs`, `footer.hbs`, `index.hbs`, `tag.hbs`, `error.hbs`) wurde während der Prüfung von Albert abgebrochen. Für den Page-Feldvertrag (Scope: `page.hbs` + `default.hbs` als vererbtes Layout) ist das ohne Belang, da diese Dateien laut Grep keinen der gesuchten Anker enthalten.

## Befundmatrix

| Vertragsbereich | Soll | Ist | Beleg: Datei:Zeile | Status | Fehlende Umsetzung |
|---|---|---|---|---|---|
| Native Ghost-Page-Felder (Abschnitt 2) | Titel, Slug, Autoren, Daten, Excerpt, Feature Image+Alt, Tags, Sichtbarkeit, Meta Title/Description, Canonical URL, OG-/X-Daten als Backend-Felder verfügbar und vom Theme ausgegeben | Ghost-Backend-Felder selbst sind nicht Teil des Repos (nicht nachweisbar). Theme gibt `meta_title`, `meta_description`, `canonical_url` aus. OG-/X-Felder (`og_title`, `og_image`, `twitter_title` u.ä.) werden im Theme an keiner Stelle manuell ausgegeben (0 Grep-Treffer für `og_`/`twitter_` in `Theme/`) | `default.hbs:6-8` | GELB / teilweise nicht nachweisbar | Kein manueller OG-/X-Output im Theme; ob `{{ghost_head}}` dies abdeckt, ist Ghost-Core-Verhalten und im Repository nicht prüfbar |
| Einmalige Head-Ausgabe (Prüfpunkt 2) | Ghost-System-Metadaten genau einmal ausgegeben | `default.hbs` gibt `<title>`, `<meta name="description">` und `<link rel="canonical">` manuell aus **und** ruft zusätzlich `{{ghost_head}}` auf derselben Seite auf | `default.hbs:6-8` und `default.hbs:27` | RISIKO / ungeprüft | Kein Beleg für einen durchgeführten Render-/Duplikat-Check; Feldvertrag Abschnitt 6 verlangt genau diese Prüfung vor Auslieferung |
| Interne Steuerungen `#seo-noindex`, `#seo-nosnippet`, `#schema-*` (Prüfpunkt 3) | Genau ein `#schema-*`-Tag wählt Schema-Profil; `#seo-noindex`/`#seo-nosnippet` setzen robots-Direktiven | 0 Grep-Treffer für `#seo-` oder `#schema-` im gesamten `Theme/`-Verzeichnis. `page.hbs` enthält keine Tag-Abfrage-Logik (kein `{{#has tag=...}}`, kein `<meta name="robots">`) | `page.hbs:1-16` (vollständige Datei), Grep ohne Treffer | ROT / nicht umgesetzt | Tag-gesteuerte Schema-Auswahl und robots-Meta-Logik fehlen vollständig |
| Schema: WebPage-Standard, optionale Profile, Breadcrumb (Prüfpunkt 4) | `WebPage` als Default für Pages; optional `Article`, `AboutPage`, `ContactPage`, `ProfilePage`, `CollectionPage`; Breadcrumb nur bei echter, nachvollziehbarer Hierarchie | `page.hbs` erzeugt kein eigenes JSON-LD. Einziges JSON-LD, das jede Page über `default.hbs` erbt, ist eine statische `BreadcrumbList` mit genau einem hartkodierten Element (Site-Titel/-URL), unabhängig von der tatsächlichen Seite | `default.hbs:12-25` | ROT / nicht umgesetzt | Kein WebPage/Article/AboutPage/ContactPage/ProfilePage/CollectionPage-Schema für Pages vorhanden; Breadcrumb bildet keine reale Hierarchie ab |
| Ableitungen: headline, description-Fallback, image, author, Daten, `mainEntityOfPage`, publisher, Sprache, Social-/Canonical-Fallbacks (Prüfpunkt 5) | Aus Ghost-Feldern automatisch abgeleitet, pro Page | Für `page.hbs` ist keine dieser Ableitungen im Theme-Code vorhanden — die Datei enthält nur H1-Titel und Content-Ausgabe | `page.hbs:1-16` (vollständige Datei) | ROT / nicht umgesetzt | Keine Ableitungslogik für Pages vorhanden |
| Verbotene/veraltete Muster (Prüfpunkt 6): Meta Keywords, pauschales FAQPage/HowTo, GEO-/LLM-Keywords, `llms.txt`-Abhängigkeit, unkontrollierte Code-Injection als Standardweg | Keines davon soll implementiert sein | Keiner dieser Anker im Theme-Code gefunden (0 Treffer, u.a. für `codeinjection`) | Grep ohne Treffer über `Theme/` | GRÜN | Keine — reine Abwesenheitsprüfung im Theme-Code; Ghost-Admin-seitige Code-Injection bleibt außerhalb des Repository-Scopes ungeprüft |

## Nicht im Repository nachweisbar
- Ghost-Admin-Backend-Werte selbst (ob Meta Title/Description/Canonical/OG/X pro Page tatsächlich gepflegt sind)
- Ob `{{ghost_head}}` automatisch OG-/Twitter-Tags erzeugt und ob das mit den manuell gesetzten Tags in `default.hbs` kollidiert (Ghost-Core-Verhalten, nicht im Theme-Code sichtbar)
- `robots.txt` (nicht im geprüften Verzeichnis `Theme/` vorhanden; Auftrag begrenzte die Suche explizit auf `Theme/`)
- Ghost Admin → Code Injection (globale Snippets), da Backend-Konfiguration

## Widersprüche oder Risiken
- `default.hbs` gibt `meta_title`, `meta_description`, `canonical_url` manuell aus und ruft zusätzlich `{{ghost_head}}` auf derselben Seite auf (`default.hbs:6-8` + `:27`) — mögliches Duplikat, durch kein Rendering im Repository geprüft.
- Die JSON-LD-`BreadcrumbList` in `default.hbs:12-25` ist für jede Page identisch (ein Element: Site-Titel/-URL) und bildet keine reale Seitenhierarchie ab — das widerspricht der Feldvertrag-Vorgabe, Breadcrumb-Markup nur „für eine tatsächlich sichtbare und inhaltlich begründete Hierarchie" auszugeben.
- Für Pages existiert keinerlei Schema-Auswahlmechanismus (`#schema-*`-Tags), obwohl der Feldvertrag dies als verbindlichen Standard (WebPage + optionale Profile) vorschreibt — vollständige Lücke, nicht nur Teilumsetzung.

## Minimaler Umsetzungsumfang für GRÜN
- `page.hbs`: Tag-gesteuerte Schema-Auswahl ergänzen (Default `WebPage`; genau ein optionales Profil `Article`/`AboutPage`/`ContactPage`/`ProfilePage`/`CollectionPage` je nach vorhandenem `#schema-*`-Tag).
- `page.hbs` (oder gemeinsam mit `default.hbs`): Ableitungslogik ergänzen für `headline`, `description`-Fallback (Meta Description → Custom Excerpt), `image`, `author`, `datePublished`/`dateModified`, `mainEntityOfPage`, `publisher`, `sameAs`, Sprache.
- `default.hbs`: robots-Meta-Logik für `#seo-noindex` (→ `noindex`) und `#seo-nosnippet` (→ `nosnippet`) ergänzen.
- `default.hbs`: Breadcrumb-JSON-LD entweder auf eine echte, herleitbare Hierarchie umbauen oder auf die Fälle begrenzen, in denen eine solche Hierarchie tatsächlich existiert.
- Vor Auslieferung: Browser-Rendering-Check, ob die manuellen `meta_title`/`meta_description`/`canonical_url`-Tags in `default.hbs` mit der `{{ghost_head}}`-Ausgabe doppelte Tags erzeugen; je nach Befund eines der beiden entfernen.
- Klärung außerhalb des Repositorys (Ghost Admin/Dokumentation): ob OG-/X-Felder bereits über `{{ghost_head}}` automatisch ausgegeben werden oder ob dafür zusätzlicher Theme-Code nötig ist.

## Nicht angefasst
- Theme, Ghost-Admin, Inhalte, Routing, robots.txt, Datenbank
