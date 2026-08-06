# BrickRewind als app op je tablet — stap voor stap

Dit pakket bevat BrickRewind als **PWA (Progressive Web App)**: je installeert 'm
vanuit Chrome op je Android-tablet en hij gedraagt zich daarna als een gewone app
(eigen icoon, volledig scherm, werkt ook offline nadat hij één keer geopend is).

Bestanden in dit pakket:
- `index.html` — de app zelf
- `manifest.json` — vertelt de browser hoe de app heet, welk icoon en welke kleur
- `sw.js` — de "service worker", zorgt voor offline gebruik
- `icons/` — app-iconen

---

## Deel 1 — Een gratis plek om de app te hosten: GitHub Pages

Je hebt geen ervaring met hosten, dus dit leggen we helemaal vanaf nul uit.

### Stap 1 — Account maken op GitHub
1. Ga naar **https://github.com/join**
2. Kies een gebruikersnaam, vul je e-mail en een wachtwoord in, rond de aanmelding af.
3. Bevestig je e-mailadres via de mail die je krijgt.

### Stap 2 — Een "repository" (projectmap) aanmaken
1. Log in op github.com, klik rechtsboven op **+** → **New repository**.
2. Naam: bijvoorbeeld `brickrewind`.
3. Zet 'm op **Public** (dit is verplicht voor gratis GitHub Pages).
4. Vink **niets** extra aan (geen README nodig), klik **Create repository**.

### Stap 3 — De bestanden uploaden
1. Je ziet nu een lege repository met een knop **"uploading an existing file"** (of
   **Add file → Upload files** bovenin).
2. Sleep de hele inhoud van dit pakket erin: `index.html`, `manifest.json`, `sw.js`
   én de map `icons` (met alle bestanden erin). Belangrijk: de mapstructuur moet
   behouden blijven, dus upload de `icons`-map als geheel (slepen vanuit je
   bestandsverkenner werkt hiervoor het best).
3. Onderaan de pagina: klik **Commit changes** (de groene knop).

### Stap 4 — GitHub Pages aanzetten
1. Ga in je repository naar **Settings** (tandwiel-tabje bovenin).
2. Klik in het linkermenu op **Pages**.
3. Bij **Source** kies je **Deploy from a branch**.
4. Bij **Branch** kies je `main` en map `/ (root)` → klik **Save**.
5. Wacht ongeveer 1 minuut, ververs de pagina. Je ziet nu een groen vinkje en een
   link zoals:
   `https://jouwgebruikersnaam.github.io/brickrewind/`
6. Open die link — dit is je app-adres. Bewaar 'm.

---

## Deel 2 — Installeren op je Android-tablet

1. Open de link hierboven in **Chrome** op je tablet.
2. Rechtsboven in Chrome: tik op het menu (drie puntjes) → **App installeren**
   (of "Toevoegen aan startscherm" op oudere Chrome-versies).
3. Bevestig. Er verschijnt nu een BrickRewind-icoon op je startscherm/app-lijst,
   los van je browser.
4. Vanaf nu open je de app gewoon via dat icoon — volledig scherm, geen adresbalk.

**Offline gebruik:** open de app minstens één keer terwijl je wifi/internet hebt
aan staan, zodat alle bestanden (inclusief het PDF-onderdeel dat van een externe
bron komt) in de cache van je tablet komen. Daarna werkt het doorlopen van een
al-ingeladen handleiding ook zonder internet. Het **opzoeken van een setnummer**
via Rebrickable blijft wél altijd internet vereisen, want dat is een live-opzoeking.

---

## Deel 3 — Een update uploaden (later, als je de app aanpast)

1. Pas `index.html` aan zoals je wilt.
2. Open in `sw.js` de regel `CACHE_VERSION = 'brickrewind-v0.18-1';` en verhoog het
   nummer aan het eind (bv. naar `-2`). **Dit is belangrijk** — zonder deze wijziging
   blijft je tablet de oude, gecachete versie tonen in plaats van je update.
3. Ga naar je repository op github.com → open het bestand dat je wilt vervangen →
   potlood-icoon (Edit) → plak de nieuwe inhoud → **Commit changes**.
   (Of gebruik opnieuw **Add file → Upload files** om te overschrijven.)
4. Na ongeveer een minuut staat de update live. Open de app op je tablet, sluit 'm
   volledig af (uit recente apps vegen) en open 'm opnieuw om de update te laden.

---

## Let op: je Rebrickable API-sleutel

In de code (rond de commentaarregel *"Standaard Rebrickable-sleutel..."*) staat een
sleutel vooringevuld. Zodra dit in een **publieke** GitHub-repository staat, kan
iedereen die sleutel zien. Rebrickable-sleutels geven geen toegang tot iets
persoonlijks, maar anderen zouden 'm in theorie kunnen gebruiken en zo je eigen
rate-limit (aantal opzoekingen per periode) opsouperen.

Twee opties:
- **Laten staan** — makkelijkst, en in de praktijk meestal geen probleem voor een
  hobbyproject met weinig bezoekers.
- **Verwijderen als standaard** — haal de sleutel weg bij `DEFAULT_REBRICKABLE_KEY`
  in `index.html` (zet 'm op een lege string `""`). De app vraagt dan bij het
  opzoeken van een setnummer om een eigen sleutel, die de gebruiker daarna lokaal
  onthouden wordt (dat mechanisme zat al in de app).

Zeg het gerust als je wilt dat ik die tweede optie voor je doorvoer.
