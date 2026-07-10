Stand: 2026-07-10 | Session: AP-prokrast-18 | Geändert von: Claude

# AP-prokrast-18 — Claims-vs-Files-Review der Gesamtkette (AP-prokrast-15a → 17c)

**Gesamturteil:** GELB · **Blocker:** nein · **Tabu-Verstoß:** nein · **Typ:** read-only Audit, kein Fix, kein Commit

---

## 0. Identifikation und Baseline

| Feld | Wert |
|---|---|
| Ausführendes Modell | **Claude Opus 4.8** |
| Identitätsbeleg | Harness-Ausgabe `/model`: „Current model: Opus 4.8 · Base model: Opus 4.8" |
| Anmerkung | Der in den Kontext eingebettete Systemprompt-String behauptete weiterhin „Sonnet 5" (stale Artefakt des Session-Starts vor dem Modellwechsel). Das §0-Gate wurde deshalb **nicht** per Selbstauskunft, sondern per externem Harness-Beleg passiert. |

**git-Baseline**

| Commit | Inhalt |
|---|---|
| `6ea9704` | AP-prokrast-17 — Pilot-CSS auf CI-Tokens migriert (HEAD) |
| `1b5c283` | Housekeeping Memory-Sync |
| `21e87a2` | AP-prokrast-kdr14 — Spec-Wortlaut-Nachführung |
| `1357b46` | AP-prokrast-15a–16c — CI-/Theme-Bridge umgesetzt |
| `d9ca9da` | AP-prokrast-14a–14c (Kettenbasis für alle Diffs unten) |

**Uncommittet zum Prüfzeitpunkt** (`git status --short`): `.claude/learning/session-log.md`, `docs/steering/BACKLOG.md`, `Apps/prokrastinations-preis/QA_TEST_CASES.md` (17b+17c), `docs/steering/patches/AP-prokrast-17b_…md`, `…17c_…md`. **Kein uncommitteter Engine-, Theme- oder Spec-Diff** — die Stop-Regel „unerwartete uncommittete Engine-Änderungen" greift nicht.

---

## 1. Load-bearing Behauptungen — Claims vs. Files

| # | Behauptung (Quelle) | Prüfmethode | Reale Fundstelle | Urteil |
|---|---|---|---|---|
| 1 | `tokens.css` = SSoT mit 15c-FINAL-Werten, Leitern 50–900 | Python: 30 Kontrakt-§8-Stufen gegen `tokens.css` (inkl. `var()`-Alias-Auflösung) | `Theme/assets/css/tokens.css` Z.18–84 | **GRÜN** — 30/30 byte-identisch (Case-insensitiv); Petrol/Gelb/Purpur je 10 Stufen; Blau nur `-700 #0071BF` (E2) |
| 2 | `screen.css`: `:root`-Farbblock entfernt, `@import tokens.css`, keine konkurrierenden CI-Hexe | Grep `:root`, `--color-*:`, Hex-Literale | `screen.css` Z.22 (`@import`); 0 `:root`; 0 `--color-*`-Definitionen | **GRÜN** (mit GELB-Nebenbefund → §3.4) |
| 3 | `ChartEngine` = Composition Root; **eine** init()'te `FwTheme`-Instanz per Constructor Injection an **alle drei** Strategien; Graceful Default; kein `getComputedStyle` außerhalb `FwTheme.init()` | Read + Grep | `ChartEngine.js` `constructor()`: `this.renderer = new FwRenderer(); var theme = this.renderer.theme;` → Line/Bar/Pie; `constructor(theme = new FwTheme())` in allen 3 Strategien; `getComputedStyle` nur `FwTheme.js:113` | **GRÜN** |
| 4 | Null-Delta `tokens.css` ↔ Fallback-Konstanten; Property-Zahl | Python: alle `read('--color-*')`-Paare aufgelöst und verglichen | `FwTheme.js` `init()` | **GRÜN** — 19/19 Null-Delta, 0 Mismatch, 0 fehlende Property (Zahlenfrage → §2) |
| 5 | Plugins lesen Farbe injiziert; kein hartes `#006273`, kein hartes Blau | Grep + Kontextlesung | `FwVerticalLinePlugin.js:19` (`opts.color` mit Fallback `#0071BF`), `FwAnnotationPulsePlugin.js:107/122` (`dataset.pointBorderColor` mit Fallback `#218380`), `LineChartStrategy.js:414` (`fwVerticalLine: { color: t.colors.blau }`) | **GRÜN** — alle Hex-Treffer sind dokumentierte defensive Fallbacks; `#006273` existiert nur noch im Kommentar („war `#006273`") |
| 6 | KDR-14 + Layer-5-Matrixzeile gespiegelt; **kein** „19/19" in der Spec | Grep + Read | `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` Z.55, Z.148–151 | **GRÜN** — Beleg qualitativ („Null-Delta-QA, AP-16c"); kein `19/19` |
| 7 | Pilot: `app.css` 0×`--fw-color-*`, 24×`--color-*`/8 Rollen mit FINAL-Fallbacks; Font/Spacing/Mechanik unverändert; `app.js` null Diff; `app.test.html` `tokens.css` vor `app.css` | Python (kommentarbereinigt) + `git diff --stat` | `app.css`; `app.test.html` Z.9/10 | **GRÜN** — 0 / 24 / 1 / 19; alle 8 Rollen lösen gegen `tokens.css` auf (0 Abweichungen); 6 Mechanik-Tokens intakt; `app.js`-Diff über `d9ca9da..HEAD` **leer** |
| 8 | `QA_TEST_CASES.md`: Gruppe N (TC-N01–N09), Übersicht 1:1 mit Body inkl. P, A–M unverändert | Python-Enumeration + `git diff HEAD` | `QA_TEST_CASES.md` | **GRÜN** — 9 TC-N; Body == Tabelle (`A…M, P, N`), Reihenfolge identisch; einzige entfernte Zeile im Diff = Stand-Header |

**Repo-weiter Namensraum-Check:** keine Live-Nutzung von `var(--fw-color-*)` mehr im gesamten Repo (außerhalb `docs/`, `Archiv/`).

---

## 2. Property-Zahl-Klärung: 20 (Kontrakt) vs. 19 (16c-QA) — belegte Antwort

**Antwort: 19 ist richtig. Die Kontrakt-Aussage „liest 20 benannte `--color-*`-Properties" ist widerlegt.**

| Messgröße | Wert | Beleg |
|---|---|---|
| `read('--color-*')`-Aufrufe in `FwTheme.init()` | **19** (19 distinkt) | `FwTheme.js` Z.125–146 |
| Keys im `this.colors`-Objekt | **20** | `FwTheme.js` Z.31–54 |
| Davon per `read()` aus CSS gesetzt | **19** | Python-Zuordnung `this.colors.X = read(...)` |
| Nicht gelesen, sondern **abgeleitet** | **1** — `linesDark` | `FwTheme.js:149` — `this.colors.linesDark = this.colors.textSec;` |

**Ursache der Diskrepanz:** Beide Zahlen sind korrekt, aber sie zählen Verschiedenes. Es gibt **20 Farb-Tokens**, von denen **19 aus CSS gelesen** werden; das 20. (`linesDark`) wird nach dem Lesen aus `textSec` abgeleitet und hat bewusst **keine** eigene CSS-Property. Die 16c-QA hat die *gelesenen Properties* gezählt (19) und lag richtig; der Kontrakt hat die *Farb-Tokens* gezählt (20) und sie fälschlich als „gelesene Properties" beschrieben.

**Fundstellen-Korrektur:** Der Claim steht in **§9 (P15)** des Kontrakts, Z.253 — **nicht** in §8, wie `AP-prokrast-16-FOLLOWUP-B` und die HOOK-META angeben.

> Empfohlener Wortlaut (nicht ausgeführt — Fix ist ein Folge-AP):
> `FwTheme.init()` liest **19** benannte `--color-*`-Properties in **20** Farb-Tokens (`linesDark` folgt `textSec`, ohne eigene Property).

Damit ist `AP-prokrast-16-FOLLOWUP-B` **inhaltlich beantwortet**; es verbleibt nur die textuelle Nachführung in `CI-POOL-ROLLENKONTRAKT.md` §9.

---

## 3. Weitere Befunde (GELB — gemeldet, nicht repariert)

### 3.1 `screen.css` ist das Ghost-Produktions-Stylesheet, nicht „Engine-intern"

`AP-prokrast-17b_…_Ergebnis.md` (§1, TC-N05-Status) und der TC-N05-Text bezeichnen die `tokens.css`-Bindung in `screen.css` als „Engine-intern". Real deklariert sich `screen.css` in Z.2 als **„Finanzwesir Ghost Theme — Consolidated Styles"** und importiert `tokens.css` in Z.22. Damit ist `tokens.css` **transitiv Teil der Produktions-CSS-Kette**, sobald Ghost `screen.css` lädt — genau so von AP-16 entworfen.

**Folge für TC-N05:** Das „Erwartete Ergebnis" („Keine `tokens.css`-Einbindung in einem Ghost-/Produktionspfad") ist irreführend formuliert. Zusätzlich kann Schritt 2 des Testfalls („repo-weit prüfen") seine eigene Fehlschlagbedingung **strukturell nie auslösen**: es existiert **kein einziges `.hbs`** im Repo (verifiziert), die Ghost-Template-Kette ist nicht repo-verifizierbar (deckt sich mit P18). Der Testfall prüft damit nicht, was er zu prüfen behauptet.

Die real offene T1-Lücke ist enger als TC-N05 suggeriert: nicht „ist `tokens.css` produktiv gebunden?", sondern „erreicht die Token-Kaskade den App-Card-Kontext in Ghost?".

### 3.2 `Theme/chart-tests/` ist gitignored — Abnahme-Harness unversioniert

`.gitignore:17` schließt `Theme/chart-tests/` aus. Die in AP-16b/16c als Abnahmegrundlage genannten Artefakte (`AP-16-abnahme.html`, 6 refreshte chart-tests mit 19 Hex-Ersetzungen) existieren real im Dateisystem, sind aber **nicht versioniert**. Kein Protokoll behauptet das Gegenteil — aber Alberts Live-Abnahme aus 16b/16c stützt sich auf Artefakte, die weder im Kettendiff auftauchen noch reproduzierbar wiederherstellbar sind.

### 3.3 `NAVIGATION.md`-Regel widerspricht `screen.css`

`NAVIGATION.md:136` postuliert: „Hex-Werte nur in `tokens.css` (Token-Definitionen)". Real enthält `screen.css` zwei **Live**-Hex-Literale:

| Zeile | Wert | Kontext | Nächstliegendes Token |
|---|---|---|---|
| 180 | `#f9fafb` | `.gh-content tr:nth-child(even)` Zebra | `--color-bg-faint` `#FAFAFA` (nicht identisch) |
| 228 | `#f3f4f6` | `.video-wrapper` Hintergrund | `--color-loader-bg` `#F3F3F3` (nicht identisch) |

Beides sind neutrale Grautöne, **keine** CI-Markenfarben — Behauptung 2 bleibt GRÜN. Aber es sind zwei untokenisierte Beinahe-Dubletten bestehender Tokens, und die NAVIGATION-Regel ist in dieser Absolutheit falsch. (Ein drittes Vorkommen, `#666` in Z.208, steht nur im `CHANGED`-Kommentar als Altwert-Dokumentation — kein Live-Wert.)

### 3.4 `screen.css`-Kopfkommentar ist veraltet

Der Abschnittsindex Z.6 sagt: „1. TOKENS — Einzige Stelle mit Hex-Werten". Seit AP-16 enthält Abschnitt 1 **gar keine** Hex-Werte mehr (nur den `@import`), während zwei Hex-Literale in den Abschnitten 4/5 liegen. Die Zeile ist doppelt überholt.

### 3.5 KDR-14-Wortlaut vermengt `FwRenderer` und `FwTheme` (kosmetisch)

Spec Z.148: „`ChartEngine` erzeugt den `FwTheme`-Renderer als Composition Root". Real erzeugt `ChartEngine` den **`FwRenderer`** und reicht dessen `FwTheme`-Instanz weiter. Kein Sachwiderspruch, aber eine unpräzise Benennung in einer normativen Spec-Zeile.

---

## 4. Tabu-Zonen — Unversehrtheit belegt

Methode: `git diff --name-only d9ca9da..HEAD` (gesamte Kette) und Zeilen-Grep im Engine-Diff.

| Tabu-Zone | Befund |
|---|---|
| `FinanzwesirData.js` (Vault) | **nicht im Kettendiff** |
| `CSVParser.js` (Vault) | **nicht im Kettendiff** |
| `FwDateUtils.js` (Zeit-SSoT) | **nicht im Kettendiff** |
| Grundstruktur `fwContext` | **keine einzige `fwContext`-Zeile** im Engine-Diff der Kette |
| `Theme/.git/`, `Active Campaign Liste/` | nicht berührt |

**Kein Tabu-Verstoß.**

---

## 5. Konsistenz-Querschnitt

| Achse | Ergebnis |
|---|---|
| Token-Namen `tokens.css` ↔ `FwTheme.init()` | konsistent, 19/19 Properties existieren |
| FINAL-Hexe Kontrakt §8 ↔ `tokens.css` | konsistent, 30/30 |
| FINAL-Hexe `tokens.css` ↔ `app.css`-Fallbacks | konsistent, 8/8 Rollen |
| Property-**Zahl** Kontrakt §9 ↔ `FwTheme.js` | **widersprüchlich** (20 vs. 19) → §2 |
| Spec KDR 14 ↔ Kontrakt | kein FINAL-Wert-Widerspruch |
| `NAVIGATION.md` Hex-Regel ↔ `screen.css` | **widersprüchlich** → §3.3 |
| Font-Bridge | `--font-body` existiert in `tokens.css`, wird von `init()` **nicht** gelesen — konsistent mit offenem DS-012/013 und mit Fork 5 (Font bewusst nicht migriert) |
| `FwLayoutRules.js` (eigene, nie init()'te `FwTheme`-Instanz, Z.20) | unkritisch bestätigt: nutzt ausschließlich `_theme.fonts.body` (Z.32); `init()` überschreibt keine Fonts → kein Drift. 16c-Bewertung hält. |

---

## 6. Was **nicht** geprüft wurde

Ausdrücklich **nicht** verifiziert und daher **nicht** als geprüft zu verkaufen:

- **Browser-Laufzeit.** Der Null-Delta-Beleg in §1/#4 ist eine **statische** Auflösung der `var()`-Aliase in `tokens.css` per Python. Ob `getComputedStyle().getPropertyValue('--color-petrol')` im realen Browser den substituierten Wert liefert, wurde hier nicht ausgeführt (Albert hat das in 16c/17 separat live bestätigt).
- `tools/ci-token-check.js` wurde gelesen, **nicht ausgeführt**.
- Screenreader-/A11y-Verhalten, S/M/L-Viewport-Matrix, visuelle Farbwirkung.
- Die Ghost-`.hbs`-Kette (existiert nicht im Repo) und die Tailwind-Verfügbarkeit im App-Laufzeitkontext.
- Inhaltliche Richtigkeit der OKLCH-Farbleiter-Generierung (nur Byte-Gleichheit Kontrakt ↔ `tokens.css` geprüft, nicht die Ableitung).
- Die gitignorierten `Theme/chart-tests/`-Inhalte.

---

## 7. Gesamturteil und empfohlene Folge-APs

**GELB.** Alle acht load-bearing Code-Behauptungen der Kette sind durch die realen Dateien belegt (GRÜN). Kein Tabu-Verstoß, keine Regression, kein Blocker. Die einzige **widerlegte** Behauptung ist eine **Doku-Aussage** (Kontrakt §9/P15, „20 gelesene Properties"), die bereits als `AP-prokrast-16-FOLLOWUP-B` registriert war und keinerlei Laufzeitwirkung hat — deshalb GELB statt ROT.

Empfohlene Folge-APs (**nur Empfehlung, nicht ausgeführt**):

| Empfehlung | Scope | Priorität |
|---|---|---|
| **F-1** — `CI-POOL-ROLLENKONTRAKT.md` §9/P15: „20 gelesene Properties" → „19 gelesene Properties in 20 Farb-Tokens (`linesDark` abgeleitet)". Schließt `AP-prokrast-16-FOLLOWUP-B`. | 1 Datei, 1 Satz | H |
| **F-2** — TC-N05 in `QA_TEST_CASES.md` präzisieren: transitive Bindung via `screen.css` benennen, „Engine-intern" streichen, Fehlschlagbedingung auf den App-Card-Kaskadenkontext schärfen. Analog Status-Zeile im 17b-Protokoll. | 1–2 Dateien | H |
| **F-3** — `NAVIGATION.md:136` und `screen.css`-Kopf Z.6 mit der Realität synchronisieren; separat entscheiden, ob `#f9fafb`/`#f3f4f6` tokenisiert werden (Beinahe-Dubletten von `--color-bg-faint`/`--color-loader-bg`). | 2 Dateien + 1 Entscheidung | M |
| **F-4** — Entscheiden, ob der Abnahme-Harness `Theme/chart-tests/AP-16-abnahme.html` aus dem `.gitignore` genommen und versioniert wird (Reproduzierbarkeit der 16b/16c-Abnahme). | `.gitignore` + 1 Datei | M |
| **F-5** — Spec Z.148 kosmetisch: „`FwTheme`-Renderer" → „`FwRenderer`". | 1 Datei, 1 Wort | L |

**Nächster Schritt laut Kettenposition:** Abschluss-Ritual der Gesamtkette durch den Steuerungsfaden/Albert — **nicht** dieser AP. Die Kette ist aus Sicht dieses Reviews abschlussfähig; F-1 und F-2 sollten vor oder mit dem Abschluss laufen, weil beide aktive Falschaussagen in normativen bzw. testleitenden Dokumenten sind.
