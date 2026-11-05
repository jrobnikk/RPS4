# Tedensko poročilo – 4. teden
**Skupina:** Jernej Robnik, Vid Strmčnik, Lan Plazar  
**Mentor:** Andraž Pušnik

## Povzetek napredka
Vid in Lan sta izdelala prijavo in registracijo (učenci se registrirajo sami, učitelje ustvari administrator) ter preverjanje pravic po vlogah. Učitelj nalaga in briše gradiva samo pri predmetih, ki jih poučuje, in pregleduje oddane naloge. Učenec ureja profil, izbira predmete, gleda gradiva in oddaja naloge. Datoteka se shrani kot »Priimek Ime – Naslov naloge.končnica«; ponovna oddaja povozi staro datoteko šele po potrditvi učenca.

Jernej je pripravil skript za Let's Encrypt (`skripte/certifikat-letsencrypt.sh`), nastavil DNS zapis A za javno domeno in preusmeritev vrat 80/443. Naložene datoteke so v Docker volumnu, ki ni javno dostopen; prenos poteka samo prek `/datoteka/...` s preverjanjem pravic. Pripravil je skript za dnevne varnostne kopije (`skripte/backup.sh`).

## Sprejete varnostne odločitve
Gesla so zgoščena z bcrypt in nikoli v čistem besedilu. Avtorizacija poteka na strežniku pri vsaki poti. Poizvedbe imajo vezane parametre. Velikost (10 MB) in končnice datotek so omejene. Skrivnosti so v `.env`, ki ni v repozitoriju.

## Javna domena
Aplikacija je dostopna na dogovorjeni javni domeni (URL je naveden v `README.md` in zaključnem poročilu).

## Načrt za 5. teden
Sistematično testiranje po seznamu testnih primerov, popravki, uporabniška navodila, dokončanje tehnične dokumentacije.

## Preverjanje zahtev
- [x] Gesla izključno zgoščena
- [x] Učitelj ureja samo gradiva svojih predmetov
- [x] Ponovna oddaja povozi datoteko šele po potrditvi
- [x] Aplikacija dostopna na javni domeni
