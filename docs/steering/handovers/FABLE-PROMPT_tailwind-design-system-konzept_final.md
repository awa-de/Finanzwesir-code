# Fable-Prompt: Tailwind-Design-System-Konzept

Für Fable (`claude-fable-5`) optimierter Übergabe-Prompt. Modus: Konzept/Spec
zuerst, nur neue Dateien. Register neutral gehalten (Leser ist das Modell, nicht
der Auftraggeber). Vor Übergabe \[DATEINAME EINSETZEN] durch den echten
Befund-Dateinamen ersetzen.

\---

Verbinde dich mit dem Projektverzeichnis Z:\\Documents\\Nextcloud\\Finanzwesir 2.0.
Lies zuerst die Datei "docs/steering/patches/AP-tailwind-01\_befund-und-forschung\_Ergebnis.md" vollständig. Sie enthält den
aktuellen Befund: die relevanten Fragmente, Specs und Artefakte zum Stand des
Projekts.

## Stand

Die Apps und Charts funktionieren inhaltlich und technisch. Die CI-Farben und
Fonts sind definiert und eingebunden. Tailwind läuft derzeit als CDN. Das bleibt
in dieser Phase bewusst so, weil damit der volle Tailwind-Umfang verfügbar ist.
Die lokale Einbindung kommt erst am Projektende und ist jetzt kein Thema.

## Ziel

Ein Tailwind-Baukasten als Fundament für die Apps: Karten, Linien, Schatten und
weitere Grundelemente, definiert als eine Schnittstelle, die für über 25 Apps
trägt. Maßstab für Qualität: Die Optik unterstützt die Funktion der jeweiligen
App. Gestaltung dient dem Zweck, nicht der Dekoration.

## Aufgabe

Entwickle ein Design-System-Konzept für die Ghost.io-Site und die einzelnen
Apps. Zeige am Konzept, wie es auf die beiden real vorhandenen Elemente wirkt:
die Prokrastinations-App und die Charts (Linie, Balken, Torte).

Dies ist eine Konzept- und Spezifikationsphase, noch keine Umsetzung. Das
Konzept wird freigegeben, bevor Code entsteht.

## Effort

Arbeite mit hohem Reasoning-Effort (high). Das ist für diese Aufgabe ausreichend
und vermeidet unnötiges "Zerdenken" einfacher Teilschritte.

## Grenzen (Nicht-Ziele)

* Kein neues System erfinden. Erweitere die Namenskonventionen und Automatismen
von Tailwind, so wie es bei den Farben bereits umgesetzt ist. Prüfe zuerst, was
Tailwind selbst anbietet — von einfachen Elementen wie Slidern, Buttons und
Eingabefeldern bis zu komplexen Bausteinen — bevor du etwas Eigenes vorschlägst.
* Die bereits definierten CI-Farben und Fonts nicht verändern. Darauf aufbauen.
* Nicht alle Apps migrieren. Die beiden Beispiele sind der Nachweis, nicht der
Rollout.
* In dieser Phase keine bestehenden Dateien ändern. Nur neue Vorschlags- oder
Doku-Dateien anlegen. app.css, screen.css und die Testseiten bleiben unberührt.
* Keine App-Logik (app.js) und kein Chart-Verhalten ändern. Nur Optik und
Struktur.
* Keine neuen Libraries oder Tailwind-Plugins ohne vorherige Rückfrage.

## Liefergegenstand

Eine Konzept-Doku als neue Datei. Inhalt: der Baukasten (welche Karten, Schatten,
Linien und Grundelemente) als Regelwerk aus Tailwind-Klassen und -Konventionen,
sowie die konkrete Anwendung auf die Prokrastinations-App und die drei
Chart-Typen. Kein Produktionscode in dieser Phase.

## Fortschritts-Nachweis

Bevor du einen Schritt als erledigt meldest: Prüfe die Aussage gegen ein
tatsächliches Ergebnis aus dieser Session (gelesene Datei, erzeugte Klasse,
angewendetes Element). Wenn etwas noch nicht überprüft ist, sag das explizit.
Melde Ergebnisse ehrlich — auch wenn ein Teil noch offen oder unklar ist.

## Kommunikation

Beginne mit dem Ergebnis: zuerst die Empfehlung, danach Details und Begründung.

## Arbeitsweise

Führe keine eigene Web-Recherche durch. Nutze dein vorhandenes Wissen über
Tailwind. Wenn Informationen fehlen (etwa Screenshots, weitere Specs oder der
Nutzungskontext einer App), benenne konkret, was du brauchst, und frage nach,
statt eine Annahme zu treffen.

