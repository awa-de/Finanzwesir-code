# MINI_SPEC_FROM_HAUPTDOKUMENT — Der alte Euro

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC
> Letzte Änderung: 2026-05-18 — Von F? zu B4 verschoben; Block B „Marktzeit statt Timing"

---

## B4 – Der alte Euro

**Slug:** `der-alte-euro`
**Funnel-Position:** Marktzeit statt Timing / Mechanik der Marktzeit
**Modulrolle:** Mechanik-Mini-App
**App-Familie:** Calculator-Visualisierung / Mechanik-Mini-App

---

## Problem, das gelöst wird

„Früh anfangen" klingt wie eine moralische Mahnung. Diese App zeigt, warum frühes Geld tatsächlich mächtiger wird: Nicht der eine Euro wird magisch größer, sondern seine Erträge erzeugen wieder Erträge.

Die App beantwortet nicht:

> „Soll ich heute anfangen?"

Das ist Aufgabe von B1.

Sie beantwortet:

> „Was passiert mit einem einzigen Euro, wenn er lange genug arbeiten darf?"

---

## Kernbotschaft

> „Ein alter Euro arbeitet mit Familie."

Ausführlicher:

> „Ein früher Euro wird nicht größer, weil er besonders ist. Er wird größer, weil seine Erträge wieder Erträge erzeugen."

---

## Rolle im Block B

„Der alte Euro" zeigt den Motor. Zeit baut im einzelnen Euro die Wirkung auf, die Block B insgesamt zeigt.

Rollenformel: **Zeit baut den Motor.**

Block-B-Kette:

```text
B1 Marktzeit schlägt Timing
→ Heute ist der einzige Startpunkt, den du noch hast.

B2 Geburtsjahrlos
→ Deine Börsenepoche ist ein Los.

B4 Der alte Euro
→ So arbeitet Zeit im einzelnen Euro.

B5 Depot-Kipppunkt
→ So wird daraus irgendwann ein Mitverdiener.
```

---

## Interaktion

Vier gestapelte Balken zeigen, was aus 1 € nach 10, 20, 30 und 40 Jahren wird.

Jeder Balken besteht aus drei Teilen:

1. ursprünglicher Euro
2. Ertrag auf den ursprünglichen Euro
3. Ertrag auf frühere Erträge

Die visuelle Aussage:

> Anfangs dominiert der ursprüngliche Euro. Später dominiert das, was seine Erträge wieder erwirtschaften.

---

## Eingabe

Nur eine Auswahl:

- 4 %
- 6 %
- 8 %

Keine freie Renditeeingabe.

Die Werte sind Anschauungswerte, keine Prognosen.

---

## UX-Kern

Headline-Vorschlag:

> „Was wird aus einem Euro?"

Subline-Vorschlag:

> „Ein früher Euro bleibt nicht allein. Er sammelt Ertrag — und dieser Ertrag sammelt wieder Ertrag."

Punchline-Vorschlag:

> „Der ursprüngliche Euro bleibt 1 €. Mächtig wird, was seine Erträge danach selbst erwirtschaften."

Alternativer Wesir-Satz:

> „Nach 40 Jahren ist der ursprüngliche Euro nicht der Held. Er ist der Großvater."

---

## Was die App nicht tut

- kein Heute-vs.-Später-Vergleich
- keine Opportunitätskosten
- keine historische MSCI-World-Simulation
- keine Sparrate
- kein Depot
- kein Einkommen
- keine Steuer
- keine Inflation
- keine ETF-Produktentscheidung
- keine Thesaurierer/Ausschütter-Diskussion
- keine Startjahr- oder Geburtsjahr-Analyse

---

## Abgrenzung

| App | Abgrenzung |
|---|---|
| B1 Marktzeit schlägt Timing | B1 zeigt den heutigen Entscheidungspunkt. „Der alte Euro" zeigt nur den inneren Motor eines einzelnen Euros. |
| B2 Geburtsjahrlos | B2 arbeitet historisch mit rollierenden 30-Jahres-Zeiträumen. „Der alte Euro" arbeitet modellhaft ohne Historie. |
| Depot-Kipppunkt | Depot-Kipppunkt personalisiert auf Einkommen und Depot. „Der alte Euro" bleibt abstrakt bei 1 €. |
| Thesaurierer vs. Ausschütter | Keine Produktmechanik, keine Ausschüttungen, keine Steuer. |

---

## CTA

> „Wann arbeitet dein Depot mit?"

Übergang zu Depot-Kipppunkt:

> „Ein einzelner alter Euro ist nett. Spannend wird es, wenn jeden Monat neue Euros dazukommen."

---

## Implementierungshinweise

- Reine JS-Berechnung möglich
- Kein Backend
- Keine historischen Daten
- Formelmodell reicht
- Fokus auf eine klare Visualisierung: vier gestapelte Balken

---

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: B – Marktzeit statt Timing
- App-ID: B4
- App-Titel: Der alte Euro
- Slug: `der-alte-euro`
- Zugeordneter App-Ordner: `/Apps/der-alte-euro/`
- Modulrolle: Mechanik-Mini-App
- Status: Roh-Mini-Spec, noch nicht APP_SPEC
