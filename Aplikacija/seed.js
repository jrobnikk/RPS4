// Testni podatki: 1 admin, 10 predmetov, 20 učiteljev (vsak 2 predmeta, vsak predmet 2 učitelja), 100 učencev (po 3 predmeti)
module.exports = async (q, bcrypt) => {
  const [{ n }] = await q('SELECT COUNT(*) n FROM UPORABNIK');
  if (n) return;
  const h = await bcrypt.hash('geslo123', 10);
  const ins = async (i, p, e, hh, v) => (await q('INSERT INTO UPORABNIK(ime,priimek,email,geslo_hash,vloga) VALUES(?,?,?,?,?)', [i, p, e, hh, v])).insertId;
  await ins('Admin', 'Sistem', 'admin@sola.si', await bcrypt.hash('admin123', 10), 'admin');
  const imena = ['Ana','Luka','Maja','Jan','Eva','Nejc','Nina','Tim','Sara','Žan'];
  const priimki = ['Novak','Horvat','Kovač','Krajnc','Zupan','Potočnik','Mlakar','Kos','Vidmar','Golob'];
  const nazivi = ['Slovenščina','Matematika','Angleščina','Fizika','Kemija','Biologija','Zgodovina','Geografija','Informatika','Športna vzgoja'];
  const pid = [];
  for (const n of nazivi) pid.push((await q('INSERT INTO PREDMET(naziv,opis) VALUES(?,?)', [n, 'Predmet: ' + n])).insertId);
  for (let i = 0; i < 20; i++) {
    const id = await ins(imena[i % 10], priimki[(i + 3) % 10], `ucitelj${i + 1}@sola.si`, h, 'ucitelj');
    for (const k of [i % 10, (i + 3) % 10]) await q('INSERT INTO UCITELJ_PREDMET VALUES(?,?)', [id, pid[k]]);
  }
  for (let j = 0; j < 100; j++) {
    const id = await ins(imena[j % 10], priimki[Math.floor(j / 10)], `ucenec${j + 1}@sola.si`, h, 'ucenec');
    for (const k of [j % 10, (j + 1) % 10, (j + 4) % 10]) await q('INSERT INTO VPIS VALUES(?,?)', [id, pid[k]]);
  }
  console.log('Testni podatki vneseni.');
};
