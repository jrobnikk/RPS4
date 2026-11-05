# Specifikacija sistema

## 1. Namen
Spletna aplikacija za podporo šolskemu delu na daljavo. Trije pogledi: administrator, učitelj, učenec.

## 2. Funkcionalne zahteve

### 2.1 Administrator
| ID | Zahteva |
|----|---------|
| A1 | Vpis, popravljanje in brisanje predmetov (najmanj 10). |
| A2 | Vpis, popravljanje in brisanje učiteljev (najmanj 20). |
| A3 | Določanje, kateri učitelji poučujejo katere predmete (relacija M:N; nekateri predmeti imajo več učiteljev, nekateri učitelji več predmetov). |
| A4 | Vpis, popravljanje in brisanje učencev (najmanj 100). |
| A5 | Določanje predmetov, ki jih učenec obiskuje (M:N; vsak učenec več kot en predmet). |
| A6 | Vse funkcije so dostopne prek uporabniškega vmesnika (vnos neposredno v bazo je dodatno dovoljen). |

### 2.2 Učitelj
| ID | Zahteva |
|----|---------|
| U1 | Nalaganje gradiv za izbrani predmet, samo za predmete, ki jih poučuje. |
| U2 | Brisanje gradiv, samo za predmete, ki jih poučuje. |
| U3 | Pregled nalog, ki so jih učenci oddali pri izbranem predmetu. |

### 2.3 Učenec
| ID | Zahteva |
|----|---------|
| L1 | Registracija in urejanje lastnega profila. |
| L2 | Določanje in popravljanje seznama predmetov, ki jih obiskuje. |
| L3 | Vpogled v gradiva vsakega predmeta s seznama. |
| L4 | Oddaja nalog pri predmetih s seznama. Datoteka se shrani kot `Priimek Ime – Naslov naloge.končnica`. |
| L5 | Ponovna oddaja povozi prejšnjo datoteko šele po potrditvi učenca. |

## 3. Nefunkcionalne zahteve
| ID | Zahteva |
|----|---------|
| N1 | Gesla so shranjena zgoščena (bcrypt/argon2), nikoli v čistem besedilu. |
| N2 | Prijava z najmanj dvema vrstama uporabnikov in preverjanje pravic (avtorizacija) na strežniku. |
| N3 | Najmanj 5 podstrani. |
| N4 | Odzivno (responsive) oblikovanje. |
| N5 | Podatki v najmanj 4 tabelah relacijske baze. |
| N6 | Naložene datoteke niso javno dostopne, dostop samo prek aplikacije z avtorizacijo. |
| N7 | Validacija vseh vnosov (dolžina, format, dovoljene končnice in velikost datotek). |
| N8 | Aplikacija teče v Docker vsebnikih in je dostopna prek HTTPS na javni domeni. |

## 4. Podstrani (najmanj 5)
- **Skupno:** prijava, registracija (učenec), odjava
- **Administrator:** predmeti, učitelji, učenci, dodelitve
- **Učitelj:** moji predmeti, gradiva, oddane naloge
- **Učenec:** profil, moji predmeti, gradiva, oddaja nalog

## 5. Izbira tehnologij
_Skupina dopolni izbiro in utemeljitev._

| Področje | Izbira | Utemeljitev |
|----------|--------|-------------|
| Ogrodje | | |
| SUPB | MariaDB 11 | |
| Reverse proxy | Nginx | |
| Certifikat | Let's Encrypt (Certbot) | |

## 6. Predpostavke
- Vloga administratorja se ustvari ročno ali s skripto, ne prek javne registracije.
- Registrirajo se lahko samo učenci; učitelje vnese administrator.
