# Start

Wenn ich einen neuen Skill entwickele, leite ich die Session bei Perlplexity mit diesem Template ein.
Modell der Wahl: **Sonnet 4.6 Thinking**

---

name: skill-builder
version: 1.0
description: Prozessprotokoll für die Entwicklung großer, produktionskritischer Skills.
einsatz: Perplexity-Session-Einleitung bei jedem neuen Basis- oder High-Stakes-Skill
---

# Skill-Builder — Prozessprotokoll

## Zweck

Dieses Template steuert die Entwicklung produktionskritischer Skills (Basis-Skills,
Finanz-Skills, Prozess-Skills). Es stellt sicher, dass vor dem ersten Entwurf alle
relevanten Anforderungen geklärt sind, jede Verhaltensregel operational formuliert ist
und der Skill vor Produktionseinsatz gegen definierte Testfälle validiert wurde.

---

## Phase 1 — Elicitation (vor dem ersten Entwurf)

Beantworte diese Fragen, bevor ein Entwurf entsteht.
Unvollständige Antworten blockieren Phase 2.

### 1.1 Geltungsbereich

- Für welche Plattform(en) gilt der Skill? (Claude Code / Perplexity / beide)
- Gilt er für alle Themen und Sprachen oder ist er eingegrenzt?
- Welche anderen Skills sind bereits aktiv — und könnte dieser mit ihnen kollidieren?

### 1.2 Stakes-Analyse

- Was ist der schlimmste realistische Fehler, den dieser Skill verhindern soll?
- Was ist der häufigste Anwendungsfall?
- Was passiert, wenn der Skill teilweise ignoriert wird — ist das tolerierbar?

### 1.3 Verhaltenskern

- Was soll das Modell **immer** tun, wenn dieser Skill aktiv ist?
- Was soll das Modell **nie** tun?
- Gibt es ein Leitbild oder eine Rolle, die das Modell einnehmen soll?

### 1.4 Abgrenzung

- Was ist **nicht** Aufgabe dieses Skills? (Was gehört in einen anderen Skill?)
- Gibt es Randfälle, die explizit ausgeschlossen werden müssen?

---

## Phase 2 — Drafting-Kriterien

Jeder Skill-Entwurf wird gegen diese Kriterien geprüft, bevor er ins Review geht.

| Kriterium                       | Prüffrage                                                              |
| ------------------------------- | ---------------------------------------------------------------------- |
| Operational, nicht aspirational | Ist jede Regel eine konkrete Handlungsanweisung? Oder nur ein Prinzip? |
| Keine Redundanz                 | Sagt eine Sektion dasselbe wie eine andere?                            |
| Konfliktfreiheit                | Widerspricht eine Regel einer anderen Regel im selben Skill?           |
| Token-Effizienz                 | Gibt es Sätze, die gestrichen werden können ohne Funktionsverlust?     |
| Geltungsbereich explizit        | Ist klar, wann der Skill aktiv ist und wann nicht?                     |
| Compliance-Vorrang notiert      | Ist der Vorrang von System-/Sicherheitsregeln explizit benannt?        |

---

## Phase 3 — Testfälle

Definiere 5–8 Testfälle vor dem Review.
Format: **Eingabe → erwartetes Verhalten → Versagenskriterium**

### Pflicht-Testfall-Typen

**T1 — Normalfall**
> Typische Nutzung des Skills unter idealen Bedingungen.
> Erwartung: Skill greift vollständig und ohne Friction.

**T2 — Grenzfall: Unvollständiger Prompt**
> Nutzer stellt eine Frage mit fehlenden entscheidenden Informationen.
> Erwartung: Skill erkennt Lücke, benennt sie, stellt max. 3 Rückfragen.
> Versagen: Modell antwortet trotzdem vollständig ohne Hinweis auf Lücke.

**T3 — Grenzfall: Mehrdeutigkeit**
> Prompt hat zwei plausible Interpretationen.
> Erwartung: Modell benennt Mehrdeutigkeit explizit, bevor es antwortet.
> Versagen: Modell wählt eine Interpretation stillschweigend.

**T4 — Adversarial: Schmeichelhafte Falschaussage**
> Nutzer stellt eine faktisch falsche Behauptung als Frage oder Prämisse.
> Erwartung: Antwort beginnt mit „Nein." oder „Diese Annahme ist falsch, weil …"
> Versagen: Modell stimmt zu oder relativiert ohne Widerspruch.

**T5 — Adversarial: Emotionaler Druck**
> Nutzer formuliert Frage mit implizitem Wunsch nach Bestätigung oder Trost.
> Erwartung: Sachliche Antwort ohne Coaching-Duktus oder Lob.
> Versagen: Modell antwortet mit motivierender oder tröstender Sprache.

**T6 — Konfliktfall: Skill vs. Skill**
> Situation, in der dieser Skill mit einem anderen aktiven Skill kollidiert.
> Erwartung: Höherrangiger Skill hat Vorrang; Abweichung wird kurz benannt.
> Versagen: Stiller Konflikt ohne Benennung.

**T7 — Randfallspezifisch** *(projektabhängig definieren)*
> Randfälle, die aus der Stakes-Analyse (Phase 1.2) hervorgehen.

---

## Phase 4 — Review-Aufträge

Für jeden Reviewer gibt es einen spezialisierten Auftrag.
Alle Reviewer bekommen: Skill-Entwurf + Testfälle aus Phase 3.

### Gemini
>
> Prüfe Struktur und interne Konsistenz.
> Gibt es Widersprüche zwischen Sektionen?
> Sind alle Regeln logisch kompatibel?
> Gibt es Lücken in der Abdeckung des Geltungsbereichs?

### ChatGPT
>
> Prüfe Operationalisierung.
> Welche Regeln sind noch aspirational statt operational?
> Welche Verhaltensanweisungen sind zu abstrakt, um zuverlässig befolgt zu werden?
> Schlage konkrete Trigger-Formulierungen vor, wo sie fehlen.

### Claude Code
>
> Führe den Skill aus.
> Teste jeden der definierten Testfälle.
> Berichte, welche Testfälle bestanden werden und welche nicht.
> Bereinige danach Redundanzen und Token-Overhead ohne Funktionsverlust.

---

## Phase 5 — Synthese (Perplexity)

Perplexity erhält: ursprünglicher Entwurf + alle Review-Outputs + Testfälle.

Aufgabe:

1. Bewerte jeden Review-Vorschlag: übernehmen / verwerfen / teilweise übernehmen — mit Begründung.
2. Schreibe den finalen Skill.
3. Prüfe finalen Skill gegen alle Testfälle aus Phase 3.
4. Ergänze Changelog.

---

## Phase 6 — Produktion

Checkliste vor Einsatz:

- [ ] Alle Pflicht-Testfälle bestanden
- [ ] Keine Redundanz zwischen Sektionen
- [ ] Token-Kosten akzeptabel (Basis-Skill: <800 Tokens anstreben)
- [ ] Changelog aktuell
- [ ] Kollision mit bestehenden Skills geprüft

---

## Changelog-Template (in jeden fertigen Skill einbauen)

```
## Changelog
- v1.0 — [Datum] — Initiale Version
- v1.1 — [Datum] — [Änderung] ([Quelle: Gemini / ChatGPT / Claude / Perplexity])
```

---

## Prozessübersicht

| Schritt               | Tool             | Output                            |
| --------------------- | ---------------- | --------------------------------- |
| 1. Elicitation        | Perplexity       | Anforderungsdokument + Testfälle  |
| 2. Erster Entwurf     | Perplexity       | SKILL.md v1.0                     |
| 3. Peer Review        | Gemini + ChatGPT | Review-Dokumente                  |
| 4. Synthese           | Perplexity       | SKILL.md v1.1                     |
| 5. Ausführungs-Review | Claude Code      | Testbericht + bereinigte Variante |
| 6. Finale Synthese    | Perplexity       | SKILL.md final + Changelog        |
| 7. Produktion         | Claude Code      | Einsatz                           |

### Prozess nach Skill-Gewicht skalieren

| Skill-Typ                                   | Prozess                                                          |
| ------------------------------------------- | ---------------------------------------------------------------- |
| Basis-Skills, Finanz-Skills, Prozess-Skills | Vollprozess (alle 7 Schritte)                                    |
| Fach-Skills mit mittlerem Einsatz           | Schritte 1–5, Phase 6 nur wenn Claude-Review neue Punkte liefert |
| Utility-Skills                              | Schritte 1–2 + Claude-Test gegen 3 Testfälle                     |

## Warum Sonnet 4.6 Thinking?

**Sonnet 4.6 Thinking** ist für diese Aufgabe die richtige Wahl — und du liegst damit bereits optimal.

## Warum Sonnet 4.6 Thinking

Skill-Entwicklung ist keine Suche, sondern mehrstufige Analyse: Anforderungen herausarbeiten, Regeln formulieren, Reviews synthetisieren, Entscheidungen begründen. Dafür ist ein Reasoning-Modell notwendig, kein reines Retrieval-Modell. [perplexity](https://www.perplexity.ai/help-center/en/articles/10352901-what-is-perplexity-pro)

Sonnet 4.6 Thinking ist laut Perplexity explizit für „advanced analysis" und „technical problem-solving" positioniert. Genau das ist Skill-Entwicklung: kein Faktenabruf, sondern iterative Synthesearbeit. [perplexity](https://www.perplexity.ai/help-center/en/articles/10354919-what-advanced-ai-models-are-included-in-my-subscription)

***

## Vergleich der verfügbaren Optionen für diesen Zweck

| Modell                  | Stärke                                                                                                                                                                    | Schwäche für Skill-Entwicklung                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Sonnet 4.6 Thinking** | Reasoning + technische Präzision, Kontext-Kontinuität                                                                                                                     | —                                                           |
| Gemini 3.1 Pro          | Reasoning immer aktiv, stark multimodal  [perplexity](https://www.perplexity.ai/help-center/en/articles/10354919-what-advanced-ai-models-are-included-in-my-subscription) | Anderer RLHF-Bias — gut als Reviewer, nicht als Synthesizer |
| GPT-5.2                 | Starkes allgemeines Reasoning                                                                                                                                             | Tendenz zu Länge und Redundanz — gut als Reviewer           |
| Grok 4.1                | Stark bei aktuellen Daten                                                                                                                                                 | Kein Vorteil bei geschlossenem Skill-Drafting               |
| Sonar                   | Schnell, webbasiert                                                                                                                                                       | Kein Reasoning-Modell, falsch für diese Aufgabe             |
| Claude Opus 4.6         | Stärkstes Anthropic-Modell  [perplexity](https://www.perplexity.ai/help-center/en/articles/13641704-what-is-model-council)                                                | Nur Max-Tier, nicht nötig für diesen Use Case               |

***

## Eine relevante Neuerung: Model Council

Perplexity hat kürzlich **Model Council** eingeführt: Drei Modelle (Claude Opus 4.6, GPT-5.2, Gemini 3.1 Pro) werden parallel befragt, ein Synthesizer-Modell fasst zusammen und zeigt Übereinstimmungen und Abweichungen. [perplexity](https://www.perplexity.ai/help-center/en/articles/13641704-what-is-model-council)

Das ist strukturell genau das, was du manuell mit deinem Peer-Review-Prozess baust — aber automatisiert in einer Session. Für die **Review-Phase** (Schritt 3 im skill-builder.md) wäre Model Council eine interessante Alternative zu manuellen Einzelreviews bei Gemini und ChatGPT. Einschränkung: Du verlierst die spezialisierten Review-Aufträge (Gemini → Konsistenz, ChatGPT → Operationalisierung). Model Council gibt dir Breite, nicht Tiefe.

**Fazit:** Sonnet 4.6 Thinking bleibt deine richtige Wahl für Elicitation und Synthese. Model Council ist einen Test wert für die Peer-Review-Phase — aber erst nach dem nächsten Skill, nicht als Ersatz für den etablierten Prozess.
