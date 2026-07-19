Stand: 2026-07-19 22:17 | Session: M1-Kochbuch | Geändert von: Codex

# M1 – Homepage auf Tailwind umstellen: Kochbuch

## Zweck und Architekturgrenze

Dieses Kochbuch stellt ausschließlich die sichtbare Ghost-Homepage auf Tailwind um: Kopf, Navigation, Markenbereich, Beitragskarte, Seitennavigation und Fuß. Es ist der wiederholbare Ablauf für eine neue lokale Ghost-Site oder eine spätere Überarbeitung derselben sechs Dateien.

Die Ursache des ursprünglichen Problems war klar: Sichtbare `fw-*`-Klassen werden nicht durch den Tailwind-Bau erzeugt. Das Präfix `fw-*` ist für technische Hooks der Chart-Engine reserviert. Die einfachste dauerhafte Regel lautet deshalb: Sichtbares Theme-Markup verwendet direkte Tailwind-Klassen; technische `fw-*`-Hooks bleiben unverändert.

Nicht Teil von M1 sind `post.hbs`, `page.hbs`, `tag.hbs`, `author.hbs` und `error.hbs`. Ebenso werden Ghost-Admin-Einstellungen, Inhalte und die Chart-Engine nicht angefasst.

## Voraussetzungen

- Ghost läuft lokal; Start und Stopp stehen in `GHOST-LOKALBETRIEB.md` im selben Verzeichnis.
- Das Theme liegt im Projekt unter `Theme`.
- Der Tailwind-Bau nutzt das System-Node 24. Ghost selbst bleibt mit dem isolierten Node 22 unter `C:\Tools\ghost-local` betrieben.
- Für den Bau muss das gemappte Laufwerk `Z:` verwendet werden. `npm` startet unter Windows über `cmd.exe`; dieses kann nicht zuverlässig mit einem UNC-Arbeitsverzeichnis arbeiten.

## M1-Dateien

Bearbeite nur diese sechs Templates:

- `Theme/default.hbs`
- `Theme/index.hbs`
- `Theme/partials/header.hbs`
- `Theme/partials/footer.hbs`
- `Theme/partials/post-card.hbs`
- `Theme/partials/pagination.hbs`

## Schritt 1 – sichtbares Markup auf Tailwind umstellen

1. Suche zuerst nach `fw-*` in den sechs M1-Dateien.
2. Ersetze jede sichtbare Layout-, Typografie-, Abstands-, Grid-, Karten- oder Navigationsklasse durch passende direkte Tailwind-Klassen.
3. Lasse Ghost-Helper und die Datenstruktur unverändert: insbesondere `{{ghost_head}}`, `{{ghost_foot}}`, `{{#foreach}}`, `{{navigation}}`, `{{pagination}}`, Bild- und Datums-Helper.
4. Keine neue eigene CSS-Schicht für M1 anlegen. Die Klassen müssen im Template stehen, damit der Tailwind-Bau sie erkennt.

Für den ruhigen M1-Rahmen wurden unter anderem volle Seitenhöhe, begrenzte Inhaltsbreite, responsives Grid, Bildseitenverhältnis, Kartenrand und Schatten eingesetzt. Die konkrete Gestaltung darf sich später ändern; die Trennung zwischen sichtbaren Tailwind-Klassen und technischen Hooks bleibt bindend.

## Schritt 2 – Ghost-Navigation ohne Listenpunkte darstellen

`{{navigation}}` erzeugt selbst ein `ul` mit `li`-Elementen. Tailwind setzt diese Elemente nicht automatisch zurück. Der umschließende Navigationsbereich braucht daher neben seinen eigenen Klassen diese Varianten:

```hbs
[&_ul]:m-0 [&_ul]:flex [&_ul]:list-none [&_ul]:flex-wrap [&_ul]:items-center [&_ul]:gap-x-4 [&_ul]:gap-y-2 [&_ul]:p-0
```

Ohne diese Regel erscheinen vor den Links wie „Home“ und „About“ Aufzählungspunkte. Das ist kein Ghost-Fehler, sondern normales HTML-Listenverhalten.

## Schritt 3 – Tailwind bauen

Öffne PowerShell und führe aus:

```powershell
Set-Location 'Z:\Documents\Nextcloud\Finanzwesir 2.0'
npm run css:build
```

Quelle ist `Theme/src/css/screen.source.css`; die erzeugte Datei ist `Theme/assets/css/screen.css`. Bearbeite die erzeugte Datei nicht von Hand. Ein erfolgreicher Bau mit Tailwind 4 ist die Voraussetzung für Upload und Test.

## Schritt 4 – vor dem Upload prüfen

Prüfe mindestens:

- In den sechs M1-Dateien gibt es keine sichtbaren `fw-*`-Klassen mehr.
- Die Klammerblöcke der Handlebars-Templates sind ausgeglichen.
- `Theme/assets/css/screen.css` enthält die neuen Tailwind-Signale, etwa `min-h-screen`, `max-w-7xl`, Grid-, Bildseitenverhältnis- und Schatten-Regeln.
- `git diff --check` meldet keine Leerraumfehler.

Falls eine Prüfung scheitert, nicht hochladen. Erst das Template oder die Build-Konfiguration korrigieren und erneut bauen.

## Schritt 5 – Theme paketieren und in Ghost aktivieren

Die ZIP-Erstellung folgt dem etablierten lokalen Ghost-Ablauf in `GHOST-LOKALBETRIEB.md`. Das Paket muss den Theme-Inhalt direkt an seiner Wurzel enthalten und darf weder `node_modules` noch `.git`, `.claude` oder die Tailwind-Quelldateien enthalten. Die erzeugte CSS-Datei `assets/css/screen.css` gehört dagegen hinein.

In Ghost Admin:

1. `http://localhost:2368/ghost/` öffnen.
2. **Settings** → **Change theme** → **Upload theme** wählen.
3. Das ZIP auswählen.
4. Bei gleichem Namen **Overwrite** wählen.
5. Das hochgeladene Theme aktivieren.

## Schritt 6 – Sichtprüfung

Öffne `http://localhost:2368/` und prüfe bei Desktop-Breite:

- Markenname links und Navigation rechts sind sichtbar.
- Navigation zeigt keine Aufzählungspunkte.
- Markenbereich, Beitragskarte und Beitragsbild sind klar begrenzt und lesbar.
- Die Seitennavigation ist sichtbar.
- Die Seite bleibt bei mindestens einem Ghost-Beitrag funktionsfähig.

Erst nach dieser Sichtprüfung ist M1 abgeschlossen.

## Rückweg

Falls die Homepage nicht rendert oder sichtbar schlechter ist:

1. In Ghost Admin **Settings** → **Change theme** öffnen.
2. Das vorherige Theme, zum Beispiel **Source**, aktivieren.
3. Die konkrete Ghost-Meldung und den betroffenen Template-Stand festhalten.

Keine Datenbank zurücksetzen und keine Ghost-Installation löschen: Ein Theme-Rückwechsel reicht für diesen Fehlerfall.

## Bewusst offene Ghost-Hinweise

Nach M1 bleiben drei nicht blockierende Hinweise bewusst offen:

| Ghost-Hinweis | Bedeutung | Entscheidung |
| --- | --- | --- |
| `GS001-DEPR-MD` | `{{meta_description}}` steht zusätzlich manuell im `head`; `{{ghost_head}}` liefert es bereits. | Beim nächsten Eingriff in `default.hbs` bereinigen. |
| `GS051-CUSTOM-FONTS` | Ghost Admin kann die Font-Auswahl des Themes nicht steuern. | Lokale statische Fonts funktionieren; später entscheiden. |
| `GS110-NO-MISSING-PAGE-BUILDER-USAGE` | Die Editor-Option für Seitentitel und Beitragsbild hat noch keine Wirkung. | Erst beim Ausbau der Seiten-Templates behandeln. |

Diese Hinweise blockieren weder den Upload noch die sichtbare M1-Homepage.

## Bestätigter Stand

Am 2026-07-19 wurde M1 lokal gebaut, hochgeladen, aktiviert und sichtbar geprüft. Kopfzeile, Navigation ohne Aufzählungspunkte, Markenbereich, Beitragskarte und Seitennavigation waren funktionsfähig. Der nächste fachliche Ausbau beginnt in einem neuen Meilenstein, nicht durch Änderungen an diesem M1-Grundgerüst.
