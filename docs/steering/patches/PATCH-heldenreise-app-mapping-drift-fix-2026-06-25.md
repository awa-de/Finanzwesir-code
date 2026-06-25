Stand: 2026-06-25 | Session: heldenreise-app-mapping-drift-fix | Geändert von: Claude

# PATCH-QUITTUNG | Heldenreise App-Mapping Drift-Fix | 2026-06-25

## Auftrag

Redaktionell-dramaturgische Drift im App-Mapping korrigieren: `etf-vergleich` (D4) aus den
Vertiefungs-Apps in den Homepage-Hauptpfad heben, Stationen umnummerieren, MINI_SPEC-Driften
nach den Ordner-Umbenennungen bereinigen, ETF-Apps-Hauptdokument nachziehen.

---

## Geänderte Dateien

| Datei | Art | Stellen |
|-------|-----|---------|
| `docs/homepage/04-stationen-und-app-mapping.md` | EDIT | 4 |
| `Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md` | EDIT | 2 |
| `Apps/etf-aera-vorbei/MINI_SPEC_FROM_HAUPTDOKUMENT.md` | EDIT | 2 |
| `docs/App-Fabrik/ETF-Apps-Hauptdokument.md` | EDIT | 7 |
| `docs/steering/patches/PATCH-heldenreise-app-mapping-drift-fix-2026-06-25.md` | NEU | — |

---

## Vorprüfung

### Arbeitsbaum

- git status --short: ` M .claude/learning/session-log.md`
- Erwartete Änderungen: session-log.md (WARM-START-Eintrag dieser Session)
- Unerwartete Änderungen: keine
- Befund: GRÜN — kein unerwarteter Zustand; kein Code, keine Daten, keine Protected Paths betroffen

### D4-Gate

- D4-Mini-Spec vorhanden: ja (`Apps/etf-vergleich/MINI_SPEC_FROM_HAUPTDOKUMENT.md`)
- D4 als Funnel-Master-App bestätigt: ja — „Modulrolle: Funnel-Master-App / Aktivierungs-App gegen ETF-Perfektionismus"
- D4 als Exit-Gate aus Block D bestätigt: ja — „D4 ist das Exit-Gate aus Block D."
- D4-Blockade bestätigt: ja — „Ich kann noch nicht starten, weil ich erst den optimalen ETF finden muss."
- D4 kein Zusatzmodul: ja — „Sie ist ein eigenständiger Funnel-Slot und kein Zusatzmodul."
- D4 aktuell falsch als Vertiefungs-App einsortiert: ja — in Vertiefungs-Apps-Liste mit Vermerk „könnte eigenen Stationsslot erhalten"
- Befund: GRÜN — alle D4-Bedingungen bestätigt

### Umbenennungs-Gate

- plan-generator alte Metadaten gefunden: ja — Header `ETF-Reifegrad-Test & Start-Konfigurator`, Slug `etf-reifegrad-finale`, Pfad `/Apps/etf-reifegrad-finale/`
- etf-aera-vorbei alte Metadaten gefunden: ja — Header `Das Passiv-Paradox`, Slug `passiv-paradox`, Pfad `/Apps/passiv-paradox/`
- Hauptdokument alte Namen/Slugs gefunden: ja — `etf-reifegrad-finale` an 5 Stellen, `passiv-paradox` an 2 Stellen
- Befund: GELB — Driften bestätigt und bereinigt; etf-aera-vorbei hat offenen Konzeptkonflikt (siehe unten)

---

## Umsetzung

### Homepage-Mapping

- Änderung: Hauptpfad-Tabelle Station 5–8 verschoben, etf-vergleich als neue Station 5 eingefügt
- neue Station: 5 — `etf-vergleich` / „Ich kann noch nicht starten, weil ich erst den optimalen ETF finden muss."
- verschobene Stationen: alt-5 → 6, alt-6 → 7, alt-7 → 8, alt-8 → 9
- Vertiefungs-Apps bereinigt: `etf-vergleich`-Zeile entfernt
- Entscheidungskriterium geschärft: Heldenreise > Nummerierung; Mentor-Apps werden nicht degradiert
- D4-Hinweis ergänzt: nach Vertiefungs-Apps-Liste; sachlich, kein Pathos

### plan-generator Mini-Spec

- Änderung: Header, H1-Abschnitt und Metadaten auf kanonischen Namen aktualisiert
- alter Titel/Slug behandelt als: `Früherer Arbeitstitel` / bleibt im Text als Funktionsbeschreibung erhalten
- Befund: GRÜN

### etf-aera-vorbei Mini-Spec

- Änderung: Header auf `ETF-Ära vorbei`, Slug auf `etf-aera-vorbei`, Metadaten nachgezogen
- alter Titel/Slug behandelt als: `Früherer Arbeitstitel / Unteraspekt: Das Passiv-Paradox`
- offener Konzeptkonflikt: JA
- Befund: GELB — Dateiinhalt beschreibt ausschließlich die G3 Passiv-Paradox-App (akademische
  Systemkritik, Passiv-Fonds-Dominanz). Inhalt passt nicht zum übergeordneten Thema G2 „ETF-Ära
  vorbei" (Rendite-Kalibrierung). Eine inhaltliche Neuentwicklung wäre nötig, um die Datei
  vollständig konsistent zu machen — das übersteigt den Scope dieses Patch.
  Offener Punkt: Ist `etf-aera-vorbei` (G2-Thema) oder `passiv-paradox` (G3-Thema) der kanonische
  Inhalt dieses Ordners? Klärung durch Albert erforderlich.

### ETF-Apps-Hauptdokument

- Änderung: H1-Abschnitt (Slug `etf-reifegrad-finale` → `plan-generator`, Titel aktualisiert,
  Früherer Arbeitstitel ergänzt), G3-Slug (`passiv-paradox` → `etf-aera-vorbei`),
  Master-Prioritätsliste Zeile 19, Phase-3-Tabelle G3, Phase-4-Tabelle H1, Funnel-Diagramm H1,
  Änderungsprotokoll v6.1 ergänzt
- D4-Exit-Gate erhalten: ja — D4-Abschnitt unverändert; E1-Schutzplanke erhalten
- E1 optional erhalten: ja

---

## Prüfungen

- etf-vergleich im Hauptpfad: JA — Station 5
- etf-vergleich nicht mehr in Vertiefungs-Apps: JA — Zeile entfernt
- Stationen 0–9 konsistent: JA
- plan-generator letzte Station: JA — Station 9
- alte Slugs in kanonischen Metadaten entfernt: JA — etf-reifegrad-finale und passiv-paradox nur noch in historischen Früherer-Arbeitstitel-Feldern
- kein Code geändert: JA
- keine APP_SPEC geändert: JA
- keine Daten geändert: JA
- keine ChartEngine geändert: JA
- kein Commit: JA
- kein Abschlussritual: JA

---

## Status

- **GELB** — Hauptziel erreicht; ein offener Konzeptkonflikt erfordert weitere Klärung

## Blocker

- nein (Konzeptkonflikt ist ein offener Punkt, kein Blocker für diesen Patch)

---

## Offene Punkte

1. **Konzeptkonflikt etf-aera-vorbei vs. passiv-paradox:**
   Der Ordner `etf-aera-vorbei` enthält aktuell die Mini-Spec für G3 Das Passiv-Paradox.
   Das G2-Thema „ETF-Ära vorbei / Rendite-Kalibrierung" hat eine eigene Mini-Spec in
   `docs/App-Fabrik/ETF-Apps-Hauptdokument.md` (G2-Abschnitt, Slug `rendite-kalibrierung`).
   Klärungsbedarf: Soll `etf-aera-vorbei` (a) auf G2-Inhalt umgeschrieben werden,
   (b) als Passiv-Paradox-App behalten und zurückbenannt werden, oder (c) als Kombinationsthema
   (ETF-Ära + Passiv-Paradox) inhaltlich neu entwickelt werden?

2. **Station-Nummerierung in anderen Dateien:**
   Falls weitere Dateien die alte Nummerierung 0–8 referenzieren, sind diese nachzuziehen.
   Dieser Patch betrifft nur die erlaubten Dateien.

---

## Empfohlener nächster AP

Konzeptkonflikt klären: etf-aera-vorbei vs. passiv-paradox (Inhaltsentscheidung durch Albert,
dann ggf. Mini-Spec-Neuentwicklung oder Rückbenennung).

---

## Bestätigungen

- Heldenreise hat Vorrang vor Nummerierung: JA
- D4 ist keine technische Vertiefung: JA
- D4 ist Produktwahl-Blockade: JA
- D4 ist Mentor-App im Hauptbogen: JA
- D1/D2/D3 nicht zusätzlich in Homepage-Hauptpfad aufgenommen: JA
- E1 nicht als Pflichtstation nach D4 gesetzt: JA
- Keine Code-Arbeit: JA
- Keine Ordner-Umbenennung: JA
- Keine APP_SPEC-Arbeit: JA
- Kein Commit: JA
- Kein Abschlussritual: JA
