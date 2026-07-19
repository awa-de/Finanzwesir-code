Stand: 2026-07-19 20:31 | Session: TMPL-1-Tailwind-Korrektur | Geändert von: Codex

# TMPL-1 — erweiterbares Ghost-Grundgerüst

## 1. Auftrag und Ziel

TMPL-1 baut die fehlende Template-Schicht zwischen Ghost und dem vorhandenen
Finanzwesir-Bestand. Ergebnis ist ein lokal installierbares Ghost-Theme mit
stabiler Site-Shell und den üblichen Inhaltsseiten.

Das Theme wird so geschnitten, dass spätere Seiten und Apps ergänzt werden,
ohne Header, Footer oder Grundstruktur umzubauen.

## 2. Architekturentscheidung

```text
default.hbs
├─ partials/header.hbs
├─ <main class="site-main {{body_class}}">
│  └─ aktuelles Seiten-Template
└─ partials/footer.hbs
```

Die Site-Shell ist global und bewusst klein. Ein Seiten-Template verantwortet
nur seinen eigenen Inhalt. Ghost liefert die Seitentypklasse über
`{{body_class}}`; zusätzliche globale Klassen werden nicht erfunden.

| Bereich | Verantwortlich | Nicht verantwortlich |
| --- | --- | --- |
| `default.hbs` | Dokumentrahmen, lokale Fonts/CSS, Ghost-Hooks, Shell | Homepage-Funnel, Charts, App-Logik |
| Header/Footer | Navigation, Marke, wiederkehrender Abschluss | individuelle Seitenlayouts |
| Seiten-Templates | Ghost-Inhalt des jeweiligen Seitentyps | globale Navigation und Fonts |
| Ghost-HTML-Karte | jeweilige App mit `data-fw-*`-Attributen | Theme- oder Artikel-Layout |

## 3. Bewusst übernommener Bestand

Direkt übernommen werden die lokalen Schriften aus `Theme/assets/fonts/` über
das vorhandene `assets/css/screen.css`. `screen.css` importiert `tokens.css`;
diese Dateien bleiben für TMPL-1 zunächst Quelle der bestehenden CI-Grundlagen.

Die vorhandene Chart-Engine und die lokal vendorte Chart.js-Datei bleiben
unverändert. Wenn Chart-Skripte erforderlich sind, kommen sie ausschließlich
in `post.hbs` in der vorgegebenen Lade-Reihenfolge: Chart.js vor Chart-Engine.

Visuelle Struktur gehört in vollständige Tailwind-Klassenliterale im Markup.
`fw-*` bleibt für die Chart-Engine und für bestehende App-Anker reserviert;
Theme-Anker heißen beschreibend ohne Präfix, etwa `site-main` oder
`post-card`, und erhalten keine `fw-*`-Regel in `screen.css`. Die dafür
erforderliche lokale Buildkette ist T1 und wird vor dem visuellen Styling
dieser Templates umgesetzt.

## 4. Bewusst nicht übernommen

- Kein Tailwind-Play-CDN, keine Google- oder Fontshare-Schriften und keine
  externen Chart.js-, D3- oder TopoJSON-URLs.
- Kein CSS aus den einzelnen App-Prototypen als globale Theme-Regel.
- Keine App-spezifischen Layouts, Daten, JavaScript-Initialisierung oder
  Chart-Konfiguration im Theme.
- Keine Zerlegung des alten Homepage-Prototyps v12.
- Kein `home.hbs`, bevor eine verbindliche statische Funnel-Homepage vorliegt.

## 5. Ziel-Dateibaum

```text
Theme/
├─ default.hbs
├─ index.hbs
├─ post.hbs
├─ page.hbs
├─ tag.hbs
├─ author.hbs
├─ error.hbs
├─ partials/
│  ├─ header.hbs
│  ├─ footer.hbs
│  ├─ post-card.hbs
│  └─ pagination.hbs
└─ assets/
   ├─ css/screen.css             (bestehend, nur gezielt ergänzen)
   ├─ css/tokens.css             (bestehend, Single Source of Truth)
   ├─ fonts/                     (bestehend)
   └─ js/vendor/chart.umd.min.js (bestehend)
```

Die vier Partials verhindern spätere Kopien von Navigation, Footer,
Beitragsvorschau und Seitennavigation. Neue Seitentypen erhalten eigene
Templates oder Partials, statt `default.hbs` zu überladen.

## 6. Umsetzungsreihenfolge

1. `default.hbs` anlegen: HTML-Sprache, Viewport, `{{ghost_head}}`, lokale
   CSS-Einbindung, `{{body_class}}`, `{{body}}`, `{{ghost_foot}}`.
2. `header.hbs` und `footer.hbs` anlegen; Ghost-Navigation verwenden, keine
   Navigation hart codieren.
3. `index.hbs`, `post-card.hbs` und `pagination.hbs` anlegen; Ergebnis ist
   eine generische Artikelübersicht, nicht die spätere Funnel-Homepage.
4. `post.hbs` und `page.hbs` anlegen; Ghost-Content erhält eine klar begrenzte
   Lesespalte. Chart-Assets nur in `post.hbs` einbinden.
5. `tag.hbs` und `author.hbs` ergänzen; sie nutzen die Artikelvorschau.
   `error.hbs` ist ein eigenständiges, minimales Fehler-Template ohne Layout
   oder gemeinsame Partials, weil Ghost dort außer `{{asset}}` keine Theme-
   Helfer zulässt.
6. Den lokalen Tailwind-Produktionsbuild gemäß
   `docs/steering/design/T1-TAILWIND-PRODUKTIONSBUILD-PLAN.md` umsetzen.
   Erst danach erhalten die Templates ihre visuellen Tailwind-Klassen.
7. `screen.css` nur für Basistypografie, Ghost-Content, Marken-Sonderfälle
   und wiederverwendbare Komponenten ergänzen; Layout und Abstände bleiben
   Tailwind-Utilities. App-Flächen bleiben davon ausgenommen.
8. Theme lokal gegen Ghost prüfen und installieren; erst danach Phase 3 der
   bestehenden Assembly-Checkliste beginnen.

## 7. Schnittstelle zu Apps

Der Vertrag `docs/spec/APP-INTERFACE.md` bleibt maßgeblich:

- Redakteure fügen Apps als Ghost-HTML-Karten ein.
- Konfiguration erfolgt über `data-fw-*`-Attribute.
- Eine App kapselt ihre eigene Darstellung und ihr Modulverhalten.
- Das Theme stellt nur die umgebende Artikelseite bereit.

Damit kann eine neue App oder ein neuer App-Typ ergänzt werden, ohne die
Site-Shell oder ein anderes Seiten-Template anzufassen.

## 8. Abnahmekriterien für TMPL-1

- Ghost akzeptiert das Theme lokal ohne fehlende Template-Datei.
- Header und Footer erscheinen auf Artikel-, Listen-, Tag-, Autoren-, Fehler-
  und statischen Seiten einheitlich.
- Lokale Archivo-Black- und Source-Sans-Pro-Schriften werden über die
  vorhandenen Theme-Assets geladen.
- Eine Beitragsliste paginiert; ein Beitrag und eine statische Seite zeigen
  Ghost-Inhalt in einer lesbaren Spalte.
- `post.hbs` kann die vorhandene Chart-Infrastruktur laden; andere Seiten
  laden sie nicht global.
- Eine Ghost-HTML-Karte bleibt eine gekapselte App-Fläche.
- Die spätere Funnel-Homepage ist nicht Teil der Abnahme und kann später als
  eigenes `home.hbs` ergänzt werden.

## 9. Dokumentation nach der Umsetzung

Nach erfolgreicher lokaler Prüfung werden ausschließlich die erledigten
Punkte in `THEME-ASSEMBLY-CHECKLIST.md` markiert. `GHOST-LOKALBETRIEB.md`
wird nur angepasst, falls sich der dort dokumentierte Start-, Installations-
oder Prüfablauf tatsächlich ändert.

## 10. Offene Produktentscheidungen

1. Die verbindliche statische Funnel-Homepage ist vor `home.hbs` fertig.
2. Die finale Navigationsstruktur wird in Ghost gepflegt; das Theme verwendet
   sie unverändert.
3. Zusätzliche Komponenten aus App-Mockups werden erst bei belegtem,
   wiederkehrendem Bedarf als Theme-Komponente aufgenommen.
