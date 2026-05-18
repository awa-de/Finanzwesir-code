# MINI_SPEC_FROM_HAUPTDOKUMENT — Geburtsjahrlos

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md` + `aktuelles Projekt/05_ZUSATZTEXT_B2_REWRITE_GEBURTSJAHRENLOS.md`
> Status: Roh-Mini-Spec, noch nicht APP_SPEC
> Letzte Änderung: 2026-05-18 — B2 auf rollierende 30-Jahres-Zeiträume fokussiert; Kindersparplan, vor-10-Jahren-Motiv und Warte-Button entfernt

---

## B2 – Geburtsjahrlos

**Slug:** `geburtsjahrlos`
**KI-Konsens:** ★★★★ (Perplexity, Claude, Gemini, ChatGPT)
**Folienbezug:** Slides 4–6, 8–10, 60 (Großwetterlage, historische Renditen)
**Funnel-Position:** Timing zerstören / historische Robustheit
**Modulrolle:** Haupt-App im Timing-Block

---

## Problem, das gelöst wird

Viele Anleger glauben unbewusst, langfristiges Investieren liefere ein planbares Standardergebnis. B2 zeigt: Selbst 30 Jahre ETF-Sparen sind keine Einheitsstrecke. Dieselbe Strategie, dieselbe Sparrate und dieselbe Laufzeit führten historisch zu sehr unterschiedlichen realen Endwerten — nicht wegen Fehlern, sondern wegen Börsenepoche.

---

## Kernbotschaft

> „Du kontrollierst nicht deine Börsenepoche. Du kontrollierst nur, ob deine Strategie robust genug ist."

Kurzform:

> „Epoche ist Los."

---

## Neue Rolle

B2 zeigt nicht mehr, wie wichtig frühes Anfangen ist.

Das übernehmen:

- B1: Marktzeit statt Warten
- Der alte Euro: Mechanik früher Euros

B2 zeigt stattdessen:

> **Wie unterschiedlich dieselbe 30-Jahres-Strategie je nach Börsenepoche ausging.**

B2 entromantisiert die langfristige Renditeerwartung:

> Auch 30 Jahre sind kein Renditeautomat. Gleiche Disziplin, andere Epoche, andere reale Endwerte.

---

## Interaktion (UX-Flow)

Die App simuliert rollierende 30-Jahres-Sparpläne auf den MSCI World mit Monatsdaten.

### Eingaben

- monatliche Sparrate
- Laufzeit: standardmäßig 30 Jahre
- optional: Startmonat / Startjahr markieren

### Visualisierung

- historischer Fächer aller rollierenden 30-Jahres-Zeiträume
- schlechtester Zeitraum
- Median-Zeitraum
- bester Zeitraum
- optional alle rollierenden Pfade als dezente Linien
- alle Hauptwerte inflationsbereinigt in heutiger Kaufkraft

### Ergebniswerte

- real eingezahlt
- realer Endwert schlechtester Zeitraum
- realer Endwert Median-Zeitraum
- realer Endwert bester Zeitraum

---

## Methodische Schutzplanke: Realwerte

Bei 30-Jahres-Zeiträumen müssen die Hauptwerte inflationsbereinigt sein.

Nominale Werte dürfen höchstens als Nebenwert oder Tooltip erscheinen.

Microcopy-Vorschlag:

> „Alle Beträge in heutiger Kaufkraft. Sonst vergleichen wir Vermögen mit Spielgeld aus anderen Jahrzehnten."

---

## Was die App nicht tut

- kein „Der beste Zeitpunkt war vor 10 Jahren"
- keine Opportunitätskosten des Zögerns
- kein Button „Was passiert, wenn ich 3 Jahre warte?"
- kein Kindersparplan
- kein Vergleich „Sparstart Geburt vs. Sparstart 30"
- keine Startalter-App
- keine glatte Zukunftsprojektion
- keine Renditedebatte
- keine B1-Marktzeit-Inszenierung

---

## Abgrenzung zu B1

B1 beantwortet:

> „Was mache ich mit dem verpassten Gestern und dem verfügbaren Heute?"

B2 beantwortet:

> „Wie unterschiedlich liefen 30 Jahre ETF-Sparen je nach Börsenepoche?"

B1 ist die Entscheidungspunkt-/Marktzeit-App.
B2 ist die Kohorten-/Epochen-App.

---

## Abgrenzung zu „Der alte Euro"

„Der alte Euro" zeigt modellhaft, wie Erträge wieder Erträge erzeugen.

B2 zeigt historisch, dass echte 30-Jahres-Zeiträume sehr unterschiedlich ausgingen.

---

## CTA

> „Robust starten, statt perfekte Epoche suchen."

---

## Implementierungshinweise

- Historische MSCI-World-Monatsdaten lokal/statisch
- Inflationsdaten erforderlich
- Hauptwerte real / in heutiger Kaufkraft
- Kein Backend
- Keine Tagesdaten
- Keine Zukunftsprojektion
- Fokus auf rollierende 30-Jahres-Sparplanzeiträume

---

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md` + `aktuelles Projekt/05_ZUSATZTEXT_B2_REWRITE_GEBURTSJAHRENLOS.md`
- Block: B – Timing zerstören
- App-ID: B2
- App-Titel: Geburtsjahrlos
- Slug laut Hauptdokument: `geburtsjahrlos`
- Zugeordneter App-Ordner: `/Apps/geburtsjahrlos/`
- Modulrolle: Haupt-App
- Status: Roh-Mini-Spec, noch nicht APP_SPEC
