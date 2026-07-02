# AP-prokrast-02b — Soll-/Ist-/Architektur-Konfliktmatrix — Ergebnis

## Status

Status: GRÜN
Blocker: nein

## Kurzbefund

Alle acht Pflichtquellen wurden real gelesen, die Konflikt- und Beat-/Mechanik-Matrix ist vollständig. Kernbefund: Bei Screen 1 stimmt der Ist-Code bereits wortgleich mit dem neuen Drehbuch überein — der in AP-prokrast-01 gemeldete Copy-Befund gegen die alte APP_SPEC ist damit gegenstandslos, sobald das Drehbuch als Soll gilt. Die größte offene Fläche ist Screen 4 (Rubikon): kein Chart im Code, kein Zukunftsfenster im AppContext-Schema (§13.1), und ein direkter Wortkonflikt zwischen Drehbuch-Beat-4 ("800ms Stille, nicht kürzen") und APP_SPEC §14.6 ("keine künstliche Wartepflicht vor dem Button"). Dieser Konflikt ist eine offene Produktentscheidung, keine Architekturfrage, und wird in diesem AP bewusst nicht aufgelöst.

## Steuerfaden-Klärungen übernommen

- Lokaler Repo-Root `Finanzwesir 2.0` ist korrekt trotz GitHub-Name `Finanzwesir-code` — nicht erneut als GELB-/Stop-Grund gewertet.
- Drehbuch (`Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md`) gilt als amtliches, freigegebenes fachliches Zielbild für AP-prokrast-02.
- Untracked-Status des Drehbuchs ist nur ein Git-/Commit-Hinweis, keine fachliche Unsicherheit.
- 7 Stationen sind verbindlich (bestätigt durch `stations.de.json` v3.0).
- „Station 1 von 8" im Drehbuch (Zeile 42) ist ein redaktioneller Korrekturpunkt, kein Blocker und keine offene Produktentscheidung.

## Vorprüfung / Git-Baseline

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- Branch: `master`
- `git status --short` (vor AP-02b):
  ```
   M .claude/learning/session-log.md
  ?? Apps/prokrastinations-preis/AP-prokrast-01_befund-anamnese.md
  ?? Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md
  ?? docs/steering/patches/AP-prokrast-02a_quelleninventur-datei-wahrheit_Ergebnis.md
  ```
- `git diff --name-status`: nur `.claude/learning/session-log.md` (erwarteter Session-Start-Eintrag, LF/CRLF-Hinweis von Git, kein Inhaltsproblem)
- Bewertung: Ausschließlich erwartete/tolerierte Pfade dirty/untracked. App-Code, APP_SPEC, CSS, Stationsdaten, Chart-Engine und Plugins sind clean. Kein Stop-Grund.

**Pfadhinweis AP-02a:** Der Auftrag erwartet das AP-02a-Ergebnis unter `Apps/prokrastinations-preis/AP-prokrast-02a_quelleninventur_datei-wahrheit_Ergebnis.md`. Dort existiert die Datei nicht. Eine Repo-Suche fand sie real unter `docs/steering/patches/AP-prokrast-02a_quelleninventur-datei-wahrheit_Ergebnis.md` (auf ausdrücklichen Alberts Wunsch dorthin geschrieben, siehe vorheriger Auftrag). Diese reale Datei wurde als Befundanker gelesen, keine Rekonstruktion aus dem Gesprächskontext.

## Gelesene Pflichtquellen

| Quelle | Pfad | Gelesen? | Rolle | Bemerkung |
|---|---|---:|---|---|
| Drehbuch | `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` | ja | fachliches Zielbild, verbindliches Soll | vollständig, alle 4 Screens + Responsive + Nicht-Ziele + Implementierungsnotizen |
| AP-prokrast-01-Befund | `Apps/prokrastinations-preis/AP-prokrast-01_befund-anamnese.md` | ja | Vorgänger-Anamnese | Ist/Soll-Abgleich gegen alte APP_SPEC, GELB |
| AP-prokrast-02a-Ergebnis | `docs/steering/patches/AP-prokrast-02a_quelleninventur-datei-wahrheit_Ergebnis.md` | ja | Befundanker Quellen-/Datei-Wahrheit | anderer Pfad als im Auftrag erwartet, siehe Pfadhinweis oben |
| Rucksack (Context Object Pattern) | `docs/spec/Der Rucksack (Context Object Pattern).md` | ja | Architektur-Wahrheit fwContext, Producer/Consumer, Zwiebel-Modell | Status GENEHMIGT, V2.0 |
| Architecture Strategy Paper | `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` | ja | Architektur-Wahrheit Layer 1–5, KDR 1–14 | V12.0.0 „The Complete Record", Final Specification |
| APP_SPEC.md | `Apps/prokrastinations-preis/APP_SPEC.md` | ja | alte Repo-Spec-Wahrheit | §13 AppContext, §14.0–14.14 A11y/Mobile/RM, §16.1–16.5 UX/UI, §17 verbotene Visuals vollständig gelesen |
| app.js | `Apps/prokrastinations-preis/app.js` | ja | reale Code-Wahrheit | Screen 1–4 DOM-Aufbau, `renderJourneyStep`, `renderS3`, `showScreen`, CTA Screen 4 |
| app.css | `Apps/prokrastinations-preis/app.css` | ja | Styling-/Motion-Wahrheit | Klassenliste inventarisiert, keine Animation/Transition gefunden |
| stations.de.json | `Apps/prokrastinations-preis/config/stations.de.json` | ja | Datenwahrheit | v3.0, 7/7 Stationen, SaaS-Bezug bestätigt |

## Mechanische Prüfungen

| Prüfung | Ergebnis | Bemerkung |
|---|---|---|
| Drehbuch enthält Screen 1–4 | ✅ | alle vier Signale gefunden |
| Drehbuch enthält Rubikon/800ms/Card-to-Point-Signale | ✅ | `Rubikon`, `800ms`, `Groß`, `schrumpft`, `Punkt`, `Was nicht gebaut wird` alle gefunden |
| Stationsdaten parsebar | ✅ | JSON valide |
| Stationsanzahl = 7 | ✅ | `len(stations) == 7` |
| SaaS-okalypse/SaaS-Apokalypse enthalten | ✅ | `id: station_2026_02_06_saas_okalypse`, `anchorText` nennt SaaS-Werte-Absturz |
| APP_SPEC §13/§14/§16/§17 vorhanden | ✅ | alle vier Überschriften gefunden, §14 vollständig bis §14.14 gelesen |
| app.js Screen 4 geprüft | ✅ | `dataset.fwScreen = '4'`-Block gelesen: Headline, Subline, CTA (`href=''`), Zurück-Button — **kein Chart-Mount** (`data-fw-appchart` fehlt in diesem Block) |
| app.css Motion-/Reduced-Motion-Hinweise geprüft | ✅ | kein `@keyframes`, kein `prefers-reduced-motion`, kein `transition`; einziger `transform`-Treffer ist `text-transform: uppercase` (kein Bewegungs-Transform) — bestätigt B1-AP-15d-Cleanup |

## Konfliktmatrix neues Drehbuch vs. APP_SPEC / Ist

| Bereich | Neues Drehbuch | Alte APP_SPEC / Ist | Entscheidung für AP-02 | Konflikttyp | Konsequenz |
|---|---|---|---|---|---|
| Screen 1 | Headline „Vor 10 Jahren wäre besser gewesen. Was ist mit heute?", Slider, Button „10 Jahre zurückspringen", kein Chart/keine Zahlen | Ist-Code (app.js Z.292) hat **wortgleiche** Headline; APP_SPEC §16.2 empfiehlt eine andere, nie umgesetzte Headline | beibehalten (Ist-Code erfüllt Drehbuch bereits) | redaktionell (nur Subline unspezifiziert) | kein Bauaufwand; AP-01-Befund 3 (Copy-Abweichung) ist gegenstandslos gegenüber dem neuen Soll |
| Screen 2 | Beat A–C Card-to-Point-Choreographie (schrumpft/pulst/fade-in), 7 Stationen, Orientierungs-Chip, Button „Weiter investiert bleiben" | §16.1 fester 10-Jahres-Rahmen + wachsende Linie (deckungsgleich); Ist: DOM-Card-Replace ohne Übergang, Marker-Pulse (B1-AP-14c4) unabhängig vorhanden, 7 Stationen bestätigt | ergänzen (Grundgerüst bleibt, Card-to-Point ist neue Ergänzung) | Bau + Architektur (Koordination DOM-Karte ↔ Chart-Canvas) | größte Bauaufwand-Fläche neben Screen 4 |
| Screen 3 | 3-stufige Fade-Staffelung (Satz → Chart → KPI), neue Copy, Button „Die nächsten 10 Jahre" | §16.1 Reveal-Ablauf kennt Reihenfolge Linie→Marker→KPI, aber keinen „Satz zuerst"-Schritt und keine Verzögerung; Ist rendert alles synchron | ersetzen (Timing + Copy komplett neu vom Drehbuch) | Bau + redaktionell | mittlerer Bauaufwand (Fade-/Delay-Logik), reiner Copy-Swap für Texte |
| Screen 4 | 5 Beats: X-Achsen-Verlängerung, Symbole ✅/❓, Satz, 800ms Stille, Button-Reveal | §17 verbietet Prognosekurve/fortgeschriebene Linie (Drehbuch konsistent); §14.6 verbietet „künstliche Wartepflicht vor dem Button" (Drehbuch-Beat-4 widerspricht wörtlich); Ist: kein Chart, kein Symbol, keine Timing-Logik | ersetzen bei Copy + ergänzen bei Mechanik, **Beat 4 ungeklärt** | Architektur + A11y/Reduced-Motion (offener Wortkonflikt) + Produktentscheidung (CTA-Text) | größte Einzellücke der App; Bau blockiert bis Architekturfrage (AP-02c) und 800ms-Konflikt (Albert) geklärt sind |
| Responsive | eigene Tabelle „eine Anpassung, kein zweites Design", inkl. „Zukunftsraum vor Go-Live testen", „800ms nicht kürzen" | §14.0/§14.8 behandeln Mobile für bestehende Elemente, keine Aussage zu neuen Elementen | ergänzen | Bau/CSS + QA (impliziter Testauftrag) | kein Grundsatzkonflikt, aber neuer Spezifikationsbedarf für künftiges APP_SPEC-Update |
| Nicht-Ziele | kein Prognosepfad, kein „Regeln festlegen"-Screen, keine Folklore/Belehrung, keine Erklärung der blauen Linie, kein Zukunftsraum-Text | §17 verbietet bereits Prognosekurve/fortgeschriebene Linie; §16.1 verbietet Endwissen auf Screen 2 | beibehalten + ergänzen | keiner (deckungsgleich) | kann 1:1 in künftige Spec übernommen werden |
| Implementierungsnotizen | eigene Prioritätstabelle: Card-to-Point/KPI-Verzögerung/X-Achse = Hoch, Symbole = Mittel, 800ms = Fest, showScreen()-Transition = Mittel | §16.3 stuft Draw-Animation als „bewusst offen", Marker-Fade-in gar nicht gelistet; B1-AP-15a stuft dieselben Lücken niedrig/optional ein | Priorität wird vom Drehbuch neu gesetzt | Produktentscheidung bereits geklärt (kein technischer Widerspruch) | Migrationsschnitt muss mit deutlich höherem Bauaufwand rechnen als alte Einstufung |

## Beat-/Mechanik-Matrix

| Wirkung / Mechanik | Drehbuch-Soll | Aktuelle APP_SPEC / Ist | Konflikttyp | Vorläufige AP-02-Entscheidung | Muss in AP-02c vertieft werden? |
|---|---|---|---|---|---|
| Card-to-Point-Motion | Beat A (300ms Schrumpf Richtung Chartpunkt) → Beat B (Punkt pulst) → Beat C (200ms Fade-in nächste Karte) | nicht spezifiziert, nicht implementiert; `renderStationCard()` ersetzt DOM ohne Übergang | Bau + Architektur | neu bauen; Beat B kann bestehendes Pulse-Plugin wiederverwenden | ja |
| Marker-Pulse | „Punkt pulst einmal auf" (Beat B) | vollständig implementiert (B1-AP-14c4: 1200ms, 1.8×, 2 Pulse, RM-Guard) | keiner (leichte quantitative Abweichung 1× vs. 2×) | bestehende Implementierung wiederverwenden, Pulse-Anzahl redaktionell abgleichen | nein |
| Screen-3 Satz → Chart → KPI | 3 gestaffelte Fade-Phasen mit Verzögerung | DOM-Reihenfolge stimmt, aber synchrones Rendering ohne Verzögerung/Fade | Bau | neu bauen, DOM-Grundreihenfolge bleibt | ja |
| Rubikon-X-Achse | X-Achse fährt 10 Jahre nach rechts, Chart schrumpft optisch nach links | kein Chart auf Screen 4; `xDisplayRange` (AP-14b) nur rückwärtsgewandt (Screen 2) spezifiziert; AppContext §13.1 kennt nur festes 120-Monats-Vergangenheitsfenster | Architektur | nicht in AP-02b entscheidbar | ja |
| Leerer Zukunftsraum | „Keine Linie, keine Prognose, keine Fantasie-Kurve. Nur Raum." | nicht vorhanden; §17 verbietet fortgeschriebene Linie/Prognose — Drehbuch ist inhaltlich konsistent | keiner inhaltlich, aber Architekturfrage zur technischen Umsetzung ohne Fake-Daten | Grundsatz bestätigt, Umsetzung an AP-02c | ja |
| Gegenwartslinie / blaue Linie | bestehende Linie aus Screen 3 bleibt in Screen 4 als Grenze stehen | `VertikaleLinie`/`features.verticalLine: 'last'` bereits als Primitive für Screen 3 vorhanden | Bau (Wiederverwendung) | bestehendes Feature auf Screen 4 übertragen | nein |
| ✅ / ❓ | kleine Symbole an der blauen Linie, Mobile-Fallback als Textkarte | nicht vorhanden, kein vergleichbares Rendering im Code | Bau + CSS/Motion | neu bauen; Canvas-Plugin vs. DOM-Overlay ist offene Layer-Frage | ja |
| 800ms Stille | feste 800ms Pause ohne Button, „nicht kürzen" | nicht vorhanden; **§14.6 verbietet wörtlich „künstliche Wartepflicht vor dem Button"** | A11y-/Reduced-Motion-Frage — echter Widerspruch zweier bindender Quellen | **nicht durch AP-02b auflösbar** — offene Produktentscheidung, braucht Alberts Freigabe + ENTSCHEIDUNGSPROTOKOLL-Eintrag (§17-Präambel: „kein Einzelfall-Override ohne Albert-Freigabe") | ja — höchste Priorität |
| Button-Reveal | Beat 5, Button „Ich fange heute an." per Fade-in | Button existiert bereits („Heute Marktzeit sammeln →", `href=''`, NB-1), kein Fade-in | redaktionell + Bau + Produktentscheidung (E-04 weiterhin offen) | Text wird vom Drehbuch vorgegeben, Ziel-URL bleibt offen (unverändert seit AP-01 Befund 5) | nein |
| Reduced Motion | im gesamten Drehbuch nicht erwähnt | §14.6/§16.4 etablieren verbindlichen RM-Grundsatz (Inhalte bleiben, Bewegung entfällt, keine künstliche Wartepflicht) | A11y-/Reduced-Motion-Frage — Lücke, direkter Widerspruch bei Beat 4 | bestehender RM-Grundsatz bleibt bindend, muss auf alle neuen Beats angewendet werden | ja |
| Mobile-Fallback | eigene Responsive-Tabelle, „Zukunftsraum vor Go-Live testen" | §14.0/§14.8 nur für bestehende Elemente | Bau/CSS + QA | Drehbuch-Tabelle wird Ausgangspunkt, ergänzt bestehende §14-Regeln | nein (aber QA-Punkt vormerken) |

## Konfliktklassifikation

| Konflikt | Kategorie | Warum | Folge |
|---|---|---|---|
| Screen-1-Headline Ist = Drehbuch | kein Konflikt / bereits erfüllt | wortgleich in app.js Z.292 und Drehbuch Z.14 | AP-01-Befund 3 gegenstandslos gegenüber neuem Soll |
| Screen-1-Subline nicht im Drehbuch spezifiziert | redaktioneller Korrekturpunkt | Drehbuch nennt für Screen 1 nur Headline+Slider+Button | kein Blocker, Subline kann bleiben oder überprüft werden |
| Card-to-Point-Animation fehlt vollständig | Baufrage (mit Architektur-Anteil) | weder Code noch alte Spec kennen diese Mechanik | höchste Bauaufwand-Priorität, Zielkoordinaten-Frage an AP-02c |
| Screen 4 hat keinen Chart | Architekturfrage | AppContext §13.1 kennt nur festes Vergangenheitsfenster, kein Zukunftsfeld | zentrale Frage für AP-02c, blockiert Bau von Beat 1–3 |
| 800ms-Stille vs. §14.6 | offene Produktentscheidung (A11y) | wörtlicher Widerspruch zweier bindender Textquellen | braucht Alberts Freigabe + ENTSCHEIDUNGSPROTOKOLL, nicht technisch lösbar |
| „Station 1 von 8" vs. 7 Stationen | redaktioneller Korrekturpunkt (Steuerfaden bereits entschieden) | Tippfehler im Drehbuch, Datenlage (7) verbindlich | kein Handlungsbedarf außer späterer Drehbuch-Korrektur |
| Screen-3-Timing-Staffelung fehlt | Baufrage | DOM-Reihenfolge stimmt, Verzögerungslogik fehlt | mittlerer Aufwand, RM-Endzustand mitplanen |
| Screen-2/3/4-Copy weicht vom Drehbuch ab | redaktioneller Korrekturpunkt / Produktentscheidung bereits geklärt | Drehbuch liefert neuen verbindlichen Wortlaut | reiner Copy-Swap, aber erst nach Klärung der Beat-Mechanik sinnvoll |
| Reduced-Motion-Endzustand für neue Beats undefiniert | A11y-/Reduced-Motion-Frage | Drehbuch erwähnt RM nirgends | muss vor jedem Einzel-Bau-AP definiert werden |
| `xDisplayRange`-Erweiterung für Zukunft | Architekturfrage | bestehendes Konzept nur rückwärtsgewandt spezifiziert (AP-14b) | Kernauftrag für AP-02c |
| CTA-Ziel-URL (E-04) weiterhin offen | offene Produktentscheidung | unverändert seit AP-01 Befund 5, vom Drehbuch nicht berührt | unabhängig von AP-02 lösbar, kein Blocker |
| Visuelles Design-Vakuum (Screens optisch identisch) | CSS-/Motion-Frage / Backlog | B1-UX-01 Befund 4, vom Drehbuch faktisch verschärft | wird durch neues Drehbuch mit-gelöst, kein eigener AP nötig |

## Vorläufige Soll-Entscheidungen für AP-02

### Screen 1

- Neues Soll: Headline „Vor 10 Jahren wäre besser gewesen. Was ist mit heute?" — bereits im Ist-Code umgesetzt
- Bleibt aus APP_SPEC: Grundstruktur (Slider 50–2000 €, Button, kein Chart/keine Zahlen)
- Wird abgelöst: APP_SPEC §16.2 empfohlene alternative Headline/Subline (war nie im Code umgesetzt)
- Redaktioneller Korrekturpunkt: Subline-Wortlaut vom Drehbuch nicht spezifiziert
- Muss in AP-02c vertieft werden: nein

### Screen 2

- Neues Soll: Card-to-Point-Choreographie (Beat A–C), 7 Stationen, Orientierungs-Chip, Button „Weiter investiert bleiben"
- Bleibt aus APP_SPEC: fester 10-Jahres-Rahmen, wachsende Linie, Marker-Pulse-Mechanik (B1-AP-14c4) als Baustein für Beat B
- Wird abgelöst: Einstufung „Draw-Animation bewusst offen"/optional
- Redaktioneller Korrekturpunkt: „Station 1 von 8" → 7 verbindlich
- Muss in AP-02c vertieft werden: ja (Zielkoordinaten-Berechnung DOM↔Canvas)

### Screen 3

- Neues Soll: 3-stufige Fade-Staffelung (Satz → Chart → KPI), neuer Wortlaut Headline/Subline/Button
- Bleibt aus APP_SPEC: Grundprinzip „erst Linie verstehen, dann Zahl sehen", KPI-Slot-Struktur
- Wird abgelöst: bisherige synchrone Rendering-Logik (`renderS3`), bisherige Screen-3-Copy
- Redaktioneller Korrekturpunkt: keiner zusätzlich
- Muss in AP-02c vertieft werden: ja (Timing-Architektur + RM-Endzustand)

### Screen 4

- Neues Soll: komplette Rubikon-Mechanik (5 Beats), neuer Chart auf Screen 4, neue Copy, neuer CTA-Text
- Bleibt aus APP_SPEC: Verbot Prognosekurve/fortgeschriebene Linie (§17), Grundprinzip „kein Endwissen-Verrat"
- Wird abgelöst: aktuelle chartlose Screen-4-Struktur, aktueller Wortlaut
- Redaktioneller Korrekturpunkt: keiner (Copy-Wechsel ist hier Produktentscheidung)
- Muss in AP-02c vertieft werden: ja — größte offene Fläche, inkl. ungelöstem 800ms-vs-§14.6-Konflikt

## Architekturfragen für AP-02c

1. Braucht Rubikon einen eigenen Display-/View-Range über echte Daten hinaus? — Ja, das Drehbuch verlangt sichtbaren Raum ohne Datenpunkte; muss architektonisch als reine Anzeige-Erweiterung definiert werden, nicht als Datenerweiterung.
2. Ist `xDisplayRange` dafür ausreichend oder braucht es einen neuen Kontrakt? — Offen. `xDisplayRange` (AP-14b) ist bisher nur für den Fall spezifiziert, dass die Anzeige-Domain innerhalb oder gleich der Datendomain liegt (Vergangenheit bis `latestMonth`). Eine Anzeige-Domain, die über `dataRange` hinausgeht (Zukunft), ist ein neuer Fall.
3. Wie bleibt `dataRange` echte Datenwahrheit? — Muss geklärt werden, dass der Zukunftsraum niemals Bestandteil von `dataRange` oder `chartSeries` wird (kein Fake-Punkt, keine Nullreihe) — reine visuelle Achsenverlängerung.
4. Welche Rubikon-Wirkungen gehören in App-State? — Vorläufig: Beat-Sequenz-Timing (wann welcher Beat startet), Screen-Wechsel-Trigger.
5. Welche gehören in Strategy/fwContext? — Vorläufig: falls die Achse tatsächlich über die Engine läuft, müsste die Strategy `displayRange` inkl. Zukunftsfenster in den Rucksack packen (KDR 9, Rucksack-Dokument §2.2).
6. Welche gehören in Curator/SmartScales? — Tick-Berechnung für den erweiterten, leeren Bereich (falls überhaupt Ticks dort erscheinen sollen — Drehbuch sagt nicht explizit, ob die X-Achse im Zukunftsraum beschriftet ist).
7. Welche gehören in Plugin? — Die blaue Grenzlinie (Wiederverwendung `verticalLine`) und ggf. die ✅/❓-Symbole, falls als Canvas-Annotation statt DOM-Overlay umgesetzt.
8. Welche gehören in Renderer/Layout/CSS? — Card-to-Point-DOM-Animation, Fade-Ins, 800ms-Timing-Steuerung (sofern Produktentscheidung sie erlaubt).
9. Wie bleibt alles opt-in? — Muss sicherstellen, dass bestehende `xDisplayRange`-Nutzung (Screen 2) unverändert funktioniert, wenn ein neues Zukunftsfenster-Feld ergänzt wird — Architecture-Strategy-Paper KDR 9/Open-Closed-Prinzip verlangt additive, nicht brechende Erweiterung.
10. Wie werden bestehende Charts nicht verändert? — Jede neue Option muss einen definierten Default haben, der dem heutigen Verhalten entspricht, wenn sie nicht gesetzt ist.
11. Wie verhindert man Fake-Daten, Prognosepfad und transparente Zukunftslinie? — §17 ist hier bereits eindeutig; die technische Umsetzung darf unter keinen Umständen einen Datenpunkt für die Zukunft erzeugen, auch nicht transparent oder gestrichelt.
12. Wie wird Reduced Motion definiert, ohne Inhalte zu entfernen? — Für jeden neuen Beat (Card-Shrink, X-Achsen-Fahrt, Symbol-Fade) muss ein sofortiger Endzustand definiert werden, der dieselbe Information ohne Bewegung zeigt — analog zum bestehenden Muster in §14.6/§16.4.
13. Wie wird die 800ms-Stille mit Nutzerkontrolle/A11y vereinbar? — **Ungelöst, keine Architekturfrage.** Dies ist eine Produktentscheidung zwischen Albert und dem psychologischen Kernanliegen des Drehbuchs versus dem bestehenden, bindenden §14.6-Grundsatz. AP-02c kann diese Frage technisch vorbereiten (z. B. wie ein optionaler, RM-sensitiver Timer implementiert würde), aber nicht selbst entscheiden.

## Offene Punkte

- **Redaktion:** Screen-1-Subline-Abgleich gegen Drehbuch (unspezifiziert); spätere Korrektur „Station 1 von 8" → „Station 1 von 7" im Drehbuchtext
- **Produktentscheidung:** 800ms-Stille (Beat 4) vs. §14.6-Wartepflichtverbot; CTA-Ziel-URL (E-04, unverändert offen); Pulse-Anzahl 1× (Drehbuch) vs. 2× (Ist)
- **Architektur:** Zukunftsfenster im AppContext-Schema, `xDisplayRange`-Erweiterung, Layer-Zuordnung Card-to-Point und Symbol-Rendering (Canvas vs. DOM) — alle zu AP-02c
- **Code:** Card-to-Point-Beat A–C, Screen-3-Fade-Staffelung, Rubikon-Beats 1–3 und 5 (Screen 4), showScreen()-Transition (bereits vor diesem AP als offen bekannt, B1-AP-15a)
- **CSS/Motion:** keine bestehende Animation/Transition/Keyframe-Basis vorhanden — alles neu; Mobile-Responsive-Tabelle aus Drehbuch noch nicht in APP_SPEC übernommen
- **Daten:** keine — Stationsdaten sind vollständig und stimmen mit dem Drehbuch überein
- **A11y:** Reduced-Motion-Endzustand für alle neuen Beats fehlt; bestehender Draw-Animation-RM-Gap (B1-AP-15a) weiterhin offen, unabhängig von diesem AP
- **Reduced Motion:** siehe A11y — zusätzlich der direkte Wortkonflikt bei Beat 4
- **Mobile:** Drehbuch-Responsive-Tabelle als Ausgangspunkt, „Zukunftsraum vor Go-Live testen" als offener QA-Auftrag
- **Test/QA:** Mobile-Zukunftsraum-Breite vor Go-Live testen (Drehbuch-eigene Forderung); kein Testplan in diesem AP erstellt
- **Backlog:** visuelles Design-Vakuum (B1-UX-01 Befund 4) wird durch Rubikon-/Card-to-Point-Bau voraussichtlich mit-adressiert, kein eigener AP nötig

## Nicht geändert

- keine APP_SPEC geändert
- kein app.js geändert
- kein app.css geändert
- keine Stationsdaten geändert
- kein Drehbuch geändert
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
?? Apps/prokrastinations-preis/AP-prokrast-02b_soll-ist-architektur-konfliktmatrix_Ergebnis.md
?? Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md
?? docs/steering/patches/AP-prokrast-02a_quelleninventur-datei-wahrheit_Ergebnis.md

git diff --name-status:
M	.claude/learning/session-log.md
```

Bewertung: Nur die erlaubte Ergebnisdatei ist neu hinzugekommen. APP_SPEC.md, app.js, app.css, stations.de.json, Chart-Engine und Plugins sind unverändert. Keine unerwarteten Diffs.

## Nächster richtiger AP

AP-prokrast-02c — Architektur-Kontrakt, Rucksack-/Context-Prüfung und Datenwahrheit Zukunftsraum

Ziel von AP-02c: Die in diesem Protokoll markierten Architekturfragen (insbesondere Zukunftsfenster im AppContext, `xDisplayRange`-Erweiterung, Layer-Zuordnung für Card-to-Point und Symbol-Rendering) in einen konkreten Architektur-Kontrakt überführen. Die offene Produktentscheidung zur 800ms-Stille (Beat 4 vs. §14.6) muss parallel oder vorab mit Albert geklärt werden, da AP-02c sie nicht technisch auflösen kann.

## Ausdrücklich nicht nächster AP

- Bau-AP
- APP_SPEC-Patch
- Rubikon-Prototyp
- Screen-3-Reveal-Minifix
- Card-to-Point-Minifix
- CSS-Motion-Patch
- Chart-Engine-Patch
- Commit
- Abschlussritual
