# Dokumentacija podatkovne baze

SUPB: MariaDB 11, baza `sola_is`, kodiranje utf8mb4, pogon InnoDB. Shema: `baza/01_shema.sql` (ob prvem zagonu jo vsebnik uvozi samodejno). ER diagram: [er-diagram.md](er-diagram.md).

## Podatkovni slovar

### UPORABNIK
| Stolpec | Tip | Omejitve | Opis |
|---------|-----|----------|------|
| id | INT | PK, AUTO_INCREMENT | identifikator |
| ime, priimek | VARCHAR(50) | NOT NULL | osebno ime |
| email | VARCHAR(100) | NOT NULL, UNIQUE | prijavno ime |
| geslo_hash | VARCHAR(100) | NOT NULL | bcrypt zgostitev |
| vloga | ENUM('admin','ucitelj','ucenec') | NOT NULL | vloga uporabnika |

### PREDMET
| Stolpec | Tip | Omejitve | Opis |
|---------|-----|----------|------|
| id | INT | PK, AUTO_INCREMENT | |
| naziv | VARCHAR(100) | NOT NULL, UNIQUE | naziv predmeta |
| opis | TEXT | | opis |

### UCITELJ_PREDMET (veznik M:N)
| Stolpec | Tip | Omejitve |
|---------|-----|----------|
| uporabnik_id | INT | PK, FK → UPORABNIK.id, ON DELETE CASCADE |
| predmet_id | INT | PK, FK → PREDMET.id, ON DELETE CASCADE |

### VPIS (veznik M:N)
Enaka struktura kot `UCITELJ_PREDMET`; `uporabnik_id` je učenec.

### GRADIVO
| Stolpec | Tip | Omejitve | Opis |
|---------|-----|----------|------|
| id | INT | PK, AUTO_INCREMENT | |
| predmet_id | INT | NOT NULL, FK → PREDMET.id, CASCADE | |
| nalozil_id | INT | NULL, FK → UPORABNIK.id, ON DELETE SET NULL | učitelj, ki je naložil |
| naslov | VARCHAR(150) | NOT NULL | |
| pot_datoteke | VARCHAR(255) | NOT NULL | ime datoteke na disku (ne pot, dostopna javno) |
| datum_nalozitve | DATETIME | DEFAULT CURRENT_TIMESTAMP | |

### ODDAJA
| Stolpec | Tip | Omejitve | Opis |
|---------|-----|----------|------|
| id | INT | PK, AUTO_INCREMENT | |
| ucenec_id | INT | NOT NULL, FK → UPORABNIK.id, CASCADE | |
| predmet_id | INT | NOT NULL, FK → PREDMET.id, CASCADE | |
| naslov_naloge | VARCHAR(150) | NOT NULL | |
| pot_datoteke | VARCHAR(255) | NOT NULL | »Priimek Ime – Naslov.končnica« |
| datum_oddaje | DATETIME | DEFAULT CURRENT_TIMESTAMP | |
| | | UNIQUE (ucenec_id, predmet_id, naslov_naloge) | ponovna oddaja posodobi vrstico |

## Normalizacija
- **1. NO:** vsi stolpci so atomarni, ni ponavljajočih skupin.
- **2. NO:** pri veznikih sestavljen ključ nima dodatnih stolpcev; v ostalih tabelah je ključ enostaven.
- **3. NO:** ni tranzitivnih odvisnosti; podatki o predmetu so samo v `PREDMET`, o uporabniku samo v `UPORABNIK`.

## Odločitve
- Ena tabela `UPORABNIK` z vlogo poenostavi prijavo in avtorizacijo. Da veznika vsebujeta samo ustrezne vloge, skrbi aplikacija.
- Brisanje predmeta ali uporabnika pobriše vezi (CASCADE); gradiva ostanejo brez avtorja (SET NULL).
- Datoteke so na disku v Docker volumnu, v bazi je samo ime.

## Testni podatki
`aplikacija/seed.js` ob prvem zagonu vnese: 1 administratorja, 10 predmetov, 20 učiteljev (vsak 2 predmeta, vsak predmet 2 učitelja), 100 učencev (vsak 3 predmete).
