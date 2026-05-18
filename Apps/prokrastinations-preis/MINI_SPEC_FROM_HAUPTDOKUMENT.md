# MINI_SPEC_FROM_HAUPTDOKUMENT — Marktzeit schlägt Timing / Lieber heute als morgen

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md` + `aktuelles Projekt/04_ZUSATZTEXT_B1_REWRITE_MARKTZEIT.md`
> Status: Roh-Mini-Spec, noch nicht APP_SPEC
> Letzte Änderung: 2026-05-18 — B1 von Verlustzähler zu Marktzeit-App umgerahmt

---

## B1 – Marktzeit schlägt Timing / Lieber heute als morgen

**Slug:** `prokrastinations-preis`
**Funnel-Position:** Marktzeit statt Timing
**Modulrolle:** Haupt-App im Marktzeit-Block

---

## Problem, das gelöst wird

Viele Anleger denken:

> „Vor zehn Jahren hätte es sich gelohnt. Jetzt ist der Zug abgefahren."

Oder:

> „Ich warte noch. Vielleicht wird es günstiger."

B1 zeigt: Der verpasste Startpunkt ist weg. Aber heute ist noch da.

---

## Kernbotschaft

> „Du kannst nicht mehr vor 10 Jahren starten. Aber du kannst verhindern, dass heute in 10 Jahren wieder ‚vor 10 Jahren' heißt."

Kurzform:

> „Warten nimmt dir Marktzeit."

Das ist die verständliche Finanzwesir-Version von:

> „Time in the market beats timing the market."

---

## Neue Rolle

B1 ist die Marktzeit-App. Die App macht den Satz erlebbar:

> „Der beste Zeitpunkt zu investieren war vor 10 Jahren. Der zweitbeste ist heute."

Nicht als glatte Renditeprojektion und nicht als moralischer Strafzettel.

---

## Datenlogik

B1 arbeitet mit echten MSCI-World-Monatsdaten.

- letzter verfügbarer Monatswert = „heute"
- Startpunkt = 120 Monate vorher
- monatliche Sparrate
- Monatsdaten, keine Tagesdaten
- keine glatte 6–8-%-Zukunftsprojektion
- keine monotone Modellkurve

Warum: Die App braucht echte Einbrüche. Eine monotone Modellkurve wäre dramaturgisch und fachlich falsch.

---

## Interaktion (UX-Flow)

### Screen 1 — Frage

Headline:

> „Vor 10 Jahren wäre besser gewesen. Was ist mit heute?"

Subline:

> „Wir rechnen nicht mit Wunschwerten. Wir nehmen echte MSCI-World-Monatsdaten."

Eingabe:

- monatliche Sparrate
- optional Startbetrag
- Zeitraum fix: 10 Jahre

### Screen 2 — Echte Vergangenheit

Visual: Vor 10 Jahren gestartet → heute

Die App zeigt eine echte historische Sparplanstrecke.

Dazu:

- eingezahlt
- heutiger Depotwert
- Gewinn/Verlust gegenüber Einzahlung

Microcopy:

> „Das wäre kein gerader Weg gewesen. Aber es wäre Marktzeit gewesen."

### Screen 3 — Heute als Entscheidungspunkt

Die Vergangenheit endet bei heute. Heute wird als vertikale Linie markiert.

Text:

> „Vor 10 Jahren ist weg. Heute nicht."

### Screen 4 — Nicht weiter warten

Keine Zukunftsprognose als glatte Kurve.

Kernaussage:

> „Wenn du jetzt wieder wartest, wird heute in zehn Jahren wieder der verpasste Zeitpunkt sein."

---

## Was die App nicht tut

- keine rollierenden 30-Jahres-Zeiträume
- keine Geburtsjahr-/Kohortenanalyse
- kein historischer Fächer wie B2
- keine glatte Zukunftsprojektion
- kein Strafzettel-Verlustzähler als Hauptton
- kein Kindersparplan
- keine Renditedebatte
- keinen animierten Countdown als Hauptmechanik

---

## Abgrenzung zu B2

B1 beantwortet:

> „Was mache ich mit dem verpassten Gestern und dem verfügbaren Heute?"

B2 beantwortet:

> „Wie unterschiedlich liefen 30 Jahre ETF-Sparen je nach Börsenepoche?"

B1 ist die Entscheidungspunkt-/Marktzeit-App.
B2 ist die Kohorten-/Epochen-App.

---

## CTA

> „Heute Marktzeit sammeln"

oder:

> „Ich starte jetzt"

---

## Implementierungshinweise

- Historische MSCI-World-Monatsdaten lokal/statisch
- Kein Backend
- Kein Tagesdatenrauschen
- Keine modellierte Zukunftskurve
- Fokus auf echte 10-Jahres-Vergangenheit und heutigen Entscheidungspunkt

---

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md` + `aktuelles Projekt/04_ZUSATZTEXT_B1_REWRITE_MARKTZEIT.md`
- Block: B – Marktzeit statt Timing
- App-ID: B1
- App-Titel: Marktzeit schlägt Timing / Lieber heute als morgen
- Slug laut Hauptdokument: `prokrastinations-preis`
- Zugeordneter App-Ordner: `/Apps/prokrastinations-preis/`
- Modulrolle: Haupt-App
- Status: Roh-Mini-Spec, noch nicht APP_SPEC
