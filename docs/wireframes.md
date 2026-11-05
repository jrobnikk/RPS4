# Skice (wireframe)

Skupna postavitev: zgornja navigacija (logotip, meni glede na vlogo, odjava). Na mobilnih napravah se meni zapre v »hamburger« meni.
_Skice v Figmi ali draw.io lahko dodate v `docs/wireframes/` in jih povežete tukaj._

## Prijava / registracija
```
+--------------------------------------+
|            Šolski IS                 |
|  E-pošta  [____________________]     |
|  Geslo    [____________________]     |
|           [ Prijava ]                |
|   Nimate računa? Registracija        |
+--------------------------------------+
```

## 1. Administrator
Podstrani: Predmeti | Učitelji | Učenci | Dodelitve

```
+-----------------------------------------------------------+
| Logo   Predmeti  Učitelji  Učenci  Dodelitve      [Odjava]|
+-----------------------------------------------------------+
| Učitelji                          [Išči___]  [+ Dodaj]    |
| +--------+----------+--------------+---------------------+|
| | Ime    | Priimek  | E-pošta      | Akcije              ||
| +--------+----------+--------------+---------------------+|
| | Ana    | Novak    | ana@sola.si  | [Uredi] [Izbriši]   ||
| | ...                                                    ||
| +--------+----------+--------------+---------------------+|
+-----------------------------------------------------------+
```
- **Predmeti / Učenci:** enaka tabela z obrazcem za dodajanje in urejanje v modalnem oknu.
- **Dodelitve:** izbira učitelja ali učenca, pod njo seznam predmetov s potrditvenimi polji in gumb »Shrani«.

## 2. Učitelj
Podstrani: Moji predmeti | Gradiva | Oddane naloge

```
+-----------------------------------------------------------+
| Logo   Moji predmeti  Gradiva  Oddane naloge      [Odjava]|
+-----------------------------------------------------------+
| Gradiva     Predmet: [Matematika v]                       |
| +---------------------------+---------+-----------------+ |
| | Naslov                    | Datum   | Akcije          | |
| | Vaje 1                    | 20. 9.  | [Izbriši]       | |
| +---------------------------+---------+-----------------+ |
| Novo gradivo: [Naslov____] [Izberi datoteko] [Naloži]     |
+-----------------------------------------------------------+
```
- **Moji predmeti:** kartice predmetov, ki jih učitelj poučuje.
- **Oddane naloge:** izbira predmeta, tabela (učenec, naslov naloge, datum oddaje, gumb Prenesi).

## 3. Učenec
Podstrani: Profil | Moji predmeti | Gradiva | Oddaja nalog

```
+-----------------------------------------------------------+
| Logo   Profil  Moji predmeti  Gradiva  Oddaja     [Odjava]|
+-----------------------------------------------------------+
| Oddaja naloge                                             |
| Predmet [Fizika v]   Naslov naloge [______________]       |
| Datoteka [Izberi datoteko]           [ Oddaj ]            |
+-----------------------------------------------------------+
| Potrditveno okno (če oddaja že obstaja):                  |
| "Želite povoziti prejšnjo oddajo?"   [Da]  [Ne]           |
+-----------------------------------------------------------+
```
- **Profil:** obrazec (ime, priimek, e-pošta, sprememba gesla).
- **Moji predmeti:** seznam vseh predmetov s potrditvenimi polji.
- **Gradiva:** gradiva po predmetih s seznama, s prenosom.
