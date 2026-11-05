# Tedensko poročilo – 2. teden
**Skupina:** Jernej Robnik, Vid Strmčnik, Lan Plazar  
**Mentor:** Andraž Pušnik

## Povzetek napredka
Jernej je dokončal `docker-compose.yml` s storitvama za bazo (MariaDB 11) in aplikacijo, uredil spremenljivke v `.env` / `.env.example`, vzpostavil vejo `develop` in pravila za vlečne zahtevke. Baza teče v svojem vsebniku, ločeno od aplikacije, aplikacija se z njo povezuje prek skupnega Docker omrežja. Okolje se zažene z ukazom `docker compose up`.

Vid in Lan sta izdelala SQL skripto `baza/01_shema.sql` (6 tabel, tuji ključi, ON DELETE CASCADE na veznikih) in skripto za testne podatke (`aplikacija/seed.js`): 10 predmetov, 20 učiteljev, 100 učencev. Vsak predmet ima dva učitelja, vsak učitelj dva predmeta, vsak učenec tri predmete. Postavila sta tudi osnovno ogrodje Express aplikacije s povezavo z bazo.

## Struktura docker-compose.yml
Storitev `baza` (MariaDB, volumen `baza_podatki`, ob prvem zagonu uvozi `baza/`) in storitev `aplikacija` (gradnja iz `aplikacija/`, odvisna od zdrave baze, volumen `datoteke` za naložene datoteke).

## Sklepi sestanka
Testni podatki se vnesejo samodejno ob prvem zagonu. Struktura baze je v 3. normalni obliki in opisana v `docs/er-diagram.md`.

## Načrt za 3. teden
CRUD administratorja za predmete, učitelje in učence ter dodelitve; Nginx kot reverse proxy z osnovo za HTTPS (samopodpisano potrdilo); začetek dokumentacije namestitve.

## Preverjanje zahtev
- [x] Baza v lastnem vsebniku
- [x] Testni podatki ustrezajo zahtevam (več učiteljev na predmet, več predmetov na učitelja, več predmetov na učenca)
- [x] Aplikacija se z bazo povezuje v skupnem Docker omrežju
- [x] Zagon z enim ukazom
