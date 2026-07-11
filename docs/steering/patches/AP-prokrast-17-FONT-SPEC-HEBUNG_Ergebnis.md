Stand: 2026-07-11 07:45 | Session: AP-prokrast-17-FONT-SPEC-HEBUNG | Geändert von: Claude

**Status:** GRÜN · **Blocker:** nein · **Commit:** nein (Freigabe bei Albert) · **Typ:** Spec-Statushebung

---

## Ziel

Den Font-Bridge-Status an drei Stellen von „Ziel/Code offen" auf „implementiert" heben — mit ehrlicher Reichweite (Mechanismus + Pilot, nicht App-Pool) und benanntem Rubikon-Nachlauf (DS-FOLLOWUP-07). Kein Code, keine Mechanik-Änderung.

## Gelesen (Vorprüfung)

- `git status --short` / `git log --oneline -3`: Pfad A committet (`dbe5007`); Pfad-B-Änderungen (`app.css`, `QA_TEST_CASES.md`) + Nebenprodukte (`tools/ci-token-check.js`, 2 neue Docs) uncommittet — wie im AP-Kontext erwartet.
- Fundstellen per Python bestätigt: `ARCHITECTURE STRATEGY PAPER VX.md` Z.145/152, `TECH-SPEC Theme-Integration Chart-Engine.md` Z.183-187, `CI-POOL-ROLLENKONTRAKT.md` Z.1/251/255.
- Die drei Code-Belegprotokolle: `AP-prokrast-17-FONT-CODE-A-CANVAS_Ergebnis.md`, `..._REVIEW_Ergebnis.md`, `..._CODE-B-HTMLUI_Ergebnis.md`.

## Albert-Rider (vor dem Write eingearbeitet)

Albert wies vor dem OK auf eine Tempus-Falle hin: Der ursprüngliche Plan hätte nur den Statussatz ersetzt und die **Vorsätze** in KDR 14.5 („Font-Parität (**Ziel**, festgelegt …): Fonts **sollen** … nutzen") und CI-POOL §9 („Font-Bridge-**Zielmechanismus** …: … **soll** `FwTheme.init()` **künftig** … lesen") im Futur/Ziel-Ton stehen lassen — direkt neben „Status: implementiert". Das wäre exakt die Kopf-aktualisiert-Body-alt-Drift, die vermieden werden soll (TECH-SPEC hatte es von Anfang an richtig gemacht: „Mechanismus … implementiert", „liest jetzt real"). Rider umgesetzt: Label + Vorsatz-Tempus in **beiden** übrigen Dateien auf „implementiert"/Präsens angeglichen, bevor geschrieben wurde.

## Diff je Datei (entfernt / hinzugefügt / warum)

### 1. `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md`

**Z.145 (Heading):**
- entfernt: `Farbe implementiert, Font-Parität als Ziel (Code offen)`
- hinzugefügt: `Farbe implementiert, Font-Parität implementiert (Pilot)`
- warum: Heading muss den P5-Status widerspiegeln.

**Z.152 (KDR 14 Punkt 5, Label + Vorsatz + Statussatz):**
- entfernt: Label „Font-Parität (**Ziel**, festgelegt 2026-07-10)" + Vorsatz „Fonts **sollen** exakt denselben Mechanismus nutzen" + Statussatz „**Status: Spec-Parität festgelegt … Code-Umsetzung offen.** `FwTheme.init()` liest heute nachweislich nur Farben … Umsetzung folgt in einem eigenen Font-Code-Migrations-AP …"
- hinzugefügt: Label „Font-Parität (**implementiert** 2026-07-11)" + Vorsatz „Fonts **nutzen** denselben Mechanismus" (Tempus-Rider) + Statussatz „**Status: implementiert (2026-07-11, AP-prokrast-17-FONT-CODE-A/B).**" mit Beleg-Kette (Pfad A/B, Review, Browser-Verifikation), expliziter Reichweitenbegrenzung („Mechanismus + Pilot — Rollout auf den übrigen App-Pool ist ein separater, noch offener Schritt") und Rubikon-Fälligkeit (DS-FOLLOWUP-07).
- warum: Statushebung + Rider — Label/Vorsatz/Status jetzt einheitlich im Implementiert-Tempus, kein Widerspruch mehr im selben Absatz. Mechanik-Beschreibung selbst (`FwTheme.init() liest … via getComputedStyle()`, Composition-Root-Kette, Init-Reihenfolge) wortgleich erhalten — nur „liest zusätzlich" blieb, „soll … nutzen" wurde zu „nutzen".

### 2. `docs/spec/TECH-SPEC Theme-Integration Chart-Engine.md`, §5.4

**Z.187 (nur dieser Absatz; Z.174-185 — Font-Tabelle, Ist-Zustand der Font-*dateien*, Token-Namen — unverändert, da sie die Fonts selbst betreffen, nicht die Bridge):**
- entfernt: Label „**Ziel-Mechanismus** (Font-Parität zu Farben, festgelegt 2026-07-10, **Code-Umsetzung offen**)" + „soll `FwTheme.init()` **künftig** auch … lesen" + „**Heutiger Ist-Stand:** `FwTheme.init()` liest **ausschließlich** Farben; `this.fonts` bleibt fest im Constructor definiert. Migration folgt in einem eigenen Font-Code-AP …"
- hinzugefügt: Label „**Mechanismus** (Font-Parität zu Farben, **implementiert** 2026-07-11)" + „liest `FwTheme.init()` **jetzt real** auch … aus `tokens.css`" + „**Ist-Stand:** umgesetzt für Canvas (Pfad A) und HTML-UI (Pfad B) am Piloten …, unabhängig reviewt und browserverifiziert … Rollout auf den übrigen App-Pool offen. Rubikon-Nachmessung … jetzt sachlich fällig, s. DS-FOLLOWUP-07."
- warum: Die alte Negativ-Aussage „liest ausschließlich Farben" ist nach der Migration schlicht falsch und musste ersetzt werden, sonst Selbstwiderspruch. Diese Datei hatte das Tempus im Label/Vorsatz bereits konsistent zum Statussatz gehalten (Albert bestätigte das als Positivbeispiel) — jetzt beide Sätze gemeinsam auf „implementiert" gehoben.

### 3. `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md`

**Z.1 (Stand-Header, Steering-Pflicht):**
- entfernt: `Stand: 2026-07-10 | Session: AP-prokrast-17-FONT-SPEC-PARITÄT | Geändert von: Claude`
- hinzugefügt: `Stand: 2026-07-11 07:45 | Session: AP-prokrast-17-FONT-SPEC-HEBUNG | Geändert von: Claude`

**Z.255 (Font-Bridge-Zielmechanismus, Label + Vorsatz + Statussatz):**
- entfernt: Label „Font-Bridge-**Zielmechanismus** (Parität zu Farbe, festgelegt 2026-07-10)" + „soll `FwTheme.init()` **künftig** zusätzlich … lesen" + „**Status: Ziel festgelegt, Code-Umsetzung offen.** Die Font-Bridge-Ausklammerung oben (Z.251) bleibt unverändert gültig — sie beschreibt, warum diese Migration bewusst **noch nicht** ausgeführt wurde …, nicht ob sie kommt."
- hinzugefügt: Label „Font-Bridge-**Mechanismus** (Parität zu Farbe, **implementiert** 2026-07-11)" + „liest `FwTheme.init()` **jetzt** zusätzlich … aus `tokens.css`" (Tempus-Rider) + „**Status: umgesetzt** (2026-07-11, AP-prokrast-17-FONT-CODE-A/B) — Mechanismus + Pilot …, App-Pool-Rollout offen. Die Font-Bridge-Ausklammerung oben (Z.251) galt für `FwChartTextPlugin.js` (Rubikon-Marker, A6) — die ist durch diese Migration **aufgelöst**: der Font-Wechsel hat stattgefunden, die dort beschriebene Rubikon-Nachmessung ist jetzt sachlich fällig statt nur vorsorglich (DS-FOLLOWUP-07, Backlog)."
- warum: Statushebung + Rider (gleiches Muster wie Datei 1). Zusätzlich präzisiert, dass Z.251 unverändert stehen bleibt, sich aber ihre *Bedeutung* durch die Migration verschiebt (von „noch nicht ausgeführt" zu „ausgeführt, Nachmessung fällig") — sonst Widerspruch zwischen unverändertem Z.251 und gehobenem Z.255.

**Z.251 bewusst unverändert** — beschreibt die historische Ausklammerungs-Entscheidung selbst (verbindlich, nicht Teil dieser Hebung), nur ihre Einordnung wird in Z.255 nachgezogen.

## Wiederlesen bestätigt (Body-QA) ✅

Alle drei Dateien nach dem Write vollständig an den geänderten Stellen neu gelesen:
- Kein Label/Vorsatz/Statussatz-Mix aus „implementiert" neben „Ziel/soll/künftig" mehr vorhanden.
- Grep-Sweep (Python, alle drei Dateien) auf `code-umsetzung offen`, `soll künftig`, `sollen exakt`, `ziel, festgelegt`, `zielmechanismus (font`, `ziel festgelegt, code` → **alle drei Dateien „sauber"**, keine Alt-Formulierung übersehen.
- `git diff --stat -- docs/`: nur die drei Zieldateien, 4/2/4 Zeilen — exakt der geplante chirurgische Umfang.

## Ehrliche Reichweite bestätigt

- Alle drei Dateien sagen ausdrücklich **„Mechanismus + Pilot"**, **nicht** „App-Pool fertig" — Rollout auf die übrigen Apps ist in allen drei Dateien explizit als offener, separater Schritt benannt.
- **Rubikon-Nachmessung (DS-FOLLOWUP-07)** in allen drei Dateien als **jetzt sachlich fällig** benannt — nirgends als erledigt oder optional dargestellt.

## Ausdrücklich NICHT geändert

- Mechanik-Beschreibungen: KDR-14.5-Kernsatz (`FwTheme.init() liest … via getComputedStyle()`, Composition-Root-/Constructor-Injection-Kette, Init-Reihenfolge), TECH-SPEC Z.174-185 (Font-Tabelle, WOFF2/`@font-face`-Ist-Zustand, Token-Namen), CI-POOL Z.251 (Ausklammerungs-Entscheidung selbst) — alle wortgleich erhalten.
- TECH-SPEC Z.286 (Farb-Staleness-Notiz) — separater, hier nicht behandelter Punkt.
- Kein Code, kein `tokens.css`/`screen.css`, keine anderen Spec-Abschnitte, keine `Archiv/**`/`.claude/**`.

## Restliste

- App-Pool-Rollout (Font-Bridge auf die übrigen ~24 Apps) — offen, nicht Teil dieser Hebung.
- Rubikon-Nachmessung S/M/L nach Font-Wechsel — offen, DS-FOLLOWUP-07.
- TECH-SPEC Z.286 Farb-Staleness — separater, unberührter Punkt.

## Abschlussfrage (doppelt)

- **Nächster Schritt = Commit** (Pfad B + diese Spec-Hebung + alle Ergebnisprotokolle), durch Albert.
- **NICHT nächster AP:** Rubikon-Nachmessung, App-Pool-Rollout, Tailwind, Design.

**Kein Commit, kein Abschlussritual ohne Alberts OK.**
