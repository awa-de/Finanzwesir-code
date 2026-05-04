# spec-mode-architecture

## Was dieser Skill soll

`spec-mode-architecture` ist dein Architekten-Skill.  
Er verwandelt Ideen, Skizzen und lose Notizen in eine saubere, strukturierte technische Spezifikation.

## Was der Skill macht

- Klärt Ziel und Annahmen zu einem Feature oder Modul.
- Beschreibt die gewünschte Funktionalität auf technischer Ebene.
- Identifiziert und sammelt relevante Edge-Cases und Fehlerfälle.
- Leitet konkrete Testfälle (Input → erwarteter Output) ab.
- Vorschlag einer sinnvollen API (Funktionen, Parameter, Rückgabewerte).

Er erzeugt **keinen Code**, sondern nur Denk- und Planungsartefakte.

## Wie und wann du ihn einsetzt

Typische Einsatzmomente:

- Zu Beginn eines neuen Features (z.B. neues Chart-Feature, neue Aggregationslogik).
- Wenn eine vage Idee in etwas Implementierbares übersetzt werden muss.
- Wenn du sicherstellen willst, dass Edge-Cases und Tests von Anfang an mitgedacht werden.
- Vor größeren Refactors, um Zielbild und Risiken sauber aufzuschreiben.

Ablauf:

1. Du beschreibst kurz Kontext und Ziel in natürlicher Sprache.
2. Optional hängst du bestehende Notizen / Architekturideen an.
3. Der Skill liefert eine strukturierte Spezifikation mit allen beschriebenen Abschnitten.
4. Diese Spezifikation gibst du dann an Implementierungs- oder Review-Skills weiter.

## Was du erwarten kannst

- Klare, gegliederte Spezifikationen mit Fokus auf Verhalten statt Code.
- Explizite Annahmen und offene Fragen, die du entscheiden musst.
- Eine direkte Vorlage, mit der du Arbeitspakete für Implementierung und Tests schneiden kannst.
- Weniger „Nachjustiererei“ in der Implementierungsphase, weil viele Stolpersteine vorab sichtbar werden.
