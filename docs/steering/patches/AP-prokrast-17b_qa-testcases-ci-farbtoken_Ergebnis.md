Stand: 2026-07-10 | Session: AP-prokrast-17b | Geändert von: Claude

# AP-prokrast-17b — Ergebnisprotokoll: `QA_TEST_CASES.md` Gruppe N (CI-Farbtoken / Theme-Auflösung)

**Status:** GRÜN · **Blocker:** nein · **Commit:** nein (Freigabe bei Albert) · **Typ:** Doku-/QA-AP, kein Code-Diff

---

## 0. Vorprüfung (Schritt 1 des Ablaufs)

`git status --short` vor Beginn zeigte zwei bereits vorbestehende, AP-fremde unstaged Dateien:

| Datei | Herkunft |
|---|---|
| `.claude/learning/session-log.md` | eigener Schritt-0-Eintrag aus `/start` (Kern-Invariante 5) |
| `docs/steering/BACKLOG.md` | vorbestehender, noch nicht committeter Sync aus AP-prokrast-17 (neue Zeile `AP-prokrast-17-FOLLOWUP-FONT` + Stand-Header) |

Albert hat entschieden: beide als Baseline ausklammern, kein ROT. Scope-Nachweis in §5 daher relativ zu dieser Baseline geführt.

## 1. Gelesen

| Datei | Zweck |
|---|---|
| `docs/steering/patches/AP-prokrast-17_pilot-migration-prokrastinations-preis_Ergebnis.md` | Mapping-Tabelle, Fork-Entscheidungen, „bewusst NICHT geändert", Farbabnahme + ΔE-Werte |
| `Apps/prokrastinations-preis/app.css` | Grep-Verifikation der Zahlenclaims |
| `Apps/prokrastinations-preis/app.test.html` | Grep-Verifikation `tokens.css`-Bindungsreihenfolge |
| `tools/ci-token-check.js` | reale Standard-Tokenliste (5 Rollen), Methodik ΔE76 |
| `Apps/prokrastinations-preis/QA_TEST_CASES.md` | Zieldatei, Format-/Struktur-Referenz (Gruppen A–P, Testfall-Format) |

Repo-weiter Grep auf `tokens.css`-Bindungen (Zusatzcheck für TC-N05): nur `app.test.html` (Dev-Harness) und `Theme/assets/css/screen.css` (`@import`, Engine-intern) — keine Ghost-/Produktionsbindung gefunden.

> **Korrektur (AP-prokrast-19, 2026-07-10):** Die Einstufung „Engine-intern" für die `screen.css`-Bindung war ungenau. `screen.css` ist das produktive Ghost-Stylesheet (Selbstbezeichnung Z.3: „Finanzwesir Ghost Theme — Consolidated Styles"); die `tokens.css`-Bindung darüber ist damit transitiv Teil der Produktionskaskade (AP-16-Design), keine Engine-Interna. Gefunden im unabhängigen Review AP-prokrast-18 (§3.1), TC-N05 entsprechend präzisiert in `QA_TEST_CASES.md` (AP-prokrast-19). Ursprünglicher Wortlaut oben unverändert stehen gelassen (Forensik-Prinzip: Protokolle sind Zeitkapseln).

## 2. Anamnese-Befund: Protokollzahlen vs. reale Datei

Erster Grep-Durchlauf (`grep -c "--fw-font-base"` / `"--fw-space-"`, zeilenbasiert statt tokenbasiert) zeigte scheinbare Abweichungen (2 statt 1 / 18 statt 19), weil dabei auch die Doku-Header-Prosazeilen (Z. 4–5 in `app.css`) mitgezählt wurden. Nachprüfung mit demselben `var(--fw-*-`-Muster wie im AP-17-Protokoll bestätigte die Original-Werte exakt: `var(--fw-color-` = 0, `var(--color-` = 24, `var(--fw-font-base` = 1, `var(--fw-space-` = 19. Kein realer Widerspruch — protokolliert, um die Methodik transparent zu machen.

## 3. Hinzugefügte Testfälle (Gruppe N, 9 TCs)

| TC | Kurztitel | Status in diesem AP |
|---|---|---|
| TC-N01 | Tokens lösen zur Laufzeit aus `tokens.css` auf | bestätigt (Albert, 2026-07-09) |
| TC-N02 | Primary ist Petrol, nicht Blau (Fork 4) | bestätigt (Albert, 2026-07-09) |
| TC-N03 | Erwartete Drifts in Grenzen (muted/text/surface) | bestätigt (Albert, 2026-07-09) |
| TC-N04 | Error-States Null-Delta, keine rote Codierung | teilweise — Code-Null-Delta verifiziert, Live-Fehlerzustand offen |
| TC-N05 | `tokens.css` nur im Dev-Harness gebunden¹ | verifiziert (AP-17b, Repo-Grep) |
| TC-N06 | Kein CSS-Leak in den Ghost-Kontext | bestätigt (Albert, 2026-07-09) |
| TC-N07 | Keine `--fw-color-*`-Altlast, Mechanik/Font/Spacing erhalten | verifiziert (AP-17b, Grep) |
| TC-N08 | S/M/L-Farb-Viewport-Matrix | offen |
| TC-N09 | Font bewusst nicht migriert, Rubikon-Position stabil | teilweise — Font-Unverändertheit verifiziert, Neumessung nicht durchgeführt |

¹ Titel/Charakterisierung seit AP-prokrast-19 korrigiert — s. Korrektur-Vermerk in §1 und `QA_TEST_CASES.md` TC-N05.

Begleit-Edits: Testgruppen-Übersichtstabelle (Zeile N ergänzt), „Manuell vs. automatisierbar" (TC-N01/N05/N07 automatisierbar; TC-N02/N03/N06/N08 manuell/visuell), Stand-Zeile (Zeile 1).

## 4. Bewusst nicht geändert

Gruppen A–M und P vollständig unverändert (keine Zeile umformuliert, umnummeriert oder umsortiert). Keine Änderung an `app.css`, `app.js`, `app.test.html`, Engine, Theme, `APP_SPEC.md`. Kein Commit, kein Abschlussritual.

## 5. Datei-Wahrheit nach Wiederlesen

- `QA_TEST_CASES.md` vollständig neu gelesen (1769 Zeilen gesamt).
- `git diff` gegen die Datei zeigt genau eine entfernte Zeile (der autorisierte Stand-Header) und sonst ausschließlich Anfügungen — kein bestehender Testfall verändert.
- 9 `### TC-N`-Überschriften vorhanden, keine doppelten `### TC-XX`-Nummern im Gesamtdokument (`sort | uniq -d` leer).
- Gruppe N liegt nach Gruppe P (Anfüge-Konvention dieser Datei: M und P wurden ebenfalls chronologisch ans Ende angefügt, nicht alphabetisch einsortiert — vorbestehende Struktur, nicht angefasst).

## 6. Scope-Beleg

`git diff --name-status` (relativ zur vereinbarten Baseline): zusätzlich zu `.claude/learning/session-log.md` und `docs/steering/BACKLOG.md` (beide Baseline, nicht Teil dieses AP) genau eine weitere Datei geändert: `Apps/prokrastinations-preis/QA_TEST_CASES.md`.

## 7. Restliste (nicht in diesem AP behauptet)

| Punkt | Status |
|---|---|
| TC-N04 Live-Fehlerzustand (Error-States) | offen — nur code-seitiges Null-Delta geprüft |
| TC-N08 S/M/L-Farb-Viewport-Matrix | offen — explizit als offen markiert |
| TC-N09 Rubikon-Neumessung nach AP-17 | nicht durchgeführt (nicht nötig, da kein Font-Wechsel) |
| Pre-existing gap: Testgruppen-Übersichtstabelle enthielt Gruppe P nie | gefunden, **nicht repariert** (außerhalb Scope dieses AP — Fremder Mess, gemeldet statt angefasst) |
| Commit-Freigabe AP-prokrast-17 | weiterhin bei Albert (unverändert) |

## 8. Nächster AP

**Nächster AP (bei GRÜN): AP-prokrast-18** (Claims-vs-Files-Review der Gesamtkette, Kontrakt §9).
**Ausdrücklich NICHT nächster AP in diesem Faden:** Review/Font-Migration/Ghost-Anbindung.
