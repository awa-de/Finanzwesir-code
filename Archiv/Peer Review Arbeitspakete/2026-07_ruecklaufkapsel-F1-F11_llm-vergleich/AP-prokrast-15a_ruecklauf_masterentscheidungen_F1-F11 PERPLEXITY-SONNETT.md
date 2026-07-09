# AP-prokrast-15a / CI-Theme-Bridge — Entscheidungsprotokoll (korrigierte \& vollständige Fassung)

> Dieses Dokument ersetzt die vorherige Fadenzusammenfassung vollständig. Es korrigiert einen Fehler bei der Warning/Error-Farbe (Entscheidung 4) und ergänzt die Beschlüsse zu Frage 10 (fw-app-template.html) und Frage 11 (Purpur-Gradient-Stufen). Teil 2 enthält jetzt wieder die ausführliche Begründung zu allen 11 Entscheidungen.
> Quellen: AP-prokrast-15a Ergebnisprotokoll (read-only Bestandsaufnahme), AP-prokrast-15a Startprompt (Auftragsdefinition).

\---

## Teil 1 — Kompakte Entscheidungstabelle (ohne Begründung)

|#|Entscheidungsfrage|Beschluss|
|-|-|-|
|1|Primary Action: Petrol oder Blau?|Petrol als Primary-Marke bestätigt|
|2|Rolle von Blau künftig?|Link/Secondary-Funktion, nicht Primary|
|3|Rolle von Purpur künftig?|Nicht als Warning/Error verwendet|
|4|Warning-/Error-Farbe|Offiziell ein neues, eigenständiges Rot beschlossen — kein offener Punkt|
|5|Success-Farbe|Noch offen, keine Grün-Variante im Repo vorhanden|
|6|Surface-Rolle|Ableitung aus bestehendem Faint-Background statt neuer Ramp|
|7|Prozentnamen vs. Tailwind-Skala (50–950)|Migration zu Tailwind-Skala beschlossen|
|8|var()-Referenz vs. Hex-Literal in Tailwind-Configs|Vereinheitlichung auf var()-Referenz, Hex-Duplikate auflösen|
|9|Ursprüngliche Vermutung zu Hex-Literalen|Widerlegt — Werte sind identisch, nur Referenzierungsmechanik unterschiedlich|
|10|fw-app-template.html als offizielle App-Pool-Grundlage?|Genutzt als hoffnungsvoller Aspirant, kein amtlicher Design-Spec — Testfeld ist der Prokrastinations-Pilot|
|11|Purpur-Gradient-Zwischenstufen (gradient-light-medium) offiziell übernehmen?|Verworfen — raus aus der CI-Palette|

\---

## Teil 2 — Ausführliche Begründung

### Entscheidung 1: Primary Action — Petrol oder Blau?

**Ausgangslage:** AP-15a stellte fest, dass Petrol als CI-Rohwert bereits für Buttons, H1/H2 und positive Balken in Charts kanonisch verwendet wird (`--color-petrol: #218380`, zentral in `screen.css` und über alle Design-System-Templates hinweg konsistent) \[file:1]. Blau (`#0071BF`) wird dagegen aktuell nur für Text-Links genutzt und hat keine Ramp-Varianten. Der App-Pilot `prokrastinations-preis` weicht jedoch ab: Dort wird faktisch Blau als App-Primary-Fallback verwendet (`--fw-color-primary` mit identischem Hex zu Blau), ohne dass diese Rolle jemals offiziell entschieden wurde \[file:1]. Das Protokoll markierte dies ausdrücklich als Masterentscheidungsbedarf: „Soll PrimaryAction eher Petrol oder Blau sein?"

**Beschluss:** Petrol wird als Primary-Marke bestätigt. Damit folgt die künftige Rollenzuordnung dem bereits etablierten, breiteren Verwendungsmuster in Website und Chart-Engine statt der isolierten Abweichung im App-Piloten.

**Konsequenz:** Der App-Pilot muss künftig seinen `--fw-color-primary`-Fallback auf Petrol ausrichten bzw. auf `--color-primary` migrieren, sobald die Rollen-Ebene technisch umgesetzt wird.

\---

### Entscheidung 2: Rolle von Blau künftig

**Ausgangslage:** Da Petrol die Primary-Rolle übernimmt, musste geklärt werden, wozu Blau künftig dient — zur Auswahl standen Link-Funktion, Data-Viz-Sekundärfarbe, Secondary-Action oder gar keine UI-Primärrolle mehr \[file:1].

**Beschluss:** Blau bleibt in der Link-/Secondary-Funktion, wie es aktuell schon in `screen.css` für `.ci-link` verwendet wird (Text-Links, Blockquote-Kontext), erhält aber keine Primary-Action-Rolle.

**Begründung:** Dies vermeidet eine Doppelbelegung von zwei Markenfarben für dieselbe Funktion (Primary) und nutzt den bereits bestehenden, funktionierenden Verwendungszweck weiter, statt ihn zu verwerfen.

\---

### Entscheidung 3: Rolle von Purpur künftig

**Ausgangslage:** Purpur (`#8D0267`) wird aktuell für Warnungen, Visited-Links und negative Balken in Charts verwendet (`theme.semantic.negativeBar: purpur` in der Chart-Engine) \[file:1]. Die offene Frage war, ob Purpur künftig als Akzent, als Warning/Error oder als reine Highlight-Farbe dienen soll.

**Beschluss:** Purpur wird nicht als Warning-/Error-Farbe verwendet (siehe Entscheidung 4). Es behält seine bestehende Funktion als negative Balkenfarbe in der Chart-Ampel-Logik und als Akzent/Highlight in Deko-Boxen, wird aber nicht zur allgemeinen UI-Statusfarbe erklärt.

**Begründung:** Eine Doppelnutzung von Purpur sowohl als „negativer Wert" in Finanz-Charts als auch als generische UI-Warnfarbe hätte zu Verwechslungsrisiken geführt — ein negativer Kursverlauf ist inhaltlich etwas anderes als eine Systemwarnung.

\---

### Entscheidung 4: Warning-/Error-Farbe

**Ausgangslage:** Im Repo existierte bereits eine eigenständige, CI-fremde Error-Farbe im App-Piloten (`--fw-color-error-border: #c62828`, `-bg: #fff8f8`, `-text: #b71c1c` in `app.css`), die mit keiner CI-Markenfarbe identisch ist \[file:1]. Das AP-15a-Protokoll listete „Error" explizit als Rolle, die „NICHT vorhanden zentral, nur App-lokal mit eigener Farbe" ist \[file:1].

**Korrekte Sachlage:** Anstatt Purpur zweckzuentfremden oder die bestehende App-lokale Rot-Variante unverändert zu übernehmen, wurde **offiziell das Rot #c62828 als Warning-/Error-Farbe für den CI-Pool beschlossen**. Dies ist damit kein offener Punkt mehr, sondern eine getroffene Entscheidung.

**Warum das wichtig ist:** Ohne eine explizit benannte, zentrale Error-Farbe hätte jede der 25 geplanten Apps ihre eigene Fehlerfarbe erfunden — genau das Risiko, das AP-15a im Abschnitt „Fehlende Elemente/Rollen" ausdrücklich als Konsistenzproblem markiert hatte \[file:1].

\---

### Entscheidung 5: Success-Farbe

**Ausgangslage:** AP-15a stellte fest, dass im gesamten Repo kein Grünton existiert — weder als CI-Rohwert noch als App-lokaler Fallback \[file:1]. Das Protokoll bewertete dies als vollständige Lücke: „Success fehlt komplett, kein Grünton irgendwo im Repo gefunden."

**Beschluss:** Diese Frage bleibt bewusst offen. Es wurde in diesem Thread keine Grün-Variante festgelegt.

**Begründung:** Da aktuell keine App im Pool eine Success-Rückmeldung benötigt (der Prokrastinations-Pilot hat keinen Erfolgszustand, der farblich codiert werden müsste), wurde entschieden, diese Entscheidung zurückzustellen, bis ein konkreter Bedarf entsteht, statt eine Farbe ohne reale Anwendung festzulegen.

\---

### Entscheidung 6: Surface-Rolle

**Ausgangslage:** Für Cards/Panels fehlte ein eigenes Surface-Token. Als einziger Kandidat existierte `--color-bg-faint` (`#FAFAFA`), dessen Kontrastausreichend für neue Card-Komponenten ungeprüft war \[file:1]. Das AP-15a-Protokoll formulierte dies als offene Masterentscheidung: „Wird Surface aus bestehendem Faint-Background abgeleitet oder braucht es eigene Surface-Rampen?"

**Beschluss:** Surface wird aus dem bestehenden Faint-Background abgeleitet, keine komplett neue Ramp wird aufgebaut.

**Begründung:** Das vermeidet unnötige Duplikation eines fast identischen Grautons und hält den CI-Pool schlank. Sollte sich im Praxistest über den Prokrastinations-Piloten herausstellen, dass der Kontrast nicht ausreicht, kann diese Entscheidung revidiert werden — das ist explizit als Risiko im Ursprungsprotokoll vermerkt.

\---

### Entscheidung 7: Prozentnamen vs. Tailwind-Skala (50–950)

**Ausgangslage:** Die bestehende CSS-Ramp nutzt Prozentnamen (`-20`, `-30`, `-50`, `-80`, `-tint`), die uneinheitlich über die vier Markenfarben verteilt sind — Petrol hat 6 Stufen, Gelb und Purpur nur 4 \[file:1]. Das Protokoll stellte Vor- und Nachteile beider Ansätze gegenüber, ohne eine Empfehlung auszusprechen: Prozentnamen bedeuten keinen Migrationsaufwand, aber schlechte Tailwind-Tool-Kompatibilität; eine Tailwind-Skala (50–950) verspricht bessere Kompatibilität mit Fremd-Tools, erfordert aber Migration an mindestens vier Dateien und hätte aktuell nur 2–3 echte Stufen pro Farbe statt der vollen 9–10 \[file:1].

**Beschluss:** Migration zur Tailwind-Skala (50–950) wird angestrebt.

**Begründung:** Das Repo soll künftig 25 Apps und die Website aus einer gemeinsamen Tailwind-kompatiblen Quelle bedienen — dafür ist die Anschlussfähigkeit an Tailwinds Standarderwartung (`bg-petrol-500` statt `bg-petrol-80`) wichtiger als der einmalige Migrationsaufwand.

\---

### Entscheidung 8: var()-Referenz vs. Hex-Literal in Tailwind-Configs

**Ausgangslage:** AP-15a fand zwei konkurrierende Strategien: Ghost-integrierte Dateien (`master-template.html`, `ui-kit-referenz.html`, `fw-app-template.html`) referenzieren `var(--color-petrol)` aus `screen.css`, während alle Standalone-Demo-Dateien dieselben Werte als Hex-Literal direkt in der eigenen Tailwind-Config duplizieren \[file:1]. Werte sind identisch, aber bei einer künftigen Farbänderung müssten beide Pfade synchron gepflegt werden — ein Risiko für Drift (siehe auch Entscheidung 11, wo genau diese Duplikation zum Problem wurde).

**Beschluss:** Vereinheitlichung auf var()-Referenz, Auflösung der Hex-Duplikate.

**Begründung:** CSS soll gemäß Leitentscheidung des Projekts die bevorzugte Quelle der Wahrheit bleiben. Hex-Literale in Standalone-Configs widersprechen diesem Prinzip strukturell und sind die Ursache für die in Entscheidung 11 identifizierte Asymmetrie.

\---

### Entscheidung 9: Ursprüngliche Vermutung zu Hex-Literalen

**Ausgangslage:** Vor der detaillierten Prüfung bestand die Vermutung, dass die Hex-Literale in den Standalone-Demos möglicherweise von den kanonischen CSS-Werten abweichen und damit veraltete oder fehlerhafte Farbwerte enthalten könnten.

**Beschluss/Befund:** Diese Vermutung wurde widerlegt. Die Werte sind über alle Dateien hinweg identisch — es unterscheidet sich lediglich die Referenzierungsmechanik (direkter Hex-Wert vs. `var()`-Referenz), nicht der tatsächliche Farbwert \[file:1].

**Begründung/Konsequenz:** Das entschärft die Dringlichkeit einer Korrektur (keine sichtbaren Farbfehler in Produktion), ändert aber nichts an der strukturellen Notwendigkeit aus Entscheidung 8, die Duplikation langfristig aufzulösen, um künftige Drift zu verhindern.

\---

### Entscheidung 10: fw-app-template.html als App-Pool-Grundlage

**Ausgangslage:** AP-15a fand als bisher nicht dokumentierten Neufund eine bereits fertig ausgearbeitete Tailwind-Vorlage unter `docs/App-Fabrik/input/perplexity/fw-app-template.html` mit KPI-Card-, CTA-, Skeleton-, Slider- und Chart-Container-Komponenten \[file:1]. Sie liegt im Input-Ordner für KI-generierte Vorschläge, nicht im offiziellen `docs/design-system/templates/`-Verzeichnis, und wird vom aktuellen App-Piloten `prokrastinations-preis` bislang nicht genutzt \[file:1].

**Technische Prüfung:** Die Datei ist methodisch Tailwind-konform: Sie erweitert Tailwind korrekt über `theme.extend.colors` mit denselben `var(--color-petrol)`-Referenzen wie die offiziellen Ghost-Templates, statt eine Parallelarchitektur zu erfinden. Der einzige Bruch mit reinem Tailwind-Idiom ist das Fehlen einer durchgängigen 50–950-Skalenkonvention — das ist aber ohnehin bereits als offener Punkt in Entscheidung 7 bekannt und unabhängig von dieser Frage zu lösen.

**Beschluss:** Die Vorlage wird verwendet, aber ausdrücklich nicht als amtlicher Design-Spec, sondern als „hoffnungsvoller Aspirant". Der Prokrastinations-Pilot dient als Testfeld: Erst wenn sich die Komponenten dort in der Praxis bewähren, kann eine spätere Entscheidung folgen, sie offiziell in `docs/design-system/templates/` zu übernehmen.

**Begründung:** Damit wird vermieden, dass ein unautorisierter KI-Entwurf rückwirkend zur bindenden Spec erklärt wird, ohne dass Design/Produkt ihn bewusst geprüft haben. Gleichzeitig wird der praktische Nutzen des bereits vorhandenen Musters nicht verschenkt.

\---

### Entscheidung 11: Purpur-Gradient-Zwischenstufen verwerfen

**Ausgangslage:** In den Standalone-Demo-Dateien `homepage-demo.html`, `impressum-demo.html` und `finanzwesir-homepage-v12-gemini-tailwind-v16.html` existieren zwei zusätzliche Purpur-Zwischenstufen (`gradient-light-medium`, als `rgba`-Werte mit abgestufter Opacity), die im offiziellen `master-template.html` und in `screen.css` nicht vorkommen \[file:1]. Die reguläre Purpur-Ramp endet dort bei den bekannten Stufen `DEFAULT`, `-80`, `-tint`, `-30`.

**Bewertung:** Es gab keinen erkennbaren Verwendungszweck-Kontext, keine Komponente, die diese Zwischenstufen referenziert, und keine Erwähnung in den Design-System-Spec-Dateien. Zwei Erklärungen waren plausibel: reine Versionsdrift (Kopierfehler bei paralleler Pflege der Demo-Dateien, begünstigt durch die in Entscheidung 8 beschriebene Hex-Literal-Duplikation) oder ein nie freigegebenes Experiment für feinere Verlaufsoptik. Da kein Pilot diese Werte aktiv nutzt und kein dokumentierter Bedarf vorliegt, wurde dies eher als unkontrollierte Drift denn als fortführenswerter Vorschlag eingeschätzt.

**Beschluss:** Die Zwischenstufen werden verworfen, nicht in die offizielle CI-Palette übernommen.

**Offene technische Folgeaufgabe:** Die Entscheidung selbst ist getroffen, die technische Bereinigung (Entfernen der `gradient-light-medium`-Werte aus den drei betroffenen Standalone-Dateien) ist jedoch noch nicht durchgeführt — das wäre ein Umsetzungsschritt für einen späteren Coding-AP, da diese Dateien außerhalb des Schreib-Scopes des read-only Analyse-Threads liegen \[file:1].

\---

## Offene, bewusst nicht entschiedene Punkte

* Success-Farbe (Entscheidung 5): weiterhin offen, keine Grün-Variante im gesamten Repo gefunden \[file:1]
* Prozentnamen-zu-Tailwind-Skala-Migration (Entscheidung 7): Migrationsaufwand an mindestens 4 Dateien noch nicht durchgeführt
* var()-Vereinheitlichung in Standalone-Demos (Entscheidung 8): noch nicht technisch umgesetzt
* Technische Bereinigung der verworfenen Purpur-Gradient-Werte in den 3 Standalone-Dateien (Entscheidung 11): noch offen

## Hinweis für den Peer-Reviewer

Für eine vollständige Nachvollziehbarkeit sollten zusätzlich zu diesem Protokoll folgende Repo-Dateien geprüft werden:

* `Theme/assets/css/screen.css` (CSS-Ramp, Farbdefinitionen, betrifft Entscheidungen 1–3, 6, 7)
* `Theme/assets/js/fw-chart-engine/core/FwTheme.js` (JS-Bridge, getGhostColor-Mechanik, betrifft Entscheidungen 1, 3, 7)
* `Apps/prokrastinations-preis/app.css` und `app.js` (App-lokaler --fw--Namensraum, Testfeld für Entscheidungen 1, 4, 10)
* `docs/App-Fabrik/input/perplexity/fw-app-template.html` (Gegenstand von Entscheidung 10)
* `docs/design-system/reference/homepage-demo.html`, `impressum-demo.html`, `docs/homepage/09-erste-html-version/finanzwesir-homepage-v12-gemini-tailwind-v16.html` (Gegenstand von Entscheidungen 8, 9, 11 — Purpur-Gradient-Fundstellen)
* `docs/design-system/templates/master-template.html`, `docs/design-system/reference/ui-kit-referenz.html` (offizielle Referenz für Entscheidungen 8, 9, 10)
* `docs/steering/patches/AP-prokrast-15a-tailwind-ci-pool-inventar-renderfluss-namensanalyse-Ergebnis.md` (vollständiges read-only Ausgangsprotokoll, Primärquelle für alle 11 Entscheidungen)

