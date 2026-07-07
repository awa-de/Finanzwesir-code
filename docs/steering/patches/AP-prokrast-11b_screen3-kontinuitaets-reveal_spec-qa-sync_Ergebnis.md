# AP-prokrast-11b — Screen-3 Kontinuitäts-Reveal Spec-/QA-Sync Ergebnis

## Status

GRÜN

## Kurzbefund

Alle drei führenden Dokumente (`APP_SPEC.md`, `drehbuch_prokrastinationspreis_app.md`, `QA_TEST_CASES.md`) sind jetzt mit dem gebauten und abgenommenen Kontinuitäts-Reveal-Endstand (AP-prokrast-10a–10d) synchronisiert. Der alte Text→Chart→KPI-Timing-Reveal-Planstand sowie die beiden veralteten „noch nicht gebaut"-Zeilen zu Card-to-Point (AP-08) und Screen-3-Timing-Reveal (AP-10) wurden gemäß der vorgegebenen HISTORISCHER_STAND/AKTUELLER_SOLLSTAND-Rahmung entschärft, ohne die alten Formulierungen zu löschen. `QA_TEST_CASES.md` deckt die Bridge-Choreografie (800ms/800ms, Reduced Motion) jetzt mit zwei neuen Testfällen (TC-E06, TC-E07) testbar ab; TC-E01/TC-E02 wurden ergänzt, TC-E04 wurde gegen die reale Marker-Renderlogik präzisiert. Beide Planabweichungen (Card-to-Point, Screen-3-Reveal) sind durchgängig als gewünscht/abgenommen formuliert, nicht als Mangel oder offene Aufgabe.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short` (vor Write): ` M .claude/learning/session-log.md`, `?? docs/steering/patches/AP-prokrast-11a_screen3-kontinuitaets-reveal_sync-analyse_Ergebnis.md` — keine unerwarteten Änderungen an App-/Engine-/Plugin-/Spec-/QA-Dateien, Stop-Regel nicht ausgelöst.
- `git diff --name-status` (vor Write): identisch zur obigen Liste.
- `git log --oneline -15`: `1033c9e feat(AP-prokrast-10a-10d): Screen-3 Kontinuitäts-Reveal — Kettenabschluss` ist committed (HEAD), gefolgt von `706b1fd` (AP-09), `18c87fb` (AP-08a-08c), `ca45c94` (AP-07a-07d) usw. — AP-10 bestätigt committed, AP-08 bestätigt committed.

## Grundlage aus AP-11a

- **Sync-Entscheidung:** Sync nötig, kein Blocker (Status GELB, AP-prokrast-11a_screen3-kontinuitaets-reveal_sync-analyse_Ergebnis.md).
- **Zielstellen:** `APP_SPEC.md` §16.1 (Reveal-Ablauf) + §16.1a (Nachgelagerte Pflichtteile); Drehbuch Screen-3-Abschnitt + Implementierungs-Notiz; `QA_TEST_CASES.md` Gruppe E (TC-E04 präzisieren, neuer Testfall für Bridge/Timing/Reduced Motion).
- **warum kein Code:** AP-11 ist ausschließlich ein Doku-Sync-AP; app.js/app.css/Engine/Plugins sind laut Auftrag und Verbotsliste read-only.
- **warum keine neue Produktentscheidung:** Beide Endstände (Card-to-Point, Kontinuitäts-Reveal) sind bereits durch AP-08 bzw. AP-10 entschieden und abgenommen — AP-11b dokumentiert nur nach, entscheidet nicht neu.
- **Nutzerentscheidung zu Planabweichungen:** Explizit im AP-11b-Auftrag vorgegeben — beide Abweichungen vom ursprünglichen Plan sind gewünscht und abgenommen, dürfen nicht als Mangel/Workaround/offene Aufgabe formuliert werden.

## Geänderte Dateien

- **Datei:** `Apps/prokrastinations-preis/APP_SPEC.md`
  - **Änderung:** §16.1 „Reveal-Ablauf Screen 3" (alter 4-Schritt-Marker-Ablauf) als HISTORISCHER_STAND gerahmt, verweist auf neues §16.1b. §16.1a „Nachgelagerte Pflichtteile" (Card-to-Point + Screen-3-Timing-Reveal „noch nicht gebaut") als HISTORISCHER_STAND gerahmt, gefolgt von AKTUELLER_SOLLSTAND-Block mit AP-08-/AP-10-Verweis. Neuer Abschnitt §16.1b „Screen 3 — Kontinuitäts-Reveal" (analog zu §16.1a-Struktur für Screen 4) dokumentiert Variante B++ vollständig (Chart/Linie sofort, Bridge, 800ms/800ms, Reduced Motion, Ausschlussliste).
  - **Warum im Scope:** exakt die zwei von AP-11a benannten Zielstellen.
  - **Historische Altstände erhalten:** ja (beide Blöcke, Wortlaut unverändert innerhalb der HISTORISCHER_STAND-Rahmung).
  - **LLM-lesbare Rahmung gesetzt:** ja (volle Pflicht-Struktur laut AP-11b-Vorlage, zwei HISTORISCHER_STAND- + ein AKTUELLER_SOLLSTAND-Block).
  - **Aktiver Sollstand eindeutig:** ja (§16.1b + AKTUELLER_SOLLSTAND-Block in §16.1a).
  - **Risiko:** gering — reine Textänderung, keine Tabelle/kein Code-Sample verändert.
  - **nach Write wiedergelesen:** ja (vollständig, s. Forensik-QA und Deterministische Checks unten).

- **Datei:** `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md`
  - **Änderung:** Screen-3-Abschnitt erhält (analog zum bestehenden Screen-4-Muster) einen „Amtlicher Hinweis"-Block, danach HISTORISCHER_STAND-Rahmung um den originalen Text→Chart→KPI-Einstieg, danach AKTUELLER_SOLLSTAND-Block mit der Kontinuitäts-Reveal-Dramaturgie (Bridge-Zeile, 800ms/800ms, Reduced Motion, unveränderter verbindlicher Screen-3-Text). Implementierungs-Notiz „KPI-Karten mit Verzögerung (Screen 3)" auf „gebaut" aktualisiert, alte „Erst Linie, dann Zahl"-Notiz als überholt markiert und durch aktuelle Choreografie ersetzt.
  - **Warum im Scope:** exakt die zwei von AP-11a benannten Zielstellen.
  - **Historische Altstände erhalten:** ja (Originaltext des Einstiegs wortgleich stehen gelassen).
  - **LLM-lesbare Rahmung gesetzt:** ja.
  - **Aktiver Sollstand eindeutig:** ja.
  - **Risiko:** gering — keine neue Textentscheidung, verbindlicher Screen-3-Text unverändert zitiert.
  - **nach Write wiedergelesen:** ja.

- **Datei:** `Apps/prokrastinations-preis/QA_TEST_CASES.md`
  - **Änderung:** TC-E01 und TC-E02 um je einen Erwartetes-Ergebnis-Punkt zum sofortigen/stillen Chart-Reveal bzw. zur Bridge-Phase vor den KPI-Cards ergänzt (Querverweis auf TC-E06/TC-E07). TC-E04 präzisiert: „nach vollständiger Linie … Fade-in" ersetzt durch „zusammen mit dem Chart, sofort und still", mit Hinweis-Absatz zur Herkunft der alten Formulierung. Zwei neue Testfälle TC-E06 (Bridge/Timing) und TC-E07 (Reduced Motion) ergänzt, analog zu TC-F04 (Screen 4). Gruppenübersicht (Zeile „E — Screen 3 Reveal") und Schluss-Changelog-Zeile aktualisiert.
  - **Warum im Scope:** exakt die von AP-11a benannten QA-Lücken (fehlender Kontinuitäts-Reveal-Testfall, TC-E04-Mismatch).
  - **Historische Altstände erhalten:** ja — TC-E04 behält die Kernaussage (Marker nur auf Screen 3, keine Screen-2-Sichtbarkeit) und dokumentiert die Korrektur transparent im Hinweis-Absatz statt sie stillschweigend zu überschreiben.
  - **LLM-lesbare Rahmung gesetzt:** teilweise — TC-E04 nutzt einen kompakten `**Hinweis (AP-prokrast-11b, …)**`-Absatz statt der vollen HISTORISCHER_STAND/AKTUELLER_SOLLSTAND-Blockstruktur, weil es sich um eine punktuelle Formulierungskorrektur innerhalb eines weiterhin gültigen Testfalls handelt, nicht um einen kompletten Planwechsel (s. „Ausdrücklich präzisieren, nicht neu rahmen" in der Vorgabe für TC-E04). TC-E06/TC-E07 sind neue, direkt aktive Testfälle ohne Altstand, brauchen keine Rahmung.
  - **Aktiver Sollstand eindeutig:** ja.
  - **Risiko:** gering-mittel — TC-E04-Präzisierung stützt sich auf Code-Lesung (`renderS3()`/`renderMotion:'instant'`), ist aber selbst nicht browsergetestet (s. Risiken).
  - **nach Write wiedergelesen:** ja.

## Nicht geändert

- **app.js:** read-only gelesen (Fundstellen zu `renderS3()`, `revealScreen3()`, `formatStationProgress()`), keine Schreiboperation.
- **app.css:** read-only gelesen (`--fw-screen3-reveal-fade-duration`, `.fw-app__screen3-reveal--visible`), keine Schreiboperation.
- **Engine:** nicht angefasst, kein Diff.
- **Plugins:** nicht angefasst, kein Diff.
- **Stationsdaten:** `stations.de.json` nicht angefasst, kein Diff.
- **docs/spec:** nicht angefasst, kein Diff.
- **package-/lockfiles:** nicht angefasst, kein Diff.
- **AP-07:** nicht wieder geöffnet, keine RubikonSymbolMarkers-Nacharbeit.
- **AP-08:** keine Neuspezifikation geschrieben — nur die zwei betroffenen Statuszeilen in den drei Zieldokumenten entschärft, kein neuer AnchorMeasurement-/ChartEngine-Contract-Text.
- **AP-09:** No-op-Bootstrap/AnchorMeasurement-Plattformdoku und chartSettled-Creation-Pfad-Lücke unverändert offen, nicht angefasst.
- **Screen 2:** kein Umbau, `progressEl` in allen drei Dokumenten weiterhin explizit als unverändert auf Screen 2 beschrieben.
- **Screen 4:** kein Eingriff — bestehender „Amtlicher Hinweis"/§16.1a-Block für Screen 4 unverändert, nur als Vorbild für die Screen-3-Rahmung genutzt.

## AP-08 / Card-to-Point Sync

- **alter Planstand:** „Card-to-Point bleibt Pflicht (noch nicht gebaut)" (`APP_SPEC.md` §16.1a, Stand AP-prokrast-03f–03i, 2026-07-02).
- **heutiger Endstand:** seit AP-prokrast-08a–08c ✅ (2026-07-06) gebaut und abgenommen, umgesetzt über `AnchorMeasurement`-/`ChartEngine`-Contract (`FwAnchorMeasurementPlugin.js`, `chartSettled`, `renderMotion`, Flight-Clone-Logik), kein direkter Chart.js-Internals-Zugriff aus `app.js`.
- **Planabweichung als gewünscht/abgenommen formuliert:** ja — AKTUELLER_SOLLSTAND-Block in `APP_SPEC.md` §16.1a formuliert explizit „beide anders umgesetzt als ursprünglich naheliegend geplant, beide Abweichungen sind gewünscht und abgenommen".
- **keine neue AP-08-Arbeit erzeugt:** ja — nur die eine Statuszeile korrigiert, keine neue AnchorMeasurement-/ChartEngine-Spezifikation, kein Screen-2-Text.

## AP-10 / Screen-3 Sync

- **alter Planstand:** zwei Vorstufen — (1) `APP_SPEC.md` §16.1 „Reveal-Ablauf Screen 3" (marker-fade-basierter 4-Schritt-Plan, nie gebaut) und (2) der tatsächlich kurzzeitig gebaute, dann verworfene Text→Chart→KPI-Timing-Reveal (AP-prokrast-10b, erster Durchgang).
- **heutiger Endstand:** Variante B++ — Kontinuitäts-Reveal, vollständig in neuem §16.1b, im Drehbuch-AKTUELLER_SOLLSTAND-Block und in QA_TEST_CASES TC-E06/TC-E07 dokumentiert.
- **Planabweichung als gewünscht/abgenommen formuliert:** ja — durchgängig als „finale Produktentscheidung"/„abgenommen" formuliert, nirgends als Mangel oder offener Punkt.
- **keine neue AP-10-Codearbeit erzeugt:** ja — reine Dokumentation des bereits gebauten und committeten Standes (`1033c9e`), kein neuer Timing-/CSS-Vorschlag.

## Forensik-QA

| Dokument | Historischer Stand erhalten? | Als HISTORISCH / INAKTIV gerahmt? | Aktiver Sollstand getrennt? | LLM-Missverständnis-Risiko |
|---|---:|---:|---:|---|
| APP_SPEC.md | ja | ja (2× vollständiger HISTORISCHER_STAND-Block) | ja (§16.1b + AKTUELLER_SOLLSTAND-Block) | gering |
| Drehbuch | ja | ja (Amtlicher Hinweis + HISTORISCHER_STAND-Block) | ja (AKTUELLER_SOLLSTAND-Block) | gering |
| QA_TEST_CASES.md | ja (TC-E04-Kernaussage bleibt, nur präzisiert) | teilweise (kompakter Hinweis-Absatz statt volle Blockstruktur, s. Begründung oben) | ja (TC-E06/TC-E07 sind eindeutig aktiv, keine Altstand-Vermischung) | gering |

## Screen-3-Sync gegen Pflichtumfang

| Pflicht | Erfüllt? | Beleg |
|---|---:|---|
| APP_SPEC synchron | ja | §16.1b + AKTUELLER_SOLLSTAND-Block §16.1a |
| Drehbuch synchron | ja | Screen-3-Abschnitt, AKTUELLER_SOLLSTAND-Block |
| QA_TEST_CASES synchron | ja | TC-E01/E02/E04 ergänzt/präzisiert, TC-E06/E07 neu |
| Variante B++ korrekt als aktiver Sollstand dokumentiert | ja | alle drei Dokumente, identischer Ablauf (Chart/Linie sofort → Bridge 800ms → KPI/Disclaimer 800ms-Fade) |
| alter Text→Chart→KPI-Plan historisch/inaktiv | ja | APP_SPEC §16.1/§16.1a HISTORISCHER_STAND, Drehbuch HISTORISCHER_STAND |
| Screen 3 bleibt Ergebnis-Screen | ja | APP_SPEC §16.1b Z.1, Drehbuch AKTUELLER_SOLLSTAND |
| Screen 2 bleibt Journey | ja | APP_SPEC §16.1b, Drehbuch, QA TC-E06 |
| Wechsel über „Ergebnis ansehen" bleibt | ja | APP_SPEC §16.1b, Drehbuch, QA TC-E06 Schritt 2 |
| Chart + Ergebnislinie sofort/still | ja | APP_SPEC §16.1b Punkt 1, Drehbuch, QA TC-E01/TC-E06 |
| Bridge-Zeile korrekt | ja | „Station X von Y · Bekannt bis Z", `formatStationProgress()` in allen drei Dokumenten |
| KPI + Disclaimer nach Bridge | ja | APP_SPEC §16.1b Punkt 4, Drehbuch, QA TC-E02/TC-E06 |
| 800ms Bridge / 800ms Fade | ja | APP_SPEC §16.1b Punkt 3+4, Drehbuch, QA TC-E06 |
| Reduced Motion korrekt | ja | APP_SPEC §16.1b, Drehbuch, QA TC-E07 |
| kein progressEl-Verschieben | ja | APP_SPEC §16.1b Ausschlussliste, QA TC-E06 Fehlschlagkriterium |
| keine Engine-/Plugin-Arbeit behauptet | ja | APP_SPEC §16.1b Ausschlussliste explizit |

## QA_TEST_CASES

- **neuer/geänderter Testfall:** TC-E06 (Bridge-Zeile + Timing), TC-E07 (Reduced Motion); TC-E01/TC-E02 ergänzt; TC-E04 präzisiert.
- **Anforderungen:** Bridge-Text-Identität mit letzter Screen-2-Zeile, 800ms-Bridge-Haltephase, 800ms-KPI/Disclaimer-Fade, kein `progressEl`-Verschieben, kein Screen-2-Ergebnismodus.
- **Fehlschlagkriterien:** Rückfall auf Text→Chart→KPI-Timing-Reveal, fehlende/abweichende Bridge-Zeile, gleichzeitiges Erscheinen von Chart und KPI (keine Bridge-Phase), sichtbare/timer-gesteuerte Bridge unter Reduced Motion.
- **Reduced-Motion-Prüfung:** TC-E07 dediziert, mit Querverweis auf TC-H05 (kein A11y-Endwissens-Leak).
- **Regressionsprüfungen:** TC-E06 prüft explizit, dass Screen 2/`progressEl` unverändert bleiben; TC-E01/E02/E04 behalten ihre ursprünglichen Screen-2-Negativ-Kriterien bei.
- **historischer QA-Stand aktiv/inaktiv:** kein separater historischer QA-Block nötig — die alten Testfälle (TC-E01/E02/E03/E05) waren im Kern bereits korrekt und wurden nur ergänzt, nicht ersetzt; TC-E04 wurde direkt präzisiert (kompakte Korrektur statt Vollrahmung, s. Begründung oben).

## Deterministische Checks

- **Grep AP-10-Schlüsselbegriffe** (`Kontinuitäts-Reveal`, `Station X von Y`, `Bekannt bis`, `800ms`, `Reduced Motion`, `AP-prokrast-10`): Treffer in allen drei Zieldokumenten (APP_SPEC.md: 28 Gesamttreffer über alle Positiv-Suchbegriffe, Drehbuch: 15, QA_TEST_CASES.md: 44 — Sammelzahl über alle Positiv-Suchbegriffe zusammen).
- **Grep AP-08-Schlüsselbegriffe** (`Card-to-Point`, `AnchorMeasurement`, `AP-prokrast-08`): Treffer im AKTUELLER_SOLLSTAND-Block von `APP_SPEC.md` §16.1a vorhanden.
- **Grep historische Rahmung** (`HISTORISCHER_STAND`, `AKTUELLER_SOLLSTAND`): je 2× in APP_SPEC.md, je 1× in Drehbuch — beide Blocktypen vorhanden, keine Datei ohne Gegenstück.
- **Grep alte widersprüchliche Begriffe** (`noch nicht gebaut`, `Timing-Reveal`, `Text→Chart→KPI`, `bleibt Pflicht`, `Screen-2-Ergebnismodus`, `progressEl verschieben`, `Overlay-Linie`): alle verbleibenden Treffer liegen innerhalb von HISTORISCHER_STAND-Blöcken, forensischen Rückblicken oder expliziten Negativ-/Ausschlusslisten (s. Auflistung unten) — kein Treffer wirkt als aktiver Sollstand.
- **Bewertung der Altlasten-Treffer:**
  - `APP_SPEC.md:1223` „nie in dieser Form gebaut … Text→Chart→KPI-Timing-Reveal" — innerhalb HISTORISCHER_STAND, ok.
  - `APP_SPEC.md:1298–1299` „Card-to-Point/Screen-3-Timing-Reveal bleibt Pflicht (noch nicht gebaut)" — innerhalb HISTORISCHER_STAND, ok.
  - `APP_SPEC.md:1317` „nicht als ursprünglich geplanter Timing-Reveal" — innerhalb AKTUELLER_SOLLSTAND, referenziert historischen Stand korrekt, ok.
  - `APP_SPEC.md:1325` „zunächst als Text→Chart→KPI-Timing-Reveal umgesetzt" — innerhalb §16.1b, referenziert historischen Stand als Kontext für den aktiven Sollstand, ok.
  - `APP_SPEC.md:1339/1341` „kein Screen-2-Ergebnismodus" / „keine CSS-Overlay-Linie" — Teil der aktiven Ausschlussliste (was nicht gebaut wurde), keine Altlast, ok.
  - `Drehbuch:105/109/126` — innerhalb `### Einstieg (historisch — …)`-Block bzw. dessen Abschlusssatz, ok.
  - `Drehbuch:238` — Implementierungs-Notiz, alte Formulierung explizit als „überholt" markiert, ok.
  - `QA_TEST_CASES.md:568` „kein Screen-2-Ergebnismodus" — Teil eines aktiven Fehlschlagkriteriums in TC-E06 (Negativ-Regel), keine Altlast, ok.
  - `QA_TEST_CASES.md:571` „Rückfall auf den verworfenen Text→Chart→KPI-Timing-Reveal" — aktives Fehlschlagkriterium (Regression-Grenze), keine Altlast, ok.
- **Diff verbotene Dateien:** `git diff --name-status` nach Write zeigt ausschließlich `.claude/learning/session-log.md` (bekannte `/start`-Geräuschkulisse) plus die drei erlaubten Zieldokumente. Keine Treffer in `app.js`, `app.css`, `stations.de.json`, `Theme/**`, `docs/spec/**`, Lockfiles.
- **Markdown-Strukturprüfung:** alle neuen Abschnitte per Wiederlesen (Read-Tool) geprüft — Überschriftenhierarchie konsistent (`###`-Ebene durchgehend für HISTORISCHER_STAND/AKTUELLER_SOLLSTAND-Blöcke, `##`/`###`-Nummerierung in APP_SPEC.md fortlaufend: 16.1 → 16.1a → 16.1b → 16.2), keine offenen Codeblöcke, keine gebrochenen Tabellen.

## Risiken

- gering — reine Dokumentänderung, kein Code-/Engine-/Plugin-Diff, Scope-Diff bestätigt exakt die vier erwarteten Dateien.
- TC-E04-Präzisierung stützt sich auf Code-Lesung (`app.js` `renderS3()`, `renderMotion:{mode:'instant'}`, `buildJourneyStationAnnotations`), nicht auf einen eigenen Browser-Test dieses AP — das reale visuelle Timing der Stationenmarker relativ zum Chart-Aufbau wurde nicht browserseitig neu verifiziert (kein Browser-Werkzeug in dieser Session, ohnehin außerhalb des AP-11b-Auftrags). Eingestuft als geringes Risiko, da die Kernaussage (nicht-interaktiv, nur auf Screen 3, kein separater Fade-in-Schritt laut Code) durch Datei-Lesung belastbar ist.
- TC-E06/TC-E07 sind neu formuliert und noch nicht browserseitig gegen die reale App durchlaufen (kein Browser-Test in AP-11b behauptet oder durchgeführt).

## Offene Punkte

- **Code:** `app.js` Z.378-Kommentar „Chart ohne VertikaleLinie — TODO Slice 6" bleibt veraltet (aus AP-11a bekannt, weiterhin außerhalb des Schreibzugriffs dieses APs).
- **UX:** keine neuen Funde.
- **CSS:** `app.css:402` CSS-`var()`-Fallback zeigt weiterhin `400ms` statt `800ms` (aus AP-10d/AP-11a bekannt, kosmetisch/folgenlos, außerhalb des Schreibzugriffs).
- **Test:** TC-E06/TC-E07 sollten in einem regulären manuellen Testlauf (S/M/L, Reduced Motion) durchlaufen werden — bisher nur redaktionell erstellt, nicht browserseitig verifiziert.
- **Plattform-Doku:** keine neuen Funde.
- **Backlog:** keine neuen Backlog-Einträge aus AP-11b nötig.
- **AP-09 No-op-Bootstrap / AnchorMeasurement:** unverändert offen, in AP-11b nicht angefasst.
- **chartSettled Plattform-Doku:** unverändert offen, in AP-11b nicht angefasst.
- **DS-012/DS-013 Theme-Bridge / Font-Neumessung:** unverändert offen, in AP-11b nicht angefasst.

## Empfehlung

- **nächster interner AP:** AP-prokrast-11c — read-only Abschluss-QA Claims-vs-Files / Spec-vs-Code
- **warum:** AP-11b hat geschrieben und selbst wiedergelesen, aber noch keine unabhängige, gegen die realen Dateien geprüfte Abschluss-QA durchlaufen (Prinzip „Protokolle sind Hinweise, Dateien sind Wahrheit", analog AP-08c/AP-10c). Insbesondere die Forensik-Rahmung (keine Vermischung historisch/aktiv) und der Scope-Diff sollten unabhängig gegengeprüft werden, bevor der Sync als endgültig abgeschlossen gilt.
- **ausdrücklich nicht nächster AP:** kein Code-/CSS-Fix, keine neue Browser-QA-Behauptung, keine No-op-Bootstrap- oder Theme-Bridge-Arbeit, keine weitere Card-to-Point- oder AP-09-Nacharbeit.
