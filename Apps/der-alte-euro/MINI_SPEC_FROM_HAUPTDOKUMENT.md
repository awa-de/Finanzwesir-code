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

## Steuerungsblock: Zweck, Barriere, Prüfregeln

<!-- Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md / Seed der-alte-euro -->
<!-- Mechanisch eingefügt. Nicht frei formulieren. -->

**Rolle:** B4 — Mechanik der Marktzeit / Zinseszins sichtbar machen  

**Diese App existiert, um:**  
zu zeigen, was Zeit im Inneren eines einzelnen investierten Euros bewirkt: Ein alter Euro arbeitet nicht allein, sondern mit seinen Erträgen und den Erträgen auf frühere Erträge.

**Zu entfernende psychologische Barriere:**  
„Früh anfangen“ klingt wie moralische Mahnung; der Nutzer sieht nicht, warum frühes Geld strukturell anders arbeitet.

**Falscher Glaubenssatz vorher:**  
„Ein Euro bleibt im Kern ein Euro, nur mit etwas Rendite obendrauf.“

**Zielzustand nach der App:**  
„Ich sehe: Zeit macht aus einem Euro ein kleines Team. Der ursprüngliche Euro wird relativ kleiner, seine Ertragsfamilie größer.“

**Muss-Kriterien für jede Umsetzung:**  
- Ein Euro wird über 10, 20, 30 und 40 Jahre gezeigt.
- Gestapelte Balken trennen ursprünglichen Euro, Ertrag auf den Euro und Ertrag auf frühere Erträge.
- Nur wenige Renditeannahmen, keine freie Parameterorgie.
- Zinseszins wird gezeigt, nicht theoretisch erklärt.

**Nicht-Ziele / harte Verbote:**  
- Kein Heute-vs.-Später-Vergleich.
- Keine Opportunitätskosten.
- Keine historische MSCI-World-Simulation.
- Keine Sparrate, kein Depot, kein Einkommen.
- Keine ETF-Produktentscheidung.
- Keine Thesaurierer-vs.-Ausschütter-Debatte.

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
