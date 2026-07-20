# Inhaltlicher Übergabeprompt — CSV-Upload-Pipeline (APP-DATA-00 bis 03a) abgeschlossen (Stand 2026-07-20)

Für: frischen Steuerungsfaden. **Nur Inhalt** — der Arbeitsmodus (Anamnese, Datei-Wahrheit, Werkzeugwahl, Stop-Regeln, AP-Muster) kommt aus dem **taktischen Startprompt** (`docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md`), der zusätzlich mitgegeben wird. Diese Kapsel ersetzt die Historie des alten Fadens; alles Entschiedene liegt versioniert in den unten referenzierten Dateien.

## Stand: APP-DATA-00 bis APP-DATA-03a — ABGESCHLOSSEN, nicht committed

| Ergebnis | Status |
|---|---|
| APP-DATA-00: Parser-Verhaltensmatrix, Bar-Vertrag bestätigt intakt, `data-csv` ohne belegte Live-Nutzung | GRÜN (reine Anamnese) |
| APP-DATA-01: Architekturvertrag für lokalen Upload-Dienst festgelegt | GRÜN (reiner Entwurf) |
| APP-DATA-02: `CSVParser.js`-Kern als `parseCsvText()` extrahiert, `tools/upload-dienst/` gebaut, alle Pflichtnachweise grün, Snapshot-Plausibilitätslücke (von Albert live gefunden) gefixt | GRÜN, Full-Gate + Alberts „ok, setze um" |
| APP-DATA-03a: Offline-CSV-Prüfer (`content/files/app-data/`) gebaut, live von Albert getestet | GRÜN, mit Nutzer-Delta über den Patch hinaus (siehe unten) |

## Wichtige Abweichung vom Patch-Text — für Folge-Patches verbindlich

`PATCH-APP-DATA-03a` schrieb „Keine Datenform-Heuristik" fest (Albert sollte `dataForm` manuell in `csv-contract.json` pflegen). Nach dem ersten echten Doppelklick-Testlauf lehnte Albert das explizit ab: „Menschen, die was in JSON eintragen, machen nur Fehler." Verbindliche neue Regel: der Offline-Prüfer erkennt die Datenform automatisch, indem er jede CSV gegen **beide** Interpretationen mit `parseCsvText()` testet. Strukturelle Ausschließlichkeit (nie beide grün): „Zeitreihe" verlangt über den bestehenden GATEKEEPER zwingend durchgängig echte ISO-Daten in Spalte 1; „Snapshot" schließt explizit aus, dass alle Kategoriewerte wie ein Datum aussehen. `csv-contract.json` wird nicht mehr gelesen, sondern nach jedem Lauf automatisch aus dem Erkennungsergebnis geschrieben (reines Protokoll, keine Eingabe mehr).

Das ist die **zweite** Instanz in dieser AP-Kette, in der eine „keine Heuristik"-Vorgabe nach echtem Praxiskontakt von Albert aufgehoben wurde (erste: Snapshot-Plausibilitätsfix im Upload-Dienst, APP-DATA-02). Für künftige Patches im Datenform-Themenfeld: automatische Erkennung mit klar bestätigtem Report ist Alberts bevorzugter Standard, nicht manuelle Deklaration — außer es gibt einen strukturellen Grund, warum Erkennung nicht funktionieren kann.

## Tabu-Zonen-Hinweis für Folge-Patches

`.claude/PROTECTED_PATHS.json` markiert `CSVParser.js`/`FinanzwesirData.js` als `forbidden` (härter als CLAUDE.md's generische Tabu-Regel), mit eigenem mechanischem Pre-Edit-Hook (exit 2). Ein Full-Gate-OK von Albert reicht allein nicht, um den Hook zu passieren — nötig ist eine temporäre Herabstufung auf `protected` in der JSON-Datei selbst, mit Alberts expliziter Zustimmung dazu, danach Rückstufung. Für APP-DATA-02 einmalig gemacht und bereits zurückgestuft. Jeder Patch, der diese beiden Dateien erneut anfassen muss, sollte diesen Ablauf im Prompt vorab nennen.

## Maßgebliche Wahrheitsquellen

1. `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` (KDR 4 Polymorphe Datenhaltung, KDR 1 Layer 1 Vault) — bindend für `expectDate`-Semantik.
2. `docs/steering/patches/PATCH-APP-DATA-00-2026-07-20.md` bis `PATCH-APP-DATA-03A-2026-07-20.md` — vollständige Auftragshistorie, inkl. der jeweiligen „Feste Grenzen".
3. `Theme/assets/js/fw-chart-engine/data/CSVParser.js` (V4.5.0) — gemeinsamer Parser-Kern, `parseCsvText()` als fetch-freier Export.
4. `tools/upload-dienst/` — lokaler HTTP-Upload-Dienst, inkl. Snapshot-Plausibilitätsfix in `server.js`.
5. `content/files/app-data/csv-validator.mjs` (V2.0.0) — Offline-Prüfer mit automatischer Datenform-Erkennung; `content/` ist ein **eigenständiges Git-Repo** (eigenes `.git`/`.gitignore`), nicht Teil des Code-Repos.
6. `tests/csv-validator.test.mjs` — automatisierter Nachweis, isolierte Temp-Ordner, keine Artefakte unter `content/files/app-data/`.

## Offen / bewusst nicht Teil dieser Kette

- `data-app-file`-Card-Vertrag (Ghost-seitige Einbindung der hochgeladenen/geprüften CSVs) — in 01/02/03a durchgängig ausgeklammert, jetzt ist die Voraussetzung (geprüfte Dateien an einer stabilen URL) erfüllt.
- Doppelte Header / abweichende Spaltenzahl in `CSVParser.js` — seit APP-DATA-00 unverändert offene, unbelegte Vertragsfrage, in keinem Folge-AP angefasst.
- Keine Commits durchgeführt — liegt bei Albert (Git-Staging-Konvention dieses Projekts, gilt für Code- und Content-Repo).

## Erster AP im neuen Faden

Vorschlag: `data-app-file`-Card-Vertrag als eigener Anamnese-/Architektur-AP, analog zum Muster APP-DATA-01 (erst Vertrag, dann Umsetzung). Keine Entscheidung, nur Vorschlag — Albert entscheidet den nächsten Schritt.
