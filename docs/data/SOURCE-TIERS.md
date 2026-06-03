Stand: 2026-06-03 | Erstellt von: Claude | Session: Datenlayer-Setup

# Source Tiers — Quellenhierarchie Finanzwesir 2.0

Dieses Dokument definiert die Quellenhierarchie für externe Finanzdaten.

Es setzt keine professionellen Terminal-Anbieter voraus. Bloomberg, Refinitiv,
FactSet, Morningstar Direct und Macrobond sind für dieses Projekt nicht realistisch
verfügbar und werden nicht als Voraussetzung eingebaut.

---

## Tier 0 — Offizielle Quelle

Die primäre, von der ausgebenden Institution gepflegte Datenquelle.

**Beispiele:**

| Bereich | Anbieter |
|---|---|
| MSCI-Indizes | MSCI direkt (msci.com) |
| S&P-Indizes | S&P Dow Jones Indices |
| FTSE-Indizes | FTSE Russell |
| STOXX-Indizes | STOXX / Qontigo |
| Zinsen, Wechselkurse, Geldmarkt | EZB, Bundesbank |
| Makrodaten | Destatis, Eurostat, FRED |
| ETF-NAV, Ausschüttungen | ETF-Anbieter (iShares, Xtrackers usw.) |

**Verwendung:** Bevorzugt immer, wenn zugänglich.

---

## Tier 1 — Archivierte Originalquellen

Datei stammt nachvollziehbar von einer offiziellen Institution, liegt aber nicht
mehr direkt im aktuellen Downloadbereich.

**Beispiele:**
- Alte MSCI-Excel-Dateien
- Archivierte Anbieterdateien
- Historische Factsheets
- Wayback-/Archiv-Funde mit prüfbarer Herkunft

**Zulässig wenn:**
Quelle, Variante, Währung, Frequenz und Zeitraum sind eindeutig dokumentiert.

**Nicht zulässig wenn:**
Variante, Währung oder Zeitraum unklar sind.

---

## Tier 2 — Seriöse öffentliche Finanzportale

**Beispiele:**
Yahoo Finance, Investing.com, Stooq, Börse Frankfurt, Deutsche Börse / Xetra,
MarketWatch, Wall Street Journal Market Data, finanzen.net, onvista, ariva,
extraETF, justETF.

**Zulässig nur wenn eindeutig geklärt ist:**

| Frage | Muss beantwortet sein |
|---|---|
| Welches Instrument / welcher Index? | ja |
| Datenart | Price, Net Return, Gross Return, Total Return, NAV oder Börsenkurs? |
| Währung | ISO-Code |
| Adjusted oder unadjusted? | ja |
| Indexdaten oder ETF-Daten? | ja |

**Nicht zulässig wenn:**
Eine dieser Fragen nicht eindeutig beantwortet werden kann.

---

## Tier 3 — Akademische Quellen

**Beispiele:**
Papers, Datensupplements, Universitätsdaten, Forschungsdatenbanken.

**Verwendung:**
- Gut zur Plausibilisierung
- Als produktive Quelle nur wenn Frequenz, Variante, Währung und Rechte eindeutig sind

---

## Tier 4 — Finanzforen, Blogs, private CSVs

**Verwendung:**
- Nur als Recherchehinweis
- Nicht als produktive Quelle ohne unabhängige Prüfung

---

## Wichtige Abgrenzung: Tier 2 für Indexdaten

Öffentliche Finanzportale wie Yahoo Finance liefern häufig ETF-Kurse oder
adjustierte Börsenkurse — nicht den offiziellen Indexwert.

Vor Verwendung von Tier-2-Daten für Indexreihen muss geprüft werden:
- Handelt es sich um den Indexwert oder um einen ETF?
- Ist die Return-Variante dokumentiert oder muss sie erschlossen werden?

Zweifel → höheren Tier verwenden oder offen als Tier 4 (Recherchehinweis) einordnen.
