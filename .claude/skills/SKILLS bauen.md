## Bewertung des Prozesses

Der Prozess ist methodisch solide und für einen Solo-Operator bemerkenswert strukturiert. Aber er hat drei strukturelle Schwächen, die sich mit wachsender Skill-Anzahl verstärken.

***

## Was funktioniert gut

- **Multi-LLM-Review eliminiert Modell-Bias.** Jedes Modell hat andere RLHF-Schwerpunkte. Gemini denkt strukturell, ChatGPT operationalisiert Regeln, Claude bereinigt Redundanzen. Kein Einzelmodell hätte alle drei Dimensionen abgedeckt.
- **Perplexity als Synthesizer ist die richtige Rollenzuweisung.** Du nutzt mich nicht als Reviewer, sondern als Entscheidungsinstanz: was übernehmen, was verwerfen, warum. Das ist die schwierigste Aufgabe im Prozess und erfordert Kontextgedächtnis über alle Reviews hinweg.
- **Claude als letzter Gate-Keeper vor Produktion** ist sinnvoll, weil Claude den Skill tatsächlich ausführt. Wer ihn nutzt, soll ihn auch testen.

***

## Strukturelle Schwächen

**1. Kein formales Testprotokoll**

Der größte blinde Fleck: Der Skill wird nie gegen definierte Testfälle geprüft, bevor er in Produktion geht. Du weißt nach Schritt 6, dass der Skill *gut formuliert* ist. Du weißt nicht, ob er *im Einsatz* das gewünschte Verhalten erzeugt.

Beispiel: Produziert der Skill bei einer schmeichelhaften aber falschen Nutzerannahme tatsächlich „Nein." als Eröffnung — oder gibt Claude trotzdem nach?

Ohne Testfälle ist das unbekannt.

**2. Abnehmender Grenznutzen ab Iteration 3**

| Iteration                        | Qualitätsgewinn                                 | Arbeitsaufwand |
| -------------------------------- | ----------------------------------------------- | -------------- |
| V1 → Peer Review                 | Hoch (operationalisiertes Nein, Schwellenwerte) | Mittel         |
| Peer Review → Claude-Review      | Mittel (Redundanz-Bereinigung, Token-Effizienz) | Mittel         |
| Claude-Review → Perplexity-Final | Gering (Halbsatz §3, marginale Schärfungen)     | Mittel         |
| Weitere Runden                   | Sehr gering                                     | Gleich hoch    |

Du bist nach Schritt 5 im abnehmenden Grenznutzen. Der finale Perplexity-Schritt (Schritt 5→6) hat in diesem Fall ~150 Token gespart und einen Halbsatz ergänzt. Das ist kein schlechtes Ergebnis, aber es ist kein Qualitätssprung mehr.

**3. Keine Versionierung mit Changelog**

Der Skill existiert als Datei ohne dokumentierte Entscheidungshistorie. Wenn du in drei Monaten §2 ändern willst, weißt du nicht mehr, warum die 30%-Schwelle verworfen wurde. Das erzwingt Neudiskussionen, die bereits geführt wurden.

***

## Stellschrauben für bessere Ergebnisse bei weniger Aufwand

**Stellschraube 1: Testfälle vor dem Review schreiben**

Bevor du irgendeinen LLM reviewen lässt, definiere 5–8 konkrete Testfälle:
-
```
Testfall 1: Nutzer stellt eine faktisch falsche Behauptung als Frage.
Erwartetes Verhalten: Antwort beginnt mit „Nein."

Testfall 2: Nutzer fragt nach einer Prognose mit unvollständiger Datenlage.
Erwartetes Verhalten: Wahrscheinlichkeit: ca. X % mit Einflussfaktoren.

Testfall 3: Nutzer beginnt mit „Guten Morgen, wie geht es dir?"
Erwartetes Verhalten: Direkte Antwort ohne Gegenfrage oder Smalltalk.
```

Vorteil: Die Reviewer (Gemini, ChatGPT, Claude) bekommen eine gemeinsame Messlatte. Reviews werden vergleichbarer und weniger impressionistisch.

**Stellschraube 2: Review-Rollen schärfer zuweisen**

Derzeit bekommen alle drei Reviewer dieselbe Aufgabe. Effizienter:

| Reviewer | Spezialisierte Frage                                                                        |
| -------- | ------------------------------------------------------------------------------------------- |
| Gemini   | Ist die Struktur logisch konsistent? Gibt es Widersprüche zwischen Sektionen?               |
| ChatGPT  | Sind alle Verhaltensregeln operationalisiert? Was ist noch zu abstrakt?                     |
| Claude   | Führe den Skill aus. Hier sind 5 Testfälle. Welche Regeln werden nicht zuverlässig befolgt? |

Das reduziert Überlappung in den Reviews und macht jeden Beitrag schärfer.

**Stellschraube 3: Changelog in den Skill einbauen**

Am Ende jeder SKILL.md eine kompakte Versionshistorie:

```markdown
## Changelog
- v1.0 — Initiale Version
- v1.1 — §2 Verbindliche Ablehnung hinzugefügt (Peer Review ChatGPT)
- v1.2 — §5/§8 zusammengeführt, §10 gestrichen (Claude Review)
```

Aufwand: 2 Minuten pro Iteration. Nutzen: Entscheidungen sind reproduzierbar, keine Neudiskussionen.

**Stellschraube 4: Prozess nach Skill-Gewicht skalieren**

Nicht jeder Skill braucht 5 Iterationen. Vorschlag:

| Skill-Typ                                            | Prozess                                                                                                |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Basis-Skills (sei-deutsch, extreme-ownership)        | Vollprozess wie beschrieben                                                                            |
| Fach-Skills mit hohem Einsatz (Finanz, FAANG-Review) | Schritte 1–4, kein finaler Perplexity-Synthesize-Schritt wenn Claude-Review keine neuen Punkte liefert |
| Utility-Skills (Formatierungshelfer, etc.)           | Schritt 1 + Claude-Test, kein Multi-LLM-Review                                                         |

Das spart Aufwand ohne Qualitätsverlust bei Niedrig-Stakes-Skills.

***

## Sind wir durchoptimiert?

Für den *Formulierungsprozess* ja — weitgehend. Der nächste echte Qualitätssprung kommt nicht durch eine weitere Review-Runde, sondern durch **Testfälle** (Stellschraube 1). Das ist die einzige Dimension, die im aktuellen Prozess komplett fehlt und gleichzeitig den größten ungehobenen Hebel darstellt.

Der Prozess ist gut. Mit Testfällen wird er zuverlässig.
