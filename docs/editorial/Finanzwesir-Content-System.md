# Finanzwesir 2.0 — Content-System Dokumentation

Diese Datei beschreibt das redaktionelle Content-System für den Finanzwesir-Blog: wer welche Inhalte wo erstellt, mit welchen Tools, und wie Code und Text zusammenfinden.

## 1. Grundarchitektur: Zwei Zonen, ein Projektordner

Der lokale Ordner `Finanzwesir 2.0` ist die gemeinsame Wurzel für zwei vollständig getrennte Git-Repositories:

| Zone | Repo | Sichtbarkeit | Inhalt |
|---|---|---|---|
| Code-Zone | `Finanzwesir-code` | Öffentlich (GitHub) | Apps, Theme, technische Specs, Redaktionsprozesse |
| Content-Zone | `Finanzwesir-content` | Privat (GitHub) | Artikeltexte, Seiten, rechtliche Texte, Bilder |

Beide Repos liegen nebeneinander im selben Ordner. Das Code-Repo ignoriert `content/` komplett über seine `.gitignore` — dadurch entsteht kein Konflikt zwischen den beiden Historien.

```
Finanzwesir 2.0/
  ├── Apps/              ← Code-Repo
  ├── Theme/             ← Code-Repo
  ├── docs/              ← Code-Repo (inkl. docs/editorial/)
  └── content/           ← Content-Repo (eigenes .git, Obsidian-Vault)
```

## 2. Struktur des Content-Verzeichnisses

Aktueller Stand (Screenshot-Abgleich):

```
content/
  ├── .git/              ← privates Git-Repo
  ├── .obsidian/         ← Obsidian-Konfiguration (per .gitignore ausgeschlossen)
  ├── .trash/            ← Obsidian-Papierkorb (ausgeschlossen)
  ├── _vorlagen/         ← Templates für neue Artikel/Seiten
  ├── legal/             ← Rechtliche Pflichttexte (Impressum, Datenschutz, AGB)
  ├── pages/             ← Statische Seiten (Über mich, Kontakt etc.)
  ├── posts/             ← Blogartikel (App-Artikel + redaktionelle Artikel)
  └── .gitignore         ← schließt .obsidian/, .trash/, OS-Dateien, Sync-Konflikte aus
```

**Warum `legal/` als eigener Ordner neben `pages/` sinnvoll ist:** Rechtstexte haben einen anderen Lebenszyklus als normale Seiten — sie werden selten, aber mit hoher Sorgfalt und manchmal mit externer Prüfung bearbeitet. Die eigene Ebene macht sie leichter auffindbar und schützt sie davor, in der Menge der redaktionellen Seiten unterzugehen.

### Ordner im Detail

**`posts/`** — Chronologische Blogartikel, unterteilt nach Herkunft:
```
posts/
  apps/
    <app_slug>/
      index.md
      assets/
  redaktion/
    <artikel-slug>/
      index.md
      assets/
```

**`pages/`** — Statische, nicht-chronologische Seiten:
```
pages/
  ueber-finanzwesir/
    index.md
  kontakt/
    index.md
```

**`legal/`** — Rechtlich verpflichtende Texte:
```
legal/
  impressum/
    index.md
  datenschutz/
    index.md
```

**`_vorlagen/`** — Obsidian-Templates, die beim Anlegen neuer Artikel/Seiten als Ausgangspunkt dienen (Frontmatter + Grundstruktur bereits vorausgefüllt).

## 3. Wer macht was — Rollen und Tools

| Aufgabe | Tool | Zone |
|---|---|---|
| App programmieren (JS, CSS, HTML) | VSCode + Claude Extension | Code-Repo |
| App-Spec und technische Doku schreiben | VSCode + Claude Extension | Code-Repo (`docs/editorial/`) |
| Artikeltext schreiben | Obsidian | Content-Repo |
| Bilder/Screenshots einfügen | Obsidian (Drag & Drop in `assets/`) | Content-Repo |
| Rechtstexte pflegen | Obsidian | Content-Repo (`legal/`) |
| Text nach Ghost übertragen | Browser (Ghost-Editor), manuell | — |

Es gibt nur eine Person, die schreibt und programmiert — die Trennung existiert nicht wegen Arbeitsteilung, sondern wegen der öffentlichen Sichtbarkeit des Code-Repos.

## 4. Die Brücke zwischen App-Code und Artikel

Jeder App-Artikel verweist im YAML-Frontmatter auf seine zugehörige App über den identischen Ordnernamen (`app_slug`). Der technische Einbau-Baustein bleibt im Code-Repo:

```
Apps/<app_slug>/ghost-card.example.html   ← technischer Embed-Code (Code-Repo)
content/posts/apps/<app_slug>/index.md    ← Artikeltext (Content-Repo)
```

Im Artikeltext markiert ein Obsidian-Callout die Stelle, an der beim manuellen Ghost-Upload die HTML-Card einzufügen ist:

```markdown
> [!INFO] 🛠️ APP EINBAU (MANUELL IN GHOST)
> Apps/<app_slug>/ghost-card.example.html
```

## 5. Frontmatter-Standard

Jede `index.md` beginnt mit denselben Metadaten-Feldern:

```yaml
---
title: "Artikeltitel"
ghost_slug: "url-slug"
status: draft            # draft | review | published
app_slug: "app-ordnername"   # nur bei App-Artikeln
tags:
  - Apps
published_at:
---
```

Der Status-Wert ist die einzige "Registry" im System — es gibt bewusst keine separate Tracking-Datei, da diese in der Praxis nicht gepflegt wird.

## 6. Ablauf: Von der Idee zum veröffentlichten Artikel

1. **App entsteht** im Code-Repo (`Apps/<app_slug>/`), inklusive `ghost-card.example.html`.
2. **Artikelordner anlegen** in `content/posts/apps/<app_slug>/` mit `index.md` (aus Template in `_vorlagen/`).
3. **Text schreiben** in Obsidian, Bilder in `assets/` ablegen, Status bleibt `draft`.
4. **Manueller Ghost-Upload:** Text kopieren, Bilder hochladen, an der Callout-Stelle die HTML-Card aus dem Code-Repo einfügen, Slug/Tags/Datum in Ghost setzen.
5. **Status aktualisieren:** Frontmatter auf `published` setzen, Commit im Content-Repo.

## 7. Synchronisation im Alltag

- **Laufende Arbeit:** Obsidian Sync gleicht den Vault geräteübergreifend ab.
- **Meilensteine:** Obsidian Git Plugin (Commit-and-sync) sichert den Stand versioniert in `Finanzwesir-content` auf GitHub.
- **Nextcloud:** Der `content/`-Ordner ist aus der Nextcloud-Synchronisation ausgeschlossen (Ignore-Liste), um Konflikte zwischen den drei Sync-Systemen zu vermeiden.
- **Ghost:** Kein automatisierter Export — alle Uploads erfolgen bewusst manuell.
