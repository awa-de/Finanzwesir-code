# AP-prokrast-11a — Screen-3 Kontinuitäts-Reveal Sync-Analyse Ergebnis

## Status

GELB

## Kurzbefund

`APP_SPEC.md`, `drehbuch_prokrastinationspreis_app.md` und `QA_TEST_CASES.md` sind alle drei nicht mit dem in AP-prokrast-10 gebauten Kontinuitäts-Reveal (Variante B++) synchron. Alle drei Dokumente beschreiben weiterhin den ursprünglichen, in AP-10b verworfenen Text→Chart→KPI-Timing-Reveal bzw. erwähnen den heutigen Bridge-Mechanismus (`bridgeS3`, „Station X von Y · Bekannt bis Z") überhaupt nicht. AP-prokrast-11b (Write-AP) ist nötig.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short`: nur `M .claude/learning/session-log.md` (bekannte `/start`-Geräuschkulisse, kein App-/Engine-/Spec-Diff)
- `git diff --name-status`: identisch, nur `session-log.md`
- `git log --oneline -15`: `1033c9e feat(AP-prokrast-10a-10d): Screen-3 Kontinuitäts-Reveal — Kettenabschluss` ist committed (HEAD). AP-prokrast-10 ist damit git-seitig bestätigt abgeschlossen. Kein unerwarteter Diff an `Apps/prokrastinations-preis/**`, `Theme/assets/js/fw-chart-engine/**`, `Theme/assets/data/**` oder `docs/spec/**`. Stop-Regel nicht ausgelöst — Analyse regulär fortgesetzt.

## Gelesene Pflichtquellen

- `Apps/prokrastinations-preis/app.js` (Screen-3-DOM-Aufbau Z.378–430, `formatStationProgress()` Z.583–591, `renderS3()` Z.629–642, `revealScreen3()` Z.654–708)
- `Apps/prokrastinations-preis/app.css` (`--fw-screen3-reveal-fade-duration` Z.18–21, `.fw-app__kpi-slot`/`.fw-app__assumptions`-Transition Z.399–413)
- `Apps/prokrastinations-preis/APP_SPEC.md` (§16.1 Z.1116–1249, §16.1a Z.1250–1278, §16.2 Z.1279 ff., §23.6/23.7 Z.1780–1815)
- `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` (Screen 3 Z.92–115, Implementierungs-Notizen Z.193–203)
- `Apps/prokrastinations-preis/QA_TEST_CASES.md` (Gruppe E Z.437–536, weitere Screen-3-Treffer über TC-H05/H06/P04/P05)
- `docs/steering/patches/AP-prokrast-10d_ruecklaufkapsel_master_Ergebnis.md` (vollständig)
- `docs/steering/patches/AP-prokrast-10a_screen3-timing-analyse_Ergebnis.md`, `AP-prokrast-10b_screen3-kontinuitaets-reveal_implementierung_Ergebnis.md`, `AP-prokrast-10c_abschluss-qa_claims-vs-files_timing_Ergebnis.md` (Fundstellen zu Bridge/Timing/QA-Stand)
- AP-09-Protokolle nur zur Einordnung offener Punkte (No-op-Bootstrap/AnchorMeasurement, chartSettled), nicht zur Lösung genutzt

## AP-10 Datei-Wahrheit

- **app.js:** Screen 3 hat kein `hidden` mehr auf `chartSection3` — Chart + Ergebnislinie (`features.verticalLine:'last'`) rendern beim Eintritt sofort, vollständig, mit `renderMotion:{mode:'instant'}` (kein Tweening). Ein neues Element `bridgeS3` (`fw-app__journey-progress fw-app__screen3-bridge`) zeigt beim Eintritt denselben Text wie zuletzt auf Screen 2 (`formatStationProgress()`, identische Formel wie `progressEl`). Nach 800ms (`screen3BridgeTimer`) wird die Bridge versteckt und KPI-Karten (`kpiContainerS3`) + `assumptionsS3` erscheinen per Klassenwechsel `fw-app__screen3-reveal--visible`.
- **app.css:** `--fw-screen3-reveal-fade-duration: 800ms` steuert den KPI/Disclaimer-Fade; CSS-`var()`-Fallback zeigt noch `400ms` (laut AP-10d als kosmetisch/folgenlos bewertet, da Variable immer definiert ist).
- **AP-10-Protokolle:** AP-10d bestätigt Variante B++ final, `progressEl` unverändert auf Screen 2, kein Screen-2-Ergebnismodus, keine Engine-/Plugin-Änderung, keine Chart.js-Internals in `app.js`.
- **Browserbestätigung:** Albert hat S/M/L und Reduced Motion nach AP-10c browserseitig bestätigt (laut AP-10d, Z.47–52 dort).
- **Reduced Motion:** kein Timer, `bridgeS3` bleibt `hidden`, `revealResult()` läuft synchron — KPI/Disclaimer sofort im Endzustand (app.js Z.700–706, app.css Z.410–413).

## Dokumenten-Iststand

| Dokument | aktueller Screen-3-Stand | Abweichung zu AP-10 | Empfehlung |
|---|---|---|---|
| APP_SPEC.md | §16.1 (Z.1208–1212) beschreibt einen alten Reveal-Ablauf „1. vollständige Linie → 2. kurze Pause → 3. stille Stationenmarker (Fade-in) → 4. KPI-Cards". §16.1a (Z.1276–1277) listet „Screen-3-Timing-Reveal bleibt Pflicht (noch nicht gebaut)" und „Card-to-Point bleibt Pflicht (noch nicht gebaut)" als offene Punkte. Kein `AP-prokrast-08`/`-09`/`-10`-Verweis im gesamten Dokument. | Reveal-Ablauf nennt keine Bridge, keinen „Station X von Y"-Text, keine 800/800ms-Werte. Die zwei „Nachgelagert offen"-Einträge sind beide fachlich überholt (Card-to-Point ist seit AP-08 gebaut, Screen-3-Reveal ist seit AP-10 gebaut — nur eben als Kontinuitäts-Reveal, nicht als „Timing-Reveal"). | Neuen Unterabschnitt analog §16.1a (Rubikon) für den Kontinuitäts-Reveal ergänzen; Z.1208–1212 als historisch markieren oder ersetzen; Z.1276–1277 aktualisieren. |
| drehbuch_prokrastinationspreis_app.md | Screen-3-Abschnitt (Z.92–114) beschreibt wortwörtlich den verworfenen Text→Chart→KPI-Timing-Reveal: „Zuerst erscheint ein einziger Satz — noch kein Chart. Dann faded der vollständige Chart ein. Dann erscheinen die KPI-Karten." Kein „Amtlicher Hinweis"-Block wie ihn Screen 4 seit AP-04a trägt (Z.119, 144, 146, 154, 160). | Direkter inhaltlicher Widerspruch zur AP-10-Wahrheit: Chart/Headline/Subline sind nicht gestuft, sondern von Anfang an da; nur Bridge→KPI ist gestuft. Kein Hinweis auf Bridge-Text oder Kontinuität zu Screen 2. Implementierungs-Notiz Z.198 „KPI-Karten mit Verzögerung (Screen 3) — Erst Linie, dann Zahl" ist ohne Kontext weiterhin grob richtig, aber unvollständig. | Screen-3-Abschnitt analog zum Screen-4-Muster mit „Amtlicher Hinweis"-Block versehen, der auf `APP_SPEC.md` §16.1a/neuer Unterabschnitt verweist; alte Beat-Beschreibung als historische Dramaturgie-Vorlage kennzeichnen, nicht löschen. |
| QA_TEST_CASES.md | Gruppe E (Z.437–536) prüft „vollständiger Chart erst auf Screen 3" (TC-E01), „finale KPI-Cards erst auf Screen 3" (TC-E02), „AssumptionsBox sichtbar" (TC-E03), „finale Stationenmarker … Fade-in oder sofort bei Reduced Motion" (TC-E04), „Marker nicht interaktiv" (TC-E05). Kein Testfall erwähnt Bridge, „Station X von Y", 800ms/800ms-Timing oder den Kontinuitäts-Reveal namentlich. | TC-E01/E02/E03/E05 bleiben im Kern korrekt (Ergebnis stimmt), testen aber nicht die tatsächliche Reveal-Choreografie (Bridge zuerst, dann KPI/Disclaimer per Fade). TC-E04 beschreibt „nach vollständiger Linie erscheinen stille Marker (Fade-in)" — laut app.js-Wahrheit rendern die Journey-Stationsmarker (`buildJourneyStationAnnotations`) zusammen mit dem synchron/still gerenderten Chart (`renderMotion:'instant'`), nicht als eigener verzögerter Fade-in-Schritt. Unklar, ob dieser Mismatch aus AP-10 stammt oder bereits vorher bestand (Marker-Mechanik ist älter, aus B1-AP-14c) — siehe Widerspruchssuche. Kein expliziter Kontinuitäts-Reveal-Testfall vorhanden (von AP-10d bereits als offener Punkt notiert). | Neuen TC (Gruppe E) für Bridge-Text + 800ms-Bridge + 800ms-Fade + Reduced-Motion-Sofortzustand ergänzen (analog TC-F04 für Screen 4); TC-E04-Formulierung gegen reale Marker-Timing-Mechanik prüfen und ggf. präzisieren. |

## Sollabgleich

| Soll aus AP-10 | APP_SPEC | Drehbuch | QA_TEST_CASES | Lücke |
|---|---:|---:|---:|---|
| Screen 3 bleibt Ergebnis-Screen | ✅ | ✅ | ✅ | keine |
| Screen 2 bleibt Journey | ✅ | ✅ | ✅ | keine |
| Wechsel über „Ergebnis ansehen" bleibt | ✅ | (indirekt, Button-Text nicht explizit im Screen-3-Abschnitt zitiert) | ✅ (TC-D-Gruppe, nicht extra gelesen) | gering |
| Kontinuitäts-Reveal statt Neustart | ❌ | ❌ | ❌ | groß — nirgends dokumentiert |
| Chart + Ergebnislinie sofort/still | ❌ (§16.1 beschreibt Fade-in nach Pause) | ❌ (beschreibt Fade nach Verzögerung) | teilweise (TC-E01 testet nur „erscheint erstmals", nicht „sofort/still") | groß |
| Bridge „Station X von Y · Bekannt bis Z" | ❌ | ❌ | ❌ | groß — Begriff taucht in keinem der 3 Dokumente im Screen-3-Kontext auf |
| KPI + Disclaimer nach 800ms Bridge und 800ms Fade | ❌ (keine Zahlen) | teilweise (Z.198: „Verzögerung", keine Werte) | ❌ (keine Zeitwerte in Gruppe E) | groß |
| Reduced Motion: Endzustand sofort, keine Bridge-/Timerphase | ❌ | ❌ | teilweise (TC-E04 erwähnt „sofort bei Reduced Motion" nur für Marker, nicht für Bridge/KPI) | mittel-groß |
| Kein progressEl-Verschieben | n/a (nicht dokumentiert, aber auch nicht falsch behauptet) | n/a | n/a | gering (kein aktiver Widerspruch, nur Nichterwähnung) |
| Keine Engine-/Plugin-Änderung | ✅ (an keiner Stelle behauptet) | ✅ | ✅ | keine |
| Keine Chart.js-Internals in app.js | ✅ | ✅ | ✅ | keine |
| Screen 1/2/4 regressionsfrei bzw. nicht neu geöffnet | ✅ (kein Diff-Hinweis) | ✅ | ✅ | keine |

## Widerspruchssuche

- **alte Timing-Reveal-Formulierung:** `drehbuch_prokrastinationspreis_app.md` Z.98–110 („Zuerst erscheint ein einziger Satz — noch kein Chart. Dann faded der vollständige Chart ein. Dann erscheinen die KPI-Karten.") — aktiver Widerspruch zur AP-10-Wahrheit, kein Historisch-Hinweis vorhanden.
- **Neustart-Formulierung:** keine explizite „Neustart"-Formulierung in den drei Dokumenten gefunden; das Problem ist eher die implizite Fade-in-Choreografie, die wie ein Neuaufbau wirkt.
- **Screen-2-Ergebnismodus:** nirgends behauptet — kein Widerspruch.
- **progressEl-Verschiebung:** nirgends behauptet — kein Widerspruch.
- **Overlay-Linie:** nirgends behauptet — kein Widerspruch.
- **anderer Screen-3-Text:** verbindlicher Screen-3-Text („Jetzt erst sieht es einfach aus." / Subline) ist in `APP_SPEC.md` Z.1283–1292-Bereich (Screen-1-Analogie geprüft) und im Code identisch — keine Abweichung geprüft und bestätigt für Screen 3 selbst (app.js Z.387/392 vs. `APP_SPEC.md` §16.2, wortgleich).
- **sonstige:** `APP_SPEC.md` §16.1a Z.1276–1277 „Nachgelagerte Pflichtteile … noch nicht gebaut" ist für beide dort gelisteten Punkte (Card-to-Point, Screen-3-Timing-Reveal) sachlich überholt — beide sind gebaut (AP-08 bzw. AP-10), nur der zweite eben nicht als „Timing-Reveal", sondern als Kontinuitäts-Reveal. Dies ist kein AP-10-spezifischer, sondern ein doppelter Sync-Fund; die Card-to-Point-Hälfte gehört nicht in den Scope von AP-11b (separates Thema, siehe Empfehlung).

## Entscheidung für AP-11b

- **Sync nötig:** ja
- **empfohlener nächster AP:** AP-prokrast-11b (Write-AP, Full-Gate wegen `docs/steering`/Spec-Charakter der Zieldateien)
- **erlaubte Dateien:** `Apps/prokrastinations-preis/APP_SPEC.md`, `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md`, `Apps/prokrastinations-preis/QA_TEST_CASES.md`
- **verbotene Dateien:** `app.js`, `app.css`, `config/stations.de.json`, Engine/Plugins, `docs/spec/**`, alle in AP-11a genannten Tabu-Bereiche
- **Zielstellen:**
  - `APP_SPEC.md` §16.1 Z.1208–1212 (Reveal-Ablauf) und §16.1a Z.1276–1277 (Nachgelagerte Pflichtteile)
  - `drehbuch_prokrastinationspreis_app.md` Screen-3-Abschnitt Z.92–114 und Implementierungs-Notiz Z.198
  - `QA_TEST_CASES.md` Gruppe E (neuer TC für Bridge/Timing/Reduced-Motion, TC-E04-Präzisierung prüfen)
- **besondere QA-Punkte:** neuer Testfall sollte explizit Bridge-Text-Kontinuität zu Screen 2 (`formatStationProgress()`-Gleichheit), 800ms-Bridge-Haltephase, 800ms-KPI/Disclaimer-Fade und Reduced-Motion-Sofortzustand abdecken — analog zum Aufbau von TC-F04 (Screen 4).
- **Gibt es einen Blocker, der vorher an den Neben-/Masterfaden zurück muss:** nein, kein harter Blocker. Ein Scope-Entscheidungspunkt sollte aber vorab geklärt werden: Soll AP-11b auch die Card-to-Point-Hälfte von `APP_SPEC.md` §16.1a Z.1276 (AP-08) mit korrigieren, weil sie in derselben Zwei-Zeilen-Liste steht wie die Screen-3-Zeile? AP-11a trifft dazu keine Entscheidung (Produktentscheidung/Scope-Frage, gehört nicht in einen reinen Analyse-AP).

## Nicht geändert

- APP_SPEC.md: nur gelesen, keine Schreiboperation
- Drehbuch: nur gelesen, keine Schreiboperation
- QA_TEST_CASES.md: nur gelesen, keine Schreiboperation
- app.js: nur gelesen, keine Schreiboperation
- app.css: nur gelesen, keine Schreiboperation
- Engine: nicht berührt
- Plugins: nicht berührt
- Stationsdaten: nicht berührt
- docs/spec: nicht berührt
- package-/lockfiles: nicht berührt

## Offene Punkte

- **Code:** `app.js` Z.378 trägt weiterhin den Kommentar „Chart ohne VertikaleLinie — TODO Slice 6", obwohl die VertikaleLinie seit `features.verticalLine:'last'` (Z.633) längst Teil des Screen-3-Charts ist. Stale Code-Kommentar, kein Verhalten betroffen, außerhalb des AP-11a-Schreibzugriffs (app.js ist read-only) — als Fund für einen späteren, sehr kleinen Kommentar-Fix registriert, kein eigener AP nötig.
- **UX:** keine offenen UX-Punkte aus dieser Analyse.
- **CSS:** CSS-`var()`-Fallback `400ms` in `app.css:402` weiterhin veraltet gegenüber der 800ms-Variable — bereits von AP-10d als kosmetisch/folgenlos eingestuft, hier nur zur Vollständigkeit erneut vermerkt, kein neuer Fund.
- **Test:** TC-E04-Formulierung („nach vollständiger Linie erscheinen stille Marker … Fade-in") sollte in AP-11b gegen die tatsächliche, synchrone Marker-Renderlogik (`buildJourneyStationAnnotations` als Teil von `renderS3()`, `renderMotion:'instant'`) geprüft und ggf. präzisiert werden. Nicht abschließend geklärt, ob diese Diskrepanz aus AP-10 stammt oder älter ist (Marker-Mechanik stammt aus B1-AP-14c) — daher hier nur als Prüfpunkt, nicht als bestätigter Fehler klassifiziert.
- **Plattform-Doku:** keine neuen Funde in AP-11a.
- **Backlog:** keine neuen Backlog-Einträge aus AP-11a nötig — die Sync-Notwendigkeit selbst ist der Auftrag für AP-11b.
- **AP-09 No-op-Bootstrap / AnchorMeasurement:** unverändert offen, in AP-11a nicht angefasst (außerhalb Scope).
- **chartSettled Plattform-Doku:** unverändert, in AP-11a nicht angefasst (außerhalb Scope).
- **DS-012/DS-013 Theme-Bridge / Font-Neumessung:** unverändert offen, in AP-11a nicht angefasst (außerhalb Scope).

## Empfehlung

- **nächster interner AP:** AP-prokrast-11b (Write-AP für die drei Zieldokumente, Full-Gate)
- **warum:** Alle drei führenden Dokumente widersprechen aktiv oder durch Nichterwähnung dem seit AP-10 gebauten und committeten Kontinuitäts-Reveal-Endstand. Ohne Sync bleibt „Spec schlägt Code" faktisch verletzt (Spec beschreibt einen verworfenen Zwischenstand als Soll), und QA_TEST_CASES.md deckt die tatsächliche Choreografie (Bridge, 800/800ms, Reduced-Motion-Sofortzustand) nicht testbar ab.
- **ausdrücklich nicht nächster AP:** keine Code-/CSS-Änderung, keine neue Textentscheidung, keine Card-to-Point-Nachdokumentation (separates Thema, nur als Scope-Frage an AP-11b/Masterfaden zurückgegeben), keine No-op-Bootstrap- oder Theme-Bridge-Arbeit.
