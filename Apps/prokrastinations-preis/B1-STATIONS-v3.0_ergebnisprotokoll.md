Stand: 2026-06-25 | AP: B1-STATIONS-v3.0 | Status: ✅ ABGESCHLOSSEN

# Ergebnisprotokoll — B1-STATIONS-v3.0: Stations-JSON-Migration

## Ergebnis

Alle 7 Stationen aus `stations.de_neu.json` (v3.0) sind jetzt produktiv in `stations.de.json`.
App lädt, validiert und rendert das neue Format vollständig ohne alten Formatcode.

---

## Geänderte Dateien

| Datei | Art | Was |
|---|---|---|
| `config/stations.de.json` | ERSETZT | v2.1 → v3.0 (7 Stationen, 6 Felder) |
| `app.js` | GEÄNDERT | Validator, Filter, Builder, Renderer, Button-Label |
| `app.test.html` | GEÄNDERT | 5 Test-Beschreibungen aktualisiert |

---

## Bruchstellen — gelöst

| Funktion | Altes Verhalten | Neues Verhalten |
|---|---|---|
| `validateStationsJson()` | v2.1-Felder (selectionPolicy, visualRules, motionRules, priority, role, sourceStatus, mobileIntermediate, flags) | v3.0: 6 Pflichtfelder pro Station; version="3.0" |
| `filterStationsForWindow()` | filterte source_claimed_unchecked und dynamic_latest_month | nur Datumsfenster-Filter; date.slice(0,7) für YYYY-MM-DD |
| `buildJourneyStations()` | Prioritätsauswahl + selectionPolicy + Editorial Gate | chronologisch sortiert; synthetischer Final-Reveal aus CSV |
| `selectStationsForJourney()` | priority/role/flags-Selektion | entfernt |
| `checkEditorialGate()` | crisis-Station-Check + minVisibleStations | entfernt |
| `isFinalRevealStation()` | 10-Zeilen-Guard (role/date/status/flags/id) | `s.isFinalReveal === true` |
| `renderStationCard()` | station.sourceLabel (vorformatiert), station.mobileIntermediate.label | formatSourceLine(station), 'Zwischenstand anzeigen' |
| `renderJourneyStep()` | station.continueLabel \|\| 'Weiter' | isFinalReveal ? 'Ergebnis ansehen' : 'Weiter investiert bleiben' |

## Neu hinzugefügt

- `formatSourceLine(station)` — baut Quellenzeile aus `station.source + station.date` (YYYY-MM-DD → "D. Monatsname YYYY"); für synthetische Final-Reveal-Stationen nur `station.source`

---

## Testplan

Testdatei: `app.test.html` im VSCode Live Server öffnen.

| Szenario | Was prüfen |
|---|---|
| A — Minimal-Card | Content-State, Screen 1 sichtbar, keine JS-Exception |
| AB — Erste Station | Quellenzeile „Zeit Online · 9. November 2016" sichtbar (kein ALLCAPS), Journey-Button „Weiter investiert bleiben" |
| AC — Journey komplett | Alle 7 Stationen + Final-Reveal; letzter Button „Ergebnis ansehen"; Screen 3 erscheint |
| V — Screen-Flow 1→4 | Kompletter Fluss ohne Crash |
| Konsole | Keine `validateStationsJson`-Fehler, kein EditorialDegraded |

Regressionen prüfen: Szenarios U, W, X, Y (Chart-Trim, Zurück-Navigation, AssumptionsBox).

---

## Dramaturgischer Effekt

Das Kern-Problem aus B1-UX-01 (Befund #1) ist technisch behoben:

- **Alt (v2.1):** 4 von 7 Stationen wurden gefiltert (`source_claimed_unchecked`). Nur Trump, Corona, Ukraine blieben. Falsche Auflösung (Impfstoff-Rally 2020) und Bitcoin-Euphorie (2017) fehlten — die dramaturgische Strecke war gebrochen.
- **Neu (v3.0):** Alle 7 Stationen sichtbar. Volle Strecke: Trump (2016) → Bitcoin-Euphorie (2017) → Corona-Crash (2020) → Impfstoff-Rally (2020) → Ukraine (2022) → Nvidia-KI-Euphorie (2024) → SaaS-Okalypse (2026). Angst und Gier wechseln sich ab.

---

## Chronik-Merkposten

Für künftige Stationen-Pflege und LLM-Workflow:

1. **Altes v2.1-Format war zu komplex für LLM-Befüllung.** 14 Felder pro Station (priority, role, flags, sourceStatus, mobileIntermediate, continueLabel, sourceLabel) überforderten das Rechercheprotokoll. Fehlerquellen: falsch gesetzte priority-Werte, Enum-Verletzungen bei role, source_claimed_unchecked-Fallen.

2. **ChatGPT besser für dramaturgische Ereignisauswahl als Perplexity.** Perplexity liefert gute Quellen-Links; ChatGPT denkt in Narrativbögen (Angst-Gier-Wechsel, falsche Auflösung, Eskalation). Empfehlung: ChatGPT für Kandidatenliste und dramaturgischen Bogen, Perplexity für Quellenverifikation und Headline-Check.

3. **„Nimm das Bestehende und ergänze" funktioniert nicht.** Versuch, alte v2.1-Stationen mit neuen zu mischen, scheiterte an Schema-Widersprüchen. Richtiger Weg: sauber mit leerem Array starten, alle Stationen neu befüllen, dann JSON einmal vollständig liefern.

4. **Vollständiger Neustart war die richtige Entscheidung.** Aus 13 LLM-Kandidaten wurden 7 ausgewählt. Das neue `event_pin_llm_befuellen_prompt.md` steuert die Qualität über anchorText-Regeln (nüchterne Essenz, kein Coaching, max. 130 Zeichen).

5. **sourceUrl bleibt Prüfanker, wird nicht gerendert.** Kein UI-Code darf `sourceUrl` sichtbar machen. Liegt nur in JSON als redaktioneller Audit-Anker.

6. **synthetischer Final-Reveal ist App-Verantwortung, nicht JSON-Verantwortung.** Der letzte Schritt vor Screen 3 ("Jetzt kennst du das Ende") kommt jetzt aus `buildJourneyStations()` und wird aus dem CSV-latestMonth gebaut. Er erscheint nie in der JSON-Datei.
