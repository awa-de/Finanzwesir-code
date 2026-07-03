# AP-prokrast-04c — Rücklaufkapsel an Masterfaden — Ergebnis

## Status

Status: GRÜN
Blocker: nein

## Kurzbefund

AP-prokrast-04a hat die Soll-/Spec-Synchronisierung nach der finalen Rubikon-Entscheidung (AP-03f–03i) durchgeführt: `APP_SPEC.md` und `drehbuch_prokrastinationspreis_app.md` beschreiben jetzt konsistent den stehenden Rubikon-Screen mit DOM-Overlay-Text, ohne Morph/Achsenanimation/C2-Staffelung als konkurrierendes aktives Soll. AP-prokrast-04b hat das unabhängig gegen die realen Dateien (inkl. Code-Stichprobe in `app.js`/`app.css`) verifiziert und GRÜN mit Rücklauf-Freigabe bestätigt. Diese Kapsel (AP-prokrast-04c) fasst beide APs für den Masterfaden zusammen und reicht zwei von Albert ausdrücklich als nicht-übersehbar markierte offene Punkte weiter.

## Vorprüfung / Git-Baseline

- `pwd`: `/z/Documents/Nextcloud/Finanzwesir 2.0`
- `git rev-parse --show-toplevel`: `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0` — bekannte Namensdiskrepanz, kein Blocker (AP-02a/04a)
- `git status --short` (vor AP-04c):
  ```
   M .claude/learning/session-log.md
   M Apps/prokrastinations-preis/APP_SPEC.md
   M Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md
  ?? docs/steering/patches/AP-prokrast-04a_soll-spec-synchronisierung_Ergebnis.md
  ?? docs/steering/patches/AP-prokrast-04b_abschluss-qa_claims-vs-files_Ergebnis.md
  ```
- `git diff --name-status`: identisch zu den drei `M`-Zeilen oben — exakt die aus AP-04a bekannten Änderungen, kein Fremdeinfluss.
- `git log --oneline -1`: `ffacc13 feat(AP-prokrast-03f–03i): Screen 4 Rubikon-Reveal — von Morph-Animation zu stehendem Screen mit DOM-Overlay-Text`

## Gelesene Pflichtquellen

| Quelle | Rolle |
|---|---|
| `docs/steering/patches/AP-prokrast-04a_soll-spec-synchronisierung_Ergebnis.md` | Synchronisierungs-Befund, Offene Punkte |
| `docs/steering/patches/AP-prokrast-04b_abschluss-qa_claims-vs-files_Ergebnis.md` | Unabhängige QA-Bestätigung, Rücklauf-Freigabe |
| `docs/steering/patches/AP-prokrast-02d_migrationsschnitt_ap-schnitt_ruecklaufkapsel_Ergebnis.md` | Formatvorbild dieser Kapsel; Referenz für nachgelagerte Pflichten (Card-to-Point, Screen-3-Timing) |

## Konsolidierter Sollstand Screen 4

Screen 4 zeigt beim Eintritt sofort den finalen Rubikon-Zustand: links echte Vergangenheit, Mitte Entscheidungslinie (`FwVerticalLinePlugin`), rechts leerer, datenfreier Zukunftsraum (`xDisplayRange`). Haupttext ist ein A11y-pflichtiger DOM-Textblock, per CSS visuell in den rechten Zukunftsraum gelegt (`FwChartTextPlugin` bleibt vorhandener, aber ungenutzter Baustein). Ablauf: Chart sofort sichtbar → 800ms Stille → Text + A11y-Live-Region → 800ms Stille → CTA. Verankert in `APP_SPEC.md` §16.1a, §16.2, §16.3, §23.18; Drehbuch-Beats 1/3 als abgelöst, Beat 4 als timing-erweitert, Beat 2 als offen markiert.

---

## Rücklaufkapsel AP-prokrast-04

Status:
GRÜN

Blocker:
nein

Kernbefund:
Die Soll-/Spec-Synchronisierung nach der Rubikon-Entscheidung ist vollständig und unabhängig verifiziert abgeschlossen. `APP_SPEC.md` und das Drehbuch widersprechen sich nicht mehr, und beide widersprechen nicht mehr dem tatsächlich gebauten und von Albert im Browser bestätigten Code (AP-03f–03i). Reine Dokuarbeit — kein Code, keine Engine, keine Stationsdaten berührt.

Fest entschieden (aus AP-03g/03h/03h2, jetzt in APP_SPEC/Drehbuch verankert):
- kein Morph, keine Achsenanimation, keine C2-Staffelung als aktives Soll
- stehender Rubikon-Screen: echte Vergangenheit links, Entscheidungslinie Mitte, leerer Zukunftsraum rechts
- Rubikon-Haupttext ist DOM-Overlay (A11y-Pflicht), nicht Canvas
- `FwChartTextPlugin` bleibt vorhandener technischer Baustein, ist aber nicht die Screen-4-Haupttextlösung
- Reveal-Ablauf: Chart sichtbar → 800ms Stille → Text + A11y-Update → 800ms Stille → CTA
- keine Zukunftsdaten, keine Future-Line, keine Prognosekurve — unter keinen Umständen
- Card-to-Point bleibt Pflichtbestandteil, nachgelagert
- Screen-3-Timing-Reveal bleibt Pflichtbestandteil, nachgelagert

> **⚠️ Eskalationspflicht — von Albert ausdrücklich als nicht-übersehbar markiert. Diese Kapsel ist die zweite der zwei verlangten Ebenen (AP-04b → diese Kapsel → Masterfaden/Projektsteuerung). Beide Punkte MÜSSEN aktiv an Albert weitergereicht werden, nicht nur hier abgelegt:**
>
> 1. **✅/❓-Symbolik (Drehbuch Beat 2):** weder gebaut noch verworfen — echte offene Produktentscheidung. Muss vor einem eventuellen Bau erneut mit Albert geklärt werden. Beleg: `drehbuch_prokrastinationspreis_app.md:131–133`.
> 2. **`QA_TEST_CASES.md` unsynchronisiert:** liegt außerhalb des Write-Scopes von AP-04a/04b, Stand 2026-06-18 (V1.4), trägt noch die alte Formulierung „Kein Zukunftschart." (Zeile 557, TC-F01), die in `APP_SPEC.md` bereits korrigiert wurde. Braucht einen eigenen Folge-AP.

Empfohlener nächster Haupt-AP:
Keine einseitige Festlegung durch diese Kapsel — drei gleichrangige Kandidaten stehen zur Wahl, die Reihenfolge ist eine Produktentscheidung, keine architektonische Notwendigkeit:

| Kandidat | Herkunft | Warum in Frage kommend |
|---|---|---|
| A — Klärung ✅/❓-Symbolik | Eskalationspunkt 1 | Klein, rein redaktionell/produktseitig, blockiert aber jede spätere Bauentscheidung zu Beat 2 |
| B — `QA_TEST_CASES.md`-Synchronisierung | Eskalationspunkt 2 | Analog zu AP-04a, aber für die separate Testdatei; schließt die letzte bekannte Doku-Lücke |
| C — Card-to-Point-Koordinaten-Schnittstelle | AP-02d, weiterhin offen | Größter, architektonisch anspruchsvollster nachgelagerter Baustein (höchste DOM↔Canvas-Kopplungsgefahr laut AP-02c) |

Nicht nächster AP:
- Commit
- Abschlussritual
- AP-prokrast-05
- Code-Bau jeglicher Art
- `QA_TEST_CASES.md`-Fix ohne vorherige Albert-Entscheidung
- Produktentscheidung zu ✅/❓ ohne Albert

Wichtig für den nächsten AP (unabhängig von der Wahl A/B/C):
- `APP_SPEC.md` §16.1a ist jetzt die verbindliche Referenz für den Rubikon-Screen-4-Sollstand.
- `FwChartTextPlugin.js` bleibt unverändert nutzbar, aber nicht Screen-4-Pflicht.
- Card-to-Point und Screen-3-Timing-Reveal bleiben unverändert nachgelagerte Pflichten (AP-02d), unabhängig davon, welcher der drei Kandidaten A/B/C zuerst gewählt wird.

Weiter nur nach Nutzer-OK.

---

## Nicht geändert

- keine APP_SPEC.md geändert (nur gelesen, in AP-04a bereits geändert und in 04b/04c nur referenziert)
- kein Drehbuch geändert (nur gelesen)
- kein app.js geändert
- kein app.css geändert
- keine Stationsdaten geändert
- keine Engine-/Plugin-/Strategy-Dateien geändert
- kein `QA_TEST_CASES.md` geändert
- keine AP-04a/AP-04b-Protokolle geändert
- kein Commit
- kein Abschlussritual

## Scope- und Diff-QA nach Write

```
git status --short (nach AP-04c):
 M .claude/learning/session-log.md
 M Apps/prokrastinations-preis/APP_SPEC.md
 M Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md
?? docs/steering/patches/AP-prokrast-04a_soll-spec-synchronisierung_Ergebnis.md
?? docs/steering/patches/AP-prokrast-04b_abschluss-qa_claims-vs-files_Ergebnis.md
?? docs/steering/patches/AP-prokrast-04c_ruecklaufkapsel_Ergebnis.md

git diff --name-status:
M	.claude/learning/session-log.md
M	Apps/prokrastinations-preis/APP_SPEC.md
M	Apps/prokrastinations-preis/drehbuch_prokrastinationspreis_app.md
```

Bewertung: Nur die eine erlaubte Ergebnisdatei ist neu hinzugekommen. Keine unerwarteten Diffs gegenüber dem Stand nach AP-04a/04b.
