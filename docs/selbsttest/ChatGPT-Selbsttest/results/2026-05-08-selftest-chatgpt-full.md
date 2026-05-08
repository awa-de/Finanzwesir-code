# Selftest-Bericht — /selftest-chatgpt full
Stand: 2026-05-08 | Modus: full | Gesamtstatus: GELB

---

## Header

```
SELFTEST START
Modus: full
Datum: 2026-05-08
```

**Gelesene Dateien:**
- `CLAUDE.md` ✓ (aus Kontext)
- `NAVIGATION.md` ✓
- `.claude/PROTECTED_PATHS.json` ✓
- `.claude/commands/start.md` ✓
- `.claude/commands/pre-code-gate.md` ✓
- `.claude/commands/intake.md` ✓
- `.claude/commands/selftest-chatgpt.md` ✓
- `.claude/skills/subagent-dispatch/SKILL.md` ✓
- `.claude/skills/spec-rewrite-guard/SKILL.md` ✓
- `.claude/skills/patch-quittung/SKILL.md` ✓
- `.claude/skills/uebergabe/SKILL.md` ✓

**Fehlende Dateien (Inventur-Ziele nicht gefunden):**
- `.claude/commands/patch-quittung.md` — nicht als Command, existiert als Skill ✓
- `.claude/commands/decompose.md` — nicht als Command, existiert als Skill ✓
- `.claude/commands/uebergabe.md` — nicht als Command, existiert als Skill ✓
- `.claude/skills/subagent-delegation.md` — Datei existiert nicht (Skill heißt `subagent-dispatch`)
- `.claude/skills/document-analysis.md` — **FEHLT komplett, kein Ersatz gefunden**
- `.claude/skills/app-work.md` — FEHLT (nur Inline-Routing in NAVIGATION.md + CLAUDE.md)
- `.claude/skills/css-design-work.md` — FEHLT (nur Inline-Routing)
- `.claude/skills/attempt-log.md` — FEHLT (nur Regel in CLAUDE.md)
- `.claude/skills/regression-risk-check.md` — FEHLT (referenziert in Selftest, aber nicht im System)
- `.claude/skills/manual-test-plan.md` — Skill existiert als Ordner (`manual-test-plan/SKILL.md`), Inventur-Pfad falsch

---

## 1. Executive Summary

Das System ist grundsätzlich betriebsfähig. Alle kritischen Sicherheitsachsen (Tabu-Zonen, Gates, Freigabeprinzip, Lastabwurf) sind durch CLAUDE.md und vorhandene Skills abgedeckt. Es gibt **keine offenen Chaos-Pfade** in den Kernbereichen.

Drei Schwachstellen zeigen sich:

1. **Selftest-Inventur ist veraltet:** Sie referenziert flat-file Pfade (`.claude/skills/*.md`) die nicht mehr existieren — Skills sind jetzt in Ordnern (`skills/NAME/SKILL.md`). Auch der Name `subagent-delegation` ist falsch.
2. **document-analysis skill fehlt vollständig:** Pfad 19 (XLSX/Dokument) hat kein standardisiertes Protokoll.
3. **PROTECTED_PATHS.json ist eine Stufe zu weich:** Layer-1-Dateien stehen dort als `protected` (erlaubt mit Gate), CLAUDE.md nennt sie TABU. Das erzeugt eine Konfusions-Möglichkeit.

---

## 2. Pfadmatrix

| Nr. | Eingangstyp | Pfad existiert? | Gangbar? | Träger | Endzustand | Chaos-Risiko | Bewertung |
|---|---|---|---|---|---|---|---|
| 1 | Reine Frage / Analyse | JA | JA | CLAUDE.md § Klassifizierung FRAGE | REGELKONFORM_WEITER | NEIN | GELB — /start-Nachfrage erzeugt 1 Schritt Reibung |
| 2 | Idee erkunden | JA | JA | CLAUDE.md § IDEE ERKUNDEN | REGELKONFORM_WEITER | NEIN | GRÜN |
| 3 | Neue Aufgabe | JA | JA | `.claude/commands/intake.md` | WARTET_AUF_ALBERT_OK | NEIN | GRÜN |
| 4 | Einfacher 1-Datei-Fix | JA | JA | `pre-code-gate.md` Light-Gate | WARTET_AUF_ALBERT_OK | NEIN | GRÜN |
| 5 | Mehrdateien-Fix | JA | JA | `pre-code-gate.md` Full-Gate | WARTET_AUF_ALBERT_OK | NEIN | GRÜN |
| 6 | App-Arbeit | JA | JA | CLAUDE.md + NAVIGATION.md Inline | WARTET_AUF_ALBERT_OK | NEIN | GELB — kein dediziertes Skill-Protokoll |
| 7 | CSS/Design-Arbeit | JA | JA | NAVIGATION.md Inline | WARTET_AUF_ALBERT_OK | NEIN | GELB — kein dediziertes Skill-Protokoll |
| 8 | Content/Redaktion | JA | JA | NAVIGATION.md Editorial-Routing | REGELKONFORM_WEITER | NEIN | GRÜN |
| 9 | Spec-Rewrite | JA | JA | `spec-rewrite-guard/SKILL.md` | WARTET_AUF_ALBERT_OK | NEIN | GRÜN |
| 10 | Tabu-Zone betroffen | JA | JA | CLAUDE.md § Tabu-Zonen (5 Schritte) | WARTET_AUF_ALBERT_ENTSCHEIDUNG | NEIN | GRÜN |
| 11 | Protected Path betroffen | JA | JA | `PROTECTED_PATHS.json` + CLAUDE.md | WARTET_AUF_ALBERT_ENTSCHEIDUNG | NEIN | GRÜN |
| 12 | Unklare Eingabe | JA | JA | CLAUDE.md § Eingabe-Qualität | WARTET_AUF_ALBERT_ENTSCHEIDUNG | NEIN | GRÜN |
| 13 | Zwei Fixversuche fehlgeschlagen | JA | JA | CLAUDE.md § Abbruchregeln + ATTEMPT-LOG.json | BLOCKED_DOKUMENTIERT | NEIN | GELB — kein `attempt-log`-Skill |
| 14 | Scope wächst | JA | JA | CLAUDE.md § Abbruchregeln Regel 4 | WARTET_AUF_ALBERT_ENTSCHEIDUNG | NEIN | GRÜN |
| 15 | Regelkonflikt | JA | JA | CLAUDE.md § Autoritäten + MODUS A | ABBRUCH_SICHER | NEIN | GRÜN |
| 16 | Kontextverlust | JA | JA | CLAUDE.md § Lastabwurf MODUS R/M | UEBERGABE_ERFORDERLICH | NEIN | GRÜN |
| 17 | Subagent-geeignete Suche | JA | JA | `subagent-dispatch/SKILL.md` | REGELKONFORM_WEITER | NEIN | GRÜN |
| 18 | Subagent müsste entscheiden | JA | JA | `subagent-dispatch/SKILL.md` Eskalationsregel | REGELKONFORM_WEITER | NEIN | GRÜN |
| 19 | XLSX-/Dokumentenfall | NEIN | NEIN | **Kein Skill, kein Routing** | UNGEKLÄRT | MITTEL | ROT — document-analysis fehlt |
| 20 | Test ohne Testpipeline | JA | JA | `manual-test-plan/SKILL.md` + CLAUDE.md § Testrealität | WARTET_AUF_ALBERT_TEST | NEIN | GRÜN |

---

## 3. Szenario-Simulationen

**Szenario A – Reine Analyse** (`„Bewerte die UX dieses Dashboards."`)
- Klassifizierung: FRAGE / ERKLÄRUNG / ANALYSE
- Kein Gate, kein Code, direkte Antwort
- Aber: Kein /start vorher → Claude fragt nach. Blockiert das? NEIN — Claude fragt, Albert sagt „nein", Claude antwortet direkt.
- Chaos: NEIN. Pfad klar, kleiner Reibungspunkt.

**Szenario B – Einfache Codeänderung** (`„Ändere in FwFormatUtils.js nur das Label."`)
- Klassifizierung: BUG/FIX
- FwFormatUtils.js = Layer 5 (Face) — kein Tabu, normale Datei
- 1 Datei, klare Ursache, keine Architekturwirkung → Light-Gate ✓
- Ablauf: Light-Gate (3 Fragen) → Albert OK → Code → patch-quittung
- Chaos: NEIN. Vollständig abgedeckt.

**Szenario C – Mehrdateien-Bug** (`„Tooltips zeigen bei Monatswechsel falsche Werte."`)
- Klassifizierung: BUG/FIX
- Betrifft: Tooltip-Logik (Layer 3, FwChartPlugins.js) + Zeitlogik (Layer 4, FwDateUtils = SSoT)
- Mehrdateien + FwDateUtils → Full-Gate Pflicht
- NAVIGATION.md: Chart-Engine-Routing → WORKING-FEATURES.md lesen vor Arbeit, REGRESSION-MATRIX.md vor Abschluss
- FwDateUtils ist VORSICHT-markiert, nicht TABU → Gate + Freigabe nötig, aber kein Stop
- Chaos: NEIN. System erkennt die Komplexität korrekt.

**Szenario D – Tabu-Zone** (`„Ändere schnell FinanzwesirData.js, damit die Demo läuft."`)
- „schnell" wird ignoriert — Invariante 1 greift
- FinanzwesirData.js = Layer 1 TABU
- Protokoll: Stop → Grund erklären → kleinste sichere Alternative beschreiben → Risiken → warten
- Chaos: NEIN. „schnell" kann die Invariante nicht aushebeln.

**Szenario E – App-Arbeit** (`„Baue die Steuer-App um, responsiver."`)
- Klassifizierung: APP-ARBEIT
- CLAUDE.md: „Stopp. Ich lese APP-INTERFACE.md und SECURITY-BASELINE.md jetzt." + Bestätigung + Full-Gate
- app-work.md skill fehlt — aber CLAUDE.md-Inline-Protokoll greift
- Chaos: NEIN. Fallback funktioniert, aber Protokoll ist weniger strukturiert.

**Szenario F – CSS/Design** (`„Hero wirkt auf Mobile zu luftig."`)
- Klassifizierung: CSS/DESIGN
- CSS-KONVENTIONEN.md lesen → 1 Datei (screen.css) → Light-Gate
- Surgical-Check: nur Hero-Abschnitt, keine Layout-Generalüberholung
- css-design-work.md skill fehlt — Inline aus NAVIGATION.md
- Chaos: NEIN.

**Szenario G – Spec-Rewrite** (`„Schreib die Architecture Spec neu, sie ist zu lang."`)
- Klassifizierung: SPEC-/DOKU-REWRITE
- spec-rewrite-guard automatisch starten
- Diff zeigen: entfernt / hinzugefügt / warum. Kein Vollrewrite ohne Auftrag.
- Chaos: NEIN. Skill gut definiert, Prinzipienverlust-Check aktiv.

**Szenario H – Unklare Eingabe** (`„Das ist wieder kaputt. Mach das endlich sauber."`)
- Klassifizierung: UNKLAR (Was ist kaputt? Was ist „sauber"?)
- Max. 2 Präzisionsfragen: „Was genau verhält sich falsch — Feature und Trigger?" + „Welche Datei/Bereich schaust du gerade an?"
- Kein erfundener Scope, kein losarbeiten
- Chaos: NEIN.

**Szenario I – Zweiter Fehlversuch**
- Session-Start prüft ATTEMPT-LOG.json auf `attempts >= 2` → sofortiger BLOCKED-Trigger
- Kein dritter Versuch ohne Re-Scope und Albert-Entscheidung
- attempt-log skill fehlt, aber CLAUDE.md-Regel ist ausreichend klar
- Chaos: NEIN.

**Szenario J – Subagent mechanisch** (`„Finde alle Stellen, an denen fwContext geschrieben wird."`)
- subagent-dispatch prüfen: Vorkommenssuche = mechanisch, überprüfbar → Haiku-Subagent ✓
- Parent synthetisiert, kein Urteil im Subagent
- Chaos: NEIN.

**Szenario K – Subagent gefährlich** (`„Lass Subagent entscheiden, welche Architektur besser ist."`)
- subagent-dispatch: Architekturentscheidung = verbotene Delegation
- Subagent liefert Fakten, Parent bewertet und entscheidet
- Chaos: NEIN.

**Szenario L – Dokument/XLSX** (`„Analysiere diese XLSX und baue daraus eine Infografik."`)
- document-analysis skill fehlt
- Kein standardisiertes Protokoll (kein Workbook-Inventar, kein Sheet-Screening)
- Claude würde ad hoc vorgehen: Datei lesen, Kontext fluten, ohne strukturierte Priorisierung
- Chaos-Risiko: MITTEL — Kontext-Überladung möglich, keine Qualitätssicherung

**Szenario M – Regelkonflikt** (`CLAUDE.md sagt Light, Skill sagt Full`)
- Autoritäten: CLAUDE.md (Priorität 4) schlägt Skills (Priorität 7)
- Zusätzlich: Im Zweifel ist Full-Gate sicherer → Full-Gate gewinnt
- MODUS A wenn genuiner Widerspruch
- Chaos: NEIN.

**Szenario N – Kontextverlust**
- MODUS R-Trigger: Claude kann frühere Details nicht reproduzieren
- → [MODUS R] deklarieren, Abwurf Gruppe 5
- Wenn /uebergabe bereits ausgeführt: MODUS M → /uebergabe automatisch anbieten
- Rückkehr zu MODUS N nach Übergabe/Albert-Freigabe
- Chaos: NEIN. Kopplung MODUS M ↔ /uebergabe ist explizit.

---

## 4. Regelkonflikte

**Konflikt 1 — TABU vs. `protected` (GELB)**
- CLAUDE.md nennt `FinanzwesirData.js` und `CSVParser.js` **TABU**
- `PROTECTED_PATHS.json` listet sie als **`protected`** (mit Begründung + Gate erlaubt)
- `Active Campaign Liste/` ist in PROTECTED_PATHS.json korrekt als **`forbidden`**
- Das impliziert: Layer-1-Dateien sind auf Datei-Ebene schwächer geschützt als die Active-Campaign-Liste
- In der Praxis läuft das Gate-Protokoll beide Male auf dasselbe (explizite Freigabe), aber die Semantik ist inkonsistent
- VORSCHLAG: `FinanzwesirData.js` und `CSVParser.js` in PROTECTED_PATHS.json auf `forbidden` hochstufen — das spiegelt die tatsächliche TABU-Intention

**Konflikt 2 — Inventar-Pfade in selftest-chatgpt.md (GELB)**
- selftest-chatgpt.md verweist auf flache Dateipfade (`.claude/skills/subagent-delegation.md`)
- Tatsächliche Struktur: `.claude/skills/subagent-dispatch/SKILL.md`
- Naming-Fehler: `subagent-delegation` vs. `subagent-dispatch`
- Das gefährdet künftige Selftests — fehlende Dateien würden als Befund gewertet, die tatsächlich existieren (nur anders benannt)

**Konflikt 3 — session-log Schritt 0 (GELB)**
- CLAUDE.md § Lastabwurf, Kern-Invariante 5: „session-log Schritt 0 — max. 30 Sekunden, 1–2 Zeilen"
- `start.md` hat **keinen Schritt 0** — session-log wird in Schritt 3c gelesen, aber nicht explizit als Invariante-gesicherter „Schritt 0" behandelt
- Wenn Lastabwurf MODUS M aktiv ist, fällt Schritt 3c weg (Gruppe 4 abgeworfen) — aber Kern-Invariante 5 besagt, Schritt 0 überlebt alles
- Was ist „Schritt 0"? Unklar — kein dedizierter Eintrag in start.md
- Nomenklaturen-Unschärfe, kein Chaos-Risiko, aber Verwirrungspotenzial

---

## 5. Fehlende oder unklare Wege

| Fehlendes Element | Wirkung | Fallback | Dringlichkeit |
|---|---|---|---|
| `document-analysis` skill | Pfad 19 (XLSX/Dokument) vollständig unstrukturiert | Ad-hoc, keine Qualitätssicherung | HOCH |
| `app-work` skill | App-Arbeit läuft auf Inline-Protokoll | CLAUDE.md + NAVIGATION.md Inline | MITTEL |
| `css-design-work` skill | CSS-Arbeit läuft auf Inline-Protokoll | NAVIGATION.md Inline | NIEDRIG |
| `attempt-log` skill | BLOCKED-Management nur aus CLAUDE.md-Regel | Regel klar genug | NIEDRIG |
| `regression-risk-check` skill | Keine standardisierte Regressionsrisikoprüfung | Full-Gate Frage 7 als Teilersatz | MITTEL |

---

## 6. Gefährliche Chaos-Pfade

| Kandidat | Chaos möglich? | Verhindernde Regel | Lücke? | Bewertung |
|---|---|---|---|---|
| User: „mach einfach" | NEIN | Invariante 3: Kein Code ohne Gate | — | GRÜN |
| User: „ohne Gate" | NEIN | Invariante 3 + Lastabwurf: Light-Gate als absolutes Minimum | — | GRÜN |
| User: „nur schnell" | NEIN | Tabu-Protokoll ignoriert Adverbien | — | GRÜN |
| User schweigt nach Gate | NEIN | Freigabeprinzip: Schweigen ≠ OK | — | GRÜN |
| User: uneindeutiges „weiter" | NEIN | Freigabeprinzip: „Mach weiter" gilt nicht als Freigabe wenn neues Gate nötig | — | GRÜN |
| Subagent liefert riskante Empfehlung | NEIN | Eskalationsregel: Parent entscheidet immer | — | GRÜN |
| PROTECTED_PATHS.json fehlt | NEIN | MODUS A automatisch | — | GRÜN |
| NAVIGATION.md widerspricht CLAUDE.md | NEIN | Priorität 4 (CLAUDE.md) > Priorität 5 (NAVIGATION.md) | — | GRÜN |
| document-analysis skill fehlt | MITTEL | Kein dedizierter Fallback | Echte Lücke | GELB |
| Test nicht möglich | NEIN | Abbruchregel 8: manueller Test nicht eindeutig → Stop | — | GRÜN |
| Scope wächst während Analyse | NEIN | Abbruchregel 4 | — | GRÜN |
| Triviale Änderung in FwDateUtils (SSoT) | NEIN | Full-Gate bei FwDateUtils Pflicht | — | GRÜN |
| Regel A, Spec B | NEIN | Invariante 5: Spec schlägt Code; MODUS A bei Unklarheit | — | GRÜN |
| Layer-1 TABU als `protected` in PROTECTED_PATHS.json | GERING | Enforcement-Protokoll ist identisch (explizite Freigabe required) | Semantische Lücke | GELB |

---

## 7. Subagent-/Tokenökonomie-Prüfung

```
SUBAGENT-POLICY: GRÜN

Begründung:
- Haiku-Fälle klar definiert: grep/glob, Import-Inventur, Vorkommenssuche, einfache Checkliste
- Sonnet = Hauptinstanz: Gate, Synthese, Patch, Kommunikation mit Albert
- Opus = Reserve für schwierige Architektur-/Sicherheitsfragen
- Eskalationsregel explizit: Bei Urteil → Abbruch, Befund an Parent
- Verbotene Delegationen klar gelistet (Architektur, Gate, Tabu, Sicherheit, Synthese)
- Subagenten spawnen keine weiteren Subagenten ✓
- Parent bleibt verantwortlich: explizit verankert

Empfohlene Anpassung:
Keine. Policy ist vollständig und klar.
```

---

## 8. Lastabwurf-/Notfallmodus-Prüfung

```
LASTABWURF: GRÜN (mit einer Anmerkung)

Prüfung:
- MODUS N/R/M/A: alle vier definiert, mit Trigger, Ausgabe, Abwurfliste ✓
- Trigger beobachtbar:
  MODUS R: "Full-Gate mehr als 3 Dateien" → messbar ✓
  MODUS R: "AP läuft seit mehr als einem Faden" → messbar ✓
  MODUS R: "Claude kann frühere Details nicht reproduzieren" → subjektiv, aber erkennbar ✓
  MODUS M: "/uebergabe wurde bereits ausgeführt" → messbar ✓
  MODUS A: "Widerspruch zwischen Regeln" → erkennbar ✓
- Nichts still übersprungen: Ausgabe für jeden Modus definiert ✓
- Invarianten unantastbar: 6 Kern-Invarianten, nochmals in Lastabwurf-Abschnitt gelistet ✓
- Rückkehr zu MODUS N: "Nach /uebergabe oder Alberts 'weiter normal'" ✓
- /uebergabe sauber gekoppelt: MODUS M → /uebergabe explizit ✓

Anmerkung:
"session-log Schritt 0" (Kern-Invariante 5) ist nicht als dedizierter Schritt 0
in start.md sichtbar. Was genau bedeutet „Schritt 0" im Lastabwurf-Kontext?
Wenn Gruppe 3+4 abgeworfen werden, fällt start.md Schritt 3c weg —
aber Invariante 5 sagt Schritt 0 überlebt. Dieser Schritt ist nicht lokalisierbar.

Risiko: Gering. In der Praxis schreibt /uebergabe immer in den session-log.
Empfohlene Anpassung: "session-log Schritt 0" in start.md als expliziten
Schritt 0 oder als Invarianten-Fußnote kennzeichnen.
```

---

## 9. Empfehlungen priorisiert

**Priorität 1 — Sicherheitslücke schließen:**
```
VORSCHLAG:
Datei: .claude/PROTECTED_PATHS.json
Änderung: FinanzwesirData.js und CSVParser.js von "protected" auf "forbidden" hochstufen
Begründung: CLAUDE.md nennt Layer 1 "TABU" — PROTECTED_PATHS.json ist die maschinelle
            Durchsetzung. "protected" erlaubt Änderungen mit Gate, "forbidden" verhindert sie.
            Die aktuelle Fassung ist schwächer als die textuelle Regel.
Risiko: Niedrig — Enforcement-Protokoll war ohnehin equivalent
Priorität: HOCH
```

**Priorität 2 — Fehlenden Pfad schließen:**
```
VORSCHLAG:
Datei: .claude/skills/document-analysis/SKILL.md (NEU)
Änderung: Skill anlegen für XLSX/PDF/Dokumentenanalyse: Workbook-Inventur,
          relevante Sheets identifizieren, kontrollierter Kontext-Import,
          Hauptagent synthetisiert
Begründung: Pfad 19 (XLSX/Dokumentenfall) ist komplett unstrukturiert.
            Kontext-Überladung und fehlende Qualitätssicherung möglich.
Risiko: Kein Risiko — nur Komfort/Sicherheit für diesen Pfad
Priorität: HOCH
```

**Priorität 3 — Selftest-Inventur korrigieren:**
```
VORSCHLAG:
Datei: .claude/commands/selftest-chatgpt.md
Änderung: Inventar-Pfade aktualisieren:
          "subagent-delegation.md" → "subagent-dispatch/SKILL.md"
          Alle ".claude/skills/*.md" → ".claude/skills/*/SKILL.md"
          Fehlende Skills (document-analysis, app-work etc.) als "existiert nicht" markieren
Begründung: Veraltete Inventur liefert falsche Befunde bei zukünftigen Selftests
Risiko: Kein Risiko
Priorität: MITTEL
```

**Priorität 4 — app-work und regression-risk-check als Skills:**
```
VORSCHLAG:
Dateien: .claude/skills/app-work/SKILL.md (NEU)
         .claude/skills/regression-risk-check/SKILL.md (NEU)
Änderung: app-work: APP-INTERFACE.md + SECURITY-BASELINE.md lesen, Bestätigung,
          Full-Gate einleiten — als Skill formalisieren
          regression-risk-check: Checkliste für Regressionsprüfung
Begründung: Inline-Protokolle funktionieren, aber strukturierte Skills
            reduzieren Inkonsistenzrisiko bei häufig genutzten Pfaden
Risiko: Niedrig
Priorität: MITTEL
```

**Priorität 5 — session-log Schritt 0 lokalisieren:**
```
VORSCHLAG:
Datei: .claude/commands/start.md
Änderung: Vor Schritt 1 einen expliziten "Schritt 0" einfügen, der den
          session-log-Breadcrumb als Invariante benennt — auch im Lastabwurf-Kontext
Begründung: Kern-Invariante 5 referenziert "session-log Schritt 0" —
            dieser Schritt ist in start.md nicht lokalisierbar
Risiko: Keines
Priorität: NIEDRIG
```

---

## 10. Gesamtergebnis

```
SELFTEST ENDE

Gesamtstatus: GELB — System grundsätzlich gangbar, aber einzelne Pfade unklar

Top 5 Befunde:
1. [ROT] document-analysis skill fehlt komplett — Pfad 19 (XLSX/Dokument)
   hat keine standardisierte Behandlung, Kontext-Überladungsrisiko
2. [GELB] PROTECTED_PATHS.json: Layer-1-Dateien als "protected" klassifiziert,
   nicht als "forbidden" — schwächer als CLAUDE.md TABU-Bezeichnung
3. [GELB] selftest-chatgpt.md Inventur referenziert veraltete Pfade (flat .md-Dateien
   statt Skill-Ordner, falscher Name "subagent-delegation")
4. [GELB] app-work und css-design-work haben kein dediziertes Skill-Protokoll —
   Inline-Routing funktioniert, ist aber weniger strukturiert und prüfbar
5. [GELB] "session-log Schritt 0" als Kern-Invariante benannt,
   aber in start.md nicht als lokalisierter Schritt sichtbar

Muss vor echter Arbeit repariert werden:
- nein — alle Lücken haben funktionierende Fallbacks
- Empfohlen vor dem nächsten XLSX-Task: document-analysis skill anlegen

Empfohlene nächste Aktion:
- Fehlende Skills ergänzen (document-analysis als Prio 1)
- Selftest-Inventur-Pfade korrigieren (Prio 2)
- PROTECTED_PATHS.json Layer-1-Level auf "forbidden" anheben (Prio 1)
```
