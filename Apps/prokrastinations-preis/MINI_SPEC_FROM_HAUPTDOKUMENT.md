# MINI_SPEC_FROM_HAUPTDOKUMENT — Marktzeit schlägt Timing / Lieber heute als morgen

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md` + `aktuelles Projekt/04_ZUSATZTEXT_B1_REWRITE_MARKTZEIT.md`
> Status: Historisch — abgeleitet aus Planungsphase Mai 2026. Bei Widerspruch gilt `APP_SPEC.md` V2.9.
> Letzte Änderung: 2026-06-16 — Screen-Flow an Stationen-Zeitreise angepasst (AP-08)

---

## B1 – Marktzeit schlägt Timing / Lieber heute als morgen

**Slug:** `prokrastinations-preis`
**Funnel-Position:** Marktzeit statt Timing
**Modulrolle:** Haupt-App im Marktzeit-Block

---

## Steuerungsblock: Zweck, Barriere, Prüfregeln

<!-- Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md / Seed prokrastinations-preis -->
<!-- Mechanisch eingefügt. Nicht frei formulieren. -->

**Rolle:** B1 — Marktzeit-Entscheidungspunkt / geführte Stationen-Zeitreise  

**Diese App existiert, um:**  
aus Bedauern über das verpasste Gestern eine Entscheidung für das verfügbare Heute zu machen.

**Zu entfernende psychologische Barriere:**  
Die Rückblick-Illusion: Im Nachhinein wirkt ein guter Einstiegszeitpunkt logisch und erkennbar; in Echtzeit fühlt er sich aber unsicher, unfertig und falsch an.

**Falscher Glaubenssatz vorher:**  
„Ein guter Einstiegszeitpunkt müsste sich heute so klar anfühlen, wie er im Rückblick aussieht.“

**Zielzustand nach der App:**  
„Rückblick täuscht. Heute fühlt sich nicht wie der richtige Zeitpunkt an — aber genau so fühlte es sich damals auch an. Ich kann nicht mit Endwissen starten, aber ich kann heute anfangen.“

**Kernsatz der App:**  
„Im Rückblick sieht Mut aus wie Logik. In Echtzeit war es eine Entscheidung.“

**Ton / Haltung:**  
Kölsches-Grundgesetz-Haltung: realistischer Fatalismus plus Optimismus. Nicht: „Alles wird gut.“ Sondern: „Et kütt wie et kütt — und trotzdem ist Anfangen besser als auf Gewissheit zu warten.“

**Muss-Kriterien für jede Umsetzung:**  
- Die App ist eine geführte historische Stationen-Zeitreise, kein Verlustzähler.
- Screen 2 zeigt nur Wissen aus damaliger Perspektive; kein vollständiger Chart, keine finalen KPIs, kein Endwissen.
- Screen 3 ist der erste vollständige Reveal: erst dort darf der Rückblick logisch wirken.
- Screen 4 überträgt die Einsicht auf heute: Auch heute beginnt wieder ein Chart, dessen Ende niemand kennt.
- Echte historische Daten und echte Stationen; keine Prognose und keine erfundene Dramatisierung.
- Ton ruhig, entlastend, fatalistisch-optimistisch; nicht beschämend.

**Nicht-Ziele / harte Verbote:**  
- Kein moralischer Strafzettel, kein Verlustzähler-Ton als Hauptmechanik.
- Kein Countdown, keine Fake-Urgency, keine Scham, keine rote Panikcodierung.
- Keine Zukunftsprognose, keine glatte Zukunftskurve, keine Zahlenversprechen.
- Kein historischer Epochen-Fächer; das gehört zu `geburtsjahrlos`.
- Keine Kohortenanalyse.
- Keine Produktempfehlung.

---

Dieser Prüfscore ist **kein app-spezifischer Inhalt**, sondern ein verbindliches Standard-Gate für jede spätere Änderung an einer App.

Er wird bei der späteren Verteilung in jeden lokalen Steuerungsblock übernommen und dort **unverändert** verwendet.

**LLM-Prüfscore pro Änderung:**

Bewerte vor der Umsetzung von 0–2:

1. **Barriere-Abbau:** Entfernt die Änderung die definierte psychologische Hürde?
2. **Zielzustand:** Führt die Änderung zum gewünschten Nutzerzustand?
3. **Nicht-Ziele:** Vermeidet die Änderung alle verbotenen Drifts?
4. **Mentorrolle:** Stärkt die Änderung die Rolle dieser App in der Heldenreise?

**Score-Regel:**

- **8/8** = umsetzen
- **6–7/8** = nur umsetzen, wenn `Nicht-Ziele = 2/2`
- **≤5/8** = nicht umsetzen
- **jede Nicht-Ziel-Verletzung** = stoppen

**Wichtig:**

- Punkt 3 ist ein KO-Kriterium.
- Eine Änderung mit `Nicht-Ziele < 2/2` darf nicht umgesetzt werden, auch wenn der Gesamtscore hoch wirkt.
- Der Score ersetzt nicht den Steuerungsblock, sondern zwingt das LLM, jede Änderung gegen Barriere, Zielzustand, Nicht-Ziele und Heldenreise-Rolle zu prüfen.
- Bei Unsicherheit: nicht umsetzen, sondern Klärungsbedarf markieren.

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

### Screen 2 — Stationen-Zeitreise (ohne Endwissen)

Screen 2 ist kein vollständiger Chart-Reveal. Der Chart wächst Station für Station.

- Nur Teilansicht des Charts bis zur aktuellen Station sichtbar.
- Keine finalen KPI-Cards. Keine vollständige Sparplan-Strecke.
- Jede Station: Stationstext (Datum, Headline, Anleger-Anker).
- Nutzer klickt `Weiter investiert bleiben` zur nächsten Station.
- Mobil: Collapsible `Zwischenstand anzeigen` → Eingezahlt + Depotwert damals.

Microcopy:

> „Das wäre kein gerader Weg gewesen. Aber es wäre Marktzeit gewesen."

→ Führende Quelle: `APP_SPEC.md` V2.9 §16.1–§16.4

### Screen 3 — Erster vollständiger Reveal

Screen 3 ist der erste Moment, in dem der Nutzer das vollständige Bild sieht.

- Erstmals vollständiger 120-Monate-Chart sichtbar.
- Entscheidungspunkt-Marker: VertikaleLinie beim letzten Datenpunkt.
- Finale KPI-Cards: eingezahlt, Depotwert heute, Differenz.
- AssumptionsBox (historische Basis, kein Zukunftsversprechen).

Text:

> „Vor 10 Jahren ist weg. Heute nicht."

→ Führende Quelle: `APP_SPEC.md` V2.9 §16.1–§16.4

### Screen 4 — Nicht weiter warten

Keine Zukunftsprognose als glatte Kurve.

Kernaussage:

> ~~„Wenn du jetzt wieder wartest, wird heute in zehn Jahren wieder der verpasste Zeitpunkt sein."~~ *(historischer Planungsentwurf — zu druckvoll; verbindliche Microcopy in `APP_SPEC.md` V2.9 §23.16)*

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

Aktive Kandidaten laut `APP_SPEC.md` V2.9 §21:

> „Heute Marktzeit sammeln"

> „Meine nächsten 10 Jahre starten"

Final redaktionell offen — keine Entscheidung in dieser Datei. Maßgebend ist `APP_SPEC.md` §21.

*(„Ich starte jetzt" ist nicht mehr aktiv — entschieden E-04)*

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
- Status: Historisch — bei Widerspruch gilt `APP_SPEC.md` V2.9
