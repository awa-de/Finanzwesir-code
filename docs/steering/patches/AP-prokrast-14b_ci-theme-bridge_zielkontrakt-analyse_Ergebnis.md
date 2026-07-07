# AP-prokrast-14b — CI-/Theme-Bridge Zielkontrakt-/Architektur-Analyse Ergebnis

## Status

GRÜN

## Kurzfazit

A-04 ist entschieden, aber die naive Lesart "Apps sollen `--color-*` direkt nutzen" reicht nicht als Umsetzungsanweisung. Ein neuer, in AP-14a/14aR noch nicht aufgedeckter Befund verschärft und präzisiert zugleich die Aufgabe: `screen.css` definiert ausschließlich **Marken-Tokens** (`--color-petrol`, `--color-blau`, `--color-purpur`, `--color-gelb`, plus Neutralfarben). `app.css` verwendet aber **Rollen-Tokens** (`--fw-color-primary`, `--fw-color-surface`, `--fw-color-error-*`, `--fw-color-muted`), für die es in `screen.css` noch **gar keine Entsprechung gibt** — unabhängig vom Namensraum. Eine reine Umbenennung von `--fw-*` zu `--color-*` würde daher ins Leere laufen; es fehlen mindestens vier neue Rollen-Tokens in `screen.css` Abschnitt 1, bevor überhaupt migriert werden kann.

Bei Fonts liegt der Fall einfacher: `FwTheme.js` beweist bereits, dass ein reiner Literalwert (`'Source Sans Pro', sans-serif`) ohne jede CSS-Variable korrekt funktioniert — ein `--font-*`-Bridge-Token ist technisch nicht zwingend nötig, nur eine Konsistenzfrage. Bei Spacing liegt der Fall am offensten: Es existiert im ganzen Projekt (auch nicht für Ghost-Content) kein einziges `--space-*`-CSS-Custom-Property — die Design-System-Spacing-Regeln sind ausschließlich Tailwind-Klassenwerte. `--fw-space-md/-sm` haben daher kein Bridge-Ziel, zu dem migriert werden könnte; das ist keine Lücke im selben Sinn wie Farbe/Font, sondern eine offene Grundsatzfrage.

Empfehlung: **Variante C (Hybrid)** — CI-semantische Tokens (Farbe, perspektivisch Font) zentral in `screen.css` erweitert und direkt referenziert; App-Mechanik (Timing, Positionierung, vorerst auch Spacing) bleibt app-lokal unter einem klar als "nicht CI" gekennzeichneten Namensraum. Diese Variante ist die einzige, die der AP-14aR-Differenzierung (6 von 17 Tokens funktionieren bereits) und dem hier neu gefundenen Rollen-Token-Mangel gerecht wird.

## Entscheidungsreife

- Masterentscheidung möglich: **teilweise**
- Begründung: Die Zielrichtung (Variante C) ist mit hoher Zuversicht empfehlbar und direkt entscheidbar. Der konkrete Umsetzungsschnitt für AP-15 braucht aber noch zwei Vorentscheidungen des Masterfadens: (1) welche neuen Rollen-Tokens in `screen.css` wie benannt/gemappt werden (Namensvorschlag liegt vor, ist aber Geschmackssache, keine technische Notwendigkeit), (2) ob Spacing vorerst app-lokal bleibt oder ein projektweites `--space-*`-System eigenständig aufgesetzt wird (das wäre ein größerer, eigenständiger Auftrag außerhalb von AP-15).
- Was ist sicher: Farb-Bridge-Richtung, Font-Bridge-Richtung (Literal reicht), Namensraum-Trennung CI vs. App-Mechanik, Ausschluss von Tailwind für Apps, Nicht-Anfassen der 6 funktionierenden Timing-/Positionierungs-Tokens, Nicht-Einbeziehung der drei Standalone-Prototypen.
- Was bleibt offen: exakte Rollen-Token-Namen in `screen.css`, Spacing-Grundsatzentscheidung, ob `FwChartTextPlugin.js`-Fix in AP-15 oder als eigener Mini-AP direkt danach läuft, Ghost-Live-Verifikation als Voraussetzung oder Begleitmaßnahme.
- Was darf noch nicht entschieden werden: die exakte Codeänderung selbst (welche Zeile in `screen.css`/`app.css` wie lautet) — das ist Umsetzung, nicht Zielkontrakt.

## Gates

- Repo-Wurzel: `z:\Documents\Nextcloud\Finanzwesir 2.0` (bestätigt)
- git status --short vor Start: `M .claude/learning/session-log.md`; `?? Archiv/Chroniken/chronist-v1/CHRONIK-2026-07-07-ap-prokrast-08-13-ci-uebergabe.md`; `?? Archiv/Chroniken/chronist-v1/CHRONIK-2026-07-07-ap-prokrast-12-rubikon-symbolmarkers-drehbuch-errata.md`; `?? docs/steering/patches/AP-prokrast-14aR_claims-vs-files-review_Ergebnis.md`; `?? docs/steering/patches/AP-prokrast-14a_ci-theme-bridge_inventar_Ergebnis.md`
- git diff --name-status vor Start: nur `M .claude/learning/session-log.md`
- git log --oneline -1: `8bb9256 docs(AP-prokrast-12a-12c): RubikonSymbolMarkers Drehbuch-Errata korrigiert — BACKLOG AP-prokrast-11-FOLLOWUP erledigt`
- unerwartete relevante Änderungen: nein — `app.css`, `screen.css`, `FwTheme.js`, `FwChartTextPlugin.js`, `01_DECISION_LOG.md`, `APP-INTERFACE.md`, `CSS-KONVENTIONEN.md`, `BACKLOG.md` sind allesamt unverändert seit AP-14aR
- Stop-Regel ausgelöst: nein

## Quellenbasis

### Pflichtquellen gelesen / ausgewertet

| Quelle | Lesetiefe | Zweck | Befund |
|---|---|---|---|
| `AP-prokrast-14a_..._Ergebnis.md` | vollständig (eigener Vorlauf in dieser Konversation) | Fundament | Übernommen, siehe „Übernommene harte Befunde" |
| `AP-prokrast-14aR_..._Ergebnis.md` | vollständig (eigener Vorlauf in dieser Konversation) | Fundament, Review-geprüft | Übernommen, siehe „Übernommene harte Befunde" |
| `docs/App-Fabrik/01_DECISION_LOG.md` A-04 | erneut gegengelesen (Kopf + A-01–A-05) | Architektur-Grundsatz | Bestätigt: "CSS Custom Properties aus screen.css, gelesen via FwTheme.js. Kein Tailwind CDN in Produktion" |
| `docs/steering/BACKLOG.md` DS-012/013/014/FOLLOWUP-07/08 | gezielt gegengelesen | Backlog-Anschluss | Neuer Befund: DS-012 ("Tailwind-Config kanonisch") und DS-013 ("Ghost screen.css-Einbindung + Token-Duplikat") decken den hier gefundenen Rollen-Token-Mangel nicht wörtlich ab — DS-FOLLOWUP-07/08 referenzieren sie dennoch als Bridge-Voraussetzung |
| `docs/spec/APP-INTERFACE.md` §3.1/§4 | erneut gegengelesen | App-Shell-Vertrag | `data-fw-theme` weiterhin reserviert/nicht implementiert, unverändert seit AP-14a |
| `docs/steering/design/CSS-KONVENTIONEN.md` | erneut gegengelesen | Namensraum-Governance | "`fw-*` ist reserviert für die Chart-Engine — nicht in screen.css verwenden" gilt unverändert, schließt Alias-Layer-Variante (B) technisch/normativ aus |
| `docs/design-system/spec/DESIGN-SYSTEM.md` | erneut gegengelesen | Kontext | Keine neuen Befunde ggü. AP-14a |
| `docs/design-system/spec/01-FARBEN-UND-TYPOGRAFIE.md` | erneut gegengelesen | Farb-/Font-Spec-Abgleich | Keine Rollen-Tokens (primary/surface/error) dokumentiert — bestätigt, dass die Lücke nicht nur technisch, sondern auch konzeptionell/dokumentarisch besteht |
| `docs/design-system/spec/03-LAYOUT-UND-RESPONSIVE.md` | erneut gegengelesen | Spacing-/Breakpoint-Abgleich | Spacing ausschließlich als Tailwind-Klassenwerte dokumentiert, keine `--space-*`-CSS-Variable im ganzen Projekt nachweisbar |
| `Theme/assets/css/screen.css` §1 TOKENS (gezielt) | vollständig gegrept auf `--color-` | Rollen-Token-Abgleich | Bestätigt: keine `--color-primary`, `--color-surface`, `--color-error-*` vorhanden — nur Marken- und Neutraltokens |
| `Theme/assets/js/fw-chart-engine/core/FwTheme.js` (Font-Bereich) | gezielt gegengelesen | Font-Referenzimplementierung | Bestätigt: Fonts als reiner Literalwert im Constructor, kein CSS-Var-Bridge nötig für korrekte Funktion |
| `Apps/prokrastinations-preis/app.css` (`--fw-color-*`-Blöcke) | gezielt gegengelesen | Rollen-Token-Nutzung | 8 Farbrollen identifiziert, davon 4 ohne jede Entsprechung in `screen.css` |
| `Apps/prokrastinations-preis/app.js` (`bootstrap()`, `setProperty`) | erneut gegengelesen | App-Shell-Mechanik | Keine neuen Befunde ggü. AP-14aR |

### Optionalquellen gelesen

| Quelle | Warum gelesen | Befund |
|---|---|---|
| keine | Die Pflichtquellen plus die neu gefundene Rollen-Token-Lücke lieferten ausreichend Entscheidungsgrundlage; Komponenten-/Interaktions-Specs (02/04/05/06) wurden nicht zusätzlich benötigt, da die Kernfrage (Farbe/Font/Spacing/Namensraum) bereits aus den Pflichtquellen beantwortbar war | — |

### Bewusst ausgespart

| Quelle | Grund |
|---|---|
| `docs/design-system/spec/02-KOMPONENTEN.md`, `04`, `05`, `06` | Für den Token-/Bridge-Zielkontrakt nicht entscheidungsrelevant; würden nur für einen künftigen DS-014-Komponenten-Baukasten gebraucht, der explizit als Folge-AP, nicht als Teil von AP-14b/15 markiert wird |
| Standalone-Prototypen (Volltext) | Laut Auftrag nicht fachlich/produktstrategisch zu bewerten, nur strukturelle Einordnung nötig (bereits durch AP-14aR geleistet) |
| `Archiv/**`, historische Chroniken | Keine aktuelle Wahrheit, nicht relevant für Zielkontrakt |
| Ghost-Live-/Admin-Zugriff | Kein Repo-Zugriff, außerhalb der Werkzeuggrenze dieses APs |

## Übernommene harte Befunde aus AP-14aR

| Befund | Für AP-14b relevant, weil | Einschränkung |
|---|---|---|
| A-04 formal entschieden (🟢) | Setzt die Zielrichtung fest — Frage ist nur noch "wie", nicht "ob" | keine |
| `screen.css` = alleinige CI-Farb-/Font-Quelle | Zielkontrakt muss auf diese eine Datei aufsetzen, keine Alternative | ergänzt um Rollen-Token-Befund (neu, s.u.) |
| `FwTheme.js` = produktionsreife Farb-Bridge-Referenz | Vorbild für Migrationsmuster (getComputedStyle) | Fonts dort bewusst nicht gebridged — als Präzedenzfall für Font-Entscheidung genutzt |
| 11 von 17 `--fw-*`-Tokens (Farbe/Font/Spacing) ungebridged, 6 funktionieren lokal | Definiert exakten Umfang der zu lösenden Lücke, verhindert Overreach in AP-15 | Innerhalb der 11 wird hier zusätzlich zwischen Farbe (klare Lücke), Font (triviale Lücke) und Spacing (keine Lücke im selben Sinn, da kein Ziel existiert) unterschieden |
| Nur `prokrastinations-preis` real ins `.fw-app`-Muster integriert | Pilotfläche eindeutig, kein Auswahlproblem | keine |
| 3 Standalone-Prototypen ohne Integration | Explizit aus AP-15-Scope ausgeschlossen | keine |
| Tailwind nicht produktiv in Theme/Apps | A-04-Ausschluss bleibt unangetastet | keine |
| Keine Ghost-`.hbs`-Templates, Ghost-Live nicht repo-verifizierbar | Grenzt aus, was AP-15 versprechen darf | wird hier als Vorbedingung/Begleitmaßnahme für AP-15 präzisiert |
| 3 unabhängige Breakpoint-Systeme | Zielkontrakt muss Stellung nehmen, ob Vereinheitlichung nötig ist | Empfehlung hier: nein, siehe Breakpoint-Zielkontrakt |

## Offene Architekturfragen

| Frage | Entscheidung nötig? | Warum | Wer entscheidet? | Vor AP-15 nötig? |
|---|---:|---|---|---:|
| Welche Rollen-Tokens (primary/surface/error-*) werden neu in `screen.css` definiert, mit welchen Namen und welchen Markenfarben gemappt? | ja | Ohne diese Tokens ist keine Farb-Migration möglich, unabhängig von der Variante | Master (inhaltlich: Albert, da Hex-Werte/CI-Zuordnung Designentscheidung ist) | ja |
| Bleibt Spacing app-lokal, oder wird ein projektweites `--space-*`-System aufgesetzt? | ja | Kein bestehendes Ziel vorhanden — echte Grundsatzfrage, kein reiner Nachvollzug | Master | ja (zumindest als bewusste "vorerst app-lokal"-Entscheidung) |
| Wird `FwChartTextPlugin.js` in AP-15 mitgezogen oder als eigener Folge-Mini-AP behandelt? | ja | Triggert automatisch DS-FOLLOWUP-07 (Neumessung), das ist ein Extra-Arbeitsschritt mit Albert-Beteiligung (DevTools) | Nebenfaden/Master | nein (kann auch direkt nach AP-15 folgen) |
| Ist eine einmalige Ghost-Live-Stichprobe (lädt `screen.css`/Fonts wirklich auf Seiten mit `.fw-app`-Card?) Voraussetzung oder Begleitmaßnahme für AP-15? | ja | A-04s gesamte Funktionsgrundlage hängt an dieser unverifizierten Annahme | Master (Albert, da Ghost-Admin-Zugriff nötig) | empfohlen parallel, nicht zwingend vorher |
| Soll `data-fw-theme` von "reserviert" zu einer echten Schnittstelle werden? | nein, aktuell nicht | Nichts in AP-14a/14aR/14b deutet auf akuten Bedarf | später, falls Bedarf entsteht | nein |
| Sollen die 3 Standalone-Prototypen später inventarisiert/migriert werden? | nein, aktuell nicht | Außerhalb des CI-Bridge-Scopes, eigenständige Produktfrage | später, eigener AP falls gewünscht | nein |

## Variantenanalyse

### Variante A — Apps nutzen direkt shared Tokens

#### Beschreibung

`app.css` referenziert künftig direkt `--color-*` aus `screen.css` statt `--fw-color-*`. Timing-/Positionierungs-Tokens bleiben unangetastet (implizit, da Variante A sich nur auf "zentrale Tokens" bezieht).

#### Bewertung

| Kriterium | Bewertung | Begründung |
|---|---|---|
| A-04-Konformität | hoch | Wörtlichste Umsetzung von "CSS Custom Properties aus screen.css" |
| Drift-Schutz | hoch | Kein zweiter Namensraum, keine Kopierversuchung |
| Migrationsaufwand | mittel | Erfordert zusätzlich die neuen Rollen-Tokens in `screen.css` (s.o.) — ohne die ist Variante A nicht direkt umsetzbar |
| Rückwärtskompatibilität | hoch | Timing-/Positionierungs-Tokens bleiben unberührt, da nicht Teil der Migration |
| Klarheit | hoch | Eine Quelle, ein Namensraum für CI-Werte — leicht erklärbar für künftige App-LLMs |
| Ghost-Kompatibilität | mittel | Plausibel, aber wie alle Varianten abhängig von der unverifizierten Annahme, dass `screen.css` auf Ghost-Seiten mit App-Cards geladen wird |
| Chart-Engine-Kompatibilität | hoch | Identisches Muster wie `FwTheme.js` — keine Parallelstruktur |
| A11y/Kontrast | hoch | Nutzt dieselben, bereits WCAG-geprüften Werte aus `01-FARBEN-UND-TYPOGRAFIE.md` |
| Responsiveness | neutral | Kein Bezug zu Breakpoints |
| Folgekosten bei Fehlentscheidung | niedrig | Reine Umbenennung mit Fallback-Sicherheitsnetz (CSS `var()` bricht nie hart) |

#### Risiken

- Ohne die Rollen-Token-Ergänzung in `screen.css` bleibt Variante A unvollständig umsetzbar — sie beschreibt nur die Konsumentenseite, nicht die fehlende Angebotsseite.
- Keine explizite Governance für Timing-/Positionierungs-Tokens — bleibt implizit "darf weiter `--fw-*` heißen", was künftige App-Autoren verwirren könnte, wenn nicht dokumentiert.

#### Geeignet als Zielkontrakt?

teilweise — richtig in der Grundrichtung, aber unvollständig ohne explizite Namensraum-Trennung für App-Mechanik.

### Variante B — `--fw-*`-Alias-Layer in `screen.css`

#### Beschreibung

`screen.css` definiert zusätzlich `--fw-color-primary: var(--color-blau)` etc., sodass `app.css` unverändert bei `--fw-*` bleiben kann.

#### Bewertung

| Kriterium | Bewertung | Begründung |
|---|---|---|
| A-04-Konformität | mittel | Technisch CSS-Custom-Properties-aus-screen.css, aber nicht der im Wortlaut nahegelegte direkte Bezug |
| Drift-Schutz | niedrig | Etabliert `--fw-*` dauerhaft als zweiten offiziellen CI-Namensraum — genau das Muster, das zur ursprünglichen Lücke führte |
| Migrationsaufwand | niedrig | Kein `app.css`-Umbau nötig — aber das ist trügerisch, da die Rollen-Token-Lücke trotzdem zuerst geschlossen werden muss |
| Rückwärtskompatibilität | hoch | `app.css` bleibt unverändert |
| Klarheit | niedrig | Zwei Namensräume für dieselbe Farbe verwirrt künftige App-LLMs: "welchen nehme ich?" |
| Ghost-Kompatibilität | mittel | Gleich wie Variante A |
| Chart-Engine-Kompatibilität | niedrig | Erzeugt Parallelstruktur zur `FwTheme.js`-Bridge, die nur `--color-*` kennt |
| A11y/Kontrast | hoch | Werte bleiben identisch |
| Responsiveness | neutral | kein Bezug |
| Folgekosten bei Fehlentscheidung | hoch | Ein einmal etablierter Alias-Layer ist schwerer zurückzubauen als eine direkte Umbenennung — klassische Technical-Debt-Falle |

#### Risiken

- **Normativer Direktkonflikt:** `CSS-KONVENTIENEN.md` legt fest: "`fw-*` ist reserviert für die Chart-Engine — nicht in screen.css verwenden." Ein `--fw-*`-Alias-Block in `screen.css` würde diese bestehende, unverändert gültige Regel direkt verletzen oder eine explizite Ausnahme/Änderung der Konvention erfordern — zusätzlicher Entscheidungs- und Dokuaufwand, den Variante A/C nicht brauchen.
- Verfestigt genau das Muster (App erfindet eigenen Namensraum, Plattform muss nachziehen), das für 25 Apps am teuersten würde, wenn es sich wiederholt.

#### Geeignet als Zielkontrakt?

nein — löst das technische Symptom, vertieft aber das Namensraum-Problem und steht im Widerspruch zu einer bestehenden, unverändert gültigen Konvention.

### Variante C — Hybrid: CI-semantisch shared, App-Mechanik lokal

#### Beschreibung

CI-semantische Werte (Farbe; perspektivisch Font, falls gewünscht) werden ausschließlich über `--color-*` (bzw. künftig `--font-*`) aus `screen.css` bezogen — inklusive der hier neu identifizierten fehlenden Rollen-Tokens, die dafür zuerst ergänzt werden müssen. App-Mechanik (Timing, Positionierung, vorerst auch Spacing) bleibt app-lokal unter einem als "nicht CI" dokumentierten Namensraum (z. B. weiterhin `--fw-*`, aber mit geklärter, dokumentierter Bedeutung: "app-mechanische Stellschraube", nicht "CI-Bridge-Versuch").

#### Bewertung

| Kriterium | Bewertung | Begründung |
|---|---|---|
| A-04-Konformität | hoch | Setzt den CI-relevanten Teil von A-04 exakt um, ohne die unstrittig lokalen Werte künstlich zu zentralisieren |
| Drift-Schutz | hoch | CI-Werte haben genau eine Quelle; App-Mechanik kann nicht mit CI-Werten verwechselt werden, da Namensraum-Bedeutung explizit dokumentiert wird |
| Migrationsaufwand | mittel | Gleicher Aufwand wie Variante A für die 11 CI-Tokens, plus einmaliger Dokuaufwand für die Namensraum-Klärung |
| Rückwärtskompatibilität | hoch | Die 6 funktionierenden Tokens werden explizit nicht angefasst — einziger Vorschlag, der das AP-14aR-Detailergebnis direkt in eine Regel übersetzt |
| Klarheit | hoch | Zwei klar getrennte, klar benannte Zuständigkeiten statt einem unscharfen "App nutzt halt CSS-Variablen" |
| Ghost-Kompatibilität | mittel | Gleich wie Variante A |
| Chart-Engine-Kompatibilität | hoch | Identisches Muster wie `FwTheme.js` für den CI-Teil; keine Vermischung mit App-Mechanik |
| A11y/Kontrast | hoch | Gleich wie Variante A |
| Responsiveness | neutral | Kein Bezug, wird separat behandelt (s. Breakpoint-Zielkontrakt) |
| Folgekosten bei Fehlentscheidung | niedrig | Sauberste Trennung, geringstes Rückbaurisiko |

#### Risiken

- Erfordert eine explizite, einmalige Governance-Entscheidung (Namensraum-Bedeutung dokumentieren) — mehr Erstaufwand als Variante A, aber genau der Aufwand, der laut AP-14aR ohnehin nötig ist, um die 6/17-Unterscheidung nicht zu verlieren.
- Falls künftige Apps den `--fw-*`-Namensraum trotzdem für CI-Werte missbrauchen, weil "es ja schon `--fw-*` in `prokrastinations-preis` gibt", muss die Dokumentation (`CSS-KONVENTIENEN.md`/`APP-INTERFACE.md`/DS-014) das aktiv verhindern — reines Technikrisiko wird zu einem Dokupflege-Risiko verschoben, nicht eliminiert.

#### Geeignet als Zielkontrakt?

ja — beste Passung zu A-04, zur bestehenden `CSS-KONVENTIENEN.md`-Reservierung und zum AP-14aR-Detailbefund.

### Variante D — Status quo plus Doku

#### Beschreibung

Nur die Lücke dokumentieren (z. B. in `CSS-KONVENTIENEN.md`/`APP-INTERFACE.md`), keine technische Änderung an `app.css` oder `screen.css`.

#### Bewertung

| Kriterium | Bewertung | Begründung |
|---|---|---|
| A-04-Konformität | niedrig | A-04 fordert eine funktionierende Bridge, nicht nur deren Beschreibung |
| Drift-Schutz | niedrig | Dokumentation verhindert nicht, dass App 2 dieselben Fallback-Werte kopiert |
| Migrationsaufwand | niedrig | Trivial — genau das Problem |
| Rückwärtskompatibilität | hoch | Nichts ändert sich |
| Klarheit | mittel | Doku hilft nur, wenn sie gelesen wird; löst das Laufzeitproblem nicht |
| Ghost-Kompatibilität | hoch | Keine technische Änderung, kein neues Risiko |
| Chart-Engine-Kompatibilität | neutral | Keine Berührung |
| A11y/Kontrast | niedrig | App rendert weiterhin mit Fallback-Werten, die z. T. nicht WCAG-geprüft sind (z. B. `#1a1a1a`, `#555555` stehen nicht in der CI-Kontrast-Tabelle) |
| Responsiveness | neutral | Keine Berührung |
| Folgekosten bei Fehlentscheidung | hoch | Bei 25 Apps würde sich die Fallback-Praxis ungebremst vervielfachen |

#### Risiken

- Widerspricht dem Zweck von A-04 als 🟢 ENTSCHIEDEN — reine Dokumentation ohne Umsetzung lässt eine bereits getroffene Entscheidung unvollzogen.
- Einzig denkbarer Rechtfertigungsfall: Wenn der Masterfaden aus Kapazitäts-/Prioritätsgründen bewusst entscheidet, die Bridge-Umsetzung zeitlich zu verschieben — dann wäre Variante D als **Übergangszustand mit Frist**, nicht als Zielkontrakt, vertretbar.

#### Geeignet als Zielkontrakt?

nein — nur als bewusst befristeter Zwischenzustand denkbar, nicht als Enddefinition.

## Empfohlener Zielkontrakt

### Empfehlung

**Variante C (Hybrid)** — mit Variante A als technischem Kern für die CI-semantischen Tokens.

### Begründung

Variante C ist die einzige der vier Varianten, die drei bereits gesicherte Fakten gleichzeitig respektiert: (1) A-04 fordert eine echte CSS-Custom-Properties-Bridge aus `screen.css`, nicht nur Doku (schließt D aus); (2) `CSS-KONVENTIENEN.md` reserviert `fw-*` bereits gegen Verwendung in `screen.css` (schließt B aus, ohne diese bestehende Regel gleichzeitig zu ändern); (3) AP-14aR hat gezeigt, dass 6 von 17 `--fw-*`-Tokens keine Bridge-Lücke, sondern funktionierende App-Mechanik sind — eine Variante, die das nicht explizit macht (reines A), riskiert, dass eine künftige Umsetzung diese Tokens versehentlich mitmigriert oder umbenennt.

### Zielregel

- **CI-semantische Tokens:** ausschließlich über `--color-*` (Farbe) aus `screen.css` beziehen. Neue Rollen-Tokens (primary/surface/error-*/muted, siehe Tabelle unten) werden in `screen.css` Abschnitt 1 ergänzt, bevor `app.css` migriert wird.
- **App-mechanische Tokens:** bleiben app-lokal (Timing, Positionierung, vorerst Spacing), Namensraum bleibt technisch `--fw-*` möglich, muss aber dokumentiert als "app-lokale Mechanik, kein CI-Bezug" gekennzeichnet werden.
- **Namensräume:** `--color-*` = einzige CI-Farbquelle, plattformweit, in `screen.css` definiert. `--fw-*` (bzw. ein künftiger App-eigener Präfix) = ausschließlich App-Mechanik, nie Farbe/Font/CI-Werte.
- **Fonts:** kein neues CSS-Custom-Property zwingend nötig; `app.css` kann analog zu `FwTheme.js` den korrekten Literalwert direkt referenzieren. Optional, falls Konsistenz mit dem Farb-Bridge-Muster gewünscht wird, `--font-body`/`--font-display` in `screen.css` ergänzen — Masterentscheidung, nicht blockierend.
- **Farben:** 4 neue Rollen-Tokens in `screen.css` ergänzen (Vorschlag unten), dann `app.css` migrieren.
- **Spacing:** vorerst app-lokal bleiben lassen — es existiert projektweit kein `--space-*`-Ziel, zu dem migriert werden könnte. Eigenständige Folgefrage, kein AP-15-Bestandteil.
- **Breakpoints:** bewusst getrennt lassen (Design-System/Chart-Engine/App-CSS sind unterschiedliche Kontexte), nur die irreführende Doku-Referenz auf "Tailwind md/lg" in `app.css` sollte richtiggestellt werden (Doku-Fix, kein Architekturumbau).
- **Chart-Theme:** `FwTheme.js` bleibt Referenzimplementierung; `FwChartTextPlugin.js` sollte in dasselbe Font-Muster eingebunden werden (löst automatisch DS-FOLLOWUP-07 als Folgeaufgabe aus).
- **App-Shell:** `fw-app`/`data-fw-app`-Vertrag bleibt unverändert gültig; `data-fw-theme` bleibt reserviert, kein akuter Handlungsbedarf.
- **Tailwind:** bleibt ausschließlich Ghost-Content-/Referenz-Werkzeug, A-04-Ausschluss für Apps wird nicht angetastet.
- **Ghost-Grenze:** AP-15 sollte eine einmalige, leichte Ghost-Live-Stichprobe als Begleitmaßnahme vorsehen (kein Vollaudit), da die gesamte Bridge-Architektur auf der unverifizierten Annahme beruht, dass `screen.css` auf Seiten mit `.fw-app`-Cards tatsächlich geladen wird.

### Was zentral/shared geregelt werden sollte

- Alle Marken- und Neutralfarben (bereits vorhanden in `screen.css`).
- Die vier neuen Rollen-Tokens (primary/surface/error-*/muted-Familie).
- Optional Fonts als Tokens, falls Konsistenz gewünscht (nicht zwingend).

### Was app-lokal bleiben darf

- Timing-Werte (`--fw-card-to-point-flight-duration`, `--fw-screen3-reveal-fade-duration`).
- Positionierungs-Werte (`--fw-rubikon-text-top/-left`, `--fw-flight-delta-x/-y`).
- Spacing (`--fw-space-md/-sm`), bis eine projektweite Spacing-Entscheidung getroffen wird.
- Alle App-spezifischen BEM-Klassen (`fw-app__*`).

### Was ausdrücklich nicht app-lokal nachgebaut werden darf

- Neue eigene Hex-Werte für Farben, die bereits als CI-Marken- oder künftige Rollen-Tokens existieren.
- Neue eigene `sans-serif`-Fallback-Ketten für Fonts, wenn die CI-Fonts bereits über `screen.css` verfügbar sind.
- Neue App-eigene Farbrollen-Namen (z. B. eine dritte App erfindet `--myapp-color-warning`), ohne zuerst zu prüfen, ob eine passende Rolle bereits zentral existiert oder zentral ergänzt werden sollte.

### Was noch entschieden werden muss

- Exakte Namen und Hex-Zuordnung der 4 neuen Rollen-Tokens (Vorschlag unten, aber Albert-Entscheidung).
- Spacing-Grundsatzfrage (app-lokal auf Dauer vs. künftiges zentrales System).
- Ob `FwChartTextPlugin.js`-Fix Teil von AP-15 wird oder eigener Folge-Mini-AP.

## Namensraum-Governance

| Namensraum | Künftige Bedeutung | Erlaubt wo | Verboten wo | Doku-Ort | Risiko |
|---|---|---|---|---|---|
| `--color-*` | Einzige CI-Farbquelle (Marken- und Rollen-Tokens) | `screen.css` (Definition), überall lesend (`screen.css`, `FwTheme.js`, `app.css`, künftige Apps) | Definition außerhalb `screen.css` Abschnitt 1 (verstößt gegen bestehende `CSS-KONVENTIENEN.md`-Regel "kein neuer Hex-Wert außerhalb Abschnitt 1") | `CSS-KONVENTIENEN.md` (bereits vorhanden, ggf. um Rollen-Token-Beispiele ergänzen) | niedrig, sofern Regel befolgt wird |
| `--fw-*` (App-Mechanik) | Ausschließlich app-lokale, nicht-CI-Stellschrauben (Timing, Positionierung, vorerst Spacing) | Beliebige `Apps/*/app.css` | Farbe, Font oder andere CI-Werte unter diesem Namensraum zu definieren | `APP-INTERFACE.md` §4 oder neues DS-014-Dokument (Klarstellung nötig, da `CSS-KONVENTIENEN.md` `fw-*` bisher nur "für die Chart-Engine reserviert" nennt, den App-mechanischen Gebrauch aber nicht kennt) | mittel — ohne explizite Doku bleibt unklar, ob künftige Apps `--fw-*` für CI-Werte missbrauchen dürfen |
| App-spezifische Tokens (perspektivisch, z. B. eigener Präfix pro App) | Falls künftig mehrere Apps gleichzeitig eigene Mechanik-Tokens brauchen und Namenskollisionen drohen | Optional, nur bei Bedarf | — | DS-014 (Design-API-Baukasten), noch nicht geschrieben | niedrig, nur relevant bei Skalierung auf viele gebaute Apps |

## Fonts-Zielkontrakt

- Befund: `screen.css` deklariert die CI-Fonts korrekt via `@font-face`; es existiert aber keine `--font-*`-CSS-Variable irgendwo im Projekt. `FwTheme.js` beweist, dass ein reiner Literalwert für die Chart-Engine ausreicht.
- Empfehlung: `app.css` kann `--fw-font-base` entweder direkt durch den Literalwert `'Source Sans Pro', sans-serif` ersetzen (kein Bridge-Aufwand nötig), oder — falls Konsistenz mit dem Farb-Bridge-Muster gewünscht ist — `screen.css` bekommt zusätzlich `--font-body`/`--font-display`. Beide Wege sind technisch korrekt; die Wahl ist eine Stilfrage, keine Notwendigkeit.
- `FwTheme.js`: bleibt unverändert — hartcodierte, korrekte Werte sind hier bereits die richtige Lösung, kein Nachbesserungsbedarf.
- `FwChartTextPlugin.js`: sollte künftig `theme.fonts.body`/`.heading` konsumieren wie `FwRenderer.js` und die `*Strategy.js`-Dateien es bereits tun — aktuell einzige Abweichung vom etablierten Engine-Muster.
- RubikonSymbolMarkers-Font-Neumessung (DS-FOLLOWUP-07): wird durch den `FwChartTextPlugin.js`-Fix zwangsläufig ausgelöst (Zeichenbreiten ändern sich mit echtem Font) — sollte direkt danach, nicht parallel, erfolgen, da sie von Alberts DevTools-Nachmessung abhängt.
- Folge-AP: `FwChartTextPlugin.js`-Fix + Neumessung eignen sich als eigener kleiner Anschluss-AP nach dem Farb-/Rollen-Token-Kern von AP-15, nicht zwingend im selben Gate.

## Farben-/Token-Zielkontrakt

- Befund: `screen.css` hat 20 Marken-/Neutraltokens, aber keine der 4 von `app.css` benötigten Rollen: `primary`, `surface`, `error-border`, `error-bg`, `error-text` (5 fehlende Rollen, `muted` ist über `--color-text-muted` bereits nah, aber nicht identisch benannt).
- Empfehlung: `screen.css` Abschnitt 1 um Rollen-Tokens ergänzen, die auf bestehende Markenfarben mappen (Vorschlag, keine Festlegung):

| App-Rolle (`--fw-color-*`) | Vorschlag neue `screen.css`-Rolle | Naheliegendes Mapping | Bemerkung |
|---|---|---|---|
| `--fw-color-primary` | `--color-primary` (oder direkt `--color-blau`/`--color-petrol` referenzieren) | `--color-blau` (bereits "Text-Links Default", passt zu interaktiven Primäraktionen) oder `--color-petrol` (Primary Brand laut Spec) | Albert-Entscheidung: welche Marke ist "App-Primary"? |
| `--fw-color-text` | bereits vorhanden als `--color-text` | 1:1 | keine neue Rolle nötig |
| `--fw-color-muted` | bereits nah an `--color-text-muted` | 1:1 (Umbenennung reicht) | keine neue Rolle nötig |
| `--fw-color-surface` | `--color-surface` (neu) oder `--color-bg-faint` wiederverwenden | `--color-bg-faint` (`#FAFAFA`) ist inhaltlich passend | ggf. keine neue Rolle nötig, nur Wiederverwendung |
| `--fw-color-bg` | bereits vorhanden als `--color-bg` | 1:1 | keine neue Rolle nötig |
| `--fw-color-error-border` | `--color-error-border` (neu) | `--color-purpur` (dokumentiert als "Warnungen") als Basis | echte neue CI-Entscheidung: hat Finanzwesir CI überhaupt eine dedizierte Error-Farbe, oder wird Purpur/Warn-Ton wiederverwendet? |
| `--fw-color-error-bg` | `--color-error-bg` (neu) | `--color-purpur-tint` als Basis | s.o. |
| `--fw-color-error-text` | `--color-error-text` (neu) | `--color-purpur` oder `--color-text` | s.o. |

  Damit reduziert sich die "4 neue Rollen"-Aussage aus dem Kurzfazit bei genauerer Betrachtung auf **3 echte Neuentscheidungen** (Primary-Zuordnung, Error-Farbfamilie, ggf. Surface) plus 2 reine Umbenennungen ohne neue CI-Entscheidung (text, muted, bg sind bereits 1:1 vorhanden).
- Migration später: Sobald die Rollen-Tokens stehen, ist die eigentliche `app.css`-Migration mechanisch (Suchen/Ersetzen mit Fallback-Entfernung), kein Gestaltungsspielraum mehr nötig.
- Nicht jetzt: keine Migration von `app.css` in diesem AP, keine Festlegung der finalen Hex-Zuordnung (Alberts Entscheidung).

## Spacing-/Layout-Zielkontrakt

- Befund: Kein `--space-*`-CSS-Custom-Property existiert irgendwo im Projekt, auch nicht für Ghost-Content (dort ausschließlich Tailwind-Klassenwerte). `--fw-space-md`/`-sm` in `app.css` sind funktionale, aber nicht CI-verankerte Werte.
- Empfehlung: vorerst app-lokal belassen. Eine projektweite Spacing-Tokenisierung wäre ein eigenständiges, nicht-triviales Vorhaben (müsste auch für Ghost-Content/Tailwind eine CSS-Var-Brücke schaffen, die heute nirgendwo existiert) und sprengt den CI-/Theme-Bridge-Scope dieses AP-Stranges.
- zentral: nichts, aktuell.
- app-lokal: `--fw-space-md`, `--fw-space-sm`, bis anders entschieden.
- offen: ob und wann ein projektweites Spacing-System überhaupt gewünscht ist — echte Masterfrage, nicht AP-15-Bestandteil.

## Breakpoint-/Responsive-Zielkontrakt

- Befund: Design-System (768/1280px, Tailwind-Mobile-First, bewusst ohne `sm:`/`lg:`), Chart-Engine (450/900px, pixelbasierte Zonenmatrix für Linienstärke/Punktradius), App-CSS (480/600/1024px) sind drei sachlich unterschiedliche Kontexte — Ghost-Artikel-Lesebreite, Chart-Container-Pixelbreite, App-Card-Layoutbreite.
- Empfehlung: **bewusst getrennt lassen.** Eine Vereinheitlichung würde falsche Kopplungen erzeugen (Chart-Container-Breite in einer eingebetteten Card entspricht selten der Viewport-Breite, auf der Tailwind-Breakpoints basieren).
- gemeinsame Skala nötig: **nein**.
- bewusst getrennte Kontexte: Ghost-Content-Lesbarkeit, Chart-Pixel-Zonen, App-Card-Layout — je eigene, kontextgerechte Skala.
- Risiko: gering, sofern dokumentiert, dass die Trennung Absicht ist. Das eigentliche Problem ist nicht die Trennung selbst, sondern der irreführende `app.css`-Kommentar ("Grenzen angelehnt an Tailwind md/lg"), der eine Angleichung an eine Konvention behauptet, die im Projekt gar nicht existiert (Design-System nutzt explizit kein `lg:`).
- Folge-AP: kleiner Doku-Fix (Kommentar in `app.css` richtigstellen oder zumindest nicht als "Tailwind md/lg" bezeichnen, da missverständlich) — kein Architektur-AP, kann als Nebenpunkt in AP-15 mitlaufen oder separat.

## Tailwind-Zielkontrakt

- Befund: A-04 schließt Tailwind CDN in Apps explizit aus. `screen.css` §7 "JANITOR FALLBACK" ist bereits architektonisch auf ein mögliches künftiges Tailwind im Ghost-Content-Kontext vorbereitet (aktuell leerer Platzhalter). Einzige funktionierende Tailwind-Einbindung liegt in `docs/design-system/templates/master-template.html` (Referenz-/Demo-Kontext für Ghost-Blog-Artikel).
- Empfehlung: A-04 unverändert bestätigen, keine Änderung nötig.
- Apps: nutzen nie Tailwind, auch nicht für einzelne Utility-Klassen.
- Ghost-Content: darf Tailwind laut Design-System-Doku nutzen (außerhalb des App-Fabrik-Scopes, nicht Teil dieses AP-Stranges).
- Theme: `screen.css` bleibt die einzige CSS-Datei für Apps und Ghost-Content-Fallback; Tailwind bleibt für Ghost-Content optional/additiv, nie App-relevant.
- Nicht tun: keine Tailwind-Config in AP-15 anfassen, keine Tailwind-Klassen in `app.css` einführen.

## App-Shell-/Ghost-Zielkontrakt

- Befund: `.fw-app`/`data-fw-app`-Vertrag ist in `APP-INTERFACE.md` §3.1 dokumentiert und in `app.js` funktionsfähig umgesetzt (Self-Bootstrap). Keine Ghost-`.hbs`-Templates im Repo — ob `screen.css`/Fonts auf echten Ghost-Seiten mit App-Card tatsächlich geladen werden, ist repo-seitig nicht verifizierbar.
- Repo-Grenze: Diese Frage kann aus dem Repo allein nicht beantwortet werden; sie ist aber die Grundvoraussetzung dafür, dass jede der drei tragfähigen Varianten (A/B/C) überhaupt etwas bewirkt.
- Empfehlung: AP-15 sollte eine leichte, einmalige Ghost-Live-Stichprobe (z. B. Albert prüft im echten Ghost-Editor/Preview, ob `--color-petrol` als berechneter Stil auf einer Seite mit `.fw-app`-Card ankommt) als Begleitmaßnahme vorsehen — kein Vollaudit, keine Blockade des gesamten AP-15, aber auch keine stillschweigende Annahme.
- `fw-app`/`data-fw-app`: bleibt unverändert, kein Anpassungsbedarf durch diesen Zielkontrakt.
- `data-fw-theme`: bleibt reserviert/nicht implementiert — kein Bezug zur aktuellen Bridge-Frage, da A-04 eine globale, nicht per-Instanz-überschreibbare CI vorsieht ("Kein FW_THEME_OVERRIDE").
- Ghost-Verifikation nötig: **später/parallel** — empfohlen als Begleitmaßnahme zu AP-15, nicht als Vorbedingung, die AP-15 komplett blockiert.

## Chart-Engine-Zielkontrakt

- Befund: `FwTheme.js` ist die einzige produktionsreife, bereits funktionierende Bridge-Referenzimplementierung im gesamten Repo — sowohl für die Farbseite (CSS-Var-Bridge) als auch als Beleg dafür, dass Fonts ohne Bridge korrekt hartcodiert sein können.
- Empfehlung: `FwTheme.js` unverändert als Vorbild verwenden — keine Änderung nötig.
- `FwTheme.js`: bleibt Referenzimplementierung, keine Änderung.
- `FwChartTextPlugin.js`: sollte auf dasselbe Font-Zugriffsmuster wie `FwRenderer.js`/`*Strategy.js` umgestellt werden (`theme.fonts.body`/`.heading` statt hartcodiertem `sans-serif`) — kleine, in sich geschlossene Engine-Änderung, unabhängig von der `app.css`-Token-Migration möglich, löst aber automatisch DS-FOLLOWUP-07 als Folgeaufgabe aus.
- No-op-Bootstrap / AnchorMeasurement: **kein Bezug zu dieser CI-Kette.** Bleibt wie in AP-14a eingeordnet ein separates Engine-/Architektur-Thema (`AP-prokrast-08-FOLLOWUP-A`), AP-14b ändert daran nichts.
- chartSettled-Doku: **kein Bezug zu dieser CI-Kette.** Bleibt separates Plattform-Dokumentationsthema, AP-14b ändert daran nichts.

## Standalone-Prototypen

| Ordner | Einordnung | Für AP-15 relevant? | Empfehlung |
|---|---|---:|---|
| regulatorik-dashboard | Nicht ins App-Fabrik-Muster integriert, eigenes Farb-/Font-/Chart-System, teils Altmaterial-Unterordner | nein | Ignorieren für AP-15; falls je relevant, eigener Inventar-/Migrations-AP, nicht Teil der CI-Bridge-Kette |
| rollierende-sparplaene | Nicht ins App-Fabrik-Muster integriert, eigenes Farb-System inkl. Dark-Mode-Variante, externe Google Fonts | nein | wie oben |
| weltkarte-etf-indizes | Nicht ins App-Fabrik-Muster integriert, eigenes Farb-System, externe Google Fonts | nein | wie oben |

## Pilotflächen Prokrastinationspreis-App

| Bereich | Pilot geeignet? | Warum | Risiko | Voraussetzung |
|---|---:|---|---|---|
| App-Shell | ja | `.fw-app`-Container ist der Kaskadeneinstiegspunkt für alle CI-Werte, muss ohnehin nicht geändert werden | niedrig | keine |
| Typografie | ja | Hoher visueller Hebel, technisch trivial (Literal oder minimaler Token) | niedrig | keine (unabhängig von Farb-Rollen-Tokens umsetzbar) |
| Farben | ja, aber nachgelagert | Höchster CI-Wert, aber abhängig von den 3 echten Rollen-Neuentscheidungen (Primary/Error/ggf. Surface) | mittel | Rollen-Token-Entscheidung durch Albert |
| Spacing | nein, vorerst | Kein Bridge-Ziel vorhanden, eigene Grundsatzfrage | niedrig (funktioniert bereits) | Masterentscheidung zu projektweitem Spacing-System |
| Buttons/CTA | teilweise | Farbanteil profitiert von Rollen-Tokens; strukturelles Button-Komponentensystem ist DS-014-Scope, nicht AP-15 | niedrig-mittel | Farb-Rollen-Tokens; DS-014 für vollen Komponentenkontrakt |
| Chart-Theme | ja | `FwTheme.js` bereits fertig, keine Änderung nötig | niedrig | keine |
| Screen 2 | ja (nur Token-Ebene) | Nur visuelle Token wechseln, Produktlogik unangetastet | niedrig | Farb-/Font-Entscheidung |
| Screen 3 | ja (nur Token-Ebene) | s.o. | niedrig | s.o. |
| Screen 4 / Rubikon | ja (nur Token-Ebene) | s.o. | niedrig | s.o. |
| RubikonSymbolMarkers | ja, aber sequenzabhängig | Direkt gekoppelt an `FwChartTextPlugin.js`-Fix und DS-FOLLOWUP-07-Neumessung | mittel (Albert-DevTools-Nachmessung nötig) | `FwChartTextPlugin.js`-Fix zuerst |
| Standalone-Prototypen | nein | Nicht integriert, außerhalb Scope | — | explizit nicht Teil dieser Pilotfläche |

## Risiko- und Folgekostenanalyse

| Risiko | Eintritt, wenn ignoriert | Folgekosten | Dringlichkeit | Gegenmaßnahme |
|---|---|---|---|---|
| Rollen-Token-Lücke wird übersehen und AP-15 versucht direkt `--fw-color-*` → `--color-*` umzubenennen | Migration schlägt fehl oder erzeugt falsche/fehlende Werte, da 3-5 Rollen keine Entsprechung haben | mittel | hoch | Rollen-Token-Tabelle (oben) als Pflichtlektüre für AP-15 vorschalten |
| Timing-/Positionierungs-Tokens werden versehentlich mitmigriert | Funktionierende App-Mechanik (Card-to-Point-Timing, Rubikon-Positionierung) bricht ohne fachlichen Grund | mittel | hoch | Namensraum-Governance-Tabelle als Abgrenzung nutzen |
| 25 Apps kopieren das ungebridgte `--fw-*`-Fallback-Muster von `prokrastinations-preis`, bevor die Bridge steht | Drift vervielfacht sich, spätere Migration wird proportional teurer | hoch | hoch | Zielkontrakt vor nächstem App-Build kommunizieren, DS-014 als Leitplanke nutzen |
| Ghost-Live lädt `screen.css`/Fonts auf App-Card-Seiten tatsächlich nicht | Gesamte Bridge-Architektur (alle Varianten) wirkungslos, auch nach korrekter Umsetzung | mittel (unwahrscheinlich, aber ungeprüft) | mittel | Leichte Ghost-Live-Stichprobe als Begleitmaßnahme zu AP-15 |
| `FwChartTextPlugin.js`-Fix wird ohne nachfolgende Neumessung eingespielt | RubikonSymbolMarkers verschieben sich sichtbar (Zeichenbreiten ändern sich mit echtem Font), TC-F05-Regression | niedrig-mittel | mittel | Fix und Neumessung als gekoppeltes Paar behandeln, nicht getrennt einspielen |
| Spacing-Grundsatzfrage wird stillschweigend in AP-15 mitentschieden statt bewusst vertagt | Scope-Creep, AP-15 wird größer als nötig, Spacing-Entscheidung ohne Ghost-Content-Abgleich getroffen | niedrig | niedrig | Spacing explizit als "vorerst app-lokal" in AP-15-Auftrag ausschließen |

## Empfehlung für AP-prokrast-15

### Nächster sinnvoller Haupt-AP

AP-prokrast-15 — CI-/Theme-Bridge Umsetzung Stufe 1: Farb-Rollen-Tokens + Font-Literal für `prokrastinations-preis`, begleitet von einer leichten Ghost-Live-Stichprobe.

### Warum

Der Zielkontrakt (Variante C) ist entscheidungsreif für den CI-relevanten Kern (Farbe, Font). Die einzige real gebaute App ist die natürliche, einzige verfügbare Pilotfläche. Eine Stufe-1-Begrenzung auf Farbe+Font (unter Auslassung von Spacing und Breakpoints, die beide eigene, noch offene Grundsatzfragen sind) hält AP-15 klein, prüfbar und Full-Gate-fähig.

### AP-15 sollte enthalten

- Ergänzung der 3 echten neuen Rollen-Tokens (Primary/Error-Familie, ggf. Surface) in `screen.css` Abschnitt 1, nach Alberts expliziter Farbzuordnung.
- Migration der `app.css`-CI-semantischen `--fw-color-*`- und `--fw-font-base`-Verwendungen auf die (erweiterten) `--color-*`-Tokens bzw. den korrekten Font-Literal.
- Explizite Dokuklarstellung, dass die verbleibenden `--fw-*`-Tokens (Timing/Positionierung) app-lokale Mechanik sind, kein CI-Bezug (Ergänzung in `APP-INTERFACE.md` oder `CSS-KONVENTIENEN.md`).
- Eine leichte Ghost-Live-Stichprobe als Begleitmaßnahme (nicht als Blocker).

### AP-15 sollte ausdrücklich nicht enthalten

- Spacing-Vereinheitlichung (eigene Grundsatzfrage, s.o.).
- Breakpoint-Vereinheitlichung (bewusst getrennte Kontexte, kein Handlungsbedarf außer Doku-Kommentar-Fix).
- `FwChartTextPlugin.js`-Fix und RubikonSymbolMarkers-Neumessung (eigener, sequenzabhängiger Folge-Mini-AP, da an Alberts DevTools-Nachmessung gekoppelt).
- Migration/Bewertung der 3 Standalone-Prototypen.
- Volle Ghost-Admin-/`.hbs`-Verifikation (nur leichte Stichprobe, kein Vollaudit).
- DS-014-Komponenten-Baukasten (Buttons/CTA als System) — größerer, eigenständiger Auftrag.

### Vor AP-15 noch zu klären?

teilweise

- Albert muss die 3 echten Rollen-Neuentscheidungen treffen (Primary-Zuordnung, Error-Farbfamilie, ggf. Surface-Wiederverwendung vs. Neuanlage) — das ist der einzige harte Blocker für den AP-15-Start.
- Die Spacing-Grundsatzfrage muss nicht vor AP-15 final geklärt werden, aber AP-15 muss explizit "Spacing bleibt vorerst app-lokal" als Auftragsgrenze mitbekommen, sonst droht Scope-Creep.

## Nicht nächste APs

- **Direkte `app.css`-Migration ohne vorherige Rollen-Token-Entscheidung:** würde ins Leere laufen, da die Zieltokens noch nicht existieren.
- **Direkter `screen.css`-Alias-Patch (Variante B):** widerspricht der bestehenden `CSS-KONVENTIENEN.md`-Reservierung von `fw-*`, wurde explizit verworfen.
- **Direkter `FwChartTextPlugin.js`-Font-Fix:** technisch unabhängig möglich, aber besser als eigener, klar abgegrenzter Folge-Schritt nach dem Farb-Kern, da er zwingend eine Albert-Nachmessung auslöst und sonst den AP-15-Scope aufbläht.
- **Standalone-Prototypen-Migration:** außerhalb des CI-Bridge-Scopes, keine Produktentscheidung dazu getroffen oder nötig.
- **Ghost-Live-Verifikation als eigener Voll-AP:** für AP-15 reicht eine leichte Begleitstichprobe; ein vollständiger Ghost-Admin-Audit wäre Overkill für die aktuelle Fragestellung.
- **Browser-/S/M/L-Final-QA:** gehört zum Abschluss von AP-15 selbst (nach Umsetzung), nicht zu diesem Zielkontrakt-Dossier.
- **RubikonSymbolMarkers-Neumessung isoliert:** ergibt ohne den vorgelagerten `FwChartTextPlugin.js`-Fix keinen stabilen Endstand, muss gekoppelt bleiben.

## Geänderte Dateien

- docs/steering/patches/AP-prokrast-14b_ci-theme-bridge_zielkontrakt-analyse_Ergebnis.md

## Explizit nicht geändert

- AP-14a-Ergebnisprotokoll: nicht geändert
- AP-14aR-Ergebnisprotokoll: nicht geändert
- app.js: nicht geändert
- app.css: nicht geändert
- Theme/assets/css/screen.css: nicht geändert
- Theme/assets/js/fw-chart-engine/core/FwTheme.js: nicht geändert
- Theme/assets/js/fw-chart-engine/plugins/FwChartTextPlugin.js: nicht geändert
- docs/App-Fabrik/01_DECISION_LOG.md: nicht geändert
- docs/design-system/**: nicht geändert
- docs/spec/APP-INTERFACE.md: nicht geändert
- docs/steering/BACKLOG.md: nicht geändert
- APP_SPEC.md: nicht geändert
- QA_TEST_CASES.md: nicht geändert
- stations.de.json: nicht geändert
- Produktentscheidungen Screen 2/3/4: nicht angefasst, nicht neu diskutiert
- RubikonSymbolMarkers: nicht geändert, nur als Folgethema eingeordnet

## Wiederlesen / Datei-Wahrheit

- Ergebnisprotokoll nach Write vollständig wiedergelesen: ja
- git diff --name-status nach Write: `M .claude/learning/session-log.md` (vorbestehend, nicht Teil dieses APs); `?? docs/steering/patches/AP-prokrast-14b_ci-theme-bridge_zielkontrakt-analyse_Ergebnis.md` (dieser Write); `?? docs/steering/patches/AP-prokrast-14a_ci-theme-bridge_inventar_Ergebnis.md` und `?? docs/steering/patches/AP-prokrast-14aR_claims-vs-files-review_Ergebnis.md` (vorbestehend aus AP-14a/14aR); zwei vorbestehende `?? Archiv/Chroniken/chronist-v1/CHRONIK-*.md` (nicht Teil dieses APs)
- nur erlaubter Write-Scope verändert: ja
- Abweichungen: keine

## Empfehlung

- Status für AP-14b: GRÜN
- Zielkontrakt-Vorschlag vorhanden: ja (Variante C)
- Masterentscheidung möglich: teilweise (Zielrichtung ja, exakte Rollen-Token-Zuordnung und Spacing-Grundsatzfrage bleiben bei Albert)
- Nächster sinnvoller Unter-AP: AP-prokrast-14c — Rücklaufkapsel an den Masterfaden
- Warum: Entscheidungsdossier ist vollständig, Master kann auf dieser Basis über AP-15 entscheiden, ohne selbst nochmal zu explorieren.
- Was ausdrücklich nicht der nächste AP ist: AP-prokrast-15 selbst (Umsetzung) — erst nach Alberts Rollen-Token-Entscheidung startbar.

## Chat-Kurzfassung für den Nebenfaden

Empfehlung: Variante C (Hybrid) — CI-semantische Farb-/Font-Tokens zentral in `screen.css` erweitert und direkt referenziert, App-mechanische Tokens (Timing/Positionierung, vorerst Spacing) bleiben app-lokal unter dokumentiertem `--fw-*`-Namensraum. Neuer, entscheidender Befund: `screen.css` hat nur Marken-Tokens, `app.css` braucht aber Rollen-Tokens (primary/surface/error-*) — davon sind nur 3 echte Neuentscheidungen nötig (Rest ist Umbenennung bereits vorhandener Werte). Variante B (Alias-Layer) verworfen, da sie der bestehenden `CSS-KONVENTIENEN.md`-Regel "`fw-*` nicht in `screen.css`" widerspricht. Spacing und Breakpoints bewusst aus AP-15 ausgeklammert (eigene Grundsatzfragen bzw. bewusst getrennte Kontexte). Einziger harter Blocker vor AP-15: Alberts Entscheidung zu den 3 neuen Farbrollen.
