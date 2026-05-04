1. Zuerst war SKILL Perplexity.md da. Das war der Start-Skill.
2. Dann Peer-Review durch Gemini Pro 3 Thinking und CHatGPT.
3. Dann zurück zu Perplexity mit Sonnet4.6 Thinking alle 3 Varianten abgegelichen. Aufgabe: Übernimm, was sinnvoll ist verwirf den Rest. Perplexity hat viel mehr Kontext als die beiden anderen LLMs. Daraus wurde dann der neue Skill 1.2

## Begründung der Synthese-Entscheidungen
 
| Änderung                 | Quelle  | Entscheidung             | Begründung                                     |
| ------------------------ | ------- | ------------------------ | ---------------------------------------------- |
| Severity-Level           | ChatGPT | ✅ Übernommen             | Entscheidungswerkzeug, kein Overhead           |
| Abschlussentscheidung    | ChatGPT | ✅ Übernommen, entschärft | Workflow-Abschluss braucht klares Signal       |
| P6 Testbarkeit           | Beide   | ✅ Übernommen, schlanker  | Echte Lücke, aber ohne Pflicht-Blockierung     |
| P7 Domain Clarity        | ChatGPT | ✅ Übernommen             | Für JS/Chart.js-Stack relevant                 |
| Pflicht-Output-Template  | ChatGPT | ❌ Verworfen              | Micromanagement, erzwingt Füller-Text          |
| Zwei-Lösungswege-Pflicht | Gemini  | ❌ Verworfen              | Tokens teuer, oft sinnlos                      |
| P8 Skalierung/Big-O      | Beide   | ❌ Verworfen              | Kein reales Risiko im Stack, gehört in Layer 3 |
| Score-System/Tech-Debt   | ChatGPT | ❌ Verworfen              | Enterprise-Overhead für Solo-Projekt           |
| REJECTED-Automatismus    | ChatGPT | ❌ Entschärft             | Urteil statt Regelautomat                      |