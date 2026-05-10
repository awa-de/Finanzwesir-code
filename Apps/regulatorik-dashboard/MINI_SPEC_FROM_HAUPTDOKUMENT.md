# MINI_SPEC_FROM_HAUPTDOKUMENT — Regulatorisches Risiko Dashboard

> Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
> Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC

---

## G1 – Regulatorisches Risiko Dashboard

**Slug:** `regulatorik-dashboard`
**KI-Konsens:** ★★ (Perplexity, ChatGPT)
**Folienbezug:** Thema Planungssicherheit / Sparplan-Robustheit
**Funnel-Position:** Systemkritische Einwände
**Priorität:** #6
**Status: ✅ BEREITS GEBAUT** (dashboard-regulatorikXIX-3.html)

### Was die App zeigt

Wie stark können regulatorische Eingriffe (Steuer, Vorabpauschale, Förderpolitik) die reale Rendite und Rentenphase verändern? Zwei Regler (Ansparphase / Rentenphase) steuern den Renditeverlust in Prozentpunkten.

### Ausgaben (bereits implementiert)
- Endvermögen ohne vs. mit Regulatorikeffekt
- Nötige Mehrersparnis zum Ausgleich
- Jährliche Auszahlung im Rentenalter (mit/ohne Eingriff)

### Kernbotschaft der App

> „Das Risiko ist real. Aber es zerstört nicht deine Strategie – nur die Details. Komplexe Strategien brechen. Einfache überleben."

### Inhaltlicher Rahmen

Das eigentliche Risiko für ETF-Sparer in Deutschland ist nicht Systembruch, sondern **regulatorische Drift** – der „Tod durch 1000 Schnitte": steigende Normdichte (+17 % in 10 Jahren), Detailänderungen bei Steuer und Vorabpauschale, politische Eingriffe mit langer Wirkungsdauer.

**Szenario-Matrix (für Tooltips/Erklärungstext der App):**

| Szenario | Wahrscheinlichkeit | Schaden |
|---|---|---|
| Moderate Detailänderung (Vorabpauschale etc.) | 30–60 % über 20 J. | Niedrig bis mittel – lästig, nicht zerstörerisch |
| Steuerliche Verschlechterung | 10–30 % über 20 J. | Mittel bis hoch – wahrscheinlichster echter Schadenskanal |
| Starker politischer Eingriff (Vermögensabgabe) | 1–5 % | Hoch bis sehr hoch – Schwarzer-Schwan-nah |
| Systembruch / Rechtsunsicherheit | < 1 % | Existenzbedrohend – in D derzeit nicht plausibel |

**CTA:** „Ich halte es einfach und flexibel."

### Erweiterungsidee (V2 der App)

Schwarzer-Schwan-Szenario-Matrix interaktiv einbauen: User klickt Szenario an → App zeigt Auswirkung auf Endvermögen. Macht den Unterschied zwischen „lästig" und „zerstörerisch" erlebbar.

---

## Mini-Spec-Metadaten

- Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- Block: G – Systemkritische Einwände
- App-ID: G1
- App-Titel: Regulatorisches Risiko Dashboard
- Slug laut Hauptdokument: `regulatorik-dashboard`
- Zugeordneter App-Ordner: `/Apps/regulatorik-dashboard/`
- Modulrolle: Haupt-App
- Status: Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC
