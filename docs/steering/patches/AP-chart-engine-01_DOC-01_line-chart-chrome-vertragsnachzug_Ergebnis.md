Stand: 2026-07-14 | Session: AP-chart-engine-01 / DOC-01 (Sonnet) | Geändert von: Claude

# AP-chart-engine-01, DOC-01: Line-Chart-Chrome-Vertragsnachzug — Ergebnisprotokoll

Status: GRÜN

## Geänderte Dateien

- `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`
- `docs/steering/design/TAILWIND-APP-BAUKASTEN_MOCKUPS_V0-1.html`
- `docs/testing/TEST_PAGE_STANDARD.md`
- Diese Ergebnisdatei

Keine andere Datei geändert (`git status --porcelain` zeigt zusätzlich nur `.claude/learning/session-log.md` — der reguläre Session-Start-Eintrag, kein DOC-01-Write).

## Nachgezogener Vertrag

- **Baukasten:** D-02 ergänzt um die funktionale Legend-Pill-Kontur (`border-border` Ruhe, `border-primary` Hover) als dokumentierte Ausnahme, kein Präzedenzfall für Sections/Panels. §5.3-Zuordnungstabelle trägt jetzt die Border-Spalte für Legend-Pill. §6.11 trägt das finale Pill-Literal (identisch zu `FW_LINE_LEGEND_PILL_CLASS`/`FW_LINE_LEGEND_PILL_HIDDEN_CLASS`), die kompakte `self-start`-BAN, die M/L-Rechtsausrichtung/S-Linksumbruch der zweiten Toolbar-Gruppe, die 12px-Fallback-Paritätsangabe am Wrapper sowie die App-Fabrik-Verbindlichkeitsklausel aus DOC-01a direkt an der Legend-Pill-Zeile.
- **Mockup:** Im Abschnitt „Depotverlauf mit und ohne Warten" wurde die Zeitspannen-Gruppe um eine echte zweite Control-Gruppe (Ansichtsauswahl, `ml-auto`) ergänzt, beide Gruppen nutzen jetzt echte `<button type="button" aria-pressed="…">`. Die zwei Legend-`span`s wurden durch semantisch korrekte `<button type="button" aria-pressed="true">`-Pills mit dem vollständigen finalen Rezept (inkl. `border border-border … hover:border-primary hover:bg-bg-faint hover:text-primary`) ersetzt. Eine sichtbare Dokumentationsnotiz zum S-Zonen-Verhalten (≤450px) wurde unmittelbar bei den Controls ergänzt. Wrapper, Titel, kompakte BAN und `gap-3`-Rhythmus unverändert beibehalten; keine neue Fläche, Karte oder Bild-/SVG-Änderung.
- **Test-Page-Standard:** §10 trägt eine neue, eng auf `tests/engine/`-Seiten begrenzte Fallback-Paritätsregel (MUSS-Pflicht für `FwRenderer`, wenn Tailwind-Rezeptklassen im DOM landen, plus Mindestumfang der Sichtprüfung: M/L, Zone S ≤450px, Ruhe-/Hover-/Fokus-/Toggle-Zustand). Die Play-CDN-Ausnahme für `Apps/{slug}/app.test.html` bleibt unverändert. §5.3 trägt ein zweites, konkretes Chart-Chrome-Beispiel (Wrapper-Rhythmus, BAN-Ausrichtung, Toolbar-Anordnung, Legend-Pill-Ruhe/Hover, sichtbarer Fokus) — keine neue Capability- oder Manifeststruktur.

## App-Fabrik-Verbindlichkeit

- **Legend-Pill als app-übergreifendes Primitive:** In §6.11 unmittelbar an der Legend-Pill-Zeile ergänzt: „Jede App, die dieses Primitive nutzt, verwendet dieses Rezept und dieselben Ruhe-, Hover-, Fokus- und Toggle-Zustände. Eine Abweichung ist nur bei belegter abweichender Funktion zulässig, nicht als optische App-Variante."
- **Ein Rezept/eine Token- und Zustandslogik:** Das dokumentierte Rezept ist wortgleich mit dem realen Code (`FwRenderer.js`, verifiziert unter „Beweise"); es gibt keine zweite, app-lokale Pill-Variante im Vertrag.
- **Nicht Teil dieses APs:** Inventur oder Migration der übrigen ca. 25 Apps. Das ist ein separater, zunächst rein lesender Folge-AP (DOC-01a, Absatz 3).

## Beweise

- **Scope-/Diff-QA:** `git status --porcelain` zeigt ausschließlich die drei erlaubten Dokumentationsquellen + diese Ergebnisdatei geändert (zusätzlich der reguläre `session-log.md`-Eintrag aus dem Session-Start, kein DOC-01-Inhalt). `git diff --stat` bestätigt reine Textänderungen (36 Einfügungen/14 Löschungen über drei Dateien), keine Fremdstände berührt.
- **Code-/Konzept-/Mockup-Konsistenz:** Alle in §6.11 und im Mockup verwendeten Literalstrings wurden per Grep gegen `FwRenderer.js` (Zeilen 30–51) abgeglichen — `FW_LINE_WRAPPER_CLASS`, `FW_LINE_BAN_CONTAINER_CLASS` (inkl. `self-start`), `FW_LINE_VIEW_GROUP_CLASS` (inkl. `ml-auto`), `FW_LINE_LEGEND_PILL_CLASS`/`_HIDDEN_CLASS` (inkl. `border border-border … hover:border-primary hover:bg-bg-faint hover:text-primary`) sind wortgleich mit den jetzt dokumentierten Rezepten. Die tokenbasierten Fallback-Werte (12px-Gap, `align-self:flex-start`, Zone-S-Kaskade) entsprechen dem in CE-3b nachgewiesenen und von Albert abgenommenen Ist-Code (Zeilen 577–610). Kein neues Token, kein neuer Breakpoint, keine neue UI-Philosophie erfunden — reine Übertragung des abgenommenen Ist-Stands.
- **Fallback-QA:** Die neue §10-Regel fordert ausdrücklich keinen Tailwind-Import auf `tests/engine/`-Seiten und verändert die bestehende Play-CDN-Ausnahme für `Apps/{slug}/app.test.html` nicht (Diff zeigt die Play-CDN-Bullet-Liste unverändert, nur eine neue Bullet ergänzt).
- **Historien-QA:** CE-3-, CE-3a- und CE-3b-Ergebnisprotokolle wurden ausschließlich lesend verwendet und nicht verändert (`git status` zeigt sie nicht als geändert). DOC-01 verweist auf CE-3b als finalen, von Albert abgenommenen Korrekturbeleg („Optische Prüfung: Alles einwandfrei").
- **Dokumentationsformat-QA:** Beide Markdown-Tabellen (§3 D-02-Kontext unverändert als Fließtext, §5.3-Tabelle) bleiben syntaktisch gültig (Spaltenzahl unverändert, nur Zellinhalt ergänzt). Das Mockup-Markup ist ausgewogen (`<button>`/`</button>`-Paare geprüft, kein offenes Tag), semantisch korrekt (`type="button"`, `aria-pressed`). Keine ungewollte globale Suche/Ersetzung — jede Änderung wurde einzeln über `Edit` mit engem Kontext vorgenommen.

## Nicht Teil dieses APs

- Produktcode (`FwRenderer.js`, `ChartEngine.js`), Tokens (`tokens.css`, `FwTheme`), `APP_SPEC.md`, Architekturpapier, `CHART_ENGINE_REGRESSIONSREGELN.md`, bestehende CE-3/CE-3a/CE-3b-Ergebnisprotokolle: alle unverändert, nur lesend als Pflichtquellen verwendet.
- Inventur/Migration der App-Fabrik-Apps auf das Legend-Pill-Primitive (DOC-01a, separater Folge-AP).

## Nächster zulässiger Schritt

CE-2b–CE-3b + Tool-01 sind bereits committed (`20bb90c`, Albert, 2026-07-14). Offen ist nur noch der Commit der DOC-01-Artefakte; danach CE-4 Bar-Chart-Chrome.
