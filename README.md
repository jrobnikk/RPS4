# Šolski IS – podpora šolskemu delu na daljavo

Projekt pri predmetu RPS – Računalniški produkti in storitve.

## Skupina
| Član | Vloga |
|------|-------|
| Jernej Robnik | Vzdrževalec IS |
| Vid Strmčnik | Razvijalec |
| Lan Plazar | Razvijalec |

Mentor: Andraž Pušnik

## Opis
Spletna aplikacija s tremi pogledi (administrator, učitelj, učenec). Teče v Docker vsebnikih na Linux strežniku in je objavljena na javni domeni prek HTTPS.

## Struktura repozitorija
```
aplikacija/   Node.js + Express aplikacija (app.js, seed.js, views/)
baza/         SQL shema (6 tabel)
nginx/        konfiguracija reverse proxyja in potrdila
skripte/      potrdila (samopodpisano, Let's Encrypt), varnostne kopije
docs/         specifikacija, ER diagram, skice, tehnična dokumentacija, uporabniška navodila, testni primeri
porocila/     tedenska poročila 1–6 in zaključno poročilo
docker-compose.yml, .env.example
```

## Zagon
```
cp .env.example .env              # vpišite gesla
./skripte/certifikat-samopodpisan.sh
docker compose up -d --build
```
Nato odprite https://localhost (sprejmite opozorilo za samopodpisano potrdilo). Javna domena in Let's Encrypt: glej [tehnično dokumentacijo](docs/tehnicna-dokumentacija.md).

## Dokumentacija
- [Specifikacija](docs/specifikacija.md), [ER diagram](docs/er-diagram.md), [Skice](docs/wireframes.md)
- [Tehnična dokumentacija](docs/tehnicna-dokumentacija.md), [Uporabniška navodila](docs/uporabniska-navodila.md), [Testni primeri](docs/testni-primeri.md)
- [Zaključno poročilo](porocila/zakljucno-porocilo.md)

## Pravila dela z Gitom
Veji `main` in `develop`, delo na `feature/...`, združevanje prek vlečnih zahtevkov s pregledom, napake v GitHub Issues.

## Prijava v testno okolje (po prvem zagonu se samodejno vnesejo testni podatki)
| Vloga | E-pošta | Geslo |
|-------|---------|-------|
| Administrator | admin@sola.si | admin123 |
| Učitelj | ucitelj1@sola.si … ucitelj20@sola.si | geslo123 |
| Učenec | ucenec1@sola.si … ucenec100@sola.si | geslo123 |

Aplikacija: https://localhost. Pred javno objavo zamenjajte vsa testna gesla.
