# App-Fabrik-Standard — Draft V0.1

Stand: 2026-05-09 | Draft, noch nicht bindend | Geändert von: Claude
Ziel-Pfad wenn bindend: `docs/spec/APP-FACTORY-STANDARD.md`

**Alle Inhalte hier sind Arbeitsstände.** Erst nach Überführung in `docs/spec/` und Alberts expliziter Freigabe gilt dieser Standard als bindend.

Quellen für diesen Draft:
- `ETF-App-Fabrik_Produktlandkarte_V0-2.md` §7 (Factory-Lücken)
- `App-Fabrik_Zusatzpaket-Integration_V0-1.md` (Demo-Erkenntnisse)
- `docs/spec/APP-INTERFACE.md` (Ghost-Card-Vertrag, bestehend)
- `docs/steering/audits/SECURITY-BASELINE.md` (Security-Regeln, bestehend)

---

## 1. Mission der App-Fabrik

Die App-Fabrik baut keine 21 Einzelanfertigungen. Sie baut 5–7 App-Familien mit gemeinsamen Templates, Datenverträgen, UI-Komponenten, Test-Gates und Claude-Workflows.

Ziel: Wenn man eine App kennt, kennt man das Muster aller Apps derselben Familie.

---

## 2. App-Familien

| Familie | Grundmuster | Typische Apps |
|---|---|---|
| **Calculator** | Inputs → Formel → KPIs → Ergebnistext → CTA | risiko-uebersetzer, prokrastinations-preis, kostenkiller-ter, thesaurierer-rennen, renditekiller-volatilitaet |
| **Scenario Chart** | Daten → Transformation → Chart → Erklärung → CTA | geburtsjahrlos, rollierende-sparplaene, crash-reaktions-test, market-timing-simulator |
| **Decision / Quiz** | Frage/Challenge → Auswahl → Ergebnis → Empfehlung → CTA | crash-reaktions-test, market-timing-simulator, etf-reifegrad-finale |
| **Explorer / Compare** | Auswahl/Eingabe → Mapping/Overlap → Visualisierung | diversifikations-detektor, investment-universum, weltkarte-etf-indizes, esg-spiegel, komplexitaets-entlarver, weltdepot-baukasten |
| **Parser / Explainer** | Text/Objekt → Tokenisierung → Erklärung | etf-namensdecoder, replizierer-swapper, passiv-paradox |
| **Dashboard** | Mehrere Module → KPIs → Szenario-Logik | regulatorik-dashboard |
| **Configurator** | Diagnose → personalisierter Plan → CTA | etf-reifegrad-finale |

---

## 3. Standard-Dateistruktur pro App

```text
/Apps/{slug}/
  README.md                  # App-Briefing: Zweck, Inputs, Outputs, Annahmen
  app.config.json            # Texte, Defaults, Slider, Szenarien, Whitelists
  app.data.csv               # tabellarische Daten (optional)
  app.data.json              # strukturierte Daten (optional)
  app.schema.json            # Validierung der Config/Daten
  app.module.js              # dünne app-spezifische Logik
  test.html                  # lokale Entwicklungsseite
  ghost-card.example.html    # Copy/Paste-Beispiel für Redakteur
```

Für Prototypen: vorhandene Single-HTML-Dateien bleiben als `_legacy/` erhalten.

---

## 4. Ghost-HTML-Card-Vertrag

### Einfache App (keine externen Daten)

```html
<div class="fw-app"
     data-fw-app="prokrastinations-preis"
     data-fw-options="monthlyRate:300, years:30">
</div>
```

### Datengetriebene App (CSV)

```html
<div class="fw-app"
     data-fw-app="geburtsjahrlos"
     data-fw-data="https://www.finanzwesir.com/content/files/apps/sparplan_results.json?v=2026-05"
     data-fw-options="range:30y">
</div>
```

### Komplex konfigurierte App (JSON-Config)

```html
<div class="fw-app"
     data-fw-app="regulatorik-dashboard"
     data-fw-config="https://www.finanzwesir.com/content/files/apps/regulatorik.config.json?v=2026-05"
     data-fw-data="https://www.finanzwesir.com/content/files/apps/regulatorik.data.csv?v=2026-05">
</div>
```

**Regel:** Der Redakteur schreibt kein freies JSON in Ghost-Cards. `data-options` nur für kleine menschenlesbare Overrides.

---

## 5. Datenformate: CSV und JSON

| Zweck | Format | Wer bearbeitet |
|---|---|---|
| Tabellarische Daten (Zeitreihen, Vergleiche) | CSV | Redakteur direkt |
| Strukturierte Konfiguration (Slider, Szenarien, Texte) | JSON | Claude erzeugt, Albert bestätigt |
| Kleine Inline-Overrides | `data-options` | Redakteur in Ghost-Card |

### Pflichtfelder in jeder Datendatei

```json
{
  "meta": {
    "generated_at": "2026-05-09",
    "source": "MSCI.com, historische NTR-Daten",
    "version": "1.0",
    "assumptions": "Nominale Werte, USD, reinvestierte Dividenden"
  }
}
```

---

## 6. Design-System-Vertrag

- CSS-Tokens kommen aus `screen.css` (CSS Custom Properties auf `:root`)
- Apps lesen Tokens via `FwTheme.js` — kein Hardcoding von Hex-Werten
- Kein Tailwind CDN in Produktion — nur im Demo-Template erlaubt
- Keine App-spezifischen CSS-Klassen außerhalb des `fw-*`-Namensraums
- IDs nur wenn App-weit eindeutig und nicht wiederholbar

---

## 7. UI-Primitiven V0.1 (Starter-Set)

Diese Komponenten sind freigegeben:

| Komponente | Beschreibung |
|---|---|
| Slider | Touch-fähig, mit Live-Output |
| NumericInput | Zahleingabe mit Validierung |
| KpiCard | Einzelne Kennzahl mit Label |
| LiveCounter | Animierter Zähler (requestAnimationFrame) |
| RangeButtons | Vorauswahl-Buttons (z. B. 10y / 20y / 30y) |
| ResultSentence | Auto-generierter Ergebnissatz |
| AssumptionsBox | Annahmen und Grenzen transparent machen |
| PrimaryCta | Haupt-CTA-Button |
| ErrorState | Fehlermeldung (kein technischer Stack-Trace) |
| LoadingSkeleton | Lade-Platzhalter |

**Erweiterungsprozess:** Neue Komponente nur wenn ≥2 Apps sie brauchen + Design-System-Aufnahme + A11y-Check + Demo-Template-Test + Dokumentation.

---

## 8. State-Modell (Pflicht für jede App)

```text
Loading → Content
       → Error
       → Empty (ungültige/fehlende Daten)
```

Jede App muss alle vier Zustände behandeln. Kein technischer Stack-Trace für Endnutzer.

---

## 9. SafeDOM / Security

- Nutzdaten nie via `innerHTML` — immer `textContent` oder sichere Renderer
- CSV-/JSON-Daten werden vor Verwendung validiert (Schema-Check)
- Whitelist-Prinzip für `data-options`: nur bekannte Keys werden verarbeitet
- Keine globalen IDs als App-API — alle Selektoren relativ zum App-Root (`ctx.root`)
- Externe URLs nur aus bekannten Quellen (`finanzwesir.com`-Domain)
- Security-Prüfung: `docs/steering/audits/SECURITY-BASELINE.md` vor App-Arbeit lesen

---

## 10. A11y-Minimum

- Alle interaktiven Elemente per Tastatur erreichbar
- ARIA-Labels für Slider und Inputs
- Kontrastwerte nach WCAG AA (→ DS-004 im BACKLOG)
- `prefers-reduced-motion` respektieren — Animationen pausieren oder reduzieren
- Ergebnisse immer auch als Text (nicht nur visuell) vorhanden

---

## 11. Code-Konventionen

```text
CSS:       fw-[komponente]__[element]--[modifier]
JS:        camelCase für Variablen/Funktionen, PascalCase für Klassen
Dateien:   [slug].module.js, [slug].config.json, [slug].data.csv
DOM:       data-fw-role, data-fw-kpi, data-fw-section (keine globalen IDs)
```

Kein `data-type` als App-Slug — stattdessen `data-fw-app`.

---

## 12. Definition of Done (pro App)

- [ ] README.md mit Zweck, Inputs, Outputs, Annahmen
- [ ] app.config.json mit allen Texten, Defaults, Szenarien
- [ ] app.schema.json (Validierung)
- [ ] app.module.js (dünne Logik)
- [ ] ghost-card.example.html (Redakteur-Vorlage)
- [ ] test.html (lokale Testseite)
- [ ] Alle vier States getestet (Loading, Content, Error, Empty)
- [ ] Mobile-Test (375px) bestanden
- [ ] A11y-Mindestanforderungen erfüllt
- [ ] Security-Review mit SECURITY-BASELINE.md abgeglichen
- [ ] code-quality-faang-review durchgeführt
- [ ] Manueller Testplan (manual-test-plan) ausgeführt
- [ ] Albert hat getestet und bestätigt

---

## 13. Was Claude ändern darf / nicht darf

**Claude darf ohne Gate:**
- README.md, Config-JSON, Ghost-Card-Beispiele schreiben
- Daten-Schemas entwerfen
- Test-HTML aufsetzen

**Claude braucht Full-Gate:**
- app.module.js (App-Logik)
- Änderungen an Theme-Assets
- Neue App-Familien-Infrastruktur

**Claude darf nie ohne explizite Freigabe:**
- Bestehende Prototypen überschreiben
- Dateien außerhalb von `docs/App-Fabrik` und `Apps/[slug]/` ändern
- CDN-Abhängigkeiten in produktiven Code einbauen
- Security-Baseline-Regeln umgehen

---

## Offene Punkte in diesem Draft

→ Vollständige offene Fragen: `02_OPEN_QUESTIONS.md`

Kritischste offene Punkte für diesen Standard:
- AppRegistry-Implementierung (→ Arch-01)
- Bootstrapper-Verhalten (→ Arch-02)
- Ghost-Card-Vertrag für `data-fw-family` (→ Arch-04)
- CTA-Standard Funnel vs. Standalone (→ UX-02)
