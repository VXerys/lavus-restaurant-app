# PATH ALIASES SETUP

Ringkasan: Panduan konfigurasi path alias TypeScript & Babel untuk Lavus Restaurant App.

Last Updated: 2025-11-10

## Tujuan

Mengurangi import relatif panjang dan meningkatkan keterbacaan kode komponen (contoh layar Home, Menu, Detail, Checkout, Reserve, Profile).

## Alias yang Direkomendasikan

| Alias         | Path             | Kegunaan                             |
| ------------- | ---------------- | ------------------------------------ |
| `@components` | `src/components` | Komponen reusable (Button, CardMenu) |
| `@screens`    | `src/screens`    | Screen utama navigasi                |
| `@navigation` | `src/navigation` | Stack & tab navigators               |
| `@hooks`      | `src/hooks`      | Custom hooks (useFetchMenu)          |
| `@services`   | `src/services`   | API client, integrasi fetch          |
| `@store`      | `src/store`      | State management (Redux/Zustand)     |
| `@assets`     | `src/assets`     | Gambar, ikon                         |
| `@utils`      | `src/utils`      | Helper functions                     |
| `@types`      | `src/types`      | Type / interface TS                  |

## 1. Instal Plugin (Jika belum)

```bash
yarn add --dev babel-plugin-module-resolver
```

## 2. Konfigurasi `babel.config.js`

Tambahkan plugin:

```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@hooks': './src/hooks',
          '@services': './src/services',
          '@store': './src/store',
          '@assets': './src/assets',
          '@utils': './src/utils',
          '@types': './src/types',
        },
      },
    ],
  ],
};
```

## 3. Konfigurasi `tsconfig.json`

Pastikan paths:

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@components/*": ["src/components/*"],
      "@screens/*": ["src/screens/*"],
      "@navigation/*": ["src/navigation/*"],
      "@hooks/*": ["src/hooks/*"],
      "@services/*": ["src/services/*"],
      "@store/*": ["src/store/*"],
      "@assets/*": ["src/assets/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"]
    }
  }
}
```

## 4. Contoh Penggunaan

Sebelum:

```typescript
import MenuCard from '../../components/MenuCard';
import { useFetchMenu } from '../../hooks/useFetchMenu';
```

Setelah:

```typescript
import MenuCard from '@components/MenuCard';
import { useFetchMenu } from '@hooks/useFetchMenu';
```

## 5. VS Code IntelliSense

Tambahkan (opsional) di `.vscode/settings.json`:

```json
{
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "javascript.preferences.importModuleSpecifier": "non-relative"
}
```

## 6. Masalah Umum & Solusi

| Masalah                                        | Penyebab           | Solusi                                           |
| ---------------------------------------------- | ------------------ | ------------------------------------------------ |
| Alias tidak dikenali saat lint                 | ESLint belum aware | Tambah setting parser + plugin import resolver   |
| Test Jest gagal resolve                        | Jest belum map     | Tambahkan `moduleNameMapper` di `jest.config.js` |
| Build Android error "Unable to resolve module" | Cache Metro lama   | Jalankan `npx react-native start --reset-cache`  |

### Contoh `jest.config.js` Mapper

```javascript
module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    // tambahkan sesuai kebutuhan
  },
};
```

## 7. Verifikasi

1. Jalankan `tsc --noEmit` -> tidak error import.
2. Jalankan `yarn test` -> semua test lulus.
3. Jalankan aplikasi -> navigasi berfungsi.

## Alignment dengan Rubrik Penilaian

- Project Setup & Structure (10%): Alias membuat struktur import konsisten dan mudah dinilai.
- Code Quality & Documentation (5%): Mengurangi import relatif panjang -> kode rapi.
- Functionality/State/Navigation/API: Memudahkan refactor modul menjadi lebih terpisah.

## Cara Mengganti Placeholder

Jika muncul `<<ALIAS_TAMBAHAN>>` ganti dengan folder baru yang ingin Anda alias-kan.

## Related Docs

- `PROJECT_STRUCTURE.md`
- `DEVELOPMENT_CHECKLIST.md`
- `TESTING_STRATEGY.md`
