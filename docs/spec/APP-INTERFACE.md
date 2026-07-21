# App Interface — Finanzwesir 2.0

Stand: 2026-07-21 21:14 | shared-daten-jsonparser-vault-resolver | Geändert von: Claude

**Zweck:** Kanonischer Schnittstellen-Vertrag zwischen Ghost-Content, App-Fabrik-Apps und Chart-Engine.
**Zielgruppe:** Claude, Albert, zukünftige App-Implementierungen.
**Wann lesen:** Vor jeder App-Implementierung oder Änderung an App-HTML-Cards.
**Wann aktualisieren:** Wenn neue App-Attribute, Datenquellen oder Embed-Muster eingeführt werden.
**Gehört hier hinein:** HTML-Card-Attribute, Redakteursverträge, Datenquellen-Regeln, Sicherheitsregeln.
**Gehört nicht hier hinein:** App-spezifische Businesslogik, App-Fabrik-Standard-Details, Redakteursdoku.

---

## 1. Zweck und Status

Diese Datei definiert die öffentlichen Schnittstellen zwischen:
- **Ghost-Content** (Redakteur fügt HTML-Card ein)
- **App-Fabrik-Apps** (neue interaktive Apps, fw-app-Namespace)
- **Chart-Engine** (Legacy-/CSV-Vertrag für bestehende Daten-Charts, `financial-chart-module`)

**Was gehört hinein:**
- Öffentliche Redakteursverträge: Attribute, Syntax, Beispiele
- Datenquellen-Regeln: erlaubte Formate, Domains, Cache-Busting
- Sicherheitsregeln: für alle Apps und Charts gültig
- Fehler- und Empty-State-Standards

**Was gehört nicht hinein:**
- App-spezifische Businesslogik oder Fachregeln
- App-Fabrik-Standard (Dateistruktur, App-Familien, DoD) → `docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md`
- Redakteursdoku und Cheat-Sheets → `docs/editorial/`
- Interne Chart-Engine-Architektur → `docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md`

**Status:** Arbeitsfassung für App-Fabrik-Pilot. Bindend für Pilot-1 nach Alberts expliziter Freigabe. Vollständig kanonisch erst nach Pilot-Validierung und erneuter Freigabe.

---

## 2. Grundsatz

Apps und Charts sind clientseitige JavaScript-Module, die über HTML-Cards in Ghost eingebunden werden.

Ghost liefert Konfiguration über `data-*` Attribute.
Der Code interpretiert diese Attribute als Daten, **niemals als Code**.

Kein Backend ohne explizite Architekturentscheidung.

---

## 3. Öffentliche Redakteursverträge

Zwei Vertragstypen koexistieren. Kein gegenseitiges Überschreiben.

`fw-app` ist der Primärrahmen (Component Composition Architecture). `financial-chart-module` ist ein fortbestehender Legacy-Vertrag innerhalb dieses Modells — vollständig gültig, keine Migration geplant, kein konkurrierendes Architekturmodell.

| Vertrag | Klasse | Wann |
|---|---|---|
| App-Fabrik-Apps | `class="fw-app"` | Alle neuen interaktiven Apps |
| Chart-Engine (bestehend) | `class="financial-chart-module"` | Daten-Charts (line, bar, pie) |

---

### 3.1 App-Fabrik-App-Card

App ohne externe Daten:

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis">
</div>
```

App mit CSV-Daten:

```html
<div class="fw-app"
     data-fw-app="geburtsjahrlos"
     data-fw-data="msci-world.csv">
</div>
```

App mit JSON-Konfiguration:

```html
<div class="fw-app"
     data-fw-app="risiko-uebersetzer"
     data-fw-config="risiko-uebersetzer-config.json">
</div>
```

App mit Optionen:

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis"
     data-fw-options="defaultRate:300, years:30">
</div>
```

**Attribut-Referenz:**

| Attribut | Status | Zweck |
|---|---|---|
| `class="fw-app"` | Pflicht | Identifiziert den Container als App-Fabrik-App |
| `data-fw-app="[slug]"` | Pflicht | App-Slug, bestimmt welche App geladen wird |
| `data-fw-data="[dateiname].csv"` | Optional | Vollständiger, kanonischer Dateiname einschließlich Suffix (`^[a-z0-9_-]+\.csv$`) einer lokal geprüften CSV. Kein Protokoll, keine Domain, kein Pfad, kein Slash, kein Query-String, kein Fragment. Engine bildet zentral `/content/files/app-data/<dateiname>` (reine Präfixbildung, `<dateiname>` bereits mit `.csv`). Analog `data-app-file` (§3.2), aber eigener Attributname und eigener Parser. |
| `data-fw-config="[dateiname].json"` | Optional | Vollständiger, kanonischer Dateiname einschließlich Suffix (`^[a-z0-9_-]+\.json$`) einer lokal geprüften JSON-Config. Kein Protokoll, keine Domain, kein Pfad, kein Slash, kein Query-String, kein Fragment. Engine bildet zentral `/content/files/app-data/<dateiname>` (reine Präfixbildung, `<dateiname>` bereits mit `.json`). |
| `data-fw-options="[key:val]"` | Optional | Kleine Inline-Overrides, key:value-Syntax |
| `data-fw-theme="[enum]"` | Reserviert | Theme-Override — reserviert, noch nicht implementiert. Nicht produktiv in Ghost-Cards verwenden. Nur über Enum-Whitelist, wenn implementiert. |

**Was niemals in `data-*` Attribute gehört:**
- Freies JSON direkt im HTML (`data-fw-options='{"key": "value"}'`) — Fehlerquelle für Redakteure
- URL, Protokoll, Domain, Pfad, Slash, Query-String oder Fragment in `data-fw-data` / `data-fw-config` — nur der reine Dateiname ist erlaubt (kein URL-Kompatibilitätsmodus, keine Dev-Ausnahme)
- Ausführbarer Code jeder Art
- Nutzerdaten oder personenbezogene Informationen

---

### 3.2 Chart-Card (Legacy-Vertrag / Bestandsschutz)

Bestehender Vertrag — bleibt vollständig gültig, wird nicht auf fw-app migriert. Produktive Cards
verwenden `data-app-file` (Stand seit APP-DATA-04b, 2026-07-20):

```html
<div class="financial-chart-module"
     data-type="line"
     data-title="Rendite-Vergleich (5 Jahre)"
     data-app-file="rendite-vergleich.csv"
     data-colors="World: #0071BF, ACWI: #218380"
     data-options="range:5y, benchmark:ACWI">
</div>
```

**Attribut-Referenz:**

| Attribut | Status | Zweck |
|---|---|---|
| `class="financial-chart-module"` | Pflicht | Identifiziert den Container als Chart-Engine-Chart |
| `data-type="line\|bar\|pie"` | Pflicht | Chart-Typ |
| `data-title="..."` | Optional | Sichtbarer oder interner Titel |
| `data-app-file="[dateiname].csv"` | Pflicht bei produktiven, datengetriebenen Charts | Vollständiger, kanonischer Dateiname einschließlich `.csv` (`^[a-z0-9_-]+\.csv$`) einer lokal geprüften, per FileZilla übertragenen CSV. Engine bildet zentral `/content/files/app-data/<dateiname>` (reine Präfixbildung — `ChartEngine.js`: `'/content/files/app-data/' + appFile`, kein zusätzlich angehängtes `.csv`). Exklusiv zu `data-csv`. Ablauf: `docs/editorial/CSV-APP-DATEN-WORKFLOW.md`. |
| `data-csv="[pfad]"` | Nur für Testseiten (`tests/engine/`) | Vollständiger, direkt nutzbarer relativer oder erlaubter URL-Pfad. Kein bloßer Dateiname. Nicht für produktive Cards verwenden. |
| `data-colors="Name: #HEX, ..."` | Optional | Name-Farbe-Paare |
| `data-options="key:val, ..."` | Optional | Chart-Optionen, key:value-Syntax |

**Regeln für Chart-Cards:**
- `data-type` nimmt `line`, `bar` oder `pie`
- `data-options` ist eine einfache `key:value, key:value`-Syntax — kein komplexes JSON
- `data-colors` enthält Name-Farbe-Paare: `Name: #HEX, Name2: #HEX`
- Die Chart-Engine wird vorerst nicht auf den `fw-app`-Namespace migriert
- `data-app-file` und `data-csv` sind gegenseitig exklusiv — nie beide, nie keines. Der frühere HTTP-Upload-Dienst (`tools/upload-dienst/`, Port 4790) ist zurückgebaut; er ist kein Weg zu diesen Daten mehr.

---

## 4. Interner Entwicklervertrag

Architektonisches Grundmodell: Finanzwesir-Apps sind Kompositionsflächen (Component Composition Architecture). Ein Chart ist eine Komponente innerhalb dieser Komposition — kein architektonischer Sonderfall.  
→ `docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md` §1a

Apps bauen keine Charts direkt. Sie nutzen die Chart-Engine als Subsystem.

Die ChartEngine bietet zwei offizielle Einstiege in dieselbe Visualisierungspipeline:

**Pfad 1 — Deklarativer Init-Pfad** (`init(scope)` oder funktional gleichwertig): Scannt einen DOM-Scope nach `financial-chart-module`-Containern, lädt CSV, rendert. Bestehender, vollständig gültiger Pfad.

**Pfad 2 — Daten-Bridge-Pfad** (`renderFromData(container, data, type, options)` oder funktional gleichwertig): Nimmt app-berechnete, validierte, versiegelte Daten entgegen und rendert durch dieselbe interne Pipeline. Kein Sonderweg — offizieller Einstieg.

**Verantwortungsgrenzen (nicht verhandelbar):**
- App: Domänenlogik, KPI-Berechnung, Slider-/Screen-State, App-State
- ChartEngine: Visualisierung, Tooltip, Legende, Theme, A11y, Chart-State, Smart Update

Lifecycle-Vertrag und genaue API-Signaturen werden in einem separaten Gate festgelegt, wenn ChartEngine.js implementiert wird. Er ist nicht Teil des Redakteursvertrags (§3) und erscheint nicht in Ghost-HTML-Cards.

**In-App-Chart-Zielcontainer (Pfad 2 — intern):**

App-berechnete Charts erhalten einen separaten Zielcontainer — unterschieden vom deklarativen CSV-Container durch einen eigenen Marker:

- Marker: `fw-appchart` (genaue Form — class oder data-Attribut — wird im ChartEngine-Gate festgelegt)
- Die App findet diesen Container lokal innerhalb ihrer eigenen DOM-Hülle — kein globaler DOM-Scan
- Kein `data-csv`, kein `financial-chart-module` auf diesem Container
- Kein Redakteursvertrag: erscheint nicht in Ghost-HTML-Cards, nur in App-Templates

**Container-Guard (Pflicht):** Kein Container darf zweimal initialisiert werden. Schutz gegen Doppelinitialisierung, doppelte Event-Listener, doppelten Chart-State und Mischbetrieb. Konkrete Implementierung im ChartEngine-Gate.

Änderungen an der Chart-Engine erfordern ein separates Gate und explizite Freigabe durch Albert.

---

## 5. data-options / data-fw-options

Beide Attribute folgen derselben Syntax: `key:value, key:value`

**data-fw-options (App-Fabrik-Apps):**
- Nur für kleine, menschlich lesbare Overrides
- Maximal 3–4 einfache Parameter — mehr gehört in eine JSON-Config-Datei (`data-fw-config`)
- Kein komplexes JSON in `data-fw-options`
- Keine Anführungszeichen innerhalb der Optionen
- Unbekannte Keys werden vom App-Bootstrapper ignoriert (Whitelist-Prinzip)
- Jede App definiert ihre eigene Whitelist in `APP_SPEC.md`

**data-options (Chart-Cards):**
- Dieselbe `key:value`-Syntax
- Whitelist pro Chart-Typ; unbekannte Keys werden ignoriert
- Kein komplexes JSON

---

## 6. Datenquellen

| Zweck | Format | Wer erstellt |
|---|---|---|
| Tabellarische Zeitreihen (Renditen, Verläufe) | CSV | Claude / Entwicklung |
| Strukturierte Konfiguration (Slider-Defaults, Texte, Szenarien) | JSON | Claude auf Basis Albert-Input |
| Kleine Inline-Overrides im Ghost-Card | `data-fw-options` | Redakteur direkt in Ghost |

**`data-fw-data` / `data-fw-config` (fw-app, §3.1):** kein URL-Feld — ausschließlich ein geprüfter Dateiname (→ SEC-04, `01_DECISION_LOG.md`). Beide Attribute nutzen denselben produktiven `app-data`-Lieferweg wie `data-app-file`: lokaler Offline-Prüfer, dann FileZilla-Übertragung nach `Ghost/content/files/app-data/`, zentral aufgelöst zu `/content/files/app-data/<dateiname>`. Eigener Attributname und eigener Parser je Datentyp (CSV vs. JSON) bleiben erhalten — keine Zusammenlegung mit `data-app-file`. Kein dynamisches Nachladen aus Domains, keine Dev-Ausnahme.

**Chart-Card-Daten (`data-app-file`, §3.2):** derselbe eigene, geprüfter Weg über `content/files/app-data/`
— lokaler Offline-Prüfer, dann FileZilla-Übertragung nach `Ghost/content/files/app-data/`. Kein
HTTP-Upload-Dienst, kein Ghost-Editor-Upload-Feld für diesen Pfad. Vollständiger Ablauf:
`docs/editorial/CSV-APP-DATEN-WORKFLOW.md`.

**Nur noch für tatsächlich externe Quellen und den Chart-Testpfad (`data-csv`, `tests/engine/`) relevant — Domain-Lock:**
- `https://www.finanzwesir.com/...` (Ghost-Upload-Pfade)
- Lokale Entwicklungs-URLs (`localhost`, `127.0.0.1`) nur in Dev-Testseiten — explizit als Dev-Ausnahme markieren

**Verboten:**
- Beliebige Fremd-URLs ohne explizite Architekturentscheidung
- Dynamische Script-Interpretation aus Datenattributen

**CSV-Lademechanismus (D-04):**
Alle Apps, die `data-fw-data` nutzen, laden CSV über `CSVParser.js` (`Theme/assets/js/fw-chart-engine/data/CSVParser.js`). CSVParser.js ist shared App-Fabrik-Infrastruktur — keine App schreibt eigene Parser-Logik. Die Chart-Engine nutzt denselben Mechanismus. Rückgabe: `FinanzwesirData` mit `unitKey`, bereinigten Werten und `Date`-Objekten. Beide Dateien sind TABU (nicht ändern).

**JSON-Lademechanismus:**
Alle Apps, die `data-fw-config` nutzen, laden JSON über `JSONParser.js` (`Theme/assets/js/fw-chart-engine/data/JSONParser.js`) — strukturelle Geschwisterdatei von `CSVParser.js`: gleicher URL-Gate, gleicher Fetch-/HTTP-/Fehlerrahmen, fetch-freier Kern `parseJsonText(text, config)`. `JSONParser.js` und der Vault `FinanzwesirJsonData.js` sind shared App-Fabrik-Infrastruktur — kein Universalparser, keine Stationssemantik oder sonstige App-Fachlogik im Parser selbst. App-Code liefert den app-spezifischen `options.validator` (Funktion, liefert `{ ok: true }` oder `{ ok: false, code?, detail? }` — Vertrag identisch zum bestehenden `validateStationsJson()`). Rückgabe: `FinanzwesirJsonData` mit rekursiv eingefrorenen Nutzdaten (`data`) und Metadaten (`metadata`, mindestens `source: 'JSON'` und `parsedAt`). Zentraler Dateinamen-Resolver für beide Formate: `AppDataResolver.js` (`resolveCsvAppDataFile`, `resolveJsonAppDataFile`).

**Regeln:**
- CSV und JSON werden als Daten behandelt — niemals als Code
- Schwere Datenaufbereitung läuft nicht im Browser — vorverarbeitete Ergebnisdatei bereitstellen
- Der Redakteur bearbeitet JSON-Config-Dateien nicht direkt — zu fehleranfällig

---

## 7. Sicherheitsregeln

Alle `data-*` Attribute sind untrusted input — keine Ausnahme, auch bei intern erstellten Cards.

1. **Keine Code-Ausführung aus Datenattributen.** CSV und JSON sind Daten, keine Programmierschnittstelle.
2. **SafeDOM:** Nutzdaten nie via `innerHTML` — nur `textContent` oder sichere Renderer.
3. **Whitelist-Prinzip für `data-fw-options` / `data-options`:** Nur bekannte Keys werden verarbeitet, unbekannte stillschweigend ignoriert.
4. **Slug-Whitelist für `data-fw-app`:** Nur bekannte App-Slugs werden geladen.
5. **Dateinamenvalidierung:** `data-fw-data` (`^[a-z0-9_-]+\.csv$`) und `data-fw-config` (`^[a-z0-9_-]+\.json$`) gegen die Grammatik prüfen — keine URL, keine Domain, kein Pfad. Zentraler Resolver bildet `/content/files/app-data/<dateiname>`. Fehlschlag → Empty-State, kein Crash.
6. **CSV/JSON validieren** vor Verwendung: Format, Pflichtfelder, Wertebereich.
7. **Empty-State statt Crash:** Ungültige oder fehlende Daten führen zu einem sauberen Fehlerzustand, keinem technischen Absturz.
8. **Keine geheimen Tokens im Frontend.**
9. **Keine externen CDN-Abhängigkeiten** ohne explizite Architekturentscheidung und Eintrag im DECISION-LOG.
10. **Kein permanentes `Date.now()` Cache-Busting im Live-Modus** — zerstört Browser- und CDN-Caching.

---

## 8. Fehler- und Empty-State

Jede App und jeder Chart muss alle Fehlerfälle behandeln:

- Kein leerer Container
- Kein Stacktrace für Endnutzer
- Keine rohen technischen Details
- Fehlermeldung auf Deutsch, für Redakteur verständlich
- Sichere Ausgabe ausschließlich über `textContent`

Beispiel für nutzerfreundliche Fehlermeldung:

```
Daten konnten nicht geladen werden.
Bitte CSV-Pfad und Format prüfen.
```

Dev-Testseiten (`app.test.html`) dürfen technische Zusatzinfos anzeigen.

**State-Pflicht für Apps:**

```
Loading → Content
       → Error
       → Empty
```

**Verbindliche Taxonomie (AP-tailwind-02d, 2026-07-13):**

```
Loading: Daten werden geladen.
Content: nutzbare Daten.
Empty: gültige Card und gültige Daten, aber ein leeres Ergebnis ist erwartbar.
Error / role="alert": Card-Konfiguration, Laden, Domain-Lock, Datenformat,
fehlende Pflichtspalten oder unzureichende Pflichtdaten verhindern ein verlässliches Ergebnis.
```

Fehlende oder unvollständige Daten sind **Error**, nicht Empty — sie verhindern ein
verlässliches Ergebnis. Empty gilt ausschließlich, wenn Card und Daten gültig sind und ein
leeres Ergebnis fachlich erwartbar ist (z. B. kein Datenpunkt im gewählten Zeitraum).

---

## 9. Cache-Busting

Gilt für CSV- und JSON-Datendateien.

**Für produktive `data-fw-data` / `data-fw-config` / `data-app-file` (Card-Attribute, reiner Dateiname, kein URL-Feld):**
- **Ausschließlich:** versionierter Dateiname (z. B. Datum oder Build-Version im Namen).
- Kein Query-Parameter (`?v=...`) und kein `Date.now()` in Card-Attributen — beide setzen ein URL-Feld voraus, das es für diese Attribute nicht mehr gibt (→ SEC-04, `01_DECISION_LOG.md`).

**Der bestehende `data-csv`-Testpfad (`tests/engine/`, §3.2) bleibt davon unberührt:**
- **Bevorzugt:** expliziter Versionsparameter, z.B. `?v=2026-05-10`
- **Dev-Modus:** optional `Date.now()` zum Debuggen erlaubt
- **Live-Modus:** kein permanentes `Date.now()` bei jedem Seitenaufruf

---

## 10. Übergang / offene Punkte

| Punkt | Status |
|---|---|
| `AUTHOR_GUIDE-v3.md` nutzt `data-app` statt `data-fw-app` | Harmonisierung nach Pilot 1 — BACKLOG AF-04 |
| Redakteurs-Cheat-Sheet für fw-apps fehlt | Erstellen nach Pilot 1 — BACKLOG AF-05 |
| ChartEngine-Einstiegspfade (interner Entwicklervertrag §4) | Beschlossen: zwei Pfade (deklarativ + Bridge), gemeinsamer Kern — OA-02-Dissens-2. Lifecycle und API-Signaturen: separates Gate bei ChartEngine.js-Implementierung. |
| `data-fw-theme` | Reserviert — noch nicht implementiert. Nicht produktiv in Ghost-Cards verwenden. Nur über Enum-Whitelist, wenn implementiert. |

Bestehende Ghost-HTML-Cards mit `data-app` (falls vorhanden): funktionieren weiterhin, solange kein Bootstrapper für `fw-app` aktiv ist. Kein Breaking Change im Pilot.

---

## 11. Verhältnis zu anderen Dokumenten

| Dokument | Rolle |
|---|---|
| `docs/spec/APP-INTERFACE.md` (diese Datei) | Kanonische Schnittstellen-Spec: Attribute, Datenquellen, Sicherheitsregeln |
| `docs/App-Fabrik/03_APP_FACTORY_STANDARD_DRAFT.md` | App-Fabrik-Gesamtstandard: App-Familien, Dateistruktur, DoD, Architekturprinzipien |
| `docs/App-Fabrik/CHART_ENGINE_ROLE_AND_INTEGRATION.md` | Rolle der Chart-Engine, Architekturprinzipien P-01–P-10 |
| `docs/editorial/AUTHOR_GUIDE-v3.md` | Redakteursdoku — wird nach Pilot 1 harmonisiert (AF-04) |
| `docs/editorial/Cheat-Sheet HTML-Karten.md` | Chart-spezifische Redakteursdoku — bleibt Chart-spezifisch |
| `docs/editorial/CSV-APP-DATEN-WORKFLOW.md` | Kanonischer Ablauf: CSV lokal prüfen → FileZilla → `data-app-file` |
| `docs/steering/audits/SECURITY-BASELINE.md` | Sicherheits-Baseline — vor App-Arbeit pflichtweise lesen |
