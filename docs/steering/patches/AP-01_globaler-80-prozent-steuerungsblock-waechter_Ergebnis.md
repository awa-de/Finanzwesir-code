# AP-01 Ergebnis — Globaler 80%-Steuerungsblock-Wächter

Stand: 2026-06-25 | Session: AP-01 | Geändert von: Claude

---

## Auftrag

Chirurgische Ergänzung in `CLAUDE.md` § Eingangs-Routing > APP-ARBEIT: globale Verhaltensregel, die Claude bei jeder App-Arbeit zwingt, den lokalen Steuerungsblock zuerst zu lesen, ihn als 80%-Entwurf zu behandeln und vor Umsetzung kritisch zu prüfen. Bei unklarem oder schwachem Block: stoppen, Lücke benennen, mit Albert klären.

---

## Geänderte Dateien

- GEÄNDERT: `.claude/CLAUDE.md` (Stand-Zeile + 4-Zeilen-Verhaltensregel im APP-ARBEIT-Block)
- NEU: `docs/steering/patches/AP-01_globaler-80-prozent-steuerungsblock-waechter_Ergebnis.md` (diese Datei)

---

## Vorprüfung

### Arbeitsbaum

- `git status --short`: ` M .claude/learning/session-log.md`
- Erwartete Änderungen: `.claude/learning/session-log.md` (Session-Start-Eintrag)
- Unerwartete Änderungen: keine
- `.claude/learning/session-log.md` berührt: ja (erwartet — Session-Start-Protokoll)
- Befund: GRÜN — kein Konfliktrisiko, kein unbekannter Zustand

### AP-00-Gate

- AP-00-Protokoll gefunden: ja — `docs/steering/patches/AP-00_steuerungsblock-einstiegspunkt-anamnese_Ergebnis.md`
- `CLAUDE.md` als globale Regelstelle bestätigt: ja (AP-00 § Fehlerflächenkarte > Globale Regelstelle: „Empfohlene Datei: CLAUDE.md")
- Einbaustelle `APP-ARBEIT` bestätigt: ja (AP-00: „Einbaustelle in CLAUDE.md: Abschnitt Eingangs-Routing > APP-ARBEIT")
- AP-01-Scope bestätigt: ja (AP-00 § AP-01: „Erlaubte Dateien: CLAUDE.md (chirurgische Ergänzung im APP-ARBEIT-Block, 3–6 Zeilen). Nicht-Ziele: kein Routing, keine Skill-Änderung…")
- AP-00-Status: GELB
- Blocker: nein (AP-00: „kein Blocker für die Befund-Phase selbst" / „kein Blocker für AP-01 bis AP-05")
- Befund: GRÜN

### CLAUDE.md-Zielstelle

- `CLAUDE.md` gefunden: ja — `.claude/CLAUDE.md`
- Zielbereich gefunden: ja
- Zielbereich: § Eingangs-Routing > Klassifizierung > `**APP-ARBEIT**` (Zeilen 153–156 vor Patch)
- Änderung chirurgisch möglich: ja — Ergänzung direkt nach bestehender letzter Zeile des APP-ARBEIT-Blocks, vor nächstem `\---`-Trenner
- Befund: GRÜN

---

## Umsetzung

### Eingefügte Regel

```
Steuerungsblock der App lesen (`APP_SPEC.md` § Steuerungsblock; falls nicht vorhanden: `MINI_SPEC_FROM_HAUPTDOKUMENT.md`). Gilt standardmäßig als 80%-Entwurf, nicht als finale Wahrheit. Vor Code, UX-, Daten- oder Spec-Arbeit prüfen: Zweck, psychologische Barriere, falscher Glaubenssatz, Zielzustand und Nicht-Ziele. Bei unklarem oder schwachem Block (< 80%): stoppen, Lücke benennen, mit Albert klären — keine Umsetzung ohne Klärung.
```

### Position

Direkt nach `Bestätigung ausgeben → Full-Gate (immer, keine Ausnahme).` im APP-ARBEIT-Block, vor dem nächsten `\---`-Trenner.

### Umfang

1 Satz in 4 Teilsätzen (eine Zeile = eine inhaltliche Einheit). Erfüllt Vorgabe 3–6 Zeilen.

Stand-Zeile: `2026-05-11 | v2.1.2 | Geändert von: Albert` → `2026-06-25 | v2.1.3 | Geändert von: Claude` (Versions-Housekeeping, keine inhaltliche Änderung).

### Warum richtige Datei

`CLAUDE.md` ist die Verfassung: Verhalten, Grenzen, Invarianten, Gates. Die Verhaltensregel „Steuerungsblock kritisch prüfen, nicht blind ausführen" ist ein Verhaltensprinzip — nicht ein Routing-Hinweis und nicht eine Skill-Prozedur. AP-00 hat diese Zuordnung bestätigt.

### Warum keine Routing-Änderung

`NAVIGATION.md` regelt WO zu lesen ist, nicht WIE zu handeln ist. Der 80%-Wächter ist ein Verhaltensprinzip. Routing-Ergänzung ist AP-02.

### Warum keine Skill-Änderung

Skills sind Detailprozeduren für Spezialfälle. Die neue Regel ist eine globale Invariante, die vor jedem App-Auftrag gilt — unabhängig davon, welche Skills aktiv sind.

---

## Prüfungen

- lokaler Steuerungsblock erwähnt: **ja** (`APP_SPEC.md` § Steuerungsblock / `MINI_SPEC_FROM_HAUPTDOKUMENT.md`)
- 80%-Entwurf erwähnt: **ja** („Gilt standardmäßig als 80%-Entwurf, nicht als finale Wahrheit.")
- kritische Prüfung vor Umsetzung erwähnt: **ja** („Vor Code, UX-, Daten- oder Spec-Arbeit prüfen:")
- Zweck/Barriere/Glaubenssatz/Zielzustand/Nicht-Ziele erwähnt: **ja** (alle fünf Felder aufgelistet)
- Stop/Klärung mit Albert erwähnt: **ja** („stoppen, Lücke benennen, mit Albert klären")
- keine Umsetzung bei schwachem Block erwähnt: **ja** („keine Umsetzung ohne Klärung")
- keine `NAVIGATION.md` geändert: **ja**
- keine Skills geändert: **ja**
- keine App-Specs geändert: **ja**
- keine Mini-Specs geändert: **ja**
- kein Code geändert: **ja**
- keine Daten geändert: **ja**
- kein Commit: **ja**
- kein Abschlussritual: **ja**

---

## Status

**GRÜN**

---

## Blocker

- nein

---

## Offene Punkte

Keine neuen. Offene Punkte aus AP-00 bleiben bestehen:
1. `app-spec-create/SKILL.md` fehlt (AP-06)
2. `spec-mode-architecture` nicht in NAVIGATION.md-Skill-Tabelle (AP-02 oder AP-06)
3. AP-03-Format für LLM-Prüfscore noch offen (Checkliste vs. Matrix vs. Freitext)

---

## Empfohlener nächster AP

**AP-02 — Routing-Hinweis in NAVIGATION.md**
Erlaubte Dateien: `NAVIGATION.md` (1–2 Zeilen in der Routing-Liste § „App bauen / ändern", Verweis auf CLAUDE.md § APP-ARBEIT). Keine Verhaltensregel, kein Vollrewrite.

---

## Bestätigungen

- Keine NAVIGATION.md-Änderung: **ja**
- Keine Skill-Änderung: **ja**
- Keine Hook-Änderung: **ja**
- Keine App-Spec-Änderung: **ja**
- Keine Mini-Spec-Änderung: **ja**
- Kein Steuerungsblock-Template: **ja**
- Kein 25er-Inventar: **ja**
- Kein `app-spec-create/SKILL.md`: **ja**
- Kein Code: **ja**
- Kein Commit: **ja**
- Kein Abschlussritual: **ja**
