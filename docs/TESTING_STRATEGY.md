# TESTING STRATEGY

Ringkasan: Strategi pengujian (unit, integrasi, E2E) untuk Lavus Restaurant App.

Last Updated: 2025-11-10

## Tujuan
Memastikan fitur utama (menu listing, pemesanan, reservasi, rewards) stabil melalui lapisan test bertahap.

## Lapisan Pengujian
| Lapisan | Tool | Fokus |
|---------|------|-------|
| Unit | Jest + React Testing Library | Komponen & util terisolasi |
| Integrasi | Jest (mock API) | Interaksi antar komponen (contoh form reservasi) |
| E2E | Detox (Android) | Flow lengkap user (Home -> Menu -> Checkout) |
| Performance (opsional) | Profiling RN / Flipper | Render & API latency |

## Target Coverage Awal
- Line coverage keseluruhan ≥ 70% (naik bertahap ke 80%).
- Modul kritis (reservasi, checkout) ≥ 80%.

## Setup Jest (Contoh)
`package.json` script:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "coverage": "jest --coverage"
  }
}
```

Contoh `jest.config.js` (tambahkan jika perlu):
```javascript
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|@react-native|react-navigation|@react-navigation)'
  ],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1'
  }
};
```

`jest.setup.js` contoh:
```javascript
import '@testing-library/jest-native/extend-expect';
```
Install:
```bash
yarn add --dev @testing-library/react-native @testing-library/jest-native
```

## Contoh Unit Test Komponen MenuCard
```typescript
// __tests__/MenuCard.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import MenuCard from '@components/MenuCard';

describe('MenuCard', () => {
  it('menampilkan judul & harga', () => {
    const { getByText } = render(
      <MenuCard title="Salmon Salad" price={39} rating={5} />
    );
    expect(getByText('Salmon Salad')).toBeTruthy();
    expect(getByText('39$')).toBeTruthy();
  });
});
```

## Contoh Test Hook (useFetchMenu)
```typescript
// __tests__/useFetchMenu.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useFetchMenu } from '@hooks/useFetchMenu';

global.fetch = jest.fn(() =>
  Promise.resolve({ ok: true, json: () => Promise.resolve([{ id: '1', title: 'Salad' }]) })
) as any;

describe('useFetchMenu', () => {
  it('mengambil data menu', async () => {
    const { result } = renderHook(() => useFetchMenu());
    await act(async () => {});
    expect(result.current.data.length).toBe(1);
  });
});
```

## Integrasi Form Reservasi
Test memvalidasi tampilan error ketika jumlah tamu kosong atau tanggal tidak dipilih.

## E2E Dengan Detox (Ringkas)
### Instalasi
```bash
yarn add --dev detox
```
Tambahkan di `package.json`:
```json
{
  "scripts": {
    "e2e:build": "detox build -c android.emu.debug",
    "e2e:test": "detox test -c android.emu.debug"
  }
}
```
Konfigurasi `.detoxrc.json` (contoh sederhana):
```json
{
  "configurations": {
    "android.emu.debug": {
      "type": "android.emulator",
      "device": { "avdName": "Pixel_6_API_34" },
      "app": {
        "binaryPath": "android/app/build/outputs/apk/debug/app-debug.apk",
        "build": "npx react-native build-android"
      }
    }
  }
}
```
Contoh test E2E:
```javascript
// e2e/reservationFlow.test.js
describe('Reservation Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });
  it('melakukan reservasi sederhana', async () => {
    await element(by.id('reserve-tab')).tap();
    await element(by.id('date-25')).tap();
    await element(by.id('time-18:30')).tap();
    await element(by.id('guest-plus')).multiTap(2); // 2 guests
    await element(by.id('confirm-button')).tap();
    await expect(element(by.text('Confirmation'))).toBeVisible();
  });
});
```

## Strategi Mocking
- Gunakan `jest.fn()` untuk network sederhana.
- Abstraksikan fetch di service agar mudah di-mock.

## Pipeline CI (Contoh GitHub Actions)
`.github/workflows/ci.yml` snippet:
```yaml
name: CI
on: [pull_request]
jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v4
        with:
          node-version: '<<NODE_LTS_VERSION>>'
      - name: Install deps
        run: yarn install --frozen-lockfile
      - name: Lint
        run: yarn lint
      - name: Type check
        run: yarn typecheck
      - name: Unit tests
        run: yarn test --coverage
```

## Prioritas Penulisan Test (Urutan)
1. Util & hooks murni logic.
2. Komponen UI dengan kondisi (loading/error/empty).
3. Flow kritis (checkout, reservasi) integrasi.
4. Edge case (jaringan gagal, data kosong).

## Anti-Pattern
| Pola Buruk | Dampak |
|-----------|--------|
| Snapshot berlebihan (seluruh screen kompleks) | Sulit maintenance | 
| Mock terlalu dalam (sampai semua library) | Hilang nilai test | 
| Test bergantung urutan global | Flaky | 

## Evaluasi Berkala
Per sprint: review file paling sering berubah tanpa test -> tambah test.

## Cara Mengganti Placeholder
`<<NODE_LTS_VERSION>>` ganti dengan versi Node (misal 20). Jika ada `<<API_BASE_URL>>` di service test, isi sesuai environment.

## Related Docs
- `DEFINITION_OF_DONE.md`
- `PATH_ALIASES_SETUP.md`
- `DEVELOPMENT_CHECKLIST.md`
- `QUICK_REFERENCE.md`
