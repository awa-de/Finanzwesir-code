---
name: project-pbn-strategy
description: "P→B→N (Proven→Better→New, Mark Pincus) als operativer App-Building-Layer — Proven=Tailwind, Better=ein Nutzenmoment pro Familie (10v10-Test), New=isoliert; AF-21/22/23 in Umsetzung"
metadata: 
  node_type: memory
  type: project
  originSessionId: b5672add-272f-4073-bcf2-0c90d6f8d836
---

P→B→N (Mark Pincus: „All new fails") ist beschlossener strategischer Layer für die App-Fabrik. Verabschiedet 2026-06-15, Umsetzung in AF-21/22/23.

**Kern-Mapping:**
- Proven = bekanntes UI-Muster (Tailwind-Standardkomponenten pro App-Familie, kein Erfinden)
- Better = ein klar formulierter Nutzenmoment — 10v10-Test: Würden 10 von 10 normalen Menschen spontan sagen „Das ist besser als vorher"?
- New = max. 20% der App, klar als Experiment markiert, isoliert — Misserfolg darf Proven/Better nicht gefährden

**Warum:** Löst Death by Compromise während der Spec-Phase. Was der Gründer für „Better" hält, ist meistens „New" (Pincus-Warnung). Der Test externalisiert die Perspektive.

**How to apply:**
- AF-21: Family-Standards (PBN-FAMILY-STANDARDS.md) — einmal pro Familie definiert, skaliert auf alle 25 Apps
- AF-22: P→B→N-Block als Pflichtabschnitt in APP_SPEC.md-Vorlage + 10v10-Testfeld
- AF-23: 4-Punkte Pincus-Check als Pre-Code-Quality-Gate dokumentieren

**Verbindung zu Tailwind:** Proven = Tailwind-Komponenten (bereits bekannt, gelernt, kein Custom CSS). Better = die eine Stelle, die vom Standard abweicht. New = explizit als Beta markiert.
