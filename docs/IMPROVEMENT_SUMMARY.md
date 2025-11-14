# IMPROVEMENT SUMMARY

Ringkasan: Template ringkasan aksi perbaikan dari Retrospective untuk Lavus Restaurant App.

Last Updated: 2025-11-10

## Tujuan

Melacak tindakan perbaikan berkelanjutan agar masalah berulang (build lambat, kurang test, UI inkonsisten) terselesaikan dengan pemilik jelas.

## Template Tabel Aksi

| ID  | Issue / Observasi                 | Dampak             | Aksi yang Diusulkan                              | Owner     | Prioritas (H/M/L) | Status (Open/In Progress/Done) | Target Sprint | Catatan                                |
| --- | --------------------------------- | ------------------ | ------------------------------------------------ | --------- | ----------------- | ------------------------------ | ------------- | -------------------------------------- |
| 1   | Build Android lambat (>90s)       | Menghambat iterasi | Aktifkan Gradle caching & parallel build         | Tech Lead | M                 | In Progress                    | Sprint 5      | Evaluasi waktu build sebelum & sesudah |
| 2   | Minim unit test util reservasi    | Risiko bug tinggi  | Tambah coverage util reservasi ke ≥80%           | Dev A     | H                 | Open                           | Sprint 6      | Buat test stub awal                    |
| 3   | Emulator sering freeze            | Waktu hilang       | Dokumentasi rekomendasi konfigurasi emulator     | Dev B     | M                 | Done                           | Sprint 4      | Publish di `SETUP_COMPLETE.md`         |
| 4   | Tidak ada lint rules untuk import | Konsistensi buruk  | Tambah rule `import/order` ESLint                | Tech Lead | L                 | In Progress                    | Sprint 6      | Pastikan path alias kompatibel         |
| 5   | Desain Rewards UI belum final     | Fitur tertunda     | Gunakan placeholder component + loading skeleton | UX        | H                 | Open                           | Sprint 5      | Ganti setelah figma final              |

## Formulir Penambahan Aksi

```
ID: <increment>
Observasi: <ringkas masalah>
Dampak: <apa yang terjadi jika dibiarkan>
Akar Masalah (opsional): <ketidakjelasan requirement / tooling>
Aksi yang Diusulkan: <solusi konkrit>
Owner: <nama>
Prioritas: H/M/L
Status Awal: Open
Target Sprint: <nomor>
Catatan: <tambahan>
```

## Siklus Pemantauan

1. Kumpulkan dari Retrospective.
2. Masukkan ke tabel dengan ID unik.
3. Review status di Sprint Planning berikut.
4. Tandai Done dengan bukti (angka build time, coverage, dsb.).

## Kriteria Sukses

| Area                       | Metrik               | Target                         |
| -------------------------- | -------------------- | ------------------------------ |
| Build Time                 | `assembleDebug`      | < 60 detik rata-rata           |
| Test Coverage              | Line coverage Jest   | > 70% total, >80% modul kritis |
| Bug Production             | Hotfix per kuartal   | ≤ 2                            |
| Lead Time Aksi Improvement | Hari dari Open->Done | ≤ 14 hari rata-rata            |

## Dashboard Sederhana (Contoh)

```
Aksi Total: 5
Selesai: 1
Dalam Proses: 2
Open: 2
Rasio Selesai per Sprint: 1/sprint
```

## Cara Mengganti Placeholder

Jika muncul placeholder seperti `<<METRIC_TOOL>>` ganti dengan nama tool (mis: SonarQube). Jika belum ada isi `<<PLACEHOLDER - fill from project brief>>`.

## Alignment dengan Rubrik Penilaian

| Kategori                        | Contoh Aksi Improvement              | Efek Terukur                       |
| ------------------------------- | ------------------------------------ | ---------------------------------- |
| Project Setup & Structure       | Optimasi build Gradle                | Waktu build turun -> setup efisien |
| UI & Design Implementation      | Konsolidasi style components         | UI konsisten & mudah dinilai       |
| Functionality & Interactivity   | Tambah test reservasi edge case      | Crash berkurang                    |
| State Management & Hooks        | Refactor state menu ke hook terpisah | Reactivity & keterbacaan naik      |
| Navigation & Data Flow          | Audit rute & param type              | Navigasi lebih intuitif            |
| API Integration & Data Handling | Implement retry & loading skeleton   | Pengalaman data lebih halus        |
| Code Quality & Documentation    | Tambah ESLint rule import/order      | Struktur impor bersih              |
| Creativity & Innovation         | Eksperimen animasi Reanimated ringan | Nilai inovasi meningkat            |
| Presentation & Demonstration    | Siapkan script demo standar          | Presentasi lebih meyakinkan        |

## Related Docs

- `SPRINT_CEREMONIES.md`
- `SPRINT_TRACKING.md`
- `AGILE_SCRUM_PLAN.md`
- `DEFINITION_OF_DONE.md`
