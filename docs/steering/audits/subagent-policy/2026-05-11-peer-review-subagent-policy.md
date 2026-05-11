# Peer Review: Zentrale Subagent-Policy für das Claude-Betriebssystem

**Dokument:** `subagent-policy-peer-review-report.md`  
**Projekt:** Finanzwesir 2.0  
**Reviewer:** Perplexity AI  
**Stand:** 2026-05-11

---

## Executive Summary

Der Report empfiehlt, `subagent-dispatch/SKILL.md` zur zentralen Subagent-Policy zu machen und betroffene Commands/Skills nur mit kurzen lokalen Verweisen zu versehen – statt die Subagentenlogik in 15 Dateien zu duplizieren.[cite:file:1] Die Architekturentscheidung ist korrekt und wartbar. Die größte Schwäche ist nicht konzeptioneller, sondern operativer Natur: Zwischen Report und IST-Zustand der `SKILL.md` klafft eine Lücke, die mit dem Umsetzungsauftrag (Abschnitt 14) geschlossen werden muss.[cite:3][cite:file:1]

**Kritische Sofortmaßnahmen:**

| Priorität | Befund | Maßnahme |
|---|---|---|
| 🔴 Kritisch | `SKILL.md` verweist noch auf „Universeller Subagent-Check" | Frontmatter + Trigger-Zeile entfernen |
| 🔴 Kritisch | `abschluss-scout` fehlt vollständig in der bestehenden Policy-Datei | In Agentenmatrix aufnehmen |
| 🟡 Wichtig | `abschluss-ritual/SKILL.md` enthält möglicherweise Scout-Duplikate | Prüfen, ob lokaler Verweis reicht |

---

## Frage 1: Richtiger Ort für die zentrale Policy?

**Urteil: Ja.**

`subagent-dispatch/SKILL.md` ist der richtige Ort.[cite:file:1] Die Datei existiert bereits, ist semantisch passend, und `NAVIGATION.md` verweist laut Report bereits darauf.[cite:file:1] Die Alternative `.claude/agents/AGENT-ROUTING.md` würde eine neue Struktur und zusätzliche Erklärungspflicht erzeugen – das widerspricht dem Känguru-Prinzip (zentral ja, Bürokratie nein).

---

## Frage 2: Lokale Verweise ausreichend?

**Urteil: Weitgehend ja, mit einer Präzisierungsempfehlung.**

Die vorgeschlagenen lokalen Snippets (Abschnitt 10 des Reports) sind alle unter 10 Zeilen und klar strukturiert.[cite:file:1] Für `pre-code-gate.md` sollte jedoch geprüft werden, ob „bei umfangreichen Full-Gates" ausreichend konkret ist – „Full-Gate" ist ein projektinterner Begriff, der in einem späteren Kontext mehrdeutig werden könnte. Ein konkreter Trigger (z.B. „mehr als 5 Pflichtquellen") wäre präziser und konsistenter mit der Standard-Trigger-Liste aus Abschnitt 7.3.[cite:file:1]

---

## Frage 3: Agentenmatrix korrekt?

**Urteil: Ja – mit einer kritischen Lücke.**

Die vier Agenten sind klar differenziert.[cite:file:1] Auffällig: Die aktuelle `SKILL.md` kennt nur `codebase-scout`, `spec-scout` und `regression-scout` – **`abschluss-scout` fehlt vollständig** in der bestehenden Datei.[cite:3] Der Report setzt dessen Existenz voraus, aber die zentrale Policy müsste ihn erst einführen, bevor lokale Skills auf ihn verweisen können. Das ist der dringlichste inhaltliche Änderungsbedarf an der Policy-Datei selbst.

---

## Frage 4: Verwechslungsgefahr spec-scout vs. codebase-scout?

**Urteil: Ja, in Grenzfällen.**

Die Trennlinie lautet: Specs/Doku → `spec-scout`, Code-Symbolik → `codebase-scout`.[cite:file:1] Problematisch wird es bei `.md`-Dateien mit eingebetteten Codebeispielen (z.B. Skills, die inline Codefragmente enthalten). Eine ergänzende Faustregel könnte helfen:

> *„Wenn die gesuchte Information in Prosa steht → spec-scout; wenn sie in Code steht → codebase-scout."*

Diese Regel wäre ein sinnvoller Zusatz in der zentralen Policy, ohne die Matrix selbst zu verkomplizieren.

---

## Frage 5: Nicht-Delegationsregeln vollständig?

**Urteil: Ja – mit einem Ergänzungsvorschlag.**

Die Liste deckt alle kritischen Entscheidungsebenen ab: Gate-Urteil, Security, Architektur, Freigaben, Commit-Messages, PROJECT-STATUS.[cite:file:1] Die aktuelle `SKILL.md` hat eine kürzere, aber strukturell ähnliche Liste.[cite:3]

**Ergänzungsvorschlag:** „Rollback-Entscheidung" fehlt in beiden Versionen. Wenn ein Scout Regressionsfunde liefert, darf er nicht empfehlen, ob zurückgerollt werden soll – diese Entscheidung ist urteils- und risikoabhängig und gehört zur Hauptinstanz.

---

## Frage 6: Gefahr, dass subagent-dispatch zu groß wird?

**Urteil: Mäßiges Risiko, gut adressiert.**

Der Report nennt das Risiko explizit (Abschnitt 12.1) und empfiehlt Matrix statt Prosa.[cite:file:1] Die aktuelle Datei ist mit ~80 Zeilen noch überschaubar.[cite:3] Das Rückgabeformat (Abschnitt 7.5) ist der riskanteste Wachstumshebel – es sollte als kompakte Referenz-Sektion bleiben und nicht in lokalen Skills als Pflichtprosa wiederholt werden.

---

## Frage 7: Erste Welle ausreichend, oder fehlen kritische Dateien?

**Urteil: Welle gut priorisiert – eine Ausnahme prüfen.**

Die 8 betroffenen Dateien sind die richtigen Kandidaten.[cite:file:1] Auffällig: `abschluss-ritual/SKILL.md` ist in Abschnitt 9.4 als „nicht ändern" markiert, obwohl dort laut Report bereits `abschluss-scout`-Logik steht.[cite:file:1] Das sollte zumindest geprüft werden – wenn dort bereits eigene Scout-Regeln stehen, sind das genau die Duplikate, die die Policy ersetzen soll. Kein zwingender Welle-1-Eingriff, aber eine bewusste Entscheidung.

---

## Frage 8: distill jetzt oder später?

**Urteil: Später – korrekte Entscheidung.**

`distill` hat im Report keinen konkreten Scout-Kandidaten, nur die Hypothese eines `learning-scout`.[cite:file:1] Ein nicht-existenter Agent darf nicht in einer operativen Policy referenziert werden. Welle 2, sobald der Bedarf real und der Agent angelegt ist.

---

## Frage 9: Konsistenz mit der Schichtentrennung?

**Urteil: Ja – aber ein IST-Problem blockiert die Konsistenz.**

Die Lösung passt zur Verfassungslogik: `CLAUDE.md` = Verfassung bleibt unberührt, `NAVIGATION.md` = Routing bekommt höchstens einen Hinweis, `subagent-dispatch` = operative Policy.[cite:file:1]

**Kritischer Befund aus dem IST-Zustand:** Die aktuelle `SKILL.md` verweist in der Frontmatter-`description` und im ersten Trigger-Satz noch auf den „Universellen Subagent-Check".[cite:3] Der Report verlangt explizit, diesen Verweis zu entfernen, da der Check bewusst aus `CLAUDE.md` gestrichen wurde.[cite:file:1] **Das ist der drängendste Änderungsbedarf** – solange dieser Verweis existiert, ist die Schichtentrennung formal verletzt.

---

## Frage 10: 6-Monats-Regret-Risiko ausreichend reduziert?

**Urteil: Ja, wenn der Selftest implementiert wird.**

Die Anti-Drift-Maßnahmen (Deadpool-Sektion) sind klar: Selftest soll nach `Haiku`, `Subagent`, `Scout`, Agentennamen und alter „Universeller Subagent-Check"-Referenz suchen.[cite:file:1] Ohne diesen Selftest bleibt das Konzept eine Absichtserklärung. Die Empfehlung, keine vollständigen Agentenmatrizen in lokalen Dateien zu duplizieren, reduziert das Drift-Risiko strukturell am stärksten.

---

## Gesamtbewertung

Der Report ist architektonisch schlüssig.[cite:file:1] Die Entscheidung für eine zentrale Policy entspricht dem Stand der Kunst für wartbare Prompt-Architekturen. Die Argumentation über alle vier Perspektiven (Captain America, Iron Man, Deadpool, Känguru) führt zu einem konsistenten Ergebnis ohne interne Widersprüche.[cite:file:1]

**Stärken:**
- Klare Trennung zwischen mechanischer Zuarbeit und Hauptinstanz-Urteil
- Agentenmatrix nach Arbeitstyp statt nach Dateiname
- Explizite Nicht-Delegationsliste schützt sicherheitskritische Entscheidungen
- 6-Monats-Regret-Test als Entscheidungsrahmen ist methodisch stark
- Umsetzungsauftrag (Abschnitt 14) ist vollständig und direkt ausführbar

**Schwächen / offene Punkte:**
- `abschluss-scout` fehlt in der bestehenden Policy-Datei
- Alter „Universeller Subagent-Check"-Verweis in `SKILL.md` muss entfernt werden
- Faustregel für spec-scout vs. codebase-scout bei `.md`-Dateien mit Code fehlt
- „Rollback-Entscheidung" fehlt in der Nicht-Delegationsliste
- `abschluss-ritual/SKILL.md` sollte auf Duplikate geprüft werden

