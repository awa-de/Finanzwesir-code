# AP-prokrast-02d — Migrationsschnitt, AP-Schnitt und Rücklaufkapsel — Ergebnis

## Status

Status: GRÜN
Blocker: nein

## Kurzbefund

AP-02a–c liegen konsistent vor und werden hier zu einem einzigen Migrationsschnitt konsolidiert. Screen 1 ist bereits erfüllt, Screen 2 (Card-to-Point) und Screen 3 (Timing-Reveal) haben ein tragfähiges Grundgerüst, aber offene Bauflächen, Screen 4 (Rubikon) ist die größte Lücke, aber laut AP-02c architektonisch die risikoärmste, weil `xDisplayRange`/`FwVerticalLinePlugin` die Kernmechanik bereits tragen. Senior-Engineering-Schnitt: nicht mit Card-to-Point (höchste DOM↔Canvas-Kopplungsgefahr) beginnen, sondern mit dem Rubikon-Minimum als kleinster vertikaler Scheibe, die die Kernwirkung der App beweist. Empfohlener nächster Haupt-AP: **AP-prokrast-03 — Rubikon-Minimum als vertikale Scheibe**, mit paramerischer Domain (`referenceMonth`, `pastMonths=120`, `futureMonths=120`) und Pflicht-Future-Ticks.

## Steuerfaden-Klärungen übernommen

- Lokaler Repo-Root `Finanzwesir 2.0` ist korrekt trotz GitHub-Name `Finanzwesir-code`.
- Ergebnisdateien liegen unter `docs/steering/patches/`.
- Drehbuch ist amtliches, freigegebenes Zielbild — nicht erneut geprüft, ob es gilt.
- 7 Stationen sind verbindlich; „Station 1 von 8" bleibt redaktioneller Korrekturpunkt.
- Future-Ticks auf der rechten Rubikon-Achse sind Pflicht — Zeitmarken, keine Prognose; eine nackte rechte Achse ohne Ticks wäre fachlich falsch.
- Rubikon-Domain ist parametrisch: `referenceMonth` (Anker), `pastMonths`, `futureMonths` — nicht als starre „50%-heute"-Regel festgeschrieben. Für das aktuelle Drehbuch gilt `pastMonths = 120`, `futureMonths = 120`, wodurch „heute" rechnerisch in der Mitte liegt, aber nicht architektonisch fest verdrahtet ist.
- 800ms-Stille ist fachlich entschieden, keine offene Produktentscheidung, gehört in App-State/UI-Orchestration; bei Reduced Motion entfallen Bewegung/Fades, der Pausenbeat selbst bleibt bestehen (inhaltliche Dramaturgie, keine Bewegungsanimation).
- Card-to-Point bleibt Pflichtbestandteil des Drehbuchs, wird nicht gestrichen oder unverbindlich gemacht, aber nicht als erster Bauabschnitt empfohlen — braucht später einen eigenen Koordinaten-Schnittstellen-AP.
- Senior-Engineering-Schnitt: nächster Haupt-AP baut die kleinste vertikale Scheibe (Rubikon-Minimum), nicht die riskanteste Kopplung zuerst.

## Vorprüfung / Git-Baseline

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- Branch: `master`
- `git status --short` (vor AP-02d):
  ```
   M .claude/learning/session-log.md
  ?? Apps/prokrastinations-preis/AP-prokrast-01_befund-anamnese.md
  ?? Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md
  ?? docs/steering/patches/AP-prokrast-02a_quelleninventur-datei-wahrheit_Ergebnis.md
  ?? docs/steering/patches/AP-prokrast-02b_soll-ist-architektur-konfliktmatrix_Ergebnis.md
  ?? docs/steering/patches/AP-prokrast-02c_architektur-kontrakt_context-datenwahrheit_Ergebnis.md
  ```
- `git diff --name-status`: nur `.claude/learning/session-log.md` (Session-Start-Eintrag, LF/CRLF-Hinweis, kein Inhaltsproblem)
- Bewertung: Ausschließlich erwartete/tolerierte Pfade dirty/untracked. App-Code, APP_SPEC, CSS, Stationsdaten, Chart-Engine und Plugins sind clean. Kein Stop-Grund.

## Gelesene Pflichtquellen

| Quelle | Pfad | Gelesen? | Rolle | Bemerkung |
|---|---|---:|---|---|
| AP-02c-Ergebnis | `docs/steering/patches/AP-prokrast-02c_architektur-kontrakt_context-datenwahrheit_Ergebnis.md` | ja | Architektur-Befundanker | GRÜN, vollständig aus vorheriger Session bekannt und erneut geprüft |
| AP-02b-Ergebnis | `docs/steering/patches/AP-prokrast-02b_soll-ist-architektur-konfliktmatrix_Ergebnis.md` | ja | Konflikt-Befundanker | GRÜN, Konflikt- und Beat-Matrix vollständig herangezogen |
| AP-02a-Ergebnis | `docs/steering/patches/AP-prokrast-02a_quelleninventur-datei-wahrheit_Ergebnis.md` | ja | Quellen-Befundanker | GELB ohne Blocker, Quelleninventur vollständig herangezogen |
| Drehbuch | `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` | ja | amtliches Zielbild | Screen 1–4, Rubikon Beat 1–5, Responsive, Nicht-Ziele, Implementierungsnotizen |
| AP-prokrast-01-Befund | `Apps/prokrastinations-preis/AP-prokrast-01_befund-anamnese.md` | ja | Vorgänger-Anamnese | Ist/Soll-Abgleich gegen alte APP_SPEC |
| APP_SPEC.md | `Apps/prokrastinations-preis/APP_SPEC.md` | ja | Migrationsrealität Spec | §16.1/16.3/16.4/17 als Referenz für Ist-Struktur |
| app.js | `Apps/prokrastinations-preis/app.js` | ja | Migrationsrealität Code | Screen-1–4-DOM, `xDisplayRange`-Nutzung Screen 2, Screen-4 chartlos bestätigt |
| app.css | `Apps/prokrastinations-preis/app.css` | ja | Migrationsrealität Styling | keine Motion-Basis vorhanden (bestätigt) |
| stations.de.json | `Apps/prokrastinations-preis/config/stations.de.json` | ja | Datenwahrheit | 7/7 Stationen, SaaS-Bezug |

## Mechanische Prüfungen

| Prüfung | Ergebnis | Bemerkung |
|---|---|---|
| AP-02c GRÜN und lesbar | ✅ | `Status: GRÜN` gefunden, alle Pflichtabschnitte vorhanden |
| AP-02b GRÜN und lesbar | ✅ | `Status: GRÜN` gefunden, Konflikt- und Beat-Matrix vorhanden |
| AP-02a lesbar | ✅ | „Pflichtquellen vollständig: ja" und Quelleninventur gefunden |
| Drehbuch enthält Screen 1–4 / Rubikon / 800ms / Card-to-Point | ✅ | alle Signale gefunden |
| Stationsdaten parsebar und 7 Stationen | ✅ | JSON valide, 7/7, SaaS-Bezug bestätigt |
| App-Code/Spec/CSS/Stationsdaten im Diff clean | ✅ | `git diff --name-status` zeigt nur `session-log.md` |

## Konsolidiertes Sollbild

### Screen 1

- **Soll:** Headline „Vor 10 Jahren wäre besser gewesen. Was ist mit heute?", Slider, Button „10 Jahre zurückspringen", kein Chart/keine Zahlen (Drehbuch).
- **Ist:** app.js-Headline ist wortgleich mit dem Drehbuch; Slider und Button korrekt implementiert; keine Chart-/Zahlendarstellung vorhanden.
- **Migrationsentscheidung:** beibehalten — keine Änderung nötig. Subline ist im Drehbuch nicht spezifiziert, kann redaktionell unabhängig geprüft werden.
- **Nächster AP? nein**

### Screen 2

- **Soll:** Eventkarten groß, Beat A (Karte schrumpft, 300ms) → Beat B (Punkt pulst) → Beat C (nächste Karte fadet ein, 200ms), 7 Stationen, Muster „Groß → schrumpft → Punkt" (Drehbuch).
- **Ist:** fester 10-Jahres-Rahmen mit wachsender Linie vorhanden; `xDisplayRange` bereits produktiv genutzt (`renderJourneyStep`); Marker-Pulse (`FwAnnotationPulsePlugin`, B1-AP-14c4) bereits implementiert und wiederverwendbar für Beat B; StationCard wird per DOM-Replace ohne Übergang ausgetauscht — kein Schrumpf-/Wander-Übergang (Beat A/C fehlt vollständig).
- **Migrationsentscheidung:** Grundgerüst bleibt, Card-to-Point wird ergänzt — aber **nicht** als nächster Haupt-AP, weil die dafür nötige Koordinaten-Schnittstelle (App liest Chart-Pixelpositionen) heute nicht existiert und die riskanteste DOM↔Canvas-Kopplung im gesamten Migrationsschnitt darstellt (AP-02c, Card-to-Point-Kontrakt).
- **Nächster AP? nein — nachgelagert, eigener Koordinaten-Schnittstellen-AP nach AP-03**

### Screen 3

- **Soll:** erst ein Satz (kein Chart), dann verzögert der vollständige Chart, dann verzögert die KPI-Karten — gestaffelter Reveal (Drehbuch).
- **Ist:** DOM-Grundreihenfolge (Headline → Subline → Chart-Section → KPI-Slot → AssumptionsBox) stimmt bereits mit dem Drehbuch-Prinzip überein; `renderS3()` rendert aber synchron ohne jede Verzögerung/Fade; Copy-Texte weichen vom Drehbuch ab.
- **Migrationsentscheidung:** Grundstruktur bleibt, Timing-Staffelung wird ergänzt — reine App-State/Orchestrierungsarbeit ohne Chart-Engine-Beteiligung (AP-02c, Screen-3-Reveal-Kontrakt), architektonisch risikoarm, aber bewusst nachgelagert, um den Migrationsschnitt nicht zu zersplittern.
- **Nächster AP? nein — nachgelagert nach AP-03**

### Screen 4

- **Soll:** Rubikon-Mechanik in 5 Beats — X-Achse verlängert sich in leeren Zukunftsraum, Gegenwartslinie bleibt als Grenze stehen, ✅/❓-Symbole, ein Satz, 800ms Stille, Button-Reveal (Drehbuch).
- **Ist:** Screen 4 hat aktuell **keinen Chart-Mount** — nur Headline, Subline, CTA (`href=''`), Zurück-Button. Keine der fünf Beats ist implementiert. Gleichzeitig zeigt AP-02c, dass die Kernmechanik (Zukunftsraum, Gegenwartslinie) bereits über bestehende, unveränderte Engine-Bausteine (`xDisplayRange`/`displayRange`, `FwVerticalLinePlugin`) tragfähig ist, ohne dass Chart-Engine-Code geändert werden muss.
- **Migrationsentscheidung:** größte Lücke, aber architektonisch risikoärmste Baufläche — wird als Rubikon-Minimum zum nächsten Haupt-AP.
- **Nächster AP? ja — AP-prokrast-03**

## Festgezurrte Architektur- und Produktentscheidungen

| Entscheidung | Status | Begründung | Folge |
|---|---|---|---|
| Drehbuch wird vollständig umgesetzt | fest | amtliches, freigegebenes Zielbild (Steuerfaden) | jede spätere Spec-/Bauarbeit misst sich am Drehbuch, nicht an der alten APP_SPEC §16 |
| Screen 1 ist bereits erfüllt | fest | Ist-Code = Drehbuch-Wortlaut (AP-02b bestätigt) | kein Bauaufwand |
| Screen 2 Card-to-Point bleibt Pflicht, aber nachgelagert | fest | höchste DOM↔Canvas-Kopplungsgefahr, keine Koordinaten-API vorhanden (AP-02c) | eigener Schnittstellen-AP nach AP-03 |
| Screen 3 Timing-Reveal bleibt Pflicht, aber nachgelagert | fest | reine App-Orchestrierung, architektonisch unkritisch, aber nicht Teil des kleinsten Beweisschnitts | eigener AP nach AP-03 |
| Screen 4 Rubikon-Minimum ist nächster Haupt-AP | fest | größte Lücke bei gleichzeitig geringstem Architekturrisiko (bestehende Bausteine tragen bereits) | AP-prokrast-03 |
| Rubikon-X-Achse ist parametrisch (`referenceMonth`, `pastMonths`, `futureMonths`) | fest (Steuerfaden) | verhindert eine starre „heute=50%"-Architekturregel, bleibt für andere Verhältnisse erweiterbar | `xDisplayRange.min = referenceMonth − pastMonths`, `.max = referenceMonth + futureMonths` |
| Aktuelles Drehbuch: `pastMonths = 120`, `futureMonths = 120` | fest (Steuerfaden) | 10 Jahre zurück, 10 Jahre voraus, wie im Drehbuch beschrieben | „heute" liegt rechnerisch in der Mitte, ohne dass das architektonisch fest verdrahtet ist |
| Future-Ticks sind Pflicht | fest (Steuerfaden) | Zeitmarken, keine Prognose; eine nackte rechte Achse wäre fachlich falsch | AP-03 muss die rechte Achsenhälfte mit sichtbaren Ticks bauen, nicht unterdrücken |
| Keine Zukunftsdaten, keine Dummy-Datasets, keine transparente Zukunftslinie | fest | §17 APP_SPEC, AP-02c Datenwahrheit-Abschnitt | harte technische Grenze für AP-03 |
| Gegenwartslinie über bestehendes `FwVerticalLinePlugin` wiederverwenden | fest (AP-02c bestätigt am Code) | Plugin positioniert sich bereits am letzten echten Datenpunkt, nicht am Chart-Rand | kein neues Plugin nötig |
| 800ms-Stille ist entschieden, bleibt auch bei Reduced Motion als Pausenbeat | fest (Steuerfaden) | inhaltliche Dramaturgie, keine Bewegungsanimation im engeren Sinn | AP-03 baut die Stille als App-State-Timer, RM-unabhängig |
| ✅/❓ bevorzugt als DOM/UI prüfen, nicht vorschnell Canvas | fest (Steuerfaden für AP-03-Scope) | einfachere A11y-Anbindung (natives `aria-label`), Entscheidung bleibt aber grundsätzlich offen für spätere Feinjustierung | AP-03 prüft DOM-Variante zuerst |
| Card-to-Point braucht eigenen Koordinaten-Schnittstellen-AP | fest | keine öffentliche API vom Chart-Engine nach außen vorhanden (AP-02c) | separater AP nach AP-03, zwei Kontrakt-Kandidaten bereits vorskizziert |
| Ergebnisdateien liegen unter `docs/steering/patches/` | fest (Steuerfaden) | einheitliche Ablage, AP-02a wurde entsprechend normalisiert | gilt auch für AP-03 und alle Folge-APs |

## Migrationsschnitt

| Baustein | Jetzt / AP-03 | Späterer AP | Nicht tun | Begründung |
|---|---|---|---|---|
| Screen 1 | — (bereits erfüllt) | — | keine Änderung ohne neuen Anlass | Ist = Soll |
| Rubikon-X-Achse | AP-03 | — | lokaler Chart.js-Achsen-Hack statt `xDisplayRange` | bestehender Kontrakt trägt bereits (AP-02c) |
| Future-Ticks | AP-03 | — | Ticks im Zukunftsraum unterdrücken | Steuerfaden: Pflicht |
| Zukunftsraum ohne Daten | AP-03 | — | Dummy-/Fake-Datenpunkte, transparente Linie | §17, AP-02c Datenwahrheit |
| Gegenwartslinie | AP-03 | — | neues Linien-Plugin bauen | `FwVerticalLinePlugin` wiederverwenden |
| ✅ / ❓ | AP-03 (DOM/UI-Variante zuerst prüfen) | ggf. Canvas-Nachjustierung | Pixel-Hack außerhalb Plugin/DOM-Overlay | Steuerfaden-Präferenz DOM/UI |
| 800ms-Stille | AP-03 | — | in Chart-Engine/Strategy/Plugin verlagern | App-State/Orchestration, RM-beständig |
| CTA-Reveal | AP-03 (Fade-Mechanik + neuer Text) | CTA-Ziel-URL bleibt offen (E-04) | Ziel-URL in AP-03 festlegen | E-04 ist Produktentscheidung außerhalb dieses Migrationsschnitts |
| Reduced Motion | AP-03 (Endzustand für alle neuen Beats) | — | neue RM-Erkennungsmethode erfinden | bestehendes `_prefersReducedMotion()`-Muster kopieren |
| Mobile-Grundform | AP-03 (Grundform), Feinausbau später | Mobile-QA/Feintuning nach AP-03 | eigenes zweites Design | §14.0-Grundsatz |
| Card-to-Point | nachgelagert | eigener Koordinaten-Schnittstellen-AP nach AP-03 | in AP-03 mitbauen | höchste Kopplungsgefahr, kein Beweisschnitt-Bestandteil |
| Screen-3-Reveal | nachgelagert | eigener AP nach AP-03 | in AP-03 mitbauen | architektonisch unkritisch, aber eigener Scope |
| APP_SPEC-Migration | nachgelagert | eigener Spec-AP nach Umsetzungsschnitt | Spec vor Bau anpassen | Steuerfaden: kein Spec-Patch vor Migrationsschnitt |
| Commit/Abschluss | nicht in AP-02d/AP-03 | erst nach Nutzer-OK | automatisch committen | Freigabeprinzip |

## Nächster Haupt-AP

Empfohlener nächster Haupt-AP:

**AP-prokrast-03 — Rubikon-Minimum als vertikale Scheibe**

**Ziel:** Screen 4 als kleinste funktionsfähige vertikale Scheibe bauen, die die Kernwirkung des Rubikon-Konzepts (Gegenwart als Grenze zwischen bekannter Vergangenheit und offener, ungeschriebener Zukunft) tatsächlich erlebbar macht — ohne die riskanteste Baufläche (Card-to-Point) und ohne Screen-3-Umbau zu vermischen.

**Warum genau dieser AP:** Von den drei verbleibenden Bauflächen (Screen 2 Card-to-Point, Screen 3 Timing, Screen 4 Rubikon) ist Screen 4 die größte inhaltliche Lücke — es existiert aktuell überhaupt kein Chart dort. Gleichzeitig ist es laut AP-02c die architektonisch am besten vorbereitete Fläche: `xDisplayRange`/`displayRange` trägt die Achsenerweiterung bereits ohne Codeänderung, `FwVerticalLinePlugin` liefert die Gegenwartslinie ohne Codeänderung. Der Bauaufwand liegt damit fast ausschließlich in App-seitiger Orchestrierung (neuer Chart-Mount, Timing, CTA-Reveal) statt in neuer Engine-Architektur. Das ist der senior-engineering-taugliche Schnitt: die kleinste vertikale Scheibe, die den größten Beweis für die Kernwirkung liefert, mit dem geringsten architektonischen Risiko.

**Warum nicht Card-to-Point zuerst:** Card-to-Point erfordert eine heute nicht existierende Koordinaten-Schnittstelle zwischen App-State (DOM-Karte) und Chart-Engine (Canvas-Pixelposition) — die riskanteste, am wenigsten vorbereitete Kopplung im gesamten Drehbuch (AP-02c, Card-to-Point-Kontrakt: zwei ungeklärte Kontrakt-Kandidaten). Damit zuerst zu beginnen hieße, mit der größten Unsicherheit zu starten, statt zuerst Sicherheit über die einfachere, besser vorbereitete Fläche zu gewinnen.

**Warum nicht Screen 3 zuerst:** Screen 3 ist architektonisch unkritisch (reine App-Orchestrierung, kein Chart-Engine-Risiko), aber isoliert kein ausreichender Beweis für die Kernwirkung der App — der psychologisch entscheidende Moment liegt im Drehbuch klar auf Screen 4 (Rubikon als „Kern der App"). Ein separater Screen-3-AP bleibt sinnvoll, aber nicht als nächster Schritt vor dem inhaltlich zentraleren Rubikon-Minimum.

**Warum nicht APP_SPEC-Patch zuerst:** Der Steuerfaden hat für AP-prokrast-02 ausdrücklich festgelegt, dass kein Spec-Patch vor dem Migrationsschnitt geschrieben wird. Eine Spec-Aktualisierung vor dem tatsächlichen Bau würde eine Spec-Fiktion erzeugen (Regeln für Code, der noch nicht existiert) und liefe dem Prinzip „Spec schlägt Code, aber Code muss zuerst real gebaut und verifiziert sein, bevor er in die Spec einfließt" zuwider.

## AP-prokrast-03 — empfohlener Scope

### Pflicht

- Chart-Mount auf Screen 4 (neuer `data-fw-appchart`-Container, analog Screen 2/3)
- vollständige echte Linie bis `referenceMonth`
- `referenceMonth` als Monatsanker (= letzter echter Datenmonat, `ctx.latestMonth`)
- `pastMonths = 120`
- `futureMonths = 120`
- `xDisplayRange.min = referenceMonth − 120 Monate`
- `xDisplayRange.max = referenceMonth + 120 Monate`
- Future-Ticks sichtbar
- Gegenwartslinie in der Mitte (ergibt sich rechnerisch aus obiger Parametrisierung)
- rechte Achsenhälfte ohne Datenlinie
- keine Zukunftsdaten
- keine Dummy-Datasets
- keine transparente Zukunftslinie
- bestehendes `FwVerticalLinePlugin` wiederverwenden
- ✅/❓ zunächst bevorzugt als DOM/UI-Konzept prüfen
- 800ms-Stille
- CTA-Reveal
- Reduced-Motion-Endzustand
- Mobile-Grundform
- Scope-/Diff-QA

### Nicht in AP-03

- keine Card-to-Point-Animation
- keine neue Card-to-Point-Koordinaten-API
- kein Screen-3-Reveal
- kein vollständiger Drehbuch-Bau
- kein APP_SPEC-Patch
- kein Commit
- kein Abschlussritual
- keine globale Engine-Refaktorierung

## Spätere APs

- **Nach AP-03:** Card-to-Point-Koordinaten-Schnittstelle (Entscheidung zwischen Read-only-Query-API und Plugin/Event-Ansatz, siehe AP-02c) und darauf aufbauend die Screen-2-Kartenanimation.
- **Danach:** Screen-3 Timing-Reveal (Satz → Chart → KPI gestaffelt).
- **Danach oder separat:** APP_SPEC-Migration (Screen 1–4 auf das Drehbuch nachziehen, §14.6-Rubikon-Ausnahme dokumentieren, §16-Primitive-Liste erweitern) und redaktionelle Korrekturen (Station-1-von-8-Tippfehler, Pulse-Anzahl, CTA-Ziel-URL E-04).
- **Danach:** QA/Commit/Abschluss — jeweils erst nach Nutzer-OK, kein AP in dieser Kette automatisiert bis zum Commit.

## Risiken und Schutzgeländer

- **Prognosewirkung durch Zukunftsachse:** Future-Ticks dürfen niemals mit einer Linie oder einem Wert verbunden werden — reine Zeitmarken. Schutzgeländer: §17-Verbotsliste, AP-02c Datenwahrheit-Abschnitt.
- **Fake-Daten:** kein Datenpunkt jenseits `dataRange.max` in `chartSeries`. Schutzgeländer: bestehende Validierung in `LineChartStrategy`/`ChartEngine.renderFromData()` bleibt unverändert bindend.
- **Future-Ticks missverstanden als Prognose:** Redaktionelle/visuelle Sorgfaltspflicht in AP-03 — Ticks müssen sich optisch klar von einer Datenlinie unterscheiden (kein Balken, keine Füllung).
- **800ms-Stille und A11y:** Button darf während der Stille nicht im Tab-/Screenreader-Fokus erreichbar sein (siehe AP-02c, 800ms-Stille-Kontrakt).
- **DOM/UI vs. Canvas bei ✅/❓:** Steuerfaden gibt DOM/UI als Startpunkt vor, AP-03 muss diese Wahl nicht revidieren, aber falls sich technische Blocker zeigen, im Ergebnisprotokoll transparent machen statt still auf Canvas zu wechseln.
- **Mobile-Zukunftsraum:** Drehbuch fordert „mindestens ein Drittel Chartbreite — vor Go-Live testen"; AP-03 liefert die Grundform, echte Mobile-QA bleibt nachgelagert.
- **Regression bestehender Charts:** Screen 2/3 nutzen `xDisplayRange` bereits produktiv; AP-03 darf deren Verhalten nicht verändern, nur einen neuen, unabhängigen Screen-4-Container hinzufügen (WeakMap-State ist bereits pro Container isoliert).
- **Scope-Drift zu Card-to-Point:** AP-03 darf nicht „nebenbei" mit der Koordinaten-API beginnen, auch wenn sie während der Arbeit verlockend naheliegt — das ist explizit ein eigener Folge-AP.
- **Scope-Drift zu APP_SPEC-Patch:** AP-03 darf die Spec nicht „nebenbei" nachziehen — das bleibt ein eigener, späterer Spec-AP nach Umsetzungsschnitt.

---

## Rücklaufkapsel AP-prokrast-02

Status:
GRÜN

Blocker:
nein

Kernbefund:
Das neue Drehbuch ist als amtliches Zielbild bestätigt und mit der bestehenden Architektur weitgehend verträglich. Screen 1 ist bereits erfüllt. Die größte Baulücke (Screen 4, Rubikon) ist zugleich die architektonisch am besten vorbereitete Fläche, weil `xDisplayRange`/`displayRange` und `FwVerticalLinePlugin` die Kernmechanik ohne Chart-Engine-Codeänderung tragen. Die riskanteste Fläche (Screen 2, Card-to-Point) hat dagegen keine bestehende Koordinaten-Schnittstelle und wird deshalb bewusst nicht zuerst gebaut.

Fest entschieden:
- Drehbuch wird vollständig umgesetzt, ersetzt die alte APP_SPEC §16 als Soll.
- Rubikon-X-Achse ist parametrisch (`referenceMonth`, `pastMonths`, `futureMonths`), aktuell 120/120.
- Future-Ticks sind Pflicht — Zeitmarken, keine Prognose.
- Keine Zukunftsdaten, keine Dummy-Datasets, keine transparente Zukunftslinie — unter keinen Umständen.
- Gegenwartslinie wird über das bestehende `FwVerticalLinePlugin` gelöst, kein neues Plugin.
- 800ms-Stille ist entschieden und bleibt auch bei Reduced Motion als Pausenbeat bestehen.
- Card-to-Point bleibt Pflichtbestandteil, aber nachgelagert mit eigenem Schnittstellen-AP.

Migrationsschnitt:
Screen 1 abgeschlossen. Screen 4 (Rubikon-Minimum) ist die nächste Baueinheit. Screen 2 (Card-to-Point) und Screen 3 (Timing-Reveal) folgen danach als eigene APs. APP_SPEC-Migration und redaktionelle Korrekturen folgen nach dem Umsetzungsschnitt, nicht davor.

Empfohlener nächster Haupt-AP:
AP-prokrast-03 — Rubikon-Minimum als vertikale Scheibe

Nicht nächster AP:
- Card-to-Point als erster Bau-AP
- Screen-3-Minifix
- APP_SPEC-Patch
- kompletter Drehbuch-Bau
- Rubikon-Prototyp ohne Migrationsschnitt
- Commit
- Abschlussritual

Wichtig für AP-03:
- `referenceMonth = ctx.latestMonth`, `pastMonths = 120`, `futureMonths = 120` — daraus `xDisplayRange` ableiten, nicht „heute = 50%" hart verdrahten.
- Bestehende Bausteine wiederverwenden (`xDisplayRange`, `FwVerticalLinePlugin`), keine neue Engine-Architektur erzwingen.
- ✅/❓ zuerst als DOM/UI prüfen, Canvas nur bei konkretem technischem Blocker.

Card-to-Point:
Pflichtbestandteil des Drehbuchs, aber nach AP-03 mit eigenem Schnittstellen-AP.

800ms-Stille:
fachlich entschieden; bleibt auch bei Reduced Motion als Pausenbeat.

Future-Ticks:
Pflicht; rechte Zeitachse ist Orientierung, keine Prognose.

Weiter nur nach Nutzer-OK.

---

## Nicht geändert

- keine APP_SPEC geändert
- kein app.js geändert
- kein app.css geändert
- keine Stationsdaten geändert
- kein Drehbuch geändert
- keine AP-02a/AP-02b/AP-02c-Dateien geändert
- keine Architekturdateien geändert
- keine Engine-Dateien geändert
- keine Plugin-Dateien geändert
- kein Commit
- kein Abschlussritual

## Scope- und Diff-QA nach Write

Nach dem Schreiben dieses Protokolls:

```
git status --short:
 M .claude/learning/session-log.md
?? Apps/prokrastinations-preis/AP-prokrast-01_befund-anamnese.md
?? Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md
?? docs/steering/patches/AP-prokrast-02a_quelleninventur-datei-wahrheit_Ergebnis.md
?? docs/steering/patches/AP-prokrast-02b_soll-ist-architektur-konfliktmatrix_Ergebnis.md
?? docs/steering/patches/AP-prokrast-02c_architektur-kontrakt_context-datenwahrheit_Ergebnis.md
?? docs/steering/patches/AP-prokrast-02d_migrationsschnitt_ap-schnitt_ruecklaufkapsel_Ergebnis.md

git diff --name-status:
M	.claude/learning/session-log.md
```

Bewertung: Nur die erlaubte Ergebnisdatei ist neu hinzugekommen. APP_SPEC.md, app.js, app.css, stations.de.json, Chart-Engine und Plugins sind unverändert. Keine unerwarteten Diffs.

## Ausdrücklich nicht nächster AP

- Card-to-Point als erster Bau-AP
- kompletter Drehbuch-Bau in einem AP
- APP_SPEC-Patch als nächster Schritt
- Rubikon-Prototyp ohne Ergebnisintegration
- Screen-3-Minifix
- CSS-Motion-Patch
- Chart-Engine-Patch
- Commit
- Abschlussritual
