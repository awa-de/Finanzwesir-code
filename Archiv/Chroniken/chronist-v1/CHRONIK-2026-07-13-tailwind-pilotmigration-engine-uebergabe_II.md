---
chronik_id: CHRONIK-2026-07-13-tailwind-pilotmigration-engine-uebergabe_II
datum: 2026-07-13
projekt: finanzwesir-2-0
thema: tailwind-pilotmigration-engine-uebergabe
beteiligte: [nutzer, chatgpt]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: teilweise
quellenlage: vollstaendiger-faden
schlagworte: [richtungswechsel, annahme-verworfen, konzept-vs-umsetzung, tooling-problem, praezisierung-durch-gegenfrage, vollstaendigkeit-vs-verdichtung]
---

# Chronik: Tailwind-Pilotmigration und Übergabe der Chart-Engine

**Hauptgegenstand:** Der Faden begleitete die Migration der App `Apps/prokrastinations-preis` auf den Tailwind-Baukasten. Er führte von der Klärung der Testlaufzeit über einzelne UI-Slices und Prüfwerkzeuge bis zu einer fachlichen Übergabe für die gemeinsame Chart-Engine.

## Ausgangslage

Zu Beginn lag ein Fachprompt zur Pilotmigration vor. Darin war eine Tailwind-Laufzeitfrage als „Slice 0“ behandelt worden. Der Nutzer stellte klar, dass die Entscheidung bereits getroffen worden war: Vor der Ghost-Integration sollten statische Test-, Design- und Referenzseiten Tailwind v4 über den Browser-CDN laden; nach der Ghost-Integration sollte ein lokaler, bereinigter und minimierter Build ausgeliefert werden.

Die Pilot-App enthielt bestehende CSS-Klassen `fw-app__*`, App-Mechanik, eine gemeinsame Chart-Engine und einen Rubikon-Bereich. Fachlogik, Datenpfade, Chart-Canvas, Plugins, ARIA-Verträge, Card-to-Point-Flug und Rubikon sollten nicht durch eine pauschale CSS-Migration verändert werden.

## Chronologischer Verlauf

### Korrektur der Tailwind-Laufzeit und Synchronisierung der Testumgebung

Die zunächst als offen dargestellte Laufzeitfrage wurde verworfen. Als vorproduktive URL wurde verbindlich festgelegt:

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

Daraufhin entstand AP-tailwind-02a zur Synchronisierung von Decision Log, Testseitenstandard, Template, Pilot-Testseite, Checker, Baukasten-Unterlagen und Pilotprompt. Der Rücklauf meldete eine Umstellung von Visual Board und Mockups von `tailwind.config = {...}` auf das Tailwind-v4-`@theme`-Muster. Zwei alte v3-CDN-Fundstellen außerhalb des Scopes sowie ein Backlog-Eintrag blieben zunächst stehen.

AP-tailwind-02b ergänzte den Backlog-Nachputz und verschärfte den Testseiten-Checker: Die kanonische URL wurde ohne Query/Fragment erzwungen; `type="module"` wurde unabhängig von Groß-/Kleinschreibung ausgeschlossen. Visual Board und Mockups wurden manuell im Live Server geprüft.

### Beginn der App-Slices und Korrektur des Loading-Vertrags

Für Slice 1 wurde ein Konflikt sichtbar: `.fw-app__screen-subline` wurde sowohl für normale Screen-Sublines als auch für Rubikon-Fließtext verwendet. Der Rubikon stand auf der Nicht-Anfassen-Liste. Der Nutzer legte fest, den Rubikon aus der laufenden Migration herauszulassen und den Konflikt für einen späteren Auftrag festzuhalten.

Der Loading-Vertrag wurde zugleich präzisiert. Statt eines ausschließlich visuellen Spinners oder eines ausschließlich sichtbaren Textes galt: Spinner plus sichtbarer Text „Daten werden geladen …“. Diese Entscheidung wurde in Decision Log, Baukasten-Konzept, Visual Board und App-Spec nachgezogen.

Slice 1 migrierte Shell und States. Beim Browsertest erschienen Fehlerflächen zunächst schwarz statt rot. Die fachliche Gleichstellung der Redakteursfehler B, F, K und L wurde festgelegt: Alle sollten mit `role="alert"`, roter Fehlerfläche und verständlichem, vorhandenen Redakteurstext erscheinen.

### Play-CDN-Theme-Bridge

Ein Peer-Review trennte zwei Ursachen: `@source inline(...)` safelistete Klassen, definierte jedoch keine Tailwind-Farbutilities für die vorhandenen CSS-Tokens. Reine `tokens.css`-Variablen wurden vom Play-CDN nicht als `@theme` gelesen.

AP-tailwind-02e ergänzte deshalb eine wertfreie `@theme inline`-Bridge vor dem Manifest. Die CI-Tokens blieben in `tokens.css`; die Bridge bildete benötigte Token-Namen auf diese Variablen ab. Nach dem Browsertest erschienen die Fehlerflächen rot wie im Visual Board. Der Headless-Browser-Testvorschlag eines Peer-Reviews wurde nicht umgesetzt.

### KPI, Slider, Buttons und Manifest-Vertrag

Slice 2 migrierte KPI, Slice 3 den Slider. Ein zusätzlicher Check in `tools/ci-token-check.js` wurde in den KPI-Rücklauf aufgenommen.

Bei Slice 4 entstand ein Konflikt zwischen einer Button-Factory `makeBtn(text, buttonClass)` und dem damaligen Regex-Checker. Der Checker erkannte übergebene Klassenparameter nicht als Nutzung und meldete Manifest-Tokens als ungenutzt. Zunächst wurden direkte Zuweisungen an der Aufrufstelle, eine Checker-Erweiterung und ein dauerhaft roter Checker erwogen.

Der Nutzer lehnte einen dauerhaften heuristischen Blindfleck ab. Als Arbeitsstand entstand ein struktureller Manifest-Vertrag: Vollständige Tailwind-Klassen stehen als benannte `FW_*_CLASS`-Literalstrings im JavaScript; der Checker prüft die deklarierte Menge dieser Konstanten gegen das Manifest, nicht vermuteten Laufzeit-Datenfluss. `makeBtn()` erhielt Rezeptschlüssel wie `next`, `prev` und `journey`, die auf vollständige Variantenstrings zeigen. Die Play-CDN-Manifestliste wurde als Übergang bis zum späteren lokalen Produktionsbuild festgehalten.

Im Browser blieben zwei Button-Familien sichtbar: Primary petrol mit weißer, fetter Schrift sowie Secondary weiß mit schwarzem Rand und schwarzer Schrift. Der Disclosure-Auslöser wurde nicht als dritte Button-Familie behandelt.

### Stationen, Disclosure und responsive Korrektur

Slice 5 migrierte das Stationen-Panel. Flugmarker und die Screen-3-Bridge blieben als lokale Mechanik erhalten.

Slice 6 migrierte Disclosure, Callout und `sr-only`. Der Disclosure-Auslöser war auf Mobile als volle Zeile angelegt. Bei mittleren und großen Breiten stand der Chevron am rechten Rand und wurde als zu weit vom Text entfernt beschrieben. Es wurde festgelegt: Mobile behielt die volle Zeile; ab `sm` sollten Trigger und Zwischenwerte auf Inhaltsbreite zusammenschrumpfen.

AP-tailwind-02f dokumentierte diese Regel als Q-08, änderte Konzept, Visual Board, Mockups, Pilot-App und Manifest. Das alte Slice-6-Protokoll wurde nicht rückwirkend umgeschrieben; AP-tailwind-02f bildete den grünen Nachtrag mit Browser-Abnahme.

### Chart-Slot und CSS-Inventur

Slice 7 migrierte ausschließlich die drei app-seitigen Chart-Slots zu `relative mt-6`. Die Chart-Engine, Canvas-Inhalte, Rubikon und Plugins blieben außen vor. Ein sichtbarer grauer Rahmen wurde anhand eines DOM-Ausschnitts geprüft: Der Slot selbst trug keine Fläche, keinen Rahmen, keinen Schatten und kein Padding. Die weiße App-Fläche kam von `bg-bg`; die äußere graue Fläche wurde dem umgebenden `kg-card` beziehungsweise Seitenlayout zugeordnet.

Vor dem CSS-Nachputz entstand eine read-only Inventur. Sie klassifizierte verbleibende CSS-Blöcke in migrierbare Gestaltung, lokale Mechanik, Rubikon-Schutz und Kompatibilitätsrest. Die Inventur behandelte `.fw-app__screen` zunächst als Screen-Flow-Migrationskandidaten. Anschließend wurde präzisiert, dass `position: relative` den Card-to-Point-Flug umschließt und nicht still zu `flex flex-col gap-6` werden darf.

### Screen-Flow-Nachputz und Abschluss der App-Oberfläche

Slice 8 migrierte deshalb nur `relative` für Screens, Screen-Headlines und Screen-Navigation. Die Headline erhielt den vollständigen Klassenstring:

```js
const FW_SCREEN_HEADLINE_CLASS = 'fw-app__screen-headline m-0 mb-2 text-xl font-bold text-text';
```

Die vorhandene Regel `.fw-app__screen-headline:focus { outline: none; }` blieb als Fokus-Kompatibilitätsrest stehen, weil die Überschriften mit `tabindex="-1"` programmgesteuert fokussiert werden. Die Subline blieb unverändert: Dieselbe Klasse trägt weiterhin Rubikon-Fließtext und enthält die verbleibende `--fw-space-md`-Deklaration.

Die vier Screens wurden einzeln auf fehlenden Outline bei `.focus()` geprüft. Der Chart-Slot-Check bestätigte für S2, S3 und S4 Positionierung, `mt-6` und Flächenlosigkeit. Ein Versuch, `tools/ci-token-check.js` mit Node auszuführen, endete mit `ReferenceError: getComputedStyle is not defined`. Die Tool-Datei erklärte, dass sie als Browser-DevTools-Snippet vorgesehen ist. Danach wurden `fwCiAudit()` auf allen vier Screens und `fwFontCheck()` auf Screen 3 als übergreifende Live-Audits ausgeführt; der Nutzer meldete keine roten Befunde.

### Übergabe an den Engine-Strang

Nach Slice 8 wurde festgehalten, dass die App-Oberfläche nahezu vollständig Tailwind-migriert war, der Rubikon-Subline-Rest jedoch offen blieb. Der Nutzer schlug als nächsten Strang Chart-Engine, Canvas und Plugins vor.

Die Übergabe trennte daraufhin Engine-DOM, Canvas und Plugins. Das geplante Programm betrifft zunächst das HTML-Chart-Chrome für Linie, Balken und Donut. Canvas, Chart.js-Optionen, Achsen, Datasets und Plugins bleiben in ihren bestehenden Technologien und Verträgen. Die Folge wurde in getrennte Schritte Inventur, gemeinsames DOM-Fundament, Linie, Balken, Donut und Cross-Type-Abschluss gegliedert.

## Wendepunkte

- Die als offen behandelte CDN-Laufzeit wurde durch die vorproduktive Play-CDN-/spätere lokale-Build-Regel ersetzt.
- Schwarze Fehlerflächen führten zur Unterscheidung zwischen Safelist und Theme-Token-Registrierung und zur `@theme inline`-Bridge.
- Der Regex-/Datenflusskonflikt beim Button-Manifest führte vom erwogenen Aufrufstellen-Workaround zu einer deklarativen Klassenkonstanten-Invariante.
- Die gemeinsame Subline-Klasse machte sichtbar, dass Rubikon und normale Screen-Typografie nicht ohne eigenen Auftrag getrennt werden konnten.
- Die responsive Disclosure-Beobachtung führte zu Q-08: volle Zeile auf Mobile, kompakte Inhaltsbreite ab `sm`.
- Die Diskussion über eine Tailwind-„Konvertierung“ von Canvas und Plugins führte zur Trennung von Engine-DOM, Canvas und Plugin-APs.

## Entscheidungen und Festlegungen

- **Play-CDN vor Ghost, lokaler Build danach:** Während der statischen Testphase wird exakt `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4` verwendet. Produktion ohne CDN blieb ein späterer Auftrag. Status: gültig.
- **Manifest und Theme-Bridge:** App-Testseiten führen einen Manifestblock für dynamische Klassen und eine wertfreie `@theme inline`-Bridge. Status: gültig für die Play-CDN-Phase.
- **Loading und Fehler:** Loading zeigt Spinner plus „Daten werden geladen …“. Die Redakteursfehler B/F/K/L verwenden verständliche Texte und dieselbe rote `role="alert"`-Fläche. Status: gültig.
- **Klassenvertrag:** Varianten werden als vollständige statische Klassenstrings geführt; der Checker prüft deren Menge gegen das Manifest. Status: gültig für die Testphase.
- **Disclosure Q-08:** Mobile volle Triggerzeile; ab `sm` kompakte Inhaltsbreite und Chevron neben dem Text. Status: gültig.
- **Rubikon-Grenze:** Rubikon, seine Plugins und der gemeinsame Subline-Rest bleiben aus der Tailwind-Pilotmigration heraus. Status: offen für separaten Folge-AP.
- **Chart-Engine-Programm:** Zuerst Engine-DOM/Chart-Chrome; Canvas und Plugins nicht pauschal auf Tailwind umstellen. Status: als Übergabe festgehalten, noch nicht begonnen.

## Irrwege, Schleifen und verworfene Ansätze

- Die anfängliche Behandlung der Tailwind-Laufzeit als offener Slice 0 wurde nach der Nutzerpräzisierung ersetzt.
- Eine lokale Play-Kopie, ein vorgezogener Mini-Build und eine Einzelfall-Ausnahme wurden nicht weiterverfolgt.
- `@source inline(...)` allein wurde zunächst als ausreichende Play-CDN-Absicherung behandelt. Der Browserbefund bei Fehlerfarben führte zur Theme-Bridge.
- Ein dauerhaft roter Checker mit dokumentiertem Blindfleck wurde nicht übernommen.
- Eine AST-/Acorn-Erweiterung für den damaligen Funktionsparameterfall wurde nicht umgesetzt; der deklarative Klassenvertrag ersetzte den Bedarf.
- Eine Trennung der Rubikon-Sublines durch neue Klassen wurde nicht in der Pilotmigration vorgenommen.
- Ein vorgeschlagener neuer Headless-Browser-Test für die Fehlerfarben wurde nicht gebaut.
- Der direkte Node-Aufruf von `ci-token-check.js` wurde verworfen, weil das Werkzeug Browser-APIs benötigt.

## Erzeugte Artefakte

- `AP-tailwind-02a` bis `AP-tailwind-02f`: Prompts und Ergebnisprotokolle zur Testlaufzeit, Checker-Nachputz, Theme-Bridge und Disclosure-Korrektur. Status: historische Arbeitsartefakte.
- `AP-tailwind-02_slice-1` bis `AP-tailwind-02_slice-8` Ergebnisprotokolle: Nachweise der App-Slices. Status: historische Arbeitsartefakte; Slice 6 erhielt durch 02f einen Nachtrag.
- `tools/ci-token-check.js`: um Slice-spezifische Browserprüfungen für KPI, Slider, Buttons, Stationen, Disclosure, Chart-Slot und Screen-Flow ergänzt. Status: im Faden als Browser-Tool verwendet.
- `claude_prompt_AP-chart-engine-01_hauptuebergabe-gestaffelte-entwicklung.md`: fachliche Übergabe der Engine-DOM-Kette. Status: erstellt, noch nicht ausgeführt.
- `claude_prompt_AP-chart-engine-02_folgearbeiten-merkblatt.md`: Erinnerung an getrennte Restarbeiten. Status: erstellt, keine Ausführungsfreigabe.

## Sachliche Erkenntnisse

- **Gesicherter Stand:** Tailwind Play-CDN safelistet Klassen nicht als neue Theme-Tokens; für tokenbasierte Farbutilities war eine `@theme inline`-Bridge erforderlich.
- **Gesicherter Stand:** Vollständige statische Klassenstrings können deterministisch gegen ein Testseiten-Manifest geprüft werden, ohne JavaScript-Datenfluss zu raten.
- **Gesicherter Stand:** Der App-Chart-Slot ist eine unsichtbare Übergabestelle; sichtbares Chart-Chrome bleibt Engine-Verantwortung.
- **Gesicherter Stand:** `ci-token-check.js` benötigt den Browser-DOM und `getComputedStyle`; es ist kein Node-CLI-Tool.
- **Arbeitsannahme:** Die Engine-DOM-Migration kann charttypweise erfolgen, während Canvas und Plugins unverändert bleiben.
- **Offene Frage:** Wie normale Sublines und geschützter Rubikon-Fließtext später getrennt werden, ohne dessen Layout- und Plugin-Verträge zu verändern.

## Offene Punkte am Ende

- Der Rubikon-Subline-Konflikt und die verbleibende echte `--fw-space-md`-Deklaration blieben offen.
- DS-FOLLOWUP-07 zur Rubikon-Nachmessung nach Font-Wechsel blieb im Backlog.
- Das Engine-DOM-Programm mit CE-1 bis CE-6 war als Übergabe angelegt, aber nicht begonnen.
- Canvas-/Plugin-Arbeit war nicht autorisiert; bekannte Engine-Backlog-Punkte blieben im `docs/steering/BACKLOG.md`.
- Produktionsumstellung von Play-CDN auf lokalen Tailwind-Build blieb ein späterer T1-/CSS-6-Strang.

## Analysefähige Rohmuster

Für spätere Musteranalyse vormerken: Wiederholte Trennung zwischen sichtbarem Browserbefund und Quelltext-/Checkerbefund; Umwandlung eines heuristischen Checkers in eine deklarative Invariante; wiederholte Abgrenzung von App-UI, Engine-DOM, Canvas und Plugin-Verantwortung; dokumentierte Reststelle statt einer stillen CSS-Bereinigung.

## Bewusst ausgelassen

Weggelassen wurden wiederholte Einzeiler zum Aufrufen gespeicherter Claude-Prompts, vollständige Prompttexte, einzelne Tool-Ausgaben ohne Folgen für den Arbeitsstand, wiederholte Browser-Statusmeldungen sowie ausführliche Inhalte zitierter Peer-Review-Dateien. Enthalten blieben deren Folgen für Entscheidungen und Artefakte.
