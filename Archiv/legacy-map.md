Stand: 2026-06-08 | Quelle: docs/steering/ARCHIV-INVENTAR.md | Geändert von: Claude | Session: AP-8-making-of-rahmen

# Föderierter Archivkatalog / Legacy Map

## Zweck

Diese Datei kartiert die historisch gewachsenen Archivorte im Projekt.

Sie ist kein Migrationsplan und keine Aufforderung zur Konsolidierung.

Lokale Archive bleiben dort, wo sie lokalen Kontext erklären.

Das Root-Archiv `Archiv/` dient projektübergreifender Kuratierung, Making-of-Material,
Querschnittsentscheidungen und zentralen historischen Wendepunkten.

---

## Grundsatz

- Aktive Dateien zeigen, was heute gilt.
- Lokale Archive erklären lokale Entstehung.
- Root-Archiv erzählt die projektweite Reise.
- `local/` schützt Git und Claude vor Rohmaterial.
- Der Archivvertrag verhindert Kontextdrift.

---

## Archivvertrag in Kurzform

- Archivdateien sind nie operativer Standardkontext für Claude.
- Aktuelle Regeln stehen im aktiven Pfad, nicht im Archiv.
- Historische Entscheidungen tragen bei Kuratierung Status: `HIST`, `ERSETZT`, `POSTMORTEM` oder `RAW`.
- `ERSETZT` verweist auf den aktiven Nachfolger.
- Rohmaterial, Binärdateien, vollständige LLM-Dumps und unkuratierte Exporte gehören nach `local/`.
- `local/` bleibt gitignored — wo es existiert.
- Keine Massenkonsolidierung ohne gesonderten Plan.

Vollständige Regeln: `docs/steering/ARCHIV-STRATEGIE.md`

---

## Kartenstatus

| Feld | Wert |
|---|---|
| Quelle | `docs/steering/ARCHIV-INVENTAR.md` |
| Stand | 2026-06-08 |
| Status | Befundkarte, keine Zielstruktur |
| Nächste geplante Überarbeitung | nach AP 9 (Pilotarchiv abgeschlossen) |

---

## Übersicht

| Kategorie | Anzahl |
|---|---|
| Kartierte Archivorte gesamt | 16 |
| Root-Archive | 1 |
| Lokale Archive | 6 |
| local/-Quarantänen | 1 |
| Archivdateien | 4 |
| Sonderfälle | 3 |
| Unklare Fälle | 1 |
| Pilotkandidaten | 2 |

---

## Föderierte Archivkarte

| Pfad (relativ) | Typ | Bereich | Zweck / Kontext | Making-of-Wert | Drift-Risiko | Zielrolle | Nächste Aktion |
|---|---|---|---|---|---|---|---|
| `Archiv/` | ROOT_ARCHIV | Gesamtprojekt | 14 Themeninseln; Chart-Engine-Historie, Peer-Reviews, Design, KI-Workflow-Geschichte | hoch | niedrig | ROOT_KURATION + MAKING_OF_BELEG | LOCAL_PRUEFEN |
| `Archiv/local/` | LOCAL_QUARANTAENE | Root-Archiv | Gitignored Quarantäne; 203 Dateien, ≈31 MB; Binärdateien, LLM-Dumps, Rohmaterial | unklar | niedrig | LOCAL_QUARANTAENE | BELASSEN_UND_VERTRAG_ANWENDEN |
| `Archiv/optimierung-projektsteuerung/Optimierung Projektsteuerung/Archiv/` | LOKALES_ARCHIV | Root-Archiv (verschachtelt) | 2 Dateien: LLM-Synthese-Exports (CLAUDE-pre-synthese + NAVIGATION-pre-synthese, 2026-05-03) | mittel | niedrig | LOCAL_QUARANTAENE + ZU_PRUEFEN | LOCAL_PRUEFEN |
| `Apps/prokrastinations-preis/Archiv/` | LOKALES_ARCHIV | App prokrastinations-preis | 2 Markdown-Dateien, 6 KB; Slice-0-Kickoff-Prompt + Implementierungs-Prompt | mittel | niedrig | LOKALER_KONTEXT + MAKING_OF_BELEG | README_ANWENDEN + ROOT_REFERENZ_PRUEFEN |
| `docs/App-Fabrik/_archive/` | LOKALES_ARCHIV | App-Fabrik | 1 Datei (README.md, 0 KB, leer); Archiv de facto leer | niedrig | niedrig | ZU_PRUEFEN | SONDERFALL_PRUEFEN |
| `docs/design-system/archiv/` | LOKALES_ARCHIV | Design-System | 1 Datei (boxen-stress-test-referenz.html, 9 KB); Referenz-Stresstest aus Design-System-Entwicklung | mittel | niedrig | LOKALER_KONTEXT + MAKING_OF_BELEG | README_ANWENDEN + ROOT_REFERENZ_PRUEFEN |
| `docs/spec/archiv/` | LOKALES_ARCHIV | Spec / Chart-Engine | 4 Markdown-Dateien, 47 KB; Spec-Versionen v1/v12/v13 für HTML-Karten und Ticks/Labels | hoch | mittel | LOKALER_KONTEXT + MAKING_OF_BELEG | README_ANWENDEN + PILOTKANDIDAT |
| `docs/steering/archiv/` | LOKALES_ARCHIV | Steering / Projektsteuerung | 15 Dateien, 222 KB; AP-Übergaben, Implementierungspläne, Handoff-Prompts, Known-Issues-Geschichte | hoch | hoch | LOKALER_KONTEXT + MAKING_OF_BELEG | README_ANWENDEN |
| `Inhalte alte Site/blog/archiv/` | SONDERFALL | Alte Website / Content | 1 leere Datei (page.md, 0 KB); Archiv-Ordner innerhalb alter Websiteinhalte; de facto leer | niedrig | niedrig | SONDERFALL | SONDERFALL_PRUEFEN + LOESCHKANDIDAT_PRUEFEN |
| `archivliste.md` | SONDERFALL | Projektroot | 1 KB; manuelle Archivorte-Liste mit absoluten Windows-Pfaden; durch ARCHIV-INVENTAR.md ersetzt | niedrig | niedrig | SONDERFALL | LOESCHKANDIDAT_PRUEFEN |
| `Archiv/Refactoring der Dateistruktur/Aufraeum-Archiv.md` | ARCHIVDATEI | Root-Archiv / Refactoring | 18 KB; Aufräum-Analyse aus der Refactoring-Phase der Dateistruktur | mittel | niedrig | ROOT_KURATION + MAKING_OF_BELEG | BELASSEN_UND_VERTRAG_ANWENDEN |
| `docs/steering/archiv/AUFRAEUM-ANALYSE-ARCHIV.md` | ARCHIVDATEI | Steering-Archiv | 8 KB; archivierte Aufräum-Analyse aus der Steering-Phase | mittel | mittel | LOKALER_KONTEXT + MAKING_OF_BELEG | BELASSEN_UND_VERTRAG_ANWENDEN |
| `docs/steering/archiv/KNOWN-ISSUES-ARCHIV.md` | ARCHIVDATEI | Steering-Archiv | 8 KB; archivierte Known-Issues-Liste | mittel | mittel | LOKALER_KONTEXT + MAKING_OF_BELEG | BELASSEN_UND_VERTRAG_ANWENDEN |
| `docs/steering/archiv/KNOWN-ISSUES-SCHLACHTPLAN-ARCHIV.md` | ARCHIVDATEI | Steering-Archiv | 79 KB; archivierter Known-Issues-Schlachtplan; größter Einzelartefakt im Inventar | hoch | hoch | LOKALER_KONTEXT + MAKING_OF_BELEG | UNKLAR_PRUEFEN |
| `docs/steering/BACKLOG-ARCHIV.md` | SONDERFALL | Steering (aktiver Pfad) | 34 KB; aktives Backlog-Archiv; operatives Artefakt — wird von /start und Kassensturz direkt gelesen | mittel | niedrig | SONDERFALL | BELASSEN_UND_VERTRAG_ANWENDEN |
| `Archiv/making-of/` | LOKALES_ARCHIV | Root-Archiv | Making-of-Rahmen; KAPITELRAHMEN.md + README.md; kein operativer Inhalt; erstellt AP 8 | hoch | niedrig | ROOT_KURATION + MAKING_OF_BELEG | BELASSEN_UND_VERTRAG_ANWENDEN |

---

## Root-Archiv

**Pfad:** `Archiv/`
**Dateianzahl:** ≈88 Dateien (exkl. `Archiv/local/`), ≈1,6 MB
**Zielrolle:** ROOT_KURATION + MAKING_OF_BELEG

Das Root-Archiv ist die projektweite Kurations- und Making-of-Ebene.
Lokale Archive bleiben an Ort und Stelle; das Root-Archiv enthält projektübergreifende Themeninseln.

### Themeninseln

| Unterordner | Kurzbeschreibung | Kuratierbarer Wert | Making-of-Wert | Rohmaterialverdacht |
|---|---|---|---|---|
| `Archiv/Apps/` | App-Archiv im Root; Überlappung mit `Apps/prokrastinations-preis/Archiv/` prüfen | unklar | mittel | unklar |
| `Archiv/Chart-Engine-Historie/` | Technische Entstehungsgeschichte der Chart-Engine | hoch | hoch | nein |
| `Archiv/Design/` | Design-Archiv | unklar | mittel | unklar |
| `Archiv/git-migration/` | Git-Migrationsdokumente | mittel | mittel | nein |
| `Archiv/local/` | Quarantäne — separat kartiert | — | — | ja |
| `Archiv/optimierung-projektsteuerung/` | Enthält verschachteltes Archiv mit LLM-Dumps | unklar | mittel | ja |
| `Archiv/Peer Review Arbeitspakete/` | Peer-Review-Material zu Arbeitspaketen | hoch | hoch | nein |
| `Archiv/Peer Review Migration/` | Peer-Review-Material zur Migration | hoch | hoch | nein |
| `Archiv/Projekt Kontroll-Skills/` | KI-Workflow-Geschichte | mittel | hoch | unklar |
| `Archiv/Rechtliches/` | Rechtliche Dokumente | mittel | niedrig | nein |
| `Archiv/Refactoring der Dateistruktur/` | Enthält Aufraeum-Archiv.md (18 KB) | mittel | mittel | nein |
| `Archiv/Refactoring des Gehirns/` | KI-Workflow-Geschichte, Prozess-Reflexion | hoch | hoch | unklar |
| `Archiv/root-dateien-2026-05-03/` | Root-Dateien-Backup vom 2026-05-03 | niedrig | niedrig | ja |
| `Archiv/making-of/` | Making-of-Rahmen; KAPITELRAHMEN.md + README.md; erstellt AP 8 | hoch | hoch | nein |
| `Archiv/selbstlernenes System/` | Geschichte des selbstlernenden Projektsystems | hoch | hoch | unklar |

### Direkte Dateien im Root

| Datei | Größe | Beschreibung | Nächste Aktion |
|---|---|---|---|
| `Archiv/Author Guide Ghost-v1.md` | 5 KB | Erste Version des Author Guides — Versionsgeschichte kuratierbar | BELASSEN_UND_VERTRAG_ANWENDEN |
| `Archiv/Author Guide Ghost-v2.md` | 5 KB | Zweite Version des Author Guides — Versionsgeschichte kuratierbar | BELASSEN_UND_VERTRAG_ANWENDEN |
| `Archiv/struktur.md` | 17 KB | Strukturdokument; Inhalt und Status unbekannt | UNKLAR_PRUEFEN |

**Offener Punkt:** `Archiv/Apps/` hat mögliche Überlappung mit `Apps/prokrastinations-preis/Archiv/` — in AP 9 prüfen, wenn Pilotarchiv behandelt wird.

---

## Lokale Archive

### `Apps/prokrastinations-preis/Archiv/`

- **Subsystem:** App prokrastinations-preis (APP-01)
- **Zielrolle:** LOKALER_KONTEXT + MAKING_OF_BELEG
- **Dateien:** 2 Markdown-Dateien, 6 KB
- **Inhalt:** Slice-0-Kickoff-Prompt + Implementierungs-Prompt — direkte Entstehungsgeschichte von Slice 0
- **Kontextnähe:** sinnvoll — erklärt Entstehung direkt am App-Kontext
- **Rohmaterial:** nein
- **Drift-Risiko:** niedrig
- **README vorhanden:** ja (AP 7)
- **Pilotstatus:** Kandidat 2 (→ Pilotkandidaten)
- **Nächste Aktion:** README_ANWENDEN + ROOT_REFERENZ_PRUEFEN — Root-Archiv soll später auf Slice-0-Geschichte verweisen

---

### `docs/App-Fabrik/_archive/`

- **Subsystem:** App-Fabrik-Dokumentation
- **Zielrolle:** ZU_PRUEFEN
- **Dateien:** 1 Datei (README.md, 0 KB, leer)
- **Befund:** Archiv de facto leer — bewusster Platzhalter oder verwaister Ordner?
- **Drift-Risiko:** niedrig
- **Nächste Aktion:** SONDERFALL_PRUEFEN — Klärungsbedarf vor AP 7 oder AP 9

---

### `docs/design-system/archiv/`

- **Subsystem:** Design-System
- **Zielrolle:** LOKALER_KONTEXT + MAKING_OF_BELEG
- **Dateien:** 1 Datei (boxen-stress-test-referenz.html, 9 KB)
- **Inhalt:** Referenz-Stresstest aus der Design-System-Entwicklung
- **Kontextnähe:** sinnvoll — Stress-Test-Referenz bleibt nahe am Design-System-Kontext
- **Rohmaterial:** nein (HTML-Datei, kein Binary)
- **Drift-Risiko:** niedrig
- **README vorhanden:** ja (AP 7)
- **Nächste Aktion:** README_ANWENDEN + ROOT_REFERENZ_PRUEFEN

---

### `docs/spec/archiv/`

- **Subsystem:** Spec / Chart-Engine-Spezifikation
- **Zielrolle:** LOKALER_KONTEXT + MAKING_OF_BELEG
- **Dateien:** 4 Markdown-Dateien, 47 KB
- **Inhalt:** Spec-Versionen v1/v12/v13 für HTML-Karten und Ticks/Labels — Versionsgeschichte der Chart-Engine-Spec
- **Kontextnähe:** sinnvoll — Spec-Versionsgeschichte bleibt nahe an aktiver Spec
- **Rohmaterial:** nein
- **Drift-Risiko:** mittel — veraltete Spec-Versionen könnten bei versehentlichem Laden mit aktuellen Regeln verwechselt werden
- **README vorhanden:** ja (AP 7)
- **Pilotstatus:** Kandidat 1 (→ Pilotkandidaten)
- **Nächste Aktion:** README_ANWENDEN + PILOTKANDIDAT

---

### `docs/steering/archiv/`

- **Subsystem:** Projektsteuerung
- **Zielrolle:** LOKALER_KONTEXT + MAKING_OF_BELEG
- **Dateien:** 15 Dateien, 222 KB — größtes lokales Archiv
- **Inhalt:** AP-Übergaben, Implementierungspläne, Handoff-Prompts, Known-Issues-Geschichte, MEMORY-THEME-PHASE.md (28 KB)
- **Kontextnähe:** sinnvoll — operative Geschichte bleibt nahe am aktiven Steering-Pfad
- **Rohmaterial:** keine erkennbaren; MEMORY-THEME-PHASE.md (28 KB) auf LLM-Dump-Anteil prüfen
- **Drift-Risiko:** hoch — Handoff-Prompts, Implementierungspläne (AP-21-IMPLEMENTATIONSPLAN.md, 29 KB) und Übergabedokumente könnten operative Verwirrung stiften
- **README vorhanden:** ja (AP 7)
- **Nächste Aktion:** README_ANWENDEN (Priorität: hoch — wegen Drift-Risiko)

**Archivdateien in diesem Archiv:**

| Datei | Größe | Kuratierbarer Wert | Drift-Risiko | Empfohlener Status | Nächste Aktion |
|---|---|---|---|---|---|
| `docs/steering/archiv/AUFRAEUM-ANALYSE-ARCHIV.md` | 8 KB | mittel | mittel | POSTMORTEM | BELASSEN_UND_VERTRAG_ANWENDEN |
| `docs/steering/archiv/KNOWN-ISSUES-ARCHIV.md` | 8 KB | mittel | mittel | HIST | BELASSEN_UND_VERTRAG_ANWENDEN |
| `docs/steering/archiv/KNOWN-ISSUES-SCHLACHTPLAN-ARCHIV.md` | 79 KB | hoch | hoch | klären: ERSETZT oder POSTMORTEM | UNKLAR_PRUEFEN |

---

### `Archiv/optimierung-projektsteuerung/Optimierung Projektsteuerung/Archiv/`

- **Subsystem:** Root-Archiv (verschachtelt in Themeninsel)
- **Zielrolle:** LOCAL_QUARANTAENE + ZU_PRUEFEN
- **Dateien:** 2 Dateien — CLAUDE-pre-synthese-2026-05-03.md (20 KB) + NAVIGATION-pre-synthese-2026-05-03.md (7 KB)
- **LLM-Dump-Verdacht:** ja — beide Dateien sind LLM-Synthese-Exports
- **Kontextnähe:** unklar — Verschachtelung tief; fachlicher Kontext nicht sofort erkennbar
- **Nächste Aktion:** LOCAL_PRUEFEN — Inhalte nach `Archiv/local/` verschieben (gesonderter Schritt, nicht Teil von AP 6)

---

## local/-Quarantänen

### `Archiv/local/`

- **Zielrolle:** LOCAL_QUARANTAENE
- **Gitignored:** ✓ (`.gitignore`: `Archiv/local/`)
- **Dateien:** 203 Dateien, ≈31 MB
- **Unterordner (12):** Apps, Chart-Engine-Historie, Design, Historische Excel-Kalkulationen, optimierung-projektsteuerung, Peer Review Arbeitspakete, Peer Review Migration, Projekt Kontroll-Skills, Rechtliches, Refactoring des Gehirns, selbstlernenes System, Seminar - die Basis
- **Direktdatei:** `Start-Prompt Gemini.md` (3 KB) — LLM-Prompt, korrekt in local/
- **Befund:** Quarantäne funktioniert. Struktur spiegelt weitgehend Root-Archiv (historischer Befund aus ST-20/21). `Historische Excel-Kalkulationen/` und `Seminar - die Basis/` bestätigen Binär- und Rohmaterial-Verdacht.
- **Weiterer local/-Ordner:** keiner gefunden
- **Nächste Aktion:** BELASSEN_UND_VERTRAG_ANWENDEN — kein Handlungsbedarf

---

## Sonderfälle

### `archivliste.md`

- **Lage:** Projektroot
- **Zielrolle:** SONDERFALL
- **Warum Sonderfall:** Manuelle Archivorte-Liste mit absoluten Windows-Pfaden (`C:\Users\...`); entstanden vor dem Archivmodell; nicht portabel; durch `docs/steering/ARCHIV-INVENTAR.md` faktisch ersetzt
- **Behandlung:** LOESCHKANDIDAT_PRUEFEN — Albert entscheidet
- **Root-Archiv-Verweis:** nein — Datei dokumentiert keinen Prozess, sondern einen veralteten Zustand

---

### `docs/steering/BACKLOG-ARCHIV.md`

- **Lage:** Aktiver Steering-Pfad (nicht in archiv/)
- **Zielrolle:** SONDERFALL
- **Warum Sonderfall:** Operatives Artefakt mit Archivcharakter — wird von `/start` (Kassensturz) und Haiku-Dispatch direkt gelesen; kein reines Archiv
- **Behandlung:** BELASSEN_UND_VERTRAG_ANWENDEN — kein Handlungsbedarf; Archivvertrag gilt bereits implizit durch operative Einbindung
- **Root-Archiv-Verweis:** nicht nötig — bereits operativ eingebunden

---

### `Inhalte alte Site/blog/archiv/`

- **Lage:** `Inhalte alte Site/blog/archiv/`
- **Zielrolle:** SONDERFALL
- **Warum Sonderfall:** Gehört fachlich zur alten Website, nicht zum Projektarchiv-System; 1 leere Datei (page.md, 0 KB)
- **Behandlung:** SONDERFALL_PRUEFEN + LOESCHKANDIDAT_PRUEFEN — leerer Ordner, alter Website-Kontext; außerhalb der Archivstrategie
- **Root-Archiv-Verweis:** nein

---

## Pilotkandidaten

### Rangliste

**1. Bester Pilot: `docs/spec/archiv/`**
4 Dateien, 47 KB, klar abgegrenzt, hoher Kuratierwert, kein Rohmaterial, mittleres Drift-Risiko.
AP 9 kann direkt starten: README-Schablone anlegen, alle 4 Dateien mit Status `ERSETZT` markieren,
Nachfolger auf aktive Chart-Engine-Spec-Dateien in `docs/spec/` verweisen. Kein Verschieben nötig.

**2. Zweiter Kandidat: `Apps/prokrastinations-preis/Archiv/`**
2 Dateien, 6 KB, minimales Risiko, direkter APP-01-Bezug (Slice-0-Entstehung).
Gut als ergänzender Pilot oder unmittelbare Folgeinsel nach Kandidat 1.
README-Schablone anlegen, Making-of-Status setzen.

**3. Nicht geeignet als Pilot, aber später wichtig: `docs/steering/archiv/`**
15 Dateien, 222 KB, hohes Drift-Risiko, komplexe Inhaltstypen (Handoff-Prompts, 79-KB-Schlachtplan).
Wichtigster Kandidat für AP 7 README-Anwendung — aber zu groß und komplex für einen ersten Pilot.

### AP-9-Startbasis für `docs/spec/archiv/`

| Feld | Wert |
|---|---|
| Zielrolle | LOKALER_KONTEXT + MAKING_OF_BELEG |
| Dateien | 4 Markdown-Dateien, 47 KB |
| Status aller Dateien | ERSETZT — Nachfolger: aktive Chart-Engine-Spec-Dateien in `docs/spec/` |
| README-Schablone | aus `docs/steering/ARCHIV-STRATEGIE.md` |
| Nächste Aktion | README_ANWENDEN: lokales README mit Warnhinweis und ERSETZT-Verweis anlegen |
| Risiko | mittel — Verwechslungsgefahr mit aktiver Spec; README minimiert dieses Risiko |

---

## Offene Risiken

| Priorität | Risiko | Betroffener Ort | Folgepunkt |
|---|---|---|---|
| hoch | Drift-Risiko durch veraltete Pläne + Prompts | `docs/steering/archiv/` | AP 7: README mit Warnhinweis anlegen |
| hoch | 79-KB-Einzelartefakt mit ungeklärtem Status | `docs/steering/archiv/KNOWN-ISSUES-SCHLACHTPLAN-ARCHIV.md` | Status klären: ERSETZT oder POSTMORTEM (AP 7) |
| mittel | LLM-Dumps im Root-Archiv außerhalb local/ | `Archiv/optimierung-projektsteuerung/.../Archiv/` | LOCAL_PRUEFEN — vor AP 7 klären |
| mittel | Veraltete Spec-Versionen (Verwechslungsgefahr) | `docs/spec/archiv/` | AP 9: README mit ERSETZT-Status |
| niedrig | Veraltete Datei mit absoluten Pfaden im Root | `archivliste.md` | LOESCHKANDIDAT_PRUEFEN — Albert entscheidet |
| niedrig | Leere Archive ohne Klärung | `docs/App-Fabrik/_archive/`, `Inhalte alte Site/blog/archiv/` | SONDERFALL_PRUEFEN |
| niedrig | `Archiv/struktur.md` — Status unbekannt | `Archiv/struktur.md` | UNKLAR_PRUEFEN (AP 8 oder AP 9) |

---

## Folge-APs

| AP | Aufgabe | Voraussetzung |
|---|---|---|
| AP 7 | Lokale README-Schablone gezielt anwenden | legacy-map.md liegt vor ✅; nur dort anlegen, wo AP 6 empfiehlt |
| AP 8 | Root-Making-of-Rahmen vorbereiten | legacy-map.md liegt vor ✅; nur rahmen, nicht fertig erzählen |
| AP 9 | Pilotarchiv behandeln: `docs/spec/archiv/` | legacy-map.md + AP-9-Startbasis oben; ohne weitere Recherche startbar |

**Vor AP 7 klären:**
- `Archiv/optimierung-projektsteuerung/.../Archiv/` — LOCAL_PRUEFEN (LLM-Dumps nach `Archiv/local/` verschieben)
- `docs/App-Fabrik/_archive/` — SONDERFALL_PRUEFEN (leer oder Platzhalter?)
