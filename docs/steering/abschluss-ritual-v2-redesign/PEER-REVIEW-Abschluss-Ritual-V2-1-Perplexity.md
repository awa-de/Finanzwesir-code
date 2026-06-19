Stand: 2026-06-19 | Reviewer: Perplexity (Sonnet 4.6) | Repo: awa-de/Finanzwesir-code

# Peer-Review: `/abschluss-ritual` V2.1

## Gesamturteil

**Einspielbereit mit kleinen Änderungen.** Die V2.1 ist ein echter Fortschritt gegenüber V2 — die Entscheidung, BACKLOG/ARCHIV aus dem Deferred-Scope herauszunehmen, war richtig und notwendig. Es gibt keine kritischen Blocker, aber vier Stellen verdienen vor dem Einspielen Nachbesserung.

---

## Stärken der V2.1

V2.1 hat die philosophische Prüfung (Advocatus Diaboli, Ockhams Rasiermesser, Via Negativa, Munger/Inversion) sauber in konkrete Regeln übersetzt. Der Leitsatz *„Genau schlägt preiswert"* ist nicht nur ein Motto, sondern tatsächlich die operative Grundlage aller Entscheidungen. Die Rückfrage-als-Sicherheitsarchitektur ist der wichtigste konzeptionelle Sprung gegenüber V1: Claude führt, Albert antwortet situativ — das ist die richtige Verteilung von Prozessverantwortung.

Der `abschluss-writer` als separater Haiku-Agent ist präzise und sicher eingegrenzt. Das YAML-Eingabeformat mit expliziten `literal`-Feldern ist technisch robust: Haiku bekommt keinen Interpretationsspielraum, und das Echo-Protokoll gibt Sonnet eine saubere Verifikationsgrundlage.

---

## Antworten auf die 10 Review-Fragen

**1. Startkritischer Drift — ist er eliminiert?**
Ja, weitgehend. Die sofortige Aktualisierung aller sechs Pflicht-Artefakte beim Ketten-Minimalabschluss schließt den kritischsten Drift-Pfad. **Restrisiko**: Der Kettenkredit (max. 3 DEFERRED oder 90 min) ist *zeitbasiert*, aber Claude hat keine Uhr. Dazu gleich mehr.

**2. Grenze sofort/deferred — korrekt gesetzt?**
Ja. Die Dreier-Whitelist (MEMORY-CHECK, SPEC-CHECK, WORKING-FEATURES-CHECK) ist gut gewählt. Diese Checks haben keine Startwirkung — ein /start ohne aktuelles MEMORY ist suboptimal, aber nicht brechend. Die Abgrenzung ist sauber.

**3. Ketten-Minimalabschluss vollständig genug?**
Ja, die sechs Pflichtschritte sind vollständig. **Eine Lücke**: Die Voraussetzungen in Abschnitt 3.2 sind gut formuliert, aber der Skill sagt nicht explizit, was passiert, wenn eine Voraussetzung *während* der Ausführung wegfällt (z.B. Haiku-Writer meldet FAIL für BACKLOG). Der aktuelle Text sagt nur „STOP und Voll-Abschluss" im Writer, aber im SKILL.md fehlt der entsprechende Recovery-Pfad.

**4. Rückfrage-Logik sinnvoll?**
Ja. Die Standardfrage ist gut. Die drei Optionen sind ausreichend. **Kleine Änderung empfohlen**: In der Frage sollte „Kettenabschluss" durch „Ketten-Minimalabschluss" ersetzt werden — der Name im SKILL.md lautet bereits so, Konsistenz verhindert Verwirrung bei zukünftigen Lesern.

**5. Haiku-Writer sicher genug?**
Ja. Der Writer ist einer der durchdachtesten Teile des Pakets. Das YAML-Format mit expliziten `literal`-Feldern und sofortigem STOP bei Unklarheit ist korrekt. **Ein blinder Fleck**: Der Writer darf `Validator ausführen` (Aufgabe 7), aber es steht nicht im Skill, was passiert wenn der Validator nicht existiert. Aktuell empfiehlt der Skill nur, ihn „zu empfehlen oder auszuführen, falls vorhanden" — das reicht als Schutz.

**6. Kettenkredit 3/90min sinnvoll?**
Die Zahl 3 ist sinnvoll — ein Arbeitstag hat typisch 3–8 Ketten-APs, bei 3 offenen Deferreds ist ein Reflexions-Check fällig bevor es zu lang wird. **Problem mit der Zeitregel**: Claude hat keine Uhr. Die 90-Minuten-Regel ist faktisch nicht durchsetzbar ohne manuelles Timestamp-Tracking im session-log. Empfehlung: Die Zeitregel ersetzen durch eine reine AP-Zahl, alternativ den Timestamp beim ersten DEFERRED-Marker in den session-log schreiben und Sonnet beim nächsten Aufruf vergleichen lassen.

**7. Token-Einsparungen realistisch?**
Die Zahlen (35–50 % für Ketten-Pro-AP) sind plausibel und eher konservativ. Haupttreiber der Einsparung ist die Kombination aus: kein Datei-Vollscan bei Modus-Erkennung, Kurzformat-Commit, und Haiku-Dispatch für mechanische Edits. BACKLOG/ARCHIV sofort statt deferred kostet ca. 200–300 Token zurück, aber der Nettoeffekt bleibt positiv. Die 12–20 % Ersparnis beim Voll-Abschluss sind realistisch.

**8. Skill zu lang?**
Angemessen lang für seine Zentralität. Der Skill ist der kritischste im System — Ausführlichkeit schützt hier vor falscher Abkürzung durch Claude. Die Struktur (0. Grundsätze → 1. Pfade → 2. Modus → 3–6. Pfad-Details → 7–8. Format/Disziplin) ist logisch und gut navigierbar.

**9. Einfachere Lösung mit gleicher Sicherheit?**
Nein, nicht ohne Qualitätsverlust. V2.1 hat das Minimum erreicht, das die Constraints erfüllt. Die Komplexität ist nicht Architektur-Barock, sondern spiegelt die echte Domänen-Komplexität wider.

**10. Nicht gesehenes Risiko?**
Ja, zwei — siehe eigener Abschnitt unten.

---

## Zwei nicht gesehene Risiken

### Risiko A: BACKLOG-Zeile nicht eindeutig auffindbar (kritisch)

Der Writer darf BACKLOG-Zeilen nur entfernen wenn der Literal exakt gefunden wird. Aber der Literal wird von Sonnet erzeugt — aus dem Konversationskontext, nicht durch Lesen der Datei. Wenn die BACKLOG-Zeile sich von dem unterscheidet, was Sonnet im Kontext hat (z.B. durch manuelle Edits von Albert zwischen Sessions), meldet der Writer `FAIL: BACKLOG-Literal nicht exakt gefunden`.

Was dann? Der SKILL.md sagt: bei FAIL → Voll-Abschluss. Aber Voll-Abschluss würde dieselbe Situation erzeugen — Sonnet hat den falschen Literal im Kopf. **Empfehlung**: Bei BACKLOG-FAIL einen expliziten Fallback definieren: Sonnet liest die konkrete AP-Zeile aus BACKLOG.md (gezielt, nicht Vollscan) und übergibt den korrekten Literal an den Writer für einen zweiten Versuch. Bei zweitem FAIL: Voll-Abschluss und manuelle Bereinigung.

### Risiko B: DEFERRED-Reconciliation bei Sessionwechsel ohne /start

Das Kettenende-Protokoll (Abschnitt 4) setzt voraus, dass Sonnet die offenen DEFERRED-Marker aus dem session-log sammelt. Das funktioniert zuverlässig *innerhalb* einer Session. Wenn Albert die Session beendet (Browser schließt, Timeout) und eine neue Session mit `/start` öffnet, ohne dass das Kettenende ausgelöst wurde, müssen die DEFERRED-Marker vom `/start`-Hook gelesen und gemeldet werden. Das ist aktuell nicht explizit spezifiziert — der Lücken-Alarm beim `/start` feuert, aber es ist unklar, ob der `/start`-Skill die DEFERRED-Marker interpretiert oder nur meldet.

---

## Direkte Patches (4 kleine Änderungen)

**Patch 1 — Rückfrage-Terminologie** (Abschnitt 2.4, 1 Zeile):

```
1. Kettenabschluss  →  1. Ketten-Minimalabschluss
```

Begründung: Konsistenz mit dem Abschnittstitel in SKILL.md.

---

**Patch 2 — Kettenkredit-Zeitregel** (Abschnitt 3.5):

Die 90-Minuten-Regel ersatzlos streichen oder durch einen messbaren Trigger ersetzen:

> *„Wenn der erste DEFERRED-Marker einen Timestamp hat und der aktuelle Timestamp aus dem session-log mehr als 90 Minuten abweicht."*

Ohne Timestamp im Marker ist die Zeitregel faktisch nicht durchsetzbar.

---

**Patch 3 — BACKLOG-FAIL Recovery** (Abschnitt 3.7 oder 3.8):

Neuen Absatz ergänzen:

> *„Wenn der Writer BACKLOG-FAIL meldet: Sonnet liest gezielt die AP-Zeile aus BACKLOG.md (konkrete Suche nach AP-ID, kein Vollscan) und übergibt korrekten Literal an zweiten Writer-Aufruf. Bei zweitem FAIL: Voll-Abschluss und manuelle Bereinigung."*

---

**Patch 4 — DEFERRED-Reconciliation bei Sessionwechsel** (Abschnitt 4 oder als Hinweis):

Hinweis ergänzen:

> *„Wenn der /start-Hook offene DEFERRED-Marker meldet: erster Schritt der neuen Session ist der Reflexions-Check (Schritt 4 dieses Skills), nicht das nächste AP."*

---

## Token-Einschätzung im Überblick

| Pfad | Heute | V2.1 | Ersparnis |
|---|---:|---:|---:|
| Ketten-Pro-AP | ca. 1200 Token | ca. 650–800 Token | ca. 35–50 % |
| Mini | ca. 600 Token | ca. 220–300 Token | ca. 50–60 % |
| Vollabschluss | ca. 2500 Token | ca. 2000–2200 Token | ca. 12–20 % |

Bei 5 Ketten-APs pro Session: ca. 2000–2800 Token gespart. Zahlen sind plausibel und eher konservativ.

---

## Abschlussurteil

**Einspielbereit mit kleinen Änderungen.**

Die vier Patches sind keine Architektur-Entscheidungen — sie sind Präzisierungen. V2.1 ist konzeptionell fertig und produktionsbereit. Die finale Formel aus dem Entscheidungsdokument gilt vollständig:

> *Der Skill spart Tokens nicht durch weniger Genauigkeit, sondern durch weniger Raten, weniger Lesen, weniger Reden und mehr mechanische Literal-Edits.*
