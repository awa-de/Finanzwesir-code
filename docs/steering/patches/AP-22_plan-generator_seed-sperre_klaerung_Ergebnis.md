# AP-22 — Klärung plan-generator Seed-Sperre — Ergebnis

## Status

Status: GRÜN
Blocker: nein

## Kurzbefund

`plan-generator` (H1) ist laut Hauptdokument, MINI_SPEC und App-Mapping eindeutig als eigenständige Haupt-App klassifiziert: einziger Baustein von „Block H — Plan geben & CTA", Funnel-Abschlussstation nach Block G, Homepage-Funnel-Station 8 mit direktem Übergang zu „Abschluss: Fang klein an. Aber fang an." Die Seed-Sperre ist damit **nicht** durch Rollenunsicherheit begründet — die Rolle ist gut belegt. Die Sperre ist durch fehlende redaktionelle Substanz begründet: der einzige vorhandene Aufbau-Entwurf (5-Fragen-Reifegradtest + 3-Fragen-Konfigurator mit Beispiel-Output „Investiere 100 € monatlich in einen FTSE All World ETF. Fertig.") würde, unverändert in eine App_SPEC übersetzt, gegen die eigenen Nicht-Ziele des Seed-Blocks verstoßen (personalisierte Produktempfehlung ohne redaktionelle Freigabe, Anschein individueller Anlageberatung). Empfehlung: Rolle B (Funnel-Finale/Abschlussmodul), Sicherheit hoch. Nächster AP: Seed-Neufassung mit entschärftem, redaktionell abgesichertem Output-Modell — kein Ausschluss, keine Streichung.

## Ausgangspunkt

Vorgänger: AP-21
AP-21-Status: GRÜN
Offener Fall:

- plan-generator

Grund der Sperre laut Seed-Datei (§1 Quellenstatus / App-Block):

```text
Status: GESPERRT
Verteilungsstatus: Gesperrt
Vier Kernfelder (Zweck, Barriere, Glaubenssatz, Zielzustand) nur [Klärungsbedarf]-Platzhalter
```

## Vorprüfung / Git-Baseline

```text
git status --short (vor AP-22):
 M .claude/learning/session-log.md   ← bereits vor AP-22 vorhanden (Session-Start-Eintrag, nicht Teil von AP-22)

git log --oneline -5:
7104b77 docs(AP-20/20b/21): Steuerungsblock-Rollout Sonderbatch D ohne plan-generator + Seed-Provenienz-Review
fe7747d docs(AP-16/17/18): Steuerungsblock-Rollout Batch C + Memory-Integritätsfixes
ef4d6c8 docs(AP-14h/i): regulatorik-dashboard MINI_SPEC aus Seed neu gefasst
a2ddfeb docs(AP-14f/g): regulatorik-dashboard Identitätsanamnese + Seed-Fundament
83b3e2a docs(AP-14b-e): regulatorik-dashboard Arbeitsordner bereinigt

git diff --name-status (vor AP-22):
M	.claude/learning/session-log.md
```

- Repo ist nach dem AP-20/AP-20b/AP-21-Commit sauber, bis auf den bereits vor AP-22 vorhandenen Session-Start-Eintrag in `session-log.md`.
- Keine unerwarteten Änderungen an nicht erlaubten Dateien.

Pflichtdateien-Check (alle 4 vorhanden, `python`-Aufruf, UTF-8):

```text
OK Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md
OK Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md
OK docs/steering/patches/AP-20_steuerungsblock-rollout_sonderbatch-d_appspec-stoppwarnung_Ergebnis.md
OK docs/steering/patches/AP-21_review_sonderbatch-d-ohne-plan-generator_seed-provenienz_Ergebnis.md
```

## Gelesene Quellen

- `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` (plan-generator-Seed-Block Zeile 1031–1067, plus Abschnitt „5.3 Empfohlene Verteilungsreihenfolge")
- `Apps/plan-generator/MINI_SPEC_FROM_HAUPTDOKUMENT.md` (vollständig)
- `docs/steering/patches/AP-20_steuerungsblock-rollout_sonderbatch-d_appspec-stoppwarnung_Ergebnis.md` (vollständig)
- `docs/steering/patches/AP-21_review_sonderbatch-d-ohne-plan-generator_seed-provenienz_Ergebnis.md` (vollständig)
- `docs/App-Fabrik/ETF-Apps-Hauptdokument.md` — gezielt: Funnel-Diagramm (Zeile 13–49), Master-Prioritätsliste (Zeile 83), H1-Abschnitt „Block H: Finale & CTA" (Zeile 1039–1077), Phase-4-Tabelle (Zeile 1149–1159), Versionshistorie (Zeile 1172, Slug-Drift-Hinweis)
- `Apps/MINI_SPEC_MAPPING.md` (Zeile 35, 69 — Status- und Rollenspalte für H1/plan-generator)
- `docs/steering/BACKLOG.md` (AF-24-Eintrag, gezielte Grep-Suche)
- `NAVIGATION.md` (AP-04/AP-05-Zeilen zur historischen ROT-Einstufung von plan-generator, gezielte Grep-Suche)
- `docs/homepage/03-funnel-architektur.md` (Zeile 29–35, „Station 8: Plan-Generator")

Nicht gelesen (Scope-Verbot eingehalten): alle `Apps/*/APP_SPEC.md`, alle `*.html`, alle bereits erledigten MINI_SPECs außerhalb von plan-generator.

## Seed-Befund plan-generator

| Feld | Befund |
|---|---|
| Seed-Status | GESPERRT |
| Verteilungsstatus | Gesperrt |
| Zweck | `[Klärungsbedarf]` |
| Barriere | `[Klärungsbedarf]` |
| Glaubenssatz | `[Klärungsbedarf]` |
| Zielzustand | `[Klärungsbedarf]` |
| Klärungsfragen im Seed | 4, wortgleich mit den vier Kernfragen dieses AP (Zeile 1062–1065 der Seed-Datei) |
| Verteilungsreife | nein — Seed-Datei selbst benennt in §5.3 „plan-generator erst nach fachlicher Klärung" als letzten Punkt der Verteilungsreihenfolge |

Die Sperre ist **redaktionell begründet, nicht technisch und nicht rollenbedingt**: Rolle (H1, Haupt-App, Funnel-Finale) ist an drei unabhängigen Stellen (Hauptdokument, MINI_SPEC-Metadaten, App-Mapping) übereinstimmend dokumentiert. Was fehlt, ist eine geprüfte, redaktionell freigegebene Fassung von Zweck/Barriere/Glaubenssatz/Zielzustand, die den vorhandenen (aber riskanten) Rohentwurf ersetzt oder entschärft.

## MINI_SPEC-Befund plan-generator

- Titel/Kurzrolle: „H1 – Plan-Generator", früherer Arbeitstitel „ETF-Reifegrad-Test & Start-Konfigurator"
- Herkunft/Quelle: `docs/App-Fabrik/ETF-Apps-Hauptdokument.md`, Status „Roh-Mini-Spec aus Hauptdokument, noch nicht APP_SPEC"
- Vorhandene Inhaltssektionen: „Aufbau: Zwei Stufen" (Stufe 1 Reifegradtest, Stufe 2 Start-Konfigurator), „Mini-Spec-Metadaten" (Modulrolle: Haupt-App)
- Beschriebene Nutzeraufgabe: Selbsteinschätzung der Investitionsreife (5 Fragen), danach Konfiguration eines konkreten Startplans (Betrag, Verlusttoleranz, Komplexität)
- Beschriebene Inputs/Outputs: Input = 5+3 Fragenantworten (teils aus anderen Apps vorausgefüllt: A1-Verlusttoleranz); Output = ein einziger, konkreter Beispielsatz „Investiere 100 € monatlich in einen FTSE All World ETF. Fertig." + CTA „Jetzt umsetzen"
- Hinweise auf Funnel/Finale/Plan: „Funnel-Position: CTA / Abschluss der Heldenreise" (MINI_SPEC) bzw. „CTA / Abschluss des Funnels" (Hauptdokument) — durchgängig als letzte Station geführt, kein Waschzettel-Begriff im Text
- Warnzeichen für APP_SPEC-Drift oder Produktberatung: **ja, deutlich.** Der Output-Beispielsatz nennt einen konkreten ETF-Namen und einen konkreten Euro-Betrag als direkte Handlungsanweisung („Investiere X € in Y. Fertig."). Das ist strukturell nicht von einer individuellen Anlageempfehlung zu unterscheiden, wenn es 1:1 in eine APP_SPEC übernommen würde — genau das verbietet die Seed-Datei bereits in ihren „Nicht-Ziele"-Feldern („Keine Anlageberatung aus dem Nichts", „Keine Waschzettel-Logik ohne redaktionelle Freigabe").

## Repo-Hinweise

| Quelle | Hinweis | Gewichtung |
|---|---|---|
| `docs/App-Fabrik/ETF-Apps-Hauptdokument.md` Zeile 47–48 | Eigenes Funnel-Diagramm führt „[H] PLAN GEBEN & CTA / H1 Plan-Generator" als letzten, alleinstehenden Block nach Block G | harte Quelle |
| `docs/App-Fabrik/ETF-Apps-Hauptdokument.md` Zeile 83 | Master-Prioritätsliste: Plan-Generator = H1, Aufwand „🔥 Hoch", Wirkung „Hoch" | harte Quelle |
| `docs/App-Fabrik/ETF-Apps-Hauptdokument.md` Zeile 1045–1077 | Vollständiger H1-Abschnitt „Block H: Finale & CTA" — identischer Inhalt wie MINI_SPEC, keine abweichende Fassung | harte Quelle |
| `docs/App-Fabrik/ETF-Apps-Hauptdokument.md` Zeile 1172 | Versionshistorie: Slug wurde 2026-06-25 von `etf-reifegrad-finale` zu `plan-generator` umbenannt — reine Namenskonsolidierung, keine Rollenänderung | harte Quelle |
| `Apps/MINI_SPEC_MAPPING.md` Zeile 35, 69 | Führt plan-generator/H1 durchgängig als „Haupt-App", Status „✅ Erstellt" (App-Ordner vorhanden) | harte Quelle |
| `docs/homepage/03-funnel-architektur.md` Zeile 29–35 | Homepage-Funnel: „Station 8: Plan-Generator" unmittelbar vor „Abschluss: Fang klein an. Aber fang an." — bestätigt Finale-Rolle auch im Marketing-Funnel, nicht nur im App-Fabrik-Diagramm | harte Quelle |
| `NAVIGATION.md` Zeile 341–342 (AP-04/AP-05) | Historische Einstufung: AP-04-Inventar bewertete plan-generator als einzige ROT-App („kein steuerungsblock-ähnliches Material"), AP-05-Rollout-Plan reservierte dafür einen eigenen gesperrten AP-13 | harte Quelle (bestätigt: Sperre ist alt und bekannt, kein neues Problem) |
| `docs/steering/BACKLOG.md` Zeile 60 (AF-24) | Aktueller Backlog-Eintrag verengt AF-24 bereits exakt auf diesen Klärungsfall | harte Quelle (Auftragskontext) |
| `Apps/APP_STEUERUNGSBLOCK_SEEDS_repo_abgeglichen.md` Zeile 1147 | Seed-Datei selbst: „plan-generator erst nach fachlicher Klärung" als letzter Punkt der Verteilungsreihenfolge | harte Quelle |

Keine widersprüchlichen oder veralteten Hinweise gefunden. Alle Quellen stimmen in der Rollenzuordnung überein.

## Rollenprüfung

| Rolle | Spricht dafür | Spricht dagegen | Risiko |
|---|---|---|---|
| Eigenständige Haupt-App (isoliert nutzbar) | MINI_SPEC-Metadaten führen „Modulrolle: Haupt-App"; App-Mapping bestätigt | Inhalt ist rein funnel-abschließend, ergibt ohne vorherige Apps (Verlusttoleranz aus A1) wenig eigenständigen Sinn; als Solo-Embed schwach | mittel — würde isoliert beworben, ohne Kontext der vorherigen Reise, wirkt der Output wie freistehende Anlageempfehlung |
| Funnel-Finale / Abschlussmodul | Durchgängig in 3 unabhängigen Quellen (Hauptdokument-Diagramm, Homepage-Funnel, Master-Prioritätsliste Block H) als alleinstehende letzte Station geführt; „CTA/Abschluss" in beiden Quellen wortgleich verankert | keine belastbare Gegenevidenz gefunden | gering — Rolle ist die am besten belegte; Risiko liegt im Inhalt (Output-Formulierung), nicht in der Rollenzuordnung |
| Companion-/Hilfsmodul zu anderen Haupt-Apps | nutzt Vorbefüllung aus A1 (Verlusttoleranz) — technische Abhängigkeit vorhanden | Seed-Datei, Mapping und Hauptdokument führen es durchgängig als eigenständigen Block H, nicht als Anhang zu A1 oder einer anderen App | gering — Datenabhängigkeit ist kein Beleg für Companion-Status, alle anderen Companion-Apps (z. B. `investment-universum` als „Gegenperspektive zu C1") sind im Mapping explizit so gekennzeichnet; plan-generator ist es nicht |
| Prozess-/Output-Schritt außerhalb der App-Fabrik | keine Quelle stützt das | App-Ordner existiert, MINI_SPEC existiert, Mapping führt „✅ Erstellt", volle Einbettungs-Anforderungen (iframe, Mobile-First, CTA) gelten laut Hauptdokument „für jede App" ohne Ausnahme für H1 | gering — es gibt keinen Hinweis, dass H1 anders behandelt werden soll als andere Apps |
| Streichen / archivieren / später neu konzipieren | keine Quelle fordert das; im Gegensatz zu `passiv-paradox` (Altspur, umbenannt, außerhalb der Seed-Sektion geführt) ist plan-generator aktiv in der Seed-Sektion, im Mapping und im Hauptdokument als aktuelle App geführt | — | hoch, wenn fälschlich gestrichen: würde eine dokumentierte, mehrfach bestätigte Funnel-Station ohne Anlass entfernen |

## Entscheidung

Empfohlene Rolle: **B — Funnel-Finale / Abschlussmodul** (zugleich als eigenständige Haupt-App im App-Fabrik-Sinn geführt — beide Einstufungen widersprechen sich nicht, „Haupt-App" ist die Modul-Kategorie, „Funnel-Finale" ist die dramaturgische Position)
Sicherheit: hoch

Begründung: Drei unabhängige, unveränderte Quellen (Hauptdokument-Funnel-Diagramm, Hauptdokument-H1-Abschnitt, Homepage-Funnel-Architektur) plus zwei strukturelle Quellen (MINI_SPEC-Metadaten, App-Mapping) stimmen überein: plan-generator ist die letzte, alleinstehende Station des Funnels, keine Anhängsel-Rolle. Die Seed-Sperre widerspricht dem nicht — sie betrifft nicht die Rolle, sondern die fehlende redaktionelle Absicherung des Inhalts (siehe Klärungsfrage 3).

## Vier Kernfragen

### 1. Wofür existiert plan-generator?

Kurzantwort: Um den Nutzer am Ende des gesamten Entscheidungs-Funnels von diffusem Wissen zu einer einzigen, konkreten, klein dimensionierten Handlung zu führen — nicht um eine neue Blockade zu lösen, sondern um die bereits abgebauten Blockaden in einen Abschluss zu überführen.
Begründung: Hauptdokument führt H1 explizit als „Block H — Plan geben & CTA", nach Block G (systemkritische Einwände), als letzten Schritt. MINI_SPEC-Stufe-1 fragt gezielt ab, ob vorherige Blockaden (Verlusttoleranz aus A1, Timing-Glaube aus B3, Diversifikationsverständnis aus C2, ETF-Namen-Lesekompetenz aus D1) bereits abgebaut sind.
Risiko: Wird plan-generator isoliert (ohne die vorherige Funnel-Reise) verstanden oder beworben, verliert die Existenzberechtigung ihre Grundlage — die App setzt implizit vorherige Klärungen voraus, die sie selbst nicht liefert.
Konsequenz für Seed: Zweck-Feld sollte die Abhängigkeit von vorherigen Funnel-Stationen explizit benennen, nicht nur „Startplan geben" behaupten.

### 2. Welche Barriere soll plan-generator entfernen?

Kurzantwort: Die Lähmung durch Überinformation am Ende der Reise — der Nutzer hat viele Einzel-Erkenntnisse gesammelt, aber keinen einzigen nächsten Schritt vor Augen.
Begründung: Der MINI_SPEC-Output ist bewusst auf einen einzigen Satz reduziert („Investiere 100 € monatlich in einen FTSE All World ETF. Fertig."), nicht auf eine erneute Analyse. Stufe 1 filtert zusätzlich Nutzer heraus, die „sich selbst blockieren", und schickt sie gezielt zurück in den Funnel statt in Stufe 2.
Risiko: Wenn diese Barriere („zu viel Wissen, kein Schritt") nicht klar von einer Anlageberatungs-Erwartung abgegrenzt wird, kippt die App leicht in „ich bekomme hier eine für mich passende Empfehlung" — genau das Muster, das die Seed-Nicht-Ziele verbieten.
Konsequenz für Seed: Barriere-Feld sollte „Entscheidungslähmung nach Informationsüberfluss" von „fehlende individuelle Beratung" scharf trennen.

### 3. Was darf plan-generator ausdrücklich nicht tun?

Kurzantwort: Keine individualisierte Produkt- oder Betragsempfehlung als scheinbare Beratung ausgeben; kein automatisches Waschzettel-Ergebnis ohne redaktionelle Freigabe der zugrundeliegenden Logik.
Begründung: Der bestehende Rohentwurf tut genau das in Beispielform („Investiere 100 € … in einen FTSE All World ETF"). Das ist ein Musterbeispiel, aber ohne redaktionelle Einordnung liest es sich wie ein personalisiertes Ergebnis mit echtem Produktnamen und echtem Betrag. Die Seed-Nicht-Ziele („Keine Anlageberatung aus dem Nichts", „Keine Waschzettel-Logik ohne redaktionelle Freigabe") sind exakt auf dieses Risiko zugeschnitten.
Risiko: Das ist der zentrale Grund für die Sperre. Eine ungeklärte Verteilung würde dieses Risiko strukturell in die App-Fabrik tragen, bevor eine redaktionelle Entscheidung getroffen wurde, wie „konkret aber nicht beratend" umgesetzt wird (z. B. generische Musterportfolios statt personalisierter ETF-Empfehlung, klare Kennzeichnung als Beispiel statt Ergebnis).
Konsequenz für Seed: Dieses Nicht-Ziel ist bereits im Seed vorhanden und sollte unverändert bestehen bleiben — es ist kein Korrekturbedarf, sondern der Kern der Sperre.

### 4. Bleibt plan-generator Teil der App-Fabrik oder wird er gestrichen / verschoben / später separat behandelt?

Kurzantwort: Bleibt Teil der App-Fabrik als eigener Haupt-App-Ordner (H1) — keine Streichung, keine Verschiebung in ein Companion-Modul.
Begründung: Fünf unabhängige, unveränderte Quellen (Hauptdokument-Diagramm, Hauptdokument-H1-Abschnitt, Homepage-Funnel, MINI_SPEC-Metadaten, App-Mapping) führen plan-generator durchgängig als aktive, geplante Haupt-App. Anders als bei der Altspur `passiv-paradox` (umbenannt, außerhalb der Seed-Sektion, mit expliziter „nicht verteilen"-Notiz wegen fehlenden App-Ordners) existiert für plan-generator ein realer App-Ordner mit Inhalt, der lediglich redaktionell nicht verteilungsreif ist.
Risiko: Eine Streichung würde eine mehrfach dokumentierte, strukturell wichtige Funnel-Station (Abschluss nach 18 vorherigen Apps) ohne fachlichen Anlass entfernen.
Konsequenz für Seed: Status bleibt vorerst GESPERRT bis zur redaktionellen Neufassung (AP-23), aber die vier `[Klärungsbedarf]`-Platzhalter können jetzt durch die in diesem Protokoll erarbeiteten Antworten ersetzt werden — als Vorschlag, nicht als Write in diesem AP.

## Vorschlag für nächsten AP

**Variante 1** ist die zutreffende Empfehlung:

AP-23 — Seed-Neufassung `plan-generator` als echter Steuerungsblock-Kandidat. Kernaufgabe: die vier `[Klärungsbedarf]`-Felder durch redaktionell geprüfte Inhalte ersetzen (Entwurf siehe unten), UND eine explizite Entscheidung zum Output-Format treffen (generisches Musterbeispiel mit klarer „das ist ein Beispiel, keine Empfehlung"-Kennzeichnung vs. redaktionell kuratierte, aber weiterhin nicht-individualisierte Musterportfolio-Logik). Erst danach kann der Status von GESPERRT auf verteilungsreif wechseln und der reguläre Steuerungsblock-Rollout (analog Batch A–D) für plan-generator nachgezogen werden.

Nicht zutreffend:
- Variante 2 (dauerhaft gesperrt/Archivierung) — keine Quelle stützt eine Streichung.
- Variante 3 (außerhalb Standard-Rollout separat konzipieren) — plan-generator durchläuft denselben Mini-Spec→Seed→Steuerungsblock-Mechanismus wie alle anderen Apps, es gibt keinen strukturellen Grund für einen Sonderprozess außerhalb des bestehenden Tools.
- Variante 4 (weitere Recherche nötig) — die Quellenlage zur Rollenfrage ist bereits eindeutig; offen ist nur die redaktionelle Feinausarbeitung des Outputs, kein weiterer Rechercheaufwand.

## Falls Seed-Neufassung empfohlen wird: Entwurf nur als Vorschlag

Nicht in Seed-Datei geschrieben.

```text
Diese App existiert, um:
den Nutzer am Ende der Entscheidungs-Reise von gesammeltem Wissen zu einer einzigen,
klein dimensionierten Handlung zu führen.

Zu entfernende psychologische Barriere:
Entscheidungslähmung durch Informationsüberfluss nach Durchlaufen mehrerer Apps —
"ich weiß jetzt viel, aber nicht, was ich als Erstes tun soll."

Falscher Glaubenssatz vorher:
"Ich brauche noch mehr Wissen, bevor ich anfangen kann."

Zielzustand nach der App:
"Ich habe einen konkreten, klein dimensionierten ersten Schritt vor Augen und starte ihn."

Offener redaktioneller Punkt (nicht Teil dieses Entwurfs, gehört in AP-23):
Wie der Beispiel-Output ("Investiere X € in ETF Y") so gerahmt wird, dass er nicht als
individuelle Anlageempfehlung wirkt (z. B. durchgängige Beispiel-Kennzeichnung, generische
statt konkrete ETF-Namen, oder redaktionell freigegebene Musterportfolio-Logik).
```

## Scope-QA

Nicht geändert / nicht angefasst:

- Seed-Datei unverändert
- plan-generator MINI_SPEC unverändert
- keine APP_SPEC geändert
- keine HTML-Datei geändert
- keine App gebaut
- kein Commit erzeugt

Bestätigt per `git status --short` / `git diff --name-status` nach Schreiben dieses Protokolls (siehe unten).

## Bewertung

### GRÜN-Kriterien

- Seed-Sperre real anhand der Seed-Datei geprüft — erfüllt
- plan-generator MINI_SPEC vollständig gelesen — erfüllt
- relevante Repo-Hinweise gezielt gesucht (Hauptdokument, Mapping, Homepage-Funnel, NAVIGATION, BACKLOG) — erfüllt
- vier Kernfragen konkret beantwortet — erfüllt
- Rollenentscheidung getroffen (B, Sicherheit hoch) — erfüllt
- nächster AP klar empfohlen (AP-23, Variante 1) — erfüllt
- keine Datei außer diesem AP-22-Protokoll verändert — erfüllt

Alle GRÜN-Kriterien erfüllt.

### GELB-Gründe, falls zutreffend

Keine.

### ROT-Gründe, falls zutreffend

Keine.

## Ausdrücklich nicht nächster AP

- APP_SPEC
- App-Bau
- HTML-Analyse
- AP-14j
