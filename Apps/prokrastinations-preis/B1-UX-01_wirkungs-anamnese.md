# B1-UX-01 — Psychologische Wirkungs-Anamnese der Prokrastinationspreis-App

Stand: 2026-06-24 | AP: B1-UX-01 | Geändert von: Claude

---

## 1. Status und Metadaten

| Feld | Wert |
|---|---|
| Status | **GELB** |
| Blocker | nein |
| Analysierter Stand | app.js + app.css (AP-18 ✅ 2026-06-24), APP_SPEC V2.9, stations.de.json v2.1 |
| Nicht analysiert | produktive CSV (fehlt — AP-DATA-09 offen), NVDA/VoiceOver-Volltest, Redaktions-Gate |
| Kein Code geändert | ✓ |

**GELB-Begründung:** Die Anamnese ist vollständig möglich. Die technische Basis ist stabil. Zwei der fünf Hauptbefunde sind bereits durch den aktuellen Daten- und Redaktionsstand ausgelöst (kein Code-Bug, redaktionelle Ursache) — der dramaturgische Bogen ist im Ist-Zustand nicht vollständig ausführbar.

---

## 2. Gelesene Dateien

| Datei | Zweck |
|---|---|
| `Apps/prokrastinations-preis/APP_SPEC.md` (V2.9) | Soll-Dramaturgie, Stationsrollen, Screen-Texte, Erkenntnishierarchie, §23 |
| `Apps/prokrastinations-preis/config/stations.de.json` | Stationeninhalt, Quellenstatus, Flags |
| `Apps/prokrastinations-preis/app.js` | Screen-Rendering, Stationsfilter, Headline-Texte, Ist-Struktur |
| `Apps/prokrastinations-preis/app.css` | Visuelles System, Typografie, Layout-Klassen |

---

## 3. Kurzbefund

Die App trägt die richtige Idee — aber noch nicht den dramaturgischen Spannungsbogen.

Das Konzept ist klar und psychologisch valide: historische Zeitreise ohne Endwissen, Anti-Hindsight-Bias, kontrollierter Informationsentzug, ruhige Beweisführung. Die technische Implementierung ist stabil.

Das Problem liegt auf drei Ebenen:

1. **Datenlücke:** Vier von sieben Stationen sind `source_claimed_unchecked` und werden gefiltert. Der verbleibende Bogen hat keine "erste Unruhe", keine "falsche Auflösung" — die zwei psychologisch wichtigsten Stufenstufen fehlen. Die Mindeststationsanzahl (5) wird nicht erreicht.

2. **Copy-Abweichungen:** Screen-1-Subline und Screen-2-Headline weichen vom geplanten Solltext ab. Screen 1 kommuniziert Datenqualität statt Reiseversprechen. Screen 2 verrät das Fazit der Zeitreise bevor der Nutzer auch nur eine Station gesehen hat.

3. **Visuelles Vakuum:** Alle vier Screens sind optisch strukturell identisch. Es gibt kein visuelles Konzept, das den dramaturgischen Bogen spiegelt — keinen Kontrast zwischen Zeitreise und Reveal, keine Hierarchie die Gewicht verteilt.

---

## 4. Psychologischer Sollpfad der App (Rekonstruktion aus §23, §16)

Die App ist eine Antwort auf Hindsight Bias: der Nutzer glaubt, damals wäre alles offensichtlicher gewesen. Die App widerlegt das durch Erfahrung, nicht durch Erklärung.

**Akt 1 — Aufbruch (Screen 1):**
Nutzer personalisiert die Reise ("das ist mein Geld, meine Rate"). Dann springt er 10 Jahre zurück — ohne das Wissen von heute. Das muss als emotionale Einladung zur Zeitreise ankommen, nicht als Datenbank-Demo.

**Akt 2 — Reise ohne Endwissen (Screen 2):**
Station für Station: ruhiger Start → erste Unruhe → Zermürbung → Klimax (Crash) → falsche Erleichterung → letzter Wackler → finaler Schritt. Der Nutzer klickt sich durch echte historische Momente, ohne zu wissen wie es ausgeht. Jede Station kostet etwas. Jeder Klick ist ein Micro-Commitment.

**Akt 3a — Reveal (Screen 3):**
Erst jetzt sieht der Nutzer den vollständigen Chart. KPI-Cards zeigen das Ergebnis. Der Kontrast zwischen "In Echtzeit fühlte sich das schwer an" und "Im Rückblick sieht es einfach aus" wird erlebbar. Dieser Moment braucht visuelles Gewicht.

**Akt 3b — Transfer (Screen 4):**
Die Erkenntnis wird auf heute übertragen. "Heute beginnt wieder ein Chart, dessen Ende niemand kennt." Kein Druck, keine Prognose — aber ein klarer Handlungsimpuls. Der CTA muss funktionieren.

---

## 5. Screenanalyse — Soll vs. Ist

### Screen 1 — Einstieg / Teleportation

**Soll (APP_SPEC §16.2):**
> Headline: „Vor 10 Jahren war der beste Zeitpunkt. Aber wie hätte sich das damals angefühlt?"
> Subline: „Wir springen 10 Jahre zurück. Du nimmst deine Monatsrate mit — aber nicht das Wissen von heute."
> Button: „10 Jahre zurückspringen"

**Ist (app.js Z.338–343):**
> Headline: „Vor 10 Jahren wäre besser gewesen. Was ist mit heute?"
> Subline: „Wir rechnen nicht mit Wunschwerten. Wir nehmen echte MSCI-World-Monatsdaten."
> Button: „10 Jahre zurückspringen" ✓

**Wirkungsanalyse:**

Die Ist-Headline ist kürzer und sachlicher — sie stellt eine Frage, die der Nutzer wahrscheinlich schon bejaht. Die Soll-Headline stellt eine andere Frage: "Wie hätte sich das damals angefühlt?" Das ist der entscheidende Unterschied — sie lädt zur Empathie mit dem damaligen Anleger ein, bevor irgendeine Zahl oder Grafik erscheint.

Die Ist-Subline ist eine Datenqualitätserklärung. Sie kommuniziert: "Unsere Daten sind gut." Das ist eine defensive Aussage gegen Skepsis — aber kein Reiseversprechen. Die Soll-Subline sagt etwas ganz anderes: "Du nimmst deine Monatsrate mit — aber nicht das Wissen von heute." Damit ist der psychologische Kern der App in einem Satz formuliert. Der Nutzer weiß dann: das hier ist kein Ergebnischart, das ist eine Zeitreise.

Der Slider und der Button sind korrekt implementiert. ✓

**Psychologische Bewertung:** Einstieg zu schwach. Der Nutzer versteht noch nicht, was ihn erwartet. Das Interesse-Level bei Screen-1-Abschluss ist niedriger als es sein müsste.

---

### Screen 2 — Zeitreise / Unsicherheit

**Soll (APP_SPEC §16.1, §23.12):**
Der Nutzer soll Station für Station eine historische Reise erleben — ohne zu wissen, wie es ausgeht. Der Bogen: ruhiger Start → erste Unruhe → Zermürbung → Klimax → falsche Auflösung → finaler Wackler → Reveal.

**Ist:**

*Headline (Z.388):* `'Im Rückblick sieht es klar aus. In Echtzeit war es eine Entscheidung.'`

Das ist der wichtigste Satz der gesamten App-Dramaturgie — und er erscheint als H2 oben auf Screen 2, bevor der Nutzer irgendetwas erlebt hat. Der Nutzer liest das Fazit der Zeitreise, bevor er die erste Station sieht.

Das invertiert den Anti-Hindsight-Mechanismus: der Nutzer kommt mit Wissen ("Im Rückblick...") in eine Situation, die er ohne Wissen erleben soll.

*Stationsbogen (filterStationsForWindow, Z.800–806):*
Die Filterfunktion entfernt `source_claimed_unchecked`-Stationen. Im aktuellen stations.de.json sind 4 von 7 Stationen in diesem Status:

| Station | Datum | Status | Ergebnis |
|---|---|---|---|
| Erste Unruhe (shock) | Feb 2018 | source_claimed_unchecked | **gefiltert** |
| Zermürbung (doubt) | Dez 2018 | source_claimed_unchecked | **gefiltert** |
| Klimax (crisis) | Mär 2020 | primary_verified | aktiv ✓ |
| Falsche Auflösung (relief) | Nov 2020 | source_claimed_unchecked | **gefiltert** |
| Geopolitischer Schock | Feb 2022 | primary_verified | aktiv ✓ |
| Letzter Wackler | Apr 2025 | primary_verified | aktiv ✓ |
| Final Reveal | dynamic | derived_from_app_data | aktiv ✓ |

Verbleibende Reise: Klimax → Wackler → Wackler → Reveal. Kein Anfang, keine Eskalation, keine falsche Auflösung.

Der Editorial Gate (checkEditorialGate, Z.174) erkennt das: `EditorialDegraded` wird geloggt (3 < 5 Stationen). Die App läuft trotzdem, aber in degradiertem Zustand.

*Chart-Mechanik:* technisch korrekt (feste 10-Jahres-X-Achse, wachsende Linie bis zur aktuellen Station, kein Endwissen) ✓

*Micro-Commitment Button:* „Weiter investiert bleiben" ✓ | „Ergebnis ansehen" bei letzter Station ✓

**Psychologische Bewertung:** Die Zeitreise kann ihre Wirkung nur entfalten wenn der Bogen vollständig ist. Im Ist-Zustand beginnt sie mitten im Strom (Klimax) ohne Anlauf. Die falsche Auflösung — psychologisch das wichtigste Werkzeug — fehlt vollständig.

---

### Screen 3 — Reveal / Rückblick

**Soll (APP_SPEC §16.2, §23.6):**
Vollständiger Chart. KPI-Cards. Aha-Moment. Visuell dominant.

**Ist (Z.417–445):**
- Headline: `'Jetzt erst sieht es einfach aus.'` ✓ (spec-konform)
- Subline: `'Die Strecke wirkt im Rückblick ruhiger, weil du das Ende jetzt kennst. Vor 10 Jahren kannte sie niemand.'` ✓ (spec-konform)
- KPI-Cards (eingezahlt / depotwertHeute / differenz) ✓
- AssumptionsBox ✓
- Vollständiger Chart mit VertikaleLinie und Stationenmarkern ✓

Der Reveal-Inhalt ist korrekt. Das Problem ist die visuelle Führung: Screen 3 sieht optisch identisch aus wie Screen 1 und 2. Es gibt keinen visuellen Kontrast, der signalisiert: "Jetzt ist alles anders. Du siehst das erste Mal das Ende."

Die KPI-Karte `depotwertHeute` ist die Hauptzahl (APP_SPEC §23.6 Tufte-Regel), wird aber nicht visuell priorisiert — alle drei KPI-Cards sind identisch gestylt.

**Psychologische Bewertung:** Der Inhalt stimmt. Der Moment fehlt. Ohne visuellen Kontrast zwischen "Zeitreise" und "Reveal" fühlt sich Screen 3 wie eine weitere Station an.

---

### Screen 4 — Transfer auf heute

**Soll (APP_SPEC §16.2, §23.18):**
> Headline: „Heute beginnt wieder ein Chart, dessen Ende niemand kennt."
> Text: Die nächsten 10 Jahre werden anders schwierig sein. Aber sie beginnen genauso: ohne fertigen Chart.
> CTA: „Heute Marktzeit sammeln →" oder „Meine nächsten 10 Jahre starten"

**Ist (Z.456–468):**
- Headline ✓ (spec-konform)
- Bodytext ✓ (spec-konform)
- CTA: `'Heute Marktzeit sammeln →'` mit `href=''` (NB-1)
- Zurück-Button ✓

Der Transfer-Text ist stark. Das Narrativ-Ende funktioniert inhaltlich. Das Problem: `href=''` ist ein leeres Ziel. Der Nutzer klickt und bleibt auf der Seite — ohne Reaktion, Fehlermeldung oder nächsten Schritt. Das untergräbt die Handlungsbereitschaft im psychologisch wichtigsten Moment.

**Psychologische Bewertung:** Inhaltlich bereit. Funktional gebrochen. Die Motivation des Nutzers trifft eine Sackgasse.

---

## 6. Hauptbefunde (max. 5)

### Befund 1 — Dramaturgischer Bogen bricht an der Quelle
**Befund:** Vier von sieben Stationen (Feb 2018, Dez 2018, Nov 2020 + deren Quellen) sind `source_claimed_unchecked` und werden korrekt gefiltert. Die verbleibende Reise hat kein Anlauf, keine Eskalation, keine falsche Auflösung. Nur: Klimax → Wackler → Wackler → Reveal.

**Wo:** `filterStationsForWindow()` (app.js Z.800–806) + `stations.de.json` Quellenstatus

**Warum schwach:** Die dramaturgische Wirkung der App basiert auf dem vollständigen Bogen (§23.12). Die falsche Auflösung (Nov 2020) ist das psychologisch wichtigste Element — der Moment, in dem der Nutzer glaubt die Krise sei überwunden, und dann kommt 2022. Ohne diesen Moment wirkt die Reise als kurze, harte Abfolge ohne emotionale Kurve.

**Kategorie:** Datenlücke / redaktioneller Punkt

**Jetzt relevant?** Ja — vor allem anderen. Die Redaktionsarbeit (Quellen verifizieren) ist Voraussetzung für jede UX-Wirkungssteigerung.

**Folge-AP:** B1-UX-03 — Redaktionelle Quellenverifizierung (4 Stationen source_claimed_unchecked → primary_verified)

---

### Befund 2 — Screen-2-Headline verrät das Fazit vor der Reise
**Befund:** Die H2-Headline auf Screen 2 lautet `'Im Rückblick sieht es klar aus. In Echtzeit war es eine Entscheidung.'` — dieser Satz erscheint oben auf dem Screen, bevor der Nutzer die erste Station sieht.

**Wo:** app.js Z.388

**Warum schwach:** Das ist der Kern-Aha-Satz der App — er ist für den Reveal-Moment nach der Zeitreise gedacht, nicht für den Einstieg in sie. Ein Nutzer der diesen Satz als Erstes liest, tritt die Zeitreise mit dem Fazit im Kopf an. Der Anti-Hindsight-Mechanismus (Nutzer soll ohne Endwissen erleben) wird im Einstieg bereits unterlaufen.

APP_SPEC §16.2 sieht diese Formulierung nicht als Screen-2-H2 vor. Die Spec gibt keine explizite Screen-2-Headline an, weil Screen 2 als fortlaufende Zeitreise gedacht ist — der Nutzer orientiert sich an der aktuellen Station, nicht an einer statischen Überschrift.

**Kategorie:** psychologische Schwäche / Text-/Copy-Schwäche

**Jetzt relevant?** Ja — direkt nach Befund 3 (Subline). Einzeiliger Fix, hohe Wirkung.

**Folge-AP:** B1-UX-02 — Copy-Revision Screen 1+2

---

### Befund 3 — Screen-1-Subline: Datenqualität statt Reiseversprechen
**Befund:** Zwei Abweichungen auf Screen 1:
1. Headline: `'Vor 10 Jahren wäre besser gewesen. Was ist mit heute?'` statt `'Vor 10 Jahren war der beste Zeitpunkt. Aber wie hätte sich das damals angefühlt?'` (§16.2)
2. Subline: `'Wir rechnen nicht mit Wunschwerten. Wir nehmen echte MSCI-World-Monatsdaten.'` statt `'Wir springen 10 Jahre zurück. Du nimmst deine Monatsrate mit — aber nicht das Wissen von heute.'` (§16.2)

**Wo:** app.js Z.338–343

**Warum schwach:** Die Ist-Subline ist eine defensiv-technische Aussage ("unsere Daten sind echt"). Die Soll-Subline ist das Reiseversprechen mit dem psychologischen Schlüssel: "ohne das Wissen von heute." Nur dieser Satz erklärt dem Nutzer, was ihn erwartet und warum es wichtig ist.

Die Ist-Headline ist kürzer und oberflächlich korrekt — aber die Soll-Headline stellt die entscheidende Frage: "Wie hätte sich das damals angefühlt?" Sie lädt zur Empathie ein, bevor Zahlen erscheinen.

**Kategorie:** Text-/Copy-Schwäche

**Jetzt relevant?** Ja — direkter Fix, höchste Einstiegswirkung.

**Folge-AP:** B1-UX-02 — Copy-Revision Screen 1+2

---

### Befund 4 — Kein dramaturgisch differenziertes visuelles Design
**Befund:** Alle vier Screens sind optisch strukturell identisch. Es gibt keine visuelle Differenzierung zwischen:
- Screen 1 (Personalisierung) vs. Screen 2 (Zeitreise)
- Screen 2 (Unsicherheit, offener Chart) vs. Screen 3 (Reveal, vollständiger Chart)
- Screen 3 (Rückblick) vs. Screen 4 (Transfer auf heute)

**Wo:** app.css — alle Screens nutzen dieselben Klassen (`.fw-app__screen-headline`, `.fw-app__screen-subline`, `.fw-app__btn--next`)

**Warum schwach:** Der Reveal-Moment (Screen 3) soll nach der Spec visuell dominant sein. Die Hauptzahl (`depotwertHeute`) soll groß erscheinen. Screen 3 soll sich anders anfühlen als die Zeitreise.

Aktuell: Ein Nutzer der zu Screen 3 kommt, sieht dieselbe Schrift, dieselben Buttons, dieselben Proportionen wie auf Screen 2. Es gibt keinen Wahrnehmungsumschlag, kein "Jetzt ist alles anders."

CSS-Custom-Properties sind vorhanden (`--fw-color-primary`, `--fw-color-surface` etc.), aber es gibt keine screen-spezifische oder phasenspezifische visuelle Logik.

**Kategorie:** visuelle Führungsschwäche / CI-/Designproblem / Tailwind/CSS-Frage (Folgearbeit)

**Jetzt relevant?** Mittel — nach Copy-Fixes. Substanzielle Arbeit, braucht eigenen AP.

**Folge-AP:** B1-UX-04 — Visuelles Design-Konzept: screen-spezifische Hierarchie, Reveal-Kontrast, Tailwind/CSS-Integration

---

### Befund 5 — CTA href="" — Transfer bricht physisch ab
**Befund:** Das finale CTA-Element auf Screen 4 (`a.fw-app__cta`) hat `href=''` (app.js Z.464–468). Ein Klick löst kein Verhalten aus oder navigiert zur Seite selbst.

**Wo:** app.js Z.464–468

**Warum schwach:** Screen 4 ist der Transfer-Moment — der Nutzer hat die Zeitreise absolviert, hat den Reveal erlebt, hat den Brückensatz gelesen ("Heute beginnt wieder ein Chart...") und klickt auf "Heute Marktzeit sammeln →". Dann: nichts. Der stärkste psychologische Moment der App endet in einer Sackgasse.

Dieses Problem ist dokumentiert (NB-1 aus AP-17a), gilt als Nicht-Blocker und ist redaktionell/produktseitig abhängig (E-04: Ziel-URL im Ghost-/Produktkontext unbekannt). Es ist kein Code-Fehler — sondern eine offene Produktentscheidung.

**Kategorie:** Produktentscheidung / Backlog

**Jetzt relevant?** Niedrig für diesen AP, aber hoch für den Produktlaunch. Kann erst gelöst werden wenn E-04 (CTA-Ziel) entschieden ist.

**Folge-AP:** B1-UX-05 — CTA + Funnel-Anschluss (Ghost-Produkt-Kontext, E-04, finale Ziel-URL)

---

## 7. Klassifikation offener Punkte (Nicht-Befunde)

Diese Punkte wurden bewusst nicht als Hauptbefunde behandelt:

| Punkt | Klassifikation |
|---|---|
| G1: `href=''` am finalen CTA | Produktentscheidung (E-04) — dokumentiert NB-1 |
| `source_claimed_unchecked` in Stationen | Redaktioneller Punkt — Hauptbefund 1 |
| Produktive CSV fehlt (AP-DATA-09) | Datenlücke — kein UX-Befund |
| Error-State-d-Harness | Testharness-Lücke — nicht isolierbar, kein Blocker |
| Empty-Journey (renderEmptyJourney) | Backlog — definiert, nicht implementiert (APP_SPEC §12) |
| NVDA/VoiceOver-Volltest | QA-offen — aus AP-18 |
| showScreen(3,false)-Hardening | Low-Priority-Hardening — theoretisch, nicht auslösbar |
| Draw-Animation zwischen Stationen | Backlog — bewusst offen (⏳ in §16.3 Status-Tabelle) |
| Screen 2: Layout-Reihenfolge (Chart vor/nach Stationstext) | Implementierungsdetail — geringe psychologische Wirkung |

---

## 8. Ausdrücklich nicht geprüft oder gelöst in diesem AP

- kein Code geändert
- keine CSS-Regeln geändert
- kein Tailwind eingebaut
- keine Stationen bearbeitet
- keine APP_SPEC geändert
- kein Redaktions-Gate geprüft (REDAKTIONS_GATE.md nicht gelesen)
- keine produktive CSV geprüft oder verarbeitet
- keine QA oder Test-Ausführung
- kein Abschlussritual
- keine Commit-Message

---

## 9. Empfohlene Folge-APs

Die Folge-APs sind aus dem tatsächlichen Befund abgeleitet, in Prioritätsreihenfolge:

### B1-UX-02 — Copy-Revision Screen 1 + Screen 2
**Was:** Screen-1-Headline und -Subline auf §16.2 setzen. Screen-2-Headline ersetzen oder entfernen (nicht das Fazit vorwegnehmen).
**Typ:** Text-/Copy-Revision
**Aufwand:** 1 Datei (app.js), minimal, Light-Gate
**Voraussetzung:** keine

### B1-UX-03 — Redaktionelle Quellenverifizierung für 4 Stationen
**Was:** Stationen Feb 2018 (Business Insider), Dez 2018 (Wirtschaftswoche), Nov 2020 (Tagesschau), Feb 2022 — Quellen identifizieren, als `primary_verified` oder `secondary_verified` einstufen, sourceUrl setzen.
**Typ:** Redaktioneller AP — reine Albert-Arbeit, kein Code
**Aufwand:** Redaktionsrecherche, dann 1 JSON-Edit
**Voraussetzung:** Albert entscheidet welche Quellen akzeptiert werden

### B1-UX-04 — Visuelles Design-Konzept: Hierarchie + Reveal-Kontrast
**Was:** Dramaturgisch differenziertes CSS/Tailwind-Konzept: Screen-2-Modus (offene Reise), Screen-3-Moment (Reveal dominant), Hauptzahl `depotwertHeute` hervorheben, CTA-Gewicht.
**Typ:** CSS-/Tailwind-AP, Full-Gate
**Aufwand:** substanziell (neues CSS-Konzept erforderlich)
**Voraussetzung:** CI-Entscheidungen (Farben, Typografie-Skala)

### B1-UX-05 — CTA + Funnel-Anschluss
**Was:** E-04 abschließen (welcher CTA-Text), Ziel-URL im Ghost-Produkt-Kontext definieren, `href` setzen.
**Typ:** Produktentscheidung → dann 1-Zeilen-Fix
**Aufwand:** gering wenn Entscheidung gefallen
**Voraussetzung:** Albert entscheidet E-04 und Ziel-URL

---

## 10. Nächster sinnvoller Schritt

**Empfehlung: B1-UX-03 zuerst (Quellenverifizierung), dann B1-UX-02 (Copy).**

Begründung: Die Copy-Fixes auf Screen 1 und 2 sind wirkungslos, solange die Zeitreise nur 3 historische Stationen hat. Der vollständige dramaturgische Bogen (ruhiger Start → Klimax → falsche Auflösung → finaler Wackler) ist die Grundbedingung für die psychologische Wirkung. Erst wenn die Stationen vollständig sind, kann die Copy ihre Aufgabe erfüllen.

Parallel kann Albert E-04 entscheiden (B1-UX-05-Voraussetzung).

B1-UX-04 (visuelles Konzept) ist der größte Schritt und braucht Designentscheidungen — daher nach den anderen.

---

*AP B1-UX-01 abgeschlossen — Anamnese vollständig. Keine Codeänderungen. Keine Commit-Message.*
