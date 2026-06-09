# Projektchronik: Von OA-02 zur Archivstrategie
## Finanzwesir-code — Gesprächsfaden 07.–09. Juni 2026

**Dokumenttyp:** Archäologisch-historische Projektchronik  
**Zeitraum:** 07. Juni 2026 (ca. 13:00 CEST) bis 09. Juni 2026 (ca. 14:00 CEST)  
**Chronist:** Perplexity (auf Basis dieses Gesprächsfadens sowie der Projektdateien AP-3, AP-4 und Peer-Review-Briefing)  
**Zweck:** Rekonstruktion des Denkwegs, der Irrwege, der Beschlüsse und der Lernmomente — als Grundlage für eine spätere Projektauswertung und für die Übergabe an andere LLMs als Peer-Reviewer

---

## Lesehinweis

Dieses Dokument ist keine Zusammenfassung. Es ist eine Chronik — es erzählt, wie gedacht, entschieden, korrigiert und weitergegacht wurde. Es benennt explizit, was gut lief, was Zeit kostete und wo Abkürzungen möglich gewesen wären. Ziel ist nicht Schönfärberei, sondern historische Präzision.

---

## Überblick: Die drei Phasen dieses Fadens

| Phase | Thema | Zeitraum |
|---|---|---|
| **Phase 1** | OA-02: Architekturentscheidung Chart-Komponenten-Vertrag | 07. Juni 2026 |
| **Phase 2** | Mini-Spec + Download-Dokument als Peer-Review-Input | 07. Juni 2026 |
| **Phase 3** | Projektchronik anlegen (dieser Text) | 09. Juni 2026 |

---

## Phase 1 — Die OA-02-Entscheidung

### 1.1 Ausgangssituation und Auftrag

Der Faden begann mit einer mehrteiligen Aufgabe:

1. Verbinde dich mit dem GitHub-Repository `Finanzwesir-code`.
2. Gehe die letzten 10 Commits durch.
3. Analysiere und ordne den vorgelegten OA-02-Vorschlag von Claude (dem Haupt-LLM des Projekts).

Der Kontext war bereits dicht: Es lagen zwei konkurrierende LLM-Positionen vor — eine ausgearbeitete Empfehlung von Claude (C3 als richtige Wahl) und eine Gegenposition von ChatGPT (C2-Prinzip als einzig architekturkonsistente Lösung). Albert bat Perplexity explizit um eine Senior-FAANG-Engineer-Bewertung: *Wie zukunftsfähig ist das? Gibt es Doppelungen oder Inkonsistenzen?*

Das war ein bewusstes Vorgehen: Mehrere LLMs zu einem Architekturthema parallel befragen, um durch Reibung eine belastbarere Entscheidung zu erhalten. Das war methodisch richtig.

### 1.2 Was bereits entschieden war — und was Claude übersehen hatte

Kernbefund nach Commit-Analyse:

ADR-COMP-ARCH-01 (2026-06-05, Status: 🟢 entschieden) hatte bereits verbindlich festgestellt:

- App = Kompositionsfläche aus Komponenten
- ChartEngine = Single Source of Truth für Chart-Rendering
- Apps bauen Charts **nicht direkt** — sie nutzen die ChartEngine als Subsystem
- `fw-chart-engine/index.js` ist TABU (Auto-Start-Datei)

Entscheidend war Commit `b6b35c8a` (COMP-ARCH-01-Nachputz): Dieser Commit hatte 5 Dateien auf COMP-ARCH-01-Konsistenz gebracht und `C3/FwAppChart` bereits explizit als **veraltete Formulierung** markiert.

Claude hatte diesen Commit-Stand nicht korrekt berücksichtigt. Claudes Empfehlung „C3 ist die richtige Wahl" widersprach einem bereits committen Beschluss. Das war kein konzeptioneller Fehler Claudes — sondern ein klassisches Kontextdrift-Problem: Claude hatte einen historischen Arbeitsstand als aktuellen Entscheidungsrahmen behandelt.

### 1.3 Warum C3 falsch war — das Kernargument

Claudes Argument für C3: „0 Engine-Änderungen" — ChartEngine.js bleibt unberührt.

Der Gegenbefund: Das war der falsche Optimierungsparameter. Die relevante Frage war nicht *„Ändert sich ChartEngine.js?"*, sondern *„Bleibt ChartEngine die einzige Rendering-Pipeline?"*

C3 würde eine zweite Rendering-Pipeline aufbauen: `FwAppChart` würde selbst `LineChartStrategy` importieren, `strategy.transform()` aufrufen und `new Chart()` erzeugen — alles Dinge, die nur die ChartEngine tun sollte. Das wäre faktisch ein zweiter Orchestrator neben der ChartEngine.

Die echte ChartEngine macht heute weit mehr als Chart.js starten: Sie lädt und verwaltet Daten, wählt Strategien, erzeugt RuntimeConfig, ruft `strategy.transform()`, `getChartConfig()` und `getA11yData()` auf, merged Tooltip-Config, baut über den Renderer Struktur, A11y-Tabelle, Toolbar, Legende, BAN und Canvas, bindet Events und macht Smart Updates. Wer das außerhalb dupliziert, hat einen zweiten Weg — unabhängig davon, ob ChartEngine.js angefasst wurde.

### 1.4 Die korrekte Entscheidung: C2-Prinzip

Die zukunftsfähige Entscheidung war das C2-Prinzip:

> **Die ChartEngine erhält einen öffentlichen In-Memory-Einstieg für bereits normalisierte Chart-Daten.**

Konkreter Vertrag:
```
chartEngine.renderFromData(container, finanzwesirData, type, config)
chartEngine.updateFromData(handle, finanzwesirData, config)   ← Pflicht für Slider-UX
chartEngine.destroy(handle)
```

Optional darf ein reiner `FwChartDataAdapter` App-spezifische Serien in `FinanzwesirData` übersetzen — aber dieser Adapter rendert nicht. Er ist ein Datenübersetzer, kein zweiter Orchestrator.

Verboten bleibt:
- `new Chart()` außerhalb der ChartEngine
- direkter Import von Strategien in App-Code
- App-Code ruft private ChartEngine-Methoden auf
- Umbau von `fw-chart-engine/index.js` zur Export-Fassade

### 1.5 Die A11y-Lücke

Eine der drei Verifikationsfragen Claudes war berechtigt: `getA11yData()` existiert in `LineChartStrategy`, aber im Smart-Update-Pfad wird zwar `a11yData` neu berechnet, aber vermutlich nicht in den DOM geschrieben. Das war kein Argument gegen C2 — im Gegenteil: Die A11y-Korrektur muss in der zentralen Engine stattfinden, nicht verteilt in einer App-Klasse. C2 macht diese Lücke sichtbar und schließbar. C3 würde sie verschieben.

### 1.6 Was gut lief in Phase 1

- Die Commit-basierte Analyse war methodisch sauber: Erst den tatsächlichen Zustand des Repos verstehen, dann urteilen.
- Das Zwei-Ebenen-Argument (Architekturprinzip vs. Implementierungsoption) wurde klar getrennt.
- Die Fehldiagnose bei Claude wurde präzise benannt: falscher Optimierungsparameter, nicht falsches Konzept.

### 1.7 Was Zeit kostete

- Der Ausgangsprompt war sehr dicht: GitHub-Analyse, Commit-Review, Vorschlagsbewertung und Verbesserungsauftrag in einem. Das führte zu einer langen Antwort, die Albert zunächst selbst strukturieren musste.
- Claude hatte den OA-02-Vorschlag bereits stark ausgearbeitet — das erzeugte den Eindruck, es sei noch offen, obwohl Commit `b6b35c8a` bereits eine Vorfestlegung getroffen hatte.

---

## Phase 2 — Mini-Spec und Peer-Review-Dokument

### 2.1 Die Anfrage

Nach der OA-02-Entscheidung stellte Perplexity am Ende der Antwort implizit die Folgefrage: Soll jetzt eine konkrete Mini-Spec geschrieben werden — mit Kriterien, Ordnerstruktur, Naming-Konvention und Verschiebe-Workflow?

Albert antwortete: Ja. Und ergänzte eine wichtige Anforderung: Die Herleitung, die zu diesem Angebot geführt hat, soll 1:1 in das Dokument eingehen — nicht destilliert, sondern vollständig. Ziel: Das Dokument soll als Input für ein anderes LLM dienen, das denselben Kontext hat, aber frisch draufschaut. Peer Review durch ein weiteres LLM.

Das war methodisch konsequent: Architekturentscheidungen nicht durch Konsens eines einzigen LLMs absichern, sondern durch strukturierten Multi-LLM-Diskurs.

### 2.2 Was das Dokument enthielt

Das erzeugte Markdown-Dokument hatte zwei Hauptteile:

**Teil 1 — Herleitung (1:1):**  
Warum OA-02 schiefgelaufen ist. Das Zwei-Räume-Problem: In Claudes Vorschlag waren zwei Wissensebenen vermischt — strategischer Rahmen (COMP-ARCH-01) und historische Implementierungsoptionen (C1–C3 aus frühem Peer-Review). Der Analogie: Wie wenn ein Architekt während der Bauausführung einen frühen Entwurf als geltendes Pflichtenheft behandelt.

**Teil 2 — Mini-Spec:**  
- Zielbild: Zwei-Räume-Modell (Git vs. Archiv)
- Ordnerstruktur
- Naming-Konvention (`YYYY-MM-DD_<name>_HIST.md`)
- 5-Schritte-Verschiebe-Workflow
- `.gitignore`-Empfehlung
- Entscheidungsmatrix als Tabelle
- Langzeitperspektive: Archiv als Lernreservoir

### 2.3 Reflexion zu Phase 2

**Was gut lief:**  
Die explizite Anforderung „Herleitung 1:1 dazu" war ein kluger Schachzug. Ein Peer-Review-Dokument, das nur die Schlussfolgerungen enthält, ist ein schwacher Input. Ein Dokument, das den Denkweg zeigt, ermöglicht echte Kritik — das andere LLM kann an jedem Schritt ansetzen, nicht nur am Ergebnis.

**Methodische Beobachtung:**  
Albert verwendete in diesem Projekt bewusst mehrere LLMs in derselben Rolle: Claude als Haupt-Implementierer, ChatGPT und Perplexity als Peer-Reviewer. Das ist kein Redundanz-Fehler, sondern ein Qualitätssicherungsmuster. Jedes LLM hat andere Stärken bei der Musterkennung — drei verschiedene Blickwinkel auf denselben Architektur-Sachverhalt produzieren robustere Entscheidungen als ein einzelner Blickwinkel.

---

## Phase 3 — Die Archivchronik (dieser Text)

### 3.1 Die Anfrage

Am 09. Juni 2026 bat Albert um ein ausführliches Chronik-Dokument:

> „Wie sind wir vom Start des Fadens hier her gelangt? Welche Schritte, welche Irrungen und Wirrungen, welche Beschlüsse wurden gefasst, verworfen, angepasst. Sei ein Chronist. Schreibe ausführlich und strukturiert. Ziel ist es eine Datei zu haben, aus der ich dann wenn das Projekt abgeschlossen ist, ableiten kann, wie ich gearbeitet habe und natürlich auch welche Umwege ich mir in Zukunft sparen kann und wo ich richtig gut war."

Das ist die archäologisch-historische Komponente der Dokumentation. Es ist kein Protokoll (was wurde beschlossen), sondern eine Narration (wie wurde gedacht und entschieden).

### 3.2 Kontext aus den Projektdateien

Aus den hochgeladenen Projektdateien (AP-3, AP-4, Peer-Review-Briefing) wird der größere Rahmen sichtbar, in dem dieser Gesprächsfaden stattfand:

Das Finanzwesir-2.0-Projekt hatte bereits eine längere Geschichte hinter sich: Chart-Engine-Entwicklung, App-Fabrik, Design-System, Ghost-Integration, und — als Querschnittsthema — die Frage, wie der Wissensbestand des Projekts organisiert werden soll. Konkret: Wie verhindert man, dass historische Dokumente das aktive LLM-Arbeitsgedächtnis kontaminieren (Claude-Drift), und wie bewahrt man gleichzeitig die Entstehungsgeschichte für ein späteres Making-of?

Dieser Faden war also nicht nur eine Architektur-Session zu OA-02, sondern gleichzeitig Teil einer größeren Archivstrategie-Arbeit, die in mehreren Arbeitspaketen parallel lief:

- **AP 3** hatte das föderierte Archivmodell als Grundsatzentscheidung dokumentiert.
- **AP 4** hatte den Archivvertrag konkretisiert: Statuswerte (HIST, ERSETZT, POSTMORTEM, RAW), README-Schablone, Nicht-Routing-Regel für Claude.
- Das Peer-Review-Briefing hatte den strategischen Pivot formuliert: Das Archiv ist nicht nur Kontexthygiene, sondern auch Produktionsarchiv für das spätere Making-of von Finanzwesir 2.0.

---

## Entscheidungslog: Was wurde beschlossen, was verworfen?

### Beschlüsse

| Datum | Entscheidung | Status |
|---|---|---|
| 2026-06-05 | ADR-COMP-ARCH-01: ChartEngine = Single Source of Truth für Chart-Rendering | 🟢 Entschieden, committed |
| 2026-06-05 | Commit `b6b35c8a`: C3/FwAppChart als veraltete Richtung markiert | 🟢 Committed |
| 2026-06-07 | OA-02: C2-Prinzip — ChartEngine erhält öffentlichen In-Memory-Einstieg | 🟢 Empfohlen (Peer Review) |
| 2026-06-07 | `FwChartDataAdapter` als erlaubter reiner Datenübersetzer | 🟢 Empfohlen |
| 2026-06-07 | Mini-Spec mit Herleitung als Peer-Review-Dokument erzeugt | 🟢 Erledigt |
| 2026-06-09 | Projektchronik als archäologisch-historisches Dokument anlegen | 🟢 Dieser Text |

### Verworfene Optionen

| Option | Grund für Verwerfung |
|---|---|
| **C1** — direkt in `app.js` | Kein Vertrag, App kennt Engine-Interna, kein zentraler Lifecycle |
| **C3** — `FwAppChart` als eigenständige Rendering-Klasse | Zweiter Orchestrator, verletzt ADR-COMP-ARCH-01 — durch Commit `b6b35c8a` bereits de facto ausgeschieden |
| **C4** — DataSource-Abstraktion | Overengineering |
| **Export-Fassade über `index.js`** | Auto-Start-Datei, TABU |

### Angepasste Positionen

| Ausgangspunkt | Anpassung | Grund |
|---|---|---|
| Claude: „C3 ist die richtige Wahl" | Verworfen | Falscher Optimierungsparameter; widerspricht committed ADR |
| „0 Engine-Änderungen als Qualitätsmerkmal" | Korrigiert zu: „Einzige Rendering-Pipeline als Qualitätsmerkmal" | Die Frage ist nicht ob ChartEngine.js geändert wird, sondern ob sie die einzige Pipeline bleibt |
| C2-Optionsnummer aus historischem Peer-Review | Umbenannt zu: „C2-Prinzip" / „Public Chart Component API" | Historische Optionsnummern erzeugen falsche Kontinuität mit veralteten Diskussionen |

---

## Beobachtungen zur Arbeitsweise

### Was gut lief

**1. Commit-basierte Verifikation statt Textanalyse**  
Die Entscheidung, zuerst den tatsächlichen Git-Zustand zu prüfen, bevor Claudes Vorschlag bewertet wurde, war der wichtigste methodische Schritt. Ohne Commit `b6b35c8a` wäre C3 möglicherweise als offene Option behandelt worden. Mit dem Commit war klar: Die Diskussion war schon entschieden — Claudes Vorschlag arbeitete gegen einen committen Zustand.

**2. Multi-LLM-Peer-Review als Qualitätsmuster**  
Das Projekt nutzt mehrere LLMs nicht redundant, sondern komplementär: Claude implementiert, ChatGPT und Perplexity reviewen. Das ist ein strukturell kluges Vorgehen — jedes LLM bringt andere Gewichtungen bei der Mustererkennung mit. Claudes Tendenz, schnell in eine konkrete Option zu konvergieren, ist eine Stärke bei der Implementierung, aber ein Risiko beim Architektur-Review. Ein unabhängiger Reviewer, der denselben Commit-Verlauf mit anderem Fokus liest, detektiert Drifts, die der Implementierer übersieht.

**3. Präzise Fehlerbenennung**  
Die Formulierung „Claudes Fehler ist präzise: Er optimiert auf den falschen Parameter" ist methodisch besser als „Claude liegt falsch". Sie benennt den Mechanismus des Fehlers — das ist für ein späteres Making-of viel nützlicher als eine bloße Fehlerliste.

**4. Herleitung als Dokumentationspflicht**  
Die Entscheidung, die Herleitung 1:1 in das Peer-Review-Dokument aufzunehmen, war richtig. Destillierte Schlussfolgerungen ohne Denkweg sind für andere LLMs schwacher Input. Volle Transparenz des Argumentationswegs ermöglicht echte Kritik an den Schritten, nicht nur an den Ergebnissen.

### Was Zeit kostete — lernreiche Umwege

**1. Dichte Startprompts**  
Der erste Prompt dieses Fadens enthielt: GitHub verbinden, 10 Commits durchgehen, Vorschlag analysieren, Senior-Engineering-Urteil fällen, Inkonsistenzen identifizieren, ChatGPT-Gegenposition einarbeiten — alles in einem. Das führte zu einer sehr langen Antwort. Effizienter wäre gewesen: erst den Commit-Befund als eigenständigen Schritt, dann die Bewertung. In einem iterativen Multi-Turn-Dialog entstehen belastbarere Antworten als in einem Alles-auf-einmal-Prompt.

**2. Claude-Drift als Strukturproblem, nicht als Einzelfehler**  
Claudes Fehler bei OA-02 (historischen Peer-Review-Stand als aktuellen Entscheidungsrahmen behandeln) ist kein Ausrutscher — es ist ein strukturelles Muster bei LLMs in Lang-Projekten. Je länger ein Projekt läuft, desto größer das Risiko, dass ein LLM auf historisches Material als aktuelle Wahrheit trifft. Das ist der eigentliche Grund, warum das Archivprojekt (AP 3–4) und die OA-02-Entscheidung in diesem Faden zusammentreffen: beides sind Antworten auf dasselbe Grundproblem.

**3. Optionsnummern schaffen falsche Kontinuität**  
Die Bezeichnungen C1, C2, C3, C4 aus dem historischen Peer-Review wurden im neuen OA-02-Kontext wiederverwendet, obwohl sich der Entscheidungsrahmen zwischenzeitlich durch COMP-ARCH-01 fundamental geändert hatte. Die Nummern suggerierten eine Kontinuität des Entscheidungsraums, die nicht mehr existierte. Lösung: Optionsnummern aus historischen Reviews nicht in neue Entscheidungsdokumente übernehmen, sondern neu benennen — „C2-Prinzip" statt „Option C2".

---

## Der größere Rahmen: Wohin dieser Faden gehört

### Im Archiv-Kontext

Dieser Faden ist — aus der Perspektive der AP 3/AP 4-Archivstrategie — klassisches Material für:

- `Archiv/making-of/05_ki-workflow-und-projektsteuerung.md` ← Multi-LLM-Peer-Review-Pattern
- `Archiv/making-of/02_chart-engine.md` ← OA-02-Entscheidungsweg
- `Archiv/material/peer-reviews/` ← das erzeugte Peer-Review-Briefing-Dokument

Die Chronik selbst (dieser Text) gehört nach:
- `Archiv/making-of/` oder `Archiv/material/projektsteuerung/` als kuratierter Beleg

Die rohen Gesprächsprotokolle (LLM-Dumps) gehören nach:
- `Archiv/local/` — gitignored, nicht in den aktiven Kontext

### Im Making-of-Kontext

Aus Sicht des späteren Making-of sind die wichtigsten Erkenntnisse dieses Fadens:

1. **Commit-Stand vor LLM-Empfehlung prüfen.** Ein LLM kann nur so gut sein wie der Kontext, den es bekommt. Wenn der Kontext veraltete Stände enthält, entstehen veraltete Empfehlungen — unabhängig von der Qualität des LLMs.

2. **Multi-LLM-Peer-Review ist kein Luxus, sondern Qualitätssicherung.** Für Architekturentscheidungen mit mittlerer bis hoher Tragweite ist es sinnvoll, mindestens zwei unabhängige LLM-Perspektiven zu haben. Die Kosten sind gering, das Sicherheitsnetz ist real.

3. **Archivstrategie und Implementierungsarbeit sind keine getrennten Themen.** Claude-Drift bei OA-02 war das Symptom. Das föderierte Archivmodell (AP 3/AP 4) ist die strukturelle Antwort. Beide gehören zusammen — das Archiv schützt die Qualität der zukünftigen Implementierungsarbeit.

---

## Offene Punkte nach diesem Faden

| Punkt | Beschreibung | Priorität |
|---|---|---|
| OA-02 formal als ADR committen | Das C2-Prinzip als ADR in die Steuerdateien aufnehmen | Hoch |
| A11y-Update-Pfad in ChartEngine prüfen | `getA11yData()` im Smart-Update-Pfad: wird das Ergebnis in den DOM geschrieben? | Hoch (vor Slice 4) |
| Slider-UX-Test | `chart.destroy()` + `new Chart()` vs. `chart.data.datasets[0].data = …; chart.update()` bei 120 Datenpunkten + ~100ms Debounce | Hoch (vor Slice 4) |
| AP 5 — Archiv-Inventar | Alle vorhandenen Themeninseln erfassen und klassifizieren | Mittel |
| Dieses Dokument ins Archiv überführen | Status: HIST, nach `Archiv/material/projektsteuerung/` | Nach Commit |

---

## Abschlusswort des Chronisten

Dieser Faden war ein verdichtetes Beispiel dafür, wie produktiv die Kombination aus Commit-Analyse, ADR-Pflege und Multi-LLM-Review sein kann — und wie schnell ohne diese Disziplin ein LLM auf veralteten Entscheidungsrahmen landet und trotzdem überzeugend klingt.

Der wichtigste Satz, den man aus diesem Faden mitnehmen kann, ist nicht eine technische Entscheidung. Er ist ein Arbeitsprinzip:

> **Ein LLM ist so aktuell wie sein Kontext. Git ist die Wahrheit. Commits schlagen Empfehlungen.**

Oder kürzer: Erst den Repo-Stand prüfen, dann das LLM befragen.

---

*Chronik erstellt: 09. Juni 2026 — Perplexity*  
*Dokumentstatus: HIST (für Archivierung nach Abschluss-Commit)*  
*Archiv-Zielort: `Archiv/material/projektsteuerung/` oder `Archiv/making-of/`*
