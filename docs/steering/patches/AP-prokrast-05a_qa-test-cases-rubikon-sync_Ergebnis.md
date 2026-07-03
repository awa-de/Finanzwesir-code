# AP-prokrast-05a — QA_TEST_CASES.md Rubikon-Synchronisierung Ergebnis

## Status

GRÜN

## Kurzbefund

`QA_TEST_CASES.md` (Gruppe F, Screen 4 Transfer) beschrieb noch pauschal „Kein Zukunftschart." — ein aktiver Widerspruch zum in AP-prokrast-03f–03i gebauten und in AP-prokrast-04a bereits in `APP_SPEC.md` korrigierten Rubikon-Chart-Sollstand. Fundstelle war bereits durch AP-prokrast-04b präzise lokalisiert (`QA_TEST_CASES.md:557`, TC-F01). TC-F01 wurde neu gefasst: der Rubikon-Chart selbst ist kein Fehler, verboten sind ausschließlich Zukunftsdaten/Future-Line/Prognose im rechten Zukunftsraum. Zusätzlich wurden zwei neue Testfälle (TC-F03, TC-F04) ergänzt, weil Gruppe F bisher keine Testabdeckung für den DOM-Overlay-Haupttext, das 800ms-Timing und das Reduced-Motion-Verhalten von Screen 4 hatte — diese Aspekte waren nur in `APP_SPEC.md` §16.1a und den AP-03-Protokollen dokumentiert, nicht aber in der QA-Testdatei selbst testbar verankert. Kein App-Code, keine Spec, kein Drehbuch geändert.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0` — bekannte Repo-Namensdiskrepanz zu „Finanzwesir-code", bereits in AP-prokrast-02a/04a/04b als kein Blocker eingestuft (Memory: `project_prokrastinations_preis_drehbuch.md`). Kein neuer Stopp-Grund; Inhalt (prokrastinations-preis, identische Commit-Historie) bestätigt eindeutig das richtige Repo.
- `git status --short` (vor Beginn): nur `.claude/learning/session-log.md` (eigener `/start`-Eintrag)
- `git diff --name-status` (vor Beginn): `M .claude/learning/session-log.md`
- `git log --oneline -3`:
  - `c633f82 docs(AP-prokrast-04a-04c): Soll-/Spec-Synchronisierung nach Rubikon-Entscheidung + Kettenabschluss`
  - `ffacc13 feat(AP-prokrast-03f–03i): Screen 4 Rubikon-Reveal — von Morph-Animation zu stehendem Screen mit DOM-Overlay-Text`
  - `a399b5f feat(AP-prokrast-03a-03e): FwChartTextPlugin.js — Rubikon-Zukunftsraum architektonisch geklärt und isoliertes Canvas-Text-Plugin gebaut`

Keine unerwarteten Fremdänderungen, kein Blocker. AP-prokrast-04a/04b/04c bereits committed (`c633f82`).

## Gelesene Pflichtquellen

- `Apps/prokrastinations-preis/APP_SPEC.md` (§1 Status-Tabelle, §16.1a vollständig, §16.2, §16.3, §16.4 Reduced Motion, T-21, §23.18)
- `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` — nur zur Kontextprüfung gelesen, nicht geändert
- `Apps/prokrastinations-preis/QA_TEST_CASES.md` (vollständig, vor und nach dem Patch)
- `docs/steering/patches/AP-prokrast-04a_soll-spec-synchronisierung_Ergebnis.md` (vollständig)
- `docs/steering/patches/AP-prokrast-04b_abschluss-qa_claims-vs-files_Ergebnis.md` (vollständig)
- `docs/steering/patches/AP-prokrast-04c_ruecklaufkapsel_Ergebnis.md` (vollständig)
- `docs/steering/patches/AP-prokrast-02d_migrationsschnitt_ap-schnitt_ruecklaufkapsel_Ergebnis.md` (gezielt: Steuerfaden-Entscheidungen zu Future-Ticks-Pflicht und 800ms-Stille-bei-Reduced-Motion, da nicht wörtlich in `APP_SPEC.md` stehend)
- `Apps/prokrastinations-preis/app.js` (gezielt: `renderScreen4Chart()`, `revealScreen4()`, `showScreen()` — zur Verifikation der tatsächlichen Timing-/RM-Implementierung, nicht editiert)
- `Apps/prokrastinations-preis/app.css` (gezielt: `.fw-app__rubikon-text`, keine Transition/Fade-Regeln gefunden — nicht editiert)

Kein Subagent-Dispatch — enger, gut abgegrenzter Einzel-AP mit klarer Zielmarke, direktes Lesen war schneller und risikoärmer als Dispatch-Overhead.

## Zielpfad QA_TEST_CASES.md

- Pfad: `Apps/prokrastinations-preis/QA_TEST_CASES.md`
- Mehrfachtreffer: nein (per Glob `**/QA_TEST_CASES.md` eindeutig bestätigt)

## Geänderte Dateien

- **Datei:** `Apps/prokrastinations-preis/QA_TEST_CASES.md`
  - **Änderung:**
    1. TC-F01 komplett neu gefasst: Titel „Screen 4 zeigt keine Prognose im Rubikon-Chart" (statt „Screen 4 enthält keine Prognose"), neuer Hintergrund-Absatz erklärt den Rubikon-Chart-Aufbau, Schritte/Erwartetes-Ergebnis/Fehlschlag-Kriterien auf „Zukunftsraum bleibt leer" statt „kein Chart" umgestellt, Future-Ticks als Pflicht verankert, Dummy-Dataset/`null`-Padding/transparente Zukunftslinie explizit verboten.
    2. TC-F03 neu: DOM-Overlay-Haupttext + Timing (Chart sofort → 800ms Stille → Text/A11y → 800ms Stille → CTA).
    3. TC-F04 neu: Reduced-Motion-Invarianz von Timing/Reihenfolge auf Screen 4 (mit Code-Beleg, dass der Reveal ohnehin bewegungsneutral über `hidden`-Toggle + Timer läuft, keine CSS-Übergänge).
  - **Warum im Scope:** Direkter Auftrag (Punkt 5, 6, 7 des Prompts); TC-F03/F04 schließen eine Lücke, die beim Beheben von TC-F01 sichtbar wurde (Gruppe F deckte DOM-Text/Timing/RM für Screen 4 vorher gar nicht ab, obwohl `APP_SPEC.md` §16.1a diese Punkte als finale Produktentscheidung führt) — „direkt abhängige Rubikon-Testfälle anpassen" deckt dies laut Auftrag ausdrücklich mit ab.
  - **Risiko:** Gering — nur Gruppe F betroffen, keine anderen Gruppen berührt, keine Formatänderung des restlichen Dokuments, Testfall-Format (Typ/Priorität/Schritte/Erwartetes Ergebnis/Fehlschlag) durchgehend eingehalten.
  - **nach Write vollständig wiedergelesen:** ja

- **Datei (neu):** `docs/steering/patches/AP-prokrast-05a_qa-test-cases-rubikon-sync_Ergebnis.md`
  - **Änderung:** dieses Protokoll
  - **Warum im Scope:** Pflichtergebnis laut Auftrag
  - **Risiko:** keins
  - **nach Write vollständig wiedergelesen:** ja (dieses Dokument)

## Nicht geändert

- app.js: unverändert (nur gelesen)
- app.css: unverändert (nur gelesen)
- APP_SPEC.md: unverändert (nur gelesen)
- Drehbuch: unverändert (nur gelesen)
- Stationsdaten: nicht gelesen, nicht geändert
- Engine: unverändert
- Plugins: unverändert
- Strategies: unverändert

Bestätigt durch `git status --short`/`git diff --name-status` nach Abschluss: nur `.claude/learning/session-log.md` (Fremd-/Sessionänderung außerhalb dieses AP-Scopes) und `Apps/prokrastinations-preis/QA_TEST_CASES.md`.

## Rubikon-Sync gegen Sollstand

| Sollstand | In QA_TEST_CASES abgebildet? | Beleg |
|---|---:|---|
| stehender Rubikon-Screen erlaubt | ja | TC-F01 Hintergrund + Erwartetes Ergebnis |
| Chart auf Screen 4 erlaubt/erwartet | ja | TC-F01 Fehlschlag-Kriterium „Rubikon-Chart als solcher wird als Fehler behandelt" |
| leerer Zukunftsraum erlaubt/erwartet | ja | TC-F01 Schritt 3, Erwartetes Ergebnis |
| Future-Ticks/Zeitmarken erlaubt (Pflicht) | ja | TC-F01 Erwartetes Ergebnis + Fehlschlag „Future-Ticks fehlen" |
| keine Zukunftsdaten | ja | TC-F01 Fehlschlag-Kriterien |
| keine Future-Line | ja | TC-F01 „fortgeschriebene Linie" verboten |
| keine Prognosekurve | ja | TC-F01 „Forecast-Korridor, keine Prognosekurve" |
| kein Dummy-Dataset | ja | TC-F01 „kein Dummy-Dataset, kein `null`-Padding" |
| DOM-Haupttext | ja | TC-F03 komplett |
| 800ms Stille → Text/A11y → 800ms Stille → CTA | ja | TC-F03 Schritte 3–4, Erwartetes Ergebnis |
| Reduced-Motion-Pausenbeat bleibt | ja | TC-F04 komplett |

## TC-F01

- **alter Wortlaut (Erwartetes Ergebnis, Zeile 557 vor Patch):**
  ```
  - Kein Zukunftschart.
  - Keine fortgeschriebene Linie.
  - Keine Renditeannahme.
  - Keine simulierten nächsten 10 Jahre.
  - Transfer auf heutige Entscheidung.
  ```
- **neuer Wortlaut (Kurzform, siehe Datei für vollständigen Testfall):**
  ```
  - Rubikon-Chart ist sichtbar, rechter Zukunftsraum enthält keine Linie und keine Datenpunkte.
  - Future-Ticks/Zeitmarken im rechten Zukunftsraum sind vorhanden (Pflicht, keine Prognose).
  - Kein Dummy-Dataset, kein null-Padding als Datentrick, keine transparente Zukunftslinie im Zukunftsraum.
  - Keine Renditeannahme, keine simulierten nächsten 10 Jahre, kein Forecast-Korridor, keine Prognosekurve.
  - Transfer auf heutige Entscheidung.
  ```
- **Begründung:** „Kein Zukunftschart." war als pauschales Chart-Verbot formuliert und stand damit im direkten Widerspruch zum seit AP-prokrast-03f–03i gebauten und von Albert im Browser bestätigten Rubikon-Chart (Vergangenheit + leerer Zukunftsraum). Die neue Fassung verbietet weiterhin exakt das, was fachlich verboten bleiben muss (Zukunftsdaten, Future-Line, Prognose, Dummy-Daten), erlaubt aber ausdrücklich den Chart selbst und die laut Steuerfaden-Entscheidung (AP-prokrast-02d) verpflichtenden Future-Ticks.

## Nach-Write-QA

- `QA_TEST_CASES.md` vollständig erneut gelesen: ja
- alte pauschale Formulierung `Kein Zukunftschart` aktiv entfernt/entschärft: ja (0 Treffer per Grep nach dem Patch)
- keine verbotenen Dateien geändert: ja (`git status --short`/`git diff --name-status` zeigen nur `QA_TEST_CASES.md` + `session-log.md`)
- Rubikon-Sollstand korrekt abgebildet: ja (gegen `APP_SPEC.md` §16.1a und den tatsächlichen `app.js`/`app.css`-Code verifiziert, nicht nur gegen die Spec-Behauptung)

## Manuelle Browser-Verifikation (durch Albert, im Anschluss an AP-05a)

Albert hat die drei geänderten/neuen Testfälle (TC-F01, TC-F03, TC-F04) im Anschluss an diesen AP zusätzlich manuell in `app.test.html` (Live Server) gegen das reale Laufzeitverhalten geprüft — nicht als Pflichtteil von AP-prokrast-05a selbst (reiner Doku-AP), sondern als freiwillige Zusatzabsicherung der neuen Testfälle. Ergebnis dokumentiert hier, weil es die inhaltliche Richtigkeit der QA-Sync-Änderung zusätzlich belegt.

**Erster Versuch (naives Skript, `.textContent` auf `.fw-app__rubikon-text`):** lieferte scheinbar zusammenhangslosen Text — Ursache erkannt und korrigiert: `rubikonText` enthält laut `app.js:428–466` zwei Kind-Varianten (`--long` für Desktop, `--short` für Mobile), CSS-Breakpoint blendet je eine aus (`display:none`); `.textContent` ignoriert das und liest beide Varianten zusammen. Kein Bug in der App, nur ein zu einfaches Prüfskript.

**Korrigiertes Skript (prüft `getComputedStyle(...).display` pro Variante):**

- **Screen L (Desktop-Breite):** `hidden`-Attribut `false` (Text war zum Prüfzeitpunkt bereits sichtbar), `long`-Variante sichtbar mit vollständigem 4-Absatz-Text + Fußnote „Keine Vorhersage. Nur Markterfahrung.", `short`-Variante ausgeblendet.
- **Screen S (Mobile-Breite):** `hidden`-Attribut `false`, `short`-Variante sichtbar mit dem kompakten 2-Absatz-Text, `long`-Variante ausgeblendet.
- Bei beiden Viewports war exakt eine Variante sichtbar, nie beide gleichzeitig, nie keine — Breakpoint-Umschaltung funktioniert wie in `app.js`/`app.css` beschrieben.
- Beide Varianten sind reale `<div>`-DOM-Elemente (`el.tagName === 'DIV'`), außerhalb des Chart-Canvas (`closest('.fw-app__rubikon-chart-wrap')` true, `closest('canvas')` false) — TC-F03-DOM-Kriterium damit direkt am Browser bestätigt.
- **Timing:** von Albert separat geprüft (Chart sofort sichtbar → ca. 800ms Stille → Text erscheint → ca. 800ms Stille → CTA erscheint) — von Albert als korrekt bestätigt („Timing stimmt").

**Befund:** TC-F01 (Chart-Aufbau/Future-Ticks — bereits in AP-prokrast-03i im Browser bestätigt), TC-F03 (DOM statt Canvas, Timing) und TC-F04 (Timing unverändert, hier nicht gesondert unter Reduced Motion wiederholt, aber Grundverhalten bereits als bewegungsneutral am Code verifiziert) sind damit nicht nur gegen `APP_SPEC.md` §16.1a und den Code, sondern zusätzlich gegen das reale Browser-Verhalten geprüft. Kein Widerspruch, keine Abweichung gefunden. Diese Zusatzverifikation ersetzt nicht die für AP-prokrast-05b vorgesehene unabhängige Claims-vs-Files-QA, entkräftet aber keinen der dortigen Prüfpunkte.

## Offene Punkte

- **✅/❓-Symbolik:** weiterhin ungeklärte Produktentscheidung (Drehbuch Beat 2) — nicht Teil dieses APs, unverändert offen (BACKLOG AP-26).
- **Card-to-Point:** weiterhin nicht gebaut, nicht spezifiziert — nicht Teil dieses APs.
- **Screen-3 Timing:** Screen-3-Timing-Reveal weiterhin nicht gebaut — nicht Teil dieses APs.
- **sonstige:** keine neuen offenen Punkte durch diesen AP. Gruppe F ist jetzt vollständig mit dem in `APP_SPEC.md` §16.1a dokumentierten Sollstand synchron; sollte sich die ✅/❓-Symbolik (AP-26) später konkretisieren, braucht Gruppe F ggf. einen weiteren, eigenen Testfall dafür — das ist aber Folgearbeit, kein aktueller Mangel.

## Empfehlung

- **nächster interner AP:** AP-prokrast-05b — Abschluss-QA Claims-vs-Files
- **ausdrücklich nicht:** Commit, Abschlussritual, App-Code, APP_SPEC-/Drehbuch-Patch, Card-to-Point, Screen-3-Umsetzung
