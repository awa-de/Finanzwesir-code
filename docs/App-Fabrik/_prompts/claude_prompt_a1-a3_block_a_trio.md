# Claude-Code-Prompt — App-Fabrik: A3 „Der Markt kam zurück. Du nicht.“

**Ziel:** Finanzwesir App-Fabrik konsistent erweitern: Aus A1/A2 wird ein bewusst strukturiertes Trio A1/A2/A3 im Block A.  
**Neue App:** A3 „Der Markt kam zurück. Du nicht.“  
**Neuer Ordner:** `/Apps/markt-kam-zurueck/` existiert bereits.  
**Wichtig:** Nicht coden. Nur Dokumente, Inventare, Mini-Specs und konsistente Texte ändern.  
**Commit-Ziel:** Ein vollständiger Git-Commit mit allen betroffenen Dokumentänderungen.

---

## 0. Arbeitsmodus für Claude Code

Bitte arbeite streng dokumentorientiert.

1. Vor Änderungen relevante Dateien lesen.
2. Keine technische APP_SPEC erstellen.
3. Keine App implementieren.
4. Keine CI-/CSS-/JS-Vorgaben ergänzen.
5. Keine bestehenden Aussagen löschen, wenn eine gezielte Ergänzung reicht.
6. Änderungen klein, nachvollziehbar und diff-freundlich halten.
7. Am Ende Git-Diff prüfen und Commit-Message vorschlagen.

Diese Änderung ist konzeptionell verbindlich:

> Block A wird zu einer **Durchhalte-Kette**:  
> **A1 Dosis finden → A2 Feuerprobe erleben → A3 Ausstiegsfolge sehen**

---

## 1. Hintergrund und Entscheidung

Wir haben entschieden:

- **A1 Risiko-Übersetzer / Dacia-Test bleibt eigenständig.**
- **A2 Crash-Reaktions-Test bleibt eigenständig.**
- **A3 „Der Markt kam zurück. Du nicht.“ wird neu ergänzt.**
- A3 ersetzt A1 nicht.
- A3 ist auch kein Duplikat von A2.
- A1, A2 und A3 bilden künftig ein Trio im Block A.

### Warum A1 bleibt

A1 ist die **Dosis-App**.

Sie beantwortet:

> „Wie viel Aktienanteil kann ich psychologisch tragen, ohne später zu verkaufen?“

A1 übersetzt abstrakte Prozentverluste in Euro und dann in konkrete Alltagsanker wie Familienurlaub, Dacia, Küche etc. Das ist wichtig, weil Menschen in Coachings auf Prozentverluste oft gelassen reagieren, auf konkrete Eurobeträge deutlich stärker, und auf konkrete Dinge oder Erlebnisse am stärksten.

A1 bleibt deshalb nicht als „Dacia-Gimmick“, sondern als Kern-App für Positionsgrößenmanagement / Risikodosis.

### Warum A2 bleibt

A2 ist die **Feuerprobe-App**.

Sie beantwortet:

> „Was tue ich, wenn es wirklich kracht?“

A2 simuliert die Entscheidung im Crash: verkaufen, halten, nachkaufen. Die App zeigt Verhalten unter Stress.

### Warum A3 neu dazukommt

A3 ist die **Ausstiegsfolgen-App**.

Sie beantwortet:

> „Was kostet es, wenn ich einmal mit Verlust aussteige und nie wieder zurückkomme?“

A3 zerstört die Illusion:

> „Wenn es schlimm wird, verkaufe ich halt. Später kann ich ja wieder einsteigen.“

Die App zeigt: Der Markt kann zurückkommen, aber der Anleger ist nach dem Verkauf oft nicht mehr dabei. Das ist die Telekom-Folklore / „Nie wieder Börse“-Logik.

### Strategischer Kernsatz des Trios

> **Du musst nicht den Durchschnitt aushalten. Du musst deinen schlimmsten Abschnitt aushalten.**

Das ist die Taleb-Schicht unter dem Trio: Nicht der Durchschnitt entscheidet, sondern ob der Anleger die Extremstelle im Fluss überlebt. Dieser Gedanke soll als Architekturprinzip in die Dokumente, aber nicht als Theorie-Exkurs ins Nutzer-UI.

---

## 2. Betroffene Dateien

Bitte diese Dateien prüfen und ändern, sofern vorhanden:

### Sicher betroffen

1. `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
   - Funnel-Übersicht Block A aktualisieren.
   - Master-Prioritätsliste von 18 auf 19 Apps erweitern.
   - Block A um A3 ergänzen.
   - A1/A2 gegebenenfalls mit Trio-Rollen ergänzen.

2. `docs/App-Fabrik/APP_INVENTORY.md`
   - Tabelle von 21 auf 22 App-Ordner erweitern.
   - Neuen Ordner `markt-kam-zurueck` aufnehmen.
   - Zusammenfassung App-Familien aktualisieren.
   - Prototypen-Status ergänzen.
   - Multi-Modul-/Cluster-Hinweis zu Block A ergänzen.

3. `docs/App-Fabrik/ETF-App-Fabrik_Produktlandkarte_V0-2.md`
   - Aussage „18 geplante Apps“ auf 19 geplante Apps anpassen.
   - Produktlandkarte-Tabelle um A3 ergänzen.
   - Abschnitt „Sehr kleine App-Briefings“ um A3 ergänzen.
   - App-Familien / Factory-Familien um A3 ergänzen.

4. `/Apps/markt-kam-zurueck/MINI_SPEC_FROM_HAUPTDOKUMENT.md`
   - Datei neu anlegen, falls noch nicht vorhanden.
   - Inhalt unten aus Abschnitt 5 exakt verwenden.

### Wahrscheinlich prüfen, aber nur ändern, wenn direkte Treffer vorhanden

5. `docs/App-Fabrik/00_STATUS.md`
6. `docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md`
7. `docs/App-Fabrik/04_CLAUDE_WORKFLOW_DRAFT.md`
8. `docs/App-Fabrik/05_PILOT_STRATEGY.md`
9. `docs/App-Fabrik/APP_FOLDER_STRUCTURE.md`
10. `docs/steering/BACKLOG.md`

Regel: Nur ändern, wenn diese Dateien explizit Zahlen, App-Listen, Block-A-Struktur, Pilot-Reihenfolge oder 18-App-Gesamtzahl enthalten. Keine Nebenkriegsschauplätze eröffnen.

---

## 3. Neue Block-A-Struktur

Bitte Block A in allen relevanten Dokumenten so rahmen:

# Block A: Crash-Angst, Risikodosis und Durchhalten

Block A besteht künftig aus drei Apps, die eine gemeinsame psychologische Kette bilden:

| App | Rolle | Nutzerfrage | Illusion | Ergebnis |
|---|---|---|---|---|
| A1 Risiko-Übersetzer / Dacia-Test | Dosis-App | Wie viel ETF-Anteil kann ich wirklich tragen? | „Prozentverluste sind abstrakt und harmlos.“ | Tragbare ETF-Dosis |
| A2 Crash-Reaktions-Test | Feuerprobe-App | Was tue ich, wenn es kracht? | „Im Crash bleibe ich rational.“ | Verhalten unter Stress |
| A3 Der Markt kam zurück. Du nicht. | Ausstiegsfolgen-App | Was kostet mein Ausstieg wirklich? | „Ich steige später einfach wieder ein.“ | Verpasste Erholung sichtbar |

Gemeinsamer Kernsatz:

> **Du musst nicht den Durchschnitt aushalten. Du musst deinen schlimmsten Abschnitt aushalten.**

Kurzform:

> **A1:** Wie viel kannst du verlieren, ohne zu verkaufen?  
> **A2:** Was tust du, wenn dieser Verlust kommt?  
> **A3:** Was kostet es, wenn du doch verkaufst?

---

## 4. Konkrete Änderungen je Datei

## 4.1 `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`

### 4.1.1 Funnel-Übersicht aktualisieren

Im Abschnitt „Übergeordnete Architektur: Der Entscheidungs-Trichter“ ist aktuell Block A sinngemäß getrennt:

- `[A] CRASH-ANGST AUFLÖSEN` mit A2
- später `[A/F] RISIKO KLÄREN` mit A1

Bitte diese Darstellung auf das neue Trio hin aktualisieren.

Empfohlene neue Fassung im Funnel:

```text
HOOK
  ↓
[B] TIMING ZERSTÖREN
    B1 Prokrastinations-Preis · B2 Geburtsjahrlos · B3 Market-Timing-Simulator
  ↓
[A] RISIKO ÜBERLEBEN
    A1 Risiko-Übersetzer (Dosis finden)
    A2 Crash-Reaktions-Test (Feuerprobe erleben)
    A3 Der Markt kam zurück. Du nicht. (Ausstiegsfolge sehen)
  ↓
[C] KOMPLEXITÄT ENTLARVEN
    C1 Diversifikations-Detektor · C2 1 ETF vs. 5 ETFs · C3 Weltdepot-Baukasten
  ↓
[D/E] ETF-AUSWAHL & TECHNIK
    D1 Namensdecoder · D2 Replizierer/Swapper · D3 TER-Rechner · E1 ESG-Spiegel
  ↓
[F] MECHANISMEN VERSTEHEN
    F1 Renditekiller · F2 Thesaurierer/Ausschütter
  ↓
══════════════════════════════════════════════════
[G] SYSTEMKRITISCHE EINWÄNDE
══════════════════════════════════════════════════
    G1 Regulatorisches Risiko Dashboard ✅ (bereits gebaut)
    G2 Rendite-Kalibrierung / „Ist die ETF-Ära vorbei?"
    G3 Passiv-Paradox (optional, ergänzend)
  ↓
[H] PLAN GEBEN & CTA
    H1 ETF-Reifegrad-Test + Start-Konfigurator
```

Falls die bestehende Struktur bewusst A1 später positionierte, nicht hart löschen, sondern mit kurzem Hinweis erklären:

> A1, A2 und A3 werden künftig als zusammenhängender Block „Risiko überleben“ geführt. A1 bleibt inhaltlich „Risiko klären“, rückt aber dramaturgisch vor A2/A3, weil die Dosis vor der Feuerprobe festgelegt werden muss.

### 4.1.2 Master-Prioritätsliste aktualisieren

Die Master-Prioritätsliste aktuell um A3 ergänzen.

Empfohlene Einordnung:

- A3 direkt nach A2 aufnehmen.
- Priorität nicht höher als A1, aber hoch.
- Vorschlag:
  - A1 bleibt #1.
  - B2 bleibt #2.
  - A2 bleibt #3.
  - A3 wird #4.
  - Alle folgenden Nummern erhöhen sich um +1.

Neuer Tabellen-Eintrag:

```markdown
| 4 | Der Markt kam zurück. Du nicht. | A3 | ★★★ | 🔥🔥 Sehr hoch | Mittel | 🟨 offen |
```

Begründung für ★★★: starke psychologische App, aber neue App ohne bisherigen KI-Konsens aus der alten Runde.

### 4.1.3 Block A Überschrift und Intro ergänzen

Vor A1/A2/A3 im Block A bitte dieses Intro einfügen:

```markdown
# Block A: Psychologie, Risikodosis und Durchhalten

Block A ist künftig kein loser Block aus „Crash-Angst“-Apps, sondern eine Durchhalte-Kette:

> **A1 Dosis finden → A2 Feuerprobe erleben → A3 Ausstiegsfolge sehen**

Die gemeinsame Botschaft lautet:

> **Du musst nicht den Durchschnitt aushalten. Du musst deinen schlimmsten Abschnitt aushalten.**

A1 verhindert Überdosierung.  
A2 zeigt die Entscheidung unter Stress.  
A3 zeigt den Preis des dauerhaften Ausstiegs.

Damit wird Risiko nicht als Volatilität erklärt, sondern als Verhaltensproblem gezeigt: Langfristige Rendite gehört nur denen, die am schlimmsten Punkt noch dabei sind.
```

### 4.1.4 A1-Abschnitt ergänzen

Im A1-Abschnitt bitte unter „Kernbotschaft“ oder nach „Interaktion“ ergänzen:

```markdown
### Rolle im A-Trio

A1 ist die **Dosis-App**.

Sie beantwortet nicht allgemein „Was ist Risiko?“, sondern konkret:

> „Wie viel ETF-Anteil kann ich so tragen, dass mich ein echter Crash nicht aus dem Markt wirft?“

A1 bleibt eigenständig. Die Dacia-/Küchen-/Urlaubs-Anker sind kein Gimmick, sondern der psychologische Kern: Prozentwerte bleiben abstrakt, Eurobeträge werden ernster, konkrete Dinge und Erlebnisse werden körperlich.

A1 liefert damit die Vorbereitung für A2 und A3:
- A2 testet, was im Crash mit dieser Dosis passiert.
- A3 zeigt, was der Ausstieg kostet, wenn die Dosis zu hoch war.
```

### 4.1.5 A2-Abschnitt ergänzen

Im A2-Abschnitt bitte unter „Kernbotschaft“ oder nach „Interaktion“ ergänzen:

```markdown
### Rolle im A-Trio

A2 ist die **Feuerprobe-App**.

Sie beantwortet:

> „Was tue ich, wenn es wirklich kracht?“

A2 bleibt eigenständig, weil sie den Stressmoment simuliert. A1 kalibriert die Dosis vor dem Crash, A2 zwingt zur Entscheidung im Crash, A3 zeigt danach die langfristigen Kosten des Verkaufs.
```

### 4.1.6 A3 neu einfügen

Bitte A3 direkt nach A2 einfügen.

Nutze dafür die Mini-Spec aus Abschnitt 5 dieses Prompts.

---

## 4.2 `docs/App-Fabrik/APP_INVENTORY.md`

### 4.2.1 Kopf / Gesamtzahl aktualisieren

Falls dort steht „21 App-Ordner“, auf „22 App-Ordner“ ändern.

Der neue reale Ordner ist:

```text
/Apps/markt-kam-zurueck/
```

### 4.2.2 Inventar-Tabelle ergänzen

In die „Vollständige Inventar-Tabelle“ einen neuen Eintrag aufnehmen, direkt nach `crash-reaktions-test` oder in alphabetischer Reihenfolge nach bestehendem Schema.

Eintrag:

```markdown
| `markt-kam-zurueck` | A3 Der Markt kam zurück. Du nicht. | Master-App / Companion im A-Trio | vollständig eigenständig; dramaturgisch eng mit A1/A2 | Scenario Chart + Decision Threshold + Translator | Historische MSCI-World-Daten (CSV), optional CPI/Realwerte; Nutzereingaben Startjahr, Verlusttoleranz, optional Depotwert/Sparrate | Hoch — historische Linie, Ausstiegsmarker, weiterlaufende Marktkurve, verpasste Erholung | Datenbasis MSCI World definieren, Startjahr-Range, Verlustschwellen-Logik, A1-Ankerliste wiederverwenden |
```

### 4.2.3 App-Familien aktualisieren

In der Zusammenfassung App-Familien ergänzen:

- `markt-kam-zurueck` bei `Scenario Chart`
- ggf. `Decision / Quiz` nicht als Quiz, sondern falls Liste offen ist: „Decision / Threshold“
- Wenn nur bestehende Kategorien genutzt werden: `Scenario Chart` reicht.

Empfohlen:

```markdown
| Scenario Chart | geburtsjahrlos, rollierende-sparplaene, crash-reaktions-test, markt-kam-zurueck, market-timing-simulator, regulatorik-dashboard (teil) |
```

### 4.2.4 Multi-Modul-/Cluster-Hinweis ergänzen

Nach „Multi-Modul-Master-Apps“ bitte neuen Abschnitt ergänzen:

```markdown
### A — Risiko überleben (Durchhalte-Trio)

| Ordner | Rolle | Fachliche Aussage |
|---|---|---|
| `/Apps/risiko-uebersetzer/` | A1 Dosis-App | Verlust muss in Euro und konkrete Dinge übersetzt werden, damit der Nutzer seine tragbare ETF-Dosis findet |
| `/Apps/crash-reaktions-test/` | A2 Feuerprobe-App | Im Crash entscheidet Verhalten, nicht Wissen |
| `/Apps/markt-kam-zurueck/` | A3 Ausstiegsfolgen-App | Der teuerste Verlust ist oft nicht der Crash, sondern die verpasste Erholung nach dem Ausstieg |
```

### 4.2.5 Prototypen-Status ergänzen

In der Prototypen-Status-Tabelle ergänzen:

```markdown
| `markt-kam-zurueck` | Kein Code vorhanden; Ordner bereits angelegt; Mini-Spec neu | Nach A1/A2 als Block-A-Trio spezifizieren |
```

---

## 4.3 `docs/App-Fabrik/ETF-App-Fabrik_Produktlandkarte_V0-2.md`

### 4.3.1 Gesamtzahl aktualisieren

Alle Aussagen wie „18 geplante Apps“ auf „19 geplante Apps“ ändern, sofern sie die Master-Shortlist meinen.

Nicht ändern, wenn historische Aussagen über frühere Versionen gemeint sind — dann besser ergänzen:

> Stand nach Block-A-Erweiterung: 19 geplante Master-Apps.

### 4.3.2 App-Familien-Zielmodell aktualisieren

Bei Scenario Chart / Decision ergänzen:

- A3 `markt-kam-zurueck`

Empfohlen:

```markdown
| **Scenario Chart** | Daten/Szenario → Transformation → Chart → Erklärung → CTA | Chart, Scenario Cards, Toggle, Legend, Tooltip, A11y-Tabelle | B2, A2, A3, B3, G1, G2 |
```

Falls A3 auch als Translator geführt werden soll, nicht extra neue Factory-Familie erfinden. A3 ist primär Scenario Chart mit Translator-Output.

### 4.3.3 Produktlandkarte-Tabelle ergänzen

In „Produktlandkarte V0.2 – Gesamtübersicht“ A3 direkt nach A2 einfügen.

Eintrag:

```markdown
| 4 | Der Markt kam zurück. Du nicht. | `markt-kam-zurueck` | A3 | Scenario Chart + Decision Threshold + psychologischer Translator | Startjahr wählen, Verlusttoleranz setzen, Ausstiegspunkt und verpasste Erholung sehen | Historische MSCI-World-Daten; optional Depotwert/Sparrate; A1-Ankerliste als Config-JSON | Hoch | Maximaler Drawdown ab Startjahr, Trigger bei Verlusttoleranz, Ausstiegswert, heutiger Marktwert, verpasste Erholung | Offen; Ordner vorhanden | Neue Mini-Spec in `/Apps/markt-kam-zurueck/` | Historische Datenbasis, Chart-Logik, A1-Ankerlisten-Wiederverwendung und Härtetest-Modus definieren. |
```

Danach Nummerierung der folgenden Apps um +1 erhöhen, wenn die Tabelle fortlaufend nummeriert ist.

### 4.3.4 Sehr kleine App-Briefings ergänzen

Nach A2 diesen Abschnitt einfügen:

```markdown
### A3 – Der Markt kam zurück. Du nicht.

- **Nutzerfrage:** Was kostet es mich, wenn ich im Verlust aussteige und nie wieder zurückkomme?
- **Kernbotschaft:** Der Durchschnitt hilft dir nicht, wenn dich der schlimmste Abschnitt aus dem Markt wirft.
- **Familie:** Scenario Chart + Decision Threshold + psychologischer Translator.
- **Inputs:** Startjahr, Verlusttoleranz, optional Depotwert oder Sparrate.
- **Outputs:** Maximaler Verlust ab Startjahr, Ausstiegsmarker, Ergebnis „durchgekommen / ausgestiegen“, verpasste Erholung bis heute, Übersetzung in konkrete Dinge/Erlebnisse.
- **Factory-Nutzen:** Standard für historische Belastungstests mit persönlichem Trigger und Ergebnisübersetzung.
- **Lücke:** Historische Datenbasis, Jahrbereich, Trigger-Logik, Härtetest-Modus und A1-Ankerlisten-Wiederverwendung definieren.
```

---

## 5. Mini-Spec für `/Apps/markt-kam-zurueck/MINI_SPEC_FROM_HAUPTDOKUMENT.md`

Bitte diese Datei exakt mit folgendem Inhalt anlegen:

```markdown
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

> „Wie viel ETF-Anteil kann ich psychologisch tragen?“

A2 fragt:

> „Was tue ich, wenn es wirklich kracht?“

A3 fragt:

> „Was kostet es, wenn ich einmal mit Verlust aussteige und nie wieder zurückkomme?“

Gemeinsamer Kernsatz des Trios:

> **Du musst nicht den Durchschnitt aushalten. Du musst deinen schlimmsten Abschnitt aushalten.**

A3 ist damit keine weitere Crash-App und kein Ersatz für den Dacia-Test. A3 zeigt die Konsequenz einer zu hohen Dosis: Der Markt erholt sich, aber der Anleger ist nach dem Verkauf nicht mehr dabei.

---

## Problem, das gelöst wird

Viele Anleger glauben:

> „Wenn es schlimm wird, verkaufe ich halt. Später kann ich ja wieder einsteigen.“

Diese App zeigt, warum dieser Satz gefährlich ist. Wer im Verlust verkauft, kommt psychologisch oft nicht zurück. Der Crash ist dann nicht das eigentliche Problem. Das eigentliche Problem ist die verpasste Erholung danach.

Der Nutzer soll erleben:

> Der Markt kam zurück. Ich nicht.

---

## Kernbotschaft

> **„Der Durchschnitt steht im Rückspiegel. Verkauft wird am Tiefpunkt.“**

Noch kürzer als Punchline:

> **„Der Markt kam zurück. Du nicht.“**

Strategischer Satz:

> **„Langfristige Rendite gehört nur denen, die am schlimmsten Punkt noch dabei sind.“**

---

## Interaktion (UX-Flow)

### Screen 1 — Einstieg

Headline:

> **Der Markt kam zurück. Du nicht.**

Subline:

> „Teste, ob du deinen eigenen Anlageweg durchgehalten hättest.“

Eingaben:

- Schieberegler oder Jahresauswahl: **Startjahr**
- Schieberegler: **Verlusttoleranz** in Prozent, z. B. –10 % bis –60 %
- Optional: Depotwert oder monatliche Sparrate, um die verpasste Erholung in Euro zu übersetzen

CTA:

> „Reise starten“

---

### Screen 2 — Die historische Reise

Die App zeigt die MSCI-World-Kurve ab dem gewählten Startjahr.

Die App berechnet:

- den maximalen zwischenzeitlichen Verlust ab Startjahr
- ob die Verlusttoleranz des Nutzers gerissen worden wäre
- den ersten Zeitpunkt, an dem der Nutzer nach eigener Regel ausgestiegen wäre

Wenn die Verlustgrenze nicht gerissen wurde:

> „Du wärst dringeblieben. Dein schlimmster Abschnitt lag bei –X %. Deine Grenze war –Y %.“

Wenn die Verlustgrenze gerissen wurde:

> „Hier wärst du ausgestiegen.“

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
> Der Markt kam zurück. Du nicht.“

Output:

- Ausstiegsdatum
- Ausstiegswert
- heutiger Wert bei Dranbleiben
- verpasste Erholung in Euro
- optional: Übersetzung in konkrete Dinge/Erlebnisse aus der A1-Ankerlogik

Beispiel-Punchline:

> „Der Verlust war schmerzhaft. Der Ausstieg war teurer.“

#### Fall B: Nutzer wäre dringeblieben

Headline:

> **Du wärst dringeblieben.**

Ergebnistext:

> „Dein schlimmster Abschnitt ab [Startjahr] lag bei –X %. Deine Grenze war –Y %.  
> Du wärst durchgekommen.“

Danach kein Triumph-Gefühl erzeugen, sondern fair ergänzen:

> „Aber nicht jedes Startjahr war so gnädig.“

CTA:

> „Zeig mir den Härtetest“

---

### Screen 4 — Härtetest

Der Härtetest ist optional und folgt erst nach dem Ergebnis des vom Nutzer gewählten Startjahrs.

Ziel: Manipulationsvorwurf vermeiden.

Nicht direkt mit dem schlimmsten Crashjahr starten. Erst wählt der Nutzer sein eigenes Startjahr. Danach darf die App zeigen:

> „Das härteste Startjahr seit Beginn der Daten hätte dir –X % zugemutet.“

Headline:

> **Das schwerste Startjahr für deine Nerven**

Ergebnistext:

> „Wenn du langfristig investieren willst, musst du nicht den Durchschnitt aushalten. Du musst den schlimmsten Abschnitt aushalten.“

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
- Status: „durchgekommen“ oder „ausgestiegen“
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
4. Wenn nein: Ergebnis „durchgekommen“.
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

> „Wie viel Verlust kann ich tragen, ohne zu verkaufen?“

A3 nutzt A1 nur als Verstärker:

- A1-Ankerliste kann wiederverwendet werden.
- A3 kann verpasste Erholung in Dacia/Küche/Urlaub übersetzen.
- A1 kann optional Depotwert/ETF-Anteil als Kontext liefern.
- A3 darf A1 aber nicht ersetzen.

Empfohlene Übergabe von A1 zu A3:

> „Du kennst jetzt deine tragbare Dosis. Willst du sehen, was passiert, wenn du sie überschreitest?“

Button:

> „Zeig mir den Ausstieg“

---

## Beziehung zu A2 Crash-Reaktions-Test

A2 bleibt eigenständig.

A2 ist die Feuerprobe-App:

> „Was tue ich im Crash?“

A3 zeigt die langfristige Folge einer Verkaufsentscheidung.

Empfohlene Übergabe von A2 zu A3:

> „Verkaufen fühlt sich wie Rettung an. Aber was passiert danach?“

Button:

> „Zeig mir, was danach passiert“

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
```

---

## 6. Commit-Erwartung

Nach Umsetzung bitte:

1. `git diff` prüfen.
2. Sicherstellen:
   - A1 bleibt eigenständig.
   - A2 bleibt eigenständig.
   - A3 ist ergänzt.
   - Gesamtzahl ist konsistent.
   - `markt-kam-zurueck` ist in Inventar und Produktlandkarte enthalten.
   - Keine technische APP_SPEC erzeugt.
3. Commit erstellen.

Empfohlene Commit-Message:

```text
docs(app-fabrik): add A3 market-returned app to Block A trio

- add A3 "Der Markt kam zurück. Du nicht." as exit-consequence app
- reframe Block A as Dosis → Feuerprobe → Ausstiegsfolge
- keep A1 Risiko-Übersetzer as standalone dose-calibration app
- update app inventory and product map for markt-kam-zurueck
- add MINI_SPEC_FROM_HAUPTDOKUMENT for A3
```

---

## 7. Abschlussnotiz für Claude

Diese Änderung ist eine Architekturentscheidung, keine Stilkorrektur.

Nicht aus A1/A2/A3 drei lose Risiko-Tools machen.  
Der entscheidende Zusammenhang lautet:

> **A1:** Wie viel kannst du verlieren, ohne zu verkaufen?  
> **A2:** Was tust du, wenn dieser Verlust kommt?  
> **A3:** Was kostet es, wenn du doch verkaufst?

Und darüber steht:

> **Du musst nicht den Durchschnitt aushalten. Du musst deinen schlimmsten Abschnitt aushalten.**
