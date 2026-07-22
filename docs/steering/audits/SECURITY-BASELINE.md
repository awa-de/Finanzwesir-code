Stand: 2026-07-22 09:00 | Session: theme-bootstrapper-runtime | Geändert von: Claude
Hinweis: §6.5/§6.9/§7 auf Dateinamenvertrag für data-fw-data/data-fw-config umgestellt (→ 01_DECISION_LOG.md SEC-04); §6.9 Umsetzungsstatus + Theme-Pfade ergänzt (→ 01_DECISION_LOG.md SEC-05)

# Security Baseline — Finanzwesir 2.0

**Zweck:** Übergeordnete Sicherheitsprinzipien und Gate-Prüfpunkte für alle Änderungen mit Angriffsfläche.  
**Zielgruppe:** Claude und Albert.  
**Wann lesen:** Bei jeder Änderung an CSV, externen URLs, Script-Tags, Ghost-Templates, Formularen, Nutzerparametern, Apps, HTML-Ausgabe oder App-Fabrik-Embeds.  
**Wann aktualisieren:** Wenn ein neues Sicherheitsrisiko erkannt, eine neue Architekturfläche eingeführt oder eine sicherheitsrelevante Entscheidung getroffen wird.  
**Gehört hier hinein:** Sicherheitsprinzipien, Quellenhierarchie, Gate-Prüfpunkte, Sync-Regeln.  
**Gehört nicht hier hinein:** Performance-Audits, allgemeine Codequalität, Angriffsstudien, Detailkopien von `APP-INTERFACE.md`.

---

## 1. Zweck

Diese Datei ist die übergeordnete Sicherheits-Baseline für Finanzwesir 2.0.

Sie gilt für alle Änderungen mit Angriffsfläche — insbesondere bei:

- Apps, Ghost-HTML-Cards, `data-*` Attributen
- externen Datenquellen (CSV, JSON, URLs)
- Script-Einbindung, Theme-Änderungen
- HTML-Ausgabe, Formularen
- Backend/API (kein Backend ohne explizite Architekturentscheidung)

Die App-Fabrik erhöht die Angriffsfläche systematisch, weil Ghost-HTML-Cards, `data-*` Attribute, externe Datenquellen und clientseitige App-Initialisierung strukturell genutzt werden. Deshalb gelten für App-Fabrik-Apps zusätzliche Regeln (→ §6).

---

## 2. Quellenhierarchie

| Priorität | Datei | Rolle |
|---|---|---|
| 1 | `docs/steering/audits/SECURITY-BASELINE.md` (diese Datei) | Übergeordnete Sicherheitsprinzipien und Gate-Prüfpunkte |
| 2 | `docs/spec/APP-INTERFACE.md` | Kanonische Detail-Spec für `fw-app`, `financial-chart-module`, `data-fw-*`, Datenquellen, Empty-State, Cache-Busting, Schnittstellen-Sicherheitsregeln |
| 3 | `docs/App-Fabrik/APP_FACTORY_IMPLEMENTATION_RFC.md` | Implementation-RFC: Build, Framework, CSS-Isolation, Teststrategie, Bootstrapper-Zielbild, Vertical Slicing, Code-Ablage |
| 4 | `/Apps/{slug}/APP_SPEC.md` | App-spezifische Anwendung: konkrete Whitelist, konkrete Inputs, konkrete Datenquellen, konkrete AppContext-Felder, konkrete Testfälle |

**Regel bei Widerspruch:**

Wenn diese Dateien in Sicherheitsfragen widersprechen:

1. Stoppen.
2. Widerspruch benennen.
3. Nicht still entscheiden.
4. Keine Implementierung beginnen.
5. Alberts Entscheidung einholen.

---

## 3. Grundsatz

Finanzwesir 2.0 ist klein, aber öffentlich.
Das Ziel ist nicht Enterprise-Security, sondern das konsequente Vermeiden vermeidbarer Angriffsflächen.

Die App-Fabrik erhöht die Angriffsfläche, weil Ghost-HTML-Cards, `data-*` Attribute, externe Datenquellen und clientseitige App-Initialisierung systematisch genutzt werden.
Deshalb gelten für App-Fabrik-Apps zusätzliche Regeln (→ §6).

---

## 4. Immer prüfen bei

**Allgemein:**

- Externen URLs
- CSV-Laden
- Script-Einbindung
- Formularen
- Nutzerparametern
- HTML-Injection-Risiko
- Ghost-Template-Änderungen
- Backend, Datenbank, API

**App-Fabrik / fw-app zusätzlich:**

- `fw-app` Embeds und `financial-chart-module` Embeds
- `data-fw-app`, `data-fw-options`, `data-fw-data`, `data-fw-config`
- CSV/JSON-Dateien
- Ghost-HTML-Cards
- App-Bootstrapper
- Theme-/`screen.css`-Änderungen mit App-Auswirkung
- AppContext / Renderer / SafeDOM-Nutzung
- Lokale Testseiten mit produktionsnaher App-Logik

---

## 5. Allgemeine Grundregeln

1. Keine externen Scriptquellen ohne explizite Architekturentscheidung.
2. Externe Datenquellen nur aus erlaubten Domains (→ §7 Domain-Lock).
3. Keine ungeprüfte HTML-Injection.
4. Nutzerparameter nie direkt in HTML schreiben — Standard: `textContent` / sichere DOM-APIs.
5. Keine sensiblen Daten in Git.
6. Keine Active-Campaign-Daten in Git (siehe `PROTECTED_PATHS.json`).
7. Keine geheimen Tokens im Frontend.
8. Kein Backend ohne explizite Architekturentscheidung im Decision Log.
9. Bei Unsicherheit: Änderung stoppen und Security-Frage explizit machen.
10. Keine Sicherheitsentscheidungen still app-lokal treffen.

---

## 6. App-Fabrik / fw-app Sicherheitsregeln

Diese Regeln gelten für alle App-Fabrik-Apps zusätzlich zu §5.

### 6.1 Kanonische Detail-Spec

Für App-Fabrik-Schnittstellen ist `docs/spec/APP-INTERFACE.md` die kanonische Detail-Spec.
`SECURITY-BASELINE.md` definiert die übergeordneten Sicherheitsprinzipien.
`APP_SPEC.md` konkretisiert diese Prinzipien pro App.

Keine parallele zweite Interface-Spec anlegen.

### 6.2 data-* Attribute sind untrusted input

Alle `data-*` Attribute aus Ghost-HTML-Cards gelten als untrusted input — ohne Ausnahme, auch bei intern erstellten Cards.

Sie dürfen nie direkt in DOM, URLs, Imports, Script-Loads oder Berechnungen übernommen werden.
Parsing und Validierung sind Pflicht. Details → `APP-INTERFACE.md §7`.

### 6.3 Slug-Whitelist für data-fw-app

`data-fw-app` darf nur bekannte, erlaubte App-Slugs enthalten.
Unbekannte Slugs führen zu Error-State, nicht zu dynamischem Nachladen beliebiger Dateien.
Slug-Werte dürfen niemals ungeprüft zu Script-URLs zusammengesetzt werden.

### 6.4 data-fw-options Whitelist

`data-fw-options` darf nur einfache, dokumentierte und whitelisted Keys enthalten:

- Unbekannte Keys werden ignoriert.
- Ungültige Werte fallen auf Defaults zurück.
- Kein freies JSON in `data-fw-options`.
- Keine Ausführung von Optionswerten als Code.
- Keine direkte DOM-Ausgabe von Optionswerten.

Jede App definiert ihre Whitelist in `APP_SPEC.md`. Details → `APP-INTERFACE.md §5`.

### 6.5 data-fw-data / data-fw-config

`data-fw-data` und `data-fw-config` enthalten ausschließlich geprüfte Dateinamen — keine URL, keine Domain, kein Pfad (→ SEC-04, `01_DECISION_LOG.md`):

- `data-fw-data`: kanonischer CSV-Dateiname, Grammatik `^[a-z0-9_-]+\.csv$`.
- `data-fw-config`: kanonischer JSON-Dateiname, Grammatik `^[a-z0-9_-]+\.json$`.
- Kein Protokoll, keine Domain, kein Pfad, kein Slash, kein Query-String, kein Fragment und keine URL als Attributwert.
- Der zentrale Resolver bildet ausschließlich `/content/files/app-data/<dateiname>` — derselbe Auslieferungsweg wie `data-app-file` (→ §7 Chart-Card-Ausnahme).
- Es gibt keinen URL-Kompatibilitätsmodus und keine Dev-Ausnahme (`localhost`/`127.0.0.1`) für diese beiden Attribute.
- Ungültige Dateinamen führen zu Error-State, nicht zu Crash.
- Kein dynamisches Script-Laden aus Daten- oder Config-Dateinamen.
- CSV und JSON werden nach der Auflösung vom jeweiligen spezialisierten Parser erneut validiert und versiegelt (Two-Step Parsing).

Details → `APP-INTERFACE.md §6`.

### 6.6 CSV/JSON-Validierung

CSV/JSON wird vor Verwendung validiert:

- Pflichtfelder, Datentypen und Wertebereiche müssen geprüft werden.
- Fehlerhafte Daten führen zu Error-State oder Empty-State.
- Keine stillen Datenkorrekturen ohne dokumentierte Regel.

### 6.7 SafeDOM

Nutzdaten, Config-Texte, Optionswerte und berechnete Werte werden ausschließlich sicher in den DOM geschrieben:

- Standard: `textContent`, `createTextNode`, sichere Attribute.
- `innerHTML` ist für Nutzdaten und Config-Inhalte verboten.
- Ausnahmen brauchen explizite Sicherheitsentscheidung und Decision-Log-Eintrag.

Details → `APP-INTERFACE.md §7` (Regel 2) und `01_DECISION_LOG.md` Q-01.

### 6.8 Error / Empty statt Crash

App-Fehler dürfen die Ghost-Seite nicht zerstören:

- Jede App behandelt Loading, Content, Error und Empty sauber.
- Keine Stacktraces für Endnutzer.
- Fehlertexte auf Deutsch, nutzerverständlich, ohne interne Pfade oder Secrets.

Details → `APP-INTERFACE.md §8`.

### 6.9 Bootstrapper als Sicherheitsperimeter

Der globale fw-app Bootstrapper ist Sicherheitsperimeter:

- Statischer Bootstrapper im Theme-Bundle mit fester Registry/Slug-Whitelist: Registry ist Code im Theme-Bundle, jeder Eintrag ordnet einen Literal-Slug einer statisch importierten Init-Funktion zu.
- Kein Wert aus einem `data-*`-Attribut darf — auch nicht teilweise oder nach Validierung — einen Import-Pfad, eine Script-URL oder einen `import()`-Ausdruck beeinflussen.
- Unbekannter Slug führt zum Error-State; es findet kein Nachladen statt.
- Jeder `.fw-app`-Container erhält eine eigene `try/catch`-Error-Boundary. Doppelinitialisierungs-Guard `data-fw-initialized` bleibt Pflicht.
- Genau ein Theme-Einstieg, analog `fw-chart-engine/index.js`: kein Script pro Ghost-Card, keine Code-Injection pro Seite, kein CDN, kein Loader-Framework, keine Registry-Datei außerhalb des Codes.
- Wachstumspfad (Code-Splitting mit literalen Importpfaden) nur dokumentiert, nicht gebaut — Trigger: einzelne App erreicht ~10× heutige App-Größe.

Stand: Bootstrapper-Strategie freigegeben und im Decision Log verankert (→ `01_DECISION_LOG.md` SEC-04, 2026-07-21). Umgesetzt (→ `01_DECISION_LOG.md` SEC-05, 2026-07-22): einziger Theme-Einstieg `Theme/assets/js/apps/index.js` mit literaler Registry, Pilot-Runtime `Theme/assets/js/apps/prokrastinations-preis.js`. Die Fach-/Testakte bleibt unter `Apps/{slug}/`, keine produktive `app.js` mehr dort.

### 6.10 CSS-Sicherheit / Isolation

- App-CSS nutzt den `fw-app` Namespace.
- Keine globalen CSS-Regeln, die Artikel oder Ghost-Theme unkontrolliert verändern.
- Keine Inline-Styles aus Nutzdaten.
- Theme-Tokens sind erlaubt; Nutzdaten dürfen keine CSS-Werte injizieren.
- Shadow DOM ist keine stille Entscheidung — braucht explizite Architekturentscheidung.

### 6.11 Keine externen Scripts / keine CDN-Abhängigkeiten ohne Entscheidung

- Keine externen Scriptquellen ohne explizite Architekturentscheidung.
- Pilot-1 nutzt keine externen CDN-Abhängigkeiten.
- Neue Abhängigkeiten brauchen Decision-Log-Eintrag.

Allgemeine Regel: keine externen Scriptquellen ohne Architekturentscheidung. Spezialfall D3/TopoJSON lokal bundeln → `01_DECISION_LOG.md` A-08.

### 6.12 Keine Secrets

Keine Tokens, API-Keys, Credentials oder sensiblen Daten in App-Code, Config, CSV, JSON oder Git.
Frontend-Config ist öffentlich zu behandeln.

---

## 7. Domain-Lock

Gilt für tatsächlich externe Datenquellen und den bestehenden Chart-Testpfad — **nicht** für `data-fw-data` / `data-fw-config` bei `fw-app`-Cards (→ SEC-04): Diese beiden Attribute akzeptieren keine URL und damit keine Domain, sondern ausschließlich einen geprüften Dateinamen, den der zentrale Resolver zu `/content/files/app-data/<dateiname>` auflöst (§6.5).

Weiterhin Domain-Lock-pflichtig:

- `data-csv` auf Testseiten (`tests/engine/`, → APP-INTERFACE.md §3.2)
- jede sonstige tatsächlich externe Datenquelle, die künftig per vollständiger URL eingebunden wird

**Aktuell erlaubt (für Domain-Lock-pflichtige Fälle):**

- `https://www.finanzwesir.com/...`
- `https://finanzwesir.com/...` (Weiterleitung — Ziel bei Nutzung explizit klären)
- `localhost` / `127.0.0.1` für lokale Entwicklung, wenn als Dev-Ausnahme dokumentiert

**Verboten:**

- Beliebige Fremd-URLs ohne explizite Architekturentscheidung
- Dynamische Script-Interpretation aus Datenattributen
- Ungeprüfte Weitergabe von Datenquelleninhalten an `innerHTML`

**Regel:**
Claude darf keine beliebigen externen Datenquellen erlauben.
Abweichungen brauchen explizite Architekturentscheidung und Eintrag in `01_DECISION_LOG.md`.

---

## 8. Security-Sync-Regel

Wenn Claude in einer der folgenden Dateien eine Sicherheitsregel ergänzt, verschärft, konkretisiert oder indirekt berührt, muss der Security-Sync geprüft werden:

- `docs/steering/audits/SECURITY-BASELINE.md` (diese Datei)
- `docs/spec/APP-INTERFACE.md`
- `docs/App-Fabrik/APP_FACTORY_IMPLEMENTATION_RFC.md`
- `/Apps/{slug}/APP_SPEC.md`
- `.claude/skills/*`
- `.claude/commands/*`
- Ghost-Theme / `screen.css`
- App-Bootstrapper
- App-Code mit `data-*` Verarbeitung

**Pflichtfragen beim Security-Sync:**

1. Ändert diese Entscheidung `SECURITY-BASELINE.md`?
2. Ändert diese Entscheidung `APP-INTERFACE.md`?
3. Ändert diese Entscheidung den Implementation-Standard / RFC?
4. Muss `01_DECISION_LOG.md` ergänzt werden?
5. Muss eine `APP_SPEC.md` angepasst werden?
6. Entsteht ein Widerspruch zwischen Baseline, Interface und App-Spec?

**Bei Unsicherheit:**

- Stoppen.
- Widerspruch oder Unklarheit benennen.
- Nicht still entscheiden.

---

## 9. Decision-Log-Pflicht für Sicherheitsentscheidungen

Jede sicherheitsrelevante Architekturentscheidung bekommt einen Eintrag in `docs/App-Fabrik/01_DECISION_LOG.md`.

**Beispiele für pflichtpflichtige Einträge:**

- Neue erlaubte Domain
- Neue `data-*` Semantik
- Bootstrapper-Strategie
- Shadow DOM ja/nein
- Externe Scriptquelle
- Neue Abhängigkeit
- Änderung an SafeDOM-Regel
- Änderung an Slug-Whitelist
- Externe Config-Strategie
- Backend/API-Einführung

APP_SPEC-spezifische Whitelist-Werte (z.B. konkrete Options-Keys für eine App) gehören nicht alle ins globale Decision Log — aber die Regel, dass sie whitelisted sein müssen, gehört in Baseline und `APP-INTERFACE.md`.

---

## 10. Gate-Prüffrage

In Spec-Gate und Pre-Code-Gate muss geprüft werden:

**„Sind Security Baseline, APP-INTERFACE.md und APP_SPEC.md synchron?"**

| # | Prüffrage |
|---|---|
| 1 | Verweist APP_SPEC auf gültige Interface-Regeln? |
| 2 | Nutzt APP_SPEC nur erlaubte `data-fw-*` Attribute? |
| 3 | Ist die app-spezifische `data-fw-options`-Whitelist dokumentiert? |
| 4 | Sind externe Datenquellen validiert oder bewusst nicht genutzt? |
| 5 | Sind Loading, Content, Error und Empty definiert? |
| 6 | Sind SafeDOM-Regeln eingehalten? |
| 7 | Gibt es eine XSS-Testidee? |
| 8 | Gibt es neue Sicherheitsregeln in APP_SPEC, die SECURITY-BASELINE.md fehlen? |
| 9 | Gibt es Detailregeln in APP-INTERFACE.md, die der Baseline widersprechen? |
| 10 | Gibt es App-Sonderregeln, die global relevant werden? |

**Ergebnis:**

- `synchron` — keine Lücken, kein Widerspruch
- `synchron mit Nicht-Blockern` — Lücken bekannt, definierter Klärungszeitpunkt
- `nicht synchron / Blocker` — Widerspruch oder kritische Lücke → Gate schlägt fehl

---

## 11. Testpflicht

Jede App-Fabrik-App braucht Sicherheits-Testfälle für:

- Ungültiger `data-fw-app`-Slug → Error-State, kein Crash
- Unbekannte `data-fw-options`-Keys → werden ignoriert, kein Crash
- Ungültige Optionswerte → Fallback auf Default
- XSS-Versuch in Optionswert → wird nicht ausgeführt
- Ungültige Datenquelle, falls genutzt → Error-State
- Ungültiges CSV/JSON, falls genutzt → Error-State
- Error-State ohne Stacktrace → nutzerfreundliche Meldung auf Deutsch
- Empty-State ohne Crash → sauberer Leerstand
- Kein `innerHTML` für Nutzdaten → nachweisbar

Für Pilot-1 reicht lokale `app.test.html`. Automatisierung nach Pilot-1.

---

## 12. Pflegezyklus für Audits

- `SECURITY-BASELINE.md` (diese Datei): bei jeder sicherheitsrelevanten Architekturfläche aktualisieren.
  Bei jeder Änderung an `APP-INTERFACE.md §7` ist Security-Sync-Prüfung (→ §8) Pflicht.
- `SECURITY-AUDIT.md`: nach konkretem Security-Anlass oder vor großem Deploy.
- `PERFORMANCE-ANALYSE.md`: vor großem Deploy oder nach Performance-relevanter Änderung.
- `PROMPT-SECURITY-AUDIT.md`: quartalsweise oder vor größerer Prompt-/CLAUDE.md-Reorganisation.

**App-Fabrik-Pflegepflicht:**

- `APP-INTERFACE.md`-Sicherheitsregeln und `SECURITY-BASELINE.md` müssen synchron bleiben.
- Bei jeder Änderung an `APP-INTERFACE.md §7` ist Security-Sync-Prüfung (→ §8) Pflicht.
- Bei jeder neuen APP_SPEC ist Gate-Prüffrage aus §10 Pflicht.
