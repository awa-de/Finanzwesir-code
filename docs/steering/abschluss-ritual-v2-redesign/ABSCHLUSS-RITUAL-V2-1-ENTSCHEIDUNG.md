Stand: 2026-06-19 | Session: Abschluss-Ritual-V2.1 | Geändert von: ChatGPT

# Abschluss-Ritual V2.1 — Entscheidung und Begründung

## 1. Amtliches Ergebnis

Die V2.1 ist konservativer als V2.

Die wichtigste Entscheidung:

> **Kein startkritischer Drift. BACKLOG, BACKLOG-ARCHIV, NAVIGATION, PROJECT-STATUS/HOOK-META und session-log werden bei jedem echten AP-Abschluss sofort aktualisiert.**

Deferred wird stark eingeschränkt:

> Deferred ist nur noch für `MEMORY-CHECK`, `SPEC-CHECK` und `WORKING-FEATURES-CHECK` erlaubt.

Die finale Grenzlinie lautet:

> **Genau schlägt preiswert. Token sparen ist erlaubt, solange keine start- oder steuerungskritische Wahrheit auf später verschoben wird.**

---

## 2. Warum V2 nicht ganz final war

Die V2 hatte die richtige Richtung:

- Context-first-Erkennung
- DEFERRED-Marker
- Kurz-Commit für Ketten/Mini
- Haiku für mechanische Edits
- Echo/Validator für HOOK-META

Aber V2 war an einer Stelle zu aggressiv:

- `BACKLOG`
- `BACKLOG-ARCHIV`
- teilweise andere Steuerartefakte

konnten im Kettenmodus bis zum Kettenende aufgeschoben werden.

Das spart Token, erzeugt aber temporären Drift.

Der philosophische Review zeigt: Dieser Drift ist nicht akzeptabel, weil BACKLOG und BACKLOG-ARCHIV steuerungskritisch sind. Wenn eine Session mitten in der Kette abbricht, startet der nächste Faden mit widersprüchlichen Projektwahrheiten.

---

## 3. Philosophische Prüfung

### 3.1 Advocatus Diaboli

Frage: Wie könnte dieser Skill das Projekt ruinieren?

Antwort:

1. Claude lässt erledigte APs im BACKLOG stehen.
2. NAVIGATION zeigt ✅, BACKLOG sagt weiterhin offen.
3. PROJECT-STATUS zeigt NEXT-AP, BACKLOG passt nicht.
4. session-log hat zwar eine Spur, aber die Steuerdateien widersprechen sich.
5. Der nächste `/start` liest widersprüchliche Wahrheit.
6. Claude interpretiert statt zu wissen.
7. Drift beginnt.

Konsequenz:

- Keine startkritische Datei darf bewusst falsch bleiben.
- Kettenmodus darf nicht Lückenmodus sein.
- Kettenmodus ist nur ein knapper vollständiger Steuerdateien-Abschluss.

### 3.2 Ockhams Rasiermesser

Frage: Was ist die einfachste Lösung, die zuverlässig bleibt?

Antwort:

Nicht noch mehr Artefakte, sondern eine klare Trennung:

- Sofort aktualisieren: alles, was Start, Routing oder AP-Liste beeinflusst.
- Deferred erlauben: nur Reflexionsprüfungen ohne Startwirkung.

Damit entfällt die große Kettenende-Rettungslogik.

V2.1 braucht keinen schweren JSONL-State als Pflicht. Der session-log reicht, wenn der DEFERRED-Marker stark eingeschränkt ist.

### 3.3 Via Negativa

Frage: Was nehmen wir weg, damit das System besser wird?

Weggenommen wird:

- breites Deferred
- temporär falscher BACKLOG
- temporär fehlendes BACKLOG-ARCHIV
- stilles Raten beim Modus
- Kettenmodus bei unklarer DoD-/Scope-/Spec-Lage
- lange verbale Abschlussberichte
- Langformat-Commit im Kettenmodus

Das System wird robuster, weil gefährliche Freiheiten verschwinden.

### 3.4 Charlie Munger: Invert, always invert

Invertierte Frage:

> Was müssten wir tun, um das Projekt garantiert driften zu lassen?

Antwort:

- Erledigte APs nicht sofort aus BACKLOG entfernen.
- Archivierung später erledigen.
- HOOK-META ohne Prüfung ändern.
- Unklare Modi erraten.
- Memory und Specs endlos aufschieben.
- Kettenmodus als Sparmodus statt als präzisen Minimalabschluss behandeln.

Gegenmaßnahmen:

- BACKLOG/ARCHIV sofort.
- HOOK-META validieren.
- Bei Unsicherheit fragen.
- Deferred begrenzen.
- Nach 3 schnellen Kettenabschlüssen oder 90 Minuten Reflexionscheck.

---

## 4. Interaktivität als Sicherheitsarchitektur

Eine wichtige Nutzerentscheidung:

> Albert muss sich den Abschlussmodus nicht merken. Aber Claude darf fragen.

Das ändert die Architektur.

Nicht:

> Claude muss alles autonom erkennen.

Sondern:

> Claude muss führen. Wenn Claude nicht sicher ist, fragt Claude.

Rückfrage ist billiger und sicherer als falsche Autonomie.

Standardfrage:

```text
Ich bin beim Abschlussmodus nicht sicher.

Welche Art Abschluss soll ich machen?

1. Kettenabschluss — AP ist fertig, nächster AP folgt direkt
2. Vollabschluss — Themenblock/Session sauber abschließen
3. Miniabschluss — nur kleine Doku-/Steering-Korrektur

Wenn du unsicher bist: Vollabschluss.
```

Diese Frage ist kein Prozessbruch. Sie ist ein Schutzmechanismus.

---

## 5. V2.1 im Vergleich zu V2

| Bereich | V2 | V2.1 |
|---|---|---|
| BACKLOG im Kettenmodus | deferred bis Kettenende | sofort bereinigen |
| BACKLOG-ARCHIV | deferred bis Kettenende | sofort append |
| DEFERRED-Whitelist | breit | nur Reflexionschecks |
| Context-first | stark autonom | bei Unsicherheit Rückfrage |
| Haiku für BACKLOG | eher nein | ja, aber nur Literal-Mechanik mit Echo |
| Kettenende | große Reconciliation | kleiner Reflexions-Check |
| Kettenkredit | nicht klar begrenzt | max. 3 offene Deferreds oder 90 Minuten |
| Mini | eng | noch enger |
| Priorität | Token sparen mit Sicherungen | Genauigkeit zuerst, Tokens durch Disziplin sparen |

---

## 6. Neuer Minimalabschluss

Bei jedem echten AP-Abschluss werden sofort aktualisiert:

1. session-log
2. NAVIGATION
3. PROJECT-STATUS/HOOK-META
4. BACKLOG
5. BACKLOG-ARCHIV
6. Commit-Message

Das ist der neue Mindeststandard.

Weniger ist nicht mehr zulässig.

---

## 7. Was spart trotzdem Tokens?

V2.1 spart nicht durch Weglassen kritischer Arbeit, sondern durch:

- Rückfrage statt Datei-Vollscan bei Modus-Unklarheit
- Kurz-Commit im Kettenmodus
- keine langen Erklärtexte
- gezieltes Lesen statt Vollkontext
- Haiku-Writer für mechanische Literal-Edits
- kleineres Kettenende, weil BACKLOG/ARCHIV schon aktuell sind

Konservative Schätzung:

| Pfad | Heute | V2.1 | Ersparnis |
|---|---:|---:|---:|
| Ketten-Pro-AP | ca. 1200 Token | ca. 650–800 Token | ca. 35–50 % |
| Mini | ca. 600 Token | ca. 220–300 Token | ca. 50–60 % |
| Vollabschluss | ca. 2500 Token | ca. 2000–2200 Token | ca. 12–20 % |

Bei fünf Ketten-APs:

- heute: ca. 6000 Token
- V2.1: ca. 3250–4000 Token
- Ersparnis: ca. 2000–2800 Token

Das ist weniger spektakulär als V2, aber sicherer.

---

## 8. Bewusst verworfene Optionen

### 8.1 BACKLOG/ARCHIV erst am Kettenende

Verworfen, weil startkritischer Drift möglich ist.

### 8.2 JSONL-Manifest als Pflicht

Verworfen für Phase 1. Technisch sauber, aber zusätzlicher Artefakt-Overhead. Der stark eingeschränkte session-log-Marker reicht.

### 8.3 Vollautonome Modus-Erkennung

Verworfen. Claude darf fragen. Interaktivität ist hier billiger und sicherer.

### 8.4 Haiku für MEMORY

Verworfen. MEMORY ist semantisch. Haiku darf höchstens Fundstellen liefern.

### 8.5 Haiku für Specs

Verworfen. Specs sind normativ. Haiku darf höchstens Fundstellen liefern.

---

## 9. Finale Formel

> **Der Skill spart Tokens nicht durch weniger Genauigkeit, sondern durch weniger Raten, weniger Lesen, weniger Reden und mehr mechanische Literal-Edits.**
