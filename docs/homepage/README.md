# Homepage-Werkstatt

Diese Mappe ist die zentrale Arbeitsumgebung für die neue Finanzwesir-Homepage.

Die Homepage ist **kein Blog, kein Portal und keine statische Artikelübersicht**. Sie ist ein psychologischer Funnel: Der Nutzer kommt mit Interesse, Angst, Halbwissen und Ausreden hinein und soll die Seite mit einem einfachen, robusten Startplan verlassen.

## Markenanker

Der Finanzwesir-Claim lautet:

> **Finanzen geregelt – Freiräume geschaffen**

Wichtig für die Dramaturgie:

> Der Claim ist der Nordstern, nicht der Köder.

Das bedeutet: Der Claim führt die Architektur der Homepage, wird aber nicht als große Hero-Werbebotschaft verheizt. Der Hero spiegelt zuerst die Blockade des Nutzers. Am Ende wird der Claim als verdienter Zielzustand eingelöst.

```text
Komplexität zerstören
↓
Finanzen geregelt
↓
Freiräume geschaffen
```

Investieren ist der konkrete erste Schritt. Der größere Markennutzen ist: Der Nutzer bekommt seine Finanzen so weit geregelt, dass mentale, zeitliche und finanzielle Freiräume entstehen.

## Leitidee

Nicht mehr:

> Passiv investieren. Finanziell frei werden.

Sondern stärker im Finanzwesir-Ton:

> So geht das mit deinem Geld nicht weiter.  
> Du weißt das schon.  
> Die Frage ist, warum du trotzdem noch wartest.

## Arbeitsziel dieser Mappe

Hier werden alle konzeptionellen, redaktionellen und dramaturgischen Entscheidungen gesammelt, bis daraus eine lokal testbare statische HTML-Seite entsteht.

Die spätere Zerlegung in ein Ghost.io-Template ist **nicht Teil dieser Werkstattphase**. Ghost kommt erst danach.

## Zielzustand der aktuellen Phase

Fertig bedeutet hier:

> Eine vollständige statische HTML-Datei, die lokal im Browser geöffnet und so erlebt werden kann, wie der Nutzer die Homepage später sehen soll.

Nicht Teil dieser Phase:

- Ghost-Template-Zerlegung
- Handlebars-Partials
- Ghost-Routing
- produktives Deployment
- finale App-Implementierung, sofern Apps noch nicht fertig sind

## Ordnerstruktur

```text
docs/homepage/
  README.md
  DATEIEN-MANIFEST.md
  00-master-synthese-peer-reviews.md
  01-positionierung-und-zielbild.md
  01a-markenclaim-integration.md
  01b-claim-synthese-v2-einarbeitung.md
  02-psychologischer-funnel-konzept.md
  03-funnel-architektur.md
  04-stationen-und-app-mapping.md
  05-peer-reviews/
  06-uebergangstexte-und-microcopy.md
  06a-claim-orientierte-microcopy-ergaenzung.md
  07-entscheidungslog.md
  08-kochrezept-bis-zur-statischen-html-seite.md
  09-erste-html-version/
  10-app-spezifikationen/
  11-arbeitsmaterial/
  build/homepage-static/
```

## Welche Datei wofür?

### Master- und Konzeptdateien

- `00-master-synthese-peer-reviews.md` — aktuelle Master-Synthese aus den Peer Reviews.
- `01-positionierung-und-zielbild.md` — verbindliche Kurzpositionierung der Homepage.
- `01a-markenclaim-integration.md` — erste Claim-Integration: Claim als strategische Klammer.
- `01b-claim-synthese-v2-einarbeitung.md` — präzisierte Claim-Entscheidung: Claim als Zielzustand, nicht als Hero-Köder.
- `02-psychologischer-funnel-konzept.md` — ausführliches Grundkonzept.
- `03-funnel-architektur.md` — Zielreihenfolge der Homepage.
- `04-stationen-und-app-mapping.md` — Zuordnung von Blockaden, Stationen und Apps.

### Text- und Umsetzungsdateien

- `06-uebergangstexte-und-microcopy.md` — zentrale Textwerkstatt für die Stationen.
- `06a-claim-orientierte-microcopy-ergaenzung.md` — claim-orientierte Ergänzungen und Formulierungen.
- `07-entscheidungslog.md` — dokumentiert wichtige Entscheidungen.
- `08-kochrezept-bis-zur-statischen-html-seite.md` — Checkliste bis zur lokal testbaren HTML-Datei.

### Referenz und Archiv

- `05-peer-reviews/` — Peer Reviews und externe Analysen.
- `09-erste-html-version/` — alter statischer HTML-Prototyp v12 als Referenz, nicht als Zielarchitektur.
- `10-app-spezifikationen/` — Arbeitsdateien für die acht Funnel-Apps.
- `11-arbeitsmaterial/` — alte Zwischenstände, Notizen und Material.
- `build/homepage-static/` — Zielordner für spätere lokale HTML-Artefakte.

## Aktuelle Masterentscheidung

Die Homepage wird als lineare Reise gebaut:

```text
Hero / Spiegel
↓
Market-Timing-Simulator
↓
Crash-Reaktions-Test
↓
Diversifikations-Detektor
↓
Dunkelster Punkt
↓
Einfachheits-App
↓
ETF-Ära-App
↓
Regulatorik-App
↓
Risiko-Übersetzer
↓
Plan-Generator
↓
Claim-Einlösung: Finanzen geregelt – Freiräume geschaffen
```

## Prüffragen für jede neue Idee

1. Welche Blockade zerstört das?
2. Was fühlt der Nutzer danach anders?
3. Führt es zur nächsten Station?
4. Zahlt es auf „Finanzen geregelt – Freiräume geschaffen“ ein?
5. Wird der Claim verdient — oder nur behauptet?

Wenn eine Idee diese Fragen nicht besteht, gehört sie nicht in den Hauptpfad.
