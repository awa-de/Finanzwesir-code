# Fable-Prompt: Tailwind-App-Baukasten — Designentscheidung (V3, Fable-getunt)

Iteration von V2. Substanz und alle Grenzen unverändert übernommen; die
Ausgabe-Regie entschärft (keine Pflicht-Gliederung, keine Gate-Zeremonie, kein
fixes Chat-Template, Redundanz konsolidiert). Grund: Für Fable senkt zu viel
Ablauf-Vorschrift die Qualität — Grenzen und Ziel steuern, nicht Formularzwang.

Betrieb: Modell `claude-fable-5`. Effort wird über die Cowork-/API-Konfiguration
gesetzt (nicht im Prompt-Körper), Empfehlung `high`. Thinking ist bei Fable
immer an.

---

## 1. Start und Quelle

Verbinde dich mit dem Projektverzeichnis Z:\Documents\Nextcloud\Finanzwesir 2.0.

Lies zuerst vollständig:
`docs/steering/patches/AP-tailwind-01_befund-und-forschung_Ergebnis.md`

Das ist die maßgebliche Anamnese. Wiederhole die Repository-Inventur nicht und
mach keine breite Webrecherche. Prüfe reale Dateien nur gezielt, wenn du eine
konkrete Aussage aus dem Befund gegen den Bestand absichern musst.

Der GELB-Status des Befunds beruht allein darauf, dass die Ghost-`.hbs`-Auslieferungskette
im Repository nicht verifizierbar ist. Das ist ein bekannter Infrastrukturpunkt
und kein Blocker für diese Designentscheidung. Verbring keine Zeit damit, den
fehlenden Ghost-Build zu rekonstruieren.

Fasse vorhandene Arbeitskopie-Änderungen nicht an. Kein Commit, kein Push, kein
Abschlussritual.

## 2. Stand

- Apps und Chart-Engine funktionieren fachlich und technisch.
- CI-Farben und Fonts sind final definiert und über `tokens.css` plus Theme-Bridge
  eingebunden. `tokens.css` ist die Single Source of Truth.
- Tailwind ist als strukturelles Fundament (Spacing, Radien, Borders, Schatten,
  responsive Utilities) verbindlich beschlossen — das ist nicht mehr offen.
- Im realen App-Fabrik-Code ist Tailwind strukturell noch nicht umgesetzt:
  `prokrastinations-preis` nutzt eigene `fw-app__*`-Klassen, das Chart-Engine-DOM
  nutzt eigene `fw-chart-*`-Klassen, die drei Standalone-Prototypen haben je ein
  eigenes CI-fremdes System.
- Wichtig zur Genauigkeit: Der Befund weist nach, dass in der App-Fabrik **keine
  aktive Tailwind-CDN-Einbindung** existiert. Die CDN-Verfügbarkeit für Konzept-
  und Pilotphase ist eine **Nutzer-Laufzeitannahme**, kein belegter Repository-Fakt.
  Behandle sie als solche.
- Die spätere lokale, minimierte Produktionsintegration ist ein eigener Folge-AP
  und wird hier nicht entworfen. Trotzdem müssen alle vorgeschlagenen Klassen
  schon jetzt build-sicher spezifiziert sein (vollständige Klassenstrings, nie
  dynamisch zusammengesetzt).

## 3. Produktkontext und Scope

Die Finanzwesir-App-Fabrik umfasst über 25 interaktive Finanz-, Lern-, Rechner-
und Story-Apps, eingebettet als HTML-Cards in Ghost-Artikel. Das ist **keine
SaaS-Admin-Konsole und kein Dashboard-Produkt**. Nutze die gestalterische
Intelligenz aus Tailwind Application UI und Refactoring UI, aber übertrage keine
Dashboard-Chrome, Sidebar-Logik oder überbordende Kartenlandschaft.

Ghost ist nur **Host-Kontext**: Artikel und App dürfen sich nicht gegenseitig
beeinflussen, App-Container müssen in redaktionelle Seiten passen. Das
Content-System (`fw-janitor.js`) und die globale Website werden nicht gestaltet.

Im Scope: die gemeinsame App-Fabrik-Schnittstelle, `prokrastinations-preis` als
Referenz-App, das DOM-Chrome der Chart-Engine, die visuelle Rahmung von Linie,
Balken und Torte. **Nicht** im Scope: das Canvas-Innenleben der Charts.

## 4. Ziel

Entwickle einen belastbaren Tailwind-App-Baukasten, der als Design- und
Implementierungsvertrag für über 25 Apps dienen kann. Maßstab:

> Gestaltung unterstützt Aufgabe, Lesefluss und innere Bewegung der App. Sie ist
> weder Dekoration noch eine möglichst große Sammlung von Cards.

## 5. Nicht verhandelbare Leitplanken

Bereits entschieden, nicht erneut öffnen:

- CI-Farben und CI-Fonts bleiben unverändert; `tokens.css` bleibt SSoT.
- Struktur (Spacing, Radien, Borders, Standardschatten, Responsive) kommt aus
  Tailwind-Default-Skalen. Kein zweites allgemeines Spacing-/Radius-/Border-/Shadow-System
  daneben. Keine neuen freien Designwerte, wo Tailwind-Defaults oder CI-Tokens den
  Bedarf decken.
- Die benannten Zusatzstufen `shadow-soft` und `shadow-hover` dürfen als bereits
  freigegebene Ergänzungen verwendet werden.
- App-spezifische Mechanik (Card-to-Point-Flug, Rubikon-Position, Timings) bleibt
  app-lokal unter `--fw-*` und wird nicht zum allgemeinen Primitive verallgemeinert.
- Canvas-Zeichnung, Chart.js-Datasets, Scales, Plugins, Marker, Tooltips innerhalb
  von Chart.js sind kein Tailwind-Scope.
- Testharness-Chrome bleibt getrennt von Produktions-UI.
- Vanilla JavaScript bleibt; kein Frameworkwechsel. Headless UI dient nur als
  Interaktions- und A11y-Referenzmuster, nicht als still eingeführte React-/Vue-Abhängigkeit.
- Keine dynamisch zusammengesetzten Klassennamen (`bg-${tone}-500`).
- Mehrfachinstanz-Fähigkeit, SafeDOM, A11y, Fokusführung und Reduced Motion bleiben
  erhalten.
- Keine neue Library und kein Tailwind-Plugin ohne ausdrückliche Nutzerentscheidung.

## 6. Deine Rolle

Handle als verantwortlicher Design-System-Lead, nicht als neutraler Ideensammler.
Wo der Befund ausreicht, entscheide und empfehle — sammle nicht nur Optionen.

Frage nicht zurück, nur weil ein Detail unvollständig belegt ist. Nutze eine
ausdrücklich markierte, reversible Arbeitsannahme, sofern sie die Entscheidung
nicht verfälscht. Frag nur bei einem echten Blocker. Der bekannte `.hbs`-Gap ist
kein Blocker.

## 7. Kernaufgabe: Decision Docket D-01 bis D-16

Beantworte jede Entscheidungsfrage `D-01` bis `D-16` aus Abschnitt 13 der
Befunddatei. Keine ID auslassen oder still zusammenlegen.

Für jede Frage liefere: deine Empfehlung, eine knappe Begründung, die wichtigste
verworfene Alternative, die Wirkung auf über 25 Apps, und ob der Nutzer danach
noch entscheiden muss. Ob du das als Tabelle oder als Fließtext je Entscheidung
darstellst, entscheidest du nach Lesbarkeit.

Bei einer echten Fehlinformation, die eine belastbare Empfehlung unmöglich macht,
markiere die Entscheidung als blockiert und benenne exakt, welche Information
fehlt. Der `.hbs`-Gap allein rechtfertigt das nicht.

## 8. Baukasten-Struktur (Orientierung, nicht Korsett)

Denke den Baukasten in Ebenen und mach die Besitzgrenzen explizit — ein Primitive
darf nicht still App-Mechanik übernehmen:

- **CI (kanonisch):** Farben, Fonts, Zusatzschatten, semantische Rollen.
- **Tailwind-Struktur:** Spacing, Layout, Grid/Flex, Radius, Border, Standardshadow,
  Responsive-/Zustands-/Fokus-/Reduced-Motion-Varianten.
- **Gemeinsame App-Primitiven:** App-Shell, Panel, Card, Stat/KPI, Button-Familie,
  Control-Group, Slider-Field, Disclosure, Callout/Assumptions, Status-State,
  Chart-Chrome.
- **Kompositionen:** Screen-Flow, KPI-Ergebnisgruppe, Chart mit Toolbar und Legende,
  Stationen-/Story-Bereich, Abschluss-CTA.
- **Lokale App-Mechanik:** Card-to-Point-Flug, Rubikon-Position, Spezial-Timings.

Für jedes gemeinsame Primitive gehören in den Vertrag: Zweck und Abgrenzung
(„nicht verwenden für"), semantisches HTML, das vollständige Tailwind-Klassenrezept
(Literalstrings), erlaubte Varianten, Interaktionszustände (hover/focus-visible/
active/disabled), responsives Verhalten, A11y-Vertrag, die Surface-Regel „Abstand
> Flächenton > Schatten > Border zuletzt", der Besitzer und ein konzeptioneller
Migrationshinweis (kein Code).

## 9. Chart-Grenze

Entwirf nur das Tailwind-fähige DOM-Chrome: Außencontainer, Titel, Toolbar/Segmented
Controls, Legende, große Kennzahl, Loading/Error/Empty, Popover-/Dialog-Rahmung,
Caption. Ändere nicht: Chartdaten, Diagrammsemantik, Linien-/Balken-/Tortenlogik,
Scales, Canvas-Plugins, Marker, Annotationen, Chart.js-Tooltips. Die drei Beispiele
sollen zeigen, wie **derselbe DOM-Vertrag** unterschiedliche Chart-Typen trägt.

## 10. Liefergegenstände

Genau zwei neue Dateien, keine bestehende ändern:

```
docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md
docs/steering/design/TAILWIND-APP-BAUKASTEN_VISUAL-BOARD_V0-1.html
```

**Konzeptdokument** (Kopfstatus: `ENTWURF — NICHT FREIGEGEBEN — KEIN PRODUKTIONSCODE`).
Gliedere es so, wie das Material es verlangt. Es sollte mindestens abdecken:
Empfehlung und Grundarchitektur, Ebenen- und Besitzmodell, die Antworten D-01–D-16,
die Card-/Panel-/Surface-Taxonomie, die Primitive-Verträge, die Spacing-/Radius-/
Border-/Shadow-Zuordnung, Buttons/Controls, den Responsive-Vertrag, die App↔Chart-DOM-Schnittstelle,
den A11y-Vertrag, die build-sichere Klassenkonvention, die Anwendung auf
`prokrastinations-preis` und auf Linie/Balken/Torte, die bewusst lokalen Ausnahmen
und die offenen Nutzerentscheidungen. Reihenfolge und Feingliederung sind deine
Entscheidung.

**Visual Board** — statisches HTML, klar als `NON-PRODUCTION DESIGN BOARD`
gekennzeichnet, lokal öffenbar, ohne App-/Engine-JavaScript. Es darf für diesen
Konzeptnachweis Tailwind per CDN laden (keine Aussage über die spätere Produktion)
und muss CI-Farben und Fonts aus den Tokens übernehmen oder exakt referenzieren —
keine neuen freien Farben. Zeige mindestens: App-Shell in S/M/L; die
Prokrastinations-App als zusammenhängenden Flow (Slider, Story-/Stationen-Panel,
KPI-Gruppe, Chart-Bereich, Annahmen, Primär-/Sekundäraktion); das Chart-DOM-Chrome
für Linie/Balken/Torte (Innenleben nur als statischer Platzhalter); die
Primitive-Zustände (Default/Hover/Focus-visible/Active/Disabled/Loading/Empty/Error);
und die Trennungslogik (gutes Panel/Card-Beispiel, bewusst vermiedenes Card-in-Card,
„Abstand vor Border"). Die im Board verwendeten Komponenten müssen mit dem
Konzeptdokument übereinstimmen.

## 11. Nicht-Ziele (Sammelstelle)

Nicht tun: bestehenden Produktions- oder Testcode ändern; `app.css`/`app.js`/
`screen.css`/`tokens.css`/Engine-/Testdateien anfassen; Tailwind lokal installieren
oder bundeln; die Ghost-`.hbs`-Integration oder die CDN-/Build-Frage lösen; das
Chart-Innenleben umgestalten; alle 25 Apps migrieren; die Standalone-Prototypen
umbauen; globale Website-/Content-Komponenten gestalten; CI-Farben oder Fonts
ändern; neue freie Designwerte, Libraries oder Plugins einführen; einen Folge-AP
selbst starten; committen oder pushen.

## 12. Selbstprüfung vor dem Melden

Zwei Dinge, die zählen — prüfe sie ehrlich, keine Zeremonie:

1. **Scope:** Nur die zwei festgelegten Dateien sind neu. Vorbestehende Änderungen
   separat nennen und nicht angefasst. (Falls dir Shell-Werkzeuge zur Verfügung
   stehen, ist `git status --short` der schnelle Nachweis.)
2. **Datei-Wahrheit:** Lies beide neuen Dateien vom Datenträger neu, bevor du Status
   meldest. Behaupte keine Browser- oder Screenreader-Prüfung, die du nicht
   durchgeführt hast. Sind D-01–D-16 jeweils genau einmal als Entscheidung
   beantwortet?

## 13. Ausgabe

Führe mit dem Ergebnis: die empfohlene Grundarchitektur, die beiden erzeugten
Dateien, ob D-01–D-16 vollständig beantwortet sind, welche Nutzerentscheidungen
offen bleiben, und ob du irgendwo von den Leitplanken abweichen musstest. Details
und Begründung danach. Dann stoppen — weiter nur nach Nutzer-OK. Der nächste
richtige Schritt ist die Abnahme von Konzept und Board, nicht die Implementierung.
