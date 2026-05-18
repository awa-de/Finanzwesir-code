# Zusatztext Mini-Spec — Depot-Kipppunkt

> Ziel: Dieser Text ist als Grundlage für `/Apps/depot-kipppunkt/MINI_SPEC_FROM_HAUPTDOKUMENT.md` gedacht.  
> Bitte bei Bedarf an die bestehende Dokumentstruktur anpassen, aber die fachliche Rolle nicht verändern.

---

# MINI_SPEC_FROM_HAUPTDOKUMENT — Depot-Kipppunkt

> Quelle: konzeptionelle Schärfung App-Fabrik / Finanzwesir  
> Status: Roh-Mini-Spec aus App-Intake, noch nicht APP_SPEC

---

## F?/H? – Depot-Kipppunkt

**Slug:** `depot-kipppunkt`  
**Funnel-Position:** Statuswechsel / nach „Der alte Euro“, vor Plan-Generator  
**Modulrolle:** Motivations- und Statuswechsel-App  
**App-Familie:** Calculator / Scenario-Chart

---

## Problem, das gelöst wird

Sparen fühlt sich für viele Menschen wie Konsumverzicht an. Diese App zeigt einen anderen Blick: Aus Sparen wird mit der Zeit eine zweite Einkommensquelle. Irgendwann kann das Depot rechnerisch mehr pro Jahr erwirtschaften als der heutige Job.

Die App beantwortet nicht:

> „Wie funktioniert Zinseszins?“

Das zeigt „Der alte Euro“.

Sie beantwortet:

> „Wann wird mein Depot vom Guthaben zum Mitverdiener?“

---

## Kernbotschaft

> „Irgendwann bringt dein Depot pro Jahr mehr ein als dein Job.“

Diese Formulierung ist zentral und soll nicht verwässert werden.

---

## Rolle im App-Universum

„Depot-Kipppunkt“ zeigt, wann der Motor das Auto zieht.

Die App steht nach „Der alte Euro“ und vor dem Plan-Generator oder als Übergang zum finalen Startplan.

Rollenformel:

```text
Der alte Euro
→ So arbeitet Zeit im einzelnen Euro.

Depot-Kipppunkt
→ Viele produktive Euros werden irgendwann ein Mitverdiener.
```

---

## Interaktion

Der Nutzer gibt vier Werte ein:

1. monatliches Nettoarbeitseinkommen
2. monatliche Sparrate
3. heutiger Depotwert
4. Renditeannahme: 4 %, 6 % oder 8 %

Die App zeigt:

- heutiges Job-Netto pro Jahr
- rechnerischen Depot-Ertrag pro Jahr
- Jahr des Kipppunkts
- Depotwert am Kipppunkt
- Fortschrittsmarken: 25 %, 50 %, 75 %, 100 % des heutigen Job-Netto

---

## Zentrale Visualisierung

Eine Linie zeigt das heutige Job-Netto pro Jahr als konstante Vergleichsgröße.

Eine zweite Linie zeigt den rechnerischen Depot-Ertrag pro Jahr.

Der Schnittpunkt ist der Depot-Kipppunkt.

Visualisierungskern:

```text
Job-Netto pro Jahr: konstant
Depot-Ertrag pro Jahr: wächst über Zeit
Schnittpunkt: Depot-Kipppunkt
```

---

## Ergebnisformulierung

Beispiel:

> „In Jahr 23 bringt dein Depot rechnerisch mehr Jahresertrag als dein heutiger Job.“

Darunter:

> „Bis dahin ist es längst kein stilles Guthaben mehr. Es arbeitet mit.“

---

## Transparenzsatz

Diese App braucht eine sichtbare Modellzeile:

> „Wir vergleichen dein heutiges Job-Netto mit dem rechnerischen Depot-Ertrag vor Steuern. Das ist keine Prognose, keine Steuerplanung und keine Rentenplanung, sondern eine Standortbestimmung.“

---

## Was die App nicht tut

- keine Finanzfreiheit berechnen
- keine Entnahmerate
- keine Steuerdetails
- keine Sozialabgaben
- keine Gehaltssteigerung
- keine Sparratendynamik
- keine Inflation
- keine historischen MSCI-Pfade
- keine Startverzögerung
- keine Renditedebatte
- keine Alternativenvergleiche
- kein „Wann kannst du aufhören zu arbeiten?“

Wichtig: Keine optionale zweite Ebene mit Sparratendynamik oder Steuerschätzung. Das öffnet Tür und Tor für Missverständnisse und Diskussionen. Version 1 bleibt radikal schlank.

---

## Abgrenzung

| App | Abgrenzung |
|---|---|
| B1 Marktzeit schlägt Timing | B1 behandelt Starten vs. Warten. Depot-Kipppunkt behandelt nicht Startverzögerung. |
| B2 Geburtsjahrlos | B2 zeigt historische 30-Jahres-Epochen. Depot-Kipppunkt ist eine persönliche Modellrechnung ohne Historie. |
| Der alte Euro | Der alte Euro zeigt den Mechanismus bei 1 €. Depot-Kipppunkt zeigt die persönliche Einkommensliga des Gesamtdepots. |
| G2 Rendite-Kalibrierung | G2 diskutiert niedrige künftige Renditen und Alternativen. Depot-Kipppunkt nutzt Rendite nur als Annahme. |
| G1 Regulatorik | G1 behandelt Steuer-/Regelrisiken. Depot-Kipppunkt macht keine Steuerplanung. |

---

## CTA

> „Startplan bauen“

Übergangssatz:

> „Der Kipppunkt entsteht nicht durch einen Zaubertrick. Er entsteht, weil viele alte Euros lange genug arbeiten.“

---

## Implementierungshinweise

- Reine JS-Berechnung möglich.
- Kein Backend.
- Keine historischen Daten.
- Formelmodell reicht.
- Fokus auf eine klare Visualisierung: Job-Netto-Linie vs. Depot-Ertragslinie.

---

## Mini-Spec-Metadaten

- Quelle: App-Intake / strategische Diskussion
- Block: Übergang F/H oder F – Mechanismen/Motivation
- App-Titel: Depot-Kipppunkt
- Slug: `depot-kipppunkt`
- Zugeordneter App-Ordner: `/Apps/depot-kipppunkt/`
- Modulrolle: Statuswechsel-App
- Status: Roh-Mini-Spec, noch nicht APP_SPEC
