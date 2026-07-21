# SEO/GEO-Feldvertrag für Ghost Pages

| Feld | Wert |
|---|---|
| Version | 1.0.0 |
| Datum | 2026-07-21 |
| Status | Verbindlich |
| Geltung | Alle neuen und bestehenden Ghost Pages |

## 1. Zweck und Architektur

Jede Ghost Page verwendet denselben vollständigen SEO-/Social-Metadatensatz. Rechtliche und einfache Informationsseiten lassen nicht benötigte Felder leer; tiefe Content-Seiten pflegen sie nach Bedarf.

Ghost Pages sind technisch Posts im Page-Kontext. Ein Theme kann keine neuen Eingabefelder im Ghost-Backend erzeugen, sondern nur vorhandene Felder ausgeben. Der Feldvertrag trennt deshalb native Ghost-Felder, kontrollierte technische Steuerungen und automatisch abgeleitete Daten.

GEO ist keine zusätzliche Metadaten-Disziplin. Für generative Suche gelten SEO-Grundlagen: indexierbare, technisch saubere Seiten und einzigartige, belegte, menschenorientierte Inhalte. Es gibt keine GEO-Titel, GEO-Descriptions, Prompt-Keywords oder besondere KI-Schemata.

## 2. Verbindliches natives Ghost-Feldset

Diese Felder müssen für jede Page im Ghost-Backend verfügbar sein. Sie werden je Page befüllt oder bewusst leer gelassen.

| Bereich | Feld | Regel |
|---|---|---|
| Inhalt | Titel | Pflicht; zugleich sichtbares H1 |
| Inhalt | URL / Slug | Pflicht; stabil und menschenlesbar |
| Inhalt | Autoren | Bei fachlichen Content-Seiten pflegen |
| Inhalt | Veröffentlichungsdatum | Ghost-Feld |
| Inhalt | Änderungsdatum | Ghost pflegt es automatisch |
| Inhalt | Custom Excerpt | Optional; Teaser, kein Ersatz für Meta Description |
| Inhalt | Feature Image | Optional |
| Inhalt | Feature-Image-Alt-Text | Pflicht, wenn ein Bild gesetzt ist |
| Inhalt | Feature-Image-Bildunterschrift | Optional |
| Inhalt | Tags | Optional; auch für interne Steuerung verwendbar |
| Zugriff | Sichtbarkeit | Bewusste Entscheidung; nicht öffentliche Pages sind keine SEO-Ziele |
| SEO | Meta Title | Bei wichtigen indexierbaren Pages pflegen |
| SEO | Meta Description | Bei wichtigen indexierbaren Pages pflegen |
| SEO | Canonical URL | Leer lassen, außer bei echter Dublette oder Syndizierung |
| Social | Open-Graph Title | Optional |
| Social | Open-Graph Description | Optional |
| Social | Open-Graph Image | Optional |
| Social | X Title | Optional |
| Social | X Description | Optional |
| Social | X Image | Optional |

## 3. Kontrollierte technische Steuerungen

Ghost bietet diese Steuerungen nicht als eigene Page-Eingabefelder. Sie werden ausschließlich über interne Tags umgesetzt, damit sie für jede Page im Backend verfügbar bleiben und vom Theme einheitlich ausgewertet werden.

| Steuerung | Standard | Interner Tag | Wirkung |
|---|---|---|---|
| Indexierung | `index` | `#seo-noindex` | setzt `noindex` |
| Snippet | erlaubt | `#seo-nosnippet` | setzt `nosnippet` |
| Schema-Profil | `WebPage` | genau einer von `#schema-article`, `#schema-about`, `#schema-contact`, `#schema-profile`, `#schema-collection` | wählt den passenden JSON-LD-Typ |

Es darf höchstens ein `#schema-*`-Tag auf einer Page geben. Fehlt ein solcher Tag, erzeugt das Theme `WebPage`.

Page-Head-Code-Injection bleibt als technischer Ausnahmeweg verfügbar. Sie ist kein reguläres SEO-/GEO-Feld und darf nur für geprüfte Einzelfälle verwendet werden.

## 4. Automatisch abgeleitete Daten

Das Theme erzeugt diese Daten aus dem Feldset; sie werden nicht separat pro Page gepflegt:

- `headline` aus Titel
- `description` aus Meta Description, sonst Custom Excerpt
- `image` aus Feature Image
- `author` aus Ghost-Autor
- `datePublished` und `dateModified` aus Ghost
- `mainEntityOfPage` aus der Page-URL
- `publisher`, Logo, Sprache und Website-Identität aus globalen Site-Settings; `sameAs` nur, wenn künftig eine vollständige, verwendbare URL aus einer Site-Einstellung vorliegt
- Canonical-, Open-Graph- und X-Fallbacks aus Ghost

Strukturierte Daten müssen stets dem sichtbaren Inhalt entsprechen.

## 5. Nicht Teil des Feldvertrags

Folgende Felder oder Praktiken werden nicht eingeführt:

- Meta Keywords
- GEO Title, GEO Description, Prompt Keywords oder LLM Keywords
- `llms.txt` als SEO-/GEO-Maßnahme
- pauschales `FAQPage`- oder `HowTo`-Schema
- manuelle Datumsfelder neben Ghosts Veröffentlichungs- und Änderungsdatum
- manuelle Publisher-, Organisations- oder Sprachfelder pro Page
- pauschale Freigabe von Trainings-Crawlern

`OAI-SearchBot` für ChatGPT-Suche und `GPTBot` für mögliches Training sind getrennte Infrastrukturentscheidungen und keine Page-Felder.

## 6. Verbindliche Umsetzungsregeln für das Theme

- Ghost-System-Metadaten werden genau einmal ausgegeben.
- Jede Page gibt ihr gewähltes Schema-Profil als valides JSON-LD aus.
- Der Standard ist `WebPage`; `Article` ist nur für tiefe fachliche Content-Seiten bestimmt.
- FAQ-Inhalte dürfen sichtbar verwendet werden. Sie erhalten nicht automatisch `FAQPage`-Schema.
- Breadcrumb-Markup wird nur für eine tatsächlich sichtbare und inhaltlich begründete Hierarchie ausgegeben.
- Vor Auslieferung werden gerenderter Head, JSON-LD und Robots-Direktiven je mit einer Beispiel-Page geprüft.

## 7. Quellenstand

Stand der externen Recherche: 2026-07-21. Maßgeblich sind die aktuellen Herstellerdokumentationen von Google, OpenAI und Ghost. Google behandelt Optimierung für generative Suche als SEO und verlangt weder spezielle KI-Dateien noch besonderes GEO-Schema. ChatGPT-Suche verwendet `OAI-SearchBot`; Trainingssteuerung erfolgt getrennt über `GPTBot`.
