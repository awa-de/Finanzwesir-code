Stand: 2026-07-17 | Session: AP-app-fabrik-04 | Geändert von: Claude

# AP-app-fabrik-04 — Mockup-Vertrag verbindlich festhalten

Status: **GRÜN** — die vier von Albert freigegebenen Klasse-C-Entscheidungen (E-01–E-04) sind im aktiven `MOCKUP-VERTRAG.md` festgehalten, die Startlinie ist minimal auf „entschieden" gesetzt; ein außerhalb des Write-Scopes liegender Folgekonflikt (Startlinie-Punkte 3/5 „Jury-Matrix" vs. E-02) ist dokumentiert, nicht gefixt.

---

## 0. Metadaten

| Feld | Wert |
|---|---|
| Datum | 2026-07-17 |
| Auftrag | Klasse-C-Entscheidungen E-01–E-04 verbindlich festhalten; aktiver Mockup-Vertrag + minimale Startlinien-Aktualisierung. Kein Mockup-Bau, keine APP_SPEC, keine Implementierung. |
| Repository / Branch / HEAD | `//NAS-DATENGRAB/Albert/Documents/Nextcloud/Finanzwesir 2.0` / master / `40b36bb` |
| Modell | Claude Opus 4.8 |
| Werkzeuge | Read, Edit, Write, Bash (nur `git status`) |

**Gelesene Pflichtquellen (10/10, vollständig):** `APP_FACTORY_STARTLINIE.md`, `AP-app-fabrik-01_…_Ergebnis.md`, `AP-app-fabrik-02_…_Ergebnis.md`, `AP-app-fabrik-03_…_Ergebnis.md`, `TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`, `STRUKTURELLE_SICHERHEIT_RISIKOGESTUFTE_QA.md`, `TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md`, `ARCHIV-STRATEGIE.md`, `CHRONIK-SPEZIFIKATION.md`, `tests/scratch/README.md` (Quellen 1–7 bereits aus AP-app-fabrik-03 im Kontext, hier für den Prinzipien-Check erneut herangezogen; 8–10 neu vollständig gelesen).

---

## 1. Getroffene Änderungen (genau 3 Dateien)

| Datei | Art | Inhalt |
|---|---|---|
| `docs/App-Fabrik/MOCKUP-VERTRAG.md` | **neu** | Aktiver Mockup-Vertrag, 10 Abschnitte nach Auftrags-Mindestinhalt; E-01–E-04 wörtlich verankert; verhandelt Baukasten/APP-INTERFACE nicht neu. |
| `docs/App-Fabrik/APP_FACTORY_STARTLINIE.md` | **minimal geändert** | Nur Punkt 2: von offener Entscheidung zu festgehaltenem Vertrag mit Verweis auf `MOCKUP-VERTRAG.md`. Kopf, Status, Geltung und Punkte 1, 3–14 unverändert. |
| `docs/steering/patches/AP-app-fabrik-04_mockup-vertrag-verbindlich_Ergebnis.md` | **neu** | Dieses Protokoll. |

**Verankerung der vier Entscheidungen im Vertrag:**

- **E-01 Datenfidelität** → `MOCKUP-VERTRAG.md` §4 (+ §3 Simulation): Simulation von Anbindung/Berechnung/Aktualität erlaubt; psychologisch wirksame Beweis-/Erlebnisbasis nicht erfindbar; lokaler Steuerungsblock bestimmt Fidelität; bei Echtdaten-Anforderung statische Quelle + Version benennen, keine Kopie, keine Live-Anbindung.
- **E-02 Wirkungsprüfung ohne Selbstzertifizierung** → §7: Vier-Kriterien-Prüfscore als einzige Skala; LLM nur Vorab-Selbstprüfung; Gegenmodell nur qualitativ, kein numerischer Score; Albert entscheidet; keine zweite Jury-Matrix, keine modellseitige Freigabe.
- **E-03 Wegwerfgrenze** → §6: Mockup-Code = Wegwerfartefakt (nur Happy Path, sichtbare Zustandswechsel, temporärer lokaler UI-Zustand); APP_SPEC übernimmt nur Verhalten/Gestaltung/Wirkungshypothese, niemals JS/Datenmodell/Modulstruktur/Schnittstellen/Bootstrapper/Architektur.
- **E-04 Werkstatt/Quellmanifest** → §9 (+ §10 Abgrenzung): Werkstatt `tests/scratch/<app-slug>/`, checker-/launcher-frei; Quellmanifest-Pflicht, keine rekursive Suche ohne Auftrag; Abschlussnotiz-Konzept als späterer Bedarfspunkt benannt, Skill und Zielordner ausdrücklich nicht gebaut/angelegt.

---

## 2. Rewrite-Vergleich `APP_FACTORY_STARTLINIE.md`

```
ENTFERNT (Punkt 2):
- „Mockup-Vertrag, Klasse C: Schutzgut, Knautschzone, Artefakte, Happy-Path-Grenze,
   Abnahme und Übergabe in die APP_SPEC verbindlich entscheiden; Gegenreview und Alberts Freigabe."
  (Formulierung als noch offene Entscheidung)

HINZUGEFÜGT (Punkt 2):
- „Mockup-Vertrag, Klasse C — ENTSCHIEDEN 2026-07-17: Schutzgut, Knautschzone, Artefakte,
   Happy-Path-Grenze, Abnahme und Übergabe sind verbindlich festgehalten in
   docs/App-Fabrik/MOCKUP-VERTRAG.md (E-01 Datenfidelität, E-02 Wirkungsprüfung ohne
   Selbstzertifizierung, E-03 Wegwerfgrenze, E-04 Werkstatt/Quellmanifest; Alberts Freigabe)."

BEGRÜNDUNG:
- Nur Punkt 2 wechselt vom Status „offene Entscheidung" zu „festgehaltener Vertrag" (Arbeitsregel 4).
- Kopf, Status, Geltung und alle anderen Punkte (1, 3–14) bleiben wortgleich — keine Vollneufassung.
- Der „Gegenreview"-Teil entfällt in Punkt 2, weil die Abnahmerollen jetzt vollständig in E-02 /
   MOCKUP-VERTRAG.md §7 geregelt sind (Vermeidung einer zweiten, konkurrierenden Regel).
```

Stand-Zeile der Startlinie (2026-07-15) **bewusst nicht** geändert: Sie ist nicht `docs/steering/`, die CLAUDE.md-Stand-Pflicht greift formal nicht; und der Kopf trägt „wird nur nach realem Befund oder bewusster Produktentscheidung geändert" — die Datumsangabe steht bereits im neuen Punkt-2-Text. Kein zweites Datum erzeugt, um keine Divergenz zu stiften. *(Falls Albert die Kopf-Stand-Zeile mitgeführt haben will: Einzeiler-Nachtrag, Klasse A.)*

---

## 3. Prinzipien-Check: keine stille Umdefinition

| Geprüft | Ergebnis |
|---|---|
| **Chronik** (`CHRONIK-SPEZIFIKATION.md`) | Unberührt. `MOCKUP-VERTRAG.md` §9 stellt ausdrücklich fest: Werkstatt-Abschlussnotiz ist **kein** Ersatz für eine Chronik; Chroniken bleiben Gesprächsfaden-Chroniken in `Archiv/Chroniken/`. Keine Chronik-Datei, kein Chronik-Prompt, keine Frontmatter-Liste geändert. |
| **Archivstrategie** (`ARCHIV-STRATEGIE.md`) | Unberührt. Der künftige Ort `Archiv/Werkstatt-Abschlussnotiz/` ist als **Konzept/späterer Bedarfspunkt** benannt, nicht als neuer Archivvertrag eingeführt und nicht angelegt. Föderiertes Modell, Statuswerte und Nachfolgerregel bleiben die alleinige Quelle. |
| **Werkstatt vs. dauerhafter Testbestand** (`tests/scratch/README.md`, `TEST_PAGE_STANDARD.md` §1.4/§12.1) | Konsistent. `tests/scratch/` ist bereits als checker-/launcher-freie Wegwerf-Werkstatt definiert; E-04 fügt sich ohne Widerspruch ein. Kein Standardort und keine Checker-Regel verändert. |
| **Baukasten / APP-INTERFACE** | Nicht neu verhandelt (Vertrags-Kopf sagt das explizit). Keine Tailwind-/CDN-Entscheidung berührt. |
| **Selbstzertifizierungs-Verbot** (`STRUKTURELLE_SICHERHEIT` §8.5) | Im Vertrag §7 gewahrt: erstellendes LLM nur Vorab, Albert nimmt ab. |

---

## 4. Verbleibende spätere Bedarfspunkte (gemeldet, nicht ausgeführt)

1. **Startlinie-Punkte 3 und 5 kollidieren mit E-02.** Punkt 3 nennt eine zu bauende „Jury-Matrix", Punkt 5 lässt Perplexity „mit der Jury-Matrix" bewerten. E-02 hebt beides auf: keine zweite Jury-Matrix, Gegenmodell nur qualitativ, kein numerischer Score. **Nicht hier gefixt** — außerhalb des auf Punkt 2 begrenzten Write-Scopes (Arbeitsregel 4). Empfohlener Minimal-Fix (Klasse A, eigener AP): in Punkt 3 „Jury-Matrix" streichen bzw. durch „qualitative Gegenkritik-Leitfrage (E-02)" ersetzen; in Punkt 5 „mit der Jury-Matrix" durch „qualitativ entlang der vier Prüffragen, ohne Score (E-02)" ersetzen. Auch Punkt 3 „`mockup.html`-Template" ist gegen die Wegwerfgrenze (E-03) und den Werkstattort (E-04) zu prüfen.
2. **AP-app-fabrik-03 E-05 (Revisionstakt) ist nicht unter Alberts vier Entscheidungen.** Der Vorschlag „verpflichtende Vertragsrevision nach dem dritten Mockup-Durchlauf" wurde nicht freigegeben und daher **nicht** in den Vertrag aufgenommen. Offen, ob gewünscht.
3. **Werkstatt-Abschluss-Skill + Ordner `Archiv/Werkstatt-Abschlussnotiz/`** — eigener Bedarfspunkt, hier bewusst nicht gebaut/angelegt (E-04).
4. **Numerierungs-Hinweis:** Alberts E-01–E-04 (dieser AP) sind nicht deckungsgleich mit der E-01–E-05-Nummerierung der Vorlage AP-app-fabrik-03. Maßgeblich sind die E-Labels dieses AP; der Vertrag folgt ihnen.

---

## 5. Scope- und Wahrheits-QA

- **Git-Status nach Write:** genau die drei erlaubten Dateien neu/geändert; die vorbestehenden untracked/geänderten Einträge (`APP_FACTORY_STARTLINIE.md` war bereits vor dieser Session untracked, AP-01/02/03-Ergebnisse, Boomer-Dateien u. a.) unverändert. Keine App-, Theme-, Engine-, Produktions-, Test- oder bestehende Spec-Datei berührt. Kein Ordner unter `Apps/`, `tests/scratch/`, `Archiv/` angelegt. Kein Skill. Kein Commit.
- **Alle drei Zieldateien nach dem Write vollständig vom Datenträger neu gelesen** (Klasse-C-Pflicht, `TAKTISCHER_STARTPROMPT` §6): Inhalt entspricht dem beabsichtigten Stand, kein Kopf-/Body-Auseinanderlaufen.
- **Body-QA Startlinie:** Punkt 2 trägt den neuen Vertragsverweis; kein Alt-Text „verbindlich entscheiden … Gegenreview" mehr in Punkt 2 vorhanden; übrige Punkte unverändert.
