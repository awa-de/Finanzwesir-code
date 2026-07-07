---
chronik_id: CHRONIK-2026-07-07-ap-prokrast-08-13-ci-uebergabe
datum: 2026-07-07
projekt: prokrastinationspreis
thema: ap-prokrast-08-13-ci-uebergabe
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: mit-anhaengen
schlagworte: [richtungswechsel, externe-abhaengigkeit, konzept-vs-umsetzung, annahme-verworfen, vollstaendigkeit-vs-verdichtung]
---

# Chronik: AP-prokrast-08 bis AP-prokrast-13 und Übergabe an den CI-Masterfaden

**Hauptgegenstand:** Der Faden führte die Prokrastinationspreis-App von der Card-to-Point-Umsetzung über Engine-Folgefragen, Screen-3-Kontinuitäts-Reveal und Dokumentensynchronisierung bis zu einem Statusfreeze. Am Ende wurde kein weiterer Bau-AP geschnitten, sondern ein Übergabeprompt für einen neuen CI-/Designsystem-Masterfaden erzeugt.

## Ausgangslage

Der Faden setzte nach mehreren abgeschlossenen Arbeitspunkten zur Prokrastinationspreis-App ein. AP-prokrast-07 war als gebauter RubikonSymbolMarkers-Stand bekannt; AP-prokrast-08 sollte als nächster operativer Schritt Card-to-Point für Screen 2 behandeln. Der Nutzer arbeitete mit einem Master-/Nebenfaden-Modell: Der Hauptfaden schnitt Haupt-APs, frische Nebenfäden führten jeweils ein Haupt-AP operativ, und Claude Code erhielt enge Umsetzungsaufträge. Später wurde dieses Arbeitsmodell nochmals als eigene Referenz eingebracht und priorisiert.

## Chronologischer Verlauf

### AP-08 wurde als Card-to-Point-AP geschnitten

Zunächst wurde AP-prokrast-08 als Masterprompt für einen Nebenfaden erstellt. Der AP zielte auf Screen 2: Ereigniskarten sollten groß erscheinen, sich zum zugehörigen Chartpunkt bewegen und dort als angekommen wahrnehmbar werden. Der Prompt schloss direkte Chart.js-Internals in `app.js` aus. Pixelkoordinaten mussten über einen engen, architekturkonformen Weg kommen. AP-07 durfte nicht wieder geöffnet werden.

Der später eingebrachte Rücklauf meldete AP-08 als funktional abgeschlossen: Screen 2 / Card-to-Point funktionierte nach Browser-Test auf S/M/L; Reduced Motion wurde nachgetragen; die Chart.js-Defaultanimation wurde im Screen-2-Journey durch `renderMotion.mode = 'instant'` entfernt. Als neue Plattformbausteine erschienen `FwAnchorMeasurementPlugin`, `chartSettled` und `renderMotion.mode = 'default' | 'instant'`.

Der Rücklauf unterschied zwischen aktueller Produktfunktion und Plattformfolgepflichten. `chartSettled` hatte im Update-Pfad funktioniert, aber im Creation-Pfad eine Lücke. Für `FwAnchorMeasurementPlugin` blieb ein No-op-Bootstrap offen, weil das Plugin bereits beim ersten `new Chart()` registriert sein musste.

### AP-09 wurde als Engine-Contract-Härtung geplant und endete geteilt

Auf Basis des AP-08-Rücklaufs wurde AP-prokrast-09 als Engine-Contract-Härtung geschnitten. Erwartet war, beide AP-08-Folgepflichten zu schließen oder bewusst zu entscheiden: No-op-Bootstrap / AnchorMeasurement und `chartSettled` Creation-Pfad.

Der AP-09-Rücklauf veränderte die Annahme. AP-08-FOLLOWUP-B, der `chartSettled` Creation-Pfad, wurde in `ChartEngine.js` gebaut und durch Claims-vs-Files bestätigt. AP-08-FOLLOWUP-A, der No-op-Bootstrap / AnchorMeasurement, wurde nicht gebaut. AP-09a hatte ihn als Masterentscheidung identifiziert, weil eine reine Codelösung mit `CHART_PLUGIN_ARCHITEKTUR.md` §4 kollidiert hätte. Damit war AP-09 GELB: ein Punkt erledigt, ein Punkt offen, aber kein Produktblocker.

Der Hauptfaden hielt fest, dass die vollständige Plattform-Doku nicht blind gestartet werden sollte, solange die No-op-Frage offen war. Zugleich wurde entschieden, auf den Produktpfad zurückzugehen, weil die offene No-op-Frage Screen 3, CTA und Theme-Bridge nicht technisch blockierte.

### AP-10 begann als Timing-Reveal und wurde durch Nutzerkorrektur eingegrenzt

Als nächster Produktbaustein wurde AP-prokrast-10 zunächst als Screen-3 Timing-Reveal vorgeschlagen. Der erste gedachte Satz lautete „Im Rückblick ist es eine Linie. Unterwegs war jedes Mal offen.“ Der Nutzer korrigierte dies sofort und setzte den damals aktuellen Screen-3-Text fest:

`Jetzt erst sieht es einfach aus. Die Strecke wirkt im Rückblick ruhiger, weil du das Ende jetzt kennst. Vor 10 Jahren kannte sie niemand.`

Daraufhin wurde AP-prokrast-10 als Masterprompt für einen Nebenfaden erstellt. Der geplante Ablauf lautete zunächst: Text zuerst, dann vollständiger Chart, dann KPI-Karten. Der Prompt schloss No-op-Bootstrap, AnchorMeasurement, Plattform-Doku, Screen 2, Screen 4 und neue Textentscheidungen aus.

Später fragte der Nutzer, ob das Master-/Nebenfaden-Arbeitsmodell noch präsent sei, und brachte den entsprechenden Referenzprompt erneut ein. Der Faden bestätigte, dass AP-10 grundsätzlich nach diesem Modell geschnitten war: Nebenfaden für genau ein Haupt-AP, Anamnese zuerst, interne Unter-APs nur als operative Kette, reale Datei als Wahrheit und Rücklaufkapsel am Ende.

### AP-10 endete als Kontinuitäts-Reveal statt ursprünglichem Timing-Reveal

Der AP-10-Rücklauf meldete einen Richtungswechsel innerhalb des APs. Der ursprüngliche Text→Chart→KPI-Timing-Reveal wurde nach Nutzerfeedback auf Variante B++ umgeschnitten: Screen 3 wurde als Kontinuitäts-Reveal realisiert. Der 4-Screen-Aufbau blieb erhalten; der Klick auf „Ergebnis ansehen“ wechselte weiter nach Screen 3. Screen 3 wirkte jedoch nicht mehr wie ein Neustart.

Der Endstand lautete: Chart und Ergebnislinie erschienen sofort/still. Unter dem Chart erschien zunächst eine Screen-3-lokale Bridge-Zeile `Station X von Y · Bekannt bis Z`. Danach erschienen KPI-Karten und Disclaimer. Die Bridge blieb 800ms sichtbar, KPI-Karten und Disclaimer erschienen per 800ms-Fade. Reduced Motion übersprang Timer und Bridge und zeigte KPI/Disclaimer sofort im Endzustand. Screen 2 blieb Journey/Zeitreise; `progressEl` blieb auf Screen 2; es gab keinen Screen-2-Ergebnismodus und keine Engine-/Plugin-Änderung.

Der Rücklauf enthielt Commit-Hinweise: `app.js`, `app.css` und die maßgeblichen AP-10-Protokolle sollten aufgenommen werden; ein verworfenes AP-10b-Protokoll konnte nur mit Warnheader forensisch committet werden. Der Hauptfaden nahm AP-10 als GRÜN an und empfahl keinen weiteren AP-10-Code-AP.

### AP-11 synchronisierte Spec, Drehbuch und QA

Nach AP-10 wurde deutlich, dass die führenden Dokumente den neuen Screen-3-Endstand noch nicht abbildeten. AP-prokrast-11 wurde als Doku-/Spec-/QA-Sync für einen Nebenfaden erstellt. Ziel-Dateien waren `APP_SPEC.md`, `drehbuch_prokrastinationspreis_app.md` und `QA_TEST_CASES.md`. Code, `app.js`, `app.css`, Engine, Plugins, No-op-Bootstrap und Plattform-Doku wurden ausgeschlossen.

Der AP-11-Rücklauf meldete GRÜN. Die drei Zieldokumente wurden mit AP-08 Card-to-Point und AP-10 Screen-3-Kontinuitäts-Reveal synchronisiert. Historische Altstände wurden nicht gelöscht, sondern als `HISTORISCHER_STAND — NICHT AKTUELLER SOLLSTAND` beziehungsweise historisch/inaktiv gerahmt; aktive Sollstände wurden als aktuell/abgenommen/gültig getrennt. In `QA_TEST_CASES.md` wurden TC-E06 für Bridge/Timing und TC-E07 für Reduced Motion ergänzt; TC-E04 wurde präzisiert.

AP-11c bestätigte Claims-vs-Files, ohne Code-, Engine-, Plugin-, Daten- oder `docs/spec/**`-Diff. Zugleich wurden offene Punkte benannt: TC-E06/TC-E07 waren redaktionell fertig, aber noch nicht browserseitig auf S/M/L und Reduced Motion durchlaufen; A11y war nur statisch/implizit geprüft. Außerdem fand AP-11 einen aus dem Scope fallenden Dokumentationsfehler: Das Drehbuch beschrieb RubikonSymbolMarkers in Zeile 240 noch als „Bau offen“, obwohl AP-07 sie gebaut hatte.

### AP-12 schloss den RubikonSymbolMarkers-Drehbuch-Widerspruch

Nachdem AP-11 committed war, wurde AP-prokrast-12 als sehr kleiner Doku-Errata-AP geschnitten. Der Nutzer fragte, ob dieser AP überhaupt in Unter-APs unterteilt werden müsse. Der Hauptfaden hielt fest, dass keine große Unterplanung nötig sei, aber wegen der Prozessregel eine minimale Kette aus Write, read-only QA und Rücklaufkapsel nötig blieb: AP-12a, AP-12b, AP-12c.

AP-12 korrigierte genau eine Drehbuch-Zeile. Die Stelle stellte RubikonSymbolMarkers nicht mehr als „Bau offen“ dar, sondern als seit AP-prokrast-07a–07d gebaut und abgenommen. Die Marker wurden als rein visuelle Canvas-/Chart-Marker links/rechts der blauen Rubikon-Linie eingeordnet; TC-F05 blieb für den aktuellen Fallback-Font-Stand bestanden; spätere Neumessung wurde DS-012/DS-013 beziehungsweise der CI-Font-/Theme-Bridge zugeordnet. Es gab keine Code-, CSS-, Engine-, Plugin- oder Datenänderung. AP-12 wurde GRÜN gemeldet und später als committed bestätigt.

### Die offene CI-Abhängigkeit veränderte den nächsten Schnitt

Nach AP-12 wurde zunächst AP-prokrast-13 als TC-E06/TC-E07 Browser-/Reduced-Motion-/A11y-Spotcheck vorgeschlagen. Der Nutzer wandte ein, dass der App noch massiv CI-Konformität fehle. CI bedeutete dabei nicht nur Fonts, sondern auch Farben, TailwindCSS, Weißräume, Abstände und Infrastruktur. Font-Neumessung könne erst funktionieren, wenn CI-konforme Fonts genutzt würden; CTA-Texte könnten erst geschrieben werden, wenn die Fonts klar seien, weil Textlänge und Umbrüche davon abhingen. Auch visuelle QA hänge an CI.

Daraufhin wurde AP-13 umgeschnitten. Der Faden hielt fest, dass TC-E06/TC-E07 zwar logisch prüfbar wären, eine finale S/M/L-, Font-, Weißraum-, CTA- und visuelle QA aber auf falscher visueller Grundlage stünde. AP-13 sollte nicht mehr als Browser-/A11y-Spotcheck laufen, sondern als reiner Master-AP: Statusfreeze und Übergabe an einen neuen CI-Masterfaden.

Der Nutzer präzisierte das Ebenenmodell. AP-13 sollte kein Claude-AP und kein Nebenfaden-AP sein, sondern im aktuellen Hauptfaden die Übergabe vorbereiten. Das neue LLM sollte dann als neuer Masterfaden arbeiten, eigene Haupt-APs schneiden, Nebenfäden beauftragen, und diese Nebenfäden sollten wiederum enge Prompts an Claude geben. Der Faden bestätigte dieses Verständnis.

Am Ende bat der Nutzer nur um eine downloadbare Markdown-Datei mit dem Übergabeprompt, ohne kopierbare Variante. Daraufhin wurde `AP-prokrast-13_statusfreeze_ci-masterfaden-uebergabe_STARTPROMPT.md` erzeugt.

## Wendepunkte

Der erste Wendepunkt trat nach AP-08 ein, als Card-to-Point funktional abgeschlossen war, aber zwei Plattform-Folgepflichten sichtbar wurden. Dadurch wurde AP-09 nicht als Produkt-AP, sondern als Engine-Contract-Härtung geschnitten.

Der zweite Wendepunkt lag in AP-09. Die Annahme, beide Folgepflichten seien kleine Härtungen, wurde geteilt: `chartSettled` wurde gebaut; No-op-Bootstrap / AnchorMeasurement wurde als Masterentscheidung zurückgegeben.

Der dritte Wendepunkt trat bei AP-10 ein. Der ursprünglich geplante Text→Chart→KPI-Reveal wurde durch Nutzerfeedback zur Variante B++ Kontinuitäts-Reveal ersetzt.

Der vierte Wendepunkt entstand nach AP-11. Ein Nebendrift im Drehbuch zu RubikonSymbolMarkers führte zu AP-12 als kleinem Errata-AP.

Der letzte Wendepunkt kam nach AP-12. Der geplante Browser-/A11y-Spotcheck wurde zurückgestellt, weil CI-Konformität als vorgelagerte externe Abhängigkeit erkannt wurde. AP-13 wurde dadurch zum Statusfreeze und zur Übergabe an einen neuen Masterfaden.

## Entscheidungen und Festlegungen

AP-08 wurde als funktional angenommen. Screen 2 / Card-to-Point war gebaut; `app.js` durfte keine Chart.js-Internals für Koordinaten lesen. Status am Ende: gültig.

AP-09 stellte fest: `chartSettled` Creation-Pfad wurde gehärtet; No-op-Bootstrap / AnchorMeasurement blieb offen als Masterentscheidung. Status am Ende: gültig/offen geteilt.

Für Screen 3 wurde der Text `Jetzt erst sieht es einfach aus. Die Strecke wirkt im Rückblick ruhiger, weil du das Ende jetzt kennst. Vor 10 Jahren kannte sie niemand.` als verbindlich gesetzt. Status am Ende: gültig.

AP-10 legte Variante B++ fest: Screen-3-Eintritt als Kontinuitäts-Reveal. Status am Ende: gültig und committed.

AP-11 legte fest, dass historische Altstände LLM-lesbar gerahmt und aktive Sollstände getrennt ausgewiesen werden. Status am Ende: gültig und committed.

AP-12 legte fest, dass RubikonSymbolMarkers nicht mehr als offen beschrieben werden dürfen; spätere Font-/Theme-Neumessung gehört zu DS-012/DS-013. Status am Ende: gültig und committed.

AP-13 wurde als reiner Master-AP verstanden, nicht als Claude- oder Nebenfaden-AP. Status am Ende: als Übergabeprompt erzeugt.

## Irrwege, Schleifen und verworfene Ansätze

Der ursprüngliche Screen-3-Plan „Text zuerst → Chart → KPI“ wurde nicht umgesetzt. Er blieb als historischer Stand erhalten, wurde aber durch den Kontinuitäts-Reveal ersetzt. Die Klärung führte zu AP-11, weil die Dokumente den neuen Endstand spiegeln mussten.

Die Erwartung, AP-09 könne beide Folgepflichten als kleine Code-Härtung schließen, wurde teilweise verworfen. Nur `chartSettled` passte in diesen Rahmen; No-op-Bootstrap / AnchorMeasurement wurde als Spec-/Masterentscheidung behandelt.

Der zunächst vorgeschlagene AP-13 Browser-/A11y-Spotcheck wurde vor Erstellung verworfen. Der Nutzer machte die CI-Abhängigkeit sichtbar, und der Hauptfaden ersetzte diesen Schnitt durch Statusfreeze und CI-Übergabe.

Ein möglicher RubikonSymbolMarkers-Nachbau wurde ausdrücklich nicht aufgenommen. Der Drehbuch-Fehler wurde als Doku-Errata behandelt, nicht als neuer Bau-AP.

## Erzeugte Artefakte

AP-prokrast-08 Card-to-Point-Startprompt – Zweck: Nebenfaden für Screen-2-Card-to-Point führen – Status am Ende: verwendet/ersetzt durch Rückläufe.

AP-prokrast-09 Engine-Contract-Härtung-Startprompt – Zweck: AP-08-Folgepflichten prüfen und härten – Status am Ende: verwendet; Ergebnis teilweise erledigt.

AP-prokrast-10 Screen-3 Timing-Reveal-Startprompt – Zweck: Nebenfaden für Screen-3-Reveal führen – Status am Ende: verwendet; inhaltlich durch B++-Rücklauf überformt.

AP-prokrast-11 Screen-3 Kontinuitäts-Reveal Spec-/QA-Sync-Startprompt – Zweck: Spec, Drehbuch und QA mit AP-10 synchronisieren – Status am Ende: verwendet und abgeschlossen.

AP-prokrast-12 RubikonSymbolMarkers Drehbuch-Errata-Startprompt – Zweck: kleinen Drehbuch-Widerspruch schließen – Status am Ende: verwendet und abgeschlossen.

AP-prokrast-13 Statusfreeze CI-Masterfaden-Übergabe-Startprompt – Zweck: Übergabe an neuen CI-/Designsystem-Masterfaden vorbereiten – Status am Ende: erzeugt.

## Sachliche Erkenntnisse

Gesicherter Stand: Die Prokrastinationspreis-App hatte bis AP-12 einen synchronisierten fachlichen und dokumentarischen Stand für Screen 2, Screen 3 und Screen 4 erreicht. AP-08, AP-10, AP-11 und AP-12 waren committed.

Gesicherter Stand: `chartSettled` Creation-Pfad war erledigt. No-op-Bootstrap / AnchorMeasurement blieb offen und war keine kleine Code-Härtung.

Gesicherter Stand: Screen 3 verwendete nicht den ursprünglichen Text→Chart→KPI-Reveal, sondern Variante B++ Kontinuitäts-Reveal.

Gesicherter Stand: TC-E06 und TC-E07 waren dokumentiert, aber noch nicht praktisch browserseitig im Rahmen dieses Fadens durchlaufen.

Arbeitsannahme am Ende: CI-Konformität war vorgelagert vor finaler visueller QA, CTA-Copy, Font-Neumessung und Theme-/Spacing-Entscheidungen.

Offene Frage: Wie die CI-/Theme-Bridge für 25 Apps technisch geschnitten und wiederverwendbar eingebunden werden sollte, wurde im neuen Masterfaden zu klären.

## Offene Punkte am Ende

No-op-Bootstrap / AnchorMeasurement blieb als Masterentscheidung offen.

`chartSettled` Plattform-Doku blieb offen.

TC-E06/TC-E07 Browser-/Reduced-Motion-/A11y-Spotcheck blieb offen, wurde aber wegen CI-Abhängigkeit nicht als nächster AP geschnitten.

CTA-Copy blieb offen und wurde von Fonts/Textumbrüchen abhängig gemacht.

DS-012/DS-013 Theme-Bridge / Font-Neumessung blieb offen.

Die CI-/Designsystem-/Infrastrukturfrage blieb offen: Fonts, Farben, TailwindCSS, Spacing, Weißräume, Chart-Theme, App-Shell und wiederverwendbare Schnittstellen für ungefähr 25 Apps.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Der Faden trennte wiederholt Produktwahrheit von Plattformhygiene. AP-08 funktionierte produktiv, erzeugte aber Plattform-Folgefragen.

Für spätere Musteranalyse vormerken: Dokumentensync wurde mehrfach als eigener AP behandelt, nachdem die Umsetzung vom ursprünglichen Plan abgewichen war.

Für spätere Musteranalyse vormerken: Kleine Doku-Drifts wurden vor größeren Folgearbeiten geschlossen, um spätere LLM-Missverständnisse zu vermeiden.

Für spätere Musteranalyse vormerken: Der Nutzer stoppte einen naheliegenden QA-AP, weil eine vorgelagerte CI-Abhängigkeit sichtbar wurde.

Für spätere Musteranalyse vormerken: Das Master-/Nebenfaden-Modell blieb selbst Gegenstand der Arbeitssteuerung und wurde vor AP-10 nochmals explizit reaktiviert.

## Bewusst ausgelassen

Wiederholte Kurzbestätigungen, Tippfehler, rein technische Upload-Hinweise, reine Downloadlink-Ausgaben und bereits vollständig ersetzte Zwischenformulierungen wurden ausgelassen. Einzelne Promptvolltexte wurden nicht vollständig wiedergegeben; aufgenommen wurden ihr Zweck, ihre Scope-Grenzen und ihre Wirkung auf den weiteren Verlauf. Toolrauschen und Datei-Erzeugungsdetails ohne Einfluss auf den Projektstand wurden verdichtet.
