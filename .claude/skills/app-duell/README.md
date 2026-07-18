# app-duell — Abhängigkeitskarte & Debug

**Nur für Wartung/Debugging. Der Skill lädt diese Datei nicht — im täglichen Betrieb ignorieren.**
Zentraler, wichtiger Prozess: läuft er gut, ist er top; läuft er schlecht, kann er viel zerstören. Deshalb hier die Karte für den Fehlerfall.

## Kette

```text
/app-duell  →  .claude/skills/app-duell/SKILL.md
                 └─ liest → docs/App-Fabrik/MASTERPROMPT_MOCKUP-DUELL.md   (DER Prozess, einzige Wahrheit)
                              └─ fährt → tools/app-fabrik-psychosprint.py   (prepare / grok-paket / sonnet-paket)
```

Die **vollständige, verbindliche Quellenliste** steht im Masterprompt, Abschnitt „Bestandsdateien". Dort pflegen — hier bewusst **nicht** duplizieren (keine doppelte Wahrheit).

## Debug-kritisch: was das Werkzeug hart verdrahtet

`tools/app-fabrik-psychosprint.py`, Konstante `VORLAGEN_REL = "docs/App-Fabrik/vorlagen"`:

```text
docs/App-Fabrik/vorlagen/
├── PSYCHOSPRINT_GRUNDPROMPT.md    → prepare
├── GROK_GEGENKRITIK_VORLAGE.md    → grok-paket
└── SONNET_MOCKUP-DUELL_VORLAGE.md → sonnet-paket (MUSS den Marker "## Quellensperre — Harter Stop" tragen)
```

Verschiebt oder benennt man eine dieser drei Dateien, **bricht der Prozess**. Dann synchron ziehen: `VORLAGEN_REL` / `TPL_REL` / `GRUNDPROMPT_REL` im Werkzeug **und** die Bestandsdateien-Liste im Masterprompt.

## Erste Debug-Handlung

```powershell
python tools\app-fabrik-psychosprint.py --self-test
```

Prüft prepare/grok-paket/sonnet-paket, Nicht-Überschreiben, Quellensperre-Marker und das Produktentscheidungs-Gate in einem Temp-Ordner (kein Repo-Write). **Grün = Kette intakt.** Rot = die Meldung nennt die Bruchstelle.

## Gefahrenstellen (Lessons, hart erkauft)

- **Vorlagen gehören nicht ins gitignored `Archiv/local/`** — sonst nicht versioniert, kein Audit, Sync-Bruch auf den Laptop. Kanonischer Ort ist `docs/App-Fabrik/vorlagen/` (AP-09j).
- **Produktentscheidung:** `sonnet-paket` blockt, solange offene `Produktentscheidung nötig` aus `grok-gegenkritik.md` nicht in `tests/scratch/<slug>/psychosprint/PRODUKTENTSCHEIDUNGEN.md` aufgelöst sind (AP-09i). Übersprungen → Warnung landet garstig im Mockup-Kopf.
- **Quellensperre:** fehlt der Marker in der Sonnet-Vorlage, verweigert das Werkzeug jede Ausgabe (AP-09g). Nicht umgehen — beschädigte Vorlage melden.
- **Bereits bearbeitet:** existiert `tests/scratch/<slug>/`, ist die App schon durchgelaufen → Hände weg.
- **Mini-Spec nur unter `Apps/<slug>/`** — fremder Pfad wird vom Werkzeug abgelehnt (bewusst strikt).

## Ausgaben (werden erzeugt, nicht aufgerufen)

```text
tests/scratch/<slug>/psychosprint/*   und  tests/scratch/<slug>/mockup-duell/*   (Werkstatt, flüchtig)
docs/steering/patches/AF_<slug>_mockup-duell_Ergebnis.md   (Sonnet schreibt das Ergebnis)
```
