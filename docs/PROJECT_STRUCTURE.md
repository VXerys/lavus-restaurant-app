# PROJECT STRUCTURE

Ringkasan: Struktur folder yang direkomendasikan untuk Lavus Restaurant App beserta penjelasan.

Last Updated: 2025-11-10

## Tujuan Struktur

Memisahkan concern (UI, navigasi, state, layanan, util) agar maintainability tinggi dan onboarding cepat.

## Struktur Direkomendasikan

```text
lavus-restaurant-app/
├─ app.json
├─ App.tsx
├─ index.js
├─ babel.config.js
├─ package.json
├─ tsconfig.json
├─ android/                # Native Android
├─ ios/                    # Native iOS
├─ docs/                   # Dokumentasi proyek
├─ src/
│  ├─ assets/
│  │  ├─ images/           # Gambar menu, logo
│  │  └─ icons/            # SVG / PNG ikon
│  ├─ components/          # Komponen UI reusable (Button, CardMenu, RatingStars)
│  ├─ screens/             # Screen: Home, Menu, Detail, Checkout, Reserve, Profile
│  ├─ navigation/          # Stack, Tab, dan konfigurasi navigasi utama
│  ├─ hooks/               # Custom hooks (useFetchMenu, useReservationForm)
│  ├─ services/            # API client, modul fetch (menuService, reservationService)
│  ├─ store/               # State management (Redux/Zustand slices)
│  ├─ utils/               # Helper: formatCurrency, date helpers
│  ├─ types/               # TypeScript types / interfaces
│  ├─ config/              # Konfigurasi (endpoint base URL, feature flags)
│  ├─ theme/               # Styling global (colors, spacing)
│  └─ test/                # Test util / mocks tambahan
└─ __tests__/              # Test Jest untuk komponen/screen
```

## Penjelasan Folder

| Folder | Fungsi | Contoh File |
|--------|--------|-------------|
| `assets/images` | Gambar statis | `salad.png`, `logo.png` |
| `components` | Komponen generik | `Button.tsx`, `MenuCard.tsx` |
| `screens` | Halaman navigasi | `HomeScreen.tsx`, `ReserveScreen.tsx` |
| `navigation` | Struktur navigasi | `RootNavigator.tsx`, `AppTabs.tsx` |
| `hooks` | Reusable logic | `useFetchMenu.ts`, `useAuth.ts` |
| `services` | Abstraksi API | `menuService.ts`, `reservationService.ts` |
| `store` | Global state | `menuSlice.ts`, `userSlice.ts` |
| `utils` | Helper | `formatCurrency.ts` |
| `types` | Type definitions | `menu.ts`, `reservation.ts` |
| `config` | Konfigurasi | `env.ts`, `flags.ts` |
| `theme` | Variabel styling | `colors.ts`, `spacing.ts` |

## Contoh `colors.ts`

```typescript
export const Colors = {
  primary: '#95AE45', // Overt Green
  background: '#F0ECE6',
  text: '#0A0A0A',
  danger: '#C32F27',
  warning: '#FF9F1C'
};
```

## Contoh `App.tsx` Skeleton

```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '@navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
```

## Contoh `navigation/RootNavigator.tsx`

```typescript
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/HomeScreen';
import MenuDetailScreen from '@screens/MenuDetailScreen';
import ReserveScreen from '@screens/ReserveScreen';
import CheckoutScreen from '@screens/CheckoutScreen';
import ProfileScreen from '@screens/ProfileScreen';

export type RootStackParamList = {
  Home: undefined;
  MenuDetail: { id: string };
  Reserve: undefined;
  Checkout: { orderId?: string };
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="MenuDetail" component={MenuDetailScreen} />
    <Stack.Screen name="Reserve" component={ReserveScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

export default RootNavigator;
```

## Contoh Service `services/menuService.ts`

```typescript
import { MenuItem } from '@types/menu';

const BASE_URL = '<<API_BASE_URL>>';

export async function fetchMenu(category?: string): Promise<MenuItem[]> {
  const url = category ? `${BASE_URL}/menu?category=${category}` : `${BASE_URL}/menu`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Gagal memuat menu');
  return res.json();
}
```

## Naming Convention Komponen

- PascalCase untuk komponen: `MenuCard`.
- hook: `useNamaHook` -> `useFetchMenu`.
- file type: `menu.ts`, `reservation.ts`.

## File Yang Tidak Disimpan di Repo

| Tipe | Alasan |
|------|--------|
| `.env.local` | Data sensitif (API keys) |
| build artifacts | Dihasilkan oleh CI |
| user data | Privasi |

## Cara Mengganti Placeholder
 
Ganti `<<API_BASE_URL>>` dengan endpoint aktual. Jika belum tersedia gunakan `<<PLACEHOLDER - fill from project brief>>`.

## Alignment dengan Rubrik Penilaian

| Kategori | Dukungan Struktur | Dampak |
|----------|-------------------|--------|
| Project Setup & Structure | Struktur `src/` jelas | Memudahkan penilai menelusuri kode |
| UI & Design Implementation | Folder `components/`, `theme/` | UI konsisten & reusable |
| Functionality & Interactivity | `services/`, `hooks/` | Logika terpisah mudah diuji |
| State Management & Hooks | `store/` & `hooks/` | Arsitektur state rapi |
| Navigation & Data Flow | `navigation/` + types | Alur data tertib |
| API Integration | `services/` | Penanganan data terpusat |
| Code Quality & Documentation | `types/`, `utils/` | Kode mudah dibaca & di-dokumentasi |

## Related Docs

- `PATH_ALIASES_SETUP.md`
- `DEVELOPMENT_CHECKLIST.md`
- `QUICK_REFERENCE.md`
- `TESTING_STRATEGY.md`
