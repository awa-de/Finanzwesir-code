# Praxis-Anleitung: Arbeiten mit der Finanzwesir-Projektsteuerung
Stand: 2026-05-03

---

## Das Prinzip

Albert gibt das Ziel an. Claude navigiert den Prozess.
Albert entscheidet an echten Entscheidungspunkten. Claude führt alles andere aus.

**Was Albert sich merken muss: nichts außer „klares Ziel nennen".**

---

## Was Albert sagt — was Claude tut

| Albert sagt | Claude tut |
|---|---|
| Beschreibt ein Problem | Klassifiziert, fragt max. 2 Mal nach wenn nötig, liest relevante Dateien, führt Gate aus, wartet auf OK |
| „OK" | Schreibt Code |
| „Stopp" / „Nein" | Hält an, fragt nach was fehlt |
| „Neue Aufgabe: X" | Führt Intake-Protokoll durch (stellt die 5 Fragen), zeigt Preview, wartet auf OK |
| „Fertig" / „Das passt" | Bietet Abschluss-Ritual an |
| „Jetzt zerlegen" | Startet Zerlegungsprotokoll, zeigt Preview, wartet auf OK |
| Stellt eine Frage | Antwortet direkt, kein Gate |
| Denkt laut / „ich überlege ob..." | Denkt mit, kein Backlog-Eintrag, kein Gate |

---

## Typische Sessions

### Session starten

Albert öffnet die Konversation und sagt was er will.
Claude liest automatisch PROJECT-STATUS.md, NAVIGATION.md, ATTEMPT-LOG.json, BACKLOG.md
und gibt aus:

> „SESSION-START ✓ | Fokus: CSS-5 Font-Integration | Aktive APs: AP-20, AP-21 | BLOCKED: keine"

Kein `/start`-Kommando, kein „lies erstmal die Dateien" nötig.

---

### Bug fixen

**Albert:**
> „Die X-Achse zeigt falsche Labels bei wöchentlichen Daten."

**Claude:**
> „Bei welchem Chart-Typ passiert das — Line, Bar oder alle? Und tritt das nur bei bestimmten Datumsbereichen auf?"

**Albert:**
> „Bar Charts, alle Datumsbereiche."

**Claude liest** BACKLOG.md, ATTEMPT-LOG.json, relevante Spec, WORKING-FEATURES.md.

**Claude führt Full-Gate aus** (mehrere Dateien betroffen) und zeigt:
> „1. Was darf nicht brechen: ... 2. Bindende Spec: ... [...] 8. Advocatus Diaboli: Der Fix könnte die PERIOD-Track-Logik für monatliche Daten destabilisieren weil..."

**Albert:**
> „OK"

**Claude** schreibt Code.

**Claude danach:**
> „Testplan: HTML-Datei chart-test-bar-weekly.html, Zone M und L prüfen, erwartetes Verhalten: [...]. Soll ich danach das Abschluss-Ritual für AP-20 starten?"

---

### Neue Aufgabe aufnehmen

**Albert:**
> „Ich merke, dass die Tooltips auf Mobile zu klein sind."

**Claude erkennt:** neue Aufgabe, führt Intake durch:
> „1. Bereich: Engine oder CSS? 2. Problem in 1 Satz: Tooltip-Text zu klein auf Mobile — stimmt das? 3. Priorität: Launch-blockierend, wichtig oder nice-to-have? 4. Abhängigkeiten: Hängt das von einem offenen AP ab? 5. Brauchen wir eine Detail-Spec-Datei oder reicht ein Backlog-Eintrag?"

**Albert** beantwortet die Fragen.

**Claude zeigt Preview:**
> „AP-22 | Tooltip-Schriftgröße Mobile erhöhen | Prio M | Dep: keine — soll ich das so in den Backlog schreiben?"

**Albert:**
> „Ja"

**Claude** schreibt in BACKLOG.md.

---

### Idee erkunden

**Albert:**
> „Ich überlege, ob wir einen Sparrechner als App bauen sollen. Ich bin mir nicht sicher ob das sinnvoll ist."

**Claude erkennt:** Exploration, kein Task, kein Gate.
Claude denkt mit, stellt Fragen, strukturiert Vor- und Nachteile.
Kein Backlog-Eintrag bis Albert sagt „jetzt zerlegen".

**Albert später:**
> „OK, das wollen wir. Jetzt zerlegen."

**Claude** startet `/decompose`: listet alle identifizierten Teilaufgaben, zeigt Preview, wartet auf Albert's OK.

---

### App bauen

**Albert:**
> „Ich will mit dem Monatsrechner anfangen."

**Claude:**
> „Stopp. Ich lese APP-INTERFACE.md und SECURITY-BASELINE.md jetzt."

**Claude liest, bestätigt:**
> „APP-INTERFACE.md ✓, SECURITY-BASELINE.md ✓. Full-Gate für App-Arbeit:"
> [führt Full-Gate aus]

**Albert:**
> „OK"

**Claude** schreibt Code.

---

### Wenn Claude stoppt (Abbruch-Trigger)

Zwei gescheiterte Versuche, unklare Ursache, Scope wächst — Claude stoppt von sich aus:

> „Stopp. Zweiter Fixversuch hat das Problem nicht gelöst. Stand: [...] Vermutete Ursache neu: [...] Optionen: A) [...] Risiko hoch. B) [...] Risiko mittel. Ich brauche deine Entscheidung bevor ich weitermache."

Albert entscheidet. Claude wartet.

---

## Was Albert explizit aufrufen kann (muss er aber nicht)

Claude schlägt diese von sich aus vor — aber Albert kann sie auch direkt aktivieren:

| Kommando | Wann Albert es direkt nutzen will |
|---|---|
| `/abschluss-ritual AP-20` | Wenn Albert weiß dass eine Aufgabe fertig ist und den Abschluss anstoßen will |
| `/decompose` | Direkt nach einer Planungsphase |
| `/manual-test-plan AP-20` | Wenn Albert einen strukturierten Testplan braucht bevor er testet |
| `/spec-rewrite-guard docs/spec/X.md` | Wenn Albert selbst eine Spec bearbeiten will |

---

## Globale Denkmodi — Claude schlägt sie vor

Diese Skills verändern wie Claude denkt, nicht was Claude tut:

| Wenn Claude sagt... | Bedeutet das |
|---|---|
| „Soll ich dafür eine technische Spec ausarbeiten?" | `spec-mode-architecture` — aus Idee wird belastbare Spec |
| „Soll ich das als sauberes Arbeitspaket implementieren?" | `impl-mode-workpackages` — strukturierte Umsetzung |
| „Soll ich den Code nach dem Fix reviewen?" | `check-mode-gatekeeper` — QA-Gate nach Implementierung |
| „Soll ich das aus mehreren Perspektiven analysieren?" | `analysis-top-01` — tiefgehende Analyse |
| „Soll ich zuerst prüfen ob das Briefing vollständig ist?" | `01-process-extreme-ownership` — Brief validieren |

Albert antwortet „Ja" oder „Nein". Die Skill-Namen muss Albert nicht kennen.

---

## Gute vs. schlechte Eingaben (Kurzreferenz)

| Schlecht | Besser |
|---|---|
| „Das funktioniert nicht." | „Bar-Chart zeigt falsche X-Labels bei wöchentlichen Daten." |
| „Mach das besser." | „Die Tooltips sind auf Mobile zu klein — unter 600px kaum lesbar." |
| „Du weißt schon." | Konkretes Problem nennen — Claude hat kein Gedächtnis zwischen Sessions. |
| Drei Probleme auf einmal | Ein Problem, dann nächstes. Claude priorisiert sonst willkürlich. |
| „Bau mir schnell einen Rechner." | „Ich will einen Sparrechner als App — können wir das Briefing durchgehen?" |

**Faustregel:** Was + Wo + Wann/Trigger. Den Rest fragt Claude nach.

---

## Was nie nötig ist

- Slash-Kommandos für Standard-Workflows kennen
- Daran denken, das Gate aufzurufen
- Daran denken, Dateien zu lesen
- Daran denken, das Abschluss-Ritual zu starten
- Den Unterschied zwischen Light-Gate und Full-Gate kennen

Claude erledigt das. Albert fokussiert auf Inhalt und Entscheidungen.
