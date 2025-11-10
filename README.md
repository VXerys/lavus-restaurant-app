<div align="center">

# Lavu's Restaurant App

<img width="113" height="197" alt="logo-lavus" src="https://github.com/user-attachments/assets/ecb0b5d0-86c5-4d76-96dd-45486858312d" />

<strong>Reserve • Order • Earn • Experience</strong><br/>
Satu aplikasi mobile untuk pemesanan meja, pre-order makanan, tracking promosi, & program loyalitas restoran.

"Dari pencarian meja sampai review makanan – semuanya terintegrasi cepat dalam genggaman."

</div>

---

## Identitas Mahasiswa (UTS)

| Nama | NIM | Universitas | Fakultas / Jurusan | Semester |
|------|-----|------------|--------------------|----------|
| M. Sechan Alfarisi | 20230040094 | Universitas Nusa Putra | Teknik Informatika | 5 |

README ini disusun sebagai dokumen komprehensif tugas UTS Mata Kuliah: <strong>Pemrograman Perangkat Mobile</strong>.

---

## Daftar Isi

- [Lavus Restaurant App](#lavus-restaurant-app)
  - [Identitas Mahasiswa (UTS)](#identitas-mahasiswa-uts)
  - [Daftar Isi](#daftar-isi)
  - [Elevator Pitch \& Nilai Bisnis](#elevator-pitch--nilai-bisnis)
    - [Nilai Utama](#nilai-utama)
  - [Problem \& Solusi](#problem--solusi)
  - [Fitur Utama (MVP \& Roadmap)](#fitur-utama-mvp--roadmap)
    - [MVP (Tahap Awal)](#mvp-tahap-awal)
    - [Roadmap (Iterasi Lanjutan)](#roadmap-iterasi-lanjutan)
  - [Arsitektur \& Teknologi](#arsitektur--teknologi)
    - [Prinsip Desain Kode](#prinsip-desain-kode)
  - [Struktur Proyek](#struktur-proyek)
  - [Setup Lingkungan \& Prasyarat](#setup-lingkungan--prasyarat)
  - [Menjalankan Aplikasi](#menjalankan-aplikasi)
    - [Start Metro](#start-metro)
    - [Android Debug](#android-debug)
    - [iOS (Mac only)](#ios-mac-only)
    - [Pembersihan Build Android](#pembersihan-build-android)
    - [Quick Reference](#quick-reference)
  - [Quality \& Engineering Practices](#quality--engineering-practices)
  - [Strategi Testing](#strategi-testing)
  - [Agile \& Sprint Ceremonies](#agile--sprint-ceremonies)
  - [Alignment Rubrik Penilaian UTS](#alignment-rubrik-penilaian-uts)
  - [Desain \& Branding](#desain--branding)
  - [API \& Data Handling (Placeholder)](#api--data-handling-placeholder)
  - [Keamanan \& Privasi (Placeholder)](#keamanan--privasi-placeholder)
  - [Roadmap \& Improvement Tracking](#roadmap--improvement-tracking)
  - [Kontribusi \& Branching](#kontribusi--branching)
  - [Referensi Dokumentasi Internal](#referensi-dokumentasi-internal)
  - [Lisensi \& Catatan](#lisensi--catatan)
  - [Status Proyek (Ringkas)](#status-proyek-ringkas)
  - [Cara Cepat Demo (Windows)](#cara-cepat-demo-windows)
  - [Acknowledgements](#acknowledgements)

---

## Elevator Pitch & Nilai Bisnis

"Lavus Restaurant App" menghadirkan <em>experience terpadu</em> untuk pelanggan restoran modern: booking meja instan, pre-order hidangan, pembayaran cepat, loyalty point & promo personal. Bisnis mendapatkan data perilaku, feedback terstruktur, dan retensi yang meningkat; pelanggan memperoleh kenyamanan, transparansi, dan keuntungan.

### Nilai Utama

- Mengurangi waktu tunggu (table & payment) → meningkatkan kepuasan.
- Mendorong repeat order melalui loyalty & promo yang relevan.
- Mempermudah restoran memetakan preferensi pelanggan (insight menu & rating).
- Meminimalkan friction proses review (digital, kontekstual, cepat).

---

## Problem & Solusi

| Problem Pelanggan | Dampak | Solusi di Lavus |
|-------------------|--------|-----------------|
| Susah dapat meja saat jam ramai | Frustrasi, pindah ke kompetitor | Fitur reservasi real-time & status ketersediaan |
| Bingung memilih menu & rekomendasi | Keputusan lama, potensi salah | Menu dengan rekomendasi (rating, favorit, poin) |
| Proses bayar dan review lambat | Waktu makan bertambah, pengalaman buruk | Checkout terintegrasi + quick rating post-meal |
| Tidak ada insentif kembali | Retensi rendah | Loyalty point & kupon dinamis |
| Feedback pelanggan tidak terstruktur | Sulit iterasi kualitas | Form digital + analitik sederhana |

---

## Fitur Utama (MVP & Roadmap)

### MVP (Tahap Awal)
- Reservasi meja (pilih waktu & jumlah orang)
- Pre-order menu sederhana
- Halaman Home dengan daftar promo aktif
- Loyalty point tracker (placeholder kalkulasi)
- Rating & review cepat setelah pembayaran
- Autentikasi dasar (placeholder UI)
- Navigasi utama: Home, Menu, Reservasi, Promo, Profil

### Roadmap (Iterasi Lanjutan)
- Integrasi payment gateway (Midtrans / Xendit) *(future)*
- Sistem rekomendasi berbasis riwayat beli *(future)*
- Push notification (promo personal) *(future)*
- Dark mode & aksesibilitas lengkap *(future)*
- Offline caching menu *(future)*
- Multi-tenant (beberapa restoran) *(future)*

---

## Arsitektur & Teknologi

| Layer | Ringkasan | Teknologi / Praktik |
|-------|-----------|---------------------|
| Presentasi | React Native UI Components & Screens | TypeScript, StyleSheet / (styled-components optional future) |
| Navigasi | Stack + Tab Navigation (placeholder) | React Navigation (to be added) |
| State | Local state + (planning: Redux Toolkit / Zustand) | Hooks (useState/useEffect) |
| Data | Placeholder service layer | Axios/fetch (planned) |
| Testing | Unit, integration, e2e | Jest, React Testing Library, Detox |
| Config | Path alias, tsconfig, metro | Babel module resolver |
| Quality | Lint, format, typecheck | ESLint, Prettier, TypeScript |

### Prinsip Desain Kode
1. Modular & terpisah per domain (menu, reservasi, promo).
2. Pure functions untuk kalkulasi loyalty.
3. Separation of concerns (UI vs data fetching vs store).
4. Scalability & clarity (alias path untuk import bersih).

---

## Struktur Proyek

Lihat rincian lengkap di [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md).

```
src/
	components/
	screens/
	navigation/
	services/
	store/
	hooks/
	utils/
	theme/
	assets/
```

Alias contoh: `@components/Button`, `@screens/HomeScreen` (detail di [`docs/PATH_ALIASES_SETUP.md`](docs/PATH_ALIASES_SETUP.md)).

---

## Setup Lingkungan & Prasyarat

Minimum:
- Node LTS: (lihat `docs/SETUP_COMPLETE.md` → `<<NODE_LTS_VERSION>>`)
- Java 17
- Android SDK & Emulator
- Yarn
- Git

Verifikasi cepat (Windows PowerShell):
```powershell
node -v
java -version
adb devices
npx react-native info
```
Checklist lengkap: [`docs/SETUP_COMPLETE.md`](docs/SETUP_COMPLETE.md).

---

## Menjalankan Aplikasi

### Start Metro
```powershell
yarn start
```

### Android Debug
```powershell
yarn android
```

### iOS (Mac only)
```bash
bundle install
bundle exec pod install
yarn ios
```

### Pembersihan Build Android
```powershell
cd android; ./gradlew clean; cd ..; yarn android
```

### Quick Reference
Lihat ringkas perintah di [`docs/QUICK_REFERENCE.md`](docs/QUICK_REFERENCE.md).

---

## Quality & Engineering Practices

- Branch model: `main` + feature/hotfix/release (detail: [`docs/BRANCH_STRATEGY.md`](docs/BRANCH_STRATEGY.md)).
- Definition of Done: fungsional, UI konsisten, lint & typecheck lulus ([`docs/DEFINITION_OF_DONE.md`](docs/DEFINITION_OF_DONE.md)).
- Development checklist: onboarding & pre-PR gates ([`docs/DEVELOPMENT_CHECKLIST.md`](docs/DEVELOPMENT_CHECKLIST.md)).
- Continuous Improvement log: [`docs/IMPROVEMENT_SUMMARY.md`](docs/IMPROVEMENT_SUMMARY.md).

---

## Strategi Testing

Referensi lengkap di [`docs/TESTING_STRATEGY.md`](docs/TESTING_STRATEGY.md).

| Layer | Tujuan | Contoh (Placeholder) |
|-------|--------|----------------------|
| Unit | Validasi fungsi kalkulasi loyalty | pointsCalculator.test.ts |
| Component | Render UI & props | MenuCard.test.tsx |
| Integration | Interaksi user antar komponen | ReservationFlow.test.tsx |
| E2E | Skenario end-user | Detox scenario reservasi |

Command:
```powershell
yarn test
yarn typecheck
```

---

## Agile & Sprint Ceremonies

Sprint 1–2 fokus MVP reservasi & loyalty dasar. Lihat [`docs/AGILE_SCRUM_PLAN.md`](docs/AGILE_SCRUM_PLAN.md) dan [`docs/SPRINT_CEREMONIES.md`](docs/SPRINT_CEREMONIES.md) untuk format daily, planning, review, retrospective. Tracking metrik di [`docs/SPRINT_TRACKING.md`](docs/SPRINT_TRACKING.md).

---

## Alignment Rubrik Penilaian UTS

Ringkas hubungan kategori penilaian dengan dokumen & artefak.

| Kategori | Bukti / Dokumen | Highlight |
|----------|-----------------|----------|
| Project Setup | `SETUP_COMPLETE.md`, alias config | Lingkungan siap tanpa error |
| UI & Design | Desain di [`Lavus-Project-Overview.md`](docs/Lavus-Project-Overview.md), komponen modular | Konsistensi brand & struktur UI |
| Functionality | Fitur reservasi, loyalty (placeholder) | Alur inti aplikasi berjalan |
| State Management | Hooks & rencana store modular | Skalabilitas future state global |
| Navigation | Rencana stack/tab (placeholder) | Alur antar screen jelas |
| API Integration | Service layer placeholder | Struktur siap integrasi API eksternal |
| Code Quality | Lint, typecheck, DoD, checklist | Standar kualitas terdokumentasi |
| Creativity | Loyalty gamification, promo dynamic | Diferensiasi aplikasi restoran |
| Presentation | README, quick reference, alignment tables | Mudah dipresentasikan |

Detail mapping per dokumen ada di masing-masing section "Alignment" dalam folder `docs/`.

---

## Desain & Branding

Ringkasan visual & sistem desain lengkap: [`docs/Lavus-Project-Overview.md`](docs/Lavus-Project-Overview.md).

- Warna utama: Overt Green `#95AE45` → kesehatan & segar.
- Typeface: Butler (serif elegan) + Poppins (sans untuk readability).
- Logo: Variasi hijau & hitam, ranking ikon kursi berbintang.

Tempatkan screenshot (placeholder):

```
screenshots/
	home.png
	reservation.png
	promo.png
	loyalty.png
```

---

## API & Data Handling (Placeholder)

Rencana integrasi:
- Endpoint reservasi (GET availability, POST booking)
- Endpoint menu & promo (GET menu list, GET promo active)
- Endpoint loyalty (GET points, POST earn)

Error handling pattern (planned): centralized service -> map HTTP status -> UI feedback.

---

## Keamanan & Privasi (Placeholder)

Draft kebijakan awal:
- Autentikasi akan menggunakan token JWT (future).
- Data pribadi (nama, email) hanya untuk profil & loyalty.
- Review disimpan dengan anonimisasi ID pelanggan (pertimbangan). 
- Akan ditambahkan screen Privacy & ToS.

---

## Roadmap & Improvement Tracking

Perubahan & ide iteratif dicatat di [`docs/IMPROVEMENT_SUMMARY.md`](docs/IMPROVEMENT_SUMMARY.md).
Contoh metrik target:
- Time-to-reserve < 30 detik.
- Retention pengguna > 40% setelah 3 bulan.
- Crash-free session > 99%.

---

## Kontribusi & Branching

Ikuti model:
```text
feature/<deskripsi-singkat>
hotfix/<issue-kritis>
release/<versi>
```
Pull Request wajib checklist DoD & lint/typecheck lulus (lihat [`docs/BRANCH_STRATEGY.md`](docs/BRANCH_STRATEGY.md)).

---

## Referensi Dokumentasi Internal

| File | Tujuan |
|------|--------|
| [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md) | Struktur direktori & rasional |
| [`docs/PATH_ALIASES_SETUP.md`](docs/PATH_ALIASES_SETUP.md) | Konfigurasi alias impor |
| [`docs/DEFINITION_OF_DONE.md`](docs/DEFINITION_OF_DONE.md) | Standar kelengkapan fitur |
| [`docs/DEVELOPMENT_CHECKLIST.md`](docs/DEVELOPMENT_CHECKLIST.md) | Checklist onboarding & PR |
| [`docs/BRANCH_STRATEGY.md`](docs/BRANCH_STRATEGY.md) | Model branching & PR governance |
| [`docs/BRANCH_SUMMARY.md`](docs/BRANCH_SUMMARY.md) | Ringkas perintah git |
| [`docs/AGILE_SCRUM_PLAN.md`](docs/AGILE_SCRUM_PLAN.md) | Rencana sprint & cadence |
| [`docs/SPRINT_CEREMONIES.md`](docs/SPRINT_CEREMONIES.md) | Format setiap ceremony |
| [`docs/SPRINT_TRACKING.md`](docs/SPRINT_TRACKING.md) | Metrik & tracking sprint |
| [`docs/TESTING_STRATEGY.md`](docs/TESTING_STRATEGY.md) | Layer dan tujuan pengujian |
| [`docs/SETUP_COMPLETE.md`](docs/SETUP_COMPLETE.md) | Verifikasi environment |
| [`docs/QUICK_REFERENCE.md`](docs/QUICK_REFERENCE.md) | Cheat-sheet perintah harian |
| [`docs/IMPROVEMENT_SUMMARY.md`](docs/IMPROVEMENT_SUMMARY.md) | Log perbaikan & aksi lanjutan |
| [`docs/rubrik-penilaian.md`](docs/rubrik-penilaian.md) | Rubrik penilaian sumber |
| [`docs/Lavus-Project-Overview.md`](docs/Lavus-Project-Overview.md) | Dokumen desain & brand |

---

## Lisensi & Catatan

Hak cipta akademik tugas UTS – penggunaan publik memerlukan izin. Lisensi akan ditentukan setelah fase MVP (placeholder). 

> Catatan: Beberapa bagian masih placeholder (API, store global, payment) dan akan diimplementasikan pada iterasi selanjutnya.

---

## Status Proyek (Ringkas)

| Aspek | Status |
|-------|--------|
| Setup Environment | OK |
| Struktur Proyek | Draft disiapkan |
| Fitur Reservasi | Placeholder UI |
| Loyalty | Konsep (belum kalkulasi real) |
| Testing | Kerangka siap (belum banyak kasus) |
| Dokumentasi | Komprehensif (README + docs) |

---

## Cara Cepat Demo (Windows)

```powershell
git clone <repo-url>
cd lavus-restaurant-app
yarn install
yarn start
yarn android
```

Dev menu: Ctrl + M | Reload: tekan R dua kali.

---

## Acknowledgements

Terima kasih kepada dosen pengampu & komunitas open-source React Native. Inspirasi desain berasal dari observasi perilaku pelanggan restoran modern.

---

Jika menemukan kekurangan atau butuh klarifikasi untuk penilaian, silakan buka issue atau rujuk dokumen terkait di folder `docs/`.

<div align="center">💡 "Lavus – pengalaman kuliner yang lebih cepat, personal, dan menguntungkan."</div>
