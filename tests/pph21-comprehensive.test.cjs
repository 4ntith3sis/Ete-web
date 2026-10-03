const assert = require('assert');
const {
  calculatePph21BulananLogic,
  calculatePph21TidakFinalByObj,
  calculatePph21Final,
  calculatePph21ManfaatFinal,
  calculatePph21Apbn,
  calculatePph21Tahunan,
} = require('../node_modules/.tmp-tax/calculate.js');
const { pphPasal17 } = require('../node_modules/.tmp-tax/pph21-rules.js');

let pass = 0, fail = 0;
function t(name, fn) { try { fn(); pass++; console.log('PASS', name); } catch (e) { fail++; console.log('FAIL', name, e.message); } }

t('TEST 1 grossup TER A converged dpp==floor(net/(1-rate))', () => {
  const r = calculatePph21BulananLogic({ ptkpValue: 'TK/0', bruto: 10000000, skema: 'grossup' });
  assert.strictEqual(r.rate, 2.25);
  assert.strictEqual(r.dpp, 10230179);
  assert.strictEqual(r.taxAmount, 230179);
  assert.strictEqual(r.takeHomePay, 10000000);
});

t('TEST 2 pembayaran ganda TER kumulatif', () => {
  const r = calculatePph21BulananLogic({ ptkpValue: 'TK/0', bruto: 5000000, skema: 'gross', brutoSebelumnya: 5000000, pphSebelumnya: 0 });
  assert.strictEqual(r.dpp, 5000000);
  assert.strictEqual(r.rate, 2);
  assert.strictEqual(r.taxAmount, 200000);
});

t('TEST 3 nonfinal tenaga ahli DPP50%', () => {
  const r = calculatePph21TidakFinalByObj({ kode: '21-100-07', jenis: '', bruto: 80000000, ptkpValue: 'TK/0' });
  assert.strictEqual(r.dpp, 40000000);
  assert.strictEqual(r.taxAmount, 2000000);
});

t('TEST 4 nonfinal upah harian >450k<=2.5jt x3', () => {
  const r = calculatePph21TidakFinalByObj({ kode: '21-100-03', jenis: 'upah-pegawai-tidak-tetap-non-bulanan', bruto: 1800000, ptkpValue: 'TK/0' });
  assert.strictEqual(r.rate, 0.5);
  assert.strictEqual(r.taxAmount, 9000);
});

t('TEST 5 pesangon akumulasi 40jt+30jt=70jt, pph ini 1jt', () => {
  const r = calculatePph21Final({ akumulasiSebelumnya: 40000000, penghasilanBruto: 30000000, dalam2Tahun: true });
  assert.strictEqual(r.kumulatif, 70000000);
  assert.strictEqual(r.pph21Final, 1000000);
  assert.strictEqual(r.dpp, 30000000);
});

t('TEST 6 21-402-01 Gol III (5%)', () => {
  const r = calculatePph21Apbn(10000000, 5);
  assert.strictEqual(r.dpp, 10000000);
  assert.strictEqual(r.rate, 5);
  assert.strictEqual(r.pph, 500000);
});

t('TEST 7 tahunan A1 full year', () => {
  const r = calculatePph21Tahunan({
    penghasilanBrutoItems: [120000000, 0, 0, 0, 0, 0, 0],
    biayaJabatan: 6000000,
    iuranPensiun: 0,
    zakat: 0,
    netoMasaSebelumnya: 0,
    ptkp: 54000000,
    pphDipotongSeb: 0,
    dtpDipotongSeb: 0,
    pphDipotongLain: 2200000,
    dtpDipotongLain: 0,
  });
  assert.strictEqual(r.bruto, 120000000);
  assert.strictEqual(r.pengurang, 6000000);
  assert.strictEqual(r.neto, 114000000);
  assert.strictEqual(r.ptkp, 54000000);
  assert.strictEqual(r.pkp, 60000000);
  assert.strictEqual(r.pphAtasPkp, 3000000);
  assert.strictEqual(r.pphTerutang, 3000000);
  assert.strictEqual(r.kurangBayar, 3000000 - 2200000);
});

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
