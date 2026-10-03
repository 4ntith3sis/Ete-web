const assert = require('assert');
const {
  calculatePph21, calculatePph21Apbn, calculatePph21Final, calculatePph21ManfaatFinal, calculatePph21Tahunan,
  calculatePphBadan, calculateRateBased, calculatePpn, calculatePpnbm,
} = require('../node_modules/.tmp-tax/calculate.js');
const { progressiveTax, progressiveTaxBreakdown } = require('../node_modules/.tmp-tax/progressive.js');
const { formatThousands, parseAmount, parseDecimal, formatPercent } = require('../node_modules/.tmp-tax/format.js');
const { calculatePph21Bulanan, calculatePph21BulananLogic, calculatePph21TidakFinalByObj } = require('../node_modules/.tmp-tax/calculate.js');

let pass = 0, fail = 0;
function t(name, fn) { try { fn(); pass++; console.log('PASS', name); } catch (e) { fail++; console.log('FAIL', name, e.message); } }

t('rate-based: dpp=10jt rate=2% => tax=200rb', () => {
  const r = calculateRateBased(10000000, 2);
  assert.strictEqual(r.tax, 200000);
});

t('ppn: dpp=10jt rate=12 => ppn=1.2jt harga=11.2jt', () => {
  const r = calculatePpn(10000000, 12);
  assert.strictEqual(r.ppn, 1200000);
  assert.strictEqual(r.hargaSetelahPpn, 11200000);
});

t('ppnbm: dpp=50jt rate=20 => 10jt', () => {
  assert.strictEqual(calculatePpnbm(50000000, 20).ppnbm, 10000000);
});

t('pph21: pkp tepat 60jt => 3jt', () => {
  const r = calculatePph21({ brutoFields: [120000000], biayaJabatan: 0, iuranPensiun: 0, zakat: 0, ptkp: 54000000 + 6000000, pphTelahDipotong: 0 });
  // neto = 120jt, pkp = 60jt => 3jt
  assert.strictEqual(r.pkp, 60000000);
  assert.strictEqual(r.pphAtasPkp, 3000000);
});

t('pph21: pkp tepat di batas 250jt', () => {
  assert.strictEqual(progressiveTax(250000000), 3000000 + 190000000 * 0.15);
});

t('pph21 breakdown sums like progressive', () => {
  const layers = progressiveTaxBreakdown(300000000);
  const sum = layers.reduce((a, l) => a + l.taxAmount, 0);
  assert.strictEqual(sum, progressiveTax(300000000));
});

t('pph21 tahunan: 8=sum1..7', () => {
  const items = [1000000, 500000, 250000, 100000, 200000, 300000, 150000];
  const r = calculatePph21Tahunan({ penghasilanBrutoItems: items, biayaJabatan: 6000000, iuranPensiun: 1200000, zakat: 0, netoMasaSebelumnya: 0, ptkp: 54000000, pphDipotongSeb: 0, dtpDipotongSeb: 0, pphDipotongLain: 0, dtpDipotongLain: 0 });
  assert.strictEqual(r.bruto, items.reduce((a,b)=>a+b,0));
  assert.strictEqual(r.pengurang, 7200000);
  assert.strictEqual(r.neto, Math.max(0, r.bruto - 7200000));
  assert.strictEqual(r.netoDisetahunkan, r.neto);
  assert.strictEqual(r.pkp, Math.max(0, r.neto - 54000000));
});

t('pph21 final pesangon kumulatif 100jt => 2.5jt', () => {
  const r = calculatePph21Final({ akumulasiSebelumnya: 0, penghasilanBruto: 100000000, dalam2Tahun: false });
  assert.strictEqual(r.kumulatif, 100000000);
  assert.strictEqual(r.pph21Final, 2500000);
});

t('pph21 apbn flat 15%', () => {
  assert.strictEqual(calculatePph21Apbn(10000000, 15).pph, 1500000);
});

t('pph badan flat 22%', () => {
  assert.strictEqual(calculatePphBadan({ jenisTarif: 'pasal17b', omzet: 10000000000, pkp: 100000000 }).pphBadan, 22000000);
});

t('pph badan 31E omzet<=4.8M gets 50% tarif', () => {
  const r = calculatePphBadan({ jenisTarif: 'pasal31e', omzet: 4000000000, pkp: 100000000 });
  assert.strictEqual(r.pphBadan, 100000000 * 0.22 * 0.5);
});

t('format thousands', () => {
  assert.strictEqual(formatThousands('1000000'), '1.000.000');
  assert.strictEqual(formatThousands('abc1000'), '1.000');
});

t('parseAmount strips separators', () => {
  assert.strictEqual(parseAmount('1.000.000'), 1000000);
});

t('parseDecimal', () => {
  assert.strictEqual(parseDecimal('2,5'), 2.5);
});

t('formatPercent', () => {
  assert.strictEqual(formatPercent(1.75), '1,75%');
});

t('pph21 final pesangon boundary 50m => 0 tax', () => {
  assert.strictEqual(calculatePph21Final({ akumulasiSebelumnya: 0, penghasilanBruto: 50000000, dalam2Tahun: false }).pph21Final, 0);
});

t('pph21 final pesangon boundary 500m', () => {
  const r = calculatePph21Final({ akumulasiSebelumnya: 0, penghasilanBruto: 500000000, dalam2Tahun: false });
  assert.strictEqual(r.pph21Final, 50000000*0.05 + 400000000*0.15);
});

t('pph21 manfaat 100jt => 2.5jt (5% dari 50jt+)', () => {
  const r = calculatePph21ManfaatFinal({ penghasilanBruto: 100000000, akumulasiSebelumnya: 0, dalam2Tahun: false });
  assert.strictEqual(r.pph, 2500000);
});

t('TER tk/0 10jt => 2% tier 200rb', () => {
  const r = calculatePph21Bulanan(10000000, 'TK/0');
  assert.strictEqual(r.kategori, 'A');
  assert.strictEqual(r.rate, 2);
  assert.strictEqual(r.taxAmount, 200000);
});

t('kategori C kk/3 boundary 6.6jt => 0', () => {
  const r = calculatePph21Bulanan(6600000, 'K/3');
  assert.strictEqual(r.kategori, 'C');
  assert.strictEqual(r.rate, 0);
  assert.strictEqual(r.taxAmount, 0);
});

t('tidak final nonpegawai dpp50% bruto, pph sesuai pph17', () => {
  const r = calculatePph21TidakFinalByObj({ kode: '21-100-07', jenis: '', bruto: 20000000, ptkpValue: 'TK/0' });
  assert.strictEqual(r.dpp, 10000000);
  assert.strictEqual(r.taxAmount, 500000);
});

t('tidak final peserta kegiatan langsung bruto', () => {
  const r = calculatePph21TidakFinalByObj({ kode: '21-100-13', jenis: '', bruto: 10000000, ptkpValue: 'TK/0' });
  assert.strictEqual(r.dpp, 10000000);
  assert.strictEqual(r.taxAmount, 500000);
});

t('tidak final upah tetap non-bulanan pakai TER', () => {
  const r = calculatePph21TidakFinalByObj({ kode: '21-100-03', jenis: 'upah-pegawai-tetap-non-bulanan', bruto: 10000000, ptkpValue: 'TK/0' });
  assert.strictEqual(r.rate, 2);
  assert.strictEqual(r.taxAmount, 200000);
});

t('tidak final upah harian <=450k => 0', () => {
  const r = calculatePph21TidakFinalByObj({ kode: '21-100-03', jenis: 'upah-pegawai-tidak-tetap-non-bulanan', bruto: 400000, ptkpValue: 'TK/0' });
  assert.strictEqual(r.taxAmount, 0);
});

t('grossup: tax mengimbangi tunjangan, dpp final memenuhi input bersih', () => {
  const r = calculatePph21BulananLogic({ ptkpValue:'TK/0', bruto:10000000, skema:'grossup' });
  // bruto as net target 10jt, harga baru = bruto / (1 - rateFinal/100)
  assert.strictEqual(r.taxAmount, Math.floor((r.dpp * r.rate) / 100));
  assert.strictEqual(r.takeHomePay, 10000000);
  assert.ok(r.tunjanganPph !== undefined && r.tunjanganPph > 0);
});

t('cumulative bruto: bruto + sebelumnya pakai TER kumulatif', () => {
  const r = calculatePph21BulananLogic({ ptkpValue:'TK/0', bruto:5000000, skema:'gross', brutoSebelumnya:6000000, pphSebelumnya:110000 });
  assert.strictEqual(r.dpp, 5000000);
  assert.strictEqual(r.brutoTotal, 11000000);
  // rate = getTerBulananRate(A, 11jt) = 3% (A > 10.7m-11.05m => 3%)
  assert.strictEqual(r.rate, 3);
  // total tax = floor(11m*3%)=330000; current = max(0,330000-110000)=220000
  assert.strictEqual(r.taxAmount, 220000);
});


console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
