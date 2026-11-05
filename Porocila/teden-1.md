# Tedensko poročilo – 1. teden

**Skupina:** Jernej Robnik (vzdrževalec IS), Vid Strmčnik (razvijalec), Lan Plazar (razvijalec)
**Mentor:** Andraž Pušnik
**Obdobje:** 1. teden projekta RPS

## Povzetek napredka

V prvem tednu smo skupaj analizirali vsebinske zahteve projekta (4. poglavje navodil) in se dogovorili o osnovni zasnovi sistema. Dogovorili smo se, da bo aplikacija imela tri ločene poglede – administrator, učitelj in učenec – ter da bo celotna podatkovna baza organizirana okoli ene skupne tabele uporabnikov, ločene po vlogi, kar poenostavi prijavo in preverjanje pravic.

Jernej je ustvaril skupni repozitorij na GitHubu, vanj dodal mentorja Andraža Pušnika kot sodelavca s pravicami za pregled, ter pripravil osnovno strukturo map (`aplikacija/`, `baza/`, `docs/`, `porocila/`). Na svojem računalniku je namestil Docker in Docker Compose ter uspešno zagnal preizkusni vsebnik (`docker run hello-world`), s čimer je preveril, da okolje deluje. Pripravil je tudi osnutek datoteke `docker-compose.yml` s storitvijo za podatkovno bazo (MariaDB) ter datoteko `.env.example` za okoljske spremenljivke.

Vid in Lan sta izdelala specifikacijo sistema, ki natančno opisuje funkcionalne zahteve za vse tri poglede (administrator, učitelj, učenec) ter nefunkcionalne zahteve (zgoščevanje gesel, avtorizacija, odzivno oblikovanje, najmanj 5 podstrani). Skupaj sta izdelala tudi ER diagram podatkovne baze s šestimi tabelami (UPORABNIK, PREDMET, UCITELJ_PREDMET, VPIS, GRADIVO, ODDAJA) s pravilno določenimi primarnimi in tujimi ključi, ter skice (wireframe) za vse tri poglede aplikacije, ki prikazujejo postavitev navigacije, tabel in obrazcev.

## Sklepi sestanka

Na uvodnem sestanku smo si razdelili delo v skladu z opisanimi vlogami. Dogovorili smo se, da bo Jernej skrbel za infrastrukturo, Docker okolje in podatkovno bazo, Vid in Lan pa za razvoj same aplikacije po načelu "najprej preprosta povezava z bazo, nato postopno dodajanje funkcionalnosti". Odločili smo se, da bomo za razvojno ogrodje uporabili Node.js z Express, za podatkovno bazo pa MariaDB, ker ima skupina z njima že nekaj izkušenj. Dogovorili smo se tudi za pravilo dela z Gitom: razvoj poteka na vejah `feature/...`, združevanje v `develop` prek vlečnih zahtevkov s pregledom vsaj enega drugega člana, veja `main` pa ostaja stabilna. Vsak član bo dnevna poročila pisal sproti v mapo `porocila/`.

## Načrt za 2. teden

- Jernej: dokončanje datoteke `docker-compose.yml` (dodatek aplikacijskega vsebnika), ureditev `.env` spremenljivk, vzpostavitev veje `develop` in pravil za vlečne zahtevke.
- Vid in Lan: izdelava SQL skript za ustvarjanje tabel, priprava testnih podatkov (10 predmetov, 20 učiteljev, 100 učencev z ustreznimi relacijami) ter postavitev osnovnega ogrodja aplikacije in povezave z bazo.
- Skupaj: preverba, da se celotno okolje na vseh treh računalnikih zažene z enim ukazom (`docker compose up`).

## Preverjanje zahtev

- [x] Repozitorij je dostopen mentorju
- [x] ER diagram ima najmanj 4 tabele s primarnimi in tujimi ključi (ima 6 tabel)
- [x] Specifikacija zajema vse tri poglede (administrator, učitelj, učenec)
- [x] Docker okolje deluje na računalniku vzdrževalca IS, do konca 2. tedna bo preverjeno še na računalnikih razvijalcev
