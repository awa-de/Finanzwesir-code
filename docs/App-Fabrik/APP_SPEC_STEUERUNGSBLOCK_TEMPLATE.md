# APP_SPEC_STEUERUNGSBLOCK_TEMPLATE

Stand: 2026-06-26 | Version: 1.0 | Status: Arbeitsfassung

---

## 1. Zweck

Dieses Template definiert das kanonische Format des lokalen App-Steuerungsblocks.

Jede `APP_SPEC.md` und jede `MINI_SPEC_FROM_HAUPTDOKUMENT.md` enthält einen Steuerungsblock nach diesem Format. Claude liest diesen Block vor jeder App-Arbeit und prüft ihn aktiv — nicht als Formalität, sondern als Qualitätsschwelle.

---

## 2. Autorität und Abgrenzung

| Datei | Rolle |
|---|---|
| `.claude/CLAUDE.md` § APP-ARBEIT | Verhaltensregel: Steuerungsblock lesen, prüfen, bei Schwäche stoppen |
| `NAVIGATION.md` § „App bauen / ändern" | Routing: wann und in welcher Reihenfolge der Block gelesen wird |
| `docs/App-Fabrik/APP_SPEC_STEUERUNGSBLOCK_TEMPLATE.md` | Format-Standard: Struktur, Felder, Prüfscore-Logik (diese Datei) |
| Lokale `APP_SPEC.md` oder `MINI_SPEC_FROM_HAUPTDOKUMENT.md` | Konkrete Instanz: ausgefüllter Block für eine bestimmte App |

Dieses Template sagt **WIE** ein Block aussieht.  
`CLAUDE.md` sagt **WAS** Claude damit tut.  
`NAVIGATION.md` sagt **WANN** Claude ihn liest.

---

## 3. 80%-Nordstern — Leitprinzip

Jeder lokale Steuerungsblock gilt bei Erstellung als **80%-Nordstern**.

Das bedeutet:

- Standardannahme: Nachbesserung ist wahrscheinlich.
- Claude darf den Block nicht blind ausführen.
- Vor jeder Code-, UX-, Daten- oder Spec-Detailarbeit: Block aktiv prüfen.
- Bei unklarem Zweck, unklarer Barriere oder verletzten Nicht-Zielen: stoppen, mit Albert klären.
- Kein Fortfahren ohne Klärung.

---

## 4. Einbauposition

### In `APP_SPEC.md`

Position: direkt nach § Status (§1), vor § App-Familie / Datenbedarf / UX-Detail.

Der Steuerungsblock ist die Geschäftsentscheidung hinter der App — er kommt vor technischen Details.

### In `MINI_SPEC_FROM_HAUPTDOKUMENT.md`

Position: nach Metadaten / Trichter-Einordnung, vor Implementierungsdetails.

Bei MINI_SPEC: reduzierten Vorläuferblock verwenden (→ § 6).

---

## 5. Standardblock für `APP_SPEC.md`

```markdown
## Steuerungsblock: Zweck, Barriere, Prüfregeln

**Status:** 80%-Nordstern / Arbeitsfassung

**Diese App existiert, um:**  
[ein Satz: Was soll beim Nutzer kippen?]

**Zu entfernende psychologische Barriere:**  
[ein Satz: Welche Hürde trennt den Nutzer vom Investieren / Handeln?]

**Falscher Glaubenssatz vorher:**  
„..."

**Zielzustand nach der App:**  
„..."

**Muss-Kriterien für jede Umsetzung:**  
- [prüfbares Kriterium 1]
- [prüfbares Kriterium 2]
- [prüfbares Kriterium 3]

**Nicht-Ziele / harte Verbote:**  
- [was die App nicht werden darf]
- [welche naheliegende Drift verboten ist]
- [welche Nachbar-App nicht vermischt werden darf]

**LLM-Selbsttest vor jeder Änderung:**  
1. Entfernt diese Änderung die definierte Barriere?
2. Stärkt diese Änderung den Zielzustand?
3. Vermeidet diese Änderung alle Nicht-Ziele?
4. Bleibt die App in ihrer Mentorrolle innerhalb der Heldenreise?
5. Wenn nein bei einer der Fragen: Änderung nicht durchführen.
```

---

## 6. Reduzierter Vorläuferblock für `MINI_SPEC_FROM_HAUPTDOKUMENT.md`

Für Apps ohne `APP_SPEC.md`:

```markdown
## Vorläufiger Steuerungsblock

**Status:** Vorläufiger 80%-Nordstern — vollständiger Block in APP_SPEC.md erwartet

**Diese App existiert, um:**  
[...]

**Zu entfernende psychologische Barriere:**  
[...]

**Falscher Glaubenssatz vorher:**  
„..."

**Zielzustand nach der App:**  
„..."

**Nicht-Ziele / harte Verbote:**  
- [...]

**Klärungsbedarf vor APP_SPEC:**  
- [...]
```

---

## 7. LLM-Prüfscore pro Änderung

Vor jeder Änderung an Code, UX, Daten oder Spec: Score berechnen.

| # | Kriterium | 0 | 1 | 2 |
|---|---|---|---|---|
| 1 | Barriere-Abbau | Barriere wird gestärkt oder ignoriert | Barriere unklar betroffen | Barriere wird klar abgebaut |
| 2 | Zielzustand | Zielzustand wird geschwächt | Zielzustand unklar betroffen | Zielzustand wird klar gestärkt |
| 3 | Nicht-Ziele | Mindestens ein Nicht-Ziel verletzt | Nicht-Ziele unklar betroffen | Alle Nicht-Ziele klar eingehalten |
| 4 | Mentorrolle | Mentorrolle geschwächt | Mentorrolle unklar betroffen | Mentorrolle klar gestärkt |

**Score-Regeln:**

- **8/8** → Änderung zulässig
- **6–7/8** → nur zulässig wenn Kriterium 3 = 2 (kein Nicht-Ziel verletzt)
- **≤ 5/8** → Änderung nicht umsetzen
- **Kriterium 3 = 0** → sofort stoppen, unabhängig vom Gesamt-Score
- **Steuerungsblock unklar oder schwach** → stoppen, mit Albert klären, vor Prüfscore-Anwendung

---

## 8. Stop-Regeln

Sofort stoppen und mit Albert klären, wenn:

1. Steuerungsblock nicht vorhanden.
2. Zweck unklar oder fehlt.
3. Barriere unklar oder fehlt.
4. Nicht-Ziele fehlen oder unvollständig.
5. Prüfscore ≤ 5/8.
6. Kriterium 3 (Nicht-Ziele) = 0.
7. Block ist widersprüchlich (Muss-Kriterien vs. Nicht-Ziele im Konflikt).
8. Block ist veraltet (App deutlich weiterentwickelt, Block nicht aktualisiert).
9. Zweck der Änderung passt zu keinem Muss-Kriterium.

---

## 9. Qualitätskriterien für einen belastbaren Block

Ein Block gilt als belastbar (≥ 80%), wenn alle Felder ausgefüllt sind und:

- **Zweck:** ein Satz, beschreibt konkret was beim Nutzer kippen soll
- **Barriere:** eine identifizierbare psychologische Hürde, nicht generisch
- **Falscher Glaubenssatz:** konkret als Zitat formuliert
- **Zielzustand:** konkret als Zitat formuliert, unterscheidbar vom Zweck
- **Muss-Kriterien:** prüfbar formuliert (nicht: „gut", sondern: „zeigt X", „vermeidet Y")
- **Nicht-Ziele:** konkret, nennen mindestens eine Nachbar-App oder Drift-Richtung
- **Mentorrolle:** aus Heldenreise-Mapping ableitbar

---

## 10. Nicht-Ziele dieses Templates

- Dieses Template formuliert keine Steuerungsblöcke für konkrete Apps.
- Dieses Template enthält keine App-spezifischen Beispiele.
- Dieses Template ändert keine bestehenden `APP_SPEC.md`- oder `MINI_SPEC`-Dateien.
- Dieses Template ersetzt weder `CLAUDE.md` § APP-ARBEIT noch `NAVIGATION.md`.
- Dieses Template ist kein Prozesshandbuch — operative Abläufe regeln Skills und Commands.

---

## 11. Ergebnisprotokoll-Anforderung für spätere APs

Jedes Ergebnisprotokoll eines AP, das App-Specs, Mini-Specs, Skills oder App-Code berührt, muss künftig enthalten:

```
- Steuerungsblock gelesen: ja/nein
- Steuerungsblock belastbar: ja/nein/unklar
- Prüfscore angewendet: ja/nein
- Nicht-Ziele verletzt: ja/nein
- Stop nötig: ja/nein
- Falls Stop: Klärungsbedarf mit Albert: [Beschreibung]
```
