# utils/

Fungsi utilitas murni (pure), tanpa side-effect, mudah diuji.

Contoh kategori:

- Formatting (tanggal, angka, mata uang)
- Parser/validator sederhana
- Helper umum (array/object)

Best practices:

- Hindari ketergantungan pada UI/React.
- Sertakan test unit untuk tiap util penting.
- Jaga fungsi tetap kecil & fokus; dokumentasikan kontrak input/output.

Referensi: [`docs/TESTING_STRATEGY.md`](../../docs/TESTING_STRATEGY.md).
