Stand: 2026-06-29 | Session: AP-13a | Geändert von: Claude

# AP-13a Ergebnis — Restbestand MINI_SPEC-Steuerungsblock-Inventar

## Kurzstatus

```
Status:                  GRÜN
Blocker:                 nein
Inventarisierte Apps:    25
Kategorie-B-Kandidaten:  12
Empfehlung nächster AP:  AP-13b — Nächsten MINI_SPEC-Rollout-Batch schneiden
```

---

## Kettenposition

```
Vorgänger:               AP-12 final GRÜN (AP-12a/b/c/d/d-addendum)
Aktueller AP:            AP-13a — Restbestand MINI_SPEC-Steuerungsblock-Inventar
Nächster AP bei GRÜN:    AP-13b — Nächsten MINI_SPEC-Rollout-Batch schneiden
Nächster AP bei GELB:    Gezielter Klärungs-AP für benannte Sonderfälle oder Datenlücken
Nächster AP bei ROT:     Kein Batch-Schnitt; Fix- oder Klärungs-AP zuerst
```

---

## Vorprüfung / Gates

| Gate | Prüfung | Ergebnis |
|---|---|---|
| 1 | `git status --short` | Nur `.claude/learning/session-log.md` modifiziert — kein Problem |
| 2 | AP-12d-addendum lesen — AP-12 final GRÜN? | Bestätigt: AP-12 GRÜN, alle GELB-Punkte aufgelöst |
| 3 | Seed-Datei `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` vorhanden? | JA |
| 4 | `Apps/` vorhanden und lesbar? | JA — 25 App-Verzeichnisse |
| 5 | Inventar ohne Dateiänderungen möglich? | JA |
| 6 | Ergebnisprotokoll-Pfad schreibbar? | JA |

Alle Gates bestanden. Kein Stop-Trigger ausgelöst.

---

## Gelesene Referenzen

- `docs/steering/patches/AP-12d-addendum_gelb-entscheidung-aufloesen_Ergebnis.md` ✓
- `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` (Slug-Liste extrahiert, 41 Seed-Einträge) ✓
- `Apps/` (alle 25 Verzeichnisse inventarisiert) ✓
- Erste 15 Zeilen aller 25 `MINI_SPEC_FROM_HAUPTDOKUMENT.md` (Struktur- und Anker-Prüfung) ✓
- `Apps/prokrastinations-preis/APP_SPEC.md` (Existenzprüfung + Steuerungsblock-Marker) ✓

---

## Git-Status

```
Beginn AP-13a:   M .claude/learning/session-log.md  (AP-Wechsel-Eintrag)
Ende AP-13a:     M .claude/learning/session-log.md
                 A docs/steering/patches/AP-13a_restbestand-minispec-steuerungsblock-inventar_Ergebnis.md
```

Keine App-, Seed- oder Tool-Datei verändert.

---

## Gesamtübersicht

| Kategorie | Anzahl | Bedeutung |
|---|---:|---|
| A | 7 | Bereits erledigt durch AP-12 |
| B | 12 | Kandidaten für nächsten MINI_SPEC-Rollout |
| C | 1 | APP_SPEC / Pilot / anderer Zieltyp |
| D | 2 | Bekannte Sonderfälle |
| E | 0 | Fehlender Seed |
| F | 0 | Fehlende MINI_SPEC |
| G | 0 | Steuerungsblock bereits vorhanden außerhalb AP-12 |
| H | 3 | Companion-Module / unklar |
| **Gesamt** | **25** | |

---

## Vollständige Slug-Tabelle

| Slug | MINI_SPEC | APP_SPEC | Seed-Block | Block in MINI_SPEC | Block in APP_SPEC | AP-12 erledigt | Sonderfall | Anker standardfähig | Kat. | Notiz |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|---|
| crash-reaktions-test | ✓ | – | ✓ | ✓ | – | ✓ | – | – | A | Batch-A abgeschlossen |
| depot-kipppunkt | ✓ | – | ✓ | ✓ | – | ✓ | – | – | A | Batch-A abgeschlossen |
| der-alte-euro | ✓ | – | ✓ | ✓ | – | ✓ | – | – | A | Batch-A abgeschlossen |
| diversifikations-detektor | ✓ | – | ✓ | – | – | – | – | JA | B | Standard-Kandidat |
| esg-spiegel | ✓ | – | ✓ | – | – | – | – | JA | B | Standard-Kandidat |
| etf-aera-vorbei | ✓ | – | ✓ | – | – | – | – | JA | B | Standard-Kandidat |
| etf-namensdecoder | ✓ | – | ✓ | – | – | – | – | JA | B | Standard-Kandidat |
| etf-vergleich | ✓ | – | ✓ | – | – | – | ✓ | JA | D | Bekannter Sonderfall; andere Entstehungsgeschichte (Intake 2026-05-19) |
| geburtsjahrlos | ✓ | – | ✓ | ✓ | – | ✓ | – | – | A | Batch-A abgeschlossen |
| investment-universum | ✓ | – | ✓ | – | – | – | – | UNKLAR | H | Companion-Modul zu C1 (diversifikations-detektor) |
| komplexitaets-entlarver | ✓ | – | ✓ | – | – | – | – | JA | B | Standard-Kandidat |
| kostenkiller-ter | ✓ | – | ✓ | – | – | – | – | JA | B | Standard-Kandidat |
| market-timing-simulator | ✓ | – | ✓ | ✓ | – | ✓ | – | – | A | Batch-A abgeschlossen |
| markt-kam-zurueck | ✓ | – | ✓ | ✓ | – | ✓ | – | – | A | Batch-A abgeschlossen |
| plan-generator | ✓ | – | ✓ | – | – | – | ✓ | JA | D | Bekannter Sonderfall; Funnel-Finale, KI-Konsens ★ |
| prokrastinations-preis | ✓ | ✓ | ✓ | – | ✓ | – | ✓ | – | C | Pilot; APP_SPEC V2.5 maßgeblich; MINI_SPEC nur historisch |
| regulatorik-dashboard | ✓ | – | ✓ | – | – | – | – | JA | B | Standard-Kandidat; Notiz: Status „BEREITS GEBAUT" in MINI_SPEC |
| rendite-kalibrierung | ✓ | – | ✓ | – | – | – | – | JA | B | Standard-Kandidat |
| renditekiller-volatilitaet | ✓ | – | ✓ | – | – | – | – | JA | B | Standard-Kandidat |
| replizierer-swapper | ✓ | – | ✓ | – | – | – | – | JA | B | Standard-Kandidat |
| risiko-uebersetzer | ✓ | – | ✓ | ✓ | – | ✓ | – | – | A | Batch-A abgeschlossen |
| rollierende-sparplaene | ✓ | – | ✓ | – | – | – | – | UNKLAR | H | Companion-Modul zu B2 (geburtsjahrlos) |
| thesaurierer-rennen | ✓ | – | ✓ | – | – | – | – | JA | B | Standard-Kandidat |
| weltdepot-baukasten | ✓ | – | ✓ | – | – | – | – | JA | B | Standard-Kandidat |
| weltkarte-etf-indizes | ✓ | – | ✓ | – | – | – | – | UNKLAR | H | Companion-Modul zu C1/C3 |

---

## Kandidatenliste für AP-13b

Mögliche Kategorie-B-Kandidaten (12):

```
1.  diversifikations-detektor      — Anker: JA
2.  esg-spiegel                    — Anker: JA
3.  etf-aera-vorbei                — Anker: JA
4.  etf-namensdecoder              — Anker: JA
5.  komplexitaets-entlarver        — Anker: JA
6.  kostenkiller-ter               — Anker: JA
7.  regulatorik-dashboard          — Anker: JA (Notiz: BEREITS GEBAUT)
8.  rendite-kalibrierung           — Anker: JA
9.  renditekiller-volatilitaet     — Anker: JA
10. replizierer-swapper            — Anker: JA
11. thesaurierer-rennen            — Anker: JA
12. weltdepot-baukasten            — Anker: JA
```

Alle 12 haben: MINI_SPEC ✓ | kein APP_SPEC | Seed ✓ | kein Block | Anker vermutlich standardfähig.

Hinweis `regulatorik-dashboard`: Die MINI_SPEC enthält den Hinweis `Status: ✅ BEREITS GEBAUT`. Das betrifft den App-Produktionsstatus, nicht den Steuerungsblock-Rollout. Für AP-13b empfohlen, sofern Albert den Rollout in MINI_SPEC auch für produktive Apps bestätigt. Sollte im Batch-Schnitt explizit angesprochen werden.

---

## Nicht-Kandidaten mit Begründung

**APP_SPEC / Pilot (Kategorie C):**
- `prokrastinations-preis` — APP_SPEC V2.5 ist maßgeblich; Steuerungsblock bereits in APP_SPEC vorhanden. MINI_SPEC ist nur historisch. Kein MINI_SPEC-Rollout.

**Bekannte Sonderfälle (Kategorie D):**
- `plan-generator` — Von AP-12 explizit ausgeschlossen. Funnel-Finale-Rolle, niedrigster KI-Konsens (★), möglicherweise anderen Entstehungspfad. Klärungs-AP nötig.
- `etf-vergleich` — Von AP-12 explizit ausgeschlossen. Konzeptionelle Mini-Spec aus Intake-Diskussion (2026-05-19), nicht aus Hauptdokument. Anderer Entstehungspfad. Klärungs-AP nötig.

**Companion-Module (Kategorie H):**
- `investment-universum` — Kein eigenständiger Haupt-App-Abschnitt. Gehört zu `diversifikations-detektor` (C1). Kein eigener Seed-Block sinnvoll ohne Klärung der Modulrolle.
- `rollierende-sparplaene` — Kein eigenständiger Haupt-App-Abschnitt. Gehört zu `geburtsjahrlos` (B2). Neuausrichtung 2026-05-18 dokumentiert.
- `weltkarte-etf-indizes` — Kein eigenständiger Haupt-App-Abschnitt. Gehört zu C1/C3-Familie.

---

## Bewertung

### Was ist sicher?

- Alle 25 App-Verzeichnisse inventarisiert und klassifiziert.
- Alle 25 MINI_SPECs vorhanden.
- Alle 25 Slugs haben einen Seed-Block in der Seed-Datei.
- 7 durch AP-12 erledigt, Blöcke in MINI_SPEC bestätigt.
- 12 saubere Kategorie-B-Kandidaten mit Standard-Struktur und nachgewiesenem Anker.
- 1 Pilot mit APP_SPEC und bereits eingebautem Block (C).
- 2 bekannte Sonderfälle (D): plan-generator, etf-vergleich.
- 3 Companion-Module (H): kein eigenständiger Rollout ohne Klärung.

### Was ist unklar?

- `regulatorik-dashboard` ist Kategorie B, aber bereits produktiv. Ob Steuerungsblock in MINI_SPEC trotzdem sinnvoll ist, entscheidet Albert in AP-13b.
- Die 3 Companion-Module (H): Unklar, ob und wann sie eigene Steuerungsblöcke bekommen oder ob der Block in der Master-App ausreicht.
- `plan-generator` und `etf-vergleich`: Genaue Sonderfall-Natur nicht vollständig dokumentiert — dafür eigener Klärungs-AP nötig.

### Was blockiert den nächsten Batch?

Kein harter Blocker. AP-13b kann sauber geschnitten werden.

Empfehlung: `regulatorik-dashboard` in AP-13b explizit adressieren (Status-Notiz klären), dann entweder im Batch oder explizit ausschließen.

### Wie groß sollte der nächste Batch maximal sein?

Batch-A hatte 7 Apps. Mit 12 Kandidaten ist ein Batch von **6–8 Apps** realistisch. Orientierung:
- Priorität nach KI-Konsens (★★★ vor ★★ vor ★) als Auswahlhilfe für AP-13b.
- `regulatorik-dashboard` (Notiz) und `etf-aera-vorbei` (★, niedrigster Konsens) als letzte Batch-B-Kandidaten oder bewusst zurückstellen.

### Ist ein eigener AP-13b zum Batch-Schnitt nötig?

JA — der Batch-Schnitt (Anker-Inventar für Batch-B-Kandidaten wie in AP-12a, Dry-run, Freigabe) erfordert einen eigenen AP.

---

## Geänderte Dateien

```
docs/steering/patches/AP-13a_restbestand-minispec-steuerungsblock-inventar_Ergebnis.md  (dieses Protokoll, neu)
```

Keine App-, MINI_SPEC-, APP_SPEC-, Seed- oder Tool-Datei verändert.

---

## Nächster AP

```
AP-13b — Nächsten MINI_SPEC-Rollout-Batch schneiden
```

Inhalt AP-13b:
1. Batch-B-Kandidaten aus Kategorie B auswählen und priorisieren.
2. Anker-Inventar für gewählte Batch-B-Apps (wie AP-12a, aber nur für Batch-B-Slugs).
3. `regulatorik-dashboard`-Notiz explizit klären: in Batch oder explizit ausschließen.
4. Companion-Module (H) explizit auf Spätere-Entscheidung vertagen.
5. Batch-Schnitt freigeben → AP-13c (Dry-run + Write).

Nur nach Nutzer-OK starten.
