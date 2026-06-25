---
chronik_id: CHRONIK-2026-06-24-b1-ap15-18-uebergabe-ux
datum: 2026-06-24
projekt: finanzwesir-2-0-prokrastinationspreis
thema: b1-ap15-18-uebergabe-ux
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: teilweise
quellenlage: mit-anhaengen
schlagworte: [scope-drift, richtungswechsel, konzept-vs-umsetzung, vollstaendigkeit-vs-verdichtung, abbruchregel, externe-abhaengigkeit, annahme-verworfen]
---

# Chronik: Technische Stabilisierung der Prokrastinationspreis-App und Übergabe an einen UX-Faden

**Hauptgegenstand:** Der Faden behandelte die Prokrastinationspreis-App im Finanzwesir-2.0-Projekt. Zunächst wurden technische und dramaturgische APs von B1-AP-15 bis B1-AP-18 für Motion, Reveal, Navigation, A11y, Error-/Empty-Zustände und QA-Readiness geschnitten, ausgeführt und ausgewertet. Am Ende wurde festgehalten, dass die technische Sanierung nicht gleichbedeutend mit Produktreife war, weil psychologische Wirkung, visuelle Führung, CI und Tailwind-/CSS-Integration offen blieben.

## Ausgangslage

Der Faden setzte bei einer laufenden Claude-Code-Arbeit im Repo `awa-de/Finanzwesir-code` an. Die App `Apps/prokrastinations-preis` war bereits in mehreren Arbeitspaketen bearbeitet worden. Für die weitere Arbeit galt, dass ChatGPT nicht direkt coden sollte, sondern Arbeitspakete für Claude schneiden, Zwischenergebnisse prüfen und Folge-APs formulieren sollte. Als Arbeitsregel galt: vor jedem Prompt kurz den Inhalt ansagen, auf Freigabe warten und dann eine Markdown-Datei mit sprechendem Namen erzeugen.

Das Projekt war als Finanzwesir-2.0-App mit psychologischer Kernbotschaft angelegt: „Die beste Zeit anzulegen war vor 10 Jahren. Die zweitbeste ist heute.“ Die App sollte in vier Screens von Frage und Eingabe über eine Zeitreise ohne Endwissen zum Reveal und anschließend zum Transfer auf heute führen. Dabei durfte Screen 2 das Ende nicht verraten; Screen 3 sollte der erste Reveal sein; Screen 4 sollte keine Prognose zeigen.

## Chronologischer Verlauf

### AP-15: Motion, Reduced Motion und motionRules

Zunächst wurde der Motion-Bereich untersucht. In AP-15a wurde festgestellt, dass `motionRules.betweenStations` und `motionRules.reducedMotion` in `stations.de.json` nicht gelesen wurden und dass ein CSS-Reduced-Motion-Block tot war. Daraus folgte kein direkter Umbau, sondern eine Aufteilung in kleine Folge-APs.

AP-15b setzte in der ChartEngine Reduced Motion um. In `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` wurde die Präferenz `prefers-reduced-motion` berücksichtigt, sodass initial ohne Animation gerendert und bei Updates `chart.update('none')` genutzt wurde. AP-15c härtete die Validierung der `motionRules`: `mode`, `betweenStations`, `forcedWaitBeforeContinue` und `reducedMotion` wurden hart geprüft. AP-15d entfernte den toten CSS-Reduced-Motion-Block. AP-15e war eine Motion-Mini-QA. Nach den Nutzerprüfungen wurde AP-15 als grün betrachtet.

### AP-16: Reveal und Transfer

Danach zeigte der Nutzer anhand von Screenshots, dass der Abschluss der App nicht wie vorgesehen funktionierte. Nach der letzten Station führte „Ergebnis ansehen“ zu einem schwachen finalen Screen mit vollem Chart und blauer Linie, aber ohne die erwartete Reveal-Struktur. Die zuvor angenommene Lage wurde dadurch präzisiert: Screen 2 war nicht der Hauptfehler; der echte Screen-3-Reveal und der Transfer waren unvollständig.

AP-16a wurde als Audit angelegt. Claude fand, dass `renderKpiCards()` existierte und korrekt rechnete, aber in Screen 3 nicht aufgerufen wurde. Außerdem fehlte ein Container für KPI-Cards; Screen 4 existierte, enthielt aber fremde Texte. Daraufhin wurden AP-16b und AP-16c geschnitten. AP-16b ergänzte in `renderS3()` den KPI-Bereich, rief `renderKpiCards(kpiContainerS3, ctx)` auf, leerte vorher den Container und setzte den Screen-3-CTA „Meine nächsten 10 Jahre starten“. AP-16c ersetzte die Screen-4-Texte durch den Transfer-Text aus der APP_SPEC und ließ den finalen CTA „Heute Marktzeit sammeln →“ unverändert. AP-16d prüfte Reveal und Transfer. AP-16 wurde danach als abgeschlossen geführt.

### AP-17: Navigation, Fokus und A11y-Re-Announce

AP-17a wurde als Befund zu Navigation, Zurück/Weiter und Fokus angelegt. Claude klassifizierte drei Gelb-Befunde. G1 betraf den noch leeren `href=""` des Screen-4-CTA und wurde als bekannter offener Punkt behandelt. G2 betraf die Live-Region: Beim erneuten Eintritt in Screen 3 wurde die Reveal-Summary nicht erneut angekündigt. G3 betraf den Fokus nach Stationswechseln: Der Fokus ging auf die Screen-2-Überschrift statt auf die neue Stations-h3.

Der Nutzer führte Konsolenprüfungen mit `fwProbe()` durch. Diese zeigten, dass Screen 2 bis zur letzten Station keine KPI-Cards enthielt und dass Screen 3 `kpiCount: 3` sowie die Ergebniszusammenfassung in der Live-Region zeigte. Daraus folgte AP-17b als Minifix. Claude ergänzte einen Speicher `lastRevealA11yText`, setzte beim erneuten Eintritt in Screen 3 die Live-Region erneut und fokussierte nach Stationswechsel die neue h3 mit h2-Fallback. Ein Advocatus-Diaboli-Hinweis zum theoretischen `showScreen(3,false)`-Pfad wurde als Restrisiko dokumentiert, aber nicht repariert.

Nach manuellen Tests A–C meldete der Nutzer, dass G2 und G3 bestanden waren. AP-17c wurde als QA-only-Prompt erstellt. Claude bestätigte AP-17 insgesamt als grün, ließ G1 offen und dokumentierte den optionalen Hardening-Punkt.

### AP-18a: Error-/Empty-/QA-Readiness und Prompt-Kürzung

Nach AP-17 wurde AP-18a als Error-/Empty-/QA-Readiness-Befund angelegt. Der erste Entwurf war breit angelegt und enthielt viele Prüfbereiche: Loading, Error, Empty, CSV, Stationsdaten, rote Crash-Visuals, A11y, `app.test.html` und Übergabe an AP-19. Der Nutzer fragte, ob die im Faden entwickelten Regeln für tokensparsame Prompt-Schnitte noch präsent seien. Daraufhin wurde der AP-18a-Prompt selbst zum Gegenstand der Prüfung. Es wurde festgestellt, dass keine inhaltliche Drift vorlag, aber eine operative Aufblähung. Der Prompt wurde unter gleichem Dateinamen neu erzeugt, diesmal als Triage: reale Fehlerflächenkarte, maximal fünf Top-Risiken und Entscheidung über Folge-APs.

Claude führte diese Triage aus. Ergebnis: Status GELB, kein Blocker. Die App sei robust, alle fünf Error-/Empty-States seien kontrolliert, aber zwei reale Lücken wurden sichtbar. Erstens fehlte in `renderError()` ein `role="alert"`. Zweitens waren alle sieben Stationen `source_claimed_unchecked`, wodurch `filterStationsForWindow()` sie entfernte und die Journey dramaturgisch leer wurde. Weitere offene Punkte betrafen produktive CSV, Error-State-d-Harness und Empty-Journey. Als einziger unmittelbarer Code-Fix wurde `role="alert"` empfohlen.

### AP-18b und AP-18c: Minimalfix und Abschluss

AP-18b wurde daraufhin bewusst eng geschnitten: eine Datei, eine Stelle, eine A11y-Pflichtkorrektur. Claude ergänzte in `renderError()` die Zeile `p.setAttribute('role', 'alert');`. Fehlermeldungstexte, `textContent`, Error-/Empty-Pfade und Testdateien blieben unverändert. Der Nutzer führte anschließend einen DOM-Browser-Minitest aus. `document.querySelectorAll('[role="alert"]').length` ergab `12`; die ausgelesenen Texte enthielten mehrere nicht-leere Error-/Empty-Meldungen wie „Diese App konnte nicht geladen werden.“, „Daten konnten nicht geladen werden. Bitte Seite neu laden.“, „Nicht genug Daten für die Berechnung. Bitte Datenquelle prüfen.“ und „Datenreihe hat keine oder ungültige Währungsangabe. Erwartet: EUR.“ Die mehrfachen Treffer wurden auf mehrere Szenarien in `app.test.html` zurückgeführt.

AP-18c wurde als Abschluss- und Übergabe-AP angelegt. Er sollte keinen Code ändern, sondern AP-18b statisch prüfen, den DOM-Minitest dokumentieren, AP-18 abschließen und die offenen Nicht-Blocker für AP-19 klassifizieren. Claude meldete AP-18 als grün mit offenen Nicht-Blockern. Offene Punkte waren `href=""`, `source_claimed_unchecked`, produktive CSV, Error-State-d-Harness, Empty-Journey, Screenreader-Volltest und `showScreen(3,false)`-Hardening.

### Übergang vom technischen Abschluss zur UX-Frage

Nach dem technischen Abschluss stellte der Nutzer fest, dass zwei größere Themen fehlten. Erstens fehlten korrektes CSS-Styling, Farben, Fonts, Tailwind-Struktur, CI-konforme Buttons sowie visuelle Strukturen mit Schatten, Flächen und Feldern. Zweitens funktioniere die App psychologisch noch nicht ausreichend. Daraus entstand ein Richtungswechsel: AP-19 bis AP-21 sollten nicht unmittelbar gestartet werden, weil eine finale QA zu früh wäre. Stattdessen wurde ein neuer Produktwirkungs-Faden vorgeschlagen.

Dabei wurde die Problemlage dreigeteilt: psychologische Wirkung, visuelle Führung/Tailwind als Wirkungsverstärker und technische CSS-/Tailwind-Integration. Der Nutzer präzisierte, dass Tailwind selbst zwei Themen habe: Unterstützung der psychologischen Wirksamkeit und technische Implementierung mit CSS-Einbindung und Schnittstellenproblematik. ChatGPT formulierte daraus eine Übergabedatei `B1_AP15-18_Uebergabe_an_UX-Faden.md`, die den technischen Stand, offene Nicht-Blocker, die neue Problemdefinition, die drei Problemräume und den vorgeschlagenen Start-AP `B1-UX-01 — Psychologische Wirkungs-Anamnese der Prokrastinationspreis-App` festhielt.

## Wendepunkte

Ein erster Wendepunkt entstand, als Screenshots zeigten, dass nicht Screen 2, sondern der Übergang zum echten Screen-3-Reveal und der Transfer unvollständig waren. Daraus wurde AP-16 nicht als allgemeine App-Reparatur, sondern als Reveal-/Transfer-Komplex geschnitten.

Ein zweiter Wendepunkt entstand bei AP-18a. Der erste Prompt war zu breit. Der Nutzer fragte nach Drift und Prompt-Qualität; daraufhin wurde der AP als Triage neu geschnitten. Dieser Schritt machte aus einem großen Readiness-Audit eine priorisierte Fehlerflächenkarte mit maximal fünf Risiken.

Ein dritter Wendepunkt trat nach AP-18c ein. Bis dahin war AP-19 als QA-/Abschluss-Faden der erwartete nächste Schritt. Der Nutzer benannte jedoch fehlende psychologische Wirkung und fehlende visuelle Führung. Dadurch wurde AP-19 verschoben und ein neuer UX-/Produktwirkungs-Faden vorbereitet.

## Entscheidungen und Festlegungen

Es wurde festgelegt, dass AP-15 bis AP-18 als technische Sanierung zu behandeln waren. Diese Festlegung blieb am Ende gültig.

Es wurde festgelegt, dass Screen 2 kein Endwissen zeigen durfte und Screen 3 der erste Reveal war. Diese Festlegung blieb gültig.

Es wurde festgelegt, dass AP-18b nur `role="alert"` in `renderError()` ergänzen durfte. Diese Festlegung blieb gültig und wurde in einem 1-Zeilen-Fix umgesetzt.

Es wurde festgelegt, dass G1 `href=""` nicht im technischen Faden repariert wurde, weil die Ziel-URL im Ghost-/Produktkontext fehlte. Diese Festlegung blieb offen.

Es wurde festgelegt, dass `source_claimed_unchecked` ein redaktioneller beziehungsweise datenbezogener Punkt war und nicht als AP-18-Codefehler behandelt wurde. Diese Festlegung blieb offen.

Es wurde festgelegt, dass AP-19 nicht im bestehenden Faden gestartet werden sollte. Diese Festlegung blieb am Ende gültig.

Es wurde festgelegt, dass der nächste Faden mit einer Wirkungs-Anamnese und nicht mit Tailwind-Code beginnen sollte. Diese Festlegung blieb als Startvorschlag gültig.

## Irrwege, Schleifen und verworfene Ansätze

Der erste AP-18a-Entwurf wurde nicht ausgeführt, weil er zu breit geworden war. Er enthielt viele sinnvolle Prüffelder, vermischte aber reale App-Pfade mit hypothetischen Fehlerfällen und AP-19-Übergabe. Daraus entstand die präzisierte Triage-Version.

Die Annahme, dass nach AP-18 direkt AP-19 als Abschluss-QA folgen könne, wurde später verworfen. Der Nutzer stellte fest, dass die App visuell und psychologisch noch nicht produktreif war. AP-19 wurde dadurch nicht gestrichen, sondern verschoben.

Die Möglichkeit, Tailwind sofort als Styling-Fix einzusetzen, wurde nicht weiterverfolgt. Stattdessen wurde Tailwind in zwei Rollen getrennt: als Mittel der visuellen Wirkungsverstärkung und als eigenes technisches Integrationsproblem.

Die Idee, Empty-Journey oder `renderEmptyJourney()` im AP-18b-Fix mitzuerledigen, wurde nicht aufgenommen. Dieser Punkt blieb wegen seiner Nähe zu `source_claimed_unchecked` und APP_SPEC §12 für AP-19 oder Backlog offen.

## Erzeugte Artefakte

- Markdown-Prompts zu AP-15a bis AP-15e – Zweck: Motion, Reduced Motion, motionRules und Motion-QA schneiden – Status am Ende: final im Faden verwendet.
- Markdown-Prompts zu AP-16a bis AP-16d – Zweck: Reveal-/Transfer-Audit, Screen-3-Reveal, Screen-4-Transfer und Mini-QA – Status am Ende: final im Faden verwendet.
- Markdown-Prompts zu AP-17a bis AP-17c – Zweck: Navigation-/Fokus-Befund, A11y-/Fokus-Minifix und Mini-QA – Status am Ende: final im Faden verwendet.
- `B1-AP-18a_Error-Empty-QA-Readiness-Befund.md` – Zweck: Triage von Error, Empty und QA-Readiness – Status am Ende: erste Version ersetzt, zweite Version verwendet.
- `B1-AP-18b_renderError-role-alert-Minifix.md` – Zweck: Minimalfix für `role="alert"` – Status am Ende: verwendet.
- `B1-AP-18c_Mini-QA_AP-18-Abschluss_AP-19-Uebergabe.md` – Zweck: AP-18-Abschluss und AP-19-Übergabe – Status am Ende: verwendet.
- `B1_AP15-18_Uebergabe_an_UX-Faden.md` – Zweck: Übergabe vom technischen Faden an den UX-/Produktwirkungs-Faden – Status am Ende: final als Startdatei erzeugt.

## Sachliche Erkenntnisse

Gesicherter Stand: AP-15 bis AP-18 stabilisierten Motion, Reveal/Transfer, Navigation/Fokus/A11y und Error-/Empty-Verhalten der App.

Gesicherter Stand: `renderError()` erhielt `role="alert"`; der DOM-Minitest zeigte mehrere nicht-leere Alert-Elemente in `app.test.html`.

Gesicherter Stand: AP-18 wurde als grün mit offenen Nicht-Blockern dokumentiert.

Arbeitsannahme: Die App war nach AP-18 technisch ausreichend stabil, aber noch nicht produktwirksam.

Offene Frage: Wie stark einzelne Screens psychologisch umgebaut werden müssen, blieb im Faden ungeprüft.

Offene Frage: Wie Tailwind/CSS technisch sauber in die bestehende App-, ChartEngine- und Ghost-Struktur integriert wird, blieb im Faden ungeklärt.

Spätere Korrektur: Die Erwartung, dass nach AP-18 die Abschluss-QA AP-19 folgen könne, wurde durch den Nutzer relativiert und zugunsten eines UX-Fadens verschoben.

## Offene Punkte am Ende

Offen blieben der finale CTA-Link `href=""`, die Verifikation der Stationen mit `source_claimed_unchecked`, die produktive CSV beziehungsweise AP-DATA-09, ein Harness für Error-State-d, Empty-Journey beziehungsweise `renderEmptyJourney()`, ein Screenreader-Volltest und das Low-Priority-Hardening `showScreen(3,false)`.

Für den neuen UX-Faden blieben psychologische Wirkung, Screen-Dramaturgie, visuelle Führung, CI-konforme Buttons, Cards, Schatten, Flächen, Typografie, Tailwind als Wirkungsverstärker und technische CSS-/Tailwind-Integration offen.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Der Faden zeigte wiederholt das Muster „Anamnese vor Umsetzung“. Jeder AP wurde nach Befund, Scope und Stop-Regeln geschnitten, bevor ein Fix zugelassen wurde.

Für spätere Musteranalyse vormerken: Eine zu breite Aufgabenstellung wurde durch Rückfrage des Nutzers erkannt und durch einen Triage-Prompt ersetzt.

Für spätere Musteranalyse vormerken: Technische Stabilität wurde im Verlauf zunächst als Nähe zum Abschluss behandelt; später wurde sie von Produktwirkung getrennt.

Für spätere Musteranalyse vormerken: Offene Punkte wurden mehrfach in Kategorien getrennt: Codefehler, Datenlücke, redaktioneller Punkt, Harness-Lücke, Backlog und Produkt-/Ghost-Kontext.

Für spätere Musteranalyse vormerken: Der Nutzer verlangte wiederholt downloadbare Markdown-Dateien und vollständige kopierbare Promptblöcke; daraus entstand ein stabiler Arbeitsmodus für Claude-Code-Steuerung.

## Bewusst ausgelassen

Ausgelassen wurden reine Statusmeldungen ohne Folgen, Download- und Toolrauschen, die einmalige Nennung der E-Mail-Adresse ohne Einfluss auf den Arbeitsverlauf, Wiederholungen der vollständigen Prompttexte nach bereits erzeugten Dateien sowie Zwischendetails einzelner Markdown-Dateien, soweit sie den weiteren Verlauf nicht änderten.
