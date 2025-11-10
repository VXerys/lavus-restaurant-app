# store/

Manajemen state global aplikasi (rencana: Redux Toolkit/Zustand). Saat ini dapat berisi placeholder atau konteks sederhana.

Gunakan untuk:

- State lintas layar: auth, loyalty points, settings.
- Selector dan action terstandar.

Best practices:

- Hindari menyimpan objek UI murni; simpan data sumber.
- Buat slice/module per domain dengan selector teruji.
- Batasi efek samping di middleware/thunk, bukan di komponen.
- Ketat pada tipe untuk mencegah regresi (lihat `docs/TESTING_STRATEGY.md`).

Referensi: [`docs/PROJECT_STRUCTURE.md`](../../docs/PROJECT_STRUCTURE.md).
