Stand: 2026-07-22 | Session: peer-review-app-fabrik-gm-v6 | Geändert von: Claude (Fable)

# Peer Review V6 — App-Fabrik Golden Master

**Prüfgegenstand:** `docs/steering/audits/ENTWURF_APP_FABRIK_GOLDEN_MASTER_V6.md` (Sol, 2026-07-22)
**Auftrag:** `docs/steering/handovers/HANDOVER_FABLE_APP_FABRIK_GOLDEN_MASTER_V6.md` (ersetzt V1–V5)
**Prüfumfang:** Fabrikfähigkeit (zuverlässig, sicher, schlank, wiederholbar). Keine Mockup-Optik, keine Psychologie, keine Copy, kein Code, kein Browser.

---

## 1. Urteil

**GO MIT AUFLAGEN.**

Der Entwurf ist als V1-Produktionslinie tragfähig: genau ein hashgebundener Golden Master, ein versioniertes Input-Pack, enge Sonnet-APs mit Fall-zu-Fehler-Gates, technische Parität vor menschlicher Abnahme, kein Überbau. Die Quellenarbeit ist präzise — alle stichprobengeprüften Pfad:Zeile-Belege stimmen. Der Intake-Stopp für den Crash-Reaktions-Test (zwei Varianten, beide GELB, keine Abnahme) ist korrekt hergeleitet.

Auflagen: Ein P1-Finding (F-01, Erfassungsmechanismus für Verhaltens-Traces und Paritätsmessung ist nicht benannt) muss vor GMV6-03 aufgelöst werden; drei P2-Findings gehören in das Schema (GMV6-02) bzw. in die §8-Änderungsliste. Kein Finding stellt die Architektur infrage; alle Korrekturen sind lokal.

---

## 2. Quellenrangfolge und überprüfte Annahmen

### 2.1 Angewandte Rangfolge

1. Alberts explizite Entscheidungen (u. a. `SONNET_EINGABEPAKET.md:307-334` E1–E5; `01_DECISION_LOG.md` SEC-04/SEC-05/D-CSS-01–04)
2. Bindende Specs: `APP-INTERFACE.md`, `ARCHITECTURE STRATEGY PAPER VX.md`, `Der Rucksack (Context Object Pattern).md`
3. Freigegebene Verträge: `MOCKUP-VERTRAG.md`, `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`, `SECURITY-BASELINE.md`, `CSS-KONVENTIONEN.md`, `TEST_PAGE_STANDARD.md`, `STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md`, `CSV-/JSON-APP-DATEN-WORKFLOW.md`, `MIGRATIONSSTRATEGIE_GHOST_APPS_V2_CHART_BLAUPAUSE.md`
4. Drafts (nachrangig): `03_APP_FACTORY_STANDARD_DRAFT.md`, `APP_FACTORY_IMPLEMENTATION_RFC.md`
5. Werkstatt: `tests/scratch/crash-reaktions-test/mockup-duell/*` (nur die im Handover benannten Dateien)

### 2.2 Überprüfte Annahmen des Entwurfs (Stichproben, alle bestätigt)

| Entwurfs-Behauptung | Beleg geprüft | Befund |
|---|---|---|
| Mockup-Vertrag verbietet bisher jede Code-/Architekturübernahme | `MOCKUP-VERTRAG.md:69-77` | korrekt; §6 erlaubt nur beobachtetes Verhalten/Gestaltung — die §2.3-Erweiterung ist tatsächlich die kleinste nötige Ergänzung |
| Runtime ausschließlich im Theme, `Apps/{slug}` = Fachakte | `01_DECISION_LOG.md:426-437` (SEC-05); Repo: `Theme/assets/js/apps/index.js` + `prokrastinations-preis.js` existieren | korrekt, umgesetzt |
| Dateiname statt URL in `data-fw-data/config` überschreibt ältere Draft-URLs | `APP-INTERFACE.md:100-112` vs. `03_APP_FACTORY_STANDARD_DRAFT.md:449-510` | korrekt |
| Empty-vs-Error: Taxonomie überschreibt Draft | `APP-INTERFACE.md:286-298` vs. `03_APP_FACTORY_STANDARD_DRAFT.md:825-837` | korrekt, aber unvollständig — siehe F-02 |
| Testseiten-Baumgrafik veraltet | `TEST_PAGE_STANDARD.md:68-95` vs. `:480-493` | korrekt; §12 Punkt 2 bindet die Testpflicht bereits an die Theme-Registry |
| Beide Mockups GELB, keine Golden-Master-Abnahme in den Pflichtquellen | `README.md:40-44`; `SONNET_EINGABEPAKET.md:307-334` | korrekt; E1–E5 sind Produktentscheidungen, keine Abnahme; E4 ist ausdrücklich offen („muss live entschieden werden") — Intake-Stopp ist zwingend richtig |
| Kanonischer Tailwind-Build existiert (Voraussetzung AP-08) | Repo: `package.json` (`css:build`, tailwindcss/@tailwindcss-cli 4.3.3), `Theme/src/css/screen.source.css:22-24` (Tailwind-Imports + barer App-Import), gebaute `Theme/assets/css/screen.css` (v4.3.3, enthält App-Mechanik und `.gh-content …:not(.fw-app *)`-Grenze) | korrekt — T1-Buildweg ist real vorhanden, AP-08 hat keine fehlende Vorbedingung |
| `Theme/releases/` existiert noch nicht, Paketwerkzeug fehlt | Repo: Verzeichnis nicht vorhanden | korrekt; §5.2-Begründung für den kleinsten neuen Zielpfad trägt |
| `tools/check-test-pages.py` ist vorhandene Infrastruktur für AP-09 | Repo: Datei existiert; `TEST_PAGE_STANDARD.md` Kopf (Version 13) | korrekt |
| Negativfall-Pflicht für Checker | `STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md:489-510` | korrekt zitiert und in §6.1/EVAL-02–05 umgesetzt |

---

## 3. Findings

### P1

**F-01 — Verhaltens-Traces und Paritätsmessung: Erfassungsweg unbenannt, „Python-Extraktion" ist für JS-getriebenes Verhalten nicht leistbar**

- **Fundstelle:** `ENTWURF_APP_FABRIK_GOLDEN_MASTER_V6.md:175-178` (`traces[].startState/action/endState` — Erzeuger „Python-Extraktion"), `:341-349` (Ebene-2-Fingerprints und Screenshotvergleich), `:442` (GMV6-03 „extrahiert Blueprint/Traces").
- **Ist:** Statische Python-Extraktion kann DOM-Sektionen, Literalrezepte, lokale CSS-Mechanik und `hidden`-Startzustände liefern. Sie kann aber die End- und Übergangszustände nicht liefern, die im Mockup-JavaScript entstehen: das 2-Sekunden-Freigabegatter (`a-sol/mockup.html:455-461`), der verzögerte Screenwechsel (`a-sol/mockup.html:467`), der Button-Label-Wechsel „Nächste Runde"→„Auflösen" (`b-fable/mockup.html:500`), die Modus-Aggregation der Rundenwahl (`b-fable/mockup.html:519-524`) und die Entfaltung mit Spiegelsatz-Verzweigung (`b-fable/mockup.html:537-549`). Ebenso brauchen Ebene-2-Fingerprints und der maskierte Screenshotvergleich ein Laufzeitwerkzeug; `versions.tools` erwähnt „Browser/Checker-Versionen", benennt aber kein Werkzeug und keinen Erfassungsablauf.
- **Soll:** Traces entstehen aus einem deterministischen, aufgezeichneten Lauf des Golden Masters im gepinnten Referenzbrowser (`reference.browser`), orchestriert von Python; dasselbe Werkzeug misst später die Parität. Sonnet folgert nie aus Mockup-JS (Kernversprechen des Entwurfs, `:24` und Handover-Pflichtprüfung 3).
- **Auswirkung:** Ohne definierten Erfassungsweg wird GM-08 („alle Pflichtfelder belegt") entweder still verletzt oder die Trace-Felder werden von Hand bzw. von einem LLM aus Mockup-JS „gefolgert" — genau der Fehlermodus, den die Fabrik ausschließen soll. Der Fehler vervielfältigt sich über ~25 Apps.
- **Kleinste Korrektur:** In §3.2 und §6.2 den Erfassungsweg festschreiben: genau ein gepinntes Browser-Automationswerkzeug (z. B. Playwright, Version in `versions.tools`), Python-gesteuert, zwei Funktionen (Trace-Aufzeichnung am GM, Paritätsmessung am Produkt), beide Zustände normal/reduced. Werkzeugwahl als Decision-Log-Eintrag (neue Dev-Abhängigkeit, `SECURITY-BASELINE.md` §9 analog). GMV6-03 um diesen Baustein erweitern; EVAL-Korpus um einen Trace-Aufzeichnungs-Negativfall ergänzen. Ausdrücklich kein E2E-Testframework und keine generische Testautomation — nur diese zwei Funktionen (Überbau-Grenze §9 bleibt).

### P2

**F-02 — Interner Empty/Error-Widerspruch in APP-INTERFACE.md fehlt in der Vorrangtabelle**

- **Fundstelle:** `ENTWURF…V6.md:124-132` (§2.4); Quelle: `APP-INTERFACE.md:250` („Fehlschlag → Empty-State, kein Crash" bei Dateinamenvalidierung) und `:252` gegen die bindende Taxonomie `:286-298` („Fehlende oder unvollständige Daten sind Error, nicht Empty"; ungültige Card-Konfiguration ⇒ Error).
- **Ist:** §2.4 löst den Empty/Error-Konflikt nur gegen den Draft (`03_APP_FACTORY_STANDARD_DRAFT.md:825-837`), nicht gegen den Widerspruch innerhalb der kanonischen Spec selbst.
- **Soll:** Ein ungültiger Dateiname ist Error (`role="alert"`), nicht Empty.
- **Auswirkung:** Sonnet liest in AP-03/AP-04/AP-06 die Sicherheitsregeln §7 der kanonischen Spec und könnte den falschen Zustand bauen; das Gate „Error/Empty" in §4.3 prüft dann gegen eine mehrdeutige Quelle.
- **Kleinste Korrektur:** Eine Vorrangzeile in §2.4 ergänzen (`APP-INTERFACE.md:286-298` überschreibt `:250-252`) und in die §8-Änderungsliste eine Ein-Wort-Korrektur der Spec aufnehmen („Empty-State" → „Error-State" in Regel 5/7).

**F-03 — Abnahmesatz: Format, Ablageort und Erzeugungsweg fehlen**

- **Fundstelle:** `ENTWURF…V6.md:79-99` (§2.1), `:446` (GMV6-07).
- **Ist:** Der maschinenlesbare Abnahmesatz ist feldgenau definiert, aber es fehlt: wo die Datei liegt, wer sie physisch schreibt und in welcher Form Alberts Bestätigung erfolgt. Albert wird keinen SHA-256 von Hand in ein JSON tippen; „Python berechnet, Albert bindet" (`:168`) ist ohne Werkzeugweg nicht ausführbar.
- **Soll:** Ein kanonischer Ort (z. B. `Apps/{slug}/factory-runs/ACCEPTANCE-{acceptance.id}.json`) und ein Ablauf: Python erzeugt den Entwurf des Abnahmesatzes (Pfad, Slug, Hash vorbefüllt), Albert bestätigt die Entscheidungsfelder explizit, erst dann gilt GM-02.
- **Auswirkung:** GMV6-07 („Pilot-Abnahme erfassen") ist sonst nicht ausführbar definiert; Gefahr improvisierter Abnahmeformen, die GM-01–03 unterlaufen.
- **Kleinste Korrektur:** Zwei Sätze in §2.1 (Ort + Erzeugungsweg) und Aufnahme ins `factory-input/v1`-Schema (GMV6-02).

**F-04 — Pflichtquellen je Run per Verweis auf „V6" statt als generische Regel**

- **Fundstelle:** `ENTWURF…V6.md:231` (AP-00: „in V6 benannte Pflichtquellen"); GM-04 `:108`.
- **Ist:** Die Quellenliste des Review-Handovers ist app-spezifisch (Crash-Reaktions-Test) und enthält Review-Artefakte. Als Definition des Quellenmanifests für ~25 Apps taugt sie nicht; „V6" ist zudem ein flüchtiges Dokument, keine Sachquelle (`STRUKTURELLE_SICHERHEIT…md` §9).
- **Soll:** Das Schema definiert das Quellenmanifest als Funktion der App: konstante bindende Specs/Verträge + Werkstattordner der App (explizite Einzeldateien, keine Rekursion — `MOCKUP-VERTRAG.md:137`) + Mini-Spec/Steuerungsblock + Datenworkflows je Datenklasse.
- **Auswirkung:** Beim zweiten App-Run müsste sonst jemand raten, welche Quellen GM-04 meint.
- **Kleinste Korrektur:** Quellenmanifest-Regel in GMV6-02 (Schema) verankern; AP-00-Zeile entsprechend umformulieren.

### P3

**F-05 — Statusmapping Annahmenprotokoll → Entscheidungsledger fehlt**

- **Fundstelle:** `ENTWURF…V6.md:109` (GM-05), `:173`; `MOCKUP-VERTRAG.md:117-123` (Status: `aus Spec belegt` / `simuliert` / `redaktionell zu bestätigen`).
- **Ist:** Das Ledger kennt `entschieden/offen/simuliert/redaktionell offen`; das Mockup-Übergabeprotokoll kennt drei andere Namen. Die Zuordnung ist plausibel, aber nicht definiert.
- **Kleinste Korrektur:** Mappingtabelle im Schema (aus Spec belegt→entschieden; simuliert→simuliert; redaktionell zu bestätigen→redaktionell offen; alles Übrige→offen).

**F-06 — Kein explizites Pack-Feld für den Loading/Empty/Error-Zustandsvertrag**

- **Fundstelle:** `ENTWURF…V6.md:156-207` (§3.2); `APP-INTERFACE.md:286-298`.
- **Ist:** Die Fehlerzustände fehlen im Mockup vertragsgemäß (`MOCKUP-VERTRAG.md:36-43`) und entstehen erst im APP_SPEC-Diff (AP-01). Das Pack behauptet aber, „alle notwendigen Fakten" zu tragen; die Zustandsverträge (Auslöser, Rollen, Meldungstexte mit Copy-Status) haben kein Feld.
- **Kleinste Korrektur:** Entweder Feld `data.stateContract` (Quelle: Taxonomie + APP_SPEC, Copy über `data.copyStatus`) oder ein klarstellender Satz in §3.1, dass Zustandsverträge AP-01-Artefakt sind und das Pack sie referenziert, nicht enthält.

**F-07 — `Theme/releases/{runId}`: Aufbewahrung unbestimmt**

- **Fundstelle:** `ENTWURF…V6.md:242, 287, 291`.
- **Ist:** Pro Run ein ZIP im Repo; bei ~25 Apps × Änderungsläufen wächst das unbegrenzt.
- **Kleinste Korrektur:** Ein Satz: nur das zuletzt freigegebene ZIP + Manifest bleibt; ältere Läufe werden gelöscht oder archiviert (Regel im Paketvertrag, §8 Punkt 6).

**F-08 — Zeichenvorrat von `acceptance.id`/`runId` nicht festgelegt**

- **Fundstelle:** `ENTWURF…V6.md:95-99, 163`.
- **Ist:** `acceptance.id` fließt in Pfadnamen; ohne Grammatik drohen case-/zeichenbedingte Pfadfehler (vgl. Case-Sensitivity-Regeln `TEST_PAGE_STANDARD.md:319-321`).
- **Kleinste Korrektur:** Grammatik im Schema, z. B. `^[a-z0-9-]{4,32}$`.

**F-09 — Verhältnis der Opus-Regel zu §12.4 der Strukturellen Sicherheit klarstellen**

- **Fundstelle:** `ENTWURF…V6.md:401-415`; `STRUKTURELLE_SICHERHEIT…md:556-565, 711`.
- **Ist:** Die allgemeine QA-Regel sieht Opus für Klasse-C-Entscheidungen vor; §7.2 des Entwurfs ist enger. Das ist kein Widerspruch — die Fabrik-Produktionsphase erzeugt planmäßig keine Klasse-C-Entscheidungen mehr (die stecken in diesem Entwurf und seinen Verträgen) — aber das steht nirgends.
- **Kleinste Korrektur:** Ein Satz in §7.2: Die Regel gilt für Produktionsläufe; neue Klasse-C-Vertragsarbeit außerhalb der Läufe folgt weiter `STRUKTURELLE_SICHERHEIT` §12.4.

---

## 4. Vollständigkeitsmatrix

| Baustein | Abdeckung im Entwurf | Befund |
|---|---|---|
| **Intake** | §2.1–2.2 (GM-01–08), Run-ID, Hash-Bindung, Konfliktliste; Intake-Stopp für den Piloten korrekt (README GELB, E4 offen) | vollständig; F-03/F-04 präzisieren Abnahmesatz und Quellenmanifest |
| **Input-Pack** | §3.1–3.3: kanonisches JSON, Pack-Hash, Feldvertrag mit Erzeuger/Pflicht/Gate, Toleranzen | vollständig bis auf F-01 (Trace-Erfassung), F-05/F-06 (Mapping, Zustandsvertrag) |
| **AP-Kette** | §4.1–4.2: AP-00–AP-12, je Leseliste, Write-Scope, Eigentümer, Fall-zu-Fehler-Gate, Nachweis; Rücklauf nummeriert | vollständig; klein genug für Sonnet; keine unprüfbaren Sammelaufträge |
| **Varianten** | §4.3: A0/A1-C/A1-J/A2-CJ deckungsgleich mit `MIGRATIONSSTRATEGIE…md:47-56`; ChartEngine als optionale Komponente, keine fünfte Klasse; AP-07 nur bei `chartNeed != none` | vollständig, keine künstliche Kategoriegrenze |
| **Lebenszyklus** | §5.1–5.3: Zielorte deckungsgleich mit SEC-04/05, D-CSS-01–04, CSV-/JSON-Workflow (pruefe-csv/json.bat, FileZilla, ghost-local); Änderungswege ohne zweiten Weg | vollständig; F-07 (Releases-Aufbewahrung) |
| **Gates/Evals** | §6.1–6.3: drei Nachweisebenen, Fingerprints vor Pixel-Diff, Screenshot nur für Schlüsselzustände, Negativkorpus EVAL-01–06, echte Störungen werden Regressionen | verhältnismäßig; F-01 betrifft das Werkzeug der Ebene 2 |
| **Menschliche Abnahme** | §6.2 Ebene 3 + AP-12: lokales Ghost, gebautes `screen.css`, ohne Play-CDN, Reduced Motion, Viewports, zweite Instanz — deckungsgleich mit D-CSS-04 Punkt 4 und `MIGRATIONSSTRATEGIE…md:108-125`; Testseite ersetzt sie nicht | vollständig |

---

## 5. Sonnet-Ausführbarkeit und Opus-Ausnahme

**Sonnet-Ausführbarkeit: gegeben.** Jedes Produktions-AP hat exakte Leseliste, engen Write-Scope, Vorbedingungen, Stop-Regeln und erwartete Nachweise; der Kontext ist Need-to-act statt Projektgeschichte (`STRUKTURELLE_SICHERHEIT…md` §13). Die globale Regel „kein Feld ergänzen, raten oder aus anderen Apps ableiten" (`:158`) plus GM-07-Pfadsperre schließt die typischen Sonnet-Fehlermodi (plausibles Auffüllen, Fremd-App als Vorlage) strukturell aus. Einzige echte Ausführbarkeitslücke ist F-01: solange die Traces nicht beweisbar vollständig sind, würde Sonnet in AP-06 zum Folgern aus Mockup-JS gezwungen.

**Opus-Ausnahme: objektiv formuliert, keine Erweiterung nötig.** Die fünf kumulativen Bedingungen (§7.2) sind prüfbar; die Nicht-Auslöser (fehlende Produktentscheidung, fehlender Master, Hash-Drift, offene Copy = Albert-Stops) sind korrekt abgegrenzt; die Zwei-Fails-Diagnoseregel (Sol/Fable klassifiziert, nur echte Vertragskonflikte erreichen Opus) verhindert „Opus zur Sicherheit". Im gelesenen Material existiert derzeit **kein** Fall, der die Opus-Bedingungen erfüllt — auch der einzige kandidatenhafte Punkt (E4, Mehr-Runden vs. Ein-Entscheidungs-Flow) ist eine reine Produktentscheidung und damit Albert-Stop, kein Opus-Fall. F-09 ist eine Klarstellung, keine Ausweitung.

---

## 6. Nicht zu bauender Überbau

Bestätigt als nicht zu bauen (Entwurf §1.1, §6.3, §8 „Nicht nötig", §9 Schluss):

kein HTML-zu-JS-Compiler oder Übersetzer; kein zweiter Renderer, keine zweite CSS-Wahrheit, kein zweiter Buildweg (der eine existiert real: `package.json` `css:build`); kein zweites Deployment-System (`Theme/releases/` ist Paketablage, Upload bleibt manueller Ghost-Admin-Weg); kein Agentenschwarm und keine parallele Multi-Modell-Produktion; keine generische Evalplattform, kein Dashboard, kein Ranglistensystem; kein Haiku ohne gemessenen, schema-validierten Pilot; keine neue App-Familien-Spec, kein generischer Core, keine Registry-Dienste; keine Aktualisierung jeder historischen Prozessdatei vor dem Piloten.

Ergänzende Grenze aus diesem Review (Folge von F-01): Das zu benennende Browser-Automationswerkzeug bleibt auf genau zwei Funktionen begrenzt — Trace-Aufzeichnung am Golden Master und Paritätsmessung am Produkt. Es wird kein allgemeines E2E-Testframework, keine CI-Pipeline und kein dauerhafter Testautomationsstack daraus.

---

## 7. Konsolidierte Reihenfolge der ersten Implementierungs-APs

Die GMV6-Reihenfolge des Entwurfs (§9) wird bestätigt, mit drei Einpassungen aus den Findings:

1. **GMV6-01 — Mockup-Vertrag ergänzen** (§2.3-Unterabschnitt; Klasse C, Albert-Freigabe). Unverändert.
2. **GMV6-02 — `factory-input/v1`-Schema und kanonische Serialisierung.** Erweitert um: Abnahmesatz-Format und -Ablageort (F-03), Quellenmanifest-Regel (F-04), Statusmapping (F-05), `acceptance.id`-Grammatik (F-08), Vorrangzeile Empty/Error (F-02) sowie Feld bzw. Grenznotiz zum Zustandsvertrag (F-06).
3. **GMV6-02b (neu, klein) — Trace-/Paritätswerkzeug festlegen.** Auflösung F-01: ein gepinntes Browser-Automationswerkzeug, Decision-Log-Eintrag, Erfassungsablauf für Traces und Ebene-2-Messung. Reine Werkzeug- und Vertragsentscheidung, noch kein App-Bezug.
4. **GMV6-03 — Intake-/Pack-Generator** — inklusive des aufgezeichneten GM-Laufs aus GMV6-02b für die Trace-Felder.
5. **GMV6-04 — Negativkorpus für Intake** — zusätzlich ein Negativfall „unvollständige/abgebrochene Trace-Aufzeichnung ⇒ GM-08 rot".
6. **GMV6-05 — AP-Paket-Generator.** Unverändert.
7. **GMV6-06 — Theme-Paketierer** — inklusive Aufbewahrungsregel (F-07).
8. **GMV6-07 — Pilot-Golden-Master-Abnahme erfassen.** Bleibt Albert-Stop; vor der Abnahme ist zusätzlich E4 (Mehr-Runden vs. Ein-Entscheidungs-Flow, `SONNET_EINGABEPAKET.md:327-329`) aufzulösen, falls Variante B gewählt wird — sonst als `acceptance.conditions[]`-Eintrag, der die betroffenen APs sperrt.
9. **GMV6-08 — Pilot AP-00 bis AP-02.** Unverändert.
10. **GMV6-09 — Pilot AP-03 bis AP-09.** Unverändert; AP-08 hat keine offene Vorbedingung (Buildweg verifiziert vorhanden).
11. **GMV6-10 — Pilot AP-10 bis AP-12.** Unverändert.
12. **GMV6-11 — einmaliger Peer-Review und gebündelter Fix-Batch.** Unverändert.
13. **Erst danach zweite App.** Unverändert; erst reale Wiederholung rechtfertigt gemeinsame Helfer oder eine Haiku-Prüfung.

---

## Unsicherheit

Fakten-Score: ~90 %. Datenbasis: vollständige Lektüre des Entwurfs und aller Pflichtquellen; stichprobenartige Pfad:Zeile-Verifikation (alle grün); deterministische Repo-Prüfungen (Buildweg, Registry, Checker, fehlendes `Theme/releases/`). Restunsicherheit: (1) Ob statische Extraktion für einzelne einfache Apps doch ausreichende Traces liefert, ist erst am Piloten messbar — F-01 bleibt trotzdem als Strukturregel nötig (60–80 % Wahrscheinlichkeit, dass ohne Browser-Lauf mindestens ein Trace-Feld je App manuell nachgetragen würde; Hauptunsicherheitsquelle: Komplexität künftiger App-Mechaniken). (2) Nicht geprüft wurden Inhalte außerhalb des Quellmanifests (kein rekursives Lesen in `tests/scratch/`/`Archiv/`, auftragsgemäß).
