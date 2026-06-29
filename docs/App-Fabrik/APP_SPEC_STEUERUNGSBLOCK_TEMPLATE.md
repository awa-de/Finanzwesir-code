# APP_SPEC_STEUERUNGSBLOCK_TEMPLATE

Stand: 2026-06-29 | Version: 1.1 | Status: Arbeitsfassung

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

## 3. Gültigkeitsstufe — Block gilt als Arbeitsfassung

Jeder lokale Steuerungsblock gilt bei Erstellung als **Arbeitsfassung (80%-Entwurf)**.

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

**LLM-Prüfscore pro Änderung:**

Bewerte vor der Umsetzung von 0–2:

1. **Barriere-Abbau:** Entfernt die Änderung die definierte psychologische Hürde?
2. **Zielzustand:** Führt die Änderung zum gewünschten Nutzerzustand?
3. **Nicht-Ziele:** Vermeidet die Änderung alle verbotenen Drifts?
4. **Mentorrolle:** Stärkt die Änderung die Rolle dieser App in der Heldenreise?

**Score-Regel:**

- **8/8** = umsetzen
- **6–7/8** = nur umsetzen, wenn `Nicht-Ziele = 2/2`
- **≤5/8** = nicht umsetzen
- **jede Nicht-Ziel-Verletzung** = stoppen

**Wichtig:**

- Punkt 3 ist ein KO-Kriterium.
- Eine Änderung mit `Nicht-Ziele < 2/2` darf nicht umgesetzt werden, auch wenn der Gesamtscore hoch wirkt.
- Der Score ersetzt nicht den Steuerungsblock, sondern zwingt das LLM, jede Änderung gegen Barriere, Zielzustand, Nicht-Ziele und Heldenreise-Rolle zu prüfen.
- Bei Unsicherheit: nicht umsetzen, sondern Klärungsbedarf markieren.
```

---

## 6. Reduzierter Vorläuferblock für `MINI_SPEC_FROM_HAUPTDOKUMENT.md`

Für Apps ohne `APP_SPEC.md`:

Vorläuferblöcke sind Arbeitsfassungen. Dieser Reifegrad wird nicht als lokales `Status`-Feld in die spätere APP_SPEC übernommen.

```markdown
## Vorläufiger Steuerungsblock

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

**Merksatz:** Der Score ersetzt nicht den Steuerungsblock, sondern zwingt das LLM, jede Änderung gegen Barriere, Zielzustand, Nicht-Ziele und Heldenreise-Rolle zu prüfen.

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

---

## 12. Seed-Metadaten-Trennung

Der lokale Steuerungsblock stammt aus der Seed-Datei (`Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md`).

**Beim mechanischen Einbau in eine lokale `APP_SPEC.md` werden folgende Seed-Felder entfernt — sie gehören nicht in die lokale APP_SPEC:**

- `Status` (Seed-Arbeitsstand wie „freigegeben", „Entwurf", „gesperrt")
- `Verteilungsstatus` (ob der Seed verteilt wurde)
- `Klärungsbedarf vor Verteilung` (redaktionelle Fragen vor der Verteilung)

Diese Felder sind redaktionelle Metadaten der Seed-Datei, nicht Bestandteil des lokalen App-Steuerungsblocks.

Die lokale APP_SPEC übernimmt keine Seed-Metadaten. Der Steuerungsblock beginnt nach den Quellenkommentaren mit `**Rolle:**` oder, falls keine Rolle definiert ist, mit `**Diese App existiert, um:**`.

**Regel:** Mechanische Verteilung bedeutet keine Umformulierung des Seed-Inhalts. Nur die Seed-Metadaten werden entfernt — der Kern (Zweck, Barriere, Muss-Kriterien, Nicht-Ziele, Score) wird unverändert übernommen.
