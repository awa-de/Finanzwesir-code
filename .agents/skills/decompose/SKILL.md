---
name: decompose
description: Zerlegungsprotokoll — wandelt eine Ideensammlung aus der Konversation in strukturierte BACKLOG-Einträge um. Preview zuerst, Schreiben erst nach Alberts OK.
---

# Skill: decompose

Trigger: Albert sagt „jetzt zerlegen" oder sinngemäß.
Voraussetzung: Es gibt eine Konversation mit identifizierten Aufgaben oder Ideen.

---

## Protokoll

**1. Konversation durchgehen**
Alle identifizierten Aufgaben, Probleme und Ideen aus dem bisherigen Gesprächsverlauf sammeln.

**2. Pro Aufgabe prüfen**
- Unabhängig testbar? → eigener BACKLOG-Eintrag
- Zu granular / abhängig? → Detail-Datei unter übergeordnetem AP

**3. Für jeden Eintrag bestimmen**

| Feld | Regel |
|---|---|
| Domain | Engine / CSS / Design / Theme / App / Content |
| Titel | `[Verb] [Objekt]` — max. 8 Wörter, kein Prosa-Titel |
| Prio | H = launch-blockierend / M = wichtig / L = nice-to-have |
| ID | Nächste freie ID im Bereich (AP-N, CSS-N, DS-N, TH-N, CL-N, APP-N) |
| Deps | AP-IDs oder „keine" |

**4. Preview im Chat zeigen**
Codex schreibt NICHT direkt in BACKLOG.md.
Format der Preview:

```
| ID | Titel | Prio | Deps |
|---|---|---|---|
| AP-22 | [Verb Objekt max 8 Wörter] | M | AP-20 |
| CSS-8 | [Verb Objekt] | L | keine |
```

**5. Albert reviewed**
Albert streicht, korrigiert oder genehmigt.

**6. Nach Alberts „OK"**
- Einträge in `docs/steering/BACKLOG.md` in den richtigen Abschnitt einsortieren
- Bei komplexem Scope: Detail-Datei in `docs/steering/engine/detail/` oder `docs/steering/design/detail/` anlegen
- Stand-Datum in BACKLOG.md aktualisieren

---

## Qualitätsleitplanken

- Titelformat `[Verb] [Objekt]` ist Pflicht — keine Prosa-Titel
- Neue App bekommt eigenes ID-Präfix (APP-N) — keine Konflikte mit AP-N
- Prio H nur wenn wirklich launch-blockierend
