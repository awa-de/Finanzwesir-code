Stand: 2026-06-23 | Session: CHRONIK-EINBINDUNG | Geändert von: Claude

# Spezifikation — Chronik

Verbindliche Quelle (SSoT) für alles Chronik-bezogene im Finanzwesir-2.0-Projekt:
Definition, Frontmatter-Vertrag, Namenskonvention, Ablage, Workflow und das
Verhältnis zum föderierten Archivmodell und zu `/archivieren`.

Aus dieser Spezifikation leiten sich ab: der Chronik-Prompt
(`docs/steering/CHRONIK-PROMPT.md`), die Validierungs-Engine
(`validate_chronik.py`), der Skill `/chronik-check` und die Migration des
Altbestands.

---

## Zweck

Eine Chronik friert einen abgeschlossenen LLM-Arbeitsfaden als verdichtete,
quellentreue, bewertungsfreie Erzählung ein. Sie ist das Rohmaterial für
spätere projektübergreifende Musteranalyse und für das Making-of: Was wurde
versucht, was verworfen, welche Wendepunkte, welcher Endstand.

Die Chronik ist **nicht** die Analyse. Sie ist deren Probe. Ihre Qualität
bestimmt die Qualität jeder späteren Auswertung — eine verseuchte Probe macht
jede noch so genaue Analyse wertlos.

---

## Definition

**Eine Chronik ist der Output des Chronik-Prompts (`CHRONIK-PROMPT.md`),
angewandt auf einen Arbeitsfaden.**

Definiert über die Herstellungsart, nicht über das Thema. Eigenschaften:

- verdichtet (Rauschen entfernt, Weg erhalten),
- bewertungsfrei (kein „gut/schlecht", kein „erfolgreich/gescheitert"),
- chronologisch und kausal (Irrwege bleiben erhalten),
- maschinenlesbar (YAML-Frontmatter nach dem Vertrag unten).

---

## Abgrenzung — drei Schichten

| Schicht | Was | Beispiele | Ort |
|---|---|---|---|
| Aktiv | handlungsleitend, „was heute gilt" | CLAUDE.md, specs, steering | aktiver Pfad |
| Material / Beleg | Rohmasse für spätere Analyse | Prompts, Handovers, Peer-Reviews, Entscheidungsprotokolle, LLM-Dumps | Archiv / `local/` |
| Chronik | verdichtetes, bewertungsfreies Zweitprodukt aus einem Faden | dieses Dokument regelt sie | `Archiv/Chroniken/` |

**Keine Chronik** (das ist Material/Beleg): Handover, Peer-Review,
Entscheidungsprotokoll, Roh-Chatexport.

**Grenzfall Retrospektive:** nur dann Chronik, wenn sie als Faden-Extraktion
mit dem Chronik-Prompt erzeugt wurde. Sonst Beleg.

---

## Frontmatter-Vertrag

Jede Chronik beginnt mit diesem YAML-Block. Geschlossene Felder erlauben
**ausschließlich** die gelisteten Werte (kleingeschrieben, kebab-case,
Umlaute als ae/oe/ue). Kein Wert außerhalb der Liste, keine erfundenen
Synonyme.

| Feld | Art | Erlaubte Werte |
|---|---|---|
| `chronik_id` | frei | = Dateiname ohne Endung |
| `datum` | frei | `YYYY-MM-DD` \| `unbekannt` |
| `projekt` | frei | kebab-case |
| `thema` | frei | kebab-case |
| `beteiligte` | geschlossen, Liste | `nutzer`, `claude`, `chatgpt`, `perplexity`, `gemini` |
| `typ` | geschlossen | `chronik` |
| `standard` | geschlossen | `chronist-v1` \| `legacy` |
| `faden_typ` | geschlossen | `konzeptarbeit`, `recherche`, `umsetzung`, `debugging`, `entscheidungsfindung`, `prompt-erstellung`, `review`, `mischform` |
| `status_am_ende` | geschlossen | `abgeschlossen`, `offen`, `teilweise`, `unklar` |
| `quellenlage` | geschlossen | `vollstaendiger-faden`, `ausschnitt`, `mit-anhaengen`, `ohne-anhaengen` |
| `schlagworte` | geschlossen, Liste | `scope-drift`, `richtungswechsel`, `sackgasse`, `durchbruch`, `blockade`, `externe-abhaengigkeit`, `fehlende-quelle`, `missverstandene-anforderung`, `unklare-zustaendigkeit`, `konzept-vs-umsetzung`, `vollstaendigkeit-vs-verdichtung`, `abbruchregel`, `praezisierung-durch-gegenfrage`, `tooling-problem`, `annahme-verworfen` |

Beispiel:

```yaml
---
chronik_id: CHRONIK-2026-06-23-chronisten-prompt
datum: 2026-06-23
projekt: chronik-system
thema: chronisten-prompt
beteiligte: [nutzer, claude]
typ: chronik
standard: chronist-v1
faden_typ: prompt-erstellung
status_am_ende: teilweise
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, vollstaendigkeit-vs-verdichtung]
---
```

`faden_typ` trägt den **einen** dominanten Charakter des Fadens. Die Vielfalt
dessen, was im Faden passierte, fangen die `schlagworte` ein — nicht ein
zweites Typ-Feld.

**`beteiligte` — nur direkte Teilnehmer.** Aufgenommen werden ausschließlich
die im Faden direkt Handelnden: der Nutzer und das/die LLM(s), die im Faden
selbst geantwortet haben — insbesondere das chronikführende LLM selbst (es
trägt sich ein). Bloß zitierte oder als Material eingefügte Fremd-LLM-Outputs
(z.B. ein eingefügtes Audit eines anderen Modells) zählen NICHT als beteiligt;
sie sind Inhalt, keine Teilnehmer.

---

## Namenskonvention

```
CHRONIK-YYYY-MM-DD-thema.md
```

`thema` in kebab-case. Datum führt → chronologisch sortierbar und greppbar.
Der Dateiname spiegelt `chronik_id` und ist die menschenfreundliche Ablage;
die maschinelle Wahrheit steht im Frontmatter.

---

## Ablage

```
Archiv/Chroniken/
├── README.md           erklärt Ordner, verweist auf diese Spec
├── chronist-v1/        Chroniken nach aktuellem Standard
└── legacy/             Proto-Chroniken (standard: legacy)
```

Chroniken sind Historie und gehören damit ins föderierte Root-Archiv. Die
physische Trennung `chronist-v1/` vs. `legacy/` macht die `standard`-Angabe
auf einen Blick sichtbar, sodass eine spätere Analyse die Alt-Qualität
gezielt ein- oder ausschließen kann.

---

## Standard-Versionierung

- `chronist-v1` — Chronik nach dem aktuellen Chronik-Prompt, bewertungsfrei.
- `legacy` — Proto-Chronik aus der Frühzeit (vor dieser Spezifikation).
  Auffindbar, aber nicht qualitätsgleich. Inhalt bleibt unangetastet; nur das
  Frontmatter wird ergänzt. Archäologen-Prinzip: das angeknabberte Papyrus
  wird ehrlich etikettiert, nicht nachgemalt.

Wird der Standard fortgeschrieben, erhält er eine neue Kennung (`chronist-v2`
…). Alte Chroniken werden dadurch nicht ungültig.

---

## Workflow (laufender Prozess)

1. Albert stellt fest: Zeit für eine Chronik.
2. `CHRONIK-PROMPT.md` 1:1 in den Faden des Ziel-LLM kopieren.
3. Das LLM gibt eine benannte, formatierte `.md` mit vollständigem Frontmatter
   zurück.
4. Albert legt die Datei in `Archiv/Chroniken/chronist-v1/`.
5. `/chronik-check` ausführen → deterministische Prüfung des Frontmatters
   gegen diese Spec → bei Abweichung Korrektur (nur Frontmatter, nie Text).

Der manuelle Ablage-Schritt durch Albert ist kein gegateter Vorgang — Albert
handelt selbst. Gegatet ist nur, wenn Claude Dateien anlegt, ändert oder
verschiebt.

---

## Verhältnis zu `/archivieren` und zum föderierten Modell

- Chroniken tragen im Archivmodell den Status `HIST + MAKING_OF_BELEG`.
- Das Verschieben von Material (z.B. Altbestand nach `Chroniken/legacy/`)
  läuft über den gegateten `/archivieren`-Workflow — Block für Block, mit
  Freigabe, kein Massendurchlauf.
- `Archiv/local/` bleibt gitignored; Dateien von dort herauszuholen ändert den
  Git-Status und wird ausdrücklich freigegeben.
- Diese Spec ergänzt `ARCHIV-STRATEGIE.md`; sie ersetzt sie nicht. Bei
  Widerspruch gilt die Prioritätsordnung aus `CLAUDE.md`.

---

## Änderung dieser Spezifikation

Die geschlossenen Listen — besonders `schlagworte` — sind bewusst eng. Sie
werden nicht laufend gepflegt, sondern **selten und gezielt** hier geändert.
Eine geschlossene Liste bedeutet: später findbar sind nur die Muster, die hier
vorgesehen sind. Das ist der bewusst gewählte Tausch gegen Null
Pflegeaufwand. Jede Änderung aktualisiert die Stand-Zeile und muss mit der
Validierungs-Engine (`validate_chronik.py`) konsistent gehalten werden.
