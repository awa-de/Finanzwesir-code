# Gegenkritik-Vorlage — Grok · {{APP_NAME}}

<!-- Vorlage. Platzhalter {{APP_NAME}}, {{SLUG}} werden von
     tools/app-fabrik-psychosprint.py (grok-paket) ersetzt. -->

**Eingabe:** ausschließlich das anonymisierte Paket `tests/scratch/{{SLUG}}/psychosprint/GROK_EINGABE_ANONYMISIERT.md` (Entwurf A, Entwurf B). Keine weiteren Dateien, keine Modellzuordnung, keine Reihenfolge-Wertung, keine Webrecherche.

**Auftrag (MOCKUP-VERTRAG.md §7):** unabhängige Zweitmeinung. Bewerte **jeden** Entwurf mit dem bestehenden Vier-Kriterien-Prüfscore (`0/1/2`) und begründe qualitativ. Liefere je Entwurf **höchstens drei** konkrete Schärfungen.

**Harte Grenzen:**
- Kein Sieger, keine Mischvariante, kein dritter Mockup-Pfad, keine Hybridisierung.
- Jeder Hinweis bleibt einem **einzigen** Entwurf zugeordnet (`für Entwurf A` / `für Entwurf B`) oder `nicht übernehmen`.
- Jeder zulässige Hinweis benennt die konkrete Barriere oder das konkrete Nicht-Ziel, die **beizubehaltende Signaturmechanik** und den erwarteten Mockup-Testmoment.
- Verändert ein Vorschlag Nicht-Ziel, Signaturmechanik oder Scope → **nicht** automatisch bauen; gib ihn als eigene Zeile `Produktentscheidung nötig [E<k>] für Entwurf A|B: <exakter Fund>` mit fortlaufender, eindeutiger ID (E1, E2 …) aus.
- Eine neue Idee nur als klare Schärfung **eines** Entwurfs. Fehlt echter Mehrwert: `Keine Verbesserung empfohlen`.
- Keine zweite Jury-Matrix, keine weitere Skala. Du entscheidest nicht über das Produkt; Albert bleibt alleinige Freigabe.

**Keine Vorrede.** Genau dieses Ergebnis nach `tests/scratch/{{SLUG}}/psychosprint/grok-gegenkritik.md` (oder, ohne Dateizugriff, ausschließlich speicherfertiges Markdown):

~~~markdown
---
artefakt: grok-gegenkritik
app: {{SLUG}}
status: roh-unverändert
---

# Unabhängige Gegenkritik — {{APP_NAME}}

## 1. Prüfscore
[Tabelle: Entwurf A und Entwurf B, exakt die vier bestehenden Kriterien
(Barriere-Abbau, Zielzustand, Nicht-Ziele, Mentorrolle), je 0/1/2 plus knappe Begründung]

## 2. Entwurf A — bewahren und schärfen
[Signaturmechanik bewahren]
[maximal drei Hinweise: „für Entwurf A", Barriere/Nicht-Ziel, konkrete Schärfung, Testmoment]

## 3. Entwurf B — bewahren und schärfen
[Signaturmechanik bewahren]
[maximal drei Hinweise: „für Entwurf B", Barriere/Nicht-Ziel, konkrete Schärfung, Testmoment]

## 4. Nicht übernehmen / Produktentscheidungen
[Je eigene Zeile. Produktentscheidungen ZWINGEND mit eindeutiger ID:
`Produktentscheidung nötig [E1] für Entwurf A: <exakter Fund>`
`Produktentscheidung nötig [E2] für Entwurf B: <exakter Fund>`
Reine „nicht übernehmen"-Hinweise ohne ID. Fehlt insgesamt Mehrwert: „Keine Verbesserung empfohlen".]
~~~
