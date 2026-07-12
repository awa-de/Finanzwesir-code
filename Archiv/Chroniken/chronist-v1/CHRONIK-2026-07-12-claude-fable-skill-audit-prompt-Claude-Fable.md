---
chronik_id: CHRONIK-2026-07-12-claude-fable-skill-audit-prompt-Claude-Fable
datum: 2026-07-12
projekt: finanzwesir-2-0
thema: skill-token-optimierung
beteiligte: [nutzer, claude]
typ: chronik
standard: chronist-v1
faden_typ: review
status_am_ende: offen
quellenlage: vollstaendiger-faden
schlagworte: [durchbruch, abbruchregel, externe-abhaengigkeit]
---

# Chronik: Token-Kosten-Analyse der Skills abschluss-ritual und start

**Hauptgegenstand:** Analyse der beiden teuersten Skills der Finanzwesir-2.0-Bibliothek (`abschluss-ritual`, `start`) auf Pro-Lauf-Token-Footprint, mit dem Auftrag, je Skill genau eine Optimierungs-Intervention zu benennen und vor jedem Rewrite zu stoppen.

## Ausgangslage

Der Nutzer erteilte einen strukturierten Auftrag: Schritt 0 (deterministisches Call-Graph-Inventar per grep/Glob vor jedem Voll-Read), Schritt 1 (Kosten-Anatomie mit file:line-Evidenzpflicht), Schritt 2 (je Skill die eine beste Intervention, dann STOPP), Schritt 3 (Rewrite erst nach Freigabe). Als Priors lagen Maschinen-Aggregate über 30 Tage vor: `abschluss-ritual` ~21 % der Tokens bei ×575 Aufrufen, `start` ~3 % bei ×141; Read-Anteil ~59 % aller Tokens; `abschluss-scout` nur ×17 Dispatches. Harte Regeln: keine Schreiboperation ohne OK, Schutzmechanismen nicht schwächen, Kostenaussagen ohne Fundstelle als spekulativ markieren, Entscheidungen an Start-Wahrheit/Gates/Tabu-Zonen an Albert delegieren.

## Chronologischer Verlauf

### Zugriffsherstellung

Zu Beginn war die Projektbibliothek in der Session nicht eingebunden; sichtbar waren nur Standard-Skills. Claude forderte Ordnerzugriff an, der Nutzer gab `Z:\Documents\Nextcloud\Finanzwesir 2.0` frei.

### Schritt 0 — Inventar

Per find/grep wurde festgestellt: `abschluss-ritual` ist ein Skill (`.claude/skills/abschluss-ritual/SKILL.md`, 714 Zeilen ≈ 5.472 Tokens), `start` ein Command (`.claude/commands/start.md`, 113 Zeilen ≈ 1.261 Tokens). Der Call-Graph wurde als Tabelle ausgegeben, mit Dateigrößenmessung der Zieldateien: `PROJECT-STATUS.md` ~30.942 Tokens, `NAVIGATION.md` ~18.503, `docs/steering/BACKLOG-ARCHIV.md` ~36.158, `session-log.md` ~18.462. Beteiligte Agenten (`abschluss-scout`, `abschluss-writer`, `spec-scout`) tragen sämtlich `model: haiku`; `settings.local.json:42` setzt `CLAUDE_CODE_SUBAGENT_MODEL=haiku`.

### Voll-Reads und gezielte Struktur-Checks

Nach dem Inventar wurden die Scope-Dateien vollständig gelesen (SKILL.md, start.md, beide Abschluss-Agenten, `session-start.ps1`, `settings.local.json`); von den großen Zieldateien nur Kopf- und Fußbereiche. Dabei zeigte der Kopf von `PROJECT-STATUS.md` einen HOOK-META-Block mit Fließtext-Absätzen in den Feldern.

### Messung des HOOK-META-Blocks

Eine Python-Messung ergab: HOOK-META-Block Zeilen 1–10, 16.533 Bytes ≈ 4.133 Tokens. Feldlängen: `Fokus-AP` 1.469 Zeichen, `Nächster-Schritt` 709 Zeichen, `Nebenabschluss` 14.250 Zeichen — letzteres Feld wird von `session-start.ps1:48–54` nicht geparst. Das Soll-Schema aus SKILL.md:265–273 und abschluss-writer.md:95–102 umfasst ~60 Tokens.

### Schritt 1 — Vier Befunde

1. HOOK-META-Drift vom Kompakt-Schema zum Narrativ-Dump; Kostenwirkung pro Pfad-A/B-Abschluss grob 10–12k Tokens (Lesen, Literal-Komposition als Output, Pflicht-Echo des Writers, erneute Prüfung; SKILL.md:335–336, abschluss-writer.md:154–155) — als Arbeitsannahme markiert, da keine Per-Lauf-Messung vorlag. Zusätzlich ~550 Tokens Narrativ in jedem Hook-Output (session-start.ps1:124–125).
2. Skill-Körper `abschluss-ritual` als Fixkosten ≈ 5.472 Tokens pro Lauf, davon geschätzt ~3k pro Lauf ungenutzt (pfadfremde Abschnitte).
3. Zwei ungedeckelte Read-Anweisungen in Pfad A (SKILL.md:581; SKILL.md:606–613); zusätzlich wurde ein Widerspruch in `BACKLOG-ARCHIV.md:2–4` sichtbar („neueste zuerst" und „append-only", Datei-Tail zeigt Einträge von 2026-05).
4. `start` strukturell bereits gut: Routing (Warm-Start, Kettenmodus) liegt vor dem breiten Kontext-Laden; verbleibende Posten sind der Hook-Output-Bloat, der Kaltstart-Dispatch mit ~58k Tokens Haiku-Voll-Reads (start.md:74–76) und ein durch `Edit` erzwungener 31k-Read montags (start.md:111).

### Schritt 2 — Interventionsvorschlag und STOPP

Für `abschluss-ritual` wurde ein hartes HOOK-META-Schema (Feldlängen-Limits, Feld-Whitelist, Verbot von `Nebenabschluss`, Validator) als die eine Intervention benannt; Körper-Zerlegung und Read-Deckelung als mitnehmbare Sekundärpunkte. Für `start` wurde keine Strukturänderung am Command vorgeschlagen, sondern die Ersetzung des Haiku-Dispatches durch deterministische Hook-Felder plus ein Mini-Fix für das Kassensturz-Datum. Drei Punkte wurden ausdrücklich an Albert delegiert: Bereinigung des HOOK-META-Altbestands, Sortier-Invariante des BACKLOG-ARCHIV, Hook-Erweiterung. Claude stoppte gemäß Auftrag vor jedem Rewrite.

### Ablieferung als Datei

Der Nutzer verlangte die Analyse 1:1 als Markdown-Datei. Nach Prüfung von `PROTECTED_PATHS.json` (kein Konflikt) wurde `ANALYSE_skill-optimierung_abschluss-ritual_start_2026-07-12.md` im Projekt-Root angelegt. Anschließend beauftragte der Nutzer die Erstellung dieser Chronik nach `docs/steering/CHRONIK-PROMPT.md`.

## Wendepunkte

Die Messung des HOOK-META-Blocks verschob den Analysefokus: Der Haupthebel lag nicht im Skill-Text selbst, sondern in einer gedrifteten Zieldatei, deren Aufblähung jeder Skill-Lauf und jeder Session-Start mitbezahlt. Die Priors hatten auf den „Skill-Körper" gedeutet; die Fundstellen konkretisierten dies auf die Daten, die der Skill-Ablauf bewegt.

## Entscheidungen und Festlegungen

- Intervention `abschluss-ritual` = hartes HOOK-META-Schema · Schritt 2 · größter belegter Posten, stärkt Echo-Prüfbarkeit · Status: offen (wartet auf Freigabe).
- Intervention `start` = Dispatch-Ersatz durch Hook-Felder, keine Command-Strukturänderung · Schritt 2 · Routing bereits optimal, DEGRADED-Pfad als Sicherheitsnetz · Status: offen.
- Delegation an Albert: HOOK-META-Altbestand, ARCHIV-Sortier-Invariante, Hook-Erweiterung, Modellwahl der Hauptinstanz · Status: offen.
- Ablageort der Analyse: Projekt-Root · nach PROTECTED_PATHS-Prüfung · Status: gültig.

## Irrwege, Schleifen und verworfene Ansätze

Die Körper-Zerlegung des Skills nach Pfaden wurde als Interventionskandidat erwogen und als zweitbester zurückgestellt (Fixkosten 5,5k gegen 10–12k des HOOK-META-Postens). Der anfangs fehlende Ordnerzugriff verzögerte Schritt 0 um eine Freigaberunde. Sonst keine Sackgassen im Faden erkennbar.

## Erzeugte Artefakte

- `ANALYSE_skill-optimierung_abschluss-ritual_start_2026-07-12.md` — Analysebericht Schritt 0–2 — final.
- Diese Chronik — final.
- Kein Rewrite, keine v-next-Dateien — bewusst nicht erzeugt (Freigabeprinzip).

## Sachliche Erkenntnisse

Gesicherter Stand: HOOK-META-Block 16.533 Bytes ≈ 4.133 Tokens (PROJECT-STATUS.md:1–10); Feld `Nebenabschluss` (14.250 Zeichen) wird vom Hook nicht geparst; alle drei Subagenten laufen auf Haiku; `start` routet vor dem Kontext-Laden; `BACKLOG-ARCHIV.md` enthält widersprüchliche Sortier-Angaben. Arbeitsannahme: 10–12k Tokens HOOK-META-Kosten pro Pfad-A/B-Lauf; ~3k ungenutzte Körper-Tokens pro Lauf; Frequenz des Sofort-erledigt-Pfads unbekannt. Offene Frage: tatsächliche Pfad-Verteilung (A/B/C/D) über die ×575 Läufe.

## Offene Punkte am Ende

Freigabeentscheidung über die zwei Interventionen und die Sekundärpunkte; Ziel für die 14k Zeichen `Nebenabschluss`-Historie; Festlegung der ARCHIV-Sortier-Invariante; Freigabe der Hook-Erweiterung; Schritt 3 (v-next-Rewrites) nicht begonnen.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Maschinen-Aggregate (Priors) deuteten auf die richtige Region, die entscheidende Fundstelle lag jedoch in einer Datendrift außerhalb der Skill-Texte; Kompakt-Schemata ohne Längen-Enforcement drifteten im Betrieb zum Narrativ; Evidenzpflicht (file:line) trennte belegte von spekulativen Kostenaussagen.

## Bewusst ausgelassen

Einzelne grep-/find-Kommandozeilen und deren Rohausgaben; Wiederholungen der Inventar-Tabellen; Tool- und Bedienrauschen (Ordner-Mount-Mechanik, Task-Listen-Pflege); Wortlaut der zwischenzeitlichen Statusmeldungen ohne Wirkung auf den Verlauf.
