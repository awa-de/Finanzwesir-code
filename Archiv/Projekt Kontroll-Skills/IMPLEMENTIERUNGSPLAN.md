# Kontroll-Rückkopplungs-System — Implementierungsplan
Stand: 2026-05-04 (Rev. 2) | Session: Kontroll-System-Design | Geändert von: Claude

---

## Kontext und Problem

Albert fokussiert auf inhaltliche Entscheidungen. Claude trägt das operative Protokoll allein.
Wenn Claude eine Regel vergisst, denkt niemand mehr daran. Es gibt keinen zweiten Wächter.

Das bestehende System hat gute **Eingangs-Gates** (Light/Full Gate vor Code, Protected-Paths-Hook),
aber schlechte **Ausgangs-Accountability** (kein Protokoll nach Patches, kein Tagesabschluss,
kein Trend-Check). Scope schleicht sich still hinein oder verschwindet still.

Drei LLMs haben dieses Problem unabhängig analysiert. Ihre Konzepte sind komplementär,
nicht konkurrierend — dieser Plan synthetisiert das Beste aus allen dreien.

---

## Bewertung der drei LLM-Konzepte

| LLM | Stärke | Schwäche | Übernahme |
|-----|--------|----------|-----------|
| **ChatGPT** | Vollständigster Prozessrahmen, 9 Skills, chain-of-custody + spec-quote als Ideen | CLAUDE.md 500 Zeilen (Lost-in-Middle-Risiko), kein Audit-Fokus | Skills `chain-of-custody` und `spec-quote` als Vorlage |
| **Gemini** | Beweislast-Umkehr (Audit), 8 Rückkopplungsmechanismen mit Analogien, klare Architektur-Strategie | Skills zu kurz (8 Zeilen — nicht implementierbar), CLAUDE.md mit 51 Zeilen zu dünn | 8 Mechanismen als konzeptionelle Grundlage, alle übernommen |
| **Perplexity** | Praktische Sequenzen mit Output-Formaten, Zählprüfung überall, Session-End explizit | Kein Audit-Konzept (Beweislast), CLAUDE.md noch zu lang | Alle Skill-Sequenzen und Output-Formate als Implementierungsmuster |

**Entscheidung: Hybrid** — Geminis 8 Mechanismen als Gerüst, Perplexitys Sequenzen als Implementierung,
ChatGPTs chain-of-custody und spec-quote als Zusatz-Skills.

---

## Rollout-Entscheidung: Alles auf einmal — warum, und was sind die Risiken?

**Alberts Kernfrage:** Wenn wir phasenweise vorgehen, wie stellen wir sicher, dass Phase 2+3
wirklich kommen? Ich mache das nicht, ich vergesse das.

**Antwort:** Wir machen alles auf einmal. Denn:
1. Die neuen Skills sind **additiv und unabhängig** — sie beißen sich nicht
2. Phasierung hilft nur wenn ein Risiko existiert, das Zeit zum Reifen braucht — das ist hier nicht der Fall
3. "Später" ist in Projekten immer "nie" ohne Selbst-Trigger

**Potenzielle Inkonsistenz-Risiken bei allem auf einmal:**

1. `kassensturz` referenziert BACKLOG.md-Struktur — muss mit aktuellem Format übereinstimmen
   → Mitigation: Kassensturz-Skill liest BACKLOG.md live, keine hartcodierten Spalten
2. `chain-of-custody` und `full-gate` beide feuern bei fwContext-Berührung — Überlappung möglich
   → Mitigation: chain-of-custody ist **Erweiterung** von Full-Gate (läuft danach), nicht Ersatz
3. Command `start` referenziert `/kassensturz` — muss nach Kassensturz-Skill-Deployment laufen
   → Mitigation: Implementierungsreihenfolge beachten (Kassensturz-Skill zuerst)

**Fazit:** Risiken beherrschbar. Nach Implementierung läuft `/check-mode-gatekeeper` als Review.
Dann eine Pilot-Session mit Albert, die alle Trigger einmal bewusst durchläuft.

---

## Die 8 Rückkopplungsmechanismen (nach Gemini) — Umsetzung

| # | Mechanismus | Analogie | Wo implementiert |
|---|-------------|----------|-----------------|
| 1 | Zählprüfung | Kisten zählen | patch-quittung, kassensturz |
| 2 | Scope-Konservierung | Energie geht nicht verloren | abschluss-ritual (Schritt 2b, NEU) |
| 3 | Patch-Quittung | Sprengstoff-Magazin-Quittung | Skill: patch-quittung (NEU) |
| 4 | Aufgaben-Echo | Chirurg nennt laut die Seite | CLAUDE.md §2 + intake (bei >2 Dateien) |
| 5 | Schweigen = Stopp | Dead-Man-Switch | CLAUDE.md §2 (Ergänzung) |
| 6 | Advocatus Diaboli | Vier-Augen-Prinzip | Full-Gate Punkt 8 (Beispiel konkretisieren) |
| 7 | Kassensturz | Buchhaltungs-Periodenabschluss | Skill: kassensturz (NEU, montags in /start) |
| 8 | Layer-1-Fingerabdruck | Prüfsumme | Command: start (UPGRADE) |

---

## Vollständige Artefakt-Liste

### Gruppe A — CLAUDE.md Ergänzungen (3 Stellen, minimal-invasiv)

**A1: §2 Kreuzfahrt-Prinzip — 2 neue Regeln (nach "Kreuzfahrt-Prinzip:")**

Hinzufügen:
```
- **Schweigen ≠ OK.** Ausbleibende Reaktion ist kein OK für Code. Nur explizites "OK" oder "ja" zählt.
  "Mach weiter" gilt nicht als Freigabe für den nächsten Patch.
- **Aufgaben-Echo bei > 2 Dateien.** Claude fasst in 1–2 Sätzen zusammen, was es verstanden hat,
  bevor es Code schreibt. Albert korrigiert oder bestätigt kurz.
```

**A2: §3 Pre-Code-Gate — Patch-Quittung als Pflicht nach Code**

Am Ende von §3 (nach "→ Full-Gate: Claude wartet auf Alberts explizites 'OK'.") hinzufügen:
```
**Nach jedem abgeschlossenen Patch:** Claude führt `/patch-quittung` automatisch aus.
Kein weiterer Patch ohne Alberts Bestätigung des Testfalls.
```

**A3 — entfällt** (session-end wird nicht gebaut, siehe unten)

---

### Gruppe B — Skill: `patch-quittung` (NEU)

**Datei:** `.claude/skills/patch-quittung/SKILL.md`
**Trigger:** Automatisch nach jedem abgeschlossenen Patch (Light- und Full-Gate)
**Aufwand für Albert:** 5 Sekunden überfliegen + Testfall bestätigen

**Output-Format:**
```
PATCH-QUITTUNG | AP [ID] | [Datum]
Beauftragt:    [1-Satz Beschreibung des Auftrags]
Geändert:      [N] Datei(en), [M] Stelle(n)
Dateien:       [Liste]
CHANGED/NEW:   [✓ markiert / FEHLT: Zeile X]
Tabu-Check:    [keine ✓ / ACHTUNG: ...]
Gate-Typ:      [Light / Full]
Testfall:      [lokale HTML-Datei + Chart/CSV-Fall]
Offene Fragen: [keine / Liste]

Zählprüfung: Ich habe [M] Stellen geändert. Aufzählen?
→ Bitte teste mit [Testfall]. Ich warte vor dem nächsten Patch.
```

**Schlüsselregel:** Kein nächster Patch ohne Alberts Testbestätigung.

---

### Gruppe C — abschluss-ritual: Scope-Check (ERWEITERUNG, Arbeitsanweisung)

**Kein neuer Skill.** Das abschluss-ritual wird um einen Schritt erweitert.
**Die Datei `.claude/skills/abschluss-ritual/SKILL.md` wird in derselben Implementierungs-Session angefasst.**

**Begründung:** session-end konkurriert mit abschluss-ritual. Die eiserne Regel lautet:
nach jedem abgeschlossenen AP läuft abschluss-ritual. Damit ist der AP-Abschluss bereits vollständig
dokumentiert. Ein separates session-end wäre redundant und verwirrend.

Für unfertige Arbeit am Tagesende: ATTEMPT-LOG-Eintrag mit Status `ACTIVE` (existiert bereits).

**Neuer Schritt 2b im abschluss-ritual** (nach Schritt 2 BACKLOG, vor Schritt 3 MEMORY):

```text
2b. Scope-Check
Während der Arbeit an diesem AP neuen Scope entdeckt?
Beobachtungen, die nicht zum AP gehörten?
→ Jeden Fund explizit behandeln:
   - Als neuen AP in BACKLOG anlegen (mit Prio + Abhängigkeiten), ODER
   - Explizit verwerfen mit Begründung
→ Kein stilles Verschwinden — was nicht festgehalten wird, existiert nicht.
```

---

### Gruppe D — Skill: `kassensturz` (NEU)

**Datei:** `.claude/skills/kassensturz/SKILL.md`
**Trigger:** Automatisch bei `/start` an Montagen ODER manuell per `/kassensturz`
**Aufwand für Albert:** 1 Minute lesen + ggf. Kurskorrektur

**Montags-Erkennung:** Das `/start`-Command prüft das aktuelle Datum (Wochentag). Wenn Montag → Kassensturz.

**Output-Format:**
```
KASSENSTURZ | KW [N] | [Datum]
APs gesamt:              [N] (H: [a] | M: [b] | L: [c])
Abgeschlossen seit KW [N-1]: [N]
Neu hinzugekommen:       [N]
BLOCKED:                 [N] — [AP-IDs / "keine"]
Ältester offener AP:     [AP-ID] seit [Datum]
Trend vs. KW [N-1]:      besser / schlechter / stabil
Abweichungen:            [konkret, z.B. "AP-6c seit 3 Wochen aktiv ohne Fortschritt"]
Empfehlung:              [1 Satz]

→ Stimmt dieses Bild mit deiner Wahrnehmung überein?
```

**Schlüsselregel:** Kassensturz ist Trend-Check, nicht Tageslage. Kernfrage: "Wird das Projekt besser oder schlechter?"

---

### Gruppe E — Skill: `chain-of-custody` (NEU, nach ChatGPT-Vorlage)

**Datei:** `.claude/skills/chain-of-custody/SKILL.md`
**Trigger:** Wenn `fwContext`, `FinanzwesirData.js`, `CSVParser.js`, `FwDateUtils.js`,
Layer-1-Grenzen, Plugin-/Tooltip-/Layout-Kontext oder Datenfluss zwischen Layern berührt wird.
**Läuft nach Full-Gate, nicht stattdessen.**

**7 Pflichtfragen vor Code:**
1. Welche Datei ist Single Source of Truth für diese Daten/Logik?
2. Wer konsumiert diese Daten downstream?
3. Welche Transformationen sind laut Spec erlaubt?
4. Wo endet die Zuständigkeit dieser Datei (Layer-Grenze)?
5. Was bricht downstream, wenn sich Format oder Typ ändert?
6. Ist eine Tabu-Datei beteiligt? Status TABU-FREIGABE?
7. Fließen die Daten nur abwärts (Layer 1→2→3→4→5)?

**Output:** `CHAIN-OF-CUSTODY-CHECK: intakt ✓` / `STOP + Grund + kleinste Alternative`

---

### Gruppe F — Skill: `spec-quote` (NEU, nach ChatGPT-Vorlage)

**Datei:** `.claude/skills/spec-quote/SKILL.md`
**Trigger:** Bei Engine-, App-, CSS-, Architektur-Entscheidungen und immer wenn Claude
etwas als technische Tatsache behauptet, das nicht direkt aus einer gelesenen Spec stammt.
**Ziel:** Verhindert, dass Annahmen als Spec-Fakten ausgegeben werden.

**Format (inline, nicht als separater Block nötig):**
```
[Behauptung]
→ Quelle: [Spec-Datei, Abschnitt / Code-Datei, Zeile / ANNAHME — nicht belegt]
→ Status: belegt ✓ / Interpretation / UNBELEGT ⚠
```

**Schlüsselregel:** Wenn nicht belegt → Präfix "UNBELEGT:" zwingend. Nicht als Tatsache ausgeben.

---

### Gruppe G — Command: `start` (UPGRADE)

**Datei:** `.claude/commands/start.md` — bestehende Datei erweitern

**3 neue Elemente:**

**G1 — Layer-1-Fingerabdruck** (nach BLOCKED-Prüfung):
```
Claude bestätigt explizit: "FinanzwesirData.js, CSVParser.js, FwDateUtils.js —
diese Session nicht berühren. ✓"
(Aktives Commitment, nicht nur Regel-Erinnerung)
```

**G2 — Zählprüfung am Session-Start** (nach AP-Liste):
```
"Du hast [N] aktive APs (🟡). Stimmt diese Zahl?"
```

**G3 — Montags-Kassensturz-Trigger** (am Ende von /start):
```
Wenn aktueller Wochentag = Montag:
→ "/kassensturz wird jetzt ausgeführt (Wochentag: Montag)"
→ Kassensturz-Output erscheint direkt nach SESSION-START-Block
```

---

## Implementierungsreihenfolge (innerhalb einer Session)

Diese Reihenfolge verhindert Inkonsistenz (keine Referenzen auf noch nicht existierende Skills):

1. **CLAUDE.md §2 + §3** — Ergänzungen A1, A2 (Basis, alles andere referenziert sie)
2. **Skill: `kassensturz`** — zuerst, weil `start`-Upgrade ihn referenziert
3. **Command: `start` (Upgrade)** — referenziert `kassensturz`
4. **Skill: `patch-quittung`** — referenziert nichts
5. **Skill: `chain-of-custody`** — referenziert nichts
6. **Skill: `spec-quote`** — referenziert nichts
7. **Skill: `abschluss-ritual` (Upgrade)** — Schritt 2b Scope-Check einfügen
8. **Review-Pass** — `/check-mode-gatekeeper` über alle neuen/geänderten Skills

---

## Was sich NICHT ändert

- CLAUDE.md-Gesamtstruktur und -länge (~200 Zeilen) — nur 3 Ergänzungen
- Bestehende Light/Full-Gate-Logik — unveränderter Kern
- Bestehende 13 Skills — nur `start` und `abschluss-ritual` werden erweitert
- Protected-Paths-Hook in settings.local.json — bleibt
- ATTEMPT-LOG.json — Struktur bleibt
- Architektur-Layer-Definitionen

---

## Kritische Dateien

| Datei | Änderung | Risiko |
|-------|----------|--------|
| `.claude/CLAUDE.md` | 2 Ergänzungen (A1, A2) | Gering — additive Änderungen |
| `.claude/commands/start.md` | Upgrade (G1, G2, G3) | Gering — bestehende Sequenz bleibt |
| `.claude/skills/abschluss-ritual/SKILL.md` | Schritt 2b einfügen | Gering — additiv |
| `.claude/skills/kassensturz/SKILL.md` | Neu | Keins |
| `.claude/skills/patch-quittung/SKILL.md` | Neu | Keins |
| `.claude/skills/chain-of-custody/SKILL.md` | Neu | Keins |
| `.claude/skills/spec-quote/SKILL.md` | Neu | Keins |

---

## Verifikation nach Implementierung

**Automatisch überprüfbar:**
1. `/start` ausführen → SESSION-START erscheint mit Layer-1-Fingerabdruck und Zählprüfung
2. Wenn Montag: Kassensturz erscheint direkt danach
3. Einen Test-Patch machen → Patch-Quittung erscheint automatisch
4. AP abschließen → abschluss-ritual läuft, Scope-Check (Schritt 2b) erscheint

**Manuell überprüfen (Pilot-Session):**
5. An einem fwContext-nahen AP arbeiten → chain-of-custody-Fragen erscheinen nach Full-Gate
6. Eine technische Behauptung machen → spec-quote-Marking erscheint inline
7. Aufgabe mit >2 Dateien starten → Aufgaben-Echo erscheint vor Code

**Gate:**
- Nach Implementierung läuft `/check-mode-gatekeeper` über alle neuen SKILL.md-Dateien
- Dann eine dedizierte Pilot-Session, die alle Trigger einmal bewusst durchläuft
- Erst danach gilt das System als produktiv
