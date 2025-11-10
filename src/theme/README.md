# theme/

Token desain & styling helpers.

Isi yang disarankan:

- `colors.ts`: palet dari [`docs/Lavus-Project-Overview.md`](../../docs/Lavus-Project-Overview.md)
- `spacing.ts`, `typography.ts`
- `shadows.ts` (opsional)

Best practices:

- Hanya ekspor konstanta & helper; hindari referensi ke komponen.
- Konsisten gunakan token di `components/` dan `screens/`.
- Pertimbangkan dukungan dark mode (future).
