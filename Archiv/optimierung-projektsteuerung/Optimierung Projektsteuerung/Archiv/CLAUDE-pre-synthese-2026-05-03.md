# Claude Rules – Finanzwesir 2.0

## 0. Communication Style

Siehe Skill `00-style-sei-deutsch` für vollständige Regeln. Kurzfassung:
- Sachorientiert, keine Floskeln oder Höflichkeitsformeln.
- Wahrscheinlichkeiten bei Unsicherheit explizit machen.
- Direkt, Fehler klar benennen.
- Bei komplexen Themen: kurze Executive-Summary am Anfang, keine Abschluss-Zusammenfassung.
- Keine emotionalen oder motivierenden Formulierungen.

---

## 1. Kontext & Ziel

- Projekt: **Finanzwesir 2.0** — gilt für das gesamte Projekt (Theme + Apps + Content)
- Ziel: Bestehenden Code **stabilisieren und vervollständigen**, ohne funktionierende Teile zu zerstören.
- Die Architektur-Spezifikation ist **bindend**.
- Der aktuelle Stabilitätszustand ist in `docs/steering/engine/WORKING-FEATURES.md` beschrieben.
- Bitte vermeide Änderungen, die diese funktionierenden Features ohne Notwendigkeit brechen.

## 2. Architektur-Spezifikation (bindend)

Alle Spezifikationsdateien im Verzeichnis `docs/spec` sind **verbindliche Referenzen**
für die Implementierung der Finanzwesir Chart Engine.

- Projektwurzel: Repository-Root  
- Spez-Pfad: `docs/spec/`

Zur Orientierung sind die wichtigsten Specs in drei Ebenen gruppiert:

### Ebene A – Architektur & Prinzipien

- @docs/spec/ARCHITECTURE STRATEGY PAPER VX.md  
  → Oberste Architektur-Referenz: 5‑Layer-Modell (Vault, Manager, Strategies,
    Curator, Face), Dateimatrix („wer wohnt wo?“), Kern-Design-Entscheidungen
    KDR 1–11 (Client-Side, Monorepo, de-DE, Curated Linear Time,
    Unified Density Matrix, Plugin Context Protocol, Unit Sovereignty).

- @docs/spec/Der Rucksack (Context Object Pattern).md  
  → Definition des `fwContext` als Request-Scoped, immutable Context:
    statischer Kern (chartType, axisType, rhythm, dataRange, viewMode,
    valueMode, currency, ggf. referenceDate) plus dynamische Schale
    (z.B. isMobile). Beschreibt Datenfluss (Strategie → fwContext →
    SmartScales/SmartTooltips) und Pflichtfelder vs. Fallbacks.

### Ebene B – Fach-Spezifikationen (X/Y-Achse, Tooltips, Layout)

**X-Achse / Zeit & Datendichte**

- @docs/spec/Charts Ticks und Label_v14.md
  → „The Magnetic Grid”: Pixel-Budget-Formel für SNAPSHOT-Track
    (Tick-Platzierung = Zeitspanne × Zone, Daten-Rhythmus irrelevant),
    Unified Density Matrix für PERIOD-Track (Unit, Step, Label-Format
    je Dauer und Zone S/M/L), Noon-Protokoll (12:00‑Anchor),
    Rhythmus-Erkennung nur für Snap/Tooltip (nicht Tick-Platzierung),
    Waterfall-Matrix, Pixel-Budget als Formel-Grundlage,
    Anchor-/Layout-Regeln (Start-/End-Label, Padding, No-Rotation).

- Bändigung X-Achse & Datendichte  
  (`Dokumentation Die Baendigung der X-Achse - Datendichte.md`,  
  `Dokumentation Die Baendigung der X-Achse I–III.md`)  
  → Geometrie & Datendichte der X‑Achse: Viewport-Clipping, 4K-Displays,
    Ghost-Ticks, Rhythmus-Stabilität, Achsen-Expansion im ms‑Raum,
    Messung der Balkenbreite, Edge-Case-Handling (Einzelpunkt, Zeitlücken).

**Y-Achse**

- @docs/spec/Y-Achse Sezifikationen 2.0.md  
  → „Vertical Authority“: Y‑Achsen-Matrix mit Nice-Number-Quantisierung
    (1–2–5‑Regel), Screen-Zonen S/M/L, symmetrischem Grace-Buffer,
    dynamischem Rescaling via `afterDataLimits`, Baseline-Regeln
    für Bar-Charts (Balken starten immer bei 0), magnetischer Null
    für Line-Charts, Verbot von statischem min/max und `userMin/userMax` auf Y.

**Tooltips / Info-Systeme**

- @docs/spec/Tooltips_v2-0-0.md  
  → „Information Systems & Interaction“: Vertrag im `fwContext`
    (`infoSystem`, `tooltipLayout`, chartType, rhythm, viewMode,
    valueMode, currency, dateSemantics), Service-Matrix für Line/Bar/Pie,
    deterministische Format-Matrix für Tooltip-Header (Rhythmus × Zone),
    Gatekeeper in `FwSmartTooltips`, Smart Redundancy
    (Pill-Sensitivität, No-Doublette), Anforderungen an `_originalDate`
    und semantisches X-Mapping.

**Responsive Layout / Typografie**

- @docs/spec/Mobile versus Desktop.md  
  → Wahrheitstabelle für Schriftgrößen und visuelle Hierarchie in den Zonen
    S/M/L (Achsen, Tooltips, Legenden, Buttons, Titel). Grundlage für
    `FwLayoutRules` und CSS im `FwRenderer`.

### Ebene C – Integration & QA (HTML/CSV, Audit)

**HTML/CSV-Interface**

- @docs/spec/REDAKTEURS-HANDBUCH Chart-Integration.md
  → **Redakteurs-Perspektive Chart-Engine:** CSV-Regeln (Semikolon,
    Komma-Dezimal, ISO-Datum, Strip & Tag), HTML-Snippet mit allen
    5 Attributen, Options-Whitelist je Chart-Typ, CI-Farbpalette,
    Copy-Paste-Vorlagen, Fehlertabelle.
    Sicherheitsregel: CSV-URLs nur von `www.finanzwesir.com`.

- @docs/spec/REDAKTEURS-HANDBUCH Redaktionsleitfaden.md
  → **Redaktionelle Regeln (aktuell):** URL-Strategie (flach,
    Slug-Regeln), FAQ-Block (4–6 Fragen, GEO-Begründung),
    Content-Struktur (H1/H2, Tabellen, Quellenlinks), Autoren-Bio,
    About-Seite, Impressum & Datenschutz (DSGVO, Clicky),
    dateModified-Pflege, VG-Wort-Nachmeldung, Veröffentlichungs-Checkliste.

- @docs/spec/TECH-SPEC Theme-Integration Chart-Engine.md
  → **Entwickler-Perspektive (aktuell):** Datei-Inventar (15 Engine-
    Dateien mit Layer-Zuordnung), Script-Einbindung in Ghost-Templates,
    CSS-Anforderungen (fw-Präfix, Container Queries), Font-Requirements,
    CSV-Hosting-Workflow, Initialisierungs-Ablauf, Responsive-Zonen,
    Checkliste für Theme-Bau.

- @docs/spec/Beschreibung HTML-Karten f r Charts_v3.md
  → Historische Ursprungs-Spec (abgelöst). Bekannte Abweichungen
    zum Code im Dokument vermerkt.

- @docs/spec/TECH_SPEC_V1 ARCHITECTURE STRATEGY PAPER V - Beschreibung HTML-Karten f r Charts.md
  → Veraltet (abgelöst). Älteste Version der HTML-Spec.

**QA-Tools**

- @docs/spec/ChartEngine X-Axis sauber extrahieren aus Chart.md  
  → X-Axis Visual Audit Protocol (VAP): QA-/Debug-Anleitung zur
    visuellen Inventur von X‑Achsen-Labels (strikte Einzel-Transkription,
    keine Aggregation, explizite Redundanz-Dokumentation) zur Diagnose
    von Tick-, Snapping- und Label-Fehlern.

**Regel:**

- Wenn Code und eine Datei in `docs/spec/` widersprüchlich sind,
  gilt **immer** die Spezifikation.  
- Pro Aufgabe nur die jeweils relevanten Specs nutzen
  (z.B. X‑Achse, Y‑Achse, Tooltips, HTML) und im Prompt explizit
  referenzieren, z.B. `@docs/spec/Charts Ticks und Label_v13.md`.


---

## 3. Tech-Stack & Stil

- Sprache: JavaScript / TypeScript (je nach Datei)
- Umgebung: 100 % Client-Side (Browser), Ghost CMS als „dummes“ CMS
- Charts: Chart.js + eigene Layer (Vault, Strategien, Curator, Renderer)

**Code-Stil:**

- Nur `const`/`let`, kein `var` (neuer Code nutzt ES6-Blockscope, bestehende `var`-Stellen werden nur bewusst und schrittweise geändert)
- 2 Spaces Indent
- Bevorzugt kleine, klar fokussierte Funktionen
- Keine neuen Frameworks oder Libraries einführen, außer ausdrücklich angefordert

**CSS-Konventionen (bindend):**

- Vollständige Konventionen: `docs/steering/design/CSS-KONVENTIONEN.md`
- Eine Datei: `assets/css/screen.css`, 7 Abschnitte, Reihenfolge bindend
- Hex-Werte NUR in Abschnitt 1 (TOKENS)
- `fw-*` Klassen NIE in screen.css definieren oder überschreiben
- `contain: layout` NIE auf `.financial-chart-module`
- Keine externen Font-Quellen
- Neue Komponente? Drei-Fragen-Ritual (siehe Konventionen-Datei)

---

## 4. Architektur-Geländer

Halte dich an die Layer, wie in den Spezifikationen beschrieben:

- **Layer 1 – The Vault (Daten & Ingestion)**
  - Dateien: `FinanzwesirData.js`, `CSVParser.js`
  - Aufgabe: Rohdaten lesen, Einheiten erkennen, unveränderlich speichern.
  - Status: **stabil**, nur ändern, wenn ausdrücklich nötig und gut begründet.

- **Layer 2 – The Manager (State & Orchestration)**
  - Datei: `ChartEngine.js`
  - Aufgabe: State Management, Interaktionen, Render-Zyklus steuern.
  - Keine direkte Darstellung, keine Datenmutation.

- **Layer 3 – The Brains (Strategien)**
  - Dateien: `BaseChartStrategy.js`, `LineChartStrategy.js`,
    `BarChartStrategy.js`, `PieChartStrategy.js`, `FwChartPlugins.js`, etc.
  - Aufgabe: Neutrale Daten in Chart-Konfiguration + `fwContext` transformieren.
  - Darf keine Daten zurück in Layer 1 schreiben.

- **Layer 4 – The Curator (Mathematik & Analyse)**
  - Dateien: `FwSmartScales.js`, `FwDateUtils.js`
  - Aufgabe: Achsen, Ticks, Zeit-Rhythmus, Dichte (Unified Density Matrix).
  - `FwDateUtils` ist Single Source of Truth für Zeit-Intelligenz.

- **Layer 5 – The Face (UI & Design)**
  - Dateien: `FwRenderer.js`, `FwLayoutRules.js`,
    `FwFormatUtils.js`, `FwTheme.js`
  - Aufgabe: HTML/Canvas-Output, Textformatierung, Farben, Layout.

**Wichtige Prinzipien:**

- Keine Logik unkontrolliert zwischen Layern verschieben.
- `fwContext` ist die **Single Source of Truth** für Plugins, Tooltips, Layout-Regeln.
- Architekturprinzipien (KDR 1–14) sind einzuhalten.

---

## 5. Tabu- und Vorsichtsbereiche

**Nicht ohne explizite Anweisung ändern:**

- Layer 1: `FinanzwesirData.js`, `CSVParser.js`
- Grundstruktur von `fwContext`
- Zentrale Zeit-Erkennung in `FwDateUtils.js`
- Kein Backend ohne explizite Architekturentscheidung (→ `docs/steering/DECISION-LOG.md`)

Wenn ein Bug-Fix Änderungen in diesen Bereichen erfordert:

- Zuerst in Worten erklären, warum das nötig ist.
- Rückfrage formulieren, statt den Code einfach umzubauen.

---

## 6. Arbeitsweise mit Claude

### Session-Start (Pflicht vor jeder Aufgabe)

Bevor Claude eine Aufgabe beginnt:

1. `PROJECT-STATUS.md` lesen — Fokus, Blocker, Stand.
2. `NAVIGATION.md` lesen — Routing: Welche Steering-Dateien sind relevant?
3. `docs/steering/BACKLOG.md` lesen — alle offenen Aufgaben nach Priorität sortiert.
4. `.claude/ATTEMPT-LOG.json` lesen — Einträge mit `attempts >= 2` oder `"status": "BLOCKED"` → sofortiger Abbruch-Trigger. Kein weiterer Fix-Versuch ohne Alberts explizite Freigabe.
5. Bestätigen: „PROJECT-STATUS.md ✓, NAVIGATION.md ✓, BACKLOG ✓, ATTEMPT-LOG ✓. Aufgabe liegt in Bereich [X], Routing: [Y]."

Wenn diese Schritte nicht abgeschlossen sind:
> „Stopp. Ich habe PROJECT-STATUS.md, NAVIGATION.md, BACKLOG.md und ATTEMPT-LOG.json noch nicht gelesen. Ich lese jetzt. Dann starten wir."

### Neue Aufgabe aufnehmen (Pflicht-Protokoll)

Wenn Albert sagt „neue Aufgabe" oder sinngemäß → Claude fragt ab (nicht Albert):

1. Bereich? (Engine / CSS / Design / Theme / Cleanup)
2. Problem in 1 Satz?
3. Priorität? (H = launch-blockierend / M = wichtig / L = nice-to-have)
4. Abhängigkeiten? (welche IDs müssen vorher ✅ sein, oder „keine")
5. Detail-Datei nötig? (komplexe Code-Spec → ja; einfache Task → nein)

Dann:
- Nächste freie ID im Bereich vergeben (AP-N, CSS-N, DS-N, TH-N, CL-N, APP-N)
- Zeile in `docs/steering/BACKLOG.md` in den richtigen Abschnitt einsortieren
- Bei Detail-Datei: in `docs/steering/engine/detail/` oder `docs/steering/design/detail/` anlegen

### Explorations-Modus & Zerlegungs-Protokoll

**Explorations-Modus** (z.B. neue App planen, Konzept entwickeln):
- Claude denkt mit, strukturiert Gedanken, stellt Fragen — aber schreibt NICHTS in BACKLOG.md.
- Die Konversation ist das Whiteboard, solange die Planung noch iterativ ist.

**Trigger für Zerlegungs-Protokoll:** Albert sagt „Jetzt zerlegen" oder sinngemäß.

Dann führt Claude das Zerlegungs-Protokoll durch:
1. Konversation nach allen identifizierten Aufgaben durchgehen
2. Pro Aufgabe prüfen: unabhängig testbar? → eigener BACKLOG-Eintrag; sonst Detail-Datei
3. Für jeden Eintrag: Domain, Titel (Verb + Objekt, max. 8 Wörter), Prio, Dep
4. **Preview im Chat zeigen** — Claude schreibt NICHT direkt in BACKLOG.md
5. Albert reviewed: streicht, korrigiert, genehmigt
6. Claude schreibt nach Alberts „OK" in BACKLOG.md

**Qualitätsleitplanken (struktureller Zwang):**
- Titelformat: `[Verb] [Objekt]` — max. 8 Wörter (kein Prosa-Titel)
- Prio-Definition ist bindend: H/M/L laut Session-Start-Schritt 3
- Jede neue App bekommt eigenes ID-Präfix (APP-N), um Konflikte zu vermeiden

---

Bitte arbeite immer nach diesem Muster:

1. **Scope definieren**  
   - Ziel in 1–2 Sätzen  
   - Relevante Dateien (z.B. `FwLayoutRules.js`, `FwSmartScales.js`)  
   - Wichtige Constraints (z.B. „Layer 1 unverändert“, „Specs in docs/spec/ bindend“)

2. **Problem & Hypothese**  
   - Problem kurz in eigenen Worten beschreiben  
   - Vermutete Ursache nennen (Layer, Datei, Funktion)

3. **Plan vor Code**  
   - Einen Plan mit 3–5 Punkten formulieren  
   - Erst danach konkreten Code vorschlagen

4. **Code-Änderungen klein halten**  
   - Patches klar abgrenzen (z.B. mit Kommentaren `// CHANGED` / `// NEW`)  
   - Kein großflächiges Refactoring, solange nicht ausdrücklich angefordert

5. **Test & Nebenwirkungen erklären**  
   - Beschreiben, wie der Fix manuell getestet werden kann  
   - Mögliche Nebenwirkungen benennen
   - Bei CSV-Fällen den betroffenen Chart+CSV als spezifischen Testfall behandeln

Falls eine notwendige Änderung gegen Tabu- oder Vorsichtsbereiche verstößt
(z.B. Layer 1, zentrale Zeit-Erkennung, fwContext-Struktur), zuerst in Text
begründen und als Vorschlag markieren, nicht einfach umbauen.

6. **Rewrite-Schutz für Specs und Dokumentation**
   - Bei Spec-Rewrites: Nur gezielte Edits, kein ganzes Datei-Rewrite.
   - Wenn ein ganzer Abschnitt ersetzt wird: Dem User den Diff zeigen
     (was wurde entfernt, was hinzugefügt, warum).
   - Hintergrund: Beim Übergang von Architecture Paper V1.4 auf V2.0 gingen
     vier Architektur-Prinzipien (A11y, Security, dispose, Sandbox) verloren,
     weil die Neufassung nicht gegen die Vorfassung abgeglichen wurde.
     Diese Regel verhindert, dass das erneut passiert.

### Pre-Code-Gate

Vor jeder Codeänderung muss Claude explizit beantworten:

1. Welche bestehende Funktion darf nicht brechen?
2. Welche Spec-Regel ist bindend?
3. Welche Datei ist Single Source of Truth?
4. Welche Dateien oder Layer sind tabu oder nur mit Begründung änderbar?
5. Was ist die kleinste sichere Änderung?
6. Wie wird Erfolg getestet?
7. Wie wird Regression ausgeschlossen?

Kein Code vor abgeschlossenem Pre-Code-Gate.

**Pflicht:** Claude schreibt die 7 Antworten in den Chat — nicht intern. Albert sieht das Gate, bevor Code erscheint.

- **Single-File** (1 Datei, kein Tabu-Bereich): Gate zeigen, dann weiter.
- **Multi-File oder Tabu-Bereich** (≥2 Dateien oder Layer 1 / fwContext / FwDateUtils): Gate zeigen — warten auf Alberts „OK".

Wenn eine dieser Fragen nicht beantwortet werden kann, muss Claude zuerst die relevanten Dateien lesen oder eine Rückfrage stellen.

### Abbruchkriterien

Claude darf nicht endlos weiterpatchen.

Die Arbeit muss gestoppt und neu geplant werden, wenn eines der folgenden Kriterien erfüllt ist:

1. Zwei Fixversuche haben das Problem nicht gelöst.
2. Ein Fix erzeugt eine Regression.
3. Die Ursache ist nach Analyse nicht klar.
4. Die Änderung würde eine Tabu-Zone betreffen.
5. Die Änderung würde mehr als drei zentrale Dateien berühren.
6. Die Spec widerspricht dem geplanten Fix.
7. Der Scope wächst über die ursprüngliche Aufgabe hinaus.
8. Der manuelle Test ist nicht eindeutig.

Dann muss Claude:
- den aktuellen Stand zusammenfassen
- die vermutete Ursache neu formulieren
- Optionen mit Risiko bewerten
- Albert um Architektur- oder Scope-Entscheidung bitten

**Abbruch-Zähler schreiben (Pflicht nach jedem gescheiterten Versuch):**

Nach jedem Fix-Versuch, der das Problem nicht löst, sofort in `.claude/ATTEMPT-LOG.json` schreiben:

```json
"issue-kurz-beschreibung": {
  "attempts": 1,
  "description": "Was versucht wurde",
  "last_session": "YYYY-MM-DD",
  "status": "ACTIVE",
  "files_touched": ["Datei.js"],
  "last_hypothesis": "Vermutete Ursache"
}
```

Bei `attempts >= 2`: `"status": "BLOCKED"` setzen. Nächste Session erkennt das beim Session-Start und triggert sofort Abbruch-Protokoll.

### Regelaufnahme-Schutz

Neue dauerhafte Regeln dürfen nur in `CLAUDE.md` aufgenommen werden, wenn alle Bedingungen erfüllt sind:

1. Der zugrunde liegende Fehler ist real passiert oder ein konkretes Risiko wurde identifiziert.
2. Die Ursache ist verstanden.
3. Die Regel verhindert eine Wiederholung.
4. Die Regel ist universell genug für zukünftige Sessions.
5. Die Regel ist verhaltenssteuernd, nicht nur informativ.
6. Die Regel widerspricht keiner bestehenden Spec.
7. Albert bestätigt die Aufnahme, sofern es keine reine Pfad- oder Ritualpflege ist.

Keine Einzel-Session-Regeln in `CLAUDE.md`.
Keine temporären Workarounds in `CLAUDE.md`.
Keine Regeln, die nur ein einzelnes Issue betreffen.

### Ablage-Regel: Wissen vs. Verhalten

Vor jedem Eintrag: „Welche Ebene?" — dann ablegen.

| Information | Ablageort | Beispiel |
| ----------- | --------- | -------- |
| Verhaltensregeln, Rituale, Pflichtschritte | `CLAUDE.md` | Pre-Code-Gate |
| Architekturentscheidungen + Begründungen | `docs/spec/` oder `SYSTEM-DESIGN.md` | Layer-Definitionen, D-09 |
| Projektzustand, offene Issues, Backlog | `docs/steering/` | KNOWN-ISSUES.md |
| Historisches, abgelöste Entscheidungen | `docs/steering/archiv/` | alte Specs |
| Projekt-Fakten, Kontext für neue Sessions | `MEMORY.md` | Einpersonen-Projekt |

Verhaltensinstruktionen gehören nie in MEMORY.md — MEMORY.md informiert, CLAUDE.md steuert.

### Protected Paths

Vor Dateioperationen muss Claude `.claude/PROTECTED_PATHS.json` beachten.

- `forbidden`: nicht lesen, ändern, verschieben oder löschen, außer Albert verlangt es ausdrücklich.
- `protected`: nur mit expliziter Begründung, Pre-Code-Gate und Albert-Freigabe ändern.

### App-Arbeit (Pflicht-Routing)

Bei jeder Anfrage, die `Apps/` betrifft (bauen, ändern, reviewen):

> „Stopp. Vor App-Arbeit lese ich `docs/spec/APP-INTERFACE.md` und `docs/steering/audits/SECURITY-BASELINE.md`. Ich lese jetzt."

Claude liest beide Dateien, bestätigt das Lesen explizit — dann Pre-Code-Gate, dann Code.

### Stand-Datum beim Edit (Sofortpflicht)

Bei jeder Änderung an einer `docs/steering/`-Datei — sofort, nicht erst im Ritual:
Erste Zeile der Datei aktualisieren:

```text
Stand: YYYY-MM-DD HH:MM | Session: [Name] | Geändert von: Claude
```

---

## 7. Abschluss-Ritual (Pflicht nach jedem Code-Run)

Trigger: Albert sagt "fertig, finale Phase" oder sinngemäß.

**Mini vs. Voll:** Mini-Abschluss (nur Stand-Datum + Commit-Message) ist erlaubt für kleine, klar abgegrenzte Änderungen ohne Code- oder Architekturwirkung. Wenn unklar ob Mini oder Voll gilt → Voll.

Claude führt selbständig und vollständig aus:

0. **NAVIGATION.md prüfen** — Hat sich die Verzeichnisstruktur geändert? Neue Steering-, Spec- oder Template-Datei angelegt? Datei verschoben oder umbenannt? → Sofort aktualisieren.
0b. **Definition of Done prüfen** — `docs/steering/DEFINITION-OF-DONE.md` lesen: Sind alle Fertig-Kriterien für diesen Aufgabentyp erfüllt?
0c. **Regression-Matrix** — Nur bei Engine-Änderungen: `docs/steering/engine/REGRESSION-MATRIX.md` — relevante Testfälle manuell prüfen.
1. **Specs aktualisieren** — betroffene Dateien in `docs/spec/`
2. **BACKLOG.md** — abgeschlossene Zeile als ✅ nach `docs/steering/BACKLOG-ARCHIV.md` verschieben (append mit Datum + Session), dann aus `BACKLOG.md` löschen. `WORKING-FEATURES.md` nur bei Engine-APs aktualisieren.
3. **MEMORY.md** — `C:\Users\Albert HP PC\.claude\projects\z--Documents-Nextcloud-Finanzwesir-2-0\memory\`
4. **Commit-Message** im Template-Format (siehe unten)
5. **CLAUDE.md** — nur wenn neue fundamentale Regel entstand (universell + verhaltenssteuernd + nicht ableitbar)
6. **PROJECT-STATUS.md** — nach längeren Sessions oder Meilensteinen aktualisieren.

Reihenfolge: Erst Code, dann Doku. Claude prüft proaktiv alle Touchpoints.
Bei jeder berührten Steering-Datei muss die erste Zeile `Stand / Session / Geändert von` aktualisiert werden.

---

## 8. Commit-Message-Template

Format bei "Commit-Message":

```text
Typ: Kurze Zusammenfassung (50–72 Zeichen)

Was war das Problem?
Wie wurde es gelöst?
Warum ist die Lösung sicher (keine Regressionen)?

Betroffene Bereiche:
  Datei (Methode)

Kontext:
  Issue / Spec / Tested
```
