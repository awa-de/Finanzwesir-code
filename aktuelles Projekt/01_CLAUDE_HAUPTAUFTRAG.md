# Claude-Arbeitsauftrag — App-Landschaft bereinigen: B1, B2, Der alte Euro, Depot-Kipppunkt

**Status:** Arbeitsauftrag für Claude Code  
**Ziel:** Dokumentation und Mini-Specs konsistent machen  
**Kein Code-Auftrag:** Keine App implementieren, keine UI bauen, keine Chart-Engine anfassen  
**Git/Commit:** Nicht Teil dieses Auftrags. Git-Integration erfolgt später separat.

---

## 0. Kurzfassung

Bitte bereinige die App-Landschaft in `/Apps` und `/docs/App-Fabrik`.

Es geht um vier Dinge:

1. **B1 neu rahmen:** weg vom reinen „Prokrastinations-Preis / Verlustzähler“, hin zu **„Marktzeit schlägt Timing / Lieber heute als morgen“**.
2. **B2 radikal fokussieren:** raus mit „vor 10 Jahren“, raus mit Kindersparplan, raus mit Warte-Button. B2 wird **purer Fokus auf rollierende 30-Jahres-Zeiträume mit inflationsbereinigten Realwerten**.
3. **Neue App ergänzen:** `Der alte Euro` als Mechanik-Mini-App.
4. **Neue App ergänzen:** `Depot-Kipppunkt` als Statuswechsel-App.

Die finale Rollenformel lautet:

> **B1: Heute nicht wieder verlieren.**  
> **B2: Epoche ist Los.**  
> **Der alte Euro: Zeit baut den Motor.**  
> **Depot-Kipppunkt: Der Motor wird Mitverdiener.**

Oder kürzer:

> **„Der alte Euro“ zeigt den Motor.  
> „Depot-Kipppunkt“ zeigt, wann der Motor das Auto zieht.**

Diese Rollenformel ist bindend.

---

## 1. Tokensparende Arbeitsweise

Bitte arbeite **pfadbasiert und differenziell**.

### Zuerst lesen

Lies zuerst diese Dateien:

- `/docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
- `/Apps/prokrastinations-preis/MINI_SPEC_FROM_HAUPTDOKUMENT.md`
- `/Apps/geburtsjahrlos/MINI_SPEC_FROM_HAUPTDOKUMENT.md`

Danach prüfe gezielt:

- `/Apps/**`
- `/docs/App-Fabrik/**`

Suche nach Übersichten, MOCs, Prioritätslisten, Statuslisten, Backlogs, Navigationsdateien, App-Zählungen, Slugs und Mini-Specs.

### Dann ändern

Ändere nur relevante Abschnitte. Keine freien Komplett-Rewrites, wenn punktuelle Änderungen reichen.

Die Zusatztexte liegen separat vor:

- `02_ZUSATZTEXT_MINI_SPEC_DER_ALTE_EURO.md`
- `03_ZUSATZTEXT_MINI_SPEC_DEPOT_KIPPPUNKT.md`
- `04_ZUSATZTEXT_B1_REWRITE_MARKTZEIT.md`
- `05_ZUSATZTEXT_B2_REWRITE_GEBURTSJAHRENLOS.md`

Nutze diese Zusatztexte als Ausgangsmaterial. Bitte nicht neu erfinden.

---

## 2. Nicht tun

- Kein App-Code.
- Keine Chart-Engine anfassen.
- Keine CSS-/Design-System-Arbeit.
- Keine Git-Operationen.
- Keine Commit-Message erzeugen.
- Keine Implementierungsdetails erfinden, die über die Spezifikation hinausgehen.
- Keine Steuer-, Inflations- oder Renditedebatten eröffnen, außer dort, wo es ausdrücklich verlangt ist.
- Keine neue „1 Million vs. 1.000 € pro Woche“-App anlegen.

---

## 3. Warum diese Änderung nötig ist

Die aktuelle App-Landschaft enthält Überschneidungen:

- B1 ist bisher als „Prokrastinations-Preis“ mit Verlustzähler formuliert.
- B2 enthält aktuell ein Szenario „Der beste Zeitpunkt war vor 10 Jahren“.
- B2 enthält außerdem einen Kindersparplan.
- B2 enthält einen Button „Was passiert, wenn ich 3 Jahre warte?“.
- Dadurch sagen mehrere Apps sinngemäß: „Früh anfangen lohnt sich.“

Das ist zu unscharf.

Nach der Bereinigung hat jede App genau einen Job:

| App | Job |
|---|---|
| B1 Marktzeit schlägt Timing | Heute ist der einzige Startpunkt, den du noch hast. |
| B2 Geburtsjahrlos | Deine Börsenepoche ist ein Los, keine Leistung. |
| Der alte Euro | So arbeitet Zeit im einzelnen Euro. |
| Depot-Kipppunkt | So wird daraus irgendwann ein Mitverdiener. |

---

## 4. Verbindliche Entscheidungen

### 4.1 1-Million-App ist verworfen

Die Idee „1 Million Euro sofort vs. 1.000 € jede Woche bis zum Tod“ wird **nicht weiterverfolgt**.

Grund:

- zu viele Freiheitsgrade
- Lotterie-/Lebenszeit-Charakter
- vermischt Kapitalstock, Cashflow, Konsumdisziplin, Lebenserwartung, Sicherheit und Rendite
- kein sauberer Finanzwesir-App-Kern

Falls diese Idee irgendwo als aktive App, Ergänzung oder offener Kandidat auftaucht: entfernen oder als verworfen markieren.

### 4.2 B1 übernimmt vollständig das „vor 10 Jahren / heute“-Motiv

B1 wird die App zum Motiv:

> **Der beste Zeitpunkt zu investieren war vor 10 Jahren. Der zweitbeste ist heute.**

Präziser Finanzwesir-Satz:

> **Du kannst nicht mehr vor 10 Jahren starten. Aber du kannst verhindern, dass heute in 10 Jahren wieder „vor 10 Jahren“ heißt.**

B1 ist die Marktzeit-App:

> **Warten nimmt dir Marktzeit.**

Das ist die zugängliche Fassung von:

> **Time in the market beats timing the market.**

### 4.3 B2 verliert das „vor 10 Jahren“-Motiv vollständig

Aus B2 müssen raus:

- „Hätte ich damals...“
- „Der beste Zeitpunkt war vor 10 Jahren. Was hättest du heute?“
- Opportunitätskosten des Zögerns
- Button „Was passiert, wenn ich 3 Jahre warte?“

Das gehört künftig zu B1.

### 4.4 B2 verliert den Kindersparplan vollständig

Option A ist entschieden:

> **Kein Kindersparplan in B2.**

B2 fokussiert ausschließlich auf:

> **rollierende 30-Jahres-Zeiträume mit inflationsbereinigten Realwerten.**

B2 zeigt nicht mehr, wie wichtig frühes Anfangen ist. Das übernehmen B1 und „Der alte Euro“.

B2 zeigt:

> **Wie unterschiedlich dieselbe 30-Jahres-Strategie je nach Börsenepoche ausging.**

### 4.5 Neue App „Der alte Euro“ ergänzen

Neue App:

- Name: `Der alte Euro`
- Slug: `der-alte-euro`
- Zielordner: `/Apps/der-alte-euro/`
- Rolle: Mechanik-Mini-App
- Block: wahrscheinlich F „Mechanismen verstehen“

Mini-Spec-Text steht in:

`02_ZUSATZTEXT_MINI_SPEC_DER_ALTE_EURO.md`

### 4.6 Neue App „Depot-Kipppunkt“ ergänzen

Neue App:

- Name: `Depot-Kipppunkt`
- Slug: `depot-kipppunkt`
- Zielordner: `/Apps/depot-kipppunkt/`
- Rolle: Statuswechsel-App
- Position: nach „Der alte Euro“, vor H1 Plan-Generator oder als Übergang zu H

Mini-Spec-Text steht in:

`03_ZUSATZTEXT_MINI_SPEC_DEPOT_KIPPPUNKT.md`

---

## 5. Neue Sequenz im App-Universum

Die neue Kette lautet:

```text
B3 Market-Timing-Simulator
→ Den perfekten Einstieg findest du nicht.

B1 Marktzeit schlägt Timing / Lieber heute als morgen
→ Du kannst gestern nicht retten, aber heute Marktzeit sammeln.

B2 Geburtsjahrlos
→ Startjahre und Börsenepochen sind Glück/Pech; du kontrollierst nicht die Epoche.

Der alte Euro
→ Ein früher Euro wird mit Zeit produktiver.

Depot-Kipppunkt
→ Viele produktive Euros werden irgendwann ein Mitverdiener.

H1 Plan-Generator
→ Jetzt konkret starten.
```

Kurzform:

```text
Nicht warten.
Akzeptieren, dass Epoche ein Los ist.
Verstehen, warum Zeit im einzelnen Euro wirkt.
Sehen, wohin das langfristig führen kann.
Jetzt konkret starten.
```

---

## 6. Gewünschte Dateiarbeit

Bitte prüfe und aktualisiere mindestens:

1. `/docs/App-Fabrik/ETF-Apps-Hauptdokument.md`
2. `/Apps/prokrastinations-preis/MINI_SPEC_FROM_HAUPTDOKUMENT.md`
3. `/Apps/geburtsjahrlos/MINI_SPEC_FROM_HAUPTDOKUMENT.md`
4. neue Mini-Spec für `/Apps/der-alte-euro/MINI_SPEC_FROM_HAUPTDOKUMENT.md`
5. neue Mini-Spec für `/Apps/depot-kipppunkt/MINI_SPEC_FROM_HAUPTDOKUMENT.md`

Zusätzlich vollständig prüfen:

- alle Unterverzeichnisse in `/Apps`
- alle Unterverzeichnisse in `/docs/App-Fabrik`
- alle Übersichten, MOCs, Prioritätslisten, Statuslisten, Backlogs, Index-Dateien oder Navigationsdateien, die App-Namen, Slugs, Funnel-Positionen oder App-Zählungen enthalten

Ziel:

- Keine veralteten Verweise auf B1 als reinen Verlustzähler.
- Keine Dopplung zwischen B1 und B2.
- Kein Kindersparplan in B2.
- Keine Phantom-App „1 Million vs. 1.000 €/Woche“.
- Keine neue App ohne Eintrag in passenden Übersichten.
- Keine veraltete App-Zählung.

---

## 7. App-Zählung

Aktueller Stand im Hauptdokument war zuletzt: 19 Apps.

Durch die Änderung:

- B1 wird umgebaut, zählt nicht neu.
- B2 wird entflechtet, zählt nicht neu.
- `Der alte Euro` kommt neu hinzu.
- `Depot-Kipppunkt` kommt neu hinzu.
- 1-Million-App wird nicht aufgenommen.

Wenn keine anderen Apps entfernt werden, steigt die Zahl von 19 auf 21.

Bitte alle Stellen prüfen, an denen die App-Zahl, Prioritätsliste oder Entwicklungsphasen genannt werden.

---

## 8. Harte Suchbegriffe für Konsistenzprüfung

Nach Änderungen bitte repo-weit oder mindestens in `/Apps` und `/docs/App-Fabrik` suchen nach:

```text
Prokrastinations-Preis
5 Jahre Warten
Warten kostet
Der beste Zeitpunkt war vor 10 Jahren
zweitbeste ist heute
Hätte ich damals
Was passiert, wenn ich 3 Jahre warte
Kindersparplan
Eltern starten bei Geburt
50 € monatlich
1 Million
1.000 € jede Woche
Depot-Kipppunkt
Der alte Euro
der-alte-euro
depot-kipppunkt
```

Nicht jeder Treffer ist falsch. Aber jeder Treffer muss geprüft werden:

- Gehört er noch zu B1?
- Muss er aus B2 raus?
- Ist er eine alte Dopplung?
- Ist er eine veraltete App-Zählung?
- Ist es ein zulässiger historischer Hinweis?

---

## 9. Konsistenzprüfung am Ende

Nach der Änderung bitte explizit berichten:

1. Wo wurde B1 umbenannt oder umgerahmt?
2. Wo wurde B2 entflechtet?
3. Wo wurden „Der alte Euro“ und „Depot-Kipppunkt“ ergänzt?
4. Wurden alle App-Zählungen aktualisiert?
5. Gibt es noch alte Textstellen mit:
   - „Prokrastinations-Preis“ als Verlustzähler?
   - „5 Jahre Warten kostet dich X“?
   - „Der beste Zeitpunkt war vor 10 Jahren“ in B2?
   - „Was passiert, wenn ich 3 Jahre warte?“ in B2?
   - Kindersparplan in B2?
   - 1-Million-App / 1.000 € pro Woche?
6. Gibt es verwaiste Verweise, fehlende Slugs oder widersprüchliche Funnel-Positionen?
7. Welche Dateien wurden geändert?
8. Welche offenen Fragen bleiben?

---

## 10. Ergebnisformat

Bitte liefere nach der Arbeit:

1. kurze Zusammenfassung der Änderungen
2. Liste geänderter Dateien
3. Liste bewusst nicht geänderter, aber geprüfter Dateien
4. offene Fragen, falls vorhanden
5. Hinweis, ob die Konsistenzprüfung bestanden ist

Keine Git-Operation. Git/Commit läuft später separat.
