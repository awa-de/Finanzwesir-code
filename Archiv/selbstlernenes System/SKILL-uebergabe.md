# Skill: /uebergabe
Stand: 2026-05-05 | Status: Entwurf — noch nicht implementiert

---

## Zweck

Ersetzt den freihändigen Übergabeprompt. Wenn der Token-Speicher voll wird und ein AP
noch nicht abgeschlossen ist, erzeugt dieser Skill einen strukturierten, qualitativ
hochwertigen Übergabeprompt — und schreibt gleichzeitig automatisch einen Interim-Breadcrumb
in den session-log. Albert muss an nichts denken.

**Vorbild:** Schicht-Übergabe in Kernkraftwerken (NRC-Standard). Jede Übergabe folgt
demselben Format: Anlagenstatus → laufende Aktivitäten → ausstehende Punkte → Besonderheiten.
Ein kalter Schichtführer kann sofort übernehmen — ohne Rückfragen.

---

## Trigger

- Albert sagt: "Übergabeprompt", "Übergabe", "neuer Thread", "wir werden voll"
- Claude erkennt proaktiv: Kontext ist weit gefüllt → Claude bietet an:
  "Soll ich einen Übergabeprompt erzeugen?"

---

## Delta-Prinzip (Token-Ökonomie)

`/start` lädt in jedem neuen Thread bereits:
- PROJECT-STATUS.md → Fokus, letzter Stand, Blocker
- NAVIGATION.md → Routing, Pfade
- BACKLOG.md → alle APs mit Prio und Abhängigkeiten
- ATTEMPT-LOG.json → blockierte Issues

Der Übergabeprompt liefert NUR das, was `/start` nicht kennen kann:
das AP-spezifische Delta dieses Threads.

Faustregel: Wenn eine Information nach /start in einer Datei steht → nicht wiederholen.
Nur das rein, was im Kopf von Claude steckt und nach dem Thread verloren wäre.

---

## Ablauf (Reihenfolge einhalten)

### Schritt 1 — Kontext intern erfassen

Claude beantwortet sich selbst (nicht ausgeben):
- Welches AP ist aktiv? (ID + Titel)
- Was wurde in diesem Thread konkret erledigt? (keine vagen Zusammenfassungen)
- Wo genau wurde gestoppt? (Datei, Zeile, Methode — so präzise wie möglich)
- Was ist der nächste konkrete Schritt?
- Welche Entscheidungen hat Albert mündlich getroffen, die NOCH NICHT in Dateien stehen?
- Gibt es eine laufende Hypothese oder Analyse die mid-flight ist?
- Gab es Friktionen oder Korrekturen in diesem Thread?

### Schritt 2 — Breadcrumb schreiben (automatisch, Albert sieht das nicht als separaten Schritt)

In `.claude/learning/session-log.md` eintragen.

**Sprach-Prinzip (HRO: Beinahe-Unfall, kein Blame):**
Einträge sind beschreibend, nicht evaluativ.
Richtig:   "[FRICTION] Gate-Schritt 7 übersprungen → manuell nachgeholt"
Falsch:    "[FRICTION] Fehler: Claude hat versagt"
Das Ziel ist Signal für Muster-Erkennung — nicht Schuldzuweisung.

Challenge-Response vor dem Eintrag:
"Gab es eine Korrektur oder Abweichung?"  → j/n
"Gab es eine Überraschung?"               → j/n

```
## YYYY-MM-DD – [AP-ID] [Titel] (Übergabe, läuft noch)
- [FRICTION] [Was passierte] → [Was korrigiert wurde]   ← beschreibend
- [WIN]      [Was besser lief als erwartet]
- [OK]       Übergabe ohne Vorkommnisse
```

Regel: Mindestens eine Zeile. Wenn keine Friktionen oder Wins: [OK] Übergabe ohne Vorkommnisse.

### Schritt 3 — Übergabeprompt ausgeben

Format: strukturiert, kompakt, max. 15 Zeilen (ohne die /start-Zeile).
Abschnitte die leer wären → weglassen (keine Platzhalter).

---

## Format des Übergabeprompts

```
/start

Fortführung [AP-ID]: [Titel]

Letzter Stand:
- [Konkrete erledigte Schritte — max. 3 Punkte]
- [Wo gestoppt: Datei ab Zeile X / nach Schritt Y]

Nächster Schritt:
- [Exakt wo fortsetzen — so präzise wie möglich]

Mündliche Entscheidungen (noch nicht in Dateien):
- [Entscheidung: Wert oder Richtung]

Laufende Hypothese:
- [Aktuelle Vermutung oder offene Analysefrage]
```

---

## Qualitätskriterium

Ein kalter Claude — neue Session, null Kontext — kann nach `/start` + Lesen dieses Prompts
**sofort weiterarbeiten ohne Rückfragen** zu: wo waren wir, was kommt als nächstes,
was hat Albert entschieden.

Wenn das nicht erfüllt ist, ist der Übergabeprompt unvollständig.

---

## Edge Cases

**Kaum Arbeit geleistet (Thread wurde früh abgebrochen):**
"Letzter Stand: Analyse begonnen, [Datei] gelesen."
Nächster Schritt trotzdem so präzise wie möglich.

**Mehrere APs im Thread:**
Übergabeprompt für das Haupt-AP. Andere kurz erwähnen:
"Nebenbei: [AP-X] kurz besprochen, kein Code, kein Abschluss."

**Keine mündlichen Entscheidungen:**
Abschnitt "Mündliche Entscheidungen" weglassen.

**Keine laufende Hypothese:**
Abschnitt "Laufende Hypothese" weglassen.

**AP war fast fertig (nur Abschluss-Ritual fehlt):**
"Letzter Stand: Implementierung abgeschlossen, Test steht aus."
"Nächster Schritt: Abschluss-Ritual für AP-X."

---

## Beispiel (vollständig ausgefüllt)

```
/start

Fortführung AP-20: Mixed-Rhythm CV-Heuristik

Letzter Stand:
- T5→T3-Erkennung implementiert, scenario_3_short_14m.csv läuft durch
- T6→T7-Übergang noch offen
- Bei Zeile 142 in FwSmartScales.js gestoppt

Nächster Schritt:
- detectRhythm() ab Zeile 142 für T6→T7-Übergang erweitern

Mündliche Entscheidungen (noch nicht in Dateien):
- Schwellenwert: 180 Tage (Albert bestätigt, noch nicht committed)

Laufende Hypothese:
- Grenzfall bei exakt 180 Tagen — off-by-one im Vergleich zu T5
```

---

## Beispiel (minimal — kein Overhead wenn nichts zu sagen)

```
/start

Fortführung AP-22: Zero-Line lineWidth

Letzter Stand:
- FwRenderer.js Zeile 87 angepasst, Test in scenario_1.html noch offen

Nächster Schritt:
- scenario_1.html im Live-Server öffnen, Zero-Line bei negativen Werten prüfen
```

---

## Was NICHT in den Übergabeprompt gehört

| Information | Warum weglassen |
|---|---|
| AP-Beschreibung / Ziel | In BACKLOG.md, /start lädt das |
| Gate-Regeln, Tabu-Zonen | In CLAUDE.md, immer geladen |
| Projektstruktur, Pfade | In NAVIGATION.md, /start lädt das |
| Bereits committete Entscheidungen | In Spec-Dateien, Claude liest sie bei Bedarf |
| Allgemeiner Projektstatus | In PROJECT-STATUS.md, /start lädt das |
