Stand: 2026-06-19 | Session: Abschluss-Ritual-V2.1 | Geändert von: ChatGPT

# Peer-Review-Briefing: `/abschluss-ritual` V2.1

## 1. Auftrag an Claude / Perplexity

Bitte diese V2.1 kritisch prüfen.

Ziel ist nicht Zustimmung, sondern Schwachstellenanalyse.

Der Skill ist extrem zentral. Wenn er Drift zulässt, fällt das Projekt über mehrere AP-Ketten auseinander. Zugleich ist er ein Hochfrequenz-Skill und darf nicht unnötig teuer werden.

Finale Priorität:

> **Genau schlägt preiswert.**

Bitte prüft besonders:

1. Erzeugt V2.1 irgendwo noch startkritischen Drift?
2. Ist die Grenze zwischen „sofort aktualisieren“ und „deferred“ korrekt?
3. Ist der Ketten-Minimalabschluss vollständig genug?
4. Ist die Rückfrage-Logik an Albert sinnvoll?
5. Ist der Haiku-Writer sicher genug eingegrenzt?
6. Ist der Kettenkredit von 3 offenen Deferreds oder 90 Minuten sinnvoll?
7. Sind die Token-Einsparungen realistisch?
8. Ist der Skill zu lang oder gerade richtig ausführlich für seine Zentralität?
9. Gibt es eine einfachere Lösung mit gleicher Sicherheit?
10. Gibt es ein nicht gesehenes Risiko?

---

## 2. Kontext

Finanzwesir 2.0 ist ein Einzelpersonen-Softwareprojekt mit Claude als technischem Partner.

Das Abschluss-Ritual wird bei AP-Abschlüssen aufgerufen und hält die Projektsteuerung zusammen:

- `PROJECT-STATUS.md`
- HOOK-META
- `NAVIGATION.md`
- `BACKLOG.md`
- `BACKLOG-ARCHIV.md`
- `.claude/learning/session-log.md`
- ggf. MEMORY
- ggf. Specs

Ohne Abschluss-Ritual entstehen:

- veraltete Projektstatus-Dateien
- falscher `/start`-Kontext
- vergessene APs
- lückenhafte Lernhistorie
- Drift über mehrere Sessions

Der Skill ist also nicht optional.

---

## 3. Problem

Bisherige Abschlüsse sind gründlich, aber teuer.

Hauptkosten:

- Modus-Erkennung über Datei-Lektüre
- NAVIGATION/BACKLOG/PROJECT-STATUS breit lesen
- Langformat-Commit auch bei kleinen Ketten-APs
- verbale Schritt-Erklärungen
- Sonnet erledigt mechanische Schreibarbeit

Der Zielkonflikt:

| Anforderung | Risiko |
|---|---|
| So gründlich wie möglich | Hochfrequenz-Skill wird teuer |
| So tokenarm wie möglich | Projekt driftet |

Finale Abwägung:

> **Genauigkeit darf nicht geopfert werden. Tokenersparnis nur durch Prozessdesign.**

---

## 4. Entwicklung der Lösung

### 4.1 V2-Idee

Die frühere V2 sah vor:

- Context-first-Erkennung
- DEFERRED-Marker
- Kettenmodus deferiert ARCHIV/BACKLOG/MEMORY/SPECS
- Haiku schreibt mechanische Edits
- Echo/Validator für HOOK-META
- Kurz-Commit

Bewertung:

- gute Richtung
- aber zu aggressiv beim Deferieren von BACKLOG/ARCHIV

### 4.2 Philosophische Prüfung

Vier Blickwinkel wurden angewandt:

#### Advocatus Diaboli

Angriff:

- Was passiert, wenn die Kette abbricht?
- Was passiert, wenn BACKLOG und NAVIGATION widersprechen?
- Was passiert, wenn Claude den Modus falsch erkennt?

Ergebnis:

- BACKLOG/ARCHIV dürfen nicht deferred werden.

#### Ockhams Rasiermesser

Einfachste sichere Lösung:

- startkritisch sofort
- reflexiv deferred
- keine zusätzlichen State-Artefakte als Pflicht

#### Via Negativa

Entfernt wurden:

- breites Deferred
- stilles Raten
- temporär falscher BACKLOG
- temporär fehlendes Archiv
- Kettenmodus bei unklarer Lage

#### Munger / Inversion

Wie ruiniert man das Projekt?

- erledigte APs bleiben im BACKLOG
- PROJECT-STATUS und BACKLOG widersprechen sich
- HOOK-META falsch
- Claude interpretiert beim nächsten `/start`

Gegenregel:

- Alles, was `/start`, Routing oder AP-Liste beeinflusst, muss sofort stimmen.

---

## 5. V2.1-Kernentscheidung

Der Kettenmodus ist kein Lückenmodus mehr.

Bei jedem echten AP-Abschluss sofort aktualisieren:

1. session-log
2. NAVIGATION
3. PROJECT-STATUS/HOOK-META
4. BACKLOG
5. BACKLOG-ARCHIV
6. Commit-Message

Deferred nur noch für:

- `MEMORY-CHECK`
- `SPEC-CHECK`
- `WORKING-FEATURES-CHECK`

---

## 6. Interaktivität

Albert hat klargestellt:

> Claude darf fragen. Problematisch ist nicht die Rückfrage, sondern wenn Albert sich selbst merken muss, welcher Abschlussmodus nötig ist.

Daher:

- Claude führt den Prozess.
- Claude fragt bei Unsicherheit.
- Albert antwortet situativ.
- Wenn Antwort unklar bleibt: Voll-Abschluss.

Standardfrage:

```text
Ich bin beim Abschlussmodus nicht sicher.

Welche Art Abschluss soll ich machen?

1. Kettenabschluss — AP ist fertig, nächster AP folgt direkt
2. Vollabschluss — Themenblock/Session sauber abschließen
3. Miniabschluss — nur kleine Doku-/Steering-Korrektur

Wenn du unsicher bist: Vollabschluss.
```

Bitte prüfen:

- Ist diese Frage zu lang?
- Sind die drei Optionen ausreichend?
- Sollte „Kettenabschluss“ anders heißen, z.B. „Ketten-Minimalabschluss“?

---

## 7. Haiku-Writer

Neuer Agent: `abschluss-writer`.

Er darf nur Literal-Edits ausführen.

Erlaubt:

- session-log-Zeile append
- NAVIGATION-Status setzen
- HOOK-META ersetzen
- BACKLOG-Zeile entfernen
- BACKLOG-ARCHIV-Zeile append
- Stand-Header setzen
- Validator ausführen

Verboten:

- Modus erkennen
- AP bestimmen
- BACKLOG interpretieren
- Archivzeile formulieren
- MEMORY
- Specs
- DoD
- Scope
- Commit-Message

Bitte prüfen:

- Ist Haiku für BACKLOG/ARCHIV-Literal-Edits akzeptabel?
- Reicht Echo?
- Sollte Sonnet zusätzlich nachlesen?
- Ist der Dispatch-Overhead noch sinnvoll?

---

## 8. Kettenkredit

Offene Deferred-Marker dürfen nicht endlos wachsen.

Regel:

- maximal 3 Ketten-Minimalabschlüsse mit offenen DEFERRED-Markern, oder
- maximal 90 Minuten seit erstem offenen DEFERRED-Marker.

Dann Voll-Abschluss oder Reflexions-Check.

Bitte prüfen:

- Ist 3 zu streng?
- Sind 90 Minuten sinnvoll?
- Besser 2 APs? 5 APs?
- Besser nur AP-Zahl, keine Zeit?

---

## 9. Erwartete Token-Wirkung

Konservative Schätzung:

| Pfad | Heute | V2.1 | Ersparnis |
|---|---:|---:|---:|
| Ketten-Pro-AP | ca. 1200 | ca. 650–800 | ca. 35–50 % |
| Mini | ca. 600 | ca. 220–300 | ca. 50–60 % |
| Vollabschluss | ca. 2500 | ca. 2000–2200 | ca. 12–20 % |

Bei 5 Ketten-APs:

- heute ca. 6000 Token
- V2.1 ca. 3250–4000 Token
- Ersparnis ca. 2000–2800 Token

Bitte prüfen:

- Sind die Zahlen plausibel?
- Wird der Haiku-Dispatch überschätzt oder unterschätzt?
- Frisst BACKLOG/ARCHIV-sofort den Vorteil zu stark auf?

---

## 10. Offene Review-Fragen

1. Ist „kein startkritischer Drift“ korrekt definiert?
2. Gehören `BACKLOG` und `BACKLOG-ARCHIV` zwingend zu startkritisch?
3. Darf `WORKING-FEATURES-CHECK` deferred werden?
4. Muss `DOD` immer sofort geprüft werden, oder darf es bei reinen Ketten-APs implizit sein?
5. Ist Mini zu eng oder genau richtig?
6. Sollte der Skill noch stärker modularisiert werden?
7. Ist die Echo-Regel für BACKLOG/ARCHIV ausreichend?
8. Sollte es zusätzlich einen Validator für BACKLOG/ARCHIV geben?
9. Sollte der Skill eine eigene kurze „Unsicherheitsmatrix“ enthalten?
10. Welche Failure Mode fehlt?

---

## 11. Erwartetes Peer-Review-Ergebnis

Bitte am Ende urteilen:

- **Einspielbereit**
- **Einspielbereit mit kleinen Änderungen**
- **Noch nicht einspielbereit**

Und konkrete Änderungen als Patch-Vorschlag formulieren.
