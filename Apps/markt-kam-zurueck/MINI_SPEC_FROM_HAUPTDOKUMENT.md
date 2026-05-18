# MINI_SPEC_FROM_HAUPTDOKUMENT — A3 Der Markt kam zurück. Du nicht.

> Quelle: konzeptionelle Ergänzung zu `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`  
> Status: Roh-Mini-Spec aus App-Intake-Diskussion, noch nicht APP_SPEC  
> Ordner: `/Apps/markt-kam-zurueck/`

---

## A3 – Der Markt kam zurück. Du nicht.

**Slug:** `markt-kam-zurueck`  
**KI-Konsens:** ★★★ (neue Ergänzung, noch kein Alt-Konsens aus der ersten App-Liste)  
**Folienbezug:** Psychologie, Crash-Angst, Positionsgrößenmanagement, Durchhalten  
**Funnel-Position:** Block A — Risiko überleben / Durchhalte-Kette  
**Priorität:** hoch, direkt im Trio mit A1 und A2  
**Rolle im A-Trio:** Ausstiegsfolgen-App

---

## Strategische Einordnung

A3 ergänzt A1 und A2 zu einer psychologischen Durchhalte-Kette:

> **A1 Dosis finden → A2 Feuerprobe erleben → A3 Ausstiegsfolge sehen**

A1 fragt:

> „Wie viel ETF-Anteil kann ich psychologisch tragen?"

A2 fragt:

> „Was tue ich, wenn es wirklich kracht?"

A3 fragt:

> „Was kostet es, wenn ich einmal mit Verlust aussteige und nie wieder zurückkomme?"

Gemeinsamer Kernsatz des Trios:

> **Du musst nicht den Durchschnitt aushalten. Du musst deinen schlimmsten Abschnitt aushalten.**

A3 ist damit keine weitere Crash-App und kein Ersatz für den Dacia-Test. A3 zeigt die Konsequenz einer zu hohen Dosis: Der Markt erholt sich, aber der Anleger ist nach dem Verkauf nicht mehr dabei.

---

## Problem, das gelöst wird

Viele Anleger glauben:

> „Wenn es schlimm wird, verkaufe ich halt. Später kann ich ja wieder einsteigen."

Diese App zeigt, warum dieser Satz gefährlich ist. Wer im Verlust verkauft, kommt psychologisch oft nicht zurück. Der Crash ist dann nicht das eigentliche Problem. Das eigentliche Problem ist die verpasste Erholung danach.

Der Nutzer soll erleben:

> Der Markt kam zurück. Ich nicht.

---

## Kernbotschaft

> **„Der Durchschnitt steht im Rückspiegel. Verkauft wird am Tiefpunkt."**

Noch kürzer als Punchline:

> **„Der Markt kam zurück. Du nicht."**

Strategischer Satz:

> **„Langfristige Rendite gehört nur denen, die am schlimmsten Punkt noch dabei sind."**

---

## Interaktion (UX-Flow)

### Screen 1 — Einstieg

Headline:

> **Der Markt kam zurück. Du nicht.**

Subline:

> „Teste, ob du deinen eigenen Anlageweg durchgehalten hättest."

Eingaben:

- Schieberegler oder Jahresauswahl: **Startjahr**
- Schieberegler: **Verlusttoleranz** in Prozent, z. B. –10 % bis –60 %
- Optional: Depotwert oder monatliche Sparrate, um die verpasste Erholung in Euro zu übersetzen

CTA:

> „Reise starten"

---

### Screen 2 — Die historische Reise

Die App zeigt die MSCI-World-Kurve ab dem gewählten Startjahr.

Die App berechnet:

- den maximalen zwischenzeitlichen Verlust ab Startjahr
- ob die Verlusttoleranz des Nutzers gerissen worden wäre
- den ersten Zeitpunkt, an dem der Nutzer nach eigener Regel ausgestiegen wäre

Wenn die Verlustgrenze nicht gerissen wurde:

> „Du wärst dringeblieben. Dein schlimmster Abschnitt lag bei –X %. Deine Grenze war –Y %."

Wenn die Verlustgrenze gerissen wurde:

> „Hier wärst du ausgestiegen."

Ab diesem Punkt läuft die Marktkurve weiter. Die persönliche Anlegerkurve stoppt oder wird grau/gestrichelt. Die Lücke zwischen Marktverlauf und Anlegerverlauf wird sichtbar.

Keine Drawdown-Kurve. Keine Theorie. Kein Fachbegriff.

---

### Screen 3 — Ergebnis

#### Fall A: Nutzer wäre ausgestiegen

Headline:

> **Du wärst raus gewesen.**

Ergebnistext:

> „Dein schlimmster Abschnitt ab [Startjahr] lag bei –X %. Deine Grenze war –Y %.  
> Du wärst im [Monat/Jahr] ausgestiegen.  
> Der Markt kam zurück. Du nicht."

Output:

- Ausstiegsdatum
- Ausstiegswert
- heutiger Wert bei Dranbleiben
- verpasste Erholung in Euro
- optional: Übersetzung in konkrete Dinge/Erlebnisse aus der A1-Ankerlogik

Beispiel-Punchline:

> „Der Verlust war schmerzhaft. Der Ausstieg war teurer."

#### Fall B: Nutzer wäre dringeblieben

Headline:

> **Du wärst dringeblieben.**

Ergebnistext:

> „Dein schlimmster Abschnitt ab [Startjahr] lag bei –X %. Deine Grenze war –Y %.  
> Du wärst durchgekommen."

Danach kein Triumph-Gefühl erzeugen, sondern fair ergänzen:

> „Aber nicht jedes Startjahr war so gnädig."

CTA:

> „Zeig mir den Härtetest"

---

### Screen 4 — Härtetest

Der Härtetest ist optional und folgt erst nach dem Ergebnis des vom Nutzer gewählten Startjahrs.

Ziel: Manipulationsvorwurf vermeiden.

Nicht direkt mit dem schlimmsten Crashjahr starten. Erst wählt der Nutzer sein eigenes Startjahr. Danach darf die App zeigen:

> „Das härteste Startjahr seit Beginn der Daten hätte dir –X % zugemutet."

Headline:

> **Das schwerste Startjahr für deine Nerven**

Ergebnistext:

> „Wenn du langfristig investieren willst, musst du nicht den Durchschnitt aushalten. Du musst den schlimmsten Abschnitt aushalten."

---

## Eingaben

Pflicht:

- Startjahr
- Verlusttoleranz in Prozent

Optional:

- Depotwert
- monatliche Sparrate
- A1-Schmerzanker, falls aus `risiko-uebersetzer` übergeben

---

## Ausgaben

- Maximaler zwischenzeitlicher Verlust ab Startjahr
- Status: „durchgekommen" oder „ausgestiegen"
- Erstes Ausstiegsdatum bei gerissener Verlusttoleranz
- Ausstiegswert
- heutiger Wert bei Dranbleiben
- verpasste Erholung
- Übersetzung der verpassten Erholung in konkrete Dinge/Erlebnisse

---

## Datenbedarf

Historische MSCI-World-Zeitreihe.

Offen zu klären:

- MSCI World Preisindex oder Net Total Return?
- Nominal oder real?
- Startjahr-Range
- Monatsdaten oder Jahresdaten
- Umgang mit Sparplan vs. Einmalanlage
- Währungsbasis EUR oder USD

Arbeitsannahme für APP_SPEC später:

- Monatsdaten reichen.
- Jahresauswahl als Nutzerinteraktion reicht.
- Kein Tages-Timing.
- Keine Drawdown-Kurve.
- Keine externe Datenabfrage zur Laufzeit.
- Daten lokal / statisch gemäß App-Fabrik-Standard.

---

## Berechnungslogik grob

Ausgehend vom gewählten Startjahr:

1. Startwert bestimmen.
2. Für jeden Folgezeitpunkt historischen Wert relativ zum bisherigen Hoch berechnen.
3. Prüfen, ob die Verlusttoleranz erstmals gerissen wird.
4. Wenn nein: Ergebnis „durchgekommen".
5. Wenn ja:
   - Ausstiegszeitpunkt markieren.
   - Anlegerwert ab diesem Zeitpunkt einfrieren oder in Cash fortschreiben.
   - Marktwert bis heute weiterlaufen lassen.
   - Differenz als verpasste Erholung ausgeben.

Wichtig:

- A3 zeigt keinen optimierten Wiedereinstieg.
- A3 unterstellt bewusst die psychologische Realität: Wer mit Verlust verkauft, kommt oft nicht zurück.
- Keine taktische Timing-App bauen.
- Keine Trading-/Stop-Loss-Logik daraus machen.

---

## Beziehung zu A1 Risiko-Übersetzer

A1 bleibt eigenständig.

A1 ist die Dosis-App:

> „Wie viel Verlust kann ich tragen, ohne zu verkaufen?"

A3 nutzt A1 nur als Verstärker:

- A1-Ankerliste kann wiederverwendet werden.
- A3 kann verpasste Erholung in Dacia/Küche/Urlaub übersetzen.
- A1 kann optional Depotwert/ETF-Anteil als Kontext liefern.
- A3 darf A1 aber nicht ersetzen.

Empfohlene Übergabe von A1 zu A3:

> „Du kennst jetzt deine tragbare Dosis. Willst du sehen, was passiert, wenn du sie überschreitest?"

Button:

> „Zeig mir den Ausstieg"

---

## Beziehung zu A2 Crash-Reaktions-Test

A2 bleibt eigenständig.

A2 ist die Feuerprobe-App:

> „Was tue ich im Crash?"

A3 zeigt die langfristige Folge einer Verkaufsentscheidung.

Empfohlene Übergabe von A2 zu A3:

> „Verkaufen fühlt sich wie Rettung an. Aber was passiert danach?"

Button:

> „Zeig mir, was danach passiert"

---

## Ton und Stil

Emotionaler Grundton:

- ernst
- ruhig
- konfrontativ, aber nicht beschämend
- keine Panikmache
- keine Renditeversprechen

Die App darf weh tun, aber sie darf nicht manipulieren.

Deshalb:

- Der Nutzer wählt sein Startjahr selbst.
- Die App startet nicht mit einem ausgesuchten Crashjahr.
- Der Härtetest kommt erst optional nach dem persönlichen Ergebnis.
- Glatte Jahre dürfen glatt aussehen.
- Schlechte Jahre werden nicht versteckt.

---

## Microcopy

Headline:

> Der Markt kam zurück. Du nicht.

Subline:

> Teste, ob du deinen eigenen Anlageweg durchgehalten hättest.

Startjahr-Label:

> Wann wärst du gestartet?

Verlusttoleranz-Label:

> Bei welchem Verlust wärst du raus?

CTA Start:

> Reise starten

Ausstiegsmarker:

> Hier wärst du ausgestiegen.

Ergebnis Ausstieg:

> Der Verlust war schmerzhaft. Der Ausstieg war teurer.

Ergebnis Durchhalten:

> Du wärst dringeblieben. Aber nicht jedes Startjahr war so gnädig.

Härtetest-CTA:

> Zeig mir den Härtetest

Schluss-CTA:

> ETF-Dosis prüfen

---

## Was diese App nicht tut

- Keine Drawdown-Kurve.
- Keine Tagesauswahl.
- Kein Trading-Simulator.
- Kein Stop-Loss-Rechner.
- Keine Optimierung des besten Startjahres.
- Keine historische Crash-Enzyklopädie.
- Keine Renditeversprechen.
- Keine Nutzerbeschämung.
- Keine Theoriebegriffe im UI wie Drawdown, Tail Risk, Pfadabhängigkeit, Extremwert, Volatilität.

---

## Strategische Risiken und Schutzplanken

### Risiko: Manipulationsvorwurf

Problem:

> Wenn die App ein festes Katastrophenjahr vorgibt, wirkt sie wie Panikmache.

Schutzplanke:

> Nutzer wählt zuerst sein eigenes Startjahr. Der Härtetest kommt erst danach optional.

### Risiko: Zu viel Theorie

Problem:

> Drawdown-Kurven und Fachbegriffe überfordern die Zielgruppe.

Schutzplanke:

> Nur die historische Marktkurve zeigen, plus Ausstiegsmarker und verpasste Erholung.

### Risiko: Lähmung

Problem:

> Zu starke Crash-Dramatik kann Investieren noch unheimlicher machen.

Schutzplanke:

> Ergebnis immer konstruktiv schließen: Wenn dich dieser Verlust rausgeworfen hätte, war nicht die Börse das Problem. Dann war die Dosis zu hoch.

### Risiko: A1-Kannibalisierung

Problem:

> A3 nutzt ebenfalls Euro- und Ding-Anker.

Schutzplanke:

> A1 bleibt die Dosis-App. A3 nutzt die Anker nur im Ergebnis zur Übersetzung der verpassten Erholung.

---

## Offene Fragen für die spätere APP_SPEC

- Welche MSCI-World-Datenreihe ist verbindlich?
- Nominal oder real?
- Einmalanlage, Sparplan oder beide Modi?
- Wie wird Cash nach Ausstieg modelliert?
- Wird Inflation optional berücksichtigt?
- Wie genau wird die A1-Ankerliste technisch wiederverwendet?
- Wie wird der Härtetest definiert: maximaler Drawdown, längste Unterwasserphase oder höchste verpasste Erholung?
- Welche Mindestlaufzeit braucht ein Startjahr, damit das Ergebnis fair ist?

---

## Mini-Spec-Metadaten

- Quelle: App-Intake-Diskussion Block A / Durchhalte-Trio
- Block: A – Risiko überleben
- App-ID: A3
- App-Titel: Der Markt kam zurück. Du nicht.
- Slug: `markt-kam-zurueck`
- Zugeordneter App-Ordner: `/Apps/markt-kam-zurueck/`
- Modulrolle: Master-App / Companion im A-Trio
- Status: Roh-Mini-Spec, noch nicht APP_SPEC
