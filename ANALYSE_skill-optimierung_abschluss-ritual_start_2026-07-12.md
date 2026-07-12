# Analyse: Token-Optimierung `abschluss-ritual` und `start`

Stand: 2026-07-12 | Session: Skill-Optimierung | Erstellt von: Claude (Fable)
Status: **Analyse + Vorschlag — kein Rewrite erfolgt, wartet auf Alberts Freigabe (Freigabeprinzip)**

---

## Schritt 0 — Call-Graph-Inventar (deterministisch erhoben, vor Voll-Reads)

**`abschluss-ritual`** (Skill, 714 Zeilen / ~5.472 Tok Körper)

| Aufgerufen/Gelesen | Art | Größe | Wann |
|---|---|---|---|
| `.claude/agents/abschluss-writer.md` | Agent (haiku) | ~1.357 Tok | Pfad A/B: alle mechanischen Edits |
| `.claude/agents/abschluss-scout.md` | Agent (haiku) | ~835 Tok | Pfad A, optional (SKILL.md:539–551) |
| `PROJECT-STATUS.md` (inkl. HOOK-META Z.1–10) | Read+Write | ~30.942 Tok | Pfad A/B pflicht (SKILL.md:225, 261–281, 604–615) |
| `NAVIGATION.md` | Read+Write | ~18.503 Tok | Pfad A/B pflicht (SKILL.md:224) |
| `docs/steering/BACKLOG.md` | Read+Write | ~3.269 Tok | Pfad A/B pflicht (SKILL.md:226, 289) |
| `docs/steering/BACKLOG-ARCHIV.md` | Read+Write | ~36.158 Tok | Pfad A/B pflicht; Sofort-erledigt: „lesen" (SKILL.md:581) |
| `.claude/learning/session-log.md` | Append | ~18.462 Tok | alle Pfade |
| `DEFINITION-OF-DONE.md`, `REGRESSION-MATRIX.md`, `WORKING-FEATURES.md` | Read | 1.020/2.457/1.856 Tok | Pfad A bzw. Engine-APs (SKILL.md:563–577) |
| `.claude/memory/`, `docs/spec/`, `tools/check-memory-integrity.py` | bedingt | var. | Pfad A (SKILL.md:569, 598–602) |

**`start`** (Command, 113 Zeilen / ~1.261 Tok Körper)

| Aufgerufen/Gelesen | Art | Größe | Wann |
|---|---|---|---|
| SessionStart-Hook `session-start.ps1` | Hook (0 Tok Rechenkosten, Output in Kontext) | Output ~0,7–1k Tok (s. Befund 2) | jeder Session-Start, vor dem Command |
| `.claude/learning/session-log.md` (letzte 20 Z.) | Read, gezielt | ~200 Tok | immer (start.md:7) |
| `spec-scout` Agent (haiku) | Dispatch | Agent 835 Tok + liest NAVIGATION 18,5k + BACKLOG-ARCHIV 36,2k + BACKLOG 3,3k **voll** | nur Kaltstart-Vollmodus (start.md:68–81) |
| `.claude/memory/MEMORY.md` | Read | ~2.502 Tok | nur Vollmodus (start.md:65) |
| `00-style-sei-deutsch/SKILL.md` | Read | ~1.226 Tok | Vollmodus + Kettenmodus (start.md:96) |
| `PROJECT-STATUS.md` | Edit (⚠ erzwingt Read) | ~30.942 Tok | nur Montag + Kassensturz fällig (start.md:111) |

Modell-Routing: `abschluss-scout.md:4`, `abschluss-writer.md:4`, `spec-scout.md:5` alle `model: haiku`; `settings.local.json:42` setzt `CLAUDE_CODE_SUBAGENT_MODEL=haiku`. **Kein Fehlrouting bei den Agenten.** Weder SKILL.md noch start.md haben `model:`-Frontmatter — Skills/Commands laufen auf dem Hauptmodell der Session; der Opus-Anteil (~29 %) trifft damit auch jedes Ritual. Skill-seitig nicht steuerbar → gehört an Albert (Session-Modellwahl).

---

## Schritt 1 — Kosten-Anatomie

### Befund 1 (Hauptbefund): HOOK-META ist vom Kompakt-Schema zum Narrativ-Dump gedriftet

Das Soll aus dem Skill selbst: 6 kurze Zeilen, ~60 Tok (SKILL.md:265–273; abschluss-writer.md:95–102). Das Ist in `PROJECT-STATUS.md:1–10`: **~16.533 Bytes ≈ 4.133 Tok**, davon:

- `Fokus-AP` = 1.469 Zeichen Fließtext-Erzählung (PROJECT-STATUS.md:4)
- `Nächster-Schritt` = 709 Zeichen (PROJECT-STATUS.md:5)
- `Nebenabschluss` = **14.250 Zeichen** (PROJECT-STATUS.md:6) — ein Feld, das der Hook **gar nicht parst** (session-start.ps1:48–54 kennt nur Version/Stand/Fokus-AP/Nächster-Schritt/Blocker/Letzter-Distill/Kassensturz-Datum). Reines totes Gewicht im maschinenlesbaren Block.

Kostenwirkung pro `abschluss-ritual`-Lauf (Pfad A und B, also der Normalfall): Sonnet liest den Block (~4,1k), komponiert den neuen Literal als Writer-Operation (~4,1k **Output**, teuerste Tokensorte, abschluss-writer.md:93–102), der Writer echo-t ihn vollständig zurück (Pflicht: SKILL.md:335–336, abschluss-writer.md:154–155), Sonnet prüft ihn erneut (SKILL.md:277–278). **Grob 10–12k Tok pro Abschluss nur für HOOK-META — gegen ~200 Tok im Soll-Schema. Das erklärt allein den Großteil des 1,7×-Aufschlags gegenüber start.** (Läufe-genaue Zahl: spekulativ, da keine Per-Lauf-Messung vorliegt; Blockgröße und Mechanik sind belegt.)

Kostenwirkung pro Session-Start: session-start.ps1:124–125 dumpt `Fokus-AP` und `Naechster Schritt` ungekürzt in jeden Hook-Output → ~550 Tok Narrativ in **jedem** Session-Start, auch Warm-Starts.

### Befund 2: Skill-Körper `abschluss-ritual` = 5.472 Tok Fixkosten × jeden Lauf

714 Zeilen laden komplett, obwohl pro Lauf genau ein Pfad greift. Pfad-A-Details (SKILL.md:488–619), Housekeeping (419–485), Mini (386–414) und das 30-Zeilen-Langformat-Beispiel (646–674) laden auch im häufigsten Fall (Pfad B). Geschätzt ~3k Tok davon pro Lauf ungenutzt — bei ×575 Läufen der zweitgrößte Posten.

### Befund 3: Zwei ungedeckelte Read-Anweisungen in Pfad A

- SKILL.md:581 „`BACKLOG-ARCHIV.md` lesen" (Sofort-erledigt-Pfad) — ohne Bereichsangabe = 36k-Tok-Voll-Read-Risiko. Frequenz: spekulativ.
- SKILL.md:606–613 „sichtbaren Fließtext aktualisieren … Widerspruch prüfen" auf einer 31k-Tok-Datei ohne definierten Zeilenbereich. Zusatzproblem: `BACKLOG-ARCHIV.md:2–4` behauptet „neueste zuerst" **und** „append-only", der Datei-Tail zeigt aber Einträge von 2026-05 — die Sortier-Invariante ist faktisch gebrochen, ein Datumsfilter erzwingt deshalb derzeit Vollscans. Klärung der Invariante: **gehört an Albert** (Start-Wahrheit).

### Befund 4: `start` ist strukturell bereits gut

Routing passiert **vor** dem breiten Kontext-Laden: Warm-Start-Check zuerst mit nur 20 Log-Zeilen (start.md:5–16), Kettenmodus rein aus Hook-Output (start.md:22–34), Dispatch/MEMORY/BACKLOG nur im Kaltstart-Vollmodus. Verbleibende Posten: (a) der Hook-Output-Bloat aus Befund 1; (b) der Kaltstart-Dispatch lässt Haiku ~58k Tok voll lesen (start.md:74–76), obwohl zwei der drei Extraktionen (AP-ID-Listen, Datumsfilter) rein mechanisch sind und der Hook sie mit 0 Tokens per Regex liefern könnte; (c) start.md:111: `Edit` auf PROJECT-STATUS erzwingt vorheriges Read der 31k-Datei — nur montags, aber unnötig teuer für ein Datumsfeld.

---

## Schritt 2 — Die EINE Intervention je Skill

**`abschluss-ritual` → gecachter maschinenlesbarer Zustand: hartes HOOK-META-Schema.**
Im Rewrite (SKILL.md 3.6 + Writer-Kontrakt): Feldlängen-Limits (z. B. Fokus-AP ≤ 120 Zeichen, Nächster-Schritt ≤ 200), Whitelist der 7 hook-geparsten Felder, verbotenes Feld `Nebenabschluss`, Narrativ gehört in den sichtbaren Fließtext; Validator-Check auf Blockgröße vor dem Write. Begründung: größter belegter Posten (~10–12k Tok/Lauf → ~200), wirkt bei ×575 Läufen **und** senkt als Nebeneffekt jeden Session-Start (~550 Tok Hook-Output). Sicherheit wird nicht geschwächt, sondern gestärkt — das Pflicht-Echo (SKILL.md:335) ist bei 60-Tok-Blöcken erst wieder real prüfbar; bei 4k-Blöcken ist die Echo-Verifikation heute praktisch blind. Zweitbester Kandidat (nicht gewählt, aber im Rewrite günstig mitnehmbar): Körper-Zerlegung nach Pfaden (Befund 2) und Deckelung der zwei Reads aus Befund 3. **Gehört an Albert:** die einmalige Bereinigung des bestehenden HOOK-META-Blocks in PROJECT-STATUS.md (Start-Wahrheit — wohin die 14k Zeichen `Nebenabschluss`-Historie verschoben werden) und die Sortier-Invariante des BACKLOG-ARCHIV.

**`start` → keine Strukturänderung am Command; Reads in den Hook verlagern.**
Das Routing ist bereits optimal sequenziert (Befund 4) — hier gibt es skill-textseitig fast nichts zu holen; aggressive Kürzung würde nur die Start-Wahrheits-Gates (DEGRADED-Pfad, Zählprüfung) riskieren. Der echte Hebel: Schritt 2 (Haiku-Dispatch, start.md:68–81) durch drei deterministische Hook-Felder ersetzen (`AKTIVE_APS`, `ARCHIV_SEIT_LETZTEM_LOG`, `BACKLOG_AKTIV` per PowerShell-Regex, 0 Tokens statt ~58k Haiku-Read pro Kaltstart); der bestehende DEGRADED-Mechanismus (start.md:40–46) ist das fertige Sicherheitsnetz, falls die Extraktion fehlschlägt. Zusätzlich Mini-Fix start.md:111: Kassensturz-Datum per Bash/Skript statt Edit-Tool setzen (spart den erzwungenen 31k-Read). **Gehört an Albert:** die Hook-Erweiterung selbst — der SessionStart-Hook ist Start-Wahrheits-Infrastruktur, das ist eine Architekturentscheidung, ich messe und schlage nur vor.

---

**STOPP.** Kein Rewrite erfolgt. Offene Entscheidungen für Albert:

1. Welche Intervention(en) als v-next-Preview ausarbeiten (abschluss-ritual / start / beide, ggf. mit Sekundärpunkten)?
2. HOOK-META-Altbestand: wohin mit den 14k Zeichen `Nebenabschluss`-Historie?
3. BACKLOG-ARCHIV: Sortier-Invariante festlegen (append-only am Ende vs. neueste zuerst)?
4. Hook-Erweiterung (session-start.ps1) freigeben?
