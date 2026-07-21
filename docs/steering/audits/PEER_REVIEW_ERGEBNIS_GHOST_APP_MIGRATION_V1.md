Stand: 2026-07-21 16:49 | Session: peer-review-ghost-app-migration | Geändert von: Claude (Fable, unabhängiges Review) | Nachtrag: Bootstrapper-Entscheidung + Vertragsdelta-Freigabe + Resolver-Suffixkorrektur (s. Ende), Status GO

# Peer Review: Ghost-App-Migration auf Chart-Blaupause — Ergebnis

**Review-Auftrag:** `docs/steering/handovers/HANDOVER_PEER_REVIEW_GHOST_APP_MIGRATION_V1.md`
**Review-Paket:** `docs/steering/audits/PEER_REVIEW_PAKET_GHOST_APP_MIGRATION_V1.md`
**Leitquelle:** `docs/steering/handovers/MIGRATIONSSTRATEGIE_GHOST_APPS_V2_CHART_BLAUPAUSE.md`
**Modus:** read-only; alle Pflichtquellen gelesen, alle Findings am realen Code verifiziert.

## Findings

- [P1] Dateinamen-only-Regel widerspricht dem bindenden fw-app-Card-Vertrag
  - Ist: `docs/steering/handovers/MIGRATIONSSTRATEGIE_GHOST_APPS_V2_CHART_BLAUPAUSE.md:54` und `:59` — „Beide Card-Werte sind ausschliesslich Dateinamen … keine URL".
  - Soll: `docs/spec/APP-INTERFACE.md:104–105` — `data-fw-data`/`data-fw-config` sind als **URL** definiert (§3.1-Beispiele mit vollen `https://www.finanzwesir.com/…`-URLs, §7 Regel 5 validiert URLs); ebenso `Apps/prokrastinations-preis/APP_SPEC.md:501–505`. Dateinamen-only existiert bindend nur für Chart-Cards (`data-app-file`, `APP-INTERFACE.md:139`).
  - Auswirkung: Zwei widersprüchliche Redakteursverträge für dieselbe künftige Card; eine Implementierung nach Strategie würde die bindende Spec still brechen (Verstoß gegen SECURITY-BASELINE §2: nicht still entscheiden).
  - Erforderliche Korrektur: Explizites Vertragsdelta in `APP-INTERFACE.md` §3.1/§5/§6 (Dateiname + zentrale Auflösung nach `/content/files/app-data/`, analog §3.2) mit Alberts Freigabe, danach `APP_SPEC.md` §10 synchronisieren — vor jeder Schreibarbeit.

- [P1] Veralteter produktiver CSV-Pfad in der APP_SPEC (zweiter Wahrheitsort)
  - Ist: `Apps/prokrastinations-preis/APP_SPEC.md:342` — „Produktiver CSV-Pfad: `Theme/assets/data/b1/msci-world-net-return-eur-monthly.csv`"; `:346` nennt zusätzlich `content/files/[Dateiname]` ohne `app-data`.
  - Soll: `docs/editorial/CSV-APP-DATEN-WORKFLOW.md:38` — einziger Auslieferungsort ist `/content/files/app-data/<dateiname>.csv`; `:156` — CSV ist Inhalt, kein Theme-Bestandteil.
  - Auswirkung: Drei dokumentierte Ablageorte für dieselbe produktive CSV; ein Theme-Asset-Pfad würde Datenpflege an Theme-Builds koppeln und den geprüften app-data-Weg umgehen.
  - Erforderliche Korrektur: `APP_SPEC.md` §7.6 auf den app-data-Weg (Offline-Prüfer → FileZilla → `data`-Attribut) aktualisieren.

- [P1] Theme-Einstieg für fw-app in Ghost ist unentschieden (Sicherheitsperimeter)
  - Ist: `Apps/prokrastinations-preis/app.js:5–6` — relative Imports `../../Theme/assets/js/…` (funktionieren nur im Repo-Layout); `app.js:1367–1385` — eigener DOMContentLoaded-Bootstrap. Im Theme existiert kein fw-app-Einstieg: `Theme/post.hbs:50–51`/`page.hbs:210–211` laden nur Chart.js + Chart-Engine.
  - Soll: `docs/steering/audits/SECURITY-BASELINE.md:179–188` — §6.9: Bootstrapper ist Sicherheitsperimeter, „Strategie muss vor Ghost-Deploy freigegeben sein", Stand: **offen**. Migrationsstrategie §6 Schritte 4–6 setzen den Ghost-Betrieb voraus, benennen den Einstieg aber nicht.
  - Auswirkung: Schritt 6 („Ghost nachweisen") ist ohne festgelegten Einstieg nicht ausführbar; die sicherheitsrelevante Entscheidung (statischer Import + Slug-Whitelist vs. Scan) fiele sonst implizit im Code-AP. Auch der Tailwind-Scan des App-Moduls (Schritt 5) hängt an der Verortung im Theme.
  - Erforderliche Korrektur: Einstiegsentscheidung vor der Migration festlegen (kleinste Lösung: app.js in das Theme-Bundle, statischer Import, bestehende Slug-Whitelist beibehalten) + Decision-Log-Eintrag.

- [P1] Stations-JSON-Ladepfad funktioniert in Ghost nicht und hat weder URL-Gate noch Vault
  - Ist: `Apps/prokrastinations-preis/app.js:1309` — `fetch('config/stations.de.json')` (seitenrelativ); kein Domain-/Pfad-Gate analog `CSVParser.js:151–155`; Ergebnis wird nicht eingefroren. `Theme/assets/js/fw-chart-engine/data/JSONParser.js` existiert nicht. `STATIONS_CONFIG_CONTRACT.md:18` deklariert `Apps/prokrastinations-preis/config/` als produktiven Pfad.
  - Soll: Migrationsstrategie `:71–77` (JSONParser als CSVParser-Schwester, fester app-data-Pfad, Einfrieren); `SECURITY-BASELINE.md` §6.5/§6.6; Deep-Freeze-Invariante `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md:51`.
  - Auswirkung: Auf jeder produktiven Ghost-Seite läuft der relative Pfad ins Leere → Error (d) statt Content; unversiegelte JSON-Daten verletzen die Vault-Invariante.
  - Erforderliche Korrektur: Das in der Strategie deklarierte Delta als Pflichtschritt umsetzen (JSONParser + `FinanzwesirJsonData` + app-data-Auflösung), `loadStations()` darauf umstellen, `STATIONS_CONFIG_CONTRACT.md` §2 auf den neuen produktiven Pfad aktualisieren (App-Ordner-Kopie nur noch als Quelle/Fixture).

- [P1] Testnachweis fehlt für Stations-JSON-Fehlerpfad und Reduced Motion
  - Ist: `Apps/prokrastinations-preis/app.test.html:122–400` — Szenarien decken Slug, zwei Container, Optionen/XSS, CSV-Fehler (T-03–T-07a) und A11y-Live-Region ab; kein Szenario für Error (d) (Stations-JSON 404/ungültig/Contract-Verstoß), kein Reduced-Motion-Testfall (Suche nach „Error (d)"/„Zeitreise kann gerade"/„Motion" ohne Treffer).
  - Soll: `SECURITY-BASELINE.md:316–328` — §11 Testpflicht „Ungültiges CSV/**JSON** → Error-State"; Migrationsstrategie `:86` — Schritt 6 verlangt Reduced-Motion-Nachweis; Review-Paket §3 Frage 18.
  - Auswirkung: Die JSON-Fehler-Todeszone ist unbewiesen — und genau dieser Pfad wird durch die Migration (JSONParser-Umbau) neu gebaut.
  - Erforderliche Korrektur: Testfälle Error (d) und Reduced Motion in `app.test.html` ergänzen — als Teil von Migrationsschritt 3/6, vor Ghost-Nachweis.

- [P2] `buildAppContext()` ohne Freeze — Pilot-Gap der Strategie am Code bestätigt
  - Ist: `Apps/prokrastinations-preis/app.js:189–211` — Rückgabeobjekt wird nicht eingefroren (nur `appData`/`msciData` sind gefroren, `app.js:1207–1215`). Screen-/Fokus-/Animationszustand liegt korrekt außerhalb im Controller.
  - Soll: Migrationsstrategie `:93` — verbindliches Migrationsdelta „statischen Kern tief einfrieren"; `docs/spec/Der Rucksack (Context Object Pattern).md` §2.2 (Immutable).
  - Auswirkung: Konsumenten könnten den AppContext mutieren; Unidirektionalität derzeit nur Konvention. Das Delta ist in der Leitquelle bereits korrekt deklariert.
  - Erforderliche Korrektur: Deep-Freeze des statischen Kerns im Migrations-AP, wie deklariert — nicht verschieben.

## Entscheidung

**GO für die nachfolgenden Migrations-APs** (Stand 2026-07-21 — siehe Nachtrag „Beide Entscheidungen formal verankert" am Ende). Historischer Ausgangsbefund zum Prüfzeitpunkt war NO-GO; aufgehoben durch Alberts Freigabe beider blockierenden Punkte und deren formale Verankerung (→ SEC-04, `01_DECISION_LOG.md`).

Die Arbeitshypothese hält am Code stand — ein Render-Stack über `renderFromData()`, getrennte Vaults/Contexte, kein zweites Architektursystem — aber zwei bindende Entscheidungen fehlen vor Schreibarbeit: das Vertragsdelta Dateinamen-only in `APP-INTERFACE.md` und der freigegebene fw-app-Theme-Einstieg (SECURITY-BASELINE §6.9). Nach Alberts Freigabe dieser beiden Punkte ist der Weg frei; die übrigen P1 sind planbare Schritte innerhalb der Migration.

---

## Nachtrag 2026-07-21: Entscheidung zum Finding „Theme-Einstieg unentschieden"

**Status:** Albert hat den fw-app-Theme-Einstieg entschieden und freigegeben (2026-07-21). Das dritte P1-Finding ist damit inhaltlich adressiert; offen bleibt nur die formale Verankerung (Decision-Log-Eintrag vor Code-Beginn).

**Entscheidung:** Statischer Bootstrapper mit fester Registry/Slug-Whitelist — die Verallgemeinerung des bewiesenen Chart-Engine-Musters (statischer Einstieg im Theme-Bundle, DOM-Scan, Whitelist-Prüfung).

**Verbindliche Leitplanken für die Umsetzung:**

1. **Literale Registry:** Registry ist Code im Theme-Bundle, keine Konfigurationsdatei. Slug → statisch importierte Init-Funktion. Kein Wert aus einem `data-*`-Attribut fließt jemals in einen Import-Pfad, eine Script-URL oder einen `import()`-Ausdruck — auch nicht teilweise, auch nicht „validiert". Unbekannter Slug → Error-State, kein Nachladen.
2. **Error Boundary pro App:** Jeder `.fw-app`-Container wird in eigener try/catch-Grenze initialisiert; eine werfende App beeinträchtigt weder die Ghost-Seite noch Nachbar-Container. Doppelinitialisierungs-Guard (`data-fw-initialized`) beibehalten.
3. **Kein zweites Deployment-System:** Genau ein Einstieg im Theme (analog `fw-chart-engine/index.js`). Kein Script pro Ghost-Card, keine Code-Injection pro Seite, kein CDN, kein Loader-Framework, keine Registry-Datei außerhalb des Codes.
4. **Wachstumspfad dokumentiert, nicht gebaut:** Code-Splitting per `import()` mit literalen Pfaden ist der vorgesehene Evolutionsschritt, falls das Bundle je stört. Trigger: eine einzelne App erreicht die Größenordnung von `chart.umd.min.js` (~10× heutige App-Größe). Vorher kein Splitting. Datenbasis: aktueller Pool 25 Apps à wenige dutzend KB; Gesamtvolumen nach Gzip geschätzt 100–200 KB — kein Lade-Problem.
5. **Decision-Log-Pflicht:** Eintrag in `docs/App-Fabrik/01_DECISION_LOG.md` vor Code-Beginn (SECURITY-BASELINE §6.9: Bootstrapper-Strategie ist sicherheitsrelevant).

**Begründung der Entscheidung (Kurzfassung):** Sicherheit by Construction (keine Script-URL aus untrusted input möglich), ein einziger auditierbarer Perimeter, Konsistenz mit der Chart-Blaupause, Tailwind-Scan und Theme-Hoheit funktionieren automatisch. Die Release-Kopplung an Theme-Uploads ist bei manueller Redaktion ohne CI der ohnehin einzige kontrollierte Auslieferungsweg — ein entkoppeltes App-Deployment wäre mehr Angriffsfläche als Nutzen.

**Konsequenz für die NO-GO-Entscheidung:** Von den zwei blockierenden Punkten verbleibt einer — das Vertragsdelta Dateinamen-only in `APP-INTERFACE.md` (Finding 1). Nach dessen Freigabe und dem Decision-Log-Eintrag zu dieser Bootstrapper-Entscheidung steht der Migration aus Review-Sicht nichts mehr entgegen; die übrigen P1 (F2, F4, F5) sind planbare Schritte innerhalb der Migrations-APs.

---

## Nachtrag 2026-07-21 (formale Verankerung): beide Entscheidungen freigegeben, Status GO

**Status:** Beide vormals blockierenden Entscheidungen sind am 2026-07-21 von Albert freigegeben und durch `docs/steering/handovers/HANDOVER_FORMALISIERUNG_GHOST_APP_MIGRATION_ENTSCHEIDUNGEN_V1.md` formal verankert:

1. **Vertragsdelta Dateinamen-only (Finding 1):** `APP-INTERFACE.md` §3.1/§6/§7 stellt `data-fw-data`/`data-fw-config` von URL auf Dateiname + zentralen Resolver (`/content/files/app-data/<dateiname>`) um. `SECURITY-BASELINE.md` §6.5/§7 synchron nachgezogen. `Apps/prokrastinations-preis/APP_SPEC.md` (§7.6, §8, §10, §12, §15, §18, §19, §22) und `STATIONS_CONFIG_CONTRACT.md` §2 entsprechend synchronisiert.
2. **fw-app-Theme-Einstieg (Finding 3):** Statischer Bootstrapper mit fester Registry/Slug-Whitelist, jetzt formal verankert in `01_DECISION_LOG.md` SEC-04. `SECURITY-BASELINE.md` §6.9 von „offen" auf freigegebene Strategie umgestellt. `APP_FACTORY_IMPLEMENTATION_RFC.md` B3 und die Bootstrapper-Alternative als erledigt markiert.

**Status:** GO für die nachfolgenden Migrations-APs.

**Klarstellung — keine Produktionsfreigabe:** Dies ist ein Doku-Synchronisationsauftrag, kein Code, kein Test, kein Deployment. Die übrigen P1-Findings F2 (veralteter produktiver CSV-Pfad), F4 (Stations-JSON-Ladepfad/Vault) und F5 (Testnachweis Stations-JSON-Fehlerpfad/Reduced Motion) sowie das P2-Finding (`buildAppContext()` ohne Freeze) bleiben verpflichtende Umsetzungs- und Testarbeit innerhalb der Migrations-APs. Der GO-Status erlaubt den Beginn der Migrations-APs — er ist keine Freigabe für Produktivbetrieb.

---

## Nachtrag 2026-07-21 (P1-Korrektur): Resolver-Suffixwiderspruch behoben

**Befund:** Die Formalisierung (s. Nachtrag oben) beschrieb den Ghost-Card-Wert stellenweise als „vollständiger Dateiname einschließlich Suffix" und den Resolver zugleich als `/content/files/app-data/<dateiname>.csv` bzw. `.json` — das hätte bei einem bereits vollständigen Wert zu `abc.csv.csv` bzw. `stations.de.json.json` geführt. Der reale Referenzpfad in `Theme/assets/js/fw-chart-engine/core/ChartEngine.js` (`data-app-file`-Resolver) zeigt reine Präfixbildung: `csvUrl = '/content/files/app-data/' + appFile` — kein zusätzlich angehängtes Suffix.

**Korrektur:** `APP-INTERFACE.md` (§3.1-Tabelle, §3.2 `data-app-file`), `APP_FACTORY_IMPLEMENTATION_RFC.md` (D5) und `Apps/prokrastinations-preis/APP_SPEC.md` (§7.6, §8, §15) einheitlich auf reine Präfixbildung `/content/files/app-data/<dateiname>` korrigiert, wobei `<dateiname>` bereits vollständig mit Suffix ist. Keine Änderung an Dateinamen-Grammatiken, Albert-Entscheidungen oder der Bootstrapper-Entscheidung.

**Status:** GO für die nachfolgenden Migrations-APs bleibt bestehen.
