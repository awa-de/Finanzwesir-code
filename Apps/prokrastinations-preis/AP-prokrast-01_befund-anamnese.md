Stand: 2026-07-01 | AP: AP-prokrast-01 | Geändert von: Claude

# AP-prokrast-01 — Befund/Anamnese Prokrastinationspreis-App

AP-Typ: Befund-/Anamnese-AP — kein Code geändert, keine Spec neu geschrieben, kein Commit.

---

## 1. Status und Metadaten

| Feld | Wert |
|---|---|
| Status | **GELB** |
| Blocker | nein |
| Analysierter Stand | app.js + app.css + stations.de.json v3.0 (Commit 648460f, 2026-06-25), APP_SPEC.md V2.9 |
| Vorgänger-Anamnese | `B1-UX-01_wirkungs-anamnese.md` (Stand 2026-06-24, vor der v3.0-Migration) |
| Nicht analysiert | REDAKTIONS_GATE.md, QA_TEST_CASES.md-Ausführung, produktive CSV, Screenreader-Volltest |
| Kein Code geändert | ✓ |

**GELB-Begründung:** Die App ist vollständig auffindbar und die Ist-Analyse ist eindeutig. Der Grund für GELB liegt nicht in fehlenden Informationen über den Code, sondern darin, dass das in diesem Auftrag beschriebene Soll-Drehbuch (Kartenschrumpf-Mechanik Screen 2, Rubikon-Mechanik Screen 4) an **keiner Stelle im Repository als freigegebene Spec vorliegt**. Es konkurriert mit dem in APP_SPEC.md §16 dokumentierten, bereits freigegebenen Drehbuch. Das ist eine Produktentscheidung, kein Codebefund.

---

## 2. Reale Dateien der App (Inventur)

| Datei | Rolle |
|---|---|
| `Apps/prokrastinations-preis/APP_SPEC.md` (V2.9) | Wahrheit für Struktur, Dramaturgie, Screen-Texte, State-Modell, §16 UX/UI-Primitiven |
| `Apps/prokrastinations-preis/config/stations.de.json` (v3.0) | Wahrheit für Stationeninhalt — 7/7 Stationen aktiv |
| `Apps/prokrastinations-preis/app.js` | Wahrheit für Ist-Verhalten, Screen-Rendering, Texte |
| `Apps/prokrastinations-preis/app.css` | Wahrheit für visuelles System |
| `Apps/prokrastinations-preis/app.test.html` | Testharness |
| `Apps/prokrastinations-preis/B1-UX-01_wirkungs-anamnese.md` | Vorgänger-Anamnese (2026-06-24) — teilweise überholt |
| `Apps/prokrastinations-preis/B1-STATIONS-v3.0_ergebnisprotokoll.md` | Beleg: Stationen-Migration v2.1→v3.0, behebt B1-UX-01-Befund 1 |
| `Apps/prokrastinations-preis/ENTSCHEIDUNGSPROTOKOLL.md`, `STATIONS_CONFIG_CONTRACT.md`, `SLICE_PLAN.md`, `QA_TEST_CASES.md`, `REDAKTIONS_GATE.md`, `SPEC_GATE_REPORT.md` | Nachgeordnete Prozess-/Vertragsdokumente, nicht vertieft gelesen (kein Gap-Hinweis aus Pflichtquellen) |
| `docs/steering/patches/B1-AP-15a…15e_*` | Motion-/Reduced-Motion-Audit-Reihe (2026-06-23) — deckt Draw-Animation/Pulse-Hardening ab, **nicht** die in diesem Auftrag beschriebene Card-Schrumpf- oder Rubikon-Mechanik |

**Nicht vertieft (technische Inventur nur):** `Archiv/local/muss noch eingeordnet werden/*prokrastinations-preis*` (9 Dateien, historische Konzept-/Peer-Review-Entwürfe) und `Archiv/Chroniken/legacy/Chronik_Faden_Prokrastinationspreis_AP01_AP08_Prozesslernen.md` — laut Auftrag verbotene Sollquelle (alte, ggf. widersprüchliche Entwürfe), nicht als Vergleichsmaßstab verwendet.

Git-Status: sauber bis auf die erwartete `session-log.md`-Änderung aus `/start`. Kein Blocker.

---

## 3. Kurzbefund

Zwei unabhängige Wahrheiten existieren nebeneinander:

1. **APP_SPEC.md §16** beschreibt ein bereits umgesetztes, freigegebenes Drehbuch: Screen 2 zeigt eine StationCard neben einem wachsenden Chart mit pulsierenden Marker-Ringen (kein Kartenschrumpf-Übergang). Screen 3 zeigt Chart + KPI-Cards ohne Timing-Choreographie. Screen 4 hat **keinen Chart**, nur Transfer-Text und CTA.

2. **Der Auftragstext** beschreibt ein deutlich weitergehendes Drehbuch: Screen 2 mit „Groß → schrumpft → Punkt"-Kartenanimation, Screen 3 mit verzögerter KPI-Enthüllung, Screen 4 als „Rubikon" mit einer X-Achsen-Verlängerung in leeren Zukunftsraum, persistenter blauer Grenzlinie, ✅/❓-Symbolen und 800ms-Stille vor dem Button.

Diese zweite Beschreibung wurde vollständig durchsucht (APP_SPEC.md, B1-UX-01, die gesamte B1-AP-15-Motion-Reihe, ENTSCHEIDUNGSPROTOKOLL.md) und ist an **keiner Stelle im Repository als Soll dokumentiert oder freigegeben**. Sie ist damit keine „fehlende Umsetzung eines bestehenden Solls", sondern ein neuer, extern übergebener Konzeptvorschlag, der der bestehenden, mit Albert abgestimmten Spec (Stand 2026-06-18/25) an mehreren Stellen widerspricht bzw. sie ersetzen würde.

Daneben bestehen unverändert drei der fünf B1-UX-01-Befunde vom 2026-06-24 fort (siehe §5), sowie ein neuer, in dieser Anamnese hinzugekommener Befund zum Screen-3-Timing.

---

## 4. Soll/Ist-Abgleich je Screen

### Screen 1 — Die Frage

**Auftrags-Soll:** Nur Frage, Slider, Button. Kein Chart, keine Zahlen, kein Endwissen.

**Ist:** Strukturell erfüllt — `screen1` enthält ausschließlich Headline, Subline, Slider-Sektion, Button. Kein Chart, keine Zahl (app.js Z.284–331). ✓

**Abweichung (unverändert seit B1-UX-01 Befund 3):** Headline lautet ist `„Vor 10 Jahren wäre besser gewesen. Was ist mit heute?"` statt der in APP_SPEC §16.2 freigegebenen `„Vor 10 Jahren war der beste Zeitpunkt. Aber wie hätte sich das damals angefühlt?"`. Subline ist eine Datenqualitätsaussage statt des Reiseversprechens. **Textabweichung, kein Strukturproblem.**

---

### Screen 2 — Die Zeitreise

**Auftrags-Soll:** Eventkarten werden nacheinander groß gezeigt. Beim Weiterklicken schrumpft die aktuelle Karte zum zugehörigen Chartpunkt, der Punkt pulst, die nächste Karte erscheint groß. Muster: Groß → schrumpft → Punkt.

**Ist:**
- `renderStationCard()` (app.js Z.201, aufgerufen aus Z.456) ersetzt den Inhalt von `stationArea` direkt beim Stationswechsel — **kein Schrumpf-Übergang, keine Bewegung der Karte zum Chartpunkt.**
- Chart-Marker-Pulse existiert bereits (`FwAnnotationPulsePlugin.js`, B1-AP-14c4, ✅ 2026-06-18), aber unabhängig von einer Kartenanimation: der zuletzt sedimentierte Marker pulst automatisch für 1200 ms, unabhängig davon, ob/wie die Karte verschwindet.
- Draw-Animation zwischen Stationen ist in APP_SPEC §16.3 explizit `⏳ bewusst offen` — es existiert nur der Chart.js-Default (~1000 ms), kein choreographierter Übergang.

**Bewertung:** Das beschriebene „Groß → schrumpft → Punkt"-Muster existiert weder im Code noch als dokumentiertes Soll. Es wäre eine **neue** Animationsmechanik, keine Lückenschließung eines bereits spezifizierten Features.

**Zusatzbefund (unverändert seit B1-UX-01 Befund 2):** Die Screen-2-Headline `„Im Rückblick sieht es klar aus. In Echtzeit war es eine Entscheidung."` (app.js Z.342) nimmt weiterhin das Fazit der Zeitreise vorweg, bevor der Nutzer die erste Station sieht.

---

### Screen 3 — Der Rückspiegel

**Auftrags-Soll:** Erst der Satz, dann der vollständige Chart, dann verzögert die KPI-Karten. Reihenfolge ist Teil der Wirkung.

**Ist:** DOM-Reihenfolge stimmt strukturell überein — Headline (Z.371) → Subline (Z.376) → Chart-Section (Z.382) → KPI-Slot (Z.386) → AssumptionsBox (Z.391). ✓

**Abweichung:** „Verzögert" ist nicht umgesetzt. `renderS3()` (app.js Z.480–491) rendert Chart und KPI-Cards **synchron** beim Screen-Wechsel — kein `setTimeout`, keine Staffelung, kein Fade-in zwischen Chart-Erscheinen und KPI-Erscheinen. Eine Volltextsuche nach `setTimeout`/`delay` im gesamten Screen-3-Rendering-Pfad ergab keinen Treffer. Das entspricht dem in B1-UX-01 Befund 4 beschriebenen „visuellen Vakuum" — keine dramaturgische Timing-Differenzierung zwischen den Screens.

---

### Screen 4 — Der Rubikon

**Auftrags-Soll:** X-Achse verlängert sich nach rechts, blaue vertikale Linie bleibt als Grenze stehen, rechts öffnet sich leerer Zukunftsraum, keine Prognosekurve. Danach ✅ links, ❓ rechts, ein Satz, 800ms Stille, dann der Button.

**Ist:** Screen 4 (app.js Z.401–428) enthält **ausschließlich**: Headline, Bodytext, CTA-Link (`href=''`), Zurück-Button. **Kein Chart-Element, kein `data-fw-appchart`, keine X-Achsen-Logik, keine Symbole, keine Timing-Steuerung.** APP_SPEC §16.1 fordert für Screen 4 explizit „keine Prognosekurve" — das ist erfüllt, aber nur weil dort überhaupt kein Chart existiert, nicht weil eine Chart-mit-leerem-Zukunftsraum-Mechanik bewusst reduziert wurde.

**Bewertung:** Dies ist die größte Lücke zwischen Auftrags-Soll und Ist-Zustand. Die beschriebene Mechanik (X-Achse über den Datenbereich hinaus verlängern, Grenzlinie halten, Symbol-Choreographie, 800ms-Pause) ist ein vollständig neues UI-Feature, nicht ansatzweise im Code oder in der Spec vorhanden. Architektonisch wäre das eine Erweiterung des bereits in AP-14b eingeführten `xDisplayRange`-Konzepts (Progressive Domain LineChart), diesmal für die Zukunft statt für vergangene Stationen — technisch plausibel anschlussfähig, aber bisher nicht spezifiziert.

**Unverändert (B1-UX-01 Befund 5):** CTA hat weiterhin `href=''` (app.js Z.420) — dokumentierter Nicht-Blocker NB-1, abhängig von Produktentscheidung E-04 (Ziel-URL).

---

## 5. Klassifikation offener Punkte

| # | Punkt | Kategorie | Quelle |
|---|---|---|---|
| 1 | Stationen-Datenlücke (4/7 gefiltert) | **behoben** | B1-STATIONS-v3.0, 2026-06-25 |
| 2 | Screen-2-Headline verrät Fazit vor der Reise | Text-/Copy-Schwäche | B1-UX-01 Befund 2, unverändert |
| 3 | Screen-1-Headline/Subline weicht von APP_SPEC §16.2 ab | Text-/Copy-Schwäche | B1-UX-01 Befund 3, unverändert |
| 4 | Kein dramaturgisch differenziertes visuelles Design (alle Screens optisch identisch) | visuelle Führungsschwäche / CSS-Frage | B1-UX-01 Befund 4, unverändert |
| 5 | CTA `href=''` auf Screen 4 | Produktentscheidung (E-04) | B1-UX-01 Befund 5, unverändert, dokumentierter NB-1 |
| 6 | Screen-2-Kartenschrumpf-zu-Chartpunkt-Animation | **fehlt vollständig — nicht spezifiziert** | neu, dieser AP |
| 7 | Screen-3-verzögerte KPI-Enthüllung (Timing-Choreographie) | UX-Feature-Lücke, kein Code-Fehler | neu, dieser AP |
| 8 | Screen-4-Rubikon-Mechanik (X-Achsen-Erweiterung, Grenzlinie, Symbole, 800ms-Pause) | **fehlt vollständig — nicht spezifiziert, größte Lücke** | neu, dieser AP |
| 9 | Reduced-Motion-Pfad für `chart.update()` bei Stationswechsel | A11y-Lücke | B1-AP-15a, offen, unabhängig von diesem Auftrag |
| 10 | `motionRules`-Felder in stations.de.json konfiguriert, nicht ausgelesen | toter Code / Backlog | B1-AP-15a, unverändert |

**Wichtigste Einordnung:** Punkte 6 und 8 sind keine „Bugs" oder „vergessene Umsetzungen" — sie sind ein **Widerspruch zwischen einer bereits mit Albert abgestimmten, im Code umgesetzten Spec (APP_SPEC §16, Stand 2026-06-18) und einem neuen, extern übergebenen Konzept**. Bevor hier gebaut wird, muss geklärt sein, ob das neue Drehbuch das alte ersetzt.

---

## 6. Ausdrücklich nicht geprüft oder gelöst in diesem AP

- kein Code geändert
- keine CSS-Regeln geändert
- keine APP_SPEC geändert
- keine Stationen bearbeitet
- kein Redaktions-Gate geprüft
- keine Browser-QA durchgeführt (nur statischer Code gelesen)
- kein Screenreader-Test durchgeführt
- kein Commit
- kein Abschlussritual

---

## 7. Empfehlung für den nächsten AP

**Kein direkter Bau-AP.** Die Datenlage ist eindeutig, aber der Weg dorthin ist eine Produktentscheidung, kein Umsetzungsdetail:

### Empfohlen: AP-prokrast-02 als Klärungs-/Spec-Abgleich-AP (GELB-Pfad)

**Frage an Albert:** Ersetzt das in diesem Auftrag beschriebene Drehbuch (Kartenschrumpf Screen 2, Rubikon-Mechanik Screen 4) das in APP_SPEC.md §16 bereits freigegebene und implementierte Drehbuch — oder soll es als zusätzliche Ausbaustufe oben draufgesetzt werden?

Erst nach dieser Klärung kann sinnvoll geschnitten werden zwischen:
- **B1-UX-02** — Copy-Revision Screen 1+2 (Punkte 2+3, unabhängig von der Rubikon-Frage, sofort machbar, Light-Gate)
- **Neuer Spec-AP** — APP_SPEC §16 um die Kartenschrumpf- und Rubikon-Mechanik erweitern oder ersetzen (Voraussetzung für Punkte 6+8, Full-Gate, Vorgänger: Alberts Entscheidung aus AP-prokrast-02)
- **B1-UX-05** — CTA + Funnel-Anschluss (Punkt 5, wartet weiterhin auf E-04)

**Nicht empfohlen als nächster Schritt:** direkt mit der Implementierung der Kartenschrumpf- oder Rubikon-Mechanik zu beginnen, da keine freigegebene Spec dafür existiert und sie der bestehenden, bereits gebauten Spec widerspricht.

---

*AP-prokrast-01 abgeschlossen — Anamnese vollständig. Keine Codeänderungen. Keine Commit-Message.*
