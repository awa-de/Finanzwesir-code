# AP-03 Ergebnis — App-Steuerungsblock-Template

Stand: 2026-06-26 | Session: AP-03 | Geändert von: Claude

---

## Auftrag

Template-Datei für den kanonischen lokalen App-Steuerungsblock definieren: Standardstruktur für `APP_SPEC.md` und `MINI_SPEC_FROM_HAUPTDOKUMENT.md`, LLM-Prüfscore, Stop-Regeln, Qualitätskriterien und Ergebnisprotokoll-Anforderung für spätere APs.

---

## Geänderte Dateien

- NEU: `docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md`
- NEU: `docs/steering/patches/AP-03_app-steuerungsblock-template_Ergebnis.md` (diese Datei)

---

## Vorprüfung

### Arbeitsbaum

- `git status --short`: ` M .claude/learning/session-log.md`
- Erwartete Änderungen: `.claude/learning/session-log.md` (WARM-START AP-Wechsel-Eintrag)
- Unerwartete Änderungen: keine
- `.claude/learning/session-log.md` berührt: ja (erwartet — WARM-START-Protokoll)
- Befund: **GRÜN** — Arbeitsbaum sauber, AP-02-Änderungen bereits committed

---

### Vorgänger-Gate

- AP-00-Protokoll gefunden: ja — `docs/steering/patches/AP-00_steuerungsblock-einstiegspunkt-anamnese_Ergebnis.md`
- AP-01b-Protokoll gefunden: ja — `docs/steering/patches/AP-01b_steuerungsblock-regel-verdichten_Ergebnis.md`
- AP-02-Protokoll gefunden: ja — `docs/steering/patches/AP-02_routing-hinweis-app-steuerungsblock_Ergebnis.md`
- AP-00 bestätigt Formatlücke: ja — „Einheitliches Format vorhanden: nein. Drei geprüfte Apps, drei verschiedene Formulierungsmuster, keine gemeinsame Struktur."
- AP-01b bestätigt CLAUDE.md-Regel: ja — 3-Satz-Kurzform, Status GRÜN
- AP-02 bestätigt Routing zur lokalen App-Spec: ja — neue Zeile 11 in NAVIGATION.md, Status GRÜN
- AP-02-Status: **GRÜN**
- AP-02 nennt AP-03 als nächsten Schritt: ja — „AP-03 — Standardformat Steuerungsblock + Prüfscore"
- Blocker: keine
- Befund: **GRÜN**

---

### Zielpfad

- Template-Datei existierte bereits: nein
- Zielpfad frei: ja
- Neuanlage möglich: ja
- Befund: **GRÜN**

---

## Umsetzung

### Neue Template-Datei

`docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md`

### Enthaltene Hauptabschnitte

1. Zweck
2. Autorität und Abgrenzung (WIE / WAS / WANN-Trennung)
3. 80%-Nordstern — Leitprinzip
4. Einbauposition (APP_SPEC.md und MINI_SPEC)
5. Standardblock für `APP_SPEC.md` (7 Felder + LLM-Selbsttest)
6. Reduzierter Vorläuferblock für `MINI_SPEC_FROM_HAUPTDOKUMENT.md`
7. LLM-Prüfscore pro Änderung (Tabelle + Score-Regeln)
8. Stop-Regeln (9 Auslöser)
9. Qualitätskriterien für einen belastbaren Block
10. Nicht-Ziele des Templates
11. Ergebnisprotokoll-Anforderung für spätere APs

### Warum eigene Datei

AP-03 verlangt explizit `docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md` als neue Datei. AP-00 ließ offen ob neue Datei oder Ergänzung in `03_APP_FACTORY_STANDARD_DRAFT.md`; AP-03 hat das eindeutig entschieden: neue Datei, damit das Format eigenständig referenzierbar, versionierbar und in NAVIGATION.md verlinkbar ist.

### Warum keine Änderung an `03_APP_FACTORY_STANDARD_DRAFT.md`

Nicht im Scope von AP-03. `03_APP_FACTORY_STANDARD_DRAFT.md` ist im Scope als Lesedatei (Begriffe), nicht als Schreibziel. Das Template als eigene Datei vermeidet einen Vollrewrite des Drafts und hält den Patch chirurgisch.

### Warum keine Skill-Änderung

AP-07 ist der explizit vorgesehene AP für `heldenreise/SKILL.md` und `tech-spec-app/SKILL.md`. Erst Format festlegen (AP-03), dann Skills aktualisieren (AP-07). Reihenfolge bewusst.

### Warum kein Einbau in App-Specs

AP-04 (Inventar) und AP-05 (Vorschlagsliste) sind Voraussetzungen für AP-08 (Einzel-Einbau). Direkt einbauen ohne Inventar würde implizite Qualitätslücken zementieren.

---

## Prüfungen

- Status 80%-Nordstern definiert: **ja** (§ 3 + Standardblock-Feld „Status")
- Standardblock für `APP_SPEC.md` definiert: **ja** (§ 5)
- Reduzierter Mini-Spec-Block definiert: **ja** (§ 6)
- LLM-Prüfscore definiert: **ja** (§ 7)
- Score-Regeln 8/8, 6–7/8, ≤5/8 definiert: **ja** (§ 7)
- Stop bei Nicht-Ziel-Verletzung (Kriterium 3 = 0): **ja** (§ 7 + § 8)
- Stop bei schwachem Steuerungsblock: **ja** (§ 8)
- Ergebnisprotokoll-Anforderung definiert: **ja** (§ 11)
- keine App-Specs geändert: **ja**
- keine Mini-Specs geändert: **ja**
- keine Skills geändert: **ja**
- keine `CLAUDE.md` geändert: **ja**
- keine `NAVIGATION.md` geändert: **ja**
- kein Code geändert: **ja**
- keine Daten geändert: **ja**
- kein Commit: **ja**
- kein Abschlussritual: **ja**

---

## Status

**GRÜN**

---

## Blocker

nein

---

## Offene Punkte

Aus AP-00 unverändert offen:
1. `app-spec-create/SKILL.md` fehlt (AP-06)
2. `spec-mode-architecture` nicht in NAVIGATION.md-Skill-Tabelle (AP-06)

---

## Empfohlener nächster AP

**AP-06 — `app-spec-create/SKILL.md` klären/anlegen + `spec-mode-architecture`-Drift einordnen**

Begründung: AP-04 (Inventar) und AP-05 (Vorschlagsliste) benötigen einen funktionierenden `app-spec-create`-Skill und eine vollständige NAVIGATION.md-Skill-Tabelle. AP-06 schließt die Drift-Stelle, die AP-00 als kritisch markiert hat.

Alternativ: AP-04 (Inventar Steuerungsblöcke) kann parallel zu AP-06 bearbeitet werden, da beide nur lesend auf App-Specs zugreifen.

---

## Bestätigungen

- Kein Einbau in App-Specs: **ja**
- Keine 25er-Vorschlagsliste: **ja**
- Keine Skill-Änderung: **ja**
- Keine `CLAUDE.md`-Änderung: **ja**
- Keine `NAVIGATION.md`-Änderung: **ja**
- Kein Code: **ja**
- Kein Commit: **ja**
- Kein Abschlussritual: **ja**
