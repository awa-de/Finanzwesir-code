Stand: 2026-07-10 | Session: AP-prokrast-17-FONT-SPEC-PARITÄT | Geändert von: Claude

# AP-prokrast-17-FONT-SPEC-PARITÄT — Ergebnisprotokoll: Fonts im Spec gleichwertig zu Farben (KDR-14-Muster)

**Status:** GRÜN · **Blocker:** nein · **Commit:** nein (Freigabe bei Albert) · **Typ:** Spec-Parität, kein Code

---

## 1. Gelesen

Vollständig geöffnet/geparst: `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md` (Header + KDR 14 Z.145–153), `docs/spec/TECH-SPEC Theme-Integration Chart-Engine.md` (§1–2, §4.4, §5.1–5.4, §9 „Bekannte Einschränkungen" Z.283–290, §10), `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md` (§0–§9 vollständig, inkl. §2 Namensräume Z.60–71, §5 Konsumenten-Regel Z.130–147, §9 Migrationsreihenfolge Z.238–257), `Theme/assets/css/tokens.css` Z.1–93 (nur lesend, Referenz für Token-Namen). Geprüft und sauber befunden (keine Font-Erwähnung, kein Änderungsbedarf): `docs/spec/Der Rucksack (Context Object Pattern).md`, `docs/spec/CHART_PLUGIN_ARCHITEKTUR.md`.

## 2. Paritäts-Lückentabelle

| # | Farbe-Stelle (Ist) | Font-Stelle (Ist) | Lücke | Aktion |
|---|---|---|---|---|
| 1 | `ARCHITECTURE STRATEGY PAPER VX.md` Z.145–152 (KDR 14): vollständiger Mechanismus | Fonts in KDR 14 gar nicht erwähnt | fehlt komplett | Punkt 5 ergänzt |
| 2 | (kein Pendant nötig) | TECH-SPEC §5.4 Z.174–190: „hardcoded", Google-Fonts-CDN-Empfehlung, kein Bridge-Ziel | doppelt veraltet | §5.4 umgeschrieben |
| 3 | TECH-SPEC Z.288 (jetzt Z.286): Farb-Staleness, veraltet | kein Font-Pendant | Farb-Staleness | **geflaggt, nicht repariert** |
| 4 | `CI-POOL-ROLLENKONTRAKT.md` §2 Z.67: `--font-*` bereits gelistet | identisch behandelt | keine Lücke | keine Aktion |
| 5 | `CI-POOL-ROLLENKONTRAKT.md` §5 Z.142: `font-display`/`font-body` bereits in Utilities-Zeile | identisch behandelt | keine Lücke | keine Aktion |
| 6 | §9 Z.253: Farb-Bridge-Status beschrieben | Z.251 nur „warum nicht", kein „was wäre das Ziel" | fehlender Zielmechanismus | neuer Absatz nach Z.253 ergänzt |
| 7 | `tokens.css` enthält `--color-*` UND `--font-display`/`--font-body` | gleich vollständig | reiner Code-Fund | außerhalb Scope |

## 3. Diff je geänderter Spec

### 3.1 `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md`

**Entfernt:** nichts. **Hinzugefügt:** Heading-Qualifier (Z.145) + neuer Punkt 5 unter KDR 14 (nach Z.151, vor der bestehenden Begründungszeile). **Warum:** Fonts fehlten im Farb-Mechanismus-KDR komplett; Albert-Entscheidung 2026-07-10 verlangt Parität mit ehrlichem Status.

```diff
- ### KDR 14: CSS-Variables Bridge (Design-Hoheit beim Theme)
+ ### KDR 14: CSS-Variables Bridge (Design-Hoheit beim Theme) — Farbe implementiert, Font-Parität als Ziel (Code offen)
```
```diff
      4. **Konsequenz:** ...
+     5. **Font-Parität (Ziel, festgelegt 2026-07-10):** ... **Status: Spec-Parität festgelegt 2026-07-10 — Code-Umsetzung offen.** ...
  * **Begründung:** ...
```

Version-/Datum-Header (Z.4–5) bewusst **nicht** gebumpt — gleiche GELB-Notiz wie in AP-prokrast-kdr14, Bump bleibt Alberts separate Entscheidung.

**Wiederlesen bestätigt (✅):** Punkte 1–4 wortgleich unverändert (kein Prinzipienverlust), Punkt 5 vorhanden mit explizitem „Code-Umsetzung offen", Verweis auf `FwTheme.init()`-Ist-Stand und Folge-AP korrekt.

### 3.2 `docs/spec/TECH-SPEC Theme-Integration Chart-Engine.md`

**Entfernt:** „hardcoded in `FwTheme.js`"-Rahmung, Imperativ „muss diese Fonts laden" + Google-Fonts-CDN-Snippet, alter DSGVO-Hinweis als offenes To-do. **Hinzugefügt:** Ist-Zustand-Absatz (lokal bereits geladen seit AP-16, DSGVO-konform), Verweis auf `tokens.css`-Token-Namen, Ziel-Mechanismus-Absatz mit ehrlichem Status + Cross-Ref zu KDR 14 Punkt 5. **Warum:** Abschnitt beschrieb einen seit AP-16 überholten Vor-Implementierungs-Plan; Ladeweg ist real anders gelöst (lokal-only, keine CDN-Option mehr vorgesehen — von Albert bestätigt), Bridge-Zielmechanismus fehlte komplett.

```diff
- Die Engine nutzt zwei Schriftarten (hardcoded in `FwTheme.js`):
+ Die Engine nutzt zwei Schriftarten:
  [Tabelle unverändert]
- **Das Theme muss diese Fonts laden** (via Google Fonts oder lokal in `assets/fonts/`):
-
- ```html
- <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&family=Archivo+Black&display=swap" rel="stylesheet">
- ```
-
- **DSGVO-Hinweis:** Für die lokale Einbindung die WOFF2-Dateien herunterladen und in `assets/fonts/` ablegen, dann via `@font-face` in `screen.css` einbinden.
+ **Ist-Zustand (umgesetzt seit AP-16):** ... Ein Theme-Builder muss hierfür nichts mehr tun; die frühere Empfehlung, Fonts optional über Google Fonts nachzuladen, ist überholt und entfällt.
+
+ Die Font-**Namen** sind zusätzlich als CSS-Custom-Properties in `tokens.css` hinterlegt ...
+
+ **Ziel-Mechanismus (Font-Parität zu Farben, festgelegt 2026-07-10, Code-Umsetzung offen):** ... **Heutiger Ist-Stand:** `FwTheme.init()` liest ausschließlich Farben; `this.fonts` bleibt fest im Constructor definiert. ...
```

**Wiederlesen bestätigt (✅):** Google-Fonts-CDN-Snippet vollständig entfernt, Ist-Zustand + Ziel-Mechanismus vorhanden, Status ehrlich. Z.288 (jetzt Z.286, reine Zeilenverschiebung durch das Delta) wortgleich unverändert. Checkliste Z.270–281 (jetzt Z.270–281, Fonts-Zeilen unverändert) unangetastet.

### 3.3 `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md`

**Entfernt:** nichts — Z.251 (Ausklammerung) und Z.253 (Farb-Bridge-Status) bleiben wortgleich stehen. **Hinzugefügt:** neuer Absatz nach Z.253, vor der Trennlinie. Stand-Header (Z.1) aktualisiert. **Warum:** Z.253 hatte kein Font-Pendant — Zielmechanismus fehlte, obwohl §2/§5 Fonts bereits token-seitig gleichwertig führen.

```diff
  **Bridge-Migration Chart-Engine (P15):** ... `FwChartTextPlugin` (Font) siehe Ausklammerung oben.

+ **Font-Bridge-Zielmechanismus (Parität zu Farbe, festgelegt 2026-07-10):** Analog zur Farb-Bridge oben soll `FwTheme.init()` künftig zusätzlich `--font-display`/`--font-body` aus `tokens.css` lesen (voller Mechanismus: `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md`, KDR 14 Punkt 5). **Status: Ziel festgelegt, Code-Umsetzung offen.** Die Font-Bridge-Ausklammerung oben (Z.251) bleibt unverändert gültig — sie beschreibt, warum diese Migration bewusst noch nicht ausgeführt wurde (Rubikon-Metrik-Kopplung), nicht ob sie kommt.

  ---
```

**Wiederlesen bestätigt (✅):** Stand-Header korrekt auf `2026-07-10 | Session: AP-prokrast-17-FONT-SPEC-PARITÄT`, Z.251/253 wortgleich, neuer Absatz Z.255 vorhanden mit ehrlichem Status, kein Prinzipienverlust.

## 4. Ausdrücklich NICHT geändert

- Kein Code, kein JS/CSS-Edit, kein `FwTheme.init()`-Eingriff, keine Bridge gebaut.
- Keine Rubikon-Messung, keine App-/Tailwind-/Design-Arbeit.
- **TECH-SPEC Z.288/jetzt Z.286** (Farb-Staleness „CSS-Bridge geplant, aber noch nicht implementiert") — nur geflaggt, nicht gefixt (Albert-Entscheidung: bleibt liegen, ggf. separater 1-Zeilen-Minifix).
- **Font-Bridge-Ausklammerung** (`CI-POOL-ROLLENKONTRAKT.md` Z.251, `FwChartTextPlugin`/Rubikon) inhaltlich nicht aufgelöst — nur als bekannter Folge-AP referenziert.
- Kein Vollrewrite irgendeiner Spec; nur die font-relevanten (und die explizit benannte farb-veraltete, nur geflaggte) Passagen.
- Kein Font-in-`fwContext`: `Der Rucksack (Context Object Pattern).md` und `CHART_PLUGIN_ARCHITEKTUR.md` bestätigt sauber, keine Font-Erwähnung, nicht angefasst.

## 5. Geflaggt für Alberts Entscheidung

**Bereits während der Freigabe entschieden** (siehe Freigabe-Nachricht 2026-07-10):
- Google-Fonts-CDN-Streichung in §5.4 → bestätigt, lokal-only ist die einzig genannte Ladeweise.
- TECH-SPEC Z.288/286 (Farb-Staleness) → nur geflaggt lassen, nicht in diesem AP fixen. Bleibt als offener Punkt für einen möglichen separaten 1-Zeilen-Minifix.

## 6. Doppelte Abschlussfrage

**Nächster richtiger AP:** Font-Code-Migration entlang KDR 14 (ARCHITECTURE STRATEGY PAPER, Punkt 5) + Rubikon-Nachmessung S/M/L, Modell **Opus** (metriksensibel, Font-Wechsel ändert Textmetrik).

**Ausdrücklich NICHT der nächste AP:** Tailwind-Arbeit, Design, Löschen der DEPRECATED-CSS (`styles.css`/`stylesheet.css`, bleibt für AP-8 vorgemerkt), App-Fachlogik.

---

**Kurzfassung:** GRÜN · 3 Specs geändert (`ARCHITECTURE STRATEGY PAPER VX.md`, `TECH-SPEC Theme-Integration Chart-Engine.md`, `CI-POOL-ROLLENKONTRAKT.md`) · zentrale Änderung: Fonts haben jetzt denselben KDR-14-Zielmechanismus wie Farben im Spec verankert, mit durchgängig ehrlichem Status „Code-Umsetzung offen" · geflaggt statt geändert: Farb-Staleness TECH-SPEC Z.286 · nächster AP: Font-Code-Migration + Rubikon-Nachmessung, Modell Opus · kein Blocker.

Kein Commit, kein Abschlussritual ohne Alberts ausdrückliches OK.

---

## Nachtrag (2026-07-10) — Verdacht „toter Querverweis" geprüft, nicht bestätigt

**Verdacht:** Der Verweis in KDR 14 Punkt 5 (Z.152) auf `AP-prokrast-17-FONT-ANAMNESE_font-einbindung-breite-inventur_Ergebnis.md` zeige ins Leere.

**Prüfung (deterministisch, Python, da `rg` auf dem Netzlaufwerk wiederholt timeoutete):**
- Realer Dateiname in `docs/steering/patches/`: `AP-prokrast-17-FONT-ANAMNESE_font-einbindung-breite-inventur_Ergebnis.md`.
- Byte-Vergleich Referenz-String (aus der Spec extrahiert) vs. realer Dateiname: **identisch**.
- Repoweite Suche über `docs/spec/` + `docs/steering/`: genau 3 Treffer — die eine Referenz in `ARCHITECTURE STRATEGY PAPER VX.md` Z.152 plus zwei Selbstreferenzen im Kopf/Titel der Anamnese-Datei selbst (kein Link). Kein Tippfehler, keine zweite abweichende Fundstelle.

**Ergebnis:** Der Querverweis ist korrekt und zeigt auf eine real existierende Datei. **Keine Korrektur nötig, kein Write an `docs/spec/`.** Der Verdacht war unbegründet.
