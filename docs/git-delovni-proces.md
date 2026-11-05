# Delovni proces z Gitom in GitHubom

## Veje
- `main` – stabilna različica, samo prek vlečnih zahtevkov (pull request).
- `develop` – skupna razvojna veja.
- `feature/<opis>` – ena veja na funkcionalnost (npr. `feature/crud-predmeti`), `fix/<opis>` za popravke.

Zaščita veje `main` (Settings → Branches): zahtevan vlečni zahtevek in vsaj en pregled (approval).

## Potek dela
1. `git checkout develop && git pull`
2. `git checkout -b feature/ime`
3. Redni commiti z jasnimi sporočili.
4. `git push -u origin feature/ime`, odprite vlečni zahtevek v `develop`.
5. Pregled kode opravi drug član skupine, nato združitev (merge).
6. Ob koncu tedna se `develop` združi v `main`; konec 6. tedna: `git tag v1.0` in GitHub Release.

## Sporočila commitov
Oblika: `tip: kratek opis` (velelnik, npr. dodaj, popravi). Tipi: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`. Primer: `feat: dodaj brisanje gradiv za učitelja`.

## GitHub Issues
Vsaka napaka je Issue z oznako `bug`, ustrezno prioriteto in dodeljenim članom. Predloga: `.github/ISSUE_TEMPLATE/napaka.md`. Popravek se poveže z `Closes #številka` v vlečnem zahtevku.

## Pregled kode (kontrolni seznam)
- Koda dela in je preizkušena.
- Vnosi so preverjeni (validacija), poizvedbe imajo vezane parametre.
- Pravice so preverjene na strežniku.
- V repozitoriju ni gesel, `.env` ni vključen.
- Dokumentacija je posodobljena, če se je spremenilo obnašanje.

## Dostopi
Repozitorij: mentor Andraž Pušnik je sodelavec; člani skupine imajo pravice pisanja.
