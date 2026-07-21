---
chronik_id: CHRONIK-2026-07-21-ghost-seo-geo-pages
datum: 2026-07-21
projekt: finanzwesir-2-0
thema: ghost-seo-geo-pages
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, tooling-problem, externe-abhaengigkeit, konzept-vs-umsetzung, vollstaendigkeit-vs-verdichtung, annahme-verworfen]
---

# Chronik: SEO/GEO-Feldvertrag und Redaktionsleitfaden für Ghost Pages

**Hauptgegenstand:** Im Faden wurde eine technische und redaktionelle Grundlage für SEO-, GEO- und Reichweiten-Metadaten von statischen Ghost Pages erarbeitet. Der Gegenstand umfasste die Festlegung der verfügbaren Ghost-Felder, die Theme-Umsetzung, deren lokalen Nachweis und die Übersetzung in ein Redakteurs-Handbuch.

## Ausgangslage

Der Nutzer verwies auf vorhandene SEO- und GEO-Dokumente im Verzeichnis `docs\editorial`. Statische Ghost Pages sollten sowohl für Metaseiten wie Impressum und Datenschutz als auch für fachliche Themen-Pages verwendet werden. Der einzige benannte Unterschied bestand darin, dass bei rechtlichen Pages nicht alle Template-Felder ausgefüllt würden.

Als Ziel wurde festgelegt, dass jede im Ghost-Backend neu angelegte Page den vollständigen, fachlich sinnvollen Satz an SEO-/GEO-Feldern erhalten sollte. Redakteure sollten jeweils entscheiden können, welche Felder sie ausfüllten. Spätere Nachrüstungen über einen bereits angelegten Bestand hinweg sollten vermieden werden.

Zunächst wurde auf `Theme/page.hbs:14-15` hingewiesen, weil dort die Chart-Engine auf jeder Page geladen worden sei. Der Nutzer grenzte dies aus: Gegenstand sei ausschließlich SEO/GEO.

## Chronologischer Verlauf

### Recherche und Festlegung des Feldvertrags

Für die festzulegende Feldliste wurde aktuelle Recherche zum Stand von SEO und GEO verlangt. Dokumente älter als drei Monate sollten dafür nicht Grundlage sein. Der Arbeitsstand wurde dahin präzisiert, dass keine Minimalvariante, sondern die vollständige sinnvolle und genutzte Feldmenge festgelegt werden sollte.

Aus der Recherche und den vorhandenen Unterlagen wurde der technische Vertrag `docs/editorial/SEO-GEO-PAGE-FELDVERTRAG.md` erstellt. Er unterschied native Ghost-Felder, abgeleitete Theme-Daten und interne Tags für Pages.

Als native Page-Felder wurden Titel, Slug, Autor, Veröffentlichungs- und Änderungsdaten, Custom Excerpt, Feature Image mit Alt-Text und Bildunterschrift, Sichtbarkeit, Meta Title, Meta Description, Canonical URL sowie Open-Graph- und X-Felder festgehalten.

Für interne Page-Tags wurden `#seo-noindex`, `#seo-nosnippet`, `#schema-article`, `#schema-about`, `#schema-contact`, `#schema-profile` und `#schema-collection` festgelegt. Ohne einen `#schema-*`-Tag sollte das Theme `WebPage` ausgeben. Pro Page sollte höchstens ein Schema-Tag gesetzt werden.

Meta Keywords, besondere GEO-Titel oder GEO-Descriptions, Prompt-Keywords, `llms.txt`, pauschale FAQ-/HowTo-Schemata und individuelle Crawler-Entscheidungen pro Page wurden nicht in den Vertrag aufgenommen.

Bestehende Editorial-Dokumente wurden angepasst: `GEO statt SEO.md`, `REDAKTEURS-HANDBUCH Redaktionsleitfaden.md` und `Finanzwesir-Content-System.md`. Die automatische Behandlung von FAQ als Pflichtbestandteil wurde dabei durch eine optionale FAQ-Nutzung ohne automatisches FAQPage-Schema ersetzt.

### Soll/Ist-Abgleich und technische Umsetzung

Der Nutzer verlangte zunächst einen Soll/Ist-Abgleich durch Claude. Ein Prompt wurde im Archiv unter `Archiv\local\muss noch eingeordnet werden` angelegt. Der daraus entstandene Befund `GHOST-02_SEO-GEO-PAGE-FELDVERTRAG_SOLL-IST-BEFUND.md` erhielt den Status ROT.

Auf Basis dieses Befunds wurde ein weiterer Prompt für die technische Ergänzung des Themes erstellt. Claude änderte laut übermitteltem Befund `Theme/default.hbs` und `Theme/page.hbs`. In `default.hbs` wurde eine statische BreadcrumbList entfernt, ein Head-Slot ergänzt und `{{ghost_head}}` einmalig belassen. In `page.hbs` wurde ein Head-Block für Robots-Steuerung und Schema-Auswahl ergänzt. Der Befund `GHOST-03_SEO-GEO-PAGE-FELDVERTRAG_UMSETZUNGSBEFUND.md` erhielt zunächst den Status GELB.

Als offene Punkte wurden manuelle Zeilen für Title, Meta Description und Canonical URL sowie die Ghost-Tag-Slug-Konvention benannt. Ein lokaler Ghost-Live-Test sollte diese Punkte klären.

Der Nutzer stellte klar, dass kein produktives Ghost existierte; der Betrieb sei ausschließlich lokal. Claude sollte das Theme bauen, einen CSS-Build ausführen, das Theme paketieren und prüfen, aber keinen Upload vornehmen. Der Nutzer übernahm Upload und manuelle Tests im Ghost-Backend.

Claude meldete daraufhin einen ROT-Befund, weil in seiner Umgebung kein Werkzeug für die interaktive Ghost-Admin-Bedienung, den Theme-Upload, das Anlegen von QA-Pages und die Seitenquelltext-Prüfung verfügbar gewesen sei. Zusätzlich verwies der Befund auf eine Vorgabe gegen POSIX-Tests bei zugleich dokumentiertem Git-Bash-Werkzeug. Der Nutzer erklärte, der lokale Betrieb sei „maximal primitiv“ und benötige nur die fertige ZIP-Datei.

Später wurde der Befund `docs\steering\patches\GHOST-04_SEO-GEO-PAGE-FELDVERTRAG_WINDOWS-FULL-GATE.md` mit Status GRÜN vorgelegt. Er hielt fest, dass alle fünf Schema-Profile, einzelne und kombinierte Robots-Steuerung, Präzedenz-Reihenfolge sowie Title-, Description- und Canonical-Ausgabe im lokalen Ghost-Betrieb per Browser geprüft worden seien. Der Nutzer hatte die lokalen Theme-Uploads und Tests durchgeführt.

Im GHOST-04-Befund wurden weitere Theme-Korrekturen festgehalten: Der Head-Block wurde dreifach ungeescaped ausgegeben, manuelle Canonical- und Meta-Description-Zeilen wurden entfernt, `sameAs` wurde aus den Profilen entfernt, und die Tag-Prüfung wurde von `hash-<name>` auf `#<name>` korrigiert. Die CSS-Erstellung wurde laut Befund fünfmal über Git Bash ausgeführt; die ZIP-Datei wurde mit `powershell.exe Compress-Archive` erstellt. Als Paket wurde `Theme\finanzwesir-local-theme.zip` genannt.

### Redaktionsleitfaden

Nach der technischen Abnahme wurde gefragt, ob im Bereich Editorial bereits eine Datei mit Best Practices für Redakteure vorhanden sei. Benannt wurde das vorhandene `REDAKTEURS-HANDBUCH Redaktionsleitfaden.md` als Zielort.

Das Handbuch wurde zu `Redakteurs-Handbuch: SEO, GEO und Reichweite in Ghost` in Version 2.0.0 umgearbeitet. Es unterschied Ghost Posts und Ghost Pages. Für Posts wurden keine `#seo-*`- oder `#schema-*`-Tags vorgesehen, weil Posts ihr eigenes `BlogPosting`-Schema hätten. Für Pages wurden die internen Tags erklärt.

Das Handbuch erhielt Abschnitte zu großen Hebeln, zur Entscheidung zwischen Post und Page, zu Ghost-Feldern, Google- und Social-Feldern, internen Schema- und Robots-Tags, rechtlichen Pages, fachlichen Evergreen-Pages sowie About-, Kontakt-, Profil- und Sammlungs-Pages.

Für Impressum und Datenschutz wurde festgehalten: `public`, kein `#seo-noindex`, kein `#seo-nosnippet`, kein `#schema-*`-Tag, sachliche Meta-Felder und keine notwendige Social-Pflege. Für tiefe fachliche Pages wurde `#schema-article` zusammen mit Autor, Custom Excerpt, Meta Title, Meta Description, Quellen und internen Links beschrieben.

Ein kopierbarer KI-Auftrag wurde ergänzt. Er verlangte Vorschläge für Title/H1, Slug, Meta Title, Meta Description, Custom Excerpt, optionale Social-Felder, Platzhalter für interne Links, einen einzigen Page-Typ und Hinweise auf fehlende Quellen oder unklare Aussagen. Das Erfinden von Fakten, Zahlen, Quellen, Erfahrungen und rechtlichen Aussagen wurde darin ausgeschlossen.

Die abschließende Checkliste wurde in „Musst du tun“, „Solltest du tun“ und „Wenn du viel Zeit hast“ gegliedert.

Parallel wurde der Feldvertrag beim Punkt `sameAs` an den GHOST-04-Befund angepasst: Die Ausgabe sollte nur erfolgen, wenn eine vollständige, verwendbare URL aus einer Site-Einstellung vorliege.

Beide geänderten Editorial-Dateien wurden auf das NAS geschrieben und jeweils per SHA-256 gegen die lokalen Arbeitsfassungen geprüft.

## Wendepunkte

- Der Hinweis auf die Chart-Engine wurde aus dem Auftrag genommen; SEO/GEO blieb der Gegenstand.
- Die ursprüngliche Fragestellung nach einzelnen Metafeldern wurde zu einem vollständigen, verbindlichen Feldvertrag erweitert.
- Die technische Umsetzung erhielt nach GHOST-03 den Status GELB, weil Browser- und Ghost-Admin-Nachweise aus der Claude-Session fehlten.
- Die Zuständigkeit für Upload und Browser-Test wurde dem Nutzer zugeordnet; Claude sollte nur Paket und technische Prüfung vorbereiten.
- Mit dem lokalen Full-Gate-Befund GHOST-04 wurde der technische Status auf GRÜN gesetzt.
- Der technische Feldvertrag wurde anschließend in einen Redaktionsleitfaden mit konkreten Eingabeentscheidungen übersetzt.

## Entscheidungen und Festlegungen

- Vollständiger Satz sinnvoller SEO-/GEO-Felder für jede Ghost Page · zu Beginn der Feldvertragsarbeit · spätere Nachrüstung des Bestands sollte vermieden werden · gültig.
- Interne Steuerung nur über die festgelegten `#seo-*`- und `#schema-*`-Tags auf Pages · während der Feldvertragsarbeit · Posts erhielten keine solche Tag-Steuerung · gültig.
- Rechtliche Pages bleiben normale `WebPage`-Pages ohne Robots-Sperren und ohne Fachartikel-Schema · bei der redaktionellen Ausarbeitung · gültig.
- Meta Keywords, GEO-Sonderfelder, `llms.txt` und pauschale FAQ-Schemata werden nicht verwendet · bei der Feldvertragsarbeit · gültig.
- Theme-Upload und manueller Ghost-Test liegen beim Nutzer · nach dem ROT-Befund zum Full-Gate · gültig.
- Das vorhandene Redakteurs-Handbuch ist der zentrale Editorial-Leitfaden · bei der Handbuch-Erweiterung · gültig.

## Irrwege, Schleifen und verworfene Ansätze

- Die Chart-Engine auf statischen Pages wurde zunächst als Befund eingebracht. Der Nutzer nahm diesen Punkt aus dem Scope.
- Der GHOST-03-Befund ließ manuelle Meta-Zeilen in `default.hbs` bestehen, weil ihre Wirkung ohne Browser-Nachweis unklar blieb. Im GHOST-04-Befund wurden sie nach lokalem Nachweis entfernt.
- Die interne Ghost-Tag-Konvention wurde zunächst als `hash-<name>` angenommen. Sie wurde im GHOST-04-Befund durch Prüfungen auf `#<name>` ersetzt.
- Claude hielt Browser-Test, Ghost-Admin-Bedienung und Theme-Upload wegen fehlender Werkzeuge für nicht ausführbar. Der Nutzer übernahm diese Schritte im lokalen Betrieb.
- Die Vorgabe gegen POSIX-Tests stand neben einem Git-Bash-Werkzeug. Der GHOST-04-Befund hielt später Git-Bash für CSS-Builds fest.

## Erzeugte Artefakte

- `docs/editorial/SEO-GEO-PAGE-FELDVERTRAG.md` – technischer Vertrag für Ghost Pages – final.
- `docs/editorial/GEO statt SEO.md` – aktualisierte GEO-/SEO-Regeln – final.
- `docs/editorial/Finanzwesir-Content-System.md` – Abgrenzung von Content-Frontmatter und Ghost-Metadaten – final.
- `docs/editorial/REDAKTEURS-HANDBUCH Redaktionsleitfaden.md` – Redaktionsleitfaden für SEO, GEO und Reichweite – final.
- `Archiv\local\muss noch eingeordnet werden\GHOST-02_SEO-GEO-PAGE-FELDVERTRAG_SOLL-IST-BEFUND.md` – Soll/Ist-Befund – final, Status ROT.
- `docs\steering\patches\GHOST-03_SEO-GEO-PAGE-FELDVERTRAG_UMSETZUNGSBEFUND.md` – Umsetzungsbefund – final, Status GELB.
- `docs\steering\patches\GHOST-04_SEO-GEO-PAGE-FELDVERTRAG_WINDOWS-FULL-GATE.md` – lokaler Full-Gate-Befund – final, Status GRÜN.
- `Theme\finanzwesir-local-theme.zip` – lokales Theme-Paket – erzeugt.

## Sachliche Erkenntnisse

- Gesicherter Stand: SEO und GEO wurden im Feldvertrag als reguläre Such- und Verständlichkeitsarbeit behandelt; besondere GEO-Metafelder wurden nicht festgelegt.
- Gesicherter Stand: Ghost Pages können mit den festgelegten nativen Feldern und internen Tags technisch unterschieden werden.
- Gesicherter Stand laut GHOST-04: Die fünf Schema-Profile und die Robots-Steuerung wurden lokal im Ghost-Betrieb geprüft.
- Spätere Korrektur: `sameAs` wurde nicht aus den vorhandenen Site-Handles abgeleitet, weil diese keine verwendbaren vollständigen URLs lieferten.
- Arbeitsannahme: Nach dem Anlegen mehrerer echter Pages könnten einzelne Formulierungen im Redaktions-Handbuch angepasst werden; die technische Feldstruktur blieb davon getrennt.

## Offene Punkte am Ende

— keine im Faden erkennbar —

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Der Faden wechselte zwischen Vertragsdefinition, Theme-Umsetzung, lokaler Betriebszuständigkeit und redaktioneller Übersetzung. Mehrere technische Nachweise wurden zunächst wegen Werkzeuggrenzen nicht erbracht und später durch manuellen lokalen Betrieb geliefert. Die Abgrenzung zwischen notwendigen Metadaten und ausgeschlossenen Zusatzmechanismen wurde mehrfach als Voraussetzung für eine überschaubare Redaktionsarbeit benannt.

## Bewusst ausgelassen

Ausgelassen wurden Such- und Kopierbefehle, Hashwerte, wiederholte Zwischenbestätigungen, Formulierungsvarianten der Prompts sowie Bedienabläufe ohne Auswirkung auf Feldvertrag, Theme-Stand, Zuständigkeiten oder Redaktionsleitfaden.
