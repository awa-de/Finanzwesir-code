# Übergabe-Prompt: Projektsteuerung Synthese aktivieren
Erstellt: 2026-05-03 | Für: nächste Claude-Session

---

## Kontext (was in der letzten Session passiert ist)

Drei LLMs (ChatGPT, Gemini, Perplexity) haben die bestehende CLAUDE.md und NAVIGATION.md
einem Peer-Review unterzogen. Alle drei Vorschläge lagen in:
`docs/Optimierung Projektsteuerung/Chatgpt/`, `/Gemini/`, `/Perplexity/`

Daraus wurde eine Synthese entwickelt, die ein zusätzliches Architekturprinzip integriert
(das keiner der drei Reviews hatte): das **Kreuzfahrt-Modell**.

> Albert gibt das Ziel an. Claude navigiert den Prozess.
> Albert entscheidet an echten Entscheidungspunkten. Claude führt alles andere aus.

Die Synthese-Dateien liegen in:
`docs/Optimierung Projektsteuerung/Synthese/`

**Sie sind noch NICHT aktiviert.** Das ist die Aufgabe dieser Session.

---

## Was die Synthese enthält

```
Synthese/
├── CLAUDE.md              Neue Verfassung (Entscheidungsbaum als Kern)
├── NAVIGATION.md          Neuer Router
├── PRAXIS-ANLEITUNG.md    Anleitung für Albert (wie er damit arbeitet)
├── BEGRUENDUNG.md         Rationale + Herkunft jeder Entscheidung
└── skills/
    ├── abschluss-ritual/SKILL.md
    ├── decompose/SKILL.md
    ├── manual-test-plan/SKILL.md
    └── spec-rewrite-guard/SKILL.md
```

Die BEGRUENDUNG.md erklärt vollständig was aus welcher Quelle kam und was verworfen wurde.
**Vor Aktivierung lesen.**

---

## Bekannte Lücke (vor Aktivierung schließen)

Die neue CLAUDE.md enthält noch KEINE Code-Stil-Regeln. Diese fehlen und müssen ergänzt werden.

**Aus der alten CLAUDE.md §3 (vor Aktivierung in neue §5 oder neuen §6 einfügen):**

```
Tech-Stack & Stil:
- Sprache: JavaScript / TypeScript (je nach Datei)
- Umgebung: 100 % Client-Side (Browser), Ghost CMS
- Charts: Chart.js + eigene Layer

Code-Stil:
- Nur const/let, kein var (bestehende var-Stellen nur bewusst und schrittweise ändern)
- 2 Spaces Indent
- Kleine, klar fokussierte Funktionen
- Keine neuen Libraries/Frameworks ohne explizite Anweisung — erst Rückfrage, dann DECISION-LOG.md

CSS (bindend):
- Eine Datei: assets/css/screen.css, 7 Abschnitte, Reihenfolge bindend
- Hex-Werte NUR in Abschnitt 1 (TOKENS)
- fw-* Klassen NIE in screen.css definieren oder überschreiben
- contain: layout NIE auf .financial-chart-module
- Keine externen Font-Quellen
- Neue Komponente → Drei-Fragen-Ritual (siehe CSS-KONVENTIONEN.md)
```

Einfügen als neuer `§ 5a` oder als Ergänzung zu `§ 5 Architektur-Layer` in Synthese/CLAUDE.md
**bevor** die Datei ins Live-Verzeichnis transferiert wird.

---

## Aufgaben in Reihenfolge

### Schritt 1 — Lücke schließen (vor Transfer)

Code-Stil-Regeln in `Synthese/CLAUDE.md` ergänzen (siehe oben).
Zeige Albert den Diff-Vorschlag, warte auf OK.

### Schritt 2 — Altes Backup anlegen

Vor dem Überschreiben sichern:
```
.claude/CLAUDE.md        → docs/Optimierung Projektsteuerung/Archiv/CLAUDE-pre-synthese-2026-05-03.md
NAVIGATION.md            → docs/Optimierung Projektsteuerung/Archiv/NAVIGATION-pre-synthese-2026-05-03.md
```

### Schritt 3 — Transfer (nach Alberts OK)

| Quelle (Synthese/) | Ziel (Live) |
|---|---|
| `CLAUDE.md` | `.claude/CLAUDE.md` (überschreibt bestehende) |
| `NAVIGATION.md` | `NAVIGATION.md` (Projekt-Root, überschreibt bestehende) |
| `PRAXIS-ANLEITUNG.md` | `docs/steering/PRAXIS-ANLEITUNG.md` (neu) |
| `skills/abschluss-ritual/SKILL.md` | `.claude/skills/abschluss-ritual/SKILL.md` (neu) |
| `skills/decompose/SKILL.md` | `.claude/skills/decompose/SKILL.md` (neu) |
| `skills/manual-test-plan/SKILL.md` | `.claude/skills/manual-test-plan/SKILL.md` (neu) |
| `skills/spec-rewrite-guard/SKILL.md` | `.claude/skills/spec-rewrite-guard/SKILL.md` (neu) |
| `BEGRUENDUNG.md` | `docs/Optimierung Projektsteuerung/Synthese/BEGRUENDUNG.md` (bleibt, kein Transfer nötig) |

### Schritt 4 — Andere Dateien prüfen (nicht alle nötig)

**Muss angepasst werden:**
- `WORKFLOW.md` (falls vorhanden): prüfen ob es auf alte Session-Start-Schritte verweist
  → Verweis auf neue PRAXIS-ANLEITUNG.md ergänzen oder alte Schritte entfernen
- `NEUE-AUFGABEN.md` (falls vorhanden): prüfen ob es die alte 5-Fragen-Checkliste enthält
  → Hinweis: Claude stellt diese Fragen jetzt automatisch

**Muss NICHT angepasst werden:**
- `PROJECT-STATUS.md` — format unverändert, wird wie bisher gelesen
- `docs/steering/BACKLOG.md` — unverändert
- `.claude/ATTEMPT-LOG.json` — format identisch
- `.claude/PROTECTED_PATHS.json` — unverändert
- Alle globalen Skills (`00-style-sei-deutsch`, `01-process-extreme-ownership` etc.) — unverändert
- Alle `docs/spec/`-Dateien — unverändert
- Alle `docs/steering/`-Dateien außer oben genannte — unverändert

### Schritt 5 — MEMORY aktualisieren

Speichere in Memory:
- Neue Architektur ist aktiviert: CLAUDE.md = Verfassung + Entscheidungsbaum, Kreuzfahrt-Modell
- 4 neue Projekt-Skills: abschluss-ritual, decompose, manual-test-plan, spec-rewrite-guard
- Datum der Umstellung: 2026-05-03

### Schritt 6 — Erste Session unter neuem Setup (Funktionstest)

Nach Transfer: Neue Konversation starten. Claude sollte automatisch SESSION-START ausgeben
ohne dass Albert etwas tippt außer seiner ersten Aufgabe.

Erwartete Ausgabe:
> „SESSION-START ✓ | Fokus: [X] | Aktive APs: [Y] | BLOCKED: [Z oder keine]"

Falls das nicht kommt: CLAUDE.md §2 Session-Start-Abschnitt prüfen.

---

## Wichtige Entscheidungen aus der letzten Session (nicht nochmal diskutieren)

- **Kreuzfahrt-Modell ist beschlossen:** Claude navigiert, Albert entscheidet. Nicht rückgängig machen.
- **Advocatus Diaboli ist mandatory in jedem Full-Gate** — kein Opt-in.
- **`disable-model-invocation: true` wird nicht gesetzt** — Claude soll proaktiv fahren dürfen.
- **Geminis Refactor-First verworfen** — zu riskant ohne Testpipeline.
- **5 Skills aus ChatGPT-Vorschlag nicht übernommen** (projekt-start, pre-code-gate, blocked-analysis, app-start, neue-aufgabe) — deren Logik ist jetzt im Entscheidungsbaum in CLAUDE.md §2.
- **Globale Skills sind Denkmodi, keine Prozeduren** — Claude schlägt sie proaktiv vor, Albert kennt die Namen nicht zwingend.

---

## Dateien die für diese Session gelesen werden müssen

1. `docs/Optimierung Projektsteuerung/Synthese/BEGRUENDUNG.md` — vollständige Rationale
2. `docs/Optimierung Projektsteuerung/Synthese/CLAUDE.md` — was transferiert wird
3. `.claude/CLAUDE.md` — was ersetzt wird (für Diff/Backup)
4. `NAVIGATION.md` — was ersetzt wird (für Diff/Backup)
