# Entscheidungslog Homepage

## Zweck dieser Datei

Hier werden wichtige Entscheidungen zur Homepage festgehalten, damit später nachvollziehbar bleibt, warum die Seite so gebaut wurde und nicht anders.

Neue Entscheidungen bitte immer oben ergänzen.

---

## 2026-05-12 — Homepage-Werkstatt unter `docs/homepage`

### Entscheidung

Alle Homepage-Dateien werden unter `docs/homepage` gesammelt.

### Begründung

Die Homepage ist aktuell noch konzeptionelle, dramaturgische und redaktionelle Arbeit. `Theme/` ist zu nah an der späteren Auslieferungsschicht. Die spätere Ghost-Template-Zerlegung ist ein eigener Task.

### Konsequenz

`Theme/homepage` soll nicht die aktive Werkstatt bleiben. Die alte HTML-Version wird unter `docs/homepage/09-erste-html-version/` als Referenz abgelegt.

---

## 2026-05-12 — Statische HTML-Seite vor Ghost-Template

### Entscheidung

Ziel dieser Phase ist zuerst eine vollständige statische HTML-Seite, die lokal im Browser getestet werden kann.

### Begründung

Bevor die Seite in Ghost zerlegt wird, muss klar sein, wie sie sich für Nutzer anfühlt. Ghost-Integration ist nachgelagert.

### Konsequenz

Alle Texte, App-Platzhalter, Reihenfolge und Übergänge werden zunächst in einer statischen HTML-Version zusammengeführt.

---

## 2026-05-12 — Rubrikenmodell verworfen

### Entscheidung

Die alte Struktur `Fundament / Bausteine / Umsetzung` wird nicht als Hauptarchitektur übernommen.

### Begründung

Sie sortiert Wissen, aber sie führt nicht durch die psychologischen Blockaden des Nutzers.

### Konsequenz

Die neue Seite folgt dem Funnel: Timing → Crash → Diversifikation → Einfachheit → ETF-Ära → Regulatorik → Risiko → Plan.

---

## 2026-05-12 — Alte HTML-Version bleibt Referenz

### Entscheidung

Die Datei `finanzwesir-homepage-v12-gemini-tailwind-v16.html` wird als Referenz behalten.

### Begründung

Sie enthält visuelle und handwerkliche Vorarbeiten, bildet aber nicht die Zielarchitektur ab.

### Konsequenz

Sie darf ausgeschlachtet werden, aber sie bestimmt nicht mehr den Aufbau der Homepage.


---

## Entscheidung: Claim als Zielzustand, nicht als Hero-Köder

**Datum:** nach Claim-Peer-Review

**Entscheidung:**  
Der Claim „Finanzen geregelt – Freiräume geschaffen“ bleibt zentral, wird aber nicht als große Hero-Headline verwendet.

**Begründung:**  
Am Anfang wäre der Claim ein Versprechen. Am Ende ist er die verdiente Einlösung der Reise.

**Konsequenz:**  
Hero spiegelt die Blockade:

> So geht das mit deinem Geld nicht weiter. Du weißt das schon. Die Frage ist, warum du trotzdem noch wartest.

Abschluss löst den Claim ein:

> Finanzen geregelt. Was du jetzt damit anfängst, ist dein Freiraum.

**Nicht übernommen:**  
Die absolute Regel „Claim darf nie am Anfang sichtbar sein“. Als leise Markenkennung darf er existieren; nur nicht als große Hero-Verheißung.
