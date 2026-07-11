---
chronik_id: CHRONIK-2026-07-10-ci-kette-abschluss
datum: 2026-07-10
projekt: finanzwesir
thema: ci-kette-abschluss
beteiligte: [nutzer, claude]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: abgeschlossen
quellenlage: vollstaendiger-faden
schlagworte: [annahme-verworfen, richtungswechsel, praezisierung-durch-gegenfrage]
---

# Chronik: Steuerung der CI-Kette bis zum Abschluss und Doku-Korrektur

**Hauptgegenstand:** Ein Steuerungsfaden führte die CI-Pool/Tailwind-Farbkette des Projekts Finanzwesir 2.0 über die Arbeitspakete kdr14, 17, 17b, 17c, 18 und 19 zum Abschluss. Das steuernde LLM schnitt Startprompts für ein ausführendes LLM (Claude Code), prüfte deren Rückläufe gegen die realen Dateien, korrigierte Doku-Falschaussagen und bereitete einen Nachfolgefaden vor.

## Ausgangslage

Der Faden begann mit der Aufforderung, zwei Dateien zu lesen: eine Übergabekapsel (`AP-prokrast-15-16`) und `TAKTISCHER_STARTPROMPT_OPERATIVE_LLM_ARBEIT.md`. Es war zunächst kein Projektordner verbunden; ein UNC-Pfad wurde abgelehnt, woraufhin der Ordner `Finanzwesir 2.0` über einen Auswahldialog verbunden wurde. Die Kapsel wies die Rolle zu: steuerndes LLM (Opus), das APs schneidet und Rückläufe gegen die reale Datei prüft. Die Farbkette 15a–16c galt als committed und abgenommen.

## Chronologischer Verlauf

### AP-kdr14 — Spec-Wortlaut-Nachführung
Ein Startprompt für ein Sonnet-Modell wurde gebaut, tokensparsam. Eine Grep-Anamnese ergab, dass der Kapsel-Hinweis „alte Token-Namen" nicht zutraf: `--color-petrol`/`--color-text` existierten real in `tokens.css`; nur Quellort (`screen.css` → `tokens.css`) und Status waren veraltet. Der Prompt wurde zunächst nach `docs/steering/patches/` gelegt; auf Nutzerhinweis nach `Archiv/local/muss noch eingeordnet werden/` verschoben.

### Rücklauf-Prüfung kdr14
Der Rücklauf schrieb die Zahl „19/19" in die Spec. Die Prüfung gegen die Dateien zeigte: „19/19" war durch das 16c-Protokoll belegt, widersprach jedoch dem Kontrakt („20 Properties"). Festlegung: die Zahl aus der Spec entfernen und qualitativ belegen („Null-Delta-QA, AP-16c"); die Diskrepanz 20-vs-19 als `AP-prokrast-16-FOLLOWUP-B` im Backlog vermerken.

### AP-17 — Pilot-Migration prokrastinations-preis
Anamnese: `app.css` referenzierte `var(--fw-color-*)` mit hartcodierten Fallbacks; `app.test.html` lud nur `app.css` + Chart.js-CDN, kein Tailwind, keine `tokens.css`. Der AP wurde zweiphasig geschnitten (Anamnese/Mapping → STOP → Write), Modell Opus. Der Rücklauf machte fünf Wertdrifts statt der im Prompt erwarteten einen sichtbar und einen Font-Konflikt (Kontrakt §9). Fünf Forks wurden vorgelegt; nach Verifikation gegen `tokens.css` entschied der Nutzer das empfohlene Paket (1=A, 2=vertagt, 3=ja, 4=Petrol, 5=Font nicht migrieren). Die Umsetzung migrierte 24 Farb-Referenzen; Nutzer-Live-Abnahme und ein Konsolen-ΔE-Check bestätigten die Auflösung. AP-17 wurde committed.

### AP-17b / AP-17c — QA-Doku
Für `QA_TEST_CASES.md` wurde eine Testgruppe N geschnitten. Der Nutzer korrigierte, dass der Prompt selbsttragend sein müsse statt einen externen taktischen Startprompt vorauszusetzen; der Prompt wurde angepasst. Der Rücklauf ergänzte Gruppe N und meldete eine vorbestehende Lücke: `Gruppe P` fehlte in der Übersichtstabelle. AP-17c synchronisierte die Übersicht.

### AP-18 — Claims-vs-Files-Review
Ein unabhängiges Review (Opus, mit Selbst-Identifikation als Schritt 0) ergab Gesamturteil GELB: alle acht load-bearing Behauptungen belegt; Property-Zahl geklärt als 19 gelesen in 20 Tokens (`linesDark` abgeleitet). Es benannte drei Befunde als aktive Falschaussagen bzw. Ungenauigkeiten: TC-N05/Protokoll bezeichneten die `screen.css`-Bindung als „Engine-intern", obwohl `screen.css` das Ghost-Produktions-Stylesheet ist; der Abnahme-Harness ist gitignored; eine NAVIGATION-Regel war zu absolut. Fünf Folge-APs wurden empfohlen.

### AP-19 — Abschluss-Korrektur
Die Falschaussagen (F-1 Kontrakt-Zahl, F-2 TC-N05 + Protokoll, F-3 NAVIGATION + `screen.css`-Kopf, F-5 Spec-Wort) wurden in einem AP gebündelt. Der Rücklauf machte sichtbar, dass die im AP-18-Protokoll behauptete zweite Fundstelle „HOOK-META" keine §-Referenz trug; die falsche §8-Referenz existierte nur in `BACKLOG.md:37`. `PROJECT-STATUS.md` wurde nicht angefasst. Nach Prüfung der sechs Diffs wurde eine Formulierung im `screen.css`-Kommentar neutralisiert, um keine neue Absolut-Aussage einzuführen. AP-17–19 wurden per Abschluss-Ritual committed.

### Abschluss und Nachfolgefaden
Es wurde festgestellt, dass die App-Farben CI-konform sind, die Fonts jedoch nicht. Der Nutzer straffte den Fahrplan. Eine Übergabekapsel wurde erstellt, dann auf Nutzerwunsch auf reinen Inhalt reduziert. Drei im Faden etablierte Konventionen wurden in den taktischen Startprompt aufgenommen (V3.1).

## Wendepunkte

Verbindung des Ordners per Auswahldialog nach UNC-Ablehnung. Verlegung der Startprompt-Ablage nach `Archiv/local/…`. Einführung der Konvention „selbsttragende Prompts" (Nutzer-Korrektur). AP-17-Forks (fünf Drifts, Font-Konflikt) → Zweiphasen-Schnitt. AP-18-Urteil GELB → Doku-Korrektur-Kette. Straffung des Fahrplans (Fonts zuerst, Tailwind per CDN, kein Ghost).

## Entscheidungen und Festlegungen

- Startprompts selbsttragend, Ablage `Archiv/local/…`, Selbst-ID bei Modellwechsel — am Ende in taktischen Startprompt V3.1 übernommen (gültig).
- Property-Zahl: 19 gelesen in 20 Tokens (gültig; FOLLOWUP-B archiviert).
- AP-17-Forks wie oben (gültig).
- Fahrplan: Fonts → Tailwind (CDN) → Design; T1-Build zuletzt; Ghost-Auslieferung entfällt vorerst; TESTENV-1 parallel (gültig).
- Neuer Steuerungsfaden mit Inhaltskapsel + taktischem Startprompt (gültig).

## Irrwege, Schleifen und verworfene Ansätze

- „19/19" in der Spec: geschrieben, dann entfernt, weil es dem Kontrakt widersprach; führte zu FOLLOWUP-B, später durch AP-18/19 aufgelöst.
- Die Formulierung „keine Ghost-/Prod-Bindung / Engine-intern" stammte aus dem AP-17b-Prompt des Steuerungsfadens; von AP-18 als Falschaussage benannt, in AP-19 korrigiert.
- Die AP-18-Behauptung zu „HOOK-META" war selbst ungenau; der AP-19-Rücklauf machte das sichtbar und ließ `PROJECT-STATUS.md` unangetastet.
- Erste Übergabekapsel (mit Konventionen) → durch reine Inhaltsfassung ersetzt.
- Annahme, der Tailwind-Produktions-Build (T1) sei Voraussetzung für die Design-Arbeit → verworfen; CDN genügt.
- Erwartung „Null-Delta außer muted" (AP-17-Prompt) → durch fünf reale Drifts ersetzt.

## Erzeugte Artefakte

- Startprompts kdr14, 17, 17b, 17c, 18, 19 (final, abgearbeitet).
- Übergabekapsel `UEBERGABE_…_app-design_2026-07-10.md` (final, Inhaltsfassung).
- Backlog-Einträge: FOLLOWUP-B (angelegt, dann archiviert), FONT-followup, 17b-QA, Epic TESTENV-1 (gültig).
- `TAKTISCHER_STARTPROMPT_…` V3.1 (final).

## Sachliche Erkenntnisse

Gesicherter Stand: Der Pilot rendert im Testkontext über Fallback-Werte; `tokens.css` liegt transitiv über den `screen.css`-`@import` in der Ghost-Kaskade (AP-16-Design); `FwTheme.init()` liest 19 `--color-*` (20. `linesDark` abgeleitet). Arbeitsannahme: Tailwind-CDN genügt bis zum End-Build. Spätere Korrektur: die 20-vs-19-Zahl im Kontrakt.

## Offene Punkte am Ende

CI-Fonts nicht in der App (erster AP des Folgefadens). Design-/Tailwind-Schicht (DS-014, AF-21/22/23). TESTENV-1, T1-Build, Ghost-Auslieferung vertagt. Startprompt-Dateien in `Archiv/local/…` noch einzusortieren.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: wiederkehrende Notwendigkeit, Protokoll-Behauptungen des ausführenden LLM gegen die reale Datei zu korrigieren (kdr14 „19/19", AP-17b Ghost-Formulierung, AP-18 „HOOK-META"); zwei der später korrigierten Ungenauigkeiten entstanden in der Prompt-Formulierung des Steuerungsfadens selbst.

## Bewusst ausgelassen

Wiederholte Sandbox-/Shell-Fehlversuche und Grep-Verifikationen ohne eigenen Zustandswechsel, Routine-Bestätigungen, der Volltext einzelner Prompts, Begrüßungen.
