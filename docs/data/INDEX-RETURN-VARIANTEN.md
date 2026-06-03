Stand: 2026-06-03 | Erstellt von: Claude | Session: Datenlayer-Setup

# Index Return-Varianten — Finanzwesir 2.0

Allgemeine Return-Variantenregel für alle App-Projekte, die auf Aktienindizes aufbauen.

Diese Regel gilt nicht nur für MSCI World — sie gilt grundsätzlich.

---

## Strategische Standardpräferenz

Bei langfristigen Aktienindex-Apps gilt:

| Priorität | Variante | Bewertung |
|---|---|---|
| 1 (stark bevorzugt) | **Net Return** | Dividenden berücksichtigt, Quellensteuer abgezogen — realistisch und vollständig |
| 2 (zweite Wahl) | Gross Return | Dividenden berücksichtigt, aber brutto-optimistisch (keine Quellensteuer) |
| 3 (letzte Wahl) | Price Return | Dividenden fehlen vollständig — fachlich schwach |

---

## Warum Net Return?

**Price Return** ist fachlich schwach: Dividenden fehlen. Für langfristige
Renditedarstellungen stark unterschätzend.

**Gross Return** ist vollständiger als Price Return, aber optimistisch: Bruttodividenden
werden ohne Quellensteuerabzug unterstellt. Kein realer Anleger erhält Bruttodividenden.

**Net Return** ist für Prinzip-Apps der beste Standard: Dividenden werden berücksichtigt,
aber nicht brutto-optimistisch. Entspricht der Situation eines typischen internationalen
Investors nach Quellensteuereinbehalt.

---

## Die zentrale Abwägungsregel

Eine längere Nicht-Net-Return-Reihe darf nicht eigenmächtig gewählt werden.

Wenn eine Net-Return-Reihe nur geringfügig kürzer ist als eine Gross- oder
Price-Return-Reihe, ist Net Return normalerweise vorzuziehen.

**Beispiel:**
Wenn eine Nicht-Net-Return-Reihe X Jahre umfasst und eine Net-Return-Reihe
X minus 2 Jahre umfasst, ist eher auf die zwei Jahre zu verzichten als auf Net Return.

Das ist keine mechanische harte Formel, sondern eine Prioritätsregel:

> Net Return ist fachlich sehr stark gewünscht.
> Claude darf diese Abwägung nicht eigenmächtig umdrehen.

---

## Abweichungen

Abweichungen von Net Return sind nur erlaubt, wenn der Projektinhaber sie
ausdrücklich freigibt.

Claude darf nicht aus Gründen der längeren Historie eigenmächtig von Net Return
auf Gross Return oder Price Return wechseln.

---

## Geltungsbereich

Diese Regel gilt für alle Aktienindizes, darunter:

- MSCI World
- MSCI ACWI
- MSCI Emerging Markets
- S&P 500
- STOXX Europe
- FTSE All-World
- alle weiteren Aktienindizes in Finanzwesir-2.0-Apps

---

## Verwandte Dokumente

- `DATENQUELLEN-GOVERNANCE.md` — allgemeine Regeln
- `SOURCE-TIERS.md` — Quellenhierarchie
- `DATASET-CATALOG.md` — freigegebene Datasets
