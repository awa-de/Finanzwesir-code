# AP-11 Ergebnis — Template-Sync Steuerungsblock und Score

Stand: 2026-06-29 | Session: APP-01 AP-11 | Geändert von: Claude

---

## Auftrag

Templates und Musterdateien synchronisieren, damit künftige App-Arbeit den lokalen Abschnitt als `Steuerungsblock: Zweck, Barriere, Prüfregeln` führt, keinen `Nordstern`-Begriff als lokale Abschnittsformel verwendet und den standardisierten LLM-Prüfscore als Standard-Gate kennt.

---

## Quellen

- `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` §2.1 — Score-Satz (verbatim)
- `Apps/prokrastinations-preis/APP_SPEC.md` — Referenz für lokalen Abschnitt
- `tools/app_fabrik/insert_steuerungsblock_from_seed.py` — Einbau-Tool (nicht verändert)

---

## Inventar

### Template-Kandidaten (Namenssuche)

| Datei | Befund |
|---|---|
| `docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md` | Primäres Template — 4 Nordstern-Stellen, fehlender Score-Satz, fehlende Seed-Metadaten-Regel |
| `docs/steering/templates/ISSUE-TEMPLATE.md` | Issue-Vorlage, kein APP_SPEC-Bezug |
| `docs/steering/patches/AP-03_app-steuerungsblock-template_Ergebnis.md` | Historisches Protokoll |
| `docs/data/DATASET-CONTRACT-TEMPLATE.md` | Daten-Contract-Vorlage, kein Steuerungsblock-Bezug |

### Content-Kandidaten (Steuerungsblock/Nordstern/Score)

| Datei | Befund | Entscheidung |
|---|---|---|
| `docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md` | Nordstern in §3, §5, §6; Score-Satz fehlend; Seed-Metadaten-Regel fehlend | **PATCHEN** |
| `.claude/skills/app-spec-create/SKILL.md` | Steuerungsblock korrekt, LLM-Prüfscore korrekt referenziert | nicht patchen |
| `.claude/skills/tech-spec-app/SKILL.md` | Steuerungsblock korrekt, kein Nordstern als Vorgabe | nicht patchen |
| `docs/App-Fabrik/04_CLAUDE_WORKFLOW_DRAFT.md` | Lokale Abschnittsnamen bereits korrekt (Steuerungsblock) | nicht patchen |
| `docs/steering/TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md` | Arbeitsmodus-Metaprompt, kein APP_SPEC-Template | nicht patchen |
| `docs/App-Fabrik/APP_STEUERUNGSBLOCK_ROLLOUT_PLAN.md` | Rollout-Planung, Vergangenheitsdokumentation | nicht patchen |
| `docs/App-Fabrik/APP_STEUERUNGSBLOCK_INVENTORY.md` | Inventar-Snapshot, Vergangenheitsdokumentation | nicht patchen |
| Alle `docs/steering/patches/`-Dateien | Historische Protokolle | nicht patchen |

---

## Gepatchte Dateien

- `docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md` (Version 1.0 → 1.1)

---

## Änderungen im Detail

### 1. §3 — Abschnittsname und erster Satz

**Entfernt:**
```
## 3. 80%-Nordstern — Leitprinzip

Jeder lokale Steuerungsblock gilt bei Erstellung als **80%-Nordstern**.
```

**Neu:**
```
## 3. Gültigkeitsstufe — Block gilt als Arbeitsfassung

Jeder lokale Steuerungsblock gilt bei Erstellung als **Arbeitsfassung (80%-Entwurf)**.
```

### 2. §5 — Status-Feld im Standardblock (APP_SPEC.md)

**Entfernt:** `**Status:** 80%-Nordstern / Arbeitsfassung`  
**Neu:** `**Status:** Arbeitsfassung`

### 3. §6 — Status-Feld im reduzierten Vorläuferblock (MINI_SPEC)

**Entfernt:** `**Status:** Vorläufiger 80%-Nordstern — vollständiger Block in APP_SPEC.md erwartet`  
**Neu:** `**Status:** Vorläufig — vollständiger Block in APP_SPEC.md erwartet`

### 4. §7 — Score-Satz ergänzt

Am Ende von §7, nach den Score-Regeln, eingefügt:

```
**Merksatz:** Der Score ersetzt nicht den Steuerungsblock, sondern zwingt das LLM, jede Änderung gegen Barriere, Zielzustand, Nicht-Ziele und Heldenreise-Rolle zu prüfen.
```

Verbatim aus `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` §2.1.

### 5. §12 — Seed-Metadaten-Trennung (neu)

Neuer Abschnitt am Ende des Templates. Regelt:
- Seed-spezifische Felder (`Status`, `Verteilungsstatus`, `Klärungsbedarf vor Verteilung`) werden beim lokalen Einbau entfernt
- Kern (Zweck, Barriere, Muss-Kriterien, Nicht-Ziele, Score) wird unverändert übernommen
- Lokale APP_SPEC kennt nur `**Status:** Arbeitsfassung`

---

## Prüfungen

| Prüfung | Ergebnis |
|---|---|
| `Nordstern` in gepatchter Template-Datei: nein | ✅ |
| `Steuerungsblock: Zweck, Barriere, Prüfregeln` in §5 korrekt | ✅ |
| Score-Satz in §7 verankert | ✅ |
| Seed-Metadaten-Regel in §12 ergänzt | ✅ |
| APP_SPECs neu verteilt: nein | ✅ |
| `--write` ausgeführt: nein | ✅ |
| App-Fachinhalte geändert: nein | ✅ |
| Seed-Blöcke umformuliert: nein | ✅ |
| Script-Logik geändert: nein | ✅ |
| Kein Commit: ja | ✅ |
| Kein Abschlussritual: ja (AP-Anweisung) | ✅ |

### `git diff --name-only`

```
docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md
.claude/learning/session-log.md   (← Warm-Start-Eintrag, nicht AP-11)
```

---

## Status

GRÜN

---

## Offene Punkte

- Keine offenen Punkte aus AP-11.
- AP-11a bereinigt den Nachlauf aus AP-11: lokales `Status`-Feld aus dem Template entfernt und `tech-spec-app` Begriff `LLM-Selbsttest` auf `LLM-Prüfscore pro Änderung` synchronisiert.
