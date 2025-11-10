# src/

Folder utama source code aplikasi Lavus Restaurant App.

Isi utama dan tujuan:

- `components/`: Kumpulan komponen UI presentational yang bisa digunakan ulang.
- `screens/`: Halaman (route) aplikasi, mengatur layout & interaksi tingkat layar.
- `navigation/`: Deklarasi navigator (stack/tab) dan tipe route params.
- `services/`: Akses data (API, storage) & adapter.
- `store/`: Manajemen state global (rencana: Redux Toolkit/Zustand).
- `hooks/`: Custom React hooks reusable.
- `utils/`: Utilitas/pure functions tanpa side-effect.
- `types/`: Tipe global (DTO, RouteParam, dsb.).
- `theme/`: Token desain (warna, spacing, typography) & styling helpers.
- `assets/`: Gambar, ikon, font.

Best practices (ringkas):

- Gunakan TypeScript di semua modul; ketat pada tipe public API.
- Impor pakai alias path untuk konsistensi (lihat [`docs/PATH_ALIASES_SETUP.md`](../docs/PATH_ALIASES_SETUP.md)).
- Pisahkan "UI" (components) dari "logika/akses data" (services/store/utils).
- Satu tanggung jawab per file; utamakan keterbacaan.
- Tambahkan test minimal untuk util & hooks (lihat [`docs/TESTING_STRATEGY.md`](../docs/TESTING_STRATEGY.md)).

Contoh impor:

```ts
import Button from '@components/Button';
import HomeScreen from '@screens/HomeScreen';
import { fetchPromos } from '@services/promoService';
```

Referensi terkait: [`docs/PROJECT_STRUCTURE.md`](../docs/PROJECT_STRUCTURE.md).
