# App-Ordner-Struktur — Kanonische Dateiliste
Stand: 2026-05-10

Jeder App-Ordner `/Apps/{slug}/` folgt dieser Struktur.
Verbindlich nach Pilot-1 + Alberts expliziter Freigabe (→ `03_APP_FACTORY_STANDARD_DRAFT.md` §5, Offen-Frage F-03).

---

## Dateien nach Phase

**Phase 0 — Angelegt (AF-10-Muster)**
- `MINI_SPEC_FROM_HAUPTDOKUMENT.md` — Original-Briefing aus ETF-Apps-Hauptdokument.md

**Phase 1 — Spec-Gate-reif**
- `APP_SPEC.md` — technische Spec: Ghost-Card-Vertrag, Inputs/Outputs, States, A11y, Testfälle

**Phase 2 — Implementierung**
- `app.js` — dünne app-spezifische Logik (kein Shell-Code, kein fw-* überschreiben)
- `app.css` — app-spezifische Styles
- `app.test.html` — lokale Entwicklungs- und Testseite
- `ghost-card.example.html` — copy-paste-fertige Ghost-Card für Redakteure

**Optional / nach Bedarf**
- `README.md` — App-Briefing für Menschen (Zweck, Inputs, Outputs, Annahmen)
- `NOTES.md` — Entwicklungsnotizen, offene Fragen, Prototypen-Verweise
- `app.config.json` — Texte, Defaults, Slider-Grenzen (wenn aus app.js ausgelagert)

**App-spezifische Review-Artefakte**
- `[Tool]-[slug]-[typ].md` — z.B. `Perplexity-prokrastinations-preis_spec-review.md`

---

## Was NICHT in den App-Ordner gehört

- Allgemeine RFC-Dokumente → `docs/App-Fabrik/APP_FACTORY_IMPLEMENTATION_RFC.md`
- Allgemeine externe Reviews zum RFC → `docs/App-Fabrik/_working/implementation-rfc/`
- Externes Rohmaterial (Demo-Templates, Architekturvorschläge) → `docs/App-Fabrik/_input/`
