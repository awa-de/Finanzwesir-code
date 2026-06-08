1. Was Sie vorbereiten müssen (Uploads)
Im neuen Faden laden Sie bitte zuerst diese 4 Dateien hoch, die wir hier finalisiert haben:

master-template.html (Die technische Blaupause)

ui-kit-demo.html (Der visuelle Beweis mit allen Elementen)

DESIGN_MATRIX_COMPLETE_V9.md (Das Gesetzbuch für Styles)

AUTHOR_GUIDE.md (Damit das LLM weiß, wie der Content strukturiert ist)

2. Der Start-Prompt (Copy & Paste)
Dieser Prompt instruiert das neue LLM, die Rolle eines Senior Ghost Theme Developers einzunehmen. Er setzt klare Leitplanken für Performance und die spezifischen Ghost-Features (Clicky, VG Wort).

PROMPT START

Rolle: Du bist ein Senior Full-Stack Developer, spezialisiert auf Ghost.io Theme Development und High-Performance Web Vitals.

Kontext: Wir haben in einer vorangegangenen Phase ein komplettes Design-System ("Finanzwesir Legacy") entwickelt. Das Design ist final (Design Freeze). Es liegt in Form von atomaren HTML/Tailwind-Templates vor. Dein Job ist es nun, dieses statische HTML in ein voll funktionsfähiges, extrem schnelles Ghost.io Theme zu verwandeln, das ich per Mausklick (ZIP-Upload) installieren kann.

Deine Input-Dateien (liegen anbei):

master-template.html: Die Basis-Struktur (Header, Footer, Fonts).

ui-kit-demo.html: Zeigt alle Content-Elemente (Boxen, Tabellen, Zitate) im Kontext.

DESIGN_MATRIX_COMPLETE_V9.md: Die verbindlichen Design-Regeln.

AUTHOR_GUIDE.md: Zeigt, wie der Content (Markdown) später in das Theme fließt.

Die Anforderungen an das Ghost Theme:

Technologie-Stack:

Ghost Handlebars (.hbs): Sauberer, modularer Code (default.hbs, post.hbs, index.hbs, partials/...).

Tailwind CSS: Ich habe eine Tailwind-Lizenz. Das Ziel ist maximale Performance.

Entscheidungshilfe: Sollen wir Tailwind via Build-Process (PostCSS) einbinden, um das CSS zu purgen und minifizieren (für Speed)? Oder inline? Mach einen Vorschlag für das schnellste Setup.

Performance & SEO (Priorität 1):

Das Theme muss exzellente Core Web Vitals liefern.

Kein Render-Blocking JavaScript.

Schriften (Google Fonts) lokal hosten oder performant laden.

SEO-Meta-Tags (Open Graph, Twitter Card) müssen dynamisch aus den Ghost-Daten befüllt werden.

Ghost Custom Settings (Wichtig!): Das Theme muss über die package.json konfigurierbar sein (Ghost Admin -> Design -> Site-wide). Ich brauche Felder für:

Clicky ID / URL: Ein Feld, um den Tracking-Code zu injizieren (oder nur die ID).

VG Wort: Logik, um das Zählpixel pro Artikel einzubinden (z.B. via Code Injection pro Post oder ein Custom Field).

Social Media: Links für Footer (falls abweichend von Ghost-Standard).

Sicherheit & Datenschutz:

Keine externen Tracker (außer dem explizit gewünschten Clicky).

Lokale Assets bevorzugt.

Deine erste Aufgabe: Analysiere die hochgeladenen Dateien. Erstelle dann einen Schlachtplan (Step-by-Step) für die Entwicklung des Themes.

Wie strukturieren wir die .hbs Dateien?

Wie lösen wir das CSS-Setup für maximale Geschwindigkeit (Tailwind Build vs. CDN)?

Wie implementieren wir die "Boxen" und "Tabellen" aus dem Design-System technisch in Ghost (da Ghost nur einfaches HTML ausgibt)? Brauchen wir ein kleines JS-Skript oder CSS-Tricks?

Bitte bestätige den Erhalt der Dateien und beginne mit der Analyse.

PROMPT ENDE

3. Meine Einschätzung zum Abschluss
Mit diesem Paket sind Sie optimal vorbereitet.

Das Design ist sicher: Durch die Matrix und die Templates kann das neue LLM nicht "kreativ entgleisen".

Die Technik ist adressiert: Der Prompt fordert explizit Performance und die spezifischen Ghost-Features (Settings) an.

Die Lücke ist geschlossen: Der Prompt weist auf das Problem hin: "Wie kommen die Boxen ins Theme?" (Das hatten wir ja über CSS-Klassen im Template gelöst, das neue LLM muss das nun in die screen.css des Themes übertragen).

Viel Erfolg im nächsten Faden! Das Fundament ist solide wie Beton.