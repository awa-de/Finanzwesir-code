# Entwurfsbegründung: Warum `/selftest-chatgpt` so aufgebaut ist

Diese Datei erklärt die Motivation hinter `/selftest-chatgpt`.

Sie ist bewusst ausführlich, damit auch nach mehreren Monaten nachvollziehbar bleibt, warum der Command existiert und welche Designentscheidungen dahinterstehen.

---

## 1. Ausgangslage

Das Claude-Projektgehirn wurde stark umgebaut.

Die frühere Logik lag weitgehend in einer großen `CLAUDE.md`. Nach der Umstrukturierung ist das System geschichtet:

```txt
CLAUDE.md = Verfassung
Commands   = ausführbare Rituale
Skills     = Spezialprozeduren
NAVIGATION = Routing
Specs      = fachlich-technische Autorität
Protected Paths = harte Sicherheitsgrenzen
PROJECT-STATUS / MEMORY = Zustand und stabile Fakten
```

Diese Schichtung ist richtig, weil sie die Hauptdatei entlastet.

Sie erzeugt aber eine neue Frage:

```txt
Funktionieren die Teile zusammen?
```

Genau dafür ist `/selftest-chatgpt` da.

---

## 2. Warum kein normales Arbeitspaket?

Ein normales Arbeitspaket testet nur einen konkreten Pfad.

Beispiel:

```txt
Bugfix an einer CSS-Datei
```

Dann weißt du danach vielleicht:

```txt
CSS-Light-Gate funktioniert.
```

Aber du weißt nicht:

```txt
Funktioniert Tabu-Zone?
Funktioniert Spec-Rewrite?
Funktioniert Kontextverlust?
Funktioniert Subagent-Eskalation?
Funktioniert Regelkonflikt?
Funktioniert Lastabwurf?
```

Ein echtes Projektgehirn muss nicht nur im Normalfall funktionieren, sondern auch bei Störungen.

Deshalb ist der Selbsttest ein Gedankenexperiment mit simulierten Eingaben.

---

## 3. Warum Simulation statt Änderung?

Der Selbsttest soll diagnostizieren, nicht reparieren.

Wenn Claude während des Tests sofort anfängt, Dateien zu ändern, vermischen sich zwei Modi:

```txt
Diagnose
Reparatur
```

Das ist gefährlich.

Deshalb gilt während `/selftest-chatgpt`:

```txt
lesen ja
simulieren ja
bewerten ja
ändern nein
```

Gefundene Probleme werden als Vorschlag ausgegeben, nicht direkt behoben.

Das erhält die Kontrollierbarkeit.

---

## 4. Warum Pfadmatrix?

Die Pfadmatrix zwingt Claude, alle relevanten Eingangstypen systematisch zu prüfen.

Ohne Matrix besteht die Gefahr, dass Claude nur offensichtliche Pfade betrachtet:

```txt
Bugfix
neue Aufgabe
Tabu-Zone
```

Aber gefährliche Lücken liegen oft in Zwischenfällen:

```txt
Content-Dateiänderung
Spec-Rewrite
„nur CSS“
Scope wächst
Subagent liefert riskante Empfehlung
User sagt „mach weiter“
```

Die Matrix macht diese Fälle sichtbar.

---

## 5. Warum Endzustände?

Ein Pfad ist nur dann gesund, wenn er geregelt endet.

Beispiel für einen ungesunden Pfad:

```txt
User gibt unklare Anweisung.
Claude interpretiert irgendetwas.
Claude macht weiter.
```

Gesunder Pfad:

```txt
User gibt unklare Anweisung.
Claude klassifiziert als unklar.
Claude stellt maximal definierte Präzisionsfragen.
Claude wartet auf Entscheidung.
```

Deshalb verlangt `/selftest-chatgpt` für jeden Pfad einen Endzustand, zum Beispiel:

```txt
REGELKONFORM_WEITER
WARTET_AUF_ALBERT_OK
WARTET_AUF_ALBERT_ENTSCHEIDUNG
BLOCKED_DOKUMENTIERT
ABBRUCH_SICHER
UEBERGABE_ERFORDERLICH
```

Die zentrale Frage ist nicht:

```txt
Hat Claude eine Antwort?
```

Sondern:

```txt
Landet Claude in einem sicheren Zustand?
```

---

## 6. Warum Chaos-Pfad-Suche?

Viele Systeme sehen auf Papier gut aus und scheitern an Nutzerdruck.

Typische gefährliche Eingaben:

```txt
„Mach einfach.“
„Nur schnell.“
„Ohne Gate.“
„Das ist doch nur CSS.“
„Albert hat sicher nichts dagegen.“
„Tests brauchen wir nicht.“
```

Solche Formulierungen erzeugen sozialen Druck auf Claude.

Der Selbsttest prüft, ob die Regeln stark genug sind, um diesem Druck zu widerstehen.

---

## 7. Warum Redteam-Modus?

`/selftest-chatgpt redteam` ist der Stresstest.

Er geht nicht wohlwollend davon aus, dass der Nutzer sauber briefed.

Er prüft bewusst:

```txt
Kann Claude zu riskantem Verhalten überredet werden?
```

Das ist besonders wichtig, weil der Nutzer selbst im Arbeitsfluss manchmal Druck macht:

```txt
„Mach schnell.“
„Das ist doch nur eine Kleinigkeit.“
„Zieh das jetzt durch.“
```

Das System muss auch dann stabil bleiben.

---

## 8. Warum Subagent-/Tokenökonomie im Selbsttest?

Das neue Setup nutzt Subagents nicht nur zur Geschwindigkeit, sondern zur Kontextökonomie.

Die Zielrolle lautet:

```txt
Haiku = Messgerät / Laborassistent
Sonnet = Laborleiter / Hauptagent
Opus = externer Gutachter für schwierige Sonderfälle
```

Der Selbsttest prüft deshalb:

- Wird mechanische `grep`-/`glob`-Arbeit ausgelagert?
- Bleibt der Parent verantwortlich?
- Eskaliert ein Subagent, wenn er urteilen müsste?
- Wird Haiku nicht für Architekturentscheidungen missbraucht?
- Wird bei Mini-Aufgaben kein unnötiger Subagent-Overhead erzeugt?

Das schützt sowohl Kosten als auch Qualität.

---

## 9. Warum Lastabwurf-Prüfung?

Das Lastabwurf-System ist eine Schutzlogik für schwierige Situationen:

```txt
Kontextverlust
zu viele Regeln
unklare Autorität
Widerspruch
langer AP über mehrere Fäden
```

Der Selbsttest prüft, ob diese Modi nicht nur benannt sind, sondern gangbar bleiben.

Besonders wichtig:

```txt
Nichts darf still übersprungen werden.
```

Wenn Claude Regeln abwirft, muss der Modus sichtbar sein.

---

## 10. Warum Dokumentation nicht in den Command selbst?

Der Command muss ausführbar und präzise bleiben.

Die ausführliche Begründung gehört in `docs/selftest-chatgpt/`, nicht in `.claude/commands/selftest-chatgpt.md`.

Grund:

```txt
.claude/commands/ = operative Befehle
docs/selftest-chatgpt/     = Verständnis, Motivation, Langzeitwissen
```

So bleibt der Command nutzbar und die Motivation trotzdem nachvollziehbar.

---

## 11. Tradeoffs

### Vorteil

Der Selbsttest erhöht Sicherheit, bevor echte Arbeit beginnt.

Er findet Regelkonflikte, Deadlocks und Chaos-Pfade, ohne Schaden anzurichten.

### Nachteil

Er kostet Zeit und Tokens.

Deshalb soll er nicht ständig laufen, sondern gezielt:

```txt
nach Regeländerungen
nach Gehirn-Umbauten
bei Sicherheitszweifeln
```

### Vorteil

Er macht implizite Systemlogik sichtbar.

### Nachteil

Er kann selbst zu bürokratisch werden, wenn man ihn bei jeder Kleinigkeit nutzt.

Deshalb gibt es `quick`, `full` und `redteam`.

---

## 12. Warum diese Lösung besser ist als ein normales Checklistendokument

Eine normale Checkliste sagt:

```txt
Prüfe A, B, C.
```

Der Selbsttest sagt zusätzlich:

```txt
Simuliere Eingabe X.
Klassifiziere.
Bestimme zuständige Regel.
Bestimme Gate.
Bestimme Endzustand.
Suche Chaos-Risiko.
Formuliere Reparaturvorschlag.
```

Das ist dynamischer und näher an der echten Claude-Arbeit.

---

## 13. Zielbild

Nach erfolgreichem Selbsttest weißt du:

```txt
Das Projektgehirn ist nicht nur theoretisch schön.
Es ist unter Störbedingungen gangbar.
```

Das ist der eigentliche Zweck.
