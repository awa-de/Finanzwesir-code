# MINI_SPEC_FROM_HAUPTDOKUMENT — Plan-Generator

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC

---

## H1 – Plan-Generator

**Slug:** `plan-generator`
**Früherer Arbeitstitel:** ETF-Reifegrad-Test & Start-Konfigurator
**KI-Konsens:** ★ (ChatGPT Meta-Idee)
**Folienbezug:** Gesamtpräsentation (Finale)
**Funnel-Position:** CTA / Abschluss der Heldenreise
**Priorität:** #18

## Steuerungsblock: Zweck, Barriere, Prüfregeln

<!-- Steuerungsblock-Quelle: AP-22-Klärung (docs/steering/patches/AP-22_plan-generator_seed-sperre_klaerung_Ergebnis.md) + Nutzerentscheidung im AP-23-Auftrag + redaktionelle Umsetzung in AP-23a. -->
<!-- Die zentrale Seed-Datei (Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md) wurde bewusst nicht geändert und ist für plan-generator nicht die Provenienz dieses Blocks. -->
<!-- Dieser lokale Steuerungsblock ist ein dokumentierter Sonderfall für `plan-generator`: Er stammt nicht als zeilengetreuer Transfer aus der zentralen Seed-Datei, sondern aus AP-22-Klärung, Nutzerentscheidung im AP-23-Kontext und AP-23a-Provenienzkorrektur. -->

**Rolle:** H1 / Funnel-Finale — Abschlussmodul, zugleich als Haupt-App geführt  

**Diese App existiert, um:**  
den Nutzer am Ende der Entscheidungs-Reise von gesammeltem Wissen zu einem einzigen, klein dimensionierten nächsten Schritt zu führen. Sie erzeugt keinen vollständigen Anlageplan, keine individuelle Beratung und keine automatische Produktempfehlung. Sie ist das Finale des Funnels: Erkenntnisse werden in einen vorsichtigen, redaktionell gerahmten Startvorschlag übersetzt.

**Zu entfernende psychologische Barriere:**  
Entscheidungslähmung durch Informationsüberfluss nach Durchlaufen mehrerer Apps. Der Nutzer hat viele Einzel-Erkenntnisse gesammelt, aber keinen klaren ersten Schritt vor Augen. Die App soll diese Lähmung in einen kleinen, selbst gewählten Startimpuls übersetzen.

**Falscher Glaubenssatz vorher:**  
„Ich brauche noch mehr Wissen, bevor ich anfangen kann.“

**Zielzustand nach der App:**  
„Ich habe einen konkreten, klein dimensionierten, selbst gewählten nächsten Schritt vor Augen. Wenn ich noch nicht bereit bin, weiß ich, zu welcher Funnel-Station ich zurückkehren muss.“

**Muss-Kriterien für jede Umsetzung:**  
- Vorherige Funnel-Stationen (insbesondere A1 Verlusttoleranz, B3 Timing-Glauben, C2 Diversifikationsverständnis, D1 ETF-Namenslesekompetenz) als Kontext voraussetzen, nicht wiederholen.
- Reifegrad-Filter ernst nehmen: Wer zentrale Fragen noch nicht geklärt hat, bekommt keinen Plan, sondern einen Rückverweis in den Funnel.
- Output bleibt klein dimensioniert und als Startvorschlag gerahmt, nicht als Ergebnis oder Beratung.
- Offene Fragen zum Output-Modell (siehe Entscheidungsblock in der MINI_SPEC) vor jeder APP_SPEC-Erstellung mit Albert klären.

**Nicht-Ziele / harte Verbote:**  
- Kein automatisches Ausfüllen aus App-Namen.
- Keine individuelle Anlageberatung.
- Keine Produktempfehlung aus dem Nichts.
- Keine konkrete ETF-/ISIN-/WKN-Empfehlung als personalisiertes Ergebnis.
- Keine Waschzettel-Logik ohne spätere redaktionelle Freigabe.
- Keine APP_SPEC-Ableitung, bevor das Output-Modell im Entscheidungsblock geklärt ist.

---

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

## Warnhinweis für spätere APP_SPEC-Erstellung

Diese MINI_SPEC enthält einen redaktionell geklärten Steuerungsblock auf Basis von AP-22 und der Nutzerentscheidung im AP-23-Kontext. Die zentrale Seed-Datei wurde bewusst nicht geändert. Der Block konserviert den aktuellen Klärungsstand, ersetzt aber keine spätere APP_SPEC-Prüfung.

Vor einer APP_SPEC-Erstellung muss ein LLM ausdrücklich prüfen:

- Ist diese App eine eigenständige Haupt-App, ein Companion-Modul, ein Funnel-Finale oder eine Visualisierung?
- Welche Parent-App oder Nutzerreise ist betroffen?
- Deckt der Steuerungsblock nur den aktuellen Seed-Stand ab oder braucht die spätere APP_SPEC eine strukturelle Neubewertung?
- Darf aus dieser MINI_SPEC überhaupt direkt eine APP_SPEC entstehen?

STOP-Regel:
Wenn diese Rollenprüfung nicht durchgeführt wurde, darf keine APP_SPEC erstellt werden.

Zusätzlich für `plan-generator`:
Auch wenn die Rolle als Funnel-Finale geklärt ist, bleibt das Output-Modell offen. Der Entscheidungsblock „Wie konkret darf der finale Plan werden?" muss vor jeder APP_SPEC-Erstellung bearbeitet werden.

## Offener Entscheidungsblock: Wie konkret darf der finale Plan werden?

Dieser Block ist bewusst offen. Er ist kein fertiges APP_SPEC-Konzept und kein Bauauftrag.

Der Plan-Generator ist das Funnel-Finale: Er soll den Nutzer am Ende der Entscheidungsreise aus der Entscheidungslähmung holen und zu einem kleinen nächsten Schritt führen. Gleichzeitig darf er keine individuelle Anlageberatung, keine ungeprüfte Produktempfehlung und keinen automatischen Waschzettel erzeugen.

Wenn aus dieser MINI_SPEC später eine APP_SPEC oder eine App gebaut werden soll, muss dieser Entscheidungsblock zuerst mit dem Nutzer iterativ besprochen werden. Ein LLM darf diese Fragen nicht stillschweigend selbst entscheiden.

### 1. Wie konkret darf der finale Plan werden?

Optionen:

A) Generisch: „Starte mit einem breit gestreuten Welt-ETF-Sparplan."
B) Musterhaft: „Beispiel: 100 € monatlich in einen globalen Aktien-ETF."
C) Konkret mit Produktnamen: „100 € monatlich in FTSE All World ETF."

Empfehlung: B — musterhaft, aber hart als Beispiel gerahmt. Nicht C als personalisiertes Ergebnis.

Begründung: Der Plan muss konkret genug sein, um Handlungsfähigkeit auszulösen, darf aber nicht so konkret wirken, dass er als individuelle Anlageempfehlung verstanden wird.

Offene Nutzerentscheidung: Soll der finale Output eher generisch, musterhaft oder produktkonkret sein?

### 2. Dürfen konkrete ETF-Namen genannt werden?

Optionen:

A) Keine ETF-Namen im Ergebnis.
B) Nur ETF-Kategorien nennen, z. B. „globaler Aktien-ETF" oder „Geldmarkt-ETF".
C) Konkrete ETF-Namen nur in einem separaten, redaktionell gepflegten Waschzettel- oder Umsetzungsbereich nennen.

Empfehlung: B im Plan-Generator. C später nur in einem ausdrücklich redaktionell gepflegten Waschzettel-Kontext.

Begründung: Konkrete ETF-Namen im direkten Ergebnis erhöhen das Risiko, dass der Output wie eine persönliche Empfehlung wirkt.

Offene Nutzerentscheidung: Soll der Plan-Generator selbst konkrete ETF-Namen nennen oder nur Kategorien?

### 3. Darf der Plan einen Euro-Betrag nennen?

Optionen:

A) Kein Betrag.
B) Beispielbetrag, z. B. „zum Beispiel 50–100 € monatlich".
C) Der Nutzer wählt den Startbetrag selbst; die App spiegelt diesen Betrag zurück.
D) Die App berechnet einen Betrag.

Empfehlung: C, optional mit B als Beispielrahmen. Nicht D.

Begründung: Ein selbst gewählter Betrag bleibt beim Nutzer. Ein berechneter Betrag wirkt wie Beratung oder Finanzplanung.

Offene Nutzerentscheidung: Soll die App Beträge nur spiegeln, beispielhaft rahmen oder komplett vermeiden?

### 4. Was ist der Output: Empfehlung, Beispiel oder Startvorschlag?

Optionen:

A) Empfehlung.
B) Beispiel.
C) Startvorschlag.
D) Persönlicher Plan.

Empfehlung: C mit klarer Beispiel-Kennzeichnung. Nicht A, nicht D.

Begründung: „Empfehlung" und „persönlicher Plan" erzeugen Beratungsnähe. „Startvorschlag" passt besser zur Rolle als Funnel-Finale.

Offene Nutzerentscheidung: Wie soll der Output sprachlich etikettiert werden?

### 5. Was passiert, wenn der Nutzer noch nicht reif ist?

Optionen:

A) Trotzdem einfachen Plan ausgeben.
B) Kein Plan; stattdessen Rückverweis auf passende Funnel-Apps.
C) Warnung plus Mini-Plan.

Empfehlung: B.

Begründung: Der Plan-Generator darf die vorherigen Schutzmechaniken nicht kurzschließen. Wer zentrale Fragen noch nicht geklärt hat, braucht keinen Plan, sondern den Rückweg zur passenden Station.

Offene Nutzerentscheidung: Soll bei mangelnder Reife konsequent kein Plan ausgegeben werden?

### 6. Soll der Plan-Generator später einen echten Waschzettel liefern?

Optionen:

A) Ja, direkter Waschzettel mit konkreten Produkten.
B) Nein, nur generischer Startplan.
C) Verweis auf einen separaten redaktionellen Waschzettel.

Empfehlung: C.

Begründung: Der Plan-Generator kann den Übergang zu einem Waschzettel vorbereiten, sollte ihn aber nicht automatisch erzeugen. Ein echter Waschzettel braucht eine eigene redaktionelle Freigabe.

Offene Nutzerentscheidung: Soll der Waschzettel Teil dieser App werden oder ein separater redaktioneller Anschluss?

### LLM-STOP-Regel

Wenn dieser Entscheidungsblock nicht ausdrücklich mit dem Nutzer besprochen wurde, darf aus dieser MINI_SPEC keine APP_SPEC und keine App-Bau-Anweisung abgeleitet werden.

Ein späteres LLM muss zuerst die offenen Nutzerentscheidungen 1–6 klären und dokumentieren.

### Aufbau: Zwei Stufen

**Stufe 1 – ETF-Reifegrad-Test (5 Fragen):**
1. Weißt du, wie viel Verlust du ertragen kannst? (→ App A1)
2. Glaubst du noch, dass du den richtigen Zeitpunkt erwischen kannst? (→ App B3)
3. Hast du verstanden, warum 1 ETF reichen kann? (→ App C2)
4. Kannst du einen ETF-Namen lesen? (→ App D1)
5. Hast du einen konkreten Betrag im Kopf?

Ergebnis:
- „Du bist bereit." → direkt zu Stufe 2
- „Du blockierst dich selbst." → personalisierte App-Empfehlung + zurück in den Funnel

**Stufe 2 – Start-Konfigurator (3 Fragen):**
1. Monatlicher Betrag
2. Verlusttoleranz (Slider, aus App A1 vorausgefüllt wenn vorhanden)
3. Einfach (1 ETF) vs. Komplex (2–4 ETFs)

**Output – ultraklar:**
> „Investiere 100 € monatlich in einen FTSE All World ETF. Fertig."

**CTA:** „Jetzt umsetzen"

---

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: H – Plan geben & CTA
- App-ID: H1
- App-Titel: Plan-Generator
- Früherer Arbeitstitel: ETF-Reifegrad-Test & Start-Konfigurator
- Slug: `plan-generator`
- Zugeordneter App-Ordner: `/Apps/plan-generator/`
- Modulrolle: Haupt-App
- Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC
