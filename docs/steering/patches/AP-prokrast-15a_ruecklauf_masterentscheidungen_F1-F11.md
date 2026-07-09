# AP-prokrast-15a — Rücklaufkapsel Masterentscheidungen — Fragen 1–11

## Status

VOLLENTSCHIEDEN — Alle 11 Entscheidungsfragen aus dem AP-15a-Ergebnisprotokoll sind durch Albert/Master entschieden (Fragen 4 und 5 wurden im Zuge von Frage 3 mitentschieden). Anschlussbedingung für AP-prokrast-15b ist erfüllt.

> **ERRATUM (AP-15c, 2026-07-08):** Die in Entscheidung 7 aus dem Weißmisch-Gesetz abgeleiteten Werte `gelb-80 #E5D337` und `purpur-80 #A43585` sind falsch. Real (`screen.css`): `gelb-80 = #F9EF9E`, `purpur-80 = #C57EB2` — nur Petrol folgt dem Weißmisch-Gesetz, Gelb/Purpur nicht (handgewählt heller). Ohne Folge für die Generierung (Strategie B nutzt die Alt-80er nicht). Quelle: `AP-prokrast-15c_farbleiter-generierung_Ergebnis.md`.

Dieses Dokument ist die Rücklaufkapsel zum Ergebnisprotokoll `AP-prokrast-15a_tailwind-ci-pool-inventar-renderfluss-namensanalyse_Ergebnis.md`. Es dokumentiert Entscheidungen, Begründungen, rechnerische Verifikationen und — ausdrücklich gewollt — alle identifizierten Probleme und Risiken. Es ist Input für den Rollen- und Benennungskontrakt (AP-prokrast-15b).

## Methodik

Jede Frage wurde als Entscheidungsvorlage mit Optionen, Vor-/Nachteilen und Auswirkungen aufbereitet und gegen vier Rahmenwerke geprüft: Advocatus Diaboli (stärkstes Gegenargument gegen die eigene Empfehlung), Ockhams Rasiermesser (sparsamste Erklärung/Lösung), Via Negativa (weglassen vor hinzufügen), Munger-Inversion (wie garantiert man das Desaster?). Farbaussagen wurden rechnerisch verifiziert (WCAG-Kontrast, OKLCH-Konversion, ΔE-Abstände); Behauptungen aus dem Inventar wurden nicht ungeprüft übernommen.

---

## Entscheidung 1 — Primary/Action = Petrol

**Entschieden:** Petrol (`#218380`) ist Markenfarbe und Primary/Action. Der blaue `--fw-color-primary`-Fallback des App-Piloten (`#0071bf`) ist die zu korrigierende Anomalie, nicht die Norm.

**Begründung:** `screen.css` lebt Petrol als Aktionsfarbe bereits (H1/H2, Tabellen-Header, Focus-Ring, Button-Muster der Templates). Petrol hat als einzige Farbe einen vollen Fächer. Blau als Primary hätte Dreifach-Kollision erzeugt (Link = Button = Chart-Serie 1) und einen kompletten Fächer-Neubau erfordert.

**Verifiziert:** Weißer Text auf Petrol = 4,54:1 (WCAG AA bestanden, aber knapp).

## Entscheidung 2 — Blau = Link im UI, frei in Data-Viz, keine Ramp

**Entschieden:** Blau (`#0071BF`) ist exklusiv Linkfarbe im interaktiven UI (Web-Urkonvention). In Charts (Balken, Torten, Linien) bleibt Blau als Serienfarbe (`palette[0]`) erlaubt — Canvas-Inhalt ist nicht klickbar, keine praktische Verwechslungsgefahr. Keine Blau-Ramp, solange kein Konsument existiert.

**Kontrakt-Konsequenz:** Zwei getrennte Einträge, gleicher Wert: `--color-link` (UI-Namensraum) und `chart.palette[0]` (Chart-Namensraum). Dokumentationspflicht: „Blau darf in Apps/Website nur als Link erscheinen; Data-Viz ist ausgenommen."

## Entscheidung 3 — Purpur: Visited-Link, negativer Balken, redaktionelles „Achtung"

**Entschieden (Zwei-Welten-Modell, Option B):**

- Visited-Link = Purpur (Web-Urkonvention, Gegenstück zu Blau-Link)
- Negativer Balken in Charts = Purpur (`semantic.negativeBar`, unverändert)
- Redaktionelle Callouts auf der Website bleiben Marke: `.box-petrol` = „Info/Merke", `.box-purpur` = „Achtung/Vorsicht" (editorial, mit Icon)
- Purpur ist raus aus dem System-Status-Geschäft

**Begründung (Industriestandard):** Alle reifen Design-Systeme (Apple HIG, Material, Carbon, Polaris) trennen Brand-Farben (Identität, Deko, Data-Viz, redaktionelle Stimme) von funktionalen Status-Farben (universell erkennbar: Rot = Error usw.). Redaktionelle Warnung („Achtung, Kostenfalle") ist Markenstimme; Systemzustand („Eingabe ungültig") ist Systemstimme.

## Entscheidung 4 — Error = eigene Statusfarbe, Pilot-Rot wird zentralisiert

**Entschieden:** Error erhält eine bewusst CI-fremde Statusfarbe. Das vom App-Piloten verwendete Set wird geadelt und zentralisiert: `--fw-color-error-*` → `--color-error-text/-border/-bg`, Werte unverändert.

**Befund zur Herkunft:** Das vermeintlich „von einer KI erfundene" Rot ist Material Design Red 800 (`#c62828`) und Red 900 (`#b71c1c`) — milliardenfach erprobte Fehlerfarben. Nur das Hintergrund-Rosé `#fff8f8` ist eine freie Erfindung (rechnerisch geprüft, unbedenklich).

**Verifiziert:**

| Prüfung | Wert | Anforderung | Ergebnis |
|---|---|---|---|
| `#c62828` als Text auf Weiß | 5,62:1 | ≥ 4,5:1 (AA) | bestanden |
| `#b71c1c` auf `#fff8f8` (realer Pilot-Fall) | 6,27:1 | ≥ 4,5:1 | bestanden |
| Weißer Text auf `#c62828` (Error-Button) | 5,62:1 | ≥ 4,5:1 | bestanden |
| `#c62828` als Border/Icon | 5,36:1 | ≥ 3:1 (Non-Text) | bestanden |
| ΔE (Lab) zu Purpur | 60 | > 20 | klar unterscheidbar |
| ΔE (Lab) zu Petrol | 100 | — | kein Konflikt |

**Strukturell vorbildlich:** Das Dreier-Set Text/Border/Hintergrund entspricht exakt dem `color-error-text/-border/-bg`-Muster der großen Systeme.

## Entscheidung 5 — Success/Warning: nicht definieren, Bedarfsregel im Kontrakt

**Entschieden:** Kein Grün, kein Amber. Es existiert heute kein einziger Success- oder System-Warning-Zustand im realen Code. Farben für hypothetische Zustände sind Inventar ohne Nutzer.

**Kontraktregel stattdessen:** „Neue Statusfarben entstehen nur bei nachgewiesenem Bedarf einer konkreten App und nur per Masterentscheidung — nie App-lokal." Damit ist das Dokumentationsloch gestopft, ohne Vorratsfarben zu erfinden.

## Entscheidung 6 — Surface = bg-faint, keine Rampe; Tailwind-Skalen komplett übernehmen

**Entschieden:**

- `--color-surface: var(--color-bg-faint)` (= `#FAFAFA`; identisch mit Tailwinds `neutral-50`)
- Keine Surface-Rampe. Pilot migriert (`--fw-color-surface: #f5f5f5` entfällt; visuelle Differenz nicht wahrnehmbar). `--color-loader-bg` bleibt unberührte Komponentenrolle.
- Trennungsregel nach Gründer-Doktrin (Refactoring UI, Wathan/Schoger) in den Kontrakt: **Abstand > Flächenton > Schatten > Border zuletzt.** Surface trennt nie allein; Cards/Panels erhalten zusätzlich Border oder `--shadow-soft`.
- **Grundsatzentscheidung:** Tailwinds Default-Skalen für Spacing, Schatten, Radius und Borders werden unverändert übernommen — sie sind die kodifizierte Design-Kompetenz der Gründer. Kein `--spacing-*`-Eigenbau; `--fw-space-*` des Piloten löst sich in Tailwind-Spacing auf. `--shadow-soft/-hover` bleiben als zwei benannte, erprobte Zusatzstufen.
- Die CI-Schicht liefert nur, was Tailwind nicht wissen kann: **Farben und Fonts.**

**Verifiziert:** Kein Grauton des Repos ist auf Weiß sichtbar (FAFAFA 1,04:1 / F5F5F5 1,09:1 / F3F3F3 1,11:1 — alle unter der Wahrnehmungsschwelle für Flächentrennung). Die Trennung leisten faktisch Border und Schatten; die Templates tun das bereits. Textkontrast auf allen drei Graus exzellent (> 13:1).

## Entscheidung 7 — 100 % Tailwind: volle Skalen, kalibrierte Pins, Strategie B („behutsame Restaurierung")

**Entschieden:**

1. **Volle Tailwind-Skalen (50–900)** für Petrol, Blau, Gelb, Purpur — nicht sparse. Migrationskosten ausdrücklich akzeptiert; der langfristige Vorteil (LLM-/Tooling-Konventionstreue) überwiegt. Die alten Prozentnamen stammen aus einer Zeit ohne KI-Konzept und ohne Tailwind-Kontext.
2. **Seeds hex-exakt gepinnt:** Die vier kanonischen Vollfarben bleiben pixelidentisch (CI unverändert sichtbar in Überschriften, Buttons, Balken).
3. **Strategie B — behutsame Restaurierung:** Zwischenstufen werden OKLCH-generiert mit gedämpfter Chroma-Kurve (~50 % des Tailwind-Niveaus), finale Feinjustierung per visueller Abnahme durch Albert. Kein „Bonbon" (volle Tailwind-Sättigung, Strategie C, wurde nach Sichtprüfung verworfen: Petrol-200 driftet ins Minzige), kein „Museum" (Alt-Werte behalten, Strategie A: Grauschleier + Löcher in der Leiter bleiben).
4. Alpha-Pseudostufen (`-tint`, `-30`) entfallen als Tokens; Deckkraft wird Tailwind-Alpha-Modifier (`petrol-600/30`).

### Entschlüsseltes Altsystem

Die bisherigen Prozentvarianten sind **lineare Weißmischung** (`-80` = 80 % Farbe + 20 % Weiß; auf den Hexwert exakt verifiziert für petrol-80/-50/-20). Problem der Weißmischung: Chroma-Kollaps — Petrol fällt von C 0,086 (Vollton) auf C 0,020 bei `-20`; die hellen Töne bekommen einen Grauschleier. Tailwind-Skalen halten Buntheit in hellen Stufen bewusst höher.

### Gemessene 1:1-Übersetzung der Bestandswerte (OKLCH)

| Alt | Hex | OKLCH-L | Slot (kalibriert) |
|---|---|---|---|
| petrol | #218380 | 0,555 | petrol-600 (Rekalibrierung gegen Tailwind-Teal in Umsetzung ausstehend) |
| petrol-80 | #4D9C99 | 0,642 | → geht in petrol-500 auf |
| petrol-50 | #90C1BF | 0,776 | → geht in petrol-400 auf |
| petrol-20 | #D3E6E6 | 0,911 | → geht in petrol-200 auf |
| blau | #0071BF | 0,538 | blau-700 (keine Ramp — Entscheidung 2) |
| gelb | #DFC805 | 0,826 | **gelb-500** (kalibriert gegen Tailwind-Yellow-Familie) |
| purpur | #8D0267 | 0,430 | **purpur-900** (kalibriert gegen Tailwind-Pink-Familie) |

**Wichtig:** Die Vollfarben landen auf verschiedenen Stufen (600/700/500/900). Das ist Physik, kein Fehler (Gelb ist von Natur hell, Purpur dunkel; Tailwind selbst hat dasselbe Muster). Aliase halten die Vollfarbe ansprechbar: `petrol` → `petrol-600`, `gelb` → `gelb-500`, `purpur` → `purpur-900`, `blau` → `blau-700`.

### Restaurierte Leitern (Vorschau-Qualität, Strategie B)

Finale Werte entstehen im Umsetzungs-AP mit visueller Abnahme. Vorschau:

**Petrol** (Seed 600 = #218380): 50 #F5FBFB · 100 #DDF5F4 · 200 #C0ECE9 · 300 #98DFDB · 400 #75C7C4 · 500 #419E9A · 600 ★#218380

**Gelb** (Seed 500 = #DFC805): 50 #FDFCEE · 100 #FDF8D1 · 200 #FBF09F · 300 #F5E262 · 400 #EAD32C · 500 ★#DFC805 · 600 #AC9A0D · 700 #817416 · 800 #675E1D · 900 #554E20

**Purpur** (Seed 900 = #8D0267): 50 #FCF3F7 · 100 #FAE8F2 · 200 #F9D0E6 · 300 #F6AAD5 · 400 #F073C0 · 500 #E846B1 · 600 #D6199F · 700 #B90088 · 800 #9A0071 · 900 ★#8D0267

### Entwarnung Asset-Modus (Balkendiagramme)

Der Asset-Modus-Farbfächer hängt **nicht** an den CSS-Tints. Er wird zur Laufzeit berechnet: `getGhostColor(vollfarbe, opacity)` mit linear steigender Deckkraft (0,35 → 1,0) in `BarChartStrategy._transformAssetView()`. Die Charts konsumieren nur die Vollfarben; bei der Migration muss lediglich die `FwTheme`-Bridge die neuen Variablennamen lesen. `getGhostColor` entspricht konzeptionell exakt Tailwinds Alpha-Modifier — die Systeme passen bereits zusammen.

## Entscheidung 8 — Utility-Grenze nach Konsumenten-Regel

**Entschieden (Option B):** Mechanische Ein-Satz-Regel für alle Tokens, jetzt und künftig: „Wird der Wert je in HTML-Klassen gebraucht → Tailwind-Utility. Liest ihn nur JS/Chart-Engine → Bridge-Variable in `:root`. Steuert er nur App-Mechanik → `--fw-*`, app-lokal."

| Kategorie | Inhalt | Wird |
|---|---|---|
| Utilities (`@theme` / Config) | Brand-Skalen petrol/gelb/purpur 50–900, blau-700, Neutral-/Text-Familie, Rollen `primary`/`link`/`surface`/`error-*`, `font-display`/`font-body`, `shadow-soft`/`-hover` | Tailwind-Klassen + CSS-Vars |
| Bridge-only (`:root`) | `--color-grid`, `--color-zero-line`, `--color-loader-bg` | nur CSS-Vars, von `FwTheme` gelesen |
| Rein JS (kein CSS-Token) | `theme.palette`-Reihenfolge, `positiveBar`/`negativeBar`-Zuordnung, `getGhostColor()` | bleibt in `FwTheme.js` |
| App-lokal | `--fw-*`-Mechanik (Timing, Deltas, Positionen) | unverändert |

**Verworfene Alternativen:** „Alles wird Utility" (lädt zu Missbrauch ein: `bg-zero-line` als legale Klasse) und „nur Brand-Skalen als Utilities" (Rollenabstraktion käme im Markup nie an — `bg-primary`/`text-error` wären unbenutzbar). Sonderfall geprüft: Die DOM-basierte Chart-Legende wird aus den ohnehin existierenden Brand-Utilities gespeist, braucht keine Extra-Tokens.

## Entscheidung 9 — Zentrale Token-Datei; Demos bleiben vorerst, Großreinemachen bei Produktionsumstellung

**Entschieden (A+B kombiniert, mit Anpassung):**

- Zielbild: **eine zentrale Token-Datei** (`tokens.css` mit dem `:root`-/`@theme`-Block) als einzige Quelle; Ghost-Theme und lebende Referenzdateien binden sie ein. Hex-Literale in Configs verschwinden dort.
- **Standalone-Demos werden NICHT archiviert:** Albert nutzt aktuell alle bzw. kann Bedarf nicht ausschließen. Sie bleiben funktionsfähig im Ist-Zustand (alte Hex-Configs) liegen.
- **Bewusst akzeptierte Übergangs-Divergenz:** Nach der Skalen-Migration zeigen die Demos veraltete Namen/Werte. Das ist zeitlich begrenzt und wird durch den Produktions-Aufräumtask (siehe To-do T1) aufgelöst — nicht vergessen werden darf es (deshalb Backlog-Pflicht).
- Kein Sync-Skript (Werkzeug zum Erhalt von Duplikation = komplexeste Lösung für ein selbstgemachtes Problem).

## Entscheidung 10 — `fw-app-template.html`: Steinbruch mit Prüfauftrag, kein Neuerfinden

**Entschieden (Option B, mit Leitplanke):** Die Datei ist wertvolles Rohmaterial ohne Bindungskraft („da ist echt gutes Zeug drin"). Beim künftigen Komponentenbaukasten-AP (Ebene 3, nach 15b) dient sie als Startentwurf und wird komponentenweise gegen den Rollen-Kontrakt geprüft, angepasst und erst dann geadelt.

**Leitplanke (Albert wörtlich sinngemäß):** Alles muss Tailwind-kompatibel sein. Für Cards, Boxen, Menüs und ähnliche Bausteine werden die etablierten Tailwind-Element-Muster genutzt — **es wird nichts neu erfunden.** Eigenentwicklungen nur, wo das Tailwind-Ökosystem kein Muster bietet (z. B. Chart-Container-Integration, App-spezifische Mechanik).

## Entscheidung 11 — Purpur-Gradient-Stufen: raus (waren Testfälle) + Exklusivitätsregel

**Entschieden:** Die Demo-only-Stufen `purpur-gradient-light/-medium` waren Testfälle und fliegen raus. Sie werden nicht in die CI-Palette aufgenommen; ihr Effekt ist regulär ausdrückbar (`purpur-50` oder Alpha-Modifier `purpur-900/3`). Sie verschwinden physisch mit To-do T1.

**Verallgemeinerte Kontraktregel (Albert wörtlich sinngemäß):** „Entweder die Farbe ist in der definierten Farbskala — oder sie ist raus." Das geschlossene Farbinventar (4 Brand-Leitern + Neutral-Familie + Error-Set) ist abschließend; Sonderwerte außerhalb der Skalen sind regelwidrig, egal wo sie auftauchen. Das betrifft auch den undokumentierten Plugin-Ton `#006273` (`FwAnnotationPulsePlugin`, P15): Er ist nicht in der Skala → er ist raus. **Ersatz per Masterentscheidung: der Petrol-Vollton** (`petrol-600` = `#218380`, alte Notation „petrol/PRIMARY"). Das Plugin liest den Wert bei der Bridge-Migration künftig aus dem Theme (`theme.colors` ← `--color-petrol-600`) statt ihn zu hartcodieren.

---

## To-dos für BACKLOG (bei nächster Repo-Session in `docs/steering/BACKLOG.md` eintragen)

**T1 — Aufräum- und Optimierungs-AP bei Tailwind-Produktionsumstellung (PFLICHT, nicht vergessen):**
Wenn Tailwind von CDN auf lokalen, komprimierten Build umgestellt wird (Produktionsgang), muss ein vollständiger Durchgang durch alle Tailwind-Konsumenten erfolgen: alle Standalone-Demos auf zentrale Token-Datei umstellen oder archivieren, verbliebene Hex-Literal-Configs auflösen, Purge/Safelist konfigurieren, Minifizierung, Ghost-Asset-Auslieferung prüfen (offener Punkt P18: `.hbs`-Kette), JANITOR-FALLBACK-Sektion in `screen.css` §7 füllen oder entfernen. Auslöser: Produktions-Build-AP. Quelle: Masterentscheidung zu Frage 9, diese Rücklaufkapsel.

---

## Probleme, Risiken und Restpunkte (vollständig, ungefärbt)

| # | Problem / Risiko | Schwere | Detail / Gegenmaßnahme |
|---|---|---|---|
| P1 | Petrol-Kontrast nur knapp AA (4,54:1 mit weißem Text) | mittel | Null Spielraum. Kontraktregel: Petrol-Vollton unter weißem Text nie aufhellen. Jede künftige Seed-Anpassung bricht AA. |
| P2 | Heading-Farbe = Buttonfarbe (beide Petrol) | niedrig-mittel | UX-Geruch: Überschriften könnten klickbar wirken. Beherrschbar über Form/Fläche-Differenzierung; im Kontrakt vermerken. |
| P3 | Blau-Doppelrolle (Link im UI, Serie 1 in Charts) | niedrig | Semantisch unrein, bewusst akzeptiert. Trägt nur mit expliziter Kontrakt-Dokumentation, sonst interpretiert die nächste App frei. |
| P4 | Purpur ist keine konventionelle Warnfarbe | mittel | Redaktionelle „Achtung"-Boxen tragen nur mit Icon + Wording, nie durch Farbe allein. |
| P5 | Fehler-Kodierung und Farbfehlsichtigkeit | mittel | Rot-Grün-Fehlsichtige sehen Error-Rot gedämpft. Kontraktregel (WCAG 1.4.1): Status nie durch Farbe allein kodieren — immer Icon + Text. |
| P6 | `#fff8f8` (Error-BG) ist freie Erfindung ohne Systemherkunft | niedrig | Rechnerisch geprüft (6,27:1 mit Error-Text) — funktioniert, aber bei künftiger Statusfarben-Erweiterung als Muster hinterfragen. |
| P7 | Silent-Failure-Klasse bei sparse Skalen | hoch (war Entscheidungstreiber) | LLM schreibt `bg-petrol-500`, Stufe existiert nicht → kein Fehler, kein Styling, stiller Defekt. Durch volle Skalen eliminiert — aber nur, wenn wirklich alle Stufen definiert werden. |
| P8 | ~30 generierte Zwischenstufen ohne Design-Abnahme | mittel | Algorithmisch erzeugt, von niemandem je gesehen/abgenommen. Pflicht: visuelle Abnahme aller vier Familien nebeneinander durch Albert vor Festschreibung. Bildschirm, Umfeld und Nachbarfarben entscheiden mit — Rechnung ersetzt kein Auge. |
| P9 | Verwässerungsrisiko voller Skalen | mittel | Wenn 11 Stufen existieren, benutzt sie irgendwer. Gegenmittel: Nutzungsregeln im Kontrakt (z. B. „Text auf Weiß nur Stufen mit ≥ 4,5:1"). |
| P10 | Purpur-Mittelstufen (300–600) sind leuchtendes Pink | mittel | Physik: helleres Magenta ist Pink — Bonbon-Risiko. Nutzungsregel: UI-relevante Purpur-Stufen sind 50–200 (Hintergründe) und 700–900 (Text/Füllung); 300–600 primär Data-Viz-Reserve. |
| P11 | Gelb-Dunkelstufen (600–900) werden Senf/Oliv | niedrig | Unvermeidlich, aber nützlich: erstmals legale Textfarbe der Gelb-Familie (Präzisierung der Altregel: „Gelb unter 600 nie als Text" — Vollton hat nur 1,69:1). |
| P12 | Kalibrierungs-Methodik | mittel | Slot-Zuordnung MUSS gegen Tailwinds gleichfarbige Familie kalibriert werden (Gelb→Yellow, Purpur→Pink, Petrol→Teal), nicht gegen hue-neutrale Durchschnittsbänder. Frühschätzungen (Gelb→300, Purpur→800) waren dadurch falsch und wurden korrigiert (→500, →900). Petrol-Rekalibrierung steht aus. |
| P13 | Alt-Varianten werden ersetzt, nicht 1:1 übernommen | niedrig | `petrol-80/-50/-20`, `gelb-80`, `purpur-80` gehen in generierte Leiterstufen auf. Minimale sichtbare Drift an Deko-Stellen (Info-Box-Border, Hover, Icon-BG). Bewusst akzeptiert für konsistente Leiter. |
| P14 | Redaktionssprache veraltet | niedrig | `01-FARBEN-UND-TYPOGRAFIE.md` und Doku sprechen Prozentnamen. Muss im Umsetzungs-AP nachgezogen werden, sonst meinen Redaktion und Code Verschiedenes. |
| P15 | Bridge-Migration Chart-Engine | mittel | `FwTheme.init()` liest 20 benannte `--color-*`-Properties — alle Namen ändern sich. Zusätzlich bekannte Bridge-Lücken schließen: `FwVerticalLinePlugin` (Farbe hartcodiert), `FwChartTextPlugin` (Font hartcodiert), `FwAnnotationPulsePlugin` (`#006273` — geklärt: Altlast/Testfall, Ersatz = Petrol-Vollton per Masterentscheidung, s. Entscheidung 11). |
| P16 | Alpha-Tokens entfallen — Konsumenten prüfen | mittel | `-tint`/`-30` haben reale Konsumenten in `screen.css` (Info-Box-BG, Icon-BG). Migration auf Alpha-Modifier bzw. neue 50/100-Stufen muss jede Fundstelle einzeln umstellen. |
| P17 | Dark Mode ungelöst | vertagt | Existiert nur in CI-fremden Standalone-Prototypen. Alle heutigen Entscheidungen (inkl. Error-Set, Surface) sind Light-Mode-Entscheidungen. Bei Dark-Mode-Bedarf: eigene Masterentscheidung, keine stille Ableitung. |
| P18 | Ghost-Produktionskette weiterhin nicht repo-verifizierbar | niedrig-mittel | Keine `.hbs`-Dateien im Repo (Altbefund AP-14c). Ob echte Ghost-Seiten `screen.css` + Tailwind gemeinsam laden: Browser-Stichprobe weiterhin offen. |
| P19 | Vorschau-Hexwerte sind nicht final | — | Alle Leiter-Werte in diesem Dokument sind Rechenvorschau. Finale Generierung + Abnahme im Umsetzungs-AP. |
| P20 | Übergangs-Divergenz der Standalone-Demos | mittel | Nach Skalen-Migration zeigen alle Demos veraltete Token-Namen/Hex-Configs. Bewusst akzeptiert (Demos bleiben nutzbar), aber NUR tragfähig, wenn To-do T1 (Produktions-Aufräumtask) verbindlich im BACKLOG landet. Vergessen = permanente zweite Wahrheitsquelle. |

---

## Konsolidiertes Zielbild nach Entscheidungen 1–7

**Brand-Welt (Tailwind-Namensraum `--color-*`):** Vier Familien mit vollen, kalibrierten, behutsam restaurierten Skalen: `petrol-50…900` (Seed ★600), `blau-700` (nur Seed, keine Ramp), `gelb-50…900` (Seed ★500), `purpur-50…900` (Seed ★900). Aliase für Vollfarben. Neutral-/Grau-Familie bleibt (text/-sec/-muted/-disabled, border, bg, faint).

**Semantische Rollen:** `--color-primary` = petrol · `--color-link` = blau · `--color-surface` = bg-faint · `--color-text/-muted/-border/-background` = Bestand übernommen · `--color-error-text/-border/-bg` = zentralisiertes Pilot-Set · visited = purpur · Success/Warning: nicht definiert, Bedarfsregel.

**Data-Viz:** Palette und Ampel-Semantik unverändert (blau, purpur = negativ, petrol = positiv, …); Asset-Fächer bleibt Laufzeit-JS (`getGhostColor`).

**Struktur:** Spacing/Schatten/Radius/Borders = Tailwind-Defaults (+ `--shadow-soft/-hover`). Trennungsregel: Abstand > Flächenton > Schatten > Border. `--fw-*` ausschließlich App-Mechanik (Timing, Position, Delta).

## Empfehlung und Anschluss

- **Nächster Schritt:** Startprompt für `AP-prokrast-15b — CI-Pool Rollen- und Benennungskontrakt` erstellen. Der Kontrakt übersetzt diese Rücklaufkapsel in verbindliche Token-Definitionen und Nutzungsregeln (inkl. aller hier festgehaltenen Kontraktregeln: Bedarfsregel Statusfarben, Trennungsregel, Konsumenten-Regel, Nutzungsregeln je Farbfamilie, Exklusivitätsregel).
- **Danach (getrennte Umsetzungs-APs, klein geschnitten):** Skalen-Generierung + visuelle Abnahme durch Albert → `tokens.css` + `screen.css`-Migration → `FwTheme`-Bridge + Plugin-Lücken → App-Pilot-Migration (`--fw-color-*`/`--fw-font-*`/`--fw-space-*` raus) → lebende Referenzdateien.
- **Ausdrücklich nicht jetzt:** Tailwind-Produktionsbuild (wartet auf eigenen AP, siehe To-do T1), Komponentenbaukasten (wartet auf 15b + eigenen AP), Dark Mode (P17, vertagt).
- **Umsetzungsfreigabe für Code-Änderungen:** besteht weiterhin nicht; sie erteilt erst der Masterfaden nach Abnahme des 15b-Kontrakts.
