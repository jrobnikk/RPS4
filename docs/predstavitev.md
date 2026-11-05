# Predstavitev projekta (zagovor)

Načrt diapozitivov (približno 10 minut) in demonstracije. Ustreza zahtevam 6. tedna.

## Diapozitivi
1. **Naslov:** Šolski IS – podpora šolskemu delu na daljavo; člani skupine, mentor.
2. **Cilj in zahteve:** tri vloge, kaj mora sistem omogočati.
3. **Arhitektura:** diagram iz tehnične dokumentacije (Nginx → aplikacija → MariaDB), Docker vsebniki.
4. **Podatkovna baza:** ER diagram, 6 tabel, normalizacija.
5. **Tehnologije in utemeljitev izbire:** Node.js/Express, MariaDB, Nginx, Let's Encrypt, bcrypt.
6. **Funkcionalnosti po vlogah:** administrator, učitelj, učenec (po en zaslonski posnetek).
7. **Varnost:** zgoščena gesla, avtorizacija po predmetih, zaščita datotek, HTTPS.
8. **Delo v skupini:** veje, vlečni zahtevki, Issues, delitev nalog.
9. **Testiranje:** testni primeri, število odkritih in odpravljenih napak.
10. **Izzivi, rešitve in izboljšave.**

## Demonstracija na javni domeni (scenarij)
1. Prijava kot administrator: dodaj predmet, uredi ga, dodeli ga učitelju.
2. Prijava kot učitelj: naloži gradivo za svoj predmet; pokaži, da tujih predmetov ni na izbiri.
3. Prijava kot učenec: registracija, izbira predmetov, ogled gradiva, oddaja naloge.
4. Ponovna oddaja iste naloge: pokaži potrditveno okno in povoz po potrditvi.
5. Prikaži ime shranjene datoteke »Priimek Ime – Naslov.končnica«.
6. Poskusi odpreti neposredni URL do tuje datoteke: zavrnitev (403).
7. Pokaži HTTPS potrdilo, `docker compose ps` in varnostno kopijo.
8. Pokaži zgodovino commitov in Issues v repozitoriju.

## Pričakovana vprašanja
- Zakaj ena tabela za uporabnike? (poenostavi prijavo in avtorizacijo, vloga v stolpcu)
- Kako preprečite, da učitelj ureja tuj predmet? (preverjanje v `UCITELJ_PREDMET` na strežniku pri vsaki akciji)
- Kje so gesla? (bcrypt zgostitev, nikoli v čistem besedilu)
- Kaj če pade vsebnik z bazo? (podatki v volumnu, `restart: unless-stopped`, varnostne kopije)
- Kaj bi izboljšali? (CSRF zaščita, omejitev poskusov prijave, ponastavitev gesla)
