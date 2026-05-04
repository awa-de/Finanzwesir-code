# App Interface — Finanzwesir 2.0

**Zweck:** Vertrag zwischen Ghost-Content und clientseitigen Finanzwesir-Apps.
**Zielgruppe:** Claude, Albert, zukünftige App-Implementierungen.
**Wann lesen:** Vor jeder App-Implementierung oder Änderung an App-HTML-Cards.
**Wann aktualisieren:** Wenn neue App-Attribute, Datenquellen oder Embed-Muster eingeführt werden.
**Gehört hier hinein:** Datenattribute, CSV-Regeln, Sicherheitsregeln, Initialisierungsvertrag.
**Gehört nicht hier hinein:** App-spezifische Businesslogik oder offene App-Backlogs.

---

## Grundsatz

Apps sind clientseitige JavaScript-Module, die über HTML-Cards in Ghost eingebunden werden.

Der Content liefert Konfiguration über `data-*` Attribute.
Der Code interpretiert diese Attribute als Daten, **niemals als Code**.

Kein Backend ohne explizite Architekturentscheidung.

---

## Standardattribute

| Attribut | Pflicht | Zweck |
|----------|---------|-------|
| `data-type` | ja | App-Typ / Modul-Bezeichner |
| `data-title` | optional | Sichtbarer oder interner Titel |
| `data-csv` | falls datengetrieben | CSV-Quelle (Domain-Lock beachten) |
| `data-colors` | optional | Farbschema / Token-Referenz |
| `data-options` | optional | JSON-Konfiguration nach Whitelist |

---

## Domain-Lock für `data-csv`

CSV-Quellen müssen aus erlaubten Finanzwesir-Domains stammen:

- `https://www.finanzwesir.com/...`

Verboten:
- Beliebige Fremd-URLs
- Dynamische Script- oder Codeinterpretation aus Datenattributen
- Ungeprüfte Weitergabe von CSV-Inhalten an `innerHTML`

Jede App, die `data-csv` verarbeitet, muss eine Validierungsfunktion besitzen oder eine gemeinsame nutzen.

---

## `data-options` Sicherheitsregel

`data-options` darf nur whitelisted Optionen enthalten.
Jede App definiert ihre eigene Whitelist in der Implementierungsdokumentation.
Unbekannte Optionen werden ignoriert, nie ausgeführt.

---

## Allgemeine Sicherheitsregeln

1. Keine Funktion, kein JavaScript, kein HTML aus Datenattributen ausführen.
2. Nutzerparameter nie ungeprüft in `innerHTML` — nur `textContent`.
3. Bei ungültiger Konfiguration: Empty State anzeigen, kein Crash.
4. Keine geheimen Tokens im Frontend.
5. Keine externen Scriptquellen ohne explizite Freigabe.

---

## Empty-State-Standard

Bei Datenladefehlern zeigt die App einen dezenten Fehlerzustand:

- Kein Stacktrace für Endnutzer
- Kein leerer Container
- Keine rohen technischen Details
- Für Redakteur verständliche Ursache, soweit möglich
- Sichere Ausgabe ausschließlich über `textContent`

Beispiele für nutzerfreundliche Fehlermeldungen:

```
Daten konnten nicht geladen werden.
Bitte CSV-Pfad und Format prüfen.
```

Für Dev-Testseiten darf eine technische Zusatzinfo sichtbar sein.

---

## CSV Cache-Busting

CSV-URLs dürfen eine Version tragen:

- Bevorzugt: expliziter Versionsparameter, z.B. `?v=2026-05-02`
- Alternativ: Build-/Deploy-Version
- Dev-Modus: optional `Date.now()` zum Debuggen
- Live-Modus: **kein** permanentes `Date.now()` bei jedem Seitenaufruf (zerstört Caching)
