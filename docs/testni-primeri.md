# Testni primeri

Opis, pričakovan rezultat, dejanski rezultat in status za vsak primer. Stolpca »Dejanski rezultat« in »Status« se izpolnita ob izvedbi testiranja (OK / NAPAKA). Napake se beležijo v GitHub Issues.

| ID | Pogled | Opis | Pričakovan rezultat | Dejanski rezultat | Status |
|----|--------|------|---------------------|-------------------|--------|
| T01 | Prijava | Prijava z veljavnimi podatki | Preusmeritev na začetno stran vloge |  | ni izvedeno |
| T02 | Prijava | Prijava z napačnim geslom | Sporočilo o napaki, ni prijave |  | ni izvedeno |
| T03 | Prijava | Dostop do /admin/predmeti brez prijave | Zavrnitev (403) |  | ni izvedeno |
| T04 | Prijava | Odjava | Seja končana, povratek na prijavo |  | ni izvedeno |
| T05 | Registracija | Registracija z veljavnimi podatki | Račun učenca ustvarjen, prijava mogoča |  | ni izvedeno |
| T06 | Registracija | Registracija z geslom krajšim od 8 znakov | Sporočilo o napaki |  | ni izvedeno |
| T07 | Registracija | Registracija z že obstoječo e-pošto | Sporočilo »E-pošta je že zasedena« |  | ni izvedeno |
| T08 | Admin | Dodajanje predmeta | Predmet v tabeli |  | ni izvedeno |
| T09 | Admin | Dodajanje predmeta z obstoječim nazivom | Sporočilo o podvojenem vnosu |  | ni izvedeno |
| T10 | Admin | Urejanje predmeta | Spremembe shranjene |  | ni izvedeno |
| T11 | Admin | Brisanje predmeta | Predmet izbrisan, povezave odstranjene |  | ni izvedeno |
| T12 | Admin | Dodajanje učitelja z geslom | Učitelj v tabeli, geslo v bazi zgoščeno |  | ni izvedeno |
| T13 | Admin | Dodajanje učitelja z neveljavno e-pošto | Sporočilo o napaki |  | ni izvedeno |
| T14 | Admin | Urejanje in brisanje učitelja | Spremembe shranjene oz. učitelj izbrisan |  | ni izvedeno |
| T15 | Admin | Dodajanje, urejanje, brisanje učenca | Operacije uspešne |  | ni izvedeno |
| T16 | Admin | Dodelitev več predmetov učitelju | Učitelj poučuje izbrane predmete |  | ni izvedeno |
| T17 | Admin | Dodelitev predmeta več učiteljem | Predmet ima več učiteljev |  | ni izvedeno |
| T18 | Admin | Dodelitev 1 predmeta učencu | Zavrnitev: najmanj 2 predmeta |  | ni izvedeno |
| T19 | Admin | Dodelitev 3 predmetov učencu | Dodelitev shranjena |  | ni izvedeno |
| T20 | Učitelj | Prikaz predmetov v izbirniku | Samo predmeti, ki jih poučuje |  | ni izvedeno |
| T21 | Učitelj | Nalaganje gradiva | Gradivo na seznamu, prenos deluje |  | ni izvedeno |
| T22 | Učitelj | Brisanje gradiva | Gradivo izbrisano |  | ni izvedeno |
| T23 | Učitelj | Brisanje gradiva tujega predmeta (ročni POST) | Zavrnitev (403) |  | ni izvedeno |
| T24 | Učitelj | Pregled oddanih nalog | Seznam oddaj izbranega predmeta |  | ni izvedeno |
| T25 | Učitelj | Dostop do /admin/ucenci | Zavrnitev (403) |  | ni izvedeno |
| T26 | Učenec | Urejanje profila | Podatki shranjeni |  | ni izvedeno |
| T27 | Učenec | Izbira 1 predmeta | Zavrnitev: najmanj 2 predmeta |  | ni izvedeno |
| T28 | Učenec | Izbira 3 predmetov | Seznam shranjen |  | ni izvedeno |
| T29 | Učenec | Ogled gradiv | Vidna gradiva samo predmetov s seznama |  | ni izvedeno |
| T30 | Učenec | Prenos gradiva predmeta, ki ga ne obiskuje (neposredni URL) | Zavrnitev (403) |  | ni izvedeno |
| T31 | Učenec | Prva oddaja naloge | Datoteka shranjena kot »Priimek Ime – Naslov.končnica« |  | ni izvedeno |
| T32 | Učenec | Ponovna oddaja iste naloge, izbira »Ne« | Prejšnja datoteka ostane |  | ni izvedeno |
| T33 | Učenec | Ponovna oddaja iste naloge, izbira »Da« | Datoteka povožena |  | ni izvedeno |
| T34 | Učenec | Oddaja nedovoljene končnice (.exe) | Zavrnitev |  | ni izvedeno |
| T35 | Učenec | Oddaja pri predmetu, ki ga ne obiskuje | Zavrnitev |  | ni izvedeno |
| T36 | Učenec | Dostop do tuje oddaje (neposredni URL) | Zavrnitev (403) |  | ni izvedeno |
| T37 | Splošno | Odzivnost na mobilnem zaslonu (360 px) | Brez vodoravnega drsenja strani, navigacija uporabna |  | ni izvedeno |
| T38 | Splošno | Dostop prek HTTP | Preusmeritev na HTTPS |  | ni izvedeno |
| T39 | Splošno | Zagon z `docker compose up -d` na čisti napravi | Vsi vsebniki tečejo, vnešeni testni podatki |  | ni izvedeno |
| T40 | Splošno | Varnostna kopija (`skripte/backup.sh`) | Nastane datoteka .sql.gz |  | ni izvedeno |
