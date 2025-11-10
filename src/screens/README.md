# screens/

Kumpulan layar (routes) aplikasi. Setiap screen mengatur layout, mengorkestrasi komponen, dan memanggil hooks/services.

Gunakan untuk:

- Mengelola alur pengguna per fitur: Home, Menu, Reservasi, Promo, Profil.
- Menangani navigasi dan efek samping ringan (melalui hooks/services).

Best practices:

- Satu folder per screen/fitur bila kompleks (dengan subkomponen internal).
- Tipe `RouteParam` didefinisikan dan digunakan konsisten (lihat `@types`).
- Hindari logic berat di JSX; ekstrak ke hooks atau utils.
- Pastikan aksesibilitas (accessibilityLabel, role) mengikuti DoD (lihat [`docs/DEFINITION_OF_DONE.md`](../../docs/DEFINITION_OF_DONE.md)).

Contoh struktur:

```text
screens/
  Home/
    HomeScreen.tsx
    components/
      PromoStrip.tsx
  Reservation/
    ReservationScreen.tsx
```
