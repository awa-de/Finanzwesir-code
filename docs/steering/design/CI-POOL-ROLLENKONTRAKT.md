Stand: 2026-07-10 | Session: AP-prokrast-17-FONT-SPEC-PARITÄT | Geändert von: Claude

# CI-Pool Rollen- und Benennungskontrakt

> **Status dieses Kontrakts:** Verbindlicher Rollen- und Benennungsvertrag. Übersetzt die Masterentscheidungen der Rücklaufkapsel `AP-prokrast-15a_ruecklauf_masterentscheidungen_F1-F11.md` (VOLLENTSCHIEDEN durch Albert/Master) in stabile Regeln. **Dieser Kontrakt trifft keine eigenen Designentscheidungen** — jede Aussage ist auf die Rücklaufkapsel (Entscheidungen 1–11) oder das Inventar `AP-prokrast-15a_tailwind-ci-pool-inventar-renderfluss-namensanalyse_Ergebnis.md` rückführbar. Bei Widerspruch gilt die Rücklaufkapsel.
>
> **Umsetzungsstatus:** Dies ist ein Kontrakt, kein Code. Es ist bis hierher **keine** CSS-/JS-/Template-Datei migriert. Die konkreten Hexwerte der Zwischenstufen sind **VORLÄUFIG** (siehe § 8) und werden erst in AP-prokrast-15c visuell abgenommen. Code-Umsetzungsfreigabe erteilt allein der Masterfaden nach Abnahme dieses Kontrakts.

---

## 0. Geltungsbereich und Zweck

Dieser Kontrakt definiert das **geschlossene Farb- und Font-Inventar** des Finanzwesir-Designsystems und die Regeln, nach denen Website, App-Pool (25 Apps) und Chart-Engine daraus schöpfen. Grundprinzip (Rücklaufkapsel, Entscheidung 6): **Die CI-Schicht liefert nur, was Tailwind nicht wissen kann — Farben und Fonts.** Struktur (Spacing, Schatten, Radius, Borders) kommt aus Tailwinds Default-Skalen.

Leitentscheidung (aus AP-15a-Auftrag, bestätigt durch die Masterentscheidungen): **Wir arbeiten mit Tailwind, nicht gegen Tailwind.** Es entsteht kein zweiter konkurrierender CI-Namensraum neben Tailwind.

---

## 1. Endgültiges Rollenmodell

Quelle: Rücklaufkapsel Entscheidungen 1–6, konsolidiertes Zielbild.

### 1.1 Semantische Rollen (Farbe)

| Rolle | Token | Wert / Herkunft | Quelle | Anmerkung |
|---|---|---|---|---|
| Primary / Action | `--color-primary` | = Petrol (`#218380`) | E1 | Markenfarbe und Aktionsfarbe. Der blaue Pilot-Fallback `#0071bf` ist die zu korrigierende Anomalie, nicht die Norm. |
| Link (UI) | `--color-link` | = Blau (`#0071BF`) | E2 | Exklusiv Linkfarbe im interaktiven UI. **Nicht** identisch mit der Chart-Serienfarbe (getrennter Namensraum, gleicher Wert). |
| Visited-Link | (Rolle) visited = Purpur | = Purpur (`#8D0267`) | E3 | Web-Urkonvention, Gegenstück zu Blau-Link. |
| Surface | `--color-surface` | = `var(--color-bg-faint)` (`#FAFAFA`) | E6 | Keine eigene Surface-Rampe. Identisch mit Tailwinds `neutral-50`. |
| Text | `--color-text` | Bestand (`#272727`) | Bestand, E-Zielbild | aus `screen.css` übernommen |
| Text sekundär | `--color-text-sec` | Bestand (`#4C4C4C`) | Bestand | aus `screen.css` übernommen |
| Muted | `--color-muted` / `--color-text-muted` | Bestand (`#666666`) | Bestand, E-Zielbild | Pilot-`--fw-color-muted` (`#555555`) löst sich hierin auf |
| Disabled | `--color-text-disabled` | Bestand (`#888888`) | Bestand | aus `screen.css` übernommen |
| Background | `--color-background` / `--color-bg` | Bestand (`#FFFFFF`) | Bestand | aus `screen.css` übernommen |
| Border | `--color-border` | Bestand (`#E7ECEF`) | Bestand | aus `screen.css` übernommen |

### 1.2 Error-Set (zentralisiert)

Quelle: Rücklaufkapsel Entscheidung 4. Das Pilot-Set wird geadelt und zentralisiert, **Werte unverändert**.

| Token | Wert | Herkunft | Verifiziert |
|---|---|---|---|
| `--color-error-text` | `#b71c1c` | Material Design Red 900 | `#b71c1c` auf `#fff8f8` = 6,27:1 (AA bestanden) |
| `--color-error-border` | `#c62828` | Material Design Red 800 | als Border/Icon 5,36:1 (≥ 3:1 Non-Text bestanden) |
| `--color-error-bg` | `#fff8f8` | freie Erfindung, rechnerisch unbedenklich | trägt Error-Text mit 6,27:1 |

Namensmigration: `--fw-color-error-text/-border/-bg` (Pilot) → `--color-error-text/-border/-bg`.

### 1.3 Data-Viz-Semantik (unverändert)

Quelle: Rücklaufkapsel Entscheidung 2, 3, Zielbild. Bleibt in `FwTheme.js`, kein CSS-Rollen-Token.

- Positiver Balken = Petrol (`semantic.positiveBar`)
- Negativer Balken = Purpur (`semantic.negativeBar`)
- Serienpalette-Reihenfolge (`theme.palette`) unverändert; Blau bleibt `palette[0]`.

---

## 2. Erlaubte Namensräume

Quelle: Rücklaufkapsel Entscheidung 6, 7, 8.

| Namensraum | Zweck | Beispiel |
|---|---|---|
| `--color-*` | alle CI-Farbwerte (Brand-Skalen, Rollen, Neutral, Error) | `--color-petrol-600`, `--color-primary`, `--color-error-text` |
| `--font-*` | CI-Fonts | `--font-display`, `--font-body` |
| `--shadow-*` | die zwei benannten, erprobten Zusatz-Schattenstufen | `--shadow-soft`, `--shadow-hover` |
| `--fw-*` | **ausschließlich App-Mechanik** (Timing, Position, Delta) | `--fw-card-to-point-flight-duration`, `--fw-flight-delta-x`, `--fw-rubikon-text-top` |

Weitere allgemeine Namensräume (`--spacing-*`, `--radius-*` etc.) werden **nicht** eigenbaut — dafür gelten Tailwind-Defaults (§ 7.6). Eine spätere Aufnahme eines solchen Namensraums ist nur per Masterentscheidung zulässig.

---

## 3. Verbotene Namensräume und verbotene Muster

Quelle: Rücklaufkapsel Entscheidungen 6, 7, 8, 11.

| Verboten | Warum | Ersatz |
|---|---|---|
| `--fw-color-*` für allgemeine Gestaltung | konkurrierender CI-Namensraum neben Tailwind | `--color-*` |
| `--fw-font-*` für allgemeine Gestaltung | dito | `--font-*` |
| `--fw-space-*` für allgemeine Gestaltung | Struktur kommt aus Tailwind (E6) | Tailwind-Spacing-Utilities |
| Prozent-Stufennamen (`-20`, `-30`, `-50`, `-80`) | stammen aus Zeit ohne Tailwind-Kontext; Chroma-Kollaps durch Weißmischung (E7) | Tailwind-Stufen `50`–`900` |
| Alpha-Pseudostufen als Tokens (`-tint`, `-30`) | Deckkraft gehört nicht in Tokennamen | Tailwind-Alpha-Modifier, z. B. `petrol-600/30` |
| Sonderwerte außerhalb der definierten Skalen (überall, auch in Plugins) | Exklusivitätsregel (E11) | siehe § 7.7 |

**Exklusivitätsregel (Albert wörtlich sinngemäß, E11):** „Entweder die Farbe ist in der definierten Farbskala — oder sie ist raus." Das geschlossene Farbinventar (4 Brand-Leitern + Neutral-Familie + Error-Set) ist abschließend.

---

## 4. Tailwind-kompatible Tokenstruktur

Quelle: Rücklaufkapsel Entscheidung 7 (100 % Tailwind, volle Skalen, kalibrierte Pins, Strategie B).

### 4.1 Grundsatz

- **Volle Tailwind-Skalen `50`–`900`** für Petrol, Gelb, Purpur — nicht sparse. Grund: eliminiert die Silent-Failure-Klasse (LLM schreibt `bg-petrol-500`, Stufe existiert nicht → stiller Defekt, P7).
- **Blau nur als Einzelwert**, keine Ramp, solange kein Konsument existiert (E2).
- **Neutral-Familie** aus Bestand (`text`, `text-sec`, `text-muted`, `text-disabled`, `border`, `bg`, `bg-faint`).

### 4.2 Hex-exakt gepinnte Seeds

Die vier kanonischen Vollfarben bleiben pixelidentisch (CI unverändert sichtbar):

| Alias | Slot | Hex (gepinnt) |
|---|---|---|
| `petrol` | `petrol-600` | `#218380` |
| `gelb` | `gelb-500` | `#DFC805` |
| `purpur` | `purpur-900` | `#8D0267` |
| `blau` | `blau-700` | `#0071BF` |

**Wichtig (E7):** Die Vollfarben landen auf verschiedenen Stufen (600/700/500/900). Das ist Physik, kein Fehler — Gelb ist von Natur hell, Purpur dunkel; Tailwind selbst hat dasselbe Muster. Die Aliase (`petrol` → `petrol-600` usw.) halten die Vollfarbe unter ihrem Kurznamen ansprechbar.

### 4.3 Kalibrierungsmethodik (verbindlich für AP-15c)

Quelle: Rücklaufkapsel Entscheidung 7, Problem P12.

- Zwischenstufen werden **OKLCH-generiert** mit **gedämpfter Chroma-Kurve (~50 % des Tailwind-Niveaus)**; finale Feinjustierung per visueller Abnahme durch Albert (Strategie B — „behutsame Restaurierung").
- Slot-Zuordnung MUSS gegen Tailwinds **gleichfarbige** Familie kalibriert werden (Gelb → Yellow, Purpur → Pink, Petrol → Teal), **nicht** gegen hue-neutrale Durchschnittsbänder.
- **Petrol-Rekalibrierung gegen Tailwind-Teal durchgeführt (AP-15c):** Petrol-Seed-L (0,5555) liegt im Quasi-Gleichstand zwischen Teal-600 (|Δ| 0,0447) und Teal-700 (|Δ| 0,0446) — Differenz 0,0001 L. **Pin 600 per Masterentscheidung bestätigt** (Alias `petrol` → `petrol-600` bleibt).
- Verworfen: Strategie C („Bonbon", volle Tailwind-Sättigung — Petrol-200 driftet ins Minzige) und Strategie A („Museum", Alt-Werte behalten — Grauschleier + Löcher in der Leiter).

### 4.4 Alpha statt Pseudostufen

Alpha-Pseudostufen (`-tint`, `-30`) entfallen als Tokens. Deckkraft wird über den Tailwind-Alpha-Modifier ausgedrückt (z. B. `petrol-600/30`). Konsumenten dieser Alt-Tokens in `screen.css` (Info-Box-BG, Icon-BG) sind bei der Migration einzeln umzustellen (P16).

---

## 5. Konsumenten-Regel (Utility vs. Bridge vs. JS vs. App-lokal)

Quelle: Rücklaufkapsel Entscheidung 8 (Option B).

**Mechanische Ein-Satz-Regel für alle Tokens, jetzt und künftig:**

> „Wird der Wert je in HTML-Klassen gebraucht → Tailwind-Utility. Liest ihn nur JS/Chart-Engine → Bridge-Variable in `:root`. Steuert er nur App-Mechanik → `--fw-*`, app-lokal."

### Vier-Kategorien-Tabelle (E8)

| Kategorie | Inhalt | Wird |
|---|---|---|
| **Utilities** (`@theme` / Config) | Brand-Skalen petrol/gelb/purpur `50`–`900`, `blau-700`, Neutral-/Text-Familie, Rollen `primary`/`link`/`surface`/`error-*`, `font-display`/`font-body`, `shadow-soft`/`-hover` | Tailwind-Klassen **+** CSS-Vars |
| **Bridge-only** (`:root`) | `--color-grid`, `--color-zero-line`, `--color-loader-bg` | nur CSS-Vars, von `FwTheme` gelesen |
| **Rein JS** (kein CSS-Token) | `theme.palette`-Reihenfolge, `positiveBar`/`negativeBar`-Zuordnung, `getGhostColor()` | bleibt in `FwTheme.js` |
| **App-lokal** | `--fw-*`-Mechanik (Timing, Deltas, Positionen) | unverändert |

**Verworfene Alternativen (E8):** „Alles wird Utility" (lädt zu Missbrauch ein: `bg-zero-line` als legale Klasse) und „nur Brand-Skalen als Utilities" (Rollenabstraktion käme im Markup nie an — `bg-primary`/`text-error` wären unbenutzbar). Sonderfall geprüft: Die DOM-basierte Chart-Legende wird aus den ohnehin existierenden Brand-Utilities gespeist, braucht keine Extra-Tokens.

---

## 6. Statusfarben-Regel

Quelle: Rücklaufkapsel Entscheidung 4, 5.

- **Error** ist zentralisiert (§ 1.2).
- **Success und Warning sind NICHT definiert.** Es existiert heute kein Success- oder System-Warning-Zustand im realen Code; Farben für hypothetische Zustände sind Inventar ohne Nutzer.
- **Bedarfsregel:** „Neue Statusfarben entstehen nur bei nachgewiesenem Bedarf einer konkreten App und nur per Masterentscheidung — nie App-lokal."

Abgrenzung (E3): Redaktionelle Callouts auf der Website bleiben **Markenstimme**, nicht Systemstatus: `.box-petrol` = „Info/Merke", `.box-purpur` = „Achtung/Vorsicht" (editorial, immer mit Icon). Purpur ist raus aus dem System-Status-Geschäft.

---

## 7. Nutzungsregeln je Familie und übergreifend

Quelle: Rücklaufkapsel Nutzungsregeln (Zielbild), Probleme P1–P11, Entscheidung 11.

### 7.1 Petrol

- Vollton (`petrol-600`, `#218380`) unter weißem Text **nie aufhellen** — WCAG AA nur knapp bestanden (4,54:1, P1). Jede künftige Seed-Anpassung bricht AA.
- Heading-Farbe = Buttonfarbe (beide Petrol, P2): UX-Geruch beherrschen über Form-/Flächendifferenzierung, nicht über Farbe.

### 7.2 Gelb

- Stufen **unter `600` nie als Textfarbe** — Vollton hat nur 1,69:1 (P11).
- Dunkelstufen `600`–`900` (Senf/Oliv) sind die erstmals legale Textfarbe der Gelb-Familie.

### 7.3 Purpur

- UI-relevante Stufen sind **`50`–`200`** (Hintergründe) und **`700`–`900`** (Text/Füllung).
- Mittelstufen **`300`–`600`** sind primär **Data-Viz-Reserve** — helleres Magenta ist Pink (Bonbon-Risiko, P10).

### 7.4 Blau

- Im UI **exklusiv Link** (§ 1.1, E2).
- In Data-Viz **frei** als Serienfarbe (Canvas-Inhalt ist nicht klickbar, keine Verwechslungsgefahr).
- Dokumentationspflicht (E2): „Blau darf in Apps/Website nur als Link erscheinen; Data-Viz ist ausgenommen."

### 7.5 Trennungsregel (Refactoring-UI-Doktrin, Wathan/Schoger)

Quelle: Rücklaufkapsel Entscheidung 6.

> **Abstand > Flächenton > Schatten > Border zuletzt.**

Surface trennt **nie allein**; Cards/Panels erhalten zusätzlich Border oder `--shadow-soft`. (Verifikation E6: kein Grauton des Repos ist auf Weiß sichtbar — FAFAFA 1,04:1 / F5F5F5 1,09:1 / F3F3F3 1,11:1, alle unter der Wahrnehmungsschwelle.)

### 7.6 Struktur = Tailwind-Defaults

Quelle: Rücklaufkapsel Entscheidung 6.

Spacing, Schatten, Radius und Borders werden aus Tailwinds Default-Skalen unverändert übernommen. Kein `--spacing-*`-Eigenbau. `--fw-space-*` des Piloten löst sich in Tailwind-Spacing auf. `--shadow-soft`/`-hover` bleiben als zwei benannte Zusatzstufen.

### 7.7 Statuskodierung nie durch Farbe allein

Quelle: Rücklaufkapsel Problem P5 (WCAG 1.4.1).

Status wird **nie durch Farbe allein** kodiert — immer **Icon + Text**. Rot-Grün-Fehlsichtige sehen Error-Rot gedämpft; redaktionelle „Achtung"-Boxen tragen nur mit Icon + Wording (P4).

### 7.8 Exklusivitätsregel / Sonderwerte

Quelle: Rücklaufkapsel Entscheidung 11.

Sonderwerte außerhalb der Skalen sind regelwidrig, egal wo sie auftauchen. Konkret:

- Der undokumentierte Plugin-Ton `#006273` (`FwAnnotationPulsePlugin`) ist nicht in der Skala → er ist raus. **Ersatz per Masterentscheidung: der Petrol-Vollton** (`petrol-600` = `#218380`). Das Plugin liest den Wert bei der Bridge-Migration künftig aus dem Theme (`theme.colors` ← `--color-petrol-600`) statt ihn zu hartcodieren.
- Die Demo-only-Stufen `purpur-gradient-light/-medium` waren Testfälle und fliegen raus (E11). Effekt regulär ausdrückbar (`purpur-50` oder Alpha-Modifier `purpur-900/3`). Physisches Verschwinden mit To-do T1.

---

## 8. Hex-Anhang der Zwischenstufen — Status FINAL

Quelle: `AP-prokrast-15c_farbleiter-generierung_Ergebnis.md` (deterministisch generiert, Strategie B).

> **✓ FINAL — verbindlich.** Visuell abgenommen durch Albert am 15c-Board (2026-07-08). Diese Werte sind die einzige gültige Quelle für `tokens.css`; jede Änderung nur per Masterentscheidung. Erzeugt per OKLCH/Strategie B, gamut-gesichert (Chroma-Reduktion nur an purpur-700/-800, kein Kanal-Clamping). Byte-identisch zu `tokens.css` (Theme).

**Petrol** (Seed ★`600` = `#218380`):
`50 #F4FBFB` · `100 #DAF6F4` · `200 #B4EEEB` · `300 #89E2DE` · `400 #64CDC9` · `500 #49B3AF` · `600 ★#218380` · `700 #357270` · `800 #325A58` · `900 #2F4A48`

**Gelb** (Seed ★`500` = `#DFC805`):
`50 #FDFCEE` · `100 #FDF8CF` · `200 #FCF09C` · `300 #F6E25E` · `400 #EAD329` · `500 ★#DFC805` · `600 #AB9A13` · `700 #80741A` · `800 #675E21` · `900 #554E24`

**Purpur** (Seed ★`900` = `#8D0267`):
`50 #FCF3F7` · `100 #FBE8F2` · `200 #F9D0E6` · `300 #F7A9D5` · `400 #F172C1` · `500 #E844B1` · `600 #D7169F` · `700 #B90088` · `800 #9A0071` · `900 ★#8D0267`

**Blau:** keine Ramp — nur `blau-700 = #0071BF` (E2).

**1:1-Übersetzung der abgelösten Bestandswerte (OKLCH-gemessen, E7):** `petrol-80` → geht in `petrol-500` auf · `petrol-50` → `petrol-400` · `petrol-20` → `petrol-200`. Minimale sichtbare Drift an Deko-Stellen (Info-Box-Border, Hover, Icon-BG) ist bewusst akzeptiert für eine konsistente Leiter (P13).

---

## 9. Migrationsreihenfolge (Folge-Kette)

Quelle: AP-15b-Auftrag Kettenposition + Rücklaufkapsel Empfehlung/Anschluss. **Hier nur dokumentiert, nicht ausgeführt.**

| AP | Inhalt | Gate davor |
|---|---|---|
| **AP-prokrast-15c** | Farbleiter-Generierung + visuelles Abnahme-Board (keine Migration) — finale Werte + Abnahme aller vier Familien nebeneinander durch Albert (P8) | — |
| **AP-prokrast-16** | Theme-Migration in **einem** Lauf: `tokens.css` + `screen.css` + `FwTheme`-Bridge + Plugin-Fixes. Die Fusion vermeidet den Alias-Zwischenzustand. | **Browser-Stichprobe der Ghost-Live-Kette durch Albert** (P18: `.hbs`-Kette nicht repo-verifizierbar) |
| **AP-prokrast-17** | Pilot-Migration `prokrastinations-preis` (`--fw-color-*`/`--fw-font-*`/`--fw-space-*` raus) | **Tailwind-Verfügbarkeit im App-Laufzeitkontext prüfen**; `QA_TEST_CASES.md` danach erneut durchlaufen |
| **AP-prokrast-18** | Claims-vs-Files-Review in **frischer Instanz** (kein Selbstzertifikat) | — |

**Font-Bridge-Ausklammerung (verbindlich):** Die Font-Bridge in `FwChartTextPlugin.js` wird **NICHT** in AP-16 gefixt, sondern nur zusammen mit einer **Rubikon-Nachmessung** in einem eigenen Mini-AP — ein Font-Wechsel ändert die Textmetrik und damit die Markerpositionen (verknüpft mit DS-FOLLOWUP-07).

**Bridge-Migration Chart-Engine (P15):** `FwTheme.init()` liest 19 `--color-*`-Properties in 20 Farb-Tokens (`linesDark` wird aus `textSec` abgeleitet, nicht aus CSS gelesen) — alle anderen Namen ändern sich. Zusätzlich zu schließende Bridge-Lücken in AP-16: `FwVerticalLinePlugin` (Farbe hartcodiert), `FwAnnotationPulsePlugin` (`#006273`, Ersatz = Petrol-Vollton, § 7.8). `FwChartTextPlugin` (Font) siehe Ausklammerung oben.

**Font-Bridge-Zielmechanismus (Parität zu Farbe, festgelegt 2026-07-10):** Analog zur Farb-Bridge oben soll `FwTheme.init()` künftig zusätzlich `--font-display`/`--font-body` aus `tokens.css` lesen (voller Mechanismus: `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md`, KDR 14 Punkt 5). **Status: Ziel festgelegt, Code-Umsetzung offen.** Die Font-Bridge-Ausklammerung oben (Z.251) bleibt unverändert gültig — sie beschreibt, warum diese Migration bewusst noch nicht ausgeführt wurde (Rubikon-Metrik-Kopplung), nicht ob sie kommt.

---

## 10. Offene Punkte für spätere APs

Quelle: Rücklaufkapsel Entscheidungen 9, 10, 11 sowie Probleme P17, P18, P20.

| Punkt | Status | Regel / Auftrag |
|---|---|---|
| **Dark Mode** | vertagt (P17) | Existiert nur in CI-fremden Standalone-Prototypen. Alle heutigen Entscheidungen (inkl. Error-Set, Surface) sind Light-Mode-Entscheidungen. Bei Bedarf: **eigene Masterentscheidung, keine stille Ableitung.** |
| **Ghost-Auslieferungskette** | offen (P18) | Es existiert **noch kein Ghost-Template** und keine Live-Auslieferung im Repo — die für AP-16 vorgesehene Browser-Stichprobe der Ghost-Kette **entfällt bis zum Theme-Build**. Lokale Testrealität ist der VSCode-Live-Server (`Theme/index.html`, `Apps/**/app.test.html`). Die Einbindung von `tokens.css` in Ghost ist Aufgabe des Theme-Builds bzw. To-do **T1**. |
| **Komponentenbaukasten / Ebene 3** | eigener AP nach 15b (E10) | `fw-app-template.html` (`docs/App-Fabrik/_input/perplexity/`) ist **Steinbruch mit Prüfauftrag**: wertvolles Rohmaterial **ohne Bindungskraft**. Komponentenweise gegen diesen Rollen-Kontrakt prüfen, anpassen, dann adeln. **Leitplanke (Albert):** Alles Tailwind-kompatibel; für Cards/Boxen/Menüs etablierte Tailwind-Element-Muster nutzen — **nichts neu erfinden.** Eigenentwicklung nur, wo Tailwind kein Muster bietet (z. B. Chart-Container-Integration, App-Mechanik). |
| **Zentrale Token-Datei** | Zielbild (E9) | Eine `tokens.css` (`:root`/`@theme`-Block) als einzige Quelle; Ghost-Theme und lebende Referenzdateien binden sie ein. Hex-Literale in Configs verschwinden dort. Kein Sync-Skript. |
| **Standalone-Demos** | bewusste Übergangs-Divergenz (E9, P20) | Werden **nicht** archiviert, bleiben funktionsfähig im Ist-Zustand (alte Hex-Configs). Nach der Skalen-Migration zeigen sie veraltete Namen/Werte — zeitlich begrenzt, aufgelöst durch To-do **T1**. Nur tragfähig, weil T1 verbindlich im BACKLOG steht. |
| **Produktions-Aufräumtask T1** | im BACKLOG (E9) | Aufräum- und Optimierungs-AP bei Tailwind-Produktionsumstellung (CDN → lokaler Build): Demos auf `tokens.css` umstellen/archivieren, Hex-Literal-Configs auflösen, Purge/Safelist, Minifizierung, Ghost-Asset-Auslieferung (P18), JANITOR-FALLBACK-Sektion `screen.css` §7 füllen/entfernen. |
| **Redaktionssprache** | nachziehen (P14) | `01-FARBEN-UND-TYPOGRAFIE.md` und Doku sprechen noch Prozentnamen. Im Umsetzungs-AP nachziehen, sonst meinen Redaktion und Code Verschiedenes. |

---

## Anhang — Rückführbarkeit

Jeder Abschnitt dieses Kontrakts verweist auf seine Quelle in der Rücklaufkapsel (`E1`–`E11`, `P1`–`P20`) oder das 15a-Inventar. Der Kontrakt fügt **keine** neuen Farbwerte, Rollen oder Regeln hinzu, die nicht dort bereits entschieden wurden. Offene, nicht durch die Rücklaufkapsel aufgelöste Punkte sind als solche markiert (§ 10) und keiner eigenmächtigen Entscheidung unterworfen.
