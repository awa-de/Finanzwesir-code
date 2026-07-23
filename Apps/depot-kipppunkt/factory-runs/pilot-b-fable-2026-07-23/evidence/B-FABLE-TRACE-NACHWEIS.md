Stand: 2026-07-23 | AF-GM-04 (b-fable Trace-Evidenz) | Geändert von: Claude

# Nachweis AF-GM-04 — b-fable Interaktionsspur (kanonischer Stand)

## 1. Geltungsbereich und Grenze

Technischer Pilotnachweis für den sichtbaren Happy Path der `b-fable`-Variante (App `depot-kipppunkt`). Keine fachliche Produktfreigabe, keine Finanzmathematik-Freigabe, keine A11y-, Performance- oder Ghost-Abnahme und keine Launch-Reife.

## 2. Kanonische Bindung

- Acceptance: `Apps/depot-kipppunkt/factory-runs/ACCEPTANCE-depot-kipppunkt-b-fable-pilot.json`, `mockupPath` = `Apps/depot-kipppunkt/factory-runs/pilot-b-fable-2026-07-23/snapshot/mockup.html`
- Snapshot: derselbe Pfad, real vorhanden
- Trace: `Apps/depot-kipppunkt/factory-runs/pilot-b-fable-2026-07-23/behavior-trace.json`, `referencePath` = derselbe Snapshot-Pfad
- SHA-256 (Acceptance `mockupSha256`, Trace `referenceSha256`, real geprüfter Snapshot-Hash — alle drei identisch): `855fad37884834ef030ef6a770d0d1118849ef81576e569b4189c2d68a27ebe9`

Acceptance, Snapshot und Trace binden denselben Hash und denselben Pfad.

## 3. Beobachtete Bedienfolge

Eingaben `3000` (Job-Netto), `20000` (Depotwert), `500` (Sparrate); Rendite `8 %`; Klick auf „Weiter"; Zeitregler auf Jahr `22`, danach Jahr `23`. Die Spur ist ein beobachteter Nachweis der real ausgeführten Bedienhandlungen und ihrer sichtbaren DOM-Zustände — keine Deutung oder Übernahme von Mockup-JavaScript.

## 4. Sichtbarer Nachweis

- `screenshots/b-fable-normal/step-08-click.png`: Ergebnisansicht nach „Weiter".
- `screenshots/b-fable-normal/step-11-observe-text.png`: Jahr 22, beobachteter Gleichstand.
- `screenshots/b-fable-normal/step-14-observe-text.png`: Jahr 23, beobachteter Satz, dass das Depot rechnerisch mehr Jahresertrag bringt.

Sichtbar in den Screenshots: token-gestylte Ansicht, petrolfarbener Zeitregler, grauer und petrolfarbener Balken sowie ein sichtbarer Wechsel von Gleichstand zu Überhang. Daraus folgt keine Produkt- oder Designfreigabe.

## 5. Maschinelle Verifikation

```
python tools/golden-master/validate_schema.py Apps/depot-kipppunkt/factory-runs/pilot-b-fable-2026-07-23/behavior-trace.json
```
Exit `0` — `SCHEMA-VALIDIERUNG: GRUEN (1 Datei(en) geprüft)`

```
node tools/golden-master/verify.mjs Apps/depot-kipppunkt/factory-runs/pilot-b-fable-2026-07-23/behavior-trace.json
```
Exit `0` — `{"status":"PASS","mode":"normal","actionsVerified":15}`

Als bereits im Fix-03-Patch nachgewiesene Gegenprobe: eine externe, temporäre Spurkopie mit manipuliertem `referenceSha256` bricht mit Exit `1` und Fehler-ID `GM-ERR-HASH-MISMATCH` ab.

## 6. Offene Grenzen

Tailwind Play CDN (`https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`) bleibt ein auf die Pilotaufnahme begrenzter, externer visueller Renderweg. Diese Evidenz behauptet keine Langzeitverfügbarkeit oder Produktionsfähigkeit dieses Wegs.
