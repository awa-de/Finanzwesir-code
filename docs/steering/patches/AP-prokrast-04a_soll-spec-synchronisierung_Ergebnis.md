# AP-prokrast-04a — Soll-/Spec-Synchronisierung Ergebnis

## Status

GRÜN

## Kurzbefund

`APP_SPEC.md` V2.9 enthielt an mehreren Stellen (§16.2-Tabelle „Hauptelement" Screen 4, §16.3-Primitive-Tabelle, Testkurzliste T-21, §23.18 „Was Screen 4 nicht enthält") noch die alte Aussage „Screen 4 hat keinen Chart" — ein aktiver Widerspruch zum von Albert im Browser bestätigten, freigegebenen Rubikon-Chart-Stand aus AP-prokrast-03f–03i. `drehbuch_prokrastinationspreis_app.md` beschrieb parallel eine Beat-Choreografie (X-Achsen-Animation, Symbol-Reveal, Text unter dem Chart), die zu großen Teilen architektonisch widerlegt oder durch Masterfaden-Entscheidung verworfen wurde. Beide Dateien wurden auf den finalen, freigegebenen Stand synchronisiert. Kein Code, keine Engine, keine Stationsdaten geändert.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0` — Repo-Namensdiskrepanz zu „Finanzwesir-code" bereits in AP-prokrast-02a als GELB-Grund benannt und vom Steuerfaden als kein Blocker eingestuft (Memory: `project_prokrastinations_preis_drehbuch.md`). Kein neuer Stopp-Grund.
- `git status --short`: nur `.claude/learning/session-log.md` (eigener `/start`-Eintrag) vor Beginn der Arbeit
- `git diff --name-status` (vor Beginn): `M .claude/learning/session-log.md`
- `git log --oneline -1`: `ffacc13 feat(AP-prokrast-03f–03i): Screen 4 Rubikon-Reveal — von Morph-Animation zu stehendem Screen mit DOM-Overlay-Text`

Keine unerwarteten Fremdänderungen, kein Blocker. AP-prokrast-03i-Protokoll vorhanden und GRÜN.

## Gelesene Pflichtquellen

- `Apps/prokrastinations-preis/APP_SPEC.md` (V2.9, vollständig relevante Abschnitte: §1, §16, §23.18)
- `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` (vollständig)
- `Apps/prokrastinations-preis/AP-prokrast-01_befund-anamnese.md` (via Subagent-Extraktion + eigene Verifikation)
- `docs/steering/patches/AP-prokrast-03f_..._Ergebnis.md` bis `AP-prokrast-03i_..._Ergebnis.md` (via Subagent-Extraktion, Kernaussagen gegen APP_SPEC/Drehbuch abgeglichen)
- `Apps/prokrastinations-preis/app.js` (gezielt Screen-4-Funktionen, via Subagent-Extraktion, nicht selbst editiert)
- `Apps/prokrastinations-preis/app.css` (gezielt Rubikon-Selektoren, via Subagent-Extraktion, nicht selbst editiert)
- `NAVIGATION.md` (App-Routing-Block, B1/AP-prokrast-Historie)
- `docs/spec/APP-INTERFACE.md`, `docs/steering/audits/SECURITY-BASELINE.md` (Pflichtlektüre APP-ARBEIT, Full-Gate-Voraussetzung)

Subagent-Dispatch: `spec-scout` (mechanische Extraktion aller Pflichtquellen, keine Bewertung) — Ergebnis diente als Ausgangspunkt, zentrale Behauptungen (APP_SPEC-Zitate zu §16/T-21/T-27/§23.18) wurden vor Verwendung direkt am Dateiinhalt nachverifiziert (Grep + Read).

## Geänderte Dateien

- **Datei:** `Apps/prokrastinations-preis/APP_SPEC.md`
  - **Änderung:** §1-Status „Code-Stand" korrigiert (Screen 4 = Rubikon-Chart + DOM-Overlay + CTA statt „CTA"); Screen-Übersichtstabelle Zeile 4 „Hauptelement" ergänzt; neuer Abschnitt §16.1a „Screen 4 — Rubikon-Chart und Zukunftsraum" (Chart-Aufbau, Haupttext/A11y, `FwChartTextPlugin`-Einordnung, Reveal-Timing, nachgelagerte Pflichtteile); §16.2 Screen-4-Text um Verweis auf §16.1a ergänzt; §16.3-Primitive-Tabelle um zwei neue Zeilen (RubikonChart, Rubikon-Text) ergänzt; Muss-Tests-Kurzliste + T-21 präzisiert (keine Prognose bleibt gültig, „kein Chart" korrigiert zu „leerer Zukunftsraum im Chart"); §23.18 „Was Screen 4 nicht enthält" präzisiert (Kernaussage „keine Zukunftsdaten" erhalten, „keinen Zukunftschart" korrigiert).
  - **Warum im Scope:** Primär erlaubter Kandidat laut Auftrag; genau die Aufgabe von AP-prokrast-04a.
  - **Risiko:** Gering — nur additive/präzisierende Textänderungen, keine Löschung bestehender gültiger Aussagen (z. B. „keine Prognosekurve" bleibt überall stehen).
  - **nach Write vollständig wiedergelesen:** ja

- **Datei:** `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md`
  - **Änderung:** Amtlicher Hinweis-Callout direkt nach der Screen-4-Überschrift; Beat 1 (Achsenanimation) als „abgelöst, nicht gebaut" markiert mit Root-Cause-Zitat aus AP-prokrast-03g; Beat 2 (✅/❓-Symbole) explizit als „offen, nie entschieden" markiert (nicht als abgelöst!); Beat 3 (Textposition) als „Textposition abgelöst" markiert mit Verweis auf AP-prokrast-03h2; Beat 4 (Stille) als „Grundidee erhalten, Timing erweitert" ergänzt (zwei 800ms-Momente statt einem); „Was nicht gebaut wird"-Liste: durchgestrichener, korrigierter Eintrag zu Text im Zukunftsraum; Implementierungs-Notizen-Tabelle: X-Achsen-Verlängerung als überholt markiert, ✅/❓-Zeile auf „offen" korrigiert.
  - **Warum im Scope:** Primär erlaubter Kandidat laut Auftrag; historische Beats bleiben als Dramaturgie-Vorlage erhalten (nicht gelöscht), aber eindeutig als abgelöst/offen gekennzeichnet — keine konkurrierenden aktiven Soll-Passagen.
  - **Risiko:** Gering — Originaltext bleibt vollständig erhalten (nur durchgestrichen bzw. mit Status-Callouts versehen), keine Kürzung der historischen Aufzeichnung.
  - **nach Write vollständig wiedergelesen:** ja

- **Datei (neu):** `docs/steering/patches/AP-prokrast-04a_soll-spec-synchronisierung_Ergebnis.md`
  - **Änderung:** dieses Protokoll
  - **Warum im Scope:** Pflichtergebnis laut Auftrag
  - **Risiko:** keins
  - **nach Write vollständig wiedergelesen:** ja (dieses Dokument)

## Nicht geändert

- app.js: unverändert (nur gelesen)
- app.css: unverändert (nur gelesen)
- stations.de.json: nicht gelesen, nicht geändert (kein Bezug zu Screen-4-Sollstand)
- Chart-Engine: unverändert
- Plugins (`FwChartTextPlugin.js`, `FwVerticalLinePlugin.js`, `ChartEngine.js`): unverändert
- Strategies (`LineChartStrategy.js`, `FwSmartXAxis.js`): unverändert
- package-/lockfiles: unverändert
- vendor-Dateien: unverändert

Bestätigt durch `git diff --name-status` nach Abschluss: nur `.claude/learning/session-log.md`, `Apps/prokrastinations-preis/APP_SPEC.md`, `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` (plus dieses neue Protokoll, als untracked Datei).

## Synchronisierung gegen AP-03

| AP-03-Entscheidung | Dokumentiert wo? | Aktive Widersprüche entfernt? | Beleg |
|---|---|---:|---|
| kein Morph | APP_SPEC §16.1a Satz 1; Drehbuch Beat-1-Callout | ja | „kein Morph, keine Achsenanimation, keine gestufte C2-Staffelung" |
| keine Achsenanimation | APP_SPEC §16.1a; Drehbuch Beat 1 als „abgelöst, nicht gebaut" markiert + Root-Cause-Zitat AP-03g | ja | Chart.js-Root-Cause direkt zitiert |
| keine C2-Staffelung | APP_SPEC §16.1a Satz 1 | ja | „keine gestufte C2-Staffelung" |
| stehender Rubikon-Screen | APP_SPEC §16.1a „Chart-Aufbau" + Status-/Übersichtstabelle | ja | Chart-Aufbau-Absatz (links Vergangenheit, Mitte Linie, rechts leerer Zukunftsraum) |
| DOM-Overlay Haupttext | APP_SPEC §16.1a „Haupttext (A11y-Pflicht)"; Drehbuch Beat 3 als „Textposition abgelöst" markiert | ja | CSS-Custom-Properties-Mechanismus dokumentiert |
| FwChartTextPlugin nicht Haupttextlösung | APP_SPEC §16.1a Absatz 3 | ja | „ist aber **nicht** die Lösung für den Screen-4-Haupttext" |
| 800ms + Text + 800ms + CTA | APP_SPEC §16.1a „Reveal-Timing"; Drehbuch Beat-4-Ergänzung | ja | 6-Punkte-Ablauf dokumentiert |
| keine Zukunftsdaten/Future-Line | APP_SPEC §16.1a „Chart-Aufbau" + §23.18 + T-21 | ja | „keine Zukunftsdaten in diesem Bereich" durchgängig erhalten/präzisiert |

## Neuer aktiver Sollstand Screen 4

Screen 4 zeigt beim Eintritt sofort den finalen Rubikon-Zustand: links die echte 10-Jahres-Vergangenheit, in der Mitte die Entscheidungslinie (`FwVerticalLinePlugin`), rechts ein vollständig leerer, datenfreier Zukunftsraum (`xDisplayRange`). Der Haupttext ist ein A11y-pflichtiger DOM-Textblock, der per CSS visuell in den rechten Zukunftsraum gelegt wird (kein Canvas-Text, `FwChartTextPlugin` bleibt ungenutzter, aber vorhandener Baustein). Reveal-Ablauf: Chart sofort sichtbar → 800ms Stille → Text erscheint (+ A11y-Live-Region) → 800ms Stille → CTA erscheint. Kein Morph, keine Achsenanimation, keine C2-Staffelung, keine ✅/❓-Symbole (diese sind offen, nicht gebaut, nicht verworfen).

Verankert in: `Apps/prokrastinations-preis/APP_SPEC.md` §16.1a (neu), §16.2 (Verweis), §16.3 (Primitive-Tabelle), §23.18 (präzisiert).

## Nachgelagerte Pflichtteile

- **Card-to-Point:** weiterhin Pflicht, nicht gebaut — unverändert offen, in §16.1a explizit als nachgelagerte Pflicht benannt.
- **Screen-3 Timing-Reveal:** weiterhin Pflicht, nicht gebaut — unverändert offen, in §16.1a explizit als nachgelagerte Pflicht benannt.
- **redaktionelle Korrekturen:** CTA-Copy-Kandidaten (Screen 4) bleiben laut APP_SPEC §16.2/§23.18 redaktionell offen — unverändert, nicht Teil dieses APs.
- **finale QA/Abnahme:** folgt in AP-prokrast-04b (separater read-only Abschluss-QA-AP).

## Datei-Wahrheit nach Wiederlesen

- **Marker-QA:** neue Sollmarker vorhanden — §16.1a (Chart-Aufbau, Haupttext, Timing, nachgelagerte Pflichtteile), §16.3-Primitive-Zeilen, T-21/§23.18-Präzisierung, Drehbuch-Beat-Callouts (1 abgelöst, 2 offen, 3 Textposition abgelöst, 4 Timing erweitert). Alle GRÜN vorhanden.
- **Altlasten-QA:** „Morph", „Achsenanimation", „C2-Staffelung" stehen an keiner Stelle mehr als aktives, unkommentiertes Soll — jede verbleibende Erwähnung ist explizit als abgelöst/historisch/Root-Cause-Beleg gekennzeichnet. „Kein Chart auf Screen 4" als pauschale Aussage existiert nicht mehr; die weiterhin gültige, engere Aussage „keine Prognose/keine Zukunftsdaten" bleibt überall erhalten. Kein Treffer für „Canvas-Haupttext als Pflichtlösung".
- **Scope-QA:** `git diff --name-status` zeigt ausschließlich `.claude/learning/session-log.md` (eigener `/start`-Eintrag, außerhalb dieses AP-Scopes), `Apps/prokrastinations-preis/APP_SPEC.md`, `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md`. Kein `app.js`, `app.css`, `stations.de.json`, Engine-, Plugin- oder Strategy-Diff.
- **vollständig wiedergelesene Dateien:** `APP_SPEC.md` (§16.1a-Bereich + Primitive-Tabelle + T-21/§23.18-Umfeld), `drehbuch_prokrastinationspreis_app.md` (kompletter Screen-4-Abschnitt inkl. Responsive-Tabelle und Implementierungs-Notizen)
- **Befund:** GRÜN. Alle Behauptungen in diesem Protokoll sind gegen die real geschriebenen Dateien verifiziert (kein „sollte jetzt stehen" ohne Wiederlesen).

## Offene Punkte

> **⚠️ Eskalations-Pflicht — 2 Ebenen nach oben:** Die beiden folgenden Punkte (Beat-2-Symbole und QA_TEST_CASES.md-Lücke) sind von Albert explizit als nicht-übersehbar markiert worden. **Das lesende/planende LLM in AP-prokrast-04b MUSS diese beiden Punkte aktiv an die nächsthöhere Ebene weiterreichen — und zwar zwei Stufen nach oben:** (1) an den AP-prokrast-Masterfaden (Rücklaufkapsel/Übergabe von AP-prokrast-04), und (2) von dort weiter an die Projektsteuerung/Albert selbst. Nicht nur im Protokoll ablegen — aktiv ansprechen, nicht stillschweigend durchreichen.

- **Produktentscheidung:** ✅/❓-Symbole (Drehbuch Beat 2) sind weder gebaut noch entschieden — echte offene Produktentscheidung, kein Nachputz-Item. Muss vor einem eventuellen Bau erneut mit Albert geklärt werden. **→ 2 Ebenen nach oben eskalieren (siehe Kasten oben).**
- **Spec:** keine offenen Spec-Fragen in `APP_SPEC.md` selbst; §16.1a ist vollständig.
- **UX:** CTA-Copy für Screen 4 bleibt redaktionell offen (bereits vor diesem AP bekannt, unverändert).
- **Code:** Card-to-Point, Screen-3-Timing-Reveal — beide unverändert offen, außerhalb dieses APs.
- **CSS:** keine offenen Punkte aus diesem AP.
- **Test:** `docs/steering/patches/../../QA_TEST_CASES.md` bzw. `Apps/prokrastinations-preis/QA_TEST_CASES.md` (laut `APP_SPEC.md` „maßgebend für Abnahme und QA") liegt außerhalb des erlaubten Write-Scopes von AP-prokrast-04a. Die dortigen Pendants zu T-21/T-27/§23.18 sind nach diesem AP **nicht** synchronisiert und laufen der jetzt korrigierten `APP_SPEC.md` hinterher. **→ 2 Ebenen nach oben eskalieren (siehe Kasten oben).**
- **Backlog:** kein neuer BACKLOG-Eintrag in diesem AP angelegt (auf Alberts Wunsch reicht die Verankerung hier unter „Offene Punkte" — BACKLOG-Aufnahme ggf. als Folgeschritt bei der Eskalation).

## Empfehlung

- **nächster interner AP:** AP-prokrast-04b — Abschluss-QA Claims-vs-Files (read-only), inklusive Weiterreichen der beiden eskalationspflichtigen Punkte
- **ausdrücklich nicht:** Commit, Abschlussritual, AP-prokrast-05, Code-Bau, UI-Politur, Card-to-Point, Screen-3-Timing-Reveal, QA_TEST_CASES.md-Änderung
