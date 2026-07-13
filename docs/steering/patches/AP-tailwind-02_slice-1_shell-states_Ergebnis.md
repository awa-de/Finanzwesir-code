Stand: 2026-07-13 | Session: AP-tailwind-02 Slice 1+2 | Geändert von: Claude (Sonnet)

# AP-tailwind-02, Slice 1 — Shell/States

Nachträglich angelegt beim Abschluss-Ritual (Lücke: Ergebnis wurde ursprünglich nur inline im Chat
berichtet, nicht als Datei). Rekonstruiert aus dem tatsächlichen Diff und den Folge-Ergebnisprotokollen.

## 1. Status

**GRÜN** (nach Korrektur durch AP-tailwind-02d + AP-tailwind-02e — siehe §4). Manuelle
Browser-Abnahme durch Albert am 2026-07-13 vollständig bestätigt.

## 2. Ziel

Migriere in `Apps/prokrastinations-preis/` App-Shell sowie Loading/Empty/Error auf die
verbindlichen Tailwind-Rezepte (TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md §6.1/§6.10). Screen-Flow
(Screen, Headline, Subline) und Rubikon bewusst vertagt (Klassenkonflikt `fw-app__screen-subline`
zwischen echten Sublines und Rubikon-Text, siehe Slice-1-Prompt).

## 3. Delta

**`app.js`:** Neue Klassenkonstanten `FW_SHELL_CLASS`, `FW_LOADING_WRAPPER_CLASS`,
`FW_LOADING_SPINNER_CLASS`, `FW_EMPTY_CLASS`, `FW_ERROR_CLASS`. `setState()` steuert `opacity-60`
jetzt per `classList.toggle` statt CSS-Attributselektor. `renderLoading()` baut Zentrier-Wrapper +
Spinner + sichtbaren Text „Daten werden geladen …". `renderEmpty()` neu (von `renderError()`
getrennt, `role="status"` statt `role="alert"`). `bootstrap()` setzt `FW_SHELL_CLASS` auf jeden
Container.

**`app.css`:** `.fw-app`-Basis auf reinen Mechanik-Block reduziert (`--fw-card-to-point-flight-duration`,
`--fw-screen3-reveal-fade-duration`). Alle vier `.fw-app[data-fw-state="..."]`-Blöcke entfernt
(inkl. Content-State, notwendige Folgeänderung gegen doppeltes Padding — Shell trägt jetzt
dauerhaft `p-4 md:p-6`).

**`app.test.html`:** Play-CDN-Manifest (`<style type="text/tailwindcss">` + `@source inline(...)`)
neu eingeführt.

## 4. Erste Abnahme ROT — Ursache und Behebung

Erste manuelle Browser-Abnahme: **ROT**. Play-CDN generierte CSS für zur Laufzeit per `app.js`
gesetzte Tailwind-Klassen nicht zuverlässig (F zeigte schwarzen statt roten Error; K/L schwarzen
statt gedämpften Text — Ursache dafür zusätzlich: K/L waren fälschlich als Empty statt Error
klassifiziert). Zwei Folge-APs behoben das:

- **AP-tailwind-02d** (Runtime-Manifest + Error-Taxonomie): Manifest-Mengengleichheits-Checker in
  `tools/check-test-pages.py`, Taxonomie-Korrektur (K/L/R sind Error, nicht Empty).
- **AP-tailwind-02e** (Play-CDN-Theme-Bridge): fehlende `@theme inline`-Bridge ergänzt — Manifest
  allein registrierte die CI-Tokens nicht als Tailwind-Utilities.

Details, Nachweise und Crashtests: `docs/steering/patches/AP-tailwind-02d_runtime-manifest_error-taxonomie_Ergebnis.md`,
`docs/steering/patches/AP-tailwind-02e_play-cdn-theme-bridge_Ergebnis.md`.

## 5. Realer Checker-Lauf (zum Zeitpunkt dieses Slices)

```
TESTSEITEN-STRUKTUR: GRUEN
Gepruefte dauerhafte Testseiten: 16
Strukturfehler: 0
```

## 6. Manuelle Abnahme durch Albert (2026-07-13, nach 02d+02e)

B, F, K, L: dieselbe rote Fehlerfläche mit `role="alert"` und den bestehenden Texten. Loading:
Spinner + sichtbares „Daten werden geladen …", Shell gedimmt. Normale Shell: Papierfläche und
Body-Font sichtbar. „Manuelle Abnahme zu 100 % ok."

Kein Commit.
