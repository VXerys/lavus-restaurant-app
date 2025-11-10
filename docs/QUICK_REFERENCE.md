# QUICK REFERENCE

Ringkasan: Cheat-sheet perintah cepat pengembangan Lavus Restaurant App.

Last Updated: 2025-11-10

## React Native & Metro
```powershell
# Start Metro (otomatis jalan saat run-android)
npx react-native start

# Reset cache Metro
npx react-native start --reset-cache

# Jalankan Android (debug)
npx react-native run-android

# Jalankan ulang build (bersih)
cd android; ./gradlew clean; cd ..; npx react-native run-android
```

## Build Android Release
```powershell
cd android
./gradlew assembleRelease
# APK di: android/app/build/outputs/apk/release/app-release.apk
```

## Debugging
```powershell
# Buka Dev Menu (Emulator): Ctrl + M
# Reload: Double R (Android)
# Logcat:
adb logcat *:E reactnative:V ReactNativeJS:V
```

## ADB Umum
```powershell
adb devices               # List perangkat
adb reverse tcp:8081 tcp:8081  # Tunnel Metro jika device fisik
adb shell input keyevent 82    # Buka menu dev
adb shell pm clear <<ANDROID_PACKAGE>> # Clear data app
```

## ESLint & Prettier
```powershell
yarn lint
yarn prettier:write
```

## Type Check & Test
```powershell
yarn typecheck
yarn test --watch
```

## Git Dasar
```powershell
git pull origin main
git checkout -b feature/menu-ui
git add .
git commit -m "feat(menu): tambah UI filter kategori"
git push -u origin feature/menu-ui
git fetch --all --prune
```

## Versi Node / Info RN
```powershell
node -v
npx react-native info
```

## Format & Clean
```powershell
# Hapus branch lokal yang sudah di-merge
git branch --merged | findstr /v "* main" | foreach { git branch -d $_ }
```
(Atur sesuai PowerShell; bisa manual satu per satu.)

## Troubleshooting Singkat
| Gejala | Solusi Cepat |
|--------|--------------|
| Metro tidak connect | Jalankan `adb reverse tcp:8081 tcp:8081` |
| Modul alias gagal | Reset cache & cek `babel.config.js` |
| APK tidak terbuat | Cek error Gradle; jalankan `./gradlew clean --warning-mode all` |
| Test lambat | Gunakan `--runInBand=false` atau upgrade Node |

## Cara Mengganti Placeholder
Ganti `<<ANDROID_PACKAGE>>` dengan package actual (misal `com.lavusrestaurantapp`).

## Related Docs
- `SETUP_COMPLETE.md`
- `DEVELOPMENT_CHECKLIST.md`
- `PROJECT_STRUCTURE.md`
- `TESTING_STRATEGY.md`
