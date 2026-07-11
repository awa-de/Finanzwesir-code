Stand: 2026-07-11 | Session: TESTENV-1b | Geändert von: Claude (Opus)

# TESTENV-1b – Maschinenlesbaren Harness-Vertrag und Geltungsbereich festlegen

## 1. Status und Kurzurteil

**Status: GRÜN**

Modell-Gate bestanden (Claude Opus 4.8). Der verbindliche Harness-Vertrag ist als
`docs/testing/HARNESS_CONTRACT.md` (Contract-Version 1, Schema-Version 1) festgelegt. Alle in
§5 des Auftrags geforderten Vertragsfragen sind eindeutig entschieden — mit konkreten
Feldnamen, Enums, ID-/Pfad-Mustern, Attributnamen und Präzedenzregeln. `additionalProperties:
false` ist übernommen. Alle 23 inventarisierten Test-HTMLs haben ein explizites Profil und einen
Übergangsstatus mit Auflösungskriterium. Absichtliche Fehler sind lokal und maschinenprüfbar
deklariert; das Capability-Vokabular ist kontrolliert und über genau eine maschinenlesbare Quelle
erweiterbar. Die App-Harness-Pflicht entsteht aus einer expliziten `appMaturity`-Deklaration, nicht
aus einer Dateinamen-Heuristik. Kein Bau, keine Migration vorweggenommen. Nur die zwei erlaubten
Dateien sind neu.

Kein GELB: keine offene, für Schema oder Checker blockierende Vertragsfrage verbleibt. Kein ROT:
keine widersprüchliche Quelle der Wahrheit, keine stille Ausnahme, keine unklare Profilzuordnung,
kein Scope-Verstoß.

## 2. Geprüfte Grundlagen

| Merkmal | Wert |
|---|---|
| Repository | `Finanzwesir-code` |
| Branch | `master` |
| Letzter Commit | `37ab2f9` (TESTENV-1a-Kette committed) |
| Modell-Gate | bestanden — Claude Opus 4.8 (Session-Override) |

Pflichtquellen gelesen: `TESTENV-1a` (korrigiertes Inventar, GRÜN-Stand), `TESTENV-1aR` (Review),
`TESTENV-1aFR` (Korrekturketten-Review), `TESTENV-1_harness-inventar_moderne-vs-legacy.md`,
`APP_FOLDER_STRUCTURE.md`, `BACKLOG.md`-Eintrag `TESTENV-1`, `.gitignore`, `app.test.html`,
`AP-16-abnahme.html`, `Theme/index.html` (Kopf), `janitor-test.html` + `boxen-stress-test-referenz.html`
(Köpfe), `chart.umd.min.js` (Kopf: v4.5.0, MIT, @kurkle/color 0.3.2), `ci-token-check.js`.

Ergänzend deterministisch erhoben: reale App-Ordner-Liste (`ls Apps/*/`: **25** Ordner, nur
`prokrastinations-preis` mit `app.test.html`/`app.js`/`APP_SPEC.md` — bestätigt die von `TESTENV-1aR`
korrigierte Zahl 25/24) und SHA-256 + Größe der Vendor-Chart.js (`2f27bcf4…18d30`, 208341 B).

## 3. Getroffene Entscheidungen

- **HTML:** genau ein Metadatenblock am `<body>`; 6 Harness-Attribute + 8 Szenario-Attribute mit
  exakter Semantik (§6/§8 des Vertrags).
- **Manifest:** `tests/harness-manifest.json`, 13 Felder mit klarer Nur-Manifest-/doppelt-Trennung.
- **JSON Schema:** `additionalProperties: false`, Pflichtfelder, Enums, ID-/Pfad-Muster,
  `uniqueItems`, bedingte Pflichtfelder — spezifiziert, nicht gebaut.
- **Präzedenz:** doppelte Felder (`id`, `profile`, `status`, `capabilities`, `usesChartJs`) MÜSSEN
  identisch sein; Widerspruch = harter Fehler, keine Quelle gewinnt still.
- **IDs:** `<profile>.<name>` (Harness), `<domain>.<name>` (Szenario); Profil-Präfix = `profile`;
  keine Pfad-Ableitung; Muster festgelegt.
- **Capabilities:** kanonische Startliste (26 Werte), Grammatik `domain.feature[.variant]`,
  Erweiterung nur über die eine Schema-Enum-Quelle.
- **Erwartete Ergebnisse/Fehler:** `pass|error|visual|manual`; 7 Fehlerklassen; lokale
  Deklaration absichtlicher/externer Referenzen, keine globale Ignore-Liste.
- **Fixtures:** zentral `tests/fixtures/{profile}/`, app-lokal `Apps/{slug}/test-data/`,
  Produktivdaten deklariert referenzierbar; Pflicht-Fixtures versioniert + case-sensitiv.
- **Vendor:** kanonischer Pfad `Theme/assets/js/vendor/chart.umd.min.js`, Version/Hash gepinnt,
  CDN verboten, `usesChartJs` aus Profil+Capabilities.
- **App-Lifecycle:** `spec-only|implemented|archived`; `app.test.html` Pflicht ab
  `implemented`; Reife explizit deklariert.
- **Ghost/Tooling:** definiert; Ghost 0 Mitglieder; Tooling ohne CDN-Dauerabhängigkeit.
- **Übergang:** alle 23 Seiten zugeordnet; kein Start als `active`.

## 4. Baseline übernommen / begründet abgewichen

| Baseline-Punkt | Übernommen / abgewichen | Begründung | Folge für Schema/Checker/Migration |
|---|---|---|---|
| 4.1 `<body>` als alleiniger Metadatenträger | übernommen | genau ein Block, keine verteilte Haltung | Checker sucht Block nur am `<body>` |
| 4.1 `data-fw-capabilities` sortiert/kommasepariert | übernommen + verschärft | zusätzlich „alphabetisch sortiert, keine Leerzeichen um Kommata" | Checker normalisiert & vergleicht als Menge |
| 4.1 `uses-chartjs` `true\|false` Pflicht | übernommen | + Konsistenzregel gegen `chart.*`-Capabilities | Checker-Regel §11.5 |
| 4.2 Szenario-Attribute | übernommen + präzisiert | `expected-error` nur bei `result=error`; `external-url` als eigenes Attribut ergänzt | Schema bedingte Pflicht; Checker Ref-Abgleich |
| 4.3 Manifestfelder | übernommen + ergänzt | `migrationTarget`, `since`, `appMaturity`, `note` ergänzt (bedingt) | Schema bedingte Pflichtfelder |
| 4.3 Repo-relative Pfade, keine `..` | übernommen | + Leerzeichen in Segmenten erlaubt (Bestandsrealität `index copy.html`) | Pfad-Muster mit Space, Negativ-Lookahead `..` |
| 4.3 IDs nicht aus Pfad berechnet | übernommen + verschärft | Profil-Präfix MUSS = `profile` (selbstbeschreibend, aber nicht pfadabgeleitet) | Checker-Gegenprüfung |
| 4.4 Präzedenz „doppelt = identisch" | übernommen | doppelte Menge auf 5 sicherheitsrelevante Felder begrenzt | Checker Gleichheitsprüfung nur dieser 5 |
| 4.5 Profile app/engine/ghost/tooling | übernommen | — | Enum |
| 4.5 Lifecycle active/migration-pending/archived | übernommen | `archived` bleibt **im** Manifest (Begründung §4.4 Vertrag: sonst Schattenliste) | Checker: minimale Enforcement für `archived` |
| 4.5 kein `prototype` | abgewichen (bestätigt weggelassen) | reale Standalone-Prototypen sind keine App-Harnesses; 3 Stufen genügen | keine 4. Stufe im Enum |
| 4.6 `expected-result` pass/error/visual/manual | übernommen | `pass` reicht (Begründung §9.1 Vertrag: Empty/Defensive = `pass`), kein `empty` | Enum bleibt bei 4 |
| 4.6 7 Fehlerklassen | übernommen | — | Enum |
| 4.7 case-sensitiv, Fixtures versioniert | übernommen | + „ignorierter Pfad ≠ Pflicht-Fixture eines `active`-Harness" | Checker Ignore-/Case-Prüfung |
| 4.8 Launcher aus Manifest | übernommen | — | TESTENV-1c |
| Baseline-Manifest-Beispiel `capabilities` unsortiert | abgewichen | Vertrag verlangt sortiert/duplikatfrei (Determinismus) | Schema `uniqueItems`, Checker Sortierprüfung |

**Keine** unbegründete Umbenennung oder Neustrukturierung. Alle Abweichungen sind Ergänzungen oder
Verschärfungen im Sinne stärkerer Determinismus-Prüfbarkeit.

## 5. Profile und Geltungsbereich

Vier Profile (§3 Vertrag) mit je Zweck, erlaubten Abhängigkeiten, CSS-Schicht, Chart.js-Regel,
Pflicht-Capabilities, Fixture-Regel. Geltungsbereich (§1): Harness = dauerhafte, registrierte
Test-HTML; nicht registrierte Test-HTML außerhalb `tests/scratch/` = Fehler. Scratch-Zone als
einzige Ausnahme (gitignored bis auf README). Kein `unknown`/`misc`/`other`/`legacy` als
Maschinenwert. Die 23 Seiten sind vollständig zugeordnet (§18 Vertrag).

## 6. Manifest-/HTML-Aufgabenteilung

- **Nur Manifest:** `path`, `launcherVisible`, `migrationTarget`, `since`, `appMaturity`,
  `schemaVersion`.
- **Nur HTML:** Szenarien, Fixtures, erwartete Ergebnisse/Fehler, `harness-version`.
- **Doppelt (identisch, Checker prüft gegeneinander):** `id`, `profile`, `status`,
  `capabilities`, `usesChartJs`.

Die doppelte Menge ist bewusst minimal — genau die Felder, deren Drift Enforcement-, Verbindungs-
oder Auffindbarkeitsfehler erzeugt. Alle übrigen Felder sind nicht doppelt (keine unnötige
Doppelpflege).

## 7. IDs, Capabilities und Szenarien

- Harness-ID `^(app|engine|ghost|tooling)\.[a-z0-9]+(-[a-z0-9]+)*$`, global eindeutig,
  pfadstabil, Präfix=`profile`.
- Szenario-ID `^[a-z0-9]+(-[a-z0-9]+)*\.[a-z0-9]+(-[a-z0-9]+)*$`, lokal eindeutig je Harness.
- Capability-Grammatik `domain.feature[.variant]`, 26 kanonische Startwerte, Erweiterung nur
  gemeinsam in §7.3 + Schema-Enum (eine Maschinenquelle).
- Szenario: eine Capability (Teilmenge der Harness-Capabilities), `expected-result` + bedingte
  `expected-error`, Fixture-Liste, Interaktion, absichtlich-gebrochen/extern-Deklaration.

## 8. Fixture- und Vendor-Entscheidungen

- Fixtures: zentral `tests/fixtures/{engine,ghost,tooling}/`, app-lokal `Apps/{slug}/test-data/`,
  Produktiv `Theme/assets/data/b1/` (deklariert referenzierbar). Pflicht-Fixture = referenziert;
  MUSS versioniert + case-korrekt sein; ignorierte Pflicht-Fixture eines `active`-Harness = Fehler.
  Fixture-Dateien tragen keine eigenen Metadaten. Manifest-/Notizdateien (`Alle-Balkendiagramm-CSV.txt`)
  sind keine Fixtures.
- Vendor: kanonisch `Theme/assets/js/vendor/chart.umd.min.js`; Chart.js v4.5.0, MIT,
  @kurkle/color 0.3.2, SHA-256 `2f27bcf4…18d30`, 208341 B — im Vertrag gepinnt. CDN als
  Laufzeitpflicht verboten; `usesChartJs` aus Profil+Capabilities, nicht aus Dateinamen.

## 9. App-Harness-Lifecycle

Drei Reifegrade `spec-only|implemented|archived`. `app.test.html` Pflicht **genau ab**
`appMaturity=implemented`. Reife MUSS explizit deklariert werden (Manifest-Feld `appMaturity`),
DARF NICHT aus `app.js`/`app.test.html`-Präsenz abgeleitet werden. Kein `prototype` (nicht nötig).
Bestandsrealität (24/25 App-Ordner ohne `app.test.html`) ist **keine** Vertragsverletzung, solange
keine Reife deklariert ist — der Checker weist diesen Zustand als „App-Harness-Pflicht ruht (Reife
nicht deklariert)" aus (kein stilles Grün, aber auch keine 24 falschen Verletzungen). Die
Reife-Deklaration je App ist App-Fabrik-Arbeit, nicht dieser AP.

## 10. Übergangszuordnung der 23 Seiten

Vollständig in §18 des Vertrags tabelliert: 1× `app`, 19× `engine`, 2× `tooling` (davon 1
`archived`), plus `Theme/index.html` als `engine`. Kein Harness startet `active` (alle 22
nicht-archivierten verletzen mindestens eine `active`-Bedingung — bewusst sichtbar). Jede
`migration-pending`-Zeile trägt ein konkretes Auflösungskriterium. Zwei Bestandsbrüche aus
`TESTENV-1a` sind als Auflösungsauflagen verankert (gebrochene Referenz `bd_daily_90d.csv` #15;
Case-Mismatch `scenario_6_decimals.csV` #17, Datei nicht löschen). Dublette #3/#6 bleibt als zwei
Einträge; MERGE/DELETE ist spätere Arbeit.

## 11. Verbotene Zustände

21 explizit verbotene Zustände (§16 Vertrag), jeder maschinenprüfbar durch Schema oder Checker —
inkl. unbefristetes `migration-pending` (erzwungen über `since`+`migrationTarget` + Checker-Zensus),
Widerspruch doppelter Felder, CDN-Pflichtabhängigkeit, `usesChartJs`-Inkonsistenz, undeklarierte
gebrochene/externe Referenz, ID-aus-Pfad, Szenario-Capability nicht Teilmenge.

## 12. Nicht entschiedene Implementierungsdetails

Bewusst offen (Bau/Detailarbeit von TESTENV-1c, keine Vertragslücke):

- Exakte JSON-Schema-Datei (Draft-Version, `$id`, `$ref`-Struktur) — spezifiziert, nicht gebaut.
- Konkrete Checker-Implementierung (Python-Bibliotheken, Ausgabeformat, Exit-Codes).
- Genaue `tests/index.html`-Erzeugung (Build-Skript vs. Laufzeit-Fetch).
- Verschieben/Un-ignoren der realen Fixtures und Legacy-Dateien (Migration, spätere APs).
- KEEP/MERGE/DELETE der Dublette und der 5 Überschneidungsgruppen (TESTENV-1a §6/§14).
- Abschließende De-Scope-Entscheidung für die 2 Design-System-Seiten (an Design-System-Domäne).

## 13. Advocatus-diaboli-Prüfung

Für jede Regel geprüft, wie sie ein falsches GRÜN erzeugen könnte:

- **veraltetes Manifest / toter Eintrag:** Checker prüft Pfadexistenz case-sensitiv + Datei-↔-Manifest-Gleichheit; toter Eintrag = Fehler (§16.2/16.8).
- **nicht registrierte Test-HTML:** Scan außerhalb Scratch = Fehler (§16.1); Scratch ist die einzige, explizit gitignorete Ausnahme.
- **falsche Ausnahme / Windows kaschiert Linux-Bruch:** Pfad-/Fixture-Prüfung case-sensitiv erzwungen (§5.3/§10.1) — genau der `scenario_6_decimals.csV`-Fall aus `TESTENV-1aR`.
- **Kommentar behauptet Absicht, Datei widerspricht:** Kommentare haben keine Vertragswirkung (§8.3); nur `data-fw-*` zählt.
- **Launcher weicht vom Manifest ab:** Launcher ausschließlich aus Manifest; Karte ohne Eintrag = Fehler; aktiver sichtbarer Eintrag ohne Karte = Fehler (§15/§16.13/16.14).
- **HTML ↔ Manifest widersprechen sich:** 5 doppelte Felder MÜSSEN identisch sein; Widerspruch = harter Fehler (§5.4/§16.8).
- **unbekannte Capability still akzeptiert:** Enum + `additionalProperties:false`; Freitext verboten (§7.4/§16.6).
- **`migration-pending` bleibt dauerhaft:** `since`+`migrationTarget` Pflicht; Checker-Zensus macht jeden Übergang in jeder Ausgabe sichtbar (§4.3/§16.16).
- **`usesChartJs` aus Dateiname geraten:** aus Profil+Capabilities abgeleitet und gegen reale Script-Tags geprüft (§11.5/§16.20).

## 14. Ockhams-Rasiermesser-Prüfung

Kleinster tragfähiger Vertragskern gewählt: HTML-Deklarationen + zentrales Manifest + JSON Schema
+ Python-Checker + daraus lesender Launcher. **Bewusst nicht** eingeführt: kein Testframework,
kein npm-Zwang, keine Datenbank, kein zweites Metasystem, kein `prototype`-Reifegrad, kein
`empty`-Ergebnistyp, keine Fixture-Metadaten, keine dritte Capability-Kopie. Doppelte Felder auf
5 sicherheitsrelevante begrenzt. Ein Vokabular an einer Maschinenstelle (Schema-Enum).

## 15. Via-negativa-Prüfung

Aus dem Zielbild entfernt: CDN-Laufzeitabhängigkeiten (§11.4), implizite Profile, Dauerklassen
`unknown/misc/other/legacy`, stille Sonderpfade, comment-only-Ausnahmen, manuell doppelte Indizes
(§15), unversionierte Pflichtdaten (§10.1), Dateinamen als alleinige Semantik (§7.1/§12.3), freie
Capability-Texte (§7.4), automatische ID-Ableitung aus Pfaden (§7.1), unbefristete
Übergangszustände (§4.3). Jeder Ausschluss ist als verbotener Zustand (§16) verankert.

## 16. Invert-always-invert-Prüfung

Zuerst die 21 verbotenen Fehlerzustände entworfen (§16 Vertrag), daraus Pflichtfelder, Enums und
Checker-Regeln abgeleitet: „Widerspruch doppelter Felder" → 5-Felder-Gleichheitsprüfung;
„undeklarierte gebrochene Referenz" → `intentional-broken-ref`/`external-url`-Pflicht +
Referenz-Abgleich; „unbefristeter Übergang" → `since`+`migrationTarget`+Zensus; „ID aus Pfad" →
Profil-Präfix-Gegenprüfung + entkoppelter stabiler Name; „CDN-Pflicht" → lokale Ladeprüfung.

## 17. Scope-QA

- Nur **zwei** Dateien neu: `docs/testing/HARNESS_CONTRACT.md` und diese Ergebnisdatei.
- Ordner `docs/testing/` neu angelegt (vom Auftrag §8 erlaubt).
- **Nicht** gebaut: Manifest, JSON Schema, Checker, Launcher, Fixtures, Scratch-Zone.
- **Nicht** angefasst: Legacy-Seiten, Fixtures, `.gitignore`, Chart.js-Verweise, Vendor-Datei,
  App-Ordner. Keine Datei verschoben, gelöscht oder modernisiert.
- Kein Commit, kein Push, kein Abschlussritual.
- Temporär: nur `sha256sum`/`ls` read-only, keine Artefakte im Repository hinterlassen.

`git status` bei Abschluss: nur die 2 neuen Dateien unter `docs/` (plus die sitzungseigene
`session-log.md`-Änderung des `/start`).

## 18. Wiederlesen / Datei-Wahrheit

- Beide Zieldateien nach dem Schreiben vollständig neu vom Datenträger gelesen.
- Gegen die realen Quellen zurückgeprüft: App-Ordner-Zahl 25 (eigener `ls`, deckt sich mit
  `TESTENV-1aR`), Vendor-Version v4.5.0 + SHA-256 (eigener `sha256sum`), Case-Mismatch-Datei
  `scenario_6_decimals.csV` und gebrochene Referenz `bd_daily_90d.csv` als Auflösungsauflagen
  korrekt der richtigen Seite (#17 `index_linien.html`, #15 `index_linen_2.html`) zugeordnet —
  gemäß `TESTENV-1aFR`-korrigiertem Stand, nicht dem ursprünglichen Fehlstand.
- Alle 23 Inventarzeilen einzeln gegen die §18-Tabelle abgeglichen: 23 Zeilen, Summe der Profile
  (1 app + 19 engine + 1 engine-Sonderfall `Theme/index.html` + 2 tooling) = 23.
- Kein KEEP/MERGE/DELETE, keine Migration, kein Bau im Text (Gegenprobe: §12/§17/§19 des Vertrags
  weisen alles Bauen ausdrücklich TESTENV-1c zu).

## 19. Nächster AP

**Bei GRÜN (dieser Status): `TESTENV-1bR` — Harness-Vertrag unabhängig gegen Inventar und
Fehlerfälle prüfen.**

Erst nach dessen GRÜN: `TESTENV-1c` — Manifest, JSON Schema und read-only Harness-Checker bauen.

Ausdrücklich **nicht** der nächste AP: Legacy-Seiten migrieren, Fixtures verschieben, `.gitignore`
ändern, Chart.js-Verweise umbauen, Dateien löschen, Launcher bauen, committen.

Weiter nur nach Alberts OK.
