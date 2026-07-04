# AP-prokrast-06a — Produktentscheidung ✅/❓-Symbolik Beat 2 Ergebnis

## Status

GELB

## Kurzbefund

Die Quellenlage reicht aus, um Option A (unverändert behalten und bauen) sicher auszuschließen: Die ✅/❓-Symbolik widerspricht in ihrer Original-Form (reines Icon, kein Text, grünes ✅) sowohl dem expliziten Nudging-Verbot als auch dem für Screen 4 bereits etablierten A11y-Vorrang (DOM-Text statt Canvas-Text war genau deshalb die AP-03h2-Entscheidung). Der DOM-Haupttext im rechten Zukunftsraum trägt die intendierte Aussage („Vergangenheit bekannt, Zukunft offen, aber es geht weiter") bereits vollständig und nuancierter. Zwischen B (streichen) und D (parken) ist die Wahl aber eine echte Geschmacks-/Produktentscheidung über die visuelle Reichhaltigkeit des finalen Screens, die nicht allein aus den Quellen ableitbar ist. Empfehlung: B, mit D als akzeptablem Fallback, falls Albert eine spätere, überarbeitete (nicht-nudging-artige) Symbolik offenhalten will.

## Vorprüfung

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0` (Netzwerk-Mount des Repo-Roots; Arbeitsverzeichnis identisch mit dem Projekt, in dem alle AP-prokrast-Vorgänger-Protokolle liegen — kein Hinweis auf falsches Repo)
- `git status --short`: ` M .claude/learning/session-log.md` (Session-Start-Eintrag dieser Sitzung), `?? Archiv/Chroniken/chronist-v1/CHRONIK-2026-07-03-ap-prokrast-05-qa-test-cases.md` (bereits vor diesem AP mit `/chronik-check` geprüft, Exit 0) — beides keine App-/Spec-/QA-/Drehbuch-/Backlog-/Daten-/Engine-/Plugin-/Strategy-Dateien, kein Blocker
- `git diff --name-status`: `M	.claude/learning/session-log.md`
- `git log --oneline -5`:
  ```
  a735981 docs(AP-prokrast-05a-05e): QA_TEST_CASES.md auf Rubikon-Endstand synchronisiert — CTA-Fokus-Lücke gefunden und geschlossen
  c633f82 docs(AP-prokrast-04a-04c): Soll-/Spec-Synchronisierung nach Rubikon-Entscheidung + Kettenabschluss
  ffacc13 feat(AP-prokrast-03f–03i): Screen 4 Rubikon-Reveal — von Morph-Animation zu stehendem Screen mit DOM-Overlay-Text
  a399b5f feat(AP-prokrast-03a-03e): FwChartTextPlugin.js — Rubikon-Zukunftsraum architektonisch geklärt und isoliertes Canvas-Text-Plugin gebaut
  eacdc0e docs(AP-prokrast-01–02e): prokrastinations-preis Drehbuch-Analyse abgeschlossen — Migrationsschnitt + unabhängige Abschluss-QA GRÜN
  ```

**Anmerkung zum Repo-Namen:** Der Prompt erwartet den Ordnernamen „Finanzwesir-code". Das tatsächliche Arbeitsverzeichnis heißt „Finanzwesir 2.0" — dieselbe Codebasis, exakt passende Commit-Historie (AP-prokrast-01 bis 05e) und exakt passende Dateistruktur (`Apps/prokrastinations-preis/`, `docs/steering/patches/AP-prokrast-*`). Als reine Namensabweichung ohne inhaltlichen Widerspruch gewertet, nicht als Repo-Fehler — kein STOP ausgelöst.

## Gelesene Pflichtquellen

- `Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md` — vollständig, insb. Screen 4 (Zeile 117–204), Beat-2-Passage (Zeile 131–141), Responsive-Tabelle (Zeile 170–179), „Was nicht gebaut wird" (Zeile 183–189)
- `Apps/prokrastinations-preis/APP_SPEC.md` — §16.1a (Zeile 1250–1274, finaler Screen-4-Sollstand), §16.2 Screen-4-Texte (Zeile 1307–1329), §16.3 UI-Primitive-Liste (Zeile 1330–1352)
- `Apps/prokrastinations-preis/QA_TEST_CASES.md` — gezielte Suche nach ✅/❓/Symbolik/Beat 2: keine Testfälle zur Symbolik vorhanden
- `docs/steering/patches/AP-prokrast-04a_soll-spec-synchronisierung_Ergebnis.md` — vollständig
- `docs/steering/patches/AP-prokrast-04b_abschluss-qa_claims-vs-files_Ergebnis.md` — vollständig
- `docs/steering/patches/AP-prokrast-04c_ruecklaufkapsel_Ergebnis.md` — vollständig
- `docs/steering/patches/AP-prokrast-05a_qa-test-cases-rubikon-sync_Ergebnis.md` — vollständig
- `docs/steering/patches/AP-prokrast-05b_abschluss-qa_claims-vs-files_Ergebnis.md` — vollständig
- `docs/steering/patches/AP-prokrast-05c_cta-fokus-rubikon-pausen_Ergebnis.md` — vollständig
- `docs/steering/patches/AP-prokrast-05d_re-qa_claims-vs-files_cta-fokus_Ergebnis.md` — vollständig
- `docs/steering/patches/AP-prokrast-05e_ruecklaufkapsel_Ergebnis.md` — vollständig

## Optional gelesene Quellen

- keine — die Pflichtquellen lieferten für alle zehn Prüffragen ausreichend Kontext; AP-prokrast-03i/03h2/02d wurden nicht zusätzlich herangezogen, weil ihre relevanten Entscheidungen (Textposition, Beat-2-Status) bereits vollständig und wortgleich in AP-04a/APP_SPEC §16.1a zitiert sind

## Fehlende oder nicht gelesene Quellen

- keine blockierende Lücke identifiziert

## Fundstellen der Symbolik

| Quelle | Fundstelle | Aussage | Bedeutung |
|---|---|---|---|
| Drehbuch | Zeile 131–141 | „Beat 2 — Symbole erscheinen ... offen, nie entschieden ... Links: ✅ klein, grün. Rechts: ❓ klein, gedämpft grau. Kein Text. Keine Erklärung." | Original-Konzept: reines Icon-Paar an der Rubikon-Linie, textlos, Teil der jetzt abgelösten Beat-Choreografie |
| Drehbuch | Zeile 170–179 (Responsive-Tabelle) | „✅ ❓ | Direkt an der Linie ... | Unter dem Chart als Textkarte, falls zu eng" | Eigener Widerspruch im Drehbuch: Mobile-Fallback auf Textkarte widerspricht dem eigenen Anspruch „versteht es in unter einer Sekunde, auf jedem Gerät" |
| Drehbuch | Zeile 188 | „Keine Erklärung, was die blaue Linie bedeutet — ✅ ❓ reichen" | Alte Prämisse, dass Icons allein für die A11y-/Verständnis-Anforderung ausreichen — durch spätere AP-03h2-Entscheidung (DOM-Text aus A11y-Gründen) faktisch widerlegt |
| Drehbuch | Zeile 200 (Implementierungs-Notizen) | „✅ ❓ an blauer Linie | offen | ungebaut, nicht entschieden ... vor Bau erneut mit Albert klären" | Ausdrücklicher Klärungsauftrag, den dieser AP jetzt bedient |
| APP_SPEC.md | §16.1a, Zeile 1250–1274 | Finaler Screen-4-Sollstand beschreibt Chart-Aufbau, Haupttext, Reveal-Timing — kein Wort zu ✅/❓ | Symbolik ist kein Bestandteil des dokumentierten, gebauten Endzustands |
| APP_SPEC.md | §16.3 UI-Primitive-Liste, Zeile 1347–1351 | Screen-4-Primitive: RubikonChart, Rubikon-Text, PrimaryCta, ErrorState, LoadingSkeleton | Keine ✅/❓-Zeile in der Primitive-Liste — Symbolik nie als Baustein aufgenommen |
| AP-prokrast-04a | Zeile 43, 82, 105 | „✅/❓-Symbole (Drehbuch Beat 2) sind weder gebaut noch entschieden ... Muss vor einem eventuellen Bau erneut mit Albert geklärt werden. → 2 Ebenen nach oben eskalieren" | Formaler Eskalationsauftrag an genau diesen AP-Typ |
| AP-prokrast-05a bis 05e | durchgängig | „✅/❓-Symbolik: weiterhin ungeklärte Produktentscheidung ... BACKLOG AP-26" | Konsistent über die gesamte Kette als offen, nie berührt geführt |
| QA_TEST_CASES.md | Volltextsuche | keine Fundstelle | Kein Testfall existiert — Symbolik wurde nie gebaut, also auch nie getestet |

## Ursprüngliche Funktion der ✅/❓-Symbolik

- Innerhalb der ursprünglichen Beat-Choreografie (Beat 1 Achsen-Öffnung → Beat 2 Symbole → Beat 3 Satz) sollte das Icon-Paar unmittelbar nach dem Öffnen des Zukunftsraums einen sofort verständlichen, textlosen visuellen Anker an der Rubikon-Linie setzen: links „bekannt/abgeschlossen" (✅, grün), rechts „offen/unbekannt" (❓, gedämpft grau) — als schnelle, geräteübergreifende Vorstufe vor dem folgenden Satz.

## Aktueller Screen-4-Kontext

- stehender Rubikon-Screen: ja — kein Morph, keine Achsenanimation, keine C2-Staffelung; Chart erscheint sofort im Zielzustand (§16.1a)
- DOM-Haupttext: ja — als A11y-pflichtiger DOM-Overlay im rechten Zukunftsraum, trägt bereits die vollständige „Vergangenheit bekannt / Zukunft offen, aber es geht weiter"-Aussage (§16.2)
- leerer Zukunftsraum: ja — reiner Achsenraum ohne Datensatzpunkte, keine Linie, keine Prognose (§16.1a)
- Card-to-Point: nicht Teil dieses APs, weiterhin offen (§16.1a „Nachgelagerte Pflichtteile")
- Screen-3-Timing: nicht Teil dieses APs, weiterhin offen (§16.1a „Nachgelagerte Pflichtteile")

## Entscheidungsmatrix

| Option | Beschreibung | Nutzen | Risiken | Folgeaufwand | Bewertung |
|---|---|---|---|---|---|
| A — behalten | ✅/❓ unverändert wie im Original-Drehbuch (Icon, textlos, grün) später bauen | Schneller visueller Anker an der Linie, an ursprüngliche Dramaturgie angelehnt | Verstößt gegen explizites Nudging-Verbot (grünes ✅ = Erfolgs-/Belohnungscodierung); verstößt gegen etablierten A11y-Vorrang (reines Icon ohne Text); redundant zum bereits vorhandenen DOM-Text; Positionierung „an der Linie" technisch an nicht vorhandene Koordinatenkopplung gebunden | Hoch — neue Koordinatenlogik + A11y-Nacharbeit nötig | Nicht empfohlen — von den Quellen selbst (Nudging-Verbot, A11y-Präzedenz) praktisch ausgeschlossen |
| B — streichen | Symbolik endgültig aus dem aktiven aussortieren, BACKLOG AP-26 als „verworfen" schließen | Kein redundanter zweiter Kodierungslayer neben dem DOM-Text; kein Nudging-Risiko; kein zusätzlicher A11y-/Mobile-Sonderfall; Screen bleibt so einfach wie spezifiziert | Verzicht auf eine mögliche zusätzliche visuelle Verstärkung des Rubikon-Moments, falls Albert diese doch für wirkungsvoll hält | Keiner | Empfohlen (primär) |
| C — ersetzen | Andere Symbolik/Textlogik statt ✅/❓ (z. B. neutrale, nicht wertende Marker ohne Erfolgs-Farbcodierung, oder eine Legende) | Könnte visuelle Unterscheidung erhalten, ohne Nudging-Farbcode | Löst A11y-Problem nur, wenn zusätzlicher Text/aria-label mitgebaut wird — dann faktisch eine dritte Kodierung derselben Aussage, die der DOM-Text schon liefert; unklar, welchen Mehrwert das noch stiftet | Mittel — Konzeptarbeit + Bau + A11y-Anbindung | Nur sinnvoll, falls Albert einen konkreten neuen Symbolik-Vorschlag hat; ohne einen solchen nicht eigenständig zu empfehlen |
| D — parken | Nicht mehr als aktives Muss für den nächsten Bau-AP behandeln, aber nicht formal verwerfen — Idee bleibt im Drehbuch als Randnotiz erhalten | Hält Tür für eine spätere, überarbeitete Version offen, ohne aktuell Aufwand zu binden | Backlog-Posten bleibt unscharf „offen" hängen, statt einer klaren Ja/Nein-Antwort | Keiner jetzt, ggf. später | Akzeptabler Fallback, falls Albert sich noch nicht endgültig gegen jede visuelle Markierung entscheiden will |

## Entscheidung

Gewählte Option:

```text
GELB — keine abschließende Wahl durch diesen AP; Empfehlung B, Fallback D
```

Begründung:

Option A ist durch die Quellen selbst praktisch ausgeschlossen: Das Nudging-Verbot ist eine explizite, harte Nutzeranforderung (nicht meine Einschätzung), und ein grünes ✅ trägt in etablierten UX-Konventionen unweigerlich Erfolgs-/Belohnungs-Konnotation. Der A11y-Vorrang für Screen 4 ist ebenfalls dokumentierte Tatsache (AP-prokrast-03h2, Grund für die DOM-Text-Entscheidung), und „kein Text, keine Erklärung" widerspricht diesem Vorrang direkt. Zwischen B und D geht es nicht mehr um Fakten, sondern um eine Geschmacksfrage: Will Albert den finalen Screen so schlicht lassen, wie er jetzt spezifiziert ist (Chart + Linie + Text + CTA, keine zusätzliche Symbolschicht), oder soll die Tür für eine später neu gedachte, nicht-nudging-artige Symbolik offen bleiben? Meine Empfehlung ist B, weil der DOM-Text die intendierte Aussage bereits vollständig und nuancierter trägt als ein binäres Icon-Paar es könnte — eine zusätzliche Symbolschicht wäre strukturell redundant, nicht verstärkend. Diese Abwägung ist aber Alberts Entscheidung, kein aus den Quellen zwingend ableitbares Faktum.

## Entscheidung-vs-Prüffragen

| Prüffrage | Befund | Bedeutung für die Entscheidung |
|---|---|---|
| ursprüngliche Funktion | Sofort verständlicher, textloser Anker „bekannt/abgeschlossen vs. offen/unbekannt" an der Rubikon-Linie | Funktion ist im DOM-Text bereits erfüllt, nur ausführlicher |
| Passung zum stehenden Rubikon-Screen | Teilweise — Grundidee passt, aber Beat-Sequenz-Kontext (Achsen-Öffnung dann Symbole) existiert nicht mehr | Spricht gegen unveränderte Übernahme (Option A) |
| Kernbotschaft vs. Erklärungslast | Redundant zum DOM-Text, keine neue Information | Spricht für Streichen/Nicht-Bauen (B/D), gegen A |
| A11y-/Semantikrisiken | Hoch bei reinem Icon ohne Text — widerspricht etablierter A11y-Präzedenz dieses Screens | Schließt A in Original-Form aus |
| Mobile-/Layout-Risiken | Eigene Responsive-Regel sieht bereits Fallback auf Textkarte vor — widerspricht „versteht in <1s auf jedem Gerät" | Zusätzliches Argument gegen unveränderte Symbolik |
| technische Risiken | Positionierung „an der Linie" braucht Koordinatenkopplung Chart↔Overlay — verwandt mit ungelöstem Card-to-Point (eigene Einschätzung, keine Quelle bestätigt dies explizit) | Spricht gegen Vorziehen ohne Card-to-Point-Grundlage |
| Emoji vs. Text/Marker/Legende | Reines Icon ohne Text ist das Kernproblem; jede Variante mit Text wird zur dritten Kodierung derselben Aussage | Stützt Streichen statt Ersetzen (B statt C), sofern kein neuer Vorschlag vorliegt |
| Relevanz für Card-to-Point | Indirekt technisch verwandt (Koordinaten-Overlay), keine dokumentierte Abhängigkeit | Kein Blocker für Card-to-Point in beide Richtungen |
| Relevanz für Screen 4 | Ursprünglich Screen-4-exklusiv, aber nicht Teil des dokumentierten Sollstands (§16.1a, §16.3) | Bestätigt: aktuell kein aktives Muss |
| aktives Soll / gestrichen / ersetzt / geparkt | Empfehlung: nicht mehr aktives Muss (B bevorzugt, D akzeptabel) | Albert entscheidet final |

## Konsequenzen

- Für Drehbuch: Falls Albert B wählt, müsste Beat 2 (Zeile 131–141), die Responsive-Zeile (Zeile 177) und die Implementierungs-Notiz (Zeile 200) redaktionell auf „verworfen" umgestellt werden — nicht in diesem AP, sondern als eigener Folge-AP.
- Für APP_SPEC: Keine Änderung nötig, unabhängig von B/C/D — §16.1a/§16.3 enthalten die Symbolik bereits nicht.
- Für QA_TEST_CASES.md: Bei B/D keine neue Testfall-Pflicht. Bei C müsste ein neuer Testfall für die Ersatz-Symbolik entstehen (bereits in AP-05a als Folgearbeit vorgemerkt).
- Für Card-to-Point: Keine direkte Kopplung dokumentiert; bei C sollte die Koordinatenlogik-Frage vor dem Bau mit dem Card-to-Point-AP abgestimmt werden.
- Für Screen 4: Bleibt in allen Fällen so schlank wie aktuell spezifiziert, bis Albert entscheidet.
- Für spätere APs: BACKLOG AP-26 sollte nach Alberts Entscheidung entweder auf „erledigt/verworfen" (B), „konkretisiert" (C) oder „geparkt, kein aktives Muss" (D) umgestellt werden — durch den Masterfaden, nicht durch diesen AP.

## Nicht geändert

- app.js: nicht angefasst
- app.css: nicht angefasst
- APP_SPEC.md: nicht angefasst
- Drehbuch: nicht angefasst
- QA_TEST_CASES.md: nicht angefasst
- BACKLOG: nicht angefasst
- Stationsdaten: nicht angefasst
- Engine: nicht angefasst
- Plugins: nicht angefasst
- Strategies: nicht angefasst

## Wiederlesen nach Write

- Ergebnisdatei vollständig wiedergelesen: ja
- Befund nach Wiederlesen: Struktur entspricht der vorgegebenen Mindeststruktur vollständig; alle elf Abschnitte gefüllt, keine Platzhalter offen gelassen; Status GELB konsistent mit Kurzbefund, Entscheidung und Prüffragen-Tabelle
- Scope erneut geprüft: Nur die erlaubte Datei wurde geschrieben; keine der elf verbotenen Dateien wurde berührt
- Hinweis: Dies ersetzt nicht AP-prokrast-06b Abschluss-QA.

## Offene Punkte

- Alberts Entscheidung zwischen B (streichen) und D (parken) steht aus — bei Wahl von C benötigt Albert einen konkreten Ersatz-Symbolik-Vorschlag, den dieser AP nicht selbst entwickelt hat
- Card-to-Point-Koordinatenkopplung als möglicher technischer Zusammenhang zu einer künftigen Symbolik (Option C) ist eigene Einschätzung, nicht quellenbelegt — bei Bedarf im Card-to-Point-AP gegenprüfen

## Empfehlung

- nächster interner AP: AP-prokrast-06b — separater read-only Abschluss-QA-AP mit GELB-Hinweis / Nutzerentscheidung / Quellenlücke
- nächster Haupt-AP aus Sicht dieses Nebenfadens: Nutzerentscheidung B/C/D abwarten, danach ggf. BACKLOG AP-26 durch den Masterfaden aktualisieren; parallel bleiben Card-to-Point und Screen-3-Timing-Reveal als unabhängige Haupt-AP-Kandidaten bestehen
- ausdrücklich nicht: bauen, patchen, Drehbuch/Spec/QA/Backlog ändern, committen, Abschlussritual ausführen, nächsten Haupt-AP selbst starten
