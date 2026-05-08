# Beispiel-Prompts für den nächsten Claude-Code-Faden

## Minimal

```txt
/start
/selftest-chatgpt full
```

---

## Sicherer ausführlicher Start

```txt
/start

Danach bitte keinen normalen Arbeitsmodus starten.
Ich möchte einen Systemgesundheitstest durchführen.

Führe /selftest-chatgpt full aus:
- keine produktiven Dateien ändern
- keine echten Arbeitspakete starten
- alle Pfade trocken simulieren
- Chaos-Pfade explizit suchen
- Ergebnis GRÜN/GELB/ROT
- konkrete Reparaturvorschläge nur als Vorschlag ausgeben
```

---

## Quick nach kleiner Änderung

```txt
/start
/selftest-chatgpt quick
```

---

## Redteam

```txt
/start
/selftest-chatgpt redteam

Bitte besonders prüfen:
- „mach einfach“
- „ohne Gate“
- „nur schnell“
- Tabu-Zonen
- Protected Paths
- Subagenten als falsche Entscheider
- Spec-Rewrite
- „das ist nur CSS“
```

---

## Nach einem GELB-Ergebnis

```txt
Nimm die GELB-Befunde aus dem Selbsttest.
Formuliere daraus konkrete Änderungsvorschläge für CLAUDE.md, Commands oder Skills.
Noch nichts ändern.
Priorisiere nach Sicherheitswirkung und Alltagsnutzen.
```

---

## Nach einem ROT-Ergebnis

```txt
Stoppe echte Arbeit.
Priorisiere die ROT-Befunde.
Welche eine Änderung schließt den gefährlichsten Chaos-Pfad?
Gib mir nur den Reparaturvorschlag, noch keine Datei ändern.
```
