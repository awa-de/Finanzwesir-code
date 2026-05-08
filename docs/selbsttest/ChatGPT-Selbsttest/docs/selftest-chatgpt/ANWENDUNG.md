# Anwendung: Wie du `/selftest-chatgpt` nutzt

Diese Anleitung beschreibt, wo die Dateien liegen sollen, wie du den Command auslöst und wo die Dokumentation sinnvoll abgelegt wird.

---

## 1. Wo kommt die Command-Datei hin?

Die Datei muss hier liegen:

```txt
.claude/commands/selftest-chatgpt.md
```

Dann kannst du sie in Claude Code als Slash-Command verwenden:

```txt
/selftest-chatgpt
```

oder mit Modus:

```txt
/selftest-chatgpt quick
/selftest-chatgpt full
/selftest-chatgpt redteam
```

---

## 2. Wo kommt die Dokumentation hin?

Empfohlener Ort:

```txt
docs/selftest-chatgpt/
  README.md
  ANWENDUNG.md
  ENTWURFSBEGRUENDUNG.md
  CHECKLISTE.md
```

Warum nicht direkt in `.claude/commands/`?

Weil `.claude/commands/` möglichst nur ausführbare Slash-Commands enthalten sollte.

Wenn dort lange Doku-Dateien liegen, kann das für Menschen und Claude verwirrend werden:

- Ist das ein Command?
- Soll Claude das automatisch ausführen?
- Ist das Referenzdoku?
- Gehört das zum aktiven Befehlsset?

Deshalb:

```txt
.claude/commands/ = ausführbare Commands
docs/selftest-chatgpt/     = Erklärung, Motivation, Anwendung, Beispiele
```

---

## 3. Kann die Doku trotzdem unter `.claude/commands/` liegen?

Ja, aber nur in einem klar markierten Unterordner, zum Beispiel:

```txt
.claude/commands/_docs/selftest-chatgpt/README.md
```

Das ist akzeptabel, aber weniger sauber als `docs/selftest-chatgpt/`.

Wenn du unbedingt alles nahe am Command halten willst, dann nutze:

```txt
.claude/commands/
  selftest-chatgpt.md
  _docs/
    selftest-chatgpt/
      README.md
      ANWENDUNG.md
      ENTWURFSBEGRUENDUNG.md
      CHECKLISTE.md
```

Wichtig ist der Unterstrich `_docs`, damit klar ist:

```txt
Das sind keine Commands.
```

Meine Empfehlung bleibt:

```txt
docs/selftest-chatgpt/
```

---

## 4. Empfohlener Einbau

### Schritt 1: Datei kopieren

Kopiere:

```txt
.claude/commands/selftest-chatgpt.md
```

in dein Projekt.

### Schritt 2: Doku kopieren

Kopiere den Ordner:

```txt
docs/selftest-chatgpt/
```

in dein Projekt.

### Schritt 3: Optional in `CLAUDE.md` referenzieren

Nicht den ganzen Selbsttest in `CLAUDE.md` kopieren.

Nur eine kurze Referenz ergänzen:

```md
## Systemgesundheitstest

Nach größeren Änderungen am Projektgehirn kann `/selftest-chatgpt` ausgeführt werden.
Der Command simuliert Routing-, Gate-, Tabu-, Subagent-, Lastabwurf- und Chaos-Pfade ohne produktive Dateien zu ändern.

Modi:
- `/selftest-chatgpt quick`
- `/selftest-chatgpt full`
- `/selftest-chatgpt redteam`

Doku: `docs/selftest-chatgpt/README.md`
```

Das reicht.

---

## 5. Wie startest du den Test im nächsten Faden?

Empfohlen:

```txt
/start

Danach bitte keinen normalen Arbeitsmodus starten.
Ich möchte einen Systemgesundheitstest durchführen.

Führe /selftest-chatgpt full aus:
- keine produktiven Dateien ändern
- keine echten Arbeitspakete starten
- alle Pfade trocken simulieren
- Chaos-Pfade explizit suchen
- Ergebnis GRÜN/GELB/ROT
- konkrete Reparaturvorschläge nur als Vorschlag ausgeben
```

Wenn der Command sauber eingebaut ist, reicht meistens:

```txt
/start
/selftest-chatgpt full
```

---

## 6. Wann welcher Modus?

### Nach kleiner Änderung

```txt
/selftest-chatgpt quick
```

Beispiel:

- ein Command wurde leicht angepasst
- eine Formulierung in `CLAUDE.md` wurde geschärft
- ein Skill wurde ergänzt

---

### Nach großer Änderung

```txt
/selftest-chatgpt full
```

Beispiel:

- neue `CLAUDE.md`
- neue Command-Struktur
- neue Skills
- geänderte Gate-Logik
- geänderte Autoritäten

---

### Nach Sicherheitsänderung oder bei Misstrauen

```txt
/selftest-chatgpt redteam
```

Beispiel:

- du willst testen, ob Claude „mach einfach“ widersteht
- du willst prüfen, ob Tabu-Zonen hart bleiben
- du willst sehen, ob Subagenten nicht zu Entscheidern werden
- du willst Regelkonflikte provozieren

---

## 7. Was machst du mit dem Ergebnis?

### Wenn GRÜN

Du kannst normal weiterarbeiten.

Optional kleine Verbesserungen später einplanen.

### Wenn GELB

Du kannst meist weiterarbeiten, solltest aber die Top-Befunde prüfen.

GELB heißt:

```txt
System grundsätzlich gangbar, aber Reibung oder Unklarheit vorhanden.
```

Typischer nächster Schritt:

```txt
Nimm die GELB-Befunde und formuliere daraus konkrete Änderungsvorschläge für CLAUDE.md / Commands / Skills. Noch nichts ändern.
```

### Wenn ROT

Vor echter Arbeit reparieren.

ROT heißt:

```txt
Es gibt mindestens einen Chaos-Pfad oder harten Regelkonflikt.
```

Typischer nächster Schritt:

```txt
Priorisiere die ROT-Befunde. Welche eine Änderung schließt den gefährlichsten Chaos-Pfad?
```

---

## 8. Wichtig: Selbsttest nicht inflationär nutzen

Der Selbsttest ist ein Diagnosewerkzeug, kein tägliches Ritual.

Nicht bei jedem kleinen Arbeitspaket starten.

Sonst wird die Sicherheitsarchitektur selbst zur Last.

Gute Faustregel:

```txt
Normale Arbeit: kein Selbsttest
Regeländerung: quick
Architekturänderung am Gehirn: full
Sicherheitszweifel: redteam
```
