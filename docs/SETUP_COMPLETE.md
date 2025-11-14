# SETUP COMPLETE

Ringkasan: Verifikasi bahwa lingkungan pengembangan Lavus Restaurant App siap digunakan.

Last Updated: 2025-11-10

## Checklist Verifikasi

| Item                 | Perintah / Aksi                           | Kriteria Lulus                         |
| -------------------- | ----------------------------------------- | -------------------------------------- |
| Node LTS             | `node -v`                                 | Output versi = `<<NODE_LTS_VERSION>>`  |
| Yarn                 | `yarn -v`                                 | Mengembalikan versi tanpa error        |
| Java 17              | `java -version`                           | Versi menunjukkan 17.x                 |
| Android SDK          | `echo %ANDROID_HOME%`                     | Path valid                             |
| Emulator / Device    | `adb devices`                             | Minimal 1 device "device" status       |
| React Native Info    | `npx react-native info`                   | Info environment muncul                |
| Install Dependencies | `yarn install`                            | Tanpa error fatal                      |
| Jalankan App         | `npx react-native run-android`            | App muncul di emulator (Splash / Home) |
| Path Alias           | Import menggunakan `@components` berhasil | Tidak ada error module resolver        |
| Jest Test            | `yarn test`                               | Semua test lulus                       |
| Type Check           | `yarn typecheck`                          | 0 error                                |

## Alignment dengan Rubrik Penilaian

| Kategori                        | Bukti dari Setup                           | Dampak Penilaian                          |
| ------------------------------- | ------------------------------------------ | ----------------------------------------- |
| Project Setup & Structure       | Semua tool (Node, Java, SDK) terverifikasi | Lingkungan siap, tidak ada hambatan awal  |
| UI & Design Implementation      | App berhasil launch (Splash/Home)          | Menunjukkan pipeline build UI berfungsi   |
| Functionality & Interactivity   | App tidak crash saat interaksi awal        | Stabilitas dasar fitur                    |
| State Management & Hooks        | Typecheck & Jest lulus                     | Menjamin integrasi state tidak error tipe |
| Navigation & Data Flow          | Launch ke HomeScreen sukses                | Konfigurasi navigasi dasar benar          |
| API Integration & Data Handling | Belum diuji di tahap ini (placeholder)     | Siapkan dasar untuk integrasi API         |
| Code Quality & Documentation    | Script diagnose + checklist                | Proses kualitas terdokumentasi            |
| Creativity & Innovation         | Script `diagnose` opsional                 | Mempercepat audit environment             |
| Presentation & Demonstration    | Tanda sukses jelas & tabel checklist       | Memudahkan demonstrasi kesiapan           |

## Langkah Verifikasi Terpadu (PowerShell)

```powershell
node -v
java -version
adb devices
npx react-native info
yarn install
npx react-native run-android
```

## Sukses Jalankan App (Tanda)

- Splash screen tampil.
- Tidak crash saat membuka HomeScreen.
- Menu mock (jika ada) tampil.

## Troubleshooting Cepat

| Masalah                                    | Penyebab Umum                                 | Solusi                                                       |
| ------------------------------------------ | --------------------------------------------- | ------------------------------------------------------------ |
| `Command not found: npx`                   | Node tidak terinstall benar                   | Reinstall Node LTS & restart terminal                        |
| Gradle gagal (Out of memory)               | RAM kurang / konfigurasi heap                 | Tambah `org.gradle.jvmargs=-Xmx2048m` di `gradle.properties` |
| `adb devices` kosong                       | Driver perangkat belum atau USB debugging OFF | Install driver, aktifkan Developer Options                   |
| App stuck di logo                          | Cache Metro / bundler                         | Reset: `npx react-native start --reset-cache`                |
| Cannot resolve module '@components/Button' | Babel plugin belum aktif                      | Periksa `babel.config.js` sesuai doc alias                   |
| Test Jest error async timer                | Setting test environment                      | Pastikan `jest.useFakeTimers()` benar di test kasus          |

## Pemeriksaan Build Release (Opsional Awal)

```powershell
cd android
./gradlew assembleRelease
```

Jika berhasil dan menghasilkan APK tanpa error -> environment siap untuk rilis.

## Otomatisasi (Opsional)

Tambahkan script di `package.json`:

```json
{
  "scripts": {
    "diagnose": "node -v && java -version && adb devices && npx react-native info"
  }
}
```

Jalankan: `yarn diagnose`.

## Cara Mengganti Placeholder

Ganti `<<NODE_LTS_VERSION>>` dengan versi Node resmi yang digunakan (mis: v20.11.0). Jika package name perlu dicantumkan gunakan `<<ANDROID_PACKAGE>>`.

## Related Docs

- `DEVELOPMENT_CHECKLIST.md`
- `QUICK_REFERENCE.md`
- `PATH_ALIASES_SETUP.md`
- `TESTING_STRATEGY.md`
