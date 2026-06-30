# APP_FABRIK_ANAMNESE_MATERIAL — regulatorik-dashboard

Stand: 2026-06-30
Quelle: AP-14c Wissenssicherung aus `CLAUDE.md`

## Zweck dieser Datei

Diese Datei sammelt historisches und konzeptionelles Material für die spätere App-Fabrik-Anamnese.
Sie ist **keine MINI_SPEC**, **keine APP_SPEC** und **kein Steuerungsblock**.
Sie trifft keine technischen Entscheidungen und enthält keine verbindlichen Spezifikationen.

Ihr Zweck: Konservieren, was aus der gewachsenen Vorgeschichte für spätere APs relevant ist,
ohne dass diese Datei selbst als aktive Claude-Steuerregel wirkt.

---

## Aktueller Arbeitsname und App-Kern

- Ordner: `Apps/regulatorik-dashboard/`
- Gewachsener App-Kern: Wie Regulatorik, Steuern und politische Eingriffe die Rendite mindern —
  real, aber planbar.
- Funnelposition: Systemkritische Einwände (G1)
- Aktuelles Mockup / Story-Artefakt: `etf-wahlurnen-rechner.html`

---

## Gesicherte Hinweise aus CLAUDE.md (historisch, Stand Mockup-Phase)

### Hauptartefakt der Mockup-Phase

Aus der lokalen `CLAUDE.md` (Stand Mockup-Phase, nicht mehr aktiv):

> `etf-wahlurnen-rechner.html` (~960 Zeilen) war die einzige produktive Datei —
> eine single-file HTML-App für Ghost.io.

Einordnung heute: Das ist ein funktionsfähiger **Prototyp / Story-Artefakt**, kein App-Fabrik-Artefakt.
Technisch nicht verbindlich. Nicht als Vorlage für APP_SPEC-Architekturentscheidungen verwenden.

### Spec-Master der Mockup-Phase

Aus der lokalen `CLAUDE.md`:

> `Bauprompt_ETF-Wahlurnen-Super-App_Master_Obsidian.md` (v5.0) war die verbindliche
> Zielbeschreibung der Mockup-Phase. Bei Konflikten zwischen diesem und älteren Versionen
> galt der Master-Prompt.

Versionshierarchie der Bauprompts:
```
Chat-GPT_Super-App_Bauprompt (früh, extern)
  → V3
    → V4
      → Master_Obsidian.md (v5.0, maßgeblich für Mockup-Phase)
Perplexity_super-app-prompt.md (externe Parallelvariante, nicht Hauptlinie)
```

Einordnung heute: Der Master-Prompt ist **Primärquelle für APP_SPEC-Anamnese** (AP-14g).
Er ist kein aktiver technischer Vertrag, aber die inhaltlich reichste Vorarbeit.

### Nicht mehr gültiger Alt-Workflow

Die lokale `CLAUDE.md` beschrieb einen ad-hoc Workflow:

> Nutzer erstellt Feedback-Datei → Claude liest → Änderungen direkt in HTML.

Dieser Workflow gilt **nicht mehr**.
App-Fabrik-Arbeitsweise mit Gate (Light/Full) und APP_SPEC hat Vorrang.
Direktes HTML-Editieren ohne Gate ist nur nach expliziter Freigabe und Gate zulässig.

### Weitere inhaltliche Primärquellen im Ordner

Für spätere APs relevant (nicht hier ausschlachten):

| Datei | Inhalt | Ziel-AP |
|---|---|---|
| ETF-Wahlurnen-App-Abschlussdokumentation_V2.md | These S0–S3, Narrativ, Rechenmodell, verifizierte Zahlen | AP-14e (MINI_SPEC) + AP-14g (APP_SPEC) |
| UX-Synthese-LLM-Bewertungen-Iteration-1.md | Konsolidiertes UX-Brief für Iteration 2 | AP-14g (APP_SPEC §UX) |
| Bauprompt_ETF-Wahlurnen-Super-App_Master_Obsidian.md | Vollständige Mockup-Spec v5.0 | AP-14g (APP_SPEC §Architektur, §Rechenmodell) |

---

## Spätere Auswertungspunkte

### Für MINI_SPEC / Seed (AP-14e, AP-14f)

- App-Kern klären: "ETF-Wahlurnen" ist Mechanik, nicht Identität.
  Identität = Renditeminderung durch Regulatorik — real aber planbar.
- Barriere: Regulatorische Eingriffe fühlen sich unkontrollierbar an → lähmen.
- Zielzustand: Nutzer versteht das Risiko, kann es einplanen, bleibt bei der Strategie.
- Kernbotschaft aus MINI_SPEC (Rohfassung, zu prüfen):
  "Das Risiko ist real. Aber es zerstört nicht deine Strategie — nur die Details."
- Szenario-Matrix (aus MINI_SPEC-Rohfassung) prüfen:
  Moderate Detailänderung / Steuerliche Verschlechterung / Starker polit. Eingriff / Systembruch
- Warnung aus UX-Synthese: "Vertrauens-Risiko durch politisches Framing" (nur ChatGPT) —
  als Nicht-Ziel in MINI_SPEC adressieren.
- App-Titel überdenken: "Regulatorisches Risiko Dashboard" ist möglicherweise zu technisch.

### Für APP_SPEC (AP-14g)

- Steuerszenarien S0–S3 aus Abschlussdokumentation und HTML-Mockup ableiten.
- Rechenmodell aus Abschlussdokumentation übernehmen (verifizierte Zahlen, 200 €/Monat, 25 Jahre).
- "Wahlurnen-Modus" als UX-Mechanik prüfen: Ist er Identität oder nur Mechanik-Umsetzung?
- Farbkodierung S0 teal / S1 blau / S2 amber / S3 rot: UX-Konsistenz mit anderen Apps prüfen.
- UX-Konsens aus UX-Synthese in APP_SPEC §UX einarbeiten:
  Chart zeigt zu viel / Responsivität / Modus-Naming technisch.

### Für DEV/QA (bereits in DEV_QA_NOTIZEN.md)

- Technische Constraints: Single HTML, kein Server, Chart.js via CDN.
- Regressions-Checkliste nach Chart/Layout-Änderungen.
- Token-Sparhinweise.
