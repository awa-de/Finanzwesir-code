Stand: 2026-06-19 | Reviewer: Claude Sonnet 4.6 | Repo: awa-de/Finanzwesir-code

# Peer-Review: `/abschluss-ritual` V2.1 — Claude Sonnet 4.6

## Gesamturteil

**Einspielbereit nach 3 Muss-Patches.**

V2.1 ist konzeptionell und handwerklich fertig. Der Leitsatz "Genau schlägt preiswert" ist nicht nur Motto — er ist die operative Grundlage aller Entscheidungen im Skill, und die Implementierung setzt ihn konsequent um. Die verbleibenden Punkte sind Patches, keine Architektur-Entscheidungen.

---

## Stärken

**"Genau schlägt preiswert" als operatives Fundament.**
Die richtige Antwort auf den Zielkonflikt. Token sparen durch Weglassen kritischer Arbeit ist kein Sparen — es ist Schulden mit Zinseszins (Drift akkumuliert). V2.1 spart durch Disziplin: kein Raten, kein Vollscan, kein Erklärungs-Overhead. Strukturell sauber.

**BACKLOG/ARCHIV sofort — kein Deferred.**
Die wichtigste Entscheidung gegenüber V2. BACKLOG-Inkonsistenz ist einer der gefährlichsten Drift-Pfade: /start liest PROJECT-STATUS, Menschen scannen BACKLOG. Ein Widerspruch zwischen beiden ist der Beginn stiller Drift. Richtig eingestuft als startkritisch.

**§2.3 Signal-Tabelle + §2.5 Minimaler Fallback.**
Die Modus-Erkennung ist jetzt konkret und ohne Vollscan: explizite Signale aus dem Konversationskontext, und als Fallback nur die ersten 10–15 Zeilen von PROJECT-STATUS oder eine gezielte AP-Zeile. Das ist die richtige Schnittstelle zwischen Sonnet-Kontext und Dateilesen.

**Rückfrage als Sicherheitsarchitektur.**
Der konzeptionell wichtigste Sprung gegenüber V1. Claude führt den Prozess, Albert antwortet situativ. Albert muss sich keinen Modus merken. Interaktivität ist billiger und sicherer als falsche Autonomie.

**abschluss-writer.md — Literal-Only-Constraint.**
Der durchdachteste Teil des Pakets. Haiku bekommt keinen Interpretationsspielraum: exakter YAML-Input, explizites Echo mit geschriebenem Inhalt (nicht nur "success"), STOP auf erste Unklarheit. Die Fehlerfall-Liste ist erschöpfend und konservativ.

**§8 Ausgabe-Disziplin.**
Direkt adressiert das Token-Hauptproblem: kein verbaler Schritt-für-Schritt-Kommentar. Nur melden wenn Scout/Writer startet, Validator scheitert, Rückfrage nötig oder Abschluss blockiert. Das ist die Regel, die aus 1200 Token 650 macht.

---

## Antworten auf die 10 Review-Fragen

**1. Startkritischer Drift eliminiert?**
Ja. Die sofortige Aktualisierung aller sechs Pflicht-Artefakte beim Ketten-Minimalabschluss schließt den kritischsten Drift-Pfad. Restrisiko: der Sessionwechsel-Fall (Risiko B, Perplexity) ist nicht vollständig im Skill adressiert — gehört aber in den /start-Skill, nicht hier.

**2. Grenze sofort/deferred korrekt gesetzt?**
Ja. Die Dreier-Whitelist (MEMORY-CHECK, SPEC-CHECK, WORKING-FEATURES-CHECK) ist präzise. Keine Startwirkung, keine Routing-Funktion. Die Abgrenzung ist begründbar und scharf.

**3. Ketten-Minimalabschluss vollständig genug?**
Ja. §3.2 Voraussetzungen schließen implizit den DoD- und Scope-Fall: wenn eine dieser Fragen offen ist, ist Ketten-Minimalabschluss nicht erlaubt, und Voll-Abschluss greift. Das ist die richtige Architektur — kein separater Scope-Check-Schritt nötig.

**4. Rückfrage-Logik sinnvoll?**
Ja — mit einer kleinen Terminologie-Inkonsistenz (siehe Patch 1). Die Frage selbst ist gut kalibriert: drei klar unterscheidbare Optionen, sicherer Default (Vollabschluss).

**5. Haiku-Writer sicher genug?**
Ja. Der YAML-Eingabeformat mit literal-Feldern ist robust. Das Echo-Protokoll zeigt den tatsächlich geschriebenen Inhalt. STOP bei erster Unklarheit ist die richtige Fehlerphilosophie. Eine Lücke: NAVIGATION-Mehrdeutigkeit ist nicht als Fehlerfall definiert (Patch 3).

**6. Kettenkredit 3/90min sinnvoll?**
3 APs: sinnvoll. 90 Minuten: streichen. Die Zeitregel misst das falsche Ding (Zeit statt Drift-Druck) und ist faktisch nicht implementierbar ohne externen Timestamp. Die AP-Zahl reicht als Zähler (Patch 2).

**7. Token-Einsparungen realistisch?**
Konservativ korrekt für normale Sessions. Für Sessions mit Context-Compaction und BACKLOG-FAIL: eher 20–30 % beim Ketten-Pro-AP statt 35–50 %. Gesamtbild bleibt deutlich positiv.

**8. Skill zu lang?**
Angemessen für seine Zentralität. Ausführlichkeit schützt vor falscher Abkürzung. Kein Kürzungsbedarf.

**9. Einfachere Lösung mit gleicher Sicherheit?**
Nein. V2.1 hat das Minimum erreicht, das die Constraints erfüllt. Die Komplexität spiegelt die echte Domänen-Komplexität wider.

**10. Nicht gesehenes Risiko?**
Ja — ein strukturelles und ein implementierungstechnisches (siehe unten).

---

## Zwei Risiken

### Risiko A: NAVIGATION-Mehrdeutigkeit im Writer (strukturell)

Der Fehlerfall-Block in abschluss-writer.md nennt explizit:
> "BACKLOG-Entfernung würde mehr als eine Zeile betreffen"

Für NAVIGATION fehlt der entsprechende Fehlerfall. Eine AP-ID kann in NAVIGATION mehrfach vorkommen (Tabelle, Referenzblock, Kommentar). Der Writer würde dann entweder die falsche Zeile patchen oder — schlimmer — kein FAIL ausgeben.

Das aktuelle Echo für NAVIGATION (`PASS: AP-Zeile auf ✅ gesetzt`) gibt nicht an, ob 1 oder N Zeilen geändert wurden.

### Risiko B: DEFERRED-Reconciliation bei Sessionwechsel (Perplexity bestätigt)

Das Kettenende-Protokoll (§4) setzt voraus, dass Sonnet die offenen DEFERRED-Marker sammelt. Das funktioniert innerhalb einer Session. Wenn Albert die Session schließt, bevor das Kettenende ausgelöst wurde, müssen die Marker beim nächsten /start erkannt und gemeldet werden. Das ist aktuell nicht explizit spezifiziert — die Lösung liegt im /start-Skill, aber ein Hinweis hier fehlt.

---

## Patches

### Muss-Patches (3)

**Patch 1 — Terminologie in Rückfrage** (SKILL.md §2.4):

```
1. Kettenabschluss  →  1. Ketten-Minimalabschluss
```

Begründung: Konsistenz mit dem Abschnittstitel in §3. Verhindert Verwirrung bei zukünftigen Lesern.

---

**Patch 2 — 90-Minuten-Regel streichen** (SKILL.md §3.5 + §6.1):

Zeile ersatzlos entfernen:
> *"maximal 90 Minuten seit erstem offenen DEFERRED-Marker"*

Begründung: Claude hat keine Uhr. Die Zeitregel ist nicht implementierbar ohne externen Timestamp-Mechanismus, der selbst Token kostet und ein neues Artefakt erzeugt. Zeit misst nicht Drift-Druck — AP-Zahl schon. Die Zahl 3 reicht als alleiniger Kettenkredit.

---

**Patch 3 — NAVIGATION-Mehrdeutigkeit als Fehlerfall** (abschluss-writer.md §5 + §6):

In §6 Fehlerfälle ergänzen:
> *"AP-Zeile in NAVIGATION.md nicht eindeutig — mehr als ein Treffer für AP-ID."*

In §5 Echo für NAVIGATION präzisieren:
```
NAVIGATION:
PASS: 1 Zeile auf ✅ gesetzt
```
(explizit "1 Zeile" statt nur "AP-Zeile auf ✅ gesetzt")

---

### Kann-Patches (3)

**Patch 4 — BACKLOG-FAIL Recovery** (SKILL.md §3.7):

Perplexity empfiehlt: Sonnet liest die AP-Zeile gezielt aus BACKLOG.md und übergibt korrekten Literal für zweiten Writer-Versuch. Bei zweitem FAIL: Voll-Abschluss.

Bewertung: Verbesserung, aber kein Muss. Der aktuelle direkte Sprung zu Voll-Abschluss bei FAIL ist konservativ und sicher. Ein Retry-Loop kompliziert den Skill ohne strukturellen Gewinn.

**Patch 5 — DEFERRED-Hinweis bei Sessionwechsel** (SKILL.md §4):

Hinweis ergänzen:
> *"Wenn /start offene DEFERRED-Marker meldet: erster Schritt der neuen Session ist der Reflexions-Check (Schritt 4), nicht das nächste AP."*

Die /start-Anpassung selbst ist ein eigenes AP.

**Patch 6 — BACKLOG-ARCHIV-Tabellenzeilen-Template** (abschluss-writer.md §4):

Das YAML-Beispiel zeigt ein Literal-Format, aber das Tabellenformat ist nicht formal spezifiziert. Ein explizites Template würde verhindern, dass Sonnet eine Archiv-Zeile mit falschem Spaltenformat übergibt.

---

## Token-Einschätzung

| Pfad | Heute | V2.1 normal | V2.1 mit Compaction/FAIL |
|---|---:|---:|---:|
| Ketten-Pro-AP | ca. 1200 | ca. 650–800 | ca. 400–600 |
| Mini | ca. 600 | ca. 220–300 | ca. 220–300 |
| Voll-Abschluss | ca. 2500 | ca. 2000–2200 | ca. 2000–2200 |

Perplexitys Zahlen sind korrekt für den Normalfall. Ergänzung: bei langen Sessions mit Context-Compaction und BACKLOG-FAIL-Fallback sinkt die Ersparnis beim Ketten-Pro-AP auf ca. 20–35 %. Das Gesamtbild bleibt deutlich positiv — bei 5 Ketten-APs ca. 1500–2500 Token gespart.

---

## Konsolidierte Patch-Liste

| # | Quelle | Stelle | Priorität |
|---|---|---|---|
| P1 | Perplexity + Claude | SKILL.md §2.4: "Kettenabschluss" → "Ketten-Minimalabschluss" | **Muss** |
| P2 | Perplexity + Claude | SKILL.md §3.5 + §6.1: 90-Minuten-Regel ersatzlos streichen | **Muss** |
| P3 | Claude | abschluss-writer.md §5+§6: NAVIGATION-Mehrdeutigkeit Fehlerfall + Echo | **Muss** |
| P4 | Perplexity | SKILL.md §3.7: BACKLOG-FAIL Recovery mit Retry-Versuch | Kann |
| P5 | Perplexity + Claude | SKILL.md §4: Hinweis auf /start-Anpassung bei Sessionwechsel | Kann |
| P6 | Claude | abschluss-writer.md §4: BACKLOG-ARCHIV-Tabellenzeilen-Template | Kann |

---

## Abschlussurteil

**Einspielbereit nach Patches P1, P2, P3.**

Die finale Formel gilt vollständig:

> **Wir sparen nicht, indem wir Genauigkeit weglassen. Wir sparen, indem Claude nicht rät, nicht unnötig liest, nicht labert und mechanische Arbeit nicht mit Sonnet erledigt.**
