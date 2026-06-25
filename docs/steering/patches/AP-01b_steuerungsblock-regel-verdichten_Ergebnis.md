# AP-01b Ergebnis — CLAUDE.md-Regel verdichtet

Stand: 2026-06-25 | Session: AP-01b | Geändert von: Claude

---

## Auftrag

Bestehende AP-01-Regel in `.claude/CLAUDE.md` § APP-ARBEIT durch eine kompaktere Fassung ersetzen. Gleiche Schutzwirkung, weniger Text, klare Negativ-Regel, Detailverweis auf nachgeordnete Steuerungsdateien.

---

## Geänderte Dateien

- GEÄNDERT: `.claude/CLAUDE.md` (AP-01-Regel im APP-ARBEIT-Block ersetzt, Stand-Zeile unverändert)
- NEU: `docs/steering/patches/AP-01b_steuerungsblock-regel-verdichten_Ergebnis.md` (diese Datei)

---

## Vorprüfung

### Arbeitsbaum

- `git status --short`: ` M .claude/CLAUDE.md | M .claude/learning/session-log.md | ?? docs/steering/patches/AP-01_...Ergebnis.md`
- Erwartete Änderungen: CLAUDE.md (AP-01), session-log.md (Session-Start), AP-01-Protokoll (untracked)
- Unerwartete Änderungen: keine
- `.claude/learning/session-log.md` berührt: ja (erwartet — Session-Start-Protokoll)
- Befund: GRÜN

### AP-01-Gate

- AP-01-Protokoll gefunden: ja — `docs/steering/patches/AP-01_globaler-80-prozent-steuerungsblock-waechter_Ergebnis.md`
- AP-01-Status: GRÜN
- AP-01-Blocker: nein
- AP-01-Regel in CLAUDE.md bestätigt: ja — 4-Satz-Regel im APP-ARBEIT-Block, exakter Text aus AP-01 bekannt und eindeutig auffindbar
- Befund: GRÜN

### Zielregel

- `.claude/CLAUDE.md` gefunden: ja
- Zielregel gefunden: ja
- Zielbereich: § Eingangs-Routing > Klassifizierung > `**APP-ARBEIT**`, letzte Zeile des Blocks vor `\---`-Trenner
- eindeutige Ersetzung möglich: ja — Zieltext einmalig in der Datei, keine zweite Fundstelle
- Befund: GRÜN

---

## Umsetzung

### Alte Fassung entfernt

```
Steuerungsblock der App lesen (`APP_SPEC.md` § Steuerungsblock; falls nicht vorhanden: `MINI_SPEC_FROM_HAUPTDOKUMENT.md`). Gilt standardmäßig als 80%-Entwurf, nicht als finale Wahrheit. Vor Code, UX-, Daten- oder Spec-Arbeit prüfen: Zweck, psychologische Barriere, falscher Glaubenssatz, Zielzustand und Nicht-Ziele. Bei unklarem oder schwachem Block (< 80%): stoppen, Lücke benennen, mit Albert klären — keine Umsetzung ohne Klärung.
```

### Neue Fassung

```
APP-ARBEIT: Keine Code-, UX-, Daten- oder Spec-Detailarbeit ohne geprüften lokalen App-Steuerungsblock. Der Block gilt als 80%-Entwurf; bei unklarem Zweck, unklarer Barriere oder verletzten Nicht-Zielen stoppen und mit Albert klären. Details regeln App-Spec, Routing und App-Fabrik-Skills.
```

### Position

Gleiche Stelle: direkt nach `Bestätigung ausgeben → Full-Gate (immer, keine Ausnahme).`, vor dem `\---`-Trenner.

### Umfang

3 Sätze (1 Zeile). Reduzierung von ~75 Wörtern (AP-01) auf ~42 Wörter (AP-01b).

### Warum Verdichtung sinnvoll

`CLAUDE.md` ist Verfassung, kein Handbuch. Detailfelder (Glaubenssatz, Zielzustand, Fallback-Dateiname) gehören in App-Spec-Template (AP-03) und Routing (AP-02). Die Kurzfassung nennt das Verbot, den Qualitätsschwellenwert und die Klärungspflicht — das sind die drei operativen Punkte, die in der Verfassung stehen müssen.

### Warum keine neue Regel

Es ist eine 1:1-Ersetzung. Die AP-01-Regel ist vollständig entfernt; die neue Kurzfassung steht an derselben Position.

---

## Prüfungen

- neue Negativ-Regel vorhanden: **ja** („Keine Code-, UX-, Daten- oder Spec-Detailarbeit ohne geprüften lokalen App-Steuerungsblock.")
- 80%-Entwurf erwähnt: **ja** („Der Block gilt als 80%-Entwurf")
- Stop/Klärung mit Albert erwähnt: **ja** („stoppen und mit Albert klären")
- Verweis auf App-Spec, Routing, App-Fabrik-Skills vorhanden: **ja** („Details regeln App-Spec, Routing und App-Fabrik-Skills.")
- keine doppelte Steuerungsblock-Regel: **ja** — AP-01-Regel vollständig ersetzt
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

Keine neuen. AP-00-Restpunkte unverändert:
1. `app-spec-create/SKILL.md` fehlt (AP-06)
2. `spec-mode-architecture` nicht in NAVIGATION.md-Skill-Tabelle (AP-02 oder AP-06)
3. AP-03-Format für LLM-Prüfscore noch offen

---

## Empfohlener nächster AP

**AP-02 — Routing-Hinweis in NAVIGATION.md**
1–2 Zeilen in der Routing-Liste § „App bauen / ändern", Verweis auf CLAUDE.md § APP-ARBEIT. Kein Verhaltensgebot, kein Vollrewrite.

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
