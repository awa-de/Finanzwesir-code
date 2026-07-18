Stand: 2026-07-18 18:08 | Session: AP-app-fabrik-09h | Geändert von: Claude

# AP-app-fabrik-09h — Masterprompt-Bereinigung (Textteil) — Ergebnis

Status: **GRÜN**.

Herkunft: gemeinsame schrittweise Prüfung des Masterprozesses „App-Fabrik: Psychosprint bis Mockup-Duell" (Gedankenexperiment, jede Phase gegen den realen Werkzeug-Code getestet). Ergebnis waren 8 Korrekturen + 6 bewusst akzeptierte Beobachtungen. Dieser AP setzt den **reinen Textteil** (K1–K5, K7, K8) um; der Werkzeugteil (K6) ist als eigener AP geschnitten (`AP-app-fabrik-09i`).

## Geänderte / angelegte Dateien (genau 2 + Original erhalten)

- **Neu:** `Archiv/local/muss noch eingeordnet werden/App-Fabrik/Masterprompt — App-Fabrik Psychosprint bis Mockup-Duell (bereinigt).md` — bereinigte, de-escapte Fassung.
- **Geändert:** `Archiv/local/muss noch eingeordnet werden/App-Fabrik/AP-app-fabrik-09_mockup-duell-sonnet_VORLAGE.md` — Schreibscope-Zeile der Ergebnisdatei auf `docs/steering/patches/AF_{{SLUG}}_mockup-duell_Ergebnis.md` (K7).
- **Original** `Masterprompt — … .md` bewusst unangetastet gelassen (Archiv/local ist gitignored, kein Recovery). Rückzug/Ersatz durch Albert.

## Umgesetzte Korrekturen

- **K1** Kein `/start` mehr (kein Startritual, entkoppelt).
- **K2** Mini-Spec **ausschließlich** unter `Apps/<slug>/`; kein Alternativpfad; fehlt sie → Abbruch (Erzeugung nicht im Scope). Intake-Frage 2 entsprechend.
- **K3** Vorprüfung: `tests/scratch/<slug>/` darf noch nicht existieren; existiert es → „bereits bearbeitet, Hände weg", Abbruch.
- **K4** Startzeilen single-source: Masterprompt rahmt die **vom Werkzeug gedruckten** Startzeilen; ID/Rohdatei nicht mehr hartcodiert (keine driftbare Doppelwahrheit).
- **K5** Regel 10 erweitert: bei rotem Python-Lauf/ungültiger Datei nicht flicken; Rohtexte/Gutachten nie von Hand reparieren → verantwortliches externes Modell (Sol/Fable bzw. Grok) neu laufen lassen; Risiko anderes Ergebnis.
- **K7** Ergebnisdatei-Schema `AF_<slug>_mockup-duell_Ergebnis.md` (Werkstattstruktur + Phase 4 im Masterprompt, Schreibscope in der Sonnet-Vorlage) — emanzipiert die per-App-Ergebnisdatei von der Fabrik-AP-Nummer, einheitlich über 25 Apps.
- **K8** „# Abschluss dieses Masterprozesses" (Gewinner-Record + APP_SPEC-Rückfrage) gestrichen; neues „# Prozessende": DoD = zwei Mockups zuverlässig gebaut + GELB + Browser-Testauftrag übergeben; Grenzsatz „danach freies, taktisches Arbeiten, Fabrik-Specs nicht mehr bindend". Phase-4-Frage 5 als informelles Feedback statt Sieger-Gate.

## Bewusst akzeptiert (keine Änderung)

⑥ (harte Rohtext-Prüfung erst Phase 2, fail-fast), ⑦ (Anonymisierungs-Leck lebbar), ⑪ (Pflichtstopp-Wortlaut niedrigrisiko), ⑰ (Sonnet schreibt in `docs/steering/patches/` — gewollt), ⑲ (Quellensperre präventiv, nicht nachprüfbar), ⑳ (flache Existenzprüfung by design).

## Verifikation

- Deterministisch geprüft: kein `/start` mehr; kein alter „Abschluss"-/APP_SPEC-Block; K2/K3/K4/K5 vorhanden; Ergebnisdatei-Schema `AF_<slug>_…` in Masterprompt und Sonnet-Vorlage; keine escapten Markdown-Artefakte (`\#`, `\-`, `PROTECTED\_PATHS`); PowerShell-Pfad-Backslashes legitim/einfach.

## Nächster Schritt

- Werkzeugteil **K6** als eigener, getesteter AP: `AP-app-fabrik-09i` (deterministisches Produktentscheidungs-Handling). Bis dahin bleibt die Pflichtstopp-Section im bereinigten Masterprompt der aktuelle manuelle Ablauf.
- Kein Commit durch Claude.
