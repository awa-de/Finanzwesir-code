# Spec-Review: `prokrastinations-preis` V0.2 / heldenreise V0.3

**Stand:** 2026-05-10 | **Reviewer:** Perplexity / Claude | **Grundlage:** APP_SPEC V0.2 + heldenreise-Ergänzung V0.3

---

## Executive Summary

Die Spec ist in ihrem Kern fachlich korrekt und dramaturgisch kohärent. Der Goethe-Vers (*„Und wenn ihr's nicht erfühlet, Ihr werdet's nicht erjagen"*) ist kein Ornament, sondern das eigentliche Design-Prinzip: Der LiveCounter als emotionale Kernmechanik macht die abstrakte Zinseszins-Exponentialität **spürbar**, nicht nur lesbar. Die Spec ist spec-gate-reif mit zwei offenen Empfehlungen vor dem expliziten Albert-OK.

---

## Fachliche Korrektheit der Kernformel

Die verwendete Future-Value-Annuitätsformel ist Standard-Finanzmathematik:

\[FV = PMT \cdot \frac{(1+r)^n - 1}{r}\]

mit monatlicher Rendite \(r = (1 + 0{,}07)^{1/12} - 1 \approx 0{,}5654\,\%\).

Die monatliche Umrechnung per geometrischem Mittel (nicht Division durch 12) ist die finanzmathematisch korrekte Variante und entspricht der Standardpraxis für Sparplan-Annuitäten.

### Hinweise zu den Arbeitsannahmen

**AA-01 — 7 % nominal:** Historisch solide für den MSCI World als Langfrist-Durchschnitt. Der Hinweis „nicht garantiert" in der AssumptionsBox ist nach §14 ausreichend. ✅

**AA-02 — Nominalrechnung:** Fachlich vertretbar und ehrlicher als eine Scheinpräzision mit variablen Inflationsannahmen. Die AssumptionsBox nennt „ohne Inflationsbereinigung" — das ist notwendig, aber knapp. **Empfehlung:** Einen optionalen zweiten Satz ergänzen, z. B.:

> *„Real (nach Inflation) wären es bei ca. 2,5 % Inflation etwa 4–5 % p.a. — die Beträge wären entsprechend kleiner."*

Das verhindert, dass Nutzer die nominalen Endbeträge als heutige Kaufkraft interpretieren.

**AA-03 — Monatliche Verzinsung:** Die Sparplan-Annuitätsformel mit monatlicher Verzinsung ist die korrekte Methode. Eine jährliche Näherungsrechnung würde systematisch falsche Ergebnisse liefern. ✅

---

## Beweisdramaturgie und emotionale Wirkung

### Stärken

Die Reihenfolge **Hauptzahl → primärer Slider → Ergebnissatz → Nebenwerte** folgt der bewährten Logik überzeugender Entscheidungsarchitektur: erst der emotionale Treffer, dann die rationale Erklärung. Das ist psychologisch korrekt.

Der Prokrastinations-Preis als **einzige dominante Zahl** (Tufte-Regel, §18.6) verhindert kognitive Überlastung. Der Default-Wert von ca. 120.000 € (300 €/Monat, 30 Jahre, 5 Jahre Wartezeit) ist groß genug, um zu überraschen — und damit der Ausgangspunkt für den gewünschten Aha-Moment *„Oh. Das hätte ich nicht gedacht."*

Der Wartezeit-Slider als **primärer Slider** (§18.7) ist die richtige Entscheidung: Er verkörpert die Kernfrage der App. Wer die Monatsrate als ersten Slider setzt, verschiebt die Aufmerksamkeit auf Spardisziplin — das ist eine andere App.

### Lücke: fehlender Vergleichsanker

§18.5 setzt voraus, dass 120.000 € als Zahl wirkt. Für Nutzer ohne mentales Referenzmodell für „was kostet was" fehlt ein **narrativer Vergleichsanker**, der das Delta greifbar macht. Vorschlag: optionaler Slot im Config-Template `resultTemplates.context`:

> *„120.000 € — das entspricht etwa 400 eingesparten Monatsraten."*

Das ist kein Dark Pattern (kein Druck, keine Scham), sondern Kontextualisierung. Es macht die abstrakte Differenz **menschlich fassbar** — im Sinne des Goethe-Prinzips.

**Technische Umsetzung:** Berechnung im AppContext als `vergleichsAnker = Math.round(prokrastinationsPreis / monatlicheRate)` — reiner Zusatz, kein Eingriff in bestehende Logik.

---

## UX/UI-Reihenfolge: Präzisierung

§18.7 definiert die dramaturgische Reihenfolge korrekt. Eine ergänzende Einschätzung pro Element:

| Position | Element | Status | Hinweis |
|---|---|---|---|
| 1 | Einstiegsfrage | ✅ | Vor den Slidern — gut. Nicht im Tab-Title verstecken. |
| 2 | LiveCounter (Hauptzahl) | ✅ | Above the fold — diese Entscheidung trägt die gesamte App. |
| 3 | Wartezeit-Slider | ✅ | Steht zuerst — richtig. Verkörpert die Kernfrage. |
| 4–5 | Rate + Laufzeit-Slider | ✅ | Sekundär, aber interaktiv wichtig. |
| 6 | ResultSentence | ✅ | Formulierung „unter diesen Annahmen" ist Pflicht — kein „du verlierst". |
| 7 | KpiCards | ⚠️ | `endwertSofort` **vor** `endwertSpaeter` — positiv zuerst framen. |
| 8 | AssumptionsBox | ⚠️ | Sichtbarkeits-Risiko (s.u.) |
| 9 | CTA | ✅ | Nach Ergebnis positioniert — richtig. |

---

## AssumptionsBox: Sichtbarkeits-Risiko

§14 schreibt vor, dass Annahmen explizit sichtbar gemacht werden. §11.4 erlaubt Expand/Collapse. Hier liegt ein Risiko:

Ein **Accordion mit collapsed Default** macht die AssumptionsBox faktisch zum Kleingedruckten. Das widerspricht P-06 (Truthful UX) im Geist, auch wenn es dem Buchstaben entspricht.

**Empfehlung:**

- Die **erste Zeile** der AssumptionsBox ist **immer sichtbar**, nicht kollabierbar:
  > *„Annahme: 7 % nominal — historischer MSCI-World-Durchschnitt. Nicht garantiert."*
- Der Rest (nominal/real-Hinweis, Beratungshinweis) ist expandierbar.

So bleibt die Rendite-Annahme prominent — ohne die UI zu überladen.

---

## Spec-Gate-Checkliste: Gesamtbewertung

| Prüfpunkt | Bewertung | Anmerkung |
|---|---|---|
| Kernformel fachlich korrekt | ✅ | Monatliche Annuität, geometrische Renditeumrechnung |
| 7 % Nominal-Default vertretbar + kommuniziert | ✅ | Mit Empfehlung zu Real-Hinweis |
| Dark-Pattern-Grenze eingehalten | ✅ | Keine Fake-Urgency, kein Confirmshaming, kein Panik-Ton |
| Goethe-Prinzip operationalisiert (LiveCounter) | ✅ | Das ist die starke, tragende Entscheidung |
| Erkenntnishierarchie (eine Hauptzahl) | ✅ | Tufte-Regel eingehalten |
| Krug-Labels in Alltagssprache | ✅ | „Wartezeit" statt „Prokrastination" — richtig |
| AssumptionsBox nicht vergraben | ⚠️ | Accordion-Gefahr — erste Zeile immer sichtbar empfohlen |
| Vergleichsanker für emotionale Wucht | ⚠️ | Fehlt noch — optionaler `resultTemplates.context`-Slot empfohlen |
| KpiCard-Reihenfolge (positiv zuerst) | ⚠️ | `endwertSofort` vor `endwertSpaeter` spezifizieren |
| Masterziel (Umsetzung, nicht nur Verstehen) | ✅ | Funnel-CTA → `risiko-uebersetzer` logisch und richtig angeschlossen |
| Alberts explizites OK | ⬜ | Ausstehend |

---

## Zwei offene Empfehlungen vor Spec-Gate-OK

### Empfehlung 1 — AssumptionsBox: erste Zeile immer sichtbar

**Was:** Rendite-Annahme (erste Zeile) ist immer sichtbar, Rest expandierbar.  
**Warum:** P-06 (Truthful UX) im Geist, nicht nur im Buchstaben. Verhindert Kleingedrucktes-Effekt.  
**Aufwand:** Minimal — CSS + Accordion-Logik anpassen.

### Empfehlung 2 — Config-Template: optionaler `context`-Slot

**Was:** `resultTemplates.context`-Slot für narrativen Vergleichsanker.  
**Warum:** Macht den abstrakten Euro-Betrag menschlich fassbar — Goethe-Prinzip auf Ergebnisebene.  
**Aufwand:** Minimal — neues optionales Feld in Config-JSON, neue Berechnungszeile im AppContext.

```json
"resultTemplates": {
  "standard": "Wer {prokrastinationsJahre} Jahre wartet, verzichtet auf ca. {prokrastinationsPreis}.",
  "context": "{prokrastinationsPreis} — das entspricht etwa {vergleichsAnker} eingesparten Monatsraten."
}
```

Beide Empfehlungen sind **keine Blocker**. Die Spec ist in ihrem aktuellen Stand implementierungsreif nach Alberts explizitem OK.

---

## Zum Goethe-Vers als Design-Prinzip

*„Und wenn ihr's nicht erfühlet, Ihr werdet's nicht erjagen"* — der Vers beschreibt präzise, was die Verhaltensökonomie als **affective forecasting gap** bezeichnet: Menschen unterschätzen systematisch die emotionale Wirkung zukünftiger finanzieller Verluste, weil diese abstrakt bleiben. Der LiveCounter als animierte, reaktive Hauptzahl schließt diesen Gap — nicht durch Manipulation, sondern durch Sichtbarmachen von etwas Realem. Das ist kein Gimmick. Das ist die fachliche Kernentscheidung der App, und sie ist richtig.

---

*Dokument erstellt: 2026-05-10 | Grundlage: APP_SPEC prokrastinations-preis V0.2 + heldenreise V0.3*
