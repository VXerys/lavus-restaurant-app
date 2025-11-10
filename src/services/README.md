# services/

Abstraksi akses data: HTTP API, storage lokal, adapter pihak ketiga.

Gunakan untuk:

- Mengelola request/response, retry sederhana, dan mapping DTO -> model UI.
- Menempatkan logika validasi & transformasi data.

Best practices:

- Satu service per domain: `reservationService.ts`, `menuService.ts`.
- Tangani error terpusat dan kembalikan bentuk error yang konsisten.
- Jangan render UI di sini; kembalikan data/hasil.
- Siapkan layer untuk caching (future) dan interceptor auth (future).

Contoh:

```ts
// reservationService.ts (placeholder)
export async function createReservation(payload: { time: string; people: number }) {
  // return await http.post('/reservations', payload)
  return { id: 'temp-id', ...payload };
}
```

Terkait: [`docs/TESTING_STRATEGY.md`](../../docs/TESTING_STRATEGY.md), [`docs/DEFINITION_OF_DONE.md`](../../docs/DEFINITION_OF_DONE.md).
