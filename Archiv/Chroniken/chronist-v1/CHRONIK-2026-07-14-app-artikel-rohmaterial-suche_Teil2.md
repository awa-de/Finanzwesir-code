---
chronik_id: CHRONIK-2026-07-14-app-artikel-rohmaterial-suche_Teil2
datum: 2026-07-14
projekt: finanzwesir-2-0
thema: app-artikel-rohmaterial-suche
beteiligte: [nutzer, claude]
typ: chronik
standard: chronist-v1
faden_typ: mischform
status_am_ende: teilweise
quellenlage: vollstaendiger-faden
schlagworte: [tooling-problem, annahme-verworfen, richtungswechsel, durchbruch, externe-abhaengigkeit]
---

# Chronik: Rohmaterial-Migration und Auflösung der Ursprungs-Vault

**Hauptgegenstand:** Altes Inhaltsmaterial (Blogposts, Notizen einer Obsidian-Vault) wurde den 25 Apps der App-Fabrik als Rohmaterial zugeordnet und kopiert. Anschließend wurde die Ursprungs-Vault „Finanzwesir Vermächtnis" aufgelöst und fünf Arbeits-JSON-Dateien aus dem Projekt-Root einsortiert. Der Faden begann als Content-Zuordnung und weitete sich zur Verzeichnis-Auflösung.

## Ausgangslage
Der Faden begann mit `/start` im Kettenmodus; als Fokus war „AP-tailwind-02" gemeldet, bereits abgeschlossen. Der Nutzer erteilte einen neuen Auftrag: aus den Dateien `MINI_SPEC_FROM_HAUPTDOKUMENT.md` aller 25 App-Ordner die Steuerungsblöcke extrahieren, daraus Suchachsen ableiten und passende alte Blogposts aus `Inhalte alte Site/blog` als Rohmaterial nach `content/posts/apps/{slug}/Rohmaterial` kopieren. Vorgabe: Kopie statt Verschieben, vorsichtiges Dry-run. Der Nutzer legte ein Python-Skript für die Extraktion bei.

## Chronologischer Verlauf

### Extraktion der Steuerungsbloecke
Vor Ausführung wurde die reale Struktur geprüft. Das beigelegte Skript nahm den Pfad `/Apps/*` an; real war es `Apps/` ohne führenden Schrägstrich. Die END_MARKER-Logik hätte den generischen Prüfscore-Block mitgezogen; sie wurde auf „erste Leerzeile nach der Nicht-Ziele-Liste" geändert. Die App `regulatorik-dashboard` nutzte statt des Bold-Markers ein H3-Format; sie wurde als Sonderfall über ein Override-Dict (`ALT_END_MARKERS`) behandelt. Der Nutzer fragte, wie die Sonderfälle in die Routine kämen; es wurde bestätigt, dass nur diese eine App strukturell abwich. Ergebnis: 25 von 25 extrahiert → `steuerungsbloecke.json`.

### Ableitung der Suchachsen
Pro App wurden Positiv-, Negativ- und Kontrastbegriffe abgeleitet → `suchachsen.json`. Der Nutzer fragte, ob die wenigen Begriffe ausreichten. Es wurde auf Wortschatz-Drift (Blog seit 2014) hingewiesen; der Nutzer entschied „beides kombinieren": Listen verbreitern UND inhaltliche Prüfung. Auf die Frage Sonnet oder Opus wurde festgelegt: Achsen-Ableitung Sonnet, Kandidaten-Bewertung Opus.

### Erster Bewertungsversuch — Subagent
Ein mechanischer Vorfilter `scan_blog_candidates.py` wurde gebaut. Der erste Lauf nutzte Substring-Suche; der Begriff `ter` traf 830 von 855 Posts (u.a. in „weiter", „später"). Umstellung auf Wortgrenzen-Suche, danach Ergänzung von Recall-Stämmen für dünne Apps. Ein Agent wurde mit `model: opus` beauftragt, die Kandidaten inhaltlich zu bewerten. Das Ergebnis enthielt generische Textbausteine anstelle inhaltlicher Begründungen und falsche Zählungen.

### Aufdeckung: Subagent lief als Haiku
Der Nutzer fragte, warum Opus versagt habe und ob Opus überhaupt lief. Prüfung von `.claude/settings.local.json` ergab `CLAUDE_CODE_SUBAGENT_MODEL: haiku`. Ein Diagnose-Subagent wurde gestartet; er meldete sich selbst als `claude-haiku-4-5`. Der `model: opus`-Parameter am Agent-Tool übersteuerte die Umgebungsvariable nicht. Der Nutzer stellte den Hauptfaden per `/model opus` auf Opus. Es wurde geklärt, dass `/model` nur den Hauptfaden betrifft, nicht Subagenten; die Bewertung wurde daraufhin im Hauptfaden ausgeführt.

### Bewertung im Hauptfaden
Eine Qualitätsprobe an vier Apps wurde erstellt; dazu wurden Originalposts gelesen und Wochenüberblick-Linksammlungen von Sachartikeln unterschieden. Für `prokrastinations-preis` erwiesen sich beide Vorfilter-Treffer als Fehltreffer (0 verwertbar). Der Nutzer bestätigte die Tiefe und ergänzte die Kalibrierung: großzügig wo viel Material, knapp wo wenig, nichts erzwingen; Wochenüberblick generell ignorieren. Alle 25 Apps wurden bewertet → `BLOG_MATCHING_DRY_RUN.md`.

### Kopieren
Der Nutzer wies an, zu kopieren und die Originale danach in einen Unterordner `kopiert/` zu verschieben, um migriertes von nicht-migriertem Material zu trennen. Die Mehrfachnutzung (ein Original zu mehreren Apps) wurde als „erst in alle Ziele kopieren, dann einmal verschieben" behandelt; der Nutzer bestätigte dies. `copy_rohmaterial.py` mit `--check`-Gate wurde gebaut. Das Gate fing drei aus abgeschnittenen Report-Titeln falsch übertragene Dateinamen ab; einer (`...folge-5-schulden.md`) war inhaltlich ein Schulden-Podcast und wurde gestrichen, `plan-generator` sank dadurch auf einen Treffer. Ausführung: 148 Kopien in 24 Ordner, 121 Originale nach `kopiert/`.

### Zweite Quelle — Obsidian-Vault
Der Nutzer nannte eine zweite Quelle (`…\Privat\2ndbrain\…\Finanzwesir Vermächtnis`), unstrukturiert. Es war eine Obsidian-Vault mit 73 Dateien, überwiegend Design-/Technik-/Rechts-/Prozessmaterial; Finanz-Content lag in `ETF-Vermächtnis/` und `Meta/Ich bin bullish.md`. Für die Datei-Zwecke wurde Haiku genutzt, für Dedup und Vergleiche Python. Der Nutzer wählte „verschieben wie beim Blog" und Scope „nur ETF-Vermächtnis + bekannte Funde". Eine zunächst geäußerte Warnung, das Verschieben zerreiße die `[[Wikilinks]]`, wurde nach Prüfung zurückgenommen: da `kopiert/` innerhalb der Vault liegt und Obsidian Links über den Dateinamen auflöst, blieben sie erhalten. Ausführung: 8 Kopien, 4 Originale verschoben.

### Auflösung der Vault (C:)
Der Nutzer wies an, den Ordner vollständig aufzulösen; zwei Arbeitsverzeichnisse hätten sich herauskristallisiert. Ein Pfad-Check zeigte, dass `C:\…\2ndbrain` ein Reparse-Point war und einen Datei-Hash identisch zu `Z:\…\Privat\2ndbrain` hatte; zunächst wurde angenommen, es sei dieselbe Vault. Der Nutzer stellte mitten im Vorgang klar: `C:` sei die kanonische Vault, `Z:` ein Überbleibsel aus der Zeit vor dem Umzug; im ersten Lauf sei der Pfad falsch benannt worden. Eine Python-Hash-Dedup gegen `content/` und `docs/` ergab 14 identische Dateien. Der Nutzer bestätigte, für die Reise-Dateien und die Prompts das Root-`/Archiv/` (kuratiert) zu nutzen. Beim Inventarisieren fiel auf, dass `/Archiv/` bereits existierte und thematische Inseln enthielt; die Dedup wurde erneut ausgeführt, diesmal mit `/Archiv/` als Ziel — Ergebnis: 52 identische Dateien statt 14. Der als „Reise-Material" vorgesehene Block lag byte-identisch bereits im Archiv. Es blieben 19 Unikate. Ein Auflösungsplan wurde deterministisch erzeugt: 62 löschen, 11 archivieren. Der Nutzer gab frei, die Grenzfälle zu archivieren und leere Ordner samt Vault-Verzeichnis zu entfernen. Ausführung: 11 archiviert, 62 gelöscht, Ordner entfernt.

### Prüfung des Z:-Überbleibsels und JSON-Ablage
Der Nutzer bat, das Z:-Überbleibsel zu prüfen und zu klären, wohin fünf Root-JSON-Dateien gehören. Z: war kein Junction, sondern eine eigenständig abgewichene Kopie (73 Dateien): 60 identisch, 5 namensgleich, 8 unikat; die 5 Namensgleichen unterschieden sich nur durch die Frontmatter-Zeile `up:: [[Finanzwesir Relaunch MOC]]` — Z: führte einen anders benannten Index als C: (`Finanzwesir Vermächtnis MOC.md`). `legacy-map.md` wurde um die 11 archivierten Dateien ergänzt. Der Nutzer gab frei, Z: vollständig zu löschen. Der Löschversuch blieb an einer Nextcloud-VFS-Sperre hängen („Zugriff verweigert"); der Ordner ließ sich weder entfernen noch verlässlich auflisten, der Stand der enthaltenen Dateien blieb unbestimmt. Für die JSONs wurde festgelegt: Werkzeug-Daten nach `tools/app_fabrik/data/`, Audit-Mappings nach `docs/App-Fabrik/`, `raw_candidates.json` gelöscht; drei Skript-Pfade wurden angepasst und ein Testlauf durchgeführt.

### Abschluss
Auf die Frage, ob vor dem Schließen etwas zu tun sei, wurden eine Memory-Regel (deterministisch-vor-LLM), ein Session-Log-Eintrag und zwei Commit-Messages erzeugt. Der Nutzer rief `/abschluss-ritual` auf; es wurde als Housekeeping-Abschluss geführt, die Memory-Integrität mit 58/58 geprüft, PROJECT-STATUS, BACKLOG und NAVIGATION unverändert gelassen.

## Wendepunkte
- Die Selbstauskunft des Diagnose-Subagenten (`claude-haiku-4-5`) machte sichtbar, dass der Opus-Dispatch als Haiku lief; die Bewertung wurde daraufhin vom Subagenten in den Hauptfaden verlagert.
- Die Klarstellung des Nutzers, dass `C:` die kanonische Vault und `Z:` ein Überbleibsel sei, trennte die bis dahin als identisch behandelten Pfade.
- Die Wiederholung der Dedup mit `/Archiv/` als zusätzlichem Ziel veränderte den Auflösungsplan (52 statt 14 identische Dateien; das „Reise-Material" war bereits archiviert).

## Entscheidungen und Festlegungen
- Sonderfall-Behandlung von `regulatorik-dashboard` über Override-Dict statt Regel-Heuristik · früh · wegen abweichendem H3-Format · gültig.
- Kalibrierung „großzügig wo viel, knapp wo wenig, nichts erzwingen" · nach der Qualitätsprobe · vom Nutzer gesetzt · gültig.
- Originale nach `kopiert/` verschieben (Blog und Vault) · vom Nutzer · zur Trennung migriert/offen · umgesetzt.
- Archiv-Ziel Root-`/Archiv/` kuratiert für Reise-Dateien und Prompts · vom Nutzer · teils gegenstandslos, da bereits archiviert · umgesetzt für die verbliebenen 11 Dateien.
- JSON-Ablage: Tool-Daten → `tools/app_fabrik/data/`, Mappings → `docs/App-Fabrik/`, `raw_candidates.json` gelöscht · am Ende · vom Nutzer bestätigt · umgesetzt.

## Irrwege, Schleifen und verworfene Ansätze
- Substring-Suche im Vorfilter (`ter` traf 830/855) → ersetzt durch Wortgrenzen-Suche.
- Opus-Dispatch, der als Haiku lief → verworfen, Bewertung in den Hauptfaden verlagert.
- Erste Dedup nur gegen `content/`+`docs/` (14 identisch) → wiederholt mit `/Archiv/` (52 identisch); der ursprüngliche Plan, 35 „Reise-Dateien" zu archivieren, entfiel, da diese bereits archiviert waren.
- Annahme, `C:` und `Z:` seien dieselbe Vault → durch Nutzer-Klarstellung und Reparse-/Hash-Befund als zwei getrennte Kopien erkannt.
- Warnung, das Verschieben breche die Obsidian-Wikilinks → nach Prüfung zurückgenommen (Namensauflösung innerhalb der Vault).
- Drei aus abgeschnittenen Report-Titeln falsch übertragene Dateinamen → vom `--check`-Gate abgefangen, korrigiert bzw. gestrichen.

## Erzeugte Artefakte
- `tools/app_fabrik/extract_steuerungsbloecke.py` – Extraktion – final.
- `tools/app_fabrik/scan_blog_candidates.py` + Diagnose-Skripte – Vorfilter – final.
- `tools/app_fabrik/copy_rohmaterial.py` – generisches Kopier-/Verschiebe-Werkzeug mit `--check`/`--run` – final.
- `steuerungsbloecke.json`, `suchachsen.json` – Pipeline-Daten – final (nach `tools/app_fabrik/data/` verschoben).
- `raw_candidates.json` – Zwischenprodukt – gelöscht.
- `docs/App-Fabrik/BLOG_MATCHING_DRY_RUN.md` – Zuordnungs-Report – final, mehrfach nachgeführt.
- `blog_matching_final.json`, `blog_matching_vault.json` – Audit-Mappings – final (nach `docs/App-Fabrik/`).
- 148 Blog-Kopien + 8 Vault-Kopien in `content/posts/apps/*/Rohmaterial/` – final.
- 11 Dateien im Root-`/Archiv/` (content-workflow-prompts, etf-vermaechtnis-genese, Rechtliches, making-of) – final.
- `Archiv/legacy-map.md` – Archiv-Katalog – aktualisiert.
- Memory `project_subagent_model_override.md` (neu), Ergänzung `feedback_python_powershell_tooling.md` – final.

## Sachliche Erkenntnisse
- Gesicherter Stand: `model: opus` am Agent-Tool übersteuert `CLAUDE_CODE_SUBAGENT_MODEL: haiku` nicht; der Subagent lief als `claude-haiku-4-5`.
- Gesicherter Stand: `/model` wechselt nur den Hauptfaden, nicht Subagenten.
- Gesicherter Stand: `C:\…\2ndbrain` war ein Reparse-Point; `Z:\…\Privat\2ndbrain` eine getrennte, abgewichene Kopie (u.a. `Finanzwesir Relaunch MOC.md` gegenüber `Finanzwesir Vermächtnis MOC.md`).
- Gesicherter Stand: gegen `content/`+`docs/`+`Archiv/` waren 52 der 73 Vault-Dateien byte-identisch; die 5 Namensgleichen unterschieden sich nur durch die `up::`-Frontmatter-Zeile.
- Gesicherter Stand: Obsidian löst `[[Wikilinks]]` über den Dateinamen auf; ein Verschieben innerhalb der Vault bricht sie nicht.
- Arbeitsannahme (vom Nutzer geäußert): `Z:` ist ein Überbleibsel aus der Zeit vor dem Umzug auf `C:`.

## Offene Punkte am Ende
- Löschung von `Z:\…\Privat\2ndbrain\…\Finanzwesir Vermächtnis` blieb durch Nextcloud-VFS-Sperre unerledigt; Auflösung durch den Nutzer auf OS-Ebene ausstehend.
- Zwei Repositorys (Code, `content/`) nicht committet; Commit-Messages liegen vor, Staging/Commit durch den Nutzer.
- Im `content/`-Repo zeigten `_vorlagen/` und `.gitignore` Änderungen, die nicht dieser Session zugeordnet wurden.
- Sonderfund `Tagesgeld-ETF.md` ohne eigene Ziel-App, weich `investment-universum` zugeordnet.

## Analysefähige Rohmuster
Für spätere Musteranalyse vormerken: Determinismus vor LLM als Fehlervermeidung — die Hash-Dedup deckte auf, was ein LLM-Urteil überging. Stille Modell-Substitution durch eine Umgebungsvariable trotz gegenteiligem Parameter. Wirksamkeit eines vorgeschalteten `--check`-Validierungs-Gates gegen Übertragungsfehler. Externe Infrastruktur (Nextcloud-VFS) als Abbruchgrund unabhängig von der Aufgabenlogik. Wiederholtes Erweitern des Vergleichsziels (`/Archiv/`) veränderte das Mengenbild grundlegend.

## Bewusst ausgelassen
Weggelassen wurden: der Wortlaut der einzelnen Tool-Ausgaben und Hash-Tabellen, die vollständigen Kandidatenlisten je App, wiederholte Verifikations-Zwischenläufe ohne neuen Stand, die Formulierungsvarianten der Commit-Messages sowie das Bedienrauschen der Hintergrund-Tasks.
