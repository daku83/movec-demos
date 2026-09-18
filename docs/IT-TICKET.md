# Betrieb: Domain und Zugriffsschutz

Vorlage für das IT-Ticket. Zwei Schritte, unabhängig voneinander umsetzbar.

## Schritt 1 — Custom Domain (klein, sofort)

**Ziel:** `demos.movec.services` zeigt auf die GitHub-Pages-Site dieses Repos.

DNS-Eintrag:

```
demos.movec.services.   CNAME   <github-account-oder-org>.github.io.
```

Danach im Repo unter *Settings → Pages → Custom domain*
`demos.movec.services` eintragen und *Enforce HTTPS* aktivieren. GitHub legt
dabei selbst eine `CNAME`-Datei im Repo an — **vorher keine `CNAME`-Datei
committen**, sonst ist die Site unter der Standard-URL nicht erreichbar,
solange der DNS-Eintrag noch fehlt.

**Achtung Namenskollision:** `demo.movec.services` (Singular) ist bereits die
Demo der Dealer-Website und darf nicht überschrieben werden. Deshalb
`demos.` (Plural) oder alternativ `hub.movec.services`.

## Schritt 2 — Hub absichern (später)

Nur `/hub/` ist internes Vertriebswerkzeug, alles andere geht als Link an
Interessenten und soll öffentlich bleiben.

**Empfohlen: Azure Static Web Apps.** Deployt direkt aus diesem GitHub-Repo,
bringt Entra-ID-Login (M365) mit und kostet im Free-Tier nichts. Nur der
Hub-Pfad wird geschützt:

```json
{
  "routes": [
    { "route": "/hub/*", "allowedRoles": ["authenticated"] }
  ],
  "responseOverrides": {
    "401": { "redirect": "/.auth/login/aad", "statusCode": 302 }
  }
}
```

Damit sehen nur angemeldete movec-Mitarbeiter den Hub; die Präsentationen
bleiben ohne Login erreichbar.

**Nicht geeignet:** private GitHub-Pages-Sites mit Zugriffsschutz gibt es nur
mit GitHub-Enterprise-Cloud-Lizenz.

**Alternative**, falls die IT selbst hosten will: die Seiten sind statisches
HTML ohne Build-Schritt und können unverändert auf den bestehenden
`movec.services`-Webserver gelegt werden; der Schutz für `/hub/` erfolgt dann
per Basic-Auth oder IP-Beschränkung.

## Schritt 3 — Ownership (organisatorisch)

Das Repo soll einer **Firmen-GitHub-Organisation** gehören, nicht einem
privaten Account. Solange es privat gehostet ist, hängen alle Vertriebslinks an
einer Einzelperson.

**Reihenfolge:** Stand 18.09.2026 sind noch **keine** Links im Umlauf — die
Site ist bisher nur dem Ersteller bekannt. Der Transfer kann deshalb **sofort
und ohne Rücksicht auf bestehende URLs** erfolgen, auch vor Schritt 1.

Das ändert sich, sobald Links verschickt werden: GitHub leitet Pages-URLs nach
einem Ownership-Wechsel **nicht** weiter. Ab dann gilt: **erst Schritt 1, dann
der Transfer** — unter `demos.movec.services` ändert ein Transfer keine
einzige verschickte URL. Am saubersten ist deshalb, den Transfer **jetzt** zu
machen, solange er nichts kostet.
