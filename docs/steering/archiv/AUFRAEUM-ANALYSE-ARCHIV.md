# Aufräum-Analyse: Finanzwesir 2.0

Stand: 2026-05-02 00:00 | Aktive Phase: 10 | Geändert von: Claude (2026-05-02: Archiv-Split + Pfad-Update)

\*\*SESSION-KONTEXT FÜR CLAUDE\*\*
Diese Datei: offene Jobs + aktueller Context. Nur diese Datei einlesen.
Erledigte Phasen (0–9) → `Archiv/Aufraeum-Archiv.md` (nicht automatisch laden, nur bei Bedarf).


## Datei-Changelog


- 2026-05-02: `Aufraeum-Archiv.md` aus dieser Datei ausgelagert (Phasen 0–9 dorthin verschoben).
- 2026-05-02: `Aufraeum-Archiv.md` nach `Archiv/Aufraeum-Archiv.md` verschoben (kein Unterordner — liegt direkt in `Archiv/` wie `Start-Prompt Gemini.md`). Alle Pfadverweise in dieser Datei aktualisiert.



\---

## 

## Ziel-Toplevel-Struktur (nach Aufräumen)

```
Finanzwesir 2.0/
├── Aufraeum-Analyse.md              ← diese Datei
├── Archiv/                          ← alles Historische, Inaktive
│   ├── Apps/                        ← archivierte App-Iterationen + Ideen-Docs
│   │   ├── Regulatorik I/
│   │   ├── Regulatorik II/
│   │   ├── Ideen für Apps/
│   │   └── ChatGPT - neuer Ansatz/
│   ├── Chart-Engine-Historie/       ← Entstehungsgeschichte Chart Engine
│   ├── Design/                      ← LLM-Evaluierungen Design-Matrix
│   ├── Historische Excel-Kalkulationen/
│   ├── Seminar - die Basis/
│   └── Rechtliches/
├── Active Campaign Liste/           ← Standby, kein Git, Mailgun-Trigger
├── Apps/                            ← STUFE 1: App-Backlog (21 Konzept-Ordner)
├── content/                         ← versionierter Content (Git), kein Ghost-Admin
│   ├── pages/                       ← Über mich, Manifest, Neu hier, Ich bin bullish
│   └── legal/                       ← Impressum, Datenschutz
├── Datenquellen für Apps/           ← CSV- und JSON-Daten für Apps
├── Inhalte alte Site/               ← Textsteinbruch
├── Rechtliche Seiten/               ← CLICKY + KOCHREZEPT (Querschnittsdateien, Heimat noch offen)
└── Theme/                           ← STUFE 2+3: Dev (Theme/apps/) + Prod (Theme/assets/js/apps/)
    ├── homepage/                    ← Homepage-Mockup + Freigabe.md (aktiv)
    ├── apps/                        ← STUFE 2: Dev-HTML-Dateien
    └── assets/js/apps/              ← STUFE 3: Produktions-JS für Ghost-ZIP
```

### 3-Stufen-Pipeline für Apps

```
STUFE 1 — Backlog   /Apps/\\\[app-name]/                    Konzept, Mockup, Spec
STUFE 2 — Dev       /Theme/apps/\\\[name].html              Dev mit Design-System, Live Server
STUFE 3 — Prod      /Theme/assets/js/apps/\\\[name].js      Ghost-ZIP
```

### ⚠ Offene technische Aufgabe: Pfade in Dev-Dateien prüfen

Nach der Umstrukturierung (Apps/ von tief in Vermächtnis auf Top-Level gezogen) können relative Pfade in bestehenden Dev-HTML-Dateien unter `Theme/apps/` gebrochen sein. **Beim ersten Entwicklungsstart einer App prüfen und korrigieren.**

Nach dem Merge existiert zusätzlich (außerhalb Nextcloud):
`finanzwesir-2.0/` ← das Git-Repo (Theme + Basis zusammen)

\---

## Analyse-Status aller Ordner

|#|Name (aktuell)|Status|Aktion|Notizen|
|-|-|-|-|-|
|1|Rechtliches|✅|~~→ `Archiv/Rechtliches/`~~ Verschoben (2026-05-01)|DSGVO-Dok des Mailanbieters. Inaktiv.|
|2|Inhalte alte Site|🔶|Behalten, Unterordner bereinigen|Steinbruch für FW 2.0. `\\\_kontaktformular/` gelöscht.|
|3|Theme|🔶|Aufräumen + merge-bereit machen|Herzstück. Git, Claude-Skills, Ghost-Theme, Chart Engine. Design-Assets noch offen.|
|4|Seminar - die Basis|✅|Verschoben (2026-05-01)|Live-Seminar-Doku. Nachschlagewerk.|
|5|Berechnungen|✅|Verschoben + umbenannt (2026-05-01)|Frühe Excel-Modelle. Abgelöst durch KI.|
|6|Active Campaign Liste|✅|Standby — toplevel behalten, kein Git|E-Mail-Listen, sensible Daten → niemals versionieren.|
|7|~~Finanzwesir Vermächtnis~~ → ~~Basis~~|✅|Vollständig aufgelöst (2026-05-01)|Alle Unterordner + Root-Dateien abgearbeitet. `Basis/` selbst gelöscht.|
|8|Design|✅|Erledigt (2026-05-01)|15 SVGs identisch in Theme → gelöscht. 3 Dateien → `Archiv/Design/`. Ordner entfernt.|
|—|Datenquellen für Apps|✅|Angelegt (2026-05-01)|Leerer Platzhalter. Struktur wird konkret bei erster App.|
|—|*(neu)* Apps/|✅|Angelegt (2026-05-01)|21 App-Backlog-Ordner. STUFE 1 der Pipeline.|
|—|*(neu)* content/|✅|Angelegt (2026-05-01)|Versionierter Content für Git.|
|—|*(neu)* Rechtliche Seiten/|🔶|Top-Level (2026-05-01)|CLICKY + KOCHREZEPT — Heimat noch offen. Nicht verschieben ohne Entscheidung.|

\---

## ⚠ Wichtige Querschnittsdateien (noch ohne feste Heimat)

|Datei|Aktueller Ort|Berührt|Offene Aufgaben|
|-|-|-|-|
|`CLICKY\\\_ANONYMISIERT\\\_KOMPAKT.md`|`Rechtliche Seiten/`|Theme-Bau, Datenschutz|Im Ghost-Theme: Felder für Clicky-Tracking vorsehen|
|`KOCHREZEPT\\\_RECHTLICHE\\\_SEITEN.md`|`Rechtliche Seiten/`|Theme-Bau, Content-Workflow|Im Ghost-Theme: VG Wort Pixel-Felder vorsehen; Workflow dokumentieren|

**Konkrete offene Tasks:**

* \[ ] **Theme:** VG Wort Pixel-Einbindung als Pflichtfeld im Ghost-Template vorsehen (pro Artikel)
* \[ ] **Theme:** Clicky Analytics einbinden (datenschutzkonform / anonymisiert)
* \[ ] **Content-Workflow:** VG Wort Anmeldung + Pixel-Workflow für jeden neuen Artikel dokumentieren
* \[ ] **Merge-Phase: `Basis/Prompts/` → `.claude/`** — Die 5 verbleibenden Dateien (\~80% aktuell). **Nicht unbesehen rüberschieben** — jeden Prompt einzeln prüfen.

\---

## Offene Entscheidungen

|Entscheidung|Optionen|Empfehlung|
|-|-|-|
|Repo-Ort|Nextcloud vs. außerhalb|**Außerhalb (Option B)** — Git + Nextcloud = Sync-Konflikte|
|1 Repo oder mehrere|Monorepo vs. getrennt|**Monorepo**|
|`content/blog/` in Git?|Ja (Entwürfe) vs. Nein (nur Ghost)|Offen — Ghost entscheidet|
|`design-system/` als eigener Ordner|Ja (Fundament) vs. unter `theme/`|**Ja, eigener Ordner**|
|Nextcloud-Sync nach Merge|Nur Archiv + Nicht-Repo-Ordner|Noch zu klären|

\---

## Offene Aktionspunkte (Phase 3 + 4)

### Phase 3 — Merge vorbereiten (teilweise offen)

* \[ ] **Item 15:** Git-Repo-Ort entscheiden (innerhalb oder außerhalb Nextcloud)
* \[ ] **Item 16:** `git init` im Zielverzeichnis
* \[ ] **Item 19:** Vermächtnis-Inhalte überführen — **noch offen**

### Phase 4 — KI-Konfiguration finalisieren

* \[ ] **Item 22:** `theme/CLAUDE.md` schreiben
* \[ ] **Item 23:** `apps/CLAUDE.md` schreiben
* \[ ] **Item 24:** Duktus-Analyse: Blog-Texte aus `Inhalte alte Site/blog/` lesen → Stilvorlage
* \[ ] **Item 25:** Skill `style-finanzwesir-duktus` aus Analyse erstellen

### Theme — Noch offene Aufräum-Maßnahmen

**7. Design-Assets konsolidieren** ⚠ Offen

Quer durch `Theme/` verteilen sich Design/CSS/Optik-Dateien:

|Pfad|Inhalt|Status|
|-|-|-|
|`Theme/assets/fonts/`|13 WOFF2 + `styles.css` + `stylesheet.css`|⚠ 2 Font-CSS — welche ist aktiv?|
|`Theme/docs/design-system/spec/`|7 MD-Dateien|Aktuell? Noch in Sync mit `screen.css`?|
|`Theme/docs/design-system/referenz/`|7 HTML-Demos|Aktuell oder veraltet?|
|`Theme/docs/design-system/templates/`|`master-template.html` + SVG-Duplikate|⚠ Duplikate, Tippfehler|

Offene Detailaufgaben:

* \[ ] SVG-Duplikate: `assets/images/` (canonical) vs. `docs/design-system/templates/assets/` → Templates-Kopien bereinigen
* \[ ] Font-CSS-Dopplung: `fonts/styles.css` vs. `fonts/stylesheet.css` — welche wird geladen?
* \[ ] `docs/design-system/referenz/` HTML-Demos — aktuell oder veraltet?
* \[ ] `docs/design-system/spec/` — noch in Sync mit `screen.css`?

\---

## Übergabe-Hinweise für nächste Session / anderes LLM

**Abgeschlossen:** Phasen 0–9 vollständig (Details in `Archiv/Aufraeum-Archiv.md`).

**Noch offen:** Phase 3 Item 19 (Vermächtnis-Inhalte), Phase 3 Items 15–16 (Git), Phase 4 Items 22–25. `Basis/Prompts/`-Bereinigung als AP-DOC-1 in `KNOWN-ISSUES.md` erfasst — vor App-Entwicklung fällig.

**Wichtigste Kontextpunkte:**

* Einpersonen-Projekt (Albert Warnecke, Finanzwesir)
* Ghost.io als CMS/Blogsystem
* KI-first: Claude Code ist das primäre Werkzeug — alles wird so strukturiert, dass KI optimal damit arbeiten kann
* Die Chart Engine (`fw-chart-engine`) ist der technisch komplexeste Teil — sie lebt aktuell in `Theme/assets/js/` und muss herausgelöst werden
* Niemals `Active Campaign Liste/` in Git committen
* `.claude/` liegt am Projektroot (nicht mehr in `Theme/`) — wird automatisch geladen

