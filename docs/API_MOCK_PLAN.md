# API Mock & Integration Plan

Ringkasan: Strategi bertahap agar pengembangan UI dapat dimulai cepat menggunakan data mock, lalu beralih mulus ke API (mockapi.io) tanpa rework besar. Dokumen ini melengkapi `PATH_ALIASES_SETUP.md`, `PROJECT_STRUCTURE.md`, dan `DEFINITION_OF_DONE.md`.

Last Updated: 2025-11-10

## Tujuan

- Mulai slicing UI segera dengan data yang konsisten.
- Menjaga kontrak data (TypeScript types) agar stabil saat ganti sumber data.
- Memenuhi rubrik API Integration, Functionality, State, Code Quality.

## Rencana Bertahap (Detail)

### P0 – Slicing dengan Data Mock (Local)

- Definisikan tipe TS final: `MenuItem`, `Promotion`, `Reservation`, `Review`, `User`.
- Simpan data mock di `src/mocks/data/` (TS/JSON) dengan struktur yang realistis.
- Buat service tipis yang membaca data mock, tetapi expose API yang sama seperti versi HTTP.
- Buat custom hooks (`useMenus`, `usePromotions`, dst.) dengan state `loading/error/data`.
- UI wajib menampilkan skeleton/loading, error message, dan empty state.

Acceptance P0:

- Home menampilkan list menu dari mock.
- Ada 1 alur submit sederhana (contoh: create reservation) yang saat P0 bisa simulated success.

### P1 – Integrasi ke mockapi.io

- Set prefix `/api/v1` di mockapi.io; catat `BASE_URL`.
- Implement `src/services/http.ts` (fetch wrapper) dan ganti implementasi service dari mock → HTTP.
- Tambahkan error handling terpusat; jaga kontrak tetap sama.

Acceptance P1:

- GET list (menus/promotions) dan POST reservation berjalan ke API.
- Loading & error terlihat saat demo.

### P2 – Testing

- Unit test minimal 1 service (happy + error path).
- (Opsional) test hook menggunakan RTL + renderHook pattern.

### P3 – Optimisasi (Opsional Nilai Plus)

- Retry ringan untuk GET saat network error.
- Debounce pencarian menu.
- In-memory cache sederhana (atau AsyncStorage) untuk list menu.

## Struktur Folder & Switching

```text
src/
  mocks/
    data/
      menus.ts
      promotions.ts
      reservations.ts
      reviews.ts
      users.ts
    delay.ts                 # opsional simulasi latency
  services/
    http.ts                  # wrapper fetch (BASE_URL mockapi)
    menuService.ts
    reservationService.ts
    promotionService.ts
  hooks/
    useMenus.ts
```

Switching strategi:

- Gunakan flag sederhana di service (mis. `const USE_MOCK = true`), atau ekspor dua implementasi dan pilih di index service.
- UI/hook tidak berubah saat mock → API karena kontrak sama.

## Kontrak Data (Ringkas)

- Semua waktu ISO 8601 (`createdAt`, `updatedAt`, `timeSlot`).
- `price` integer (IDR), `rating` number (0–5), enum `status` dan `tier`.
- Relasi via string id: `userId`, `menuId`, `reservationId`.

## Contoh Tipe (TypeScript)

```ts
export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  currency: 'IDR';
  imageUrl?: string;
  description?: string;
  rating: number;
  ratingCount: number;
  isAvailable: boolean;
  tags: string[];
  promoIds: string[];
  calories?: number;
  spicyLevel?: number;
  createdAt: string;
  updatedAt: string;
}
```

## http.ts (Sketsa)

```ts
const BASE_URL = 'https://<project-id>.mockapi.io/api/v1';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export const http = {
  get: <T>(p: string) => request<T>(p),
  post: <T>(p: string, body: unknown) => request<T>(p, { method: 'POST', body: JSON.stringify(body) }),
};
```

## Checklist Implementasi

- [ ] Tipe TS final untuk entity utama.
- [ ] Data mock tersedia untuk demo awal.
- [ ] Service mock expose API yang sama dengan versi HTTP.
- [ ] Hook mengelola loading/error/data.
- [ ] UI tampilkan loading/error/empty.
- [ ] BASE_URL terdokumentasi (prefix `/api/v1`).
- [ ] Minimal 1 POST + beberapa GET saat integrasi.
- [ ] Unit test minimal 1 service.

## Alignment dengan Rubrik Penilaian

- API Integration & Data Handling: struktur service + http wrapper + loading/error.
- Functionality & Interactivity: list menu, promo, create reservation.
- State Management & Hooks: hook per resource, kontrak konsisten.
- Code Quality & Documentation: tipe TS + dokumen rencana transisi.
- Presentation: mudah demontrasi switching mock → API.

## Related Docs

- `PATH_ALIASES_SETUP.md`
- `PROJECT_STRUCTURE.md`
- `DEFINITION_OF_DONE.md`
- `TESTING_STRATEGY.md`
- `SETUP_COMPLETE.md`
