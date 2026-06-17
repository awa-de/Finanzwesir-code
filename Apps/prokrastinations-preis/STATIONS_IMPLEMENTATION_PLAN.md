Stand: 2026-06-17 | V1.0 — AP-10 | Geändert von: Claude

# Stations-Implementierungsplan — prokrastinations-preis

Arbeitsgrundlage für die Coding-Slices B1-AP-11 bis B1-AP-18.

---

## AP-09-Vorprüfung

Ergebnis vor Beginn der Planung.

| Prüfpunkt | Ergebnis |
|---|---|
| `config/stations.de.json` existiert | ✅ |
| JSON syntaktisch valide | ✅ |
| Contract-konform (STATIONS_CONFIG_CONTRACT.md) | ✅ |
| Keine berechneten Depot-/Renditewerte in JSON | ✅ |
| `visualRules.redCrashColor: false` | ✅ |
| `visualRules.lossColoring: false` | ✅ |
| `visualRules.crashSegmentColoring: false` | ✅ |
| Alle Stationen `flags.noRedColor: true` | ✅ |
| Genau eine `crisis`-Station (`station_2020_03_covid_crash`, priority 100) | ✅ |
| `dynamic_latest_month` nur bei `station_final_latest_month` | ✅ |
| Quellenstatus ehrlich gesetzt, keine geschönten Werte | ✅ |
| Keine Code-Dateien durch AP-09 geändert | ✅ |
| Redaktions-Gate bestanden | ❌ G-A02 — 3 Stationen `source_claimed_unchecked` (2018-02, 2018-12, 2020-11) blockieren Produktivfreigabe |

**Konsequenz für AP-10:** kein harter Blocker. Die redaktionellen Quellenrisiken sind in §11 (Offene Risiken) dokumentiert. AP-10 wird planmäßig durchgeführt.

**Kleinere Diskrepanz (kein Blocker, aber zu klären):**
`APP_SPEC.md §23.14` nennt `flags.finalWobble: true` für die April-2025-Station. Die in AP-09 angelegte JSON folgt dem AP-09-Briefing (Albert) mit `finalWobble: false, lateWobble: true` für diese Station. Der Loader sollte bei der Zustandsbestimmung primär `role: "late_wobble"` prüfen, nicht `flags.finalWobble`, um diese Inkonsistenz zu neutralisieren. Vor AP-15 klären, welches Flag der Loader für die Animations- und Display-Logik nutzt.

---

## 1. Zweck und Nicht-Zweck

**Was AP-10 vorbereitet:**
Dieser Plan legt die technische Grundlage für die Coding-Slices AP-11 bis AP-18, die den Stations-Loader, den Fensterfilter, die Stationenreise (Screen 2), den Reveal (Screen 3), den Transfer (Screen 4) und die Absicherungsschicht (Motion, A11y, Error-States) implementieren.

**Was AP-10 ausdrücklich nicht tut:**
- Keinen Produktivcode anlegen oder ändern
- Keine UI umbauen
- Keine Loader-Logik schreiben
- Keine Tests schreiben
- Keine CSS-/JS-/HTML-Dateien ändern
- `stations.de.json` nicht inhaltlich nachbearbeiten
- AP-11 bis AP-18 nicht ausführen

**Warum ein eigener Planungsschritt:**
Die Stationenreise berührt mehrere Schichten gleichzeitig: Datenladen, Validierung, Fensterfilter, Screen-Flow, Chart-Integration, A11y, Motion und Error-States. Ohne klaren Plan entstehen Scope-Creep-Risiken bei jedem Coding-Slice. Dieser Plan legt die Grenzen und Akzeptanzkriterien für jeden Slice fest, bevor Code geschrieben wird.

---

## 2. Führende Verträge und Artefakte

| Datei | Rolle |
|---|---|
| `APP_SPEC.md` V2.5 | Führende Spec. UX, State-Modell, AppContext, A11y, Security, Screen-Flow. Schlägt alle anderen Dokumente. |
| `STATIONS_CONFIG_CONTRACT.md` | JSON-Vertrag. Felder, Enums, Flags, Quellenstatus, Validierungsregeln, Fensterfilter-Logik, Error- und Empty-Konzept. |
| `REDAKTIONS_GATE.md` | Publikationsreife. Gate-Typen A/B/C, Release-Checkliste. |
| `QA_TEST_CASES.md` | Testfälle für Coding-Slices. Testgruppen A–L. TC-A01 bis TC-L und T-01 bis T-40 aus APP_SPEC.md §19. |
| `ENTSCHEIDUNGSPROTOKOLL.md` | Dramaturgische Grundentscheidungen. Verworfene Alternativen. Nicht überschreiben ohne AP. |
| `config/stations.de.json` | Das produktive Artefakt von AP-09. Alle Coding-Slices lesen diese Datei, schreiben sie nicht. |

**Nicht führend:**
`MINI_SPEC_FROM_HAUPTDOKUMENT.md`, `SLICE_PLAN.md`, `SPEC_GATE_REPORT.md`, ältere Reviews, `SLICE_0_KICKOFF.md`. Bei Widerspruch: APP_SPEC.md + STATIONS_CONFIG_CONTRACT.md + REDAKTIONS_GATE.md schlagen historische Dokumente.

---

## 3. Zielarchitektur CSV + Stations-JSON

### Zwei-Datenschichten-Trennung (absolut)

```
CSV   → Marktdaten, Sparplanberechnung, Chartwerte, Rolling Window
JSON  → Redaktionelle Stationenbibliothek, Dramaturgie, Texte
```

**Was die CSV liefert:**
- `date` (YYYY-MM-DD, Monatsultimo), `index_value` (Komma-Dezimal mit EUR-Suffix)
- `latestMonth` = letzter valider CSV-Monat
- `startMonth` = `latestMonth − 119 Monate`
- `chartSeries`: berechneter Depotwert für alle 120 Monate (aus Anteilslogik)
- `stationIntermediate` pro Station: `paidIn`, `portfolioValueAtStation` — aus Sparplanberechnung, nicht aus JSON

**Was die JSON liefert:**
- Redaktionelle Stationen mit Texten, Rollen, Prioritäten, Flags, Quellenstatus
- `selectionPolicy`, `visualRules`, `motionRules` als Konfiguration
- Keine Depotwerte, keine Berechnungsergebnisse, keine Renditen

**Was die JSON nicht liefert und nie liefern darf:**
`paidIn`, `portfolioValue`, `return`, `performance`, `gain`, `drawdown`, `finalValue` als Zahlenwerte. Diese Namen dürfen nur als Feldnamen in `mobileIntermediate.fields` vorkommen — dort als reine Referenz ohne Wert.

### Ladeprozess (für AP-11)

```
1. CSV laden (fetch via data-fw-data, Domain-Validierung)
2. Stations-JSON laden (fetch intern: config/stations.de.json)
3. Beide parallel — keiner blockiert den anderen im Fetching
4. CSV validieren (Format, Mindestlänge, Währung)
5. JSON validieren (Contract, Pflichtfelder, Enums)
6. latestMonth aus CSV bestimmen
7. startMonth = latestMonth − 119 Monate
8. Stationen filtern: startMonth <= station.date <= latestMonth
9. Stationen sortieren: date_asc
10. Auswahl: highest_priority_within_window (max. 7 inkl. final reveal)
11. Final Reveal aus dynamic_latest_month erzeugen
12. AppContext aufbauen
```

### Rolling-Window-Logik (für AP-13)

```
latestMonth  = letzter Wert aus csv.msciData[csv.msciData.length - 1].date (YYYY-MM)
startMonth   = DateUtils: latestMonth − 119 Monate
periodMonths = 120
```

Stationen außerhalb `[startMonth, latestMonth]` werden übersprungen — kein Fehler, kein Hinweis für Nutzer.

### Final-Reveal-Mapping (für AP-14)

Der finale Reveal ist keine redaktionelle Station; er wird aus der CSV erzeugt:

```js
// Aus stations.de.json wird die Final-Reveal-Vorlage gelesen (date: "dynamic_latest_month")
// Der tatsächliche date-Wert wird durch latestMonth aus der CSV ersetzt
const finalRevealStation = {
  ...stationsJson.stations.find(s => s.date === 'dynamic_latest_month'),
  date: appContext.latestMonth  // dynamisch, kein hartkodiertes Datum
};
```

Fehlschlag: Wenn kein `dynamic_latest_month`-Eintrag in der JSON → Error(d).

### AppContext-Schema (Zusammenfassung — vollständig in APP_SPEC.md §13)

```js
// Statischer Kern (einmalig nach Datenladen)
{
  valueMode: 'currency',
  currency: 'EUR',
  locale: 'de-DE',
  periodMonths: 120,
  msciData: [...],         // read-only, ≥ 120 Einträge
  latestMonth: 'YYYY-MM',
  startMonth: 'YYYY-MM',
  activeWindow: { startMonth, latestMonth, periodMonths: 120 },
  stations: [...]          // gefilterte, sortierte Stationen + finalReveal
}

// Dynamische Schale (nach jeder Slider-Interaktion)
{
  monatlicheRate, startBetrag,
  chartSeries: [{ month, depotwert }, ...],
  eingezahlt, depotwertHeute, differenz,
  resultTone: 'neutral',
  stationLiveMessage: '',       // kein Endwissen auf Screen 2
  revealA11ySummary: '...'      // nur Screen 3
}

// Stations-Zustand (während Screen 2)
{
  activeStationIndex: 0,
  activeStation: { ... },
  visibleChartSeries: [...],    // Teilmenge bis zur aktuellen Station
  isJourneyComplete: false,
  stationIntermediate: {
    paidIn: <berechnet>,
    portfolioValueAtStation: <berechnet>
  }
}
```

---

## 4. Stations-JSON-Validierung

### Top-Level-Felder (Pflicht)

| Feld | Prüfung |
|---|---|
| `version` | String, vorhanden, Wert `"2.1"` |
| `locale` | String `"de-DE"` |
| `app` | String `"prokrastinations-preis"` — Abweichung → Config-Error |
| `selectionPolicy` | Object, vorhanden, enthält alle Pflichtfelder |
| `visualRules` | Object, vorhanden, No-Red-Felder korrekt |
| `motionRules` | Object, vorhanden, mode `"user_stepped"` |
| `stations` | Array, vorhanden, Länge ≥ 1 |

### Pflichtfelder pro Station

Jede Station muss enthalten (fehlende Felder → Config-Error):
`id`, `date`, `priority`, `status`, `role`, `headline`, `sourceLabel`, `sourceUrl`, `sourceStatus`, `anchorText`, `continueLabel`, `mobileIntermediate`, `flags`

`mobileIntermediate` muss `label` (String) und `fields` (Array) enthalten.
`flags` muss mindestens `noRedColor` (Boolean `true`) enthalten.

### Datums-Regeln

- Normale Stationen: `date` muss `YYYY-MM`-Format haben
- Final Reveal: `date` muss `"dynamic_latest_month"` sein
- `dynamic_latest_month` darf nur genau einmal vorkommen, nur bei `role: "final_reveal"`
- Keine synthetischen Daten erzeugen (kein Datum aus `new Date().toISOString()`)
- Stationen außerhalb des CSV-Fensters werden gefiltert, nicht als Fehler gemeldet

### Enum-Validierung

**`status`:** `core`, `supporting`, `optional`, `archival`, `final`
**`role`:** `shock`, `doubt`, `crisis`, `relief`, `geopolitical_shock`, `late_wobble`, `final_reveal`
**`sourceStatus`:** `primary_verified`, `secondary_verified`, `source_claimed_unchecked`, `derived_from_app_data`

Unbekannte Enum-Werte → Config-Error.

### No-Red-Coding-Regeln (alle Bedingungen müssen gleichzeitig erfüllt sein)

```
visualRules.redCrashColor        !== true
visualRules.lossColoring         !== true
visualRules.crashSegmentColoring !== true
jede Station: flags.noRedColor   === true
```

Wenn eine dieser Bedingungen verletzt ist: Config ungültig → Error(d).
Kein stiller Override, kein Fallback auf sichere Defaults. Die App zeigt Config-Error.

### Berechnungswert-Verbot in JSON

Der Validator prüft, dass folgende Felder KEINE Zahlenwerte (Number-Typ) auf Stationsebene enthalten:
`paidIn`, `portfolioValue`, `return`, `performance`, `gain`, `drawdown`, `finalValue`

Falls einer dieser Schlüssel mit einem Zahlenwert direkt in einem Stationsobjekt vorkommt → Config-Error.
Ausnahme: in `mobileIntermediate.fields` als String-Referenz erlaubt (z.B. `"paidIn"`).

### Quellenstatus-Regeln (für technische Gate-Prüfung)

```
primary_verified      → produktiv erlaubt
secondary_verified    → produktiv erlaubt
derived_from_app_data → produktiv erlaubt
source_claimed_unchecked → im Produktivmodus nicht sichtbar; Station wird von Fensterfilter ausgeblendet
                         → kein Config-Error, aber Redaktions-Gate G-A02 schlägt an
```

`source_claimed_unchecked`-Stationen dürfen in der JSON vorkommen (für Entwicklung). Sie werden im Produktivmodus nicht angezeigt. Der Redaktions-Gate-Status wird als `EditorialDegraded` gemeldet.

---

## 5. Redaktions-Gate als technische Prüfung

Die Prüfung läuft nach Laden und Validieren der Stationen, vor dem ersten Screen-Render.

### Gate A — Release-blockierend (technisch prüfbar)

| Gate | Prüfung |
|---|---|
| G-A01 | Im aktiven Fenster ≥ 1 Station mit `role: "crisis"` und `priority >= 95` |
| G-A02 | Keine sichtbare Station hat `sourceStatus: "source_claimed_unchecked"` (wird aus Anzeige gefiltert, aber Gate meldet Status) |
| G-A03 | Quellenstatus ist konsistent (wird manuell geprüft, technisch nicht automatisch verifizierbar) |
| G-A04 | Sichtbare Stationen: `startMonth <= station.date <= latestMonth` |
| G-A05 | Final Reveal kommt aus `dynamic_latest_month`, nicht aus hartcodiertem Datum |
| G-A06 | Screen 2 zeigt keinen vollständigen Chart (Architektur-Invariante, technisch durch `visibleChartSeries` sichergestellt) |
| G-A06b | A11y-Kanäle (Live Region, aria-label, figcaption, visually-hidden) verraten kein Endwissen vor Screen 3 |
| G-A07 | Finale KPI-Cards erscheinen erst nach Abschluss der Zeitreise auf Screen 3 |
| G-A08 | `visualRules.redCrashColor`, `lossColoring`, `crashSegmentColoring` alle `false` |
| G-A09 | Screen 4 enthält keine Prognose, keine fortgeschriebene Linie, keine Renditeannahme |

### Gate-Ergebnis-Typen

**`GateOK`:** Alle Gate-A-Bedingungen erfüllt, keine `source_claimed_unchecked`-Stationen sichtbar → App ist publikationsreif.

**`EditorialDegraded`:** JSON technisch valide, App kann lokal laufen, aber:
- `source_claimed_unchecked`-Stationen wurden aus aktivem Fenster gefiltert
- Oder: nach Filterung zu wenige Stationen (< `minVisibleStations`)
- Oder: keine `crisis`-Station im Fenster

Im Produktivmodus: nutzerfreundlicher Error-State anzeigen.
Im Dev-Modus: technische Gate-Diagnose anzeigen (welche Stationen fehlen / warum).

**`GateBlocked`:** Harte Verletzung (No-Red-Coding, falsche `app`-ID, invalide Enums) → Config-Error.

### Stationsanzahl-Prüfung (nach Filterung und Selektion)

```
minVisibleStations:    5
targetVisibleStations: 6
maxVisibleStations:    7
```

Wenn nach Filterung und Selektion < 5 Stationen übrig bleiben → `EditorialDegraded`.
Final Reveal zählt separat, nicht in diesen Zahlen.

### Schönmeldeverbote für Gate-Implementierung

- `source_claimed_unchecked` darf technisch nicht zu `primary_verified` hochgesetzt werden
- Wenn G-A01 nicht erfüllt: kein synthetischer Krisen-Placeholder erzeugen
- Wenn final Reveal fehlt: kein Fallback-Datum verwenden
- Gate-Status muss ehrlich im Dev-Modus ausgegeben werden

---

## 6. Screen-Integration ohne Endwissens-Leak

### Screen 1 — Teleportation / Eingabe

**Funktion:** Nutzer gibt Sparrate ein und löst Zeitreise aus.
**Was noch nicht sichtbar ist:** kein Chart, keine Stationstexte, keine Depotwerte.
**Kritische Regel:** Slider-Interaktion darf `revealA11ySummary` nicht in die Live-Region schreiben.
**Implementierungsverantwortung:** AP-15 (Screen 1→2 Übergang).

### Screen 2 — Stationen-Zeitreise (kein Endwissens-Leak)

**Chart:** `visibleChartSeries` — Teilmenge bis zur aktuellen Station. `chartSeries` (vollständig) bleibt intern bis Screen 3. Der Chart darf auf Screen 2 niemals vollständig gerendert werden.

**Stationswechsel (user-stepped):** Nutzer drückt `Weiter investiert bleiben`-Button. App:
1. Erhöht `activeStationIndex`
2. Erweitert `visibleChartSeries` bis zur neuen Station
3. Rendert StationCard der neuen Station
4. Setzt `stationLiveMessage` (kein Depotwert, kein Endwissen)
5. Aktualisiert `stationIntermediate` (berechnet aus Sparplanberechnung)
6. Fährt Draw-Animation (respektiert `prefers-reduced-motion`)
7. Setzt Fokus auf neue Stations-Überschrift

**A11y-Endwissens-Verbot auf Screen 2:**
- `aria-live`-Region: nur `stationLiveMessage` (Stationsname + Kurztext, kein Depotwert)
- `aria-label` auf Chart: „Entwicklung des Sparplans bis [Stationsdatum]. Die spätere Entwicklung ist noch nicht eingeblendet."
- `figcaption`, `visually-hidden`: kein finaler Depotwert, kein `eingezahlt`, kein `differenz`
- Collapsible (`Zwischenstand anzeigen`): zeigt berechneten Zwischenstand (`paidIn`, `portfolioValueAtStation`) — kein Endwert

**Finaler Station-Button:** Nach letzter Station in `stations[]` wechselt der Button zu `Ergebnis ansehen` → Trigger für Screen 3. `isJourneyComplete = true` wird gesetzt.

### Screen 3 — Erster vollständiger Reveal

**Trigger:** `isJourneyComplete === true`. Screen 3 wird erstmals gezeigt.

**Was erst jetzt sichtbar wird:**
- Vollständiger Chart (`chartSeries`, alle 120 Monate)
- `VertikaleLinie` am letzten Datenpunkt
- KPI-Cards: `eingezahlt`, `depotwertHeute`, `differenz`
- `AssumptionsBox`: Pflichthinweis (keine Garantie, keine Beratung)

**A11y-Reveal:** `revealA11ySummary` wird erst beim Übergang zu Screen 3 in die Live-Region geschrieben.

```
Vollständiger Rückblick: Wer vor 10 Jahren [Rate] € monatlich investiert hätte,
hätte im letzten verfügbaren Datenmonat [depotwertHeute] Depotwert —
bei [eingezahlt] eingezahlt.
```

**Chart-A11y (Screen 3):** `aria-label` oder `figcaption`:
„Chart: Vollständige Entwicklung des Sparplans über 120 Monate bis zum letzten verfügbaren Datenmonat."

### Screen 4 — Transfer auf heute ohne Prognose

**Inhalt:** Headline + Microcopy + PrimaryCta. Keine neue Zahl. Kein Zukunftschart. Keine fortgeschriebene Linie. Keine Renditeannahme.
**Erlaubte Aussage:** „Heute beginnt wieder ein Chart, dessen Ende niemand kennt."
**Verbotene Aussage:** Jede Zukunftssimulation, jede Rendite-Prognose, jeder Countdown.
**CTA:** Redaktionell noch offen (E-04 in APP_SPEC.md §21). AP-17 setzt den Platzhalter; endgültige Formulierung durch Albert.

---

## 7. Error(d)- und Empty-Journey-State

### Übersicht aller Zustände

| State | Bedingung | Nutzersicht (Produktiv) | Dev-Sicht |
|---|---|---|---|
| `Loading` | Daten werden geladen | Skeleton / Spinner | — |
| `Content` | CSV + JSON valide, Gate OK | Screen-Flow 1–4 | — |
| `Error(a)` | Ungültiger `data-fw-app`-Slug | „Diese App konnte nicht geladen werden." | Slug-Wert |
| `Error(b)` | CSV-URL ungültig / nicht erreichbar / nicht parsebar | „Daten konnten nicht geladen werden." | URL + HTTP-Status |
| `Error(c)` | CSV parsebar, aber Währung ≠ EUR | „Datenreihe hat keine oder ungültige Währungsangabe. Erwartet: EUR." | unitKey-Wert |
| `Empty` | CSV valide, aber < 120 Zeilen | „Nicht genug Daten für die Berechnung." | Zeilenanzahl |
| `Error(d)` | JSON nicht ladbar / nicht parsebar / Contract verletzt / No-Red-Rule verletzt | „Die Zeitreise kann gerade nicht geladen werden." | Fehlerdetail: welches Feld, welche Regel |
| `Empty-Journey` | JSON valide, aber keine aktive Station im Fenster nach Gate | „Die Zeitreise ist aktuell nicht vollständig konfiguriert." | Gate-Status, fehlende Stationen |
| `EditorialDegraded` | JSON valide, Gate B/C nicht erfüllt (aber A erfüllt) | Normale App (Gate B/C nicht release-blockierend) | Gate-Hinweis |

### Hard Error (Error(d)) — Technische Ursachen

Auslöser für `Error(d)`:
- JSON-Datei nicht erreichbar (fetch 404 oder Netzwerkfehler)
- JSON syntaktisch invalide (JSON.parse wirft)
- Pflichtfeld fehlt auf Top-Level oder Stationsebene
- `app`-Wert ≠ `"prokrastinations-preis"`
- Unbekannter Enum-Wert (role, status, sourceStatus)
- `visualRules.redCrashColor === true` (oder andere No-Red-Violation)
- Eine Station hat `flags.noRedColor !== true`
- `dynamic_latest_month` fehlt oder kommt mehrfach vor
- `dynamic_latest_month` bei einer Station ohne `role: "final_reveal"`

### Editorial Degraded / Empty-Journey-State

Auslöser:
- Alle verbleibenden Stationen (nach Filterung auf `primary_verified`/`secondary_verified`) liegen außerhalb des aktiven Fensters
- Nach Fensterfilter und Gate-Prüfung: < `minVisibleStations` (5) sichtbare Stationen
- Im Fenster keine Station mit `role: "crisis"` und `priority >= 95`
- Final Reveal fehlt oder ist nicht auflösbar

**Produktivmodus:** nutzerfreundliche Meldung ohne technische Details.
**Dev-Modus:** konkreter Gate-Hinweis:
```
EditorialDegraded: station_2020_03_covid_crash außerhalb des aktiven Fensters.
G-A01 nicht erfüllt. Keine crisis-Station im aktiven Fenster.
```

**Verbote in beiden States:**
- Keine synthetischen Ersatzstationen erzeugen
- Kein stiller Fallback auf andere Stationen
- Keine Zeitreise mit unvollständigem Bogen starten
- Keine Halbfertig-Journey zeigen

### Empty-Journey-State Sonderfall: `source_claimed_unchecked`

Wenn nach Filterung aller `source_claimed_unchecked`-Stationen zu wenige übrig bleiben:
- Produktivmodus: `Empty-Journey`-Meldung
- Dev-Modus: Liste der gefilterten Stationen mit Quellenstatus
- Kein Hochsetzen des Quellenstatus zur Laufzeit

---

## 8. AP-11 bis AP-18 als spätere Coding-Slices

**Zieldatei für alle Slices:** `Apps/prokrastinations-preis/app.js`
**UI:** `Apps/prokrastinations-preis/app.test.html` (lokaler Teststand)
**CSS:** `Apps/prokrastinations-preis/app.css` (nur wo in Slice explizit erlaubt)

**Tabu für alle Slices:**
- `CSVParser.js` — FORBIDDEN
- `FinanzwesirData.js` — FORBIDDEN
- `FwDateUtils.js` — PROTECTED (nur mit expliziter Begründung und Albert-Freigabe)
- `ChartEngine.js` — PROTECTED
- `config/stations.de.json` — nicht inhaltlich ändern; nur lesen

---

### B1-AP-11 — Stations-JSON parallel zur CSV laden

**Ziel:** `loadStations()` implementieren. JSON wird parallel zu `loadData()` (CSV) gefetcht, sodass beide Quellen bereit sind, bevor der Content-State aufgebaut wird.

**Erlaubte Dateien:** `app.js`

**Ausdrücklich nicht enthalten:**
- Validierung der JSON (das ist AP-12)
- Fensterfilter (das ist AP-13)
- UI-Änderungen

**Akzeptanzkriterien:**
- `fetch('config/stations.de.json')` wird parallel zum CSV-Fetch aufgerufen
- Beide Fetches laufen parallel (z.B. `Promise.all`)
- Fehler beim JSON-Fetch → `Error(d)` (nicht lokal korrigieren, nicht ignorieren)
- Kein Parsing oder Validierung des JSON-Inhalts in AP-11 (nur Fetch + Text)
- Testfall TC-A01 (Gruppe A aus QA_TEST_CASES.md) erfüllbar

**Risiken:**
- Relativer Pfad `config/stations.de.json` muss für lokalen Live-Server und Produktiv-URL gleich funktionieren
- CORS auf Produktivserver (Ghost.io): ist zu prüfen, da JSON vom selben Host kommt wie die HTML-Seite

**Abbruchkriterien:**
- Fetch-Pfad funktioniert weder lokal noch ist ein sicherer Produktivpfad bekannt → stoppen, Albert fragen
- Paralleles Laden erzeugt Race-Conditions mit bestehender CSV-Logik → stoppen, AP-Scope neu abgrenzen

---

### B1-AP-12 — Stations-JSON validieren und Fehlerzustände definieren

**Ziel:** Geladenen JSON-Text validieren gegen STATIONS_CONFIG_CONTRACT.md. Alle Error(d)-Zustände auslösen können.

**Erlaubte Dateien:** `app.js`

**Ausdrücklich nicht enthalten:**
- Fensterfilter (AP-13)
- UI für Error-States (erst AP-18)
- Validierung des Quellenstatus gegen Gate (das ist Teil der Gate-Logik in AP-14)

**Akzeptanzkriterien:**
- `validateStationsJson(json)` gibt entweder valide Stationenbibliothek oder strukturierten Fehler zurück
- Prüft alle Top-Level-Felder (version, locale, app, selectionPolicy, visualRules, motionRules, stations)
- Prüft alle Pflichtfelder pro Station
- Prüft alle Enum-Werte (role, status, sourceStatus)
- Prüft No-Red-Coding-Regeln (visualRules + flags.noRedColor)
- Erkennt `dynamic_latest_month` und prüft, ob es nur einmal vorkommt
- Findet berechnete Zahlenwerte in Stationsfeldern → Fehler
- Gibt klaren Fehlertyp aus (`error: 'missing_field'`, `error: 'invalid_enum'`, etc.)
- Testfälle TC-A01, T-11a, T-11b aus QA_TEST_CASES.md und APP_SPEC.md §19 erfüllbar

**Risiken:**
- Zuviel Validierungslogik in AP-12 → Scope-Creep. AP-12 validiert Struktur; Gate-Logik kommt in AP-14.
- `flags`-Validierung: nur `noRedColor` ist vertraglich Pflicht. Extra-Flags (`climax`, `lateWobble`, `finalReveal`) sind erlaubt und dürfen nicht als Fehler gewertet werden.

**Abbruchkriterien:**
- Validierungslogik wächst über app.js hinaus (z.B. separate Datei nötig) → stoppen, AP-Scope neu abgrenzen
- Zwei Fixversuche bei einem Bug → stoppen, ATTEMPT-LOG.json aktualisieren

---

### B1-AP-13 — Aktives 120-Monats-Fenster aus CSV bestimmen

**Ziel:** `latestMonth` und `startMonth` aus der validierten CSV ableiten. `activeWindow` in AppContext setzen.

**Erlaubte Dateien:** `app.js`

**Ausdrücklich nicht enthalten:**
- Stationenfilterung (AP-14)
- CSV-Parsing (bleibt in CSVParser.js — FORBIDDEN)
- `FwDateUtils.js` anfassen (PROTECTED; nur nutzen, nicht ändern)

**Akzeptanzkriterien:**
- `latestMonth` = letzter valider CSV-Eintrag (Format YYYY-MM)
- `startMonth` = `latestMonth − 119 Monate` (korrekte Monatsberechnung, kein Off-by-one)
- `activeWindow: { startMonth, latestMonth, periodMonths: 120 }` in AppContext
- Kein Tagesdatum (`new Date()`) für Fensterberechnung verwenden
- Wenn `FwDateUtils.js` eine geeignete Monats-Subtraktionsfunktion bereitstellt, diese nutzen
- Testfall T-11c (Station außerhalb Fensters wird nicht angezeigt) vorbereitet

**Risiken:**
- Monats-Subtraktion um 119 Monate: Off-by-one-Fehler (z.B. 2025-04 − 119 = 2015-05, nicht 2015-04)
- Monat aus Datumsstring `YYYY-MM-DD` korrekt extrahieren: nur erste 7 Zeichen

**Abbruchkriterien:**
- `FwDateUtils.js` hat keine passende Funktion → eigene Monatsberechnung in app.js (dokumentieren warum)
- Berechnungsfehler nach zwei Fixversuchen → stoppen

---

### B1-AP-14 — Stationen filtern, sortieren, Final Reveal mappen und Redaktions-Gate prüfen

**Ziel:** `activeStations` aus `stations[]` bestimmen und Redaktions-Gate-Prüfung ausführen.

**Erlaubte Dateien:** `app.js`

**Ausdrücklich nicht enthalten:**
- Screen-Rendering (AP-15, AP-16)
- A11y (AP-18)
- UI für Gate-Fehler (AP-18)

**Akzeptanzkriterien:**
- Fensterfilter: `startMonth <= station.date <= latestMonth`; `source_claimed_unchecked`-Stationen herausfiltern
- Selektion: highest_priority_within_window, `maxVisibleStations = 7`
- Sortierung: `date_asc`
- `crisis`-Station bevorzugen, `falseResolution`-Station bevorzugen, `late_wobble`-Station am Ende bevorzugen
- Final-Reveal-Station wird aus `dynamic_latest_month`-Template erzeugt und mit `latestMonth` befüllt
- Final Reveal wird als letzte Station angehängt, zählt nicht zu `maxVisibleStations`
- Gate A vollständig geprüft (G-A01, G-A02, G-A04, G-A05)
- Gate-Ergebnis: `GateOK`, `EditorialDegraded` oder `GateBlocked`
- `EditorialDegraded` löst im Dev-Modus Diagnose-Ausgabe aus
- Testfälle T-11c, T-11d, T-11e und TC-A01 erfüllbar

**Risiken:**
- `source_claimed_unchecked` nach Filterung: wenn nur noch 3 Stationen sichtbar bleiben → `EditorialDegraded`, kein Crash
- Selektion bei Prioritäts-Gleichstand: deterministischer Tie-Breaker nötig (z.B. älteres Datum bevorzugt)
- Flag-Diskrepanz April 2025 (`finalWobble: false, lateWobble: true` in JSON, aber APP_SPEC.md §23.14 nennt `finalWobble: true`): Sortierpräferenz für `late_wobble`-Station am Ende soll auf `role: "late_wobble"` prüfen, nicht auf `flags.finalWobble`. Damit ist die Inkonsistenz neutralisiert.

**Abbruchkriterien:**
- Gate-Logik wächst über AP-14-Scope → stoppen, nachfragen
- Mehr als 3 zentrale Dateien betroffen → stoppen

---

### B1-AP-15 — Screen 2 zur user-stepped Stationenreise umbauen

**Ziel:** Bestehende Screen-2-Logik (Ergebnisgrafik mit KPI-Cards) auf Stationenreise umbauen. Chart wächst Station für Station. Stationen-Button löst nächste Station aus.

**Erlaubte Dateien:** `app.js`, `app.test.html`, `app.css` (sofern für Stationendarstellung nötig)

**Ausdrücklich nicht enthalten:**
- Screen 3 und 4 (AP-16, AP-17)
- Motion und Reduced Motion (AP-18)
- A11y (AP-18)
- KPI-Cards auf Screen 2 (Verboten — gehören auf Screen 3)

**Akzeptanzkriterien:**
- Screen 2 zeigt `visibleChartSeries` (Teilansicht bis aktuelle Station), nicht `chartSeries`
- `StationCard` zeigt: Datum/Quellenlabel, Headline, Anleger-Anker
- Stationen-Button (`Weiter investiert bleiben`) erhöht `activeStationIndex`
- Nach letzter Station: Button wechselt zu `Ergebnis ansehen`, `isJourneyComplete = true`
- Mobile-Collapsible (`Zwischenstand anzeigen`) zeigt berechneten `stationIntermediate`
- Keine finale KPI-Card sichtbar auf Screen 2
- Kein vollständiger Chart auf Screen 2
- Kein `revealA11ySummary`-Schreiben in Live-Region auf Screen 2
- Testfälle T-15, T-16, T-17, T-18, T-22, T-23, T-26 aus APP_SPEC.md §19 erfüllbar

**Risiken:**
- Bestehende Slice-6-Implementierung (Ergebnisgrafik) wird durch diesen AP ersetzt — vollständige Regression gegen alte Screen-2-Logik notwendig (L-Gruppe in QA_TEST_CASES.md)
- `visibleChartSeries`-Berechnung: Monat der Station muss mit Monat in `chartSeries` gemappt werden (YYYY-MM aus station.date vs. YYYY-MM aus chartSeries[].month)

**Abbruchkriterien:**
- Umbau bricht bestehende Screen-1- oder Screen-3-Logik → stoppen, melden
- Mehr als 3 zentrale Dateien betroffen → stoppen

---

### B1-AP-16 — Screen 3 Reveal mit Chart + KPI-Cards sauber trennen

**Ziel:** Screen 3 zeigt erstmals vollständigen Chart, KPI-Cards, VertikaleLinie, AssumptionsBox. Trennung von Screen 2 ist architektonisch klar.

**Erlaubte Dateien:** `app.js`, `app.test.html`, `app.css`

**Ausdrücklich nicht enthalten:**
- Screen 4 (AP-17)
- A11y `revealA11ySummary` (AP-18)
- Screen-2-Logik anfassen (AP-15 ist abgeschlossen)

**Akzeptanzkriterien:**
- Screen 3 wird erst nach `isJourneyComplete === true` gezeigt
- Vollständiger `chartSeries`-Chart (alle 120 Datenpunkte)
- `VertikaleLinie` beim letzten Datenpunkt
- KPI-Cards: `eingezahlt`, `depotwertHeute`, `differenz` — alle aus AppContext-Berechnung, nicht aus JSON
- `AssumptionsBox` sichtbar (Pflicht)
- Keine KPI-Cards auf Screen 2 mehr sichtbar (Regression)
- Testfälle T-15, T-19, T-20, T-24 (Regression), T-25 (No-Red) erfüllbar

**Risiken:**
- `differenz` kann negativ sein (bei ungünstigem Fenster) → wertneutrale Darstellung, kein Alarm-Styling
- KPI-Labels: Alltagssprache (`APP_SPEC.md §16.5`)

**Abbruchkriterien:**
- KPI-Berechnung stimmt nicht mit Anteilslogik aus APP_SPEC.md §15 überein → stoppen
- Zwei Fixversuche fehlgeschlagen → ATTEMPT-LOG.json aktualisieren, stoppen

---

### B1-AP-17 — Screen 4 Transfer ohne Prognose absichern

**Ziel:** Screen 4 mit Headline, Microcopy und PrimaryCta (Platzhalter) implementieren. Keine neue Zahl, kein Zukunftschart, kein Countdown.

**Erlaubte Dateien:** `app.js`, `app.test.html`, `app.css`

**Ausdrücklich nicht enthalten:**
- CTA-Endformulierung (redaktionell offen, E-04)
- Prognose-Kurve (verboten)
- A11y (AP-18)

**Akzeptanzkriterien:**
- Screen 4 erscheint nach Screen 3
- Headline: „Heute beginnt wieder ein Chart, dessen Ende niemand kennt."
- PrimaryCta-Platzhalter: `[CTA — redaktionell offen, E-04]` oder vorläufige Formulierung
- Kein Zukunftschart, keine fortgeschriebene Linie, keine neue Zahl
- Screen 4 transferiert Erkenntnis, erzeugt keine Druck-Formulierung (kein Countdown, kein Fake-Urgency)
- Testfälle T-21, T-27 aus APP_SPEC.md §19 erfüllbar

**Risiken:**
- CTA-Text ohne Alberts Freigabe → Platzhalter verwenden, nicht eigenmächtig entscheiden
- Screen 4 darf keine Screen-3-KPI-Zahlen wiederholen (wäre redundant und könnte als Prognose gelesen werden)

**Abbruchkriterien:**
- CTA-Text erfordert Alberts Entscheidung (E-04) → stoppen, fragen

---

### B1-AP-18 — Motion, Reduced Motion, A11y, Error(d), Empty-Journey, No-Red-Coding technisch absichern

**Ziel:** Querschnittsthemen technisch absichern. Dieser AP läuft nach AP-15–AP-17 und repariert / ergänzt alle Aspekte, die in den Coding-Slices noch offen geblieben sind.

**Erlaubte Dateien:** `app.js`, `app.test.html`, `app.css`

**Ausdrücklich nicht enthalten:**
- Neue Features
- Screen-Flow-Änderungen
- Inhaltliche Änderungen an stations.de.json

**Akzeptanzkriterien:**

_Motion:_
- Draw-Animation zwischen Stationen implementiert (Chart wächst kurz sichtbar zur nächsten Station)
- Bei `prefers-reduced-motion`: sofortiger Sprung auf neuen Zustand, keine Animation
- Kein langes Autoplay, kein erzwungenes Warten vor Button

_A11y:_
- `aria-live="polite" aria-atomic="true"` Live-Region vorhanden
- Screen 2: `stationLiveMessage` gesetzt bei Stationswechsel (kein Depotwert)
- Screen 3: `revealA11ySummary` gesetzt beim Reveal-Übergang
- Chart: `role="img"` mit `aria-label` oder `<figure><figcaption>` korrekt
- Fokusführung nach Stationswechsel: auf neue Stations-Überschrift
- Collapsible: `aria-expanded`, `aria-controls`, Tastatur-Bedienbarkeit (Enter/Space)
- Slider: `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`
- Alle 4 Screens per Tastatur erreichbar, keine Tastaturfalle
- Fehlermeldungen als `textContent` (kein `innerHTML`)
- `A11y-Endwissens-Leak-Check`: Live-Region, `aria-label`, `figcaption`, `visually-hidden` auf Screen 2 enthalten kein `depotwertHeute`, `eingezahlt`, `differenz`
- Testfälle T-34 bis T-40, TC-H05 (QA_TEST_CASES.md), G-A06b (REDAKTIONS_GATE.md) erfüllbar

_Error- und Empty-States:_
- `Error(d)`: sichtbare `textContent`-Meldung, kein Stacktrace im Produktivmodus
- `Empty-Journey`: sichtbare `textContent`-Meldung, keine halbfertige Reise
- Dev-Modus: technische Gate-Diagnose sichtbar (Schaltmechanismus TBD — z.B. `?dev=true`-Parameter oder `localhost`-Erkennung)
- Loading-State: Skeleton oder Spinner sichtbar, kein leerer Container

_No-Red-Coding-Absicherung:_
- Technischer Check: `visualRules.redCrashColor`, `lossColoring`, `crashSegmentColoring` sind `false`
- Alle Stationen haben `flags.noRedColor: true` — wird in AP-12-Validator geprüft
- `differenz` negativ: keine rote Farbe, kein Alarm-Icon, wertneutrale Darstellung
- Chart-Linie: neutrale Farbe, kein rotes Segment

_Responsive / Mobile:_
- Viewport 375px: Slider bedienbar, Chart lesbar, Collapsible nutzbar, kein horizontaler Overflow
- Button mit Daumen erreichbar (Mobile), ausreichende Touch-Target-Größe

**Abbruchkriterien:**
- Mehr als 3 zentrale Dateien müssen für A11y-Fixes geändert werden → stoppen, AP-Scope neu abgrenzen
- Zwei Fixversuche für denselben A11y-Bug → stoppen, melden

---

## 9. Protected Files / No-Touch-Bereiche

Aus `.claude/PROTECTED_PATHS.json` (Stand 2026-06-17):

| Pfad | Level | Regel für alle Slices |
|---|---|---|
| `Theme/assets/js/fw-chart-engine/data/FinanzwesirData.js` | **forbidden** | Niemals lesen oder ändern |
| `Theme/assets/js/fw-chart-engine/data/CSVParser.js` | **forbidden** | Niemals lesen oder ändern |
| `Theme/assets/js/fw-chart-engine/core/FwDateUtils.js` | protected | Nur nutzen (lesen, Funktionen aufrufen), nicht ändern. Wenn eine Funktion fehlt: in ap.js ergänzen und begründen. |
| `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` | protected | Nur mit expliziter Begründung und Regressionstest ändern. |
| `Theme/assets/js/fw-chart-engine/core/FwRenderer.js` | protected | Nur mit expliziter Begründung und Regressionstest ändern. |
| `Active Campaign Liste/` | **forbidden** | Niemals berühren |
| `Apps/prokrastinations-preis/config/stations.de.json` | redaktionell geschützt | Nur lesen. Inhaltliche Änderungen erfordern Albert-Freigabe und eigenständiges AP. |

**Für alle AP-11 bis AP-18 gilt:**
Bevor eine der protected/forbidden Dateien aus einem inhaltlichen Grund anfassen zu sein scheint:
1. Stoppen.
2. Grund erklären.
3. Kleinste sichere Alternative beschreiben.
4. Auf Alberts OK warten.

---

## 10. Akzeptanzkriterien für AP-10

- [x] `Apps/prokrastinations-preis/STATIONS_IMPLEMENTATION_PLAN.md` existiert
- [x] Kein Produktivcode geändert
- [x] Keine Tests implementiert
- [x] Keine UI geändert
- [x] `stations.de.json` nicht inhaltlich verändert (AP-09 hatte keine harten Blocker)
- [x] Validierungsregeln vollständig beschrieben (§4)
- [x] Redaktions-Gate technisch abbildbar beschrieben (§5)
- [x] Error(d)- und Empty-Journey-State beschrieben (§7)
- [x] No-Red-Coding technisch geplant (§4 + §7 + AP-18)
- [x] AP-11 bis AP-18 als spätere Coding-Slices vorbereitet (§8)
- [x] Offene Risiken markiert (§11)
- [x] AP-11 nicht gestartet

---

## 11. Offene Risiken

| ID | Risiko | Schwere | Empfehlung |
|---|---|---|---|
| R-01 | 3 Stationen `source_claimed_unchecked` (2018-02, 2018-12, 2020-11) blockieren Redaktions-Gate G-A02 | Hoch (Publikationsblockierer) | Quellenrecherche und -prüfung vor Launch. Separates Redaktions-AP. Business Insider 2018 und WiWo 2018 sind in REDAKTIONS_GATE.md als offene Punkte dokumentiert. |
| R-02 | Flag-Diskrepanz April 2025: JSON hat `finalWobble: false, lateWobble: true`; APP_SPEC.md §23.14 nennt `finalWobble: true` | Mittel (betrifft Sortierpräferenz-Logik in AP-14) | In AP-14 auf `role: "late_wobble"` prüfen, nicht auf `flags.finalWobble`. Vor AP-14 mit Albert klären, ob das beabsichtigt ist. |
| R-03 | CTA-Formulierung Screen 4 (E-04) noch offen | Niedrig (kein Launch-Blocker) | AP-17 setzt Platzhalter. Redaktionelle Entscheidung durch Albert vor Release. |
| R-04 | Produktive MSCI-CSV noch nicht vorhanden | Hoch (alle Coding-APs benötigen Testdaten) | AP-11 bis AP-14 können mit Mock-CSV vorbereitet werden. Produktive CSV muss vor AP-15 vorhanden sein. |
| R-05 | CORS-Verhalten von `config/stations.de.json` auf Produktivserver (Ghost.io) ungeklärt | Mittel | In AP-11 lokal testen. Vor Release prüfen, ob Ghost.io die Datei liefert oder ob ein anderer Pfad nötig ist. |
| R-06 | Chart-Engine-Integration (SF-01 aus APP_SPEC.md §21): welche Bibliothek / welche Komponente für SparplanChart? | Mittel | Vor AP-15 klären. Bestehende Slice-6-Implementierung gibt Hinweise auf vorhandene Chart-Lösung. |
