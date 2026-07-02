# AP-prokrast-03c — Peer Review: Rubikon-Reveal und Canvas-Text-Annotation-Plugin Ergebnis

## Status

GRÜN

## Kurzbefund

Der Rubikon-Reveal aus AP-03b hält der Nachprüfung stand — der Smart-Update-Mechanismus (`ChartEngine.js:355–391`) ist real, bereits produktiv genutzt und RM-automatisch. `FwAnnotationPulsePlugin` bleibt bestätigt ungeeignet für persistenten Text. Ein neues, kleines, opt-in Plugin `FwChartTextPlugin.js` wird **befürwortet** — mit einer wichtigen Präzisierung gegenüber AP-03b: Für eine strukturierte Mehrfach-Annotation-Config (mehrere Texte gleichzeitig, wie im Rubikon-Fall gewünscht) reicht eine neue Plugin-Datei + `plugins/index.js`-Export **nicht**. Das bestehende Konfigurationsmuster für strukturierte Plugin-Options (`annotationPulse`, `ChartEngine.js:185–191, 207–208, 223–224, 324–329`) zeigt, dass solche Optionen als eigenes Top-Level-Feld in `renderFromData()`-Options ankommen und von `ChartEngine.js` selbst nach `chartConfig.options.plugins.<id>` gespiegelt werden müssen — ein späterer Implementierungs-AP müsste also zusätzlich einen kleinen, additiven Patch in `ChartEngine.js` vornehmen (Registrierungsmuster, keine Verhaltensänderung bestehender Charts). AP-03b hatte das nicht benannt und bei Vorschlag D nur „neue Plugin-Datei + `plugins/index.js`" als betroffene Dateien gelistet — das wird hier korrigiert.

Größtes eigenständiges Risiko dieses APs: Canvas-Text ist nicht automatisch barrierefrei. Der Rubikon-Satz „Die nächsten 10 Jahre werden anders nervig." **muss** zusätzlich als DOM-Text (z. B. in der bestehenden `aria-live`-Region oder als sichtbare Subline) vorhanden sein — das Plugin selbst trägt keine A11y-Verantwortung, das bleibt App-Aufgabe.

Empfehlung: `FwChartTextPlugin.js` V1 mit `plotFraction`-Positionierung (bezogen auf die ChartArea, nicht die gesamte Canvas-Fläche) bauen, in einem eigenen, isolierten Implementierungs-AP **vor** der Screen-4-Integration, mit engem V1-Vertrag und explizitem Card-to-Point-Ausschluss im Contract-Text selbst.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short`: `M .claude/learning/session-log.md`, `M PROJECT-STATUS.md`, `?? docs/steering/patches/AP-prokrast-03a_..._Ergebnis.md`, `?? docs/steering/patches/AP-prokrast-03b_..._Ergebnis.md` — alles eigene Änderungen aus dieser Session, keine Fremdänderungen
- `git diff --name-status`: `M .claude/learning/session-log.md`, `M PROJECT-STATUS.md`

Repo-Namensdiskrepanz wie in AP-prokrast-02a/03a/03b dokumentiert — kein Stop.

## Gelesene Pflichtquellen

### Ergebnisprotokolle

- `docs/steering/patches/AP-prokrast-03b_rubikon-reveal_architekturvorschlaege_peer-review-dossier_Ergebnis.md` — vollständig neu gelesen in diesem AP (nicht nur aus Session-Erinnerung übernommen)
- `docs/steering/patches/AP-prokrast-03a_architektur-anamnese_rubikon-x-achse-plugin-vertrag_Ergebnis.md` — vollständig neu gelesen in diesem AP
- AP-prokrast-02c/02d/02e — nicht erneut vollständig gelesen; deren für diesen AP relevante Kernaussagen (Datenwahrheit, Future-Ticks-Pflicht, 800ms-RM-Kontrakt, Card-to-Point-Koordinaten-API fehlt) sind bereits in AP-03a/03b belegt zitiert und in diesem AP nicht neu strittig

### Plugin- und Architekturdateien

- `Theme/assets/js/fw-chart-engine/plugins/FwAnnotationPulsePlugin.js` — bereits in AP-03b in dieser Session vollständig gelesen (147 Zeilen); für diesen AP nicht erneut vollständig neu gelesen (Token-Disziplin laut Auftrag), Kernbefunde direkt aus dem AP-03b-Protokoll mit Zeilenbelegen übernommen und gegen die Protokoll-Zitate plausibilisiert
- `Theme/assets/js/fw-chart-engine/plugins/FwVerticalLinePlugin.js` — bereits in AP-03a vollständig gelesen (26 Zeilen), Kernbefund (positioniert sich am letzten Punkt von Dataset 0) für diesen AP übernommen
- `Theme/assets/js/fw-chart-engine/plugins/index.js` — bereits in AP-03b vollständig gelesen (16 Zeilen, Barrel-Export-Muster), Muster für diesen AP übernommen
- `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md` §14–17 — bereits in AP-03b vollständig gelesen, Kernaussagen (Referenzmuster-Charakter von `FwAnnotationPulsePlugin`, Peer-Review-Pflicht-Kriterien, Stop-Regeln inkl. `chart.update('none')`-Verbot) übernommen

### App-Kontext

- `Apps/prokrastinations-preis/app.js` — bereits in AP-03b tiefengelesen (787 Zeilen, codebase-scout), relevante Fundstellen (`latestMonth`, `subtractMonths`, `activeWindow`, `showScreen`, `renderS3`, `aria-live`-Region, CTA-Element) für diesen AP übernommen, nicht erneut neu gelesen
- `Apps/prokrastinations-preis/app.css` — bereits in AP-03b gelesen (285 Zeilen), CTA-/Fokus-Styling-Fundstellen übernommen
- `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` — bereits in AP-03a vollständig gelesen, Rubikon-Beat-Beschreibung übernommen

**Zusätzlich in diesem AP direkt verifiziert (nicht aus Protokollen übernommen):** `ChartEngine.js:185–191` (Lesen von `options.annotationPulse` als Top-Level-Render-Option), `ChartEngine.js:207–208, 223–224` (Durchreichen in `state.config`/`chartConfig`-Aufbau), `ChartEngine.js:324–329` (Spiegelung nach `chartConfig.options.plugins.fwAnnotationPulse` und Plugin-Push) — diese vier Stellen waren bereits in AP-03b als Fundstellen zitiert, wurden hier gezielt erneut herangezogen, um das Konfigurationsmuster für den `FwChartTextPlugin`-Contract-Vergleich zu verifizieren.

## Claims aus AP-03b — Peer Review

| Claim | Urteil | Datei-/Protokollbeleg | Notiz |
|---|---:|---|---|
| Smart Update trägt den Reveal | **bestätigt** | `ChartEngine.js:355–391` (Zeilenzitate in AP-03b korrekt), `_prefersReducedMotion()` Z.477–484 | Kein neuer Widerspruch gefunden; Mechanismus ist real und bereits produktiv (Screen 2) |
| `FwAnnotationPulsePlugin` ist ohne Änderung ungeeignet | **bestätigt** | `FwAnnotationPulsePlugin.js` Z.7–8 (Vertrag), Z.83 (nur `mode:'newly-added'`), Z.50–54 (nur Kreisring), Z.58 (permanentes Expire), Z.84 (RM-Komplettausstieg) | Alle vier Einzelbefunde (Kreisring statt Glyphen, Dataset-Pflicht, Transienz, RM-Ausblendung) sind einzeln bereits ausreichend, um Ungeeignetheit zu belegen — keine Übertreibung |
| Vorschlag D respektiert Plugin-Verträge besser als C | **bestätigt** | `FwAnnotationPulsePlugin.js` Dateikopf „Ephemerer Runtime-Pulse" vs. persistenter Zweck von D | D vermischt keine gegensätzlichen Lebenszyklus-Semantiken in einer Datei — sauberer als C |
| Vorschlag D ist additiv und regressionsarm | **eingeschränkt bestätigt** | `ChartEngine.js:185–191, 207–208, 223–224, 324–329` (Muster für `annotationPulse`) | Additiv im Sinne von „kein bestehendes Verhalten wird verändert" bleibt richtig. Aber: AP-03b listete für Vorschlag D nur „neue Plugin-Datei + `plugins/index.js`" als betroffene Dateien — das ist **unvollständig**. Für eine strukturierte Mehrfach-Annotation-Config (wie im Rubikon-Fall mit 2–3 Annotationen gewünscht) muss `ChartEngine.js` einen kleinen, additiven Patch erhalten, der dem `annotationPulse`-Muster folgt (Top-Level-Option lesen → in `state.config`/`chartConfig` durchreichen → nach `chartConfig.options.plugins.fwChartText` spiegeln → Plugin bedingt pushen). Das bleibt additiv und regressionsarm (bestehendes Muster, kein bestehender Code verändert), aber es ist eine dritte betroffene Datei, keine zwei |
| Vorschlag D darf nicht Card-to-Point werden | **konkretisiert** | AP-02c (Card-to-Point-API fehlt, als Risiko markiert), `CHART_PLUGIN_ARCHITEKTUR.md §7` (Plugins dürfen Domain nicht verändern) | Konkrete Abgrenzung für diesen AP: Card-to-Point würde bedeuten, dass das Plugin Pixelkoordinaten nach außen exponiert (für beliebige externe DOM-Elemente) oder App-seitig `chart.scales.x.getPixelForValue()` aufgerufen wird. `FwChartTextPlugin` zeichnet nur intern im eigenen `afterDraw`-Hook, exponiert nichts — das ist der entscheidende Unterschied, der explizit im V1-Vertrag stehen muss (siehe unten) |

## Entscheidung: `FwChartTextPlugin.js`

- **Grundsatzentscheidung:** Plugin bauen — aber als eigener, isolierter Implementierungs-AP vor der Screen-4-Integration, nicht im selben Schritt wie der Reveal.
- **Name bestätigt:** ja — `FwChartTextPlugin.js` folgt der bestehenden Namenskonvention (`FwVerticalLinePlugin`, `FwAnnotationPulsePlugin`, `FwSmartXAxis` — `Fw`-Präfix + funktionsbeschreibender Name), kein Konflikt mit bestehenden Dateinamen.
- **Plugin bauen:** ja.
- **Warum:** Canvas-Text bleibt automatisch mit Chart-Resize/Redraw synchron — ein DOM-Overlay müsste bei jedem responsiven Breakpoint-Wechsel oder Fenster-Resize eigenständig neu positioniert werden (zusätzliche Synchronisationslogik, zusätzliche Fehlerquelle), während Canvas-Text im selben Redraw-Zyklus wie der Chart selbst entsteht. Für einen Text, der „in der Zukunftsfläche mitschwimmen" soll, ist das ein echter Robustheitsvorteil gegenüber CSS/DOM-Overlay (Vorschlag A aus AP-03b).
- **Warum nicht CSS/DOM allein:** technisch möglich (siehe AP-03b Vorschlag A), aber für mehrzeiligen Fließtext plus zwei Symbole an drei verschiedenen, teils asymmetrischen Positionen wächst der CSS-Positionierungs- und Resize-Synchronisationsaufwand schneller als der Aufwand für ein kleines, dediziertes Plugin. `plotFraction` mit `pastMonths=futureMonths=120` macht den Rubikon-Punkt ohnehin schon rechnerisch trivial (x=0.5) — das Plugin muss nichts Kompliziertes lösen.
- **Warum nicht `FwAnnotationPulsePlugin` erweitern (Vorschlag C):** bestätigt aus AP-03b — die Lebenszyklus-Semantiken (ephemer/1200ms vs. persistent) sind gegensätzlich; eine Erweiterung würde den enger gefassten Vertrag „Ephemerer Runtime-Pulse" aufweichen und einen doppelten Testpfad (alter + neuer Modus) im selben Regressionstest-Umfang erzwingen.
- **Warum nicht Card-to-Point:** das Plugin zeichnet ausschließlich intern im eigenen `afterDraw`-Hook auf Basis von `plotFraction`-Werten, die aus `chartArea` berechnet werden (Breite/Höhe der Plot-Fläche × Fraction). Es gibt **keine Rückgabe** von Pixelkoordinaten an `app.js`, **keine Events**, **keine API** für externe DOM-Elemente. Diese drei Verbote müssen explizit im V1-Vertrag stehen (nicht nur implizit gemeint sein), damit ein späterer Implementierungs-AP sie nicht stillschweigend aufweicht.

## Minimaler V1-Vertrag

### Zweck

Persistente, nicht-interaktive Text- und Symbol-Annotationen im Canvas-Chartbereich, positioniert relativ zur Chart-PlotArea.

### Nicht-Zweck

Keine Animation. Keine Tooltips. Keine Klickflächen. Keine DOM-Elemente. Keine Card-to-Point-API (keine Pixelkoordinaten-Rückgabe, keine Events, keine externe Abfrage-Schnittstelle). Keine Datenpunkte. Keine Achsenänderung. Keine direkte `app.js`-Abfrage von Chart.js-Internals. Keine automatische Layout-Engine für komplexe Beschriftungen (kein Auto-Wrap, keine Collision Detection).

### V1-Muss

- opt-in (nur aktiv bei explizit gesetzter Config, analog `annotationPulse.enabled`)
- persistent (kein Auto-Expire, keine Zeitsteuerung)
- nicht-interaktiv (keine Hit-Detection, keine Hover-/Click-Handler)
- keine Animation, keine Motion — dadurch entfällt die komplette RM-Ausblend-Problematik von `FwAnnotationPulsePlugin` strukturell (das Plugin hat schlicht nichts zu animieren)
- keine Datenmutation, keine Achsenmutation
- keine externe Koordinaten-API — explizit im Contract-Kommentar der Datei festgehalten, nicht nur implizit
- Positionierung ausschließlich per `plotFraction`
- mehrere Text-Annotationen in einer Config möglich (Array, wie im Rubikon-Fall mit 3 Einträgen)
- einfache Zeichenketten, manuelle Zeilenumbrüche über `\n` (kein separates `lines`-Array — ein `text`-String mit `\n`-Split ist die einfachere API-Oberfläche und deckt den Rubikon-Fall vollständig ab)
- Basis-Ausrichtung (`align`, `baseline`)
- Default-Styling aus bestehender Theme-Konvention, wo vorhanden (z. B. Textfarbe aus dem bestehenden Farbschema, das `FwVerticalLinePlugin` bereits fest verdrahtet — `#0071bf` o. Ä. — statt jede App eigene Hex-Werte hartcodieren zu lassen)

### V1-Kann (kritisch geprüft)

- `fontSize` — ja, sinnvoll (Rubikon-Fließtext braucht wahrscheinlich eine andere Größe als die Symbole)
- `fontWeight` — ja, geringer Zusatzaufwand
- `color` — ja, mit Theme-Default als Fallback
- `lineHeight` — ja, notwendig sobald mehrzeiliger Text erlaubt ist (V1-Muss zieht das nach sich)
- `offsetX`/`offsetY` — ja, sinnvolle Feinjustierung zusätzlich zu `plotFraction`, geringer Zusatzaufwand
- `maxWidth` — **nein, nicht V1** (siehe unten, explizit als „Nicht V1" markiert — Widerspruch zur Prompt-Vorlage, siehe A11y-/Scope-Abschnitt)
- `visibleFromZone`/`hideOnMobile` — **nein, nicht V1.** Diese Option stand im ursprünglichen Vorschlag sowohl unter „V1-Kann" als auch implizit unter „spätere Erweiterung: responsive rules" — das ist ein innerer Widerspruch der Vorlage. Entscheidung dieses Reviews: **nicht V1**, weil es faktisch der Einstieg in eine Mini-Responsive-Engine im Plugin wäre. Für V1 reicht: die App entscheidet selbst, ob und mit welcher Config sie `renderFromData()` mit `chartText`-Optionen aufruft — kein zonenbezogenes Wissen im Plugin nötig.

### Nicht V1

Automatische Textumbruch-Engine (`maxWidth`/Word-Wrap). Collision Detection. Interaktion. Tooltips. Events. DOM-Brücke. Rückgabe von Pixelkoordinaten. `domainX`. `dataY`. Mehrstufige Responsive-Layout-Engine (inkl. `visibleFromZone`/`hideOnMobile`, siehe oben). Animation. Pulse. A11y-Verantwortung im Plugin selbst (bleibt App-/DOM-Aufgabe).

### Positionierung

- **Empfohlener V1-Modus:** `plotFraction` — bestätigt als für V1 ausreichend.
  - Pro (bestätigt): einfach, robust bei Resize, keine Datenpunktkopplung, keine Zukunftsdaten, keine Chart.js-Internals-Abfrage aus `app.js`, für den Rubikon-Fall (`pastMonths=futureMonths=120`) fachlich exakt passend (Rubikon liegt rechnerisch immer bei x=0.5, keine Sonderfall-Logik nötig).
  - Contra (zur Kenntnis genommen, für V1 akzeptiert): nicht an Domain-Werte gebunden — bei künftigen asymmetrischen Rubikon-Fenstern (z. B. `pastMonths≠futureMonths`) müsste die x-Fraction app-seitig neu berechnet werden, statt dass das Plugin es automatisch übernimmt. Für V1 ist das ein akzeptabler, klar benannter Kompromiss, kein Blocker.
- **Bezugspunkt:** ChartArea/PlotArea, **nicht** die gesamte Canvas-Fläche. Begründung: `FwVerticalLinePlugin` und die Tick-Generierung in `FwSmartXAxis` beziehen sich bereits konsistent auf `chart.chartArea` (Plot-Fläche ohne Achsen-/Label-Ränder) — ein neues Plugin, das stattdessen die volle Canvas-Fläche als Bezug nimmt, würde bei Achsen-Labels/Legenden/Padding-Änderungen inkonsistent zu den bestehenden Elementen verrutschen. `chartArea` ist die richtige, bereits etablierte Referenz.
- **Beispiel Rubikon-Zukunftstext:** `x=0.75, y=0.35` aus der Prompt-Vorlage ist für V1 plausibel (rechte Zukunftshälfte, oberer Bereich der Plot-Fläche, weit genug von der Datenlinie entfernt) — konkrete Feinjustierung ist Sache eines späteren visuellen QA-Durchgangs, nicht dieses Architektur-Reviews.
- **Beispiel ✅/❓:** `x=0.47`/`x=0.53` bei `y=0.50` ist für V1 plausibel als symmetrischer Abstand links/rechts der Rubikon-Linie (x=0.50). Die genaue y-Position („auf Höhe der Chartlinie") bleibt aus AP-03a/03b bekannt approximativ — mit `plotFraction` ist sie ohnehin nur eine grobe Annäherung an die tatsächliche Kurshöhe am Rubikon-Punkt (siehe Contra-Punkt oben), was für zwei kleine Symbol-Glyphen als Produktentscheidung ausreichend sein dürfte, aber im Implementierungs-AP visuell verifiziert werden muss.

### Konfigurationsvorschlag

Der in der Aufgabenstellung gezeigte Contract-Entwurf (`plugins: { fwChartText: { enabled, annotations: [...] } }`) ist als **Chart.js-interne Options-Struktur** korrekt — das ist exakt die Form, in der `FwAnnotationPulsePlugin` seine Config liest (`chart.options.plugins.fwAnnotationPulse`). Er ist aber **nicht** die Form, in der die App die Config an `renderFromData()` übergibt. Bestehendes Muster (`annotationPulse`, `xDisplayRange`, `annotations`, `yRangePolicy`): all diese Felder werden als **Top-Level-Optionen** an `renderFromData(container, data, options)` übergeben, nicht unter `options.plugins.*`. `ChartEngine.js` liest sie dort heraus und spiegelt sie erst intern nach `chartConfig.options.plugins.<id>` für Chart.js selbst.

Für `FwChartTextPlugin` bedeutet das: die App-seitige Aufrufsyntax wäre `chartEngine4.renderFromData(container, chartSeries, { ..., chartText: { enabled: true, annotations: [...] } })` — **nicht** `{ plugins: { fwChartText: {...} } }` direkt aus `app.js`. Das ist keine Ablehnung des Vorschlags, sondern eine notwendige Präzisierung für den späteren Implementierungs-AP (betrifft auch den in dieser Aufgabenstellung genannten Punkt „Gehört die Option unter `plugins.fwChartText`, `features.chartText` oder an eine andere Stelle?" — Antwort: **weder noch**, sondern ein neues Top-Level-Feld `chartText`, analog zu `annotationPulse`, nicht analog zu `features.verticalLine`, weil `chartText` strukturierte Daten (ein Array von Annotationen) transportiert, während `features` in der bestehenden Codebase ausschließlich einfache Boolean-/String-Flags enthält).

- `role: 'decorative'` ist sinnvoll als Signalfeld nach außen (z. B. für ein künftiges automatisiertes A11y-Audit-Tool, das prüft, ob als `decorative` markierte Canvas-Texte tatsächlich eine DOM-Entsprechung haben oder zurecht rein dekorativ sind), aber **nicht irreführend**, solange klar dokumentiert ist: `role: 'decorative'` entbindet die App nicht von der A11y-Pflicht, semantisch wichtigen Text zusätzlich im DOM bereitzustellen — es ist eine Markierung für spätere Tooling-Zwecke, keine A11y-Lösung selbst.
- Wo die zugängliche DOM-Kopie liegen muss: siehe A11y-Entscheidung unten.
- `x=0.75/y=0.35` und `x=0.47/0.53` reichen für V1 (siehe Positionierung oben).
- `lines` vs. `text`+`\n`: **`text`+`\n`** ist für V1 die einfachere und ausreichende Wahl (siehe V1-Muss oben).
- `plotFraction` bezieht sich auf **ChartArea/PlotArea** (siehe Positionierung oben, bestätigt).

### A11y-Entscheidung

- **Canvas-Text semantisch relevant:** abhängig vom Einzelfall — für den Rubikon-Satz „Die nächsten 10 Jahre werden anders nervig." **ja** (trägt Produktinformation/Ton), für ✅/❓ **abhängig davon, ob ihre Bedeutung bereits anderweitig im Fließtext/Subline steht**.
- **DOM-/Screenreader-Kopie nötig:** **ja, für den Rubikon-Satz zwingend.** Canvas-Inhalte sind für Screenreader nicht zuverlässig zugänglich (kein DOM-Knoten, kein Text-Content-API-Zugriff). Der Satz muss zusätzlich entweder (a) in der bereits bestehenden `aria-live="polite"`-Region (`app.js:434–437`) angesagt werden, wenn Screen 4 erreicht wird, oder (b) als sichtbarer DOM-Text (Subline/Copy) neben dem Chart erscheinen — beides ist mit dem bestehenden A11y-Muster der App konsistent (analog zu den bereits vorhandenen `a11yRegion.textContent`-Zuweisungen bei Screen-Wechseln). Für ✅/❓ genügt es wahrscheinlich, wenn ihre Bedeutung („Vergangenheit bekannt, Zukunft offen") bereits im begleitenden Fließtext steht — dann sind die Canvas-Symbole rein illustrativ und `role:'decorative'` korrekt zutreffend, ohne eigene DOM-Kopie.
- **Zuständigkeit Plugin:** keine. Das Plugin trägt bewusst keine A11y-Verantwortung — es zeichnet nur Pixel, kennt keine Screenreader-Semantik.
- **Zuständigkeit App:** vollständig. `app.js` muss sicherstellen, dass jeder als `role:'decorative'` deklarierte, aber semantisch wichtige Canvas-Text eine DOM-Entsprechung hat — das ist eine Pflicht-QA-Prüfung für jeden späteren Implementierungs-AP, nicht optional.

### Emoji-/Glyph-Entscheidung

- **Unterstützungsniveau:** V1 unterstützt beliebige Zeichenketten (inkl. Unicode/Emoji) über `ctx.fillText()` — technisch keine Einschränkung, aber **kein Rendering-Garantie** für Emoji-Glyphen (Canvas-Text-Rendering hängt vom systemeigenen Font-Stack ab, der zwischen Windows/macOS/Linux/iOS/Android unterschiedliche Emoji-Darstellungen liefert, von farbig über monochrom bis Tofu-Box bei fehlendem Font).
- **Fallback:** V1 selbst bietet keinen automatischen Fallback-Mechanismus (das wäre Scope-Creep — Font-Erkennung/-Fallback ist ein eigenständiges, nicht-triviales Problem). Empfehlung an die Produktseite: entweder Emoji als „best effort" akzeptieren (kein Pixel-genauer QA-Anspruch an die Emoji-Form), oder alternativ kurze Text-Labels statt Emoji verwenden (z. B. „✓"/„?" als einfache ASCII-nahe Zeichen statt ✅/❓, die auf mehr Systemen konsistenter rendern) — das ist eine Produkt-, keine Architekturentscheidung, und sollte im Implementierungs-AP explizit mit Albert geklärt werden, nicht von Claude vorentschieden.
- **Risiko:** mittel — kein Blocker für den Plugin-Bau selbst, aber ein QA-Punkt, der auf mindestens zwei Plattformen (z. B. Windows-Chrome + iOS-Safari) visuell geprüft werden muss, bevor Screen 4 als fertig gilt.

## Erweiterbarkeit

| Erweiterung | Jetzt / später / verboten | Begründung |
|---|---|---|
| `domainX + plotFractionY` | später | Sinnvoll als erste Erweiterung — x an echten Datumswert gebunden, y bleibt einfach; deckt asymmetrische Rubikon-Fenster ab, ohne Card-to-Point-Nähe |
| `domainX + dataY` | später, mit Vorsicht | `dataY` bedeutet Bindung an einen echten Kurswert-zu-Pixel-Wert — das nähert sich konzeptionell Card-to-Point-Territorium (Datenwert→Pixel-Konvertierung als generischer Mechanismus). Bei Bedarf: eng auf einen einzelnen bekannten Datenpunkt beschränken, keine generische Query-API |
| Word-Wrap | später, nur bei echtem Bedarf | Scope-Creep-Gefahr; für den bekannten Rubikon-Fall reicht manuelles `\n` vollständig |
| Style Presets | später, niedrige Priorität | Nice-to-have, kein aktueller Bedarf über die V1-Kann-Felder hinaus |
| Responsive Rules | später | Aus V1 bewusst herausgenommen (siehe V1-Kann-Kritik oben) — App entscheidet vorerst selbst über bedingte Aktivierung |
| Collision Avoidance | verboten ohne neuen, triftigen Anwendungsfall | Hoher Implementierungsaufwand, für 1–3 Rubikon-Annotationen kein Bedarf; Anzeichen für Overengineering, wenn früh eingebaut |
| Events / Tooltips | verboten dauerhaft für dieses Plugin | Widerspricht dem Kern-Vertrag „nicht-interaktiv"; falls künftig gebraucht, gehört das in ein neues, eigenes Plugin, nicht in `FwChartTextPlugin` |
| Pixel-Koordinaten nach außen | verboten dauerhaft | Card-to-Point-Schutzlinie — nicht verhandelbar, muss im Datei-Kommentar des Plugins explizit festgehalten werden |

## Aufwandseinschätzung

| Teil | Größe | Begründung |
|---|---:|---|
| Rubikon-Reveal ohne Plugin | S | Zwei `renderFromData()`-Aufrufe + `setTimeout` + neuer `addMonths`-Helfer (App-Layer, durch AP-03a/03b bereits vollständig vorbereitet) |
| `FwChartTextPlugin.js` V1 mit `plotFraction` | S–M | Kein State, keine Animation (einfacher als `FwAnnotationPulsePlugin`), aber inkl. dem zusätzlich nötigen `ChartEngine.js`-Registrierungspatch (siehe Claims-Review oben) — daher nicht reines „XS" |
| Integration in Screen 4 | S | Config-Objekt an `renderFromData()` übergeben, plus DOM-Parallelkopie für A11y-Text |
| QA für Plugin + Screen 4 | M | Mehrere Viewports (S/M/L), Reduced Motion, Screenreader-Stichprobe für die A11y-Kopie, Emoji-Rendering-Check auf mindestens zwei Plattformen |
| Spätere Erweiterung `domainX` | M | Bräuchte echte Domain-zu-Pixel-Umrechnung im Plugin (ähnliches Prinzip wie in `FwVerticalLinePlugin`, aber verallgemeinert für beliebige Zeitwerte statt nur „letzter Punkt") |

## Reihenfolge

- **Empfohlene Reihenfolge:** `FwChartTextPlugin.js` V1 zuerst bauen und **isoliert** testen (an einem einfachen Testfall/Testharness, nicht direkt an Screen 4), danach den Rubikon-Reveal in Screen 4 bauen und das bereits fertige, geprüfte Plugin dort integrieren.
- **Verworfene Reihenfolgen:**
  - *Erst Reveal mit CSS-Text-Platzhalter, Plugin später nachziehen* (Option 1 aus AP-03b): würde bedeuten, den Zukunftstext zweimal zu bauen (einmal CSS-Overlay, dann durch Plugin ersetzen) — unnötiger Doppelaufwand, seit der Nutzer sich in diesem AP bereits für Canvas-Text entschieden hat.
  - *Beides in einem AP* (Option 3): verletzt Scope-Disziplin — zwei neue, voneinander unabhängige Fehlerquellen (neues Plugin + neuer Reveal-Mechanismus) gleichzeitig zu debuggen erschwert die Fehlerlokalisierung im Falle eines Problems.
- **Warum:** Wenn das Plugin zuerst isoliert gebaut und QA-geprüft wird, integriert Screen 4 später nur zwei bereits fertige, unabhängig verifizierte Bausteine (Reveal-Mechanismus + Text-Plugin) — das minimiert Drift und Regressionsrisiko am stärksten, weil Screen 4 selbst (der sichtbarste, komplexeste Teil) keine unbekannten Variablen mehr enthält.

## Risikoanalyse

| Risiko | Kategorie | Bewertung | Gegenmaßnahme |
|---|---|---:|---|
| A11y Canvas-Text | Barrierefreiheit | hoch (wenn ungelöst) | Pflicht-DOM-Parallelkopie/`aria-live`-Announce für jeden semantisch relevanten Canvas-Text; verpflichtender QA-Punkt im Implementierungs-AP |
| Emoji-/Font-Darstellung | Darstellung | mittel | Produktentscheidung Text-Label vs. Emoji vorab klären; kein Pixel-genauer QA-Anspruch an Emoji-Form; Cross-Plattform-Stichprobe |
| Card-to-Point-Verwechslung | Architektur | niedrig | Explizites Verbot (keine Pixel-Rückgabe, keine Events, keine externe API) im Datei-Kommentar des Plugins selbst verankern, nicht nur im Ergebnisprotokoll |
| Plugin-Registry-Regression | Regression | niedrig–mittel | `plugins/index.js`-Export ist trivial additiv (niedrig); der zusätzlich nötige `ChartEngine.js`-Patch ist additiv nach erprobtem Muster, aber `ChartEngine.js` ist zentral für alle Apps — Regressionstest muss explizit „Screen 1–3 und andere Apps unverändert" prüfen |
| Scope-Creep | Architektur | mittel | Harte V1-Muss/-Kann/-Nicht-V1-Grenzen aus diesem Protokoll wörtlich in den Implementierungs-AP-Auftrag übernehmen, nicht neu verhandeln lassen |

## Empfehlung für nächsten AP

- **Nächster interner AP:** AP-prokrast-03d — `FwChartTextPlugin.js` Minimum-Implementierung (isoliert, vor Screen-4-Integration)
- **Ziel:** neue Plugin-Datei nach dem in diesem AP geschnittenen V1-Vertrag bauen, additiven Registrierungspatch in `ChartEngine.js` nach dem `annotationPulse`-Muster vornehmen, `plugins/index.js` um den Export ergänzen, isoliert testen (nicht an Screen 4).
- **Erlaubte Dateien:** `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js` (neu), `Theme/assets/js/fw-chart-engine/plugins/index.js` (additiver Export), `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` (additiver Registrierungspatch, analog `annotationPulse`).
- **Verbotene Dateien:** `Apps/prokrastinations-preis/app.js`, `Apps/prokrastinations-preis/app.css` (Integration folgt erst in einem Folge-AP), `LineChartStrategy.js`, `FwSmartXAxis.js`, `BaseChartStrategy.js`, `FwVerticalLinePlugin.js`, `FwAnnotationPulsePlugin.js`, `APP_SPEC.md`, `config/stations.de.json`, alle `docs/spec/*`-Dokumente.
- **Pflichtquellen:** dieses Ergebnisprotokoll (V1-Vertrag verbindlich), `CHART_PLUGIN_ARCHITEKTUR.md` (Peer-Review-Pflicht-Kriterien §15, Stop-Regeln §16), `FwAnnotationPulsePlugin.js` (Registrierungsmuster als Vorbild).
- **Stop-Regeln:** falls der `ChartEngine.js`-Patch mehr als die vier bekannten Stellen (Options-Lesen, State-Durchreichen, Config-Aufbau, Plugin-Push) berühren müsste → stoppen, Rückfrage; falls Emoji-Rendering auf einer Zielplattform komplett fehlschlägt (Tofu-Box) → stoppen, Produktentscheidung Text-Label statt Emoji einholen, keine eigenmächtige Wahl.
- **Ergebnisprotokoll:** `docs/steering/patches/AP-prokrast-03d_..._Ergebnis.md`.
- **Nachgelagerte QA:** AP-prokrast-03e (oder Folge-AP) — Screen-4-Integration (Reveal + Plugin zusammen), mit den QA-Punkten aus AP-03a/03b plus den A11y-/Emoji-Prüfpunkten aus diesem AP.

## Geänderte Dateien

Erlaubt:

- `docs/steering/patches/AP-prokrast-03c_peer-review_rubikon-reveal_canvas-text-plugin_Ergebnis.md`

Nicht erlaubt und nicht geändert:

- `Apps/prokrastinations-preis/app.js`: unverändert (nur in AP-03b gelesen, in diesem AP nicht erneut gelesen)
- `Apps/prokrastinations-preis/app.css`: unverändert
- `Apps/prokrastinations-preis/APP_SPEC.md`: unverändert
- `Apps/prokrastinations-preis/config/stations.de.json`: nicht gelesen, nicht geändert
- `Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js`: existiert nicht, nicht angelegt (Nicht-Ziel dieses APs)
- bestehende Plugin-Dateien (`FwAnnotationPulsePlugin.js`, `FwVerticalLinePlugin.js`, `plugins/index.js`): unverändert (nur gelesen bzw. aus Vorprotokollen übernommen)
- Chart-Engine-Dateien (`ChartEngine.js`, `LineChartStrategy.js`, `FwSmartXAxis.js`, `BaseChartStrategy.js`): unverändert
- Spec-Dateien (`docs/spec/*`): unverändert

## Wiederlesen des Ergebnisprotokolls

- Ergebnisprotokoll nach Write vollständig wiedergelesen: ja
- Abgleich gegen Aufgabenstellung bestanden: ja
- Abweichungen: keine

## Offene Punkte

- Architektur: keine offenen Architekturfragen für den Plugin-Bau selbst; `domainX`/`dataY`-Erweiterung bewusst vertagt
- Code: kein Code in diesem AP geändert
- UX: exakte y-Position der ✅/❓-Symbole „auf Höhe der Chartlinie" bleibt approximativ (plotFraction-Limitation), visuelle Feinjustierung im Implementierungs-AP nötig
- CSS: keine (Plugin ist reine Canvas-Logik)
- Daten: keine offenen Fragen
- Test: siehe QA-Punkte in „Empfehlung für nächsten AP" und Risikoanalyse
- Mobile: Emoji-/Font-Darstellung auf mind. zwei Plattformen prüfen; `plotFraction`-Werte auf S-Zone gesondert visuell prüfen
- Reduced Motion: für dieses Plugin strukturell irrelevant (keine Animation) — kein RM-Zweig nötig
- A11y: Pflicht-DOM-Kopie für semantisch relevanten Canvas-Text ist die zentrale offene Umsetzungsaufgabe für den nächsten App-Layer-AP
- Backlog: keine neuen Backlog-Einträge aus diesem AP

## Abschlussfrage

- **Was ist jetzt der nächste richtige AP?** AP-prokrast-03d — `FwChartTextPlugin.js` Minimum-Implementierung (isoliert, Plugin-Layer, vor Screen-4-Integration), wartet auf Nutzer-OK.
- **Was ist ausdrücklich nicht der nächste AP?** Card-to-Point, generische Koordinaten-API, DOM-Overlay-Bau, Screen-2-Animation, Screen-3-Timing-Reveal, APP_SPEC-Migration, Stationsdatenkorrektur, Screen-4-Integration (folgt erst nach isoliertem Plugin-QA), Commit, Abschlussritual.
