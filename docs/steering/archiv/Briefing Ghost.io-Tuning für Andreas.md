Hier ist das Briefing für deinen Admin. Der Text ist so verfasst, dass er technisch präzise ist, den "SRE-Slang" spricht und direkt umsetzbar ist, ohne belehrend zu wirken. Es zeigt, dass du (bzw. wir) wissen, wovon wir reden, und respektiert seine Zeit durch klare Specs.

Du kannst das 1:1 so per E-Mail oder Ticket-System versenden.

---

**Betreff:** Performance-Tuning für Static Assets (Ghost/Chart Engine) & Cloudflare Config

Hi [Name des Admins],

wir haben gerade ein Performance-Audit für unsere Client-Side Chart Engine abgeschlossen. Der JS-Code ist soweit optimiert, aber wir haben festgestellt, dass wir infrastrukturseitig noch "Low Hanging Fruits" haben, besonders bei der Auslieferung der CSV-Daten (Payload ca. 10–60kb).

Da die Daten quasi statisch sind (Update nur 1x pro Quartal mit neuem Dateinamen/Versionierung), wollen wir hier voll auf **aggressives Caching** und **Multiplexing** setzen.

Könntest du dir bitte folgende Konfigurationen auf dem Nginx (Hetzner) und im Cloudflare-Panel ansehen?

### 1. Nginx (Origin Server)

Ziel: Kompression erzwingen und Browser-Caching auf "Infinite" setzen.

Bitte füge im `server`-Block der Ghost-Instanz (oder im entsprechenden `location`-Block für `/content/files/` bzw. wo die Assets liegen) folgende Direktiven hinzu:

* **Compression:** Aktivierung von Gzip (oder Brotli `brotli on;`, falls das Modul geladen ist) explizit für CSV.
* **Caching:** Da wir Cache-Busting über Dateinamen machen, brauchen wir `immutable`.

**Snippet-Vorschlag für die Config:**

```nginx
location ~* \.(csv|json)$ {
    # 1. Compression
    gzip on;
    gzip_types text/csv application/json;
    gzip_min_length 1000;
    
    # 2. Caching Headers (Critical)
    # Verhindert 304 Re-Validation Requests -> 0ms Latency on reload
    add_header Cache-Control "public, max-age=31536000, immutable";
    
    # 3. Security
    add_header X-Content-Type-Options "nosniff";
}

```

### 2. HTTP/2 bzw. HTTP/3

Da wir mehrere Assets gleichzeitig laden (Parallel Fetching), ist **Multiplexing** für uns kritisch.

* Bitte prüfen, ob `http2 on;` in der Nginx Config aktiv ist.
* Falls Cloudflare davor hängt (siehe unten), regelt CF meist das Protokoll zum Client, aber der Origin sollte sauber konfiguriert sein.

### 3. Cloudflare (Edge Layer)

Da wir Zugriff auf CF haben, lass uns das CDN nutzen, um den Origin (Hetzner) zu entlasten. Bitte folgende Einstellungen im Dashboard prüfen/setzen:

* **Page Rules (für den Ordner mit den CSVs):**
* *URL Pattern:* `deinedomain.com/content/files/*.csv` (Pfad bitte anpassen)
* *Cache Level:* **Cache Everything** (Zwingend, damit CF die CSVs auch wirklich cached, nicht nur Standard-Assets)
* *Edge Cache TTL:* **1 Month** (oder länger)


* **Network:**
* **HTTP/3 (QUIC):** Bitte auf **ON**. Das reduziert die Latenz für Mobile User massiv.


* **Speed / Optimization (WICHTIG):**
* **Rocket Loader:** Bitte **OFF** für die Seiten mit Charts (oder global). Rocket Loader bricht oft die Initialisierung unserer Custom Chart Engine (Race Conditions).
* **Brotli:** **ON**.



### 4. Kurzer Check

Nach dem Reload der Nginx-Config müsste ein `curl -I https://deinedomain.com/pfad/zu/daten.csv` folgendes zeigen:

1. `cache-control: public, max-age=31536000, immutable`
2. `content-encoding: gzip` (oder br)
3. `cf-cache-status: HIT` (beim zweiten Aufruf)

Danke dir für den Support! Gib kurz Bescheid, wenn das live ist, dann messe ich die Latenzen nochmal durch.

Viele Grüße,
[Dein Name]