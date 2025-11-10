# BRANCH STRATEGY

Ringkasan: Model branching Git untuk Lavus Restaurant App agar pengembangan fitur terstruktur dan rilis stabil.

Last Updated: 2025-11-10

## Tujuan
Menetapkan pola konsisten untuk pembuatan, penamaan, review, dan merge branch sehingga integrasi kode aman dan dapat ditelusuri.

## Cabang Utama
| Branch | Fungsi | Catatan |
|--------|--------|---------|
| `main` | Source kode siap produksi / release | Proteksi: wajib PR + CI hijau |
| `develop` (opsional) | Integrasi harian fitur sebelum stabil | Jika tim <3 dev boleh dihilangkan dan langsung ke `main` via PR |

Jika tanpa `develop`, pastikan release tagging dari `main`.

## Tipe Branch
| Tipe | Format Nama | Tujuan | Contoh |
|------|-------------|--------|--------|
| Feature | `feature/<kata-kunci>` | Fitur baru | `feature/menu-ui` |
| Bugfix | `bugfix/<issue-id-deskriptif>` | Perbaikan non-kritis | `bugfix/menu-filter-reset` |
| Hotfix | `hotfix/<deskripsi-singkat>` | Perbaikan kritikal produksi | `hotfix/checkout-null-crash` |
| Release | `release/<versi>` | Stabilisasi menjelang rilis | `release/1.2.0` |
| Chore | `chore/<aktivitas>` | Tugas teknis (deps, build) | `chore/update-gradle-wrapper` |
| Docs | `docs/<topik>` | Dokumentasi | `docs/testing-strategy` |

## Aturan Pembuatan Branch
1. Selalu branch dari target yang benar:
   - Feature / Bugfix / Chore: dari `develop` (atau `main` jika tanpa develop).
   - Hotfix: dari `main`.
   - Release: dari `main` atau `develop` saat siap freeze.
2. Satu branch = satu fokus / ticket. Hindari multi-fitur.
3. Gunakan huruf kecil + dash/hyphen.
4. Hindari nama generik: gunakan kata kerja atau domain: `feature/reservation-flow`.

## Komit Pesan (Conventional Style Ringan)
Format: `<type>(<optional-scope>): <deskripsi singkat>`
Jenis: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `build`.
Contoh: `feat(menu): tambah filter kategori Salad`.

## Pull Request (PR) Checklist
Sebelum minta review:
- [ ] Deskripsi PR menjelaskan WHAT + WHY.
- [ ] Link ke issue / user story `#<<ISSUE_NUMBER>>`.
- [ ] Screenshot / GIF untuk perubahan UI (Home/Menu/Checkout/Reserve/Profile).
- [ ] Menambahkan / memperbarui test (unit & integrasi terkait).
- [ ] Lint & format lulus: `yarn lint` / `yarn prettier:check`.
- [ ] Tidak ada warning build Android.
- [ ] Environment variables baru didokumentasikan.
- [ ] Tidak menambah library besar tanpa alasan.
- [ ] Semua TODO di kode dihapus atau ticket dibuat.

## CI Wajib Lulus
| Check | Tools | Kriteria |
|-------|-------|----------|
| Lint | ESLint | Tidak ada error (warning boleh ≤ agreed) |
| Format | Prettier | Tidak ada diff setelah format |
| Unit Test | Jest | Coverage line ≥ 70% (naik bertahap) |
| Build Android | Gradle assembleDebug | Sukses tanpa gagal |
| Type Check | `tsc --noEmit` | 0 error |

## Strategi Merge
| Scenario | Aksi | Alasan |
|----------|------|--------|
| Feature selesai | Squash & merge | History bersih, 1 komit per feature di main |
| Hotfix | Merge commit (non-squash) | Pelacakan patch detail jika perlu revert granular |
| Release branch | Merge commit + tag | Mempertahankan timeline rilis |

Gunakan Squash default kecuali tabel di atas menentukan lain.

## Konflik Merge
1. Tarik perubahan terbaru (`git fetch origin`).
2. Rebase atau merge `develop`/`main` ke branch fitur.
3. Selesaikan konflik (prioritas logika terbaru + jaga kompatibilitas API).
4. Jalankan ulang test lokal.

## Contoh Alur Feature
```
# Buat branch
git checkout -b feature/reservation-flow develop
# Kerjakan kode, commit
# Push
git push -u origin feature/reservation-flow
# Buka PR ke develop (atau main jika tanpa develop)
# Setelah review dan CI hijau -> squash & merge
```

## Release Flow (Dengan develop)
1. Pastikan `develop` stabil.
2. Buat `release/1.2.0` dari `develop`.
3. Hanya bugfix dan docs masuk (feature baru ditahan).
4. Setelah siap: merge ke `main` lalu tag `v1.2.0`, merge balik ke `develop`.

## Hotfix Flow
```
# Dari main
git checkout -b hotfix/checkout-null-crash main
# Perbaiki bug, tambah test regresi
# Push & PR ke main
# Merge commit, tag patch v1.2.1
# Cherry-pick atau merge ke develop
```

## Otomatisasi yang Direkomendasikan
- Protected branch: `main` (dan `develop` bila ada) -> butuh 1–2 approvals.
- Status checks: lint, test, build.
- PR template: file `.github/pull_request_template.md` (tambahkan placeholder).

## Placeholder yang Sering Muncul
`<<ISSUE_NUMBER>>`, `<<VERSI_RILIS>>`, `<<REPO_URL>>`.

## Cara Mengganti Placeholder
Cari teks `<<...>>` dan ganti dengan nilai aktual. Jika belum tahu versi saat membuat release branch, gunakan `<<VERSI_CALON>>` dan perbarui sebelum tag.

## Related Docs
- `BRANCH_SUMMARY.md`
- `DEFINITION_OF_DONE.md`
- `TESTING_STRATEGY.md`
- `AGILE_SCRUM_PLAN.md`