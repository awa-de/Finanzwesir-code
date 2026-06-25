Stand: 2026-06-25 | Session: app-mapping-housekeeping | Geändert von: Claude

# PATCH-QUITTUNG | App-Mapping Housekeeping | 2026-06-25

## Auftrag

Prüfung der Stationen-Mapping-Datei (`docs/homepage/04-stationen-und-app-mapping.md`) auf Vollständigkeit
gegen das App-Verzeichnis (`Apps/`) und `Apps/MINI_SPEC_MAPPING.md`.
Ziel: Bidirektionale Deckung herstellen — jeder Eintrag hat einen Ordner, jeder Ordner hat einen Eintrag.

Zusatzauftrag aus der Prüfung: Zwei App-Ordner umbenennen (Doubletten auflösen).

---

## Geänderte Dateien

| Datei | Art | Stellen |
|-------|-----|---------|
| `Apps/passiv-paradox/` | Ordner umbenannt → `etf-aera-vorbei` | — |
| `Apps/etf-reifegrad-finale/` | Ordner umbenannt → `plan-generator` | — |
| `Apps/MINI_SPEC_MAPPING.md` | EDIT | 7 |
| `docs/homepage/04-stationen-und-app-mapping.md` | EDIT | 3 |

---

## Stellen im Detail

### 1 — Ordner-Umbenennung: passiv-paradox → etf-aera-vorbei

In `04-stationen-und-app-mapping.md` war Station 5 als „ETF-Ära-App" definiert.
Der App-Ordner hieß `passiv-paradox`. Beide Namen decken dasselbe Konzept,
aber der Ordnername transportierte den Inhalt nicht.

Albert hat entschieden: kanonischer Name ist „ETF-Ära vorbei" → Slug `etf-aera-vorbei`.

### 2 — Ordner-Umbenennung: etf-reifegrad-finale → plan-generator

Station 8 war als „Plan-Generator" definiert. Der Ordner hieß `etf-reifegrad-finale`
(vollständiger Titel laut MINI_SPEC: „ETF-Reifegrad-Test & Start-Konfigurator").

Albert hat entschieden: kanonischer Name ist „Plan-Generator" → Slug `plan-generator`.

### 3 — MINI_SPEC_MAPPING.md: Umbenennungen nachgezogen

G3-Zeile: Titel `Das Passiv-Paradox`, Slug `passiv-paradox`, Pfad `/Apps/passiv-paradox/`
→ Titel `ETF-Ära vorbei`, Slug `etf-aera-vorbei`, Pfad `/Apps/etf-aera-vorbei/`

H1-Zeile: Titel `ETF-Reifegrad-Test & Start-Konfigurator`, Slug `etf-reifegrad-finale`
→ Titel `Plan-Generator`, Slug `plan-generator`

Statusliste und Zusammenfassung entsprechend aktualisiert.

### 4 — 04-stationen-und-app-mapping.md: Stationen 4, 5, 8 vervollständigt

Station 4 „Einfachheits-App / 1 ETF vs. 5 ETFs" → `Komplexitätsentlarver (1 ETF vs. 5 ETFs)`,
Status von „App-Spec fehlt/klären" auf „App vorhanden (`komplexitaets-entlarver`)" gesetzt.

Station 5: Status von „App fehlt" auf „App vorhanden (`etf-aera-vorbei`)" gesetzt.

Station 8: Status von „App fehlt" auf „App vorhanden (`plan-generator`)" gesetzt.

### 5 — etf-vergleich (D4) in beide Dateien aufgenommen

Beim Abgleich der 25 App-Ordner gegen MINI_SPEC_MAPPING.md (damals 24 Einträge)
wurde `etf-vergleich` als fehlender Eintrag identifiziert.

**Einsortierung in MINI_SPEC_MAPPING.md:** D4 nach D3 (kostenkiller-ter), Block D/E,
Modulrolle „Haupt-App". Zähler auf 22 Haupt-Apps / 25 Ordner aktualisiert.

**Einsortierung in 04-stationen-und-app-mapping.md:** Vertiefungs-Apps (nicht Hauptpfad).

Begründung für Vertiefungs-Apps statt Hauptpfad:
- Der Hauptpfad hat eine feste Stationsstruktur 0–8.
- Ein neuer Stationsslot würde alle nachfolgenden Stationen umnummerieren.
- Die Blockade von D4 („Ich muss erst den optimalen ETF finden") ist real und eigenständig,
  liegt aber im ETF-Technik-Block D — ein Spezialisierungsthema, das nicht alle Nutzer
  auf dieser Stufe des Funnels betrifft.
- Die MINI_SPEC selbst nennt D4 ein „Exit-Gate aus Block D", nicht ein Top-Level-Homepage-Gate.
  D1–D3 (Namensdecoder, Replizierer, TER) sind ebenfalls nicht im Hauptpfad gelistet.

**Fazit:** D4 gehört in dieselbe Ebene wie D1–D3. Der Vermerk „könnte eigenen Stationsslot erhalten"
hält die Option für eine spätere Homepage-Strukturentscheidung offen, ohne heute zu umnummerieren.

---

## Tabu-Check

- FinanzwesirData.js: nicht berührt ✓
- CSVParser.js: nicht berührt ✓
- FwDateUtils.js: nicht berührt ✓
- PROTECTED_PATHS: nicht berührt ✓
- Kein Code geändert ✓

---

## Gate-Typ

Full (Ordner-Umbenennung + 2 Dateien)

---

## Ergebnis

| Prüfung | Vorher | Nachher |
|---------|--------|---------|
| MINI_SPEC_MAPPING → Apps-Ordner | 24/25 deckend | 25/25 ✓ |
| Apps-Ordner → MINI_SPEC_MAPPING | 24/25 deckend | 25/25 ✓ |
| Stationen 4, 5, 8 im Mapping | „App fehlt" / unklar | App vorhanden + Slug ✓ |
| Ordner-Slugs deckungsgleich mit kanonischen Namen | 2 Abweichungen | 0 Abweichungen ✓ |

---

## Testfall für Albert

`Apps/`-Verzeichnis öffnen: 25 Ordner sichtbar, darunter `etf-aera-vorbei` und `plan-generator`,
kein `passiv-paradox`, kein `etf-reifegrad-finale`.
`Apps/MINI_SPEC_MAPPING.md` öffnen: 25 Einträge in Tabelle und Statusliste, Zusammenfassung „22 Haupt-App-Abschnitte".
`docs/homepage/04-stationen-und-app-mapping.md` öffnen: Stationen 4/5/8 zeigen „App vorhanden",
`etf-vergleich` in Vertiefungs-Apps-Liste.
