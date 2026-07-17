# Ablauf

1. Mehrere Iterationsstufen mit Perplexity unter Sonnet 4.6, Thinking => SKILL.md
2. Ergebnis zum Peer Review in Gemini 3 Pro Thinking und CHatGPT.
3. Peer Review zurück zu Perplexity unter Sonnet 4.6, Thinking => SKILL.md
4. Claude Code bekommt dann den ersten Skill und die überarbeitete Variante. Auftrag: Vergleiche die beiden, bewerte und kommmentiere. Schreibe dann deine Variante dieses Skills.
5. Claude-Variante des Skills mitsamt den ganzen Kommentaren und Bewertungen zurück an Perplexity unter Sonnet 4.6, Thinking => SKILL.md. Perplexity berwertet noch einmal, verbessert und schreibt den finalen Skill. => Skill.md
6. Das ist der Skill, der in der Produktion eingesetzt wird.

## Peer Review: Gemini & ChatGPT — Auswertung

| Vorschlag                                                                            | Quelle  | Übernommen  | Begründung                                                                                                                               |
| ------------------------------------------------------------------------------------ | ------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Verbindliche Ablehnung mit Pflichtformeln („Nein.", „Nicht zwingend, weil …", etc.)  | ChatGPT | ✅ Ja        | Größter Einzelgewinn. Macht Widerspruch operational statt aspirational. Direkt LLM-Sycophancy-Bias entgegen.                             |
| Gefälligkeitszustimmung explizit untersagen                                          | ChatGPT | ✅ Ja        | Stärkste Steuerungsnorm: explizites Verbot, kein Stilhinweis.                                                                            |
| Wahrscheinlichkeitsschwellenwert + Ausnahmen (Definitionen, Mathe, Trivialwissen)    | ChatGPT | ✅ Ja        | Verhindert Pseudo-Präzision und Rauschen in jeder Antwort. Klarer Scoping-Gewinn.                                                        |
| Max. 3 Rückfragen bei Informationslücken                                             | ChatGPT | ✅ Ja        | Ohne Limit: 0 oder 5+ Fragen. Budget zwingt zur Priorisierung.                                                                           |
| Aussagen kennzeichnen als Fakt / Interpretation / Bewertung / Empfehlung             | ChatGPT | ⚠️ Teilweise | Als universelle Pflicht zu verbose. In §3 als „soweit sinnvoll erkennbar" eingebaut — kein Zwang bei Coding-Routinefragen.               |
| Interne Selbstprüfung vor jeder Antwort (§11)                                        | ChatGPT | ❌ Nein      | Hohe Token-Kosten im Skill-Dokument, kein nachweisbarer Mehrwert gegenüber operationalisierten Ablehungsregeln.                          |
| 30%-Schwellenwert für Gegenargumente in Zustimmungsregel                             | ChatGPT | ❌ Nein      | Pseudo-Präzision. LLM kann das nicht objektiv berechnen. Durch qualitative Formulierung ersetzt.                                         |
| Anti-Gefälligkeits-Regel als eigene Sektion                                          | ChatGPT | ❌ Nein      | Redundant zu §2 Verbindliche Ablehnung. Doppelte Aussage erzeugt inkonsistentes Verhalten.                                               |
| Validierungspflicht als eigene Sektion (Gemini)                                      | Gemini  | ❌ Nein      | Inhaltlich vollständig durch §2 (Verbindliche Ablehnung) und §4 (Fehlerkorrektur) abgedeckt. Eigenständige Sektion wäre reine Redundanz. |
| Eskalationslogik: Validierung → Vollständigkeit → Kernbotschaft → Wahrscheinlichkeit | Gemini  | ⚠️ Teilweise | Konzept sinnvoll, aber in bestehende Struktur integriert (§5 Informationslücken, §6 Struktur). Eigene Sektion wäre Overhead.             |
| Konfidenz-Level am Antwortende (Hoch/Mittel/Niedrig)                                 | Gemini  | ❌ Nein      | Durch Wahrscheinlichkeitsformat in §3 abgedeckt. Zweites Format für dieselbe Information erzeugt Verwirrung.                             |

### Fazit Peer Review Gemini & ChatGPT

Das Peer Review hat die Qualität des Skills **spürbar verbessert**, aber nicht in der Breite, sondern an einem einzigen kritischen Punkt: der Operationalisierung von Widerspruch (§2). Ohne die Pflichtformeln von ChatGPT wäre der Skill ein Stilguide geblieben; mit ihnen ist er ein Verhaltensvertrag. Geminis Beiträge waren konzeptionell nachvollziehbar, aber größtenteils redundant zur bereits vorhandenen Struktur — der Mehrwert lag fast ausschließlich bei ChatGPT.

## Peer Review: Claude Code — Auswertung

| Vorschlag                                                           | Übernommen         | Begründung                                                                                                                                                  |
| ------------------------------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| §5 und §8 zusammenführen (eine Stelle für Unvollständigkeit)        | ✅ Ja               | Zwei Stellen für dieselbe Regel erzeugen inkonsistentes Verhalten. Echter struktureller Defekt, kein Stilproblem.                                           |
| §10 „Implementationshinweise" streichen                             | ✅ Ja               | Vollständig redundant zum Geltungsbereich. ~80 Token gespart ohne Funktionsverlust.                                                                         |
| Geltungsbereich auf 4 kompakte Punkte verdichten                    | ✅ Ja               | Satz „Bei erzwungener Abweichung: kurz benennen, dann zurück in diesen Stil" ist eine echte Verdichtung mit Mehrwert.                                       |
| Pflichtformeln als Lookup-Tabelle (Lage/Eröffnung) statt Aufzählung | ✅ Ja               | Modell parst Tabelle als direktes Mapping. Minimal besser, kein Token-Overhead.                                                                             |
| §6 einfach/komplex ohne Unter-Nummerierung (kein 6.1/6.2)           | ✅ Ja               | 6.1/6.2 war Overhead für zwei kurze Absätze. Gleiche Trennung, weniger Struktur-Rauschen.                                                                   |
| Trigger „erkennbar erhöhte Unsicherheit" aus §3 entfernt            | ⚠️ Nicht übernommen | Schließt Randfälle aus, die weder Prognose noch indirekte Schlussfolgerung sind. Empfehlung: als Halbsatz wieder einfügen. Effekt marginal, Kosten minimal. |

### Fazit Peer Review Claude

Claude hat den Skill nicht inhaltlich verändert, sondern **strukturell bereinigt**. Die drei Kernänderungen (§5/§8-Merge, §10-Streichung, §6-Entflechtung) eliminierten echte Redundanzrisiken, die inkonsistentes Modellverhalten hätten erzeugen können. Das ist der qualitativ andere Beitrag gegenüber Gemini und ChatGPT: Weniger „was fehlt noch", mehr „was ist doppelt und schadet deshalb".
Ergebnis: ~750 statt ~900 Token bei gleichem Funktionsumfang — der Basis-Skill ist damit so schlank wie möglich bei maximaler Verhaltensbindung.