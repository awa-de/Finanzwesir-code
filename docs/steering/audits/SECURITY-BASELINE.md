Stand: 2026-05-03 08:02 | Session: A7-Stand-Datum-Format | Geändert von: Claude

# Security Baseline — Finanzwesir 2.0

**Zweck:** Sicherheitsgrundregeln für alle Änderungen mit Angriffsfläche.
**Zielgruppe:** Claude und Albert.
**Wann lesen:** Bei jeder Änderung an CSV, externen URLs, Script-Tags, Ghost-Templates, Formularen, Nutzerparametern, Apps oder HTML-Ausgabe.
**Wann aktualisieren:** Wenn ein neues Sicherheitsrisiko erkannt oder eine neue Architekturfläche eingeführt wird.
**Gehört hier hinein:** Sicherheitsregeln und Prüfpunkte.
**Gehört nicht hier hinein:** Performance-Audits, allgemeine Codequalität, lange Angriffsstudien.

---

## Grundsatz

Finanzwesir 2.0 ist klein, aber öffentlich.
Das Ziel ist nicht Enterprise-Security, sondern das konsequente Vermeiden vermeidbarer Angriffsflächen.

---

## Immer prüfen bei

- Externen URLs
- CSV-Laden
- Script-Einbindung
- Formularen
- Nutzerparametern
- HTML-Injection-Risiko
- App-Embeds
- Ghost-Template-Änderungen
- Später: Backend, Datenbank, API

---

## Grundregeln

1. Keine externen Scriptquellen ohne explizite Freigabe.
2. CSV-URLs nur von erlaubten Domains (siehe Domain-Lock unten).
3. Keine ungeprüfte HTML-Injection.
4. Nutzerparameter nie direkt in HTML schreiben — nur über `textContent`.
5. Keine sensiblen Daten in Git.
6. Keine Active-Campaign-Daten in Git (siehe `PROTECTED_PATHS.json`).
7. Keine geheimen Tokens im Frontend.
8. Kein Backend ohne explizite Architekturentscheidung (Decision Log).
9. Bei Unsicherheit: Änderung stoppen und Security-Frage explizit machen.

---

## Domain-Lock für CSV

CSV-Quellen müssen aus erlaubten Finanzwesir-Domains stammen.

Aktuell erlaubt:

- `https://www.finanzwesir.com/...`

Claude darf keine beliebigen externen CSV-Quellen erlauben.

Jede App oder Engine-Komponente, die `data-csv` verarbeitet, muss eine Validierungsfunktion besitzen oder eine gemeinsame Validierungsfunktion nutzen.

Verboten:

- Beliebige Fremd-URLs
- Dynamische Script- oder Codeinterpretation aus Datenattributen
- Ungeprüfte Weitergabe von CSV-Inhalten an `innerHTML`

---

## Pflegezyklus für Audits

- `SECURITY-BASELINE.md` (diese Datei): bei jeder sicherheitsrelevanten Architekturfläche aktualisieren
- `SECURITY-AUDIT.md`: nach konkretem Security-Anlass oder vor großem Deploy
- `PERFORMANCE-ANALYSE.md`: vor großem Deploy oder nach Performance-relevanter Änderung
- `PROMPT-SECURITY-AUDIT.md`: quartalsweise oder vor größerer Prompt-/CLAUDE.md-Reorganisation
