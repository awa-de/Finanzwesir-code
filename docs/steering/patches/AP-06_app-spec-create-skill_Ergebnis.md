Stand: 2026-06-26 | Session: AP-06 | Geändert von: Claude

# AP-06 Ergebnis — app-spec-create Skill

## Auftrag

Klären ob `.claude/skills/app-spec-create/SKILL.md` existiert. Falls nicht: schlanken Skill neu anlegen, der verbindlich auf das AP-03-Template, den globalen Wächter (CLAUDE.md) und das Routing (NAVIGATION.md) verweist. `spec-mode-architecture` in NAVIGATION.md-Skill-Tabelle einordnen. Ergebnisprotokoll erstellen.

---

## Geänderte Dateien

- NEU: `.claude/skills/app-spec-create/SKILL.md`
- GEÄNDERT: `NAVIGATION.md` (neue Zeile spec-mode-architecture in Skill-Tabelle + Stand-Datum AP-06)
- NEU: `docs/steering/patches/AP-06_app-spec-create-skill_Ergebnis.md` (diese Datei)

---

## Vorprüfung

### Arbeitsbaum

- `git status --short`: ` M .claude/learning/session-log.md`
- Erwartete Änderungen: `.claude/learning/session-log.md` (WARM-START AP-Wechsel-Eintrag)
- Unerwartete Änderungen: keine
- `.claude/learning/session-log.md` berührt: ja (erwartet — WARM-START-Protokoll)
- AP-03 committed: ja — git status zeigt keine ungestagten AP-03-Dateien; AP-03-Template und Protokoll im Verzeichnis vorhanden
- Befund: **GRÜN**

---

### Vorgänger-Gate

- AP-00-Protokoll gefunden: ja — `docs/steering/patches/AP-00_steuerungsblock-einstiegspunkt-anamnese_Ergebnis.md`
- AP-01b-Protokoll gefunden: ja — `docs/steering/patches/AP-01b_steuerungsblock-regel-verdichten_Ergebnis.md`
- AP-02-Protokoll gefunden: ja — `docs/steering/patches/AP-02_routing-hinweis-app-steuerungsblock_Ergebnis.md`
- AP-03-Protokoll gefunden: ja — `docs/steering/patches/AP-03_app-steuerungsblock-template_Ergebnis.md`
- AP-00 bestätigt app-spec-create-Lücke: ja — „ACHTUNG: Verzeichnis existiert, SKILL.md fehlt" (aber das Verzeichnis existierte auch nicht, wie Gate 3 bestätigt)
- AP-00 bestätigt spec-mode-architecture-Drift: ja — „spec-mode-architecture in 04_CLAUDE_WORKFLOW_DRAFT.md Phase 2 benannt, aber nicht in NAVIGATION.md-Skill-Tabelle"
- AP-01b bestätigt CLAUDE.md-Regel: ja — AP-01b hat die 3-Satz-Kurzform in CLAUDE.md § APP-ARBEIT verankert
- AP-02 bestätigt Routing zur lokalen App-Spec: ja — neue Zeile 11 in NAVIGATION.md § App bauen / ändern
- AP-03 bestätigt Template: ja — `docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md` vorhanden
- AP-03-Status: **GRÜN**
- Blocker: keine
- Befund: **GRÜN**

---

### Skill-Inventar

| Skill | Existiert | Rolle heute | AP-06-Befund |
|---|---:|---|---|
| `app-spec-create` | Nein (Verzeichnis und Datei fehlten) | Koordinator für APP_SPEC-Erstellung: bündelt tech-spec-app + heldenreise + Steuerungsblock-Prüfung + Spec-Gate | Fall A: SKILL.md neu angelegt |
| `spec-mode-architecture` | Ja | Allgemeiner Architektur-Spec-Modus: technische Spezifikationen, Edge-Cases, Testszenarien, API-Vorschläge für beliebige Module | Einordnung in NAVIGATION.md-Tabelle ergänzt |
| `tech-spec-app` | Ja | Technische APP_SPEC (18 Pflichtabschnitte): App-Familie, Ghost-Card-Vertrag, AppContext, A11y, Sicherheit, Testfälle | Phase 1 in app-spec-create; unverändet |
| `heldenreise` | Ja | Beweisdramaturgie: Heldenreise-Struktur, Tufte, Krug, FAANG, Ethik-Gate | Phase 2 in app-spec-create; unverändert |

---

### NAVIGATION.md Skill-Tabelle

- Skill-Tabelle vorhanden: ja (§ Skills, Zeilen 32–52 vor AP-06)
- app-spec-create erwähnt: ja (bereits vorhanden — Zeile 52: „vollständige APP_SPEC erstellen: tech-spec-app + heldenreise + Spec-Gate-Checkliste (5 Phasen)")
- spec-mode-architecture erwähnt: nein (vor AP-06)
- Zielstelle eindeutig: ja — direkt nach der app-spec-create-Zeile, vor dem Trenner `---`
- Änderung nötig: ja für spec-mode-architecture; app-spec-create-Zeile war bereits korrekt und wurde nicht verändert
- Befund: **GRÜN**

---

## Umsetzung

### `app-spec-create/SKILL.md` neu angelegt

Fall A. Datei und Verzeichnis fehlten komplett. Neu angelegt mit:

- Zweck: Koordination der 4-Phasen-APP_SPEC-Erstellung
- Wann verwenden
- Pflichtquellen (inkl. AP-03-Template als §1)
- Phase 0 — Steuerungsblock prüfen (mit LLM-Prüfscore aus Template § 7)
- Phase 1 — `/tech-spec-app`
- Phase 2 — `/heldenreise`
- Phase 3 — Spec-Gate
- Abgrenzung zu `spec-mode-architecture`, `tech-spec-app`, `heldenreise`
- Stop-Regeln
- Output-Anforderung
- Nicht-Ziele

### NAVIGATION.md geändert

Neue Zeile nach `app-spec-create`:
```
| `/spec-mode-architecture` | Allgemeiner Architektur-Spec-Modus; erzeugt technische Spezifikationen, Edge-Cases, Testszenarien; für App-Specs nur ergänzend, kein Ersatz für `app-spec-create` und lokalen App-Steuerungsblock | Manuell |
```
Stand-Datum aktualisiert: `Session: AP-03` → `Session: AP-06`.

### Warum `spec-mode-architecture` nicht allein ausreicht

`spec-mode-architecture` ist ein generischer Architektur-Skill: er erzeugt technische Spezifikationen für beliebige Module, kennt aber keinen App-Fabrik-Steuerungsblock, kein heldenreise-Gate und keine Koordination über die 4 Phasen. Ohne Phase 0 (Steuerungsblock-Prüfung) könnte er eine APP_SPEC aufbauen, die am 80%-Nordstern vorbeiläuft.

### Warum `tech-spec-app` nicht allein ausreicht

`tech-spec-app` erzeugt die technische Grundlage (18 Pflichtabschnitte), aber prüft keinen Steuerungsblock und führt keine heldenreise durch. Er ist Phase 1 innerhalb von `app-spec-create`, nicht sein Ersatz.

### Warum `heldenreise` nicht allein ausreicht

`heldenreise` erzeugt Beweisdramaturgie (Heldenreise, Tufte, Krug, FAANG, Ethik), aber prüft keinen Steuerungsblock und keine technischen Pflichtabschnitte. Er ist Phase 2 innerhalb von `app-spec-create`, nicht sein Ersatz.

### Warum keine bestehenden Skills geändert wurden

AP-07 ist der explizit vorgesehene AP für `heldenreise/SKILL.md` und `tech-spec-app/SKILL.md`. Der Surgical-Check erlaubt keine Änderungen an Dateien außer den explizit freigegebenen.

### Warum keine App-Specs geändert wurden

AP-04 (Inventar) und AP-08 (Einzel-Einbau) sind die vorgesehenen APs für App-Spec-Änderungen. Direkte Eingriffe in App-Specs ohne Inventar würden Qualitätslücken zementieren.

---

## Prüfungen

- app-spec-create Skill existiert: **ja** (neu angelegt)
- AP-03-Template als Pflichtquelle: **ja** (§ Pflichtquellen, Position 1)
- 80%-Nordstern erwähnt: **ja** (§ Phase 0: „Der Steuerungsblock gilt als 80%-Entwurf")
- Stop bei schwachem Steuerungsblock: **ja** (§ Phase 0: ≤ 5/8 oder Kriterium 3 = 0 → Stopp; § Stop-Regeln)
- LLM-Prüfscore erwähnt: **ja** (§ Phase 0: Prüfscore mit 8/8-, 6–7/8-, ≤5/8-Regeln)
- Abgrenzung zu spec-mode-architecture: **ja** (§ Abgrenzung)
- Abgrenzung zu tech-spec-app: **ja** (§ Abgrenzung)
- Abgrenzung zu heldenreise: **ja** (§ Abgrenzung)
- keine bestehenden Skills außer app-spec-create geändert: **ja**
- keine CLAUDE.md geändert: **ja**
- keine App-Specs geändert: **ja**
- keine Mini-Specs geändert: **ja**
- kein Code geändert: **ja**
- keine Daten geändert: **ja**
- kein Commit: **ja**
- kein Abschlussritual: **ja**

Falls NAVIGATION.md geändert:
- Skill-Tabelle ergänzt: **ja** (spec-mode-architecture-Zeile hinzugefügt)
- App-Routing-Block nicht verändert: **ja**
- kein Verhalten dupliziert: **ja** (NAVIGATION.md enthält nur Routing-Hinweis, Verhaltensregeln bleiben in CLAUDE.md)
- app-spec-create erwähnt: **ja** (bereits vorhanden, unverändert)
- spec-mode-architecture eingeordnet: **ja** (neu ergänzt)

---

## Status

**GRÜN**

---

## Blocker

nein

---

## Offene Punkte

1. `heldenreise/SKILL.md` und `tech-spec-app/SKILL.md` enthalten noch keinen Steuerungsblock-Wächter — vorgesehen für AP-07.
2. `04_CLAUDE_WORKFLOW_DRAFT.md` Phase 2 nennt `spec-mode-architecture`, aber der Pflichtschritt „Steuerungsblock prüfen" ist dort noch nicht ergänzt — vorgesehen für AP-07 oder separaten AP.
3. AP-00 hatte gemeldet, dass das app-spec-create-Verzeichnis existiert aber SKILL.md fehlt. Tatsächlich fehlte beides (Verzeichnis + Datei). Protokollabweichung ohne Auswirkung auf Ergebnis.

---

## Empfohlener nächster AP

**AP-07 — Steuerungsblock-Wächter in `heldenreise/SKILL.md` und `tech-spec-app/SKILL.md`**

Begründung: Jetzt, da das AP-03-Format feststeht und `app-spec-create` die Koordination übernimmt, können die beiden Pflicht-Skills mit einem minimalen Wächter-Prüfschritt ausgestattet werden: „Bevor Heldenreise / bevor technische Spec — Steuerungsblock-Score prüfen."

Alternativ parallel: AP-04 — Inventar Steuerungsblöcke über alle 25 Apps (nur lesend, keine Abhängigkeit von AP-07).

---

## Bestätigungen

- Kein App-Spec-Einbau: **ja**
- Keine 25er-Liste: **ja**
- Keine Skill-Landschafts-Anamnese: **ja**
- Keine Änderung an CLAUDE.md: **ja**
- Keine Änderung am AP-03-Template: **ja**
- Kein Code: **ja**
- Kein Commit: **ja**
- Kein Abschlussritual: **ja**
