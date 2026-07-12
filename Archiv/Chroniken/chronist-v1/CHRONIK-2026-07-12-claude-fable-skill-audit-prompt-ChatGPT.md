---
chronik_id: CHRONIK-2026-07-12-claude-fable-skill-audit-prompt-ChatGPT
datum: 2026-07-12
projekt: finanzwesir-code
thema: claude-fable-skill-audit-prompt
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: prompt-erstellung
status_am_ende: abgeschlossen
quellenlage: mit-anhaengen
schlagworte: [missverstandene-anforderung, richtungswechsel, konzept-vs-umsetzung, annahme-verworfen]
---

# Chronik: Prüfung und Erweiterung eines Claude-Fable-Prompts zur Skill-Optimierung

**Hauptgegenstand:** Der Faden behandelte die Frage, ob ein im Internet vorgeschlagener Prompt für Claude Fable geeignet war, um die bestehende Skill-Bibliothek im Repository `Finanzwesir-code` zu prüfen und gezielt zu verbessern. Im weiteren Verlauf wurde der Prompt um empirische Nutzungs- und Kostendaten ergänzt, insbesondere zu `abschluss-ritual` und `start`.

## Ausgangslage

Der Nutzer legte einen englischsprachigen Prompt vor, der Claude Fable in zwei Phasen arbeiten lassen sollte. Phase 1 sollte alle Skills auflisten, nach Verbesserungspotenzial bewerten und priorisieren. Phase 2 sollte nur die drei bis fünf höchstbewerteten Skills vollständig als neue `SKILL.md`-Dateien ausarbeiten, die Originale nicht überschreiben und zusätzlich höchstens zwei Lücken für neue Skills benennen.

Als Projektkontext wurde das Repository `Finanzwesir-code` genannt. Der Nutzer verlangte zunächst eine Bewertung auf Deutsch.

## Chronologischer Verlauf

### Erste Lesart: Prüfung des Repos und seiner Skills

Zu Beginn wurde der Auftrag so verstanden, dass die vorgeschlagene Methode anhand der realen Skill-Struktur des Repositories bewertet werden sollte. Dazu wurden Repo-Dateien und bestehende Steuerungsregeln herangezogen. Dabei wurde sichtbar, dass die Skill-Bibliothek nicht isoliert stand, sondern einer Autoritätshierarchie aus `CLAUDE.md`, `NAVIGATION.md`, Spezifikationen, Commands und Skills unterlag.

Diese erste Lesart führte dazu, dass die Antwort bereits stark in Richtung eines konkreten Audit- und Rewrite-Verfahrens für das Repository ging.

### Präzisierung des eigentlichen Auftrags

Der Nutzer stellte daraufhin klar, dass ChatGPT die Skills nicht selbst verbessern sollte. Gegenstand war ausschließlich die Qualität des Prompts, den Claude Fable später ausführen sollte.

Damit änderte sich die Richtung: Nicht die Skill-Inhalte selbst, sondern die Tauglichkeit des Arbeitsauftrags an Fable wurde zum Prüfgegenstand.

### Bewertung des Internetprompts

Der Prompt wurde als konzeptionell brauchbar, aber für das Repository noch nicht hinreichend abgesichert eingeordnet. Als tragfähige Elemente wurden festgehalten:

- Audit vor Rewrite,
- Begrenzung auf wenige Skills,
- Erhalt der Originale,
- vollständige Ersatzdateien mit Changelog,
- Zurückhaltung bei neuen Skills.

Daneben wurden mehrere Lücken benannt:

- kein verbindliches Lesen der Repo-Governance,
- kein harter Stopp zwischen Phase 1 und Phase 2,
- unklare Definition dessen, was als Skill zählt,
- keine operationalisierte Bewertungsgrundlage für „actual output“,
- faktischer Zwang, drei bis fünf Skills umzuschreiben,
- Widerspruch zwischen „drop-in replacement“ und „v-next filename“,
- fehlende Tests,
- unklare Quelle der „voice rules“,
- Gefahr unnötiger Aufblähung durch Beispiele,
- ein Schlupfloch zum ungefragten Bau neuer Skills,
- eine Rollenmetapher, die zu übermäßigem Bereinigungsdrang führen konnte.

### Entwicklung einer belastbareren Fable-Fassung

Daraufhin wurde ein ausführlicherer Prompt formuliert. Dieser setzte unter anderem fest:

- Phase 1 blieb vollständig lesend,
- Phase 2 durfte erst nach expliziter Freigabe beginnen,
- die Repo-Hierarchie war bindend,
- aktive Skills wurden zunächst als `.claude/skills/*/SKILL.md` definiert,
- lose Dateien wurden separat als Governance- oder Prozessdokumente behandelt,
- jeder Skill wurde auf Wirkung, Risiko, Rewrite-Potenzial, Routing, Testbarkeit, Konflikte, Token-Effizienz und Änderungsrisiko geprüft,
- Empfehlungen konnten auch `KEEP`, `SURGICAL EDIT`, `MERGE CANDIDATE`, `SPLIT CANDIDATE`, `RETIRE CANDIDATE` oder `MOVE RESPONSIBILITY CANDIDATE` lauten,
- maximal fünf Skills waren eine Obergrenze, keine Quote,
- neue Fassungen sollten außerhalb des aktiven Skill-Verzeichnisses abgelegt werden,
- Tests, Verlustprüfung, Referenzprüfung und Tokenvergleich wurden verlangt,
- neue Skills durften nur spezifiziert, nicht gebaut werden.

### Ergänzung empirischer Nutzungsdaten

Der Nutzer brachte anschließend einen Nutzungsreport ein. Daraus gingen insbesondere folgende Werte hervor:

- `abschluss-ritual`: 575 Aufrufe, rund 21 Prozent der gesamten Nutzung,
- `start`: 141 Aufrufe, rund 3 Prozent,
- 88 Prozent der Nutzung bei mehr als 150.000 Kontext-Tokens,
- 68 Prozent der kalibrierten Tokens aus Tool-Ergebnissen,
- 58,8 Prozent allein durch `Read`,
- weitere Anteile durch `Bash`, `Grep`, `Agent`, `Edit`, `PowerShell`, `Glob` und andere Tools.

Der Nutzer fragte, ob dieser vollständige Report separat an Fable gegeben oder direkt in den Prompt eingebaut werden sollte.

### Verdichtung der Kostendaten

Es wurde festgelegt, die Nutzungsdaten in verdichteter Form in den Prompt einzubauen. Der vollständige Rohdump mit UUIDs, Sessiontiteln und unstrukturierten Zeilen sollte nicht Bestandteil des Hauptprompts werden.

Die Kostenfrage wurde dabei erweitert. Nicht nur die Länge einer `SKILL.md`, sondern die gesamte durch einen Skill ausgelöste Kostenkette sollte untersucht werden:

- statische Promptkosten,
- Aufruffrequenz,
- Leseverstärkung,
- Wiederholungslesen,
- Delegationskosten,
- Modellwahl,
- Ausgabe- und Schreibkosten,
- Wechselwirkung mit langen Sessions,
- sachlich notwendige Sicherheits- und Kontinuitätskosten.

Für `abschluss-ritual` und `start` wurde eine verpflichtende Detailanalyse vorgesehen. Fable sollte beide unabhängig von Ablageort oder technischer Klassifikation finden und ihre vollständigen Ausführungsketten verfolgen.

## Wendepunkte

Der erste Wendepunkt entstand durch die Klarstellung des Nutzers, dass nicht die Skills selbst, sondern ausschließlich der Prompt für Claude Fable bewertet werden sollte. Dadurch wurde aus einer beginnenden Repo-Analyse eine Promptprüfung.

Der zweite Wendepunkt entstand durch die Nutzungsdaten. Der Gegenstand erweiterte sich von redaktioneller Skill-Qualität auf tatsächliche Betriebskosten und durch Skills ausgelöste Lese- und Delegationsketten.

Ein weiterer Richtungswechsel bestand darin, hohe Kosten nicht automatisch als Qualitätsmangel zu behandeln. Für `abschluss-ritual` wurde ausdrücklich festgehalten, dass hohe Kosten teilweise durch start- und steuerungskritische Aufgaben begründet sein konnten.

## Entscheidungen und Festlegungen

- Der Internetprompt wurde nicht unverändert übernommen.  
  Zeitpunkt: nach der Präzisierung des Auftrags.  
  Zusammenhang: Für das Repository fehlten Governance, Freigabegates, Tests und klare Scope-Regeln.  
  Status am Ende: gültig.

- Zwischen Phase 1 und Phase 2 sollte ein harter Freigabestopp stehen.  
  Zeitpunkt: bei der Überarbeitung des Fable-Prompts.  
  Zusammenhang: „Give me the ranked list before writing anything“ verhinderte keine unmittelbare Fortsetzung.  
  Status am Ende: gültig.

- Drei bis fünf Rewrites wurden als Obergrenze, nicht als Pflichtzahl definiert.  
  Zeitpunkt: bei der Überarbeitung des Audit-Verfahrens.  
  Zusammenhang: Unnötige Rewrites sollten vermieden werden.  
  Status am Ende: gültig.

- Entwürfe sollten außerhalb von `.claude/skills/` liegen und dort weiterhin `SKILL.md` heißen.  
  Zeitpunkt: bei der Klärung von „drop-in replacement“ und „v-next filename“.  
  Zusammenhang: Doppelte aktive Skills und inkompatible Dateinamen sollten vermieden werden.  
  Status am Ende: gültig.

- Die verdichteten Nutzungsdaten sollten fest in den Fable-Prompt eingebaut werden.  
  Zeitpunkt: nach Vorlage des Usage-Trackings.  
  Zusammenhang: Sie veränderten Priorisierung und Prüfgegenstand substanziell.  
  Status am Ende: gültig.

- Der vollständige Rohdump sollte höchstens als Anlage dienen.  
  Zeitpunkt: am Ende der Kostendiskussion.  
  Zusammenhang: UUIDs und Sessionnamen trugen wenig zur Skill-Optimierung bei.  
  Status am Ende: gültig.

- `abschluss-ritual` und `start` mussten unabhängig von ihrer technischen Einordnung vollständig geprüft werden.  
  Zeitpunkt: nach Einordnung der Kostenwerte.  
  Zusammenhang: Ein reiner Glob auf `.claude/skills/*/SKILL.md` hätte wichtige Einstiegspunkte auslassen können.  
  Status am Ende: gültig.

## Irrwege, Schleifen und verworfene Ansätze

Zu Beginn wurde der Auftrag zu nah an einer tatsächlichen Verbesserung der vorhandenen Skills gelesen. Diese Richtung wurde nach der Klarstellung des Nutzers verlassen. Die bereits eingesehene Repo-Struktur blieb danach als Grundlage für die Promptbewertung relevant.

Die Annahme, hohe Kosten eines Skills ließen sich vor allem durch Kürzen seiner Textdatei reduzieren, wurde nicht übernommen. Stattdessen wurde die vollständige Ausführungskette zum Prüfgegenstand gemacht.

Der Gedanke, den vollständigen Usage-Export direkt in den Hauptprompt aufzunehmen, wurde verworfen. Er wurde durch eine verdichtete Evidenzsektion ersetzt.

## Erzeugte Artefakte

- Überarbeiteter Claude-Fable-Prompt – vollständiger, zweiphasiger Audit- und Rewrite-Auftrag mit Governance-, Scope-, Test- und Freigaberegeln – Status am Ende: Entwurf.
- Ergänzungsblock „Empirical usage and cost evidence“ – verdichtete Nutzungsdaten und verpflichtende Kostenanalyse für `abschluss-ritual` und `start` – Status am Ende: Entwurf.
- Kurzer Zusatzsatz zur Pflichtprüfung der beiden benannten Einstiegspunkte unabhängig vom Glob – Status am Ende: Entwurf.

## Sachliche Erkenntnisse

Gesicherter Stand: `abschluss-ritual` war im vorgelegten 30-Tage-Report mit 575 Aufrufen und rund 21 Prozent der Nutzung der teuerste benannte Skill.

Gesicherter Stand: `start` war mit 141 Aufrufen und rund 3 Prozent der zweitwichtigste ausdrücklich benannte Prüfgegenstand.

Gesicherter Stand: Der größte ausgewiesene Kostenblock lag nicht bei den Nutzerprompts, sondern bei Tool-Ergebnissen und insbesondere bei `Read`.

Arbeitsannahme: Ein erheblicher Teil der Skill-Kosten konnte aus breit angelegten oder wiederholten Datei-Lesevorgängen, Delegation und langen Kontexten entstehen.

Offene Frage: Welche Anteile der Kosten des `abschluss-ritual` unvermeidbar waren und welche durch Ablaufänderungen reduziert werden konnten, musste Fable anhand der realen Ausführungskette bestimmen.

Spätere Korrektur: Die ursprüngliche Betrachtung eines Skill-Rewrites als primär textlicher Aufgabe wurde um Betriebs-, Lese-, Routing- und Modellkosten erweitert.

## Offene Punkte am Ende

— keine im Faden erkennbar —

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Der Auftrag wurde erst durch eine explizite Abgrenzung zwischen „Prompt prüfen“ und „Skills selbst verbessern“ eindeutig.

Für spätere Musteranalyse vormerken: Nutzungsdaten veränderten den Prüfgegenstand von Textqualität zu Prozesskosten und Ausführungsketten.

Für spätere Musteranalyse vormerken: Hohe Kosten wurden nicht automatisch mit schlechter Gestaltung gleichgesetzt; notwendige Sicherheits- und Kontinuitätsarbeit blieb als eigener Kostenblock sichtbar.

Für spätere Musteranalyse vormerken: Ein grober Repo-Glob reichte nicht aus, wenn wichtige Einstiegspunkte technisch als Commands, Skills, Agenten oder verkettete Abläufe umgesetzt sein konnten.

## Bewusst ausgelassen

Ausgelassen wurden einzelne Tool-Aufrufe, technische Abruffehler, UUIDs des Usage-Exports, Sessionnamen ohne Einfluss auf den Verlauf sowie Wiederholungen der bereits festgelegten Promptregeln.
