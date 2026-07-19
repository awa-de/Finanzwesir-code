Stand: 2026-07-19 22:17 | Session: M1-Abschluss | Geändert von: Codex

# M1 – Homepage auf Tailwind umstellen

## Ziel

Die lokale Finanzwesir-Startseite erhält einen vollständigen, ruhigen Markenrahmen aus Tailwind-Klassen. Sie muss ohne eigene `fw-*`-Layoutklassen lesbar sein: Kopf, Navigation, Beitragskarte, Seitennavigation und Fuß.

## Ursache und Architekturgrenze

Die bisherigen Templates verwenden 55 visuelle `fw-*`-Klassen. `fw-*` ist laut CSS-Konventionen für die Chart-Engine reserviert und wird vom Tailwind-Bau nicht erzeugt. Deshalb ist das Theme technisch aktiv, aber seine Homepage weitgehend ungestylt.

M1 ersetzt nur sichtbare Homepage-Strukturen. Ghost-Helfer, semantische HTML-Elemente, `{{post_class}}`, URLs und ARIA-Attribute bleiben unverändert. Es entstehen keine neuen Regeln in `screen.source.css`.

## Nicht Teil von M1

- `post.hbs`, `page.hbs`, `tag.hbs`, `author.hbs`, `error.hbs`
- `fw-chart-engine` und `fw-janitor` als technische JavaScript-Hooks
- Ghost Page Builder, konfigurierbare Ghost-Fonts und die Metadatenbereinigung
- Änderungen an Tokens, Chart-Engine, Ghost-Inhalten oder Produktionsserver

## Dateiumfang und Klassenstruktur

| Datei | Ersetzt | Tailwind-Struktur |
|---|---|---|
| `default.hbs` | `fw-site`, `fw-site-main` | `min-h-screen bg-bg text-text-sec font-body`; Hauptinhalt `mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8` |
| `partials/header.hbs` | Header, Marke, Navigation | `border-b border-border bg-surface`; innerer Rahmen `mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6`; Marke `font-display text-xl text-primary`; Navigation `flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold` |
| `partials/footer.hbs` | Fuß, Legal, Social, Copyright | `mt-12 border-t border-border bg-bg-faint`; Inhalt `mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-text-muted sm:px-6`; Navigationsgruppen `flex flex-wrap gap-x-4 gap-y-2` |
| `index.hbs` | Listing, Überschrift, Kartenraster, Leerzustand | äußere Sektion `space-y-8`; Überschrift `border-l-4 border-primary pl-4`; Raster `grid gap-6 md:grid-cols-2`; Leerzustand `rounded-xl border border-border bg-bg-faint p-6 text-text-muted` |
| `partials/post-card.hbs` | Karte, Bild, Text, Tag, Meta | `overflow-hidden rounded-xl border border-border bg-surface shadow-soft transition-shadow hover:shadow-hover`; Bild `aspect-[16/9] w-full object-cover`; Text `space-y-3 p-5`; Tag `text-xs font-semibold uppercase tracking-wide text-primary`; Titel `font-display text-xl text-text`; Meta `text-sm text-text-muted` |
| `partials/pagination.hbs` | Neuere/ältere Links, Status | `flex items-center justify-between gap-4 border-t border-border pt-6 text-sm`; Links `font-semibold text-primary hover:text-petrol`; Status `text-text-muted` |

Alle Klassen werden vollständig und wörtlich in die HBS-Dateien geschrieben. Keine Klassen werden dynamisch zusammengesetzt; der bestehende Tailwind-Scanner erfasst sie damit ohne Zusatzkonfiguration.

## Reihenfolge

1. `default.hbs`, Header und Footer umbauen: globaler Markenrahmen.
2. `index.hbs`, Postkarte und Pagination umbauen: sichtbarer Startseiteninhalt.
3. `npm run css:build` mit System-Node 24 ausführen; nur `Theme/assets/css/screen.css` entsteht neu.
4. Theme-ZIP prüfen, lokal in Ghost überschreiben und ohne automatische Aktivierung bereitstellen.
5. Lokal aktivieren und unter `http://localhost:2368/` prüfen.

## Abnahme und Rückweg

- Startseite: Kopf, Navigation, Karte, Pagination und Fuß ohne Browser-Standardlayout.
- Kleine und große Ansicht: keine horizontale Überbreite, Karte bleibt lesbar.
- CSS: erfolgreicher Tailwind-Bau; keine Preflight-Ergänzung.
- Ghost: Theme uploadbar; `source` bleibt bis zur erfolgreichen Sichtprüfung der Rückweg.

## Stoppkriterien

- Eine Klasse wäre ein Chart- oder Janitor-Hook.
- Eine benötigte visuelle Entscheidung ist nicht aus Tokens, Mockups oder bestehender App-Praxis ableitbar.
- Der Tailwind-Bau erkennt eine Klasse nicht wörtlich.

## Tatsächliches Ergebnis am 2026-07-19

- Die sechs vorgesehenen M1-Templates wurden auf direkte Tailwind-Klassen umgestellt; in ihrem sichtbaren Markup gibt es keine `fw-*`-Klasse mehr.
- Die technischen JavaScript-Hooks `fw-chart-engine` und `fw-janitor` in `post.hbs` blieben unverändert und außerhalb des M1-Umfangs.
- Der Tailwind-Bau mit `npm run css:build` lief erfolgreich. Die statischen Prüfungen auf sichtbare `fw-*`-Klassen, auf erzeugte Tailwind-Signale und `git diff --check` waren erfolgreich.
- Die lokale Sichtprüfung nach Upload und Aktivierung bestätigte Kopfzeile, Navigation ohne Listenpunkte, Markenbereich, Beitragskarte und Seitennavigation.
- Ghost meldet noch drei ausdrücklich nicht blockierende Hinweise: veraltetes `meta_description`, fehlende Unterstützung der Ghost-Font-Auswahl und die noch nicht unterstützte Editor-Option `show_title_and_feature_image`. Diese sind nicht Teil von M1 und bleiben bewusst offen.

Der wiederholbare Ablauf steht in `M1-HOMEPAGE-TAILWIND-KOCHBUCH.md`.
