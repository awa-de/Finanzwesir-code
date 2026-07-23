Stand: 2026-07-23 | Session: css-altlasten-tokens-janitor-grenze | Geändert von: Claude (vorher: Codex, DS-013-Entscheidung)

# T1 — lokaler Tailwind-Produktionsbuild

## 1. Auftrag und Ziel

T1 ersetzt nach der Ghost-Integration die vorproduktive Play-CDN-Brücke durch
ein lokales, minimiertes Tailwind-CSS. Das Ergebnis wird ausschließlich als
Theme-Asset ausgeliefert. Es enthält nur Utilities, die in echten Theme-,
Template-, App- oder Engine-Quellen vollständig und wörtlich vorkommen.

T1 baut kein zweites Design-System. `Theme/assets/css/tokens.css` bleibt die
einzige Quelle für Farben, Schriften und Zusatzschatten; Tailwind liefert die
vereinbarte Struktur-Skala.

## 2. Architektur und Grenzen

```text
tokens.css ─┐
            ├─ CI-Bridge ─┐
Theme-HBS ──┤              │
Apps-JS ────┼─ Scanner ────┼─ lokales, minimiertes Theme-CSS ── Ghost
Engine-DOM ─┘              │
                            └─ Produktions-Gate
```

| Bereich | Verantwortlich | Nicht verantwortlich |
| --- | --- | --- |
| `tokens.css` | CI-Werte und Namen | Tailwind-Layout oder Buildlogik |
| Tailwind | Struktur, Abstand, Grid, Radius, Border | neue CI-Werte oder freie Farben |
| `screen.css` | Basis, Ghost-Content, Marken-Sonderfälle, Komponenten | visuelle `fw-*`-Regeln |
| `.hbs` und App-JS | vollständige Klassenliterale | dynamisch konstruierte Klassennamen |
| T1-Gate | Nachweis des erzeugten CSS | Änderung von Apps oder Chart-Engine |

Das öffentlich ausgelieferte Theme behält genau eine CSS-Datei. Die genaue
Input-/Output-Mechanik wird vor der Implementierung in DS-013 entschieden;
sie darf weder ein zweites öffentliches Stylesheet noch eine Inline-
Tailwind-Konfiguration in Ghost-Templates erzeugen.

### DS-013 — entschiedene Input-/Output-Trennung

- Bearbeitete Quelle: `Theme/src/css/screen.source.css`.
- Einzige ausgelieferte Datei: `Theme/assets/css/screen.css`.
- `default.hbs` bleibt unverändert und lädt weiter nur
  `{{asset "css/screen.css"}}`.
- Die bisher manuell gepflegte `screen.css` wird vollständig in die Quelle
  überführt; die ausgelieferte Datei ist danach ausschließlich Build-Ausgabe
  und wird nicht direkt geändert.
- Der Build nutzt die vorhandene System-Node-24-Laufzeit. Die private Node 22
  unter `C:\Tools\ghost-local` bleibt ausschließlich Ghost vorbehalten.
- Tailwind liefert Theme und Utilities, aber keinen Preflight-Reset. Damit
  bleiben die vorhandenen Ghost-Content- und Basisregeln ohne Global-Reset
  erhalten.

Diese Entscheidung schafft eine klare Quellentrennung ohne zweite
ausgelieferte CSS-Datei. Paketname, exakte Version und Build-Befehl werden im
nächsten Implementierungsschritt festgelegt und anschließend praktisch
verifiziert.

## 3. Bindende Regeln

- Kein Tailwind-Play-CDN im Ghost-Theme und keine externe Design-Abhängigkeit.
- Die CI-Bridge übernimmt die Namen aus `tokens.css` 1:1, etwa
  `--color-petrol-600` zu `bg-petrol-600`.
- Jede Utility ist ein vollständiges Literal im Template oder in einer
  benannten JavaScript-Konstante. Interpolation und String-Verkettung sind
  ausgeschlossen.
- `fw-*` ist ein technischer Namespace für Chart-Engine und bestehende
  App-Anker. Theme-Komponenten verwenden beschreibende Namen ohne Präfix.
- Tailwind gestaltet Layout, Abstände, Flexbox, Grid und Standardradius.
  `screen.css` enthält nur seine sechs festgelegten Verantwortungsbereiche.
- Die bestehenden Testseiten behalten bis zum bestandenen Produktions-Gate
  ihren Play-CDN- und Manifest-Mechanismus; T1 entfernt ihn nicht vorzeitig.

## 4. Verbindliche Quellenmenge

Der spätere Scanner berücksichtigt nur reale Produktionsquellen:

1. `Theme/**/*.hbs` einschließlich aller Partials,
2. `Theme/assets/js/**/*.js`, soweit sie Theme- oder Engine-DOM erzeugen,
3. `Apps/*/app.js` und weitere produktiv eingebundene App-Module,
4. die lokale CI-Bridge mit `tokens.css` als Wertequelle.

Testharness-Dateien, Visual Boards, Archive und Play-CDN-Manifeste sind keine
Scanner-Quellen. Sie bleiben Nachweis- und Vergleichsquellen, nicht Teil des
auszuliefernden CSS.

## 5. Umsetzung in kleinen Schritten

1. **DS-013 entscheiden:** Eindeutig festlegen, wie eine Build-Eingabe und
   das eine ausgelieferte `screen.css` zusammenwirken, ohne den bestehenden
   CSS-Vertrag zu brechen.
2. **Quellen inventarisieren:** Jede verwendete Utility und jeder Ort mit
   Klassenliteralen wird maschinenlesbar erfasst; dynamische Konstruktionen
   werden vor dem ersten Build beseitigt oder als belegte Ausnahme benannt.
3. **Lokale Bridge anlegen:** Die CI-Namen werden ohne kopierte Hex-Werte in
   Tailwind verfügbar gemacht. Paket, Buildwerkzeug und Befehl werden erst
   nach Schritt 1 gewählt.
4. **Minimierten Build erzeugen:** Der Build scannt exakt die Quellen aus
   Abschnitt 4 und schreibt nur das lokale Theme-Asset.
5. **Produktions-Gate ausführen:** Für jede App wird die Menge ihres bisherigen
   Play-CDN-Manifests mit dem erzeugten CSS verglichen. Jede dort deklarierte
   Utility muss im Artefakt vorkommen.
6. **Ghost integrieren:** Das lokale Theme lädt das Artefakt über `{{asset}}`;
   danach werden Index, Beitrag, Seite, Tag, Autor und Fehlerseite lokal
   geprüft.
7. **Erst danach bereinigen:** CDN- und Manifest-Pflicht im Produktionspfad
   sowie der Übergangsstatus der Testseiten werden nur nach bestandenem Gate
   angepasst.

## 6. Abnahmekriterien

- Ghost lädt kein Tailwind-CDN und keine Inline-Tailwind-Konfiguration.
- Alle genutzten Theme- und App-Utilities sind lokal im erzeugten CSS
  vorhanden; keine Klassen werden zur Laufzeit zusammengesetzt.
- Farben, Fonts und Zusatzschatten stammen weiter aus `tokens.css`; das
  Artefakt führt keine neuen Hex-Werte als zweite CI-Quelle ein.
- Das ausgelieferte Theme besitzt genau eine CSS-Auslieferungsdatei.
- Der Größenwert liegt unter 30 KB, sofern die reale Quellenmenge dies ohne
  Weglassen einer benötigten Utility zulässt.
- Die bestehenden Play-CDN-Testseiten bleiben bis zum dokumentierten
  Mengenvergleich unverändert prüfbar.

## 7. Nicht Bestandteil von T1

- Keine neue visuelle Komponente, kein Redesign und keine Änderung von
  `tokens.css`.
- Keine Änderung an App-Logik, Chart-Engine, Ghost-Datenbank oder
  Produktionsserver.
- Kein Umbau von `fw-janitor.js`; dessen vorhandene Altklassen werden erst im
  ausdrücklich vorgesehenen Folgeauftrag behandelt.

## 8. Dokumentationsabschluss

Nach einer tatsächlichen T1-Umsetzung werden nur nachweislich erledigte
Backlog- und Checklistenpunkte aktualisiert. Dieser Plan ersetzt weder den
Backlog-Eintrag T1 noch die technische Implementierungsentscheidung.
