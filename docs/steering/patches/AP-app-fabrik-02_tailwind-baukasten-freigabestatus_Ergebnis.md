# AP-app-fabrik-02 — F-01 Tailwind-Baukasten: Freigabestatus

## 0 Metadaten

- Datum: 2026-07-17
- Auftrag: Klärung von F-01 aus `AP-app-fabrik-01_mockup-track-anamnese_Ergebnis.md` — ist `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` für den Mockup-Track verbindlich freigegeben, nur Pilotstandard oder noch Entwurf? Klasse-B-Analyseauftrag, keine dauerhafte Produkt-/Architekturentscheidung.
- Gelesene Pflichtquellen: `docs/steering/patches/AP-app-fabrik-01_mockup-track-anamnese_Ergebnis.md`; `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` (vollständig, bereits aus AP-app-fabrik-01 im Kontext); `docs/App-Fabrik/APP_FACTORY_STARTLINIE.md` (vollständig, bereits aus AP-app-fabrik-01 im Kontext)
- Weitere geprüfte Evidenz: `NAVIGATION.md`; `docs/steering/BACKLOG.md` (DS-014); `.claude/memory/project_ci_theme_bridge.md`; `.claude/memory/project_chartengine_chrome_migration.md`; `docs/design-system/README.md`; `.claude/learning/session-log-archiv/session-log-2026.md` (Einträge 2026-07-12); `docs/steering/patches/AP-tailwind-02a_play-cdn-vertrag-repo-sync_Ergebnis.md` (inkl. Nachtrag AP-tailwind-02b); `PROJECT-STATUS.md`; `docs/App-Fabrik/01_DECISION_LOG.md` (Suche ohne direkten Treffer zum Gesamtstatus)

---

## Kurzurteil

`F-01 ist geklärt: Das Konzeptdokument wurde am 2026-07-12 real freigegeben (Session-Log-Abschluss-Ritual „AP-tailwind-01 → Fable-Runde", PROJECT-STATUS.md-Synchronisierung „Baukasten V0.1 freigegeben", Memory-Update `project_ci_theme_bridge.md`), und diese Freigabe wird seither durchgehend in NAVIGATION.md (2×) und BACKLOG.md (DS-014) als aktueller Status geführt.` Das Dokument wurde seit der Freigabe real und mehrfach als bindender Vertrag verwendet — für die vollständige Tailwind-Pilotmigration `AP-tailwind-02` (alle 8 Slices + 02a/02b/02f, browserabgenommen) und für das gesamte Chart-Chrome-Programm `AP-chart-engine-01` CE-1–CE-6a. Die Fußzeile des Dokuments („ENTWURF, NICHT FREIGEGEBEN") und §12 Punkt 1 („Gesamtabnahme … offen") sind Restformulierungen aus der Fable-Entwurfsphase, die nach der Freigabe vom 2026-07-12 nicht mehr nachgezogen wurden — ein Dokumentationsdrift, kein aktiver offener Entscheidungspunkt. Für den Mockup-Track ist der Freigabestatus damit fachlich ausreichend geklärt, ohne dass Albert hier neu entscheiden müsste.

---

## Evidenzmatrix

| Quelle | Statusaussage | Autorität / Datum | Geltungsbereich | Widerspruch? |
|---|---|---|---|---|
| `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`, Zeile 5 (Kopf) | „Status: FREIGEGEBEN durch Albert am 2026-07-12 — verbindlicher Design- und Implementierungsvertrag der App-Fabrik. KEIN PRODUKTIONSCODE." | Dokument selbst, Stand-Zeile 2026-07-15 | Gesamtes Konzept V0.1 | mit Zeile 545/§12 |
| `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`, Zeile 545 (Fußzeile) | „Ende V0.1 — ENTWURF, NICHT FREIGEGEBEN. Nächster Schritt: Abnahme von Konzept + Visual Board …" | Dokument selbst, gleicher Stand | Gesamtes Konzept V0.1 | mit Zeile 5 |
| `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` §12 Punkt 1 | „Gesamtabnahme dieses Konzepts + Visual Boards (deckt … D-01, D-02-Details, D-03, D-05, D-06, D-07, D-08, D-09, D-11, D-13 ab …)" als offene Nutzerentscheidung gelistet | Dokument selbst, gleicher Stand | Gesamtes Konzept V0.1 | mit Zeile 5 |
| `.claude/learning/session-log-archiv/session-log-2026.md` Zeile 248–262 | „AP-tailwind-Fable-Runde ✅ … Übergabe: Konzeptphase (Fable) beendet, Pilotmigration geht an Sonnet" + „Abschluss-Ritual AP-tailwind-01 → Fable-Runde ✅ (Voll-Abschluss)" + „PROJECT-STATUS.md: Fokus … auf „Baukasten V0.1 freigegeben, AP-tailwind-02 … ist nächster Schritt" synchronisiert" | Session-Log, 2026-07-12, von Claude protokollierter realer Albert-Vorgang | Freigabeereignis des gesamten Konzepts | keiner — bestätigt Zeile 5 |
| `NAVIGATION.md` Zeile 129 und Zeile 160 | „TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md ← App-Fabrik-Primitiven/Struktur (FREIGEGEBEN 2026-07-12, verbindlicher Vertrag)" (2× wortgleich in zwei Lesepfaden) | NAVIGATION.md, aktueller Routing-Layer (Priorität 5 laut CLAUDE.md) | Gesamtes Konzept als Primitiven-/Struktur-Quelle | keiner — bestätigt Zeile 5 |
| `docs/steering/BACKLOG.md` Zeile 36 (DS-014) | „Grundlage FREIGEGEBEN 2026-07-12: TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md — prüfen, ob 07-APP-KOMPONENTEN.md damit erfüllt oder nur noch Formalisierung ist" | BACKLOG.md, aktuelle zentrale Steuerung | Gesamtes Konzept als Grundlage für DS-014 | keiner — bestätigt Zeile 5 |
| `.claude/memory/project_ci_theme_bridge.md` (Session-Log-Beleg, Zeile 261 im Archiv) | „`.claude/memory/project_ci_theme_bridge.md` aktualisiert: Baukasten V0.1 als neuer stabiler Vertrag ergänzt" | Memory-Update 2026-07-12 | Gesamtes Konzept als stabiler Projektfakt | keiner — bestätigt Zeile 5 |
| `docs/steering/patches/AP-tailwind-02a_play-cdn-vertrag-repo-sync_Ergebnis.md` §3 Punkt 2 | Nur der CDN-spezifische Kopf-Absatz („Arbeitsannahme (markiert, reversibel)") wurde zu „Entschieden (AP-tailwind-02a)" geändert, mit Rückverweis in §12 — **nicht** die Gesamtabnahme-Frage aus §12 Punkt 1 | Patch-Quittung, 2026-07-13, Sonnet | Nur die Play-CDN-Ladeentscheidung (A-04), nicht das Gesamtkonzept | keiner — anderer Geltungsbereich als F-01 |
| `PROJECT-STATUS.md` Zeile 33–34 | Baukasten-Bezug ausschließlich über bereits abgeschlossene, committete Einzel-APs (DOC-01, DOC-02/02a) — keine erneute Infragestellung des Gesamtstatus | Aktuelle Tageslage, Stand 2026-07-15 | Einzelentscheidungen innerhalb des Konzepts | keiner |
| `docs/design-system/README.md` Zeile 22–23 | Führt das Konzept als geltende Struktur-/Primitiven-Quelle ohne Statuseinschränkung | Aktuelle Statuskarte | Struktur-/Primitivenvokabular | keiner |

---

## Einordnung

- **Status für den Mockup-Track:** Operativ freigegeben. Das Rezeptbuch (§6 Primitive-Verträge) gilt als verbindliches Klassenvokabular; kein Mockup muss auf eine erneute Gesamtabnahme warten.
- **Status für technische Produktion:** Ebenfalls freigegeben als Vertrag, aber ausdrücklich „KEIN PRODUKTIONSCODE" (Dokumentkopf) — die technische Umsetzung jeder Einzelentscheidung läuft weiterhin über eigene APs mit eigenem Gate (wie bereits bei AP-tailwind-02 und AP-chart-engine-01 praktiziert).
- **Bedeutung für Startlinie Punkt 2:** Punkt 2 („Mockup-Vertrag, Klasse C") darf beginnen. Er entscheidet Schutzgut, Knautschzone, Artefakte, Happy-Path-Grenze, Abnahme und Übergabe für den *Mockup-Track* — das ist ein neuer, engerer Entscheidungsgegenstand, unabhängig vom bereits geklärten Grundsatzstatus des Konzepts.
- **Was nicht erneut entschieden werden muss:** Ob das Baukasten-Konzept V0.1 als Ganzes gilt (ja, seit 2026-07-12), ob seine Primitive/Rezepte (§6) nutzbar sind (ja), und ob einzelne bereits getroffene Teilentscheidungen (D-01–D-16, DOC-01–DOC-04a) noch offen sind (nein, real umgesetzt und browserabgenommen in CE-1–CE-6a).

---

## Kleinste nötige Folgehandlung

**A — keine Änderung nötig; Punkt 2 darf beginnen.**

Begründung: Fünf voneinander unabhängige, aktuell gepflegte Quellen (Session-Log-Abschlussritual, PROJECT-STATUS.md-Historie, Memory, NAVIGATION.md zweifach, BACKLOG.md) sowie der reale, zweifach abgeschlossene Nutzungsnachweis (AP-tailwind-02-Kette, AP-chart-engine-01-Kette) stützen den Freigabestatus übereinstimmend. Die widersprüchliche Fußzeile/§12-Passage im Konzeptdokument selbst ist zwar ein echter, dokumentierter Dokumentationsdrift (siehe `AP-app-fabrik-01` F-01), aber kein Hinweis auf eine tatsächlich fehlende Freigabe — sie wurde schlicht nicht nachgezogen, als das Präzisierungsmuster (wie bei AP-tailwind-02a für den CDN-Kopf-Absatz oder bei DOC-02a für §10) hätte greifen sollen.

**Empfehlung (nicht Teil dieses APs, keine Ausführung hier):** Bei nächster Gelegenheit die Fußzeile und §12 Punkt 1 in `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` nach demselben Muster wie AP-tailwind-02a/DOC-02a präzisieren — z. B. „Gesamtabnahme erfolgt 2026-07-12, seither operativ bindend; Einzelentscheidungen siehe D-01–D-16/DOC-01–DOC-04a" statt „ENTWURF, NICHT FREIGEGEBEN". Kleinster möglicher Change: zwei Textstellen (Fußzeile + §12 Punkt 1), keine inhaltliche Änderung an Rezepten oder Entscheidungen. Diese Empfehlung blockiert Startlinie Punkt 2 nicht.

---

## Nicht Gegenstand dieses AP

- Kein Mockup gebaut.
- Kein Psychosprint-Prompt geschrieben.
- Keine Komponentenbibliothek entworfen.
- Keine APP_SPEC erstellt.
- Keine Modellentscheidung getroffen.
- Keine Tailwind- oder CDN-Entscheidung neu geöffnet.
- Keine Quelldokumentation (insbesondere nicht `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`) umgeschrieben oder Statusmarker selbst geändert — die oben genannte Präzisierung ist nur Empfehlung, nicht Ausführung.

---

## Belegstellen

- `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md:5` (Kopf-Status FREIGEGEBEN 2026-07-12)
- `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md:545` (Fußzeile ENTWURF, NICHT FREIGEGEBEN)
- `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md` §12 Punkt 1 (offene Nutzerentscheidung „Gesamtabnahme")
- `.claude/learning/session-log-archiv/session-log-2026.md:248-262` (Fable-Runde-Abschluss + Abschluss-Ritual AP-tailwind-01, 2026-07-12, PROJECT-STATUS/Memory-Sync-Beleg)
- `NAVIGATION.md:129` und `NAVIGATION.md:160` (FREIGEGEBEN 2026-07-12, verbindlicher Vertrag)
- `docs/steering/BACKLOG.md:36` (DS-014: „Grundlage FREIGEGEBEN 2026-07-12")
- `docs/steering/patches/AP-tailwind-02a_play-cdn-vertrag-repo-sync_Ergebnis.md` §3 Punkt 2, Zeile 61–64 (Präzisierungsmuster für einen anderen, engeren Geltungsbereich — Play-CDN-Kopf-Absatz, nicht Gesamtabnahme)
- `PROJECT-STATUS.md:33-34` (aktuelle Baukasten-Bezüge ausschließlich über abgeschlossene Einzel-APs)
- `docs/design-system/README.md:22-23` (Konzept als geltende Struktur-/Primitivenquelle ohne Einschränkung)
- `docs/steering/patches/AP-app-fabrik-01_mockup-track-anamnese_Ergebnis.md` Abschnitt 9, F-01 (ursprünglicher Fund, hier geklärt)

---

## Chat-Antwort

```text
AP-app-fabrik-02 — F-01 Freigabestatus

Status: GRÜN
Ergebnisdatei: docs/steering/patches/AP-app-fabrik-02_tailwind-baukasten-freigabestatus_Ergebnis.md
Urteil: F-01 ist geklärt — das Konzept wurde real am 2026-07-12 freigegeben (Session-Log, PROJECT-STATUS, Memory, NAVIGATION.md ×2, BACKLOG.md DS-014 stimmen überein, zweifach real als Vertrag genutzt in AP-tailwind-02 und AP-chart-engine-01); die widersprüchliche Fußzeile/§12-Passage ist unnachgezogener Dokumentationsdrift, kein offener Entscheidungspunkt.
Nächster zulässiger Schritt: Startlinie Punkt 2 (Mockup-Vertrag, Klasse C) darf beginnen.
Ausdrücklich nicht der nächste Schritt: Mockup bauen, Psychosprint-Prompt schreiben, Komponentenbibliothek entwerfen, APP_SPEC erstellen, Modellentscheidung treffen, Konzeptdokument selbst korrigieren.

Patch-Quittung
- Geänderte Dateien: genau 1 — docs/steering/patches/AP-app-fabrik-02_tailwind-baukasten-freigabestatus_Ergebnis.md
- Scope-QA: grün
- Datei nach Write real wiedergelesen: ja
- Produktions-, Test-, App-, Theme-, Engine- und Spec-Code unverändert: ja
```
