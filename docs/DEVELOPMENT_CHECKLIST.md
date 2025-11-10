# DEVELOPMENT CHECKLIST

Ringkasan: Checklist onboarding, alur kerja harian, dan pra-Pull Request untuk Lavus Restaurant App.

Last Updated: 2025-11-10

## 1. Onboarding (Hari Pertama)
### Sistem & Tools
- [ ] Install Node LTS `<<NODE_LTS_VERSION>>` (rekomendasi Node 20 LTS) -> verifikasi `node -v`.
- [ ] Install Yarn (`npm install -g yarn`) -> verifikasi `yarn -v`.
- [ ] Install Java JDK 17 (set `JAVA_HOME=<<JAVA_HOME_PATH>>`).
- [ ] Install Android Studio (SDK Platform 34) & set `ANDROID_HOME=<<ANDROID_SDK_ROOT>>`.
- [ ] Tambah ke PATH: `%ANDROID_HOME%\platform-tools`.
- [ ] Aktifkan USB debugging (opsional perangkat fisik).
- [ ] Clone repo: `git clone <<REPO_URL>>`.
- [ ] Masuk folder proyek: `cd lavus-restaurant-app`.
- [ ] Install dependencies: `yarn install`.
- [ ] Jalankan Metro + build: `npx react-native run-android`.
- [ ] Buka emulator Pixel / perangkat fisik.
- [ ] Pastikan aplikasi membuka layar awal tanpa crash.

### Konfigurasi Editor (VS Code)
- [ ] Install ekstensi: ESLint, Prettier, React Native Tools, Jest Runner.
- [ ] Aktifkan format on save.
- [ ] Pastikan path alias di-resolve (lihat `PATH_ALIASES_SETUP.md`).

## 2. Struktur Kerja Harian
1. Pull perubahan terbaru: `git pull origin main` (atau `develop`).
2. Cek issue board (Sprint board): pilih story Ready.
3. Buat branch fitur: `git checkout -b feature/<nama-fitur>`.
4. Implementasi bertahap + commit kecil terarah.
5. Jalankan test dan lint sebelum push.
6. Push berkala (hindari hilang progress): `git push -u origin feature/<nama-fitur>`.
7. Buka PR saat siap review (isi template + screenshot UI).
8. Tanggap komentar review cepat (<24 jam kerja).
9. Setelah merge, hapus branch lokal & remote.

## 3. Pra-Pull Request Checklist
- [ ] Branch benar dari target (`main`/`develop`).
- [ ] Nama branch mengikuti konvensi (`feature/reserve-flow`).
- [ ] Lint: `yarn lint` (0 error, warning wajar).
- [ ] Type check: `yarn typecheck` (0 error).
- [ ] Unit test lulus: `yarn test`.
- [ ] Coverage modul baru minimal 70%.
- [ ] Tidak ada `console.log` atau komentar TODO tanpa issue.
- [ ] UI diuji pada emulator: layout tidak pecah (utama: Home, Menu, Detail, Checkout, Reserve, Profile).
- [ ] State error ditangani (network fail, empty list menu).
- [ ] Path alias digunakan bukan relatif panjang.
- [ ] Dependencies baru ditinjau (alasan jelas, ukuran aman).
- [ ] Docs / README / ENV diperbarui jika perlu.
- [ ] Screenshots PR (sebelum/sesudah) ditambahkan.

## Perintah Penting
```powershell
# Jalankan app Android
npx react-native run-android

# Start Metro manual
npx react-native start

# Bersihkan cache RN
npx react-native start --reset-cache

# Lint
yarn lint

# Format semua file
yarn prettier:write

# Type check
yarn typecheck

# Test unit
yarn test
```

## Masalah Umum & Solusi Cepat
| Gejala | Penyebab | Solusi |
|--------|----------|--------|
| `Could not find Java` | JAVA_HOME belum set | Set env JAVA_HOME & restart terminal |
| Emulator lambat | Hardware acceleration OFF | Aktifkan Hyper-V / HAXM sesuai device |
| Metro stuck / hang | Cache korup | Jalankan reset cache perintah di atas |
| `adb devices` kosong | USB debugging belum aktif | Aktifkan di perangkat / restart adb server |

## Cara Mengganti Placeholder
Ganti `<<NODE_LTS_VERSION>>`, `<<JAVA_HOME_PATH>>`, `<<ANDROID_SDK_ROOT>>`, `<<REPO_URL>>` dengan nilai aktual lingkungan Anda. Jika ada yang belum pasti gunakan `<<PLACEHOLDER - fill from project brief>>` sementara.

## Related Docs
- `PROJECT_STRUCTURE.md`
- `PATH_ALIASES_SETUP.md`
- `SETUP_COMPLETE.md`
- `DEFINITION_OF_DONE.md`
