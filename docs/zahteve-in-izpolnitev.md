# Izpolnjevanje zahtev navodil

Pregled zahtev iz 3. in 4. poglavja navodil in mesto njihove izpolnitve. Uporabno za zagovor.

| Zahteva | Kje je izpolnjena |
|---------|-------------------|
| Git in GitHub, veje, vlečni zahtevki, GitHub Issues | [git-delovni-proces.md](git-delovni-proces.md), `.github/` |
| Docker in Docker Compose, ločeni vsebniki | `docker-compose.yml` (baza, aplikacija, nginx) |
| Linux strežnik | [tehnicna-dokumentacija.md](tehnicna-dokumentacija.md), poglavje 3 |
| Relacijska baza v lastnem vsebniku | MariaDB 11, `docker-compose.yml` |
| Razvojno ogrodje | Node.js + Express |
| Reverse proxy in HTTPS | `nginx/nginx.conf`, `skripte/certifikat-*.sh` |
| Gesla zgoščena | bcrypt, `aplikacija/app.js` |
| Varnostne kopije | `skripte/backup.sh` |
| ER diagram, najmanj 4 tabele | [er-diagram.md](er-diagram.md) (6 tabel) |
| Skice za vse tri poglede | [wireframes.md](wireframes.md) |
| Najmanj 5 podstrani | 11 podstrani (glej tehnično dokumentacijo, poglavje 8) |
| Prijava z najmanj dvema vrstama uporabnikov in avtorizacija | admin, učitelj, učenec; `need(vloga)` v `app.js` |
| Odzivno oblikovanje | `views/layout.ejs` (meta viewport, prelomljena navigacija, drsne tabele) |
| CRUD: vnos, urejanje, brisanje | pogled administratorja |
| Najmanj 10 predmetov, 20 učiteljev, 100 učencev | `aplikacija/seed.js` |
| Predmeti z več učitelji, učitelji z več predmeti | seed in stran »Dodelitve« |
| Učenec obiskuje več kot en predmet | seed; aplikacija zahteva najmanj 2 |
| Učitelj nalaga in briše gradiva samo svojih predmetov | `/ucitelj/gradiva`, preverjanje `UCITELJ_PREDMET` |
| Učitelj pregleduje oddane naloge | `/ucitelj/oddaje` |
| Registracija in urejanje profila učenca | `/registracija`, `/ucenec/profil` |
| Učenec določa svoje predmete | `/ucenec/predmeti` |
| Vpogled v gradiva predmetov s seznama | `/ucenec/gradiva` |
| Oddaja nalog z imenom »Priimek Ime – Naslov« | `/ucenec/oddaja` |
| Povoz prejšnje datoteke po potrditvi učenca | `/ucenec/oddaja/potrdi` |
| Datoteke niso javno dostopne | volumen izven javne mape, prenos prek `/datoteka/...` s preverjanjem |
| Dnevna poročila | `porocila/dnevna/` |
| Tedenska poročila in zaključno poročilo | `porocila/` |
| Testni primeri, napake v GitHub Issues | [testni-primeri.md](testni-primeri.md), `.github/ISSUE_TEMPLATE/` |
| Tehnična in uporabniška dokumentacija | [tehnicna-dokumentacija.md](tehnicna-dokumentacija.md), [uporabniska-navodila.md](uporabniska-navodila.md) |
