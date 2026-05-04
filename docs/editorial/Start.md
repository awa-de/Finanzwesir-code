Das ist der korrekte und saubere Übergang in **Phase 3**.

Da wir uns technisch auf den **"Hybrid-Workflow"** (Markdown + Hausmeister-Skript) festgelegt haben, ändert sich für den neuen Faden die Prämisse: Es geht nicht mehr darum, *ob* wir das so machen, sondern *wie* wir damit effizient Content produzieren.

Hier ist das Übergabepaket.

### 1. Die 4 Dateien für den Upload
Laden Sie diese Dateien (die finalen Versionen aus diesem Chat) in den neuen Faden hoch:

1.  **`master-template-v6.html`** (Das technische Herzstück mit dem JS-Skript)
2.  **`AUTHOR_GUIDE-v3.md`** (Die Anleitung für Sie)
3.  **`LLM_INSTRUCTIONS_v8.md`** (Die Anleitung für die KI)
4.  **`Design-Matrix Desktop vs. Mobile-v9.md`** (Das Regelwerk im Hintergrund)

---

### 2. Der Start-Prompt (Copy & Paste)

Dieser Prompt instruiert das neue LLM (Content Ops), das vorhandene System nicht mehr in Frage zu stellen, sondern anzuwenden.

***

**PROMPT START**

**Rolle:** Du bist ein **Senior Content Strategist** und **Ghost CMS Workflow-Experte**.

**Projekt-Status:**
Wir starten **Phase 3** des Projekts "Finanzwesir Legacy".
Phase 2 (Design & Technik) ist abgeschlossen (**Design Freeze**).
Das technische System steht: Es ist ein **Hybrid-Workflow**.
1.  **Der Autor (User)** schreibt in Ghost primär **Markdown** (inkl. spezieller Kürzel für Boxen/Listen).
2.  Ein **JavaScript ("Hausmeister")** im Template wandelt dieses Markdown frontend-seitig in das finale Design um.
3.  Komplexe Elemente (Video, Audio) werden als **HTML Cards** eingebunden.

**Deine Input-Dateien (liegen anbei):**
1.  `master-template-v6.html`: Das finale HTML-Gerüst inkl. des JavaScript-Parsers (Zeilen 238ff).
2.  `AUTHOR_GUIDE-v3.md`: Die aktuelle Arbeitsanweisung für den Autor.
3.  `LLM_INSTRUCTIONS_v8.md`: Die Instruktionen, wie eine KI Content für dieses System generieren soll.
4.  `Design-Matrix...v9.md`: Die visuellen Regeln (zur Info).

**Unsere Ziele in diesem Faden:**
Wir wollen den **Redaktions-Prozess** testen und optimieren ("Content Operations").
Wir ändern NICHTS mehr am Design oder am JavaScript-Code des Templates.

**Deine erste Aufgabe:**
Analysiere den `AUTHOR_GUIDE-v3.md` im Kontext des `master-template-v6.html`.
Prüfe die **Usability für den Autor**:
- Ist die Anleitung logisch und vollständig?
- Passt die Anleitung exakt zu dem, was das Skript im Template technisch erwartet? (Führe einen gedanklichen "Dry Run" durch: Wenn ich das Markdown aus dem Guide in das Template stecke, greift der Regex im Skript korrekt?)

Gib mir kurzes Feedback zur Konsistenz ("Passt Anleitung zu Technik?") und warte dann auf den ersten Content-Auftrag (Erstellung der Seite "Der Weg").

**PROMPT ENDE**

***

### 3. Was ändert sich? (Briefing für Sie)

* **Fokus-Wechsel:** In Phase 2 haben wir diskutiert: *"Wie soll der Button aussehen?"* In Phase 3 diskutieren wir: *"Wie beschreibe ich den Button im Text am schnellsten?"*
* **Kein Design-Debatten mehr:** Wenn das neue LLM sagt "Blau wäre aber schöner", ignorieren wir das. Das Design ist "eingefroren".
* **Ziel:** Am Ende von Phase 3 haben Sie den ersten echten Artikel ("Der Weg") fertig formatiert und wissen blind, wie Sie ihn in Ghost anlegen.