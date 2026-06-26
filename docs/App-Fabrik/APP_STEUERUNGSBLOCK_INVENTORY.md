# App-Steuerungsblock-Inventar

Stand: 2026-06-26
Status: Arbeitsinventar nach AP-04
Scope: Alle Ordner unter `Apps/*/`

## Zweck

Dieses Inventar zeigt, welche App-Ordner bereits einen lokalen Steuerungsblock besitzen und wo Nacharbeit nötig ist.

Es formuliert keine Steuerungsblöcke. Es bewertet nur Vorhandensein, Fundstellen und nächsten Bedarf.

## Status-Legende

| Status | Bedeutung |
|---|---|
| GRÜN | APP_SPEC.md enthält lokalen Steuerungsblock |
| GELB | kein APP_SPEC-Steuerungsblock, aber Mini-Spec / Rohmaterial vorhanden |
| ROT | weder APP_SPEC-Steuerungsblock noch Mini-Spec-Material gefunden |
| UNKLAR | Datei- oder Begriffslage uneindeutig, manuelle Prüfung nötig |

## Inventar

| App | APP_SPEC | Steuerungsblock in APP_SPEC | Mini-Spec | Rohmaterial in Mini-Spec | Status | Nächster Bedarf |
|---|:---:|:---:|:---:|:---:|---|---|
| crash-reaktions-test | nein | — | ja | ja (Kernbotschaft + Problem) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| depot-kipppunkt | nein | — | ja | ja (Kernbotschaft + Problem) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| der-alte-euro | nein | — | ja | ja (Kernbotschaft + Problem) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| diversifikations-detektor | nein | — | ja | ja (Kernbotschaft + Problem) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| esg-spiegel | nein | — | ja | ja (Kernbotschaft) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| etf-aera-vorbei | nein | — | ja | ja (Kernbotschaft + Problem) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| etf-namensdecoder | nein | — | ja | ja (Kernbotschaft + Problem) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| etf-vergleich | nein | — | ja | ja (Kernbotschaft + Problem + Nicht-Ziele) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| geburtsjahrlos | nein | — | ja | ja (Kernbotschaft + Problem) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| investment-universum | nein | — | ja | ja (Kernbotschaft + Problem) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| komplexitaets-entlarver | nein | — | ja | ja (Kernbotschaft + Problem) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| kostenkiller-ter | nein | — | ja | ja (Kernbotschaft) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| market-timing-simulator | nein | — | ja | ja (Kernbotschaft + Problem) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| markt-kam-zurueck | nein | — | ja | ja (Kernbotschaft + Problem) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| plan-generator | nein | — | ja | nein | ROT | fachliche Klärung mit Albert |
| prokrastinations-preis | ja | nein | ja | ja (Kernbotschaft + Problem) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| regulatorik-dashboard | nein | — | ja | ja (Kernbotschaft) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| rendite-kalibrierung | nein | — | ja | ja (Kernbotschaft + Problem) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| renditekiller-volatilitaet | nein | — | ja | ja (Kernbotschaft) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| replizierer-swapper | nein | — | ja | ja (Kernbotschaft) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| risiko-uebersetzer | nein | — | ja | ja (Kernbotschaft + Problem) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| rollierende-sparplaene | nein | — | ja | ja (Kernbotschaft) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| thesaurierer-rennen | nein | — | ja | ja (Kernbotschaft) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| weltdepot-baukasten | nein | — | ja | ja (Kernbotschaft) | GELB | Steuerungsblock in APP_SPEC nachtragen |
| weltkarte-etf-indizes | nein | — | ja | ja (Kernbotschaft + Problem) | GELB | Steuerungsblock in APP_SPEC nachtragen |

## Kurzbefund

- Apps gesamt: 25
- GRÜN: 0
- GELB: 24
- ROT: 1 (plan-generator)
- UNKLAR: 0

## Hinweise

**prokrastinations-preis** ist die einzige App mit `APP_SPEC.md`. Die Spec hat keinen expliziten Steuerungsblock-Abschnitt, enthält aber steuerungsblock-relevantes Material in §2 (Zweck und Nutzerfrage) und §23 (Beweisdramaturgie/Entscheidungspsychologie). Nächster Schritt: Steuerungsblock als eigenen Abschnitt in APP_SPEC eintragen (Fokus-AP der laufenden Session).

**etf-vergleich** hat als einzige MINI_SPEC explizit Nicht-Ziele-Material — reichstes Rohmaterial unter den GELB-Apps.

**plan-generator** hat eine MINI_SPEC-Datei, aber kein steuerungsblock-ähnliches Material (keine Kernbotschaft, kein Problem, kein Zweck, keine Barriere). Fachliche Klärung mit Albert nötig bevor ein Steuerungsblock formuliert werden kann.

## Nicht-Ziele dieses Inventars

- keine Steuerungsblöcke formuliert
- keine App-Specs geändert
- keine fachliche Bewertung der App-Ideen
- keine Priorisierung für AP-05

## Nächster Schritt

AP-05 — Vorschlagsliste für Einbau / Nachtrag der Steuerungsblöcke.
