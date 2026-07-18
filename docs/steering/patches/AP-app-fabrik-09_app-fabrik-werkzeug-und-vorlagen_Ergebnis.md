Stand: 2026-07-18 09:16 | Session: AP-app-fabrik-09 | Geändert von: Claude

# AP-app-fabrik-09 — App-Fabrik-Werkzeug und Promptvorlagen — Ergebnis

Risikoklasse: B (Dokumentation + begrenzter Werkzeugbau). Schutzgut: die Rollentrennung der App-Fabrik (Python deutet/kürzt/wählt nichts; A=Sol, B=Fable; immer genau zwei Mockups; Albert alleinige Freigabe) und die kanonischen Verträge. Beweisplan: Self-Test (drei Phasen + Nicht-Überschreiben), Dry-Run, Datei-Wiederlesen, deterministische Doku-Prüfung.

## Angelegte / geänderte Dateien (genau 8, exakt im Schreibscope)

**Geändert (2 nachgezogene Textdrifts, Teil A):**
- `docs/App-Fabrik/MOCKUP-VERTRAG.md` — **nur Kopfzeile** auf `Stand: 2026-07-18 | Session: AP-app-fabrik-08 | Geändert von: Claude`. §7 und aller übrige Inhalt bytegleich (in AP-08 bewusst zurückgestellter Header-Restpunkt, jetzt nachgezogen).
- `docs/App-Fabrik/APP_FACTORY_STARTLINIE.md` — **nur Punkt 3** neu gefasst (modellgerechte Sol-/Fable-Psychosprint-Prompts, Werkstatt-Startgerüst ohne App-Logik, Grok-Gegenkritikvorlage gemäß §7 mit Prüfscore + A/B-zuordenbarer Schärfung, deterministisches Python-Werkzeug, Sonnet-Bauprompt + Übergabevorlage). Kopf-Stand (2026-07-18) und alle anderen Punkte unverändert. Dies schließt den in AP-08 gemeldeten Punkt-3-Restabgleich.

**Neu angelegt (Teil B + C):**
- `tools/app-fabrik-psychosprint.py` — deterministisches Werkzeug, 3 Subcommands + `--self-test`.
- `Archiv/local/muss noch eingeordnet werden/App-Fabrik/AP-app-fabrik-09_psychosprint-sol_VORLAGE.md`
- `Archiv/local/muss noch eingeordnet werden/App-Fabrik/AP-app-fabrik-09_psychosprint-fable_VORLAGE.md`
- `Archiv/local/muss noch eingeordnet werden/App-Fabrik/AP-app-fabrik-09_grok-gegenkritik_VORLAGE.md`
- `Archiv/local/muss noch eingeordnet werden/App-Fabrik/AP-app-fabrik-09_mockup-duell-sonnet_VORLAGE.md`
- `docs/steering/patches/AP-app-fabrik-09_app-fabrik-werkzeug-und-vorlagen_Ergebnis.md` (diese Datei)

Keine App-, Theme-, Engine-, Daten-, Test- (außer Werkzeug-Temp) oder Produktionsdatei verändert. `tests/scratch/` unberührt (das Werkzeug erzeugt dort nur bei späterem realen `--write`-Lauf Werkstattartefakte). Die vier Vorlagen liegen unter `Archiv/local/` (gitignored, wie vorgesehen).

## Werkzeug — Verhalten (nur Standardbibliothek, keine Netzwerkzugriffe, UTF-8)

- `prepare --slug --app-name --mini-spec [--write]`: prüft sicheren Slug (`a-z0-9-`) und eine nichtleere Mini-Spec unter `Apps/<slug>/`; füllt Sol- und Fable-Vorlage mit App-Name, Slug, Rohpfad und **unveränderter vollständiger** Mini-Spec; Dry-Run zeigt Ziele, `--write` schreibt Sol-/Fable-Prompt (`_<slug>.md`) und legt `tests/scratch/<slug>/psychosprint/` an.
- `grok-paket --slug [--write]`: liest nur `01-sol.md` + `02-fable.md`, validiert (nichtleer; Frontmatter `artefakt: psychosprint-entwurf`, passender `app`-Slug, `teilnehmer` sol bzw. fable; Abschnitte 1–8); anonymisiert **A=Sol, B=Fable** (nur Frontmatter entfernt, nur erste H1 → „# Entwurf A/B", Rest unverändert); private Zuordnung nur im Manifest; **Leck-Prüfung** (Wortgrenze `\bsol\b`/`\bfable\b`) — bei Treffer kein Write; schreibt anonymes Paket, Manifest, Grok-Prompt.
- `sonnet-paket --slug [--write]`: liest die zwei Rohtexte + `qualitative-gegenkritik.md`, validiert Rohtexte wie oben und das Gutachten (nichtleer, nennt „Entwurf A"/„Entwurf B", enthält Kennzeichnung „für Entwurf A/B" oder „nicht übernehmen"); baut ein Eingabepaket aus kurzem Quellenkopf mit **SHA-256** plus den drei Quellen **unverändert** zwischen klaren Trennmarkern; deutet/kürzt/bewertet/vermischt nichts.
- Gemeinsame Regeln: Zielpfade verlassen den Root nie; alle Konflikte werden vor dem ersten Write festgestellt (keine Teilwrites); Exit 0 Erfolg/Dry-Run, 1 Validierung/Konflikt; **nie überschreiben**.
- `--self-test`: legt ein vollständiges Minimalbeispiel nur in einem Temp-Systemordner an, prüft alle drei Phasen inkl. Nicht-Überschreiben und beweist am Ende, dass keine Repo-Datei erzeugt wurde.

## Befehle und Ergebnisse dieses AP

```text
python tools/app-fabrik-psychosprint.py --self-test
  → SELF-TEST OK: prepare, grok-paket, sonnet-paket inkl. Nicht-Ueberschreiben; kein Repo-Write. (Exit 0)
python tools/app-fabrik-psychosprint.py prepare --slug risiko-uebersetzer \
    --app-name "Risiko-Übersetzer" --mini-spec Apps/risiko-uebersetzer/MINI_SPEC_FROM_HAUPTDOKUMENT.md
  → DRY-RUN (kein --write): würde Sol-/Fable-Prompt + Werkstattordner schreiben; nichts geschrieben. (Exit 0)
```

Nicht-Überschreiben-Schutz im Self-Test bestätigt (jeweils zweiter `--write`-Lauf meldet „Ziel existiert bereits" und schreibt nicht). Verifiziert, dass im echten Repo weder `self-test-app`- noch `_risiko-uebersetzer`-Artefakte entstanden sind. **Dieses AP hat keinen `--write`-Lauf gegen das Repo ausgeführt.**

## Vier Vorlagen gegen MOCKUP-VERTRAG §7 geprüft

- **Sol/Fable:** harte Steuerungsblockbindung, genau eine Mechanik, kein Mockup/Code/Variantenliste, vollständige Mini-Spec über Platzhalter, Frontmatter `teilnehmer: sol`/`fable`, Zielrohpfad. Modellgerechte Denkaufträge (Sol: ruhige Selbsterkenntnis; Fable: dramaturgische Transformation).
- **Grok:** nur anonymes Paket, keine Vorrede, max. drei A/B-zuordenbare Schärfungen, kein Sieger/keine Hybridvariante/kein dritter Pfad, `Produktentscheidung nötig`/`Keine Verbesserung empfohlen`, Prüfscore als einzige Skala, Albert alleinige Freigabe — exakt das §7-Ergebnisformat.
- **Sonnet:** genau zwei getrennte Mockups (A=Sol+Grok-Schärfung, B=Fable+Grok-Schärfung), `Produktentscheidung nötig`/`nicht übernehmen` dokumentieren statt bauen, keine Hybridvariante/dritte Variante/APP_SPEC/Produktionscode, Tailwind-Baukasten + Literalregel + motion-reduce, 375/768/1280 px als manueller Testauftrag ohne Behauptung nicht ausgeführter Browserprüfung.

## Grenzen / Restbefund

- Platzhalter-Konvention `{{APP_NAME}}`, `{{SLUG}}`, `{{ROHPFAD}}`, `{{MINI_SPEC}}` (Sol/Fable) bzw. `{{SLUG}}`, `{{APP_NAME}}` (Grok/Sonnet). `grok-paket`/`sonnet-paket` nehmen `--app-name` optional (Default = Slug), da der Grok-Lauf im Beispiel nur `--slug` übergibt.
- Neuer 2-Modell-Namensvertrag: `01-sol.md` / `02-fable.md`. Der ältere `risiko-uebersetzer`-Werkstattbestand nutzt noch `01-sol.md`/`03-fable.md` (Vier-Modell-Ära); ein realer Lauf für diese App würde umbenannte/neu erzeugte Rohtexte voraussetzen — kein Teil dieses AP.
- Leck-Prüfung ist bewusst wortgrenzenbasiert; sie fängt Modellnamen, nicht Wörter wie „soll"/„Fabel".

## Nächster Schritt

- **Nächster zulässiger Schritt:** `prepare` für die nächste ausgewählte App (dann Psychosprint-Läufe, Grok, Sonnet über das Werkzeug).
- **Ausdrücklich nicht der nächste Schritt:** Psychosprint, Grok-Lauf, Mockup-Bau, APP_SPEC oder Produktionscode in diesem AP.
