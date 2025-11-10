# DEFINITION OF DONE

Ringkasan: Checklist komprehensif untuk menyatakan sebuah user story / PR selesai pada Lavus Restaurant App.

Last Updated: 2025-11-10

## Prinsip

Selesai berarti dapat di-deploy ke produksi tanpa pekerjaan tambahan dan memenuhi kualitas fungsional & non-fungsional.

## Checklist Utama

### Kode

- [ ] Implementasi memenuhi Acceptance Criteria.
- [ ] Tidak ada console.log debug / komentar berlebihan.
- [ ] Menggunakan path alias sesuai `PATH_ALIASES_SETUP.md`.
- [ ] Menghindari duplikasi (refactor jika perlu).
- [ ] Respons API ditangani error state (loading, error, empty).
- [ ] Navigasi aman (tidak crash di back stack).

### Testing

- [ ] Unit test ditulis / diperbarui (komponen & util terkait).
- [ ] Coverage minimal tercapai (≥ 70% lines modul terkait).
- [ ] Test snapshot UI (jika UI kompleks) diperbarui.
- [ ] E2E / integrasi (Detox) scenario utama (jika menyentuh flow utama) lulus.

### Dokumentasi

- [ ] README atau docs relevan diperbarui (parameter baru, env vars).
- [ ] Komentar JSDoc / TSDoc untuk fungsi publik penting.
- [ ] Changelog / Release Notes draft diperbarui (jika fitur user-facing).

### Aksesibilitas (A11y)

- [ ] Komponen interaktif memiliki label aksesibilitas (aria / accessibilityLabel).
- [ ] Kontras warna sesuai desain (periksa branding hijau #95AE45 vs background).

### i18n (Placeholder)

- [ ] Teks baru dibungkus fungsi translasi atau siap diekstrak `<<I18N_FUNCTION_PLACEHOLDER>>`.

### Kinerja

- [ ] Tidak ada rendering berulang tidak perlu (memo/reselect bila kompleks).
- [ ] Gambar dioptimalkan (ukuran & format wajar untuk mobile).
- [ ] Operasi berat dipindah ke background / throttled.

### Keamanan

- [ ] Tidak ada hard-coded password / token.
- [ ] Menghindari menyimpan data sensitif di log.

### Build & CI

- [ ] Lulus lint (`yarn lint`).
- [ ] Lulus type-check (`yarn typecheck`).
- [ ] Lulus unit test (`yarn test`).
- [ ] Build Android debug sukses (`npx react-native run-android`).
- [ ] CI pipeline hijau di PR.

### Review

- [ ] Minimal 1 peer approval (tim kecil) atau 2 jika perubahan arsitektur.
- [ ] Komentar review kritis ditangani / direspon.

### Release Readiness

- [ ] Fitur dapat di-demo di emulator tanpa setup manual kompleks.
- [ ] Tidak ada TODO tertinggal tanpa issue.
- [ ] Feature flag (jika dipakai) default sesuai strategi rilis.

### Sign-off

| Peran | Status | Catatan |
|-------|--------|---------|
| Dev Author | ✅ | Implementasi |
| Reviewer | ✅ | Code quality |
| PO / Biz | ✅ | Terima hasil (UI/UX) |
| QA (opsional) | ✅ | Scenario test lulus |

## Template Pull Request (Ringkas)

```text
## Ringkasan
Jelaskan perubahan utama & motivasi.

## Fitur / Issue
Closes #<<ISSUE_NUMBER>>

## Screenshots
<tambahkan sebelum/sesudah>

## Checklist
- [ ] Acceptance criteria terpenuhi
- [ ] Test ditambah/diperbarui
- [ ] Lint & type-check lulus
- [ ] Docs diperbarui
- [ ] Tidak ada API key dalam kode

## Catatan Tambahan
Hal khusus untuk reviewer.
```

## Alignment dengan Rubrik Penilaian

| Kategori Rubrik | Bagian DoD yang Mendukung | Cara Penilaian Singkat |
|-----------------|---------------------------|------------------------|
| Project Setup & Structure | Build & CI, Release Readiness | App run tanpa error |
| UI & Design Implementation | Review (UI/UX), Aksesibilitas | Konsistensi & kontras |
| Functionality & Interactivity | Kode + Testing | Acceptance criteria + test lulus |
| State Management & Hooks | Kode (duplikasi, respons state) | Reactivity benar |
| Navigation & Data Flow | Kode (navigasi aman) | Tidak crash/backstack benar |
| API Integration & Data Handling | Kode (respons API & error state) | Loading/error ditangani |
| Code Quality & Documentation | Dokumentasi + Lint + Review | Struktur & style konsisten |
| Creativity & Innovation | Kinerja (optimasi), A11y | Inisiatif ekstra dicatat |
| Presentation & Demonstration | Release Readiness + Template PR | Mudah demo di emulator |

## Cara Mengganti Placeholder

Ganti `<<ISSUE_NUMBER>>`, `<<I18N_FUNCTION_PLACEHOLDER>>` dengan fungsi i18n aktual (misal `t('key')`). Jika belum ada sistem i18n, isi `<<PLACEHOLDER - fill from project brief>>`.

## Related Docs

- `AGILE_SCRUM_PLAN.md`
- `DEVELOPMENT_CHECKLIST.md`
- `TESTING_STRATEGY.md`
- `BRANCH_STRATEGY.md`
