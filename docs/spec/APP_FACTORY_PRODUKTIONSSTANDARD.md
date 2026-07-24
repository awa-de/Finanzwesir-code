# App-Fabrik-Produktionsstandard

**Status:** verbindlich  
**Version:** 1.0.0  
**Stand:** 2026-07-24  
**Entscheidungsgrundlage:** Albert, AF-GM-01; Sol-Entwurf V6 und unabhängiges Fable-Review V6

## 1. Auftrag und Grenze

Dieser Standard ist die kanonische Produktionslinie zwischen einem von Albert abgenommenen Werkstatt-Mockup und einer sicheren, Ghost-fähigen App. Er ist zugleich **Bibel** (welche Verträge immer gelten) und **Kochbuch** (welche Belege ein Herstellungsauftrag liefern muss).

Das Ziel ist Reproduzierbarkeit: Ein Mockup wird nicht kreativ nachinterpretiert. Seine akzeptierte Wirkung und Optik werden mit geringstmöglicher Abweichung in die vorhandene App-Architektur überführt.

Nicht Gegenstand dieses Standards sind Produktfindung, psychologische Bewertung, neue Designs oder eine allgemeine CI-/Plattform. Diese Arbeit endet mit der Mockup-Abnahme durch Albert.

**Ockham:** Eine Produktionslinie hat einen Golden Master, einen Eingabevertrag und einen Auslieferungsweg. Mehr Parallelmodelle erhöhen nur Drift.  
**Via Negativa:** Kein Kopieren von Mockup-Code, keine zweite Laufzeit, keine zweite CSS-Wahrheit, keine stillen Änderungen an gemeinsamem Theme-Code.

### AF-PROD-01 — Werkstatt-/Produktionsgrenze

**Leitsatz**

Wir trennen die Freiheit zum Irren von der Pflicht, korrekt zu liefern.

**Pflicht**

1. `tests/scratch/**` ist eine nicht autoritative Werkstatt.
2. Ein Produktions-AP arbeitet ausschließlich aus einem vollständig validierten Golden-Master-Eingabepaket und den bindenden Produktions-Specs.
3. Aus dem Mockup dürfen ausschließlich deklarierte Beobachtungen übernommen werden: sichtbare Struktur, Gestaltung, Texte, Zustände und Verhalten.
4. Jede verwendete Information benötigt eine deklarierte Quelle, Rolle und Zulässigkeit.

**Verbot**

Mockup-JavaScript, Datenmodell, Berechnungen, Modulstruktur, Schnittstellen, Bootstrapper und improvisierte CSS-Architektur sind keine Produktionsquellen. Sie dürfen weder kopiert noch adaptiert noch sinngemäß als Architektur übernommen werden.

**Stop**

Kein Produktions-AP beginnt, wenn:

- das Eingabepaket fehlt oder nicht aktuell erfolgreich validiert wurde;
- Abnahme, Hash und Interaktionsspur nicht übereinstimmen;
- eine benötigte Quelle nicht freigegeben ist;
- eine Annahme `blocked` ist;
- das Produktions-LLM zur Umsetzung rohen Werkstattcode lesen müsste.

## 2. Verbindlichkeits- und Quellenordnung

Bei Widerspruch gilt in dieser Reihenfolge:

1. explizite Entscheidung von Albert, dokumentiert im Decision Log;
2. bindende Specs unter `docs/spec/`, insbesondere dieser Standard und `APP-INTERFACE.md`;
3. Sicherheits- und CSS-Verträge: `docs/steering/audits/SECURITY-BASELINE.md`, `docs/steering/design/CSS-KONVENTIONEN.md` und `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`;
4. lokaler Steuerungsblock und `Apps/{slug}/APP_SPEC.md`;
5. Daten-, Asset- und App-Verträge;
6. Golden-Master-Eingabepaket;
7. historische RFCs, Entwürfe und Werkstattartefakte — nur Kontext, nie alleinige Produktionsregel.

`MOCKUP-VERTRAG.md` regelt die Werkstattgrenze. Dieser Standard regelt erst die Herstellung danach. `03_APP_FACTORY_STANDARD_DRAFT.md`, `04_CLAUDE_WORKFLOW_DRAFT.md` und `APP_FACTORY_IMPLEMENTATION_RFC.md` sind nachrangiger Kontext, sofern eine Regel dieses Standards sie ersetzt.

## 3. Begriffe und Systemgrenze

| Begriff | Bedeutung |
|---|---|
| Werkstatt-Mockup | schneller, bewusst nicht produktionskonformer Versuch unter `tests/scratch/`; nach Abnahme wegwerfbar |
| Golden Master | genau eine, von Albert abgenommene Mockup-Fassung mit unveränderlichem Hash |
| Abnahmebeleg | menschlich bestätigter Datensatz mit ID, Scope, Hash und Freigabedatum |
| Eingabepaket | deklarierter, prüfbarer Herstellungsinput für eine App; kein Code-Transfer |
| Produktions-AP | enger, wiederholbarer Arbeitsauftrag mit erlaubtem Scope, Beweisen und Stop-Regeln |
| Shared Path | gemeinsamer Theme-, Engine-, Sicherheits- oder Produktionsstandardpfad; nicht Eigentum einer einzelnen App |
| Rucksack / AppContext | unveränderlicher, geprüfter Laufzeitkontext gemäß `Der Rucksack (Context Object Pattern).md` |

Die technische Familie ist einheitlich: **Chart ist App**. Eine Chart-App kann die ChartEngine verwenden; eine andere App kann sie zusätzlich einbetten. Das ändert weder Datenpipeline noch Sicherheits- oder Auslieferungsgrenze.

## 4. Eintrittsgate: Golden Master statt Erinnerung

Ein Produktions-AP darf erst starten, wenn ein maschinenlesbarer Abnahmebeleg vorliegt. Vorgesehener Ablageort:

`Apps/{slug}/factory-runs/ACCEPTANCE-{acceptance-id}.json`

`acceptance-id` folgt `^[a-z0-9][a-z0-9-]{2,31}$`. Der Beleg enthält mindestens:

```json
{
  "acceptanceId": "crash-reaktion-a1",
  "appSlug": "crash-reaktions-test",
  "acceptedBy": "Albert",
  "acceptedAt": "YYYY-MM-DD",
  "mockupPath": "tests/scratch/.../index.html",
  "mockupVariant": "a-sol",
  "mockupSha256": "<64 lowercase hex>",
  "scope": "sichtbarer Happy Path, Zustände und Gestalt",
  "knownNonGoals": []
}
```

Die Datei wird künftig durch ein Python-Werkzeug aus einer Vorlage angelegt; heute ist das ihre bindende Form. Ein fehlender Wert, ungültiger Slug, fehlender Mockup-Pfad oder Hash-Mismatch ist ein **Stop**, keine Schätzung durch ein LLM.

Der Golden Master liefert nur deklarative Belege gemäß `MOCKUP-VERTRAG.md` §6.1. Insbesondere ist sein JavaScript kein Produktionsinput.

## 5. Eingabepaket und Provenienz

Vor dem ersten Produktions-AP wird genau ein Eingabepaket unter `Apps/{slug}/factory-runs/{run-id}/` angelegt. `run-id` folgt derselben Grammatik wie `acceptance-id`. Es enthält:

| Teil | Pflichtinhalt |
|---|---|
| `acceptance.json` | unveränderte Kopie bzw. Referenz des Abnahmebelegs |
| `source-manifest.json` | jede gelesene Quelle mit Pfad, SHA-256, Rolle und Zulässigkeit |
| `blueprint.json` | deklarative DOM-Reihenfolge, Klassenrezepte, lokale Mechanik, Tokens, Breakpoints und Motion |
| `behavior-trace.json` | beobachtete Handlung → sichtbarer Zustand → erwartete DOM-/State-Belege |
| `assumption-ledger.json` | jede Annahme mit Herkunft, Status, Eigentümer und Auflösungsweg |
| `asset-manifest.json` | jedes Bild/Icon/Font mit Quelle, Lizenz-/Nutzungsstatus, Hash und Zielpfad |
| `data-manifest.json` | Datenklasse, Quelle, Hash/Fassung, Validator, Cache-/Aktualisierungsstatus und Ghost-Dateiname |
| `production-plan.md` | genehmigte AP-Reihenfolge, erlaubte Pfade, Tests und manuelle Ghost-Abnahme |

Eine Quelle ist nur zulässig, wenn sie im `source-manifest.json` steht. Rekursive Suche in `tests/scratch/` oder `Archiv/` bleibt verboten. Jeder aus dem Mockup stammende Wert wird als `observed`; jede simulierte Angabe als `simulated`; jede nötige Inhaltsentscheidung als `editorial-confirmation-required` geführt.

### 5.1 Annahmen- und Fehlerzustände

`assumption-ledger.json` verwendet ausschließlich:

- `confirmed` — durch bindende Quelle oder Albert bestätigt;
- `observed` — am Golden Master nachweisbar;
- `simulated` — im Mockup sichtbar, fachlich noch nicht belegt;
- `editorial-confirmation-required` — Text, Behauptung oder Quelle verlangt Redaktion/Albert;
- `blocked` — verhindert die Herstellung;
- `rejected` — bewusst nicht übernehmen.

Ein `blocked`-Eintrag stoppt den betroffenen AP. Ein `simulated`- oder `editorial-confirmation-required`-Eintrag darf nie still in Daten, Text oder Berechnung überführt werden.

## 6. Beobachtete Interaktion: Spur statt JS-Deutung

Zeitgatter, Rundenlogik und Zustandsverzweigungen werden nicht aus Mockup-JavaScript erraten. Das Eingabepaket benötigt eine aufgezeichnete, versionsgebundene Browser-Spur. Sie ist der Nachweis des beobachteten Verhaltens, nicht ein Test-Framework.

### 6.1 Visueller Aufnahme-Preflight und Wirkungsnachweis

Vor einer Aufnahme prueft der Produktions-AP, dass die fuer die beabsichtigte Referenzansicht erforderlichen lokalen Ressourcen vom tatsaechlichen Pfad des hashgebundenen Snapshots aus aufloesen und real vorhanden sind. Kann eine benoetigte Gestaltung nicht geladen werden oder weicht die Aufnahme sichtbar von der Referenzansicht ab, stoppt der AP; eine gruene DOM-, Schema- oder Replay-Pruefung ersetzt diesen Befund nicht.

Behauptet der Happy Path einen sichtbaren Zustandswechsel, bestimmt der Aufnahmeauftrag die Nachweisbilder vor dem Wechsel, am Wirkungs- oder Schwellenzustand und nach dem Wechsel. Slider- und Eingabewerte werden so gewaehlt, dass der behauptete Wechsel sichtbar wird; eine lediglich ausgeloeste Eingabeaktion ist kein visueller Nachweis. Funktionaler Trace-Nachweis und Sichtnachweis bleiben getrennte Belege; beide muessen vor der Evidenz gruen sein.

AF-GM-02, AF-GM-02b und AF-GM-02c haben den schmalen, gepinnten Playwright-Chromium-Recorder und Verifizierer für JSON-Trace und Screenshots umgesetzt; die Spur ersetzt weiterhin keine manuell beschriebene Klickfolge und bleibt kein Test-Framework, keine CI, kein Dashboard, keine Browsermatrix und kein zweiter Produktiv-Laufzeitpfad.

## 7. Deterministische Herstellungsregeln

Python übernimmt alles Mechanische: Hashes, Pack-Struktur, JSON-Schema, Manifest- und Vollständigkeitsprüfungen, Dateikopien, Konsistenzvergleiche sowie Auslieferungsinspektion. Sonnet erhält nur begrenzte, eindeutig benannte Produktions-APs.

Sonnet darf in einem App-AP ausschließlich:

- den genehmigten app-spezifischen Runtime-Code unter `Theme/assets/js/apps/{slug}.js` herstellen oder ändern;
- die zugehörige lokale Mechanikquelle `Theme/src/css/apps/{slug}.css` herstellen oder ändern;
- App-Dossier, Vertrag, Tests und erlaubte Datenprofile im freigegebenen Scope nachziehen;
- die bestehende Registry nur über einen besonderen Shared-AP ergänzen;
- die vier Datenklassen A0, A1-C, A1-J und A2-CJ über den vorhandenen Resolver → Spezialparser → Validator → Vault → gefrorenen AppContext nutzen.

Sonnet darf nie Mockup-Code „umwandeln“, eine globale Ausnahme hinzufügen, Datenpfade umgehen, dynamische Imports aus Card-Werten erzeugen oder einen zweiten CSS-/Deployment-Weg einführen.

Ein Fehlerzustand folgt `APP-INTERFACE.md`: ungültige, fehlende oder abgewiesene Eingaben führen zu `Error-State` mit `role="alert"`, nicht zu Empty-State und nicht zu einem Absturz.

## 8. CSS und Theme-Auslieferung

Es gibt pro Seite genau eine produktive CSS-Wahrheit:

`Theme/src/css/screen.source.css` + lokale App-Mechanikquellen → Tailwind-Build → `Theme/assets/css/screen.css`

Die app-spezifische Mechanik liegt unter `Theme/src/css/apps/{slug}.css`, ist auf `.fw-app.fw-app--{slug}` gebunden und wird über einen baren Import in den bestehenden Build eingezogen. Tailwind-Klassenrezepte stehen als Literale in der Runtime; die dafür erforderlichen Quellen werden vom bestehenden `@source`-Mechanismus erfasst.

`screen.css` ist ein abgeleitetes Artefakt. Es wird nie direkt bearbeitet. JS-Style-Injektion, `!important` als Kaskadenreparatur und app-spezifische Regeln im globalen Theme-Chrome sind verboten. Die enge Ghost-Kaskadengrenze bleibt die dokumentierte Ausnahme direkt an den betroffenen `.gh-content`-Regeln.

## 9. Protected-Path-Profil und Shared-Theme-Regression

Die Datei `.claude/PROTECTED_PATHS.json` ist der mechanische Schutz. Für die App-Fabrik gilt:

1. Shared Paths sind standardmäßig `forbidden`.
2. Ein App-AP darf einen Shared Path nicht berühren.
3. Eine Änderung beginnt mit einem separaten **Unlock-AP**: Albert ändert den Status in der Schutzdatei ausdrücklich von `forbidden` zu `protected`, mit Pfad, Grund, Solländerung und Rückbauplan.
4. Erst danach folgt ein enger **Shared-AP** mit Regression gegen alle betroffenen Verbraucher.
5. Ein separater **Relock-AP** setzt den Pfad wieder auf `forbidden` und belegt den erwarteten Diff/Hash.

Eine verbale Freigabe oder ein Satz im Auftrag ist kein Ersatz für die Statusänderung in der Schutzdatei. Der Schutz muss vor dem Schreibschritt sichtbar sein.

Zu den Shared Paths gehören mindestens Bootstrapper/Registry, Theme-Einstieg, CSS-Build-Einstieg, Tokens, gebautes `screen.css`, Chart-/Datenengine, Paketverwaltung, Strukturchecker und die kanonischen Fabrikverträge. Das konkrete Profil steht in `.claude/PROTECTED_PATHS.json`.

AF-GM-03 hat Pack-Generator, Paket-Validator sowie Protected-Diff-Checker umgesetzt. Der Checker prueft nur; Unlock, Shared-AP mit Regression und Relock bleiben unveraendert Pflicht.

## 10. Abnahme und Auslieferung

Jeder Produktions-AP liefert einen kurzen Beleg unter `Apps/{slug}/factory-runs/{run-id}/evidence/` oder referenziert den dortigen Lauf. Er benennt immer Soll, tatsächliche Dateien, Tests, offene Befunde und die verantwortliche manuelle Abnahme.

Pflichtbelege vor einem Theme-ZIP:

1. Eingabepaket vollständig und Hashes konsistent;
2. App-spezifische Syntax-, Vertrags- und Strukturtests grün;
3. CSS-Build reproduzierbar; lokale Mechanik und benötigte Tailwind-Rezepte im Artefakt nachweisbar;
4. Trace-Verifizierung grün;
5. keine unerlaubte Shared-Path-Änderung;
6. ZIP aus `Theme/` erzeugt, ohne verschachteltes ZIP oder `Theme/`-Präfix, direkt unter `Theme/` abgelegt.

Es wird in V1 kein `Theme/releases/` eingeführt. Alte ZIPs bleiben unter `Theme/` und können später manuell archiviert werden. Albert lädt das ZIP hoch, aktiviert es und führt die Ghost-nahe Sichtabnahme aus. Datenfeeds folgen dem vorhandenen Offline-Prüfer → manuellen Transfer → Laufzeit-Parser/Vault-Vertrag.

## 11. Modell- und Werkzeugrollen

| Rolle | Aufgabe |
|---|---|
| Albert | Produkt-/Mockup-Abnahme, ausdrückliche Shared-Path-Freigabe, Ghost-Upload und Sichtabnahme |
| Python | deterministische Herstellungsvorbereitung, Manifeste, Hashes, Validatoren und Gates |
| Sonnet | enge, spezifikationsgebundene Produktions-APs nach gültigem Eingabepaket |
| Haiku | später nur klar abgegrenzte, nicht entscheidende Inventur- oder Formatprüfungen |
| Sol/Fable | unabhängige Architektur-/Paketprüfung, keine Produktionsfreigabe |
| Opus | nur bei nicht auflösbarem Shared-Architektur-, Sicherheits- oder Vertragskonflikt; nie für eine Produktentscheidung |

Sonnet ist für die Produktionslinie ausreichend, wenn Pack, Gates und Write-Scope vollständig sind. Ein Modellwechsel ist keine Abkürzung für fehlende Eingaben oder ungeschützte Shared Paths.

## 12. Reifegrad und nächste Schritte

| Baustein | Aktueller Stand |
|---|---|
| Kanon, Quellenordnung, Golden-Master-Gate, Pack-Form, Schutzprofil | umgesetzt |
| Playwright-Chromium-Recorder und Trace-Verifizierer | AF-GM-02, AF-GM-02b und AF-GM-02c umgesetzt |
| Pack-Generator, JSON-Schemas und Factory-Eval | AF-GM-03 umgesetzt |
| erster Golden-Master-Pilot mit Sonnet | AF-GM-04 als technischer b-fable-Pilot umgesetzt; keine Produkt-, Ghost- oder Launch-Freigabe |
| Shared-Regression-Checker | AF-GM-05, offen (Protected-Diff-Checker: AF-GM-03 umgesetzt) |

Jeder Pilot beginnt nicht mit einer bestehenden Gelb-Variante. Der Golden Master muss zuvor explizit abgenommen sein. Jeder Pilot erweitert die Fabrik nur über einen separaten, dokumentierten Shared-AP; app-lokale Verbesserungen werden nicht in den Kanon zurückgeschrieben.

