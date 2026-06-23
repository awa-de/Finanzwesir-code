Stand: 2026-06-23 12:17 | Session: CHRONIK-SPEC-01 | Geändert von: Claude

# Einbinde-Prompt — Chronik-System

**An Claude Code:** Ein neues Subsystem „Chronik" wurde außerhalb des Repos
(in Cowork) erarbeitet und größtenteils schon im Projekt abgelegt. Deine
Aufgabe ist die saubere **Einbindung in die Projektsteuerung** und der
**Abschluss** über das Abschluss-Ritual. Arbeite regelkonform: Änderungen an
`docs/steering/` und `.claude/` laufen über das Full-Gate mit Alberts „OK",
`docs/steering/`-Dateien bekommen die Stand-Zeile, kein `git add`/Commit durch
dich.

Behandle dies als **neue Aufgabe** mit mehreren gegateten Schritten, nicht als
einen großen Patch.

---

## 1. Was ist eine Chronik (Kurzkontext)

Eine Chronik ist eine verdichtete, **bewertungsfreie** Erzählung eines
abgeschlossenen LLM-Arbeitsfadens — Rohmaterial für spätere Musteranalyse und
das Making-of. Drei-Schichten-Modell: *Aktiv* (handlungsleitend) /
*Material/Beleg* (Rohmasse) / *Chronik* (verdichtetes Zweitprodukt). Definiert
über die Herstellungsart: **eine Chronik ist der Output des Chronik-Prompts.**

Designentscheidungen (bereits getroffen, nicht neu aufrollen):
- Standard `chronist-v1` (bewertungsfrei). Altbestand = `standard: legacy`
  (auffindbar ≠ qualitätsgleich; nur Header ergänzt, Inhalt unangetastet).
- Frontmatter mit **geschlossenen Listen**. Ein `faden_typ` (Einzelwert),
  kein `arbeitsmodus`. `beteiligte` = nur direkte Faden-Teilnehmer; das
  chronikführende LLM trägt sich selbst ein; zitierte Fremd-Outputs = Material.

---

## 2. Was bereits existiert (von Cowork erstellt)

| Datei / Pfad | Inhalt | Status |
|---|---|---|
| `docs/steering/CHRONIK-SPEZIFIKATION.md` | SSoT: Definition, Frontmatter-Vertrag, geschlossene Listen, Namensregel, Workflow | fertig |
| `docs/steering/CHRONIK-PROMPT.md` | Copy-paste-Prompt (geschlossene Vokabel inline, Datei-/Upload-Härtung) | fertig |
| `Archiv/Chroniken/README.md` | erklärt den Ordner, verweist auf die Spec | fertig |
| `Archiv/Chroniken/chronist-v1/CHRONIK-2026-06-23-abschluss-ritual-tokenoptimierung.md` | erste echte Chronik (validiert) | fertig |
| `Archiv/Chroniken/legacy/` (4 Dateien) | migrierte Proto-Chroniken mit `legacy`-Frontmatter | fertig, Klassifikation best-effort |
| `Archiv/making-of/KAPITELRAHMEN.md` | Verweise auf die zwei verschobenen Chroniken nachgezogen | fertig |
| `.claude/skills/chronik-check/` (`validate_chronik.py`, `SKILL.md`) | Validierungs-Engine + Skill `/chronik-check` (getestet) | installiert |

Die 4 Legacy-Dateien: `Archiv_2026-06-09_Projektchronik_OA02-bis-Archivstrategie.md`,
`Archiv_oa-02-chronik-archaeologie.md`,
`Chronik_Faden_Prokrastinationspreis_AP01_AP08_Prozesslernen.md`,
`Wie-der-Skill-archivieren-das-Licht-der-Welt-erblickte.md`.

---

## 3. Auftrag — einzubinden (jeder Punkt mit Gate)

1. **Skill — installiert ✓.** Liegt in `.claude/skills/chronik-check/`. Noch
   offen: Realtest
   `python .claude/skills/chronik-check/validate_chronik.py Archiv/Chroniken`
   → Erwartung 5× `[OK]`, Exit 0. Bei Treffer feldgenau korrigieren (nur
   Frontmatter der Legacy-Datei, nie der Body).

2. **NAVIGATION.md** ergänzen (Router-Einträge): `CHRONIK-SPEZIFIKATION.md`
   (SSoT Chroniken), `CHRONIK-PROMPT.md` (Werkzeug), `Archiv/Chroniken/`
   (Ablage: `chronist-v1/` + `legacy/`), `.claude/skills/chronik-check/`
   (Validierung). Wann wird was gelesen — analog zu den übrigen Einträgen.

3. **Pfad-Casing fixen.** In `CHRONIK-SPEZIFIKATION.md` steht im Ablage-Abschnitt
   und im /archivieren-Abschnitt noch `Archiv/chroniken/` (klein). Auf
   `Archiv/Chroniken/` (großes C, tatsächlicher Ordnername) angleichen.
   `CHRONIK-PROMPT.md` ist bereits korrekt.

4. **/archivieren verzahnen.** `docs/steering/SKILL-ARCHIVIEREN-SPEZIFIKATION.md`
   (und ggf. der Skill) um Chronik als eigenen Klassifikationsfall/Zielpfad
   ergänzen: Output des Chronik-Prompts → `Archiv/Chroniken/chronist-v1/`
   (bzw. `legacy/` für Altbestand), Status `HIST + MAKING_OF_BELEG`. So greifen
   Chronik-System und Archiv-Workflow sauber ineinander, ohne Doppelstruktur.

5. **Legacy-Klassifikationen gegenlesen.** Die best-effort gesetzten
   Frontmatter-Werte der 4 Legacy-Dateien mit Albert prüfen — besonders
   `beteiligte` (bei den ersten beiden unsicher: war ChatGPT/Perplexity direkt
   beteiligt?) und `schlagworte`.

6. **Kataloge prüfen (optional).** `Archiv/legacy-map.md`: ggf. `Archiv/Chroniken/`
   als föderierten Archivort aufnehmen — aber keinen vierten Parallelkatalog
   schaffen; Konsolidierung im Blick behalten.

---

## 4. Invarianten für diese Einbindung

- `docs/steering/` und `.claude/` → Full-Gate + Alberts „OK", Stand-Zeile setzen.
- **Chronik-Texte (Body) nie verändern** — Primärquelle. Nur Frontmatter.
- Bewegen/Verschieben von Material nur über den gegateten `/archivieren`-Pfad;
  `Archiv/local/` ist gitignored; kein `git add`/Commit durch dich.
- Geschlossene Vokabel: bei Änderung Spec **und** `validate_chronik.py` im
  Gleichschritt halten.

---

## 5. Abschluss

Wenn die Einbindung (Punkte 1–5) durch ist: Abschluss-Ritual fahren
(session-log, PROJECT-STATUS, Backlog/Memory nach Lage, Commit-Message).
Dieses Einbinde-Dokument danach als erledigt markieren bzw. ins Archiv
überführen.

Optional/später (kein Teil dieser Einbindung): Git-pre-commit-Hook, der
`validate_chronik.py` automatisch fährt; maschinenlesbarer Chronik-Index erst
bei wachsendem Volumen.
