# App-Fabrik — Startlinie

**Stand:** 2026-07-17  
**Status:** Arbeitssteuerung; wird nur nach realem Befund oder bewusster Produktentscheidung geändert.  
**Geltung:** Diese Reihenfolge ist keine automatische Arbeitsfreigabe. Jeder Punkt braucht weiterhin einen eigenen, risikogestuften Arbeitsauftrag.

1. **AF-Mockup-Anamnese, Klasse B:** Bestehende Vorlagen, Verträge, Piloten und echte Lücken gezielt inventarisieren; keine Datei ändern.

2. **Mockup-Vertrag, Klasse C — ENTSCHIEDEN 2026-07-17:** Schutzgut, Knautschzone, Artefakte, Happy-Path-Grenze, Abnahme und Übergabe sind verbindlich festgehalten in `docs/App-Fabrik/MOCKUP-VERTRAG.md` (E-01 Datenfidelität, E-02 Wirkungsprüfung ohne Selbstzertifizierung, E-03 Wegwerfgrenze, E-04 Werkstatt/Quellmanifest; Alberts Freigabe).

3. **Starterkit, Klasse B:** Nur die freigegebenen Vorlagen bauen — Psychosprint-Prompt, Werkstatt-Startgerüst ohne App-Logik, qualitative Gegenkritik-Leitfrage gemäß MOCKUP-VERTRAG.md §7 und technische Übergabevorlage.

4. **Vierer-Kalibrierung, Klasse B:** Terra/High, Opus, Sol und Fable erhalten dieselbe Mini-Spec und denselben Psychosprint-Prompt.

5. **Unabhängige Kritik:** Perplexity prüft die vier anonymisierten Entwürfe qualitativ gemäß MOCKUP-VERTRAG.md §7 und ohne numerischen Score; es entscheidet nicht über das Produkt.

6. **Produktwahl:** Albert wählt die zwei stärksten und unterschiedlichsten Wirkmechaniken aus.

7. **Mockup-Duell, Klasse B:** Zwei interaktive, CI-konforme Happy-Path-Mockups bauen und auf 375/768/1280 px beurteilen.

8. **Psychologisches Gate:** Nur das Mockup mit echter Einsicht, starker Optik und klarem nächsten Schritt gewinnt; der Rest bleibt verworfener Entwurf.

9. **Modellentscheidung:** Das Modell, dessen Idee im gewonnenen Mockup steckt, ist vorläufiger Psychosprint-Kandidat; nach weiteren Apps wird das gegen reale Ergebnisse geprüft.

10. **Technische Übergabe, Klasse B:** Gewinner-Mockup wird in eine schlanke, technische APP_SPEC übersetzt; Interface, Daten, A11y, Zustände und Sicherheit ergänzen.

11. **Technischer Bau, Klasse B:** Sonnet setzt begrenzte Slices um; Python prüft Deterministisches, Browser prüft nur reale Darstellung und Interaktion.

12. **Komponenten-Ledger:** Bewährte UI-Elemente als lokal oder wiederverwendbar festhalten; keine Abstraktion ohne belegten Wiederholungsbedarf.

13. **Zwei weitere App-Familien:** Den Ablauf mit einer einfachen und einer andersartigen App wiederholen; erst danach entscheidet ihr über gemeinsame Komponenten, Registry oder Core.

14. **Produktionsstrang zuletzt:** Ghost-Integration, lokaler Tailwind-Build, Bootstrapper und Deployment erst dann, wenn reale fertige Apps ihren gemeinsamen Bedarf beweisen.
