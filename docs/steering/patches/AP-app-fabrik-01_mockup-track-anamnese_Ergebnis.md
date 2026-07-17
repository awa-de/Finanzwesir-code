Stand: 2026-07-17 | Session: AP-app-fabrik-01 | Geändert von: Claude

# AP-app-fabrik-01 — Mockup-Track-Anamnese

Status: **GELB** — Bestand ist für den ersten Vierer-Psychosprint größtenteils tragfähig, aber fünf konkrete Artefakte fehlen und ein Konzeptdokument trägt einen inneren Widerspruch zu seinem eigenen Freigabestatus; kein Punkt zwingt zu einer neuen globalen Architekturentscheidung.

---

## 0. Metadaten

| Feld | Wert |
|---|---|
| Datum | 2026-07-17 |
| Repository | `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0` (Root-Prüfung bestätigt: identisch mit dem im Auftrag genannten `Z:\Documents\Nextcloud\Finanzwesir 2.0`) |
| Branch | master |
| HEAD (vor Anamnese) | `40b36bb8654ac37e4ac0e03c01f79c1c97809eca` — 2026-07-15, „Hook für Claude implementiert mit Toast …" |
| Git-Status vor Arbeit | schmutzig (vorbestehend, nicht angefasst): `M .claude/learning/session-log.md`, `M .claude/skills/00-style-sei-deutsch/SKILL.md`, `M docs/steering/BACKLOG.md`, unstaged neu: `.agents/`, `.codex/`, `AGENTS.md`, `Boomer.html`, `docs/App-Fabrik/APP_FACTORY_STARTLINIE.md`, `docs/steering/patches/PATCH-Boomer-2026-07-16.md`, `docs/steering/patches/PATCH-Boomer-Artikel-Link-2026-07-16.md`, `docs/steering/patches/PATCH-Boomer-Encoding-2026-07-16.md` |
| Git-Status nach Arbeit | siehe Abschnitt 9 / Patch-Quittung — geprüft, nur diese Ergebnisdatei neu |
| Modell | Claude Sonnet 5.0 |
| Werkzeuge | Read, Grep, Glob, Bash (nur `git status`/`git log`/`git rev-parse`, keine Schreiboperation) |
| Scope-Bestätigung | Keine Produktions-, Test-, App-, Theme-, Engine- oder Spec-Datei geändert. Kein Mockup, kein Prompt-Template, keine Modellentscheidung. Einzige neue Datei: dieses Ergebnisprotokoll. |

---

## 1. Executive Befund

Der reale Bestand deckt die Baukasten-Rezeptseite des Mockup-Tracks bereits weitgehend ab (vollständiges Klassenvokabular, kanonisches Testseiten-Template, zwei nicht-interaktive Optik-Referenzen). Was fehlt, ist ausschließlich die Prozess-Werkzeugseite: Psychosprint-Prompt, `mockup.html`-Starter, Jury-Matrix und technische Übergabevorlage existieren nicht. `risiko-uebersetzer` ist nach der vorhandenen Mini-Spec ein plausibler erster Mockup-Kandidat — vollständiger Steuerungsblock, einfachste App-Familie (Calculator), kein Bestandscode, keine Datenpipeline. Ein Konzeptdokument (`TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`) widerspricht sich selbst über seinen Freigabestatus (F-01) — das ist der einzige Fund, der vor dem Psychosprint eine bewusste Klärung statt einer stillen Annahme braucht. Kein Backlog-Punkt und kein Engine-Restpunkt blockiert den Mockup-Track selbst.

---

## 2. Quellenstatuskarte

| Quelle | Rolle laut Eigenaussage | Ist-Bewertung |
|---|---|---|
| `docs/App-Fabrik/APP_FACTORY_STARTLINIE.md` | „Arbeitssteuerung; wird nur nach realem Befund oder bewusster Produktentscheidung geändert." Stand 2026-07-15 | **aktuell verbindliche Reihenfolge**, aber ausdrücklich keine automatische Arbeitsfreigabe pro Punkt — dieser AP ist ihr Punkt 1 |
| `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` | Kopf: „FREIGEGEBEN durch Albert am 2026-07-12 — verbindlicher Design- und Implementierungsvertrag" | **widersprüchlich** — siehe F-01. Einzelentscheidungen (D-01–D-16, DOC-01–DOC-04a) sind real getroffen und im Engine-Programm CE-1–CE-6a bereits umgesetzt; die **Gesamtabnahme des Konzepts** ist laut eigenem §12 Punkt 1 und Fußzeile weiterhin offen |
| `docs/spec/APP-INTERFACE.md` | „Arbeitsfassung für App-Fabrik-Pilot. Bindend für Pilot-1 nach Alberts expliziter Freigabe." Stand 2026-07-13 | **kanonisch bindend** für den Redakteursvertrag (`fw-app`, `data-fw-*`), unabhängig vom Mockup-Track — Mockups selbst sind kein Ghost-Redaktionsartefakt und brauchen diesen Vertrag daher nicht |
| `docs/testing/TEST_PAGE_STANDARD.md` | Normativer Standard (RFC-2119), Version 8, Stand 2026-07-14 | **aktueller Teststandard** — gilt für Apps, nicht für Mockups (Mockups sind explizit noch keine `Apps/{slug}/`-Artefakte) |
| `docs/testing/templates/app.test.template.html` | Kanonisches Template | **aktuell in Verwendung** — bytegleicher Bridge-Block real gegenprüft gegen `Apps/prokrastinations-preis/app.test.html` Zeile 29–83 (identisch) |
| `Apps/prokrastinations-preis/APP_SPEC.md` (V2.9) | „Phase: Implementierung … vollständig" | **aktuelle Ist-Wahrheit** des einzigen fertig gebauten Piloten; bezeichnet sich selbst als **Pilot-2** (§3, E-02-Entscheidung 2026-05-28) |
| `Apps/prokrastinations-preis/app.test.html`, `app.js` | Code-Stand | **real, Tailwind-migriert** (Slices 1–8 + 02a/02b/02f ✅, laut Session-Log 2026-07-13) |
| `Apps/risiko-uebersetzer/MINI_SPEC_FROM_HAUPTDOKUMENT.md` | „Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC" | **historischer Rohentwurf, aber einzige Quelle** — der Ordner enthält sonst nichts (siehe F-03); bezeichnet sich selbst als **Pilot-1** über die spätere APP_SPEC-Referenz von prokrastinations-preis |
| `docs/App-Fabrik/APP_FOLDER_STRUCTURE.md` | Kanonische Dateiliste, Stand 2026-05-10 | aktuell, unstrittig |
| `docs/App-Fabrik/04_CLAUDE_WORKFLOW_DRAFT.md` | „Arbeitsfassung. Bindend für Pilot-1 nach Alberts expliziter Freigabe." Stand 2026-05-10 | **teilweise überholt** — §9 nennt `prokrastinations-preis` „Pilot-1", was der späteren E-02-Umbenennung widerspricht (F-02); der Workflow-Ablauf selbst (Phasen 0–8, Gates) ist unabhängig davon weiterhin die aktuelle Prozessquelle |
| `docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md` | Draft, Stand 2026-06-10, `01_DECISION_LOG.md`-gestützt | **aktuell und mit der Pilot-Umbenennung konsistent** (§4.1/4.2 nennen `risiko-uebersetzer` korrekt Pilot-1, `prokrastinations-preis` Pilot-2) |
| `docs/steering/BACKLOG.md` | Zentrale Steuerung | aktuell (Stand siehe Hook, 2026-07-15) |
| Engine-Merkblatt (`claude_prompt_AP-chart-engine-02_folgearbeiten-merkblatt.md`) | „Gedächtnispuffer, kein Implementierungsauftrag" | aktuell, reine Merkliste, keine Freigabe enthalten |

---

## 3. Wiederverwendbarer Bestand für den Mockup-Track

| Datei/Bestand | Wiederverwendbar für Mockups? | Begründung |
|---|---|---|
| `docs/testing/templates/app.test.template.html` | **Ja, unverändert als Grundgerüst** | Enthält bereits Play-CDN-Tag, wertfreie CI-Theme-Bridge (`@theme inline`), Testseiten-Chrome — genau der technische Unterbau, den auch ein interaktives Happy-Path-Mockup braucht |
| `Theme/assets/css/tokens.css` | **Ja, unverändert** | SSoT für alle CI-Werte, von Bridge und Mockup-HTML gleichermaßen referenziert |
| `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` §6 (Primitive-Verträge) | **Ja, als Rezeptbuch** | Vollständige Literalklassen für Shell, Panel, Card/Stat, Buttons, Slider, Disclosure, Status-States, Chart-Chrome — direkt in Mockup-Markup einsetzbar |
| `TAILWIND-APP-BAUKASTEN_VISUAL-BOARD_V0-1.html`, `_MOCKUPS_V0-1.html` | **Teilweise** | Liefern bereits echte, geprüfte CI-Token-Werte und Primitiv-Optik (Lorem-Ipsum, nicht klickbar). Für „zwei interaktive Happy-Path-Mockups" (Startlinie Punkt 7) müssen sie um echte Interaktion und echten App-Inhalt ergänzt werden — als reine Optik-Referenz aber direkt wiederverwendbar |
| `docs/spec/APP-INTERFACE.md` §3.1 (Ghost-Card-Vertrag) | **Nein, für Mockups nicht relevant** | Mockups sind kein Ghost-Redaktionsartefakt; der Vertrag wird erst in Startlinie Punkt 10 (technische Übergabe) wieder relevant |
| `Apps/prokrastinations-preis/app.js`/`app.css` | **Nein, nicht als generische Basis** | Enthält bewusst app-lokale Zeitreise-Mechanik (siehe Abschnitt 5); als Vorlage für ein neues, andersartiges Mockup ungeeignet, nur als Migrationsbeispiel lesbar |

---

## 4. Trennmatrix: Mockup-Knautschzone vs. technische Fahrgastzelle

| Bereich | Mockup-Knautschzone (frei/verwerfbar) | Technische Fahrgastzelle (bleibt) |
|---|---|---|
| Optik/Layout | Beliebig iterierbar bis zum psychologischen Gate | Baukasten-Primitive/-Rezepte (§6 Konzept) als Vokabular-Grenze |
| Interaktion | Frei gestaltbar für den Happy Path | Kein Backend, Vanilla JS (A-03), kein `innerHTML` mit Fremddaten |
| Daten | Statisch/Mock erlaubt | Ghost-Card-Vertrag (`fw-app`, `data-fw-*`) erst ab technischer Übergabe (Startlinie Punkt 10) bindend |
| Bewertung | Nur das gewonnene Mockup zählt, Rest ist verworfener Entwurf | Jury-Matrix-Kriterien (sobald existent) sind keine Mockup-Erfindung, sondern Vorgabe |
| Ergebnis | Kein Produktionscode | Übergang in APP_SPEC.md nach Vertrag aus `04_CLAUDE_WORKFLOW_DRAFT.md` Phase 2 |

---

## 5. Pilotbefund `prokrastinations-preis`: Primitive, Kompositionen, lokale Mechanik

Aus `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` §9 (Migrationskarte) und §11 (bewusst lokale Ausnahmen):

**Allgemeine Primitive/Kompositionen (Baukasten-Besitz, App-familien-übergreifend nutzbar):**
App-Shell (6.1), Status-States Loading/Empty/Error (6.10), Screen-Flow-Komposition (§7), Card/Stat-KPI (6.3), Slider-Field (6.6), Button-Familie (6.4), Panel + Story-Komposition (6.2/§7, ohne die angedockte Flug-Mechanik), Disclosure (6.8), ARIA-Live-Region/`sr-only` (6.9), Callout/Assumptions (6.7), Chart-Slot-Vertrag D-04 (nur der leere `relative mt-6`-Wrapper).

**Ausdrücklich lokale Mechanik der Zeitreise (app-spezifisch, kein Primitive-Kandidat):**
Card-to-Point-Flug (`--fw-card-to-point-flight-duration`), Rubikon-Overlay inkl. Sonderbreakpoints 480/1024px, `--fw-screen3-reveal-fade-duration`, die Stations-JSON-Pipeline und Rolling-Window-Regel (§8/§9 APP_SPEC), die Anleger-Anker-Texte und das Endwissens-Verbot der Live-Region vor Screen 3 — all das ist fachliche B1-Logik, nicht Baukasten-Material (§11 Konzept nennt genau diese Liste als „bewusst lokale Ausnahmen").

---

## 6. Eignung von `risiko-uebersetzer` als erster Mockup-Kandidat

**Ja, geeignet — mit einer dokumentierten Einschränkung.**

Belege ausschließlich aus Spec und Bestand:
- Vollständiger Steuerungsblock bereits vorhanden (Zweck, zu entfernende Barriere, Zielzustand, Muss-Kriterien, Nicht-Ziele, LLM-Prüfscore) — erfüllt die Phase-2.0-Pflichtprüfung aus `04_CLAUDE_WORKFLOW_DRAFT.md` unmittelbar.
- App-Familie „Calculator" (`03_APP_FACTORY_STANDARD_DRAFT.md` §4.1) — Chartbedarf nur „Mittel", kein Pflicht-Chart-Chrome-Slot, keine externe Datenpipeline nötig laut Mini-Spec selbst („HTML + JS, kein Backend, alle Werte statisch").
- Ordner enthält ausschließlich die Mini-Spec (siehe `ls`-Befund) — kein Bestandscode, der mit dem neuen Baukasten kollidieren könnte, anders als der bereits Tailwind-migrierte, aber feature-schwere Pilot `prokrastinations-preis`.
- Konkrete UX-Bausteine bereits in der Mini-Spec beschrieben (zwei Schieberegler, Ankerliste als Tabelle, Umschalter, Auto-Satz, Microcopy) — genug fachliche Substanz für einen Mini-Spec-Input in den Psychosprint.

**Einschränkung:** Die Mini-Spec ist laut eigenem Statusfeld „Roh-Mini-Spec … noch nicht APP_SPEC". Das ist kein Stop-Grund, weil Startlinie Punkt 1/4 für den Psychosprint ausdrücklich nur „Mini-Spec" verlangt, keine vollständige APP_SPEC — die Einschränkung ist hier nur der Vollständigkeit halber dokumentiert.

---

## 7. Tatsächliche Lücken vor dem Vierer-Psychosprint

| ID | Lücke | Kategorie |
|---|---|---|
| L-01 | Psychosprint-Prompt-Template existiert nicht (Marker-Suche ohne Treffer außerhalb der Startlinie-Erwähnung selbst) | Prompt-/Template-Lücke |
| L-02 | `mockup.html`-Starter-Template existiert nicht; die vorhandenen `_VISUAL-BOARD_`/`_MOCKUPS_`-HTML-Dateien sind nicht-interaktive Optik-Referenzen, kein Grundgerüst für „zwei interaktive Happy-Path-Mockups" | Prompt-/Template-Lücke |
| L-03 | Jury-Matrix für die unabhängige Kritik (Startlinie Punkt 5) existiert nicht | Prompt-/Template-Lücke |
| L-04 | Gesamtabnahme des Tailwind-Baukasten-Konzepts (§12 Punkt 1) steht laut Dokument selbst noch aus — betrifft direkt, mit welchem Rezeptstand der Psychosprint arbeiten darf | Produktentscheidung |
| L-05 | Technische Übergabevorlage (Mockup → schlanke APP_SPEC, Startlinie Punkt 10) existiert nicht | Prompt-/Template-Lücke |

Keine dieser fünf Lücken erfordert eine neue globale Architekturentscheidung — L-04 ist eine Bestätigungsentscheidung zu bereits vorliegendem Material, keine Neuentwicklung.

---

## 8. Blockerkarte: Mockup / technische App / Produktion

**Backlog-Punkte (Aktive APs + relevante Offen-Punkte):**

| ID | Blockiert Mockup-Track? | Kategorie |
|---|---|---|
| AP-20/21, AP-6c, AP-22 | Nein | kein Mockup-Blocker (Canvas-/Snapshot-Fachlogik der Chart-Engine) |
| TESTENV-1-FOLLOWUP-BORDER | Nein | kein Mockup-Blocker (bewusst zurückgestellter CSS-Rest, an T1 gekoppelt) |
| AF-21/AF-22 (P→B→N-Familienstandards) | Nein für den ersten Psychosprint; relevant erst für die technische Übergabe mehrerer Apps | Blocker nur für eine technische Chart-App / Produktionsrest |
| AF-23 (Pincus-Check-Gate) | Nein | Produktionsrest |
| AF-04/AF-05 (Redakteurs-Harmonisierung) | Nein | Produktionsrest |
| T1, CSS-6, CSS-7, TMPL-1, TH-03–06 (Produktionsbuild) | Nein | Produktionsrest (Startlinie Punkt 14: „zuletzt") |

**Restpunkte aus dem Engine-Merkblatt (`AP-chart-engine-02_folgearbeiten-merkblatt.md`), Kategorie nach Befundfrage 8:**

| Restpunkt | Kategorie |
|---|---|
| AP-20/21 Mixed-Rhythm-CV-Heuristik | kein Mockup-Blocker |
| AP-6c Touch-Tooltip-Test | kein Mockup-Blocker |
| AP-22 Zero-Line-`lineWidth` | kein Mockup-Blocker |
| AP-19 `PERIOD_TABLES`-DRY-Refactoring | kein Mockup-Blocker |
| AP-prokrast-08-FOLLOWUP-A (No-op-AnchorMeasurement-Bootstrap) | lokaler Pilotrest |
| AP-23 Chart.js-Version pinnen | Produktionsrest |
| KDR 15 / Chrome-Auftrag (Strategie→Renderer-Durchleitung) | Blocker nur für eine technische Chart-App |
| F-06 Pie-Drill-down-Popover | Produktionsrest |
| Pie-Wrapper/-Titel-Vollmigration | lokaler Pilotrest |
| Andere Donut-Legendenbedeutung | Blocker nur für eine technische Chart-App |
| Rubikon-Nachmessung (DS-FOLLOWUP-07) | lokaler Pilotrest |
| Card-to-Point-Geschwindigkeit (DS-FOLLOWUP-08) | lokaler Pilotrest |

Diese Einordnung ist ausschließlich Zuordnung nach Befundfrage 8, keine Umsetzungsfreigabe und keine neue Priorität.

---

## 9. Findings und Stop-Fälle

**F-01 — Widersprüchlicher Freigabestatus in `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`**
Der Dokumentkopf (Zeile 5) erklärt das gesamte Dokument zum „verbindlichen Design- und Implementierungsvertrag der App-Fabrik … FREIGEGEBEN durch Albert am 2026-07-12". Die Fußzeile (Zeile 545) erklärt dasselbe Dokument zu „ENTWURF, NICHT FREIGEGEBEN" mit noch ausstehender „Abnahme von Konzept + Visual Board" — und genau das wiederholt §12 Punkt 1 als offene Nutzerentscheidung. Real umgesetzt und abgenommen sind einzelne Teilentscheidungen (D-01–D-16 im Rahmen von AP-tailwind-02, DOC-01–DOC-04a im Rahmen der Chart-Chrome-Kette CE-1–CE-6a) — nicht die Gesamtabnahme des Konzeptdokuments als Ganzes. Ein ausführendes LLM, das nur den Kopf liest, könnte das gesamte Konzept fälschlich als vollständig freigegeben behandeln. Nur dokumentiert, nicht korrigiert.

**F-02 — Veraltete Pilot-Nummerierung in `04_CLAUDE_WORKFLOW_DRAFT.md`**
§9 („Pilot-1-Sonderregeln") bezeichnet `prokrastinations-preis` als Pilot-1. Die spätere Entscheidung E-02 (2026-05-28, dokumentiert in `Apps/prokrastinations-preis/APP_SPEC.md` §3) weist Pilot-1 `risiko-uebersetzer` zu und macht `prokrastinations-preis` zu Pilot-2 — konsistent mit `03_APP_FACTORY_STANDARD_DRAFT.md` §4.1/4.2. `04_CLAUDE_WORKFLOW_DRAFT.md` (Stand 2026-05-10) wurde nach der Umbenennung nicht nachgezogen. Nur dokumentiert, nicht korrigiert.

**F-03 — `risiko-uebersetzer`-Ordner enthält nur die Mini-Spec**
Kein APP_SPEC.md, kein Code, keine Testseite, keine Config vorhanden (Ordnerinventur). Für den Mockup-Track ist das kein Blocker (siehe Abschnitt 6), wird hier aber als realer Bestandsbefund festgehalten, damit kein künftiges LLM fälschlich einen weiter fortgeschrittenen Ist-Stand annimmt.

**Kein Stop-Fall ausgelöst:** Keine Pflichtquelle fehlte oder war in ihrer Autorität unklärbar über die dokumentierten Fälle F-01/F-02 hinaus; der Befund war an keiner Stelle nur durch Änderung einer anderen Datei fortsetzbar; `risiko-uebersetzer` besitzt einen belastbaren Steuerungsblock; Mockup- und technische Produktionsarbeit sind in den gelesenen Quellen durchgehend trennbar dokumentiert; keine der fünf Lücken (Abschnitt 7) erfordert eine neue globale Architekturentscheidung.

---

## 10. Abschlussgate und nächster zulässiger Schritt

**Nächster zulässiger Schritt:** Klärung von F-01 (Gesamtabnahme-Status des Tailwind-Baukasten-Konzepts) durch Albert — danach Punkt 2 der Startlinie („Mockup-Vertrag, Klasse C": Schutzgut, Knautschzone, Artefakte, Happy-Path-Grenze, Abnahme, Übergabe verbindlich entscheiden).

**Ausdrücklich nicht der nächste Schritt:** kein Mockup bauen, kein Psychosprint-Prompt schreiben, keine APP_SPEC für `risiko-uebersetzer` erstellen, keine Komponentenbibliothek entwerfen, keine Modellentscheidung treffen.

---

## 11. Evidenzanhang

- Root-Prüfung: `git rev-parse --show-toplevel` → `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`; `git branch --show-current` → `master`; `git log -1` → `40b36bb8654ac37e4ac0e03c01f79c1c97809eca`.
- Ordnerinventur `Apps/risiko-uebersetzer/`: genau eine Datei, `MINI_SPEC_FROM_HAUPTDOKUMENT.md` (5430 Bytes, Stand 2026-06-29).
- Ordnerinventur `Apps/prokrastinations-preis/`: 18 Dateien + 2 Unterordner, inkl. `app.js` (75463 Bytes, Stand 2026-07-13), `app.test.html` (39261 Bytes, Stand 2026-07-14), `APP_SPEC.md` (102861 Bytes, Stand 2026-07-14).
- Bytegleich-Stichprobe: `docs/testing/templates/app.test.template.html` Zeile 19–75 (`@theme inline`-Block) inhaltlich deckungsgleich mit `Apps/prokrastinations-preis/app.test.html` Zeile 29–83 (dieselben 40 Custom-Property-Zeilen, keine Abweichung gefunden).
- Marker-Suche `mockup|Psychosprint|Happy Path|MOCKUP` (case-insensitiv): `docs/App-Fabrik/` → Treffer nur in `APP_FACTORY_STARTLINIE.md` und `01_DECISION_LOG.md` (dort nur Play-CDN-Kontext, keine Psychosprint-Artefakte); `docs/testing/` → keine Treffer; `Apps/` → Treffer nur in `APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` und `regulatorik-dashboard`-Material, keine Mockup-Track-Artefakte; `docs/steering/design/` → Treffer nur in `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` und den zwei vorhandenen `_MOCKUPS_`/`_VISUAL-BOARD_`-HTML-Dateien.
- BACKLOG-Suche `AP-app-fabrik-01|mockup-track` → keine Treffer (dieser AP hat noch keinen Backlog-Eintrag, konsistent mit seiner Rolle als erster Startlinien-Punkt).
