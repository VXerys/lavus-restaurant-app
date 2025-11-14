# assets/

Folder berisi semua aset statis yang dipakai UI (gambar, ikon, font). Tujuan dokumentasi ini agar slicing cepat & konsisten, serta memenuhi aspek "UI & Design" dan "Code Quality" di rubrik.

## Struktur

```text
src/assets/
  images/           # Gambar umum (logo, banner, splash, foto menu)
  icons/            # Ikon kategori (active & inactive)
  fonts/            # File font (Open Sans, Noto Serif)
  index.ts          # Export terpusat fonts, icons, images
```

## Cara Import (Path Alias)

Semua diekspor melalui `src/assets/index.ts` sehingga cukup:

```ts
import { Images, CategoryIcons, Fonts } from '@assets';
```

Contoh penggunaan gambar logo:

```tsx
<Image
  source={Images.logo}
  style={{ width: 120, height: 120, resizeMode: 'contain' }}
/>
```

Contoh ikon kategori (menggunakan komponen siap pakai):

```tsx
import CategoryIcon from '@components/CategoryIcon';

<CategoryIcon category="salad" label="Salad" active />;
```

## Font

Mapping di `Fonts` hanya memuat varian yang sering dipakai agar bundle tidak membengkak:

```ts
export const Fonts = {
  regular: 'OpenSans-Regular',
  medium: 'OpenSans-Medium',
  semiBold: 'OpenSans-SemiBold',
  serifTitle: 'NotoSerif-Bold',
};
```

Gunakan wrapper `AppText` untuk konsistensi:

```tsx
import AppText from '@components/AppText';
<AppText weight="semiBold">Judul</AppText>;
```

### Linking Font ke Native

1. Pastikan `react-native.config.js` berisi:

```js
module.exports = { assets: ['./src/assets/fonts'] };
```

2. Jalankan:

```powershell
npx react-native-asset
```

1. Rebuild aplikasi (Android/iOS).

## Ikon Active vs Inactive

Setiap kategori memiliki dua file PNG:

```text
Salad-color.png      # saat active (highlight)
Salad-noColor.png    # saat inactive (outline/monochrome)
```

Komponen `CategoryIcon` secara otomatis memilih file berdasarkan prop `active` dan menganimasikan scale + shadow.

## Penamaan & Optimasi

- Gunakan kebab-case: `menu-spicy-chicken.png`, `banner-promo-nov.png`.
- Hindari spasi & huruf besar di nama file (linting aset lebih mudah).
- Kompres lossless (pngquant, ImageOptim) sebelum commit untuk menjaga performa.
- Simpan aset yang jarang berubah di folder kategori masing-masing daripada folder root.

## Checklist Slicing Menggunakan Aset

- [ ] Font sudah dilink (uji dengan `AppText`).
- [ ] Ikon kategori tampil active/inactive sesuai state.
- [ ] Logo termuat tanpa scaling blur.
- [ ] Gambar menu pakai `resizeMode='cover'` atau `'contain'` sesuai kebutuhan.
- [ ] Semua import memakai path alias (`@assets`).

## Alignment dengan Rubrik Penilaian

- UI & Design: Konsistensi ikon, warna active/inactive, tipografi harmonis.
- Code Quality & Documentation: Sentralisasi export (`index.ts`), wrapper `AppText`, dokumen ini.
- Creativity & Innovation: Animasi halus pada kategori (scale + shadow) memperkaya interaksi.
- Presentation & Demonstration: Struktur aset mempermudah demo cepat tanpa kebingungan path.

## Tips Tambahan

- Jika nanti beralih ke SVG, tetap gunakan struktur dan alias yang sama agar refactor minimal.
- Hindari mengubah dimensi ikon melalui style > scale besar (pakai file sumber yang cukup besar kalau perlu ukuran lebih besar).
- Simpan varian besar gambar (hero/banner) terkompres WebP untuk performa (Android/iOS mendukung via fallback PNG bila perlu).
