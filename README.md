# movec-demos

Alle movec-Produktpräsentationen und der Demo-Hub in **einem** Repo,
ausgeliefert als **eine** GitHub-Pages-Site.

Vorher lag jede Seite in einem eigenen Repo. GitHub Pages erlaubt nur *eine*
Custom Domain pro Repo (12 Repos = 12 DNS-Einträge), und seitenübergreifende
CI-Änderungen mussten zwölfmal gepflegt werden.

## URL-Schema

| Pfad | Inhalt |
|---|---|
| `/` | neutrale Seite, verlinkt nur movec.com |
| `/hub/` | Demo-Hub – Übersicht der Präsentationen und Demos |
| `/motiondata/` | motionData |
| `/mates/` | MATES (Überblick über alle mates) |
| `/servmate/` | servMate |
| `/techmate/` | techMate |
| `/photomate/` | photoMate |
| `/partsmate/` | partsMate |
| `/tyremate/` | tyreMate |
| `/workshopassist/` | workshopAssist |
| `/connectapi/` | connectAPI |

Die Root ist absichtlich keine Übersichtsseite. Warum, steht in den internen
Notizen neben diesem Repo.

## Aufbau

Jede Seite ist **eine** self-contained `index.html`: kein Build, keine externen
Assets, Bilder als Data-URI. Das ist Absicht – so lässt sich eine Präsentation
mailen und **ohne Internet** beim Händler zeigen. Gemeinsames CSS wird deshalb
bewusst *nicht* ausgelagert.

```
/                     neutrale Landing + 404
/hub/index.html       Demo-Hub (Katalog im CATALOG-Array am Dateiende)
/<produkt>/index.html je eine Produktpräsentation
```

## Pflege

**Neue Produktpräsentation**: Ordner `/<produkt>/` anlegen, `index.html`
hineinlegen (Skill `movec-pitchpage`), dann im Hub unter `CATALOG` das Produkt
um `pitch: "../<produkt>/"` ergänzen.

**Hub-Katalog**: `CATALOG`-Array im `<script>` am Ende von `hub/index.html`.
Pro Produkt:

| Feld | Bedeutung |
|---|---|
| `name` | String, oder `{de,en}` wenn der Name übersetzt wird |
| `desc` | `{de,en}` |
| `demo` | URL der Live-Demo oder `null` |
| `pitch` | **relativer** Pfad, z. B. `"../techmate/"` |
| `doku` | Service-Center-Seite (Confluence-Space `DOK`) |
| `status` | Badge-Text, sonst weglassen |

`pitch` muss relativ bleiben – die Site läuft je nach Deployment unter einer
Custom Domain *oder* unter einem Unterpfad wie `…github.io/movec-demos/`.
Wurzelrelative Pfade (`/techmate/`) würden im zweiten Fall brechen.

## Deployment

Push auf `main` → GitHub Actions (`.github/workflows/deploy.yml`) → Pages.
`.nojekyll` verhindert die Jekyll-Verarbeitung.

Ziel-Domain und Betriebsdetails stehen in den internen Notizen neben diesem
Repo (`../movec-demos-notizen/`) — nicht hier, weil dieses Repo öffentlich ist.

## Inhaltsquellen

Die Seiteninhalte sind derzeit **händisch** gepflegt und *nicht* aus Confluence
abgeleitet. Die `doku`-Felder im `CATALOG` zeigen auf den Confluence-Space
`DOK` („Service Center"). Die vollständige Zuordnung Produkt → Seiten-ID liegt
in den internen Notizen neben diesem Repo
(`../movec-demos-notizen/SERVICE-CENTER-QUELLEN.md`).

## Umzug der alten Einzel-Repos

Wird erst gebraucht, wenn sich eine bereits verschickte Adresse ändert — etwa
bei der Umstellung auf die Custom Domain.

Das Skript zeigt auf die alten Repos
(`daku83.github.io/<produkt>-pitch/`). `scripts/make-redirects.mjs` legt dort
eine Weiterleitungsseite auf die neue Adresse an:

```bash
node scripts/make-redirects.mjs                                    # Vorschau
node scripts/make-redirects.mjs --write                            # schreibt
node scripts/make-redirects.mjs --write --base https://demos.movec.services
```

Das Skript überschreibt die `index.html` im jeweiligen alten Repo-Ordner; die
Inhalte bleiben dort in der Git-Historie erhalten. Die Repos müssen danach
einzeln committet und gepusht werden.

Sobald die Custom Domain steht, das Skript mit `--base` auf die neue Domain
erneut laufen lassen — dann zeigen die Weiterleitungen nicht mehr auf
`github.io`.
