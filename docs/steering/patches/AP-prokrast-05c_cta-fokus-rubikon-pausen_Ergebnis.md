# AP-prokrast-05c — CTA-Fokus während Rubikon-Pausen Ergebnis

## Status

GRÜN

## Kurzbefund

AP-prokrast-05b hatte eine reale, nicht-blockierende Testabdeckungslücke gefunden: `QA_TEST_CASES.md` testete nirgends explizit, dass die CTA auf Screen 4 während der beiden 800ms-Pausen (vor Rubikon-Text, vor CTA-Reveal) nicht sichtbar, nicht per Tab erreichbar, nicht `document.activeElement`-fähig und nicht im Accessibility Tree erreichbar sein darf — obwohl das laut `docs/steering/patches/AP-prokrast-02d_..._Ergebnis.md` Zeile 198 bereits als Steuerfaden-Entscheidung dokumentiert ist. Dieser AP hat TC-F03 um drei neue Prüfschritte, eine neue Erwartetes-Ergebnis-Zeile und zwei neue Fehlschlag-Kriterien ergänzt, sowie TC-F04 minimal um eine Reduced-Motion-Erbschafts-Klausel für dieselbe Anforderung erweitert. Kein App-Code, keine Spec, kein Drehbuch geändert; kein TC-F01 angefasst; keine neue Produktentscheidung.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0` — bekannte Repo-Namensdiskrepanz, bereits in AP-02a/04a/04b/05a/05b als kein Blocker eingestuft.
- `git status --short` (vor Beginn):
  - `M .claude/learning/session-log.md`
  - `M Apps/prokrastinations-preis/QA_TEST_CASES.md`
  - `?? docs/steering/patches/AP-prokrast-05a_qa-test-cases-rubikon-sync_Ergebnis.md`
  - `?? docs/steering/patches/AP-prokrast-05b_abschluss-qa_claims-vs-files_Ergebnis.md`
- `git diff --name-status` (vor Beginn): `M .claude/learning/session-log.md`, `M Apps/prokrastinations-preis/QA_TEST_CASES.md` — identisch zum bereits durch AP-05a erzeugten Diff.
- `git log --oneline -3`:
  - `c633f82 docs(AP-prokrast-04a-04c): Soll-/Spec-Synchronisierung nach Rubikon-Entscheidung + Kettenabschluss`
  - `ffacc13 feat(AP-prokrast-03f–03i): Screen 4 Rubikon-Reveal — von Morph-Animation zu stehendem Screen mit DOM-Overlay-Text`
  - `a399b5f feat(AP-prokrast-03a-03e): FwChartTextPlugin.js — Rubikon-Zukunftsraum architektonisch geklärt und isoliertes Canvas-Text-Plugin gebaut`
- `find . -name 'QA_TEST_CASES.md' -print`: genau ein Treffer — `./Apps/prokrastinations-preis/QA_TEST_CASES.md`
- `find docs/steering/patches -name 'AP-prokrast-05b_abschluss-qa_claims-vs-files_Ergebnis.md' -print`: gefunden, lesbar

Kein Stopp-Grund. Repo plausibel, `QA_TEST_CASES.md` eindeutig, AP-05a- und AP-05b-Protokolle vorhanden und nennen den CTA-Fokus-Fund korrekt.

## Werkzeugwahl

- Shell/Grep genutzt für: Vorprüfung (`pwd`, `git rev-parse`, `git status`, `git diff --name-status`, `git log`, `find`), gezielte Extraktion von TC-F03/TC-F04 vor dem Patch, Marker-Zählung nach dem Patch (`fokussierbar`, `Tab`, `Screenreader`, `document.activeElement`, `Accessibility`, `A11y`, `hidden`, `800ms`, `CTA` — 72 Treffer gesamt in der Datei nach dem Patch), finaler Scope-Diff.
- Haiku genutzt: nein
  - warum nicht: TC-F03/TC-F04 sind zwei klar abgegrenzte, überschaubare Testfälle (je unter 30 Zeilen); direktes Lesen und chirurgisches Edit war schneller und risikoärmer als Dispatch-Overhead — konsistent mit der Begründung aus AP-05a/AP-05b.
- Sonnet/Hauptmodell-Entscheidung: Patch-Formulierung, Scope-Bewertung, Statusentscheidung (GRÜN) und die Einordnung „DOM-/Fokus-Mini-QA, kein Screenreader-Volltest" wurden ausschließlich vom Hauptmodell nach direkter Dateiprüfung getroffen.

## Gelesene Quellen

- `docs/steering/patches/AP-prokrast-05b_abschluss-qa_claims-vs-files_Ergebnis.md` (vollständig — bereits aus vorherigem AP im Kontext, zusätzlich für diesen AP erneut als Pflichtquelle behandelt)
- `docs/steering/patches/AP-prokrast-05a_qa-test-cases-rubikon-sync_Ergebnis.md` (vollständig)
- `Apps/prokrastinations-preis/QA_TEST_CASES.md` (Gruppe F vollständig, vor und nach dem Patch)
- `docs/steering/patches/AP-prokrast-02d_migrationsschnitt_ap-schnitt_ruecklaufkapsel_Ergebnis.md` (gezielt: Zeile 198 „800ms-Stille und A11y: Button darf während der Stille nicht im Tab-/Screenreader-Fokus erreichbar sein" — Quelle der Anforderung)
- `Apps/prokrastinations-preis/app.js` (gezielt: `revealScreen4()` Zeile 567–587, `cta.setAttribute('hidden', '')` Zeile 473, `cta.removeAttribute('hidden')` Zeile 583 — zur Plausibilisierung, dass die technische Umsetzung über das native HTML-`hidden`-Attribut läuft, das Elemente korrekt aus Tab-Reihenfolge und Accessibility Tree entfernt)

`app.css` nicht erneut gelesen — für diesen Fokus-/A11y-Nachputz ohne neuen CSS-bezogenen Anlass (AP-05a hatte dort bereits keine Transition/Fade-Regeln gefunden, unverändert relevant).

## Geänderte Dateien

- **Datei:** `Apps/prokrastinations-preis/QA_TEST_CASES.md`
  - **Änderung:**
    1. TC-F03 „Schritte" um drei neue Prüfschritte (7–9) ergänzt: CTA-Zustand während erster Pause, während zweiter Pause, nach Reveal.
    2. TC-F03 „Erwartetes Ergebnis" um eine Zeile ergänzt: CTA während beider Pausen nicht sichtbar/fokussierbar/Accessibility-Tree-erreichbar, technisch über `hidden`-Attribut umgesetzt; danach sichtbar/fokussierbar/erreichbar.
    3. TC-F03 „Fehlschlag, wenn" um zwei neue Kriterien ergänzt: CTA während einer Pause sichtbar/fokussierbar/`activeElement`-fähig; CTA während einer Pause im Accessibility Tree erreichbar oder vorzeitig angekündigt.
    4. TC-F04 „Erwartetes Ergebnis" um eine Zeile ergänzt: CTA-Nicht-Erreichbarkeit aus TC-F03 gilt unverändert auch bei Reduced Motion.
    5. TC-F04 „Fehlschlag, wenn" um ein Kriterium ergänzt: CTA im Reduced-Motion-Modus früher erreichbar als im Normalmodus.
  - **Warum im Scope:** Direkter Auftrag — schließt exakt den in AP-05b gefundenen GELB-Punkt; TC-F01 nicht angefasst, keine neue Testgruppe, keine Architekturaussage, reine Ergänzung innerhalb der bereits bestehenden Testfälle wie in §7 des Auftrags vorgeschrieben.
  - **Risiko:** Gering — nur TC-F03/TC-F04 betroffen, Testfall-Format durchgehend eingehalten, keine bestehende Zeile gelöscht oder inhaltlich verändert (nur ergänzt), Formulierung bewusst als „DOM-/Fokus-Mini-QA" statt „Screenreader-Volltest" gehalten, um nicht mehr zu behaupten als testbar ist.
  - **nach Write vollständig wiedergelesen:** ja

- **Datei (neu):** `docs/steering/patches/AP-prokrast-05c_cta-fokus-rubikon-pausen_Ergebnis.md`
  - **Änderung:** dieses Protokoll
  - **Warum im Scope:** Pflichtergebnis laut Auftrag
  - **Risiko:** keins
  - **nach Write vollständig wiedergelesen:** ja (dieses Dokument)

## Nicht geändert

- app.js: unverändert (nur gelesen)
- app.css: unverändert (nicht erneut gelesen, kein neuer Anlass)
- APP_SPEC.md: unverändert (nicht gelesen in diesem AP, kein neuer Anlass)
- Drehbuch: unverändert (nicht gelesen in diesem AP)
- Stationsdaten: unverändert
- Engine: unverändert
- Plugins: unverändert
- Strategies: unverändert

Bestätigt durch `git status --short`/`git diff --name-status` nach Abschluss: nur `.claude/learning/session-log.md` (Fremd-/Sessionänderung außerhalb dieses AP-Scopes) und `Apps/prokrastinations-preis/QA_TEST_CASES.md`.

## Geschlossener GELB-Fund aus AP-05b

| Fund aus AP-05b | In QA_TEST_CASES geschlossen? | Beleg | Bewertung |
|---|---:|---|---|
| CTA während 800ms-Pausen nicht per Tastatur/Screenreader erreichbar | ja | TC-F03 Schritte 7–9, Erwartetes Ergebnis Zeile 620–621, Fehlschlag Zeile 628–629; TC-F04 Erwartetes Ergebnis Zeile 649, Fehlschlag Zeile 655 | GRÜN |

## TC-F03 / TC-F04 Änderungen

### TC-F03

- **alter relevanter Zustand:** Testete CTA nur auf Erscheinungszeitpunkt („CTA erscheint nach weiteren ca. 800ms Stille, nach dem Text"), keine Aussage zu Fokussierbarkeit/Accessibility-Tree-Status während der Pausen.
- **neuer relevanter Zustand:** Drei neue Prüfschritte (CTA-Zustand in Pause 1, Pause 2, nach Reveal), eine neue Erwartetes-Ergebnis-Zeile (Nicht-Erreichbarkeit während beider Pausen inkl. technischer Umsetzung über `hidden`), zwei neue Fehlschlag-Kriterien.
- **Begründung:** Schließt den AP-05b-GELB-Fund direkt; Anforderung stammt nicht aus einer neuen Produktentscheidung, sondern aus der bereits getroffenen Steuerfaden-Entscheidung in AP-prokrast-02d.

### TC-F04

- **geändert:** ja
- **falls ja, Änderung:** eine Erwartetes-Ergebnis-Zeile („CTA-Nicht-Erreichbarkeit aus TC-F03 gilt unverändert auch bei Reduced Motion") und ein Fehlschlag-Kriterium („CTA im Reduced-Motion-Modus früher erreichbar als im Normalmodus") ergänzt, um zu verhindern, dass die neue TC-F03-Anforderung stillschweigend nur für den Normalmodus gilt.

## Nach-Write-QA

- `QA_TEST_CASES.md` vollständig erneut gelesen: ja
- CTA während erster 800ms-Pause nicht sichtbar/fokussierbar/screenreader-erreichbar testbar: ja (TC-F03 Schritt 7, Erwartetes Ergebnis Zeile 620)
- CTA während zweiter 800ms-Pause nicht sichtbar/fokussierbar/screenreader-erreichbar testbar: ja (TC-F03 Schritt 8, Erwartetes Ergebnis Zeile 620)
- CTA erst nach Reveal sichtbar/fokussierbar/screenreader-erreichbar testbar: ja (TC-F03 Schritt 9, Erwartetes Ergebnis Zeile 621)
- Reduced Motion erzeugt keine frühere CTA-Erreichbarkeit: ja (TC-F04 neue Erwartetes-Ergebnis-/Fehlschlag-Zeile)
- keine verbotenen Dateien geändert: ja (`git status --short`/`git diff --name-status` zeigen nur `QA_TEST_CASES.md` + `session-log.md`)
- keine Produktentscheidung getroffen: ja (Anforderung war bereits in AP-02d entschieden, hier nur testbar gemacht; TC-F01 nicht angefasst, keine ✅/❓-, Card-to-Point- oder Screen-3-Aussage getroffen)

## Offene Punkte

- **✅/❓-Symbolik:** weiterhin ungeklärte Produktentscheidung (Drehbuch Beat 2) — nicht Teil dieses APs, unverändert offen (BACKLOG AP-26).
- **Card-to-Point:** weiterhin nicht gebaut, nicht spezifiziert — nicht Teil dieses APs.
- **Screen-3 Timing:** Screen-3-Timing-Reveal weiterhin nicht gebaut — nicht Teil dieses APs.
- **sonstige:** Die neuen Prüfschritte in TC-F03/TC-F04 sind bewusst als DOM-/Fokus-Mini-QA formuliert (Accessibility Tree, `document.activeElement`, `hidden`-Attribut), nicht als vollständiger Screenreader-Praxistest mit echter AT-Software. Sollte später ein vollständiger Screenreader-Praxistest gewünscht sein, wäre das ein eigener, größerer Testfall — hier bewusst nicht mitgeliefert, um den Scope klein zu halten.

## Empfehlung

- **nächster interner AP:** AP-prokrast-05d — Re-QA Claims-vs-Files nach CTA-Fokus-Nachputz
- **ausdrücklich nicht:** Commit, Abschlussritual, App-Code, APP_SPEC-/Drehbuch-Patch, Rücklaufkapsel ohne Re-QA
