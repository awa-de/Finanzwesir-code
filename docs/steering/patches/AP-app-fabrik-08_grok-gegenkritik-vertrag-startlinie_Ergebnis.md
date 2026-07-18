Stand: 2026-07-18 08:51 | Session: AP-app-fabrik-08 | Geändert von: Claude

# AP-app-fabrik-08 — Grok-Gegenkritik: Vertrag und Startlinie harmonisieren — Ergebnis

## Dateien und tatsächlicher Schreibscope

Genau drei Dateien, exakt im vorgegebenen Scope:

- `docs/App-Fabrik/MOCKUP-VERTRAG.md` — nur §7 geändert.
- `docs/App-Fabrik/APP_FACTORY_STARTLINIE.md` — nur Stand-Datum und Punkte 4–7 geändert.
- `docs/steering/patches/AP-app-fabrik-08_grok-gegenkritik-vertrag-startlinie_Ergebnis.md` — diese Datei (neu).

Keine andere Datei gelesen (außer den vier Pflichtquellen) oder verändert. `Apps/`, `tests/scratch/`, Theme, Engine, Daten, Build, Python-Werkzeuge, bestehende Ergebnisdateien und alle anderen Verträge unangetastet.

## Entfernt / hinzugefügt / warum

**MOCKUP-VERTRAG.md §7 — Rollentabelle, Zeile `Fremdkritik`:**
- **Entfernt:** „liefert ausschließlich qualitative Kritik … vergibt keinen numerischen Score".
- **Hinzugefügt:** Das unabhängige Gegenmodell (Grok) bewertet **jeden** Entwurf mit dem bestehenden Vier-Kriterien-Prüfscore (`0/1/2`) und begründet qualitativ; höchstens **drei** konkrete Schärfungshinweise je Entwurf; entscheidet nicht über das Produkt.
- **Warum:** Grok soll eine substanzielle, unabhängige Zweitmeinung mit Score als Einordnungshilfe geben, nicht nur qualitativ. Keine neue Skala — der vorhandene Prüfscore wird wiederverwendet.

**MOCKUP-VERTRAG.md §7 — neue „Schärfungsregel für die unabhängige Zweitmeinung":**
- **Hinzugefügt** direkt nach dem Selbstzertifizierungssatz: 7 verbindliche Punkte (A/B/`nicht übernehmen`-Kennzeichnung; Barriere/Nicht-Ziel + Signaturmechanik + Testmoment je Hinweis; kein Sieger/keine Mischvariante/kein dritter Pfad; neue Idee nur einem Entwurf zuordenbar; `Produktentscheidung nötig` bei Änderung von Nicht-Ziel/Signaturmechanik/Scope; `Keine Verbesserung empfohlen` bei fehlendem Mehrwert; Score = Zweitmeinung, Albert alleinige Freigabe). Abschluss-Satz: „keine zweite Jury-Matrix" bleibt, ausschließlich vorhandener Prüfscore, keine weitere Skala.
- **Warum:** Grok als scharf begrenzte Zweitmeinung fixieren — schärft genau einen Entwurf, eröffnet keine dritte/Hybrid-Variante, verschiebt keine Freigabekompetenz.

**APP_FACTORY_STARTLINIE.md:**
- **Stand-Datum** `2026-07-17` → `2026-07-18` (nur diese eine Kopfzeile).
- **Punkte 4–7 ersetzt:** aus „Vierer-Kalibrierung (4 Modelle) → Perplexity ohne Score → Produktwahl (Albert wählt 2 von 4) → zwei Mockups bauen" wird die beschlossene Kette: **4** Zweier-Psychosprint (Sol + Fable, je ein Rohentwurf) → **5** unabhängige Kritik durch Grok (Prüfscore + qualitativ, zuordenbare Schärfung, kein dritter Pfad) → **6** festes Zwei-Varianten-Duell (Sonnet baut immer beide) → **7** Mockup-Duell, Albert beurteilt beide auf 375/768/1280 px und wählt.
- **Warum:** Die Startlinie muss die tatsächlich entschiedene Arbeitsweise abbilden (zwei starke Entwürfe, Grok als Zweitmeinung, immer beide gebaut, Albert wählt).

## Positivprüfung (alle vorhanden)

- Vorhandener **Vier-Kriterien-Prüfscore** als einzige Skala: MOCKUP-VERTRAG §7 (Einleitung + Fremdkritik-Zeile) und STARTLINIE Punkt 5. ✓
- **A/B-Zuordnung** jedes Hinweises: Schärfungsregel Punkt 1. ✓
- **Signaturmechanik** beizubehalten: Schärfungsregel Punkte 2 und 5. ✓
- **`Produktentscheidung nötig`**: Schärfungsregel Punkt 5. ✓
- **Genau zwei Mockups**: STARTLINIE Punkte 6 und 7 („immer beide", „beide"). ✓
- **Albert alleinige Freigabeinstanz**: MOCKUP-VERTRAG §7 (Freigabe-Zeile + Schärfungsregel Punkt 7); STARTLINIE Punkt 7. ✓

## Negativprüfung (deterministischer Grep über beide Dateien, keine Treffer)

`Vierer-Kalibrierung`, `ohne numerischen Score`, `Produktwahl`, `Perplexity`, `vier anonymisierten`, `Hybridvariante` — als aktuelle Vorgabe **nicht mehr vorhanden**. ✓
Kein dritter Mockup-Pfad und keine Mischvariante als Vorgabe; im Gegenteil ausdrücklich verboten (Schärfungsregel Punkt 3, STARTLINIE Punkt 5). ✓
„Keine zweite Jury-Matrix" ist als **Verbot** erhalten (kein neuer Score/keine neue Matrix eingeführt) — das erfüllt die Negativvorgabe, statt sie zu verletzen. ✓

## Verbliebene Widersprüche / Restbefund

1. **STARTLINIE Punkt 3** (außerhalb des Änderungsscopes 4–7) nennt weiterhin „**qualitative** Gegenkritik-Leitfrage gemäß MOCKUP-VERTRAG.md §7". Seit dieser Änderung ist §7 nicht mehr rein qualitativ (Grok vergibt zusätzlich den Prüfscore). Das ist ein **terminologischer Restabgleich am Starterkit-Template**, kein aktiver Regelwiderspruch. Er gehört in den Folge-AP (Promptvorlagen), nicht in diesen scharf begrenzten Eingriff. Nicht angefasst, weil Punkt 3 ausdrücklich außerhalb des Schreibscopes liegt.
2. **MOCKUP-VERTRAG-Kopfzeile** (Stand/Session) wurde bewusst **nicht** aktualisiert — der Auftrag lautet „nur §7". Die Kopfzeile ist nicht §7. Kein Konflikt zum Freigabeprinzip; nur eine bewusst gelassene Header-Staleness gemäß Scope.

Kein Widerspruch zu Freigabeprinzip, Mockup-Vertrag oder Startlinie verblieben: Grok bleibt Zweitmeinung (Beweishierarchie `STRUKTURELLE_SICHERHEIT` §7 Rang 6), Albert alleinige Freigabe (Rang 7 / §17.2 Rang 1).

## Nächster Schritt

- **Nächster zulässiger Schritt:** Python-Werkzeug und Promptvorlagen als eigener AP (dabei auch der Punkt-3-Restabgleich oben).
- **Ausdrücklich nicht der nächste Schritt:** Psychosprint, Grok-Lauf, Mockup-Bau, APP_SPEC oder Produktionscode.
