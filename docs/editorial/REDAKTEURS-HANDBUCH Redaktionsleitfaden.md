# Redakteurs-Handbuch: SEO, GEO und Reichweite in Ghost

| Feld | Wert |
|---|---|
| Version | 2.0.0 |
| Datum | 2026-07-21 |
| Status | Verbindlich |
| Zielgruppe | Redakteur / Autor ohne Entwicklerwissen |
| Geltung | Ghost Posts und Ghost Pages; Page-Tags nur für Pages |

## 1. Worum es geht

Dieses Handbuch erklärt, wie ein fertiger Text in Ghost so angelegt wird, dass Leser ihn finden, verstehen und weitergeben können. SEO und GEO sind kein Zusatzprogramm: Der große Hebel ist ein hilfreicher, belegter Text für Menschen. Metadaten helfen Suchmaschinen und Vorschauen, ihn richtig einzuordnen.

Die technische Referenz ist der [SEO/GEO-Feldvertrag für Ghost Pages](SEO-GEO-PAGE-FELDVERTRAG.md). Dieses Handbuch übersetzt ihn in einfache Redaktionsentscheidungen.

| Inhaltstyp | Typische Beispiele | Interne Tags |
|---|---|---|
| Ghost Post | Blogartikel, Kolumne, chronologischer Beitrag | Keine `#seo-*`- oder `#schema-*`-Tags setzen. Posts haben ihr eigenes `BlogPosting`-Schema. |
| Ghost Page | Impressum, Datenschutz, Kontakt, Über-uns, tiefer Evergreen-Guide | Die Tags aus Abschnitt 5 stehen zur Verfügung. |

## 2. Die großen Hebel

### Muss stimmen

1. **Konkrete Frage oder klaren Zweck erfüllen.** Titel und Einleitung machen sofort deutlich, worum es geht.
2. **Eigene, belastbare Substanz liefern.** Eigene Erfahrung, Rechnung, Beispiele und Primärquellen sind wertvoller als eine Zusammenfassung anderer Texte.
3. **Sauber strukturieren.** Genau eine H1, sinnvolle H2/H3, verständliche Absätze sowie bei Nutzen Tabelle oder Liste.
4. **Google-Felder pflegen.** Meta Title und Meta Description sind der Vorschlag für die Überschrift und Beschreibung in Google.
5. **Fachliches aktuell halten.** Zahlen, Gesetze, Gebühren und Links bei Änderungen inhaltlich überarbeiten.

### Hilft deutlich

- Autor mit echter Bio und erkennbarer Fachlichkeit
- Links auf Primärquellen wie BaFin, Bundesbank, Studien oder Produktunterlagen
- passende interne Links zu anderen Finanzwesir-Inhalten
- aussagekräftiges Feature Image mit Alt-Text
- eigenständige Social-Vorschau für bewusst teilenswerte Inhalte

### Nett, aber nicht wichtiger als der Text

- eigene Open-Graph- oder X-Texte, wenn sie vom Google-Text abweichen sollen
- FAQ-Abschnitt, wenn Leserfragen wirklich offen bleiben
- zusätzliche Tabellen, Grafiken oder Videos, wenn sie etwas besser erklären

Keine Zeit in Meta Keywords, GEO-Titel, LLM-Keywords oder `llms.txt` stecken. Sie gehören nicht zum Finanzwesir-Workflow.

## 3. Page oder Post: zuerst richtig entscheiden

Nutze einen **Post**, wenn der Beitrag zum Blogfluss gehört und chronologisch erscheinen soll. Nutze eine **Page**, wenn der Inhalt dauerhaft erreichbar sein soll und nicht in den normalen Blogkanal gehört.

Pages sind zum Beispiel Rechtstexte, Über-uns, Kontakt, dauerhafte Themen-Guides und echte Übersichtsseiten. Nur bei Pages gibt es die internen Tags aus diesem Handbuch.

## 4. Die Felder in Ghost: so setzt du sie ein

Ghost Admin → **Pages** → **New page**. Schreibe erst den Text; danach öffne die Sidebar mit den Page-Einstellungen.

| Feld in Ghost | So einsetzen | Warum |
|---|---|---|
| Titel | Klarer, konkreter Seitentitel. Er ist die sichtbare H1. | Leser und Suchsysteme erkennen das Thema sofort. |
| Post URL / Slug | 3–6 verständliche Wörter, deutsch, Bindestriche, kein Datum. | Stabile, lesbare URL. |
| Autor | Bei fachlichen Pages den tatsächlichen Autor wählen. | Herkunft und Kompetenz werden sichtbar. |
| Custom Excerpt | 1–3 neutrale Teasersätze schreiben. | Fallback für Beschreibung und Vorschauen. |
| Feature Image | Nur setzen, wenn es Inhalt oder Vorschau verbessert. | Hilft bei Social-Vorschau und Einordnung. |
| Alt-Text | Beschreibt, was am Bild relevant ist. | Barrierefreiheit und Bildkontext. |
| Bildunterschrift | Quelle oder Einordnung, wenn nötig. | Macht die Bildaussage transparent. |
| Sichtbarkeit | Öffentliche Zielseiten auf `public` lassen. | Nicht öffentliche Inhalte sind kein SEO-Ziel. |
| Veröffentlichungsdatum | Korrekt setzen, nicht künstlich verjüngen. | Zeitliche Einordnung. |

Ghost aktualisiert das Änderungsdatum beim Speichern. Speichere nur nach einer echten inhaltlichen Änderung; ein Leerzeichen ist keine Aktualisierung.

## 5. Google-, Social- und technische Tags

Ghost Admin → Page → Sidebar → **Meta data**.

| Feld | Was eintragen | Nicht tun |
|---|---|---|
| Meta Title („Google-Überschrift“) | Klarer Nutzen mit Thema, z. B. `ETF-Sparplan: Kosten realistisch vergleichen | Finanzwesir`. | Keine Keyword-Reihe und keine künstliche Zeichenakrobatik. |
| Meta Description | 1–2 konkrete Sätze: Frage, Nutzen, gegebenenfalls Zielgruppe. Etwa 120–160 Zeichen sind oft gut lesbar, aber keine Pflicht. | Keine leeren Werbeformeln. |
| Canonical URL | Normalerweise **leer lassen**. Nur bei echter, absichtlich veröffentlichter Dublette auf die Original-URL setzen. | Nicht die eigene URL eintragen. |
| Open-Graph Title / Description / Image | Nur für teilenswerte Pages getrennt pflegen, wenn die Social-Vorschau anders sein soll als Google. | Bei Rechtstexten unnötige Arbeit erzeugen. |
| X Title / Description / Image | Wie Open Graph; nur bei echtem Social-Nutzen. | Nicht doppelt pflegen, wenn Ghost-Fallbacks genügen. |

Google darf Title und Description anders darstellen. Die Felder sind gute Vorschläge, keine Anzeige-Garantie.

### Interne Tags für Pages

Diese Tags sind **intern**: Leser sehen sie nicht. Sie steuern technische Metadaten des Themes. Eine Page erhält höchstens einen `#schema-*`-Tag; ohne einen solchen Tag gilt `WebPage`.

| Tag | Wann setzen? | Was steckt dahinter? |
|---|---|---|
| kein `#schema-*`-Tag | Impressum, Datenschutz, einfache Informationsseiten | Das Theme gibt `WebPage` aus. Das ist der Normalfall. |
| `#schema-article` | Tiefe fachliche Evergreen-Page mit Autor, Quellen und eigenem Thema | Das Theme gibt `Article` mit Titel, Autor und Daten aus. |
| `#schema-about` | Über Finanzwesir oder Über mich | Das Theme gibt `AboutPage` aus. |
| `#schema-contact` | Echte Kontaktseite | Das Theme gibt `ContactPage` aus. |
| `#schema-profile` | Page über eine bestimmte Person und deren Expertise | Das Theme gibt `ProfilePage` aus. Nicht für normale Artikel nutzen. |
| `#schema-collection` | Echte Übersichts- oder Sammlungseite | Das Theme gibt `CollectionPage` aus. Nicht für einen einzelnen Fachtext. |
| `#seo-noindex` | Sehr selten: veröffentlichte Page soll erreichbar, aber nicht bei Google sein | Das Theme setzt `noindex`. Nicht für normale oder rechtliche Pages. |
| `#seo-nosnippet` | Fast nie: Page darf verlinkt werden, ihr Text aber nicht als Snippet erscheinen | Das Theme setzt `nosnippet`. Nur mit konkretem Grund. |

Wenn versehentlich mehrere `#schema-*`-Tags gesetzt sind, entferne die überzähligen Tags. Die technische Präzedenz ist kein Gestaltungsmittel.

## 6. Drei typische Page-Fälle

### Rechtliche Page: Impressum oder Datenschutz

- Titel und korrekten Slug setzen: `impressum` oder `datenschutz`.
- Sichtbarkeit: `public`.
- Keinen `#seo-noindex`, keinen `#seo-nosnippet` und keinen `#schema-*`-Tag setzen.
- Meta Title und Meta Description dürfen sachlich sein, zum Beispiel `Impressum | Finanzwesir`.
- Feature Image und Social-Felder sind nicht nötig.

**Dahinter steckt:** Die Page bleibt als `WebPage` auffindbar. Rechtstexte werden nicht künstlich als Fachartikel oder Social-Inhalt behandelt.

### Fachliche Themen-Page: tiefer Evergreen-Guide

- Titel, stabilen Slug, Autor und echtes Veröffentlichungsdatum setzen.
- Custom Excerpt, Meta Title und Meta Description schreiben.
- Bei Bild: Feature Image und Alt-Text setzen.
- `#schema-article` setzen.
- Im Text: konkrete Frage, klare Antwort, Quellen, H2-Struktur, passende interne Links und bei Nutzen eine Tabelle oder Liste.
- Open-Graph-/X-Felder nur pflegen, wenn die Page bewusst geteilt werden soll.

**Dahinter steckt:** Das Theme leitet für `Article` Titel, Autor, Datum, Bild und Beschreibung aus den Ghost-Feldern ab.

### Über-uns, Kontakt, Profil oder Sammlung

| Page | Tag | Inhalt, der zusätzlich sichtbar sein muss |
|---|---|---|
| Über Finanzwesir / Über mich | `#schema-about` | Mission, Zielgruppe, Erfahrung, Vertrauensbelege |
| Kontakt | `#schema-contact` | echter Kontaktweg |
| Personenprofil | `#schema-profile` | betreffende Person, Rolle und nachvollziehbare Expertise |
| Übersicht | `#schema-collection` | echte, gepflegte Sammlung mit verständlicher Ordnung |

## 7. So hilft KI sinnvoll

KI darf Vorschläge machen. Du bleibst für Fakten, Zahlen, Quellen, rechtliche Texte und die finale Entscheidung verantwortlich.

Wenn der Text fertig ist, gib ihn einer KI mit diesem Auftrag:

```text
Prüfe den folgenden fertigen Ghost-Text als Redaktionsassistenz.
Erfinde keine Fakten, Zahlen, Quellen, Erfahrungen oder rechtlichen Aussagen.

Liefere Vorschläge für:
1. Title/H1,
2. Ghost-Slug,
3. Meta Title,
4. Meta Description,
5. Custom Excerpt,
6. falls sinnvoll: Open-Graph Title, Description und Bildidee,
7. passende interne Links nur als Platzhalter [interner Link zu Thema X],
8. den einen passenden Page-Typ: kein Schema-Tag, #schema-article,
   #schema-about, #schema-contact, #schema-profile oder #schema-collection,
9. fehlende Leserfragen, unklare Aussagen und fehlende Quellen.

Begründe jeden Vorschlag kurz. Markiere Unsicherheiten statt sie zu erfinden.
Empfiehl #seo-noindex oder #seo-nosnippet nur bei einem konkreten Grund.

TEXT:
[hier den fertigen Text einfügen]
```

KI ist gut beim Verdichten, beim Finden unklarer Überschriften und bei Alternativen für Meta-Texte. Sie ersetzt keine Quellenprüfung und keine fachliche Verantwortung.

## 8. FAQ, Aktualisierung und VG Wort

Eine FAQ ist optional. Nutze sie nur für echte wiederkehrende Fragen. Sie braucht kein automatisches FAQPage-Schema und keine Code Injection.

Bei fachlichen Updates prüfst du Zahlen, Gebühren, Gesetze, Produktdaten, Quellen und Links. Prüfe auch die Meta Description, wenn sich der Kernnutzen geändert hat.

Für VG Wort gelten die bestehenden Meldungs- und Zählpixel-Regeln. Das Zählpixel ist kein SEO-/GEO-Feld.

## 9. Checkliste vor dem Veröffentlichen

### Musst du tun

- [ ] Passenden Inhaltstyp entschieden: Post oder Page
- [ ] Klaren Titel und stabilen Slug gesetzt
- [ ] Text beantwortet eine konkrete Leserfrage oder erfüllt seinen klaren Zweck
- [ ] Aussagen, Zahlen und Links geprüft
- [ ] Für eine fachliche Page: Autor, Meta Title und Meta Description gesetzt
- [ ] Für eine Page: höchstens einen passenden `#schema-*`-Tag gesetzt oder bewusst keinen
- [ ] Bei Bild: sinnvollen Alt-Text gesetzt

### Solltest du tun

- [ ] Custom Excerpt geschrieben
- [ ] H2/H3-Struktur geprüft; keine Heading-Ebene übersprungen
- [ ] Quellen auf Primärquellen gesetzt
- [ ] passende interne Links ergänzt
- [ ] Tabelle oder Liste eingesetzt, wenn sie das Verstehen verbessert
- [ ] Feature Image und bei Social-Bedarf Open-Graph-/X-Felder gepflegt
- [ ] bei einem Update nur nach echter inhaltlicher Änderung gespeichert

### Wenn du viel Zeit hast

- [ ] KI-Vorschläge für Titel, Meta-Felder und unklare Stellen geprüft
- [ ] Social-Vorschau mit eigenem Titel, Text und Bild verfeinert
- [ ] FAQ ergänzt, wenn echte wiederkehrende Fragen offen bleiben
- [ ] verwandte Pages auf sinnvolle interne Verlinkung geprüft

## 10. Was nicht in diesem Dokument steht

Chart-Einbindung steht im separaten [REDAKTEURS-HANDBUCH Chart-Integration](REDAKTEURS-HANDBUCH%20Chart-Integration.md). Der technische Nachweis der Theme-Ausgabe steht im SEO/GEO-Feldvertrag und in den GHOST-02 bis GHOST-04-Befunden.
