# Produkt → Service-Center-Doku

Confluence-Space **`DOK` – „Service Center"**
(`https://motiondata-vector.atlassian.net/wiki/spaces/DOK`), der kundenseitige
Doku-Bereich. Gliederung: **motionData / CDP / Sales Manager / Mates**, darunter
je Sprachbaum (DE, EN, FR, HR, HU, PL, RS, SI) mit *Dokumentation*,
*Release News* und *Systemvoraussetzungen*.

Namenskonvention der Seiten:
`<Funktion> (<Pfad>/Dokumentation/<Produkt>/<Sprache>)`

Diese Tabelle speist die `doku`-Felder im `CATALOG` von `hub/index.html` und ist
die Zuordnung für einen späteren Build-Sync.

| Produkt im Hub | Service-Center-Seite | Seiten-ID | Stand |
|---|---|---|---|
| motionData | Paket-Einstieg motionData | `x/BrIXAQ` | laufend |
| CDP | Paket-Einstieg CDP | `x/CrIXAQ` | laufend |
| servMate | servMate (Dokumentation/Mates/DE) | `848527361` | 15.09.2026 |
| techMate | techMate (Dokumentation/Mates/DE) | `1463058548` | 04.08.2026 |
| photoMate | **Photo App** (Dokumentation/Mates/DE) | `18330709` | 04.03.2025 |
| vinMate | vinMate (Dokumentation/Mates/DE) | `655491073` | 27.05.2026 |
| partsMate | partsMate (Dokumentation/Mates/DE) | `18346123` | 19.05.2026 |
| tyreMate | tyreMate (Dokumentation/Mates/DE) | `432111617` | 09.09.2026 |
| workshopAssist | workshopAssist (Dokumentation/Mates/DE) | `1539932164` | 31.08.2026 |
| salesManager | Paket-Einstieg Sales Manager | `x/EbIXAQ` | laufend |
| Online Service Booking | Online Service Booking OSB (Apps & Services/…/Sales Manager/DE) | `18348193` | 10.09.2026 |
| Online Testdrive Booking | Online Testdrive Booking OTB (Apps & Services/…/Sales Manager/DE) | `18343403` | 14.08.2024 |
| movec AI Skills | movec AI (Dokumentation/Mates/DE) | `1463812106` | 04.08.2026 |

Seiten-URL: `…/wiki/spaces/DOK/pages/<Seiten-ID>` (Confluence löst den fehlenden
Titel-Slug selbst auf). Die `x/…`-Einträge sind Confluence-Kurzlinks auf die
Paket-Einstiegsseiten.

## Ohne Service-Center-Doku

Diese Produkte haben **keine** Seite im Space `DOK`, ihre Hub-Karten bekommen
deshalb keinen Doku-Button:

- connectAPI
- partnerhub Parts / partnerhub Vehicle
- movec Dealer Website Package
- CDP (nur Paket-Einstieg, keine Produktdoku)
- movec KI-Strategie

## Offene Punkte für den Sync

1. **photoMate heißt im Service Center noch „Photo App"** und die Seite ist vom
   04.03.2025 – Produktname und Stand divergieren zur Präsentation. Vor einem
   Sync muss die Doku nachgezogen oder die Zuordnung bestätigt werden.
2. **Die EN-/FR-Bäume enthalten nur Strukturseiten ohne Produktinhalte.** Die
   dreisprachigen Präsentationen (DE/EN/FR) haben dort keine Gegenstücke – ein
   Sync könnte zunächst nur DE bedienen.
3. **Online Testdrive Booking** ist seit 14.08.2024 unverändert.
4. Ein automatischer Sync braucht ein Confluence-API-Token als GitHub-Actions-
   Secret und ein Feld-Mapping pro Produkt (welcher Doku-Abschnitt in welchen
   Präsentationsabschnitt).
