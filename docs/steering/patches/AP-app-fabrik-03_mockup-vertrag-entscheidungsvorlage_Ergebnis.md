Stand: 2026-07-17 | Session: AP-app-fabrik-03 | Geändert von: Claude (Opus)

# AP-app-fabrik-03 — Mockup-Vertrag: Entscheidungsvorlage Klasse C

## 0 Metadaten

- **Datum:** 2026-07-17
- **Auftrag:** Entscheidungsvorlage für den Mockup-Vertrag der App-Fabrik (Startlinie Punkt 2, Klasse C). Entwurf, Gegenhypothesen, begrenzte Entscheidungen für Albert. Keine dauerhafte Produkt-, Architektur- oder Freigabeentscheidung durch das LLM.
- **Gelesene Pflichtquellen:**
  1. `docs/App-Fabrik/APP_FACTORY_STARTLINIE.md` (vollständig, 34 Zeilen)
  2. `docs/steering/patches/AP-app-fabrik-01_mockup-track-anamnese_Ergebnis.md` (vollständig, 181 Zeilen)
  3. `docs/steering/patches/AP-app-fabrik-02_tailwind-baukasten-freigabestatus_Ergebnis.md` (vollständig)
  4. `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` (vollständig, 547 Zeilen)
  5. `docs/spec/APP-INTERFACE.md` (vollständig, 323 Zeilen)
  6. `docs/steering/STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md` (vollständig, 725 Zeilen)
  7. `docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md` (vollständig, 581 Zeilen)
- **Pilotquellen** (Pfade per `git ls-files` real ermittelt, nicht geraten):
  - `Apps/prokrastinations-preis/MINI_SPEC_FROM_HAUPTDOKUMENT.md` (vollständig, 261 Zeilen)
  - `Apps/prokrastinations-preis/APP_SPEC.md` (V2.9, 2173 Zeilen — §1–§16.1a vollständig gelesen; §16.1b–§23 nicht gelesen, siehe „Nicht gelesen")
  - `Apps/risiko-uebersetzer/MINI_SPEC_FROM_HAUPTDOKUMENT.md` (vollständig, 141 Zeilen — einzige Datei im Ordner)
- **Nicht gefundene Quellen:** keine. Alle sieben Pflichtquellen und beide Pilotquellen existieren.
- **Nicht gelesen (bewusst, Scope):** `Apps/prokrastinations-preis/APP_SPEC.md` §16.1b–§23 (Kontinuitäts-Reveal-Detailmechanik, Microcopy-Katalog), `B1-UX-01_wirkungs-anamnese.md`, `REDAKTIONS_GATE.md`, `drehbuch_prokrastinationspreis_app.md`. Sie sind für den *universellen* Vertrag nicht tragend; sie beschreiben app-lokale Mechanik. Wo unten eine Aussage von ihnen abhängen könnte, ist sie als `ANNAHME` markiert.

---

## Kurzurteil

Albert muss vor dem Start des Mockup-Tracks im Kern **eine** Frage entscheiden: Wie weit darf ein Mockup Daten simulieren, wenn der Steuerungsblock der jeweiligen App echte Daten als Muss-Kriterium führt? Der Auftrag erlaubt Simulation generell, `prokrastinations-preis` verbietet „erfundene Dramatisierung" ausdrücklich — das ist ein realer Zielkonflikt, kein Formulierungsproblem. Vier weitere Entscheidungen sind kleiner: Abnahmeinstrument, Ablageort, Umgang mit verworfenen Entwürfen, Revisionszeitpunkt des Vertrags. Alles Übrige ergibt sich bereits aus freigegebenen Quellen und muss nicht neu verhandelt werden — insbesondere das Klassenvokabular (Baukasten §6), die Besitzgrenzen (§1) und das psychologische Prüfinstrument, das als „verbindliches Standard-Gate" bereits wortgleich in jedem Steuerungsblock steht. Meine Empfehlung ist ein minimaler Vertrag plus genau zwei Zusatzregeln (Annahmenprotokoll, Happy-Path-Definition), weil die Startlinie selbst Vorratsabstraktion verbietet.

---

## Evidenzkarte

| Quelle | Aussage | Bindungsgrad | Folgerung für den Vertrag |
|---|---|---|---|
| `APP_FACTORY_STARTLINIE.md` Kopf | „Diese Reihenfolge ist keine automatische Arbeitsfreigabe. Jeder Punkt braucht weiterhin einen eigenen, risikogestuften Arbeitsauftrag." | verbindliche Arbeitssteuerung (Stand 2026-07-15) | Der Vertrag darf keine Folgeschritte automatisch freigeben. Jede Mockup-Runde bleibt ein eigener AP. |
| `APP_FACTORY_STARTLINIE.md` Punkt 2 | Mockup-Vertrag = „Schutzgut, Knautschzone, Artefakte, Happy-Path-Grenze, Abnahme und Übergabe in die APP_SPEC verbindlich entscheiden; Gegenreview und Alberts Freigabe." | verbindlich | Genau diese sechs Gegenstände sind Vertragsinhalt. Nicht mehr. Gegenreview ist Pflicht, nicht Option. |
| `APP_FACTORY_STARTLINIE.md` Punkt 7 | „Zwei interaktive, CI-konforme Happy-Path-Mockups bauen und auf 375/768/1280 px beurteilen." | verbindlich | Interaktiv ist Pflicht (statisch genügt nicht). Drei Prüf-Viewports sind gesetzt. |
| `APP_FACTORY_STARTLINIE.md` Punkt 8 | „Nur das Mockup mit echter Einsicht, starker Optik und klarem nächsten Schritt gewinnt; der Rest bleibt verworfener Entwurf." | verbindlich | Drei Abnahmedimensionen sind bereits benannt: Einsicht, Optik, nächster Schritt. Kein neues Kriterienset erfinden. |
| `APP_FACTORY_STARTLINIE.md` Punkt 12 | „Bewährte UI-Elemente als lokal oder wiederverwendbar festhalten; keine Abstraktion ohne belegten Wiederholungsbedarf." | verbindlich | Der Mockup-Track darf keine Komponentenbibliothek erzeugen. Ledger erst *nach* App 1. |
| `APP_FACTORY_STARTLINIE.md` Punkt 13 | „Den Ablauf mit einer einfachen und einer andersartigen App wiederholen; erst danach entscheidet ihr über gemeinsame Komponenten, Registry oder Core." | verbindlich | Der Vertrag ist auf Revision nach ~3 Durchläufen angelegt, nicht auf Endgültigkeit. |
| `TAKTISCHER_STARTPROMPT` §18 | „Bei UX-/Psychologie-Themen nicht sofort CSS implementieren. Erst klären: Welche innere Bewegung soll der Nutzer durchlaufen … Dann trennen: psychologische Wirkung, visuelle Führung, Tailwind als Wirkungsverstärker, technische Integration. Nicht Tailwind mit Produktwirkung verwechseln, nicht Button-Politur als UX-Konzept behandeln." | verbindlicher Arbeitsmodus | Die tragende Belegstelle des gesamten Vertrags. Das Mockup muss die *innere Bewegung* vor der Optik benennen; sonst ist es Button-Politur. |
| `TAKTISCHER_STARTPROMPT` §17 | „statisch grün ist nicht Browser grün; Browser grün ist nicht Launch-Freigabe" | verbindlich | Eine bestandene Mockup-Abnahme ist ausdrücklich keine technische oder Launch-Freigabe. Muss in den Vertrag. |
| `STRUKTURELLE_SICHERHEIT` §7 (Beweishierarchie) | Rang 7 = „Menschliche Produkt- oder Architekturentscheidung". „Ein Python-Count kann keine Produktentscheidung treffen." „Ein Browser-Grün ist keine Architekturfreigabe." | verbindlich | Psychologische Wirkung ist per Beweishierarchie nur auf Rang 7 feststellbar. Keine LLM-Jury kann die Abnahme ersetzen — sie kann nur vorsortieren. |
| `STRUKTURELLE_SICHERHEIT` §2.1/§2.2 | Fahrgastzelle = kanonische Quellen, Verträge, reale Dateien. Knautschzone = „Entwürfe … dürfen Fehler enthalten. Ihre Aufgabe ist, Fehler aufzunehmen, bevor sie die kanonische Wahrheit … erreichen." | verbindlich | Das Mockup *ist* strukturell eine Knautschzone. Das ist bereits die richtige Metapher — sie muss nur benannt, nicht erfunden werden. |
| `STRUKTURELLE_SICHERHEIT` §4.3 | Klasse C: „Entwurf → unabhängiger Review → ein gebündelter Fix → finale Freigabe." Weitere Schleife nur bei neuer Fehlerklasse oder gescheitertem Gate. | verbindlich | Reviewbudget dieses APs und des Vertragsschlusses ist gesetzt: genau ein Gegenreview, ein Fix-Batch, dann Alberts Freigabe. |
| `STRUKTURELLE_SICHERHEIT` §8.5 / §15 | Keine Selbstzertifizierung bei Klasse B/C. „keine Quelle der Wahrheit konkurriert still mit einer zweiten" | verbindlich | Ein LLM darf sein eigenes Mockup nicht selbst psychologisch freigeben. Und: kein zweites Bewertungsschema neben dem bestehenden Prüfscore. |
| `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` Kopf (Zeile 5) + `AP-app-fabrik-02` | „FREIGEGEBEN durch Albert am 2026-07-12 — verbindlicher Design- und Implementierungsvertrag"; Freigabestatus in AP-app-fabrik-02 als geklärt bestätigt (fünf unabhängige Quellen, zwei reale Nutzungsketten) | verbindlich | Das Rezeptbuch gilt. Der Mockup-Vertrag verhandelt Klassen, Farben, Radien, Schatten und Fokusringe **nicht** neu. |
| `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` §1 (Fünf-Ebenen-Tabelle + Besitzgrenzen-Regel) | „Ein Primitive übernimmt nie still App-Mechanik. Wenn eine App ein Primitive um Mechanik erweitert …, geschieht das über eine zusätzliche app-lokale Klasse (`fw-app__*` bzw. `--fw-*`), nie durch Verändern des Primitive-Rezepts." | verbindlich | **Löst den scheinbaren Konflikt „neue Mechanik erlaubt vs. Rezepttreue".** Neue Mechanik dockt an, sie lackiert nicht um. |
| `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` §6.11, DOC-02-Erweiterung Punkt 5 | „Ausdrücklich verboten: … (b) eine App-lokale Optikvariante eines gemeinsamen Primitives" | verbindlich | Harte Grenze für Mockups: Ein vorhandenes Primitive darf nicht „nur für die Wirkung" anders aussehen. |
| `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` §6.11, „App-Fabrik-Verbindlichkeit" | „Eine Abweichung ist nur bei belegter abweichender Funktion zulässig, nicht als optische App-Variante." | verbindlich | „Belegte abweichende Funktion" ist der einzige zulässige Abweichungsgrund — auch im Mockup. |
| `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` §11 | Card-to-Point-Flug, Rubikon-Overlay, `--fw-screen3-reveal-fade-duration` „bleiben app-lokal unter `fw-app__*`/`--fw-*`, deklariert im App-Kopf, ohne Verallgemeinerungsanspruch." | verbindlich | **Der Präzedenzfall existiert bereits.** Neue Wirkmechanik ist eine anerkannte, benannte Kategorie — kein Sonderweg, den der Mockup-Vertrag erst schaffen müsste. |
| `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` §2.2 (Literalregel) | „Diese Regel gilt ab der ersten migrierten Zeile, nicht erst ab T1." Keine Interpolation, keine `+`-Verkettung in Klassenstrings. | verbindlich, ab sofort | Gilt auch im Mockup — sonst ist der Gewinner nicht ohne Umbau übernehmbar. Billige Regel, hoher Übergabewert. |
| `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` §4 | Fokusring einheitlich; „Interaktive Primitiven definieren immer alle vier: `hover:`, `focus-visible:`, `active:`, `disabled:`"; `motion-reduce:` an jeder Transition | verbindlich | Ein Mockup mit Interaktion, aber ohne Fokusring/Reduced-Motion, ist nicht CI-konform — auch als Entwurf nicht. |
| `APP-INTERFACE.md` §7 (Sicherheitsregeln) | „Keine Code-Ausführung aus Datenattributen"; „SafeDOM: Nutzdaten nie via `innerHTML`"; „Kein Backend ohne explizite Architekturentscheidung" (§2) | kanonisch bindend | Nicht als Prüfpflicht im Mockup, aber als **Baubarkeitsgrenze**: Eine Mechanik, die nur mit Backend/Fremd-URL ginge, erzeugt eine unbaubare Erwartung. |
| `APP-INTERFACE.md` §8 (State-Pflicht, Fehler/Empty-Taxonomie) | Loading → Content / Error / Empty; `role="alert"`; nutzerfreundliche deutsche Meldungen | kanonisch bindend für Apps | Ausdrücklich **kein** Mockup-Gegenstand (Auftrag: Fehlerbehandlung gehört nicht in diese Phase). Muss als Nicht-Ziel benannt werden, damit es nicht einwandert. |
| `APP-INTERFACE.md` §3.1 (Ghost-Card) | `class="fw-app"`, `data-fw-app="[slug]"` Pflicht | kanonisch bindend für Apps | Mockups sind kein Ghost-Redaktionsartefakt (Befund `AP-app-fabrik-01` Abschnitt 3). Card-Vertrag wird erst bei Startlinie Punkt 10 relevant. |
| `prokrastinations-preis/APP_SPEC.md` Steuerungsblock, „Muss-Kriterien" | „Echte historische Daten und echte Stationen; keine Prognose und keine erfundene Dramatisierung." | verbindlich für diese App | **Kollidiert mit der Auftragsregel „plausible Daten und Texte dürfen simuliert sein".** Kern der Entscheidung E-01. |
| `prokrastinations-preis/APP_SPEC.md` + `risiko-uebersetzer/MINI_SPEC…md`, je Abschnitt „LLM-Prüfscore pro Änderung" | Wortgleich in beiden: „Dieser Prüfscore ist **kein app-spezifischer Inhalt**, sondern ein verbindliches Standard-Gate für jede spätere Änderung an einer App." Vier Kriterien 0–2 (Barriere-Abbau, Zielzustand, Nicht-Ziele, Mentorrolle); „Punkt 3 ist ein KO-Kriterium"; „jede Nicht-Ziel-Verletzung = stoppen" | verbindliches Standard-Gate | **Das psychologische Abnahmeinstrument existiert bereits** und ist bereits universell gedacht. Der Vertrag darf es anwenden — er muss es nicht erfinden. Einschränkung siehe Gegenhypothese A3. |
| `prokrastinations-preis/APP_SPEC.md` §8, „Redaktionelle Kontrolle" | „Claude darf die redaktionellen Stationen nicht eigenmächtig erfinden, erweitern oder umpriorisieren." | verbindlich für diese App | Ein Mockup mit erfundenen Texten unterläuft diese Regel, sobald seine Texte ungeprüft in die APP_SPEC wandern. Begründet das Annahmenprotokoll. |
| `prokrastinations-preis/APP_SPEC.md` §16.1 „Harte Grenzen" | „Screen 2 zeigt **nicht** den vollständigen Chart … Screen 3 ist der **erste** vollständige Rückblick." | verbindlich für diese App | Zeigt: Bei dieser App *ist* die Informationsreihenfolge die Wirkung. Ein Happy-Path-Mockup, das sie verkürzt, testet nicht die App. |
| `risiko-uebersetzer/MINI_SPEC…md`, „Implementierungshinweise" | „HTML + JS, kein Backend, alle Werte statisch"; „Ankerliste als JSON-Array" | historischer Rohentwurf, aber einzige Quelle | Für den ersten Kandidaten ist Simulation **unkritisch**: Die App ist per Spec statisch. E-01 trifft ihn nicht — sie trifft die datengetriebenen Nachfolger. |
| `TEST_PAGE_STANDARD.md` §12.1 (Discovery ohne Manifest) | Checker durchsucht „das gesamte Repository nach Dateien mit dem Namensmuster `*.test.html` und nach HTML-Dateien, die das Attribut `data-fw-test-template` enthalten. Jeder Treffer außerhalb der erlaubten Standardorte … ist ein Strukturfehler." | normativ | **Harte technische Nebenbedingung für den Ablageort:** Ein Mockup darf nicht `*.test.html` heißen und keinen `data-fw-test-template`-Marker tragen, sonst bricht der Checker. |
| `TEST_PAGE_STANDARD.md` §1.2 / §3 | Standard ist kein „Lifecycle-System mit Übergangsstatus"; abschließende Liste dauerhafter Testorte | normativ | Mockups sind keine Testseiten und gehören nicht in die Testorte-Systematik. |
| `AP-app-fabrik-01` Abschnitt 7 | Lücken L-01 (Psychosprint-Prompt), L-02 (`mockup.html`-Starter), L-03 (Jury-Matrix), L-05 (Übergabevorlage) existieren nicht | Befund, real belegt | Der Vertrag entscheidet, *was* diese vier Artefakte enthalten müssen — er baut sie nicht (Startlinie Punkt 3, eigener AP). |
| `AP-app-fabrik-01` Abschnitt 4 (Trennmatrix) | Knautschzone/Fahrgastzelle-Vorschlag bereits skizziert | Befund, nicht bindend | Wird hier zum Vertragsentwurf verdichtet, nicht neu erfunden. |

---

## Vertragsvariante A — Minimal und ausreichend

**Regeln:**

1. **Ein Mockup ist eine einzelne, selbstständig lauffähige HTML-Datei** außerhalb von `Apps/`, ohne `*.test.html`-Namen und ohne `data-fw-test-template`-Marker (Zwang aus `TEST_PAGE_STANDARD` §12.1).
2. **Eingang:** Mini-Spec + Steuerungsblock der App. Kein Mockup ohne geprüften Steuerungsblock (Zweck, Barriere, Zielzustand, Nicht-Ziele).
3. **Inhalt:** genau ein Happy Path, klickbar, auf 375/768/1280 px beurteilbar (Startlinie Punkt 7).
4. **Optik:** Baukasten-Rezepte (§6) als Klassenvokabular; Literalregel §2.2 gilt; Zustandsvarianten und `motion-reduce:` gelten für alles Interaktive (§4).
5. **Neue Mechanik:** erlaubt als app-lokale Ergänzung (`fw-app__*`/`--fw-*`, §1/§11). Verboten: optische Variante eines vorhandenen Primitives (§6.11 DOC-02 Punkt 5b).
6. **Simulation:** Daten und Texte dürfen simuliert sein, sofern der Steuerungsblock der App das nicht ausschließt.
7. **Nicht-Ziele:** Datenanbindung, Datenrichtigkeit, Error-/Empty-States, Ghost-Card, Security-Prüfung, A11y-Volltest, Produktionsreife.
8. **Abnahme:** Albert, mit dem bestehenden 4-Kriterien-Prüfscore, angewendet auf das gebaute Mockup. Nicht-Ziele bleiben KO-Kriterium.
9. **Übergabe:** das gewonnene Mockup selbst, plus eine Liste der bewusst offenen technischen Fragen.
10. **Autorität:** LLM schlägt vor und baut, Albert gibt frei. Eine bestandene Mockup-Abnahme ist keine technische Freigabe (§17 Taktischer Startprompt).

**Vorteile:**
- Keine neuen Artefakte außer den vier ohnehin fehlenden (L-01/02/03/05) — deckungsgleich mit Startlinie Punkt 12 („keine Abstraktion ohne belegten Wiederholungsbedarf").
- Nutzt ein bereits kanonisches, bereits universell formuliertes Prüfinstrument statt eines zweiten Schemas (`STRUKTURELLE_SICHERHEIT` §15).
- Der erste Kandidat `risiko-uebersetzer` ist damit sofort startfähig: Seine Mini-Spec sagt selbst „alle Werte statisch" — Regel 6 greift dort gar nicht.

**Risiken:**
- Kein Schutz gegen Wanderung erfundener Zahlen/Texte in die APP_SPEC.
- „Ein Happy Path" ist bei einer 4-Screen-Zeitreise etwas völlig anderes als bei einem Slider-Rechner.
- Der Prüfscore ist als *Vorab*-Selbstbewertung eines LLM formuliert, nicht als Nachher-Abnahme durch einen Menschen.

**Bewusst akzeptiert:**
- Dass die ersten ein bis zwei Mockup-Runden Nachschärfungen am Vertrag erzeugen. Startlinie Punkt 13 rechnet ohnehin mit drei Durchläufen vor der nächsten Verallgemeinerung.
- Dass „starke Optik" und „echte Einsicht" (Punkt 8) subjektiv bleiben. Nach Beweishierarchie Rang 7 ist das kein Mangel, sondern die korrekte Zuständigkeit.

---

## Vertragsvariante B — Stärker abgesichert

**Zusätzliche Regeln:**

1. **Wirkungshypothese vor dem Bau:** Jedes Mockup nennt vorab in zwei Sätzen die innere Bewegung des Nutzers und den Moment, in dem die Barriere fällt (Muster: `TAKTISCHER_STARTPROMPT` §18).
2. **Annahmenprotokoll:** Jede simulierte Zahl, jeder erfundene Text, jedes Timing wird als Annahme mit Status geführt (`simuliert` / `aus Spec belegt` / `redaktionell zu bestätigen`).
3. **Gewichtete Jury-Matrix** mit eigenen Kriterien und Punkteschema für die Fremdkritik.
4. **Pflicht-Dokumentation aller drei Viewports** je Mockup (Screenshot oder protokollierte Sichtprüfung).
5. **Formales psychologisches Gate** mit schriftlicher Begründung je Kriterium, auch beim Gewinner.
6. **Übergabe-Checkliste** mit Pflichtfeldern in die APP_SPEC.

**Vorteile:**
- Annahmen sind nachverfolgbar; die Regel „Claude darf redaktionelle Inhalte nicht eigenmächtig erfinden" (APP_SPEC §8) bleibt auch über die Mockup-Grenze hinweg wirksam.
- Die Wirkungshypothese zwingt zur Trennung von Wirkung und Optik, bevor CSS entsteht.
- Fremdkritik wird vergleichbar.

**Mehrkosten und Verzögerungen:**
- Vier zusätzliche Artefakte vor der ersten realen Erfahrung.
- Jede Mockup-Runde trägt Dokumentationslast, die erst nach mehreren Apps ihren Wert zeigt.

**Risiko der Übersteuerung:**
- Punkt 3 (eigene Jury-Matrix) erzeugt ein zweites Bewertungsschema neben dem bereits kanonischen Prüfscore — der von `STRUKTURELLE_SICHERHEIT` §15 benannte Fall „zwei still konkurrierende Quellen der Wahrheit".
- Punkt 5 verschiebt die Abnahme von „wirkt es?" zu „ist die Begründung vollständig?".
- Punkt 6 ist eine Vorratsabstraktion: Übergabepflichtfelder ohne einen einzigen realen Übergabefall verstoßen gegen Startlinie Punkt 12.

---

## Gegenhypothesen

### Gegen Variante A

**A1 — Erfundene Inhalte werden zu Produktionspflichten.**
Fehlermuster: Ein Mockup erfindet einen Stationstext oder eine KPI-Zahl. Der Text wirkt gut, das Mockup gewinnt, die technische APP_SPEC übernimmt ihn als Sollwert. Damit ist über `APP_SPEC.md` §8 („Claude darf die redaktionellen Stationen nicht eigenmächtig erfinden, erweitern oder umpriorisieren") hinweg entschieden worden — durch die Hintertür einer Entwurfsphase.
*Frühwarnzeichen:* Eine APP_SPEC zitiert eine Zahl oder einen Satz, dessen einzige auffindbare Quelle das Mockup ist.

**A2 — „Ein Happy Path" ist unterbestimmt.**
Fehlermuster: Bei `risiko-uebersetzer` ist der Happy Path ein Slider-Zug plus Ergebnissatz. Bei `prokrastinations-preis` ist er laut §16.1 die vollständige Vier-Screen-Dramaturgie — die Wirkung *ist* dort die Informationsreihenfolge („Screen 3 ist der **erste** vollständige Rückblick"). Ohne Definition baut ein LLM entweder einen Screen statt der Reise oder eine komplette App statt eines Mockups.
*Frühwarnzeichen:* Das Mockup braucht State-Management, oder es wächst über zwei Iterationen hinaus, oder der Bauer fragt „welchen Screen zuerst?".

**A3 — Der Prüfscore wird zur Selbstzertifizierung.**
Fehlermuster: Der Prüfscore ist wörtlich als „Bewerte **vor der Umsetzung** von 0–2" formuliert — ein Vorab-Instrument für das bauende LLM. Wird er unverändert als Abnahmeinstrument *nach* dem Bau vom selben LLM angewendet, entsteht genau die Selbstzertifizierung, die `STRUKTURELLE_SICHERHEIT` §8.5 für Klasse B/C untersagt. Ein LLM, das sein eigenes Mockup mit 8/8 bewertet, hat nichts bewiesen.
*Frühwarnzeichen:* Ein Mockup-Ergebnisprotokoll enthält einen selbstvergebenen Score.

### Gegen Variante B

**B1 — Zwei konkurrierende Bewertungsschemata.**
Fehlermuster: Die neue Jury-Matrix bewertet „Barriere-Abbau" mit anderer Skala als der bestehende Prüfscore. Bei Abweichung ist unklar, welches Ergebnis gilt — `STRUKTURELLE_SICHERHEIT` §15 nennt genau das als Qualitätsdefekt.
*Frühwarnzeichen:* Zwei Dokumente bewerten dieselbe Dimension mit unterschiedlichen Punktzahlen; jemand fragt „welche Matrix gilt jetzt?".

**B2 — Prozess vor Erfahrung.**
Fehlermuster: Kriterien werden für Fälle erfunden, die noch nie aufgetreten sind. Startlinie Punkt 12 verbietet Abstraktion ohne belegten Wiederholungsbedarf; Punkt 13 sieht drei Durchläufe vor, *bevor* verallgemeinert wird. Eine ausgefeilte Matrix vor App 1 ist die verbotene Vorratsabstraktion.
*Frühwarnzeichen:* Ein Matrix-Kriterium hat kein reales Beispiel; niemand kann sagen, welches Mockup daran je gescheitert wäre.

**B3 — Formalprüfung verdrängt die Wirkungsfrage.**
Fehlermuster: Ein Mockup erreicht hohe Matrix-Punktzahl, weil es alle Kriterien formal bedient — und lässt Albert trotzdem kalt. Die Matrix hat dann das Gegenteil ihres Zwecks erreicht: Sie hat die einzige Instanz überstimmt, die Wirkung überhaupt feststellen kann (Beweishierarchie Rang 7).
*Frühwarnzeichen:* Der Satz „aber es erfüllt doch alle Kriterien" fällt in einer Abnahmediskussion.

### Gegen beide Varianten

**C1 — Der Vertrag löst ein Problem, das der erste Kandidat nicht hat.**
`risiko-uebersetzer` ist per Mini-Spec statisch, chartfrei, backendfrei. Die härtesten Vertragsfragen (Simulation echter Daten, Chart-Chrome, Informationsreihenfolge) treffen ihn nicht. Ein Vertrag, der an App 1 kalibriert wird, kann bei App 2 versagen — und ein Vertrag, der an `prokrastinations-preis` kalibriert wird, überfrachtet App 1.
*Frühwarnzeichen:* Eine Vertragsregel ist beim ersten Mockup nicht anwendbar oder wird „für diesen Fall" ausgesetzt.
*Konsequenz:* Der Vertrag muss die Simulationsregel app-familien-abhängig machen (E-01) statt universell.

---

## Empfehlung

**Variante A als Basis, ergänzt um genau zwei der sechs Zusatzregeln aus Variante B: die Wirkungshypothese und das Annahmenprotokoll.** Kurz: **A+**.

Begründung ausschließlich aus Evidenz:

- **Für A als Basis:** Startlinie Punkt 12 verbietet Abstraktion ohne belegten Wiederholungsbedarf, Punkt 13 legt Verallgemeinerung ausdrücklich hinter drei Durchläufe. `STRUKTURELLE_SICHERHEIT` §15 verlangt, dass keine zweite Quelle der Wahrheit still neben eine erste tritt — der Prüfscore ist bereits als „verbindliches Standard-Gate" formuliert und in beiden geprüften Steuerungsblöcken wortgleich vorhanden. Eine eigene Jury-Matrix verletzt beides.
- **Für die Wirkungshypothese:** `TAKTISCHER_STARTPROMPT` §18 ist keine Empfehlung, sondern Arbeitsmodus: „Erst klären: Welche innere Bewegung soll der Nutzer durchlaufen … Nicht Tailwind mit Produktwirkung verwechseln, nicht Button-Politur als UX-Konzept behandeln." Ohne vorab formulierte Wirkungshypothese ist kein Mockup gegen den Vorwurf verteidigt, nur Optik statt Wirkung zu liefern — und die Hypothese kostet zwei Sätze.
- **Für das Annahmenprotokoll:** `APP_SPEC.md` §8 verbietet dem LLM, redaktionelle Inhalte eigenmächtig zu erfinden. Ohne Protokoll umgeht der Mockup-Track diese bestehende Regel (Gegenhypothese A1). Das Protokoll ist die billigste Todeszone für diesen Fehler — es macht die Wanderung sichtbar, statt sie zu verbieten.
- **Gegen die übrigen vier B-Regeln:** Die gewichtete Jury-Matrix erzeugt ein konkurrierendes Bewertungsschema (Gegenhypothese B1). Die Drei-Viewport-Pflichtdokumentation geht über Startlinie Punkt 7 hinaus, der Beurteilung verlangt, keinen Dokumentationszwang. Das formale Gate mit Begründungspflicht je Kriterium verschiebt die Abnahme in die Formalprüfung (Gegenhypothese B3). Die Übergabe-Checkliste mit Pflichtfeldern ist eine Vorratsabstraktion ohne einen einzigen realen Übergabefall (Gegenhypothese B2).

**Verbleibende Risiken der Empfehlung:**

1. **Gegenhypothese A3 bleibt teilweise offen.** A+ verlagert die Abnahme zu Albert (Beweishierarchie Rang 7), aber der Prüfscore behält seinen Wortlaut „vor der Umsetzung". Der Vertrag muss die Umwidmung explizit benennen, sonst wendet ein LLM ihn weiter auf sich selbst an. → Entscheidung E-02.
2. **Gegenhypothese C1 bleibt real.** A+ kalibriert an App 1 (statisch, einfach). Ob die Simulationsregel bei App 2 trägt, ist erst nach App 2 bekannt. → Entscheidung E-05 (Revisionszeitpunkt) begrenzt den Schaden, beseitigt ihn nicht.
3. **„Ein Happy Path" bleibt auslegungsbedürftig**, solange E-01 nicht entschieden ist — bei datengetriebenen Apps hängt der zulässige Pfad an der Datenfrage.

---

## Entscheidungen von Albert

| Entscheidung | Optionen | Auswirkung | Empfehlung |
|---|---|---|---|
| **E-01 — Simulationsgrenze bei datengetriebenen Apps.** Der Auftrag erlaubt simulierte Daten; der B1-Steuerungsblock verlangt „Echte historische Daten und echte Stationen; keine … erfundene Dramatisierung". | (a) Simulation immer erlaubt, Steuerungsblock gilt erst ab APP_SPEC. (b) Simulation erlaubt, **außer** wo der Steuerungsblock echte Daten als Muss-Kriterium führt — dort ist ein echter Datenausschnitt Pflicht, Texte dürfen weiter simuliert sein. (c) Immer Echtdaten. | (a) schnellste Mockups, aber Wirkung kann mit echten Daten nicht eintreten und der Steuerungsblock wird de facto umgangen. (b) trifft `risiko-uebersetzer` gar nicht (per Spec statisch), kostet bei B1/B2 einen CSV-Ausschnitt. (c) blockiert Mockups für Apps ohne freigegebene Daten (`AP-DATA-09` offen). | **(b)** — der Steuerungsblock ist die einzige Quelle, die die Wirkung definiert; wenn er echte Daten zur Wirkungsbedingung erklärt, testet ein Mockup mit Fantasiekurve nicht die App. Kein Konflikt mit dem ersten Kandidaten. |
| **E-02 — Abnahmeinstrument.** Der 4-Kriterien-Prüfscore existiert und nennt sich „verbindliches Standard-Gate", ist aber als LLM-Vorab-Selbstbewertung formuliert. | (a) Prüfscore unverändert übernehmen, Abnahme durch Albert. (b) Neue Jury-Matrix bauen. (c) Prüfscore für Alberts Abnahme + knappe abgeleitete Fassung für die Perplexity-Fremdkritik, ohne zweites Kriterienset. | (a) risikiert, dass LLMs ihn weiter auf sich selbst anwenden. (b) zweite Quelle der Wahrheit (§15) + Vorratsabstraktion (Startlinie 12). (c) ein Kriterienset, zwei Anwendungsrollen. | **(c)** — dieselben vier Kriterien, klar getrennte Rollen: LLM bewertet vorab sich selbst (Bestandsregel), Perplexity kritisiert fremd und entscheidet nicht (Startlinie Punkt 5), Albert nimmt ab. |
| **E-03 — Ablageort und Namensmuster der Mockups.** | (a) `Apps/{slug}/mockup/`. (b) `docs/steering/design/mockups/{slug}/`. (c) `tests/scratch/`. | Zwingend in allen Fällen: **kein** `*.test.html`-Name, **kein** `data-fw-test-template`-Marker — sonst meldet `check-test-pages.py` (§12.1) einen Strukturfehler. (a) mischt Entwurf und Fabrikprodukt im selben Ordner. (b) liegt neben Visual Board und Mockups V0.1, dem bestehenden Muster für Non-Production-Optikartefakte. (c) ist laut §3 für „freie Experimente" gedacht, nicht für abzunehmende Artefakte. | **(b)** — dort liegen die beiden vorhandenen Non-Production-Optikreferenzen bereits; der `Apps/`-Ordner bleibt der Fabrikprodukt-Ort. |
| **E-04 — Verworfene Mockups.** Startlinie Punkt 8: „der Rest bleibt verworfener Entwurf". | (a) Löschen nach Entscheidung. (b) Behalten mit Status-Header nach dem Muster `HISTORISCHER_STAND — NICHT AKTUELLER SOLLSTAND` aus `APP_SPEC.md` §16.1. | (a) kein Altlast-Risiko, aber die Evidenz für die spätere Modellbeurteilung (Punkt 9) verschwindet. (b) Evidenz bleibt, Fehlinterpretationsrisiko wird durch den vorhandenen, bereits erprobten Header-Mechanismus abgefangen. | **(b)** — das Muster existiert bereits im Repo und hat sich bewährt; „verworfener Entwurf" ist ein Status, kein Löschbefehl. |
| **E-05 — Geltung und Revision.** | (a) V0.1 gilt bis auf Widerruf. (b) V0.1 gilt, wird nach dem dritten Mockup-Durchlauf verpflichtend überprüft. (c) V0.1 gilt nur für App 1, danach Neuverhandlung. | (a) Vertrag altert unbemerkt. (b) deckungsgleich mit Startlinie Punkt 13 („zwei weitere App-Familien … erst danach entscheidet ihr"). (c) erzeugt Neuverhandlung, obwohl der Ablauf sich bewährt haben könnte. | **(b)** — die Startlinie sieht die Lernschleife nach drei Apps ohnehin vor; der Vertrag hängt sich an diesen bestehenden Takt. |

---

## Vorläufiger Mockup-Vertrag V0.1 — nicht bindend

> **Status: ENTSCHEIDUNGSMATERIAL. Nicht freigegeben, keine Quelle der Wahrheit, kein Arbeitsauftrag.**
> Dieser Entwurf setzt Variante A+ voraus und die Empfehlungen zu E-01 bis E-05. Weicht Albert ab, ändern sich die markierten Stellen.

### 1. Zweck und Schutzgut

Der Mockup-Track stellt sicher, dass vor jeder technischen APP_SPEC feststeht, **ob die App psychologisch wirkt** — nicht nur, ob sie technisch baubar ist.

Geschütztes Gut: die psychologische Wirkungsabsicht der App (Steuerungsblock: Zweck, Barriere, Zielzustand) und die Freiheit, sie zu verwerfen, bevor technische Investition sie unumkehrbar macht.

Strukturelle Einordnung: Das Mockup **ist eine Knautschzone** im Sinne von `STRUKTURELLE_SICHERHEIT` §2.2 — es darf Fehler enthalten und existiert, um sie aufzunehmen, bevor sie die kanonische Wahrheit erreichen. Die APP_SPEC ist die Fahrgastzelle.

### 2. Eingang: Mini-Spec und psychologische Barriere

Ein Mockup-Auftrag ist nur zulässig, wenn vorliegen:

- die Mini-Spec der App;
- ein geprüfter Steuerungsblock (Zweck, zu entfernende Barriere, falscher Glaubenssatz, Zielzustand, Muss-Kriterien, Nicht-Ziele);
- eine **Wirkungshypothese** des Bauenden in maximal zwei Sätzen: Welche innere Bewegung soll der Nutzer durchlaufen, und in welchem Moment fällt die Barriere?

Fehlt oder widerspricht sich der Steuerungsblock: stoppen, nicht bauen.

### 3. Zulässiger Happy Path und zulässige Simulation

**Happy Path** ist der kürzeste zusammenhängende Weg, auf dem die im Steuerungsblock benannte Barriere fällt — nicht der Funktionsumfang der App.

Der Happy Path umfasst so viele Schritte, wie die Wirkung braucht:
- Bei einer Rechner-App in der Regel: Eingabe → Ergebnis → Einsichtssatz.
- Bei einer App, deren Wirkung an der Informationsreihenfolge hängt (Beispiel `prokrastinations-preis` §16.1: „Screen 3 ist der **erste** vollständige Rückblick"), umfasst er diese Reihenfolge vollständig — sonst testet das Mockup die App nicht.

**Simulation** *(hängt an E-01, Empfehlung (b))*:
- Texte, Microcopy und Beschriftungen dürfen simuliert sein.
- Zahlen dürfen simuliert sein, **außer** der Steuerungsblock führt echte Daten als Muss-Kriterium. Dann ist ein echter Datenausschnitt zu verwenden; er muss nicht vollständig, nicht produktiv angebunden und nicht validiert sein.
- Jede Simulation wird im **Annahmenprotokoll** geführt (Abschnitt 8).

### 4. Explizite Nicht-Ziele

Ein Mockup prüft **nicht** und behauptet **nicht**:

- Datenrichtigkeit, Datenanbindung, Datenvalidierung, Cache-Busting;
- Error-, Empty- und Loading-States (`APP-INTERFACE.md` §8);
- Ghost-Card-Vertrag und `data-fw-*`-Attribute (`APP-INTERFACE.md` §3.1);
- Sicherheitsregeln (`APP-INTERFACE.md` §7) — als **Prüfgegenstand**; als Baubarkeitsgrenze gelten sie weiter (Abschnitt 5);
- A11y-Volltest, Screenreader-Abnahme, Kontrastaudit;
- Produktionsreife, Performance, Ghost-Integration.

Eine bestandene Mockup-Abnahme ist **keine** technische Freigabe (`TAKTISCHER_STARTPROMPT` §17: „Browser grün ist nicht Launch-Freigabe").

### 5. Optische und verhaltensbezogene Anforderungen

- **Klassenvokabular:** Baukasten §6 (Primitive-Verträge). Farben, Radien, Schatten, Fokusringe und Spacing werden nicht neu erfunden.
- **Literalregel** (§2.2) gilt ab der ersten Zeile — keine Interpolation, keine Verkettung in Klassenstrings. Grund: Nur so ist der Gewinner ohne Umbau übernehmbar.
- **Zustände:** Alles Interaktive definiert `hover:`, `focus-visible:`, `active:`, `disabled:` und trägt `motion-reduce:` an jeder Transition (§4). Ein Entwurf ohne sichtbaren Fokusring ist nicht CI-konform.
- **Beurteilbar auf 375/768/1280 px** (Startlinie Punkt 7).
- **Baubarkeitsgrenze:** kein Backend, Vanilla JS, keine Fremd-URLs, keine Mechanik, die nur mit `innerHTML` für Fremddaten funktionierte. Diese Grenzen werden nicht *geprüft*, aber nicht *überschritten* — ein Mockup darf keine unbaubare Erwartung erzeugen.

### 6. Regel für neue UI-Mechaniken

Neue Tailwind-basierte Wirkmechaniken sind **ausdrücklich erlaubt**. Eine nicht vorhandene Komponente ist kein Ablehnungsgrund.

Die Grenze verläuft nicht zwischen „vorhanden" und „neu", sondern zwischen **andocken** und **umlackieren**:

- **Erlaubt:** eine neue Mechanik als app-lokale Ergänzung unter `fw-app__*` / `--fw-*`, deklariert im Kopf (Baukasten §1 Besitzgrenzen-Regel, §11). Präzedenzfälle existieren bereits: Card-to-Point-Flug, Rubikon-Overlay, Reveal-Timings.
- **Verboten:** ein vorhandenes Primitive optisch abweichend darstellen (§6.11, DOC-02 Punkt 5b: „eine App-lokale Optikvariante eines gemeinsamen Primitives"). Abweichung nur bei **belegter abweichender Funktion**, nie als Geschmacksvariante.
- **Verboten:** aus einer neuen Mechanik im selben Zug ein allgemeines Primitive machen. Der Komponenten-Ledger kommt nach der App (Startlinie Punkt 12), nicht im Mockup.

### 7. Psychologische Abnahme

Abnahmeinstrument ist der bestehende **LLM-Prüfscore** aus dem Steuerungsblock — dieselben vier Kriterien, drei getrennte Rollen *(hängt an E-02, Empfehlung (c))*:

| Rolle | Wer | Was |
|---|---|---|
| Vorab-Selbstprüfung | bauendes LLM | Prüfscore in seiner bestehenden Bedeutung („vor der Umsetzung"), verhindert offensichtliche Nicht-Ziel-Verletzungen |
| Fremdkritik | unabhängiges Modell | bewertet die anonymisierten Entwürfe entlang derselben vier Kriterien, **entscheidet nicht über das Produkt** (Startlinie Punkt 5) |
| Abnahme | Albert | einzige Instanz, die Wirkung feststellt (`STRUKTURELLE_SICHERHEIT` §7, Rang 7) |

Beobachtbare Prüffragen der Abnahme, abgeleitet aus Startlinie Punkt 8 und dem Prüfscore:

1. **Einsicht:** Fällt der im Steuerungsblock benannte falsche Glaubenssatz — an einer benennbaren Stelle im Ablauf?
2. **Zielzustand:** Kann der Nutzer nach dem Happy Path den Zielzustandssatz aus eigener Erfahrung sagen?
3. **Nicht-Ziele (KO):** Verletzt das Mockup ein einziges Nicht-Ziel? Dann Stopp — unabhängig von jeder anderen Bewertung.
4. **Optik:** Trägt die Gestaltung die Aussage, oder dekoriert sie sie?
5. **Nächster Schritt:** Ist am Ende klar, was der Nutzer tun soll?

Ein selbstvergebener Score des bauenden LLM ist **kein** Abnahmenachweis (`STRUKTURELLE_SICHERHEIT` §8.5: keine Selbstzertifizierung bei Klasse B/C).

### 8. Übergabeartefakte in die technische APP_SPEC

Das gewonnene Mockup übergibt:

1. **die Mockup-Datei selbst** — als eingefrorener Optik- und Verhaltensstand;
2. **die Wirkungshypothese** und die Abnahmebegründung entlang der fünf Prüffragen;
3. **das Annahmenprotokoll** mit je einem Status pro Eintrag:
   - `aus Spec belegt` → darf in die APP_SPEC übernommen werden;
   - `simuliert` → **darf nicht** ungeprüft Produktionspflicht werden;
   - `redaktionell zu bestätigen` → geht an Albert, nicht in die Spec;
4. **die Liste der bewusst offenen technischen Fragen** (Daten, States, A11y, Integration).

**Was aus dem Mockup nicht ungeprüft zur Produktionspflicht werden darf:** simulierte Zahlen, erfundene Texte und Microcopy (`APP_SPEC.md` §8: redaktionelle Inhalte sind nicht LLM-Gebiet), Timings, Animationsdauern, jede A11y-Behauptung, jede Datenaussage.

### 9. Universeller Vertrag vs. app-lokale Gestaltung

Die Grenze ist bereits gezogen (Baukasten §1, Fünf-Ebenen-Tabelle) und wird hier nur angewendet:

| Ebene | Im Mockup |
|---|---|
| CI-Tokens, Tailwind-Struktur | unverändert übernehmen |
| Gemeinsame App-Primitiven (§6) | verwenden, nicht verändern |
| Kompositionen (§7) | verwenden, Anordnung frei |
| Lokale App-Mechanik | **hier ist die Gestaltungsfreiheit** — andocken, deklarieren, nicht verallgemeinern |

Universell ist der *Ablauf* (Eingang → Happy Path → Abnahme → Übergabe). App-lokal ist alles, was Wirkung erzeugt.

### 10. Autorität

- **Das LLM schlägt vor, baut und begründet.** Es entscheidet nicht über Produktwirkung, nicht über Freigabe, nicht über Redaktion.
- **Albert gibt frei.** Nur seine ausdrückliche Zustimmung nimmt ein Mockup ab.
- **Ein Fremdmodell kritisiert, entscheidet aber nicht** (Startlinie Punkt 5).
- **Kein Vertragspunkt gibt einen Folgeschritt automatisch frei** (Startlinie, Kopf).
- **Revision** *(hängt an E-05, Empfehlung (b))*: verpflichtende Überprüfung nach dem dritten Mockup-Durchlauf.

---

## Eingefrorenes Paket für Perplexity-Gegenprüfung

> Ab hier: vollständig kopierbarer Text. Selbsttragend, ohne Repository-Zugriff verständlich.

---

**GEGENPRÜFUNG: MOCKUP-VERTRAG EINER APP-FABRIK**

**Kontext.** Ein Einzelentwickler baut mit LLM-Unterstützung ~25 kleine, interaktive Finanz-Lern-Apps, die als HTML-Karte in Blogartikel eingebettet werden. Jede App soll eine konkrete psychologische Barriere abbauen (Beispiel: „Prozentzahlen wirken harmlos, deshalb überschätzen Anleger ihre Verlusttoleranz"). Es existiert bereits ein freigegebener Tailwind-Design-Baukasten mit fertigen Klassenrezepten und eine fertig gebaute Pilot-App. Neu eingeführt werden soll ein vorgelagerter Schritt: **Vor jeder technischen Spezifikation wird ein klickbares, gestalterisch fertiges Mockup gebaut und nur nach psychologischer Abnahme technisch spezifiziert.**

**Aufgabe.** Prüfe den unten stehenden Vertragsentwurf als unabhängiger Kritiker. Suche Denkfehler, Lücken und Fehlanreize. Du entscheidest nichts; du lieferst Einwände. Bewerte insbesondere: Ist die Trennung von Wirkung und Technik durchhaltbar? Sind die Abnahmekriterien beobachtbar oder nur schön formuliert? Wo würde dieser Vertrag in der Praxis zuerst brechen?

**Bereits verbindliche Regeln — nicht zur Diskussion gestellt** (Pfadnachweis in Klammern, sinngemäß zitiert):

1. „Diese Reihenfolge ist keine automatische Arbeitsfreigabe. Jeder Punkt braucht weiterhin einen eigenen, risikogestuften Arbeitsauftrag." (`docs/App-Fabrik/APP_FACTORY_STARTLINIE.md`, Kopf)
2. „Zwei interaktive, CI-konforme Happy-Path-Mockups bauen und auf 375/768/1280 px beurteilen." (ebd., Punkt 7)
3. „Nur das Mockup mit echter Einsicht, starker Optik und klarem nächsten Schritt gewinnt; der Rest bleibt verworfener Entwurf." (ebd., Punkt 8)
4. „Bewährte UI-Elemente als lokal oder wiederverwendbar festhalten; keine Abstraktion ohne belegten Wiederholungsbedarf." (ebd., Punkt 12)
5. Ein unabhängiges Modell „bewertet die vier anonymisierten Entwürfe mit der Jury-Matrix; es entscheidet nicht über das Produkt." (ebd., Punkt 5)
6. „Bei UX-/Psychologie-Themen nicht sofort CSS implementieren. Erst klären: Welche innere Bewegung soll der Nutzer durchlaufen … Nicht Tailwind mit Produktwirkung verwechseln, nicht Button-Politur als UX-Konzept behandeln." (`docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md` §18)
7. „statisch grün ist nicht Browser grün; Browser grün ist nicht Launch-Freigabe" (ebd. §17)
8. Beweishierarchie, aufsteigend: Dateibefund → Schema → Checker → Test → Browser-Check → LLM-Review → **menschliche Produkt- oder Architekturentscheidung** (höchster Rang). „Ein Browser-Grün ist keine Architekturfreigabe." (`docs/steering/STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md` §7)
9. Keine Selbstzertifizierung bei folgenreichen Entscheidungen; „keine Quelle der Wahrheit konkurriert still mit einer zweiten" (ebd. §8.5, §15)
10. Entwürfe sind eine „Knautschzone": Sie „dürfen Fehler enthalten. Ihre Aufgabe ist, Fehler aufzunehmen, bevor sie die kanonische Wahrheit erreichen." (ebd. §2.2)
11. Design-Baukasten, Besitzgrenzen-Regel: „Ein Primitive übernimmt nie still App-Mechanik. Wenn eine App ein Primitive um Mechanik erweitert, geschieht das über eine zusätzliche app-lokale Klasse, nie durch Verändern des Primitive-Rezepts." (`docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` §1)
12. Ebd. §6.11: „Ausdrücklich verboten: … eine App-lokale Optikvariante eines gemeinsamen Primitives." Abweichung „nur bei belegter abweichender Funktion zulässig, nicht als optische App-Variante."
13. Ebd. §2.2: Tailwind-Klassenlisten nur als vollständige String-Literale, keine Interpolation — „gilt ab der ersten migrierten Zeile".
14. Jede App trägt einen „Steuerungsblock" mit Zweck, zu entfernender Barriere, falschem Glaubenssatz, Zielzustand, Muss-Kriterien und Nicht-Zielen. Dazu ein Prüfscore, wörtlich: „Dieser Prüfscore ist kein app-spezifischer Inhalt, sondern ein verbindliches Standard-Gate für jede spätere Änderung an einer App." Vier Kriterien 0–2 (Barriere-Abbau, Zielzustand, Nicht-Ziele, Mentorrolle), „Punkt 3 ist ein KO-Kriterium", „jede Nicht-Ziel-Verletzung = stoppen". Formuliert als Bewertung **vor** der Umsetzung. (`Apps/prokrastinations-preis/APP_SPEC.md` und `Apps/risiko-uebersetzer/MINI_SPEC_FROM_HAUPTDOKUMENT.md`, je Abschnitt „LLM-Prüfscore pro Änderung")
15. Für die Pilot-App gilt: „Claude darf die redaktionellen Stationen nicht eigenmächtig erfinden, erweitern oder umpriorisieren." (`Apps/prokrastinations-preis/APP_SPEC.md` §8)
16. Für die Pilot-App gilt ferner das Muss-Kriterium: „Echte historische Daten und echte Stationen; keine Prognose und keine erfundene Dramatisierung." (ebd., Steuerungsblock)

**Noch offene Entscheidungen des Projektinhabers:**

- **E-01 Simulationsgrenze:** Der Auftrag erlaubt simulierte Daten und Texte im Mockup. Regel 16 verlangt für eine bestimmte App echte Daten und verbietet erfundene Dramatisierung. Optionen: (a) Simulation immer erlaubt; (b) Simulation erlaubt außer wo ein Steuerungsblock echte Daten als Muss-Kriterium führt; (c) immer Echtdaten. Vorgeschlagen: (b).
- **E-02 Abnahmeinstrument:** (a) bestehenden Prüfscore übernehmen; (b) neue Jury-Matrix bauen; (c) ein Kriterienset, drei Rollen (LLM prüft sich vorab selbst, Fremdmodell kritisiert, Mensch nimmt ab). Vorgeschlagen: (c).
- **E-03 Ablageort:** Mockups im App-Ordner, im Design-Ordner oder im Experimentierordner. Technischer Zwang: Ein Repository-Checker meldet jede HTML-Datei mit dem Namensmuster `*.test.html` oder einem bestimmten Template-Marker außerhalb definierter Testorte als Strukturfehler — Mockups dürfen dieses Muster daher nicht tragen. Vorgeschlagen: eigener Design-Unterordner.
- **E-04 Verworfene Mockups:** löschen oder mit „historisch/inaktiv"-Statusheader behalten. Vorgeschlagen: behalten.
- **E-05 Geltung:** unbefristet, Revision nach dem dritten Durchlauf, oder Neuverhandlung nach App 1. Vorgeschlagen: Revision nach dem dritten Durchlauf.

**Der vollständige vorläufige Vertrag (V0.1, nicht freigegeben):**

*Zweck und Schutzgut.* Sicherstellen, dass vor jeder technischen Spezifikation feststeht, ob die App psychologisch wirkt — nicht nur, ob sie baubar ist. Geschützt wird die Wirkungsabsicht der App und die Freiheit, sie zu verwerfen, bevor technische Investition sie unumkehrbar macht. Das Mockup ist strukturell eine Knautschzone (Regel 10); die technische Spezifikation ist die Fahrgastzelle.

*Eingang.* Ein Mockup-Auftrag ist nur zulässig mit: Mini-Spec, geprüftem Steuerungsblock und einer Wirkungshypothese in maximal zwei Sätzen (welche innere Bewegung, an welchem Moment fällt die Barriere). Fehlt oder widerspricht sich der Steuerungsblock: stoppen.

*Happy Path.* Der kürzeste zusammenhängende Weg, auf dem die benannte Barriere fällt — nicht der Funktionsumfang. Bei einer Rechner-App typischerweise Eingabe → Ergebnis → Einsichtssatz. Bei einer App, deren Wirkung an der Informationsreihenfolge hängt (Beispiel: Der vollständige Rückblick darf erst im dritten von vier Schritten erscheinen, weil die Kernaussage lautet „Im Rückblick sieht Mut aus wie Logik; in Echtzeit war es eine Entscheidung"), umfasst er diese Reihenfolge vollständig.

*Simulation.* Texte und Microcopy dürfen simuliert sein. Zahlen dürfen simuliert sein, außer der Steuerungsblock führt echte Daten als Muss-Kriterium; dann ist ein echter Datenausschnitt zu verwenden, der nicht vollständig, nicht produktiv angebunden und nicht validiert sein muss. Jede Simulation wird protokolliert.

*Nicht-Ziele.* Das Mockup prüft und behauptet nicht: Datenrichtigkeit, Datenanbindung, Fehler-/Leer-/Ladezustände, Einbettungsvertrag, Sicherheitsprüfung, Barrierefreiheits-Volltest, Produktionsreife, Performance. Eine bestandene Abnahme ist keine technische Freigabe.

*Optik und Verhalten.* Klassenvokabular aus dem Baukasten; Literalregel gilt ab der ersten Zeile; alles Interaktive definiert Hover-, Fokus-, Aktiv- und Deaktiviert-Zustand und respektiert reduzierte Bewegung; beurteilbar auf 375/768/1280 px. Baubarkeitsgrenze: kein Backend, Vanilla JS, keine Fremd-URLs, keine Mechanik, die nur mit unsicherem DOM-Einfügen von Fremddaten funktionierte. Diese Grenzen werden nicht geprüft, aber nicht überschritten — ein Mockup darf keine unbaubare Erwartung erzeugen.

*Neue UI-Mechaniken.* Ausdrücklich erlaubt; eine nicht vorhandene Komponente ist kein Ablehnungsgrund. Die Grenze verläuft nicht zwischen „vorhanden" und „neu", sondern zwischen Andocken und Umlackieren: Neue Mechanik entsteht als app-lokale Ergänzung mit eigenem Namensraum (Regel 11; Präzedenzfälle existieren im Bestand). Verboten bleibt, ein vorhandenes Primitive optisch abweichend darzustellen (Regel 12) oder aus einer neuen Mechanik im selben Zug ein allgemeines Primitive zu machen (Regel 4).

*Psychologische Abnahme.* Dieselben vier Kriterien aus Regel 14, drei Rollen: Das bauende LLM prüft sich vorab selbst; ein unabhängiges Modell kritisiert die anonymisierten Entwürfe, entscheidet aber nicht; der Projektinhaber nimmt ab (einzige Instanz nach Regel 8). Beobachtbare Prüffragen: (1) Fällt der benannte falsche Glaubenssatz an einer benennbaren Stelle im Ablauf? (2) Kann der Nutzer danach den Zielzustandssatz aus eigener Erfahrung sagen? (3) Wird ein Nicht-Ziel verletzt? — dann Stopp, unabhängig von allem anderen. (4) Trägt die Gestaltung die Aussage oder dekoriert sie sie? (5) Ist der nächste Schritt klar? Ein selbstvergebener Score des bauenden LLM ist kein Abnahmenachweis (Regel 9).

*Übergabe.* Das gewonnene Mockup übergibt: die Datei selbst als eingefrorenen Stand; die Wirkungshypothese und die Abnahmebegründung entlang der fünf Prüffragen; das Annahmenprotokoll mit Status je Eintrag (`aus Spec belegt` = übernehmbar, `simuliert` = darf nicht ungeprüft Produktionspflicht werden, `redaktionell zu bestätigen` = geht an den Projektinhaber); die Liste der bewusst offenen technischen Fragen. Nicht ungeprüft übernehmbar: simulierte Zahlen, erfundene Texte (Regel 15), Timings, Animationsdauern, jede Barrierefreiheits- oder Datenaussage.

*Universell vs. app-lokal.* Universell ist der Ablauf (Eingang → Happy Path → Abnahme → Übergabe) und das Klassenvokabular. App-lokal ist alles, was Wirkung erzeugt.

*Autorität.* Das LLM schlägt vor, baut und begründet; es entscheidet nicht über Produktwirkung, Freigabe oder Redaktion. Der Projektinhaber gibt frei. Ein Fremdmodell kritisiert. Kein Vertragspunkt gibt einen Folgeschritt automatisch frei. Verpflichtende Revision nach dem dritten Durchlauf.

**Die stärksten Einwände, die bereits intern erhoben wurden — bitte prüfe sie und suche weitere:**

1. *Erfundene Inhalte werden zu Produktionspflichten.* Ein Mockup erfindet einen Text, er wirkt, das Mockup gewinnt, der Text landet in der technischen Spezifikation — und umgeht damit Regel 15 durch die Hintertür einer Entwurfsphase. Frühwarnzeichen: Die Spezifikation zitiert eine Zahl oder einen Satz, dessen einzige Quelle das Mockup ist.
2. *„Ein Happy Path" ist unterbestimmt.* Bei einem Rechner ist er ein Reglerzug; bei einer vierstufigen narrativen App ist er die ganze Dramaturgie. Ohne Definition baut ein LLM entweder zu wenig oder eine komplette App. Frühwarnzeichen: Das Mockup braucht Zustandsverwaltung oder wächst über zwei Iterationen hinaus.
3. *Der Prüfscore wird zur Selbstzertifizierung.* Er ist wörtlich als Vorab-Selbstbewertung des bauenden LLM formuliert. Als Nachher-Abnahme vom selben LLM angewendet, beweist er nichts (Regel 9). Frühwarnzeichen: Ein Ergebnisprotokoll enthält einen selbstvergebenen Höchstwert.
4. *Eine eigene Jury-Matrix erzeugt eine zweite Quelle der Wahrheit* neben dem bereits kanonischen Prüfscore (Regel 9, zweiter Teil). Frühwarnzeichen: Zwei Dokumente bewerten dieselbe Dimension unterschiedlich.
5. *Formalprüfung verdrängt die Wirkungsfrage.* Ein Mockup erfüllt alle Kriterien und lässt den Projektinhaber trotzdem kalt — die Matrix hätte dann die einzige Instanz überstimmt, die Wirkung feststellen kann (Regel 8). Frühwarnzeichen: Der Satz „aber es erfüllt doch alle Kriterien".
6. *Der Vertrag löst ein Problem, das die erste App nicht hat.* Der erste Kandidat ist statisch, chartfrei und backendfrei; die härtesten Fragen (echte Daten, Informationsreihenfolge) treffen ihn nicht. Ein an App 1 kalibrierter Vertrag kann bei App 2 versagen. Frühwarnzeichen: Eine Regel ist beim ersten Mockup nicht anwendbar oder wird „für diesen Fall" ausgesetzt.
7. *Modellauswahl aus einer Stichprobe.* Der Gesamtablauf sieht vor, dass vier Modelle dieselbe Aufgabe bearbeiten und das Modell hinter dem Gewinnerentwurf als vorläufig geeignet gilt. Das ist eine Auswahl aus einer einzigen Aufgabe mit einem Bewerter. Der Ablauf nennt es selbst „vorläufig" und sieht Prüfung gegen weitere Ergebnisse vor — bitte prüfe, ob diese Einschränkung stark genug formuliert ist.

**Antwortformat:** Nummerierte Einwände. Je Einwand: Fehlermuster, warum der Vertrag ihn heute nicht abfängt, kleinste Vertragsänderung, die ihn abfinge. Bewerte am Ende, welche der fünf offenen Entscheidungen du anders entscheiden würdest und warum. Erfinde keine Repository-Inhalte; wenn dir eine Information fehlt, benenne sie als Lücke.

*(Ende des eingefrorenen Pakets)*

---

## Nächster zulässiger Schritt

Unabhängige Gegenprüfung des eingefrorenen Pakets durch ein Fremdmodell (Perplexity), Rückführung der Einwände als **ein** gebündelter Fix-Batch, danach Alberts ausdrückliche Entscheidung zu E-01 bis E-05 und Freigabe des Vertrags. Das entspricht dem Klasse-C-Reviewbudget: „Entwurf → unabhängiger Review → ein gebündelter Fix → finale Freigabe" (`STRUKTURELLE_SICHERHEIT` §4.3/§8.3). Eine weitere Schleife ist nur zulässig, wenn eine neue Fehlerklasse auftritt oder ein Gate scheitert.

## Ausdrücklich nicht der nächste Schritt

Psychosprint, Mockup-Bau, Starterkit-Artefakte (Startlinie Punkt 3), APP_SPEC, Komponentenbibliothek, Registry, technische Implementierung, Modellentscheidung.

---

## Chat-Antwort

```text
AP-app-fabrik-03 — Mockup-Vertrag Klasse C

Status: GELB
Ergebnisdatei: docs/steering/patches/AP-app-fabrik-03_mockup-vertrag-entscheidungsvorlage_Ergebnis.md
Kernentscheidung: Wie weit darf ein Mockup Daten simulieren, wenn der Steuerungsblock der App echte Daten als Muss-Kriterium führt — der Auftrag erlaubt Simulation, prokrastinations-preis verbietet „erfundene Dramatisierung".
Offene Entscheidungen für Albert: 5
Nächster zulässiger Schritt: Unabhängige Gegenprüfung des eingefrorenen Pakets, ein gebündelter Fix-Batch, danach Alberts Entscheidung zu E-01–E-05 und Vertragsfreigabe.
Ausdrücklich nicht der nächste Schritt: Psychosprint, Mockup-Bau, Starterkit, APP_SPEC, Komponentenbibliothek, technische Implementierung.

Patch-Quittung
- Geänderte Dateien: genau 1 — docs/steering/patches/AP-app-fabrik-03_mockup-vertrag-entscheidungsvorlage_Ergebnis.md
- Scope-QA: grün
- Datei nach Write real wiedergelesen: ja
- Produktions-, Test-, App-, Theme-, Engine- und Spec-Code unverändert: ja
```
