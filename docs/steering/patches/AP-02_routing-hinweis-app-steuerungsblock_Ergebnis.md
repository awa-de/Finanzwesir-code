# AP-02 Ergebnis — Routing-Hinweis App-Steuerungsblock

Stand: 2026-06-26 | Session: AP-02 | Geändert von: Claude

---

## Auftrag

Routing-Hinweis in `NAVIGATION.md` § „App bauen / ändern (Apps/)" ergänzen: Lese-Zeile auf lokale `APP_SPEC.md` → Steuerungsblock, Fallback auf `MINI_SPEC_FROM_HAUPTDOKUMENT.md`, Verweis auf `.claude/CLAUDE.md` § APP-ARBEIT. Nur Routing — keine Verhaltensregel in NAVIGATION.md.

---

## Geänderte Dateien

- GEÄNDERT: `NAVIGATION.md` (neue Zeile 11 im App-Fabrik-Routing-Block, Nummerierung 11→12, 12→13, 13→14; Stand-Datum aktualisiert)
- NEU: `docs/steering/patches/AP-02_routing-hinweis-app-steuerungsblock_Ergebnis.md` (diese Datei)

---

## Vorprüfung

### Arbeitsbaum

- `git status --short`: ` M .claude/learning/session-log.md  M NAVIGATION.md`
- Erwartete Änderungen: `.claude/learning/session-log.md` (Session-Start), `NAVIGATION.md` (dieser AP)
- Unerwartete Änderungen: keine
- `.claude/learning/session-log.md` berührt: ja (erwartet — KETTENMODUS Session-Start)
- Befund: **GRÜN**

---

### Vorgänger-Gate

- AP-00-Protokoll gefunden: ja — `docs/steering/patches/AP-00_steuerungsblock-einstiegspunkt-anamnese_Ergebnis.md`
- AP-01-Protokoll gefunden: ja — `docs/steering/patches/AP-01_globaler-80-prozent-steuerungsblock-waechter_Ergebnis.md`
- AP-01b-Protokoll gefunden: ja — `docs/steering/patches/AP-01b_steuerungsblock-regel-verdichten_Ergebnis.md`
- AP-00 bestätigt NAVIGATION.md als Routing-Stelle: ja — „Empfohlene Datei: NAVIGATION.md — Abschnitt § App bauen / ändern"; „NAVIGATION.md darf nur zeigen WO — die Verhaltensregel WIE bleibt in CLAUDE.md."
- AP-01b bestätigt CLAUDE.md-Regel: ja — 3-Satz-Kurzform gesetzt, Stand AP-01b ✅
- AP-01b-Status: **GRÜN**
- Blocker: nein
- Befund: **GRÜN**

---

### NAVIGATION.md-Zielstelle

- `NAVIGATION.md` gefunden: ja
- Abschnitt `App bauen / ändern (Apps/)` gefunden: ja — Zeile 144 (Codeblock Zeilen 146–237)
- Zielposition gefunden: ja — nach Item 10 `Apps/[App-Name]/`, vor bisherigem Item 11 `SLICE_PLAN.md`
- Mehrdeutigkeit: keine — einzige Fundstelle der App-bauen-Route
- Ergänzung chirurgisch möglich: ja — 1 Zeile einfügen + 3 Nummern anpassen
- Befund: **GRÜN**

---

## Umsetzung

### Eingefügte Routing-Zeile

```
11. Apps/[App-Name]/APP_SPEC.md → lokalen Steuerungsblock lesen; falls keine APP_SPEC existiert: MINI_SPEC_FROM_HAUPTDOKUMENT.md. Verhalten siehe .claude/CLAUDE.md § APP-ARBEIT.
```

### Position

Direkt nach Item 10 (`Apps/[App-Name]/`), vor bisherigem Item 11 (jetzt 12: `SLICE_PLAN.md`).

### Nummerierung angepasst

- alt 11 → neu 12 (`SLICE_PLAN.md`)
- alt 12 → neu 13 (`bei externer Datenquelle`)
- alt 13 → neu 14 (`bei Chart-Nutzung`)

### Warum dort

Erst App-Ordner lokalisieren (#10), dann Steuerungsblock als Zweckanker lesen (#11), dann Slice-Plan / Implementierungsdetails (#12 ff.). Reihenfolge ist intentional: Steuerungsblock gibt Orientierung bevor konkrete Slice-Entscheidungen getroffen werden.

### Warum nur Routing

`NAVIGATION.md` ist ausdrücklich Router, keine Verhaltensregel-Datei (Eigendeklaration Zeile 4: „Gibt Pfade und Lese-Reihenfolgen vor — KEINE Verhaltensregeln"). Die Verhaltensregel (80%-Entwurf, Stop bei Lücke, Klärung mit Albert) steht in `.claude/CLAUDE.md` § APP-ARBEIT. Die neue Zeile sagt nur WO gelesen wird — sie enthält keine Entscheidungslogik.

### Warum kein Verhaltensgebot in NAVIGATION.md

AP-00 hat die Trennung explizit bestätigt: CLAUDE.md = Verhalten, NAVIGATION.md = Routing. Diese Trennung ist Systemarchitektur, nicht Konvention.

---

## Prüfungen

- `NAVIGATION.md` geändert: **ja**
- nur `NAVIGATION.md` und Ergebnisprotokoll geändert: **ja**
- Routing-Hinweis steht im Abschnitt `App bauen / ändern (Apps/)`: **ja**
- Hinweis verweist auf `Apps/[App-Name]/APP_SPEC.md`: **ja**
- Fallback auf `MINI_SPEC_FROM_HAUPTDOKUMENT.md` vorhanden: **ja**
- Verweis auf `.claude/CLAUDE.md` § APP-ARBEIT vorhanden: **ja**
- keine Verhaltensregel in `NAVIGATION.md` formuliert: **ja**
- kein Prüfscore eingefügt: **ja**
- keine Template-Felder eingefügt: **ja**
- keine `CLAUDE.md` geändert: **ja**
- keine Skills geändert: **ja**
- keine App-Specs geändert: **ja**
- kein Code geändert: **ja**
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
3. AP-03-Format für LLM-Prüfscore noch offen

---

## Empfohlener nächster AP

**AP-03 — Standardformat Steuerungsblock + Prüfscore**
Template-Datei oder Abschnitt in `docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md` für die 7 Felder des Steuerungsblocks + operationalen Prüfscore. Kein Einbau in App-Specs, keine CLAUDE.md, keine Skills.

---

## Bestätigungen

- Keine CLAUDE.md-Änderung: **ja**
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
