# Tedensko poročilo – 3. teden
**Skupina:** Jernej Robnik, Vid Strmčnik, Lan Plazar  
**Mentor:** Andraž Pušnik

## Povzetek napredka
Vid in Lan sta izdelala pogled administratorja: dodajanje, urejanje in brisanje predmetov, učiteljev in učencev (`/admin/predmeti`, `/admin/ucitelji`, `/admin/ucenci`) ter stran »Dodelitve« za povezave učitelj–predmet in učenec–predmet. Vnosi se preverjajo (obvezna polja, oblika e-pošte, najmanj 8 znakov gesla, podvojen naziv ali e-pošta, učenec najmanj 2 predmeta). Koda je razdeljena na poti (`app.js`), testne podatke (`seed.js`) in predloge (`views/`).

Jernej je v `docker-compose.yml` dodal Nginx kot reverse proxy pred aplikacijskim vsebnikom (`nginx/nginx.conf`), preusmeritev HTTP na HTTPS in skript `skripte/certifikat-samopodpisan.sh` za razvojno potrdilo. Začel je pisati tehnično dokumentacijo.

## Sklepi sestanka
Administrator je preizkušen na testnih podatkih (10 / 20 / 100). Naložene datoteke bodo ločene od javno dostopnih map.

## Načrt za 4. teden
Prijava in registracija, pogleda učitelja in učenca, javna domena z Let's Encrypt, skripta za varnostne kopije.

## Preverjanje zahtev
- [x] Vse tri operacije za vse tri entitete
- [x] Relacije vidne v uporabniškem vmesniku (Dodelitve)
- [x] Osnova za HTTPS (samopodpisano potrdilo)
