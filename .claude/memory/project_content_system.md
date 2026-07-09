---
name: project-content-system
description: "Content-System-Architektur — zwei getrennte Git-Repos in einem Ordner, content/-Struktur, Frontmatter-Standard"
metadata: 
  node_type: memory
  type: project
  originSessionId: 27504c35-b159-4002-a4a4-7410207593e3
---

Kanonische Doku: `docs/editorial/Finanzwesir-Content-System.md`.

`Finanzwesir 2.0/` ist Wurzel für zwei vollständig getrennte Git-Repos:
- `Finanzwesir-code` (öffentlich, GitHub) — Apps/, Theme/, docs/ (inkl. docs/editorial/)
- `Finanzwesir-content` (privat, GitHub) — nur `content/`, eigenes `.git`, Obsidian-Vault

Root-`.gitignore` schließt `content/` komplett aus dem Code-Repo aus — dadurch kein Historien-Konflikt. `content/.gitignore` (separat, eigene Datei) regelt innerhalb des Content-Repos: `.obsidian/`, `.trash/`, OS-Dateien, Sync-Konflikte.

**Struktur `content/`:**
```
content/
  _vorlagen/          Templates (Frontmatter + Grundstruktur)
  legal/<slug>/index.md
  pages/<slug>/index.md
  posts/apps/<app_slug>/index.md + assets/
  posts/redaktion/<artikel-slug>/index.md + assets/
```

**Frontmatter-Standard** (einzige "Registry" im System, keine separate Tracking-Datei):
```yaml
title: "..."
ghost_slug: "..."
status: draft            # draft | review | published
app_slug: "..."          # nur bei App-Artikeln
tags:
  - Apps
published_at:
```

**Brücke App-Code ↔ Artikel:** `Apps/<app_slug>/ghost-card.example.html` (Code-Repo) ↔ `content/posts/apps/<app_slug>/index.md` (Content-Repo), verbunden über identischen Ordnernamen + Obsidian-Callout im Artikeltext, das auf die HTML-Card verweist.

**Rollen:** Artikeltext/Bilder/Rechtstexte → Obsidian (Content-Repo). App-Code/Spec/technische Doku → VSCode+Claude (Code-Repo, `docs/editorial/`). Ghost-Upload immer manuell, kein Automatisierungsexport.

**published_at-Diskrepanz (2026-07-09, vollständig behoben):** Die 25 App-Skelette plus `content/_vorlagen/app-artikel.md` waren zunächst ohne `published_at`-Feld angelegt worden (Albert-Template ohne dieses Feld). Nachgezogen: leeres `published_at:` in allen 25 `index.md` und in der Vorlage ergänzt (kein Datum, da noch nicht publiziert). Frontmatter jetzt vollständig standardkonform — Vorlage ist die maßgebliche Quelle für alle künftigen Artikel.
