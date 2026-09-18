# movec-demos

Alle movec-Produktpräsentationen und der interne Demo-Hub in **einem** Repo,
ausgeliefert als **eine** GitHub-Pages-Site.

Vorher lag jede Seite in einem eigenen Repo unter einem privaten GitHub-Account.
Das hatte drei Probleme: das Vertriebsmaterial gehörte einer Privatperson statt
der Firma, GitHub Pages erlaubt nur *eine* Custom Domain pro Repo (12 Repos =
12 DNS-Einträge), und seitenübergreifende CI-Änderungen mussten zwölfmal
gepflegt werden.

## URL-Schema

| Pfad | Inhalt | Zielgruppe |
|---|---|---|
| `/` | neutrale Seite, verlinkt nur movec.com | — |
| `/hub/` | **Demo-Hub** – Einstieg für Vertrieb | **intern** |
| `/motiondata/` | motionData | Kunde |
| `/mates/` | MATES (Überblick über alle mates) | Kunde |
| `/servmate/` | servMate | Kunde |
| `/techmate/` | techMate | Kunde |
| `/photomate/` | photoMate | Kunde |
| `/partsmate/` | partsMate | Kunde |
| `/tyremate/` | tyreMate | Kunde |
| `/workshopassist/` | workshopAssist | Kunde |
| `/connectapi/` | connectAPI | Kunde |

### Warum der Hub nicht auf der Root liegt

Die Produktpräsentationen gehen als Link an Interessenten. Läge der Hub auf der
Root, könnte jeder Empfänger den Pfad abschneiden und stünde im internen
Vertriebswerkzeug. Unter `/hub/` lässt sich der Hub später außerdem **allein**
hinter einen M365-Login legen, während die Präsentationen öffentlich bleiben –
mit dem Hub auf der Root wäre das nicht möglich.

## Aufbau

Jede Seite ist **eine** self-contained `index.html`: kein Build, keine externen
Assets, Bilder als Data-URI. Das ist Absicht – so lässt sich eine Präsentation
mailen und **ohne Internet** beim Händler zeigen. Gemeinsames CSS wird deshalb
bewusst *nicht* ausgelagert.

```
/                     neutrale Landing + 404
/hub/index.html       Demo-Hub (Katalog im CATALOG-Array am Dateiende)
/<produkt>/index.html je eine Produktpräsentation
/docs/                Betriebs- und Quellen-Dokumentation
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

Ziel-Domain und die geplante Absicherung des Hubs: siehe
[`docs/IT-TICKET.md`](docs/IT-TICKET.md).

## Inhaltsquellen

Die Seiteninhalte sind derzeit **händisch** gepflegt und *nicht* aus Confluence
abgeleitet. Die Zuordnung Produkt → Service-Center-Doku ist in
[`docs/SERVICE-CENTER-QUELLEN.md`](docs/SERVICE-CENTER-QUELLEN.md)
dokumentiert; sie ist die Grundlage für einen späteren Build-Sync und wird
aktuell nur für die Doku-Buttons im Hub genutzt.

## Umzug der alten Einzel-Repos

Schon verschickte Links zeigen auf die alten Repos
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
