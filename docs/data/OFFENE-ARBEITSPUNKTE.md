Stand: 2026-06-04 | Geändert von: Claude | Session: konsistenzpatch-datenlayer

# Offene Arbeitspunkte — Datenlayer Finanzwesir 2.0

---

## AP-DATA-01: Quellenrecherche MSCI World Net Return

**Priorität:** hoch
**Status:** abgeschlossen | 2026-06-04

**Ziel:**
Eine belastbare Quelle für MSCI World Net Return Monatsdaten finden.

**Akzeptanzkriterien:**
- Quelle liefert MSCI World, nicht ETF
- Return-Variante ist eindeutig Net Return
- Währung ist eindeutig dokumentiert
- Monatsdaten sind verfügbar oder sauber auf Monatsultimo reduzierbar
- Startdatum und Enddatum sind dokumentiert
- Quelle ist reproduzierbar dokumentiert
- Wenn nur MSCI direkt ab 31.01.2002 verfügbar ist: das als sauberer Mindeststand dokumentieren

**Bekannter Ausgangspunkt:**
MSCI direkt liefert Net Return ab 29.12.2000 (USD und EUR verfügbar). Startdatum korrigiert 2026-06-04 — tatsächlicher erster Datenpunkt aus historyIndex.xls. Frühere Annahme (31.01.2002) war nicht belegt.

**Teilentscheidungen:**
- B-01-B Währung: **EUR — entschieden 2026-06-04.** Pflichtbedingung. CSV-Werte müssen EUR-Suffix enthalten (`1234,56 EUR`). App prüft `unitKey === CURRENCY_EUR` nach Datenladen; Abweichung → Error State (c). Keine Ausnahme.
- B-01-C Quelle: **MSCI direkt (msci.com), Tier 0, EUR, ab 2000-12-29 — entschieden 2026-06-04.** Dataset Contract: `docs/data/contracts/msci-world-net-return-monthly.md`.

---

## AP-DATA-02: Prüfung archivierter MSCI-Dateien

**Priorität:** mittel
**Status:** offen

**Ziel:**
Prüfen, ob alte MSCI-Originaldateien mit längerer Historie existieren.

**Quellenarten:**
- Alte MSCI-Excel-Dateien
- Archivierte Downloads
- Wayback-Funde
- Historische MSCI-Factsheets
- Referenzierte Dateien in Wikipedia, Foren oder alten Artikeln

**Akzeptanzkriterien:**
- Datei stammt nachvollziehbar von MSCI oder einer eindeutig seriösen Quelle
- Variante, Währung und Frequenz sind eindeutig
- Keine Verwendung, wenn unklar ist, ob es Net Return ist

---

## AP-DATA-03: Quellenbewertung Yahoo / Investing / Stooq

**Priorität:** mittel
**Status:** offen

**Ziel:**
Bewerten, ob öffentliche Portale für MSCI-World-Daten als produktive Quelle,
Prüfquelle oder nur Notquelle taugen.

**Akzeptanzkriterien:**
- Konkrete Ticker / Symbole dokumentiert
- Datenart geklärt: Price, Net Return, Gross Return, ETF, NAV oder Börsenkurs
- Währung geklärt
- Downloadbarkeit geprüft
- Entscheidung dokumentiert: produktiv / Plausibilisierung / nicht verwenden

---

## AP-DATA-04: Dataset Contract für MSCI World Pilot

**Priorität:** hoch — Blocker für Slice-0
**Status:** abgeschlossen | 2026-06-04

**Ziel:**
Ersten konkreten Dataset Contract für den Pilot erstellen.

**Vorgeschlagene Datei:**
`docs/data/contracts/msci-world-net-return-monthly.md`

Das Verzeichnis `contracts/` wird bei Bedarf angelegt. Kurze Begründung vorab.

**Akzeptanzkriterien (aus Template `DATASET-CONTRACT-TEMPLATE.md`):**
- Zweck
- Konsumenten / Apps
- Datenklasse
- Fachliche Definition (Name, Anbieter, Variante, Währung, Frequenz, Start, Ende)
- Quelle (primär, praktisch, Tier, Abrufdatum, Exportmethode, Plausibilitätsprüfung)
- CSV-Schema
- Qualitätsregeln
- Einschränkungen
- LLM-Regeln
- Owner
- Änderungsprotokoll

**Abhängigkeit:** AP-DATA-01 muss vorher mindestens teilweise geklärt sein
(Quelle, Variante, Währung).

**Ergebnis:** Contract angelegt: `docs/data/contracts/msci-world-net-return-monthly.md`. Quelle, Variante, Währung, Frequenz, Startdatum, Einschränkungen, CSV-Schema und Extraktionsparameter sind dokumentiert.

---

## AP-DATA-05: Entscheidung Dateiname produktive CSV

**Priorität:** hoch — Blocker für Dateianlage
**Status:** abgeschlossen | 2026-06-04

**Entschieden:** `msci-world-net-return-eur-monthly.csv` — 2026-06-04.
Ablageort: `Theme/assets/data/b1/`

**Begründung:** Währung EUR durch B-01-B festgestellt (2026-06-04). Entscheidungsregel greift: Währung im Dateinamen aufnehmen.

---

## AP-DATA-06: Optionales Validierungsskript prüfen

**Priorität:** niedrig
**Status:** abgeschlossen | 2026-06-04

**Ziel:**
Prüfen, ob ein externes Validierungsskript sinnvoll ist.

**Wichtig:** Dieses Skript darf den CSVParser nicht ersetzen. Es darf nur
außerhalb des Parsers vorab prüfen:

- Header-Konformität
- Datumsformat
- Monatsultimo-Konformität
- Lückenlose Monatsfolge
- Mindestanzahl Monate
- Numerische Werte (keine leeren Zellen)
- Duplikate

**Akzeptanzkriterium:**
Empfehlung dokumentieren: jetzt bauen / später bauen / nicht nötig.

**Ergebnis:** Validierungsskript wurde als externer Vorab-Konverter/Validator umgesetzt: `tools/raw-to-csv.py`. Es ersetzt den CSVParser nicht und erzeugt nur nach erfolgreichen Checks eine CSV für `Theme/assets/data/b1/`.

**Grenze:** V1 ist für MSCI-EUR-Indexreihen freigegeben. Allgemeinere Nutzung erst nach expliziter Erweiterung, z.B. Parameter für Einheit/Währung und Dezimalstellen.

---

## AP-DATA-07: App-Spec prokrastinations-preis auf Datenlayer umstellen

**Priorität:** mittel
**Status:** abgeschlossen | 2026-06-03

**Ziel:**
Die App-Spec soll auf den zentralen Datenlayer verweisen statt eigene
Quellenregeln vollständig zu duplizieren.

**Akzeptanzkriterien:**
- App-Spec verweist auf `docs/data/`
- App-Spec enthält nur app-spezifische Ergänzungen
- Keine Dopplung der allgemeinen Datenquellenregeln
- Keine Änderung am CSVParser

**Abhängigkeit:** Datenlayer muss stabil sein (diese Datei und DATENQUELLEN-GOVERNANCE.md).

---

## AP-DATA-08: Data Need Snapshot Blaupause für APP_SPEC.md dokumentieren

**Priorität:** mittel
**Status:** abgeschlossen | 2026-06-03

**Ziel:**
Aus dem Pilot `Apps/prokrastinations-preis/APP_SPEC.md` eine entkonkretisierte,
pragmatische Blaupause für den Abschnitt `Datenbedarf / Data Need Snapshot`
ableiten und in `docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md §7a` dokumentieren.

**Begründung:**
Jede APP_SPEC.md soll künftig explizit zeigen, ob und welche Daten sie braucht.
Auch `Benötigter Index: keiner` ist eine wichtige Information. Kein Abschnitt ist
mehrdeutig, weil später unklar bleibt, ob der Datenbedarf vergessen wurde oder
bewusst nicht besteht.

**Akzeptanzkriterien:**

- Die Blaupause ist in `docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md §7a` dokumentiert. ✅
- Die Blaupause enthält einen Minimalblock für jede APP_SPEC.md. ✅
- Die Blaupause enthält einen Detailblock für datengetriebene Apps. ✅
- Die Blaupause unterscheidet: externe Index-/ETF-/Makrodaten / kuratierte JSON-Konfiguration / Modellannahmen / keine externe Datenreihe / Datenbedarf offen. ✅
- Es ist dokumentiert, dass beim Rollout keine Datenbedarfe erfunden werden. ✅

**Nicht-Ziel:**

- Keine Datenquellenrecherche.
- Keine CSV-Anlage.
- Keine Implementierung.
- Kein sofortiger Umbau aller APP_SPEC.md — Rollout: AP-DATA-09.
- Keine Enterprise-Datenstruktur.

---

## AP-DATA-09: Bestehende APP_SPEC.md nach Data-Need-Blaupause angleichen

**Priorität:** mittel
**Status:** offen

**Ziel:**
Alle vorhandenen `APP_SPEC.md` unter `/Apps` strukturell nach der Blaupause
`docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md §7a` angleichen.

**Begründung:**
Jede APP_SPEC.md soll künftig explizit zeigen, ob und welche Daten sie braucht.
Auch `Benötigter Index: keiner` ist eine wichtige Information. Kein Abschnitt ist
mehrdeutig, weil später unklar bleibt, ob der Datenbedarf vergessen wurde oder
bewusst nicht besteht.

**Akzeptanzkriterien:**

- Alle vorhandenen `APP_SPEC.md` wurden geprüft.
- Jede vorhandene `APP_SPEC.md` enthält mindestens den Minimalblock
  `Datenbedarf / Data Need Snapshot`.
- Datenbedarfe werden nicht erfunden.
- Wenn unklar: `offen`.
- Wenn bewusst keine externe Datenreihe nötig ist:
  `keine externe Datenreihe erforderlich` / `keiner`.
- Apps ohne `APP_SPEC.md` bleiben unverändert.
- Abweichungen von der Blaupause werden begründet.

**Nicht-Ziel:**

- Keine Datenquellenrecherche.
- Keine CSV-Anlage.
- Keine Implementierung.
- Keine neuen APP_SPEC.md nur wegen dieses Standards.
- Keine Enterprise-Datenstruktur.
