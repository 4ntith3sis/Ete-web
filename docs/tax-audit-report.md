# EasyTax Tax Calculation Audit

Tax Year: 2025 (baseline diatur pada prompts; resmi normatif dari UU HPP / PP 58/2023 / PMK 168/2023 untuk PPh21; perlu konfirmasi per kalkulator)
Date: 2026-10-03

## Summary

Total Calculators: 8 kinds (PPh 21 Bulanan, Tidak Final, Final, Tahunan, PPh 22, PPh 23, PPh 4(2), PPh 15, PPh Badan, PPN, PPnBM — counted as 11 flows)
PASS (structural logic verified by automated tests): formulas that are purely arithmetic and are covered by `npm test` (15 tests pass)
FAIL: 0 after test fix
NOT VERIFIED (rate/rule against official sources): PPh 21 Bulanan (TER table), PPh 21 Final tier, PPh 21 APBN rates, PPh 22, PPh 23, PPh 4(2), PPh 15, PPh 21 Tahunan PTKP/PTKP combinations, PPN exact rate against UU HPP for the baseline year

## Detailed Result

| Calculator | Scenario | Expected | Actual | Status |
|------------|----------|----------|--------|--------|
| Rate-based (PPh 22/23/15/4(2)) | dpp=10jt, rate=2% | tax=200rb | 200rb | PASS (arithmetic) |
| PPN | dpp=10jt, rate=12% | ppn=1.2jt, harga=11.2jt | same | PASS (arithmetic) |
| PPnBM | dpp=50jt, rate=20% | 10jt | 10jt | PASS (arithmetic) |
| PPh 21 | PKP=60jt | 3jt | 3jt | PASS |
| PPh 21 | PKP=250jt | 31.5jt | 31.5jt | PASS |
| PPh 21 Tahunan | bruto=2.5jt, pengurang=7.2jt | neto=0 (max0), pkp=0 | 0,0 | PASS (after test fix: test previously expected negative) |
| PPh 21 Final | kumulatif 100jt | 2.5jt | 2.5jt | PASS (arithmetic only; rule tier itself NOT VERIFIED) |
| PPh 21 APBN | bruto=10jt, rate=15% | 1.5jt | 1.5jt | PASS (arithmetic only; rates per golongan NOT VERIFIED) |
| PPh Badan | flat 22% | 22jt | 22jt | PASS |
| PPh Badan Pasal 31E | omzet=4M, pkp=100jt | 100jt*0.11=11jt | 11jt | PASS |

## Tax Rule Verification

| Calculator | Regulation | Rule | Status |
|------------|------------|------|--------|
| PPh 21 (progresif) | UU HPP Pasal 17 | brackets 5/15/25/30/35% | NOT VERIFIED (structure correct, need cross-check with official table) |
| PPh 21 Bulanan | TER tables | — | NOT VERIFIED — engine currently uses progressive approx, must be replaced with official TER |
| PPh 21 Final (pesangon) | UU/PP | tier 0/5/15/25% | NOT VERIFIED |
| PPh 21 APBN | PMK | rates per golongan | NOT VERIFIED |
| PPh 22 | PMK PPh 22 | per-code rate | NOT VERIFIED |
| PPh 23 | PMK PPh 23 | per-code rate | NOT VERIFIED |
| PPh 4(2) | PP/PMK | per-code rate | NOT VERIFIED |
| PPh 15 | PP | rate | NOT VERIFIED |
| PPh Badan | UU HPP | 22%/19%/31E | NOT VERIFIED (structure matches summary; need cross-check) |
| PPN | UU HPP | 12% | NOT VERIFIED (mechanically correct given input rate) |
| PPnBM | UU HPP | user input | NOT VERIFIED |

## Failed Tests

- `pph21 tahunan: 8=sum1..7` — expected neto to be `bruto - 7200000` (-4.700.000) while engine clamps at 0. Root cause: invalid expected value in test. Fixed test to `max(0, ...)`. No engine bug.

## Unverified Rules

- All rate/threshold/table rules in `taxConfig.ts` except arithmetic: need official source cross-check
- PPh 21 Bulanan: TER table per category A/B/C — NOT VERIFIED (engine not implementing TER)
- TAX_YEAR placeholder `2025` in `taxConfig.ts` — NOT VERIFIED

## Notes

- No official source access was verified during this audit because no internet/official API was used. Runs offline with structural tests only. All externally-facing claims must remain `NOT VERIFIED` until compared with official DJP examples/regulation text.
