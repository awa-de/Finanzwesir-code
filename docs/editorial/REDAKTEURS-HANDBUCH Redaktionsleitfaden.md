# Redakteurs-Handbuch: Redaktionsleitfaden

| Feld         | Wert                                    |
|--------------|-----------------------------------------|
| Version      | 1.0.0                                   |
| Datum        | 2026-02-25                              |
| Status       | Entwurf                                 |
| Zielgruppe   | Redakteur / Autor (kein Entwicklerwissen nötig) |
| Ergänzt      | REDAKTEURS-HANDBUCH Chart-Integration   |

---

## Was dieses Dokument ist

Regeln und Checklisten für das Schreiben, Strukturieren und Pflegen von
Artikeln im Finanzwesir-2.0-Blog (Ghost CMS). Alles, was vor, während und
nach dem Publizieren redaktionell zu beachten ist.

**Nicht** in diesem Dokument: Chart-Einbindung (CSV, HTML-Snippet, Optionen).
Dafür gibt es das separate
[REDAKTEURS-HANDBUCH Chart-Integration](REDAKTEURS-HANDBUCH%20Chart-Integration.md).

---

## 1. URL-Strategie (Slugs)

Ghost verwendet eine **flache URL-Struktur**: `finanzwesir.com/slug`.

### Slug-Regeln

| Regel                        | Beispiel gut                        | Beispiel schlecht          |
|------------------------------|-------------------------------------|----------------------------|
| 3-6 Wörter, Keyword-Phrase  | `etf-sparplan-kosten-vergleich`     | `post-42`                  |
| Deutsch, Bindestriche        | `anleihen-etf-risiko`               | `anleihen_etf_risiko`      |
| Kein Datum im Slug           | `geldanlage-anfaenger`              | `2026-02-geldanlage`       |
| Keine Füllwörter             | `etf-portfolio-aufbauen`            | `wie-man-ein-etf-portfolio-aufbaut` |

**Warum kein Datum?** Evergreen-Artikel werden regelmäßig aktualisiert. Ein
Datum im Slug suggeriert Veralterung und verhindert, dass Suchmaschinen den
Inhalt als aktuell werten.

### Wo einstellen?

Ghost Admin → Artikel → Sidebar (Zahnrad) → **Post URL**. Ghost generiert
automatisch einen Slug aus dem Titel. Diesen manuell auf die Keyword-Phrase
kürzen.

---

## 2. FAQ-Block

Jeden Artikel mit einer FAQ-Sektion am Ende abschließen.

### Warum?

25,37 % aller KI-Zitate (ChatGPT, Perplexity, Gemini) entfallen auf
Listicle- und FAQ-Formate. Ein FAQ-Block erhöht die Wahrscheinlichkeit,
dass der Artikel in KI-Antworten zitiert wird.

### Umsetzung

- **4-6 Fragen** pro Artikel
- Fragen als H3 (`###`) formatieren
- Antworten: 2-4 Sätze, direkt und konkret
- Fragen so formulieren, wie ein Leser sie in eine Suchmaschine tippen würde

### Beispiel

```markdown
## Häufige Fragen

### Was kostet ein ETF-Sparplan?
Die meisten Neobroker bieten kostenlose Sparpläne ab 25 Euro Monatsrate.
Bei Direktbanken fallen 1,50-1,75 % pro Ausführung an.

### Ab welchem Betrag lohnt sich ein ETF?
Ab 25 Euro monatlich. Die Gebühren sind prozentual, nicht absolut —
der Betrag spielt für die Kostenquote keine Rolle.
```

### FAQ-Schema

Für jeden Artikel mit FAQ-Block wird ein FAQPage-Schema-Snippet über
Ghost Admin → Post → Code Injection eingefügt. Das Snippet-Format ist
in der GHOST-SETUP-Dokumentation beschrieben (GHOST-5).

---

## 3. Content-Struktur

Jeder Artikel folgt dieser Struktur:

### Pflicht-Elemente

| Element                     | Anforderung                                              |
|-----------------------------|----------------------------------------------------------|
| **H1 (Titel)**             | Keyword-stärkstes Heading. Genau ein H1 pro Artikel.     |
| **H2 (Abschnitte)**        | Jeder H2 beantwortet eine eigenständige Frage.           |
| **Tabelle oder Liste**     | Mindestens 1 pro Artikel (Vergleich, Aufzählung, Daten). |
| **FAQ-Sektion**            | Am Ende, 4-6 Fragen (siehe Abschnitt 2).                |
| **Quellenlinks**           | Primärquellen verlinken (Studien, BaFin, Bundesbank).    |
| **Lesezeit**               | Ziel: > 5 Minuten (`reading_time`). Qualitätssignal.    |

### Heading-Hierarchie

```
# ETF-Sparplan: Kosten, Anbieter und Strategie im Vergleich   ← H1
## Was kostet ein ETF-Sparplan?                                 ← H2
### Neobroker vs. Direktbank                                    ← H3
## Welcher ETF für Anfänger?                                    ← H2
## Häufige Fragen                                               ← H2
### Wie sicher sind ETFs?                                       ← H3 (FAQ)
```

Keine Ebene überspringen (H1 → H3 ohne H2 dazwischen).

### Quellenlinks

Auf Primärquellen verlinken, nicht auf andere Blogs:

- Studien (MSCI, Morningstar, Vanguard Research)
- Offizielle Seiten (BaFin, Bundesbank, EU-Verordnungen)
- Produktanbieter-Datenblätter (KIID/KID)

---

## 4. Autoren-Bio

Die Autoren-Bio erscheint automatisch auf der Autorenseite und unter jedem
Artikel (Schema.org `Person`-Markup).

### Wo einstellen?

Ghost Admin → Settings → Staff → Profil auswählen → **Bio**

### Anforderungen

- 3-5 Sätze
- Konkrete Expertise: Was kannst du? Seit wann? Womit?
- 1 externer Verweis (LinkedIn, XING oder persönliche Website)

### Beispiel

> Albert Warnecke beschäftigt sich seit 2011 mit passivem Investieren und
> hat den Finanzwesir-Blog gegründet. Er erklärt Geldanlage ohne
> Finanzjargon — mit Daten statt Meinungen. Sein Schwerpunkt: ETFs,
> Asset Allocation und die Psychologie des Sparens.
> [LinkedIn-Profil](https://linkedin.com/in/beispiel)

### Zusätzliche Profilfelder

| Feld       | Empfehlung                                |
|------------|-------------------------------------------|
| Name       | Vor- und Nachname (kein Pseudonym)        |
| Location   | Stadt oder Region                         |
| Website    | Persönliche Website oder LinkedIn-Profil  |
| Profilbild | Echtes Foto, quadratisch, min. 400x400 px |

---

## 5. About-Seite

Statische Ghost-Seite unter `/about/`. Das Theme liefert automatisch
Schema.org `AboutPage`-Markup.

### Wo anlegen?

Ghost Admin → Pages → New Page → Titel: „Über mich" → URL: `about`

### Struktur

| Abschnitt                      | Inhalt                                          |
|--------------------------------|-------------------------------------------------|
| **Wer bist du?**               | 2-3 Sätze. Name, Hintergrund, Motivation.       |
| **Worum geht es hier?**       | 2-3 Sätze. Blog-Mission, Themenfeld.            |
| **Für wen?**                   | 1-2 Sätze. Zielgruppe.                          |
| **Warum vertrauen?**           | Belege: Erfahrung, Referenzen, Zahlen.          |

---

## 6. Impressum & Datenschutz

Zwei statische Ghost-Seiten. Beide im Footer verlinkt (automatisch durch
das Theme).

### Impressum (`/impressum/`)

Ghost Admin → Pages → New Page → Titel: „Impressum" → URL: `impressum`

**Pflichtangaben (TMG §5):**

- Vollständiger Name (bei Einzelunternehmer: Vor- + Nachname)
- Postanschrift (kein Postfach)
- E-Mail-Adresse
- Telefonnummer (oder alternatives Kontaktformular)
- USt-IdNr. (falls vorhanden)
- Verantwortlich für den Inhalt nach §18 Abs. 2 MStV

### Datenschutzerklärung (`/datenschutz/`)

Ghost Admin → Pages → New Page → Titel: „Datenschutzerklärung" → URL: `datenschutz`

**Mindestinhalte (DSGVO Art. 13/14):**

- Name und Kontaktdaten des Verantwortlichen
- Zweck und Rechtsgrundlage der Datenverarbeitung
- Empfänger / Kategorien von Empfängern
- Speicherdauer
- Betroffenenrechte (Auskunft, Löschung, Widerspruch)
- Beschwerderecht bei der Aufsichtsbehörde

**Clicky-Analytics dokumentieren:**

Der Blog verwendet Clicky (clicky.com) zur Webanalyse. In der
Datenschutzerklärung aufführen:

- Dienst: Clicky Web Analytics
- Anbieter: Roxr Software Ltd
- Zweck: Anonymisierte Besucherstatistik
- Datenverarbeitung: IP-Anonymisierung aktiviert
- Opt-Out-Möglichkeit verlinken

### Indexierung

Beide Seiten müssen indexierbar bleiben. In Ghost Admin → Page → Sidebar →
**Meta data**: Kein „noindex" setzen. Google erwartet, dass Impressum und
Datenschutz auffindbar sind.

---

## 7. dateModified pflegen

Ghost setzt `updated_at` automatisch, wenn ein Artikel gespeichert wird.
Das Theme gibt dieses Datum als `dateModified` im JSON-LD
(`BlogPosting`-Schema) aus. Suchmaschinen und KI-Systeme nutzen dieses
Signal, um aktuelle Inhalte zu bevorzugen.

### Wann aktualisieren?

- Zahlen, Statistiken oder Gebühren haben sich geändert
- Links sind veraltet oder gebrochen
- Neue relevante Produkte oder Anbieter
- Gesetzesänderungen (z.B. Steuerrecht, DSGVO-Updates)

### Wie aktualisieren?

1. Artikel in Ghost Admin öffnen
2. Inhaltliche Änderung vornehmen (Statistik aktualisieren, Link ersetzen,
   Absatz ergänzen)
3. Speichern → Ghost aktualisiert `updated_at` automatisch

**Nicht** einfach nur ein Leerzeichen einfügen und speichern. Die Änderung
muss inhaltlich sein.

### Evergreen-Artikel kennzeichnen

Bei Artikeln, die regelmäßig aktualisiert werden: Jahreszahl im Titel
oder H1 einfügen.

| Vorher                        | Nachher                              |
|-------------------------------|--------------------------------------|
| ETF-Sparplan Kosten Vergleich | ETF-Sparplan Kosten Vergleich [2026] |

Die Jahreszahl signalisiert dem Leser und der Suchmaschine: „Dieser Artikel
wird gepflegt."

---

## 8. VG-Wort Nachmeldung

Jeder veröffentlichte Artikel mit mehr als 1.800 Zeichen wird bei der
VG Wort gemeldet.

### Voraussetzungen

- VG-Wort-Wahrnehmungsvertrag abgeschlossen
- Zugang zu T.O.M. (Texte Online Melden): https://tom.vgwort.de

### Workflow pro Artikel

1. **Zählpixel einbauen:** Das VG-Wort-Zählpixel wird über Ghost Admin →
   Post → Code Injection eingefügt (siehe GHOST-SETUP, GHOST-2/GHOST-3).

2. **In T.O.M. melden:**
   - Einloggen auf https://tom.vgwort.de
   - „Texte melden" → „Online-Text"
   - Pflichtfelder ausfüllen:

| Feld          | Wert                                           |
|---------------|-------------------------------------------------|
| Titel         | Artikel-Titel                                  |
| Autor         | Vor- und Nachname                              |
| URL           | Vollständige URL des Artikels                  |
| Zeichenzahl   | Mindestens 1.800 (inkl. Leerzeichen)           |

3. **Zeichenzahl prüfen:** In Ghost Admin → Artikel → Sidebar zeigt Ghost
   die Wortanzahl. Faustregel: 300 Wörter ~ 1.800 Zeichen. Im Zweifel den
   Text in ein Zeichenzähl-Tool kopieren.

### Nachmeldung bestehender Artikel

Für die ~200 bestehenden Artikel:

1. Prüfen, ob bereits ein Zählpixel eingebaut ist
2. Falls nicht: Neues Pixel über Ghost Admin → Code Injection einfügen
3. In T.O.M. nachmelden
4. Systematisch abarbeiten (z.B. 10 Artikel pro Tag)

---

## Checkliste: Vor Veröffentlichung eines Artikels

- [ ] **Slug** manuell gesetzt (3-6 Wörter, Keyword-Phrase, kein Datum)
- [ ] **H1** enthält das stärkste Keyword
- [ ] **H2-Struktur** korrekt (keine übersprungenen Ebenen)
- [ ] Mindestens **1 Tabelle oder geordnete Liste** im Artikel
- [ ] **FAQ-Sektion** am Ende (4-6 Fragen als H3)
- [ ] **Quellenlinks** auf Primärquellen gesetzt
- [ ] **Lesezeit** > 5 Minuten (Ghost zeigt `reading_time` in der Sidebar)
- [ ] **VG-Wort-Zählpixel** in Code Injection eingefügt
- [ ] **FAQ-Schema-Snippet** in Code Injection eingefügt (falls FAQ vorhanden)
- [ ] **Feature Image** gesetzt (wird für OG/Twitter Cards verwendet)
- [ ] **Meta Description** geschrieben (Ghost → Sidebar → Meta data, 150-160 Zeichen)
- [ ] **Excerpt** geschrieben (Ghost → Sidebar → Excerpt, 2-3 Sätze)

### Bei Artikel-Updates zusätzlich

- [ ] Inhaltliche Änderung vorgenommen (nicht nur Leerzeichen)
- [ ] Jahreszahl im Titel aktualisiert (falls Evergreen-Artikel)
- [ ] `updated_at` durch Speichern aktualisiert
- [ ] In T.O.M. überprüft (falls Zeichenzahl sich geändert hat)
