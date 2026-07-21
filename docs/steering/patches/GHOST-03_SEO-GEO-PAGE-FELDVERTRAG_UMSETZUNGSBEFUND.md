GHOST-03 — SEO/GEO-Page-Feldvertrag: Umsetzungsbefund

Status: GELB
Prüfdatum: 2026-07-21

Gelesene Pflichtquellen:
- docs/editorial/SEO-GEO-PAGE-FELDVERTRAG.md
- GHOST-02_SEO-GEO-PAGE-FELDVERTRAG_SOLL-IST-BEFUND.md (vorheriger Ablageort: Archiv/local/muss noch eingeordnet werden/)
- Theme/default.hbs
- Theme/page.hbs
- Theme/post.hbs (nur Referenz, nicht geändert)
- Theme/author.hbs (nur Referenz, nicht geändert)
- Theme/package.json

Geänderte Dateien:
- Theme/default.hbs: statisches `BreadcrumbList`-JSON-LD-Script vollständig entfernt (bildete keine reale Seitenhierarchie ab). Benannter Head-Slot `{{block "head"}}` ergänzt, unmittelbar vor `{{ghost_head}}`. `{{ghost_head}}` bleibt exakt 1× erhalten (verifiziert per Grep). Manuelle `<title>`/Meta-Description/Canonical-Zeilen **unverändert belassen** — siehe Restblocker.
- Theme/page.hbs: `{{#contentFor "head"}}...{{/contentFor}}`-Block innerhalb des bestehenden `{{#post}}`-Kontexts ergänzt. Enthält: Robots-Meta-Logik für `#seo-noindex`/`#seo-nosnippet` (einzeln und kombiniert), Schema-Auswahl für `#schema-article`/`#schema-about`/`#schema-contact`/`#schema-profile`/`#schema-collection` in dieser Reihenfolge, Default `WebPage` ohne Tag-Treffer. Sichtbare Ausgabe (`{{#post}}`, `{{post_class}}`, `{{title}}`, `{{content}}`, Chart-Scripts) unverändert — per erneutem Volllesen der Datei bestätigt.

Head-Nachweis:
- **Kein Browser-Rendering durchgeführt** — in dieser Session steht kein laufender Ghost-Server/Browser zur Verfügung. Damit ist der in `SEO-GEO-PAGE-FELDVERTRAG.md` Abschnitt 6 geforderte Nachweis („gerenderter Head ... wird ... geprüft") nicht erbringbar. Auftragsvorgabe (§Umsetzung 1, Punkt 5) befolgt: die manuellen `<title>`/Meta-Description/Canonical-Ausgaben in `default.hbs` wurden **nicht** entfernt, da ohne Rendering nicht nachweisbar ist, ob `{{ghost_head}}` sie bereits doppelt erzeugt. Das bleibt der zentrale Restblocker dieses Auftrags.
- Statisch geprüft: `default.hbs` enthält `{{ghost_head}}` genau 1× (Grep bestätigt), keine `BreadcrumbList` mehr (Grep: 0 Treffer für „BreadcrumbList" im gesamten `Theme/`-Verzeichnis).

Schema- und Robots-Nachweis:
- Standardprofil ohne `#schema-*`-Tag: `WebPage` (statisch verifiziert, letzter `{{else}}`-Zweig der Tag-Kette).
- Verfügbare Tag-Varianten (statisch verifiziert, Klammerbalance der verschachtelten `{{#has}}`/`{{else}}`/`{{/has}}`-Kette geprüft): `#schema-article` → `Article`, `#schema-about` → `AboutPage`, `#schema-contact` → `ContactPage`, `#schema-profile` → `ProfilePage`, `#schema-collection` → `CollectionPage`. Prüfreihenfolge entspricht exakt der Auftragstabelle; bei mehreren gesetzten `#schema-*`-Tags gewinnt deterministisch der erste Treffer in dieser Reihenfolge (article vor about vor contact vor profile vor collection).
- `#seo-noindex`/`#seo-nosnippet`: einzeln und kombiniert (`noindex, nosnippet`) statisch verifiziert; ohne gesetzten Tag wird kein Robots-Meta ausgegeben.
- **Nicht browsergeprüft:** alle dynamischen Varianten (welches Schema-Profil bzw. welches Robots-Meta bei einer echten Page mit gesetztem internem Tag tatsächlich im gerenderten Head erscheint). Insbesondere die Annahme, dass interne Ghost-Tags im Theme über den Slug-Präfix `hash-` referenziert werden (z. B. `{{#has tag="hash-seo-noindex"}}` für den Redaktions-Tag `#seo-noindex`), stammt aus allgemeinem Ghost-Theme-Wissen und wurde in diesem Repository nicht anhand einer echten Page mit gesetztem internen Tag verifiziert. Das ist der zweite offene Nachweis.
- `mainEntityOfPage`/`url` werden aus `{{url absolute="true"}}` abgeleitet (Ghost-Core-Helper, kein erfundener Mechanismus). `description` fällt auf `custom_excerpt` zurück, wenn `meta_description` leer ist; `image`, `author`, `publisher.logo`, `publisher.sameAs` (`@site.twitter`/`@site.facebook`) werden nur bei vorhandenem Feld ausgegeben, sonst weggelassen — jeweils ohne selbst konstruierte URL-Transformation.

Validator-/Syntaxnachweis:
- Kein Theme-Validator (z. B. gscan) in `package.json` oder vorhandener Tooling-Dokumentation referenziert oder verfügbar — keiner installiert, wie vorgegeben. `package.json` selbst nicht verändert.
- Statische Prüfung der Handlebars-Blockstruktur: alle `{{#has}}`/`{{else}}`/`{{/has}}`-Blöcke sind paarig geschlossen (Robots-Kette: 1 äußerer + 1 verschachtelter + 1 im Else-Zweig = korrekt balanciert; Schema-Kette: 5 verschachtelte `{{#has}}` mit 5 `{{/has}}`). Kein automatisierter Syntax-Check verfügbar (keine erfundenen Lint-/Build-Kommandos).

Nicht nachweisbar oder Restblocker:
- Ob `{{ghost_head}}` bereits `<title>`, Meta Description und selbstreferenzierendes Canonical erzeugt und ob die manuellen Zeilen in `default.hbs` dadurch dupliziert werden — ungeklärt, Zeilen bewusst nicht entfernt.
- Ob die Tag-Slug-Konvention `hash-<name>` für interne Ghost-Tags in dieser konkreten Ghost-Instanz zutrifft — ungeklärt ohne echte Page mit gesetztem `#seo-*`/`#schema-*`-Tag.
- Beides erfordert einen manuellen Test im lokalen Ghost-Live-Server (siehe Full-Gate, Frage 6) vor endgültiger Abnahme.

Nicht angefasst:
- Posts, CSS, JavaScript, Ghost-Admin, Inhalte, Routing, robots.txt, Chart-Engine, `post.hbs`, `author.hbs`, `package.json`

Kein Commit erstellt.

Hinweis zum Ablageort: Diese Datei liegt auf Alberts Anweisung ab dieser Runde unter `docs/steering/patches/` statt wie im Auftrag vorgegeben unter `Archiv/local/muss noch eingeordnet werden/`.
