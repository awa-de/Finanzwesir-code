# AP-prokrast-15c — Farbleiter-Generierung und Abnahme-Board — Ergebnis

## Status

GELB

Ein einziger, klar umrissener GELB-Grund: Die geforderte Petrol-Rekalibrierung gegen Tailwinds Teal-Familie ergibt als **streng nächsten** L-Slot die **700**, nicht das im Kontrakt/Rücklaufkapsel erwartete **600**. Ich habe das **nicht** selbst umentschieden — die Generierung läuft weiterhin mit dem vom Kontrakt vorgegebenen Pin 600 (Seed byte-identisch an `petrol-600`), und die Abweichung ist mit beiden Optionen dokumentiert (AP-Vorgabe: „NICHT selbst umentscheiden — als GELB-Befund mit beiden Optionen dokumentieren").

**Wichtige Entschärfung des GELB:** Der Abstand ist ein Quasi-Gleichstand. Petrol-Seed-L = 0,5555; Teal-600 |Δ| = 0,0447; Teal-700 |Δ| = 0,0446 — die 700 „gewinnt" nur um **0,0001** L. Der Seed liegt praktisch exakt auf der Mitte zwischen Teal-600 und Teal-700. Das erwartete Pin 600 wird dadurch **nicht** ernsthaft widerlegt; es bleibt voll verteidigbar (und hält die im Rücklaufkapsel-Entscheid festgelegte Alias-Zuordnung `petrol` → `petrol-600`). Empfehlung daher: 600 bestätigen. Die endgültige Wahl ist eine Masterentscheidung, keine 15c-Entscheidung.

Alles Übrige ist GRÜN-reif: Ist-Werte verifiziert (mit zwei bestätigten Korrekturen an Rücklaufkapsel-Ableitungen), drei Leitern vollständig nach fixierter Methodik generiert, Seeds byte-identisch gepinnt, Kontraste berechnet, Board autark und wertekonsistent, Skript reproduzierbar, alle fünf QA-Ebenen bestanden, Schreib-Scope exakt eingehalten.

## Kurzurteil

Deterministische Farbmathematik vollständig in Python (OKLab/OKLCH nach Ottosson, WCAG-2.x-Kontrast, Gamut-Sicherung durch binäre Chroma-Reduktion — kein Kanal-Clamping). Die generierten Leitern folgen der Kontrakt-§4.3-Methodik und liegen sehr nah an der Rücklaufkapsel-Vorschau (mehrere Werte byte-identisch, z. B. gelb-50 `#FDFCEE`, purpur-50 `#FCF3F7`, purpur-700 `#B90088`), was die Methodik unabhängig validiert. Zwei Sachbefunde: (1) `gelb-80`/`purpur-80` in `screen.css` folgen **nicht** dem Weißmisch-Gesetz — die Rücklaufkapsel hatte sie fehlerhaft abgeleitet; (2) Petrol-Pin-Quasi-Gleichstand 600/700 (s. Status).

## Ist-Werte-Verifikation screen.css

Extrahiert aus dem realen `:root`-Block (`Theme/assets/css/screen.css`, Zeilen 22–39, per Python-Regex, read-only):

| Token | Ist-Wert (Datei) | Rücklaufkapsel-Annahme | Befund |
|---|---|---|---|
| `--color-petrol` | `#218380` | `#218380` | bestätigt |
| `--color-petrol-80` | `#4D9C99` | (Weißmisch) | bestätigt, folgt Gesetz |
| `--color-petrol-50` | `#90C1BF` | (Weißmisch) | bestätigt, folgt Gesetz |
| `--color-petrol-20` | `#D3E6E6` | (Weißmisch) | bestätigt, folgt Gesetz |
| `--color-blau` | `#0071BF` | `#0071BF` | bestätigt |
| `--color-gelb` | `#DFC805` | `#DFC805` | bestätigt |
| `--color-gelb-80` | `#F9EF9E` | `#E5D337` (abgeleitet) | **KORRIGIERT — Abweichung** |
| `--color-purpur` | `#8D0267` | `#8D0267` | bestätigt |
| `--color-purpur-80` | `#C57EB2` | `#A43585` (abgeleitet) | **KORRIGIERT — Abweichung** |

**Mischgesetz-Check** (`-80` = 80 % Farbe + 20 % Weiß, im 8-bit-sRGB):

| Familie | real `-80` | Vorhersage Weißmisch | Folgt Gesetz? |
|---|---|---|---|
| petrol | `#4D9C99` | `#4D9C99` | **ja** |
| gelb | `#F9EF9E` | `#E5D337` | **nein** (real deutlich heller/handgewählt) |
| purpur | `#C57EB2` | `#A43585` | **nein** (real deutlich heller/handgewählt) |

Konsequenz: keine für die Generierung. Strategie B nutzt Seeds + Tailwind-Referenz-L, nicht die Alt-`-80`-Werte; diese werden ohnehin durch generierte Leiterstufen ersetzt (Kontrakt P13). Die Korrektur ist rein dokumentarisch — die Rücklaufkapsel-Behauptung „Mischgesetz auf den Hexwert exakt verifiziert" gilt nur für Petrol, nicht für Gelb/Purpur.

## Petrol-Rekalibrierung (offener Punkt aus Kontrakt §4.3)

Methode: OKLCH-L des Petrol-Seed `#218380` gegen die L-Werte aller Tailwind-Teal-v3-Stufen; nächster Slot gewinnt (analog zur bereits erfolgten Gelb→Yellow-Pin-500- und Purpur→Pink-Pin-900-Kalibrierung).

Petrol-Seed-L = **0,5555**

| Tailwind-Teal | L | \|Δ\| zu Seed |
|---|---|---|
| teal-500 | 0,7038 | 0,1483 |
| **teal-600** | **0,6002** | **0,0447** |
| **teal-700** | **0,5109** | **0,0446** |
| teal-800 | 0,4370 | 0,1185 |

**Befund:** Streng nächster Slot = **700** (|Δ| 0,0446), aber nur **0,0001** L näher als 600 (|Δ| 0,0447). Der Seed liegt faktisch auf der Mitte zwischen Teal-600 und Teal-700 — ein Quasi-Gleichstand, keine belastbare Widerlegung von 600.

**Zwei Optionen (Masterentscheidung, nicht von 15c getroffen):**

- **Option A — Pin bei 600 bestätigen (empfohlen):** Hält die Rücklaufkapsel-Entscheidung 7 und die Alias-Zuordnung `petrol` → `petrol-600`. Der Seed ist minimal dunkler als Tailwinds Teal-600; im generierten Verlauf ist der L-Sprung 500→600 (0,15) größer als 600→700 (0,044), d. h. der dunkle Ast (600–900) wirkt leicht gestaucht. Praktisch tragbar; visuell am Board zu beurteilen.
- **Option B — Pin auf 700 verschieben:** L-konsistent mit Tailwind, gleichmäßigerer Verlauf. Ändert aber die im Rücklaufkapsel-Entscheid festgelegte Namensgebung (`petrol` → `petrol-700`) und verschiebt alle Petrol-Stufennamen — das ist eine bewusste Umkehr einer Masterentscheidung und deshalb nicht von diesem AP zu treffen.

Die aktuell generierte Leiter unten verwendet **Pin 600** (Kontrakt-Ist-Stand). Bei Wahl von Option B ist ein einziger Skript-Lauf mit geändertem Pin nötig.

## Generierte Leitern

Methodik (Kontrakt §4.3, verbindlich): Seeds hex-exakt gepinnt · L je Stufe aus gleichfarbiger Tailwind-Familie · Hue konstant = Seed-Hue · Chroma = Tailwind-Familien-Chroma × Ratio-am-Pin × gleitende Dämpfung (1,0 am Pin → 0,65 an den Leiter-Enden, pro Richtung linear interpoliert) · Gamut durch binäre Chroma-Reduktion gesichert. Rundung: ganzzahlige RGB, Großbuchstaben-Hex.

**Interpolations-Detail (transparenzhalber):** Der gleitende Dämpfungsfaktor ist pro Richtung linear interpoliert, sodass beide Leiter-Enden exakt den vom Kontrakt genannten Endwert 0,65 treffen (Anker: 1,0 am Pin, 0,65 an den Enden). Das ist die Kurvenform zwischen den vom Kontrakt vorgegebenen Stützpunkten, keine eigene Farb-/Designentscheidung.

### Petrol (Seed ★600 = `#218380`, Referenz Teal, Ratio 0,8323)

| Stufe | Hex | OKLCH-L | OKLCH-C | vs Weiß | vs Faint | Text #272727 | Weißtext | Klasse |
|---|---|---|---|---|---|---|---|---|
| 50 | `#F4FBFB` | 0,983 | 0,007 | 1,05 | 1,00 | 14,25 | 1,05 | nur Fläche |
| 100 | `#DAF6F4` | 0,952 | 0,029 | 1,14 | 1,09 | 13,14 | 1,14 | nur Fläche |
| 200 | `#B4EEEB` | 0,909 | 0,059 | 1,28 | 1,23 | 11,64 | 1,28 | nur Fläche |
| 300 | `#89E2DE` | 0,856 | 0,086 | 1,50 | 1,44 | 9,96 | 1,50 | nur Fläche |
| 400 | `#64CDC9` | 0,785 | 0,098 | 1,89 | 1,81 | 7,91 | 1,89 | nur Fläche |
| 500 | `#49B3AF` | 0,705 | 0,097 | 2,51 | 2,41 | 5,94 | 2,51 | Text (dunkel) |
| ★600 | `#218380` | 0,555 | 0,086 | 4,54 | 4,35 | 3,29 | 4,54 | textfähig (Seed) |
| 700 | `#357270` | 0,511 | 0,063 | 5,54 | 5,31 | 2,70 | 5,54 | textfähig |
| 800 | `#325A58` | 0,438 | 0,045 | 7,67 | 7,35 | 1,95 | 7,67 | textfähig |
| 900 | `#2F4A48` | 0,387 | 0,033 | 9,57 | 9,17 | 1,56 | 9,57 | textfähig |

### Gelb (Seed ★500 = `#DFC805`, Referenz Yellow, Ratio 1,0622)

| Stufe | Hex | OKLCH-L | OKLCH-C | vs Weiß | vs Faint | Text #272727 | Weißtext | Klasse |
|---|---|---|---|---|---|---|---|---|
| 50 | `#FDFCEE` | 0,988 | 0,018 | 1,03 | 1,01 | 14,47 | 1,03 | nur Fläche |
| 100 | `#FDF8CF` | 0,973 | 0,053 | 1,08 | 1,03 | 13,87 | 1,08 | nur Fläche |
| 200 | `#FCF09C` | 0,946 | 0,105 | 1,16 | 1,11 | 12,86 | 1,16 | nur Fläche |
| 300 | `#F6E25E` | 0,905 | 0,151 | 1,32 | 1,26 | 11,35 | 1,32 | nur Fläche |
| 400 | `#EAD329` | 0,860 | 0,171 | 1,52 | 1,45 | 9,85 | 1,52 | nur Fläche |
| ★500 | `#DFC805` | 0,826 | 0,172 | 1,69 | 1,62 | 8,82 | 1,69 | nur Fläche (Seed) |
| 600 | `#AB9A13` | 0,680 | 0,138 | 2,85 | 2,73 | 5,24 | 2,85 | Text (dunkel) |
| 700 | `#80741A` | 0,554 | 0,106 | 4,74 | 4,54 | 3,15 | 4,74 | textfähig |
| 800 | `#675E21` | 0,478 | 0,081 | 6,56 | 6,29 | 2,28 | 6,56 | textfähig |
| 900 | `#554E24` | 0,421 | 0,061 | 8,39 | 8,04 | 1,78 | 8,39 | textfähig |

Anmerkung: Die „Klasse"-Spalte meldet Gelb 50–500 als „nur Fläche" (Weißtext < 3, dunkler Text aber exzellent > 8) — die Nutzungsregel (Kontrakt §7.2: „Gelb unter 600 nie als Textfarbe") bezieht sich auf Gelb **als** Textfarbe auf hellem Grund; als Fläche mit dunklem Text darüber sind die hellen Stufen einwandfrei. Erste legale Gelb-**Text**farbe ist Stufe 700 (4,74:1 auf Weiß).

### Purpur (Seed ★900 = `#8D0267`, Referenz Pink, Ratio 1,2633)

| Stufe | Hex | OKLCH-L | OKLCH-C | vs Weiß | vs Faint | Text #272727 | Weißtext | Klasse | Gamut |
|---|---|---|---|---|---|---|---|---|---|
| 50 | `#FCF3F7` | 0,972 | 0,011 | 1,09 | 1,04 | 13,73 | 1,09 | nur Fläche | — |
| 100 | `#FBE8F2` | 0,949 | 0,024 | 1,17 | 1,12 | 12,75 | 1,17 | nur Fläche | — |
| 200 | `#F9D0E6` | 0,899 | 0,054 | 1,38 | 1,32 | 10,81 | 1,38 | nur Fläche | — |
| 300 | `#F7A9D5` | 0,823 | 0,107 | 1,81 | 1,74 | 8,25 | 1,81 | nur Fläche | — |
| 400 | `#F172C1` | 0,725 | 0,179 | 2,65 | 2,54 | 5,63 | 2,65 | Text (dunkel) | — |
| 500 | `#E844B1` | 0,655 | 0,226 | 3,56 | 3,41 | 4,19 | 3,56 | UI/Non-Text | — |
| 600 | `#D7169F` | 0,592 | 0,243 | 4,66 | 4,47 | 3,20 | 4,66 | textfähig | — |
| 700 | `#B90088` | 0,524 | 0,224 | 6,14 | 5,89 | 2,43 | 6,14 | textfähig | Chroma↓ |
| 800 | `#9A0071` | 0,458 | 0,195 | 8,04 | 7,70 | 1,86 | 8,04 | textfähig | Chroma↓ |
| ★900 | `#8D0267` | 0,430 | 0,182 | 8,99 | 8,61 | 1,66 | 8,99 | textfähig (Seed) | — |

Purpur 300–600 sind das leuchtende Pink der Data-Viz-Reserve (Kontrakt §7.3, P10) — nicht als UI-Fläche/Text nutzen.

### Blau

Keine Leiter (Kontrakt §4.1 / E2). Nur Seed **`blau-700` = `#0071BF`**. Kontrast auf Weiß 4,44:1 (Linkfarbe; als reiner Text grenzwertig, aber Links tragen zusätzlich Unterstreichung — Kontrakt § 7.4).

### Abgleich mit Rücklaufkapsel-Vorschau (Validierung)

Mehrere generierte Werte sind byte-identisch oder um 1 LSB nah an der Rücklaufkapsel-Vorschau (Strategie B): gelb-50 `#FDFCEE` (identisch), purpur-50 `#FCF3F7` (identisch), purpur-700 `#B90088` (identisch), purpur-900/gelb-500-Seeds (identisch). Petrol-Mittelstufen weichen etwas stärker ab (z. B. 300 `#89E2DE` vs. Vorschau `#98DFDB`), da die Vorschau selbst „Vorschau-Qualität" mit nicht ausgewiesenen Exakt-Parametern war. Die Nähe bestätigt, dass die hier deterministisch reproduzierte Methodik korrekt ist.

## Generator

- **Datei:** `docs/steering/patches/AP-prokrast-15c_farbleiter_generator.py`
- **Wiederverwendungs-Check:** `tools/` und Repo auf vorhandene Farb-Tools (`oklch`/`contrast`/`palette`/`tint`/`shade`/`luminance`) durchsucht — **kein** wiederverwendbares Farb-Tool gefunden (vorhanden nur `rubikon-symbol-markers-diagnose.js` (Chart-Geometrie), `raw-to-csv.py`, Memory-/Kassensturz-Tools). Generator daher neu gebaut, reine Standardbibliothek (kein `numpy`/`colormath`), damit ohne Zusatzinstallation reproduzierbar.
- **Parameter am Skriptkopf (benannt):** `DAMP_AT_PIN = 1.0`, `DAMP_AT_END = 0.65`, `STAGES`, Tailwind-Referenzpaletten `TW_TEAL`/`TW_YELLOW`/`TW_PINK` (Quelle: Tailwind CSS v3 Default-Palette, hart hinterlegt, kein Web-Zugriff), `SEEDS` mit Pins.
- **Nachjustierung:** Ein Lauf `python AP-prokrast-15c_farbleiter_generator.py` erzeugt Leitern + Kontrasttabellen + Board neu. Für Option B (Petrol-Pin) den Pin in `SEEDS["petrol"]` auf 700 ändern; für andere Sättigung `DAMP_AT_END` ändern.
- **Gamut-Eingriffe:** Chroma-Reduktion (binär, in-sRGB) an genau zwei Stufen: **purpur-700** und **purpur-800** (leuchtendes Magenta bei dieser Helligkeit überschreitet sRGB). Kein stilles Kanal-Clamping — Chroma wurde vor der Hex-Ausgabe reduziert; die Rest-Klemmung liegt unter 1 LSB (numerischer Rand). Alle anderen 28 Stufen ohne Eingriff.

## Nachweis-QA

Alle fünf Ebenen per Python belegt:

1. **Seed-QA:** `#218380` @600, `#DFC805` @500, `#8D0267` @900 byte-identisch in Skript-Output, Board und diesem Protokoll; `#0071BF` als blau-700. → **OK**
2. **Vollständigkeits-QA:** je 10 Stufen (50–900) für Petrol/Gelb/Purpur, keine fehlt/doppelt. → **OK**
3. **Gamut-/Format-QA:** alle 30 Hexwerte matchen `^#[0-9A-F]{6}$`; Gamut-Eingriffe nur via Chroma-Reduktion (purpur-700/-800), kein Kanal-Clamping. → **OK**
4. **Scope-QA:** `git status` zeigt ausschließlich die drei neuen 15c-Dateien (plus vorbestehende, von diesem AP nicht berührte 15a/15b-Artefakte + session-log). → **OK**
5. **Wiederlesen:** Board-HTML gegen Skript-Output abgeglichen — alle 30 generierten Hex + 4 Seeds im Board vorhanden; Autarkie-Prüfung (Marker `http://`, `https://`, `src=`, `<script`, `<link`, `cdn.`, `googleapis`, `fonts.g`, `url(`) → **keine externen Ressourcen**. Board 18 825 Zeichen / 191 Zeilen. → **OK**

## Nicht geändert

Explizit bestätigt, nicht berührt:

- `Theme/assets/css/screen.css` — nur read-only extrahiert, nicht geändert
- `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md` — nicht geändert (auch §8 nicht; Statuswechsel VORLÄUFIG→FINAL macht AP-16 nach Freigabe)
- `docs/steering/patches/AP-prokrast-15a_ruecklauf_masterentscheidungen_F1-F11.md` — nicht geändert
- `Theme/assets/js/fw-chart-engine/**` (inkl. `FwTheme.js`, Plugins) — nicht geändert
- `Apps/prokrastinations-preis/app.css`, Templates, Demos — nicht geändert
- keine `tokens.css` angelegt; keine Migration; Fontdateien nicht geöffnet; kein Web-Zugriff; kein Commit

## Offene Punkte

1. **Petrol-Pin 600 vs. 700 (GELB-Grund):** Quasi-Gleichstand (0,0001 L). Masterentscheidung: Option A (600 bestätigen, empfohlen) oder Option B (700, kehrt Rücklaufkapsel-Namensgebung um). Bis zur Klärung generiert das Skript mit Pin 600.
2. **Gelb-80/Purpur-80-Korrektur:** Rein dokumentarisch (s. Ist-Werte). Die Redaktions-/Doku-Nachführung (`01-FARBEN-UND-TYPOGRAFIE.md`, Kontrakt P14) gehört in den Umsetzungs-AP, nicht hierher.
3. **Petrol dunkler Ast leicht gestaucht:** Folge des Pin-600-Quasi-Gleichstands (500→600 L-Sprung 0,15 vs. 600→700 nur 0,044). Am Board visuell zu beurteilen; bei Wahl von Option B entschärft.
4. **Werte bleiben VORLÄUFIG:** Bis zu Alberts Abnahme am Board. Kontrakt §8 bleibt auf VORLÄUFIG (Statuswechsel erst AP-16).

## Empfehlung

- **Nächster Schritt:** Visuelle Abnahme durch Albert am Board — `docs/steering/patches/AP-prokrast-15c_farbleiter-abnahme-board.html` (autark, per Doppelklick über `file://` öffnen). Am Board ausdrücklich mitentscheiden: Petrol-Pin 600 bestätigen (Empfehlung) oder auf 700 gehen.
- **Zwei Antwortpfade** (auch auf dem Board): „FESTSCHREIBEN → AP-16" oder „NACHJUSTIEREN → `DAMP_AT_END` bzw. Petrol-Pin ändern, ein Skript-Lauf".
- **Ausdrücklich nicht nächster Schritt:** Migration, `tokens.css`, `screen.css`/`FwTheme.js`/`app.css`-Änderung, Kontrakt-Statuswechsel §8 VORLÄUFIG→FINAL.
- **Umsetzungsfreigabe:** nein. Erst nach Alberts Abnahme (inkl. Petrol-Pin-Entscheidung) folgt AP-prokrast-16.
