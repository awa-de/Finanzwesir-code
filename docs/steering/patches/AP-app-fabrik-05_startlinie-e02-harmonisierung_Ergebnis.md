Stand: 2026-07-17 | Session: AP-app-fabrik-05 | Geändert von: Claude

# AP-app-fabrik-05 — Startlinie: E-02 harmonisieren

Status: **GRÜN** — Startlinie Punkt 3 und Punkt 5 tragen keine „Jury-Matrix" und keine numerische Gegenmodell-Bewertung mehr; Stand-Datum auf 2026-07-17 gesetzt. Rein terminologisch-prozessuale Korrektur, keine neue Produktentscheidung.

---

## 0. Metadaten

| Feld | Wert |
|---|---|
| Datum | 2026-07-17 |
| Auftrag | Startlinie chirurgisch mit MOCKUP-VERTRAG.md §7 (E-02) harmonisieren: „Jury-Matrix" in Punkt 3/5 entfernen, Stand-Datum korrigieren. |
| Risikoklasse | A (deterministischer Textfix mit vorgegebenem Wortlaut) |
| Repository / Branch / HEAD | `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0` / master / `40b36bb` |
| Modell | Claude Opus 4.8 |
| Werkzeuge | Read, Edit, Write, Bash (nur `git status`) |

**Gelesene Quellen (3/3, vollständig):**
1. `docs/App-Fabrik/APP_FACTORY_STARTLINIE.md` (vollständig, vor der Änderung neu gelesen)
2. `docs/App-Fabrik/MOCKUP-VERTRAG.md` §7 maßgeblich (aus AP-app-fabrik-04 im Kontext)
3. `docs/steering/patches/AP-app-fabrik-04_mockup-vertrag-verbindlich_Ergebnis.md` (Herkunft des gemeldeten Konflikts, §4 Bedarfspunkt 1)

---

## 1. Rewrite-Vergleich

```
ENTFERNT:
- [Stand] „**Stand:** 2026-07-15"
- [Punkt 3] „3. **Starterkit, Klasse B:** Nur die freigegebenen Vorlagen bauen — Psychosprint-Prompt,
   `mockup.html`-Template, Jury-Matrix und technische Übergabevorlage."
- [Punkt 5] „5. **Unabhängige Kritik:** Perplexity bewertet die vier anonymisierten Entwürfe mit der
   Jury-Matrix; es entscheidet nicht über das Produkt."

HINZUGEFÜGT:
- [Stand] „**Stand:** 2026-07-17"
- [Punkt 3] „3. **Starterkit, Klasse B:** Nur die freigegebenen Vorlagen bauen — Psychosprint-Prompt,
   Werkstatt-Startgerüst ohne App-Logik, qualitative Gegenkritik-Leitfrage gemäß MOCKUP-VERTRAG.md §7
   und technische Übergabevorlage."
- [Punkt 5] „5. **Unabhängige Kritik:** Perplexity prüft die vier anonymisierten Entwürfe qualitativ
   gemäß MOCKUP-VERTRAG.md §7 und ohne numerischen Score; es entscheidet nicht über das Produkt."

BEGRÜNDUNG:
- E-02-Harmonisierung: MOCKUP-VERTRAG.md §7 macht den Vier-Kriterien-Prüfscore zur einzigen Skala und
  verbietet eine zweite Jury-Matrix sowie jeden numerischen Score durch das Gegenmodell. Die Startlinie
  trug in Punkt 3 (zu bauende „Jury-Matrix") und Punkt 5 (Perplexity „mit der Jury-Matrix") noch die
  überholte Terminologie — beide jetzt auf die qualitative Gegenkritik-Leitfrage umgestellt.
- Punkt 3: „`mockup.html`-Template" durch „Werkstatt-Startgerüst ohne App-Logik" ersetzt (konsistent mit
  Werkstattort E-04 und Wegwerfgrenze E-03; vorgegebener Wortlaut).
- Stand-Datum von 2026-07-15 auf 2026-07-17: Die Startlinie wird mit dieser bewussten Korrektur real
  geändert; der Kopf-Vertrag verlangt Datumsführung „nach realem Befund oder bewusster Produktentscheidung".
```

---

## 2. Prinzipien-Check (ausdrücklich bestätigt)

1. **Der Vier-Kriterien-Prüfscore bleibt die einzige Skala.** — Bestätigt: Kein Punktesystem, keine Rangsumme, keine alternative Bewertungsmatrix eingeführt.
2. **Das Gegenmodell liefert nur qualitative Kritik und keinen numerischen Score.** — Bestätigt: Punkt 5 sagt „qualitativ … ohne numerischen Score"; Punkt 3 „qualitative Gegenkritik-Leitfrage".
3. **Albert bleibt die einzige Freigabeinstanz.** — Bestätigt: Punkt 5 „es entscheidet nicht über das Produkt" unverändert erhalten; keine modellseitige Freigabe oder automatische Siegerempfehlung ergänzt.
4. **Das Werkstatt-Startgerüst ist ein CI-Rahmen ohne App-Logik und widerspricht nicht der Wegwerfgrenze.** — Bestätigt: „ohne App-Logik" ausdrücklich benannt; kein Mockup-JS/Datenmodell/Architektur impliziert (E-03).
5. **Kein weiterer Inhalt der Startlinie wurde verändert.** — Bestätigt: Punkt 2 unverändert; Punkte 1, 4, 6–14 wortgleich; Status- und Geltungszeile unverändert. E-05 Revisionstakt nicht erwähnt; E-01–E-04-Nummerierung nicht berührt.

---

## 3. Geänderte Dateien (genau 2)

| Datei | Art | Inhalt |
|---|---|---|
| `docs/App-Fabrik/APP_FACTORY_STARTLINIE.md` | geändert | Stand-Datum; Punkt 3; Punkt 5 (drei exakte Ersetzungen laut §1). |
| `docs/steering/patches/AP-app-fabrik-05_startlinie-e02-harmonisierung_Ergebnis.md` | neu | Dieses Protokoll. |

---

## 4. Nicht-Ziele und Tabu-Check

- **Nicht geändert:** `MOCKUP-VERTRAG.md`, frühere AP-Ergebnisdateien, jede App/APP_SPEC, Test-, Theme-, Engine-, Produktionsdatei, `tests/scratch/`, Chronik-/Archiv-/Werkstatt-Dateien, Komponentenbibliothek, Psychosprint-Prompt, technische Übergabevorlage.
- **Keine neue Starterkit-Datei gebaut.** Punkt 3 benennt weiterhin nur die künftig zu bauenden Vorlagen als Aufgabe (eigener AP), erstellt keine.
- **Keine Rangsumme/Punktevergabe/automatische Siegerempfehlung** ergänzt.
- **Git-Status nach Write:** nur die zwei erlaubten Dateien; die vorbestehenden untracked Einträge (AP-01–04-Ergebnisse, Boomer-Dateien u. a.) unverändert. Kein Commit.

---

## 5. Reale Wiederlektüre nach Write

Beide Zieldateien nach dem Write vom Datenträger gelesen:

- `APP_FACTORY_STARTLINIE.md`: Stand-Zeile trägt 2026-07-17; Punkt 3 und Punkt 5 tragen den neuen Wortlaut ohne „Jury-Matrix"; das Wort „Jury-Matrix" ist in der Datei nicht mehr vorhanden (Body-QA); Punkt 2 und alle übrigen Punkte inhaltlich unverändert.
- Ergebnisdatei: vollständig, Kopf/Body konsistent.
