# App-Fabrik — Startlinie

**Stand:** 2026-07-18  
**Status:** Arbeitssteuerung; wird nur nach realem Befund oder bewusster Produktentscheidung geändert.  
**Geltung:** Diese Reihenfolge ist keine automatische Arbeitsfreigabe. Jeder Punkt braucht weiterhin einen eigenen, risikogestuften Arbeitsauftrag.

1. **AF-Mockup-Anamnese, Klasse B:** Bestehende Vorlagen, Verträge, Piloten und echte Lücken gezielt inventarisieren; keine Datei ändern.

2. **Mockup-Vertrag, Klasse C — ENTSCHIEDEN 2026-07-17:** Schutzgut, Knautschzone, Artefakte, Happy-Path-Grenze, Abnahme und Übergabe sind verbindlich festgehalten in `docs/App-Fabrik/MOCKUP-VERTRAG.md` (E-01 Datenfidelität, E-02 Wirkungsprüfung ohne Selbstzertifizierung, E-03 Wegwerfgrenze, E-04 Werkstatt/Quellmanifest; Alberts Freigabe).

3. **Starterkit, Klasse B:** Nur die freigegebenen Vorlagen und das Werkzeug bauen — ein modellneutraler, einheitlicher Psychosprint-Grundprompt auf Basis von AP-app-fabrik-06, Werkstatt-Startgerüst ohne App-Logik, Grok-Gegenkritikvorlage gemäß MOCKUP-VERTRAG.md §7 (bestehender Vier-Kriterien-Prüfscore plus qualitative, A/B-zuordenbare Schärfung), ein deterministisches Python-Werkzeug für Vorbereitung, Anonymisierung und Zusammenführung sowie Sonnet-Bauprompt und technische Übergabevorlage.

4. **Zweier-Psychosprint, Klasse B:** Sol und Fable erhalten dieselbe Mini-Spec und exakt denselben vollständigen Psychosprint-Prompt. Nur Teilnehmer-ID und Zielpfad der Rohdatei unterscheiden sich; sie verändern keinen Denkauftrag.

5. **Unabhängige Kritik:** Grok prüft die zwei anonymisierten Rohentwürfe gemäß MOCKUP-VERTRAG.md §7 mit dem bestehenden Vier-Kriterien-Prüfscore und qualitativer Begründung. Es schärft Entwurf A oder B zuordenbar, entscheidet aber nicht über das Produkt und eröffnet keinen dritten Mockup-Pfad.

6. **Festes Zwei-Varianten-Duell:** Sonnet baut immer beide Rohentwürfe mit den zulässigen Grok-Schärfungen als getrennte Werkstatt-Mockups.

7. **Mockup-Duell, Klasse B:** Albert beurteilt beide interaktiven, CI-konformen Happy-Path-Mockups auf 375/768/1280 px und wählt danach den psychologisch stärkeren Weg.

8. **Psychologisches Gate:** Nur das Mockup mit echter Einsicht, starker Optik und klarem nächsten Schritt gewinnt; der Rest bleibt verworfener Entwurf.

9. **Modellentscheidung:** Das Modell, dessen Idee im gewonnenen Mockup steckt, ist vorläufiger Psychosprint-Kandidat; nach weiteren Apps wird das gegen reale Ergebnisse geprüft.

10. **Technische Übergabe, Klasse B:** Gewinner-Mockup wird in eine schlanke, technische APP_SPEC übersetzt; Interface, Daten, A11y, Zustände und Sicherheit ergänzen.

11. **Technischer Bau, Klasse B:** Sonnet setzt begrenzte Slices um; Python prüft Deterministisches, Browser prüft nur reale Darstellung und Interaktion.

12. **Komponenten-Ledger:** Bewährte UI-Elemente als lokal oder wiederverwendbar festhalten; keine Abstraktion ohne belegten Wiederholungsbedarf.

13. **Zwei weitere App-Familien:** Den Ablauf mit einer einfachen und einer andersartigen App wiederholen; erst danach entscheidet ihr über gemeinsame Komponenten, Registry oder Core.

14. **Produktionsstrang zuletzt:** Ghost-Integration, lokaler Tailwind-Build, Bootstrapper und Deployment erst dann, wenn reale fertige Apps ihren gemeinsamen Bedarf beweisen.
