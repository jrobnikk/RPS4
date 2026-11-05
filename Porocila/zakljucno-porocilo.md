# Zaključno poročilo skupine

**Projekt:** Šolski IS – podpora šolskemu delu na daljavo (RPS)
**Skupina:** Jernej Robnik (vzdrževalec IS), Vid Strmčnik (razvijalec), Lan Plazar (razvijalec)
**Mentor:** Andraž Pušnik
**Repozitorij:** GitHub, repozitorij `rps` (povezava v `README.md`)
**Delujoča aplikacija:** javna domena skupine (URL v `README.md`)

## Potek dela po tednih
1. **Analiza in načrtovanje:** specifikacija, ER diagram (6 tabel), skice za tri poglede, repozitorij, Docker.
2. **Infrastruktura in baza:** docker-compose, shema, testni podatki (10 / 20 / 100), povezava aplikacije z bazo.
3. **Administrator in osnove varnosti:** CRUD za predmete, učitelje, učence, dodelitve; Nginx, samopodpisano HTTPS.
4. **Prijava in pogleda učitelja in učenca:** bcrypt, avtorizacija po vlogah, gradiva, oddaja nalog s potrditvijo povoza, javna domena, Let's Encrypt, varnostne kopije.
5. **Testiranje in dokumentacija:** 40 testnih primerov, GitHub Issues, uporabniška in tehnična dokumentacija.
6. **Zaključek:** končno testiranje, predstavitev, oznaka različice.

## Glavni izzivi in rešitve
- **Avtorizacija po predmetih:** učitelj sme upravljati samo svoja gradiva. Vsaka pot preveri povezavo učitelj–predmet v bazi, ne samo vloge.
- **Zaščita naloženih datotek:** datoteke so izven javne mape, prenos poteka prek poti, ki preveri pravice.
- **Povoz oddane naloge šele po potrditvi:** nova datoteka se začasno shrani, stara se zamenja šele po potrditvi učenca.
- **Tajne vrednosti:** gesla in ključi so v `.env`, v repozitoriju je samo `.env.example`.
- **HTTPS:** najprej samopodpisano potrdilo, da Nginx sploh zažene, nato Let's Encrypt prek skripta.

## Delitev dela
| Član | Delo |
|------|------|
| Jernej Robnik | GitHub, Docker Compose, baza (shema, varnostne kopije), Nginx, domena, HTTPS, tehnična dokumentacija |
| Vid Strmčnik | specifikacija, ER diagram, pogled administratorja in učitelja, testiranje, uporabniška navodila |
| Lan Plazar | skice, prijava in registracija, pogled učenca, testiranje, uporabniška navodila |

## Možne izboljšave
Zaščita pred CSRF, omejitev poskusov prijave, ponastavitev gesla po e-pošti, ocene nalog, iskanje in razvrščanje tabel.
