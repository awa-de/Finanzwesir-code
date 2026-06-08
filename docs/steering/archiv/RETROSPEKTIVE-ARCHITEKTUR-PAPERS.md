# Retrospektive: Die Architektur-Papers (I-VIX) und die Phasen-Dokumente

**Datum:** 17.02.2026
**Anlass:** Vor Löschung der 14 Alt-Dokumente in `docs/Architektur-Papers/` und der 30 Phasen-Dokumente in `docs/Phasen/`
**Methode:** Systematische Archäologie durch alle Versionen, Abgleich gegen VX V12.0.0

---

## Die Zeitreise: 14 Dokumente in 74 Tagen

### Akt 1: Der Urknall (5. Dezember 2025 -- ein einziger Tag)

An **einem** Tag entstanden vier Dokumente plus zwei Kritiken. Whitepaper, Paper I, Paper II, Paper III "Platinum Master". Das ist der Tag, an dem Gemini die Architektur entlockt wurde.

Was hier passiert ist, ist bemerkenswert: Es wurde nicht einfach ein Dokument genommen und gesagt "das ist gut". Gemini hat geschrieben, dann wurden **Perplexity und ChatGPT als Gutachter** draufgesetzt. Drei KI-Modelle gegeneinander. Das ist eine echte Qualitätsmethode. In der Softwareentwicklung heißt das "Peer Review". Hier wurde es instinktiv mit KI-Modellen als Peers gemacht. Manche Entwicklerteams mit 10 Leuten machen das schlechter.

Paper III erreichte den Höchststand an Detail: A11y als Pflichtmethode, `dispose()` für Memory-Leak-Prävention, Sandbox-Mode für Fehlerresistenz, Input-Sanitization gegen XSS, Contract Validation, formale State Machine. Das war das am besten durchdachte Dokument der ganzen Reihe.

### Akt 2: Die stille Katastrophe (15. Dezember 2025)

Paper V "Polymorphic Era". Zehn Tage Pause, dann ein kompletter Neuaufbau. Gemini hat das Paper von Grund auf neu strukturiert -- neue KDRs, neuer Fokus auf die Polymorphe Datenhaltung (Time Series vs. Snapshot).

**Und dabei fielen vier substantielle Dinge unter den Tisch:** A11y, Security, dispose, Sandbox. Nicht böswillig, nicht absichtlich. Gemini hat beim Neuschreiben einfach nicht gegen die vorherige Version abgeglichen. Das ist das **zentrale Risiko bei KI-gestützter Dokumentation**: Jede "Neufassung" ist ein potenzieller Datenverlust, weil das Modell nicht automatisch prüft, was in der alten Version stand.

Das ist keine Gemini-Schwäche. Das passiert bei jedem LLM. Und es ist genau der Fehler, der am 17.02.2026 mit der Archäologie repariert wurde.

### Akt 3: Die schnelle Evolution (17.12. -- 19.12. -- 05.01.)

Paper VI, VII, VIII in schneller Folge. Jedes Paper fügte ein echtes KDR hinzu, das aus der Implementierungsarbeit entstand:
- VI: Container Queries (Responsive-Probleme)
- VII: Semantic Time (falsche Ticks)
- VIII: Zone Zero (Label-Überlappung)

Das ist die **beste Phase**. Hier entstand Architektur nicht am Reißbrett, sondern aus echten Problemen. Jedes KDR löst ein konkretes Problem, das beobachtet wurde.

### Akt 4: Die Konsolidierung (09.01. -- 13.01.)

VIX und VX sind fast identisch. Der Versionssprung (V3.0 auf V10.5.0 auf V11.0.0) zeigt, dass die Nummerierung aus dem Ruder lief -- aber inhaltlich war das die richtige Phase: Stabilisierung, kein neues Feature.

### Akt 5: The Complete Record (17.02.2026)

VX V12.0.0. Die verlorenen Prinzipien sind restauriert. Das Dokument ist zum ersten Mal vollständig.

---

## Die andere Zeitreise: 30 Phasen-Dokumente in 52 Tagen

Die Architecture Papers erzählen die Geschichte der *Spezifikation*. Die Phasen-Dokumente erzählen die Geschichte der *Implementierung*. Beides zusammen ergibt erst das vollständige Bild.

### Die Implementierungs-Chronologie

| Phase | Zeitraum | Was passierte | LLM |
|-------|----------|---------------|-----|
| P4.1 Data Layer | ~8. Dez 2025 | Scaffolding, Dateistruktur, erster Parser | Gemini |
| P6a Line Chart (v1+v2) | 10. Dez 2025 | Erste funktionierende Charts, Strategy Pattern | Gemini |
| P7 Bar Chart | 13.--16. Dez 2025 | Pivot-Logik, Ranking, "Staggered Growth"-Animation | Gemini |
| P8 Pie Chart | 16. Dez 2025 | Miller's Law, Calm UX, Event-Driven Drill-Down | Gemini |
| P4 Härtung | 8. Dez 2025 | Security (Sanitizer) + A11y (`getA11yData`), Übergabe-Dokumente | Gemini |
| P7 v2 (Zone Zero) | 5. Jan 2026 | Smart Curator für Kurzläufer, DIN-Diät, Rucksack-Pattern | -- |
| P8 v2 (Bar V2) | 5. Jan 2026 | Gleiches Datum wie P7 v2 -- parallele Arbeit | -- |
| P9 Tooltip | 5. Jan 2026 | Tooltip-Reparatur nach Umstellung auf lineare Zeitachse | -- |
| P10 Unified Resolver | 12. Jan 2026 | Security + Graceful Degradation + Config Cascade | -- |
| P11 Pie V2 | 9. Jan 2026 | Triple Exit, Drill-Down Payload | -- |
| Security Audits | 8.--13. Jan 2026 | Drei parallele Security-Dokumente | -- |
| Performance Audit | 13. Jan 2026 | Promise.all, CLS Prevention | -- |
| X-Achse Handover | 23. Jan 2026 | Sacred Rules, Red Flag Liste, 4K-Geometrie | Claude |
| Y-Achsen-Matrix | 20. Jan 2026 | Nice Numbers, Magnitude-Klassen, Screen-Zonen | -- |

### Die Zwei Vernichtungs-Reviews (der Wendepunkt)

Noch *vor* der Implementierung wurden zwei externe Architektur-Audits geschrieben -- und sie waren vernichtend. ChatGPT listete 10 gravierende Verstöße auf (Single Responsibility, Missing Data Layer, Framework Coupling, fehlende Testbarkeit). Gemini gab eine "7,5/10 Architektur-Note".

Der Clou: Die meisten kritisierten Punkte wurden in den folgenden Phasen gelöst. Strategy Pattern, Shared Services, Security, A11y-Stubs -- all das entstand als direkte Antwort auf diese Reviews. ChatGPT schlug sogar ein TypeScript-Interface `ChartStrategy { buildControls(), transformData(), getChartOptions() }` vor -- und genau das wurde (in JavaScript, nicht TypeScript) mit `BaseChartStrategy { transform(), getChartConfig(), getViewOptions(), getA11yData() }` realisiert. Die KI hat sich selbst korrigiert, über Modellgrenzen hinweg.

### Die Übergabe-Dokumente: Arme-Leute-Versionskontrolle

Zwei Dateien stechen heraus: `PROJEKT-ÜBERGABE FINANZWESIR CHARTS FUNKTIONIEREN.md` (17,5 KB) und `PROJEKT-ÜBERGABE FINANZWESIR HÄRTUNG FUNKTIONIERT.md` (29,6 KB). Das sind komplette "Projekt-Übergaben" zwischen Chat-Sessions. Sie enthalten einen System-Prompt, ein fachliches Briefing und -- den **kompletten Quellcode aller Dateien** als Inline-Code im Markdown.

Das ist die arme-Leute-Versionskontrolle: Weil zwischen Chat-Sessions kein Git-Zustand persistierte, wurde der gesamte Code in ein Markdown-Dokument kopiert und als Input für den nächsten Chat verwendet. 29,6 KB Quellcode, neun Dateien, in ein einziges Dokument gepackt. Der Weg von "Code in Markdown kopieren und in den nächsten Chat pasten" zu "Claude hat das Repo" ist der eigentliche Produktivitätssprung dieses Projekts.

### Die LLM-Instructions: Das Muster vor dem Muster

Drei Dateien (`LLM_INSTRUCTIONS_v5.md`, `v6`, `v7`) haben nichts mit der Chart-Engine zu tun. Sie beschreiben das Finanzwesir-Design-System für HTML-Seiten -- Tailwind-Klassen, Info-Boxen, Typografie-Hierarchie. Philosophie: *"No Jazz, just Bach."*

Was sie verraten: Das Pattern "KI steuern durch präzise Specs" existierte schon *vor* der Chart-Engine. Die CLAUDE.md ist die spätere, reifere Version desselben Instinkts. Die Fähigkeit, einem LLM strukturierte Anweisungen zu geben, wurde nicht beim Programmieren gelernt -- sie wurde beim Texten gelernt und dann auf Code übertragen.

### Die No-Regex-Policy und die Chat-Fenster-Ära

In den System-Prompt Coding Guidelines steht: *"NO-REGEX POLICY: Keine Regular Expressions. Nutze split, indexOf, substring."* Die Begründung: Regex geht beim Copy-Paste zwischen KI-Chat, Browser und Editor kaputt. Da war er wieder, der Copy-Paste-Workflow. Die Entwicklungsumgebung war buchstäblich ein Chat-Fenster. Die No-Regex-Policy war kein technisches Prinzip, sondern ein Workaround für die Fragilität dieser Umgebung. Sie wurde mit Claude Code obsolet -- der aktuelle CSVParser verwendet Regex.

Im gleichen Dokument: Alle Variablen am Funktionsanfang deklarieren, genannt *"Mise en Place"* (aus der Küche). Auch hier: technische Konzepte durch Alltagsmetaphern verankert. Das Muster zieht sich durch alles.

### Der "Sendung mit der Maus"-Stil

Jede einzelne Phase enthält ein "Management Summary" in einfacher Sprache. Buffet-Metapher für Pie Charts, Schweizer Taschenmesser für Line Charts, Fotoalbum vs. Weltrangliste für Bar Charts, Restaurant-Kellner für Performance, Mixer für Security. 30 Dateien, 30 Metaphern. Das ist das konsistenteste Muster des gesamten Projekts -- und es zeigt, dass Erklärbarkeit nicht Beiwerk war, sondern primäre Anforderung an die LLMs.

---

## Bewertung: Was wurde gut gemacht?

### 1. Multi-Modell-Triangulation

Gemini schreibt, Perplexity prüft, ChatGPT kritisiert. Das ist eine echte Qualitätsmethode. In der Softwareentwicklung heißt das "Peer Review". Hier wurde es instinktiv mit KI-Modellen als Peers gemacht.

### 2. Spec-First statt Code-First

Zuerst wurde beschrieben, *was* die Engine tun soll, bevor (via Gemini) der Code entstand. Das ist die professionellere Reihenfolge. Die meisten Hobby-Projekte fangen mit Code an und dokumentieren nie. Hier wurde das Gegenteil gemacht.

### 3. Metaphern als Architektur-Werkzeug

"Der Topf", "Der Rucksack", "Die Roboter", "Der Betriebsleiter" -- das klingt naiv, ist es aber nicht. Diese Metaphern haben eine reale Funktion: Sie erzwingen Klarheit. Wenn man sagt "der Roboter darf nicht in den Topf greifen", ist das eine präzisere Constraint als "Layer 3 darf Layer 1 nicht mutieren". Weil die Metapher die Absurdität eines Verstoßes sofort sichtbar macht. Das ist kein Laien-Trick, das ist ein bewährtes Kommunikationsprinzip (Lakoff: *Metaphors We Live By*).

### 4. Nicht beim ersten Ergebnis aufgehört

14 Versionen. Die meisten Leute hätten nach Paper II gesagt "reicht". Hier wurde immer weiter geschliffen.

### 5. Wissen, was man nicht weiß

Die KNOWN-ISSUES.md beginnt mit: *"Ich bin Fachanwender, kein Low-Level-Implementierer."* Das ist kein Mangel, das ist Stärke. Dokumentiert wird, was man sieht, nicht was man vermutet. Das verhindert Fehldiagnosen.

---

## Bewertung: Wo wurde Lehrgeld gezahlt?

### 1. Die Neufassung ohne Diff (der V2.0-Verlust)

Das war der teuerste Fehler. Nicht weil er schwer zu beheben war (er wurde in einer Session gefixt), sondern weil 10 Wochen lang nicht bekannt war, dass Security und A11y rausgefallen sind. **Lektion:** Wenn ein KI-Modell ein Dokument "neu schreibt", immer fragen: *"Was stand in der alten Version, das in der neuen fehlt?"*

### 2. Versionsnummern-Chaos

V1.4 -> V2.0 -> V2.1 -> V2.2 -> V3.0 -> V10.5.0 -> V11.0.0. Die Sprünge haben keine erkennbare Logik. Das macht es im Nachhinein schwer, die Evolution zu verstehen. **Einfache Regel:** Major.Minor (Breaking Change / Erweiterung). Ab V12.0.0 sauber hochzählen.

### 3. "Platinum Master" zu früh deklariert

Paper III (V1.3) trug den Titel "Platinum Master". Am selben Tag. Ein Dokument, das am gleichen Tag entsteht und den Titel "endgültige Fassung" bekommt, ist nie die endgültige Fassung. **Lektion:** "Final" ist ein gefährliches Wort. Besser: Datum + Versionsnummer, kein Superlativ.

---

## Empfehlungen: Wohin entwickeln?

### Mehr davon

**1. Instinkt für "kognitive Qualität".**
Argumentation mit Tufte, Nielsen, Krug, Cleveland, Few. Das ist kein Dekor -- das sind echte Qualitätskriterien, die den meisten Entwicklern fehlen. Ein Entwickler optimiert für "funktioniert". Hier wird optimiert für "wird verstanden". Das ist wertvoller. Es ist der USP als Nicht-Entwickler.

**2. Das Dreistufen-Modell (Verstehen -> Hinterfragen -> Absichern).**
Das ist die richtige Methode und sie wurde selbst entwickelt. Nicht ändern.

**3. Systematische Archäologie vor Löschungen.**
Bevor etwas gelöscht wird, wird systematisch geprüft. Das ist professionelles Informationsmanagement.

### Abgewöhnen

**1. Die Illusion der KI-Autonomie.**
Der Code kann nicht gelesen werden, aber das **Verhalten** kann geprüft werden. Die IST/SOLL-Beschreibungen bei den Y-Achsen-Bugs waren perfekt: "Ich sehe X, ich will Y." Diese Beschreibungen sind mächtiger als jede Code-Analyse, weil sie das Modell zwingen, den Fehler im eigenen Code zu finden. Was abzugewöhnen ist: Dem Modell "vertrauen", dass eine Neufassung vollständig ist. Immer die Prüffrage stellen: *"Was war vorher drin, das jetzt fehlt?"*

**2. Alles-auf-einmal-Tage.**
Der 5. Dezember war ein Marathon: 4 Papers + 2 Reviews an einem Tag. Das erzeugt Quantität, aber die Qualität leidet -- man verliert den Überblick. Besser: Ein Dokument pro Tag, eine Nacht drüber schlafen, am nächsten Tag mit frischen Augen die Kritik lesen.

---

## Welche Fragen hätten noch gestellt werden sollen?

Das sind die Fragen, die ein erfahrener Software-Architekt gestellt hätte und die in keinem der 14 Papers auftauchen:

### 1. "Was passiert, wenn etwas schiefgeht?" (Error Handling, Resilience)

Keines der Papers stellt systematisch die Frage: Was sieht der Nutzer, wenn die CSV kaputt ist? Wenn das Netz abbricht? Wenn Chart.js nicht lädt? Der Code hat tatsächlich Error Boundaries (try-catch in `_processContainer`), aber es war Zufall, nicht Architektur-Entscheidung. Die Frage *"Was ist der Worst Case für jeden Layer?"* hätte Security und Resilience von Anfang an verankert.

### 2. "Wie teste ich, ob es funktioniert?" (Teststrategie)

Kein Paper beschreibt, wie man die Engine testet. Pragmatisch gelöst (CSV laden, Chart anschauen, IST vs. SOLL vergleichen), aber eine explizite Frage nach Testbarkeit hätte geholfen. Nicht weil automatisierte Tests nötig sind, sondern weil die Frage *"Wie beweise ich, dass die Density Matrix korrekt ist?"* oft Design-Fehler aufdeckt, bevor sie passieren.

### 3. "Was sagt das Gesetz?" (Compliance)

A11y (Barrierefreiheit) war in Paper III drin -- als technische Empfehlung. Die Frage *"Gibt es gesetzliche Anforderungen an einen öffentlichen Blog?"* hätte zum BFSG geführt und A11y von "nice to have" zu "Pflicht" hochgestuft. Dann wäre es bei V2.0 nicht rausgeflogen.

### 4. "Was brauche ich in 6 Monaten nicht mehr, und was brauche ich dann dringend?" (Lifecycle-Planung)

Die Papers sind stark im Jetzt. Keine Frage lautet: "Wenn die Engine fertig ist und im Produktionsbetrieb läuft -- was brauche ich dann?" Antwort: Monitoring (Debug-Modus), Wartbarkeit (dispose, CSS-Variables), Onboarding (das Architecture Paper als Einarbeitung für andere). Genau das, was am 17.02.2026 nachgerüstet wurde.

### 5. "Zeig mir, wo im Code das steht." (Spec-Code-Abgleich)

Die Specs wurden geschrieben, aber nie systematisch gefragt: *"Zeig mir die Zeile im Code, die KDR 7 implementiert."* Diese Frage hätte den Drift zwischen Spec und Code früher aufgedeckt. Es ist die Frage, die bei der Archäologie am 17.02.2026 implizit gestellt wurde -- und die sechs Diskrepanzen aufgedeckt hat.

---

## Das Gesamtbild

Was hier gebaut wurde, ist ungewöhnlich. Ein Fachanwender ohne Programmier-Erfahrung hat über 14 Iterationen eine Architektur-Spezifikation entwickelt, die ein Senior-Architekt als "solide" bezeichnen würde. 5-Layer-Modell, Immutability, Unidirektionaler Datenfluss, Strategy Pattern, Context Object -- das sind keine Anfänger-Konzepte.

Der Preis war ein chaotischer Prozess (14 Versionen, 3 KI-Modelle, ein paar verlorene Prinzipien). Aber der Prozess hat funktioniert. Das Ergebnis -- VX V12.0.0 -- ist ein sauberes, vollständiges Architektur-Dokument.

Das größte Risiko für die Zukunft ist nicht mangelnde Kompetenz. Es ist mangelnde **Versionskontrolle für Spezifikationen**. Die Lektion von V2.0: Jede Neufassung muss gegen die Vorfassung geprüft werden. Das gilt für Code (Git Diff) genauso wie für Specs. Ab jetzt: Erst committen, dann ändern, dann diffen.

---

## Verschüttete Artefakte: Was in den Phasen-Dokumenten noch lag

Die Archäologie der 30 Phasen-Dokumente hat geprüft, ob substanzielle Ideen verschüttet wurden, die im aktuellen VX V12.0.0 fehlen. Ergebnis: Fast alles ist aufgegangen. Vier kleine Funde wurden in KNOWN-ISSUES.md als Feature-Ideen nachgetragen:

- **Zero-Line Hervorhebung:** Nulllinie dicker und dunkler als normale Gridlines (Quelle: y-achsen-matrix-spec.md §5.2)
- **Einheiten-Anker:** Einheit nur einmal über der Y-Achse statt an jedem Tick, besonders für Mobile (Quelle: y-achsen-matrix-spec.md §5.3)
- **Bedingte Animationen:** "Verluste fallen von oben, Gewinne wachsen von unten" (Quelle: Phase 7 ADR)
- **CLS Prevention:** `min-height: 400px` + `contain: content` für `.financial-chart-module` (Quelle: Performance Audit)

Ein Dokument verdient besondere Erwähnung: `DATA FLOW ARCHITECTURE FINANZWESIR.md` beschrieb als einziges den kompletten Lebenszyklus eines Datenpunkts von der CSV bis zum Pixel (`CSV: "10,5 %" → Vault: 10.5 + UNIT_PERCENT → Context: { mode: 'percent' } → Screen: "10,5 %"`). Dieser End-to-End-Blick fehlte im VX Paper, das die Layer einzeln beschreibt. Er wurde als **Appendix A: Die Reise eines Datenpunkts** in das Architecture Strategy Paper VX aufgenommen -- die Essenz des Originals, aktualisiert auf V12.0.0.

---

*Erstellt am 17.02.2026 als Abschluss der Archäologie-Session.*
*Erweitert am 17.02.2026 um die Archäologie der 30 Phasen-Dokumente in `docs/Phasen/`.*
*Beide Verzeichnisse -- `docs/Architektur-Papers/` und `docs/Phasen/` -- können nach dieser Retrospektive gelöscht werden.*
