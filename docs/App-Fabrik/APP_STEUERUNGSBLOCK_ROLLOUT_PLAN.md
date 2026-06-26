# App-Steuerungsblock-Rollout-Plan

Stand: 2026-06-26
Status: Vorschlagsliste nach AP-05
Basis: `docs/App-Fabrik/APP_STEUERUNGSBLOCK_INVENTORY.md`

## Zweck

Dieser Plan legt die Reihenfolge fest, in der lokale Steuerungsblöcke in die App-Specs eingebaut oder aus Mini-Specs vorbereitet werden.

Der Plan formuliert keine Steuerungsblöcke. Er priorisiert nur den Einbau.

## Ausgangslage

- Apps gesamt: 25
- GRÜN: 0
- GELB: 24
- ROT: 1
- UNKLAR: 0

Kurzbefund:

- Kein expliziter Steuerungsblock in keiner App vorhanden.
- `prokrastinations-preis` ist Musterkandidat: einzige App mit bestehender APP_SPEC.md, mit steuerungsblock-relevantem Material.
- `etf-vergleich` hat reichstes Mini-Spec-Material (Kernbotschaft + Problem + explizite Nicht-Ziele).
- `plan-generator` ist ROT: kein nutzbares Material, fachliche Klärung nötig.

## Rollout-Prinzip

1. Erst ein Muster sauber einbauen.
2. Muster prüfen, bevor Batches starten.
3. Batches nach Rohmaterial-Qualität, nicht nach App-Name.
4. ROT-Fälle nicht erzwingen — kein Steuerungsblock aus dünnem Material erfinden.
5. Klärungsbedarf kennzeichnen, nicht überspringen.

## Empfohlene Reihenfolge

### AP-08 — Muster-Einbau: prokrastinations-preis

Ziel:

- Steuerungsblock als eigenen Abschnitt in bestehende APP_SPEC.md nachtragen.
- Material aus APP_SPEC §2 und §23 nutzen (Zweck, Nutzerfrage, Entscheidungspsychologie).
- Ergebnis dient als Muster für alle Batch-APs.

Warum zuerst:

- Einzige App mit bestehender APP_SPEC — kleinster Strukturbruch.
- APP_SPEC-Workflow ist bekannt, kein neues Tooling nötig.
- Muster vor Batches verhindert Korrekturgaleere über 24 Apps.

Einbauform: Steuerungsblock als neuer Abschnitt in APP_SPEC.md (nach AP-03-Template).

Nicht-Ziel: Keine anderen Apps anfassen.

---

### AP-09 — Muster-Review und Template-Schärfung

Ziel:

- Prüfen, ob der eingebaute Steuerungsblock als Muster taugt.
- Prüfen, ob AP-03-Template ausreichend praktisch ist oder Schärfung braucht.
- Lücken oder Klärungspunkte im Template dokumentieren.

Nicht-Ziel: Keine Batch-Arbeit, keine weiteren Apps.

---

### AP-10 — Batch A: Mini-Specs mit Kernbotschaft + Problem (14 Apps)

Kriterium: Rohmaterial-Klasse „Kernbotschaft + Problem" — reiches Material, Steuerungsblock gut ableitbar.

Apps:

- crash-reaktions-test
- depot-kipppunkt
- der-alte-euro
- diversifikations-detektor
- etf-aera-vorbei
- etf-namensdecoder
- geburtsjahrlos
- investment-universum
- komplexitaets-entlarver
- market-timing-simulator
- markt-kam-zurueck
- rendite-kalibrierung
- risiko-uebersetzer
- weltkarte-etf-indizes

Einbauform:

- Vorläufige Steuerungsblöcke aus Mini-Spec ableiten.
- Unsicherheiten kennzeichnen, keine Erfindungen.
- Batching sinnvoll: 3–5 Apps je Sub-AP, oder Block-Auftrag falls App-Spec-Tooling dies trägt.

Offene Frage vor AP-10: Einzeln je App oder gebündelt in einem AP? → Klärung mit Albert vor Start.

---

### AP-11 — Batch B: Mini-Specs nur mit Kernbotschaft (8 Apps)

Kriterium: Rohmaterial-Klasse „Kernbotschaft" — dünneres Material, Barriere und Nicht-Ziele häufig unklar.

Apps:

- esg-spiegel
- kostenkiller-ter
- regulatorik-dashboard
- renditekiller-volatilitaet
- replizierer-swapper
- rollierende-sparplaene
- thesaurierer-rennen
- weltdepot-baukasten

Einbauform:

- Vorsichtiger vorläufiger Steuerungsblock aus Kernbotschaft.
- Barriere und Nicht-Ziele häufig als `[Klärungsbedarf]` markieren.
- Kein Erfinden von Zweck oder Barriere aus dem App-Namen.

---

### AP-12 — Sonderfall: etf-vergleich

Ziel:

- Separat behandeln, weil reichstes Material unter GELB-Apps.
- Explizite Nicht-Ziele aus Mini-Spec als Nicht-Ziele im Steuerungsblock nutzen.
- Kann als Qualitäts-Benchmark für Batch A dienen.

Timing: Kann vor oder nach AP-10 platziert werden — Entscheidung vor AP-10.

---

### AP-13 — ROT-Fall: plan-generator

Status: Gesperrt bis fachliche Klärung mit Albert.

Klärungsfragen:

- Wofür existiert diese App?
- Welche Barriere soll sie beim Leser entfernen?
- Was darf sie ausdrücklich nicht tun?
- Bleibt sie Teil der App-Fabrik oder wird sie gestrichen / verschoben?

Nicht starten, bevor alle vier Fragen beantwortet sind.

---

## Batch-Übersicht

| AP | Inhalt | Anzahl Apps | Rohmaterial | Einbauform | Risiko |
|---|---|---:|---|---|---|
| AP-08 | Muster-Einbau prokrastinations-preis | 1 | APP_SPEC vorhanden | Steuerungsblock in APP_SPEC nachtragen | gering |
| AP-09 | Muster-Review + Template-Schärfung | — | — | Review, kein Einbau | gering |
| AP-10 | Batch A: Kernbotschaft + Problem | 14 | reich | vorläufig ableiten | mittel |
| AP-11 | Batch B: nur Kernbotschaft | 8 | dünn | vorsichtig, Lücken markieren | höher |
| AP-12 | Sonderfall etf-vergleich | 1 | reichstes Material | separat ausarbeiten | mittel |
| AP-13 | ROT-Fall plan-generator | 1 | fehlt | Klärung mit Albert zuerst | hoch |

## Nicht-Ziele dieses Plans

- keine Steuerungsblöcke formuliert
- keine App-Specs geändert
- keine Mini-Specs geändert
- keine fachliche Neubewertung der App-Liste
- keine Priorisierung nach Business Value
- keine Implementierungsplanung
- keine Commit-Message

## Nächster Schritt

AP-08 — Muster-Einbau `prokrastinations-preis`.
