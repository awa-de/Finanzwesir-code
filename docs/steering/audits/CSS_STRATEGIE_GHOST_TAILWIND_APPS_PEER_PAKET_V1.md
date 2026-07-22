# CSS-Strategie für Ghost, Tailwind, Chart- und normale Apps

**Stand:** 2026-07-22  
**Zweck:** Strategisches Architekturmodell zur unabhängigen Prüfung. Es beschreibt keine einzelnen Selektoren, keine konkrete Bug-Reparatur und keinen Coding-Auftrag.  
**Geltung:** Ghost-Theme, Chart-App und die wachsende Familie normaler Apps.  
**Prüfstatus:** Entwurf für ein unabhängiges Fable-Peer-Review. Bestehende bindende Verträge haben Vorrang, falls eine Aussage dieses Dokuments ihnen widerspricht.

---

## 1. These

CSS ist in diesem Projekt kein dekorativer Nachsatz zu HTML oder JavaScript. Es ist ein kompiliertes Produkt mit einer klaren Besitz-, Eingabe-, Auslieferungs- und Beweisgrenze.

Das System besteht nicht aus „Theme-CSS hier, App-CSS dort“, sondern aus fünf zusammenwirkenden Ebenen:

```text
1. Designwerte         Was darf visuell ausgedrückt werden?
2. Strukturvokabular   Wie werden Layout und Standardprimitiven beschrieben?
3. Theme-Komposition   Wo gelten Editorial- und Seitengestaltungsregeln?
4. Renderer-Ausgabe    Wer erzeugt welchen DOM und welche Primitivrezepte?
5. Fachmechanik        Was ist absichtlich lokal und nicht generalisierbar?
```

Die übergeordnete Regel lautet:

> Gemeinsame visuelle Bedeutung wird zentral definiert und lokal angewandt. Lokale fachliche Bewegung bleibt lokal, aber nie unsichtbar oder außerhalb des Auslieferungswegs.

---

## 2. Mentale Modelle

### 2.1 Tokens sind die visuelle ABI

`tokens.css` ist keine vollständige Gestaltungsschicht. Es ist die stabile, öffentliche Schnittstelle zwischen Theme, Chart-App und normalen Apps:

- Farben und semantische Rollen;
- Schriften;
- Schatten und wenige weitere Designwerte.

Ein Token ist damit vergleichbar mit einer Programmierschnittstelle: Seine Bedeutung soll stabil bleiben, während sich seine konkrete visuelle Ausprägung ändern darf. Die App fordert beispielsweise eine semantische Rolle an; sie besitzt keine eigene Farbpolitik.

Folge:

```text
Designentscheidung → Token ändern
keine App-spezifische Hexwert-Suche
kein paralleles Theme in JavaScript
```

Die Chart-App liest diese Werte über ihre Theme-Bridge. Normale Apps verwenden dieselben Werte über Tailwind-Rezepte und begrenzte Mechanik-CSS. Das sind zwei Zugriffsformen auf dieselbe Designwahrheit, nicht zwei Designs.

### 2.2 Tailwind ist ein Compiler, keine Laufzeitbibliothek

Tailwind ist im Produktionsmodell keine CDN-Abhängigkeit und kein Gestaltungseditor im Browser. Es ist ein Compiler:

```text
HBS + reale JS-Runtimes + deklarierte Quellen
                ↓
        Tailwind-Compiler
                ↓
  minimiertes, lokal ausgeliefertes Theme-CSS
```

Die literalen Klassenrezepte in Renderer- und App-Runtimes sind deshalb Build-Eingaben. Der Compiler extrahiert daraus die benötigten Utilities und dedupliziert sie. Eine mehrfach verwendete Utility wird nicht mehrfach als CSS ausgeliefert.

Die Quellenliste ist Teil des Produktionsvertrags. Ein umgezogener Runtime-Pfad, den der Compiler nicht mehr sieht, ist nicht bloß Dokumentationsdrift, sondern ein potenzieller Produktionsfehler: Ein nächster Build kann benötigte Regeln entfernen.

### 2.3 Renderer besitzen die sichtbare Struktur

Strategien und Fachlogik liefern Bedeutung, Daten und Zustände. Renderer besitzen die Übersetzung nach DOM und visuellen Primitiven.

```text
Strategie/App-Logik → Kontext → Renderer → DOM + Klassenrezepte
```

Für die Chart-App ist diese Verantwortung explizit im `FwRenderer` konzentriert. Normale Apps können dieselbe Verantwortung zunächst durch zusammengehörige Renderfunktionen in ihrer Runtime erfüllen. Eine zweite globale Renderer-Fabrik entsteht erst bei nachgewiesenem gemeinschaftlichem Bedarf.

Damit bleibt CSS-Wissen aus Strategien heraus. Eine Strategie beschreibt etwa „Warnung“, „aktiv“ oder „gedämpft“, aber weder eine Farbe noch einen Abstand noch eine Klasse.

### 2.4 Die Kaskade ist ein Routing-System

CSS-Kaskade ist nicht nur Priorität einzelner Regeln, sondern die Verteilung von Gestaltungshoheit zwischen Systemen.

In diesem Projekt treffen zwei Autorenwelten aufeinander:

```text
Ghost-Editorial: Textgestaltung für Artikelinhalt
App-/Tailwind-Welt: Gestaltung für dynamisch erzeugten App-DOM
```

Die Ghost-Artikelregeln sind normale, ungelayerte Theme-Regeln. Tailwind-Utilities liegen in einem benannten Cascade Layer. Deshalb gewinnt die Ghost-Welt im Überschneidungsbereich unabhängig davon, wie viele Utility-Klassen eine App trägt.

Die richtige Reaktion ist keine Gegenregel-Schlacht. Die Systemgrenze wird dort formuliert, wo die unpassende Regel entsteht:

```text
Editorial-Regel gilt für Editorial-Inhalt.
Editorial-Regel gilt nicht im Teilbaum einer App.
```

So ist die App kein „stärkerer Artikel“, sondern ein anderer Inhaltstyp. Das Theme behält seine Hoheit über den Artikel; die App behält ihre Hoheit über ihren eigenen DOM.

`!important` ist in diesem Projekt für das Übersteuern dieser Grenze kategorisch verboten. Es wäre keine Systemgrenze, sondern ein lokaler Vorrangtrick.

### 2.5 Lokale Mechanik ist fachlicher Besitz, nicht Designversagen

Nicht jede CSS-Regel soll ein Primitive werden. Fachliche Bewegung, räumliche Choreografie, spezielle Überlagerungen oder app-exklusive Breakpoints können bewusst lokal sein.

Die Trennung lautet:

| Kategorie | Beispielhafte Bedeutung | Besitzer |
|---|---|---|
| Token | visuelle Rolle | Theme |
| Primitive | Button, Panel, Stat, Disclosure | Baukasten/Renderer |
| Chart-Chrome | Toolbar, Legende, Statusfläche | Chart-Renderer |
| App-Mechanik | Story-Choreografie, spezifische Überlagerung | jeweilige App |
| Canvas-Mechanik | Marker, Puls, Diagrammzeichnung | Chart-App/Plugin |

Lokale Mechanik ist nur dann zulässig, wenn sie:

1. fachlich begründet und nicht bloß eine optische Abweichung ist;
2. auf ihre App-Wurzel begrenzt bleibt;
3. die vorhandenen Tokens nutzt;
4. im normalen Theme-Auslieferungsweg sichtbar enthalten ist;
5. Reduced Motion ausdrücklich behandelt.

---

## 3. Produktionsarchitektur

### 3.1 Eine CSS-Lieferkette

Die Bearbeitungs- und Auslieferungskette ist absichtlich linear:

```text
Designwerte + Theme-Komposition + lokale Mechanikquellen
                         ↓
              screen.source.css als Kompositionswurzel
                         ↓
                 kanonischer Tailwind-Build
                         ↓
              assets/css/screen.css als Lieferartefakt
                         ↓
                       Theme-ZIP
```

Die Quelle wird bearbeitet, das Artefakt nie direkt. Der Build ist der einzige Weg, über den neue Utilities und lokale Mechanik in die ausgelieferte Theme-CSS gelangen.

Die strategische Konsequenz für normale Apps lautet:

- Lokale Fachmechanik ist Theme-Quellcode, keine Ghost-Card-Beilage und keine Laufzeit-Style-Injektion.
- Sie wird in klar getrennten, app-spezifischen CSS-Quellen geführt und über die Kompositionswurzel eingebunden.
- Der Compiler bindet lokale Imports in das gebaute Artefakt ein; daraus entsteht kein zweiter Browser-Download und kein zweites Deployment-System.

Das ist kein Widerspruch zur Chart-App. Deren Renderer-Fallback ist ein Kompatibilitätsweg für bewusst Tailwind-freie Engine-Testseiten. Er ist kein allgemeiner Produktions-Ladeweg für normale App-Mechanik.

### 3.2 Eine App-Wurzel pro Runtime

Eine normale App hat zwei Identitäten:

```text
gemeinsame App-Identität: Teil der normalen App-Familie
lokale App-Identität: eindeutige fachliche/visuelle Kapselung
```

Die gemeinsame Identität erlaubt Bootstrap, Sicherheitsgrenzen und universelle Regeln. Die lokale, als Literal in der App definierte Identität begrenzt Fachmechanik und verhindert Kollisionen zwischen künftigen Apps.

Der Bootstrapper erzeugt keine Style-Namen aus Benutzerdaten. Er entscheidet nur anhand seiner festen Registry, welche fest importierte Runtime gestartet wird.

### 3.3 Bewusster Preflight-Verzicht

Tailwind Preflight ist ein globaler Reset. Das Theme verzichtet bewusst darauf, weil Ghost-Editorial, HBS-Chrome und vorhandene Inhalte bereits eigene Basisregeln haben.

Das bedeutet nicht, dass jede App improvisiert. Es bedeutet:

```text
Globaler Browser-Default → Teil des gemeinsamen App-Primitivvertrags
nicht → individuelle Sonderarbeit jeder App
```

Das bestehende Button-Primitive muss deshalb die für native Controls nötige Normalisierung selbst enthalten und gleichzeitig sichtbaren Tastaturfokus garantieren. Ein späteres Aktivieren von Preflight wäre ein eigenständiger Theme-Gesamtaudit, keine App-Migration.

---

## 4. Drei Testwelten, ein visueller Vertrag

Das Projekt hat absichtlich unterschiedliche Testumgebungen. Sie dürfen nicht verwechselt werden.

| Umgebung | Ziel | CSS-Modell | Was sie nicht beweist |
|---|---|---|---|
| App-Testseite | DOM, Zustände, Utility-Manifest, lokale Fachlogik | Play-CDN plus Test-Bridge | Ghost-Kaskade und Produktions-Build |
| Tailwind-freie Engine-Testseite | Chart-Engine isoliert testen | Renderer-Fallback | Theme-/App-Integration |
| Lokales Ghost | reale HTML-Card im Artikelkontext | gebautes `screen.css`, kein CDN | nur schwer vollständig automatisierbare Sichtwirkung |

Die drei Welten bilden zusammen einen Beweisdreiklang:

```text
Strukturbeweis + Komponentenbeweis + Integrationsbeweis
```

Keine einzelne Ebene ersetzt die anderen. Insbesondere kann eine App-Testseite nicht beweisen, dass Ghosts Editorial-CSS den App-DOM nicht beeinflusst.

---

## 5. Wachstum auf 25 Apps

Das Wachstum wird nicht durch eine neue App-Plattform bewältigt, sondern durch feste Extraktionsregeln.

### Wiederverwenden vor Erfinden

1. Zuerst vorhandene Token und Baukasten-Primitiven verwenden.
2. Eine neue gemeinsame visuelle Komponente erst dann extrahieren, wenn mindestens zwei normale Apps dieselbe Semantik und denselben Interaktionsvertrag benötigen.
3. Eine lokale Mechanik bleibt lokal, solange sie nicht wiederkehrt.
4. Eine wiederkehrende Fachbedeutung wird zuerst als kleiner Design-/Vertrags-AP geklärt, nicht als optische Variante improvisiert.

### Budget statt Vermutung

Lokale Mechanik-CSS wächst mit der Zahl der Apps, aber nicht jede Utility wächst mit ihr: Der Compiler dedupliziert das Strukturvokabular. Der aktuelle Pilot dient als Messpunkt, nicht als Größenprognose.

Pro Migration werden daher gemessen und protokolliert:

- Veränderung der minimierten `screen.css`-Größe;
- Anteil lokaler Mechanik;
- neue, nicht bereits vorhandene Utilities;
- tatsächliche Lade- und Browserwirkung im lokalen Ghost.

Kein CSS-Splitting, CSS-Loader oder app-spezifischer Netzwerkmechanismus entsteht vor einem gemessenen Budgetproblem. Das ist Ockhams Rasiermesser: Der vorhandene Build löst die heutige Aufgabe; ein potenzielles Problem von App 25 wird nicht bei App 1 implementiert.

---

## 6. Anti-Pattern und Ausschlüsse

- Keine zweite Designwahrheit in JavaScript, externen Stylesheets oder HTML-Cards.
- Keine freien Farbwerte oder Style-Entscheidungen in Strategien.
- Keine Card-gesteuerten CSS-Pfade, Style-URLs oder dynamischen Stylesheet-Imports.
- Kein `!important` als Kaskadenreparatur.
- Kein globales Tailwind Preflight als Nebenwirkung einer App-Migration.
- Keine Kopie von Chart-Chrome oder Canvas-Plugin-Mechanik in aufrufende Apps.
- Keine globale App-Renderer-Fabrik vor nachgewiesener Wiederverwendung.
- Keine Bearbeitung von `screen.css` von Hand.
- Keine Abnahme ausschließlich über Play-CDN-Testseiten.

---

## 7. Strategische Invarianten

Ein CSS-/App-AP ist nur dann architekturkonform, wenn alle folgenden Aussagen wahr bleiben:

1. Eine Designänderung an Farbe oder Schrift braucht keine Suche in App-Logik.
2. Eine neue Utility ist nur dann auslieferbar, wenn ihre reale Runtime vom Build gescannt wird.
3. Lokale App-Mechanik ist im Theme-Artefakt enthalten, begrenzt und testbar.
4. Ghost-Editorial und App-DOM besitzen getrennte Gestaltungshoheit.
5. Jede interaktive Basisform besitzt sichtbaren Fokus und kontrolliert Browser-Defaults bewusst.
6. Chart-App und normale Apps teilen Tokens und Baukasten, aber nicht unpassende Fachmechanik.
7. Testumgebung und Produktionsumgebung werden nie als dieselbe Beweisart ausgegeben.
8. Jede Erweiterung entfernt mehr mögliche Fehlwege, als sie neue Infrastruktur hinzufügt.

---

## 8. Quellen für das Peer Review

Der Peer liest vollständig:

1. dieses Dokument;
2. `docs/steering/design/CSS-KONVENTIONEN.md`;
3. `docs/steering/design/TAILWIND-APP-BAUKASTEN_KONZEPT_V0-1.md`;
4. `docs/steering/design/CI-POOL-ROLLENKONTRAKT.md`;
5. `docs/App-Fabrik/01_DECISION_LOG.md`;
6. `docs/spec/ARCHITECTURE STRATEGY PAPER VX.md`;
7. `docs/spec/Der Rucksack (Context Object Pattern).md`;
8. `docs/steering/handovers/MIGRATIONSSTRATEGIE_GHOST_APPS_V2_CHART_BLAUPAUSE.md`;
9. `docs/steering/handovers/GHOST_APP_CSS_ARCHITEKTUR_UMSETZUNGSVORLAGE_V2.md`;
10. `docs/steering/audits/GHOST_APP_CSS_ARCHITEKTUR_BUGREPORT_PEER_PAKET_V1.md`;
11. `docs/steering/audits/PEER_REVIEW_ERGEBNIS_GHOST_APP_CSS_ARCHITEKTUR_V1.md`;
12. `Theme/src/css/screen.source.css`;
13. `Theme/assets/css/tokens.css`;
14. `Theme/assets/js/fw-chart-engine/core/FwRenderer.js`;
15. `Theme/assets/js/fw-chart-engine/core/FwTheme.js`;
16. `Theme/assets/js/apps/index.js`;
17. `Theme/assets/js/apps/prokrastinations-preis.js`;
18. `Apps/prokrastinations-preis/app.css`;
19. `package.json`.

Zusätzliche direkte Imports, Build-Konfigurationen, Tests und HBS-Dateien darf der Peer read-only lesen, wenn sie für eine Behauptung oder einen Widerspruch nötig sind.

---

## 9. Prüffragen für Fable

Der Peer beantwortet jede Frage mit **bestätigt**, **widerlegt** oder **offen** und belegt sie mit Pfad:Zeile.

1. Beschreibt das Fünf-Ebenen-Modell die reale Architektur vollständig, ohne eine neue Designwahrheit zu erfinden?
2. Ist die Einordnung von Tokens als stabile visuelle Schnittstelle mit KDR 14 und den realen Implementierungen vereinbar?
3. Ist Tailwind im Produktionsmodell korrekt als Compiler und nicht als Laufzeitbibliothek beschrieben?
4. Ist die `@source`-Quellenliste tatsächlich Teil des Produktionsvertrags und ausreichend durch bestehende Verträge abgesichert?
5. Ist die Renderer-/Strategie-Grenze für Chart-App und normale App korrekt beschrieben?
6. Ist die Abgrenzung zwischen Chart-Plugin, App-Mechanik und Rucksack vollständig und widerspruchsfrei?
7. Ist das Kaskadenmodell fachlich korrekt, insbesondere die Trennung ungelayerter Ghost-Regeln und gelayerter Utilities?
8. Ist die Ausnahme an der Ursprungsregel der kleinste saubere Schutz der App-Grenze? Gibt es eine bessere Lösung ohne `!important`, Preflight oder eine zweite CSS-Wahrheit?
9. Ist die kategorische Ablehnung von `!important` in diesem Anwendungsfall begründet oder zu weit gefasst?
10. Ist die Einordnung des Chart-Renderer-Fallbacks als Test-Kompatibilitätsweg statt normaler App-Produktionsauslieferung korrekt?
11. Ist die Wahl eines einzigen Theme-CSS-Buildwegs für lokale App-Mechanik gegenüber einer JavaScript-Style-Injektion architektonisch die bessere Regel?
12. Ist der Preflight-Verzicht mit einem zentralen Primitivvertrag für native Controls nachhaltig skalierbar?
13. Reichen die drei Testwelten als Qualitätsmodell aus? Welche belegte Testlücke bleibt?
14. Ist die Wachstumsregel „erst messen, dann splitten/extrahieren“ für ungefähr 25 Apps angemessen?
15. Welche Aussage dieses Dokuments ist zu absolut, unpräzise, doppelt oder im Widerspruch zu einer bindenden Quelle?

---

## 10. Erwartetes Peer-Ergebnis

Schreibe ausschließlich:

```markdown
# Peer Review — CSS-Strategie Ghost / Tailwind / Apps

## Gesamturteil
GO / GO MIT AUFLAGEN / NO-GO

## Prüffragen
| Nr. | Urteil | Beleg | Begründung |

## Findings
| ID | Priorität | Ist | Soll | Auswirkung | Kleinste Korrektur | Beleg |

## Bestätigte strategische Regeln

## Widersprüche oder offene Entscheidungen

## Empfohlene Änderungen an der Strategie
```

Prioritäten:

- **P1:** würde eine falsche CSS-Auslieferungs-, Kaskaden- oder Designhoheitsregel festschreiben.
- **P2:** gefährdet Skalierung, Testbarkeit oder wiederholbare Migration.
- **P3:** Präzisierung ohne unmittelbaren Systembruch.

