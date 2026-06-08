# Zwischenfazit: Finanzwesir Chart Engine — Stand 23. Februar 2026

## Executive Summary

**Die Chart-Engine ist fertig.** Alle 15 Arbeitspakete (AP-1 bis AP-11, AP-6a/b/c) sind abgeschlossen. Security gehärtet, Accessibility implementiert, alle Regressionen gefixt, Feature-Backlog triagiert. Was jetzt noch offen ist, betrifft ausschließlich das **Ghost-Theme drumherum** — nicht mehr die Engine selbst.

---

## Was wir geschafft haben (Phase 1–3)

| Bereich | Pakete | Ergebnis |
|---------|--------|----------|
| **Security** | AP-1, AP-2 | Domain-Whitelist, Safe DOM, parseInt-Radix. Keine innerHTML mit User-Daten mehr. |
| **Spec-Hygiene** | AP-3, AP-4 | 3 Pre-Launch-Klärungen geschlossen, 1 Falschalarm bereinigt |
| **BI-Features** | AP-5, AP-6a/b | Pos/Neg-Balkenfarben, bessere Labels, Performance-Headline (BAN) über Line Charts, Screen-Reader-Tabellen für alle Chart-Typen |
| **Regressions-Fixes** | AP-9, AP-10, AP-11 | X-Achse WEEKLY, Data-Anchored Ticks, Range-Buttons bei spärlichen Daten |
| **Architektur-Aufräumen** | AP-7, AP-8 | 3 Prüfpunkte geschlossen, 7 Feature-Ideen triagiert (2 verworfen, 2 post-launch, 3 bereits erledigt) |
| **Touch-Test** | AP-6c | DevTools-Emulation bestanden (12 Prüfungen). Echter Geräte-Test steht vor Launch aus — einziger offener Punkt. |

**Bilanz: 15 APs, davon 14 geschlossen, 1 wartet auf echtes Smartphone.**

---

## Was noch zu tun ist

### Dev-Time (vor Launch, noch 2 Pakete)

| Paket | Was | Aufwand | Risiko |
|-------|-----|---------|--------|
| **CSS-3** | CSS-Variables Bridge (KDR-14) — FwTheme.js liest Farben aus CSS statt Hardcoded | 1 Session | **Mittel** — wichtigster inhaltlicher Eingriff, berührt 6–8 Engine-Dateien |
| **CSS-5** | Verifikation: Farb-Audit, Regressions-Check, Issues schließen | 1 Session | Gering — nur prüfen und dokumentieren |

CSS-1 (Tailwind CLI) gestrichen → in CSS-6 aufgegangen. CSS-2 (screen.css) erledigt.

### Pre-Launch (vor Go-Live, 7 Pakete)

| Paket | Was | Aufwand |
|-------|-----|---------|
| **TMPL-1** | Ghost-Templates schreiben (default.hbs, 4 Partials, 6 Seiten-Templates) | 2–3 Sessions |
| **CSS-7** | Asset-Einbindung in Templates prüfen | ½ Session |
| **QA-1** | Integration & QA (GScan, Responsive, SEO, Chart-Test) | 1–2 Sessions |
| **CSS-6** | Tailwind einrichten + Production-Build (Config + Build, ~15 KB statt 3,5 MB CDN) | 1 Session |
| **AUDIT-P** | Performance-Audit (15 Checkpoints, Lighthouse ≥90) | 1 Session |
| **AUDIT-S** | Security-Audit (21 Checkpoints, CSP, Härtung) | 1 Session |
| **DEPLOY** | ZIP-Paket, Upload, Smoke-Test | ½ Session |

### Post-Launch (Backlog, optional)

| Paket | Was | Aufwand |
|-------|-----|---------|
| **PL-1** | Einheiten-Anker Y-Achse (spart Platz auf Mobile) | Klein–Mittel |
| **PL-2** | Zone Zero (Kurzzeit-Charts < 300 Tage) | Mittel |

---

## Wo stehen wir — das Bild

```
Engine-Logik         ████████████████████████████████████████  100%
Security             ████████████████████████████████████████  100%
Accessibility        ████████████████████████████████████████  100%
CSS-System           ████████████████░░░░░░░░░░░░░░░░░░░░░░░░  40%  (CSS-2 ✅, CSS-3 + CSS-5 offen)
Theme-Integration    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   0%  (TMPL-1 → CSS-7 → QA-1 → CSS-6 → Audits → Deploy)
```

**Kern-Aussage:** Die schwierige Arbeit (Engine, Achsen, Tooltips, Responsiveness, Security) ist erledigt. Was noch kommt, ist **Verpackung** — CSS-Farben zusammenführen, Tailwind-Build aufsetzen, Ghost-Templates als Hülle bauen. Kein algorithmisches Risiko mehr, nur noch Handwerk.

**Größtes verbleibendes Risiko:** CSS-3 (die Bridge zwischen CSS-Variablen und der Engine). Dort werden ~8 Dateien angefasst, um hardcodierte Farbwerte durch Tokens zu ersetzen. Konzeptionell einfach, aber viele Stellen — erfordert sauberes Arbeiten und einen Regressions-Check danach (CSS-5).

**Geschätzter Restaufwand bis Launch-Ready:** ~9 Sessions (CSS-3, CSS-5, TMPL-1, CSS-7, QA-1, CSS-6, AUDIT-P, AUDIT-S, DEPLOY). Kein Blocker, keine offenen Architektur-Fragen. Nächster Schritt: CSS-3 (Bridge).
