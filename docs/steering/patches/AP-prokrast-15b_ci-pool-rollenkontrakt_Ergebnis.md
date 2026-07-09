# AP-prokrast-15b — CI-Pool Rollen- und Benennungskontrakt — Ergebnis

## Status

GELB

Der Kontrakt ist vollständig erstellt, alle 10 Inhaltsblöcke sind vorhanden und jede Aussage ist auf die Rücklaufkapsel/15a rückführbar. GELB (nicht GRÜN) allein wegen einer Namensabweichung an der Gate-1-Pflichtquelle: Der AP-Auftrag verlangt `AP-prokrast-15a_ruecklaufkapsel_masterentscheidungen_F1-F11.md`, real vorhanden ist `AP-prokrast-15a_ruecklauf_masterentscheidungen_F1-F11.md` (`ruecklauf` statt `ruecklaufkapsel`). Inhalt eindeutig identisch (gleicher AP, gleicher `masterentscheidungen_F1-F11`-Suffix, Status VOLLENTSCHIEDEN). Ich habe **nicht** stur auf ROT gestoppt, weil das Gate-Ziel (die maßgebliche Entscheidungsquelle liegt vor) unzweifelhaft erfüllt ist — aber die Abweichung wird hier transparent als offener Punkt gemeldet statt still übergangen. Keine inhaltliche Lücke, keine eigene Designentscheidung.

## Kurzurteil

Reine Übersetzungsarbeit erbracht: Die 11 Masterentscheidungen (E1–E11) und die 20 Risikopunkte (P1–P20) der Rücklaufkapsel sind in einen stabilen, verbindlichen Rollen- und Benennungskontrakt überführt. Der Kontrakt fügt nichts hinzu, was nicht bereits entschieden war; offene, von der Rücklaufkapsel nicht aufgelöste Punkte (Dark Mode, Ghost-Kette, Petrol-Rekalibrierung, Komponentenbaukasten) sind als solche markiert und keiner eigenmächtigen Entscheidung unterworfen. Das Pflicht-To-do T1 ist im BACKLOG verankert. Schreib-Scope exakt eingehalten (drei Dateien).

## Geprüfte Ausgangslage

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0`
- `git status --short` (vor dieser AP-Arbeit):
  - `M .claude/learning/session-log.md` (Warm-Start-Eintrag dieser Session — erwartbar)
  - `?? docs/steering/patches/AP-prokrast-15a_ruecklauf_masterentscheidungen_F1-F11.md` (unkommittierte Rücklaufkapsel — erwartbar, Gate-1-Quelle)
  - `?? docs/steering/patches/AP-prokrast-15a_tailwind-ci-pool-inventar-renderfluss-namensanalyse_Ergebnis.md` (unkommittiertes 15a-Protokoll — erwartbar)
- `git diff --name-status`: nur `M .claude/learning/session-log.md`
- `git log --oneline -10`: letzter Commit `d9ca9da` (AP-prokrast-14a-14c). AP-prokrast-12/14/15a-Artefakte allesamt noch nicht committed — Commit-Freigabe liegt bei Albert.
- **Gate 1 (Rücklaufkapsel vorhanden?):** erfüllt, mit Namensabweichung (s. Status). Datei existiert, Status VOLLENTSCHIEDEN, F1–F11 vollständig.
- **Gate 2 (unerwartete Änderungen an App-/Theme-/Engine-/Spec-Dateien?):** keine. Datei-Wahrheit uneingeschränkt belastbar.
- Kein Commit ausgeführt.

## Gelesene Quellen

- `docs/steering/patches/AP-prokrast-15a_ruecklauf_masterentscheidungen_F1-F11.md` — vollständig (204 Zeilen, E1–E11, T1, P1–P20, konsolidiertes Zielbild)
- `docs/steering/patches/AP-prokrast-15a_tailwind-ci-pool-inventar-renderfluss-namensanalyse_Ergebnis.md` — in dieser Session selbst erstellt, vollständiger Inhalt im Kontext (nicht redundant erneut gelesen)
- `docs/steering/BACKLOG.md` — vollständig gelesen (Struktur für minimal-invasive T1-Ergänzung)

Kein Rückgriff auf die optionalen Nur-bei-Bedarf-Quellen nötig — die beiden Pflichtquellen deckten alle Kontraktinhalte ab.

## Geschriebene Dateien

1. `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md` (**neu**) — Der verbindliche Kontrakt mit allen 10 geforderten Inhaltsblöcken: Rollenmodell (§1), erlaubte Namensräume (§2), verbotene Namensräume/Muster (§3), Tailwind-Tokenstruktur mit gepinnten Seeds und Aliasen (§4), Konsumenten-Regel + Vier-Kategorien-Tabelle (§5), Statusfarben-Regel (§6), Nutzungsregeln je Familie + übergreifend (§7), VORLÄUFIGER Hex-Anhang (§8), Migrationsreihenfolge mit Gates + Font-Bridge-Ausklammerung (§9), offene Punkte für spätere APs (§10). Stand-Header gesetzt.
2. `docs/steering/BACKLOG.md` (**nur T1-Ergänzung + Stand-Header**) — eine neue Zeile `T1` im Pre-Launch-Abschnitt (Dep CSS-6, Auslöser Tailwind-Produktionsumstellung). Bestehende Struktur unverändert, keine andere Zeile berührt. Stand-Header auf 2026-07-08 / AP-prokrast-15b aktualisiert (Pflicht bei `docs/steering/`-Änderung).
3. `docs/steering/patches/AP-prokrast-15b_ci-pool-rollenkontrakt_Ergebnis.md` (**neu**) — dieses Protokoll.

## Nicht geändert

Explizit bestätigt, nicht berührt:

- `Theme/assets/css/screen.css` — nicht geändert
- `Theme/assets/js/fw-chart-engine/**` (inkl. `FwTheme.js`, alle Plugins/Strategien) — nicht geändert
- `Apps/prokrastinations-preis/app.css`, `app.js` — nicht geändert
- Design-System-Templates/Demos (`docs/design-system/**`, `fw-app-template.html`) — nicht geändert
- Fontdateien (`Theme/assets/fonts/**`) — nicht geöffnet, nicht geändert
- keine `tokens.css` angelegt (das ist AP-16)
- kein Tailwind-Build, keine CDN-Änderung
- keine neuen Farbwerte berechnet, keine Skalen generiert, kein Abnahme-Board gebaut (das ist AP-15c)

## Rückführbarkeits-Check (Stichprobe)

| # | Kontraktaussage | Quelle |
|---|---|---|
| 1 | Primary = Petrol; blauer Pilot-Fallback ist Anomalie (Kontrakt §1.1) | Rücklaufkapsel Entscheidung 1 |
| 2 | `petrol`→`petrol-600`, `gelb`→`gelb-500`, `purpur`→`purpur-900`, `blau`→`blau-700`, Seeds hex-exakt gepinnt (Kontrakt §4.2) | Rücklaufkapsel Entscheidung 7, Tabelle „Gemessene 1:1-Übersetzung" |
| 3 | Konsumenten-Regel + Vier-Kategorien-Tabelle (Kontrakt §5) | Rücklaufkapsel Entscheidung 8, wörtlich inkl. verworfener Alternativen |
| 4 | `#006273` raus, Ersatz Petrol-Vollton, Plugin liest künftig aus Theme (Kontrakt §7.8) | Rücklaufkapsel Entscheidung 11 |
| 5 | Font-Bridge `FwChartTextPlugin.js` NICHT in AP-16, sondern eigener Mini-AP mit Rubikon-Nachmessung (Kontrakt §9) | AP-15b-Auftrag Kettenposition + Rücklaufkapsel P15/DS-FOLLOWUP-07 |
| 6 | Success/Warning nicht definiert, Bedarfsregel „nur per Masterentscheidung, nie App-lokal" (Kontrakt §6) | Rücklaufkapsel Entscheidung 5 |
| 7 | Hex-Zwischenstufen als VORSCHAU-QUALITÄT markiert, verbindlich erst nach AP-15c (Kontrakt §8) | Rücklaufkapsel Entscheidung 7 „Restaurierte Leitern (Vorschau-Qualität)" + P19 |

Alle Stichproben rückführbar. Keine Kontraktaussage ohne Quelle gefunden.

## Offene Punkte / Widersprüche

1. **Namensabweichung Gate-1-Pflichtquelle (GELB-Grund):** Auftrag nennt `..._ruecklaufkapsel_masterentscheidungen_F1-F11.md`, real ist `..._ruecklauf_masterentscheidungen_F1-F11.md`. Inhaltlich eindeutig dieselbe Datei. **Empfehlung an Master:** entweder die Datei umbenennen (auf den im Auftrag genannten Namen) oder den Auftrags-Referenznamen in Folge-APs an den realen Dateinamen angleichen — damit AP-15c/16 nicht dieselbe Stolperstelle treffen. Ich habe die Datei nicht umbenannt (außerhalb des erlaubten Schreib-Scopes von exakt drei Dateien).

2. **Petrol-Rekalibrierung offen (aus Rücklaufkapsel übernommen, kein neuer Befund):** Die Slot-Zuordnung `petrol-600` gegen Tailwind-Teal ist laut Rücklaufkapsel (Entscheidung 7, P12) noch nicht kalibriert. Im Kontrakt §4.3/§8 als ausstehend markiert. Wird in AP-15c aufgelöst — keine 15b-Entscheidung.

3. **Petrol-Stufen 700–900 in der Vorschau nicht ausgewiesen:** Die Rücklaufkapsel-Vorschau listet für Petrol nur `50`–`600`. Ich habe das im Kontrakt §8 transparent vermerkt (statt Werte zu erfinden) — die dunklen Petrol-Stufen entstehen in AP-15c. Keine eigene Ergänzung.

Keine inhaltlichen Widersprüche zwischen Rücklaufkapsel und 15a-Inventar gefunden; wo das Inventar Fragen offen ließ, hat die Rücklaufkapsel sie entschieden (Konfliktregel kam nicht zur Anwendung).

## Empfehlung

- Nächster AP: **AP-prokrast-15c** (Farbleiter-Generierung + visuelles Abnahme-Board) — erst nach Abnahme dieses Kontrakts durch Albert.
- Vorab-Housekeeping empfohlen (nicht blockierend): Namensabweichung der Rücklaufkapsel-Datei klären (offener Punkt 1).
- Umsetzungsfreigabe für Code: **nein**. Dieser Kontrakt ist Regelwerk, keine Migration. Code-Änderungen erteilt allein der Masterfaden nach Kontrakt-Abnahme.
