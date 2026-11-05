const express = require('express'), session = require('express-session'), mysql = require('mysql2/promise'),
  bcrypt = require('bcryptjs'), multer = require('multer'), path = require('path'), fs = require('fs');
const app = express(), up = multer({ dest: '/tmp/up', limits: { fileSize: 10e6 } });
const UP = '/data/uploads'; fs.mkdirSync(UP, { recursive: true });
const pool = mysql.createPool({ host: 'baza', user: process.env.DB_UPORABNIK, password: process.env.DB_GESLO, database: 'sola_is' });
const q = async (s, p) => (await pool.query(s, p))[0];
const mv = (a, b) => { fs.copyFileSync(a, b); fs.rmSync(a, { force: true }); };
const wrap = f => (req, res, n) => f(req, res, n).catch(n);
const need = r => (req, res, n) => req.session.u && req.session.u.vloga === r ? n() : res.status(403).send('Ni dostopa');
const R = (req, res, v, d = {}) => res.render(v, { ...d, u: req.session.u }, (e, h) =>
  e ? res.status(500).send(e.message) : res.render('layout', { u: req.session.u, h, msg: d.msg }));
const mail = e => /^\S+@\S+\.\S+$/.test(e || '');
const tv = v => v === 'ucitelj' ? 'UCITELJ_PREDMET' : 'VPIS';
const moji = (id, v) => q(`SELECT p.* FROM PREDMET p JOIN ${tv(v)} t ON t.predmet_id=p.id WHERE t.uporabnik_id=? ORDER BY p.naziv`, [id]);
const home = { admin: '/admin/predmeti', ucitelj: '/ucitelj/gradiva', ucenec: '/ucenec/predmeti' };

app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET || 'dev', resave: false, saveUninitialized: false, cookie: { httpOnly: true, sameSite: 'lax' } }));

// ---- prijava / registracija ----
app.get('/', (req, res) => res.redirect(req.session.u ? home[req.session.u.vloga] : '/prijava'));
app.get('/prijava', (req, res) => R(req, res, 'prijava', { reg: false }));
app.get('/registracija', (req, res) => R(req, res, 'prijava', { reg: true }));
app.post('/prijava', wrap(async (req, res) => {
  const [u] = await q('SELECT * FROM UPORABNIK WHERE email=?', [req.body.email]);
  if (u && await bcrypt.compare(req.body.geslo || '', u.geslo_hash)) {
    req.session.u = { id: u.id, ime: u.ime, priimek: u.priimek, vloga: u.vloga };
    return res.redirect('/');
  }
  R(req, res, 'prijava', { reg: false, msg: 'Napačna e-pošta ali geslo' });
}));
app.post('/registracija', wrap(async (req, res) => {
  const b = req.body;
  if (!b.ime?.trim() || !b.priimek?.trim() || !mail(b.email) || !b.geslo || b.geslo.length < 8)
    return R(req, res, 'prijava', { reg: true, msg: 'Izpolnite vsa polja (geslo najmanj 8 znakov)' });
  try {
    await q("INSERT INTO UPORABNIK(ime,priimek,email,geslo_hash,vloga) VALUES(?,?,?,?,'ucenec')",
      [b.ime.trim(), b.priimek.trim(), b.email, await bcrypt.hash(b.geslo, 10)]);
  } catch { return R(req, res, 'prijava', { reg: true, msg: 'E-pošta je že zasedena' }); }
  res.redirect('/prijava');
}));
app.get('/odjava', (req, res) => req.session.destroy(() => res.redirect('/')));

// ---- administrator ----
const E = {
  predmeti: { t: 'PREDMET', f: ['naziv', 'opis'], h: ['Naziv', 'Opis'] },
  ucitelji: { t: 'UPORABNIK', v: 'ucitelj', f: ['ime', 'priimek', 'email'], h: ['Ime', 'Priimek', 'E-pošta'] },
  ucenci: { t: 'UPORABNIK', v: 'ucenec', f: ['ime', 'priimek', 'email'], h: ['Ime', 'Priimek', 'E-pošta'] }
};
const adm = need('admin'), T = ':t(predmeti|ucitelji|ucenci)';
app.get('/admin/' + T, adm, wrap(async (req, res) => {
  const t = req.params.t, e = E[t];
  const rows = await q(`SELECT * FROM ${e.t} ${e.v ? 'WHERE vloga=?' : ''} ORDER BY ${e.v ? 'priimek,ime' : 'naziv'}`, e.v ? [e.v] : []);
  R(req, res, 'admin_list', { e, t, rows, ed: rows.find(r => r.id == req.query.uredi) || null, msg: req.query.n });
}));
app.post('/admin/' + T, adm, wrap(async (req, res) => {
  const t = req.params.t, e = E[t], b = req.body, id = b.id;
  const fail = m => res.redirect(`/admin/${t}?n=` + encodeURIComponent(m));
  if (e.f.some(k => k !== 'opis' && !b[k]?.trim())) return fail('Izpolnite obvezna polja');
  if (e.v && !mail(b.email)) return fail('Neveljavna e-pošta');
  const vals = e.f.map(k => (b[k] || '').trim());
  try {
    if (e.v) {
      const h = b.geslo ? await bcrypt.hash(b.geslo, 10) : null;
      if (b.geslo && b.geslo.length < 8) return fail('Geslo naj ima najmanj 8 znakov');
      if (id) await q(`UPDATE UPORABNIK SET ime=?,priimek=?,email=?${h ? ',geslo_hash=?' : ''} WHERE id=? AND vloga=?`, [...vals, ...(h ? [h] : []), id, e.v]);
      else if (!h) return fail('Geslo je obvezno');
      else await q('INSERT INTO UPORABNIK(ime,priimek,email,geslo_hash,vloga) VALUES(?,?,?,?,?)', [...vals, h, e.v]);
    } else if (id) await q('UPDATE PREDMET SET naziv=?,opis=? WHERE id=?', [...vals, id]);
    else await q('INSERT INTO PREDMET(naziv,opis) VALUES(?,?)', vals);
  } catch { return fail('Napaka: podvojen vnos (naziv ali e-pošta)'); }
  res.redirect('/admin/' + t);
}));
app.post(`/admin/${T}/:id/brisi`, adm, wrap(async (req, res) => {
  const e = E[req.params.t];
  await q(`DELETE FROM ${e.t} WHERE id=?${e.v ? ' AND vloga=?' : ''}`, e.v ? [req.params.id, e.v] : [req.params.id]);
  res.redirect('/admin/' + req.params.t);
}));
const setPred = async (u, ids) => {
  if (u.vloga === 'ucenec' && ids.length < 2) return false;
  await q(`DELETE FROM ${tv(u.vloga)} WHERE uporabnik_id=?`, [u.id]);
  if (ids.length) await q(`INSERT INTO ${tv(u.vloga)}(uporabnik_id,predmet_id) VALUES ?`, [ids.map(p => [u.id, p])]);
  return true;
};
app.get('/admin/dodelitve', adm, wrap(async (req, res) => {
  const us = await q("SELECT id,ime,priimek,vloga FROM UPORABNIK WHERE vloga<>'admin' ORDER BY vloga,priimek,ime");
  const pr = await q('SELECT * FROM PREDMET ORDER BY naziv'), sel = us.find(x => x.id == req.query.u) || null;
  const mine = sel ? (await q(`SELECT predmet_id p FROM ${tv(sel.vloga)} WHERE uporabnik_id=?`, [sel.id])).map(x => x.p) : [];
  R(req, res, 'admin_dodelitve', { us, pr, sel, mine, msg: req.query.n });
}));
app.post('/admin/dodelitve', adm, wrap(async (req, res) => {
  const [u] = await q("SELECT * FROM UPORABNIK WHERE id=? AND vloga<>'admin'", [req.body.u]);
  if (!u) return res.sendStatus(400);
  const ok = await setPred(u, [].concat(req.body.p || []).map(Number));
  res.redirect('/admin/dodelitve?u=' + u.id + (ok ? '' : '&n=' + encodeURIComponent('Učenec mora obiskovati vsaj 2 predmeta')));
}));

// ---- učitelj ----
const ut = need('ucitelj');
const izbor = async req => { const ps = await moji(req.session.u.id, 'ucitelj'); return { ps, p: ps.find(x => x.id == req.query.p) || ps[0] || null }; };
app.get('/ucitelj/gradiva', ut, wrap(async (req, res) => {
  const { ps, p } = await izbor(req);
  const gr = p ? await q('SELECT * FROM GRADIVO WHERE predmet_id=? ORDER BY datum_nalozitve DESC', [p.id]) : [];
  R(req, res, 'ucitelj_gradiva', { ps, p, gr });
}));
app.post('/ucitelj/gradiva', ut, up.single('datoteka'), wrap(async (req, res) => {
  const ps = await moji(req.session.u.id, 'ucitelj'), p = ps.find(x => x.id == req.body.p);
  if (!p || !req.file || !req.body.naslov?.trim()) { if (req.file) fs.rmSync(req.file.path, { force: true }); return res.sendStatus(400); }
  const ime = Date.now() + '-' + req.file.originalname.replace(/[^\w.\-]/g, '_');
  mv(req.file.path, path.join(UP, ime));
  await q('INSERT INTO GRADIVO(predmet_id,nalozil_id,naslov,pot_datoteke) VALUES(?,?,?,?)', [p.id, req.session.u.id, req.body.naslov.trim(), ime]);
  res.redirect('/ucitelj/gradiva?p=' + p.id);
}));
app.post('/ucitelj/gradiva/:id/brisi', ut, wrap(async (req, res) => {
  const [g] = await q('SELECT g.* FROM GRADIVO g JOIN UCITELJ_PREDMET t ON t.predmet_id=g.predmet_id WHERE g.id=? AND t.uporabnik_id=?', [req.params.id, req.session.u.id]);
  if (!g) return res.sendStatus(403);
  fs.rmSync(path.join(UP, g.pot_datoteke), { force: true });
  await q('DELETE FROM GRADIVO WHERE id=?', [g.id]);
  res.redirect('/ucitelj/gradiva?p=' + g.predmet_id);
}));
app.get('/ucitelj/oddaje', ut, wrap(async (req, res) => {
  const { ps, p } = await izbor(req);
  const od = p ? await q('SELECT o.*,u.ime,u.priimek FROM ODDAJA o JOIN UPORABNIK u ON u.id=o.ucenec_id WHERE o.predmet_id=? ORDER BY o.datum_oddaje DESC', [p.id]) : [];
  R(req, res, 'ucitelj_oddaje', { ps, p, od });
}));

// ---- prenos datotek (samo prek avtorizacije) ----
app.get('/datoteka/:k(gradivo|oddaja)/:id', wrap(async (req, res) => {
  const u = req.session.u; if (!u) return res.sendStatus(401);
  const g = req.params.k === 'gradivo', [f] = await q(`SELECT * FROM ${g ? 'GRADIVO' : 'ODDAJA'} WHERE id=?`, [req.params.id]);
  if (!f) return res.sendStatus(404);
  let ok = u.vloga === 'admin';
  if (!ok && u.vloga !== 'admin') {
    const r = await q(`SELECT 1 x FROM ${tv(u.vloga)} WHERE uporabnik_id=? AND predmet_id=?`, [u.id, f.predmet_id]);
    ok = r.length > 0 && (g || u.vloga === 'ucitelj' || f.ucenec_id === u.id);
  }
  if (!ok) return res.sendStatus(403);
  res.download(g ? path.join(UP, f.pot_datoteke) : path.join(UP, 'oddaje', String(f.predmet_id), f.pot_datoteke));
}));

// ---- učenec ----
const uc = need('ucenec');
app.get('/ucenec/profil', uc, wrap(async (req, res) => {
  const [p] = await q('SELECT ime,priimek,email FROM UPORABNIK WHERE id=?', [req.session.u.id]);
  R(req, res, 'ucenec_profil', { p, msg: req.query.n });
}));
app.post('/ucenec/profil', uc, wrap(async (req, res) => {
  const b = req.body, u = req.session.u, back = m => res.redirect('/ucenec/profil?n=' + encodeURIComponent(m));
  if (!b.ime?.trim() || !b.priimek?.trim() || !mail(b.email) || (b.geslo && b.geslo.length < 8)) return back('Neveljavni podatki (geslo najmanj 8 znakov)');
  try {
    await q('UPDATE UPORABNIK SET ime=?,priimek=?,email=? WHERE id=?', [b.ime.trim(), b.priimek.trim(), b.email, u.id]);
    if (b.geslo) await q('UPDATE UPORABNIK SET geslo_hash=? WHERE id=?', [await bcrypt.hash(b.geslo, 10), u.id]);
  } catch { return back('E-pošta je že zasedena'); }
  Object.assign(u, { ime: b.ime.trim(), priimek: b.priimek.trim() });
  back('Shranjeno');
}));
app.get('/ucenec/predmeti', uc, wrap(async (req, res) => {
  const pr = await q('SELECT * FROM PREDMET ORDER BY naziv');
  const mine = (await moji(req.session.u.id, 'ucenec')).map(x => x.id);
  R(req, res, 'ucenec_predmeti', { pr, mine, msg: req.query.n });
}));
app.post('/ucenec/predmeti', uc, wrap(async (req, res) => {
  const ok = await setPred(req.session.u, [].concat(req.body.p || []).map(Number));
  res.redirect('/ucenec/predmeti' + (ok ? '?n=Shranjeno' : '?n=' + encodeURIComponent('Izberite vsaj 2 predmeta')));
}));
app.get('/ucenec/gradiva', uc, wrap(async (req, res) => {
  const ps = await moji(req.session.u.id, 'ucenec');
  for (const p of ps) p.gr = await q('SELECT * FROM GRADIVO WHERE predmet_id=? ORDER BY datum_nalozitve DESC', [p.id]);
  R(req, res, 'ucenec_gradiva', { ps });
}));
const oddajaData = async id => ({
  ps: await moji(id, 'ucenec'), potrdi: null,
  od: await q('SELECT o.*,p.naziv FROM ODDAJA o JOIN PREDMET p ON p.id=o.predmet_id WHERE o.ucenec_id=? ORDER BY o.datum_oddaje DESC', [id])
});
const safe = s => s.replace(/[\\/:*?"<>|]/g, '').trim();
const OK = /\.(pdf|docx?|odt|txt|zip|png|jpe?g|py|js|java|cs|php|sql)$/i;
const shrani = async (uid, c) => {
  const d = path.join(UP, 'oddaje', String(c.p)); fs.mkdirSync(d, { recursive: true });
  const [o] = await q('SELECT pot_datoteke FROM ODDAJA WHERE ucenec_id=? AND predmet_id=? AND naslov_naloge=?', [uid, c.p, c.naslov]);
  if (o && o.pot_datoteke !== c.ime) fs.rmSync(path.join(d, o.pot_datoteke), { force: true });
  mv(c.tmp, path.join(d, c.ime));
  await q('INSERT INTO ODDAJA(ucenec_id,predmet_id,naslov_naloge,pot_datoteke) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE pot_datoteke=VALUES(pot_datoteke),datum_oddaje=NOW()', [uid, c.p, c.naslov, c.ime]);
};
app.get('/ucenec/oddaja', uc, wrap(async (req, res) => R(req, res, 'ucenec_oddaja', await oddajaData(req.session.u.id))));
app.post('/ucenec/oddaja', uc, up.single('datoteka'), wrap(async (req, res) => {
  const u = req.session.u, b = req.body, f = req.file;
  const err = async m => { if (f) fs.rmSync(f.path, { force: true }); R(req, res, 'ucenec_oddaja', { ...await oddajaData(u.id), msg: m }); };
  const naslov = safe(b.naslov || '');
  if (!f || !naslov || !OK.test(f.originalname)) return err('Vnesite naslov in izberite dovoljeno datoteko');
  const [v] = await q('SELECT 1 x FROM VPIS WHERE uporabnik_id=? AND predmet_id=?', [u.id, b.p]);
  if (!v) return err('Tega predmeta ne obiskujete');
  const c = { tmp: f.path, p: +b.p, naslov, ime: `${safe(u.priimek)} ${safe(u.ime)} – ${naslov}${path.extname(f.originalname).toLowerCase()}` };
  const [ex] = await q('SELECT 1 x FROM ODDAJA WHERE ucenec_id=? AND predmet_id=? AND naslov_naloge=?', [u.id, c.p, naslov]);
  if (ex) {
    if (req.session.pend) fs.rmSync(req.session.pend.tmp, { force: true });
    req.session.pend = c;
    return R(req, res, 'ucenec_oddaja', { ...await oddajaData(u.id), potrdi: c });
  }
  await shrani(u.id, c); res.redirect('/ucenec/oddaja');
}));
app.post('/ucenec/oddaja/potrdi', uc, wrap(async (req, res) => {
  const c = req.session.pend; delete req.session.pend;
  if (c) { if (req.body.da === '1') await shrani(req.session.u.id, c); else fs.rmSync(c.tmp, { force: true }); }
  res.redirect('/ucenec/oddaja');
}));

app.use((e, req, res, n) => { console.error(e); res.status(500).send('Napaka strežnika'); });
(async () => {
  for (let i = 0; i < 30; i++) { try { await q('SELECT 1'); break; } catch { await new Promise(r => setTimeout(r, 2000)); } }
  await require('./seed')(q, bcrypt);
  app.listen(3000, () => console.log('Aplikacija teče na :3000'));
})();
