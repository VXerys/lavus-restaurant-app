# assets/

Aset statis: gambar, ikon, font, lottie.

Struktur contoh:

```text
assets/
  images/
  icons/
  fonts/
```

Best practices:

- Penamaan deskriptif-kebab-case: `promo-banner-summer-2025.png`.
- Optimasi ukuran gambar sebelum commit (lossless bila perlu).
- Import via `require`/`import` dan konsisten path alias jika digunakan.
- Daftarkan font di native (Android/iOS) sesuai panduan RN.
