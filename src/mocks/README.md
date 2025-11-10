# mocks/

Data mock dan util untuk mendukung slicing UI tanpa bergantung pada backend.
Dengan pola ini, transisi ke API nyata (mockapi.io) tidak membutuhkan refactor besar karena kontrak data dan service disamakan sejak awal.

Last Updated: 2025-11-10

## Tujuan

- Menyediakan data contoh yang konsisten (menus, promotions, reservations, reviews, users).
- Mempercepat slicing UI dan validasi alur fitur.
- Menjadi fallback saat API bermasalah (demo tetap lancar).

## Struktur

```text
src/
  mocks/
    data/
      menus.ts
      promotions.ts
      reservations.ts
      reviews.ts
      users.ts
    delay.ts
```

## Cara Pakai

- Service akan membaca dari data mock bila flag `USE_MOCK` diaktifkan (opsional implementasi).
- Kontrak service sama dengan versi HTTP, sehingga UI/hook tidak perlu diubah saat switching.

## Best Practices

- Jaga tipe data konsisten dengan entity TypeScript (lihat `docs/API_MOCK_PLAN.md`).
- Simulasikan `loading` dengan `delay` kecil saat perlu mendemokan state (1–2 detik).
- Buat data realistis (harga IDR integer, tanggal ISO 8601, rating 0–5).
- Pisahkan data per resource, hindari nested berat; gunakan id relasi (userId, menuId).

## Related Docs

- `docs/API_MOCK_PLAN.md`
- `docs/PROJECT_STRUCTURE.md`
- `docs/DEFINITION_OF_DONE.md`
- `docs/TESTING_STRATEGY.md`
