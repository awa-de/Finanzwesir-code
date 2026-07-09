---
chronik_id: CHRONIK-2026-07-09-ci-pool-tailwind-kette
datum: 2026-07-09
projekt: finanzwesir-2-0
thema: ci-pool-tailwind-kette
beteiligte: [nutzer, claude]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: teilweise
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, annahme-verworfen, praezisierung-durch-gegenfrage, konzept-vs-umsetzung]
---

# Chronik: CI-Pool/Tailwind-Kette — von den 11 Entscheidungsfragen bis zur Theme-Durchleitung (AP-prokrast-15a bis 16c)

**Hauptgegenstand:** Der Faden führte die Auswertung des Read-only-Inventars AP-prokrast-15a durch elf Masterentscheidungen zum Farb-/Token-System, erzeugte daraus Startprompts für eine ausführende Opus-Instanz in Claude Code und begleitete deren Läufe (15b, 15c, 16, 16b, 16c) mit Rücklauf-Prüfungen gegen die realen Dateien. Der Nutzer (Albert) traf die Entscheidungen und testete am Live-Server; Claude (Fable, Cowork) steuerte. Ausgaben der Opus-Instanz wurden als eingefügtes Material behandelt.

## Ausgangslage

Vorlagen waren der Startprompt und das GRÜN-Ergebnisprotokoll von AP-prokrast-15a (Tailwind-CI-Pool Inventar, Renderfluss, Namensanalyse) mit elf Entscheidungsfragen an Albert/Master. Rahmen: Projektregeln aus CLAUDE.md (Gates, Tabu-Zonen, „Spec schlägt Code"), Leitentscheidung „Wir arbeiten mit Tailwind, nicht gegen Tailwind", Vorgeschichte des gestoppten Umsetzungs-AP-15. Der Nutzer verlangte Entscheidungsvorlagen „wie sie der Präsident der Vereinigten Staaten bekommt", geprüft mit Advocatus Diaboli, Ockhams Rasiermesser, Via Negativa und Munger-Inversion, Frage für Frage.

## Chronologischer Verlauf

### Entscheidungsphase F1–F11

Die Fragen wurden einzeln mit Optionen, Messwerten (WCAG-Kontraste, OKLCH, ΔE — per Python berechnet) und Rahmenwerk-Prüfung vorgelegt. Beschlossen wurden: Petrol = Primary/Action (F1); Blau = Link im UI, in Data-Viz frei, keine Ramp (F2); Purpur = Visited + negativer Balken + redaktionelles „Achtung" im Zwei-Welten-Modell Marke vs. Status (F3) — ausgelöst durch die Nutzer-Gegenfrage, wie Amazon/Meta/Apple Statusfarben handhaben. Das Pilot-Error-Rot erwies sich als Material Design Red 800/900 statt „KI-Erfindung" und wurde zentralisiert (F4). Auf die Nutzer-Gegenfrage „wozu müssen wir Grün und Amber definieren?" wurden Success/Warning nicht definiert, ersetzt durch eine Bedarfsregel (F5). F6 (Surface) wurde auf Verlangen des Nutzers über die Tailwind-/Refactoring-UI-Doktrin (Wathan/Schoger) hergeleitet: `--color-surface` = `#FAFAFA`, Trennungsregel „Abstand > Flächenton > Schatten > Border", Struktur (Spacing/Schatten/Radius) komplett aus Tailwind-Defaults.

Bei F7 empfahl Claude zunächst sparse Skalen. Der Nutzer setzte dagegen: „Wir gehen zu 100 % auf Tailwind … Migrationskosten sind egal." Daraufhin volle Skalen 50–900. Das Altsystem wurde als lineare Weißmischung entschlüsselt (an Petrol hex-exakt verifiziert und auf Gelb/Purpur extrapoliert — eine Annahme, die später korrigiert wurde). Die Slot-Kalibrierung ergab nach Korrektur der Methodik (gleichfarbige Tailwind-Familie statt hue-neutraler Bänder): Petrol-Pin 600, Gelb 500 (zuvor 300 geschätzt), Purpur 900 (zuvor 800). Drei Restaurierungs-Strategien wurden als Farbmuster visualisiert; beschlossen wurde Strategie B („Seeds hex-exakt gepinnt, OKLCH-generiert, ~50 % Chroma-Dämpfung, visuelle Abnahme durch Albert"). F8: Konsumenten-Regel (Utility vs. Bridge vs. JS vs. App-lokal). F9: zentrale Token-Datei; Demos bleiben (Nutzer: Bedarf nicht ausschließbar), Aufräumtask T1 als BACKLOG-Pflicht. F10: `fw-app-template.html` = „Steinbruch mit Prüfauftrag", Leitplanke „Tailwind-Muster nutzen, nichts neu erfinden". F11: Purpur-Gradient-Stufen raus („Testfälle"), verallgemeinert zur Exklusivitätsregel „in der Skala oder raus"; `#006273` wurde per Nutzerentscheid durch den Petrol-Vollton ersetzt. Alle Entscheidungen wurden in einer Rücklaufkapsel mit Problemliste P1–P20 dokumentiert.

### Kettenplanung und Prompt-Bau

Ein vom Nutzer eingefügter Kettenplan (15b–19) wurde geprüft; sieben Änderungen wurden eingearbeitet, darunter: Alias-Lücke zwischen Token-Umbenennung und Bridge (V1, später durch Fusion 16+17 gelöst), Pflicht zur Repo-Ablage der Rücklaufkapsel (V2), BACKLOG-Eintrag als Pflicht (V6). Auf Nutzerfragen zur Modellwahl: Opus statt Fable für die Ausführung; Kette gröber geschnitten (15b+15d fusioniert). Der taktische Startprompt V3.0 des Nutzers wurde zunächst in den 15b-Prompt eingearbeitet (Werkzeugschichtung Python/Haiku/LLM, „Die Wahrheit ist die Datei", vier QA-Ebenen); der Nutzer stellte danach klar, dass dieser Prompt für das steuernde LLM gilt, nicht für Claude Code.

### Läufe 15b und 15c

15b (Opus) lieferte den Kontrakt `CI-POOL-ROLLENKONTRAKT.md`, GELB wegen Dateinamens-Abweichung der Rücklaufkapsel (`ruecklauf` statt `ruecklaufkapsel` — Ursache: Diskrepanz zwischen Prompt-Vorgabe und geliefertem Dateinamen des Steuernden). Gate-Linie festgelegt: Identität per Inhalts-Marker prüfen, identisch → weiter mit GELB-Vermerk. 15c korrigierte zwei Rücklaufkapsel-Werte gegen die Datei (`gelb-80 = #F9EF9E`, `purpur-80 = #C57EB2`; nur Petrol folgt dem Weißmisch-Gesetz) und meldete einen Quasi-Gleichstand der Petrol-Kalibrierung (Teal-600 |Δ| 0,0447 vs. Teal-700 0,0446). Der Nutzer bestätigte Pin 600, nahm das Abnahme-Board an und schrieb die Hexwerte fest; ein Erratum wurde freigegeben.

### Lauf 16 und Testrealität

Vor AP-16 stellte der Nutzer klar: Es existiert kein Ghost-Template und keine Live-Auslieferung; das Browser-Gate entfiel ersatzlos, Testrealität ist der VSCode-Live-Server. AP-16 (tokens.css, screen.css-Migration, FwTheme-Bridge, zwei Plugin-Fixes, Kontrakt §8 FINAL) lief GRÜN. Befunde aus dem Lauf: keine lokale HTML-Datei band `screen.css` ein (alle Tests liefen über die byte-identisch gesetzten JS-Fallbacks); `validateColorMap` verwarf als All-or-Nothing-Wächter die Farbzuweisungen von sechs Testdateien mit Alt-Hexes; Opus hatte die Plugin-Farben scope-bedingt per `getComputedStyle` direkt lesen lassen und legte diese Interpretationsentscheidung offen.

### Spec-Bindung und Lauf 16b

Der Nutzer verfügte: `ARCHITECTURE STRATEGY PAPER VX.md` und `Der Rucksack (Context Object Pattern).md` gelten immer. Prüfung ergab: KDR 14.2 („Strategy übergibt Tokens, Utility hat Fallback") schreibt das Injektionsmuster vor; der Plugin-Direkt-Read verstieß dagegen; zugleich wurde eine Spec-Drift sichtbar (KDR 14 nennt `screen.css :root` und alte Token-Namen). Ein Zusatzprompt in den laufenden 16b-Lauf löste eine Kurskorrektur aus: Opus revertierte eine bereits gebaute ChartEngine-Injektion (Layer 2) und verlagerte sie in `LineChartStrategy` (Layer 3). 16b lieferte Harness (`AP-16-abnahme.html` mit Kaskade-Indikator), Plugin-Konsolidierung, Testdaten-Refresh (19 Ersetzungen) und den vorbestehenden Befund: Die drei Strategien und `FwLayoutRules` erzeugen eigene, nie `init()`'te `FwTheme`-Instanzen — Chart-Farben liefen über Fallbacks statt über die Live-CSS-Kaskade. Parallel tauchten drei Varianten der Rücklaufkapsel auf (Vergleichsdaten verschiedener LLMs, so der Nutzer); der kanonische Dateiname war verloren gegangen. Die kanonische Datei wurde wiederhergestellt, das Bündel nach `Archiv/Peer Review Arbeitspakete/2026-07_ruecklaufkapsel-F1-F11_llm-vergleich/` verschoben. Ein Minifix ergänzte negative Balken und Torten-Segmente im Harness; der Nutzer nahm 16b ab.

### Lauf 16c und Fadenabschluss

Zum Theme-Befund erinnerte der Nutzer: „Das hatte ja einen Grund damals" und fragte nach der Praxis großer Tech-Teams. Antwort: Composition Root + Constructor Injection; Lösung mit Graceful Default (`theme = new FwTheme()`), Archäologie-Pflicht mit Stop-Regel. Der Nutzer fragte, ob die primitiven Test-HTMLs ein größeres Problem seien; Einordnung: Test-Lücke (falsch-grüne Fallback-Tests), keine Architekturfrage; Ghost-Staging über TH-03/CSS-7 vorgemerkt. AP-16c lief GRÜN: Archäologie bestätigte Hypothese „unvollständige CSS-3-Migration", Durchleitung 3/3 Strategien, Composition Root = `ChartEngine.js`, Null-Delta 19/19 belegt, `FwLayoutRules` bewertet und nicht angeschlossen; der Nutzer verifizierte beide Indikatoren LIVE. Abschließend thematisierte der Nutzer die Token-Kosten des Fadens; festgelegt wurden Sparregeln (frischer Faden pro AP, Modell-Faustregel Opus/Sonnet/Haiku, knappere Steuerung) und eine Übergabekapsel wurde in `docs/steering/patches/` geschrieben. Der Faden endete mit dem Chronik-Auftrag.

## Wendepunkte

- „100 % Tailwind, Migrationskosten egal" (Nutzer) kippte die Sparse-Empfehlung zu vollen Skalen 50–900.
- Der Einstieg über die Refactoring-UI-Doktrin (auf Nutzerverlangen) verlagerte Spacing/Schatten/Radius vollständig auf Tailwind-Defaults.
- Die Klarstellung „kein Ghost-Template existiert" ersetzte das Browser-Gate durch lokale Testrealität.
- Die nachträgliche Spec-Bindung (KDR 14.2/Rucksack) erzwang eine Kurskorrektur im laufenden 16b-Lauf (ChartEngine → LineChartStrategy).
- Der 16b-Befund nie-`init()`'ter Theme-Instanzen erzeugte den ungeplanten AP-16c.

## Entscheidungen und Festlegungen

- F1–F11 (Rollen, Skalen, Pins 600/500/900/700, Strategie B, Error-Set, Bedarfsregel, Konsumenten-Regel, T1, Steinbruch-Status, Exklusivitätsregel) — früh bis Mitte des Fadens, dokumentiert in Rücklaufkapsel und Kontrakt — Status: gültig, Hexwerte FINAL nach Board-Abnahme.
- Kettenschnitt: 15b+15d fusioniert; 16 = Theme-Migration in einem Lauf; Review (18) in frischer Instanz — gültig.
- Gate-Linie Namensabweichung (Inhalts-Marker-Prüfung) — nach 15b — gültig.
- Ghost-Gate entfällt ersatzlos bis Theme-Build — vor 16 — gültig.
- `#006273` → `petrol-600`; kanonischer Rücklaufkapsel-Name bleibt `…_ruecklauf_…` — gültig.
- Plugin-Farbbezug: Injektion nach KDR 14.2 statt Direkt-Read — während 16b — gültig.
- Theme-Durchleitung per Constructor Injection mit Graceful Default; `FwLayoutRules` nicht anschließen — 16c — gültig.
- Modell-/Token-Regeln (Opus für Steuerung künftig, Sonnet für mechanische APs, frischer Faden pro AP) — Fadenende — gültig.

## Irrwege, Schleifen und verworfene Ansätze

- Sparse-Skalen-Empfehlung: verworfen nach Nutzer-Prämissenwechsel; die Silent-Failure-Argumentation daraus blieb als P7 erhalten.
- Slot-Kalibrierung über hue-neutrale Bänder: korrigiert zu gleichfarbiger Familien-Kalibrierung (Gelb 300→500, Purpur 800→900); als Methodikregel P12 fixiert.
- Extrapolation des Weißmisch-Gesetzes auf Gelb/Purpur: durch 15c-Dateiprüfung widerlegt; Erratum in der Rücklaufkapsel.
- Opus' ChartEngine-Injektion (Layer 2) in 16b: nach Spec-Zusatzprompt revertiert.
- Plugin-`getComputedStyle` aus AP-16: als Zwischenlösung offengelegt, in 16b konsolidiert.
- Dateinamens-Vorgabe `ruecklaufkapsel` im 15b-Prompt gegenüber geliefertem `ruecklauf`: als Prompt-Schnittfehler des Steuernden benannt; Gate-Linie daraus abgeleitet.
- Erwartung Petrol-Pin 600: durch Messung als Quasi-Gleichstand (Δ 0,0001) relativiert, per Masterentscheid bestätigt.

## Erzeugte Artefakte

- Rücklaufkapsel `AP-prokrast-15a_ruecklauf_masterentscheidungen_F1-F11.md` (11 Entscheidungen, P1–P20, Erratum) — final, im Repo.
- Startprompts: 15b, 15c, 16, 16b (+ Spec-Zusatz, + Minifix), 16c — final, genutzt; abgelegt außerhalb des Repos (Cowork-Outputs).
- Farbvisualisierungen (Petrol-Strategien A/B/C; Gelb-/Purpur-Leitern) — Entwurf/Arbeitsmittel, ersetzt durch 15c-Board.
- Durch Opus-Läufe (Material): `CI-POOL-ROLLENKONTRAKT.md`, `tokens.css`, migrierte `screen.css`, FwTheme/Plugins/Strategien/ChartEngine-Änderungen, 15c-Board + Generator, Harness `AP-16-abnahme.html`, fünf Ergebnisprotokolle — final laut Protokollen, unkommittiert.
- Archiv-Bündel `2026-07_ruecklaufkapsel-F1-F11_llm-vergleich/` (drei Varianten) — final.
- Übergabekapsel `UEBERGABE_steuerungsfaden_AP-prokrast-15-16_2026-07-09.md` — final.

## Sachliche Erkenntnisse

- Gesichert: Altsystem-Varianten von Petrol sind lineare Weißmischung; Gelb-80/Purpur-80 sind handgewählt heller. Kontraste: Petrol-Vollton/Weiß 4,54:1; Error-Set 6,27:1 bzw. 5,36:1; kein Repo-Grau ist auf Weiß flächig unterscheidbar (≤ 1,11:1). Pilot-Error-Rot = Material Red 800/900. Kein Ghost-Template im Repo; keine lokale Seite band `screen.css` ein; Strategien nutzten nie-`init()`'te Theme-Instanzen (Wurzel laut 16c-Archäologie: unvollständige CSS-3-Migration).
- Arbeitsannahme: LLM-Konventionstreue (Tailwind-Skala) reduziert stille Fehler in KI-generierten Apps.
- Spätere Korrektur: Kalibrierungsmethodik, Weißmisch-Extrapolation (s. o.).
- Offene Frage: Verhalten des Farbsystems unter Dark Mode (vertagt, P17).

## Offene Punkte am Ende

Commit der Gesamtkette (liegt beim Nutzer, vor AP-17 empfohlen) · KDR-14-Wortlaut-Nachführung (Mini-AP, formale Freigabe ausstehend) · AP-prokrast-17 Pilot-Migration (inkl. Gate Tailwind-Verfügbarkeit im App-Laufzeitkontext) · AP-prokrast-18 Claims-vs-Files-Review in frischer Instanz · ruhend: T1/BACKLOG, Ghost-Staging (TH-03/CSS-7), Font-Bridge nur mit Rubikon-Nachmessung, Standalone-Demos divergent bis T1 · Chronik-Datei aus 16b-Randnotiz blieb im Faden unidentifiziert.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Nutzer-Gegenfragen veränderten dreimal die Empfehlung (Grün/Amber, 100-%-Tailwind, „das hatte einen Grund damals"). Zwei rechnerische Fehler des Steuernden wurden durch Datei-Prüfungen der ausführenden Instanz gefunden (Extrapolation, Kalibrierung) — beide in der Klasse „Annahme statt Messung". Ein mitten im Lauf nachgereichter, rein additiver Zusatzprompt führte zu einem Revert ohne Scope-Bruch. Falsch-grüne Tests entstanden dort, wo Testumgebung und Zielumgebung denselben Wert aus verschiedenen Quellen bezogen.

## Bewusst ausgelassen

Verdichtet oder weggelassen wurden: die vollständigen Texte der Entscheidungsvorlagen und Startprompts (liegen als Dateien vor), Zwischenversionen der Prompts, Tabellen- und Rechendetails jenseits der genannten Kennwerte, Bedien- und Tool-Rauschen (Ordnerzugriff, Shell-Timeouts), Wiederholungen der Statusblöcke aus Opus-Meldungen sowie Höflichkeits- und Bestätigungsnachrichten ohne Verlaufswirkung.
