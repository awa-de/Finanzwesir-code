Stand: 2026-06-30 | Session: AP-15a | Geändert von: Claude

# AP-15a Ergebnis — prokrastinations-preis Pilot-Inventar und Abgleichsdiagnose

## Kurzstatus

```
Status:                  GRÜN
Blocker:                 nein
Empfehlung nächster AP:  AP-15b — MINI_SPEC Steuerungsblock-Insertion + Pilot-Nachführung
```

---

## Kettenposition

```
Vorgänger:               AP-13 / Batch B abgeschlossen (AP-13e GRÜN 2026-06-29)
Aktueller AP:            AP-15a — prokrastinations-preis Pilot-Inventar und Abgleichsdiagnose
Nächster AP bei GRÜN:    AP-15b — prokrastinations-preis MINI_SPEC Steuerungsblock-Insertion + Pilot-Nachführung
Nächster AP bei GELB:    Gezielter Klärungs-AP für benannte Unschärfe
Nächster AP bei ROT:     Fix- oder Klärungs-AP; keine Umsetzung
```

---

## Git-Status

```
Beginn AP-15a:
  M .claude/learning/session-log.md

Ende AP-15a:
  M .claude/learning/session-log.md
  ?? docs/steering/patches/AP-15a_prokrastinations-preis_pilot-inventar-abgleichsdiagnose_Ergebnis.md

Keine App-, MINI_SPEC-, APP_SPEC-, Seed- oder Tool-Datei verändert.
```

---

## Vorprüfung / Gates

| Gate | Prüfung | Ergebnis |
|---|---|---|
| 1 | `git status --short` | `M .claude/learning/session-log.md` — sauber, kein unerwarteter AP-13-Rest |
| 2 | AP-13b + AP-13e gelesen | BESTÄTIGT: AP-13 GRÜN; prokrastinations-preis als Pilot-Sonderpfad dokumentiert |
| 3 | Alle drei Pflichtdateien vorhanden | JA: MINI_SPEC ✓, APP_SPEC ✓, Seed-Datei ✓ |
| 4 | Seed-Block `## prokrastinations-preis` vorhanden | JA — gefunden in Abschnitt 3 der Seed-Datei |
| 5 | Steuerungsblock-Lage | MINI_SPEC: NEIN / APP_SPEC: JA / Seed: JA (vollständig) |

Alle Gates bestanden. Kein Stop-Trigger ausgelöst.

---

## Gelesene Referenzen

- `Apps/prokrastinations-preis/MINI_SPEC_FROM_HAUPTDOKUMENT.md` ✓
- `Apps/prokrastinations-preis/APP_SPEC.md` (V2.9, bis Zeile 1854 von 2062) ✓
- `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` (Abschnitt 3, Seed prokrastinations-preis) ✓
- `docs/steering/patches/AP-13b_batch-schnitt-drift-pilot-sonderfaelle_Ergebnis.md` ✓
- `docs/steering/patches/AP-13e_batch-b-review-commit-vorbereitung_Ergebnis.md` ✓

---

## 1. Dokumentenlandkarte

| Datei | Existiert | Rolle | Steuerungsblock vorhanden | Bedeutung für Folgearbeit |
|---|:---:|---|:---:|---|
| `MINI_SPEC_FROM_HAUPTDOKUMENT.md` | JA | Historische Planungsquelle; bei Widerspruch gilt APP_SPEC | NEIN | Muss Steuerungsblock bekommen; enthält Pilot-Altlasten (V-Verweis, deprecated text) |
| `APP_SPEC.md` (V2.9) | JA | Maßgebliche technisch-fachliche Spec; aktive Implementierungsgrundlage | JA (§2) | Ist bereits weiter als MINI_SPEC; Steuerungsblock identisch mit Seed |
| Seed `prokrastinations-preis` in `APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` | JA | Redaktionelle Masterquelle für Steuerungsblock-Verteilung | JA (vollständig) | Inhalt identisch mit APP_SPEC-Block; Verteilungsstatus veraltet (→ Befund 1) |

---

## 2. MINI_SPEC-Inventar

**Datei:** `Apps/prokrastinations-preis/MINI_SPEC_FROM_HAUPTDOKUMENT.md`

**Titel/H1:** `MINI_SPEC_FROM_HAUPTDOKUMENT — Marktzeit schlägt Timing / Lieber heute als morgen`

**App-H2:** `## B1 – Marktzeit schlägt Timing / Lieber heute als morgen`

**Kopfbereich:**
- Quelle: ETF-Apps-Hauptdokument + 04_ZUSATZTEXT_B1_REWRITE_MARKTZEIT.md
- Status-Note: „Historisch — abgeleitet aus Planungsphase Mai 2026. Bei Widerspruch gilt `APP_SPEC.md` V2.5."
- Letzte Änderung: 2026-06-16 (AP-08, Screen-Flow-Anpassung)

**Hauptsektionen:**
1. Problem, das gelöst wird (Nutzeraussagen als Ausgangspunkt)
2. Kernbotschaft
3. Neue Rolle
4. Datenlogik (MSCI-World, Monatsdaten, kein Backend)
5. Interaktion / UX-Flow (Screen 1–4, Stationen-Zeitreise)
6. Was die App nicht tut (Nicht-Ziele, Liste)
7. Abgrenzung zu B2
8. CTA (offene Frage, verweis auf APP_SPEC §21)
9. Implementierungshinweise
10. Mini-Spec-Metadaten

**Pilot-Altlasten / Ungereimtheiten:**
- Verweist durchgehend auf „APP_SPEC.md V2.5" — aktuelle Version ist V2.9 (4 Versionen veraltet)
- Screen 4: Deprecated text mit Durchstreichung vorhanden: `~~„Wenn du jetzt wieder wartest..."~~ *(historischer Planungsentwurf — zu druckvoll; verbindliche Microcopy in `APP_SPEC.md` V2.5 §23.16)*`
- Kein Steuerungsblock (keine Barriere-Feld, kein Glaubenssatz-Feld, kein Zielzustand-Feld als Steuerungsblock-Abschnitt)
- Screen 2/3 mit explizitem Verweis: „→ Führende Quelle: `APP_SPEC.md` V2.5 §16.1–§16.4"

**Steuerungsblock in MINI_SPEC:** NEIN

**Möglicher Einfügeanker:** Nach `## B1 – Marktzeit schlägt Timing / Lieber heute als morgen` + kurzem Slug/Funnel-Kopf, vor `## Problem, das gelöst wird` — Standard-MINI_SPEC-Position.

**Anker-Qualität:** GRÜN — H2 klar, Standardstruktur folgt, Tool-kompatibel.

**Notiz:** MINI_SPEC ist bewusst als „historisch" markiert. Die Verweise auf V2.5 sind Pilot-Altlasten, kein kritischer Fehler. Der fehlende Steuerungsblock ist das Hauptdefizit.

---

## 3. APP_SPEC-Inventar

**Datei:** `Apps/prokrastinations-preis/APP_SPEC.md` — V2.9 (Stand: 2026-06-18)

**Titel/H1:** `# APP_SPEC — prokrastinations-preis`

**Struktur (Hauptabschnitte):**
- §1 Status (Versionstabelle, Phase, Nächster Schritt, Code-Stand)
- §2 **Steuerungsblock: Zweck, Barriere, Prüfregeln** (aus Seed eingefügt, mit Quellenkommentar)
- §3 App-Familie (Geführte historische Zeitreise)
- §4 Bezug zur Produktlandkarte
- §5 Inputs (Nutzer-Eingaben, Validierungsregeln)
- §6 Outputs (UI-Primitive mit Screen-Sichtbarkeit)
- §7 Datenbedarf / Data Need Snapshot (umfangreich: §7.1–§7.10)
- §8 Zwei-Datenschichten-Architektur
- §9 Rolling-Window-Regel
- §10 Ghost-Card-Vertrag
- §11 data-fw-options-Whitelist
- §12 State-Modell
- §13 AppContext-Schema (§13.1–§13.4)
- §14 A11y- und Mobile-Regeln (§14.0–§14.14)
- §15 Reise eines Inputs / Datenpunkts
- §16 UX/UI-Primitiven (§16.1–§16.5, inkl. Progressive Domain, Marker-Zielbild, Pulse)
- §17 Verbotene Visuals und Dark-Pattern-Grenzen
- §18 Sicherheitsregeln
- §19 Testfälle (T-01–T-40)
- §20 Redaktions-Gate
- §21 Offene Fragen
- §22 Spec-Gate-Checkliste
- §23 Beweisdramaturgie / Entscheidungspsychologie (§23.1–§23.19, nicht vollständig gelesen)

**Implementierungsstatus (aus §1):**
- Stationen-Zeitreise vollständig implementiert (AP-11–AP-14c4 ✅ 2026-06-17/18)
- Engine-Erweiterungen (Progressive Domain, Annotation-Marker, Pulse) abgeschlossen
- Nächster Schritt: B1-AP-15 — Transitions + Reduced Motion

**Steuerungsblock in APP_SPEC:** JA — §2, mit Quellenkommentar:
```
<!-- Quelle: Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md / Seed prokrastinations-preis -->
<!-- Mechanisch eingefügt. Nicht frei formulieren. -->
```

**APP_SPEC wirkt maßgeblich für Umsetzung:** JA — sie enthält vollständige technische Spec, State-Modell, AppContext, Ghost-Card-Vertrag, Testfälle.

**Stellen, an denen APP_SPEC weiter ist als MINI_SPEC:**
- Vollständige technische Architektur (AppContext, State-Modell, Rolling Window, Two-Layer-Data)
- A11y-Regeln im Detail (§14 mit 15 Unterabschnitten)
- Stationen-Mechanik, Pulse-Spezifikation, Progressive Domain
- Redaktions-Gate, Testfälle (40 Tests), Spec-Gate-Checkliste
- Beweisdramaturgie/Psychologie (§23 mit 19 Unterabschnitten)

**Notiz:** APP_SPEC ist die klar maßgebliche Quelle. MINI_SPEC ist konzeptioneller Vorläufer, der durch die APP_SPEC in der Umsetzungsphase weit überholte.

---

## 4. Seed-Block-Kernfelder

**Quelle:** `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md`, Abschnitt `## prokrastinations-preis`

**Status im Seed:** GESICHERT, aber vor Einbau redaktionell final prüfen
**Verteilungsstatus im Seed:** „Nicht verteilt" ← VERALTET (App_SPEC hat Block bereits)

| Feld | Seed-Inhalt |
|---|---|
| Rolle | B1 — Marktzeit-Entscheidungspunkt / geführte Stationen-Zeitreise |
| Diese App existiert, um | aus Bedauern über das verpasste Gestern eine Entscheidung für das verfügbare Heute zu machen |
| Psychologische Barriere | Die Rückblick-Illusion: Im Nachhinein wirkt ein guter Einstiegszeitpunkt logisch und erkennbar; in Echtzeit fühlt er sich aber unsicher, unfertig und falsch an |
| Falscher Glaubenssatz | „Ein guter Einstiegszeitpunkt müsste sich heute so klar anfühlen, wie er im Rückblick aussieht." |
| Zielzustand | „Rückblick täuscht. Heute fühlt sich nicht wie der richtige Zeitpunkt an — aber genau so fühlte es sich damals auch an. Ich kann nicht mit Endwissen starten, aber ich kann heute anfangen." |
| Kernsatz | „Im Rückblick sieht Mut aus wie Logik. In Echtzeit war es eine Entscheidung." |
| Ton / Haltung | Kölsches-Grundgesetz-Haltung: realistischer Fatalismus plus Optimismus |
| Muss-Kriterien | 6 Punkte: Stationen-Zeitreise / Screen 2 ohne Endwissen / Screen 3 erster Reveal / Screen 4 Transfer / echte Daten / ruhiger Ton |
| Nicht-Ziele / harte Verbote | 6 Punkte: kein Strafzettel / kein Countdown / keine Zukunftsprognose / kein Epochen-Fächer / keine Kohortenanalyse / keine Produktempfehlung |
| LLM-Prüfscore | Standard-Gate aus §2.1 (4 Dimensionen, 0–2 je, Score-Regel 8/8 / 6–7/8 / ≤5/8) |
| Klärungsbedarf | Slug-Frage offen (Slug bleibt prokrastinations-preis); APP_SPEC-Kopf auf Verlustzähler-Reste prüfen |

---

## 5. APP_SPEC-Steuerungsblock-Kernfelder

Steuerungsblock liegt in APP_SPEC §2, Quellenkommentar bestätigt Herkunft aus Seed.

| Feld | APP_SPEC-Steuerungsblock |
|---|---|
| Rolle | B1 — Marktzeit-Entscheidungspunkt / geführte Stationen-Zeitreise |
| Diese App existiert, um | aus Bedauern über das verpasste Gestern eine Entscheidung für das verfügbare Heute zu machen |
| Psychologische Barriere | Die Rückblick-Illusion: Im Nachhinein wirkt ein guter Einstiegszeitpunkt logisch und erkennbar; in Echtzeit fühlt er sich aber unsicher, unfertig und falsch an |
| Falscher Glaubenssatz | „Ein guter Einstiegszeitpunkt müsste sich heute so klar anfühlen, wie er im Rückblick aussieht." |
| Zielzustand | „Rückblick täuscht. Heute fühlt sich nicht wie der richtige Zeitpunkt an — aber genau so fühlte es sich damals auch an. Ich kann nicht mit Endwissen starten, aber ich kann heute anfangen." |
| Kernsatz | „Im Rückblick sieht Mut aus wie Logik. In Echtzeit war es eine Entscheidung." |
| Ton / Haltung | Kölsches-Grundgesetz-Haltung: realistischer Fatalismus plus Optimismus |
| Muss-Kriterien | 6 Punkte: identisch Seed |
| Nicht-Ziele / harte Verbote | 6 Punkte: identisch Seed |
| LLM-Prüfscore | Standard-Gate §2.1: identisch Seed |

**Befund Seed ↔ APP_SPEC-Block:** Vollständig identisch. Der Kommentar „Mechanisch eingefügt. Nicht frei formulieren." bestätigt, dass kein redaktioneller Drift stattgefunden hat.

---

## 6. Vergleichstabelle MINI_SPEC ↔ Seed ↔ APP_SPEC

| Prüfbereich | MINI_SPEC | Seed | APP_SPEC | Befund |
|---|---|---|---|---|
| App-Zweck | „Der verpasste Startpunkt ist weg. Aber heute ist noch da." / Marktzeit-Prinzip | aus Bedauern über das verpasste Gestern eine Entscheidung für das verfügbare Heute | identisch Seed | KONSISTENT im Kern — MINI_SPEC weniger präzise formuliert |
| Nutzerproblem / Vorannahmen | Zwei Vorannahmen: „Zug abgefahren" / „Ich warte noch" | Nicht explizit als Vorannahmen, sondern als Barriere (Rückblick-Illusion) | APP_SPEC §23.1: drei Vorannahmen (Variante A/B/C) + Rückblick-Illusion als Hauptgegner | ABWEICHUNG: MINI_SPEC ist breiter/unspezifischer; APP_SPEC hat Hindsight-Bias als Hauptgegner differenziert |
| Psychologische Barriere | Nicht als eigenes Feld — implizit in Problemformulierung | Die Rückblick-Illusion (explizites Steuerungsblock-Feld) | identisch Seed | LÜCKE in MINI_SPEC: Steuerungsblock-Barriere-Feld fehlt |
| Falscher Glaubenssatz | Nicht als eigenes Feld | „Ein guter Einstiegszeitpunkt müsste sich heute so klar anfühlen..." | identisch Seed | LÜCKE in MINI_SPEC: Glaubenssatz-Feld fehlt |
| Zielzustand nach der App | Nicht als eigenes Feld | „Rückblick täuscht. Heute fühlt sich nicht wie der richtige Zeitpunkt an..." | identisch Seed | LÜCKE in MINI_SPEC: Zielzustand-Feld fehlt |
| Kernbotschaft / Kernsatz | „Du kannst nicht mehr vor 10 Jahren starten. Aber du kannst verhindern..." | „Im Rückblick sieht Mut aus wie Logik. In Echtzeit war es eine Entscheidung." | Beide Sätze vorhanden (§2 Kernsatz + §2 APP-Zweck) | ABWEICHUNG: MINI_SPEC hat anderen Kernsatz; beide Kernsätze sind inhaltlich komplementär, nicht widersprüchlich |
| Ton / Haltung / Mentorrolle | Kein Strafzettel; „Finanzwesir-Version von Time in Market" | Kölsches-Grundgesetz-Haltung; ruhig, fatalistisch-optimistisch | identisch Seed | ABWEICHUNG in Formulierung: MINI_SPEC beschreibt Tonalität grober; Seed/APP_SPEC spezifischer |
| Screen-Flow | Screen 1–4 (Grundstruktur) mit Stationen-Zeitreise-Konzept | n/a | Screen 1–4 (vollständig ausgearbeitet: Akte, Haltepunkte, Primitive, Animationen) | APP_SPEC WEITER ALS MINI_SPEC — vollständige technische Implementierungsspec |
| Nicht-Ziele / Verbote | Liste mit 8 Punkten (teils anders formuliert) | 6 Punkte (präzise Verbote) | 6 Verbote in Steuerungsblock + weitere in §17 + §23.9 | KONSISTENT im Kern — APP_SPEC deutlich vollständiger; keine inhaltlichen Widersprüche |
| Datenlogik / MSCI-CSV | MSCI-World-Monatsdaten, kein Backend, echte Einbrüche | n/a | §7 umfangreich (7.1–7.10): Datenreihe, Format, Validierung, Governance | APP_SPEC WEITER ALS MINI_SPEC — vollständige Datenlayer-Spec |
| CTA | Offene Frage; Kandidaten „Heute Marktzeit sammeln" / „Meine nächsten 10 Jahre starten" | n/a | §21 E-04: offen (redaktionell zu bestätigen) | KONSISTENT: beide dokummentieren die offene Entscheidung |
| Steuerungsblock gesamt | NICHT vorhanden | Vorhanden (vollständig) | VORHANDEN (aus Seed, identisch) | LÜCKE in MINI_SPEC — Hauptdefizit |
| Versionsbezug | Verweist auf APP_SPEC V2.5 (mehrfach) | n/a | V2.9 | MINI_SPEC ALT / PILOT-ALTLAST: 4 Versionen veraltet |
| Deprecated Microcopy | Screen 4: Durchgestrichener Alttext mit Verweis auf V2.5 §23.16 | n/a | §23.16 (aktuell, nicht gelesen) | MINI_SPEC ALT / PILOT-ALTLAST: veralteter Inhalt sichtbar |
| Seed Verteilungsstatus | n/a | „Nicht verteilt" (veraltet) | Block aus Seed mechanisch eingefügt | DRIFT: Seed-Verteilungsstatus nicht nach Insertion in APP_SPEC aktualisiert |

---

## 7. Widerspruchs- und Driftliste

```
Sichere Konsistenzen:
- App-Zweck: MINI_SPEC, Seed und APP_SPEC beschreiben dasselbe Marktzeit-Prinzip.
- Nicht-Ziele: Kein inhaltlicher Widerspruch zwischen MINI_SPEC, Seed und APP_SPEC.
- Screen-Flow-Grundstruktur: 4 Screens, Stationen-Zeitreise-Konzept konsistent.
- Seed ↔ APP_SPEC-Steuerungsblock: vollständig identisch, kein Drift.
- CTA offen: Beide Dokumente dokumentieren die ungelöste E-04-Entscheidung.

Mögliche Abweichungen (kein Widerspruch, aber Formulierungsunterschied):
- Kernsatz in MINI_SPEC vs. APP_SPEC: MINI_SPEC nennt „Du kannst nicht mehr vor 10 Jahren
  starten..." als Kernsatz; APP_SPEC nennt „Im Rückblick sieht Mut aus wie Logik..."
  als Kernsatz (§2). Beide Sätze stehen in APP_SPEC, sind inhaltlich komplementär,
  nicht widersprüchlich. MINI_SPEC hat den älteren Kernsatz als primären Kernsatz.
- Tonalität: MINI_SPEC beschreibt Ton als „Finanzwesir-Version von Time in Market";
  Seed/APP_SPEC als „Kölsches-Grundgesetz-Haltung". Beides ist kompatibel, aber
  unterschiedlich präzise.
- Barrieren-Beschreibung: MINI_SPEC nennt zwei Nutzeraussagen als Eingang;
  APP_SPEC/Seed präzisiert als „Rückblick-Illusion" (Hindsight-Bias). Inhaltlich
  konsistent, Abstraktionsniveau verschieden.

Pilot-Ungereimtheiten:
- MINI_SPEC verweist auf APP_SPEC V2.5 (Planungsstand Mai 2026). Aktuelle APP_SPEC
  ist V2.9 (Stand 2026-06-18). Die Referenz ist 4 Versionen veraltet und beschreibt
  eine Fassung vor dem vollständigen Stationen-Zeitreise-Entwurf.
- MINI_SPEC enthält Durchgestrichenen Alttext in Screen 4 als explizite Pilot-Altlast.
  Der Verweis zeigt, dass die MINI_SPEC seit AP-08 (2026-06-16) inhaltlich nicht
  mehr nachgeführt wurde.
- Reihenfolge-Ungereimtheit: Der Steuerungsblock wurde zuerst in APP_SPEC eingefügt
  (Pilot-Logik: APP_SPEC existierte zuerst), NICHT zuerst in MINI_SPEC. Das umgekehrt
  der normalen Verteilungsreihenfolge (Seed → MINI_SPEC → APP_SPEC).

Drift-Risiken:
- Kein inhaltlicher Drift zwischen Seed und APP_SPEC-Steuerungsblock (bestätigt).
- Kein inhaltlicher Drift zwischen APP_SPEC-Steuerungsblock und App-Umsetzungslogik
  (nicht geprüft in AP-15a, wäre Aufgabe eines späteren QA-APs).
- Seed-Verteilungsstatus „Nicht verteilt" ist faktisch falsch — das ist ein
  Dokumentations-Drift, kein inhaltlicher Drift.

Unklare Punkte:
- Seed-Klärungsbedarf „APP_SPEC-Kopf auf alte Verlustzähler-Reste prüfen": laut
  APP_SPEC §1 und §2 keine sichtbaren Altlasten aus dem Verlustzähler-Konzept.
  Der ursprüngliche Klärungsbedarf scheint durch APP_SPEC-Entwicklung bereits
  aufgelöst worden zu sein.
- Ob der deprecated Durchstrichene Text in MINI_SPEC Screen 4 im AP-15b entfernt
  oder nur als Altlast markiert bleibt, ist eine redaktionelle Entscheidung.
- Ob MINI_SPEC nach Steuerungsblock-Insertion auch die V2.5-Verweise auf V2.9
  aktualisieren soll: sinnvoll, aber nicht zwingend für Steuerungsblock-Insertion.
```

---

## 8. Diagnosebewertung

### Was ist sicher?

- MINI_SPEC fehlt der Steuerungsblock — das ist das Hauptdefizit und der klare Auftrag für AP-15b.
- APP_SPEC hat den Steuerungsblock bereits, identisch mit Seed — kein redaktioneller Drift zwischen Seed und APP_SPEC-Block.
- MINI_SPEC ist bewusst als „Historisch" markiert; die V2.5-Verweise sind Pilot-Altlasten, kein kritischer Fehler.
- Die Standard-Tool-Insertion (`insert_steuerungsblock_into_minispec_from_seed.py --slug prokrastinations-preis`) ist für den Steuerungsblock-Teil technisch möglich.
- Der Anker in der MINI_SPEC ist sauber (H2 vorhanden, Standardstruktur folgt).

### Was ist unklar?

- Ob AP-15b nur den Steuerungsblock einfügt oder auch die drei Pilot-Nachführungspunkte abwickelt (V-Verweis, deprecated text, Seed-Status). Das ist eine Scope-Entscheidung für AP-15b.
- Ob eine inhaltliche Sichtkontrolle APP_SPEC ↔ MINI_SPEC nach Insertion nötig ist: formal nicht zwingend (Seed ist SSoT, beide aus Seed), aber optional als Vertrauenscheck.

### Was ist kritisch?

Nichts Blockendes. Alle diagnostizierten Ungereimtheiten sind:
- entweder erwartete Pilot-Altlasten (V-Verweis, deprecated text),
- oder Dokumentations-Drift ohne inhaltliche Konsequenz (Seed-Verteilungsstatus),
- oder Abstraktionslevel-Unterschiede, keine Widersprüche (Kernsatz, Tonalität).

### Was blockiert Umsetzung?

Kein Blocker. AP-15b kann starten.

### Ist ein MINI_SPEC-Update wahrscheinlich möglich?

Ja.
- Steuerungsblock-Insertion: Standard-Tool-kompatibel, Anker vorhanden, Inhalt aus Seed identisch mit APP_SPEC.
- Zusätzliche Nachführungspunkte (V-Verweis, deprecated text, Seed-Status): kleine manuelle Edits, kein konzeptioneller Klärungsbedarf.

### Ist ein APP_SPEC-Abgleich zwingend nötig?

Formal nein: Der Steuerungsblock in APP_SPEC kommt bereits aus dem Seed. Was in MINI_SPEC eingesetzt wird, ist identisch. Es gibt keinen neuen Abgleichbedarf.
Optional sinnvoll: Sichtkontrolle nach MINI_SPEC-Update, ob kein neuer Drift entstanden ist. Das ist aber eher eine QA-Aufgabe im Rahmen der Umsetzung, nicht ein eigener Klärungs-AP.

---

## 9. Empfohlener Folgepfad

**Option C + Erweiterung:**

```
AP-15b — prokrastinations-preis Nachführungsplan:
           MINI_SPEC Steuerungsblock-Insertion + Pilot-Altlast-Bereinigung
```

**Inhalt AP-15b:**

1. **Steuerungsblock-Insertion in MINI_SPEC** (Standard-Tool, `--slug prokrastinations-preis`, Dry-run zuerst)
2. **V-Verweis-Aktualisierung:** V2.5-Verweise in MINI_SPEC auf V2.9 aktualisieren (3 Stellen)
3. **Deprecated-Text-Behandlung:** Screen-4-Alttext in MINI_SPEC klären (entfernen oder als Archivhinweis behalten — Alberts Entscheidung)
4. **Seed-Verteilungsstatus:** `Nicht verteilt` → `Verteilt in APP_SPEC; MINI_SPEC folgt in AP-15b`
5. **Optionale Sichtkontrolle:** APP_SPEC-Steuerungsblock ↔ MINI_SPEC-Steuerungsblock nach Insertion bestätigen

**Begründung für Option C (nicht A, nicht B):**
- A (nur Steuerungsblock, Anker klar) würde die drei Nachführungspunkte übersehen, die aus dem Pilotstatus resultieren.
- B (Redaktionsentscheidung nötig) ist nicht erforderlich — Seed und APP_SPEC sind konsistent, kein Widerspruch.
- C trifft es: APP_SPEC ist maßgeblich und weiter; MINI_SPEC bekommt den Steuerungsblock aus dem Seed (Standard), plus drei kleine Pilot-Nachführungspunkte, die keine Konzentüberarbeitung erfordern.

---

## 10. Geänderte Dateien

```
docs/steering/patches/AP-15a_prokrastinations-preis_pilot-inventar-abgleichsdiagnose_Ergebnis.md
  (dieses Protokoll, neu)
```

---

## 11. Nicht-Ziel-Nachweis

```
MINI_SPEC geändert:    nein
APP_SPEC geändert:     nein
Seed geändert:         nein
Tool geändert:         nein
Write ausgeführt:      nein (außer diesem Protokoll)
Commit ausgeführt:     nein
Steuerungsblock eingefügt: nein
```
