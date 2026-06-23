---
chronik_id: Chronik_Faden_Prokrastinationspreis_AP01_AP08_Prozesslernen
datum: 2026-06-17
projekt: prokrastinations-preis
thema: prozesslernen-ap01-ap08
beteiligte: [nutzer, claude]
typ: chronik
standard: legacy
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, sackgasse, konzept-vs-umsetzung, scope-drift]
---

# Historisch-archäologische Chronik dieses Fadens

**Projekt:** Finanzwesir 2.0 / App-Fabrik  
**App:** `Apps/prokrastinations-preis`  
**Faden-Thema:** Vom Konzept-Peer-Review zur Stationen-Zeitreise, AP-01 bis AP-08, Korrekturläufe AP-08b bis AP-08d, anschließende Prozessreflexion  
**Zweck:** Tatortsicherung für späteres Debriefing  
**Charakter:** Chronik, nicht finale Auswertung  
**Stand:** 2026-06-17

---

## 0. Vorbemerkung: Warum diese Chronik geschrieben wird

Dieser Faden war kein normaler Arbeitsfaden. Er war gleichzeitig:

1. ein konzeptioneller Umbau einer App,
2. eine Dokumentations-Operation,
3. ein Qualitätssicherungsversuch,
4. ein Experiment mit Claude Code,
5. ein Stresstest des bestehenden App-Fabrik-Prozesses,
6. ein Vorgriff auf die Frage, wie 20+ weitere Apps billiger und schneller umgesetzt werden können.

Am Ende stand ein fachlich guter Zustand. Aber der Weg dahin war lang, teuer und kurvenreich. Es gab mehrere Korrekturläufe, Statusdrift, Kompaktierungen, API-Fehler, zu große Prompts, zu breite Prüfungen und wiederholte Nacharbeit.

Diese Chronik soll **nicht** schon das finale Debriefing sein. Sie soll den Fundort sichern: Was wurde wann gemacht, warum wurde es gemacht, welche Irrtümer traten auf, welche Korrekturen waren nötig, was hat sich als tragfähig erwiesen und welche Muster sollten später noch einmal analysiert werden.

Später, wenn das Projekt oder zumindest dieser App-Typ abgeschlossen ist, kann diese Chronik genutzt werden, um systematisch auszuwerten:

- Was behalten wir?
- Was war ein Irrweg?
- Was war notwendige Grundlagenarbeit?
- Was war vermeidbare Tokenverbrennung?
- Welche Prozesse werden künftig standardisiert?
- Welche Aufgaben gehören zu Sonnet?
- Welche Aufgaben gehören zu Haiku?
- Welche Aufgaben gehören in Skripte?
- Wann ist ein Abschlussritual sinnvoll?
- Wann ist es überdimensioniert?

---

## 1. Ausgangspunkt des Fadens

### 1.1 Der größere Rahmen: Finanzwesir 2.0

Der gesamte Arbeitskontext ist Finanzwesir 2.0, eine nicht-kommerzielle Legacy-Website.

Leitbild:

```text
Kathedrale der Erfahrung
```

Die Website soll nicht einfach Inhalte, Tools oder Finanzrechner sammeln, sondern verdichtete Erfahrung sichtbar machen. Finanzielle Selbstführung, langfristiges Investieren, Portfolio-Logik, Fehlervermeidung und psychologische Einsichten sollen für Laien erfahrbar werden.

Zielgruppe:

- Finanz-Laien,
- 35+,
- Menschen, die ihre Finanzen geregelt bekommen wollen,
- Menschen, die nicht Finanznerds werden wollen,
- mobile Nutzung als wichtiger Standardfall,
- Wunsch: „fertig werden“.

Kommunikativer Grundsatz:

```text
Show, don't tell.
```

Komplexe Fachbegriffe wie Ergodizität, Pfadabhängigkeit, Volatility Drag, arithmetische vs. geometrische Rendite, System-1/System-2, Hindsight Bias oder Black Swan sollen nicht im Vordergrund stehen. Sie sollen in App-Mechaniken und Visuals eingebettet werden.

### 1.2 Der technische Rahmen

Der Nutzer arbeitet mit:

```text
Claude Code
VSCode
lokalem Repo
CLAUDE.md
NAVIGATION.md
PROJECT-STATUS.md
docs/steering/BACKLOG.md
docs/steering/BACKLOG-ARCHIV.md
.claude/memory/project_app_fabrik_struktur.md
Apps/<app>/
```

Die Entwicklung ist dokumentationsgetrieben. Claude Code arbeitet mit Arbeitspaketen, Skills, Commands und Abschlussritualen.

Es gibt geschützte Kernkomponenten, die nicht leichtfertig geändert werden dürfen:

```text
FinanzwesirData.js
CSVParser.js
```

Die App-Fabrik ist also kein freies „Claude programmiert mal los“-System, sondern ein kontrollierter Projekt-Navigator mit viel Dokumentation und vielen Gates.

### 1.3 Die konkrete App: `prokrastinations-preis`

Die App `prokrastinations-preis` sollte den Satz erfahrbar machen:

```text
Die beste Zeit anzulegen war vor 10 Jahren.
Die zweitbeste ist heute.
```

Die ursprüngliche App-Logik war eher rechnerisch:

```text
Screen 1: Eingabe
Screen 2: vollständiger Chart + KPI-Cards
Screen 3: Chart mit Heute-Linie
Screen 4: CTA
```

Diese Logik war technisch nachvollziehbar, aber dramaturgisch falsch. Sie zeigte dem Nutzer zu früh das Ergebnis. Dadurch wurde genau der Denkfehler verstärkt, den die App eigentlich aufbrechen sollte:

```text
Im Rückblick sieht alles logisch aus.
```

---

## 2. Der erste große Wendepunkt: Die App darf kein Rechner bleiben

### 2.1 Der zentrale Befund

Im Laufe der Diskussion wurde klar:

Die App darf nicht primär zeigen:

```text
Was wäre heute herausgekommen?
```

Sie muss zeigen:

```text
Wie fühlte es sich damals an, als niemand das Ergebnis kannte?
```

Der Nutzer soll nicht nur das Endergebnis sehen. Er soll erleben, dass der Weg dorthin unsicher war.

Daraus entstand die neue Kernformel:

```text
Im Rückblick sieht Mut aus wie Logik.
In Echtzeit war es eine Entscheidung.
```

Dieser Satz wurde zum konzeptionellen Schwerpunkt der App.

### 2.2 Neue App-Logik

Die neue Struktur wurde als Zeitreise formuliert:

```text
Screen 1: Teleportation / Eingabe
Screen 2: Stationen-Zeitreise ohne Endwissen
Screen 3: erster vollständiger Reveal mit Chart + KPI-Cards
Screen 4: Transfer auf heute ohne Prognose
```

Der wichtigste Unterschied:

```text
Screen 2 darf das Ende nicht verraten.
```

Das galt später nicht nur visuell, sondern auch semantisch und assistiv: keine Live-Region, kein `aria-label`, keine Chartbeschreibung und kein versteckter Screenreader-Text darf vor Screen 3 das finale Ergebnis verraten.

### 2.3 Von der Ergebnisgrafik zur Stationenreise

Screen 2 wurde zur Stationenreise umgebaut.

Der Nutzer soll durch historische Stationen gehen:

- erste Unruhe,
- Zermürbung,
- echte Krise,
- falsche Auflösung,
- finaler Wackler,
- dynamischer Reveal.

Die Stationen sollen keine Finanznachrichten-Chronik sein, sondern eine kontrollierte Dramaturgie gegen Hindsight Bias.

---

## 3. Die erste Arbeitsphase: AP-01 bis AP-08

In dieser Phase wurden Arbeitspakete formuliert, als Markdown-Dateien bereitgestellt und von Claude abgearbeitet.

Diese Arbeitspakete waren keine Coding-Pakete. Sie dienten dazu, Dokumentation, Spec, Contract, QA und Gates auf den neuen Zielzustand zu bringen.

---

## 4. AP-01 — Entscheidungsprotokoll

### 4.1 Ziel

AP-01 sollte ein Entscheidungsprotokoll erzeugen:

```text
Apps/prokrastinations-preis/ENTSCHEIDUNGSPROTOKOLL.md
```

Die Funktion dieses Dokuments war, die Grundentscheidung zu sichern:

- Die App wird keine einfache Ergebnisgrafik.
- Screen 2 wird zur Zeitreise.
- Screen 3 wird der erste vollständige Reveal.
- Die alte Vollchart-/KPI-Logik auf Screen 2 ist konzeptionell falsch.
- JSON wird redaktionelle Stationsbibliothek.
- CSV bleibt Zahlenquelle.
- Keine rote Crash-Codierung.
- Kein Zukunftsversprechen.

### 4.2 Warum AP-01 wichtig war

AP-01 war die erste Absicherung gegen späteren Rückfall.

Ohne Entscheidungsprotokoll hätte Claude später alte Dokumente oder alte Logik finden und wieder in Richtung Rechner-App ziehen können.

### 4.3 Vorläufige Lernspur

Bewährt:

```text
Erst Entscheidung sichern, dann Spec umbauen.
```

Das Entscheidungsprotokoll war ein stabilisierendes Dokument.

---

## 5. AP-02 — APP_SPEC konzeptionell umbauen

### 5.1 Ziel

AP-02 war der große Umbau der `APP_SPEC.md`.

Die alte `APP_SPEC.md` enthielt noch die falsche Screen-2-Logik: vollständiger Chart, KPI-Cards, fertiger Rückblick.

Nach AP-02 sollte die `APP_SPEC.md` die führende operative Quelle für die neue Stationen-Zeitreise sein.

### 5.2 Inhaltliche Änderungen

AP-02 sollte verankern:

- neuer Screen-Flow,
- CSV + Stations-JSON als zwei Datenquellen,
- Rolling 120-Monats-Fenster,
- `latestMonth` aus der CSV,
- `startMonth = latestMonth - 119 Monate`,
- Stationenfilter,
- Screen 2 als Teilchart,
- Screen 3 als Reveal,
- Screen 4 ohne Prognose,
- verbotene Visuals,
- No-Red-Coding,
- erste Gate- und Testlogik.

### 5.3 Was gut war

AP-02 war der fachliche Durchbruch. Danach war die App nicht mehr als Rechner gedacht, sondern als Erlebnis.

### 5.4 Was später problematisch wurde

Die `APP_SPEC.md` wurde sehr groß und übernahm zu viele Rollen:

- operative Wahrheit,
- Begründung,
- UX,
- A11y,
- Tests,
- Gates,
- Status,
- Historie,
- nächste Schritte.

Später zeigte sich: Diese Monolithisierung erzeugte Drift. Claude konnte alte Stellen in derselben Datei finden und als aktuelle Wahrheit missverstehen.

---

## 6. AP-03 — Stations-JSON-Datenvertrag

### 6.1 Ziel

AP-03 definierte den Contract für die Stationenbibliothek:

```text
Apps/prokrastinations-preis/STATIONS_CONFIG_CONTRACT.md
```

### 6.2 Zentrale Architektur

Die wichtigste Architekturentscheidung:

```text
CSV = Monatsdaten / Sparplanberechnung / Chartwerte
JSON = redaktionelle Stationenbibliothek
```

Daraus folgte:

- keine Depotwerte in JSON,
- keine Performancewerte in JSON,
- Stationen enthalten Text, Datum, Rolle, Priorität, Quellenstatus,
- Werte werden aus CSV und Sparplanlogik berechnet.

### 6.3 Wichtige Contract-Elemente

Der Contract enthielt:

```text
version
locale
app
selectionPolicy
visualRules
motionRules
stations
```

Pro Station:

```text
id
date
priority
status
role
headline
sourceLabel
sourceUrl
sourceStatus
anchorText
continueLabel
mobileIntermediate
flags
```

### 6.4 Spätere Drift

Später stellte sich heraus, dass der Contract bei Fehler-/Fallback-Fällen zunächst noch nicht scharf genug war. Begriffe wie „sicherer Override“, „Fallback“ oder „Config-Error oder Empty-State“ ließen Spielraum.

Diese Drift wurde erst in AP-08c/AP-08d geschlossen.

---

## 7. AP-04 — UX / Heldenreise / Dramaturgie

### 7.1 Ziel

AP-04 sollte die emotionale und dramaturgische Logik fixieren.

Die App wurde als kleine Heldenreise verstanden.

Gegner:

```text
Hindsight Bias
```

Zentrale Einsicht:

```text
Heute fühlt sich schwer an, weil du das Ende nicht kennst.
Genau so war es vor 10 Jahren auch.
```

### 7.2 Wichtige Elemente

AP-04 schärfte:

- falsche Auflösung,
- finaler Wackler,
- Primär-Aha,
- Micro-Commitment,
- ruhiger Ton,
- keine Panik,
- keine rote Codierung,
- kein Druck.

### 7.3 Die falsche Auflösung

Die Impfstoffnachricht im November 2020 wurde als falsche Auflösung verstanden.

Wichtig war:

```text
Diese Station darf sich wie echte Erleichterung anfühlen.
Sie darf nicht verraten, dass später noch etwas kommt.
```

### 7.4 Lernspur

Bewährt:

```text
Dramaturgie explizit dokumentieren.
```

Sonst hätte Claude aus der Stationenlogik leicht eine Nachrichten-Chronik gemacht.

---

## 8. AP-05 — A11y und Mobile

### 8.1 Ziel

AP-05 sollte Mobile und Accessibility sauber dokumentieren.

### 8.2 Mobile als Standardfall

Eine wichtige Entscheidung:

```text
Mobile ist kein Nebenfall.
```

Die App sollte nicht auf Desktop funktionieren und mobil nur irgendwie schrumpfen.

### 8.3 Collapsible für Zwischenstände

Zwischenstände auf Mobile sollten nicht permanent sichtbar sein.

Stattdessen:

```text
Zwischenstand anzeigen
Eingezahlt: ...
Depotwert damals: ...
```

Das verhinderte mobile Zahlenüberladung.

### 8.4 A11y-Themen

Dokumentiert wurden:

- Tastaturbedienung,
- Fokusführung,
- Screenreader-Logik,
- Live-Region,
- Chart-A11y,
- Reduced Motion,
- kein Hover-only.

### 8.5 Später erkannter blinder Fleck

AP-05 behandelte Accessibility, aber der konkrete A11y-Endwissens-Leak wurde noch nicht vollständig erkannt.

Erst später wurde klar: Wenn Screenreader-Texte das finale Ergebnis vor Screen 3 enthalten, ist das dramaturgisch genauso falsch wie ein sichtbarer Vollchart auf Screen 2.

---

## 9. AP-06 — QA-Testfälle

### 9.1 Ziel

AP-06 legte ein ausführliches Testdokument an:

```text
Apps/prokrastinations-preis/QA_TEST_CASES.md
```

### 9.2 Testgruppen

Die Tests wurden in Gruppen A–L strukturiert:

- Datenladen und Validierung,
- Rolling Window,
- Screen-Flow,
- Screen 2,
- Screen 3,
- Screen 4,
- Mobile,
- A11y,
- Reduced Motion,
- Visual- und Ethikregeln,
- Fehler-/Empty-States,
- Regression gegen alte Logik.

### 9.3 Wert

AP-06 war sehr wertvoll, weil damit die App nicht nur beschrieben, sondern prüfbar wurde.

### 9.4 Problem

Später gab es kurzzeitig Doppelung und Versionsdrift zwischen:

```text
APP_SPEC.md §19
QA_TEST_CASES.md
```

Die Lösung war, `QA_TEST_CASES.md` als ausführliches Abnahmedokument und `APP_SPEC.md` als Kurzreferenz zu definieren.

---

## 10. AP-07 — Redaktions-Gate

### 10.1 Ziel

AP-07 definierte:

```text
Apps/prokrastinations-preis/REDAKTIONS_GATE.md
```

Dieses Dokument sollte festlegen, wann eine Stationsauswahl publikationsreif ist.

### 10.2 Gate-Struktur

Es gab drei Gate-Typen:

```text
Gate A = release-blockierend
Gate B = qualitätskritisch
Gate C = redaktionelle Hinweise
```

### 10.3 Wichtige Gate-A-Regeln

Release-blockierend:

- echte Krise im aktiven Fenster,
- keine ungeprüften Quellen im produktiven aktiven Fenster,
- Quellenstatus darf nicht lügen,
- Stationen im CSV-Fenster,
- finaler Reveal aus CSV,
- Screen 2 verrät das Ende nicht,
- finale KPIs erst Screen 3,
- keine rote Crash-Codierung,
- keine Prognose,
- keine Scham / Fake-Urgency.

### 10.4 Wert

AP-07 war ein wichtiger Qualitätssprung. Eine valide JSON ist noch keine gute Stationenreise. Das Gate machte Publikationsreife entscheidbar.

### 10.5 Spätere Korrektur

Das Gate musste später um G-A06b erweitert werden: kein Endwissens-Leak über A11y / Live-Region / `aria-label` / `figcaption` / `visually-hidden` / Chartbeschreibungen.

---

## 11. AP-08 — Alte Dokumentdrift bereinigen

### 11.1 Ziel

AP-08 sollte alte Dokumente anpassen oder als historisch markieren.

Bekannte Problemdateien:

```text
SLICE_PLAN.md
MINI_SPEC_FROM_HAUPTDOKUMENT.md
SLICE_0_KICKOFF.md
SPEC_GATE_REPORT.md
Perplexity-prokrastinations-preis_spec-review.md
```

### 11.2 Problem

Alte Dokumente enthielten noch:

- vollständiger Chart auf Screen 2,
- KPI-Cards auf Screen 2,
- alter Calculator-Ansatz,
- feste Zeiträume,
- alte Screen-3-Heute-Linie,
- alte Slice-Planung.

### 11.3 Zielzustand

Nach AP-08 sollte klar sein:

```text
APP_SPEC.md V2.x ist führend.
Alte Kurzfassungen sind historisch oder angepasst.
Claude darf nicht mehr aus alten Dokumenten die alte App rekonstruieren.
```

### 11.4 Der scheinbare Abschluss

Nach AP-08 klang Claudes Bericht überzeugend. Es wurde gemeldet, dass die bekannten Widersprüche bereinigt seien.

Aber der Nutzer hatte noch keine eigene Prüfung gemacht. Damit begann die nächste Phase.

---

## 12. Erste große Repo-Prüfung nach AP-01 bis AP-08

### 12.1 Anlass

Der Nutzer fragte sinngemäß:

```text
Claude hat AP1–AP8 abgearbeitet.
Ich habe das so hingenommen.
Prüfe gegen die echten Dateien im Repo.
Sind alle Drifts raus?
```

### 12.2 Methode

Es wurde nicht Claudes Bericht vertraut, sondern gegen die echten Repo-Dateien geprüft.

Dieser Unterschied war entscheidend.

### 12.3 Befunde

Die Prüfung zeigte:

- `APP_SPEC.md` hatte noch falsche Statushinweise.
- Nächste Schritte zeigten noch auf AP-07 / AP-08.
- Project-Status / Navigation / Memory zeigten teilweise noch auf Slice 7.
- QA-Dokumente hatten Versionsdrift.
- Contract ließ Fallbacks / Overrides offen.
- Der Code war noch Slice-6-Altstand.
- `app.test.html` testete noch alte Screen-2-Logik.
- Der zentrale neue Befund: A11y-Endwissens-Leak.

### 12.4 Der A11y-Endwissens-Leak

Die App sollte visuell das Ende vor Screen 3 verbergen. Aber eine A11y-Summary konnte das finale Ergebnis vorzeitig nennen.

Das war eine tiefe Einsicht:

```text
Endwissens-Verbot gilt nicht nur visuell.
Es gilt auch semantisch und assistiv.
```

Daraus entstand die spätere Unterscheidung:

```text
stationLiveMessage = Screen 2, kein Endwissen
revealA11ySummary = Screen 3, Endergebnis erlaubt
```

---

## 13. AP-08b — Konsistenz-Nachputz

### 13.1 Ziel

Ein neuer Prompt wurde erstellt:

```text
B1-AP-08b — Konsistenz-Nachputz nach AP-01 bis AP-08
```

Ziele:

- Statusdrift beseitigen,
- A11y-Endwissens-Leak korrigieren,
- QA-Test ergänzen,
- Redaktions-Gate erweitern,
- CTA-Drift beseitigen,
- Rollenfehler Dezember 2018 korrigieren,
- Slice-Plan entschärfen,
- Project-Status / Navigation / Memory / Backlog synchronisieren,
- Contract-Fallbacks klären.

### 13.2 Kompaktierung und API-Fehler

Während AP-08b trat ein Prozessproblem auf:

- Claude identifizierte viele Punkte.
- Dann wurde der Tokenspeicher voll.
- Claude musste kompaktieren.
- Planung und Ausführung waren dadurch getrennt.
- Zusätzlich trat ein Claude-API-Fehler auf:

```text
API Error: 500 Internal server error
```

Dieser Ablauf erhöhte das Risiko, dass nicht alles umgesetzt wurde.

### 13.3 Ergebnis

Claude meldete, alle 13 Tasks erledigt zu haben.

Aber die anschließende Repo-Prüfung zeigte: noch nicht grün.

---

## 14. AP-08c — Restdrift nach AP-08b

### 14.1 Auslöser

Nach AP-08b wurden echte Dateien erneut geprüft.

Gefundene Restprobleme:

- `APP_SPEC.md` hatte noch einen alten AP-07-Fußzeilenhinweis.
- `APP_SPEC.md §8/§12` nutzte noch Fallback-Begriffe.
- `STATIONS_CONFIG_CONTRACT.md` ließ noch sichere Defaults / Overrides offen.
- `QA_TEST_CASES.md` enthielt noch `APP_SPEC.md V2.3`.
- AP-08-Fundstellen waren noch wie offene To-dos formuliert.
- `PROJECT-STATUS.md` enthielt alte operative Quellen.
- Memory enthielt widersprüchliche Spec-Stände.
- `SLICE_PLAN.md` war oben entschärft, aber Slice 7 blieb mechanisch offen.

### 14.2 AP-08c-Prompt

Der neue Prompt wurde enger:

```text
B1-AP-08c — Restdrift nach AP-08b bereinigen
```

Ziel war nicht mehr breite Prüfung, sondern gezielte Reparatur.

### 14.3 Ergebnis nach AP-08c

Nach AP-08c war vieles repariert:

- `stationLiveMessage` / `revealA11ySummary`,
- TC-H05,
- G-A06b grundsätzlich vorhanden,
- Backlog mit AP-09 / AP-10,
- `app.test.html` als Slice-6-Altstand markiert,
- Regression-Matrix mit Altstand-Hinweis.

Aber wieder blieben Restfehler:

- `Error-State (d)` wurde erwähnt, aber im State-Modell nicht sauber definiert.
- G-A06b war enger als TC-H05.
- Slice 7 / 8a / 8b standen noch als offen.
- Project-Status und Memory waren noch nicht sauber auf AP-08c.
- Header einiger Dateien standen noch auf AP-08b.

---

## 15. AP-08d — Finaler Konsistenzschluss

### 15.1 Ziel

AP-08d sollte nur noch Restdrift bereinigen:

```text
B1-AP-08d — Finaler Konsistenzschluss vor AP-09
```

Aufgaben:

- Header / Session-Drift auf AP-08c korrigieren,
- `Error (d)` und `Empty-Journey-State` definieren,
- G-A06b auf QA-Breite erweitern,
- Slice 7 / 8a / 8b als historischen Altplan markieren,
- Project-Status letzte Session ergänzen,
- Memory-Frontmatter aktualisieren.

### 15.2 Wieder ein Prompt-Längenproblem

Auch dieser Prompt war so lang, dass Claude kompaktieren musste.

Das wurde als eigener Prozessbefund relevant:

```text
Sogar Korrektur-Prompts wurden so lang, dass sie Kompaktierungsrisiken erzeugten.
```

### 15.3 Ergebnis

Nach AP-08d meldete Claude:

- Error(d) und Empty-Journey sauber definiert,
- G-A06b auf TC-H05-Breite,
- Slice 7 / 8a / 8b nicht mehr nächster Auftrag,
- Statusdrift bereinigt,
- kein Code geändert,
- keine `stations.de.json`.

Die anschließende Repo-Prüfung ergab:

```text
Fachlich grün.
Formal fast grün.
```

### 15.4 Verbleibende Kleinigkeiten

Noch gefunden wurden:

- `BACKLOG.md` Header stand noch auf AP-08b.
- `STATIONS_CONFIG_CONTRACT.md` Header stand noch auf AP-03 / AP-07.
- eine Contract-Zelle war minimal unscharf.

Diese Punkte wurden als nicht blockierend bewertet. Ein kleiner Mini-Fix wurde vorgeschlagen.

---

## 16. Der Mini-Fix und die Haiku-Erkenntnis

### 16.1 Anlass

Für die verbleibenden Kleinigkeiten wurde gefragt:

```text
Kann ich diesen Fix in einem neuen Claude-Faden nutzen?
Ist das ein Haiku-Job?
```

### 16.2 Antwort

Die Antwort war eindeutig:

```text
Ja, Haiku reicht.
Eigentlich sogar manuell in VSCode.
```

Der Fix bestand nur aus drei Stellen:

1. `BACKLOG.md` Header AP-08b → AP-08d.
2. `STATIONS_CONFIG_CONTRACT.md` Header AP-03 / AP-07 → AP-03 / AP-07 / AP-08c Nachputz.
3. `STATIONS_CONFIG_CONTRACT.md §12` Tabellenzelle zu leerem Stationsarray präzisieren.

### 16.3 Wichtige neue Regel

Aus dieser Situation entstand eine wichtige Prozessregel:

```text
Mini-Fix < 5 Zeilen → kein Abschlussritual.
Nur Commit-Vorschlag.
```

### 16.4 Bedeutung

Das war ein Wendepunkt von der App-Arbeit zur Prozessarbeit.

Es wurde klar:

```text
Nicht jede Aufgabe rechtfertigt Sonnet.
Nicht jede Aufgabe rechtfertigt einen Scout.
Nicht jede Aufgabe rechtfertigt ein Abschlussritual.
```

---

## 17. Prozessreflexion: Warum war es teuer?

### 17.1 Notwendige Kosten

Ein Teil der Kosten war notwendige Grundlagenarbeit.

Es wurde nicht nur eine App geändert. Es wurde ein neuer App-Archetyp geschaffen:

```text
Historische Zeitreise / Stationen-App
```

Dazu mussten neu gedacht werden:

- Datenarchitektur,
- JSON-Contract,
- dramaturgischer Ablauf,
- QA-Struktur,
- Redaktions-Gate,
- Mobile/A11y,
- No-Red-Coding,
- Endwissens-Verbot,
- A11y-Endwissens-Leak,
- alte Dokumentdrift.

Diese Arbeit hätte nicht einfach eingespart werden können, ohne Qualität zu riskieren.

### 17.2 Vermeidbare Kosten

Andere Kosten waren vermeidbar:

- zu breite Prüfaufträge,
- zu große Prompts,
- Sonnet für mechanische Arbeit,
- fehlende Grep-/Drift-Skripte,
- historische Dokumente im aktiven Kontext,
- Abschlussritual bei Mini-Fixes,
- Kompaktierungsrisiko durch zu lange Korrekturprompts,
- App-Spec als Monolith.

### 17.3 Die zentrale Formel

Die wichtigste Erkenntnis:

```text
Nicht weniger Qualität, sondern weniger Kontext pro Aufgabe.
```

---

## 18. Prozessidee: APP_SPEC kleiner machen

### 18.1 Problem

Die `APP_SPEC.md` wurde zu groß.

Sie enthielt zu viele Wissensarten:

- operative Wahrheit,
- Begründungen,
- QA,
- A11y,
- Gates,
- Status,
- Historie,
- alte Slices,
- neue Slices.

### 18.2 Vorgeschlagene Zielstruktur

Künftig soll die Dokumentation stärker geschichtet werden:

```text
APP_BRIEF.md
APP_SPEC.md
DECISIONS.md
CONFIG_CONTRACT.md
QA_TEST_CASES.md
REDAKTIONS_GATE.md
HISTORICAL_NOTES.md
```

### 18.3 Führende Logik

```text
APP_SPEC.md = operative Wahrheit
DECISIONS.md = warum
CONTRACT.md = Daten / Config
QA.md = Prüfung
GATE.md = Publikationsreife
HISTORICAL_NOTES.md = nicht führend
```

### 18.4 Ziel

Claude soll beim Coding nicht alles lesen, sondern nur:

```text
APP_SPEC.md
CONFIG_CONTRACT.md
QA_TEST_CASES.md
relevante Code-Dateien
```

Nicht lesen:

```text
alte Perplexity-Reviews
alte Mini-Spec
alte Slice-Reports
Backlog-Archiv
historische Notizen
```

---

## 19. Prozessidee: App-Archetypen

Aus `prokrastinations-preis` entstand die Idee, App-Archetypen einzuführen.

Mögliche Archetypen:

```text
Archetyp A: Rechner mit Slider
Archetyp B: Historische Zeitreise / Stationen-App
Archetyp C: Portfolio-Vergleich
Archetyp D: Entscheidungsbaum / Diagnose-App
Archetyp E: Karten-/Index-App
Archetyp F: Simulator
Archetyp G: Story-Infografik
```

Für jeden Archetyp könnte es Templates geben:

```text
ARCHETYPE_SPEC.md
ARCHETYPE_QA.md
ARCHETYPE_A11Y.md
ARCHETYPE_FORBIDDEN.md
ARCHETYPE_CODE_PATTERN.md
```

Eine konkrete App bekäme dann nur ein Delta:

```text
APP_DELTA.md
```

Das Ziel ist, nicht AP-01 bis AP-08 für jede App neu zu erfinden.

---

## 20. Prozessidee: Modellrouting

### 20.1 Sonnet

Sonnet soll bleiben für:

- Architektur,
- Konzeption,
- schwierige Logik,
- Coding,
- Reviews wichtiger Entscheidungen.

### 20.2 Haiku

Haiku soll übernehmen:

- Dateisuche,
- Drift-Check,
- Header-Fix,
- Versions-Fix,
- kleine Tabellenzellen,
- Grep-Ergebnisse zusammenfassen,
- protected-file-Prüfung,
- forbidden-phrase-Prüfung.

### 20.3 Skripte

Skripte sollen deterministische Checks übernehmen:

```bash
rg "Nächster Schritt: B1-AP-0[1-8]"
rg "APP_SPEC.md V2.3"
rg "Fallback auf Minimalzustand"
rg "vollständiger Chart" Apps/<app>
rg "KPI-Cards auf Screen 2"
rg "Ich starte jetzt"
rg "Slice 7"
rg "sicherer Override"
```

### 20.4 Manuell

Manuell statt Claude:

- drei Zeilen ändern,
- Header korrigieren,
- offensichtliche Statuszeile anpassen,
- einzelne Tabellenzelle ersetzen.

---

## 21. Prozessidee: Abschlussritual abstufen

Das Abschlussritual ist sinnvoll bei echten Arbeitspaketen.

Aber es war überdimensioniert bei Mini-Fixes.

Neue Regelidee:

```text
Echtes AP → Abschlussritual.
Mini-Fix < 5 Zeilen → kein Abschlussritual.
Nur Commit-Vorschlag.
```

Mögliche Klassifikation:

```text
Full AP
Mini AP
Micro Fix
Scout only
Review only
```

---

## 22. Was sich als gut erwiesen hat

Diese Punkte sollten wahrscheinlich beibehalten werden:

### 22.1 Entscheidungen zuerst sichern

Das Entscheidungsprotokoll war wertvoll. Es schützt vor Rückfall.

### 22.2 Spec vor Code

Die saubere Spec erhöht die Chance, dass Claude beim Coding auf Anhieb gut arbeitet.

### 22.3 QA vor Implementierung

QA vor Coding war sinnvoll. Sie machte das Ziel prüfbar.

### 22.4 Redaktions-Gate

Das Gate war wichtig, weil es die redaktionelle Qualität der Stationenbibliothek schützt.

### 22.5 Repo-Prüfung gegen echte Dateien

Claudes Berichte reichten nicht. Die echte Repo-Prüfung war nötig.

### 22.6 No-Red-Coding als harte Regel

Die rote Crash-Codierung wurde mehrfach bedroht. Die harte Regel war nötig.

### 22.7 A11y als dramaturgisches Thema

Der A11y-Endwissens-Leak war eine wichtige Entdeckung. Accessibility ist nicht nur Technik, sondern Teil der Dramaturgie.

---

## 23. Was sich als Irrweg oder Kostenfalle erwiesen hat

### 23.1 Zu offene Prompts

Formulierungen wie:

```text
prüfe alles kritisch
finde jede Drift
100 % Konsistenz
```

sind für Meta-Review nützlich, aber gefährlich teuer in Claude Code.

### 23.2 Zu große Korrekturprompts

AP-08d zeigte: Selbst Korrekturprompts können so lang werden, dass Kompaktierung nötig wird.

### 23.3 Historie nicht sauber genug getrennt

Alte Dokumente blieben lange gefährlich.

### 23.4 APP_SPEC als All-in-one-Dokument

Der Monolith erzeugte Drift.

### 23.5 Abschlussritual bei Kleinkram

Für Mini-Fixes war es zu schwergewichtig.

### 23.6 Sonnet für Such- und Zeilenjobs

Teuer und unnötig.

---

## 24. Was künftig vermutlich wegfallen sollte

Vorläufige Kandidaten:

```text
Repo-weite Prüfung durch Sonnet bei Mini-Fixes
Abschlussritual bei Drei-Zeilen-Fixes
Historische Reviews im aktiven Coding-Kontext
APP_SPEC als Vollarchiv
Offene „prüfe alles“-Prompts für einfache Aufgaben
Sonnet für reine grep-/Header-Arbeit
```

Diese Punkte sind noch keine finale Entscheidung, aber klare Debriefing-Kandidaten.

---

## 25. Was künftig wahrscheinlich bleiben sollte

Vorläufige Kandidaten:

```text
Entscheidungsprotokoll bei konzeptionellen Wendepunkten
APP_BRIEF als kompakter Einstieg
Contract bei externen Daten / JSON
QA vor Coding
Redaktions-Gate bei psychologischen / redaktionellen Apps
No-Red-Coding als harte Regel
A11y-Endwissens-Leak als Standardprüfung
Repo-Prüfung gegen echte Dateien vor Coding
```

---

## 26. Der Übergang in den neuen Faden

Am Ende wurde entschieden, die Prozessoptimierung nicht mehr in diesem überlangen Faden weiterzuführen.

Dafür wurde eine neue Übergabedatei erstellt:

```text
Uebergabeprompt_Prozessoptimierung_Finanzwesir_App_Fabrik.md
```

Diese Datei soll einem neuen LLM ermöglichen, konzentriert weiterzuarbeiten.

Darin enthalten:

- Projektkontext,
- AP-01 bis AP-08,
- Korrekturläufe,
- Prozessprobleme,
- bisherige Verbesserungsideen,
- drei Prozessszenarien,
- Auftrag für neue Dokumentenarchitektur,
- Rolle von Haiku / Sonnet / Skripten,
- Vorschlag für nächste Prozess-Arbeitspakete.

---

## 27. Der Stand am Ende dieses Fadens

### 27.1 App-Stand

Für `prokrastinations-preis` ist die Konzept- und Dokumentationsgrundlage fachlich grün genug für AP-09.

Nächster App-Schritt:

```text
B1-AP-09 — produktive stations.de.json anlegen
```

Danach wahrscheinlich:

```text
B1-AP-10 — Validierungs-/Implementierungsplan für Stations-Loader und Stationenreise
```

Dann erst Coding.

### 27.2 Prozess-Stand

Der Prozess ist noch nicht optimiert.

Die App ist gut vorbereitet, aber der Weg dahin war zu teuer.

Nächster Prozess-Schritt:

```text
Neuer Faden: Prozessoptimierung Finanzwesir-App-Fabrik
```

Ziel dort:

- APP_SPEC verkleinern,
- App-Archetypen definieren,
- Haiku-/Sonnet-Routing festlegen,
- Drift-Checks automatisieren,
- Abschlussritual abstufen,
- Templates erstellen,
- Pilotprozess an der nächsten App testen.

---

## 28. Offene Fragen für das spätere Debriefing

Diese Fragen wurden im Faden sichtbar, aber noch nicht abschließend beantwortet:

### 28.1 Qualität vs. Kosten

- War AP-01 bis AP-08 notwendige Qualitätssicherung oder übertriebene Dokumentation?
- Welche Teile waren wirklich qualitätsentscheidend?
- Welche Teile waren nur Prozessballast?

### 28.2 Spec-Größe

- Wie klein darf `APP_SPEC.md` werden, ohne Qualität zu verlieren?
- Welche Informationen gehören in `APP_SPEC.md`, welche in Anhänge?
- Welche Dokumente darf Claude beim Coding lesen?

### 28.3 Modellwahl

- Welche Aufgaben sind eindeutig Haiku?
- Welche Aufgaben bleiben Sonnet?
- Wo lohnt Subagent-Overhead nicht?
- Wo ist manuelle Bearbeitung schneller als KI?

### 28.4 Drift-Prüfung

- Welche Drift-Checks müssen vor jedem Coding-Paket laufen?
- Welche Checks sind app-spezifisch?
- Welche Checks sind global?
- Wie verhindert man, dass Drift-Checks selbst wieder teure LLM-Arbeit werden?

### 28.5 Abschlussritual

- Wann ist das Abschlussritual wertvoll?
- Wann erzeugt es mehr Drift als Nutzen?
- Braucht es ein Mini-Abschlussritual?

### 28.6 Historische Dokumente

- Wie werden historische Dokumente archiviert, ohne dass Claude sie später als aktuell liest?
- Brauchen alte Dokumente harte Statuslabels?
- Soll es eine Regel geben: historische Dokumente nie automatisch lesen?

---

## 29. Vorläufige Leitsätze aus diesem Faden

Diese Leitsätze sind noch nicht final beschlossen, aber als Debriefing-Material wichtig:

```text
1. Qualität entsteht nicht durch maximalen Kontext, sondern durch richtigen Kontext.
```

```text
2. Die operative Wahrheit muss klein sein.
```

```text
3. Historie darf nicht wie Gegenwart aussehen.
```

```text
4. Sonnet soll denken und coden, nicht grep spielen.
```

```text
5. Haiku und Skripte sollen mechanische Prüfungen übernehmen.
```

```text
6. Mini-Fixes brauchen kein großes Ritual.
```

```text
7. A11y ist nicht nur Barrierefreiheit, sondern kann Teil der Dramaturgie sein.
```

```text
8. Redaktions-Gates schützen vor scheinbar validen, aber inhaltlich schlechten Apps.
```

```text
9. Claude-Berichte sind hilfreich, aber echte Repo-Prüfung bleibt notwendig.
```

```text
10. Der erste Archetyp ist teuer; der zweite darf nicht wieder so teuer werden.
```

---

## 30. Schlussnotiz für das spätere Debriefing

Dieser Faden war kein eleganter, geradliniger Prozess. Er war eher eine archäologische Grabung unter laufendem Betrieb.

Es gab eine echte fachliche Errungenschaft: Die App `prokrastinations-preis` wurde von einem Renditerechner in eine Stationen-Zeitreise transformiert.

Es gab aber auch Prozessschmerz:

- zu lange Prompts,
- zu große Specs,
- zu viele Korrekturläufe,
- Kompaktierungsrisiko,
- Statusdrift,
- zu viel Sonnet für mechanische Aufgaben,
- fehlende automatische Checks.

Die spätere Auswertung sollte nicht nur fragen:

```text
Hat die App am Ende eine gute Spec?
```

sondern auch:

```text
Wie viel davon war notwendig?
Wie viel davon war vermeidbar?
Wie machen wir App 2 schneller?
Was standardisieren wir?
Was darf nie wieder in einen Monolithen?
```

Der Tatort ist damit gesichert.
