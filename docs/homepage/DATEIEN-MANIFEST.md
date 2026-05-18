# Dateien-Manifest

Dieses Manifest beschreibt die bereinigte Struktur der Homepage-Werkstatt.

Alle Dateien liegen bewusst unter:

```text
docs/homepage/
```

Die spätere Ghost-Template-Arbeit ist ein eigener Task. Diese Werkstatt führt bis zu einer lokal testbaren statischen HTML-Seite.

---

## 1. Einstieg

- `README.md` — Einstieg, Struktur, Markenanker und aktuelle Masterentscheidung.
- `DATEIEN-MANIFEST.md` — diese Datei.

---

## 2. Master- und Konzeptdateien

- `00-master-synthese-peer-reviews.md` — konsolidierte Synthese der Peer Reviews zur Homepage.
- `01-positionierung-und-zielbild.md` — verbindliche Kurzpositionierung und Zielbild.
- `01a-markenclaim-integration.md` — erste Integration des Claims „Finanzen geregelt – Freiräume geschaffen“.
- `01b-claim-synthese-v2-einarbeitung.md` — präzisierte Claim-Logik: Der Claim ist Zielzustand, nicht Hero-Köder.
- `02-psychologischer-funnel-konzept.md` — Grundsatzkonzept: Homepage als psychologischer Funnel.
- `03-funnel-architektur.md` — Reihenfolge und Spannungsbogen des Funnels.
- `04-stationen-und-app-mapping.md` — Zuordnung von Stationen, Blockaden und Apps.

---

## 3. Textwerkstatt und Umsetzung

- `06-uebergangstexte-und-microcopy.md` — zentrale Arbeitsdatei für Hero, Übergänge, Erkenntnisse und CTAs.
- `06a-claim-orientierte-microcopy-ergaenzung.md` — Ergänzungen für claim-kompatible Formulierungen.
- `07-entscheidungslog.md` — Begründete Entscheidungen und verworfene Optionen.
- `08-kochrezept-bis-zur-statischen-html-seite.md` — praktische Checkliste bis zur lokal testbaren statischen HTML-Seite.

---

## 4. Peer Reviews und externe Analysen

Ordner: `05-peer-reviews/`

- `peer_review_homepage_funnel.md` — erstes Peer Review zum psychologischen Funnel.
- `peer_review_v2_mit_html.md` — zweites Peer Review mit HTML-Entwurf.
- `peer_review_claim_und_synthese.md` — externes Feedback zur Claim-Integration.
- `master_synthese_peer_reviews.md` — ältere Master-Synthese als Referenz.
- `psychologischer_funnel_konzept_original.md` — ältere Originalfassung als Referenz.

---

## 5. Erste HTML-Version

Ordner: `09-erste-html-version/`

- `finanzwesir-homepage-v12-gemini-tailwind-v16.html` — alte statische HTML-Version. Referenz, nicht Zielarchitektur.
- `technische-freigabe-v12.md` — technische Freigabe / Notizen zur alten Version.

---

## 6. App-Spezifikationen

Ordner: `10-app-spezifikationen/`

- `01-market-timing-simulator.md`
- `02-crash-reaktions-test.md`
- `03-diversifikations-detektor.md`
- `04-einfachheits-app-1-etf-vs-5-etfs.md`
- `05-etf-aera-app.md`
- `06-regulatorik-app.md`
- `07-risiko-uebersetzer.md`
- `08-plan-generator.md`
- `etf-aera-app-ui-skizze.md`

Diese Dateien beschreiben die acht Funnel-Apps bzw. relevante Zusatzskizzen. Sie sind Arbeitsdateien, keine finalen Implementierungen.

---

## 7. Arbeitsmaterial

Ordner: `11-arbeitsmaterial/`

- `analyse-etf-aera-und-regulatorik.md`
- `flow-alt-kurzfassung.md`
- `microcopy-etf-aera-und-regulatorik.md`

Hier liegt Material, das nützlich sein kann, aber nicht die aktuelle Masterentscheidung ersetzt.

---

## 8. Build-Ziel

Ordner: `build/homepage-static/`

- `README.md` — beschreibt den Zielordner für spätere lokal testbare HTML-Artefakte.

Hier soll später die fertige statische HTML-Datei landen, die lokal im Browser getestet wird.

---

## 9. Verbindliche Arbeitsregel

Die aktuelle Masterlogik lautet:

```text
Der Claim ist der Nordstern, nicht der Köder.
```

Das heißt:

- Im Hero wird der Nutzer gespiegelt.
- Die Apps prüfen seine Blockaden.
- Der Claim wird am Ende als verdienter Zielzustand eingelöst.

Ziel:

```text
Komplexität zerstören
↓
Finanzen geregelt
↓
Freiräume geschaffen
```
