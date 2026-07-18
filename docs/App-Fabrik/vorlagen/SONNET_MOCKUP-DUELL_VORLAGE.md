# Mockup-Duell-Vorlage — Sonnet · {{APP_NAME}}

<!-- Vorlage. Platzhalter {{APP_NAME}}, {{SLUG}} werden von
     tools/app-fabrik-psychosprint.py (sonnet-paket) ersetzt. -->

## Auftrag

Baue **genau zwei getrennte, interaktive Happy-Path-Werkstatt-Mockups** für die App `{{SLUG}}`. Ausschließlich zum psychologischen Vergleich. Kein Produktionscode, keine technische APP_SPEC.

- **Variante A = ausschließlich der Sol-Entwurf** plus die zulässigen, mit „für Entwurf A" gekennzeichneten Grok-Schärfungen.
- **Variante B = ausschließlich der Fable-Entwurf** plus die zulässigen, mit „für Entwurf B" gekennzeichneten Grok-Schärfungen.

Keine Hybridisierung, keine dritte Variante. Grok-Schärfungen mit `nicht übernehmen` werden **dokumentiert, nicht gebaut**. Grok-Schärfungen mit `Produktentscheidung nötig` baust du **nicht** aus dem Grok-Gutachten — sie gelten **erst**, wenn Albert sie im Abschnitt `PRODUKTENTSCHEIDUNGEN (Albert)` ausdrücklich freigegeben hat (siehe unten).

## Produktentscheidungen (Albert)

`SONNET_EINGABEPAKET.md` ist die **einzige** Wahrheit für Entscheidungen — nichts aus anderen Quellen oder aus dem Chat übernehmen. Enthält es den Abschnitt `PRODUKTENTSCHEIDUNGEN (Albert)`, gilt je Eintrag (E1, E2 …):

- **Freigegeben** (`Status: A` / `B` / `Bedingung`): verbindlich. Setze **exakt** Alberts Entscheidung um, dokumentiere sie in der Ergebnisdatei und baue **keine** andere Alternative.
- **Offen oder `übersprungen`**: **nicht bauen**. Bei `übersprungen` rendere die Warnung „Produktentscheidung nötig, aber vom Nutzer übersprungen — arbeite mit unvollständigen Daten" **sichtbar und unübersehbar im Kopf beider Mockups** (`a-sol` und `b-fable`) — ruhig gestaltet, aber nicht überlesbar und nicht wegklickbar.

## Pflichtquellen — nur diese

1. `tests/scratch/{{SLUG}}/mockup-duell/SONNET_EINGABEPAKET.md` (die zwei Rohtexte + Grok-Gutachten, unverändert)
2. `Apps/{{SLUG}}/MINI_SPEC_FROM_HAUPTDOKUMENT.md` — nur der lokale Steuerungsblock ist bindend
3. `docs/App-Fabrik/MOCKUP-VERTRAG.md`
4. `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`
5. `docs/spec/APP-INTERFACE.md`
6. `docs/steering/audits/SECURITY-BASELINE.md`
7. `tests/scratch/README.md`

## Quellensperre — Harter Stop

Die obige Quellenliste ist vollständig und abschließend, keine Beispielsammlung.

- Verboten: jedes Lesen, Suchen, Auflisten, Kopieren oder Verwenden von `tests/scratch/<anderer-slug>/`, einschließlich fertiger Mockups, Psychosprints, READMEs und vermeintlicher Scaffolds.
- Bestehende Mockups anderer Apps sind niemals Scaffold, Vorlage oder visuelle Referenz.
- Erlaubt unter `tests/scratch/` sind ausschließlich die oben ausdrücklich genannten Einzeldateien der aktuellen App sowie `tests/scratch/README.md`.
- Fehlt eine allgemeine Hülle, Komponente oder Referenz: stoppen, die fehlende allgemeine Quelle benennen und auf Alberts Entscheidung warten. Niemals eine andere App als Ersatzquelle lesen.
- Vor dem ersten Datei-Lesen den Quellenscope in einem Satz bestätigen. Bei einer nicht gelisteten Quelle: nicht lesen, nicht bauen, stoppen.

## Schreibscope

Nur diese Dateien anlegen:

~~~text
tests/scratch/{{SLUG}}/mockup-duell/a-sol/mockup.html
tests/scratch/{{SLUG}}/mockup-duell/b-fable/mockup.html
tests/scratch/{{SLUG}}/mockup-duell/README.md
docs/steering/patches/AF_{{SLUG}}_mockup-duell_Ergebnis.md
~~~

Tabu: `Apps/{{SLUG}}/`, Theme, Engine, Daten, Build, Verträge, bestehende Mockups/Psychosprints, alle anderen Ergebnisdateien.

## Baugrenzen

- Werkstattmodus, nur Happy Path. Kein Backend, Vanilla JS, keine Fremddaten, keine `innerHTML`-Einfügung aus Eingaben, keine Netzwerkzugriffe außer dem kanonischen Tailwind-Play-CDN-Tag des Baukastens.
- `.fw-app` als Wurzel; Baukasten-Primitive und -Token nutzen. Neue app-lokale Mechaniken nur unter `fw-app__*` / `--fw-*`.
- Tailwind-Klassen vollständig und wörtlich (Literalregel §2.2); keine zur Laufzeit zusammengesetzten Klassennamen.
- Jede Interaktion mit sichtbarem `hover:`, `focus-visible:`, `active:`; Bewegungen respektieren `prefers-reduced-motion`.
- Beide Varianten: ruhiger, editorialer CI-Rahmen; keine Alarm-/Scham-Sprache. Alle Zahlen als Test-Szenario markiert. Nicht-Ziele des Steuerungsblocks sind harte Verbote.
- Beide einzeln im Browser aufrufbar; gedanklich 375/768/1280 px prüfen.

## Ergebnis

- `README.md`: Zweck des Duells, Startanweisung, je getestete Wirkungshypothese, manueller Vergleichsablauf.
- Ergebnisdatei: angelegte Dateien, beide Mechaniken, dokumentierte (nicht gebaute) `Produktentscheidung nötig`/`nicht übernehmen`, bewusste harte Grenzen, Werkstattcharakter, manueller Testauftrag 375/768/1280 px.
- **Keine nicht ausgeführte Browserprüfung behaupten.** Status GELB, solange Albert nicht real abgenommen hat.
- Nächster zulässiger Schritt: Alberts manueller Vergleichstest A gegen B. Ausdrücklich nicht: APP_SPEC, Produktionscode, Gewinnerwahl durch das Modell.
