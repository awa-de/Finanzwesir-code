# GHOST-04 — SEO/GEO-Page-Feldvertrag: Windows-Full-Gate

Status: GRÜN

## Abweichung vom ursprünglichen Auftragsrahmen (offen benannt)

Der Auftrag verlangte reine Windows-PowerShell-Befehle und ein vollständig autonomes Durchlaufen von Build → Upload → Testdatensatz → Render-Prüfung → Korrektur. Das konnte in dieser Session nicht wie vorgeschrieben ablaufen:

- Es gab kein Werkzeug für interaktive Ghost-Admin-/Browser-Bedienung (Upload, Aktivierung, Tags setzen, Seitenquelltext ansehen). Albert hat diese Schritte manuell im Browser übernommen und die Render-Ergebnisse als Text zurückgemeldet — mehrere Runden, iterativ.
- `npm run css:build` lief über das verfügbare Bash-Werkzeug (Git Bash), nicht über eine reine PowerShell-Sitzung. Das ZIP-Paketieren lief über einen `powershell.exe`-Unterprozess (`Compress-Archive`), aus demselben Bash-Werkzeug heraus gestartet. Beides auf Alberts direkte Anweisung („Du baust, legst das ZIP einfach ab").

Dieser Bericht beschreibt einen Mensch-Maschine-Hybrid-Ablauf über mehrere Korrektur-Iterationen, keinen einzelnen autonomen LLM-Durchlauf.

## Windows-Nachweis
- `npm run css:build` (5×, nach jeder Korrektur) — über Git Bash, nicht PowerShell.
- ZIP-Paketierung über `powershell.exe -NoProfile -Command "... Compress-Archive ..."` (5×, echte PowerShell-Ausführung, als Unterprozess aus Git Bash gestartet).
- Kein POSIX-Werkzeug (`zip`, `curl`, `sed`) für die Paketierung selbst verwendet.

## Build, Validator und Paket
- CSS-Build: `tailwindcss -i Theme/src/css/screen.source.css -o Theme/assets/css/screen.css --minify`, alle Durchläufe ohne Fehler.
- Validator: kein Theme-Validator (z. B. gscan) in `package.json` oder `GHOST-LOKALBETRIEB.md` dokumentiert oder installiert.
- ZIP-Pfad: `Z:\Documents\Nextcloud\Finanzwesir 2.0\Theme\finanzwesir-local-theme.zip`.
- ZIP-Wurzel geprüft: alle 7 `.hbs`-Dateien, `package.json`, `assets/`, `apps/`, `partials/` auf oberster Ebene; `src/`, `.git/`, `.claude/` nicht enthalten.
- Upload und Aktivierung: von Albert manuell im lokalen Ghost-Backend durchgeführt, mehrfach wiederholt nach jeder Korrektur.

## Render-Nachweise
| Testfall | URL | erwarteter Befund | tatsächlicher Befund | Status |
|---|---|---|---|---|
| JSON-LD-Ausgabe (vor Fix 1) | `/index-vergleich/` | valides, ausführbares Script | HTML-escaped als sichtbarer Text | ROT → behoben |
| Canonical-Duplikat (vor Fix 1) | `/index-vergleich/` | genau 1 Canonical | 2 Tags (leer + real) | ROT → behoben |
| `sameAs`-Wert (vor Fix 1) | `/index-vergleich/` | keine erfundene URL-Transformation | rohe Handles `["@ghost","ghost"]` | ROT → behoben |
| JSON-LD/Canonical (nach Fix 1) | `/about/`, `/test-page-1/` | korrekt, einmalig | korrekt | GRÜN |
| Meta-Description-Duplikat (vor Fix 2) | Homepage, `/test-page-1/` | genau 1 Tag | 2 identische Tags bei befülltem Feld | ROT → behoben |
| Meta-Description (nach Fix 2) | Homepage | genau 1 Tag | korrekt | GRÜN |
| Tag-Erkennung `#schema-about` (vor Fix 3) | `/about/` (Tag-Slug-Form `hash-schema-about` verwendet) | `AboutPage` | blieb `WebPage`, kein Robots-Tag trotz `#seo-*`-Tags | ROT |
| Umstrukturierung `{{#has}}` außerhalb `contentFor` (Zwischenversuch) | `/about/` (7 Tags kombiniert) | dynamisches Verhalten | weiterhin `WebPage`, kein Robots-Tag — Hypothese widerlegt | ROT |
| Tag-Syntax auf `tag="#schema-..."` korrigiert (Fix 3, nach Ghost-Doku-Recherche) | `/about/` (7 Tags kombiniert) | `Article` (Präzedenz: article zuerst), Robots `noindex, nosnippet` | korrekt | GRÜN |
| `#schema-article` entfernt | `/about/` | `AboutPage` | korrekt | GRÜN |
| zusätzlich `#schema-about` entfernt | `/about/` | `ContactPage` | korrekt | GRÜN |
| zusätzlich `#schema-contact` entfernt | `/about/` | `ProfilePage` | korrekt | GRÜN |
| zusätzlich `#schema-profile` entfernt | `/about/` | `CollectionPage` | korrekt | GRÜN |
| zusätzlich `#schema-collection` entfernt | `/about/` | `WebPage` (Default) | korrekt | GRÜN |
| zusätzlich `#seo-nosnippet` entfernt | `/about/` | Robots nur `noindex` | korrekt | GRÜN |
| zusätzlich `#seo-noindex` entfernt | `/about/` | kein Robots-Tag | korrekt (keine Zeile mehr vorhanden) | GRÜN |

Alle neun in `GHOST-LOKALBETRIEB.md`/GHOST-04-Auftrag geforderten Tag-Kombinationen sind damit einzeln durchgetestet und bestätigt.

## Zulässige Korrekturen
- `Theme/default.hbs`: `{{block "head"}}` → `{{{block "head"}}}` (Escaping-Fix).
- `Theme/default.hbs`: manuelle Canonical-Zeile entfernt.
- `Theme/default.hbs`: manuelle Meta-Description-Zeile entfernt (analog zu Canonical, gleicher Duplikat-Grund).
- `Theme/page.hbs`: `sameAs`-Logik aus allen sechs Schema-Varianten entfernt (`@site.twitter`/`@site.facebook` liefern rohe Handles statt URLs).
- `Theme/page.hbs`: Verschachtelung von `{{#has}}` und `{{#contentFor "head"}}` umgestellt ({{#has}} jetzt außen) — im Nachhinein nicht die eigentliche Fehlerursache, aber unschädlich beibehalten, da strukturell sauberer.
- `Theme/page.hbs`: Tag-Matching-Syntax korrigiert von `tag="hash-<name>"` auf `tag="#<name>"` (die tatsächliche Fehlerursache, bestätigt durch Ghosts offizielle Dokumentation `docs.ghost.org/themes/helpers/functional/has`, Beispiel `{{#has tag="#link"}}`).
- Nach jeder Korrekturrunde: `npm run css:build` erneut ausgeführt, ZIP neu paketiert, von Albert erneut hochgeladen und geprüft.

## Verbleibende Blocker
- keine

## Nicht angefasst
- Produktivumgebung, CSS-Quelle (`screen.source.css`), JavaScript, Posts, `post.hbs`, `author.hbs`, Routing, Ghost-Core, `robots.txt`, `package.json`

Kein Commit erstellt.
