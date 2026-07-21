Stand: 2026-07-21 15:52 | Session: ghost-app-migration-formalisierung | Geändert von: Claude

# Abschlussmeldung — Formalisierung Ghost-App-Migrationsentscheidungen

**Auftrag:** `docs/steering/handovers/HANDOVER_FORMALISIERUNG_GHOST_APP_MIGRATION_ENTSCHEIDUNGEN_V1.md`
**Risikoklasse:** C — verbindlicher Vertrags- und Sicherheitsnachzug mit Wirkung auf die App-Fabrik.
**Scope:** Reiner Doku-Synchronisationsauftrag. Kein Code, kein Parser, kein Theme, kein Test, kein Deployment, kein Commit.

## Status: bestanden

## Geänderte Dateien (7/7, alle erlaubt)

1. **`docs/App-Fabrik/01_DECISION_LOG.md`** — neuer Eintrag SEC-04 nach SEC-03: beide Entscheidungen (Dateinamenvertrag + statischer Theme-Bootstrapper) vollständig mit Sicherheitsbegründung, Resolver, Registry, Error-Boundary, Guard, Ausschlüssen und Wachstumspfad.
2. **`docs/steering/audits/SECURITY-BASELINE.md`** — §6.5 und §7 von URL-/Domain-Lock auf Dateinamen-/Resolver-Vertrag umgestellt (Domain-Lock bleibt explizit für `data-csv`-Testpfad und echte externe Quellen); §6.9 von „offen" auf freigegebene Strategie mit Verweis auf SEC-04.
3. **`docs/spec/APP-INTERFACE.md`** — §3.1-Beispiele, Attributtabelle, §6 und §7 auf Dateinamenvertrag umgestellt; Chart-Card-Vertrag (§3.2) unverändert.
4. **`docs/App-Fabrik/APP_FACTORY_IMPLEMENTATION_RFC.md`** — D9 und B3 als entschieden markiert (historische Frage-Formulierung bleibt als „historisch" erhalten), §11 Punkt 1 abgehakt, D5-Beschreibung für späteres `data-fw-config` auf Resolver-Vertrag korrigiert.
5. **`Apps/prokrastinations-preis/APP_SPEC.md`** (V2.9 → V3.0) — §7.6, §8, §10, §12, §15, §18, Testmatrix (T-01/T-03/T-04) und §22-Checkliste synchronisiert; Stations-Konfiguration jetzt als zweiter Ghost-Card-Feed `data-fw-config="stations.de.json"` dokumentiert.
6. **`Apps/prokrastinations-preis/STATIONS_CONFIG_CONTRACT.md`** — §2 auf Produktionsquelle `data-fw-config` umgestellt; App-Ordner-Kopie explizit als Quell-/Fixture-Datei gekennzeichnet.
7. **`docs/steering/audits/PEER_REVIEW_ERGEBNIS_GHOST_APP_MIGRATION_V1.md`** — Status auf „GO für die nachfolgenden Migrations-APs" geändert (historischer NO-GO-Befund als aufgehoben markiert, nicht stillschweigend überschrieben), neuer datierter Nachtrag mit Klarstellung: keine Produktionsfreigabe, F2/F4/F5/P2 bleiben Pflichtarbeit.

## Nachbedingungen

1. ✅ Alle 7 Dateien nach dem Schreiben vollständig erneut gelesen.
2. ✅ Grep-Check: keine aktive Aussage mehr, dass `data-fw-data`/`data-fw-config` eine URL, Domain, `localhost`-Ausnahme oder Query-String akzeptiert (historische Zitate im Peer-Review-Findings-Teil bleiben als Ist-Befund korrekt erhalten).
3. ✅ Keine aktive Bootstrapper-Aussage lässt Code Injection, dynamisches Nachladen oder offene B3-Entscheidung zu — B3-Frage ist explizit als „historisch" markiert, direkt gefolgt von der Entscheidung.
4. ✅ APP-INTERFACE, SECURITY-BASELINE und APP_SPEC semantisch synchron (gleiche Grammatik, gleicher Resolver-Pfad, gleiche Fehlerzustände).
5. ✅ `git status` bestätigt: nur die 7 erlaubten Dateien verändert (plus `session-log.md` aus einem separaten, vorherigen Schritt derselben Session — nicht Teil dieses Auftrags).

Kein Commit, kein Deploy, keine weitere Arbeit ausgeführt.

## Verbleibender nächster Schritt

Technischer Migrations-AP, nicht Teil dieses Auftrags: Umsetzung von F2 (CSV-Pfad-Bereinigung), F4 (JSONParser + Vault für Stations-JSON), F5 (Testfälle Error (d) + Reduced Motion) und P2 (Deep-Freeze `buildAppContext()`) sowie die praktische Ghost-Integration des Bootstrappers.
