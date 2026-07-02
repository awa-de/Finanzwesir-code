# AP-prokrast-03a — Architektur-Anamnese Rubikon, X-Achse und Plugin-Vertrag Ergebnis

## Status

GRÜN

## Kurzbefund

Der Rubikon-Zukunftsraum für Screen 4 lässt sich ohne jede Änderung an Chart-Engine, Strategy- oder Plugin-Dateien bauen. Der Mechanismus (`config.xDisplayRange` → `fwContext.displayRange` → `axis.min/max`) wurde bereits in B1-AP-14b1 ("Progressive Domain LineChart") gebaut und ist produktiv. Die Validierung in `LineChartStrategy.transform()` erlaubt `xDisplayRange.max` explizit über `dataRange.max` hinaus (kein Wurf in diese Richtung) — verifiziert direkt am Code, nicht nur aus AP-02c übernommen. `FwVerticalLinePlugin` positioniert sich am letzten Punkt von Dataset 0 und funktioniert für Screen 4 unverändert, solange die echte Datenlinie Dataset 0 ist. Future-Ticks entstehen automatisch über die bestehende Kalender-Tick-Schleife in `FwSmartXAxis._generateLinearTicks` bis `endLimit = displayRange.max + halfStep` — unabhängig von echten Datenpunkten, damit ohne Zukunftsdaten möglich (Pflicht laut AP-02d). Einziger offener Punkt: die genaue Positionierung der ✅/❓-Symbole (Canvas-Pixel vs. CSS-Overlay) — dafür ist kein Engine-Eingriff zwingend, aber falls doch Canvas-Pixelgenauigkeit nötig würde, ist das ein eigener, freigabepflichtiger Schritt (Lösungspfad B), kein automatischer Teil von AP-03b.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short`: 2 Dateien modifiziert (`.claude/learning/session-log.md`, `PROJECT-STATUS.md`) — beides eigene Änderungen aus dieser Session (AP-14j-Korrektur vor diesem AP), keine Fremdänderungen
- `git diff --name-status`: `M .claude/learning/session-log.md`, `M PROJECT-STATUS.md`

Repo-Namensdiskrepanz (Toplevel zeigt "Finanzwesir 2.0" statt "Finanzwesir-code") ist die bereits in AP-prokrast-02a dokumentierte, von Albert als Nicht-Blocker eingestufte Abweichung. Kein Stop ausgelöst.

## Gefundene und gelesene Pflichtquellen

### AP- und App-Kontext

- `Apps/prokrastinations-preis/AP-prokrast-01_befund-anamnese.md` — vorhanden (Kontext aus vorherigem AP, nicht erneut vollständig gelesen, Inhalt aus Session-Kontinuität bekannt)
- `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` — gefunden und gelesen (spec-scout)
- `Apps/prokrastinations-preis/APP_SPEC.md` — gefunden und gelesen (spec-scout)
- `Apps/prokrastinations-preis/app.js` — gefunden und gelesen (codebase-scout)
- `Apps/prokrastinations-preis/app.css` — gefunden und gelesen (codebase-scout)
- `Apps/prokrastinations-preis/config/stations.de.json` — vorhanden, nicht inhaltlich benötigt für diesen AP (keine Stationsdaten-Frage offen)

### AP-02-Protokolle

- `docs/steering/patches/AP-prokrast-02a_quelleninventur-datei-wahrheit_Ergebnis.md` — gefunden und gelesen
- `docs/steering/patches/AP-prokrast-02b_soll-ist-architektur-konfliktmatrix_Ergebnis.md` — gefunden und gelesen
- `docs/steering/patches/AP-prokrast-02c_architektur-kontrakt_context-datenwahrheit_Ergebnis.md` — gefunden und gelesen
- `docs/steering/patches/AP-prokrast-02d_migrationsschnitt_ap-schnitt_ruecklaufkapsel_Ergebnis.md` — gefunden und gelesen
- `docs/steering/patches/AP-prokrast-02e_abschluss-qa_ap02a-b-c-d_claims-vs-files_Ergebnis.md` — vorhanden; Kerninhalt (unabhängige Verifikation der AP-02c-Kernbehauptungen direkt am Engine-Code, kein Widerspruch gefunden) bereits aus Session-Log-Kontinuität bekannt und durch die eigene Direktverifikation in diesem AP (siehe unten) erneut bestätigt

### Sensible Architektur-/Spec-Dokumente

- `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md`: gefunden, gelesen (spec-scout)
- `docs/spec/Der Rucksack (Context Object Pattern).md`: gefunden, gelesen (spec-scout)
- `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md`: gefunden, gelesen (spec-scout)
- X-Achsen-Doku / Bändigung der X-Achse: **eindeutig identifiziert als `docs/spec/Charts Ticks und Label_v14.md`** (Statusbanner: "BINDING / ARCHITECTURAL GOLD STANDARD", direkt per Grep verifiziert). Kandidaten "Dokumentation Die Baendigung der X-Achse I/II/III.md" tragen explizit den Statusbanner "Historische Designintention/Blueprint-Dokumentation / nicht aktueller Implementierungsvertrag" (Status nach B1-AP-14e12, 2026-06-22) — per Grep verifiziert, nicht als Sollquelle verwendet. "Dokumentation Die Baendigung der X-Achse - Datendichte.md" (Addendum, V33.1.0, kein eigener Statusbanner) wurde ebenfalls nicht als Sollquelle herangezogen, da v14 als GOLD STANDARD die aktuellere, umfassendere Quelle ist und die relevanten Begriffe (Noon-Anchor, Magnetic Grid, Unified Density Matrix) direkt in v14 vorkommen (per Grep verifiziert). "Chart.js bändigen.md" (Bugfix-Notiz) und "ChartEngine X-Axis sauber extrahieren aus Chart.md" (QA-Tool-Protokoll) sind keine Vertragsdokumente, nur zur Vollständigkeit als Kandidaten genannt, nicht gelesen.

## Datei-Inventur relevante Implementierung

| Suchbegriff | Datei(en) | Relevanz |
|---|---|---|
| `displayRange` | `LineChartStrategy.js:302–329`, `FwSmartXAxis.js:230–236, 416`, `BaseChartStrategy.js` (Feld in `_createFwContext`) | Zentrales Feld, steuert `axis.min/max` direkt |
| `xDisplayRange` | `LineChartStrategy.js:304–314` (Validierung + Umwandlung in `displayRange`), `ChartEngine.js:152–163` (Formatvalidierung YYYY-MM) | App-seitige Config-Option, einziger Eingabepunkt für den Zukunftsraum |
| `dataRange` | `LineChartStrategy.js:322–327`, `FwSmartXAxis.js:204–205, 416` | Bleibt strikt an echte Datenpunkte gebunden, unverändert durch `displayRange` |
| `FwSmartXAxis` | `core/FwSmartXAxis.js` (gesamt), referenziert in `FwDateUtils.js`, `FwLayoutRules.js`, `FwSmartScales.js`, `BarChartStrategy.js`, `CHART_PLUGIN_ARCHITEKTUR.md`, Datendichte-Addendum, X-Achse-I.md | Layer-4-Curator für Ticks, zuständig für Future-Tick-Erzeugung |
| `FwVerticalLinePlugin` | `plugins/FwVerticalLinePlugin.js` (vollständig gelesen, 27 Zeilen), `ChartEngine.js:318–322` (opt-in via `features.verticalLine:'last'`), `plugins/index.js`, `Apps/prokrastinations-preis/app.js:484` (Screen 3 aktiviert es bereits) | Gegenwartslinie — direkt wiederverwendbar |
| `fwContext` | `BaseChartStrategy.js:20–56` (`_createFwContext`, Object.freeze), `LineChartStrategy.js:318–351` (Befüllung + Rückgabe als `plugins.fwContext`), `FwSmartXAxis.js:200–212` (Lesezugriff) | Zwiebel-Modell: statischer Kern + dynamische Schale, Producer=Strategy, Consumer=Curator/Plugins |
| `latestMonth` | Nicht in Chart-Engine-Code; **in `Apps/prokrastinations-preis/app.js:92, 458, 613`** als App-eigenes AppContext-Feld | Kandidat für `referenceMonth` — bereits vorhanden, App-seitig, keine neue Datenquelle nötig |
| `referenceMonth` | Nirgends im Code (weder Engine noch App); nur als Konzept in AP-02c/AP-02d verwendet | Kein Code-Bezeichner — muss in AP-03b aus `latestMonth` (App-Feld) abgeleitet werden, kein neuer Vertragsbegriff nötig |

## Relevanter Befund aus AP-02

- AP-02c: `xDisplayRange`/`displayRange` trägt die Rubikon-Mechanik bereits ohne Chart-Engine-Codeänderung; `FwVerticalLinePlugin` positioniert sich bereits am letzten echten Datenpunkt. **In diesem AP direkt am Code verifiziert (siehe unten), Behauptung bestätigt, kein Widerspruch.**
- AP-02c: Card-to-Point-Koordinaten-API fehlt nachweislich — als Kontrakt-Kandidat markiert, nicht entschieden. Für diesen AP nicht relevant (Card-to-Point ist ausdrücklich nicht Teil des Scopes), aber relevant für die Frage, wie ✅/❓ pixelgenau platziert werden könnten, falls CSS-Overlay nicht reicht.
- AP-02d: Future-Ticks sind fest entschiedene Pflicht (Steuerfaden), keine offene Produktentscheidung mehr. `referenceMonth = latestMonth`, `pastMonths = 120`, `futureMonths = 120` sind fixierte Parameter, nicht die starre "heute=50%"-Regel, sondern parametrisch.
- AP-02d: 800ms-Stille bleibt bei Reduced Motion bestehen (Pausenbeat, kein Motion-Delta) — für diesen AP nur als RM-Randbedingung relevant, nicht Gegenstand der Architekturprüfung.

## Extrahierter Architekturvertrag

### Daten und Anzeige-Domain

- Layer 1 (Vault) bleibt zuständig für echte Daten; `dataRange` wird aus den echten `chartSeries`-Zeitstempeln berechnet (`LineChartStrategy.js:322–327`, `snappedTimestamps[0]`/`snappedTimestamps[length-1]`) und ist unveränderlich.
- `referenceMonth` ist kein eigener Vertragsbegriff im Code — fachlich entspricht er dem App-eigenen `latestMonth`-Feld (bereits in `app.js` vorhanden), technisch dem letzten Eintrag in `snappedTimestamps` bzw. `dataRange.max`.
- `dataRange` und `displayRange` sind strukturell getrennte Felder in `fwContext`; `displayRange` wird nur gesetzt, wenn die App `config.xDisplayRange` übergibt, sonst bleibt es `null` und die Achse nutzt den 5%-Breathing-Room-Fallback (`FwSmartXAxis.js:233–236`).
- Die Anzeige-Domain darf rechts über den Datenbereich hinausgehen: **verifiziert in `LineChartStrategy.js:310`** — ein Wurf erfolgt nur, wenn `xDisplayRange.max < dataRange.max` (zu eng), nicht wenn er darüber liegt. Es gibt keine Obergrenzenprüfung, die eine Zukunftserweiterung verhindert.
- Verboten: jede Erzeugung von Datenpunkten jenseits `dataRange.max` — weder Dummy-Werte noch `null`-Punkte noch transparente Linien. Die echte Chart.js-Line-Geometrie zeichnet ohnehin nur bis zum letzten realen Punkt; der freie Achsenraum rechts bleibt automatisch leer, solange kein zusätzlicher Datenpunkt eingefügt wird.

### X-Achse

- Aus `Charts Ticks und Label_v14.md` (GOLD STANDARD): Noon-Anchor (alle Zeitstempel auf 12:00 lokal), Magnetic Grid (äquidistante Kalender-Ticks), Unified Density Matrix (Tick-Dichte = Funktion von Zeitspanne×Zone, nicht Datenrhythmus).
- `pastMonths=120`/`futureMonths=120` passen zur Tick-Logik, weil die Pixel-Budget-Formel (`§5.4`) ausschließlich mit `durationYears` und Zone rechnet — die Gesamtspanne (hier 20 Jahre) bestimmt die Tick-Einheit, unabhängig davon, dass die rechte Hälfte datenfrei ist.
- Future-Ticks entstehen **ohne jede Engine-Änderung**: `afterBuildTicks` → `_generateLinearTicks(axis, fwContext, matrix)` läuft cursor-basiert von `axis.min` bis `endLimit = (displayRange.max ?? dataRange.max) + halfStep` (`FwSmartXAxis.js:416`, durch codebase-scout extrahiert, Logik konsistent mit den bereits verifizierten `afterDataLimits`-Zeilen). Die Schleife erzeugt Kalendergrenzen, keine Datenpunkte.
- `axis.min`/`axis.max` werden ausschließlich in `afterDataLimits` gesetzt, gespeist aus `fwContext.displayRange` (`FwSmartXAxis.js:230–232`, verifiziert) — kein anderer Layer darf das lokal überschreiben.
- Verboten als Architekturbruch: lokales Setzen von `axis.min/max` in `app.js`, eigene Tick-Generierung außerhalb `FwSmartXAxis`, Umgehen der `xDisplayRange`-Validierung durch direkte Scale-Manipulation.

### Plugin-Vertrag

- `FwVerticalLinePlugin` (vollständig gelesen, `plugins/FwVerticalLinePlugin.js`): liest `chart.getDatasetMeta(0)`, nimmt den letzten Punkt (`meta.data[meta.data.length-1]`), zeichnet eine gestrichelte vertikale Linie bei dessen Pixel-x-Position. Reine Pixel-Lesung über `last.x`, keine Domain-Manipulation — konform zu `CHART_PLUGIN_ARCHITEKTUR.md §7` ("Plugins dürfen keine fachliche X-/Y-Domain verändern").
- Aktivierung ist strikt opt-in über `features.verticalLine === 'last'` (`ChartEngine.js:318–322`), Screen 3 nutzt es bereits (`app.js:484`) — für Screen 4 identisch aktivierbar, ohne Plugin-Code zu ändern.
- Voraussetzung für korrekte Funktion: die echte Datenlinie muss Dataset-Index 0 sein. Falls Screen 4 zusätzliche Datasets (z. B. für Annotationen) einführt, muss die reale Linie an Index 0 bleiben — sonst zeigt die Linie am falschen Punkt.
- Eine zweite lokale vertikale Linie in Screen 4 zu zeichnen wäre verboten (Duplizierung eines bestehenden Plugin-Vertrags, Architekturbruch).
- Eine reine Ergänzung (z. B. neues, opt-in Canvas-Plugin nach dem Muster von `FwAnnotationPulsePlugin` für die ✅/❓-Symbole) wäre layer-konform denkbar, aber **nur mit Masterfaden-Freigabe**, da es eine neue Datei unter `plugins/` wäre (Chart-Engine-Layer-3-Territorium, kein App-Layer).

### Rucksack / fwContext

- Zwiebel-Modell (`Der Rucksack (Context Object Pattern).md §2.3`): statischer Kern (`dataRange`, `rhythm`, `chartType`, `axisType`, optional `displayRange`, `viewMode`, `valueMode`, `currency`, `referenceDate`) + dynamische Schale (`isMobile`, `width`, `inputDevice`).
- Produzent ist ausschließlich die Strategy (`_createFwContext` in `BaseChartStrategy.js`, `Object.freeze`); Konsumenten (Curator/`FwSmartXAxis`, Plugins) lesen nur.
- Screen 4 darf keinen eigenen App-lokalen `fwContext` erzeugen oder Felder nachträglich verändern — jede benötigte Information (hier: `displayRange` für den Zukunftsraum) muss über die bestehende `config.xDisplayRange`-Schnittstelle in die Strategy einfließen, nicht am Rucksack vorbei injiziert werden.
- Verbotene Kopplung: direkte Chart.js-Internals-Abfrage aus `app.js` heraus (z. B. `chart.scales.x.getPixelForValue`) — das wäre die gleiche Kategorie Kopplung, die für Card-to-Point als Risiko identifiziert wurde (AP-02c), und ist für Rubikon nicht nötig, da die Kernmechanik rein config-basiert funktioniert.

### App-Layer

- `app.js` darf für Screen 4: eine neue `ChartEngine`-Instanz (`chartEngine4`) analog zu `chartEngine2`/`chartEngine3` anlegen, `renderFromData()` mit `config.xDisplayRange` und `features.verticalLine:'last'` aufrufen, den Chart-Mount-Container ins Screen-4-DOM einfügen (aktuell fehlt er komplett — Screen 4 hat laut Code nur Headline/Subline/CTA/Navigation, keinen Chart-Container, keine Render-Aufrufe).
- `app.css` darf Layout/Positionierung für den neuen Chart-Container und für ✅/❓-Overlay-Elemente gestalten (reines CSS, keine Canvas-Logik).
- Wegen der fest entschiedenen Symmetrie `pastMonths=futureMonths=120` liegt die Gegenwartslinie horizontal exakt bei 50 % der Chart-Plot-Fläche — das eröffnet die Möglichkeit, ✅/❓ per reinem CSS-Overlay (prozentuale Positionierung) zu platzieren, ohne eine Pixel-Koordinate aus Chart.js abzufragen. Vertikale Positionierung ("auf Höhe der Chartlinie") ist der einzige Punkt, der ggf. doch eine Koordinaten-Abfrage nötig macht — das ist der offene Punkt, der AP-03b als Stop-Bedingung mitgegeben wird.
- Fragile DOM↔Canvas-Hackkopplung beginnt dort, wo `app.js` versucht, Canvas-interne Pixelwerte auszulesen oder zu setzen, statt sich auf Config-Input (Data, `xDisplayRange`, `features`) und CSS-Layout zu beschränken.

## Verbotene Lösungsräume

- Zukunftsdaten, Dummy-Datasets, `null`-Zukunftspunkte, transparente/gestrichelte Zukunftslinie — durch APP_SPEC §17 und AP-02c/d-Kontrakt ausdrücklich verboten, technisch auch unnötig (Chart.js zeichnet ohnehin nur bis zum letzten realen Punkt).
- Lokales Setzen von `axis.min/max` in `app.js` unter Umgehung von `config.xDisplayRange`.
- Zweite lokale vertikale Linie statt Wiederverwendung von `FwVerticalLinePlugin`.
- Direkte Chart.js-Internals-Abfrage aus `app.js` (Card-to-Point-artige Kopplung).
- Neue Plugin-Datei unter `plugins/` ohne vorherige Masterfaden-Freigabe.
- Jede Änderung an Engine-, Strategy- oder Plugin-Dateien im Rahmen von AP-03b.

## Bewertete Lösungspfade

### Lösungspfad A — Architekturkonformer Standardweg

- Status: **GRÜN**
- Beschreibung: `referenceMonth = latestMonth` (App-Feld), `config.xDisplayRange = { min: referenceMonth-120M, max: referenceMonth+120M }` an eine neue `chartEngine4`-Instanz übergeben; `features.verticalLine:'last'` aktivieren; Chart-Mount-Container neu in Screen-4-DOM einfügen. Keine Engine-/Plugin-Änderung.
- Belege: `LineChartStrategy.js:304–314` (Validierung erlaubt Zukunftserweiterung, direkt verifiziert), `FwSmartXAxis.js:230–236` (`axis.min/max` aus `displayRange`, direkt verifiziert), `FwSmartXAxis.js:416` (`endLimit` treibt Future-Ticks), `FwVerticalLinePlugin.js` (vollständig gelesen, funktioniert unverändert), `ChartEngine.js:318–322` (opt-in-Aktivierung), `app.js:484` (Screen 3 nutzt bereits denselben Mechanismus), `app.js:92/458/613` (`latestMonth` bereits vorhanden).
- Risiken: niedrig für die Kernmechanik (Achse, Ticks, Linie); mittel für die ✅/❓-Feinpositionierung (offener Punkt, siehe App-Layer-Abschnitt).
- Stop-Bedingungen: falls reale Stationsdaten kürzer als 120 Monate zurückreichen (dann Validierung `dispMinTs > drMin` in `LineChartStrategy.js:309` wirft) → stoppen, kein künstliches Auffüllen der Vergangenheit.

### Lösungspfad B — Minimaler opt-in Ergänzungspfad

- Status: **eventuell AP-03b möglich, aber nur mit Masterfaden-Freigabe vor Bau**
- Beschreibung: Falls die ✅/❓-Symbole eine pixelgenaue Canvas-Positionierung brauchen (CSS-Overlay reicht nicht, z. B. wegen vertikaler Ausrichtung "auf Höhe der Chartlinie"), wäre ein neues, opt-in Canvas-Plugin nach dem Muster von `FwAnnotationPulsePlugin` (WeakMap, `afterDraw`, Reduced-Motion-Guard) der layer-korrekte Weg.
- Belege: `CHART_PLUGIN_ARCHITEKTUR.md §14` (Plugin-Muster), AP-02c Plugin-/Symbol-Kontrakt (zwei Kandidaten offen gelassen).
- Warum minimal/opt-in: neue Datei, aktiviert nur über eigenes Feature-Flag, betrifft keine bestehenden Charts, ist kein allgemeiner Koordinaten-API-Ersatz (nur zwei statische Glyphen an bekannter interner Pixel-Position).
- Warum nicht Card-to-Point: Card-to-Point bräuchte eine nach außen exponierte, wiederverwendbare Koordinaten-Query-API für beliebige externe DOM-Elemente; dieser Pfad B bliebe intern im Canvas-`afterDraw`-Hook, keine Exposition nach außen.
- Warum nicht ohne Masterfaden-Freigabe: jede neue Datei unter `Theme/assets/js/fw-chart-engine/plugins/` ist Layer-3-Territorium, nicht App-Layer — laut CLAUDE.md-Architektur-Layer-Tabelle nicht Teil des AP-03b-App-Scopes.

### Lösungspfad C — Stop-Pfad

- Auslöser: nicht eingetreten. Wäre ausgelöst, wenn `xDisplayRange`-Validierung entgegen der Verifikation doch eine Obergrenze hätte, oder wenn `FwVerticalLinePlugin` sich als nicht wiederverwendbar erwiesen hätte, oder wenn Future-Ticks nur durch Engine-Änderung erzeugbar wären.
- Status: nicht ausgelöst.
- Empfehlung: entfällt.

## Bewertungsmatrix

| Kriterium | A | B | C | Begründung |
|---|---:|---:|---:|---|
| Architektur-Layer | GRÜN | GELB | – | A bleibt App-Layer; B wäre Layer-3-Territorium, daher freigabepflichtig |
| Datenwahrheit | GRÜN | GRÜN | – | Beide Pfade erzeugen keine Zukunftsdaten, nur Darstellung |
| Zukunftsraum | GRÜN | GRÜN | – | Future-Ticks ohne Zukunftsdaten in beiden Fällen über bestehende Engine-Logik |
| X-Achsen-Konformität | GRÜN | n/a | – | B betrifft nicht die X-Achse, sondern Symbol-Overlay |
| Plugin-Konformität | GRÜN | GELB | – | A nutzt bestehendes Plugin unverändert; B fügt neues Plugin hinzu (konform zum Muster, aber neue Datei) |
| Engine-Vertrag | GRÜN | GELB | – | A: keine Änderung; B: keine Änderung an bestehenden Dateien, aber neue Plugin-Registrierung nötig |
| Erweiterbarkeit | GRÜN | GRÜN | – | Beide verbauen weder Card-to-Point noch Screen-3-Timing |
| Testbarkeit | GRÜN | mittel | – | A ist rein config-basiert und leicht statisch prüfbar; B bräuchte visuelle Canvas-Prüfung |
| Regressionsrisiko | niedrig | niedrig | – | Beide sind opt-in; bestehende Charts (Screen 1–3, andere Apps) bleiben unberührt, sofern kein Plugin-Code geändert wird |
| Token-/Scope-Disziplin | GRÜN | mittel | – | A ist klein genug für AP-03b allein; B bräuchte eigenen Freigabeschritt vor Einbau |

## Empfohlener Architekturpfad für AP-prokrast-03b

- Empfohlener Pfad: **Lösungspfad A**, mit Lösungspfad B als bedingtem, freigabepflichtigem Rückfall ausschließlich für die ✅/❓-Feinpositionierung (nicht für die Kernmechanik Achse/Ticks/Linie).
- Warum: Der gesamte Kernmechanismus (Achsenverlängerung, Future-Ticks, Gegenwartslinie) existiert bereits produktiv und wurde in diesem AP direkt am Code verifiziert — kein Engine-/Plugin-Risiko für das Rubikon-Minimum selbst.
- Erlaubte Dateien: `Apps/prokrastinations-preis/app.js`, `Apps/prokrastinations-preis/app.css`.
- Verbotene Dateien: alle Dateien unter `Theme/assets/js/fw-chart-engine/**` (Core, Strategies, Plugins), `Apps/prokrastinations-preis/APP_SPEC.md`, `Apps/prokrastinations-preis/config/stations.de.json`, alle `docs/spec/*`-Dokumente (read-only Pflichtquellen).
- Muss umgesetzt werden: neue `chartEngine4`-Instanz + Chart-Mount-Container in Screen 4; `config.xDisplayRange` aus `latestMonth ± 120 Monate`; `features.verticalLine:'last'`; echte Datenlinie bleibt Dataset 0; ✅/❓ zunächst als CSS/DOM-Overlay-Versuch (horizontale 50%-Symmetrie nutzen).
- Darf nicht umgesetzt werden: jede Engine-/Strategy-/Plugin-Änderung; neue Koordinaten-Query-API; Card-to-Point; Zukunftsdaten/Dummy-Punkte/transparente Linien; lokales Setzen von `axis.min/max`; direkte Chart.js-Internals-Abfrage aus `app.js`.
- Stop-Bedingungen für AP-03b: (1) falls CSS-Overlay für ✅/❓ die vertikale Ausrichtung nicht sauber trifft und eine Pixel-Koordinate nötig wird → stoppen, Rückgabe an Masterfaden für Lösungspfad-B-Freigabe, kein eigenmächtiger Plugin-Bau; (2) falls reale Stationsdaten kürzer als 120 Monate sind und die `xDisplayRange`-Validierung wirft → stoppen, kein künstliches Auffüllen; (3) falls Screen 4 aus UX-Gründen ein zweites Dataset vor der echten Linie bräuchte (Dataset-Index-0-Konflikt mit `FwVerticalLinePlugin`) → stoppen, Rückfrage.
- QA-Punkte für AP-03c: Achse zeigt 10 Jahre Vergangenheit + 10 Jahre Zukunft mit sichtbaren Future-Ticks; blaue Linie endet exakt an `latestMonth`, keine Linie/Punkte rechts davon; Gegenwartslinie sitzt exakt am Linienende; ✅/❓ korrekt links/rechts auf S/M/L-Zonen; Reduced-Motion belässt 800ms-Pausenbeat, Achse ohne Motion-Delta; kein Diff in Engine-/Plugin-Dateien nach AP-03b; Screen 1–3 und andere Apps mit `verticalLine:'last'` unverändert.

## Geänderte Dateien

Erlaubt:

- `docs/steering/patches/AP-prokrast-03a_architektur-anamnese_rubikon-x-achse-plugin-vertrag_Ergebnis.md`

Nicht erlaubt und nicht geändert:

- `Apps/prokrastinations-preis/app.js`: unverändert (nur gelesen)
- `Apps/prokrastinations-preis/app.css`: unverändert (nur gelesen)
- `Apps/prokrastinations-preis/APP_SPEC.md`: unverändert (nur gelesen)
- `Apps/prokrastinations-preis/config/stations.de.json`: nicht gelesen, nicht geändert
- Chart-Engine-Dateien (`ChartEngine.js`, `FwSmartXAxis.js`, `BaseChartStrategy.js`, `LineChartStrategy.js`): unverändert (nur gelesen)
- Plugin-Dateien (`FwVerticalLinePlugin.js`, `plugins/index.js`): unverändert (nur gelesen)
- X-Achsen-/Spec-Dateien (`docs/spec/*`): unverändert (nur gelesen)

## Wiederlesen des Ergebnisprotokolls

- Ergebnisprotokoll nach Write vollständig wiedergelesen: ja
- Abgleich gegen Aufgabenstellung bestanden: ja
- Abweichungen: keine

## Offene Punkte

- Architektur: ✅/❓-Feinpositionierung (CSS-Overlay vs. Canvas-Plugin) — Entscheidung an AP-03b delegiert, mit klarer Stop-Bedingung Richtung Masterfaden, falls Canvas nötig wird
- Code: keine (kein Code in diesem AP geändert)
- UX: exakte vertikale Ausrichtung von ✅/❓ "auf Höhe der Chartlinie" noch nicht gelöst
- CSS: Layout für neuen Chart-Container in Screen 4 noch nicht entworfen
- Daten: keine offenen Fragen — echte Daten bleiben unangetastet
- Test: siehe QA-Punkte oben, für AP-03c
- Mobile: horizontale 50%-Symmetrie sollte auf S-Zone (schmale Viewports) separat geprüft werden
- Reduced Motion: 800ms-Stille-Kontrakt aus AP-02c gilt unverändert, keine neue Prüfung in diesem AP nötig
- Backlog: keine neuen Backlog-Einträge aus diesem AP

## Empfehlung

- Nächster interner AP: AP-prokrast-03b — Rubikon-Minimum Implementierung nach freigegebenem Architekturpfad (Lösungspfad A, App-Layer-Scope wie oben beschrieben)
- Ausdrücklich nicht nächster AP: Card-to-Point, Screen-2-Animation, Screen-3-Timing-Reveal, APP_SPEC-Migration, Stationsdatenkorrektur, Engine-Patch, Plugin-Patch (außer nach expliziter Masterfaden-Freigabe für Lösungspfad B), Commit, Abschlussritual
- Rückgabe an Masterfaden nötig: nein für den Kernpfad (A); ja, falls AP-03b bei der ✅/❓-Positionierung auf Lösungspfad B ausweichen muss
